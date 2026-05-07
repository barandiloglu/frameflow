"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { WrapperImage } from "@/data/clients";

type Props = { wrapper: readonly WrapperImage[] };

export function WrapperScene({ wrapper }: Props) {
  if (wrapper.length === 0) return null;
  const primary = wrapper[0];

  return (
    <section aria-label="Wrapper / packaging" className="wp-section">
      <p className="wp-eyebrow">
        <span className="wp-rule" />
        Frame · 08 — The Wrapper
      </p>

      <div className="wp-meta">
        <span>Set decoration · Take-away wrapper · Print asset</span>
        <span className="wp-pulse">Print · Take 01</span>
      </div>

      <div className="wp-stage">
        <span className="wp-bracket wp-tl" aria-hidden />
        <span className="wp-bracket wp-tr" aria-hidden />
        <span className="wp-bracket wp-bl" aria-hidden />
        <span className="wp-bracket wp-br" aria-hidden />

        <div className="wp-studio-tag">
          <b>Studio shot</b>
          <br />
          {primary.label ?? "Wrapper"}
        </div>
        <div className="wp-take">
          <small>Take</small>
          08
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          className="wp-print-wrap"
        >
          <div className="wp-print">
            <Image
              src={primary.src}
              alt={primary.alt}
              width={1600}
              height={900}
              sizes="(max-width: 880px) 100vw, 960px"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </div>
        </motion.div>

        <div className="wp-credit">
          <span>
            <b>{primary.label ?? "Take-away wrapper"}</b>
          </span>
          <span className="wp-credit-sub">
            Yellow on black · Repeat pattern · 100% recyclable
          </span>
        </div>
      </div>

      <style jsx>{`
        .wp-section {
          --ff-amber: #c19a4a;
          --ff-ivory: #fffeeb;
          --ff-ivory-15: rgba(255, 255, 235, 0.15);
          --ff-mono: "JetBrains Mono", ui-monospace, monospace;
          --font-display: "Fraunces", Georgia, serif;

          margin: 0 52px;
          padding: 96px 0;
          border-bottom: 1px solid var(--ff-ivory-15);
        }
        .wp-eyebrow {
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
        .wp-rule { display: block; width: 36px; height: 1px; background: var(--ff-amber); }

        .wp-meta {
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
        .wp-pulse {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #c46a2c;
        }
        .wp-pulse::before {
          content: "";
          width: 6px; height: 6px;
          background: #c46a2c;
          border-radius: 50%;
          box-shadow: 0 0 0 0 rgba(196, 106, 44, 0.5);
          animation: wp-pulse-dot 2s ease-in-out infinite;
        }
        @keyframes wp-pulse-dot {
          50% { box-shadow: 0 0 0 6px rgba(196, 106, 44, 0); }
        }

        .wp-stage {
          position: relative;
          background: #1c1a18;
          padding: 64px 56px;
          isolation: isolate;
          overflow: hidden;
          min-height: 480px;
          display: grid;
          grid-template-rows: 1fr auto;
        }
        .wp-stage::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 60% at 50% 40%, rgba(243, 168, 5, 0.18), transparent 60%),
            radial-gradient(ellipse 90% 70% at 50% 110%, rgba(212, 63, 27, 0.14), transparent 60%);
          pointer-events: none;
          z-index: 0;
        }
        .wp-stage::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: repeating-linear-gradient(
            0deg,
            rgba(255, 255, 235, 0.04) 0 1px,
            transparent 1px 3px
          );
          mix-blend-mode: overlay;
          opacity: 0.5;
          z-index: 1;
        }

        .wp-bracket {
          position: absolute;
          width: 22px; height: 22px;
          border-color: var(--ff-ivory);
          opacity: 0.55;
          z-index: 4;
        }
        .wp-tl { top: 22px; left: 22px;     border-top: 1px solid; border-left: 1px solid; }
        .wp-tr { top: 22px; right: 22px;    border-top: 1px solid; border-right: 1px solid; }
        .wp-bl { bottom: 22px; left: 22px;  border-bottom: 1px solid; border-left: 1px solid; }
        .wp-br { bottom: 22px; right: 22px; border-bottom: 1px solid; border-right: 1px solid; }

        .wp-studio-tag {
          position: absolute;
          top: 38px; left: 56px;
          font-family: var(--ff-mono);
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--ff-ivory);
          opacity: 0.7;
          z-index: 3;
          line-height: 1.7;
        }
        .wp-studio-tag b {
          color: var(--ff-ivory);
          opacity: 1;
          font-weight: 500;
          letter-spacing: 0.32em;
        }

        .wp-take {
          position: absolute;
          top: 38px; right: 56px;
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 400;
          font-size: 22px;
          letter-spacing: -0.01em;
          color: var(--ff-ivory);
          z-index: 3;
          text-align: right;
        }
        .wp-take small {
          display: block;
          font-family: var(--ff-mono);
          font-style: normal;
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--ff-ivory);
          opacity: 0.5;
          margin-bottom: 4px;
          font-weight: 400;
        }

        .wp-print-wrap {
          position: relative;
          z-index: 2;
          display: grid;
          place-items: center;
          padding: 56px 0 32px;
          perspective: 2000px;
        }
        .wp-print {
          width: 100%;
          max-width: 960px;
          transform: rotateY(-2deg) rotateX(2deg);
          transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow:
            0 50px 80px -30px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(255, 254, 235, 0.08);
        }
        .wp-print:hover {
          transform: rotateY(2deg) rotateX(-2deg);
        }

        .wp-credit {
          position: relative;
          z-index: 2;
          font-family: var(--ff-mono);
          font-size: 10px;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: rgba(255, 254, 235, 0.6);
          margin-top: 12px;
        }
        .wp-credit b {
          color: var(--ff-ivory);
          opacity: 1;
          font-weight: 500;
          letter-spacing: 0.30em;
        }
        .wp-credit-sub {
          display: block;
          margin-top: 6px;
          opacity: 0.5;
          letter-spacing: 0.22em;
        }

        @media (max-width: 880px) {
          .wp-section { margin-left: 18px; margin-right: 18px; padding: 60px 0; }
          .wp-stage { padding: 56px 24px; min-height: 0; }
          .wp-studio-tag { top: 18px; left: 18px; font-size: 9px; }
          .wp-take { top: 18px; right: 18px; font-size: 18px; }
          .wp-print-wrap { padding: 64px 0 16px; }
          .wp-print:hover { transform: rotateY(-2deg) rotateX(2deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .wp-pulse::before { animation: none; }
        }
      `}</style>
    </section>
  );
}
