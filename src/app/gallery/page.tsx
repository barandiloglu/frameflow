"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { galleryPhotos } from "@/data/gallery";

/* The nine the sequence settles on — the selects. One from Adrian's, two each
   from Big Bears, Canapy, Destan and ConnecTR, with Destan's rotating cag at
   centre where hero-24 puts its hero tile.

   Fixed indices rather than a random pick: choosing at render time gives the
   server and the client different markup and trips hydration. These are also
   what renders first, so the grid is in the DOM before any motion runs —
   assistive tech never waits on the animation. */
const SETTLED = [0, 42, 28, 27, 41, 69, 34, 19, 56] as const;
const SELECTED = new Set<number>(SETTLED);

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

/* Six frames to a strip, the way a 35mm proof sheet is cut. */
const PER_STRIP = 6;

const TITLE = "Seventy-six frames, nine at a time.";

type Phase = "overlay" | "reveal" | "shuffle" | "settled";
type View = "selects" | "sheet";

const frameNo = (i: number) => String(i + 1).padStart(2, "0");

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

const STRIPS = Array.from(
  { length: Math.ceil(galleryPhotos.length / PER_STRIP) },
  (_, s) => galleryPhotos.slice(s * PER_STRIP, s * PER_STRIP + PER_STRIP).map((p, j) => ({
    photo: p,
    index: s * PER_STRIP + j,
  })),
);

export default function GalleryPage() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("overlay");
  const [view, setView] = useState<View>("selects");
  const [displayed, setDisplayed] = useState<readonly number[]>(SETTLED);
  /* An index into galleryPhotos, not into the nine — so stepping walks the
     whole roll from wherever it was opened. */
  const [open, setOpen] = useState<number | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const tiles = useMemo(() => displayed.map((i) => galleryPhotos[i]), [displayed]);

  const skip = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setDisplayed(SETTLED);
    setPhase("settled");
  }, []);

  const step = useCallback((dir: number) => {
    setOpen((cur) =>
      cur === null ? cur : (cur + dir + galleryPhotos.length) % galleryPhotos.length,
    );
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

  /* Focus trap for the opened frame. Focus moves to the close control, Tab is
     confined to the panel, and focus returns to whatever opened it. */
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (open === null) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        return;
      }
      if (e.key === "ArrowRight") {
        step(1);
        return;
      }
      if (e.key === "ArrowLeft") {
        step(-1);
        return;
      }
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const f = panel.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prev?.focus();
    };
  }, [open, step]);

  /* Derived, not stored: reduced motion lands on the settled grid without the
     sequence ever having to run or set state. */
  const settled = Boolean(reduced) || phase === "settled";
  const revealed = Boolean(reduced) || phase !== "overlay";
  const showOverlay = !reduced && phase === "overlay";
  /* Index and photo together, so guarding on this narrows both — guarding on a
     derived photo alone leaves `open` as number | null inside the block. */
  const openView = open === null ? null : { i: open, p: galleryPhotos[open] };

  return (
    <main className="gl-page">
      <div className="gl-safelight" aria-hidden />
      <div className="gl-grain" aria-hidden />

      {!showOverlay ? (
        <Link href="/" className="gl-back">
          FrameFlow <span aria-hidden>←</span> back
        </Link>
      ) : null}

      {/* ---------------- SELECTS ---------------- */}
      {view === "selects" ? (
        <>
          <div className="gl-grid">
            {tiles.map((p, i) => (
              <motion.button
                key={SETTLED[i]}
                type="button"
                className="gl-tile"
                onClick={() => settled && setOpen(displayed[i])}
                aria-label={`Open frame ${frameNo(displayed[i])}: ${p.slate}`}
                disabled={!settled}
                initial={false}
                animate={{ clipPath: revealed ? CLIP_SHOWN : CLIP_HIDDEN }}
                transition={{ duration: reduced ? 0 : 1, delay: reduced ? 0 : i * 0.05, ease: HOP }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.thumb} alt={p.alt} width={p.w} height={p.h} />
                <span className="gl-frameno" aria-hidden>
                  {frameNo(displayed[i])}
                </span>
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
            {settled ? (
              <motion.button
                type="button"
                className="gl-sheet-toggle"
                onClick={() => setView("sheet")}
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.5 }}
              >
                ◎ Contact sheet — all {galleryPhotos.length} frames
              </motion.button>
            ) : null}
          </div>
        </>
      ) : null}

      {/* ---------------- CONTACT SHEET ---------------- */}
      {view === "sheet" ? (
        <div className="gl-sheet-scroll">
          <div className="gl-sheet-head">
            <button type="button" className="gl-sheet-toggle" onClick={() => setView("selects")}>
              ← Selects
            </button>
            <p className="gl-sheet-meta">
              Contact sheet · {galleryPhotos.length} frames · five rolls
            </p>
          </div>

          {STRIPS.map((strip, s) => (
            <div className="gl-strip" key={s}>
              {strip.map(({ photo, index }) => (
                <div className="gl-cell" key={photo.src}>
                  <button
                    type="button"
                    className={`gl-frame${SELECTED.has(index) ? " picked" : ""}`}
                    onClick={() => setOpen(index)}
                    aria-label={`Open frame ${frameNo(index)}: ${photo.slate}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo.thumb} alt={photo.alt} width={photo.w} height={photo.h} loading="lazy" />
                  </button>
                  {/* Printed on the film edge, the way a proof sheet numbers
                      its frames — over the image it washes out on bright ones. */}
                  <span className="gl-edge" aria-hidden>
                    {frameNo(index)}
                    {SELECTED.has(index) ? <i>◎</i> : null}
                  </span>
                </div>
              ))}
            </div>
          ))}

          <p className="gl-sheet-foot">
            ◎ marks the nine selects · click any frame to enlarge
          </p>
        </div>
      ) : null}

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

      {/* ---------------- OPEN FRAME ---------------- */}
      {openView ? (
        <motion.div
          className="gl-open"
          role="dialog"
          aria-modal="true"
          aria-label={openView.p.slate}
          initial={{ opacity: reduced ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduced ? 0 : 0.4 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(null);
          }}
        >
          <div className="gl-open-panel" ref={panelRef}>
            <figure className="gl-open-figure">
              {/* hero-24's opening move: the frame scales up behind an insetting
                  clip-path while the image inside counter-scales 2 -> 1. The two
                  transforms in opposition are what make it read as the photo
                  opening rather than merely growing. */}
              <motion.div
                key={openView.i}
                className="gl-open-frame"
                initial={
                  reduced
                    ? false
                    : { scale: 0.42, clipPath: "polygon(28% 18%, 72% 18%, 72% 82%, 28% 82%)" }
                }
                animate={{ scale: 1, clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
                transition={{ duration: reduced ? 0 : 1.5, ease: HOP }}
                /* Three caps, all of which must hold at once:
                   - natural width, because 16 of the 76 originals are 700-900px
                     wide and turn to mush stretched full-bleed;
                   - 92vw, so it never touches the sides;
                   - 74vh x aspect, so a tall portrait fits by height instead of
                     being cropped by the frame's overflow. That third term is
                     the one whose absence crops 2850px-tall frames to a third
                     of themselves. aspect-ratio then fixes the height. */
                style={{
                  width: `min(${openView.p.w}px, 92vw, calc(74vh * ${(
                    openView.p.w / openView.p.h
                  ).toFixed(4)}))`,
                  aspectRatio: `${openView.p.w} / ${openView.p.h}`,
                }}
              >
                <motion.img
                  src={openView.p.full}
                  alt={openView.p.alt}
                  width={openView.p.w}
                  height={openView.p.h}
                  initial={reduced ? false : { scale: 2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: reduced ? 0 : 1.5, ease: HOP }}
                />
              </motion.div>
              <figcaption>
                <span className="gl-open-no">{frameNo(openView.i)}</span>
                {openView.p.slate}
                <span className="gl-open-client"> · {openView.p.client.replace(/-/g, " ")}</span>
              </figcaption>
            </figure>

            <div className="gl-open-nav">
              <button type="button" onClick={() => step(-1)} aria-label="Previous frame">
                ‹
              </button>
              <span>
                {frameNo(openView.i)} / {galleryPhotos.length}
              </span>
              <button type="button" onClick={() => step(1)} aria-label="Next frame">
                ›
              </button>
            </div>

            <button
              type="button"
              className="gl-open-x"
              ref={closeRef}
              onClick={() => setOpen(null)}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </motion.div>
      ) : null}

      <style jsx global>{`
        /* A darkroom, not a void: warm near-black film base, an amber safelight
           bleeding in from one corner, and grain over the whole thing. The
           gallery pins its own ground rather than following the theme toggle —
           there is no navbar here to toggle from. */
        .gl-page {
          --gl-base: #14100e;
          --gl-film: #0c0a09;
          --gl-ink: #ffffeb;
          --gl-safe: #d38f2c;
          --gl-mark: #d45938;
          position: fixed;
          inset: 0;
          background: var(--gl-base);
          color: var(--gl-ink);
          overflow: hidden;
          font-family: var(--font-mono);
        }

        .gl-safelight {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background:
            radial-gradient(60% 50% at 82% 8%, rgba(211, 143, 44, 0.16), transparent 70%),
            radial-gradient(50% 45% at 12% 92%, rgba(212, 89, 56, 0.1), transparent 72%);
        }
        /* Film grain. feTurbulence rendered once into a tile, held at low
           opacity — enough to sit on the images without dirtying them. */
        .gl-grain {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 12;
          opacity: 0.05;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 160px 160px;
        }

        .gl-overlay {
          position: fixed;
          inset: 0;
          z-index: 30;
          background: #0a0807;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        /* hero-24's wipe: a 200%-tall gradient painted into transparent-filled
           text, revealed by sliding background-position from bottom to top.
           Here it develops from safelight amber into paper white. */
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
          background-image: linear-gradient(0deg, #4a3a24, #4a3a24 50%, #ffffeb 0);
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
          color: var(--gl-safe);
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
          top: 46%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: min(44vw, 580px);
          aspect-ratio: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(3, 1fr);
          gap: 0.9em;
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
        .gl-tile:focus-visible,
        .gl-frame:focus-visible {
          outline: 2px solid var(--gl-safe);
          outline-offset: 3px;
        }

        /* Frame number on a select tile sits over the image, so it carries its
           own scrim — amber alone disappears against a bright frame. */
        .gl-frameno {
          position: absolute;
          top: 7px;
          left: 7px;
          padding: 2px 5px;
          background: rgba(10, 8, 7, 0.72);
          font-family: var(--font-mono);
          font-size: 8.5px;
          font-weight: 600;
          letter-spacing: 0.18em;
          color: var(--gl-safe);
          pointer-events: none;
        }

        .gl-caption {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 5%;
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
          color: rgba(211, 143, 44, 0.85);
        }
        .gl-title {
          margin: 0;
          font-family: var(--font-editorial);
          font-weight: 300;
          font-size: clamp(22px, 3.1vw, 42px);
          line-height: 1;
          letter-spacing: -0.02em;
          color: var(--gl-ink);
        }
        .gl-title .gl-line {
          margin-right: 0.22em;
        }

        .gl-sheet-toggle {
          margin-top: 22px;
          background: none;
          border: 1px solid rgba(211, 143, 44, 0.4);
          color: rgba(255, 255, 235, 0.9);
          padding: 9px 18px;
          font-family: var(--font-mono);
          font-size: 9.5px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          cursor: pointer;
          transition: border-color 180ms ease, color 180ms ease, background 180ms ease;
        }
        .gl-sheet-toggle:hover {
          border-color: var(--gl-safe);
          color: var(--gl-safe);
          background: rgba(211, 143, 44, 0.07);
        }

        /* ---- contact sheet ---- */
        .gl-sheet-scroll {
          position: absolute;
          inset: 0;
          overflow-y: auto;
          z-index: 4;
          padding: 74px 22px 80px;
          scrollbar-width: thin;
        }
        .gl-sheet-head {
          max-width: 1180px;
          margin: 0 auto 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          flex-wrap: wrap;
        }
        .gl-sheet-head .gl-sheet-toggle {
          margin-top: 0;
        }
        .gl-sheet-meta {
          margin: 0;
          font-family: var(--font-mono);
          font-size: 9.5px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 235, 0.62);
        }
        /* Each row is a strip of film: darker base, frames sitting in it with
           their numbers printed on the edge. */
        .gl-strip {
          max-width: 1180px;
          margin: 0 auto 10px;
          display: grid;
          grid-template-columns: repeat(${PER_STRIP}, 1fr);
          gap: 6px;
          padding: 10px;
          background: var(--gl-film);
          border-top: 1px solid rgba(211, 143, 44, 0.16);
          border-bottom: 1px solid rgba(211, 143, 44, 0.16);
        }
        .gl-cell {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        /* Full amber, not a faded one: at 8px on the film base, 0.7 alpha
           measures 4.03:1 and misses the small-text floor. */
        .gl-edge {
          font-family: var(--font-mono);
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 0.2em;
          color: var(--gl-safe);
          text-align: center;
          line-height: 1.4;
        }
        .gl-edge i {
          font-style: normal;
          margin-left: 4px;
          color: var(--gl-mark);
        }
        .gl-frame {
          position: relative;
          padding: 0;
          border: 0;
          background: rgba(255, 255, 235, 0.05);
          cursor: pointer;
          overflow: hidden;
          aspect-ratio: 1;
        }
        .gl-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: opacity 200ms ease;
          opacity: 0.88;
        }
        .gl-frame:hover img {
          opacity: 1;
        }
        /* The nine selects, ringed the way a photographer rings a proof. */
        .gl-frame.picked {
          outline: 1px solid rgba(212, 89, 56, 0.85);
          outline-offset: -1px;
        }
        .gl-frame.picked + .gl-edge {
          color: var(--gl-mark);
        }
        .gl-sheet-foot {
          max-width: 1180px;
          margin: 24px auto 0;
          text-align: center;
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 235, 0.55);
        }

        /* ---- open frame ---- */
        .gl-open {
          position: fixed;
          inset: 0;
          z-index: 40;
          background: rgba(8, 6, 5, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }
        .gl-open-panel {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
          max-width: 100%;
        }
        .gl-open-figure {
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          max-width: 100%;
        }
        /* The frame carries the scale + clip and is sized by the three caps set
           inline; the image inside carries the counter-scale. No max-height
           here — the width formula already accounts for viewport height, and a
           max-height would crop rather than fit. */
        .gl-open-frame {
          overflow: hidden;
          line-height: 0;
          display: block;
        }
        .gl-open-figure img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .gl-open-figure figcaption {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 235, 0.86);
          text-align: center;
        }
        .gl-open-no {
          color: var(--gl-safe);
          margin-right: 10px;
        }
        .gl-open-client {
          color: rgba(255, 255, 235, 0.5);
        }
        .gl-open-nav {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .gl-open-nav button {
          width: 34px;
          height: 34px;
          line-height: 1;
          background: none;
          border: 1px solid rgba(255, 255, 235, 0.24);
          color: rgba(255, 255, 235, 0.85);
          font-size: 18px;
          cursor: pointer;
          transition: border-color 160ms ease, color 160ms ease;
        }
        .gl-open-nav button:hover {
          border-color: var(--gl-safe);
          color: var(--gl-safe);
        }
        .gl-open-nav span {
          font-family: var(--font-mono);
          font-size: 9.5px;
          font-weight: 500;
          letter-spacing: 0.22em;
          color: rgba(255, 255, 235, 0.62);
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
          color: var(--gl-safe);
        }
        /* The trap focuses this on open, so it must not show a raw UA ring. */
        .gl-open-x:focus-visible,
        .gl-open-nav button:focus-visible,
        .gl-sheet-toggle:focus-visible,
        .gl-skip:focus-visible,
        .gl-back:focus-visible {
          outline: 2px solid var(--gl-safe);
          outline-offset: 3px;
        }
        .gl-open-x:focus:not(:focus-visible) {
          outline: none;
        }

        @media (max-width: 1100px) {
          .gl-strip {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        @media (max-width: 900px) {
          .gl-grid {
            width: min(86vw, 500px);
            gap: 0.5em;
          }
        }
        @media (max-width: 640px) {
          .gl-strip {
            grid-template-columns: repeat(3, 1fr);
          }
          .gl-sheet-scroll {
            padding: 64px 14px 70px;
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
