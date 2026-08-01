# Golden Horn Construction — Featured Portfolio Case Study

**Slug:** `goldenhorn-construction` · **Frame:** FF-013 · **Date:** 2026-08-01

Bespoke featured page at `/portfolio/goldenhorn-construction`, rendered through
`FEATURED_PAGES` instead of the templated `<ClientPage>`. Source prototype:
`~/Downloads/goldenhorn-preview.html`. Content source: the live site,
<https://ghconstruct.ca/> — there was no asset folder.

---

## Goal

Present the Golden Horn identity as the deliverable it actually is: a three-file
lock-up system in navy and gold, plus a four-page WordPress site that is live and
credited to FrameFlow.

The prototype framed the story as *"a new mark, and a site that says what they do."*
Half of that is verifiable and half is not. **The case study is refocused onto the
identity** (user decision, 2026-08-01). The website is still shown — it is real work,
it is live, and the tabbed browser section is the strongest device in the prototype —
but it is described factually and stripped of every claim the live site contradicts.

---

## Source material

Everything below was verified against the live site or the logo files themselves on
2026-08-01. Nothing is inherited from the prototype on trust.

### Assets to capture

No local folder was supplied. All assets are pulled from ghconstruct.ca:

| File | Source | Notes |
|---|---|---|
| `logo/primary.png` | `/wp-content/uploads/2025/05/x150.png` | 527×150. Navy wordmark + gold mark. |
| `logo/knockout.png` | `/wp-content/uploads/2025/05/x150-White.png` | 810×238. White wordmark + gold mark. |
| `logo/mark.png` | `/wp-content/uploads/2025/07/cropped-site-identity-1.png` | 512×512. Standalone horse, no wordmark. Deployed as the site favicon. |
| `website/home.jpg` | full-page capture, 1440w | 8622px tall |
| `website/services.jpg` | full-page capture, 1440w | 4546px tall |
| `website/work.jpg` | full-page capture, 1440w | 4307px tall |
| `website/contact.jpg` | full-page capture, 1440w | 1927px tall |

Captures are taken at 1440×deviceScaleFactor 1, scrolled to the bottom first so lazy
images and count-up animations settle, then scrolled back to 0.

### Roster corrections (required before the page is wired)

The existing entry is a bare one-liner:

```ts
{ slug: "goldenhorn-construction", name: "Goldenhorn Construction", services: ["Logo", "Photography", "Website Design"] },
```

Three problems:

1. **Name.** The brand is **Golden Horn Construction** — two words. It appears that way
   in the logo art, the `<title>` of all four pages, and the footer copy. Fix to
   `"Golden Horn Construction"`.
2. **Photography.** Every image on the site is stock: `client-00X-copyright.png`,
   `avatar-001-copyright.jpg`, and stock construction photography (a high-rise under
   tower cranes, a staged living room, a hard-hat model with blueprints). None of it is
   Golden Horn's own work. **Drop `Photography`** (user decision, 2026-08-01), leaving
   `["Logo", "Website Design"]` — which is also what the prototype's own kicker claims.
3. **Not promoted.** Needs `featured: true` plus the full promoted shape (year,
   location, runtime, scene, synopsis, brand block) like the other featured clients.

**The roster edit must be in place, not append-only-safe:** `getFrameNumber` is
`findIndex + 1`, so position determines the frame number. Golden Horn sits at index 12
→ **frame 13**, which matches the prototype's FF-013. Editing this entry in place is
safe; reordering the array is not.

### Prototype claims corrected against reality

The live site still carries its WordPress theme's demo content. The theme is
`wp-content/themes/elementra`, and its demo brand name survives in visible copy.

| # | Prototype claim | Verified reality | Resolution |
|---|---|---|---|
| 1 | *"A site that says **what they do**"* / *"answers the question before the scroll"* | The home hero reads **"MODERN FOUNDATIONS — your trusted partner for cutting-edge foundation construction"** over a stock photo of a glass office tower. They do drywall, paint, flooring and property management. | **Cut.** Headline and deck rewritten to lead on the mark. |
| 2 | *"no category nouns, no **'solutions'**"* | "solutions" appears **15×** site-wide — including inside two of the four trade cards ("Durable, stylish flooring **solutions**") and a feature block titled "Modern **Solutions**". | **Cut.** |
| 3 | *"Navy and gold set **from the first screen**"* | The first screen is a sky-blue stock photograph with white cards. Navy and gold arrive on `/services/`. | **Rewritten** — credit the system where it actually lands. |
| 4 | *"the **counters** and the proof band"* | Counters read 50+ Multi-Story Projects · 174 Residential Designs · 21 Years in Business · 360+ Renovation Success — a high-rise developer's numbers, unedited theme defaults. | **Cut.** |
| 5 | *"The **portfolio shelf**"* on `/work/` | `/work/` has no real projects. Template names — "Revitalizing community spaces", "Innovative green design" — and "Explore **Elementra's** Projects". | **Cut.** |
| 6 | Mark note 01: *"**One stroke weight** … nothing tapers, nothing fills"* | Measured across the mark: stroke widths run **1px to 19px**. The mane is overtly calligraphic — each strand swells and narrows to a point. | **Rewritten** — see "The mark, honestly" below. |
| 7 | *"lets it reduce to a **32px favicon** without turning into a smudge"* | Downsampled from the 512px original: at **16px it is a pale smudge**; at 32px the mane washes out and only the head silhouette survives. It needs ~48px to read. The fine tapered strokes are the cause. | **Cut.** No reduction claim is made. |
| 8 | Type: *"Body: **Roboto** — neutral by design"* | **Roboto never loads.** Zero rendered faces on both pages tested. Every Roboto weight is declared by the theme stylesheet and stays `unloaded`. Rendered tallies: home Oswald 94 / Montserrat 54; services Oswald 18 / Montserrat 41. | **Corrected** to Oswald + Montserrat. Same defect as the Esma type panel — never name a face that does not render. |
| 9 | Palette includes *"Lime Wash #fcf9f4"* and *"Sand #e0ded2"* | Neither appears on the site. The real grounds are `#ffffff` (dominant) and `#f7f7f7`. Lime wash and sand are the prototype document's own styling. | **Removed from the palette.** They remain the case-study page's paper colour, which is a different thing and is not presented as Golden Horn's system. |

Claims that **did** check out and are kept: the Stittsville address (5900 Hazeldean Rd,
K2S 1H3), `info@ghconstruct.ca`, the four trades, four live pages, the contact form
with consent + CAPTCHA on two pages (`/work/` and `/contact/`), the footer credit
"Created by Frame Flow", and the standalone square mark being real and deployed.

### The mark, honestly

What is actually true about the drawing, and what the three notes should say:

1. **One colour, one contour.** The horse is drawn entirely in gold as an open line
   figure — no fills, no second colour, no gradient. That is what lets the same file
   sit on white and on navy without a variant.
2. **Calligraphic stroke.** The mane is not a uniform weight; strands swell and taper
   to points, from roughly 1px to 19px in the 810px master. It reads as drawn rather
   than constructed, which is what gives it warmth next to a hard grotesque wordmark.
3. **Three files, three jobs.** Primary for light grounds, knockout for navy, standalone
   mark where the wordmark will not fit — the favicon and social avatar.

### Brand system (verified)

| Token | Hex | Source |
|---|---|---|
| Navy | `#122640` | Site CSS, `rgb(18,38,64)`. The logo PNG samples `#112640` — export rounding, sub-perceptual. |
| Gold | `#db9420` | Site CSS, `rgb(219,148,32)`. The only gold in use. Logo PNG samples `#dc9528`. |
| White | `#ffffff` | Dominant site ground. |
| Light grey | `#f7f7f7` | Secondary site ground. |

Type: **Oswald** — display, headlines, card titles. **Montserrat** — body, UI, nav.
Roboto is declared by the theme and never loads; it is not part of the system.

---

## Architecture

Single client component, `src/components/portfolio/featured/GoldenHornPage.tsx`,
following the shape of the six sibling featured pages: module-scope data arrays,
`<style jsx global>` carrying the ported prototype CSS under a `gh-` prefix, and
Google Fonts (Oswald + Montserrat) loaded per-page as the siblings do.

### Wiring

1. Promote the roster entry in `src/data/clients.ts` (edit in place — see above).
2. Register `"goldenhorn-construction": GoldenHornPage` in
   `src/app/portfolio/[slug]/featured.ts`.
3. Assets under `public/portfolio/goldenhorn-construction/{logo,website}/`.

### The site section

Same device as the prototype: a browser-chrome frame with four tabs, a fixed-height
scroll window showing the full-page capture, prev/next, a live "Visit this page" link,
and a caption per page. **Static images, not an iframe** — unlike Beril & Sedat there is
no local export to embed, and framing a live third-party WordPress site is not something
to ship.

Captions are rewritten to describe what each page verifiably contains.

---

## Section flow

| # | Section | Ground | Content |
|---|---|---|---|
| 1 | Rail (sticky) | Navy | ← Portfolio · FINISH SCHEDULE FF-013 · GOLDEN HORN CONSTRUCTION · STITTSVILLE, ON · 2026 |
| 2 | Hero | Navy | Kicker `ID — Logo · Website Design`; headline leading on the mark; deck; three facts (We built / We set / We shipped); primary lock-up plate; four-trade strip |
| 3 | The Mark | Paper | Standalone mark large; the three honest notes; no reduction claim |
| 4 | The Lock-ups | Paper | Ground switcher: primary on white, knockout on navy. Real files only, two real grounds |
| 5 | Colour & Type | Navy | Palette (navy, gold, white, light grey); type spec (Oswald display, Montserrat text/UI) |
| 6 | The Site | Paper | Four-page tabbed browser, scroll-inside, live links, factual captions |
| 7 | What They Do | Navy | Four trades, one plain line each |
| 8 | Finish Schedule | Paper | 7-row delivery table |
| 9 | Sign-off | Paper | Prepared by / FF-013 / SHIPPED; lock-up opens the modal; back to portfolio |

### Finish schedule table (all seven rows verified)

| Item | Spec | Status |
|---|---|---|
| Primary lock-up | Horse mark + wordmark, horizontal | Delivered |
| Knockout lock-up | White type, gold mark, dark grounds | Delivered |
| Standalone mark | Square, favicon and avatars | Delivered |
| Colour system | Navy `#122640`, gold `#db9420` | Delivered |
| Type system | Oswald display · Montserrat text | Delivered |
| Website | Four pages — home, services, work, contact | Live |
| Contact form | Consent + CAPTCHA, on two pages | Live |

---

## Global constraints

Carried forward from the six prior featured pages. Every task's requirements
implicitly include these.

- **Lightbox definite height.** The lock-up modal must have a *definite* height, not
  `max-height` — the IYN crop regression. Verify at every breakpoint.
- **No unverifiable claims.** Every factual statement on the page must be checkable
  against the logo files or the live site. When in doubt, cut it.
- **Contrast.** Body text ≥ 4.5:1, large text ≥ 3:1, measured on the rendered page
  rather than assumed. Gold `#db9420` on navy `#122640` must be checked before use on
  small text.
- **Reduced motion.** `@media (prefers-reduced-motion: reduce)` disables transitions
  and any marquee.
- **Focus trap.** The modal traps focus and restores it on close, and closes on Escape
  and backdrop click. (House-wide gap across the other 15 featured pages; fixed here.)
- **No prev/next client navigation** between case studies.
- **Alt text describes the actual image**, not the label beside it.

---

## Scope guardrails (YAGNI)

- No photography section — there is none to show.
- No iframe embed of the live site.
- No counters, stats or "proof band" — the numbers on the live site are theme defaults.
- No claims about the site's copy quality.
- Three logo files. Not a full brand-guidelines rebuild.

---

## Success criteria

1. `/portfolio/goldenhorn-construction` renders the bespoke page; frame number reads 13.
2. Every claim on the page traces to a verified source in this spec.
3. The four site captures load, tab, scroll internally, and their "Visit this page"
   links resolve to the correct live URLs.
4. The lock-up modal opens, traps focus, closes on Escape and backdrop, and crops
   nothing at 1440 / 1080 / 880 / 520 / 390.
5. `tsc --noEmit` clean; no new lint errors over the known 6-error baseline.
6. Zero console errors; no horizontal overflow at any breakpoint.
