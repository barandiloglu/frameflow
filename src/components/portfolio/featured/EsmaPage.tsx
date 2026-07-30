"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getFrameNumber } from "@/data/clients";
import type { Client } from "@/data/clients";
import { LoadingTransition } from "@/components/portfolio/LoadingTransition";

type Props = { client: Client };

const LANES = [
  {
    key: "appetite",
    name: "Appetite",
    rule: "Photograph, script name, no numbers",
    body: "Full-bleed food, one word of copy, logo bottom-centre. These posts never mention money. Their entire job is to put a craving in front of someone who was not planning to shop today.",
  },
  {
    key: "price",
    name: "Price",
    rule: "Grid, weights, old price struck through",
    body: "Boards and single-SKU cards. Olive header, cream field, the old price always visible beside the new one. Dense on purpose — a customer scanning these is comparing, not browsing.",
  },
] as const;

export function EsmaPage({ client }: Props) {
  const frame = getFrameNumber(client); // "011"

  return (
    <div className="es-page">
      <LoadingTransition
        frameNumber={frame}
        clientName={client.name}
        scope={["Social", "Photography", "Video"]}
        location="Concord, ON"
        year={client.year}
      />

      <header className="es-rail">
        <Link className="es-back" href="/portfolio">← Portfolio</Link>
        <span className="es-rail-mid">Esma Fine Foods</span>
        <span className="es-rail-end">Concord, ON · Reel {frame}</span>
      </header>

      <section className="es-hero">
        <div className="es-hero-inner">
          <img className="es-hero-logo" src="/portfolio/esma-fine-foods/brand/logo-olive.png" alt="Esma Fine Foods" />
          <p className="es-kicker">Social Media</p>
          <p className="es-script">Fresh &amp; Organic</p>
          <h1 className="es-h1">A grocery feed has two jobs.</h1>
          <p className="es-deck">Make you hungry, and make you feel clever about money. <b>Esma Fine Foods</b> is a grocery store on Jane Street in Concord — Turkish bakery counter at one end, weekly produce deals at the other. We gave those two jobs two different design languages and held them together with one palette.</p>
        </div>
        <div className="es-hero-band"><span></span><span></span><span></span></div>
      </section>

      <section className="es-lanes">
        <h2 className="es-sec"><span className="es-sec-no">01</span>Two lanes</h2>
        <div className="es-lane-grid">
          {LANES.map((l) => (
            <article className={`es-lane es-lane-${l.key}`} key={l.key}>
              <h3>{l.name}</h3>
              <p className="es-lane-rule">{l.rule}</p>
              <p>{l.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="es-film">
        <h2 className="es-sec"><span className="es-sec-no">03</span>In store</h2>
        <div className="es-film-grid">
          <figure className="es-clip">
            <video className="es-clip-el" controls preload="none" poster="/portfolio/esma-fine-foods/video/pov-poster.jpg">
              <source src="/portfolio/esma-fine-foods/video/pov-reel.mp4" type="video/mp4" />
            </video>
            <figcaption><b>Store POV</b> — 1:30. A shop-with-me: cart down the aisles, items off the shelf and into the basket, deli counter, checkout. Price cards drop in over the picks — the one place both lanes run at once.</figcaption>
          </figure>
          <figure className="es-clip">
            <video className="es-clip-el" controls preload="none" poster="/portfolio/esma-fine-foods/video/baklava-poster.jpg">
              <source src="/portfolio/esma-fine-foods/video/baklava.mp4" type="video/mp4" />
            </video>
            <figcaption><b>Free baklava tasting</b> — 0:15. A standing in-store offer, shot at the counter and closed on the logo. Appetite doing a job no price board can.</figcaption>
          </figure>
        </div>
      </section>

      <FontLink />
      <style jsx global>{`
        .es-page{--maroon:#3b0f0e;--cream:#f6eac7;--olive:#5c6c40;--paper:#fffdf7;--ink:#2c1a17;--mute:#8c7f6b;--rule:rgba(59,15,14,.16);
          background:var(--paper);color:var(--ink);font-family:"Mont","Montserrat",system-ui,sans-serif;-webkit-font-smoothing:antialiased}
        .es-page b{font-weight:600}

        .es-rail{position:sticky;top:0;z-index:40;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:11px 22px;
          background:var(--maroon);color:var(--cream);font-size:11px;font-weight:500;letter-spacing:.2em;text-transform:uppercase}
        .es-back{color:var(--cream);text-decoration:none;opacity:.82}
        .es-back:hover{opacity:1;color:#fff}
        .es-rail-end{opacity:.6}

        .es-hero{background:var(--cream);padding:86px 22px 0}
        .es-hero-inner{max-width:980px;margin:0 auto;text-align:center}
        .es-hero-logo{height:92px;width:auto;display:block;margin:0 auto 30px}
        .es-kicker{font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:var(--olive);font-weight:600;margin:0 0 22px}
        .es-script{font-family:"Vintage Rotter","Yellowtail",cursive;font-size:clamp(30px,4.4vw,52px);color:var(--olive);margin:0 0 4px;line-height:1.1}
        .es-h1{font-family:"Mirza",Georgia,serif;font-weight:600;font-size:clamp(40px,7vw,88px);line-height:1.06;color:var(--maroon);margin:0 0 26px;letter-spacing:-.01em}
        .es-deck{max-width:62ch;margin:0 auto;font-size:16.5px;line-height:1.78;color:#55433c}
        .es-deck b{color:var(--maroon)}
        .es-hero-band{display:grid;grid-template-columns:repeat(3,1fr);max-width:1200px;margin:60px auto 0;height:10px}
        .es-hero-band span:nth-child(1){background:var(--maroon)}
        .es-hero-band span:nth-child(2){background:var(--olive)}
        .es-hero-band span:nth-child(3){background:var(--paper)}

        .es-sec{display:flex;align-items:center;gap:14px;flex-wrap:wrap;max-width:1200px;margin:0 auto 34px;
          font-family:"Mirza",Georgia,serif;font-weight:600;font-size:30px;color:var(--maroon);letter-spacing:-.01em}
        .es-sec-no{font-family:"Mont","Montserrat",sans-serif;font-size:11px;font-weight:700;letter-spacing:.18em;background:var(--olive);color:var(--cream);padding:4px 9px;border-radius:2px}
        .es-sec.light{color:var(--cream)}
        .es-scroll-hint{margin-left:auto;font-family:"Mont","Montserrat",sans-serif;font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:rgba(246,234,199,.6)}

        .es-lanes{padding:82px 22px}
        .es-lane-grid{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(2,1fr);gap:24px}
        .es-lane{padding:30px 28px;border-radius:3px}
        .es-lane-appetite{background:var(--maroon);color:var(--cream)}
        .es-lane-price{background:var(--olive);color:var(--cream)}
        .es-lane h3{font-family:"Mirza",Georgia,serif;font-weight:600;font-size:34px;margin:0 0 6px;letter-spacing:-.01em}
        .es-lane-rule{font-size:11.5px;letter-spacing:.16em;text-transform:uppercase;opacity:.7;margin:0 0 18px}
        .es-lane p:last-child{font-size:15px;line-height:1.72;margin:0;opacity:.92}

        .es-aisle-sec{background:var(--maroon);padding:82px 0 90px}
        .es-aisle-sec .es-sec{padding:0 22px}
        .es-aisle{display:flex;gap:20px;overflow-x:auto;overflow-y:hidden;padding:6px 22px 26px;scroll-snap-type:x proximity;
          scrollbar-width:thin;scrollbar-color:var(--olive) transparent}
        .es-aisle::-webkit-scrollbar{height:8px}
        .es-aisle::-webkit-scrollbar-thumb{background:var(--olive)}
        .es-slot{flex:0 0 auto;width:280px;scroll-snap-align:start;padding:0;border:0;background:transparent;cursor:pointer;text-align:left}
        .es-slot-img{width:100%;height:auto;display:block;border-bottom:5px solid var(--olive);transition:transform 420ms}
        .es-slot-appetite .es-slot-img{border-bottom-color:var(--cream)}
        .es-slot:hover .es-slot-img{transform:translateY(-6px)}
        .es-tag{display:block;background:var(--cream);color:var(--maroon);padding:9px 11px}
        .es-tag-id{display:block;font-size:9.5px;font-weight:700;letter-spacing:.18em;color:var(--olive)}
        .es-tag-name{display:block;font-size:13px;font-weight:600;margin-top:2px;line-height:1.3}
        .es-aisle-end{flex:0 0 2px}

        .es-film{padding:82px 22px}
        .es-film-grid{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:34px;align-items:start}
        .es-clip{margin:0;max-width:360px}
        .es-clip-el{width:100%;display:block;background:#000}
        .es-clip figcaption{font-size:13.5px;line-height:1.65;color:#6a584f;margin-top:12px}
        .es-clip figcaption b{color:var(--maroon)}

        .es-receipt-sec{background:var(--cream);padding:82px 22px}
        .es-receipt-grid{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:44px;align-items:start}
        .es-receipt{background:var(--paper);padding:30px 28px;border:1px dashed var(--rule);font-family:"Mont","Montserrat",sans-serif}
        .es-receipt-head{text-align:center;font-weight:700;font-size:14px;letter-spacing:.14em;color:var(--maroon);margin:0 0 22px;padding-bottom:16px;border-bottom:1px dashed var(--rule)}
        .es-receipt-head span{display:block;font-weight:400;font-size:11px;letter-spacing:.06em;color:var(--mute);margin-top:6px}
        .es-receipt ul{list-style:none;margin:0;padding:0}
        .es-receipt li,.es-receipt-total{display:flex;align-items:baseline;gap:8px;font-size:13.5px;color:#55433c;padding:7px 0;margin:0}
        .es-receipt li i,.es-receipt-total i{flex:1;border-bottom:1px dotted var(--rule);transform:translateY(-3px)}
        .es-receipt-total{margin-top:14px;padding-top:16px;border-top:1px dashed var(--rule);font-weight:700;color:var(--maroon);font-size:14px}
        .es-receipt-foot{text-align:center;font-family:"Vintage Rotter","Yellowtail",cursive;font-size:22px;color:var(--olive);margin:22px 0 0}
        .es-spec{margin:0}
        .es-spec-img{width:100%;height:auto;display:block;border:1px solid var(--rule)}
        .es-spec figcaption{font-size:13.5px;line-height:1.65;color:#6a584f;margin-top:14px;border-left:3px solid var(--olive);padding-left:14px}
        .es-spec figcaption b{color:var(--maroon)}

        .es-signoff{padding:62px 22px 86px}
        .es-sign-grid{max-width:1200px;margin:0 auto 34px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px;border-top:3px solid var(--maroon);padding-top:22px}
        .es-sign-label{font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--mute);margin:0 0 8px}
        .es-sign-name{font-family:"Mirza",Georgia,serif;font-size:24px;font-weight:600;color:var(--maroon);margin:0}
        .es-sign-name.accent{color:var(--olive)}
        .es-sign-back{display:block;max-width:1200px;margin:0 auto;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--maroon);text-decoration:none}
        .es-sign-back:hover{color:var(--olive)}

        .es-modal{--olive:#5c6c40;position:fixed;inset:0;z-index:90;background:rgba(28,8,7,.95);display:none;align-items:center;justify-content:center;padding:40px;font-family:"Mont","Montserrat",sans-serif}
        .es-modal.open{display:flex}
        .es-modal-inner{max-width:min(500px,80vw);max-height:80vh}
        .es-modal-img{width:100%;height:auto;display:block}
        .es-modal-x{position:absolute;top:22px;right:26px;background:none;border:0;color:#fff;font-size:26px;cursor:pointer}
        .es-modal-x:hover,.es-modal-nav:hover{color:var(--olive)}
        .es-modal-nav{position:absolute;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.08);border:0;color:#fff;font-size:38px;width:56px;height:56px;cursor:pointer;line-height:1}
        .es-modal-nav.prev{left:22px}.es-modal-nav.next{right:22px}
        .es-modal-cap{position:absolute;bottom:22px;left:40px;right:40px;text-align:center;font-size:13px;line-height:1.55;color:rgba(246,234,199,.72)}
        .es-modal-cap b{color:#fff}

        @media(max-width:900px){
          .es-lane-grid,.es-film-grid,.es-receipt-grid{grid-template-columns:1fr;gap:26px}
          .es-clip{max-width:100%}
          .es-slot{width:220px}
          .es-rail-mid{display:none}
          .es-scroll-hint{margin-left:0}
        }
        @media(max-width:560px){
          .es-hero{padding-top:54px}
          .es-hero-logo{height:70px;margin-bottom:22px}
          .es-sign-grid{grid-template-columns:1fr;gap:16px}
          .es-rail-end{display:none}
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
        href="https://fonts.googleapis.com/css2?family=Mirza:wght@400;500;600&family=Yellowtail&family=Montserrat:wght@300;400;500;600;700&display=swap"
      />
    </>
  );
}
