"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getFrameNumber } from "@/data/clients";
import type { Client } from "@/data/clients";
import { LoadingTransition } from "@/components/portfolio/LoadingTransition";

type Props = { client: Client };

export function HarbourLoomPage({ client }: Props) {
  const frame = getFrameNumber(client); // "014"

  return (
    <div className="hl-page">
      <LoadingTransition
        frameNumber={frame}
        clientName={client.name}
        scope={["Logo", "Photography", "Social", "Film"]}
        location="Ontario"
        year={client.year}
      />

      <header className="hl-rail">
        <Link className="hl-back" href="/portfolio">← Portfolio</Link>
        <span className="hl-rail-mid">Harbour Loom</span>
        <span className="hl-rail-end">Logo · Photography · Social · Film — Reel {frame}</span>
      </header>

      <section className="hl-hero">
        <div className="hl-hero-inner">
          <img className="hl-hero-logo" src="/portfolio/harbourloom/brand/logo-navy.png" alt="Harbour Loom" />
          <p className="hl-kicker">Logo · Photography · Social Media · Film</p>
          <h1 className="hl-h1">Shot close for the beach.<br /><em>Wide for the water.</em><br />Clean for the trade.</h1>
          <p className="hl-deck"><b>Harbour Loom</b> weaves flat-woven cotton for three different buyers, and the same picture does not work on all three. We built the mark, the photography and the feed around that split — one division shot at arm&rsquo;s length, one from a hundred feet up, one on pure white — and kept all three unmistakably the same brand.</p>
        </div>
        <div className="hl-hero-strip"><span></span><span></span><span></span><span></span><span></span></div>
      </section>

      <FontLink />
      <style jsx global>{`
        .hl-page{--ink:#1d2b33;--sea:#2e7ba6;--coral:#e8763f;--sand:#f2e9dd;--shell:#faf6f0;--paper:#fff;--mute:#8a8378;--rule:rgba(29,43,51,.14);
          background:var(--paper);color:var(--ink);font-family:"Jost",system-ui,sans-serif;-webkit-font-smoothing:antialiased}
        .hl-page b{font-weight:500}

        .hl-rail{position:sticky;top:0;z-index:40;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:12px 22px;
          background:var(--paper);color:var(--ink);border-bottom:1px solid var(--rule);font-size:11px;letter-spacing:.2em;text-transform:uppercase}
        .hl-back{color:var(--ink);text-decoration:none;opacity:.7}
        .hl-back:hover{opacity:1;color:var(--coral)}
        .hl-rail-mid{font-family:"Juana","Cormorant Garamond",Georgia,serif;font-size:15px;letter-spacing:.28em;text-transform:uppercase}
        .hl-rail-end{opacity:.5}

        .hl-hero{background:var(--shell);padding:92px 22px 0}
        .hl-hero-inner{max-width:980px;margin:0 auto;text-align:center}
        .hl-hero-logo{height:58px;width:auto;display:block;margin:0 auto 30px}
        .hl-kicker{font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:var(--mute);margin:0 0 26px}
        .hl-h1{font-family:"Juana","Cormorant Garamond",Georgia,serif;font-weight:400;font-size:clamp(34px,5.4vw,64px);line-height:1.16;letter-spacing:-.01em;margin:0 0 30px}
        .hl-h1 em{font-style:italic;color:var(--sea)}
        .hl-deck{max-width:62ch;margin:0 auto;font-size:16.5px;line-height:1.78;font-weight:300;color:#4c5964}
        .hl-deck b{color:var(--ink);font-weight:500}
        .hl-hero-strip{display:grid;grid-template-columns:repeat(5,1fr);max-width:1160px;margin:62px auto 0;height:8px}
        .hl-hero-strip span:nth-child(1){background:var(--sand)}
        .hl-hero-strip span:nth-child(2){background:var(--coral)}
        .hl-hero-strip span:nth-child(3){background:var(--shell)}
        .hl-hero-strip span:nth-child(4){background:var(--sea)}
        .hl-hero-strip span:nth-child(5){background:var(--ink)}

        .hl-sec{display:flex;align-items:baseline;gap:18px;max-width:1160px;margin:0 auto 34px;
          font-family:"Juana","Cormorant Garamond",Georgia,serif;font-weight:400;font-size:26px;letter-spacing:.02em}
        .hl-sec i{flex:1;height:1px;background:var(--rule);transform:translateY(-6px)}
        .hl-sec em{font-family:"Jost",sans-serif;font-style:normal;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:var(--mute)}
        .hl-sec.light{color:var(--shell)}
        .hl-sec.light i{background:rgba(250,246,240,.28)}
        .hl-sec.light em{color:rgba(250,246,240,.6)}
        .hl-lead{font-family:"Juana","Cormorant Garamond",Georgia,serif;font-style:italic;font-size:clamp(21px,2.6vw,30px);line-height:1.34;color:var(--sea);max-width:1160px;margin:0 auto 18px}
        .hl-lead.light{color:var(--sand);margin:0 0 18px}
        .hl-body{max-width:1160px;margin:0 auto 16px;font-size:16px;line-height:1.8;font-weight:300;color:#4c5964}
        .hl-body.light{color:rgba(250,246,240,.76);margin:0 0 16px;max-width:54ch}

        .hl-div{padding:84px 22px}
        .hl-div-grid{max-width:1160px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:34px}
        .hl-div-grid article{border-top:1px solid var(--ink);padding-top:18px}
        .hl-div-grid article.muted{border-top-color:var(--rule);opacity:.55}
        .hl-div-no{font-size:11px;letter-spacing:.2em;color:var(--coral)}
        .hl-div-grid h3{font-family:"Juana","Cormorant Garamond",Georgia,serif;font-weight:400;font-size:30px;margin:8px 0 6px;letter-spacing:.01em}
        .hl-div-meta{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--mute);margin:0 0 14px}
        .hl-div-meta i{font-style:normal;margin:0 8px;opacity:.5}
        .hl-div-grid p:last-child{font-size:14.5px;line-height:1.7;font-weight:300;color:#4c5964;margin:0}

        .hl-beach{background:var(--sand);padding:84px 22px}
        .hl-sheet{max-width:1160px;margin:40px auto 0;display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
        .hl-cell{display:block;padding:0;border:0;background:transparent;text-align:left;cursor:pointer}
        .hl-cell-img{width:100%;height:auto;display:block;transition:transform 500ms,opacity 240ms}
        .hl-cell:hover .hl-cell-img{transform:scale(1.02);opacity:.94}
        .hl-cell-meta{display:block;padding-top:12px}
        .hl-cell-meta b{display:block;font-size:11px;letter-spacing:.18em;color:var(--coral);margin-bottom:5px}
        .hl-cell-meta span{font-size:13.5px;line-height:1.6;font-weight:300;color:#5a6670}
        .hl-reel{margin:0}
        .hl-reel-el{width:100%;display:block;background:#000}
        .hl-reel figcaption{font-size:11.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--mute);margin-top:12px}
        .hl-reel figcaption b{color:var(--ink);font-weight:500}
        .hl-reel.beach{max-width:340px;margin:52px auto 0}
        .hl-reel.marine figcaption{color:rgba(250,246,240,.6)}
        .hl-reel.marine figcaption b{color:var(--shell)}

        .hl-marine{background:linear-gradient(180deg,#10333f 0%,#0b2029 100%);padding:84px 22px}
        .hl-marine-grid{max-width:1160px;margin:0 auto;display:grid;grid-template-columns:340px 1fr;gap:56px;align-items:center}

        .hl-b2b{background:var(--paper);padding:84px 22px}
        .hl-sheet.two{grid-template-columns:repeat(2,1fr);max-width:820px}
        .hl-signoff{padding:64px 22px 88px}
        .hl-sign-logo{height:46px;width:auto;display:block;margin:0 auto 34px;opacity:.9}
        .hl-sign-grid{max-width:1160px;margin:0 auto 34px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px;border-top:1px solid var(--ink);padding-top:22px}
        .hl-sign-label{font-size:10.5px;letter-spacing:.22em;text-transform:uppercase;color:var(--mute);margin:0 0 8px}
        .hl-sign-name{font-family:"Juana","Cormorant Garamond",Georgia,serif;font-size:22px;font-weight:400;margin:0}
        .hl-sign-name.accent{color:var(--sea)}
        .hl-sign-back{display:block;max-width:1160px;margin:0 auto;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--ink);text-decoration:none}
        .hl-sign-back:hover{color:var(--coral)}

        .hl-modal{--coral:#e8763f;position:fixed;inset:0;z-index:90;background:rgba(12,26,33,.95);display:none;align-items:center;justify-content:center;padding:40px;font-family:"Jost",sans-serif}
        .hl-modal.open{display:flex}
        .hl-modal-inner{max-width:min(520px,82vw);max-height:82vh}
        .hl-modal-img{width:100%;height:auto;display:block}
        .hl-modal-x{position:absolute;top:22px;right:26px;background:none;border:0;color:#fff;font-size:26px;cursor:pointer}
        .hl-modal-x:hover,.hl-modal-nav:hover{color:var(--coral)}
        .hl-modal-nav{position:absolute;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.07);border:0;color:#fff;font-size:38px;width:56px;height:56px;cursor:pointer;line-height:1}
        .hl-modal-nav.prev{left:22px}.hl-modal-nav.next{right:22px}
        .hl-modal-cap{position:absolute;bottom:24px;left:40px;right:40px;text-align:center;font-family:"Juana","Cormorant Garamond",Georgia,serif;font-style:italic;font-size:17px;color:rgba(255,255,255,.78)}

        @media(max-width:980px){
          .hl-div-grid{grid-template-columns:1fr;gap:26px}
          .hl-sheet,.hl-sheet.two{grid-template-columns:1fr;max-width:420px}
          .hl-marine-grid{grid-template-columns:1fr;gap:34px;max-width:420px}
          .hl-rail-end{display:none}
        }
        @media(max-width:560px){
          .hl-hero{padding-top:56px}
          .hl-sign-grid{grid-template-columns:1fr;gap:16px}
        }

        @media (prefers-reduced-motion: reduce){
          .hl-cell-img{transition:none}
          .hl-cell:hover .hl-cell-img{transform:none}
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
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Jost:wght@300;400;500&display=swap"
      />
    </>
  );
}
