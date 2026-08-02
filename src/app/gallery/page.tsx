"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { galleryPhotos } from "@/data/gallery";

/* The nine tiles the sequence settles on — one from Adrian's, two each from
   Big Bears, Canapy, Destan and ConnecTR, with Destan's rotating cag at centre
   where hero-24 puts its hero tile.

   Fixed indices rather than a random pick: choosing at render time gives the
   server and the client different markup and trips hydration. */
const SETTLED = [0, 42, 28, 27, 41, 69, 34, 19, 56] as const;

export default function GalleryPage() {
  const tiles = useMemo(() => SETTLED.map((i) => galleryPhotos[i]), []);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <main className="gl-page">
      <Link href="/" className="gl-back">
        FrameFlow <span aria-hidden>←</span> back
      </Link>

      <div className="gl-grid">
        {tiles.map((p, i) => (
          <button
            key={p.src}
            type="button"
            className="gl-tile"
            onClick={() => setOpen(i)}
            aria-label={`Open: ${p.slate}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.thumb} alt={p.alt} width={p.w} height={p.h} />
          </button>
        ))}
      </div>

      <div className="gl-caption">
        <p className="gl-eyebrow">FrameFlow — Photography</p>
        <h1 className="gl-title">Seventy-six frames, nine at a time.</h1>
      </div>

      {open !== null ? (
        <div
          className="gl-open"
          role="dialog"
          aria-modal="true"
          aria-label={tiles[open].slate}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(null);
          }}
        >
          <figure className="gl-open-figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tiles[open].full}
              alt={tiles[open].alt}
              width={tiles[open].w}
              height={tiles[open].h}
              /* Never past natural width — 16 of the 76 originals are
                 700-900px wide and turn to mush stretched full-bleed. */
              style={{ width: `min(${tiles[open].w}px, 92vw)` }}
            />
            <figcaption>
              {tiles[open].slate}
              <span> · {tiles[open].client.replace(/-/g, " ")}</span>
            </figcaption>
          </figure>
          <button type="button" className="gl-open-x" onClick={() => setOpen(null)} aria-label="Close">
            ✕
          </button>
        </div>
      ) : null}

      <style jsx global>{`
        /* The gallery pins its own ground rather than following the theme
           toggle — there is no navbar here to toggle from, and photographs
           read better against a constant dark field. */
        .gl-page {
          --gl-ground: #353230;
          --gl-ink: #ffffeb;
          position: fixed;
          inset: 0;
          background: var(--gl-ground);
          color: var(--gl-ink);
          overflow: hidden;
          font-family: var(--font-mono);
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
          color: var(--gl-ink);
        }

        .gl-grid {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: min(46vw, 620px);
          aspect-ratio: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(3, 1fr);
          gap: 1em;
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
        .gl-tile img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .gl-tile:focus-visible {
          outline: 2px solid var(--gl-ink);
          outline-offset: 3px;
        }

        .gl-caption {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 6%;
          text-align: center;
          z-index: 3;
          padding: 0 24px;
        }
        .gl-eyebrow {
          margin: 0 0 10px;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255, 255, 235, 0.6);
        }
        .gl-title {
          margin: 0;
          font-family: var(--font-editorial);
          font-weight: 300;
          font-size: clamp(24px, 3.4vw, 46px);
          line-height: 1;
          letter-spacing: -0.02em;
          color: var(--gl-ink);
        }

        .gl-open {
          position: fixed;
          inset: 0;
          z-index: 40;
          background: rgba(16, 15, 14, 0.94);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }
        .gl-open-figure {
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          max-width: 100%;
        }
        .gl-open-figure img {
          height: auto;
          max-height: 78vh;
          object-fit: contain;
          display: block;
        }
        .gl-open-figure figcaption {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 235, 0.82);
          text-align: center;
        }
        .gl-open-figure figcaption span {
          color: rgba(255, 255, 235, 0.5);
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
          color: var(--gl-ink);
        }

        @media (max-width: 900px) {
          .gl-grid {
            width: min(86vw, 520px);
            gap: 0.5em;
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
      `}</style>
    </main>
  );
}
