# IYN Education & Consultancy — Featured Portfolio Case Study

**Date:** 2026-07-30
**Slug:** `iyn` (frame **016**)
**Branch:** stacked on `feat/aydin-cpa-case-study`
**Status:** Design approved — pending spec review

## Goal

Build a bespoke, production-grade featured case-study page for **IYN Education &
Consultancy**, an İzmir exam-prep and study-abroad consultancy. FrameFlow delivered a
bilingual marketing site, a student portal (web application), a portal launch film,
and a two-year Instagram content system.

Narrative angle: **"They teach one student at a time — we built the machine that
reaches the rest."** Four numbered sections: the Portal, the Site, the Feed, the Reel.

## Source material

- **Prototype (reference, not spec):** `/Users/barandiloglu/Downloads/iyn-preview.html`
- **Provided assets:** `/Users/barandiloglu/Downloads/IYN Portfolio/` — 8 images + 2 videos.
  Mapping verified by viewing every file:

  | Source file | Content | Target |
  |---|---|---|
  | `WhatsApp Image …14.34.19 (2).jpeg` | "Pahalı okul = iyi okul mu?" ochre band + arrow | `posts/01-hook-pahali-okul.jpg` (R.01 The Hook) |
  | `WhatsApp Image …14.34.19 (5).jpeg` | "Sıradaki adımını birlikte planlayalım" map + compass | `posts/02-davet-siradaki-adim.jpg` (R.02 The Invitation) |
  | `WhatsApp Image …14.34.19.jpeg` | "Ayın En Garip Bölümü — Turfgrass Science" | `posts/03-garip-bolum-turfgrass.jpg` (R.03 The Strange Major) |
  | `WhatsApp Image …14.34.19 (1).jpeg` | "4 Adımda Bioinformatik" | `posts/04-garip-bolum-bioinformatik.jpg` (R.04 The Strange Major, again) |
  | `WhatsApp Image …14.34.19 (4).jpeg` | "Kritik Tarihler!" — AP camp, summer schools, EU deadlines | `posts/05-kritik-tarihler.jpg` (R.05 The Calendar) |
  | `WhatsApp Image …14.34.19 (3).jpeg` | "İYN Eğitim Portalı ile tanışın" device mockups | `posts/06-portal-lansman.jpg` (R.06 The Product Launch) |
  | `WhatsApp Video …14.34.26 (1).mp4` (1280×720, 74.9s) | Portal launch film (1:15) | `video/portal-tour.mp4` |
  | `WhatsApp Image …14.34.26 (1).jpeg` (1280×720) | its poster | `video/portal-tour-poster.jpg` |
  | `WhatsApp Video …14.34.26.mp4` (720×1290, 25.8s) | Imperial College reel (0:26, vertical) | `video/imperial-reel.mp4` |
  | `WhatsApp Image …14.34.26.jpeg` (720×1290) | its poster | `video/imperial-reel-poster.jpg` |

  Durations and aspect ratios independently confirm the prototype's claims (1:15
  landscape; 0:26 vertical).
- **Client source code:** `/Users/barandiloglu/Desktop/Projects/iyn-app` — the full
  Next.js app (marketing site + student portal + 223 API routes, MySQL/Drizzle + auth).
  Verified: boots locally and all five marketing routes return 200.
- **Logo:** `https://www.iyn.com.tr/logo-white.png` — the client's own white wordmark,
  for the gradient hero.

## Brand

- **Palette:** blue-a `#0349AA`, blue-b `#0091FF` (hero gradient
  `linear-gradient(135deg, …)`), amber `#EC8D13`, light `#F4F5FA`, paper `#FFF`,
  ink `#10151F`, mute `#6B7280`.
- **Type:** **Oswald** (300/400/500/700 — rail, headlines, labels) + **Poppins**
  (300–600 — body). Google Fonts `<link>` with two preconnects. (The prototype names
  "Garet" first in the body stack; it is not a Google font, so Poppins is the shipped
  body face and Garet is left as an optional local fallback exactly as the prototype
  declares it.)

## Architecture

One new self-contained client component, following the established featured-page
pattern:

- **File:** `src/components/portfolio/featured/IYNPage.tsx`
- Fully bespoke: **its own sticky gradient rail and sign-off footer** — no global
  `<Navbar>` / `<Footer>`.
- Styling via scoped `styled-jsx global` on an `.iy-page` root. Port the prototype's
  `<style>` (drop the `*{}` + `body{margin:0}` reset). Add the styled-lightbox,
  site-embed and reduced-motion deltas.
- **Props:** `{ client: Client }`.
- **Includes `LoadingTransition`** — consistent with every other featured page (the
  Fidan round established that consistency beats per-page exceptions).

### Wiring

1. **`featured.ts`** — add `"iyn": IYNPage`.
2. **`clients.ts`** — promote the `iyn` entry:
   ```ts
   {
     slug: "iyn",
     name: "IYN",
     services: ["Website Design", "App", "Social Media"],
     year: "2026",
     location: "İzmir, Türkiye",
     runtime: "Ongoing · since 2024",
     scene: "INT. THE STUDY — DAY",
     synopsis:
       "A bilingual marketing site, a student portal that makes exam progress visible to students and parents alike, the film that launched it, and a two-year Instagram system running four content pillars across four visual registers — for an İzmir consultancy preparing students for AP, IB, SAT and the British admissions exams.",
     featured: true,
   }
   ```
   - Services **reordered** to `["Website Design", "App", "Social Media"]` (same three
     tags; order now matches the section run 01–04). Approved.
   - Frame derives from roster position (index 15 → "016"); never hardcoded.

### Shared primitives reused

- **`LoadingTransition`** — `frameNumber="016"`, `clientName="IYN"`,
  `scope={["Website", "App", "Social"]}`, `location="İzmir, Türkiye"`, `year`.
- **Styled lightbox** — the framed-stage pattern from the sibling pages, in IYN's
  tokens (deep-blue backdrop, paper stage, amber accents, Oswald bars): counter +
  brand + close on top, image on a tinted mat, the register's **look** line and
  **caption** below. Keyboard (Esc / ← / →), scroll-lock, `aria-modal`, wrap-around,
  reduced-motion guarded. Used for the 6 posts.

## Section flow (top → bottom)

1. **Sticky gradient rail** (`.iy-rail`) — ← Portfolio · `IYN EDUCATION &
   CONSULTANCY · İZMİR` · `Reel 016 · 2026`.
2. **Hero** (`.iy-hero`) — gradient band. Kicker (`Website · Web Application · Social
   Media · Videography`) + the white IYN logo; the two-part headline (**"THEY TEACH
   ONE STUDENT AT A TIME."** over a lighter *"we built the machine that reaches the
   rest."*); deck; and a 6-item **"what we built"** list (bilingual site, student
   portal, launch film, Instagram system, reels, Midjourney prompt architecture).
3. **01 · The Portal** (`.iy-portal`) — light band, two columns. Left: the lead line
   (*"am I actually getting better?"*) and three paragraphs on mock exams, the
   70,000-question bank, section breakdowns, the progress curve, and the shared
   parent view. Right: the **real 1:15 launch film** as an inline `<video controls
   preload="none" poster>` with its caption. **The portal itself is represented by
   the film only** — it is auth-gated and holds real student data, so no dashboards
   are embedded or mocked.
4. **02 · The Site** (`.iy-site-sec`) — browser chrome (dots + URL + `● LIVE`), a
   **5-tab switcher** (Home / Exams / Courses / Study Abroad / Services) over a
   **live same-origin embed** of the client's own marketing pages, prev/next + count,
   "Visit this page ↗" to the real URL, and a per-tab figcaption. See below.
5. **03 · The Feed** (`.iy-feed`) — gradient band. The **4 content pillars**
   (Stratejik Bilgilendirme / Ayın En Garip Bölümü / Başarı Hikayeleri / Akıllı
   Çalışma), the note on flexing by content type, then the **6 posts** in a 3-column
   grid — each with its `R.0x` amber tag, name and job — opening the styled lightbox.
6. **04 · The Reel** (`.iy-reel-sec`) — light band. The **real 0:26 vertical Imperial
   film** (720×1290) beside its copy and the `1080 × 1934 · 60 fps source · captioned
   throughout` meta line.
7. **Sign-off** (`.iy-signoff`) — Client / Where / By FrameFlow, plus a back-to-portfolio
   link.

## The Site section — interactive embed (as established on Fidan)

Because the client's source is available, section 02 embeds the **running marketing
site**, not screenshots:

- Build a **static snapshot of only the five marketing routes** (`/en`, `/en/exams`,
  `/en/courses`, `/en/study-abroad`, `/en/services`) into
  `public/portfolio/iyn/site/`, served under a `basePath` so asset URLs resolve.
- The five pages carry **no database access** (verified: 0 DB refs; the `[lang]`
  layout imports only Header/Footer/contexts), so they export without a database.
  The Portal, admin/teacher/parent dashboards and all 223 API routes are **stripped
  from a throwaway copy** — the client's repository is never modified.
- Embed in a **same-origin `<iframe>`**, and inject the same guards used on Fidan:
  a capture-phase handler that cancels link clicks and form submits, so **navigation
  and data submission do nothing** while scrolling and in-page interactions remain
  live. Lazy-loaded so the snapshot only downloads when scrolled to.
- Known Next.js quirk to handle: `next/image` with `unoptimized` does **not** apply
  `basePath`, so root-absolute asset URLs must be rewritten in the built output
  (same fix as Fidan).

## Motion

CSS-first: rail, hover lift on post cells, tab/nav transitions, lightbox fade+pop.
A **`prefers-reduced-motion`** block disables the lightbox animations, the post-cell
hover transform, and the nav/tab transitions — targeting only selectors that exist.

## Asset pipeline → `public/portfolio/iyn/`

- **`posts/`** — the 6 creatives per the mapping table, compressed (≤ ~350 KB each).
- **`video/`** — both films transcoded for web (H.264, faststart; target ≤ ~10 MB
  each) plus the two provided posters, compressed.
- **`brand/logo-white.png`** — downloaded from the client's site.
- **`site/`** — the static snapshot (target ≤ ~15 MB after image compression).

## Scope guardrails (YAGNI)

- The **6 provided posts** — no invented creatives.
- **Both videos are real**; no stock, no placeholder slots.
- **The Portal is shown via its film only** — auth-gated, real student data, so
  nothing is embedded or mocked.
- The site embed covers the **five marketing pages only**.
- Copy verbatim from the approved prototype (Turkish pillar names kept as-is).
- No prev/next adjacent-client nav.

## Success criteria

- `/portfolio/iyn` renders the bespoke page (not the templated `ClientPage`).
- The portfolio index shows IYN as frame **016** with a "Now showing" pill and
  services `WEBSITE DESIGN · APP · SOCIAL MEDIA`.
- Both videos play inline from their posters; all 6 posts open in a keyboard-navigable
  styled lightbox showing the correct look/caption.
- The site embed loads the real pages, scrolls, and switches across all five tabs —
  while link clicks and form submits do nothing.
- `prefers-reduced-motion` is honored; type-checks and builds clean; responsive at the
  prototype's breakpoints (~980 / ~560px).
