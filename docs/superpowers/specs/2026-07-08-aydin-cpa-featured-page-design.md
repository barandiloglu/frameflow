# Aydın CPA — Featured Portfolio Case Study

**Date:** 2026-07-08
**Slug:** `aydin-cpa` (frame **004** in the roster)
**Status:** Design approved — pending spec review

## Goal

Build a bespoke, production-grade featured case-study page for **Aydın CPA**, a
two-office Canadian accounting firm (Ottawa HQ + Toronto). It joins the six
existing featured pages (Big Bears, Destan, Canapy, CTBDH, Adrian's, Northern
Pathways) and must sit at their craft level — a self-contained component with its
own art direction, not the templated `ClientPage` chrome.

The narrative angle: **"Tax content people actually read."** Most accounting
content is beige; FrameFlow built a feed people stop for, then a website that
turns that attention into booked calls. The page is gallery-led and kinetic — the
3D illustrated social posts are the stars.

## Source material

- **Prototype (reference, not spec):** `/Users/barandiloglu/Downloads/aydincpa-preview.html`
- **Assets:** `/Users/barandiloglu/Downloads/aydıncpa/`
  - `Post 3/` (1.png, 2.png) — **FHSA** / first-time home buyers (navy path → house, warm glow)
  - `Post 4/` (14.png, 15.png) — **Salary or Dividend?** (3D coin figure at a crossroads)
  - `Post 5/` (16.png, 17.png) — **Did You Hit $30,000?** (abstract 3D dollar sign; GST/HST threshold)
  - `Post 6/` (18.png, 19.png) — **CRA Red Flags** (red flag on white)
  - `Reel 11/` — "New Tax Season Is Here!" (thumbnail + 46 MB mp4)
  - `Reel 13/` — "Not Filing Is The Real Risk" (thumbnail + 60 MB mp4)
  - `Reel 5/` — 146 MB mp4, **no thumbnail** (content to be confirmed by extracting a frame)
- **Website screenshot:** `/Users/barandiloglu/Downloads/Home-AYDIN-CPA-07-08-2026_03_04_PM.png` (3456×6022, full homepage)

## Brand

- **Palette:** navy `#044585`, navy-deep `#033568`, orange `#EC8023`, orange-deep
  `#CF6C17`, CRA-red `#CC0000`, off-white `#F5F6F8`, off-deep `#E6E9EE`, ink `#0F2136`.
- **Type:** Montserrat (display, 600–900) + Poppins (body, 400–600), loaded via a
  Google Fonts `<link>` (React 19 hoisting, as the other featured pages do).

## Architecture

One new self-contained client component, following the established featured-page
pattern (verified against `BigBearsPage.tsx`):

- **File:** `src/components/portfolio/featured/AydinCPAPage.tsx`
- Fully bespoke: **its own sticky top rail and footer** — no global `<Navbar>` /
  `<Footer>` (featured pages do not use them).
- Styling via scoped `styled-jsx` with a tokenized CSS-custom-property system on a
  `.ac-page` root, matching the prototype's naming (`--navy`, `--orange`, etc.).
- **Props:** `{ client: Client }` (the `FeaturedPageProps` contract).

### Wiring

1. **`src/app/portfolio/[slug]/featured.ts`** — add `"aydin-cpa": AydinCPAPage`
   to `FEATURED_PAGES` and import it.
2. **`src/data/clients.ts`** — replace the minimal `aydin-cpa` entry with a
   promoted one (all values real, none invented):
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
   }
   ```
   - Services retag from the old `["Photography", "Website Design"]` is intentional
     and approved: the deliverables are illustrated posts + reels + site.
   - No `brand`/`logos`/`photos`/`menu`/`wrapper` scene data is needed — the bespoke
     component renders everything; those fields only feed the templated `ClientPage`,
     which this client bypasses.
   - Frame number derives from roster position (index 4 → "004"); no manual value.

### Shared primitives reused

- **`LoadingTransition`** intro overlay. Props: `{ frameNumber, clientName, scope, location?, year? }`.
  Call with `frameNumber="004"`, `clientName="AYDIN CPA"`, `scope={["Social", "Website"]}`,
  `location="Ottawa & Toronto"`, `year="2026"`.
- **Lightbox modal** — keyboard-accessible (Esc / ← / → ), body-scroll lock,
  `aria-modal`, wrap-around nav, focus-visible outlines. Same behavior as the other
  featured pages. Used for the 4 illustrated posts.

## Section flow (top → bottom)

1. **LoadingTransition** — `004 · AYDIN CPA · Social · Website`.
2. **Sticky top rail** (`.ac-rail`) — ← Portfolio · `AYDIN CPA · CASE STUDY` ·
   `FrameFlow · Reel 004 · 2026`. Navy on translucent off-white, blur.
3. **Hero** (`.ac-hero`) — two-column split.
   - Left: crumb (`Case Study · Reel 004 · Ottawa & Toronto`), headline
     **"Tax content people / *actually read.*"** (orange emphasis), deck, meta list
     (01 · Social / 02 · Website / Look).
   - Right: two tilted 3D post cards (FHSA + Salary-or-Dividend) with a gentle
     idle float; each is a button → opens lightbox.
4. **Headline marquee** (`.ac-marquee`) — kinetic infinite ticker of the real post
   headlines (`FHSA · SALARY OR DIVIDEND · CRA RED FLAGS · DID YOU HIT $30,000?`)
   separated by orange ✦. Signature kinetic element. Seamless (duplicated track).
5. **The brief** (`.ac-brief`) — navy full-bleed band, centered: orange "THE BRIEF"
   stamp, **"Make tax feel *simple, modern,* and worth booking."**, paragraph,
   client attribution rule.
6. **Deliverable 01 · Social** (`.ac-del`) —
   - Section header: large orange `01` numeral + label + title *"A look nobody else in tax has."*
   - **Content pillars** (`.ac-pillars`): 5 pillars (P.01–P.05) as a numbered
     ledger grid, hover-lift, with a closing note about the single-symbolic-object approach.
   - **The feed** (`.ac-grid`): the 4 illustrated post covers (4:5), each pillar-tagged,
     hover-lift + zoom cue, tap → lightbox.
   - **The reels** (`.ac-reels`): 3 **real inline `<video>`** players (9:16),
     compressed, with poster frames + a play affordance; headline caption per reel.
7. **Deliverable 02 · Website** (`.ac-web`) — navy band. Browser-chrome frame
   (`.ac-browser`, traffic-light dots + `aydincpa.ca` URL pill) around the homepage
   screenshot. Feature list (two-office identity · services architecture · dual
   conversion CTAs · tabbed Compliance/Advisory/Management). Orange
   **"Visit the live site →"** → `https://aydincpa.ca/`.
8. **Colophon / close** (`.ac-colophon`) — palette swatches (navy / orange /
   off-white with hex), **"Complex tax. *Clear content.*"**, "Prepared by FrameFlow ·
   Reel 004 · 2026", back-to-portfolio + a contact CTA (→ `/contact`).
9. **Footer** — FrameFlow credit line, consistent with the other featured pages.
10. **Lightbox modal** — as described under shared primitives.

## Motion

- CSS-first: sticky rail, marquee, hover tilt/lift on cards, hero idle float,
  optional scroll-reveal on section entry.
- **`prefers-reduced-motion` guard** disables marquee/float/reveal and pauses
  autoplaying video motion (the one guard Northern Pathways omitted — do not repeat).
- Reels are the only real video; everything else is CSS/React.

## Asset pipeline → `public/portfolio/aydin-cpa/`

Prerequisite: **`brew install ffmpeg`** (approved; not currently installed).

- **`posts/`** — 4 cover illustrations copied and compressed for web
  (Post 3/1 → `01-fhsa.png`, Post 4/14 → `02-salary-or-dividend.png`,
  Post 5/16 → `03-30000-threshold.png`, Post 6/18 → `04-cra-red-flags.png`).
  Filenames descriptive; alt text describes each illustration.
- **`reels/`** — 3 MP4s transcoded via ffmpeg to ≈720×1280, H.264 (`-crf 28`,
  `faststart`), target ~5–10 MB each, named `reel-01-new-tax-season.mp4`,
  `reel-02-not-filing-risk.mp4`, `reel-03-*.mp4`. Posters: reuse the provided
  thumbnails for Reel 11 & 13; extract a representative frame for Reel 5 (and
  confirm its content before captioning).
- **`website/`** — `Home-AYDIN-CPA-*.png` resized to ~1400px wide (`home.png`) for
  the browser frame; displayed top-anchored with a capped height.

## Scope guardrails (YAGNI)

- Feed shows the **4 post covers only** — not all 8 carousel slides. (Second slides
  can be added to the lightbox later if desired.)
- Reels play **inline** — no separate video lightbox.
- Website is **one homepage shot** in a browser frame — no multi-page mockups,
  sitemap, or sub-page thumbnails.
- No prev/next adjacent-client nav (the featured pages end on a bespoke
  colophon/CTA, not the templated reel nav).

## Success criteria

- `/portfolio/aydin-cpa` renders the bespoke page (not the templated `ClientPage`).
- The portfolio index (`/portfolio`) shows Aydın CPA as frame 004 with a
  "Now showing" pill (from `featured: true`) and the retagged services.
- All 4 posts open in a keyboard-navigable lightbox; all 3 reels play inline.
- The website screenshot renders in the browser frame; "Visit the live site" links out.
- `prefers-reduced-motion` is honored across all animations.
- Type-checks and builds clean; responsive at the breakpoints the other featured
  pages use (~1080 / ~880 / ~520px).
