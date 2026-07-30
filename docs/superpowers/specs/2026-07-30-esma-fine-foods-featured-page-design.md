# Esma Fine Foods — Featured Portfolio Case Study

**Date:** 2026-07-30
**Slug:** `esma-fine-foods` (frame **011**)
**Branch:** stacked on `feat/aydin-cpa-case-study`
**Status:** Design approved — pending spec review

## Goal

Build a bespoke, production-grade featured case-study page for **Esma Fine Foods**, a
grocery store on Jane Street in Concord, ON — Turkish bakery counter at one end,
weekly produce deals at the other. FrameFlow runs its social media: appetite
photography, price boards, and in-store films.

Narrative angle: **"A grocery feed has two jobs."** Make you hungry, and make you
feel clever about money. The page is organised around **two lanes** — Appetite
(photograph, script name, no numbers) and Price (grid, weights, old price struck
through) — held together by one palette. The structure borrows the store itself: an
**aisle** you scroll sideways, and a **receipt** at the end.

## Source material

- **Prototype (reference, not spec):** `/Users/barandiloglu/Downloads/esma-preview.html`
- **Provided assets:** `/Users/barandiloglu/Downloads/Esma Portfolio/` — 9 images
  (all 1131×1600) + 2 videos. Mapping verified by viewing every file:

  | Source file | Content | Lane | Target |
  |---|---|---|---|
  | `…10.00.54.jpeg`     | "Fresh & Organic / Grocery", wire basket + green tote, SAVE 25% bubble, address bar | Appetite | `appetite/01-grocery.jpg` (A.01) |
  | `…10.00.44.jpeg`     | "Fresh Deals THIS WEEK" — 8 product cards with weight + price | Price | `price/01-fresh-deals-week.jpg` (P.01) |
  | `…10.00.54 (1).jpeg` | "Choose your taste!" — lahmacun close-up, script headline | Appetite | `appetite/02-choose-your-taste.jpg` (A.02) |
  | `…10.00.44 (1).jpeg` | "Weekend Fresh Deals · up to 30% off" — 9 produce cards, per kg, old prices struck | Price | `price/02-weekend-deals.jpg` (P.02) |
  | `…10.00.54 (2).jpeg` | "Pide" — loaves in a brown paper bag, dark ground | Appetite | `appetite/03-pide.jpg` (A.03) |
  | `…10.00.44 (2).jpeg` | Pınar Creamy Labneh 2×500gr, $12.00 struck → $7.00 | Price | `price/03-labne.jpg` (P.03) |
  | `…10.00.54 (3).jpeg` | "Simit" — sesame simit on a white plate, flour bowl, coral napkin | Appetite | `appetite/04-simit.jpg` (A.04) |
  | `…10.00.44 (3).jpeg` | "SPECIAL DISCOUNT" $12 → $7, round pide in an olive frame | Price | `price/04-pide-discount.jpg` (P.04) |
  | `…10.00.54 (4).jpeg` | "Sandwich" — stacked club sandwich on a black plate | Appetite | `appetite/05-sandwich.jpg` (A.05) |
  | `WhatsApp Video …10.00.37 (1).mp4` | 608×1080, **89.8s** | — | `video/pov-reel.mp4` (Store POV, 1:30) |
  | `WhatsApp Video …10.00.37.mp4` | 720×1280, **14.7s** | — | `video/baklava.mp4` (Baklava tasting, 0:15) |

  Both durations independently confirm the prototype's "1:30" and "0:15" claims.
  Every prototype `alt` and `note` matches the image it is attached to.

- **Logo:** not supplied as a standalone file. **Extracted** from the Pınar Labne
  card, which carries the largest clean olive wordmark on white. Cropped to the mark
  (290×320) and keyed to transparency by deriving alpha from luminance
  (`alpha = clip((255 − luma) × 1.62, 0, 255)`) while forcing RGB to the brand olive,
  so antialiased edges carry no white fringing. Verified by compositing over the hero
  cream: no white box, no halo, leaf veining preserved.
- **Spec sheet:** the prototype references a `brand/spec-sheet.jpg` that does not
  exist. It is **not fabricated**. Section 04 instead renders the palette and type
  system **live in HTML** — three swatches with hex values and three typeface
  specimens. This is FrameFlow describing the system it built, not a mocked-up client
  brand document, and it stays crisp at any size.

## Brand

- **Palette:** maroon `#3B0F0E`, cream `#F6EAC7`, olive `#5C6C40`, paper `#FFFDF7`,
  ink `#2C1A17`, mute `#8C7F6B`, rule `rgba(59,15,14,.16)`.
- **Type:** **Mirza** (serif headlines) + **Yellowtail** (script) + **Montserrat**
  (grids/UI), via Google Fonts `<link>` with two preconnects. The prototype's stacks
  name the brand's own faces first — `"Vintage Rotter","Yellowtail"` and
  `"Mont","Montserrat"` — and are **kept verbatim**, so the real faces are used if
  ever installed locally while the Google faces ship as the working fallback. (Same
  treatment as IYN's "Garet".)

## Architecture

One new self-contained client component, following the established featured-page
pattern:

- **File:** `src/components/portfolio/featured/EsmaPage.tsx`
- Fully bespoke: **its own sticky maroon rail and sign-off footer** — no global
  `<Navbar>` / `<Footer>`.
- Styling via scoped `styled-jsx global` on an `.es-page` root. Port the prototype's
  `<style>` (drop the `*{}` + `body{margin:0}` reset); add the styled-lightbox and
  reduced-motion deltas.
- **Props:** `{ client: Client }`.
- **Includes `LoadingTransition`** — consistent with every other featured page.

### Wiring

1. **`featured.ts`** — add `"esma-fine-foods": EsmaPage`.
2. **`clients.ts`** — promote the `esma-fine-foods` entry:
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
   }
   ```
   - Services **reordered** to `["Social Media", "Photography", "Videography"]` (same
     three tags; Social Media leads, matching the prototype's kicker and the receipt's
     "Scope: Social media"). Approved.
   - Frame derives from roster position (index 10 → "011"); never hardcoded.

### Shared primitives reused

- **`LoadingTransition`** — `frameNumber="011"`, `clientName="Esma Fine Foods"`,
  `scope={["Social", "Photography", "Video"]}`, `location="Concord, ON"`, `year`.
- **Styled lightbox** — the framed-stage pattern from the sibling pages, in Esma's
  tokens (deep-maroon backdrop, paper stage, olive accents): counter + brand + close
  on top, image on a tinted mat, the shelf label and note below. Keyboard (Esc / ← /
  →), body-scroll lock, `aria-modal`, wrap-around, reduced-motion guarded. Used for
  the 9 aisle posts.
  **Critical sizing note:** the stage must carry a **definite height** (not
  `max-height` alone) with the image at `object-fit: contain`. A `max-height`-only
  stage resolves to `auto`, the image's percentage height is then ignored, and the
  post renders at natural size and is clipped — the exact bug fixed on the IYN page.

## Section flow (top → bottom)

1. **Sticky maroon rail** (`.es-rail`) — ← Portfolio · `Esma Fine Foods` ·
   `Concord, ON · Reel 011`.
2. **Hero** (`.es-hero`, cream) — centred: the extracted olive logo, the kicker
   ("Social Media"), the script line "Fresh & Organic", the headline **"A grocery feed
   has two jobs."**, the deck, and a three-colour band (maroon / olive / paper).
3. **01 · Two lanes** (`.es-lanes`) — two cards: **Appetite** (maroon ground, rule
   "Photograph, script name, no numbers") and **Price** (olive ground, rule "Grid,
   weights, old price struck through"), each with its rationale.
4. **02 · The aisle** (`.es-aisle-sec`, maroon) — the **9 posts in a horizontally
   scrolling, snap-aligned aisle** with a "scroll sideways →" hint. Each slot is a
   button: the post image (bottom-border colour-coded by lane — cream for appetite,
   olive for price), then a cream tag strip with the `A.0x`/`P.0x` id and the shelf
   label. Tap → styled lightbox showing the shelf name and its note.
5. **03 · In store** (`.es-film`) — both **real films** side by side as inline
   `<video controls preload="none" poster>`: the 1:30 Store POV and the 0:15 Baklava
   tasting, each with its caption.
6. **04 · The receipt** (`.es-receipt-sec`, cream) — a dashed itemised receipt
   (store name + address header, 7 line items with dotted leaders, a "Scope · Social
   media" total, and a script "Thank you — come again" footer) beside the
   **live-rendered palette/type spec**: three swatches with hex values and three
   typeface specimens, captioned "Three colours, three faces."
7. **Sign-off** (`.es-signoff`) — Client / Where / By FrameFlow, plus a
   back-to-portfolio link.

## Motion

CSS-first: sticky rail, the aisle's scroll-snap, slot hover lift, lightbox fade+pop.
A **`prefers-reduced-motion`** block disables the lightbox animations, the slot hover
transform, and the nav/button transitions — targeting only selectors that exist.
Note the aisle's `scroll-snap-type` and horizontal overflow are layout, not
animation, and stay intact under reduced motion.

## Asset pipeline → `public/portfolio/esma-fine-foods/`

- **`appetite/`** — 5 posts, **`price/`** — 4 posts, per the mapping table, compressed
  for web (≤ ~350 KB each; sources are 169–407 KB at 1131×1600).
- **`video/`** — both films transcoded (H.264, faststart; the 11.8 MB POV reel to
  ≤ ~10 MB, the 1.3 MB baklava clip is already small) plus **posters extracted from
  the footage** (`pov-poster.jpg`, `baklava-poster.jpg`) — the prototype references
  posters that were not supplied, and a representative frame is the honest source.
- **`brand/logo-olive.png`** — the extracted, keyed transparent wordmark described
  above.

## Scope guardrails (YAGNI)

- The **9 provided posts** — no invented creatives.
- **Both films are real**; no stock, no placeholder slots.
- **No fabricated brand document** — the spec sheet is rendered in code.
- Receipt copy and lane rules verbatim from the approved prototype.
- No prev/next adjacent-client nav.

## Success criteria

- `/portfolio/esma-fine-foods` renders the bespoke page (not the templated `ClientPage`).
- The portfolio index shows Esma Fine Foods as frame **011** with a "Now showing" pill
  and services `SOCIAL MEDIA · PHOTOGRAPHY · VIDEOGRAPHY`.
- The aisle scrolls horizontally and snaps; all 9 posts open in a keyboard-navigable
  styled lightbox **fully visible, not cropped**, with the correct shelf label and note.
- Both films play inline from their extracted posters.
- The receipt renders its 7 line items; the palette/type spec renders live beside it.
- `prefers-reduced-motion` is honored; type-checks and builds clean; responsive at the
  prototype's breakpoints (~900 / ~560px).
