# MinAuto — Featured Portfolio Case Study

**Date:** 2026-07-30
**Slug:** `minauto` (frame **018**)
**Branch:** stacked on `feat/aydin-cpa-case-study`
**Status:** Design approved — pending spec review

## Goal

Build a bespoke, production-grade featured case-study page for **MinAuto**, an
OMVIC-registered used-car dealership at 1525 Mosley Street, Wasaga Beach, ON.
FrameFlow built the identity from nothing and then ran the social channels off it.

Narrative angle: **"The logo is a check. So is everything after it."** A used-car
buyer is not shopping — they are checking. The identity puts that in one shape, and
the page follows that shape as it leaves the logo and turns into a hang-tag, a
proof-bullet, a seal, and a business card.

## Source material

- **Prototype (reference, not spec):** `/Users/barandiloglu/Downloads/minauto-preview.html`
- **Provided assets:** `/Users/barandiloglu/Downloads/Min Auto/` — 64 files, all
  inspected. Three logo lockups + a knockout, a genuine client spec sheet, a print
  business card, and 48 finished social posts.

### The prototype under-uses the assets, and its centrepiece cannot be built

Documented so the gap is not rediscovered mid-build:

| Prototype assumes | Reality |
|---|---|
| `card/01-raw.jpg` — a raw phone photo | **Does not exist.** No unretouched photography anywhere in the folder. The "Raw frame ⇄ Finished card" toggle has nothing to show. |
| Hang-tag "stamped **INSPECTED**" | The orange corner ribbon reads **"UNUSED 2022"** (Coachmen) or **"DISCOUNT"** (Civic). No card says INSPECTED. |
| "the **navy bar** carries the year, model and certification" | The bottom strip is light, and carries **Model / Mileage / Fuel**. Certification is not on it. |
| Caption "2015 Mazda CX-5 **GS · Safety Certified** · 180,945 km · $9,950" | Year, mileage and price are correct; **GS** and **Safety Certified** appear nowhere on the card. |
| Three swatches, incl. `Surface #F4F4F4` | The client sheet specifies **two** colours. Surface is FrameFlow's neutral, not a brand colour — labelled as such. |
| No section for social work | **48 finished posts**, including three multi-slide carousels — the strongest material in the folder. |
| Single unchanging template | The template **evolved**. Documented below. |

**Resolution (approved):** section 02's toggle becomes **launch card ⇄ current card** —
a real before/after — and a new section 03 carries the social work.

### Verified brand facts

From `Logo/Logo Colours and Fonts.png`, the client's own spec sheet:
- Navy **#123645**, Orange **#DC4C14**, **Font: Gotham Bold**.

All three match the prototype's tokens exactly. This sheet is a real deliverable and
**ships as an image** — unlike the Esma page, nothing here is fabricated.

From `Business Card/Min Auto Print.pdf`: owner **Serdar Inan**, (647) 970-2678,
serdarinan@minauto.ca, www.minauto.ca, 1525 Mosley Street, Wasaga Beach, ON, L9Z 2B7.
This is the client's published print contact card; reproducing it in a portfolio is
appropriate.

### The template evolution (the spine of section 02)

| | **Launch card** (Mazda CX-5) | **Current card** (Ford Police Interceptor) |
|---|---|---|
| Logo | bottom, centred | top-left, small |
| Price | single orange pill | **old price struck through**, new price larger |
| Seal | — | **PRICE GUARANTEE** roundel, top-right |
| Proof | — | **CARFAX REPORT AVAILABLE** badge |
| Spec strip | Model / Mileage / Fuel | unchanged |

Verified by comparing the unbatched early posts against the `July 6-12`, `July 13-19`
and `July 27-31` batches, which are uniformly the mature template.

### The tick as proof-mark

The strongest system observation, and absent from the prototype: the logo's tick does
not stay in the logo. It becomes the ✓ bullet in the Coachmen condition/specs columns
and in the OMVIC benefits list, the corner ribbon on a listing, the seal on a price,
and the oversized graphic bleeding off the business card. Section 02 is built on this.

### Asset mapping

Every file below was viewed before being assigned.

**Logo → `logo/`**
| Source | Target | Use |
|---|---|---|
| `Logo/Main Logo.png` | `lockup-primary.png` | L.01 Primary (stacked) |
| `Logo/Second Logo.png` | `lockup-horizontal.png` | L.02 Horizontal |
| `Logo/Third Logo.png` | `lockup-compact.png` | L.03 Compact (two-line wordmark) |
| `Logo/Main Logo White.png` | `lockup-knockout.png` | L.04 Knockout + **hero** (verified true-white RGBA on navy) |
| `Logo/Logo Colours and Fonts.png` | `spec-sheet.png` | The real client spec sheet |

`Copy of Main Logo.png` is byte-identical to `Main Logo.png` (same MD5) — skipped.
`Logo Trials/`, the `.af` sources and `Raw/*.svg` are working files, not deliverables —
skipped. (The SVG is the *colour* lockup; the hero needs the designer's actual
knockout, so the provided white PNG at 2657×1601 is the correct source, not a
recoloured vector.)

**Card → `card/`**
| Source | Target |
|---|---|
| `Posts/Mazda/2.png` | `launch-mazda-cx5.jpg` |
| `Posts/July 13-19/2.png` | `current-ford-interceptor.jpg` |
| `Business Card/Min Auto Print.pdf` → rendered @1600px | `business-card.jpg` |

**Carousels → `feed/`** (order is the swipe order and is load-bearing)
| Source | Target |
|---|---|
| `Posts/What is OMVIC/11,12,13.png` | `omvic/01,02,03.jpg` |
| `Posts/3 Things to Check First/14,15,16,17,18.png` | `checks/01…05.jpg` |
| `Posts/Coachman Viking/slide1_hero,slide2_proof,slide3_cta.png` | `coachmen/01,02,03.jpg` |

Note the folder is named "3 Things to **Check** First" but the artwork reads
**"3 THINGS TO KNOW FIRST"** — the artwork wins.

**Listings → `listings/`** (each a hero + its detail collage)
| Vehicle | Source | Slides |
|---|---|---|
| Kia Soul | `Posts/Kia/4,5.png` | 2 |
| Infiniti Q50 | `Posts/Infiniti Q50/6,7,Sold.png` | 3 — ends on the SOLD stamp |
| Subaru Forester | `Posts/Subaru Forester/8,9.png` | 2 |
| Toyota Corolla 2022 | `Posts/Toyota Corolla/12,13.png` | 2 |
| Honda Civic 2018 | `Posts/2018 Honda Civic/ Civic.png, Civic 2.png` | 2 |
| Ford Escape SE | `Posts/July 6-12/Ford Escape /47,48.png` | 2 |

Mazda CX-5 and Ford Interceptor are deliberately **not** repeated here — they carry
section 02. Story-format (1080×1920) duplicates and the remaining July listings are
out of scope; the six above cover launch-era and current-era templates plus the SOLD
state. Note the leading space in `Posts/2018 Honda Civic/ Civic.png` and the trailing
space in `Posts/July 6-12/Ford Escape /` — both are real and must be quoted.

## Brand

- **Palette:** navy `#123645`, orange `#DC4C14`, surface `#F4F4F4`, paper `#FFF`,
  ink `#2A2A2A`, mute `#7B8288`, rule `rgba(18,54,69,.14)`.
- **Type:** **Montserrat** (700/800 display), **Barlow Condensed** (600/700 UI and
  labels), **Source Sans 3** (400/500/600 body), via Google Fonts with two preconnects.
  The client's specified face is **Gotham Bold**, which is not licensed for the web
  here; Montserrat is the stand-in and the page says so in plain text rather than
  implying Gotham is what renders.

## Architecture

- **File:** `src/components/portfolio/featured/MinAutoPage.tsx`
- Fully bespoke: own sticky navy rail and sign-off — no global `<Navbar>`/`<Footer>`.
- Scoped `styled-jsx global` on a `.ma-page` root. Port the prototype's `<style>`,
  dropping the `*{}` + `body{margin:0}` reset (it would leak site-wide).
- **Props:** `{ client: Client }`. Includes `LoadingTransition`, as every sibling does.

### Wiring

1. **`featured.ts`** — add `"minauto": MinAutoPage`.
2. **`clients.ts`** — promote the `minauto` entry in place (index 17 → frame `018`;
   never hardcoded):
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
   }
   ```
   **`Branding` added** to the existing `Logo` + `Social Media` — evidenced by the
   lockup system, the client spec sheet and the print business card. `Branding` is
   already in the `Service` union; no type change.

### Shared primitives reused

- **`LoadingTransition`** — `frameNumber="018"`, `clientName="MinAuto"`,
  `scope={["Logo", "Brand System", "Social"]}`, `location="Wasaga Beach, ON"`, `year`.
- **Styled lightbox**, in MinAuto's tokens (navy backdrop, white stage, orange
  accents). Keyboard (Esc / ← / →), body-scroll lock, `aria-modal`, reduced-motion
  guarded.
  **Set-scoped, unlike the sibling pages:** carousels have a meaningful internal
  order, so the lightbox holds one *set* and ←/→ wrap **within** that set, with the
  counter reading `02 / 03`. Stepping across sets would destroy the swipe order the
  artwork was designed around.
  **Critical sizing note:** the stage must carry a **definite height** with the image
  at `object-fit: contain`. A `max-height`-only stage resolves to `auto`, the image's
  percentage height is ignored, and the post renders at natural size and is clipped —
  the bug shipped on IYN and prevented on Esma. Slides here are 1080×1350 portrait.

## Section flow

1. **Sticky navy rail** — ← Portfolio · `MINAUTO · WASAGA BEACH, ON` ·
   `OMVIC Registered · Reel 018`.
2. **Hero** (navy) — two columns: kicker "Logo · Brand System · Social Media",
   headline **"THE LOGO IS A CHECK. / SO IS EVERYTHING AFTER IT."** (second line
   orange), deck, and the tagline *"Certified Pre-Owned. Driven by Trust."* — which is
   verbatim the copy on the first launch post. Right column: the knockout lockup.
3. **01 · The Mark** — lead, body, the **4 lockups** (L.04 on a navy stage), then the
   real **spec sheet** beside three swatch chips. The two brand colours are labelled
   as the client's; **Surface is labelled as a neutral, not a brand colour**, so the
   panel does not contradict the sheet's "two colours".
4. **02 · The Card** (navy) — "The mark leaves the logo."
   - **Evolution toggle:** *Launch card* ⇄ *Current card*, captioned with what month
     one actually added (struck price, price-guarantee seal, Carfax badge, logo moved
     up).
   - **The business card**, where the tick stops being a logo element and becomes the
     artwork — bleeding off the right edge at full height.
   - A short note that the same tick is the ✓ bullet in the carousels below.
5. **03 · The Feed** — the social work the prototype omitted. Three **carousels**
   (What is OMVIC · 3 slides, 3 Things to Know First · 5 slides, Coachmen Viking ·
   3 slides) and six **listings** (2–3 slides each). Every card shows its first slide
   with a slide-count badge; tapping opens the set-scoped lightbox.
6. **04 · From Zero** — the four month-one pillars (Identity, Channels, Template
   system, Voice) and the five content-pillar chips.
7. **Sign-off** — Client / Where / By FrameFlow + back-to-portfolio.

## Copy corrections carried into the build

The prototype's section 02 copy is rewritten to describe the real template: an orange
corner ribbon (not "stamped INSPECTED"), a light spec strip carrying Model / Mileage /
Fuel (not "a navy bar with certification"), and an orange price pill. The Mazda
caption drops the unverifiable "GS · Safety Certified" and keeps the year, mileage and
price, which are on the card.

**Retained as the client's/agency's own claims:** the Facebook-first channel rationale,
the three-buyer voice framing, and **"Seven Canva templates"** — the count is confirmed
by the user.

## Motion

CSS-first: sticky rail, toggle state, card hover, lightbox fade+pop. A
`prefers-reduced-motion` block disables the lightbox animations, hover transforms and
button transitions, targeting only selectors that exist.

## Scope guardrails (YAGNI)

- Only assets that exist. **No raw/finished fabrication**, no invented hang-tag text.
- Story-format duplicates, `.af` working files, logo trials and the duplicate logo
  are not shipped.
- No prev/next adjacent-client nav.

## Success criteria

- `/portfolio/minauto` renders the bespoke page; index shows frame **018**, "Now
  showing", `LOGO · BRANDING · SOCIAL MEDIA`.
- Four lockups render, L.04 legibly on navy; the spec sheet is the real client image.
- The card toggle switches between two real cards and is keyboard-operable.
- All nine sets open in a set-scoped lightbox, **fully visible, not cropped**, ←/→
  wrapping within the set and the counter matching the set length.
- `prefers-reduced-motion` honored; type-checks, lints and builds clean; responsive at
  ~980 / ~560px.
