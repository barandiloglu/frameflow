"use client";

import { useEffect, useState } from "react";
import { serviceFolders } from "@/data/serviceFolders";

/* Ported from awwwards hero-2 (Portrait Card Row), reinterpreted.
 *
 * The source's row of five portraits flies in scattered (rotations
 * -10/-5/0/5/10, x offsets -80/-40/0/40/80, y 18%, scale 0.72, opacity 0),
 * settles, closes its gap to 0.75vw, scales to 1 — and then clips every tile
 * except the centre one away and blows that one up to fill the screen.
 *
 * Steps 1-5 are kept; 6-8 are dropped. The whole point here is the row: seven
 * tiles, one per service, so the hero IS the showcase rather than a curtain
 * that opens onto a single photograph. The scatter values and timings are the
 * source's, widened from five slots to seven.
 *
 * No GSAP — CSS transitions and one state flip. */

type Service = { id: number; name: string; category: string; subtitle: string };

/* The source's scatter, widened to seven slots and kept symmetrical. */
const ROT = [-12, -8, -4, 0, 4, 8, 12];
const OFF = [-96, -64, -32, 0, 32, 64, 96];

export function ServicesHero({ services }: { services: readonly Service[] }) {
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [settled, setSettled] = useState(reduced);

  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => setSettled(true), 60);
    return () => clearTimeout(t);
  }, [reduced]);

  return (
    <div className="sh" data-settled={settled ? "on" : "off"}>
      <ul className="sh-strip">
        {services.map((s, i) => {
          const folder = serviceFolders.find((f) => f.id === s.id);
          const plate = folder?.frames[0];
          return (
            <li
              key={s.id}
              className="sh-tile"
              style={
                {
                  "--rot": `${ROT[i % ROT.length]}deg`,
                  "--off": `${OFF[i % OFF.length]}px`,
                  "--i": i,
                } as React.CSSProperties
              }
            >
              <a href={`#scene-${s.id}`} className="sh-card">
                <span className="sh-plate" data-fit={i < 2 ? "contain" : "cover"}>
                  {plate ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={plate.src} alt="" loading="lazy" decoding="async" />
                  ) : (
                    /* No honest image for Web & Mobile Apps — see
                       serviceFolders.ts. The tile says where the work stands
                       rather than borrowing a photograph from another service. */
                    <span className="sh-empty">{folder?.note}</span>
                  )}
                </span>
                <span className="sh-no">{String(i + 1).padStart(2, "0")}</span>
                <span className="sh-name">{s.name}</span>
                <span className="sh-cat">{s.category}</span>
              </a>
            </li>
          );
        })}
      </ul>

      <div className="sh-copy">
        <h1 className="sh-title">
          <span className="sh-mask">
            <span className="sh-word" style={{ ["--w" as string]: 0 }}>
              Seven <em>scenes</em>.
            </span>
          </span>
          <span className="sh-mask">
            <span className="sh-word" style={{ ["--w" as string]: 1 }}>
              One full reel.
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
          /* Fills what the section has left under the navbar offset and the
             slate strip, so the hero is exactly one screen. */
          flex: 1 1 auto;
          min-height: 460px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: clamp(24px, 4vh, 52px);
          padding: clamp(20px, 3vh, 44px) clamp(18px, 3.4vw, 56px) clamp(28px, 4vh, 56px);
          overflow: hidden;
        }

        .sh-strip {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          align-items: stretch;
          justify-content: center;
          /* Step 4 of the source: the strip closes its gap as the tiles land. */
          gap: clamp(26px, 3vw, 54px);
          transition: gap 1s cubic-bezier(0.68, 0, 0.27, 1) 0.7s;
        }
        .sh[data-settled="on"] .sh-strip {
          gap: clamp(6px, 0.75vw, 12px);
        }

        .sh-tile {
          flex: 1 1 0;
          min-width: 0;
          max-width: 260px;
          /* Steps 2, 3 and 5: in from scattered, settle, then up to full size. */
          transform: translate(var(--off), 18%) rotate(var(--rot)) scale(0.72);
          opacity: 0;
          transition:
            transform 1.1s cubic-bezier(0.16, 1, 0.3, 1),
            opacity 0.9s ease;
          transition-delay: calc(var(--i) * 0.06s);
        }
        .sh[data-settled="on"] .sh-tile {
          transform: translate(0, 0) rotate(0deg) scale(1);
          opacity: 1;
        }

        .sh-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          text-decoration: none;
          color: inherit;
        }
        .sh-plate {
          position: relative;
          display: block;
          width: 100%;
          aspect-ratio: 5 / 7;
          overflow: hidden;
          background: color-mix(in srgb, var(--on-surface) 8%, var(--surface));
          border: 1px solid var(--border-subtle);
        }
        .sh-plate img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          filter: grayscale(0.28);
          transition:
            transform 620ms cubic-bezier(0.2, 0.8, 0.2, 1),
            filter 320ms ease;
        }
        /* Logos and identity sheets are artwork, not photographs — contain
           them on a paper ground rather than cropping into the mark. */
        .sh-plate[data-fit="contain"] {
          background: var(--color-ivory);
        }
        .sh-plate[data-fit="contain"] img {
          object-fit: contain;
          object-position: center;
          padding: 12px;
        }
        .sh-empty {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          padding: 14px;
          font-family: var(--font-mono);
          font-size: 9px;
          line-height: 1.6;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--quiet-ink);
        }

        .sh-no {
          margin-top: 12px;
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.24em;
          color: var(--accent-ink);
        }
        .sh-name {
          margin-top: 4px;
          font-family: var(--font-editorial);
          font-weight: 300;
          font-size: clamp(13px, 1.05vw, 19px);
          line-height: 1.15;
          letter-spacing: -0.01em;
          color: var(--on-surface);
        }
        .sh-cat {
          margin-top: 3px;
          font-family: var(--font-mono);
          font-size: 8px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--quiet-ink);
        }

        /* A light touch only — the folder wall below owns the real interaction. */
        .sh-card:hover .sh-plate img,
        .sh-card:focus-visible .sh-plate img {
          transform: scale(1.06);
          filter: grayscale(0);
        }
        .sh-card:focus-visible {
          outline: 2px solid var(--accent-ink);
          outline-offset: 4px;
        }

        .sh-copy {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: clamp(20px, 4vw, 64px);
          flex-wrap: wrap;
        }
        .sh-title {
          margin: 0;
          font-family: var(--font-editorial);
          font-weight: 300;
          font-size: clamp(34px, 5.4vw, 86px);
          line-height: 0.94;
          letter-spacing: -0.035em;
          color: var(--on-surface);
        }
        .sh-title em {
          font-style: italic;
          color: var(--accent-ink);
        }
        .sh-mask {
          display: block;
          overflow: hidden;
        }
        .sh-word {
          display: block;
          transform: translateY(108%);
          transition: transform 0.75s cubic-bezier(0.2, 0.8, 0.2, 1);
          transition-delay: calc(1.4s + var(--w) * 0.1s);
        }
        .sh[data-settled="on"] .sh-word {
          transform: translateY(0);
        }
        .sh-sub {
          margin: 0;
          max-width: 440px;
          font-family: var(--font-warm);
          font-size: clamp(13px, 0.95vw, 15px);
          font-weight: 300;
          line-height: 1.7;
          color: var(--quiet-ink);
          opacity: 0;
          transition: opacity 0.7s ease 1.7s;
        }
        .sh[data-settled="on"] .sh-sub {
          opacity: 1;
        }

        /* Seven portrait tiles stop fitting side by side well before phone
           widths; the strip becomes a swipeable showcase rather than shrinking
           the tiles into stamps. */
        @media (max-width: 899px) {
          .sh-strip {
            justify-content: flex-start;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            padding-bottom: 8px;
            /* No negative-margin full bleed: inside a scroll container the
               start padding is not honoured and the first tile ends up flush
               against the viewport edge. The strip scrolls within the page
               padding instead. */
            -webkit-overflow-scrolling: touch;
          }
          .sh-tile {
            flex: 0 0 auto;
            width: clamp(132px, 42vw, 190px);
            scroll-snap-align: start;
          }
          .sh-copy {
            display: block;
          }
          .sh-sub {
            margin-top: 16px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sh-strip,
          .sh-tile,
          .sh-word,
          .sh-sub,
          .sh-plate img {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
