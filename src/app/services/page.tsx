"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ServicesHero } from "@/components/services/ServicesHero";
import { FolderWall } from "@/components/services/FolderWall";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const services = [
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
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <section className="relative bg-surface overflow-hidden pt-[76px] min-h-[100svh] flex flex-col">
        {/* backdrops */}
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
        <div className="pointer-events-none absolute top-[10%] right-[6%] h-[340px] w-[340px] rounded-full bg-ember-10 blur-[140px]" />

        {/* Slate strip */}
        <div className="relative z-20 border-y border-border-subtle bg-surface/50 backdrop-blur-sm px-6 md:px-[52px] py-3 flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.28em] text-on-surface-60">
          <span className="flex items-center gap-2 text-amber font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber animate-pulse-dot" />
            SERVICES
          </span>
          <span>FF_DOC_SVC</span>
          <span className="hidden sm:inline text-on-surface-30">/</span>
          <span className="hidden sm:inline">07 SCENES IN ROTATION</span>
          <span className="ml-auto hidden md:flex items-center gap-2">
            <span className="text-on-surface-30">ACT</span>
            <span className="text-amber">I / III</span>
          </span>
        </div>

        <ServicesHero services={services} />

      </section>

      <FolderWall services={services} />

      {/* ============================================================ */}
      {/*  CTA — Clapperboard                                          */}
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
              Not sure which scene?
            </p>
            <h2
              className="font-editorial font-[300] leading-[0.92] tracking-[-0.025em] text-graphite"
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
              className="group inline-flex items-center gap-4 bg-graphite text-ivory font-mono text-[12px] font-medium tracking-[0.22em] uppercase py-[18px] pl-7 pr-9 no-underline transition-all duration-300 hover:bg-ivory hover:text-graphite"
            >
              <span className="w-2 h-2 rounded-full bg-ember animate-pulse-dot" />
              Book a free call
              <span className="font-editorial text-[18px] leading-none">→</span>
            </Link>
            <Link
              href="/"
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-graphite/80 hover:text-graphite underline decoration-graphite/30 underline-offset-4"
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
