"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const tags = [
  "Brand Strategy",
  "Digital Marketing",
  "Creative Direction",
  "Toronto-Based",
];

const values: { num: string; title: string; desc: string }[] = [
  {
    num: "01",
    title: "Sincerity First",
    desc: "We build relationships on honesty and transparency. No fluff, no empty promises — just real conversations and real results.",
  },
  {
    num: "02",
    title: "Results Over Vanity",
    desc: "We care about the metrics that matter to your bottom line, not vanity numbers that look good on paper.",
  },
  {
    num: "03",
    title: "Partnership Not Service",
    desc: "We see ourselves as an extension of your team. Your wins are our wins, and we invest in your success.",
  },
  {
    num: "04",
    title: "Agility & Adaptability",
    desc: "The digital landscape shifts fast. We stay ahead so you never fall behind.",
  },
  {
    num: "05",
    title: "Craft & Quality",
    desc: "Every deliverable is crafted with intention and care. We sweat the details so your brand shines.",
  },
  {
    num: "06",
    title: "Empowering Clients",
    desc: "We equip you with knowledge and tools so you feel confident and in control of your brand's direction.",
  },
];

const team: {
  name: string;
  role: string;
  initials: string;
  bio: string;
}[] = [
  {
    name: "Alex K.",
    role: "Founder & Creative Director",
    initials: "AK",
    bio: "A brand strategist with a decade of design experience. Alex founded FrameFlow to help small businesses tell bigger stories.",
  },
  {
    name: "Sara M.",
    role: "Head of Social Media",
    initials: "SM",
    bio: "Sara turns followers into communities. With a background in content strategy and analytics, she makes every post count.",
  },
  {
    name: "Jordan P.",
    role: "Lead Developer",
    initials: "JP",
    bio: "Jordan builds fast, accessible, and beautiful digital experiences — from marketing sites to full-stack applications.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative min-h-[90vh] bg-surface overflow-hidden">
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-12 px-6 md:px-[52px] pt-[140px] pb-24 lg:grid-cols-2">
          {/* Left */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6"
          >
            <motion.p
              variants={fadeUp}
              className="font-body text-sm uppercase tracking-[0.2em] text-on-surface-60"
            >
              Since 2021 &middot; Toronto
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl leading-[1.1] text-on-surface md:text-6xl lg:text-7xl"
            >
              We&rsquo;re Your{" "}
              <span className="italic text-amber">Sincere</span> Partner.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="max-w-[520px] font-body text-base leading-relaxed text-on-surface-60"
            >
              FrameFlow is a Toronto-based creative agency that champions small
              and medium-sized businesses. We combine strategic thinking with
              hands-on creativity to build brands people remember — and
              marketing that actually moves the needle.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 pt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-[1px] border border-on-surface-10 px-4 py-1.5 font-body text-xs uppercase tracking-wider text-on-surface-60"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative hidden aspect-square w-full overflow-hidden rounded-[2px] bg-[#2a2825] lg:block"
          >
            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,235,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,235,1) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />

            {/* Large FF */}
            <span className="pointer-events-none absolute inset-0 flex select-none items-center justify-center font-display text-[260px] font-bold leading-none text-on-surface-05">
              FF
            </span>

            {/* Label */}
            <span className="absolute bottom-8 left-8 font-body text-xs uppercase tracking-[0.18em] text-on-surface-30">
              FrameFlow Digital &middot; Est. 2021
            </span>

            {/* Accent lines */}
            <div className="absolute right-8 top-8 flex flex-col items-end gap-2">
              <span className="block h-[3px] w-[48px] rounded-full bg-amber" />
              <span className="block h-[3px] w-[32px] rounded-full bg-amber" />
              <span className="block h-[3px] w-[20px] rounded-full bg-amber" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== MISSION & VISION ===== */}
      <section className="bg-surface py-28 px-6 md:px-[52px]">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Mission */}
            <Reveal direction="up">
              <div className="relative p-10 md:p-12 rounded-[3px] border border-border-subtle">
                <div className="absolute top-0 left-0 w-[3px] h-full bg-amber rounded-l-[3px]" />
                <span className="font-body text-[10px] font-light tracking-[0.22em] uppercase text-amber mb-4 block">
                  Our Mission
                </span>
                <h3 className="font-display text-[26px] md:text-[30px] font-[700] text-on-surface leading-[1.2] mb-5">
                  Empower Growing Businesses Through Authentic Branding
                </h3>
                <p className="font-body text-[14px] font-light leading-[1.85] text-on-surface-60">
                  We exist to give small and medium-sized businesses the same
                  caliber of branding, design, and marketing that the big players
                  have — without the impersonal experience. Every strategy we
                  build starts with listening, and every deliverable is rooted in
                  your unique story.
                </p>
              </div>
            </Reveal>

            {/* Vision */}
            <Reveal direction="up" delay={0.12}>
              <div className="relative p-10 md:p-12 rounded-[3px] border border-border-subtle">
                <div className="absolute top-0 left-0 w-[3px] h-full bg-amber rounded-l-[3px]" />
                <span className="font-body text-[10px] font-light tracking-[0.22em] uppercase text-amber mb-4 block">
                  Our Vision
                </span>
                <h3 className="font-display text-[26px] md:text-[30px] font-[700] text-on-surface leading-[1.2] mb-5">
                  A World Where Every Brand Tells a Story Worth Hearing
                </h3>
                <p className="font-body text-[14px] font-light leading-[1.85] text-on-surface-60">
                  We envision a future where no business is held back by generic
                  marketing or forgettable visuals. FrameFlow is building toward
                  a creative landscape where authenticity wins, partnerships
                  thrive, and every brand — no matter the size — gets the
                  spotlight it deserves.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Quote */}
          <Reveal direction="up" delay={0.15}>
            <div className="mt-16 text-center max-w-[700px] mx-auto">
              <span className="font-display text-[80px] leading-none text-on-surface-05 block">
                &ldquo;
              </span>
              <blockquote className="-mt-10 font-display text-[20px] md:text-[24px] leading-[1.5] text-on-surface italic">
                Your brand is more than a logo — it&rsquo;s the entire
                experience your customers have with your business. We&rsquo;re
                here to make that experience unforgettable.
              </blockquote>
              <p className="mt-6 font-body text-[11px] uppercase tracking-[0.2em] text-on-surface-30">
                — FrameFlow, Founding Principle
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="bg-surface-alt py-28">
        <div className="mx-auto max-w-[1320px] px-6 md:px-[52px]">
          <Reveal>
            <p className="font-body text-[11px] font-light uppercase tracking-[0.22em] text-on-alt-80">
              What Drives Us
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-3 font-display text-4xl leading-tight text-on-alt md:text-5xl">
              Our Core Values
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.num} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.25 }}
                  className="group relative flex h-full flex-col gap-3 rounded-[3px] border border-on-alt-10 bg-surface-alt p-8 hover:border-amber/30 transition-colors duration-400"
                >
                  {/* Hover amber top border */}
                  <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 rounded-t-[3px] bg-amber transition-transform duration-300 group-hover:scale-x-100" />

                  <span className="font-body text-xs tracking-wider text-amber">
                    {v.num}
                  </span>
                  <h3 className="font-display text-xl text-on-alt">{v.title}</h3>
                  <p className="font-body text-sm leading-relaxed text-on-alt-80">
                    {v.desc}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className="bg-surface py-28">
        <div className="mx-auto max-w-[1320px] px-6 md:px-[52px]">
          <Reveal>
            <p className="font-body text-[11px] font-light uppercase tracking-[0.22em] text-on-surface-30">
              The People
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-3 font-display text-4xl leading-tight text-on-surface md:text-5xl">
              Meet the Team
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, i) => (
              <Reveal key={member.initials} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group overflow-hidden rounded-[2px] border border-border-subtle transition-colors hover:border-amber/40"
                >
                  {/* Card visual */}
                  <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#2a2825]">
                    {/* Grid pattern */}
                    <div
                      className="absolute inset-0 opacity-[0.04]"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,235,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,235,1) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                      }}
                    />
                    <span className="pointer-events-none select-none font-display text-[120px] font-bold leading-none text-on-surface-05">
                      {member.initials}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="bg-surface p-6">
                    <h3 className="font-display text-lg text-on-surface">
                      {member.name}
                    </h3>
                    <p className="mt-0.5 font-body text-xs uppercase tracking-wider text-amber">
                      {member.role}
                    </p>
                    <p className="mt-3 font-body text-sm leading-relaxed text-on-surface-60">
                      {member.bio}
                    </p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-surface-alt py-28">
        <div className="mx-auto max-w-[1320px] px-6 md:px-[52px] text-center">
          <Reveal>
            <h2 className="font-display text-4xl leading-tight text-on-alt md:text-5xl lg:text-6xl">
              Ready to Grow Together?
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-2.5 rounded-[1px] bg-amber px-10 py-4 font-body text-[13px] font-medium tracking-[0.1em] uppercase text-graphite transition-colors hover:bg-[#e09f3a]"
            >
              Book a Free Call &rarr;
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
