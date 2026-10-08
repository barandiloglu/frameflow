"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Slates, type Service } from "@/components/services/Slates";
import { clients } from "@/data/clients";

/* ------------------------------------------------------------------ */
/*  Services: the hero chrome every page shares, then eight            */
/*  clapperboards. See components/services/Slates.tsx.                 */
/* ------------------------------------------------------------------ */

const services: readonly Service[] = [
  {
    id: 1,
    name: "Logo Design",
    category: "Branding",
    subtitle: "the signature shot",
    scene: "INT. STUDIO — INSERT",
    tagline: "Your brand starts here.",
    description:
      "Your logo is the face of your brand — the first thing customers see and the weight of your identity, values, and promise. We craft strategic visual assets that set you up for lasting recognition.",
    features: [
      "Custom logo concepts from scratch — no templates",
      "Full brand mark suite (primary, secondary, icon)",
      "Color palette & typography recommendations",
      "All files delivered: SVG, PNG, PDF, EPS",
    ],
  },
  {
    id: 2,
    name: "Brand Identity",
    category: "Branding",
    subtitle: "the core frame",
    scene: "INT. STUDIO — DAY",
    tagline: "Built to connect, built to last.",
    description:
      "Your brand is more than a logo — it's the entire experience. Voice, visuals, values, all working together. We build complete brand identities that make you memorable and magnetic.",
    features: [
      "Full visual identity system with brand guidelines",
      "Typography & color system",
      "Brand voice & messaging strategy",
      "Business cards, stationery & collateral design",
    ],
  },
  {
    id: 3,
    name: "Website Design",
    category: "Digital",
    subtitle: "the main stage",
    scene: "EXT. WEB — CONTINUOUS",
    tagline: "Your business is unique. Your site should be too.",
    description:
      "Your website is your central hub. We build custom sites that look incredible, function flawlessly, and are engineered from the ground up to help your business thrive online.",
    features: [
      "Custom design — no page builders or generic themes",
      "Mobile-responsive & performance optimized",
      "SEO-ready structure & on-page optimization",
      "CMS integration so you can manage content easily",
    ],
  },
  {
    id: 4,
    name: "Social Media",
    category: "Marketing",
    subtitle: "the daily rushes",
    scene: "EXT. FEED — CONTINUOUS",
    tagline: "Your social? Consider it handled.",
    description:
      "You know you need social media — but who has time? FrameFlow is your dedicated social strategist, content creator, and community manager all in one results-driven package.",
    features: [
      "Monthly content calendars & post scheduling",
      "Custom graphic design & video editing per post",
      "Community management & comment responses",
      "Monthly analytics reports & strategy adjustments",
    ],
  },
  {
    id: 5,
    name: "Video & Photo",
    category: "Content",
    subtitle: "principal photography",
    scene: "EXT. LOCATION — GOLDEN HR",
    tagline: "Your story is worth seeing.",
    description:
      "Stock photos and shaky smartphone videos don't cut it. We create high-quality photography and videography that stops the scroll, tells your story, and makes a genuine connection.",
    features: [
      "Product, food, lifestyle & event photography",
      "Promotional & social media videos",
      "Professional editing & post-production",
      "Delivered in all formats for web, social & print",
    ],
  },
  {
    id: 6,
    name: "Ad Management",
    category: "Advertising",
    subtitle: "the wide release",
    scene: "INT. WAR ROOM — NIGHT",
    tagline: "Stop burning budget on ads that don't convert.",
    description:
      "Throwing money at Google or Meta without a strategy burns budget fast. We build intelligent, data-driven campaigns designed for one thing: the best possible ROI for your business.",
    features: [
      "Google, Meta & TikTok ads setup & management",
      "Audience research & targeting strategy",
      "Ad creative design & copywriting",
      "Weekly performance reporting & optimization",
    ],
  },
  {
    id: 7,
    name: "Web & Mobile Apps",
    category: "Development",
    subtitle: "the sequel",
    scene: "INT. DEV BAY — DAY",
    tagline: "Got an app idea? Let's build it.",
    description:
      "A killer app idea can solve a problem, create a community, or transform an industry. FrameFlow is your end-to-end partner — from UX/UI through development to launch and beyond.",
    features: [
      "UX/UI design & interactive prototyping",
      "Web & mobile app development (iOS & Android)",
      "API integrations & backend development",
      "Ongoing maintenance, updates & support",
    ],
  },
  {
    /* DRAFT — the deliverables are a guess at what is actually sold and need
       Baran's sign-off before this ships. */
    id: 8,
    name: "SEO",
    category: "Growth",
    subtitle: "the long game",
    scene: "EXT. SEARCH — DAY",
    tagline: "Be the answer when someone searches.",
    description:
      "Ranking is not luck. We fix what search engines struggle with, write pages that answer the questions your customers actually type, and build the technical base so your site keeps earning traffic after the ads stop.",
    features: [
      "Technical audit: speed, crawlability, structured data",
      "Keyword and competitor research",
      "On-page optimisation and content structure",
      "Monthly ranking and traffic reporting",
    ],
  },
];

export default function ServicesPage() {
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
            backgroundImage: "radial-gradient(var(--color-amber-10) 1px, transparent 1px)",
            backgroundSize: "38px 38px",
            maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 90%)",
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
            ROLLING
          </span>
          <span>FF_DOC_SVC</span>
          <span className="hidden sm:inline text-on-surface-30">/</span>
          <span className="hidden sm:inline">{services.length} SCENES · 1 STUDIO</span>
          <span className="ml-auto hidden md:flex items-center gap-2">
            <span className="text-on-surface-30">SLATE</span>
            <span className="text-amber">A001</span>
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
                Services
              </span>
            </motion.p>

            <h1
              className="font-editorial font-[700] leading-[0.9] tracking-[-0.035em] text-on-surface"
              style={{ fontSize: "clamp(56px, 10.2vw, 172px)" }}
            >
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "108%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.95, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
                  className="block"
                >
                  Eight scenes.
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "108%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.95, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                  className="block"
                >
                  One <em className="italic text-amber">studio</em>.
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
                Brand, web, content and growth — the whole production, or just the scene
                you&apos;re missing. Every slate below opens on the storyboard we&apos;d
                draw for that shot.
              </p>
              <div className="flex gap-12">
                {[
                  { k: "Scenes", v: String(services.length).padStart(2, "0") },
                  { k: "Clients", v: String(clients.length).padStart(2, "0") },
                ].map((st) => (
                  <div key={st.k}>
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-on-surface-30 mb-2">
                      {st.k}
                    </p>
                    <p className="font-editorial font-[700] text-[44px] leading-none text-amber tracking-[-0.02em]">
                      {st.v}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Frame · 02 — THE SLATES                                     */}
      {/* ============================================================ */}
      <section className="relative bg-surface-alt border-y border-on-alt-10 px-6 md:px-[52px] py-[140px]">
        <div className="max-w-[1500px] mx-auto">
          <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div>
              <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.32em] text-ember flex items-center gap-3">
                <span className="block h-px w-10 bg-ember" />
                Frame · 02 — The Slates
              </p>
              <h2
                className="font-editorial font-[700] leading-[0.92] tracking-[-0.025em] text-on-alt max-w-[1100px]"
                style={{ fontSize: "clamp(44px, 6vw, 100px)" }}
              >
                Slate the
                <br />
                <em className="italic">scene</em>.
              </h2>
            </div>
            <p className="max-w-[380px] font-warm text-[13px] font-[300] leading-[1.75] text-on-alt-80 md:text-right">
              Click a slate to clap it. Each one opens on the storyboard frame for that scene,
              with what we deliver. Every clap is a take.
            </p>
          </div>

          <Slates services={services} />
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CTA — Clapperboard (unchanged from the live page)           */}
      {/* ============================================================ */}
      <section className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
        <div className="relative flex flex-col justify-between overflow-hidden bg-ember text-ivory px-6 md:px-[60px] pt-16 pb-20 lg:pt-20 lg:pb-[100px]">
          <div
            aria-hidden
            className="absolute top-0 left-0 right-0 h-9"
            style={{
              background: "repeating-linear-gradient(-68deg, #ffffeb 0 28px, #353230 28px 56px)",
            }}
          />
          <div aria-hidden className="absolute top-9 left-0 right-0 h-[2px] bg-ivory/70" />

          <div className="pt-10">
            <p className="mb-7 font-mono text-[11px] uppercase tracking-[0.28em] text-ivory flex items-center gap-3">
              <span className="block h-px w-10 bg-ivory/70" />
              Not sure which scene?
            </p>
            <h2
              className="font-editorial font-[700] leading-[0.92] tracking-[-0.025em] text-ivory"
              style={{ fontSize: "clamp(44px, 6vw, 98px)" }}
            >
              Let&apos;s write it
              <br />
              <em className="italic">together</em>.
            </h2>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 bg-ivory text-graphite font-mono text-[12px] font-medium tracking-[0.22em] uppercase py-[18px] pl-7 pr-9 no-underline transition-all duration-300 hover:bg-graphite hover:text-ivory"
            >
              <span className="w-2 h-2 rounded-full bg-ember animate-pulse-dot" />
              Book a free call
              <span className="font-editorial text-[18px] leading-none">→</span>
            </Link>
            <Link
              href="/"
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-ivory hover:text-ivory underline decoration-ivory/50 underline-offset-4"
            >
              / back to home
            </Link>
          </div>
        </div>

        <div className="relative flex flex-col justify-center bg-surface-alt px-6 md:px-[60px] py-20 lg:py-[100px]">
          <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.28em] text-on-alt-60 flex items-center gap-3">
            <span className="block h-px w-10 bg-on-alt-30" />
            What happens next
          </p>
          <div className="flex flex-col gap-6">
            {[
              { k: "01 · Call", v: "30 minutes. We map your goals and pick the right scenes." },
              { k: "02 · Scope", v: "Detailed proposal with timelines, deliverables, and pricing." },
              { k: "03 · Roll", v: "Sign-off, portal access, and we start production the same week." },
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
