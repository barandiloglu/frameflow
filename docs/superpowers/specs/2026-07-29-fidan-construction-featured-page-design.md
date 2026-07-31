# Fidan Construction — Featured Portfolio Case Study

**Date:** 2026-07-29
**Slug:** `fidan-construction` (frame **012**; presented as **Work Order FF-012**)
**Branch:** stacked on `feat/aydin-cpa-case-study` (ships with the Aydın + ASD + ConnecTR pages)
**Status:** Design approved — pending spec review

## Goal

Build a bespoke, production-grade featured case-study page for **Fidan Construction**,
an Ottawa contractor (8 years, 1,000+ projects). FrameFlow ran **Ad Management +
Website Design + SEO** to shift the front of the business from a homeowner pitch to
a **B2B buyer** (property/building managers who buy unit turnovers by the building).
It joins the featured pages, but in its **own distinct "work order / blueprint"
voice** — it does NOT use the film-reel LoadingTransition or the ✦ marquee that the
other pages share (per the approved direction). It DOES reuse the styled lightbox
(adapted to ink/paper/red) and `prefers-reduced-motion` guards.

Narrative angle: **"They build. We built what brings the work in."**

## Source material

- **Prototype (reference, not spec):** `/Users/barandiloglu/Downloads/fidan-preview.html`
- **Creative assets (5, provided):** 5 before/after job creatives (Fidan's own work,
  produced by FrameFlow), in `/Users/barandiloglu/Downloads/`:
  | File | Headline on image | → slot | hook / payoff line |
  |------|-------------------|--------|--------------------|
  | `WhatsApp Image 2026-07-29 at 13.38.36.jpeg`     | "FROM DEMO TO CLEAN FINISH - 2 DAYS" | `01-demo-to-clean-finish` | Scope of work · "From demo to clean finish — 2 days." |
  | `WhatsApp Image 2026-07-29 at 13.38.36 (1).jpeg` | "TURNOVER READY IN 48 HOURS"          | `02-turnover-ready`       | Turnover speed · "Turnover ready in 48 hours." |
  | `WhatsApp Image 2026-07-29 at 13.38.36 (2).jpeg` | "VACANT UNITS COST YOU MONEY"         | `03-vacant-units`         | Vacancy math · "Vacant units cost you money." |
  | `WhatsApp Image 2026-07-29 at 13.38.36 (3).jpeg` | "ONE TEAM START TO FINISH"            | `04-one-team`             | One vendor · "One team, start to finish." |
  | `WhatsApp Image 2026-07-29 at 13.38.37.jpeg`     | "FLAWLESS FINISH NO CALLBACKS"        | `05-flawless-finish`      | Trade quality · "Flawless finish, no callbacks." |

  (Mapping verified by viewing each image. Images are vertical/reel-format
  before-afters; the grid renders them at native aspect via `width:100%;height:auto`.)
- **Website screenshots (4, to capture):** all four pages of `https://fidanconstruction.com`
  are live (verified HTTP 200): `/property-managers` (the B2B page FrameFlow built),
  `/` (home), `/services`, `/projects`. Captured full-page via headless Chrome.

## Brand

- **Palette:** ink `#0C0C0D`, paper `#F4F2EE`, red `#E2231A`, grey `#8A8A86`,
  rule `rgba(12,12,13,.16)`.
- **Type:** **Anton** (display headlines/numerals), **Inter** (body 400–600),
  **JetBrains Mono** (labels, stamps, meta 400/500/700). Google Fonts `<link>` with
  two preconnects (incl. `crossOrigin=""` on gstatic).

## Architecture

One new self-contained client component, following the established featured-page
pattern (verified against `AydinCPAPage.tsx` / `ConnecTRPage.tsx`):

- **File:** `src/components/portfolio/featured/FidanConstructionPage.tsx`
- Fully bespoke: **its own sticky work-order rail and sign-off footer** — no global
  `<Navbar>` / `<Footer>`, and **no** `LoadingTransition`.
- Styling via scoped `styled-jsx global` on a `.fx-page` root, tokenized with the
  prototype's CSS-var system. Port the prototype's `<style>` (drop the `*{}` reset;
  rescope bare `body`/`img`-type rules under `.fx-page`); add the styled-lightbox +
  reduced-motion deltas.
- **Props:** `{ client: Client }` (the `FeaturedPageProps` contract).

### Wiring

1. **`src/app/portfolio/[slug]/featured.ts`** — add `"fidan-construction": FidanConstructionPage`
   to `FEATURED_PAGES` and import it.
2. **`src/data/clients.ts`** — replace the minimal `fidan-construction` entry with:
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
   }
   ```
   - Services **reordered** to `["Ad Management", "Website Design", "SEO"]` (same three
     tags; primary Ad Management leads, matching Scope 01/02/03). Approved.
   - No `brand`/`logos`/`photos` scene data — the bespoke component renders everything.
   - Frame number derives from roster position (index 11 → "012"); no manual value.
     The page presents it as "Work Order **FF-012**" (uses the `012` from `getFrameNumber`).

### Shared primitives reused

- **Styled lightbox** — the same framed-stage lightbox added to the sibling pages,
  adapted to Fidan's tokens (ink backdrop, paper stage, red accents, JetBrains-Mono
  bars): top bar with `★ Frame NN / 05` counter + `FIDAN · FF-012` brand + close,
  the image on a dark mat, a bottom bar with the hook/line caption, round nav
  arrows, fade+pop entrance. Keyboard-accessible (Esc / ← / → ), body-scroll lock,
  `aria-modal`, wrap-around, reduced-motion guarded.
- **No** LoadingTransition, **no** marquee.

## Section flow (top → bottom) — ports the prototype

1. **Sticky work-order rail** (`.fx-rail`) — ← Portfolio · `WORK ORDER FF-012 ·
   FIDAN CONSTRUCTION` · `OTTAWA, ON · 2026`. Ink bg, red bottom border.
2. **Hero** (`.fx-hero`) — ink band. Left: kicker (B2B stamp + "Ad Management ·
   Website Design · SEO"), headline **"THEY BUILD. / WE BUILT *WHAT BRINGS* / *THE
   WORK IN.*"**, deck, 3-fact `<dl>` (We ran / We shifted / We built). Right: a
   **BUILD SHEET** aside with a working **BEFORE ⇄ AFTER toggle** (React `phase`
   state) rendering the 5 rows (Buyer / Paid channel / Creative / Landing / Lead
   intake), "after" values emphasized. Below: the trades `<ul>` (Unit Turnovers,
   Water Damage, Asbestos (O. Reg. 278/05), Painting, Drywall & Plaster).
3. **Scope of work** (`.fx-scope`) — section head + 3 `.fx-row` line items:
   01 Ad Management (Meta · IG+FB · Ottawa +50km), 02 Website Design
   (fidanconstruction.com/property-managers · Live), 03 SEO (Local · Ottawa metro).
4. **The creative system** (`.fx-creative`) — ink band. Intro paragraph, then the
   **5-asset grid** (`.fx-sheet`): each cell = red hook tag + the creative image +
   a mono payoff line; tap → **styled lightbox**. Display order per the prototype:
   02, 03, 01, 04, 05.
5. **The landing page** (`.fx-land`) — copy column (URL, two paragraphs, a red
   pull-note) + a **3-step ladder** (Submit the form / 30-min walkthrough / Written
   quote in 48 hours). Then a **browser-chrome site window** (`.fx-site`): a shot
   bar (dots + URL + "BUILT BY US" on the property-managers tab + "● LIVE"), a
   **tab-switcher** (React `si` state) over the 4 captured screenshots in a
   scrollable window, prev/next + count + "Visit this page ↗", and a figcaption note
   per tab.
6. **Punch list** (`.fx-punch`) — ink band. 7 delivered items (2-col), each a red
   tick + mono label + description.
7. **Sign-off footer** (`.fx-signoff`) — 3-col grid: PREPARED BY FrameFlow · WORK
   ORDER FF-012 · STATUS (red), + back-to-portfolio link (`/portfolio`).

## Interactivity (ported from the prototype as React state)

- **Build-sheet toggle** — `phase: "before" | "after"` (default "after"); toggles the
  5 rows' values and the button `.on`/`.on.red` states.
- **Site tab-switcher** — `siteTab: number` (0–3); paints the active screenshot, URL,
  "BUILT BY US" visibility (only on property-managers), count, visit href, caption;
  prev/next wrap; the window scrolls internally (`overflow-y:auto`).
- **Creative lightbox** — `lightbox: number | null`; open/step(wrap mod 5)/close,
  keyboard (Esc/←/→), body-scroll lock with cleanup, backdrop-click closes.
- All hover/animation guarded by `prefers-reduced-motion`.

## Motion

- CSS-first: hover image scale on creative cells, toggle/tab transitions, lightbox
  fade+pop.
- **`prefers-reduced-motion` guard** disables the creative-cell hover scale, the
  lightbox fade/pop, and the nav transitions (targeting only selectors that exist).

## Asset pipeline → `public/portfolio/fidan-construction/`

Prerequisite tools (ffmpeg + pngquant) already installed.

- **`ads/`** — copy the 5 provided JPEGs to their descriptive names (table above),
  compress for web (target ≤ ~300 KB each; verify each placed file matches its
  hook/headline by viewing).
- **`website/`** — capture the 4 live pages full-page via headless Chrome at a
  desktop width (~1440), save as `property-managers.jpg`, `home.jpg`, `services.jpg`,
  `projects.jpg`; downscale width to ~1200 and compress (target ≤ ~500 KB each; these
  are long full-page shots displayed in a scrollable window).

### Capturing the site shots (asset task)

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
# full-page screenshot per page, e.g.:
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=1440,2400 \
  --virtual-time-budget=8000 --screenshot=/tmp/fx-pm.png \
  "https://fidanconstruction.com/property-managers"
```
Use a tall window and let full-page content render; if a page is taller than the
window, increase `--window-size` height. Then downscale/compress to the `website/`
names. Read each captured shot to confirm it's the right page and rendered fully.

## Scope guardrails (YAGNI)

- Creative system shows the **5 provided assets** — no invented creatives.
- Website section shows the **4 captured live pages** — real screenshots, not mockups.
- **No** film-reel LoadingTransition and **no** ✦ marquee (would clash with the
  work-order voice) — this page keeps its own identity.
- Port the prototype's own interactions (build-sheet toggle, site tabs) rather than
  replacing them.
- Copy/metrics verbatim from the approved prototype.
- No prev/next adjacent-client nav (ends on the bespoke sign-off).

## Success criteria

- `/portfolio/fidan-construction` renders the bespoke page (not the templated `ClientPage`).
- The portfolio index (`/portfolio`) shows Fidan Construction as frame **012** with a
  "Now showing" pill (from `featured: true`) and services `AD MANAGEMENT · WEBSITE
  DESIGN · SEO`.
- The build-sheet toggle flips all 5 rows; the site tab-switcher swaps all 4
  screenshots + captions; the 5 creatives open in a keyboard-navigable styled
  lightbox with matching captions.
- `prefers-reduced-motion` is honored across all animations.
- Type-checks and builds clean; responsive at the prototype's breakpoints (~940 / ~560px).
