# Canapy Furniture — four design directions

Four FrameFlow portfolio prototypes for Canapy. Same approach as
Big Bears and Destan — the page **adopts the brand's visual
language** (palette, type, feel), then uses the standard FF Reel
structural skeleton to showcase the work. Not a clone of
canapyfurniture.com.

| # | Direction         | Path                                                              | One-line |
|---|-------------------|-------------------------------------------------------------------|----------|
| 01 | **The Floor**    | [`../canapy-floor/index.html`](../canapy-floor/index.html)        | Type-led hero, clean 3-column photo grid is the centerpiece. |
| 02 | **The Edit**     | [`../canapy-edit/index.html`](../canapy-edit/index.html)          | Photo-led split hero, three numbered case-study chapters. |
| 03 | **The Spread**   | [`../canapy-spread/index.html`](../canapy-spread/index.html)      | Wordmark flanked by two photos, **asymmetric mosaic gallery**. |
| 04 | **The Catalogue**| [`../canapy-catalogue/index.html`](../canapy-catalogue/index.html)| Specimen catalogue — each plate becomes a numbered SKU entry with full spec sheet. |

> **Baran's pre-pick:** *The Floor*. The two new directions (Spread,
> Catalogue) extend Floor's DNA — same type-led hero approach, same
> brand kit — but treat the gallery differently so you can see your
> favorite against three real alternatives, not three minor variants.

---

## The brand kit (shared across all four)

Pulled from canapyfurniture.com and the wordmark itself:

- **Palette** — intentionally **achromatic**:
  - Bone `#FFFFFF` (page surface, 60%)
  - Paper `#FAFAF8` (tonal sections, 20%)
  - Stone `#E5E3DF` (hairlines, 5%)
  - Charcoal `#111111` (ink, 15%)
  - **No accent colour.** Photography brings the warmth.
- **Typography** — **Hanken Grotesk** throughout. The closest free
  Google Font to the wordmark's geometric sans (open C, angled cuts
  on N, triangular A). Weights 200–700, single family. The wordmark
  is set at `0.32em` tracking with optical centring padding, matching
  the actual CANAPY logo treatment.
- **Voice** — *"Sculpted for spaces that breathe."* / *"Photograph the
  room honestly."* / Toronto-based · Davenport Rd · 4,500 sq ft ·
  trade-program audience.
- **Chrome** — hairline `1px` separators between sections; uppercase
  labels at `0.32em` tracking; soft black buttons that invert on
  hover; no marquees, no decoration, no fake accents.
- **FF identification** — top rail `← Portfolio · ★ #011 ★ · Canapy
  · Toronto · 2026`; footer signs *"Designed by FrameFlow"*. Same
  pattern as Big Bears and Destan.

All four use the **same featured-page skeleton**:

```
FF top rail · Hero · Intro · Marks (palette + type) · Gallery
   · Feature · Scope · Films · End CTA · Footer
```

What differs is **how the gallery is treated** and how the hero
opens.

---

## Direction 01 — *The Floor* (gallery-led)

> **Quietest. Photography forward. Most restrained.**

Type-only hero — centred CANAPY wordmark, tagline below, four scope
tags, four-column meta strip. No hero image. The page opens calm and
lets the gallery be the moment.

The gallery is a **clean 3-column grid** of all 13 plates as plain
rectangles (no decoration). Each card: image · plate number +
timestamp · name · single-line description. Hover gently scales and
reveals a small `↗` mark. Click opens a clean white lightbox with
prev/next.

**Use this if** the priority is **letting the photography breathe**.
Most direct read of the brand's restraint. Easiest to scan.

---

## Direction 02 — *The Edit* (case-study)

> **Most narrative. Designed for storytelling.**

Photo-led **split hero** (Plate 01 left, wordmark + tagline + deck +
scope tags right). Three numbered chapters follow:

- **01 / The brief** — *"Photograph the room honestly."*
- **02 / The work** — *"Four shoots, one quiet kitchen."*
- **03 / The result** — *"An archive that earns its keep."*

Between chapters: a two-photo spread, a full-bleed hero, a centred
pull-quote in the same Hanken Grotesk sans. A 7-column plate index
of small thumbnails closes the gallery. Marks block at the foot.

**Use this if** the priority is **storytelling and case-study
scale**. Works for trade emails, future blog/journal scaling.

---

## Direction 03 — *The Spread* (mosaic gallery)

> **Most visual rhythm. Magazine-spread feel.**

Hero is the wordmark **flanked by two mid-sized photos** (Plate 01
on the left, Plate 13 on the right). Reads like a magazine cover
spread — quieter than Edit's full-photo hero, livelier than Floor's
text-only one.

The gallery is the move: an **asymmetric CSS-grid mosaic** of all
13 plates at variable sizes — a tall portrait holds the left edge,
small landscapes flank, a wide landscape spans the centre, then
tall portraits stack three across. Visual rhythm without breaking
the brand's restraint. Hover reveals plate name + number on a
gradient overlay.

**Use this if** the priority is **visual energy** while keeping
Floor's quiet hero approach. The most dynamic-looking of the four
without sacrificing achromatic restraint.

---

## Direction 04 — *The Catalogue* (specimen catalogue)

> **Densest. Most "trade." Each plate becomes a SKU.**

Type-led hero with an "Edition 011 · Catalogue · Spring 2026"
sub-stripe under the wordmark. The gallery becomes a **sequence of
numbered specimen entries** — each plate gets its own row with:

- A large numbered marker (`01.`, `02.`, …)
- A **SKU code** (`CN-001-CL · Cane Lounge / Demo`)
- Title + descriptive blurb
- A **4-cell spec sheet** (frame, weave, seat, footprint)
- A **photographer's lab line** (`F2.0 · 1/250 · ISO 800 · 50 mm`)

Entries alternate left/right photo placement. After seven detailed
entries, a **13-cell contact sheet** at the foot shows all plates
at thumbnail with a `Download PDF →` link. Closes with the standard
scope rows + films + CTA + footer.

**Use this if** the audience is **interior designers and
architects** specifying for projects — they want materials,
dimensions, and aperture/ISO data, not just a pretty picture. The
most "trade catalogue" feel of the four.

---

## How to choose

| If the priority is...                                  | Pick                  |
|--------------------------------------------------------|-----------------------|
| Photography forward, quiet, instant scan               | **01 — The Floor**    |
| Storytelling, case-study, narrative for the trade      | **02 — The Edit**     |
| Visual rhythm, magazine-spread energy, still quiet     | **03 — The Spread**   |
| Spec data, SKU details, designer/trade documentation   | **04 — The Catalogue**|

The four map across two axes:

```
                     hero approach
              type-only ←——————————→ photo-led
                   │
   gallery as       Floor       Edit
   centerpiece       │           │
                  ───┼───────────┼───
   gallery with     │           │
   structure       Spread    Catalogue
                   │
```

Hybridising is realistic — Floor's grid would slot under Edit's
chapter 02; Spread's hero pattern would replace Floor's with a more
photo-forward opener; Catalogue's spec sheets would fold into Edit
as expandable details. The four are starting points, not exclusive
options.

---

## Assets used

All four prototypes share:

```
public/portfolio/canapy-furniture/
├── logo/canapy-primary.jpg
└── photos/
    ├── 01-cane-chair-backlit.jpg       (P.01 · 09:14)
    ├── 02-cane-weave-detail.jpg        (P.02 · 10:42)
    ├── 03-cane-frame-light.jpg         (P.03 · 06:14)
    ├── 04-wood-arm-cream-cushion.jpg   (P.04 · 11:08)
    ├── 05-frame-cushion-detail.jpg     (P.05 · 11:24)
    ├── 06-arm-boucle-detail.jpg        (P.06 · 11:36)
    ├── 07-cane-corner-sunlit.jpg       (P.07 · 12:02)
    ├── 08-showroom-davenport.jpg       (P.08 · 13:18)
    ├── 09-living-room-reading.jpg      (P.09 · 13:46)
    ├── 10-tufted-headboard.jpg         (P.10 · 14:32)
    ├── 11-vessel-topdown.jpg           (P.11 · 15:14)
    ├── 12-sectional-window-grid.jpg    (P.12 · 14:32)
    └── 13-walnut-arch-table.jpg        (P.13 · 16:48)
```

## Notes

- **Service tags** in `src/data/clients.ts` are already set to
  `["Ad Management", "Photography", "Social Media", "Videography"]`.
- **Videos** are mocked with poster images + a play overlay. Real
  posters wire in once we transcode short web-friendly clips.
- **Font**: Hanken Grotesk loaded via Google Fonts. If Canapy's real
  production face is a commercial sans (Söhne, Founders Grotesk,
  Made Outer Sans), swap the family in `:root --type` and the whole
  page inherits it.
