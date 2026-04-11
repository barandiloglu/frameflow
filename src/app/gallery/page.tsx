"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Tone = "warm" | "ember" | "dusk" | "shadow" | "amber" | "cool";
type Aspect = "4/5" | "5/4" | "1/1" | "16/10" | "3/4" | "4/3" | "7/5" | "2/1";

type Print = {
  num: string;
  title: string;
  location: string;
  date: string;
  aperture: string;
  shutter: string;
  iso: string;
  film: string;
  lens: string;
  tone: Tone;
  aspect: Aspect;
};

/* ------------------------------------------------------------------ */
/*  Data — prints are metadata-only for now                            */
/* ------------------------------------------------------------------ */

const featuredPrint: Print = {
  num: "001",
  title: "Acadia · Morning Rush",
  location: "Toronto · ON · Canada",
  date: "2025.11.14",
  aperture: "f/2.0",
  shutter: "1/500s",
  iso: "ISO 400",
  film: "Kodak Portra 400",
  lens: "Summilux 50mm",
  tone: "warm",
  aspect: "4/5",
};

const contactSheet: Print[] = [
  {
    num: "002",
    title: "Meridian · Hay Rows",
    location: "Niagara · ON",
    date: "2025.09.04",
    aperture: "f/5.6",
    shutter: "1/250s",
    iso: "ISO 100",
    film: "Kodak Ektar 100",
    lens: "80mm",
    tone: "dusk",
    aspect: "4/5",
  },
  {
    num: "003",
    title: "Lune · Counter",
    location: "Toronto · ON",
    date: "2025.08.22",
    aperture: "f/1.4",
    shutter: "1/2000s",
    iso: "ISO 800",
    film: "Cinestill 800T",
    lens: "35mm",
    tone: "ember",
    aspect: "1/1",
  },
  {
    num: "004",
    title: "Velour · Fitting Room",
    location: "Montréal · QC",
    date: "2025.07.18",
    aperture: "f/2.8",
    shutter: "1/125s",
    iso: "ISO 400",
    film: "Ilford HP5+",
    lens: "50mm",
    tone: "shadow",
    aspect: "4/5",
  },
  {
    num: "005",
    title: "Harbor · Rooftop",
    location: "Toronto · ON",
    date: "2025.06.02",
    aperture: "f/8",
    shutter: "1/1000s",
    iso: "ISO 200",
    film: "Fujifilm Pro 400H",
    lens: "24mm",
    tone: "cool",
    aspect: "16/10",
  },
  {
    num: "006",
    title: "Trove · Clay Studio",
    location: "Toronto · ON",
    date: "2025.05.19",
    aperture: "f/2.8",
    shutter: "1/60s",
    iso: "ISO 1600",
    film: "Kodak Tri-X 400",
    lens: "28mm",
    tone: "amber",
    aspect: "1/1",
  },
  {
    num: "007",
    title: "Apex · Ceramic No. 3",
    location: "Calgary · AB",
    date: "2025.04.11",
    aperture: "f/11",
    shutter: "1/125s",
    iso: "ISO 100",
    film: "Kodak Ektar 100",
    lens: "90mm macro",
    tone: "warm",
    aspect: "4/5",
  },
  {
    num: "008",
    title: "Acadia · Cinnamon",
    location: "Toronto · ON",
    date: "2025.04.04",
    aperture: "f/4",
    shutter: "1/250s",
    iso: "ISO 400",
    film: "Kodak Portra 400",
    lens: "80mm",
    tone: "ember",
    aspect: "1/1",
  },
  {
    num: "009",
    title: "Birchfield · Linens",
    location: "Ottawa · ON",
    date: "2025.03.22",
    aperture: "f/4",
    shutter: "1/500s",
    iso: "ISO 400",
    film: "Fujifilm Pro 400H",
    lens: "50mm",
    tone: "dusk",
    aspect: "4/5",
  },
  {
    num: "010",
    title: "Meridian · Greenhouse",
    location: "Niagara · ON",
    date: "2025.03.09",
    aperture: "f/5.6",
    shutter: "1/1000s",
    iso: "ISO 200",
    film: "Kodak Gold 200",
    lens: "35mm",
    tone: "warm",
    aspect: "2/1",
  },
  {
    num: "011",
    title: "Sola · Morning Light",
    location: "Toronto · ON",
    date: "2025.02.17",
    aperture: "f/2.0",
    shutter: "1/250s",
    iso: "ISO 400",
    film: "Fujifilm Pro 400H",
    lens: "50mm",
    tone: "cool",
    aspect: "5/4",
  },
];

const rolls = [
  {
    id: "R01",
    num: "Roll · 01",
    title: "Acadia Bakes",
    subtitle: "On location · before open",
    location: "Toronto · Late Autumn",
    date: "November 2025",
    stock: "Kodak Portra 400",
    camera: "Leica M6",
    frames: [
      { num: "001", label: "Morning Rush", tone: "warm" as Tone, aspect: "4/5" as Aspect },
      { num: "002", label: "Proof & Rest", tone: "ember" as Tone, aspect: "4/5" as Aspect },
      { num: "003", label: "Counter Crop", tone: "amber" as Tone, aspect: "4/5" as Aspect },
      { num: "004", label: "Oven Glow", tone: "ember" as Tone, aspect: "4/5" as Aspect },
    ],
  },
  {
    id: "R02",
    num: "Roll · 02",
    title: "Meridian Foods",
    subtitle: "Brand film stills",
    location: "Niagara · Golden Hour",
    date: "September 2025",
    stock: "Kodak Ektar 100",
    camera: "Hasselblad 500C/M",
    frames: [
      { num: "005", label: "First Light", tone: "dusk" as Tone, aspect: "4/5" as Aspect },
      { num: "006", label: "Hay Rows", tone: "warm" as Tone, aspect: "4/5" as Aspect },
      { num: "007", label: "Greenhouse", tone: "cool" as Tone, aspect: "4/5" as Aspect },
      { num: "008", label: "Harvest Crate", tone: "amber" as Tone, aspect: "4/5" as Aspect },
    ],
  },
  {
    id: "R03",
    num: "Roll · 03",
    title: "Lune Café",
    subtitle: "Blue hour to last pour",
    location: "Toronto · Dusk",
    date: "August 2025",
    stock: "Cinestill 800T",
    camera: "Canon A-1",
    frames: [
      { num: "009", label: "Neon Signage", tone: "ember" as Tone, aspect: "4/5" as Aspect },
      { num: "010", label: "Counter", tone: "shadow" as Tone, aspect: "4/5" as Aspect },
      { num: "011", label: "Last Pour", tone: "ember" as Tone, aspect: "4/5" as Aspect },
      { num: "012", label: "Closing Light", tone: "dusk" as Tone, aspect: "4/5" as Aspect },
    ],
  },
];

const marqueeStocks = [
  "Portra 400",
  "Ektar 100",
  "Tri-X 400",
  "HP5+",
  "Cinestill 800T",
  "Pro 400H",
  "Gold 200",
  "Velvia 50",
];

const archiveStats: [string, string][] = [
  ["Prints developed", "284"],
  ["Rolls shot", "47"],
  ["Film stocks", "11"],
  ["Cameras in rotation", "06"],
  ["Cities on set", "08"],
  ["Years in the dark", "05"],
];

/* ------------------------------------------------------------------ */
/*  Tone styles                                                        */
/* ------------------------------------------------------------------ */

const toneStyles: Record<Tone, { bg: string; beam: string; vignette: string; tag: string }> = {
  warm: {
    bg: "linear-gradient(135deg, rgba(211,143,44,0.35) 0%, rgba(212,89,56,0.2) 50%, rgba(53,50,48,1) 100%)",
    beam: "from-amber/30 via-ember/15 to-transparent",
    vignette: "radial-gradient(ellipse 80% 60% at 30% 30%, transparent 0%, rgba(53,50,48,0.8) 100%)",
    tag: "text-amber",
  },
  ember: {
    bg: "linear-gradient(155deg, rgba(212,89,56,0.5) 0%, rgba(211,143,44,0.18) 50%, rgba(53,50,48,1) 100%)",
    beam: "from-ember/40 via-amber/15 to-transparent",
    vignette: "radial-gradient(ellipse 70% 55% at 65% 35%, transparent 0%, rgba(53,50,48,0.85) 100%)",
    tag: "text-ember",
  },
  dusk: {
    bg: "linear-gradient(170deg, rgba(211,143,44,0.22) 0%, rgba(53,50,48,0.9) 45%, rgba(53,50,48,1) 100%)",
    beam: "from-amber/20 via-transparent to-transparent",
    vignette: "radial-gradient(ellipse 60% 70% at 50% 40%, transparent 0%, rgba(53,50,48,0.9) 100%)",
    tag: "text-amber",
  },
  shadow: {
    bg: "linear-gradient(190deg, rgba(53,50,48,0.6) 0%, rgba(0,0,0,0.9) 100%)",
    beam: "from-ivory/10 via-transparent to-transparent",
    vignette: "radial-gradient(ellipse 80% 90% at 50% 50%, transparent 0%, rgba(0,0,0,0.7) 100%)",
    tag: "text-on-surface-60",
  },
  amber: {
    bg: "linear-gradient(140deg, rgba(211,143,44,0.55) 0%, rgba(211,143,44,0.2) 40%, rgba(53,50,48,1) 100%)",
    beam: "from-amber/45 via-amber/10 to-transparent",
    vignette: "radial-gradient(ellipse 60% 50% at 40% 30%, transparent 0%, rgba(53,50,48,0.85) 100%)",
    tag: "text-amber",
  },
  cool: {
    bg: "linear-gradient(200deg, rgba(255,255,235,0.18) 0%, rgba(53,50,48,0.85) 50%, rgba(53,50,48,1) 100%)",
    beam: "from-ivory/15 via-transparent to-transparent",
    vignette: "radial-gradient(ellipse 65% 60% at 35% 35%, transparent 0%, rgba(53,50,48,0.9) 100%)",
    tag: "text-on-surface-60",
  },
};

const aspectClass: Record<Aspect, string> = {
  "4/5": "aspect-[4/5]",
  "5/4": "aspect-[5/4]",
  "1/1": "aspect-square",
  "16/10": "aspect-[16/10]",
  "3/4": "aspect-[3/4]",
  "4/3": "aspect-[4/3]",
  "7/5": "aspect-[7/5]",
  "2/1": "aspect-[2/1]",
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function GalleryPage() {
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
        <div className="pointer-events-none absolute top-[16%] right-[8%] h-[360px] w-[360px] rounded-full bg-ember-10 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-[6%] left-[4%] h-[260px] w-[260px] rounded-full bg-amber-10 blur-[130px]" />

        {/* REC strip */}
        <div className="relative z-20 border-y border-border-subtle bg-surface/50 backdrop-blur-sm px-6 md:px-[52px] py-3 flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.28em] text-on-surface-60">
          <span className="flex items-center gap-2 text-ember font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-ember animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
            </span>
            DEVELOPING
          </span>
          <span>FF_DARKROOM</span>
          <span className="hidden sm:inline text-on-surface-30">/</span>
          <span className="hidden sm:inline">284 PRINTS · 47 ROLLS</span>
          <span className="ml-auto hidden md:flex items-center gap-2">
            <span className="text-on-surface-30">TEMP</span>
            <span className="text-amber">20°C · SAFELIGHT</span>
          </span>
        </div>

        <div className="relative z-10 px-6 md:px-[52px] pt-24 md:pt-32 pb-24">
          <div className="relative max-w-[1500px] mx-auto">
            <span
              aria-hidden
              className="pointer-events-none absolute -top-10 -left-3 md:-left-8 w-8 h-8 md:w-10 md:h-10 border-t border-l border-amber/50"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -top-10 -right-3 md:-right-8 w-8 h-8 md:w-10 md:h-10 border-t border-r border-amber/50"
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-mono text-[11px] uppercase tracking-[0.32em] text-amber mb-7 flex items-center gap-3"
            >
              <span className="block h-px w-10 bg-amber" />
              <span>
                <Link
                  href="/"
                  className="text-on-surface-60 hover:text-amber transition-colors"
                >
                  Home
                </Link>
                <span className="mx-2 text-on-surface-30">/</span>
                Gallery
              </span>
            </motion.p>

            <h1
              className="font-editorial font-[300] leading-[0.9] tracking-[-0.035em] text-on-surface"
              style={{ fontSize: "clamp(56px, 10vw, 172px)" }}
            >
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "108%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.95, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
                  className="block"
                >
                  Prints from
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "108%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.95, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                  className="block"
                >
                  the <em className="italic text-amber">darkroom</em>.
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
                Photography from the FrameFlow studio — shot on location, mostly on film,
                mostly at golden hour. Every frame tagged with its roll, stock, and lens.
              </p>
              <div className="grid grid-cols-3 gap-8 font-mono text-[10px] uppercase tracking-[0.22em] text-on-surface-60">
                {[
                  ["Prints", "284"],
                  ["Rolls", "047"],
                  ["Cameras", "06"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <span className="block text-on-surface-30 mb-2">{k}</span>
                    <span className="font-editorial font-[300] text-[42px] md:text-[52px] text-amber leading-none tracking-[-0.02em]">
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FILM STOCK MARQUEE                                          */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-surface-alt border-y border-on-alt-10">
        <div className="flex w-max animate-ticker-slow items-center py-9">
          {[...marqueeStocks, ...marqueeStocks, ...marqueeStocks].map((stock, i) => (
            <span key={i} className="flex items-center gap-12 pr-12 shrink-0">
              <span
                className="font-editorial italic font-[300] leading-none text-on-alt"
                style={{ fontSize: "clamp(44px, 7vw, 108px)" }}
              >
                {stock}
              </span>
              <span
                className="font-editorial not-italic text-ember font-[300] leading-none"
                style={{ fontSize: "clamp(30px, 5vw, 72px)" }}
              >
                ✦
              </span>
            </span>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FEATURED PRINT                                              */}
      {/* ============================================================ */}
      <section className="relative bg-surface px-6 md:px-[52px] py-[140px] overflow-hidden">
        <div className="pointer-events-none absolute top-[10%] left-[-5%] h-[400px] w-[400px] rounded-full bg-amber-10 blur-[160px]" />

        <div className="relative max-w-[1500px] mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12 font-mono text-[11px] uppercase tracking-[0.32em] text-amber flex items-center gap-3"
          >
            <span className="block h-px w-10 bg-amber" />
            Frame · 01 — Featured Print
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-10 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.9 }}
            >
              <PrintBlock print={featuredPrint} size="hero" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="lg:sticky lg:top-[96px]"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ember mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse-dot" />
                Print · {featuredPrint.num}
              </p>

              <h2
                className="font-editorial font-[300] italic leading-[0.92] tracking-[-0.025em] text-on-surface mb-8"
                style={{ fontSize: "clamp(40px, 5vw, 80px)" }}
              >
                {featuredPrint.title}
              </h2>

              <p className="font-warm text-[14px] font-[300] leading-[1.85] text-on-surface-60 mb-10 max-w-[440px]">
                Shot on {featuredPrint.film} at 6:48 AM, before the first loaves came out of the
                oven. Ambient only, pushed one stop in the scan. Printed at 16×20 on
                fiber-based paper.
              </p>

              {/* EXIF slate */}
              <div className="border-y border-border-subtle">
                {[
                  ["Date", featuredPrint.date],
                  ["Location", featuredPrint.location],
                  ["Film stock", featuredPrint.film],
                  ["Lens", featuredPrint.lens],
                  ["Aperture", featuredPrint.aperture],
                  ["Shutter", featuredPrint.shutter],
                  ["ISO", featuredPrint.iso],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between gap-6 py-3 border-b border-border-subtle last:border-b-0"
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CONTACT SHEET                                               */}
      {/* ============================================================ */}
      <section className="relative bg-surface-alt border-y border-on-alt-10 px-6 md:px-[52px] py-[140px]">
        <div className="max-w-[1500px] mx-auto">
          <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div>
              <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.32em] text-ember flex items-center gap-3">
                <span className="block h-px w-10 bg-ember" />
                Frame · 02 — The Contact Sheet
              </p>
              <h2
                className="font-editorial font-[300] leading-[0.92] tracking-[-0.025em] text-on-alt"
                style={{ fontSize: "clamp(44px, 6vw, 100px)" }}
              >
                Every print,
                <br />
                on the <em className="italic text-amber">table</em>.
              </h2>
            </div>
            <p className="max-w-[380px] font-warm text-[13px] font-[300] leading-[1.75] text-on-alt-80 md:text-right">
              Arrange as you like. Hover for EXIF. Each frame is developed, fixed, and
              ready for print.
            </p>
          </div>

          {/* grid — asymmetric, matches photo sizes */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5">
            <div className="col-span-2 row-span-2 md:col-span-2 md:row-span-2">
              <PrintBlock print={contactSheet[0]} />
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-2">
              <PrintBlock print={contactSheet[1]} />
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2">
              <PrintBlock print={contactSheet[2]} />
            </div>

            <div className="col-span-2 md:col-span-2 lg:col-span-2">
              <PrintBlock print={contactSheet[3]} />
            </div>

            <div className="col-span-2 md:col-span-2 lg:col-span-3">
              <PrintBlock print={contactSheet[4]} />
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <PrintBlock print={contactSheet[5]} />
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-2">
              <PrintBlock print={contactSheet[6]} />
            </div>

            <div className="col-span-1 md:col-span-2 lg:col-span-2">
              <PrintBlock print={contactSheet[7]} />
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-2">
              <PrintBlock print={contactSheet[8]} />
            </div>
            <div className="col-span-2 md:col-span-4 lg:col-span-2">
              <PrintBlock print={contactSheet[9]} />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  ROLLS — grouped shoots                                      */}
      {/* ============================================================ */}
      <section className="relative bg-surface px-6 md:px-[52px] py-[140px]">
        <div className="max-w-[1500px] mx-auto">
          <div className="mb-20">
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.32em] text-amber flex items-center gap-3">
              <span className="block h-px w-10 bg-amber" />
              Frame · 03 — The Rolls
            </p>
            <h2
              className="font-editorial font-[300] leading-[0.95] tracking-[-0.025em] text-on-surface max-w-[1100px]"
              style={{ fontSize: "clamp(44px, 6vw, 100px)" }}
            >
              Shot as <em className="italic text-amber">one</em>,
              <br />
              printed as a series.
            </h2>
          </div>

          <div className="flex flex-col gap-28">
            {rolls.map((roll, rollIdx) => (
              <RollStrip key={roll.id} roll={roll} index={rollIdx} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  ARCHIVE MANIFEST                                            */}
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
                <p className="font-editorial font-[300] text-on-alt leading-none tracking-[-0.02em] text-[48px] md:text-[56px]">
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
              Need photos of your own?
            </p>
            <h2
              className="font-editorial font-[300] leading-[0.92] tracking-[-0.025em] text-graphite"
              style={{ fontSize: "clamp(44px, 6vw, 98px)" }}
            >
              Let&apos;s load
              <br />
              a <em className="italic">fresh roll</em>.
            </h2>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 bg-graphite text-ivory font-mono text-[12px] font-medium tracking-[0.22em] uppercase py-[18px] pl-7 pr-9 no-underline transition-all duration-300 hover:bg-ivory hover:text-graphite"
            >
              <span className="w-2 h-2 rounded-full bg-ember animate-pulse-dot" />
              Book a shoot
              <span className="font-editorial text-[18px] leading-none">→</span>
            </Link>
            <Link
              href="/services"
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/80 hover:text-graphite underline decoration-graphite/30 underline-offset-4"
            >
              / see all services
            </Link>
          </div>
        </div>

        <div className="relative flex flex-col justify-center bg-surface-alt px-6 md:px-[60px] py-20 lg:py-[100px]">
          <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.28em] text-on-alt-60 flex items-center gap-3">
            <span className="block h-px w-10 bg-on-alt-30" />
            What we shoot
          </p>
          <div className="flex flex-col gap-6">
            {[
              { k: "01 · Brand", v: "Product, food, lifestyle and portrait sessions, on location." },
              { k: "02 · Events", v: "Coverage of launches, pop-ups, shoots, and editorial stories." },
              { k: "03 · Assets", v: "Social-ready stills delivered in every crop you need." },
            ].map((row, i, arr) => (
              <div key={row.k}>
                <div className="flex items-baseline gap-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber w-24 shrink-0">
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
/*  PrintBlock — decorative photograph placeholder                     */
/* ------------------------------------------------------------------ */

function PrintBlock({
  print,
  size = "default",
}: {
  print: Print;
  size?: "default" | "hero";
}) {
  const tone = toneStyles[print.tone];
  const aspect = size === "hero" ? "aspect-[4/5]" : aspectClass[print.aspect];

  return (
    <div
      className={`group relative ${aspect} w-full h-full overflow-hidden border border-amber/20 hover:border-amber/60 bg-graphite transition-all duration-500 cursor-pointer`}
    >
      {/* tone gradient */}
      <div
        aria-hidden
        className="absolute inset-0 transition-transform duration-[1500ms] group-hover:scale-[1.04]"
        style={{ background: tone.bg }}
      />

      {/* vignette */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: tone.vignette }}
      />

      {/* diagonal beam */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -top-1/4 -right-1/3 h-[180%] w-1/2 bg-gradient-to-b ${tone.beam} blur-[30px] rotate-[18deg]`}
      />

      {/* grid wash */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,235,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,235,0.7) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* scanlines */}
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-overlay opacity-[0.08]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #ffffeb 0 1px, transparent 1px 3px)",
        }}
      />

      {/* dashed inset */}
      <div
        aria-hidden
        className="absolute inset-3 border border-dashed border-ivory/10 pointer-events-none"
      />

      {/* faint italic number */}
      <span
        className="pointer-events-none absolute bottom-[-10%] right-[-4%] font-editorial italic font-[300] text-ivory/10 leading-none select-none"
        style={{
          fontSize: size === "hero" ? "clamp(240px, 30vw, 480px)" : "clamp(120px, 14vw, 260px)",
        }}
      >
        {print.num}
      </span>

      {/* top-left meta */}
      <div className="absolute top-4 left-4 flex flex-col gap-1 font-mono text-[9px] uppercase tracking-[0.22em]">
        <span className={tone.tag}>/ {print.num}</span>
        <span className="text-ivory/40">{print.lens}</span>
      </div>

      {/* top-right — film stock */}
      <div className="absolute top-4 right-4 text-right font-mono text-[9px] uppercase tracking-[0.22em] text-ivory/40">
        {print.film}
      </div>

      {/* EXIF strip — always visible for hero, hover-reveal for others */}
      <div
        className={`absolute left-4 right-4 bottom-4 flex items-end justify-between gap-4 ${
          size === "hero"
            ? "opacity-100"
            : "opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
        }`}
      >
        <div className="min-w-0">
          <p className={`font-mono text-[9px] uppercase tracking-[0.22em] ${tone.tag} mb-1`}>
            / {print.location.split(" · ")[0]}
          </p>
          <h3
            className="font-editorial italic font-[300] text-ivory leading-[0.95] truncate"
            style={{
              fontSize:
                size === "hero" ? "clamp(36px, 4vw, 64px)" : "clamp(18px, 2vw, 28px)",
            }}
          >
            {print.title}
          </h3>
        </div>
        <div className="shrink-0 text-right font-mono text-[9px] uppercase tracking-[0.22em] text-ivory/50 leading-tight">
          <div>{print.aperture}</div>
          <div>{print.shutter}</div>
          <div>{print.iso}</div>
        </div>
      </div>

      {/* corner brackets */}
      <span
        aria-hidden
        className="absolute top-3 left-3 w-3 h-3 border-t border-l border-amber/40 group-hover:border-amber transition-colors duration-500"
      />
      <span
        aria-hidden
        className="absolute top-3 right-3 w-3 h-3 border-t border-r border-amber/40 group-hover:border-amber transition-colors duration-500"
      />
      <span
        aria-hidden
        className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-amber/40 group-hover:border-amber transition-colors duration-500"
      />
      <span
        aria-hidden
        className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-amber/40 group-hover:border-amber transition-colors duration-500"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  RollStrip — a horizontal roll of 4 frames                          */
/* ------------------------------------------------------------------ */

function RollStrip({
  roll,
  index,
}: {
  roll: (typeof rolls)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9 }}
    >
      {/* Roll header — slate bar */}
      <div className="mb-8 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-y border-border-subtle py-5 font-mono text-[10px] uppercase tracking-[0.22em] text-on-surface-60">
        <span className="flex items-center gap-2 text-ember font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse-dot" />
          {roll.num}
        </span>
        <span className="text-on-surface-30">·</span>
        <span className="text-amber">{roll.location}</span>
        <span className="text-on-surface-30">·</span>
        <span>{roll.stock}</span>
        <span className="text-on-surface-30 hidden md:inline">·</span>
        <span className="hidden md:inline">{roll.camera}</span>
        <span className="ml-auto text-on-surface-30 hidden md:inline">
          TC 00:{String(index + 1).padStart(2, "0")}:00:00
        </span>
      </div>

      {/* Roll title */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <h3
          className="font-editorial font-[300] italic leading-[0.95] tracking-[-0.02em] text-on-surface"
          style={{ fontSize: "clamp(40px, 5vw, 84px)" }}
        >
          {roll.title}
        </h3>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-on-surface-60 md:text-right">
          {roll.subtitle}
          <span className="block text-on-surface-30 mt-1">{roll.date}</span>
        </p>
      </div>

      {/* Film strip with perforations */}
      <div className="relative">
        {/* top perforations */}
        <div
          aria-hidden
          className="h-4 flex items-center justify-between px-4 border-x border-t border-border-subtle bg-graphite/60"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent 0 14px, rgba(255,255,235,0.15) 14px 18px, transparent 18px 32px)",
          }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-x border-border-subtle">
          {roll.frames.map((frame, i) => {
            const fullPrint: Print = {
              num: frame.num,
              title: frame.label,
              location: roll.location,
              date: roll.date,
              aperture: ["f/2.0", "f/2.8", "f/4", "f/5.6"][i % 4],
              shutter: ["1/500s", "1/250s", "1/1000s", "1/125s"][i % 4],
              iso: roll.stock.includes("800") ? "ISO 800" : roll.stock.includes("100") ? "ISO 100" : "ISO 400",
              film: roll.stock,
              lens: ["35mm", "50mm", "85mm", "28mm"][i % 4],
              tone: frame.tone,
              aspect: frame.aspect,
            };
            return (
              <div
                key={frame.num}
                className={`${i > 0 ? "border-t sm:border-t-0 sm:border-l" : ""} ${
                  i > 1 ? "lg:border-t-0 lg:border-l" : ""
                } ${i === 2 ? "sm:border-t lg:border-t-0" : ""} border-border-subtle`}
              >
                <PrintBlock print={fullPrint} />
              </div>
            );
          })}
        </div>

        {/* bottom perforations */}
        <div
          aria-hidden
          className="h-4 flex items-center justify-between px-4 border-x border-b border-border-subtle bg-graphite/60"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent 0 14px, rgba(255,255,235,0.15) 14px 18px, transparent 18px 32px)",
          }}
        />
      </div>
    </motion.div>
  );
}
