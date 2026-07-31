"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getFrameNumber } from "@/data/clients";
import type { Client } from "@/data/clients";
import { LoadingTransition } from "@/components/portfolio/LoadingTransition";

type Props = { client: Client };

export function MinAutoPage({ client }: Props) {
  const frame = getFrameNumber(client); // "018"

  return (
    <div className="ma-page">
      <LoadingTransition
        frameNumber={frame}
        clientName={client.name}
        scope={["Logo", "Brand System", "Social"]}
        location="Wasaga Beach, ON"
        year={client.year}
      />

      <header className="ma-rail">
        <Link className="ma-back" href="/portfolio">← Portfolio</Link>
        <span className="ma-rail-mid">MinAuto · Wasaga Beach, ON</span>
        <span className="ma-rail-end">OMVIC Registered · Reel {frame}</span>
      </header>

      <section className="ma-hero">
        <div className="ma-hero-inner">
          <div>
            <p className="ma-kicker">Logo · Brand System · Social Media</p>
            <h1 className="ma-h1">THE LOGO IS A CHECK.<br /><em>SO IS EVERYTHING AFTER IT.</em></h1>
            <p className="ma-deck"><b>MinAuto</b> sells certified pre-owned stock out of a lot on Mosley Street in Wasaga Beach, OMVIC registered. We built the identity around the one thing that decides a used-car sale — whether the car passed. The tick that makes the logo does not stay in it: it becomes the corner tag on a listing, the bullet on every proof point, and the whole right-hand side of the business card.</p>
            <p className="ma-tagline">&ldquo;Certified Pre-Owned. Driven by Trust.&rdquo;</p>
          </div>
          <div className="ma-hero-mark">
            <img className="ma-hero-logo" src="/portfolio/minauto/logo/lockup-knockout.png" alt="MinAuto logo in white" />
          </div>
        </div>
      </section>

      <FontLink />
      <style jsx global>{`
        .ma-page{--navy:#123645;--orange:#dc4c14;--surface:#f4f4f4;--paper:#fff;--ink:#2a2a2a;--mute:#7b8288;--rule:rgba(18,54,69,.14);
          background:var(--paper);color:var(--ink);font-family:"Source Sans 3",system-ui,sans-serif;-webkit-font-smoothing:antialiased}
        .ma-page b{font-weight:600}

        .ma-rail{position:sticky;top:0;z-index:40;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:11px 22px;
          background:var(--navy);color:#fff;font-family:"Barlow Condensed",sans-serif;font-size:13px;font-weight:600;letter-spacing:.16em;text-transform:uppercase}
        .ma-back{color:#fff;text-decoration:none;opacity:.85}
        .ma-back:hover{opacity:1;color:var(--orange)}
        .ma-rail-end{opacity:.62}

        .ma-hero{background:var(--navy);color:#fff;padding:86px 22px 78px}
        .ma-hero-inner{max-width:1160px;margin:0 auto;display:grid;grid-template-columns:1.25fr .75fr;gap:56px;align-items:center}
        .ma-kicker{font-family:"Barlow Condensed",sans-serif;font-size:14px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.58);margin:0 0 24px}
        .ma-h1{font-family:"Montserrat",sans-serif;font-weight:800;font-size:clamp(38px,6vw,76px);line-height:.98;letter-spacing:-.02em;margin:0 0 28px}
        .ma-h1 em{font-style:normal;color:var(--orange)}
        .ma-deck{max-width:58ch;font-size:17px;line-height:1.65;color:rgba(255,255,255,.78);margin:0 0 22px}
        .ma-deck b{color:#fff}
        .ma-tagline{font-family:"Montserrat",sans-serif;font-weight:600;font-size:15px;color:var(--orange);margin:0;border-left:3px solid var(--orange);padding-left:14px}
        .ma-hero-mark{display:flex;justify-content:center}
        .ma-hero-logo{width:100%;max-width:300px;height:auto;display:block}

        .ma-sec{display:flex;align-items:center;gap:14px;max-width:1160px;margin:0 auto 34px;font-family:"Barlow Condensed",sans-serif;
          font-size:14px;font-weight:700;letter-spacing:.18em;text-transform:uppercase}
        .ma-sec-no{background:var(--orange);color:#fff;padding:3px 9px}
        .ma-sec-name{color:var(--navy)}
        .ma-sec i{flex:1;height:1px;background:var(--rule)}
        .ma-sec-meta{color:var(--mute);font-weight:600}
        .ma-sec.light .ma-sec-name{color:#fff}
        .ma-sec.light i{background:rgba(255,255,255,.22)}
        .ma-sec.light .ma-sec-meta{color:rgba(255,255,255,.6)}

        .ma-lead{font-family:"Montserrat",sans-serif;font-weight:700;font-size:clamp(20px,2.4vw,27px);line-height:1.3;letter-spacing:-.01em;
          color:var(--navy);margin:0 auto 18px;max-width:1160px}
        .ma-lead.light{color:#fff;max-width:none}
        .ma-body{max-width:1160px;margin:0 auto 16px;font-size:16px;line-height:1.72;color:#47505a}
        .ma-body.light{color:rgba(255,255,255,.76);margin:0 0 16px;max-width:56ch}

        .ma-mark{padding:82px 22px}
        .ma-lockups{max-width:1160px;margin:40px auto 0;display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
        .ma-lock{margin:0;position:relative}
        .ma-lock-id{position:absolute;top:10px;left:10px;z-index:2;font-family:"Barlow Condensed",sans-serif;font-size:11px;font-weight:700;letter-spacing:.14em;color:var(--mute)}
        .ma-lock-stage{display:flex;align-items:center;justify-content:center;background:var(--surface);border:1px solid var(--rule);aspect-ratio:4/3;padding:22px}
        .ma-lock.dark .ma-lock-stage{background:var(--navy);border-color:var(--navy)}
        .ma-lock.dark .ma-lock-id{color:rgba(255,255,255,.5)}
        .ma-lock-img{width:100%;height:auto;display:block}
        .ma-lock figcaption{padding-top:12px}
        .ma-lock figcaption b{display:block;font-family:"Montserrat",sans-serif;font-weight:700;font-size:14px;color:var(--navy);margin-bottom:4px}
        .ma-lock figcaption span{font-size:13px;line-height:1.5;color:var(--mute)}

        .ma-spec{max-width:1160px;margin:52px auto 0;display:grid;grid-template-columns:.9fr 1.1fr;gap:36px;align-items:start}
        .ma-swatches{display:grid;gap:12px}
        .ma-chip{padding:18px;color:#fff}
        .ma-chip.light{color:var(--ink);border:1px solid var(--rule)}
        .ma-chip-hex{display:block;font-family:"Barlow Condensed",sans-serif;font-size:20px;font-weight:700;letter-spacing:.06em}
        .ma-chip-name{display:block;font-family:"Montserrat",sans-serif;font-weight:700;font-size:13px;margin-top:2px}
        .ma-chip-role{display:block;font-size:13px;line-height:1.5;opacity:.82;margin-top:6px}
        .ma-specsheet{margin:0}
        .ma-specsheet-img{width:100%;height:auto;display:block;border:1px solid var(--rule)}
        .ma-specsheet figcaption{font-size:13.5px;line-height:1.6;color:var(--mute);border-left:3px solid var(--orange);padding-left:14px;margin-top:14px}

        .ma-card-sec{background:var(--navy);padding:82px 22px}
        .ma-card-grid{max-width:1160px;margin:0 auto;display:grid;grid-template-columns:1fr 420px;gap:56px;align-items:center}
        .ma-note{font-family:"Barlow Condensed",sans-serif;font-size:13px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--orange);margin:22px 0 0}
        .ma-card{margin:0}
        .ma-card-toggle{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:12px}
        .ma-card-toggle button{cursor:pointer;padding:10px 8px;background:transparent;border:1px solid rgba(255,255,255,.28);color:rgba(255,255,255,.72);
          font-family:"Barlow Condensed",sans-serif;font-size:13px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;transition:all 150ms}
        .ma-card-toggle button:hover{border-color:#fff;color:#fff}
        .ma-card-toggle button.on{background:var(--orange);border-color:var(--orange);color:#fff}
        .ma-card-img{width:100%;height:auto;display:block}
        .ma-card figcaption{font-family:"Barlow Condensed",sans-serif;font-size:13px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.6);margin-top:12px}

        .ma-zero{padding:82px 22px}
        .ma-zero-grid{max-width:1160px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:26px}
        .ma-zero-grid article{border-top:3px solid var(--navy);padding-top:16px}
        .ma-zero-no{font-family:"Barlow Condensed",sans-serif;font-size:13px;font-weight:700;letter-spacing:.16em;color:var(--orange)}
        .ma-zero-grid h3{font-family:"Montserrat",sans-serif;font-weight:700;font-size:17px;color:var(--navy);margin:6px 0 9px}
        .ma-zero-grid p{font-size:14px;line-height:1.62;color:#55606a;margin:0}
        .ma-pillars{max-width:1160px;margin:44px auto 0;background:var(--surface);padding:22px 24px;display:flex;align-items:center;gap:22px;flex-wrap:wrap}
        .ma-pillars-label{font-family:"Barlow Condensed",sans-serif;font-size:13px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--navy)}
        .ma-pillars ul{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:10px}
        .ma-pillars li{background:var(--paper);border:1px solid var(--rule);padding:7px 12px;font-size:13.5px;color:var(--navy)}

        .ma-signoff{padding:60px 22px 84px}
        .ma-sign-grid{max-width:1160px;margin:0 auto 34px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px;border-top:3px solid var(--navy);padding-top:22px}
        .ma-sign-label{font-family:"Barlow Condensed",sans-serif;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--mute);margin:0 0 6px}
        .ma-sign-name{font-family:"Montserrat",sans-serif;font-weight:700;font-size:21px;color:var(--navy);margin:0}
        .ma-sign-name.accent{color:var(--orange)}
        .ma-sign-back{display:block;max-width:1160px;margin:0 auto;font-family:"Barlow Condensed",sans-serif;font-size:14px;font-weight:600;
          letter-spacing:.16em;text-transform:uppercase;color:var(--navy);text-decoration:none}
        .ma-sign-back:hover{color:var(--orange)}

        @media(max-width:980px){
          .ma-hero-inner{grid-template-columns:1fr;gap:38px}
          .ma-hero-mark{justify-content:flex-start}
          .ma-hero-logo{max-width:220px}
          .ma-lockups{grid-template-columns:repeat(2,1fr)}
          .ma-spec{grid-template-columns:1fr}
          .ma-card-grid{grid-template-columns:1fr;gap:34px;max-width:460px}
          .ma-zero-grid{grid-template-columns:repeat(2,1fr)}
          .ma-rail-mid{display:none}
        }
        @media(max-width:560px){
          .ma-lockups,.ma-zero-grid{grid-template-columns:1fr}
          .ma-sign-grid{grid-template-columns:1fr;gap:16px}
          .ma-rail-end{display:none}
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
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Source+Sans+3:wght@400;500;600&family=Barlow+Condensed:wght@600;700&display=swap"
      />
    </>
  );
}
