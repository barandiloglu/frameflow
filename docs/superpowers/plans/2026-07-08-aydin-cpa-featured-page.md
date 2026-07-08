# Aydın CPA Featured Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bespoke, production-grade featured case-study page for Aydın CPA at `/portfolio/aydin-cpa`, matching the craft level of the six existing featured pages.

**Architecture:** One self-contained client component (`AydinCPAPage.tsx`) with scoped `styled-jsx`, its own top rail + footer (no global Navbar/Footer), reusing the shared `LoadingTransition` overlay and a keyboard-accessible lightbox. Registered in `featured.ts`; the `clients.ts` entry is promoted to `featured: true`. Real assets (illustrated posts, compressed reels, website shot) live under `public/portfolio/aydin-cpa/`. The approved prototype's CSS is ported into the component's `styled-jsx`; new logic (React lightbox, inline video, marquee, reduced-motion) is written fresh.

**Tech Stack:** Next.js 16.2.1 (App Router), React 19.2.4, TypeScript, styled-jsx, framer-motion 12 (available but optional — CSS-first), ffmpeg (asset prep).

## Global Constraints

- **Read `node_modules/next/dist/docs/` before writing Next-specific code** — this Next.js has breaking changes vs. training data (per AGENTS.md).
- Featured pages are `"use client"` components, fully bespoke, **no global `<Navbar>`/`<Footer>`** (verified against `BigBearsPage.tsx`).
- **All content must be real** — never invent facts, metrics, or copy beyond what the assets/website support.
- Palette: navy `#044585`, navy-deep `#033568`, orange `#EC8023`, orange-deep `#CF6C17`, CRA-red `#CC0000`, off-white `#F5F6F8`, off-deep `#E6E9EE`, ink `#0F2136`.
- Type: Montserrat (display 600–900) + Poppins (body 400–600), Google Fonts `<link>`.
- **`prefers-reduced-motion` must disable** marquee, hero float, scroll-reveal, and video autoplay motion.
- Asset filenames: `NN-kebab-descriptive.ext` (matches `public/portfolio/*` convention).
- No unit-test framework exists; verification per task = `npx tsc --noEmit` + `npm run lint` + browser check on `npm run dev`. Full `npm run build` at the end.
- Slug is `aydin-cpa`; frame number derives from roster position (index 4 → `"004"`) — never hardcode it in data.

---

### Task 1: Asset pipeline

Prepare and place all media under `public/portfolio/aydin-cpa/`. No app code yet.

**Files:**
- Create: `public/portfolio/aydin-cpa/posts/{01-fhsa,02-salary-or-dividend,03-30000-threshold,04-cra-red-flags}.png`
- Create: `public/portfolio/aydin-cpa/reels/{reel-01-new-tax-season,reel-02-not-filing-risk,reel-03-<slug>}.mp4`
- Create: `public/portfolio/aydin-cpa/reels/{reel-01-new-tax-season,reel-02-not-filing-risk,reel-03-<slug>}-poster.jpg`
- Create: `public/portfolio/aydin-cpa/website/home.png`

**Source paths** (note the Turkish-dotted folder name `aydıncpa`):
- `/Users/barandiloglu/Downloads/aydıncpa/Post 3/1.png` → `posts/01-fhsa.png`
- `/Users/barandiloglu/Downloads/aydıncpa/Post 4/14.png` → `posts/02-salary-or-dividend.png`
- `/Users/barandiloglu/Downloads/aydıncpa/Post 5/16.png` → `posts/03-30000-threshold.png`
- `/Users/barandiloglu/Downloads/aydıncpa/Post 6/18.png` → `posts/04-cra-red-flags.png`
- `/Users/barandiloglu/Downloads/aydıncpa/Reel 11/Reel 11.mp4` (+ `Reel 11 Thumbnail.png`)
- `/Users/barandiloglu/Downloads/aydıncpa/Reel 13/Reel 13.mp4` (+ `Reel 13 Thumbnail.png`)
- `/Users/barandiloglu/Downloads/aydıncpa/Reel 5/Reel 5.mp4` (no thumbnail)
- `/Users/barandiloglu/Downloads/Home-AYDIN-CPA-07-08-2026_03_04_PM.png` → `website/home.png`

- [ ] **Step 1: Install ffmpeg** (approved)

```bash
brew install ffmpeg
ffmpeg -version | head -1   # expect: ffmpeg version ...
```

- [ ] **Step 2: Create destination directories**

```bash
mkdir -p "/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/aydin-cpa/posts" \
         "/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/aydin-cpa/reels" \
         "/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/aydin-cpa/website"
```

- [ ] **Step 3: Confirm Reel 5 content** — extract a probe frame and view it to caption/rename it correctly.

```bash
SRC="/Users/barandiloglu/Downloads/aydıncpa"
ffmpeg -y -ss 2 -i "$SRC/Reel 5/Reel 5.mp4" -frames:v 1 /tmp/reel5-probe.jpg
```
Read `/tmp/reel5-probe.jpg` with the Read tool. Decide `reel-03`'s slug + headline from what it shows (e.g. `reel-03-<topic>`). Record the chosen slug + caption; use it consistently in Task 5.

- [ ] **Step 4: Compress the 4 post covers** (PNG → optimized, ≤ ~400 KB each, keep dimensions)

```bash
DST="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/aydin-cpa"
SRC="/Users/barandiloglu/Downloads/aydıncpa"
ffmpeg -y -i "$SRC/Post 3/1.png"  -vf "scale='min(1080,iw)':-1" "$DST/posts/01-fhsa.png"
ffmpeg -y -i "$SRC/Post 4/14.png" -vf "scale='min(1080,iw)':-1" "$DST/posts/02-salary-or-dividend.png"
ffmpeg -y -i "$SRC/Post 5/16.png" -vf "scale='min(1080,iw)':-1" "$DST/posts/03-30000-threshold.png"
ffmpeg -y -i "$SRC/Post 6/18.png" -vf "scale='min(1080,iw)':-1" "$DST/posts/04-cra-red-flags.png"
```

- [ ] **Step 5: Transcode the 3 reels** to web-friendly H.264 (≈720 wide, faststart, target 5–10 MB)

```bash
# reel-03 filename uses the slug chosen in Step 3
ffmpeg -y -i "$SRC/Reel 11/Reel 11.mp4" -vf "scale=720:-2" -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 96k -movflags +faststart "$DST/reels/reel-01-new-tax-season.mp4"
ffmpeg -y -i "$SRC/Reel 13/Reel 13.mp4" -vf "scale=720:-2" -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 96k -movflags +faststart "$DST/reels/reel-02-not-filing-risk.mp4"
ffmpeg -y -i "$SRC/Reel 5/Reel 5.mp4"   -vf "scale=720:-2" -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 96k -movflags +faststart "$DST/reels/reel-03-<slug>.mp4"
```

- [ ] **Step 6: Make reel posters** (reuse provided thumbnails for 11 & 13; extract for Reel 5)

```bash
ffmpeg -y -i "$SRC/Reel 11/Reel 11 Thumbnail.png" -vf "scale=720:-2" -q:v 4 "$DST/reels/reel-01-new-tax-season-poster.jpg"
ffmpeg -y -i "$SRC/Reel 13/Reel 13 Thumbnail.png" -vf "scale=720:-2" -q:v 4 "$DST/reels/reel-02-not-filing-risk-poster.jpg"
ffmpeg -y -ss 2 -i "$SRC/Reel 5/Reel 5.mp4" -frames:v 1 -vf "scale=720:-2" -q:v 4 "$DST/reels/reel-03-<slug>-poster.jpg"
```

- [ ] **Step 7: Resize the website screenshot** (~1400px wide for the browser frame)

```bash
ffmpeg -y -i "/Users/barandiloglu/Downloads/Home-AYDIN-CPA-07-08-2026_03_04_PM.png" -vf "scale=1400:-1" "$DST/website/home.png"
```

- [ ] **Step 8: Verify sizes are sane**

```bash
du -h "$DST"/posts/*.png "$DST"/reels/*.mp4 "$DST"/reels/*.jpg "$DST"/website/*.png
```
Expected: posts ≤ ~400 KB, each reel ≈ 5–10 MB, posters ≤ ~200 KB, website ≤ ~1 MB.
Read one post PNG + one poster JPG with the Read tool to confirm they're intact.

- [ ] **Step 9: Commit**

```bash
cd /Users/barandiloglu/Desktop/Projects/FrameFlow
git add public/portfolio/aydin-cpa
git commit -m "feat(portfolio): add Aydın CPA case-study media (posts, reels, website)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Data promotion, wiring, and component stub

Promote the client, register the featured route, and land a minimal stub so the route resolves and the index shows frame 004. This isolates the wiring so a reviewer can verify routing independently of the page design.

**Files:**
- Modify: `src/data/clients.ts` (the `aydin-cpa` entry, ~line 154)
- Modify: `src/app/portfolio/[slug]/featured.ts`
- Create: `src/components/portfolio/featured/AydinCPAPage.tsx` (stub)

**Interfaces:**
- Consumes: `FeaturedPageProps = { client: Client }` from `featured.ts`; `Client` type from `@/data/clients`.
- Produces: `export function AydinCPAPage({ client }: { client: Client })`.

- [ ] **Step 1: Promote the `clients.ts` entry.** Replace the existing line
  `{ slug: "aydin-cpa", name: "AYDIN CPA", services: ["Photography", "Website Design"] },`
  with:

```ts
  {
    slug: "aydin-cpa",
    name: "AYDIN CPA",
    services: ["Social Media", "Videography", "Website Design"],
    year: "2026",
    location: "Ottawa & Toronto, ON",
    runtime: "Live · aydincpa.ca",
    scene: "INT. FIRM — DAY",
    synopsis:
      "Social and web for a two-office Canadian accounting firm. A five-pillar content system rendered as 3D editorial illustration — a feed that stops the scroll — direct-to-camera reels, and aydincpa.ca, the firm site that turns attention into booked consultations.",
    featured: true,
  },
```

- [ ] **Step 2: Create the stub component** at `src/components/portfolio/featured/AydinCPAPage.tsx`:

```tsx
"use client";

import type { Client } from "@/data/clients";

type Props = { client: Client };

export function AydinCPAPage({ client }: Props) {
  return <main style={{ padding: 80 }}>{client.name} — case study (stub)</main>;
}
```

- [ ] **Step 3: Register in `featured.ts`.** Add the import alongside the others:

```ts
import { AydinCPAPage } from "@/components/portfolio/featured/AydinCPAPage";
```
and add the map entry inside `FEATURED_PAGES`:

```ts
  "aydin-cpa":                      AydinCPAPage,
```

- [ ] **Step 4: Typecheck + lint**

```bash
cd /Users/barandiloglu/Desktop/Projects/FrameFlow
npx tsc --noEmit && npm run lint
```
Expected: no errors.

- [ ] **Step 5: Visual check** — `npm run dev`, then load `http://localhost:3000/portfolio/aydin-cpa` (shows the stub) and `http://localhost:3000/portfolio` (Aydın CPA row shows frame `004`, services `SOCIAL MEDIA · VIDEOGRAPHY · WEBSITE DESIGN`, and a "Now showing" pill). Confirm both, then stop the dev server.

- [ ] **Step 6: Commit**

```bash
git add src/data/clients.ts src/app/portfolio/[slug]/featured.ts src/components/portfolio/featured/AydinCPAPage.tsx
git commit -m "feat(portfolio): promote Aydın CPA to featured + wire stub route

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Page shell — tokens, fonts, LoadingTransition, top rail, hero

Replace the stub with the real shell: root `.ac-page` with the token system, font `<link>`, the `LoadingTransition` intro, sticky top rail, and hero (headline + two tilted post cards). The lightbox is stubbed to a no-op click here and wired for real in Task 5.

**CSS source of truth:** `/Users/barandiloglu/Downloads/aydincpa-preview.html` (`<style>` block, lines 10–139) is approved and production-quality. Port its rules into this component's `styled-jsx global`, scoped under `.ac-page`. Reproduce the class names verbatim (`.ac-rail`, `.ac-hero`, `.ac-hcard`, `.ac-brief`, `.ac-del`, `.ac-pillars`, `.ac-grid`, `.ac-reels`, `.ac-web`, `.ac-browser`, `.ac-colophon`, `.ac-modal`, plus the `@media (max-width:880px)` and `(max-width:520px)` blocks). Add only the deltas each task calls out.

**Files:**
- Modify: `src/components/portfolio/featured/AydinCPAPage.tsx`

**Interfaces:**
- Consumes: `LoadingTransition` from `@/components/portfolio/LoadingTransition` — props `{ frameNumber: string; clientName: string; scope: readonly string[]; location?: string; year?: string }`. `getFrameNumber` from `@/data/clients`.
- Produces: the `.ac-page` root + `openLightbox(i: number)` call sites on the hero cards (function defined in Task 5; until then, define a local `const openLightbox = (_i: number) => {}` placeholder so the file compiles).

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
  { src: "/portfolio/aydin-cpa/posts/01-fhsa.png",              alt: "Aydın CPA social post — a navy path leading to a glowing house, headline 'Attention, first-time home buyers: the account you need, FHSA'", tag: "Business Guides", headline: "FHSA" },
  { src: "/portfolio/aydin-cpa/posts/02-salary-or-dividend.png", alt: "Aydın CPA social post — a 3D coin figure at a crossroads, headline 'Paying yourself: salary or dividend?'",                                  tag: "Business Guides", headline: "Salary or Dividend" },
  { src: "/portfolio/aydin-cpa/posts/03-30000-threshold.png",    alt: "Aydın CPA social post — an abstract 3D dollar sign, headline 'Did you hit $30,000 this year?'",                                             tag: "Deadlines",       headline: "Did You Hit $30,000?" },
  { src: "/portfolio/aydin-cpa/posts/04-cra-red-flags.png",      alt: "Aydın CPA social post — a single red flag on white, headline 'CRA red flags'",                                                             tag: "Myth Busting",    headline: "CRA Red Flags" },
] as const;

export function AydinCPAPage({ client }: Props) {
  const frame = getFrameNumber(client);

  // Lightbox state (wired in Task 5)
  const [lightbox, setLightbox] = useState<number | null>(null);
  const openLightbox = useCallback((i: number) => setLightbox(i), []);

  return (
    <div className="ac-page">
      <LoadingTransition
        frameNumber={frame}
        clientName={client.name}
        scope={["Social", "Website"]}
        location="Ottawa & Toronto"
        year={client.year}
      />

      <header className="ac-rail">
        <Link className="ac-rail-back" href="/portfolio">← Portfolio</Link>
        <span className="ac-rail-center">AYDIN CPA · CASE STUDY</span>
        <span className="ac-rail-meta">FrameFlow · Reel <b>{frame}</b> · 2026</span>
      </header>

      <section className="ac-hero">
        <div className="ac-hero-inner">
          <div className="ac-hero-text">
            <p className="ac-crumb"><span>Case Study</span><i>·</i><span>Reel {frame}</span><i>·</i><span>Ottawa &amp; Toronto</span></p>
            <h1 className="ac-hero-title">Tax content people<br /><em>actually read.</em></h1>
            <p className="ac-hero-deck"><b>Aydın CPA</b> is a two-office accounting firm. Most accountants make tax look beige. We gave them a feed people stop for — and the <b>website</b> that turns that attention into booked calls at <b>aydincpa.ca</b>.</p>
            <dl className="ac-hero-meta">
              <div><dt>01 · Social</dt><dd>5 pillars · posts + reels</dd></div>
              <div><dt>02 · Website</dt><dd>aydincpa.ca · live</dd></div>
              <div><dt>Look</dt><dd>3D editorial, no stock</dd></div>
            </dl>
          </div>
          <div className="ac-hero-cards">
            <button className="ac-hcard hc-1" onClick={() => openLightbox(0)}><img src={POSTS[0].src} alt={POSTS[0].alt} /></button>
            <button className="ac-hcard hc-2" onClick={() => openLightbox(1)}><img src={POSTS[1].src} alt={POSTS[1].alt} /></button>
          </div>
        </div>
      </section>

      <FontLink />
      <style jsx global>{`
        /* PORT the prototype <style> (lines 10–139) here, scoped under .ac-page.
           Keep the .ac-page CSS-var block verbatim. */
      `}</style>
    </div>
  );
}

function FontLink() {
  return (
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800;900&family=Poppins:wght@400;500;600&display=swap"
    />
  );
}
```

- [ ] **Step 2: Port the prototype CSS.** Copy the prototype `<style>` rules (lines 10–139 of `aydincpa-preview.html`) into the `styled-jsx global` block. Drop the `.preview-banner` rules (preview-only). Keep every `.ac-*` rule and both `@media` blocks unchanged.

- [ ] **Step 3: Typecheck + lint**

```bash
npx tsc --noEmit && npm run lint
```
Expected: no errors.

- [ ] **Step 4: Visual check** — `npm run dev`, load `/portfolio/aydin-cpa`. Confirm: loading overlay plays then peels; sticky rail; hero headline with orange "actually read."; two tilted post images load and lift on hover. Stop the server.

- [ ] **Step 5: Commit**

```bash
git add src/components/portfolio/featured/AydinCPAPage.tsx
git commit -m "feat(portfolio): Aydın CPA shell — rail, hero, loading transition

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Headline marquee + brief band

Add the signature kinetic marquee (new element, not in the prototype) and the navy brief band.

**Files:**
- Modify: `src/components/portfolio/featured/AydinCPAPage.tsx`

**Interfaces:**
- Consumes: `POSTS` (Task 3) for the headline strings.
- Produces: `.ac-marquee` markup + CSS.

- [ ] **Step 1: Add the marquee + brief markup** directly after the `</section>` of the hero:

```tsx
      <section className="ac-marquee" aria-hidden="true">
        <div className="ac-marquee-track">
          {[0, 1].map((dup) => (
            <span className="ac-marquee-group" key={dup}>
              {["FHSA", "Salary or Dividend", "CRA Red Flags", "Did You Hit $30,000?", "Business Guides", "Deadlines & Urgency"].map((h) => (
                <span className="ac-marquee-item" key={h}>{h}<i>✦</i></span>
              ))}
            </span>
          ))}
        </div>
      </section>

      <section className="ac-brief">
        <div className="ac-brief-inner">
          <span className="ac-brief-stamp">The brief</span>
          <h2>Make tax feel <em>simple, modern,</em><br />and worth booking.</h2>
          <p>Their audience knows the words — CRA, RRSP, HST — but not the strategy, and they&apos;re a little afraid of all of it. The job: explain advanced tax simply, look nothing like a dusty accountant, and turn attention into consultations. No stock photos, no jargon.</p>
          <p className="ac-brief-by"><span></span> Aydın CPA · Ottawa &amp; Toronto</p>
        </div>
      </section>
```

- [ ] **Step 2: Add marquee CSS** to the `styled-jsx global` block (brief CSS already came from the port in Task 3):

```css
.ac-page .ac-marquee{overflow:hidden;border-top:1px solid var(--off-deep);border-bottom:1px solid var(--off-deep);background:#fff;padding:18px 0}
.ac-page .ac-marquee-track{display:flex;width:max-content;animation:ac-scroll 32s linear infinite}
.ac-page .ac-marquee-group{display:flex;flex-shrink:0}
.ac-page .ac-marquee-item{display:flex;align-items:center;gap:26px;padding:0 26px;font-family:"Montserrat",sans-serif;font-weight:800;font-size:clamp(20px,2.4vw,34px);letter-spacing:-.01em;color:var(--navy);white-space:nowrap}
.ac-page .ac-marquee-item i{color:var(--orange);font-style:normal;font-size:.7em}
@keyframes ac-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
```

- [ ] **Step 3: Typecheck + lint**

```bash
npx tsc --noEmit && npm run lint
```
Expected: no errors.

- [ ] **Step 4: Visual check** — `npm run dev`, load the page. Confirm the marquee scrolls seamlessly (no jump at the loop) and the navy brief band renders centered. Stop the server.

- [ ] **Step 5: Commit**

```bash
git add src/components/portfolio/featured/AydinCPAPage.tsx
git commit -m "feat(portfolio): Aydın CPA headline marquee + brief band

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: Deliverable 01 — Social (pillars, feed, reels, lightbox)

The core section: 5 content pillars, the 4-post feed opening a keyboard lightbox, and 3 real inline reel videos.

**Files:**
- Modify: `src/components/portfolio/featured/AydinCPAPage.tsx`

**Interfaces:**
- Consumes: `POSTS` (Task 3), `lightbox`/`setLightbox`/`openLightbox` (Task 3).
- Produces: `REELS` const, the lightbox modal, `closeLightbox()` / `stepLightbox(delta)` handlers.

- [ ] **Step 1: Add the `REELS` const** near `POSTS` (use the Task 1 Step 3 slug/caption for reel 3):

```tsx
const REELS = [
  { src: "/portfolio/aydin-cpa/reels/reel-01-new-tax-season.mp4",  poster: "/portfolio/aydin-cpa/reels/reel-01-new-tax-season-poster.jpg",  headline: "New Tax Season Is Here" },
  { src: "/portfolio/aydin-cpa/reels/reel-02-not-filing-risk.mp4", poster: "/portfolio/aydin-cpa/reels/reel-02-not-filing-risk-poster.jpg", headline: "Not Filing Is The Real Risk" },
  { src: "/portfolio/aydin-cpa/reels/reel-03-<slug>.mp4",          poster: "/portfolio/aydin-cpa/reels/reel-03-<slug>-poster.jpg",          headline: "<caption from Task 1>" },
] as const;

const PILLARS = [
  { id: "P.01", name: "Tax Strategy & Myth Busting", note: "How tax actually works" },
  { id: "P.02", name: "Business Owner Guides",        note: "Corp vs. personal, vehicles, dividends" },
  { id: "P.03", name: "Niche Deep-Dives",            note: "Realtors, gig economy, expats" },
  { id: "P.04", name: "Deadlines & Urgency",         note: "RRSP, T4, year-ends" },
  { id: "P.05", name: "Firm Authority",              note: "Proactive partner, not a filer" },
] as const;
```

- [ ] **Step 2: Add the Social section markup** after the brief `</section>`:

```tsx
      <section className="ac-del">
        <div className="ac-del-head">
          <span className="num">01</span>
          <div className="text"><p className="label">Deliverable 01 · Social Media</p><h3><em>A look</em> nobody else in tax has.</h3></div>
          <p className="meta"><span><b>5</b> content pillars</span><span><b>3D editorial</b> illustration</span><span><b>Posts + reels</b></span></p>
        </div>

        <div className="ac-pillars">
          <div className="head"><span>The content pillars</span><small>1 firm · 5 stories</small></div>
          <div className="grid">
            {PILLARS.map((p) => (
              <div className="pill" key={p.id}>
                <span className="pid">{p.id}</span>
                <span className="pname">{p.name}</span>
                <span className="pnote">{p.note}</span>
              </div>
            ))}
          </div>
          <p className="note">Every post is a single symbolic hero object on clean space — a path to a house, a coin at a crossroads, a red flag. Reads as a brand, not a spreadsheet.</p>
        </div>

        <p className="ac-grid-lbl">— The feed · illustration posts · tap to enlarge —</p>
        <div className="ac-grid">
          {POSTS.map((m, i) => (
            <button className="cell" key={m.src} onClick={() => openLightbox(i)}>
              <img src={m.src} alt={m.alt} />
              <span className="tag">{m.tag}</span>
              <span className="zoom">↗</span>
            </button>
          ))}
        </div>

        <p className="ac-grid-lbl reels-lbl">— The reels · direct-to-camera explainers —</p>
        <div className="ac-reels">
          {REELS.map((r) => (
            <div className="rcell" key={r.src}>
              <video src={r.src} poster={r.poster} controls playsInline preload="none" />
              <span className="rtag">{r.headline}</span>
            </div>
          ))}
        </div>
      </section>
```

- [ ] **Step 3: Add the lightbox modal** just before the closing `</div>` of `.ac-page` (after the brief/social, before `<FontLink/>` — order among siblings does not matter, but keep it inside `.ac-page`):

```tsx
      {lightbox !== null && (
        <div
          className="ac-modal open"
          role="dialog"
          aria-modal="true"
          aria-label={`${POSTS[lightbox].headline} — enlarged`}
          onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
        >
          <button className="ac-modal-close" onClick={closeLightbox} aria-label="Close">✕</button>
          <button className="ac-modal-nav prev" onClick={() => stepLightbox(-1)} aria-label="Previous">‹</button>
          <div className="ac-modal-img"><img src={POSTS[lightbox].src} alt={POSTS[lightbox].alt} /></div>
          <button className="ac-modal-nav next" onClick={() => stepLightbox(1)} aria-label="Next">›</button>
          <p className="ac-modal-cap">Post · {POSTS[lightbox].tag} · {lightbox + 1} / {POSTS.length}</p>
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

- [ ] **Step 5: Add reel CSS delta** (prototype `.ac-reels .rcell` used a background image; we use a real `<video>`). Append to `styled-jsx global`:

```css
.ac-page .ac-reels .rcell video{width:100%;height:100%;object-fit:cover;display:block;background:#111}
.ac-page .ac-reels .rcell{background:#111}
```

- [ ] **Step 6: Typecheck + lint**

```bash
npx tsc --noEmit && npm run lint
```
Expected: no errors.

- [ ] **Step 7: Visual + interaction check** — `npm run dev`, load the page:
  - 5 pillar cards render, hover-lift.
  - 4 posts render; clicking any opens the lightbox; ← / → wrap; Escape closes; background scroll is locked while open; clicking the backdrop closes.
  - 3 reels show posters; pressing play streams inline video with audio.
  Stop the server.

- [ ] **Step 8: Commit**

```bash
git add src/components/portfolio/featured/AydinCPAPage.tsx
git commit -m "feat(portfolio): Aydın CPA social section — pillars, feed, reels, lightbox

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 6: Deliverable 02 — Website + colophon + footer

The website showcase (browser-chrome frame), colophon (palette + close line), and footer credit.

**Files:**
- Modify: `src/components/portfolio/featured/AydinCPAPage.tsx`

**Interfaces:**
- Consumes: nothing new.
- Produces: `.ac-web`, `.ac-colophon`, and footer markup.

- [ ] **Step 1: Add the website + colophon + footer markup** after the social `</section>`:

```tsx
      <section className="ac-web">
        <div className="ac-web-inner">
          <div className="ac-del-head light">
            <span className="num">02</span>
            <div className="text"><p className="label">Deliverable 02 · Website Design</p><h3>A firm site <em>that closes.</em></h3></div>
            <p className="meta"><span><b>aydincpa.ca</b></span><span><b>Design + build</b></span><span><b>2 offices</b></span><span><b>Live</b></span></p>
          </div>
          <div className="ac-browser">
            <div className="ac-browser-bar"><span className="dot r"></span><span className="dot y"></span><span className="dot g"></span><span className="ac-url">aydincpa.ca</span></div>
            <div className="ac-browser-shot"><img src="/portfolio/aydin-cpa/website/home.png" alt="Aydın CPA website homepage — navy and orange, 'We Offer Reliable Accounting', Book a Consultation and File Your Tax Now" /></div>
          </div>
          <div className="ac-web-below">
            <ul className="ac-web-features">
              <li><span className="fl">Two-office firm site</span><span className="fn">Ottawa HQ + Toronto, one clear identity</span></li>
              <li><span className="fl">Services architecture</span><span className="fn">Personal · Corporate · GST/HST · Payroll · Advisory</span></li>
              <li><span className="fl">Dual conversion CTAs</span><span className="fn">&ldquo;Book a Consultation&rdquo; + &ldquo;File Your Tax Now&rdquo;</span></li>
              <li><span className="fl">Compliance / Advisory / Management</span><span className="fn">Tabbed offering, plain-English</span></li>
            </ul>
            <a className="ac-visit" href="https://aydincpa.ca/" target="_blank" rel="noopener noreferrer">Visit the live site →</a>
          </div>
        </div>
      </section>

      <section className="ac-colophon">
        <div className="ac-swatches">
          <div className="sw"><span className="chip" style={{ background: "#044585" }}></span><span className="sw-name">Deep Blue</span><span className="sw-hex">#044585</span></div>
          <div className="sw"><span className="chip" style={{ background: "#EC8023" }}></span><span className="sw-name">Orange</span><span className="sw-hex">#EC8023</span></div>
          <div className="sw"><span className="chip" style={{ background: "#F5F6F8", border: "1px solid #e6e9ee" }}></span><span className="sw-name">Off White</span><span className="sw-hex">#F5F6F8</span></div>
        </div>
        <h2 className="ac-close">Complex tax.<br /><em>Clear content.</em></h2>
        <p className="ac-sign">Prepared by <b>FrameFlow</b> · Reel {frame} · 2026</p>
        <div className="ac-colophon-cta">
          <Link className="ac-back-btn" href="/contact">Start a project →</Link>
          <Link className="ac-colophon-link" href="/portfolio">← Back to the archive</Link>
        </div>
      </section>
```

- [ ] **Step 2: Add colophon-CTA CSS delta** (the prototype had a single back button; we add a contact CTA + archive link). Append to `styled-jsx global`:

```css
.ac-page .ac-colophon-cta{display:flex;gap:22px;align-items:center;justify-content:center;flex-wrap:wrap}
.ac-page .ac-colophon-link{font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:#7a869a;text-decoration:none;font-weight:600}
.ac-page .ac-colophon-link:hover{color:var(--navy)}
```

- [ ] **Step 3: Typecheck + lint**

```bash
npx tsc --noEmit && npm run lint
```
Expected: no errors.

- [ ] **Step 4: Visual check** — `npm run dev`, load the page. Confirm: browser-chrome frame shows the homepage top-anchored; feature list renders two-up; "Visit the live site" opens aydincpa.ca in a new tab; colophon swatches + close line + both CTA links render. Stop the server.

- [ ] **Step 5: Commit**

```bash
git add src/components/portfolio/featured/AydinCPAPage.tsx
git commit -m "feat(portfolio): Aydın CPA website showcase + colophon

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 7: Motion polish, reduced-motion, responsive, final verification

Guard all motion behind `prefers-reduced-motion`, verify responsive behavior, and run the full build.

**Files:**
- Modify: `src/components/portfolio/featured/AydinCPAPage.tsx`

- [ ] **Step 1: Add a reduced-motion block** at the end of `styled-jsx global`:

```css
@media (prefers-reduced-motion: reduce){
  .ac-page .ac-marquee-track{animation:none;transform:none}
  .ac-page .ac-hcard,.ac-page .ac-grid .cell,.ac-page .ac-reels .rcell,.ac-page .pill,.ac-page .ac-visit{transition:none}
  .ac-page .ac-hcard:hover{transform:none}
}
```
If a hero idle-float animation was added in Task 3's port, also set it to `animation:none` here.

- [ ] **Step 2: Cap the website shot height** so the tall homepage reads as a framed preview, not a full-length dump. Confirm/append:

```css
.ac-page .ac-browser-shot{max-height:620px;overflow:hidden}
.ac-page .ac-browser-shot img{width:100%;height:auto;display:block}
```

- [ ] **Step 3: Typecheck + lint**

```bash
npx tsc --noEmit && npm run lint
```
Expected: no errors.

- [ ] **Step 4: Responsive + reduced-motion check** — `npm run dev`, load the page and:
  - Resize to ~800px and ~480px: hero stacks, pillar grid → 2-up then 1-up, feed grid → 2-up, reels remain legible, rail center label hides at ≤880px.
  - Enable OS "Reduce motion" (macOS: System Settings → Accessibility → Display → Reduce motion) and reload: marquee is static, hover transforms are off.
  Stop the server.

- [ ] **Step 5: Full production build**

```bash
npm run build
```
Expected: build succeeds; `/portfolio/aydin-cpa` appears in the generated static params (it is one of the pre-rendered `generateStaticParams` slugs).

- [ ] **Step 6: Final visual pass with the `verify` skill** — drive the real page end to end (loading transition → hero cards open lightbox → keyboard nav → reels play → website link → colophon CTAs) and confirm no console errors.

- [ ] **Step 7: Commit**

```bash
git add src/components/portfolio/featured/AydinCPAPage.tsx
git commit -m "feat(portfolio): Aydın CPA reduced-motion guard, responsive polish

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Self-Review

**Spec coverage:**
- Integration (new component, featured.ts, clients.ts, frame 004) → Task 2 ✓
- Concept + 9-section flow → Tasks 3 (rail/hero) + 4 (marquee/brief) + 5 (social) + 6 (website/colophon/footer) ✓
- LoadingTransition + lightbox shared primitives → Tasks 3, 5 ✓
- Art direction (palette/type/motion) → Task 3 (port) + Task 7 (reduced-motion) ✓
- Asset pipeline (ffmpeg, posts/reels/website) → Task 1 ✓
- Scope guardrails (4 covers, inline reels, one homepage shot, no prev/next) → honored across Tasks 5–6 ✓
- Success criteria (route resolves, index frame 004 + pill, lightbox, reels, reduced-motion, build clean) → Tasks 2, 5, 7 ✓

**Placeholder scan:** The only intentional placeholders are `reel-03-<slug>` and its caption, explicitly resolved in Task 1 Step 3 and carried into Task 5 Step 1 — flagged, not vague. No "TBD/handle edge cases/add validation" instances.

**Type consistency:** `POSTS`/`REELS`/`PILLARS` shapes defined in Tasks 3/5 match their consumers; `openLightbox`/`closeLightbox`/`stepLightbox`/`lightbox` names consistent between Tasks 3 and 5; `LoadingTransition` prop names match the verified component signature; `getFrameNumber` returns the padded string used throughout.
