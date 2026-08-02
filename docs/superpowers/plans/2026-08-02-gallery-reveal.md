# Gallery Reveal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `/gallery` with a chrome-free photographic showcase behind a reveal sequence adapted from `hero-24`, ending on a 3×3 grid whose tiles open by scaling up behind an inset clip-path.

**Architecture:** One client component plus a generated manifest and a one-off derivative script. The manifest composes 76 photos from two existing caption sources. Motion is framer-motion — no new dependency.

**Tech Stack:** Next.js 16.2.1, React 19.2.4, TypeScript, Tailwind v4, framer-motion, `sharp` (already present via Next.js, used at build time only).

**Spec:** `docs/superpowers/specs/2026-08-02-gallery-reveal-design.md` — read it before Task 1.

## Global Constraints

Every task's requirements implicitly include this section.

- **The ease is `cubic-bezier(0.9, 0, 0.1, 1)`.** This is `hero-24`'s `CustomEase("hop")` verbatim. It is why the reveal reads mechanical rather than soft. Do not substitute an easing preset.
- **Timings, verbatim from the source:** grid reveal duration `1`, stagger `0.05`; shuffle **20 cycles at 0.15s**; open/close duration `1.5`; word rise stagger `0.1` from `y: 110%`.
- **No new dependencies.** No GSAP, no SplitType, no Lenis.
- **Captions are reused verbatim** from `clients.ts` and `ConnecTRPage.tsx`. Never write a new one, never alter an existing one.
- **No EXIF, dates, camera or film data anywhere.** Only 2 of 76 photos carry any, so none is shown.
- **Opened photos never exceed natural width.** 16 files are 700–900px wide.
- **Definite height on the opened photo**, never `max-height` (the IYN crop regression).
- **`prefers-reduced-motion: reduce`** lands directly on the settled grid — no wipe, no shuffle, no clip-path reveal.
- **Verification per task:** `npx tsc --noEmit` clean, and `npm run lint` with no NEW errors over the known baseline of **6 pre-existing errors** plus font/img warnings.
- **Writing binaries into the working tree:** macOS TCC denies the shell write access to `~/Desktop`. Use git plumbing — `git hash-object -w <file>`, `git update-index --add --cacheinfo 100644,<sha>,<path>`, `git checkout-index -f -- <path>`.

---

### Task 1: Photo manifest

**Files:**
- Create: `src/data/gallery.ts`

**Interfaces:**
- Produces: `export type GalleryPhoto = { src: string; thumb: string; full: string; alt: string; slate: string; client: string; w: number; h: number }` and `export const galleryPhotos: readonly GalleryPhoto[]` — 76 entries.

- [ ] **Step 1: Extract the 56 roster captions and the 20 ConnecTR captions**

Run this to emit the manifest body. It reads both sources so no caption is retyped:

```bash
cd "$(git rev-parse --show-toplevel)"
node -e '
const fs=require("fs");
const clients=fs.readFileSync("src/data/clients.ts","utf8");
const connectr=fs.readFileSync("src/components/portfolio/featured/ConnecTRPage.tsx","utf8");
const rx=/\{\s*src:\s*"(\/portfolio\/[^"]+\/photos\/[^"]+)",\s*alt:\s*"((?:[^"\\]|\\.)*)",\s*slate:\s*"((?:[^"\\]|\\.)*)"/g;
const rows=[];
for (const src of [clients, connectr])
  for (const m of src.matchAll(rx)) rows.push({src:m[1],alt:m[2],slate:m[3]});
const seen=new Set(); const out=rows.filter(r=>!seen.has(r.src)&&seen.add(r.src));
console.log("extracted", out.length);
fs.writeFileSync("/tmp/gallery-rows.json", JSON.stringify(out,null,1));
'
```

Expected: `extracted 76`. If it prints fewer, a caption uses a different property order — widen the regex rather than hand-writing the missing rows.

- [ ] **Step 2: Attach real pixel dimensions and derivative paths**

```bash
node -e '
const fs=require("fs"), sharp=require("sharp"), path=require("path");
(async()=>{
  const rows=JSON.parse(fs.readFileSync("/tmp/gallery-rows.json","utf8"));
  const out=[];
  for (const r of rows) {
    const m=await sharp("public"+r.src).metadata();
    const client=r.src.split("/")[2];
    const base=path.basename(r.src).replace(/\.[^.]+$/,"");
    out.push({...r, client,
      thumb:`/gallery/thumb/${client}__${base}.webp`,
      full:`/gallery/full/${client}__${base}.webp`,
      w:m.width, h:m.height});
  }
  fs.writeFileSync("/tmp/gallery-manifest.json", JSON.stringify(out,null,1));
  console.log("manifest rows", out.length,
    "| portrait", out.filter(o=>o.h>o.w).length,
    "| under 1000w", out.filter(o=>o.w<1000).length);
})();
'
```

Expected: `manifest rows 76 | portrait 57 | under 1000w 16`.

- [ ] **Step 3: Write `src/data/gallery.ts`**

Generate the file from the manifest — do not hand-type 76 rows.

```bash
node -e '
const fs=require("fs");
const rows=JSON.parse(fs.readFileSync("/tmp/gallery-manifest.json","utf8"));
const esc=s=>s.replace(/\\/g,"\\\\").replace(/"/g,"\\\"");
const body=rows.map(r=>`  { src: "${r.src}", thumb: "${r.thumb}", full: "${r.full}", alt: "${esc(r.alt)}", slate: "${esc(r.slate)}", client: "${r.client}", w: ${r.w}, h: ${r.h} },`).join("\n");
fs.writeFileSync("src/data/gallery.ts",
`/* Generated from the captions that already exist for these photographs:
   56 from src/data/clients.ts, 20 from ConnecTRPage.tsx. Every alt and slate
   here was written against the actual image — none was invented for the
   gallery. Regenerate rather than edit by hand. */

export type GalleryPhoto = {
  src: string;
  thumb: string;
  full: string;
  alt: string;
  slate: string;
  client: string;
  w: number;
  h: number;
};

export const galleryPhotos: readonly GalleryPhoto[] = [
${body}
];
`);
console.log("wrote src/data/gallery.ts with", rows.length, "photos");
'
```

- [ ] **Step 4: Verify and commit**

```bash
npx tsc --noEmit
node -e '
const {galleryPhotos}=require("./src/data/gallery.ts");
' 2>/dev/null || true
grep -c "  { src:" src/data/gallery.ts   # expect 76
git add src/data/gallery.ts
git commit -m "feat(gallery): photo manifest — 76 photos, captions reused not rewritten"
```

---

### Task 2: Derivative pipeline

**Files:**
- Create: `scripts/build-gallery-derivatives.mjs`
- Create: `public/gallery/thumb/*.webp` (76), `public/gallery/full/*.webp` (76)

**Interfaces:**
- Consumes: `src/data/gallery.ts` paths from Task 1.
- Produces: every `thumb` and `full` path in the manifest, resolving 200.

- [ ] **Step 1: Write the script**

```js
/* Regenerates public/gallery/{thumb,full} from the originals under
   public/portfolio/<client>/photos. Run manually; not part of `next build`.

   thumb: 400w WebP q72  — the shuffle pool, preloaded behind the overlay
   full:  1600w WebP q80 — loaded only when a photo is opened
   withoutEnlargement: 16 originals are 700-900px wide and must not be upscaled. */
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const rows = JSON.parse(await fs.readFile("/tmp/gallery-manifest.json", "utf8"));
await fs.mkdir("public/gallery/thumb", { recursive: true });
await fs.mkdir("public/gallery/full", { recursive: true });

let tb = 0, fb = 0;
for (const r of rows) {
  const src = path.join("public", r.src);
  const t = await sharp(src).resize({ width: 400, withoutEnlargement: true }).webp({ quality: 72 }).toBuffer();
  const f = await sharp(src).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer();
  await fs.writeFile(path.join("public", r.thumb), t);
  await fs.writeFile(path.join("public", r.full), f);
  tb += t.length; fb += f.length;
}
console.log(`thumbs ${(tb / 1024 / 1024).toFixed(2)} MB, full ${(fb / 1024 / 1024).toFixed(2)} MB, ${rows.length} photos`);
```

- [ ] **Step 2: Run it, writing to a temp dir first**

The shell cannot write under `~/Desktop`. Run with the output redirected to `/tmp/gallery-out`, then move the files in with git plumbing:

```bash
mkdir -p /tmp/gallery-out/thumb /tmp/gallery-out/full
sed 's#"public/gallery/#"/tmp/gallery-out/#g; s#path.join("public", r.thumb)#path.join("/tmp/gallery-out/thumb", path.basename(r.thumb))#; s#path.join("public", r.full)#path.join("/tmp/gallery-out/full", path.basename(r.full))#' \
  scripts/build-gallery-derivatives.mjs > /tmp/build-derivs.mjs
node /tmp/build-derivs.mjs
```

Expected: `thumbs ~1.0 MB, full ~22 MB, 76 photos`. If thumbs exceed 2 MB the preload budget is blown — drop quality to 65 and re-measure before continuing.

- [ ] **Step 3: Place the files into the working tree**

```bash
cd "$(git rev-parse --show-toplevel)"
place() { SHA=$(git hash-object -w "$1"); git update-index --add --cacheinfo 100644,$SHA,"$2"; git checkout-index -f -- "$2"; }
for f in /tmp/gallery-out/thumb/*.webp; do place "$f" "public/gallery/thumb/$(basename "$f")"; done
for f in /tmp/gallery-out/full/*.webp;  do place "$f" "public/gallery/full/$(basename "$f")";  done
ls public/gallery/thumb | wc -l   # expect 76
ls public/gallery/full  | wc -l   # expect 76
```

- [ ] **Step 4: Verify every manifest path resolves**

```bash
node -e '
const fs=require("fs");
const rows=JSON.parse(fs.readFileSync("/tmp/gallery-manifest.json","utf8"));
const missing=rows.flatMap(r=>[r.thumb,r.full]).filter(p=>!fs.existsSync("public"+p));
console.log(missing.length ? "MISSING:\n"+missing.join("\n") : "all 152 derivatives present");
'
```

- [ ] **Step 5: Commit**

```bash
git add scripts/build-gallery-derivatives.mjs
git commit -m "feat(gallery): derivative pipeline — 400px pool, 1600px display"
```

---

### Task 3: Page shell — chrome removal and static grid

**Files:**
- Rewrite: `src/app/gallery/page.tsx`

**Interfaces:**
- Consumes: `galleryPhotos` from Task 1.
- Produces: `GalleryPage`, rendering the settled state with no motion yet — this is the reduced-motion target and the DOM assistive tech sees.

- [ ] **Step 1: Delete the old page entirely**

All 992 lines go, including `Print`, `Tone`, `Aspect`, `toneStyles`, `aspectClass`, `featuredPrint`, `contactSheet`, `rolls`, `marqueeStocks`, `archiveStats`, and both `<Navbar />` and `<Footer />`. Nothing in it is referenced elsewhere — confirm with `grep -rn "toneStyles\|contactSheet\|archiveStats" src/` returning only the gallery file before deleting.

- [ ] **Step 2: Write the settled grid**

Nine tiles chosen from `galleryPhotos`. Fixed selection, not random, so the server and client agree — a random pick during render is a hydration mismatch.

```tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { galleryPhotos } from "@/data/gallery";

/* The nine tiles the sequence settles on. Fixed rather than random: a random
   pick at render time desynchronises server and client markup. */
const SETTLED = [0, 12, 28, 41, 5, 63, 19, 50, 71] as const;

export default function GalleryPage() {
  const tiles = useMemo(() => SETTLED.map((i) => galleryPhotos[i]), []);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <main className="gl-page">
      <Link href="/" className="gl-back">FrameFlow ← back</Link>
      <div className="gl-grid">
        {tiles.map((p, i) => (
          <button key={p.src} type="button" className="gl-tile" onClick={() => setOpen(i)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.thumb} alt={p.alt} width={p.w} height={p.h} />
          </button>
        ))}
      </div>
    </main>
  );
}
```

Ground is `--surface` (graphite); the grid is `width: min(46vw, 620px)`, `aspect-ratio: 1`, three rows of three, `gap: 1em`, centred with `position: fixed; inset: 0; margin: auto`. Tiles are `aspect-ratio: 1` with `object-fit: cover`.

- [ ] **Step 3: Verify**

Load `/gallery`. Expect nine photographs, no navbar, no footer, no console errors, and the back link returning to `/`. `npx tsc --noEmit` clean.

- [ ] **Step 4: Commit**

```bash
git commit -am "feat(gallery): replace fabricated page with a real photo grid"
```

---

### Task 4: The reveal sequence

**Files:**
- Modify: `src/app/gallery/page.tsx`

**Interfaces:**
- Consumes: the grid from Task 3.
- Produces: a `phase` state machine — `"overlay" | "reveal" | "shuffle" | "settled"`.

- [ ] **Step 1: Preload gate**

The shuffle flickers blank if the pool is not decoded. Gate on it, with a timeout so a stalled request cannot trap the visitor:

```tsx
useEffect(() => {
  if (reduced) { setPhase("settled"); return; }
  let cancelled = false;
  const load = (src: string) =>
    new Promise<void>((res) => {
      const im = new Image();
      im.onload = () => im.decode().then(() => res(), () => res());
      im.onerror = () => res();
      im.src = src;
    });
  const all = Promise.all(galleryPhotos.map((p) => load(p.thumb)));
  const timeout = new Promise<void>((res) => setTimeout(res, 4000));
  Promise.race([all, timeout]).then(() => { if (!cancelled) setPhase("reveal"); });
  return () => { cancelled = true; };
}, [reduced]);
```

- [ ] **Step 2: Overlay with the background-position wipe**

`hero-24`'s trick, verbatim: a 200%-tall gradient as `background-image` on transparent-filled text, animating `background-position` from `0% 100%` to `0% 0%`.

```css
.gl-loader h1 {
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-image: linear-gradient(0deg, #4a4744, #4a4744 50%, #ffffeb 0);
  background-size: 100% 200%;
  background-position: 0% 100%;
  transition: background-position 1.4s linear;
}
.gl-loader h1.lit { background-position: 0% 0%; }
```

- [ ] **Step 3: Grid reveal**

Each tile animates `clipPath` from `polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)` to `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`, `duration: 1`, `delay: i * 0.05`, `ease: [0.9, 0, 0.1, 1]`.

- [ ] **Step 4: The shuffle**

Not an animation — a scheduled `src` swap, 20 cycles at 0.15s, exactly as the source does with a zero-duration GSAP timer:

```tsx
useEffect(() => {
  if (phase !== "shuffle") return;
  let cycle = 0;
  const id = setInterval(() => {
    cycle += 1;
    if (cycle >= 20) { clearInterval(id); setPhase("settled"); return; }
    setShuffled(pickNine(cycle));
  }, 150);
  return () => clearInterval(id);
}, [phase]);
```

`pickNine` is seeded by the cycle index rather than `Math.random()`, so the sequence is deterministic and reproducible in verification. It must never return a tile already showing in the same position, or the swap is invisible.

- [ ] **Step 5: Settle**

On reaching `settled`, tiles snap to `SETTLED` and the eyebrow/title words rise from `y: "110%"`, stagger `0.1`, `ease: [0.16, 1, 0.3, 1]`. The back link and skip control fade in.

- [ ] **Step 6: Skip control**

Present from the first frame, fixed bottom-right, `--font-mono`, jumps straight to `settled` and clears any pending interval.

- [ ] **Step 7: Verify**

- Sequence completes in 6.5–7.5s measured from first paint.
- No tile is ever blank: assert every `img.complete && img.naturalWidth > 0` at the end of each phase.
- Skip works during every phase.
- With `prefers-reduced-motion: reduce`, the page is `settled` immediately and no interval is ever created.

- [ ] **Step 8: Commit**

```bash
git commit -am "feat(gallery): reveal sequence — overlay wipe, clip reveal, shuffle"
```

---

### Task 5: Open a photo

**Files:**
- Modify: `src/app/gallery/page.tsx`

- [ ] **Step 1: The opening move**

`hero-24`'s movement 4, applied to the clicked tile. Two transforms in opposition over `1.5s`, ease `[0.9, 0, 0.1, 1]`: the tile scales up while its clip-path insets, and the inner image counter-scales from 2 to 1. Swap `thumb` → `full` as it opens.

- [ ] **Step 2: Never upscale**

The opened image gets `width: min(<natural w>px, 92vw)` and a **definite** height — never `max-height`. 16 photos are 700–900px wide and must display at native size rather than stretch.

- [ ] **Step 3: Caption**

`slate` and the client name, from the manifest. Nothing else — no dates, no EXIF.

- [ ] **Step 4: Focus and dismissal**

Traps focus, returns it to the originating tile on close, closes on Escape and backdrop click, locks body scroll while open.

- [ ] **Step 5: Reduced motion**

Cross-fade instead of scaling.

- [ ] **Step 6: Verify**

At 1440×900, 1080×800, 880×700, 520×640, 390×560 and a short 1440×480: the opened photo is fully within the viewport, uncropped, aspect matching natural, and never wider than its natural width. Focus trap, Escape, backdrop and restore all behave.

- [ ] **Step 7: Commit**

```bash
git commit -am "feat(gallery): click to open — scale, counter-scale, full-res swap"
```

---

### Task 6: Responsive, audit, build

**Files:**
- Modify: `src/app/gallery/page.tsx`

- [ ] **Step 1: Breakpoints**

Below 900px the grid widens to `min(86vw, 520px)` and the gap tightens to `0.5em`; the title drops a step. Below 560px the grid is `92vw`.

- [ ] **Step 2: Full audit**

- `npm run build` — `/gallery` prerenders.
- 1440 / 1080 / 880 / 520 / 390: no horizontal document overflow, no contrast failures (compositing translucent layers, not skipping them), no clipped headings.
- Zero console errors.
- Every one of the 152 derivative URLs returns 200.

- [ ] **Step 3: Commit**

```bash
git commit -am "feat(gallery): responsive pass and final audit"
```

---

## Self-review

**Spec coverage.** Sequence phases → Task 4; open interaction → Task 5; chrome removal → Task 3 Step 1; photographs and captions → Task 1; image pipeline → Task 2; accessibility (skip, reduced motion, focus) → Tasks 4 Step 6, 4 Step 7, 5 Steps 4–5; responsive and audit → Task 6.

**Placeholder scan.** No TBDs. The one value not written out is the nine `SETTLED` indices, which are chosen in Task 3 Step 2 from the real manifest and then fixed.

**Type consistency.** `GalleryPhoto` is defined once in Task 1 with `{src, thumb, full, alt, slate, client, w, h}` and consumed unchanged in Tasks 3–5. The `phase` union is `"overlay" | "reveal" | "shuffle" | "settled"` throughout.

**Risk noted.** Task 4's shuffle mutates nine `<img src>` every 150ms. If a swap lands on an undecoded image the tile flashes empty — which is exactly what the Task 4 Step 1 preload gate and the Step 7 `naturalWidth` assertion exist to catch.
