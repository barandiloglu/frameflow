# Beril & Sedat Homes — Featured Portfolio Case Study

**Date:** 2026-07-31
**Slug:** `beril-sedat-homes` (frame **020** — a NEW roster entry)
**Branch:** stacked on `feat/aydin-cpa-case-study`
**Status:** Design approved — pending spec review

## Goal

Build a bespoke, production-grade featured case-study page for **Beril & Sedat Homes**,
a boutique GTA brokerage that retired the TopcuDalan Homes name in Q1 2026 and relaunched
under the two principals' own names. FrameFlow runs social, video, the bilingual website
and paid.

Narrative angle: **"They stopped selling under a group name. We built the one with theirs
on it."** In a market of 69,000 licensed agents, the differentiator is that there are two
of them and you can see both. The page is organised around the thing that makes that hard
to execute — holding one quiet-luxury register across four channels and two languages.

## Source material

- **Prototype (reference, not spec):** `/Users/barandiloglu/Downloads/bsh-preview.html`
- **Assets:** `/Users/barandiloglu/Downloads/BSH/` — 11 stills + 18 video files
  (**17 unique**; one pair is the same content re-encoded, verified by frame hashing at three timestamps)
  + `update.docx` (not used).
- **Website source:** `/Users/barandiloglu/Downloads/bs-homes-main` — a full bilingual
  Next.js 16.2.6 app.

### This client is not in the roster

All 19 existing clients occupy frames 001–019; Beril & Sedat Homes has no entry. The
prototype's "FF-005" is not this site's scheme. **Approved:** add as the **20th** roster
entry → frame **020**, used in the rail, the loading transition and the index, consistent
with all eight sibling featured pages. The prototype's FF-005 is dropped.

### Prototype claims corrected against the folder

| Prototype says | Reality |
|---|---|
| FEED "13 pieces shown" | **12 exist.** The `event-post` has no source file. |
| EXPLAINERS "44 pieces across six series — 10 stills shown" | **4 built-graphics pieces exist.** |
| REELS: 9 poster stills | **13 on-camera/location reels exist** — and they are video, so they ship as playable video, not stills. |
| SITE: 7 static screenshots | The **actual site source** was supplied — it ships as a live embed. |
| `logo-knockout.png`, `logo.png` | Neither exists standalone. The official transparent logo ships **inside the website repo**. |

**Approved:** state no totals. The feed and explainer sections describe themselves
("Instagram · 4:5", "Vertical motion · 9:16") without asserting counts the page cannot
show. Nothing claims volume that isn't on screen.

### Asset mapping — the feed (12 pieces)

Every file viewed before assignment. Sources are `WhatsApp Image 2026-07-30 at …`:

| Source | Content | → Target |
|---|---|---|
| `21.27.09 (4).jpeg` | 01/07 "The Shocking Truth About Toronto Real Estate Today" | `feed/carousel-1-hook.jpg` |
| `21.27.10.jpeg` | 02/07 "The Source" — Tom Ferry, with the pair | `feed/carousel-2-source.jpg` |
| `21.27.10 (1).jpeg` | 03/07 "2022 — the market was an hourglass" | `feed/carousel-3-2022.jpg` |
| `21.27.10 (2).jpeg` | 04/07 "2025 — the market is an hourglass" | `feed/carousel-4-2025.jpg` |
| `21.27.10 (3).jpeg` | 05/07 "The wake-up call" — 90% closed ≤4 deals | `feed/carousel-5-wakeup.jpg` |
| `21.27.10 (4).jpeg` | 06/07 "The shift" — TRREB rentals +57%, sales −22% | `feed/carousel-6-shift.jpg` |
| `21.27.10 (5).jpeg` | 07/07 "The question" — signed Beril & Sedat | `feed/carousel-7-question.jpg` |
| `21.27.09 (2).jpeg` | "For Buyers" — navy | `feed/pinned-buyers.jpg` |
| `21.27.09 (3).jpeg` | "For Sellers" — warm limestone | `feed/pinned-sellers.jpg` |
| `21.27.09.jpeg` | "Just Sold" 25 Broadway, collage, RE/MAX byline | `feed/just-sold-a.jpg` |
| `21.27.09 (1).jpeg` | 25 Broadway Ave spec card, 2 bed / 2 bath | `feed/just-sold-b.jpg` |
| `Beril Sedat Topçu.png` | **Not a logo** — the AI-career seminar announcement | `feed/seminar.jpg` |

The carousel's slide numbering (01/07 … 07/07) is printed on the artwork and fixes the
order; it must not be reshuffled. The hero's "69,000 agents" figure is verified on slides
03 and 04.

**Register note:** the prototype frames the split as feed-navy / explainers-warm. That is
not quite right — `pinned-sellers` is a **warm limestone feed post**. The section copy is
adjusted: navy is the default and warm is used where a piece has to be read rather than
admired, in the feed as well as the explainers.

### Asset mapping — video (17 unique)

**Reels — on camera and on location (13).** These ship as **playable video**, not stills:

| Source | Duration | Content |
|---|---|---|
| `Crimson Millway.mp4` | 76.3s | Beril walking a $1,190,000 Bayview & York Mills listing |
| `19 Schell ENG.mp4` | 73.8s | Sedat, 19 Schell Ave, "$85,000 down payment" · EN |
| `Nisan Ayı Güncellemesi.mov` | 175.1s | Beril — April market update · TR |
| `Mart 2026 Piyasa Güncellemesi.mp4` | 129.8s | Beril — March market update, TRREB data · TR |
| `Bahar Gelişmeleri.mp4` | 188.1s | Beril — spring market developments · TR |
| `Konut Fiyatlamasında AI Kullanımı.mp4` | 139.4s | Beril — AI in home pricing · TR |
| `Vergi Denetimi Final.mp4` | 61.7s | Beril — tax audit · TR |
| `HST Kalkıyor mu.mp4` | 83.9s | Sedat — is HST being removed · TR |
| `Kanada Merkez Bankası Kararı.mp4` | 50.0s | Sedat — Bank of Canada rate decision · TR |
| `Prime Rate Reel.mp4` | 50.0s | Sedat — prime rate · TR |
| `POV $200,000.mp4` | 10.0s | Sedat — gifted down payment · EN |
| `Reel 5.mp4` | 14.7s | Beril in car — offer/counter-offer · EN |
| `Pool Reel.mp4` | 9.7s | Day-after-closing moment, no VO · EN |

**Explainers — built graphics (4):**

| Source | Duration | Content |
|---|---|---|
| `VID-20260530-WA0000(1).mp4` | 52.4s | **Warm limestone** — FHSA / RRSP HBP / LTT Rebate, "Real Money. Often Missed." |
| `How to make your home worth more in 2026.mp4` | 12.1s | ROI table — ten upgrades ranked · EN |
| `Reel 10.mov` | 7.0s | "Your property has an expiry date" — component lifespans · EN |
| `Reel 9.mov` | 13.0s | "Only a Realtor wishes for you to get rich" · EN |

**Duplicate excluded:** `WhatsApp Video 2026-07-30 at 21.26.19.mp4` duplicates
`VID-20260530-WA0000(1).mp4` — frame hashes match at 5s, 20s and 40s.
`Kanada Merkez Bankası Kararı.mp4` and `Prime Rate Reel.mp4` share a setting, a subject
and a 50.0s duration, and a single-frame eyeball check wrongly suggested they matched;
hashing at three timestamps proves them **different recordings**, so both are kept.

**Not all 17 ship.** Total source video is large and several reels run 2–3 minutes. The
page shows a curated subset as playable video with extracted posters; the rest are not
referenced. Exact selection is fixed in the plan.

### The logo

The client folder has no logo file. The **website repo ships the official transparent
PNG** at `public/assets/logo.png` (600×400 RGBA, 89.3% transparent) — a gold BS monogram
in a circle over "BERIL & SEDAT" in navy serif with "HOMES" and gold rules beneath.

The navy hero needs a knockout. The seminar post proves the brand's dark-ground treatment:
**gold monogram and rules retained, wordmark reversed to white.** The knockout is produced
from the official asset by recolouring only the navy wordmark to cloud `#F0F0F0`, leaving
gold untouched — validated against the seminar post's own lockup. This is a colourway of a
real asset in its documented dark-ground form, not an invented variant.

## Brand

- **Palette:** navy `#1C2841`, catalyst `#232D3F`, limestone `#E1D4C0`, bronze `#997755`,
  cloud `#F0F0F0`, warm `#E2D2B9`, terracotta `#B4472A`, rule `rgba(28,40,65,.14)`.
- **Type:** **Cinzel** (400/500/600/700) for headings, **Montserrat** (300/400/500/600)
  for body, via Google Fonts with two preconnects. Both are the client's real faces —
  the hero states them as a fact of the brand, and the live site uses the same pair.

## Architecture

- **File:** `src/components/portfolio/featured/BerilSedatHomesPage.tsx`
- Fully bespoke: own sticky rail and sign-off — no global `<Navbar>`/`<Footer>`.
- Scoped `styled-jsx global` on a `.bs-page` root; port the prototype's `<style>`, dropping
  the `*{}` + `body{margin:0}` reset.
- **Props:** `{ client: Client }`. Includes `LoadingTransition`.

### Wiring

1. **`featured.ts`** — add `"beril-sedat-homes": BerilSedatHomesPage`.
2. **`clients.ts`** — **append a new 20th entry** (position determines frame 020):
   ```ts
   {
     slug: "beril-sedat-homes",
     name: "Beril & Sedat Homes",
     services: ["Social Media", "Videography", "Website Design", "Ad Management"],
     year: "2026",
     location: "Toronto, ON",
     runtime: "Ongoing",
     scene: "INT. THE LISTING — GOLDEN HOUR",
     synopsis:
       "A boutique GTA brokerage that retired its group name and relaunched under the two principals' own. Quiet luxury is easy to say and hard to hold, so we held it in four places at once — a navy editorial feed, a reel series with both of them on camera in Turkish and English, a built graphics layer for the parts of a purchase people avoid reading, and a bilingual site with their names on it.",
     featured: true,
   },
   ```
   Appending is **required** — inserting anywhere else would renumber every client after it.
   All four services already exist in the `Service` union; no type change.

### The site embed

The supplied repo static-exports cleanly. **Proven end to end before this spec was
written** — the pipeline below built 16 pages (8 EN + 8 TR, 10 MB):

1. Copy the repo to a temp dir; hard-link FrameFlow's `node_modules` (the repo ships none
   and there is no network). Next 16.2.1 vs the repo's 16.2.6 is a patch difference and
   builds fine.
2. Stub `server-only` (a guard package, absent locally); drop `leaflet`/`react-leaflet` by
   removing the map page and its components — nothing else imports them.
3. Remove the export blockers: `app/api/`, `app/[lang]/listings/[mlsNumber]/`,
   `app/[lang]/listings/map/`, `opengraph-image.tsx`, `robots.ts`, `sitemap.ts`, and the
   contact **server action** (replaced with a same-signature stub — Server Actions are
   unsupported under `output: "export"`).
4. `output:"export"`, `basePath:"/portfolio/beril-sedat-homes/site"`,
   `images:{unoptimized:true}`, `trailingSlash:true`, `typescript.ignoreBuildErrors`.
5. **Rewrite `/assets/…` → `<basePath>/assets/…` in the built output.** Five references
   (`beril.jpeg`, `sedat.jpg`, `partnership.jpeg`, `listing.png`, `logo.png`) are emitted
   root-absolute and would 404 in the embed. Fonts are relative and need no fix. **This is
   the bug that shipped on IYN** — a missed URL there made the whole embed fall back to a
   generic face.

No API keys are set, so listings renders its **empty state** and contact runs dry-run.
That is honest and matches the prototype's own Listings caption. The section says so.

Tabs: **Home · Listings · Neighbourhoods · Advice · About · Contact · Türkçe**, mapping to
`/en/`, `/en/listings/`, `/en/neighbourhoods/`, `/en/advice/`, `/en/about/`, `/en/contact/`,
`/tr/`. Clicks, navigations and form submits are made inert by the established
`applySiteGuards` pattern from the Fidan and IYN pages.

## Section flow

1. **Sticky rail** — ← Portfolio · `Beril & Sedat Homes` · `Toronto, ON · 020`.
2. **Hero** (navy) — knockout logo, eyebrow, the headline, deck, and three facts
   (register / languages / type).
3. **Two registers** — navy default vs warm limestone, with the corrected framing.
4. **The Reels** (navy) — a curated set of on-camera/location reels as **playable video**
   with extracted posters.
5. **The Feed** (cloud) — the 12 feed pieces, opening a styled lightbox.
6. **The Explainers** (warm) — the 4 built-graphics pieces as playable video.
7. **The Site** (limestone) — the **live embedded site** in a browser-chrome frame with
   seven tabs, a scrollable window and a real "visit" link.
8. **Two languages** — the transcreation argument, EN/TR pull-quotes.
9. **Scope** — four numbered rows: Social, Videography, Website, Ads.
10. **Sign-off** — the light logo, prepared-by / frame / status, back link.

## Motion

CSS-first: sticky rail, cell hover, lightbox fade. A `prefers-reduced-motion` block
disables the lightbox animation, cell hover transforms and button transitions, targeting
only selectors that exist.

## Scope guardrails (YAGNI)

- **No invented pieces**: no `event-post`, no fabricated explainer count, no stand-in stills.
- **No fabricated brand document** — the logo is the client's own file; the knockout is a
  documented colourway of it.
- Duplicate video encodes are not shipped twice.
- No prev/next adjacent-client nav.

## Success criteria

- `/portfolio/beril-sedat-homes` renders the bespoke page; the index shows frame **020**,
  "Now showing", and `SOCIAL MEDIA · VIDEOGRAPHY · WEBSITE DESIGN · AD MANAGEMENT`.
- Every other client's frame number is unchanged (append-only roster edit).
- All 12 feed pieces open in a keyboard-navigable styled lightbox, **fully visible, not
  cropped**.
- Reels and explainers play inline from extracted posters.
- The site embed is same-origin, renders **with its real fonts and images**, switches
  across all seven tabs, and its links and form submits are inert.
- `prefers-reduced-motion` honored; type-checks, lints and builds clean; responsive at the
  prototype's breakpoints (~1080 / ~940 / ~620px).
