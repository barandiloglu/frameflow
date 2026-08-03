"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { galleryPhotos } from "@/data/gallery";

/* ------------------------------------------------------------------ */
/*  hero-24, ported beat for beat                                      */
/* ------------------------------------------------------------------ */

/* The nine the grid deals from, hero at centre. Fixed rather than random:
   picking at render time desynchronises server and client markup.

   Centre is 56 (Guests · Portrait) because the hero ends up clipped to its
   middle 60% x 80%, and a frame has to survive that crop. Measured mean
   luminance through the real crop: 56 reads at 78, where Destan's cag — which
   sat here first — falls to 35 and goes essentially black. hero-24 centres a
   face for the same reason. */
const SETTLED = [0, 42, 28, 27, 56, 69, 34, 19, 41] as const;
const SELECTED = new Set<number>(SETTLED);
const HERO_POS = 4;

/* CustomEase("hop", "0.9, 0, 0.1, 1") verbatim. A hard hold at both ends with
   a fast middle — this is why the whole sequence reads mechanical. */
const HOP = [0.9, 0, 0.1, 1] as const;

const CLIP_HIDDEN = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";
const CLIP_SHOWN = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
/* The hero's final crop — a square tile scaled 4x and clipped to 60% x 80%
   becomes the tall banner the sequence lands on. */
const CLIP_HERO = "polygon(20% 10%, 80% 10%, 80% 90%, 20% 90%)";

/* Absolute times in seconds, derived from the GSAP timelines rather than
   guessed: overlayTimeline, imagesTimeline and textTimeline all run in
   parallel from t=0, and each .to() starts where the previous one ended. */
const T = {
  logo2: 1.5,
  listsIn: 2.5,
  gridIn: 2.5,
  rotate: 3.5,
  collapse: 6.4,
  heroLift: 7.75,
  overlayOut: 7.975,
  heroBlow: 8.75,
  navIn: 9.0,
  bannersIn: 9.25,
  words: 9.5,
  done: 10.75,
} as const;

const ROW_D = 0.15;
const ROW_STAGGER = 0.075;
const LIST_ROWS = 16;
/* Normalising window for the list keyframes — must outlast the last row's
   fade-out at 5.125 + 16 * 0.075 + 0.15. */
const LIST_SPAN = 7;

const SHUFFLE_CYCLES = 20;
const SHUFFLE_MS = 150;
const PRELOAD_TIMEOUT_MS = 4000;
const PER_STRIP = 6;

type View = "reveal" | "sheet";

const frameNo = (i: number) => String(i + 1).padStart(2, "0");

const CLIENT_META: Record<string, { name: string; location: string }> = {
  "adrians-wasaga-beach": { name: "Adrian's Wasaga Beach", location: "Wasaga Beach, ON" },
  "big-bears": { name: "Big Bears Baked Potato", location: "Toronto, ON" },
  "canapy-furniture": { name: "Canapy Furniture", location: "Toronto, ON" },
  connectr: { name: "ConnecTR", location: "Vaughan, ON" },
  "destan-turkish-cuisine": { name: "Destan Turkish Cuisine", location: "Toronto, ON" },
};

/* The two columns that flank the loader. Real frames, real clients, real
   locations — hero-24 fills this space with its own project list. */
const ROWS = Array.from({ length: LIST_ROWS }, (_, i) => {
  const p = galleryPhotos[Math.floor((i * galleryPhotos.length) / LIST_ROWS)];
  const meta = CLIENT_META[p.client];
  return { slate: p.slate, client: meta.name, location: meta.location };
});

/* Two frames that fan out behind the hero at the end. Both read at small size
   and at 20 degrees; hero-24 likewise reuses frames already in the grid. */
const BANNERS = [galleryPhotos[42], galleryPhotos[27]];

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

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
  (_, s) =>
    galleryPhotos.slice(s * PER_STRIP, s * PER_STRIP + PER_STRIP).map((p, j) => ({
      photo: p,
      index: s * PER_STRIP + j,
    })),
);

/* One row's opacity/colour keyframes, staggered like the GSAP version: fade in
   at 2.5, brighten at 3.85, fade out at 5.125, each offset by 0.075 per row. */
function rowKeyframes(i: number) {
  const at = (t: number) => (t + i * ROW_STAGGER) / LIST_SPAN;
  return {
    times: [0, at(2.5), at(2.5 + ROW_D), at(3.85), at(3.85 + ROW_D), at(5.125), at(5.125 + ROW_D)],
    opacity: [0, 0, 1, 1, 1, 1, 0],
    color: [
      "rgba(255,255,235,0.34)",
      "rgba(255,255,235,0.34)",
      "rgba(255,255,235,0.34)",
      "rgba(255,255,235,0.34)",
      "rgba(255,255,235,0.95)",
      "rgba(255,255,235,0.95)",
      "rgba(255,255,235,0.95)",
    ],
  };
}

export default function GalleryPage() {
  const reduced = useReducedMotion();
  const [beat, setBeat] = useState(0);
  const [view, setView] = useState<View>("reveal");
  const [displayed, setDisplayed] = useState<readonly number[]>(SETTLED);
  const [open, setOpen] = useState<number | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const shuffleId = useRef<ReturnType<typeof setInterval> | null>(null);

  const tiles = useMemo(() => displayed.map((i) => galleryPhotos[i]), [displayed]);
  const hero = galleryPhotos[SETTLED[HERO_POS]];

  const clearAll = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (shuffleId.current) clearInterval(shuffleId.current);
    shuffleId.current = null;
  }, []);

  const skip = useCallback(() => {
    clearAll();
    setDisplayed(SETTLED);
    setBeat(99);
  }, [clearAll]);

  const step = useCallback((dir: number) => {
    setOpen((cur) =>
      cur === null ? cur : (cur + dir + galleryPhotos.length) % galleryPhotos.length,
    );
  }, []);

  /* Preload every thumb before the grid deals, then run the timeline. The
     overlay's first 2.5s exists to cover exactly this. */
  useEffect(() => {
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

    /* The hero swaps to its full-resolution file when it blows up, so that one
       has to be decoded too — without it the tile goes blank at the swap. */
    const pool = Promise.all([
      ...galleryPhotos.map((p) => decode(p.thumb)),
      decode(galleryPhotos[SETTLED[HERO_POS]].full),
    ]);
    const ceiling = new Promise<void>((r) => setTimeout(r, PRELOAD_TIMEOUT_MS));

    Promise.race([pool, ceiling]).then(() => {
      if (cancelled) return;
      setBeat(1);
      const at = (s: number, fn: () => void) => {
        timers.current.push(setTimeout(fn, s * 1000));
      };
      at(T.gridIn, () => setBeat(2));
      at(T.rotate, () => {
        setBeat(3);
        let cycle = 0;
        shuffleId.current = setInterval(() => {
          cycle += 1;
          if (cycle >= SHUFFLE_CYCLES) {
            if (shuffleId.current) clearInterval(shuffleId.current);
            setDisplayed(SETTLED);
            return;
          }
          setDisplayed((prev) => pickNine(cycle, prev));
        }, SHUFFLE_MS);
      });
      at(T.collapse, () => setBeat(4));
      at(T.heroLift, () => setBeat(5));
      at(T.heroBlow, () => setBeat(6));
      at(T.done, () => setBeat(99));
    });

    return () => {
      cancelled = true;
    };
  }, [reduced]);

  useEffect(() => clearAll, [clearAll]);

  /* Focus trap for the opened frame. */
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (open === null) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return setOpen(null);
      if (e.key === "ArrowRight") return step(1);
      if (e.key === "ArrowLeft") return step(-1);
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

  const r = Boolean(reduced);
  const started = r || beat >= 1;
  const revealed = r || beat >= 2;
  const collapsed = r || beat >= 4;
  const lifted = r || beat >= 5;
  const blown = r || beat >= 6;
  const done = r || beat >= 99;
  const openView = open === null ? null : { i: open, p: galleryPhotos[open] };
  const inSheet = view === "sheet";

  return (
    <main className="gl-page">
      <div className="gl-safelight" aria-hidden />
      <div className="gl-grain" aria-hidden />

      {/* ---------- overlay: black ground, loader, two lists ---------- */}
      {!r && !inSheet ? (
        <motion.div
          className="gl-overlay"
          aria-hidden
          initial={{ opacity: 1 }}
          animate={{ opacity: beat >= 5 ? 0 : 1 }}
          transition={{ duration: 0.5, ease: "linear" }}
          style={{ pointerEvents: "none" }}
        >
          <div className="gl-col gl-col-left">
            <div className="gl-col-head">
              <p>Frame</p>
              <p>Roll</p>
            </div>
            {ROWS.map((row, i) => (
              <motion.div
                className="gl-row"
                key={`l-${i}`}
                initial={{ opacity: 0 }}
                animate={started ? rowKeyframes(i + 1) : { opacity: 0 }}
                transition={{ duration: LIST_SPAN, ease: "linear" }}
              >
                <p>{row.slate}</p>
                <p>{row.client}</p>
              </motion.div>
            ))}
          </div>

          <div className="gl-loader">
            <motion.h1
              className="gl-logo"
              initial={{ backgroundPosition: "0% 100%" }}
              animate={started ? { backgroundPosition: "0% 0%" } : {}}
              transition={{ duration: 1, delay: 0.5, ease: "linear" }}
            >
              Frame
            </motion.h1>
            <motion.h1
              className="gl-logo"
              initial={{ backgroundPosition: "0% 100%" }}
              animate={started ? { backgroundPosition: "0% 0%" } : {}}
              transition={{ duration: 1, delay: T.logo2, ease: "linear" }}
            >
              Flow
            </motion.h1>
          </div>

          <div className="gl-col gl-col-right">
            <div className="gl-col-head">
              <p>Location</p>
            </div>
            {ROWS.map((row, i) => (
              <motion.div
                className="gl-row"
                key={`r-${i}`}
                initial={{ opacity: 0 }}
                animate={started ? rowKeyframes(i + 1) : { opacity: 0 }}
                transition={{ duration: LIST_SPAN, ease: "linear" }}
              >
                <p>{row.location}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : null}

      {/* ---------- the grid, which sits ON TOP of the overlay ---------- */}
      {!inSheet ? (
        <div className={`gl-grid${blown ? " blown" : ""}`}>
          {tiles.map((p, i) => {
            const isHero = i === HERO_POS;
            const clip = isHero
              ? blown
                ? CLIP_HERO
                : revealed
                  ? CLIP_SHOWN
                  : CLIP_HIDDEN
              : collapsed
                ? CLIP_HIDDEN
                : revealed
                  ? CLIP_SHOWN
                  : CLIP_HIDDEN;
            return (
              <motion.button
                key={isHero ? "hero" : `t-${i}`}
                type="button"
                className={`gl-tile${isHero ? " hero" : ""}`}
                onClick={() => done && setOpen(isHero ? SETTLED[HERO_POS] : displayed[i])}
                aria-label={`Open frame ${frameNo(displayed[i])}: ${p.slate}`}
                disabled={!done}
                initial={false}
                animate={{
                  clipPath: clip,
                  scale: isHero && blown ? 4 : 1,
                  y: isHero && lifted ? -50 : 0,
                }}
                transition={{
                  clipPath: {
                    duration: r ? 0 : 1,
                    delay: r ? 0 : revealed && !collapsed ? i * 0.05 : 0,
                    ease: HOP,
                  },
                  scale: { duration: r ? 0 : 1.5, ease: HOP },
                  y: { duration: r ? 0 : 1, ease: HOP },
                }}
              >
                <motion.img
                  src={isHero && blown ? hero.full : p.thumb}
                  alt={p.alt}
                  width={p.w}
                  height={p.h}
                  initial={false}
                  animate={{ scale: isHero ? (blown ? 1 : 2) : 1 }}
                  transition={{ duration: r ? 0 : 1.5, ease: HOP }}
                />
              </motion.button>
            );
          })}
        </div>
      ) : null}

      {/* ---------- the two frames that fan out behind the hero ---------- */}
      {!inSheet
        ? BANNERS.map((b, i) => (
            <motion.div
              className="gl-banner"
              key={b.src}
              aria-hidden
              initial={{ scale: 0, left: "50%", rotate: 0 }}
              animate={
                blown
                  ? { scale: 1, left: i === 0 ? "40%" : "60%", rotate: i === 0 ? -20 : 20 }
                  : { scale: 0, left: "50%", rotate: 0 }
              }
              transition={{
                scale: { duration: r ? 0 : 0.5, delay: r ? 0 : 0.5, ease: "easeOut" },
                left: { duration: r ? 0 : 1.5, delay: r ? 0 : 0.5, ease: HOP },
                rotate: { duration: r ? 0 : 1.5, delay: r ? 0 : 0.5, ease: HOP },
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.thumb} alt="" width={b.w} height={b.h} />
            </motion.div>
          ))
        : null}

      {/* ---------- nav: drops in like hero-24's ---------- */}
      <motion.div
        className="gl-nav"
        initial={{ y: "-125%" }}
        animate={{ y: r || inSheet || beat >= 6 ? "0%" : "-125%" }}
        transition={{ duration: r ? 0 : 1, delay: r || inSheet ? 0 : 0.25, ease: HOP }}
      >
        <Link href="/" className="gl-back">
          FrameFlow <span aria-hidden>←</span> back
        </Link>
        {done || inSheet ? (
          <button type="button" className="gl-sheet-toggle" onClick={() => setView(inSheet ? "reveal" : "sheet")}>
            {inSheet ? "← Selects" : `◎ Contact sheet — all ${galleryPhotos.length} frames`}
          </button>
        ) : (
          <span />
        )}
      </motion.div>

      {/* ---------- intro copy + title ---------- */}
      {!inSheet ? (
        <>
          <div className="gl-intro">
            {["FrameFlow — Photography", "2024 — 2026"].map((line, i) => (
              <h3 key={line}>
                <span className="gl-line">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: done ? "0%" : "110%" }}
                    transition={{ duration: r ? 0 : 1, delay: r ? 0 : i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {line}
                  </motion.span>
                </span>
              </h3>
            ))}
          </div>

          <div className="gl-title">
            <h2>
              {"Five rolls. Seventy-six frames.".split(" ").map((word, i) => (
                <span className="gl-line" key={`${word}-${i}`}>
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: done ? "0%" : "110%" }}
                    transition={{ duration: r ? 0 : 1, delay: r ? 0 : i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h2>
          </div>
        </>
      ) : null}

      {!done && !inSheet ? (
        <button type="button" className="gl-skip" onClick={skip}>
          skip
        </button>
      ) : null}

      {/* ---------- contact sheet ---------- */}
      {inSheet ? (
        <div className="gl-sheet-scroll">
          <p className="gl-sheet-meta">
            Contact sheet · {galleryPhotos.length} frames · five rolls
          </p>
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
                  {/* Printed on the film edge, the way a proof sheet numbers its
                      frames — over the image it washes out on bright ones. */}
                  <span className="gl-edge" aria-hidden>
                    {frameNo(index)}
                    {SELECTED.has(index) ? <i>◎</i> : null}
                  </span>
                </div>
              ))}
            </div>
          ))}
          <p className="gl-sheet-foot">◎ marks the nine the grid dealt · click any frame to enlarge</p>
        </div>
      ) : null}

      {/* ---------- open frame ---------- */}
      {openView ? (
        <motion.div
          className="gl-open"
          role="dialog"
          aria-modal="true"
          aria-label={openView.p.slate}
          initial={{ opacity: r ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: r ? 0 : 0.4 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(null);
          }}
        >
          <div className="gl-open-panel" ref={panelRef}>
            <figure className="gl-open-figure">
              <motion.div
                key={openView.i}
                className="gl-open-frame"
                initial={r ? false : { scale: 0.42, clipPath: CLIP_HERO }}
                animate={{ scale: 1, clipPath: CLIP_SHOWN }}
                transition={{ duration: r ? 0 : 1.5, ease: HOP }}
                /* Three caps at once: natural width (16 originals are 700-900px
                   and turn to mush stretched), 92vw, and 74vh x aspect so a tall
                   portrait fits by height instead of being cropped. */
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
                  initial={r ? false : { scale: 2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: r ? 0 : 1.5, ease: HOP }}
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
        /* A darkroom rather than a void: warm near-black film base, an amber
           safelight bleeding in from one corner, grain over everything. */
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

        /* The overlay is BELOW the grid, exactly as hero-24 orders them — the
           grid reveals and shuffles against black, and only then does the
           overlay drop to expose the page. */
        .gl-overlay {
          position: fixed;
          inset: 0;
          z-index: 4;
          background: #080706;
          display: flex;
          gap: 2em;
          padding: 2em;
          overflow: hidden;
        }
        .gl-col,
        .gl-loader {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0.85em;
        }
        .gl-loader {
          align-items: center;
          gap: 0;
        }
        .gl-logo {
          margin: 0;
          text-align: center;
          font-family: var(--font-editorial);
          font-weight: 300;
          font-size: clamp(30px, 3.4vw, 52px);
          line-height: 0.92;
          letter-spacing: -0.02em;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
          background-image: linear-gradient(0deg, #4a3a24, #4a3a24 50%, #ffffeb 0);
          background-size: 100% 200%;
        }
        .gl-col-head,
        .gl-row {
          display: flex;
          gap: 2em;
          font-family: var(--font-mono);
          font-size: 9.5px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .gl-col-head {
          color: var(--gl-safe);
          opacity: 0.9;
        }
        .gl-col-head p,
        .gl-row p {
          margin: 0;
        }
        .gl-col-left .gl-col-head > *,
        .gl-col-left .gl-row > * {
          flex: 1;
        }
        .gl-col-right {
          align-items: center;
        }
        .gl-col-right .gl-col-head,
        .gl-col-right .gl-row {
          width: 62%;
        }

        /* Above the overlay — this is the ordering that makes the reveal read
           against black instead of against the page. */
        .gl-grid {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: min(30vw, 430px);
          aspect-ratio: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(3, 1fr);
          gap: 1em;
          z-index: 6;
        }
        .gl-tile {
          position: relative;
          padding: 0;
          border: 0;
          background: rgba(255, 255, 235, 0.05);
          cursor: pointer;
          overflow: hidden;
          aspect-ratio: 1;
          clip-path: ${CLIP_HIDDEN};
        }
        .gl-tile[disabled] {
          cursor: default;
        }
        .gl-tile.hero {
          z-index: 3;
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

        .gl-banner {
          position: fixed;
          top: 45%;
          left: 50%;
          width: 20%;
          max-width: 260px;
          aspect-ratio: 4 / 5;
          translate: -50% -50%;
          z-index: 5;
          pointer-events: none;
          overflow: hidden;
        }
        .gl-banner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .gl-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 20;
          padding: 18px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
        }
        .gl-back {
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 235, 0.78);
          text-decoration: none;
          transition: color 200ms ease;
        }
        .gl-back:hover {
          color: var(--gl-safe);
        }
        .gl-sheet-toggle {
          background: none;
          border: 1px solid rgba(211, 143, 44, 0.4);
          color: rgba(255, 255, 235, 0.9);
          padding: 8px 16px;
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

        .gl-intro {
          position: fixed;
          top: 45%;
          left: 0;
          right: 0;
          translate: 0 -50%;
          padding: 0 clamp(24px, 7vw, 120px);
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 7;
          pointer-events: none;
        }
        .gl-intro h3 {
          margin: 0;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--gl-safe);
        }
        .gl-title {
          position: fixed;
          bottom: 8%;
          left: 0;
          right: 0;
          text-align: center;
          z-index: 7;
          pointer-events: none;
          padding: 0 24px;
        }
        .gl-title h2 {
          margin: 0;
          font-family: var(--font-editorial);
          font-weight: 300;
          font-size: clamp(24px, 3.2vw, 44px);
          line-height: 1;
          letter-spacing: -0.02em;
          color: var(--gl-ink);
        }
        .gl-line {
          display: inline-block;
          overflow: hidden;
          vertical-align: bottom;
          padding-bottom: 0.14em;
          margin-bottom: -0.14em;
        }
        .gl-line > span {
          display: inline-block;
          will-change: transform;
        }
        .gl-title .gl-line {
          margin-right: 0.22em;
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
        }
        .gl-skip:hover {
          border-color: rgba(255, 255, 235, 0.7);
          color: var(--gl-ink);
        }

        /* ---- contact sheet ---- */
        .gl-sheet-scroll {
          position: fixed;
          inset: 0;
          overflow-y: auto;
          z-index: 8;
          padding: 78px 22px 80px;
          background: var(--gl-base);
          scrollbar-width: thin;
        }
        .gl-sheet-meta {
          max-width: 1180px;
          margin: 0 auto 20px;
          font-family: var(--font-mono);
          font-size: 9.5px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 235, 0.62);
        }
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
          opacity: 0.88;
          transition: opacity 200ms ease;
        }
        .gl-frame:hover img {
          opacity: 1;
        }
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
          color: rgba(255, 255, 235, 0.62);
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
        /* No max-height here — the width formula already accounts for viewport
           height, and a max-height would crop rather than fit. */
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
          color: rgba(255, 255, 235, 0.62);
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
          color: rgba(255, 255, 235, 0.72);
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
        @media (max-width: 940px) {
          .gl-grid {
            width: min(68vw, 420px);
          }
          .gl-col,
          .gl-intro {
            display: none;
          }
          .gl-loader {
            flex: 1;
          }
          .gl-banner {
            width: 30%;
          }
        }
        @media (max-width: 640px) {
          .gl-strip {
            grid-template-columns: repeat(3, 1fr);
          }
          .gl-sheet-scroll {
            padding: 70px 14px 70px;
          }
          .gl-grid {
            width: 78vw;
            gap: 0.5em;
          }
          .gl-nav {
            padding: 14px 16px;
            gap: 10px;
          }
          .gl-sheet-toggle {
            padding: 7px 10px;
            letter-spacing: 0.16em;
          }
        }
      `}</style>
    </main>
  );
}
