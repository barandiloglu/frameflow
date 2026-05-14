# Northern Pathways — fresh design directions (post-cleanup)

Fresh prototypes for **Northern Pathways Immigration Consulting**,
built independently of the prior 12 portfolio attempts. Same locked
brand DNA, same locked typography (Montserrat only), same locked
palette (Maple Red `#B92025` · White · Off-white `#F9F9F9` · Dark
Charcoal `#2C2B2B`). All honour the **4:5 portrait** native ratio
of the firm's actual Instagram posts.

> **Two batches.** The first three (13–15) kept a familiar
> structural skeleton — section bars, browser-chrome mockups,
> form-left/score-right calculator panels. After feedback that
> "they all look the same", the next three (16–18) explicitly
> **broke the skeleton** and tried radically different surfaces:
> a magazine profile, a chrome-free wall, a single Pentagram-poster
> composition.

| # | Direction              | Path | One-line |
|---|------------------------|------|----------|
| 13 | The Stamp Album        | [`../np-stamp-album/index.html`](../np-stamp-album/index.html)             | Philatelic album. Posts as commemorative stamps. Website as first-day cover. |
| 14 | The Transit System     | [`../np-transit/index.html`](../np-transit/index.html)                     | Vignelli subway map. Five differentiated lines, 11 stations. Calculator = TVM. |
| 15 | The Cinema One-Sheet   | [`../np-cinema-one-sheet/index.html`](../np-cinema-one-sheet/index.html)   | Saul Bass festival. Five film posters. Calculator = box office. |
| 16 | **★ The Profile**      | [`../np-profile/index.html`](../np-profile/index.html)                     | **Magazine editorial.** No section bars, no chrome. Long-form profile of Burcu Akyol with drop-cap, two-column body, and inline image figures. The work appears as embedded illustrations within the article, not as labelled sections. |
| 17 | **★ The Wall**         | [`../np-wall/index.html`](../np-wall/index.html)                           | **Pure masonry, zero chrome.** No header, no sections. The visitor lands on a Pinterest-style wall of varied-size cards: 10 real posts + Burcu-card + website-card + calculator-card + brand-value text cards + stats. FF only as a fixed corner watermark. The page IS the wall. |
| 18 | **★ The Single Sheet** | [`../np-single-sheet/index.html`](../np-single-sheet/index.html)           | **One Pentagram poster.** A single asymmetric composition — huge headline, Burcu's portrait, a hero post, a 280px "487 CRS" number, three small posts, the website thumb, brand values as continuous prose. Designed to be taken in at a glance. No scrollable sections. |

## All three carry

- **The real website** — faithful nav (Home · Our Team · Fees · Events · Blog), Burcu's headshot in the hero, real CTAs, and the **Design & development by Frame Flow** footer credit on every page.
- **The CRS calculator** — 6 categories, 487/1200 readout, signed-PDF export. Each prototype reframes it: customs form (Stamp Album), TVM (Transit), box-office (Cinema).
- **All 10 real Instagram posts** — 8 carousels (`carousel-01/01.png` … `carousel-08/06.png`) and 2 webinar singles (`post-09.png`, `post-10.png`). Carousels are flagged with **▦ pagination** (1/6, 1/9, etc.); webinars with **▶ Live**. Every prototype shows them at their native **4:5 portrait** ratio.
- **Brand DNA throughline** — the five values (Ethical Guidance · Personalised Service · Transparency · Knowledge & Expertise · Care & Lived Experience) thread the narrative explicitly. In the Stamp Album they're postmark cancellations; in Transit they're operating articles in a service pamphlet; in Cinema they're the end-credit roll.

## How to choose

| If the priority is...                                            | Pick                          |
|------------------------------------------------------------------|-------------------------------|
| **Visual archive** — work catalogued like a collection           | **13 — The Stamp Album**      |
| **System literacy** — five lines, one network, transfer at the calculator | **14 — The Transit System** |
| **Showmanship** — five films, festival energy, marquee chrome    | **15 — The Cinema One-Sheet** |

## What's distinctive about each

### 13 · The Stamp Album

A leather-bound philatelic catalogue. Five plates:

1. **Plate I — Service Issues**: 5 commemorative stamp designs, one per practice area, each with country tag, denomination tab (`$ 487 CRS` / `$ 67 FSWP` / etc.) and catalogue ID `NP-001 — NP-005`. Designs use the locked palette as colour fields with bold typographic glyphs (`EE.` `FAM.` `TMP.` `PRC.` `CIT.`).
2. **Plate II — First-Day Cover**: The website rendered as a stamped envelope. Two stamps affixed at top-right (with circular postmarks rotated and partially overlapping). Letter-frame in the centre holds a faithful site mockup.
3. **Plate III — Customs Declaration Form**: The CRS calculator as a regulator-style form. Diagonal red/paper barber-pole strip on top. Tickbox column. Big black "DECLARED" stamp tilted on the score panel. Cancellation stamp at the bottom.
4. **Plate IV — Diaspora Series**: All 10 real posts mounted as commemorative stamps with **real perforated edges** (radial-gradient dot pattern on all four sides). Two carousels (the 9-slide Levels Plan and the 8-slide Study Permit) rendered as **stamp sheets** showing 4 slides each in a grid.
5. **Plate V — Postmark Cancellations**: The 5 brand DNA values as 5 circular postmark designs with curved-text rings.

Closes with a colophon page "End of album."

### 14 · The Transit System

A working transit authority. The marquee piece is a real SVG system map (16:9):

- **Five differentiated lines** through the locked palette: solid red 8px (Line 01 Economic Express), solid charcoal 7px (Line 02 Family Connect), dashed red 6px (Line 03 Temporary Local), dashed charcoal 6px (Line 04 PR Card), thin red on charcoal 4/11px coaxial (Line 05 Citizenship Limited).
- **11 stations** including 4 transfer points where lines cross. The **★ Calculator** at C·II is the central interchange where Lines 01 / 02 / 03 / 04 all converge.
- **2 terminals**: westbound Brief (Line 01 origin) and Citizenship (Line 05 final).
- **Animated draw-in on first paint**: routes stroke-dash-out from 1200, stations pop in with staggered delay.

Below the map: **5 line cards** with custom bullet treatments (each line's bullet uses a different solid/striped/concentric pattern), **a Ticket Vending Machine** rendering the CRS calculator with insert-coin chrome and a "FARE" plate at the bottom, **3 platform-row billboards** holding all 10 real posts vertical at 4:5 with carousel pagination ▦, the website as a **System-map terminal** (Section 04), and a 5-cell **Operating Doctrine pamphlet** for the brand values.

### 15 · The Cinema One-Sheet

A festival programme. The marquee opens with **"Now showing."** at 240px — and the website renders inside a literal **theatre marquee frame** (red bulb-light strips top and bottom, charcoal/cream double-bezel, ticket-stub circles punched at the edges).

Below: **5 one-sheets** as a festival lineup. Each poster is its own **CSS-only flat composition** in the locked palette:
- 01 Express Entry: red field + paper diagonal slab + black paper-airplane silhouette
- 02 Family Connect: paper field + concentric red/charcoal interlocked rings
- 03 Temporary: 50/50 charcoal/paper diagonal split + red diamond
- 04 PR Card: dark field + offset paper card with red stripe (debit-card aesthetic)
- 05 Citizenship: paper field + bold red triangle + black trunk (minimal maple-tree silhouette)

Each poster has festival laurels, vertical credits, a ratings bug, and below sits a film-card with director credit and tied doctrine.

Then: a **Box Office** section rendering the calculator as a ticket booth (window 02/06, ticket No. `487 / 1200`, "Print ticket · PDF" CTA, ticket stub `★ TKT`), the **Festival Poster Wall** with all 10 real posts pinned to a corkboard with **scotch-tape strips** and rotation, the **Director's Chair** card for Burcu (with red "DIRECTOR" tag rotated through the corner), and a closing **End Credits roll** that cycles through all five brand DNA values.

## Brand kit (locked, shared)

- **Maple Red** `#B92025` — primary
- **White** `#FFFFFF` — surface
- **Off-white** `#F9F9F9` — tonal
- **Dark Charcoal** `#2C2B2B` — ink
- **Typography**: Montserrat ONLY (300 / 400 / 500 / 600 / 700 / 800 / 900 + italic 500). No serifs, no scripts.

## Asset paths

```
public/portfolio/northern-pathways/social/
├── carousel-01/01.png … 06.png      (Express Entry consultation, 6 slides)
├── carousel-02/01.png … 04.png      (Super Visa update, 4 slides)
├── carousel-03/01.png … 04.png      (Doctor immigration, 4 slides)
├── carousel-04/01.png … 09.png      (Levels Plan 2026–28, 9 slides)
├── carousel-05/01.png … 08.png      (Study permit visa officer, 8 slides)
├── carousel-06/01.png … 03.png      (Yeni Yaşam seminar, 3 slides)
├── carousel-07/01.png … 06.png      (Ontario OINP, 6 slides)
├── carousel-08/01.png … 06.png      (OINP March 2026, 6 slides)
├── post-09.png                      (PGWP webinar single)
└── post-10.png                      (Levels Plan webinar single)
```

All posts are **4:5 portrait native**. Total: 10 distinct posts, 56 image files.

Open the three. Tell me which one ships.
