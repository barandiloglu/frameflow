"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

/* ------------------------------------------------------------------ */
/*  Services data                                                      */
/* ------------------------------------------------------------------ */
const services = [
  {
    id: 1,
    name: "Logo Design",
    category: "Branding",
    tagline: "Your Brand Starts Here.",
    description:
      "Your logo is the face of your brand \u2014 the first thing customers see and the weight of your identity, values, and promise. At FrameFlow, we craft strategic visual assets that set you up for lasting recognition.",
    features: [
      "Custom logo concepts from scratch \u2014 no templates",
      "Full brand mark suite (primary, secondary, icon versions)",
      "Color palette & typography recommendations",
      "All files delivered: SVG, PNG, PDF, EPS",
    ],
  },
  {
    id: 2,
    name: "Brand Identity",
    category: "Branding",
    tagline: "Built to Connect, Built to Last.",
    description:
      "Your brand is more than a logo \u2014 it\u2019s the entire experience. Voice, visuals, values, all working together. We build complete brand identities that make you memorable and magnetic to your ideal customers.",
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
    tagline: "Your Business is Unique. Your Website Should Be Too.",
    description:
      "In today\u2019s digital-first world, your website is your central hub. We build custom websites that look incredible, function flawlessly, and are designed from the ground up to help your business thrive.",
    features: [
      "Custom design \u2014 no page builders or generic themes",
      "Mobile-responsive & performance optimized",
      "SEO-ready structure & on-page optimization",
      "CMS integration so you can manage content easily",
    ],
  },
  {
    id: 4,
    name: "Social Media",
    category: "Marketing",
    tagline: "Your Social Media? Consider It Handled.",
    description:
      "You know you need social media \u2014 but who has time? FrameFlow is your dedicated social strategist, content creator, and community manager all in one results-driven package.",
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
    tagline: "Your Story is Worth Seeing.",
    description:
      "Stock photos and shaky smartphone videos don\u2019t cut it anymore. We create high-quality photography and videography that stops the scroll, tells your story, and makes a genuine connection with your audience.",
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
    tagline: "Stop Wasting Money on Ads That Don\u2019t Work.",
    description:
      "Throwing money at Google or Facebook without a strategy burns your budget fast. We build intelligent, data-driven campaigns designed for one thing: the best possible ROI for your business.",
    features: [
      "Google Ads, Meta Ads & TikTok Ads setup & management",
      "Audience research & targeting strategy",
      "Ad creative design & copywriting",
      "Weekly performance reporting & optimization",
    ],
  },
  {
    id: 7,
    name: "Web & Mobile Apps",
    category: "Development",
    tagline: "Got an App Idea? Let\u2019s Build It.",
    description:
      "A killer app idea can solve a problem, create a community, or transform an industry. FrameFlow is your end-to-end partner \u2014 from UX/UI design through development to launch and beyond.",
    features: [
      "UX/UI design & interactive prototyping",
      "Web app & mobile app development (iOS & Android)",
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

      {/* ========== HERO ========== */}
      <section className="relative flex flex-col justify-end overflow-hidden bg-surface border-b border-border-subtle px-[52px] pt-[140px] pb-[72px]">
        {/* Grid pattern */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--color-amber-10) 1px, transparent 1px), linear-gradient(to bottom, var(--color-amber-10) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)",
          }}
        />

        {/* Floating orb */}
        <div className="pointer-events-none absolute top-16 right-[12%] h-[260px] w-[260px] bg-amber/20 blur-[100px] animate-orb" />

        <div className="relative z-10">
          {/* Breadcrumb */}
          <Reveal>
            <p className="font-body text-sm tracking-[0.15em] uppercase text-on-surface-60 mb-5">
              <Link href="/" className="hover:text-amber transition-colors">
                Home
              </Link>
              <span className="mx-2">&rarr;</span>
              <span className="text-on-surface">Our Services</span>
            </p>
          </Reveal>

          {/* Title */}
          <Reveal delay={0.1}>
            <h1
              className="font-display font-[800] text-on-surface leading-[1.05] tracking-tight mb-5"
              style={{ fontSize: "clamp(56px, 8vw, 110px)" }}
            >
              Our Services
            </h1>
          </Reveal>

          {/* Subtitle */}
          <Reveal delay={0.2}>
            <p className="font-body text-on-surface-60 text-lg md:text-xl max-w-2xl leading-relaxed">
              Seven core services built around one goal — helping your brand
              look its best, reach further, and grow faster.
            </p>
          </Reveal>

          {/* Bottom-right label */}
          <Reveal delay={0.3}>
            <div className="flex items-center justify-end gap-4 mt-12">
              <span className="block h-px w-12 bg-amber" />
              <span className="font-body text-sm tracking-[0.2em] uppercase text-on-surface-60">
                07 Services
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========== SERVICE DETAIL SECTIONS ========== */}
      {services.map((service, idx) => {
        const isEven = idx % 2 !== 0;
        const num = String(service.id).padStart(2, "0");
        const altBg = "bg-[rgba(53,50,48,0.4)]";

        const imageBlock = (
          <Reveal
            direction={isEven ? "right" : "left"}
            className={`relative overflow-hidden ${isEven ? altBg : "bg-surface"} ${isEven ? "order-2" : ""}`}
          >
            {/* Grid pattern */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--color-amber-10) 1px, transparent 1px), linear-gradient(to bottom, var(--color-amber-10) 1px, transparent 1px)",
                backgroundSize: "56px 56px",
              }}
            />

            {/* Large number */}
            <span
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-[800] text-on-surface-05 select-none pointer-events-none"
              style={{ fontSize: "180px", lineHeight: 1 }}
            >
              {num}
            </span>

            {/* Amber accent line top-right */}
            <span className="absolute top-6 right-6 block h-12 w-px bg-amber" />

            {/* Service label bottom-left */}
            <span className="absolute bottom-6 left-6 font-body text-xs tracking-[0.2em] uppercase text-on-surface-30">
              {service.category}
            </span>
          </Reveal>
        );

        const textBlock = (
          <Reveal
            direction={isEven ? "left" : "right"}
            className={`px-16 py-[72px] flex flex-col justify-center ${isEven ? altBg : "bg-surface"} ${isEven ? "order-1" : ""}`}
          >
            {/* Numbered tag */}
            <div className="flex items-center gap-3 mb-6">
              <span className="font-display text-[12px] tracking-[0.2em] text-amber">
                {num}
              </span>
              <span className="block h-px w-8 bg-amber" />
              <span className="text-[11px] uppercase text-on-surface-30 tracking-[0.15em]">
                {service.category}
              </span>
            </div>

            {/* Service name */}
            <h2
              className="font-display font-[800] text-on-surface leading-none mb-2.5"
              style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
            >
              {service.name}
            </h2>

            {/* Tagline */}
            <p className="text-[14px] text-amber italic font-display mb-7">
              {service.tagline}
            </p>

            {/* Description */}
            <p className="text-[14px] font-light text-on-surface-60 leading-[1.85] max-w-[420px] mb-9">
              {service.description}
            </p>

            {/* Feature list */}
            <ul className="flex flex-col gap-2.5 mb-10">
              {service.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-start gap-3">
                  <span className="mt-[5px] block h-1 w-1 shrink-0 rounded-[1px] bg-amber" />
                  <span className="text-[13px] text-on-surface-60 font-light">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 bg-amber text-graphite font-body text-[12px] font-medium tracking-[0.12em] uppercase py-[14px] px-8 rounded-[1px] hover:bg-[#e09f3a] transition-colors"
              >
                Get Started
                <span>&rarr;</span>
              </Link>
            </div>
          </Reveal>
        );

        return (
          <section
            key={service.id}
            className="grid grid-cols-2 min-h-[600px] border-b border-border-subtle"
          >
            {imageBlock}
            {textBlock}
          </section>
        );
      })}

      {/* ========== BOTTOM CTA ========== */}
      <section className="bg-amber px-[52px] py-[100px] flex items-center justify-between">
        <Reveal>
          <h2
            className="font-display font-[800] text-graphite leading-tight tracking-tight"
            style={{ fontSize: "clamp(28px, 4vw, 46px)" }}
          >
            Not sure which service you need?
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="flex flex-col gap-3 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 bg-graphite text-ivory font-body text-[12px] font-medium tracking-[0.12em] uppercase py-[14px] px-8 rounded-[1px] hover:brightness-125 transition-all"
            >
              Book a Free Call
              <span>&rarr;</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2.5 bg-transparent text-graphite font-body text-[12px] font-medium tracking-[0.12em] uppercase py-[14px] px-8 rounded-[1px] border-[1.5px] border-graphite/35 hover:bg-graphite hover:text-ivory transition-all"
            >
              Back to Home
            </Link>
          </div>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
