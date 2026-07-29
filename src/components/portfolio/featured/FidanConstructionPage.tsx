"use client";

import Link from "next/link";
import { useState } from "react";
import { getFrameNumber } from "@/data/clients";
import type { Client } from "@/data/clients";

type Props = { client: Client };

// [row label, before value, after value]
const BUILD = [
  ["Buyer",        "Homeowner-facing",       "Property & building managers"],
  ["Paid channel", "None running",           "Two-stage Meta funnel"],
  ["Creative",     "Job photos, undeployed", "Five-asset system, one grammar"],
  ["Landing",      "Homepage only",          "/property-managers, dedicated"],
  ["Lead intake",  "Phone and email",        "Qualified form, six fields"],
] as const;

const TRADES = ["Unit Turnovers", "Water Damage", "Asbestos (O. Reg. 278/05)", "Painting", "Drywall & Plaster"] as const;

export function FidanConstructionPage({ client }: Props) {
  const frame = getFrameNumber(client); // "012"
  const wo = `FF-${frame}`;

  const [phase, setPhase] = useState<"before" | "after">("after");

  return (
    <div className="fx-page">
      <header className="fx-rail">
        <Link className="fx-back" href="/portfolio">← Portfolio</Link>
        <span className="fx-rail-mid">WORK ORDER <b>{wo}</b> · FIDAN CONSTRUCTION</span>
        <span className="fx-rail-end">OTTAWA, ON · 2026</span>
      </header>

      <section className="fx-hero">
        <div className="fx-hero-grid">
          <div>
            <p className="fx-kicker"><span className="fx-stamp">B2B</span>Ad Management · Website Design · SEO</p>
            <h1 className="fx-h1">THEY BUILD.<br />WE BUILT <em>WHAT BRINGS</em><br /><em>THE WORK IN.</em></h1>
            <p className="fx-deck"><b>Fidan Construction</b> had eight years, a thousand-plus projects and a homeowner&rsquo;s pitch. The work they wanted was commercial — property managers who buy turnovers by the building. So we rebuilt the front of the business around that buyer: <b>the funnel that reaches them</b>, <b>the creative that convinces them</b>, and <b>the page that converts them</b>.</p>
            <dl className="fx-facts">
              <div><dt>We ran</dt><dd>Ad management · Website · SEO</dd></div>
              <div><dt>We shifted</dt><dd>Residential pitch → B2B vendor</dd></div>
              <div><dt>We built</dt><dd>Funnel · 5-asset system · landing page</dd></div>
            </dl>
          </div>

          <aside className="fx-build">
            <div className="fx-build-head"><span>BUILD SHEET</span><span className="fx-build-count">5 ITEMS</span></div>
            <div className="fx-toggle">
              <button type="button" className={phase === "before" ? "on" : ""} onClick={() => setPhase("before")}>BEFORE</button>
              <button type="button" className={phase === "after" ? "on red" : ""} onClick={() => setPhase("after")}>AFTER</button>
            </div>
            <dl className="fx-build-rows">
              {BUILD.map(([row, before, after]) => (
                <div key={row}>
                  <dt>{row}</dt>
                  <dd className={phase === "after" ? "is-after" : ""}>{phase === "after" ? after : before}</dd>
                </div>
              ))}
            </dl>
            <p className="fx-build-foot">Nothing here was a redesign. The trade was already good — what was missing was a route from that work to the people who buy it in volume. That route is the deliverable.</p>
          </aside>
        </div>

        <ul className="fx-trades">
          {TRADES.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </section>

      <FontLink />
      <style jsx global>{`
        .fx-page{--ink:#0c0c0d;--paper:#f4f2ee;--red:#e2231a;--grey:#8a8a86;--rule:rgba(12,12,13,.16);
          background:var(--paper);color:var(--ink);font-family:"Inter",system-ui,sans-serif;-webkit-font-smoothing:antialiased}
        .fx-page b{font-weight:600}

        .fx-rail{position:sticky;top:0;z-index:40;display:flex;align-items:center;justify-content:space-between;gap:16px;
          padding:10px 22px;background:var(--ink);color:var(--paper);font-family:"JetBrains Mono",monospace;font-size:11px;
          letter-spacing:.14em;text-transform:uppercase;border-bottom:3px solid var(--red)}
        .fx-back{color:var(--paper);text-decoration:none;opacity:.8}
        .fx-back:hover{opacity:1;color:var(--red)}
        .fx-rail-mid b{color:var(--red);font-weight:700}
        .fx-rail-end{opacity:.6}

        .fx-hero{background:var(--ink);color:var(--paper);padding:76px 22px 0}
        .fx-hero-grid{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1.35fr .65fr;gap:56px;align-items:start}
        .fx-kicker{display:flex;align-items:center;gap:12px;flex-wrap:wrap;font-family:"JetBrains Mono",monospace;font-size:11px;
          letter-spacing:.16em;text-transform:uppercase;color:var(--grey);margin:0 0 26px}
        .fx-stamp{border:2px solid var(--red);color:var(--red);padding:3px 9px;font-weight:700;transform:rotate(-3deg)}
        .fx-h1{font-family:"Anton","Arial Narrow",sans-serif;font-weight:400;font-size:clamp(38px,6.4vw,82px);line-height:.94;
          letter-spacing:.005em;margin:0 0 28px}
        .fx-h1 em{font-style:normal;color:var(--red)}
        .fx-deck{max-width:60ch;font-size:17px;line-height:1.65;color:rgba(244,242,238,.76);margin:0 0 34px}
        .fx-deck b{color:var(--paper)}
        .fx-facts{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;border-top:1px solid rgba(244,242,238,.18);padding-top:20px;margin:0}
        .fx-facts dt{font-family:"JetBrains Mono",monospace;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--red);margin-bottom:6px}
        .fx-facts dd{margin:0;font-size:14px;line-height:1.4;color:rgba(244,242,238,.9)}

        .fx-build{background:var(--paper);color:var(--ink);padding:20px;border:3px solid var(--red)}
        .fx-build-head{display:flex;justify-content:space-between;align-items:center;font-family:"JetBrains Mono",monospace;font-size:10px;
          font-weight:700;letter-spacing:.16em;text-transform:uppercase;border-bottom:1px solid var(--rule);padding-bottom:10px;margin-bottom:16px}
        .fx-build-count{color:var(--grey);font-weight:400}
        .fx-toggle{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:18px}
        .fx-toggle button{font-family:"JetBrains Mono",monospace;font-size:10.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;
          padding:9px 6px;cursor:pointer;background:transparent;color:var(--grey);border:1px solid var(--rule);transition:all 160ms ease}
        .fx-toggle button:hover{color:var(--ink);border-color:var(--ink)}
        .fx-toggle button.on{background:var(--ink);color:var(--paper);border-color:var(--ink)}
        .fx-toggle button.on.red{background:var(--red);color:#fff;border-color:var(--red)}
        .fx-build-rows{margin:0}
        .fx-build-rows>div{display:grid;grid-template-columns:92px 1fr;gap:12px;align-items:baseline;padding:11px 0;border-bottom:1px solid var(--rule)}
        .fx-build-rows dt{font-family:"JetBrains Mono",monospace;font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--grey)}
        .fx-build-rows dd{margin:0;font-size:13.5px;line-height:1.4;color:#55534f;transition:color 160ms ease}
        .fx-build-rows dd.is-after{color:var(--ink);font-weight:600}
        .fx-build-foot{font-size:12.5px;line-height:1.55;color:#55534f;margin:18px 0 0;padding-top:14px}

        .fx-trades{max-width:1200px;margin:60px auto 0;padding:0 0 26px;list-style:none;display:flex;flex-wrap:wrap;gap:10px}
        .fx-trades li{font-family:"JetBrains Mono",monospace;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;
          border:1px solid rgba(244,242,238,.28);color:rgba(244,242,238,.8);padding:7px 12px}

        .fx-sec-head{display:flex;align-items:center;gap:16px;font-family:"JetBrains Mono",monospace;font-size:11px;font-weight:700;
          letter-spacing:.2em;text-transform:uppercase;max-width:1200px;margin:0 auto 40px;padding:0}
        .fx-sec-head i{flex:1;height:1px;background:var(--rule)}
        .fx-sec-meta{color:var(--red)}
        .fx-sec-head.light i{background:rgba(244,242,238,.2)}

        .fx-scope{padding:84px 22px}
        .fx-row{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:88px 1fr;gap:24px;padding:30px 0;border-top:1px solid var(--rule)}
        .fx-row:last-child{border-bottom:1px solid var(--rule)}
        .fx-row-no{font-family:"Anton",sans-serif;font-size:44px;line-height:.8;color:var(--red)}
        .fx-row-main h3{font-family:"Anton",sans-serif;font-weight:400;font-size:28px;letter-spacing:.01em;margin:0 0 8px;text-transform:uppercase}
        .fx-row-meta{font-family:"JetBrains Mono",monospace;font-size:10.5px;letter-spacing:.14em;color:var(--grey);margin:0 0 14px}
        .fx-row-body{max-width:74ch;font-size:15.5px;line-height:1.7;margin:0;color:#33322f}

        .fx-creative{background:var(--ink);color:var(--paper);padding:84px 22px}
        .fx-creative-intro{max-width:78ch;margin:0 auto 44px;font-size:16px;line-height:1.7;color:rgba(244,242,238,.74)}
        .fx-creative-intro b{color:var(--red)}
        .fx-sheet{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
        .fx-cell{position:relative;display:block;padding:0;border:0;cursor:pointer;background:#000;text-align:left;overflow:hidden}
        .fx-cell-img{width:100%;height:auto;display:block;transition:transform 420ms ease,opacity 240ms ease}
        .fx-cell:hover .fx-cell-img{transform:scale(1.03);opacity:.86}
        .fx-cell-tag{position:absolute;top:0;left:0;z-index:2;background:var(--red);color:#fff;font-family:"JetBrains Mono",monospace;
          font-size:9.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;padding:6px 10px}
        .fx-cell-line{display:block;padding:12px 4px 0;font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.06em;color:rgba(244,242,238,.68)}

        .fx-land{padding:84px 22px}
        .fx-land-grid{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1.1fr .9fr;gap:56px;align-items:start}
        .fx-url{font-family:"JetBrains Mono",monospace;font-size:12px;font-weight:700;letter-spacing:.06em;color:var(--red);
          border-bottom:2px solid var(--red);display:inline-block;padding-bottom:4px;margin:0 0 22px}
        .fx-land-copy p{font-size:16px;line-height:1.72;color:#33322f;margin:0 0 16px;max-width:62ch}
        .fx-land-note{border-left:3px solid var(--red);padding-left:16px;font-style:italic;color:#55534f!important}
        .fx-ladder{list-style:none;margin:0;padding:0}
        .fx-ladder li{display:grid;grid-template-columns:54px 1fr;gap:18px;align-items:start;padding:22px 0;border-top:1px solid var(--rule)}
        .fx-ladder li:last-child{border-bottom:1px solid var(--rule)}
        .fx-ladder-step{font-family:"Anton",sans-serif;font-size:30px;line-height:.9;color:var(--red)}
        .fx-ladder b{display:block;font-family:"Anton",sans-serif;font-weight:400;font-size:19px;text-transform:uppercase;letter-spacing:.01em;margin-bottom:5px}
        .fx-ladder span:last-child{font-size:13.5px;line-height:1.55;color:#55534f}

        .fx-site{max-width:1200px;margin:56px auto 0}
        .fx-shot-bar{display:flex;align-items:center;gap:14px;background:var(--ink);padding:9px 14px;
          font-family:"JetBrains Mono",monospace;font-size:10.5px;letter-spacing:.1em;text-transform:uppercase}
        .fx-shot-dots{display:flex;gap:6px}
        .fx-shot-dots i{width:9px;height:9px;border-radius:50%;background:rgba(244,242,238,.28)}
        .fx-shot-dots i:first-child{background:var(--red)}
        .fx-shot-url{flex:1;color:rgba(244,242,238,.72);letter-spacing:.04em;text-transform:none}
        .fx-shot-ours{background:var(--red);color:#fff;font-weight:700;padding:3px 8px;letter-spacing:.14em}
        .fx-shot-live{color:var(--red);font-weight:700}
        .fx-site-tabs{display:flex;flex-wrap:wrap;border:1px solid var(--rule);border-top:0;border-bottom:0}
        .fx-site-tabs button{flex:1;min-width:110px;cursor:pointer;background:#e9e6e0;border:0;border-right:1px solid var(--rule);
          padding:11px 10px;font-family:"JetBrains Mono",monospace;font-size:10.5px;font-weight:700;letter-spacing:.12em;
          text-transform:uppercase;color:#6d6b67;transition:background 140ms ease,color 140ms ease}
        .fx-site-tabs button:last-child{border-right:0}
        .fx-site-tabs button:hover{background:#dedad2;color:var(--ink)}
        .fx-site-tabs button.on{background:var(--paper);color:var(--red)}
        .fx-site-window{position:relative;height:620px;overflow-y:auto;overflow-x:hidden;border:1px solid var(--rule);background:#fff;scrollbar-width:thin}
        .fx-site-img{width:100%;height:auto;display:block}
        .fx-site-hint{position:sticky;bottom:10px;float:right;right:10px;margin-right:12px;background:rgba(12,12,13,.78);
          color:var(--paper);font-family:"JetBrains Mono",monospace;font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;
          padding:5px 9px;pointer-events:none}
        .fx-site-foot{display:flex;align-items:center;justify-content:space-between;gap:16px;border:1px solid var(--rule);border-top:0;padding:12px 14px}
        .fx-site-nav{display:flex;align-items:center;gap:12px}
        .fx-site-nav button{width:34px;height:34px;cursor:pointer;line-height:1;background:transparent;border:1px solid var(--rule);
          color:var(--ink);font-size:20px;transition:all 140ms ease}
        .fx-site-nav button:hover{background:var(--red);border-color:var(--red);color:#fff}
        .fx-site-nav span{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.12em;color:var(--grey)}
        .fx-visit{display:inline-flex;align-items:center;gap:9px;background:var(--red);color:#fff;text-decoration:none;padding:11px 18px;
          font-family:"JetBrains Mono",monospace;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;transition:background 140ms ease}
        .fx-visit:hover{background:var(--ink)}
        .fx-site figcaption{font-family:"JetBrains Mono",monospace;font-size:11px;line-height:1.6;letter-spacing:.04em;
          color:var(--grey);border-left:3px solid var(--red);padding-left:14px;margin-top:18px;max-width:70ch}

        .fx-punch{background:var(--ink);color:var(--paper);padding:84px 22px}
        .fx-punch-list{max-width:1200px;margin:0 auto;list-style:none;padding:0;display:grid;grid-template-columns:repeat(2,1fr);gap:0 44px}
        .fx-punch-list li{display:grid;grid-template-columns:26px 1fr;row-gap:3px;column-gap:12px;padding:18px 0;border-bottom:1px solid rgba(244,242,238,.14)}
        .fx-tick{grid-row:span 2;color:var(--red);font-size:15px;line-height:1.2}
        .fx-punch-list b{font-family:"JetBrains Mono",monospace;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase}
        .fx-punch-list span:last-child{font-size:13.5px;line-height:1.5;color:rgba(244,242,238,.6)}

        .fx-signoff{padding:64px 22px 84px}
        .fx-sign-grid{max-width:1200px;margin:0 auto 40px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px;border-top:3px solid var(--ink);padding-top:22px}
        .fx-sign-label{font-family:"JetBrains Mono",monospace;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--grey);margin:0 0 8px}
        .fx-sign-name{font-family:"Anton",sans-serif;font-size:24px;text-transform:uppercase;margin:0;letter-spacing:.01em}
        .fx-sign-name.red{color:var(--red)}
        .fx-sign-back{display:block;max-width:1200px;margin:0 auto;font-family:"JetBrains Mono",monospace;font-size:11px;
          letter-spacing:.14em;text-transform:uppercase;color:var(--ink);text-decoration:none}
        .fx-sign-back:hover{color:var(--red)}

        .fx-modal{--red:#e2231a;position:fixed;inset:0;z-index:90;background:rgba(8,8,9,.95);display:none;align-items:center;justify-content:center;padding:40px}
        .fx-modal.open{display:flex}
        .fx-modal-inner{max-width:min(560px,84vw);max-height:84vh}
        .fx-modal-img{width:100%;height:auto;display:block}
        .fx-modal-x{position:absolute;top:22px;right:26px;background:none;border:0;color:#fff;font-size:26px;cursor:pointer}
        .fx-modal-x:hover,.fx-modal-nav:hover{color:var(--red)}
        .fx-modal-nav{position:absolute;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.07);border:0;color:#fff;
          font-size:38px;width:56px;height:56px;cursor:pointer;line-height:1}
        .fx-modal-nav.prev{left:22px}.fx-modal-nav.next{right:22px}
        .fx-modal-cap{position:absolute;bottom:24px;left:0;right:0;text-align:center;font-family:"JetBrains Mono",monospace;
          font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.62)}

        @media(max-width:940px){
          .fx-hero-grid{grid-template-columns:1fr;gap:40px}
          .fx-land-grid{grid-template-columns:1fr;gap:38px}
          .fx-sheet{grid-template-columns:repeat(2,1fr)}
          .fx-punch-list{grid-template-columns:1fr;gap:0}
          .fx-rail-mid{display:none}
        }
        @media(max-width:560px){
          .fx-hero{padding-top:48px}
          .fx-facts{grid-template-columns:1fr;gap:16px}
          .fx-sheet{grid-template-columns:1fr}
          .fx-row{grid-template-columns:56px 1fr;gap:14px}
          .fx-row-no{font-size:32px}
          .fx-sign-grid{grid-template-columns:1fr;gap:18px}
        }
      `}</style>
    </div>
  );
}

function FontLink() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap"
      />
    </>
  );
}
