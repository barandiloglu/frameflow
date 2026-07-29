"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
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

// Display order per prototype: 02, 03, 01, 04, 05
const CREATIVES = [
  { src: "/portfolio/fidan-construction/ads/02-turnover-ready.jpg",      alt: "Before and after of a patched, repainted rental-unit wall and ceiling, headline 'Turnover ready in 48 hours'", hook: "Turnover speed", line: "Turnover ready in 48 hours." },
  { src: "/portfolio/fidan-construction/ads/03-vacant-units.jpg",        alt: "A vacant, sunlit rental unit with torn-up subfloor, headline 'Vacant units cost you money'",                   hook: "Vacancy math",   line: "Vacant units cost you money." },
  { src: "/portfolio/fidan-construction/ads/01-demo-to-clean-finish.jpg", alt: "Before and after of stripped basement framing and insulation, cleaned and sealed, headline 'From demo to clean finish'", hook: "Scope of work", line: "From demo to clean finish — 2 days." },
  { src: "/portfolio/fidan-construction/ads/04-one-team.jpg",            alt: "Before and after of a repaired ceiling beside finished kitchen cabinets, headline 'One team, start to finish'",   hook: "One vendor",     line: "One team, start to finish." },
  { src: "/portfolio/fidan-construction/ads/05-flawless-finish.jpg",     alt: "Before and after of a bare wall finished and painted with a window, headline 'Flawless finish, no callbacks'",    hook: "Trade quality",  line: "Flawless finish, no callbacks." },
] as const;

const SHOTS = [
  { label: "Property Managers", path: "/property-managers", src: "/portfolio/fidan-construction/website/property-managers.jpg", ours: true,  note: "The B2B page. Offer and qualifying form above the fold, then the five trades, the three-step process, and the objections answered in order." },
  { label: "Home",             path: "/",                  src: "/portfolio/fidan-construction/website/home.jpg",             ours: false, note: "The site the campaign page lives inside — residential-facing, built for a different reader. Kept intact; we added the commercial door beside it." },
  { label: "Services",         path: "/services",          src: "/portfolio/fidan-construction/website/services.jpg",         ours: false, note: "Five trades under one vendor — the claim the whole B2B pitch rests on, stated on the client's own site." },
  { label: "Projects",         path: "/projects",          src: "/portfolio/fidan-construction/website/projects.jpg",         ours: false, note: "The proof shelf. Real completed work, which is also where the campaign creative was sourced from." },
] as const;

const LADDER = [
  { step: "01", title: "Submit the form",          note: "Six fields. Role, portfolio size, service, timeline." },
  { step: "02", title: "30-min walkthrough",       note: "On site. Free. Issues found before they are quoted." },
  { step: "03", title: "Written quote in 48 hours", note: "In writing, not a phone estimate." },
] as const;

const PUNCH = [
  ["Campaign architecture", "Two-stage funnel, budget split, scaling thresholds defined up front"],
  ["Audience stack",        "Property & building managers, Ottawa metro + 50 km"],
  ["Lead form",             "Higher-intent mode, six qualifying questions, routing rules"],
  ["Creative system",       "Five statics on one visual grammar, 1:1 and 9:16"],
  ["Copy bank",             "Four hooks — turnover speed, one vendor, social proof, after-hours"],
  ["Landing page",          "/property-managers — live, offer-led, one CTA"],
  ["Reporting",             "Scheduled performance reviews against the plan's own thresholds"],
] as const;

const SITE_ROOT = "https://fidanconstruction.com";

export function FidanConstructionPage({ client }: Props) {
  const frame = getFrameNumber(client); // "012"
  const wo = `FF-${frame}`;

  const [phase, setPhase] = useState<"before" | "after">("after");

  const [lightbox, setLightbox] = useState<number | null>(null);
  const openLightbox = useCallback((i: number) => setLightbox(i), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const stepLightbox = useCallback(
    (delta: number) => setLightbox((i) => (i === null ? i : (i + delta + CREATIVES.length) % CREATIVES.length)),
    []
  );

  const [siteTab, setSiteTab] = useState(0);
  const shot = SHOTS[siteTab];
  const shotUrl = "fidanconstruction.com" + (shot.path === "/" ? "" : shot.path);

  useEffect(() => {
    if (lightbox === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") stepLightbox(-1);
      else if (e.key === "ArrowRight") stepLightbox(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeLightbox, stepLightbox]);

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

      <section className="fx-scope">
        <h2 className="fx-sec-head"><span>SCOPE OF WORK</span><i></i><span className="fx-sec-meta">3 LINE ITEMS</span></h2>

        <article className="fx-row"><span className="fx-row-no">01</span><div className="fx-row-main">
          <h3>Ad Management</h3><p className="fx-row-meta">META · IG + FB · OTTAWA +50KM</p>
          <p className="fx-row-body">A two-stage B2B funnel built for property managers, not homeowners. Cold lead generation on native lead forms with a higher-intent qualifying step, retargeting held back until the audience pool could actually carry it. Reviewed on a fixed cadence — creative, audience and form read together, never in isolation.</p>
        </div></article>

        <article className="fx-row"><span className="fx-row-no">02</span><div className="fx-row-main">
          <h3>Website Design</h3><p className="fx-row-meta">FIDANCONSTRUCTION.COM/PROPERTY-MANAGERS · LIVE</p>
          <p className="fx-row-body">A landing page written for one reader. Not the homepage, not the residential pitch — a dedicated B2B page that answers the property manager&rsquo;s question in the first screen and carries one offer the whole way down.</p>
        </div></article>

        <article className="fx-row"><span className="fx-row-no">03</span><div className="fx-row-main">
          <h3>SEO</h3><p className="fx-row-meta">LOCAL · OTTAWA METRO</p>
          <p className="fx-row-body">Service and geography made legible: five trades named plainly, the service radius stated, compliance and after-hours availability surfaced as text rather than buried in a brochure.</p>
        </div></article>
      </section>

      <section className="fx-creative">
        <h2 className="fx-sec-head light"><span>THE CREATIVE SYSTEM</span><i></i><span className="fx-sec-meta">5 ASSETS · ONE GRAMMAR</span></h2>
        <p className="fx-creative-intro">We set the rules and built to them. No stock, no renders — every frame is a real Fidan job, shot on site and cut <b>BEFORE</b> against <b>AFTER</b> so the proof lands before a word is read. One condensed headline, the payoff line always in red, the logo in the same place every time. Built once, extended five ways — square for feed, vertical for reels. A system the client can keep shooting into, not five one-off posts.</p>
        <div className="fx-sheet">
          {CREATIVES.map((c, i) => (
            <button className="fx-cell" key={c.src} onClick={() => openLightbox(i)}>
              <span className="fx-cell-tag">{c.hook}</span>
              <img className="fx-cell-img" src={c.src} alt={c.alt} />
              <span className="fx-cell-line">{c.line}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="fx-land">
        <h2 className="fx-sec-head"><span>THE LANDING PAGE</span><i></i><span className="fx-sec-meta">LIVE</span></h2>
        <div className="fx-land-grid">
          <div className="fx-land-copy">
            <p className="fx-url">fidanconstruction.com/property-managers</p>
            <p>The homepage sells to homeowners. Property managers buy differently — they are not choosing a colour, they are removing a problem from a list. So they got their own page: the trades named in plain language, the service radius stated, compliance and after-hours availability up front, and a single offer repeated until it is impossible to miss.</p>
            <p className="fx-land-note">One page, one reader, one call to action. Everything that did not serve the walkthrough was cut.</p>
          </div>
          <ol className="fx-ladder">
            {LADDER.map((l) => (
              <li key={l.step}><span className="fx-ladder-step">{l.step}</span><div><b>{l.title}</b><span>{l.note}</span></div></li>
            ))}
          </ol>
        </div>

        <figure className="fx-site">
          <div className="fx-shot-bar">
            <span className="fx-shot-dots"><i></i><i></i><i></i></span>
            <span className="fx-shot-url">{shotUrl}</span>
            {shot.ours && <span className="fx-shot-ours">BUILT BY US</span>}
            <span className="fx-shot-live">● LIVE</span>
          </div>
          <nav className="fx-site-tabs">
            {SHOTS.map((s, i) => (
              <button type="button" key={s.path} className={i === siteTab ? "on" : ""} onClick={() => setSiteTab(i)}>{s.label}</button>
            ))}
          </nav>
          <div className="fx-site-window" key={siteTab}>
            <img className="fx-site-img" src={shot.src} alt={`${shot.label} page of fidanconstruction.com, full page`} />
            <span className="fx-site-hint">scroll inside ↕</span>
          </div>
          <div className="fx-site-foot">
            <div className="fx-site-nav">
              <button type="button" onClick={() => setSiteTab((i) => (i - 1 + SHOTS.length) % SHOTS.length)} aria-label="Previous page">‹</button>
              <span>{String(siteTab + 1).padStart(2, "0")} / {String(SHOTS.length).padStart(2, "0")}</span>
              <button type="button" onClick={() => setSiteTab((i) => (i + 1) % SHOTS.length)} aria-label="Next page">›</button>
            </div>
            <a className="fx-visit" href={SITE_ROOT + shot.path} target="_blank" rel="noopener noreferrer">Visit this page <span>↗</span></a>
          </div>
          <figcaption>{shot.note}</figcaption>
        </figure>
      </section>

      <section className="fx-punch">
        <h2 className="fx-sec-head light"><span>PUNCH LIST</span><i></i><span className="fx-sec-meta">DELIVERED</span></h2>
        <ul className="fx-punch-list">
          {PUNCH.map(([label, desc]) => (
            <li key={label}><span className="fx-tick">✕</span><b>{label}</b><span>{desc}</span></li>
          ))}
        </ul>
      </section>

      <footer className="fx-signoff">
        <div className="fx-sign-grid">
          <div><p className="fx-sign-label">PREPARED BY</p><p className="fx-sign-name">FrameFlow</p></div>
          <div><p className="fx-sign-label">WORK ORDER</p><p className="fx-sign-name">{wo}</p></div>
          <div><p className="fx-sign-label">STATUS</p><p className="fx-sign-name red">Delivered</p></div>
        </div>
        <Link className="fx-sign-back" href="/portfolio">← Back to portfolio</Link>
      </footer>

      {lightbox !== null && (
        <div
          className="fx-modal open"
          role="dialog"
          aria-modal="true"
          aria-label={`${CREATIVES[lightbox].hook} — frame ${lightbox + 1} of ${CREATIVES.length}`}
          onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
        >
          <button className="fx-modal-nav prev" onClick={() => stepLightbox(-1)} aria-label="Previous">←</button>

          <div className="fx-modal-stage">
            <div className="fx-modal-bar top">
              <span className="fx-modal-counter">★ Frame <b>{String(lightbox + 1).padStart(2, "0")}</b> / {String(CREATIVES.length).padStart(2, "0")}</span>
              <span className="fx-modal-brand">FIDAN · {wo}</span>
              <button className="fx-modal-close" onClick={closeLightbox} aria-label="Close">×</button>
            </div>
            <div className="fx-modal-image-wrap">
              <img src={CREATIVES[lightbox].src} alt={CREATIVES[lightbox].alt} />
            </div>
            <div className="fx-modal-bar bot">
              <span className="fx-modal-slate">{CREATIVES[lightbox].hook} — {CREATIVES[lightbox].line}</span>
            </div>
          </div>

          <button className="fx-modal-nav next" onClick={() => stepLightbox(1)} aria-label="Next">→</button>
        </div>
      )}

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

        .fx-modal{position:fixed;inset:0;z-index:90;display:none;align-items:center;justify-content:center;padding:32px;background:rgba(8,8,9,.95);animation:fx-fade .22s ease-out}
        .fx-modal.open{display:flex}
        @keyframes fx-fade{from{opacity:0}to{opacity:1}}
        .fx-modal-stage{position:relative;width:min(960px,92vw);height:min(92vh,1080px);max-height:92vh;background:var(--paper);display:flex;flex-direction:column;box-shadow:0 30px 90px rgba(0,0,0,.6);animation:fx-pop .28s cubic-bezier(0.34,1.56,0.64,1)}
        @keyframes fx-pop{from{transform:scale(.96);opacity:0}to{transform:scale(1);opacity:1}}
        .fx-modal-bar{flex:0 0 auto;display:flex;align-items:center;gap:12px;padding:13px 16px;font-family:"JetBrains Mono",monospace;font-weight:700;font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--grey)}
        .fx-modal-bar.top{border-bottom:3px solid var(--red);justify-content:space-between}
        .fx-modal-bar.bot{border-top:1px solid var(--rule);justify-content:center}
        .fx-modal-counter b{color:var(--red);font-weight:700}
        .fx-modal-brand{letter-spacing:.2em;color:var(--ink)}
        .fx-modal-slate{letter-spacing:.08em;color:var(--ink);text-transform:none;font-weight:500}
        .fx-modal-close{width:30px;height:30px;background:var(--ink);color:var(--paper);border:0;cursor:pointer;font-family:"JetBrains Mono",monospace;font-size:16px;font-weight:700;line-height:1;padding:0;display:flex;align-items:center;justify-content:center;transition:background .16s}
        .fx-modal-close:hover{background:var(--red)}
        .fx-modal-image-wrap{flex:1 1 auto;min-height:0;position:relative;background:var(--ink);overflow:hidden;display:flex;align-items:center;justify-content:center}
        .fx-modal-image-wrap img{width:100%;height:100%;object-fit:contain;display:block}
        .fx-modal-nav{position:absolute;top:50%;transform:translateY(-50%);width:54px;height:54px;background:var(--paper);color:var(--ink);border:2px solid var(--ink);cursor:pointer;font-family:"JetBrains Mono",monospace;font-size:20px;font-weight:700;line-height:1;padding:0;display:flex;align-items:center;justify-content:center;transition:transform .16s,background .16s,color .16s;z-index:2}
        .fx-modal-nav:hover{transform:translateY(-50%) scale(1.06);background:var(--red);color:#fff;border-color:var(--red)}
        .fx-modal-nav.prev{left:32px}.fx-modal-nav.next{right:32px}

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
        @media (prefers-reduced-motion: reduce){
          .fx-modal,.fx-modal-stage{animation:none}
          .fx-cell-img,.fx-modal-close,.fx-modal-nav,.fx-site-nav button,.fx-visit,.fx-toggle button,.fx-site-tabs button{transition:none}
          .fx-cell:hover .fx-cell-img{transform:none}
          .fx-modal-nav:hover{transform:translateY(-50%)}
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
