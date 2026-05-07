"use client";

import { useEffect, useState } from "react";

type Props = {
  /** Padded frame number, e.g. "005". */
  frameNumber: string;
  /** Display client name — gets cascaded letter by letter. */
  clientName: string;
  /** Service tags shown as small pills. */
  scope: readonly string[];
  /** Optional location (e.g. "Toronto"). */
  location?: string;
  /** Optional year (e.g. "2024"). */
  year?: string;
};

const START_DELAY = 1700;
const FILL_DURATION = 1600;
const PEEL_DELAY = 200;
const PEEL_DURATION = 1000;

/**
 * Cinematic loading transition that sits on top of every featured
 * client subpage. ~3.5s, then peels away to reveal the destination.
 *
 * Direct port of docs/prototypes/big-bears-loading/index.html.
 */
export function LoadingTransition({
  frameNumber,
  clientName,
  scope,
  location,
  year,
}: Props) {
  const [done, setDone] = useState(false);
  const [unmounted, setUnmounted] = useState(false);
  const [percent, setPercent] = useState(0);
  const [clock, setClock] = useState("00:01:23");

  /* lock body scroll while visible */
  useEffect(() => {
    if (typeof document === "undefined") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  /* tick the percent counter while the bar fills */
  useEffect(() => {
    if (done) return;
    const startTimer = setTimeout(() => {
      const start = performance.now();
      let raf = 0;
      const tick = (now: number) => {
        const elapsed = now - start;
        const pct = Math.min(100, Math.round((elapsed / FILL_DURATION) * 100));
        setPercent(pct);
        if (pct < 100) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, START_DELAY);
    return () => clearTimeout(startTimer);
  }, [done]);

  /* auto-dismiss after the bar finishes */
  useEffect(() => {
    const totalLifetime = START_DELAY + FILL_DURATION + PEEL_DELAY;
    const t = setTimeout(() => setDone(true), totalLifetime);
    return () => clearTimeout(t);
  }, []);

  /* unmount after the peel finishes */
  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setUnmounted(true), PEEL_DURATION + 100);
    return () => clearTimeout(t);
  }, [done]);

  /* live clock */
  useEffect(() => {
    let s = 83;
    const id = setInterval(() => {
      s++;
      const hh = String(Math.floor(s / 3600)).padStart(2, "0");
      const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
      const ss = String(s % 60).padStart(2, "0");
      setClock(`${hh}:${mm}:${ss}`);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  if (unmounted) return null;

  /* char cascade — wrap each non-space char of clientName */
  const baseDelay = 0.6;
  const step = 0.04;
  let charI = 0;
  const titleChars = Array.from(clientName).map((ch) => {
    if (ch === " ") {
      const node = <span key={`sp-${charI}`}>&nbsp;</span>;
      charI++;
      return node;
    }
    const delay = baseDelay + charI * step;
    charI++;
    return (
      <span
        key={`ch-${charI}`}
        className="lt-char"
        style={{ animationDelay: `${delay}s` }}
      >
        {ch}
      </span>
    );
  });

  return (
    <div
      className={`lt-loader${done ? " lt-done" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={`Loading ${clientName}`}
    >
      <span className="lt-bracket lt-tl" aria-hidden />
      <span className="lt-bracket lt-tr" aria-hidden />
      <span className="lt-bracket lt-bl" aria-hidden />
      <span className="lt-bracket lt-br" aria-hidden />

      <div className="lt-top">
        <span className="lt-live">REC · NOW LOADING</span>
        <div className="lt-right">
          <span>FF_ARCHIVE</span>
          <span>VOL 2026</span>
          <span className="lt-clock">{clock}</span>
        </div>
      </div>

      <div className="lt-stage">
        <p className="lt-eyebrow">Now showing — next on the reel</p>
        <p className="lt-frameno">
          <b>Reel · {frameNumber}</b>
          {location ? ` · ${location}` : ""}
          {year ? ` · ${year}` : ""}
        </p>
        <h1 className="lt-title" aria-label={clientName}>
          {titleChars}
        </h1>
        {scope.length > 0 && (
          <div className="lt-scope">
            {scope.map((s) => (
              <span key={s} className="lt-tag">
                {s}
              </span>
            ))}
          </div>
        )}
        <div className="lt-bar-wrap">
          <div className="lt-bar">
            <span className="lt-bar-fill" />
          </div>
          <span className="lt-bar-percent">
            {String(percent).padStart(3, "0")} %
          </span>
        </div>
      </div>

      <div className="lt-bottom">
        <div className="lt-status">
          <span className="lt-label">Status</span>
          <span className="lt-val">Cueing take 01</span>
        </div>
        <button
          type="button"
          className="lt-skip"
          onClick={() => setDone(true)}
        >
          Skip intro →
        </button>
      </div>

      {done && <span className="lt-edge" aria-hidden />}

      <style jsx>{`
        /* ---- 1:1 port of docs/prototypes/big-bears-loading
           with class prefix lt- and centering via flex column. ---- */

        .lt-loader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #1c1a18;
          color: #ffffeb;
          display: flex;
          flex-direction: column;
          padding: 32px 52px;
          font-family: "JetBrains Mono", ui-monospace, monospace;
          transform-origin: right center;
          animation: lt-flicker 7.5s steps(1) infinite;
        }
        .lt-top    { flex: 0 0 auto; }
        .lt-bottom { flex: 0 0 auto; }
        .lt-stage  {
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 28px;
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          min-height: 0;
        }

        @keyframes lt-flicker {
          0%, 96%, 100% { filter: brightness(1) contrast(1); }
          97%           { filter: brightness(0.92) contrast(1.08); }
          98%           { filter: brightness(1.04) contrast(0.97); }
          99%           { filter: brightness(0.97) contrast(1.04); }
        }

        /* film grain */
        .lt-loader::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          background-image: repeating-linear-gradient(
            0deg,
            rgba(255, 255, 235, 0.04) 0 1px,
            transparent 1px 3px
          );
          mix-blend-mode: overlay;
          opacity: 0.5;
        }
        /* light leak */
        .lt-loader::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background:
            radial-gradient(ellipse 50% 40% at 75% 25%, rgba(196, 154, 74, 0.18), transparent 60%),
            radial-gradient(ellipse 60% 50% at 20% 80%, rgba(212, 63, 27, 0.12), transparent 65%);
          animation: lt-leak 9s ease-in-out infinite;
        }
        @keyframes lt-leak {
          0%, 100% { opacity: 0.85; transform: scale(1); }
          50%      { opacity: 1.05; transform: scale(1.04); }
        }

        .lt-loader > * { position: relative; z-index: 2; }

        /* ---- corner brackets ---------------------------------- */
        .lt-bracket {
          position: absolute;
          width: 28px;
          height: 28px;
          opacity: 0.55;
          z-index: 4;
        }
        .lt-tl {
          top: 22px; left: 22px;
          border-top: 1px solid #c19a4a;
          border-left: 1px solid #c19a4a;
        }
        .lt-tr {
          top: 22px; right: 22px;
          border-top: 1px solid #c19a4a;
          border-right: 1px solid #c19a4a;
        }
        .lt-bl {
          bottom: 22px; left: 22px;
          border-bottom: 1px solid #c19a4a;
          border-left: 1px solid #c19a4a;
        }
        .lt-br {
          bottom: 22px; right: 22px;
          border-bottom: 1px solid #c19a4a;
          border-right: 1px solid #c19a4a;
        }

        /* ---- top rail ----------------------------------------- */
        .lt-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255, 255, 235, 0.6);
        }
        .lt-live {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #d43f1b;
          font-weight: 500;
        }
        .lt-live::before {
          content: "";
          width: 8px;
          height: 8px;
          background: #d43f1b;
          border-radius: 50%;
          box-shadow: 0 0 0 0 rgba(212, 63, 27, 0.5);
          animation: lt-pulse 1.4s ease-in-out infinite;
        }
        @keyframes lt-pulse {
          50% { box-shadow: 0 0 0 6px rgba(212, 63, 27, 0); }
        }
        .lt-right {
          display: flex;
          gap: 24px;
        }
        .lt-clock {
          color: #c19a4a;
          font-feature-settings: "tnum" 1;
        }

        /* ---- center stage ------------------------------------- */
        .lt-eyebrow {
          font-size: 11px;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          color: #c19a4a;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 14px;
          opacity: 0;
          animation: lt-rise 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s forwards;
        }
        .lt-eyebrow::before {
          content: "";
          width: 36px;
          height: 1px;
          background: #c19a4a;
        }

        .lt-frameno {
          font-family: "Fraunces", Georgia, serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(28px, 3vw, 48px);
          line-height: 1;
          letter-spacing: -0.01em;
          color: #ffffeb;
          margin: 0;
          opacity: 0;
          animation: lt-rise 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 0.4s forwards;
        }
        .lt-frameno b { color: #c19a4a; font-weight: 400; }

        .lt-title {
          font-family: "Fraunces", Georgia, serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(56px, 8vw, 144px);
          line-height: 0.9;
          letter-spacing: -0.025em;
          color: #ffffeb;
          margin: 0;
          max-width: 16ch;
        }
        .lt-char {
          display: inline-block;
          opacity: 0;
          transform: translateY(70%) rotate(6deg);
          animation: lt-char-drop 0.85s cubic-bezier(0.7, 0, 0.2, 1) forwards;
          will-change: transform, opacity;
        }
        @keyframes lt-char-drop {
          to { opacity: 1; transform: translateY(0) rotate(0); }
        }

        .lt-scope {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 8px;
          opacity: 0;
          animation: lt-rise 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 1s forwards;
        }
        .lt-tag {
          border: 1px solid rgba(196, 154, 74, 0.35);
          padding: 6px 12px;
          font-size: 9px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #c19a4a;
        }

        .lt-bar-wrap {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 24px;
          align-items: center;
          margin-top: 16px;
          opacity: 0;
          animation: lt-rise 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 1.6s forwards;
        }
        .lt-bar {
          position: relative;
          height: 2px;
          background: rgba(255, 255, 235, 0.15);
          overflow: hidden;
        }
        .lt-bar-fill {
          position: absolute;
          inset: 0;
          background: #c19a4a;
          transform: scaleX(0);
          transform-origin: left;
          animation: lt-fill 1.6s linear 1.7s forwards;
        }
        @keyframes lt-fill { to { transform: scaleX(1); } }

        .lt-bar-percent {
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #c19a4a;
          font-feature-settings: "tnum" 1;
          width: 72px;
          text-align: right;
        }

        /* ---- bottom rail -------------------------------------- */
        .lt-bottom {
          display: flex;
          justify-content: space-between;
          align-items: end;
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255, 255, 235, 0.4);
        }
        .lt-label { color: rgba(255, 255, 235, 0.4); }
        .lt-val   { color: #c19a4a; margin-left: 8px; }
        .lt-skip {
          cursor: pointer;
          background: transparent;
          border: 1px solid rgba(255, 255, 235, 0.2);
          color: #ffffeb;
          padding: 8px 16px;
          font-family: inherit;
          font-size: 10px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          transition: background 0.2s, color 0.2s;
        }
        .lt-skip:hover {
          background: #c19a4a;
          color: #1c1a18;
        }

        /* ---- peel transition ---------------------------------- */
        .lt-loader.lt-done {
          animation: lt-flicker 7.5s steps(1) infinite,
                     lt-peel 1s cubic-bezier(0.7, 0, 0.2, 1) forwards;
          pointer-events: none;
        }
        @keyframes lt-peel {
          0%   { clip-path: inset(0 0 0 0); }
          100% { clip-path: inset(0 100% 0 0); }
        }

        .lt-edge {
          position: absolute;
          top: 0; right: 0; bottom: 0;
          width: 6px;
          background: #c19a4a;
          box-shadow: 0 0 40px #d43f1b, 0 0 80px #c19a4a;
          opacity: 0;
          animation: lt-edge-glow 1s ease forwards;
          pointer-events: none;
          z-index: 5;
        }
        @keyframes lt-edge-glow {
          0%   { opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes lt-rise {
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 880px) {
          .lt-loader { padding: 24px; }
          .lt-bracket { width: 22px; height: 22px; }
          .lt-tl, .lt-tr { top: 14px; }
          .lt-bl, .lt-br { bottom: 14px; }
          .lt-tl, .lt-bl { left: 14px; }
          .lt-tr, .lt-br { right: 14px; }
          .lt-top { font-size: 9px; gap: 12px; flex-wrap: wrap; }
          .lt-right { gap: 14px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .lt-loader, .lt-loader::after, .lt-bar-fill, .lt-char {
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
