"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const clients = [
  "Acadia Bakes",
  "Nomad Studio",
  "Velour Collective",
  "Sola Health",
  "Birchfield Co.",
  "Meridian Foods",
  "Apex Creative",
  "Lune Café",
  "Trove Interiors",
  "Harbor Digital",
];

const marqueeWords = [
  "Identity",
  "Websites",
  "Campaigns",
  "Social",
  "Film",
  "Photo",
  "Ads",
  "Apps",
];

type Scene = {
  id: string;
  slug: string;
  subtitle: string;
  copy: string;
  scene: string;
  span: string;
  accent?: boolean;
};

const reel: Scene[] = [
  {
    id: "001",
    slug: "Brand Identity",
    subtitle: "the core frame",
    copy: "Voice, visuals, values — one story told through every surface a customer touches.",
    scene: "INT. STUDIO — DAY",
    span: "col-span-12 md:col-span-7 md:row-span-2",
    accent: true,
  },
  {
    id: "002",
    slug: "Websites",
    subtitle: "the main stage",
    copy: "Modern, responsive, SEO-native websites custom-built to convert the room.",
    scene: "EXT. WEB — CONTINUOUS",
    span: "col-span-12 md:col-span-5",
  },
  {
    id: "003",
    slug: "Logo Design",
    subtitle: "the signature shot",
    copy: "Marks engineered for instant recognition at every size, on every surface.",
    scene: "INT. STUDIO — INSERT",
    span: "col-span-12 md:col-span-5",
  },
  {
    id: "004",
    slug: "Social Media",
    subtitle: "the daily rushes",
    copy: "Strategy-led campaigns that turn feeds into full scenes — not afterthoughts.",
    scene: "EXT. FEED — CONTINUOUS",
    span: "col-span-12 md:col-span-4",
  },
  {
    id: "005",
    slug: "Video & Photo",
    subtitle: "principal photography",
    copy: "Film and stills that capture the real texture of your brand, on location.",
    scene: "EXT. LOCATION — GOLDEN HR",
    span: "col-span-12 md:col-span-4",
  },
  {
    id: "006",
    slug: "Ad Management",
    subtitle: "the wide release",
    copy: "Meta & Google campaigns engineered for real ROI. No wasted reel, no vanity metrics.",
    scene: "INT. WAR ROOM — NIGHT",
    span: "col-span-12 md:col-span-4",
  },
  {
    id: "007",
    slug: "Web & Mobile Apps",
    subtitle: "the sequel",
    copy: "End-to-end product work — concept, design, development, launch. Built for what comes next.",
    scene: "INT. DEV BAY — DAY",
    span: "col-span-12",
  },
];

const metrics = [
  { code: "05:00:00", label: "Years rolling", sub: "Since 2021 · Toronto" },
  { code: "047", label: "Brands framed", sub: "And still counting" },
  { code: "12.4M", label: "Impressions", sub: "Delivered last year" },
  { code: "98%", label: "Retention", sub: "Clients who re-up" },
];

const storyboard = [
  {
    step: "I",
    title: "Table Read",
    sub: "Discovery & strategy",
    body: "We meet, we listen, we dig into your goals, audience, and what's holding the story back.",
  },
  {
    step: "II",
    title: "Blocking",
    sub: "Design & scoping",
    body: "A clear shot list: milestones, deliverables, and the creative direction we'll follow.",
  },
  {
    step: "III",
    title: "Rolling",
    sub: "Production",
    body: "Iterative design, development, and content — each scene reviewed and approved on the portal.",
  },
  {
    step: "IV",
    title: "Final Cut",
    sub: "Delivery & beyond",
    body: "Polished launch, post-release support, and a dashboard that keeps every project moving forward.",
  },
];

/* ------------------------------------------------------------------ */
/*  Motion variants                                                    */
/* ------------------------------------------------------------------ */

const lineReveal = {
  hidden: { y: "108%" },
  visible: (i: number) => ({
    y: "0%",
    transition: {
      duration: 0.95,
      delay: 0.15 + i * 0.11,
      ease: [0.2, 0.8, 0.2, 1] as const,
    },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.4 + i * 0.08 },
  }),
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <>
      <Navbar />

      {/* ============================================================ */}
      {/*  REEL 01 — HERO                                              */}
      {/* ============================================================ */}
      <section className="relative h-screen min-h-[780px] w-full overflow-hidden bg-surface flex flex-col">
        {/* Background: scanlines */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-overlay animate-scan"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, var(--color-ivory) 0 1px, transparent 1px 4px)",
          }}
        />
        {/* Background: dotted grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(var(--color-amber-10) 1px, transparent 1px)",
            backgroundSize: "38px 38px",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 55%, black 20%, transparent 90%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 55%, black 20%, transparent 90%)",
          }}
        />
        {/* Ember orb */}
        <div className="pointer-events-none absolute top-[22%] right-[8%] h-[360px] w-[360px] rounded-full bg-ember-10 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-[18%] left-[6%] h-[280px] w-[280px] rounded-full bg-amber-10 blur-[120px]" />

        {/* Reserve space for fixed navbar */}
        <div className="h-[76px] shrink-0" />

        {/* REC strip */}
        <div className="relative z-20 border-y border-border-subtle bg-surface/50 backdrop-blur-sm px-6 md:px-[52px] py-3 flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.28em] text-on-surface-60">
          <span className="flex items-center gap-2 text-ember font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-ember animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
            </span>
            REC
          </span>
          <span>FF_REEL_01</span>
          <span className="hidden sm:inline text-on-surface-30">/</span>
          <span className="hidden sm:inline">TORONTO · 43.65N 79.38W</span>
          <span className="ml-auto hidden md:flex items-center gap-2">
            <span className="text-on-surface-30">TC</span>
            <span className="text-amber">00:00:01:24</span>
          </span>
        </div>

        {/* Sidebar meta (xl+) */}
        <aside className="hidden xl:block absolute left-8 top-[240px] z-10 font-mono text-[10px] uppercase tracking-[0.2em]">
          <div className="flex flex-col gap-6">
            {[
              ["SCN", "01"],
              ["TAKE", "∞"],
              ["ROLL", "A"],
              ["LENS", "35mm"],
              ["ASA", "800"],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="text-on-surface-30">{k}</div>
                <div className="text-amber mt-1">{v}</div>
              </div>
            ))}
            <div className="h-16 w-px bg-border-subtle mt-2" />
          </div>
        </aside>

        {/* Right meta (xl+) */}
        <aside className="hidden xl:flex absolute right-8 top-[240px] z-10 flex-col items-end gap-6 font-mono text-[10px] uppercase tracking-[0.2em]">
          <div className="text-right">
            <div className="text-on-surface-30">CREW</div>
            <div className="text-amber mt-1">12</div>
          </div>
          <div className="text-right">
            <div className="text-on-surface-30">DIR</div>
            <div className="text-amber mt-1">FrameFlow</div>
          </div>
          <div className="h-16 w-px bg-border-subtle" />
        </aside>

        {/* Main content */}
        <div className="relative z-10 flex-1 flex items-center px-6 md:px-[52px] xl:px-[160px]">
          <div className="relative w-full max-w-[1500px] mx-auto">
            {/* corner brackets */}
            <span aria-hidden className="pointer-events-none absolute -top-10 -left-3 md:-left-8 w-7 h-7 md:w-10 md:h-10 border-t border-l border-amber/50" />
            <span aria-hidden className="pointer-events-none absolute -top-10 -right-3 md:-right-8 w-7 h-7 md:w-10 md:h-10 border-t border-r border-amber/50" />
            <span aria-hidden className="pointer-events-none absolute -bottom-8 -left-3 md:-left-8 w-7 h-7 md:w-10 md:h-10 border-b border-l border-amber/50" />
            <span aria-hidden className="pointer-events-none absolute -bottom-8 -right-3 md:-right-8 w-7 h-7 md:w-10 md:h-10 border-b border-r border-amber/50" />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-mono text-[11px] uppercase tracking-[0.32em] text-amber mb-7 flex items-center gap-3"
            >
              <span className="block h-px w-10 bg-amber" />
              Frame · 01 — Title Card
            </motion.p>

            <h1
              className="font-editorial font-[300] leading-[0.9] tracking-[-0.035em] text-on-surface"
              style={{ fontSize: "clamp(54px, 10.2vw, 168px)" }}
            >
              <span className="block overflow-hidden">
                <motion.span
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  variants={lineReveal}
                  className="block"
                >
                  We roll cameras
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  variants={lineReveal}
                  className="block"
                >
                  on{" "}
                  <em className="italic font-[400] text-amber">brands</em>
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  custom={2}
                  initial="hidden"
                  animate="visible"
                  variants={lineReveal}
                  className="block"
                >
                  worth believing in.
                </motion.span>
              </span>
            </h1>

            <motion.p
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-9 max-w-[560px] font-warm text-[15px] font-[300] leading-[1.75] text-on-surface-60"
            >
              A Toronto creative studio that scripts, shoots, and ships the story
              of your business — from identity to campaigns, all on one reel.
            </motion.p>

            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center gap-5"
            >
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-3 bg-amber text-graphite font-mono text-[12px] font-medium tracking-[0.22em] uppercase py-[16px] pl-6 pr-7 no-underline transition-all duration-300 hover:bg-ember hover:text-ivory"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-graphite/40 animate-ping group-hover:bg-ivory/40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-graphite group-hover:bg-ivory" />
                </span>
                Roll Camera
                <span className="font-editorial not-italic text-[18px] leading-none translate-y-[-1px] transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-3 text-on-surface font-mono text-[12px] font-medium tracking-[0.22em] uppercase py-[16px] px-2 no-underline"
              >
                <span className="h-[1px] w-8 bg-on-surface-30 transition-all duration-300 group-hover:w-14 group-hover:bg-amber" />
                See the reel
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bottom client ticker */}
        <div className="relative z-20 overflow-hidden border-t border-border-subtle bg-surface-alt py-4">
          <div className="flex w-max animate-ticker items-center">
            {[...clients, ...clients, ...clients].map((c, i) => (
              <span
                key={i}
                className="flex items-center gap-6 whitespace-nowrap px-8 font-mono text-[11px] uppercase tracking-[0.22em] text-on-alt"
              >
                <span className="text-ember">✦</span>
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  MARQUEE RIBBON                                              */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-surface-alt border-b border-on-alt-10">
        <div className="flex w-max animate-ticker-slow items-center py-10">
          {[...marqueeWords, ...marqueeWords, ...marqueeWords].map((w, i) => (
            <span key={i} className="flex items-center gap-14 pr-14 shrink-0">
              <span
                className="font-editorial italic font-[300] leading-none text-on-alt"
                style={{ fontSize: "clamp(56px, 9.5vw, 140px)" }}
              >
                {w}
              </span>
              <span
                className="font-editorial not-italic text-ember font-[300] leading-none"
                style={{ fontSize: "clamp(40px, 7vw, 108px)" }}
              >
                ✦
              </span>
            </span>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  REEL 02 — THE REEL (services)                               */}
      {/* ============================================================ */}
      <section className="relative bg-surface py-[140px] px-6 md:px-[52px]">
        <div className="max-w-[1500px] mx-auto">
          <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div>
              <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.32em] text-amber flex items-center gap-3">
                <span className="block h-px w-10 bg-amber" />
                Frame · 02 — The Reel
              </p>
              <h2
                className="font-editorial font-[300] text-on-surface leading-[0.92] tracking-[-0.03em]"
                style={{ fontSize: "clamp(48px, 7vw, 120px)" }}
              >
                Seven{" "}
                <em className="italic text-amber">scenes</em>
                <br />
                we&apos;ll shoot for you.
              </h2>
            </div>
            <Link
              href="/services"
              className="self-start md:self-end inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-on-surface-60 hover:text-amber transition-colors"
            >
              [ view full reel
              <span className="font-editorial text-[18px] leading-none">→</span>
              ]
            </Link>
          </div>

          <div className="grid grid-cols-12 auto-rows-fr gap-5">
            {reel.map((scene, i) => (
              <ReelCard key={scene.id} scene={scene} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  REEL 03 — TIMECODES (metrics)                               */}
      {/* ============================================================ */}
      <section className="relative bg-surface-alt border-y border-on-alt-10 px-6 md:px-[52px] py-24">
        <div className="max-w-[1500px] mx-auto">
          <div className="mb-14 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-on-alt-60">
            <span className="h-px w-10 bg-on-alt-30" />
            <span>Frame · 03 — Timecodes</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
            {metrics.map((m, i) => (
              <motion.div
                key={m.code}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="relative"
              >
                <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-on-alt-60 mb-3">
                  {String(i + 1).padStart(2, "0")} / 04
                </span>
                <div
                  className="font-editorial font-[300] leading-none text-on-alt tracking-[-0.03em]"
                  style={{ fontSize: "clamp(46px, 6vw, 104px)" }}
                >
                  {m.code}
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <span className="h-[1px] w-6 bg-ember" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-on-alt">
                    {m.label}
                  </span>
                </div>
                <p className="mt-1 ml-9 font-warm text-[12px] font-[300] text-on-alt-60">
                  {m.sub}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  REEL 04 — STORYBOARD (process)                              */}
      {/* ============================================================ */}
      <section className="relative bg-surface py-[140px] px-6 md:px-[52px]">
        <div className="max-w-[1500px] mx-auto">
          <div className="mb-20">
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.32em] text-amber flex items-center gap-3">
              <span className="block h-px w-10 bg-amber" />
              Frame · 04 — Storyboard
            </p>
            <h2
              className="font-editorial font-[300] leading-[0.95] tracking-[-0.025em] text-on-surface max-w-[1000px]"
              style={{ fontSize: "clamp(44px, 6vw, 98px)" }}
            >
              How a brand gets <em className="italic text-amber">made</em>.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Connecting dashed line */}
            <div
              aria-hidden
              className="hidden md:block absolute top-[100px] left-[8%] right-[8%] border-t border-dashed border-amber/30"
            />

            {storyboard.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: i * 0.12 }}
                className="relative"
              >
                {/* panel */}
                <div className="relative aspect-[4/3] border border-amber/30 mb-7 overflow-hidden bg-on-surface-05">
                  <div className="absolute inset-[10px] border border-dashed border-amber/25" />
                  <span
                    className="absolute inset-0 flex items-center justify-center font-editorial italic font-[300] text-amber/55 leading-none select-none"
                    style={{ fontSize: "clamp(96px, 11vw, 180px)" }}
                  >
                    {step.step}
                  </span>
                  <div className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-[0.22em] text-amber">
                    Panel {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="absolute bottom-3 right-3 font-mono text-[9px] uppercase tracking-[0.22em] text-on-surface-30">
                    {String((i + 1) * 23).padStart(3, "0")}s
                  </div>
                  {/* ember tick */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-ember" />
                    <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-ember">
                      cued
                    </span>
                  </div>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ember mb-3">
                    Act {step.step} · {step.sub}
                  </p>
                  <h3 className="font-editorial font-[400] text-on-surface text-[28px] md:text-[30px] leading-tight mb-3">
                    {step.title}
                  </h3>
                  <p className="font-warm text-[13px] font-[300] leading-[1.75] text-on-surface-60">
                    {step.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  REEL 05 — CONTROL ROOM (dashboard)                          */}
      {/* ============================================================ */}
      <section className="relative bg-surface-alt text-on-alt py-[140px] px-6 md:px-[52px] border-y border-on-alt-10 overflow-hidden">
        {/* graphite grid backdrop */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-graphite-20) 1px, transparent 1px), linear-gradient(90deg, var(--color-graphite-20) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 80% 50%, black 20%, transparent 90%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 80% 50%, black 20%, transparent 90%)",
          }}
        />

        <div className="relative max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-[0.85fr_1fr] gap-16 lg:gap-20 items-center">
          {/* Left — copy */}
          <div>
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.32em] text-ember flex items-center gap-3">
              <span className="block h-px w-10 bg-ember" />
              Frame · 05 — Control Room
            </p>
            <h2
              className="font-editorial font-[300] leading-[0.95] tracking-[-0.025em] text-on-alt"
              style={{ fontSize: "clamp(44px, 5.5vw, 92px)" }}
            >
              Your projects,
              <br />
              <em className="italic text-amber">on your</em> monitor.
            </h2>
            <p className="mt-9 max-w-[480px] font-warm text-[14px] font-[300] leading-[1.8] text-on-alt/70">
              Every client gets a private dashboard — approve content, track campaigns,
              read analytics, and message the team. No scattered emails. No lost files.
              Just one clean cut from brief to delivery.
            </p>
            <div className="mt-10 space-y-4">
              {[
                "Content approvals & review rounds",
                "Campaign calendar by platform & date",
                "Real-time impressions & engagement",
                "Asset library with brand-safe downloads",
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="mt-[9px] block h-[1px] w-6 bg-ember shrink-0" />
                  <span className="font-warm text-[13px] font-[400] text-on-alt">
                    {f}
                  </span>
                </div>
              ))}
            </div>
            <Link
              href="/login"
              className="mt-12 inline-flex items-center gap-3 bg-graphite text-ivory font-mono text-[12px] font-medium tracking-[0.22em] uppercase py-[16px] px-8 no-underline transition-colors duration-300 hover:bg-ember"
            >
              Enter the Control Room
              <span className="font-editorial text-[18px] leading-none">→</span>
            </Link>
          </div>

          {/* Right — monitor */}
          <div className="relative">
            <div className="relative border border-graphite/20 bg-graphite text-ivory p-2 shadow-[0_40px_90px_-40px_rgba(53,50,48,0.5)]">
              {/* chrome strip */}
              <div className="flex items-center gap-3 border border-amber/30 bg-graphite px-4 py-2.5 mb-2 font-mono text-[9px] uppercase tracking-[0.22em] text-ivory/60">
                <span className="flex items-center gap-2 text-ember">
                  <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse-dot" />
                  LIVE
                </span>
                <span className="text-ivory/40">·</span>
                <span>dashboard.frameflow.ca</span>
                <span className="ml-auto text-amber">TC 00:24:07:12</span>
              </div>

              <div className="border border-amber/20 p-5 md:p-6 bg-graphite">
                <div className="mb-5 flex items-end justify-between">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-ivory/40">
                      Overview
                    </p>
                    <p className="font-editorial text-[22px] text-ivory mt-1 leading-none">
                      Acadia Bakes
                    </p>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber">
                    APR 2026
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 mb-3">
                  {[
                    { l: "POSTS", v: "24", d: "+3" },
                    { l: "REVIEW", v: "03", d: "·" },
                    { l: "APPROVED", v: "18", d: "+1" },
                    { l: "ENG%", v: "4.8", d: "↑0.6" },
                  ].map((s, i) => (
                    <div key={i} className="border border-ivory/10 p-3">
                      <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-ivory/40">
                        {s.l}
                      </p>
                      <p className="font-editorial text-[22px] text-ivory mt-1 leading-none">
                        {s.v}
                      </p>
                      <p className="font-mono text-[9px] text-ember mt-1">
                        {s.d}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-2">
                  <div className="border border-ivory/10">
                    <div className="border-b border-ivory/10 px-3 py-2.5 font-mono text-[9px] uppercase tracking-[0.22em] text-ivory/50 flex items-center justify-between">
                      <span>Queue · 03</span>
                      <span className="text-amber">this week</span>
                    </div>
                    {[
                      { t: "Summer Menu Feature", p: "IG", s: "REVIEW", h: true },
                      { t: "Client Testimonial", p: "FB", s: "APPROVED" },
                      { t: "Behind the Scenes", p: "IG", s: "DRAFT" },
                    ].map((row, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between px-3 py-2.5 border-b border-ivory/5 last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              row.h ? "bg-ember" : "bg-amber/60"
                            }`}
                          />
                          <span className="font-warm text-[11px] text-ivory">
                            {row.t}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.18em] text-ivory/40">
                          <span>{row.p}</span>
                          <span
                            className={row.h ? "text-ember" : "text-amber"}
                          >
                            {row.s}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border border-ivory/10 p-3">
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-ivory/40 mb-3">
                      Engagement · 7d
                    </p>
                    <div className="flex items-end gap-1.5 h-16">
                      {[40, 62, 48, 70, 55, 85, 78].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.8,
                            delay: 0.2 + i * 0.06,
                            ease: "easeOut",
                          }}
                          className={`flex-1 ${
                            i === 5 ? "bg-ember" : "bg-amber/60"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="mt-3 flex items-center justify-between font-mono text-[9px] text-ivory/40">
                      <span>M</span>
                      <span>T</span>
                      <span>W</span>
                      <span>T</span>
                      <span>F</span>
                      <span className="text-ember">S</span>
                      <span>S</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* floating label */}
            <div className="absolute -left-2 top-4 hidden lg:block">
              <div
                className="font-mono text-[9px] uppercase tracking-[0.22em] text-on-alt-60 whitespace-nowrap"
                style={{
                  transform: "rotate(-90deg)",
                  transformOrigin: "left top",
                }}
              >
                monitor 01 · live feed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  REEL 06 — DIRECTOR'S NOTES (pull quote)                     */}
      {/* ============================================================ */}
      <section className="relative bg-surface py-[140px] px-6 md:px-[52px] overflow-hidden">
        {/* decorative wash */}
        <div className="pointer-events-none absolute -top-10 right-0 h-[320px] w-[320px] rounded-full bg-ember-10 blur-[140px]" />

        <div className="relative max-w-[1200px] mx-auto">
          <p className="mb-12 font-mono text-[11px] uppercase tracking-[0.32em] text-amber flex items-center gap-3">
            <span className="block h-px w-10 bg-amber" />
            Frame · 06 — Director&apos;s Notes
          </p>

          <div className="relative">
            <span
              aria-hidden
              className="absolute -top-20 -left-2 md:-left-8 font-editorial italic text-ember/80 font-[300] leading-none select-none"
              style={{ fontSize: "clamp(160px, 18vw, 300px)" }}
            >
              &ldquo;
            </span>

            <blockquote className="relative pl-4 md:pl-28">
              <p
                className="font-editorial font-[300] italic text-on-surface leading-[1.05] tracking-[-0.01em]"
                style={{ fontSize: "clamp(34px, 5vw, 76px)" }}
              >
                FrameFlow didn&apos;t just make us look good —
                <br className="hidden md:block" /> they made us look{" "}
                <span className="not-italic text-amber">inevitable</span>.
              </p>
              <footer className="mt-12 flex items-center gap-5">
                <span className="h-[1px] w-12 bg-amber" />
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-on-surface">
                    Sun-Hee Park
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-on-surface-60 mt-1">
                    Creative Director · Meridian Foods
                  </p>
                </div>
                <div className="ml-auto hidden md:flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-30">
                  <span>Take</span>
                  <span className="text-amber">001 / 047</span>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  REEL 07 — ACTION! (CTA clapperboard)                        */}
      {/* ============================================================ */}
      <section className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
        {/* Left — ember clapperboard */}
        <div className="relative flex flex-col justify-between overflow-hidden bg-ember text-graphite px-6 md:px-[60px] pt-16 pb-20 lg:pt-20 lg:pb-[100px]">
          {/* clapper stripes */}
          <div
            aria-hidden
            className="absolute top-0 left-0 right-0 h-9"
            style={{
              background:
                "repeating-linear-gradient(-68deg, #ffffeb 0 28px, #353230 28px 56px)",
            }}
          />
          <div
            aria-hidden
            className="absolute top-9 left-0 right-0 h-[2px] bg-graphite"
          />

          <div className="pt-10">
            <p className="mb-7 font-mono text-[11px] uppercase tracking-[0.28em] text-graphite/70 flex items-center gap-3">
              <span className="block h-px w-10 bg-graphite/60" />
              Frame · 07 — Action
            </p>
            <h2
              className="font-editorial font-[300] leading-[0.92] tracking-[-0.025em] text-graphite"
              style={{ fontSize: "clamp(48px, 6.8vw, 112px)" }}
            >
              Ready when you are.
              <br />
              <em className="italic">Let&apos;s roll.</em>
            </h2>
          </div>

          <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 bg-graphite text-ivory font-mono text-[12px] font-medium tracking-[0.22em] uppercase py-[18px] pl-7 pr-9 no-underline transition-all duration-300 hover:bg-ivory hover:text-graphite"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-ember animate-pulse-dot" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
              </span>
              Book the studio
              <span className="font-editorial not-italic text-[18px] leading-none transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/70">
              / 30 min · free consult
            </span>
          </div>
        </div>

        {/* Right — shot details */}
        <div className="relative flex flex-col justify-center bg-surface-alt px-6 md:px-[60px] py-20 lg:py-[100px]">
          <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.28em] text-on-alt-60 flex items-center gap-3">
            <span className="block h-px w-10 bg-on-alt-30" />
            Scene 01 / Take ∞
          </p>
          <div className="flex flex-col gap-6">
            {[
              {
                k: "Script",
                v: "A focused talk about your brand, goals, and where we can help.",
              },
              {
                k: "Runtime",
                v: "30 minutes. Concise. Honest. No pitch deck, no upsell.",
              },
              {
                k: "Location",
                v: "Virtual (Zoom / Meet) — or in-person in Toronto.",
              },
              {
                k: "Budget",
                v: "Starting at $2.5k / month. Custom from there.",
              },
            ].map((row, i, arr) => (
              <div key={row.k}>
                <div className="flex items-baseline gap-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber w-24 shrink-0">
                    {String(i + 1).padStart(2, "0")} · {row.k}
                  </span>
                  <p className="font-warm text-[14px] font-[300] leading-[1.7] text-on-alt flex-1">
                    {row.v}
                  </p>
                </div>
                {i < arr.length - 1 && (
                  <div className="mt-6 h-[1px] w-full bg-on-alt-10" />
                )}
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
/*  ReelCard                                                           */
/* ------------------------------------------------------------------ */

function ReelCard({ scene, index }: { scene: Scene; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay: index * 0.08 }}
      className={`group relative ${scene.span} border border-border-subtle hover:border-amber/50 transition-colors duration-500 overflow-hidden`}
    >
      {/* dashed inner frame */}
      <div
        aria-hidden
        className="absolute inset-3 border border-dashed border-border-faint pointer-events-none group-hover:border-amber/30 transition-colors duration-500"
      />

      {/* hover wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-amber opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500"
      />

      <div className="relative flex flex-col h-full p-8 md:p-10 min-h-[280px]">
        {/* top meta */}
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber">
            Frame · {scene.id}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-on-surface-30 text-right">
            {scene.scene}
          </span>
        </div>

        {/* body */}
        <div className="mt-auto pt-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ember mb-4">
            / {scene.subtitle}
          </p>
          <h3
            className="font-editorial font-[300] text-on-surface leading-[0.95] tracking-[-0.02em] mb-5"
            style={{
              fontSize: scene.accent
                ? "clamp(44px, 5vw, 88px)"
                : "clamp(28px, 2.7vw, 46px)",
            }}
          >
            {scene.slug}
          </h3>
          <p className="font-warm text-[13px] font-[300] leading-[1.75] text-on-surface-60 max-w-[460px]">
            {scene.copy}
          </p>
        </div>

        {/* footer — hover arrow */}
        <span className="mt-7 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-on-surface-30 group-hover:text-amber transition-colors">
          <span className="h-[1px] w-6 bg-border-subtle group-hover:w-12 group-hover:bg-amber transition-all duration-500" />
          roll scene
        </span>

        {/* corner brackets (hover) */}
        <span
          aria-hidden
          className="absolute top-5 left-5 w-3 h-3 border-t border-l border-transparent group-hover:border-amber/70 transition-colors duration-500"
        />
        <span
          aria-hidden
          className="absolute top-5 right-5 w-3 h-3 border-t border-r border-transparent group-hover:border-amber/70 transition-colors duration-500"
        />
        <span
          aria-hidden
          className="absolute bottom-5 left-5 w-3 h-3 border-b border-l border-transparent group-hover:border-amber/70 transition-colors duration-500"
        />
        <span
          aria-hidden
          className="absolute bottom-5 right-5 w-3 h-3 border-b border-r border-transparent group-hover:border-amber/70 transition-colors duration-500"
        />
      </div>
    </motion.article>
  );
}
