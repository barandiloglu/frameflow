"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

/* Ported from awwwards page-10 (Kinetic Type Page Transition).
 *
 * The source's TypeTransition, verbatim from js/typeTransition.js:
 *   in()   container  scale 1 → 2.7, rotate 0 → -90°, 1.4s power2.inOut
 *          lines      x → 20% (1s power1.inOut) → x -200% (1.5s power1.in),
 *                     stagger 0.04
 *          lines      opacity → 1 (1s) → 0 (1.5s)
 *   out()  container  scale → 1, rotate → 0, 1.4s, at t=1.2
 *          lines      x → 0%, 2.3s ease back, stagger -0.04
 *          lines      opacity → 1 (1s) → --type-line-opacity (1.5s)
 *   .type  fixed, 100vmax square, centred, grid
 *   .type__line  clamp(7rem, 18.75vh, 15rem), bold, uppercase, nowrap
 *
 * Two deliberate departures, both because the source is a single page and this
 * is a real multi-page site:
 *
 *  - The source's type sits at 5% opacity as permanent background texture on a
 *    solid --color-bg, so its lines never have to hide anything. Here the
 *    overlay carries its own ground, because a route swap behind gaps in the
 *    type would be visible.
 *  - 2.5s in + 2.3s out is ~5s per navigation. The choreography is kept and the
 *    durations compressed; the swap happens while the screen is covered.
 *
 * next.config's experimental viewTransition is deliberately not used — this
 * version's own docs say "we strongly advise against using this feature in
 * production". */

/* Only the marketing pages. Portfolio case studies run their own
   LoadingTransition, and dashboard/admin are deliberately plain. */
const MAIN = new Set(["/", "/services", "/about", "/portfolio", "/gallery", "/contact"]);

const LABEL: Record<string, string> = {
  "/": "FrameFlow",
  "/services": "Services",
  "/about": "About",
  "/portfolio": "Portfolio",
  "/gallery": "Gallery",
  "/contact": "Contact",
};

const LINES = 11;

/* The source's own durations, not compressed.
 *   in()  lines tween 1s + 1.5s = 2.5s, stagger 0.04 x 10 = 0.4  -> 2.9s total
 *   out() lines tween 2.3s + stagger 0.4                          -> 2.7s total
 * index.js swaps the content at in().totalDuration() * 0.75 and shows the new
 * content at out().totalDuration() * 0.7; the push below sits at the same 75%. */
const COVER_MS = 2900;
const PUSH_AT = 2175;
const REVEAL_MS = 2700;
/* index.js brings its content back at out().totalDuration() * 0.7. Clearing the
   ground at 0 instead put the page on screen while the type was still at full
   opacity — 1.25s of it sweeping over a loaded page, which reads as a fault
   rather than a transition. */
const GROUND_OUT_AT = Math.round(REVEAL_MS * 0.7);

type Phase = "idle" | "cover" | "reveal";

export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();

  const [phase, setPhase] = useState<Phase>("idle");
  /* Tracked separately from `phase` so lifting the ground does not restart the
     line animation, which is keyed off data-phase. */
  const [ground, setGround] = useState(false);
  const [word, setWord] = useState("FrameFlow");
  const pending = useRef<string | null>(null);
  const revealTimer = useRef<number | null>(null);
  const groundTimer = useRef<number | null>(null);
  const startedAt = useRef(0);

  const reducedRef = useRef(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = mq.matches;
    const sync = () => (reducedRef.current = mq.matches);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const start = useCallback(
    (href: string) => {
      pending.current = href;
      startedAt.current = Date.now();
      setWord(LABEL[href] ?? "FrameFlow");
      setGround(true);
      setPhase("cover");
      /* 75% through in(), where index.js swaps its content. The ground is
         opaque by then, so the swap itself is never seen. */
      window.setTimeout(() => router.push(href), PUSH_AT);
    },
    [router],
  );

  /* Delegated so every internal link on the site is covered without touching
     Navbar, Footer or any page.
     Registered in the CAPTURE phase: next/link handles the click on the anchor
     itself and calls preventDefault before a bubble-phase document listener
     ever runs, so bubbling here meant the navigation had already happened. */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      if (anchor.dataset.noTransition === "true") return;

      /* Same-origin only, and only between two main pages. */
      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;
      if (!MAIN.has(url.pathname) || !MAIN.has(window.location.pathname)) return;
      if (reducedRef.current) return;

      /* preventDefault alone is enough and is deliberately NOT paired with
         stopPropagation: next/link calls the element's own onClick first and
         only then checks e.defaultPrevented before navigating, so the page's
         handlers still run — the mobile menu still closes — while next/link
         stands down and this component owns the push. */
      e.preventDefault();
      start(url.pathname + url.search);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [start]);

  /* The push lands at 75% of in(), so the route changes well before the cover
     animation has finished. Waiting on the route alone would cut in() short —
     the reveal only starts once BOTH the route has changed and in() has run
     its full 2.9s. */
  useEffect(() => {
    if (phase !== "cover" || !pending.current) return;
    if (pathname !== new URL(pending.current, window.location.href).pathname) return;
    pending.current = null;
    const remaining = Math.max(0, COVER_MS - (Date.now() - startedAt.current));
    const t = window.setTimeout(() => {
      setPhase("reveal");
      groundTimer.current = window.setTimeout(() => setGround(false), GROUND_OUT_AT);
      revealTimer.current = window.setTimeout(() => setPhase("idle"), REVEAL_MS);
    }, remaining);
    return () => window.clearTimeout(t);
  }, [pathname, phase]);

  useEffect(() => {
    return () => {
      if (revealTimer.current) window.clearTimeout(revealTimer.current);
      if (groundTimer.current) window.clearTimeout(groundTimer.current);
    };
  }, []);

  /* If a navigation is somehow never completed, do not strand the visitor
     behind an opaque overlay. */
  useEffect(() => {
    if (phase !== "cover") return;
    const bail = window.setTimeout(() => {
      setPhase("idle");
      setGround(false);
    }, COVER_MS + 6000);
    return () => window.clearTimeout(bail);
  }, [phase]);

  return (
    <div className="pt" data-phase={phase} data-ground={ground ? "on" : "off"} aria-hidden>
      <div className="pt-ground" />
      <div className="pt-type">
        {Array.from({ length: LINES }, (_, i) => (
          <div className="pt-line" key={i} style={{ ["--i" as string]: i }}>
            {`${word} ${word} ${word}`}
          </div>
        ))}
      </div>

      <style jsx global>{`
        .pt {
          position: fixed;
          inset: 0;
          z-index: 9000;
          pointer-events: none;
          overflow: hidden;
        }
        .pt[data-phase="idle"] {
          visibility: hidden;
        }
        /* Clicks are swallowed only while the ground is actually covering. */
        .pt[data-ground="on"] {
          pointer-events: all;
        }

        /* The overlay's own ground — the source never needed one because its
           type sits permanently on a solid page. It covers for in(), then
           clears at the start of out() so the type sweeps back over the new
           page exactly as it sweeps over content in the source. */
        .pt-ground {
          position: absolute;
          inset: 0;
          background: var(--color-ember);
          opacity: 0;
          transition: opacity 420ms ease;
        }
        .pt[data-ground="on"] .pt-ground {
          opacity: 1;
          transition-duration: 320ms;
        }
        .pt[data-ground="off"] .pt-ground {
          opacity: 0;
          transition-duration: 560ms;
        }

        /* .type: 100vmax square, centred, so the -90deg rotation never exposes
           a corner. Container tween is 1.4s power2.inOut in both directions;
           out() starts it at t=1.2. */
        .pt-type {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100vmax;
          height: 100vmax;
          margin: -50vmax 0 0 -50vmax;
          display: grid;
          align-content: center;
          justify-content: center;
          text-align: center;
          will-change: transform;
          transform: scale(1) rotate(0deg);
          transition: transform 1.4s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
        .pt[data-phase="cover"] .pt-type {
          transform: scale(2.7) rotate(-90deg);
        }
        .pt[data-phase="reveal"] .pt-type {
          transform: scale(1) rotate(0deg);
          transition-delay: 1.2s;
        }

        .pt-line {
          white-space: nowrap;
          font-family: var(--ff-display);
          font-size: clamp(3.4rem, 12vh, 9rem);
          line-height: 0.75;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          color: var(--color-ivory);
          opacity: 0.05;
          transform: translateX(0%);
          will-change: transform, opacity;
          user-select: none;
        }

        /* in(): x 0 -> 20% over 1s (power1.inOut), then -> -200% over 1.5s
           (power1.in); opacity 0.05 -> 1 -> 0 across the same 2.5s. 40% of
           2.5s is the 1s hand-off. Stagger 0.04 forward. */
        .pt[data-phase="cover"] .pt-line {
          animation: pt-in 2.5s forwards;
          animation-delay: calc(var(--i) * 0.04s);
        }
        @keyframes pt-in {
          0% {
            transform: translateX(0%);
            opacity: 0.05;
            animation-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955);
          }
          40% {
            transform: translateX(20%);
            opacity: 1;
            animation-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53);
          }
          100% {
            transform: translateX(-200%);
            opacity: 0;
          }
        }

        /* out(): x -> 0% over 2.3s on a back ease; opacity -> 1 over 1s then
           back to the resting 0.05 over 1.5s. 2.3s of the 2.5s span is 92%.
           Stagger reversed. */
        .pt[data-phase="reveal"] .pt-line {
          animation: pt-out 2.5s forwards;
          animation-delay: calc((10 - var(--i)) * 0.04s);
        }
        @keyframes pt-out {
          0% {
            transform: translateX(-200%);
            opacity: 0;
            animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          40% {
            opacity: 1;
          }
          92% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(0%);
            opacity: 0.05;
          }
        }

        /* The whole effect is motion; there is nothing to degrade to, so it is
           skipped outright and navigation stays instant. */
        @media (prefers-reduced-motion: reduce) {
          .pt {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
