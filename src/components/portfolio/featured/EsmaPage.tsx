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

const AISLE = [
  { id: "A.01", lane: "appetite", shelf: "Grocery — hero",        src: "/portfolio/esma-fine-foods/appetite/01-grocery.jpg",
    alt: "Esma promo poster — a wire basket and a green tote overflowing with produce on cream, with a 25% saving bubble",
    note: "The store, in one frame. Basket and bag cut out on cream, address along the bottom where a shopfront sign would be." },
  { id: "P.01", lane: "price",    shelf: "Fresh Deals — weekly",  src: "/portfolio/esma-fine-foods/price/01-fresh-deals-week.jpg",
    alt: "Weekly deals board — eight product cards with photo, description, weight and price on cream",
    note: "Eight lines, each with weight and price. Built to be read at arm's length on a phone, not admired." },
  { id: "A.02", lane: "appetite", shelf: "Choose your taste",     src: "/portfolio/esma-fine-foods/appetite/02-choose-your-taste.jpg",
    alt: "Close-up of freshly baked lahmacun with minced meat and peppers, script headline over the top",
    note: "Shot close enough that you can see the pepper. No price anywhere — this frame only has to make you hungry." },
  { id: "P.02", lane: "price",    shelf: "Weekend — up to 30%",   src: "/portfolio/esma-fine-foods/price/02-weekend-deals.jpg",
    alt: "Weekend deals board — nine produce cards with per-kilo prices, old prices struck through",
    note: "Produce only, per kilo, old price struck out. The comparison is the message." },
  { id: "A.03", lane: "appetite", shelf: "Pide",                  src: "/portfolio/esma-fine-foods/appetite/03-pide.jpg",
    alt: "Ramazan pide loaves in a brown paper bag on a wooden table, dark background",
    note: "One word, one loaf, one paper bag. The bakery counter without a word of copy." },
  { id: "P.03", lane: "price",    shelf: "Pınar Labne — $12 → $7", src: "/portfolio/esma-fine-foods/price/03-labne.jpg",
    alt: "Single-product discount card for Pınar creamy labneh twin pack, old price crossed out beside a large new price",
    note: "The single-SKU card. Corner ribbon, old price buried in a maroon dot, new price in a red slab you cannot miss." },
  { id: "A.04", lane: "appetite", shelf: "Simit",                 src: "/portfolio/esma-fine-foods/appetite/04-simit.jpg",
    alt: "Sesame-crusted simit on a white plate beside a bowl of flour and a coral napkin",
    note: "Lighter and cleaner than the rest of the appetite lane — breakfast light instead of dinner light." },
  { id: "P.04", lane: "price",    shelf: "Pide — $12 → $7",       src: "/portfolio/esma-fine-foods/price/04-pide-discount.jpg",
    alt: "Minimal discount card — a round pide on white inside an olive frame, old price struck through above the new one",
    note: "Same offer as the labneh card, stripped to a frame and a number. Proof the price template survives being emptied out." },
  { id: "A.05", lane: "appetite", shelf: "Sandwich",              src: "/portfolio/esma-fine-foods/appetite/05-sandwich.jpg",
    alt: "Stacked club sandwich with ham, tomato and lettuce on dark rye, photographed on a black plate",
    note: "Deli counter. Dark ground, single hero, script name top-left — the appetite lane's most restrained frame." },
] as const;

const RECEIPT = [
  ["Weekly deals board", "recurring"],
  ["Weekend produce board", "recurring"],
  ["Single-SKU discount cards", "on demand"],
  ["Appetite photography posts", "5 shown"],
  ["Store POV reel", "1:30"],
  ["Product tasting reel", "0:15"],
  ["Palette + type system", "locked"],
] as const;

const SWATCHES = [
  { name: "Maroon", hex: "#3B0F0E", css: "var(--maroon)" },
  { name: "Olive",  hex: "#5C6C40", css: "var(--olive)"  },
  { name: "Cream",  hex: "#F6EAC7", css: "var(--cream)"  },
] as const;

/* Rendered live rather than shipped as an image: the prototype referenced a
   spec-sheet photo that does not exist, and inventing a client brand document
   would be dishonest. These are the real faces the feed is set in. */
const FACES = [
  { sample: "Grocery",        name: "Mirza",          role: "Headlines",     cls: "es-face-serif"  },
  { sample: "Fresh & Organic", name: "Vintage Rotter", role: "Product names", cls: "es-face-script" },
  { sample: "$7.70 / kg",     name: "Mont",           role: "Price grids",   cls: "es-face-mono"   },
] as const;

export function EsmaPage({ client }: Props) {
  const frame = getFrameNumber(client); // "011"

  const [lightbox, setLightbox] = useState<number | null>(null);
  const openLightbox = useCallback((i: number) => setLightbox(i), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const stepLightbox = useCallback(
    (delta: number) => setLightbox((i) => (i === null ? i : (i + delta + AISLE.length) % AISLE.length)),
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

      <section className="es-aisle-sec">
        <h2 className="es-sec light"><span className="es-sec-no">02</span>The aisle<span className="es-scroll-hint">scroll sideways →</span></h2>
        <div className="es-aisle">
          {AISLE.map((it, i) => (
            <button type="button" className={`es-slot es-slot-${it.lane}`} key={it.id} onClick={() => openLightbox(i)}>
              <img className="es-slot-img" src={it.src} alt={it.alt} />
              <span className="es-tag">
                <span className="es-tag-id">{it.id}</span>
                <span className="es-tag-name">{it.shelf}</span>
              </span>
            </button>
          ))}
          <span className="es-aisle-end" />
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

      <section className="es-receipt-sec">
        <h2 className="es-sec"><span className="es-sec-no">04</span>The receipt</h2>
        <div className="es-receipt-grid">
          <div className="es-receipt">
            <p className="es-receipt-head">ESMA FINE FOODS<br /><span>9100 Jane St Unit 55 · Concord, ON</span></p>
            <ul>
              {RECEIPT.map(([item, qty]) => (
                <li key={item}><span>{item}</span><i></i><span>{qty}</span></li>
              ))}
            </ul>
            <p className="es-receipt-total"><span>Scope</span><i></i><span>Social media</span></p>
            <p className="es-receipt-foot">Thank you — come again</p>
          </div>

          <figure className="es-spec">
            <div className="es-spec-panel">
              <div className="es-spec-swatches">
                {SWATCHES.map((s) => (
                  <div className="es-swatch" key={s.name}>
                    <span className="es-swatch-chip" style={{ background: s.css }} />
                    <span className="es-swatch-name">{s.name}</span>
                    <span className="es-swatch-hex">{s.hex}</span>
                  </div>
                ))}
              </div>
              <ul className="es-spec-faces">
                {FACES.map((f) => (
                  <li key={f.name}>
                    <span className={`es-face-sample ${f.cls}`}>{f.sample}</span>
                    <span className="es-face-meta"><b>{f.name}</b> — {f.role}</span>
                  </li>
                ))}
              </ul>
            </div>
            <figcaption>Three colours, three faces. <b>Mirza</b> sets the headlines, a script carries the product names, <b>Mont</b> does the work in the price grids.</figcaption>
          </figure>
        </div>
      </section>

      <footer className="es-signoff">
        <div className="es-sign-grid">
          <div><p className="es-sign-label">Client</p><p className="es-sign-name">Esma Fine Foods</p></div>
          <div><p className="es-sign-label">Where</p><p className="es-sign-name">Concord, ON</p></div>
          <div><p className="es-sign-label">By</p><p className="es-sign-name accent">FrameFlow</p></div>
        </div>
        <Link className="es-sign-back" href="/portfolio">← Back to portfolio</Link>
      </footer>

      {lightbox !== null && (
        <div
          className="es-modal open"
          role="dialog"
          aria-modal="true"
          aria-label={`${AISLE[lightbox].shelf} — frame ${lightbox + 1} of ${AISLE.length}`}
          onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
        >
          <button type="button" className="es-modal-nav prev" onClick={() => stepLightbox(-1)} aria-label="Previous">←</button>

          <div className="es-modal-stage">
            <div className="es-modal-bar top">
              <span className="es-modal-counter">★ Shelf <b>{String(lightbox + 1).padStart(2, "0")}</b> / {String(AISLE.length).padStart(2, "0")}</span>
              <span className="es-modal-brand">ESMA · REEL {frame}</span>
              <button type="button" className="es-modal-close" onClick={closeLightbox} aria-label="Close">×</button>
            </div>
            <div className="es-modal-image-wrap">
              <img src={AISLE[lightbox].src} alt={AISLE[lightbox].alt} />
            </div>
            <div className="es-modal-bar bot">
              <span className="es-modal-slate">{AISLE[lightbox].shelf}</span>
            </div>
          </div>

          <button type="button" className="es-modal-nav next" onClick={() => stepLightbox(1)} aria-label="Next">→</button>
          <p className="es-modal-cap">{AISLE[lightbox].note}</p>
        </div>
      )}

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
        .es-spec-panel{border:1px solid var(--rule);background:var(--paper);padding:26px 24px}
        .es-spec-swatches{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:24px}
        .es-swatch{display:flex;flex-direction:column;gap:7px}
        .es-swatch-chip{display:block;height:64px;border:1px solid var(--rule)}
        .es-swatch-name{font-size:12px;font-weight:600;color:var(--maroon);letter-spacing:.04em}
        .es-swatch-hex{font-size:11px;color:var(--mute);font-variant-numeric:tabular-nums;letter-spacing:.06em}
        .es-spec-faces{list-style:none;margin:0;padding:0;border-top:1px dashed var(--rule)}
        .es-spec-faces li{display:flex;align-items:baseline;justify-content:space-between;gap:16px;padding:13px 0;border-bottom:1px dashed var(--rule)}
        .es-face-sample{color:var(--maroon);line-height:1.1}
        .es-face-serif{font-family:"Mirza",Georgia,serif;font-size:30px;font-weight:600}
        .es-face-script{font-family:"Vintage Rotter","Yellowtail",cursive;font-size:26px;color:var(--olive)}
        .es-face-mono{font-family:"Mont","Montserrat",sans-serif;font-size:22px;font-weight:700}
        .es-face-meta{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--mute);white-space:nowrap}
        .es-face-meta b{color:var(--maroon);font-weight:600}
        .es-spec figcaption{font-size:13.5px;line-height:1.65;color:#6a584f;margin-top:14px;border-left:3px solid var(--olive);padding-left:14px}
        .es-spec figcaption b{color:var(--maroon)}

        .es-signoff{padding:62px 22px 86px}
        .es-sign-grid{max-width:1200px;margin:0 auto 34px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px;border-top:3px solid var(--maroon);padding-top:22px}
        .es-sign-label{font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--mute);margin:0 0 8px}
        .es-sign-name{font-family:"Mirza",Georgia,serif;font-size:24px;font-weight:600;color:var(--maroon);margin:0}
        .es-sign-name.accent{color:var(--olive)}
        .es-sign-back{display:block;max-width:1200px;margin:0 auto;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--maroon);text-decoration:none}
        .es-sign-back:hover{color:var(--olive)}

        .es-modal{position:fixed;inset:0;z-index:90;display:flex;align-items:center;justify-content:center;padding:32px;background:rgba(28,8,7,.95);font-family:"Mont","Montserrat",sans-serif;animation:es-fade .22s ease-out}
        @keyframes es-fade{from{opacity:0}to{opacity:1}}
        /* The stage needs a DEFINITE height: the image below sizes itself with
           object-fit against a percentage height, which is ignored if the parent
           resolves to auto — the image would render at natural size and get
           clipped by the wrap's overflow. */
        .es-modal-stage{position:relative;width:min(680px,92vw);height:min(86vh,940px);max-height:86vh;background:var(--paper);display:flex;flex-direction:column;box-shadow:0 30px 90px rgba(0,0,0,.5);animation:es-pop .28s cubic-bezier(0.34,1.56,0.64,1)}
        @keyframes es-pop{from{transform:scale(.96);opacity:0}to{transform:scale(1);opacity:1}}
        .es-modal-bar{flex:0 0 auto;display:flex;align-items:center;gap:12px;padding:13px 16px;font-size:11px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--mute)}
        .es-modal-bar.top{border-bottom:2px solid var(--olive);justify-content:space-between}
        .es-modal-bar.bot{border-top:1px dashed var(--rule);justify-content:center;text-transform:none;letter-spacing:.04em;color:var(--maroon);font-family:"Mirza",Georgia,serif;font-size:19px;font-weight:600}
        .es-modal-counter b{color:var(--olive);font-weight:700}
        .es-modal-brand{letter-spacing:.2em;color:var(--maroon)}
        .es-modal-close{width:30px;height:30px;background:var(--maroon);color:var(--cream);border:0;cursor:pointer;font-size:16px;font-weight:700;line-height:1;padding:0;display:flex;align-items:center;justify-content:center;transition:background .16s}
        .es-modal-close:hover{background:var(--olive)}
        .es-modal-image-wrap{flex:1 1 auto;min-height:0;background:var(--cream);overflow:hidden;display:flex;align-items:center;justify-content:center}
        .es-modal-image-wrap img{width:100%;height:100%;object-fit:contain;display:block}
        .es-modal-nav{position:absolute;top:50%;transform:translateY(-50%);width:54px;height:54px;background:var(--paper);color:var(--maroon);border:2px solid var(--maroon);cursor:pointer;font-size:20px;font-weight:700;line-height:1;padding:0;display:flex;align-items:center;justify-content:center;transition:transform .16s,background .16s,color .16s;z-index:2}
        .es-modal-nav:hover{transform:translateY(-50%) scale(1.06);background:var(--olive);color:var(--cream);border-color:var(--olive)}
        .es-modal-nav.prev{left:32px}.es-modal-nav.next{right:32px}
        .es-modal-cap{position:absolute;bottom:22px;left:40px;right:40px;text-align:center;font-size:13px;line-height:1.5;color:rgba(246,234,199,.72)}

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
          .es-modal{padding:12px}
          .es-modal-stage{width:calc(100% - 88px);height:min(76vh,720px)}
          .es-modal-nav{width:36px;height:36px;font-size:15px}
          .es-modal-nav.prev{left:6px}.es-modal-nav.next{right:6px}
          .es-modal-cap{left:12px;right:12px;font-size:12px}
        }
        @media (prefers-reduced-motion: reduce){
          .es-modal,.es-modal-stage{animation:none}
          .es-slot-img,.es-modal-close,.es-modal-nav{transition:none}
          .es-slot:hover .es-slot-img{transform:none}
          .es-modal-nav:hover{transform:translateY(-50%)}
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
