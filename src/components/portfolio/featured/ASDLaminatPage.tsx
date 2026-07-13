"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getFrameNumber } from "@/data/clients";
import type { Client } from "@/data/clients";
import { LoadingTransition } from "@/components/portfolio/LoadingTransition";

type Props = { client: Client };

const POSTS = [
  { src: "/portfolio/asd-laminate/posts/01-exterior-compact.png",   alt: "ASD social post — a cantilevered modern building over water clad in ASD Exterior Compact Laminate, headline 'ASD Exterior Compact Laminate'", pillar: "Product Lines" },
  { src: "/portfolio/asd-laminate/posts/02-carbon.png",             alt: "ASD social post — a matte grey Carbon-surface kitchen and bedroom, headline 'Carbon by ASD Laminat'",                                        pillar: "Product Lines" },
  { src: "/portfolio/asd-laminate/posts/03-quebec-to-bc.png",       alt: "ASD social post — a grey-panelled building facade in snow, headline 'From Quebec to BC — ASD has you covered'",                             pillar: "Canadian Market" },
  { src: "/portfolio/asd-laminate/posts/04-panel-of-choice.png",    alt: "ASD social post — a figure leaning on a grey exterior panel wall, headline 'The Panel of Choice for Canadian Architects'",                 pillar: "Canadian Market" },
  { src: "/portfolio/asd-laminate/posts/05-safety-first.png",       alt: "ASD social post — a wood-panelled commercial lobby, headline 'Safety First with ASD Laminat', fire-retardant and low smoke",             pillar: "Performance" },
  { src: "/portfolio/asd-laminate/posts/06-built-to-last.png",      alt: "ASD social post — a wood-panelled living room, headline 'Built to Last', stable durable formable",                                        pillar: "Performance" },
  { src: "/portfolio/asd-laminate/posts/07-antiviral-laminate.png", alt: "ASD social post — a bright kitchen with a green virus-shield icon, headline 'Antiviral Laminate'",                                        pillar: "Healthy Spaces" },
  { src: "/portfolio/asd-laminate/posts/08-healthy-spaces.png",     alt: "ASD social post — clinic and office interiors with antiviral badges, headline 'Healthy Spaces are in all your living areas'",            pillar: "Healthy Spaces" },
  { src: "/portfolio/asd-laminate/posts/09-decors-designs.png",     alt: "ASD social post — a grid of solid-colour laminate swatches, headline 'Decors & Designs', 90-plus standard colours",                       pillar: "Decors" },
] as const;

const PILLARS = [
  { id: "P.01", name: "Product Lines",   note: "Exterior · Compact · Carbon" },
  { id: "P.02", name: "Canadian Market", note: "Halifax → Vancouver" },
  { id: "P.03", name: "Performance",     note: "Durable · fire-safe · formable" },
  { id: "P.04", name: "Healthy Spaces",  note: "Antiviral · food-safe" },
  { id: "P.05", name: "Decors",          note: "Wood, stone & trend collections" },
] as const;

export function ASDLaminatPage({ client }: Props) {
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
    <div className="asd-page">
      <LoadingTransition
        frameNumber={frame}
        clientName={client.name}
        scope={["Social", "Ads"]}
        location="Canada"
        year={client.year}
      />

      <header className="asd-rail">
        <Link className="asd-rail-back" href="/portfolio">← Portfolio</Link>
        <span className="asd-rail-center">ASD LAMINAT · CASE STUDY</span>
        <span className="asd-rail-meta">FrameFlow · Reel <b>{frame}</b> · 2025</span>
      </header>

      <section className="asd-hero">
        <div className="asd-hero-inner">
          <div className="asd-hero-text">
            <p className="asd-crumb"><span>Case Study</span><i>·</i><span>Reel {frame}</span><i>·</i><span>Canada</span></p>
            <h1 className="asd-hero-title">One market.<br /><em>Every channel.</em></h1>
            <p className="asd-hero-deck"><b>ASD Laminat</b> has pressed high-performance surfaces for <b>65 years</b> and ships to <b>85+ countries</b>. The brief for Canada: make the architects, fabricators and specifiers who choose the panel <b>know the name</b>. We built a five-pillar social system — then ran it hot across LinkedIn, Instagram and Google.</p>
            <dl className="asd-hero-meta">
              <div><dt>01 · Social</dt><dd>5 pillars · 1 voice</dd></div>
              <div><dt>02 · Ads</dt><dd>3 channels · 678K impressions</dd></div>
              <div><dt>Reach</dt><dd>Halifax → Vancouver</dd></div>
            </dl>
          </div>
          <div className="asd-hero-cards">
            <button className="asd-hcard hc-1" onClick={() => openLightbox(2)}><img src={POSTS[2].src} alt={POSTS[2].alt} /><span className="tag">Canadian Market</span></button>
            <button className="asd-hcard hc-2" onClick={() => openLightbox(1)}><img src={POSTS[1].src} alt={POSTS[1].alt} /><span className="tag">Product Lines</span></button>
            <button className="asd-hcard hc-3" onClick={() => openLightbox(3)}><img src={POSTS[3].src} alt={POSTS[3].alt} /><span className="tag">Specifier-first</span></button>
          </div>
        </div>
      </section>

      <section className="asd-marquee" aria-hidden="true">
        <div className="asd-marquee-track">
          {[0, 1].map((dup) => (
            <span className="asd-marquee-group" key={dup}>
              {["Product Lines", "Canadian Market", "Performance", "Healthy Spaces", "Decors"].map((h) => (
                <span className="asd-marquee-item" key={h}>{h}<i>✦</i></span>
              ))}
            </span>
          ))}
        </div>
      </section>

      <section className="asd-brief">
        <div className="asd-brief-inner">
          <span className="asd-brief-stamp">The brief</span>
          <h2>Make Canadian architects<br /><em>know the name.</em></h2>
          <p>A 65-year manufacturer, brand-new to the Canadian conversation. Two sides to the story — the product&apos;s proof, and the market&apos;s attention. Reach the people who actually spec the panel: architects, designers, fabricators. From Halifax to Vancouver.</p>
          <p className="asd-brief-by"><span></span> ASD Laminat · Canada</p>
        </div>
      </section>

      <section className="asd-del">
        <div className="asd-del-head">
          <span className="num">01</span>
          <div className="text">
            <p className="label">Deliverable 01 · Social Media</p>
            <h3><em>System</em> before posts. Five pillars, one voice.</h3>
          </div>
          <p className="meta">
            <span><b>5</b> content pillars</span>
            <span><b>9</b> hero creatives</span>
            <span><b>Product-led</b> storytelling</span>
          </p>
        </div>

        <div className="asd-pillars">
          <div className="head"><span>The pillar system</span><small>1 brand · 5 stories</small></div>
          <div className="grid">
            {PILLARS.map((p) => (
              <div className="pill" key={p.id}>
                <span className="pid">{p.id}</span>
                <span className="pname">{p.name}</span>
                <span className="pnote">{p.note}</span>
              </div>
            ))}
          </div>
          <p className="note">Every post ladders up to one of five pillars — so the feed reads as a brand, not a scrapbook.</p>
        </div>

        <div className="asd-grid-wrap">
          <p className="lbl">— The feed · nine shipped creatives · tap to enlarge —</p>
          <div className="asd-grid">
            {POSTS.map((m, i) => (
              <button className="cell" key={m.src} onClick={() => openLightbox(i)}>
                <img src={m.src} alt={m.alt} />
                <span className="pill-tag">{m.pillar}</span>
                <span className="zoom">↗</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightbox !== null && (
        <div
          className="asd-modal open"
          role="dialog"
          aria-modal="true"
          aria-label={`${POSTS[lightbox].pillar} creative — enlarged`}
          onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
        >
          <button className="asd-modal-close" onClick={closeLightbox} aria-label="Close">✕</button>
          <button className="asd-modal-nav prev" onClick={() => stepLightbox(-1)} aria-label="Previous">‹</button>
          <div className="asd-modal-img"><img src={POSTS[lightbox].src} alt={POSTS[lightbox].alt} /></div>
          <button className="asd-modal-nav next" onClick={() => stepLightbox(1)} aria-label="Next">›</button>
          <p className="asd-modal-cap">{POSTS[lightbox].pillar} · {lightbox + 1} / {POSTS.length}</p>
        </div>
      )}

      <FontLink />
      <style jsx global>{`
        .asd-page{
          --orange:#f26a21; --orange-deep:#c95315; --graphite:#262626; --graphite-soft:#33322f;
          --steel:#8a8c8e; --off:#f4f2ef; --off-deep:#e7e3dc; --ink:#1b1b1b;
          background:var(--off); color:var(--graphite); font-family:"Inter",system-ui,sans-serif;
          min-height:100vh; overflow-x:hidden;
        }
        .asd-page img{display:block;max-width:100%}

        /* RAIL */
        .asd-rail{display:flex;align-items:center;justify-content:space-between;padding:20px 32px;
          border-bottom:1px solid var(--off-deep);font-size:13px;letter-spacing:.14em;text-transform:uppercase;
          position:sticky;top:0;z-index:30;background:rgba(244,242,239,.86);backdrop-filter:blur(10px)}
        .asd-rail-back{color:var(--graphite);text-decoration:none;font-weight:600}
        .asd-rail-back:hover{color:var(--orange)}
        .asd-rail-center{color:var(--steel);font-weight:600}
        .asd-rail-meta{color:var(--steel)} .asd-rail-meta b{color:var(--orange)}

        /* HERO */
        .asd-hero{padding:clamp(48px,8vw,120px) 32px clamp(40px,6vw,90px);max-width:1240px;margin:0 auto}
        .asd-hero-inner{display:grid;grid-template-columns:1.15fr .85fr;gap:clamp(32px,5vw,80px);align-items:center}
        .asd-crumb{display:flex;gap:12px;align-items:center;font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:var(--steel);font-weight:600;margin-bottom:26px}
        .asd-crumb i{color:var(--orange);font-style:normal}
        .asd-hero-title{font-family:"Poppins",sans-serif;font-weight:800;font-size:clamp(48px,7.5vw,104px);line-height:.98;letter-spacing:-.02em;color:var(--graphite);margin-bottom:28px}
        .asd-hero-title em{font-style:normal;color:var(--orange)}
        .asd-hero-deck{font-size:clamp(16px,1.6vw,20px);line-height:1.65;color:#4a4844;max-width:560px;margin-bottom:34px}
        .asd-hero-deck b{color:var(--graphite);font-weight:700}
        .asd-hero-meta{display:flex;gap:30px;flex-wrap:wrap;border-top:2px solid var(--off-deep);padding-top:22px}
        .asd-hero-meta dt{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--orange);font-weight:700;margin-bottom:6px}
        .asd-hero-meta dd{font-family:"Poppins",sans-serif;font-size:17px;font-weight:600;color:var(--graphite)}
        .asd-hero-cards{position:relative;height:clamp(360px,40vw,500px)}
        .asd-hcard{position:absolute;border:0;padding:0;cursor:pointer;overflow:hidden;border-radius:14px;background:#fff;
          box-shadow:0 24px 60px rgba(38,38,38,.28);width:62%;aspect-ratio:4/5;transition:transform .35s ease,box-shadow .35s ease}
        .asd-hcard img{width:100%;height:100%;object-fit:cover}
        .asd-hcard .tag{position:absolute;left:10px;bottom:10px;z-index:2;background:var(--orange);color:#fff;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:5px 10px;border-radius:6px}
        .hc-1{left:0;top:8%;transform:rotate(-5deg);z-index:3}
        .hc-2{right:4%;top:0;transform:rotate(4deg);z-index:2}
        .hc-3{left:22%;bottom:0;transform:rotate(-1deg);z-index:1;opacity:.96}
        .asd-hcard:hover{transform:scale(1.04) rotate(0);box-shadow:0 30px 70px rgba(242,106,33,.32);z-index:5}

        /* MARQUEE */
        .asd-marquee{overflow:hidden;border-top:1px solid var(--off-deep);border-bottom:1px solid var(--off-deep);background:#fff;padding:18px 0}
        .asd-marquee-track{display:flex;width:max-content;animation:asd-scroll 30s linear infinite}
        .asd-marquee-group{display:flex;flex-shrink:0}
        .asd-marquee-item{display:flex;align-items:center;gap:26px;padding:0 26px;font-family:"Anton",sans-serif;font-size:clamp(22px,2.6vw,38px);letter-spacing:.01em;text-transform:uppercase;color:var(--graphite);white-space:nowrap}
        .asd-marquee-item i{color:var(--orange);font-style:normal;font-size:.7em}
        @keyframes asd-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}

        /* BRIEF */
        .asd-brief{background:var(--graphite);color:var(--off);padding:clamp(60px,9vw,130px) 32px}
        .asd-brief-inner{max-width:900px;margin:0 auto;text-align:center}
        .asd-brief-stamp{display:inline-block;font-size:12px;letter-spacing:.28em;text-transform:uppercase;color:var(--orange);font-weight:700;border:1px solid rgba(242,106,33,.4);padding:7px 18px;border-radius:100px;margin-bottom:34px}
        .asd-brief h2{font-family:"Poppins",sans-serif;font-weight:700;font-size:clamp(30px,4.6vw,60px);line-height:1.1;letter-spacing:-.01em;margin-bottom:30px}
        .asd-brief h2 em{font-style:normal;color:var(--orange)}
        .asd-brief p{font-size:clamp(16px,1.7vw,21px);line-height:1.7;color:rgba(244,242,239,.72);max-width:680px;margin:0 auto}
        .asd-brief-by{margin-top:32px!important;font-size:14px!important;letter-spacing:.14em;text-transform:uppercase;color:var(--steel)!important;display:flex;align-items:center;justify-content:center;gap:12px}
        .asd-brief-by span{width:40px;height:2px;background:var(--orange);display:inline-block}

        /* DELIVERABLE HEAD */
        .asd-del{max-width:1240px;margin:0 auto;padding:clamp(56px,8vw,110px) 32px}
        .asd-del-head{display:grid;grid-template-columns:auto 1fr;gap:20px 28px;align-items:start;margin-bottom:52px}
        .asd-del-head .num{font-family:"Anton",sans-serif;font-size:clamp(64px,9vw,128px);line-height:.8;color:var(--orange);grid-row:span 2}
        .asd-del-head .label{font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:var(--steel);font-weight:700;margin-bottom:10px}
        .asd-del-head h3{font-family:"Poppins",sans-serif;font-weight:700;font-size:clamp(26px,3.6vw,48px);line-height:1.08;letter-spacing:-.01em;color:var(--graphite)}
        .asd-del-head h3 em{font-style:normal;color:var(--orange)}
        .asd-del-head .meta{grid-column:2;display:flex;gap:26px;flex-wrap:wrap;margin-top:20px}
        .asd-del-head .meta span{font-size:14px;color:#55524d}
        .asd-del-head .meta b{font-family:"Poppins",sans-serif;color:var(--graphite);font-weight:700}
        .asd-del-head.light .label{color:rgba(244,242,239,.6)}
        .asd-del-head.light h3{color:var(--off)}
        .asd-del-head.light .meta span{color:rgba(244,242,239,.72)}
        .asd-del-head.light .meta b{color:var(--off)}

        /* PILLARS */
        .asd-pillars{background:#fff;border:1px solid var(--off-deep);border-radius:20px;padding:30px;margin-bottom:44px;box-shadow:0 18px 44px rgba(38,38,38,.06)}
        .asd-pillars .head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:22px}
        .asd-pillars .head span{font-family:"Poppins",sans-serif;font-weight:700;font-size:20px;color:var(--graphite)}
        .asd-pillars .head small{font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:var(--steel)}
        .asd-pillars .grid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}
        .pill{border:1px solid var(--off-deep);border-radius:14px;padding:18px 14px;background:var(--off);display:flex;flex-direction:column;gap:8px;transition:border-color .25s,transform .25s}
        .pill:hover{border-color:var(--orange);transform:translateY(-3px)}
        .pill .pid{font-family:"Anton",sans-serif;font-size:15px;color:var(--orange);letter-spacing:.04em}
        .pill .pname{font-family:"Poppins",sans-serif;font-weight:600;font-size:16px;color:var(--graphite);line-height:1.15}
        .pill .pnote{font-size:12px;color:var(--steel);line-height:1.3}
        .asd-pillars .note{margin-top:20px;font-size:14px;color:#6a675f;font-style:italic}

        /* SOCIAL GRID */
        .asd-grid-wrap .lbl{text-align:center;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--steel);margin-bottom:22px}
        .asd-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .asd-grid .cell{position:relative;border:0;padding:0;cursor:pointer;overflow:hidden;border-radius:12px;aspect-ratio:4/5;background:#ddd;box-shadow:0 10px 26px rgba(38,38,38,.1);transition:transform .3s ease}
        .asd-grid .cell img{width:100%;height:100%;object-fit:cover}
        .asd-grid .cell:hover{transform:translateY(-4px)}
        .asd-grid .pill-tag{position:absolute;left:8px;top:8px;z-index:2;background:rgba(38,38,38,.82);color:#fff;font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:4px 8px;border-radius:5px}
        .asd-grid .zoom{position:absolute;right:10px;bottom:10px;z-index:2;color:#fff;font-size:20px;opacity:0;transform:translateY(6px);transition:all .3s ease;text-shadow:0 2px 10px rgba(0,0,0,.5)}
        .asd-grid .cell:hover .zoom{opacity:1;transform:translateY(0)}

        /* ADS */
        .asd-ads{background:var(--graphite);color:var(--off)}
        .asd-ads-inner{max-width:1240px;margin:0 auto;padding:clamp(56px,8vw,110px) 32px}
        .asd-channels{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:40px}
        .asd-ch{background:var(--graphite-soft);border:1px solid rgba(244,242,239,.08);border-radius:18px;padding:28px;display:flex;flex-direction:column}
        .asd-ch .ch-head{border-bottom:1px solid rgba(244,242,239,.1);padding-bottom:18px;margin-bottom:20px}
        .asd-ch .ch-name{font-family:"Poppins",sans-serif;font-weight:700;font-size:24px;color:var(--off);display:block}
        .asd-ch .ch-role{font-size:13px;color:var(--steel);margin-top:4px;display:block}
        .asd-ch .ch-stats{display:grid;grid-template-columns:1fr 1fr;gap:18px 14px;margin-bottom:20px}
        .asd-ch .stat .v{font-family:"Anton",sans-serif;font-size:clamp(28px,3vw,40px);color:var(--orange);line-height:1;display:block}
        .asd-ch .stat .l{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:rgba(244,242,239,.55);margin-top:6px;display:block}
        .asd-ch .ch-take{font-size:14px;line-height:1.55;color:rgba(244,242,239,.7);margin-top:auto}
        .ch-google .stat .v{color:#f9a821}
        .asd-combined{text-align:center;border-top:1px solid rgba(244,242,239,.12);padding-top:40px}
        .asd-combined .c-lead{font-size:12px;letter-spacing:.24em;text-transform:uppercase;color:var(--steel)}
        .asd-combined .c-row{display:flex;gap:16px;align-items:center;justify-content:center;flex-wrap:wrap;margin:16px 0 10px;font-family:"Poppins",sans-serif;font-size:clamp(18px,2.4vw,30px);font-weight:600}
        .asd-combined .c-row b{color:var(--orange)}
        .asd-combined .c-row i{color:rgba(244,242,239,.3);font-style:normal}
        .asd-combined .c-note{font-size:13px;color:var(--steel);font-style:italic}

        /* LEAN IN */
        .asd-leanin{max-width:1240px;margin:0 auto;padding:clamp(56px,8vw,110px) 32px}
        .asd-eyebrow{font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:var(--orange);font-weight:700;margin-bottom:12px}
        .asd-leanin h3{font-family:"Poppins",sans-serif;font-weight:700;font-size:clamp(28px,4vw,52px);color:var(--graphite);margin-bottom:44px}
        .asd-cols{display:grid;grid-template-columns:1fr 1fr;gap:40px}
        .asd-cols .col-lbl{font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--steel);font-weight:700;border-bottom:2px solid var(--off-deep);padding-bottom:12px;margin-bottom:18px}
        .asd-cols ul{list-style:none;padding:0;margin:0}
        .asd-cols li{font-family:"Poppins",sans-serif;font-size:clamp(17px,1.8vw,22px);font-weight:500;color:var(--graphite);padding:11px 0;border-bottom:1px solid var(--off-deep);display:flex;align-items:center;gap:12px}
        .asd-cols li::before{content:"";width:8px;height:8px;border-radius:50%;background:var(--orange);flex-shrink:0}

        /* COLOPHON */
        .asd-colophon{background:var(--off-deep);padding:clamp(56px,8vw,110px) 32px;text-align:center}
        .asd-swatches{display:flex;gap:18px;justify-content:center;flex-wrap:wrap;margin-bottom:50px}
        .asd-swatches .sw{display:flex;flex-direction:column;align-items:center;gap:8px}
        .asd-swatches .chip{width:68px;height:68px;border-radius:14px;box-shadow:0 8px 20px rgba(38,38,38,.15)}
        .asd-swatches .sw-name{font-family:"Poppins",sans-serif;font-weight:600;font-size:14px;color:var(--graphite)}
        .asd-swatches .sw-hex{font-size:12px;color:var(--steel);font-variant-numeric:tabular-nums}
        .asd-close{font-family:"Poppins",sans-serif;font-weight:800;font-size:clamp(36px,6vw,76px);line-height:1;color:var(--graphite);margin-bottom:22px}
        .asd-close em{font-style:normal;color:var(--orange)}
        .asd-sign{font-size:14px;letter-spacing:.06em;color:var(--steel);margin-bottom:30px}
        .asd-sign b{color:var(--graphite)}
        .asd-back-btn{display:inline-block;font-family:"Poppins",sans-serif;font-weight:600;font-size:15px;color:#fff;background:var(--orange);padding:14px 30px;border-radius:100px;text-decoration:none;transition:background .25s,transform .25s;cursor:pointer;border:0}
        .asd-back-btn:hover{background:var(--orange-deep);transform:translateY(-2px)}

        /* LIGHTBOX */
        .asd-modal{position:fixed;inset:0;z-index:200;background:rgba(20,19,17,.94);display:none;align-items:center;justify-content:center;padding:40px}
        .asd-modal.open{display:flex}
        .asd-modal-img{position:relative;width:min(88vw,620px);height:min(84vh,820px);display:flex;align-items:center;justify-content:center}
        .asd-modal-img img{max-width:100%;max-height:100%;object-fit:contain}
        .asd-modal-close{position:absolute;top:24px;right:28px;background:none;border:0;color:#fff;font-size:26px;cursor:pointer;opacity:.8}
        .asd-modal-close:hover{opacity:1}
        .asd-modal-nav{position:absolute;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.08);border:0;color:#fff;font-size:40px;width:60px;height:60px;border-radius:50%;cursor:pointer;line-height:1}
        .asd-modal-nav:hover{background:var(--orange)}
        .asd-modal-nav.prev{left:24px} .asd-modal-nav.next{right:24px}
        .asd-modal-cap{position:absolute;bottom:26px;left:0;right:0;text-align:center;color:rgba(255,255,255,.7);font-size:13px;letter-spacing:.1em;text-transform:uppercase}

        @media (max-width:880px){
          .asd-hero-inner{grid-template-columns:1fr}
          .asd-hero-cards{height:420px;max-width:380px;margin:0 auto}
          .asd-del-head{grid-template-columns:1fr}
          .asd-del-head .num{grid-row:auto}
          .asd-del-head .meta{grid-column:1}
          .asd-pillars .grid{grid-template-columns:repeat(2,1fr)}
          .asd-grid{grid-template-columns:repeat(2,1fr)}
          .asd-channels{grid-template-columns:1fr}
          .asd-cols{grid-template-columns:1fr;gap:30px}
          .asd-rail-center{display:none}
        }
        @media (max-width:520px){
          .asd-pillars .grid{grid-template-columns:1fr}
          .asd-grid{grid-template-columns:1fr 1fr}
          .asd-ch .ch-stats{grid-template-columns:1fr 1fr}
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
        href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap"
      />
    </>
  );
}
