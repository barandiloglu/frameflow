"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

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

const services = [
  {
    name: "Brand Identity",
    description:
      "Complete identities built to connect, built to last — voice, visuals, values, all telling one story.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" />
        <path d="M2 17L12 22L22 17" />
        <path d="M2 12L12 17L22 12" />
      </svg>
    ),
    size: "large" as const,
  },
  {
    name: "Website Design",
    description:
      "Modern, SEO-friendly, mobile-responsive websites custom-built to make your business thrive online.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21H16" />
        <path d="M12 17V21" />
      </svg>
    ),
    size: "large" as const,
  },
  {
    name: "Logo Design",
    description:
      "Strategic visual assets that make your brand unforgettable — crafted for lasting recognition.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19L19 12L22 15L15 22L12 19Z" />
        <path d="M18 13L16.5 5.5L2 2L5.5 16.5L13 18L18 13Z" />
        <path d="M2 2L9.586 9.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
    size: "small" as const,
  },
  {
    name: "Social Media",
    description:
      "Strategy-driven campaigns on Instagram, Facebook, TikTok and beyond — content that converts.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4L9 9" />
        <path d="M12 3V6" />
        <path d="M20 4L15 9" />
        <path d="M21 12H18" />
        <path d="M20 20L15 15" />
        <path d="M12 18V21" />
        <path d="M4 20L9 15" />
        <path d="M3 12H6" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    size: "small" as const,
  },
  {
    name: "Video & Photo",
    description:
      "High-quality photography and videography that captures your brand's true essence.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 4H9.5L7 7H4C2.9 7 2 7.9 2 9V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V9C22 7.9 21.1 7 20 7H17L14.5 4Z" />
        <circle cx="12" cy="13" r="3.5" />
      </svg>
    ),
    size: "small" as const,
  },
  {
    name: "Ad Management",
    description:
      "Data-driven Google and Meta campaigns designed for real ROI — no wasted budget.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12H18L15 21L9 3L6 12H2" />
      </svg>
    ),
    size: "small" as const,
  },
  {
    name: "Web & Mobile Apps",
    description:
      "End-to-end app development — from concept to polished product.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18H12.01" />
      </svg>
    ),
    size: "small" as const,
  },
];

const processSteps = [
  {
    number: "01",
    title: "Initial Analysis",
    description:
      "We learn your business inside-out — goals, audience, competitors — to build a strategy rooted in reality.",
  },
  {
    number: "02",
    title: "Project Outline",
    description:
      "A detailed roadmap with milestones, deliverables, and timelines so you always know what to expect.",
  },
  {
    number: "03",
    title: "Continuous Work",
    description:
      "Iterative design and development with regular check-ins, ensuring every detail aligns with your vision.",
  },
  {
    number: "04",
    title: "Delivery",
    description:
      "Polished final assets, seamless handoff, and post-launch support to keep your momentum going.",
  },
];

const whyReasons = [
  {
    tag: "Brand & Identity",
    heading: "Real Impact Starts With Real Identity",
    text: "A strong brand is more than a logo — it's the feeling people get when they encounter your business. We build identities that are authentic, memorable, and strategically designed to set you apart in a crowded market.",
  },
  {
    tag: "Partnership",
    heading: "We Don't Just Work For You — We Work With You",
    text: "We believe the best results come from genuine collaboration. You're not a ticket in our queue — you're a partner. We embed ourselves in your goals, communicate transparently, and celebrate wins together.",
  },
  {
    tag: "Marketing",
    heading: "You Do You. We'll Handle the Marketing.",
    text: "Running a business is demanding enough. Let us take the weight of branding, social media, ads, and web off your shoulders so you can focus on what you do best — serving your customers.",
  },
];

/* ------------------------------------------------------------------ */
/*  Hero word animation variants                                       */
/* ------------------------------------------------------------------ */

const wordContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const wordReveal = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <>
      <Navbar />

      {/* ============================================================ */}
      {/*  1. HERO                                                     */}
      {/* ============================================================ */}
      <section className="relative h-screen w-full overflow-hidden bg-surface flex items-center border-b border-border-subtle">
        {/* Grid pattern */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--color-amber-10) 1px, transparent 1px), linear-gradient(to bottom, var(--color-amber-10) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 100%)",
          }}
        />

        {/* Floating orbs */}
        <div className="animate-orb pointer-events-none absolute top-[15%] left-[10%] h-[340px] w-[340px] rounded-full bg-amber-10 blur-[100px]" />
        <div className="animate-orb-reverse pointer-events-none absolute bottom-[10%] right-[12%] h-[280px] w-[280px] rounded-full bg-amber-10 blur-[120px]" />

        {/* Content */}
        <div className="relative z-10 w-full px-6 md:px-[52px]">
          {/* Tag line */}
          <Reveal direction="up" delay={0}>
            <div className="mb-8 flex items-center gap-4">
              <span className="block h-[1px] w-10 bg-amber" />
              <span className="font-body text-[12px] font-light tracking-[0.2em] uppercase text-on-surface-60">
                Since 2021 &middot; Toronto, Canada
              </span>
            </div>
          </Reveal>

          {/* Heading */}
          <motion.h1
            className="font-display font-[800] leading-[1.02] tracking-[-0.025em] text-on-surface"
            style={{ fontSize: "clamp(64px, 9vw, 130px)" }}
            variants={wordContainer}
            initial="hidden"
            animate="visible"
          >
            {[
              { text: "Your Sincere", italic: true, amber: true },
              { text: "Growth", italic: false, amber: false },
              { text: "Partner.", italic: false, amber: false },
            ].map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className={`block ${
                    line.italic && line.amber
                      ? "italic text-amber"
                      : ""
                  }`}
                  variants={wordReveal}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <Reveal direction="up" delay={0.7}>
            <p className="mt-8 max-w-[560px] font-body text-[15px] font-light leading-[1.75] text-on-surface-60">
              We go beyond the typical agency model — championing the success of
              small and medium-sized businesses with strategy, creativity, and
              genuine investment in your growth.
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal direction="up" delay={0.9}>
            <div className="mt-10 flex items-center gap-5">
              <Link
                href="/contact"
                className="font-body text-[13px] font-medium tracking-[0.06em] uppercase bg-amber text-graphite py-[14px] px-8 rounded-[1px] no-underline transition-colors duration-200 hover:bg-[#e09f3a]"
              >
                Work With Us &rarr;
              </Link>
              <Link
                href="/portfolio"
                className="font-body text-[13px] font-medium tracking-[0.06em] uppercase border border-amber/30 text-on-surface py-[13px] px-8 rounded-[1px] no-underline transition-colors duration-200 hover:border-amber hover:text-amber"
              >
                See Our Work
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Scroll hint */}
        <div className="hidden md:flex absolute bottom-10 left-[52px] items-center gap-3">
          <div className="flex flex-col gap-[5px]">
            <span className="block h-[1px] w-[18px] bg-on-surface-30" />
            <span className="block h-[1px] w-[18px] bg-on-surface-30" />
            <span className="block h-[1px] w-[18px] bg-on-surface-30" />
          </div>
          <span className="font-body text-[10px] font-light tracking-[0.18em] uppercase text-on-surface-30">
            Scroll to explore
          </span>
        </div>

        {/* FF watermark */}
        <span
          className="hidden md:block pointer-events-none absolute bottom-6 right-[52px] font-display font-[800] text-on-surface-10 select-none"
          style={{ fontSize: "200px", lineHeight: 1 }}
        >
          FF
        </span>
      </section>


      {/* ============================================================ */}
      {/*  3. CLIENT TICKER                                            */}
      {/* ============================================================ */}
      <section className="overflow-hidden bg-surface-alt py-[28px]">
        <div className="flex w-max animate-ticker">
          {[...clients, ...clients].map((name, i) => (
            <span
              key={i}
              className="flex items-center gap-3 whitespace-nowrap px-8 font-body text-[14px] font-light tracking-[0.04em] text-on-alt"
            >
              <span className="inline-block h-[6px] w-[6px] rounded-full bg-amber" />
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  4. SERVICES — BENTO GRID                                    */}
      {/* ============================================================ */}
      <section className="bg-surface py-[100px] px-6 md:px-[52px]">
        {/* Header */}
        <Reveal direction="up">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <p className="mb-2 font-body text-[11px] font-light tracking-[0.22em] uppercase text-on-surface-30">
                What We Do
              </p>
              <h2 className="font-display text-[48px] font-[700] text-on-surface leading-none">
                Our Services
              </h2>
            </div>
            <Link
              href="/services"
              className="font-body text-[13px] font-light tracking-[0.06em] text-amber no-underline transition-opacity duration-200 hover:opacity-70"
            >
              View All &rarr;
            </Link>
          </div>
        </Reveal>

        {/* Bento grid — explicit placement */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "1fr",
            gridAutoRows: "auto",
          }}
        >
          {/* Mobile: stack all. Desktop: 4-col bento */}
          <div
            className="hidden lg:grid gap-4"
            style={{
              gridTemplateColumns: "repeat(4, 1fr)",
              gridTemplateRows: "280px 280px 220px",
            }}
          >
            {/* Brand Identity — tall left */}
            <div className="group relative overflow-hidden rounded-[3px] border border-border-subtle hover:border-amber/40 transition-all duration-500 row-span-2 p-10 flex flex-col justify-between"
              style={{ gridColumn: "1 / 2", gridRow: "1 / 3" }}>
              <div className="pointer-events-none absolute -bottom-20 -right-20 w-[260px] h-[260px] bg-amber-10 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <span className="text-amber mb-5 block">{services[0].icon}</span>
                <h3 className="font-display text-[28px] font-[700] text-on-surface leading-[1.15] mb-4">
                  {services[0].name}
                </h3>
                <p className="font-body text-[14px] font-light leading-[1.8] text-on-surface-60">
                  {services[0].description}
                </p>
              </div>
              <span className="relative z-10 font-body text-[12px] tracking-[0.06em] text-amber opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                Learn more &rarr;
              </span>
            </div>

            {/* Website Design — wide top */}
            <div className="group relative overflow-hidden rounded-[3px] border border-border-subtle hover:border-amber/40 transition-all duration-500 p-10 flex flex-col justify-between"
              style={{ gridColumn: "2 / 4", gridRow: "1 / 2" }}>
              <div className="pointer-events-none absolute -top-16 -right-16 w-[200px] h-[200px] bg-amber-10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              {/* Large watermark */}
              <span className="pointer-events-none absolute bottom-4 right-6 font-display text-[120px] font-[800] leading-none text-on-surface-05 select-none">
                WEB
              </span>
              <div className="relative z-10">
                <span className="text-amber mb-5 block">{services[1].icon}</span>
                <h3 className="font-display text-[28px] font-[700] text-on-surface leading-[1.15] mb-4">
                  {services[1].name}
                </h3>
                <p className="font-body text-[14px] font-light leading-[1.8] text-on-surface-60 max-w-[400px]">
                  {services[1].description}
                </p>
              </div>
              <span className="relative z-10 font-body text-[12px] tracking-[0.06em] text-amber opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                Learn more &rarr;
              </span>
            </div>

            {/* Social Media — top right */}
            <div className="group relative overflow-hidden rounded-[3px] border border-border-subtle hover:border-amber/40 transition-all duration-500 p-8 flex flex-col justify-between"
              style={{ gridColumn: "4 / 5", gridRow: "1 / 2" }}>
              <div>
                <span className="text-amber mb-4 block">{services[3].icon}</span>
                <h3 className="font-display text-[18px] font-[700] text-on-surface leading-tight mb-2 group-hover:text-amber transition-colors duration-300">
                  {services[3].name}
                </h3>
                <p className="font-body text-[13px] font-light leading-[1.7] text-on-surface-60">
                  {services[3].description}
                </p>
              </div>
            </div>

            {/* Logo Design — mid */}
            <div className="group relative overflow-hidden rounded-[3px] border border-border-subtle hover:border-amber/40 transition-all duration-500 p-8 flex flex-col justify-between"
              style={{ gridColumn: "2 / 3", gridRow: "2 / 3" }}>
              <div>
                <span className="text-amber mb-4 block">{services[2].icon}</span>
                <h3 className="font-display text-[18px] font-[700] text-on-surface leading-tight mb-2 group-hover:text-amber transition-colors duration-300">
                  {services[2].name}
                </h3>
                <p className="font-body text-[13px] font-light leading-[1.7] text-on-surface-60">
                  {services[2].description}
                </p>
              </div>
            </div>

            {/* Video & Photo — mid right wide */}
            <div className="group relative overflow-hidden rounded-[3px] border border-border-subtle hover:border-amber/40 transition-all duration-500 p-8 flex flex-col justify-between"
              style={{ gridColumn: "3 / 5", gridRow: "2 / 3" }}>
              <div className="flex items-start gap-6">
                <span className="text-amber shrink-0 mt-1">{services[4].icon}</span>
                <div>
                  <h3 className="font-display text-[18px] font-[700] text-on-surface leading-tight mb-2 group-hover:text-amber transition-colors duration-300">
                    {services[4].name}
                  </h3>
                  <p className="font-body text-[13px] font-light leading-[1.7] text-on-surface-60">
                    {services[4].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Ad Management — bottom left wide */}
            <div className="group relative overflow-hidden rounded-[3px] bg-on-surface-05 border border-border-subtle hover:border-amber/40 transition-all duration-500 p-8 flex items-center gap-8"
              style={{ gridColumn: "1 / 3", gridRow: "3 / 4" }}>
              <span className="text-amber shrink-0">{services[5].icon}</span>
              <div>
                <h3 className="font-display text-[18px] font-[700] text-on-surface leading-tight mb-1 group-hover:text-amber transition-colors duration-300">
                  {services[5].name}
                </h3>
                <p className="font-body text-[13px] font-light leading-[1.7] text-on-surface-60">
                  {services[5].description}
                </p>
              </div>
            </div>

            {/* Web & Mobile Apps — bottom right wide */}
            <div className="group relative overflow-hidden rounded-[3px] bg-on-surface-05 border border-border-subtle hover:border-amber/40 transition-all duration-500 p-8 flex items-center gap-8"
              style={{ gridColumn: "3 / 5", gridRow: "3 / 4" }}>
              <span className="text-amber shrink-0">{services[6].icon}</span>
              <div>
                <h3 className="font-display text-[18px] font-[700] text-on-surface leading-tight mb-1 group-hover:text-amber transition-colors duration-300">
                  {services[6].name}
                </h3>
                <p className="font-body text-[13px] font-light leading-[1.7] text-on-surface-60">
                  {services[6].description}
                </p>
              </div>
            </div>
          </div>

          {/* Tablet: 2-col */}
          <div className="hidden md:grid lg:hidden grid-cols-2 gap-4">
            {services.map((svc, i) => (
              <Reveal key={svc.name} direction="up" delay={i * 0.06}>
                <div className={`group relative overflow-hidden rounded-[3px] border border-border-subtle hover:border-amber/40 transition-all duration-500 p-8 ${svc.size === "large" ? "min-h-[260px]" : ""}`}>
                  <span className="text-amber mb-4 block">{svc.icon}</span>
                  <h3 className={`font-display font-[700] text-on-surface leading-tight mb-2 group-hover:text-amber transition-colors duration-300 ${svc.size === "large" ? "text-[24px] mb-3" : "text-[18px]"}`}>
                    {svc.name}
                  </h3>
                  <p className="font-body text-[13px] font-light leading-[1.7] text-on-surface-60">
                    {svc.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Mobile: single column */}
          <div className="grid md:hidden grid-cols-1 gap-4">
            {services.map((svc, i) => (
              <Reveal key={svc.name} direction="up" delay={i * 0.06}>
                <div className="group relative overflow-hidden rounded-[3px] border border-border-subtle hover:border-amber/40 transition-all duration-500 p-6">
                  <div className="flex items-start gap-4">
                    <span className="text-amber shrink-0 mt-0.5">{svc.icon}</span>
                    <div>
                      <h3 className="font-display text-[18px] font-[700] text-on-surface leading-tight mb-2 group-hover:text-amber transition-colors duration-300">
                        {svc.name}
                      </h3>
                      <p className="font-body text-[13px] font-light leading-[1.7] text-on-surface-60">
                        {svc.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  5. PROCESS — VERTICAL TIMELINE                              */}
      {/* ============================================================ */}
      <section className="bg-surface-alt py-[100px] px-6 md:px-[52px]">
        <Reveal direction="up">
          <div className="mb-20 max-w-[600px]">
            <p className="mb-2 font-body text-[11px] font-light tracking-[0.22em] uppercase text-on-alt-80">
              How It Works
            </p>
            <h2 className="font-display text-[48px] font-[700] text-on-alt leading-none">
              Our Process
            </h2>
          </div>
        </Reveal>

        <div className="relative max-w-[900px] mx-auto">
          {/* Vertical line */}
          <div className="absolute left-[23px] md:left-1/2 md:-translate-x-[0.5px] top-0 bottom-0 w-[1px] bg-on-alt-10" />

          {processSteps.map((step, i) => (
            <TimelineStep key={i} step={step} index={i} />
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  6. WHAT SETS US APART                                       */}
      {/* ============================================================ */}
      <section className="bg-surface py-[100px] px-6 md:px-[52px]">
        <div className="max-w-[1100px] mx-auto">
          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-10 mb-20">
            <Reveal direction="up">
              <div>
                <p className="mb-2 font-body text-[11px] font-light tracking-[0.22em] uppercase text-on-surface-30">
                  Why FrameFlow
                </p>
                <h2 className="font-display text-[clamp(36px,4.5vw,52px)] font-[700] text-on-surface leading-[1.1]">
                  What Sets Us{" "}
                  <span className="italic text-amber">Apart</span>
                </h2>
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <p className="font-body text-[15px] font-light leading-[1.8] text-on-surface-60 md:pt-8">
                We&apos;re not just another agency. Every decision we make is rooted in
                genuine care for your business, your audience, and your long-term success.
              </p>
            </Reveal>
          </div>

          {/* Reason cards */}
          <div className="flex flex-col gap-6">
            {whyReasons.map((reason, i) => (
              <Reveal key={i} direction="up" delay={i * 0.12}>
                <motion.div
                  className="group relative grid grid-cols-1 md:grid-cols-[80px_1fr] gap-6 md:gap-10 p-8 md:p-10 rounded-[3px] border border-border-subtle hover:border-amber/30 transition-all duration-500 overflow-hidden"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Amber side accent — visible on hover */}
                  <div className="hidden md:block absolute left-0 top-0 bottom-0 w-[3px] bg-amber scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500" />

                  {/* Number */}
                  <div className="flex items-start">
                    <span className="font-display text-[56px] md:text-[72px] font-[800] leading-none text-on-surface-05 group-hover:text-amber-10 transition-colors duration-500 select-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center">
                    <span className="font-body text-[10px] font-light tracking-[0.2em] uppercase text-amber mb-3">
                      {reason.tag}
                    </span>
                    <h3 className="font-display text-[22px] md:text-[26px] font-[700] text-on-surface leading-[1.2] mb-4">
                      {reason.heading}
                    </h3>
                    <p className="font-body text-[14px] font-light leading-[1.8] text-on-surface-60 max-w-[560px]">
                      {reason.text}
                    </p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  7. CLIENT PORTAL PROMO                                      */}
      {/* ============================================================ */}
      <section className="bg-surface py-[100px] px-6 md:px-[52px] border-t border-border-subtle">
        <div className="max-w-[1320px] mx-auto">
          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12 mb-16">
            <Reveal direction="up">
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <span className="block w-8 h-px bg-amber" />
                  <span className="font-body text-[11px] uppercase tracking-[0.22em] text-on-surface-60">
                    Client Portal
                  </span>
                </div>
                <h2 className="font-display text-[clamp(36px,4vw,52px)] font-[800] text-on-surface leading-[1.08]">
                  Your Projects,{" "}
                  <span className="italic text-amber">Always</span> Within Reach.
                </h2>
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <div className="flex flex-col justify-end">
                <p className="font-body text-[15px] font-light leading-[1.75] text-on-surface-60 max-w-[480px]">
                  Every client gets access to a private dashboard — track progress,
                  approve content, view analytics, and communicate with your team, all
                  in one place. No more scattered emails or missed messages.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Dashboard Preview */}
          <Reveal direction="up" delay={0.15}>
            <div className="rounded-[3px] border border-border-subtle overflow-hidden">
              {/* Mock title bar */}
              <div className="flex items-center gap-2 px-5 py-3 bg-on-surface-05 border-b border-border-subtle">
                <span className="w-2.5 h-2.5 rounded-full bg-amber" />
                <span className="w-2.5 h-2.5 rounded-full bg-on-surface-10" />
                <span className="w-2.5 h-2.5 rounded-full bg-on-surface-10" />
                <span className="ml-4 font-body text-[11px] text-on-surface-30 tracking-wide">dashboard.frameflow.ca</span>
              </div>

              {/* Mock dashboard content */}
              <div className="bg-on-surface-05/50 p-6 md:p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: "Total Posts", value: "24", sub: "This month" },
                    { label: "Pending Review", value: "3", sub: "Awaiting approval" },
                    { label: "Approved", value: "18", sub: "On schedule" },
                    { label: "Engagement", value: "4.8%", sub: "+0.6% this period" },
                  ].map((stat, i) => (
                    <div key={i} className="rounded-[2px] border border-border-faint bg-surface p-4">
                      <p className="text-[10px] font-body text-on-surface-30 mb-1">{stat.label}</p>
                      <p className="font-display font-bold text-2xl text-on-surface">{stat.value}</p>
                      <p className="text-[10px] font-body text-on-surface-30 mt-0.5">{stat.sub}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-4">
                  {/* Mock post list */}
                  <div className="rounded-[2px] border border-border-faint bg-surface overflow-hidden">
                    <div className="px-4 py-3 border-b border-border-faint">
                      <span className="font-display font-semibold text-[13px] text-on-surface">Upcoming Posts</span>
                    </div>
                    {[
                      { title: "Summer Menu Feature", platform: "Instagram", status: "Pending" },
                      { title: "Client Testimonial", platform: "Facebook", status: "Approved" },
                      { title: "Behind the Scenes", platform: "Instagram", status: "Draft" },
                    ].map((post, i) => (
                      <div key={i} className="flex items-center justify-between px-4 py-2.5 border-b border-border-faint last:border-b-0">
                        <div className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                          <div>
                            <p className="text-[12px] font-body text-on-surface">{post.title}</p>
                            <p className="text-[10px] font-body text-on-surface-30">{post.platform}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-body font-semibold text-on-surface-30 bg-on-surface-05 px-2 py-0.5 rounded-full">
                          {post.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Mock activity */}
                  <div className="rounded-[2px] border border-border-faint bg-surface overflow-hidden">
                    <div className="px-4 py-3 border-b border-border-faint">
                      <span className="font-display font-semibold text-[13px] text-on-surface">Activity</span>
                    </div>
                    {[
                      "Post moved to Pending Review",
                      "Testimonial carousel approved",
                      "New brand assets uploaded",
                      "Weekly report generated",
                    ].map((activity, i) => (
                      <div key={i} className="flex items-start gap-2.5 px-4 py-2.5 border-b border-border-faint last:border-b-0">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-on-surface-10 shrink-0" />
                        <p className="text-[11px] font-body text-on-surface-60 leading-snug">{activity}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 11L12 14L22 4" />
                    <path d="M21 12V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H16" />
                  </svg>
                ),
                title: "Content Approvals",
                desc: "Review, approve, or request changes on every post before it goes live.",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2V6" />
                    <path d="M8 2V6" />
                    <path d="M3 10H21" />
                  </svg>
                ),
                title: "Calendar View",
                desc: "See your full content schedule at a glance — organized by platform and date.",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 20V10" />
                    <path d="M12 20V4" />
                    <path d="M6 20V14" />
                  </svg>
                ),
                title: "Real-Time Analytics",
                desc: "Track impressions, engagement, and growth across all your platforms.",
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V15" />
                    <path d="M7 10L12 15L17 10" />
                    <path d="M12 15V3" />
                  </svg>
                ),
                title: "File & Asset Library",
                desc: "Access all your brand assets, deliverables, and media files in one hub.",
              },
            ].map((feature, i) => (
              <Reveal key={i} direction="up" delay={i * 0.08}>
                <div className="p-6 rounded-[2px] border border-border-subtle hover:border-amber/30 transition-colors duration-300">
                  <span className="text-amber mb-4 block">{feature.icon}</span>
                  <h3 className="font-display text-[16px] font-[700] text-on-surface mb-2">
                    {feature.title}
                  </h3>
                  <p className="font-body text-[13px] font-light leading-[1.7] text-on-surface-60">
                    {feature.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Portal CTA */}
          <Reveal direction="up" delay={0.1}>
            <div className="mt-12 text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-2.5 font-body text-[13px] font-medium tracking-[0.06em] uppercase bg-amber text-graphite py-[14px] px-10 rounded-[1px] no-underline transition-colors duration-200 hover:bg-[#e09f3a]"
              >
                Explore the Portal &rarr;
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  8. CTA                                                      */}
      {/* ============================================================ */}
      <section className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr]">
        {/* Left */}
        <div className="flex flex-col justify-center bg-amber px-6 md:px-[52px] py-[80px]">
          <Reveal direction="left">
            <p className="mb-3 font-body text-[11px] font-light tracking-[0.22em] uppercase text-graphite-80">
              Let&apos;s Talk
            </p>
            <h2 className="font-display text-[44px] font-[700] leading-[1.12] text-graphite max-w-[440px]">
              Schedule Your Free Consultation.
            </h2>
            <Link
              href="/contact"
              className="mt-10 inline-block font-body text-[13px] font-medium tracking-[0.06em] uppercase bg-graphite text-ivory py-[14px] px-8 rounded-[1px] no-underline transition-opacity duration-200 hover:opacity-85"
            >
              Let&apos;s Start &rarr;
            </Link>
          </Reveal>
        </div>

        {/* Right */}
        <div className="flex flex-col justify-center bg-surface-alt px-6 md:px-[52px] py-[80px]">
          <Reveal direction="right">
            <div className="flex flex-col gap-8">
              {[
                {
                  label: "What to expect",
                  value:
                    "A no-pressure conversation about your brand, goals, and how we can help.",
                },
                {
                  label: "Duration",
                  value: "30 minutes — concise, focused, and productive.",
                },
                {
                  label: "Location",
                  value: "Virtual (Google Meet / Zoom) or in-person in Toronto.",
                },
              ].map((item, i, arr) => (
                <div key={i}>
                  <p className="mb-1 font-body text-[10px] font-light tracking-[0.2em] uppercase text-on-alt-60">
                    {item.label}
                  </p>
                  <p className="font-body text-[14px] font-light leading-[1.7] text-on-alt">
                    {item.value}
                  </p>
                  {i < arr.length - 1 && (
                    <div className="mt-8 h-[1px] w-full bg-on-alt-10" />
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}


/* ------------------------------------------------------------------ */
/*  Process Card                                                       */
/* ------------------------------------------------------------------ */

function TimelineStep({
  step,
  index,
}: {
  step: { number: string; title: string; description: string };
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex items-start gap-0 md:gap-0 mb-16 last:mb-0`}>
      {/* ── Mobile layout (always left-aligned) ── */}
      <div className="md:hidden flex items-start gap-6 w-full">
        {/* Node */}
        <div className="relative z-10 shrink-0">
          <Reveal direction="up" delay={index * 0.15}>
            <motion.div
              className="w-[48px] h-[48px] rounded-full border-2 border-amber/40 bg-surface-alt flex items-center justify-center"
              whileInView={{ borderColor: "var(--color-amber)" }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
            >
              <span className="font-display text-[16px] font-[800] text-amber">{step.number}</span>
            </motion.div>
          </Reveal>
        </div>

        {/* Content */}
        <Reveal direction="up" delay={index * 0.15 + 0.1}>
          <div className="pt-2">
            <p className="mb-1 font-body text-[10px] font-light tracking-[0.2em] uppercase text-on-alt-60">
              Step {step.number}
            </p>
            <h3 className="mb-2 font-display text-[20px] font-[700] text-on-alt leading-tight">
              {step.title}
            </h3>
            <p className="font-body text-[13px] font-light leading-[1.8] text-on-alt-80 max-w-[360px]">
              {step.description}
            </p>
          </div>
        </Reveal>
      </div>

      {/* ── Desktop layout (alternating sides) ── */}
      <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-start w-full gap-8">
        {/* Left content */}
        <div className={`${isEven ? "text-right" : ""}`}>
          {isEven ? (
            <Reveal direction="right" delay={index * 0.15 + 0.1}>
              <div className="pr-4">
                <p className="mb-1 font-body text-[10px] font-light tracking-[0.2em] uppercase text-on-alt-60">
                  Step {step.number}
                </p>
                <h3 className="mb-3 font-display text-[24px] font-[700] text-on-alt leading-tight">
                  {step.title}
                </h3>
                <p className="font-body text-[14px] font-light leading-[1.8] text-on-alt-80 ml-auto max-w-[340px]">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ) : (
            <div />
          )}
        </div>

        {/* Center node */}
        <div className="relative z-10">
          <Reveal direction="up" delay={index * 0.15}>
            <motion.div
              className="w-[52px] h-[52px] rounded-full border-2 border-on-alt-10 bg-surface-alt flex items-center justify-center"
              whileInView={{ borderColor: "var(--color-amber)", scale: [1, 1.15, 1] }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
            >
              <span className="font-display text-[18px] font-[800] text-amber">{step.number}</span>
            </motion.div>
          </Reveal>
        </div>

        {/* Right content */}
        <div>
          {!isEven ? (
            <Reveal direction="left" delay={index * 0.15 + 0.1}>
              <div className="pl-4">
                <p className="mb-1 font-body text-[10px] font-light tracking-[0.2em] uppercase text-on-alt-60">
                  Step {step.number}
                </p>
                <h3 className="mb-3 font-display text-[24px] font-[700] text-on-alt leading-tight">
                  {step.title}
                </h3>
                <p className="font-body text-[14px] font-light leading-[1.8] text-on-alt-80 max-w-[340px]">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}

