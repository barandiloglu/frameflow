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
/* The artwork itself, from the supplied vector with its translate baked in and
   coordinates rounded to 0.1 — 6440 chars down to 2843. Verified against the
   original raster at 97% IoU, and nothing the PNG had is missing from it. */
const W_ART =
  "M952.8 6.8C954.2 7.8 955.6 8.9 957 10C957.6 10.5 958.2 11 958.9 11.4C965.6 17.4 971.4 28 972.2 37.1C972.7 51.3 971.8 63.3 962.2 74.7C956.8 80.3 951 85.5 945.1 90.6C939.7 95.3 934.5 100.3 929.4 105.4C928.6 106.2 927.8 107.1 927 107.9C922.1 112.8 917.5 117.8 913 123C911.9 124.2 910.9 125.4 909.8 126.6C903.4 133.9 897.2 141.3 891.4 149.2C890.4 150.5 889.4 151.8 888.4 153.1C864.5 184.8 844.3 218.7 826.2 254C817.9 270.4 809.2 286.3 798 301C797.3 301.9 796.6 302.8 795.9 303.8C773.8 331.8 745.4 348.8 709.9 353.7C695.2 355.3 681.1 354.5 667 350C666.4 349.8 665.7 349.6 665.1 349.4C633 339.2 604.2 317.1 579.8 294.6C578.3 293.2 576.8 291.8 575.3 290.5C570.2 286.2 565.5 281.5 560.8 276.7C541.4 256.7 521.9 242.6 493.2 242C464.7 242 443 259.2 423.6 278.1C383.9 319 361.7 373 357.6 429.3C355.4 458.8 351.1 489.8 331 513C330.3 513.8 329.7 514.6 329 515.4C312.9 532.7 287.3 546.9 263.4 548.1C223.7 549.5 187.8 537.4 153 519C152.3 518.6 151.6 518.2 150.8 517.9C132.3 508 115.9 496.3 100.4 482.2C98.1 480.1 95.7 478 93.3 475.9C89.9 472.9 86.9 469.8 84 466.4C82.5 464.6 80.9 462.8 79.4 461.1C66.4 446.5 55.7 430.3 46.2 413.2C45.1 411.2 43.9 409.1 42.7 407.1C19.7 366.1 -10 291.4 0.9 243.2C4.8 231.5 12.8 222.2 23.8 216.6C36.4 210.6 51.7 209.8 65.2 213.6C76.9 217.9 86.5 226.2 91.9 237.6C95.4 245.6 96.4 253.6 97.3 262.2C102.6 306.8 124.5 346.3 152 381C152.7 381.9 153.5 382.9 154.2 383.8C159 389.8 164.1 395.5 169.3 401.1C171.8 403.8 174.2 406.5 176.7 409.3C179.9 412.9 183.2 416 186.8 419.1C189.4 421.4 192 423.8 194.5 426.2C214.5 444.8 214.5 444.8 239.2 454.3C244.6 453.9 248.1 452.2 251.6 448.2C258.8 438 262.7 425.8 265.7 413.8C266.2 411.8 266.7 409.9 267.2 407.9C268.6 402.6 269.9 397.4 271.2 392.1C279.5 359.3 288.4 326.7 303 296C303.4 295.1 303.8 294.3 304.2 293.4C317.7 265 335.5 240.5 356.8 217.6C357.4 216.9 358 216.3 358.6 215.6C362.3 211.7 366.1 208.1 370.2 204.6C372 203 373.7 201.4 375.3 199.6C379.9 195 384.9 191 390 187C390.6 186.5 391.2 186 391.9 185.5C426.7 157.7 465.7 140.5 510.9 145.3C516.4 146.1 521.7 147.4 527 149C528 149.3 528 149.3 529.1 149.6C552.7 157.2 572.8 171.6 591 188C591.5 188.5 592 188.9 592.6 189.4C595.6 192.1 598.5 194.8 601.5 197.6C603.1 199.1 604.6 200.5 606.2 202C606.8 202.5 607.3 203 607.9 203.5C609 204.5 610.1 205.5 611.2 206.5C613.7 208.9 616.3 211.3 618.9 213.7C633.8 227.8 649.3 239.8 669 246C669.6 246.2 670.3 246.4 670.9 246.6C684.6 249.2 698.2 246.1 709.8 238.5C710.5 238 711.3 237.5 712 237C712.6 236.6 713.2 236.2 713.8 235.7C730.3 223 739.8 200.1 749.8 182.5C760.8 163.2 772 144.1 785 126C785.6 125.2 786.1 124.4 786.7 123.6C794.8 112.4 803.2 101.6 812 91C812.8 90 812.8 90 813.6 89.1C818.7 83 823.8 77 829.5 71.5C831.1 69.9 832.6 68.2 834.1 66.4C841.4 58 849.4 50 858 42.8C860.1 40.9 862.2 39 864.3 37.1C869.8 31.9 875.4 27 881.3 22.3C882.6 21.3 883.8 20.3 885 19.3C905.5 2.8 927.7 -8.8 952.8 6.8Z";
/* The fill the logo file specifies. Marginally off --color-amber (#d38f2c) at
   1-3 per channel; the artwork's own value wins here. */
const W_FILL = "#D28E29";

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
        <motion.path
          d={W_ART}
          fill={W_FILL}
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
