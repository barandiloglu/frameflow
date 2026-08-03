"use client";

import { useEffect, useState } from "react";
import { serviceFolders } from "@/data/serviceFolders";

/* Ported from awwwards hero-2 (Portrait Card Row), full choreography.
 *
 * The source's timeline, kept step for step:
 *   1  labels cycle in the veil — blur(8px) + yPercent slide, 0.6s each
 *   2  tiles in from scatter (rot -10/-5/0/5/10, x -80/-40/0/40/80, y 18%,
 *      scale 0.72, opacity 0) → scale 0.82, 1.1s, stagger 0.06, at t=0
 *   3  settle to scale 0.8, 0.35s
 *   4  strip gap collapses to 0.75vw, 1s, at t=1.5
 *   5  tiles scale to 1, 1s
 *   6  every tile but the feature clips away, 1s, stagger 0.1, at t=2.5
 *   7  the feature scales up, 1s, at t=3.5
 *   8  the veil lifts, 1s, at t=4.5
 *   9  the title rises, 0.75s, stagger 0.1, at t=4.0
 *
 * One change, which is the point of using it here: the source's title is the
 * single word "FASHION". Ours does not stop — once the veil is up the headline
 * keeps cycling the seven services with the same blur-and-slide the intro
 * labels use, so the hero ends up naming every service rather than one.
 *
 * Ease `power3.inOut` ≈ cubic-bezier(0.65, 0, 0.35, 1); `power3.out` ≈
 * cubic-bezier(0.33, 1, 0.68, 1). No GSAP — CSS transitions and a phase clock. */

type Service = { id: number; name: string; category: string; subtitle: string };

const ROT = [-12, -8, -4, 0, 4, 8, 12];
const OFF = [-96, -64, -32, 0, 32, 64, 96];

/* The source's timeline positions, in ms. */
const PHASE_AT = [500, 2000, 3000, 4000, 5000] as const; // in, collapse, hide, feature, veil
const CYCLE_MS = 2600;

export function ServicesHero({ services }: { services: readonly Service[] }) {
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  /* 0 scattered · 1 in · 2 collapsed · 3 others hidden · 4 feature up · 5 veil up */
  const [phase, setPhase] = useState(reduced ? 5 : 0);
  const [active, setActive] = useState(0);

  const feature = Math.floor(services.length / 2);

  useEffect(() => {
    if (reduced) return;
    const timers = PHASE_AT.map((at, i) => setTimeout(() => setPhase(i + 1), at));
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  /* The headline keeps naming services once the veil is up. */
  useEffect(() => {
    if (phase < 5) return;
    const iv = setInterval(() => setActive((p) => (p + 1) % services.length), CYCLE_MS);
    return () => clearInterval(iv);
  }, [phase, services.length]);

  return (
    <div className="sh" data-phase={phase}>
      <ul className="sh-strip">
        {services.map((s, i) => {
          const folder = serviceFolders.find((f) => f.id === s.id);
          const plate = folder?.frames[0];
          return (
            <li
              key={s.id}
              className="sh-tile"
              data-feature={i === feature ? "on" : "off"}
              style={
                {
                  "--rot": `${ROT[i % ROT.length]}deg`,
                  "--off": `${OFF[i % OFF.length]}px`,
                  "--i": i,
                  "--back": services.length - 1 - i,
                } as React.CSSProperties
              }
            >
              <span className="sh-plate" data-fit={i < 2 ? "contain" : "cover"}>
                {plate ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={plate.src} alt="" loading="lazy" decoding="async" />
                ) : (
                  <span className="sh-empty">{folder?.note}</span>
                )}
              </span>
            </li>
          );
        })}
      </ul>

      {/* The veil, with the intro labels the source cycles inside it. */}
      <div className="sh-veil" aria-hidden>
        <ul className="sh-labels">
          {services.map((s, i) => (
            <li key={s.id} className="sh-label" style={{ ["--l" as string]: i }}>
              {s.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="sh-copy">
        <p className="sh-kicker">
          <span aria-hidden className="sh-rule" />
          Seven scenes. One full reel.
        </p>
        <h1 className="sh-title">
          {/* The visible word rotates, so the heading's real text is stated
              once here and the cycling copies are decorative. */}
          <span className="sr-only">
            FrameFlow services: {services.map((s) => s.name).join(", ")}
          </span>
          <span className="sh-track" aria-hidden>
            {services.map((s, i) => (
              <span
                key={s.id}
                className="sh-cycle"
                data-state={i === active ? "in" : "out"}
              >
                {s.name}
              </span>
            ))}
          </span>
        </h1>
        <p className="sh-sub">
          Every service in the FrameFlow catalog, shot from the same script: strategy first,
          craft always, no templates, no filler.
        </p>
      </div>

      <style jsx global>{`
        .sh {
          position: relative;
          flex: 1 1 auto;
          min-height: 520px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 0 clamp(18px, 3.4vw, 56px) clamp(26px, 4vh, 56px);
        }

        /* ---- strip + tiles (steps 2-7) ---- */
        .sh-strip {
          position: absolute;
          /* Above centre: the enlarged feature has to clear the copy below. */
          top: 40%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
          z-index: 2;
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(20px, 2.6vw, 46px);
          transition: gap 1s cubic-bezier(0.65, 0, 0.35, 1);
        }
        .sh[data-phase="2"] .sh-strip,
        .sh[data-phase="3"] .sh-strip,
        .sh[data-phase="4"] .sh-strip,
        .sh[data-phase="5"] .sh-strip {
          gap: 0.75vw;
        }

        .sh-tile {
          flex: 0 0 auto;
          width: clamp(96px, 11.5vw, 168px);
          aspect-ratio: 5 / 7;
          overflow: hidden;
          transform: translate(var(--off), 18%) rotate(var(--rot)) scale(0.72);
          opacity: 0;
          clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
          transition:
            transform 1.1s cubic-bezier(0.33, 1, 0.68, 1),
            opacity 0.9s ease,
            clip-path 1s cubic-bezier(0.65, 0, 0.35, 1);
          transition-delay: calc(var(--i) * 0.06s);
        }
        /* step 2-3: in, then settle */
        .sh[data-phase="1"] .sh-tile {
          transform: translate(0, 0) rotate(0deg) scale(0.8);
          opacity: 1;
        }
        /* step 5: up to full size */
        .sh[data-phase="2"] .sh-tile,
        .sh[data-phase="3"] .sh-tile,
        .sh[data-phase="4"] .sh-tile,
        .sh[data-phase="5"] .sh-tile {
          transform: translate(0, 0) rotate(0deg) scale(1);
          opacity: 1;
        }
        /* step 6: every tile but the feature clips away, outsides first */
        .sh[data-phase="3"] .sh-tile[data-feature="off"],
        .sh[data-phase="4"] .sh-tile[data-feature="off"],
        .sh[data-phase="5"] .sh-tile[data-feature="off"] {
          clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
          transition-delay: calc(var(--back) * 0.1s);
        }
        /* step 7: the feature scales up */
        .sh[data-phase="4"] .sh-tile[data-feature="on"],
        .sh[data-phase="5"] .sh-tile[data-feature="on"] {
          transform: scale(2.35);
          transition:
            transform 1s cubic-bezier(0.65, 0, 0.35, 1),
            clip-path 1s cubic-bezier(0.65, 0, 0.35, 1);
          transition-delay: 0s;
        }

        .sh-plate {
          position: relative;
          display: block;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: color-mix(in srgb, var(--on-surface) 8%, var(--surface));
        }
        .sh-plate img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
        }
        .sh-plate[data-fit="contain"] {
          background: var(--color-ivory);
        }
        .sh-plate[data-fit="contain"] img {
          object-fit: contain;
          object-position: center;
          padding: 10px;
        }
        .sh-empty {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          padding: 12px;
          font-family: var(--font-mono);
          font-size: 8px;
          line-height: 1.6;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--quiet-ink);
        }

        /* ---- veil + intro labels (steps 1, 8) ---- */
        .sh-veil {
          position: absolute;
          inset: 0;
          z-index: 3;
          background: var(--surface);
          display: flex;
          align-items: center;
          justify-content: center;
          clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
          transition: clip-path 1s cubic-bezier(0.65, 0, 0.35, 1);
        }
        .sh[data-phase="5"] .sh-veil {
          clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
        }
        .sh-labels {
          position: relative;
          list-style: none;
          margin: 0;
          padding: 0;
          height: 1.2em;
          font-family: var(--font-editorial);
          font-weight: 300;
          font-size: clamp(28px, 4vw, 62px);
          letter-spacing: -0.02em;
          color: var(--on-surface);
        }
        .sh-label {
          position: absolute;
          top: 0;
          left: 50%;
          translate: -50% 0;
          white-space: nowrap;
          opacity: 0;
          transform: translateY(100%);
          filter: blur(8px);
          animation: sh-label 0.7s cubic-bezier(0.65, 0, 0.35, 1) forwards;
          animation-delay: calc(0.25s + var(--l) * 0.6s);
        }
        @keyframes sh-label {
          0% {
            opacity: 0;
            transform: translateY(100%);
            filter: blur(8px);
          }
          30%,
          70% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-100%);
            filter: blur(8px);
          }
        }

        /* ---- copy (step 9, then the cycle) ---- */
        .sh-copy {
          position: relative;
          z-index: 4;
          padding-top: 40px;
        }
        /* The feature can reach down into the copy; this keeps the type
           readable over it without dimming the whole frame. */
        .sh-copy::before {
          content: "";
          position: absolute;
          /* Sized to the copy, not the viewport — at -100vh the gradient's
             opaque end landed below the fold and scrimmed nothing. */
          top: -110px;
          bottom: -80px;
          left: -100vw;
          right: -100vw;
          z-index: -1;
          background: linear-gradient(
            to top,
            var(--surface) 55%,
            color-mix(in srgb, var(--surface) 70%, transparent) 82%,
            transparent 100%
          );
          pointer-events: none;
        }
        .sh-kicker {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 0 0 14px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--accent-ink);
          opacity: 0;
          transition: opacity 0.6s ease 0.1s;
        }
        .sh-rule {
          display: block;
          height: 1px;
          width: 32px;
          background: currentColor;
        }
        .sh[data-phase="5"] .sh-kicker,
        .sh[data-phase="5"] .sh-sub {
          opacity: 1;
        }

        .sh-title {
          margin: 0;
          font-family: var(--font-editorial);
          font-weight: 300;
          font-size: clamp(38px, 7vw, 118px);
          line-height: 1;
          letter-spacing: -0.035em;
          color: var(--on-surface);
        }
        .sh-track {
          display: block;
          position: relative;
          height: 1.06em;
          overflow: hidden;
        }
        .sh-cycle {
          position: absolute;
          inset: 0;
          display: block;
          white-space: nowrap;
          transition:
            transform 0.62s cubic-bezier(0.65, 0, 0.35, 1),
            opacity 0.62s ease,
            filter 0.62s ease;
        }
        .sh-cycle[data-state="out"] {
          transform: translateY(-100%);
          opacity: 0;
          filter: blur(8px);
        }
        .sh-cycle[data-state="in"] {
          transform: translateY(0);
          opacity: 1;
          filter: blur(0);
        }
        /* Before the veil lifts the title is masked out entirely, so step 9
           reads as a reveal rather than a word already sitting there. */
        .sh:not([data-phase="5"]) .sh-cycle[data-state="in"] {
          transform: translateY(100%);
          opacity: 0;
        }

        .sh-sub {
          margin: 16px 0 0;
          max-width: 520px;
          font-family: var(--font-warm);
          font-size: clamp(13px, 0.95vw, 15px);
          font-weight: 300;
          line-height: 1.7;
          color: var(--quiet-ink);
          opacity: 0;
          transition: opacity 0.7s ease 0.35s;
        }

        @media (max-width: 899px) {
          .sh-tile {
            width: clamp(64px, 17vw, 104px);
          }
          .sh[data-phase="4"] .sh-tile[data-feature="on"],
          .sh[data-phase="5"] .sh-tile[data-feature="on"] {
            transform: scale(2.2);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sh-strip,
          .sh-tile,
          .sh-veil,
          .sh-cycle,
          .sh-kicker,
          .sh-sub {
            transition: none;
          }
          .sh-label {
            animation: none;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
