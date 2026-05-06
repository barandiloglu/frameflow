# Portfolio: Real Clients on the Reel — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the fictional 14-project portfolio data with the real 19-client roster, redesign the Index row for sparse data, ship a stub subpage at `/portfolio/[slug]` for every client that doubles as the future shared template.

**Architecture:** Single source of truth in `src/data/clients.ts` consumed by both the portfolio index and the per-client subpage. The `<FilmStill>` decorative component is extracted from the index page so the subpage can reuse it. The subpage route is a thin **server component** (so it can export `generateMetadata` + `generateStaticParams`) that renders a `"use client"` `<ClientPage>` visual component — keeps animations on the client side without losing per-page SEO.

**Tech Stack:** Next.js 16.2.1 (App Router), React 19, TypeScript, Tailwind v4, framer-motion. **Note:** Next 16 breaking change — `params` is a `Promise` and must be `await`ed; `generateMetadata` only works in Server Components.

**Spec:** `docs/superpowers/specs/2026-05-05-portfolio-real-clients-design.md`

**Verification gate:** No test framework is configured in the project (`package.json` has only ESLint). Adding Vitest/Playwright is far out of scope. Each task ends with a `next build` + dev-server visual check as the verification step before commit. This preserves the spirit of "verify before claiming done" without adding test infrastructure that doesn't exist.

---

## File Structure

| Path | Action | Responsibility |
|---|---|---|
| `src/data/clients.ts` | **New** | `Service` union, `Client` type, `clients` array (19 entries), `getClient`, `getAdjacentClients` |
| `src/components/portfolio/FilmStill.tsx` | **New (extracted)** | Decorative film-still poster — used by index Selected Scenes (when re-introduced) and subpage hero. Takes `Client` + `frameNumber`. |
| `src/app/portfolio/page.tsx` | **Rewrite** | Index page — Hero, Marquee, Index rows, Archive Manifest, CTA. Drops Now Showing + Selected Scenes for V1. |
| `src/app/portfolio/[slug]/page.tsx` | **New** | Server component route — `generateStaticParams`, `generateMetadata`, `notFound()` for bad slugs, renders `<ClientPage>` |
| `src/app/portfolio/[slug]/ClientPage.tsx` | **New** | `"use client"` visual component for the subpage — Hero, FilmStill, "in post" panel (or rich slate when synopsis is present), Prev/Next, CTA |

The index file changes are scoped to `portfolio/page.tsx`; the subpage gets two files (server route + client view) for clean separation. `<IndexRow>` and `<SelectedScene>` definitions inside the current `portfolio/page.tsx`: `<SelectedScene>` is **deleted** in V1 (dead code — git retains it); `<IndexRow>` is rewritten in place.

---

## Task 1 — Data file

**Files:**
- Create: `src/data/clients.ts`

- [ ] **Step 1: Create the data file**

```ts
// src/data/clients.ts

export type Service =
  | "Ad Management"
  | "App"
  | "Branding"
  | "Design"
  | "Logo"
  | "Photography"
  | "SEO"
  | "Social Media"
  | "Videography"
  | "Web Application"
  | "Website Design";

export type Client = {
  slug: string;
  name: string;
  /**
   * Service tags. ORDER MATTERS — the first tag is the primary service,
   * used as the FilmStill badge and the OG description lead.
   */
  services: Service[];

  // Optional spotlight fields. All real or absent — never invented.
  // Their presence promotes the client into richer rendering automatically.
  year?: string;
  location?: string;
  runtime?: string;
  scene?: string;
  synopsis?: string;
  featured?: boolean;
  scene_order?: number;
};

export const clients: Client[] = [
  { slug: "acorn-accounting",            name: "Acorn Accounting",                          services: ["Web Application"] },
  { slug: "adrians-wasaga-beach",        name: "Adrian's Wasaga Beach",                     services: ["Social Media"] },
  { slug: "asd-laminate",                name: "ASD Laminate",                              services: ["Ad Management", "Social Media"] },
  { slug: "aydin-cpa",                   name: "AYDIN CPA",                                 services: ["Photography", "Website Design"] },
  { slug: "big-bears-baked-potato",      name: "Big Bears Baked Potato",                    services: ["Branding", "Design", "Logo", "Photography", "Social Media", "Videography", "Website Design"] },
  { slug: "canapy-furniture",            name: "Canapy Furniture",                          services: ["Ad Management", "Photography", "Social Media", "Videography"] },
  { slug: "connectr",                    name: "ConnecTR",                                  services: ["Photography", "Videography"] },
  { slug: "ctbdh",                       name: "CTBDH",                                     services: ["Logo", "Videography"] },
  { slug: "destan-turkish-cuisine",      name: "Destan Turkish Cuisine",                    services: ["Photography", "Social Media", "Videography"] },
  { slug: "edupathways",                 name: "EduPathways",                               services: ["Branding", "Photography", "SEO", "Social Media", "Videography", "Website Design"] },
  { slug: "esma-fine-foods",             name: "Esma Fine Foods",                           services: ["Photography", "Social Media", "Videography"] },
  { slug: "fidan-construction",          name: "Fidan Construction",                        services: ["Ad Management", "SEO", "Website Design"] },
  { slug: "goldenhorn-construction",     name: "Goldenhorn Construction",                   services: ["Logo", "Photography", "Website Design"] },
  { slug: "harbourloom",                 name: "Harbourloom",                               services: ["Logo", "Photography", "Social Media", "Videography"] },
  { slug: "hopeway-immigration",         name: "Hopeway Immigration",                       services: ["Social Media", "Website Design"] },
  { slug: "iyn",                         name: "IYN",                                       services: ["App", "Social Media", "Website Design"] },
  { slug: "mavi-travel",                 name: "Mavi Travel",                               services: ["Social Media"] },
  { slug: "minauto",                     name: "MinAuto",                                   services: ["Logo", "Social Media"] },
  { slug: "northern-pathways-immigration", name: "Northern Pathways Immigration Consulting", services: ["App", "Social Media", "Videography"] },
];

export const getClient = (slug: string): Client | undefined =>
  clients.find((c) => c.slug === slug);

/**
 * Returns the prev/next clients in the array order, wrapping around at the
 * ends so the reel always has a "next title" — a loop, not a paginated list.
 * Returns `null` if the slug isn't found.
 */
export const getAdjacentClients = (
  slug: string
): { prev: Client; next: Client } | null => {
  const i = clients.findIndex((c) => c.slug === slug);
  if (i === -1) return null;
  return {
    prev: i > 0 ? clients[i - 1] : clients[clients.length - 1],
    next: i < clients.length - 1 ? clients[i + 1] : clients[0],
  };
};

/**
 * Service-tag counts across all clients, sorted descending. Ties broken
 * alphabetically by service name. Pure derivation — used by the Archive
 * Manifest tiles.
 */
export const getServiceCounts = (): Array<{ service: Service; count: number }> => {
  const counts = new Map<Service, number>();
  for (const c of clients) {
    for (const s of c.services) {
      counts.set(s, (counts.get(s) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([service, count]) => ({ service, count }))
    .sort((a, b) => b.count - a.count || a.service.localeCompare(b.service));
};

/**
 * Distinct services used by at least one client. Currently 11.
 */
export const getDistinctServiceCount = (): number => getServiceCounts().length;
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: exit 0, no errors. (If the project's `tsconfig.json` excludes `src/data/`, this still passes — we're checking the file alone is valid TypeScript.)

- [ ] **Step 3: Sanity-check counts match the spec**

Add a quick scratch script — DO NOT commit — and run it once:

```bash
npx tsx -e "import('./src/data/clients.ts').then(m => { console.log('clients:', m.clients.length); console.log('services:', m.getDistinctServiceCount()); console.log('counts:', m.getServiceCounts()); })"
```

Expected output (must match spec §2 exactly):
```
clients: 19
services: 11
counts: [
  { service: 'Social Media',     count: 13 },
  { service: 'Photography',      count: 9 },
  { service: 'Videography',      count: 9 },
  { service: 'Website Design',   count: 7 },
  { service: 'Logo',             count: 5 },
  { service: 'Ad Management',    count: 3 },
  { service: 'App',              count: 2 },
  { service: 'Branding',         count: 2 },
  { service: 'SEO',              count: 2 },
  { service: 'Design',           count: 1 },
  { service: 'Web Application',  count: 1 }
]
```

If `tsx` is not installed, instead run `npx tsx` once (it works without install via npx) — or paste the file contents into the TS playground locally. **No npm install for this; it's a one-time check.** If counts disagree with the spec, the data is wrong; fix the data, not the spec.

- [ ] **Step 4: Commit**

```bash
git add src/data/clients.ts
git commit -m "feat(portfolio): add real client roster as single source of truth"
```

---

## Task 2 — Extract `<FilmStill>` to a shared component

**Files:**
- Create: `src/components/portfolio/FilmStill.tsx`
- Modify: `src/app/portfolio/page.tsx` (delete the inline FilmStill definition, import the shared one)

**Why this task before the rewrite:** doing the extraction in a separate task gives a clean diff and lets us verify the index page is unchanged before we start mutating it.

- [ ] **Step 1: Create the shared component file**

```tsx
// src/components/portfolio/FilmStill.tsx
import type { Client } from "@/data/clients";

type Props = {
  client: Client;
  frameNumber: string;
  size?: "default" | "large";
};

export function FilmStill({ client, frameNumber, size = "default" }: Props) {
  const scene = client.scene ?? "INT. STUDIO — IN POST";
  const genreShort = (client.services[0] ?? "PORTFOLIO").toUpperCase();
  const location = client.location ?? "";
  const year = client.year ?? "";

  return (
    <div
      className={`relative border border-amber/30 bg-graphite overflow-hidden ${
        size === "large" ? "aspect-[4/5]" : "aspect-[5/4]"
      }`}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,235,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,235,0.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-overlay opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #ffffeb 0 1px, transparent 1px 3px)",
        }}
      />
      <div className="absolute inset-4 border border-dashed border-amber/25" />

      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/4 -right-1/3 h-[180%] w-1/2 bg-gradient-to-b from-ember/20 via-amber/10 to-transparent blur-[40px] rotate-[18deg]"
      />

      <span
        className="absolute bottom-[-8%] left-[-2%] font-editorial italic font-[300] text-ivory/15 leading-none select-none"
        style={{
          fontSize:
            size === "large"
              ? "clamp(220px, 28vw, 460px)"
              : "clamp(160px, 20vw, 320px)",
        }}
      >
        {frameNumber}
      </span>

      <div className="absolute top-6 left-6 flex flex-col gap-1 font-mono text-[10px] uppercase tracking-[0.22em]">
        <span className="text-amber">Frame · {frameNumber}</span>
        <span className="text-ivory/40">{scene}</span>
      </div>

      <div className="absolute top-6 right-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ember">
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 rounded-full bg-ember animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
        </span>
        Print
      </div>

      <div className="absolute bottom-6 left-6 right-6 z-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ember mb-3">
          / {genreShort}
        </p>
        <h3
          className="font-editorial font-[300] italic text-ivory leading-[0.9] tracking-[-0.02em]"
          style={{
            fontSize:
              size === "large"
                ? "clamp(40px, 5vw, 78px)"
                : "clamp(30px, 4vw, 56px)",
          }}
        >
          {client.name}
        </h3>
        <div className="mt-5 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.22em] text-ivory/50">
          <span>{location}</span>
          <span className="text-amber">{year}</span>
        </div>
      </div>

      <span aria-hidden className="absolute top-5 left-5 w-3 h-3 border-t border-l border-amber/50" />
      <span aria-hidden className="absolute top-5 right-5 w-3 h-3 border-t border-r border-amber/50" />
      <span aria-hidden className="absolute bottom-5 left-5 w-3 h-3 border-b border-l border-amber/50" />
      <span aria-hidden className="absolute bottom-5 right-5 w-3 h-3 border-b border-r border-amber/50" />
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles in isolation**

Run: `npx tsc --noEmit`
Expected: exit 0. No type errors.

- [ ] **Step 3: Skip mutating `portfolio/page.tsx` for now**

The current `portfolio/page.tsx` still uses the inline `FilmStill` with the old `Project` shape. We'll delete the inline definition during Task 3 (the page rewrite), since rewiring the existing call sites to use the new prop shape (`Client` + `frameNumber` instead of `Project`) is part of that rewrite anyway. Touching them twice would be churn.

- [ ] **Step 4: Commit**

```bash
git add src/components/portfolio/FilmStill.tsx
git commit -m "feat(portfolio): extract FilmStill to shared component"
```

---

## Task 3 — Rewrite `/portfolio/page.tsx`

**Files:**
- Modify (full rewrite): `src/app/portfolio/page.tsx`

This is the largest task. It happens in one file in one commit because the changes are interlocking — the data swap, the row redesign, and the section cuts can't be separated without leaving the page in a broken intermediate state.

- [ ] **Step 1: Read the current file once more**

Run: `cat src/app/portfolio/page.tsx | wc -l`
Expected: ~898 lines.

You'll be reducing the file to ~450–500 lines by deleting the fictional data, dropping Now Showing + Selected Scenes JSX, dropping the inline `FilmStill` and `SelectedScene` components, and slimming `IndexRow`.

- [ ] **Step 2: Replace the file contents**

Overwrite `src/app/portfolio/page.tsx` with this:

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  clients,
  getServiceCounts,
  getDistinctServiceCount,
  type Client,
} from "@/data/clients";

/* ------------------------------------------------------------------ */
/*  Derived data                                                       */
/* ------------------------------------------------------------------ */

const TOTAL_CLIENTS = clients.length;
const DISTINCT_SERVICES = getDistinctServiceCount();
const TOP_SERVICES = getServiceCounts().slice(0, 6);
const FRAME_NUMBER = (i: number) => String(i + 1).padStart(3, "0");

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

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
                <IndexRow client={c} frameNumber={FRAME_NUMBER(i)} />
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

/* ------------------------------------------------------------------ */
/*  IndexRow — editorial list row (redesigned for sparse Client data)  */
/* ------------------------------------------------------------------ */

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
```

**Key changes from the original:**
- `"use client"` stays — framer-motion still in use.
- Imports `clients`, `getServiceCounts`, `getDistinctServiceCount`, `Client` from the new data file.
- `featured`/`selectedScenes`/`indexRows`/`marqueeTitles`/`archiveStats` all deleted (~80 lines).
- `<FilmStill>` and `<SelectedScene>` definitions removed (~150 lines). `<FilmStill>` is now in `src/components/portfolio/FilmStill.tsx` — though this rewrite no longer uses it, the import isn't needed here. (It returns when Now Showing/Selected Scenes return.)
- `<IndexRow>` rewritten: 5 columns → 4 columns; subtitle line dropped; whole row is now a `<Link>` to `/portfolio/{slug}`; service tags wrap freely in their own column.
- Hero stats: `Titles · Years · Cities` → `Clients · Years · Services` with values from the data.
- REC strip: "11 TITLES CATALOGUED" → `{TOTAL_CLIENTS} CLIENTS CATALOGUED`; "VOL I — IV" → "VOL 2026".
- Marquee: 10 fictional titles → all 19 real client names, tripled.
- Now Showing section deleted.
- Selected Scenes section deleted.
- Archive Manifest: hard-coded array → derived from `getServiceCounts().slice(0, 6)`.
- Frame numbers re-numbered: section labels go from `Frame · 02 — The Index` (was 02) and `Frame · 04 — Archive Manifest` (was 04) to `Frame · 01` and `Frame · 02` since two intermediate sections were cut.

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: exit 0, no errors. Common gotchas to watch for:
- If TypeScript can't find `@/data/clients`, check `tsconfig.json` for the path alias — the project already uses `@/components/...` so the alias should be set up already.
- If TypeScript complains about unused imports, remove them (e.g. you may have leftover `motion` imports if you removed all uses, though the rewrite above keeps motion).

- [ ] **Step 4: Run dev server and visually verify**

```bash
npm run dev
```

Open `http://localhost:3000/portfolio` in a browser and confirm:

1. Hero REC strip reads `FF_ARCHIVE / 19 CLIENTS CATALOGUED / VOL 2026`.
2. Hero stats read `Clients 019 · Years 05 · Services 11`.
3. Marquee shows real client names (Acorn Accounting, Adrian's Wasaga Beach, etc.) — not fictional ones (no "Acadia Bakes", no "Nomad Studio").
4. The Index has exactly 19 rows, frame numbers `001`–`019`, alphabetical (Acorn first, Northern Pathways last).
5. Each row's services match Task 1's data table — e.g. `001 ACORN ACCOUNTING / WEB APPLICATION`, `005 BIG BEARS BAKED POTATO / BRANDING · DESIGN · LOGO · PHOTOGRAPHY · SOCIAL MEDIA · VIDEOGRAPHY · WEBSITE DESIGN` (wraps to 2 lines).
6. Hovering a row turns the name amber, nudges the arrow right, tints the row background.
7. Clicking a row navigates to `/portfolio/{slug}` — will 404 until Task 4 is done; that's expected.
8. Archive Manifest tiles read: `Social Media 13 · Photography 09 · Videography 09 · Website Design 07 · Logo 05 · Ad Management 03`.
9. CTA section unchanged.
10. No "Now Showing" featured case section. No "Selected Scenes" alternating block.

If any of the above are wrong, fix the file before committing.

- [ ] **Step 5: Commit**

```bash
git add src/app/portfolio/page.tsx
git commit -m "feat(portfolio): replace fictional projects with real 19-client roster

- Drop Now Showing and Selected Scenes sections (return when real
  case studies are written and clients have featured/scene_order set).
- Redesign Index row: 4 cols (Frame · Client · Services · Act),
  whole row links to /portfolio/[slug], services wrap freely.
- Hero stats now derive from data: 19 clients, 05 years, 11 services.
- Archive Manifest tiles auto-compute from service tag counts."
```

---

## Task 4 — Subpage server route (`/portfolio/[slug]/page.tsx`)

**Files:**
- Create: `src/app/portfolio/[slug]/page.tsx`

This is a Server Component because it exports `generateMetadata` and `generateStaticParams` (per Next 16 docs at `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md` line 110: "The metadata object and generateMetadata function exports are only supported in Server Components"). It does the routing/SEO work, then renders the `"use client"` `<ClientPage>` (created in Task 5) for the actual visuals.

- [ ] **Step 1: Create the route file**

```tsx
// src/app/portfolio/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  clients,
  getClient,
  getAdjacentClients,
} from "@/data/clients";
import { ClientPage } from "./ClientPage";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return clients.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const client = getClient(slug);
  if (!client) return { title: "Not found — FrameFlow" };

  const description = `${client.name} · ${client.services.join(" · ")}`;
  const url = `/portfolio/${client.slug}`;
  const title = `${client.name} — FrameFlow`;

  return {
    title,
    description,
    openGraph: { title, description, url, type: "website" },
    twitter: { card: "summary", title, description },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const client = getClient(slug);
  if (!client) notFound();

  const adjacent = getAdjacentClients(slug);
  if (!adjacent) notFound(); // unreachable when client is non-null, but keeps the type narrow
  const frameNumber = String(
    clients.findIndex((c) => c.slug === slug) + 1
  ).padStart(3, "0");

  return (
    <ClientPage
      client={client}
      frameNumber={frameNumber}
      prev={adjacent.prev}
      next={adjacent.next}
    />
  );
}
```

**Why `await params`:** Next 16 made `params` a `Promise`. Per `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/dynamic-routes.md` line 144: "Since the params prop is a promise. You must use async/await or React's use function to access the values." Synchronous access is deprecated.

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: exit 0. (Will fail temporarily because `./ClientPage` doesn't exist yet — that's OK, we create it next. If you want a clean compile here, swap the import for a stub, but it's simpler to just move on to Task 5.)

If you proceed without Task 5, leave Task 4 uncommitted until Task 5 is done — they ship together.

---

## Task 5 — Subpage client component (`<ClientPage>`)

**Files:**
- Create: `src/app/portfolio/[slug]/ClientPage.tsx`

- [ ] **Step 1: Create the file**

```tsx
// src/app/portfolio/[slug]/ClientPage.tsx
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
  const services = client.services;

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
              {services.map((s) => (
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
        <div className="max-w-[1500px] mx-auto grid grid-cols-2 gap-6">
          <Link
            href={`/portfolio/${prev.slug}`}
            className="group flex items-baseline gap-4 no-underline"
          >
            <span className="font-editorial not-italic text-[22px] text-on-alt-30 group-hover:text-amber group-hover:-translate-x-1 transition-all duration-300">
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
            <span className="font-editorial not-italic text-[22px] text-on-alt-30 group-hover:text-amber group-hover:translate-x-1 transition-all duration-300">
              →
            </span>
          </Link>
        </div>
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

/* ------------------------------------------------------------------ */
/*  InPostPanel — placeholder body for clients without a synopsis      */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  RichBody — for clients with a real synopsis (none in V1)           */
/* ------------------------------------------------------------------ */

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
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: exit 0. Now both Task 4's route file and Task 5's view component are in place — both should compile.

- [ ] **Step 3: Run dev server and visually verify a stub subpage**

```bash
npm run dev
```

Visit `http://localhost:3000/portfolio/acorn-accounting`. Confirm:

1. REC strip reads `FF_ARCHIVE / /clients/acorn-accounting / STATUS · IN POST`.
2. Breadcrumb: `Home / Portfolio / Acorn Accounting`.
3. Hero shows `FF#001 · Reel '26`, then giant italic `Acorn Accounting`, then a `WEB APPLICATION` pill below.
4. Decorative FilmStill on the left half, `INT. STUDIO — IN POST` slate visible top-left, `001` ghost numeral filling the bottom-left.
5. "Currently in post" panel on the right with the spec copy ("Stills, scenes, and the full cut — coming soon." / "Want a private screening before it's live? Get in touch.") and two CTAs.
6. Prev/Next strip below: Prev = `Northern Pathways Immigration Consulting` (last in alphabetical wraps to first's prev), Next = `Adrian's Wasaga Beach`.
7. CTA strip and footer present.
8. View page source — `<title>` reads `Acorn Accounting — FrameFlow`.

Visit `http://localhost:3000/portfolio/big-bears-baked-potato`. Confirm:

9. Hero shows seven service pills (Branding, Design, Logo, Photography, Social Media, Videography, Website Design).
10. FilmStill scene strip reads `BRANDING` (first service tag), frame number `005`.
11. Prev: `AYDIN CPA`. Next: `Canapy Furniture`.

Visit `http://localhost:3000/portfolio/not-a-real-slug`. Confirm:

12. 404 page renders (Next.js default if no project-level `not-found.tsx` exists). Status code 404.

If any of the above are wrong, fix before committing.

- [ ] **Step 4: Commit Task 4 + Task 5 together**

```bash
git add src/app/portfolio/[slug]/page.tsx src/app/portfolio/[slug]/ClientPage.tsx
git commit -m "feat(portfolio): add per-client subpage as shared template

Server component route handles generateStaticParams + generateMetadata
+ notFound() for bad slugs. Renders <ClientPage> client component
with hero, FilmStill, in-post placeholder panel, prev/next nav, CTA.

When a client gains a synopsis (and optionally year/location/runtime),
the same template renders the rich meta slate automatically — no
schema or layout change required."
```

---

## Task 6 — Production build verification

**Files:**
- (none — verification only)

- [ ] **Step 1: Clean build from scratch**

```bash
rm -rf .next
npm run build
```

Expected:
- Exit 0.
- Build output includes 19 prerendered subpaths under `/portfolio/[slug]` (one per client). Look for lines like:
  ```
  ● /portfolio/[slug]                                  ...
    ├ /portfolio/acorn-accounting
    ├ /portfolio/adrians-wasaga-beach
    ├ ... (17 more)
    └ /portfolio/northern-pathways-immigration
  ```
  (Format may differ slightly between Next versions — what matters is that 19 paths appear under `/portfolio/[slug]`, not just one dynamic placeholder.)
- No type errors, no ESLint errors.

- [ ] **Step 2: Run the production server and smoke-test**

```bash
npm start
```

Visit:
- `http://localhost:3000/portfolio` — verify all 19 rows present, archive manifest counts match Task 1's output.
- `http://localhost:3000/portfolio/edupathways` — six service pills, FilmStill scene strip reads `BRANDING` (first service), frame `010`.
- `http://localhost:3000/portfolio/iyn` — three pills, frame `016`, prev = `Hopeway Immigration`, next = `Mavi Travel`.
- `http://localhost:3000/portfolio/not-a-client` — 404.
- Click "Next" on the last subpage (Northern Pathways) → wraps to Acorn Accounting (frame `001`). Click "Prev" on Acorn → wraps to Northern Pathways.

- [ ] **Step 3: Verify accessibility / regression of unrelated pages**

Quick click-through:
- `/` (home)
- `/about`
- `/services`
- `/contact`

Each should still render — none of them import from `clients.ts` or `FilmStill`, so they should be untouched. If any throws, something in the rewrite leaked.

- [ ] **Step 4: No commit needed for verification-only**

If everything passes, proceed to Task 7. If any check failed, fix the underlying issue before moving on — do not commit a band-aid.

---

## Task 7 — Final cleanup commit (only if cleanup is needed)

**Files:**
- Possibly: `src/app/portfolio/[slug]/not-found.tsx` (optional branded 404)
- Anything left dangling

- [ ] **Step 1: Decide on branded 404**

The default Next.js 404 is functional but un-branded. If you want a film-studio-themed 404 for bad portfolio slugs (e.g. `/portfolio/typo`), add this file. Otherwise skip the rest of this task.

- [ ] **Step 2 (optional): Add branded not-found**

```tsx
// src/app/portfolio/[slug]/not-found.tsx
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <section className="bg-surface px-6 md:px-[52px] pt-[140px] pb-[120px]">
        <div className="max-w-[900px] mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-ember mb-7 flex items-center gap-3">
            <span className="block h-px w-10 bg-ember" />
            FF#404 · Scene unrecorded
          </p>
          <h1
            className="font-editorial font-[300] italic leading-[0.95] tracking-[-0.03em] text-on-surface mb-8"
            style={{ fontSize: "clamp(48px, 7vw, 120px)" }}
          >
            That title isn&apos;t on the reel.
          </h1>
          <p className="font-warm text-[15px] font-[300] leading-[1.85] text-on-surface-60 max-w-[520px] mb-10">
            The slug you&apos;re after isn&apos;t in the archive. Head back to the index — every
            client is on the record.
          </p>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-3 bg-amber text-graphite font-mono text-[12px] font-medium tracking-[0.22em] uppercase py-[14px] pl-6 pr-7 no-underline transition-all duration-300 hover:bg-ember hover:text-ivory"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-graphite group-hover:bg-ivory transition-colors" />
            Back to the archive
            <span className="font-editorial text-[18px] leading-none">→</span>
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3 (optional): Verify branded 404**

Visit `http://localhost:3000/portfolio/not-a-client`. Confirm the FF#404 page renders with the navbar and footer.

- [ ] **Step 4: Commit if step 2 was done**

```bash
git add src/app/portfolio/[slug]/not-found.tsx
git commit -m "feat(portfolio): branded 404 for unknown client slugs"
```

If step 2 was skipped, no commit needed.

---

## Acceptance criteria (mirror of spec §6)

After all tasks above are complete, all of these should be true. Verify in order:

- [ ] `/portfolio` shows all 19 real clients in alphabetical order — no fictional "Acadia Bakes", "Nomad Studio", etc.
- [ ] Each client row's services match Task 1's data table.
- [ ] Each client row links to `/portfolio/{slug}` and that page returns 200, not 404.
- [ ] `npm run build` output lists 19 prerendered routes under `/portfolio/[slug]`.
- [ ] Hero stats read `Clients 019 · Years 05 · Services 11`.
- [ ] Archive Manifest tiles auto-derived: `Social Media 13 · Photography 09 · Videography 09 · Website Design 07 · Logo 05 · Ad Management 03`.
- [ ] Marquee cycles through all 19 real client names, tripled.
- [ ] Now Showing and Selected Scenes sections are not present on `/portfolio`.
- [ ] No invented year, location, runtime, scene, or synopsis appears anywhere on the page or any subpage.
- [ ] Bad slug (e.g. `/portfolio/not-a-client`) renders a 404, not a blank `<ClientPage>`.
- [ ] `npm run build` succeeds with no type errors and no ESLint errors.
- [ ] Each subpage's `<title>` and OG metadata reflect the real client (verify by viewing page source on at least 3 subpages).

---

## Out of scope (not in this plan)

- Real case-study copy for any client (synopsis, year, location, runtime). Plan for those is to set the fields on individual `Client` entries; the templates already render them.
- The `featured` and `scene_order` fields exist in the type but no client uses them in V1. When a client should appear in a re-introduced Now Showing or Selected Scenes section, set the field and add the section's JSX back to `portfolio/page.tsx`.
- Per-client photography. `gallery_placeholders` rule still applies.
- Filter/search UI on the index.
- Sitemap.xml updates. (Next.js auto-generates entries for prerendered routes; if there's a custom `sitemap.ts`, audit separately.)
- Test framework setup (no infra exists; out of scope to introduce here).
