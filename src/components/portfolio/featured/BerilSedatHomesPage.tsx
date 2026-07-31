"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getFrameNumber } from "@/data/clients";
import type { Client } from "@/data/clients";
import { LoadingTransition } from "@/components/portfolio/LoadingTransition";

type Props = { client: Client };

const REGISTERS = [
  { key: "navy", chip: "THE DEFAULT", title: "Midnight navy",
    body: "Brand, listings, announcements, market commentary. Bronze rule, Cinzel headline, generous margins. Most of the feed lives here." },
  { key: "warm", chip: "WHEN IT HAS TO BE READ", title: "Warm limestone",
    body: "Numbers, tables, step-by-step. Terracotta on the one figure that matters in each frame. Used in the explainers, and in the feed wherever a post is meant to be read rather than admired." },
] as const;

export function BerilSedatHomesPage({ client }: Props) {
  const frame = getFrameNumber(client); // "020"

  return (
    <div className="bs-page">
      <LoadingTransition
        frameNumber={frame}
        clientName={client.name}
        scope={["Social", "Video", "Web", "Ads"]}
        location="Toronto, ON"
        year={client.year}
      />

      <header className="bs-rail">
        <Link className="bs-back" href="/portfolio">← Portfolio</Link>
        <span className="bs-rail-mid">Beril &amp; Sedat Homes</span>
        <span className="bs-rail-end">Toronto, ON · {frame}</span>
      </header>

      <section className="bs-hero">
        <div className="bs-hero-inner">
          <img className="bs-hero-logo" src="/portfolio/beril-sedat-homes/brand/logo-knockout.png" alt="Beril &amp; Sedat Homes" />
          <p className="bs-eyebrow">Boutique brokerage · GTA · Social · Video · Web · Ads</p>
          <h1 className="bs-h1">They stopped selling<br />under a group name.<br /><em>We built the one<br />with theirs on it.</em></h1>
          <p className="bs-deck">TopcuDalan Homes retired in the first quarter of 2026 and became <b>Beril &amp; Sedat Homes</b> — two people, named, in a market of 69,000 agents. Quiet luxury is easy to say and hard to hold, so we held it everywhere at once: <b>a bilingual site</b>, <b>a navy editorial feed</b>, <b>a reel series with both of them on camera</b>, and the paid support underneath.</p>
          <dl className="bs-facts">
            <div><dt>Register</dt><dd>Quiet luxury — never salesy</dd></div>
            <div><dt>Languages</dt><dd>English &amp; Turkish, in parallel</dd></div>
            <div><dt>Type</dt><dd>Cinzel · Montserrat</dd></div>
          </dl>
        </div>
      </section>

      <section className="bs-registers">
        <h2 className="bs-sec-head"><i></i><span>TWO REGISTERS</span><i></i></h2>
        <p className="bs-lede">The brand runs on midnight navy. The teaching content does not — and that is deliberate. A rate table on a dark ground is a wall of small pale digits in a feed; the same table on warm limestone reads at arm&rsquo;s length. So the identity holds the navy and anything built to be read moves to a warm variant, with the same serif, the same rules and the same signature closing every piece. One brand, two jobs.</p>
        <div className="bs-reg-grid">
          {REGISTERS.map((r) => (
            <article className={`bs-reg bs-reg--${r.key}`} key={r.key}>
              <span className="bs-reg-chip">{r.chip}</span>
              <h3>{r.title}</h3>
              <p>{r.body}</p>
            </article>
          ))}
        </div>
      </section>

      <FontLink />
      <style jsx global>{`
        .bs-page{--navy:#1c2841;--catalyst:#232d3f;--limestone:#e1d4c0;--bronze:#997755;--cloud:#f0f0f0;--warm:#e2d2b9;--terra:#b4472a;--rule:rgba(28,40,65,.14);
          background:var(--cloud);color:var(--navy);font-family:"Montserrat",system-ui,sans-serif;font-weight:400;-webkit-font-smoothing:antialiased}
        .bs-page b{font-weight:600}
        .bs-page h1,.bs-page h2,.bs-page h3{font-family:"Cinzel",Georgia,serif;font-weight:500;letter-spacing:.02em}

        .bs-rail{position:sticky;top:0;z-index:40;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:11px 26px;
          background:var(--cloud);color:var(--navy);border-bottom:1px solid var(--rule);font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase}
        .bs-back{color:var(--navy);text-decoration:none;opacity:.75}
        .bs-back:hover{opacity:1;color:var(--bronze)}
        .bs-rail-end{opacity:.5}

        .bs-hero{background:var(--navy);color:var(--cloud);padding:88px 26px 96px}
        .bs-hero-inner{max-width:1000px;margin:0 auto;text-align:center}
        .bs-hero-logo{width:250px;max-width:56%;height:auto;display:block;margin:0 auto 40px}
        .bs-eyebrow{font-size:10px;font-weight:500;letter-spacing:.28em;text-transform:uppercase;color:var(--limestone);margin:0 0 34px}
        .bs-h1{font-size:clamp(30px,4.6vw,58px);line-height:1.28;margin:0 0 34px;color:var(--cloud)}
        .bs-h1 em{font-style:italic;color:var(--limestone)}
        .bs-deck{max-width:62ch;margin:0 auto 44px;font-size:15.5px;font-weight:300;line-height:1.85;color:rgba(240,240,240,.76)}
        .bs-deck b{color:var(--cloud);font-weight:500}
        .bs-facts{display:grid;grid-template-columns:repeat(3,1fr);gap:26px;border-top:1px solid rgba(240,240,240,.16);padding-top:28px;margin:0 auto;max-width:780px}
        .bs-facts dt{font-size:9px;font-weight:500;letter-spacing:.24em;text-transform:uppercase;color:var(--bronze);margin-bottom:9px}
        .bs-facts dd{margin:0;font-size:13.5px;font-weight:300;color:rgba(240,240,240,.9)}

        .bs-sec-head{display:flex;align-items:center;gap:22px;max-width:1160px;margin:0 auto 14px;font-family:"Cinzel",serif;font-size:13px;font-weight:500;
          letter-spacing:.3em;text-transform:uppercase}
        .bs-sec-head i{flex:1;height:1px;background:var(--rule)}
        .bs-sec-head.light{color:var(--cloud)}
        .bs-sec-head.light i{background:rgba(240,240,240,.22)}
        .bs-sub{text-align:center;font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:rgba(240,240,240,.5);margin:0 0 46px}
        .bs-sub--dark{color:rgba(28,40,65,.45)}

        .bs-registers{padding:96px 26px}
        .bs-lede{max-width:68ch;margin:30px auto 48px;text-align:center;font-size:15.5px;font-weight:300;line-height:1.9;color:#3d4757}
        .bs-reg-grid{max-width:1000px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:24px}
        .bs-reg{padding:40px 34px}
        .bs-reg-chip{display:inline-block;font-size:9px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;margin-bottom:20px}
        .bs-reg h3{font-size:25px;margin:0 0 14px}
        .bs-reg p{margin:0;font-size:13.5px;font-weight:300;line-height:1.75}
        .bs-reg--navy{background:var(--navy);color:var(--cloud)}
        .bs-reg--navy .bs-reg-chip{color:var(--bronze)}
        .bs-reg--navy h3{color:var(--limestone)}
        .bs-reg--navy p{color:rgba(240,240,240,.68)}
        .bs-reg--warm{background:var(--warm);color:#4a3527}
        .bs-reg--warm .bs-reg-chip{color:var(--terra)}
        .bs-reg--warm h3{color:#6b3b23}
        .bs-reg--warm p{color:#6a5546}

        .bs-grid{max-width:1160px;margin:0 auto;display:grid;gap:18px}
        .bs-grid--45{grid-template-columns:repeat(4,1fr)}
        .bs-grid--916{grid-template-columns:repeat(5,1fr)}
        .bs-cell{position:relative;display:block;padding:0;border:0;cursor:pointer;background:transparent;text-align:left}
        .bs-cell-img{width:100%;height:auto;display:block;transition:opacity 260ms ease,transform 420ms ease}
        .bs-cell:hover .bs-cell-img{opacity:.86;transform:translateY(-3px)}
        .bs-cell-cap{display:block;padding-top:11px;font-size:9.5px;font-weight:500;letter-spacing:.16em;text-transform:uppercase}
        .bs-cell--onDark .bs-cell-cap{color:rgba(240,240,240,.5)}
        .bs-cell--onLight .bs-cell-cap{color:rgba(28,40,65,.5)}
        .bs-play{position:absolute;z-index:2;top:12px;left:12px;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;
          background:rgba(28,40,65,.55);color:#fff;font-size:10px;line-height:1;padding-left:2px;backdrop-filter:blur(3px);transition:background 200ms ease}
        .bs-cell:hover .bs-play{background:var(--bronze)}
        .bs-reels{background:var(--navy);padding:96px 26px}
        .bs-reels .bs-lede{color:rgba(240,240,240,.7)}
        .bs-feed{background:var(--cloud);padding:96px 26px}
        .bs-motion{background:#f3ece1;padding:96px 26px}

        .bs-site-sec{background:var(--limestone);padding:96px 26px}
        .bs-site{max-width:1160px;margin:0 auto}
        .bs-shot-bar{display:flex;align-items:center;gap:14px;background:var(--navy);padding:10px 15px;font-size:10px;font-weight:500;letter-spacing:.14em;text-transform:uppercase}
        .bs-shot-dots{display:flex;gap:6px}
        .bs-shot-dots i{width:8px;height:8px;border-radius:50%;background:rgba(240,240,240,.24)}
        .bs-shot-dots i:first-child{background:var(--bronze)}
        .bs-shot-url{flex:1;color:rgba(240,240,240,.72);letter-spacing:.05em;text-transform:none}
        .bs-shot-live{color:var(--limestone);font-weight:600}
        .bs-site-tabs{display:flex;flex-wrap:wrap;border:1px solid var(--rule);border-top:0;border-bottom:0}
        .bs-site-tabs button{flex:1;min-width:104px;cursor:pointer;background:#d6c8b2;border:0;border-right:1px solid rgba(28,40,65,.1);padding:12px 8px;
          font-family:"Montserrat",sans-serif;font-size:9.5px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#6f6252;transition:background 150ms ease,color 150ms ease}
        .bs-site-tabs button:last-child{border-right:0}
        .bs-site-tabs button:hover{background:#cbbca4;color:var(--navy)}
        .bs-site-tabs button.on{background:var(--cloud);color:var(--bronze)}
        .bs-site-window{position:relative;height:640px;overflow-y:auto;overflow-x:hidden;border:1px solid var(--rule);background:#fff;scrollbar-width:thin}
        .bs-site-img{width:100%;height:auto;display:block}
        .bs-site-hint{position:sticky;bottom:10px;float:right;right:10px;margin-right:12px;background:rgba(28,40,65,.82);color:var(--cloud);font-size:8.5px;
          font-weight:500;letter-spacing:.14em;text-transform:uppercase;padding:5px 9px;pointer-events:none}
        .bs-site-foot{display:flex;align-items:center;justify-content:space-between;gap:16px;border:1px solid var(--rule);border-top:0;padding:13px 15px}
        .bs-site-nav{display:flex;align-items:center;gap:12px}
        .bs-site-nav button{width:34px;height:34px;cursor:pointer;line-height:1;background:transparent;border:1px solid var(--rule);color:var(--navy);font-size:19px;transition:all 150ms ease}
        .bs-site-nav button:hover{background:var(--navy);border-color:var(--navy);color:var(--cloud)}
        .bs-site-nav span{font-size:10px;font-weight:500;letter-spacing:.16em;color:#6f6252}
        .bs-visit{display:inline-flex;align-items:center;gap:9px;background:var(--navy);color:var(--cloud);text-decoration:none;padding:12px 20px;font-size:9.5px;
          font-weight:600;letter-spacing:.2em;text-transform:uppercase;transition:background 150ms ease}
        .bs-visit:hover{background:var(--bronze)}
        .bs-site figcaption{font-size:12.5px;font-weight:300;line-height:1.75;color:#5b5344;border-left:2px solid var(--bronze);padding-left:16px;margin-top:20px;max-width:72ch}

        .bs-lang{background:var(--catalyst);color:var(--cloud);padding:100px 26px}
        .bs-lang-inner{max-width:860px;margin:0 auto;text-align:center}
        .bs-lang-head{font-size:clamp(22px,3vw,34px);margin:0 0 44px;color:var(--limestone)}
        .bs-lang-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;border-block:1px solid rgba(240,240,240,.16);padding:34px 0;margin-bottom:36px}
        .bs-lang-label{font-size:9px;font-weight:600;letter-spacing:.28em;text-transform:uppercase;color:var(--bronze);margin:0 0 14px}
        .bs-lang-quote{font-family:"Cinzel",serif;font-size:24px;margin:0;color:var(--cloud)}
        .bs-lang-body{max-width:62ch;margin:0 auto;font-size:15px;font-weight:300;line-height:1.9;color:rgba(240,240,240,.74)}
        .bs-lang-body i{color:var(--limestone);font-style:italic}

        .bs-scope{background:var(--navy);color:var(--cloud);padding:96px 26px}
        .bs-row{max-width:1160px;margin:0 auto;display:grid;grid-template-columns:96px 1fr;gap:26px;padding:34px 0;border-top:1px solid rgba(240,240,240,.14)}
        .bs-row:last-child{border-bottom:1px solid rgba(240,240,240,.14)}
        .bs-row-no{font-family:"Cinzel",serif;font-size:30px;color:var(--bronze);line-height:1}
        .bs-row h3{font-size:22px;margin:0 0 10px;color:var(--limestone)}
        .bs-row-meta{font-size:9.5px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:rgba(240,240,240,.44);margin:0 0 16px}
        .bs-row-body{max-width:76ch;font-size:14.5px;font-weight:300;line-height:1.85;color:rgba(240,240,240,.76);margin:0}

        .bs-signoff{padding:76px 26px 92px;text-align:center}
        .bs-sign-mark{margin-bottom:46px}
        .bs-sign-img{width:210px;max-width:62%;height:auto;display:block;margin:0 auto}
        .bs-sign-grid{max-width:900px;margin:0 auto 40px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px;border-top:1px solid var(--rule);padding-top:26px}
        .bs-sign-label{font-size:9px;font-weight:500;letter-spacing:.24em;text-transform:uppercase;color:#6f6252;margin:0 0 10px}
        .bs-sign-name{font-family:"Cinzel",serif;font-size:20px;margin:0;color:var(--navy)}
        .bs-sign-name.bronze{color:var(--bronze)}
        .bs-sign-back{display:inline-block;font-size:9.5px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--navy);text-decoration:none}
        .bs-sign-back:hover{color:var(--bronze)}

        .bs-modal{--limestone:#e1d4c0;position:fixed;inset:0;z-index:90;background:rgba(14,22,38,.96);display:flex;align-items:center;justify-content:center;
          padding:44px;font-family:"Montserrat",system-ui,sans-serif}
        .bs-modal[hidden]{display:none}
        .bs-modal-inner{max-width:min(480px,86vw);max-height:84vh}
        .bs-modal-img{width:100%;height:auto;max-height:84vh;object-fit:contain;display:block}
        .bs-modal-x{position:absolute;top:24px;right:28px;background:none;border:0;color:#fff;font-size:24px;cursor:pointer}
        .bs-modal-x:hover,.bs-modal-nav:hover{color:var(--limestone)}
        .bs-modal-nav{position:absolute;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.06);border:0;color:#fff;font-size:34px;width:54px;height:54px;cursor:pointer;line-height:1}
        .bs-modal-nav.prev{left:24px}
        .bs-modal-nav.next{right:24px}
        .bs-modal-cap{position:absolute;bottom:26px;left:0;right:0;text-align:center;font-size:9.5px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.58)}

        @media(max-width:1080px){.bs-grid--916{grid-template-columns:repeat(4,1fr)}}
        @media(max-width:940px){
          .bs-grid--45{grid-template-columns:repeat(3,1fr)}
          .bs-grid--916{grid-template-columns:repeat(3,1fr)}
          .bs-reg-grid{grid-template-columns:1fr}
          .bs-rail-mid{display:none}
        }
        @media(max-width:620px){
          .bs-hero{padding:68px 22px 62px}
          .bs-grid--45{grid-template-columns:repeat(2,1fr)}
          .bs-grid--916{grid-template-columns:repeat(2,1fr)}
          .bs-facts{grid-template-columns:1fr;gap:18px}
          .bs-lang-grid{grid-template-columns:1fr;gap:26px}
          .bs-sign-grid{grid-template-columns:1fr;gap:20px}
          .bs-site-window{height:440px}
          .bs-site-foot{flex-direction:column;align-items:stretch;gap:12px}
          .bs-visit{justify-content:center}
          .bs-site-nav{justify-content:center}
          .bs-shot-url{display:none}
          .bs-row{grid-template-columns:54px 1fr;gap:14px}
          .bs-row-no{font-size:22px}
          .bs-modal{padding:22px}
          .bs-modal-nav{width:42px;height:42px;font-size:26px}
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
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap"
      />
    </>
  );
}
