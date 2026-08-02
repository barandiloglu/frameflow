# Gallery — Reveal Sequence & Photo Showcase

**Route:** `/gallery` · **Date:** 2026-08-02 · **Source effect:** `hero-24` (Awwwards Pack)

Rebuilds `/gallery` as a chrome-free photographic showcase fronted by a reveal
sequence adapted from `hero-24`, ending on a 3×3 grid whose tiles open by scaling
up behind an inset clip-path.

---

## Goal

The gallery becomes a pure showcase of FrameFlow's real photography. No navbar,
no footer, no invented metadata — images, a reveal, and a way back.

---

## What this replaces

`src/app/gallery/page.tsx` is 992 lines and contains **zero photographs**. Every
"print" is a CSS gradient (`toneStyles`) carrying invented titles, locations and
EXIF — aperture, shutter speed, ISO, film stock, lens. None of it is real.

It is replaced wholesale. Nothing genuine is lost.

The fake EXIF cannot be swapped for true EXIF: of the 76 real photographs in the
repo, **2 carry camera metadata**. Captions instead name the client and the
subject, which is data we actually hold.

---

## Source effect, verified

Read from `script.js` and `styles.css`, and confirmed against the preview video
frame by frame. `hero-24` is a ~10s auto intro in four movements:

| # | Movement | Mechanics |
|---|---|---|
| 1 | Logo wipe | `.loader h1` has a 200%-tall linear-gradient as `background-image` with `-webkit-text-fill-color: transparent`; animating `background-position` from `0% 100%` to `0% 0%` wipes the fill upward. 1s per line, sequential. |
| 2 | Metadata columns | Two columns of project/director/location fade in (`opacity`, stagger 0.075), brighten to `#fff`, fade out. |
| 3 | Grid reveal + shuffle | 3×3 grid, each `.img` starts at `clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)` (zero height at top) and animates to the full rect. Duration 1, stagger 0.05, ease `hop`. Then **20 cycles at 0.15s**, each swapping all nine `img.src` for a random 9 of 35. |
| 4 | Collapse and open | The eight non-hero tiles clip back to zero height. The hero tile moves `y:-50`, then scales to 4 while its clip-path insets to `polygon(20% 10%, 80% 10%, 80% 90%, 20% 90%)`; simultaneously the inner `<img>` counter-scales 2→1. Two banner images scale 0→1 and translate to `left: 40%/60%` at ∓20°. Nav slides from `y:-125%`. Title/intro words rise from `y:110%`. |

**The ease.** `CustomEase.create("hop", "0.9, 0, 0.1, 1")` is exactly
`cubic-bezier(0.9, 0, 0.1, 1)` — a hard hold at both ends with a fast middle.
This value is why the reveal reads as mechanical rather than soft. Preserve it.

**The shuffle is not animated.** `gsap.to({}, {duration: 0, delay: cycle * 0.15})`
is GSAP used purely as a timer. It is a scheduled `src` swap, nothing more.

---

## Adaptation

### Sequence

| Phase | Duration | What happens |
|---|---|---|
| Overlay | 0 → 1.6s | Near-black ground. "GALLERY" wordmark fills via the background-position wipe. **The image pool preloads here** — this phase exists to cover it. |
| Grid reveal | 1.6 → 2.8s | 3×3 clip-path reveal, stagger 0.05, duration 1, ease `cubic-bezier(0.9,0,0.1,1)`. Overlay fades as it starts. |
| Shuffle | 2.8 → 5.8s | 20 cycles × 0.15s, nine tiles drawing from the full pool. |
| Settle | 5.8 → 7.0s | Shuffle stops on a fixed nine. Eyebrow and title words rise from `y:110%`, stagger 0.1, `power3.out` equivalent. Back link fades in. |

≈7s, against hero-24's 10. Movement 4's collapse-to-one and the fanned banners
are **cut** — that motion is repurposed as the click interaction below.

Fires on **every visit** (user decision, 2026-08-02).

### Opening a photo

Clicking a tile runs hero-24's movement-4 opening in isolation, on that tile:

- the tile scales up and its clip-path insets, over 1.5s, ease `hop`
- the inner `<img>` counter-scales 2→1 across the same window
- the 1600px derivative swaps in as it opens
- caption (client · subject) fades in beneath

Escape, backdrop click, or the close control reverses it. **Opened photos never
upscale past their natural width** — 16 of the 76 are 700–900px wide (all
Adrian's) and would turn to mush stretched full-bleed. They display centred at
native size instead.

### Metadata columns — cut

hero-24 fills its load window with two columns of project/director/location. We
have five clients with photography; those columns would be thin, and padding
them means inventing rows. The shuffle fills the window better. If they are
wanted later, the honest version is five real client names with photo counts.

### Chrome

No navbar, no footer — both are rendered by the page itself, not the layout, so
this is a deletion with no routing change. A single fixed back mark
("FrameFlow ← back") in the top-left, in `--font-mono`, fading in during Settle.

---

## Photographs

76 files across five clients:

| Client | Count | Captions in roster? |
|---|---|---|
| Adrian's Wasaga Beach | 16 | ✅ alt + slate |
| Big Bears Baked Potato | 12 | ✅ alt + slate |
| Canapy Furniture | 13 | ✅ alt + slate |
| Destan Turkish Cuisine | 15 | ✅ alt + slate |
| ConnecTR | 20 | ❌ not in roster |

**56 already carry verified `alt` and `slate` text** in `src/data/clients.ts` —
reuse them verbatim; they were written against the actual images.

ConnecTR's 20 have no roster entry. Their captions must be written by **opening
each image and describing what is in it** — description, not invention. Any
photo that cannot be described accurately is dropped rather than captioned
vaguely.

Orientation: 57 portrait, 19 landscape, 0 square. Portrait suits the format; the
grid tiles are square with `object-fit: cover`.

---

## Image pipeline

208 MB of unoptimised originals cannot ship, and the shuffle needs every pooled
image decoded before it starts or it flickers blank.

A build-time script generates two derivatives per photo into
`public/gallery/`:

| Set | Spec | Measured | Total | Loading |
|---|---|---|---|---|
| `thumb/` | 400px wide, WebP q72 | ~14 KB avg | **≈1.0 MB** | preloaded during Overlay |
| `full/` | 1600px wide, WebP q80, `withoutEnlargement` | ~295 KB avg | ≈22 MB | lazy, on open only |

Measured with `sharp` 0.34.5 (already a dependency via Next.js) on three
representative files: a 7.4 MB 2160×3848 Destan frame → 15 KB thumb / 530 KB
full; a 5.2 MB Canapy frame → 10 KB / 287 KB; a 0.1 MB Adrian's frame → 16 KB /
69 KB.

The originals stay where they are — the portfolio case studies still use them.

**Preload gate:** the reveal does not advance past Overlay until every thumb has
decoded (`Promise.all` over `img.decode()`), with a 4s timeout that proceeds
anyway rather than trapping the visitor behind a stalled request.

---

## Motion library

**framer-motion, already in the project. No GSAP.**

hero-24 needs GSAP for `CustomEase` and `SplitType`, but the ease is a plain
`cubic-bezier`, the word split is `.split(" ")` in JSX, and the shuffle is a
timer. Adding ~70 KB for three primitives we already have is not justified.

---

## Accessibility

- **Skip.** A "skip" control, present from the first frame, jumps to Settle.
  The reveal still fires every visit; skip only serves the visitor who has seen
  it. Without it a 7s gate becomes a toll on repeat visits.
- **`prefers-reduced-motion: reduce`.** Lands directly on the settled grid. No
  overlay wipe, no shuffle, no clip-path reveal. Opening a photo cross-fades
  instead of scaling.
- **Opened photo traps focus**, returns it to the originating tile on close, and
  closes on Escape. Tiles are `<button>`s, reachable and operable by keyboard.
- The reveal is decorative: the grid and its captions are in the DOM from the
  start, so assistive tech is never waiting on an animation.

---

## Global constraints

- Contrast ≥ 4.5:1 for text, ≥ 3:1 at ≥24px, measured on the rendered page.
- No horizontal document overflow at 1440 / 1080 / 880 / 520 / 390.
- The opened photo uses a **definite** height, never `max-height` (the IYN crop
  regression).
- Every caption traces to roster text or to a description written from the image
  itself. Nothing invented.
- No fabricated EXIF, dates, or camera data anywhere on the page.
- `tsc --noEmit` clean; no new lint errors over the known 6-error baseline.

---

## Scope guardrails (YAGNI)

- No filtering, sorting, tags or search.
- No infinite scroll — the grid is nine tiles drawn from the pool.
- No per-photo detail routes; opening is in-page.
- No GSAP, no Lenis, no new dependency of any kind.
- The banner-image fan and collapse-to-one from hero-24 are not rebuilt.

---

## Success criteria

1. `/gallery` renders no navbar and no footer, and the back mark returns to `/`.
2. The sequence runs Overlay → Reveal → Shuffle → Settle in ≈7s, and the pool is
   fully decoded before the grid appears — no blank or half-loaded tiles.
3. Clicking any tile opens that photo with the scale + counter-scale move; the
   full-resolution file is what ends up displayed; nothing upscales past native.
4. Skip works from the first frame; reduced-motion lands straight on the grid.
5. Opened photo traps focus, restores it, closes on Escape and backdrop.
6. Zero console errors, no overflow, no contrast failures at all five widths.
