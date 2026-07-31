"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getFrameNumber } from "@/data/clients";
import type { Client } from "@/data/clients";
import { LoadingTransition } from "@/components/portfolio/LoadingTransition";

type Props = { client: Client };

const LOCKUPS = [
  { id: "L.01", name: "Primary",    use: "Stacked. Signage, profile pictures, anything square.", src: "/portfolio/minauto/logo/lockup-primary.png",    dark: false },
  { id: "L.02", name: "Horizontal", use: "Wide lockup. Website header, email signature, banners.", src: "/portfolio/minauto/logo/lockup-horizontal.png", dark: false },
  { id: "L.03", name: "Compact",    use: "Two-line wordmark beside the mark. Tight spaces, print.", src: "/portfolio/minauto/logo/lockup-compact.png",   dark: false },
  { id: "L.04", name: "Knockout",   use: "Reversed for navy and photographic backgrounds.", src: "/portfolio/minauto/logo/lockup-knockout.png",   dark: true  },
] as const;

/* Two brand colours come from the client's own spec sheet. Surface is a neutral
   FrameFlow added for layout — labelled as such so the panel does not contradict
   the sheet, which specifies two colours. */
const SWATCHES = [
  { name: "Trust Navy",    hex: "#123645", role: "Foundation. Every frame sits on it.",       light: false },
  { name: "Safety Orange", hex: "#DC4C14", role: "The check, the tag, the price. Action only.", light: false },
  { name: "Surface",       hex: "#F4F4F4", role: "Neutral. Not a brand colour — breathing room between proof points.", light: true },
] as const;

const CARDS = {
  launch: {
    label: "Launch card",
    src: "/portfolio/minauto/card/launch-mazda-cx5.jpg",
    alt: "The launch MinAuto listing card — Mazda CX-5, orange price pill, spec strip, logo at the bottom",
    cap: "2015 Mazda CX-5 · 180,945 km · $9,950 — the first template.",
  },
  current: {
    label: "Current card",
    src: "/portfolio/minauto/card/current-ford-interceptor.jpg",
    alt: "The current MinAuto listing card — Ford Police Interceptor Utility with a struck-through old price, price-guarantee seal and Carfax badge",
    cap: "2022 Ford Police Interceptor Utility · 152,058 km · $18,950 → $17,950.",
  },
} as const;

const SETS = [
  {
    id: "C.01", kind: "Carousel", title: "What is OMVIC", meta: "3 slides",
    note: "Ontario's regulator, explained in plain English, then turned into the reason to buy here. Slide three is all orange ticks — the logo doing argument duty.",
    cover: "/portfolio/minauto/feed/omvic/01.jpg",
    slides: [
      { src: "/portfolio/minauto/feed/omvic/01.jpg", alt: "Carousel slide — “What is OMVIC.” on navy with a large orange question mark" },
      { src: "/portfolio/minauto/feed/omvic/02.jpg", alt: "Carousel slide — OMVIC defined, with a callout reading “No OMVIC = no legal protection”" },
      { src: "/portfolio/minauto/feed/omvic/03.jpg", alt: "Carousel slide — “We're OMVIC-registered.” on orange with three ticked benefits and a call to action" },
    ],
  },
  {
    id: "C.02", kind: "Carousel", title: "3 Things to Know First", meta: "5 slides",
    note: "Teach, then close. Three checks a buyer should run on any used car — and a last slide pointing out that MinAuto has already run them.",
    cover: "/portfolio/minauto/feed/checks/01.jpg",
    slides: [
      { src: "/portfolio/minauto/feed/checks/01.jpg", alt: "Carousel cover — “3 Things to Know First” in white on orange" },
      { src: "/portfolio/minauto/feed/checks/02.jpg", alt: "Carousel slide 01 — “Run the VIN. Every time.”" },
      { src: "/portfolio/minauto/feed/checks/03.jpg", alt: "Carousel slide 02 — “Ask for the service records.”" },
      { src: "/portfolio/minauto/feed/checks/04.jpg", alt: "Carousel slide 03 — “Test drive like you mean it.”" },
      { src: "/portfolio/minauto/feed/checks/05.jpg", alt: "Closing slide on navy — “Every MinAuto car is already certified.”" },
    ],
  },
  {
    id: "C.03", kind: "Carousel", title: "Coachmen Viking 17BHS", meta: "3 slides",
    note: "The template stretched to something that is not a car. Hero, then a two-column condition and specs slide built entirely from ticks, then a booking call to action.",
    cover: "/portfolio/minauto/feed/coachmen/01.jpg",
    slides: [
      { src: "/portfolio/minauto/feed/coachmen/01.jpg", alt: "Travel trailer listing hero — Coachmen Viking 17BHS, $17,950, with an “Unused 2022” corner tag" },
      { src: "/portfolio/minauto/feed/coachmen/02.jpg", alt: "Proof slide — “Never camped in. Brand-new condition.” over ticked condition and specification columns" },
      { src: "/portfolio/minauto/feed/coachmen/03.jpg", alt: "Call-to-action slide — “Yours for the summer of 2026.” with a Book a Viewing button and the lot address" },
    ],
  },
  {
    id: "V.01", kind: "Listing", title: "Kia Soul", meta: "2019 · $7,450",
    note: "Launch-era template: name and price up top, spec strip below, logo at the foot.",
    cover: "/portfolio/minauto/listings/kia-soul/01.jpg",
    slides: [
      { src: "/portfolio/minauto/listings/kia-soul/01.jpg", alt: "Kia Soul listing card — 2019, 174,803 km, $7,450" },
      { src: "/portfolio/minauto/listings/kia-soul/02.jpg", alt: "Kia Soul detail collage — exterior angles and interior close-ups" },
    ],
  },
  {
    id: "V.02", kind: "Listing", title: "Infiniti Q50", meta: "2015 · sold",
    note: "The only three-slide listing, because it earned a third state. Same card, SOLD across it.",
    cover: "/portfolio/minauto/listings/infiniti-q50/01.jpg",
    slides: [
      { src: "/portfolio/minauto/listings/infiniti-q50/01.jpg", alt: "Infiniti Q50 listing card — 2015, 124,421 km, $10,450" },
      { src: "/portfolio/minauto/listings/infiniti-q50/02.jpg", alt: "Infiniti Q50 detail collage — exterior angles and interior close-ups" },
      { src: "/portfolio/minauto/listings/infiniti-q50/03.jpg", alt: "The same Infiniti Q50 card with a diagonal orange SOLD banner across it" },
    ],
  },
  {
    id: "V.03", kind: "Listing", title: "Subaru Forester", meta: "2025 · $24,950",
    note: "Newest stock on the lot, and the top of the price range the template has to carry.",
    cover: "/portfolio/minauto/listings/subaru-forester/01.jpg",
    slides: [
      { src: "/portfolio/minauto/listings/subaru-forester/01.jpg", alt: "Subaru Forester listing card — 2025, 25,911 km, $24,950" },
      { src: "/portfolio/minauto/listings/subaru-forester/02.jpg", alt: "Subaru Forester detail collage — exterior angles and interior close-ups" },
    ],
  },
  {
    id: "V.04", kind: "Listing", title: "Toyota Corolla", meta: "2022 · $17,450",
    note: "Where the wordmark moved to the top of the frame and stayed there.",
    cover: "/portfolio/minauto/listings/toyota-corolla/01.jpg",
    slides: [
      { src: "/portfolio/minauto/listings/toyota-corolla/01.jpg", alt: "Toyota Corolla listing card — 2022, 140,049 km, $17,450" },
      { src: "/portfolio/minauto/listings/toyota-corolla/02.jpg", alt: "Toyota Corolla detail collage — exterior angles and engine bay" },
    ],
  },
  {
    id: "V.05", kind: "Listing", title: "Honda Civic", meta: "2018 · $15,950 → $14,950",
    note: "First outing for the corner ribbon and the struck-through price.",
    cover: "/portfolio/minauto/listings/honda-civic/01.jpg",
    slides: [
      { src: "/portfolio/minauto/listings/honda-civic/01.jpg", alt: "Honda Civic listing card — 2018, with a Discount corner ribbon and the old price struck through" },
      { src: "/portfolio/minauto/listings/honda-civic/02.jpg", alt: "Honda Civic detail collage — exterior angles, boot and wheels" },
    ],
  },
  {
    id: "V.06", kind: "Listing", title: "Ford Escape SE", meta: "2014 · $10,950 → $9,950",
    note: "The mature card in routine use: logo up top, price struck, seal and Carfax badge in place.",
    cover: "/portfolio/minauto/listings/ford-escape/01.jpg",
    slides: [
      { src: "/portfolio/minauto/listings/ford-escape/01.jpg", alt: "Ford Escape SE listing card — 2014, 92,366 km, price reduced to $9,950" },
      { src: "/portfolio/minauto/listings/ford-escape/02.jpg", alt: "Ford Escape detail collage — exterior angles and interior close-ups" },
    ],
  },
] as const;

export function MinAutoPage({ client }: Props) {
  const frame = getFrameNumber(client); // "018"
  const [cardView, setCardView] = useState<"launch" | "current">("current");

  const [open, setOpen] = useState<{ set: number; slide: number } | null>(null);
  const closeBox = useCallback(() => setOpen(null), []);
  const stepBox = useCallback((delta: number) => {
    setOpen((o) => {
      if (!o) return o;
      const len = SETS[o.set].slides.length;
      return { set: o.set, slide: (o.slide + delta + len) % len };
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeBox();
      else if (e.key === "ArrowLeft") stepBox(-1);
      else if (e.key === "ArrowRight") stepBox(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, closeBox, stepBox]);

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

      <section className="ma-mark">
        <h2 className="ma-sec"><span className="ma-sec-no">01</span><span className="ma-sec-name">The Mark</span><i></i><span className="ma-sec-meta">4 LOCKUPS</span></h2>
        <p className="ma-lead">A used-car buyer is not shopping — they are checking. So the logo is a check.</p>
        <p className="ma-body">The car front is drawn flat and calm; the tick sits over it in safety orange, the one colour that means <i>go</i> on a work site. It reads at signage size and it survives at favicon size, because the tick alone is already the brand. The wordmark splits the same way the business does — <b>MIN</b> in orange, the part that is theirs; <b>AUTO</b> in navy, the part that is the category.</p>

        <div className="ma-lockups">
          {LOCKUPS.map((l) => (
            <figure className={`ma-lock${l.dark ? " dark" : ""}`} key={l.id}>
              <span className="ma-lock-id">{l.id}</span>
              <div className="ma-lock-stage">
                <img className="ma-lock-img" src={l.src} alt={`MinAuto ${l.name} logo lockup`} loading="lazy" />
              </div>
              <figcaption><b>{l.name}</b><span>{l.use}</span></figcaption>
            </figure>
          ))}
        </div>

        <div className="ma-spec">
          <div className="ma-swatches">
            {SWATCHES.map((s) => (
              <div className={`ma-chip${s.light ? " light" : ""}`} style={{ background: s.hex }} key={s.name}>
                <span className="ma-chip-hex">{s.hex}</span>
                <span className="ma-chip-name">{s.name}</span>
                <span className="ma-chip-role">{s.role}</span>
              </div>
            ))}
          </div>
          <figure className="ma-specsheet">
            <img className="ma-specsheet-img" src="/portfolio/minauto/logo/spec-sheet.png" alt="MinAuto colour and type specification sheet" loading="lazy" />
            <figcaption>The sheet the client got. Two colours, one typeface — <b>Gotham Bold</b>. This page is set in Montserrat, because Gotham is not licensed for the web here.</figcaption>
          </figure>
        </div>
      </section>

      <section className="ma-card-sec">
        <h2 className="ma-sec light"><span className="ma-sec-no">02</span><span className="ma-sec-name">The Card</span><i></i><span className="ma-sec-meta">TEMPLATE SYSTEM</span></h2>
        <div className="ma-card-grid">
          <div>
            <p className="ma-lead light">The mark leaves the logo.</p>
            <p className="ma-body light">Every listing starts as a phone photo on the lot. The template does the rest: the vehicle name across the top, the price in an orange pill because the price is the action, and a spec strip along the bottom carrying model, mileage and fuel. Same moves every time — the dealership shoots a car, drops it in, and the post is on brand before anyone has thought about design.</p>
            <p className="ma-body light">Then it got sharper in use. The current card moves the logo up out of the photograph, strikes the old price through instead of quietly replacing it, and adds two pieces of proof the first version did not have: a price-guarantee seal and a Carfax badge. Same skeleton, more evidence.</p>
            <p className="ma-note">Tap the tabs. Launch card ⇄ current card.</p>
          </div>
          <figure className="ma-card">
            <div className="ma-card-toggle">
              <button type="button" className={cardView === "launch" ? "on" : ""} onClick={() => setCardView("launch")} aria-pressed={cardView === "launch"}>{CARDS.launch.label}</button>
              <button type="button" className={cardView === "current" ? "on" : ""} onClick={() => setCardView("current")} aria-pressed={cardView === "current"}>{CARDS.current.label}</button>
            </div>
            <img className="ma-card-img" src={CARDS[cardView].src} alt={CARDS[cardView].alt} />
            <figcaption>{CARDS[cardView].cap}</figcaption>
          </figure>
        </div>

        <figure className="ma-bizcard">
          <img className="ma-bizcard-img" src="/portfolio/minauto/card/business-card.jpg" alt="MinAuto business card — horizontal lockup, owner contact details, and an oversized orange checkmark bleeding off the right edge" loading="lazy" />
          <figcaption>And then it stops being a logo element altogether. On the card the tick is the artwork — full height, bleeding off the right edge, with the contact details set quietly beside it. The same shape is the ✓ bullet on every proof point in the carousels below.</figcaption>
        </figure>
      </section>

      <section className="ma-feed">
        <h2 className="ma-sec"><span className="ma-sec-no">03</span><span className="ma-sec-name">The Feed</span><i></i><span className="ma-sec-meta">9 SETS · 24 SLIDES</span></h2>
        <p className="ma-lead">Three carousels that argue, six listings that sell.</p>
        <p className="ma-body">The carousels do the work a listing cannot: explain what OMVIC registration actually buys you, hand over the three checks any buyer should run, and stretch the template to a travel trailer. Every proof point in them is set with the same tick that makes the logo.</p>
        <div className="ma-feed-grid">
          {SETS.map((s, i) => (
            <button type="button" className="ma-set" key={s.id} onClick={() => setOpen({ set: i, slide: 0 })}>
              <span className="ma-set-shot">
                <img src={s.cover} alt={s.slides[0].alt} loading="lazy" />
                <span className="ma-set-count">{s.slides.length}</span>
              </span>
              <span className="ma-set-meta">
                <span className="ma-set-kind">{s.id} · {s.kind}</span>
                <span className="ma-set-title">{s.title}</span>
                <span className="ma-set-sub">{s.meta}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      {open && (
        <div
          className="ma-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${SETS[open.set].title} — slide ${open.slide + 1} of ${SETS[open.set].slides.length}`}
          onClick={(e) => { if (e.target === e.currentTarget) closeBox(); }}
        >
          <button type="button" className="ma-modal-nav prev" onClick={() => stepBox(-1)} aria-label="Previous slide">←</button>

          <div className="ma-modal-stage">
            <div className="ma-modal-bar top">
              <span className="ma-modal-id">{SETS[open.set].id} · {SETS[open.set].kind}</span>
              <span className="ma-modal-title">{SETS[open.set].title}</span>
              <span className="ma-modal-count">{String(open.slide + 1).padStart(2, "0")} / {String(SETS[open.set].slides.length).padStart(2, "0")}</span>
              <button type="button" className="ma-modal-close" onClick={closeBox} aria-label="Close">×</button>
            </div>
            <div className="ma-modal-shot">
              <img src={SETS[open.set].slides[open.slide].src} alt={SETS[open.set].slides[open.slide].alt} />
            </div>
          </div>

          <button type="button" className="ma-modal-nav next" onClick={() => stepBox(1)} aria-label="Next slide">→</button>
          <p className="ma-modal-note">{SETS[open.set].note}</p>
        </div>
      )}

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

        .ma-bizcard{max-width:1160px;margin:56px auto 0}
        .ma-bizcard-img{width:100%;height:auto;display:block;border:1px solid rgba(255,255,255,.14)}
        .ma-bizcard figcaption{max-width:64ch;margin-top:16px;font-size:15px;line-height:1.7;color:rgba(255,255,255,.76);border-left:3px solid var(--orange);padding-left:14px}

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

        .ma-feed{padding:82px 22px;background:var(--surface)}
        .ma-feed-grid{max-width:1160px;margin:40px auto 0;display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
        .ma-set{display:block;width:100%;text-align:left;padding:0;background:var(--paper);border:1px solid var(--rule);cursor:pointer;font:inherit;color:inherit;transition:transform .16s,border-color .16s}
        .ma-set:hover{transform:translateY(-3px);border-color:var(--navy)}
        .ma-set-shot{position:relative;display:block}
        .ma-set-shot img{width:100%;height:auto;display:block;aspect-ratio:1080/1350;object-fit:cover}
        .ma-set-count{position:absolute;top:10px;right:10px;min-width:26px;height:26px;padding:0 7px;background:var(--orange);color:#fff;display:flex;align-items:center;justify-content:center;font-family:"Barlow Condensed",sans-serif;font-size:13px;font-weight:700;letter-spacing:.06em}
        .ma-set-meta{display:block;padding:14px 16px 16px}
        .ma-set-kind{display:block;font-family:"Barlow Condensed",sans-serif;font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--orange)}
        .ma-set-title{display:block;font-family:"Montserrat",sans-serif;font-weight:700;font-size:16px;color:var(--navy);margin-top:5px}
        .ma-set-sub{display:block;font-size:13px;color:var(--mute);margin-top:3px}

        .ma-modal{position:fixed;inset:0;z-index:90;display:flex;align-items:center;justify-content:center;padding:32px;background:rgba(9,27,35,.95);animation:ma-fade .22s ease-out}
        @keyframes ma-fade{from{opacity:0}to{opacity:1}}
        .ma-modal-stage{position:relative;width:min(660px,92vw);height:min(86vh,920px);max-height:86vh;background:var(--paper);display:flex;flex-direction:column;box-shadow:0 30px 90px rgba(0,0,0,.55);animation:ma-pop .28s cubic-bezier(0.34,1.56,0.64,1)}
        @keyframes ma-pop{from{transform:scale(.96);opacity:0}to{transform:scale(1);opacity:1}}
        .ma-modal-bar{flex:0 0 auto;display:flex;align-items:center;gap:12px;padding:12px 14px;border-bottom:3px solid var(--orange);font-family:"Barlow Condensed",sans-serif;font-size:12px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--mute)}
        .ma-modal-id{color:var(--orange);font-weight:700}
        .ma-modal-title{color:var(--navy);font-weight:700}
        .ma-modal-count{margin-left:auto;font-variant-numeric:tabular-nums;color:var(--navy)}
        .ma-modal-close{width:28px;height:28px;background:var(--navy);color:#fff;border:0;cursor:pointer;font-size:16px;font-weight:700;line-height:1;padding:0;display:flex;align-items:center;justify-content:center;transition:background .16s}
        .ma-modal-close:hover{background:var(--orange)}
        .ma-modal-shot{flex:1 1 auto;min-height:0;background:var(--surface);overflow:hidden;display:flex;align-items:center;justify-content:center}
        .ma-modal-shot img{width:100%;height:100%;object-fit:contain;display:block}
        .ma-modal-nav{position:absolute;top:50%;transform:translateY(-50%);width:52px;height:52px;background:var(--paper);color:var(--navy);border:2px solid var(--navy);cursor:pointer;font-size:19px;font-weight:700;line-height:1;padding:0;display:flex;align-items:center;justify-content:center;transition:transform .16s,background .16s,color .16s,border-color .16s;z-index:2}
        .ma-modal-nav:hover{transform:translateY(-50%) scale(1.06);background:var(--orange);color:#fff;border-color:var(--orange)}
        .ma-modal-nav.prev{left:30px}.ma-modal-nav.next{right:30px}
        .ma-modal-note{position:absolute;left:50%;transform:translateX(-50%);bottom:22px;max-width:min(660px,92vw);margin:0;text-align:center;font-size:13.5px;line-height:1.6;color:rgba(255,255,255,.8)}

        @media(max-width:980px){
          .ma-hero-inner{grid-template-columns:1fr;gap:38px}
          .ma-hero-mark{justify-content:flex-start}
          .ma-hero-logo{max-width:220px}
          .ma-lockups{grid-template-columns:repeat(2,1fr)}
          .ma-spec{grid-template-columns:1fr}
          .ma-card-grid{grid-template-columns:1fr;gap:34px;max-width:460px}
          .ma-zero-grid{grid-template-columns:repeat(2,1fr)}
          .ma-rail-mid{display:none}
          .ma-feed-grid{grid-template-columns:repeat(2,1fr)}
        }
        @media(max-width:560px){
          .ma-lockups,.ma-zero-grid{grid-template-columns:1fr}
          .ma-sign-grid{grid-template-columns:1fr;gap:16px}
          .ma-rail-end{display:none}
          .ma-feed-grid{grid-template-columns:1fr}
          .ma-modal{padding:12px}
          .ma-modal-stage{width:calc(100% - 84px);height:min(76vh,700px)}
          .ma-modal-nav{width:34px;height:34px;font-size:15px}
          .ma-modal-nav.prev{left:6px}.ma-modal-nav.next{right:6px}
          .ma-modal-note{bottom:8px;left:12px;right:12px;transform:none;max-width:none;font-size:12px}
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
