"use client";

import { useEffect, useState } from "react";

/* Ported from awwwards hero-2 (Portrait Card Row) — structure and timeline
 * followed exactly; only the images, the palette and the title word are ours.
 *
 * LAYOUT, from the source stylesheet:
 *   .stage  100svh, overflow hidden, isolate
 *   .veil   inset 0, z-0 — the dark ground BEHIND the tiles, not a curtain in
 *           front of them; lifting it reveals the page
 *   .strip  absolute, top 50%, translateY(-50%), z-5, justify-content center,
 *           gap 10vw
 *   .tile   width 15vw, aspect-ratio 5/7
 *   .title  absolute, left 50% top 50%, translate(-50%,-50%), z-20,
 *           white-space nowrap, font-size 15vw, weight 700, uppercase,
 *           line-height 0.82, letter-spacing -0.05em, text-align center
 *   @1000px --pad 1rem, strip gap 2.5vw, tile width 20vw
 *
 * TIMELINE, from the source script (its timeline carries delay 0.5, so the
 * absolute times below are each label plus 0.5):
 *   tiles      y0 x0 rot0 opacity1 scale .82 · 1.1s · stagger .06 · at 0
 *   settle     scale .8 · 0.35s · stagger .04 · at '>-0.25'
 *   strip gap  → 0.75vw · 1s · at 1.5
 *   tiles      scale 1 · 1s · at '<'
 *   others     clip-path collapse · 1s · stagger .1 · at 2.5
 *   feature    scale 2 · 1s · at 3.5
 *   title      words y0 · 0.75s · stagger .1 · at 4.0
 *   veil       clip-path lift · 1s · at 4.5
 *   scatter    rot -10/-5/0/5/10 · x -80/-40/0/40/80 · y 18% · scale .72
 *   ease       power3.inOut ≈ cubic-bezier(0.65,0,0.35,1)
 *              power3.out   ≈ cubic-bezier(0.33,1,0.68,1)
 *
 * The source uses five tiles with the centre one as the feature; kept. */

type Service = { id: number; name: string; category: string; subtitle: string };

/* The source's tiles are photographs and it crops them with object-fit: cover.
   Logos and identity sheets cannot take that — Harbour Loom's lock-up cropped
   to "IAR" — so the strip runs real client photography, five frames across
   five clients. Alts come from src/data/gallery.ts. */
const PLATES = [
  {
    src: "/gallery/full/adrians-wasaga-beach__01-courtyard-firepit-sunset.webp",
    alt: "The courtyard at golden hour, firepit lit, cabins around",
  },
  {
    src: "/gallery/full/canapy-furniture__11-vessel-topdown.webp",
    alt: "Glazed vessel from above on a walnut sideboard.",
  },
  {
    src: "/gallery/full/destan-turkish-cuisine__15-table-spread.webp",
    alt: "A table set with mezze, lavash and adana, top-down",
  },
  {
    src: "/gallery/full/connectr__01-guests-portrait.webp",
    alt: "Two guests at the ConnecTR 2025 fair, posing for a portrait",
  },
  {
    src: "/gallery/full/big-bears__04-build-corn.webp",
    alt: "Black-gloved hands scooping corn into a takeaway",
  },
] as const;

const ROT = [-10, -5, 0, 5, 10];
const OFF = [-80, -40, 0, 40, 80];
const TILES = 5;
const FEATURE = 2;

/* Absolute ms — the source's timeline positions plus its 0.5s delay. */
const AT = [500, 1600, 2000, 3000, 4000, 4500, 5000] as const;

const TITLE = "SERVICES";

export function ServicesHero({ services }: { services: readonly Service[] }) {
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  /* 0 scattered · 1 in · 2 settled · 3 collapsed · 4 others gone · 5 feature
     up · 6 title up · 7 veil up */
  const [step, setStep] = useState(reduced ? 7 : 0);

  useEffect(() => {
    if (reduced) return;
    const timers = AT.map((at, i) => setTimeout(() => setStep(i + 1), at));
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  return (
    <div className="hx" data-step={step}>
      {/* z-0 — the ground the tiles sit on, which lifts at the end. */}
      <div className="hx-veil" aria-hidden>
        <div className="hx-labels">
          {services.map((s, i) => (
            <span key={s.id} className="hx-label" style={{ ["--l" as string]: i }}>
              {s.name}
            </span>
          ))}
        </div>
      </div>

      <ul className="hx-strip">
        {PLATES.map((plate, i) => (
          <li
            key={plate.src}
            className="hx-tile"
            data-feature={i === FEATURE ? "on" : "off"}
            style={
              {
                "--rot": `${ROT[i]}deg`,
                "--off": `${OFF[i]}px`,
                "--i": i,
                "--back": TILES - 1 - i,
              } as React.CSSProperties
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={plate.src}
              alt={i === FEATURE ? plate.alt : ""}
              aria-hidden={i === FEATURE ? undefined : true}
              loading="eager"
              decoding="async"
            />
          </li>
        ))}
      </ul>

      <div className="hx-title">
        <h1>
          {TITLE.split(" ").map((word, i) => (
            <span className="hx-word-mask" key={word}>
              <span className="hx-word" style={{ ["--w" as string]: i }}>
                {word}
              </span>
            </span>
          ))}
        </h1>
      </div>

      <style jsx global>{`
        .hx {
          position: relative;
          width: 100%;
          flex: 1 1 auto;
          min-height: 460px;
          overflow: hidden;
          isolation: isolate;
          background: var(--surface);
        }

        /* ---- veil (z-0): the ground, behind the tiles ---- */
        .hx-veil {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: #0e0d0c;
          clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
          will-change: clip-path;
          transition: clip-path 1s cubic-bezier(0.65, 0, 0.35, 1);
        }
        .hx[data-step="7"] .hx-veil {
          clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
        }
        .hx-labels {
          position: absolute;
          top: clamp(1rem, 2vw, 2rem);
          left: clamp(1rem, 2vw, 2rem);
          height: 1.3em;
          overflow: hidden;
          font-family: var(--font-mono);
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #ffffeb;
          transition: opacity 0.4s ease;
        }
        .hx-label {
          position: absolute;
          top: 0;
          left: 0;
          white-space: nowrap;
          opacity: 0;
          transform: translateY(100%);
          filter: blur(8px);
          animation: hx-label 0.85s cubic-bezier(0.65, 0, 0.35, 1) forwards;
          animation-delay: calc(0.25s + var(--l) * 0.6s);
        }
        @keyframes hx-label {
          0% {
            opacity: 0;
            transform: translateY(100%);
            filter: blur(8px);
          }
          28%,
          68% {
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
        .hx[data-step="7"] .hx-labels {
          opacity: 0;
        }

        /* ---- strip + tiles (z-5) ---- */
        .hx-strip {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          z-index: 5;
          transform: translateY(-50%);
          padding: 0 clamp(1rem, 2vw, 2rem);
          margin: 0;
          list-style: none;
          display: flex;
          justify-content: center;
          gap: 10vw;
          will-change: gap;
          transition: gap 1s cubic-bezier(0.65, 0, 0.35, 1);
        }
        .hx[data-step="3"] .hx-strip,
        .hx[data-step="4"] .hx-strip,
        .hx[data-step="5"] .hx-strip,
        .hx[data-step="6"] .hx-strip,
        .hx[data-step="7"] .hx-strip {
          gap: 0.75vw;
        }

        .hx-tile {
          width: 15vw;
          aspect-ratio: 5 / 7;
          overflow: hidden;
          will-change: opacity, transform, clip-path;
          transform: translate(var(--off), 18%) rotate(var(--rot)) scale(0.72);
          opacity: 0;
          clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
          transition:
            transform 1.1s cubic-bezier(0.33, 1, 0.68, 1),
            opacity 1.1s ease,
            clip-path 1s cubic-bezier(0.65, 0, 0.35, 1);
          transition-delay: calc(var(--i) * 0.06s);
        }
        .hx-tile img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        /* tiles in → 0.82 */
        .hx[data-step="1"] .hx-tile {
          transform: translate(0, 0) rotate(0deg) scale(0.82);
          opacity: 1;
        }
        /* settle → 0.8 */
        .hx[data-step="2"] .hx-tile {
          transform: translate(0, 0) rotate(0deg) scale(0.8);
          opacity: 1;
          transition-duration: 0.35s;
          transition-delay: calc(var(--i) * 0.04s);
        }
        /* → 1 */
        .hx[data-step="3"] .hx-tile,
        .hx[data-step="4"] .hx-tile,
        .hx[data-step="5"] .hx-tile,
        .hx[data-step="6"] .hx-tile,
        .hx[data-step="7"] .hx-tile {
          transform: translate(0, 0) rotate(0deg) scale(1);
          opacity: 1;
          transition-duration: 1s;
          transition-delay: 0s;
        }
        /* others clip away, stagger 0.1 */
        .hx[data-step="4"] .hx-tile[data-feature="off"],
        .hx[data-step="5"] .hx-tile[data-feature="off"],
        .hx[data-step="6"] .hx-tile[data-feature="off"],
        .hx[data-step="7"] .hx-tile[data-feature="off"] {
          clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
          transition-delay: calc(var(--back) * 0.1s);
        }
        /* feature scales 2 */
        .hx[data-step="5"] .hx-tile[data-feature="on"],
        .hx[data-step="6"] .hx-tile[data-feature="on"],
        .hx[data-step="7"] .hx-tile[data-feature="on"] {
          transform: scale(2);
          transition:
            transform 1s cubic-bezier(0.65, 0, 0.35, 1),
            clip-path 1s cubic-bezier(0.65, 0, 0.35, 1);
          transition-delay: 0s;
        }

        /* ---- title (z-20), dead centre, over everything ---- */
        .hx-title {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 20;
          white-space: nowrap;
          pointer-events: none;
        }
        .hx-title h1 {
          margin: 0;
          font-family: var(--font-mono);
          font-size: 15vw;
          font-weight: 700;
          line-height: 0.82;
          letter-spacing: -0.05em;
          text-align: center;
          text-transform: uppercase;
          color: var(--color-amber);
        }
        .hx-word-mask {
          display: inline-block;
          overflow: hidden;
          line-height: 1;
          vertical-align: top;
        }
        .hx-word {
          display: inline-block;
          will-change: transform;
          transform: translateY(100%);
          transition: transform 0.75s cubic-bezier(0.33, 1, 0.68, 1);
          transition-delay: calc(var(--w) * 0.1s);
        }
        .hx[data-step="6"] .hx-word,
        .hx[data-step="7"] .hx-word {
          transform: translateY(0);
        }

        @media (max-width: 1000px) {
          .hx-strip {
            padding: 0 0.5rem;
            gap: 2.5vw;
          }
          .hx-tile {
            width: 20vw;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hx-veil,
          .hx-strip,
          .hx-tile,
          .hx-word {
            transition: none;
          }
          .hx-label {
            animation: none;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
