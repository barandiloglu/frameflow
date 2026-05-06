"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FilmStill } from "@/components/portfolio/FilmStill";
import type { Client } from "@/data/clients";

type Props = {
  client: Client;
  frameNumber: string;
  prev: Client;
  next: Client;
};

export function ClientPage({ client, frameNumber, prev, next }: Props) {
  const status = client.synopsis ? "ON SCREEN" : "IN POST";

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="relative bg-surface overflow-hidden pt-[76px]">
        <div className="pointer-events-none absolute top-[15%] right-[6%] h-[360px] w-[360px] rounded-full bg-ember-10 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-[8%] left-[4%] h-[280px] w-[280px] rounded-full bg-amber-10 blur-[120px]" />

        {/* REC strip */}
        <div className="relative z-20 border-y border-border-subtle bg-surface/50 backdrop-blur-sm px-6 md:px-[52px] py-3 flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.28em] text-on-surface-60">
          <span className="flex items-center gap-2 text-ember font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-ember animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
            </span>
            FF_ARCHIVE
          </span>
          <span className="hidden sm:inline text-on-surface-30">/</span>
          <span className="hidden sm:inline">/clients/{client.slug}</span>
          <span className="ml-auto flex items-center gap-2">
            <span className="text-on-surface-30">STATUS</span>
            <span className="text-amber">{status}</span>
          </span>
        </div>

        <div className="relative z-10 px-6 md:px-[52px] pt-20 md:pt-28 pb-16">
          <div className="relative max-w-[1500px] mx-auto">
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
                <Link href="/portfolio" className="text-on-surface-60 hover:text-amber transition-colors">
                  Portfolio
                </Link>
                <span className="mx-2 text-on-surface-30">/</span>
                {client.name}
              </span>
            </motion.p>

            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ember mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse-dot" />
              FF#{frameNumber} · Reel &apos;26
            </p>

            <h1
              className="font-editorial font-[300] italic leading-[0.9] tracking-[-0.03em] text-on-surface mb-8"
              style={{ fontSize: "clamp(48px, 8vw, 140px)" }}
            >
              {client.name}
            </h1>

            <div className="flex flex-wrap gap-2 mt-6">
              {client.services.map((s) => (
                <span
                  key={s}
                  className="border border-amber/30 bg-amber/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-amber"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FilmStill + body */}
      <section className="relative bg-surface px-6 md:px-[52px] py-[100px] overflow-hidden">
        <div className="pointer-events-none absolute top-[10%] right-[-5%] h-[400px] w-[400px] rounded-full bg-amber-10 blur-[160px]" />

        <div className="relative max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9 }}
          >
            <FilmStill client={client} frameNumber={frameNumber} size="large" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="lg:sticky lg:top-[96px]"
          >
            {client.synopsis ? (
              <RichBody client={client} />
            ) : (
              <InPostPanel />
            )}
          </motion.div>
        </div>
      </section>

      {/* PREV / NEXT NAV */}
      <section className="relative bg-surface-alt border-y border-on-alt-10 px-6 md:px-[52px] py-12">
        <nav aria-label="Adjacent clients" className="max-w-[1500px] mx-auto grid grid-cols-2 gap-6">
          <Link
            href={`/portfolio/${prev.slug}`}
            aria-label={`Previous client: ${prev.name}`}
            className="group flex items-baseline gap-4 no-underline"
          >
            <span aria-hidden="true" className="font-editorial not-italic text-[22px] text-on-alt-30 group-hover:text-amber group-hover:-translate-x-1 transition-all duration-300">
              ←
            </span>
            <span className="flex flex-col">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-on-alt-60 mb-1">
                Prev
              </span>
              <span className="font-editorial italic text-on-alt group-hover:text-amber transition-colors text-[20px] md:text-[28px]">
                {prev.name}
              </span>
            </span>
          </Link>
          <Link
            href={`/portfolio/${next.slug}`}
            aria-label={`Next client: ${next.name}`}
            className="group flex items-baseline justify-end gap-4 text-right no-underline"
          >
            <span className="flex flex-col items-end">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-on-alt-60 mb-1">
                Next
              </span>
              <span className="font-editorial italic text-on-alt group-hover:text-amber transition-colors text-[20px] md:text-[28px]">
                {next.name}
              </span>
            </span>
            <span aria-hidden="true" className="font-editorial not-italic text-[22px] text-on-alt-30 group-hover:text-amber group-hover:translate-x-1 transition-all duration-300">
              →
            </span>
          </Link>
        </nav>
      </section>

      {/* CTA — same booking strip as the index */}
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
              href="/portfolio"
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/80 hover:text-graphite underline decoration-graphite/30 underline-offset-4"
            >
              / back to the archive
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

function InPostPanel() {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ember mb-4 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse-dot" />
        Currently in post
      </p>
      <h2
        className="font-editorial font-[300] italic leading-[0.95] tracking-[-0.025em] text-on-surface mb-6"
        style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
      >
        Stills, scenes, and the full cut — coming soon.
      </h2>
      <p className="font-warm text-[15px] font-[300] leading-[1.85] text-on-surface-60 mb-8 max-w-[480px]">
        This case is still in post. Want a private screening before it&apos;s live?
        Get in touch.
      </p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <Link
          href="/contact"
          className="group inline-flex items-center gap-3 bg-amber text-graphite font-mono text-[12px] font-medium tracking-[0.22em] uppercase py-[14px] pl-6 pr-7 no-underline transition-all duration-300 hover:bg-ember hover:text-ivory"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-graphite group-hover:bg-ivory transition-colors" />
          Get in touch
          <span className="font-editorial text-[18px] leading-none">→</span>
        </Link>
        <Link
          href="/portfolio"
          className="font-mono text-[10px] uppercase tracking-[0.22em] text-on-surface-60 hover:text-amber underline decoration-on-surface-30 underline-offset-4"
        >
          / back to the archive
        </Link>
      </div>
    </div>
  );
}

function RichBody({ client }: { client: Client }) {
  const slate: Array<[string, string]> = [
    ["Directed by", "FrameFlow"],
    ["Genre", client.services.join(" · ")],
  ];
  if (client.year) slate.push(["Year", client.year]);
  if (client.location) slate.push(["Location", client.location]);
  if (client.runtime) slate.push(["Runtime", client.runtime]);

  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ember mb-4 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse-dot" />
        Now showing
      </p>
      <p className="font-warm text-[15px] font-[300] leading-[1.85] text-on-surface-60 mb-10 max-w-[480px]">
        {client.synopsis}
      </p>
      <div className="border-y border-border-subtle divide-y divide-border-subtle max-w-[480px]">
        {slate.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-6 py-3.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-on-surface-30">
              {k}
            </span>
            <span className="font-warm text-[13px] text-on-surface text-right">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
