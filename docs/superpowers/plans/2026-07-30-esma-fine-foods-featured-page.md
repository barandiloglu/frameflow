# Esma Fine Foods Featured Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bespoke, production-grade featured case-study page for Esma Fine Foods at `/portfolio/esma-fine-foods`, structured like the store itself — two content lanes, a sideways-scrolling aisle, and a receipt.

**Architecture:** One self-contained client component (`EsmaPage.tsx`) with scoped `styled-jsx`, its own maroon rail + sign-off (no global Navbar/Footer), reusing `LoadingTransition` and the styled lightbox. Assets: 9 provided posts (5 appetite + 4 price), 2 real films with posters extracted from the footage, and a logo extracted from one of the posts. The palette/type "spec sheet" is rendered live in HTML rather than fabricated as a client document. Stacked on `feat/aydin-cpa-case-study`.

**Tech Stack:** Next.js 16.2.1 (App Router), React 19.2.4, TypeScript, styled-jsx, ffmpeg (asset prep).

## Global Constraints

- **Read `node_modules/next/dist/docs/` before writing Next-specific code** — this Next.js has breaking changes vs. training data (per AGENTS.md).
- Featured pages are `"use client"`, fully bespoke, **no global `<Navbar>`/`<Footer>`**; this page **does** use `LoadingTransition` (all siblings do).
- **All content real** — copy verbatim from the approved prototype; the 9 posts map to fixed lanes/slots (verified by viewing); both films are the client's real footage. **Nothing fabricated**: the palette/type spec is rendered in code, not mocked up as a client brand document.
- Palette: maroon `#3B0F0E`, cream `#F6EAC7`, olive `#5C6C40`, paper `#FFFDF7`, ink `#2C1A17`, mute `#8C7F6B`, rule `rgba(59,15,14,.16)`.
- Type: **Mirza** (400;500;600) + **Yellowtail** + **Montserrat** (300;400;500;600;700) via Google Fonts `<link>` with two `<link rel="preconnect">` (incl. `crossOrigin=""` on gstatic). The prototype's stacks name the brand's own faces first — `"Vintage Rotter","Yellowtail"` and `"Mont","Montserrat"` — and are **kept verbatim**.
- JSX text must escape apostrophes/quotes (`&rsquo;` `&amp;`) for `react/no-unescaped-entities`. Data in plain JS string literals does **not** need escaping.
- **`prefers-reduced-motion` must disable** the lightbox fade/pop, the aisle slot hover transform, and button transitions. The aisle's horizontal overflow and `scroll-snap` are layout, not animation — leave them intact.
- **Lightbox sizing (hard requirement, regression guard):** the modal stage must carry a **definite height**, with the image at `width:100%;height:100%;object-fit:contain`. A `max-height`-only stage resolves to `auto`, the image's percentage height is ignored, and the post renders at natural size and gets clipped — this exact bug shipped on the IYN page and had to be fixed.
- Asset filenames exactly as in the mapping table; frame number derives from `getFrameNumber(client)` (roster index 10 → `"011"`) — never hardcoded.
- No unit-test framework; verification per task = `npx tsc --noEmit` + `npm run lint` (no NEW errors vs the known baseline: **6 pre-existing errors** in unrelated files — ThemeProvider/ThemeToggle/MarkScene/admin-analytics — plus `no-page-custom-font` / `no-img-element` warnings every featured page carries) + `npm run build`. Portfolio pages client-render — verify routes via `npm run build`, not curl HTML.
- Shell note: some sandboxed shells reset `PATH`; prefix asset/build commands with
  `export PATH="/usr/bin:/bin:/usr/local/bin:/opt/homebrew/bin:$PATH"`.

---

### Task 1: Media assets (9 posts, 2 films, 2 posters, logo)

Place everything under `public/portfolio/esma-fine-foods/`. No app code.

**Files:**
- Create: `public/portfolio/esma-fine-foods/appetite/{01-grocery,02-choose-your-taste,03-pide,04-simit,05-sandwich}.jpg`
- Create: `public/portfolio/esma-fine-foods/price/{01-fresh-deals-week,02-weekend-deals,03-labne,04-pide-discount}.jpg`
- Create: `public/portfolio/esma-fine-foods/video/{pov-reel.mp4,pov-poster.jpg,baklava.mp4,baklava-poster.jpg}`
- Create: `public/portfolio/esma-fine-foods/brand/logo-olive.png`

**Source mapping (verified by viewing — do not re-derive).** All sources in `/Users/barandiloglu/Downloads/Esma Portfolio/`:

| Source | Target |
|---|---|
| `WhatsApp Image 2026-07-30 at 10.00.54.jpeg`     | `appetite/01-grocery.jpg` |
| `WhatsApp Image 2026-07-30 at 10.00.54 (1).jpeg` | `appetite/02-choose-your-taste.jpg` |
| `WhatsApp Image 2026-07-30 at 10.00.54 (2).jpeg` | `appetite/03-pide.jpg` |
| `WhatsApp Image 2026-07-30 at 10.00.54 (3).jpeg` | `appetite/04-simit.jpg` |
| `WhatsApp Image 2026-07-30 at 10.00.54 (4).jpeg` | `appetite/05-sandwich.jpg` |
| `WhatsApp Image 2026-07-30 at 10.00.44.jpeg`     | `price/01-fresh-deals-week.jpg` |
| `WhatsApp Image 2026-07-30 at 10.00.44 (1).jpeg` | `price/02-weekend-deals.jpg` |
| `WhatsApp Image 2026-07-30 at 10.00.44 (2).jpeg` | `price/03-labne.jpg` |
| `WhatsApp Image 2026-07-30 at 10.00.44 (3).jpeg` | `price/04-pide-discount.jpg` |
| `WhatsApp Video 2026-07-30 at 10.00.37 (1).mp4` (608×1080, 89.8s) | `video/pov-reel.mp4` |
| `WhatsApp Video 2026-07-30 at 10.00.37.mp4` (720×1280, 14.7s)     | `video/baklava.mp4` |

- [ ] **Step 1: Create directories**

```bash
export PATH="/usr/bin:/bin:/usr/local/bin:/opt/homebrew/bin:$PATH"
R="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/esma-fine-foods"
mkdir -p "$R/appetite" "$R/price" "$R/video" "$R/brand"
```

- [ ] **Step 2: Copy + compress the 9 posts** (1131×1600 sources; keep size, re-encode)

```bash
S="/Users/barandiloglu/Downloads/Esma Portfolio"
R="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/esma-fine-foods"
ffmpeg -y -loglevel error -i "$S/WhatsApp Image 2026-07-30 at 10.00.54.jpeg"     -q:v 5 "$R/appetite/01-grocery.jpg"
ffmpeg -y -loglevel error -i "$S/WhatsApp Image 2026-07-30 at 10.00.54 (1).jpeg" -q:v 5 "$R/appetite/02-choose-your-taste.jpg"
ffmpeg -y -loglevel error -i "$S/WhatsApp Image 2026-07-30 at 10.00.54 (2).jpeg" -q:v 5 "$R/appetite/03-pide.jpg"
ffmpeg -y -loglevel error -i "$S/WhatsApp Image 2026-07-30 at 10.00.54 (3).jpeg" -q:v 5 "$R/appetite/04-simit.jpg"
ffmpeg -y -loglevel error -i "$S/WhatsApp Image 2026-07-30 at 10.00.54 (4).jpeg" -q:v 5 "$R/appetite/05-sandwich.jpg"
ffmpeg -y -loglevel error -i "$S/WhatsApp Image 2026-07-30 at 10.00.44.jpeg"     -q:v 5 "$R/price/01-fresh-deals-week.jpg"
ffmpeg -y -loglevel error -i "$S/WhatsApp Image 2026-07-30 at 10.00.44 (1).jpeg" -q:v 5 "$R/price/02-weekend-deals.jpg"
ffmpeg -y -loglevel error -i "$S/WhatsApp Image 2026-07-30 at 10.00.44 (2).jpeg" -q:v 5 "$R/price/03-labne.jpg"
ffmpeg -y -loglevel error -i "$S/WhatsApp Image 2026-07-30 at 10.00.44 (3).jpeg" -q:v 5 "$R/price/04-pide-discount.jpg"
```

- [ ] **Step 3: Transcode both films and extract their posters.** The prototype references posters that were never supplied; a representative frame from the footage is the honest source. Pick a frame a few seconds in so it is not a black lead-in, then confirm by viewing.

```bash
S="/Users/barandiloglu/Downloads/Esma Portfolio"
R="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/esma-fine-foods"
ffmpeg -y -loglevel error -i "$S/WhatsApp Video 2026-07-30 at 10.00.37 (1).mp4" -c:v libx264 -crf 27 -preset slow -c:a aac -b:a 128k -movflags +faststart "$R/video/pov-reel.mp4"
ffmpeg -y -loglevel error -i "$S/WhatsApp Video 2026-07-30 at 10.00.37.mp4"     -c:v libx264 -crf 25 -preset slow -c:a aac -b:a 128k -movflags +faststart "$R/video/baklava.mp4"
ffmpeg -y -loglevel error -ss 4 -i "$R/video/pov-reel.mp4" -frames:v 1 -q:v 4 "$R/video/pov-poster.jpg"
ffmpeg -y -loglevel error -ss 3 -i "$R/video/baklava.mp4" -frames:v 1 -q:v 4 "$R/video/baklava-poster.jpg"
```
Read both posters. If either is black, near-black, or a motion-blurred mess, re-extract at a different `-ss` (try 8 / 12 for the POV reel, 6 / 9 for the baklava) until it is a clean representative frame. Report the timestamps you settled on.

- [ ] **Step 4: Extract the logo from the Pınar Labne card.** No standalone logo file exists. The Labne card carries the largest clean olive wordmark on white. Crop the mark, then derive alpha from luminance (so antialiased edges carry no white fringing) while forcing RGB to the brand olive.

```bash
S="/Users/barandiloglu/Downloads/Esma Portfolio"
R="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/esma-fine-foods"
ffmpeg -y -loglevel error -i "$S/WhatsApp Image 2026-07-30 at 10.00.44 (2).jpeg" -vf "crop=290:320:748:112" /tmp/esma-mark.png
ffmpeg -y -loglevel error -i /tmp/esma-mark.png -vf \
"format=rgba,geq=r='92':g='108':b='64':a='clip((255-(0.299*r(X,Y)+0.587*g(X,Y)+0.114*b(X,Y)))*1.62,0,255)'" \
"$R/brand/logo-olive.png"
```
Note `lum()` is NOT available in `geq` on RGBA input — the explicit luminance expression above is required.

**Prove the transparency** by compositing over the hero cream, then Read the proof:

```bash
ffmpeg -y -loglevel error -f lavfi -i "color=c=0xf6eac7:s=420x420" -i "$R/brand/logo-olive.png" \
  -filter_complex "[0][1]overlay=(W-w)/2:(H-h)/2" -frames:v 1 /tmp/esma-logo-proof.png
```
Expected: an olive leaf + "ESMA / FINE FOODS" wordmark on cream with **no white box and no pale halo**. If a white rectangle or fringe appears, adjust the crop offsets and re-run before proceeding.

- [ ] **Step 5: Verify everything**

```bash
R="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/esma-fine-foods"
ls -1 "$R/appetite" | wc -l   # expect 5
ls -1 "$R/price" | wc -l      # expect 4
du -h "$R"/appetite/*.jpg "$R"/price/*.jpg "$R"/video/* "$R"/brand/*.png | sort -k2
ffprobe -v error -show_entries format=duration -of csv=p=0 "$R/video/pov-reel.mp4"   # ~89.8
ffprobe -v error -show_entries format=duration -of csv=p=0 "$R/video/baklava.mp4"    # ~14.7
```
Expected: posts ≤ ~350 KB each; `pov-reel.mp4` ≤ ~10 MB; posters ≤ ~250 KB; logo ≤ ~80 KB.
**Read these to confirm content matches the filename:** `appetite/01-grocery.jpg`
("Fresh & Organic / Grocery", basket + green tote, SAVE 25%), `price/02-weekend-deals.jpg`
("Weekend Fresh Deals", 9 produce cards, up to 30% off), `appetite/04-simit.jpg`
(sesame simit, flour bowl, coral napkin), and both posters. If any mismatch, STOP and report.

- [ ] **Step 6: Commit**

```bash
cd /Users/barandiloglu/Desktop/Projects/FrameFlow
git add public/portfolio/esma-fine-foods
git commit -m "feat(portfolio): add Esma media (9 posts, 2 films, posters, extracted logo)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Data promotion, wiring, and component stub

**Files:**
- Modify: `src/data/clients.ts` (the `esma-fine-foods` entry, ~line 374)
- Modify: `src/app/portfolio/[slug]/featured.ts`
- Create: `src/components/portfolio/featured/EsmaPage.tsx` (stub)

**Interfaces:**
- Produces: `export function EsmaPage({ client }: { client: Client })`.

- [ ] **Step 1: Promote the `clients.ts` entry.** Replace
  `{ slug: "esma-fine-foods",             name: "Esma Fine Foods",                           services: ["Photography", "Social Media", "Videography"] },`
  with:

```ts
  {
    slug: "esma-fine-foods",
    name: "Esma Fine Foods",
    services: ["Social Media", "Photography", "Videography"],
    year: "2026",
    location: "Concord, ON",
    runtime: "Ongoing",
    scene: "INT. THE AISLE — DAY",
    synopsis:
      "Social media for a Jane Street grocery with a Turkish bakery counter at one end and weekly produce deals at the other. Two content lanes on one palette — appetite photography that never mentions money, and price boards built to be compared at arm's length — plus in-store films that let the shelves make the argument.",
    featured: true,
  },
```

- [ ] **Step 2: Create the stub** at `src/components/portfolio/featured/EsmaPage.tsx`:

```tsx
"use client";

import type { Client } from "@/data/clients";

type Props = { client: Client };

export function EsmaPage({ client }: Props) {
  return <main style={{ padding: 80 }}>{client.name} — case study (stub)</main>;
}
```

- [ ] **Step 3: Register in `featured.ts`** — import + map entry, aligned with neighbours:

```ts
import { EsmaPage } from "@/components/portfolio/featured/EsmaPage";
```
```ts
  "esma-fine-foods":                EsmaPage,
```

- [ ] **Step 4: Typecheck, lint, build**

```bash
cd /Users/barandiloglu/Desktop/Projects/FrameFlow
npx tsc --noEmit && npm run lint && npm run build
```
Expected: tsc clean; lint at baseline (no new errors in touched files); build succeeds with `.next/server/app/portfolio/esma-fine-foods.html` present.

- [ ] **Step 5: Commit**

```bash
git add src/data/clients.ts src/app/portfolio/[slug]/featured.ts src/components/portfolio/featured/EsmaPage.tsx
git commit -m "feat(portfolio): promote Esma Fine Foods to featured + wire stub route

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Shell — CSS port, LoadingTransition, maroon rail, hero

Replace the stub with the shell: `.es-page` root + tokens, font `<link>` (+ preconnects), `LoadingTransition`, the sticky maroon rail, and the cream hero (logo, kicker, script line, headline, deck, three-colour band).

**CSS source of truth:** `/Users/barandiloglu/Downloads/esma-preview.html` (`<style>`, lines 10–119). Port into `styled-jsx global`. Reproduce the `.es-*` rules and both `@media` blocks verbatim. **DROP** the `*{box-sizing:border-box}` and `body{margin:0}` reset (styled-jsx global would leak them into other routes). **KEEP** the `.es-page` CSS-variable block verbatim. The `.es-modal*` rules are replaced in Task 5 — porting them as-is now is fine.

**Files:**
- Modify: `src/components/portfolio/featured/EsmaPage.tsx`

**Interfaces:**
- Consumes: `LoadingTransition` — props `{ frameNumber, clientName, scope, location?, year? }`; `getFrameNumber`.
- Produces: the `.es-page` root.

- [ ] **Step 1: Write the shell.** Replace the stub with:

```tsx
"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getFrameNumber } from "@/data/clients";
import type { Client } from "@/data/clients";
import { LoadingTransition } from "@/components/portfolio/LoadingTransition";

type Props = { client: Client };

export function EsmaPage({ client }: Props) {
  const frame = getFrameNumber(client); // "011"

  return (
    <div className="es-page">
      <LoadingTransition
        frameNumber={frame}
        clientName={client.name}
        scope={["Social", "Photography", "Video"]}
        location="Concord, ON"
        year={client.year}
      />

      <header className="es-rail">
        <Link className="es-back" href="/portfolio">← Portfolio</Link>
        <span className="es-rail-mid">Esma Fine Foods</span>
        <span className="es-rail-end">Concord, ON · Reel {frame}</span>
      </header>

      <section className="es-hero">
        <div className="es-hero-inner">
          <img className="es-hero-logo" src="/portfolio/esma-fine-foods/brand/logo-olive.png" alt="Esma Fine Foods" />
          <p className="es-kicker">Social Media</p>
          <p className="es-script">Fresh &amp; Organic</p>
          <h1 className="es-h1">A grocery feed has two jobs.</h1>
          <p className="es-deck">Make you hungry, and make you feel clever about money. <b>Esma Fine Foods</b> is a grocery store on Jane Street in Concord — Turkish bakery counter at one end, weekly produce deals at the other. We gave those two jobs two different design languages and held them together with one palette.</p>
        </div>
        <div className="es-hero-band"><span></span><span></span><span></span></div>
      </section>

      <FontLink />
      <style jsx global>{`
        /* PORT the prototype <style> (lines 10–119) here.
           Drop the '*{}' + 'body{margin:0}' reset. Keep the .es-page var block. */
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
        href="https://fonts.googleapis.com/css2?family=Mirza:wght@400;500;600&family=Yellowtail&family=Montserrat:wght@300;400;500;600;700&display=swap"
      />
    </>
  );
}
```
`useCallback`/`useEffect`/`useState` are imported for Tasks 4–5; if lint flags them as unused at this stage, leave them — Task 5 consumes them.

- [ ] **Step 2: Port the prototype CSS** (lines 10–119) per the rules above.

- [ ] **Step 3: Typecheck, lint, build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```
Expected: tsc clean; the file's expected `no-page-custom-font` + `no-img-element` warnings; no new errors; build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/portfolio/featured/EsmaPage.tsx
git commit -m "feat(portfolio): Esma shell — maroon rail, cream hero, loading transition

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Sections 01 (Two lanes) and 03 (In store)

Add the two-lane cards and the two real films. (Section 02, the aisle, comes with the lightbox in Task 5.)

**Files:**
- Modify: `src/components/portfolio/featured/EsmaPage.tsx`

**Interfaces:**
- Produces: the `LANES` const and the `.es-lanes` / `.es-film` markup.

- [ ] **Step 1: Add the `LANES` const** at module scope (after `type Props`):

```tsx
const LANES = [
  {
    key: "appetite",
    name: "Appetite",
    rule: "Photograph, script name, no numbers",
    body: "Full-bleed food, one word of copy, logo bottom-centre. These posts never mention money. Their entire job is to put a craving in front of someone who was not planning to shop today.",
  },
  {
    key: "price",
    name: "Price",
    rule: "Grid, weights, old price struck through",
    body: "Boards and single-SKU cards. Olive header, cream field, the old price always visible beside the new one. Dense on purpose — a customer scanning these is comparing, not browsing.",
  },
] as const;
```

- [ ] **Step 2: Add the two sections' markup** after the hero `</section>`:

```tsx
      <section className="es-lanes">
        <h2 className="es-sec"><span className="es-sec-no">01</span>Two lanes</h2>
        <div className="es-lane-grid">
          {LANES.map((l) => (
            <article className={`es-lane es-lane-${l.key}`} key={l.key}>
              <h3>{l.name}</h3>
              <p className="es-lane-rule">{l.rule}</p>
              <p>{l.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="es-film">
        <h2 className="es-sec"><span className="es-sec-no">03</span>In store</h2>
        <div className="es-film-grid">
          <figure className="es-clip">
            <video className="es-clip-el" controls preload="none" poster="/portfolio/esma-fine-foods/video/pov-poster.jpg">
              <source src="/portfolio/esma-fine-foods/video/pov-reel.mp4" type="video/mp4" />
            </video>
            <figcaption><b>Store POV</b> — 1:30. A shop-with-me: cart down the aisles, items off the shelf and into the basket, deli counter, checkout. Price cards drop in over the picks — the one place both lanes run at once.</figcaption>
          </figure>
          <figure className="es-clip">
            <video className="es-clip-el" controls preload="none" poster="/portfolio/esma-fine-foods/video/baklava-poster.jpg">
              <source src="/portfolio/esma-fine-foods/video/baklava.mp4" type="video/mp4" />
            </video>
            <figcaption><b>Free baklava tasting</b> — 0:15. A standing in-store offer, shot at the counter and closed on the logo. Appetite doing a job no price board can.</figcaption>
          </figure>
        </div>
      </section>
```
Section 02 (the aisle) is deliberately absent here — Task 5 inserts it between these two.

- [ ] **Step 3: Typecheck, lint, build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```
Expected: all clean; no new lint errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/portfolio/featured/EsmaPage.tsx
git commit -m "feat(portfolio): Esma two lanes + in-store films

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: Section 02 — the aisle + styled lightbox

Add the 9-post horizontally-scrolling aisle and the styled lightbox, replacing the plain `.es-modal*` CSS ported in Task 3.

**Files:**
- Modify: `src/components/portfolio/featured/EsmaPage.tsx`

**Interfaces:**
- Consumes: nothing new.
- Produces: the `AISLE` const, `lightbox` state + handlers + keyboard effect, and the styled `.es-modal` markup + CSS.

- [ ] **Step 1: Add the `AISLE` const** after `LANES` (order interleaves the lanes exactly as the prototype does):

```tsx
const AISLE = [
  { id: "A.01", lane: "appetite", shelf: "Grocery — hero",        src: "/portfolio/esma-fine-foods/appetite/01-grocery.jpg",
    alt: "Esma promo poster — a wire basket and a green tote overflowing with produce on cream, with a 25% saving bubble",
    note: "The store, in one frame. Basket and bag cut out on cream, address along the bottom where a shopfront sign would be." },
  { id: "P.01", lane: "price",    shelf: "Fresh Deals — weekly",  src: "/portfolio/esma-fine-foods/price/01-fresh-deals-week.jpg",
    alt: "Weekly deals board — eight product cards with photo, description, weight and price on cream",
    note: "Eight lines, each with weight and price. Built to be read at arm's length on a phone, not admired." },
  { id: "A.02", lane: "appetite", shelf: "Choose your taste",     src: "/portfolio/esma-fine-foods/appetite/02-choose-your-taste.jpg",
    alt: "Close-up of a minced-meat pide with peppers, script headline over the top",
    note: "Shot close enough that you can see the pepper. No price anywhere — this frame only has to make you hungry." },
  { id: "P.02", lane: "price",    shelf: "Weekend — up to 30%",   src: "/portfolio/esma-fine-foods/price/02-weekend-deals.jpg",
    alt: "Weekend deals board — nine produce cards with per-kilo prices, old prices struck through",
    note: "Produce only, per kilo, old price struck out. The comparison is the message." },
  { id: "A.03", lane: "appetite", shelf: "Pide",                  src: "/portfolio/esma-fine-foods/appetite/03-pide.jpg",
    alt: "Ramazan pide loaves in a brown paper bag on a wooden table, dark background",
    note: "One word, one loaf, one paper bag. The bakery counter without a word of copy." },
  { id: "P.03", lane: "price",    shelf: "Pınar Labne — $12 → $7", src: "/portfolio/esma-fine-foods/price/03-labne.jpg",
    alt: "Single-product discount card for Pınar creamy labneh twin pack, old price crossed out beside a large new price",
    note: "The single-SKU card. Corner ribbon, old price buried in a maroon dot, new price in a red slab you cannot miss." },
  { id: "A.04", lane: "appetite", shelf: "Simit",                 src: "/portfolio/esma-fine-foods/appetite/04-simit.jpg",
    alt: "Sesame-crusted simit on a white plate beside a bowl of flour and a coral napkin",
    note: "Lighter and cleaner than the rest of the appetite lane — breakfast light instead of dinner light." },
  { id: "P.04", lane: "price",    shelf: "Pide — $12 → $7",       src: "/portfolio/esma-fine-foods/price/04-pide-discount.jpg",
    alt: "Minimal discount card — a round pide on white inside an olive frame, old price struck through above the new one",
    note: "Same offer as the labneh card, stripped to a frame and a number. Proof the price template survives being emptied out." },
  { id: "A.05", lane: "appetite", shelf: "Sandwich",              src: "/portfolio/esma-fine-foods/appetite/05-sandwich.jpg",
    alt: "Stacked club sandwich with ham, tomato and lettuce on dark rye, photographed on a black plate",
    note: "Deli counter. Dark ground, single hero, script name top-left — the appetite lane's most restrained frame." },
] as const;
```

- [ ] **Step 2: Add lightbox state + handlers + keyboard effect** inside the component (after `frame`):

```tsx
  const [lightbox, setLightbox] = useState<number | null>(null);
  const openLightbox = useCallback((i: number) => setLightbox(i), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const stepLightbox = useCallback(
    (delta: number) => setLightbox((i) => (i === null ? i : (i + delta + AISLE.length) % AISLE.length)),
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

- [ ] **Step 3: Add the aisle section** between the `.es-lanes` and `.es-film` sections:

```tsx
      <section className="es-aisle-sec">
        <h2 className="es-sec light"><span className="es-sec-no">02</span>The aisle<span className="es-scroll-hint">scroll sideways →</span></h2>
        <div className="es-aisle">
          {AISLE.map((it, i) => (
            <button type="button" className={`es-slot es-slot-${it.lane}`} key={it.id} onClick={() => openLightbox(i)}>
              <img className="es-slot-img" src={it.src} alt={it.alt} />
              <span className="es-tag">
                <span className="es-tag-id">{it.id}</span>
                <span className="es-tag-name">{it.shelf}</span>
              </span>
            </button>
          ))}
          <span className="es-aisle-end" />
        </div>
      </section>
```

- [ ] **Step 4: Add the styled lightbox modal** inside `.es-page`, just before `<FontLink />`:

```tsx
      {lightbox !== null && (
        <div
          className="es-modal open"
          role="dialog"
          aria-modal="true"
          aria-label={`${AISLE[lightbox].shelf} — frame ${lightbox + 1} of ${AISLE.length}`}
          onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
        >
          <button type="button" className="es-modal-nav prev" onClick={() => stepLightbox(-1)} aria-label="Previous">←</button>

          <div className="es-modal-stage">
            <div className="es-modal-bar top">
              <span className="es-modal-counter">★ Shelf <b>{String(lightbox + 1).padStart(2, "0")}</b> / {String(AISLE.length).padStart(2, "0")}</span>
              <span className="es-modal-brand">ESMA · REEL {frame}</span>
              <button type="button" className="es-modal-close" onClick={closeLightbox} aria-label="Close">×</button>
            </div>
            <div className="es-modal-image-wrap">
              <img src={AISLE[lightbox].src} alt={AISLE[lightbox].alt} />
            </div>
            <div className="es-modal-bar bot">
              <span className="es-modal-slate">{AISLE[lightbox].shelf}</span>
            </div>
          </div>

          <button type="button" className="es-modal-nav next" onClick={() => stepLightbox(1)} aria-label="Next">→</button>
          <p className="es-modal-cap">{AISLE[lightbox].note}</p>
        </div>
      )}
```

- [ ] **Step 5: Replace the ported `.es-modal*` CSS** with the styled-stage version in Esma's tokens. Remove the old `.es-modal-inner`, `.es-modal-img`, `.es-modal-x` rules and add:

```css
.es-modal{position:fixed;inset:0;z-index:90;display:flex;align-items:center;justify-content:center;padding:32px;background:rgba(28,8,7,.95);font-family:"Mont","Montserrat",sans-serif;animation:es-fade .22s ease-out}
@keyframes es-fade{from{opacity:0}to{opacity:1}}
.es-modal-stage{position:relative;width:min(680px,92vw);height:min(86vh,940px);max-height:86vh;background:var(--paper);display:flex;flex-direction:column;box-shadow:0 30px 90px rgba(0,0,0,.5);animation:es-pop .28s cubic-bezier(0.34,1.56,0.64,1)}
@keyframes es-pop{from{transform:scale(.96);opacity:0}to{transform:scale(1);opacity:1}}
.es-modal-bar{flex:0 0 auto;display:flex;align-items:center;gap:12px;padding:13px 16px;font-size:11px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--mute)}
.es-modal-bar.top{border-bottom:2px solid var(--olive);justify-content:space-between}
.es-modal-bar.bot{border-top:1px dashed var(--rule);justify-content:center;text-transform:none;letter-spacing:.04em;color:var(--maroon);font-family:"Mirza",Georgia,serif;font-size:19px;font-weight:600}
.es-modal-counter b{color:var(--olive);font-weight:700}
.es-modal-brand{letter-spacing:.2em;color:var(--maroon)}
.es-modal-close{width:30px;height:30px;background:var(--maroon);color:var(--cream);border:0;cursor:pointer;font-size:16px;font-weight:700;line-height:1;padding:0;display:flex;align-items:center;justify-content:center;transition:background .16s}
.es-modal-close:hover{background:var(--olive)}
.es-modal-image-wrap{flex:1 1 auto;min-height:0;background:var(--cream);overflow:hidden;display:flex;align-items:center;justify-content:center}
.es-modal-image-wrap img{width:100%;height:100%;object-fit:contain;display:block}
.es-modal-nav{position:absolute;top:50%;transform:translateY(-50%);width:54px;height:54px;background:var(--paper);color:var(--maroon);border:2px solid var(--maroon);cursor:pointer;font-size:20px;font-weight:700;line-height:1;padding:0;display:flex;align-items:center;justify-content:center;transition:transform .16s,background .16s,color .16s;z-index:2}
.es-modal-nav:hover{transform:translateY(-50%) scale(1.06);background:var(--olive);color:var(--cream);border-color:var(--olive)}
.es-modal-nav.prev{left:32px}.es-modal-nav.next{right:32px}
```
**The stage's definite `height` is load-bearing** — see Global Constraints. Do not reduce it to `max-height` alone.

- [ ] **Step 6: Typecheck, lint, build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```
Expected: tsc clean; the previously-unused `useState`/`useEffect`/`useCallback` warnings now clear; no new errors.

- [ ] **Step 7: Confirm the old modal rules are gone**

```bash
grep -n "es-modal-inner\|es-modal-img\|es-modal-x" src/components/portfolio/featured/EsmaPage.tsx || echo "clean"
grep -c "\.es-modal{" src/components/portfolio/featured/EsmaPage.tsx   # expect 1
```

- [ ] **Step 8: Commit**

```bash
git add src/components/portfolio/featured/EsmaPage.tsx
git commit -m "feat(portfolio): Esma aisle + styled lightbox

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 6: Section 04 — the receipt + live palette/type spec, and sign-off

**Files:**
- Modify: `src/components/portfolio/featured/EsmaPage.tsx`

**Interfaces:**
- Produces: `RECEIPT`, `SWATCHES`, `FACES` consts and the `.es-receipt-sec` / `.es-signoff` markup, plus the spec-panel CSS.

- [ ] **Step 1: Add the consts** after `AISLE`:

```tsx
const RECEIPT = [
  ["Weekly deals board", "recurring"],
  ["Weekend produce board", "recurring"],
  ["Single-SKU discount cards", "on demand"],
  ["Appetite photography posts", "5 shown"],
  ["Store POV reel", "1:30"],
  ["Product tasting reel", "0:15"],
  ["Palette + type system", "locked"],
] as const;

const SWATCHES = [
  { name: "Maroon", hex: "#3B0F0E", css: "var(--maroon)" },
  { name: "Olive",  hex: "#5C6C40", css: "var(--olive)"  },
  { name: "Cream",  hex: "#F6EAC7", css: "var(--cream)"  },
] as const;

/* Rendered live rather than shipped as an image: the prototype referenced a
   spec-sheet photo that does not exist, and inventing a client brand document
   would be dishonest. These are the real faces the feed is set in. */
const FACES = [
  { sample: "Grocery",        name: "Mirza",          role: "Headlines",     cls: "es-face-serif"  },
  { sample: "Fresh & Organic", name: "Vintage Rotter", role: "Product names", cls: "es-face-script" },
  { sample: "$7.70 / kg",     name: "Mont",           role: "Price grids",   cls: "es-face-mono"   },
] as const;
```

- [ ] **Step 2: Add the receipt + sign-off markup** after the `.es-film` section:

```tsx
      <section className="es-receipt-sec">
        <h2 className="es-sec"><span className="es-sec-no">04</span>The receipt</h2>
        <div className="es-receipt-grid">
          <div className="es-receipt">
            <p className="es-receipt-head">ESMA FINE FOODS<br /><span>9100 Jane St Unit 55 · Concord, ON</span></p>
            <ul>
              {RECEIPT.map(([item, qty]) => (
                <li key={item}><span>{item}</span><i></i><span>{qty}</span></li>
              ))}
            </ul>
            <p className="es-receipt-total"><span>Scope</span><i></i><span>Social media</span></p>
            <p className="es-receipt-foot">Thank you — come again</p>
          </div>

          <figure className="es-spec">
            <div className="es-spec-panel">
              <div className="es-spec-swatches">
                {SWATCHES.map((s) => (
                  <div className="es-swatch" key={s.name}>
                    <span className="es-swatch-chip" style={{ background: s.css }} />
                    <span className="es-swatch-name">{s.name}</span>
                    <span className="es-swatch-hex">{s.hex}</span>
                  </div>
                ))}
              </div>
              <ul className="es-spec-faces">
                {FACES.map((f) => (
                  <li key={f.name}>
                    <span className={`es-face-sample ${f.cls}`}>{f.sample}</span>
                    <span className="es-face-meta"><b>{f.name}</b> — {f.role}</span>
                  </li>
                ))}
              </ul>
            </div>
            <figcaption>Three colours, three faces. <b>Mirza</b> sets the headlines, a script carries the product names, <b>Mont</b> does the work in the price grids.</figcaption>
          </figure>
        </div>
      </section>

      <footer className="es-signoff">
        <div className="es-sign-grid">
          <div><p className="es-sign-label">Client</p><p className="es-sign-name">Esma Fine Foods</p></div>
          <div><p className="es-sign-label">Where</p><p className="es-sign-name">Concord, ON</p></div>
          <div><p className="es-sign-label">By</p><p className="es-sign-name accent">FrameFlow</p></div>
        </div>
        <Link className="es-sign-back" href="/portfolio">← Back to portfolio</Link>
      </footer>
```

- [ ] **Step 3: Add the spec-panel CSS.** The ported `.es-spec-img` rule is now unused — remove it and add:

```css
.es-spec-panel{border:1px solid var(--rule);background:var(--paper);padding:26px 24px}
.es-spec-swatches{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:24px}
.es-swatch{display:flex;flex-direction:column;gap:7px}
.es-swatch-chip{display:block;height:64px;border:1px solid var(--rule)}
.es-swatch-name{font-size:12px;font-weight:600;color:var(--maroon);letter-spacing:.04em}
.es-swatch-hex{font-size:11px;color:var(--mute);font-variant-numeric:tabular-nums;letter-spacing:.06em}
.es-spec-faces{list-style:none;margin:0;padding:0;border-top:1px dashed var(--rule)}
.es-spec-faces li{display:flex;align-items:baseline;justify-content:space-between;gap:16px;padding:13px 0;border-bottom:1px dashed var(--rule)}
.es-face-sample{color:var(--maroon);line-height:1.1}
.es-face-serif{font-family:"Mirza",Georgia,serif;font-size:30px;font-weight:600}
.es-face-script{font-family:"Vintage Rotter","Yellowtail",cursive;font-size:26px;color:var(--olive)}
.es-face-mono{font-family:"Mont","Montserrat",sans-serif;font-size:22px;font-weight:700}
.es-face-meta{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--mute);white-space:nowrap}
.es-face-meta b{color:var(--maroon);font-weight:600}
```

- [ ] **Step 4: Typecheck, lint, build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```
Expected: all clean; no new lint errors. Confirm the removed rule is gone:
`grep -n "es-spec-img" src/components/portfolio/featured/EsmaPage.tsx || echo "clean"`

- [ ] **Step 5: Commit**

```bash
git add src/components/portfolio/featured/EsmaPage.tsx
git commit -m "feat(portfolio): Esma receipt, live palette/type spec, sign-off

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 7: Reduced-motion, responsive, final verification

**Files:**
- Modify: `src/components/portfolio/featured/EsmaPage.tsx`

- [ ] **Step 1: Grep the file for real `animation:` / `transition:` / `:hover{transform:…}` declarations** so the overrides target selectors that exist. Expect: `.es-modal`/`.es-modal-stage` (keyframes `es-fade`/`es-pop`), `.es-slot-img` transition + `.es-slot:hover .es-slot-img` transform, `.es-modal-close`, `.es-modal-nav` (+ its `:hover` transform, which must keep `translateY(-50%)` so the button stays vertically centred). **Only disable what exists — do not invent a selector.**

- [ ] **Step 2: Add the reduced-motion block** at the end of `styled-jsx global` (adjust to what Step 1 found):

```css
@media (prefers-reduced-motion: reduce){
  .es-modal,.es-modal-stage{animation:none}
  .es-slot-img,.es-modal-close,.es-modal-nav{transition:none}
  .es-slot:hover .es-slot-img{transform:none}
  .es-modal-nav:hover{transform:translateY(-50%)}
}
```
Do **not** disable the aisle's `scroll-snap-type` or horizontal overflow — those are layout, not motion.

- [ ] **Step 2b: Add the mobile lightbox override** (carried forward from the Task 5
  review). The nav buttons are positioned against the fixed `.es-modal`, not the
  ~92vw stage, so at narrow widths they overlap the artwork instead of sitting in the
  gutter. The sibling IYN page needed the same fix. Add inside the existing
  `@media (max-width:560px)` block:

```css
.es-modal{padding:12px}
.es-modal-stage{width:calc(100% - 88px);height:min(76vh,720px)}
.es-modal-nav{width:36px;height:36px;font-size:15px}
.es-modal-nav.prev{left:6px}.es-modal-nav.next{right:6px}
.es-modal-cap{left:12px;right:12px;font-size:12px}
```
Keep the stage's **definite height** here too — `height:min(76vh,720px)`, never
`max-height` alone (same regression guard as Task 5).

- [ ] **Step 3: Typecheck + lint**

```bash
npx tsc --noEmit && npm run lint
```
Expected: clean; no new errors.

- [ ] **Step 4: Interaction + responsive check** — `npm run dev` on a free port, load `/portfolio/esma-fine-foods` and confirm:
  - Loading transition plays, then the cream hero with the extracted logo on cream — **no white box behind it**.
  - The aisle scrolls horizontally and snaps; appetite slots carry a cream bottom-border, price slots olive.
  - Clicking a slot opens the styled lightbox with the post **fully visible, not cropped**; ← / → wrap across all 9; Esc closes.
  - Both films play from their extracted posters.
  - The receipt shows 7 line items; the palette/type spec renders three swatches and three type specimens.
  - Resize to ~880px and ~540px: lane/film/receipt grids stack, slots narrow to 220px, sign-off stacks.
  - Enable OS "Reduce motion" and reload: lightbox fade/pop off, slot hover lift off, aisle still scrolls.
  Stop the dev server afterwards.

- [ ] **Step 5: Full production build**

```bash
npm run build
```
Expected: succeeds; `/portfolio/esma-fine-foods` in the generated static routes.

- [ ] **Step 6: Final visual pass** — headless Chrome screenshot of the full page, plus a screenshot of one opened lightbox to prove the post is not cropped, and dump the `/portfolio` index DOM to confirm the Esma row reads `011 · Esma Fine Foods · Now showing · SOCIAL MEDIA · PHOTOGRAPHY · VIDEOGRAPHY`. Confirm no console errors.

- [ ] **Step 7: Commit**

```bash
git add src/components/portfolio/featured/EsmaPage.tsx
git commit -m "feat(portfolio): Esma reduced-motion guard, responsive polish

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Self-Review

**Spec coverage:**
- Integration (component, featured.ts, clients.ts promote + service reorder, frame 011) → Task 2 ✓
- LoadingTransition + maroon rail + cream hero (logo, kicker, script, headline, deck, band) → Task 3 ✓
- 01 Two lanes → Task 4 ✓
- 02 The aisle (9 posts, horizontal scroll-snap, lane colour-coding) + styled lightbox → Task 5 ✓
- 03 In store (both real films with extracted posters) → Tasks 1, 4 ✓
- 04 The receipt (7 items) + live palette/type spec (no fabricated image) → Task 6 ✓
- Sign-off → Task 6 ✓
- Media pipeline (9 posts, 2 films, 2 extracted posters, extracted+keyed logo) → Task 1 ✓
- Reduced-motion (without killing the aisle's scroll-snap) + responsive → Task 7 ✓
- Lightbox definite-height regression guard → Global Constraints + Task 5 Step 5 ✓
- Success criteria (route, index row, aisle, uncropped lightbox, films, receipt+spec, build clean) → Tasks 2, 5, 6, 7 ✓

**Placeholder scan:** No "TBD"/"handle edge cases". Task 1's poster-timestamp retry and logo-crop proof are adaptive by design with explicit accept/reject criteria; Task 7 Step 1 is a grep-first instruction. All code steps carry real code.

**Type consistency:** `LANES`/`AISLE`/`RECEIPT`/`SWATCHES`/`FACES` shapes match their consumers; `lightbox`/`openLightbox`/`closeLightbox`/`stepLightbox` consistent across Tasks 3–5; `getFrameNumber` → `frame` ("011") used in the rail and the lightbox brand line; every `AISLE[].src` path matches a file produced by Task 1's mapping table; `FACES[].cls` values match the CSS classes added in Task 6 Step 3.
