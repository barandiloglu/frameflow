"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getFrameNumber } from "@/data/clients";
import type { Client } from "@/data/clients";
import { LoadingTransition } from "@/components/portfolio/LoadingTransition";

type Props = { client: Client };

// span: "" | "wide" | "tall" — masonry sizing in the gallery.
const PHOTOS = [
  { src: "/portfolio/connectr/photos/01-guests-portrait.jpg",   alt: "Two guests at the ConnecTR 2025 fair, posing for a portrait",              slate: "Guests · Portrait",     span: "tall" },
  { src: "/portfolio/connectr/photos/02-conversation.jpg",      alt: "Two attendees in conversation on the exhibitor floor",                     slate: "Candid · Talk",         span: ""     },
  { src: "/portfolio/connectr/photos/03-art-easel.jpg",         alt: "A portrait painting displayed on an easel in the culture area",            slate: "Culture · Art",         span: "wide" },
  { src: "/portfolio/connectr/photos/04-group.jpg",             alt: "Attendees on stage during a recognition moment at the fair",               slate: "Community · Group",     span: ""     },
  { src: "/portfolio/connectr/photos/05-topcu-booth.jpg",       alt: "An exhibitor at their branded booth",                                      slate: "Exhibitor · Booth",     span: ""     },
  { src: "/portfolio/connectr/photos/06-mavi-booth.jpg",        alt: "The Mavi Travel & Tours exhibitor booth",                                  slate: "Exhibitor · Travel",    span: ""     },
  { src: "/portfolio/connectr/photos/07-ibiza-booth.jpg",       alt: "The Ibiza Premium Furniture exhibitor booth",                              slate: "Exhibitor · Furniture", span: ""     },
  { src: "/portfolio/connectr/photos/08-atlantis-auto.jpg",     alt: "The Atlantis Auto exhibitor booth",                                        slate: "Exhibitor · Auto",      span: ""     },
  { src: "/portfolio/connectr/photos/09-frameflow-booth.jpg",   alt: "A FrameFlow crew member filming on the exhibitor floor",                   slate: "On site · FrameFlow",   span: ""     },
  { src: "/portfolio/connectr/photos/10-honey-vendor.jpg",      alt: "A vendor's table of local honey jars",                                     slate: "Vendor · Honey",        span: "tall" },
  { src: "/portfolio/connectr/photos/11-baklava-vendor.jpg",    alt: "A close-up of baklava at a pastry vendor",                                 slate: "Vendor · Pastry",       span: ""     },
  { src: "/portfolio/connectr/photos/12-food-vendor.jpg",       alt: "A Turkish food vendor on the fair floor",                                  slate: "Vendor · Food",         span: ""     },
  { src: "/portfolio/connectr/photos/13-superb-auto.jpg",       alt: "A car showcased by Superb Auto at the fair",                               slate: "Showcase · Auto",       span: "tall" },
  { src: "/portfolio/connectr/photos/14-live-music.jpg",        alt: "A live musician performing on stage",                                      slate: "Stage · Live music",    span: "wide" },
  { src: "/portfolio/connectr/photos/15-behind-the-scenes.jpg", alt: "The FrameFlow videographer filming on the floor",                          slate: "Behind the scenes",     span: ""     },
  { src: "/portfolio/connectr/photos/16-handshake.jpg",         alt: "Two attendees shaking hands",                                              slate: "Candid · Connection",   span: "wide" },
  { src: "/portfolio/connectr/photos/17-networking.jpg",        alt: "Attendees networking on the exhibitor floor",                              slate: "Candid · Network",      span: ""     },
  { src: "/portfolio/connectr/photos/18-candid-smile.jpg",      alt: "A smiling guest at the fair",                                              slate: "Candid · Smile",        span: ""     },
  { src: "/portfolio/connectr/photos/19-flag-portrait.jpg",     alt: "A guest photographed by the Turkish flag",                                 slate: "Portrait · Flag",       span: "tall" },
  { src: "/portfolio/connectr/photos/20-festival-context.jpg",  alt: "The ConnecTR Turkish Culture & Food Festival banner",                      slate: "ConnecTR · The Fair",   span: ""     },
] as const;

// The hero strip reuses four gallery frames (portrait, live music, handshake, conversation).
const STRIP = [0, 13, 15, 1] as const;

export function ConnecTRPage({ client }: Props) {
  const frame = getFrameNumber(client);

  // Lightbox: index of the open gallery photo, or null when closed.
  const [lightbox, setLightbox] = useState<number | null>(null);
  const openLightbox = useCallback((i: number) => setLightbox(i), []);

  return (
    <div className="ctr-page">
      <LoadingTransition
        frameNumber={frame}
        clientName={client.name}
        scope={["Photography", "Video"]}
        location="Vaughan, ON"
        year={client.year}
      />

      <header className="ctr-rail">
        <Link className="ctr-rail-back" href="/portfolio">← Portfolio</Link>
        <span className="ctr-rail-center">CONNEC<b>TR</b> · CASE STUDY</span>
        <span className="ctr-rail-meta">FrameFlow · Reel <b>{frame}</b> · 2025</span>
      </header>

      <section className="ctr-hero">
        <div className="ctr-hero-band" />
        <div className="ctr-hero-top">
          <div className="ctr-hero-inner">
            <p className="ctr-crumb"><span>Case Study</span><i>·</i><span>Reel {frame}</span><i>·</i><span>Vaughan, ON</span></p>
            <h1 className="ctr-hero-title">More than a fair —<br /><em>a community gathered.</em></h1>
            <p className="ctr-hero-deck"><b>ConnecTR 2025</b> — the largest gathering of Turkic entrepreneurship, culture and community in North America. FrameFlow covered the day end to end: <b>photography</b> and <b>video</b> across a full exhibitor floor.</p>
            <dl className="ctr-hero-meta">
              <div><dt>01 · Photography</dt><dd>Full-day coverage</dd></div>
              <div><dt>02 · Videography</dt><dd>Event film</dd></div>
              <div><dt>Where</dt><dd>Vaughan, Ontario</dd></div>
            </dl>
          </div>
          <div className="ctr-hero-brand">
            <div className="ctr-hero-brand-card">
              <img src="/portfolio/connectr/logo.png" alt="ConnecTR — Turkish Community Fair" />
              <span className="ctr-hero-brand-cap">Turkish Community Fair · 2025</span>
            </div>
          </div>
        </div>
        <div className="ctr-hero-strip">
          {STRIP.map((idx, i) => (
            <button className={`ctr-strip-img si-${i + 1}`} key={idx} onClick={() => openLightbox(idx)}>
              <img src={PHOTOS[idx].src} alt={PHOTOS[idx].alt} />
            </button>
          ))}
        </div>
      </section>

      <section className="ctr-marquee" aria-hidden="true">
        <div className="ctr-marquee-track">
          {[0, 1].map((dup) => (
            <span className="ctr-marquee-group" key={dup}>
              {["Exhibitors", "Vendors", "Culture", "People", "Connection"].map((h) => (
                <span className="ctr-marquee-item" key={h}>{h}<i>✦</i></span>
              ))}
            </span>
          ))}
        </div>
      </section>

      <section className="ctr-brief">
        <div className="ctr-brief-inner">
          <span className="ctr-brief-stamp">The brief</span>
          <h2>Capture the room<br /><em>so it feels like being there.</em></h2>
          <p>A community fair lives in its faces — the vendor mid-sentence, the handshake that turns into a deal, the kid in front of the art. The brief was simple: document the whole floor honestly, and give ConnecTR a library it can build a year of promotion on.</p>
          <p className="ctr-brief-by"><span></span> ConnecTR · The Civic Exchange</p>
        </div>
      </section>

      <FontLink />
      <style jsx global>{`
        .ctr-page{
          --crimson:#c8102e;--crimson-deep:#9d0c24;--navy:#16244b;--navy-soft:#24345f;
          --sand:#d8cbb4;--off:#f7f5f1;--off-deep:#ece7dd;
          background:var(--off);color:var(--navy);font-family:"Inter",system-ui,sans-serif;min-height:100vh;overflow-x:hidden;
        }
        .ctr-page img{display:block;max-width:100%}

        .ctr-rail{display:flex;align-items:center;justify-content:space-between;padding:20px 32px;border-bottom:1px solid var(--off-deep);font-size:13px;letter-spacing:.14em;text-transform:uppercase;position:sticky;top:0;z-index:30;background:rgba(247,245,241,.88);backdrop-filter:blur(10px)}
        .ctr-rail-back{color:var(--navy);text-decoration:none;font-weight:600}
        .ctr-rail-center{color:var(--navy);font-weight:700}.ctr-rail-center b{color:var(--crimson)}
        .ctr-rail-meta{color:#7c7a74}.ctr-rail-meta b{color:var(--crimson)}

        .ctr-hero{position:relative;max-width:1240px;margin:0 auto;padding:clamp(44px,7vw,100px) 32px clamp(40px,6vw,80px)}
        .ctr-hero-band{position:absolute;top:0;left:0;width:6px;height:100%;background:linear-gradient(180deg,var(--crimson),var(--navy))}
        .ctr-hero-top{display:grid;grid-template-columns:1.2fr .8fr;gap:clamp(30px,5vw,70px);align-items:center}
        .ctr-hero-inner{max-width:820px}
        .ctr-hero-brand{display:flex;align-items:center;justify-content:center}
        .ctr-hero-brand-card{background:#fff;border-radius:18px;padding:clamp(28px,3vw,44px);box-shadow:0 22px 54px rgba(22,36,75,.12);border-top:4px solid var(--crimson);display:flex;flex-direction:column;align-items:center;gap:18px;width:100%;max-width:400px}
        .ctr-hero-brand-card img{display:block;width:100%;height:auto}
        .ctr-hero-brand-cap{font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#7c7a74;font-weight:600;text-align:center}
        .ctr-crumb{display:flex;gap:12px;align-items:center;font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:#7c7a74;font-weight:600;margin-bottom:26px}
        .ctr-crumb i{color:var(--crimson);font-style:normal}
        .ctr-hero-title{font-family:"Montserrat",sans-serif;font-weight:900;font-size:clamp(40px,6.4vw,90px);line-height:1;letter-spacing:-.02em;color:var(--navy);margin-bottom:26px}
        .ctr-hero-title em{font-style:normal;color:var(--crimson)}
        .ctr-hero-deck{font-family:"Fraunces",serif;font-size:clamp(18px,2vw,26px);line-height:1.5;color:#3c4258;max-width:620px;margin-bottom:34px}
        .ctr-hero-deck b{color:var(--navy);font-weight:600}
        .ctr-hero-meta{display:flex;gap:34px;flex-wrap:wrap;border-top:2px solid var(--off-deep);padding-top:22px}
        .ctr-hero-meta dt{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--crimson);font-weight:700;margin-bottom:6px}
        .ctr-hero-meta dd{font-family:"Montserrat",sans-serif;font-size:17px;font-weight:700;color:var(--navy)}
        .ctr-hero-strip{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:46px}
        .ctr-strip-img{position:relative;border:0;padding:0;cursor:pointer;overflow:hidden;border-radius:10px;aspect-ratio:3/4;background:#ccc;box-shadow:0 14px 34px rgba(22,36,75,.16);transition:transform .3s ease}
        .ctr-strip-img img{width:100%;height:100%;object-fit:cover}
        .ctr-strip-img:hover{transform:translateY(-4px)}
        .ctr-strip-img.si-1{border-bottom:4px solid var(--crimson)}

        .ctr-brief{background:var(--navy);color:var(--off);padding:clamp(60px,9vw,130px) 32px}
        .ctr-brief-inner{max-width:900px;margin:0 auto;text-align:center}
        .ctr-brief-stamp{display:inline-block;font-size:12px;letter-spacing:.28em;text-transform:uppercase;color:var(--crimson);font-weight:700;border:1px solid rgba(200,16,46,.5);padding:7px 18px;border-radius:100px;margin-bottom:34px}
        .ctr-brief h2{font-family:"Fraunces",serif;font-weight:500;font-size:clamp(30px,4.6vw,58px);line-height:1.14;margin-bottom:30px}
        .ctr-brief h2 em{font-style:italic;color:var(--sand)}
        .ctr-brief p{font-size:clamp(16px,1.7vw,21px);line-height:1.7;color:rgba(247,245,241,.74);max-width:680px;margin:0 auto}
        .ctr-brief-by{margin-top:32px!important;font-size:14px!important;letter-spacing:.14em;text-transform:uppercase;color:var(--sand)!important;display:flex;align-items:center;justify-content:center;gap:12px}
        .ctr-brief-by span{width:40px;height:2px;background:var(--crimson);display:inline-block}

        .ctr-marquee{overflow:hidden;border-top:1px solid var(--off-deep);border-bottom:1px solid var(--off-deep);background:#fff;padding:16px 0}
        .ctr-marquee-track{display:flex;width:max-content;animation:ctr-scroll 32s linear infinite}
        .ctr-marquee-group{display:flex;flex-shrink:0}
        .ctr-marquee-item{display:flex;align-items:center;gap:26px;padding:0 26px;font-family:"Montserrat",sans-serif;font-weight:900;font-size:clamp(20px,2.4vw,34px);letter-spacing:-.01em;text-transform:uppercase;color:var(--navy);white-space:nowrap}
        .ctr-marquee-item i{color:var(--crimson);font-style:normal;font-size:.7em}
        @keyframes ctr-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}

        .ctr-del{max-width:1240px;margin:0 auto;padding:clamp(56px,8vw,110px) 32px}
        .ctr-del-head{display:grid;grid-template-columns:auto 1fr;gap:20px 28px;align-items:start;margin-bottom:48px}
        .ctr-del-head .num{font-family:"Montserrat",sans-serif;font-weight:900;font-size:clamp(60px,9vw,120px);line-height:.8;color:var(--crimson);grid-row:span 2}
        .ctr-del-head .label{font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:#7c7a74;font-weight:700;margin-bottom:10px}
        .ctr-del-head h3{font-family:"Montserrat",sans-serif;font-weight:800;font-size:clamp(26px,3.6vw,46px);line-height:1.08;letter-spacing:-.01em;color:var(--navy)}
        .ctr-del-head h3 em{font-style:normal;color:var(--crimson)}
        .ctr-del-head .meta{grid-column:2;display:flex;gap:26px;flex-wrap:wrap;margin-top:18px}
        .ctr-del-head .meta span{font-size:14px;color:#55596a}
        .ctr-del-head .meta b{font-family:"Montserrat",sans-serif;color:var(--navy);font-weight:700}
        .ctr-del-head.light .label{color:rgba(247,245,241,.6)}
        .ctr-del-head.light h3{color:var(--off)}.ctr-del-head.light h3 em{color:var(--sand)}
        .ctr-del-head.light .meta span{color:rgba(247,245,241,.72)}.ctr-del-head.light .meta b{color:var(--off)}

        .ctr-coverage{background:#fff;border:1px solid var(--off-deep);border-radius:20px;padding:30px;margin-bottom:46px;box-shadow:0 18px 44px rgba(22,36,75,.06)}
        .ctr-coverage .head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:22px}
        .ctr-coverage .head span{font-family:"Montserrat",sans-serif;font-weight:800;font-size:20px;color:var(--navy)}
        .ctr-coverage .head small{font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:#7c7a74}
        .ctr-coverage .grid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}
        .cov{border:1px solid var(--off-deep);border-radius:14px;padding:18px 14px;background:var(--off);display:flex;flex-direction:column;gap:8px;transition:border-color .25s,transform .25s}
        .cov:hover{border-color:var(--crimson);transform:translateY(-3px)}
        .cov .cid{font-family:"Montserrat",sans-serif;font-weight:800;font-size:14px;color:var(--crimson);letter-spacing:.04em}
        .cov .cname{font-family:"Montserrat",sans-serif;font-weight:700;font-size:16px;color:var(--navy)}
        .cov .cnote{font-size:12px;color:#7c7a74;line-height:1.3}

        .ctr-gallery-lbl{text-align:center;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#7c7a74;margin-bottom:22px}
        .ctr-gallery{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:220px;gap:14px;grid-auto-flow:dense}
        .ctr-gallery .cell{position:relative;border:0;padding:0;cursor:pointer;overflow:hidden;border-radius:12px;background:#ccc;box-shadow:0 10px 26px rgba(22,36,75,.1);transition:transform .3s ease}
        .ctr-gallery .cell img{width:100%;height:100%;object-fit:cover}
        .ctr-gallery .cell.wide{grid-column:span 2}
        .ctr-gallery .cell.tall{grid-row:span 2}
        .ctr-gallery .cell:hover{transform:translateY(-4px)}
        .ctr-gallery .slate{position:absolute;left:10px;bottom:10px;z-index:2;background:rgba(22,36,75,.82);color:#fff;font-size:11px;font-weight:600;letter-spacing:.04em;padding:5px 9px;border-radius:6px;opacity:0;transform:translateY(6px);transition:all .3s ease}
        .ctr-gallery .cell:hover .slate{opacity:1;transform:translateY(0)}
        .ctr-gallery .zoom{position:absolute;right:10px;top:10px;z-index:2;color:#fff;font-size:18px;opacity:0;transition:opacity .3s ease;text-shadow:0 2px 10px rgba(0,0,0,.5)}
        .ctr-gallery .cell:hover .zoom{opacity:1}

        .ctr-video{background:var(--navy);color:var(--off)}
        .ctr-video-inner{max-width:1240px;margin:0 auto;padding:clamp(56px,8vw,110px) 32px}
        .ctr-video-frame{border-radius:20px;overflow:hidden;background:var(--navy-soft);border:1px solid rgba(247,245,241,.1);aspect-ratio:16/9;display:flex;align-items:center;justify-content:center}
        .ctr-video-slot{text-align:center;padding:30px}
        .ctr-video-slot .play{display:inline-flex;align-items:center;justify-content:center;width:84px;height:84px;border-radius:50%;background:var(--crimson);color:#fff;font-size:30px;padding-left:6px;margin-bottom:22px;box-shadow:0 14px 40px rgba(200,16,46,.4)}
        .ctr-video-slot .vp-title{font-family:"Montserrat",sans-serif;font-weight:700;font-size:22px;color:var(--off);margin-bottom:8px}
        .ctr-video-slot .vp-note{font-size:14px;color:rgba(247,245,241,.6)}
        .ctr-video-cap{text-align:center;margin-top:18px;font-size:13px;color:rgba(247,245,241,.5);font-style:italic}

        .ctr-colophon{background:var(--off-deep);padding:clamp(56px,8vw,110px) 32px;text-align:center}
        .ctr-swatches{display:flex;gap:18px;justify-content:center;flex-wrap:wrap;margin-bottom:50px}
        .ctr-swatches .sw{display:flex;flex-direction:column;align-items:center;gap:8px}
        .ctr-swatches .chip{width:68px;height:68px;border-radius:14px;box-shadow:0 8px 20px rgba(22,36,75,.15)}
        .ctr-swatches .sw-name{font-family:"Montserrat",sans-serif;font-weight:700;font-size:14px;color:var(--navy)}
        .ctr-swatches .sw-hex{font-size:12px;color:#7c7a74;font-variant-numeric:tabular-nums}
        .ctr-close{font-family:"Fraunces",serif;font-weight:500;font-size:clamp(32px,5.4vw,68px);line-height:1.06;color:var(--navy);margin-bottom:22px}
        .ctr-close em{font-style:italic;color:var(--crimson)}
        .ctr-sign{font-size:14px;letter-spacing:.06em;color:#7c7a74;margin-bottom:30px}.ctr-sign b{color:var(--navy)}
        .ctr-back-btn{display:inline-block;font-family:"Montserrat",sans-serif;font-weight:700;font-size:15px;color:#fff;background:var(--crimson);padding:14px 30px;border-radius:100px;text-decoration:none;cursor:pointer;border:0}
        .ctr-back-btn:hover{background:var(--crimson-deep)}

        .ctr-modal{position:fixed;inset:0;z-index:200;background:rgba(12,18,38,.95);display:none;align-items:center;justify-content:center;padding:40px}
        .ctr-modal.open{display:flex}
        .ctr-modal-img{position:relative;width:min(92vw,1100px);height:min(84vh,760px);display:flex;align-items:center;justify-content:center}
        .ctr-modal-img img{max-width:100%;max-height:100%;object-fit:contain}
        .ctr-modal-close{position:absolute;top:24px;right:28px;background:none;border:0;color:#fff;font-size:26px;cursor:pointer;opacity:.8}
        .ctr-modal-nav{position:absolute;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.08);border:0;color:#fff;font-size:40px;width:60px;height:60px;border-radius:50%;cursor:pointer;line-height:1}
        .ctr-modal-nav:hover{background:var(--crimson)}
        .ctr-modal-nav.prev{left:24px}.ctr-modal-nav.next{right:24px}
        .ctr-modal-cap{position:absolute;bottom:26px;left:0;right:0;text-align:center;color:rgba(255,255,255,.7);font-size:13px;letter-spacing:.1em;text-transform:uppercase}

        @media (max-width:880px){
          .ctr-del-head{grid-template-columns:1fr}.ctr-del-head .num{grid-row:auto}.ctr-del-head .meta{grid-column:1}
          .ctr-coverage .grid{grid-template-columns:repeat(2,1fr)}
          .ctr-gallery{grid-template-columns:repeat(2,1fr);grid-auto-rows:180px}
          .ctr-hero-strip{grid-template-columns:repeat(2,1fr)}
          .ctr-hero-top{grid-template-columns:1fr;gap:34px}
          .ctr-hero-brand{justify-content:flex-start}
          .ctr-hero-brand-card{max-width:320px;align-items:flex-start}
          .ctr-rail-center{display:none}
        }
        @media (max-width:520px){.ctr-coverage .grid{grid-template-columns:1fr}}
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
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600;700&family=Montserrat:wght@600;700;800;900&display=swap"
      />
    </>
  );
}
