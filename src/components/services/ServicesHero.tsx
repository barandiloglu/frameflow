"use client";

import { useEffect, useState } from "react";

/* Ported from awwwards hero-3 (Expanding Image Band).
 *
 * The source's shape: a small centred frame in which images wipe in one after
 * another via clip-path inset(0 0 100% 0) → inset(0), staggered 0.25s; the
 * frame then expands to fill the viewport (width 100%, height 100dvh); a radial
 * scrim fades up; then the headline words rise into place.
 *
 * Timings are the source's own — 0.35s lead-in, 0.25s stagger, 1s wipe, 1s
 * expand on power3.inOut (≈ cubic-bezier(0.68, 0, 0.27, 1)), words at 0.075s
 * stagger. GSAP is not used; this runs on CSS transitions and one state flip.
 *
 * The point of choosing it: the frame ends at exactly one viewport, full bleed,
 * so the hero cannot be empty at the edges and cannot overflow the fold. */

/* Order matters: the last plate is the one that stays on screen once the
   sequence finishes, so it has to carry the page. The close-ups lead; the
   wide golden-hour frame rests, and its dark lower-left is where the
   headline sits. */
const PLATES = [
  {
    src: "/gallery/full/destan-turkish-cuisine__05-carving-cag.webp",
    alt: "The chef carves the ca\u011f with a long blade",
  },
  {
    src: "/gallery/full/big-bears__04-build-corn.webp",
    alt: "Black-gloved hands scooping corn into a takeaway",
  },
  {
    src: "/gallery/full/canapy-furniture__11-vessel-topdown.webp",
    alt: "Glazed vessel from above on a walnut sideboard.",
  },
  {
    src: "/gallery/full/connectr__01-guests-portrait.webp",
    alt: "Two guests at the ConnecTR 2025 fair, posing for a portrait",
  },
  {
    src: "/gallery/full/destan-turkish-cuisine__15-table-spread.webp",
    alt: "A table set with mezze, lavash and adana, top-down",
  },
  {
    src: "/gallery/full/adrians-wasaga-beach__01-courtyard-firepit-sunset.webp",
    alt: "The courtyard at golden hour, firepit lit, cabins around",
  },
] as const;

/* 0.35 lead + 5 × 0.25 stagger + 1s wipe, then the 1s expand. */
const EXPAND_AT = (0.35 + (PLATES.length - 1) * 0.25 + 1) * 1000;

export function ServicesHero() {
  /* Read once at mount rather than inside the effect — setting state
     synchronously in an effect body cascades a second render. */
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [open, setOpen] = useState(reduced);

  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => setOpen(true), EXPAND_AT);
    return () => clearTimeout(t);
  }, [reduced]);

  return (
    <div className="sh" data-open={open ? "on" : "off"}>
      <div className="sh-frame">
        {PLATES.map((p, i) => (
          <img
            key={p.src}
            className="sh-plate"
            src={p.src}
            alt={i === PLATES.length - 1 ? p.alt : ""}
            aria-hidden={i === PLATES.length - 1 ? undefined : true}
            style={{ ["--i" as string]: i }}
            fetchPriority={i === 0 || i === PLATES.length - 1 ? "high" : "low"}
            decoding="async"
          />
        ))}
        <span className="sh-scrim" aria-hidden />
      </div>

      <div className="sh-copy">
        <h1 className="sh-title">
          <span className="sh-mask">
            <span className="sh-word" style={{ ["--w" as string]: 0 }}>
              Seven <em>scenes</em>.
            </span>
          </span>
          <span className="sh-mask">
            <span className="sh-word" style={{ ["--w" as string]: 1 }}>
              One full <em className="sh-plain">reel</em>.
            </span>
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
          /* Fills whatever the section has left after the navbar offset and
             the slate strip, so the hero is exactly one screen without
             hard-coding either of their heights. */
          flex: 1 1 auto;
          min-height: 440px;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
        }

        /* Starts as a small portrait plate at the centre, ends as the whole
           viewport — the source's move, and why nothing can be left empty. */
        .sh-frame {
          position: absolute;
          top: 50%;
          left: 50%;
          width: min(74vw, 300px);
          height: min(56svh, 400px);
          transform: translate(-50%, -50%);
          overflow: hidden;
          background: var(--surface);
          transition:
            width 1s cubic-bezier(0.68, 0, 0.27, 1),
            height 1s cubic-bezier(0.68, 0, 0.27, 1);
        }
        .sh[data-open="on"] .sh-frame {
          width: 100%;
          height: 100%;
        }

        .sh-plate {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          clip-path: inset(0% 0% 100% 0%);
          transition: clip-path 1s cubic-bezier(0.2, 0.8, 0.2, 1);
          transition-delay: calc(0.35s + var(--i) * 0.25s);
        }
        /* Each plate wipes up over the one before it; the last is what stays. */
        .sh[data-open="off"] .sh-plate,
        .sh[data-open="on"] .sh-plate {
          clip-path: inset(0% 0% 0% 0%);
        }

        .sh-scrim {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.85s ease-out;
          /* Two layers: a radial lift from the source, plus a graphite ramp up
             the left where the headline sits — the type has to clear 4.5:1 over
             photographs, not just look moody. */
          background:
            radial-gradient(120% 100% at 70% 30%, transparent 20%, rgba(20, 18, 17, 0.5) 100%),
            linear-gradient(
              to top,
              rgba(20, 18, 17, 0.92) 0%,
              rgba(20, 18, 17, 0.72) 38%,
              rgba(20, 18, 17, 0.28) 70%,
              rgba(20, 18, 17, 0.12) 100%
            );
        }
        .sh[data-open="on"] .sh-scrim {
          opacity: 1;
        }
        /* The phone crop lifts the headline onto brighter parts of the frame —
           measured 2.1:1 against the brightest pixels under it there, so the
           ramp has to carry further up. */
        @media (max-width: 700px) {
          .sh-scrim {
            background: linear-gradient(
              to top,
              rgba(20, 18, 17, 0.95) 0%,
              rgba(20, 18, 17, 0.9) 46%,
              rgba(20, 18, 17, 0.6) 76%,
              rgba(20, 18, 17, 0.25) 100%
            );
          }
        }

        .sh-copy {
          position: relative;
          z-index: 2;
          width: 100%;
          padding: 0 clamp(22px, 5vw, 72px) clamp(40px, 6vh, 88px);
        }
        .sh-title {
          margin: 0;
          font-family: var(--font-editorial);
          font-weight: 300;
          font-size: clamp(44px, 8.4vw, 132px);
          line-height: 0.94;
          letter-spacing: -0.035em;
          /* Ivory over the scrim regardless of theme — this sits on a
             photograph, not on the page ground. */
          color: #ffffeb;
        }
        .sh-title em {
          font-style: italic;
          color: var(--color-amber);
        }
        .sh-title em.sh-plain {
          color: inherit;
        }
        .sh-mask {
          display: block;
          overflow: hidden;
        }
        .sh-word {
          display: block;
          transform: translateY(108%);
          transition: transform 0.95s cubic-bezier(0.2, 0.8, 0.2, 1);
          transition-delay: calc(var(--w) * 0.075s + 0.25s);
        }
        .sh[data-open="on"] .sh-word {
          transform: translateY(0);
        }

        .sh-sub {
          margin: clamp(18px, 2.4vh, 30px) 0 0;
          max-width: 620px;
          font-family: var(--font-warm);
          font-size: clamp(14px, 1.05vw, 16px);
          font-weight: 300;
          line-height: 1.75;
          color: rgba(255, 255, 235, 0.86);
          opacity: 0;
          transition: opacity 0.7s ease 0.55s;
        }
        .sh[data-open="on"] .sh-sub {
          opacity: 1;
        }

        @media (prefers-reduced-motion: reduce) {
          .sh-frame,
          .sh-plate,
          .sh-word,
          .sh-sub,
          .sh-scrim {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
