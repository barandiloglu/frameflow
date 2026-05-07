"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import type { MenuPage } from "@/data/clients";

type Props = { menu: readonly MenuPage[] };

export function MenuScene({ menu }: Props) {
  const [active, setActive] = useState(0);
  if (menu.length === 0) return null;
  const current = menu[active];

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

      {/* TWO-COLUMN: hero left, thumbs vertical right */}
      <div className="mn-viewer">
        <motion.figure
          key={current.src}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="mn-page"
        >
          <span className="mn-bracket mn-tl" aria-hidden />
          <span className="mn-bracket mn-tr" aria-hidden />
          <span className="mn-bracket mn-bl" aria-hidden />
          <span className="mn-bracket mn-br" aria-hidden />

          <div className="mn-page-tag">
            <span className="mn-page-no">
              {String(active + 1).padStart(2, "0")} / {String(menu.length).padStart(2, "0")}
            </span>
            <span className="mn-page-label">
              {current.label ?? `Spread ${String(active + 1).padStart(2, "0")}`}
            </span>
          </div>

          <div className="mn-page-img">
            <Image
              src={current.src}
              alt={current.alt}
              width={1600}
              height={1066}
              sizes="(max-width: 1080px) 100vw, 65vw"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                maxHeight: "calc(100vh - 220px)",
                objectFit: "contain",
              }}
            />
          </div>
        </motion.figure>

        {/* RIGHT — thumb column */}
        <div className="mn-thumbs">
          <p className="mn-thumbs-eyebrow">All spreads</p>
          {menu.map((page, i) => (
            <button
              key={page.src}
              type="button"
              onClick={() => setActive(i)}
              className={`mn-thumb ${i === active ? "mn-thumb-active" : ""}`}
              aria-label={`Show ${page.label ?? `Spread ${i + 1}`}`}
            >
              <span className="mn-thumb-img">
                <Image
                  src={page.src}
                  alt=""
                  fill
                  sizes="(max-width: 1080px) 33vw, 220px"
                  style={{ objectFit: "contain", background: "#fffff3" }}
                />
              </span>
              <span className="mn-thumb-label">
                <span className="mn-thumb-no">
                  {String(i + 1).padStart(2, "0")} / {String(menu.length).padStart(2, "0")}
                </span>
                {page.label ?? `Spread ${String(i + 1).padStart(2, "0")}`}
              </span>
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .mn-section {
          --ff-amber: #c19a4a;
          --ff-ivory: #fffeeb;
          --ff-ivory-15: rgba(255, 255, 235, 0.15);
          --ff-mono: "JetBrains Mono", ui-monospace, monospace;
          --bb-toast: #c46a2c;

          margin: 0 52px;
          padding: 64px 0;
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
          margin: 0 0 36px;
        }
        .mn-rule { display: block; width: 36px; height: 1px; background: var(--ff-amber); }

        .mn-meta {
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

        /* TWO-COLUMN VIEWER */
        .mn-viewer {
          display: grid;
          grid-template-columns: minmax(0, 2.4fr) minmax(0, 1fr);
          gap: 24px;
          align-items: start;
        }

        /* HERO PAGE */
        .mn-page {
          position: relative;
          margin: 0;
          padding: 24px;
          background: #1c1a18;
          box-shadow: 0 40px 80px -30px rgba(0, 0, 0, 0.5);
          isolation: isolate;
        }

        .mn-bracket {
          position: absolute;
          width: 22px; height: 22px;
          border-color: var(--ff-ivory);
          opacity: 0.5;
          z-index: 2;
        }
        .mn-tl { top: 12px; left: 12px;     border-top: 1px solid; border-left: 1px solid; }
        .mn-tr { top: 12px; right: 12px;    border-top: 1px solid; border-right: 1px solid; }
        .mn-bl { bottom: 12px; left: 12px;  border-bottom: 1px solid; border-left: 1px solid; }
        .mn-br { bottom: 12px; right: 12px; border-bottom: 1px solid; border-right: 1px solid; }

        .mn-page-tag {
          position: absolute;
          top: 16px;
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
          margin-top: 24px;
          background: #fffff3;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* RIGHT — VERTICAL THUMB STACK */
        .mn-thumbs {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .mn-thumbs-eyebrow {
          font-family: var(--ff-mono);
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ff-amber);
          margin: 0 0 8px;
        }

        .mn-thumb {
          position: relative;
          padding: 8px;
          background: #1c1a18;
          border: 1px solid transparent;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 6px;
          transition:
            transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1),
            border-color 0.3s ease,
            opacity 0.3s ease;
          opacity: 0.6;
          color: var(--ff-ivory);
        }
        .mn-thumb:hover { opacity: 0.95; transform: translateX(-3px); }
        .mn-thumb-active {
          opacity: 1;
          border-color: var(--ff-amber);
        }

        .mn-thumb-img {
          position: relative;
          aspect-ratio: 3 / 2;
          background: #fffff3;
          overflow: hidden;
        }

        .mn-thumb-label {
          font-family: var(--ff-mono);
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255, 254, 235, 0.7);
          padding: 0 4px 4px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .mn-thumb-no {
          color: var(--ff-amber);
        }

        @media (max-width: 1080px) {
          .mn-viewer { grid-template-columns: 1fr; }
          .mn-thumbs {
            flex-direction: row;
            overflow-x: auto;
          }
          .mn-thumb { flex: 0 0 240px; }
        }
        @media (max-width: 880px) {
          .mn-section { margin-left: 18px; margin-right: 18px; padding: 48px 0; }
          .mn-page { padding: 18px; }
          .mn-thumb { flex: 0 0 180px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .mn-pulse::before { animation: none; }
        }
      `}</style>
    </section>
  );
}
