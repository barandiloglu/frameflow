"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const stats = [
  { value: "100+", label: "Clients Served" },
  { value: "4", label: "Years in Business" },
  { value: "7", label: "Core Services" },
  { value: "98%", label: "Client Satisfaction" },
];

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
    name: "Logo Design",
    description:
      "Strategic visual assets that make your brand unforgettable — crafted for lasting recognition.",
  },
  {
    name: "Brand Identity",
    description:
      "Complete identities built to connect, built to last — voice, visuals, values, all telling one story.",
  },
  {
    name: "Website Design",
    description:
      "Modern, SEO-friendly, mobile-responsive websites custom-built to make your business thrive online.",
  },
  {
    name: "Social Media Management",
    description:
      "Strategy-driven campaigns on Instagram, Facebook, TikTok and beyond — creative content that actually converts.",
  },
  {
    name: "Video & Photo Shooting",
    description:
      "High-quality photography and videography that captures your brand's true essence and stops the scroll.",
  },
  {
    name: "Ad Management",
    description:
      "Data-driven Google and Meta campaigns designed for real ROI — no wasted budget, only results.",
  },
  {
    name: "Web & Mobile Applications",
    description:
      "End-to-end app development — from concept to polished product, your vision brought to life.",
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

const whySections = [
  {
    numeral: "I",
    tag: "Brand & Identity",
    heading: "Real Impact Starts With Real Identity",
    text: "A strong brand is more than a logo — it's the feeling people get when they encounter your business. We build identities that are authentic, memorable, and strategically designed to set you apart in a crowded market.",
    flipped: false,
  },
  {
    numeral: "II",
    tag: "Partnership",
    heading: "We Don't Just Work For You — We Work With You",
    text: "We believe the best results come from genuine collaboration. You're not a ticket in our queue — you're a partner. We embed ourselves in your goals, communicate transparently, and celebrate wins together.",
    flipped: true,
  },
  {
    numeral: "III",
    tag: "Marketing",
    heading: "You Do You. We'll Handle the Marketing.",
    text: "Running a business is demanding enough. Let us take the weight of branding, social media, ads, and web off your shoulders so you can focus on what you do best — serving your customers.",
    flipped: false,
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
              "linear-gradient(to right, var(--color-crimson-15) 1px, transparent 1px), linear-gradient(to bottom, var(--color-crimson-15) 1px, transparent 1px)",
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
                className="font-body text-[13px] font-medium tracking-[0.06em] uppercase border border-crimson text-on-surface py-[13px] px-8 rounded-[1px] no-underline transition-colors duration-200 hover:border-amber hover:text-amber"
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
      {/*  2. STATS BAR                                                */}
      {/* ============================================================ */}
      <section className="bg-amber">
        <Reveal direction="up">
          <div className="grid grid-cols-2 md:grid-cols-4 px-6 md:px-[52px] py-[42px]">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`flex flex-col items-center text-center ${
                  i < stats.length - 1 ? "border-r border-graphite-20" : ""
                }`}
              >
                <span className="font-display text-[42px] font-[800] text-graphite leading-none">
                  {s.value}
                </span>
                <span className="mt-1 font-body text-[12px] font-medium tracking-[0.12em] uppercase text-graphite-80">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
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
              <span className="inline-block h-[6px] w-[6px] rounded-full bg-crimson" />
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  4. SERVICES                                                 */}
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

        {/* Rows */}
        <div className="border-t border-border-subtle">
          {services.map((svc, i) => (
            <ServiceRow key={i} index={i} service={svc} />
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  5. PROCESS                                                  */}
      {/* ============================================================ */}
      <section className="bg-surface-alt py-[100px] px-6 md:px-[52px]">
        <Reveal direction="up">
          <div className="mb-16">
            <p className="mb-2 font-body text-[11px] font-light tracking-[0.22em] uppercase text-on-alt-80">
              How It Works
            </p>
            <h2 className="font-display text-[48px] font-[700] text-on-alt leading-none">
              Our Process
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, i) => (
            <Reveal key={i} direction="up" delay={i * 0.1}>
              <ProcessCard step={step} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  6. WHY FRAMEFLOW                                            */}
      {/* ============================================================ */}
      <section className="bg-surface">
        {whySections.map((section, i) => (
          <WhyBlock key={i} index={i} section={section} />
        ))}
      </section>

      {/* ============================================================ */}
      {/*  7. CTA                                                      */}
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
        <div className="flex flex-col justify-center bg-crimson px-6 md:px-[52px] py-[80px]">
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
                  <p className="mb-1 font-body text-[10px] font-light tracking-[0.2em] uppercase text-ivory-60">
                    {item.label}
                  </p>
                  <p className="font-body text-[14px] font-light leading-[1.7] text-ivory">
                    {item.value}
                  </p>
                  {i < arr.length - 1 && (
                    <div className="mt-8 h-[1px] w-full bg-ivory-10" />
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
/*  Service Row                                                        */
/* ------------------------------------------------------------------ */

function ServiceRow({
  index,
  service,
}: {
  index: number;
  service: { name: string; description: string };
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Reveal direction="up" delay={index * 0.05}>
      <div
        className="group cursor-pointer border-b border-border-subtle py-6 transition-colors duration-300"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="font-body text-[13px] font-light text-on-surface-30 w-[32px]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className={`font-display text-[22px] font-[600] transition-colors duration-300 ${
                hovered ? "text-amber" : "text-on-surface"
              }`}
            >
              {service.name}
            </span>
          </div>
          <span
            className={`font-body text-[18px] transition-all duration-300 ${
              hovered
                ? "text-amber translate-x-0 opacity-100"
                : "text-on-surface-30 -translate-x-2 opacity-0"
            }`}
          >
            &rarr;
          </span>
        </div>

        {/* Description reveal */}
        <motion.div
          initial={false}
          animate={{
            height: hovered ? "auto" : 0,
            opacity: hovered ? 1 : 0,
          }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="overflow-hidden"
        >
          <p className="pt-3 pl-[64px] font-body text-[13px] font-light leading-[1.7] text-on-surface-60 max-w-[500px]">
            {service.description}
          </p>
        </motion.div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Process Card                                                       */
/* ------------------------------------------------------------------ */

function ProcessCard({
  step,
}: {
  step: { number: string; title: string; description: string };
}) {
  return (
    <div className="group relative overflow-hidden rounded-[2px] border border-on-alt-20 p-8 pt-14 transition-all duration-400 hover:bg-surface hover:border-border-subtle cursor-pointer">
      {/* Large number watermark */}
      <span className="pointer-events-none absolute top-3 right-4 font-display text-[100px] font-[800] leading-none text-on-alt-20 transition-colors duration-400 group-hover:text-on-surface-05 select-none">
        {step.number}
      </span>

      <div className="relative z-10">
        <p className="mb-1 font-body text-[11px] font-light tracking-[0.2em] uppercase text-on-alt-80 transition-colors duration-400 group-hover:text-on-surface-30">
          Step {step.number}
        </p>
        <h3 className="mb-3 font-display text-[20px] font-[700] text-on-alt transition-colors duration-400 group-hover:text-on-surface">
          {step.title}
        </h3>
        <p className="font-body text-[13px] font-light leading-[1.7] text-on-alt-80 transition-colors duration-400 group-hover:text-on-surface-60">
          {step.description}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Why Block                                                          */
/* ------------------------------------------------------------------ */

function WhyBlock({
  index,
  section,
}: {
  index: number;
  section: {
    numeral: string;
    tag: string;
    heading: string;
    text: string;
    flipped: boolean;
  };
}) {
  const visual = (
    <div className={`relative flex items-center justify-center overflow-hidden min-h-[480px] ${
      section.flipped ? "bg-surface-alt" : "bg-[rgba(53,50,48,0.6)]"
    }`}>
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: section.flipped
            ? "linear-gradient(rgba(53,50,48,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(53,50,48,0.06) 1px, transparent 1px)"
            : "linear-gradient(to right, var(--color-crimson-15) 1px, transparent 1px), linear-gradient(to bottom, var(--color-crimson-15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Amber accent line */}
      <span className={`absolute top-10 left-10 block h-[1px] w-[48px] ${section.flipped ? "bg-crimson" : "bg-amber"}`} />
      {/* Tag */}
      <span className={`absolute top-10 left-[76px] font-body text-[10px] font-light tracking-[0.2em] uppercase ${
        section.flipped ? "text-on-alt-20" : "text-on-surface-30"
      }`}>
        {section.tag}
      </span>
      {/* Large numeral */}
      <span className={`pointer-events-none font-display text-[180px] font-[800] leading-none select-none ${
        section.flipped ? "text-on-alt-20" : "text-on-surface-05"
      }`}>
        {section.numeral}
      </span>
    </div>
  );

  const textSide = (
    <div
      className={`flex flex-col justify-center px-6 md:px-[52px] py-[72px] ${
        section.flipped ? "bg-surface-alt" : "bg-surface"
      }`}
    >
      <Reveal direction={section.flipped ? "left" : "right"}>
        <span
          className={`mb-4 font-body text-[13px] font-light ${
            section.flipped ? "text-on-alt-80" : "text-on-surface-30"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3
          className={`mb-5 font-display text-[34px] font-[700] leading-[1.15] max-w-[400px] ${
            section.flipped ? "text-on-alt" : "text-on-surface"
          }`}
        >
          {section.heading}
        </h3>
        <p
          className={`mb-8 font-body text-[14px] font-light leading-[1.8] max-w-[420px] ${
            section.flipped ? "text-on-alt-80" : "text-on-surface-60"
          }`}
        >
          {section.text}
        </p>
        <Link
          href="/about"
          className="font-body text-[13px] font-light tracking-[0.04em] text-amber no-underline transition-opacity duration-200 hover:opacity-70"
        >
          Read More &rarr;
        </Link>
      </Reveal>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {section.flipped ? (
        <>
          {textSide}
          {visual}
        </>
      ) : (
        <>
          {visual}
          {textSide}
        </>
      )}
    </div>
  );
}
