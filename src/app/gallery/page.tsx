"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { galleryPhotos } from "@/data/gallery";

/* The nine tiles the sequence settles on — one from Adrian's, two each from
   Big Bears, Canapy, Destan and ConnecTR, with Destan's rotating cag at centre
   where hero-24 puts its hero tile.

   Fixed indices rather than a random pick: choosing at render time gives the
   server and the client different markup and trips hydration. These are also
   what renders on the server, so the grid is in the DOM before any motion
   runs — assistive tech never waits on the animation. */
const SETTLED = [0, 42, 28, 27, 41, 69, 34, 19, 56] as const;

/* hero-24's CustomEase("hop", "0.9, 0, 0.1, 1") verbatim. A hard hold at both
   ends with a fast middle — this is why the reveal reads mechanical rather
   than soft. Do not swap for an easing preset. */
const HOP = [0.9, 0, 0.1, 1] as const;

const CLIP_HIDDEN = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";
const CLIP_SHOWN = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

const SHUFFLE_CYCLES = 20;
const SHUFFLE_MS = 150;
const OVERLAY_MIN_MS = 1800;
const PRELOAD_TIMEOUT_MS = 4000;

const TITLE = "Seventy-six frames, nine at a time.";

type Phase = "overlay" | "reveal" | "shuffle" | "settled";

/* Seeded so a given cycle always produces the same nine. Math.random() here
   would make the sequence impossible to reproduce when verifying it. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Nine distinct photos, none of them the one already in that position — a
   repeat in place reads as a dropped frame rather than a shuffle. */
function pickNine(cycle: number, prev: readonly number[]): number[] {
  const rand = mulberry32(cycle * 2654435761);
  const out: number[] = [];
  for (let pos = 0; pos < 9; pos += 1) {
    let candidate = 0;
    for (let attempt = 0; attempt < 24; attempt += 1) {
      candidate = Math.floor(rand() * galleryPhotos.length);
      if (candidate !== prev[pos] && !out.includes(candidate)) break;
    }
    out.push(candidate);
  }
  return out;
}

export default function GalleryPage() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("overlay");
  const [displayed, setDisplayed] = useState<readonly number[]>(SETTLED);
  const [open, setOpen] = useState<number | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const tiles = useMemo(() => displayed.map((i) => galleryPhotos[i]), [displayed]);

  const skip = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setDisplayed(SETTLED);
    setPhase("settled");
  }, []);

  /* Overlay phase: hold until every thumb has decoded, so the shuffle never
     swaps to an image the browser has not got yet and flashes an empty tile.
     Raced against a timeout — a stalled request must not trap the visitor. */
  useEffect(() => {
    /* No setState for the reduced-motion case — `settled` below derives from
       `reduced` directly. Setting phase here would be a synchronous setState
       inside an effect, which cascades renders. */
    if (reduced) return;
    let cancelled = false;

    const decode = (src: string) =>
      new Promise<void>((resolve) => {
        const im = new Image();
        const done = () => resolve();
        im.onload = () => im.decode().then(done, done);
        im.onerror = done;
        im.src = src;
      });

    const pool = Promise.all(galleryPhotos.map((p) => decode(p.thumb)));
    const floor = new Promise<void>((r) => setTimeout(r, OVERLAY_MIN_MS));
    const ceiling = new Promise<void>((r) => setTimeout(r, PRELOAD_TIMEOUT_MS));

    Promise.all([Promise.race([pool, ceiling]), floor]).then(() => {
      if (!cancelled) setPhase("reveal");
    });

    return () => {
      cancelled = true;
    };
  }, [reduced]);

  /* Reveal runs 1s per tile with a 0.05 stagger across nine, so the last one
     lands at 1 + 8 * 0.05. */
  useEffect(() => {
    if (phase !== "reveal") return;
    const t = setTimeout(() => setPhase("shuffle"), (1 + 8 * 0.05) * 1000);
    timers.current.push(t);
    return () => clearTimeout(t);
  }, [phase]);

  /* The shuffle is not an animation — hero-24 uses a zero-duration GSAP tween
     purely as a timer, and this is the same thing: a scheduled src swap. */
  useEffect(() => {
    if (phase !== "shuffle") return;
    let cycle = 0;
    const id = setInterval(() => {
      cycle += 1;
      if (cycle >= SHUFFLE_CYCLES) {
        clearInterval(id);
        setDisplayed(SETTLED);
        setPhase("settled");
        return;
      }
      setDisplayed((prev) => pickNine(cycle, prev));
    }, SHUFFLE_MS);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  /* Derived, not stored: reduced motion lands on the settled grid without the
     sequence ever having to run or set state. */
  const settled = Boolean(reduced) || phase === "settled";
  const revealed = Boolean(reduced) || phase !== "overlay";
  const showOverlay = !reduced && phase === "overlay";

  return (
    <main className="gl-page">
      {!showOverlay ? (
        <Link href="/" className="gl-back">
          FrameFlow <span aria-hidden>←</span> back
        </Link>
      ) : null}

      <div className="gl-grid">
        {tiles.map((p, i) => (
          <motion.button
            key={SETTLED[i]}
            type="button"
            className="gl-tile"
            onClick={() => settled && setOpen(i)}
            aria-label={`Open: ${p.slate}`}
            disabled={!settled}
            initial={false}
            animate={{ clipPath: revealed ? CLIP_SHOWN : CLIP_HIDDEN }}
            transition={{ duration: reduced ? 0 : 1, delay: reduced ? 0 : i * 0.05, ease: HOP }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.thumb} alt={p.alt} width={p.w} height={p.h} />
          </motion.button>
        ))}
      </div>

      <div className="gl-caption">
        <p className="gl-eyebrow">
          <span className="gl-line">
            <motion.span
              initial={false}
              animate={{ y: settled ? "0%" : "110%" }}
              transition={{ duration: reduced ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              FrameFlow — Photography
            </motion.span>
          </span>
        </p>
        <h1 className="gl-title">
          {TITLE.split(" ").map((word, i) => (
            <span className="gl-line" key={`${word}-${i}`}>
              <motion.span
                initial={false}
                animate={{ y: settled ? "0%" : "110%" }}
                transition={{
                  duration: reduced ? 0 : 1,
                  delay: reduced ? 0 : i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>
      </div>

      {!settled ? (
        <button type="button" className="gl-skip" onClick={skip}>
          skip
        </button>
      ) : null}

      {showOverlay ? (
        <div className="gl-overlay" aria-hidden>
          <h2 className="gl-loader">Gallery</h2>
        </div>
      ) : null}

      {open !== null ? (
        <div
          className="gl-open"
          role="dialog"
          aria-modal="true"
          aria-label={tiles[open].slate}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(null);
          }}
        >
          <figure className="gl-open-figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tiles[open].full}
              alt={tiles[open].alt}
              width={tiles[open].w}
              height={tiles[open].h}
              /* Never past natural width — 16 of the 76 originals are
                 700-900px wide and turn to mush stretched full-bleed. */
              style={{ width: `min(${tiles[open].w}px, 92vw)` }}
            />
            <figcaption>
              {tiles[open].slate}
              <span> · {tiles[open].client.replace(/-/g, " ")}</span>
            </figcaption>
          </figure>
          <button type="button" className="gl-open-x" onClick={() => setOpen(null)} aria-label="Close">
            ✕
          </button>
        </div>
      ) : null}

      <style jsx global>{`
        /* The gallery pins its own ground rather than following the theme
           toggle — there is no navbar here to toggle from, and photographs
           read better against a constant dark field. */
        .gl-page {
          --gl-ground: #353230;
          --gl-ink: #ffffeb;
          position: fixed;
          inset: 0;
          background: var(--gl-ground);
          color: var(--gl-ink);
          overflow: hidden;
          font-family: var(--font-mono);
        }

        .gl-overlay {
          position: fixed;
          inset: 0;
          z-index: 30;
          background: #100f0e;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        /* hero-24's wipe: a 200%-tall gradient painted into transparent-filled
           text, revealed by sliding background-position from bottom to top. */
        .gl-loader {
          margin: 0;
          font-family: var(--font-editorial);
          font-weight: 300;
          font-size: clamp(38px, 7vw, 96px);
          line-height: 0.9;
          letter-spacing: -0.02em;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
          background-image: linear-gradient(0deg, #4a4744, #4a4744 50%, #ffffeb 0);
          background-size: 100% 200%;
          background-position: 0% 100%;
          /* A keyframe rather than a class toggle, so no state has to be set
             from an effect just to start it. */
          animation: gl-wipe 1.4s linear forwards;
        }
        @keyframes gl-wipe {
          from {
            background-position: 0% 100%;
          }
          to {
            background-position: 0% 0%;
          }
        }

        .gl-back {
          position: fixed;
          top: 22px;
          left: 24px;
          z-index: 20;
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 235, 0.72);
          text-decoration: none;
          transition: color 200ms ease;
        }
        .gl-back:hover {
          color: var(--gl-ink);
        }

        .gl-skip {
          position: fixed;
          right: 24px;
          bottom: 22px;
          z-index: 31;
          background: none;
          border: 1px solid rgba(255, 255, 235, 0.28);
          color: rgba(255, 255, 235, 0.82);
          padding: 7px 14px;
          font-family: var(--font-mono);
          font-size: 9.5px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          cursor: pointer;
          transition: border-color 180ms ease, color 180ms ease;
        }
        .gl-skip:hover {
          border-color: rgba(255, 255, 235, 0.7);
          color: var(--gl-ink);
        }

        .gl-grid {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: min(46vw, 620px);
          aspect-ratio: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(3, 1fr);
          gap: 1em;
          z-index: 2;
        }

        .gl-tile {
          position: relative;
          padding: 0;
          border: 0;
          background: rgba(255, 255, 235, 0.04);
          cursor: pointer;
          overflow: hidden;
          aspect-ratio: 1;
        }
        .gl-tile[disabled] {
          cursor: default;
        }
        .gl-tile img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .gl-tile:focus-visible {
          outline: 2px solid var(--gl-ink);
          outline-offset: 3px;
        }

        .gl-caption {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 6%;
          text-align: center;
          z-index: 3;
          padding: 0 24px;
        }
        .gl-line {
          display: inline-block;
          overflow: hidden;
          vertical-align: bottom;
          padding-bottom: 0.12em;
          margin-bottom: -0.12em;
        }
        .gl-line > span {
          display: inline-block;
          will-change: transform;
        }
        .gl-eyebrow {
          margin: 0 0 10px;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255, 255, 235, 0.6);
        }
        .gl-title {
          margin: 0;
          font-family: var(--font-editorial);
          font-weight: 300;
          font-size: clamp(24px, 3.4vw, 46px);
          line-height: 1;
          letter-spacing: -0.02em;
          color: var(--gl-ink);
        }
        .gl-title .gl-line {
          margin-right: 0.22em;
        }

        .gl-open {
          position: fixed;
          inset: 0;
          z-index: 40;
          background: rgba(16, 15, 14, 0.94);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }
        .gl-open-figure {
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          max-width: 100%;
        }
        .gl-open-figure img {
          height: auto;
          max-height: 78vh;
          object-fit: contain;
          display: block;
        }
        .gl-open-figure figcaption {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 235, 0.82);
          text-align: center;
        }
        .gl-open-figure figcaption span {
          color: rgba(255, 255, 235, 0.5);
        }
        .gl-open-x {
          position: fixed;
          top: 20px;
          right: 24px;
          background: none;
          border: 0;
          color: rgba(255, 255, 235, 0.8);
          font-size: 22px;
          line-height: 1;
          cursor: pointer;
        }
        .gl-open-x:hover {
          color: var(--gl-ink);
        }

        @media (max-width: 900px) {
          .gl-grid {
            width: min(86vw, 520px);
            gap: 0.5em;
          }
        }
        @media (max-width: 560px) {
          .gl-grid {
            width: 92vw;
          }
          .gl-caption {
            bottom: 4%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          /* The overlay never renders under reduced motion, but belt-and-braces
             in case the media query and framer-motion's hook disagree. */
          .gl-loader {
            animation: none;
            background-position: 0% 0%;
          }
        }
      `}</style>
    </main>
  );
}
