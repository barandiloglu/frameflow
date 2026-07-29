# ASD Laminat Featured Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bespoke, production-grade featured case-study page for ASD Laminat at `/portfolio/asd-laminate`, matching the craft level of the eight existing featured pages (Aydın CPA is the closest sibling).

**Architecture:** One self-contained client component (`ASDLaminatPage.tsx`) with scoped `styled-jsx`, its own top rail + colophon (no global Navbar/Footer), reusing the shared `LoadingTransition` overlay and a keyboard-accessible lightbox. Registered in `featured.ts`; the `clients.ts` entry is promoted to `featured: true` and renamed to "ASD Laminat". 9 curated post images (compressed) live under `public/portfolio/asd-laminate/posts/`. The approved prototype's CSS is ported into the component's `styled-jsx`; new logic (React lightbox, marquee, reduced-motion) is written fresh. This branch is stacked on `feat/aydin-cpa-case-study`.

**Tech Stack:** Next.js 16.2.1 (App Router), React 19.2.4, TypeScript, styled-jsx, ffmpeg + pngquant (asset prep — already installed). No video on this page.

## Global Constraints

- **Read `node_modules/next/dist/docs/` before writing Next-specific code** — this Next.js has breaking changes vs. training data (per AGENTS.md).
- Featured pages are `"use client"` components, fully bespoke, **no global `<Navbar>`/`<Footer>`** (verified against `BigBearsPage.tsx` / `AydinCPAPage.tsx`).
- **All content must be real** — copy and metrics come verbatim from the approved prototype; pillar tags come from the spec's CORRECTED mapping table (the prototype's tags for `7.png` and `20.png` were wrong).
- Palette: orange `#F26A21`, orange-deep `#C95315`, graphite `#262626`, graphite-soft `#33322F`, steel `#8A8C8E`, off-white `#F4F2EF`, off-deep `#E7E3DC`, ink `#1B1B1B`.
- Type: **Anton** (deliverable numerals, pill IDs, channel stat values) + Poppins (display 500–800) + Inter (body 400–700), Google Fonts `<link>` with two `<link rel="preconnect">` (match the sibling pages, incl. `crossOrigin=""` on gstatic).
- **`prefers-reduced-motion` must disable** the marquee animation and hover transforms.
- Asset filenames: `NN-kebab-descriptive.png` (matches `public/portfolio/*` convention).
- Brand display name is **"ASD Laminat"** (no final *e*); URL slug stays `asd-laminate`.
- No unit-test framework exists; verification per task = `npx tsc --noEmit` + `npm run lint` (no NEW errors vs the known baseline: 6 pre-existing errors in unrelated files — ThemeProvider/ThemeToggle/MarkScene — plus `no-page-custom-font` / `no-img-element` warnings that every featured page carries) + `npm run build`. App client-renders portfolio pages, so verify routes via `npm run build`, not curl HTML.
- Frame number derives from `getFrameNumber(client)` (roster index 2 → "003") — never hardcoded.

---

### Task 1: Asset pipeline

Prepare and place the 9 feed images under `public/portfolio/asd-laminate/posts/`. No app code.

**Files:**
- Create: `public/portfolio/asd-laminate/posts/{01-exterior-compact,02-carbon,03-quebec-to-bc,04-panel-of-choice,05-safety-first,06-built-to-last,07-antiviral-laminate,08-healthy-spaces,09-decors-designs}.png`

**Source → destination** (source folder name has a space: `ASD Social Media Posts`):
- `/Users/barandiloglu/Downloads/ASD Social Media Posts/1.png`  → `01-exterior-compact.png`
- `/Users/barandiloglu/Downloads/ASD Social Media Posts/14.png` → `02-carbon.png`
- `/Users/barandiloglu/Downloads/ASD Social Media Posts/8.png`  → `03-quebec-to-bc.png`
- `/Users/barandiloglu/Downloads/ASD Social Media Posts/10.png` → `04-panel-of-choice.png`
- `/Users/barandiloglu/Downloads/ASD Social Media Posts/7.png`  → `05-safety-first.png`
- `/Users/barandiloglu/Downloads/ASD Social Media Posts/16.png` → `06-built-to-last.png`
- `/Users/barandiloglu/Downloads/ASD Social Media Posts/3.png`  → `07-antiviral-laminate.png`
- `/Users/barandiloglu/Downloads/ASD Social Media Posts/5.png`  → `08-healthy-spaces.png`
- `/Users/barandiloglu/Downloads/ASD Social Media Posts/20.png` → `09-decors-designs.png`

- [ ] **Step 1: Create the destination directory**

```bash
mkdir -p "/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/asd-laminate/posts"
```

- [ ] **Step 2: Copy + compress the 9 PNGs.** `ffmpeg` scale caps width at 1080px; `pngquant` does the lossy size reduction (these are flat-graphic/photo posts, low banding risk — same approach the Aydın posts used). Verify both tools exist first (`which ffmpeg pngquant`); if missing, `brew install ffmpeg pngquant`.

```bash
SRC="/Users/barandiloglu/Downloads/ASD Social Media Posts"
DST="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/asd-laminate/posts"
declare -a MAP=(
  "1.png:01-exterior-compact.png"
  "14.png:02-carbon.png"
  "8.png:03-quebec-to-bc.png"
  "10.png:04-panel-of-choice.png"
  "7.png:05-safety-first.png"
  "16.png:06-built-to-last.png"
  "3.png:07-antiviral-laminate.png"
  "5.png:08-healthy-spaces.png"
  "20.png:09-decors-designs.png"
)
for pair in "${MAP[@]}"; do
  s="${pair%%:*}"; d="${pair##*:}"
  ffmpeg -y -i "$SRC/$s" -vf "scale='min(1080,iw)':-1" "$DST/$d"
  pngquant --force --quality=65-88 --skip-if-larger --output "$DST/$d" "$DST/$d" 2>/dev/null || true
done
```

- [ ] **Step 3: Verify all 9 exist and are sane sizes**

```bash
DST="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/asd-laminate/posts"
ls -1 "$DST" | wc -l          # expect 9
du -h "$DST"/*.png | sort -k2
```
Expected: exactly 9 files, each ≤ ~400 KB. If any is still >400 KB, re-run `pngquant --quality=60-80` on it. Read two of them with the Read tool (e.g. `05-safety-first.png` and `09-decors-designs.png`) to confirm they are the CORRECT images per the spec mapping (05 = "Safety First" fire-retardant; 09 = "Decors & Designs" colour-swatch sheet) and are visually intact.

- [ ] **Step 4: Commit**

```bash
cd /Users/barandiloglu/Desktop/Projects/FrameFlow
git add public/portfolio/asd-laminate
git commit -m "feat(portfolio): add ASD Laminat case-study post media

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Data promotion, wiring, and component stub

Promote the client, register the featured route, and land a minimal stub so the route resolves and the index shows frame 003 with the renamed client.

**Files:**
- Modify: `src/data/clients.ts` (the `asd-laminate` entry, ~line 153)
- Modify: `src/app/portfolio/[slug]/featured.ts`
- Create: `src/components/portfolio/featured/ASDLaminatPage.tsx` (stub)

**Interfaces:**
- Consumes: `FeaturedPageProps = { client: Client }` from `featured.ts`; `Client` type from `@/data/clients`.
- Produces: `export function ASDLaminatPage({ client }: { client: Client })`.

- [ ] **Step 1: Promote the `clients.ts` entry.** Replace the existing line
  `{ slug: "asd-laminate", name: "ASD Laminate", services: ["Ad Management", "Social Media"] },`
  with:

```ts
  {
    slug: "asd-laminate",
    name: "ASD Laminat",
    services: ["Social Media", "Ad Management"],
    year: "2025",
    location: "Canada",
    runtime: "Spring 2025",
    scene: "EXT. THE MARKET — DAY",
    synopsis:
      "A five-pillar social system and a coordinated three-channel ad push introducing ASD Laminat — a 65-year, 85-country surfaces manufacturer — to the Canadian market. Product-led creative across LinkedIn, Instagram and Google, 678K+ impressions from Halifax to Vancouver, reaching the architects, fabricators and specifiers who choose the panel.",
    featured: true,
  },
```

- [ ] **Step 2: Create the stub component** at `src/components/portfolio/featured/ASDLaminatPage.tsx`:

```tsx
"use client";

import type { Client } from "@/data/clients";

type Props = { client: Client };

export function ASDLaminatPage({ client }: Props) {
  return <main style={{ padding: 80 }}>{client.name} — case study (stub)</main>;
}
```

- [ ] **Step 3: Register in `featured.ts`.** Add the import alongside the others:

```ts
import { ASDLaminatPage } from "@/components/portfolio/featured/ASDLaminatPage";
```
and add the map entry inside `FEATURED_PAGES` (align with the neighbors' formatting):

```ts
  "asd-laminate":                   ASDLaminatPage,
```

- [ ] **Step 4: Typecheck + lint**

```bash
cd /Users/barandiloglu/Desktop/Projects/FrameFlow
npx tsc --noEmit && npm run lint
```
Expected: tsc clean; lint shows only the known pre-existing baseline (no new errors in the touched files).

- [ ] **Step 5: Route/index check via build** (portfolio pages are client-rendered — build is the reliable gate)

```bash
npm run build
```
Expected: build succeeds and `/portfolio/asd-laminate` is among the pre-rendered `generateStaticParams` routes (confirm `.next/server/app/portfolio/asd-laminate.html` exists).

- [ ] **Step 6: Commit**

```bash
git add src/data/clients.ts src/app/portfolio/[slug]/featured.ts src/components/portfolio/featured/ASDLaminatPage.tsx
git commit -m "feat(portfolio): promote ASD Laminat to featured + wire stub route

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Page shell — tokens, fonts, LoadingTransition, top rail, hero

Replace the stub with the real shell: root `.asd-page` with the token system, font `<link>` (+ preconnect), the `LoadingTransition` intro, sticky top rail, and hero (headline + three tilted post cards). The lightbox is scaffolded (state + `openLightbox`) and fully wired in Task 5.

**CSS source of truth:** `/Users/barandiloglu/Downloads/asd-portfolio-preview.html` (`<style>` block, lines 10–174) is approved and production-quality. Port its rules into this component's `styled-jsx global`, scoped under `.asd-page`. Reproduce the class names verbatim (`.asd-rail`, `.asd-hero`, `.asd-hcard`, `.asd-brief`, `.asd-del`, `.asd-pillars`, `.asd-grid`, `.asd-ads`, `.asd-channels`, `.asd-ch`, `.asd-combined`, `.asd-leanin`, `.asd-cols`, `.asd-colophon`, `.asd-swatches`, `.asd-modal`, plus the `@media (max-width:880px)` and `(max-width:520px)` blocks). DROP the `.preview-banner` rules and the document-wide `*{...}` reset (it would leak through `styled-jsx global`); rescope the bare `img{...}` rule to `.asd-page img{...}`. Add only the deltas each later task calls out.

**Files:**
- Modify: `src/components/portfolio/featured/ASDLaminatPage.tsx`

**Interfaces:**
- Consumes: `LoadingTransition` from `@/components/portfolio/LoadingTransition` — props `{ frameNumber: string; clientName: string; scope: readonly string[]; location?: string; year?: string }`. `getFrameNumber` from `@/data/clients`.
- Produces: the `.asd-page` root, the `POSTS` array (9 entries, consumed by Tasks 3 & 5), and `openLightbox(i)` call sites on the hero cards.

- [ ] **Step 1: Write the shell.** Replace the stub file with:

```tsx
"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getFrameNumber } from "@/data/clients";
import type { Client } from "@/data/clients";
import { LoadingTransition } from "@/components/portfolio/LoadingTransition";

type Props = { client: Client };

const POSTS = [
  { src: "/portfolio/asd-laminate/posts/01-exterior-compact.png",   alt: "ASD social post — a cantilevered modern building over water clad in ASD Exterior Compact Laminate, headline 'ASD Exterior Compact Laminate'", pillar: "Product Lines" },
  { src: "/portfolio/asd-laminate/posts/02-carbon.png",             alt: "ASD social post — a matte grey Carbon-surface kitchen and bedroom, headline 'Carbon by ASD Laminat'",                                        pillar: "Product Lines" },
  { src: "/portfolio/asd-laminate/posts/03-quebec-to-bc.png",       alt: "ASD social post — a grey-panelled building facade in snow, headline 'From Quebec to BC — ASD has you covered'",                             pillar: "Canadian Market" },
  { src: "/portfolio/asd-laminate/posts/04-panel-of-choice.png",    alt: "ASD social post — a figure leaning on a grey exterior panel wall, headline 'The Panel of Choice for Canadian Architects'",                 pillar: "Canadian Market" },
  { src: "/portfolio/asd-laminate/posts/05-safety-first.png",       alt: "ASD social post — a wood-panelled commercial lobby, headline 'Safety First with ASD Laminat', fire-retardant and low smoke",             pillar: "Performance" },
  { src: "/portfolio/asd-laminate/posts/06-built-to-last.png",      alt: "ASD social post — a wood-panelled living room, headline 'Built to Last', stable durable formable",                                        pillar: "Performance" },
  { src: "/portfolio/asd-laminate/posts/07-antiviral-laminate.png", alt: "ASD social post — a bright kitchen with a green virus-shield icon, headline 'Antiviral Laminate'",                                        pillar: "Healthy Spaces" },
  { src: "/portfolio/asd-laminate/posts/08-healthy-spaces.png",     alt: "ASD social post — clinic and office interiors with antiviral badges, headline 'Healthy Spaces are in all your living areas'",            pillar: "Healthy Spaces" },
  { src: "/portfolio/asd-laminate/posts/09-decors-designs.png",     alt: "ASD social post — a grid of solid-colour laminate swatches, headline 'Decors & Designs', 90-plus standard colours",                       pillar: "Decors" },
] as const;

export function ASDLaminatPage({ client }: Props) {
  const frame = getFrameNumber(client);

  // Lightbox state (wired in Task 5)
  const [lightbox, setLightbox] = useState<number | null>(null);
  const openLightbox = useCallback((i: number) => setLightbox(i), []);

  return (
    <div className="asd-page">
      <LoadingTransition
        frameNumber={frame}
        clientName={client.name}
        scope={["Social", "Ads"]}
        location="Canada"
        year={client.year}
      />

      <header className="asd-rail">
        <Link className="asd-rail-back" href="/portfolio">← Portfolio</Link>
        <span className="asd-rail-center">ASD LAMINAT · CASE STUDY</span>
        <span className="asd-rail-meta">FrameFlow · Reel <b>{frame}</b> · 2025</span>
      </header>

      <section className="asd-hero">
        <div className="asd-hero-inner">
          <div className="asd-hero-text">
            <p className="asd-crumb"><span>Case Study</span><i>·</i><span>Reel {frame}</span><i>·</i><span>Canada</span></p>
            <h1 className="asd-hero-title">One market.<br /><em>Every channel.</em></h1>
            <p className="asd-hero-deck"><b>ASD Laminat</b> has pressed high-performance surfaces for <b>65 years</b> and ships to <b>85+ countries</b>. The brief for Canada: make the architects, fabricators and specifiers who choose the panel <b>know the name</b>. We built a five-pillar social system — then ran it hot across LinkedIn, Instagram and Google.</p>
            <dl className="asd-hero-meta">
              <div><dt>01 · Social</dt><dd>5 pillars · 1 voice</dd></div>
              <div><dt>02 · Ads</dt><dd>3 channels · 678K impressions</dd></div>
              <div><dt>Reach</dt><dd>Halifax → Vancouver</dd></div>
            </dl>
          </div>
          <div className="asd-hero-cards">
            <button className="asd-hcard hc-1" onClick={() => openLightbox(2)}><img src={POSTS[2].src} alt={POSTS[2].alt} /><span className="tag">Canadian Market</span></button>
            <button className="asd-hcard hc-2" onClick={() => openLightbox(1)}><img src={POSTS[1].src} alt={POSTS[1].alt} /><span className="tag">Product Lines</span></button>
            <button className="asd-hcard hc-3" onClick={() => openLightbox(3)}><img src={POSTS[3].src} alt={POSTS[3].alt} /><span className="tag">Specifier-first</span></button>
          </div>
        </div>
      </section>

      <FontLink />
      <style jsx global>{`
        /* PORT the prototype <style> (lines 10–174) here, scoped under .asd-page.
           Drop .preview-banner and the '*{}' reset; rescope 'img{}' to '.asd-page img'.
           Keep the .asd-page CSS-var block verbatim. */
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
        href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap"
      />
    </>
  );
}
```

- [ ] **Step 2: Port the prototype CSS.** Copy the prototype `<style>` rules (lines 10–174) into the `styled-jsx global` block, scoped under `.asd-page`. Drop `.preview-banner` and `*{...}`; rescope `img{...}` → `.asd-page img{...}`. Keep every `.asd-*` rule and both `@media` blocks.

- [ ] **Step 3: Typecheck + lint**

```bash
npx tsc --noEmit && npm run lint
```
Expected: tsc clean; only the file's expected `no-img-element` / `no-page-custom-font` warnings, no new errors.

- [ ] **Step 4: Build**

```bash
npm run build
```
Expected: succeeds, `/portfolio/asd-laminate` pre-rendered.

- [ ] **Step 5: Commit**

```bash
git add src/components/portfolio/featured/ASDLaminatPage.tsx
git commit -m "feat(portfolio): ASD Laminat shell — rail, hero, loading transition

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Headline marquee + brief band

Add the signature kinetic marquee (new element, not in the prototype) and the graphite brief band.

**Files:**
- Modify: `src/components/portfolio/featured/ASDLaminatPage.tsx`

**Interfaces:**
- Consumes: nothing new.
- Produces: `.asd-marquee` markup + CSS.

- [ ] **Step 1: Add the marquee + brief markup** directly after the hero `</section>`:

```tsx
      <section className="asd-marquee" aria-hidden="true">
        <div className="asd-marquee-track">
          {[0, 1].map((dup) => (
            <span className="asd-marquee-group" key={dup}>
              {["Product Lines", "Canadian Market", "Performance", "Healthy Spaces", "Decors"].map((h) => (
                <span className="asd-marquee-item" key={h}>{h}<i>✦</i></span>
              ))}
            </span>
          ))}
        </div>
      </section>

      <section className="asd-brief">
        <div className="asd-brief-inner">
          <span className="asd-brief-stamp">The brief</span>
          <h2>Make Canadian architects<br /><em>know the name.</em></h2>
          <p>A 65-year manufacturer, brand-new to the Canadian conversation. Two sides to the story — the product&apos;s proof, and the market&apos;s attention. Reach the people who actually spec the panel: architects, designers, fabricators. From Halifax to Vancouver.</p>
          <p className="asd-brief-by"><span></span> ASD Laminat · Canada</p>
        </div>
      </section>
```

- [ ] **Step 2: Add marquee CSS** to the `styled-jsx global` block (brief CSS already came from the Task 3 port). Match the file's unprefixed convention if the ported rules are unprefixed, else prefix with `.asd-page`:

```css
.asd-page .asd-marquee{overflow:hidden;border-top:1px solid var(--off-deep);border-bottom:1px solid var(--off-deep);background:#fff;padding:18px 0}
.asd-page .asd-marquee-track{display:flex;width:max-content;animation:asd-scroll 30s linear infinite}
.asd-page .asd-marquee-group{display:flex;flex-shrink:0}
.asd-page .asd-marquee-item{display:flex;align-items:center;gap:26px;padding:0 26px;font-family:"Anton",sans-serif;font-size:clamp(22px,2.6vw,38px);letter-spacing:.01em;text-transform:uppercase;color:var(--graphite);white-space:nowrap}
.asd-page .asd-marquee-item i{color:var(--orange);font-style:normal;font-size:.7em}
@keyframes asd-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
```

- [ ] **Step 3: Typecheck + lint + build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```
Expected: all clean; no new lint errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/portfolio/featured/ASDLaminatPage.tsx
git commit -m "feat(portfolio): ASD Laminat pillar marquee + brief band

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: Deliverable 01 — Social (pillars, feed, lightbox)

The 5 pillars, the 9-post feed opening a keyboard lightbox.

**Files:**
- Modify: `src/components/portfolio/featured/ASDLaminatPage.tsx`

**Interfaces:**
- Consumes: `POSTS` (Task 3), `lightbox`/`setLightbox`/`openLightbox` (Task 3).
- Produces: `PILLARS` const, the lightbox modal, `closeLightbox()` / `stepLightbox(delta)` handlers + keyboard effect.

- [ ] **Step 1: Add the `PILLARS` const** near `POSTS`:

```tsx
const PILLARS = [
  { id: "P.01", name: "Product Lines",   note: "Exterior · Compact · Carbon" },
  { id: "P.02", name: "Canadian Market", note: "Halifax → Vancouver" },
  { id: "P.03", name: "Performance",     note: "Durable · fire-safe · formable" },
  { id: "P.04", name: "Healthy Spaces",  note: "Antiviral · food-safe" },
  { id: "P.05", name: "Decors",          note: "Wood, stone & trend collections" },
] as const;
```

- [ ] **Step 2: Add the Social section markup** after the brief `</section>`:

```tsx
      <section className="asd-del">
        <div className="asd-del-head">
          <span className="num">01</span>
          <div className="text">
            <p className="label">Deliverable 01 · Social Media</p>
            <h3><em>System</em> before posts. Five pillars, one voice.</h3>
          </div>
          <p className="meta">
            <span><b>5</b> content pillars</span>
            <span><b>9</b> hero creatives</span>
            <span><b>Product-led</b> storytelling</span>
          </p>
        </div>

        <div className="asd-pillars">
          <div className="head"><span>The pillar system</span><small>1 brand · 5 stories</small></div>
          <div className="grid">
            {PILLARS.map((p) => (
              <div className="pill" key={p.id}>
                <span className="pid">{p.id}</span>
                <span className="pname">{p.name}</span>
                <span className="pnote">{p.note}</span>
              </div>
            ))}
          </div>
          <p className="note">Every post ladders up to one of five pillars — so the feed reads as a brand, not a scrapbook.</p>
        </div>

        <div className="asd-grid-wrap">
          <p className="lbl">— The feed · nine shipped creatives · tap to enlarge —</p>
          <div className="asd-grid">
            {POSTS.map((m, i) => (
              <button className="cell" key={m.src} onClick={() => openLightbox(i)}>
                <img src={m.src} alt={m.alt} />
                <span className="pill-tag">{m.pillar}</span>
                <span className="zoom">↗</span>
              </button>
            ))}
          </div>
        </div>
      </section>
```

- [ ] **Step 3: Add the lightbox modal** inside `.asd-page` (e.g. right before `<FontLink />`):

```tsx
      {lightbox !== null && (
        <div
          className="asd-modal open"
          role="dialog"
          aria-modal="true"
          aria-label={`${POSTS[lightbox].pillar} creative — enlarged`}
          onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
        >
          <button className="asd-modal-close" onClick={closeLightbox} aria-label="Close">✕</button>
          <button className="asd-modal-nav prev" onClick={() => stepLightbox(-1)} aria-label="Previous">‹</button>
          <div className="asd-modal-img"><img src={POSTS[lightbox].src} alt={POSTS[lightbox].alt} /></div>
          <button className="asd-modal-nav next" onClick={() => stepLightbox(1)} aria-label="Next">›</button>
          <p className="asd-modal-cap">{POSTS[lightbox].pillar} · {lightbox + 1} / {POSTS.length}</p>
        </div>
      )}
```

- [ ] **Step 4: Add the lightbox handlers + keyboard effect** inside the component (after `openLightbox`):

```tsx
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const stepLightbox = useCallback(
    (delta: number) => setLightbox((i) => (i === null ? i : (i + delta + POSTS.length) % POSTS.length)),
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
Expected: tsc clean (the scaffolded `lightbox`/`openLightbox` are now consumed, so any prior unused warning clears); no new lint errors; build succeeds.

- [ ] **Step 6: Re-read the handlers** once before committing: confirm `stepLightbox` wraps both directions (`(i + delta + 9) % 9`), the effect removes its listener AND restores `body.overflow` in cleanup, and backdrop-click uses `e.target === e.currentTarget`.

- [ ] **Step 7: Commit**

```bash
git add src/components/portfolio/featured/ASDLaminatPage.tsx
git commit -m "feat(portfolio): ASD Laminat social section — pillars, feed, lightbox

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 6: Deliverable 02 — Ad Management + "Who leaned in" + colophon

The ad-campaign section (3 channel cards + combined strip), the sectors/regions columns, and the colophon.

**Files:**
- Modify: `src/components/portfolio/featured/ASDLaminatPage.tsx`

**Interfaces:**
- Consumes: `frame` (Task 3).
- Produces: `.asd-ads`, `.asd-leanin`, `.asd-colophon` markup + `.asd-colophon-cta`/`.asd-colophon-link` CSS.

- [ ] **Step 1: Add the ads + lean-in + colophon markup** after the social `</section>`:

```tsx
      <section className="asd-ads">
        <div className="asd-ads-inner">
          <div className="asd-del-head light">
            <span className="num">02</span>
            <div className="text">
              <p className="label">Deliverable 02 · Ad Management</p>
              <h3><em>Three channels.</em> One coordinated push.</h3>
            </div>
            <p className="meta">
              <span><b>LinkedIn</b> · IG · Google</span>
              <span><b>678K</b> impressions</span>
              <span><b>Canada</b>-wide</span>
              <span><b>Spring</b> 2025</span>
            </p>
          </div>

          <div className="asd-channels">
            <div className="asd-ch ch-linkedin">
              <div className="ch-head"><span className="ch-name">LinkedIn</span><span className="ch-role">B2B awareness — reaching specifiers</span></div>
              <div className="ch-stats">
                <div className="stat"><span className="v">138K</span><span className="l">Impressions</span></div>
                <div className="stat"><span className="v">88.4K</span><span className="l">Reach</span></div>
                <div className="stat"><span className="v">147%</span><span className="l">of target audience</span></div>
                <div className="stat"><span className="v">9</span><span className="l">Ads run</span></div>
              </div>
              <p className="ch-take">Government Administration, Higher Education and Technology led engagement — the Greater Toronto Area was the most responsive market.</p>
            </div>
            <div className="asd-ch ch-instagram">
              <div className="ch-head"><span className="ch-name">Instagram</span><span className="ch-role">Brand presence — from a standing start</span></div>
              <div className="ch-stats">
                <div className="stat"><span className="v">28.7K</span><span className="l">Views</span></div>
                <div className="stat"><span className="v">14.5K</span><span className="l">Reach</span></div>
                <div className="stat"><span className="v">692</span><span className="l">Link clicks</span></div>
                <div className="stat"><span className="v">↑100%</span><span className="l">Across the board</span></div>
              </div>
              <p className="ch-take">A brand-new paid presence: reach, engagement and link clicks all built from zero over the campaign window.</p>
            </div>
            <div className="asd-ch ch-google">
              <div className="ch-head"><span className="ch-name">Google Search</span><span className="ch-role">Intent capture — catching demand</span></div>
              <div className="ch-stats">
                <div className="stat"><span className="v">511K</span><span className="l">Impressions</span></div>
                <div className="stat"><span className="v">2.1K</span><span className="l">Clicks</span></div>
                <div className="stat"><span className="v">CA$0.21</span><span className="l">Avg. cost / click</span></div>
                <div className="stat"><span className="v">EN·FR</span><span className="l">Bilingual terms</span></div>
              </div>
              <p className="ch-take">Ranked on high-intent searches in both languages — from &ldquo;high pressure laminate&rdquo; to &ldquo;comptoir stratifié&rdquo; — at a $0.21 average click.</p>
            </div>
          </div>

          <div className="asd-combined">
            <span className="c-lead">Across three channels</span>
            <div className="c-row"><span><b>678K+</b> impressions</span><i>·</i><span><b>Halifax → Vancouver</b></span><i>·</i><span><b>GTA</b> most responsive</span></div>
            <p className="c-note">Full campaign reporting shared privately with the client.</p>
          </div>
        </div>
      </section>

      <section className="asd-leanin">
        <div className="asd-leanin-inner">
          <p className="asd-eyebrow">Where it landed</p>
          <h3>Who leaned in.</h3>
          <div className="asd-cols">
            <div className="col">
              <p className="col-lbl">Top sectors by engagement</p>
              <ul>
                <li>Government Administration</li><li>Higher Education</li><li>Technology &amp; Internet</li>
                <li>Business Consulting</li><li>Hospitals &amp; Health Care</li><li>Construction</li>
              </ul>
            </div>
            <div className="col">
              <p className="col-lbl">Most-reached regions</p>
              <ul>
                <li>Greater Toronto Area</li><li>Greater Montreal</li><li>Greater Vancouver</li>
                <li>Ottawa</li><li>Calgary</li><li>Halifax</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="asd-colophon">
        <div className="asd-swatches">
          <div className="sw"><span className="chip" style={{ background: "#F26A21" }}></span><span className="sw-name">ASD Orange</span><span className="sw-hex">#F26A21</span></div>
          <div className="sw"><span className="chip" style={{ background: "#262626" }}></span><span className="sw-name">Graphite</span><span className="sw-hex">#262626</span></div>
          <div className="sw"><span className="chip" style={{ background: "#8A8C8E" }}></span><span className="sw-name">Steel Gray</span><span className="sw-hex">#8A8C8E</span></div>
          <div className="sw"><span className="chip" style={{ background: "#F4F2EF", border: "1px solid #e7e3dc" }}></span><span className="sw-name">Off White</span><span className="sw-hex">#F4F2EF</span></div>
        </div>
        <h2 className="asd-close">One brand.<br /><em>Every channel.</em></h2>
        <p className="asd-sign">Prepared by <b>FrameFlow</b> · Reel {frame} · 2025</p>
        <div className="asd-colophon-cta">
          <Link className="asd-back-btn" href="/contact">Start a project →</Link>
          <Link className="asd-colophon-link" href="/portfolio">← Back to the archive</Link>
        </div>
      </section>
```

- [ ] **Step 2: Add colophon-CTA CSS delta** (the prototype had a single back button; we add a contact CTA + archive link). Append to `styled-jsx global`:

```css
.asd-page .asd-colophon-cta{display:flex;gap:22px;align-items:center;justify-content:center;flex-wrap:wrap}
.asd-page .asd-colophon-link{font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:var(--steel);text-decoration:none;font-weight:600}
.asd-page .asd-colophon-link:hover{color:var(--graphite)}
```

- [ ] **Step 3: Typecheck + lint + build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```
Expected: all clean; no new lint errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/portfolio/featured/ASDLaminatPage.tsx
git commit -m "feat(portfolio): ASD Laminat ad-campaign section + colophon

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 7: Motion polish, reduced-motion, responsive, final verification

Guard all motion behind `prefers-reduced-motion`, verify responsive behavior, and run the full build.

**Files:**
- Modify: `src/components/portfolio/featured/ASDLaminatPage.tsx`

- [ ] **Step 1: Grep the file for real `animation:`/`transition:` declarations** so the reduced-motion overrides target selectors that actually exist. Confirm the marquee uses `.asd-marquee-track { animation: asd-scroll ... }` and which elements have hover transforms (`.asd-hcard`, `.asd-grid .cell`, `.pill`, `.asd-ch` if it has one, `.asd-back-btn`). Only disable what exists.

- [ ] **Step 2: Add a reduced-motion block** at the end of `styled-jsx global` (adjust the selector list to match what Step 1 found):

```css
@media (prefers-reduced-motion: reduce){
  .asd-page .asd-marquee-track{animation:none;transform:none}
  .asd-page .asd-hcard,.asd-page .asd-grid .cell,.asd-page .pill,.asd-page .asd-back-btn{transition:none}
  .asd-page .asd-hcard:hover{transform:none}
  .asd-page .asd-grid .cell:hover{transform:none}
  .asd-page .pill:hover{transform:none}
}
```

- [ ] **Step 3: Typecheck + lint**

```bash
npx tsc --noEmit && npm run lint
```
Expected: clean, no new errors.

- [ ] **Step 4: Responsive + reduced-motion check** — `npm run dev` (background), load `http://localhost:<port>/portfolio/asd-laminate` and:
  - Resize to ~800px and ~480px: hero stacks, pillar grid → 2-up then 1-up, feed grid → 2-up (2-col at 520), channels stack, lean-in columns stack, rail center label hides at ≤880px.
  - Enable OS "Reduce motion" and reload: marquee is static, hover transforms off.
  Stop the dev server afterward.

- [ ] **Step 5: Full production build**

```bash
npm run build
```
Expected: build succeeds; `/portfolio/asd-laminate` in the generated static params.

- [ ] **Step 6: Final visual pass** — drive the real page end to end with headless Chrome (screenshot after the LoadingTransition completes) and dump the `/portfolio` index DOM to confirm the ASD row reads `003 · ASD LAMINAT · Now showing · SOCIAL MEDIA · AD MANAGEMENT`. Confirm no console errors.

- [ ] **Step 7: Commit**

```bash
git add src/components/portfolio/featured/ASDLaminatPage.tsx
git commit -m "feat(portfolio): ASD Laminat reduced-motion guard, responsive polish

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Self-Review

**Spec coverage:**
- Integration (new component, featured.ts, clients.ts rename + reorder, frame 003) → Task 2 ✓
- Concept + 10-section flow → Tasks 3 (rail/hero) + 4 (marquee/brief) + 5 (social) + 6 (ads/lean-in/colophon) ✓
- LoadingTransition + lightbox shared primitives → Tasks 3, 5 ✓
- Art direction (palette/type incl. Anton/motion) → Task 3 (port) + Task 7 (reduced-motion) ✓
- Asset pipeline (9 compressed PNGs, corrected mapping) → Task 1 ✓
- Corrected pillar tags (7.png→Performance, 20.png→Decors) → baked into the POSTS array (Task 3) + verified in Task 1 Step 3 ✓
- Scope guardrails (9 posts, no video, no website, metrics verbatim) → honored across Tasks 5–6 ✓
- Success criteria (route resolves, index frame 003 + pill + services, lightbox, ad cards, reduced-motion, build clean) → Tasks 2, 5, 6, 7 ✓

**Placeholder scan:** No "TBD/handle edge cases/add validation". The Task 1 compression loop and Task 7 reduced-motion selector list are the only adaptive steps, each with explicit verify/grep instructions — not vague.

**Type consistency:** `POSTS`/`PILLARS` shapes defined in Tasks 3/5 match their consumers; `openLightbox`/`closeLightbox`/`stepLightbox`/`lightbox` names consistent between Tasks 3 and 5; `LoadingTransition` prop names match the verified component signature; `getFrameNumber` returns the padded string used in the rail, crumb, and colophon.
