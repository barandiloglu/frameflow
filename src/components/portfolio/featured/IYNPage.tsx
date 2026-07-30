"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
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

/* Section 02 embeds a static snapshot of the client's own marketing site
   (public/portfolio/iyn/site), so the real pages run and scroll. It is
   same-origin, which is what lets applySiteGuards() neutralise navigation
   and form submission inside the frame. */
const SITE_EMBED = "/portfolio/iyn/site";
const SITE_ROOT = "https://www.iyn.com.tr";

const SHOTS = [
  { label: "Home",         path: "/en",              src: `${SITE_EMBED}/en/index.html`,              note: "“The formula for success is made for you.” Proof band, eleven exam programmes, the five-step method, and the portal shown working — one scroll." },
  { label: "Exams",        path: "/en/exams",        src: `${SITE_EMBED}/en/exams/index.html`,        note: "A-Level, AP, IB, SAT, IELTS, TMUA, ESAT, MAT, STEP, TARA, Italy — each exam its own entry point rather than one generic enquiry form." },
  { label: "Courses",      path: "/en/courses",      src: `${SITE_EMBED}/en/courses/index.html`,      note: "The deepest page on the site. Programme structure written so a parent can compare without a phone call." },
  { label: "Study Abroad", path: "/en/study-abroad", src: `${SITE_EMBED}/en/study-abroad/index.html`, note: "The consultancy line, kept distinct from exam prep — different buyer, different decision, different page." },
  { label: "Services",     path: "/en/services",     src: `${SITE_EMBED}/en/services/index.html`,     note: "The short page. What IYN does, in the order a first-time visitor needs it." },
] as const;

const PILLARS = [
  { no: "01", title: "Stratejik Bilgilendirme", body: "AP, IB and SAT explained as strategy — timelines, scoring, what actually moves an application." },
  { no: "02", title: "Ayın En Garip Bölümü",    body: "One obscure degree a month. The pillar that earns the saves and the shares." },
  { no: "03", title: "Başarı Hikayeleri",       body: "Real student journeys, published with the family's consent on the client's own channels." },
  { no: "04", title: "Akıllı Çalışma",          body: "Study method — Feynman, memory palace, Pareto. Useful before anyone has bought anything." },
] as const;

const REG = [
  { id: "R.01", name: "The Hook",                 job: "Stops the scroll and starts an argument",                  src: "/portfolio/iyn/posts/01-hook-pahali-okul.jpg",           alt: "IYN post — ochre diagonal band, “Pahalı okul = iyi okul mu?” with a hand-drawn arrow",        look: "Ochre diagonal band · cream condensed caps · hand-drawn arrow · peeling paper corner", cap: "“Pahalı okul = iyi okul mu?” — a question the audience cannot scroll past without answering." },
  { id: "R.02", name: "The Invitation",           job: "Turns a scroll into a conversation",                        src: "/portfolio/iyn/posts/02-davet-siradaki-adim.jpg",        alt: "IYN post — an illustrated night scene, hands over a map with a lit route and a compass",      look: "Illustrated night scene · ember spotlight on a mapped route · Oswald caps, white",     cap: "“Sıradaki adımını birlikte planlayalım.” The soft close — a route already drawn, someone across the table to walk it with." },
  { id: "R.03", name: "The Strange Major",        job: "The monthly deep-dive on a career nobody has heard of",     src: "/portfolio/iyn/posts/03-garip-bolum-turfgrass.jpg",      alt: "IYN post — Turfgrass Science, an illustrated figure examining stadium turf",                  look: "Illustrated editorial poster · deep blue and ember · split text-image field",          cap: "Turfgrass Science — a real degree, taught to graduate level at one American university." },
  { id: "R.04", name: "The Strange Major, again", job: "Proof the illustration system holds across subjects",        src: "/portfolio/iyn/posts/04-garip-bolum-bioinformatik.jpg",  alt: "IYN post — Bioinformatik, a figure standing in a lit threshold amid data panels",             look: "Same palette, same figure-in-a-threshold composition",                                  cap: "Bioinformatics — “the field nobody knows about that everybody will need.” Opening slide of a six-part carousel." },
  { id: "R.05", name: "The Calendar",             job: "Utility content — deadlines, camps, application windows",   src: "/portfolio/iyn/posts/05-kritik-tarihler.jpg",            alt: "IYN post — “Kritik Tarihler!” with dated deadlines beside a library photograph",              look: "White field · ochre display · diagonal photographic cut",                              cap: "Dated, specific, saveable. The post a parent screenshots." },
  { id: "R.06", name: "The Product Launch",       job: "Announcing the portal to the feed that was built to receive it", src: "/portfolio/iyn/posts/06-portal-lansman.jpg",        alt: "IYN post — “İYN Eğitim Portalı ile tanışın” with laptop, tablet and phone mockups",           look: "Electric blue · device mockups · the softest voice in the set",                        cap: "“İYN Eğitim Portalı ile tanışın.” Two years of feed-building paid off in one announcement." },
] as const;

/**
 * The embedded site is a real, running copy — so it would happily navigate or
 * submit. This is a portfolio exhibit, not the client's live funnel, so we
 * neutralise anything that leaves the page or sends data, while leaving the
 * interactions that demonstrate the build (scrolling, menus) untouched.
 * Runs on every iframe load because each tab switch remounts the frame.
 */
function applySiteGuards(e: React.SyntheticEvent<HTMLIFrameElement>) {
  const doc = e.currentTarget.contentDocument;
  if (!doc) return; // cross-origin or not ready

  doc.addEventListener(
    "click",
    (ev) => {
      const el = ev.target as HTMLElement | null;
      if (el?.closest("a[href], button[type='submit'], [role='link']")) {
        ev.preventDefault();
        ev.stopPropagation();
      }
    },
    true
  );
  doc.addEventListener("submit", (ev) => ev.preventDefault(), true);
  for (const a of Array.from(doc.querySelectorAll("a[href]"))) {
    a.removeAttribute("target");
    a.setAttribute("aria-disabled", "true");
  }
}

export function IYNPage({ client }: Props) {
  const frame = getFrameNumber(client); // "016"
  const [siteTab, setSiteTab] = useState(0);
  const shot = SHOTS[siteTab];

  const [lightbox, setLightbox] = useState<number | null>(null);
  const openLightbox = useCallback((i: number) => setLightbox(i), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const stepLightbox = useCallback(
    (delta: number) => setLightbox((i) => (i === null ? i : (i + delta + REG.length) % REG.length)),
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

      <section className="iy-portal">
        <h2 className="iy-sec"><span className="iy-sec-no">01</span><span className="iy-sec-name">The Portal</span><i></i><span className="iy-sec-meta">WEB APPLICATION</span></h2>
        <div className="iy-portal-grid">
          <div className="iy-portal-copy">
            <p className="iy-lead">Exam prep runs on a feeling — <em>am I actually getting better?</em> The portal answers it with data.</p>
            <p>Mock exams, a 70,000-question bank, section-level breakdowns and a progress curve that updates after every session. Weak topics surface on their own. Parents get the same view the student does, which removes the most tiring conversation in the business.</p>
            <p>We built it, then made the film that introduced it, then announced it through the feed we had spent two years building. Same brand voice at every step — the site, the product and the post do not sound like three different companies.</p>
          </div>
          <figure className="iy-video">
            <video className="iy-video-el" controls preload="none" poster="/portfolio/iyn/video/portal-tour-poster.jpg">
              <source src="/portfolio/iyn/video/portal-tour.mp4" type="video/mp4" />
            </video>
            <figcaption><b>Portal launch film</b> — 1:15. &ldquo;Başarının formülü sana özel.&rdquo;</figcaption>
          </figure>
        </div>
      </section>

      <section className="iy-site-sec">
        <h2 className="iy-sec"><span className="iy-sec-no">02</span><span className="iy-sec-name">The Site</span><i></i><span className="iy-sec-meta">LIVE · BILINGUAL</span></h2>
        <figure className="iy-site">
          <div className="iy-bar">
            <span className="iy-dots"><i></i><i></i><i></i></span>
            <span className="iy-url">www.iyn.com.tr{shot.path}</span>
            <span className="iy-live">● LIVE</span>
          </div>
          <nav className="iy-tabs">
            {SHOTS.map((s, i) => (
              <button type="button" key={s.path} className={i === siteTab ? "on" : ""} onClick={() => setSiteTab(i)}>{s.label}</button>
            ))}
          </nav>
          <div className="iy-window" key={siteTab}>
            <iframe
              className="iy-window-frame"
              src={shot.src}
              title={`${shot.label} page of iyn.com.tr — live embed`}
              onLoad={applySiteGuards}
              loading="lazy"
            />
            <span className="iy-hint">live page · scroll inside</span>
          </div>
          <div className="iy-foot">
            <div className="iy-nav">
              <button type="button" onClick={() => setSiteTab((i) => (i - 1 + SHOTS.length) % SHOTS.length)} aria-label="Previous page">‹</button>
              <span>{String(siteTab + 1).padStart(2, "0")} / {String(SHOTS.length).padStart(2, "0")}</span>
              <button type="button" onClick={() => setSiteTab((i) => (i + 1) % SHOTS.length)} aria-label="Next page">›</button>
            </div>
            <a className="iy-visit" href={SITE_ROOT + shot.path} target="_blank" rel="noopener noreferrer">Visit this page <span>↗</span></a>
          </div>
          <figcaption>{shot.note}</figcaption>
        </figure>
      </section>

      <section className="iy-feed">
        <h2 className="iy-sec light"><span className="iy-sec-no">03</span><span className="iy-sec-name">The Feed</span><i></i><span className="iy-sec-meta">4 PILLARS · 6 REGISTERS</span></h2>
        <div className="iy-pillars">
          {PILLARS.map((p) => (
            <article key={p.no}><span>{p.no}</span><h3>{p.title}</h3><p>{p.body}</p></article>
          ))}
        </div>
        <p className="iy-feed-note">Four subjects, but not one look. A provocation and a deadline reminder should not arrive wearing the same clothes — so the system flexes by content type and stays recognisable by palette, type and logo placement. Click any frame.</p>
        <div className="iy-sheet">
          {REG.map((r, i) => (
            <button className="iy-cell" key={r.id} onClick={() => openLightbox(i)}>
              <span className="iy-cell-id">{r.id}</span>
              <img className="iy-cell-img" src={r.src} alt={r.alt} />
              <span className="iy-cell-name">{r.name}</span>
              <span className="iy-cell-job">{r.job}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="iy-reel-sec">
        <h2 className="iy-sec"><span className="iy-sec-no">04</span><span className="iy-sec-name">The Reel</span><i></i><span className="iy-sec-meta">VIDEOGRAPHY</span></h2>
        <div className="iy-reel-grid">
          <figure className="iy-reel">
            <video className="iy-reel-el" controls preload="none" poster="/portfolio/iyn/video/imperial-reel-poster.jpg">
              <source src="/portfolio/iyn/video/imperial-reel.mp4" type="video/mp4" />
            </video>
          </figure>
          <div className="iy-reel-copy">
            <p className="iy-lead">Imperial College — 0:26, vertical, sound-off legible.</p>
            <p>Britain&rsquo;s hardest STEM admissions route, cut down to the length of a scroll. Every claim on screen is one an admissions officer would recognise, which is the only way this audience keeps watching.</p>
            <p className="iy-reel-meta">1080 × 1934 · 60 fps source · captioned throughout</p>
          </div>
        </div>
      </section>

      <footer className="iy-signoff">
        <div className="iy-sign-grid">
          <div><p className="iy-sign-label">Client</p><p className="iy-sign-name">IYN Education</p></div>
          <div><p className="iy-sign-label">Where</p><p className="iy-sign-name">İzmir, Türkiye</p></div>
          <div><p className="iy-sign-label">By</p><p className="iy-sign-name accent">FrameFlow</p></div>
        </div>
        <Link className="iy-sign-back" href="/portfolio">← Back to portfolio</Link>
      </footer>

      {lightbox !== null && (
        <div
          className="iy-modal open"
          role="dialog"
          aria-modal="true"
          aria-label={`${REG[lightbox].name} — frame ${lightbox + 1} of ${REG.length}`}
          onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
        >
          <button className="iy-modal-nav prev" onClick={() => stepLightbox(-1)} aria-label="Previous">←</button>

          <div className="iy-modal-stage">
            <div className="iy-modal-bar top">
              <span className="iy-modal-counter">★ Frame <b>{String(lightbox + 1).padStart(2, "0")}</b> / {String(REG.length).padStart(2, "0")}</span>
              <span className="iy-modal-brand">IYN · REEL {frame}</span>
              <button className="iy-modal-close" onClick={closeLightbox} aria-label="Close">×</button>
            </div>
            <div className="iy-modal-image-wrap">
              <img src={REG[lightbox].src} alt={REG[lightbox].alt} />
            </div>
            <div className="iy-modal-bar bot">
              <span className="iy-modal-slate">{REG[lightbox].name} — {REG[lightbox].look}</span>
            </div>
          </div>

          <button className="iy-modal-nav next" onClick={() => stepLightbox(1)} aria-label="Next">→</button>
          <p className="iy-modal-cap">{REG[lightbox].cap}</p>
        </div>
      )}

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
        .iy-window{position:relative;height:620px;overflow:hidden;border:1px solid var(--rule);background:#fff}
        .iy-window-frame{width:100%;height:100%;border:0;display:block;background:#fff}
        .iy-hint{position:absolute;bottom:12px;right:12px;z-index:2;background:rgba(3,73,170,.82);color:#fff;font-family:"Oswald",sans-serif;font-size:10px;font-weight:300;letter-spacing:.14em;text-transform:uppercase;padding:5px 9px;pointer-events:none}
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

        .iy-modal{position:fixed;inset:0;z-index:90;display:none;align-items:center;justify-content:center;padding:32px;background:rgba(4,40,100,.95);animation:iy-fade .22s ease-out}
        .iy-modal.open{display:flex}
        @keyframes iy-fade{from{opacity:0}to{opacity:1}}
        .iy-modal-stage{position:relative;width:min(760px,92vw);max-height:86vh;background:var(--paper);display:flex;flex-direction:column;box-shadow:0 30px 90px rgba(0,0,0,.45);animation:iy-pop .28s cubic-bezier(0.34,1.56,0.64,1)}
        @keyframes iy-pop{from{transform:scale(.96);opacity:0}to{transform:scale(1);opacity:1}}
        .iy-modal-bar{flex:0 0 auto;display:flex;align-items:center;gap:12px;padding:13px 16px;font-family:"Oswald",sans-serif;font-size:11px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--mute)}
        .iy-modal-bar.top{border-bottom:2px solid var(--amber);justify-content:space-between}
        .iy-modal-bar.bot{border-top:1px solid var(--rule);justify-content:center;text-transform:none;letter-spacing:.04em;color:var(--ink)}
        .iy-modal-counter b{color:var(--amber);font-weight:700}
        .iy-modal-brand{letter-spacing:.2em;color:var(--blue-a)}
        .iy-modal-close{width:30px;height:30px;background:var(--blue-a);color:#fff;border:0;cursor:pointer;font-family:"Oswald",sans-serif;font-size:16px;font-weight:500;line-height:1;padding:0;display:flex;align-items:center;justify-content:center;transition:background .16s}
        .iy-modal-close:hover{background:var(--amber)}
        .iy-modal-image-wrap{flex:1 1 auto;min-height:0;background:var(--light);overflow:hidden;display:flex;align-items:center;justify-content:center}
        .iy-modal-image-wrap img{max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;display:block}
        .iy-modal-nav{position:absolute;top:50%;transform:translateY(-50%);width:54px;height:54px;background:var(--paper);color:var(--blue-a);border:2px solid var(--blue-a);cursor:pointer;font-family:"Oswald",sans-serif;font-size:20px;font-weight:500;line-height:1;padding:0;display:flex;align-items:center;justify-content:center;transition:transform .16s,background .16s,color .16s;z-index:2}
        .iy-modal-nav:hover{transform:translateY(-50%) scale(1.06);background:var(--amber);color:#fff;border-color:var(--amber)}
        .iy-modal-nav.prev{left:32px}.iy-modal-nav.next{right:32px}
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
