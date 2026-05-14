"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getFrameNumber } from "@/data/clients";
import type { Client } from "@/data/clients";
import { LoadingTransition } from "@/components/portfolio/LoadingTransition";

type Props = { client: Client };

type Post = {
  src: string;
  alt: string;
  title: string;
  meta: string;
  pages: string;
  live?: boolean;
  film: string;
};

const POSTS: ReadonlyArray<Post> = [
  {
    src: "/portfolio/northern-pathways/social/carousel-04/01.png",
    alt: "Levels Plan 2026–2028 carousel post",
    title: "Levels Plan · 2026–2028",
    meta: "tr · levels plan · 9-slide carousel",
    pages: "1 / 9",
    film: "Express Entry & PNP",
  },
  {
    src: "/portfolio/northern-pathways/social/carousel-05/01.png",
    alt: "Study permit visa officer carousel post",
    title: "Vize memuru · neye bakar?",
    meta: "tr · study permit · NP × EduPathways",
    pages: "1 / 8",
    film: "Temporary Residence",
  },
  {
    src: "/portfolio/northern-pathways/social/carousel-07/01.png",
    alt: "Ontario OINP carousel post",
    title: "Ontario · OINP yeni programlar",
    meta: "tr · OINP · Bill 30 · 2025",
    pages: "1 / 6",
    film: "Express Entry & PNP",
  },
  {
    src: "/portfolio/northern-pathways/social/carousel-01/01.png",
    alt: "Express Entry consultation carousel post",
    title: "Express Entry · kamuoyu görüşü",
    meta: "tr · IRCC · Apr–May 2026",
    pages: "1 / 6",
    film: "Express Entry & PNP",
  },
  {
    src: "/portfolio/northern-pathways/social/carousel-08/01.png",
    alt: "OINP March 2026 carousel post",
    title: "OINP · 18 Mart davet turu",
    meta: "tr · ontario · 2026",
    pages: "1 / 6",
    film: "Express Entry & PNP",
  },
  {
    src: "/portfolio/northern-pathways/social/carousel-02/01.png",
    alt: "Super Visa update carousel post",
    title: "Süper Vize · gelir esnekliği",
    meta: "tr · super visa · 2026",
    pages: "1 / 4",
    film: "Family Connect",
  },
  {
    src: "/portfolio/northern-pathways/social/carousel-03/01.png",
    alt: "Doctor immigration carousel post",
    title: "Doktor açığı · yeni adımlar",
    meta: "tr · healthcare · RCIC note",
    pages: "1 / 4",
    film: "Express Entry & PNP",
  },
  {
    src: "/portfolio/northern-pathways/social/carousel-06/01.png",
    alt: "Yeni Yaşam seminar carousel post",
    title: "Yeni Yaşam · Ankara & İstanbul",
    meta: "tr · seminar · 13 / 20 Ekim",
    pages: "1 / 3",
    film: "Family Connect",
  },
  {
    src: "/portfolio/northern-pathways/social/post-09.png",
    alt: "PGWP webinar single post",
    title: "Webinar · PGWP rules",
    meta: "tr · 22 Aralık 25 · Burcu Akyol",
    pages: "Live",
    live: true,
    film: "Temporary Residence",
  },
  {
    src: "/portfolio/northern-pathways/social/post-10.png",
    alt: "Levels Plan webinar single post",
    title: "Webinar · Levels Plan PR",
    meta: "tr · 11 Kasım 25 · Burcu Akyol",
    pages: "Live",
    live: true,
    film: "Express Entry & PNP",
  },
];

const LIVE_URL = "https://northernpathways.ca/";
const TOTAL = POSTS.length;

/* ============================================================
   Static mockup components — declared at module scope so React
   doesn't recreate them on every render of the parent page.
   None of them depend on parent state.
============================================================ */

function Website() {
  return (
    <article className="np-site">
      <nav className="np-site-nav">
        <span className="logo">
          <Image
            src="/portfolio/northern-pathways/logo/np-mark.png"
            alt=""
            width={42}
            height={42}
          />
          <span className="word">
            NORTHERN PATHWAYS
            <small>IMMIGRATION CONSULTING</small>
          </span>
        </span>
        <nav className="menu">
          <span className="on">Home</span>
          <span>Our Team</span>
          <span>Services</span>
          <span>Tools</span>
          <span>Fees</span>
          <span>Events</span>
          <span>Blog</span>
        </nav>
        <div className="right">
          <span className="lang">
            <span className="on">EN</span>
            <span>TR</span>
          </span>
          <span className="cta">Book a Consultation</span>
        </div>
      </nav>

      <header className="np-site-hero">
        <div className="text">
          <p className="eb">— Northern Pathways · RCIC-IRB —</p>
          <h2>
            Guiding your <em>Canadian immigration journey</em> with
            competence, care, and clarity.
          </h2>
          <p>
            Welcome to Northern Pathways — an immigration practice led by{" "}
            <b>Burcu Akyol, RCIC-IRB</b>. Eligibility assessments, strategic
            guidance, and legal representation for permanent residency, study
            permits, and family sponsorship.
          </p>
          <div className="ctas">
            <span className="p">Book a Consultation</span>
            <span className="s">Try the Calculator</span>
          </div>
        </div>
        <aside className="photo">
          <div className="ph">
            <Image
              src="/portfolio/northern-pathways/people/burcu-akyol.jpg"
              alt="Burcu Akyol"
              fill
              sizes="(max-width: 880px) 60vw, 220px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="who">
            <h4>Burcu Akyol</h4>
            <p>RCIC-IRB · Principal</p>
          </div>
        </aside>
      </header>

      <section className="np-site-services">
        <p className="lbl">— What we handle</p>
        <h3>
          Five practice areas. <em>One regulated counsel</em> on every file.
        </h3>
        <div className="row">
          <div>
            <p className="n">№ 01</p>
            <p className="t">Express Entry & PNP</p>
          </div>
          <div>
            <p className="n">№ 02</p>
            <p className="t">Family Sponsorship</p>
          </div>
          <div>
            <p className="n">№ 03</p>
            <p className="t">Study & Work Permits</p>
          </div>
          <div>
            <p className="n">№ 04</p>
            <p className="t">PR Card Renewal</p>
          </div>
          <div>
            <p className="n">№ 05</p>
            <p className="t">Citizenship</p>
          </div>
        </div>
      </section>

      <footer className="np-site-foot">
        <span className="left">
          © 2026 Northern Pathways Immigration Consulting · All Rights Reserved.
        </span>
        <span className="credit">
          Designed & developed by <b>Frame Flow</b>
        </span>
      </footer>
    </article>
  );
}

function Crs() {
  return (
    <div className="np-crs">
      <header className="np-crs-head">
        <span className="step">02 / 06</span>
        <span className="crumb">
          Section <b>B · Human Capital</b>
        </span>
        <span className="progress">
          <span className="on" />
          <span className="on" />
          <span />
          <span />
          <span />
          <span />
        </span>
        <span className="save">
          Auto-saved <b>14:32</b>
        </span>
      </header>

      <div className="np-crs-body">
        <div className="np-crs-form">
          <header className="head">
            <p className="lbl">Section B · Core / Human Capital</p>
            <h4>Tell us about your background</h4>
            <p>
              Each field maps to an IRCC selection criterion. Hover for the
              source spec.
            </p>
          </header>
          <div className="field on">
            <span className="k">
              Age
              <small>32 years · at point of application</small>
            </span>
            <span className="v">110 / 110</span>
          </div>
          <div className="field on">
            <span className="k">
              Education
              <small>Master&rsquo;s degree · ECA verified</small>
            </span>
            <span className="v">135 / 150</span>
          </div>
          <div className="field on">
            <span className="k">
              English · CLB
              <small>CLB 9 across all four skills</small>
            </span>
            <span className="v">124 / 136</span>
          </div>
          <div className="field on">
            <span className="k">
              French · NCLC
              <small>NCLC 7+ · bonus path eligible</small>
            </span>
            <span className="v">25 / 50</span>
          </div>
          <div className="field">
            <span className="k">
              Canadian work
              <small>1 year · NOC TEER 0–3</small>
            </span>
            <span className="v">35 / 80</span>
          </div>
          <div className="field">
            <span className="k">
              Foreign work
              <small>3+ years · skilled, paid</small>
            </span>
            <span className="v">25 / 50</span>
          </div>
        </div>

        <aside className="np-crs-readout">
          <article className="np-crs-score">
            <p className="lbl">Your CRS score</p>
            <p className="num">
              487<small>of 1,200 maximum</small>
            </p>
            <div className="bar">
              <span />
            </div>
            <p className="delta">
              <span>This week&rsquo;s cutoff</span>
              <span>
                <b>539 · Healthcare</b>
              </span>
            </p>
          </article>

          <article className="np-crs-section">
            <p className="lbl">Breakdown by section</p>
            <dl>
              <div>
                <dt>A · Core / Human Capital</dt>
                <dd>404</dd>
              </div>
              <div>
                <dt>B · Spouse Factors</dt>
                <dd>—</dd>
              </div>
              <div>
                <dt>C · Skill Transferability</dt>
                <dd>50</dd>
              </div>
              <div>
                <dt>D · Additional Points</dt>
                <dd>
                  33 <em>(FR)</em>
                </dd>
              </div>
            </dl>
          </article>

          <p className="np-crs-cta">↓ Download signed PDF</p>
        </aside>
      </div>
    </div>
  );
}

function Fswp() {
  return (
    <div className="np-fswp">
      <header className="np-fswp-head">
        <div>
          <p className="lbl">Tool · Six Selection Factors</p>
          <h4>FSWP Eligibility Checker</h4>
        </div>
        <span className="verdict">
          Result <b>Eligible</b>
        </span>
      </header>

      <div className="np-fswp-grid">
        <div className="np-fswp-factors">
          {[
            {
              on: true,
              name: "Language proficiency",
              detail: "CLB 9 across reading, writing, speaking, listening",
              max: "Max 28",
              got: "24",
            },
            {
              on: true,
              name: "Education",
              detail: "Master’s · ECA verified",
              max: "Max 25",
              got: "23",
            },
            {
              on: true,
              name: "Work experience",
              detail: "3+ years · NOC TEER 0–3",
              max: "Max 15",
              got: "11",
            },
            {
              on: true,
              name: "Age",
              detail: "32 years",
              max: "Max 12",
              got: "12",
            },
            {
              on: false,
              name: "Arranged employment",
              detail: "not declared",
              max: "Max 10",
              got: "0",
            },
            {
              on: true,
              name: "Adaptability",
              detail: "Spouse CLB 4+ · prior study",
              max: "Max 10",
              got: "3",
            },
          ].map((f) => (
            <article
              key={f.name}
              className={`np-fswp-factor${f.on ? " on" : ""}`}
            >
              <span className="pip" />
              <span className="name">
                {f.name}
                <small>{f.detail}</small>
              </span>
              <span className="max">{f.max}</span>
              <span className="got">{f.got}</span>
            </article>
          ))}
        </div>

        <aside className="np-fswp-readout">
          <article className="np-fswp-meter">
            <p className="lbl">Total · 6 factors</p>
            <p className="num">
              73<em>/100</em>
              <small>67 to qualify · ELIGIBLE</small>
            </p>
            <div className="ruler">
              <span className="track" />
              <span className="fill" />
              <span className="marker" />
              <span className="dot" />
            </div>
          </article>

          <article className="np-fswp-pass">
            <span className="ic">✓</span>
            <span className="t">
              You qualify under FSWP.
              <small>Next: see your CRS score and the latest draws</small>
            </span>
          </article>
        </aside>
      </div>
    </div>
  );
}

function Draws() {
  return (
    <>
      <header className="np-draws-head">
        <div className="name">
          <h4>IRCC Draws Tracker</h4>
          <p>
            156 <b>indexed</b> · since 15 Jun 2015
          </p>
        </div>
        <span className="filter on">All draws</span>
        <span className="filter">Healthcare</span>
        <span className="filter">PNP</span>
      </header>

      <section className="np-draws-spark">
        <header className="top">
          <p className="lbl">
            — Cutoff trend
            <b>last 12 months · all streams</b>
          </p>
          <p className="legend">
            <span>
              <span className="ms" />
              General
            </span>
            <span>
              <span className="mc" />
              Category-based
            </span>
          </p>
        </header>
        <svg
          viewBox="0 0 1000 90"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="np-rg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#b92025" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#b92025" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line
            x1="0"
            y1="22"
            x2="1000"
            y2="22"
            stroke="#2c2b2b22"
            strokeDasharray="2 4"
          />
          <line
            x1="0"
            y1="56"
            x2="1000"
            y2="56"
            stroke="#2c2b2b22"
            strokeDasharray="2 4"
          />
          <path
            d="M0,55 L83,46 L166,40 L250,52 L333,38 L416,32 L500,28 L583,42 L666,30 L750,22 L833,34 L916,26 L1000,20 L1000,90 L0,90 Z"
            fill="url(#np-rg)"
          />
          <path
            d="M0,55 L83,46 L166,40 L250,52 L333,38 L416,32 L500,28 L583,42 L666,30 L750,22 L833,34 L916,26 L1000,20"
            fill="none"
            stroke="#b92025"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M0,72 L83,68 L166,62 L250,58 L333,64 L416,52 L500,46 L583,40 L666,52 L750,44 L833,38 L916,46 L1000,38"
            fill="none"
            stroke="#2c2b2b"
            strokeWidth="1.5"
            strokeDasharray="5 4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="1000" cy="20" r="4" fill="#b92025" />
          <circle cx="1000" cy="38" r="3" fill="#2c2b2b" />
        </svg>
        <div className="scale">
          {[
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
          ].map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </section>

      <table className="np-draws-table">
        <thead>
          <tr>
            <th>Draw</th>
            <th>Date</th>
            <th>Category</th>
            <th className="r">Invitations</th>
            <th className="r">Cutoff</th>
          </tr>
        </thead>
        <tbody>
          {[
            { id: "#347", date: "06 May 2026", cat: "Healthcare", catCls: "r", inv: "3,000", cut: "510", red: true },
            { id: "#346", date: "02 May 2026", cat: "General",    catCls: "",  inv: "3,500", cut: "528", red: false },
            { id: "#345", date: "28 Apr 2026", cat: "PNP",        catCls: "k", inv: "1,232", cut: "736", red: false },
            { id: "#344", date: "23 Apr 2026", cat: "French",     catCls: "r", inv: "2,500", cut: "421", red: true },
            { id: "#343", date: "16 Apr 2026", cat: "General",    catCls: "",  inv: "3,711", cut: "521", red: false },
            { id: "#342", date: "09 Apr 2026", cat: "Trades",     catCls: "r", inv: "1,500", cut: "435", red: true },
            { id: "#341", date: "02 Apr 2026", cat: "Healthcare", catCls: "r", inv: "3,500", cut: "504", red: true },
            { id: "#340", date: "26 Mar 2026", cat: "PNP",        catCls: "k", inv: "1,015", cut: "733", red: false },
          ].map((row) => (
            <tr key={row.id}>
              <td><span className="draw-id">{row.id}</span></td>
              <td>{row.date}</td>
              <td>
                <span className={`pillc${row.catCls ? ` ${row.catCls}` : ""}`}>
                  {row.cat}
                </span>
              </td>
              <td className="r"><span className="num">{row.inv}</span></td>
              <td className="r">
                <span className={`num${row.red ? " red" : ""}`}>{row.cut}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer className="np-draws-foot">
        <span>
          Showing <b>8 of 156</b> draws ·{" "}
          <em>auto-mirrored to @kanadadayeniyasam</em>
        </span>
        <span>
          Next refresh in <b>02:42</b>
        </span>
      </footer>
    </>
  );
}

/* ============================================================
   The page itself — state, key handling, and the rendered
   case-study layout.
============================================================ */
export function NorthernPathwaysPage({ client }: Props) {
  const frameNumber = getFrameNumber(client);

  /* MODAL — image lightbox for the social posts only */
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const isOpen = modalIndex !== null;
  const activePost = isOpen ? POSTS[modalIndex] : null;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalIndex(null);
      } else if (e.key === "ArrowLeft") {
        setModalIndex((i) =>
          i === null ? null : (i - 1 + TOTAL) % TOTAL
        );
      } else if (e.key === "ArrowRight") {
        setModalIndex((i) =>
          i === null ? null : (i + 1) % TOTAL
        );
      }
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  return (
    <>
      <LoadingTransition
        frameNumber={frameNumber}
        clientName={client.name}
        scope={client.services}
        location={client.location}
        year={client.year}
      />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700&display=swap"
      />

      <div className="np-page">
        {/* TOP RAIL ---------------------------------------------- */}
        <header className="np-rail">
          <Link href="/portfolio" className="np-rail-back">
            ← Portfolio
          </Link>
          <span className="np-rail-center">
            NORTHERN PATHWAYS · CASE STUDY
          </span>
          <span className="np-rail-meta">
            FrameFlow · Reel <b>{frameNumber}</b> · 2026
          </span>
        </header>

        {/* HERO ----------------------------------------------- */}
        <section className="np-hero">
          <div className="np-hero-inner">
            <p className="np-hero-meta">
              <span className="e">Case Study · {frameNumber}</span>
              <span className="sep">/</span>
              <span>Web Design + Development</span>
              <span className="sep">/</span>
              <span>Multilingual EN · TR</span>
            </p>

            <h1 className="np-hero-title">
              A complete digital rebuild for{" "}
              <em>a regulated</em> Canadian immigration consultancy.
            </h1>

            <div className="np-hero-deck">
              <p className="desc">
                FrameFlow rebuilt{" "}
                <b>Northern Pathways Immigration Consulting</b> from the
                ground up — a marketing site that speaks two languages,
                paired with three custom client tools that turn IRCC&rsquo;s
                selection grid into something a prospect can actually use:
                a CRS calculator, a Six Selection Factors eligibility
                checker, and a complete searchable archive of every
                Express Entry & PNP draw since 2015.
              </p>
              <p className="np-tagline">
                &ldquo;Guiding your Canadian immigration journey with
                competence, care, and clarity.&rdquo;
                <small>— The brand tagline · locked</small>
              </p>
            </div>
          </div>
        </section>

        {/* FACT SHEET ---------------------------------------------- */}
        <section className="np-factsheet">
          <div className="np-factsheet-grid">
            <div>
              <p className="k">Client</p>
              <p className="v">
                Northern Pathways
                <small>Immigration Consulting</small>
              </p>
            </div>
            <div>
              <p className="k">Year</p>
              <p className="v">
                2025 — 2026
                <small>11-month engagement</small>
              </p>
            </div>
            <div>
              <p className="k">Scope</p>
              <p className="v">
                Site + 3 tools
                <small>Design · Build · Deploy</small>
              </p>
            </div>
            <div>
              <p className="k">Locales</p>
              <p className="v">
                EN · TR
                <small>12 routes per locale</small>
              </p>
            </div>
            <div>
              <p className="k">Live at</p>
              <p className="v">
                northernpathways.ca
                <small>Public · indexed</small>
              </p>
            </div>
          </div>
        </section>

        {/* BRIEF -------------------------------------------------- */}
        <section className="np-brief">
          <div className="np-brief-grid">
            <div>
              <p className="np-eyebrow">— The brief</p>
              <h2>
                Findable, bookable, <em>trustworthy.</em> In two languages.
              </h2>
            </div>
            <div className="body">
              <p>
                Northern Pathways is a Toronto-based immigration practice
                led by an <strong>RCIC-IRB</strong> — a regulated consultant
                who can speak in front of the Immigration and Refugee Board.
                The brief was simple to state and difficult to deliver:
                build a site that is findable on search, bookable in a tap,
                and trustworthy enough that someone betting their family on
                the right counsel feels they have made the right choice.
              </p>
              <p>
                The previous site was a static brochure. There was no way
                for a prospect to self-assess their score, no way to find
                out whether they would even pass the Federal Skilled Worker
                eligibility cutoff, and no way to read the latest IRCC draw
                without leaving the site. Conversion was a phone call.
              </p>
              <p>
                FrameFlow rebuilt the site, designed and shipped{" "}
                <em>three regulator-grade tools</em>, mirrored everything in
                Turkish for the diaspora that drives most of the firm&rsquo;s
                prospects, and folded the result into a single coherent
                brand experience — institutional in tone, clear in voice,
                transparent about what a consult costs.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 01 — WEBSITE ------------------------------------- */}
        <section className="np-section">
          <header className="np-sec-head">
            <span className="num">
              01<i>.</i>
            </span>
            <div className="text">
              <p className="lbl">— The website</p>
              <h2>
                The complete <em>marketing site,</em> rebuilt.
              </h2>
            </div>
            <p className="meta">
              Routes <b>12</b> · Locales <b>EN+TR</b>
              <br />
              Live since <b>Q1 2026</b>
            </p>
          </header>

          <div className="np-browser">
            <header className="np-browser-chrome">
              <span className="dots">
                <span />
                <span />
                <span />
              </span>
              <span className="url">northernpathways.ca/en</span>
              <span className="lang">
                <span className="on">EN</span>
                <span>TR</span>
              </span>
            </header>
            <Website />
          </div>

          <div className="np-obs">
            <div>
              <p className="k">Pages</p>
              <p className="v">
                12<small>routes per locale, 24 total</small>
              </p>
            </div>
            <div>
              <p className="k">Stack</p>
              <p className="v">
                Next.js<small>App Router · server components</small>
              </p>
            </div>
            <div>
              <p className="k">A11y</p>
              <p className="v">
                WCAG 2.2 AA<small>contrast · focus · keyboard</small>
              </p>
            </div>
            <div>
              <p className="k">Lighthouse</p>
              <p className="v">
                99 · 100 · 100 · 100<small>perf · a11y · BP · SEO</small>
              </p>
            </div>
          </div>
        </section>

        {/* TOOLS INTRO -------------------------------------------- */}
        <section className="np-tools-intro">
          <div className="deck">
            <h2>
              Three custom tools, <em>built for a regulated practice.</em>
            </h2>
            <div className="body">
              <p>
                Each tool is purpose-built around a single decision a prospect
                actually needs to make —{" "}
                <strong>can I qualify · can I score · what is happening this week.</strong>{" "}
                Together they replace the phone-call-as-funnel with a
                self-serve front desk that turns curious visitors into
                informed consultations.
              </p>
            </div>
          </div>
        </section>

        {/* TOOL 01 — CRS ------------------------------------------- */}
        <section className="np-tool">
          <div className="np-tool-grid">
            <aside className="np-tool-text">
              <p className="np-tool-tag">
                Tool <b>01.</b> · Live
              </p>
              <h3 className="np-tool-name">
                CRS <em>Calculator.</em>
              </h3>
              <p className="np-tool-desc">
                A faithful implementation of the{" "}
                <b>Comprehensive Ranking System</b>. <em>15 fields, 6 categories,</em>{" "}
                1,200-point ceiling. The score updates live as the prospect
                fills in their profile, with each category tabulated on the
                right and an exportable signed PDF the user can take to a
                consult.
              </p>
              <ul className="np-tool-features">
                <li>
                  <span>
                    <b>Six categories</b> — Core / Spouse / Skill Transferability / Additional / French / PNP nomination
                  </span>
                </li>
                <li>
                  <span>
                    <b>Tooltipped to source</b> — every field links to the IRCC specification it implements
                  </span>
                </li>
                <li>
                  <span>
                    <b>Signed PDF export</b> — counsel-of-record signature on the printable summary
                  </span>
                </li>
                <li>
                  <span>
                    <b>Bilingual</b> — full Turkish translation, including all field labels and tooltips
                  </span>
                </li>
              </ul>
            </aside>

            <div className="np-toolwin">
              <header className="np-toolwin-chrome">
                <span className="dots">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="url">northernpathways.ca/tools/crs</span>
                <span className="live">Live</span>
              </header>
              <Crs />
            </div>
          </div>
        </section>

        {/* TOOL 02 — FSWP ------------------------------------------ */}
        <section className="np-tool">
          <div className="np-tool-grid alt">
            <div className="np-toolwin">
              <header className="np-toolwin-chrome">
                <span className="dots">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="url">northernpathways.ca/tools/fswp</span>
                <span className="live">Live</span>
              </header>
              <Fswp />
            </div>

            <aside className="np-tool-text">
              <p className="np-tool-tag">
                Tool <b>02.</b> · Live
              </p>
              <h3 className="np-tool-name">
                FSWP <em>Eligibility.</em>
              </h3>
              <p className="np-tool-desc">
                A real-time pass/fail against the{" "}
                <b>Federal Skilled Worker Programme&rsquo;s</b> Six Selection
                Factors, with the <em>67/100 cutoff</em> rendered visibly on
                the meter. Prospects know in seconds whether they qualify
                before they invest the time of a CRS calculation.
              </p>
              <ul className="np-tool-features">
                <li>
                  <span>
                    <b>Six factors</b> — Language · Education · Experience · Age · Arranged Employment · Adaptability
                  </span>
                </li>
                <li>
                  <span>
                    <b>67-point pass mark</b> visualised on a horizontal scale, not buried in a footnote
                  </span>
                </li>
                <li>
                  <span>
                    <b>Honest verdict</b> — eligible / not yet eligible / not eligible, with a recommended next step for each
                  </span>
                </li>
                <li>
                  <span>
                    <b>Hands off to the calculator</b> — pass the FSWP, the next click loads the CRS calc with your data prefilled
                  </span>
                </li>
              </ul>
            </aside>
          </div>
        </section>

        {/* TOOL 03 — DRAWS ------------------------------------------ */}
        <section className="np-tool">
          <div className="np-tool-grid">
            <aside className="np-tool-text">
              <p className="np-tool-tag">
                Tool <b>03.</b> · Live
              </p>
              <h3 className="np-tool-name">
                Latest <em>IRCC Draws.</em>
              </h3>
              <p className="np-tool-desc">
                An indexed, filterable archive of{" "}
                <b>every Express Entry and PNP draw since 2015</b> —{" "}
                <em>156+ rows</em> at last refresh, mirrored to the database
                within minutes of an IRCC announcement. The archive is the
                firm&rsquo;s single source of truth: the practice site, the
                social handle, and the calculator&rsquo;s &ldquo;this week&rsquo;s
                cutoff&rdquo; all read from it.
              </p>
              <ul className="np-tool-features">
                <li>
                  <span>
                    <b>156+ draws indexed</b> from June 2015 through to this week, fully searchable
                  </span>
                </li>
                <li>
                  <span>
                    <b>Category filters</b> — General · Healthcare · Trades · French · CEC · PNP · Education · Transport
                  </span>
                </li>
                <li>
                  <span>
                    <b>Cutoff sparkline</b> — 12-month trend across draw streams, hover for exact reading
                  </span>
                </li>
                <li>
                  <span>
                    <b>Auto-mirrored</b> to the Turkish-language Instagram explainer the morning after a draw
                  </span>
                </li>
              </ul>
            </aside>

            <div className="np-toolwin np-draws-win">
              <header className="np-toolwin-chrome">
                <span className="dots">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="url">northernpathways.ca/draws</span>
                <span className="live">Live · auto-refresh</span>
              </header>
              <Draws />
            </div>
          </div>
        </section>

        {/* BILINGUAL ------------------------------------------------ */}
        <section className="np-section np-bilingual">
          <header className="np-sec-head">
            <span className="num">
              02<i>.</i>
            </span>
            <div className="text">
              <p className="lbl">— Bilingual</p>
              <h2>
                Two languages, <em>one source of truth.</em>
              </h2>
            </div>
            <p className="meta">
              EN+TR · 24 routes
              <br />
              Single content model
            </p>
          </header>

          <div className="np-bilingual-grid">
            <article className="np-bili-card">
              <span className="flag">EN</span>
              <p className="lbl">English locale</p>
              <h4>
                Guiding your{" "}
                <em>Canadian immigration journey</em> with competence, care,
                and clarity.
              </h4>
              <p>
                The English locale is the canonical content. Every page,
                every tool, every IRCC draw record is written here first —
                then mirrored.
              </p>
              <div className="routes">
                {["/en", "/en/services", "/en/tools/crs", "/en/tools/fswp", "/en/draws", "/en/fees", "/en/blog"].map(
                  (r) => (
                    <span key={r}>
                      <b>{r.charAt(0)}</b>
                      {r.slice(1)}
                    </span>
                  )
                )}
              </div>
            </article>

            <article className="np-bili-card">
              <span className="flag">TR</span>
              <p className="lbl">Turkish locale</p>
              <h4>
                Kanada göçmenlik yolculuğunuzda{" "}
                <em>yetkinlik, özen ve netlikle</em> rehberlik.
              </h4>
              <p>
                The Turkish locale serves the diaspora that drives most of
                the firm&rsquo;s prospects — same routes, same tools,
                mirrored Turkish UI.
              </p>
              <div className="routes">
                {["/tr", "/tr/hizmetler", "/tr/araclar/crs", "/tr/araclar/fswp", "/tr/cekilisler", "/tr/ucretler", "/tr/blog"].map(
                  (r) => (
                    <span key={r}>
                      <b>{r.charAt(0)}</b>
                      {r.slice(1)}
                    </span>
                  )
                )}
              </div>
            </article>
          </div>
        </section>

        {/* CONTENT — SOCIAL POSTS (clickable) ----------------------- */}
        <section className="np-section np-social">
          <header className="np-sec-head">
            <span className="num">
              03<i>.</i>
            </span>
            <div className="text">
              <p className="lbl">— Content</p>
              <h2>
                The Turkish-language <em>explainer programme.</em>
              </h2>
            </div>
            <p className="meta">
              @kanadadayeniyasam
              <br />
              248 posts this season
            </p>
          </header>

          <div className="np-social-grid">
            {POSTS.map((post, i) => (
              <button
                key={post.src}
                type="button"
                className="np-social-card"
                onClick={() => setModalIndex(i)}
                aria-label={`Open ${post.title}`}
              >
                <Image
                  src={post.src}
                  alt={post.alt}
                  fill
                  sizes="(max-width: 480px) 50vw, (max-width: 880px) 33vw, 20vw"
                  style={{ objectFit: "cover" }}
                />
                <span className="badge">№ {String(i + 1).padStart(2, "0")}</span>
                <span className={`pages${post.live ? " live" : ""}`}>
                  {post.pages}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* ABOUT THE CLIENT ----------------------------------------- */}
        <section className="np-about">
          <div className="np-about-inner">
            <header className="np-sec-head np-sec-head--no-rule">
              <span className="num">
                04<i>.</i>
              </span>
              <div className="text">
                <p className="lbl">— About the client</p>
                <h2>
                  The <em>practice</em> behind the brief.
                </h2>
              </div>
              <p className="meta">
                RCIC-IRB · CICC
                <br />
                Toronto · 2019 →
              </p>
            </header>

            <div className="np-about-grid">
              <aside className="np-about-portrait">
                <div className="ph">
                  <Image
                    src="/portfolio/northern-pathways/people/burcu-akyol.jpg"
                    alt="Burcu Akyol, RCIC-IRB"
                    fill
                    sizes="(max-width: 880px) 70vw, 320px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="who">
                  <h4>Burcu Akyol</h4>
                  <p className="role">RCIC-IRB · Principal</p>
                  <dl>
                    <div>
                      <dt>Licence</dt>
                      <dd>RCIC-IRB</dd>
                    </div>
                    <div>
                      <dt>College</dt>
                      <dd>CICC</dd>
                    </div>
                    <div>
                      <dt>Board</dt>
                      <dd>CAPIC</dd>
                    </div>
                    <div>
                      <dt>Faculty</dt>
                      <dd>Queen&rsquo;s</dd>
                    </div>
                    <div>
                      <dt>Practising</dt>
                      <dd>2019 →</dd>
                    </div>
                  </dl>
                </div>
              </aside>

              <div className="np-about-text">
                <p className="lbl">— The business</p>
                <h2>
                  Northern <em>Pathways.</em>
                </h2>
                <p>
                  A Canadian immigration firm providing{" "}
                  <strong>
                    eligibility assessments, strategic guidance, and legal
                    representation
                  </strong>{" "}
                  for individuals seeking permanent residency, study permits,
                  and family sponsorship. Led by an{" "}
                  <em>RCIC and university professor,</em> the firm combines
                  technical legal expertise with lived experience to provide
                  ethical, client-centered immigration services.
                </p>
                <p>
                  This site is the operational front desk for that practice
                  — the place a prospect arrives at, self-assesses against
                  the IRCC grid, reads the latest draw, and books a consult,
                  in either of two languages.
                </p>

                <div className="np-dna">
                  <div className="col">
                    <h5>Brand values</h5>
                    <div className="pills">
                      {[
                        "Ethical Integrity",
                        "Legal Accuracy",
                        "Transparency",
                        "Client-Centred Service",
                      ].map((v, i) => (
                        <span key={v} className={i === 0 ? "primary" : ""}>
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="col">
                    <h5>Aesthetic</h5>
                    <div className="pills">
                      {[
                        "Institutional professionalism",
                        "Canadian identity",
                        "Transparent clarity",
                        "Minimalist modernity",
                        "Authoritative trust",
                      ].map((v, i) => (
                        <span key={v} className={i === 0 ? "primary" : ""}>
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="col">
                    <h5>Tone of voice</h5>
                    <div className="pills">
                      {["Professional", "Empathetic", "Clear", "Authoritative"].map(
                        (v, i) => (
                          <span key={v} className={i === 0 ? "primary" : ""}>
                            {v}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* VISIT LIVE SITE CTA ---------------------------------- */}
            <a
              className="np-live-cta"
              href={LIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text">
                Visit the live site →
                <small>
                  northernpathways.ca · designed &amp; developed by FrameFlow ·
                  footer credit on every page
                </small>
              </span>
              <span className="visit">Open ↗</span>
            </a>
          </div>
        </section>

        {/* CLOSE ---------------------------------------------------- */}
        <section className="np-close">
          <div className="np-close-inner">
            <div className="np-close-grid">
              <div>
                <p className="lbl">— Outcome</p>
                <h2>
                  A practice with a{" "}
                  <em>self-serve front desk,</em> in two languages.
                </h2>
              </div>
              <div className="right">
                <p>
                  The website is live, the three tools are in production, and
                  the IRCC draws archive auto-mirrors to the firm&rsquo;s
                  Turkish-language handle the morning after every draw.{" "}
                  <b>Conversion is no longer a phone call.</b>
                </p>
                <a
                  className="live-link"
                  href={LIVE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit northernpathways.ca
                </a>
              </div>
            </div>

            <footer className="np-credit">
              <span>
                Reel <b>{frameNumber}</b> · Northern Pathways · 2025–2026
              </span>
              <span className="center">
                Designed &amp; developed by <b>Frame Flow</b>
              </span>
              <span className="right">
                Set in <b>Montserrat</b> · 300–900
              </span>
            </footer>
          </div>
        </section>

        {/* MODAL — social-post lightbox ---------------------------- */}
        {isOpen && activePost && (
          <div
            className="np-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${activePost.title} — ${modalIndex! + 1} of ${TOTAL}`}
            onClick={() => setModalIndex(null)}
          >
            <button
              type="button"
              className="np-modal-nav prev"
              aria-label="Previous post"
              onClick={(e) => {
                e.stopPropagation();
                setModalIndex((i) =>
                  i === null ? null : (i - 1 + TOTAL) % TOTAL
                );
              }}
            >
              ←
            </button>

            <div
              className="np-modal-stage"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="np-modal-bar top">
                <span className="np-modal-counter">
                  ★ Post <b>{String(modalIndex! + 1).padStart(2, "0")}</b> /{" "}
                  {String(TOTAL).padStart(2, "0")}
                </span>
                <span className="np-modal-brand">
                  NORTHERN PATHWAYS · CASE FILE
                </span>
                <button
                  type="button"
                  className="np-modal-close"
                  aria-label="Close"
                  onClick={() => setModalIndex(null)}
                >
                  ×
                </button>
              </div>

              <div className="np-modal-body is-image">
                <Image
                  src={activePost.src}
                  alt={activePost.alt}
                  fill
                  sizes="(max-width: 880px) 92vw, 720px"
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>

              <div className="np-modal-bar bot">
                <span className="np-modal-slate">
                  <b>{activePost.title}</b> · {activePost.meta} ·{" "}
                  <em>{activePost.pages}</em>
                </span>
              </div>
            </div>

            <button
              type="button"
              className="np-modal-nav next"
              aria-label="Next post"
              onClick={(e) => {
                e.stopPropagation();
                setModalIndex((i) =>
                  i === null ? null : (i + 1) % TOTAL
                );
              }}
            >
              →
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        body:has(.np-page) {
          background: #ffffff;
        }

        .np-page {
          --red:   #b92025;
          --red-d: #94181c;
          --paper: #f9f9f9;
          --white: #ffffff;
          --ink:   #2c2b2b;
          --ink-1: rgba(44, 43, 43, 0.92);
          --ink-2: rgba(44, 43, 43, 0.72);
          --ink-3: rgba(44, 43, 43, 0.50);
          --ink-4: rgba(44, 43, 43, 0.28);
          --ink-5: rgba(44, 43, 43, 0.14);
          --ink-6: rgba(44, 43, 43, 0.06);
          --on-dark-1: rgba(255, 255, 255, 0.92);
          --on-dark-2: rgba(255, 255, 255, 0.62);
          --on-dark-3: rgba(255, 255, 255, 0.32);
          --on-dark-4: rgba(255, 255, 255, 0.14);
          --type:  "Montserrat", system-ui, sans-serif;
          --max:   1320px;
          --pad-x: clamp(20px, 5vw, 56px);

          background: var(--white);
          color: var(--ink);
          font-family: var(--type);
          font-weight: 400;
          font-size: 16px;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
          border-top: 4px solid var(--red);
        }
        .np-page a { color: inherit; text-decoration: none; }
        .np-page img { display: block; max-width: 100%; }

        /* TOP RAIL */
        .np-rail {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 16px;
          padding: 14px 32px;
          background: var(--ink);
          color: var(--on-dark-2);
          font-family: var(--type);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
        }
        .np-rail-back { color: var(--on-dark-2); transition: color 0.2s; }
        .np-rail-back:hover { color: var(--red); }
        .np-rail-center {
          text-align: center;
          color: var(--white);
          letter-spacing: 0.5em;
          white-space: nowrap;
        }
        .np-rail-meta {
          text-align: right;
          color: var(--on-dark-2);
        }
        .np-rail-meta b { color: var(--red); }
        @media (max-width: 720px) {
          .np-rail {
            grid-template-columns: 1fr;
            gap: 4px;
            text-align: center;
            padding: 12px 16px;
          }
          .np-rail-back, .np-rail-meta { text-align: center; }
        }

        /* HERO */
        .np-hero {
          padding: clamp(72px, 9vw, 120px) var(--pad-x) clamp(56px, 7vw, 88px);
          position: relative;
        }
        .np-hero-inner {
          max-width: var(--max);
          margin: 0 auto;
        }
        .np-hero-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 18px 28px;
          align-items: baseline;
          margin-bottom: 36px;
          font-family: var(--type);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink-3);
        }
        .np-hero-meta .e { color: var(--red); }
        .np-hero-meta .e::before {
          content: "";
          display: inline-block;
          vertical-align: middle;
          width: 28px;
          height: 1.5px;
          background: var(--red);
          margin-right: 12px;
          margin-bottom: 3px;
        }
        .np-hero-meta .sep { color: var(--ink-4); }
        .np-hero-title {
          font-family: var(--type);
          font-weight: 800;
          font-size: clamp(40px, 7vw, 108px);
          line-height: 0.96;
          letter-spacing: -0.035em;
          color: var(--ink);
          margin-bottom: 28px;
          max-width: 17ch;
        }
        .np-hero-title em {
          font-style: italic;
          font-weight: 500;
          color: var(--red);
        }
        .np-hero-deck {
          display: grid;
          grid-template-columns: minmax(0, 1.4fr) minmax(280px, 1fr);
          gap: 56px;
          align-items: end;
          padding-top: 28px;
          border-top: 1px solid var(--ink-5);
        }
        .np-hero-deck .desc {
          font-family: var(--type);
          font-weight: 400;
          font-size: clamp(15px, 1.4vw, 18px);
          line-height: 1.7;
          color: var(--ink-2);
          max-width: 56ch;
        }
        .np-hero-deck .desc b { color: var(--ink); font-weight: 700; }
        .np-tagline {
          font-family: var(--type);
          font-style: italic;
          font-weight: 500;
          font-size: clamp(15px, 1.3vw, 17px);
          line-height: 1.55;
          color: var(--ink);
          padding-left: 22px;
          border-left: 3px solid var(--red);
        }
        .np-tagline small {
          display: block;
          font-style: normal;
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red);
          margin-top: 12px;
        }
        @media (max-width: 880px) {
          .np-hero-deck { grid-template-columns: 1fr; gap: 28px; }
        }

        /* FACT SHEET */
        .np-factsheet {
          padding: 32px var(--pad-x) 56px;
        }
        .np-factsheet-grid {
          max-width: var(--max);
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0;
          border-top: 2px solid var(--red);
          border-bottom: 2px solid var(--red);
        }
        .np-factsheet-grid > div {
          padding: 22px 22px 24px;
          border-left: 1px solid var(--ink-5);
        }
        .np-factsheet-grid > div:first-child {
          border-left: 0;
          padding-left: 0;
        }
        .np-factsheet-grid > div:last-child { padding-right: 0; }
        .np-factsheet-grid .k {
          font-family: var(--type);
          font-weight: 700;
          font-size: 9px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 10px;
        }
        .np-factsheet-grid .v {
          font-family: var(--type);
          font-weight: 800;
          font-size: 18px;
          line-height: 1.2;
          letter-spacing: -0.005em;
          color: var(--ink);
        }
        .np-factsheet-grid .v small {
          display: block;
          font-family: var(--type);
          font-weight: 500;
          font-size: 11px;
          letter-spacing: 0;
          text-transform: none;
          color: var(--ink-3);
          margin-top: 4px;
        }
        @media (max-width: 880px) {
          .np-factsheet-grid { grid-template-columns: 1fr 1fr; }
          .np-factsheet-grid > div {
            padding: 18px;
            border-left: 0;
            border-top: 1px solid var(--ink-5);
          }
          .np-factsheet-grid > div:nth-child(odd) { border-right: 1px solid var(--ink-5); }
          .np-factsheet-grid > div:first-child,
          .np-factsheet-grid > div:nth-child(2) {
            border-top: 0;
            padding-top: 0;
          }
        }

        /* BRIEF */
        .np-brief {
          padding: clamp(56px, 7vw, 88px) var(--pad-x);
        }
        .np-brief-grid {
          max-width: var(--max);
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.5fr);
          gap: 64px;
          align-items: start;
        }
        .np-brief-grid h2 {
          font-family: var(--type);
          font-weight: 800;
          font-size: clamp(28px, 3.4vw, 44px);
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: var(--ink);
          margin-top: 16px;
          max-width: 14ch;
        }
        .np-brief-grid h2 em { font-style: italic; font-weight: 500; color: var(--red); }
        .np-brief-grid .body p {
          font-family: var(--type);
          font-weight: 400;
          font-size: 16px;
          line-height: 1.85;
          color: var(--ink-2);
          margin-bottom: 1.1em;
          max-width: 60ch;
        }
        .np-brief-grid .body p:first-child {
          font-size: 18px;
          color: var(--ink-1);
          font-weight: 500;
          padding-left: 18px;
          border-left: 3px solid var(--red);
        }
        .np-brief-grid .body p:first-child::first-letter {
          font-family: var(--type);
          font-weight: 800;
          font-size: 48px;
          line-height: 0.85;
          float: left;
          padding: 4px 12px 0 0;
          color: var(--red);
        }
        .np-brief-grid .body p strong { color: var(--ink); font-weight: 700; }
        .np-brief-grid .body p em { font-style: italic; font-weight: 500; color: var(--red); }
        .np-eyebrow {
          font-family: var(--type);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red);
        }
        @media (max-width: 880px) {
          .np-brief-grid { grid-template-columns: 1fr; gap: 28px; }
        }

        /* SECTION + SECTION HEADER */
        .np-section {
          max-width: var(--max);
          margin: 0 auto;
          padding: 0 var(--pad-x) clamp(72px, 8vw, 112px);
        }
        .np-sec-head {
          padding: clamp(72px, 8vw, 112px) 0 clamp(28px, 3.5vw, 44px);
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 36px;
          align-items: end;
          border-top: 1px solid var(--ink-5);
          position: relative;
        }
        .np-sec-head::before {
          content: "";
          position: absolute;
          top: -1.5px;
          left: 0;
          width: 96px;
          height: 3px;
          background: var(--red);
        }
        .np-sec-head--no-rule { border-top: 0; padding-top: 0; }
        .np-sec-head--no-rule::before { display: none; }
        .np-sec-head .num {
          font-family: var(--type);
          font-weight: 800;
          font-size: clamp(48px, 6vw, 80px);
          line-height: 0.85;
          letter-spacing: -0.04em;
          color: var(--red);
        }
        .np-sec-head .num i {
          font-style: normal;
          color: var(--ink);
          font-weight: 500;
        }
        .np-sec-head .text { padding-bottom: 6px; }
        .np-sec-head h2 {
          font-family: var(--type);
          font-weight: 800;
          font-size: clamp(28px, 3.6vw, 48px);
          line-height: 1.05;
          letter-spacing: -0.025em;
          color: var(--ink);
        }
        .np-sec-head h2 em { font-style: italic; font-weight: 500; color: var(--red); }
        .np-sec-head .lbl {
          font-family: var(--type);
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 12px;
        }
        .np-sec-head .meta {
          text-align: right;
          font-family: var(--type);
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink-3);
          padding-bottom: 8px;
          max-width: 22ch;
          line-height: 1.55;
        }
        .np-sec-head .meta b { color: var(--ink); font-weight: 800; }
        @media (max-width: 720px) {
          .np-sec-head { grid-template-columns: auto 1fr; gap: 18px; }
          .np-sec-head .meta { display: none; }
        }

        /* BROWSER + TOOL CHROME (clickable div styled as window) */
        .np-browser, .np-toolwin {
          background: var(--white);
          border: 1px solid var(--ink-5);
          border-radius: 6px;
          overflow: hidden;
          box-shadow:
            0 32px 80px -32px rgba(44, 43, 43, 0.22),
            0 12px 32px -16px rgba(44, 43, 43, 0.08);
          position: relative;
          width: 100%;
        }
        .np-browser::before, .np-toolwin::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--red);
          z-index: 5;
        }
        .np-browser-chrome, .np-toolwin-chrome {
          padding: 12px 16px;
          background: var(--paper);
          border-bottom: 1px solid var(--ink-5);
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 18px;
          align-items: center;
        }
        .np-toolwin-chrome { padding: 11px 14px; gap: 12px; }
        .np-browser-chrome .dots, .np-toolwin-chrome .dots { display: flex; gap: 6px; }
        .np-toolwin-chrome .dots { gap: 5px; }
        .np-browser-chrome .dots span, .np-toolwin-chrome .dots span {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: var(--ink-4);
        }
        .np-toolwin-chrome .dots span {
          width: 9px;
          height: 9px;
        }
        .np-browser-chrome .dots span:first-child,
        .np-toolwin-chrome .dots span:first-child { background: var(--red); }
        .np-browser-chrome .url, .np-toolwin-chrome .url {
          padding: 5px 14px;
          background: var(--white);
          border: 1px solid var(--ink-5);
          border-radius: 4px;
          font-family: var(--type);
          font-weight: 600;
          font-size: 12px;
          color: var(--ink-2);
          max-width: 380px;
          margin: 0 auto;
        }
        .np-toolwin-chrome .url {
          font-size: 11px;
          padding: 4px 10px;
          max-width: 260px;
        }
        .np-browser-chrome .url::before { content: "🔒  "; opacity: 0.6; }
        .np-browser-chrome .lang {
          display: inline-flex;
          gap: 0;
          border: 1px solid var(--ink-5);
          border-radius: 4px;
          overflow: hidden;
        }
        .np-browser-chrome .lang span {
          padding: 4px 9px;
          font-family: var(--type);
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.18em;
          color: var(--ink-3);
        }
        .np-browser-chrome .lang .on {
          background: var(--red);
          color: var(--white);
        }
        .np-toolwin-chrome .live {
          font-family: var(--type);
          font-weight: 700;
          font-size: 9px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red);
        }
        .np-toolwin-chrome .live::before {
          content: "● ";
          animation: np-pulse 1.5s ease-in-out infinite;
        }
        @keyframes np-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        /* WEBSITE MOCKUP */
        .np-site { background: var(--white); }
        .np-site-nav {
          padding: 22px 36px;
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 36px;
          align-items: center;
          border-bottom: 1px solid var(--ink-5);
        }
        .np-site-nav .logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .np-site-nav .logo img {
          width: 42px;
          height: 42px;
          object-fit: contain;
        }
        .np-site-nav .logo .word {
          font-family: var(--type);
          font-weight: 800;
          font-size: 13px;
          letter-spacing: 0.04em;
          color: var(--ink);
          line-height: 1;
        }
        .np-site-nav .logo .word small {
          display: block;
          font-family: var(--type);
          font-weight: 700;
          font-size: 8px;
          letter-spacing: 0.32em;
          color: var(--red);
          margin-top: 4px;
        }
        .np-site-nav .menu {
          display: flex;
          justify-content: center;
          gap: 32px;
          font-family: var(--type);
          font-weight: 600;
          font-size: 12px;
          letter-spacing: 0.06em;
          color: var(--ink-1);
        }
        .np-site-nav .menu .on {
          color: var(--red);
          position: relative;
        }
        .np-site-nav .menu .on::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: -8px;
          height: 2px;
          background: var(--red);
        }
        .np-site-nav .right {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .np-site-nav .right .lang {
          display: inline-flex;
          border: 1px solid var(--ink-5);
          border-radius: 4px;
          overflow: hidden;
        }
        .np-site-nav .right .lang span {
          padding: 5px 9px;
          font-family: var(--type);
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.18em;
          color: var(--ink-3);
        }
        .np-site-nav .right .lang .on {
          background: var(--ink);
          color: var(--white);
        }
        .np-site-nav .right .cta {
          padding: 10px 18px;
          background: var(--red);
          color: var(--white);
          font-family: var(--type);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.12em;
          border-radius: 4px;
        }
        .np-site-hero {
          display: grid;
          grid-template-columns: minmax(0, 1.45fr) minmax(220px, 0.9fr);
          gap: 56px;
          align-items: center;
          padding: 64px 36px;
          background: var(--paper);
          border-bottom: 1px solid var(--ink-5);
        }
        .np-site-hero .text { min-width: 0; }
        .np-site-hero .eb {
          font-family: var(--type);
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 18px;
        }
        .np-site-hero h2 {
          font-family: var(--type);
          font-weight: 800;
          font-size: clamp(24px, 3vw, 40px);
          line-height: 1.05;
          letter-spacing: -0.025em;
          color: var(--ink);
          margin-bottom: 20px;
        }
        .np-site-hero h2 em {
          font-style: italic;
          font-weight: 500;
          color: var(--red);
        }
        .np-site-hero p {
          font-family: var(--type);
          font-weight: 400;
          font-size: 14px;
          line-height: 1.65;
          color: var(--ink-2);
          max-width: 52ch;
          margin-bottom: 22px;
        }
        .np-site-hero p b { font-weight: 700; color: var(--ink); }
        .np-site-hero .ctas {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .np-site-hero .ctas span {
          padding: 11px 18px;
          font-family: var(--type);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          border-radius: 4px;
        }
        .np-site-hero .ctas .p {
          background: var(--red);
          color: var(--white);
        }
        .np-site-hero .ctas .s {
          border: 1.5px solid var(--ink);
          color: var(--ink);
        }
        .np-site-hero .photo {
          background: var(--white);
          padding: 14px 14px 18px;
          border: 1px solid var(--ink-5);
          box-shadow: 0 16px 48px -24px rgba(44, 43, 43, 0.25);
        }
        .np-site-hero .photo .ph {
          width: 100%;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          background: var(--paper);
          position: relative;
        }
        .np-site-hero .photo .who {
          padding-top: 14px;
          border-top: 3px solid var(--red);
          margin-top: 14px;
        }
        .np-site-hero .photo .who h4 {
          font-family: var(--type);
          font-weight: 800;
          font-size: 14px;
          letter-spacing: -0.005em;
          color: var(--ink);
        }
        .np-site-hero .photo .who p {
          font-family: var(--type);
          font-weight: 700;
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--red);
          margin: 4px 0 0;
        }
        .np-site-services {
          padding: 36px 36px 22px;
          border-bottom: 1px solid var(--ink-5);
        }
        .np-site-services .lbl {
          font-family: var(--type);
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 18px;
        }
        .np-site-services h3 {
          font-family: var(--type);
          font-weight: 800;
          font-size: 22px;
          letter-spacing: -0.015em;
          color: var(--ink);
          margin-bottom: 22px;
          max-width: 28ch;
        }
        .np-site-services h3 em {
          font-style: italic;
          font-weight: 500;
          color: var(--red);
        }
        .np-site-services .row {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
        }
        .np-site-services .row > div {
          padding: 14px 12px 16px;
          border: 1px solid var(--ink-5);
          border-radius: 4px;
          background: var(--white);
          transition: border-color 0.2s, transform 0.2s;
        }
        .np-site-services .row > div:hover {
          border-color: var(--red);
          transform: translateY(-2px);
        }
        .np-site-services .row .n {
          font-family: var(--type);
          font-weight: 800;
          font-size: 9px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 6px;
        }
        .np-site-services .row .t {
          font-family: var(--type);
          font-weight: 700;
          font-size: 12px;
          line-height: 1.25;
          letter-spacing: -0.005em;
          color: var(--ink);
        }
        .np-site-foot {
          padding: 22px 36px;
          background: var(--paper);
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 18px;
          align-items: center;
          border-top: 4px solid var(--red);
        }
        .np-site-foot .left {
          font-family: var(--type);
          font-weight: 600;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink-3);
        }
        .np-site-foot .credit {
          font-family: var(--type);
          font-weight: 800;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink);
        }
        .np-site-foot .credit b { color: var(--red); }
        @media (max-width: 880px) {
          .np-site-nav {
            padding: 16px 20px;
            grid-template-columns: auto auto;
          }
          .np-site-nav .menu { display: none; }
          .np-site-hero {
            grid-template-columns: 1fr;
            padding: 32px 20px;
            gap: 22px;
          }
          .np-site-services { padding: 22px 20px; }
          .np-site-services .row { grid-template-columns: repeat(2, 1fr); }
          .np-site-foot {
            padding: 14px 20px;
            grid-template-columns: 1fr;
            gap: 8px;
            text-align: center;
          }
        }

        /* OBSERVATIONS BAR */
        .np-obs {
          margin-top: 32px;
          padding: 26px 30px;
          background: var(--ink);
          color: var(--white);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }
        .np-obs > div {
          padding: 0 22px;
          border-left: 1px solid var(--on-dark-3);
        }
        .np-obs > div:first-child {
          border-left: 0;
          padding-left: 0;
        }
        .np-obs .k {
          font-family: var(--type);
          font-weight: 700;
          font-size: 9px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 10px;
        }
        .np-obs .v {
          font-family: var(--type);
          font-weight: 800;
          font-size: 22px;
          letter-spacing: -0.015em;
          color: var(--white);
        }
        .np-obs > div:nth-child(4) .v { color: var(--red); }
        .np-obs .v small {
          display: block;
          margin-top: 4px;
          font-family: var(--type);
          font-weight: 500;
          font-size: 11px;
          letter-spacing: 0;
          text-transform: none;
          color: var(--on-dark-2);
        }
        @media (max-width: 880px) {
          .np-obs {
            grid-template-columns: 1fr 1fr;
            gap: 18px;
            padding: 22px;
          }
          .np-obs > div {
            padding: 0;
            border-left: 0;
          }
        }

        /* TOOLS INTRO */
        .np-tools-intro {
          max-width: var(--max);
          margin: 0 auto;
          padding: clamp(72px, 8vw, 112px) var(--pad-x) clamp(28px, 3.5vw, 48px);
          border-top: 1px solid var(--ink-5);
        }
        .np-tools-intro .deck {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.4fr);
          gap: 64px;
          align-items: end;
        }
        .np-tools-intro h2 {
          font-family: var(--type);
          font-weight: 800;
          font-size: clamp(36px, 4.6vw, 64px);
          line-height: 1.0;
          letter-spacing: -0.03em;
          color: var(--ink);
          max-width: 12ch;
        }
        .np-tools-intro h2 em {
          font-style: italic;
          font-weight: 500;
          color: var(--red);
        }
        .np-tools-intro .body p {
          font-family: var(--type);
          font-weight: 400;
          font-size: 16px;
          line-height: 1.75;
          color: var(--ink-2);
          max-width: 56ch;
        }
        .np-tools-intro .body p strong {
          color: var(--ink);
          font-weight: 700;
        }
        @media (max-width: 880px) {
          .np-tools-intro .deck {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }

        /* TOOL */
        .np-tool {
          max-width: var(--max);
          margin: 0 auto;
          padding: clamp(48px, 6vw, 80px) var(--pad-x);
        }
        .np-tool + .np-tool { border-top: 1px solid var(--ink-5); }
        .np-tool-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.45fr);
          gap: 56px;
          align-items: start;
        }
        .np-tool-grid.alt {
          grid-template-columns: minmax(0, 1.45fr) minmax(0, 0.85fr);
        }
        .np-tool-grid.alt .np-tool-text { order: 2; }
        @media (max-width: 980px) {
          .np-tool-grid, .np-tool-grid.alt {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .np-tool-grid.alt .np-tool-text { order: 0; }
        }

        .np-tool-text { position: sticky; top: 96px; }
        @media (max-width: 980px) {
          .np-tool-text { position: static; }
        }

        .np-tool-tag {
          font-family: var(--type);
          font-weight: 800;
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 16px;
          display: inline-flex;
          align-items: baseline;
          gap: 12px;
        }
        .np-tool-tag b {
          font-family: var(--type);
          font-weight: 800;
          font-size: 14px;
          letter-spacing: 0.04em;
          color: var(--ink);
        }
        .np-tool-name {
          font-family: var(--type);
          font-weight: 800;
          font-size: clamp(28px, 3.4vw, 44px);
          line-height: 1.05;
          letter-spacing: -0.025em;
          color: var(--ink);
          margin-bottom: 18px;
        }
        .np-tool-name em {
          font-style: italic;
          font-weight: 500;
          color: var(--red);
        }
        .np-tool-desc {
          font-family: var(--type);
          font-weight: 400;
          font-size: 15px;
          line-height: 1.75;
          color: var(--ink-2);
          margin-bottom: 18px;
          max-width: 44ch;
        }
        .np-tool-desc b { color: var(--ink); font-weight: 700; }
        .np-tool-desc em {
          font-style: italic;
          color: var(--red);
          font-weight: 500;
        }
        .np-tool-features {
          padding-top: 18px;
          border-top: 2px solid var(--red);
          list-style: none;
          margin: 0;
          padding-left: 0;
        }
        .np-tool-features li {
          padding: 12px 0;
          border-bottom: 1px dashed var(--ink-5);
          display: flex;
          align-items: baseline;
          gap: 14px;
          font-family: var(--type);
          font-weight: 500;
          font-size: 13px;
          line-height: 1.55;
          color: var(--ink-1);
        }
        .np-tool-features li::before {
          content: "→";
          flex: 0 0 16px;
          font-family: var(--type);
          font-weight: 800;
          font-size: 14px;
          line-height: 1.55;
          color: var(--red);
        }
        .np-tool-features li > span {
          flex: 1 1 auto;
          min-width: 0;
        }
        .np-tool-features li b {
          color: var(--red);
          font-weight: 800;
        }

        /* CRS CALCULATOR */
        .np-crs { padding: 28px 28px 30px; }
        .np-crs-head {
          display: grid;
          grid-template-columns: auto auto 1fr auto;
          gap: 16px;
          align-items: baseline;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--ink-5);
          margin-bottom: 22px;
        }
        .np-crs-head .step {
          padding: 4px 10px;
          background: var(--red);
          color: var(--white);
          font-family: var(--type);
          font-weight: 800;
          font-size: 9px;
          letter-spacing: 0.18em;
          border-radius: 3px;
        }
        .np-crs-head .crumb {
          font-family: var(--type);
          font-weight: 600;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink-3);
        }
        .np-crs-head .crumb b { color: var(--ink); font-weight: 800; }
        .np-crs-head .progress {
          display: flex;
          gap: 4px;
          align-items: center;
        }
        .np-crs-head .progress span {
          width: 22px;
          height: 4px;
          background: var(--ink-5);
          border-radius: 2px;
        }
        .np-crs-head .progress span.on { background: var(--red); }
        .np-crs-head .save {
          font-family: var(--type);
          font-weight: 700;
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink-3);
        }
        .np-crs-head .save b { color: var(--ink); }
        .np-crs-body {
          display: grid;
          grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
          gap: 22px;
        }
        .np-crs-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .np-crs-form .head {
          padding: 8px 0 12px;
          border-bottom: 1px solid var(--ink-5);
        }
        .np-crs-form .head .lbl {
          font-family: var(--type);
          font-weight: 700;
          font-size: 9px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 4px;
        }
        .np-crs-form .head h4 {
          font-family: var(--type);
          font-weight: 800;
          font-size: 17px;
          letter-spacing: -0.005em;
          color: var(--ink);
        }
        .np-crs-form .head p {
          font-family: var(--type);
          font-weight: 500;
          font-size: 11px;
          color: var(--ink-3);
          margin-top: 4px;
        }
        .np-crs-form .field {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 14px;
          align-items: center;
          padding: 10px 14px;
          border: 1px solid var(--ink-5);
          border-radius: 4px;
          background: var(--white);
        }
        .np-crs-form .field.on {
          border-color: var(--red);
          box-shadow: 0 0 0 3px rgba(185, 32, 37, 0.08);
        }
        .np-crs-form .field .k {
          font-family: var(--type);
          font-weight: 700;
          font-size: 12px;
          letter-spacing: -0.005em;
          color: var(--ink);
        }
        .np-crs-form .field .k small {
          display: block;
          font-family: var(--type);
          font-weight: 500;
          font-size: 10px;
          color: var(--ink-3);
          margin-top: 3px;
        }
        .np-crs-form .field .v {
          padding: 5px 10px;
          background: var(--paper);
          border: 1px solid var(--ink-5);
          border-radius: 3px;
          font-family: var(--type);
          font-weight: 800;
          font-size: 12px;
          color: var(--ink);
          min-width: 86px;
          text-align: center;
        }
        .np-crs-form .field.on .v {
          background: var(--white);
          color: var(--red);
          border-color: var(--red);
        }
        .np-crs-readout {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .np-crs-score {
          padding: 22px 22px 24px;
          background: var(--ink);
          color: var(--white);
          border-radius: 4px;
          position: relative;
          overflow: hidden;
        }
        .np-crs-score .lbl {
          font-family: var(--type);
          font-weight: 700;
          font-size: 9px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 12px;
        }
        .np-crs-score .num {
          font-family: var(--type);
          font-weight: 800;
          font-size: 86px;
          line-height: 0.85;
          letter-spacing: -0.05em;
          color: var(--white);
        }
        .np-crs-score .num small {
          display: block;
          margin-top: 8px;
          font-family: var(--type);
          font-weight: 600;
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--on-dark-2);
        }
        .np-crs-score .bar {
          margin-top: 16px;
          height: 6px;
          background: var(--on-dark-4);
          border-radius: 3px;
          overflow: hidden;
        }
        .np-crs-score .bar > span {
          display: block;
          height: 100%;
          width: 40.6%;
          background: var(--red);
        }
        .np-crs-score .delta {
          margin-top: 12px;
          display: flex;
          justify-content: space-between;
          gap: 12px;
          font-family: var(--type);
          font-weight: 700;
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--on-dark-3);
        }
        .np-crs-score .delta b { color: var(--white); font-weight: 800; }
        .np-crs-section {
          padding: 14px 16px;
          background: var(--paper);
          border: 1px solid var(--ink-5);
          border-radius: 4px;
        }
        .np-crs-section .lbl {
          font-family: var(--type);
          font-weight: 700;
          font-size: 9px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 10px;
        }
        .np-crs-section dl > div {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          padding: 5px 0;
          border-top: 1px dashed var(--ink-5);
          font-family: var(--type);
          font-weight: 700;
          font-size: 11px;
          color: var(--ink-1);
        }
        .np-crs-section dl > div:first-child { border-top: 0; }
        .np-crs-section dl dt { color: var(--ink-2); font-weight: 600; }
        .np-crs-section dl dd { color: var(--red); font-weight: 800; }
        .np-crs-section dl dd em {
          font-style: italic;
          color: var(--red);
          font-weight: 700;
        }
        .np-crs-cta {
          padding: 12px 14px;
          background: var(--red);
          color: var(--white);
          font-family: var(--type);
          font-weight: 800;
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          text-align: center;
          border-radius: 4px;
        }
        @media (max-width: 880px) {
          .np-crs { padding: 20px; }
          .np-crs-body { grid-template-columns: 1fr; }
          .np-crs-head { grid-template-columns: auto auto 1fr; }
          .np-crs-head .save { display: none; }
          .np-crs-score .num { font-size: 64px; }
        }

        /* FSWP CHECKER */
        .np-fswp { padding: 28px 28px 30px; }
        .np-fswp-head {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 16px;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--ink-5);
          margin-bottom: 22px;
          align-items: center;
        }
        .np-fswp-head h4 {
          font-family: var(--type);
          font-weight: 800;
          font-size: 17px;
          letter-spacing: -0.005em;
          color: var(--ink);
          margin-bottom: 4px;
        }
        .np-fswp-head .lbl {
          font-family: var(--type);
          font-weight: 700;
          font-size: 9px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red);
        }
        .np-fswp-head .verdict {
          padding: 6px 14px;
          border-radius: 3px;
          background: var(--ink);
          color: var(--white);
          font-family: var(--type);
          font-weight: 800;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .np-fswp-head .verdict b { color: var(--red); margin-left: 6px; }
        .np-fswp-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
          gap: 22px;
        }
        .np-fswp-factors {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .np-fswp-factor {
          padding: 12px 14px;
          border: 1px solid var(--ink-5);
          border-radius: 4px;
          background: var(--white);
          display: grid;
          grid-template-columns: 22px 1fr auto auto;
          gap: 12px;
          align-items: center;
        }
        .np-fswp-factor.on { border-color: var(--red); }
        .np-fswp-factor .pip {
          width: 18px;
          height: 18px;
          border: 2px solid var(--ink-4);
          border-radius: 50%;
          position: relative;
        }
        .np-fswp-factor.on .pip { border-color: var(--red); }
        .np-fswp-factor.on .pip::after {
          content: "";
          position: absolute;
          inset: 3px;
          background: var(--red);
          border-radius: 50%;
        }
        .np-fswp-factor .name {
          font-family: var(--type);
          font-weight: 700;
          font-size: 12px;
          color: var(--ink);
        }
        .np-fswp-factor .name small {
          display: block;
          font-family: var(--type);
          font-weight: 500;
          font-size: 10px;
          color: var(--ink-3);
          margin-top: 2px;
        }
        .np-fswp-factor .max {
          font-family: var(--type);
          font-weight: 700;
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink-3);
        }
        .np-fswp-factor .got {
          font-family: var(--type);
          font-weight: 800;
          font-size: 13px;
          letter-spacing: -0.005em;
          color: var(--ink);
          min-width: 38px;
          text-align: right;
        }
        .np-fswp-factor.on .got { color: var(--red); }
        .np-fswp-readout {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .np-fswp-meter {
          padding: 22px 22px 24px;
          background: var(--paper);
          border: 1px solid var(--ink-5);
          border-radius: 4px;
        }
        .np-fswp-meter .lbl {
          font-family: var(--type);
          font-weight: 700;
          font-size: 9px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 12px;
        }
        .np-fswp-meter .num {
          font-family: var(--type);
          font-weight: 800;
          font-size: 72px;
          line-height: 0.85;
          letter-spacing: -0.05em;
          color: var(--ink);
        }
        .np-fswp-meter .num em {
          font-family: var(--type);
          font-style: italic;
          font-weight: 500;
          color: var(--red);
        }
        .np-fswp-meter .num small {
          display: block;
          margin-top: 8px;
          font-family: var(--type);
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink-3);
        }
        .np-fswp-meter .ruler {
          margin-top: 16px;
          position: relative;
          height: 28px;
        }
        .np-fswp-meter .ruler .track {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
          height: 4px;
          background: var(--ink-5);
          border-radius: 2px;
        }
        .np-fswp-meter .ruler .fill {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          height: 4px;
          width: 73%;
          background: var(--red);
          border-radius: 2px;
        }
        .np-fswp-meter .ruler .marker {
          position: absolute;
          top: 50%;
          left: 67%;
          transform: translate(-50%, -50%);
          width: 2px;
          height: 16px;
          background: var(--ink);
        }
        .np-fswp-meter .ruler .marker::after {
          content: "67 · pass mark";
          position: absolute;
          top: 18px;
          left: 50%;
          transform: translateX(-50%);
          font-family: var(--type);
          font-weight: 700;
          font-size: 8px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink);
          white-space: nowrap;
        }
        .np-fswp-meter .ruler .dot {
          position: absolute;
          top: 50%;
          left: 73%;
          width: 14px;
          height: 14px;
          transform: translate(-50%, -50%);
          background: var(--red);
          border: 3px solid var(--white);
          box-shadow: 0 0 0 1px var(--red);
          border-radius: 50%;
        }
        .np-fswp-pass {
          padding: 12px 14px;
          background: var(--ink);
          color: var(--white);
          border-radius: 4px;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 14px;
          align-items: center;
        }
        .np-fswp-pass .ic {
          width: 28px;
          height: 28px;
          background: var(--red);
          color: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          font-family: var(--type);
          font-weight: 800;
          font-size: 14px;
        }
        .np-fswp-pass .t {
          font-family: var(--type);
          font-weight: 700;
          font-size: 12px;
          letter-spacing: -0.005em;
          color: var(--white);
        }
        .np-fswp-pass .t small {
          display: block;
          font-family: var(--type);
          font-weight: 500;
          font-size: 10px;
          color: var(--on-dark-2);
          margin-top: 3px;
        }
        @media (max-width: 880px) {
          .np-fswp { padding: 20px; }
          .np-fswp-grid { grid-template-columns: 1fr; }
          .np-fswp-meter .num { font-size: 56px; }
        }

        /* DRAWS TRACKER */
        .np-draws-head {
          padding: 22px 28px;
          border-bottom: 1px solid var(--ink-5);
          display: grid;
          grid-template-columns: 1fr auto auto auto;
          gap: 18px;
          align-items: center;
        }
        .np-draws-head .name h4 {
          font-family: var(--type);
          font-weight: 800;
          font-size: 17px;
          letter-spacing: -0.005em;
          color: var(--ink);
          margin-bottom: 3px;
        }
        .np-draws-head .name p {
          font-family: var(--type);
          font-weight: 600;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink-3);
        }
        .np-draws-head .name p b { color: var(--red); font-weight: 800; }
        .np-draws-head .filter {
          padding: 7px 12px;
          background: var(--paper);
          border: 1px solid var(--ink-5);
          border-radius: 3px;
          font-family: var(--type);
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.14em;
          color: var(--ink-1);
        }
        .np-draws-head .filter.on {
          background: var(--red);
          color: var(--white);
          border-color: var(--red);
        }
        .np-draws-spark {
          padding: 18px 28px 22px;
          border-bottom: 1px solid var(--ink-5);
          background: var(--paper);
        }
        .np-draws-spark .top {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 12px;
          margin-bottom: 12px;
          align-items: baseline;
        }
        .np-draws-spark .top .lbl {
          font-family: var(--type);
          font-weight: 700;
          font-size: 9px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red);
        }
        .np-draws-spark .top .lbl b {
          color: var(--ink);
          font-weight: 800;
          margin-left: 8px;
        }
        .np-draws-spark .top .legend {
          display: flex;
          gap: 14px;
          font-family: var(--type);
          font-weight: 600;
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink-3);
        }
        .np-draws-spark .top .legend span {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .np-draws-spark .top .legend .ms {
          display: inline-block;
          width: 18px;
          height: 2px;
          background: var(--red);
        }
        .np-draws-spark .top .legend .mc {
          display: inline-block;
          width: 18px;
          height: 2px;
          background: var(--ink);
        }
        .np-draws-spark svg {
          width: 100%;
          height: 90px;
          display: block;
        }
        .np-draws-spark .scale {
          display: grid;
          grid-template-columns: repeat(13, 1fr);
          gap: 0;
          margin-top: 4px;
        }
        .np-draws-spark .scale span {
          font-family: var(--type);
          font-weight: 600;
          font-size: 8px;
          letter-spacing: 0.14em;
          color: var(--ink-3);
          text-align: center;
        }
        .np-draws-table {
          width: 100%;
          border-collapse: collapse;
        }
        .np-draws-table thead th {
          padding: 12px 18px;
          text-align: left;
          background: var(--white);
          border-bottom: 1.5px solid var(--ink);
          font-family: var(--type);
          font-weight: 800;
          font-size: 9px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red);
          vertical-align: middle;
        }
        .np-draws-table thead th.r { text-align: right; }
        .np-draws-table tbody td {
          padding: 14px 18px;
          border-bottom: 1px solid var(--ink-5);
          font-family: var(--type);
          font-weight: 600;
          font-size: 13px;
          color: var(--ink-1);
          vertical-align: middle;
        }
        .np-draws-table tbody td.r { text-align: right; }
        .np-draws-table tbody tr:hover { background: var(--paper); }
        .np-draws-table .draw-id {
          font-family: var(--type);
          font-weight: 800;
          font-size: 12px;
          letter-spacing: 0.04em;
          color: var(--ink);
        }
        .np-draws-table .pillc {
          display: inline-block;
          padding: 3px 8px;
          border-radius: 3px;
          font-family: var(--type);
          font-weight: 800;
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          background: var(--paper);
          color: var(--ink);
          border: 1px solid var(--ink-5);
        }
        .np-draws-table .pillc.r {
          background: var(--red);
          color: var(--white);
          border-color: var(--red);
        }
        .np-draws-table .pillc.k {
          background: var(--ink);
          color: var(--white);
          border-color: var(--ink);
        }
        .np-draws-table .num {
          font-family: var(--type);
          font-weight: 800;
          font-size: 14px;
          letter-spacing: -0.005em;
          color: var(--ink);
        }
        .np-draws-table .num.red { color: var(--red); }
        .np-draws-foot {
          padding: 16px 28px;
          background: var(--paper);
          border-top: 1px solid var(--ink-5);
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 14px;
          align-items: center;
          font-family: var(--type);
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink-3);
        }
        .np-draws-foot b { color: var(--ink); font-weight: 800; }
        .np-draws-foot em {
          font-style: italic;
          font-weight: 500;
          color: var(--red);
          letter-spacing: 0.04em;
          text-transform: none;
        }
        @media (max-width: 880px) {
          .np-draws-head {
            grid-template-columns: 1fr;
            padding: 18px;
            gap: 10px;
          }
          .np-draws-head .filter { display: inline-block; }
          .np-draws-spark { padding: 16px 18px 20px; }
          .np-draws-table thead { display: none; }
          .np-draws-table tbody td {
            padding: 12px 18px;
            font-size: 12px;
          }
          .np-draws-table tbody tr {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4px 14px;
            padding: 14px 0;
            border-bottom: 1px solid var(--ink-5);
          }
          .np-draws-table tbody td { border-bottom: 0; padding: 0 18px; }
        }

        /* BILINGUAL */
        .np-bilingual-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
        }
        .np-bili-card {
          background: var(--paper);
          border: 1px solid var(--ink-5);
          border-radius: 6px;
          padding: 28px 28px 32px;
          position: relative;
          overflow: hidden;
          border-top: 4px solid var(--red);
        }
        .np-bili-card .flag {
          position: absolute;
          top: 22px;
          right: 22px;
          padding: 4px 10px;
          background: var(--red);
          color: var(--white);
          font-family: var(--type);
          font-weight: 800;
          font-size: 10px;
          letter-spacing: 0.2em;
          border-radius: 3px;
        }
        .np-bili-card .lbl {
          font-family: var(--type);
          font-weight: 700;
          font-size: 9px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 12px;
        }
        .np-bili-card h4 {
          font-family: var(--type);
          font-weight: 800;
          font-size: clamp(20px, 2.4vw, 26px);
          line-height: 1.15;
          letter-spacing: -0.015em;
          color: var(--ink);
          margin-bottom: 14px;
          max-width: 22ch;
        }
        .np-bili-card h4 em {
          font-style: italic;
          font-weight: 500;
          color: var(--red);
        }
        .np-bili-card p {
          font-family: var(--type);
          font-weight: 400;
          font-size: 14px;
          line-height: 1.7;
          color: var(--ink-2);
          margin-bottom: 18px;
          max-width: 50ch;
        }
        .np-bili-card .routes {
          padding-top: 14px;
          border-top: 1px solid var(--ink-5);
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .np-bili-card .routes span {
          padding: 4px 9px;
          background: var(--white);
          border: 1px solid var(--ink-5);
          border-radius: 3px;
          font-family: var(--type);
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.04em;
          color: var(--ink-1);
        }
        .np-bili-card .routes span b {
          color: var(--red);
          font-weight: 800;
        }
        @media (max-width: 720px) {
          .np-bilingual-grid { grid-template-columns: 1fr; }
        }

        /* SOCIAL POSTS GRID (clickable) */
        .np-social-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
        }
        .np-social-card {
          position: relative;
          background: var(--white);
          border: 1px solid var(--ink-5);
          border-radius: 4px;
          overflow: hidden;
          aspect-ratio: 4 / 5;
          padding: 0;
          cursor: pointer;
          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
        }
        .np-social-card::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--red);
          z-index: 2;
        }
        .np-social-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 32px -16px rgba(44, 43, 43, 0.22);
          border-color: var(--red);
        }
        .np-social-card .badge {
          position: absolute;
          top: 8px;
          left: 8px;
          padding: 3px 7px;
          background: var(--ink);
          color: var(--white);
          font-family: var(--type);
          font-weight: 800;
          font-size: 8px;
          letter-spacing: 0.2em;
          border-radius: 2px;
          z-index: 3;
        }
        .np-social-card .pages {
          position: absolute;
          top: 8px;
          right: 8px;
          padding: 3px 7px;
          background: var(--white);
          color: var(--ink);
          font-family: var(--type);
          font-weight: 800;
          font-size: 8px;
          letter-spacing: 0.18em;
          border: 1px solid var(--ink-5);
          border-radius: 2px;
          z-index: 3;
        }
        .np-social-card .pages.live {
          background: var(--red);
          color: var(--white);
          border-color: var(--red);
        }
        @media (max-width: 880px) {
          .np-social-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 480px) {
          .np-social-grid { grid-template-columns: repeat(2, 1fr); }
        }

        /* ABOUT */
        .np-about {
          background: var(--paper);
          padding: 0 var(--pad-x);
          border-top: 1px solid var(--ink-5);
        }
        .np-about-inner {
          max-width: var(--max);
          margin: 0 auto;
          padding: clamp(72px, 8vw, 112px) 0;
        }
        .np-about-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.4fr);
          gap: 64px;
          align-items: start;
          margin-top: 8px;
        }
        .np-about-portrait {
          background: var(--white);
          border: 1px solid var(--ink-5);
          padding: 14px 14px 18px;
          box-shadow: 0 16px 48px -24px rgba(44, 43, 43, 0.2);
          position: relative;
        }
        .np-about-portrait::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--red);
        }
        .np-about-portrait::after {
          content: "RCIC-IRB";
          position: absolute;
          top: 22px;
          left: -10px;
          padding: 5px 12px;
          background: var(--red);
          color: var(--white);
          font-family: var(--type);
          font-weight: 800;
          font-size: 9px;
          letter-spacing: 0.32em;
          box-shadow: 0 6px 14px -4px rgba(185, 32, 37, 0.4);
        }
        .np-about-portrait .ph {
          width: 100%;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          background: var(--paper);
          position: relative;
        }
        .np-about-portrait .who {
          padding-top: 14px;
          border-top: 3px solid var(--red);
          margin-top: 14px;
        }
        .np-about-portrait .who h4 {
          font-family: var(--type);
          font-weight: 800;
          font-size: 18px;
          letter-spacing: -0.01em;
          color: var(--ink);
        }
        .np-about-portrait .who .role {
          font-family: var(--type);
          font-weight: 700;
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--red);
          margin: 4px 0 12px;
        }
        .np-about-portrait .who dl > div {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          padding: 6px 0;
          border-top: 1px dashed var(--ink-5);
          font-family: var(--type);
          font-weight: 700;
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--ink-3);
        }
        .np-about-portrait .who dl > div:first-child { border-top: 0; }
        .np-about-portrait .who dl dd {
          color: var(--ink);
          font-weight: 800;
        }
        .np-about-text { min-width: 0; }
        .np-about-text .lbl {
          font-family: var(--type);
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 16px;
        }
        .np-about-text h2 {
          font-family: var(--type);
          font-weight: 800;
          font-size: clamp(32px, 4vw, 56px);
          line-height: 1.0;
          letter-spacing: -0.025em;
          color: var(--ink);
          margin-bottom: 22px;
        }
        .np-about-text h2 em {
          font-style: italic;
          font-weight: 500;
          color: var(--red);
        }
        .np-about-text p {
          font-family: var(--type);
          font-weight: 400;
          font-size: 16px;
          line-height: 1.8;
          color: var(--ink-2);
          margin-bottom: 1em;
          max-width: 60ch;
        }
        .np-about-text p strong { color: var(--ink); font-weight: 700; }
        .np-about-text p em {
          font-style: italic;
          font-weight: 500;
          color: var(--red);
        }
        .np-dna {
          margin-top: 26px;
          padding-top: 22px;
          border-top: 1px solid var(--ink-5);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }
        .np-dna .col h5 {
          font-family: var(--type);
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 12px;
        }
        .np-dna .col .pills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .np-dna .col .pills span {
          padding: 6px 11px;
          background: var(--white);
          border: 1px solid var(--ink-5);
          border-radius: 999px;
          font-family: var(--type);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.02em;
          color: var(--ink-1);
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .np-dna .col .pills span:hover {
          border-color: var(--red);
          color: var(--red);
        }
        .np-dna .col .pills span.primary {
          background: var(--red);
          border-color: var(--red);
          color: var(--white);
        }
        @media (max-width: 880px) {
          .np-about-grid { grid-template-columns: 1fr; gap: 28px; }
          .np-dna { grid-template-columns: 1fr; gap: 14px; }
        }

        /* LIVE CTA */
        .np-live-cta {
          margin: 64px auto 0;
          padding: 30px 36px;
          background: var(--red);
          color: var(--white);
          border: 2px solid var(--ink);
          box-shadow: 10px 10px 0 var(--ink);
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 24px;
          align-items: center;
          transition: transform 0.3s, box-shadow 0.3s;
          max-width: var(--max);
        }
        .np-live-cta:hover {
          transform: translateY(-3px);
          box-shadow: 13px 13px 0 var(--ink);
        }
        .np-live-cta .text {
          font-family: var(--type);
          font-weight: 800;
          font-size: clamp(22px, 3vw, 32px);
          letter-spacing: -0.015em;
          color: var(--white);
          line-height: 1.1;
        }
        .np-live-cta .text small {
          display: block;
          font-family: var(--type);
          font-weight: 500;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.85);
          margin-top: 6px;
          letter-spacing: 0;
        }
        .np-live-cta .visit {
          padding: 14px 22px;
          background: var(--white);
          color: var(--red);
          font-family: var(--type);
          font-weight: 800;
          font-size: 11px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }
        @media (max-width: 720px) {
          .np-live-cta {
            grid-template-columns: 1fr;
            padding: 22px;
          }
        }

        /* CLOSE */
        .np-close {
          background: var(--ink);
          color: var(--white);
          padding: 0 var(--pad-x);
          position: relative;
          overflow: hidden;
          border-top: 6px solid var(--red);
        }
        .np-close::before {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(185, 32, 37, 0.18), transparent 70%);
          pointer-events: none;
        }
        .np-close-inner {
          max-width: var(--max);
          margin: 0 auto;
          padding: clamp(80px, 9vw, 128px) 0 clamp(72px, 8vw, 112px);
          position: relative;
          z-index: 2;
        }
        .np-close-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.4fr) minmax(0, 0.9fr);
          gap: 64px;
          align-items: end;
        }
        .np-close .lbl {
          font-family: var(--type);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 22px;
        }
        .np-close h2 {
          font-family: var(--type);
          font-weight: 800;
          font-size: clamp(40px, 5.6vw, 88px);
          line-height: 0.95;
          letter-spacing: -0.03em;
          color: var(--white);
          max-width: 14ch;
        }
        .np-close h2 em {
          font-style: italic;
          font-weight: 500;
          color: var(--red);
        }
        .np-close .right { padding-bottom: 8px; }
        .np-close .right p {
          font-family: var(--type);
          font-weight: 400;
          font-size: 16px;
          line-height: 1.7;
          color: var(--on-dark-2);
          margin-bottom: 1em;
          max-width: 36ch;
        }
        .np-close .right p b { color: var(--white); font-weight: 700; }
        .np-close .right .live-link {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 14px 22px;
          background: var(--red);
          color: var(--white);
          font-family: var(--type);
          font-weight: 800;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          border-radius: 4px;
          margin-top: 18px;
          transition: background 0.2s, color 0.2s;
        }
        .np-close .right .live-link::after {
          content: "↗";
          font-size: 14px;
        }
        .np-close .right .live-link:hover {
          background: var(--white);
          color: var(--ink);
        }
        .np-credit {
          margin-top: clamp(56px, 7vw, 96px);
          padding-top: 28px;
          border-top: 1px solid var(--on-dark-3);
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 18px;
          align-items: center;
          font-family: var(--type);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--on-dark-2);
        }
        .np-credit .center {
          text-align: center;
          color: var(--red);
          letter-spacing: 0.4em;
        }
        .np-credit .right { text-align: right; }
        .np-credit b { color: var(--white); font-weight: 800; }
        @media (max-width: 880px) {
          .np-close-grid { grid-template-columns: 1fr; gap: 28px; }
          .np-credit {
            grid-template-columns: 1fr;
            gap: 6px;
            text-align: center;
          }
          .np-credit .right { text-align: center; }
        }

        /* MODAL — NP brand styling */
        .np-modal {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px;
          background: rgba(44, 43, 43, 0.88);
          backdrop-filter: blur(6px);
          animation: np-fade 0.22s ease-out;
        }
        @keyframes np-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .np-modal-stage {
          position: relative;
          width: min(960px, 92vw);
          height: min(92vh, 1200px);
          max-height: 92vh;
          background: var(--white);
          display: flex;
          flex-direction: column;
          border-radius: 4px;
          overflow: hidden;
          animation: np-pop 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow:
            0 32px 80px -16px rgba(0, 0, 0, 0.55),
            0 0 0 4px var(--red);
        }
        @keyframes np-pop {
          from {
            transform: scale(0.96);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .np-modal-bar {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          font-family: var(--type);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--ink-3);
          background: var(--paper);
        }
        .np-modal-bar.top {
          border-bottom: 2px solid var(--red);
          justify-content: space-between;
        }
        .np-modal-bar.bot {
          border-top: 1px solid var(--ink-5);
          justify-content: center;
          letter-spacing: 0;
          text-transform: none;
          font-weight: 600;
          color: var(--ink-2);
          font-size: 13px;
        }
        .np-modal-counter b {
          color: var(--red);
          font-weight: 900;
        }
        .np-modal-brand {
          letter-spacing: 0.32em;
          color: var(--ink);
          font-weight: 800;
        }
        .np-modal-close {
          width: 32px;
          height: 32px;
          background: var(--ink);
          color: var(--white);
          border: 0;
          cursor: pointer;
          font-family: var(--type);
          font-size: 18px;
          font-weight: 700;
          line-height: 1;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, color 0.2s;
          border-radius: 3px;
        }
        .np-modal-close:hover {
          background: var(--red);
          color: var(--white);
        }
        .np-modal-slate b {
          color: var(--ink);
          font-weight: 800;
        }
        .np-modal-slate em {
          font-style: italic;
          font-weight: 500;
          color: var(--red);
        }
        .np-modal-body {
          flex: 1 1 auto;
          min-height: 0;
          position: relative;
          overflow: auto;
        }
        .np-modal-body.is-image {
          background: var(--ink);
          overflow: hidden;
        }
        .np-modal-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--white);
          color: var(--ink);
          border: 2px solid var(--ink);
          cursor: pointer;
          font-family: var(--type);
          font-size: 22px;
          font-weight: 700;
          line-height: 1;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s, background 0.2s, color 0.2s;
          z-index: 5;
        }
        .np-modal-nav:hover {
          transform: translateY(-50%) scale(1.06);
          background: var(--red);
          color: var(--white);
          border-color: var(--red);
        }
        .np-modal-nav.prev { left: 32px; }
        .np-modal-nav.next { right: 32px; }
        @media (max-width: 720px) {
          .np-modal { padding: 16px; }
          .np-modal-stage {
            width: 100%;
            height: 86vh;
          }
          .np-modal-nav { width: 44px; height: 44px; font-size: 18px; }
          .np-modal-nav.prev { left: 8px; }
          .np-modal-nav.next { right: 8px; }
        }
      `}</style>
    </>
  );
}
