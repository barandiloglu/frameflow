"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const values = [
  {
    num: "I",
    title: "Sincerity First",
    desc: "Relationships built on honesty and transparency. No fluff, no empty promises — real conversations, real results.",
  },
  {
    num: "II",
    title: "Results Over Vanity",
    desc: "The metrics that matter to your bottom line, not the vanity numbers that only look good on paper.",
  },
  {
    num: "III",
    title: "Partnership Not Service",
    desc: "We see ourselves as an extension of your team. Your wins are our wins. We invest in your success.",
  },
  {
    num: "IV",
    title: "Agility & Adaptability",
    desc: "The digital landscape shifts fast. We stay ahead so you never fall behind.",
  },
  {
    num: "V",
    title: "Craft & Quality",
    desc: "Every deliverable is shot with intention. We sweat the details so your brand shines on every surface.",
  },
  {
    num: "VI",
    title: "Empowering Clients",
    desc: "We equip you with the knowledge and tools to stay confident and in control of your brand's direction.",
  },
];

const cast = [
  {
    name: "Alex K.",
    role: "Director & Founder",
    credit: "Creative Direction",
    initials: "AK",
    scene: "INT. STUDIO — DAY",
    bio: "A brand strategist with a decade of design experience. Alex founded FrameFlow to help small businesses tell bigger stories.",
  },
  {
    name: "Sara M.",
    role: "Producer",
    credit: "Social & Content",
    initials: "SM",
    scene: "EXT. FEED — CONTINUOUS",
    bio: "Sara turns followers into communities. With a background in content strategy and analytics, she makes every post count.",
  },
  {
    name: "Jordan P.",
    role: "Lead Engineer",
    credit: "Web & Product",
    initials: "JP",
    scene: "INT. DEV BAY — DAY",
    bio: "Jordan builds fast, accessible, and beautiful digital experiences — from marketing sites to full-stack applications.",
  },
];

const creditsReel = [
  ["Studio", "FrameFlow"],
  ["Established", "2021"],
  ["Headquarters", "Toronto · ON"],
  ["Crew Size", "12"],
  ["Brands Shipped", "047"],
  ["Retention", "98%"],
  ["Languages", "EN / FR / KO / TR"],
  ["Operating Hours", "Mon–Fri 9–6 EST"],
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <section className="relative bg-surface overflow-hidden pt-[76px]">
        {/* backdrops */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-overlay animate-scan"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, var(--color-ivory) 0 1px, transparent 1px 4px)",
          }}
        />
        <div className="pointer-events-none absolute top-[12%] right-[8%] h-[340px] w-[340px] rounded-full bg-amber-10 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-[6%] left-[4%] h-[280px] w-[280px] rounded-full bg-ember-10 blur-[130px]" />

        <div className="relative z-20 border-y border-border-subtle bg-surface/50 backdrop-blur-sm px-6 md:px-[52px] py-3 flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.28em] text-on-surface-60">
          <span className="flex items-center gap-2 text-amber font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber animate-pulse-dot" />
            ABOUT
          </span>
          <span>FF_DOC_STUDIO</span>
          <span className="hidden sm:inline text-on-surface-30">/</span>
          <span className="hidden sm:inline">TORONTO · 43.65N 79.38W</span>
          <span className="ml-auto hidden md:flex items-center gap-2">
            <span className="text-on-surface-30">EST</span>
            <span className="text-amber">2021</span>
          </span>
        </div>

        <div className="relative z-10 px-6 md:px-[52px] pt-24 md:pt-32 pb-32">
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
                <Link href="/" className="text-on-surface-60 hover:text-amber transition-colors">Home</Link>
                <span className="mx-2 text-on-surface-30">/</span>
                About
              </span>
            </motion.p>

            <h1
              className="font-editorial font-[300] leading-[0.9] tracking-[-0.035em] text-on-surface"
              style={{ fontSize: "clamp(54px, 10vw, 168px)" }}
            >
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "108%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.95, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
                  className="block"
                >
                  A small studio.
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "108%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.95, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                  className="block"
                >
                  Making <em className="italic text-amber">big</em> stories
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "108%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.95, delay: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                  className="block"
                >
                  look inevitable.
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-10 max-w-[580px] font-warm text-[15px] font-[300] leading-[1.75] text-on-surface-60"
            >
              FrameFlow is a Toronto creative studio championing small and medium-sized
              businesses. We combine strategic thinking with hands-on craft to build brands
              people remember — and marketing that actually moves the needle.
            </motion.p>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85 }}
              className="mt-10 flex flex-wrap gap-2"
            >
              {["Brand Strategy", "Digital Marketing", "Creative Direction", "Toronto-Based"].map(
                (t) => (
                  <span
                    key={t}
                    className="border border-border-subtle px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-on-surface-60"
                  >
                    {t}
                  </span>
                ),
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  LOGLINE — Mission & Vision                                  */}
      {/* ============================================================ */}
      <section className="relative bg-surface-alt border-y border-on-alt-10 px-6 md:px-[52px] py-[140px] overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-graphite-20) 1px, transparent 1px), linear-gradient(90deg, var(--color-graphite-20) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 90%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 90%)",
          }}
        />
        <div className="relative max-w-[1500px] mx-auto">
          <p className="mb-14 font-mono text-[11px] uppercase tracking-[0.32em] text-on-alt-60 flex items-center gap-3">
            <span className="block h-px w-10 bg-on-alt-30" />
            Frame · 01 — Logline
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {[
              {
                tag: "Our mission",
                title: "Empower growing businesses through authentic branding.",
                body: "We exist to give small and medium-sized businesses the same caliber of branding, design, and marketing that the big players have — without the impersonal experience. Every strategy starts with listening, every deliverable is rooted in your story.",
              },
              {
                tag: "Our vision",
                title: "A world where every brand tells a story worth hearing.",
                body: "We envision a creative landscape where no business is held back by generic marketing or forgettable visuals. Where authenticity wins, partnerships thrive, and every brand — no matter the size — gets the spotlight it deserves.",
              },
            ].map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: i * 0.12 }}
                className="relative border border-on-alt-10 bg-surface-alt p-10 md:p-12"
              >
                <div className="absolute inset-3 border border-dashed border-on-alt-10 pointer-events-none" />
                <div className="relative">
                  <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.28em] text-ember flex items-center gap-3">
                    <span className="block h-px w-8 bg-ember" />
                    {b.tag}
                  </p>
                  <h3
                    className="font-editorial font-[300] text-on-alt leading-[1.05] tracking-[-0.01em] mb-6"
                    style={{ fontSize: "clamp(30px, 3.4vw, 48px)" }}
                  >
                    {b.title}
                  </h3>
                  <p className="font-warm text-[14px] font-[300] leading-[1.85] text-on-alt-80">
                    {b.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Founding quote */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="mt-24 relative max-w-[1000px] mx-auto pl-4 md:pl-24"
          >
            <span
              aria-hidden
              className="absolute -top-16 -left-2 md:left-0 font-editorial italic text-ember/80 font-[300] leading-none select-none"
              style={{ fontSize: "clamp(150px, 16vw, 260px)" }}
            >
              &ldquo;
            </span>
            <blockquote className="relative">
              <p
                className="font-editorial italic font-[300] leading-[1.1] text-on-alt tracking-[-0.01em]"
                style={{ fontSize: "clamp(28px, 4vw, 60px)" }}
              >
                Your brand is more than a logo — it&apos;s the entire experience your
                customers have with your business. We&apos;re here to make that{" "}
                <span className="not-italic text-amber">unforgettable</span>.
              </p>
              <footer className="mt-8 flex items-center gap-4">
                <span className="h-[1px] w-10 bg-amber" />
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-on-alt-60">
                  FrameFlow · Founding principle
                </p>
              </footer>
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  DIRECTIONS — Core values                                    */}
      {/* ============================================================ */}
      <section className="relative bg-surface px-6 md:px-[52px] py-[140px]">
        <div className="max-w-[1500px] mx-auto">
          <div className="mb-20">
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.32em] text-amber flex items-center gap-3">
              <span className="block h-px w-10 bg-amber" />
              Frame · 02 — Director&apos;s Notes
            </p>
            <h2
              className="font-editorial font-[300] leading-[0.95] tracking-[-0.025em] text-on-surface max-w-[1100px]"
              style={{ fontSize: "clamp(44px, 6vw, 100px)" }}
            >
              Six <em className="italic text-amber">directions</em> we shoot by.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border-subtle border border-border-subtle">
            {values.map((v, i) => (
              <motion.div
                key={v.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="group relative bg-surface p-10 hover:bg-amber-10 transition-colors duration-500"
              >
                <div className="flex items-start justify-between gap-6 mb-8">
                  <span
                    className="font-editorial italic font-[300] text-amber leading-none"
                    style={{ fontSize: "clamp(48px, 5vw, 76px)" }}
                  >
                    {v.num}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-on-surface-30">
                    Note {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-editorial font-[400] text-on-surface text-[26px] leading-tight mb-4">
                  {v.title}
                </h3>
                <p className="font-warm text-[13px] font-[300] leading-[1.75] text-on-surface-60">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CAST — Team                                                 */}
      {/* ============================================================ */}
      <section className="relative bg-surface-alt border-y border-on-alt-10 px-6 md:px-[52px] py-[140px]">
        <div className="max-w-[1500px] mx-auto">
          <div className="mb-20">
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.32em] text-ember flex items-center gap-3">
              <span className="block h-px w-10 bg-ember" />
              Frame · 03 — The Cast
            </p>
            <h2
              className="font-editorial font-[300] leading-[0.95] tracking-[-0.025em] text-on-alt"
              style={{ fontSize: "clamp(44px, 6vw, 100px)" }}
            >
              The people <em className="italic text-amber">behind</em>
              <br />
              the camera.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cast.map((m, i) => (
              <motion.div
                key={m.initials}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: i * 0.12 }}
                className="group relative border border-on-alt-10 bg-surface-alt overflow-hidden"
              >
                {/* portrait slate */}
                <div className="relative aspect-[4/5] bg-graphite border-b border-on-alt-10 overflow-hidden">
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,235,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,235,1) 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                    }}
                  />

                  <div className="absolute inset-3 border border-dashed border-amber/30" />

                  <span
                    className="absolute inset-0 flex items-center justify-center font-editorial italic font-[300] text-ivory/20 leading-none select-none"
                    style={{ fontSize: "clamp(140px, 14vw, 220px)" }}
                  >
                    {m.initials}
                  </span>

                  {/* slate meta */}
                  <div className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-[0.22em] text-amber">
                    Cast {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-ember">
                    <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse-dot" />
                    on set
                  </div>
                  <div className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-[0.22em] text-ivory/60">
                    {m.scene}
                  </div>
                  <div className="absolute bottom-4 right-4 font-mono text-[9px] uppercase tracking-[0.22em] text-ivory/40">
                    {m.credit}
                  </div>
                </div>

                {/* info */}
                <div className="p-7">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber mb-3">
                    {m.role}
                  </p>
                  <h3 className="font-editorial font-[400] text-on-alt text-[30px] leading-none mb-4">
                    {m.name}
                  </h3>
                  <p className="font-warm text-[13px] font-[300] leading-[1.75] text-on-alt-80">
                    {m.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CREDITS REEL                                                */}
      {/* ============================================================ */}
      <section className="relative bg-surface px-6 md:px-[52px] py-[100px]">
        <div className="max-w-[1500px] mx-auto">
          <p className="mb-12 font-mono text-[11px] uppercase tracking-[0.32em] text-amber flex items-center gap-3">
            <span className="block h-px w-10 bg-amber" />
            Frame · 04 — Credits Reel
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border-subtle border border-border-subtle">
            {creditsReel.map(([k, v], i) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="bg-surface p-6 md:p-8"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-on-surface-30 mb-3">
                  {k}
                </p>
                <p className="font-editorial text-[22px] md:text-[26px] text-on-surface leading-none">
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
              Ready for your close-up?
            </p>
            <h2
              className="font-editorial font-[300] leading-[0.92] tracking-[-0.025em] text-graphite"
              style={{ fontSize: "clamp(44px, 6vw, 96px)" }}
            >
              Let&apos;s grow <em className="italic">together</em>.
            </h2>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 bg-graphite text-ivory font-mono text-[12px] font-medium tracking-[0.22em] uppercase py-[18px] pl-7 pr-9 no-underline transition-all duration-300 hover:bg-ivory hover:text-graphite"
            >
              <span className="w-2 h-2 rounded-full bg-ember animate-pulse-dot" />
              Book a free call
              <span className="font-editorial text-[18px] leading-none">→</span>
            </Link>
            <Link
              href="/portfolio"
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/80 hover:text-graphite underline decoration-graphite/30 underline-offset-4"
            >
              / see the reel
            </Link>
          </div>
        </div>

        <div className="relative flex flex-col justify-center bg-surface-alt px-6 md:px-[60px] py-20 lg:py-[100px]">
          <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.28em] text-on-alt-60 flex items-center gap-3">
            <span className="block h-px w-10 bg-on-alt-30" />
            Studio hours
          </p>
          <div className="flex flex-col gap-6">
            {[
              { k: "Mon–Fri", v: "9am–6pm EST · Virtual or in-studio by appointment" },
              { k: "Weekends", v: "Inquiries answered first thing Monday morning" },
              { k: "Urgent", v: "hello@frameflow.ca / we respond within 1 business day" },
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
