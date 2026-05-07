"use client";

import Image from "next/image";
import Link from "next/link";
import type { Client } from "@/data/clients";

type Props = { client: Client };

export function BigBearsPage({ client }: Props) {
  const logo = client.logos?.[0];
  const wrapper = client.wrapper?.[0];
  const menuPages = client.menu ?? [];
  const photos = client.photos ?? [];

  return (
    <>
      {/* Google Fonts (React 19 hoists <link> to <head>) */}
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin=""
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Lilita+One&family=Nunito:wght@300;400;600;800;900&family=Caveat+Brush&family=JetBrains+Mono:wght@400&display=swap"
      />

      <div className="bb-page">
        {/* TOP RAIL — minimal FF identification + brand badge */}
        <header className="bb-top">
          <Link href="/portfolio" className="bb-top-back">
            ← Portfolio
          </Link>
          <span className="bb-top-frame">★ #005 ★</span>
          <span className="bb-top-meta">Big Bears · Toronto · 2024</span>
        </header>

        {/* TICKER 1 */}
        <div className="bb-ticker">
          <div className="bb-ticker-track">
            <span>BIG BEARS</span><span>BAKED POTATO</span><span>LOADED BY BEARS</span>
            <span>EST. 2024</span><span>TORONTO</span><span>HOT POTATO</span>
            <span>BIG BEARS</span><span>BAKED POTATO</span><span>LOADED BY BEARS</span>
            <span>EST. 2024</span><span>TORONTO</span><span>HOT POTATO</span>
          </div>
        </div>

        {/* HERO */}
        <section className="bb-hero">
          <span className="bb-hero-eyebrow">A short film about a hot potato →</span>
          <h1 className="bb-hero-wordmark">{client.name}</h1>
          {logo && (
            <div className="bb-hero-bear-wrap">
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                priority
                sizes="(max-width: 880px) 280px, 460px"
                style={{ objectFit: "contain" }}
              />
            </div>
          )}
          <p className="bb-hero-tag">
            Loaded by <span className="bb-hero-underline">Bears.</span>
          </p>
        </section>

        {/* TICKER 2 — ingredients */}
        <div className="bb-ticker">
          <div className="bb-ticker-track">
            <span>★ MEAT ★ POTATO ★ TOFU ★ TOMATO ★ NATURAL ★ CHEESE ★ CHICKEN ★ GARLIC ★ ONION ★ LETTUCE ★ FRESH</span>
            <span>★ MEAT ★ POTATO ★ TOFU ★ TOMATO ★ NATURAL ★ CHEESE ★ CHICKEN ★ GARLIC ★ ONION ★ LETTUCE ★ FRESH</span>
          </div>
        </div>

        {/* INTRO */}
        <section className="bb-intro">
          {logo && (
            <div className="bb-intro-bear-wrap">
              <Image src={logo.src} alt="" fill sizes="88px" style={{ objectFit: "contain" }} />
            </div>
          )}
          <h2>
            A spud with <em>personality.</em>
          </h2>
          <p>
            Big Bears arrived with one product — the loaded baked potato — and a
            question:{" "}
            <strong>
              how do you make a humble starch feel like a destination?
            </strong>
          </p>
          <p>
            The mascot earned the shades. The wordmark earned the size. The
            wrapper turned every ingredient on the menu into a pattern that
            sells the brand from a block away.
          </p>
        </section>

        {/* IDENTITY */}
        <section className="bb-identity">
          <h2>Yellow does the work.</h2>

          <div className="bb-stickers">
            <div className="bb-sticker bb-sticker--yellow">
              <span className="bb-sticker-role">Primary 60%</span>
              <span className="bb-sticker-name">Yellow</span>
              <span className="bb-sticker-hex">F3A805</span>
            </div>
            <div className="bb-sticker bb-sticker--orange">
              <span className="bb-sticker-role">Secondary 25%</span>
              <span className="bb-sticker-name">Orange</span>
              <span className="bb-sticker-hex">B73F13</span>
            </div>
            <div className="bb-sticker bb-sticker--red">
              <span className="bb-sticker-role">Accent 10%</span>
              <span className="bb-sticker-name">Red</span>
              <span className="bb-sticker-hex">922700</span>
            </div>
            <div className="bb-sticker bb-sticker--cream">
              <span className="bb-sticker-role">Surface 5%</span>
              <span className="bb-sticker-name">Cream</span>
              <span className="bb-sticker-hex">FFFFF3</span>
            </div>
          </div>

          <div className="bb-type-banner">
            <div>
              <p className="bb-type-label">Display · Lilita One</p>
              <p className="bb-type-display">Aa Bb 0123</p>
            </div>
            <div>
              <p className="bb-type-label">Body · Nunito 600</p>
              <p className="bb-type-body">
                A potato is a small private rebellion{" "}
                <strong>against the cold.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* TICKER 3 — pricing */}
        <div className="bb-ticker">
          <div className="bb-ticker-track">
            <span>SMALL · $11.99</span><span>BEAR SIZE · $17.99</span>
            <span>+ 2 SAUCES</span><span>VEGGIES $2 · MEATS $3.5</span>
            <span>MORE SAUCE $0.50</span>
            <span>SMALL · $11.99</span><span>BEAR SIZE · $17.99</span>
            <span>+ 2 SAUCES</span><span>VEGGIES $2 · MEATS $3.5</span>
            <span>MORE SAUCE $0.50</span>
          </div>
        </div>

        {/* MARK ZONE */}
        <section className="bb-mark">
          <span className="bb-mark-cap">Meet the bear ↓</span>
          <h2>
            The bear earned <em>the shades.</em>
          </h2>
          {logo && (
            <div className="bb-mark-row">
              <div className="bb-mark-cell bb-mark-small-l">
                <Image src={logo.src} alt="" fill sizes="240px" style={{ objectFit: "contain" }} />
              </div>
              <div className="bb-mark-cell bb-mark-big">
                <Image src={logo.src} alt={logo.alt} fill sizes="(max-width: 880px) 280px, 360px" style={{ objectFit: "contain" }} />
              </div>
              <div className="bb-mark-cell bb-mark-small-r">
                <Image src={logo.src} alt="" fill sizes="240px" style={{ objectFit: "contain" }} />
              </div>
            </div>
          )}
        </section>

        {/* PHOTOS — scroll row */}
        {photos.length > 0 && (
          <section className="bb-photos">
            <h2>
              From <em>the line.</em>
            </h2>
            <div className="bb-photo-row">
              {photos.map((p) => (
                <figure key={p.src} className="bb-photo">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="320px"
                    style={{ objectFit: "cover" }}
                  />
                  <figcaption>{p.slate}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* MENU PINBOARD */}
        {menuPages.length > 0 && (
          <section className="bb-menu">
            <span className="bb-menu-cap">Three pages, twelve potatoes</span>
            <h2>
              Pick your <span className="bb-menu-em">Bear Size.</span>
            </h2>
            <div className="bb-menu-board">
              {menuPages.map((m, i) => (
                <figure key={m.src} className="bb-menu-pin">
                  <Image
                    src={m.src}
                    alt={m.alt}
                    width={1200}
                    height={800}
                    sizes="(max-width: 1080px) 100vw, 33vw"
                    className="bb-menu-img"
                  />
                  <figcaption>
                    {m.label ?? `Spread ${String(i + 1).padStart(2, "0")}`}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* WRAPPER full bleed */}
        {wrapper && (
          <section className="bb-wrap">
            <Image
              src={wrapper.src}
              alt={wrapper.alt}
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </section>
        )}

        {/* WRAPPER INFO */}
        <section className="bb-wrap-info">
          <h2>
            Every wrapper, <em>a billboard.</em>
          </h2>
          <p>
            The take-away wrapper turns every ingredient on the menu into a
            typographic pattern. Wrap a potato, sell a brand.
          </p>
          <div className="bb-wrap-specs">
            <span>
              Stock<b>Kraft 60gsm</b>
            </span>
            <span>
              Ink<b>Bear Yellow</b>
            </span>
            <span>
              Format<b>320×320 mm</b>
            </span>
          </div>
        </section>

        {/* END */}
        <section className="bb-end">
          <span className="bb-end-lead">Roll the credits ↓</span>
          <h2>
            Send the next one <em>over.</em>
          </h2>
          <p>
            If your brand needs the same kind of attention — full identity,
            packaging, photography, the menu to tie it together — we&rsquo;re
            booking the next slot now.
          </p>
          <Link href="/contact" className="bb-end-cta">
            Start a project →
          </Link>
        </section>

        {/* FOOTER TICKER */}
        <div className="bb-ticker">
          <div className="bb-ticker-track">
            <span>FRAMEFLOW</span><span>BIG BEARS</span><span>2024</span>
            <span>TORONTO</span><span>BRAND BUILD</span><span>★</span>
            <span>FRAMEFLOW</span><span>BIG BEARS</span><span>2024</span>
            <span>TORONTO</span><span>BRAND BUILD</span><span>★</span>
          </div>
        </div>

        {/* FF attribution — single line */}
        <footer className="bb-foot">
          <Link href="/" className="bb-foot-link">
            Designed by <strong>FrameFlow</strong> · Toronto · 2024
          </Link>
        </footer>
      </div>

      <style jsx>{`
        :global(body:has(.bb-page)) {
          background: #f3a805;
        }
        .bb-page {
          --bb-yellow:  #f3a805;
          --bb-orange:  #b73f13;
          --bb-red:     #922700;
          --bb-cream:   #fffff3;
          --bb-ink:     #1a0e08;
          --display:    "Lilita One", system-ui, sans-serif;
          --body:       "Nunito", system-ui, sans-serif;
          --hand:       "Caveat Brush", cursive;
          --mono:       "JetBrains Mono", ui-monospace, monospace;

          background: var(--bb-yellow);
          color: var(--bb-ink);
          font-family: var(--body);
          font-weight: 600;
          overflow-x: hidden;
        }

        /* TOP RAIL ----------------------------------------------- */
        .bb-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 32px;
          background: var(--bb-yellow);
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 400;
          color: var(--bb-red);
          gap: 16px;
        }
        .bb-top-back {
          color: var(--bb-red);
          text-decoration: none;
          font-weight: 600;
        }
        .bb-top-back:hover { color: var(--bb-ink); }
        .bb-top-frame {
          background: var(--bb-red);
          color: var(--bb-yellow);
          padding: 4px 10px;
          letter-spacing: 0.2em;
        }
        .bb-top-meta {
          opacity: 0.7;
        }

        /* TICKER ------------------------------------------------- */
        .bb-ticker {
          background: var(--bb-red);
          color: var(--bb-yellow);
          overflow: hidden;
          padding: 14px 0;
          border-top: 4px solid var(--bb-ink);
          border-bottom: 4px solid var(--bb-ink);
        }
        .bb-ticker-track {
          display: flex;
          width: max-content;
          animation: bb-tick 30s linear infinite;
          gap: 36px;
        }
        .bb-ticker-track span {
          font-family: var(--display);
          font-size: 22px;
          letter-spacing: 0.01em;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          gap: 36px;
        }
        .bb-ticker-track span::after {
          content: "★";
          color: var(--bb-cream);
        }
        @keyframes bb-tick {
          to { transform: translateX(-50%); }
        }

        /* HERO --------------------------------------------------- */
        .bb-hero {
          position: relative;
          padding: 80px 40px 60px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0;
        }
        .bb-hero::before {
          content: "★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★";
          position: absolute;
          top: 30px;
          left: 0;
          right: 0;
          font-family: var(--display);
          font-size: 22px;
          color: var(--bb-red);
          letter-spacing: 0.6em;
          opacity: 0.3;
          pointer-events: none;
        }
        .bb-hero-eyebrow {
          font-family: var(--hand);
          font-size: 32px;
          color: var(--bb-red);
          transform: rotate(-2deg);
          display: inline-block;
          margin-bottom: 16px;
        }
        .bb-hero-wordmark {
          font-family: var(--display);
          font-size: clamp(72px, 12vw, 200px);
          line-height: 0.85;
          color: var(--bb-cream);
          text-shadow: 6px 6px 0 var(--bb-red), 12px 12px 0 var(--bb-ink);
          letter-spacing: -0.01em;
          max-width: 14ch;
          margin: 0;
          transform: rotate(-1deg);
          font-weight: 400;
        }
        .bb-hero-bear-wrap {
          position: relative;
          width: clamp(280px, 32vw, 460px);
          aspect-ratio: 1 / 1;
          margin: 24px 0;
          animation: bb-bounce 4s ease-in-out infinite;
          filter: drop-shadow(0 20px 30px rgba(146, 39, 0, 0.4));
        }
        @keyframes bb-bounce {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          25%      { transform: translateY(-8px) rotate(3deg); }
          50%      { transform: translateY(-12px) rotate(-2deg); }
          75%      { transform: translateY(-4px) rotate(2deg); }
        }
        .bb-hero-tag {
          font-family: var(--display);
          font-size: clamp(28px, 3.6vw, 56px);
          color: var(--bb-red);
          transform: rotate(1deg);
          max-width: 18ch;
          margin: 0 auto;
          line-height: 1;
        }
        .bb-hero-underline {
          position: relative;
          display: inline-block;
        }
        .bb-hero-underline::after {
          content: "";
          position: absolute;
          bottom: -8px;
          left: -4px;
          right: -4px;
          height: 6px;
          background: var(--bb-cream);
          transform: skewX(-12deg);
          z-index: -1;
        }

        /* INTRO -------------------------------------------------- */
        .bb-intro {
          background: var(--bb-cream);
          padding: 100px 32px;
          text-align: center;
          border-top: 4px solid var(--bb-ink);
          border-bottom: 4px solid var(--bb-ink);
          position: relative;
        }
        .bb-intro::before, .bb-intro::after {
          content: "";
          position: absolute;
          width: 64px;
          height: 64px;
          background-image: radial-gradient(circle at center, var(--bb-red) 6px, transparent 7px);
          background-size: 16px 16px;
          opacity: 0.3;
        }
        .bb-intro::before { top: 24px; left: 24px; }
        .bb-intro::after { bottom: 24px; right: 24px; }
        .bb-intro-bear-wrap {
          position: relative;
          width: 88px;
          height: 88px;
          margin: 0 auto 24px;
          animation: bb-wiggle 3s ease-in-out infinite;
        }
        @keyframes bb-wiggle {
          0%, 100% { transform: rotate(-4deg); }
          50%      { transform: rotate(4deg); }
        }
        .bb-intro h2 {
          font-family: var(--display);
          font-size: clamp(48px, 6vw, 96px);
          line-height: 0.95;
          max-width: 16ch;
          margin: 0 auto 24px;
          color: var(--bb-ink);
          font-weight: 400;
        }
        .bb-intro h2 em {
          font-family: var(--hand);
          font-style: normal;
          color: var(--bb-orange);
          font-size: 1.2em;
          vertical-align: -0.05em;
        }
        .bb-intro p {
          font-family: var(--body);
          font-weight: 600;
          font-size: 21px;
          line-height: 1.55;
          max-width: 56ch;
          margin: 0 auto 16px;
          color: var(--bb-ink);
        }
        .bb-intro p strong {
          background: var(--bb-yellow);
          padding: 2px 6px;
          font-weight: 800;
        }

        /* IDENTITY ----------------------------------------------- */
        .bb-identity {
          padding: 100px 32px;
          background: var(--bb-yellow);
          position: relative;
          overflow: hidden;
        }
        .bb-identity h2 {
          font-family: var(--display);
          font-size: clamp(56px, 8vw, 124px);
          line-height: 0.9;
          color: var(--bb-cream);
          text-shadow: 4px 4px 0 var(--bb-red);
          text-align: center;
          max-width: 18ch;
          margin: 0 auto 60px;
          transform: rotate(-1deg);
          font-weight: 400;
        }

        .bb-stickers {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 24px;
          margin-bottom: 60px;
        }
        .bb-sticker {
          position: relative;
          width: clamp(160px, 20vw, 260px);
          aspect-ratio: 1;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          box-shadow:
            inset 0 0 0 4px var(--bb-cream),
            inset 0 0 0 5px var(--bb-ink),
            4px 4px 0 var(--bb-ink);
          font-family: var(--display);
          transform: rotate(var(--rotate, 0deg));
          transition: transform 0.3s;
          font-weight: 400;
        }
        .bb-sticker:hover { transform: rotate(0deg) scale(1.05); }
        .bb-sticker-name { font-size: 28px; line-height: 1; }
        .bb-sticker-hex { font-family: var(--mono); font-size: 11px; opacity: 0.7; letter-spacing: 0.18em; font-weight: 400; }
        .bb-sticker-role {
          font-family: var(--mono);
          font-size: 9px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          font-weight: 400;
          opacity: 0.6;
        }
        .bb-sticker--yellow { background: var(--bb-yellow); color: var(--bb-ink); --rotate: -8deg; }
        .bb-sticker--orange { background: var(--bb-orange); color: var(--bb-cream); --rotate: 5deg; }
        .bb-sticker--red    { background: var(--bb-red);    color: var(--bb-cream); --rotate: -3deg; }
        .bb-sticker--cream  { background: var(--bb-cream);  color: var(--bb-ink); --rotate: 6deg; }

        .bb-type-banner {
          background: var(--bb-cream);
          border: 4px solid var(--bb-ink);
          box-shadow: 8px 8px 0 var(--bb-red);
          padding: 40px;
          max-width: 880px;
          margin: 0 auto;
          transform: rotate(-0.5deg);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }
        .bb-type-label {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--bb-orange);
          font-weight: 400;
          margin-bottom: 8px;
        }
        .bb-type-display {
          font-family: var(--display);
          font-size: 88px;
          line-height: 0.85;
          color: var(--bb-ink);
          font-weight: 400;
        }
        .bb-type-body {
          font-family: var(--body);
          font-weight: 600;
          font-size: 18px;
          line-height: 1.4;
          color: var(--bb-ink);
        }
        .bb-type-body strong { background: var(--bb-yellow); padding: 1px 6px; font-weight: 800; }

        /* MARK ZONE ---------------------------------------------- */
        .bb-mark {
          background: var(--bb-red);
          color: var(--bb-cream);
          padding: 100px 32px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .bb-mark::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle at 20% 30%, rgba(243, 168, 5, 0.35) 0, transparent 8%),
            radial-gradient(circle at 80% 70%, rgba(243, 168, 5, 0.35) 0, transparent 6%),
            radial-gradient(circle at 70% 20%, rgba(243, 168, 5, 0.35) 0, transparent 5%);
          opacity: 0.5;
          pointer-events: none;
        }
        .bb-mark-cap {
          font-family: var(--hand);
          font-size: 36px;
          color: var(--bb-yellow);
          transform: rotate(-2deg);
          display: inline-block;
          margin-bottom: 20px;
        }
        .bb-mark h2 {
          font-family: var(--display);
          font-size: clamp(56px, 7vw, 104px);
          line-height: 0.95;
          color: var(--bb-cream);
          max-width: 16ch;
          margin: 0 auto 60px;
          font-weight: 400;
        }
        .bb-mark h2 em {
          font-family: var(--hand);
          font-style: normal;
          color: var(--bb-yellow);
          font-size: 1.15em;
        }
        .bb-mark-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          max-width: 1100px;
          margin: 0 auto;
          gap: 32px;
          align-items: center;
          justify-items: center;
        }
        .bb-mark-cell {
          position: relative;
          aspect-ratio: 1 / 1;
          width: 100%;
          filter: drop-shadow(0 12px 20px rgba(0, 0, 0, 0.3));
          transition: transform 0.4s;
        }
        .bb-mark-small-l { transform: scale(0.6) rotate(-8deg); }
        .bb-mark-big     { transform: scale(1.1) rotate(2deg); }
        .bb-mark-small-r { transform: scale(0.6) rotate(8deg); }
        .bb-mark-small-l:hover { transform: scale(0.7) rotate(0); }
        .bb-mark-big:hover     { transform: scale(1.15) rotate(0); }
        .bb-mark-small-r:hover { transform: scale(0.7) rotate(0); }

        /* PHOTOS ROW --------------------------------------------- */
        .bb-photos {
          background: var(--bb-yellow);
          padding: 80px 0;
          border-top: 4px solid var(--bb-ink);
        }
        .bb-photos h2 {
          font-family: var(--display);
          font-size: clamp(48px, 6vw, 96px);
          color: var(--bb-cream);
          text-shadow: 4px 4px 0 var(--bb-red);
          text-align: center;
          max-width: 18ch;
          margin: 0 auto 40px;
          padding: 0 32px;
          font-weight: 400;
        }
        .bb-photos h2 em {
          font-family: var(--hand);
          font-style: normal;
          color: var(--bb-red);
        }
        .bb-photo-row {
          display: flex;
          gap: 16px;
          padding: 0 16px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
        }
        .bb-photo-row::-webkit-scrollbar { height: 6px; }
        .bb-photo-row::-webkit-scrollbar-thumb { background: var(--bb-red); }
        .bb-photo {
          flex: 0 0 320px;
          aspect-ratio: 3 / 4;
          border: 4px solid var(--bb-ink);
          box-shadow: 8px 8px 0 var(--bb-red);
          position: relative;
          overflow: hidden;
          scroll-snap-align: start;
          transition: transform 0.4s;
          margin: 0;
        }
        .bb-photo:hover { transform: translateY(-6px) rotate(-1deg); }
        .bb-photo figcaption {
          position: absolute;
          bottom: 8px;
          left: 12px;
          background: var(--bb-yellow);
          color: var(--bb-ink);
          font-family: var(--mono);
          font-size: 9px;
          letter-spacing: 0.22em;
          padding: 4px 8px;
          text-transform: uppercase;
          font-weight: 400;
        }

        /* MENU PINBOARD ------------------------------------------ */
        .bb-menu {
          background: var(--bb-orange);
          color: var(--bb-cream);
          padding: 100px 32px;
          text-align: center;
          border-top: 4px solid var(--bb-ink);
          border-bottom: 4px solid var(--bb-ink);
        }
        .bb-menu h2 {
          font-family: var(--display);
          font-size: clamp(56px, 7vw, 112px);
          line-height: 0.95;
          max-width: 18ch;
          margin: 0 auto 12px;
          color: var(--bb-cream);
          text-shadow: 4px 4px 0 var(--bb-red);
          font-weight: 400;
        }
        .bb-menu-em { color: var(--bb-yellow); }
        .bb-menu-cap {
          font-family: var(--hand);
          font-size: 32px;
          color: var(--bb-yellow);
          transform: rotate(-2deg);
          display: inline-block;
          margin-bottom: 48px;
        }
        .bb-menu-board {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1300px;
          margin: 0 auto;
        }
        .bb-menu-pin {
          background: var(--bb-cream);
          padding: 12px 12px 24px;
          box-shadow: 6px 6px 0 var(--bb-ink);
          transition: transform 0.4s;
          position: relative;
          margin: 0;
        }
        .bb-menu-pin::before {
          content: "";
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 22px;
          height: 22px;
          background: var(--bb-red);
          border-radius: 50%;
          box-shadow: 0 4px 0 rgba(0, 0, 0, 0.2);
          z-index: 2;
        }
        .bb-menu-pin:nth-child(1) { transform: rotate(-2deg); }
        .bb-menu-pin:nth-child(3) { transform: rotate(2deg); }
        .bb-menu-pin:hover { transform: rotate(0) translateY(-6px); }
        .bb-menu-img {
          width: 100%;
          height: auto;
          display: block;
        }
        .bb-menu-pin figcaption {
          font-family: var(--display);
          font-size: 18px;
          color: var(--bb-orange);
          margin-top: 12px;
          font-weight: 400;
        }

        /* WRAPPER ------------------------------------------------ */
        .bb-wrap {
          padding: 0;
          background: var(--bb-ink);
          position: relative;
          width: 100%;
          height: clamp(360px, 60vh, 600px);
          overflow: hidden;
        }
        .bb-wrap-info {
          background: var(--bb-yellow);
          padding: 60px 32px;
          text-align: center;
          border-top: 4px solid var(--bb-ink);
        }
        .bb-wrap-info h2 {
          font-family: var(--display);
          font-size: clamp(48px, 6vw, 88px);
          color: var(--bb-ink);
          max-width: 18ch;
          margin: 0 auto 16px;
          font-weight: 400;
        }
        .bb-wrap-info h2 em {
          font-family: var(--hand);
          font-style: normal;
          color: var(--bb-red);
          font-size: 1.2em;
        }
        .bb-wrap-info p {
          font-family: var(--body);
          font-weight: 700;
          font-size: 19px;
          line-height: 1.5;
          max-width: 60ch;
          margin: 0 auto 24px;
          color: var(--bb-ink);
        }
        .bb-wrap-specs {
          display: inline-flex;
          gap: 24px;
          flex-wrap: wrap;
          justify-content: center;
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-weight: 400;
          color: var(--bb-red);
        }
        .bb-wrap-specs span b {
          font-family: var(--display);
          font-size: 18px;
          letter-spacing: 0;
          text-transform: none;
          color: var(--bb-ink);
          margin-left: 4px;
          font-weight: 400;
        }

        /* END ---------------------------------------------------- */
        .bb-end {
          background: var(--bb-red);
          color: var(--bb-cream);
          padding: 100px 32px;
          text-align: center;
          border-top: 4px solid var(--bb-ink);
        }
        .bb-end-lead {
          font-family: var(--hand);
          font-size: 36px;
          color: var(--bb-yellow);
          transform: rotate(-2deg);
          display: inline-block;
          margin-bottom: 20px;
        }
        .bb-end h2 {
          font-family: var(--display);
          font-size: clamp(48px, 6vw, 96px);
          line-height: 0.95;
          max-width: 18ch;
          margin: 0 auto 24px;
          color: var(--bb-cream);
          font-weight: 400;
        }
        .bb-end h2 em {
          font-family: var(--hand);
          font-style: normal;
          color: var(--bb-yellow);
          font-size: 1.15em;
        }
        .bb-end p {
          font-family: var(--body);
          font-weight: 600;
          font-size: 19px;
          line-height: 1.6;
          max-width: 50ch;
          margin: 0 auto 36px;
          color: rgba(255, 255, 243, 0.85);
        }
        .bb-end-cta {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: var(--bb-yellow);
          color: var(--bb-ink);
          padding: 18px 32px;
          font-family: var(--display);
          font-size: 22px;
          letter-spacing: 0;
          text-decoration: none;
          box-shadow: 6px 6px 0 var(--bb-ink);
          transition: transform 0.2s, box-shadow 0.2s;
          font-weight: 400;
        }
        .bb-end-cta:hover {
          transform: translate(-2px, -2px);
          box-shadow: 8px 8px 0 var(--bb-ink);
        }

        /* FOOT --------------------------------------------------- */
        .bb-foot {
          background: var(--bb-ink);
          padding: 24px 32px;
          text-align: center;
        }
        .bb-foot-link {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--bb-yellow);
          text-decoration: none;
          opacity: 0.7;
          font-weight: 400;
          transition: opacity 0.2s;
        }
        .bb-foot-link:hover { opacity: 1; }
        .bb-foot-link strong { color: var(--bb-yellow); font-weight: 600; }

        /* RESPONSIVE --------------------------------------------- */
        @media (max-width: 1080px) {
          .bb-mark-row { grid-template-columns: 1fr; gap: 24px; }
          .bb-mark-small-l, .bb-mark-small-r { transform: scale(0.7) rotate(0); }
          .bb-mark-big { transform: scale(1) rotate(0); }
          .bb-menu-board { grid-template-columns: 1fr; }
          .bb-menu-pin { transform: none !important; }
          .bb-type-banner { grid-template-columns: 1fr; }
        }

        @media (prefers-reduced-motion: reduce) {
          .bb-ticker-track,
          .bb-hero-bear,
          .bb-intro-bear {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}
