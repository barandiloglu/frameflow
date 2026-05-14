"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getFrameNumber } from "@/data/clients";
import type { Client } from "@/data/clients";
import { LoadingTransition } from "@/components/portfolio/LoadingTransition";

type Props = { client: Client };

export function DestanPage({ client }: Props) {
  const goldLogo  = client.logos?.find((l) => l.background === "dark") ?? client.logos?.[1];
  const burgLogo  = client.logos?.find((l) => l.background === "light") ?? client.logos?.[0];
  const photos    = client.photos ?? [];

  const frameNumber = getFrameNumber(client);

  /* PHOTO LIGHTBOX -------------------------------------------------- */
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const isOpen = modalIndex !== null;
  const activePhoto = isOpen ? photos[modalIndex] : null;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalIndex(null);
      else if (e.key === "ArrowLeft") {
        setModalIndex((i) =>
          i === null ? null : (i - 1 + photos.length) % photos.length
        );
      } else if (e.key === "ArrowRight") {
        setModalIndex((i) =>
          i === null ? null : (i + 1) % photos.length
        );
      }
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, photos.length]);

  return (
    <>
      <LoadingTransition
        frameNumber={frameNumber}
        clientName={client.name}
        scope={client.services}
        location={client.location}
        year={client.year}
      />

      {/* Google Fonts (React 19 hoists <link> to <head>) */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=DM+Serif+Display:ital@0;1&family=Italianno&family=Caveat:wght@400;500;600;700&family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap"
      />

      {/* Reusable ornaments (echo of the Destan logo flourish) */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <symbol id="dt-corner" viewBox="0 0 24 24">
            <path
              d="M2 2 L22 2 M2 2 L2 22 M2 2 L10 10 M22 2 L14 10 M2 22 L10 14"
              stroke="currentColor"
              strokeWidth="0.8"
              fill="none"
            />
            <circle cx="6" cy="6" r="1.5" fill="currentColor" />
          </symbol>
          <symbol id="dt-flame" viewBox="0 0 64 80">
            <path
              d="M32 4 C24 16 22 28 32 36 C26 28 22 16 14 28 C10 38 18 48 24 50 C16 50 12 58 18 66 C24 72 32 70 38 64 C42 60 44 54 40 48 C46 50 52 46 50 38 C48 30 42 26 36 30 C42 22 44 14 32 4 Z"
              fill="currentColor"
            />
            <path
              d="M28 30 Q32 22 36 30 Q34 38 32 42 Q30 38 28 30 Z"
              fill="#73191c"
              opacity="0.5"
            />
          </symbol>
        </defs>
      </svg>

      <div className="dt-page">
        {/* TOP RAIL ---------------------------------------------- */}
        <header className="dt-top">
          <Link href="/portfolio" className="dt-top-back">
            ← Portfolio
          </Link>
          <span className="dt-top-frame">★ #{frameNumber} ★</span>
          <span className="dt-top-meta">Destan · Toronto · 2026</span>
        </header>

        {/* HERO ---------------------------------------------- */}
        <section className="dt-hero">
          <p className="dt-hero-eyebrow">
            Reel · {frameNumber} · Toronto · MMXXVI
          </p>
          <svg className="dt-hero-flame" viewBox="0 0 64 80" aria-hidden="true">
            <use href="#dt-flame" />
          </svg>
          <h1 className="dt-hero-title">DESTAN</h1>
          <p className="dt-hero-wordmark">Turkish Cuisine</p>
          <p className="dt-hero-script">Loaded by fire.</p>
          <div className="dt-hero-rule-row">
            <span className="l" /><span className="star">✦</span><span className="r" />
          </div>
          <p className="dt-hero-sub">
            A wood-fired kebab house in Toronto. A saga of fire, salt &amp; bread —
            bound at FrameFlow Studio.
          </p>

          <div className="dt-hero-meta">
            <div><b>15</b><span>Plates</span></div>
            <div><b>06</b><span>Films</span></div>
            <div><b>04</b><span>Shoots</span></div>
            <div><b>04</b><span>Services</span></div>
          </div>
        </section>

        {/* MARQUEE — bilingual menu items */}
        <div className="dt-marquee" aria-hidden="true">
          <div className="dt-marquee-track">
            <span>Adana · Cağ Kebabı · Şiş Tavuk · Lahmacun · Pide · Ezme · Künefe · Çay</span>
            <span>Bread · Salt · Fire · Smoke · Patience · Salt · Bread · Fire</span>
            <span>Adana · Cağ Kebabı · Şiş Tavuk · Lahmacun · Pide · Ezme · Künefe · Çay</span>
            <span>Bread · Salt · Fire · Smoke · Patience · Salt · Bread · Fire</span>
            <span>Adana · Cağ Kebabı · Şiş Tavuk · Lahmacun · Pide · Ezme · Künefe · Çay</span>
            <span>Bread · Salt · Fire · Smoke · Patience · Salt · Bread · Fire</span>
          </div>
        </div>

        {/* INTRO ---------------------------------------------- */}
        <section className="dt-intro">
          <p className="dt-intro-cap">An introduction · giriş</p>
          <h2>
            What we built for <em>Destan Turkish Cuisine.</em>
          </h2>
          <p>
            Destan — Turkish for <span className="dt-turk">epic poem</span> — is a
            kebab house in Toronto with a wood-fired temperament. We were brought
            on for the long story: a season of photography, a season of short films
            for social, paid placements that earn their keep, and the slow craft
            of building an audience that comes hungry.
          </p>
          <div className="dt-bi-row">
            <div className="dt-bi"><span className="turk">Fotoğraf</span><span className="eng">Photography</span></div>
            <div className="dt-bi"><span className="turk">Video</span><span className="eng">Videography</span></div>
            <div className="dt-bi"><span className="turk">Sosyal</span><span className="eng">Social</span></div>
            <div className="dt-bi"><span className="turk">Reklam</span><span className="eng">Ad Mgmt.</span></div>
          </div>
        </section>

        {/* DIVIDER */}
        <div className="dt-gold-rule" />
        <div className="dt-tile-band" />
        <div className="dt-gold-rule" />

        {/* LANTERN GALLERY ----------------------------------- */}
        <section className="dt-lanterns">
          <div className="dt-lanterns-head">
            <div>
              <h3>
                Plates from <em>the line.</em>
              </h3>
              <p className="dt-lanterns-turk">Ateşten on beş kare</p>
            </div>
            <p className="dt-lanterns-sub">
              {photos.length} frames · 04 shoots · 2026
            </p>
          </div>
          <div className="dt-lantern-grid">
            {photos.map((p, i) => (
              <figure
                key={p.src}
                className="dt-lantern"
                role="button"
                tabIndex={0}
                aria-label={`Open photo: ${p.alt}`}
                onClick={() => setModalIndex(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setModalIndex(i);
                  }
                }}
              >
                <div className={`dt-lantern-frame${p.orientation === "landscape" ? " dt-lantern-frame--land" : ""}`}>
                  <span className="dt-lantern-corner tl"><svg viewBox="0 0 24 24"><use href="#dt-corner" /></svg></span>
                  <span className="dt-lantern-corner tr"><svg viewBox="0 0 24 24"><use href="#dt-corner" /></svg></span>
                  <span className="dt-lantern-corner bl"><svg viewBox="0 0 24 24"><use href="#dt-corner" /></svg></span>
                  <span className="dt-lantern-corner br"><svg viewBox="0 0 24 24"><use href="#dt-corner" /></svg></span>
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 880px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="dt-lantern-meta">
                  <span className="num">PLATE&nbsp;{romanNumeral(i + 1)}</span>
                  <span className="date">2026</span>
                </div>
                <p className="dt-lantern-cap">
                  {p.slate}
                </p>
                <span className="dt-lantern-zoom" aria-hidden>
                  ↗
                </span>
              </figure>
            ))}
          </div>
        </section>

        {/* DIVIDER */}
        <div className="dt-gold-rule" />
        <div className="dt-tile-band" />
        <div className="dt-gold-rule" />

        {/* FEATURE — full-bleed photo + burgundy block */}
        <section className="dt-feature">
          <div className="dt-feature-photo">
            <Image
              src="/portfolio/destan-turkish-cuisine/photos/15-table-spread.jpg"
              alt="A spread of mezze, lavash and adana on the wooden table"
              fill
              sizes="(max-width: 880px) 100vw, 60vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="dt-feature-text">
            <p className="dt-feature-eye">A spread · sofra</p>
            <h3>
              The grammar of <em>Anatolia.</em>
            </h3>
            <p>
              A table set in Toronto — adana in two long lines of <strong>köfte</strong>,
              ezme in a copper bowl, lavash folded twice. The plate, like the saga,
              is composed of pieces that only become themselves
              <strong> in one another’s company</strong>.
            </p>
            <div className="dt-feature-stats">
              <div className="stat"><b>04</b><span>Shoots</span></div>
              <div className="stat"><b>{photos.length}</b><span>Plates</span></div>
              <div className="stat"><b>412</b><span>Frames</span></div>
            </div>
          </div>
        </section>

        {/* MENU POSTER ---------------------------------------------- */}
        <section className="dt-menu">
          <div className="dt-menu-head">
            <h3>The Menu, in part.</h3>
            <p className="dt-menu-sub">Yemek listesi.</p>
          </div>
          <div className="dt-menu-list">
            <MenuItem n="I."   name="Cağ Kebabı"  sub="the rotating roast"
              desc="Lamb marinated three days in onion & salt. Bound horizontally, turned slowly above oak embers." />
            <MenuItem n="II."  name="Adana"       sub="hand-minced kebab"
              desc="Lamb minced by hand with red pepper & salt. Two long lines on lavash, with sumac onion." />
            <MenuItem n="III." name="Şiş Tavuk"   sub="chicken skewers"
              desc="Marinated in yogurt, cumin, lemon — kept low over coals until the colour comes up to gold." />
            <MenuItem n="IV."  name="Ezme"        sub="hand-cut salsa"
              desc="Tomato, hot pepper, onion, parsley. Cut with a knife, never blended." />
            <MenuItem n="V."   name="Lavaş"       sub="flatbread"
              desc="Pulled from the oven hot enough to fold once and serve." />
            <MenuItem n="VI."  name="Künefe"      sub="cheese pastry"
              desc="Shredded kataifi, melted cheese, syrup, crushed pistachio. Hot." />
          </div>
        </section>

        {/* FILMS ----------------------------------------------------- */}
        <section className="dt-films">
          <div className="dt-films-inner">
            <div className="dt-films-head">
              <p className="cap">A reel of films · filmler</p>
              <h3>
                Six trailers, <em>cut for the feed.</em>
              </h3>
            </div>
            <div className="dt-films-grid">
              <Trailer n="01" title="The Rotation, slow"  meta="0:18 · 9:16 · Reels"          poster="/portfolio/destan-turkish-cuisine/photos/03-cag-kebabi-fire-rolling.jpg" />
              <Trailer n="02" title="The Cut"             meta="0:09 · 9:16 · Reels · TT"     poster="/portfolio/destan-turkish-cuisine/photos/05-carving-cag.jpg" />
              <Trailer n="03" title="Şiş Tavuk on coals"  meta="0:15 · 9:16 · Reels"          poster="/portfolio/destan-turkish-cuisine/photos/10-chicken-skewers-coals.jpg" />
              <Trailer n="04" title="A table, set"        meta="0:22 · 1:1 · Feed · Ads"      poster="/portfolio/destan-turkish-cuisine/photos/15-table-spread.jpg" />
              <Trailer n="05" title="Fish on flame"       meta="0:11 · 9:16 · Reels"          poster="/portfolio/destan-turkish-cuisine/photos/11-fish-on-flame.jpg" />
              <Trailer n="06" title="Adana, end to end"   meta="0:14 · 9:16 · Reels · Ads"    poster="/portfolio/destan-turkish-cuisine/photos/14-adana-lavash.jpg" />
            </div>
          </div>
        </section>

        {/* MARKS — palette + type ----------------------------------- */}
        <section className="dt-marks">
          <div>
            <h4 className="dt-marks-head">Marks &amp; Palette · renkler</h4>
            <div className="dt-palette">
              <PaletteChip turk="Ateş"     eng="Burgundy" hex="#73191C" cls="burgundy" />
              <PaletteChip turk="Altın"    eng="Saffron"  hex="#E9B44A" cls="gold" />
              <PaletteChip turk="Fildişi"  eng="Cream"    hex="#FBF1D6" cls="cream" />
              <PaletteChip turk="Mürekkep" eng="Ink"      hex="#1A0A08" cls="ink" />
            </div>
          </div>

          <div>
            <h4 className="dt-marks-head">Typeset · yazı</h4>
            <div className="dt-type-stack">
              <div className="dt-type-card">
                <p className="label">Display · Cinzel</p>
                <p className="specimen-display">DESTAN · TURKISH CUISINE</p>
              </div>
              <div className="dt-type-card">
                <p className="label">Serif · DM Serif Display</p>
                <p className="specimen-serif">A short film about a kebab house, told in fire and bread.</p>
              </div>
              <div className="dt-type-card">
                <p className="label">Script · Italianno</p>
                <p className="specimen-script">Loaded by fire.</p>
              </div>
              <div className="dt-type-card">
                <p className="label">Hand · Caveat</p>
                <p className="specimen-hand">ateş · ekmek · tuz</p>
              </div>
              <div className="dt-type-card">
                <p className="label">UI · JetBrains Mono</p>
                <p className="specimen-mono">Reel · {frameNumber} · Toronto · MMXXVI</p>
              </div>
            </div>
          </div>
        </section>

        {/* LOGO LINEUP — three colorways */}
        <section className="dt-logos">
          <p className="dt-logos-cap">Three colorways · üç renk</p>
          <div className="dt-logos-row">
            <div className="dt-logo-card dt-logo-card--cream">
              {burgLogo && (
                <div className="dt-logo-frame">
                  <Image src={burgLogo.src} alt={burgLogo.alt} fill sizes="(max-width: 880px) 80vw, 320px" style={{ objectFit: "contain" }} />
                </div>
              )}
              <p className="dt-logo-label">Primary · on cream</p>
            </div>
            <div className="dt-logo-card dt-logo-card--burgundy">
              {goldLogo && (
                <div className="dt-logo-frame">
                  <Image src={goldLogo.src} alt={goldLogo.alt} fill sizes="(max-width: 880px) 80vw, 320px" style={{ objectFit: "contain" }} />
                </div>
              )}
              <p className="dt-logo-label">Knockout · on burgundy</p>
            </div>
            <div className="dt-logo-card dt-logo-card--ink">
              {goldLogo && (
                <div className="dt-logo-frame">
                  <Image src={goldLogo.src} alt={goldLogo.alt} fill sizes="(max-width: 880px) 80vw, 320px" style={{ objectFit: "contain" }} />
                </div>
              )}
              <p className="dt-logo-label">Reverse · on ink</p>
            </div>
          </div>
        </section>

        {/* END BLOCK ------------------------------------------------ */}
        <section className="dt-end">
          <svg className="dt-end-flame" viewBox="0 0 64 80" aria-hidden="true"><use href="#dt-flame" /></svg>
          <h3>
            Set the next plate. <em>Ateşi yak.</em>
          </h3>
          <p>
            If your room can hold a fire, we can help your story stand up to it.
            Brand, photography, films, and the small bright work of advertising.
          </p>
          <Link href="/contact" className="dt-end-cta">
            Start a project →
          </Link>
        </section>

        {/* BOTTOM MARQUEE */}
        <div className="dt-marquee" aria-hidden="true">
          <div className="dt-marquee-track">
            <span>FrameFlow · Reel {frameNumber} · Destan Turkish Cuisine · Toronto · MMXXVI</span>
            <span>★ Loaded by fire ★</span>
            <span>FrameFlow · Reel {frameNumber} · Destan Turkish Cuisine · Toronto · MMXXVI</span>
            <span>★ Loaded by fire ★</span>
            <span>FrameFlow · Reel {frameNumber} · Destan Turkish Cuisine · Toronto · MMXXVI</span>
            <span>★ Loaded by fire ★</span>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="dt-foot">
          <Link href="/" className="dt-foot-link">
            Designed by <strong>FrameFlow</strong> · Toronto · 2026
          </Link>
        </footer>

        {/* PHOTO LIGHTBOX ------------------------------------------- */}
        {isOpen && activePhoto && (
          <div
            className="dt-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${activePhoto.slate} — frame ${modalIndex + 1} of ${photos.length}`}
            onClick={() => setModalIndex(null)}
          >
            <button
              type="button"
              className="dt-modal-nav dt-modal-nav--prev"
              aria-label="Previous photo"
              onClick={(e) => {
                e.stopPropagation();
                setModalIndex((i) =>
                  i === null ? null : (i - 1 + photos.length) % photos.length
                );
              }}
            >
              ←
            </button>

            <div
              className="dt-modal-stage"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="dt-modal-bar dt-modal-bar--top">
                <span className="dt-modal-counter">
                  ★ FRAME {String(modalIndex + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
                </span>
                <span className="dt-modal-brand">DESTAN · DAILIES</span>
                <button
                  type="button"
                  className="dt-modal-close"
                  aria-label="Close"
                  onClick={() => setModalIndex(null)}
                >
                  ×
                </button>
              </div>

              <div className="dt-modal-image-wrap">
                <Image
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  fill
                  sizes="(max-width: 880px) 92vw, 720px"
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>

              <div className="dt-modal-bar dt-modal-bar--bot">
                <span className="dt-modal-slate">{activePhoto.slate}</span>
              </div>
            </div>

            <button
              type="button"
              className="dt-modal-nav dt-modal-nav--next"
              aria-label="Next photo"
              onClick={(e) => {
                e.stopPropagation();
                setModalIndex((i) =>
                  i === null ? null : (i + 1) % photos.length
                );
              }}
            >
              →
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        :global(body:has(.dt-page)) {
          background: #fbf1d6;
        }
        .dt-page {
          --burgundy:   #73191c;
          --burgundy-d: #4f0d10;
          --burgundy-e: #2a0608;
          --gold:       #e9b44a;
          --gold-deep:  #c08e2a;
          --cream:      #fbf1d6;
          --cream-d:    #f3e3b6;
          --ink:        #1a0a08;

          --display: "Cinzel", "Trajan Pro", serif;
          --serif:   "DM Serif Display", "Marcellus", serif;
          --hand:    "Caveat", cursive;
          --script:  "Italianno", cursive;
          --body:    "Inter", system-ui, sans-serif;
          --mono:    "JetBrains Mono", ui-monospace, monospace;

          background: var(--cream);
          color: var(--ink);
          font-family: var(--body);
          font-weight: 400;
          font-size: 17px;
          line-height: 1.65;
          overflow-x: hidden;
          position: relative;
        }
        .dt-page :global(a) { color: inherit; text-decoration: none; }

        /* paper grain over the page */
        .dt-page::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 90;
          opacity: 0.5;
          mix-blend-mode: multiply;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.5  0 0 0 0 0.32  0 0 0 0 0.18  0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E");
        }

        /* TOP RAIL ---------------------------------------------- */
        .dt-top {
          position: relative;
          z-index: 5;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 32px;
          background: var(--cream);
          border-bottom: 1px solid var(--gold-deep);
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--burgundy);
          gap: 16px;
        }
        .dt-top-back { font-weight: 600; white-space: nowrap; }
        .dt-top-back:hover { color: var(--gold-deep); }
        .dt-top-frame {
          background: var(--burgundy);
          color: var(--gold);
          padding: 4px 10px;
          letter-spacing: 0.2em;
          white-space: nowrap;
        }
        .dt-top-meta {
          opacity: 0.75;
          letter-spacing: 0.32em;
          color: var(--gold-deep);
          white-space: nowrap;
        }
        @media (max-width: 640px) {
          .dt-top {
            padding: 12px 16px;
            gap: 12px;
            font-size: 9px;
          }
          .dt-top-meta { display: none; }
          .dt-top-frame { padding: 3px 8px; letter-spacing: 0.16em; }
        }

        /* HERO ---------------------------------------------- */
        .dt-hero {
          position: relative;
          background:
            radial-gradient(circle at 50% 30%, rgba(233, 180, 74, 0.18), transparent 50%),
            var(--burgundy);
          color: var(--cream);
          padding: 100px 32px 80px;
          text-align: center;
          overflow: hidden;
        }
        .dt-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M40 4 L48 24 L72 28 L52 44 L60 68 L40 56 L20 68 L28 44 L8 28 L32 24 Z' fill='none' stroke='%23e9b44a' stroke-width='0.7' opacity='0.1'/%3E%3C/svg%3E");
          background-size: 80px 80px;
          pointer-events: none;
        }
        .dt-hero-eyebrow {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 18px;
          position: relative;
          z-index: 1;
        }
        .dt-hero-flame {
          width: 82px;
          height: auto;
          color: var(--gold);
          margin: 0 auto 24px;
          display: block;
          position: relative;
          z-index: 1;
        }
        .dt-hero-title {
          font-family: var(--display);
          font-weight: 600;
          font-size: clamp(80px, 16vw, 240px);
          letter-spacing: 0.16em;
          line-height: 0.95;
          color: var(--cream);
          text-shadow:
            0 0 1px var(--gold),
            2px 2px 0 var(--burgundy-d);
          margin-bottom: 4px;
          position: relative;
          z-index: 1;
        }
        .dt-hero-wordmark {
          font-family: var(--display);
          font-weight: 500;
          font-size: clamp(14px, 2.2vw, 22px);
          letter-spacing: 0.6em;
          color: var(--gold);
          margin-bottom: 14px;
          padding-left: 0.6em;
          position: relative;
          z-index: 1;
        }
        .dt-hero-script {
          font-family: var(--script);
          font-size: clamp(36px, 6vw, 72px);
          color: var(--gold);
          line-height: 1;
          margin: 6px 0 18px;
          letter-spacing: 0.02em;
          position: relative;
          z-index: 1;
        }
        .dt-hero-rule-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          margin: 12px auto 26px;
          max-width: 720px;
          position: relative;
          z-index: 1;
        }
        .dt-hero-rule-row .l, .dt-hero-rule-row .r {
          flex: 1;
          height: 1px;
          background: var(--gold);
          opacity: 0.6;
        }
        .dt-hero-rule-row .star { color: var(--gold); font-size: 14px; }
        .dt-hero-sub {
          font-family: var(--serif);
          font-size: clamp(20px, 2.4vw, 30px);
          font-style: italic;
          color: var(--cream);
          max-width: 32ch;
          margin: 0 auto;
          line-height: 1.4;
          position: relative;
          z-index: 1;
        }
        .dt-hero-meta {
          margin-top: 56px;
          display: flex;
          gap: 36px;
          justify-content: center;
          flex-wrap: wrap;
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--gold);
          position: relative;
          z-index: 1;
        }
        .dt-hero-meta b {
          color: var(--cream);
          font-weight: 500;
          display: block;
          font-size: 16px;
          letter-spacing: 0.18em;
          margin-bottom: 4px;
          font-family: var(--display);
        }

        /* MARQUEE --------------------------------------------- */
        .dt-marquee {
          position: relative;
          overflow: hidden;
          background: var(--gold);
          color: var(--burgundy);
          padding: 18px 0;
          border-top: 4px double var(--burgundy);
          border-bottom: 4px double var(--burgundy);
        }
        .dt-marquee-track {
          display: flex;
          gap: 56px;
          white-space: nowrap;
          animation: dt-marquee 60s linear infinite;
          font-family: var(--display);
          font-weight: 700;
          font-size: 22px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .dt-marquee-track span {
          display: inline-flex;
          align-items: center;
          gap: 56px;
        }
        .dt-marquee-track span::after {
          content: "✦";
          color: var(--burgundy-d);
          font-size: 14px;
        }
        @keyframes dt-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }

        /* INTRO --------------------------------------------- */
        .dt-intro {
          padding: 120px 32px 80px;
          text-align: center;
          max-width: 960px;
          margin: 0 auto;
        }
        .dt-intro-cap {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.5em;
          color: var(--gold-deep);
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .dt-intro h2 {
          font-family: var(--serif);
          font-weight: 400;
          font-size: clamp(40px, 5.5vw, 72px);
          color: var(--burgundy);
          line-height: 1.05;
          letter-spacing: 0.01em;
          margin-bottom: 24px;
        }
        .dt-intro h2 em {
          font-family: var(--script);
          font-size: 1.6em;
          color: var(--gold-deep);
          font-style: normal;
          letter-spacing: 0;
        }
        .dt-intro p {
          font-family: var(--body);
          font-size: 19px;
          line-height: 1.7;
          color: var(--ink);
          max-width: 60ch;
          margin: 0 auto 1em;
        }
        .dt-turk {
          font-family: var(--hand);
          font-size: 1.4em;
          color: var(--burgundy);
          letter-spacing: 0;
        }
        .dt-bi-row {
          display: flex;
          justify-content: center;
          gap: 28px;
          flex-wrap: wrap;
          margin-top: 56px;
        }
        .dt-bi {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 16px 26px;
          border: 1px solid var(--gold-deep);
          background: rgba(233, 180, 74, 0.12);
        }
        .dt-bi .turk {
          font-family: var(--hand);
          font-size: 30px;
          color: var(--burgundy);
          line-height: 1;
        }
        .dt-bi .eng {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--gold-deep);
        }

        /* DIVIDERS --------------------------------------------- */
        .dt-gold-rule {
          height: 4px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            var(--gold-deep) 10%,
            var(--gold) 50%,
            var(--gold-deep) 90%,
            transparent 100%
          );
        }
        .dt-tile-band {
          height: 28px;
          background:
            repeating-linear-gradient(90deg,
              var(--burgundy) 0,
              var(--burgundy) 28px,
              var(--gold) 28px,
              var(--gold) 30px,
              var(--burgundy) 30px,
              var(--burgundy) 56px),
            var(--burgundy);
          position: relative;
          overflow: hidden;
        }
        .dt-tile-band::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28'%3E%3Cpath d='M14 4 L18 10 L24 14 L18 18 L14 24 L10 18 L4 14 L10 10 Z' fill='%23e9b44a' opacity='0.95'/%3E%3Ccircle cx='14' cy='14' r='1.5' fill='%23731919'/%3E%3C/svg%3E");
          background-size: 28px 28px;
          background-repeat: repeat-x;
          background-position: center center;
        }

        /* LANTERN GALLERY ---------------------------------------- */
        .dt-lanterns {
          padding: 80px 32px 140px;
          max-width: 1280px;
          margin: 0 auto;
        }
        .dt-lanterns-head {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 24px;
          margin-bottom: 56px;
          flex-wrap: wrap;
        }
        .dt-lanterns-head h3 {
          font-family: var(--serif);
          font-weight: 400;
          font-size: clamp(36px, 4.4vw, 56px);
          color: var(--burgundy);
          line-height: 1.05;
        }
        .dt-lanterns-head h3 em {
          font-family: var(--script);
          font-size: 1.5em;
          color: var(--gold-deep);
          font-style: normal;
        }
        .dt-lanterns-turk {
          font-family: var(--hand);
          font-size: 28px;
          color: var(--gold-deep);
        }
        .dt-lanterns-sub {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--gold-deep);
        }
        .dt-lantern-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 36px 28px;
        }
        .dt-lantern {
          position: relative;
          padding: 12px;
          background:
            linear-gradient(135deg, var(--cream-d) 0%, var(--cream) 50%, var(--cream-d) 100%);
          border: 1px solid var(--gold-deep);
          box-shadow:
            0 0 0 1px var(--cream),
            0 0 0 4px var(--burgundy),
            14px 14px 0 var(--burgundy-d);
          transition: transform 0.4s, box-shadow 0.4s;
          cursor: pointer;
          margin: 0;
        }
        .dt-lantern:hover {
          transform: translateY(-4px) rotate(-0.5deg);
          box-shadow:
            0 0 0 1px var(--cream),
            0 0 0 4px var(--burgundy),
            18px 18px 0 var(--burgundy-d);
        }
        .dt-lantern:focus-visible {
          outline: 4px solid var(--gold);
          outline-offset: 4px;
        }
        .dt-lantern-frame {
          position: relative;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          background: var(--cream-d);
        }
        .dt-lantern-frame--land { aspect-ratio: 4 / 3; }
        .dt-lantern-frame :global(img) {
          filter: contrast(1.05) saturate(1.05);
          transition: transform 0.6s;
        }
        .dt-lantern:hover .dt-lantern-frame :global(img) { transform: scale(1.05); }
        .dt-lantern-corner {
          position: absolute;
          width: 24px; height: 24px;
          pointer-events: none;
          z-index: 2;
        }
        .dt-lantern-corner :global(svg) { width: 100%; height: 100%; color: var(--gold); }
        .dt-lantern-corner.tl { top: 4px; left: 4px; }
        .dt-lantern-corner.tr { top: 4px; right: 4px; transform: scaleX(-1); }
        .dt-lantern-corner.bl { bottom: 4px; left: 4px; transform: scaleY(-1); }
        .dt-lantern-corner.br { bottom: 4px; right: 4px; transform: scale(-1, -1); }
        .dt-lantern-meta {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-top: 12px;
          padding: 0 4px;
        }
        .dt-lantern-meta .num {
          font-family: var(--display);
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.3em;
          color: var(--burgundy);
        }
        .dt-lantern-meta .date {
          font-family: var(--mono);
          font-size: 9px;
          letter-spacing: 0.28em;
          color: var(--gold-deep);
          text-transform: uppercase;
        }
        .dt-lantern-cap {
          padding: 4px 4px 6px;
          font-family: var(--hand);
          font-size: 24px;
          color: var(--burgundy);
          line-height: 1.1;
          letter-spacing: 0;
          margin: 0;
        }
        .dt-lantern-zoom {
          position: absolute;
          top: 22px;
          right: 22px;
          width: 32px;
          height: 32px;
          background: var(--burgundy);
          color: var(--gold);
          border: 2px solid var(--gold);
          font-family: var(--display);
          font-weight: 700;
          font-size: 16px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: rotate(-8deg) scale(0.8);
          transition: opacity 0.3s, transform 0.3s;
          pointer-events: none;
          z-index: 3;
        }
        .dt-lantern:hover .dt-lantern-zoom,
        .dt-lantern:focus-visible .dt-lantern-zoom {
          opacity: 1;
          transform: rotate(0deg) scale(1);
        }

        /* FEATURE --------------------------------------------- */
        .dt-feature {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          min-height: 80vh;
          background: var(--burgundy);
          color: var(--cream);
          position: relative;
        }
        .dt-feature::before {
          content: "";
          position: absolute;
          top: 0; bottom: 0;
          left: 54.5%;
          width: 6px;
          background: var(--gold);
          transform: translateX(-50%);
          z-index: 2;
        }
        .dt-feature-photo {
          position: relative;
          overflow: hidden;
        }
        .dt-feature-photo::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 60%, rgba(115, 25, 28, 0.4));
          z-index: 1;
        }
        .dt-feature-text {
          padding: 80px 64px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 18px;
        }
        .dt-feature-eye {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: var(--gold);
        }
        .dt-feature h3 {
          font-family: var(--serif);
          font-weight: 400;
          font-size: clamp(40px, 5.4vw, 72px);
          line-height: 1;
          letter-spacing: 0.01em;
        }
        .dt-feature h3 em {
          font-family: var(--script);
          font-size: 1.5em;
          color: var(--gold);
          font-style: normal;
          letter-spacing: 0;
          display: block;
          line-height: 1;
        }
        .dt-feature p {
          font-family: var(--body);
          font-size: 18px;
          line-height: 1.7;
          color: rgba(251, 241, 214, 0.85);
          max-width: 44ch;
        }
        .dt-feature p strong { color: var(--gold); font-weight: 500; }
        .dt-feature-stats {
          margin-top: 24px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          max-width: 460px;
        }
        .dt-feature-stats .stat {
          padding: 14px 0;
          border-top: 1px solid var(--gold);
        }
        .dt-feature-stats .stat b {
          font-family: var(--display);
          font-weight: 600;
          font-size: 28px;
          color: var(--gold);
          display: block;
          letter-spacing: 0.04em;
          margin-bottom: 2px;
        }
        .dt-feature-stats .stat span {
          font-family: var(--mono);
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(251, 241, 214, 0.7);
        }

        /* MENU POSTER ----------------------------------------- */
        .dt-menu {
          padding: 120px 32px;
          max-width: 1080px;
          margin: 0 auto;
        }
        .dt-menu-head { text-align: center; margin-bottom: 60px; }
        .dt-menu-head h3 {
          font-family: var(--display);
          font-weight: 700;
          font-size: clamp(36px, 5vw, 60px);
          color: var(--burgundy);
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .dt-menu-sub {
          font-family: var(--script);
          font-size: 38px;
          color: var(--gold-deep);
          margin-top: -8px;
        }
        .dt-menu-list { display: flex; flex-direction: column; gap: 0; }

        /* FILMS ------------------------------------------------ */
        .dt-films {
          padding: 100px 32px 120px;
          background: var(--burgundy-e);
          color: var(--cream);
          position: relative;
          overflow: hidden;
        }
        .dt-films::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M40 4 L48 24 L72 28 L52 44 L60 68 L40 56 L20 68 L28 44 L8 28 L32 24 Z' fill='none' stroke='%23e9b44a' stroke-width='0.6' opacity='0.07'/%3E%3C/svg%3E");
          background-size: 80px 80px;
          pointer-events: none;
        }
        .dt-films-inner {
          max-width: 1280px;
          margin: 0 auto;
          position: relative;
        }
        .dt-films-head {
          text-align: center;
          margin-bottom: 56px;
        }
        .dt-films-head .cap {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.5em;
          color: var(--gold);
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .dt-films-head h3 {
          font-family: var(--serif);
          font-weight: 400;
          font-size: clamp(40px, 5.4vw, 64px);
          color: var(--cream);
          line-height: 1.05;
        }
        .dt-films-head h3 em {
          font-family: var(--script);
          font-size: 1.5em;
          color: var(--gold);
          font-style: normal;
          letter-spacing: 0;
        }
        .dt-films-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        /* MARKS ------------------------------------------------ */
        .dt-marks {
          padding: 120px 32px;
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
        }
        .dt-marks-head {
          font-family: var(--display);
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--gold-deep);
          margin-bottom: 28px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--gold-deep);
        }
        .dt-palette {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }
        .dt-type-stack {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .dt-type-card {
          padding: 20px;
          border: 1px solid var(--gold-deep);
          background: var(--cream-d);
        }
        .dt-type-card .label {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--gold-deep);
          margin-bottom: 8px;
        }
        .dt-type-card .specimen-display {
          font-family: var(--display);
          font-weight: 700;
          font-size: 24px;
          letter-spacing: 0.18em;
          color: var(--burgundy);
        }
        .dt-type-card .specimen-serif {
          font-family: var(--serif);
          font-size: 22px;
          color: var(--ink);
          font-style: italic;
        }
        .dt-type-card .specimen-script {
          font-family: var(--script);
          font-size: 46px;
          color: var(--burgundy);
          line-height: 1;
        }
        .dt-type-card .specimen-hand {
          font-family: var(--hand);
          font-size: 28px;
          color: var(--burgundy);
        }
        .dt-type-card .specimen-mono {
          font-family: var(--mono);
          font-size: 13px;
          letter-spacing: 0.24em;
          color: var(--ink);
          text-transform: uppercase;
        }

        /* LOGO LINEUP ------------------------------------------ */
        .dt-logos {
          padding: 0 32px 120px;
          max-width: 1280px;
          margin: 0 auto;
          text-align: center;
        }
        .dt-logos-cap {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.5em;
          color: var(--gold-deep);
          text-transform: uppercase;
          margin-bottom: 24px;
        }
        .dt-logos-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        .dt-logo-card {
          padding: 32px 18px 18px;
          border: 1px solid var(--gold-deep);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
        }
        .dt-logo-card--cream    { background: var(--cream); }
        .dt-logo-card--burgundy { background: var(--burgundy); }
        .dt-logo-card--ink      { background: var(--ink); }
        .dt-logo-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          max-width: 240px;
        }
        .dt-logo-label {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--gold-deep);
        }
        .dt-logo-card--burgundy .dt-logo-label,
        .dt-logo-card--ink      .dt-logo-label { color: var(--gold); }

        /* END BLOCK -------------------------------------------- */
        .dt-end {
          position: relative;
          background: var(--burgundy);
          color: var(--cream);
          padding: 120px 32px;
          text-align: center;
          overflow: hidden;
        }
        .dt-end::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cpath d='M60 6 L72 36 L108 42 L78 66 L90 102 L60 84 L30 102 L42 66 L12 42 L48 36 Z' fill='none' stroke='%23e9b44a' stroke-width='0.7' opacity='0.08'/%3E%3C/svg%3E");
          background-size: 120px 120px;
          pointer-events: none;
        }
        .dt-end-flame {
          width: 80px;
          height: auto;
          color: var(--gold);
          margin: 0 auto 24px;
          display: block;
          position: relative;
          z-index: 1;
        }
        .dt-end h3 {
          font-family: var(--serif);
          font-weight: 400;
          font-size: clamp(40px, 6vw, 88px);
          line-height: 1;
          letter-spacing: 0.01em;
          position: relative;
          z-index: 1;
        }
        .dt-end h3 em {
          font-family: var(--script);
          font-size: 1.5em;
          color: var(--gold);
          font-style: normal;
          letter-spacing: 0;
          display: block;
          line-height: 1;
          margin-top: 8px;
        }
        .dt-end p {
          font-family: var(--serif);
          font-style: italic;
          font-size: 22px;
          max-width: 50ch;
          margin: 24px auto 32px;
          color: rgba(251, 241, 214, 0.85);
          position: relative;
          z-index: 1;
        }
        .dt-end-cta {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 18px 30px;
          background: var(--gold);
          color: var(--burgundy);
          font-family: var(--display);
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          border: 3px solid var(--cream);
          box-shadow: 6px 6px 0 var(--burgundy-e);
          transition: transform 0.3s, box-shadow 0.3s;
          position: relative;
          z-index: 1;
        }
        .dt-end-cta:hover {
          transform: translateY(-3px);
          box-shadow: 9px 9px 0 var(--burgundy-e);
        }

        /* FOOTER ----------------------------------------------- */
        .dt-foot {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 22px 32px;
          background: var(--cream);
          border-top: 1px solid var(--gold-deep);
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--burgundy);
        }
        .dt-foot-link strong { color: var(--gold-deep); }
        .dt-foot-link:hover { color: var(--gold-deep); }

        /* PHOTO LIGHTBOX -------------------------------------- */
        .dt-modal {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px;
          background:
            radial-gradient(circle at 25% 20%, rgba(233, 180, 74, 0.10), transparent 45%),
            radial-gradient(circle at 75% 80%, rgba(115, 25, 28, 0.32), transparent 50%),
            rgba(26, 10, 8, 0.94);
          animation: dt-modal-fade 0.22s ease-out;
        }
        @keyframes dt-modal-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .dt-modal-stage {
          position: relative;
          width: min(720px, 92vw);
          height: min(92vh, 960px);
          max-height: 92vh;
          background: var(--cream);
          border: 4px solid var(--burgundy);
          box-shadow: 16px 16px 0 var(--burgundy-d);
          display: flex;
          flex-direction: column;
          animation: dt-modal-pop 0.32s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes dt-modal-pop {
          from { transform: scale(0.85) rotate(-1.5deg); opacity: 0; }
          to   { transform: scale(1) rotate(0); opacity: 1; }
        }
        .dt-modal-bar {
          display: flex;
          align-items: center;
          padding: 10px 14px;
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 600;
          flex: 0 0 auto;
        }
        .dt-modal-bar--top {
          background: var(--gold);
          color: var(--burgundy);
          border-bottom: 4px solid var(--burgundy);
          justify-content: space-between;
          gap: 12px;
        }
        .dt-modal-counter {
          white-space: nowrap;
          font-weight: 800;
        }
        .dt-modal-brand {
          opacity: 0.75;
          white-space: nowrap;
          letter-spacing: 0.28em;
        }
        .dt-modal-close {
          background: var(--burgundy);
          color: var(--gold);
          border: 3px solid var(--burgundy-d);
          width: 34px;
          height: 34px;
          font-family: var(--display);
          font-weight: 700;
          font-size: 22px;
          line-height: 1;
          padding: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.18s;
          flex: 0 0 auto;
        }
        .dt-modal-close:hover {
          transform: rotate(90deg) scale(1.08);
        }
        .dt-modal-image-wrap {
          position: relative;
          flex: 1 1 auto;
          min-height: 0;
          background: var(--cream);
          overflow: hidden;
        }
        .dt-modal-bar--bot {
          background: var(--burgundy);
          color: var(--gold);
          border-top: 4px solid var(--burgundy);
          justify-content: center;
          padding: 16px 18px;
        }
        .dt-modal-slate {
          font-family: var(--serif);
          font-style: italic;
          font-weight: 400;
          font-size: 22px;
          letter-spacing: 0.04em;
          color: var(--gold);
          text-transform: none;
        }
        .dt-modal-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: var(--gold);
          color: var(--burgundy);
          border: 4px solid var(--burgundy);
          box-shadow: 6px 6px 0 var(--burgundy-d);
          width: 64px;
          height: 64px;
          font-family: var(--display);
          font-weight: 700;
          font-size: 28px;
          line-height: 1;
          padding: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.18s, box-shadow 0.18s;
          z-index: 2;
        }
        .dt-modal-nav--prev { left: 32px; }
        .dt-modal-nav--next { right: 32px; }
        .dt-modal-nav:hover {
          transform: translateY(-50%) scale(1.08) rotate(-2deg);
          box-shadow: 8px 8px 0 var(--burgundy-d);
        }
        .dt-modal-nav:active {
          transform: translateY(-50%) scale(0.95);
          box-shadow: 3px 3px 0 var(--burgundy-d);
        }

        @media (max-width: 880px) {
          .dt-hero { padding: 60px 20px 50px; }
          .dt-hero-meta { gap: 18px; }
          .dt-lantern-grid { grid-template-columns: repeat(2, 1fr); gap: 24px 14px; }
          .dt-lantern { padding: 8px; }
          .dt-feature { grid-template-columns: 1fr; min-height: auto; }
          .dt-feature::before { display: none; }
          .dt-feature-photo { aspect-ratio: 16 / 10; }
          .dt-feature-text { padding: 60px 28px; }
          .dt-menu { padding: 80px 20px; }
          .dt-films-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .dt-marks { grid-template-columns: 1fr; gap: 48px; padding: 80px 24px; }
          .dt-palette { grid-template-columns: 1fr 1fr; }
          .dt-logos-row { grid-template-columns: 1fr; gap: 14px; }
        }
        @media (max-width: 720px) {
          .dt-modal { padding: 16px; }
          .dt-modal-stage {
            width: 92vw;
            box-shadow: 8px 8px 0 var(--burgundy-d);
          }
          .dt-modal-brand { display: none; }
          .dt-modal-bar { font-size: 10px; padding: 8px 10px; }
          .dt-modal-slate { font-size: 16px; }
          .dt-modal-nav {
            width: 44px;
            height: 44px;
            font-size: 22px;
            border-width: 3px;
            box-shadow: 4px 4px 0 var(--burgundy-d);
          }
          .dt-modal-nav--prev { left: 8px; }
          .dt-modal-nav--next { right: 8px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .dt-marquee-track { animation: none; }
          .dt-modal,
          .dt-modal-stage { animation: none; }
          .dt-modal-close,
          .dt-modal-nav { transition: none; }
        }
      `}</style>
    </>
  );
}

/* ---------------------- helpers ---------------------- */

const ROMAN: Readonly<Record<number, string>> = {
  1: "I",  2: "II", 3: "III", 4: "IV", 5: "V",  6: "VI", 7: "VII", 8: "VIII",
  9: "IX", 10: "X", 11: "XI", 12: "XII", 13: "XIII", 14: "XIV", 15: "XV",
  16: "XVI", 17: "XVII", 18: "XVIII", 19: "XIX", 20: "XX",
};

function romanNumeral(n: number): string {
  return ROMAN[n] ?? String(n);
}

/* ---------------------- subcomponents ---------------------- */

function MenuItem({ n, name, sub, desc }: { n: string; name: string; sub: string; desc: string }) {
  return (
    <div className="mi">
      <span className="num">{n}</span>
      <div>
        <span className="name">{name} <em>· {sub}</em></span>
        <span className="desc">{desc}</span>
      </div>
      <span className="price">— · MP</span>
      <style jsx>{`
        .mi {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 20px;
          align-items: baseline;
          padding: 16px 0;
          border-bottom: 1px dashed #c08e2a;
        }
        .mi:last-child { border-bottom: 0; }
        .num {
          font-family: "Cinzel", serif;
          font-weight: 700;
          font-size: 14px;
          color: #c08e2a;
          letter-spacing: 0.2em;
        }
        .name {
          font-family: "DM Serif Display", serif;
          font-size: 26px;
          color: #73191c;
          line-height: 1.1;
        }
        .name em {
          font-family: "Caveat", cursive;
          font-size: 1.1em;
          color: #c08e2a;
          font-style: normal;
          margin-left: 8px;
        }
        .desc {
          display: block;
          font-family: "Inter", system-ui, sans-serif;
          font-size: 14px;
          color: #1a0a08;
          opacity: 0.78;
          margin-top: 4px;
          letter-spacing: 0.01em;
        }
        .price {
          font-family: "Cinzel", serif;
          font-weight: 600;
          font-size: 18px;
          color: #73191c;
          letter-spacing: 0.18em;
        }
        @media (max-width: 720px) {
          .mi { grid-template-columns: auto 1fr; gap: 12px; }
          .price { grid-column: 2 / 3; }
        }
      `}</style>
    </div>
  );
}

function Trailer({ n, title, meta, poster }: { n: string; title: string; meta: string; poster: string }) {
  return (
    <figure className="film">
      <div className="frame">
        <Image
          src={poster}
          alt={title}
          fill
          sizes="(max-width: 880px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
        />
        <div className="overlay">
          <span className="tag">Trailer · {n}</span>
          <div className="bottom">
            <span className="title">{title}</span>
            <span className="meta">{meta}</span>
          </div>
        </div>
        <span className="play" aria-hidden>▶</span>
      </div>
      <style jsx>{`
        .film {
          position: relative;
          aspect-ratio: 9 / 16;
          overflow: hidden;
          border: 4px solid #e9b44a;
          cursor: pointer;
          box-shadow: 8px 8px 0 #73191c;
          transition: transform 0.4s, box-shadow 0.4s;
          margin: 0;
        }
        .film:hover {
          transform: translateY(-4px) rotate(-0.4deg);
          box-shadow: 12px 12px 0 #73191c;
        }
        .frame {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .frame :global(img) {
          filter: brightness(0.7);
          transition: filter 0.5s, transform 0.5s;
        }
        .film:hover .frame :global(img) { filter: brightness(0.9); transform: scale(1.04); }
        .overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 16px;
          background: linear-gradient(180deg, rgba(42, 6, 8, 0.4) 0%, transparent 30%, transparent 60%, rgba(42, 6, 8, 0.92) 100%);
        }
        .tag {
          align-self: flex-start;
          font-family: "Cinzel", serif;
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.3em;
          color: #73191c;
          background: #e9b44a;
          padding: 4px 10px;
        }
        .bottom { display: flex; flex-direction: column; gap: 4px; }
        .title {
          display: block;
          font-family: "Italianno", cursive;
          font-size: 32px;
          color: #e9b44a;
          line-height: 1;
          margin-bottom: 4px;
        }
        .meta {
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 9px;
          letter-spacing: 0.28em;
          color: #fbf1d6;
          text-transform: uppercase;
          opacity: 0.85;
        }
        .play {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 72px; height: 72px;
          border-radius: 50%;
          background: #e9b44a;
          color: #73191c;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Cinzel", serif;
          font-weight: 700;
          font-size: 22px;
          border: 3px solid #73191c;
          box-shadow: 0 0 0 2px #e9b44a;
          transition: transform 0.4s;
        }
        .film:hover .play {
          transform: translate(-50%, -50%) scale(1.1) rotate(-4deg);
        }
      `}</style>
    </figure>
  );
}

function PaletteChip({ turk, eng, hex, cls }: { turk: string; eng: string; hex: string; cls: "burgundy" | "gold" | "cream" | "ink" }) {
  return (
    <div className={`pchip ${cls}`}>
      <span className="turk">{turk}</span>
      <div>
        <span className="eng">{eng}</span>
        <p className="hex">{hex}</p>
      </div>
      <style jsx>{`
        .pchip {
          aspect-ratio: 4 / 3;
          padding: 18px;
          border: 1px solid #c08e2a;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }
        .pchip.burgundy { background: #73191c; color: #fbf1d6; }
        .pchip.gold { background: #e9b44a; color: #73191c; }
        .pchip.cream { background: #fbf1d6; color: #73191c; border-color: #73191c; }
        .pchip.ink { background: #1a0a08; color: #fbf1d6; }
        .turk {
          font-family: "Italianno", cursive;
          font-size: 38px;
          line-height: 1;
        }
        .eng {
          font-family: "Cinzel", serif;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .hex {
          font-family: "JetBrains Mono", ui-monospace, monospace;
          font-size: 10px;
          letter-spacing: 0.32em;
          opacity: 0.85;
          margin: 2px 0 0;
        }
        .pchip.cream .turk, .pchip.cream .eng { color: #73191c; }
        .pchip.gold .turk { color: #4f0d10; }
      `}</style>
    </div>
  );
}
