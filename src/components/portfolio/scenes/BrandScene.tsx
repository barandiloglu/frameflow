"use client";

import { motion } from "framer-motion";
import type { Brand } from "@/data/clients";

type Props = {
  brand: Brand;
  clientName: string;
  frameNumber: string;
};

const escapeName = (n: string) => n.replace(/"/g, '\\"');

const buildFontHref = (typefaces: Brand["typefaces"]): string | null => {
  const families = typefaces
    .filter((t) => t.googleFontName)
    .map(
      (t) =>
        `family=${encodeURIComponent(t.googleFontName!)}${
          t.weights ? ":wght@" + t.weights : ""
        }`
    );
  if (families.length === 0) return null;
  return `https://fonts.googleapis.com/css2?${families.join("&")}&display=swap`;
};

export function BrandScene({ brand, clientName, frameNumber }: Props) {
  /* role-based palette resolution with sane fallbacks */
  const primary =
    brand.palette.find((p) => p.role === "primary") ?? brand.palette[0];
  const surface =
    brand.palette.find((p) => p.role === "surface") ??
    brand.palette[brand.palette.length - 1];
  const accent =
    brand.palette.find((p) => p.role === "accent") ?? brand.palette[2];
  const ink =
    brand.palette.find((p) => p.role === "ink") ??
    brand.palette.find((p) => p.role === "secondary") ??
    brand.palette[1];

  const display =
    brand.typefaces.find((t) => t.role === "Display") ?? brand.typefaces[0];
  const body =
    brand.typefaces.find((t) => t.role === "Body") ?? brand.typefaces[1];

  const fontHref = buildFontHref(brand.typefaces);

  /* tripled palette so the marquee loops seamlessly */
  const filmstripPalette = [
    ...brand.palette,
    ...brand.palette,
    ...brand.palette,
  ];

  /* CSS vars scoped to the section root */
  const sceneVars: React.CSSProperties & Record<string, string> = {
    "--brand-primary": primary.hex,
    "--brand-surface": surface.hex,
    "--brand-accent": accent.hex,
    "--brand-ink": ink.hex,
    "--brand-display": display ? `"${escapeName(display.name)}", serif` : "serif",
    "--brand-body": body ? `"${escapeName(body.name)}", sans-serif` : "sans-serif",
  };

  /* wordmark cascade — wrap each non-space char in a span with staggered delay */
  const wordmarkChars = (() => {
    const baseDelay = 1.85;
    const step = 0.04;
    let i = 0;
    return Array.from(clientName).map((ch) => {
      if (ch === " ") {
        i++;
        return <span key={`sp-${i}`}>&nbsp;</span>;
      }
      const delay = baseDelay + i * step;
      i++;
      return (
        <span
          key={`ch-${i}`}
          className="bs-char"
          style={{ animationDelay: `${delay}s` }}
        >
          {ch}
        </span>
      );
    });
  })();

  return (
    <>
      {/* Google Fonts — React 19 hoists <link> to <head> */}
      {fontHref && <link rel="stylesheet" href={fontHref} />}

      <section
        aria-label={`${clientName} — brand`}
        style={sceneVars}
        className="brand-scene"
      >
        {/* ============================================================ */}
        {/*  FRAME 03 — THE SCENE                                       */}
        {/* ============================================================ */}
        <div className="bs-scene">
          {/* sweep reveal — covers the scene then peels right-to-left */}
          <div className="bs-sweep" aria-hidden />

          {/* film perforations on the left margin */}
          <div className="bs-perfs" aria-hidden />

          {/* corner brackets snap in after the sweep */}
          <span className="bs-bracket bs-tl" aria-hidden />
          <span className="bs-bracket bs-tr" aria-hidden />
          <span className="bs-bracket bs-bl" aria-hidden />
          <span className="bs-bracket bs-br" aria-hidden />

          <div className="bs-meta">
            <span>
              FF#{frameNumber} · Reel &apos;26
            </span>
            <span className="bs-pulse">Brand · Take 01</span>
          </div>

          <div className="bs-stage">
            <div className="bs-stage-inner">
              {brand.eyebrow && (
                <p className="bs-eyebrow">
                  <span className="bs-eyebrow-rule" />
                  {brand.eyebrow}
                </p>
              )}

              <h2 className="bs-wordmark" aria-label={clientName}>
                {wordmarkChars}
              </h2>

              {brand.tagline && (
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 3.0, ease: [0.2, 0.8, 0.2, 1] }}
                  className="bs-tagline"
                >
                  {brand.tagline}
                </motion.p>
              )}
            </div>
          </div>

          <div className="bs-credit">
            <div className="bs-credit-left">
              <span>
                <b>Brand kit</b> · {display.name}
                {body ? ` + ${body.name}` : ""}
              </span>
              <span className="bs-credit-sub">2024 · Q1 build</span>
            </div>
            <div className="bs-credit-right">
              <small>Take</small>
              <span className="bs-take-num">01</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  FRAME 04 — THE PALETTE (auto-scrolling filmstrip)          */}
        {/* ============================================================ */}
        <div className="bs-filmstrip-wrap">
          <div className="bs-filmstrip-label">
            <span>
              <b>Frame · 04</b>
              The Palette
            </span>
            <span className="bs-pause-hint">Hover to pause →</span>
          </div>

          <div className="bs-filmstrip-mask">
            <div className="bs-filmstrip-track">
              {filmstripPalette.map((sw, i) => {
                const idx = i % brand.palette.length;
                const isCream =
                  sw.role === "surface" || /cream|ivory|white/i.test(sw.name);
                return (
                  <div
                    key={`${sw.hex}-${i}`}
                    className={`bs-swatch ${isCream ? "bs-swatch-light" : ""}`}
                    style={{ background: sw.hex }}
                    aria-hidden={i >= brand.palette.length}
                  >
                    <span className="bs-perfs-top" aria-hidden />
                    <span className="bs-swatch-no">
                      / {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="bs-swatch-name-block">
                      {sw.role && (
                        <span className="bs-swatch-role">{sw.role}</span>
                      )}
                      <span className="bs-swatch-name">{sw.name}</span>
                      <span className="bs-swatch-hex">
                        {sw.hex.toUpperCase()}
                      </span>
                    </div>
                    <span className="bs-perfs-bottom" aria-hidden />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  FRAME 05 — THE TYPE                                        */}
        {/* ============================================================ */}
        <div className="bs-typespec">
          <div className="bs-typespec-label">
            <span>
              <b>Frame · 05</b>
              The Type
            </span>
          </div>

          {display && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7 }}
              className="bs-specimen"
            >
              <p className="bs-spec-role">Display</p>
              <p className="bs-spec-face">{display.name}</p>
              <p className="bs-glyph-display">
                <em>Aa</em>Bb
              </p>
              <p className="bs-spec-set">
                Aa Bb Cc Dd Ee Ff Gg &amp; 0123
              </p>
            </motion.div>
          )}

          {body && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="bs-specimen"
            >
              <p className="bs-spec-role">Body</p>
              <p className="bs-spec-face">{body.name}</p>
              <p className="bs-glyph-body">
                A potato is a small private rebellion against the cold
                <span className="bs-caret" aria-hidden />
              </p>
              {body.weights && (
                <div className="bs-body-grid">
                  {body.weights.split(";").map((w) => (
                    <div key={w}>
                      <b>Weight</b>
                      {w}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      <style jsx>{`
        /* =========================================================
           Tokens shared with the FF chrome
           ========================================================= */
        .brand-scene {
          --ff-graphite: #353230;
          --ff-ivory:    #ffffeb;
          --ff-amber:    #c19a4a;
          --ff-ember:    #d43f1b;
          --ff-ivory-60: rgba(255, 255, 235, 0.60);
          --ff-ivory-40: rgba(255, 255, 235, 0.40);
          --ff-ivory-15: rgba(255, 255, 235, 0.15);
          --ff-ivory-08: rgba(255, 255, 235, 0.08);
          --ff-mono: "JetBrains Mono", ui-monospace, monospace;

          --ease-cinematic: cubic-bezier(0.7, 0, 0.2, 1);
          --ease-soft:      cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        /* =========================================================
           FRAME 03 — THE SCENE
           ========================================================= */
        .bs-scene {
          position: relative;
          margin: 60px 52px 0;
          background: var(--brand-primary);
          color: var(--brand-surface);
          overflow: hidden;
          isolation: isolate;
          min-height: 78vh;
          display: grid;
          grid-template-rows: auto 1fr auto;
          box-shadow:
            0 1px 0 var(--ff-ivory-15),
            0 60px 120px -40px rgba(0, 0, 0, 0.5);
          animation: bs-flicker 7.5s steps(1) infinite;
        }
        @keyframes bs-flicker {
          0%, 96%, 100% { filter: brightness(1) contrast(1); }
          97%           { filter: brightness(0.92) contrast(1.08); }
          98%           { filter: brightness(1.04) contrast(0.97); }
          99%           { filter: brightness(0.97) contrast(1.04); }
        }

        /* film grain overlay */
        .bs-scene::before {
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
          opacity: 0.6;
          animation: bs-grain 2.4s steps(8) infinite;
        }
        @keyframes bs-grain {
          0%   { transform: translate(0, 0); }
          20%  { transform: translate(-1px, 1px); }
          40%  { transform: translate(1px, -1px); }
          60%  { transform: translate(-1px, 0); }
          80%  { transform: translate(0, 1px); }
          100% { transform: translate(0, 0); }
        }

        /* ember light-leak that breathes */
        .bs-scene::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background:
            radial-gradient(ellipse 60% 40% at 70% 30%, color-mix(in srgb, var(--brand-accent) 42%, transparent), transparent 60%),
            radial-gradient(ellipse 80% 50% at 20% 80%, color-mix(in srgb, var(--brand-ink) 50%, transparent), transparent 65%);
          animation: bs-breathe 9s ease-in-out infinite;
        }
        @keyframes bs-breathe {
          0%, 100% { opacity: 0.85; transform: scale(1); }
          50%      { opacity: 1.05; transform: scale(1.04); }
        }

        /* SWEEP reveal — char-colored cover that peels right */
        .bs-sweep {
          position: absolute;
          inset: 0;
          z-index: 8;
          background: var(--brand-ink);
          transform-origin: right center;
          animation: bs-sweep-out 1.15s var(--ease-cinematic) 0.35s forwards;
        }
        .bs-sweep::after {
          content: "";
          position: absolute;
          top: 0; right: 0; bottom: 0;
          width: 4px;
          background: var(--brand-surface);
          box-shadow: 0 0 32px var(--brand-accent);
          animation: bs-sweep-edge 1.15s var(--ease-cinematic) 0.35s forwards;
        }
        @keyframes bs-sweep-out {
          to { transform: scaleX(0); }
        }
        @keyframes bs-sweep-edge {
          0%   { opacity: 0; }
          8%   { opacity: 1; }
          90%  { opacity: 1; }
          100% { opacity: 0; }
        }

        /* corner brackets snap in after the sweep */
        .bs-bracket {
          position: absolute;
          width: 26px;
          height: 26px;
          border-color: var(--brand-surface);
          opacity: 0;
          z-index: 4;
          animation: bs-bracket-in 0.5s var(--ease-soft) forwards;
        }
        .bs-tl { top: 22px; left: 22px;     border-top: 1px solid; border-left: 1px solid; animation-delay: 1.45s; }
        .bs-tr { top: 22px; right: 22px;    border-top: 1px solid; border-right: 1px solid; animation-delay: 1.55s; }
        .bs-bl { bottom: 22px; left: 22px;  border-bottom: 1px solid; border-left: 1px solid; animation-delay: 1.65s; }
        .bs-br { bottom: 22px; right: 22px; border-bottom: 1px solid; border-right: 1px solid; animation-delay: 1.75s; }
        @keyframes bs-bracket-in {
          0%   { opacity: 0; transform: scale(0.4); }
          60%  { opacity: 1; transform: scale(1.1); }
          100% { opacity: 0.78; transform: scale(1); }
        }

        /* film perforations on the left margin */
        .bs-perfs {
          position: absolute;
          top: 0; bottom: 0;
          left: 0;
          width: 16px;
          background: repeating-linear-gradient(
            to bottom,
            var(--brand-ink) 0 22px,
            transparent 22px 38px
          );
          z-index: 4;
          opacity: 0;
          animation: bs-rise 0.6s var(--ease-soft) 1.7s forwards;
        }

        @keyframes bs-rise {
          to { opacity: 1; transform: translateY(0); }
        }

        /* META STRIP (top) */
        .bs-meta {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 38px 56px 0 86px;
          font-family: var(--ff-mono);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.26em;
          color: var(--brand-surface);
          opacity: 0;
          animation: bs-rise 0.6s var(--ease-soft) 1.85s forwards;
          transform: translateY(0);
        }
        .bs-pulse {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--brand-accent);
        }
        .bs-pulse::before {
          content: "";
          width: 6px; height: 6px;
          background: var(--brand-accent);
          border-radius: 50%;
          box-shadow: 0 0 0 0 color-mix(in srgb, var(--brand-accent) 50%, transparent);
          animation: bs-pulse-dot 1.8s ease-in-out infinite;
        }
        @keyframes bs-pulse-dot {
          50% { box-shadow: 0 0 0 6px color-mix(in srgb, var(--brand-accent) 0%, transparent); }
        }

        /* CENTER STAGE */
        .bs-stage {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          padding: 0 56px 0 86px;
        }
        .bs-stage-inner {
          max-width: 1500px;
          width: 100%;
          margin: 0 auto;
        }

        /* eyebrow */
        .bs-eyebrow {
          font-family: var(--ff-mono);
          font-size: 11px;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          color: var(--brand-accent);
          margin: 0 0 28px;
          display: flex;
          align-items: center;
          gap: 14px;
          opacity: 0;
          animation: bs-rise 0.7s var(--ease-soft) 1.9s forwards;
        }
        .bs-eyebrow-rule {
          content: "";
          display: block;
          width: 36px;
          height: 1px;
          background: var(--brand-accent);
          transform-origin: left;
          transform: scaleX(0);
          animation: bs-rule-in 0.6s var(--ease-cinematic) 1.95s forwards;
          flex-shrink: 0;
        }
        @keyframes bs-rule-in { to { transform: scaleX(1); } }

        /* WORDMARK — char cascade */
        .bs-wordmark {
          font-family: var(--brand-display);
          font-weight: 400;
          font-size: clamp(64px, 11vw, 184px);
          line-height: 0.92;
          letter-spacing: -0.025em;
          color: var(--brand-surface);
          margin: 0;
          text-wrap: balance;
          max-width: 12ch;
          cursor: default;
          transition: letter-spacing 0.5s var(--ease-soft);
        }
        .bs-wordmark:hover { letter-spacing: -0.01em; }
        .bs-wordmark .bs-char {
          display: inline-block;
          opacity: 0;
          transform: translateY(60%) rotate(6deg);
          animation: bs-char-drop 0.85s var(--ease-cinematic) forwards;
          will-change: transform, opacity;
        }
        @keyframes bs-char-drop {
          to { opacity: 1; transform: translateY(0) rotate(0); }
        }

        /* TAGLINE */
        .bs-tagline {
          margin: 32px 0 0;
          max-width: 680px;
          font-family: var(--brand-body);
          font-weight: 400;
          font-size: clamp(20px, 1.8vw, 28px);
          line-height: 1.5;
          letter-spacing: -0.005em;
          color: var(--brand-surface);
        }

        /* BOTTOM CREDITS */
        .bs-credit {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: end;
          padding: 0 56px 38px 86px;
          font-family: var(--ff-mono);
          font-size: 10px;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--brand-surface);
          opacity: 0;
          animation: bs-rise 0.8s var(--ease-soft) 3.2s forwards;
        }
        .bs-credit-left { line-height: 1.7; opacity: 0.78; }
        .bs-credit-left b {
          color: var(--brand-surface);
          opacity: 1;
          font-weight: 500;
          letter-spacing: 0.30em;
        }
        .bs-credit-sub {
          display: block;
          opacity: 0.55;
          margin-top: 6px;
        }
        .bs-credit-right {
          font-family: var(--brand-display);
          font-weight: 400;
          font-style: italic;
          font-size: 28px;
          letter-spacing: -0.01em;
          color: var(--brand-surface);
          text-align: right;
        }
        .bs-credit-right small {
          display: block;
          font-family: var(--ff-mono);
          font-style: normal;
          font-size: 9px;
          letter-spacing: 0.28em;
          opacity: 0.55;
          margin-bottom: 4px;
          font-weight: 400;
        }
        .bs-take-num {
          display: inline-block;
          animation: bs-tick 9s steps(1) 5s infinite;
        }
        @keyframes bs-tick {
          0%, 95%, 100% { opacity: 1; transform: translateY(0); }
          96%  { opacity: 0; transform: translateY(-4px); }
          97%  { opacity: 1; transform: translateY(0); }
        }

        /* =========================================================
           FRAME 04 — THE PALETTE
           ========================================================= */
        .bs-filmstrip-wrap {
          margin: 0 52px;
          padding: 28px 0;
          border-bottom: 1px solid var(--ff-ivory-15);
          display: grid;
          grid-template-columns: 140px 1fr;
          align-items: stretch;
          overflow: hidden;
          opacity: 0;
          animation: bs-rise 0.8s var(--ease-soft) 3.4s forwards;
        }
        .bs-filmstrip-label {
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-family: var(--ff-mono);
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--ff-ivory-40);
          border-right: 1px solid var(--ff-ivory-08);
          padding-right: 12px;
        }
        .bs-filmstrip-label b {
          display: block;
          color: var(--ff-amber);
          font-weight: 500;
          letter-spacing: 0.32em;
          margin-bottom: 4px;
        }
        .bs-pause-hint {
          margin-top: 18px;
          font-size: 8.5px;
          letter-spacing: 0.32em;
          color: rgba(255, 255, 235, 0.30);
        }

        .bs-filmstrip-mask {
          position: relative;
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%);
        }

        .bs-filmstrip-track {
          display: flex;
          width: max-content;
          animation: bs-filmscroll 32s linear infinite;
        }
        .bs-filmstrip-track:hover { animation-play-state: paused; }
        @keyframes bs-filmscroll {
          to { transform: translateX(-33.333%); }
        }

        .bs-swatch {
          position: relative;
          flex: 0 0 280px;
          min-height: 220px;
          padding: 28px 24px 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.5s var(--ease-soft);
          border-right: 1px solid rgba(0, 0, 0, 0.18);
        }
        .bs-swatch:hover { transform: translateY(-6px); }

        /* perforation dots — top + bottom of each frame */
        .bs-perfs-top, .bs-perfs-bottom {
          position: absolute;
          left: 0; right: 0;
          height: 8px;
          background-image: radial-gradient(
            circle at 12px center,
            var(--ff-graphite) 3px,
            transparent 3.5px
          );
          background-size: 24px 8px;
          background-repeat: repeat-x;
          pointer-events: none;
        }
        .bs-perfs-top { top: 0; }
        .bs-perfs-bottom { bottom: 0; }

        .bs-swatch-no, .bs-swatch-name, .bs-swatch-hex, .bs-swatch-role {
          mix-blend-mode: difference;
          color: white;
        }
        .bs-swatch-no {
          font-family: var(--ff-mono);
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          opacity: 0.85;
        }
        .bs-swatch-name-block {
          display: flex;
          flex-direction: column;
          gap: 6px;
          align-items: flex-start;
        }
        .bs-swatch-role {
          font-family: var(--ff-mono);
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(8px);
          transition: all 0.4s var(--ease-soft);
        }
        .bs-swatch:hover .bs-swatch-role {
          opacity: 0.65;
          transform: translateY(0);
        }
        .bs-swatch-name {
          font-family: var(--brand-display);
          font-weight: 400;
          font-size: 32px;
          line-height: 1;
          letter-spacing: -0.01em;
        }
        .bs-swatch-hex {
          font-family: var(--ff-mono);
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          opacity: 0.7;
        }

        /* on light surfaces, mix-blend-difference inverts poorly — disable it */
        .bs-swatch-light .bs-swatch-no,
        .bs-swatch-light .bs-swatch-name,
        .bs-swatch-light .bs-swatch-hex,
        .bs-swatch-light .bs-swatch-role {
          mix-blend-mode: normal;
          color: var(--brand-ink);
        }
        .bs-swatch-light .bs-swatch-no { opacity: 0.7; }
        .bs-swatch-light .bs-swatch-hex { opacity: 0.55; }

        /* =========================================================
           FRAME 05 — THE TYPE
           ========================================================= */
        .bs-typespec {
          margin: 0 52px;
          padding: 80px 0 96px;
          display: grid;
          grid-template-columns: 140px 1fr 1fr;
          gap: 0;
          border-bottom: 1px solid var(--ff-ivory-15);
          opacity: 0;
          animation: bs-rise 0.8s var(--ease-soft) 3.6s forwards;
        }
        .bs-typespec-label {
          font-family: var(--ff-mono);
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--ff-ivory-40);
          padding-top: 6px;
          padding-right: 12px;
          border-right: 1px solid var(--ff-ivory-08);
        }
        .bs-typespec-label b {
          display: block;
          color: var(--ff-amber);
          font-weight: 500;
          letter-spacing: 0.32em;
          margin-bottom: 4px;
        }

        .bs-specimen {
          padding: 0 36px;
          border-right: 1px solid var(--ff-ivory-08);
        }
        .bs-specimen:last-child { border-right: none; }

        .bs-spec-role {
          font-family: var(--ff-mono);
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--ff-amber);
          margin: 0 0 10px;
        }
        .bs-spec-face {
          font-family: var(--ff-mono);
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ff-ivory-60);
          margin: 0 0 28px;
        }

        .bs-glyph-display {
          font-family: var(--brand-display);
          font-weight: 400;
          font-size: clamp(96px, 11vw, 168px);
          line-height: 0.85;
          letter-spacing: -0.025em;
          color: var(--ff-ivory);
          margin: 0 0 16px;
        }
        .bs-glyph-display em {
          font-style: italic;
          color: var(--brand-primary);
          animation: bs-glyph-cycle 7s steps(4) infinite;
          display: inline-block;
        }
        @keyframes bs-glyph-cycle {
          0%   { color: var(--brand-primary); }
          25%  { color: var(--brand-accent); }
          50%  { color: var(--brand-surface); }
          75%  { color: var(--brand-ink); }
          100% { color: var(--brand-primary); }
        }

        .bs-spec-set {
          font-family: var(--brand-display);
          font-weight: 400;
          font-size: 16px;
          letter-spacing: 0.06em;
          color: var(--ff-ivory-60);
          text-transform: uppercase;
        }

        .bs-glyph-body {
          font-family: var(--brand-body);
          font-weight: 300;
          font-size: clamp(28px, 3vw, 44px);
          line-height: 1.25;
          letter-spacing: -0.01em;
          color: var(--ff-ivory);
          margin: 0 0 22px;
          max-width: 28ch;
        }
        .bs-caret {
          display: inline-block;
          width: 0.6ch;
          height: 0.9em;
          background: var(--brand-primary);
          vertical-align: -3px;
          margin-left: 4px;
          animation: bs-caret-blink 0.9s steps(1) infinite;
        }
        @keyframes bs-caret-blink {
          0%, 50%   { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .bs-body-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(60px, auto));
          gap: 16px 32px;
          font-family: var(--brand-body);
          font-weight: 400;
          font-size: 14px;
          color: var(--ff-ivory-60);
        }
        .bs-body-grid b {
          display: block;
          font-family: var(--ff-mono);
          font-weight: 500;
          font-size: 9px;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--ff-amber);
          margin-bottom: 4px;
        }

        /* =========================================================
           RESPONSIVE
           ========================================================= */
        @media (max-width: 880px) {
          .bs-scene { margin: 28px 18px 0; min-height: 64vh; }
          .bs-meta, .bs-credit { padding-left: 36px; padding-right: 26px; }
          .bs-stage { padding-left: 36px; padding-right: 26px; }
          .bs-filmstrip-wrap, .bs-typespec { margin-left: 18px; margin-right: 18px; grid-template-columns: 1fr; }
          .bs-filmstrip-label, .bs-typespec-label { display: none; }
          .bs-typespec { grid-template-columns: 1fr; gap: 60px; }
          .bs-specimen { padding: 0; border-right: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .bs-scene, .bs-scene::before, .bs-scene::after,
          .bs-sweep, .bs-bracket, .bs-wordmark .bs-char,
          .bs-glyph-display em, .bs-caret, .bs-pulse::before,
          .bs-take-num, .bs-filmstrip-track, .bs-eyebrow-rule {
            animation: none !important;
          }
          .bs-sweep { display: none; }
        }
      `}</style>
    </>
  );
}
