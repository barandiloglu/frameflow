# CTBDH — four design directions

Four FrameFlow portfolio prototypes for **CTBDH (Canada Türkiye
Business Development Hub)**. Same approach as Big Bears, Destan and
Canapy — the page **adopts the brand's visual language** (palette,
type, feel), then uses the standard FF Reel structural skeleton.

| # | Direction       | Path                                                            | One-line |
|---|-----------------|-----------------------------------------------------------------|----------|
| 01 | **The Reel**    | [`../ctbdh-reel/index.html`](../ctbdh-reel/index.html)          | Black + red film-festival programme. Each member business is a "screening" with title card, runtime, sector, synopsis. |
| 02 | **The Roster**  | [`../ctbdh-roster/index.html`](../ctbdh-roster/index.html)      | White-led directory of all ten members as cards. Most utilitarian — sized for trade browsing. |
| 03 | **The Annual**  | [`../ctbdh-annual/index.html`](../ctbdh-annual/index.html)      | Yearbook editorial on cream paper. Foreword from the network, then ten magazine-feature spreads. Bilingual EN/TR. |
| 04 | **The Edition** ★ | [`../ctbdh-edition/index.html`](../ctbdh-edition/index.html)  | **Annual × Reel hybrid.** Annual's editorial register + Reel's "screenings, in order" programme list at the top, then full magazine-feature spreads below. Anchor links jump from each screening to its feature. |

> **★ The Edition** is built on top of Annual's storytelling and pulls
> in Reel's "screenings, in order" block — the at-a-glance index sits
> between the foreword and the deep features. Click any screening's
> *"Read story ↓"* to anchor down to its full magazine-feature
> spread; from any feature, *"↑ Back to programme"* returns to the
> index.

---

## The brand kit (shared across all three)

CTBDH is a **network of ten Turkish-Canadian businesses** rather than
a single brand — but the master mark we built (red `ct` ligature on
black, with a bilingual wordmark) sets the visual register. All three
prototypes are unmistakably CTBDH:

- **Palette** — built around the CTBDH master mark and a quiet
  cultural fact: **red and white are the colours of both the Turkish
  AND Canadian flags.**
  - Stage Black `#0A0A0A` — the master mark's surface
  - CTBDH Red `#B91D1D` — primary accent (the `ct` ligature)
  - Bone / Cream / White (varies by direction) — page surface
  - Char `#1C1C1C` — secondary tonal on the dark direction
- **Type** — **Inter** as the workhorse sans, **JetBrains Mono** for
  uppercase tracked labels and meta. The Annual adds **Fraunces**
  italic for editorial register.
- **Voice** — bilingual touches throughout. *Türkiye × Canada*,
  *Komşu komşunun külüne muhtaçtır* (a neighbour needs even the
  ashes of his neighbour), *Toronto · Concord · MMXXV*. The page
  acknowledges the bicultural identity without leaning on stereotypes.
- **The work we did** — two services, both equally important:
  1. **Logo &amp; Identity** — the red-on-black `ct` mark, bilingual
     wordmark, and a kit for member businesses to flag their CTBDH
     affiliation.
  2. **Videography** — ten 16:9 commercial business-story films, one
     per member, filmed on location across the GTA.

All three use the **same FF Reel featured-page skeleton**:

```
FF top rail (← Portfolio · ★ #C-XX · CTBDH · Toronto · 2025)
   ↓
Hero (the master mark moment)
   ↓
Intro / foreword
   ↓
Member showcase — varies per direction
   ↓
Marks (palette + type)
   ↓
Scope (Logo + Videography)
   ↓
End CTA + Footer (FF identification)
```

What differs is **the layout of the member showcase** and the overall
register (cinema · directory · yearbook).

---

## Direction 01 — *The Reel* (film-festival programme)

> **Cinema register. Black-and-red. The videos lead.**

Sticky FF rail with a pulsing `REC` dot. A full-screen **opener**
(the CTBDH mark on warm radial glow, big italic "A Programme of Ten
Stories", cue arrow). Bilingual marquee strip in CTBDH red below.
The Programme itself is **a list of ten "screenings"** — each row
has:

- A screening number (`S.01` … `S.10`)
- A 16:9 poster card with the member logo on a dark gradient + play
  button + corner stamp
- Member name + sector tag + short synopsis
- A big `2:34` runtime in light-weight Inter
- A `Watch →` CTA button that fills with red on hover

A short **Intermission** breaks the programme at the half-mark
("A network is the sum of its *introductions*"). Marks block runs
the palette and type, scope rows close out, and a colophon footer
identifies it as a FrameFlow Reel.

**Use this if** the priority is **emotional weight and dwell time**
— treats the videos as the centerpiece, the network as the storyteller.
Most cinematic of the three.

---

## Direction 02 — *The Roster* (member directory)

> **Trade-friendly. White + red. Card grid sized for scanning.**

A **directory layout** sized for trade browsing. Hero is a split
title block + a small CTBDH-mark tile and a 4-cell stat strip
(Members · Sectors · Films · Locations). A short two-column intro.
A visual **filter chip strip** ("All · 10 · Professional Services ·
Food &amp; Drink · Home &amp; Surfaces · Consulting · Lifestyle")
that telegraphs the sector breakdown.

The roster is a **3-column grid of member cards** — each card has a
16:9 video poster (logo on dark gradient with play button), then a
clean info block: M-number · est. year · name · sector · one-line
synopsis · `Watch story →` link · location.

A **Locations** block lists the two CTBDH head offices (Concord HQ
and Toronto Branch) plus member-shoot count, with real addresses
pulled from the live site.

**Use this if** the priority is **practical browsing for the trade**
— a member or partner can scan all ten in 30 seconds. Most utilitarian
of the three; closest to a chamber-of-commerce member directory.

---

## Direction 03 — *The Annual* (yearbook editorial)

> **Most narrative. Cream paper. Bilingual EN/TR throughout.**

The page is shaped as a **printed annual** — Volume I, The Annual,
Spring MMXXV. Cover spread with Fraunces italic title ("An Annual
of Ten Stories.") and a Turkish line below in the same italic
("Bir şirketler birliğinin yıllığı, on hikâyede.").

A **Foreword from the Hub** (italic title with bilingual subhead,
real drop-cap, signed editorial signoff) sets the network's voice.
A **table of contents** lists all ten with page numbers. Then ten
**magazine-feature spreads** — each with:

- A large italic Roman numeral
- Bilingual lead line ("Üçüncü hikâye — *ilk faturadan ilk denetime.*")
- A magazine-style headline ("From first invoice to *first audit.*")
- Sector tag · location
- A short editorial blurb
- A **pull-quote** in Fraunces italic
- A 4-cell spec sheet (Founded · Location · Sector · Runtime)

Spreads alternate left/right photo placement. A bilingual **proverb
interlude** breaks the rhythm at the third feature ("Komşu
komşunun külüne muhtaçtır" / "A neighbour needs even the ashes of
his neighbour"). Marks block, scope rows, and a colophon close it
out.

**Use this if** the priority is **narrative depth and bilingual
positioning** — works as a stand-alone publication that CTBDH could
print and distribute at trade events. Most demanding to maintain
(every story needs a real quote, a real founding year, real
copy) but the most *substantial* of the three.

---

## Direction 04 — *The Edition* (Annual × Reel hybrid)

> **The combination prototype. Programme up top, deep stories below.**

Built on the request to combine Annual's storytelling with Reel's
"screenings, in order" listing. Sits in **Annual's brand kit** —
cream paper, Fraunces italic, bilingual EN/TR, CTBDH red accents —
but inserts the **Programme** block (lifted from Reel and restyled
for cream) between the foreword and the magazine features.

The sequence:

1. **Cover** — Volume I, *The Edition*, Spring MMXXV
2. **Foreword** — letter from the Hub with bilingual subhead, real
   drop-cap, signed editorial signoff
3. **Programme** — *"The screenings, in order."* — ten numbered
   rows (italic Roman numerals i–x) with poster card · sector ·
   synopsis · runtime · "Read story ↓" anchor link to the feature
4. **Bridge** — *"Below, the long version of each story."* — Turkish
   line beneath
5. **Ten magazine-feature spreads** — alternating left/right photo
   placement, italic Roman numeral, bilingual lead, magazine
   headline, sector tag, blurb, pull-quote in Fraunces italic,
   4-cell spec sheet, *"↑ Back to programme"* anchor at the foot
6. **Bilingual proverb interlude** between features 3 and 4
   (*Komşu komşunun külüne muhtaçtır*)
7. **Marks · Scope · Colophon · Footer**

**Use this if** you want a reader to be able to **scan the whole
network in 60 seconds** AND **read any story in depth** without
leaving the page. The Programme is the index; the Features are the
chapters. The page is one long publication that works as both.

---

## How to choose

| If the priority is...                                                | Pick                |
|----------------------------------------------------------------------|---------------------|
| Emotional weight, video-led, cinematic dwell                         | **01 — The Reel**   |
| Practical browsing, sector filter, trade audience                    | **02 — The Roster** |
| Narrative depth, bilingual, print-ready as a publication             | **03 — The Annual** |
| **Both** — index + deep stories on one page, anchor-linked           | **04 — The Edition** ★ |

The four map across two axes:

```
                      surface
                  dark ←——→ light/cream
                       │
   utilitarian       Roster
                       │
                  ─────┼─────
                       │
   narrative         Reel ←──── Annual
                       │
```

**Edition** sits between Reel and Annual on this map — same cream
surface as Annual, but with Reel's structured programme block giving
it Reel's at-a-glance scannability. Hybridising further is realistic
— the Roster's sector-filter strip could be added above the
Edition's programme; the Reel's dark cinema register could host the
same content for projector-screening events.

---

## Member roster (used in all four)

Ten Turkish-Canadian businesses we filmed:

1. **ASD Laminat** — Surfaces / Manufacturing — Concord
2. **Atlas Food &amp; Beverage** — Food / Distribution — GTA
3. **Aydin CPA** — Accounting / Professional Services — North York
4. **Bookkeeping Bizz** — Bookkeeping / Small Business — Toronto
5. **GRP Rugs** — Home / Retail — Concord
6. **JC Professional Co.** — Tax &amp; Advisory — Toronto
7. **NEO Project Consulting** — Consulting / Construction — Mississauga
8. **Northern Pathways Immigration** — Immigration — Toronto
9. **Sapphirus** — Lifestyle / Brand — Toronto
10. **Urla Fine Foods** — Food / Specialty — Etobicoke

Note: ASD Laminat, Aydin CPA, and Northern Pathways are also
**individually** in the FrameFlow client roster — the CTBDH page
showcases the network engagement, not the per-client work.

The Edition uses the same ten-member roster as the others; its
Programme block links each row directly to that member's deep
feature spread further down the page.

## Assets used

```
public/portfolio/ctbdh/
├── logo/
│   ├── ctbdh-primary.png    (full logo on black with bilingual wordmark)
│   └── ctbdh-mark.png       (just the ct mark, white-bg variant)
└── members/
    ├── asd-laminat.png
    ├── atlas-food-beverage.png
    ├── aydin-cpa.png
    ├── bookkeeping-bizz.png
    ├── grp-rugs.png
    ├── jc-professional.png
    ├── neo-project-consulting.png
    ├── northern-pathways.png
    ├── sapphirus.png
    └── urla-fine-foods.png
```

## Open issues

- **Videos**: source clips are too heavy to commit to `public/`
  without transcoding. All three prototypes mock the ten films with
  **logo-on-dark poster cards** and a play overlay so the layout is
  reviewable. Real video posters wire in once we transcode short
  web-friendly versions (target ~3–8 MB H.264 16:9).
- **Sector / founding-year / location copy** is reasonable
  inference (each business's logo + name + general industry).
  When CTBDH provides verified bios, we'll lift the copy directly
  from the network's records.
- **Color treatment per logo**: brand-coloured logos (Atlas,
  Bookkeeping Bizz, GRP, NEO, Northern Pathways, etc.) keep their
  original colour on dark posters; monochrome marks (ASD, Sapphirus)
  invert to white. The Roster has a `keep` class that controls this
  per-card.
