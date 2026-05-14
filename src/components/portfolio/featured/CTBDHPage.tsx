"use client";

import Image from "next/image";
import Link from "next/link";
import { getFrameNumber } from "@/data/clients";
import type { Client } from "@/data/clients";
import { LoadingTransition } from "@/components/portfolio/LoadingTransition";

type Props = { client: Client };

/* ---------- member roster (CTBDH-specific data) ----------
   The 10 Turkish-Canadian businesses we filmed for the network.
   Lives in this component because the data is bespoke per page —
   sector, founded, runtime, blurb, quote, bilingual lead. */

type Member = {
  id: string;            // "01"–"10"
  ff: string;            // "FF · 01" stamp
  slug: string;          // anchor target
  logoSrc: string;
  /** Transcoded H.264 1080p MP4 — embedded in the deep feature spread. */
  videoSrc: string;
  /** Frame grabbed at 5s — used as the <video poster>. */
  posterSrc: string;
  name: string;
  sector: string;
  location: string;
  founded: string;
  runtime: string;
  shortSyn: string;      // for programme list
  bilingualNum: string;  // e.g. "Birinci hikâye"
  bilingualLead: string; // italic word, e.g. "yüzeyler."
  /** Headline split into a head + accent (the accent is italic+red). */
  headHead: string;
  headAccent: string;
  blurb: string;         // for feature spread blurb (with optional <strong>/<em>)
  quote: string;
  specs: ReadonlyArray<{ label: string; value: string }>;
  /** If true, keep the logo's brand colour on the programme thumbnail.
      Otherwise invert to white. */
  keepColor: boolean;
};

const MEMBERS: ReadonlyArray<Member> = [
  {
    id: "01", ff: "FF · 01", slug: "feature-01",
    logoSrc: "/portfolio/ctbdh/members/asd-laminat.png",
    videoSrc: "/portfolio/ctbdh/videos/asd-laminat.mp4",
    posterSrc: "/portfolio/ctbdh/videos/asd-laminat-poster.jpg",
    name: "ASD Laminat",
    sector: "Surfaces · Manufacturing",
    location: "Concord, ON",
    founded: "2014",
    runtime: "2:34",
    shortSyn:
      "A laminate workshop with a workshop's discipline — colour samples chosen by hand, a cutting line you can hear from the parking lot.",
    bilingualNum: "Birinci hikâye",
    bilingualLead: "yüzeyler.",
    headHead: "The colour samples are still",
    headAccent: "chosen by hand.",
    blurb:
      "A laminate workshop with a workshop's discipline. <strong>Started in Bursa</strong>, now shipping sheets across the GTA — colour, texture, edge profile, and a cutting line you can hear from the parking lot.",
    quote: "We don't sell sheets. We sell what the sheet ends up holding up.",
    specs: [
      { label: "Founded",  value: "2014" },
      { label: "Location", value: "Concord, ON" },
      { label: "Sector",   value: "Surfaces" },
      { label: "Runtime",  value: "2:34" },
    ],
    keepColor: false,
  },
  {
    id: "02", ff: "FF · 02", slug: "feature-02",
    logoSrc: "/portfolio/ctbdh/members/atlas-food-beverage.png",
    videoSrc: "/portfolio/ctbdh/videos/atlas-food-beverage.mp4",
    posterSrc: "/portfolio/ctbdh/videos/atlas-food-beverage-poster.jpg",
    name: "Atlas Food & Beverage",
    sector: "Food & Drink · Distribution",
    location: "GTA",
    founded: "2018",
    runtime: "2:48",
    shortSyn:
      "Distribution that opens a kitchen door — Anatolian flavours onto Canadian shelves, the long phone calls home.",
    bilingualNum: "İkinci hikâye",
    bilingualLead: "mutfak kapısı.",
    headHead: "Distribution that opens",
    headAccent: "a kitchen door.",
    blurb:
      "Mehmet Gedik on what it takes to put Anatolian flavours on Canadian shelves — sourcing, customs, the long phone calls home, and the Tuesday route through every Turkish grocer between Etobicoke and Pickering.",
    quote: "If the chef trusts the box, the chef trusts the spice.",
    specs: [
      { label: "Founded",  value: "2018" },
      { label: "Location", value: "GTA" },
      { label: "Sector",   value: "Food · Drink" },
      { label: "Runtime",  value: "2:48" },
    ],
    keepColor: true,
  },
  {
    id: "03", ff: "FF · 03", slug: "feature-03",
    logoSrc: "/portfolio/ctbdh/members/aydin-cpa.png",
    videoSrc: "/portfolio/ctbdh/videos/aydin-cpa.mp4",
    posterSrc: "/portfolio/ctbdh/videos/aydin-cpa-poster.jpg",
    name: "Aydin CPA",
    sector: "Accounting · Professional Services",
    location: "North York, ON",
    founded: "2010",
    runtime: "2:12",
    shortSyn:
      "A bilingual CPA practice that takes founders from first invoice to first audit. Calls in two languages.",
    bilingualNum: "Üçüncü hikâye",
    bilingualLead: "ilk faturadan ilk denetime.",
    headHead: "From first invoice to",
    headAccent: "first audit.",
    blurb:
      "A bilingual CPA practice where calls are taken in two languages and explanations are given in three. We filmed a morning at the firm — HST returns on the wall, the founder's daughter at the front desk, the founder himself on a call to a client in Mersin.",
    quote: "The first audit is a small ceremony. We try to make it feel that way.",
    specs: [
      { label: "Founded",  value: "2010" },
      { label: "Location", value: "North York, ON" },
      { label: "Sector",   value: "Professional Services" },
      { label: "Runtime",  value: "2:12" },
    ],
    keepColor: true,
  },
  {
    id: "04", ff: "FF · 04", slug: "feature-04",
    logoSrc: "/portfolio/ctbdh/members/bookkeeping-bizz.png",
    videoSrc: "/portfolio/ctbdh/videos/bookkeeping-bizz.mp4",
    posterSrc: "/portfolio/ctbdh/videos/bookkeeping-bizz-poster.jpg",
    name: "Bookkeeping Bizz",
    sector: "Bookkeeping · Small Business",
    location: "Toronto, ON",
    founded: "2021",
    runtime: "2:18",
    shortSyn:
      "Cloud-first books for founders who didn't open a business to do their own books.",
    bilingualNum: "Dördüncü hikâye",
    bilingualLead: "defter.",
    headHead: "Books for everyone who",
    headAccent: "didn't open a business",
    blurb:
      "Cloud-first, plain-spoken, monthly. A practice built for founders who want to know their numbers but don't want a spreadsheet relationship — and who'd like a real human on the email when something feels off in March.",
    quote: "A clean ledger is the cheapest sleep aid in the GTA.",
    specs: [
      { label: "Founded",  value: "2021" },
      { label: "Location", value: "Toronto, ON" },
      { label: "Sector",   value: "Bookkeeping" },
      { label: "Runtime",  value: "2:18" },
    ],
    keepColor: true,
  },
  {
    id: "05", ff: "FF · 05", slug: "feature-05",
    logoSrc: "/portfolio/ctbdh/members/grp-rugs.png",
    videoSrc: "/portfolio/ctbdh/videos/grp-rugs.mp4",
    posterSrc: "/portfolio/ctbdh/videos/grp-rugs-poster.jpg",
    name: "GRP Rugs",
    sector: "Home · Retail",
    location: "Concord, ON",
    founded: "2015",
    runtime: "2:42",
    shortSyn:
      "A rug warehouse the size of a city block — Gaziantep before lunch, Toronto after.",
    bilingualNum: "Beşinci hikâye",
    bilingualLead: "halı.",
    headHead: "Gaziantep before lunch,",
    headAccent: "Toronto after.",
    blurb:
      "A rug warehouse the size of a city block, organised by colour, fibre, knots-per-inch and country of origin. The buyer keeps three phone numbers in one rotation: a weaver in Anatolia, a designer in Yorkville, and a builder in Markham.",
    quote: "Every rug is a flat house. We pay attention to its rooms.",
    specs: [
      { label: "Founded",  value: "2015" },
      { label: "Location", value: "Concord, ON" },
      { label: "Sector",   value: "Home · Retail" },
      { label: "Runtime",  value: "2:42" },
    ],
    keepColor: true,
  },
  {
    id: "06", ff: "FF · 06", slug: "feature-06",
    logoSrc: "/portfolio/ctbdh/members/jc-professional.png",
    videoSrc: "/portfolio/ctbdh/videos/jc-professional.mp4",
    posterSrc: "/portfolio/ctbdh/videos/jc-professional-poster.jpg",
    name: "JC Professional Co.",
    sector: "Tax & Advisory · Professional Services",
    location: "Toronto, ON",
    founded: "2008",
    runtime: "2:24",
    shortSyn:
      "A multi-disciplinary practice for founders who are also husbands, wives and immigrants.",
    bilingualNum: "Altıncı hikâye",
    bilingualLead: "uzun konuşma.",
    headHead: "For founders who are also",
    headAccent: "husbands, wives, immigrants.",
    blurb:
      "A multi-disciplinary practice with the rare habit of taking the long conversation before any of the short ones. Tax, audit, advisory, and the gentle work of explaining a Canadian financial system to founders who learned a different one first.",
    quote: "Numbers are a second language for most of our clients. We take care with the translation.",
    specs: [
      { label: "Founded",  value: "2008" },
      { label: "Location", value: "Toronto, ON" },
      { label: "Sector",   value: "Professional Services" },
      { label: "Runtime",  value: "2:24" },
    ],
    keepColor: true,
  },
  {
    id: "07", ff: "FF · 07", slug: "feature-07",
    logoSrc: "/portfolio/ctbdh/members/neo-project-consulting.png",
    videoSrc: "/portfolio/ctbdh/videos/neo-project-consulting.mp4",
    posterSrc: "/portfolio/ctbdh/videos/neo-project-consulting-poster.jpg",
    name: "NEO Project Consulting",
    sector: "Consulting · Construction",
    location: "Mississauga, ON",
    founded: "2017",
    runtime: "2:36",
    shortSyn:
      "Project management for new builds and reno gut-jobs — three trades, one schedule.",
    bilingualNum: "Yedinci hikâye",
    bilingualLead: "şantiye.",
    headHead: "Three trades,",
    headAccent: "one schedule.",
    blurb:
      "Project management for new builds and reno gut-jobs. Site visits between Mississauga and Markham, drawings that translate three trades into one schedule, and a foreman's clipboard that has a Pantone chip taped to the back.",
    quote: "A schedule that the trades respect is the only kind of schedule.",
    specs: [
      { label: "Founded",  value: "2017" },
      { label: "Location", value: "Mississauga, ON" },
      { label: "Sector",   value: "Consulting" },
      { label: "Runtime",  value: "2:36" },
    ],
    keepColor: true,
  },
  {
    id: "08", ff: "FF · 08", slug: "feature-08",
    logoSrc: "/portfolio/ctbdh/members/northern-pathways.png",
    videoSrc: "/portfolio/ctbdh/videos/northern-pathways.mp4",
    posterSrc: "/portfolio/ctbdh/videos/northern-pathways-poster.jpg",
    name: "Northern Pathways Immigration",
    sector: "Immigration · Consulting",
    location: "Toronto, ON",
    founded: "2019",
    runtime: "2:54",
    shortSyn:
      "A regulated immigration practice run by people who arrived themselves.",
    bilingualNum: "Sekizinci hikâye",
    bilingualLead: "geliş.",
    headHead: "Run by people who",
    headAccent: "arrived themselves.",
    blurb:
      "A regulated immigration practice with a particular kind of empathy — the consultants are former applicants. Express Entry, study permits, the slow files, and the small celebrations on the day a PR card lands in the mailbox.",
    quote: "A file is a person. We try to remember that on the days the system forgets.",
    specs: [
      { label: "Founded",  value: "2019" },
      { label: "Location", value: "Toronto, ON" },
      { label: "Sector",   value: "Immigration" },
      { label: "Runtime",  value: "2:54" },
    ],
    keepColor: true,
  },
  {
    id: "09", ff: "FF · 09", slug: "feature-09",
    logoSrc: "/portfolio/ctbdh/members/sapphirus.png",
    videoSrc: "/portfolio/ctbdh/videos/sapphirus.mp4",
    posterSrc: "/portfolio/ctbdh/videos/sapphirus-poster.jpg",
    name: "Sapphirus",
    sector: "Lifestyle · Brand",
    location: "Toronto, ON",
    founded: "2020",
    runtime: "2:08",
    shortSyn: "A small brand with a sharp mark, built between Istanbul and Toronto.",
    bilingualNum: "Dokuzuncu hikâye",
    bilingualLead: "ince çizgi.",
    headHead: "A small brand with",
    headAccent: "a sharp mark.",
    blurb:
      "Built between Istanbul and Toronto with a logo as taut as a drawn bowstring. We filmed the workshop, the model, and the moment the line is finally hung in store — six minutes of dailies edited into a two-minute argument.",
    quote: "A mark earns its line every time you see it on a shelf.",
    specs: [
      { label: "Founded",  value: "2020" },
      { label: "Location", value: "Toronto, ON" },
      { label: "Sector",   value: "Lifestyle" },
      { label: "Runtime",  value: "2:08" },
    ],
    keepColor: false,
  },
  {
    id: "10", ff: "FF · 10", slug: "feature-10",
    logoSrc: "/portfolio/ctbdh/members/urla-fine-foods.png",
    videoSrc: "/portfolio/ctbdh/videos/urla-fine-foods.mp4",
    posterSrc: "/portfolio/ctbdh/videos/urla-fine-foods-poster.jpg",
    name: "Urla Fine Foods",
    sector: "Food · Specialty",
    location: "Etobicoke, ON",
    founded: "2016",
    runtime: "2:46",
    shortSyn:
      "An Aegean larder in the GTA — olive oil, pepper paste, a founder who still calls the village.",
    bilingualNum: "Onuncu hikâye",
    bilingualLead: "Ege'den.",
    headHead: "An Aegean larder",
    headAccent: "in the GTA.",
    blurb:
      "Olive oil, pepper paste, sun-dried tomato, and a founder who still calls the village every Sunday. Filmed in the warehouse that smells, faintly, of summer — and at a kitchen-table tasting that ran twenty minutes longer than it was supposed to.",
    quote: "An olive oil is a place. We're trying to bottle ours honestly.",
    specs: [
      { label: "Founded",  value: "2016" },
      { label: "Location", value: "Etobicoke, ON" },
      { label: "Sector",   value: "Food · Specialty" },
      { label: "Runtime",  value: "2:46" },
    ],
    keepColor: true,
  },
];

const MARK_LOGO = "/portfolio/ctbdh/logo/ctbdh-mark.png";

export function CTBDHPage({ client }: Props) {
  const frameNumber = getFrameNumber(client);

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
        href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400&family=JetBrains+Mono:wght@400;500&display=swap"
      />

      <div className="ct-page">
        {/* TOP RAIL */}
        <header className="ct-top">
          <Link href="/portfolio" className="ct-top-back">
            ← Portfolio
          </Link>
          <span className="ct-top-frame">★ #{frameNumber} ★</span>
          <span className="ct-top-meta">CTBDH · Toronto · {client.year ?? "2025"}</span>
        </header>

        {/* COVER */}
        <section className="ct-cover">
          <div className="ct-cover-pre">
            <span>Volume I</span>
            <span className="red">·</span>
            <span>The Edition</span>
            <span className="red">·</span>
            <span>Spring MMXXV</span>
          </div>

          <div className="ct-cover-mark">
            <Image
              src={MARK_LOGO}
              alt="CTBDH mark"
              width={144}
              height={144}
              priority
              style={{ width: "100%", height: "auto" }}
            />
          </div>

          <h1 className="ct-cover-title">
            An Edition<br />of <em>Ten Stories.</em>
          </h1>
          <p className="ct-cover-turkish">On hikâye, bir programda, bir yıllıkta.</p>

          <dl className="ct-cover-meta">
            <div><dt>Members</dt><dd>{MEMBERS.length}</dd></div>
            <div><dt>Sectors</dt><dd>06</dd></div>
            <div><dt>Films</dt><dd>{MEMBERS.length}</dd></div>
            <div><dt>Year</dt><dd>{client.year ?? "2025"}</dd></div>
          </dl>
        </section>

        {/* FOREWORD */}
        <section className="ct-foreword">
          <div className="head">
            <p className="label">Foreword · Önsöz</p>
            <h2>
              A note from <b>the Hub.</b>
            </h2>
            <p className="turkish">Toronto&apos;dan Konya&apos;ya — bir köprü.</p>
          </div>

          <div className="body">
            <p>
              The Canada Türkiye Business Development Hub was founded on a small
              idea: that a Turkish-Canadian founder in Toronto and a small
              manufacturer in Konya share more than a flag colour. They share a
              line of contacts, a way of doing favours, and an unspoken belief
              that <strong>introductions are infrastructure.</strong>
            </p>
            <p>
              This Edition collects ten stories from our membership — businesses
              we filmed across the GTA over the spring of 2025, with FrameFlow on
              the camera. The <em>Programme</em> below is the at-a-glance index
              — ten screenings, in order. Beneath it, each story unfolds at
              length: a portrait, a quote, a short feature.
            </p>
            <p>
              Read the Programme to find the screening that speaks to you. Read
              the Features for the long version.
            </p>
            <div className="signoff">— <b>CTBDH Editorial</b> · Concord &amp; Toronto · {client.year ?? "2025"}</div>
          </div>
        </section>

        {/* MARK & IDENTITY ------------------------------------ */}
        <section className="ct-identity">
          <header className="ct-identity-head">
            <div className="lead">
              <p className="label">Mark · İşaret · II</p>
              <h2>
                A ligature for <b>a network.</b>
              </h2>
              <p className="turkish">Bir ağ için, tek bir bağ.</p>
            </div>
            <div className="body">
              <p>
                Before the films, the <strong>flag.</strong> The mark we made
                for CTBDH is a lower-case <em>ct</em> ligature: the C&rsquo;s
                arc and the T&rsquo;s stem share a single curve, the way two
                business cards share a coffee table. One letter for{" "}
                <strong>Canada</strong>, one for <strong>Türkiye</strong> —
                and a slash through both, dropping from upper right to lower
                left like a signature underline.
              </p>
              <p>
                It lives in two registers. <em>Red on black</em> is the
                network voice — the umbrella, the masthead, the credit card.{" "}
                <em>Mark alone on paper</em> is the field voice — for member
                businesses to flag affiliation on their own surfaces without
                adopting CTBDH&rsquo;s house styling wholesale.
              </p>
            </div>
          </header>

          <div className="ct-identity-stage">
            <div className="ct-identity-stage-rail">
              <span>
                <span className="red">●</span> &nbsp; Primary lockup · master
              </span>
              <span>
                Black &middot;{" "}
                <span className="dot" /> Red &middot;{" "}
                <span className="dot paper" /> Paper
              </span>
              <span>
                Plate № <span className="red">II.01</span>
              </span>
            </div>
            <Image
              className="ct-identity-stage-lockup"
              src="/portfolio/ctbdh/logo/ctbdh-primary.png"
              alt="CTBDH primary lockup — red ct ligature with white wordmark on black"
              width={960}
              height={960}
            />
            <div className="ct-identity-stage-cap">
              <span>
                <b>Wordmark</b> · Canada &middot; Türkiye &middot; Business
                &middot; Development &middot; Hub
              </span>
              <span>
                Mark <b>red #B91D1D</b> &nbsp;/&nbsp; Surface{" "}
                <b>black #0A0A0A</b>
              </span>
              <span>
                Clearspace <b>= 1× cap-height</b>
              </span>
            </div>
          </div>
          <p className="ct-identity-stage-caption">
            fig. ii — the lockup on its native surface.{" "}
            <b>red on black, always.</b>
          </p>

          <div className="ct-identity-notes">
            <article>
              <p className="n">No. 01 · The ligature</p>
              <h4>Two letters, one curve.</h4>
              <p>
                The C and the T share a single bowl — the C&rsquo;s arc
                continues directly into the T&rsquo;s crossbar without
                breaking. It&rsquo;s the whole brief in one shape: two
                countries, one handshake.
              </p>
            </article>
            <article>
              <p className="n">No. 02 · The slash</p>
              <h4>A line across both.</h4>
              <p>
                A diagonal stroke cuts from the T&rsquo;s shoulder down through
                the bowl of the C — half punctuation, half passport stamp. It
                binds the two letters into a single glyph so the mark reads as
                a unit, not a pair.
              </p>
              <div className="ct-identity-mono">
                <div className="thumb">
                  <Image
                    src="/portfolio/ctbdh/logo/ctbdh-mono.png"
                    alt="CTBDH monochrome variant — cream mark on black, no brand red"
                    width={1080}
                    height={1350}
                    sizes="120px"
                  />
                </div>
                <span className="cap">
                  Mono variant &middot; <b>without brand red.</b>
                  <small>The system survives color removal.</small>
                </span>
              </div>
            </article>
            <article>
              <p className="n">No. 03 · The wordmark</p>
              <h4>Bilingual by default.</h4>
              <p>
                <em>Canada · Türkiye · Business · Development · Hub.</em>{" "}
                Five words, five lines, Inter 500. Türkiye keeps its
                diacritic; the wordmark is never anglicised. The stack falls
                to the right of the mark in the primary lockup.
              </p>
            </article>
          </div>

          <div className="ct-identity-variants">
            <figure>
              <div className="frame dark">
                <Image
                  src="/portfolio/ctbdh/logo/ctbdh-primary.png"
                  alt="CTBDH primary lockup"
                  width={960}
                  height={960}
                />
              </div>
              <figcaption>
                <span className="role">II.a · Primary</span>
                <span className="spec">Black &middot; Red &middot; Paper</span>
              </figcaption>
            </figure>
            <figure>
              <div className="frame paper">
                <Image
                  src="/portfolio/ctbdh/logo/ctbdh-mark.png"
                  alt="CTBDH ct ligature mark"
                  width={960}
                  height={960}
                />
              </div>
              <figcaption>
                <span className="role">II.b · Mark only</span>
                <span className="spec">Paper &middot; Red mark</span>
              </figcaption>
            </figure>
            <figure>
              <div className="frame photo">
                <Image
                  src="/portfolio/ctbdh/brand/in-toronto.png"
                  alt="CTBDH mark + wordmark over Toronto skyline with CN Tower"
                  width={1080}
                  height={1350}
                  sizes="(max-width: 960px) 100vw, 33vw"
                />
              </div>
              <figcaption>
                <span className="role">II.c · In context</span>
                <span className="spec">Toronto &middot; the home city</span>
              </figcaption>
            </figure>
          </div>

          {/* IN APPLICATION ---------------------------------- */}
          <div className="ct-identity-application">
            <header className="ct-identity-application-head">
              <p className="n">Plate № II.04 · In application</p>
              <h3>
                The system, <b>off the page.</b>
              </h3>
            </header>
            <div className="ct-identity-application-row">
              <figure>
                <div className="ct-identity-application-frame">
                  <Image
                    src="/portfolio/ctbdh/brand/stationery.png"
                    alt="CTBDH stationery — cream paper card and gold horizontal lockup"
                    width={1080}
                    height={1350}
                    sizes="(max-width: 960px) 100vw, 50vw"
                  />
                </div>
                <figcaption>
                  <span className="role">II.d · Stationery</span>
                  <span className="spec">
                    Letterhead &middot; cards &middot; gold horizontal lockup
                  </span>
                </figcaption>
              </figure>
              <figure>
                <div className="ct-identity-application-frame">
                  <Image
                    src="/portfolio/ctbdh/brand/wordmark-sheet.png"
                    alt="CTBDH wordmark — typographic specimen sheet with applications"
                    width={1080}
                    height={1350}
                    sizes="(max-width: 960px) 100vw, 50vw"
                  />
                </div>
                <figcaption>
                  <span className="role">II.e · Wordmark sheet</span>
                  <span className="spec">
                    Typographic specimen &middot; print applications
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* PROGRAMME HEAD */}
        <header id="programme" className="ct-prog-head">
          <span className="label">Programme · I</span>
          <h3>
            The screenings, <b>in order.</b>
          </h3>
          <span className="count">
            <b>{MEMBERS.length}</b> films · 16:9 · ~24 min total
          </span>
        </header>

        {/* PROGRAMME — list */}
        <section className="ct-prog">
          {MEMBERS.map((m, i) => (
            <article key={m.id} className="ct-screening">
              <span className="num">{romanLower(i + 1)}.</span>
              <a className={`poster${m.keepColor ? " keep" : ""}`} href={`#${m.slug}`}>
                <span className="tag">{m.ff}</span>
                <Image
                  src={m.logoSrc}
                  alt={m.name}
                  fill
                  sizes="280px"
                  style={{ objectFit: "contain", padding: "12% 14%" }}
                />
                <span className="play" aria-hidden>▶</span>
              </a>
              <div className="meta">
                <h4 className="name">{m.name}</h4>
                <p className="sector">{m.sector} · {m.location.replace(/, ON$/, "")}</p>
                <p className="syn">{m.shortSyn}</p>
              </div>
              <p className="runtime">
                {m.runtime}
                <small>Runtime</small>
              </p>
              <a href={`#${m.slug}`} className="cta">
                Read story <span className="arr">↓</span>
              </a>
            </article>
          ))}
        </section>

        {/* BRIDGE */}
        <section className="ct-bridge">
          <p className="label">— The features —</p>
          <p>
            Below, the <em>long version</em> of each story.
          </p>
          <p className="turkish">Hikâyelerin uzun hâli, sayfa sayfa.</p>
        </section>

        {/* FEATURES — interlude after the 3rd */}
        {MEMBERS.map((m, i) => (
          <Feature key={m.id} member={m} index={i + 1} flip={i % 2 === 1} interludeAfter={i === 2} />
        ))}

        {/* MARKS */}
        <section className="ct-marks">
          <div>
            <h3>Palette · two flags, one colour</h3>
            <div className="palette">
              <PaletteChip cls="black"  role="Mark · 25%"     name="Stage Black" hex="#0A0A0A" />
              <PaletteChip cls="red"    role="Primary · 20%"  name="CTBDH Red"   hex="#B91D1D" />
              <PaletteChip cls="bone"   role="Surface · 50%"  name="Cream"       hex="#F4EEE2" />
              <PaletteChip cls="tonal"  role="Tonal · 5%"     name="Paper"       hex="#EBE2CF" />
            </div>
          </div>
          <div>
            <h3>Typeset · Fraunces + Inter</h3>
            <div className="type-stack">
              <TypeRow label="Display · Fraunces Italic" cls="h" text="Aa Bb · 0123" />
              <TypeRow label="Subhead · Inter 500"       cls="m" text="An edition of ten stories." />
              <TypeRow label="Body · Inter 400"          cls="b" text="A network of Turkish-Canadian small and medium enterprises across the GTA." />
              <TypeRow label="Mono Label"                cls="l" text="Concord · Toronto · MMXXV" />
              <TypeRow label="Türkçe · Italic"           cls="t" text="Komşu komşunun külüne muhtaçtır." />
            </div>
          </div>
        </section>

        {/* SCOPE */}
        <section className="ct-scope">
          <header className="head">
            <span className="label">Scope · kapsam</span>
            <h3>What we made for <b>CTBDH.</b></h3>
            <span className="total">{client.services.length.toString().padStart(2, "0")} services</span>
          </header>
          <ScopeRow num="01" name="Logo & Identity" desc="A red-on-black mark for the network — the lower-case ct ligature where C and T share a single curve, plus a bilingual wordmark and a brand kit for member businesses to flag their CTBDH affiliation." outValue="1" outLabel="identity system" />
          <ScopeRow num="02" name="Videography"     desc="Ten commercial business-story films — one for each member. Filmed on location at workshops, warehouses, offices and shops across the GTA. 16:9 master delivered with 1:1 and 9:16 cut-downs for social." outValue={String(MEMBERS.length)} outLabel="films · 16:9" />
        </section>

        {/* END / COLOPHON */}
        <section className="ct-end">
          <p className="label">— Colophon —</p>
          <h3>
            Add the <b>next</b> <em>chapter.</em>
          </h3>
          <p className="turkish">Sıradaki bölümü <em>siz yazın.</em></p>
          <p>
            Volume II is being assembled. If you run a Turkish-Canadian
            business with a story worth filming — or you&apos;d like to host
            the next print night — write us.
          </p>
          <Link className="ct-cta" href="/contact">
            Submit a story <span className="arr">→</span>
          </Link>
        </section>

        <footer className="ct-foot">
          <span>
            Bound by <strong>FrameFlow</strong> · Toronto · MMXXV
          </span>
          <span className="ce">CTBDH · Edition</span>
          <span className="ri">
            <Link href="/portfolio">All Reels →</Link>
          </span>
        </footer>
      </div>

      <style jsx>{`
        :global(body:has(.ct-page)) {
          background: #f4eee2;
        }
        .ct-page {
          --paper:    #f4eee2;
          --paper-2:  #ebe2cf;
          --paper-d:  #d8c9aa;
          --rule:     #c2b289;
          --ink:      #1a120a;
          --ink-2:    #574a36;
          --ink-3:    #8a7c64;
          --red:      #b91d1d;
          --red-d:    #7a0e0e;
          --black:    #0a0a0a;
          --black-2:  #141414;

          --serif:   "Fraunces", Georgia, serif;
          --sans:    "Inter", system-ui, sans-serif;
          --mono:    "JetBrains Mono", ui-monospace, monospace;

          background: var(--paper);
          color: var(--ink);
          font-family: var(--sans);
          font-weight: 400;
          font-size: 16px;
          line-height: 1.65;
          letter-spacing: -0.005em;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
          position: relative;
        }
        .ct-page :global(a) { color: inherit; text-decoration: none; }
        .ct-page :global(img) { display: block; max-width: 100%; }

        /* paper grain — fine speckle for the whole page */
        .ct-page::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 90;
          opacity: 0.4;
          mix-blend-mode: multiply;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.45  0 0 0 0 0.32  0 0 0 0 0.18  0 0 0 0.45 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E");
        }

        /* TOP RAIL */
        .ct-top {
          position: sticky;
          top: 0;
          z-index: 50;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 32px;
          background: rgba(244, 238, 226, 0.92);
          border-bottom: 1px solid var(--rule);
          backdrop-filter: blur(8px);
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink-2);
          gap: 16px;
          font-weight: 500;
        }
        .ct-top-back { color: var(--ink); white-space: nowrap; }
        .ct-top-back:hover { color: var(--red); }
        .ct-top-frame {
          background: var(--ink);
          color: var(--paper);
          padding: 5px 12px;
          letter-spacing: 0.24em;
          white-space: nowrap;
          font-weight: 500;
        }
        .ct-top-meta { white-space: nowrap; color: var(--red); letter-spacing: 0.32em; }
        @media (max-width: 640px) {
          .ct-top { padding: 12px 16px; gap: 12px; font-size: 9px; }
          .ct-top-meta { display: none; }
        }

        /* COVER */
        .ct-cover {
          padding: 100px 48px 80px;
          max-width: 1280px;
          margin: 0 auto;
          text-align: center;
          border-bottom: 1px solid var(--rule);
        }
        .ct-cover-pre {
          display: flex;
          justify-content: center;
          gap: 32px;
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--ink-2);
          margin-bottom: 56px;
          flex-wrap: wrap;
          font-weight: 500;
        }
        .ct-cover-pre .red { color: var(--red); }
        .ct-cover-mark {
          width: clamp(96px, 12vw, 144px);
          margin: 0 auto 32px;
        }
        .ct-cover-title {
          font-family: var(--serif);
          font-weight: 300;
          font-size: clamp(56px, 9vw, 144px);
          letter-spacing: -0.03em;
          line-height: 0.92;
          color: var(--ink);
          margin-bottom: 18px;
        }
        .ct-cover-title em { font-style: italic; color: var(--red); font-weight: 300; }
        .ct-cover-turkish {
          font-family: var(--serif);
          font-style: italic;
          font-weight: 300;
          font-size: clamp(20px, 2.4vw, 30px);
          color: var(--ink-2);
          max-width: 32ch;
          margin: 0 auto 56px;
          line-height: 1.4;
        }
        .ct-cover-turkish::before, .ct-cover-turkish::after {
          content: "—";
          color: var(--red);
          margin: 0 12px;
        }
        .ct-cover-meta {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          max-width: 880px;
          margin: 0 auto;
          border-top: 1px solid var(--rule);
          border-bottom: 1px solid var(--rule);
        }
        .ct-cover-meta > div {
          padding: 22px 14px;
          border-left: 1px solid var(--rule);
          text-align: center;
        }
        .ct-cover-meta > div:first-child { border-left: 0; }
        .ct-cover-meta dt {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink-3);
          font-weight: 500;
          margin-bottom: 8px;
        }
        .ct-cover-meta dd {
          font-family: var(--serif);
          font-style: italic;
          font-weight: 300;
          font-size: 28px;
          color: var(--ink);
          line-height: 1;
        }

        /* FOREWORD */
        .ct-foreword {
          padding: 120px 48px;
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 80px;
          align-items: start;
          border-bottom: 1px solid var(--rule);
        }
        .ct-foreword .head .label {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--red);
          font-weight: 500;
          margin-bottom: 18px;
        }
        .ct-foreword .head h2 {
          font-family: var(--serif);
          font-style: italic;
          font-weight: 300;
          font-size: clamp(36px, 4.4vw, 64px);
          letter-spacing: -0.025em;
          line-height: 1.05;
          color: var(--ink);
          margin-bottom: 24px;
        }
        .ct-foreword .head h2 b { font-style: normal; font-weight: 400; }
        .ct-foreword .head .turkish {
          font-family: var(--serif);
          font-style: italic;
          font-size: 18px;
          color: var(--red);
          line-height: 1.4;
        }
        .ct-foreword .body p {
          font-family: var(--sans);
          font-weight: 400;
          font-size: 17px;
          line-height: 1.75;
          color: var(--ink-2);
          margin-bottom: 1em;
          max-width: 60ch;
        }
        .ct-foreword .body p strong { color: var(--ink); font-weight: 500; }
        .ct-foreword .body p em { color: var(--red); font-style: italic; font-weight: 500; }
        .ct-foreword .body p:first-child::first-letter {
          float: left;
          font-family: var(--serif);
          font-weight: 400;
          font-size: 5em;
          line-height: 0.85;
          padding: 0.05em 0.12em 0 0;
          color: var(--red);
        }
        .ct-foreword .signoff {
          margin-top: 32px;
          padding-top: 18px;
          border-top: 1px solid var(--rule);
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink-2);
          font-weight: 500;
        }
        .ct-foreword .signoff b { color: var(--ink); font-weight: 500; }

        /* MARK & IDENTITY */
        .ct-identity {
          padding: 120px 48px;
          max-width: 1280px;
          margin: 0 auto;
          border-bottom: 1px solid var(--rule);
        }
        .ct-identity-head {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 80px;
          align-items: end;
          padding-bottom: 72px;
          border-bottom: 1px solid var(--rule);
          margin-bottom: 72px;
        }
        .ct-identity-head .lead .label {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--red);
          font-weight: 500;
          margin-bottom: 18px;
        }
        .ct-identity-head .lead h2 {
          font-family: var(--serif);
          font-style: italic;
          font-weight: 300;
          font-size: clamp(36px, 4.4vw, 64px);
          letter-spacing: -0.025em;
          line-height: 1.05;
          color: var(--ink);
          margin-bottom: 18px;
        }
        .ct-identity-head .lead h2 b { font-style: normal; font-weight: 400; }
        .ct-identity-head .lead .turkish {
          font-family: var(--serif);
          font-style: italic;
          font-weight: 300;
          font-size: 18px;
          color: var(--ink-2);
        }
        .ct-identity-head .body p {
          font-family: var(--sans);
          font-size: 17px;
          line-height: 1.75;
          color: var(--ink-2);
          margin-bottom: 18px;
          max-width: 56ch;
        }
        .ct-identity-head .body p:last-child { margin-bottom: 0; }
        .ct-identity-head .body em { color: var(--red); font-style: italic; }
        .ct-identity-head .body strong { color: var(--ink); font-weight: 600; }

        .ct-identity-stage {
          position: relative;
          background: var(--black);
          color: var(--paper);
          padding: clamp(56px, 7vw, 96px) clamp(40px, 6vw, 96px);
          border: 1px solid var(--black);
          box-shadow:
            0 1px 0 var(--paper-d) inset,
            0 60px 80px -60px rgba(20, 12, 4, 0.45);
          margin-bottom: 18px;
        }
        .ct-identity-stage::before {
          content: "";
          position: absolute;
          inset: 12px;
          border: 1px solid rgba(244, 238, 226, 0.06);
          pointer-events: none;
        }
        .ct-identity-stage-rail {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: rgba(244, 238, 226, 0.55);
          margin-bottom: clamp(40px, 5vw, 64px);
          position: relative;
          z-index: 1;
          flex-wrap: wrap;
          gap: 14px;
        }
        .ct-identity-stage-rail .red { color: var(--red); }
        .ct-identity-stage-rail .dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          background: var(--red);
          border-radius: 50%;
          vertical-align: middle;
          margin: 0 8px 2px;
        }
        .ct-identity-stage-rail .dot.paper { background: var(--paper); }
        .ct-identity-stage :global(.ct-identity-stage-lockup) {
          display: block;
          width: 100%;
          height: auto;
          max-width: 760px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .ct-identity-stage-cap {
          margin-top: clamp(48px, 6vw, 72px);
          padding-top: 32px;
          border-top: 1px solid rgba(244, 238, 226, 0.12);
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: rgba(244, 238, 226, 0.5);
          position: relative;
          z-index: 1;
        }
        .ct-identity-stage-cap b { color: var(--paper); font-weight: 500; }
        .ct-identity-stage-caption {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink-3);
          text-align: center;
          margin-bottom: 72px;
        }
        .ct-identity-stage-caption b { color: var(--red); font-weight: 500; }

        .ct-identity-notes {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border-top: 1px solid var(--rule);
          border-bottom: 1px solid var(--rule);
          margin-bottom: 80px;
        }
        .ct-identity-notes > article {
          padding: 36px 32px;
          border-left: 1px solid var(--rule);
        }
        .ct-identity-notes > article:first-child { border-left: 0; }
        .ct-identity-notes .n {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red);
          font-weight: 500;
          margin-bottom: 14px;
        }
        .ct-identity-notes h4 {
          font-family: var(--serif);
          font-style: italic;
          font-weight: 400;
          font-size: 26px;
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: var(--ink);
          margin-bottom: 14px;
        }
        .ct-identity-notes p {
          font-family: var(--sans);
          font-size: 14.5px;
          line-height: 1.65;
          color: var(--ink-2);
        }
        .ct-identity-notes em { color: var(--red); font-style: italic; }

        .ct-identity-variants {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .ct-identity-variants figure {
          display: flex;
          flex-direction: column;
          margin: 0;
        }
        .ct-identity-variants .frame {
          aspect-ratio: 1 / 1;
          border: 1px solid var(--rule);
          display: grid;
          place-items: center;
          padding: 14%;
          position: relative;
        }
        .ct-identity-variants .frame.dark {
          background: var(--black);
          border-color: var(--black);
        }
        .ct-identity-variants .frame.paper { background: var(--paper-2); }
        .ct-identity-variants .frame.photo {
          padding: 0;
          border-color: var(--rule);
          overflow: hidden;
        }
        .ct-identity-variants .frame :global(img) {
          display: block;
          width: 100%;
          height: auto;
          max-height: 100%;
          object-fit: contain;
        }
        .ct-identity-variants .frame.photo :global(img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .ct-identity-variants figcaption {
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink-3);
          gap: 16px;
        }
        .ct-identity-variants figcaption .role {
          color: var(--red);
          font-weight: 500;
        }
        .ct-identity-variants figcaption .spec { color: var(--ink-2); }

        /* Mono thumbnail inside "The slash" note column */
        .ct-identity-mono {
          margin-top: 22px;
          padding-top: 22px;
          border-top: 1px solid var(--rule);
          display: grid;
          grid-template-columns: 88px 1fr;
          gap: 16px;
          align-items: center;
        }
        .ct-identity-mono .thumb {
          aspect-ratio: 4 / 5;
          background: var(--black);
          border: 1px solid var(--black);
          padding: 12%;
          display: grid;
          place-items: center;
        }
        .ct-identity-mono .thumb :global(img) {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .ct-identity-mono .cap {
          font-family: var(--mono);
          font-size: 9.5px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--ink-3);
          line-height: 1.5;
        }
        .ct-identity-mono .cap b { color: var(--ink); font-weight: 500; }
        .ct-identity-mono .cap small {
          display: block;
          margin-top: 6px;
          font-size: 8.5px;
          color: var(--ink-3);
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }

        /* IN APPLICATION strip */
        .ct-identity-application {
          margin-top: 80px;
          padding-top: 64px;
          border-top: 1px solid var(--rule);
        }
        .ct-identity-application-head {
          display: flex;
          justify-content: space-between;
          align-items: end;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 40px;
        }
        .ct-identity-application-head .n {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--red);
          font-weight: 500;
        }
        .ct-identity-application-head h3 {
          font-family: var(--serif);
          font-style: italic;
          font-weight: 300;
          font-size: clamp(28px, 3.4vw, 44px);
          letter-spacing: -0.025em;
          line-height: 1.1;
          color: var(--ink);
        }
        .ct-identity-application-head h3 b {
          font-style: normal;
          font-weight: 400;
        }
        .ct-identity-application-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .ct-identity-application-row figure {
          margin: 0;
          display: flex;
          flex-direction: column;
        }
        .ct-identity-application-frame {
          aspect-ratio: 4 / 5;
          border: 1px solid var(--rule);
          overflow: hidden;
          background: var(--paper-2);
          position: relative;
        }
        .ct-identity-application-frame :global(img) {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .ct-identity-application-row figcaption {
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink-3);
          gap: 16px;
        }
        .ct-identity-application-row figcaption .role {
          color: var(--red);
          font-weight: 500;
        }
        .ct-identity-application-row figcaption .spec { color: var(--ink-2); }

        @media (max-width: 960px) {
          .ct-identity { padding: 80px 28px; }
          .ct-identity-head {
            grid-template-columns: 1fr;
            gap: 28px;
            padding-bottom: 48px;
            margin-bottom: 48px;
          }
          .ct-identity-notes { grid-template-columns: 1fr; }
          .ct-identity-notes > article {
            border-left: 0;
            border-top: 1px solid var(--rule);
          }
          .ct-identity-notes > article:first-child { border-top: 0; }
          .ct-identity-variants { grid-template-columns: 1fr; gap: 18px; }
          .ct-identity-application { margin-top: 56px; padding-top: 48px; }
          .ct-identity-application-row {
            grid-template-columns: 1fr;
            gap: 18px;
          }
          .ct-identity-mono {
            grid-template-columns: 72px 1fr;
            gap: 14px;
          }
        }

        /* PROGRAMME */
        .ct-prog-head {
          max-width: 1480px;
          margin: 0 auto;
          padding: 100px 48px 28px;
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 32px;
          align-items: end;
          border-bottom: 1px solid var(--rule);
        }
        .ct-prog-head .label {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: var(--red);
          font-weight: 500;
        }
        .ct-prog-head h3 {
          font-family: var(--serif);
          font-style: italic;
          font-weight: 300;
          font-size: clamp(32px, 4.4vw, 64px);
          letter-spacing: -0.03em;
          line-height: 1;
          color: var(--ink);
        }
        .ct-prog-head h3 b { font-style: normal; color: var(--red); font-weight: 400; }
        .ct-prog-head .count {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink-3);
          font-weight: 500;
        }
        .ct-prog-head .count b { color: var(--ink); font-weight: 500; }

        .ct-prog {
          max-width: 1480px;
          margin: 0 auto;
          padding: 0 48px 100px;
        }
        .ct-screening {
          display: grid;
          grid-template-columns: 64px 280px 1fr 180px 140px;
          gap: 32px;
          align-items: center;
          padding: 26px 0;
          border-bottom: 1px solid var(--rule);
          transition: background 0.3s;
        }
        .ct-screening:hover {
          background: linear-gradient(90deg, transparent 0%, rgba(185, 29, 29, 0.05) 50%, transparent 100%);
        }
        .ct-screening .num {
          font-family: var(--serif);
          font-style: italic;
          font-weight: 400;
          font-size: 32px;
          letter-spacing: -0.02em;
          color: var(--red);
          line-height: 1;
        }
        .ct-screening .poster {
          position: relative;
          aspect-ratio: 16 / 9;
          background: linear-gradient(135deg, var(--black-2) 0%, var(--black) 100%);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.4s;
        }
        .ct-screening .poster:hover { transform: translateY(-2px); }
        .ct-screening .poster::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 30%, rgba(185, 29, 29, 0.18), transparent 60%);
          z-index: 1;
        }
        .ct-screening .poster :global(img) {
          z-index: 2;
          filter: brightness(0) invert(1);
          opacity: 0.92;
          transition: transform 0.5s, opacity 0.4s;
        }
        .ct-screening .poster.keep :global(img) { filter: none; }
        .ct-screening .poster:hover :global(img) { transform: scale(1.06); opacity: 1; }
        .ct-screening .poster .tag {
          position: absolute;
          top: 8px;
          left: 8px;
          padding: 3px 8px;
          background: rgba(244, 238, 226, 0.92);
          font-family: var(--mono);
          font-size: 8px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--ink);
          z-index: 3;
          font-weight: 500;
        }
        .ct-screening .poster .play {
          position: absolute;
          bottom: 8px;
          right: 8px;
          width: 28px; height: 28px;
          background: var(--red);
          color: var(--paper);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          z-index: 3;
          transition: transform 0.3s;
        }
        .ct-screening .poster:hover .play { transform: scale(1.1); }

        .ct-screening .meta .name {
          font-family: var(--serif);
          font-style: italic;
          font-weight: 400;
          font-size: clamp(20px, 2vw, 26px);
          letter-spacing: -0.015em;
          color: var(--ink);
          line-height: 1.15;
          margin-bottom: 6px;
        }
        .ct-screening .meta .sector {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--red);
          font-weight: 500;
          margin-bottom: 10px;
        }
        .ct-screening .meta .syn {
          font-family: var(--sans);
          font-weight: 400;
          font-size: 14px;
          line-height: 1.55;
          color: var(--ink-2);
          max-width: 50ch;
        }
        .ct-screening .runtime {
          font-family: var(--serif);
          font-style: italic;
          font-weight: 300;
          font-size: 38px;
          letter-spacing: -0.02em;
          color: var(--ink);
          line-height: 1;
        }
        .ct-screening .runtime small {
          display: block;
          font-family: var(--mono);
          font-weight: 500;
          font-style: normal;
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--ink-3);
          margin-top: 6px;
        }
        .ct-screening .cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          border: 1px solid var(--rule);
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--ink);
          font-weight: 500;
          transition: background 0.3s, border-color 0.3s, color 0.3s;
          justify-self: end;
          cursor: pointer;
        }
        .ct-screening .cta:hover {
          background: var(--red);
          border-color: var(--red);
          color: var(--paper);
        }
        .ct-screening .cta .arr { transition: transform 0.2s; }
        .ct-screening .cta:hover .arr { transform: translateY(2px); }

        /* BRIDGE */
        .ct-bridge {
          padding: 80px 48px;
          max-width: 880px;
          margin: 0 auto;
          text-align: center;
          border-bottom: 1px solid var(--rule);
        }
        .ct-bridge .label {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 18px;
          font-weight: 500;
        }
        .ct-bridge p {
          font-family: var(--serif);
          font-style: italic;
          font-weight: 300;
          font-size: clamp(24px, 3vw, 38px);
          line-height: 1.3;
          color: var(--ink);
          max-width: 30ch;
          margin: 0 auto 14px;
        }
        .ct-bridge p em { color: var(--red); font-weight: 400; }
        .ct-bridge .turkish {
          font-family: var(--serif);
          font-style: italic;
          font-weight: 300;
          font-size: 18px;
          color: var(--ink-2);
          margin: 0 auto;
          max-width: 32ch;
        }

        /* MARKS */
        .ct-marks {
          padding: 100px 48px;
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          border-bottom: 1px solid var(--rule);
        }
        .ct-marks h3 {
          font-family: var(--mono);
          font-weight: 500;
          font-size: 11px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 24px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--rule);
        }
        .palette {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .type-stack { display: flex; flex-direction: column; }

        /* SCOPE */
        .ct-scope {
          padding: 100px 48px;
          max-width: 1280px;
          margin: 0 auto;
          border-bottom: 1px solid var(--rule);
        }
        .ct-scope .head {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 32px;
          align-items: end;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--rule);
        }
        .ct-scope .head .label {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--red);
          font-weight: 500;
        }
        .ct-scope .head h3 {
          font-family: var(--serif);
          font-style: italic;
          font-weight: 300;
          font-size: clamp(28px, 3.4vw, 48px);
          letter-spacing: -0.025em;
          color: var(--ink);
          line-height: 1;
        }
        .ct-scope .head h3 b { font-style: normal; font-weight: 400; }
        .ct-scope .head .total {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--ink-3);
          font-weight: 500;
        }

        /* END */
        .ct-end {
          padding: 140px 48px 100px;
          max-width: 920px;
          margin: 0 auto;
          text-align: center;
        }
        .ct-end .label {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--red);
          font-weight: 500;
          margin-bottom: 22px;
        }
        .ct-end h3 {
          font-family: var(--serif);
          font-style: italic;
          font-weight: 300;
          font-size: clamp(40px, 6vw, 96px);
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: var(--ink);
          margin-bottom: 18px;
        }
        .ct-end h3 b { font-style: normal; font-weight: 400; }
        .ct-end h3 em { font-style: italic; color: var(--red); font-weight: 400; }
        .ct-end .turkish {
          font-family: var(--serif);
          font-style: italic;
          font-weight: 300;
          font-size: clamp(20px, 2.4vw, 28px);
          color: var(--red);
          margin-bottom: 24px;
        }
        .ct-end .turkish em { font-style: italic; color: var(--red); }
        .ct-end p {
          font-family: var(--sans);
          font-weight: 400;
          font-size: 17px;
          line-height: 1.65;
          color: var(--ink-2);
          max-width: 50ch;
          margin: 0 auto 36px;
        }
        .ct-cta {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 26px;
          background: var(--ink);
          color: var(--paper);
          font-family: var(--mono);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          border: 1px solid var(--ink);
          transition: background 0.2s, border-color 0.2s;
        }
        .ct-cta:hover { background: var(--red); border-color: var(--red); }
        .ct-cta .arr { transition: transform 0.2s; }
        .ct-cta:hover .arr { transform: translateX(3px); }

        /* FOOTER */
        .ct-foot {
          padding: 22px 32px;
          border-top: 1px solid var(--rule);
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 16px;
          align-items: center;
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--ink-3);
        }
        .ct-foot .ce { text-align: center; color: var(--red); letter-spacing: 0.5em; font-weight: 500; }
        .ct-foot .ri { text-align: right; }
        .ct-foot strong { color: var(--ink); font-weight: 500; }

        /* RESPONSIVE */
        @media (max-width: 1080px) {
          .ct-screening { grid-template-columns: 50px 220px 1fr; gap: 18px 24px; }
          .ct-screening .runtime, .ct-screening .cta { grid-column: 2 / 4; }
          .ct-screening .cta { justify-self: start; }
          .ct-screening .runtime { display: flex; gap: 12px; align-items: baseline; font-size: 26px; }
          .ct-screening .runtime small { margin-top: 0; }
        }
        @media (max-width: 900px) {
          .ct-cover { padding: 60px 22px 50px; }
          .ct-cover-pre { gap: 14px; font-size: 9px; }
          .ct-cover-meta { grid-template-columns: 1fr 1fr; }
          .ct-cover-meta > div:nth-child(3) { border-left: 0; border-top: 1px solid var(--rule); }
          .ct-cover-meta > div:nth-child(4) { border-top: 1px solid var(--rule); }
          .ct-foreword { padding: 60px 22px; grid-template-columns: 1fr; gap: 32px; }
          .ct-prog-head { padding: 60px 22px 22px; grid-template-columns: 1fr 1fr; gap: 12px; }
          .ct-prog-head .label { grid-column: 1 / -1; }
          .ct-prog { padding: 0 22px 60px; }
          .ct-screening { grid-template-columns: 50px 1fr; padding: 22px 0; gap: 16px; }
          .ct-screening .poster { grid-column: 1 / -1; }
          .ct-screening .meta { grid-column: 2 / 3; }
          .ct-screening .runtime, .ct-screening .cta { grid-column: 1 / -1; }
          .ct-bridge { padding: 60px 22px; }
          .ct-marks { grid-template-columns: 1fr; gap: 48px; padding: 60px 22px; }
          .palette { grid-template-columns: 1fr 1fr; }
          .ct-scope { padding: 60px 22px; }
          .ct-scope .head { grid-template-columns: 1fr 1fr; gap: 12px; }
          .ct-scope .head .label { grid-column: 1 / -1; }
          .ct-end { padding: 80px 22px 60px; }
          .ct-foot { grid-template-columns: 1fr; gap: 6px; text-align: center; }
          .ct-foot .ri, .ct-foot .ce { text-align: center; }
        }
      `}</style>
    </>
  );
}

/* ---------------------- helpers ---------------------- */

const ROMAN_LOWER: Readonly<Record<number, string>> = {
  1: "i",   2: "ii",   3: "iii",  4: "iv",   5: "v",
  6: "vi",  7: "vii",  8: "viii", 9: "ix",  10: "x",
};

function romanLower(n: number): string {
  return ROMAN_LOWER[n] ?? String(n);
}

/* ---------------------- subcomponents ---------------------- */

function Feature({ member, index, flip, interludeAfter }: { member: Member; index: number; flip: boolean; interludeAfter: boolean }) {
  return (
    <>
      <section id={member.slug} className={`ct-feature${flip ? " flip" : ""}`}>
        <div className="poster-block">
          <div className="poster">
            <span className="stamp">{member.ff}</span>
            <video
              className="player"
              src={member.videoSrc}
              poster={member.posterSrc}
              preload="none"
              controls
              controlsList="nodownload"
              playsInline
              aria-label={`${member.name} — ${member.runtime} business-story film`}
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="poster-meta">
            <span className="info">{member.ff} · 16:9 · <b>{member.runtime}</b></span>
            <a href={member.videoSrc} target="_blank" rel="noopener noreferrer" className="watch">
              Open in new tab →
            </a>
          </div>
          <div className="poster-notes">
            <p className="head">Shoot specifications</p>
            <dl>
              <div><dt>Master</dt><dd>16:9 H.264</dd></div>
              <div><dt>Crew</dt><dd>FrameFlow Studio</dd></div>
              <div><dt>Audio</dt><dd>Dialogue + amb.</dd></div>
              <div><dt>Year</dt><dd>2025</dd></div>
            </dl>
          </div>
        </div>

        <div className="text">
          <p className="num">{String(index).padStart(2, "0")}.</p>
          <p className="turkish">
            {member.bilingualNum} — <em>{member.bilingualLead}</em>
          </p>
          <h3>
            {member.headHead} <em>{member.headAccent}</em>
          </h3>
          <p className="sector">
            {member.name} · {member.sector} · {member.location}
          </p>
          <p className="blurb" dangerouslySetInnerHTML={{ __html: member.blurb }} />
          <p className="quote">{member.quote}</p>
          <dl>
            {member.specs.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
          <a href="#programme" className="back-to-prog">↑ Back to programme</a>
        </div>

        <style jsx>{`
          .ct-feature {
            padding: 100px 48px;
            max-width: 1280px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 6fr 5fr;
            gap: 56px;
            align-items: start;
            border-bottom: 1px solid #c2b289;
            scroll-margin-top: 64px;
          }
          .ct-feature.flip > .poster-block { order: 2; }
          .poster-block {
            display: flex;
            flex-direction: column;
            gap: 14px;
            position: sticky;
            top: 80px;
            align-self: start;
          }
          .poster {
            position: relative;
            aspect-ratio: 16 / 9;
            background: #0a0a0a;
            overflow: hidden;
          }
          .poster .player {
            width: 100%;
            height: 100%;
            display: block;
            background: #0a0a0a;
          }
          .poster .stamp {
            position: absolute;
            top: 14px; left: 14px;
            padding: 6px 10px;
            background: #b91d1d;
            color: #f4eee2;
            font-family: "JetBrains Mono", monospace;
            font-size: 10px;
            letter-spacing: 0.28em;
            text-transform: uppercase;
            font-weight: 500;
            z-index: 3;
            pointer-events: none;
          }
          .poster-meta {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            gap: 16px;
            padding: 4px 2px 0;
          }
          .poster-meta .info {
            font-family: "JetBrains Mono", monospace;
            font-size: 10px;
            letter-spacing: 0.32em;
            text-transform: uppercase;
            color: #8a7c64;
            font-weight: 500;
          }
          .poster-meta .info b { color: #1a120a; font-weight: 500; }
          .poster-meta .watch {
            font-family: "JetBrains Mono", monospace;
            font-size: 10px;
            letter-spacing: 0.28em;
            text-transform: uppercase;
            color: #1a120a;
            font-weight: 500;
            padding-bottom: 2px;
            border-bottom: 1px solid #c2b289;
            transition: color 0.2s, border-color 0.2s;
          }
          .poster-meta .watch:hover {
            color: #b91d1d;
            border-color: #b91d1d;
          }
          .poster-notes {
            margin-top: 8px;
            padding-top: 16px;
            border-top: 1px solid #c2b289;
          }
          .poster-notes .head {
            font-family: "JetBrains Mono", monospace;
            font-size: 10px;
            letter-spacing: 0.32em;
            text-transform: uppercase;
            color: #b91d1d;
            font-weight: 500;
            margin-bottom: 14px;
          }
          .poster-notes dl {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0;
          }
          .poster-notes dl > div {
            padding: 10px 0;
            border-bottom: 1px solid #c2b289;
          }
          .poster-notes dl > div:nth-child(odd) { padding-right: 14px; }
          .poster-notes dl > div:nth-child(even) { padding-left: 14px; border-left: 1px solid #c2b289; }
          .poster-notes dt {
            font-family: "JetBrains Mono", monospace;
            font-size: 9px;
            letter-spacing: 0.28em;
            text-transform: uppercase;
            color: #8a7c64;
            font-weight: 500;
            margin-bottom: 4px;
          }
          .poster-notes dd {
            font-family: "Fraunces", Georgia, serif;
            font-style: italic;
            font-weight: 400;
            font-size: 15px;
            color: #1a120a;
          }

          .text { padding-top: 6px; }
          .text .num {
            font-family: "Fraunces", Georgia, serif;
            font-style: italic;
            font-weight: 300;
            font-size: clamp(72px, 10vw, 144px);
            letter-spacing: -0.04em;
            line-height: 0.85;
            color: #b91d1d;
            margin-bottom: 14px;
          }
          .text .turkish {
            font-family: "Fraunces", Georgia, serif;
            font-style: italic;
            font-weight: 300;
            font-size: 16px;
            color: #b91d1d;
            margin-bottom: 8px;
          }
          .text h3 {
            font-family: "Fraunces", Georgia, serif;
            font-weight: 400;
            font-size: clamp(36px, 4.4vw, 56px);
            line-height: 1.05;
            letter-spacing: -0.025em;
            color: #1a120a;
            margin-bottom: 14px;
          }
          .text h3 em { font-style: italic; color: #b91d1d; font-weight: 400; }
          .text .sector {
            font-family: "JetBrains Mono", monospace;
            font-size: 11px;
            letter-spacing: 0.32em;
            text-transform: uppercase;
            color: #8a7c64;
            font-weight: 500;
            padding-bottom: 18px;
            border-bottom: 1px solid #c2b289;
            margin-bottom: 22px;
          }
          .text .blurb {
            font-family: "Inter", sans-serif;
            font-weight: 400;
            font-size: 16px;
            line-height: 1.7;
            color: #574a36;
            max-width: 44ch;
            margin-bottom: 24px;
          }
          .text .blurb :global(strong) { color: #1a120a; font-weight: 500; }
          .text .blurb :global(em) { color: #b91d1d; font-style: italic; font-weight: 500; }
          .text .quote {
            font-family: "Fraunces", Georgia, serif;
            font-style: italic;
            font-weight: 300;
            font-size: 22px;
            line-height: 1.4;
            color: #1a120a;
            max-width: 32ch;
            padding: 18px 0;
            border-top: 1px solid #c2b289;
            border-bottom: 1px solid #c2b289;
            margin: 24px 0;
          }
          .text .quote::before { content: "“ "; color: #b91d1d; }
          .text .quote::after  { content: " ”"; color: #b91d1d; }
          .text dl {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0;
            border-top: 1px solid #c2b289;
          }
          .text dl > div {
            padding: 12px 0;
            border-bottom: 1px solid #c2b289;
          }
          .text dl > div:nth-child(odd) { padding-right: 14px; }
          .text dl > div:nth-child(even) { padding-left: 14px; border-left: 1px solid #c2b289; }
          .text dt {
            font-family: "JetBrains Mono", monospace;
            font-size: 9px;
            letter-spacing: 0.28em;
            text-transform: uppercase;
            color: #8a7c64;
            font-weight: 500;
            margin-bottom: 4px;
          }
          .text dd {
            font-family: "Fraunces", Georgia, serif;
            font-style: italic;
            font-weight: 400;
            font-size: 16px;
            color: #1a120a;
          }
          .text .back-to-prog {
            margin-top: 24px;
            font-family: "JetBrains Mono", monospace;
            font-size: 10px;
            letter-spacing: 0.28em;
            text-transform: uppercase;
            color: #8a7c64;
            font-weight: 500;
            display: inline-block;
            padding-bottom: 2px;
            border-bottom: 1px solid #c2b289;
            transition: color 0.2s, border-color 0.2s;
          }
          .text .back-to-prog:hover { color: #b91d1d; border-color: #b91d1d; }

          @media (max-width: 900px) {
            .ct-feature { padding: 60px 22px; grid-template-columns: 1fr; gap: 36px; }
            .ct-feature.flip > .poster-block { order: 0; }
            .poster-block { position: static; }
            .poster-notes dl { grid-template-columns: 1fr; }
            .poster-notes dl > div:nth-child(even) { padding-left: 0; border-left: 0; }
            .poster-notes dl > div:nth-child(odd) { padding-right: 0; }
            .text dl { grid-template-columns: 1fr; }
            .text dl > div:nth-child(even) { padding-left: 0; border-left: 0; }
            .text dl > div:nth-child(odd) { padding-right: 0; }
          }
        `}</style>
      </section>

      {interludeAfter && (
        <section className="ct-interlude">
          <p className="label">— A proverb —</p>
          <p className="line">Komşu komşunun <em>külüne muhtaçtır.</em></p>
          <p className="trans">A neighbour needs even the ashes of his neighbour.</p>
          <p className="src">Anatolian saying · still useful</p>
          <style jsx>{`
            .ct-interlude {
              padding: 80px 48px;
              max-width: 880px;
              margin: 0 auto;
              text-align: center;
              border-bottom: 1px solid #c2b289;
            }
            .label {
              font-family: "JetBrains Mono", monospace;
              font-size: 10px;
              letter-spacing: 0.5em;
              text-transform: uppercase;
              color: #b91d1d;
              margin-bottom: 18px;
              font-weight: 500;
            }
            .line {
              font-family: "Fraunces", Georgia, serif;
              font-style: italic;
              font-weight: 300;
              font-size: clamp(24px, 3.2vw, 40px);
              line-height: 1.3;
              color: #1a120a;
              margin-bottom: 14px;
            }
            .line em { color: #b91d1d; font-weight: 400; font-style: italic; }
            .trans {
              font-family: "Fraunces", Georgia, serif;
              font-style: italic;
              font-size: 16px;
              color: #574a36;
              margin-bottom: 14px;
            }
            .src {
              font-family: "JetBrains Mono", monospace;
              font-size: 11px;
              letter-spacing: 0.32em;
              text-transform: uppercase;
              color: #8a7c64;
              font-weight: 500;
            }
            @media (max-width: 900px) { .ct-interlude { padding: 60px 22px; } }
          `}</style>
        </section>
      )}
    </>
  );
}

type ChipCls = "black" | "red" | "bone" | "tonal";

function PaletteChip({ cls, role, name, hex }: { cls: ChipCls; role: string; name: string; hex: string }) {
  return (
    <div className={`pchip ${cls}`}>
      <span className="role">{role}</span>
      <div>
        <p className="name">{name}</p>
        <p className="hex">{hex}</p>
      </div>
      <style jsx>{`
        .pchip {
          aspect-ratio: 4 / 3;
          padding: 18px;
          border: 1px solid #c2b289;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .pchip.black { background: #0a0a0a; color: #f4eee2; }
        .pchip.red { background: #b91d1d; color: #f4eee2; }
        .pchip.bone { background: #f4eee2; color: #1a120a; }
        .pchip.tonal { background: #ebe2cf; color: #1a120a; border-color: #c2b289; }
        .role {
          font-family: "JetBrains Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          opacity: 0.7;
        }
        .name {
          font-family: "Fraunces", Georgia, serif;
          font-style: italic;
          font-weight: 400;
          font-size: 22px;
          margin: 0;
        }
        .hex {
          font-family: "JetBrains Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.18em;
          opacity: 0.85;
          margin: 4px 0 0;
        }
      `}</style>
    </div>
  );
}

type TypeCls = "h" | "m" | "b" | "l" | "t";

function TypeRow({ label, cls, text }: { label: string; cls: TypeCls; text: string }) {
  return (
    <div className="trow">
      <p className="label">{label}</p>
      <p className={`specimen ${cls}`}>{text}</p>
      <style jsx>{`
        .trow {
          padding: 16px 0;
          border-top: 1px solid #c2b289;
        }
        .trow:first-child { border-top: 0; padding-top: 0; }
        .trow:last-child { border-bottom: 1px solid #c2b289; }
        .label {
          font-family: "JetBrains Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #8a7c64;
          font-weight: 500;
          margin-bottom: 6px;
        }
        .specimen { margin: 0; }
        .specimen.h {
          font-family: "Fraunces", Georgia, serif;
          font-style: italic;
          font-weight: 400;
          font-size: 38px;
          letter-spacing: -0.025em;
          color: #1a120a;
          line-height: 1;
        }
        .specimen.m {
          font-family: "Inter", sans-serif;
          font-weight: 500;
          font-size: 22px;
          color: #1a120a;
        }
        .specimen.b {
          font-family: "Inter", sans-serif;
          font-weight: 400;
          font-size: 16px;
          line-height: 1.6;
          color: #1a120a;
        }
        .specimen.l {
          font-family: "JetBrains Mono", monospace;
          font-weight: 500;
          font-size: 12px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #1a120a;
        }
        .specimen.t {
          font-family: "Fraunces", Georgia, serif;
          font-style: italic;
          font-weight: 400;
          font-size: 22px;
          color: #b91d1d;
        }
      `}</style>
    </div>
  );
}

function ScopeRow({ num, name, desc, outValue, outLabel }: {
  num: string; name: string; desc: string; outValue: string; outLabel: string;
}) {
  return (
    <div className="srow">
      <span className="num">{num}.</span>
      <span className="name">{name}</span>
      <p className="desc">{desc}</p>
      <p className="out"><b>{outValue}</b>{outLabel}</p>
      <style jsx>{`
        .srow {
          display: grid;
          grid-template-columns: 60px 1fr 2fr 1fr;
          gap: 32px;
          padding: 28px 0;
          border-bottom: 1px solid #c2b289;
          align-items: baseline;
        }
        .num {
          font-family: "JetBrains Mono", monospace;
          font-size: 11px;
          letter-spacing: 0.32em;
          color: #b91d1d;
          font-weight: 500;
        }
        .name {
          font-family: "Fraunces", Georgia, serif;
          font-style: italic;
          font-weight: 400;
          font-size: 26px;
          color: #1a120a;
        }
        .desc {
          font-family: "Inter", sans-serif;
          font-weight: 400;
          font-size: 14px;
          line-height: 1.6;
          color: #574a36;
          max-width: 56ch;
          margin: 0;
        }
        .out {
          font-family: "JetBrains Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #8a7c64;
          text-align: right;
          font-weight: 500;
          margin: 0;
        }
        .out b {
          display: block;
          font-family: "Fraunces", Georgia, serif;
          font-style: italic;
          font-weight: 400;
          font-size: 20px;
          letter-spacing: -0.005em;
          text-transform: none;
          color: #1a120a;
          margin-bottom: 4px;
        }
        @media (max-width: 900px) {
          .srow { grid-template-columns: 1fr; gap: 8px; padding: 22px 0; }
          .out { text-align: left; }
        }
      `}</style>
    </div>
  );
}
