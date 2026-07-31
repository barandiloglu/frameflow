# MinAuto Featured Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bespoke, production-grade featured case-study page for MinAuto at `/portfolio/minauto` — an OMVIC-registered used-car dealership whose identity is built on a checkmark, following that mark as it leaves the logo and becomes a hang-tag, a proof-bullet, a seal and a business card.

**Architecture:** One self-contained client component (`MinAutoPage.tsx`) with scoped `styled-jsx`, its own navy rail + sign-off (no global Navbar/Footer), reusing `LoadingTransition` and a **set-scoped** styled lightbox. Assets: 4 lockups + a real client spec sheet, 2 listing cards for an evolution toggle, a rendered business card, 3 carousels and 6 listings. Stacked on `feat/aydin-cpa-case-study`.

**Tech Stack:** Next.js 16.2.1 (App Router), React 19.2.4, TypeScript, styled-jsx, ffmpeg + macOS `qlmanage` (asset prep).

## Global Constraints

- **Read `node_modules/next/dist/docs/` before writing Next-specific code** — this Next.js has breaking changes vs. training data (per AGENTS.md).
- Featured pages are `"use client"`, fully bespoke, **no global `<Navbar>`/`<Footer>`**; this page **does** use `LoadingTransition`.
- **All content real.** Every asset shipped exists in the client folder. The prototype's `card/01-raw.jpg` does NOT exist and no raw/finished toggle may be built. Do not invent hang-tag text, certifications, or trim levels.
- Palette: navy `#123645`, orange `#DC4C14`, surface `#F4F4F4`, paper `#FFF`, ink `#2A2A2A`, mute `#7B8288`, rule `rgba(18,54,69,.14)`.
- Type: **Montserrat** (700;800) + **Barlow Condensed** (600;700) + **Source Sans 3** (400;500;600) via Google Fonts `<link>` with two `<link rel="preconnect">` (incl. `crossOrigin=""` on gstatic). The client's specified face is **Gotham Bold**, unlicensed for web here — Montserrat stands in and the page says so in plain text.
- JSX text must escape apostrophes/quotes (`&rsquo;` `&amp;`) for `react/no-unescaped-entities`. Data in plain JS string literals must NOT be escaped.
- **`prefers-reduced-motion` must disable** the lightbox fade/pop, card hover transforms, and button transitions. Target only selectors that exist.
- **Lightbox sizing (hard requirement, regression guard):** the modal stage must carry a **definite `height`**, with the image at `width:100%;height:100%;object-fit:contain`. A `max-height`-only stage resolves to `auto`, the image's percentage height is ignored, and the slide renders at natural size and is clipped — this bug shipped on IYN and was user-reported. Slides are 1080×1350 portrait. Applies at **every** breakpoint.
- **The lightbox is SET-SCOPED.** ←/→ wrap *within* the open set only; the counter reads `NN / <set length>`. Carousels have a meaningful swipe order — stepping across sets would destroy it.
- Frame number derives from `getFrameNumber(client)` (roster index 17 → `"018"`) — never hardcoded.
- No unit-test framework; verification per task = `npx tsc --noEmit` + `npm run lint` (no NEW errors vs the known baseline: **6 pre-existing errors** in unrelated files — ThemeProvider/ThemeToggle/MarkScene/admin-analytics — plus `no-page-custom-font` / `no-img-element` warnings every featured page carries) + `npm run build`. Portfolio pages client-render — verify routes via `npm run build`, not curl.
- Shell note: some sandboxed shells reset `PATH`; prefix asset/build commands with
  `export PATH="/usr/bin:/bin:/usr/local/bin:/opt/homebrew/bin:$PATH"`.
- **Two source paths contain stray spaces and MUST be quoted exactly:**
  `Posts/2018 Honda Civic/ Civic.png` (leading space in the filename) and
  `Posts/July 6-12/Ford Escape /` (trailing space in the directory).

---

### Task 1: Media assets (logo, cards, carousels, listings)

Place everything under `public/portfolio/minauto/`. No app code.

**Files:** creates 32 assets (5 logo, 3 card, 11 carousel slides, 13 listing slides) across `logo/`, `card/`, `feed/{omvic,checks,coachmen}/`, `listings/{kia-soul,infiniti-q50,subaru-forester,toyota-corolla,honda-civic,ford-escape}/`.

All sources are under `/Users/barandiloglu/Downloads/Min Auto/`. **The mapping below was verified by a human viewing every file — do not re-derive it.**

- [ ] **Step 1: Create directories**

```bash
export PATH="/usr/bin:/bin:/usr/local/bin:/opt/homebrew/bin:$PATH"
R="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/minauto"
mkdir -p "$R"/logo "$R"/card "$R"/feed/{omvic,checks,coachmen} \
         "$R"/listings/{kia-soul,infiniti-q50,subaru-forester,toyota-corolla,honda-civic,ford-escape}
```

- [ ] **Step 2: Logo lockups + the real spec sheet** (sources are 2656×1600 PNG with alpha; preserve alpha, do not flatten)

```bash
S="/Users/barandiloglu/Downloads/Min Auto"
R="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/minauto"
cp "$S/Logo/Main Logo.png"              "$R/logo/lockup-primary.png"
cp "$S/Logo/Second Logo.png"            "$R/logo/lockup-horizontal.png"
cp "$S/Logo/Third Logo.png"             "$R/logo/lockup-compact.png"
cp "$S/Logo/Main Logo White.png"        "$R/logo/lockup-knockout.png"
cp "$S/Logo/Logo Colours and Fonts.png" "$R/logo/spec-sheet.png"
```
If `cp` fails with "Operation not permitted" (macOS xattrs on this machine), seed each
destination with the `Write` tool then re-run, or use `ffmpeg -i src -c copy dst`.
**Verify alpha survived:** `ffprobe` each lockup — `pix_fmt` must remain `rgba`.

- [ ] **Step 3: The two evolution cards**

```bash
S="/Users/barandiloglu/Downloads/Min Auto"
R="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/minauto"
ffmpeg -y -loglevel error -i "$S/Posts/Mazda/2.png"        -q:v 4 "$R/card/launch-mazda-cx5.jpg"
ffmpeg -y -loglevel error -i "$S/Posts/July 13-19/2.png"   -q:v 4 "$R/card/current-ford-interceptor.jpg"
```

- [ ] **Step 4: Render the business card from PDF.** `sips` outputs only 270×162 — too small. Use Quick Look at 1600px:

```bash
S="/Users/barandiloglu/Downloads/Min Auto"
R="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/minauto"
qlmanage -t -s 1600 -o /tmp/mabiz "$S/Business Card/Min Auto Print.pdf" >/dev/null 2>&1
ffmpeg -y -loglevel error -i "/tmp/mabiz/Min Auto Print.pdf.png" -q:v 3 "$R/card/business-card.jpg"
```
Expected result: 1600×960, a white card with the horizontal lockup top-left, "Serdar
Inan / Owner / (647)970-2678 / serdarinan@minauto.ca", "www.minauto.ca / 1525 Mosley
Street, Wasaga Beach, ON, L9Z 2B7", and a large orange checkmark bleeding off the
right edge. **Read it and confirm the text is legible and the tick is not cropped
away.** If Quick Look produces nothing, report BLOCKED rather than substituting an image.

- [ ] **Step 5: Carousels** (order is the swipe order and is load-bearing)

```bash
S="/Users/barandiloglu/Downloads/Min Auto/Posts"
R="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/minauto"
q(){ ffmpeg -y -loglevel error -i "$1" -q:v 4 "$2"; }
q "$S/What is OMVIC/11.png" "$R/feed/omvic/01.jpg"
q "$S/What is OMVIC/12.png" "$R/feed/omvic/02.jpg"
q "$S/What is OMVIC/13.png" "$R/feed/omvic/03.jpg"
q "$S/3 Things to Check First/14.png" "$R/feed/checks/01.jpg"
q "$S/3 Things to Check First/15.png" "$R/feed/checks/02.jpg"
q "$S/3 Things to Check First/16.png" "$R/feed/checks/03.jpg"
q "$S/3 Things to Check First/17.png" "$R/feed/checks/04.jpg"
q "$S/3 Things to Check First/18.png" "$R/feed/checks/05.jpg"
q "$S/Coachman Viking/slide1_hero.png"  "$R/feed/coachmen/01.jpg"
q "$S/Coachman Viking/slide2_proof.png" "$R/feed/coachmen/02.jpg"
q "$S/Coachman Viking/slide3_cta.png"   "$R/feed/coachmen/03.jpg"
```

- [ ] **Step 6: Listings.** Note the quoted paths with stray spaces.

```bash
S="/Users/barandiloglu/Downloads/Min Auto/Posts"
R="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/minauto/listings"
q(){ ffmpeg -y -loglevel error -i "$1" -q:v 4 "$2"; }
q "$S/Kia/4.png"                       "$R/kia-soul/01.jpg"
q "$S/Kia/5.png"                       "$R/kia-soul/02.jpg"
q "$S/Infiniti Q50/6.png"              "$R/infiniti-q50/01.jpg"
q "$S/Infiniti Q50/7.png"              "$R/infiniti-q50/02.jpg"
q "$S/Infiniti Q50/Sold.png"           "$R/infiniti-q50/03.jpg"
q "$S/Subaru Forester/8.png"           "$R/subaru-forester/01.jpg"
q "$S/Subaru Forester/9.png"           "$R/subaru-forester/02.jpg"
q "$S/Toyota Corolla/12.png"           "$R/toyota-corolla/01.jpg"
q "$S/Toyota Corolla/13.png"           "$R/toyota-corolla/02.jpg"
q "$S/2018 Honda Civic/ Civic.png"     "$R/honda-civic/01.jpg"
q "$S/2018 Honda Civic/Civic 2.png"    "$R/honda-civic/02.jpg"
q "$S/July 6-12/Ford Escape /47.png"   "$R/ford-escape/01.jpg"
q "$S/July 6-12/Ford Escape /48.png"   "$R/ford-escape/02.jpg"
```

- [ ] **Step 7: Verify**

```bash
R="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/minauto"
find "$R" -type f | wc -l          # expect 32
find "$R" -type f -size +400k      # expect no output
for f in "$R"/logo/lockup-*.png; do echo "$f $(ffprobe -v error -select_streams v:0 -show_entries stream=pix_fmt -of csv=p=0 "$f")"; done  # all rgba
```
**Read these and confirm content matches the filename:**
- `logo/lockup-knockout.png` — all-white MINAUTO car+tick lockup
- `logo/spec-sheet.png` — navy `#123645` band, orange `#DC4C14` band, "Font: Gotham Bold"
- `card/launch-mazda-cx5.jpg` — "MAZDA CX-5 FOR SALE", $9,950, logo at the **bottom**, no seal, no Carfax badge
- `card/current-ford-interceptor.jpg` — "FORD POLICE INTERCEPTOR UTILITY", logo at the **top**, struck `$18,950` above `$17,950`, PRICE GUARANTEE roundel, CARFAX badge
- `feed/omvic/01.jpg` ("What is OMVIC.") and `feed/omvic/03.jpg` ("We're OMVIC-registered.")
- `feed/checks/01.jpg` — must read **"3 THINGS TO KNOW FIRST"** (the source *folder* says "Check", the artwork says "Know" — the artwork is correct)
- `feed/coachmen/02.jpg` — the CONDITION / SPECS proof slide with orange ✓ bullets
- `listings/infiniti-q50/03.jpg` — the SOLD stamp
If any mismatch, STOP and report.

- [ ] **Step 8: Commit**

```bash
cd /Users/barandiloglu/Desktop/Projects/FrameFlow
git add public/portfolio/minauto
git commit -m "feat(portfolio): add MinAuto media (lockups, spec sheet, cards, carousels, listings)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Data promotion, wiring, and component stub

**Files:**
- Modify: `src/data/clients.ts` (the `minauto` entry, ~line 414)
- Modify: `src/app/portfolio/[slug]/featured.ts`
- Create: `src/components/portfolio/featured/MinAutoPage.tsx` (stub)

**Interfaces:**
- Produces: `export function MinAutoPage({ client }: { client: Client })`.

- [ ] **Step 1: Promote the `clients.ts` entry.** Replace
  `{ slug: "minauto",                     name: "MinAuto",                                   services: ["Logo", "Social Media"] },`
  with:

```ts
  {
    slug: "minauto",
    name: "MinAuto",
    services: ["Logo", "Branding", "Social Media"],
    year: "2026",
    location: "Wasaga Beach, ON",
    runtime: "Ongoing",
    scene: "EXT. 1525 MOSLEY ST — DAY",
    synopsis:
      "Identity and social for an OMVIC-registered used-car lot in Wasaga Beach. A used-car buyer is not shopping, they are checking — so the logo is a check, and the tick that makes it becomes the hang-tag, the proof-bullet and the seal on everything after it. Built from nothing: four lockups, a colour and type spec, a listing-card template the dealership runs itself, and two channels started from zero.",
    featured: true,
  },
```
`Branding` is already a member of the `Service` union — no type change needed.
**Replace in place.** The array index (17) determines the frame number; do not move,
add or remove any roster entry. After editing, verify `minauto` is still index 17.

- [ ] **Step 2: Create the stub** at `src/components/portfolio/featured/MinAutoPage.tsx`:

```tsx
"use client";

import type { Client } from "@/data/clients";

type Props = { client: Client };

export function MinAutoPage({ client }: Props) {
  return <main style={{ padding: 80 }}>{client.name} — case study (stub)</main>;
}
```

- [ ] **Step 3: Register in `featured.ts`** — import + map entry, matching sibling alignment:

```ts
import { MinAutoPage } from "@/components/portfolio/featured/MinAutoPage";
```
```ts
  "minauto":                       MinAutoPage,
```

- [ ] **Step 4: Typecheck, lint, build**

```bash
cd /Users/barandiloglu/Desktop/Projects/FrameFlow
npx tsc --noEmit && npm run lint && npm run build
```
Expected: tsc clean; lint at baseline; build emits `.next/server/app/portfolio/minauto.html`.

- [ ] **Step 5: Commit**

```bash
git add src/data/clients.ts src/app/portfolio/[slug]/featured.ts src/components/portfolio/featured/MinAutoPage.tsx
git commit -m "feat(portfolio): promote MinAuto to featured + wire stub route

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Shell — CSS port, LoadingTransition, navy rail, hero

**CSS source of truth:** `/Users/barandiloglu/Downloads/minauto-preview.html` (`<style>`, lines 10–118). Port into `styled-jsx global`. Reproduce the `.ma-*` rules and both `@media` blocks verbatim. **DROP** the `*{box-sizing:border-box}` and `body{margin:0}` reset (styled-jsx global would leak it site-wide). **KEEP** the `.ma-page` CSS-variable block verbatim. The `.ma-lock*`, `.ma-chip*`, `.ma-card*`, `.ma-zero*` rules are used by Tasks 4–6 — port them now even though their markup lands later.

**Files:**
- Modify: `src/components/portfolio/featured/MinAutoPage.tsx`

**Interfaces:**
- Consumes: `LoadingTransition` — props `{ frameNumber, clientName, scope, location?, year? }`; `getFrameNumber`.
- Produces: the `.ma-page` root.

- [ ] **Step 1: Write the shell.** Replace the stub with:

```tsx
"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getFrameNumber } from "@/data/clients";
import type { Client } from "@/data/clients";
import { LoadingTransition } from "@/components/portfolio/LoadingTransition";

type Props = { client: Client };

export function MinAutoPage({ client }: Props) {
  const frame = getFrameNumber(client); // "018"

  return (
    <div className="ma-page">
      <LoadingTransition
        frameNumber={frame}
        clientName={client.name}
        scope={["Logo", "Brand System", "Social"]}
        location="Wasaga Beach, ON"
        year={client.year}
      />

      <header className="ma-rail">
        <Link className="ma-back" href="/portfolio">← Portfolio</Link>
        <span className="ma-rail-mid">MinAuto · Wasaga Beach, ON</span>
        <span className="ma-rail-end">OMVIC Registered · Reel {frame}</span>
      </header>

      <section className="ma-hero">
        <div className="ma-hero-inner">
          <div>
            <p className="ma-kicker">Logo · Brand System · Social Media</p>
            <h1 className="ma-h1">THE LOGO IS A CHECK.<br /><em>SO IS EVERYTHING AFTER IT.</em></h1>
            <p className="ma-deck"><b>MinAuto</b> sells certified pre-owned stock out of a lot on Mosley Street in Wasaga Beach, OMVIC registered. We built the identity around the one thing that decides a used-car sale — whether the car passed. The tick that makes the logo does not stay in it: it becomes the corner tag on a listing, the bullet on every proof point, and the whole right-hand side of the business card.</p>
            <p className="ma-tagline">&ldquo;Certified Pre-Owned. Driven by Trust.&rdquo;</p>
          </div>
          <div className="ma-hero-mark">
            <img className="ma-hero-logo" src="/portfolio/minauto/logo/lockup-knockout.png" alt="MinAuto logo in white" />
          </div>
        </div>
      </section>

      <FontLink />
      <style jsx global>{`
        /* PORT the prototype <style> (lines 10–118) here.
           Drop the '*{}' + 'body{margin:0}' reset. Keep the .ma-page var block. */
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
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Source+Sans+3:wght@400;500;600&family=Barlow+Condensed:wght@600;700&display=swap"
      />
    </>
  );
}
```
The hero deck differs from the prototype's on purpose — the prototype claimed the tick
"becomes the hang-tag on every listing", which overstates it. Use the text above verbatim.
`useCallback`/`useEffect`/`useState` are imported for Tasks 5–6; if lint flags them as
unused now, leave them.

- [ ] **Step 2: Port the prototype CSS** (lines 10–118) per the rules above.

- [ ] **Step 3: Typecheck, lint, build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/components/portfolio/featured/MinAutoPage.tsx
git commit -m "feat(portfolio): MinAuto shell — navy rail, hero, loading transition

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Section 01 — The Mark (lockups + spec sheet + swatches)

**Files:**
- Modify: `src/components/portfolio/featured/MinAutoPage.tsx`

**Interfaces:**
- Produces: `LOCKUPS`, `SWATCHES` consts and the `.ma-mark` markup.

- [ ] **Step 1: Add the consts** at module scope (after `type Props`):

```tsx
const LOCKUPS = [
  { id: "L.01", name: "Primary",    use: "Stacked. Signage, profile pictures, anything square.", src: "/portfolio/minauto/logo/lockup-primary.png",    dark: false },
  { id: "L.02", name: "Horizontal", use: "Wide lockup. Website header, email signature, banners.", src: "/portfolio/minauto/logo/lockup-horizontal.png", dark: false },
  { id: "L.03", name: "Compact",    use: "Two-line wordmark beside the mark. Tight spaces, print.", src: "/portfolio/minauto/logo/lockup-compact.png",   dark: false },
  { id: "L.04", name: "Knockout",   use: "Reversed for navy and photographic backgrounds.", src: "/portfolio/minauto/logo/lockup-knockout.png",   dark: true  },
] as const;

/* Two brand colours come from the client's own spec sheet. Surface is a neutral
   FrameFlow added for layout — labelled as such so the panel does not contradict
   the sheet, which specifies two colours. */
const SWATCHES = [
  { name: "Trust Navy",    hex: "#123645", role: "Foundation. Every frame sits on it.",       light: false },
  { name: "Safety Orange", hex: "#DC4C14", role: "The check, the tag, the price. Action only.", light: false },
  { name: "Surface",       hex: "#F4F4F4", role: "Neutral. Not a brand colour — breathing room between proof points.", light: true },
] as const;
```

- [ ] **Step 2: Add the section markup** after the hero `</section>`:

```tsx
      <section className="ma-mark">
        <h2 className="ma-sec"><span className="ma-sec-no">01</span><span className="ma-sec-name">The Mark</span><i></i><span className="ma-sec-meta">4 LOCKUPS</span></h2>
        <p className="ma-lead">A used-car buyer is not shopping — they are checking. So the logo is a check.</p>
        <p className="ma-body">The car front is drawn flat and calm; the tick sits over it in safety orange, the one colour that means <i>go</i> on a work site. It reads at signage size and it survives at favicon size, because the tick alone is already the brand. The wordmark splits the same way the business does — <b>MIN</b> in orange, the part that is theirs; <b>AUTO</b> in navy, the part that is the category.</p>

        <div className="ma-lockups">
          {LOCKUPS.map((l) => (
            <figure className={`ma-lock${l.dark ? " dark" : ""}`} key={l.id}>
              <span className="ma-lock-id">{l.id}</span>
              <div className="ma-lock-stage">
                <img className="ma-lock-img" src={l.src} alt={`MinAuto ${l.name} logo lockup`} loading="lazy" />
              </div>
              <figcaption><b>{l.name}</b><span>{l.use}</span></figcaption>
            </figure>
          ))}
        </div>

        <div className="ma-spec">
          <div className="ma-swatches">
            {SWATCHES.map((s) => (
              <div className={`ma-chip${s.light ? " light" : ""}`} style={{ background: s.hex }} key={s.name}>
                <span className="ma-chip-hex">{s.hex}</span>
                <span className="ma-chip-name">{s.name}</span>
                <span className="ma-chip-role">{s.role}</span>
              </div>
            ))}
          </div>
          <figure className="ma-specsheet">
            <img className="ma-specsheet-img" src="/portfolio/minauto/logo/spec-sheet.png" alt="MinAuto colour and type specification sheet" loading="lazy" />
            <figcaption>The sheet the client got. Two colours, one typeface — <b>Gotham Bold</b>. This page is set in Montserrat, because Gotham is not licensed for the web here.</figcaption>
          </figure>
        </div>
      </section>
```

- [ ] **Step 3: Typecheck, lint, build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/components/portfolio/featured/MinAutoPage.tsx
git commit -m "feat(portfolio): MinAuto section 01 — lockups, spec sheet, swatches

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: Section 02 — The Card (evolution toggle + business card)

Replaces the prototype's impossible raw⇄finished toggle with a real launch⇄current comparison.

**Files:**
- Modify: `src/components/portfolio/featured/MinAutoPage.tsx`

**Interfaces:**
- Consumes: `useState`.
- Produces: `CARDS` const, `cardView` state, and the `.ma-card-sec` markup.

- [ ] **Step 1: Add the `CARDS` const** after `SWATCHES`:

```tsx
const CARDS = {
  launch: {
    label: "Launch card",
    src: "/portfolio/minauto/card/launch-mazda-cx5.jpg",
    alt: "The launch MinAuto listing card — Mazda CX-5, orange price pill, spec strip, logo at the bottom",
    cap: "2015 Mazda CX-5 · 180,945 km · $9,950 — the first template.",
  },
  current: {
    label: "Current card",
    src: "/portfolio/minauto/card/current-ford-interceptor.jpg",
    alt: "The current MinAuto listing card — Ford Police Interceptor Utility with a struck-through old price, price-guarantee seal and Carfax badge",
    cap: "2022 Ford Police Interceptor Utility · 152,058 km · $18,950 → $17,950.",
  },
} as const;
```

- [ ] **Step 2: Add the state** inside the component (after `frame`):

```tsx
  const [cardView, setCardView] = useState<"launch" | "current">("current");
```

- [ ] **Step 3: Add the section markup** after the `.ma-mark` section:

```tsx
      <section className="ma-card-sec">
        <h2 className="ma-sec light"><span className="ma-sec-no">02</span><span className="ma-sec-name">The Card</span><i></i><span className="ma-sec-meta">TEMPLATE SYSTEM</span></h2>
        <div className="ma-card-grid">
          <div>
            <p className="ma-lead light">The mark leaves the logo.</p>
            <p className="ma-body light">Every listing starts as a phone photo on the lot. The template does the rest: the vehicle name across the top, the price in an orange pill because the price is the action, and a spec strip along the bottom carrying model, mileage and fuel. Same moves every time — the dealership shoots a car, drops it in, and the post is on brand before anyone has thought about design.</p>
            <p className="ma-body light">Then it got sharper in use. The current card moves the logo up out of the photograph, strikes the old price through instead of quietly replacing it, and adds two pieces of proof the first version did not have: a price-guarantee seal and a Carfax badge. Same skeleton, more evidence.</p>
            <p className="ma-note">Tap the tabs. Launch card ⇄ current card.</p>
          </div>
          <figure className="ma-card">
            <div className="ma-card-toggle">
              <button type="button" className={cardView === "launch" ? "on" : ""} onClick={() => setCardView("launch")} aria-pressed={cardView === "launch"}>{CARDS.launch.label}</button>
              <button type="button" className={cardView === "current" ? "on" : ""} onClick={() => setCardView("current")} aria-pressed={cardView === "current"}>{CARDS.current.label}</button>
            </div>
            <img className="ma-card-img" src={CARDS[cardView].src} alt={CARDS[cardView].alt} />
            <figcaption>{CARDS[cardView].cap}</figcaption>
          </figure>
        </div>

        <figure className="ma-bizcard">
          <img className="ma-bizcard-img" src="/portfolio/minauto/card/business-card.jpg" alt="MinAuto business card — horizontal lockup, owner contact details, and an oversized orange checkmark bleeding off the right edge" loading="lazy" />
          <figcaption>And then it stops being a logo element altogether. On the card the tick is the artwork — full height, bleeding off the right edge, with the contact details set quietly beside it. The same shape is the ✓ bullet on every proof point in the carousels below.</figcaption>
        </figure>
      </section>
```

- [ ] **Step 4: Add the business-card CSS** (new; not in the prototype) at the end of the `styled-jsx` block, before any media queries:

```css
.ma-bizcard{max-width:1160px;margin:56px auto 0}
.ma-bizcard-img{width:100%;height:auto;display:block;border:1px solid rgba(255,255,255,.14)}
.ma-bizcard figcaption{max-width:64ch;margin-top:16px;font-size:15px;line-height:1.7;color:rgba(255,255,255,.76);border-left:3px solid var(--orange);padding-left:14px}
```

- [ ] **Step 5: Typecheck, lint, build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```

- [ ] **Step 6: Commit**

```bash
git add src/components/portfolio/featured/MinAutoPage.tsx
git commit -m "feat(portfolio): MinAuto section 02 — card evolution toggle, business card

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 6: Section 03 — The Feed (carousels + listings, set-scoped lightbox)

The social work the prototype omitted entirely. Nine sets: 3 carousels + 6 listings.

**Files:**
- Modify: `src/components/portfolio/featured/MinAutoPage.tsx`

**Interfaces:**
- Consumes: `useState`, `useEffect`, `useCallback`.
- Produces: `SETS` const, lightbox state/handlers, `.ma-feed` markup, and all `.ma-feed*` / `.ma-modal*` CSS (none of it exists in the prototype).

- [ ] **Step 1: Add the `SETS` const** after `CARDS`. Slide order is the swipe order — do not reorder.

```tsx
const SETS = [
  {
    id: "C.01", kind: "Carousel", title: "What is OMVIC", meta: "3 slides",
    note: "Ontario's regulator, explained in plain English, then turned into the reason to buy here. Slide three is all orange ticks — the logo doing argument duty.",
    cover: "/portfolio/minauto/feed/omvic/01.jpg",
    slides: [
      { src: "/portfolio/minauto/feed/omvic/01.jpg", alt: "Carousel slide — “What is OMVIC.” on navy with a large orange question mark" },
      { src: "/portfolio/minauto/feed/omvic/02.jpg", alt: "Carousel slide — OMVIC defined, with a callout reading “No OMVIC = no legal protection”" },
      { src: "/portfolio/minauto/feed/omvic/03.jpg", alt: "Carousel slide — “We're OMVIC-registered.” on orange with three ticked benefits and a call to action" },
    ],
  },
  {
    id: "C.02", kind: "Carousel", title: "3 Things to Know First", meta: "5 slides",
    note: "Teach, then close. Three checks a buyer should run on any used car — and a last slide pointing out that MinAuto has already run them.",
    cover: "/portfolio/minauto/feed/checks/01.jpg",
    slides: [
      { src: "/portfolio/minauto/feed/checks/01.jpg", alt: "Carousel cover — “3 Things to Know First” in white on orange" },
      { src: "/portfolio/minauto/feed/checks/02.jpg", alt: "Carousel slide 01 — “Run the VIN. Every time.”" },
      { src: "/portfolio/minauto/feed/checks/03.jpg", alt: "Carousel slide 02 — “Ask for the service records.”" },
      { src: "/portfolio/minauto/feed/checks/04.jpg", alt: "Carousel slide 03 — “Test drive like you mean it.”" },
      { src: "/portfolio/minauto/feed/checks/05.jpg", alt: "Closing slide on navy — “Every MinAuto car is already certified.”" },
    ],
  },
  {
    id: "C.03", kind: "Carousel", title: "Coachmen Viking 17BHS", meta: "3 slides",
    note: "The template stretched to something that is not a car. Hero, then a two-column condition and specs slide built entirely from ticks, then a booking call to action.",
    cover: "/portfolio/minauto/feed/coachmen/01.jpg",
    slides: [
      { src: "/portfolio/minauto/feed/coachmen/01.jpg", alt: "Travel trailer listing hero — Coachmen Viking 17BHS, $17,950, with an “Unused 2022” corner tag" },
      { src: "/portfolio/minauto/feed/coachmen/02.jpg", alt: "Proof slide — “Never camped in. Brand-new condition.” over ticked condition and specification columns" },
      { src: "/portfolio/minauto/feed/coachmen/03.jpg", alt: "Call-to-action slide — “Yours for the summer of 2026.” with a Book a Viewing button and the lot address" },
    ],
  },
  {
    id: "V.01", kind: "Listing", title: "Kia Soul", meta: "2019 · $7,450",
    note: "Launch-era template: name and price up top, spec strip below, logo at the foot.",
    cover: "/portfolio/minauto/listings/kia-soul/01.jpg",
    slides: [
      { src: "/portfolio/minauto/listings/kia-soul/01.jpg", alt: "Kia Soul listing card — 2019, 174,803 km, $7,450" },
      { src: "/portfolio/minauto/listings/kia-soul/02.jpg", alt: "Kia Soul detail collage — exterior angles and interior close-ups" },
    ],
  },
  {
    id: "V.02", kind: "Listing", title: "Infiniti Q50", meta: "2015 · sold",
    note: "The only three-slide listing, because it earned a third state. Same card, SOLD across it.",
    cover: "/portfolio/minauto/listings/infiniti-q50/01.jpg",
    slides: [
      { src: "/portfolio/minauto/listings/infiniti-q50/01.jpg", alt: "Infiniti Q50 listing card — 2015, 124,421 km, $10,450" },
      { src: "/portfolio/minauto/listings/infiniti-q50/02.jpg", alt: "Infiniti Q50 detail collage — exterior angles and interior close-ups" },
      { src: "/portfolio/minauto/listings/infiniti-q50/03.jpg", alt: "The same Infiniti Q50 card with a diagonal orange SOLD banner across it" },
    ],
  },
  {
    id: "V.03", kind: "Listing", title: "Subaru Forester", meta: "2025 · $24,950",
    note: "Newest stock on the lot, and the top of the price range the template has to carry.",
    cover: "/portfolio/minauto/listings/subaru-forester/01.jpg",
    slides: [
      { src: "/portfolio/minauto/listings/subaru-forester/01.jpg", alt: "Subaru Forester listing card — 2025, 25,911 km, $24,950" },
      { src: "/portfolio/minauto/listings/subaru-forester/02.jpg", alt: "Subaru Forester detail collage — exterior angles and interior close-ups" },
    ],
  },
  {
    id: "V.04", kind: "Listing", title: "Toyota Corolla", meta: "2022 · $17,450",
    note: "Where the wordmark moved to the top of the frame and stayed there.",
    cover: "/portfolio/minauto/listings/toyota-corolla/01.jpg",
    slides: [
      { src: "/portfolio/minauto/listings/toyota-corolla/01.jpg", alt: "Toyota Corolla listing card — 2022, 140,049 km, $17,450" },
      { src: "/portfolio/minauto/listings/toyota-corolla/02.jpg", alt: "Toyota Corolla detail collage — exterior angles and engine bay" },
    ],
  },
  {
    id: "V.05", kind: "Listing", title: "Honda Civic", meta: "2018 · $15,950 → $14,950",
    note: "First outing for the corner ribbon and the struck-through price.",
    cover: "/portfolio/minauto/listings/honda-civic/01.jpg",
    slides: [
      { src: "/portfolio/minauto/listings/honda-civic/01.jpg", alt: "Honda Civic listing card — 2018, with a Discount corner ribbon and the old price struck through" },
      { src: "/portfolio/minauto/listings/honda-civic/02.jpg", alt: "Honda Civic detail collage — exterior angles, boot and wheels" },
    ],
  },
  {
    id: "V.06", kind: "Listing", title: "Ford Escape SE", meta: "2014 · $10,950 → $9,950",
    note: "The mature card in routine use: logo up top, price struck, seal and Carfax badge in place.",
    cover: "/portfolio/minauto/listings/ford-escape/01.jpg",
    slides: [
      { src: "/portfolio/minauto/listings/ford-escape/01.jpg", alt: "Ford Escape SE listing card — 2014, 92,366 km, price reduced to $9,950" },
      { src: "/portfolio/minauto/listings/ford-escape/02.jpg", alt: "Ford Escape detail collage — exterior angles and interior close-ups" },
    ],
  },
] as const;
```

- [ ] **Step 2: Add lightbox state + handlers + keyboard effect** inside the component (after `cardView`). Note `open` holds **both** a set index and a slide index — stepping is scoped to the open set:

```tsx
  const [open, setOpen] = useState<{ set: number; slide: number } | null>(null);
  const closeBox = useCallback(() => setOpen(null), []);
  const stepBox = useCallback((delta: number) => {
    setOpen((o) => {
      if (!o) return o;
      const len = SETS[o.set].slides.length;
      return { set: o.set, slide: (o.slide + delta + len) % len };
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeBox();
      else if (e.key === "ArrowLeft") stepBox(-1);
      else if (e.key === "ArrowRight") stepBox(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, closeBox, stepBox]);
```

- [ ] **Step 3: Add the feed section** after the `.ma-card-sec` section:

```tsx
      <section className="ma-feed">
        <h2 className="ma-sec"><span className="ma-sec-no">03</span><span className="ma-sec-name">The Feed</span><i></i><span className="ma-sec-meta">9 SETS · 22 SLIDES</span></h2>
        <p className="ma-lead">Three carousels that argue, six listings that sell.</p>
        <p className="ma-body">The carousels do the work a listing cannot: explain what OMVIC registration actually buys you, hand over the three checks any buyer should run, and stretch the template to a travel trailer. Every proof point in them is set with the same tick that makes the logo.</p>
        <div className="ma-feed-grid">
          {SETS.map((s, i) => (
            <button type="button" className="ma-set" key={s.id} onClick={() => setOpen({ set: i, slide: 0 })}>
              <span className="ma-set-shot">
                <img src={s.cover} alt={s.slides[0].alt} loading="lazy" />
                <span className="ma-set-count">{s.slides.length}</span>
              </span>
              <span className="ma-set-meta">
                <span className="ma-set-kind">{s.id} · {s.kind}</span>
                <span className="ma-set-title">{s.title}</span>
                <span className="ma-set-sub">{s.meta}</span>
              </span>
            </button>
          ))}
        </div>
      </section>
```

- [ ] **Step 4: Add the lightbox** inside `.ma-page`, just before `<FontLink />`:

```tsx
      {open && (
        <div
          className="ma-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${SETS[open.set].title} — slide ${open.slide + 1} of ${SETS[open.set].slides.length}`}
          onClick={(e) => { if (e.target === e.currentTarget) closeBox(); }}
        >
          <button type="button" className="ma-modal-nav prev" onClick={() => stepBox(-1)} aria-label="Previous slide">←</button>

          <div className="ma-modal-stage">
            <div className="ma-modal-bar top">
              <span className="ma-modal-id">{SETS[open.set].id} · {SETS[open.set].kind}</span>
              <span className="ma-modal-title">{SETS[open.set].title}</span>
              <span className="ma-modal-count">{String(open.slide + 1).padStart(2, "0")} / {String(SETS[open.set].slides.length).padStart(2, "0")}</span>
              <button type="button" className="ma-modal-close" onClick={closeBox} aria-label="Close">×</button>
            </div>
            <div className="ma-modal-shot">
              <img src={SETS[open.set].slides[open.slide].src} alt={SETS[open.set].slides[open.slide].alt} />
            </div>
          </div>

          <button type="button" className="ma-modal-nav next" onClick={() => stepBox(1)} aria-label="Next slide">→</button>
          <p className="ma-modal-note">{SETS[open.set].note}</p>
        </div>
      )}
```

- [ ] **Step 5: Add the feed + lightbox CSS** at the end of the `styled-jsx` block, before the media queries. **The stage's definite `height` is load-bearing** — see Global Constraints.

```css
.ma-feed{padding:82px 22px;background:var(--surface)}
.ma-feed-grid{max-width:1160px;margin:40px auto 0;display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.ma-set{display:block;width:100%;text-align:left;padding:0;background:var(--paper);border:1px solid var(--rule);cursor:pointer;font:inherit;color:inherit;transition:transform .16s,border-color .16s}
.ma-set:hover{transform:translateY(-3px);border-color:var(--navy)}
.ma-set-shot{position:relative;display:block}
.ma-set-shot img{width:100%;height:auto;display:block;aspect-ratio:1080/1350;object-fit:cover}
.ma-set-count{position:absolute;top:10px;right:10px;min-width:26px;height:26px;padding:0 7px;background:var(--orange);color:#fff;display:flex;align-items:center;justify-content:center;font-family:"Barlow Condensed",sans-serif;font-size:13px;font-weight:700;letter-spacing:.06em}
.ma-set-meta{display:block;padding:14px 16px 16px}
.ma-set-kind{display:block;font-family:"Barlow Condensed",sans-serif;font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--orange)}
.ma-set-title{display:block;font-family:"Montserrat",sans-serif;font-weight:700;font-size:16px;color:var(--navy);margin-top:5px}
.ma-set-sub{display:block;font-size:13px;color:var(--mute);margin-top:3px}

.ma-modal{position:fixed;inset:0;z-index:90;display:flex;align-items:center;justify-content:center;padding:32px;background:rgba(9,27,35,.95);animation:ma-fade .22s ease-out}
@keyframes ma-fade{from{opacity:0}to{opacity:1}}
.ma-modal-stage{position:relative;width:min(660px,92vw);height:min(86vh,920px);max-height:86vh;background:var(--paper);display:flex;flex-direction:column;box-shadow:0 30px 90px rgba(0,0,0,.55);animation:ma-pop .28s cubic-bezier(0.34,1.56,0.64,1)}
@keyframes ma-pop{from{transform:scale(.96);opacity:0}to{transform:scale(1);opacity:1}}
.ma-modal-bar{flex:0 0 auto;display:flex;align-items:center;gap:12px;padding:12px 14px;border-bottom:3px solid var(--orange);font-family:"Barlow Condensed",sans-serif;font-size:12px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--mute)}
.ma-modal-id{color:var(--orange);font-weight:700}
.ma-modal-title{color:var(--navy);font-weight:700}
.ma-modal-count{margin-left:auto;font-variant-numeric:tabular-nums;color:var(--navy)}
.ma-modal-close{width:28px;height:28px;background:var(--navy);color:#fff;border:0;cursor:pointer;font-size:16px;font-weight:700;line-height:1;padding:0;display:flex;align-items:center;justify-content:center;transition:background .16s}
.ma-modal-close:hover{background:var(--orange)}
.ma-modal-shot{flex:1 1 auto;min-height:0;background:var(--surface);overflow:hidden;display:flex;align-items:center;justify-content:center}
.ma-modal-shot img{width:100%;height:100%;object-fit:contain;display:block}
.ma-modal-nav{position:absolute;top:50%;transform:translateY(-50%);width:52px;height:52px;background:var(--paper);color:var(--navy);border:2px solid var(--navy);cursor:pointer;font-size:19px;font-weight:700;line-height:1;padding:0;display:flex;align-items:center;justify-content:center;transition:transform .16s,background .16s,color .16s,border-color .16s;z-index:2}
.ma-modal-nav:hover{transform:translateY(-50%) scale(1.06);background:var(--orange);color:#fff;border-color:var(--orange)}
.ma-modal-nav.prev{left:30px}.ma-modal-nav.next{right:30px}
.ma-modal-note{position:absolute;left:50%;transform:translateX(-50%);bottom:22px;max-width:min(660px,92vw);margin:0;text-align:center;font-size:13.5px;line-height:1.6;color:rgba(255,255,255,.8)}
```

- [ ] **Step 6: Add the feed + modal responsive rules** inside the EXISTING media blocks (do not create new ones):

In `@media(max-width:980px)`: `.ma-feed-grid{grid-template-columns:repeat(2,1fr)}`

In `@media(max-width:560px)`:
```css
.ma-feed-grid{grid-template-columns:1fr}
.ma-modal{padding:12px}
.ma-modal-stage{width:calc(100% - 84px);height:min(76vh,700px)}
.ma-modal-nav{width:34px;height:34px;font-size:15px}
.ma-modal-nav.prev{left:6px}.ma-modal-nav.next{right:6px}
.ma-modal-note{bottom:8px;left:12px;right:12px;transform:none;max-width:none;font-size:12px}
```
Keep the stage's **definite height** at this breakpoint too — never `max-height` alone.

- [ ] **Step 7: Verify the counts in the heading are true**

```bash
grep -c "slides: \[" src/components/portfolio/featured/MinAutoPage.tsx   # expect 9
```
Total slides must equal 22 (3+5+3 carousels + 2+3+2+2+2+2 listings). If the markup says
"9 SETS · 22 SLIDES", both numbers must match the data. Fix the copy, not the data.

- [ ] **Step 8: Typecheck, lint, build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```
Expected: the previously-unused hook-import warnings now clear.

- [ ] **Step 9: Commit**

```bash
git add src/components/portfolio/featured/MinAutoPage.tsx
git commit -m "feat(portfolio): MinAuto section 03 — feed carousels, listings, set-scoped lightbox

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 7: Section 04 — From Zero, sign-off, reduced-motion, final verification

**Files:**
- Modify: `src/components/portfolio/featured/MinAutoPage.tsx`

**Interfaces:**
- Produces: `ZERO`, `PILLARS` consts and the `.ma-zero` / `.ma-signoff` markup.

- [ ] **Step 1: Add the consts** after `SETS`:

```tsx
const ZERO = [
  { no: "01", title: "Identity", body: "Logo system in four lockups, colour and type spec, source files handed over. The checkmark was chosen before anything else — it is the whole promise in one shape." },
  { no: "02", title: "Channels", body: "Instagram and Facebook business pages built from nothing. Facebook first: the 35–65 buyer this dealership actually sells to lives there, not on Instagram." },
  { no: "03", title: "Template system", body: "An inventory card any listing drops into — photo, corner tag, spec strip, price. Seven Canva templates so the client can keep shipping without us." },
  { no: "04", title: "Voice", body: "Three buyers, one tone: the fleet owner, the credit-rebuilder, the family afraid of a lemon. Same warmth, different fear answered." },
] as const;

const PILLARS = [
  "Vehicle showcases",
  "Inspection & certification",
  "Financing for real people",
  "Commercial & fleet",
  "Trust-building",
] as const;
```

- [ ] **Step 2: Add the markup** after the `.ma-feed` section (before the lightbox JSX):

```tsx
      <section className="ma-zero">
        <h2 className="ma-sec"><span className="ma-sec-no">04</span><span className="ma-sec-name">From Zero</span><i></i><span className="ma-sec-meta">MONTH ONE</span></h2>
        <div className="ma-zero-grid">
          {ZERO.map((z) => (
            <article key={z.no}>
              <span className="ma-zero-no">{z.no}</span>
              <h3>{z.title}</h3>
              <p>{z.body}</p>
            </article>
          ))}
        </div>
        <div className="ma-pillars">
          <span className="ma-pillars-label">Content pillars</span>
          <ul>{PILLARS.map((p) => <li key={p}>{p}</li>)}</ul>
        </div>
      </section>

      <footer className="ma-signoff">
        <div className="ma-sign-grid">
          <div><p className="ma-sign-label">Client</p><p className="ma-sign-name">MinAuto</p></div>
          <div><p className="ma-sign-label">Where</p><p className="ma-sign-name">Wasaga Beach, ON</p></div>
          <div><p className="ma-sign-label">By</p><p className="ma-sign-name accent">FrameFlow</p></div>
        </div>
        <Link className="ma-sign-back" href="/portfolio">← Back to portfolio</Link>
      </footer>
```

- [ ] **Step 3: Grep for the real motion declarations**, then write the reduced-motion block to match. Enumerate every `animation:`/`transition:`/`:hover{transform:...}` that actually exists — do not invent selectors, and do not copy the block below blindly if the grep disagrees:

```bash
grep -o "transition:[^;}]*" src/components/portfolio/featured/MinAutoPage.tsx | sort -u
grep -o "animation:[^;}]*" src/components/portfolio/featured/MinAutoPage.tsx | sort -u
```

- [ ] **Step 4: Add the reduced-motion block** at the very end of the `styled-jsx` block (adjust to the grep):

```css
@media (prefers-reduced-motion: reduce){
  .ma-modal,.ma-modal-stage{animation:none}
  .ma-set,.ma-modal-close,.ma-modal-nav,.ma-card-toggle button{transition:none}
  .ma-set:hover{transform:none}
  .ma-modal-nav:hover{transform:translateY(-50%)}
}
```
`.ma-modal-nav`'s `translateY(-50%)` does vertical **centering**, not motion — it MUST
be preserved. `transform:none` there would misalign the buttons.

- [ ] **Step 5: Typecheck + lint**

```bash
npx tsc --noEmit && npm run lint
```

- [ ] **Step 6: Runtime verification.** Start `npm run dev` on a FREE port (check first; do not disturb anything already on :3000) and drive headless Chrome over the DevTools Protocol. Node 22 has a global `WebSocket`, so CDP can be driven from a small `.mjs` script — adapt the working reference at `/private/tmp/claude-501/-Users-barandiloglu-Desktop-Projects-FrameFlow/7e23bbf1-d226-407b-987c-54afe7d4f251/scratchpad/verify-iyn.mjs`. Launch Chrome with `--headless=new --remote-debugging-port=<port>`. Allow ~7s after navigation for the loading transition.

  Verify and report with numbers:
  - Renders past the loading transition; hero knockout logo loads (`naturalWidth > 0`).
  - 4 lockups; the spec sheet image loads.
  - The card toggle switches `src` between the two card images and moves the `on` class.
  - 9 set cards, each showing a slide-count badge matching its set length.
  - Clicking a set opens the lightbox on slide 1; **←/→ wrap WITHIN that set only** — verify by opening the 5-slide set, stepping back from slide 1 to `05 / 05`, and confirming the title never changes to another set.
  - Escape closes; `document.body.style.overflow` restored to `""`.
  - **Crop guard: with the lightbox open, measure the `<img>`'s rendered height against its container's `clientHeight` and confirm the 1080×1350 portrait slide is NOT cropped — at desktop (1440×1000) AND mobile (390×844).**
  - 4 From Zero articles, 5 pillar chips.
  - Zero console errors.
  Then stop the dev server.

- [ ] **Step 7: Production build + index check**

```bash
npm run build
```
Confirm `/portfolio/minauto` is in the static output and the portfolio index row reads
`018 · MinAuto · Now showing · LOGO · BRANDING · SOCIAL MEDIA`.

- [ ] **Step 8: Commit**

```bash
git add src/components/portfolio/featured/MinAutoPage.tsx
git commit -m "feat(portfolio): MinAuto From Zero, sign-off, reduced-motion guard

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Self-Review

**Spec coverage:**
- Media pipeline: 4 lockups + real spec sheet, 2 evolution cards, rendered business card, 3 carousels, 6 listings → Task 1 ✓
- Integration (component, featured.ts, clients.ts promote + `Branding` tag, frame 018) → Task 2 ✓
- LoadingTransition + navy rail + hero (corrected deck) → Task 3 ✓
- 01 The Mark: 4 lockups, real spec sheet, 3 swatches with Surface labelled a neutral → Task 4 ✓
- 02 The Card: launch⇄current evolution toggle (replacing the impossible raw⇄finished), business card, tick-as-proof-mark → Task 5 ✓
- 03 The Feed: 3 carousels + 6 listings, **set-scoped** lightbox → Task 6 ✓
- 04 From Zero + content pillars ("Seven Canva templates" retained per user) → Task 7 ✓
- Sign-off → Task 7 ✓
- Reduced motion + responsive → Tasks 6, 7 ✓
- Lightbox definite-height regression guard → Global Constraints + Task 6 Steps 5–6, verified Task 7 Step 6 ✓
- Copy corrections (no INSPECTED, no navy certification bar, no "GS · Safety Certified") → Tasks 3, 5 ✓

**Placeholder scan:** No "TBD" / "handle edge cases". Task 1 Step 4's Quick Look check and Task 7 Step 3's grep are adaptive by design with explicit accept/reject criteria and a BLOCKED path. All code steps carry real code.

**Type consistency:** `LOCKUPS`/`SWATCHES`/`CARDS`/`SETS`/`ZERO`/`PILLARS` shapes match their consumers. `cardView` is `"launch" | "current"`, the exact key set of `CARDS`. `open` is `{set,slide}` throughout Tasks 6–7; `stepBox` reads `SETS[o.set].slides.length` so wrapping is set-scoped as specified. Every `src` path in `LOCKUPS`/`CARDS`/`SETS` matches a file produced by Task 1. `.ma-bizcard*` (Task 5), `.ma-feed*`/`.ma-modal*` (Task 6) are new CSS added by the task that uses them; all other classes come from the Task 3 port.
