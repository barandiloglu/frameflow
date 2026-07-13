# ConnecTR — Featured Portfolio Case Study

**Date:** 2026-07-13
**Slug:** `connectr` (frame **007** in the roster)
**Branch:** stacked on `feat/aydin-cpa-case-study` (ships with the Aydın + ASD pages)
**Status:** Design approved — pending spec review

## Goal

Build a bespoke, production-grade featured case-study page for **ConnecTR 2025** —
the Turkish Community Fair (billed as the largest gathering of Turkic
entrepreneurship, culture and community in North America), held in Vaughan, ON.
FrameFlow covered the day end-to-end with **photography** and **videography**. The
page joins the eight existing featured pages (Aydın CPA and ASD Laminat are the
closest siblings) at their craft level, reusing the FF chrome (LoadingTransition,
keyboard lightbox, reduced-motion guard).

Narrative angle: **"More than a fair — a community gathered."** An event-coverage
case study. Deliverable 01 is the photography (five coverage tracks + a masonry
gallery of ~20 curated frames). Deliverable 02 is the event film — a styled
placeholder slot now, wired to a real inline `<video>` when the client sends the
final edit.

## Source material

- **Prototype (reference, not spec):** `/Users/barandiloglu/Downloads/connectr-preview.html`
- **Photos:** the client's own 2025 event gallery, **117 JPGs** at
  `https://connectr.ca/wp/gallery/IMG_<n>.jpg` (range IMG_5796–IMG_6208; ~400 KB
  each; verified HTTP 200 / image/jpeg). These are FrameFlow's own event coverage,
  published on the client's site — authorized for the agency's portfolio.
- **Logo:** `https://connectr.ca/brand/header-logo-ctr-map.png` (the header wordmark
  the hero brand card uses).
- **Video:** NOT yet available — the client will provide the final edit later. Until
  then the Videography section renders a styled "coming soon" slot.

### Curation — 20 frames across 5 coverage tracks

The 117 gallery photos are unnamed (`IMG_<n>.jpg`). The asset task downloads all
117, views them (via regenerated contact sheets or per-candidate reads), and picks
the single best real photo for each of the 20 slots below — ensuring variety and
that each track-based caption honestly matches the image. Captions stay
**track-based** (no naming of private individuals); exhibitor booths may reference
the exhibiting business's visible booth type. A candidate seed (from a thumbnail
review) is given per slot; the asset task confirms or swaps each by viewing
full-size (this verify-on-download step is mandatory — the seeds are hints, not
ground truth).

| # | Target name | Track | Caption (slate) | Span | Candidate seed |
|---|-------------|-------|-----------------|------|----------------|
| 01 | `01-guests-portrait`   | People     | Guests · Portrait      | tall | IMG_5811 / two-guest portrait |
| 02 | `02-conversation`      | People     | Candid · Talk          | —    | a two-person conversation |
| 03 | `03-art-easel`         | Culture    | Culture · Art          | wide | IMG_5838 (painting on easel) |
| 04 | `04-group`             | People     | Community · Group      | —    | IMG_5911 (group of attendees) |
| 05 | `05-topcu-booth`       | Exhibitor  | Exhibitor · Booth      | —    | IMG_5797 (Topcu booth) |
| 06 | `06-mavi-booth`        | Exhibitor  | Exhibitor · Travel     | —    | Mavi Travel booth |
| 07 | `07-ibiza-booth`       | Exhibitor  | Exhibitor · Furniture  | —    | IMG_5902 (Ibiza booth) |
| 08 | `08-atlantis-auto`     | Exhibitor  | Exhibitor · Auto       | —    | Atlantis Auto booth |
| 09 | `09-frameflow-booth`   | Connection | On site · FrameFlow    | —    | IMG_5834 (FrameFlow booth/shirt) |
| 10 | `10-honey-vendor`      | Vendor     | Vendor · Honey         | tall | IMG_5829 (honey jars) |
| 11 | `11-baklava-vendor`    | Vendor     | Vendor · Pastry        | —    | a baklava close-up |
| 12 | `12-food-vendor`       | Vendor     | Vendor · Food          | —    | Turkish food floor |
| 13 | `13-superb-auto`       | Showcase   | Showcase · Auto        | tall | IMG_5817 (black) or IMG_5822 (green) |
| 14 | `14-live-music`        | Culture    | Stage · Live music     | wide | IMG_5836 (guitarist) or a sax/duduk player |
| 15 | `15-behind-the-scenes` | Connection | Behind the scenes      | —    | IMG_5796 (FrameFlow videographer) |
| 16 | `16-handshake`         | Connection | Candid · Connection    | wide | a handshake |
| 17 | `17-networking`        | Connection | Candid · Network       | —    | a networking cluster |
| 18 | `18-candid-smile`      | People     | Candid · Smile         | —    | IMG_5933 (QR-sign smile) |
| 19 | `19-flag-portrait`     | People     | Portrait · Flag        | tall | portrait by the Turkish/Canada flag |
| 20 | `20-festival-context`  | Culture    | ConnecTR · The Fair    | —    | the ConnecTR festival banner |

The hero 4-photo strip reuses four of these (per the prototype: slots 01, 14, 16, 02
— a portrait, live music, a handshake, a conversation).

## Brand

- **Palette:** crimson `#C8102E`, crimson-deep `#9D0C24`, navy `#16244B`, navy-soft
  `#24345F`, sand `#D8CBB4`, off-white `#F7F5F1`, off-deep `#ECE7DD`.
- **Type:** **Fraunces** (serif deck + close line, ital + roman), **Montserrat**
  (700–900, titles + numerals), **Inter** (body 400–700). Google Fonts `<link>` with
  two preconnects (React 19 hoisting, as the sibling pages do).

## Architecture

One new self-contained client component, following the established featured-page
pattern (verified against `AydinCPAPage.tsx` / `ASDLaminatPage.tsx`):

- **File:** `src/components/portfolio/featured/ConnecTRPage.tsx`
- Fully bespoke: **its own sticky top rail and colophon** — no global `<Navbar>` /
  `<Footer>`.
- Styling via scoped `styled-jsx global` on a `.ctr-page` root, tokenized with the
  prototype's CSS-var system. Port the prototype's `<style>` (drop `.preview-banner`
  and the `*{}` reset; rescope bare `img{}` to `.ctr-page img{}`); add the marquee +
  reduced-motion deltas.
- **Props:** `{ client: Client }` (the `FeaturedPageProps` contract).

### Wiring

1. **`src/app/portfolio/[slug]/featured.ts`** — add `"connectr": ConnecTRPage` to
   `FEATURED_PAGES` and import it.
2. **`src/data/clients.ts`** — replace the minimal `connectr` entry with:
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
   }
   ```
   - Services unchanged `["Photography", "Videography"]` (both valid `Service` union
     members; Photography leads = Deliverable 01).
   - No `brand`/`logos`/`photos` scene data — the bespoke component renders
     everything.
   - Frame number derives from roster position (index 6 → "007"); no manual value.

### Shared primitives reused

- **`LoadingTransition`** — props `{ frameNumber, clientName, scope, location?, year? }`.
  Call with `frameNumber="007"`, `clientName="ConnecTR"`, `scope={["Photography", "Video"]}`,
  `location="Vaughan, ON"`, `year="2025"`.
- **Lightbox modal** — keyboard-accessible (Esc / ← / → ), body-scroll lock,
  `aria-modal`, wrap-around nav, focus-visible outlines. Used for the ~20 gallery
  frames (and the 4 hero-strip photos, which index into the same gallery array).

## Section flow (top → bottom)

1. **LoadingTransition** — `007 · CONNECTR · Photography · Video`.
2. **Sticky top rail** (`.ctr-rail`) — ← Portfolio · `CONNECTR · CASE STUDY` ·
   `FrameFlow · Reel 007 · 2025`.
3. **Hero** (`.ctr-hero`) — a crimson→navy accent band; left: crumb
   (`Case Study · Reel 007 · Vaughan, ON`), headline **"More than a fair — / *a
   community gathered.*"**, Fraunces deck, meta list (01 · Photography / 02 ·
   Videography / Where). Right: a white brand card with the real **ConnecTR logo** +
   a caption. Below: a **4-photo strip** (buttons → lightbox).
4. **Headline marquee** (`.ctr-marquee`, NEW) — kinetic infinite ticker of the five
   coverage tracks separated by crimson ✦. Seamless (duplicated track), `aria-hidden`.
5. **The brief** (`.ctr-brief`) — navy full-bleed band: crimson "THE BRIEF" stamp,
   **"Capture the room *so it feels like being there.*"**, paragraph, attribution rule.
6. **Deliverable 01 · Photography** (`.ctr-del`) —
   - Header: large crimson `01` (Montserrat 900) + label + title *"One floor, every corner."*
   - **Coverage tracks** (`.ctr-coverage`): 5 tracks (C.01 Exhibitors / C.02 Vendors /
     C.03 Culture / C.04 People / C.05 Connection), hover-lift.
   - **The gallery** (`.ctr-gallery`): the ~20 curated frames in a 4-col dense masonry
     (wide/tall spans per the curation table), hover slates + zoom cue, tap → lightbox.
7. **Deliverable 02 · Videography** (`.ctr-video`) — navy band. Header `02` +
   *"The day, in motion."* + a 16:9 **film slot**: a styled placeholder with a play
   glyph and "Event film — coming soon" (caption noting it's added when the edit
   lands). Structured so swapping in a real inline `<video controls playsInline
   poster>` later is a one-block change.
8. **Colophon** (`.ctr-colophon`) — palette swatches (crimson/navy/sand/off-white
   with hex), **"More than a fair. / *A community, on film.*"**, "Prepared by
   FrameFlow · Reel 007 · 2025", Start-a-project (`/contact`) + back-to-portfolio
   (`/portfolio`). Adds `.ctr-colophon-cta` / `.ctr-colophon-link` CSS (as the
   siblings did).
9. **Lightbox modal** — as described under shared primitives.

## Motion

- CSS-first: sticky rail, marquee, hover lift on hero strip / gallery cells /
  coverage cards.
- **`prefers-reduced-motion` guard** disables the marquee animation and hover
  transforms (marquee `.ctr-marquee-track`; `transform:none` on `.ctr-strip-img`/
  `.ctr-gallery .cell`/`.cov` hovers).

## Asset pipeline → `public/portfolio/connectr/`

Prerequisite tools (ffmpeg + pngquant) already installed.

- **`logo.png`** — download `connectr.ca/brand/header-logo-ctr-map.png`; keep as PNG
  (transparent), no heavy compression needed beyond a size check.
- **`photos/`** — download all 117 gallery JPGs, curate the 20 per the table above
  (verify each by viewing), copy to the descriptive names, and compress for web
  (target ≤ ~350 KB each; sources are ~400 KB, JPEG quality re-encode via ffmpeg
  `-q:v`). Landscape/portrait preserved.
- **`video/`** — created empty / omitted for now; wired later.

## Scope guardrails (YAGNI)

- Gallery shows the **20 curated frames** — not all 117.
- **Video is a placeholder** until the client provides the edit — no fake/stock video.
- Captions stay **track-based** — respectful, no invented names of individuals.
- Logo sourced from the client's own site.
- No prev/next adjacent-client nav (featured pages end on the bespoke colophon).

## Success criteria

- `/portfolio/connectr` renders the bespoke page (not the templated `ClientPage`).
- The portfolio index (`/portfolio`) shows ConnecTR as frame **007** with a
  "Now showing" pill (from `featured: true`) and services `PHOTOGRAPHY · VIDEOGRAPHY`.
- The hero shows the real ConnecTR logo; the 4-photo strip + all 20 gallery frames
  open in a keyboard-navigable lightbox; captions match the images.
- The Videography section renders the styled placeholder slot (no broken video).
- `prefers-reduced-motion` is honored across all animations.
- Type-checks and builds clean; responsive at the sibling breakpoints (~880 / ~520px).

## Follow-up (out of scope for this build)

- When the client sends the event film, swap the `.ctr-video` placeholder for a real
  inline `<video>` (or YouTube/Vimeo embed) — a single-section change.
