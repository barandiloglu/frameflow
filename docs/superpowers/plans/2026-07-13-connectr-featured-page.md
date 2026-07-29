# ConnecTR Featured Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bespoke, production-grade featured case-study page for ConnecTR 2025 at `/portfolio/connectr`, matching the craft level of the eight existing featured pages (Aydın CPA / ASD Laminat are the closest siblings).

**Architecture:** One self-contained client component (`ConnecTRPage.tsx`) with scoped `styled-jsx`, its own top rail + colophon (no global Navbar/Footer), reusing the shared `LoadingTransition` overlay and a keyboard-accessible lightbox. Registered in `featured.ts`; the `clients.ts` entry is promoted to `featured: true`. Assets: the real ConnecTR logo + 20 curated/compressed event photos (from the client's 117-photo gallery) + a YouTube recap poster, under `public/portfolio/connectr/`. Deliverable 02 embeds the real "ConnecTR 2025 Recap" from YouTube via a click-to-load facade. The approved prototype's CSS is ported into the component's `styled-jsx`; new logic (React lightbox, marquee, video facade, reduced-motion) is written fresh. Stacked on `feat/aydin-cpa-case-study`.

**Tech Stack:** Next.js 16.2.1 (App Router), React 19.2.4, TypeScript, styled-jsx, ffmpeg + pngquant (asset prep — already installed).

## Global Constraints

- **Read `node_modules/next/dist/docs/` before writing Next-specific code** — this Next.js has breaking changes vs. training data (per AGENTS.md).
- Featured pages are `"use client"` components, fully bespoke, **no global `<Navbar>`/`<Footer>`** (verified against `AydinCPAPage.tsx` / `ASDLaminatPage.tsx`).
- **All content real** — copy from the approved prototype; gallery captions are **track-based** (no naming private individuals); the 20 photos are curated from the client's own event gallery and each caption must honestly match its image (verify by viewing).
- Palette: crimson `#C8102E`, crimson-deep `#9D0C24`, navy `#16244B`, navy-soft `#24345F`, sand `#D8CBB4`, off-white `#F7F5F1`, off-deep `#ECE7DD`.
- Type: **Fraunces** (ital + roman: `ital,wght@0,400;0,500;0,600;1,400;1,500`) + **Montserrat** (600–900) + **Inter** (400–700), Google Fonts `<link>` with two `<link rel="preconnect">` (incl. `crossOrigin=""` on gstatic).
- **`prefers-reduced-motion` must disable** the marquee animation and hover transforms.
- Asset filenames: `NN-kebab-descriptive.jpg` (photos), `logo.png`, `recap-poster.jpg`.
- Video: real YouTube embed of **"ConnecTR 2025 Recap"**, video ID `rP7XosGV3a4`, via a click-to-load facade (poster + play → `<iframe>`). No video file stored.
- No unit-test framework; verification per task = `npx tsc --noEmit` + `npm run lint` (no NEW errors vs the known baseline: 6 pre-existing errors in unrelated files — ThemeProvider/ThemeToggle/MarkScene — plus `no-page-custom-font` / `no-img-element` warnings every featured page carries) + `npm run build`. App client-renders portfolio pages — verify routes via `npm run build`, not curl HTML.
- Frame number derives from `getFrameNumber(client)` (roster index 6 → "007") — never hardcoded.

---

### Task 1: Asset pipeline

Prepare the logo, 20 curated event photos, and the recap poster under `public/portfolio/connectr/`. No app code.

**Files:**
- Create: `public/portfolio/connectr/logo.png`
- Create: `public/portfolio/connectr/photos/{01-guests-portrait,02-conversation,03-art-easel,04-group,05-topcu-booth,06-mavi-booth,07-ibiza-booth,08-atlantis-auto,09-frameflow-booth,10-honey-vendor,11-baklava-vendor,12-food-vendor,13-superb-auto,14-live-music,15-behind-the-scenes,16-handshake,17-networking,18-candid-smile,19-flag-portrait,20-festival-context}.jpg`
- Create: `public/portfolio/connectr/video/recap-poster.jpg`

**Sources:**
- Logo: `https://connectr.ca/brand/header-logo-ctr-map.png`
- Gallery: `https://connectr.ca/wp/gallery/IMG_<n>.jpg` — 117 photos (IMG_5796–IMG_6208). The exact list is embedded in `https://connectr.ca/ctr-2025-gallery` (grep `/wp/gallery/IMG_[0-9]+\.jpg`).
- Recap poster: `https://i.ytimg.com/vi/rP7XosGV3a4/maxresdefault.jpg`

Candidate seeds per slot (from a thumbnail review — HINTS, not ground truth): 01→IMG_5811, 03→IMG_5838, 04→IMG_5911, 05→IMG_5797, 07→IMG_5902, 09→IMG_5834, 10→IMG_5829, 13→IMG_5817 or IMG_5822, 14→IMG_5836, 15→IMG_5796, 18→IMG_5933. The rest (02 conversation, 06 Mavi booth, 08 Atlantis Auto, 11 baklava, 12 food vendor, 16 handshake, 17 networking, 19 flag portrait, 20 festival banner) are chosen by viewing.

- [ ] **Step 1: Create destination dirs**

```bash
mkdir -p "/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/connectr/photos" \
         "/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/connectr/video"
```

- [ ] **Step 2: Download the logo + recap poster**

```bash
DST="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/connectr"
curl -sL -A "Mozilla/5.0" "https://connectr.ca/brand/header-logo-ctr-map.png" -o "$DST/logo.png" -w "logo http %{http_code} %{size_download}b\n" --max-time 40
curl -sL -A "Mozilla/5.0" "https://i.ytimg.com/vi/rP7XosGV3a4/maxresdefault.jpg" -o "$DST/video/recap-poster.jpg" -w "poster http %{http_code} %{size_download}b\n" --max-time 40
pngquant --force --skip-if-larger --output "$DST/logo.png" "$DST/logo.png" 2>/dev/null || true
ffmpeg -y -loglevel error -i "$DST/video/recap-poster.jpg" -vf "scale='min(1280,iw)':-1" -q:v 4 "$DST/video/recap-poster.jpg"
```
Read `logo.png` and `recap-poster.jpg` with the Read tool to confirm they are the ConnecTR wordmark and the recap thumbnail.

- [ ] **Step 3: Download all 117 gallery photos to a staging dir**

```bash
STAGE=$(mktemp -d)
curl -sL -A "Mozilla/5.0" "https://connectr.ca/ctr-2025-gallery" -o "$STAGE/gallery.html" --max-time 40
LC_ALL=C grep -aoE '/wp/gallery/IMG_[0-9]+\.jpg' "$STAGE/gallery.html" | sort -u > "$STAGE/list.txt"
echo "found $(wc -l < "$STAGE/list.txt") photos"
while read -r p; do curl -sL -A "Mozilla/5.0" "https://connectr.ca$p" -o "$STAGE/$(basename "$p")" --max-time 40; done < "$STAGE/list.txt"
echo "downloaded $(ls "$STAGE"/IMG_*.jpg | wc -l)"; echo "STAGE=$STAGE"
```
Record the `STAGE` path.

- [ ] **Step 4: Build contact sheets to review the set** (ffmpeg tile; `drawtext` is NOT available in this ffmpeg — do not use it). Map tiles to filenames by their row-major position in the sorted sequence (6 wide).

```bash
cd "$STAGE"; rm -rf seq; mkdir seq; i=1
for f in $(ls IMG_*.jpg | sort); do ln -sf "../$f" "seq/$(printf '%03d' $i).jpg"; i=$((i+1)); done
cd seq
ffmpeg -y -loglevel error -i "%03d.jpg" -vf "scale=260:325:force_original_aspect_ratio=decrease,pad=260:325:(ow-iw)/2:(oh-ih)/2:color=0x141414,tile=6x8:padding=5:color=0x141414" -frames:v 3 /tmp/ctr-sheet-%02d.png
```
Read `/tmp/ctr-sheet-01.png`, `-02.png`, `-03.png`. Note the seq→filename map: `ls IMG_*.jpg | sort | nl` (seq N = the Nth line).

- [ ] **Step 5: Curate the 20 and copy them to their descriptive names.** For each of the 20 slots in the plan header's file list, pick the single best real photo whose content honestly matches the slot's track + caption (see the spec's curation table for track/caption per slot). Start from the candidate seeds, but **confirm each by viewing** (Read the specific `IMG_<n>.jpg`) before assigning — swap any seed that doesn't fit. Ensure variety (don't pick two near-duplicates) and that the wide/tall-span slots (01, 03, 10, 13, 14, 16, 19 per the spec) are photos that read well at that aspect. Then copy + compress each:

```bash
STAGE=<the staging dir>
DST="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/connectr/photos"
# For each chosen source→target (repeat for all 20):
ffmpeg -y -loglevel error -i "$STAGE/IMG_XXXX.jpg" -vf "scale='min(1400,iw)':-1" -q:v 4 "$DST/01-guests-portrait.jpg"
# ... (20 total)
```
Record the final IMG_→slot mapping in the report.

- [ ] **Step 6: Verify** — exactly 20 photos + logo + poster, sizes sane:

```bash
DST="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/connectr"
ls -1 "$DST/photos" | wc -l   # expect 20
du -h "$DST"/photos/*.jpg | sort -k2   # each ≤ ~350 KB
du -h "$DST"/logo.png "$DST"/video/recap-poster.jpg
```
Re-run compression at higher `-q:v` (e.g. 6) on any photo >350 KB. Read 3–4 of the placed photos (e.g. `05-topcu-booth`, `10-honey-vendor`, `16-handshake`, `14-live-music`) to confirm each matches its filename/track.

- [ ] **Step 7: Commit**

```bash
cd /Users/barandiloglu/Desktop/Projects/FrameFlow
git add public/portfolio/connectr
git commit -m "feat(portfolio): add ConnecTR case-study media (logo, 20 photos, recap poster)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Data promotion, wiring, and component stub

Promote the client, register the featured route, and land a minimal stub so the route resolves and the index shows frame 007.

**Files:**
- Modify: `src/data/clients.ts` (the `connectr` entry, ~line 280)
- Modify: `src/app/portfolio/[slug]/featured.ts`
- Create: `src/components/portfolio/featured/ConnecTRPage.tsx` (stub)

**Interfaces:**
- Consumes: `FeaturedPageProps = { client: Client }` from `featured.ts`; `Client` type from `@/data/clients`.
- Produces: `export function ConnecTRPage({ client }: { client: Client })`.

- [ ] **Step 1: Promote the `clients.ts` entry.** Replace the existing line
  `{ slug: "connectr", name: "ConnecTR", services: ["Photography", "Videography"] },`
  with:

```ts
  {
    slug: "connectr",
    name: "ConnecTR",
    services: ["Photography", "Videography"],
    year: "2025",
    location: "Vaughan, ON",
    runtime: "Event · 2025",
    scene: "INT. THE FAIR — DAY",
    synopsis:
      "Full-day event coverage of ConnecTR 2025 — the Turkish Community Fair in Vaughan, the largest gathering of Turkic entrepreneurship, culture and community in North America. Photography across the whole exhibitor floor — booths, vendors, culture and candids — plus an event film, giving ConnecTR a library it can build a year of promotion on.",
    featured: true,
  },
```

- [ ] **Step 2: Create the stub component** at `src/components/portfolio/featured/ConnecTRPage.tsx`:

```tsx
"use client";

import type { Client } from "@/data/clients";

type Props = { client: Client };

export function ConnecTRPage({ client }: Props) {
  return <main style={{ padding: 80 }}>{client.name} — case study (stub)</main>;
}
```

- [ ] **Step 3: Register in `featured.ts`.** Add the import alongside the others:

```ts
import { ConnecTRPage } from "@/components/portfolio/featured/ConnecTRPage";
```
and add the map entry inside `FEATURED_PAGES` (align with the neighbors' formatting):

```ts
  "connectr":                       ConnecTRPage,
```

- [ ] **Step 4: Typecheck + lint**

```bash
cd /Users/barandiloglu/Desktop/Projects/FrameFlow
npx tsc --noEmit && npm run lint
```
Expected: tsc clean; lint only the known pre-existing baseline (no new errors in touched files).

- [ ] **Step 5: Route/index check via build**

```bash
npm run build
```
Expected: build succeeds; `/portfolio/connectr` pre-rendered (confirm `.next/server/app/portfolio/connectr.html` exists).

- [ ] **Step 6: Commit**

```bash
git add src/data/clients.ts src/app/portfolio/[slug]/featured.ts src/components/portfolio/featured/ConnecTRPage.tsx
git commit -m "feat(portfolio): promote ConnecTR to featured + wire stub route

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Page shell — tokens, fonts, LoadingTransition, top rail, hero

Replace the stub with the real shell: root `.ctr-page` with the token system, font `<link>` (+ preconnect), the `LoadingTransition` intro, sticky rail, and hero (headline + logo brand card + 4-photo strip). Lightbox scaffolded (state + `openLightbox`), fully wired in Task 5.

**CSS source of truth:** `/Users/barandiloglu/Downloads/connectr-preview.html` (`<style>`, lines 10–136) is approved. Port its rules into `styled-jsx global`, scoped under `.ctr-page`. Reproduce the `.ctr-*` class rules and both `@media` blocks verbatim. DROP the `.preview-banner` rules AND the `*{box-sizing...}` reset (it leaks through `styled-jsx global`). Rescope the bare `img{...}` rule to `.ctr-page img{...}`. Keep the `.ctr-page` CSS-variable block verbatim. Study `AydinCPAPage.tsx` / `ASDLaminatPage.tsx` — same port pattern (tokens, FontLink fragment with preconnects, LoadingTransition, scaffolded lightbox).

**Files:**
- Modify: `src/components/portfolio/featured/ConnecTRPage.tsx`

**Interfaces:**
- Consumes: `LoadingTransition` from `@/components/portfolio/LoadingTransition` — props `{ frameNumber: string; clientName: string; scope: readonly string[]; location?: string; year?: string }`. `getFrameNumber` from `@/data/clients`.
- Produces: the `.ctr-page` root, the `PHOTOS` array (20 entries, consumed by Tasks 3 & 5), and `openLightbox(i)` call sites on the hero-strip cards.

- [ ] **Step 1: Write the shell.** Replace the stub file with:

```tsx
"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getFrameNumber } from "@/data/clients";
import type { Client } from "@/data/clients";
import { LoadingTransition } from "@/components/portfolio/LoadingTransition";

type Props = { client: Client };

// span: "" | "wide" | "tall" — masonry sizing in the gallery.
const PHOTOS = [
  { src: "/portfolio/connectr/photos/01-guests-portrait.jpg",   alt: "Two guests at the ConnecTR 2025 fair, posing for a portrait",              slate: "Guests · Portrait",     span: "tall" },
  { src: "/portfolio/connectr/photos/02-conversation.jpg",      alt: "Two attendees in conversation on the exhibitor floor",                     slate: "Candid · Talk",         span: ""     },
  { src: "/portfolio/connectr/photos/03-art-easel.jpg",         alt: "A portrait painting displayed on an easel in the culture area",            slate: "Culture · Art",         span: "wide" },
  { src: "/portfolio/connectr/photos/04-group.jpg",             alt: "A group of attendees together at the fair",                                slate: "Community · Group",     span: ""     },
  { src: "/portfolio/connectr/photos/05-topcu-booth.jpg",       alt: "An exhibitor at their branded booth",                                      slate: "Exhibitor · Booth",     span: ""     },
  { src: "/portfolio/connectr/photos/06-mavi-booth.jpg",        alt: "The Mavi Travel & Tours exhibitor booth",                                  slate: "Exhibitor · Travel",    span: ""     },
  { src: "/portfolio/connectr/photos/07-ibiza-booth.jpg",       alt: "The Ibiza Premium Furniture exhibitor booth",                              slate: "Exhibitor · Furniture", span: ""     },
  { src: "/portfolio/connectr/photos/08-atlantis-auto.jpg",     alt: "The Atlantis Auto exhibitor booth",                                        slate: "Exhibitor · Auto",      span: ""     },
  { src: "/portfolio/connectr/photos/09-frameflow-booth.jpg",   alt: "The FrameFlow booth on the exhibitor floor",                               slate: "On site · FrameFlow",   span: ""     },
  { src: "/portfolio/connectr/photos/10-honey-vendor.jpg",      alt: "A vendor's table of local honey jars",                                     slate: "Vendor · Honey",        span: "tall" },
  { src: "/portfolio/connectr/photos/11-baklava-vendor.jpg",    alt: "A close-up of baklava at a pastry vendor",                                 slate: "Vendor · Pastry",       span: ""     },
  { src: "/portfolio/connectr/photos/12-food-vendor.jpg",       alt: "A Turkish food vendor on the fair floor",                                  slate: "Vendor · Food",         span: ""     },
  { src: "/portfolio/connectr/photos/13-superb-auto.jpg",       alt: "A car showcased by Superb Auto at the fair",                               slate: "Showcase · Auto",       span: "tall" },
  { src: "/portfolio/connectr/photos/14-live-music.jpg",        alt: "A live musician performing on stage",                                      slate: "Stage · Live music",    span: "wide" },
  { src: "/portfolio/connectr/photos/15-behind-the-scenes.jpg", alt: "The FrameFlow videographer filming on the floor",                          slate: "Behind the scenes",     span: ""     },
  { src: "/portfolio/connectr/photos/16-handshake.jpg",         alt: "Two attendees shaking hands",                                              slate: "Candid · Connection",   span: "wide" },
  { src: "/portfolio/connectr/photos/17-networking.jpg",        alt: "Attendees networking on the exhibitor floor",                              slate: "Candid · Network",      span: ""     },
  { src: "/portfolio/connectr/photos/18-candid-smile.jpg",      alt: "A smiling guest at the fair",                                              slate: "Candid · Smile",        span: ""     },
  { src: "/portfolio/connectr/photos/19-flag-portrait.jpg",     alt: "A guest photographed by the Turkish flag",                                 slate: "Portrait · Flag",       span: "tall" },
  { src: "/portfolio/connectr/photos/20-festival-context.jpg",  alt: "The ConnecTR Turkish Culture & Food Festival banner",                      slate: "ConnecTR · The Fair",   span: ""     },
] as const;

// The hero strip reuses four gallery frames (portrait, live music, handshake, conversation).
const STRIP = [0, 13, 15, 1] as const;

export function ConnecTRPage({ client }: Props) {
  const frame = getFrameNumber(client);

  // Lightbox: index of the open gallery photo, or null when closed.
  const [lightbox, setLightbox] = useState<number | null>(null);
  const openLightbox = useCallback((i: number) => setLightbox(i), []);

  return (
    <div className="ctr-page">
      <LoadingTransition
        frameNumber={frame}
        clientName={client.name}
        scope={["Photography", "Video"]}
        location="Vaughan, ON"
        year={client.year}
      />

      <header className="ctr-rail">
        <Link className="ctr-rail-back" href="/portfolio">← Portfolio</Link>
        <span className="ctr-rail-center">CONNEC<b>TR</b> · CASE STUDY</span>
        <span className="ctr-rail-meta">FrameFlow · Reel <b>{frame}</b> · 2025</span>
      </header>

      <section className="ctr-hero">
        <div className="ctr-hero-band" />
        <div className="ctr-hero-top">
          <div className="ctr-hero-inner">
            <p className="ctr-crumb"><span>Case Study</span><i>·</i><span>Reel {frame}</span><i>·</i><span>Vaughan, ON</span></p>
            <h1 className="ctr-hero-title">More than a fair —<br /><em>a community gathered.</em></h1>
            <p className="ctr-hero-deck"><b>ConnecTR 2025</b> — the largest gathering of Turkic entrepreneurship, culture and community in North America. FrameFlow covered the day end to end: <b>photography</b> and <b>video</b> across a full exhibitor floor.</p>
            <dl className="ctr-hero-meta">
              <div><dt>01 · Photography</dt><dd>Full-day coverage</dd></div>
              <div><dt>02 · Videography</dt><dd>Event film</dd></div>
              <div><dt>Where</dt><dd>Vaughan, Ontario</dd></div>
            </dl>
          </div>
          <div className="ctr-hero-brand">
            <div className="ctr-hero-brand-card">
              <img src="/portfolio/connectr/logo.png" alt="ConnecTR — Turkish Community Fair" />
              <span className="ctr-hero-brand-cap">Turkish Community Fair · 2025</span>
            </div>
          </div>
        </div>
        <div className="ctr-hero-strip">
          {STRIP.map((idx, i) => (
            <button className={`ctr-strip-img si-${i + 1}`} key={idx} onClick={() => openLightbox(idx)}>
              <img src={PHOTOS[idx].src} alt={PHOTOS[idx].alt} />
            </button>
          ))}
        </div>
      </section>

      <FontLink />
      <style jsx global>{`
        /* PORT the prototype <style> (lines 10–136) here, scoped under .ctr-page.
           Drop .preview-banner and the '*{}' reset; rescope 'img{}' to '.ctr-page img'.
           Keep the .ctr-page CSS-var block verbatim. */
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
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600;700&family=Montserrat:wght@600;700;800;900&display=swap"
      />
    </>
  );
}
```

- [ ] **Step 2: Port the prototype CSS** (lines 10–136) into the `styled-jsx global` block, scoped under `.ctr-page`. Drop `.preview-banner` and `*{}`; rescope `img{}` → `.ctr-page img{}`. Keep every `.ctr-*` rule and both `@media` blocks.

- [ ] **Step 3: Typecheck + lint**

```bash
npx tsc --noEmit && npm run lint
```
Expected: tsc clean; only the file's expected `no-img-element` / `no-page-custom-font` warnings; a transient unused-`lightbox`/`openLightbox`/`useEffect` warning is fine (consumed in Task 5). No new errors.

- [ ] **Step 4: Build**

```bash
npm run build
```
Expected: succeeds, `/portfolio/connectr` pre-rendered.

- [ ] **Step 5: Commit**

```bash
git add src/components/portfolio/featured/ConnecTRPage.tsx
git commit -m "feat(portfolio): ConnecTR shell — rail, hero, loading transition

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Headline marquee + brief band

Add the signature kinetic marquee (new element) and the navy brief band.

**Files:**
- Modify: `src/components/portfolio/featured/ConnecTRPage.tsx`

**Interfaces:**
- Consumes: nothing new.
- Produces: `.ctr-marquee` markup + CSS.

- [ ] **Step 1: Add the marquee + brief markup** directly after the hero `</section>`:

```tsx
      <section className="ctr-marquee" aria-hidden="true">
        <div className="ctr-marquee-track">
          {[0, 1].map((dup) => (
            <span className="ctr-marquee-group" key={dup}>
              {["Exhibitors", "Vendors", "Culture", "People", "Connection"].map((h) => (
                <span className="ctr-marquee-item" key={h}>{h}<i>✦</i></span>
              ))}
            </span>
          ))}
        </div>
      </section>

      <section className="ctr-brief">
        <div className="ctr-brief-inner">
          <span className="ctr-brief-stamp">The brief</span>
          <h2>Capture the room<br /><em>so it feels like being there.</em></h2>
          <p>A community fair lives in its faces — the vendor mid-sentence, the handshake that turns into a deal, the kid in front of the art. The brief was simple: document the whole floor honestly, and give ConnecTR a library it can build a year of promotion on.</p>
          <p className="ctr-brief-by"><span></span> ConnecTR · The Civic Exchange</p>
        </div>
      </section>
```

- [ ] **Step 2: Add marquee CSS** to the `styled-jsx global` block (brief CSS already came from the Task 3 port). Match the file's selector-prefixing convention (check whether the ported rules are `.ctr-page`-prefixed or bare, and match it):

```css
.ctr-page .ctr-marquee{overflow:hidden;border-top:1px solid var(--off-deep);border-bottom:1px solid var(--off-deep);background:#fff;padding:16px 0}
.ctr-page .ctr-marquee-track{display:flex;width:max-content;animation:ctr-scroll 32s linear infinite}
.ctr-page .ctr-marquee-group{display:flex;flex-shrink:0}
.ctr-page .ctr-marquee-item{display:flex;align-items:center;gap:26px;padding:0 26px;font-family:"Montserrat",sans-serif;font-weight:900;font-size:clamp(20px,2.4vw,34px);letter-spacing:-.01em;text-transform:uppercase;color:var(--navy);white-space:nowrap}
.ctr-page .ctr-marquee-item i{color:var(--crimson);font-style:normal;font-size:.7em}
@keyframes ctr-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
```
(If the ported rules are bare/unprefixed, drop the `.ctr-page ` prefix here to match — just be consistent.)

- [ ] **Step 3: Typecheck + lint + build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```
Expected: all clean; no new lint errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/portfolio/featured/ConnecTRPage.tsx
git commit -m "feat(portfolio): ConnecTR coverage-track marquee + brief band

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: Deliverable 01 — Photography (coverage tracks, masonry gallery, lightbox)

The 5 coverage tracks + the 20-photo masonry gallery opening a keyboard lightbox.

**Files:**
- Modify: `src/components/portfolio/featured/ConnecTRPage.tsx`

**Interfaces:**
- Consumes: `PHOTOS` (Task 3), `lightbox`/`setLightbox`/`openLightbox` (Task 3).
- Produces: `TRACKS` const, the lightbox modal, `closeLightbox()` / `stepLightbox(delta)` handlers + keyboard effect.

- [ ] **Step 1: Add the `TRACKS` const** near `PHOTOS`:

```tsx
const TRACKS = [
  { id: "C.01", name: "Exhibitors", note: "Branded booths & displays" },
  { id: "C.02", name: "Vendors",    note: "Honey, pastry, food floor" },
  { id: "C.03", name: "Culture",    note: "Art & live music" },
  { id: "C.04", name: "People",     note: "Portraits & candids" },
  { id: "C.05", name: "Connection", note: "Handshakes & networking" },
] as const;
```

- [ ] **Step 2: Add the Photography section markup** after the brief `</section>`:

```tsx
      <section className="ctr-del">
        <div className="ctr-del-head">
          <span className="num">01</span>
          <div className="text"><p className="label">Deliverable 01 · Photography</p><h3>One floor, <em>every corner.</em></h3></div>
          <p className="meta"><span><b>Full-day</b> coverage</span><span><b>5</b> coverage tracks</span><span><b>Exhibitors → candids</b></span><span><b>Delivered</b> 2025</span></p>
        </div>

        <div className="ctr-coverage">
          <div className="head"><span>What we covered</span><small>one day · five tracks</small></div>
          <div className="grid">
            {TRACKS.map((t) => (
              <div className="cov" key={t.id}>
                <span className="cid">{t.id}</span>
                <span className="cname">{t.name}</span>
                <span className="cnote">{t.note}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="ctr-gallery-lbl">— Selected frames · tap to enlarge —</p>
        <div className="ctr-gallery">
          {PHOTOS.map((p, i) => (
            <button className={`cell ${p.span}`} key={p.src} onClick={() => openLightbox(i)}>
              <img src={p.src} alt={p.alt} />
              <span className="slate">{p.slate}</span>
              <span className="zoom">↗</span>
            </button>
          ))}
        </div>
      </section>
```

- [ ] **Step 3: Add the lightbox modal** inside `.ctr-page` (e.g. right before `<FontLink />`):

```tsx
      {lightbox !== null && (
        <div
          className="ctr-modal open"
          role="dialog"
          aria-modal="true"
          aria-label={`${PHOTOS[lightbox].slate} — enlarged`}
          onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
        >
          <button className="ctr-modal-close" onClick={closeLightbox} aria-label="Close">✕</button>
          <button className="ctr-modal-nav prev" onClick={() => stepLightbox(-1)} aria-label="Previous">‹</button>
          <div className="ctr-modal-img"><img src={PHOTOS[lightbox].src} alt={PHOTOS[lightbox].alt} /></div>
          <button className="ctr-modal-nav next" onClick={() => stepLightbox(1)} aria-label="Next">›</button>
          <p className="ctr-modal-cap">{PHOTOS[lightbox].slate} · {lightbox + 1} / {PHOTOS.length}</p>
        </div>
      )}
```

- [ ] **Step 4: Add the lightbox handlers + keyboard effect** inside the component (after `openLightbox`):

```tsx
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const stepLightbox = useCallback(
    (delta: number) => setLightbox((i) => (i === null ? i : (i + delta + PHOTOS.length) % PHOTOS.length)),
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

- [ ] **Step 5: Typecheck + lint + build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```
Expected: tsc clean (scaffolded `lightbox`/`openLightbox`/`useEffect` now consumed — prior unused warnings clear); no new lint errors; build succeeds.

- [ ] **Step 6: Re-read the handlers + effect** once before committing: confirm `stepLightbox` wraps both directions `(i + delta + 20) % 20`, the effect removes its listener AND restores `body.overflow` in cleanup, and backdrop-click uses `e.target === e.currentTarget`.

- [ ] **Step 7: Commit**

```bash
git add src/components/portfolio/featured/ConnecTRPage.tsx
git commit -m "feat(portfolio): ConnecTR photography section — tracks, gallery, lightbox

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 6: Deliverable 02 — Videography (YouTube facade) + colophon

The event-film section (click-to-load YouTube embed) and the colophon.

**Files:**
- Modify: `src/components/portfolio/featured/ConnecTRPage.tsx`

**Interfaces:**
- Consumes: `frame` (Task 3), a new `videoPlaying` state.
- Produces: `.ctr-video`, `.ctr-colophon` markup + `.ctr-colophon-cta`/`.ctr-colophon-link` CSS.

- [ ] **Step 1: Add `videoPlaying` state** next to the lightbox state:

```tsx
  const [videoPlaying, setVideoPlaying] = useState(false);
```

- [ ] **Step 2: Add the video + colophon markup** after the photography `</section>`:

```tsx
      <section className="ctr-video">
        <div className="ctr-video-inner">
          <div className="ctr-del-head light">
            <span className="num">02</span>
            <div className="text"><p className="label">Deliverable 02 · Videography</p><h3>The day, <em>in motion.</em></h3></div>
            <p className="meta"><span><b>Event film</b></span><span><b>On-floor</b> capture</span><span><b>Reel</b> cut-down</span><span><b>2025</b></span></p>
          </div>
          <div className="ctr-video-frame">
            {videoPlaying ? (
              <iframe
                className="ctr-video-iframe"
                src="https://www.youtube.com/embed/rP7XosGV3a4?autoplay=1"
                title="ConnecTR 2025 Recap"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <button className="ctr-video-facade" onClick={() => setVideoPlaying(true)} aria-label="Play ConnecTR 2025 Recap">
                <img src="/portfolio/connectr/video/recap-poster.jpg" alt="" aria-hidden="true" />
                <span className="ctr-video-slot">
                  <span className="play">▶</span>
                  <span className="vp-title">ConnecTR 2025 Recap</span>
                  <span className="vp-note">Play the event film</span>
                </span>
              </button>
            )}
          </div>
          <p className="ctr-video-cap">
            <a href="https://www.youtube.com/watch?v=rP7XosGV3a4" target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a>
          </p>
        </div>
      </section>

      <section className="ctr-colophon">
        <div className="ctr-swatches">
          <div className="sw"><span className="chip" style={{ background: "#C8102E" }} /><span className="sw-name">CTR Crimson</span><span className="sw-hex">#C8102E</span></div>
          <div className="sw"><span className="chip" style={{ background: "#16244B" }} /><span className="sw-name">Navy</span><span className="sw-hex">#16244B</span></div>
          <div className="sw"><span className="chip" style={{ background: "#D8CBB4" }} /><span className="sw-name">Warm Sand</span><span className="sw-hex">#D8CBB4</span></div>
          <div className="sw"><span className="chip" style={{ background: "#F7F5F1", border: "1px solid #ece7dd" }} /><span className="sw-name">Off White</span><span className="sw-hex">#F7F5F1</span></div>
        </div>
        <h2 className="ctr-close">More than a fair.<br /><em>A community, on film.</em></h2>
        <p className="ctr-sign">Prepared by <b>FrameFlow</b> · Reel {frame} · 2025</p>
        <div className="ctr-colophon-cta">
          <Link className="ctr-back-btn" href="/contact">Start a project →</Link>
          <Link className="ctr-colophon-link" href="/portfolio">← Back to the archive</Link>
        </div>
      </section>
```

- [ ] **Step 3: Add the video-facade + colophon-CTA CSS delta.** The prototype's `.ctr-video-slot` was a centered flex block with a `.play`/`.vp-title`/`.vp-note` (colors already ported); add the facade/iframe/CTA rules. Append to `styled-jsx global` (match the file's prefix convention):

```css
.ctr-page .ctr-video-frame{position:relative}
.ctr-page .ctr-video-iframe{width:100%;height:100%;border:0;display:block}
.ctr-page .ctr-video-facade{position:absolute;inset:0;width:100%;height:100%;border:0;padding:0;cursor:pointer;overflow:hidden;background:var(--navy-soft);display:flex;align-items:center;justify-content:center}
.ctr-page .ctr-video-facade img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.55}
.ctr-page .ctr-video-facade .ctr-video-slot{position:relative;display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center;padding:30px}
.ctr-page .ctr-video-facade .vp-title{font-family:"Montserrat",sans-serif;font-weight:700;font-size:22px;color:var(--off)}
.ctr-page .ctr-video-facade .vp-note{font-size:14px;color:rgba(247,245,241,.75)}
.ctr-page .ctr-video-facade:hover .play{transform:scale(1.06)}
.ctr-page .ctr-video-cap a{color:rgba(247,245,241,.6);text-decoration:none}
.ctr-page .ctr-video-cap a:hover{color:var(--sand)}
.ctr-page .ctr-colophon-cta{display:flex;gap:22px;align-items:center;justify-content:center;flex-wrap:wrap}
.ctr-page .ctr-colophon-link{font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:#7c7a74;text-decoration:none;font-weight:600}
.ctr-page .ctr-colophon-link:hover{color:var(--navy)}
```
(The ported `.play` rule already sets its base size/shape; the hover adds a subtle scale. If the ported `.ctr-video-slot .play` is a block-level `display:inline-flex`, keep it — the facade nests the same class names so the ported styling applies.)

- [ ] **Step 4: Typecheck + lint + build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```
Expected: all clean; no new lint errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/portfolio/featured/ConnecTRPage.tsx
git commit -m "feat(portfolio): ConnecTR videography (YouTube facade) + colophon

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 7: Motion polish, reduced-motion, responsive, final verification

Guard motion behind `prefers-reduced-motion`, verify responsive, run the full build.

**Files:**
- Modify: `src/components/portfolio/featured/ConnecTRPage.tsx`

- [ ] **Step 1: Grep the file for real `animation:`/`transition:`/`:hover{transform:...}` declarations** so the reduced-motion overrides target selectors that exist. Confirm the marquee uses `.ctr-marquee-track { animation: ctr-scroll ... }` and which elements have hover transforms (`.ctr-strip-img`, `.ctr-gallery .cell`, `.cov`, and any others — e.g. `.ctr-video-facade:hover .play`). Only disable what exists.

- [ ] **Step 2: Add a reduced-motion block** at the end of `styled-jsx global` (adjust the selector list to match Step 1; match the file's prefix convention):

```css
@media (prefers-reduced-motion: reduce){
  .ctr-page .ctr-marquee-track{animation:none;transform:none}
  .ctr-page .ctr-strip-img,.ctr-page .ctr-gallery .cell,.ctr-page .cov,.ctr-page .ctr-gallery .slate,.ctr-page .ctr-gallery .zoom{transition:none}
  .ctr-page .ctr-strip-img:hover{transform:none}
  .ctr-page .ctr-gallery .cell:hover{transform:none}
  .ctr-page .cov:hover{transform:none}
}
```

- [ ] **Step 3: Typecheck + lint**

```bash
npx tsc --noEmit && npm run lint
```
Expected: clean, no new errors.

- [ ] **Step 4: Responsive + reduced-motion check** — `npm run dev` (background), load `http://localhost:<port>/portfolio/connectr` and:
  - Resize to ~800px and ~480px: hero stacks, coverage grid → 2-up then 1-up, gallery → 2-col, hero strip → 2-col, rail center label hides at ≤880px.
  - Enable OS "Reduce motion" and reload: marquee static, hover transforms off.
  Stop the dev server afterward.

- [ ] **Step 5: Full production build**

```bash
npm run build
```
Expected: build succeeds; `/portfolio/connectr` in the generated static params.

- [ ] **Step 6: Final visual pass** — drive the real page with headless Chrome (screenshot after the LoadingTransition completes) and dump the `/portfolio` index DOM to confirm the ConnecTR row reads `007 · ConnecTR · Now showing · PHOTOGRAPHY · VIDEOGRAPHY`. Confirm the video facade renders the poster + play; confirm no console errors. (Clicking the facade to load the YouTube iframe can be confirmed by code inspection — headless CLI can't drive clicks.)

- [ ] **Step 7: Commit**

```bash
git add src/components/portfolio/featured/ConnecTRPage.tsx
git commit -m "feat(portfolio): ConnecTR reduced-motion guard, responsive polish

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Self-Review

**Spec coverage:**
- Integration (new component, featured.ts, clients.ts promote, frame 007) → Task 2 ✓
- Concept + 9-section flow → Tasks 3 (rail/hero) + 4 (marquee/brief) + 5 (photography) + 6 (video/colophon) ✓
- LoadingTransition + lightbox shared primitives → Tasks 3, 5 ✓
- Real logo + 20 curated photos (verify-on-download) + recap poster → Task 1 ✓
- Deliverable 02 real YouTube embed via click-to-load facade → Task 6 ✓
- Art direction (Fraunces/Montserrat/Inter, palette, motion) → Task 3 (port) + Task 7 (reduced-motion) ✓
- Track-based captions, masonry wide/tall spans → PHOTOS array (Task 3) + gallery markup (Task 5) ✓
- Scope guardrails (20 of 117, embed not download, no invented names) → honored across Tasks 1, 5, 6 ✓
- Success criteria (route resolves, index frame 007 + pill + services, logo, lightbox, video plays, reduced-motion, build clean) → Tasks 2, 5, 6, 7 ✓

**Placeholder scan:** No "TBD/handle edge cases/add validation". Task 1's curation (choose + verify the 20) and the `IMG_XXXX`/`STAGE` placeholders in its commands are adaptive-by-design with explicit view-and-confirm instructions and a candidate seed list — not vague. Task 7's reduced-motion selector list has an explicit grep-first step.

**Type consistency:** `PHOTOS`/`STRIP`/`TRACKS` shapes defined in Tasks 3/5 match their consumers; `openLightbox`/`closeLightbox`/`stepLightbox`/`lightbox`/`videoPlaying` names consistent across Tasks 3, 5, 6; `LoadingTransition` prop names match the verified component signature; `getFrameNumber` returns the padded string used in the rail, crumb, and colophon.
