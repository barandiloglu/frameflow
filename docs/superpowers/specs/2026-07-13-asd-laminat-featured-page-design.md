# ASD Laminat — Featured Portfolio Case Study

**Date:** 2026-07-13
**Slug:** `asd-laminate` (frame **003** in the roster)
**Branch:** stacked on `feat/aydin-cpa-case-study` (ships together with the Aydın page)
**Status:** Design approved — pending spec review

## Goal

Build a bespoke, production-grade featured case-study page for **ASD Laminat**, a
65-year high-pressure-laminate manufacturer (ships to 85+ countries) that FrameFlow
introduced to the Canadian market. It joins the seven existing featured pages
(Big Bears, Destan, Canapy, CTBDH, Adrian's, Northern Pathways, Aydın CPA) at their
craft level — a self-contained component with its own art direction, reusing the FF
chrome (LoadingTransition, keyboard lightbox, reduced-motion guard).

Narrative angle: **"One market. Every channel."** A 65-year manufacturer, new to the
Canadian conversation. Deliverable 01 proves the *creative* (a five-pillar social
system); Deliverable 02 proves the *reach* (a coordinated three-channel ad push with
real campaign numbers).

## Source material

- **Prototype (reference, not spec):** `/Users/barandiloglu/Downloads/asd-portfolio-preview.html`
- **Posts:** `/Users/barandiloglu/Downloads/ASD Social Media Posts/` (31 PNGs; 9 curated for the feed)
- **Brand name:** the brand's own creatives/logo read **"ASD Laminat"** (no final *e*).
  The page and portfolio data use "ASD Laminat"; the URL slug stays `asd-laminate`.

### The 9 feed images — CORRECTED pillar mapping

The prototype's alt/pillar tags were verified against the actual images and two were
wrong. Use this corrected mapping (source file → new asset name → pillar). This gives
all five pillars representation (2/2/2/2/1) instead of the prototype's uneven 2/2/2/3/0.

| Source | New asset name | Headline (real) | Pillar |
|--------|----------------|-----------------|--------|
| `1.png`  | `01-exterior-compact.png`  | ASD Exterior Compact Laminate — cantilevered build over water | Product Lines |
| `14.png` | `02-carbon.png`            | Carbon by ASD Laminat — matte anti-fingerprint | Product Lines |
| `8.png`  | `03-quebec-to-bc.png`      | From Quebec to BC — ASD has you covered | Canadian Market |
| `10.png` | `04-panel-of-choice.png`   | The Panel of Choice for Canadian Architects | Canadian Market |
| `7.png`  | `05-safety-first.png`      | Safety First — fire-retardant, low smoke | **Performance** (prototype mislabeled Healthy Spaces) |
| `16.png` | `06-built-to-last.png`     | Built to Last — stable · durable · formable | Performance |
| `3.png`  | `07-antiviral-laminate.png`| Antiviral Laminate — kitchen | Healthy Spaces |
| `5.png`  | `08-healthy-spaces.png`    | Healthy Spaces are in all your living areas | Healthy Spaces |
| `20.png` | `09-decors-designs.png`    | Decors & Designs — 90+ standard colours | **Decors** (prototype mislabeled Performance/"Safety first") |

Hero cards use three of these: `03-quebec-to-bc`, `02-carbon`, `04-panel-of-choice`
(the most visually striking — a facade, a Carbon kitchen, a figure by a panel wall).

## Brand

- **Palette:** orange `#F26A21`, orange-deep `#C95315`, graphite `#262626`,
  graphite-soft `#33322F`, steel `#8A8C8E`, off-white `#F4F2EF`, off-deep `#E7E3DC`,
  ink `#1B1B1B`.
- **Type:** **Anton** (deliverable numerals + pill IDs + channel stat values), Poppins
  (display 500–800), Inter (body 400–700). Google Fonts `<link>` with preconnect
  (React 19 hoisting, as the sibling pages do).

## Architecture

One new self-contained client component, following the established featured-page
pattern (verified against `BigBearsPage.tsx` / `AydinCPAPage.tsx`):

- **File:** `src/components/portfolio/featured/ASDLaminatPage.tsx`
- Fully bespoke: **its own sticky top rail and colophon** — no global `<Navbar>` /
  `<Footer>`.
- Styling via scoped `styled-jsx global` on an `.asd-page` root, tokenized with the
  prototype's CSS-custom-property system (`--orange`, `--graphite`, etc.). Port the
  prototype's `<style>` rules (drop `.preview-banner`); add the marquee + reduced-motion
  deltas.
- **Props:** `{ client: Client }` (the `FeaturedPageProps` contract).

### Wiring

1. **`src/app/portfolio/[slug]/featured.ts`** — add `"asd-laminate": ASDLaminatPage`
   to `FEATURED_PAGES` and import it.
2. **`src/data/clients.ts`** — replace the minimal `asd-laminate` entry with:
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
   }
   ```
   - Services **reordered** from `["Ad Management", "Social Media"]` to
     `["Social Media", "Ad Management"]` (same tags — primary now leads, matching
     Deliverable 01). Approved.
   - No `brand`/`logos`/`photos` scene data — the bespoke component renders everything;
     those fields only feed the templated `ClientPage`, which this client bypasses.
   - Frame number derives from roster position (index 2 → "003"); no manual value.

### Shared primitives reused

- **`LoadingTransition`** — props `{ frameNumber, clientName, scope, location?, year? }`.
  Call with `frameNumber="003"`, `clientName="ASD Laminat"`, `scope={["Social", "Ads"]}`,
  `location="Canada"`, `year="2025"`.
- **Lightbox modal** — keyboard-accessible (Esc / ← / → ), body-scroll lock, `aria-modal`,
  wrap-around nav, focus-visible outlines. Same behavior as the sibling pages. Used for
  the 9 feed posts.

## Section flow (top → bottom)

1. **LoadingTransition** — `003 · ASD LAMINAT · Social · Ads`.
2. **Sticky top rail** (`.asd-rail`) — ← Portfolio · `ASD LAMINAT · CASE STUDY` ·
   `FrameFlow · Reel 003 · 2025`.
3. **Hero** (`.asd-hero`) — crumb (`Case Study · Reel 003 · Canada`), headline
   **"One market. / *Every channel.*"**, deck, meta list (01 · Social / 02 · Ads /
   Reach). Three tilted post cards (idle float; each a button → lightbox).
4. **Headline marquee** (`.asd-marquee`, NEW) — kinetic infinite ticker of the five
   pillar names separated by orange ✦. Seamless (duplicated track), `aria-hidden`.
5. **The brief** (`.asd-brief`) — graphite full-bleed band: orange "THE BRIEF" stamp,
   **"Make Canadian architects *know the name.*"**, paragraph, client attribution rule.
6. **Deliverable 01 · Social** (`.asd-del`) —
   - Header: large orange `01` (Anton) + label + title *"System before posts. Five pillars, one voice."*
   - **Pillars** (`.asd-pillars`): 5 pillars (P.01 Product Lines / P.02 Canadian Market /
     P.03 Performance / P.04 Healthy Spaces / P.05 Decors), hover-lift, closing note.
   - **The feed** (`.asd-grid`): the 9 posts (4:5), each pillar-tagged (corrected),
     hover-lift + zoom cue, tap → lightbox.
7. **Deliverable 02 · Ad Management** (`.asd-ads`) — graphite band.
   - Header: `02` + *"Three channels. One coordinated push."* + meta.
   - **Channel cards** (`.asd-channels`): LinkedIn (138K impressions · 88.4K reach · 147%
     of target · 9 ads), Instagram (28.7K views · 14.5K reach · 692 clicks · ↑100%),
     Google Search (511K impressions · 2.1K clicks · CA$0.21 CPC · EN·FR), each with a
     one-line take.
   - **Combined** (`.asd-combined`): "678K+ impressions · Halifax → Vancouver · GTA most
     responsive" + "Full campaign reporting shared privately with the client."
8. **Who leaned in** (`.asd-leanin`) — two columns: top sectors by engagement
   (Government Administration, Higher Education, Technology & Internet, Business
   Consulting, Hospitals & Health Care, Construction) / most-reached regions (GTA,
   Greater Montreal, Greater Vancouver, Ottawa, Calgary, Halifax).
9. **Colophon** (`.asd-colophon`) — palette swatches (orange/graphite/steel/off-white
   with hex), **"One brand. / *Every channel.*"**, "Prepared by FrameFlow · Reel 003 ·
   2025", Start-a-project (`/contact`) + back-to-portfolio (`/portfolio`). Adds
   `.asd-colophon-cta` / `.asd-colophon-link` CSS (as Aydın did).
10. **Lightbox modal** — as described under shared primitives.

## Motion

- CSS-first: sticky rail, marquee, hover tilt/lift on cards/pills/channels, hero idle
  float.
- **`prefers-reduced-motion` guard** disables the marquee animation and hover transforms
  (marquee `.asd-marquee-track`; `transform:none` on `.asd-hcard`/`.asd-grid .cell`/
  `.pill`/`.asd-ch` hovers). No video anywhere on this page.

## Asset pipeline → `public/portfolio/asd-laminate/posts/`

Prerequisite tools (ffmpeg + pngquant) are already installed from the Aydın work.

- Copy the 9 source PNGs to their descriptive names (table above) and compress for web
  (target ≤ ~400 KB each; several sources are 1–2.5 MB). Use the same pngquant / ffmpeg
  scale approach the Aydın posts used.
- No reels, no website shot, no logo files — this page is posts + rendered ad-stat
  cards only.

## Scope guardrails (YAGNI)

- Feed shows the **9 curated posts** — not all 31.
- **No video** anywhere (ASD produced none).
- **No website** deliverable (there wasn't one) — Deliverable 02 is the ad campaign.
- Ad metrics verbatim from the approved prototype; keep the "shared privately" note.
- No prev/next adjacent-client nav (featured pages end on the bespoke colophon).

## Success criteria

- `/portfolio/asd-laminate` renders the bespoke page (not the templated `ClientPage`).
- The portfolio index (`/portfolio`) shows ASD Laminat as frame **003** with a
  "Now showing" pill (from `featured: true`) and services `SOCIAL MEDIA · AD MANAGEMENT`.
- All 9 posts open in a keyboard-navigable lightbox; pillar tags match the corrected
  mapping.
- The three ad-channel cards and the "who leaned in" columns render with the real
  figures.
- `prefers-reduced-motion` is honored across all animations.
- Type-checks and builds clean; responsive at the sibling breakpoints (~880 / ~520px).
