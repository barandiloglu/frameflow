"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type Project = {
  id: number;
  num: string;
  title: string;
  director: string;
  genre: string;
  genreShort: string;
  client: string;
  location: string;
  year: string;
  runtime: string;
  scene: string;
  synopsis: string;
};

const featured: Project = {
  id: 1,
  num: "001",
  title: "Acadia Bakes",
  director: "FrameFlow",
  genre: "Brand Identity · Web · Campaigns",
  genreShort: "Brand Identity",
  client: "Toronto Artisan Bakery",
  location: "Toronto · ON",
  year: "2025",
  runtime: "12 wks",
  scene: "INT. KITCHEN — DAY",
  synopsis:
    "A complete rebrand for a beloved Toronto bakery — new identity, custom typography, photography, packaging, and a full e-commerce site. Rolled out across four locations and a holiday campaign that doubled their seasonal traffic.",
};

const selectedScenes: Project[] = [
  {
    id: 4,
    num: "004",
    title: "Meridian Foods",
    director: "FrameFlow",
    genre: "Brand Film",
    genreShort: "Video",
    client: "Organic Foods · Ontario",
    location: "Niagara · ON",
    year: "2025",
    runtime: "8 wks",
    scene: "EXT. FARM — DAWN",
    synopsis:
      "A three-minute brand film shot on a working Ontario farm, plus a six-part social campaign. Ember-warm grade, hand-lettered titles, zero stock footage.",
  },
  {
    id: 8,
    num: "008",
    title: "Velour Collective",
    director: "FrameFlow",
    genre: "Social · 6-month campaign",
    genreShort: "Social",
    client: "Fashion · Montréal",
    location: "Montréal · QC",
    year: "2024",
    runtime: "24 wks",
    scene: "INT. STUDIO — MAGIC HR",
    synopsis:
      "Six months of weekly Instagram and TikTok production — custom shoots, motion graphics, and a community strategy that grew their following by 4.2× in half a year.",
  },
  {
    id: 2,
    num: "002",
    title: "Nomad Studio",
    director: "FrameFlow",
    genre: "Website Design",
    genreShort: "Web",
    client: "Creative Agency · Vancouver",
    location: "Vancouver · BC",
    year: "2025",
    runtime: "6 wks",
    scene: "EXT. WEB — CONT.",
    synopsis:
      "A custom portfolio site for a creative agency — editorial grid, serif-first typography, and a studio blog that publishes in under a minute from a shared Notion doc.",
  },
];

const indexRows: Project[] = [
  featured,
  {
    id: 2,
    num: "002",
    title: "Nomad Studio",
    director: "FrameFlow",
    genre: "Website Design",
    genreShort: "Web",
    client: "Creative Agency · Vancouver",
    location: "Vancouver",
    year: "2025",
    runtime: "6 wks",
    scene: "EXT. WEB — CONT.",
    synopsis: "",
  },
  {
    id: 3,
    num: "003",
    title: "Lune Café",
    director: "FrameFlow",
    genre: "Social Media",
    genreShort: "Social",
    client: "Specialty Coffee · Toronto",
    location: "Toronto",
    year: "2025",
    runtime: "12 wks",
    scene: "EXT. PATIO — GOLDEN HR",
    synopsis: "",
  },
  {
    id: 4,
    num: "004",
    title: "Meridian Foods",
    director: "FrameFlow",
    genre: "Brand Film",
    genreShort: "Video",
    client: "Organic Foods · Ontario",
    location: "Niagara",
    year: "2025",
    runtime: "8 wks",
    scene: "EXT. FARM — DAWN",
    synopsis: "",
  },
  {
    id: 5,
    num: "005",
    title: "Trove Interiors",
    director: "FrameFlow",
    genre: "Brand Identity",
    genreShort: "Brand",
    client: "Interior Design Studio",
    location: "Toronto",
    year: "2024",
    runtime: "5 wks",
    scene: "INT. SHOWROOM — DUSK",
    synopsis: "",
  },
  {
    id: 6,
    num: "006",
    title: "Sola Health",
    director: "FrameFlow",
    genre: "Ad Campaign",
    genreShort: "Ads",
    client: "Health & Wellness",
    location: "Toronto",
    year: "2024",
    runtime: "4 wks",
    scene: "INT. WAR ROOM — NIGHT",
    synopsis: "",
  },
  {
    id: 7,
    num: "007",
    title: "Birchfield Co.",
    director: "FrameFlow",
    genre: "E-commerce Website",
    genreShort: "Web",
    client: "Sustainable Fashion · Ottawa",
    location: "Ottawa",
    year: "2024",
    runtime: "7 wks",
    scene: "EXT. STOREFRONT — DAY",
    synopsis: "",
  },
  {
    id: 8,
    num: "008",
    title: "Velour Collective",
    director: "FrameFlow",
    genre: "Social · Six-month campaign",
    genreShort: "Social",
    client: "Fashion · Montréal",
    location: "Montréal",
    year: "2024",
    runtime: "24 wks",
    scene: "INT. STUDIO — MAGIC HR",
    synopsis: "",
  },
  {
    id: 9,
    num: "009",
    title: "Harbor Digital",
    director: "FrameFlow",
    genre: "Brand Identity",
    genreShort: "Brand",
    client: "Tech Startup · Toronto",
    location: "Toronto",
    year: "2024",
    runtime: "6 wks",
    scene: "INT. OFFICE — DAY",
    synopsis: "",
  },
  {
    id: 10,
    num: "010",
    title: "Apex Creative",
    director: "FrameFlow",
    genre: "Photo Series",
    genreShort: "Photo",
    client: "Design Products · Calgary",
    location: "Calgary",
    year: "2024",
    runtime: "3 wks",
    scene: "INT. PRODUCT BAY — DAY",
    synopsis: "",
  },
  {
    id: 11,
    num: "011",
    title: "Acadia · Holiday Push",
    director: "FrameFlow",
    genre: "Ad Campaign",
    genreShort: "Ads",
    client: "Toronto Artisan Bakery",
    location: "Toronto",
    year: "2023",
    runtime: "5 wks",
    scene: "EXT. SIDEWALK — SNOW",
    synopsis: "",
  },
];

const marqueeTitles = [
  "Acadia Bakes",
  "Nomad Studio",
  "Lune Café",
  "Meridian Foods",
  "Trove Interiors",
  "Sola Health",
  "Birchfield Co.",
  "Velour Collective",
  "Harbor Digital",
  "Apex Creative",
];

const archiveStats = [
  ["Brand Identity", "14"],
  ["Websites", "09"],
  ["Social Campaigns", "22"],
  ["Film & Photo", "07"],
  ["Ad Campaigns", "11"],
  ["Apps & Products", "04"],
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PortfolioPage() {
  return (
    <>
      <Navbar />

      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <section className="relative bg-surface overflow-hidden pt-[76px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-overlay animate-scan opacity-[0.05]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, var(--color-ivory) 0 1px, transparent 1px 4px)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(var(--color-amber-10) 1px, transparent 1px)",
            backgroundSize: "38px 38px",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 90%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 90%)",
          }}
        />
        <div className="pointer-events-none absolute top-[15%] right-[6%] h-[360px] w-[360px] rounded-full bg-ember-10 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-[8%] left-[4%] h-[280px] w-[280px] rounded-full bg-amber-10 blur-[120px]" />

        {/* REC strip */}
        <div className="relative z-20 border-y border-border-subtle bg-surface/50 backdrop-blur-sm px-6 md:px-[52px] py-3 flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.28em] text-on-surface-60">
          <span className="flex items-center gap-2 text-ember font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-ember animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
            </span>
            NOW SHOWING
          </span>
          <span>FF_ARCHIVE</span>
          <span className="hidden sm:inline text-on-surface-30">/</span>
          <span className="hidden sm:inline">{indexRows.length} TITLES CATALOGUED</span>
          <span className="ml-auto hidden md:flex items-center gap-2">
            <span className="text-on-surface-30">VOL</span>
            <span className="text-amber">I — IV</span>
          </span>
        </div>

        <div className="relative z-10 px-6 md:px-[52px] pt-24 md:pt-32 pb-24">
          <div className="relative max-w-[1500px] mx-auto">
            <span aria-hidden className="pointer-events-none absolute -top-10 -left-3 md:-left-8 w-8 h-8 md:w-10 md:h-10 border-t border-l border-amber/50" />
            <span aria-hidden className="pointer-events-none absolute -top-10 -right-3 md:-right-8 w-8 h-8 md:w-10 md:h-10 border-t border-r border-amber/50" />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-mono text-[11px] uppercase tracking-[0.32em] text-amber mb-7 flex items-center gap-3"
            >
              <span className="block h-px w-10 bg-amber" />
              <span>
                <Link href="/" className="text-on-surface-60 hover:text-amber transition-colors">
                  Home
                </Link>
                <span className="mx-2 text-on-surface-30">/</span>
                Portfolio
              </span>
            </motion.p>

            <h1
              className="font-editorial font-[300] leading-[0.9] tracking-[-0.035em] text-on-surface"
              style={{ fontSize: "clamp(56px, 10.2vw, 172px)" }}
            >
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "108%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.95, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
                  className="block"
                >
                  The <em className="italic text-amber">archive</em>,
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "108%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.95, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                  className="block"
                >
                  scene by <em className="italic">scene</em>.
                </motion.span>
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 flex flex-col md:flex-row md:items-end justify-between gap-10 border-t border-border-subtle pt-10"
            >
              <p className="max-w-[560px] font-warm text-[15px] font-[300] leading-[1.75] text-on-surface-60">
                Selected work from the FrameFlow studio — branding, digital, social,
                and film. No filters. Just the reel, front to back.
              </p>
              <div className="grid grid-cols-3 gap-8 font-mono text-[10px] uppercase tracking-[0.22em] text-on-surface-60">
                <div>
                  <span className="block text-on-surface-30 mb-2">Titles</span>
                  <span className="font-editorial font-[300] text-[44px] text-amber leading-none tracking-[-0.02em]">
                    {String(indexRows.length).padStart(3, "0")}
                  </span>
                </div>
                <div>
                  <span className="block text-on-surface-30 mb-2">Years</span>
                  <span className="font-editorial font-[300] text-[44px] text-on-surface leading-none tracking-[-0.02em]">
                    05
                  </span>
                </div>
                <div>
                  <span className="block text-on-surface-30 mb-2">Cities</span>
                  <span className="font-editorial font-[300] text-[44px] text-on-surface leading-none tracking-[-0.02em]">
                    06
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TITLES MARQUEE                                              */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-surface-alt border-y border-on-alt-10">
        <div className="flex w-max animate-ticker-slow items-center py-9">
          {[...marqueeTitles, ...marqueeTitles, ...marqueeTitles].map((title, i) => (
            <span key={i} className="flex items-center gap-12 pr-12 shrink-0">
              <span
                className="font-editorial italic font-[300] leading-none text-on-alt"
                style={{ fontSize: "clamp(44px, 7vw, 110px)" }}
              >
                {title}
              </span>
              <span
                className="font-editorial not-italic text-ember font-[300] leading-none"
                style={{ fontSize: "clamp(30px, 5vw, 76px)" }}
              >
                ✦
              </span>
            </span>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  NOW SHOWING — Featured case                                 */}
      {/* ============================================================ */}
      <section className="relative bg-surface px-6 md:px-[52px] py-[140px] overflow-hidden">
        <div className="pointer-events-none absolute top-[10%] right-[-5%] h-[400px] w-[400px] rounded-full bg-amber-10 blur-[160px]" />

        <div className="relative max-w-[1500px] mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12 font-mono text-[11px] uppercase tracking-[0.32em] text-amber flex items-center gap-3"
          >
            <span className="block h-px w-10 bg-amber" />
            Frame · 01 — Now Showing
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start">
            {/* Left — meta slate */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9 }}
              className="lg:sticky lg:top-[96px]"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ember mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse-dot" />
                Feature presentation · {featured.num}
              </p>

              <h2
                className="font-editorial font-[300] leading-[0.9] tracking-[-0.03em] text-on-surface mb-8"
                style={{ fontSize: "clamp(52px, 7vw, 128px)" }}
              >
                <em className="italic text-amber">{featured.title}</em>
              </h2>

              <p className="font-warm text-[15px] font-[300] leading-[1.85] text-on-surface-60 max-w-[480px] mb-10">
                {featured.synopsis}
              </p>

              <div className="border-y border-border-subtle divide-y divide-border-subtle">
                {[
                  ["Directed by", featured.director],
                  ["Genre", featured.genre],
                  ["Client", featured.client],
                  ["Location", featured.location],
                  ["Year", featured.year],
                  ["Runtime", featured.runtime],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between gap-6 py-3.5"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-on-surface-30">
                      {k}
                    </span>
                    <span className="font-warm text-[13px] text-on-surface text-right">
                      {v}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="group mt-10 inline-flex items-center gap-3 bg-amber text-graphite font-mono text-[12px] font-medium tracking-[0.22em] uppercase py-[14px] pl-6 pr-7 no-underline transition-all duration-300 hover:bg-ember hover:text-ivory"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-graphite group-hover:bg-ivory transition-colors" />
                Read the full case
                <span className="font-editorial text-[18px] leading-none">→</span>
              </Link>
            </motion.div>

            {/* Right — film still poster */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: 0.15 }}
            >
              <FilmStill project={featured} size="large" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  THE INDEX                                                   */}
      {/* ============================================================ */}
      <section className="relative bg-surface-alt border-y border-on-alt-10 px-6 md:px-[52px] py-[140px]">
        <div className="max-w-[1500px] mx-auto">
          <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div>
              <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.32em] text-ember flex items-center gap-3">
                <span className="block h-px w-10 bg-ember" />
                Frame · 02 — The Index
              </p>
              <h2
                className="font-editorial font-[300] leading-[0.92] tracking-[-0.025em] text-on-alt"
                style={{ fontSize: "clamp(44px, 6vw, 100px)" }}
              >
                Every title,
                <br />
                on the <em className="italic text-amber">record</em>.
              </h2>
            </div>
            <p className="max-w-[360px] font-warm text-[13px] font-[300] leading-[1.75] text-on-alt-80 md:text-right">
              Hover a row to preview the scene. Every frame is a conversation — ask us about
              any of them.
            </p>
          </div>

          {/* Column headers */}
          <div className="hidden md:grid grid-cols-[80px_minmax(0,3fr)_minmax(0,1.4fr)_minmax(0,1.1fr)_80px] gap-6 border-y border-on-alt-10 py-4 font-mono text-[10px] uppercase tracking-[0.24em] text-on-alt-60">
            <span>Frame</span>
            <span>Title</span>
            <span>Genre</span>
            <span>Year / Run</span>
            <span className="text-right">Act</span>
          </div>

          {/* Rows */}
          <div>
            {indexRows.map((p, i) => (
              <motion.div
                key={`${p.id}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: i * 0.04 }}
              >
                <IndexRow project={p} isFeatured={i === 0} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SELECTED SCENES                                             */}
      {/* ============================================================ */}
      <section className="relative bg-surface px-6 md:px-[52px] py-[140px]">
        <div className="max-w-[1500px] mx-auto">
          <div className="mb-20">
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.32em] text-amber flex items-center gap-3">
              <span className="block h-px w-10 bg-amber" />
              Frame · 03 — Selected Scenes
            </p>
            <h2
              className="font-editorial font-[300] leading-[0.95] tracking-[-0.025em] text-on-surface max-w-[1100px]"
              style={{ fontSize: "clamp(44px, 6vw, 100px)" }}
            >
              Three more <em className="italic text-amber">cuts</em>
              <br />
              from the vault.
            </h2>
          </div>

          <div className="flex flex-col gap-24">
            {selectedScenes.map((project, i) => (
              <SelectedScene key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  ARCHIVE STATS                                               */}
      {/* ============================================================ */}
      <section className="relative bg-surface-alt border-y border-on-alt-10 px-6 md:px-[52px] py-[110px]">
        <div className="max-w-[1500px] mx-auto">
          <p className="mb-14 font-mono text-[11px] uppercase tracking-[0.32em] text-on-alt-60 flex items-center gap-3">
            <span className="block h-px w-10 bg-on-alt-30" />
            Frame · 04 — Archive Manifest
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-on-alt-10 border border-on-alt-10">
            {archiveStats.map(([k, v], i) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="bg-surface-alt p-8"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-on-alt-60 mb-3">
                  {k}
                </p>
                <p className="font-editorial font-[300] text-on-alt leading-none tracking-[-0.02em] text-[56px]">
                  {v}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CTA                                                         */}
      {/* ============================================================ */}
      <section className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
        <div className="relative flex flex-col justify-between overflow-hidden bg-ember text-graphite px-6 md:px-[60px] pt-16 pb-20 lg:pt-20 lg:pb-[100px]">
          <div
            aria-hidden
            className="absolute top-0 left-0 right-0 h-9"
            style={{
              background:
                "repeating-linear-gradient(-68deg, #ffffeb 0 28px, #353230 28px 56px)",
            }}
          />
          <div aria-hidden className="absolute top-9 left-0 right-0 h-[2px] bg-graphite" />

          <div className="pt-10">
            <p className="mb-7 font-mono text-[11px] uppercase tracking-[0.28em] text-graphite/70 flex items-center gap-3">
              <span className="block h-px w-10 bg-graphite/60" />
              Your title, next on the reel?
            </p>
            <h2
              className="font-editorial font-[300] leading-[0.92] tracking-[-0.025em] text-graphite"
              style={{ fontSize: "clamp(44px, 6.2vw, 104px)" }}
            >
              Let&apos;s shoot the
              <br />
              <em className="italic">next one</em>.
            </h2>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 bg-graphite text-ivory font-mono text-[12px] font-medium tracking-[0.22em] uppercase py-[18px] pl-7 pr-9 no-underline transition-all duration-300 hover:bg-ivory hover:text-graphite"
            >
              <span className="w-2 h-2 rounded-full bg-ember animate-pulse-dot" />
              Start a project
              <span className="font-editorial text-[18px] leading-none">→</span>
            </Link>
            <Link
              href="/services"
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/80 hover:text-graphite underline decoration-graphite/30 underline-offset-4"
            >
              / browse the scenes
            </Link>
          </div>
        </div>

        <div className="relative flex flex-col justify-center bg-surface-alt px-6 md:px-[60px] py-20 lg:py-[100px]">
          <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.28em] text-on-alt-60 flex items-center gap-3">
            <span className="block h-px w-10 bg-on-alt-30" />
            Now booking · 2026
          </p>
          <div className="flex flex-col gap-6">
            {[
              { k: "01 · Next slot", v: "Mid-May 2026 (Q2 block)" },
              { k: "02 · Typical run", v: "4–12 weeks from kickoff to delivery" },
              { k: "03 · Engagement", v: "One-time project or ongoing retainer" },
            ].map((row, i, arr) => (
              <div key={row.k}>
                <div className="flex items-baseline gap-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber w-28 shrink-0">
                    {row.k}
                  </span>
                  <p className="font-warm text-[14px] font-[300] leading-[1.7] text-on-alt flex-1">
                    {row.v}
                  </p>
                </div>
                {i < arr.length - 1 && <div className="mt-6 h-[1px] w-full bg-on-alt-10" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  FilmStill — decorative poster block                                */
/* ------------------------------------------------------------------ */

function FilmStill({
  project,
  size = "default",
}: {
  project: Project;
  size?: "default" | "large";
}) {
  return (
    <div
      className={`relative border border-amber/30 bg-graphite overflow-hidden ${
        size === "large" ? "aspect-[4/5]" : "aspect-[5/4]"
      }`}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,235,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,235,0.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-overlay opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #ffffeb 0 1px, transparent 1px 3px)",
        }}
      />
      <div className="absolute inset-4 border border-dashed border-amber/25" />

      {/* diagonal ember beam */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/4 -right-1/3 h-[180%] w-1/2 bg-gradient-to-b from-ember/20 via-amber/10 to-transparent blur-[40px] rotate-[18deg]"
      />

      {/* giant italic numeral */}
      <span
        className="absolute bottom-[-8%] left-[-2%] font-editorial italic font-[300] text-ivory/15 leading-none select-none"
        style={{ fontSize: size === "large" ? "clamp(220px, 28vw, 460px)" : "clamp(160px, 20vw, 320px)" }}
      >
        {project.num}
      </span>

      {/* top meta */}
      <div className="absolute top-6 left-6 flex flex-col gap-1 font-mono text-[10px] uppercase tracking-[0.22em]">
        <span className="text-amber">Frame · {project.num}</span>
        <span className="text-ivory/40">{project.scene}</span>
      </div>

      {/* top right — REC */}
      <div className="absolute top-6 right-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ember">
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 rounded-full bg-ember animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
        </span>
        Print
      </div>

      {/* title block */}
      <div className="absolute bottom-6 left-6 right-6 z-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ember mb-3">
          / {project.genreShort}
        </p>
        <h3
          className="font-editorial font-[300] italic text-ivory leading-[0.9] tracking-[-0.02em]"
          style={{ fontSize: size === "large" ? "clamp(40px, 5vw, 78px)" : "clamp(30px, 4vw, 56px)" }}
        >
          {project.title}
        </h3>
        <div className="mt-5 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.22em] text-ivory/50">
          <span>{project.location}</span>
          <span className="text-amber">{project.year}</span>
        </div>
      </div>

      {/* corner brackets */}
      <span aria-hidden className="absolute top-5 left-5 w-3 h-3 border-t border-l border-amber/50" />
      <span aria-hidden className="absolute top-5 right-5 w-3 h-3 border-t border-r border-amber/50" />
      <span aria-hidden className="absolute bottom-5 left-5 w-3 h-3 border-b border-l border-amber/50" />
      <span aria-hidden className="absolute bottom-5 right-5 w-3 h-3 border-b border-r border-amber/50" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  IndexRow — editorial list row                                      */
/* ------------------------------------------------------------------ */

function IndexRow({ project, isFeatured }: { project: Project; isFeatured?: boolean }) {
  return (
    <div className="group relative grid grid-cols-[60px_1fr] md:grid-cols-[80px_minmax(0,3fr)_minmax(0,1.4fr)_minmax(0,1.1fr)_80px] gap-x-6 gap-y-2 border-b border-on-alt-10 py-6 md:py-7 items-baseline cursor-pointer transition-colors duration-300 hover:bg-on-alt-05">
      <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-amber">
        {project.num}
      </span>

      <div className="md:col-span-1">
        <h3
          className="font-editorial font-[300] italic leading-[1.02] tracking-[-0.01em] text-on-alt group-hover:text-amber transition-colors"
          style={{ fontSize: "clamp(28px, 3.4vw, 52px)" }}
        >
          {project.title}
          {isFeatured && (
            <span className="ml-4 align-middle inline-flex items-center gap-1.5 border border-ember/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-ember not-italic font-normal">
              <span className="w-1 h-1 rounded-full bg-ember animate-pulse-dot" />
              Now showing
            </span>
          )}
        </h3>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-on-alt-60 flex flex-wrap items-center gap-2">
          <span className="text-ember">{project.scene}</span>
          <span className="text-on-alt-30">·</span>
          <span>{project.client}</span>
        </p>
      </div>

      <div className="hidden md:block font-mono text-[11px] uppercase tracking-[0.22em] text-on-alt-80">
        {project.genre}
      </div>

      <div className="hidden md:flex flex-col gap-1 font-mono text-[11px] uppercase tracking-[0.22em]">
        <span className="text-on-alt">{project.year}</span>
        <span className="text-on-alt-60">{project.runtime}</span>
      </div>

      <div className="hidden md:flex justify-end">
        <span className="font-editorial not-italic text-[22px] text-on-alt-30 group-hover:text-amber group-hover:translate-x-1 transition-all duration-300">
          →
        </span>
      </div>

      {/* mobile secondary row */}
      <div className="md:hidden col-start-2 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-on-alt-60">
        <span>{project.genreShort}</span>
        <span className="text-on-alt-30">·</span>
        <span className="text-amber">{project.year}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SelectedScene — alternating editorial block                        */
/* ------------------------------------------------------------------ */

function SelectedScene({ project, index }: { project: Project; index: number }) {
  const flipped = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
    >
      <div className={`lg:col-span-7 ${flipped ? "lg:order-2" : ""}`}>
        <FilmStill project={project} />
      </div>

      <div className={`lg:col-span-5 ${flipped ? "lg:order-1" : ""}`}>
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ember mb-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-ember" />
          Scene · {project.num}
        </p>
        <h3
          className="font-editorial font-[300] italic leading-[0.95] tracking-[-0.025em] text-on-surface mb-6"
          style={{ fontSize: "clamp(40px, 5vw, 82px)" }}
        >
          {project.title}
        </h3>
        <p className="font-warm text-[14px] font-[300] leading-[1.85] text-on-surface-60 mb-8 max-w-[480px]">
          {project.synopsis}
        </p>

        <div className="border-y border-border-subtle divide-y divide-border-subtle max-w-[480px]">
          {[
            ["Genre", project.genre],
            ["Client", project.client],
            ["Location", project.location],
            ["Year", `${project.year} · ${project.runtime}`],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-6 py-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-on-surface-30">
                {k}
              </span>
              <span className="font-warm text-[13px] text-on-surface text-right">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
