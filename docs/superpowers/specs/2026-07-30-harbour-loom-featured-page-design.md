# Harbour Loom — Featured Portfolio Case Study

**Date:** 2026-07-30
**Slug:** `harbourloom` (frame **014**)
**Branch:** stacked on `feat/aydin-cpa-case-study`
**Status:** Design approved — pending spec review

## Goal

Build a bespoke, production-grade featured case-study page for **Harbour Loom**, a
flat-woven cotton textile brand selling into three different markets. FrameFlow made
the mark, shot the photography, cut the reels and runs the feed.

Narrative angle: **"Shot close for the beach. Wide for the water. Clean for the trade."**
One brand, three buyers, three incompatible visual registers — and the argument that
what holds them together is the mark. The page follows the split, then closes on the
thing that survives it.

## Source material

- **Prototype (reference, not spec):** `/Users/barandiloglu/Downloads/harbourloom-preview.html`
- **Provided assets:** `/Users/barandiloglu/Downloads/Harbourloom/` — 5 stills
  (all 1080×1350) + 2 reels (both 720×1280 vertical). Every file was viewed.

The mapping is an exact 1:1 onto the prototype's slots — nothing missing, nothing spare:

| Source | Content | → Target |
|---|---|---|
| `…15.46.53.jpeg` | Triptych: towel on sand · dune footprints at sunset · fringed edge macro. Line: *"Let the footprints fade. Keep the feeling. A tangible piece of a perfect day."* | `posts/01-beach-triptych.jpg` (B.01) |
| `…15.46.53 (1).jpeg` | Hero orange towel over driftwood + 3 supports (weave detail, sunset shore, sunset sky). Line: *"Mother Nature is our muse. And our toughest rival."* | `posts/02-muse.jpg` (B.02) |
| `…15.46.53 (2).jpeg` | Macro of pink-and-orange weave folded over blue cloth. No copy. | `posts/03-weave-macro.jpg` (B.03) |
| `…15.46.53 (3).jpeg` | Three folded white towels on marble, pure white ground. Line: *"We tried to photograph a cloud. This was the best we could do."* | `posts/04-b2b-cloud.jpg` (W.01) |
| `…15.46.53 (4).jpeg` | Poolside: wicker baskets of rolled towels, resort pool, palms. Line: *"You create the picture-perfect oasis for your guests…"* | `posts/05-b2b-hospitality.jpg` (W.02) |
| `…15.47.05.mp4` | 720×1280, **16.73s** — towels on a fence, pattern after pattern, closing *"Which one is yours?"* | `video/beach-reel.mp4` (0:17) |
| `…15.47.05 (1).mp4` | 720×1280, **24.73s** — drone over a catamaran, moored yacht, marina, closing on the mark | `video/marine-reel.mp4` (0:25) |

Both durations independently confirm the prototype's "0:17" and "0:25".

### Prototype claims corrected against the artwork

The prototype paraphrased its own material in five places. Each is fixed:

| Prototype says | Artwork actually shows |
|---|---|
| Beach reel: *"The towel, the sand, the light, in that order."* | Not a progression — a **range pitch**: "On any given beach there are a hundred different stories. A hundred different styles. **Which one is yours?**" |
| B2B: *"the sand goes, the sunset goes… stacked on marble against pure white — the only place the product gets photographed like a product"* | True of W.01 only. **W.02 is warm poolside lifestyle** — wicker, palms, a pool. The division has two registers, not one. |
| B.01 line ends *"Keep the feeling."* | Artwork adds a third line: **"A tangible piece of a perfect day."** |
| W.02 line: *"You create the picture-perfect oasis. We supply the textiles to complete it."* | Artwork: *"…oasis **for your guests**. We supply the **high-performance** textiles to complete it. **Let's ensure your service never misses a beat.**"* |
| B.03 alt: *"coral and blue weave"* | The weave is **pink and orange**, folded over a blue cloth. |

**Verified accurate and kept verbatim:** the Marine body's "a catamaran cutting a line
across the lake, twin wakes behind it" — a high-resolution crop of the drone opener
confirms twin hulls and two distinct wakes. Also the three-division framing, B.02's
"one hero frame, three supporting", and B.03's "shot close enough to count threads".

### The mark

No standalone logo file was supplied, but the mark — a sailboat above "HARBOUR" in
serif caps over "Loom" in script — is embedded in every asset. **Extracted** from
`posts/04-b2b-cloud.jpg`, where it sits navy on pure white at the top of the frame:
the cleanest source available. Keyed to transparency by deriving alpha from luminance
so antialiased edges carry no white fringing, then verified by compositing over the
hero shell colour.

**Verified claim, and the basis of section 04:** the mark closes **all seven pieces** —
navy on the two white-ground posts (B.01, W.01), reversed white on the three
photographic ones (B.02, B.03, W.02), and as the closing card of both reels. That is a
real, demonstrable two-colourway system.

**Scope note:** the user confirms FrameFlow designed the mark, so `Logo` stays in the
services. But the folder contains **no lockup sheet, no colour or type spec, and no
source files** — so the page shows the mark and its two colourways as they actually
appear in the work, and claims nothing further. No fabricated brand document, per the
precedent set on the Esma page.

## Brand

- **Palette:** ink `#1D2B33`, sea `#2E7BA6`, coral `#E8763F`, sand `#F2E9DD`,
  shell `#FAF6F0`, paper `#FFF`, mute `#8A8378`, rule `rgba(29,43,51,.14)`.
- **Type:** **Cormorant Garamond** (300/400/600 + italic) for display, **Jost**
  (300/400/500) for UI and body, via Google Fonts with two preconnects. The prototype's
  display stack names the brand's own face first — `"Juana","Cormorant Garamond",Georgia,serif` —
  and is **kept verbatim**, so the real face is used if ever installed while Cormorant
  ships as the working fallback. Same treatment as IYN's Garet and Esma's Vintage Rotter.

## Architecture

- **File:** `src/components/portfolio/featured/HarbourLoomPage.tsx`
- Fully bespoke: own sticky rail and sign-off — no global `<Navbar>`/`<Footer>`.
- Scoped `styled-jsx global` on a `.hl-page` root. Port the prototype's `<style>`,
  dropping the `*{}` + `body{margin:0}` reset (it would leak site-wide).
- **Props:** `{ client: Client }`. Includes `LoadingTransition`, as every sibling does.

### Wiring

1. **`featured.ts`** — add `"harbourloom": HarbourLoomPage`.
2. **`clients.ts`** — promote the `harbourloom` entry in place (index 13 → frame `014`;
   never hardcoded):
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
   }
   ```
   - **`name` changes from "Harbourloom" to "Harbour Loom"** (two words), matching the
     logo lockup and the prototype. Approved. The **slug stays `harbourloom`** — no URL
     or route changes, and the array position is untouched so no other client's frame
     number shifts.
   - Services unchanged: all four confirmed by the user.

### Shared primitives reused

- **`LoadingTransition`** — `frameNumber="014"`, `clientName="Harbour Loom"`,
  `scope={["Logo", "Photography", "Social", "Film"]}`, `location="Ontario"`, `year`.
- **Styled lightbox** in Harbour Loom's tokens (deep-ink backdrop, paper stage, coral
  accents). Keyboard (Esc / ← / →), body-scroll lock, `aria-modal`, wrap-around across
  all 5 stills, reduced-motion guarded.
  **The prototype's modal is the old plain pattern** (`.hl-modal-inner` / `.hl-modal-img`
  / `.hl-modal-x`) and is **replaced**, matching the other featured pages.
  **Critical sizing note:** the stage must carry a **definite height** with the image at
  `object-fit: contain`, at every breakpoint. A `max-height`-only stage resolves to
  `auto`, the image's percentage height is ignored, and the post renders at natural size
  and is clipped — the bug shipped on IYN, prevented on Esma and MinAuto. Stills are
  1080×1350 portrait.

## Section flow

1. **Sticky rail** (paper, hairline rule) — ← Portfolio · `Harbour Loom` ·
   `Logo · Photography · Social · Film — Reel 014`.
2. **Hero** (shell) — centred: the extracted navy mark, kicker, the three-line headline
   **"Shot close for the beach. / *Wide for the water.* / Clean for the trade."**, the
   deck, and the five-colour strip (sand / coral / shell / sea / ink).
3. **The Three Lines** — three columns: Beach (macro & still), Marine (aerial & moving),
   B2B (studio & clean), each with its camera register and buyer.
4. **01 · Beach** (sand ground) — lead, body, the **3 beach stills** in an editorial
   grid opening the styled lightbox, then the **0:17 beach reel** inline.
5. **02 · Marine** (deep ink gradient) — the **0:25 drone reel** beside the copy. The
   cold-light / motion / wide inversion of Beach.
6. **03 · B2B** (paper) — lead, corrected body acknowledging **both** registers, then
   the **2 B2B stills**.
7. **04 · One Mark** — the payoff. The extracted mark in **both colourways as they
   actually appear** (navy on white ground, reversed on photography), with the verified
   note that it closes all seven pieces. No invented lockup sheet or spec.
8. **Sign-off** — Client / Scope / By FrameFlow + back-to-portfolio.

## Motion

CSS-first: sticky rail, cell hover scale, lightbox fade+pop. A
`prefers-reduced-motion` block disables the lightbox animations, the `.hl-cell` hover
scale and button transitions, targeting only selectors that exist.

## Asset pipeline → `public/portfolio/harbourloom/`

- **`posts/`** — 5 stills, web-compressed (≤ ~350 KB each; sources 100–413 KB).
- **`video/`** — both reels transcoded (H.264, faststart) plus **posters extracted from
  the footage** — the prototype references posters that were not supplied, and a
  representative frame is the honest source. The marine poster should be the drone
  opener; the beach poster a towels-on-fence frame, not the closing logo card.
- **`brand/logo-navy.png`** — extracted and keyed as described.
- **`brand/mark-navy.png` / `brand/mark-reversed.png`** — the two colourway crops for
  section 04, taken from `04-b2b-cloud` and `02-muse` respectively.

## Scope guardrails (YAGNI)

- The **5 provided stills and 2 real reels** — no invented creatives.
- **No fabricated brand document.** Section 04 shows only colourways evidenced in the work.
- The prototype's vestigial `muted` division flag (all three are `false`) is dropped.
- No prev/next adjacent-client nav.

## Success criteria

- `/portfolio/harbourloom` renders the bespoke page; index shows frame **014**,
  "Now showing", `LOGO · PHOTOGRAPHY · SOCIAL MEDIA · VIDEOGRAPHY`, and the name
  **Harbour Loom**.
- All 5 stills open in a keyboard-navigable styled lightbox **fully visible, not
  cropped**, showing the corrected artwork lines.
- Both reels play inline from extracted posters.
- Section 04 shows both mark colourways; no invented spec sheet anywhere.
- `prefers-reduced-motion` honored; type-checks, lints and builds clean; responsive at
  the prototype's breakpoints (~980 / ~560px).
