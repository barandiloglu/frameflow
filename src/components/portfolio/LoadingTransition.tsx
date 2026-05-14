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
 * 1:1 React port of docs/prototypes/big-bears-loading/index.html.
 * CSS injected via raw <style> tag to avoid styled-jsx scoping
 * weirdness with the absolute-positioned corner brackets.
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

  /* lock body scroll while visible. Restore when the loader is done
     (the cleanup function never fires by itself because the component
     stays mounted by its parent — it just renders null after unmount). */
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  useEffect(() => {
    if (done && typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  }, [done]);

  /* tick the percent counter */
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

  /* auto-dismiss */
  useEffect(() => {
    const lifetime = START_DELAY + FILL_DURATION + PEEL_DELAY;
    const t = setTimeout(() => setDone(true), lifetime);
    return () => clearTimeout(t);
  }, []);

  /* unmount after peel */
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

  /* char cascade — split into words first so each word is atomic for
     line wrapping (each char is display: inline-block, so without a
     word wrapper the browser would happily break "Potato" into "Po"
     and "tato"). */
  const baseDelay = 0.6;
  const step = 0.04;
  let charI = 0;
  const titleNodes = clientName.split(" ").flatMap((word, wi, arr) => {
    const charSpans = Array.from(word).map((ch) => {
      const delay = baseDelay + charI * step;
      charI++;
      return (
        <span
          key={`c-${wi}-${charI}`}
          className="ffl-char"
          style={{ animationDelay: `${delay}s` }}
        >
          {ch}
        </span>
      );
    });
    const wordEl = (
      <span key={`w-${wi}`} className="ffl-word">
        {charSpans}
      </span>
    );
    if (wi === arr.length - 1) return [wordEl];
    /* keep an actual space character between words so the line can
       break here. The cascade index advances by one to preserve
       prototype rhythm. */
    charI++;
    return [wordEl, " "];
  });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: LOADER_CSS }} />

      <div
        className={`ffl-loader${done ? " ffl-done" : ""}`}
        role="status"
        aria-live="polite"
        aria-label={`Loading ${clientName}`}
      >
        <span className="ffl-bracket ffl-tl" aria-hidden />
        <span className="ffl-bracket ffl-tr" aria-hidden />
        <span className="ffl-bracket ffl-bl" aria-hidden />
        <span className="ffl-bracket ffl-br" aria-hidden />

        <div className="ffl-top">
          <span className="ffl-live">REC · NOW LOADING</span>
          <div className="ffl-right">
            <span>FF_ARCHIVE</span>
            <span>VOL 2026</span>
            <span className="ffl-clock">{clock}</span>
          </div>
        </div>

        <div className="ffl-stage">
          <p className="ffl-eyebrow">Now showing — next on the reel</p>
          <p className="ffl-frameno">
            <b>Reel · {frameNumber}</b>
            {location ? ` · ${location}` : ""}
            {year ? ` · ${year}` : ""}
          </p>
          <h1 className="ffl-title" aria-label={clientName}>
            {titleNodes}
          </h1>
          {scope.length > 0 && (
            <div className="ffl-scope">
              {scope.map((s) => (
                <span key={s} className="ffl-tag">
                  {s}
                </span>
              ))}
            </div>
          )}
          <div className="ffl-bar-wrap">
            <div className="ffl-bar">
              <span className="ffl-bar-fill" />
            </div>
            <span className="ffl-bar-percent">
              {String(percent).padStart(3, "0")} %
            </span>
          </div>
        </div>

        <div className="ffl-bottom">
          <div className="ffl-status">
            <span className="ffl-label">Status</span>
            <span className="ffl-val">Cueing take 01</span>
          </div>
          <button
            type="button"
            className="ffl-skip"
            onClick={() => setDone(true)}
          >
            Skip intro →
          </button>
        </div>
      </div>
    </>
  );
}

/* ---------------------------------------------------------------- */
/*  CSS — verbatim port of docs/prototypes/big-bears-loading        */
/*  with class prefix `ffl-` to avoid collisions.                   */
/* ---------------------------------------------------------------- */
const LOADER_CSS = `
.ffl-loader {
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
  animation: ffl-flicker 7.5s steps(1) infinite;
  overflow: hidden;
}
@keyframes ffl-flicker {
  0%, 96%, 100% { filter: brightness(1) contrast(1); }
  97%           { filter: brightness(0.92) contrast(1.08); }
  98%           { filter: brightness(1.04) contrast(0.97); }
  99%           { filter: brightness(0.97) contrast(1.04); }
}

/* film grain */
.ffl-loader::before {
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
.ffl-loader::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background:
    radial-gradient(ellipse 50% 40% at 75% 25%, rgba(196, 154, 74, 0.18), transparent 60%),
    radial-gradient(ellipse 60% 50% at 20% 80%, rgba(212, 63, 27, 0.12), transparent 65%);
  animation: ffl-leak 9s ease-in-out infinite;
}
@keyframes ffl-leak {
  0%, 100% { opacity: 0.85; transform: scale(1); }
  50%      { opacity: 1.05; transform: scale(1.04); }
}

/* the rails + stage stack vertically; everything else stays absolute */
.ffl-top, .ffl-stage, .ffl-bottom { position: relative; z-index: 2; }
.ffl-top    { flex: 0 0 auto; }
.ffl-bottom { flex: 0 0 auto; }
.ffl-stage  {
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

/* ---- corner brackets — the "frame" around the loading screen ---- */
.ffl-bracket {
  position: absolute;
  width: 28px;
  height: 28px;
  border: 0 solid #c19a4a;
  opacity: 0.55;
  z-index: 4;
  pointer-events: none;
}
.ffl-tl {
  top: 22px; left: 22px;
  border-top-width: 1px;
  border-left-width: 1px;
}
.ffl-tr {
  top: 22px; right: 22px;
  border-top-width: 1px;
  border-right-width: 1px;
}
.ffl-bl {
  bottom: 22px; left: 22px;
  border-bottom-width: 1px;
  border-left-width: 1px;
}
.ffl-br {
  bottom: 22px; right: 22px;
  border-bottom-width: 1px;
  border-right-width: 1px;
}

/* ---- top rail ---- */
.ffl-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(255, 255, 235, 0.6);
}
.ffl-live {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #d43f1b;
  font-weight: 500;
}
.ffl-live::before {
  content: "";
  width: 8px;
  height: 8px;
  background: #d43f1b;
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(212, 63, 27, 0.5);
  animation: ffl-pulse 1.4s ease-in-out infinite;
}
@keyframes ffl-pulse {
  50% { box-shadow: 0 0 0 6px rgba(212, 63, 27, 0); }
}
.ffl-right { display: flex; gap: 24px; }
.ffl-clock { color: #c19a4a; font-feature-settings: "tnum" 1; }

/* ---- center stage ---- */
.ffl-eyebrow {
  font-size: 11px;
  letter-spacing: 0.34em;
  text-transform: uppercase;
  color: #c19a4a;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 14px;
  opacity: 0;
  animation: ffl-rise 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s forwards;
}
.ffl-eyebrow::before {
  content: "";
  width: 36px;
  height: 1px;
  background: #c19a4a;
}

.ffl-frameno {
  font-family: "Fraunces", Georgia, serif;
  font-style: italic;
  font-weight: 400;
  font-size: clamp(28px, 3vw, 48px);
  line-height: 1;
  letter-spacing: -0.01em;
  color: #ffffeb;
  margin: 0;
  opacity: 0;
  animation: ffl-rise 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 0.4s forwards;
}
.ffl-frameno b { color: #c19a4a; font-weight: 400; }

.ffl-title {
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
.ffl-word {
  display: inline-block;
  white-space: nowrap;
}
.ffl-char {
  display: inline-block;
  opacity: 0;
  transform: translateY(70%) rotate(6deg);
  animation: ffl-char-drop 0.85s cubic-bezier(0.7, 0, 0.2, 1) forwards;
  will-change: transform, opacity;
}
@keyframes ffl-char-drop {
  to { opacity: 1; transform: translateY(0) rotate(0); }
}

.ffl-scope {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
  opacity: 0;
  animation: ffl-rise 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 1s forwards;
}
.ffl-tag {
  border: 1px solid rgba(196, 154, 74, 0.35);
  padding: 6px 12px;
  font-size: 9px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #c19a4a;
}

.ffl-bar-wrap {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 24px;
  align-items: center;
  margin-top: 16px;
  opacity: 0;
  animation: ffl-rise 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 1.6s forwards;
}
.ffl-bar {
  position: relative;
  height: 2px;
  background: rgba(255, 255, 235, 0.15);
  overflow: hidden;
}
.ffl-bar-fill {
  position: absolute;
  inset: 0;
  background: #c19a4a;
  transform: scaleX(0);
  transform-origin: left;
  animation: ffl-fill 1.6s linear 1.7s forwards;
}
@keyframes ffl-fill { to { transform: scaleX(1); } }

.ffl-bar-percent {
  font-size: 10px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #c19a4a;
  font-feature-settings: "tnum" 1;
  width: 72px;
  text-align: right;
}

/* ---- bottom rail ---- */
.ffl-bottom {
  display: flex;
  justify-content: space-between;
  align-items: end;
  font-size: 10px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(255, 255, 235, 0.4);
}
.ffl-label { color: rgba(255, 255, 235, 0.4); }
.ffl-val   { color: #c19a4a; margin-left: 8px; }
.ffl-skip {
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
.ffl-skip:hover {
  background: #c19a4a;
  color: #1c1a18;
}

/* ---- peel transition + ember edge ---- */
.ffl-loader.ffl-done {
  animation: ffl-flicker 7.5s steps(1) infinite,
             ffl-peel 1s cubic-bezier(0.7, 0, 0.2, 1) forwards;
  pointer-events: none;
}
@keyframes ffl-peel {
  0%   { clip-path: inset(0 0 0 0); }
  100% { clip-path: inset(0 100% 0 0); }
}
.ffl-loader.ffl-done::after {
  content: "";
  position: absolute;
  top: 0; right: 0; bottom: 0;
  width: 6px;
  background: #c19a4a;
  box-shadow: 0 0 40px #d43f1b, 0 0 80px #c19a4a;
  opacity: 0;
  animation: ffl-edge-glow 1s ease forwards;
  pointer-events: none;
  z-index: 5;
}
@keyframes ffl-edge-glow {
  0%   { opacity: 0; }
  20%  { opacity: 1; }
  80%  { opacity: 1; }
  100% { opacity: 0; }
}

@keyframes ffl-rise {
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 880px) {
  .ffl-loader { padding: 24px; }
  .ffl-bracket { width: 22px; height: 22px; }
  .ffl-tl, .ffl-tr { top: 14px; }
  .ffl-bl, .ffl-br { bottom: 14px; }
  .ffl-tl, .ffl-bl { left: 14px; }
  .ffl-tr, .ffl-br { right: 14px; }
  .ffl-top { font-size: 9px; gap: 12px; flex-wrap: wrap; }
  .ffl-right { gap: 14px; }
}

@media (prefers-reduced-motion: reduce) {
  .ffl-loader, .ffl-loader::after, .ffl-bar-fill, .ffl-char {
    animation-duration: 0.01ms !important;
  }
}
`;
