# Contact — Redesign

**Route:** `/contact` · **Date:** 2026-08-03

Replaces the current four-block contact page with a single screen: one sentence
the visitor completes.

---

## The problem, measured

The page runs **3420px** across four stacked blocks — hero, a seven-field form
beside a studio panel with a map, a five-item FAQ, and the footer. It carries
**7 inputs, 8 buttons, 32 links and 307 words**.

The form asks for name, business, email, phone, service, budget and message
before anyone has spoken to FrameFlow. Every one of those is a reason to leave.

**It also does not send.** `handleSubmit` generates a random case number, sets
`submitted`, and stops. There is no API route and no mail handler. Whatever is
built here, the sending is a separate, honest piece of work.

---

## The design

One screen, no scroll. The page is a sentence with three blanks, set large in
the editorial serif:

> Hi FrameFlow — I'm **[ your name ]**.
> Reach me at **[ you@company.com ]**.
> Here's the short version: **[ … ]**

Three fields, not seven (user decision, 2026-08-03). Company, phone, service and
budget are all answerable in the reply; asking for them up front costs
completions and buys little.

### The blanks

Inline `<input>`s styled as blanks in the flow of the sentence — no boxes, no
labels above them. Each sits on a hairline rule and grows to fit what is typed,
so the sentence reflows as it is written. The message blank is a growing
`<textarea>` on the last line.

Placeholders are the example text, greyed. They are hints, not values.

### The squiggle

The brand's own **w** draws underneath whichever blank has focus, in amber,
using the same mask-sweep technique built for the loading screen: the artwork
is revealed along its centreline rather than redrawn, so the mark is exact.

It is the focus indicator. Moving between blanks redraws it under the new one.
This is the page's signature and the reason it is FrameFlow's rather than
anyone's.

*Note: the loader version of this was reverted because it competed with the
monogram at the centre of the screen. Here it has no competition — it is the
only ornament on the page, and it is doing a job rather than decorating.*

### Sending

The submit is wired to a clear seam and does not pretend. Until a handler
exists, the button posts to a single `submitContact()` function that throws
`NOT_WIRED`, and the UI shows an honest fallback offering the mailto: address.
No fake case numbers.

### Confirmation

On a successful send the sentence scrambles character by character and re-forms
as the reply — the `text-4` scramble technique. It reuses the type already on
screen instead of swapping in a success panel.

### The quiet line

One line at the bottom, mono, muted:

`hello@frameflow.ca · 99 Yorkville Ave, Unit 200, Toronto · Mon–Fri 9am–6pm EST · replies within 1 business day`

All four facts are on the current page and are kept verbatim.

### What goes

- The hero block. The sentence is the hero.
- The studio panel and its map card.
- The five-item FAQ. It is not contact — it belongs on a page of its own or in
  the reply. Its five questions are preserved in this spec so nothing is lost:
  project length, working outside Toronto, what the free consultation involves,
  how the client portal works, payment terms.
- The random case-number confirmation.

---

## Global constraints

- **Nothing invented.** Address, email, hours and reply time are copied from the
  current page.
- **The form must not appear to send when it cannot.** No fabricated
  confirmations.
- Contrast ≥ 4.5:1 for text, ≥ 3:1 at ≥24px, measured on the rendered page.
- The blanks are real `<input>`/`<textarea>` elements with associated labels for
  assistive tech, visually hidden rather than absent — a sentence made of
  unlabelled inputs is unusable with a screen reader.
- Keyboard: Tab moves between blanks in reading order; the squiggle follows
  focus, not only the mouse.
- `prefers-reduced-motion: reduce` — the squiggle appears without drawing, and
  the confirmation swaps without scrambling.
- No horizontal overflow at 1440 / 1080 / 880 / 520 / 390.
- `tsc --noEmit` clean; no new lint errors over the known 6-error baseline.

---

## Scope guardrails (YAGNI)

- No map.
- No FAQ accordion.
- No file upload, no phone field, no budget picker.
- No custom cursor.
- No new dependency — the squiggle sweep and the scramble are both small enough
  to write directly.

---

## Success criteria

1. `/contact` fits one viewport at 1440×900 with no scroll, and remains usable
   down to 390px.
2. Three inputs total on the page.
3. The squiggle draws under the focused blank and follows keyboard focus.
4. Submitting with no handler shows the honest fallback, never a fake success.
5. Zero console errors; no overflow or contrast failures at five widths.
