"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { serviceFolders, TRACKS, type ServiceFolder } from "@/data/serviceFolders";

/* The services page as the studio's own edit timeline.
 *
 * The metaphor carries real data rather than decorating it: a clip's LENGTH is
 * the number of client engagements that service has actually run, so the
 * Content track is visibly the longest because that is genuinely where most of
 * the work is. The ruler is that same scale. Note that engagements overlap —
 * one client can appear on several tracks — so the lengths describe workload
 * per service rather than a headcount of the roster.
 *
 * The sequence plays itself: the playhead travels the length of the clip it is
 * on and the next scene loads at the out point, with dwell proportional to clip
 * length so long clips genuinely take longer to play through. */

export type Service = {
  id: number;
  name: string;
  category: string;
  subtitle: string;
  scene: string;
  tagline: string;
  description: string;
  features: readonly string[];
};

const MS_PER_UNIT = 420;
const DWELL_MIN = 2600;

export function CuttingRoom({ services }: { services: readonly Service[] }) {
  const byId = useCallback(
    (id: number): ServiceFolder | undefined => serviceFolders.find((f) => f.id === id),
    [],
  );

  /* The scale is the longest track, so lanes are directly comparable. */
  const scale = TRACKS.reduce((max, _t, i) => {
    const total = serviceFolders
      .filter((f) => f.track === i)
      .reduce((n, f) => n + f.clients, 0);
    return Math.max(max, total);
  }, 1);

  const order = serviceFolders.map((f) => f.id);
  const [current, setCurrent] = useState(5);
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [playing, setPlaying] = useState(!reduced);

  const headRef = useRef<HTMLDivElement | null>(null);
  const laneRefs = useRef<Record<number, HTMLElement | null>>({});
  const clipRefs = useRef<Record<number, HTMLElement | null>>({});
  const roomRef = useRef<HTMLDivElement | null>(null);

  const dwell = useCallback(
    (id: number) => Math.max(DWELL_MIN, (byId(id)?.clients ?? 1) * MS_PER_UNIT),
    [byId],
  );

  /* Position and, when playing, run the head across the clip. */
  const placeHead = useCallback(
    (id: number, animate: boolean) => {
      const head = headRef.current;
      const clip = clipRefs.current[id];
      const lane = laneRefs.current[byId(id)?.track ?? 0];
      if (!head || !clip || !lane) return;
      const from = lane.offsetLeft + clip.offsetLeft;
      head.style.transition = "none";
      head.style.transform = `translateX(${from}px)`;
      void head.offsetWidth; // commit the jump before easing away from it
      if (animate) {
        head.style.transition = `transform ${dwell(id)}ms linear`;
        head.style.transform = `translateX(${from + clip.offsetWidth}px)`;
      }
    },
    [byId, dwell],
  );

  useEffect(() => {
    placeHead(current, playing);
  }, [current, playing, placeHead]);

  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => {
      setCurrent((c) => order[(order.indexOf(c) + 1) % order.length]);
    }, dwell(current));
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, current, dwell]);

  /* Nothing should cycle behind a visitor who has scrolled on to read. */
  useEffect(() => {
    const el = roomRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) setPlaying(false);
      },
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (document.activeElement?.tagName ?? "").toUpperCase();
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(tag)) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setPlaying(false);
        setCurrent((c) => order[(order.indexOf(c) + 1) % order.length]);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setPlaying(false);
        setCurrent((c) => order[(order.indexOf(c) - 1 + order.length) % order.length]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const service = services.find((s) => s.id === current);
  const folder = byId(current);
  const frames = folder?.frames ?? [];

  const pick = (id: number) => {
    setPlaying(false);
    setCurrent(id);
  };

  return (
    <div className="cr" ref={roomRef}>
      <div className="cr-monitor">
        <div className={`cr-well${frames.length === 1 ? " cr-well-single" : ""}`} key={current}>
          {frames.map((f) => (
            <figure
              className="cr-plate"
              key={f.src}
              data-fit={f.src.includes("/logo/") || f.src.includes("/brand/") ? "contain" : "cover"}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.src} alt={f.alt} loading="lazy" decoding="async" />
              <figcaption>{f.client}</figcaption>
            </figure>
          ))}
        </div>

        <div className="cr-inspector" key={`i-${current}`}>
          <p className="cr-scene">
            Scene {String(current).padStart(2, "0")} <i>·</i> {service?.category} <i>·</i>{" "}
            {service?.scene}
          </p>
          <h2 className="cr-name">{service?.name}</h2>
          <p className="cr-tagline">{service?.tagline}</p>
          <p className="cr-desc">{service?.description}</p>
          <ul className="cr-feat">
            {service?.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <p className="cr-meta">
            <span>
              <b>{folder?.clients}</b> engagements
            </span>
            <span>
              <b>{frames.length}</b> frame{frames.length === 1 ? "" : "s"} on file
            </span>
            <span>{service?.subtitle}</span>
          </p>
        </div>
      </div>

      <div className="cr-timeline">
        <p className="cr-tl-head">
          <b>Timeline</b>
          <span>Clip length = client engagements run</span>
        </p>

        <div className="cr-ruler" aria-hidden>
          {Array.from({ length: Math.floor(scale / 4) + 1 }, (_, i) => (
            <span key={i} style={{ left: `${((i * 4) / scale) * 100}%` }}>
              {i * 4}
            </span>
          ))}
        </div>

        <div className="cr-tracks">
          {TRACKS.map((tr, ti) => {
            let cursor = 0;
            return (
              <div className="cr-track" key={tr.code}>
                <p className="cr-tname" aria-hidden>
                  <em>{tr.code}</em> {tr.name}
                </p>
                <div
                  className="cr-lane"
                  ref={(el) => {
                    laneRefs.current[ti] = el;
                  }}
                >
                  {serviceFolders
                    .filter((f) => f.track === ti)
                    .map((f) => {
                      const s = services.find((x) => x.id === f.id);
                      const left = (cursor / scale) * 100;
                      cursor += f.clients;
                      return (
                        <button
                          type="button"
                          key={f.id}
                          className="cr-clip"
                          aria-current={f.id === current}
                          aria-label={`${s?.name} — ${f.clients} client engagements`}
                          style={{ left: `${left}%`, width: `${(f.clients / scale) * 100}%` }}
                          ref={(el) => {
                            clipRefs.current[f.id] = el;
                          }}
                          onClick={() => pick(f.id)}
                        >
                          {f.frames[0] ? (
                            <span
                              className="cr-clip-bg"
                              style={{ backgroundImage: `url("${f.frames[0].src}")` }}
                            />
                          ) : null}
                          <span className="cr-clip-n">{String(f.id).padStart(2, "0")}</span>
                          <span className="cr-clip-lbl">{s?.name}</span>
                        </button>
                      );
                    })}
                </div>
              </div>
            );
          })}
          <div className="cr-head" ref={headRef} aria-hidden />
        </div>

        <div className="cr-foot">
          <span className="cr-transport">
            <button
              type="button"
              aria-label="Previous scene"
              onClick={() => {
                setPlaying(false);
                setCurrent(order[(order.indexOf(current) - 1 + order.length) % order.length]);
              }}
            >
              ◀
            </button>
            <button
              type="button"
              aria-label={playing ? "Pause" : "Play"}
              aria-pressed={playing}
              onClick={() => setPlaying((p) => !p)}
            >
              {playing ? "❚❚" : "▶"}
            </button>
            <button
              type="button"
              aria-label="Next scene"
              onClick={() => {
                setPlaying(false);
                setCurrent(order[(order.indexOf(current) + 1) % order.length]);
              }}
            >
              ▶
            </button>
          </span>
          <span className="cr-keys">
            <i>←</i> <i>→</i> step scenes
          </span>
        </div>
      </div>

      <p className="cr-cue">
        Prefer to just read? <a href="#all-scenes">Every scene, in full ↓</a>
      </p>

      <style jsx global>{`
        .cr {
          display: flex;
          flex-direction: column;
          min-height: 100svh;
          background: var(--surface);
          color: var(--on-surface);
        }
        /* The room fills what the wrapper has left under the navbar offset and
           the slate strip. Pinning it to 100svh itself pushed the transport
           past the fold by exactly their combined height. */
        @media (min-width: 1024px) {
          .cr {
            flex: 1 1 auto;
            min-height: 0;
          }
        }

        /* ---- program monitor ---- */
        .cr-monitor {
          flex: 1 1 auto;
          min-height: 0;
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
          gap: clamp(18px, 3vw, 52px);
          padding: clamp(18px, 2.6vh, 34px) clamp(16px, 3vw, 40px);
          overflow: hidden;
        }
        /* minmax(0,1fr) on both axes, or the images resolve at natural size and
           the well grows straight through the timeline below it. */
        .cr-well {
          position: relative;
          min-width: 0;
          min-height: 0;
          height: 100%;
          display: grid;
          grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
          grid-template-rows: minmax(0, 1fr) minmax(0, 1fr);
          gap: 8px;
        }
        .cr-well-single {
          grid-template-columns: minmax(0, 1fr);
          grid-template-rows: minmax(0, 1fr);
        }
        .cr-plate {
          position: relative;
          overflow: hidden;
          min-width: 0;
          min-height: 0;
          margin: 0;
          border: 1px solid var(--border-subtle);
          border-radius: 2px;
          background: color-mix(in srgb, var(--on-surface) 7%, var(--surface));
        }
        .cr-plate:first-child {
          grid-row: 1 / span 2;
        }
        .cr-well-single .cr-plate:first-child {
          grid-row: auto;
        }
        .cr-plate img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          animation: cr-in 620ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }
        @keyframes cr-in {
          from {
            opacity: 0;
            transform: scale(1.04);
          }
        }
        .cr-plate[data-fit="contain"] {
          background: var(--color-ivory);
        }
        .cr-plate[data-fit="contain"] img {
          object-fit: contain;
          object-position: center;
          padding: 8%;
        }
        .cr-plate figcaption {
          position: absolute;
          left: 0;
          bottom: 0;
          padding: 5px 9px;
          /* Opaque, not 86%. These captions sit on ivory contain-plates as
             well as dark photographs, and a translucent ground let the ivory
             beneath them collapse the contrast in dark theme. */
          background: var(--surface);
          font-family: var(--font-mono);
          font-size: 8px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--quiet-ink);
        }

        .cr-inspector {
          min-width: 0;
          min-height: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          animation: cr-rise 460ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }
        @keyframes cr-rise {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
        }
        .cr-scene {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0 0 14px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--accent-ink);
        }
        .cr-scene::before {
          content: "";
          flex: none;
          width: 26px;
          height: 1px;
          background: currentColor;
        }
        .cr-scene i {
          font-style: normal;
          color: var(--quiet-ink);
        }
        .cr-name {
          margin: 0;
          font-family: var(--font-editorial);
          font-weight: 300;
          font-size: clamp(34px, 4.4vw, 68px);
          line-height: 0.98;
          letter-spacing: -0.035em;
        }
        .cr-tagline {
          margin: 12px 0 0;
          font-family: var(--font-editorial);
          font-style: italic;
          font-weight: 300;
          font-size: clamp(15px, 1.5vw, 23px);
          line-height: 1.25;
          color: var(--accent-ink);
        }
        .cr-desc {
          margin: 16px 0 0;
          max-width: 52ch;
          font-family: var(--font-warm);
          font-size: clamp(13px, 0.95vw, 15px);
          font-weight: 300;
          line-height: 1.8;
          color: var(--quiet-ink);
        }
        .cr-feat {
          list-style: none;
          margin: 22px 0 0;
          padding: 0;
          display: grid;
          gap: 9px;
        }
        .cr-feat li {
          display: flex;
          gap: 12px;
          font-family: var(--font-warm);
          font-size: 13.5px;
          line-height: 1.55;
        }
        .cr-feat li::before {
          content: "";
          flex: none;
          margin-top: 0.62em;
          width: 14px;
          height: 1px;
          background: var(--accent-ink);
        }
        .cr-meta {
          margin: 24px 0 0;
          display: flex;
          flex-wrap: wrap;
          gap: 8px 26px;
          font-family: var(--font-mono);
          font-size: 9.5px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--quiet-ink);
        }
        .cr-meta b {
          color: var(--on-surface);
          font-weight: 500;
        }

        /* ---- timeline ---- */
        .cr-timeline {
          --cr-gutter: 118px;
          position: relative;
          z-index: 2;
          flex: none;
          border-top: 1px solid var(--border-subtle);
          background: color-mix(in srgb, var(--on-surface) 5%, var(--surface));
          padding: 0 clamp(16px, 3vw, 40px) clamp(12px, 2vh, 20px);
        }
        .cr-tl-head {
          display: flex;
          align-items: baseline;
          gap: 14px;
          margin: 0;
          padding: 12px 0 8px;
          font-family: var(--font-mono);
          font-size: 9.5px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--quiet-ink);
        }
        .cr-tl-head b {
          color: var(--on-surface);
          font-weight: 500;
        }
        .cr-ruler {
          position: relative;
          height: 26px;
          margin-left: var(--cr-gutter);
          border-bottom: 1px solid var(--border-subtle);
        }
        .cr-ruler span {
          position: absolute;
          top: 8px;
          transform: translateX(-50%);
          font-family: var(--font-mono);
          font-size: 8.5px;
          letter-spacing: 0.14em;
          color: var(--quiet-ink);
        }
        .cr-ruler span::after {
          content: "";
          position: absolute;
          left: 50%;
          top: -8px;
          width: 1px;
          height: 6px;
          background: var(--border-subtle);
        }

        .cr-tracks {
          position: relative;
          display: grid;
          gap: 5px;
        }
        .cr-track {
          display: grid;
          grid-template-columns: var(--cr-gutter) 1fr;
          align-items: center;
        }
        .cr-tname {
          margin: 0;
          padding-right: 12px;
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--quiet-ink);
        }
        .cr-tname em {
          font-style: normal;
          font-weight: 600;
          color: var(--accent-ink);
        }
        .cr-lane {
          position: relative;
          height: 36px;
          border-left: 1px solid var(--border-subtle);
          background: linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px) 0 0 /
            calc(100% / 26) 100%;
        }

        .cr-clip {
          position: absolute;
          top: 0;
          height: 100%;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 0 10px;
          overflow: hidden;
          border: 1px solid var(--border-subtle);
          border-radius: 2px;
          background: color-mix(in srgb, var(--on-surface) 10%, var(--surface));
          color: inherit;
          font: inherit;
          text-align: left;
          cursor: pointer;
          transition: transform 300ms cubic-bezier(0.2, 0.8, 0.2, 1), background 300ms ease,
            border-color 300ms ease;
        }
        /* An NLE draws a clip's thumbnail as a repeating filmstrip; cover on a
           36px bar just magnifies one frame into noise. */
        .cr-clip-bg {
          position: absolute;
          inset: 0;
          opacity: 0.26;
          filter: grayscale(0.7) contrast(0.9);
          background-size: auto 100%;
          background-repeat: repeat-x;
          background-position: left center;
          pointer-events: none;
        }
        .cr-clip-n {
          position: relative;
          flex: none;
          font-family: var(--font-mono);
          font-size: 8.5px;
          color: var(--accent-ink);
        }
        .cr-clip-lbl {
          position: relative;
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-shadow: 0 1px 3px color-mix(in srgb, var(--surface) 70%, transparent);
        }
        .cr-clip:hover,
        .cr-clip:focus-visible {
          background: color-mix(in srgb, var(--color-amber) 24%, var(--surface));
          border-color: var(--accent-ink);
          outline: none;
          transform: translateY(-2px);
        }
        .cr-clip[aria-current="true"] {
          background: var(--color-amber);
          border-color: var(--color-amber);
        }
        .cr-clip[aria-current="true"] .cr-clip-bg {
          opacity: 0.14;
          filter: grayscale(1);
        }
        .cr-clip[aria-current="true"] .cr-clip-lbl {
          color: var(--color-graphite);
          font-weight: 600;
          text-shadow: none;
        }
        .cr-clip[aria-current="true"] .cr-clip-n {
          color: color-mix(in srgb, var(--color-graphite) 70%, var(--color-amber));
        }

        .cr-head {
          position: absolute;
          top: -26px;
          bottom: 0;
          left: var(--cr-gutter);
          width: 1px;
          background: var(--color-ember);
          pointer-events: none;
          z-index: 4;
        }
        .cr-head::before {
          content: "";
          position: absolute;
          top: 0;
          left: -5px;
          height: 0;
          border: 5px solid transparent;
          border-top-color: var(--color-ember);
          border-bottom: 0;
        }

        .cr-foot {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px 20px;
          padding-top: 12px;
          font-family: var(--font-mono);
          font-size: 8.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--quiet-ink);
        }
        .cr-transport {
          display: flex;
          gap: 6px;
        }
        .cr-transport button {
          width: 28px;
          height: 22px;
          border: 1px solid var(--border-subtle);
          border-radius: 1px;
          background: none;
          color: var(--quiet-ink);
          font-size: 10px;
          line-height: 1;
          cursor: pointer;
          transition: background 200ms ease, color 200ms ease, border-color 200ms ease;
        }
        .cr-transport button:hover {
          background: var(--color-amber);
          border-color: var(--color-amber);
          color: var(--color-graphite);
        }
        .cr-transport button[aria-pressed="true"] {
          background: var(--color-ember);
          border-color: var(--color-ember);
          color: var(--color-ivory);
        }
        .cr-keys i {
          font-style: normal;
          border: 1px solid var(--border-subtle);
          border-radius: 1px;
          padding: 2px 5px;
        }
        .cr-cue {
          margin: 0;
          padding: 0 clamp(16px, 3vw, 40px) 16px;
          background: color-mix(in srgb, var(--on-surface) 5%, var(--surface));
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--quiet-ink);
        }
        .cr-cue a {
          color: var(--accent-ink);
          text-decoration: none;
          border-bottom: 1px solid currentColor;
          padding-bottom: 2px;
        }

        /* Once the monitor stacks, its auto rows get compressed below their
           content by the pinned height and the copy lands on the images. */
        @media (max-width: 1020px) {
          .cr {
            min-height: 0;
          }
          .cr-monitor {
            grid-template-columns: minmax(0, 1fr);
            gap: 20px;
            padding-bottom: 24px;
            overflow: visible;
          }
          .cr-inspector {
            overflow: visible;
          }
          .cr-well {
            height: auto;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            grid-template-rows: 130px 130px;
          }
          .cr-well-single {
            grid-template-rows: 190px;
          }
          .cr-plate:first-child {
            grid-row: auto;
            grid-column: 1 / span 2;
          }
          .cr-well-single .cr-plate:first-child {
            grid-column: auto;
          }
        }
        @media (max-width: 720px) {
          .cr-timeline {
            --cr-gutter: 0px;
          }
          .cr-tname {
            display: none;
          }
          .cr-track {
            grid-template-columns: 1fr;
          }
          .cr-ruler {
            margin-left: 0;
          }
          .cr-well {
            grid-template-rows: 118px 118px;
          }
          .cr-plate img {
            object-position: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cr-plate img,
          .cr-inspector {
            animation: none;
          }
          .cr-clip,
          .cr-head {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
