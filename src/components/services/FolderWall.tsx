"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { serviceFolders, FRAME_TILT, type ServiceFolder } from "@/data/serviceFolders";

/* Ported from awwwards hover-20 (Stacked Folder Tabs).
 *
 * The source drives everything through GSAP; this site runs framer-motion, so
 * the timing and feel are ported rather than the library. `back.out(1.7)` — the
 * overshoot on the lift and the fan — becomes cubic-bezier(0.34, 1.56, 0.64, 1),
 * the same curve. Durations (250ms) and the 25ms per-frame stagger are the
 * source's own numbers.
 *
 * Two things the source does not have and we add: a keyboard path (it is
 * mouseenter/mouseleave only) and a reduced-motion gate. */

export type Service = {
  id: number;
  name: string;
  category: string;
  subtitle: string;
  tagline: string;
  description: string;
  features: readonly string[];
};

const HOVER_MIN_WIDTH = 1000; // the source disables the fan below this too

export function FolderWall({ services }: { services: readonly Service[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [canFan, setCanFan] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(
      `(min-width: ${HOVER_MIN_WIDTH}px) and (hover: hover) and (prefers-reduced-motion: no-preference)`,
    );
    const sync = () => setCanFan(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const byId = useCallback(
    (id: number) => serviceFolders.find((f) => f.id === id),
    [],
  );

  return (
    <section className="fw-wall" aria-label="Services">
      <ul className="fw-grid">
        {services.map((service, i) => (
          <Folder
            key={service.id}
            service={service}
            folder={byId(service.id)}
            index={i}
            canFan={canFan}
            dimmed={active !== null && active !== service.id}
            active={active === service.id}
            isOpen={open === service.id}
            onActivate={setActive}
            onToggle={(id) => setOpen((p) => (p === id ? null : id))}
          />
        ))}
      </ul>

      <style jsx global>{`
        .fw-wall {
          /* Same page-scoped pair as /contact: --color-amber is 2.68:1 on the
             ivory surface, so light theme takes a darker burnt amber, and the
             muted ink is mixed toward the surface rather than made translucent
             so it clears 4.5:1 in both themes. */
          --fw-accent: var(--accent-ink);
          --fw-quiet: color-mix(in srgb, var(--on-surface) 78%, var(--surface));
          position: relative;
          background: var(--surface);
          border-top: 1px solid var(--border-subtle);
          padding: clamp(56px, 7vw, 104px) clamp(18px, 4vw, 52px);
        }
        /* Full bleed, no max-width wrapper — standing instruction for this
           page. The grid itself sets the rhythm. */
        .fw-grid {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: clamp(28px, 3vw, 56px) clamp(18px, 2.2vw, 40px);
          align-items: end;
        }
        @media (max-width: 1279px) {
          .fw-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        @media (max-width: 899px) {
          .fw-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 599px) {
          .fw-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 18px;
          }
        }

        .fw-item {
          position: relative;
          min-width: 0;
        }
        /* Room above the folder for the frames to fan into. Reserved always so
           the grid does not reflow when one opens. */
        .fw-stage {
          position: relative;
          height: clamp(104px, 9vw, 144px);
        }
        @media (max-width: 999px) {
          .fw-stage {
            height: 0;
          }
        }

        .fw-frames {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .fw-frame {
          position: absolute;
          bottom: -18px;
          left: 50%;
          width: 58%;
          aspect-ratio: 4 / 3;
          margin-left: -29%;
          background: var(--color-ivory);
          border: 1px solid rgba(0, 0, 0, 0.14);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.34);
          overflow: hidden;
          transform: translateY(0) rotate(0deg);
          transition:
            transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1),
            opacity 200ms ease;
          opacity: 0;
        }
        /* Fanned out. Each slot leans a different way; the middle stays near
           upright so the stack still reads as a stack. */
        .fw-item[data-fan="on"] .fw-frame {
          opacity: 1;
          transform: translateY(-100%) translateX(var(--fw-x)) rotate(var(--fw-r));
        }
        .fw-frame:nth-child(1) {
          transform-origin: top left;
        }
        .fw-frame:nth-child(2) {
          transform-origin: center;
        }
        .fw-frame:nth-child(3) {
          transform-origin: top right;
        }
        .fw-frame:nth-child(2) {
          transition-delay: 25ms;
        }
        .fw-frame:nth-child(3) {
          transition-delay: 50ms;
        }
        .fw-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          /* Top-anchored: website captures are tall, and only their hero is
             meant to show. */
          object-position: top center;
          display: block;
        }
        /* Logos and identity sheets are artwork on transparent or white
           grounds — contain them rather than cropping into the mark. */
        .fw-frame[data-fit="contain"] img {
          object-fit: contain;
          object-position: center;
          padding: 8px;
        }

        .fw-folder {
          position: relative;
          display: block;
          width: 100%;
          text-align: left;
          background: none;
          border: 0;
          padding: 0;
          cursor: pointer;
          color: inherit;
          font: inherit;
          transform: translateY(25px);
          transition:
            transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1),
            opacity 250ms ease;
        }
        @media (max-width: 999px) {
          .fw-folder {
            transform: none;
          }
        }
        .fw-item[data-fan="on"] .fw-folder {
          transform: translateY(0);
        }
        .fw-item[data-dim="on"] .fw-folder {
          opacity: 0.45;
        }

        /* The tab. The angled right edge is the source's own clip-path. */
        .fw-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          width: max-content;
          max-width: 100%;
          padding: 7px 40px 7px 13px;
          margin-left: 2px;
          background: var(--fw-skin);
          /* The angle starts past the label — at 75% it sliced the last word. */
          clip-path: polygon(0 0, calc(100% - 26px) 0, 100% 100%, 0% 100%);
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-graphite);
          transition: background-color 250ms ease;
        }
        .fw-body {
          /* Must be a block itself: block children inside an inline parent
             split the box and the folder renders as slivers. */
          display: block;
          background: var(--fw-skin);
          padding: 16px 18px 20px;
          border-radius: 0 2px 2px 2px;
          transition: background-color 250ms ease;
        }
        /* These are spans because only phrasing content is valid inside a
           <button>; they have to be told to stack. */
        /* Without a hover there is no fan, so each folder carries one frame
           inline — otherwise the phone shows a visual agency's services page
           with no visual work on it, which is the fault this redesign exists
           to fix. */
        .fw-shot {
          display: none;
        }
        @media (max-width: 999px) {
          .fw-shot {
            display: block;
            margin: -4px 0 14px;
            height: clamp(104px, 30vw, 168px);
            background: var(--color-ivory);
            border: 1px solid rgba(0, 0, 0, 0.14);
            overflow: hidden;
          }
          .fw-shot img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: top center;
            display: block;
          }
          .fw-shot[data-fit="contain"] img {
            object-fit: contain;
            object-position: center;
            padding: 10px;
          }
        }
        .fw-name {
          display: block;
          margin: 0;
          font-family: var(--font-editorial);
          font-weight: 300;
          font-size: clamp(20px, 1.7vw, 28px);
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--color-graphite);
        }
        .fw-sub {
          display: block;
          margin: 6px 0 0;
          font-family: var(--font-warm);
          font-style: italic;
          font-size: 13px;
          color: rgba(53, 50, 48, 0.86);
        }
        .fw-meta {
          margin: 14px 0 0;
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(53, 50, 48, 0.84);
        }

        /* Three skins so the wall reads as a drawer of folders rather than one
           repeated card. All three carry graphite ink. */
        .fw-item[data-skin="0"] {
          --fw-skin: #d8d2c4;
        }
        .fw-item[data-skin="1"] {
          --fw-skin: #c9bfa8;
        }
        .fw-item[data-skin="2"] {
          --fw-skin: #e3ddd0;
        }
        .fw-item[data-fan="on"] {
          --fw-skin: var(--color-amber);
        }

        .fw-folder:focus-visible {
          outline: 2px solid var(--fw-accent);
          outline-offset: 4px;
        }

        /* The opened detail. Full width of the wall, below the grid row it
           belongs to, so the folders never reflow sideways. */
        .fw-detail {
          grid-column: 1 / -1;
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
          padding: 30px 0 34px;
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
          gap: clamp(24px, 4vw, 72px);
        }
        @media (max-width: 899px) {
          .fw-detail {
            grid-template-columns: minmax(0, 1fr);
          }
        }
        .fw-detail-tagline {
          margin: 0;
          font-family: var(--font-editorial);
          font-style: italic;
          font-weight: 300;
          font-size: clamp(20px, 2.2vw, 32px);
          line-height: 1.25;
          color: var(--fw-accent);
        }
        .fw-detail-copy {
          margin: 14px 0 0;
          max-width: 56ch;
          font-family: var(--font-warm);
          font-size: 15px;
          font-weight: 300;
          line-height: 1.75;
          color: var(--fw-quiet);
        }
        .fw-detail h3 {
          margin: 0 0 14px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--fw-accent);
        }
        .fw-detail ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 10px;
        }
        .fw-detail li {
          display: flex;
          gap: 12px;
          font-family: var(--font-warm);
          font-size: 14px;
          line-height: 1.6;
          color: var(--on-surface);
        }
        .fw-detail li::before {
          content: "";
          flex: none;
          margin-top: 0.62em;
          width: 14px;
          height: 1px;
          background: var(--fw-accent);
        }
        .fw-credit {
          margin: 18px 0 0;
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--fw-quiet);
        }

        @media (prefers-reduced-motion: reduce) {
          .fw-folder,
          .fw-frame {
            transition: none;
          }
          .fw-folder {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Folder({
  service,
  folder,
  index,
  canFan,
  dimmed,
  active,
  isOpen,
  onActivate,
  onToggle,
}: {
  service: Service;
  folder: ServiceFolder | undefined;
  index: number;
  canFan: boolean;
  dimmed: boolean;
  active: boolean;
  isOpen: boolean;
  onActivate: (id: number | null) => void;
  onToggle: (id: number) => void;
}) {
  const panelId = useId();
  const frames = folder?.frames ?? [];
  const tilt = FRAME_TILT[index % FRAME_TILT.length];
  const fanOn = canFan && active && frames.length > 0;
  const detailRef = useRef<HTMLDivElement | null>(null);

  const scene = String(index + 1).padStart(2, "0");
  /* Logos and identity sheets must not be cropped into; photographs should
     fill their frame. */
  const contain = (src: string) =>
    src.includes("/logo/") || src.includes("/brand/");

  return (
    <>
      <li
        className="fw-item"
        data-skin={index % 3}
        data-fan={fanOn ? "on" : "off"}
        data-dim={dimmed ? "on" : "off"}
        onMouseEnter={() => onActivate(service.id)}
        onMouseLeave={() => onActivate(null)}
      >
        <div className="fw-stage" aria-hidden>
          <div className="fw-frames">
            {frames.map((f, i) => (
              <div
                key={f.src}
                className="fw-frame"
                data-fit={contain(f.src) ? "contain" : "cover"}
                style={
                  {
                    "--fw-r": `${tilt[i]}deg`,
                    "--fw-x": `${(i - 1) * 62}%`,
                  } as React.CSSProperties
                }
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f.src} alt="" loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="fw-folder"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onFocus={() => onActivate(service.id)}
          onBlur={() => onActivate(null)}
          onClick={() => onToggle(service.id)}
        >
          <span className="fw-tab">
            <span>Scene {scene}</span>
            <span aria-hidden>·</span>
            <span>{service.category}</span>
          </span>
          <span className="fw-body">
            {frames[0] ? (
              <span
                className="fw-shot"
                data-fit={contain(frames[0].src) ? "contain" : "cover"}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={frames[0].src} alt={frames[0].alt} loading="lazy" decoding="async" />
              </span>
            ) : null}
            <span className="fw-name">{service.name}</span>
            <span className="fw-sub">{service.subtitle}</span>
            <span className="fw-meta">
              <span>
                {folder ? `${folder.clients} client${folder.clients === 1 ? "" : "s"}` : ""}
              </span>
              <span aria-hidden>{isOpen ? "Close −" : "Open +"}</span>
            </span>
          </span>
        </button>
      </li>

      {isOpen ? (
        <div className="fw-detail" id={panelId} ref={detailRef}>
          <div>
            <p className="fw-detail-tagline">{service.tagline}</p>
            <p className="fw-detail-copy">{service.description}</p>
            {folder ? (
              <p className="fw-credit">
                {folder.note
                  ? folder.note
                  : `Shown: ${uniqueClients(folder).join(" · ")}`}
              </p>
            ) : null}
          </div>
          <div>
            <h3>What&rsquo;s in the frame</h3>
            <ul>
              {service.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}

function uniqueClients(folder: ServiceFolder): string[] {
  return [...new Set(folder.frames.map((f) => f.client))];
}
