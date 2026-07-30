"use client";

import Link from "next/link";
import { useState } from "react";
import { getFrameNumber } from "@/data/clients";
import type { Client } from "@/data/clients";
import { LoadingTransition } from "@/components/portfolio/LoadingTransition";

type Props = { client: Client };

const BUILT = [
  "iyn.com.tr — bilingual marketing site",
  "İYN Student Portal — dashboard, mock exams, progress tracking",
  "Portal launch film",
  "Instagram content system — 4 pillars, 4 visual registers",
  "Reels — programme and admission stories",
  "Midjourney prompt architecture for the illustrated pillar",
] as const;

export function IYNPage({ client }: Props) {
  const frame = getFrameNumber(client); // "016"

  return (
    <div className="iy-page">
      <LoadingTransition
        frameNumber={frame}
        clientName={client.name}
        scope={["Website", "App", "Social"]}
        location="İzmir, Türkiye"
        year={client.year}
      />

      <header className="iy-rail">
        <Link className="iy-back" href="/portfolio">← Portfolio</Link>
        <span className="iy-rail-mid">IYN EDUCATION &amp; CONSULTANCY · İZMİR</span>
        <span className="iy-rail-end">Reel {frame} · 2026</span>
      </header>

      <section className="iy-hero">
        <div className="iy-hero-inner">
          <div className="iy-hero-top">
            <p className="iy-kicker">Website · Web Application · Social Media · Videography</p>
            <img className="iy-hero-logo" src="/portfolio/iyn/brand/logo-white.png" alt="İYN Education &amp; Consultancy" />
          </div>
          <h1 className="iy-h1">THEY TEACH ONE<br />STUDENT AT A TIME.<br /><em>we built the machine<br />that reaches the rest.</em></h1>
          <p className="iy-deck"><b>IYN</b> prepares İzmir students for AP, IB, SAT and the British admissions exams — the kind of work that lives or dies on trust, and travels almost entirely by word of mouth. We gave that reputation somewhere to live: a bilingual site, a student portal that makes progress visible, a launch film, and an Instagram system that has been arguing IYN&rsquo;s case three times a week for two years.</p>
          <ul className="iy-built">
            {BUILT.map((b) => <li key={b}>{b}</li>)}
          </ul>
        </div>
      </section>

      <FontLink />
      <style jsx global>{`
        .iy-page{--blue-a:#0349aa;--blue-b:#0091ff;--amber:#ec8d13;--light:#f4f5fa;--paper:#fff;--ink:#10151f;--mute:#6b7280;--rule:rgba(16,21,31,.12);
          --grad:linear-gradient(135deg,var(--blue-a) 0%,var(--blue-b) 100%);
          background:var(--paper);color:var(--ink);font-family:"Garet","Poppins",system-ui,sans-serif;-webkit-font-smoothing:antialiased}

        .iy-rail{position:sticky;top:0;z-index:40;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:11px 22px;
          background:var(--grad);color:#fff;font-family:"Oswald",sans-serif;font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase}
        .iy-back{color:#fff;text-decoration:none;opacity:.85}
        .iy-back:hover{opacity:1;color:var(--amber)}
        .iy-rail-end{opacity:.6}

        .iy-hero{background:var(--grad);
          color:#fff;padding:88px 22px 74px}
        .iy-hero-inner{max-width:1100px;margin:0 auto}
        .iy-hero-top{display:flex;align-items:center;justify-content:space-between;gap:28px;flex-wrap:wrap;
          border-bottom:1px solid rgba(255,255,255,.18);padding-bottom:20px;margin-bottom:34px}
        .iy-kicker{font-family:"Oswald",sans-serif;font-size:11.5px;font-weight:300;letter-spacing:.24em;text-transform:uppercase;color:rgba(255,255,255,.6);margin:0}
        .iy-hero-logo{height:40px;width:auto;display:block;flex-shrink:0}
        .iy-h1{font-family:"Oswald",sans-serif;font-weight:700;font-size:clamp(34px,5.4vw,68px);line-height:1.04;letter-spacing:.005em;text-transform:uppercase;margin:0 0 30px}
        .iy-h1 em{display:block;margin-top:10px;font-family:"Oswald",sans-serif;font-style:normal;font-weight:300;
          font-size:clamp(28px,4.4vw,56px);line-height:1.08;letter-spacing:.02em;text-transform:uppercase;color:#fff}
        .iy-deck{max-width:66ch;font-size:17px;line-height:1.68;color:rgba(255,255,255,.78);margin:0 0 34px}
        .iy-deck b{color:#fff;font-weight:600}
        .iy-built{list-style:none;margin:0;padding:26px 0 0;border-top:1px solid rgba(255,255,255,.18);display:grid;grid-template-columns:repeat(2,1fr);gap:10px 34px}
        .iy-built li{position:relative;padding-left:20px;font-size:14px;line-height:1.5;color:rgba(255,255,255,.86)}
        .iy-built li::before{content:"";position:absolute;left:0;top:8px;width:8px;height:8px;background:var(--amber)}

        .iy-sec{display:flex;align-items:center;gap:14px;max-width:1160px;margin:0 auto 40px;font-family:"Oswald",sans-serif;font-size:12px;font-weight:500;
          letter-spacing:.2em;text-transform:uppercase}
        .iy-sec-no{background:var(--amber);color:#fff;padding:4px 9px;font-weight:700}
        .iy-sec-name{font-weight:700;letter-spacing:.16em}
        .iy-sec i{flex:1;height:1px;background:var(--rule)}
        .iy-sec-meta{color:var(--mute)}
        .iy-sec.light i{background:rgba(255,255,255,.22)}
        .iy-sec.light .iy-sec-meta{color:rgba(255,255,255,.6)}
        .iy-lead{font-family:"Oswald",sans-serif;font-weight:400;font-size:22px;line-height:1.42;letter-spacing:.01em;color:var(--blue-a);margin:0 0 18px}
        .iy-lead em{font-style:normal;color:var(--amber)}

        .iy-portal{background:var(--light);padding:84px 22px}
        .iy-portal-grid{max-width:1160px;margin:0 auto;display:grid;grid-template-columns:.82fr 1.18fr;gap:52px;align-items:start}
        .iy-portal-copy p{font-size:15.5px;line-height:1.72;color:#3d4354;margin:0 0 15px}
        .iy-video{margin:0}
        .iy-video-el{width:100%;display:block;background:#000;border:1px solid var(--rule)}
        .iy-video figcaption,.iy-reel-meta{font-family:"Oswald",sans-serif;font-size:11px;font-weight:300;letter-spacing:.14em;text-transform:uppercase;color:var(--mute);margin-top:12px}
        .iy-video figcaption b{color:var(--ink);font-weight:500}

        .iy-site-sec{padding:84px 22px}
        .iy-site{max-width:1160px;margin:0 auto}
        .iy-bar{display:flex;align-items:center;gap:14px;background:var(--blue-a);padding:9px 14px;font-family:"Oswald",sans-serif;font-size:11px;font-weight:300;letter-spacing:.1em}
        .iy-dots{display:flex;gap:6px}
        .iy-dots i{width:9px;height:9px;border-radius:50%;background:rgba(255,255,255,.26)}
        .iy-dots i:first-child{background:var(--amber)}
        .iy-url{flex:1;color:rgba(255,255,255,.76)}
        .iy-live{color:var(--amber);font-weight:500;letter-spacing:.16em}
        .iy-tabs{display:flex;flex-wrap:wrap;border:1px solid var(--rule);border-top:0;border-bottom:0}
        .iy-tabs button{flex:1;min-width:108px;cursor:pointer;background:#e8eaf2;border:0;border-right:1px solid var(--rule);padding:11px 8px;
          font-family:"Oswald",sans-serif;font-size:11px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--mute);transition:background 140ms,color 140ms}
        .iy-tabs button:last-child{border-right:0}
        .iy-tabs button:hover{background:#dcdfeb;color:var(--ink)}
        .iy-tabs button.on{background:var(--paper);color:var(--blue-a)}
        .iy-window{position:relative;height:620px;overflow-y:auto;overflow-x:hidden;border:1px solid var(--rule);background:#fff;scrollbar-width:thin}
        .iy-window-img{width:100%;height:auto;display:block}
        .iy-hint{position:sticky;bottom:10px;float:right;margin-right:12px;background:rgba(3,73,170,.82);color:#fff;
          font-family:"Oswald",sans-serif;font-size:10px;font-weight:300;letter-spacing:.14em;text-transform:uppercase;padding:5px 9px;pointer-events:none}
        .iy-foot{display:flex;align-items:center;justify-content:space-between;gap:16px;border:1px solid var(--rule);border-top:0;padding:12px 14px}
        .iy-nav{display:flex;align-items:center;gap:12px}
        .iy-nav button{width:34px;height:34px;cursor:pointer;line-height:1;background:transparent;border:1px solid var(--rule);color:var(--ink);font-size:20px;transition:all 140ms}
        .iy-nav button:hover{background:var(--blue-a);border-color:var(--blue-a);color:#fff}
        .iy-nav span{font-family:"Oswald",sans-serif;font-size:11px;font-weight:300;letter-spacing:.14em;color:var(--mute)}
        .iy-visit{display:inline-flex;align-items:center;gap:9px;background:var(--blue-a);color:#fff;text-decoration:none;padding:11px 18px;
          font-family:"Oswald",sans-serif;font-size:11.5px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;transition:background 140ms}
        .iy-visit:hover{background:#02306f}
        .iy-site figcaption{font-size:13.5px;line-height:1.65;color:var(--mute);border-left:3px solid var(--amber);padding-left:14px;margin-top:18px;max-width:76ch}

        .iy-feed{background:linear-gradient(215deg,var(--blue-a) 0%,var(--blue-b) 100%);color:#fff;padding:84px 22px}
        .iy-pillars{max-width:1160px;margin:0 auto 44px;display:grid;grid-template-columns:repeat(4,1fr);gap:22px}
        .iy-pillars article{border-top:2px solid var(--amber);padding-top:16px}
        .iy-pillars span{font-family:"Oswald",sans-serif;font-size:11px;font-weight:500;letter-spacing:.18em;color:var(--amber)}
        .iy-pillars h3{font-family:"Oswald",sans-serif;font-weight:500;font-size:17px;letter-spacing:.02em;margin:8px 0 9px;text-transform:uppercase}
        .iy-pillars p{font-size:13.5px;line-height:1.6;color:rgba(255,255,255,.66);margin:0}
        .iy-feed-note{max-width:78ch;margin:0 auto 40px;font-size:16px;line-height:1.7;color:rgba(255,255,255,.76)}
        .iy-sheet{max-width:1160px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
        .iy-cell{position:relative;display:block;padding:0;border:0;cursor:pointer;background:transparent;text-align:left}
        .iy-cell-img{width:100%;height:auto;display:block;transition:transform 420ms,opacity 220ms}
        .iy-cell:hover .iy-cell-img{transform:translateY(-4px);opacity:.9}
        .iy-cell-id{position:absolute;top:0;left:0;z-index:2;background:var(--amber);color:#fff;font-family:"Oswald",sans-serif;font-size:10px;font-weight:700;letter-spacing:.16em;padding:5px 9px}
        .iy-cell-name{display:block;margin-top:12px;font-family:"Oswald",sans-serif;font-size:14px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:#fff}
        .iy-cell-job{display:block;margin-top:4px;font-size:12.5px;line-height:1.5;color:rgba(255,255,255,.56)}

        .iy-reel-sec{background:var(--light);padding:84px 22px}
        .iy-reel-grid{max-width:1160px;margin:0 auto;display:grid;grid-template-columns:320px 1fr;gap:52px;align-items:center}
        .iy-reel{margin:0}
        .iy-reel-el{width:100%;display:block;background:#000;border:1px solid var(--rule)}
        .iy-reel-copy p{font-size:15.5px;line-height:1.72;color:#3d4354;margin:0 0 15px}

        .iy-signoff{padding:64px 22px 84px}
        .iy-sign-grid{max-width:1160px;margin:0 auto 36px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px;border-top:2px solid var(--blue-a);padding-top:22px}
        .iy-sign-label{font-family:"Oswald",sans-serif;font-size:10.5px;font-weight:300;letter-spacing:.2em;text-transform:uppercase;color:var(--mute);margin:0 0 8px}
        .iy-sign-name{font-family:"Oswald",sans-serif;font-size:22px;font-weight:500;text-transform:uppercase;letter-spacing:.04em;margin:0}
        .iy-sign-name.accent{color:var(--blue-a)}
        .iy-sign-back{display:block;max-width:1160px;margin:0 auto;font-family:"Oswald",sans-serif;font-size:11.5px;font-weight:300;letter-spacing:.16em;text-transform:uppercase;color:var(--ink);text-decoration:none}
        .iy-sign-back:hover{color:var(--blue-a)}

        .iy-modal{--amber:#ec8d13;position:fixed;inset:0;z-index:90;background:rgba(4,40,100,.95);display:none;align-items:center;justify-content:center;padding:40px;font-family:"Garet","Poppins",sans-serif}
        .iy-modal.open{display:flex}
        .iy-modal-inner{max-width:min(520px,82vw);max-height:82vh}
        .iy-modal-img{width:100%;height:auto;display:block}
        .iy-modal-look{font-family:"Oswald",sans-serif;font-size:10.5px;font-weight:300;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.5);margin:12px 0 0;text-align:center}
        .iy-modal-x{position:absolute;top:22px;right:26px;background:none;border:0;color:#fff;font-size:26px;cursor:pointer}
        .iy-modal-x:hover,.iy-modal-nav:hover{color:var(--amber)}
        .iy-modal-nav{position:absolute;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.07);border:0;color:#fff;font-size:38px;width:56px;height:56px;cursor:pointer;line-height:1}
        .iy-modal-nav.prev{left:22px}.iy-modal-nav.next{right:22px}
        .iy-modal-cap{position:absolute;bottom:22px;left:40px;right:40px;text-align:center;font-size:13px;line-height:1.5;color:rgba(255,255,255,.68)}

        @media(max-width:980px){
          .iy-portal-grid,.iy-reel-grid{grid-template-columns:1fr;gap:34px}
          .iy-pillars{grid-template-columns:repeat(2,1fr)}
          .iy-sheet{grid-template-columns:repeat(2,1fr)}
          .iy-rail-mid{display:none}
          .iy-reel-grid{max-width:420px}
        }
        @media(max-width:560px){
          .iy-hero{padding-top:54px}
          .iy-hero-top{gap:18px}
          .iy-hero-logo{height:30px}
          .iy-built{grid-template-columns:1fr}
          .iy-pillars,.iy-sheet{grid-template-columns:1fr}
          .iy-window{height:420px}
          .iy-foot{flex-direction:column;align-items:stretch;gap:12px}
          .iy-visit,.iy-nav{justify-content:center}
          .iy-url{display:none}
          .iy-sign-grid{grid-template-columns:1fr;gap:18px}
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
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;700&family=Poppins:wght@300;400;500;600&display=swap"
      />
    </>
  );
}
