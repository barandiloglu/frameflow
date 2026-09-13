/**
 * Regenerates public/gallery/{thumb,full} from the originals under
 * public/portfolio/<client>/photos, driven by src/data/gallery.ts.
 *
 * Run manually — this is NOT part of `next build`. The originals total 208 MB
 * and stay where they are; the case studies still render them.
 *
 *   node scripts/build-gallery-derivatives.mjs [outDir]
 *
 * thumb: 400w WebP q72  — what the grid loads. These are lazy, one per frame
 *                         as it scrolls into view, so what matters is the
 *                         weight of a single thumb rather than the set total.
 *                         (The reveal overlay that used to preload all of them
 *                         is gone.)
 * mid:   800w WebP q72  — the middle srcset step. A landscape frame renders up
 *                         to ~700 CSS px wide in the justified grid, so a 400w
 *                         thumb was visibly soft on a retina screen.
 * full:  1600w WebP q80 — opened frames, and the top srcset step.
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
await fs.mkdir(path.join(OUT, "mid"), { recursive: true });
await fs.mkdir(path.join(OUT, "full"), { recursive: true });

const perThumb = [];
let thumbBytes = 0;
let midBytes = 0;
let fullBytes = 0;

for (const r of rows) {
  /* A leading slash means the original sits under public/ (the case-study
     photographs). Anything else is relative to the repo root — the gallery
     originals live in photos-source/, which is gitignored. */
  const src = r.src.startsWith("/")
    ? path.join(ROOT, "public", r.src)
    : path.join(ROOT, r.src);
  const [thumb, mid, full] = await Promise.all([
    sharp(src).resize({ width: 400, withoutEnlargement: true }).webp({ quality: 72 }).toBuffer(),
    sharp(src).resize({ width: 800, withoutEnlargement: true }).webp({ quality: 72 }).toBuffer(),
    sharp(src).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer(),
  ]);
  /* mid shares the thumb's basename; the page derives its URL by swapping the
     directory rather than carrying a third path on every record. */
  await fs.writeFile(path.join(OUT, "thumb", path.basename(r.thumb)), thumb);
  await fs.writeFile(path.join(OUT, "mid", path.basename(r.thumb)), mid);
  await fs.writeFile(path.join(OUT, "full", path.basename(r.full)), full);
  perThumb.push([path.basename(r.thumb), thumb.length]);
  thumbBytes += thumb.length;
  midBytes += mid.length;
  fullBytes += full.length;
}

const mb = (b) => (b / 1024 / 1024).toFixed(2);
console.log(`${rows.length} photos -> ${OUT}`);
console.log(`  thumb  ${mb(thumbBytes)} MB  (400w, lazy)`);
console.log(`  mid    ${mb(midBytes)} MB  (800w, lazy)`);
console.log(`  full   ${mb(fullBytes)} MB  (1600w, on open)`);
/* Nothing preloads the set any more, so the total is informational. A single
   fat thumb is still worth knowing about: at 400w, anything past ~80 KB means
   the source had detail WebP could not compress and is worth a look. */
const heavy = perThumb.filter(([, b]) => b > 80 * 1024);
if (heavy.length) {
  console.warn(`${heavy.length} thumb(s) over 80 KB:`);
  for (const [name, b] of heavy.slice(0, 10)) console.warn(`  ${(b / 1024).toFixed(0)} KB  ${name}`);
}
