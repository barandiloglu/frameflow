"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCallback, useState, useSyncExternalStore } from "react";
import { serviceFolders } from "@/data/serviceFolders";

/* ------------------------------------------------------------------ */
/*  The services as clapperboards.                                     */
/*                                                                     */
/*  Eight slates in a stack, each chalked up like the real thing —     */
/*  scene, take, the title, the director's line, the slug. The sticks  */
/*  sit open on every slate that is waiting. Click one and it CLAPS:   */
/*  the sticks snap shut, the board flashes ember, and the storyboard  */
/*  frame for that scene unfolds beneath it with the notes. Every      */
/*  clap advances the take.                                            */
/*                                                                     */
/*  Same clapper stripe, brackets and dashed inset as the rest of the  */
/*  site — this is the CTA's clapperboard, put to work.                */
/* ------------------------------------------------------------------ */

export type Service = {
  id: number;
  name: string;
  category: string;
  subtitle: string;
  scene: string;
  tagline: string;
  description: string;
  features: readonly string[];
};

const pad = (n: number) => String(n).padStart(2, "0");

export const slugOf = (name: string) =>
  name
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/* The URL hash as a subscription, so /services#website-design arrives with
   that slate already clapped open — the footer's scene links depend on it —
   and following the same link again later works too. */
const subscribeToHash = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
};
const readHash = () => window.location.hash.slice(1);
const noHash = () => "";

export function Slates({ services }: { services: readonly Service[] }) {
  const hash = useSyncExternalStore(subscribeToHash, readHash, noHash);
  /* undefined means nobody has clapped yet, so the hash decides. */
  const [picked, setPicked] = useState<number | null | undefined>(undefined);
  const fromHash = services.find((s) => slugOf(s.name) === hash)?.id ?? null;
  const open = picked === undefined ? fromHash : picked;
  /* Each clap is a take. */
  const [takes, setTakes] = useState<Record<number, number>>({});

  const clap = useCallback(
    (id: number) => {
      if (open === id) {
        setPicked(null);
        return;
      }
      setTakes((t) => ({ ...t, [id]: (t[id] ?? 0) + 1 }));
      setPicked(id);
    },
    [open],
  );

  return (
    <ol className="sl-stack">
      {services.map((s, i) => {
        const folder = serviceFolders.find((f) => f.id === s.id);
        const board = folder?.board;
        const isOpen = open === s.id;
        const take = takes[s.id] ?? 0;
        const slug = slugOf(s.name);

        return (
          <motion.li
            key={s.id}
            id={slug}
            className={`sl${isOpen ? " is-open" : ""}`}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: (i % 4) * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {/* the sticks */}
            <div
              aria-hidden
              className="sl-sticks"
              style={{
                background:
                  "repeating-linear-gradient(-68deg, #ffffeb 0 28px, #353230 28px 56px)",
              }}
            />

            {/* the board */}
            <button
              type="button"
              className="sl-board group"
              aria-expanded={isOpen}
              aria-controls={`slate-${slug}`}
              onClick={() => clap(s.id)}
            >
              {/* corner brackets — light when open */}
              <span aria-hidden className="sl-br sl-br-tl" />
              <span aria-hidden className="sl-br sl-br-tr" />
              <span aria-hidden className="sl-br sl-br-bl" />
              <span aria-hidden className="sl-br sl-br-br" />
              <span aria-hidden className="absolute inset-3 border border-dashed border-ivory/10 pointer-events-none" />

              <span className="sl-row">
                <span className="sl-field">
                  <span className="sl-k">Scene</span>
                  <span className="sl-v">{pad(i + 1)}</span>
                </span>
                <span className="sl-field">
                  <span className="sl-k">Take</span>
                  <span className="sl-v">{pad(Math.max(take, 1))}</span>
                </span>
                <span className="sl-field sl-status">
                  {isOpen ? (
                    <>
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inset-0 rounded-full bg-ember animate-ping" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
                      </span>
                      <span className="text-ember">Rolling</span>
                    </>
                  ) : (
                    <>
                      <span className="inline-flex h-2 w-2 rounded-full bg-ivory/30" />
                      <span>Standby</span>
                    </>
                  )}
                </span>
              </span>

              <span className="sl-title">
                <span className="sl-name font-editorial">{s.name}</span>
                <span className="sl-line font-editorial">{s.tagline}</span>
              </span>

              <span className="sl-row sl-row-b">
                <span className="sl-field">
                  <span className="sl-k">Dir.</span>
                  <span className="sl-v">FrameFlow</span>
                </span>
                <span className="sl-field">
                  <span className="sl-k">Cam.</span>
                  <span className="sl-v">A</span>
                </span>
                <span className="sl-field sl-slug">
                  <span className="sl-v">{s.scene}</span>
                </span>
              </span>
            </button>

            {/* what unfolds after the clap */}
            <div className="sl-panel" id={`slate-${slug}`} role="region" aria-label={s.name}>
              <div className="sl-panel-clip">
                <div className="sl-panel-in">
                  <figure className="sl-sheet">
                    <span aria-hidden className="absolute inset-3 border border-dashed border-graphite/20 pointer-events-none" />
                    {board ? (
                      <Image
                        src={board.src}
                        alt={board.alt}
                        fill
                        sizes="(min-width: 1024px) 46vw, 100vw"
                        className="sl-draw"
                      />
                    ) : (
                      <p className="sl-undrawn font-warm">Frame not yet drawn</p>
                    )}
                    <figcaption className="sl-sheet-cap font-mono">
                      <span>Storyboard</span>
                      <span>Scene {pad(i + 1)}</span>
                    </figcaption>
                  </figure>

                  <div className="sl-notes">
                    <p className="sl-desc font-warm">{s.description}</p>
                    <ul className="sl-feat">
                      {s.features.map((f, k) => (
                        <li key={f} className="font-warm" style={{ "--k": k } as React.CSSProperties}>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <p className="sl-meta font-mono">
                      <span className="text-amber">{s.subtitle}</span>
                      {folder ? (
                        <span>
                          {folder.clients} {folder.clients === 1 ? "client" : "clients"} on file
                        </span>
                      ) : null}
                      {folder && folder.frames.length === 0 && folder.note ? (
                        <span className="sl-meta-note font-warm">{folder.note}</span>
                      ) : null}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.li>
        );
      })}

      <style jsx global>{`
        .sl-stack {
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: clamp(28px, 3.2vw, 44px);
        }

        .sl {
          --lift: -1.7deg;
          --rise: -6px;
          position: relative;
          /* headroom for the open sticks */
          padding-top: 40px;
        }

        /* ---- the sticks: hinged at the left, open while waiting ---- */
        .sl-sticks {
          position: absolute;
          top: 40px;
          left: 0;
          right: 0;
          height: 36px;
          z-index: 2;
          transform-origin: 0% 100%;
          transform: rotate(var(--lift)) translateY(var(--rise));
          box-shadow: 0 2px 0 rgba(53, 50, 48, 0.9);
          transition: transform 420ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .sl:hover .sl-sticks {
          --lift: -2.4deg;
          --rise: -9px;
        }
        /* the clap: a hard snap shut, with a hair of overshoot */
        .sl.is-open .sl-sticks,
        .sl.is-open:hover .sl-sticks {
          transform: rotate(0deg) translateY(0);
          animation: sl-clap 220ms cubic-bezier(0.7, 0, 1, 1) both;
        }
        @keyframes sl-clap {
          0% {
            transform: rotate(-1.7deg) translateY(-6px);
          }
          58% {
            transform: rotate(0.9deg) translateY(1px);
          }
          100% {
            transform: rotate(0deg) translateY(0);
          }
        }

        /* ---- the board ---- */
        .sl-board {
          position: relative;
          display: block;
          width: 100%;
          margin-top: 36px;
          padding: clamp(18px, 2.2vw, 30px) clamp(20px, 3vw, 44px) clamp(16px, 2vw, 26px);
          background: #353230;
          color: #ffffeb;
          border: 1px solid rgba(255, 255, 235, 0.14);
          border-top: 2px solid #ffffeb;
          text-align: left;
          cursor: pointer;
          font: inherit;
          transition: border-color 320ms ease;
        }
        .sl-board:hover {
          border-color: rgba(211, 143, 44, 0.5);
        }
        .sl-board:focus-visible {
          outline: 2px solid var(--color-amber);
          outline-offset: 4px;
        }
        /* the flash on the clap */
        .sl-board::after {
          content: "";
          position: absolute;
          inset: 0;
          background: var(--color-ember);
          opacity: 0;
          pointer-events: none;
        }
        .sl.is-open .sl-board::after {
          animation: sl-flash 380ms ease-out 120ms both;
        }
        @keyframes sl-flash {
          0% {
            opacity: 0;
          }
          30% {
            opacity: 0.42;
          }
          100% {
            opacity: 0;
          }
        }

        .sl-br {
          position: absolute;
          width: 12px;
          height: 12px;
          border-color: transparent;
          border-style: solid;
          border-width: 0;
          transition: border-color 500ms ease;
          pointer-events: none;
        }
        .sl-br-tl { top: 12px; left: 12px; border-top-width: 1px; border-left-width: 1px; }
        .sl-br-tr { top: 12px; right: 12px; border-top-width: 1px; border-right-width: 1px; }
        .sl-br-bl { bottom: 12px; left: 12px; border-bottom-width: 1px; border-left-width: 1px; }
        .sl-br-br { bottom: 12px; right: 12px; border-bottom-width: 1px; border-right-width: 1px; }
        .sl-board:hover .sl-br,
        .sl.is-open .sl-br {
          border-color: rgba(211, 143, 44, 0.7);
        }

        /* chalk fields */
        .sl-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px clamp(22px, 3vw, 44px);
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255, 255, 235, 0.14);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 235, 0.62);
        }
        .sl-row-b {
          padding-bottom: 0;
          padding-top: 12px;
          border-bottom: 0;
          border-top: 1px solid rgba(255, 255, 235, 0.14);
        }
        .sl-field {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .sl-k {
          color: rgba(255, 255, 235, 0.38);
        }
        .sl-v {
          color: #ffffeb;
          font-weight: 500;
        }
        .sl-status {
          margin-left: auto;
          gap: 8px;
          font-weight: 600;
        }
        .sl-slug {
          margin-left: auto;
        }
        .sl-slug .sl-v {
          color: var(--color-amber);
        }

        .sl-title {
          display: block;
          padding: clamp(18px, 2.4vw, 34px) 0 clamp(16px, 2vw, 28px);
        }
        .sl-name {
          display: block;
          font-weight: 700;
          font-size: clamp(30px, 4vw, 62px);
          line-height: 0.98;
          letter-spacing: -0.032em;
          color: #ffffeb;
          transition: color 300ms ease;
        }
        .sl:hover .sl-name,
        .sl.is-open .sl-name {
          color: var(--color-amber);
        }
        .sl-line {
          display: block;
          margin-top: 0.55em;
          font-style: italic;
          font-weight: 700;
          font-size: clamp(15px, 1.4vw, 21px);
          line-height: 1.3;
          color: rgba(255, 255, 235, 0.72);
        }

        /* ---- the unfold ---- */
        .sl-panel {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 480ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .sl.is-open .sl-panel {
          grid-template-rows: 1fr;
          transition-delay: 140ms;
        }
        .sl-panel-clip {
          overflow: hidden;
        }
        .sl-panel-in {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
          gap: clamp(18px, 2.4vw, 40px);
          padding: clamp(18px, 2.4vw, 32px) 0 0;
        }

        .sl-sheet {
          position: relative;
          margin: 0;
          aspect-ratio: 16 / 10;
          background: #ffffeb;
          border: 1px solid rgba(53, 50, 48, 0.18);
          overflow: hidden;
          clip-path: inset(0 100% 0 0);
          transition: clip-path 260ms cubic-bezier(0.7, 0, 0.84, 0);
        }
        .sl.is-open .sl-sheet {
          clip-path: inset(0 0 0 0);
          transition: clip-path 560ms cubic-bezier(0.16, 1, 0.3, 1) 260ms;
        }
        .sl-draw {
          object-fit: contain;
          padding: 6%;
          mix-blend-mode: multiply;
          filter: contrast(1.12) brightness(1.04);
        }
        .sl-undrawn {
          position: absolute;
          inset: 0;
          margin: 0;
          display: grid;
          place-items: center;
          font-size: 14px;
          font-style: italic;
          font-weight: 300;
          color: rgba(53, 50, 48, 0.55);
        }
        .sl-sheet-cap {
          position: absolute;
          left: 20px;
          right: 20px;
          bottom: 16px;
          display: flex;
          justify-content: space-between;
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(53, 50, 48, 0.55);
        }

        .sl-notes {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 18px;
          padding: 4px 0;
        }
        .sl-desc {
          margin: 0;
          max-width: 52ch;
          font-size: 14.5px;
          font-weight: 300;
          line-height: 1.8;
          color: var(--on-alt-80);
          opacity: 0;
          transform: translateY(8px);
          transition:
            opacity 420ms ease,
            transform 520ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .sl.is-open .sl-desc {
          opacity: 1;
          transform: none;
          transition-delay: 300ms;
        }
        .sl-feat {
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }
        .sl-feat li {
          position: relative;
          padding-left: 24px;
          font-size: 13.5px;
          font-weight: 300;
          line-height: 1.55;
          color: var(--on-alt);
          opacity: 0;
          transform: translateY(8px);
          transition:
            opacity 380ms ease,
            transform 480ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .sl-feat li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.62em;
          width: 14px;
          height: 1px;
          background: var(--color-ember);
        }
        .sl.is-open .sl-feat li {
          opacity: 1;
          transform: none;
          transition-delay: calc(360ms + var(--k, 0) * 60ms);
        }
        .sl-meta {
          margin: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 6px 22px;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--on-alt-60);
          opacity: 0;
          transition: opacity 400ms ease;
        }
        .sl.is-open .sl-meta {
          opacity: 1;
          transition-delay: 640ms;
        }
        .sl-meta-note {
          text-transform: none;
          letter-spacing: 0;
          font-size: 13px;
          font-style: italic;
          font-weight: 300;
        }

        @media (max-width: 1023px) {
          .sl-panel-in {
            grid-template-columns: minmax(0, 1fr);
          }
        }
        @media (max-width: 640px) {
          .sl {
            --lift: -3deg;
            padding-top: 28px;
          }
          .sl-sticks {
            top: 28px;
            height: 28px;
          }
          .sl-board {
            margin-top: 28px;
          }
          .sl-status,
          .sl-slug {
            margin-left: 0;
            flex-basis: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sl-sticks,
          .sl-panel,
          .sl-sheet,
          .sl-desc,
          .sl-feat li,
          .sl-meta {
            transition: none;
          }
          .sl.is-open .sl-sticks,
          .sl.is-open .sl-board::after {
            animation: none;
          }
          .sl-sticks {
            transform: none;
          }
        }
      `}</style>
    </ol>
  );
}
