# Harbour Loom Featured Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bespoke, production-grade featured case-study page for Harbour Loom at `/portfolio/harbourloom` — a flat-woven cotton brand shot in three incompatible registers for three buyers, held together by one mark.

**Architecture:** One self-contained client component (`HarbourLoomPage.tsx`) with scoped `styled-jsx`, its own rail + sign-off (no global Navbar/Footer), reusing `LoadingTransition` and a styled lightbox that replaces the prototype's plain modal. Assets: 5 stills, 2 real reels with extracted posters, and three crops of the mark. Stacked on `feat/aydin-cpa-case-study`.

**Tech Stack:** Next.js 16.2.1 (App Router), React 19.2.4, TypeScript, styled-jsx, ffmpeg (asset prep).

## Global Constraints

- **Read `node_modules/next/dist/docs/` before writing Next-specific code** — this Next.js has breaking changes vs. training data (per AGENTS.md).
- Featured pages are `"use client"`, fully bespoke, **no global `<Navbar>`/`<Footer>`**; this page **does** use `LoadingTransition`.
- **All content real.** Every asset shipped exists in the client folder. **No fabricated brand document** — the folder has no lockup sheet, colour spec or source files, so section 04 shows only the two mark colourways as they literally appear in the posts.
- Palette: ink `#1D2B33`, sea `#2E7BA6`, coral `#E8763F`, sand `#F2E9DD`, shell `#FAF6F0`, paper `#FFF`, mute `#8A8378`, rule `rgba(29,43,51,.14)`.
- Type: **Cormorant Garamond** (`ital,wght@0,300;0,400;0,600;1,400`) + **Jost** (300;400;500) via Google Fonts `<link>` with two `<link rel="preconnect">` (incl. `crossOrigin=""` on gstatic). The prototype's display stack names the brand's own face first — `"Juana","Cormorant Garamond",Georgia,serif` — and is **kept verbatim**.
- JSX text must escape apostrophes/quotes (`&rsquo;` `&amp;`) for `react/no-unescaped-entities`. Data in plain JS string literals must NOT be escaped.
- **`prefers-reduced-motion` must disable** the lightbox fade/pop, the `.hl-cell` hover scale, and button transitions. Target only selectors that exist.
- **Lightbox sizing (hard requirement, regression guard):** the modal stage must carry a **definite `height`**, with the image at `width:100%;height:100%;object-fit:contain` and the image wrapper at `flex:1 1 auto;min-height:0`. A `max-height`-only stage resolves to `auto`, the image's percentage height is ignored, and the still renders at natural size and is clipped — this bug shipped on IYN and was user-reported, and was prevented on Esma and MinAuto. Stills are 1080×1350 portrait. Applies at **every** breakpoint.
- Frame number derives from `getFrameNumber(client)` (roster index 13 → `"014"`) — never hardcoded.
- No unit-test framework; verification per task = `npx tsc --noEmit` + `npm run lint` (no NEW errors vs the known baseline: **6 pre-existing errors** in unrelated files — ThemeProvider/ThemeToggle/MarkScene/admin-analytics — plus `no-page-custom-font` / `no-img-element` warnings every featured page carries) + `npm run build`. Portfolio pages client-render — verify routes via `npm run build`, not curl.
- Shell note: some sandboxed shells reset `PATH`; prefix asset/build commands with
  `export PATH="/usr/bin:/bin:/usr/local/bin:/opt/homebrew/bin:$PATH"`.
- On this machine `mkdir`/`cp`/`rm` under `public/portfolio/...` can fail with "Operation not permitted" (macOS xattrs). Workarounds in order: seed the destination with the `Write` tool then let ffmpeg overwrite; `ffmpeg -i src -c copy dst`; `python3` `os.makedirs`/`shutil.copyfile`. Never `rm` anything under `/Users/barandiloglu/Downloads`.

---

### Task 1: Media assets (5 stills, 2 reels + posters, 3 mark crops)

Place everything under `public/portfolio/harbourloom/`. No app code.

All sources are in `/Users/barandiloglu/Downloads/Harbourloom/`. **The mapping below was verified by a human viewing every file — do not re-derive it.** Note the base image/video filenames have no ` (n)` suffix; quote every path.

| Source | Target |
|---|---|
| `WhatsApp Image 2026-07-29 at 15.46.53.jpeg` | `posts/01-beach-triptych.jpg` |
| `WhatsApp Image 2026-07-29 at 15.46.53 (1).jpeg` | `posts/02-muse.jpg` |
| `WhatsApp Image 2026-07-29 at 15.46.53 (2).jpeg` | `posts/03-weave-macro.jpg` |
| `WhatsApp Image 2026-07-29 at 15.46.53 (3).jpeg` | `posts/04-b2b-cloud.jpg` |
| `WhatsApp Image 2026-07-29 at 15.46.53 (4).jpeg` | `posts/05-b2b-hospitality.jpg` |
| `WhatsApp Video 2026-07-29 at 15.47.05.mp4` (720×1280, **16.73s**) | `video/beach-reel.mp4` |
| `WhatsApp Video 2026-07-29 at 15.47.05 (1).mp4` (720×1280, **24.73s**) | `video/marine-reel.mp4` |

- [ ] **Step 1: Create directories**

```bash
export PATH="/usr/bin:/bin:/usr/local/bin:/opt/homebrew/bin:$PATH"
R="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/harbourloom"
mkdir -p "$R"/posts "$R"/video "$R"/brand
```

- [ ] **Step 2: The 5 stills** (1080×1350 sources; keep size, re-encode)

```bash
S="/Users/barandiloglu/Downloads/Harbourloom"
R="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/harbourloom"
q(){ ffmpeg -y -loglevel error -i "$1" -q:v 4 "$2"; }
q "$S/WhatsApp Image 2026-07-29 at 15.46.53.jpeg"     "$R/posts/01-beach-triptych.jpg"
q "$S/WhatsApp Image 2026-07-29 at 15.46.53 (1).jpeg" "$R/posts/02-muse.jpg"
q "$S/WhatsApp Image 2026-07-29 at 15.46.53 (2).jpeg" "$R/posts/03-weave-macro.jpg"
q "$S/WhatsApp Image 2026-07-29 at 15.46.53 (3).jpeg" "$R/posts/04-b2b-cloud.jpg"
q "$S/WhatsApp Image 2026-07-29 at 15.46.53 (4).jpeg" "$R/posts/05-b2b-hospitality.jpg"
```

- [ ] **Step 3: Both reels + posters extracted from the footage.** The prototype references posters that were never supplied; a representative frame is the honest source.

```bash
S="/Users/barandiloglu/Downloads/Harbourloom"
R="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/harbourloom"
ffmpeg -y -loglevel error -i "$S/WhatsApp Video 2026-07-29 at 15.47.05.mp4"     -c:v libx264 -crf 26 -preset slow -c:a aac -b:a 128k -movflags +faststart "$R/video/beach-reel.mp4"
ffmpeg -y -loglevel error -i "$S/WhatsApp Video 2026-07-29 at 15.47.05 (1).mp4" -c:v libx264 -crf 26 -preset slow -c:a aac -b:a 128k -movflags +faststart "$R/video/marine-reel.mp4"
ffmpeg -y -loglevel error -ss 3 -i "$R/video/beach-reel.mp4"  -frames:v 1 -q:v 4 "$R/video/beach-poster.jpg"
ffmpeg -y -loglevel error -ss 2 -i "$R/video/marine-reel.mp4" -frames:v 1 -q:v 4 "$R/video/marine-poster.jpg"
```
**Read both posters.** Requirements, verified before accepting:
- `marine-poster.jpg` must be the **drone shot of the catamaran on open water** (twin hulls, two wakes) — NOT a moored boat and NOT the closing logo card.
- `beach-poster.jpg` must be **towels draped over the wooden fence** — NOT the closing logo card and not a pure-sky frame.
If either is wrong, re-extract at a different `-ss` (try 1/5/7 for beach, 1/4 for marine) until correct. Report the timestamps you settled on.

- [ ] **Step 4: Extract the mark, three ways.** No standalone logo file exists. The cleanest source is the B2B cloud post, where the mark sits navy on pure white.

```bash
S="/Users/barandiloglu/Downloads/Harbourloom"
R="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/harbourloom"
# (a) tight crop, navy on white — used as-is for the section-04 tile
ffmpeg -y -loglevel error -i "$S/WhatsApp Image 2026-07-29 at 15.46.53 (3).jpeg" -vf "crop=340:130:390:45" "$R/brand/mark-navy.png"
# (b) same crop keyed to transparency — hero + sign-off, sits on shell #faf6f0
ffmpeg -y -loglevel error -i "$R/brand/mark-navy.png" -vf \
"format=rgba,geq=r='20':g='38':b='55':a='clip((255-(0.299*r(X,Y)+0.587*g(X,Y)+0.114*b(X,Y)))*1.22,0,255)'" \
"$R/brand/logo-navy.png"
# (c) the reversed colourway, on its real photographic ground — section-04 tile
ffmpeg -y -loglevel error -i "$S/WhatsApp Image 2026-07-29 at 15.46.53 (1).jpeg" -vf "crop=420:150:250:1150" "$R/brand/mark-reversed.png"
```
Note `lum()` is NOT available in `geq` on RGBA input — the explicit luminance expression above is required. The `1.22` multiplier normalises the mark's navy (sampled ≈ `#0e1928`) to full opacity.

**Prove the transparency** by compositing over the hero shell, then Read the proof:

```bash
ffmpeg -y -loglevel error -f lavfi -i "color=c=0xfaf6f0:s=460x200" -i "$R/brand/logo-navy.png" \
  -filter_complex "[0][1]overlay=(W-w)/2:(H-h)/2" -frames:v 1 /tmp/hl-proof.png
```
Expected: a navy sailboat above "HARBOUR" / "Loom" on shell, with **no white box and no pale halo**. Also Read `mark-navy.png` (navy mark on white) and `mark-reversed.png` (white mark over orange towel weave) and confirm each is complete and uncropped. If any crop clips the mark, adjust offsets and re-run before proceeding.

- [ ] **Step 5: Verify**

```bash
R="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/harbourloom"
find "$R" -type f | wc -l        # expect 12 (5 posts + 4 video + 3 brand)
find "$R"/posts "$R"/brand -type f -size +400k   # images only; expect no output
ffprobe -v error -show_entries format=duration -of csv=p=0 "$R/video/beach-reel.mp4"   # ~16.7
ffprobe -v error -show_entries format=duration -of csv=p=0 "$R/video/marine-reel.mp4"  # ~24.7
ffprobe -v error -select_streams v:0 -show_entries stream=pix_fmt -of csv=p=0 "$R/brand/logo-navy.png"  # rgba
```
**Read these and confirm content matches the filename:**
- `posts/01-beach-triptych.jpg` — three panels, line ends "A tangible piece of a perfect day."
- `posts/03-weave-macro.jpg` — pink/orange weave over blue cloth, no copy but the mark
- `posts/04-b2b-cloud.jpg` — white towels on marble, "We tried to photograph a cloud."
- `posts/05-b2b-hospitality.jpg` — wicker baskets poolside (warm lifestyle, NOT white studio)
If any mismatch, STOP and report.

- [ ] **Step 6: Commit**

```bash
cd /Users/barandiloglu/Desktop/Projects/FrameFlow
git add public/portfolio/harbourloom
git commit -m "feat(portfolio): add Harbour Loom media (5 stills, 2 reels, posters, extracted mark)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Data promotion, wiring, and component stub

**Files:**
- Modify: `src/data/clients.ts` (the `harbourloom` entry, ~line 399)
- Modify: `src/app/portfolio/[slug]/featured.ts`
- Create: `src/components/portfolio/featured/HarbourLoomPage.tsx` (stub)

**Interfaces:**
- Produces: `export function HarbourLoomPage({ client }: { client: Client })`.

- [ ] **Step 1: Promote the `clients.ts` entry.** Replace the one-line `harbourloom` entry with:

```ts
  {
    slug: "harbourloom",
    name: "Harbour Loom",
    services: ["Logo", "Photography", "Social Media", "Videography"],
    year: "2026",
    location: "Ontario",
    runtime: "Ongoing",
    scene: "EXT. THE SHORELINE — GOLDEN HOUR",
    synopsis:
      "Identity, photography and social for a flat-woven cotton mill selling to three buyers who want three different pictures. Beach is shot at arm's length and warm; Marine drops the product entirely and goes up on a drone; B2B strips the sand out and stacks the cloth on marble. Three registers that should not belong together, held in one brand by the mark that closes every frame.",
    featured: true,
  },
```
- **`name` changes from `"Harbourloom"` to `"Harbour Loom"`** (two words, matching the logo lockup). Approved by the user.
- The **slug stays `harbourloom`** — do NOT change it; the route and all links depend on it.
- **Replace in place.** The array index (13) determines the frame number; do not move, add or remove any roster entry. After editing, verify `harbourloom` is still index 13.

- [ ] **Step 2: Create the stub** at `src/components/portfolio/featured/HarbourLoomPage.tsx`:

```tsx
"use client";

import type { Client } from "@/data/clients";

type Props = { client: Client };

export function HarbourLoomPage({ client }: Props) {
  return <main style={{ padding: 80 }}>{client.name} — case study (stub)</main>;
}
```

- [ ] **Step 3: Register in `featured.ts`** — import + map entry, matching sibling alignment:

```ts
import { HarbourLoomPage } from "@/components/portfolio/featured/HarbourLoomPage";
```
```ts
  "harbourloom":                   HarbourLoomPage,
```

- [ ] **Step 4: Typecheck, lint, build**

```bash
cd /Users/barandiloglu/Desktop/Projects/FrameFlow
npx tsc --noEmit && npm run lint && npm run build
```
Expected: tsc clean; lint at baseline; build emits `.next/server/app/portfolio/harbourloom.html`. Also confirm the frame resolves to `"014"` and that no other client's frame number changed.

- [ ] **Step 5: Commit**

```bash
git add src/data/clients.ts src/app/portfolio/[slug]/featured.ts src/components/portfolio/featured/HarbourLoomPage.tsx
git commit -m "feat(portfolio): promote Harbour Loom to featured + wire stub route

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Shell — CSS port, LoadingTransition, rail, hero

**CSS source of truth:** `/Users/barandiloglu/Downloads/harbourloom-preview.html` (`<style>`, lines 10–109). Port into `styled-jsx global`. Reproduce the `.hl-*` rules and both `@media` blocks verbatim. **DROP** the `*{box-sizing:border-box}` and `body{margin:0}` reset. **KEEP** the `.hl-page` CSS-variable block verbatim. The `.hl-div*`, `.hl-cell*`, `.hl-reel*`, `.hl-sign*` rules have no markup yet (Tasks 4–6) — port them anyway, do not delete as unused. The `.hl-modal*` rules are **replaced** in Task 4; porting them as-is now is fine.

**Files:**
- Modify: `src/components/portfolio/featured/HarbourLoomPage.tsx`

**Interfaces:**
- Consumes: `LoadingTransition` — props `{ frameNumber, clientName, scope, location?, year? }`; `getFrameNumber`.
- Produces: the `.hl-page` root.

- [ ] **Step 1: Write the shell.** Replace the stub with:

```tsx
"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getFrameNumber } from "@/data/clients";
import type { Client } from "@/data/clients";
import { LoadingTransition } from "@/components/portfolio/LoadingTransition";

type Props = { client: Client };

export function HarbourLoomPage({ client }: Props) {
  const frame = getFrameNumber(client); // "014"

  return (
    <div className="hl-page">
      <LoadingTransition
        frameNumber={frame}
        clientName={client.name}
        scope={["Logo", "Photography", "Social", "Film"]}
        location="Ontario"
        year={client.year}
      />

      <header className="hl-rail">
        <Link className="hl-back" href="/portfolio">← Portfolio</Link>
        <span className="hl-rail-mid">Harbour Loom</span>
        <span className="hl-rail-end">Logo · Photography · Social · Film — Reel {frame}</span>
      </header>

      <section className="hl-hero">
        <div className="hl-hero-inner">
          <img className="hl-hero-logo" src="/portfolio/harbourloom/brand/logo-navy.png" alt="Harbour Loom" />
          <p className="hl-kicker">Logo · Photography · Social Media · Film</p>
          <h1 className="hl-h1">Shot close for the beach.<br /><em>Wide for the water.</em><br />Clean for the trade.</h1>
          <p className="hl-deck"><b>Harbour Loom</b> weaves flat-woven cotton for three different buyers, and the same picture does not work on all three. We built the mark, the photography and the feed around that split — one division shot at arm&rsquo;s length, one from a hundred feet up, one on pure white — and kept all three unmistakably the same brand.</p>
        </div>
        <div className="hl-hero-strip"><span></span><span></span><span></span><span></span><span></span></div>
      </section>

      <FontLink />
      <style jsx global>{`
        /* PORT the prototype <style> (lines 10–109) here.
           Drop the '*{}' + 'body{margin:0}' reset. Keep the .hl-page var block. */
      `}</style>
    </div>
  );
}

function FontLink() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Jost:wght@300;400;500&display=swap"
      />
    </>
  );
}
```
The kicker and deck differ from the prototype on purpose: the user confirmed FrameFlow
made the mark, so `Logo` joins the scope and the deck says "the mark, the photography
and the feed". Use the text above verbatim. `useCallback`/`useEffect`/`useState` are
imported for Task 4; if lint flags them unused now, leave them.

- [ ] **Step 2: Port the prototype CSS** (lines 10–109) per the rules above.

- [ ] **Step 3: Typecheck, lint, build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/components/portfolio/featured/HarbourLoomPage.tsx
git commit -m "feat(portfolio): Harbour Loom shell — rail, hero, loading transition

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: The Three Lines, 01 Beach, and the styled lightbox

Adds the divisions band, the Beach section (3 stills + the 0:17 reel), and the styled lightbox that replaces the prototype's plain modal. The lightbox serves **all 5 stills** — the two B2B cells in Task 5 index into the same array.

**Files:**
- Modify: `src/components/portfolio/featured/HarbourLoomPage.tsx`

**Interfaces:**
- Consumes: `useState`, `useEffect`, `useCallback`.
- Produces: `DIVISIONS` and `GALLERY` consts, `lightbox` state + handlers, and the styled `.hl-modal` markup + CSS. **`GALLERY` holds all 5 stills with a `lane` field; sections render `GALLERY.map` filtered by lane so the mapped index `i` is always the true global index.** Do not use a filtered sub-array with offset arithmetic — that is how off-by-one lightbox bugs happen.

- [ ] **Step 1: Add the consts** at module scope (after `type Props`):

```tsx
const DIVISIONS = [
  { no: "01", name: "Beach",  camera: "Macro & still",    tone: "Sand, coral, low sun",
    body: "The consumer line. Everything is shot at arm's length or closer — fringe, weave, the fold of a towel over driftwood. Warm, unhurried, and always tied to a place you would rather be." },
  { no: "02", name: "Marine", camera: "Aerial & moving",  tone: "Open water, cold light",
    body: "The boating line. The product barely appears; the water does. Shot from the air, following a catamaran across open lake — this division sells the life the cloth belongs to, not the cloth." },
  { no: "03", name: "B2B",    camera: "Studio & clean",   tone: "White, marble, poolside",
    body: "The hospitality line. Sold to operators, not holidaymakers — so the cloth is stacked, spotless and shot on white, and the copy talks about their guests instead of ours." },
] as const;

const GALLERY = [
  { id: "B.01", lane: "beach", src: "/portfolio/harbourloom/posts/01-beach-triptych.jpg",
    line: "Let the footprints fade. Keep the feeling. A tangible piece of a perfect day.",
    note: "Triptych. Product, place, detail — read left to right in a second and a half.",
    alt: "Three-panel Harbour Loom post — a blue and orange fish-print towel on sand, footprints through sunlit dunes, and a fringed woven edge in close-up" },
  { id: "B.02", lane: "beach", src: "/portfolio/harbourloom/posts/02-muse.jpg",
    line: "Mother Nature is our muse. And our toughest rival.",
    note: "One hero frame, three supporting. The line earns the space it takes.",
    alt: "Harbour Loom post — an orange fringed towel draped over driftwood beside three smaller frames of weave, sunset shore and sunset sky" },
  { id: "B.03", lane: "beach", src: "/portfolio/harbourloom/posts/03-weave-macro.jpg",
    line: "No copy. Just the cloth.",
    note: "Shot close enough to count threads. The texture is the entire argument.",
    alt: "Macro photograph of a pink and orange patterned Harbour Loom weave folded over a blue cloth" },
  { id: "W.01", lane: "b2b", src: "/portfolio/harbourloom/posts/04-b2b-cloud.jpg",
    line: "We tried to photograph a cloud. This was the best we could do.",
    note: "Pure studio. One joke, delivered straight — the only humour anywhere in the brand.",
    alt: "Three folded white hotel towels stacked on a marble counter against a pure white background" },
  { id: "W.02", lane: "b2b", src: "/portfolio/harbourloom/posts/05-b2b-hospitality.jpg",
    line: "You create the picture-perfect oasis for your guests. We supply the high-performance textiles to complete it. Let's ensure your service never misses a beat.",
    note: "The buyer's world, not the product's. Baskets, poolside, service in motion.",
    alt: "Harbour Loom hospitality post — rolled white towels in wicker baskets beside a resort pool with palms and a sea view" },
] as const;
```
The B.01 and W.02 lines are the **full** copy from the artwork; the prototype truncated
both. The B.03 alt says pink/orange, not the prototype's "coral". Use these verbatim.

- [ ] **Step 2: Add lightbox state + handlers + keyboard effect** inside the component (after `frame`):

```tsx
  const [lightbox, setLightbox] = useState<number | null>(null);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const stepLightbox = useCallback(
    (delta: number) => setLightbox((i) => (i === null ? i : (i + delta + GALLERY.length) % GALLERY.length)),
    []
  );

  useEffect(() => {
    if (lightbox === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") stepLightbox(-1);
      else if (e.key === "ArrowRight") stepLightbox(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeLightbox, stepLightbox]);
```

- [ ] **Step 3: Add the two sections** after the hero `</section>`:

```tsx
      <section className="hl-div">
        <h2 className="hl-sec"><span>The Three Lines</span><i></i></h2>
        <div className="hl-div-grid">
          {DIVISIONS.map((d) => (
            <article key={d.no}>
              <span className="hl-div-no">{d.no}</span>
              <h3>{d.name}</h3>
              <p className="hl-div-meta">{d.camera}<i>·</i>{d.tone}</p>
              <p>{d.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="hl-beach">
        <h2 className="hl-sec"><span>01 — Beach</span><i></i><em>Macro &amp; still</em></h2>
        <p className="hl-lead">Sell the cloth by making people want to touch it.</p>
        <p className="hl-body">Every frame in this division is either the weave itself or the weave against somewhere warm. Editorial grids — a triptych, a hero with three supports — because a single square cannot carry both the product and the place. The copy stays out of the way: two lines, set in the brand&rsquo;s own serif, never competing with the photograph.</p>
        <div className="hl-sheet">
          {GALLERY.map((g, i) => g.lane !== "beach" ? null : (
            <button type="button" className="hl-cell" key={g.id} onClick={() => setLightbox(i)}>
              <img className="hl-cell-img" src={g.src} alt={g.alt} loading="lazy" />
              <span className="hl-cell-meta"><b>{g.id}</b><span>{g.note}</span></span>
            </button>
          ))}
        </div>
        <figure className="hl-reel beach">
          <video className="hl-reel-el" controls preload="none" poster="/portfolio/harbourloom/video/beach-poster.jpg">
            <source src="/portfolio/harbourloom/video/beach-reel.mp4" type="video/mp4" />
          </video>
          <figcaption><b>Beach reel</b> — 0:17, vertical. Towels over a fence, one pattern after another, closing on &ldquo;Which one is yours?&rdquo;</figcaption>
        </figure>
      </section>
```
The reel caption is **rewritten** — the prototype's "The towel, the sand, the light, in
that order" does not describe this reel, which is a range pitch ending on a question.

- [ ] **Step 4: Add the styled lightbox** inside `.hl-page`, just before `<FontLink />`:

```tsx
      {lightbox !== null && (
        <div
          className="hl-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${GALLERY[lightbox].id} — frame ${lightbox + 1} of ${GALLERY.length}`}
          onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
        >
          <button type="button" className="hl-modal-nav prev" onClick={() => stepLightbox(-1)} aria-label="Previous">‹</button>

          <div className="hl-modal-stage">
            <div className="hl-modal-bar">
              <span className="hl-modal-id">{GALLERY[lightbox].id}</span>
              <span className="hl-modal-count">{String(lightbox + 1).padStart(2, "0")} / {String(GALLERY.length).padStart(2, "0")}</span>
              <button type="button" className="hl-modal-close" onClick={closeLightbox} aria-label="Close">✕</button>
            </div>
            <div className="hl-modal-shot">
              <img src={GALLERY[lightbox].src} alt={GALLERY[lightbox].alt} />
            </div>
          </div>

          <button type="button" className="hl-modal-nav next" onClick={() => stepLightbox(1)} aria-label="Next">›</button>
          <p className="hl-modal-cap">{GALLERY[lightbox].line}</p>
        </div>
      )}
```

- [ ] **Step 5: Replace the ported `.hl-modal*` CSS.** Remove the old `.hl-modal`, `.hl-modal-inner`, `.hl-modal-img`, `.hl-modal-x`, `.hl-modal-nav`, `.hl-modal-cap` rules and add:

```css
.hl-modal{position:fixed;inset:0;z-index:90;display:flex;align-items:center;justify-content:center;padding:36px;background:rgba(12,26,33,.95);font-family:"Jost",sans-serif;animation:hl-fade .22s ease-out}
@keyframes hl-fade{from{opacity:0}to{opacity:1}}
.hl-modal-stage{position:relative;width:min(560px,88vw);height:min(78vh,860px);max-height:82vh;background:var(--paper);display:flex;flex-direction:column;box-shadow:0 30px 90px rgba(0,0,0,.5);animation:hl-pop .28s cubic-bezier(0.34,1.56,0.64,1)}
@keyframes hl-pop{from{transform:scale(.96);opacity:0}to{transform:scale(1);opacity:1}}
.hl-modal-bar{flex:0 0 auto;display:flex;align-items:center;gap:12px;padding:12px 14px;border-bottom:1px solid var(--rule);font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--mute)}
.hl-modal-id{color:var(--coral)}
.hl-modal-count{margin-left:auto;font-variant-numeric:tabular-nums;color:var(--ink)}
.hl-modal-close{width:26px;height:26px;background:none;border:0;color:var(--ink);cursor:pointer;font-size:15px;line-height:1;padding:0;display:flex;align-items:center;justify-content:center;transition:color .16s}
.hl-modal-close:hover{color:var(--coral)}
.hl-modal-shot{flex:1 1 auto;min-height:0;background:var(--shell);overflow:hidden;display:flex;align-items:center;justify-content:center}
.hl-modal-shot img{width:100%;height:100%;object-fit:contain;display:block}
.hl-modal-nav{position:absolute;top:50%;transform:translateY(-50%);width:52px;height:52px;background:rgba(255,255,255,.07);border:0;color:#fff;font-size:34px;line-height:1;padding:0;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .16s,background .16s,color .16s;z-index:2}
.hl-modal-nav:hover{transform:translateY(-50%) scale(1.06);background:rgba(255,255,255,.14);color:var(--coral)}
.hl-modal-nav.prev{left:26px}.hl-modal-nav.next{right:26px}
.hl-modal-cap{position:absolute;left:40px;right:40px;bottom:22px;margin:0;text-align:center;font-family:"Juana","Cormorant Garamond",Georgia,serif;font-style:italic;font-size:17px;line-height:1.5;color:rgba(255,255,255,.82);z-index:1}
```
**The stage's definite `height` is load-bearing** — see Global Constraints. Do not reduce it to `max-height` alone.

- [ ] **Step 6: Confirm the old modal rules are gone**

```bash
grep -n "hl-modal-inner\|hl-modal-img\|hl-modal-x" src/components/portfolio/featured/HarbourLoomPage.tsx || echo "clean"
grep -c "\.hl-modal{" src/components/portfolio/featured/HarbourLoomPage.tsx   # expect 1
```

- [ ] **Step 7: Typecheck, lint, build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```
Expected: the previously-unused hook-import warnings now clear.

- [ ] **Step 8: Commit**

```bash
git add src/components/portfolio/featured/HarbourLoomPage.tsx
git commit -m "feat(portfolio): Harbour Loom three lines, Beach section, styled lightbox

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: 02 Marine and 03 B2B

**Files:**
- Modify: `src/components/portfolio/featured/HarbourLoomPage.tsx`

**Interfaces:**
- Consumes: `GALLERY`, `setLightbox` from Task 4.
- Produces: the `.hl-marine` and `.hl-b2b` markup.

- [ ] **Step 1: Add both sections** after the `.hl-beach` section:

```tsx
      <section className="hl-marine">
        <h2 className="hl-sec light"><span>02 — Marine</span><i></i><em>Aerial &amp; moving</em></h2>
        <div className="hl-marine-grid">
          <figure className="hl-reel marine">
            <video className="hl-reel-el" controls preload="none" poster="/portfolio/harbourloom/video/marine-poster.jpg">
              <source src="/portfolio/harbourloom/video/marine-reel.mp4" type="video/mp4" />
            </video>
            <figcaption><b>Marine reel</b> — 0:25, vertical, drone. Out on the lake, a moored yacht, a marina of masts.</figcaption>
          </figure>
          <div>
            <p className="hl-lead light">Here the product gets out of the way.</p>
            <p className="hl-body light">A boat owner is not shopping for a towel. They are picturing a Saturday. So Marine drops the macro lens entirely and goes up — a catamaran cutting a line across the lake, twin wakes behind it, the horizon doing all the selling.</p>
            <p className="hl-body light">Cold light where Beach is warm. Motion where Beach is still. Wide where Beach is close. The only constant is the mark in the corner — which is exactly how you keep one brand from splitting into three.</p>
          </div>
        </div>
      </section>

      <section className="hl-b2b">
        <h2 className="hl-sec"><span>03 — B2B</span><i></i><em>Studio &amp; clean</em></h2>
        <p className="hl-lead">Third buyer, third room entirely.</p>
        <p className="hl-body">Hotels and clubs do not buy a feeling, they buy linen that survives a thousand washes. So the sunset goes and the cloth gets stacked on marble against pure white — the one place in this brand where the product is photographed like a product. Then the second frame steps into the buyer&rsquo;s own world instead: baskets, poolside, service mid-service. Warm again, but warm about <i>their</i> guests, never ours.</p>
        <div className="hl-sheet two">
          {GALLERY.map((g, i) => g.lane !== "b2b" ? null : (
            <button type="button" className="hl-cell" key={g.id} onClick={() => setLightbox(i)}>
              <img className="hl-cell-img" src={g.src} alt={g.alt} loading="lazy" />
              <span className="hl-cell-meta"><b>{g.id}</b><span>{g.note}</span></span>
            </button>
          ))}
        </div>
      </section>
```
The B2B body is **rewritten**: the prototype claimed the whole division is pure white
studio, but W.02 is warm poolside lifestyle. The Marine copy is the prototype's,
retained because a high-resolution crop of the drone opener confirmed the catamaran and
twin wakes; only the reel caption is tightened to describe all three of its beats.

- [ ] **Step 2: Typecheck, lint, build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/components/portfolio/featured/HarbourLoomPage.tsx
git commit -m "feat(portfolio): Harbour Loom Marine and B2B sections

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 6: 04 One Mark, and the sign-off

The payoff section. Shows the mark in **both colourways exactly as they appear in the work** — no invented lockup sheet, no colour or type spec, because none exists in the client folder.

**Files:**
- Modify: `src/components/portfolio/featured/HarbourLoomPage.tsx`

**Interfaces:**
- Produces: the `.hl-mark` and `.hl-signoff` markup, plus all `.hl-mark*` CSS (new — not in the prototype).

- [ ] **Step 1: Add both sections** after the `.hl-b2b` section (and before the lightbox JSX):

```tsx
      <section className="hl-mark">
        <h2 className="hl-sec"><span>04 — One Mark</span><i></i><em>Two colourways</em></h2>
        <p className="hl-lead">Three registers. Seven pieces. One thing in common.</p>
        <p className="hl-body">Beach is warm and close, Marine is cold and wide, B2B is clean and bright — three treatments that would read as three companies if nothing tied them. What ties them is a sailboat and two words, and the discipline of putting it in every single frame. Navy where the ground is white, reversed where it sits on a photograph. Nothing else about the mark changes, anywhere.</p>
        <div className="hl-mark-pair">
          <figure className="hl-mark-tile">
            <img src="/portfolio/harbourloom/brand/mark-navy.png" alt="The Harbour Loom mark in navy — a sailboat above HARBOUR in serif capitals over Loom in script" loading="lazy" />
            <figcaption><b>Navy</b> — on white and marble grounds. B.01, W.01.</figcaption>
          </figure>
          <figure className="hl-mark-tile">
            <img src="/portfolio/harbourloom/brand/mark-reversed.png" alt="The same Harbour Loom mark reversed in white, sitting over an orange woven towel" loading="lazy" />
            <figcaption><b>Reversed</b> — on photography. B.02, B.03, W.02, and the closing card of both reels.</figcaption>
          </figure>
        </div>
      </section>

      <footer className="hl-signoff">
        <img className="hl-sign-logo" src="/portfolio/harbourloom/brand/logo-navy.png" alt="Harbour Loom" />
        <div className="hl-sign-grid">
          <div><p className="hl-sign-label">Client</p><p className="hl-sign-name">Harbour Loom</p></div>
          <div><p className="hl-sign-label">Scope</p><p className="hl-sign-name">Logo · Photography · Social · Film</p></div>
          <div><p className="hl-sign-label">By</p><p className="hl-sign-name accent">FrameFlow</p></div>
        </div>
        <Link className="hl-sign-back" href="/portfolio">← Back to portfolio</Link>
      </footer>
```
The "seven pieces" and per-piece attributions are **verified** — the mark appears in all
5 stills and closes both reels. Do not alter these counts.

- [ ] **Step 2: Add the section CSS** (new) at the end of the `styled-jsx` block, before the media queries:

```css
.hl-mark{background:var(--shell);padding:84px 22px}
.hl-mark-pair{max-width:1160px;margin:40px auto 0;display:grid;grid-template-columns:repeat(2,1fr);gap:22px}
.hl-mark-tile{margin:0}
.hl-mark-tile img{width:100%;height:auto;display:block;border:1px solid var(--rule);background:var(--paper)}
.hl-mark-tile figcaption{margin-top:12px;font-size:13px;line-height:1.6;font-weight:300;color:#5a6670}
.hl-mark-tile figcaption b{display:block;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--coral);margin-bottom:5px;font-weight:400}
```

- [ ] **Step 3: Add the responsive rule** inside the EXISTING `@media(max-width:980px)` block (do not create a new one):

```css
.hl-mark-pair{grid-template-columns:1fr;max-width:420px}
```

- [ ] **Step 4: Typecheck, lint, build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/components/portfolio/featured/HarbourLoomPage.tsx
git commit -m "feat(portfolio): Harbour Loom One Mark section and sign-off

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 7: Reduced-motion, responsive, final verification

**Files:**
- Modify: `src/components/portfolio/featured/HarbourLoomPage.tsx`

- [ ] **Step 0: Consolidate the existing reduced-motion block.** Task 3's implementer
  added an early `@media (prefers-reduced-motion: reduce)` block covering only the
  `.hl-cell` hover — ahead of its task. There must end up with exactly **ONE** such
  block in the file. Find it, and extend it in place rather than adding a second:

```bash
grep -c "prefers-reduced-motion" src/components/portfolio/featured/HarbourLoomPage.tsx  # must be 1 before AND after this task
```

- [ ] **Step 1: Grep for the real motion declarations**, then write the block to match. Do not invent selectors:

```bash
grep -o "transition:[^;}]*" src/components/portfolio/featured/HarbourLoomPage.tsx | sort -u
grep -o "animation:[^;}]*" src/components/portfolio/featured/HarbourLoomPage.tsx | sort -u
```

- [ ] **Step 2: Add the reduced-motion block** at the end of the `styled-jsx` block (adjust to the grep):

```css
@media (prefers-reduced-motion: reduce){
  .hl-modal,.hl-modal-stage{animation:none}
  .hl-cell-img,.hl-modal-close,.hl-modal-nav{transition:none}
  .hl-cell:hover .hl-cell-img{transform:none}
  .hl-modal-nav:hover{transform:translateY(-50%)}
}
```
`.hl-modal-nav`'s `translateY(-50%)` does vertical **centering**, not motion — it MUST
be preserved. `transform:none` there would misalign the buttons.

- [ ] **Step 3: Add the mobile lightbox override** inside the EXISTING `@media(max-width:560px)` block. The nav buttons are positioned against the fixed backdrop, not the stage, so at narrow widths they overlap the artwork:

```css
.hl-modal{padding:12px}
.hl-modal-stage{width:calc(100% - 84px);height:min(74vh,660px)}
.hl-modal-nav{width:34px;height:34px;font-size:22px}
.hl-modal-nav.prev{left:5px}.hl-modal-nav.next{right:5px}
.hl-modal-cap{left:12px;right:12px;bottom:8px;font-size:14px}
```
Keep the **definite height** here too — never `max-height` alone.

- [ ] **Step 4: Typecheck + lint**

```bash
npx tsc --noEmit && npm run lint
```

- [ ] **Step 5: Runtime verification.** Start `npm run dev` on a FREE port (check first; do not disturb anything on :3000). Drive headless Chrome over CDP — Node 22 has a global `WebSocket`; adapt the working reference at `/private/tmp/claude-501/-Users-barandiloglu-Desktop-Projects-FrameFlow/7e23bbf1-d226-407b-987c-54afe7d4f251/scratchpad/verify-iyn.mjs`. Launch Chrome with `--headless=new --remote-debugging-port=<port>`.
  **Navigate to `localhost:<port>`, NOT `127.0.0.1:<port>`** — Next 16's `allowedDevOrigins` guard blocks dev resources from `127.0.0.1` and hydration hangs forever with no visible error. If Turbopack refuses a second dev server for this directory, run it from a git worktree with `next dev --webpack`. Allow ~7s after navigation for the loading transition.

  Verify and report with numbers:
  - Renders past the loading transition; hero mark loads (`naturalWidth > 0`) and the sign-off mark too.
  - 3 divisions; 3 beach cells; 2 b2b cells.
  - Clicking the FIRST B2B cell opens the lightbox at **04 / 05** — this proves the global-index wiring; a filtered-index bug would show 01/05.
  - ←/→ wrap across all 5; Escape closes; `document.body.style.overflow` restored to `""`.
  - **Crop guard: with the lightbox open, measure the rendered `<img>` height against its container's `clientHeight` and confirm the 1080×1350 portrait still is NOT cropped — at desktop (1440×1000) AND mobile (390×844).** Measure only after the pop-in animation settles (~400ms); reading mid-transform gives a false failure.
  - Both `<video>` elements have posters; the marine poster is the drone/catamaran frame.
  - 2 mark tiles in section 04.
  - Zero console errors.
  Then stop the dev server.

- [ ] **Step 6: Production build + index check**

```bash
npm run build
```
Confirm `/portfolio/harbourloom` is in the static output and the portfolio index row reads
`014 · Harbour Loom · Now showing · LOGO · PHOTOGRAPHY · SOCIAL MEDIA · VIDEOGRAPHY`.

- [ ] **Step 7: Commit**

```bash
git add src/components/portfolio/featured/HarbourLoomPage.tsx
git commit -m "feat(portfolio): Harbour Loom reduced-motion guard, responsive polish

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Self-Review

**Spec coverage:**
- Media pipeline (5 stills, 2 reels, 2 extracted posters, 3 mark crops = 12 files) → Task 1 ✓
- Integration (component, featured.ts, clients.ts promote + name change to "Harbour Loom", frame 014, slug unchanged) → Task 2 ✓
- LoadingTransition + rail + hero (extracted mark, Logo added to scope) → Task 3 ✓
- The Three Lines → Task 4 ✓
- 01 Beach (3 stills + corrected reel caption) + styled lightbox replacing the plain modal → Task 4 ✓
- 02 Marine (verified catamaran copy retained) → Task 5 ✓
- 03 B2B (corrected body acknowledging both registers) + 2 stills → Task 5 ✓
- 04 One Mark (two real colourways, no fabricated spec) → Task 6 ✓
- Sign-off → Task 6 ✓
- Reduced-motion + mobile lightbox override → Task 7 ✓
- Lightbox definite-height regression guard → Global Constraints + Task 4 Step 5, Task 7 Step 3, verified Task 7 Step 5 ✓
- Copy corrections (full B.01 and W.02 lines, pink/orange alt, rewritten beach caption) → Task 4 ✓

**Placeholder scan:** No "TBD" / "handle edge cases". Task 1's poster-retry and crop-proof steps are adaptive by design with explicit accept/reject criteria; Task 7 Step 1 is a grep-first instruction. All code steps carry real code.

**Type consistency:** `DIVISIONS`/`GALLERY` shapes match their consumers. `GALLERY` is a single 5-element array with a `lane` field, and both sections render `GALLERY.map((g,i) => g.lane !== "…" ? null : …)` so the index passed to `setLightbox` is always the true global index — the Task 7 Step 5 check (first B2B cell must open at 04/05) exists specifically to catch a regression here. `lightbox`/`closeLightbox`/`stepLightbox` are consistent across Tasks 4–5. Every `src` in `GALLERY` and both `<video>`/mark references match a file produced by Task 1. `.hl-mark*` (Task 6) is the only new CSS beyond the replaced modal block; everything else comes from the Task 3 port.
