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

/* The mark is the real artwork, revealed by sweeping a mask along its own
   centreline — not a redrawn stroke. The supplied logo is a hand-drawn brush
   shape whose perpendicular width runs from 82 to 107 units along its length,
   so no single stroke-width can reproduce it: any redraw comes out subtly
   crooked. Masking the artwork sidesteps that entirely — what you see is the
   file, pixel for pixel.

   The centreline was extracted from the raster by re-centring each sample
   perpendicular to the local tangent (vertical column midpoints are pulled
   toward the inside of a curve, which is what made the first attempt lean),
   then decimated with Douglas-Peucker. At 170 units the mask covers the
   artwork completely — measured, not assumed: 130 left 540px stranded at the
   tight bend, 150 left 23, 170 leaves none. */
const W_PATH =
  "M30 238L47 259L62 325L90 385L126 434L171 472L211 494L166 454L201 470L171 445L219 495L212 480L278 451L292 406L216 482L186 440L294 423L283 455L174 442L184 465L282 458L285 445L166 464L144 406L281 425L153 427L149 422L195 472L238 498L128 433L186 483L280 445L344 330L286 395L304 436L151 436L130 382L131 400L214 482L177 467L187 473L316 392L312 399L327 372L322 395L321 387L207 473L184 454L302 445L303 430L309 438L328 349L366 276L390 247L423 218L449 202L478 194L509 193L544 207L613 266L651 291L684 300L714 297L737 286L756 268L843 130L883 84L926 45L879 87L927 44L873 95L841 134L928 43L863 90L897 70L927 43L926 38L879 104L907 61L942 34L869 100L936 34L938 40L882 86L870 107L935 43L898 73L862 113L916 43L944 20L954 47L931 40L932 34L947 34L886 84L843 167L964 48";
const W_VIEWBOX = "0 0 972 548";
const W_MASK_WIDTH = 170;
const W_SRC = "/logo-w.webp";

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
      <svg className="lt-mark" viewBox={W_VIEWBOX} aria-hidden>
        <defs>
          <mask id="lt-w-mask" maskUnits="userSpaceOnUse">
            <motion.path
              d={W_PATH}
              fill="none"
              stroke="#fff"
              strokeWidth={W_MASK_WIDTH}
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              initial={false}
              animate={{ strokeDashoffset: split ? 0 : 1 }}
              transition={{ duration: t(0.75), ease: HOP }}
              style={{ strokeDasharray: 1 }}
            />
          </mask>
        </defs>
        <motion.image
          href={W_SRC}
          x={0}
          y={0}
          width={972}
          height={548}
          mask="url(#lt-w-mask)"
          initial={false}
          animate={{ opacity: parted ? 0 : 1 }}
          transition={{ duration: t(parted ? 0.22 : 0.01), ease: "linear" }}
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
