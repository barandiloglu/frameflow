"use client";

import { serviceFolders } from "@/data/serviceFolders";
import type { Service } from "./CuttingRoom";

/* The plain read. The cutting room above is for exploring; this is for the
   visitor who simply wants to know what the studio does and will not click
   anything to find out. Every service, in order, in full. */

export function SceneList({ services }: { services: readonly Service[] }) {
  return (
    <section className="sl" id="all-scenes">
      <p className="sl-head">
        <b>All scenes</b>
        <span>Seven services, start to finish</span>
      </p>

      {services.map((s) => {
        const folder = serviceFolders.find((f) => f.id === s.id);
        const frames = folder?.frames ?? [];
        return (
          <article className="sl-row" id={`scene-${s.id}`} key={s.id}>
            <div className="sl-strip" data-count={frames.length}>
              {frames.map((f) => (
                <figure
                  className="sl-plate"
                  key={f.src}
                  data-fit={
                    f.src.includes("/logo/") || f.src.includes("/brand/") ? "contain" : "cover"
                  }
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.src} alt={f.alt} loading="lazy" decoding="async" />
                  <figcaption>{f.client}</figcaption>
                </figure>
              ))}
            </div>

            <div className="sl-copy">
              <p className="cr-scene">
                Scene {String(s.id).padStart(2, "0")} <i>·</i> {s.category} <i>·</i> {s.scene}
              </p>
              <h2 className="sl-name">{s.name}</h2>
              <p className="cr-tagline">{s.tagline}</p>
              <p className="cr-desc">{s.description}</p>
              <ul className="cr-feat">
                {s.features.map((f) => (
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
                <span>{s.subtitle}</span>
              </p>
            </div>
          </article>
        );
      })}

      <style jsx global>{`
        .sl {
          background: var(--surface);
          border-top: 1px solid var(--border-subtle);
        }
        .sl-head {
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 16px;
          margin: 0;
          padding: clamp(28px, 5vh, 60px) clamp(16px, 3vw, 40px) 8px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--quiet-ink);
        }
        .sl-head b {
          color: var(--accent-ink);
          font-weight: 600;
        }

        .sl-row {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: clamp(20px, 3vw, 56px);
          align-items: center;
          padding: clamp(26px, 4vh, 46px) clamp(16px, 3vw, 40px);
          border-top: 1px solid var(--border-subtle);
          scroll-margin-top: 90px;
        }
        .sl-row:nth-child(even) {
          background: color-mix(in srgb, var(--on-surface) 3%, var(--surface));
        }
        .sl-strip {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 6px;
        }
        /* One frame stands on its own rather than in a third of a row. */
        .sl-strip[data-count="1"] {
          grid-template-columns: minmax(0, 1fr);
        }
        .sl-plate {
          position: relative;
          margin: 0;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          border: 1px solid var(--border-subtle);
          border-radius: 2px;
          background: color-mix(in srgb, var(--on-surface) 7%, var(--surface));
        }
        .sl-strip[data-count="1"] .sl-plate {
          aspect-ratio: 16 / 10;
        }
        .sl-plate img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
        }
        .sl-plate[data-fit="contain"] {
          background: var(--color-ivory);
        }
        .sl-plate[data-fit="contain"] img {
          object-fit: contain;
          object-position: center;
          padding: 10%;
        }
        .sl-plate figcaption {
          position: absolute;
          left: 0;
          bottom: 0;
          padding: 4px 8px;
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
        .sl-name {
          margin: 0 0 6px;
          font-family: var(--font-editorial);
          font-weight: 300;
          font-size: clamp(26px, 3vw, 44px);
          line-height: 1;
          letter-spacing: -0.03em;
        }

        @media (max-width: 1020px) {
          .sl-row {
            grid-template-columns: minmax(0, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
