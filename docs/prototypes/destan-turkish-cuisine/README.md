# Destan Turkish Cuisine — six design directions

Six distinct prototypes for the Destan featured client subpage.
Each is a self-contained HTML file — open `index.html` directly in any
browser. No build step required.

| # | Direction          | Path                                                              | One-line |
|---|--------------------|-------------------------------------------------------------------|----------|
| 01 | **The Saga**      | [`../destan-saga/index.html`](../destan-saga/index.html)          | A bound literary edition. Plates I–XV, foreword, three chapters, colophon. |
| 02 | **The Smoke**     | [`../destan-smoke/index.html`](../destan-smoke/index.html)        | Chef's-Table title-card. Black, ember-glow, letterboxed scenes, timecode rail. |
| 03 | **The Bazaar**    | [`../destan-bazaar/index.html`](../destan-bazaar/index.html)      | Maximalist Ottoman. Bilingual labels, lantern frames, gold-on-burgundy. |
| 04 | **The Gazette**   | [`../destan-gazette/index.html`](../destan-gazette/index.html)    | Turkish broadsheet newspaper. Masthead, columns, classifieds, halftones. |
| 05 | **The Atelier**   | [`../destan-atelier/index.html`](../destan-atelier/index.html)    | Modernist museum/Wallpaper. Generous white space, oversized photo crops. |
| 06 | **The Field Notes** | [`../destan-field-notes/index.html`](../destan-field-notes/index.html) | Travel journal. Polaroids on tape, typewriter letters, Erzurum→Toronto map. |

All six pull from the same asset folder
(`public/portfolio/destan-turkish-cuisine/`) — the **15 selected stills**
and the **three logo colorways** — so the comparison is a question of
voice, not content.

---

## The brief, decoded

The brand name *destan* is Turkish for **epic poem / saga**. The logo is
a classical serif wordmark with a literal flame above and an Ottoman
flourish below — heritage register, not casual. The Instagram presence
is dark, smokey, candle-lit: cast iron pans on flames, hand-torn
bread, fire-cooked meats. Palette: deep burgundy `#73191c`, saffron
gold `#e9b44a`, ivory `#ffffff`. **This is not a casual diner — it's an
epic kebab house.**

Every prototype here treats the brand at that register. They differ in
how loud they are about it.

---

## Direction 01 — *The Saga* (literary / manuscript)

> **Quietest. Most refined. Reads like a printed book.**

The brand's name literally means "epic poem," so the page is set as a
bound literary edition. Foliated pages (Roman numerals in the margin),
a verso/recto cover spread, a frontispiece opposite a foreword with a
real drop-cap, three chapters ("Of the Fire," "Of the Cut," "Of the
Plate"), a numbered Plates gallery (I–XV), a Reel of Films, a marks
&amp; type colophon, and a closing **FINIS**.

**Type:** Cormorant Garamond display, EB Garamond body, Italianno for
hand-set asides, JetBrains Mono for folio numbers and labels.
**Palette:** ivory paper, burgundy ink, muted gold, deep ink black.
**Texture:** fine paper grain over the whole page.
**Motion:** subtle reveal on scroll. No marquee, no auto-play.

**Use this if** Destan wants to position as the most serious Turkish
restaurant in the city — gift-shop, prix-fixe, tasting menu, **slow
food** energy. It's the most demanding to maintain (every word on the
page is doing work), and the least social-media-native.

---

## Direction 02 — *The Smoke* (cinematic / Chef's Table)

> **Boldest photography. Full-bleed. Slow film grain. Treats the page as a film.**

The page is structured like a Chef's Table title sequence: a fixed
top rail with **REC dot, "DESTAN · SMOKE", and a live ticking
timecode** (`TC 01:02:14:08`); a full-screen opener with letterboxing
and the title set in big italic Bodoni; "Act I / Act II / Act III"
title cards between scenes; **full-bleed photography** with mono slate
metadata ("SCN 04 · INT · CARVING · NIGHT · F2.0 · 1/250 · ISO 1250");
a Turkish proverb marquee; and a vertical-credits closing list.

**Type:** Bodoni Moda italic display, Inter Light body, JetBrains
Mono for the slate UI.
**Palette:** ink black, ember red, saffron gold, bone off-white.
**Texture:** animated film grain (steps timing function) + warm
ember/burgundy ambient color washes.
**Motion:** opener letterbox reveal, slow scene zoom, marquee, REC
dot pulse, live timecode counter.

**Use this if** the goal is to drive **emotion and dwell time** — the
photography is the strongest asset Destan has, and this direction
gives it the most room to breathe. It's also the most directly
adaptable to the existing FF Reel chrome (cinematic register matches).

---

## Direction 03 — *The Bazaar* (maximalist / Ottoman)

> **Loudest. Most ornate. Bilingual. Most distinctly Turkish.**

A maximalist take that leans into the **heritage** angle without going
gentle. Burgundy and gold full-bleed blocks; an Ottoman tile band as
horizontal divider; lantern-style ornate photo frames (cream mat, gold
corner glyphs, thick burgundy border, hard drop shadow); a marquee
in gold-on-burgundy with **bilingual menu items** ("Adana · Cağ
Kebabı · Şiş Tavuk · Lahmacun · Bread · Salt · Fire · Smoke"); a
proper menu poster with hand-set Roman numerals; bilingual labels
throughout (`Ateş · Fire`, `Altın · Gold`, `Mürekkep · Ink`).

**Type stack of five:** Cinzel (engraved Roman caps), DM Serif Display
italic, Italianno script, Caveat handwritten, JetBrains Mono.
**Palette:** the brand's burgundy, saffron, cream, ink — used at full
saturation in big blocks.
**Texture:** paper grain, faint Ottoman star pattern, gold rules,
double-burgundy borders.
**Motion:** marquees, hover tilts on lantern frames, hover pop on
film cards (yellow border + drop shadow language matching Big Bears).

**Use this if** Destan wants to feel **distinctly Turkish at first
glance** — it's the most market-stall, most cultural, and the loudest
of the three. Closest in energy to the Big Bears featured page, but
in a heritage register instead of a mascot one.

---

## Direction 04 — *The Gazette* (broadsheet newspaper)

> **The page IS a newspaper. Dense, gridded, journalistic.**

Treats the work as a printed front section of a Turkish gazette.
Masthead with **Old Standard TT** title plate, dateline, edition
number, price; banner headline (*"Fire writes the story."*) with
deck and byline; **lead photo with proper cutline** ("FIG. 01 ·
F2.0 · 1/250 · ISO 1250"); a four-column body with drop cap and
jump line ("Continued on Page B-2"); a side rail with a numbered
**Index**, a "Today" weather box, and an Advisory bulletin; a
**B-section header** ("B-2 · The Photo Gallery · Of the Fire");
mixed-grid photo essay with cutlines; **Classifieds** styled as
"Wanted: Photography / Videography / Social Media / Ad Management";
**TV Listings** for the six trailers ("8:00 · FF·01 · The Rotation,
slow"); a Style Guide spec; and a **— END EDITION —** sign-off.
Photos rendered as black-and-white halftones (dot pattern overlay).

**Type:** Old Standard TT (masthead), Playfair Display Black
(headlines), Source Serif (body), JetBrains Mono (folios &
cutlines).
**Palette:** newsprint cream, deep ink, burgundy-as-second-color.
**Texture:** newsprint paper grain, faint vertical center fold,
halftone dots over photos.

**Use this if** the goal is **information density and authority** —
plays well for press kits, year-in-review summaries, or when the
work needs to read as journalism. Distinct from the Saga (literary
book) by being mass-market broadsheet and dense, not refined.

---

## Direction 05 — *The Atelier* (modernist / Wallpaper magazine)

> **Most restrained. Most contemporary. Most generous with white space.**

The opposite end of the spectrum from Bazaar — frames Destan as a
**contemporary art object**. Establishing block with the title set
in **Inter 200 with negative tracking** ("Destan, *after the fire.*"),
flanked by tiny mono meta in 1-fr columns ("Issue · Reel 010 ·
Subject · Destan, Toronto"). A heroic photo with a one-line caption.
A narrow column of body text with sidebar metadata. **Object 01** —
single oversized photo with a quiet metadata table beside it ("Plate
I · 03·14·26 · A7S III · 50mm · F2.0 · 1/250 · ISO 1250"). Pairs of
photos with thin captions. A **List of Plates** as a museum index
(numbered 01–15, dates only). A 5-column **contact sheet** with
small thumbnails. A **Scope of Work** spec with four rows. A
restrained palette swatch grid. Burgundy used **only as accent** —
the page is mostly bone-white.

**Type:** Inter 200/300 (display + body), Cormorant Garamond italic
(occasional voice), JetBrains Mono (UI labels). One sans, one
serif-italic, one mono — three voices total.
**Palette:** bone, ink, burgundy as accent only, saffron sparingly.
**Texture:** none. Hairline rules and clean grid.

**Use this if** Destan wants **press from architecture/design
publications**, gallery-adjacent positioning, or simply a website
that won't feel dated in five years. The most restrained of the
six, and the most adaptable to the existing FF Reel chrome
(modernist register matches).

---

## Direction 06 — *The Field Notes* (travel journal / Bourdain)

> **Most personal. Most tactile. The page is a scrapbook.**

A travel-journal scrapbook — Polaroid-bordered photos rotated and
**taped down** with masking-tape strips, sticky notes in tape-yellow
and painter-tape blue, typewriter "**Memo · 04**" cards, a
**hand-drawn SVG map** of the route Erzurum → Toronto with a
compass rose and "~ 8,200 km (give or take a wedding)" note, a
**typewritten letter to the chef** with red-pen marginalia and a
restaurant **receipt** stuck to the corner ("Cağ kebabı · $24"),
and a **filmstrip** for the videos rendered as a black film
negative with sprocket holes. Photos are slightly rotated, layered,
out of order on purpose. First-person voice throughout: "I came
back three times before you stopped looking at the camera."

**Type:** Caveat (handwriting), Special Elite (typewriter), IBM
Plex Mono (UI), Cormorant italic (rare quotations). Four hands,
one of them mechanical.
**Palette:** aged journal paper, brown-black ink, burgundy, saffron,
red-pen marginalia, painter-tape blue.
**Texture:** notebook horizontal rule lines, paper grain, soft
shadows under taped Polaroids, perforated receipt edge.

**Use this if** the brand wants **warmth and personality** — works
beautifully if the chef has a story to tell, or if Destan is
positioning itself as the kind of place a traveler keeps a journal
about. Highest emotional impact, hardest to maintain (every
Polaroid rotation, every margin scribble, costs effort).

---

## How to choose

| If the priority is...                                 | Pick                  |
|-------------------------------------------------------|-----------------------|
| Press, awards, "serious restaurant" positioning       | **01 — The Saga**     |
| Photography sells, social drives traffic              | **02 — The Smoke**    |
| Feel Turkish at first glance, match Big Bears energy  | **03 — The Bazaar**   |
| Information density, journalistic authority           | **04 — The Gazette**  |
| Modern, gallery-grade, won't date in five years       | **05 — The Atelier**  |
| Personality, warmth, traveler's-journal feeling       | **06 — The Field Notes** |

The six map roughly across two axes:

```
                 LOUD
                  │
  03 Bazaar ─────┼───── 04 Gazette
        │          │          │
    Heritage ─────┼───── Editorial
        │          │          │
   01 Saga ───────┼─────── 05 Atelier
        │          │          │
    Cinematic ────┼───── Personal
        │          │          │
   02 Smoke ──────┼─────── 06 Field Notes
                  │
                QUIET
```

Hybridizing is realistic: the Saga's chapter structure can host the
Smoke's full-bleed scenes; the Bazaar's bilingual labels can sharpen
the Atelier's marginalia; the Field Notes' typewriter letter can
introduce a Gazette spread. The six are starting points, not
exclusive options.

---

## Assets used

All six prototypes share the same asset folder:

```
public/portfolio/destan-turkish-cuisine/
├── logo/
│   ├── destan-red.png        (#73191c on transparent)
│   ├── destan-gold.png       (#e9b44a on transparent)
│   └── destan-cream.png      (#fffff for dark backgrounds)
├── photos/
│   ├── 01-cag-kebabi-rotating.jpg     (PLATE I    · 03·14·26)
│   ├── 02-cag-kebabi-flames.jpg       (PLATE II   · 01·04·26)
│   ├── 03-cag-kebabi-fire-rolling.jpg (PLATE III  · 02·15·26)
│   ├── 04-cag-kebabi-vertical.jpg     (PLATE IV   · 01·31·26)
│   ├── 05-carving-cag.jpg             (PLATE V    · 03·14·26)
│   ├── 06-blade-on-meat.jpg           (PLATE VI   · 03·14·26)
│   ├── 07-doner-tongs.jpg             (PLATE VII  · 01·10·26)
│   ├── 08-skewers-smoke.jpg           (PLATE VIII · 01·10·26)
│   ├── 09-skewers-coals.jpg           (PLATE IX   · 01·10·26)
│   ├── 10-chicken-skewers-coals.jpg   (PLATE X    · 02·15·26)
│   ├── 11-fish-on-flame.jpg           (PLATE XI   · 03·14·26)
│   ├── 12-peppers-coals.jpg           (PLATE XII  · 03·14·26)
│   ├── 13-adana-plated.jpg            (PLATE XIII · 01·04·26)
│   ├── 14-adana-lavash.jpg            (PLATE XIV  · 01·31·26)
│   └── 15-table-spread.jpg            (PLATE XV   · 01·31·26)
└── videos/   (deferred — see note below)
```

## Open issue: videos

Source video clips on the D: drive are 30 MB – 1.6 GB raw — too heavy
to commit to `public/`. **All six** prototypes mock the video sections
with poster-image cards + a play overlay so the layout is reviewable.
Once we transcode short web-friendly versions (target ~3–8 MB H.264
at 9:16), we'll wire them up via `<video poster>` in whichever
direction is chosen.

## Service tag note

The Destan entry in `src/data/clients.ts` currently lists three
services (`Photography`, `Social Media`, `Videography`). Per the
brief, **add `Ad Management`** and reorder — the chosen prototype
will read four scope tags from the data, so this update should land
alongside whichever direction is approved.
