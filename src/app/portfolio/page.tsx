"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  clients,
  getFrameNumber,
  getServiceCounts,
  getDistinctServiceCount,
  type Client,
} from "@/data/clients";

const TOTAL_CLIENTS = clients.length;
const DISTINCT_SERVICES = getDistinctServiceCount();
const TOP_SERVICES = getServiceCounts().slice(0, 6);

export default function PortfolioPage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
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
          <span className="hidden sm:inline">{TOTAL_CLIENTS} CLIENTS CATALOGUED</span>
          <span className="ml-auto hidden md:flex items-center gap-2">
            <span className="text-on-surface-30">VOL</span>
            <span className="text-amber">2026</span>
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
                  <span className="block text-on-surface-30 mb-2">Clients</span>
                  <span className="font-editorial font-[300] text-[44px] text-amber leading-none tracking-[-0.02em]">
                    {String(TOTAL_CLIENTS).padStart(3, "0")}
                  </span>
                </div>
                <div>
                  <span className="block text-on-surface-30 mb-2">Years</span>
                  <span className="font-editorial font-[300] text-[44px] text-on-surface leading-none tracking-[-0.02em]">
                    05
                  </span>
                </div>
                <div>
                  <span className="block text-on-surface-30 mb-2">Services</span>
                  <span className="font-editorial font-[300] text-[44px] text-on-surface leading-none tracking-[-0.02em]">
                    {String(DISTINCT_SERVICES).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TITLES MARQUEE */}
      <section className="relative overflow-hidden bg-surface-alt border-y border-on-alt-10">
        <div className="flex w-max animate-ticker-slow items-center py-9">
          {[...clients, ...clients, ...clients].map((c, i) => (
            <span key={i} className="flex items-center gap-12 pr-12 shrink-0">
              <span
                className="font-editorial italic font-[300] leading-none text-on-alt"
                style={{ fontSize: "clamp(44px, 7vw, 110px)" }}
              >
                {c.name}
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

      {/* THE INDEX */}
      <section className="relative bg-surface-alt border-y border-on-alt-10 px-6 md:px-[52px] py-[140px]">
        <div className="max-w-[1500px] mx-auto">
          <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div>
              <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.32em] text-ember flex items-center gap-3">
                <span className="block h-px w-10 bg-ember" />
                Frame · 01 — The Index
              </p>
              <h2
                className="font-editorial font-[300] leading-[0.92] tracking-[-0.025em] text-on-alt"
                style={{ fontSize: "clamp(44px, 6vw, 100px)" }}
              >
                Every client,
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
          <div className="hidden md:grid grid-cols-[80px_minmax(0,3fr)_minmax(0,1.5fr)_80px] gap-6 border-y border-on-alt-10 py-4 font-mono text-[10px] uppercase tracking-[0.24em] text-on-alt-60">
            <span>Frame</span>
            <span>Client</span>
            <span>Services</span>
            <span className="text-right">Act</span>
          </div>

          {/* Rows */}
          <div>
            {clients.map((c, i) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: i * 0.04 }}
              >
                <IndexRow client={c} frameNumber={getFrameNumber(c)} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHIVE STATS */}
      <section className="relative bg-surface-alt border-y border-on-alt-10 px-6 md:px-[52px] py-[110px]">
        <div className="max-w-[1500px] mx-auto">
          <p className="mb-14 font-mono text-[11px] uppercase tracking-[0.32em] text-on-alt-60 flex items-center gap-3">
            <span className="block h-px w-10 bg-on-alt-30" />
            Frame · 02 — Archive Manifest
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-on-alt-10 border border-on-alt-10">
            {TOP_SERVICES.map(({ service, count }, i) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="bg-surface-alt p-8"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-on-alt-60 mb-3">
                  {service}
                </p>
                <p className="font-editorial font-[300] text-on-alt leading-none tracking-[-0.02em] text-[56px]">
                  {String(count).padStart(2, "0")}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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

function IndexRow({ client, frameNumber }: { client: Client; frameNumber: string }) {
  const services = client.services.map((s) => s.toUpperCase()).join(" · ");

  return (
    <Link
      href={`/portfolio/${client.slug}`}
      className="group relative grid grid-cols-[60px_1fr] md:grid-cols-[80px_minmax(0,3fr)_minmax(0,1.5fr)_80px] gap-x-6 gap-y-2 border-b border-on-alt-10 py-6 md:py-7 items-baseline cursor-pointer transition-colors duration-300 hover:bg-on-alt-05 no-underline"
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-amber">
        {frameNumber}
      </span>

      <div className="md:col-span-1">
        <h3
          className="font-editorial font-[300] italic leading-[1.02] tracking-[-0.01em] text-on-alt group-hover:text-amber transition-colors"
          style={{ fontSize: "clamp(28px, 3.4vw, 52px)" }}
        >
          {client.name}
          {client.featured && (
            <span className="ml-4 align-middle inline-flex items-center gap-1.5 border border-ember/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-ember not-italic font-normal">
              <span className="w-1 h-1 rounded-full bg-ember animate-pulse-dot" />
              Now showing
            </span>
          )}
          {client.wip && (
            <span className="ml-4 align-middle inline-flex items-center gap-1.5 border border-amber/50 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-amber not-italic font-normal">
              <span className="w-1 h-1 rounded-full bg-amber animate-pulse-dot" />
              Work in progress
            </span>
          )}
        </h3>
      </div>

      <div className="hidden md:block font-mono text-[11px] uppercase tracking-[0.22em] text-on-alt-80 leading-[1.7]">
        {services}
      </div>

      <div className="hidden md:flex justify-end">
        <span className="font-editorial not-italic text-[22px] text-on-alt-30 group-hover:text-amber group-hover:translate-x-1 transition-all duration-300">
          →
        </span>
      </div>

      {/* mobile secondary row */}
      <div className="md:hidden col-start-2 font-mono text-[10px] uppercase tracking-[0.22em] text-on-alt-60 leading-[1.7]">
        {services}
      </div>
    </Link>
  );
}
