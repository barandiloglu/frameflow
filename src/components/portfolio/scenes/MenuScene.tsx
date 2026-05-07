"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { MenuPage } from "@/data/clients";

type Props = { menu: readonly MenuPage[] };

export function MenuScene({ menu }: Props) {
  if (menu.length === 0) return null;

  return (
    <section aria-label="Menu prop" className="mn-section">
      <p className="mn-eyebrow">
        <span className="mn-rule" />
        Frame · 07 — The Menu
      </p>

      <div className="mn-meta">
        <span>
          Set decoration · Menu · {String(menu.length).padStart(2, "0")} pages
        </span>
        <span className="mn-pulse">Print · Take 01</span>
      </div>

      <div className="mn-stack">
        {menu.map((page, i) => (
          <motion.figure
            key={page.src}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
            className="mn-page"
          >
            <span className="mn-bracket mn-tl" aria-hidden />
            <span className="mn-bracket mn-tr" aria-hidden />
            <span className="mn-bracket mn-bl" aria-hidden />
            <span className="mn-bracket mn-br" aria-hidden />

            <div className="mn-page-tag">
              <span className="mn-page-no">
                {String(i + 1).padStart(2, "0")} / {String(menu.length).padStart(2, "0")}
              </span>
              <span className="mn-page-label">
                {page.label ?? `Spread ${String(i + 1).padStart(2, "0")}`}
              </span>
            </div>

            <div className="mn-page-img">
              <Image
                src={page.src}
                alt={page.alt}
                width={1600}
                height={1066}
                sizes="(max-width: 880px) 100vw, 80vw"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </motion.figure>
        ))}
      </div>

      <style jsx>{`
        .mn-section {
          --ff-amber: #c19a4a;
          --ff-ivory: #fffeeb;
          --ff-ivory-15: rgba(255, 255, 235, 0.15);
          --ff-mono: "JetBrains Mono", ui-monospace, monospace;
          --bb-toast: #c46a2c;

          margin: 0 52px;
          padding: 96px 0;
          border-bottom: 1px solid var(--ff-ivory-15);
        }
        .mn-eyebrow {
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
        .mn-rule { display: block; width: 36px; height: 1px; background: var(--ff-amber); }

        .mn-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 0 32px;
          font-family: var(--ff-mono);
          font-size: 10px;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: rgba(255, 255, 235, 0.6);
        }
        .mn-pulse { display: inline-flex; align-items: center; gap: 8px; color: var(--bb-toast); }
        .mn-pulse::before {
          content: "";
          width: 6px; height: 6px;
          background: var(--bb-toast);
          border-radius: 50%;
          box-shadow: 0 0 0 0 rgba(196, 106, 44, 0.5);
          animation: mn-pulse-dot 2s ease-in-out infinite;
        }
        @keyframes mn-pulse-dot {
          50% { box-shadow: 0 0 0 6px rgba(196, 106, 44, 0); }
        }

        .mn-stack {
          display: flex;
          flex-direction: column;
          gap: 60px;
        }

        .mn-page {
          position: relative;
          margin: 0;
          padding: 32px;
          background: #1c1a18;
          box-shadow: 0 40px 80px -30px rgba(0, 0, 0, 0.5);
          isolation: isolate;
          transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .mn-page:hover { transform: translateY(-4px); }

        .mn-bracket {
          position: absolute;
          width: 22px; height: 22px;
          border-color: var(--ff-ivory);
          opacity: 0.5;
          z-index: 2;
        }
        .mn-tl { top: 14px; left: 14px;     border-top: 1px solid; border-left: 1px solid; }
        .mn-tr { top: 14px; right: 14px;    border-top: 1px solid; border-right: 1px solid; }
        .mn-bl { bottom: 14px; left: 14px;  border-bottom: 1px solid; border-left: 1px solid; }
        .mn-br { bottom: 14px; right: 14px; border-bottom: 1px solid; border-right: 1px solid; }

        .mn-page-tag {
          position: absolute;
          top: 18px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          display: flex;
          gap: 14px;
          font-family: var(--ff-mono);
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255, 254, 235, 0.6);
        }
        .mn-page-no { color: var(--ff-amber); }

        .mn-page-img {
          position: relative;
          z-index: 1;
          margin-top: 28px;
          background: #fffff3;
        }

        @media (max-width: 880px) {
          .mn-section { margin-left: 18px; margin-right: 18px; padding: 60px 0; }
          .mn-stack { gap: 32px; }
          .mn-page { padding: 22px; }
          .mn-page-img { margin-top: 22px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .mn-pulse::before { animation: none; }
        }
      `}</style>
    </section>
  );
}
