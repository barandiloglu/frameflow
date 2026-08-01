"use client";

import Link from "next/link";
import { useRef, useState } from "react";
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

/* What is actually true about the drawing. The prototype's notes claimed a
   uniform stroke weight and a clean 32px reduction; measuring the master file
   contradicted both — strokes run 1px to 19px, and below ~48px the mane washes
   out. See the spec's evidence table, rows 6-7. */
const MARK_NOTES = [
  {
    no: "01",
    title: "One colour, one contour",
    body: "The horse is a single open line figure in gold — no fills, no second colour, no gradient. That is what lets the same drawing sit on a white page and a navy one without a redraw.",
  },
  {
    no: "02",
    title: "A calligraphic stroke",
    body: "The mane is not a uniform weight. Strands swell and taper to points, from roughly one pixel to nineteen across the master file. It reads as drawn rather than constructed, which is what gives it warmth beside a hard grotesque wordmark.",
  },
  {
    no: "03",
    title: "Three files, three jobs",
    body: "Primary for light grounds. Knockout for navy. And the mark on its own, without the wordmark, for the favicon and the social avatar — anywhere the name is already on the page.",
  },
] as const;

/* Two grounds, because two are real: the site's white and its navy bands. The
   prototype's third ("Sand") is this document's own paper, not a Golden Horn
   ground. Gold is an accent and never a field the mark sits on. */
const GROUNDS = [
  {
    key: "white",
    label: "White",
    hex: "#ffffff",
    src: "/portfolio/goldenhorn-construction/logo/primary.png",
    w: 527,
    h: 150,
    alt: "Golden Horn primary lock-up on white — navy wordmark beside the gold horse mark",
    note: "The site's own ground, and the default. Navy wordmark, gold mark — the pairing everything else is measured against.",
  },
  {
    key: "navy",
    label: "Horn Navy",
    hex: "#122640",
    src: "/portfolio/goldenhorn-construction/logo/knockout.png",
    w: 810,
    h: 238,
    alt: "Golden Horn knockout lock-up on navy — white wordmark beside the gold horse mark",
    note: "The knockout, for the navy bands that run through the site and anything printed dark. The mark stays gold; only the type drops out.",
  },
] as const;

/* The four colours actually in use on ghconstruct.ca. The prototype also listed
   "Lime Wash" and "Sand"; neither appears on the site — they are this document's
   own paper. */
const PALETTE = [
  { name: "Horn Navy", hex: "#122640" },
  { name: "Gold", hex: "#db9420" },
  { name: "White", hex: "#ffffff" },
  { name: "Light Grey", hex: "#f7f7f7" },
] as const;

/* Two faces, not three. Roboto is declared by the client site's theme
   stylesheet and renders zero faces on every page tested. */
const TYPE = [
  {
    role: "Display",
    name: "Oswald",
    cls: "gh-type-oswald",
    note: "Condensed, tall x-height. Headlines and card titles — it holds a long trade name on one line without shrinking.",
  },
  {
    role: "Text & UI",
    name: "Montserrat",
    cls: "gh-type-mont",
    note: "Body copy, buttons, labels and the nav. One face doing the reading and the interface both.",
  },
] as const;

/* Scope only — no method claims, which cannot be verified from outside. */
const TRADE_ROWS = [
  { name: "Drywall Installation & Repair", line: "Board, tape, mud and sand — installation and repair." },
  { name: "Interior & Exterior Painting", line: "Inside and out, residential and commercial." },
  { name: "Flooring Installation & Renovation", line: "Installation and renovation, subfloor up." },
  { name: "Property Management Services", line: "The recurring side — maintain, upgrade, protect." },
] as const;

const SCHEDULE: readonly (readonly [string, string, string])[] = [
  ["Primary lock-up", "Horse mark + wordmark, horizontal", "Delivered"],
  ["Knockout lock-up", "White type, gold mark, dark grounds", "Delivered"],
  ["Standalone mark", "Square, favicon and avatars", "Delivered"],
  ["Colour system", "Navy #122640, gold #db9420", "Delivered"],
  ["Type system", "Oswald display · Montserrat text", "Delivered"],
  ["Website", "Four pages — home, services, work, contact", "Live"],
  ["Contact form", "Consent + CAPTCHA, on two pages", "Live"],
];

/* Static full-page captures rather than an iframe: there is no local export of
   this site, and framing a live third-party WordPress install is not something
   to ship. Heights are the real pixel heights of each capture, declared so the
   scroll window does not jump as they load.

   Captions describe verifiable page structure. The prototype's claimed that the
   site "answers the question before the scroll", opened navy-and-gold "from the
   first screen", and had a "portfolio shelf" — see the spec's evidence table,
   rows 1, 3 and 5. */
const SHOTS = [
  {
    label: "Home",
    path: "/",
    src: "/portfolio/goldenhorn-construction/website/home.jpg",
    h: 8622,
    note: "The longest of the four — hero, a stat band, service blocks, a testimonial and a closing call to action.",
  },
  {
    label: "Services",
    path: "/services/",
    src: "/portfolio/goldenhorn-construction/website/services.jpg",
    h: 4546,
    note: "Where the navy-and-gold system lands hardest: the four trades as four cards, then a navy band of capability blocks.",
  },
  {
    label: "Work",
    path: "/work/",
    src: "/portfolio/goldenhorn-construction/website/work.jpg",
    h: 4307,
    note: "A project grid, and the second placement of the contact form — consent checkbox and CAPTCHA included.",
  },
  {
    label: "Contact",
    path: "/contact/",
    src: "/portfolio/goldenhorn-construction/website/contact.jpg",
    h: 1927,
    note: "The shortest page. Address, hours, socials, and the same form.",
  },
] as const;

export function GoldenHornPage({ client }: Props) {
  const frame = getFrameNumber(client);
  const [ground, setGround] = useState(0);
  const g = GROUNDS[ground];
  const [shot, setShot] = useState(0);
  const s = SHOTS[shot];
  const winRef = useRef<HTMLDivElement | null>(null);

  const goShot = (i: number) => {
    setShot((i + SHOTS.length) % SHOTS.length);
    if (winRef.current) winRef.current.scrollTop = 0;
  };

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

      {/* ============================================================ */}
      {/*  THE MARK                                                    */}
      {/* ============================================================ */}
      <section className="gh-mark">
        <h2 className="gh-sec-head">
          <span>THE MARK</span>
          <i />
          <span className="gh-sec-meta">ONE DRAWING</span>
        </h2>
        <div className="gh-mark-grid">
          <div className="gh-mark-art">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/portfolio/goldenhorn-construction/logo/mark.png"
              alt="The Golden Horn mark on its own — a horse head and mane drawn in gold as an open line figure"
              width={512}
              height={512}
            />
          </div>
          <div className="gh-mark-notes">
            {MARK_NOTES.map((m) => (
              <article className="gh-note" key={m.no}>
                <span className="gh-note-no">{m.no}</span>
                <div>
                  <h3>{m.title}</h3>
                  <p>{m.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  THE LOCK-UPS                                                */}
      {/* ============================================================ */}
      <section className="gh-locks">
        <h2 className="gh-sec-head">
          <span>THE LOCK-UPS</span>
          <i />
          <span className="gh-sec-meta">2 GROUNDS</span>
        </h2>
        <div className="gh-locks-grid">
          <div>
            <div className="gh-stage" style={{ background: g.hex }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="gh-stage-img" src={g.src} alt={g.alt} width={g.w} height={g.h} />
            </div>
            <div className="gh-swatch-row" role="tablist" aria-label="Lock-up ground">
              {GROUNDS.map((s, i) => (
                <button
                  key={s.key}
                  type="button"
                  role="tab"
                  aria-selected={i === ground}
                  className={i === ground ? "on" : undefined}
                  onClick={() => setGround(i)}
                >
                  <span className="gh-chip" style={{ background: s.hex }} />
                  {s.label}
                </button>
              ))}
            </div>
            <p className="gh-stage-note">{g.note}</p>
          </div>
          <div className="gh-locks-list">
            <div className="gh-lock-row">
              <span className="gh-lock-no">01</span>
              <div>
                <h3>Primary</h3>
                <p>Navy wordmark, gold mark. The site header, the letterhead, the invoice.</p>
              </div>
            </div>
            <div className="gh-lock-row">
              <span className="gh-lock-no">02</span>
              <div>
                <h3>Knockout</h3>
                <p>White wordmark, gold mark. The footer and every navy band on the site.</p>
              </div>
            </div>
            <div className="gh-lock-row">
              <span className="gh-lock-no">03</span>
              <div>
                <h3>Standalone mark</h3>
                <p>
                  Square, no wordmark. Shipped as the site favicon at 32, 180 and 192
                  pixels, and as the social avatar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  COLOUR & TYPE                                               */}
      {/* ============================================================ */}
      <section className="gh-spec">
        <h2 className="gh-sec-head light">
          <span>COLOUR &amp; TYPE</span>
          <i />
          <span className="gh-sec-meta">SPEC</span>
        </h2>
        <div className="gh-spec-grid">
          <div>
            <p className="gh-spec-label">PALETTE</p>
            <ul className="gh-swatches">
              {PALETTE.map((s) => (
                <li key={s.hex}>
                  <span className="gh-sw" style={{ background: s.hex }} />
                  <b>{s.name}</b>
                  <span>{s.hex.toUpperCase()}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="gh-spec-label">TYPE</p>
            <ul className="gh-type">
              {TYPE.map((t) => (
                <li key={t.name}>
                  <span className="gh-type-role">{t.role}</span>
                  <b className={t.cls}>{t.name}</b>
                  <span className="gh-type-note">{t.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  THE SITE                                                    */}
      {/* ============================================================ */}
      <section className="gh-site-sec">
        <h2 className="gh-sec-head">
          <span>THE SITE</span>
          <i />
          <span className="gh-sec-meta">{SHOTS.length} PAGES · LIVE</span>
        </h2>
        <p className="gh-site-intro">
          Four pages on WordPress, built and shipped by FrameFlow — the footer of
          every one of them says so. The identity carries through it: navy bands,
          gold accents, Oswald on the headings. <b>Each shot below is the full page</b>,
          top to bottom; scroll inside the window to read it, or open the live page.
        </p>
        <figure className="gh-site">
          <div className="gh-shot-bar">
            <span className="gh-shot-dots">
              <i />
              <i />
              <i />
            </span>
            <span className="gh-shot-url">ghconstruct.ca{s.path}</span>
            <span className="gh-shot-ours">BUILT BY US</span>
            <span className="gh-shot-live">● LIVE</span>
          </div>

          <nav className="gh-site-tabs" role="tablist" aria-label="Site pages">
            {SHOTS.map((x, i) => (
              <button
                key={x.label}
                type="button"
                role="tab"
                aria-selected={i === shot}
                className={i === shot ? "on" : undefined}
                onClick={() => goShot(i)}
              >
                {x.label}
              </button>
            ))}
          </nav>

          <div
            className="gh-site-window"
            ref={winRef}
            role="tabpanel"
            aria-label={`${s.label} page of ghconstruct.ca`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="gh-site-img"
              src={s.src}
              alt={`The ${s.label} page of ghconstruct.ca, captured full length`}
              width={1440}
              height={s.h}
              loading="lazy"
            />
            <span className="gh-site-hint">scroll inside ↕</span>
          </div>

          <div className="gh-site-foot">
            <div className="gh-site-nav">
              <button type="button" onClick={() => goShot(shot - 1)} aria-label="Previous page">
                ‹
              </button>
              <span>
                {String(shot + 1).padStart(2, "0")} / {String(SHOTS.length).padStart(2, "0")}
              </span>
              <button type="button" onClick={() => goShot(shot + 1)} aria-label="Next page">
                ›
              </button>
            </div>
            <a
              className="gh-visit"
              href={`https://ghconstruct.ca${s.path}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit this page <span aria-hidden>↗</span>
            </a>
          </div>

          <figcaption>{s.note}</figcaption>
        </figure>
      </section>

      {/* ============================================================ */}
      {/*  WHAT THEY DO                                                */}
      {/* ============================================================ */}
      <section className="gh-trades-sec">
        <h2 className="gh-sec-head light">
          <span>WHAT THEY DO</span>
          <i />
          <span className="gh-sec-meta">4 TRADES</span>
        </h2>
        <ul className="gh-trades-list">
          {TRADE_ROWS.map((t, i) => (
            <li key={t.name}>
              <span className="gh-trade-no">{String(i + 1).padStart(2, "0")}</span>
              <b>{t.name}</b>
              <span className="gh-trade-line">{t.line}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ============================================================ */}
      {/*  FINISH SCHEDULE                                             */}
      {/* ============================================================ */}
      <section className="gh-sched">
        <h2 className="gh-sec-head">
          <span>FINISH SCHEDULE</span>
          <i />
          <span className="gh-sec-meta">{SCHEDULE.length} ITEMS</span>
        </h2>
        <div className="gh-table-wrap">
          <table className="gh-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Spec</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {SCHEDULE.map((r) => (
                <tr key={r[0]}>
                  <td>
                    <b>{r[0]}</b>
                  </td>
                  <td>{r[1]}</td>
                  <td>
                    <span className="gh-status">{r[2]}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

        .gh-mark,
        .gh-locks {
          padding: 84px 22px;
        }
        .gh-locks {
          border-top: 1px solid var(--rule);
        }
        .gh-mark-grid,
        .gh-locks-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 52px;
          align-items: start;
        }
        .gh-mark-art {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px;
          border: 1px solid var(--rule);
          background: #fff;
        }
        .gh-mark-art img {
          width: 100%;
          max-width: 340px;
          height: auto;
          display: block;
        }

        .gh-note,
        .gh-lock-row {
          display: grid;
          grid-template-columns: 62px 1fr;
          gap: 18px;
          padding: 26px 0;
          border-top: 1px solid var(--rule);
        }
        .gh-note:last-child,
        .gh-lock-row:last-child {
          border-bottom: 1px solid var(--rule);
        }
        .gh-note-no,
        .gh-lock-no {
          font-family: "Oswald", sans-serif;
          font-weight: 500;
          font-size: 36px;
          line-height: 0.85;
          color: var(--gold-deep);
        }
        .gh-note h3,
        .gh-lock-row h3 {
          font-family: "Oswald", sans-serif;
          font-weight: 500;
          font-size: 21px;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          margin: 0 0 9px;
          color: var(--navy);
        }
        .gh-note p,
        .gh-lock-row p {
          margin: 0;
          font-size: 14.5px;
          line-height: 1.68;
          color: #44423e;
          max-width: 52ch;
        }

        .gh-stage {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 260px;
          padding: 40px 28px;
          border: 1px solid var(--rule);
          transition: background 260ms ease;
        }
        .gh-stage-img {
          width: 100%;
          max-width: 340px;
          height: auto;
          display: block;
        }
        .gh-swatch-row {
          display: flex;
          gap: 0;
          margin-top: -1px;
        }
        .gh-swatch-row button {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          cursor: pointer;
          padding: 12px 8px;
          background: transparent;
          border: 1px solid var(--rule);
          border-right: 0;
          font-family: "Montserrat", sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--grey);
          transition: color 150ms ease, background 150ms ease;
        }
        .gh-swatch-row button:last-child {
          border-right: 1px solid var(--rule);
        }
        .gh-swatch-row button:hover {
          color: var(--ink);
          background: rgba(18, 38, 64, 0.04);
        }
        .gh-swatch-row button.on {
          color: var(--navy);
          background: #fff;
        }
        .gh-chip {
          width: 13px;
          height: 13px;
          border: 1px solid var(--rule);
          display: block;
        }
        .gh-stage-note {
          font-size: 13.5px;
          line-height: 1.65;
          color: #44423e;
          border-left: 3px solid var(--gold);
          padding-left: 14px;
          margin: 22px 0 0;
          max-width: 56ch;
        }

        .gh-site-sec {
          padding: 84px 22px;
          border-top: 1px solid var(--rule);
        }
        .gh-site-intro {
          max-width: 78ch;
          margin: 0 auto 44px;
          font-size: 16px;
          line-height: 1.72;
          color: #44423e;
        }
        .gh-site-intro b {
          color: var(--navy);
          font-weight: 600;
        }
        .gh-site {
          max-width: 1200px;
          margin: 0 auto;
        }
        .gh-shot-bar {
          display: flex;
          align-items: center;
          gap: 14px;
          background: var(--navy);
          padding: 9px 14px;
          font-family: "Montserrat", monospace;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .gh-shot-dots {
          display: flex;
          gap: 6px;
        }
        .gh-shot-dots i {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: rgba(252, 249, 244, 0.26);
        }
        .gh-shot-dots i:first-child {
          background: var(--gold);
        }
        .gh-shot-url {
          flex: 1;
          color: rgba(252, 249, 244, 0.82);
          letter-spacing: 0.04em;
          text-transform: none;
        }
        .gh-shot-ours {
          background: var(--gold);
          color: var(--navy);
          font-weight: 700;
          padding: 3px 8px;
          letter-spacing: 0.14em;
        }
        .gh-shot-live {
          color: var(--gold);
          font-weight: 700;
        }

        .gh-site-tabs {
          display: flex;
          flex-wrap: wrap;
          border: 1px solid var(--rule);
          border-top: 0;
          border-bottom: 0;
        }
        .gh-site-tabs button {
          flex: 1;
          min-width: 110px;
          cursor: pointer;
          background: var(--sand);
          border: 0;
          border-right: 1px solid var(--rule);
          padding: 11px 10px;
          font-family: "Montserrat", sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #56544f;
          transition: background 140ms ease, color 140ms ease;
        }
        .gh-site-tabs button:last-child {
          border-right: 0;
        }
        .gh-site-tabs button:hover {
          background: #d5d2c6;
          color: var(--navy);
        }
        .gh-site-tabs button.on {
          background: var(--wash);
          color: var(--gold-deep);
        }

        .gh-site-window {
          position: relative;
          height: 620px;
          overflow-y: auto;
          overflow-x: hidden;
          border: 1px solid var(--rule);
          background: #fff;
          scrollbar-width: thin;
        }
        .gh-site-img {
          width: 100%;
          height: auto;
          display: block;
        }
        .gh-site-hint {
          position: sticky;
          bottom: 10px;
          float: right;
          right: 10px;
          margin-right: 12px;
          background: rgba(18, 38, 64, 0.85);
          color: var(--wash);
          font-family: "Montserrat", sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 5px 9px;
          pointer-events: none;
        }

        .gh-site-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          border: 1px solid var(--rule);
          border-top: 0;
          padding: 12px 14px;
        }
        .gh-site-nav {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .gh-site-nav button {
          width: 34px;
          height: 34px;
          cursor: pointer;
          line-height: 1;
          background: transparent;
          border: 1px solid var(--rule);
          color: var(--navy);
          font-size: 20px;
          transition: all 140ms ease;
        }
        .gh-site-nav button:hover {
          background: var(--gold);
          border-color: var(--gold);
          color: var(--navy);
        }
        .gh-site-nav span {
          font-family: "Montserrat", monospace;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: var(--grey);
        }
        .gh-visit {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          background: var(--gold);
          color: var(--navy);
          text-decoration: none;
          padding: 11px 18px;
          font-family: "Montserrat", sans-serif;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          transition: background 140ms ease, color 140ms ease;
        }
        .gh-visit:hover {
          background: var(--navy);
          color: var(--wash);
        }
        .gh-site figcaption {
          font-family: "Montserrat", sans-serif;
          font-size: 11.5px;
          line-height: 1.65;
          letter-spacing: 0.02em;
          color: var(--grey);
          border-left: 3px solid var(--gold);
          padding-left: 14px;
          margin-top: 18px;
          max-width: 70ch;
        }

        .gh-spec {
          background: var(--navy);
          color: var(--wash);
          padding: 84px 22px;
        }
        .gh-spec-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 52px;
          align-items: start;
        }
        .gh-spec-label {
          font-family: "Montserrat", sans-serif;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          margin: 0 0 20px;
        }
        .gh-swatches {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .gh-swatches li {
          display: grid;
          grid-template-columns: 46px 1fr auto;
          gap: 16px;
          align-items: center;
          padding: 13px 0;
          border-bottom: 1px solid rgba(252, 249, 244, 0.14);
        }
        /* The navy chip is the same colour as this section's ground, so a faint
           keyline made it read as an empty box rather than a swatch. */
        .gh-sw {
          width: 46px;
          height: 30px;
          display: block;
          border: 1px solid rgba(252, 249, 244, 0.55);
        }
        .gh-swatches b {
          font-size: 14px;
          font-weight: 500;
        }
        .gh-swatches span:last-child {
          font-family: "Montserrat", monospace;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: rgba(252, 249, 244, 0.72);
        }

        .gh-type {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .gh-type li {
          padding: 18px 0;
          border-bottom: 1px solid rgba(252, 249, 244, 0.14);
        }
        .gh-type-role {
          display: block;
          font-family: "Montserrat", sans-serif;
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(252, 249, 244, 0.72);
          margin-bottom: 8px;
        }
        .gh-type b {
          display: block;
          font-size: 34px;
          line-height: 1.1;
          margin-bottom: 8px;
        }
        .gh-type-oswald {
          font-family: "Oswald", sans-serif;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }
        .gh-type-mont {
          font-family: "Montserrat", sans-serif;
          font-weight: 600;
        }
        .gh-type-note {
          display: block;
          font-size: 13.5px;
          line-height: 1.6;
          color: rgba(252, 249, 244, 0.78);
          max-width: 46ch;
        }

        .gh-trades-sec {
          background: var(--navy);
          color: var(--wash);
          padding: 84px 22px;
          border-top: 1px solid rgba(252, 249, 244, 0.14);
        }
        .gh-trades-list {
          max-width: 1200px;
          margin: 0 auto;
          list-style: none;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0 48px;
        }
        .gh-trades-list li {
          display: grid;
          grid-template-columns: 46px 1fr;
          row-gap: 6px;
          column-gap: 14px;
          padding: 22px 0;
          border-bottom: 1px solid rgba(252, 249, 244, 0.14);
        }
        .gh-trade-no {
          grid-row: span 2;
          font-family: "Oswald", sans-serif;
          font-weight: 500;
          font-size: 26px;
          line-height: 0.9;
          color: var(--gold);
        }
        .gh-trades-list b {
          font-family: "Oswald", sans-serif;
          font-weight: 500;
          font-size: 19px;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }
        .gh-trade-line {
          font-size: 13.5px;
          line-height: 1.55;
          color: rgba(252, 249, 244, 0.74);
        }

        .gh-sched {
          padding: 84px 22px;
        }
        .gh-table-wrap {
          max-width: 1200px;
          margin: 0 auto;
          overflow-x: auto;
        }
        .gh-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 560px;
        }
        .gh-table th {
          text-align: left;
          padding: 12px 16px;
          background: var(--navy);
          color: var(--wash);
          font-family: "Montserrat", sans-serif;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .gh-table td {
          padding: 15px 16px;
          border-bottom: 1px solid var(--rule);
          font-size: 14px;
          line-height: 1.5;
          color: #44423e;
          vertical-align: top;
        }
        .gh-table tbody tr:hover {
          background: rgba(219, 148, 32, 0.06);
        }
        .gh-table td b {
          color: var(--navy);
          font-weight: 600;
        }
        .gh-status {
          font-family: "Montserrat", sans-serif;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--navy);
          background: var(--gold);
          padding: 4px 9px;
          white-space: nowrap;
          display: inline-block;
        }

        @media (max-width: 940px) {
          .gh-hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .gh-mark-grid,
          .gh-locks-grid,
          .gh-spec-grid {
            grid-template-columns: 1fr;
            gap: 44px;
          }
          .gh-trades-list {
            grid-template-columns: 1fr;
            gap: 0;
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
          .gh-swatch-row {
            flex-direction: column;
          }
          .gh-swatch-row button {
            border-right: 1px solid var(--rule);
            border-bottom: 0;
          }
          .gh-swatch-row button:last-child {
            border-bottom: 1px solid var(--rule);
          }
          .gh-note,
          .gh-lock-row {
            grid-template-columns: 44px 1fr;
            gap: 12px;
          }
          .gh-note-no,
          .gh-lock-no {
            font-size: 27px;
          }
          .gh-site-window {
            height: 420px;
          }
          .gh-site-foot {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          .gh-visit {
            justify-content: center;
          }
          .gh-site-nav {
            justify-content: center;
          }
          .gh-shot-url {
            display: none;
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
