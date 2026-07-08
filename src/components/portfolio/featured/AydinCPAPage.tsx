"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getFrameNumber } from "@/data/clients";
import type { Client } from "@/data/clients";
import { LoadingTransition } from "@/components/portfolio/LoadingTransition";

type Props = { client: Client };

const POSTS = [
  { src: "/portfolio/aydin-cpa/posts/01-fhsa.png",              alt: "Aydın CPA social post — a navy path leading to a glowing house, headline 'Attention, first-time home buyers: the account you need, FHSA'", tag: "Business Guides", headline: "FHSA" },
  { src: "/portfolio/aydin-cpa/posts/02-salary-or-dividend.png", alt: "Aydın CPA social post — a 3D coin figure at a crossroads, headline 'Paying yourself: salary or dividend?'",                                  tag: "Business Guides", headline: "Salary or Dividend" },
  { src: "/portfolio/aydin-cpa/posts/03-30000-threshold.png",    alt: "Aydın CPA social post — an abstract 3D dollar sign, headline 'Did you hit $30,000 this year?'",                                             tag: "Deadlines",       headline: "Did You Hit $30,000?" },
  { src: "/portfolio/aydin-cpa/posts/04-cra-red-flags.png",      alt: "Aydın CPA social post — a single red flag on white, headline 'CRA red flags'",                                                             tag: "Myth Busting",    headline: "CRA Red Flags" },
] as const;

const REELS = [
  { src: "/portfolio/aydin-cpa/reels/reel-01-new-tax-season.mp4",  poster: "/portfolio/aydin-cpa/reels/reel-01-new-tax-season-poster.jpg",  headline: "New Tax Season Is Here" },
  { src: "/portfolio/aydin-cpa/reels/reel-02-not-filing-risk.mp4", poster: "/portfolio/aydin-cpa/reels/reel-02-not-filing-risk-poster.jpg", headline: "Not Filing Is The Real Risk" },
  { src: "/portfolio/aydin-cpa/reels/reel-03-when-to-incorporate.mp4",          poster: "/portfolio/aydin-cpa/reels/reel-03-when-to-incorporate-poster.jpg",          headline: "When To Incorporate" },
] as const;

const PILLARS = [
  { id: "P.01", name: "Tax Strategy & Myth Busting", note: "How tax actually works" },
  { id: "P.02", name: "Business Owner Guides",        note: "Corp vs. personal, vehicles, dividends" },
  { id: "P.03", name: "Niche Deep-Dives",            note: "Realtors, gig economy, expats" },
  { id: "P.04", name: "Deadlines & Urgency",         note: "RRSP, T4, year-ends" },
  { id: "P.05", name: "Firm Authority",              note: "Proactive partner, not a filer" },
] as const;

export function AydinCPAPage({ client }: Props) {
  const frame = getFrameNumber(client);

  // Lightbox state (wired in Task 5)
  const [lightbox, setLightbox] = useState<number | null>(null);
  const openLightbox = useCallback((i: number) => setLightbox(i), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const stepLightbox = useCallback(
    (delta: number) => setLightbox((i) => (i === null ? i : (i + delta + POSTS.length) % POSTS.length)),
    []
  );

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
    <div className="ac-page">
      <LoadingTransition
        frameNumber={frame}
        clientName={client.name}
        scope={["Social", "Website"]}
        location="Ottawa & Toronto"
        year={client.year}
      />

      <header className="ac-rail">
        <Link className="ac-rail-back" href="/portfolio">← Portfolio</Link>
        <span className="ac-rail-center">AYDIN CPA · CASE STUDY</span>
        <span className="ac-rail-meta">FrameFlow · Reel <b>{frame}</b> · 2026</span>
      </header>

      <section className="ac-hero">
        <div className="ac-hero-inner">
          <div className="ac-hero-text">
            <p className="ac-crumb"><span>Case Study</span><i>·</i><span>Reel {frame}</span><i>·</i><span>Ottawa &amp; Toronto</span></p>
            <h1 className="ac-hero-title">Tax content people<br /><em>actually read.</em></h1>
            <p className="ac-hero-deck"><b>Aydın CPA</b> is a two-office accounting firm. Most accountants make tax look beige. We gave them a feed people stop for — and the <b>website</b> that turns that attention into booked calls at <b>aydincpa.ca</b>.</p>
            <dl className="ac-hero-meta">
              <div><dt>01 · Social</dt><dd>5 pillars · posts + reels</dd></div>
              <div><dt>02 · Website</dt><dd>aydincpa.ca · live</dd></div>
              <div><dt>Look</dt><dd>3D editorial, no stock</dd></div>
            </dl>
          </div>
          <div className="ac-hero-cards">
            <button className="ac-hcard hc-1" onClick={() => openLightbox(0)}><img src={POSTS[0].src} alt={POSTS[0].alt} /></button>
            <button className="ac-hcard hc-2" onClick={() => openLightbox(1)}><img src={POSTS[1].src} alt={POSTS[1].alt} /></button>
          </div>
        </div>
      </section>

      <section className="ac-marquee" aria-hidden="true">
        <div className="ac-marquee-track">
          {[0, 1].map((dup) => (
            <span className="ac-marquee-group" key={dup}>
              {["FHSA", "Salary or Dividend", "CRA Red Flags", "Did You Hit $30,000?", "Business Guides", "Deadlines & Urgency"].map((h) => (
                <span className="ac-marquee-item" key={h}>{h}<i>✦</i></span>
              ))}
            </span>
          ))}
        </div>
      </section>

      <section className="ac-brief">
        <div className="ac-brief-inner">
          <span className="ac-brief-stamp">The brief</span>
          <h2>Make tax feel <em>simple, modern,</em><br />and worth booking.</h2>
          <p>Their audience knows the words — CRA, RRSP, HST — but not the strategy, and they&apos;re a little afraid of all of it. The job: explain advanced tax simply, look nothing like a dusty accountant, and turn attention into consultations. No stock photos, no jargon.</p>
          <p className="ac-brief-by"><span></span> Aydın CPA · Ottawa &amp; Toronto</p>
        </div>
      </section>

      <section className="ac-del">
        <div className="ac-del-head">
          <span className="num">01</span>
          <div className="text"><p className="label">Deliverable 01 · Social Media</p><h3><em>A look</em> nobody else in tax has.</h3></div>
          <p className="meta"><span><b>5</b> content pillars</span><span><b>3D editorial</b> illustration</span><span><b>Posts + reels</b></span></p>
        </div>

        <div className="ac-pillars">
          <div className="head"><span>The content pillars</span><small>1 firm · 5 stories</small></div>
          <div className="grid">
            {PILLARS.map((p) => (
              <div className="pill" key={p.id}>
                <span className="pid">{p.id}</span>
                <span className="pname">{p.name}</span>
                <span className="pnote">{p.note}</span>
              </div>
            ))}
          </div>
          <p className="note">Every post is a single symbolic hero object on clean space — a path to a house, a coin at a crossroads, a red flag. Reads as a brand, not a spreadsheet.</p>
        </div>

        <p className="ac-grid-lbl">— The feed · illustration posts · tap to enlarge —</p>
        <div className="ac-grid">
          {POSTS.map((m, i) => (
            <button className="cell" key={m.src} onClick={() => openLightbox(i)}>
              <img src={m.src} alt={m.alt} />
              <span className="tag">{m.tag}</span>
              <span className="zoom">↗</span>
            </button>
          ))}
        </div>

        <p className="ac-grid-lbl reels-lbl">— The reels · direct-to-camera explainers —</p>
        <div className="ac-reels">
          {REELS.map((r) => (
            <div className="rcell" key={r.src}>
              <video src={r.src} poster={r.poster} controls playsInline preload="none" />
              <span className="rtag">{r.headline}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="ac-web">
        <div className="ac-web-inner">
          <div className="ac-del-head light">
            <span className="num">02</span>
            <div className="text"><p className="label">Deliverable 02 · Website Design</p><h3>A firm site <em>that closes.</em></h3></div>
            <p className="meta"><span><b>aydincpa.ca</b></span><span><b>Design + build</b></span><span><b>2 offices</b></span><span><b>Live</b></span></p>
          </div>
          <div className="ac-browser">
            <div className="ac-browser-bar"><span className="dot r"></span><span className="dot y"></span><span className="dot g"></span><span className="ac-url">aydincpa.ca</span></div>
            <div className="ac-browser-shot"><img src="/portfolio/aydin-cpa/website/home.png" alt="Aydın CPA website homepage — navy and orange, 'We Offer Reliable Accounting', Book a Consultation and File Your Tax Now" /></div>
          </div>
          <div className="ac-web-below">
            <ul className="ac-web-features">
              <li><span className="fl">Two-office firm site</span><span className="fn">Ottawa HQ + Toronto, one clear identity</span></li>
              <li><span className="fl">Services architecture</span><span className="fn">Personal · Corporate · GST/HST · Payroll · Advisory</span></li>
              <li><span className="fl">Dual conversion CTAs</span><span className="fn">&ldquo;Book a Consultation&rdquo; + &ldquo;File Your Tax Now&rdquo;</span></li>
              <li><span className="fl">Compliance / Advisory / Management</span><span className="fn">Tabbed offering, plain-English</span></li>
            </ul>
            <a className="ac-visit" href="https://aydincpa.ca/" target="_blank" rel="noopener noreferrer">Visit the live site →</a>
          </div>
        </div>
      </section>

      <section className="ac-colophon">
        <div className="ac-swatches">
          <div className="sw"><span className="chip" style={{ background: "#044585" }}></span><span className="sw-name">Deep Blue</span><span className="sw-hex">#044585</span></div>
          <div className="sw"><span className="chip" style={{ background: "#EC8023" }}></span><span className="sw-name">Orange</span><span className="sw-hex">#EC8023</span></div>
          <div className="sw"><span className="chip" style={{ background: "#F5F6F8", border: "1px solid #e6e9ee" }}></span><span className="sw-name">Off White</span><span className="sw-hex">#F5F6F8</span></div>
        </div>
        <h2 className="ac-close">Complex tax.<br /><em>Clear content.</em></h2>
        <p className="ac-sign">Prepared by <b>FrameFlow</b> · Reel {frame} · 2026</p>
        <div className="ac-colophon-cta">
          <Link className="ac-back-btn" href="/contact">Start a project →</Link>
          <Link className="ac-colophon-link" href="/portfolio">← Back to the archive</Link>
        </div>
      </section>

      {lightbox !== null && (
        <div
          className="ac-modal open"
          role="dialog"
          aria-modal="true"
          aria-label={`${POSTS[lightbox].headline} — enlarged`}
          onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
        >
          <button className="ac-modal-close" onClick={closeLightbox} aria-label="Close">✕</button>
          <button className="ac-modal-nav prev" onClick={() => stepLightbox(-1)} aria-label="Previous">‹</button>
          <div className="ac-modal-img"><img src={POSTS[lightbox].src} alt={POSTS[lightbox].alt} /></div>
          <button className="ac-modal-nav next" onClick={() => stepLightbox(1)} aria-label="Next">›</button>
          <p className="ac-modal-cap">Post · {POSTS[lightbox].tag} · {lightbox + 1} / {POSTS.length}</p>
        </div>
      )}

      <FontLink />
      <style jsx global>{`
        .ac-page{--navy:#044585;--navy-deep:#033568;--orange:#ec8023;--orange-deep:#cf6c17;--red:#cc0000;--off:#f5f6f8;--off-deep:#e6e9ee;--ink:#0f2136;background:var(--off);color:var(--navy);font-family:"Poppins",system-ui,sans-serif;min-height:100vh;overflow-x:hidden}
        .ac-page img{display:block;max-width:100%}

        .ac-rail{display:flex;align-items:center;justify-content:space-between;padding:20px 32px;border-bottom:1px solid var(--off-deep);font-size:13px;letter-spacing:.14em;text-transform:uppercase;position:sticky;top:0;z-index:30;background:rgba(245,246,248,.9);backdrop-filter:blur(10px)}
        .ac-rail-back{color:var(--navy);text-decoration:none;font-weight:600}
        .ac-rail-center{color:var(--navy);font-weight:700}
        .ac-rail-meta{color:#7a869a}.ac-rail-meta b{color:var(--orange)}

        .ac-hero{padding:clamp(48px,8vw,120px) 32px clamp(40px,6vw,90px);max-width:1240px;margin:0 auto}
        .ac-hero-inner{display:grid;grid-template-columns:1.2fr .8fr;gap:clamp(32px,5vw,80px);align-items:center}
        .ac-crumb{display:flex;gap:12px;align-items:center;font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:#7a869a;font-weight:600;margin-bottom:24px}
        .ac-crumb i{color:var(--orange);font-style:normal}
        .ac-hero-title{font-family:"Montserrat",sans-serif;font-weight:800;font-size:clamp(34px,5vw,68px);line-height:1.05;letter-spacing:-.01em;color:var(--navy);margin-bottom:26px}
        .ac-hero-title em{font-style:normal;color:var(--orange)}
        .ac-hero-deck{font-size:clamp(16px,1.6vw,20px);line-height:1.65;color:#43566d;max-width:560px;margin-bottom:32px}
        .ac-hero-deck b{color:var(--navy);font-weight:600}
        .ac-hero-meta{display:flex;gap:30px;flex-wrap:wrap;border-top:2px solid var(--off-deep);padding-top:22px}
        .ac-hero-meta dt{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--orange);font-weight:700;margin-bottom:6px}
        .ac-hero-meta dd{font-family:"Montserrat",sans-serif;font-size:16px;font-weight:700;color:var(--navy)}
        .ac-hero-cards{position:relative;height:clamp(360px,42vw,520px)}
        .ac-hcard{position:absolute;border:0;padding:0;cursor:pointer;overflow:hidden;border-radius:14px;background:#fff;box-shadow:0 24px 60px rgba(4,69,133,.22);width:66%;aspect-ratio:4/5;transition:transform .35s ease,box-shadow .35s ease}
        .ac-hcard img{width:100%;height:100%;object-fit:cover}
        .hc-1{left:0;top:6%;transform:rotate(-4deg);z-index:2}
        .hc-2{right:0;bottom:0;transform:rotate(4deg);z-index:1}
        .ac-hcard:hover{transform:scale(1.04) rotate(0);box-shadow:0 30px 70px rgba(236,128,35,.3);z-index:4}

        .ac-marquee{overflow:hidden;border-top:1px solid var(--off-deep);border-bottom:1px solid var(--off-deep);background:#fff;padding:18px 0}
        .ac-marquee-track{display:flex;width:max-content;animation:ac-scroll 32s linear infinite}
        .ac-marquee-group{display:flex;flex-shrink:0}
        .ac-marquee-item{display:flex;align-items:center;gap:26px;padding:0 26px;font-family:"Montserrat",sans-serif;font-weight:800;font-size:clamp(20px,2.4vw,34px);letter-spacing:-.01em;color:var(--navy);white-space:nowrap}
        .ac-marquee-item i{color:var(--orange);font-style:normal;font-size:.7em}
        @keyframes ac-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}

        .ac-brief{background:var(--navy);color:#fff;padding:clamp(60px,9vw,130px) 32px}
        .ac-brief-inner{max-width:900px;margin:0 auto;text-align:center}
        .ac-brief-stamp{display:inline-block;font-size:12px;letter-spacing:.28em;text-transform:uppercase;color:var(--orange);font-weight:700;border:1px solid rgba(236,128,35,.5);padding:7px 18px;border-radius:100px;margin-bottom:34px}
        .ac-brief h2{font-family:"Montserrat",sans-serif;font-weight:800;font-size:clamp(28px,4.4vw,56px);line-height:1.12;margin-bottom:28px}
        .ac-brief h2 em{font-style:normal;color:var(--orange)}
        .ac-brief p{font-size:clamp(16px,1.7vw,21px);line-height:1.7;color:rgba(255,255,255,.78);max-width:680px;margin:0 auto}
        .ac-brief-by{margin-top:32px!important;font-size:14px!important;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.6)!important;display:flex;align-items:center;justify-content:center;gap:12px}
        .ac-brief-by span{width:40px;height:2px;background:var(--orange);display:inline-block}

        .ac-del{max-width:1240px;margin:0 auto;padding:clamp(56px,8vw,110px) 32px}
        .ac-del-head{display:grid;grid-template-columns:auto 1fr;gap:18px 28px;align-items:start;margin-bottom:46px}
        .ac-del-head .num{font-family:"Montserrat",sans-serif;font-weight:800;font-size:clamp(60px,9vw,120px);line-height:.8;color:var(--orange);grid-row:span 2}
        .ac-del-head .label{font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:#7a869a;font-weight:700;margin-bottom:10px}
        .ac-del-head h3{font-family:"Montserrat",sans-serif;font-weight:800;font-size:clamp(26px,3.6vw,46px);line-height:1.08;letter-spacing:-.01em;color:var(--navy)}
        .ac-del-head h3 em{font-style:normal;color:var(--orange)}
        .ac-del-head .meta{grid-column:2;display:flex;gap:26px;flex-wrap:wrap;margin-top:16px}
        .ac-del-head .meta span{font-size:14px;color:#5a6b82}
        .ac-del-head .meta b{font-family:"Montserrat",sans-serif;color:var(--navy);font-weight:700}
        .ac-del-head.light .label{color:rgba(255,255,255,.6)}
        .ac-del-head.light h3{color:#fff}
        .ac-del-head.light .meta span{color:rgba(255,255,255,.72)}.ac-del-head.light .meta b{color:#fff}

        .ac-pillars{background:#fff;border:1px solid var(--off-deep);border-radius:20px;padding:30px;margin-bottom:44px;box-shadow:0 18px 44px rgba(4,69,133,.06)}
        .ac-pillars .head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:22px}
        .ac-pillars .head span{font-family:"Montserrat",sans-serif;font-weight:800;font-size:20px;color:var(--navy)}
        .ac-pillars .head small{font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:#7a869a}
        .ac-pillars .grid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}
        .pill{border:1px solid var(--off-deep);border-radius:14px;padding:18px 14px;background:var(--off);display:flex;flex-direction:column;gap:8px;transition:border-color .25s,transform .25s}
        .pill:hover{border-color:var(--orange);transform:translateY(-3px)}
        .pill .pid{font-family:"Montserrat",sans-serif;font-weight:800;font-size:14px;color:var(--orange)}
        .pill .pname{font-family:"Montserrat",sans-serif;font-weight:700;font-size:15px;color:var(--navy);line-height:1.2}
        .pill .pnote{font-size:12px;color:#7a869a;line-height:1.3}
        .ac-pillars .note{margin-top:20px;font-size:14px;color:#5a6b82;font-style:italic}

        .ac-grid-lbl{text-align:center;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#7a869a;margin-bottom:22px}
        .ac-grid-lbl.reels-lbl{margin-top:56px}
        .ac-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .ac-grid .cell{position:relative;border:0;padding:0;cursor:pointer;overflow:hidden;border-radius:12px;aspect-ratio:4/5;background:#fff;box-shadow:0 10px 26px rgba(4,69,133,.1);transition:transform .3s ease}
        .ac-grid .cell img{width:100%;height:100%;object-fit:cover}
        .ac-grid .cell:hover{transform:translateY(-4px)}
        .ac-grid .tag{position:absolute;left:8px;top:8px;z-index:2;background:rgba(4,69,133,.9);color:#fff;font-size:10px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;padding:4px 8px;border-radius:5px}
        .ac-grid .zoom{position:absolute;right:10px;bottom:10px;z-index:2;color:#fff;font-size:18px;opacity:0;transition:opacity .3s ease;text-shadow:0 2px 10px rgba(0,0,0,.4)}
        .ac-grid .cell:hover .zoom{opacity:1}

        .ac-reels{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;max-width:820px;margin:0 auto}
        .ac-reels .rcell{position:relative;border:0;padding:0;cursor:pointer;overflow:hidden;border-radius:12px;aspect-ratio:9/16;background:#111;box-shadow:0 12px 30px rgba(4,69,133,.16);transition:transform .3s ease}
        .ac-reels .rcell img{width:100%;height:100%;object-fit:cover}
        .ac-reels .rcell:hover{transform:translateY(-4px)}
        .ac-reels .play{position:absolute;inset:0;margin:auto;width:60px;height:60px;border-radius:50%;background:rgba(236,128,35,.92);color:#fff;display:flex;align-items:center;justify-content:center;font-size:22px;padding-left:4px;box-shadow:0 8px 24px rgba(0,0,0,.35)}
        .ac-reels .rtag{position:absolute;left:10px;right:10px;bottom:10px;z-index:2;color:#fff;font-family:"Montserrat",sans-serif;font-weight:700;font-size:13px;line-height:1.2;text-shadow:0 2px 8px rgba(0,0,0,.6)}
        .ac-page .ac-reels .rcell video{width:100%;height:100%;object-fit:cover;display:block;background:#111}
        .ac-page .ac-reels .rcell{background:#111}

        .ac-web{background:var(--navy);color:#fff}
        .ac-web-inner{max-width:1240px;margin:0 auto;padding:clamp(56px,8vw,110px) 32px}
        .ac-browser{border-radius:14px;overflow:hidden;box-shadow:0 30px 70px rgba(0,0,0,.35);background:#fff;max-width:1040px;margin:0 auto}
        .ac-browser-bar{display:flex;align-items:center;gap:8px;padding:12px 16px;background:#1f3350}
        .ac-browser-bar .dot{width:11px;height:11px;border-radius:50%}
        .ac-browser-bar .dot.r{background:#ff5f57}.ac-browser-bar .dot.y{background:#febc2e}.ac-browser-bar .dot.g{background:#28c840}
        .ac-url{margin-left:14px;font-size:13px;color:rgba(255,255,255,.7);background:rgba(255,255,255,.08);padding:4px 14px;border-radius:100px}
        .ac-browser-shot{line-height:0}.ac-browser-shot img{width:100%;height:auto;display:block}
        .ac-web-below{display:grid;grid-template-columns:1fr auto;gap:30px;align-items:end;margin-top:40px}
        .ac-web-features{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:1fr 1fr;gap:20px 40px}
        .ac-web-features li{border-top:2px solid rgba(255,255,255,.14);padding-top:12px}
        .ac-web-features .fl{display:block;font-family:"Montserrat",sans-serif;font-weight:700;font-size:16px;color:#fff;margin-bottom:4px}
        .ac-web-features .fn{display:block;font-size:13px;color:rgba(255,255,255,.62)}
        .ac-visit{flex-shrink:0;display:inline-block;font-family:"Montserrat",sans-serif;font-weight:700;font-size:15px;color:#fff;background:var(--orange);padding:15px 30px;border-radius:100px;text-decoration:none;white-space:nowrap;transition:background .25s,transform .25s}
        .ac-visit:hover{background:var(--orange-deep);transform:translateY(-2px)}

        .ac-colophon{background:var(--off-deep);padding:clamp(56px,8vw,110px) 32px;text-align:center}
        .ac-swatches{display:flex;gap:18px;justify-content:center;flex-wrap:wrap;margin-bottom:50px}
        .ac-swatches .sw{display:flex;flex-direction:column;align-items:center;gap:8px}
        .ac-swatches .chip{width:68px;height:68px;border-radius:14px;box-shadow:0 8px 20px rgba(4,69,133,.15)}
        .ac-swatches .sw-name{font-family:"Montserrat",sans-serif;font-weight:700;font-size:14px;color:var(--navy)}
        .ac-swatches .sw-hex{font-size:12px;color:#7a869a;font-variant-numeric:tabular-nums}
        .ac-close{font-family:"Montserrat",sans-serif;font-weight:800;font-size:clamp(32px,5.4vw,68px);line-height:1.05;color:var(--navy);margin-bottom:22px}
        .ac-close em{font-style:normal;color:var(--orange)}
        .ac-sign{font-size:14px;letter-spacing:.06em;color:#7a869a;margin-bottom:30px}.ac-sign b{color:var(--navy)}
        .ac-back-btn{display:inline-block;font-family:"Montserrat",sans-serif;font-weight:700;font-size:15px;color:#fff;background:var(--orange);padding:14px 30px;border-radius:100px;text-decoration:none;cursor:pointer;border:0}
        .ac-back-btn:hover{background:var(--orange-deep)}
        .ac-page .ac-colophon-cta{display:flex;gap:22px;align-items:center;justify-content:center;flex-wrap:wrap}
        .ac-page .ac-colophon-link{font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:#7a869a;text-decoration:none;font-weight:600}
        .ac-page .ac-colophon-link:hover{color:var(--navy)}

        .ac-modal{position:fixed;inset:0;z-index:200;background:rgba(6,20,40,.95);display:none;align-items:center;justify-content:center;padding:40px}
        .ac-modal.open{display:flex}
        .ac-modal-img{position:relative;width:min(90vw,640px);height:min(86vh,860px);display:flex;align-items:center;justify-content:center}
        .ac-modal-img img{max-width:100%;max-height:100%;object-fit:contain}
        .ac-modal-close{position:absolute;top:24px;right:28px;background:none;border:0;color:#fff;font-size:26px;cursor:pointer;opacity:.8}
        .ac-modal-nav{position:absolute;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.08);border:0;color:#fff;font-size:40px;width:60px;height:60px;border-radius:50%;cursor:pointer;line-height:1}
        .ac-modal-nav:hover{background:var(--orange)}
        .ac-modal-nav.prev{left:24px}.ac-modal-nav.next{right:24px}
        .ac-modal-cap{position:absolute;bottom:26px;left:0;right:0;text-align:center;color:rgba(255,255,255,.7);font-size:13px;letter-spacing:.1em;text-transform:uppercase}

        @media (max-width:880px){
          .ac-hero-inner{grid-template-columns:1fr}
          .ac-hero-cards{height:420px;max-width:360px;margin:0 auto}
          .ac-del-head{grid-template-columns:1fr}.ac-del-head .num{grid-row:auto}.ac-del-head .meta{grid-column:1}
          .ac-pillars .grid{grid-template-columns:repeat(2,1fr)}
          .ac-grid{grid-template-columns:repeat(2,1fr)}
          .ac-web-below{grid-template-columns:1fr}.ac-web-features{grid-template-columns:1fr}
          .ac-rail-center{display:none}
        }
        @media (max-width:520px){.ac-pillars .grid{grid-template-columns:1fr}}
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
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800;900&family=Poppins:wght@400;500;600&display=swap"
      />
    </>
  );
}
