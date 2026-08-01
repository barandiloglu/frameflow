"use client";

import Link from "next/link";
import { getFrameNumber } from "@/data/clients";
import type { Client } from "@/data/clients";
import { LoadingTransition } from "@/components/portfolio/LoadingTransition";

type Props = { client: Client };

const TRADES = [
  "Drywall Installation & Repair",
  "Interior & Exterior Painting",
  "Flooring Installation & Renovation",
  "Property Management Services",
] as const;

export function GoldenHornPage({ client }: Props) {
  const frame = getFrameNumber(client);

  return (
    <div className="gh-page">
      <LoadingTransition
        frameNumber={frame}
        clientName={client.name}
        scope={["Logo", "Website"]}
        location="Stittsville, ON"
        year={client.year}
      />

      <header className="gh-rail">
        <Link className="gh-back" href="/portfolio">← Portfolio</Link>
        <span className="gh-rail-mid">
          FINISH SCHEDULE <b>FF-{frame}</b> · GOLDEN HORN CONSTRUCTION
        </span>
        <span className="gh-rail-end">STITTSVILLE, ON · 2026</span>
      </header>

      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <section className="gh-hero">
        <div className="gh-hero-grid">
          <div>
            <p className="gh-kicker">
              <span className="gh-stamp">ID</span>Logo · Website Design
            </p>
            <h1 className="gh-h1">
              A NEW MARK.
              <br />
              DRAWN ONCE.
              <br />
              <em>CUT THREE WAYS.</em>
            </h1>
            <p className="gh-deck">
              <b>Golden Horn Construction</b> finishes interiors in Ottawa — drywall,
              paint, floors, and the property management work that keeps the same
              buildings calling back. They needed a mark that could sit on a white page
              and a navy one <b>without being redrawn</b>, and a site to put it on. One
              gold horse, a navy grotesque, three files — and ghconstruct.ca, four pages,
              live.
            </p>
            <dl className="gh-facts">
              <div>
                <dt>We built</dt>
                <dd>Identity · Website</dd>
              </div>
              <div>
                <dt>We set</dt>
                <dd>Navy &amp; gold · Oswald</dd>
              </div>
              <div>
                <dt>We shipped</dt>
                <dd>ghconstruct.ca — live</dd>
              </div>
            </dl>
          </div>

          <aside className="gh-plate">
            <div className="gh-plate-head">
              <span>PRIMARY LOCK-UP</span>
              <span className="gh-plate-dim">1 OF 3</span>
            </div>
            <div className="gh-plate-art">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="gh-plate-img"
                src="/portfolio/goldenhorn-construction/logo/primary.png"
                alt="Gold line-drawn horse head beside a navy Golden Horn Construction wordmark"
                width={527}
                height={150}
              />
            </div>
            <p className="gh-plate-foot">
              Gold mark, navy wordmark. The site header, the footer and the favicon are
              all cut from this drawing.
            </p>
          </aside>
        </div>

        <ul className="gh-trades-strip">
          {TRADES.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap"
      />

      <style jsx global>{`
        /* Golden Horn — FF-013. Ported from the prototype; spacing, tracking
           and timing values are kept as drawn. Two deliberate departures:
           --gold-deep exists because gold on the paper ground measures
           2.42:1 and fails even the large-text floor, and --grey is darkened
           from #7d7a74 (4.07:1, used only on 9.5-11.5px labels) to #55534f. */
        .gh-page {
          --navy: #122640;
          --gold: #db9420;
          --gold-deep: #96650f;
          --wash: #fcf9f4;
          --sand: #e0ded2;
          --ink: #21201e;
          --grey: #55534f;
          --rule: rgba(18, 38, 64, 0.16);
          background: var(--wash);
          color: var(--ink);
          font-family: "Montserrat", system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        .gh-page b {
          font-weight: 600;
        }

        .gh-rail {
          position: sticky;
          top: 0;
          z-index: 40;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 10px 22px;
          background: var(--navy);
          color: var(--wash);
          font-family: "Montserrat", sans-serif;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          border-bottom: 3px solid var(--gold);
        }
        .gh-back {
          color: var(--wash);
          text-decoration: none;
          opacity: 0.82;
        }
        .gh-back:hover {
          opacity: 1;
          color: var(--gold);
        }
        .gh-rail-mid b {
          color: var(--gold);
          font-weight: 700;
        }
        .gh-rail-end {
          opacity: 0.72;
        }

        .gh-hero {
          background: var(--navy);
          color: var(--wash);
          padding: 76px 22px 0;
        }
        .gh-hero-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          gap: 56px;
          align-items: start;
        }
        .gh-kicker {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          font-family: "Montserrat", sans-serif;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(252, 249, 244, 0.72);
          margin: 0 0 26px;
        }
        .gh-stamp {
          border: 2px solid var(--gold);
          color: var(--gold);
          padding: 3px 10px;
          font-weight: 700;
          transform: rotate(-3deg);
        }
        .gh-h1 {
          font-family: "Oswald", "Arial Narrow", sans-serif;
          font-weight: 600;
          font-size: clamp(36px, 5.8vw, 76px);
          line-height: 1.02;
          letter-spacing: 0.005em;
          margin: 0 0 28px;
          text-transform: uppercase;
        }
        .gh-h1 em {
          font-style: normal;
          color: var(--gold);
        }
        .gh-deck {
          max-width: 60ch;
          font-size: 16.5px;
          line-height: 1.7;
          color: rgba(252, 249, 244, 0.82);
          margin: 0 0 34px;
        }
        .gh-deck b {
          color: var(--wash);
          font-weight: 500;
        }
        .gh-facts {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
          border-top: 1px solid rgba(252, 249, 244, 0.18);
          padding-top: 20px;
          margin: 0;
        }
        .gh-facts dt {
          font-family: "Montserrat", sans-serif;
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 7px;
        }
        .gh-facts dd {
          margin: 0;
          font-size: 14px;
          line-height: 1.45;
          color: rgba(252, 249, 244, 0.9);
        }

        .gh-plate {
          background: var(--wash);
          color: var(--ink);
          padding: 18px;
          border: 1px solid var(--gold);
        }
        .gh-plate-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: "Montserrat", sans-serif;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          border-bottom: 1px solid var(--rule);
          padding-bottom: 10px;
          margin-bottom: 18px;
        }
        .gh-plate-dim {
          color: var(--grey);
          font-weight: 500;
        }
        .gh-plate-art {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px 6px 22px;
        }
        .gh-plate-img {
          width: 100%;
          max-width: 300px;
          height: auto;
          display: block;
        }
        .gh-plate-foot {
          font-size: 12.5px;
          line-height: 1.6;
          color: var(--grey);
          margin: 0;
          padding-top: 14px;
          border-top: 1px solid var(--rule);
        }

        .gh-trades-strip {
          max-width: 1200px;
          margin: 60px auto 0;
          padding: 0 0 26px;
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .gh-trades-strip li {
          font-family: "Montserrat", sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          border: 1px solid rgba(252, 249, 244, 0.26);
          color: rgba(252, 249, 244, 0.86);
          padding: 7px 12px;
        }

        .gh-sec-head {
          display: flex;
          align-items: center;
          gap: 16px;
          font-family: "Montserrat", sans-serif;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          max-width: 1200px;
          margin: 0 auto 40px;
        }
        .gh-sec-head i {
          flex: 1;
          height: 1px;
          background: var(--rule);
        }
        .gh-sec-meta {
          color: var(--gold-deep);
        }
        .gh-sec-head.light i {
          background: rgba(252, 249, 244, 0.2);
        }
        .gh-sec-head.light .gh-sec-meta {
          color: var(--gold);
        }

        @media (max-width: 940px) {
          .gh-hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .gh-rail-mid {
            display: none;
          }
        }
        @media (max-width: 560px) {
          .gh-hero {
            padding-top: 48px;
          }
          .gh-facts {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gh-page *,
          .gh-page *::before,
          .gh-page *::after {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </div>
  );
}
