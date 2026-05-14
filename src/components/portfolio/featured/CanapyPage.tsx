"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getFrameNumber } from "@/data/clients";
import type { Client } from "@/data/clients";
import { LoadingTransition } from "@/components/portfolio/LoadingTransition";

type Props = { client: Client };

/* ---------- catalogue specimen entries (curated highlights) ----------
   Each entry maps to one of the photos in client.photos by index.
   The detailed copy lives here because it's catalogue-specific — the
   contact sheet at the bottom uses every photo from client.photos. */
type CatalogueEntry = {
  photoIdx: number;
  sku: string;
  skuName: string;
  titleHead: string;
  titleAccent: string;
  blurb: string;
  specs: ReadonlyArray<{ label: string; value: string }>;
  lab: ReadonlyArray<{ k: string; v: string }>;
};

const CATALOGUE: ReadonlyArray<CatalogueEntry> = [
  {
    photoIdx: 0,
    sku: "CN-001-CL",
    skuName: "Cane Lounge / Demo",
    titleHead: "Cane Lounge —",
    titleAccent: "backlit.",
    blurb:
      "Solid beech, oiled twice. Hand-caned back in Viennese pattern. Bouclé seat in undyed wool. Photographed against the south-facing wall in a single morning, with the sunlight doing most of the work.",
    specs: [
      { label: "Frame",     value: "Beech, oiled" },
      { label: "Weave",     value: "Viennese cane" },
      { label: "Seat",      value: "Bouclé, cream" },
      { label: "Footprint", value: "660 × 720 × 760" },
    ],
    lab: [{ k: "F", v: "2.0" }, { k: "1/", v: "250" }, { k: "ISO", v: "800" }, { k: "", v: "50 mm" }],
  },
  {
    photoIdx: 1,
    sku: "CN-002-CW",
    skuName: "Cane Weave / Detail",
    titleHead: "Viennese Cane —",
    titleAccent: "detail.",
    blurb:
      "Hand-laid cane on a beech frame. The pattern is older than the chair, older than the room, older than most of the rooms we put it in.",
    specs: [
      { label: "Pattern",  value: "Viennese" },
      { label: "Material", value: "Rattan core" },
      { label: "Frame",    value: "Beech, oiled" },
      { label: "Aperture", value: "F 2.0" },
    ],
    lab: [{ k: "F", v: "2.0" }, { k: "1/", v: "200" }, { k: "ISO", v: "800" }, { k: "", v: "50 mm" }],
  },
  {
    photoIdx: 3,
    sku: "CN-004-BA",
    skuName: "Beech Arm / Cream",
    titleHead: "Beech Arm —",
    titleAccent: "cream.",
    blurb:
      "Beech, finger-jointed; tung-oiled, hand-rubbed. Cushion in undyed wool bouclé. A single edge holds the morning.",
    specs: [
      { label: "Material", value: "Beech, jointed" },
      { label: "Finish",   value: "Tung oil" },
      { label: "Cushion",  value: "Bouclé, cream" },
      { label: "Time",     value: "11:08, March" },
    ],
    lab: [{ k: "F", v: "4.0" }, { k: "1/", v: "320" }, { k: "ISO", v: "400" }, { k: "", v: "50 mm" }],
  },
  {
    photoIdx: 12,
    sku: "CN-013-WA",
    skuName: "Walnut Arch / Table",
    titleHead: "Walnut Arch —",
    titleAccent: "2,200 mm.",
    blurb:
      "A dining table cut in walnut. Book-matched top; arched leg panels CNC-cut and hand-finished. Loaded lightly: a vessel, a closed monograph, the corner of a cane chair.",
    specs: [
      { label: "Top",    value: "Walnut, b-matched" },
      { label: "Base",   value: "Walnut arch" },
      { label: "Length", value: "2,200 mm" },
      { label: "Weight", value: "94 kg" },
    ],
    lab: [{ k: "F", v: "4.0" }, { k: "1/", v: "200" }, { k: "ISO", v: "800" }, { k: "", v: "35 mm" }],
  },
  {
    photoIdx: 11,
    sku: "CN-012-BS",
    skuName: "Bouclé Sectional / Window",
    titleHead: "Bouclé Sectional —",
    titleAccent: "window grid.",
    blurb:
      "Undyed wool bouclé, deep seat geometry. Photographed at 14:32 against a window-grid shadow that returns at the same hour every clear day.",
    specs: [
      { label: "Surface", value: "Bouclé, cream" },
      { label: "Fill",    value: "Down + foam" },
      { label: "Length",  value: "3,000 mm" },
      { label: "Time",    value: "14:32" },
    ],
    lab: [{ k: "F", v: "2.8" }, { k: "1/", v: "250" }, { k: "ISO", v: "400" }, { k: "", v: "35 mm" }],
  },
  {
    photoIdx: 9,
    sku: "CN-010-SH",
    skuName: "Saddle Headboard / Tufted",
    titleHead: "Saddle Headboard —",
    titleAccent: "tufted.",
    blurb:
      "A bedroom panel in saddle leather. Eight-button hand-set tufting; edge piping rolled by hand. Indirect light from the next room only.",
    specs: [
      { label: "Surface", value: "Saddle leather" },
      { label: "Tufting", value: "8 buttons" },
      { label: "Edge",    value: "Self-piped" },
      { label: "Light",   value: "Indirect, N" },
    ],
    lab: [{ k: "F", v: "2.0" }, { k: "1/", v: "125" }, { k: "ISO", v: "1600" }, { k: "", v: "50 mm" }],
  },
  {
    photoIdx: 7,
    sku: "CN-008-SR",
    skuName: "Showroom / Davenport",
    titleHead: "Davenport —",
    titleAccent: "the room.",
    blurb:
      "Vertical timber slats, the wordmark in cream, a bouclé sofa that has been everyone's for a season. The showroom photographed as one photographs a room, not a piece.",
    specs: [
      { label: "Floor",   value: "Engineered oak" },
      { label: "Wall",    value: "Plaster, pale" },
      { label: "Surface", value: "4,500 sq ft" },
      { label: "Address", value: "Davenport Rd" },
    ],
    lab: [{ k: "F", v: "2.8" }, { k: "1/", v: "200" }, { k: "ISO", v: "800" }, { k: "", v: "24 mm" }],
  },
];

const TRAILERS: ReadonlyArray<{ posterIdx: number; title: string; duration: string }> = [
  { posterIdx: 2,  title: "The Showroom, slow",     duration: "0:18" },
  { posterIdx: 11, title: "Bouclé in window light", duration: "0:09" },
  { posterIdx: 1,  title: "Cane, hand-laid",        duration: "0:15" },
  { posterIdx: 12, title: "Walnut Arch, set",       duration: "0:22" },
  { posterIdx: 9,  title: "Saddle leather, dusk",   duration: "0:11" },
  { posterIdx: 8,  title: "Living, reading",        duration: "0:14" },
];

export function CanapyPage({ client }: Props) {
  const photos = client.photos ?? [];
  const total = photos.length;
  const frameNumber = getFrameNumber(client);

  /* PHOTO LIGHTBOX */
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const isOpen = modalIndex !== null;
  const activePhoto = isOpen ? photos[modalIndex] : null;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalIndex(null);
      else if (e.key === "ArrowLeft") {
        setModalIndex((i) =>
          i === null ? null : (i - 1 + total) % total
        );
      } else if (e.key === "ArrowRight") {
        setModalIndex((i) =>
          i === null ? null : (i + 1) % total
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
  }, [isOpen, total]);

  const cataloguePhotos = useMemo(
    () =>
      CATALOGUE.map((entry) => ({
        entry,
        photo: photos[entry.photoIdx],
      })).filter((x) => x.photo),
    [photos]
  );

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
        href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@200;300;400;500;600;700&display=swap"
      />

      <div className="cf-page">
        {/* TOP RAIL ---------------------------------------------- */}
        <header className="cf-top">
          <Link href="/portfolio" className="cf-top-back">
            ← Portfolio
          </Link>
          <span className="cf-top-frame">★ #{frameNumber} ★</span>
          <span className="cf-top-meta">
            {client.name.replace(" Furniture", "")} · {client.location ?? "Toronto"} · {client.year ?? "2026"}
          </span>
        </header>

        {/* HERO ---------------------------------------------- */}
        <section className="cf-hero">
          <p className="cf-hero-eyebrow">FrameFlow · Reel {frameNumber} · Spring MMXXVI</p>
          <h1 className="cf-hero-wordmark">CANAPY</h1>
          <p className="cf-hero-edition">
            Edition {frameNumber}<span>·</span>Catalogue<span>·</span>Spring 2026
          </p>
          <p className="cf-hero-tag">
            {client.brand?.tagline ?? "Sculpted for spaces that breathe."}
          </p>
          <div className="cf-hero-scope">
            {client.services.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          <dl className="cf-hero-meta">
            <div><dt>Plates</dt><dd>{String(total).padStart(2, "0")}</dd></div>
            <div><dt>Films</dt><dd>{String(TRAILERS.length).padStart(2, "0")}</dd></div>
            <div><dt>Shoots</dt><dd>04</dd></div>
            <div><dt>Year</dt><dd>{client.year ?? "2026"}</dd></div>
          </dl>
        </section>

        {/* INTRO ---------------------------------------------- */}
        <section className="cf-intro">
          <p className="cf-intro-cap">A note on the work</p>
          <h2>
            A season for <b>Canapy Furniture</b> — Toronto&rsquo;s contract-grade
            studio on Davenport Road.
          </h2>
          <p>
            We were brought on for the long story. Four shoots in the Davenport
            Showroom and one private home in the Annex. Photography, films,
            social, and the small bright work of ads.
          </p>
          <p>
            The Canapy brief was a sentence: <strong>photograph the room
            honestly.</strong> Daylight only — no fill, no flash. Four hundred
            and twelve frames came back; thirteen were kept.
          </p>
        </section>

        {/* MARKS — palette + type ---------------------------- */}
        <section className="cf-marks">
          <div>
            <h3>Palette · achromatic</h3>
            <div className="cf-palette">
              <PaletteChip cls="bone"  role="Surface · 60%"  name="Bone"     hex="#FFFFFF" />
              <PaletteChip cls="paper" role="Tonal · 20%"    name="Paper"    hex="#FAFAF8" />
              <PaletteChip cls="gray"  role="Hairline · 5%"  name="Stone"    hex="#E5E3DF" />
              <PaletteChip cls="ink"   role="Ink · 15%"      name="Charcoal" hex="#111111" />
            </div>
          </div>

          <div>
            <h3>Typeset · Hanken Grotesk</h3>
            <div className="cf-type-stack">
              <TypeRow label="Wordmark"        cls="w" text="CANAPY" />
              <TypeRow label="Display · 200"   cls="h" text="Aa Bb · 0123" />
              <TypeRow label="Subhead · 500"   cls="m" text="Sculpted for spaces that breathe." />
              <TypeRow label="Body · 400"      cls="b" text="Daylight only — no fill, no flash. Four hundred and twelve frames came back; thirteen were kept." />
              <TypeRow label="Label · 500"     cls="l" text="Davenport · Toronto · MMXXVI" />
            </div>
          </div>
        </section>

        {/* CATALOGUE — curated specimen entries ------------- */}
        <section className="cf-cat">
          <div className="cf-cat-head">
            <span className="label">01 / Catalogue</span>
            <h3>The plates, <b>specimen-by-specimen.</b></h3>
            <span className="count"><b>{total}</b> plates · {CATALOGUE.length} specimens · 412 made</span>
          </div>

          {cataloguePhotos.map(({ entry, photo }, i) => (
            <article key={entry.sku} className={`cf-entry${i % 2 === 1 ? " flip" : ""}`}>
              <button
                type="button"
                className={`cf-entry-photo${photo.orientation === "landscape" ? " land" : ""}`}
                onClick={() => setModalIndex(entry.photoIdx)}
                aria-label={`Open photo: ${photo.alt}`}
              >
                <span className="stamp">P.{String(entry.photoIdx + 1).padStart(2, "0")} · {entry.skuName.split(" / ")[0]}</span>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 880px) 92vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
                <span className="zoom" aria-hidden>↗</span>
              </button>
              <div className="cf-entry-spec">
                <p className="num">{String(i + 1).padStart(2, "0")}.</p>
                <p className="sku">SKU · <b>{entry.sku}</b> · {entry.skuName}</p>
                <h4>
                  {entry.titleHead} <b>{entry.titleAccent}</b>
                </h4>
                <p className="blurb">{entry.blurb}</p>
                <dl>
                  {entry.specs.map((s) => (
                    <div key={s.label}>
                      <dt>{s.label}</dt>
                      <dd>{s.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="lab">
                  {entry.lab.map((l, j) => (
                    <span key={j}>
                      {l.k && <b>{l.k}</b>}{l.v}
                    </span>
                  ))}
                </p>
              </div>
            </article>
          ))}
        </section>

        {/* CONTACT SHEET — every plate, thumbnails ----------------- */}
        <section className="cf-sheet">
          <div className="cf-sheet-head">
            <span className="label">02 / Contact sheet</span>
            <h3>All thirteen, <b>at thumbnail.</b></h3>
            <span className="download" aria-label="Download PDF placeholder">Download PDF →</span>
          </div>
          <div className="cf-sheet-grid">
            {photos.map((p, i) => (
              <button
                type="button"
                key={p.src}
                className="cf-sheet-cell"
                onClick={() => setModalIndex(i)}
                aria-label={`Open photo ${i + 1} of ${total}: ${p.alt}`}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 880px) 24vw, 100px"
                  style={{ objectFit: "cover" }}
                />
                <span className="num" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
        </section>

        {/* SCOPE — service rows ----------------------------- */}
        <section className="cf-scope">
          <div className="cf-scope-head">
            <span className="label">03 / Scope</span>
            <h3>What we made for <b>Canapy.</b></h3>
            <span className="total">{client.services.length.toString().padStart(2, "0")} services</span>
          </div>
          <ScopeRow num="01" name="Photography"     desc="Four shoots in the Davenport Showroom and one private home. Daylight only — no fill, no flash. Stills delivered with cutlines written." outValue={String(total)} outLabel="stills" />
          <ScopeRow num="02" name="Videography"     desc="Quiet handheld films cut in the same edit as the stills — no music, the room as the soundtrack. 9:16 native; 1:1 cut-downs supplied."  outValue={String(TRAILERS.length).padStart(2, "0")} outLabel="trailers" />
          <ScopeRow num="03" name="Social Media"    desc="Calendar planned monthly with the studio. Reels and carousels in a single voice. Audience: trade and design-aware homeowners."         outValue="Q1–Q3" outLabel="planned" />
          <ScopeRow num="04" name="Ad Management"   desc="Paid placements built from the same shoots. Meta & Google sized to the room, routed through the Trade landing pages."                  outValue="Meta · Google" outLabel="" />
        </section>

        {/* FILMS ---------------------------------------------- */}
        <section className="cf-films">
          <div className="cf-films-head">
            <span className="label">04 / Films</span>
            <h3>Six trailers, <b>cut quietly.</b></h3>
            <span className="count">9:16 · 1:1</span>
          </div>
          <div className="cf-films-grid">
            {TRAILERS.map((t) => {
              const poster = photos[t.posterIdx];
              if (!poster) return null;
              return (
                <Trailer
                  key={t.title}
                  poster={poster.src}
                  alt={poster.alt}
                  title={t.title}
                  duration={t.duration}
                />
              );
            })}
          </div>
        </section>

        {/* END ---------------------------------------------- */}
        <section className="cf-end">
          <p className="label">Roll the next reel</p>
          <h3>
            Set the next <b>room.</b>
          </h3>
          <p>
            If your space holds light worth waiting for, we would like to spend
            a season in it. Brand, photography, films, social, and the small
            bright work of advertising.
          </p>
          <Link className="cf-cta" href="/contact">
            Begin a project <span className="arr">→</span>
          </Link>
        </section>

        <footer className="cf-foot">
          <span>
            Designed by <strong>FrameFlow</strong> · Toronto · {client.year ?? "2026"}
          </span>
          <span className="ce">Reel {frameNumber} · CANAPY</span>
          <span className="ri">
            <Link href="/portfolio">All Reels →</Link>
          </span>
        </footer>

        {/* PHOTO LIGHTBOX ---------------------------------- */}
        {isOpen && activePhoto && (
          <div
            className="cf-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${activePhoto.slate} — frame ${modalIndex + 1} of ${total}`}
            onClick={() => setModalIndex(null)}
          >
            <button
              type="button"
              className="cf-modal-nav prev"
              aria-label="Previous photo"
              onClick={(e) => {
                e.stopPropagation();
                setModalIndex((i) =>
                  i === null ? null : (i - 1 + total) % total
                );
              }}
            >
              ←
            </button>

            <div
              className="cf-modal-stage"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="cf-modal-bar top">
                <span className="cf-modal-counter">
                  ★ Frame <b>{String(modalIndex + 1).padStart(2, "0")}</b> / {String(total).padStart(2, "0")}
                </span>
                <span className="cf-modal-brand">CANAPY · DAILIES</span>
                <button
                  type="button"
                  className="cf-modal-close"
                  aria-label="Close"
                  onClick={() => setModalIndex(null)}
                >
                  ×
                </button>
              </div>

              <div className="cf-modal-image-wrap">
                <Image
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  fill
                  sizes="(max-width: 880px) 92vw, 880px"
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>

              <div className="cf-modal-bar bot">
                <span className="cf-modal-slate">{activePhoto.slate}</span>
              </div>
            </div>

            <button
              type="button"
              className="cf-modal-nav next"
              aria-label="Next photo"
              onClick={(e) => {
                e.stopPropagation();
                setModalIndex((i) =>
                  i === null ? null : (i + 1) % total
                );
              }}
            >
              →
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        :global(body:has(.cf-page)) {
          background: #ffffff;
        }
        .cf-page {
          --white:    #ffffff;
          --paper:    #fafaf8;
          --line:     #e5e3df;
          --line-2:   #d5d2cc;
          --ink:      #111111;
          --ink-2:    #5a5750;
          --ink-3:    #8c887f;

          --type:    "Hanken Grotesk", "Inter", system-ui, sans-serif;

          background: var(--white);
          color: var(--ink);
          font-family: var(--type);
          font-weight: 400;
          font-size: 16px;
          line-height: 1.55;
          letter-spacing: -0.005em;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
          position: relative;
        }
        .cf-page :global(a) { color: inherit; text-decoration: none; }
        .cf-page :global(img) { display: block; max-width: 100%; }

        /* TOP RAIL */
        .cf-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 32px;
          background: var(--white);
          border-bottom: 1px solid var(--line);
          font-family: var(--type);
          font-size: 11px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink-3);
          gap: 16px;
          font-weight: 500;
        }
        .cf-top-back { color: var(--ink); white-space: nowrap; }
        .cf-top-back:hover { color: var(--ink-2); }
        .cf-top-frame {
          background: var(--ink);
          color: var(--white);
          padding: 5px 12px;
          letter-spacing: 0.24em;
          white-space: nowrap;
          font-weight: 500;
        }
        .cf-top-meta { white-space: nowrap; color: var(--ink-2); letter-spacing: 0.32em; }
        @media (max-width: 640px) {
          .cf-top { padding: 12px 16px; gap: 12px; font-size: 10px; }
          .cf-top-meta { display: none; }
        }

        /* HERO */
        .cf-hero {
          padding: 140px 48px 100px;
          max-width: 1480px;
          margin: 0 auto;
          text-align: center;
        }
        .cf-hero-eyebrow {
          font-family: var(--type);
          font-size: 11px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--ink-3);
          font-weight: 500;
          margin-bottom: 56px;
        }
        .cf-hero-wordmark {
          font-family: var(--type);
          font-weight: 600;
          font-size: clamp(72px, 14vw, 220px);
          letter-spacing: 0.32em;
          line-height: 1;
          color: var(--ink);
          padding-left: 0.32em;
          margin-bottom: 18px;
        }
        .cf-hero-edition {
          font-family: var(--type);
          font-weight: 500;
          font-size: clamp(14px, 1.6vw, 18px);
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink);
          padding: 18px 0;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          max-width: 480px;
          margin: 0 auto 56px;
        }
        .cf-hero-edition span { color: var(--ink-3); margin: 0 14px; font-weight: 400; }
        .cf-hero-tag {
          font-family: var(--type);
          font-weight: 300;
          font-size: clamp(24px, 3vw, 40px);
          line-height: 1.25;
          letter-spacing: -0.025em;
          color: var(--ink);
          max-width: 22ch;
          margin: 0 auto 56px;
        }
        .cf-hero-scope {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          max-width: 760px;
          margin: 0 auto 64px;
        }
        .cf-hero-scope span {
          padding: 8px 16px;
          border: 1px solid var(--line-2);
          font-family: var(--type);
          font-size: 11px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--ink-2);
          font-weight: 500;
        }
        .cf-hero-meta {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          max-width: 720px;
          margin: 0 auto;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }
        .cf-hero-meta > div {
          padding: 22px 14px;
          border-left: 1px solid var(--line);
        }
        .cf-hero-meta > div:first-child { border-left: 0; }
        .cf-hero-meta dt {
          font-family: var(--type);
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--ink-3);
          font-weight: 500;
          margin-bottom: 8px;
        }
        .cf-hero-meta dd {
          font-family: var(--type);
          font-weight: 300;
          font-size: 28px;
          letter-spacing: -0.02em;
          color: var(--ink);
          line-height: 1;
        }

        /* INTRO */
        .cf-intro {
          padding: 80px 32px 100px;
          max-width: 880px;
          margin: 0 auto;
          text-align: center;
        }
        .cf-intro-cap {
          font-family: var(--type);
          font-size: 11px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--ink-3);
          font-weight: 500;
          margin-bottom: 22px;
        }
        .cf-intro h2 {
          font-family: var(--type);
          font-weight: 300;
          font-size: clamp(32px, 4vw, 56px);
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: var(--ink);
          margin-bottom: 32px;
        }
        .cf-intro h2 b { font-weight: 500; }
        .cf-intro p {
          font-family: var(--type);
          font-weight: 400;
          font-size: 17px;
          line-height: 1.7;
          color: var(--ink-2);
          max-width: 60ch;
          margin: 0 auto 1em;
        }
        .cf-intro p strong { color: var(--ink); font-weight: 500; }

        /* MARKS */
        .cf-marks {
          padding: 100px 32px;
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }
        .cf-marks h3 {
          font-family: var(--type);
          font-weight: 500;
          font-size: 12px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink-3);
          margin-bottom: 24px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--line);
        }
        .cf-palette {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }
        .cf-type-stack { display: flex; flex-direction: column; }

        /* CATALOGUE */
        .cf-cat {
          padding: 100px 32px 60px;
          max-width: 1480px;
          margin: 0 auto;
        }
        .cf-cat-head {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 32px;
          align-items: end;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--line);
        }
        .cf-cat-head .label {
          font-family: var(--type);
          font-size: 11px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--ink-3);
          font-weight: 500;
        }
        .cf-cat-head h3 {
          font-family: var(--type);
          font-weight: 300;
          font-size: clamp(28px, 3.4vw, 48px);
          letter-spacing: -0.02em;
          line-height: 1;
          color: var(--ink);
        }
        .cf-cat-head h3 b { font-weight: 500; }
        .cf-cat-head .count {
          font-family: var(--type);
          font-size: 11px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--ink-3);
          font-weight: 500;
        }
        .cf-cat-head .count b { color: var(--ink); font-weight: 500; }

        .cf-entry {
          display: grid;
          grid-template-columns: 5fr 4fr;
          gap: 56px;
          padding: 56px 0;
          border-bottom: 1px solid var(--line);
          align-items: start;
        }
        .cf-entry.flip > .cf-entry-photo { order: 2; }

        .cf-entry-photo {
          position: relative;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          background: var(--paper);
          cursor: pointer;
          border: 0;
          padding: 0;
          width: 100%;
          font-family: inherit;
          color: inherit;
          text-align: left;
        }
        .cf-entry-photo.land { aspect-ratio: 4 / 3; }
        .cf-entry-photo :global(img) {
          transition: transform 1s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .cf-entry-photo:hover :global(img) { transform: scale(1.03); }
        .cf-entry-photo:focus-visible {
          outline: 1px solid var(--ink);
          outline-offset: 6px;
        }
        .cf-entry-photo .stamp {
          position: absolute;
          top: 14px; left: 14px;
          padding: 4px 8px;
          background: var(--white);
          font-family: var(--type);
          font-size: 10px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--ink);
          font-weight: 500;
          z-index: 2;
        }
        .cf-entry-photo .zoom {
          position: absolute;
          bottom: 14px; right: 14px;
          width: 30px; height: 30px;
          background: var(--white);
          color: var(--ink);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 500;
          opacity: 0;
          transition: opacity 0.3s;
          z-index: 2;
        }
        .cf-entry-photo:hover .zoom,
        .cf-entry-photo:focus-visible .zoom { opacity: 1; }

        .cf-entry-spec { padding-top: 6px; }
        .cf-entry-spec .num {
          font-family: var(--type);
          font-weight: 200;
          font-size: clamp(56px, 7vw, 96px);
          letter-spacing: -0.045em;
          line-height: 0.85;
          color: var(--ink);
          margin-bottom: 16px;
        }
        .cf-entry-spec .sku {
          font-family: var(--type);
          font-size: 11px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink-3);
          font-weight: 500;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--line);
          margin-bottom: 18px;
        }
        .cf-entry-spec .sku b { color: var(--ink); font-weight: 500; }
        .cf-entry-spec h4 {
          font-family: var(--type);
          font-weight: 300;
          font-size: clamp(28px, 3.4vw, 44px);
          line-height: 1.05;
          letter-spacing: -0.025em;
          color: var(--ink);
          margin-bottom: 16px;
        }
        .cf-entry-spec h4 b { font-weight: 500; }
        .cf-entry-spec .blurb {
          font-family: var(--type);
          font-size: 16px;
          line-height: 1.65;
          color: var(--ink-2);
          max-width: 44ch;
          margin-bottom: 28px;
        }
        .cf-entry-spec dl {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          border-top: 1px solid var(--line);
        }
        .cf-entry-spec dl > div {
          padding: 12px 0;
          border-bottom: 1px solid var(--line);
        }
        .cf-entry-spec dl > div:nth-child(odd) { padding-right: 14px; }
        .cf-entry-spec dl > div:nth-child(even) { padding-left: 14px; border-left: 1px solid var(--line); }
        .cf-entry-spec dt {
          font-family: var(--type);
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--ink-3);
          font-weight: 500;
          margin-bottom: 4px;
        }
        .cf-entry-spec dd {
          font-family: var(--type);
          font-weight: 500;
          font-size: 14px;
          letter-spacing: -0.005em;
          color: var(--ink);
        }
        .cf-entry-spec .lab {
          margin-top: 18px;
          font-family: var(--type);
          font-size: 10px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--ink-3);
          font-weight: 500;
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .cf-entry-spec .lab b { color: var(--ink); font-weight: 500; margin-right: 2px; }

        /* CONTACT SHEET */
        .cf-sheet {
          padding: 100px 32px 60px;
          max-width: 1480px;
          margin: 0 auto;
        }
        .cf-sheet-head {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 32px;
          align-items: end;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--line);
          margin-bottom: 32px;
        }
        .cf-sheet-head .label {
          font-family: var(--type);
          font-size: 11px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--ink-3);
          font-weight: 500;
        }
        .cf-sheet-head h3 {
          font-family: var(--type);
          font-weight: 300;
          font-size: clamp(24px, 2.8vw, 40px);
          letter-spacing: -0.02em;
          line-height: 1;
          color: var(--ink);
        }
        .cf-sheet-head h3 b { font-weight: 500; }
        .cf-sheet-head .download {
          font-family: var(--type);
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink);
          padding-bottom: 3px;
          border-bottom: 1px solid var(--ink);
          font-weight: 500;
        }
        .cf-sheet-grid {
          display: grid;
          grid-template-columns: repeat(13, 1fr);
          gap: 6px;
        }
        .cf-sheet-cell {
          position: relative;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          background: var(--paper);
          cursor: pointer;
          border: 0;
          padding: 0;
          width: 100%;
          font-family: inherit;
        }
        .cf-sheet-cell :global(img) {
          transition: transform 0.6s;
        }
        .cf-sheet-cell:hover :global(img) { transform: scale(1.06); }
        .cf-sheet-cell:focus-visible {
          outline: 1px solid var(--ink);
          outline-offset: 4px;
        }
        .cf-sheet-cell .num {
          position: absolute;
          bottom: 4px; left: 4px;
          font-family: var(--type);
          font-size: 8px;
          letter-spacing: 0.18em;
          color: var(--white);
          font-weight: 500;
          mix-blend-mode: difference;
        }

        /* SCOPE */
        .cf-scope {
          padding: 100px 32px;
          max-width: 1280px;
          margin: 0 auto;
          border-top: 1px solid var(--line);
        }
        .cf-scope-head {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 32px;
          align-items: end;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--line);
        }
        .cf-scope-head .label {
          font-family: var(--type);
          font-size: 11px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--ink-3);
          font-weight: 500;
        }
        .cf-scope-head h3 {
          font-family: var(--type);
          font-weight: 300;
          font-size: clamp(28px, 3.4vw, 48px);
          letter-spacing: -0.02em;
          line-height: 1;
          color: var(--ink);
        }
        .cf-scope-head h3 b { font-weight: 500; }
        .cf-scope-head .total {
          font-family: var(--type);
          font-size: 11px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--ink-3);
          font-weight: 500;
        }

        /* FILMS */
        .cf-films {
          padding: 100px 32px 80px;
          max-width: 1480px;
          margin: 0 auto;
        }
        .cf-films-head {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 32px;
          align-items: end;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--line);
          margin-bottom: 32px;
        }
        .cf-films-head .label {
          font-family: var(--type);
          font-size: 11px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--ink-3);
          font-weight: 500;
        }
        .cf-films-head h3 {
          font-family: var(--type);
          font-weight: 300;
          font-size: clamp(28px, 3.4vw, 48px);
          letter-spacing: -0.02em;
          line-height: 1;
          color: var(--ink);
        }
        .cf-films-head h3 b { font-weight: 500; }
        .cf-films-head .count {
          font-family: var(--type);
          font-size: 11px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--ink-3);
          font-weight: 500;
        }
        .cf-films-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        /* END */
        .cf-end {
          padding: 140px 32px 100px;
          max-width: 920px;
          margin: 0 auto;
          text-align: center;
        }
        .cf-end .label {
          font-family: var(--type);
          font-size: 11px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--ink-3);
          font-weight: 500;
          margin-bottom: 22px;
        }
        .cf-end h3 {
          font-family: var(--type);
          font-weight: 300;
          font-size: clamp(40px, 6vw, 88px);
          line-height: 1.05;
          letter-spacing: -0.035em;
          color: var(--ink);
          margin-bottom: 24px;
        }
        .cf-end h3 b { font-weight: 500; }
        .cf-end p {
          font-family: var(--type);
          font-weight: 400;
          font-size: 17px;
          line-height: 1.6;
          color: var(--ink-2);
          max-width: 50ch;
          margin: 0 auto 36px;
        }
        .cf-cta {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 26px;
          background: var(--ink);
          color: var(--white);
          font-family: var(--type);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          border: 1px solid var(--ink);
          transition: background 0.2s, color 0.2s;
        }
        .cf-cta:hover { background: var(--white); color: var(--ink); }
        .cf-cta .arr { transition: transform 0.2s; }
        .cf-cta:hover .arr { transform: translateX(3px); }

        /* FOOTER */
        .cf-foot {
          padding: 22px 32px;
          border-top: 1px solid var(--line);
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 16px;
          align-items: center;
          font-family: var(--type);
          font-size: 11px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink-3);
          font-weight: 500;
        }
        .cf-foot .ce { text-align: center; color: var(--ink); letter-spacing: 0.32em; }
        .cf-foot .ri { text-align: right; }
        .cf-foot strong { color: var(--ink); font-weight: 500; }

        /* PHOTO LIGHTBOX */
        .cf-modal {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px;
          background: rgba(17, 17, 17, 0.92);
          animation: cf-fade 0.22s ease-out;
        }
        @keyframes cf-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .cf-modal-stage {
          position: relative;
          width: min(880px, 92vw);
          height: min(92vh, 1080px);
          max-height: 92vh;
          background: var(--white);
          display: flex;
          flex-direction: column;
          animation: cf-pop 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes cf-pop {
          from { transform: scale(0.96); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        .cf-modal-bar {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          font-family: var(--type);
          font-size: 11px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--ink-2);
          font-weight: 500;
        }
        .cf-modal-bar.top { border-bottom: 1px solid var(--line); justify-content: space-between; }
        .cf-modal-bar.bot {
          border-top: 1px solid var(--line);
          justify-content: center;
          letter-spacing: -0.005em;
          text-transform: none;
          font-weight: 500;
          color: var(--ink);
          font-size: 16px;
        }
        .cf-modal-counter b { color: var(--ink); font-weight: 500; }
        .cf-modal-brand {
          letter-spacing: 0.32em;
          color: var(--ink);
        }
        .cf-modal-close {
          width: 32px; height: 32px;
          background: var(--ink);
          color: var(--white);
          border: 0;
          cursor: pointer;
          font-family: var(--type);
          font-size: 16px;
          font-weight: 400;
          line-height: 1;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .cf-modal-close:hover { background: var(--ink-2); }
        .cf-modal-image-wrap {
          flex: 1 1 auto;
          min-height: 0;
          position: relative;
          background: var(--paper);
          overflow: hidden;
        }
        .cf-modal-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 56px; height: 56px;
          border-radius: 50%;
          background: var(--white);
          color: var(--ink);
          border: 1px solid var(--line);
          cursor: pointer;
          font-family: var(--type);
          font-size: 18px;
          font-weight: 400;
          line-height: 1;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s, background 0.2s;
        }
        .cf-modal-nav:hover { transform: translateY(-50%) scale(1.06); }
        .cf-modal-nav.prev { left: 32px; }
        .cf-modal-nav.next { right: 32px; }

        @media (max-width: 1080px) {
          .cf-films-grid { grid-template-columns: repeat(2, 1fr); }
          .cf-sheet-grid { grid-template-columns: repeat(7, 1fr); }
        }
        @media (max-width: 880px) {
          .cf-hero { padding: 80px 22px 60px; }
          .cf-hero-eyebrow { margin-bottom: 36px; }
          .cf-hero-edition span { display: none; }
          .cf-hero-edition { font-size: 11px; padding: 14px 0; }
          .cf-hero-meta { grid-template-columns: 1fr 1fr; }
          .cf-hero-meta > div:nth-child(3) { border-left: 0; border-top: 1px solid var(--line); }
          .cf-hero-meta > div:nth-child(4) { border-top: 1px solid var(--line); }
          .cf-intro { padding: 60px 22px; }
          .cf-marks { padding: 60px 22px; grid-template-columns: 1fr; gap: 48px; }
          .cf-palette { grid-template-columns: 1fr 1fr; }
          .cf-cat { padding: 60px 22px 40px; }
          .cf-cat-head { grid-template-columns: 1fr 1fr; gap: 12px; }
          .cf-cat-head .label { grid-column: 1 / -1; }
          .cf-entry { grid-template-columns: 1fr; gap: 28px; padding: 48px 0; }
          .cf-entry.flip > .cf-entry-photo { order: 0; }
          .cf-sheet { padding: 60px 22px 40px; }
          .cf-sheet-head { grid-template-columns: 1fr 1fr; gap: 12px; }
          .cf-sheet-head .label { grid-column: 1 / -1; }
          .cf-sheet-grid { grid-template-columns: repeat(5, 1fr); }
          .cf-scope { padding: 60px 22px; }
          .cf-scope-head { grid-template-columns: 1fr 1fr; gap: 12px; }
          .cf-scope-head .label { grid-column: 1 / -1; }
          .cf-films { padding: 60px 22px; }
          .cf-films-head { grid-template-columns: 1fr 1fr; gap: 12px; }
          .cf-films-head .label { grid-column: 1 / -1; }
          .cf-films-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
          .cf-end { padding: 80px 22px 60px; }
          .cf-foot { grid-template-columns: 1fr; gap: 6px; text-align: center; }
          .cf-foot .ri, .cf-foot .ce { text-align: center; }
          .cf-modal { padding: 16px; }
          .cf-modal-nav { width: 44px; height: 44px; font-size: 16px; }
          .cf-modal-nav.prev { left: 8px; }
          .cf-modal-nav.next { right: 8px; }
          .cf-modal-brand { display: none; }
        }
        @media (max-width: 600px) {
          .cf-films-grid { grid-template-columns: 1fr; }
          .cf-palette { grid-template-columns: 1fr; }
          .cf-sheet-grid { grid-template-columns: repeat(4, 1fr); }
          .cf-entry-spec dl { grid-template-columns: 1fr; }
          .cf-entry-spec dl > div:nth-child(even) { padding-left: 0; border-left: 0; }
          .cf-entry-spec dl > div:nth-child(odd) { padding-right: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .cf-modal,
          .cf-modal-stage { animation: none; }
          .cf-modal-close,
          .cf-modal-nav { transition: none; }
          .cf-entry-photo :global(img),
          .cf-sheet-cell :global(img) { transition: none; }
        }
      `}</style>
    </>
  );
}

/* ---------------------- subcomponents ---------------------- */

type ChipCls = "bone" | "paper" | "gray" | "ink";

function PaletteChip({ cls, role, name, hex }: { cls: ChipCls; role: string; name: string; hex: string }) {
  return (
    <div className={`pchip ${cls}`}>
      <span className="role">{role}</span>
      <div>
        <p className="name">{name}</p>
        <p className="hex">{hex}</p>
      </div>
      <style jsx>{`
        .pchip {
          aspect-ratio: 4 / 3;
          padding: 18px;
          border: 1px solid #e5e3df;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .pchip.bone { background: #ffffff; }
        .pchip.paper { background: #fafaf8; }
        .pchip.gray { background: #e7e3dc; }
        .pchip.ink { background: #111111; color: #ffffff; }
        .role {
          font-family: "Hanken Grotesk", system-ui, sans-serif;
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #8c887f;
          font-weight: 500;
        }
        .pchip.ink .role { color: rgba(255,255,255,0.5); }
        .name {
          font-family: "Hanken Grotesk", system-ui, sans-serif;
          font-weight: 500;
          font-size: 16px;
          letter-spacing: -0.005em;
          margin: 0;
        }
        .hex {
          font-family: "Hanken Grotesk", system-ui, sans-serif;
          font-size: 11px;
          letter-spacing: 0.18em;
          color: #5a5750;
          font-weight: 500;
          margin: 2px 0 0;
        }
        .pchip.ink .hex { color: rgba(255,255,255,0.7); }
      `}</style>
    </div>
  );
}

type TypeCls = "h" | "m" | "b" | "l" | "w";

function TypeRow({ label, cls, text }: { label: string; cls: TypeCls; text: string }) {
  return (
    <div className="trow">
      <p className="label">{label}</p>
      <p className={`specimen ${cls}`}>{text}</p>
      <style jsx>{`
        .trow {
          padding: 18px 0;
          border-top: 1px solid #e5e3df;
        }
        .trow:first-child { border-top: 0; padding-top: 0; }
        .label {
          font-family: "Hanken Grotesk", system-ui, sans-serif;
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #8c887f;
          font-weight: 500;
          margin: 0 0 6px;
        }
        .specimen { margin: 0; }
        .specimen.h {
          font-family: "Hanken Grotesk", system-ui, sans-serif;
          font-weight: 200;
          font-size: 40px;
          letter-spacing: -0.04em;
          color: #111111;
          line-height: 1;
        }
        .specimen.m {
          font-family: "Hanken Grotesk", system-ui, sans-serif;
          font-weight: 500;
          font-size: 22px;
          letter-spacing: -0.005em;
          color: #111111;
        }
        .specimen.b {
          font-family: "Hanken Grotesk", system-ui, sans-serif;
          font-weight: 400;
          font-size: 17px;
          line-height: 1.5;
          color: #111111;
        }
        .specimen.l {
          font-family: "Hanken Grotesk", system-ui, sans-serif;
          font-weight: 500;
          font-size: 12px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #111111;
        }
        .specimen.w {
          font-family: "Hanken Grotesk", system-ui, sans-serif;
          font-weight: 600;
          font-size: 28px;
          letter-spacing: 0.32em;
          color: #111111;
          padding-left: 0.32em;
        }
      `}</style>
    </div>
  );
}

function ScopeRow({
  num,
  name,
  desc,
  outValue,
  outLabel,
}: {
  num: string;
  name: string;
  desc: string;
  outValue: string;
  outLabel: string;
}) {
  return (
    <div className="srow">
      <span className="num">{num}.</span>
      <span className="name">{name}</span>
      <p className="desc">{desc}</p>
      <p className="out">
        <b>{outValue}</b>
        {outLabel}
      </p>
      <style jsx>{`
        .srow {
          display: grid;
          grid-template-columns: 60px 1fr 2fr 1fr;
          gap: 32px;
          padding: 28px 0;
          border-bottom: 1px solid #e5e3df;
          align-items: baseline;
        }
        .num {
          font-family: "Hanken Grotesk", system-ui, sans-serif;
          font-size: 12px;
          letter-spacing: 0.24em;
          color: #8c887f;
          font-weight: 500;
        }
        .name {
          font-family: "Hanken Grotesk", system-ui, sans-serif;
          font-weight: 500;
          font-size: 22px;
          letter-spacing: -0.01em;
          color: #111111;
        }
        .desc {
          font-family: "Hanken Grotesk", system-ui, sans-serif;
          font-size: 15px;
          line-height: 1.6;
          color: #5a5750;
          max-width: 56ch;
          margin: 0;
        }
        .out {
          font-family: "Hanken Grotesk", system-ui, sans-serif;
          font-size: 11px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #8c887f;
          text-align: right;
          font-weight: 500;
          margin: 0;
        }
        .out b {
          display: block;
          font-weight: 500;
          font-size: 16px;
          letter-spacing: -0.005em;
          text-transform: none;
          color: #111111;
          margin-bottom: 4px;
        }
        @media (max-width: 880px) {
          .srow { grid-template-columns: 1fr; gap: 8px; padding: 22px 0; }
          .out { text-align: left; }
        }
      `}</style>
    </div>
  );
}

function Trailer({ poster, alt, title, duration }: { poster: string; alt: string; title: string; duration: string }) {
  return (
    <figure className="film">
      <Image
        src={poster}
        alt={alt}
        fill
        sizes="(max-width: 880px) 50vw, 33vw"
        style={{ objectFit: "cover" }}
      />
      <span className="play" aria-hidden>▶</span>
      <div className="meta">
        <b>{title}</b>
        <span>{duration}</span>
      </div>
      <style jsx>{`
        .film {
          position: relative;
          aspect-ratio: 9 / 16;
          overflow: hidden;
          background: #fafaf8;
          cursor: pointer;
          transition: transform 0.4s;
          margin: 0;
        }
        .film:hover { transform: translateY(-3px); }
        .film :global(img) {
          transition: transform 1s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .film:hover :global(img) { transform: scale(1.04); }
        .play {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 56px; height: 56px;
          border-radius: 50%;
          background: rgba(255,255,255,0.92);
          color: #111111;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 500;
          transition: transform 0.4s, background 0.4s;
        }
        .film:hover .play {
          transform: translate(-50%, -50%) scale(1.06);
          background: #ffffff;
        }
        .meta {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 14px;
          background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          font-family: "Hanken Grotesk", system-ui, sans-serif;
          font-size: 10px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.75);
          font-weight: 500;
        }
        .meta b {
          color: #ffffff;
          font-weight: 500;
          font-size: 14px;
          letter-spacing: -0.005em;
          text-transform: none;
        }
      `}</style>
    </figure>
  );
}
