"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { PhotoStill } from "@/data/clients";

type Props = { photos: readonly PhotoStill[] };

const CYCLE_MS = 4500;

export function PhotosScene({ photos }: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  /* auto-cycle when not paused */
  useEffect(() => {
    if (paused || photos.length < 2) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % photos.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [paused, photos.length]);

  /* pause when offscreen */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setPaused(!e.isIntersecting);
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (photos.length === 0) return null;
  const current = photos[active];

  return (
    <section aria-label="Photo showcase" className="ps-section">
      <p className="ps-eyebrow">
        <span className="ps-rule" />
        Frame · 09 — The Photos
      </p>

      <div className="ps-meta">
        <span>
          Photography · {String(photos.length).padStart(2, "0")} hero stills · cycling auto
        </span>
        <span className="ps-pulse">Reel · Take 01</span>
      </div>

      {/* TWO-COLUMN VIEWING ROOM: hero left, slate + contact sheet right */}
      <div className="ps-viewer">
        {/* HERO — portrait 4:5, height-constrained */}
        <div
          ref={heroRef}
          className={`ps-hero ${paused ? "ps-paused" : ""}`}
          aria-live="polite"
        >
          <span className="ps-bracket ps-tl" aria-hidden />
          <span className="ps-bracket ps-tr" aria-hidden />
          <span className="ps-bracket ps-bl" aria-hidden />
          <span className="ps-bracket ps-br" aria-hidden />

          {photos.map((p, i) => (
            <div
              key={p.src}
              className={`ps-frame ${i === active ? "ps-active" : ""}`}
              aria-hidden={i !== active}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 1080px) 100vw, 50vw"
                priority={i === 0}
                style={{ objectFit: "cover" }}
              />
              <span className="ps-grain" aria-hidden />
            </div>
          ))}

          <div className="ps-progress-track">
            <span
              className="ps-progress-bar"
              key={`progress-${active}-${paused}`}
            />
          </div>
        </div>

        {/* RIGHT PANEL — slate, counter, contact-sheet grid */}
        <div className="ps-panel">
          <div className="ps-panel-top">
            <p className="ps-panel-eyebrow">Now showing</p>
            <h3 className="ps-panel-slate">{current.slate}</h3>
            <p className="ps-panel-counter">
              <span className="ps-panel-num">
                {String(active + 1).padStart(2, "0")}
              </span>
              <span className="ps-panel-sep"> / </span>
              <span className="ps-panel-total">
                {String(photos.length).padStart(2, "0")}
              </span>
            </p>
          </div>

          <div className="ps-contact-sheet">
            <span className="ps-perfs ps-perfs-top" aria-hidden />
            <div className="ps-contact-grid">
              {photos.map((p, i) => (
                <button
                  key={p.src}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`ps-cell ${i === active ? "ps-cell-active" : ""}`}
                  aria-label={`Show ${p.slate}`}
                >
                  <Image
                    src={p.src}
                    alt=""
                    fill
                    sizes="(max-width: 1080px) 30vw, 12vw"
                    style={{ objectFit: "cover" }}
                  />
                  <span className="ps-cell-no">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </button>
              ))}
            </div>
            <span className="ps-perfs ps-perfs-bottom" aria-hidden />
          </div>
        </div>
      </div>

      <style jsx>{`
        .ps-section {
          --ff-amber: #c19a4a;
          --ff-ember: #d43f1b;
          --ff-ivory: #fffeeb;
          --ff-ivory-15: rgba(255, 255, 235, 0.15);
          --ff-mono: "JetBrains Mono", ui-monospace, monospace;
          --font-display: "Fraunces", Georgia, serif;

          margin: 0 52px;
          padding: 64px 0;
          border-bottom: 1px solid var(--ff-ivory-15);
        }
        .ps-eyebrow {
          font-family: var(--ff-mono);
          font-size: 11px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ff-amber);
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 0 0 36px;
        }
        .ps-rule {
          display: block;
          width: 36px;
          height: 1px;
          background: var(--ff-amber);
        }

        .ps-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 0 24px;
          font-family: var(--ff-mono);
          font-size: 10px;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: rgba(255, 255, 235, 0.6);
        }
        .ps-pulse {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--ff-ember);
        }
        .ps-pulse::before {
          content: "";
          width: 6px;
          height: 6px;
          background: var(--ff-ember);
          border-radius: 50%;
          box-shadow: 0 0 0 0 rgba(212, 63, 27, 0.5);
          animation: ps-pulse-dot 1.8s ease-in-out infinite;
        }
        @keyframes ps-pulse-dot {
          50% { box-shadow: 0 0 0 6px rgba(212, 63, 27, 0); }
        }

        /* TWO-COLUMN LAYOUT --------------------------------------- */
        .ps-viewer {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
          gap: 32px;
          align-items: stretch;
        }

        /* HERO — height-constrained 4:5 portrait */
        .ps-hero {
          position: relative;
          aspect-ratio: 4 / 5;
          max-height: calc(100vh - 200px);
          width: 100%;
          margin: 0;
          overflow: hidden;
          isolation: isolate;
          background: #1c1a18;
          box-shadow: 0 50px 80px -30px rgba(0, 0, 0, 0.5);
          /* let it shrink within the column instead of pushing height */
          align-self: start;
          justify-self: end;
          /* compute max-width from height limit so 4:5 fits the available height */
          max-width: calc((100vh - 200px) * 4 / 5);
        }
        .ps-bracket {
          position: absolute;
          width: 22px; height: 22px;
          border-color: var(--ff-ivory);
          opacity: 0.65;
          z-index: 5;
        }
        .ps-tl { top: 18px; left: 18px;     border-top: 1px solid; border-left: 1px solid; }
        .ps-tr { top: 18px; right: 18px;    border-top: 1px solid; border-right: 1px solid; }
        .ps-bl { bottom: 18px; left: 18px;  border-bottom: 1px solid; border-left: 1px solid; }
        .ps-br { bottom: 18px; right: 18px; border-bottom: 1px solid; border-right: 1px solid; }

        .ps-frame {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 1.2s ease;
        }
        .ps-frame.ps-active { opacity: 1; }
        .ps-grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: repeating-linear-gradient(
            0deg,
            rgba(255, 255, 235, 0.05) 0 1px,
            transparent 1px 3px
          );
          mix-blend-mode: overlay;
          opacity: 0.4;
        }

        .ps-progress-track {
          position: absolute;
          top: 22px;
          right: 22px;
          width: 100px;
          height: 1px;
          background: rgba(255, 254, 235, 0.25);
          z-index: 6;
          overflow: hidden;
        }
        .ps-progress-bar {
          display: block;
          width: 100%;
          height: 100%;
          background: var(--ff-ivory);
          transform-origin: left;
          animation: ps-progress 4.5s linear forwards;
        }
        .ps-paused .ps-progress-bar { animation-play-state: paused; }
        @keyframes ps-progress {
          0%   { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }

        /* RIGHT PANEL --------------------------------------------- */
        .ps-panel {
          display: flex;
          flex-direction: column;
          gap: 28px;
          align-self: stretch;
        }

        .ps-panel-top { display: flex; flex-direction: column; gap: 18px; }
        .ps-panel-eyebrow {
          font-family: var(--ff-mono);
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ff-amber);
          margin: 0;
        }
        .ps-panel-slate {
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 400;
          font-size: clamp(36px, 3.6vw, 56px);
          letter-spacing: -0.025em;
          line-height: 1.05;
          color: var(--ff-ivory);
          margin: 0;
          /* slight in-animation when slate changes */
          animation: ps-slate-in 0.6s ease;
        }
        @keyframes ps-slate-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ps-panel-counter {
          font-family: var(--font-display);
          font-style: italic;
          font-size: clamp(48px, 5vw, 80px);
          line-height: 0.85;
          letter-spacing: -0.02em;
          margin: 0;
          color: var(--ff-ivory);
        }
        .ps-panel-sep,
        .ps-panel-total {
          font-family: var(--ff-mono);
          font-style: normal;
          font-size: 0.4em;
          letter-spacing: 0.18em;
          color: rgba(255, 254, 235, 0.55);
          vertical-align: 0.4em;
        }

        /* CONTACT SHEET — 35mm aesthetic, 4-col x 3-row grid */
        .ps-contact-sheet {
          position: relative;
          background: #0c0a09;
          padding: 18px 12px;
          box-shadow:
            0 1px 0 rgba(255, 255, 235, 0.06) inset,
            0 30px 60px -25px rgba(0, 0, 0, 0.5);
        }
        .ps-perfs {
          position: absolute;
          left: 12px; right: 12px;
          height: 10px;
          background-image: radial-gradient(
            circle at 8px center,
            #353230 3.5px,
            transparent 4px
          );
          background-size: 22px 10px;
          background-repeat: repeat-x;
          background-position: left center;
          pointer-events: none;
        }
        .ps-perfs-top { top: 4px; }
        .ps-perfs-bottom { bottom: 4px; }

        .ps-contact-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(3, 1fr);
          gap: 4px;
          padding: 14px 0;
        }

        .ps-cell {
          position: relative;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          cursor: pointer;
          background: #1c1a18;
          padding: 0;
          border: 0;
          opacity: 0.55;
          transition:
            opacity 0.35s ease,
            transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1),
            filter 0.35s ease;
          filter: saturate(0.7);
        }
        .ps-cell:hover {
          opacity: 0.95;
          transform: translateY(-2px);
          filter: saturate(1);
        }
        .ps-cell.ps-cell-active {
          opacity: 1;
          filter: saturate(1);
          outline: 2px solid var(--ff-amber);
          outline-offset: -2px;
          z-index: 2;
        }
        .ps-cell::after {
          content: "";
          position: absolute;
          left: 0; right: 0; bottom: 0;
          height: 28%;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
          pointer-events: none;
        }
        .ps-cell-no {
          position: absolute;
          bottom: 4px; left: 5px;
          font-family: var(--ff-mono);
          font-size: 8.5px;
          letter-spacing: 0.18em;
          color: var(--ff-ivory);
          opacity: 0.85;
          z-index: 2;
          text-shadow: 0 0 3px rgba(0, 0, 0, 0.6);
        }

        @media (max-width: 1080px) {
          .ps-viewer { grid-template-columns: 1fr; gap: 24px; }
          .ps-hero { max-width: 100%; max-height: 80vh; justify-self: center; }
          .ps-contact-grid { grid-template-columns: repeat(6, 1fr); grid-template-rows: repeat(2, 1fr); }
        }
        @media (max-width: 880px) {
          .ps-section { margin-left: 18px; margin-right: 18px; padding: 48px 0; }
          .ps-contact-grid { grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(3, 1fr); }
        }

        @media (prefers-reduced-motion: reduce) {
          .ps-frame { transition: none; }
          .ps-progress-bar { animation: none; transform: scaleX(1); }
          .ps-pulse::before { animation: none; }
        }
      `}</style>
    </section>
  );
}
