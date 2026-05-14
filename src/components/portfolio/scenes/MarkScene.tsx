"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Brand, LogoVariant } from "@/data/clients";

type Props = {
  brand?: Brand;
  logos: readonly LogoVariant[];
  year?: string;
  location?: string;
};

/* Hard-coded studio backdrop — clients usually don't have a true "ink" in
   their palette, and we want the Mark hero to feel like a photo studio
   regardless. The brand-primary color comes in as the spotlight. */
const STUDIO_BG = "#1c1a18";
const STUDIO_FG = "#fffeeb";

export function MarkScene({ brand, logos, year, location }: Props) {
  if (logos.length === 0) return null;
  const primary = logos[0];

  /* palette resolution — primary + accent only; bg comes from STUDIO_BG */
  const accent =
    brand?.palette.find((p) => p.role === "accent") ?? { hex: "#922700", name: "accent" };
  const primaryCol =
    brand?.palette.find((p) => p.role === "primary") ?? { hex: "#f3a805", name: "primary" };

  const sceneVars: React.CSSProperties & Record<string, string> = {
    "--ms-bg": STUDIO_BG,
    "--ms-fg": STUDIO_FG,
    "--ms-accent": accent.hex,
    "--ms-primary": primaryCol.hex,
  };

  /* Iris-in reveal triggered by IntersectionObserver — robust across
     SSR/hydration timing. State change flips a class that drives a CSS
     transition (clip-path + opacity), so the logo is always rendered
     and only its visibility animates. */
  const [revealed, setRevealed] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setRevealed(true);
            obs.disconnect();
          }
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section aria-label="Brand mark" className="ms-section" style={sceneVars}>
      <p className="ms-eyebrow">
        <span className="ms-rule" />
        Frame · 06 — The Mark
      </p>

      <div className="ms-hero">
        <span className="ms-spotlight" aria-hidden />
        <span className="ms-grain" aria-hidden />

        <span className="ms-bracket ms-tl" aria-hidden />
        <span className="ms-bracket ms-tr" aria-hidden />
        <span className="ms-bracket ms-bl" aria-hidden />
        <span className="ms-bracket ms-br" aria-hidden />

        {/* Left column — production credits */}
        <div className="ms-side ms-side-left">
          <div className="ms-side-top">
            <span>
              <b>Hand-drawn</b>
              <br />
              {location ? `in ${location}` : "in studio"}
            </span>
            <span className="ms-side-sub">{year ?? "—"} · Q1 build</span>
          </div>
          <div className="ms-take">
            <small>Take</small>
            <span className="ms-take-num">01</span>
          </div>
        </div>

        {/* Center — the logo with iris-in reveal */}
        <div className="ms-stage" ref={stageRef}>
          <div className={`ms-mark-wrap ${revealed ? "ms-revealed" : ""}`}>
            <Image
              src={primary.src}
              alt={primary.alt}
              width={420}
              height={420}
              priority={false}
              className="ms-mark"
            />
          </div>
        </div>

        {/* Right column — usage specs */}
        <div className="ms-side ms-side-right">
          <div className="ms-side-top">
            <span>
              <b>Mark</b>
              <br />
              {primary.label ?? "Primary"}
            </span>
          </div>
          <div className="ms-specs">
            <div className="ms-spec">
              <span className="ms-spec-label">Min size</span>
              <span className="ms-spec-val">24px</span>
            </div>
            <div className="ms-spec">
              <span className="ms-spec-label">Clear space</span>
              <span className="ms-spec-val">½ ear</span>
            </div>
            <div className="ms-spec">
              <span className="ms-spec-label">Background</span>
              <span className="ms-spec-val">{primary.background ?? "Light"}</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ms-section {
          --ff-amber: #c19a4a;
          --ff-ivory-15: rgba(255, 255, 235, 0.15);
          --ff-mono: "JetBrains Mono", ui-monospace, monospace;
          --font-display: "Fraunces", Georgia, serif;

          margin: 0 52px;
          padding: 96px 0;
          border-bottom: 1px solid var(--ff-ivory-15);
        }
        .ms-eyebrow {
          font-family: var(--ff-mono);
          font-size: 11px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ff-amber);
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 0 0 56px;
        }
        .ms-rule {
          display: block;
          width: 36px;
          height: 1px;
          background: var(--ff-amber);
        }

        /* HERO -------------------------------------------------------- */
        .ms-hero {
          position: relative;
          background: var(--ms-bg);
          color: var(--ms-fg);
          min-height: 540px;
          display: grid;
          grid-template-columns: 1fr 1.4fr 1fr;
          align-items: stretch;
          overflow: hidden;
          isolation: isolate;
        }
        .ms-spotlight {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 50% 55%,
            color-mix(in srgb, var(--ms-primary) 50%, transparent),
            transparent 55%
          );
          z-index: 0;
          pointer-events: none;
          animation: ms-spot-pulse 6s ease-in-out infinite;
        }
        @keyframes ms-spot-pulse {
          0%, 100% { opacity: 0.85; transform: scale(1); }
          50%      { opacity: 1.05; transform: scale(1.06); }
        }
        .ms-grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: repeating-linear-gradient(
            0deg,
            rgba(255, 255, 235, 0.05) 0 1px,
            transparent 1px 3px
          );
          mix-blend-mode: overlay;
          opacity: 0.5;
          z-index: 1;
        }

        .ms-bracket {
          position: absolute;
          width: 24px;
          height: 24px;
          border-color: var(--ms-fg);
          opacity: 0.55;
          z-index: 3;
        }
        .ms-tl { top: 22px; left: 22px;     border-top: 1px solid; border-left: 1px solid; }
        .ms-tr { top: 22px; right: 22px;    border-top: 1px solid; border-right: 1px solid; }
        .ms-bl { bottom: 22px; left: 22px;  border-bottom: 1px solid; border-left: 1px solid; }
        .ms-br { bottom: 22px; right: 22px; border-bottom: 1px solid; border-right: 1px solid; }

        /* SIDE COLUMNS ------------------------------------------------ */
        .ms-side {
          position: relative;
          z-index: 2;
          padding: 48px 36px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-family: var(--ff-mono);
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }
        .ms-side-left { padding-left: 56px; }
        .ms-side-right { padding-right: 56px; align-items: flex-end; text-align: right; }

        .ms-side-top { line-height: 1.7; opacity: 0.78; }
        .ms-side-top b {
          color: var(--ms-fg);
          opacity: 1;
          font-weight: 500;
          letter-spacing: 0.32em;
        }
        .ms-side-sub {
          display: block;
          margin-top: 8px;
          opacity: 0.55;
        }

        .ms-take {
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 400;
          font-size: 26px;
          letter-spacing: -0.01em;
          text-transform: none;
          opacity: 1;
          color: var(--ms-fg);
        }
        .ms-take small {
          display: block;
          font-family: var(--ff-mono);
          font-style: normal;
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          opacity: 0.55;
          margin-bottom: 4px;
          font-weight: 400;
        }
        .ms-take-num {
          display: inline-block;
          animation: ms-tick 9s steps(1) 4s infinite;
        }
        @keyframes ms-tick {
          0%, 95%, 100% { opacity: 1; transform: translateY(0); }
          96%  { opacity: 0; transform: translateY(-3px); }
          97%  { opacity: 1; transform: translateY(0); }
        }

        .ms-specs {
          display: flex;
          flex-direction: column;
          gap: 14px;
          align-items: flex-end;
        }
        .ms-spec {
          display: flex;
          flex-direction: column;
          gap: 2px;
          line-height: 1.4;
          text-align: right;
        }
        .ms-spec-label {
          font-size: 9px;
          letter-spacing: 0.30em;
          opacity: 0.45;
          color: var(--ms-fg);
        }
        .ms-spec-val {
          font-family: var(--font-display);
          font-style: italic;
          font-size: 18px;
          letter-spacing: -0.01em;
          text-transform: none;
          color: var(--ms-fg);
          opacity: 1;
        }

        /* CENTER STAGE ------------------------------------------------ */
        .ms-stage {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 56px 0;
        }
        .ms-mark-wrap {
          width: clamp(220px, 26vw, 360px);
          aspect-ratio: 1 / 1;
          position: relative;
          opacity: 0;
          transform: scale(0.85);
          clip-path: circle(0% at 50% 50%);
          transition:
            opacity 0.6s ease,
            transform 1.2s cubic-bezier(0.7, 0, 0.2, 1),
            clip-path 1.2s cubic-bezier(0.7, 0, 0.2, 1);
        }
        .ms-mark-wrap.ms-revealed {
          opacity: 1;
          transform: scale(1);
          clip-path: circle(80% at 50% 50%);
          animation: ms-breathe 5s ease-in-out 1.5s infinite;
          animation-fill-mode: backwards;
        }
        @keyframes ms-breathe {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.025); }
        }
        .ms-mark {
          width: 100%;
          height: auto;
          display: block;
        }

        /* RESPONSIVE -------------------------------------------------- */
        @media (max-width: 880px) {
          .ms-section { margin-left: 18px; margin-right: 18px; padding: 60px 0; }
          .ms-hero { grid-template-columns: 1fr; min-height: 0; }
          .ms-side { padding: 28px 32px; align-items: flex-start; text-align: left; }
          .ms-side-left { padding-left: 32px; }
          .ms-side-right { padding-right: 32px; align-items: flex-start; text-align: left; }
          .ms-specs { align-items: flex-start; }
          .ms-spec { text-align: left; }
          .ms-stage { padding: 24px 0 32px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ms-spotlight, .ms-mark-wrap, .ms-take-num {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
