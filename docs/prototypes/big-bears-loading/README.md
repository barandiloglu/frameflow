# Big Bears Loading Transition

Standalone HTML preview at `index.html`. Open directly in any browser.

## Concept

The loading page lives in **FrameFlow's design system** (graphite, ivory, amber accents, mono labels, italic Fraunces title) — so the cohesive FF aesthetic is preserved at this layer. After ~3.5s, the screen **peels away to the right** to reveal the destination, which is **the client's bespoke world** (yellow Big Bears chaos in this case).

The cinema metaphor extends perfectly:
- The Reel index is the lobby
- The loading page is "now loading reel 005" — projector cueing up
- The peel-away is the curtain opening
- The destination is the show

## Sequence

| Time | What happens |
|---|---|
| 0.0s | Loader visible. FF chrome (graphite + amber). Eyebrow rises. |
| 0.4s | Frame number `Reel · 005 · Toronto · 2024` rises. |
| 0.6s–1.5s | Title `Big Bears Baked Potato` cascades letter by letter (italic Fraunces). |
| 1.0s | Scope tags appear (Brand · Logo · Photography · Menu · Wrapper). |
| 1.6s | Loading bar fades in. |
| 1.7s–3.3s | Bar fills 0% → 100%, percent counter ticks live. |
| 3.5s | Loader peels away right-to-left over 1s with an ember-glowing trailing edge. |
| 3.7s | Destination's bear logo, wordmark, and tagline rise into view. |
| 4.5s | Replay button fades in for testing. |

Ambient throughout: projector flicker (every 7.5s), light-leak breathing (9s), grain shimmer, live REC dot pulse, running clock in the top-right.

## Interactive

- **Skip intro** button (bottom-right of loader) — bypass the wait.
- **Replay** button (after transition) — reloads the page to see again.
- All animations respect `prefers-reduced-motion`.

## Production implementation notes

For the React app: a `<LoadingTransition>` component fixed-positioned at z-index 50, mounted on the destination page. Auto-dismisses via state after the timer or skip click. The destination page renders underneath and animates in once `loader.done` is set.

The loader content can be data-driven — frame number, client name, scope tags, colors all read from the `Client` data — so the same loader template works for any featured client (next time it's `Reel · 010 · EduPathways` with their scope tags).
