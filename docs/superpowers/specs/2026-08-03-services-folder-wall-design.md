# Services — The Job Folders

**Route:** `/services` · **Date:** 2026-08-03

Replaces ten screens of near-empty slates with a wall of job folders that fan
out real client work on hover.

Ported from awwwards `hover-20` (Stacked Folder Tabs), read from source at
`pack/Hover Effects/20/code.zip`.

---

## The problem, measured

At 1440×900 the page runs **8891px — 9.9 screens**, across 9 sections and 887
words. It carries **2 images**.

Seven of those screens are near-identical full-height slates, and on every one
the right half is a dashed box containing a giant numeral. A marketing agency
selling visual work, showing none of it — while 76 catalogued photographs and
~400 client assets sit unused.

The hero is not the problem. It stays.

---

## The design

A full-bleed wall of seven folders, one per service. Each is a file folder with
an angled numbered tab, in the production-paperwork language the site already
speaks (work orders, slates, scene headings, frame numbers).

### The folder

```
    ╱▓▓╲  ╱▓▓╲  ╱▓▓╲        three real photos, fanned
   ┌──03────────────┐
   │ WEBSITE DESIGN │       tab: SCENE 03 · DIGITAL
   │ the main stage │
   └────────────────┘
```

The tab's angled edge is `clip-path: polygon(0 0, 25% 0, 100% 100%, 0% 100%)`,
taken verbatim from the source.

**On hover or keyboard focus:** the folder lifts (`y: 25 → 0`, 250ms, back-out
overshoot), three photographs fan up out of it (`y: -100%`) at tilts of
−20…−10°, −10…10° and 10…20°, staggered 25ms; every sibling folder dims.

The source drives this with GSAP. **We do not add GSAP** — the site uses
framer-motion. Port the timing and feel, not the library: `back.out(1.7)`
becomes `cubic-bezier(0.34, 1.56, 0.64, 1)`, the same overshoot.

**Rotations must be deterministic.** The source calls `gsap.utils.random` on
every hover. A render-time `Math.random()` would desync server and client
markup, so tilts come from a fixed per-index table.

**On click or Enter:** the folder expands in place. One open at a time. The
expanded panel carries what is already written — tagline, description, the four
`WHAT'S IN THE FRAME` features — plus the client roll for that service and a
link into the portfolio. No route change.

### The photographs

Three per folder, from `public/portfolio/<client>/…`, chosen to match the
service the client actually bought. Every alt comes from the existing manifest;
none is written for this page.

| # | Service | Source directories | Pool |
|---|---------|--------------------|------|
| 01 | Logo Design | `*/logo/` | 21 |
| 02 | Brand Identity | `*/brand/` | 10 |
| 03 | Website Design | `*/site/`, `*/website/` | 217 |
| 04 | Social Media | `*/posts/`, `*/feed/`, `*/social/` | 107 |
| 05 | Video & Photo | `*/photos/` | 76 |
| 06 | Ad Management | `fidan-construction/ads/` | 5 |
| 07 | Web & Mobile Apps | — | **0** |

Picks are pinned in a constant, not computed at render, so the page cannot
silently change when the roster does.

### Folder 07 has no fan

`Web Application` is tagged on two clients. Acorn Accounting is `wip: true` and
has no directory under `public/portfolio` at all; Northern Pathways has no site
or app captures. There is no honest image to show.

So folder 07 does not fan. It carries its client count and status in mono
instead — a job folder that is still open, which is both true and legible in
this design's own language. It must never be filled with unrelated photography
to match its neighbours.

### Below 1000px

The source disables hover entirely below 1000px; we keep that. Folders become a
single-column stack, each showing one photograph, and a tap opens the detail
directly. No fan, no lift.

### What goes

- The seven full-height slates and their dashed numeral panels.
- The hero's seven-cell index grid — the folder wall now *is* the index, and
  keeping both duplicates it.

---

## Global constraints

- **Nothing invented.** Every photograph is real client work for the service it
  sits under; every alt is copied from the existing manifest; the client counts
  come from the roster's own `services` tags.
- No new dependency. No GSAP, no Lenis.
- **No custom cursor** (standing instruction).
- Full-bleed, edge to edge — no `max-w` wrapper on the folder wall (standing
  instruction for this page).
- Border radius `rounded-[1px]`/`rounded-[2px]` only.
- `prefers-reduced-motion: reduce` — no fan, no lift, no dim; the panel opens
  without animating.
- Keyboard: every folder is reachable by Tab, opens on Enter/Space, and the fan
  mirrors hover on `:focus-visible`. The source has no keyboard path at all;
  this is ours to add.
- Contrast ≥ 4.5:1 for text, ≥ 3:1 at ≥24px, measured on the rendered page in
  **both** themes.
- No horizontal overflow at 1440 / 1200 / 880 / 520 / 390.
- `tsc --noEmit` clean; no new lint errors over the known 6-error baseline.

---

## Scope guardrails (YAGNI)

- No pinned scroll or scroll-jacking. That is the home page's reserved
  signature (`project_premium_roadmap`); reusing it here dilutes both.
- No route per service.
- No WebGL, no physics, no drag.
- No filtering UI on the wall.

---

## Success criteria

1. Seven folders; the page fits **≤ 2.5 screens** at 1440×900, down from 9.9.
2. **≥ 18 real photographs** render on the page, up from 2.
3. Hovering a folder fans exactly three photos and dims the other six;
   `:focus-visible` does the same.
4. Folder 07 shows no photographs and states its status instead.
5. Reduced motion: no fan, no lift, no dim.
6. Zero console errors; no overflow or contrast failures at five widths in both
   themes.
