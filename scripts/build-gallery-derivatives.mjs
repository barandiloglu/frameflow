/**
 * Regenerates public/gallery/{thumb,full} from the originals under
 * public/portfolio/<client>/photos, driven by src/data/gallery.ts.
 *
 * Run manually — this is NOT part of `next build`. The originals total 208 MB
 * and stay where they are; the case studies still render them.
 *
 *   node scripts/build-gallery-derivatives.mjs [outDir]
 *
 * thumb: 400w WebP q72  — the shuffle pool. Every one of these is preloaded
 *                         behind the reveal overlay, so the whole set has to
 *                         stay around 1 MB.
 * full:  1600w WebP q80 — loaded only when a photo is opened.
 *
 * withoutEnlargement matters: 16 originals are 700–900px wide and upscaling
 * them would only inflate the file while making them look worse.
 *
 * outDir defaults to public/gallery. Pass a different one when the shell
 * cannot write into the working tree (macOS TCC denies ~/Desktop), then move
 * the files in with git plumbing.
 */
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = process.argv[2] ? path.resolve(process.argv[2]) : path.join(ROOT, "public/gallery");

/* Read the manifest as text rather than importing it — this script runs under
   plain node, which will not parse a .ts module. */
const manifestSrc = await fs.readFile(path.join(ROOT, "src/data/gallery.ts"), "utf8");
const rows = [...manifestSrc.matchAll(
  /\{ src: "([^"]+)", thumb: "([^"]+)", full: "([^"]+)"/g,
)].map(([, src, thumb, full]) => ({ src, thumb, full }));

if (!rows.length) throw new Error("no rows parsed from src/data/gallery.ts");

await fs.mkdir(path.join(OUT, "thumb"), { recursive: true });
await fs.mkdir(path.join(OUT, "full"), { recursive: true });

let thumbBytes = 0;
let fullBytes = 0;

for (const r of rows) {
  const src = path.join(ROOT, "public", r.src);
  const [thumb, full] = await Promise.all([
    sharp(src).resize({ width: 400, withoutEnlargement: true }).webp({ quality: 72 }).toBuffer(),
    sharp(src).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer(),
  ]);
  await fs.writeFile(path.join(OUT, "thumb", path.basename(r.thumb)), thumb);
  await fs.writeFile(path.join(OUT, "full", path.basename(r.full)), full);
  thumbBytes += thumb.length;
  fullBytes += full.length;
}

const mb = (b) => (b / 1024 / 1024).toFixed(2);
console.log(`${rows.length} photos -> ${OUT}`);
console.log(`  thumb  ${mb(thumbBytes)} MB  (preloaded; budget 2 MB)`);
console.log(`  full   ${mb(fullBytes)} MB  (lazy, on open)`);
if (thumbBytes > 2 * 1024 * 1024) {
  console.error("thumb set exceeds the preload budget — lower quality and re-run");
  process.exitCode = 1;
}
