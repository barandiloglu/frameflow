"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getFrameNumber } from "@/data/clients";
import type { Client } from "@/data/clients";
import { LoadingTransition } from "@/components/portfolio/LoadingTransition";

type Props = { client: Client };

const DIVISIONS = [
  { no: "01", name: "Beach",  camera: "Macro & still",    tone: "Sand, coral, low sun",
    body: "The consumer line. Everything is shot at arm's length or closer — fringe, weave, the fold of a towel over driftwood. Warm, unhurried, and always tied to a place you would rather be." },
  { no: "02", name: "Marine", camera: "Aerial & moving",  tone: "Open water, cold light",
    body: "The boating line. The product barely appears; the water does. Shot from the air, following a catamaran across open lake — this division sells the life the cloth belongs to, not the cloth." },
  { no: "03", name: "B2B",    camera: "Studio & clean",   tone: "White, marble, poolside",
    body: "The hospitality line. Sold to operators, not holidaymakers — so the cloth is stacked, spotless and shot on white, and the copy talks about their guests instead of ours." },
] as const;

const GALLERY = [
  { id: "B.01", lane: "beach", src: "/portfolio/harbourloom/posts/01-beach-triptych.jpg",
    line: "Let the footprints fade. Keep the feeling. A tangible piece of a perfect day.",
    note: "Triptych. Product, place, detail — read left to right in a second and a half.",
    alt: "Three-panel Harbour Loom post — a blue and orange fish-print towel on sand, footprints through sunlit dunes, and a fringed woven edge in close-up" },
  { id: "B.02", lane: "beach", src: "/portfolio/harbourloom/posts/02-muse.jpg",
    line: "Mother Nature is our muse. And our toughest rival.",
    note: "One hero frame, three supporting. The line earns the space it takes.",
    alt: "Harbour Loom post — an orange fringed towel draped over driftwood beside three smaller frames of weave, sunset shore and sunset sky" },
  { id: "B.03", lane: "beach", src: "/portfolio/harbourloom/posts/03-weave-macro.jpg",
    line: "No copy. Just the cloth.",
    note: "Shot close enough to count threads. The texture is the entire argument.",
    alt: "Macro photograph of a pink and orange patterned Harbour Loom weave folded over a blue cloth" },
  { id: "W.01", lane: "b2b", src: "/portfolio/harbourloom/posts/04-b2b-cloud.jpg",
    line: "We tried to photograph a cloud. This was the best we could do.",
    note: "Pure studio. One joke, delivered straight — the only humour anywhere in the brand.",
    alt: "Three folded white hotel towels stacked on a marble counter against a pure white background" },
  { id: "W.02", lane: "b2b", src: "/portfolio/harbourloom/posts/05-b2b-hospitality.jpg",
    line: "You create the picture-perfect oasis for your guests. We supply the high-performance textiles to complete it. Let's ensure your service never misses a beat.",
    note: "The buyer's world, not the product's. Baskets, poolside, service in motion.",
    alt: "Harbour Loom hospitality post — rolled white towels in wicker baskets beside a resort pool with palms and a sea view" },
] as const;

export function HarbourLoomPage({ client }: Props) {
  const frame = getFrameNumber(client); // "014"

  const [lightbox, setLightbox] = useState<number | null>(null);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const stepLightbox = useCallback(
    (delta: number) => setLightbox((i) => (i === null ? i : (i + delta + GALLERY.length) % GALLERY.length)),
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

      <section className="hl-div">
        <h2 className="hl-sec"><span>The Three Lines</span><i></i></h2>
        <div className="hl-div-grid">
          {DIVISIONS.map((d) => (
            <article key={d.no}>
              <span className="hl-div-no">{d.no}</span>
              <h3>{d.name}</h3>
              <p className="hl-div-meta">{d.camera}<i>·</i>{d.tone}</p>
              <p>{d.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="hl-beach">
        <h2 className="hl-sec"><span>01 — Beach</span><i></i><em>Macro &amp; still</em></h2>
        <p className="hl-lead">Sell the cloth by making people want to touch it.</p>
        <p className="hl-body">Every frame in this division is either the weave itself or the weave against somewhere warm. Editorial grids — a triptych, a hero with three supports — because a single square cannot carry both the product and the place. The copy stays out of the way: two lines, set in the brand&rsquo;s own serif, never competing with the photograph.</p>
        <div className="hl-sheet">
          {GALLERY.map((g, i) => g.lane !== "beach" ? null : (
            <button type="button" className="hl-cell" key={g.id} onClick={() => setLightbox(i)}>
              <img className="hl-cell-img" src={g.src} alt={g.alt} loading="lazy" />
              <span className="hl-cell-meta"><b>{g.id}</b><span>{g.note}</span></span>
            </button>
          ))}
        </div>
        <figure className="hl-reel beach">
          <video className="hl-reel-el" controls preload="none" poster="/portfolio/harbourloom/video/beach-poster.jpg">
            <source src="/portfolio/harbourloom/video/beach-reel.mp4" type="video/mp4" />
          </video>
          <figcaption><b>Beach reel</b> — 0:17, vertical. Towels over a fence, one pattern after another, closing on &ldquo;Which one is yours?&rdquo;</figcaption>
        </figure>
      </section>

      <section className="hl-marine">
        <h2 className="hl-sec light"><span>02 — Marine</span><i></i><em>Aerial &amp; moving</em></h2>
        <div className="hl-marine-grid">
          <figure className="hl-reel marine">
            <video className="hl-reel-el" controls preload="none" poster="/portfolio/harbourloom/video/marine-poster.jpg">
              <source src="/portfolio/harbourloom/video/marine-reel.mp4" type="video/mp4" />
            </video>
            <figcaption><b>Marine reel</b> — 0:25, vertical, drone. Out on the lake, a moored yacht, a marina of masts.</figcaption>
          </figure>
          <div>
            <p className="hl-lead light">Here the product gets out of the way.</p>
            <p className="hl-body light">A boat owner is not shopping for a towel. They are picturing a Saturday. So Marine drops the macro lens entirely and goes up — a catamaran cutting a line across the lake, twin wakes behind it, the horizon doing all the selling.</p>
            <p className="hl-body light">Cold light where Beach is warm. Motion where Beach is still. Wide where Beach is close. The only constant is the mark in the corner — which is exactly how you keep one brand from splitting into three.</p>
          </div>
        </div>
      </section>

      <section className="hl-b2b">
        <h2 className="hl-sec"><span>03 — B2B</span><i></i><em>Studio &amp; clean</em></h2>
        <p className="hl-lead">Third buyer, third room entirely.</p>
        <p className="hl-body">Hotels and clubs do not buy a feeling, they buy linen that survives a thousand washes. So the sunset goes and the cloth gets stacked on marble against pure white — the one place in this brand where the product is photographed like a product. Then the second frame steps into the buyer&rsquo;s own world instead: baskets, poolside, service mid-service. Warm again, but warm about <i>their</i> guests, never ours.</p>
        <div className="hl-sheet two">
          {GALLERY.map((g, i) => g.lane !== "b2b" ? null : (
            <button type="button" className="hl-cell" key={g.id} onClick={() => setLightbox(i)}>
              <img className="hl-cell-img" src={g.src} alt={g.alt} loading="lazy" />
              <span className="hl-cell-meta"><b>{g.id}</b><span>{g.note}</span></span>
            </button>
          ))}
        </div>
      </section>

      {lightbox !== null && (
        <div
          className="hl-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${GALLERY[lightbox].id} — frame ${lightbox + 1} of ${GALLERY.length}`}
          onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
        >
          <button type="button" className="hl-modal-nav prev" onClick={() => stepLightbox(-1)} aria-label="Previous">‹</button>

          <div className="hl-modal-stage">
            <div className="hl-modal-bar">
              <span className="hl-modal-id">{GALLERY[lightbox].id}</span>
              <span className="hl-modal-count">{String(lightbox + 1).padStart(2, "0")} / {String(GALLERY.length).padStart(2, "0")}</span>
              <button type="button" className="hl-modal-close" onClick={closeLightbox} aria-label="Close">✕</button>
            </div>
            <div className="hl-modal-shot">
              <img src={GALLERY[lightbox].src} alt={GALLERY[lightbox].alt} />
            </div>
          </div>

          <button type="button" className="hl-modal-nav next" onClick={() => stepLightbox(1)} aria-label="Next">›</button>
          <p className="hl-modal-cap">{GALLERY[lightbox].line}</p>
        </div>
      )}

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

        .hl-modal{position:fixed;inset:0;z-index:90;display:flex;align-items:center;justify-content:center;padding:36px;background:rgba(12,26,33,.95);font-family:"Jost",sans-serif;animation:hl-fade .22s ease-out}
        @keyframes hl-fade{from{opacity:0}to{opacity:1}}
        .hl-modal-stage{position:relative;width:min(560px,88vw);height:min(78vh,860px);max-height:82vh;background:var(--paper);display:flex;flex-direction:column;box-shadow:0 30px 90px rgba(0,0,0,.5);animation:hl-pop .28s cubic-bezier(0.34,1.56,0.64,1)}
        @keyframes hl-pop{from{transform:scale(.96);opacity:0}to{transform:scale(1);opacity:1}}
        .hl-modal-bar{flex:0 0 auto;display:flex;align-items:center;gap:12px;padding:12px 14px;border-bottom:1px solid var(--rule);font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--mute)}
        .hl-modal-id{color:var(--coral)}
        .hl-modal-count{margin-left:auto;font-variant-numeric:tabular-nums;color:var(--ink)}
        .hl-modal-close{width:26px;height:26px;background:none;border:0;color:var(--ink);cursor:pointer;font-size:15px;line-height:1;padding:0;display:flex;align-items:center;justify-content:center;transition:color .16s}
        .hl-modal-close:hover{color:var(--coral)}
        .hl-modal-shot{flex:1 1 auto;min-height:0;background:var(--shell);overflow:hidden;display:flex;align-items:center;justify-content:center}
        .hl-modal-shot img{width:100%;height:100%;object-fit:contain;display:block}
        .hl-modal-nav{position:absolute;top:50%;transform:translateY(-50%);width:52px;height:52px;background:rgba(255,255,255,.07);border:0;color:#fff;font-size:34px;line-height:1;padding:0;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .16s,background .16s,color .16s;z-index:2}
        .hl-modal-nav:hover{transform:translateY(-50%) scale(1.06);background:rgba(255,255,255,.14);color:var(--coral)}
        .hl-modal-nav.prev{left:26px}.hl-modal-nav.next{right:26px}
        .hl-modal-cap{position:absolute;left:40px;right:40px;bottom:22px;margin:0;text-align:center;font-family:"Juana","Cormorant Garamond",Georgia,serif;font-style:italic;font-size:17px;line-height:1.5;color:rgba(255,255,255,.82);z-index:1}

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
