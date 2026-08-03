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
const COVER_MS = 900;
const REVEAL_MS = 950;

type Phase = "idle" | "cover" | "reveal";

export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();

  const [phase, setPhase] = useState<Phase>("idle");
  const [word, setWord] = useState("FrameFlow");
  const pending = useRef<string | null>(null);
  const revealTimer = useRef<number | null>(null);

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
      setWord(LABEL[href] ?? "FrameFlow");
      setPhase("cover");
      window.setTimeout(() => {
        router.push(href);
      }, COVER_MS);
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

  /* The route has changed under the cover — reveal it. Deferred one frame so
     the incoming page has actually painted before the type sweeps back, which
     also keeps the state change out of the effect body. */
  useEffect(() => {
    if (phase !== "cover" || !pending.current) return;
    if (pathname !== new URL(pending.current, window.location.href).pathname) return;
    pending.current = null;
    const raf = requestAnimationFrame(() => {
      setPhase("reveal");
      revealTimer.current = window.setTimeout(() => setPhase("idle"), REVEAL_MS);
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname, phase]);

  useEffect(() => {
    return () => {
      if (revealTimer.current) window.clearTimeout(revealTimer.current);
    };
  }, []);

  /* If a navigation is somehow never completed, do not strand the visitor
     behind an opaque overlay. */
  useEffect(() => {
    if (phase !== "cover") return;
    const bail = window.setTimeout(() => setPhase("idle"), COVER_MS + 4000);
    return () => window.clearTimeout(bail);
  }, [phase]);

  return (
    <div className="pt" data-phase={phase} aria-hidden>
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
        .pt[data-phase="cover"],
        .pt[data-phase="reveal"] {
          pointer-events: all;
        }

        /* The overlay's own ground — the source never needed one. */
        .pt-ground {
          position: absolute;
          inset: 0;
          background: var(--color-ember);
          opacity: 0;
          transition: opacity 420ms ease;
        }
        .pt[data-phase="cover"] .pt-ground {
          opacity: 1;
          transition-duration: 300ms;
        }
        .pt[data-phase="reveal"] .pt-ground {
          opacity: 0;
          transition-delay: 260ms;
        }

        /* .type: 100vmax square, centred, so the -90° rotation never exposes a
           corner. */
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
          transition: transform 900ms cubic-bezier(0.65, 0, 0.35, 1);
        }
        .pt[data-phase="cover"] .pt-type {
          transform: scale(2.7) rotate(-90deg);
        }
        .pt[data-phase="reveal"] .pt-type {
          transform: scale(1) rotate(0deg);
          transition-delay: 120ms;
        }

        .pt-line {
          white-space: nowrap;
          font-family: var(--font-display, var(--ff-display));
          font-size: clamp(3.4rem, 12vh, 9rem);
          line-height: 0.75;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          color: var(--color-ivory);
          opacity: 0.06;
          transform: translateX(0%);
          will-change: transform, opacity;
          user-select: none;
        }
        /* lines: x → 20%, then hard out to -200%; stagger 0.04 */
        .pt[data-phase="cover"] .pt-line {
          animation: pt-in 900ms cubic-bezier(0.4, 0, 1, 1) forwards;
          animation-delay: calc(var(--i) * 0.04s);
        }
        @keyframes pt-in {
          0% {
            transform: translateX(0%);
            opacity: 0.06;
          }
          40% {
            transform: translateX(20%);
            opacity: 1;
          }
          100% {
            transform: translateX(-200%);
            opacity: 0;
          }
        }
        /* out(): back to x 0 on an overshoot, stagger reversed */
        .pt[data-phase="reveal"] .pt-line {
          animation: pt-out 950ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: calc((10 - var(--i)) * 0.04s);
        }
        @keyframes pt-out {
          0% {
            transform: translateX(120%);
            opacity: 1;
          }
          60% {
            opacity: 1;
          }
          100% {
            transform: translateX(0%);
            opacity: 0;
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
