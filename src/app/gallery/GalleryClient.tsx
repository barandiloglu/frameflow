"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { galleryPhotos, type Category, type GalleryPhoto } from "@/data/gallery";

/* ------------------------------------------------------------------ */
/*  The gallery is filtered by subject, and nothing is cropped.         */
/*                                                                      */
/*  Grouping is by what the photograph is OF, not who paid for it — the */
/*  gallery takes personal work too, and a client name means nothing on */
/*  a picture shot on a day off.                                        */
/*                                                                      */
/*  Rows are justified: each frame keeps its own proportions and the    */
/*  row scales to fill the width, so portrait and landscape sit side by */
/*  side, every row lines up top and bottom, and the whole picture is   */
/*  visible without opening it.                                         */
/* ------------------------------------------------------------------ */

/* CustomEase("hop", "0.9, 0, 0.1, 1") verbatim. A hard hold at both ends with
   a fast middle — this is why the open reads mechanical rather than soft. */
const HOP = [0.9, 0, 0.1, 1] as const;

const CLIP_SHOWN = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
/* The open frame's starting inset — hero-24's own 60% x 80% crop. */
const CLIP_OPEN_FROM = "polygon(20% 10%, 80% 10%, 80% 90%, 20% 90%)";

/* Section order, and the order of the filter rail. Add a category here and to
   the union in data/gallery.ts; one with no photographs simply does not show. */
const CATEGORIES: { id: Category; label: string }[] = [
  { id: "food", label: "Food" },
  { id: "real-estate", label: "Real estate" },
  { id: "product", label: "Product" },
  { id: "travel", label: "Travel" },
  { id: "events", label: "Events" },
  { id: "wildlife", label: "Wildlife" },
];

type Filter = Category | "all";

type Frame = { photo: GalleryPhoto; no: number };

type Group = {
  id: Category;
  label: string;
  /* Sets how tall a row settles. A group of landscapes wants shorter rows than
     a group of portraits, or three pictures would fill the whole width. */
  landscape: boolean;
  frames: Frame[];
};

/* Built once at module scope, so server and client agree. Frame numbers run in
   reading order across the whole page rather than restarting per group, which
   keeps them in step with the counter in the opened frame. */
const GROUPS: Group[] = (() => {
  let running = 0;
  return CATEGORIES.map(({ id, label }) => {
    const frames = galleryPhotos
      .filter((photo) => photo.category === id)
      .map((photo) => ({ photo, no: running++ }));
    const wide = frames.filter((f) => f.photo.w > f.photo.h).length;
    return { id, label, landscape: wide * 2 > frames.length, frames };
  }).filter((group) => group.frames.length > 0);
})();

/* Reading order, which is what the arrow keys step through. */
const ORDERED: GalleryPhoto[] = GROUPS.flatMap((g) => g.frames.map((f) => f.photo));

const frameNo = (i: number) => String(i + 1).padStart(2, "0");

/* mid shares the thumb's basename, one directory over. Carrying it on every
   record would have meant rewriting all 292 rows for a path we can derive. */
const midOf = (thumb: string) => thumb.replace("/gallery/thumb/", "/gallery/mid/");

/* A landscape frame is laid out far wider than a portrait one, so it needs the
   bigger step of the srcset sooner. Telling the browser roughly how wide each
   will render is what stops it serving a 400px file into a 700px slot. */
const sizesFor = (photo: GalleryPhoto) =>
  photo.w > photo.h
    ? "(max-width: 640px) 48vw, (max-width: 1100px) 34vw, 440px"
    : "(max-width: 640px) 45vw, (max-width: 1100px) 26vw, 260px";

/* Arming happens before paint, so the server's markup stays visible for anyone
   without JS and nobody sees the frames flash in at full opacity before the
   reveal hides them again. */
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function GalleryPage() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<number | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () => (filter === "all" ? GROUPS : GROUPS.filter((g) => g.id === filter)),
    [filter],
  );

  /* State, not a ref: this is read while rendering the frame's `initial`, and
     refs may not be read during render. True only for a fresh open, so the
     push-in belongs to opening and stepping just cross-fades. */
  const [zoomOnOpen, setZoomOnOpen] = useState(true);

  const step = useCallback((dir: number) => {
    setZoomOnOpen(false);
    setOpen((cur) => (cur === null ? cur : (cur + dir + ORDERED.length) % ORDERED.length));
  }, []);

  /* Each group develops its frames in the first time it comes into view, and
     again whenever the filter changes — the grid is keyed on the filter, so it
     remounts and this effect re-arms. */
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useIsoLayoutEffect(() => {
    if (reduced) return;
    const root = scrollRef.current;
    if (!root) return;

    const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-group]"));
    if (!sections.length) return;

    /* Hiding the frames is the browser's job, not React's — 292 cells do not
       need a re-render to change one class. */
    sections.forEach((section) => section.classList.add("is-armed"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      },
      { root, rootMargin: "0px 0px -8% 0px", threshold: 0.02 },
    );

    sections.forEach((section) => io.observe(section));
    return () => {
      io.disconnect();
      sections.forEach((section) => section.classList.remove("is-armed", "is-in"));
    };
  }, [reduced, filter]);

  /* Changing the filter returns you to the top; otherwise a short category
     leaves you scrolled past the end of it, looking at nothing. */
  const pick = useCallback((next: Filter) => {
    setFilter(next);
    const root = scrollRef.current;
    if (root) root.scrollTop = 0;
  }, []);

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
      if (e.key === "Escape") {
        setZoomOnOpen(true);
        return setOpen(null);
      }
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
  const openView = open === null ? null : { i: open, p: ORDERED[open] };
  const total = visible.reduce((n, g) => n + g.frames.length, 0);

  return (
    <main className="gl-page">
      <div className="gl-safelight" aria-hidden />

      {/* ---------- fixed rail: the only chrome, and it never covers a frame ---------- */}
      <motion.div
        className="gl-rail"
        initial={{ y: "-110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: r ? 0 : 0.8, ease: HOP }}
      >
        <div className="gl-rail-inner">
          <Link href="/" className="gl-back">
            FrameFlow <span aria-hidden>←</span> back
          </Link>

          <nav className="gl-filter" aria-label="Filter by subject">
            {([{ id: "all", label: "All" }, ...CATEGORIES] as { id: Filter; label: string }[]).map(
              (c) => {
                const on = filter === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    className={`gl-chip${on ? " is-on" : ""}`}
                    aria-pressed={on}
                    onClick={() => pick(c.id)}
                  >
                    {/* One pill slides between the chips rather than each
                        fading its own background in and out. */}
                    {on ? (
                      <motion.span
                        layoutId="gl-chip-pill"
                        className="gl-chip-pill"
                        aria-hidden
                        transition={
                          r
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 420, damping: 36, mass: 0.7 }
                        }
                      />
                    ) : null}
                    <span className="gl-chip-text">{c.label}</span>
                  </button>
                );
              },
            )}
          </nav>

          <span className="gl-count" aria-live="polite">
            {total} frames
          </span>
        </div>
      </motion.div>

      <div className="gl-scroll" ref={scrollRef}>
        {/* Keyed on the filter so switching remounts the grid and the frames
            develop in again rather than snapping into place. */}
        <div className="gl-inner" key={filter}>
          <h1 className="gl-sr">Gallery</h1>

          {visible.map((group) => (
            <section
              key={group.id}
              id={group.id}
              data-group={group.id}
              className={`gl-group${group.landscape ? " is-landscape" : ""}`}
              aria-labelledby={`${group.id}-title`}
            >
              {/* When one subject is filtered the chip already names it, so the
                  heading only earns its place on the unfiltered view. It is
                  never sticky — a pinned bar sat on top of the photographs. */}
              <h2
                id={`${group.id}-title`}
                className={filter === "all" ? "gl-group-head" : "gl-sr"}
              >
                {group.label}
              </h2>

              <div className="gl-grid">
                {group.frames.map(({ photo, no }, i) => (
                  <button
                    key={photo.src}
                    type="button"
                    className="gl-cell"
                    style={
                      {
                        "--ar": (photo.w / photo.h).toFixed(4),
                        "--i": Math.min(i, 11),
                      } as React.CSSProperties
                    }
                    onClick={() => {
                      setZoomOnOpen(true);
                      setOpen(no);
                    }}
                    aria-label={`Open frame ${frameNo(no)}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.thumb}
                      srcSet={`${photo.thumb} 400w, ${midOf(photo.thumb)} 800w, ${photo.full} 1600w`}
                      sizes={sizesFor(photo)}
                      alt={photo.alt}
                      width={photo.w}
                      height={photo.h}
                      loading="lazy"
                      decoding="async"
                    />
                    {/* The safelight lifting off the print as it develops. */}
                    <span className="gl-develop" aria-hidden />
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* ---------- open frame ---------- */}
      {openView ? (
        <motion.div
          className="gl-open"
          role="dialog"
          aria-modal="true"
          aria-label={`Frame ${frameNo(openView.i)}`}
          initial={{ opacity: r ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: r ? 0 : 0.4 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setZoomOnOpen(true);
              setOpen(null);
            }
          }}
        >
          <div className="gl-open-panel" ref={panelRef}>
            <figure className="gl-open-figure">
              {/* Deliberately unkeyed. Keying this on the frame index remounted
                  it on every arrow press, so the whole 1.5s open — scale 0.42
                  and the clip reveal — replayed for each step. It mounts when
                  the lightbox opens and stays put; only the picture inside
                  changes as you move through the gallery. */}
              <motion.div
                className="gl-open-frame"
                initial={r ? false : { scale: 0.42, clipPath: CLIP_OPEN_FROM }}
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
                {/* Keyed, so stepping cross-fades the picture rather than
                    cutting to it. The scale-2 push-in belongs to the opening
                    only, so it is skipped once a frame is already on screen. */}
                <motion.img
                  key={openView.i}
                  src={openView.p.full}
                  alt={openView.p.alt}
                  width={openView.p.w}
                  height={openView.p.h}
                  initial={r ? false : zoomOnOpen ? { scale: 2 } : { opacity: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: r ? 0 : zoomOnOpen ? 1.5 : 0.3, ease: HOP }}
                />
              </motion.div>
            </figure>

            <div className="gl-open-nav">
              <button type="button" onClick={() => step(-1)} aria-label="Previous frame">
                ‹
              </button>
              <span>
                {frameNo(openView.i)} / {ORDERED.length}
              </span>
              <button type="button" onClick={() => step(1)} aria-label="Next frame">
                ›
              </button>
            </div>

            <button
              type="button"
              className="gl-open-x"
              ref={closeRef}
              onClick={() => {
                setZoomOnOpen(true);
                setOpen(null);
              }}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </motion.div>
      ) : null}

      <style jsx global>{`
        /* A darkroom rather than a void: warm near-black film base, an amber
           safelight bleeding in from one corner. The grain comes from the
           app-wide <GrainOverlay />; this page used to stack a second one. */
        .gl-page {
          --gl-base: #14100e;
          --gl-ink: #ffffeb;
          --gl-safe: #d38f2c;
          --gl-rail-h: 54px;
          position: fixed;
          inset: 0;
          background: var(--gl-base);
          color: var(--gl-ink);
          overflow: hidden;
          font-family: var(--font-mono);
        }
        /* The page scrolls inside .gl-scroll, so window.scrollY never moves and
           the global progress bar would sit at 0% forever. */
        #scroll-progress {
          display: none;
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
        .gl-sr {
          position: absolute;
          width: 1px;
          height: 1px;
          margin: -1px;
          padding: 0;
          overflow: hidden;
          clip-path: inset(50%);
          white-space: nowrap;
          border: 0;
        }

        /* ---- the rail ---- */
        .gl-rail {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 20;
          height: var(--gl-rail-h);
          background: var(--gl-base);
          border-bottom: 1px solid rgba(255, 255, 235, 0.1);
        }
        .gl-rail-inner {
          max-width: 1300px;
          height: 100%;
          margin: 0 auto;
          padding: 0 22px;
          display: flex;
          align-items: center;
          gap: 22px;
        }
        .gl-back {
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 235, 0.78);
          text-decoration: none;
          white-space: nowrap;
          transition: color 200ms ease;
        }
        .gl-back:hover {
          color: var(--gl-safe);
        }
        .gl-count {
          margin-left: auto;
          font-family: var(--font-mono);
          font-size: 9.5px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 235, 0.38);
          white-space: nowrap;
        }

        /* ---- the filter ---- */
        .gl-filter {
          display: flex;
          align-items: center;
          gap: 2px;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .gl-filter::-webkit-scrollbar {
          display: none;
        }
        .gl-chip {
          position: relative;
          flex: 0 0 auto;
          border: 0;
          background: none;
          cursor: pointer;
          padding: 7px 11px;
          font-family: var(--font-mono);
          font-size: 9.5px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255, 255, 235, 0.52);
          white-space: nowrap;
          transition: color 220ms ease;
        }
        .gl-chip:hover {
          color: rgba(255, 255, 235, 0.92);
        }
        .gl-chip.is-on {
          color: #14100e;
        }
        .gl-chip-pill {
          position: absolute;
          inset: 0;
          background: var(--gl-safe);
          z-index: 0;
        }
        .gl-chip-text {
          position: relative;
          z-index: 1;
        }
        .gl-chip:focus-visible {
          outline: 2px solid var(--gl-safe);
          outline-offset: 2px;
        }

        /* ---- scroller ---- */
        .gl-scroll {
          position: fixed;
          inset: 0;
          overflow-y: auto;
          z-index: 8;
          padding: calc(var(--gl-rail-h) + 30px) 22px 96px;
          background: transparent;
          scrollbar-width: thin;
        }
        .gl-inner {
          max-width: 1300px;
          margin: 0 auto;
        }

        /* ---- a subject group ---- */
        .gl-group {
          --target-h: 360px;
          --gap: 14px;
          margin-top: 52px;
        }
        .gl-group:first-of-type {
          margin-top: 0;
        }
        .gl-group.is-landscape {
          --target-h: 250px;
        }
        /* Static, not sticky. A pinned heading followed the scroll down the page
           and sat on top of the photographs. */
        .gl-group-head {
          margin: 0 0 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255, 255, 235, 0.14);
          font-family: var(--ff-display), sans-serif;
          font-weight: 700;
          font-size: clamp(19px, 2.1vw, 27px);
          letter-spacing: -0.012em;
          line-height: 1.15;
          color: var(--gl-ink);
        }

        /* ---- justified rows ---- */
        .gl-grid {
          display: flex;
          flex-wrap: wrap;
          gap: var(--gap);
        }
        /* A frame's width and its share of the leftover space are both
           proportional to its own aspect ratio, so every frame on a row ends up
           exactly the same height — without any of them being cropped. */
        .gl-cell {
          position: relative;
          padding: 0;
          border: 0;
          background: none;
          text-align: left;
          cursor: pointer;
          overflow: hidden;
          line-height: 0;
          flex-grow: var(--ar);
          flex-shrink: 1;
          flex-basis: calc(var(--ar) * var(--target-h));
          min-width: 0;
          /* A sparse row would otherwise stretch its few frames across the whole
             width and tower over the rows above it — a row of two portraits ran
             686px tall at 760px wide. The cap lets a row grow 60% past the
             target height and then leaves the slack at the end instead. */
          max-width: min(100%, calc(var(--ar) * var(--target-h) * 1.6));
        }
        /* Soaks up the slack on the final row, so a lone last frame keeps its
           size instead of stretching across the whole width. */
        .gl-grid::after {
          content: "";
          flex-grow: 999999;
          flex-basis: 0;
        }
        .gl-cell img {
          width: 100%;
          height: auto;
          aspect-ratio: var(--ar);
          display: block;
          background: rgba(255, 255, 235, 0.04);
          filter: brightness(0.92);
          transition: filter 300ms cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        .gl-cell:hover img,
        .gl-cell:focus-visible img {
          filter: brightness(1.04);
        }
        .gl-cell:focus-visible {
          outline: 2px solid var(--gl-safe);
          outline-offset: 3px;
        }

        /* ---- frames develop in ---- */
        .gl-develop {
          position: absolute;
          inset: 0;
          background: var(--gl-base);
          opacity: 0;
          pointer-events: none;
        }
        .gl-group.is-armed .gl-cell {
          opacity: 0;
        }
        .gl-group.is-armed.is-in .gl-cell {
          animation: gl-rise 640ms cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: calc(var(--i, 0) * 42ms);
        }
        /* The print coming up out of the bath: the base colour sits over the
           frame and clears a beat behind the frame's own entrance. */
        .gl-group.is-armed.is-in .gl-develop {
          animation: gl-clear 820ms cubic-bezier(0.33, 1, 0.68, 1) both;
          animation-delay: calc(var(--i, 0) * 42ms);
        }
        @keyframes gl-rise {
          from {
            opacity: 0;
            transform: translate3d(0, 14px, 0) scale(1.015);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        @keyframes gl-clear {
          from {
            opacity: 0.92;
          }
          to {
            opacity: 0;
          }
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
        .gl-back:focus-visible {
          outline: 2px solid var(--gl-safe);
          outline-offset: 3px;
        }
        .gl-open-x:focus:not(:focus-visible) {
          outline: none;
        }

        @media (max-width: 1100px) {
          .gl-group {
            --target-h: 300px;
          }
          .gl-group.is-landscape {
            --target-h: 205px;
          }
          .gl-count {
            display: none;
          }
        }
        @media (max-width: 640px) {
          .gl-page {
            --gl-rail-h: 88px;
          }
          /* The rail stacks on a phone: the link on top, the filter scrolling
             sideways beneath it. */
          .gl-rail-inner {
            flex-direction: column;
            align-items: stretch;
            justify-content: center;
            gap: 6px;
            padding: 0 14px;
          }
          .gl-filter {
            margin: 0 -14px;
            padding: 0 14px;
          }
          .gl-scroll {
            padding: calc(var(--gl-rail-h) + 20px) 14px 72px;
          }
          .gl-group {
            --target-h: 215px;
            --gap: 9px;
            margin-top: 38px;
          }
          .gl-group.is-landscape {
            --target-h: 115px;
          }
          .gl-open {
            padding: 20px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          /* Belt and braces: the effect already skips arming when reduced
             motion is set, but the hook resolves a tick after first paint. */
          .gl-group .gl-cell,
          .gl-group .gl-develop {
            opacity: 1;
            animation: none;
          }
          .gl-group .gl-develop {
            opacity: 0;
          }
        }
      `}</style>
    </main>
  );
}
