"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type CardSize = "default" | "tall" | "wide";

interface Project {
  id: number;
  num: string;
  title: string;
  category: string;
  client: string;
  cat: string;          // filter key
  size: CardSize;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: 1, num: "01", title: "Acadia Bakes Complete Rebrand",
    category: "Brand Identity", client: "Toronto Artisan Bakery",
    cat: "brand", size: "tall", featured: true,
  },
  {
    id: 2, num: "02", title: "Nomad Studio Website",
    category: "Web Design", client: "Creative Agency, Vancouver",
    cat: "web", size: "default",
  },
  {
    id: 3, num: "03", title: "Lune Caf\u00e9 Instagram",
    category: "Social Media", client: "Specialty Coffee, Toronto",
    cat: "social", size: "default",
  },
  {
    id: 4, num: "04", title: "Meridian Foods Brand Film",
    category: "Video Production", client: "Organic Food Brand, Ontario",
    cat: "video", size: "wide",
  },
  {
    id: 5, num: "05", title: "Trove Interiors Logo",
    category: "Brand Identity", client: "Interior Design Studio",
    cat: "brand", size: "default",
  },
  {
    id: 6, num: "06", title: "Sola Health Meta Ads",
    category: "Ad Campaign", client: "Health & Wellness Brand",
    cat: "ads", size: "default",
  },
  {
    id: 7, num: "07", title: "Birchfield Co. E-Commerce",
    category: "Web Design", client: "Sustainable Fashion, Ottawa",
    cat: "web", size: "default",
  },
  {
    id: 8, num: "08", title: "Velour Collective 6-Month Campaign",
    category: "Social Media", client: "Fashion Brand, Montreal",
    cat: "social", size: "wide",
  },
  {
    id: 9, num: "09", title: "Harbor Digital Identity",
    category: "Brand Identity", client: "Tech Startup, Toronto",
    cat: "brand", size: "default",
  },
  {
    id: 10, num: "10", title: "Apex Creative Product Series",
    category: "Photo Shoot", client: "Design Products, Calgary",
    cat: "video", size: "default",
  },
  {
    id: 11, num: "11", title: "Acadia Bakes Holiday Push",
    category: "Ad Campaign", client: "Toronto Artisan Bakery",
    cat: "ads", size: "wide",
  },
];

const filters = [
  { label: "All", value: "all" },
  { label: "Brand Identity", value: "brand" },
  { label: "Social Media", value: "social" },
  { label: "Web Design", value: "web" },
  { label: "Video & Photo", value: "video" },
  { label: "Ad Campaigns", value: "ads" },
] as const;

/* ------------------------------------------------------------------ */
/*  Card                                                               */
/* ------------------------------------------------------------------ */

function ProjectCard({ project }: { project: Project }) {
  const sizeClasses =
    project.size === "tall"
      ? "sm:row-span-2"
      : project.size === "wide"
        ? "sm:col-span-2"
        : "";

  const aspectClass =
    project.size === "tall"
      ? "aspect-[3/5]"
      : project.size === "wide"
        ? "aspect-[2/1]"
        : project.featured
          ? "aspect-square"
          : "aspect-[4/3]";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={sizeClasses}
    >
      <div
        className={`group relative ${aspectClass} w-full overflow-hidden rounded-[3px] bg-[#2a2826] cursor-pointer`}
      >
        {/* grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,235,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,235,0.4) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* large number */}
        <span className="absolute bottom-4 right-5 font-display text-[clamp(80px,10vw,140px)] font-[800] leading-none text-ivory-05 select-none transition-transform duration-500 group-hover:scale-105">
          {project.num}
        </span>

        {/* featured label */}
        {project.featured && (
          <span className="absolute top-4 left-4 z-10 rounded-[1px] bg-amber px-3.5 py-1 text-[11px] font-body font-semibold uppercase tracking-[0.08em] text-graphite">
            Featured
          </span>
        )}

        {/* hover overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-graphite/90 via-graphite/50 to-transparent opacity-0 translate-y-2 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0">
          <span className="text-[11px] font-body font-medium uppercase tracking-[0.1em] text-amber mb-1.5">
            {project.category}
          </span>
          <h3 className="font-display text-[20px] font-[700] text-ivory leading-tight mb-1">
            {project.title}
          </h3>
          <p className="text-[13px] font-body text-ivory-30 mb-4">
            {project.client}
          </p>

          {/* arrow button */}
          <div className="flex items-center justify-between">
            <span />
            <span className="flex items-center justify-center w-10 h-10 rounded-full border border-ivory-30 text-ivory transition-colors duration-300 group-hover:border-amber group-hover:text-amber">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PortfolioPage() {
  const [active, setActive] = useState("all");

  return (
    <>
      <Navbar />

      {/* ======= HERO ======= */}
      <section className="relative h-[52vh] flex flex-col justify-end bg-surface overflow-hidden px-6 md:px-[52px] pb-12">
        {/* grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,235,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,235,0.5) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 80% at 85% 50%, black 0%, transparent 70%)",
            maskImage:
              "radial-gradient(ellipse 60% 80% at 85% 50%, black 0%, transparent 70%)",
          }}
        />

        {/* floating orb */}
        <div className="pointer-events-none absolute top-1/2 right-[12%] -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-amber/10 blur-[120px] animate-orb" />

        {/* content */}
        <div className="relative z-10 w-full">
          {/* eyebrow */}
          <Reveal delay={0.1}>
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-8 h-[2px] bg-amber" />
              <span className="text-[12px] font-body font-medium uppercase tracking-[0.14em] text-amber">
                Work We&rsquo;re Proud Of
              </span>
            </div>
          </Reveal>

          {/* title */}
          <Reveal delay={0.2}>
            <h1
              className="font-display font-[800] text-on-surface leading-[1.02] mb-8"
              style={{ fontSize: "clamp(60px, 8vw, 110px)" }}
            >
              Our{" "}
              <em className="text-amber italic">Portfolio</em>
            </h1>
          </Reveal>

          {/* bottom row */}
          <Reveal delay={0.35}>
            <div className="flex items-end justify-between border-t border-on-surface-10 pt-5">
              <p className="max-w-[440px] text-[15px] font-body font-light leading-[1.7] text-on-surface-30">
                A curated collection of our recent work spanning branding,
                digital, social, and beyond.
              </p>
              <span className="font-display text-[42px] font-[800] text-on-surface-10 leading-none">
                12&nbsp;
                <span className="text-[14px] font-body font-medium uppercase tracking-[0.08em] text-on-surface-30">
                  Projects
                </span>
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ======= FILTER BAR ======= */}
      <div className="sticky top-[76px] z-[100] bg-surface/80 backdrop-blur-[20px] border-b border-on-surface-05">
        <div className="flex items-center gap-2 px-6 md:px-[52px] py-3 overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`rounded-[1px] px-[18px] py-2 text-[12px] font-body font-normal tracking-[0.06em] uppercase whitespace-nowrap transition-all duration-250 ${
                active === f.value
                  ? "bg-amber text-graphite border border-amber"
                  : "bg-transparent text-on-surface-60 border border-border-subtle hover:text-on-surface hover:border-on-surface-30"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ======= PORTFOLIO GRID ======= */}
      <section className="bg-surface px-6 md:px-[52px] py-16">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          <AnimatePresence mode="popLayout">
            {projects
              .filter((p) => active === "all" || p.cat === active)
              .map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                />
              ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ======= CTA ======= */}
      <section className="bg-amber">
        <div className="flex flex-col items-center justify-center py-24 px-6 md:px-[52px] text-center">
          <Reveal>
            <h2 className="font-display text-[clamp(36px,5vw,64px)] font-[800] text-graphite leading-[1.08] mb-8">
              Like What You See?
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 rounded-[1px] bg-graphite px-8 py-4 text-[13px] font-body font-medium tracking-[0.1em] uppercase text-ivory transition-colors duration-200 hover:bg-[#2a2826]"
            >
              Start a Project
              <span className="text-amber">&rarr;</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
