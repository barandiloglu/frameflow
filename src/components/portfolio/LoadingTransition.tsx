"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  /** Padded frame number, e.g. "005". */
  frameNumber: string;
  /** Display client name — assembles, then collapses to its initial. */
  clientName: string;
  /** Service tags shown in the corners. */
  scope: readonly string[];
  /** Optional location (e.g. "Toronto"). */
  location?: string;
  /** Optional year (e.g. "2024"). */
  year?: string;
};

/* hero-10's CustomEase('hop', '.8, 0, .3, 1'). Heavier in and quicker out than
   the reveal ease used elsewhere — this is what gives the intro its weight. */
const HOP = [0.8, 0, 0.3, 1] as const;

/* hero-10 runs 7.25s, which is a long time to hold someone between two pages.
   The whole timeline is scaled rather than re-cut, so the proportions between
   its beats stay exactly the reference's. */
const SCALE = 0.68;
const t = (seconds: number) => seconds * SCALE;

/* Absolute beats, taken from the GSAP timeline rather than estimated. */
const BEAT = {
  tagsIn: 0.5,
  introOut: 2.0,
  outroIn: 2.5,
  converge: 3.5,
  lock: 4.5,
  split: 5.25,
  tagsOut: 5.5,
  part: 6.0,
  end: 7.15,
} as const;

/* The clipping box is 0.14em taller than the glyph so descenders are not cut,
   which means a plain 100% translate leaves a sliver of the fallen letters
   showing along the baseline. */
const OUT_Y = "118%";

const STAGGER_INTRO = 0.05;
const STAGGER_OUTRO = 0.075;

/* hero-10 hard-codes how far the initial and the number travel, because its
   title is always "NULLSPACE STUDIO". Ours run from "IYN" to "Northern
   Pathways Immigration", so the travel is measured and the pair is centred on
   the viewport whatever the name. */
const LOCK_SCALE = { first: 0.75, outro: 2.33 } as const;
const LOCK_GAP = 12;
/** Superscript lift, as a fraction of the number's locked height. */
const LOCK_RISE = -0.3;
/** Where the number sits before it converges — hero-10's 10rem, to the right. */
const OUTRO_REST_X = 150;

/* The FrameFlow "w", as a single open stroked path rather than a filled
   outline — a traced outline animates on as a shape inflating, not as a line
   being drawn. The centreline was lifted from the supplied PNG column by
   column and fitted; it measures 82% IoU against the original, so it is a
   close approximation and not the artwork itself. Swap in the real vector
   before this ships. */
const W_PATH =
  "M21.6 284.3 C24.2 287.4 26.6 291.9 37.0 302.7 C47.4 313.5 68.5 328.3 84.0 349.1 C99.5 370.0 114.5 407.6 130.0 427.7 C145.5 447.8 161.5 458.4 177.0 469.7 C192.5 481.1 207.5 495.7 223.0 495.9 C238.5 496.2 254.5 487.5 270.0 471.2 C285.5 454.9 300.5 426.1 316.0 398.3 C331.5 370.4 347.3 331.9 363.0 304.3 C378.7 276.7 394.5 249.7 410.0 232.4 C425.5 215.2 440.5 207.3 456.0 200.8 C471.5 194.3 487.5 191.6 503.0 193.4 C518.5 195.3 533.5 202.3 549.0 211.8 C564.5 221.3 580.3 238.0 596.0 250.4 C611.7 262.8 627.5 278.0 643.0 286.2 C658.5 294.4 673.5 301.4 689.0 299.7 C704.5 298.0 720.5 288.8 736.0 276.1 C751.5 263.5 766.5 243.3 782.0 223.7 C797.5 204.1 813.5 179.5 829.0 158.6 C844.5 137.8 859.5 115.8 875.0 98.7 C890.5 81.5 911.6 66.0 922.0 55.8 C932.4 45.6 934.8 40.5 937.4 37.4";
const W_VIEWBOX = "0 0 972 548";
const W_STROKE = 100;

const useIsoLayout = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function LoadingTransition({
  frameNumber,
  clientName,
  scope,
  location,
  year,
}: Props) {
  const reduced = useReducedMotion();
  const [beat, setBeat] = useState(0);
  const [done, setDone] = useState(false);

  const chars = useMemo(() => Array.from(clientName.toUpperCase()), [clientName]);
  const outro = useMemo(() => Array.from(frameNumber), [frameNumber]);
  const tags = useMemo(
    () => [scope.slice(0, 2).join(" · "), location ?? "", year ?? ""].filter(Boolean),
    [scope, location, year],
  );

  const firstRef = useRef<HTMLSpanElement | null>(null);
  const outroRef = useRef<HTMLDivElement | null>(null);
  const [lock, setLock] = useState<{ first: number; outro: number; rise: number } | null>(null);

  /* Measured once from the resting layout, before anything has moved. Both
     titles start centred and overlapping, so each rect is its natural position.

     Scale happens about the element's own centre, so the target is expressed in
     centres rather than edges: translate the centre to where the scaled edge
     needs to land. Measuring edges and ignoring the scale is what put the pair
     212px apart and 27px off-centre on the first attempt. */
  useIsoLayout(() => {
    if (reduced || lock) return;
    const f = firstRef.current;
    const o = outroRef.current;
    if (!f || !o) return;
    const fr = f.getBoundingClientRect();
    const or = o.getBoundingClientRect();
    if (!fr.width || !or.width) return;

    const initialW = fr.width * LOCK_SCALE.first;
    const numberW = or.width * LOCK_SCALE.outro;
    const pairLeft = window.innerWidth / 2 - (initialW + LOCK_GAP + numberW) / 2;

    /* framer's x is absolute, not additive, so the measured centres have to be
       taken back to their untransformed positions first. The number already
       sits at OUTRO_REST_X when this runs; counting that twice is what put the
       pair 95px overlapped and 101px left of centre. */
    const firstCentre = fr.left + fr.width / 2;
    const outroCentre = or.left + or.width / 2 - OUTRO_REST_X;

    setLock({
      first: pairLeft + initialW / 2 - firstCentre,
      outro: pairLeft + initialW + LOCK_GAP + numberW / 2 - outroCentre,
      rise: or.height * LOCK_SCALE.outro * LOCK_RISE,
    });
  }, [reduced, lock]);

  useEffect(() => {
    /* Nothing runs under reduced motion — no timers and, more importantly, no
       scroll lock. Hiding it in CSS alone would still have held the page for
       the full run with nothing on screen. */
    if (reduced) return;
    document.body.style.overflow = "hidden";
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (s: number, fn: () => void) => timers.push(setTimeout(fn, t(s) * 1000));

    at(BEAT.tagsIn, () => setBeat(1));
    at(BEAT.introOut, () => setBeat(2));
    at(BEAT.outroIn, () => setBeat(3));
    at(BEAT.converge, () => setBeat(4));
    at(BEAT.lock, () => setBeat(5));
    at(BEAT.split, () => setBeat(6));
    at(BEAT.tagsOut, () => setBeat(7));
    at(BEAT.part, () => setBeat(8));
    at(BEAT.end, () => setDone(true));

    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, [reduced]);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  if (done || reduced) return null;

  const split = beat >= 6;
  const parted = beat >= 8;
  const moved = beat >= 4 && lock;
  const locked = beat >= 5 && lock;

  /* The monogram, drawn twice. The upper copy animates; the lower one is
     static in its final state and only becomes visible once the two are
     clipped into halves — which is how hero-10 splits a single word down the
     middle without animating it twice. */
  const monogram = (live: boolean) => {
    const showFirstOnly = live ? beat >= 2 : true;
    const atLock = live ? locked : Boolean(lock);
    const atMove = live ? moved : Boolean(lock);

    return (
      <div className="lt-stage">
        <motion.div
          className="lt-intro"
          initial={false}
          animate={{
            x: atMove && lock ? lock.first : 0,
            /* Hands over to the mark rather than sharing the centre with it. */
            opacity: beat >= 6 ? 0 : 1,
          }}
          transition={{
            x: { duration: t(atLock ? 0.75 : 1), ease: HOP },
            opacity: { duration: t(0.18), ease: "linear" },
          }}
        >
          <h1>
            {chars.map((c, i) => {
              const first = i === 0;
              const up = live ? (first ? beat >= 1 : beat >= 1 && !showFirstOnly) : first;
              return (
                <span className="lt-char" key={`${c}-${i}`}>
                  <motion.span
                    className={first ? "lt-first" : undefined}
                    ref={first && live ? firstRef : undefined}
                    initial={false}
                    animate={{
                      y: up ? "0%" : OUT_Y,
                      scale: first && atLock ? LOCK_SCALE.first : 1,
                      fontWeight: first && atLock ? 900 : 600,
                      marginTop: first && atLock && lock ? lock.rise : 0,
                    }}
                    transition={{
                      duration: t(0.75),
                      delay: live && beat < 3 ? t(i * STAGGER_INTRO) : 0,
                      ease: HOP,
                    }}
                  >
                    {c === " " ? " " : c}
                  </motion.span>
                </span>
              );
            })}
          </h1>
        </motion.div>

        <motion.div
          className="lt-outro"
          ref={live ? outroRef : undefined}
          initial={false}
          animate={{
            x: atMove && lock ? lock.outro : OUTRO_REST_X,
            scale: atLock ? LOCK_SCALE.outro : 1,
            opacity: beat >= 6 ? 0 : 1,
          }}
          transition={{
            x: { duration: t(atLock ? 0.75 : 1), ease: HOP },
            scale: { duration: t(atLock ? 0.75 : 1), ease: HOP },
            opacity: { duration: t(0.18), ease: "linear" },
          }}
        >
          <h1>
            {outro.map((c, i) => (
              <span className="lt-char" key={`${c}-${i}`}>
                <motion.span
                  initial={false}
                  animate={{
                    y: live ? (beat >= 3 ? "0%" : OUT_Y) : "0%",
                    fontWeight: atLock ? 500 : 600,
                  }}
                  transition={{
                    duration: t(0.75),
                    delay: live && beat === 3 ? t(i * STAGGER_OUTRO) : 0,
                    ease: HOP,
                  }}
                >
                  {c}
                </motion.span>
              </span>
            ))}
          </h1>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="lt-root" aria-hidden>
      {/* upper half — this is the copy that animates */}
      <motion.div
        className="lt-layer lt-pre"
        initial={false}
        animate={{
          clipPath: split
            ? "polygon(0 0, 100% 0, 100% 50%, 0 50%)"
            : "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          y: parted ? "-50%" : "0%",
        }}
        transition={{ clipPath: { duration: 0 }, y: { duration: t(1), ease: HOP } }}
      >
        {monogram(true)}
      </motion.div>

      {/* lower half — static, already in the end state */}
      <motion.div
        className="lt-layer lt-split"
        initial={false}
        animate={{
          clipPath: split
            ? "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)"
            : "polygon(0 0, 100% 0, 100% 0, 0 0)",
          y: parted ? "50%" : "0%",
        }}
        transition={{ clipPath: { duration: 0 }, y: { duration: t(1), ease: HOP } }}
      >
        {monogram(false)}
      </motion.div>

      {/* The mark draws across the middle, and the two halves part along the
          line it just drew — so it opens the page rather than decorating it. */}
      <svg
        className="lt-mark"
        viewBox={W_VIEWBOX}
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <motion.path
          d={W_PATH}
          pathLength={1}
          stroke="var(--color-amber)"
          strokeWidth={W_STROKE}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={false}
          animate={{
            strokeDashoffset: split ? 0 : 1,
            opacity: parted ? 0 : split ? 1 : 0,
          }}
          transition={{
            strokeDashoffset: { duration: t(0.75), ease: HOP },
            /* Clears early in the part rather than trailing across the
               revealed page as a grey ghost. */
            opacity: { duration: t(parted ? 0.22 : 0.15), ease: "linear" },
          }}
          style={{ strokeDasharray: 1 }}
        />
      </svg>

      <div className="lt-tags">
        {tags.map((tag, i) => (
          <p className={`lt-tag lt-tag-${i + 1}`} key={tag}>
            <span className="lt-char">
              <motion.span
                initial={false}
                animate={{ y: beat >= 1 && beat < 7 ? "0%" : OUT_Y }}
                transition={{ duration: t(0.75), delay: t(i * 0.1), ease: HOP }}
              >
                {tag}
              </motion.span>
            </span>
          </p>
        ))}
      </div>

      <style jsx global>{`
        /* hero-10's Minimal Studio Intro. The client name assembles, every
           letter but the initial falls away, the frame number rises to meet it,
           the two lock up as a monogram, then the screen splits down the middle
           and parts. */
        .lt-root {
          position: fixed;
          inset: 0;
          z-index: 120;
          pointer-events: none;
        }
        .lt-layer {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100svh;
          background: #0d0c0b;
          color: #ffffeb;
          will-change: transform, clip-path;
        }
        .lt-pre {
          z-index: 2;
        }
        .lt-split {
          z-index: 1;
        }
        .lt-tags {
          position: fixed;
          inset: 0;
          z-index: 3;
          pointer-events: none;
        }
        /* Sits above both halves, on the line they part along. */
        .lt-mark {
          position: fixed;
          top: 50%;
          left: 50%;
          translate: -50% -50%;
          z-index: 4;
          width: min(24vw, 300px);
          height: auto;
          pointer-events: none;
          overflow: visible;
        }

        /* Both titles occupy the same grid cell, so each starts centred and the
           only transform on them is the one framer-motion owns. Centring them
           with a CSS transform instead would fight the animated x. */
        .lt-stage {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
        }
        .lt-intro,
        .lt-outro {
          grid-area: 1 / 1;
          white-space: nowrap;
          will-change: transform;
        }
        .lt-intro h1,
        .lt-outro h1 {
          margin: 0;
          font-family: var(--font-warm);
          font-size: clamp(1.7rem, 4.6vw, 4.6rem);
          font-weight: 600;
          line-height: 1;
          text-transform: uppercase;
          letter-spacing: -0.015em;
          white-space: nowrap;
        }
        /* Each glyph rides in its own overflow-hidden box — that is what lets
           the letters drop away one at a time. */
        .lt-char {
          display: inline-block;
          overflow: hidden;
          vertical-align: bottom;
          padding-bottom: 0.14em;
          margin-bottom: -0.14em;
        }
        .lt-char > span {
          display: inline-block;
          will-change: transform;
        }

        .lt-tag {
          position: absolute;
          margin: 0;
          overflow: hidden;
          width: max-content;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-amber);
        }
        .lt-tag-1 {
          top: 15%;
          left: 15%;
        }
        .lt-tag-2 {
          bottom: 15%;
          left: 25%;
        }
        .lt-tag-3 {
          bottom: 30%;
          right: 15%;
        }

        @media (max-width: 1000px) {
          .lt-tag-1,
          .lt-tag-2 {
            left: 8%;
          }
          .lt-tag-3 {
            right: 8%;
          }
        }
      `}</style>
    </div>
  );
}
