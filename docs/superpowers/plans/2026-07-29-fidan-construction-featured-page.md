# Fidan Construction Featured Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bespoke, production-grade featured case-study page for Fidan Construction at `/portfolio/fidan-construction`, in its own "work order / blueprint" voice, matching the craft level of the sibling featured pages.

**Architecture:** One self-contained client component (`FidanConstructionPage.tsx`) with scoped `styled-jsx`, its own work-order rail + sign-off footer (no global Navbar/Footer, and NO LoadingTransition/marquee). It ports the approved prototype 1:1 into React, wiring its three interactions as state: a BEFORE⇄AFTER build-sheet toggle, a website tab-switcher, and a styled lightbox for the 5 creatives. Registered in `featured.ts`; the `clients.ts` entry is promoted to `featured: true`. Assets: 5 provided creative JPEGs + 4 screenshots captured from the live fidanconstruction.com, under `public/portfolio/fidan-construction/`. Stacked on `feat/aydin-cpa-case-study`.

**Tech Stack:** Next.js 16.2.1 (App Router), React 19.2.4, TypeScript, styled-jsx, ffmpeg + pngquant + headless Chrome (asset prep — all available).

## Global Constraints

- **Read `node_modules/next/dist/docs/` before writing Next-specific code** — this Next.js has breaking changes vs. training data (per AGENTS.md).
- Featured pages are `"use client"` components, fully bespoke, **no global `<Navbar>`/`<Footer>`** (verified against `AydinCPAPage.tsx` / `ConnecTRPage.tsx`). This page also has **NO `LoadingTransition` and NO marquee**.
- **All content real** — copy verbatim from the approved prototype; the 5 creatives map to fixed hooks (verified by viewing); the 4 website shots are real captures of the live site.
- Palette: ink `#0C0C0D`, paper `#F4F2EE`, red `#E2231A`, grey `#8A8A86`, rule `rgba(12,12,13,.16)`.
- Type: **Anton** + **Inter** (400–600) + **JetBrains Mono** (400;500;700), Google Fonts `<link>` with two `<link rel="preconnect">` (incl. `crossOrigin=""` on gstatic).
- JSX text must escape apostrophes/quotes/ampersands (`&rsquo;` `&ldquo;` `&rdquo;` `&amp;`) to satisfy `react/no-unescaped-entities` — as the sibling pages do. (Plain JS string literals in the data arrays do NOT need escaping.)
- **`prefers-reduced-motion` must disable** the creative-cell hover scale and the lightbox fade/pop + nav transitions.
- Asset filenames: `ads/NN-kebab.jpg`, `website/<page>.jpg`.
- No unit-test framework; verification per task = `npx tsc --noEmit` + `npm run lint` (no NEW errors vs the known baseline: 6 pre-existing errors in unrelated files — ThemeProvider/ThemeToggle/MarkScene/admin — plus `no-page-custom-font` / `no-img-element` warnings every featured page carries) + `npm run build`. App client-renders portfolio pages — verify routes via `npm run build`, not curl HTML.
- Frame number derives from `getFrameNumber(client)` (roster index 11 → "012") — never hardcoded; the page renders `Work Order FF-{frame}` and `FF-{frame}`.

---

### Task 1: Asset pipeline

Prepare the 5 creatives + capture the 4 live website screenshots under `public/portfolio/fidan-construction/`. No app code.

**Files:**
- Create: `public/portfolio/fidan-construction/ads/{01-demo-to-clean-finish,02-turnover-ready,03-vacant-units,04-one-team,05-flawless-finish}.jpg`
- Create: `public/portfolio/fidan-construction/website/{property-managers,home,services,projects}.jpg`

**Sources — creatives (map verified by viewing):**
- `/Users/barandiloglu/Downloads/WhatsApp Image 2026-07-29 at 13.38.36.jpeg`     → `ads/01-demo-to-clean-finish.jpg` ("From demo to clean finish — 2 days")
- `/Users/barandiloglu/Downloads/WhatsApp Image 2026-07-29 at 13.38.36 (1).jpeg` → `ads/02-turnover-ready.jpg` ("Turnover ready in 48 hours")
- `/Users/barandiloglu/Downloads/WhatsApp Image 2026-07-29 at 13.38.36 (2).jpeg` → `ads/03-vacant-units.jpg` ("Vacant units cost you money")
- `/Users/barandiloglu/Downloads/WhatsApp Image 2026-07-29 at 13.38.36 (3).jpeg` → `ads/04-one-team.jpg` ("One team, start to finish")
- `/Users/barandiloglu/Downloads/WhatsApp Image 2026-07-29 at 13.38.37.jpeg`     → `ads/05-flawless-finish.jpg` ("Flawless finish, no callbacks")

**Sources — website (live, all HTTP 200):** `https://fidanconstruction.com/property-managers`, `/`, `/services`, `/projects`.

- [ ] **Step 1: Create dirs**

```bash
mkdir -p "/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/fidan-construction/ads" \
         "/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/fidan-construction/website"
```

- [ ] **Step 2: Copy + compress the 5 creatives** (ffmpeg re-encode + pngquant not needed for JPEG; use ffmpeg `-q:v`)

```bash
SRC="/Users/barandiloglu/Downloads"
DST="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/fidan-construction/ads"
ffmpeg -y -loglevel error -i "$SRC/WhatsApp Image 2026-07-29 at 13.38.36.jpeg"     -vf "scale='min(1200,iw)':-1" -q:v 4 "$DST/01-demo-to-clean-finish.jpg"
ffmpeg -y -loglevel error -i "$SRC/WhatsApp Image 2026-07-29 at 13.38.36 (1).jpeg" -vf "scale='min(1200,iw)':-1" -q:v 4 "$DST/02-turnover-ready.jpg"
ffmpeg -y -loglevel error -i "$SRC/WhatsApp Image 2026-07-29 at 13.38.36 (2).jpeg" -vf "scale='min(1200,iw)':-1" -q:v 4 "$DST/03-vacant-units.jpg"
ffmpeg -y -loglevel error -i "$SRC/WhatsApp Image 2026-07-29 at 13.38.36 (3).jpeg" -vf "scale='min(1200,iw)':-1" -q:v 4 "$DST/04-one-team.jpg"
ffmpeg -y -loglevel error -i "$SRC/WhatsApp Image 2026-07-29 at 13.38.37.jpeg"     -vf "scale='min(1200,iw)':-1" -q:v 4 "$DST/05-flawless-finish.jpg"
```

- [ ] **Step 3: Capture the 4 live website pages** (full-page, tall window). Some pages are long; use a tall window and bump height if the capture is cut off.

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
declare -a PAGES=(
  "property-managers:/property-managers"
  "home:/"
  "services:/services"
  "projects:/projects"
)
for pair in "${PAGES[@]}"; do
  name="${pair%%:*}"; path="${pair##*:}"
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=1440,3600 \
    --virtual-time-budget=9000 --screenshot="/tmp/fx-$name.png" \
    "https://fidanconstruction.com$path" 2>/dev/null
  echo "$name -> exit $?"
done
ls -la /tmp/fx-*.png
```
Read each `/tmp/fx-*.png` with the Read tool. Confirm each is the correct page and rendered fully (not blank / not cut off mid-content). If a page is cut off, re-capture with a taller `--window-size` height. If a page renders blank (JS-heavy), increase `--virtual-time-budget` to 15000 and retry.

- [ ] **Step 4: Downscale + compress the site shots to JPEG** into `website/`

```bash
DST="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/fidan-construction/website"
for name in property-managers home services projects; do
  ffmpeg -y -loglevel error -i "/tmp/fx-$name.png" -vf "scale=1200:-1" -q:v 5 "$DST/$name.jpg"
done
```

- [ ] **Step 5: Verify** — 5 ads + 4 site shots, sizes sane:

```bash
ROOT="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/fidan-construction"
ls -1 "$ROOT/ads" | wc -l      # expect 5
ls -1 "$ROOT/website" | wc -l  # expect 4
du -h "$ROOT"/ads/*.jpg "$ROOT"/website/*.jpg | sort -k2
```
Expected: ads ≤ ~300 KB each, site shots ≤ ~500 KB each (re-compress any over with a higher `-q:v`). Read `ads/01-demo-to-clean-finish.jpg` and `ads/05-flawless-finish.jpg` and `website/property-managers.jpg` to confirm content matches the names.

- [ ] **Step 6: Commit**

```bash
cd /Users/barandiloglu/Desktop/Projects/FrameFlow
git add public/portfolio/fidan-construction
git commit -m "feat(portfolio): add Fidan Construction media (5 creatives, 4 site shots)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Data promotion, wiring, and component stub

**Files:**
- Modify: `src/data/clients.ts` (the `fidan-construction` entry, ~line 375)
- Modify: `src/app/portfolio/[slug]/featured.ts`
- Create: `src/components/portfolio/featured/FidanConstructionPage.tsx` (stub)

**Interfaces:**
- Consumes: `FeaturedPageProps = { client: Client }`; `Client` from `@/data/clients`.
- Produces: `export function FidanConstructionPage({ client }: { client: Client })`.

- [ ] **Step 1: Promote the `clients.ts` entry.** Replace
  `{ slug: "fidan-construction",          name: "Fidan Construction",                        services: ["Ad Management", "SEO", "Website Design"] },`
  with:

```ts
  {
    slug: "fidan-construction",
    name: "Fidan Construction",
    services: ["Ad Management", "Website Design", "SEO"],
    year: "2026",
    location: "Ottawa, ON",
    runtime: "Work Order FF-012",
    scene: "EXT. THE SITE — DAY",
    synopsis:
      "A B2B repositioning for an Ottawa contractor with eight years and a thousand-plus projects. FrameFlow rebuilt the front of the business around the commercial buyer — a two-stage Meta funnel for property managers, a five-asset creative system cut before-against-after from real job sites, and a dedicated /property-managers landing page — plus local SEO that names the trades and the service radius plainly.",
    featured: true,
  },
```

- [ ] **Step 2: Create the stub** at `src/components/portfolio/featured/FidanConstructionPage.tsx`:

```tsx
"use client";

import type { Client } from "@/data/clients";

type Props = { client: Client };

export function FidanConstructionPage({ client }: Props) {
  return <main style={{ padding: 80 }}>{client.name} — case study (stub)</main>;
}
```

- [ ] **Step 3: Register in `featured.ts`** — import + map entry (align with neighbors):

```ts
import { FidanConstructionPage } from "@/components/portfolio/featured/FidanConstructionPage";
```
```ts
  "fidan-construction":             FidanConstructionPage,
```

- [ ] **Step 4: Typecheck + lint + build**

```bash
cd /Users/barandiloglu/Desktop/Projects/FrameFlow
npx tsc --noEmit && npm run lint && npm run build
```
Expected: tsc clean; lint only the known baseline (no new errors in touched files); build succeeds with `.next/server/app/portfolio/fidan-construction.html` present.

- [ ] **Step 5: Commit**

```bash
git add src/data/clients.ts src/app/portfolio/[slug]/featured.ts src/components/portfolio/featured/FidanConstructionPage.tsx
git commit -m "feat(portfolio): promote Fidan Construction to featured + wire stub route

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Shell — CSS port, work-order rail, hero + BEFORE/AFTER build-sheet toggle

Replace the stub with the shell: `.fx-page` root with the token system + font `<link>` (+ preconnects), the sticky work-order rail, the hero (headline + deck + facts + the interactive BUILD SHEET toggle), and the trades list.

**CSS source of truth:** `/Users/barandiloglu/Downloads/fidan-preview.html` (`<style>`, lines 10–173). Port its rules into `styled-jsx global`, scoped under `.fx-page`. Reproduce the `.fx-*` class rules and both `@media` blocks verbatim. DROP the `*{box-sizing}` and `body{margin:0}` reset (styled-jsx global would leak them); the prototype's `.fx-page` root rule and `.fx-page b` stay. Keep the CSS-variable block on `.fx-page` verbatim. Study `AydinCPAPage.tsx` / `ConnecTRPage.tsx` for the port pattern.

**Files:**
- Modify: `src/components/portfolio/featured/FidanConstructionPage.tsx`

**Interfaces:**
- Consumes: `getFrameNumber` from `@/data/clients`.
- Produces: the `.fx-page` root, the `BUILD`/`TRADES` consts, the `phase` toggle state.

- [ ] **Step 1: Write the shell.** Replace the stub with:

```tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { getFrameNumber } from "@/data/clients";
import type { Client } from "@/data/clients";

type Props = { client: Client };

// [row label, before value, after value]
const BUILD = [
  ["Buyer",        "Homeowner-facing",       "Property & building managers"],
  ["Paid channel", "None running",           "Two-stage Meta funnel"],
  ["Creative",     "Job photos, undeployed", "Five-asset system, one grammar"],
  ["Landing",      "Homepage only",          "/property-managers, dedicated"],
  ["Lead intake",  "Phone and email",        "Qualified form, six fields"],
] as const;

const TRADES = ["Unit Turnovers", "Water Damage", "Asbestos (O. Reg. 278/05)", "Painting", "Drywall & Plaster"] as const;

export function FidanConstructionPage({ client }: Props) {
  const frame = getFrameNumber(client); // "012"
  const wo = `FF-${frame}`;

  const [phase, setPhase] = useState<"before" | "after">("after");

  return (
    <div className="fx-page">
      <header className="fx-rail">
        <Link className="fx-back" href="/portfolio">← Portfolio</Link>
        <span className="fx-rail-mid">WORK ORDER <b>{wo}</b> · FIDAN CONSTRUCTION</span>
        <span className="fx-rail-end">OTTAWA, ON · 2026</span>
      </header>

      <section className="fx-hero">
        <div className="fx-hero-grid">
          <div>
            <p className="fx-kicker"><span className="fx-stamp">B2B</span>Ad Management · Website Design · SEO</p>
            <h1 className="fx-h1">THEY BUILD.<br />WE BUILT <em>WHAT BRINGS</em><br /><em>THE WORK IN.</em></h1>
            <p className="fx-deck"><b>Fidan Construction</b> had eight years, a thousand-plus projects and a homeowner&rsquo;s pitch. The work they wanted was commercial — property managers who buy turnovers by the building. So we rebuilt the front of the business around that buyer: <b>the funnel that reaches them</b>, <b>the creative that convinces them</b>, and <b>the page that converts them</b>.</p>
            <dl className="fx-facts">
              <div><dt>We ran</dt><dd>Ad management · Website · SEO</dd></div>
              <div><dt>We shifted</dt><dd>Residential pitch → B2B vendor</dd></div>
              <div><dt>We built</dt><dd>Funnel · 5-asset system · landing page</dd></div>
            </dl>
          </div>

          <aside className="fx-build">
            <div className="fx-build-head"><span>BUILD SHEET</span><span className="fx-build-count">5 ITEMS</span></div>
            <div className="fx-toggle">
              <button type="button" className={phase === "before" ? "on" : ""} onClick={() => setPhase("before")}>BEFORE</button>
              <button type="button" className={phase === "after" ? "on red" : ""} onClick={() => setPhase("after")}>AFTER</button>
            </div>
            <dl className="fx-build-rows">
              {BUILD.map(([row, before, after]) => (
                <div key={row}>
                  <dt>{row}</dt>
                  <dd className={phase === "after" ? "is-after" : ""}>{phase === "after" ? after : before}</dd>
                </div>
              ))}
            </dl>
            <p className="fx-build-foot">Nothing here was a redesign. The trade was already good — what was missing was a route from that work to the people who buy it in volume. That route is the deliverable.</p>
          </aside>
        </div>

        <ul className="fx-trades">
          {TRADES.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </section>

      <FontLink />
      <style jsx global>{`
        /* PORT the prototype <style> (lines 10–173) here, scoped under .fx-page.
           Drop the '*{}' + 'body{margin:0}' reset. Keep the .fx-page var block. */
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
        href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap"
      />
    </>
  );
}
```

- [ ] **Step 2: Port the prototype CSS** (lines 10–173) into the `styled-jsx global` block, scoped under `.fx-page`. Drop the `*{}` + `body{margin:0}` reset; keep every `.fx-*` rule and both `@media` blocks. (The lightbox `.fx-modal*` rules will be REPLACED with the styled version in Task 4 — you may port them now or omit them; Task 4 overwrites them regardless.)

- [ ] **Step 3: Typecheck + lint + build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```
Expected: tsc clean; only the file's expected `no-page-custom-font` warning (no `<img>` yet); no new errors; build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/portfolio/featured/FidanConstructionPage.tsx
git commit -m "feat(portfolio): Fidan shell — work-order rail, hero, build-sheet toggle

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Scope of work + The creative system (5-asset grid + styled lightbox)

Add the Scope section (3 line items), the Creative System (5-asset grid), and the styled lightbox (adapted to Fidan's ink/paper/red tokens).

**Files:**
- Modify: `src/components/portfolio/featured/FidanConstructionPage.tsx`

**Interfaces:**
- Consumes: `frame`/`wo` (Task 3).
- Produces: `CREATIVES` const, `lightbox` state + handlers + keyboard effect, the styled `.fx-modal` markup + CSS.

- [ ] **Step 1: Add imports + `CREATIVES` const.** Extend the React import to `import { useCallback, useEffect, useState } from "react";` and add near `BUILD` (display order per prototype: 02, 03, 01, 04, 05):

```tsx
const CREATIVES = [
  { src: "/portfolio/fidan-construction/ads/02-turnover-ready.jpg",      alt: "Before and after of a patched, repainted rental-unit wall and ceiling, headline 'Turnover ready in 48 hours'", hook: "Turnover speed", line: "Turnover ready in 48 hours." },
  { src: "/portfolio/fidan-construction/ads/03-vacant-units.jpg",        alt: "A vacant, sunlit rental unit with torn-up subfloor, headline 'Vacant units cost you money'",                   hook: "Vacancy math",   line: "Vacant units cost you money." },
  { src: "/portfolio/fidan-construction/ads/01-demo-to-clean-finish.jpg", alt: "Before and after of stripped basement framing and insulation, cleaned and sealed, headline 'From demo to clean finish'", hook: "Scope of work", line: "From demo to clean finish — 2 days." },
  { src: "/portfolio/fidan-construction/ads/04-one-team.jpg",            alt: "Before and after of a repaired ceiling beside finished kitchen cabinets, headline 'One team, start to finish'",   hook: "One vendor",     line: "One team, start to finish." },
  { src: "/portfolio/fidan-construction/ads/05-flawless-finish.jpg",     alt: "Before and after of a bare wall finished and painted with a window, headline 'Flawless finish, no callbacks'",    hook: "Trade quality",  line: "Flawless finish, no callbacks." },
] as const;
```

- [ ] **Step 2: Add lightbox state + handlers + keyboard effect** inside the component (after the `phase` state):

```tsx
  const [lightbox, setLightbox] = useState<number | null>(null);
  const openLightbox = useCallback((i: number) => setLightbox(i), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const stepLightbox = useCallback(
    (delta: number) => setLightbox((i) => (i === null ? i : (i + delta + CREATIVES.length) % CREATIVES.length)),
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

- [ ] **Step 3: Add the Scope + Creative markup** after the hero `</section>`:

```tsx
      <section className="fx-scope">
        <h2 className="fx-sec-head"><span>SCOPE OF WORK</span><i></i><span className="fx-sec-meta">3 LINE ITEMS</span></h2>

        <article className="fx-row"><span className="fx-row-no">01</span><div className="fx-row-main">
          <h3>Ad Management</h3><p className="fx-row-meta">META · IG + FB · OTTAWA +50KM</p>
          <p className="fx-row-body">A two-stage B2B funnel built for property managers, not homeowners. Cold lead generation on native lead forms with a higher-intent qualifying step, retargeting held back until the audience pool could actually carry it. Reviewed on a fixed cadence — creative, audience and form read together, never in isolation.</p>
        </div></article>

        <article className="fx-row"><span className="fx-row-no">02</span><div className="fx-row-main">
          <h3>Website Design</h3><p className="fx-row-meta">FIDANCONSTRUCTION.COM/PROPERTY-MANAGERS · LIVE</p>
          <p className="fx-row-body">A landing page written for one reader. Not the homepage, not the residential pitch — a dedicated B2B page that answers the property manager&rsquo;s question in the first screen and carries one offer the whole way down.</p>
        </div></article>

        <article className="fx-row"><span className="fx-row-no">03</span><div className="fx-row-main">
          <h3>SEO</h3><p className="fx-row-meta">LOCAL · OTTAWA METRO</p>
          <p className="fx-row-body">Service and geography made legible: five trades named plainly, the service radius stated, compliance and after-hours availability surfaced as text rather than buried in a brochure.</p>
        </div></article>
      </section>

      <section className="fx-creative">
        <h2 className="fx-sec-head light"><span>THE CREATIVE SYSTEM</span><i></i><span className="fx-sec-meta">5 ASSETS · ONE GRAMMAR</span></h2>
        <p className="fx-creative-intro">We set the rules and built to them. No stock, no renders — every frame is a real Fidan job, shot on site and cut <b>BEFORE</b> against <b>AFTER</b> so the proof lands before a word is read. One condensed headline, the payoff line always in red, the logo in the same place every time. Built once, extended five ways — square for feed, vertical for reels. A system the client can keep shooting into, not five one-off posts.</p>
        <div className="fx-sheet">
          {CREATIVES.map((c, i) => (
            <button className="fx-cell" key={c.src} onClick={() => openLightbox(i)}>
              <span className="fx-cell-tag">{c.hook}</span>
              <img className="fx-cell-img" src={c.src} alt={c.alt} />
              <span className="fx-cell-line">{c.line}</span>
            </button>
          ))}
        </div>
      </section>
```

- [ ] **Step 4: Add the styled lightbox modal** inside `.fx-page` (e.g. right before `<FontLink />`):

```tsx
      {lightbox !== null && (
        <div
          className="fx-modal open"
          role="dialog"
          aria-modal="true"
          aria-label={`${CREATIVES[lightbox].hook} — frame ${lightbox + 1} of ${CREATIVES.length}`}
          onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
        >
          <button className="fx-modal-nav prev" onClick={() => stepLightbox(-1)} aria-label="Previous">←</button>

          <div className="fx-modal-stage">
            <div className="fx-modal-bar top">
              <span className="fx-modal-counter">★ Frame <b>{String(lightbox + 1).padStart(2, "0")}</b> / {String(CREATIVES.length).padStart(2, "0")}</span>
              <span className="fx-modal-brand">FIDAN · {wo}</span>
              <button className="fx-modal-close" onClick={closeLightbox} aria-label="Close">×</button>
            </div>
            <div className="fx-modal-image-wrap">
              <img src={CREATIVES[lightbox].src} alt={CREATIVES[lightbox].alt} />
            </div>
            <div className="fx-modal-bar bot">
              <span className="fx-modal-slate">{CREATIVES[lightbox].hook} — {CREATIVES[lightbox].line}</span>
            </div>
          </div>

          <button className="fx-modal-nav next" onClick={() => stepLightbox(1)} aria-label="Next">→</button>
        </div>
      )}
```

- [ ] **Step 5: Replace the ported `.fx-modal*` CSS** (from the Task-3 port) with the styled-stage version in Fidan's tokens. Find the `.fx-modal` rules in the `styled-jsx global` block and replace them with:

```css
.fx-modal{position:fixed;inset:0;z-index:90;display:none;align-items:center;justify-content:center;padding:32px;background:rgba(8,8,9,.95);animation:fx-fade .22s ease-out}
.fx-modal.open{display:flex}
@keyframes fx-fade{from{opacity:0}to{opacity:1}}
.fx-modal-stage{position:relative;width:min(960px,92vw);height:min(92vh,1080px);max-height:92vh;background:var(--paper);display:flex;flex-direction:column;box-shadow:0 30px 90px rgba(0,0,0,.6);animation:fx-pop .28s cubic-bezier(0.34,1.56,0.64,1)}
@keyframes fx-pop{from{transform:scale(.96);opacity:0}to{transform:scale(1);opacity:1}}
.fx-modal-bar{flex:0 0 auto;display:flex;align-items:center;gap:12px;padding:13px 16px;font-family:"JetBrains Mono",monospace;font-weight:700;font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--grey)}
.fx-modal-bar.top{border-bottom:3px solid var(--red);justify-content:space-between}
.fx-modal-bar.bot{border-top:1px solid var(--rule);justify-content:center}
.fx-modal-counter b{color:var(--red);font-weight:700}
.fx-modal-brand{letter-spacing:.2em;color:var(--ink)}
.fx-modal-slate{letter-spacing:.08em;color:var(--ink);text-transform:none;font-weight:500}
.fx-modal-close{width:30px;height:30px;background:var(--ink);color:var(--paper);border:0;cursor:pointer;font-family:"JetBrains Mono",monospace;font-size:16px;font-weight:700;line-height:1;padding:0;display:flex;align-items:center;justify-content:center;transition:background .16s}
.fx-modal-close:hover{background:var(--red)}
.fx-modal-image-wrap{flex:1 1 auto;min-height:0;position:relative;background:var(--ink);overflow:hidden;display:flex;align-items:center;justify-content:center}
.fx-modal-image-wrap img{width:100%;height:100%;object-fit:contain;display:block}
.fx-modal-nav{position:absolute;top:50%;transform:translateY(-50%);width:54px;height:54px;background:var(--paper);color:var(--ink);border:2px solid var(--ink);cursor:pointer;font-family:"JetBrains Mono",monospace;font-size:20px;font-weight:700;line-height:1;padding:0;display:flex;align-items:center;justify-content:center;transition:transform .16s,background .16s,color .16s;z-index:2}
.fx-modal-nav:hover{transform:translateY(-50%) scale(1.06);background:var(--red);color:#fff;border-color:var(--red)}
.fx-modal-nav.prev{left:32px}.fx-modal-nav.next{right:32px}
```
(Match the file's selector-prefixing convention — check whether the ported rules use `.fx-page`-prefixed selectors or bare, and match it.)

- [ ] **Step 6: Typecheck + lint + build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```
Expected: tsc clean; no new lint errors (expected `no-img-element` on the new `<img>`s); build succeeds.

- [ ] **Step 7: Re-read the lightbox handlers** once: confirm `stepLightbox` wraps `(i + delta + 5) % 5`, the effect removes its listener + restores `body.overflow`, backdrop-click uses `e.target === e.currentTarget`.

- [ ] **Step 8: Commit**

```bash
git add src/components/portfolio/featured/FidanConstructionPage.tsx
git commit -m "feat(portfolio): Fidan scope + creative system (5 assets, styled lightbox)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: The landing page (copy + 3-step ladder + site tab-switcher)

Add the landing-page section: copy column, 3-step ladder, and the browser-chrome site window with a working tab-switcher over the 4 captured screenshots.

**Files:**
- Modify: `src/components/portfolio/featured/FidanConstructionPage.tsx`

**Interfaces:**
- Consumes: nothing new.
- Produces: `SHOTS`/`LADDER` consts, `siteTab` state.

- [ ] **Step 1: Add `SHOTS` + `LADDER` consts** near `CREATIVES`:

```tsx
const SHOTS = [
  { label: "Property Managers", path: "/property-managers", src: "/portfolio/fidan-construction/website/property-managers.jpg", ours: true,  note: "The B2B page. Offer and qualifying form above the fold, then the five trades, the three-step process, and the objections answered in order." },
  { label: "Home",             path: "/",                  src: "/portfolio/fidan-construction/website/home.jpg",             ours: false, note: "The site the campaign page lives inside — residential-facing, built for a different reader. Kept intact; we added the commercial door beside it." },
  { label: "Services",         path: "/services",          src: "/portfolio/fidan-construction/website/services.jpg",         ours: false, note: "Five trades under one vendor — the claim the whole B2B pitch rests on, stated on the client's own site." },
  { label: "Projects",         path: "/projects",          src: "/portfolio/fidan-construction/website/projects.jpg",         ours: false, note: "The proof shelf. Real completed work, which is also where the campaign creative was sourced from." },
] as const;

const LADDER = [
  { step: "01", title: "Submit the form",          note: "Six fields. Role, portfolio size, service, timeline." },
  { step: "02", title: "30-min walkthrough",       note: "On site. Free. Issues found before they are quoted." },
  { step: "03", title: "Written quote in 48 hours", note: "In writing, not a phone estimate." },
] as const;

const SITE_ROOT = "https://fidanconstruction.com";
```

- [ ] **Step 2: Add `siteTab` state** (after `lightbox` state):

```tsx
  const [siteTab, setSiteTab] = useState(0);
  const shot = SHOTS[siteTab];
  const shotUrl = "fidanconstruction.com" + (shot.path === "/" ? "" : shot.path);
```

- [ ] **Step 3: Add the landing markup** after the creative `</section>`:

```tsx
      <section className="fx-land">
        <h2 className="fx-sec-head"><span>THE LANDING PAGE</span><i></i><span className="fx-sec-meta">LIVE</span></h2>
        <div className="fx-land-grid">
          <div className="fx-land-copy">
            <p className="fx-url">fidanconstruction.com/property-managers</p>
            <p>The homepage sells to homeowners. Property managers buy differently — they are not choosing a colour, they are removing a problem from a list. So they got their own page: the trades named in plain language, the service radius stated, compliance and after-hours availability up front, and a single offer repeated until it is impossible to miss.</p>
            <p className="fx-land-note">One page, one reader, one call to action. Everything that did not serve the walkthrough was cut.</p>
          </div>
          <ol className="fx-ladder">
            {LADDER.map((l) => (
              <li key={l.step}><span className="fx-ladder-step">{l.step}</span><div><b>{l.title}</b><span>{l.note}</span></div></li>
            ))}
          </ol>
        </div>

        <figure className="fx-site">
          <div className="fx-shot-bar">
            <span className="fx-shot-dots"><i></i><i></i><i></i></span>
            <span className="fx-shot-url">{shotUrl}</span>
            {shot.ours && <span className="fx-shot-ours">BUILT BY US</span>}
            <span className="fx-shot-live">● LIVE</span>
          </div>
          <nav className="fx-site-tabs">
            {SHOTS.map((s, i) => (
              <button type="button" key={s.path} className={i === siteTab ? "on" : ""} onClick={() => setSiteTab(i)}>{s.label}</button>
            ))}
          </nav>
          <div className="fx-site-window" key={siteTab}>
            <img className="fx-site-img" src={shot.src} alt={`${shot.label} page of fidanconstruction.com, full page`} />
            <span className="fx-site-hint">scroll inside ↕</span>
          </div>
          <div className="fx-site-foot">
            <div className="fx-site-nav">
              <button type="button" onClick={() => setSiteTab((i) => (i - 1 + SHOTS.length) % SHOTS.length)} aria-label="Previous page">‹</button>
              <span>{String(siteTab + 1).padStart(2, "0")} / {String(SHOTS.length).padStart(2, "0")}</span>
              <button type="button" onClick={() => setSiteTab((i) => (i + 1) % SHOTS.length)} aria-label="Next page">›</button>
            </div>
            <a className="fx-visit" href={SITE_ROOT + shot.path} target="_blank" rel="noopener noreferrer">Visit this page <span>↗</span></a>
          </div>
          <figcaption>{shot.note}</figcaption>
        </figure>
      </section>
```
Note: the `key={siteTab}` on `.fx-site-window` resets its scroll position to top when the tab changes (replacing the prototype's `swin.scrollTop=0`).

- [ ] **Step 4: Typecheck + lint + build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```
Expected: all clean; no new lint errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/portfolio/featured/FidanConstructionPage.tsx
git commit -m "feat(portfolio): Fidan landing page — copy, ladder, site tab-switcher

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 6: Punch list + sign-off footer

**Files:**
- Modify: `src/components/portfolio/featured/FidanConstructionPage.tsx`

**Interfaces:**
- Consumes: `frame`/`wo`.
- Produces: `PUNCH` const + the punch/sign-off markup.

- [ ] **Step 1: Add `PUNCH` const** near the other data:

```tsx
const PUNCH = [
  ["Campaign architecture", "Two-stage funnel, budget split, scaling thresholds defined up front"],
  ["Audience stack",        "Property & building managers, Ottawa metro + 50 km"],
  ["Lead form",             "Higher-intent mode, six qualifying questions, routing rules"],
  ["Creative system",       "Five statics on one visual grammar, 1:1 and 9:16"],
  ["Copy bank",             "Four hooks — turnover speed, one vendor, social proof, after-hours"],
  ["Landing page",          "/property-managers — live, offer-led, one CTA"],
  ["Reporting",             "Scheduled performance reviews against the plan's own thresholds"],
] as const;
```

- [ ] **Step 2: Add the punch + sign-off markup** after the landing `</section>`:

```tsx
      <section className="fx-punch">
        <h2 className="fx-sec-head light"><span>PUNCH LIST</span><i></i><span className="fx-sec-meta">DELIVERED</span></h2>
        <ul className="fx-punch-list">
          {PUNCH.map(([label, desc]) => (
            <li key={label}><span className="fx-tick">✕</span><b>{label}</b><span>{desc}</span></li>
          ))}
        </ul>
      </section>

      <footer className="fx-signoff">
        <div className="fx-sign-grid">
          <div><p className="fx-sign-label">PREPARED BY</p><p className="fx-sign-name">FrameFlow</p></div>
          <div><p className="fx-sign-label">WORK ORDER</p><p className="fx-sign-name">{wo}</p></div>
          <div><p className="fx-sign-label">STATUS</p><p className="fx-sign-name red">Delivered</p></div>
        </div>
        <Link className="fx-sign-back" href="/portfolio">← Back to portfolio</Link>
      </footer>
```
(Note: the prototype's status stamp read "IN PROGRESS"; this ships as **Delivered** since the work is live — consistent with the "DELIVERED" punch-list header and the live landing page.)

- [ ] **Step 3: Typecheck + lint + build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```
Expected: all clean; no new lint errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/portfolio/featured/FidanConstructionPage.tsx
git commit -m "feat(portfolio): Fidan punch list + sign-off footer

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 7: Reduced-motion, responsive, final verification

**Files:**
- Modify: `src/components/portfolio/featured/FidanConstructionPage.tsx`

- [ ] **Step 1: Grep the file for real `animation:`/`transition:`/`:hover{transform:...}` declarations** so the reduced-motion overrides target selectors that exist. Confirm: the lightbox `.fx-modal`/`.fx-modal-stage` animations (`fx-fade`/`fx-pop`); `.fx-cell-img` transition + `.fx-cell:hover .fx-cell-img` transform; `.fx-modal-close`/`.fx-modal-nav` transitions; and any toggle/tab button transitions. Only disable what exists.

- [ ] **Step 2: Add a reduced-motion block** at the end of `styled-jsx global` (adjust to Step 1; match the file's prefix convention):

```css
@media (prefers-reduced-motion: reduce){
  .fx-modal,.fx-modal-stage{animation:none}
  .fx-cell-img,.fx-modal-close,.fx-modal-nav,.fx-site-nav button,.fx-visit,.fx-toggle button,.fx-site-tabs button{transition:none}
  .fx-cell:hover .fx-cell-img{transform:none}
  .fx-modal-nav:hover{transform:translateY(-50%)}
}
```

- [ ] **Step 3: Typecheck + lint**

```bash
npx tsc --noEmit && npm run lint
```
Expected: clean, no new errors.

- [ ] **Step 4: Responsive + interaction check** — `npm run dev` (background), load `http://localhost:<port>/portfolio/fidan-construction` and:
  - Resize to ~900px and ~520px: hero grid stacks, creative sheet → 2-col then 1-col, punch list → 1-col, rail mid label hides at ≤940px.
  - Click the build-sheet BEFORE/AFTER toggle → all 5 rows flip; click a creative → styled lightbox opens, ←/→ wrap, Esc closes; click the site tabs → screenshot + URL + caption + "BUILT BY US" (only on Property Managers) update, prev/next wrap, window scrolls internally.
  - Enable OS "Reduce motion" and reload: lightbox fade/pop off, hover scale off.
  Stop the dev server afterward.

- [ ] **Step 5: Full production build**

```bash
npm run build
```
Expected: succeeds; `/portfolio/fidan-construction` in the generated static params.

- [ ] **Step 6: Final visual pass** — headless Chrome screenshot of the page (full length) + dump the `/portfolio` index DOM to confirm the Fidan row reads `012 · Fidan Construction · Now showing · AD MANAGEMENT · WEBSITE DESIGN · SEO`. Confirm the build sheet, creative grid, and site window render; no console errors. (The three interactions are confirmed by code review + the dev-server check in Step 4, since headless CLI can't click.)

- [ ] **Step 7: Commit**

```bash
git add src/components/portfolio/featured/FidanConstructionPage.tsx
git commit -m "feat(portfolio): Fidan reduced-motion guard, responsive polish

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Self-Review

**Spec coverage:**
- Integration (new component, featured.ts, clients.ts promote + service reorder, frame 012) → Task 2 ✓
- Work-order voice, NO loader/marquee → Tasks 3–6 (no LoadingTransition/marquee anywhere) ✓
- 7-section flow (rail/hero+build-sheet / scope+creative / landing / punch+signoff) → Tasks 3, 4, 5, 6 ✓
- Three interactions (build-sheet toggle / lightbox / site tabs) → Tasks 3, 4, 5 ✓
- Styled lightbox adapted to ink/paper/red → Task 4 ✓
- 5 creatives (verified mapping) + 4 captured site shots → Task 1 ✓
- Reduced-motion + responsive → Task 7 ✓
- Success criteria (route, index frame 012 + pill + services, toggle/tabs/lightbox work, build clean) → Tasks 2, 4, 5, 7 ✓

**Placeholder scan:** No "TBD/handle edge cases". Task 1's site capture (view-and-confirm, re-capture if cut off) and Task 7's reduced-motion grep-first are adaptive-by-design with explicit instructions — not vague. The one intentional copy change (status "IN PROGRESS" → "Delivered") is flagged with rationale.

**Type consistency:** `BUILD`/`TRADES`/`CREATIVES`/`SHOTS`/`LADDER`/`PUNCH` shapes match their consumers; `phase`/`lightbox`/`siteTab` state and `openLightbox`/`closeLightbox`/`stepLightbox` names consistent across Tasks 3–5; `getFrameNumber` → `frame` ("012") → `wo` ("FF-012") used in rail, lightbox brand, and sign-off.
