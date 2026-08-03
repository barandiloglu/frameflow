"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { getFrameNumber } from "@/data/clients";
import type { Client } from "@/data/clients";
import { LoadingTransition } from "@/components/portfolio/LoadingTransition";

type Props = { client: Client };

const REGISTERS = [
  { key: "navy", chip: "THE DEFAULT", title: "Midnight navy",
    body: "Brand, listings, announcements, market commentary. Bronze rule, Cinzel headline, generous margins. Most of the feed lives here." },
  { key: "warm", chip: "WHEN IT HAS TO BE READ", title: "Warm limestone",
    body: "Numbers, tables, step-by-step. Terracotta on the one figure that matters in each frame. Used in the explainers, and in the feed wherever a post is meant to be read rather than admired." },
] as const;

const REELS = [
  { id: "R.01", src: "/portfolio/beril-sedat-homes/reels/01-crimson-millway.mp4", cap: "Walkthrough · Bayview & York Mills",
    note: "Beril walking a $1,190,000 listing, price burned in from the first second.",
    alt: "Beril walking up to a Bayview and York Mills house, asking price on screen" },
  { id: "R.02", src: "/portfolio/beril-sedat-homes/reels/02-19-schell.mp4", cap: "Walkthrough · 19 Schell Ave · EN",
    note: "Sedat, in English, on what an $85,000 down payment actually buys.",
    alt: "Sedat outside 19 Schell Avenue with the down payment figure on screen" },
  { id: "R.03", src: "/portfolio/beril-sedat-homes/reels/03-nisan-guncelleme.mp4", cap: "April market update · TR",
    note: "The monthly read. Beril to camera, TRREB numbers, no voiceover hiding who is talking.",
    alt: "Beril to camera presenting the April market update in Turkish" },
  { id: "R.04", src: "/portfolio/beril-sedat-homes/reels/04-mart-guncelleme.mp4", cap: "March market update · TR",
    note: "Same slot, previous month — the series is the point, not any one episode.",
    alt: "Beril to camera presenting the March market update in Turkish" },
  { id: "R.05", src: "/portfolio/beril-sedat-homes/reels/05-hst.mp4", cap: "Policy · is HST going? · TR",
    note: "Sedat on the 13% that lands on new construction, and who actually pays it.",
    alt: "Sedat to camera explaining HST on new-build homes in Turkish" },
  { id: "R.06", src: "/portfolio/beril-sedat-homes/reels/06-merkez-bankasi.mp4", cap: "Bank of Canada decision · TR",
    note: "Filmed the day before the announcement — the reason this series runs on a schedule.",
    alt: "Sedat outdoors discussing the Bank of Canada rate decision in Turkish" },
  { id: "R.07", src: "/portfolio/beril-sedat-homes/reels/07-pov-200k.mp4", cap: "POV · the gifted deposit · EN",
    note: "Ten seconds. The short end of the range, and the one that travels furthest.",
    alt: "Sedat on the phone, caption about a buyer receiving a gifted down payment" },
  { id: "R.08", src: "/portfolio/beril-sedat-homes/reels/08-offer-counter.mp4", cap: "Offer and counter · EN",
    note: "Beril in the car, playing both sides. The gap closes from $75,000 to $15,000 and the deal still dies.",
    alt: "Beril in a car acting out an offer and counter-offer exchange" },
  { id: "R.09", src: "/portfolio/beril-sedat-homes/reels/09-day-after-closing.mp4", cap: "The day after closing",
    note: "No pitch, no numbers, no one on camera. The only piece in the series like it.",
    alt: "A pool at a home the day after closing, with an on-screen caption" },
] as const;

const FEED = [
  { id: "F.01", src: "/portfolio/beril-sedat-homes/feed/carousel-1-hook.jpg", cap: "Market carousel · 01 — the hook",
    alt: "Navy carousel opener reading The Shocking Truth About Toronto Real Estate Today" },
  { id: "F.02", src: "/portfolio/beril-sedat-homes/feed/carousel-2-source.jpg", cap: "Market carousel · 02 — the source",
    alt: "Carousel slide crediting Tom Ferry's Toronto event, with a photo of Beril and Sedat" },
  { id: "F.03", src: "/portfolio/beril-sedat-homes/feed/carousel-3-2022.jpg", cap: "Market carousel · 03 — 2022",
    alt: "Hourglass infographic showing how Toronto sales volume split across agents in 2022" },
  { id: "F.04", src: "/portfolio/beril-sedat-homes/feed/carousel-4-2025.jpg", cap: "Market carousel · 04 — 2025",
    alt: "The same hourglass infographic for 2025, with the top ten per cent taking ninety per cent" },
  { id: "F.05", src: "/portfolio/beril-sedat-homes/feed/carousel-5-wakeup.jpg", cap: "Market carousel · 05 — the wake-up call",
    alt: "Bar chart showing ninety per cent of licensed Toronto agents closed four deals or fewer" },
  { id: "F.06", src: "/portfolio/beril-sedat-homes/feed/carousel-6-shift.jpg", cap: "Market carousel · 06 — the shift",
    alt: "TRREB table comparing 2022 and 2025 rental and sale transactions" },
  { id: "F.07", src: "/portfolio/beril-sedat-homes/feed/carousel-7-question.jpg", cap: "Market carousel · 07 — the question",
    alt: "Closing carousel slide asking whether your agent is truly active, signed Beril and Sedat" },
  { id: "F.08", src: "/portfolio/beril-sedat-homes/feed/pinned-buyers.jpg", cap: "Pinned · For Buyers",
    alt: "Navy pinned post reading Finding the right home starts with the right guidance" },
  { id: "F.09", src: "/portfolio/beril-sedat-homes/feed/pinned-sellers.jpg", cap: "Pinned · For Sellers",
    alt: "Warm limestone pinned post reading Every home has a story, we're here to tell it" },
  { id: "F.10", src: "/portfolio/beril-sedat-homes/feed/just-sold-a.jpg", cap: "Just sold · 25 Broadway Ave",
    alt: "Just Sold announcement for 25 Broadway Avenue over a photo of the tower" },
  { id: "F.11", src: "/portfolio/beril-sedat-homes/feed/just-sold-b.jpg", cap: "Just sold · 25 Broadway Ave · detail",
    alt: "Specification card for 25 Broadway Avenue listing two bedrooms and two bathrooms" },
  { id: "F.12", src: "/portfolio/beril-sedat-homes/feed/seminar.jpg", cap: "Seminar · career management in the age of AI",
    alt: "Seminar announcement for a career management talk, co-branded with EduPathways" },
] as const;

const EXPLAINERS = [
  { id: "X.01", src: "/portfolio/beril-sedat-homes/explainers/01-programs-missed.mp4", cap: "Programs most buyers miss",
    alt: "Warm limestone explainer listing the FHSA, RRSP Home Buyers' Plan and Land Transfer Tax rebate" },
  { id: "X.02", src: "/portfolio/beril-sedat-homes/explainers/02-roi-table.mp4", cap: "What actually adds value · EN",
    alt: "Explainer ranking ten home upgrades by return on investment" },
  { id: "X.03", src: "/portfolio/beril-sedat-homes/explainers/03-expiry-date.mp4", cap: "Your property has an expiry date · EN",
    alt: "Explainer listing the service life of roofs, windows, water heaters and other components" },
  { id: "X.04", src: "/portfolio/beril-sedat-homes/explainers/04-only-a-realtor.mp4", cap: "Only a realtor · EN",
    alt: "Text explainer contrasting a realtor with a doctor, a lawyer and a mechanic" },
] as const;

/* 32 real office-feed listings, pulled once from the Birdi API and frozen here.
   The page never calls that API: no key ships, no request is billed to the client.
   Marker positions are Web-Mercator projections onto the stitched CARTO basemap. */
const MAP_PINS = [
  { x: 44.795, y: 39.362, big: false },
  { x: 53.447, y: 59.31, big: false },
  { x: 57.939, y: 55.573, big: false },
  { x: 44.424, y: 33.919, big: false },
  { x: 50.352, y: 47.982, big: false },
  { x: 53.652, y: 57.995, big: false },
  { x: 59.678, y: 53.893, big: false },
  { x: 56.68, y: 36.419, big: true },
  { x: 58.398, y: 30.0, big: false },
  { x: 47.988, y: 47.721, big: false },
  { x: 76.602, y: 33.802, big: true },
  { x: 45.723, y: 50.13, big: false },
  { x: 55.42, y: 54.818, big: false },
  { x: 76.338, y: 32.5, big: true },
  { x: 45.459, y: 30.716, big: false },
  { x: 54.971, y: 42.266, big: false },
  { x: 57.773, y: 46.654, big: true },
  { x: 53.936, y: 50.312, big: false },
  { x: 36.279, y: 66.055, big: true },
  { x: 68.584, y: 41.81, big: false },
  { x: 38.242, y: 62.773, big: false },
  { x: 30.537, y: 58.958, big: false },
  { x: 74.893, y: 32.799, big: false },
  { x: 56.602, y: 56.719, big: false },
  { x: 22.695, y: 43.815, big: false },
  { x: 60.371, y: 52.578, big: false },
  { x: 35.898, y: 24.896, big: false },
  { x: 48.301, y: 60.508, big: false },
  { x: 54.404, y: 40.143, big: false },
  { x: 32.5, y: 90.117, big: false },
  { x: 54.434, y: 44.388, big: false },
  { x: 59.248, y: 46.875, big: false },
] as const;

/* The zoom step: the densest cluster of the same feed, re-projected at z13. */
const ZOOM_PINS = [
  { id: "C13617544", addr: "711-215 Fort York Boulevard", price: "$445,000", short: "$445K",
    bd: 1, ba: 1, x: 27.572, y: 80.854 },
  { id: "E13613062", addr: "406-1190 Dundas Street", price: "$450,000", short: "$450K",
    bd: 1, ba: 1, x: 63.503, y: 58.403 },
  { id: "C13615832", addr: "427-543 Richmond Street", price: "$499,000", short: "$499K",
    bd: 2, ba: 2, x: 29.254, y: 72.954 },
  { id: "C13607570", addr: "317-38 Hollywood Avenue", price: "$499,800", short: "$499K",
    bd: 2, ba: 1, x: 77.437, y: 48.386 },
  { id: "C13615864", addr: "PH7-28 Linden Street", price: "$595,000", short: "$595K",
    bd: 2, ba: 1, x: 43.386, y: 53.893 },
  { id: "C13607962", addr: "902-2181 Yonge Street", price: "$889,900", short: "$889K",
    bd: 2, ba: 2, x: 31.508, y: 26.89 },
  { id: "C13615930", addr: "53 St Paul Street", price: "$1,150,000", short: "$1.15M",
    bd: 3, ba: 2, x: 52.777, y: 65.328 },
] as const;

const MAP_CARDS = [
  { id: "C13615018", addr: "220-4005 Don Mills Road", hood: "Toronto", price: "$499,900",
    bd: 3, ba: 3, sqft: "1,200–1,399", type: "Condo Apartment",
    x: 56.68, y: 36.419 },
  { id: "E13624552", addr: "1212-1480 Bayly Street", hood: "Pickering", price: "$548,800",
    bd: 3, ba: 2, sqft: "900–999", type: "Condo Apartment",
    x: 76.602, y: 33.802 },
  { id: "E13624968", addr: "1109-1890 Valley Farm Road", hood: "Pickering", price: "$629,000",
    bd: 3, ba: 2, sqft: "1,000–1,199", type: "Condo Apartment",
    x: 76.338, y: 32.5 },
  { id: "C13611616", addr: "626-20 O'Neill Road", hood: "Toronto", price: "$699,000",
    bd: 3, ba: 2, sqft: "800–899", type: "Condo Apartment",
    x: 57.773, y: 46.654 },
  { id: "W13611612", addr: "PH4-4011 Brickstone Mews", hood: "Mississauga", price: "$899,000",
    bd: 4, ba: 3, sqft: "1,400–1,599", type: "Condo Apartment",
    x: 36.279, y: 66.055 },
] as const;

/* The two pinned posts were exported at 1280x1600; the other ten feed stills are
   1080x1350. Same 4:5 ratio, but the intrinsic sizes should still be accurate. */
const FEED_1280 = new Set(["F.08", "F.09"]);

const SHOTS = [
  { tab: "Home", path: "en", url: "/", note: "Full-bleed property hero, the pair shown at the same size as the house, and the proof band — transactions, ranking, families served — before a single listing." },
  { tab: "Listings", path: "en/listings", url: "/listings", note: "The filterable roster — neighbourhood, property type, price, bedrooms and status, with sorting over the top. Running here against a frozen snapshot of the office feed rather than the live API, so the counts are fixed rather than current." },
  { tab: "Neighbourhoods", path: "en/neighbourhoods", url: "/neighbourhoods", note: "The micro-market pages — Oakville, Humber Bay, North York, the Distillery. This is where a boutique brokerage out-argues a portal." },
  { tab: "Advice", path: "en/advice", url: "/advice", note: "The written counterpart to the explainer reels. Same subjects, longer form, indexable." },
  { tab: "About", path: "en/about", url: "/about", note: "Two people, named, photographed, credentials stated. The whole pitch is that you know who is handling the file." },
  { tab: "Contact", path: "en/contact", url: "/contact", note: "One consultation request, no lead-magnet clutter." },
  { tab: "Türkçe", path: "tr", url: "/tr", note: "The Turkish site — not a translation layer bolted on, a parallel build with its own copy." },
] as const;

const SCOPE = [
  { no: "01", title: "Social Media", meta: "INSTAGRAM · EN + TR",
    body: "A navy editorial feed on a fixed grammar — Cinzel headline, bronze rule, restraint over volume. Carousels for anything that needs a build, singles for news. Bilingual announcements run as one post with two clean language blocks, never sentence-level mixing." },
  { no: "02", title: "Videography", meta: "ON CAMERA + BUILT GRAPHICS · 9:16",
    body: "Two strands. On camera: property walkthroughs with the price burned in, monthly market updates, and policy explainers — mostly Turkish, both principals visible, captions on. Underneath: a built graphics system that animates the parts of a purchase people avoid reading — carrying cost, closing costs, first-time buyer programmes — one number at a time." },
  { no: "03", title: "Website Design", meta: "BERILSEDATHOMES.CA · LIVE · EN + TR",
    body: "A full bilingual site: home, listings, neighbourhoods, advice, about, contact, blog, and a parallel Turkish build. Cinzel and Montserrat throughout, RECO-compliant, with the micro-market pages doing the SEO work a boutique brokerage actually needs." },
  { no: "04", title: "Ad Management", meta: "META · TR + EN · LISTING AND BRAND",
    body: "Paid support behind the listings and the seminar programme, reported on a fixed cadence against the plan rather than on whatever the dashboard highlighted that week." },
] as const;

/* The embed is a real static export of the client's site, served same-origin so the
   guards below can reach its document. Navigation and form submission are made inert;
   the site's own interactive UI (tabs, menu toggles) is deliberately left working. */
function applySiteGuards(e: React.SyntheticEvent<HTMLIFrameElement>) {
  const doc = e.currentTarget.contentDocument;
  if (!doc) return;
  const block = (ev: Event) => {
    const el = ev.target as HTMLElement | null;
    if (el?.closest("a[href], button[type='submit'], [role='link']")) {
      ev.preventDefault();
      ev.stopPropagation();
    }
  };
  doc.addEventListener("click", block, true);
  doc.addEventListener("auxclick", block, true);
  doc.addEventListener("submit", (ev) => ev.preventDefault(), true);
  for (const a of Array.from(doc.querySelectorAll("a[href]"))) {
    a.removeAttribute("target");
    a.setAttribute("aria-disabled", "true");
  }
}

export function BerilSedatHomesPage({ client }: Props) {
  const frame = getFrameNumber(client); // "020"

  const [lightbox, setLightbox] = useState<{ set: "reels" | "feed" | "explainers"; i: number } | null>(null);
  const closeBox = useCallback(() => setLightbox(null), []);
  const stepBox = useCallback((delta: number) => {
    setLightbox((o) => {
      if (!o) return o;
      const len = o.set === "reels" ? REELS.length : o.set === "explainers" ? EXPLAINERS.length : FEED.length;
      return { set: o.set, i: (o.i + delta + len) % len };
    });
  }, []);

  const [siteTab, setSiteTab] = useState(0);

  /* Map-search demo: 0 = empty, 1 = all pins dropped, 2 = filtered to the rail.
     Driven only while the section is on screen, and skipped entirely under
     reduced motion, which jumps straight to the settled state. */
  const [mapStep, setMapStep] = useState(0);
  const [mapActive, setMapActive] = useState<number | null>(null);
  const [zoomActive, setZoomActive] = useState<number | null>(null);
  const mapRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = mapRef.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timers: number[] = [];
    const clear = () => {
      timers.forEach(clearTimeout);
      timers = [];
    };
    const run = () => {
      clear();
      const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
      setMapStep(0);
      setMapActive(null);
      setZoomActive(null);
      at(400, () => setMapStep(1));
      at(2600, () => setMapStep(2));
      at(4100, () => setMapActive(0));
      at(5600, () => setMapActive(2));
      at(7200, () => { setMapStep(3); setMapActive(null); });
      at(9000, () => setZoomActive(2));
      at(10600, () => setZoomActive(5));
      at(12600, run);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          clear();
          return;
        }
        // Reduced motion: settle on the filtered state, never animate.
        if (reduce) {
          setMapStep(3);
          setMapActive(null);
          setZoomActive(2);
          return;
        }
        run();
      },
      { threshold: 0.25 },
    );
    io.observe(node);
    return () => {
      io.disconnect();
      clear();
    };
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeBox();
      else if (e.key === "ArrowLeft") stepBox(-1);
      else if (e.key === "ArrowRight") stepBox(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeBox, stepBox]);

  return (
    <div className="bs-page">
      <LoadingTransition
        frameNumber={frame}
        clientName={client.name}
        scope={["Social", "Video", "Web", "Ads"]}
        location="Toronto, ON"
        year={client.year}
      />

      <header className="bs-rail">
        <Link className="bs-back" href="/portfolio">← Portfolio</Link>
        <span className="bs-rail-mid">Beril &amp; Sedat Homes</span>
        <span className="bs-rail-end">Toronto, ON · {frame}</span>
      </header>

      <section className="bs-hero">
        <div className="bs-hero-inner">
          <img className="bs-hero-logo" src="/portfolio/beril-sedat-homes/brand/logo-knockout.png" alt="Beril &amp; Sedat Homes" />
          <p className="bs-eyebrow">Boutique brokerage · GTA · Social · Video · Web · Ads</p>
          <h1 className="bs-h1">They stopped selling<br />under a group name.<br /><em>We built the one<br />with theirs on it.</em></h1>
          <p className="bs-deck">TopcuDalan Homes retired in the first quarter of 2026 and became <b>Beril &amp; Sedat Homes</b> — two people, named, in a market of 69,000 agents. Quiet luxury is easy to say and hard to hold, so we held it everywhere at once: <b>a bilingual site</b>, <b>a navy editorial feed</b>, <b>a reel series with both of them on camera</b>, and the paid support underneath.</p>
          <dl className="bs-facts">
            <div><dt>Register</dt><dd>Quiet luxury — never salesy</dd></div>
            <div><dt>Languages</dt><dd>English &amp; Turkish, in parallel</dd></div>
            <div><dt>Type</dt><dd>Cinzel · Montserrat</dd></div>
          </dl>
        </div>
      </section>

      <section className="bs-registers">
        <h2 className="bs-sec-head"><i></i><span>TWO REGISTERS</span><i></i></h2>
        <p className="bs-lede">The brand runs on midnight navy. The teaching content does not — and that is deliberate. A rate table on a dark ground is a wall of small pale digits in a feed; the same table on warm limestone reads at arm&rsquo;s length. So the identity holds the navy and anything built to be read moves to a warm variant, with the same serif, the same rules and the same signature closing every piece. One brand, two jobs.</p>
        <div className="bs-reg-grid">
          {REGISTERS.map((r) => (
            <article className={`bs-reg bs-reg--${r.key}`} key={r.key}>
              <span className="bs-reg-chip">{r.chip}</span>
              <h3>{r.title}</h3>
              <p>{r.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bs-reels">
        <h2 className="bs-sec-head light"><i></i><span>THE REELS</span><i></i></h2>
        <p className="bs-sub">On camera · 9:16 · walkthroughs, monthly updates, policy explainers</p>
        <p className="bs-lede">The strongest thing this brokerage has is that there are two of them and you can see both. So the reels put them on camera and keep them there — Beril walking a Bayview listing, Sedat on what a rate decision does to a closing. Prices burned in, captions burned in, mostly Turkish, no voiceover hiding who is talking.</p>
        <div className="bs-grid bs-grid--916">
          {REELS.map((r, i) => (
            <button type="button" className="bs-cell bs-cell--onDark" key={r.id} onClick={() => setLightbox({ set: "reels", i })}>
              <span className="bs-play">▶</span>
              <img className="bs-cell-img" src={`${r.src.replace(/\.mp4$/, "")}-poster.jpg`} alt={r.alt} width={540} height={960} loading="lazy" />
              <span className="bs-cell-cap">{r.cap}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="bs-feed">
        <h2 className="bs-sec-head"><i></i><span>THE FEED</span><i></i></h2>
        <p className="bs-sub bs-sub--dark">Instagram · 4:5</p>
        <div className="bs-grid bs-grid--45">
          {FEED.map((f, i) => (
            <button type="button" className="bs-cell bs-cell--onLight" key={f.id} onClick={() => setLightbox({ set: "feed", i })}>
              <img className="bs-cell-img" src={f.src} alt={f.alt} width={FEED_1280.has(f.id) ? 1280 : 1080} height={FEED_1280.has(f.id) ? 1600 : 1350} loading="lazy" />
              <span className="bs-cell-cap">{f.cap}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="bs-motion">
        <h2 className="bs-sec-head"><i></i><span>THE EXPLAINERS</span><i></i></h2>
        <p className="bs-sub bs-sub--dark">Vertical motion · 9:16</p>
        <p className="bs-lede">This is the layer that sits under the talking. The strongest of them are cut against a built graphics pass — the number lands, the label arrives, the table fills a row at a time — so the voice never has to describe what the screen could just show. The rest are lighter: a caption, a list, one idea held on screen long enough to land.</p>
        <div className="bs-grid bs-grid--916">
          {EXPLAINERS.map((x, i) => (
            <button type="button" className="bs-cell bs-cell--onLight" key={x.id} onClick={() => setLightbox({ set: "explainers", i })}>
              <span className="bs-play">▶</span>
              <img className="bs-cell-img" src={`${x.src.replace(/\.mp4$/, "")}-poster.jpg`} alt={x.alt} width={540} height={960} loading="lazy" />
              <span className="bs-cell-cap">{x.cap}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="bs-site-sec">
        <h2 className="bs-sec-head"><i></i><span>THE SITE</span><i></i></h2>
        <p className="bs-sub bs-sub--dark">berilsedathomes.ca · live · English and Turkish</p>
        <figure className="bs-site">
          <div className="bs-shot-bar">
            <span className="bs-shot-dots"><i></i><i></i><i></i></span>
            <span className="bs-shot-url">berilsedathomes.ca{SHOTS[siteTab].url}</span>
            <span className="bs-shot-live">● LIVE</span>
          </div>
          <nav className="bs-site-tabs">
            {SHOTS.map((s, i) => (
              <button type="button" key={s.tab} className={i === siteTab ? "on" : ""} onClick={() => setSiteTab(i)} aria-pressed={i === siteTab}>{s.tab}</button>
            ))}
          </nav>
          <div className="bs-site-window">
            <iframe
              key={SHOTS[siteTab].path}
              className="bs-site-frame"
              src={`/portfolio/beril-sedat-homes/site/${SHOTS[siteTab].path}/index.html`}
              title={`${SHOTS[siteTab].tab} page of berilsedathomes.ca`}
              loading="lazy"
              onLoad={applySiteGuards}
            />
          </div>
          <div className="bs-site-foot">
            <div className="bs-site-nav">
              <button type="button" onClick={() => setSiteTab((t) => (t - 1 + SHOTS.length) % SHOTS.length)} aria-label="Previous page">‹</button>
              <span>{String(siteTab + 1).padStart(2, "0")} / {String(SHOTS.length).padStart(2, "0")}</span>
              <button type="button" onClick={() => setSiteTab((t) => (t + 1) % SHOTS.length)} aria-label="Next page">›</button>
            </div>
            <a className="bs-visit" href={`https://www.berilsedathomes.ca${SHOTS[siteTab].url}`} target="_blank" rel="noopener noreferrer">Visit this page <span>↗</span></a>
          </div>
          <figcaption>{SHOTS[siteTab].note}</figcaption>
        </figure>
      </section>

      <section className="bs-map-sec" ref={mapRef}>
        <h2 className="bs-sec-head light"><i></i><span>MAP SEARCH</span><i></i></h2>
        <p className="bs-sub">berilsedathomes.ca/listings/map · office feed · split view</p>
        <p className="bs-lede">The largest build on the site, and the one a portal usually wins on. Every listing carries coordinates, so the roster and the map are the same query seen two ways: filter the list and the pins follow, hover a pin and the card answers. What plays below is that interface, recreated frame for frame.</p>

        <figure className="bs-map">
          <div className="bs-map-bar">
            <span className={`bs-map-input${mapStep >= 1 ? " typed" : ""}`}>{mapStep >= 1 ? "Toronto & east GTA" : "Search address, MLS®, keyword…"}</span>
            <span className="bs-map-group">
              <b className="on">Buy</b><b>Lease</b>
            </span>
            <span className={`bs-map-sel${mapStep >= 2 ? " set" : ""}`}>{mapStep >= 2 ? "3+ beds" : "Beds"}</span>
            <span className="bs-map-sel">Baths</span>
            <span className={`bs-map-sel${mapStep >= 2 ? " set" : ""}`}>{mapStep >= 2 ? "Under $900K" : "Price"}</span>
            <span className="bs-map-right">
              <span className="bs-map-count">{mapStep === 0 ? 0 : mapStep === 1 ? MAP_PINS.length : MAP_CARDS.length} results</span>
              <span className="bs-map-group dark">
                <b className="on">Split</b><b>Map</b><b>List</b>
              </span>
            </span>
          </div>

          <div className="bs-map-body">
            <div className="bs-map-rail">
              {MAP_CARDS.map((c, i) => (
                <article
                  key={c.id}
                  className={`bs-mcard${mapStep >= 2 ? " in" : ""}${mapActive === i ? " active" : ""}`}
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  <span className="bs-mcard-shot">
                    <span className="bs-mcard-badge">For sale</span>
                  </span>
                  <span className="bs-mcard-body">
                    <b className="bs-mcard-price">{c.price}</b>
                    <span className="bs-mcard-addr">{c.addr}</span>
                    <span className="bs-mcard-hood">{c.hood}</span>
                    <span className="bs-mcard-specs">
                      <span><i>{c.bd}</i> bd</span><span><i>{c.ba}</i> ba</span><span><i>{c.sqft}</i> sqft</span>
                    </span>
                    <span className="bs-mcard-link">View listing</span>
                  </span>
                </article>
              ))}
            </div>

            <div className="bs-map-canvas">
              <span className={`bs-map-layer wide${mapStep >= 3 ? " out" : ""}`}>
                <img src="/portfolio/beril-sedat-homes/mapsearch/basemap.jpg" alt="" width={1024} height={768} loading="lazy" />
                {MAP_PINS.map((p, i) => (
                  <span
                    key={i}
                    className={`bs-pin${mapStep >= 1 ? " drop" : ""}${mapStep >= 2 && !p.big ? " dim" : ""}`}
                    style={{ left: `${p.x}%`, top: `${p.y}%`, transitionDelay: `${mapStep >= 1 && mapStep < 2 ? (i % 12) * 45 : 0}ms` }}
                  />
                ))}
                {MAP_CARDS.map((c, i) => (
                  <span
                    key={c.id}
                    className={`bs-pin big${mapStep >= 2 ? " drop" : ""}${mapActive === i ? " hot" : ""}`}
                    style={{ left: `${c.x}%`, top: `${c.y}%` }}
                  >
                    <em>{c.price.replace(/,\d{3}$/, "K")}</em>
                  </span>
                ))}
              </span>

              <span className={`bs-map-layer zoom${mapStep >= 3 ? " in" : ""}`}>
                <img src="/portfolio/beril-sedat-homes/mapsearch/basemap-zoom.jpg" alt="" width={1024} height={1024} loading="lazy" />
                {ZOOM_PINS.map((z, i) => (
                  <span
                    key={z.id}
                    className={`bs-pin big${mapStep >= 3 ? " drop" : ""}${zoomActive === i ? " hot" : ""}`}
                    style={{ left: `${z.x}%`, top: `${z.y}%`, transitionDelay: `${mapStep >= 3 ? i * 70 : 0}ms` }}
                  >
                    <em>{z.short}</em>
                    <b className="bs-pin-tip">{z.addr} · {z.bd} bd {z.ba} ba</b>
                  </span>
                ))}
              </span>

              <span className={`bs-map-zoomtag${mapStep >= 3 ? " on" : ""}`}>Downtown &amp; midtown Toronto</span>
              <span className="bs-map-attr">© OpenStreetMap © CARTO</span>
            </div>
          </div>
        </figure>
        <figcaption className="bs-map-cap">Recreated for this case study from the live components, with a basemap and 32 office-feed listings captured once and frozen. Nothing here calls the brokerage&rsquo;s listing API.</figcaption>
      </section>

      <section className="bs-lang">
        <div className="bs-lang-inner">
          <h2 className="bs-lang-head">Two languages, not one translated twice.</h2>
          <div className="bs-lang-grid">
            <div><p className="bs-lang-label">EN</p><p className="bs-lang-quote">&ldquo;Quiet luxury.&rdquo;</p></div>
            <div><p className="bs-lang-label">TR</p><p className="bs-lang-quote">&ldquo;Kişiye özel.&rdquo;</p></div>
          </div>
          <p className="bs-lang-body">Rendered literally, &ldquo;quiet luxury&rdquo; lands in Turkish as something closer to <i>muted expensive</i> — the wrong idea entirely. The Turkish side of this brand is transcreated, not translated: the promise is carried, the phrasing is rebuilt. &ldquo;A timeless home&rdquo; becomes <i>size yakışan bir yuva</i> — a home that suits you. Same brand. Two readers who each think it was written for them.</p>
        </div>
      </section>

      <section className="bs-scope">
        <h2 className="bs-sec-head light"><i></i><span>SCOPE</span><i></i></h2>
        <div>
          {SCOPE.map((s) => (
            <article className="bs-row" key={s.no}>
              <span className="bs-row-no">{s.no}</span>
              <div>
                <h3>{s.title}</h3>
                <p className="bs-row-meta">{s.meta}</p>
                <p className="bs-row-body">{s.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="bs-signoff">
        <div className="bs-sign-mark"><img className="bs-sign-img" src="/portfolio/beril-sedat-homes/brand/logo-navy.png" alt="Beril &amp; Sedat Homes logo" loading="lazy" /></div>
        <div className="bs-sign-grid">
          <div><p className="bs-sign-label">PREPARED BY</p><p className="bs-sign-name">FrameFlow</p></div>
          <div><p className="bs-sign-label">FRAME</p><p className="bs-sign-name">{frame}</p></div>
          <div><p className="bs-sign-label">STATUS</p><p className="bs-sign-name bronze">ONGOING</p></div>
        </div>
        <Link className="bs-sign-back" href="/portfolio">← Back to portfolio</Link>
      </footer>

      {lightbox && (() => {
        const isVideo = lightbox.set !== "feed";
        const item = lightbox.set === "reels" ? REELS[lightbox.i] : lightbox.set === "explainers" ? EXPLAINERS[lightbox.i] : FEED[lightbox.i];
        const len = lightbox.set === "reels" ? REELS.length : lightbox.set === "explainers" ? EXPLAINERS.length : FEED.length;
        return (
          <div
            className="bs-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${item.id} — ${lightbox.i + 1} of ${len}`}
            onClick={(e) => { if (e.target === e.currentTarget) closeBox(); }}
          >
            <button type="button" className="bs-modal-nav prev" onClick={() => stepBox(-1)} aria-label="Previous">‹</button>
            <div className="bs-modal-stage">
              <div className="bs-modal-bar">
                <span className="bs-modal-id">{item.id}</span>
                <span className="bs-modal-count">{String(lightbox.i + 1).padStart(2, "0")} / {String(len).padStart(2, "0")}</span>
                <button type="button" className="bs-modal-close" onClick={closeBox} aria-label="Close">✕</button>
              </div>
              <div className="bs-modal-shot">
                {isVideo ? (
                  <video key={item.src} controls autoPlay playsInline poster={`${item.src.replace(/\.mp4$/, "")}-poster.jpg`}>
                    <source src={item.src} type="video/mp4" />
                  </video>
                ) : (
                  <img src={item.src} alt={item.alt} />
                )}
              </div>
            </div>
            <button type="button" className="bs-modal-nav next" onClick={() => stepBox(1)} aria-label="Next">›</button>
            <p className="bs-modal-cap">{item.cap}</p>
            {"note" in item && item.note ? <p className="bs-modal-note">{item.note}</p> : null}
          </div>
        );
      })()}

      <FontLink />
      <style jsx global>{`
        .bs-page{--navy:#1c2841;--catalyst:#232d3f;--limestone:#e1d4c0;--bronze:#997755;--cloud:#f0f0f0;--warm:#e2d2b9;--terra:#b4472a;--rule:rgba(28,40,65,.14);
          background:var(--cloud);color:var(--navy);font-family:"Montserrat",system-ui,sans-serif;font-weight:400;-webkit-font-smoothing:antialiased}
        .bs-page b{font-weight:600}
        .bs-page h1,.bs-page h2,.bs-page h3{font-family:"Cinzel",Georgia,serif;font-weight:500;letter-spacing:.02em}

        .bs-rail{position:sticky;top:0;z-index:40;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:11px 26px;
          background:var(--cloud);color:var(--navy);border-bottom:1px solid var(--rule);font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase}
        /* Centred against the rail, not against its siblings — space-between
           offsets it by half the difference between the two end blocks. */
        .bs-rail-mid{position:absolute;left:50%;transform:translateX(-50%);white-space:nowrap;pointer-events:none}
        .bs-back{color:var(--navy);text-decoration:none;opacity:.75}
        .bs-back:hover{opacity:1;color:var(--bronze)}
        .bs-rail-end{opacity:.75}

        .bs-hero{background:var(--navy);color:var(--cloud);padding:88px 26px 96px}
        .bs-hero-inner{max-width:1000px;margin:0 auto;text-align:center}
        .bs-hero-logo{width:250px;max-width:56%;height:auto;display:block;margin:0 auto 40px}
        .bs-eyebrow{font-size:10px;font-weight:500;letter-spacing:.28em;text-transform:uppercase;color:var(--limestone);margin:0 0 34px}
        .bs-h1{font-size:clamp(30px,4.6vw,58px);line-height:1.28;margin:0 0 34px;color:var(--cloud)}
        .bs-h1 em{font-style:italic;color:var(--limestone)}
        .bs-deck{max-width:62ch;margin:0 auto 44px;font-size:15.5px;font-weight:300;line-height:1.85;color:rgba(240,240,240,.76)}
        .bs-deck b{color:var(--cloud);font-weight:500}
        .bs-facts{display:grid;grid-template-columns:repeat(3,1fr);gap:26px;border-top:1px solid rgba(240,240,240,.16);padding-top:28px;margin:0 auto;max-width:780px}
        .bs-facts dt{font-size:9px;font-weight:500;letter-spacing:.24em;text-transform:uppercase;color:var(--bronze);margin-bottom:9px}
        .bs-facts dd{margin:0;font-size:13.5px;font-weight:300;color:rgba(240,240,240,.9)}

        .bs-sec-head{display:flex;align-items:center;gap:22px;max-width:1160px;margin:0 auto 14px;font-family:"Cinzel",serif;font-size:13px;font-weight:500;
          letter-spacing:.3em;text-transform:uppercase}
        .bs-sec-head i{flex:1;height:1px;background:var(--rule)}
        .bs-sec-head.light{color:var(--cloud)}
        .bs-sec-head.light i{background:rgba(240,240,240,.22)}
        .bs-sub{text-align:center;font-size:10px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:rgba(240,240,240,.5);margin:0 0 46px}
        .bs-sub--dark{color:rgba(28,40,65,.75)}

        .bs-registers{padding:96px 26px}
        .bs-lede{max-width:68ch;margin:30px auto 48px;text-align:center;font-size:15.5px;font-weight:300;line-height:1.9;color:#3d4757}
        .bs-reg-grid{max-width:1000px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:24px}
        .bs-reg{padding:40px 34px}
        .bs-reg-chip{display:inline-block;font-size:9px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;margin-bottom:20px}
        .bs-reg h3{font-size:25px;margin:0 0 14px}
        .bs-reg p{margin:0;font-size:13.5px;font-weight:300;line-height:1.75}
        .bs-reg--navy{background:var(--navy);color:var(--cloud)}
        .bs-reg--navy .bs-reg-chip{color:var(--bronze)}
        .bs-reg--navy h3{color:var(--limestone)}
        .bs-reg--navy p{color:rgba(240,240,240,.68)}
        .bs-reg--warm{background:var(--warm);color:#4a3527}
        .bs-reg--warm .bs-reg-chip{color:var(--terra)}
        .bs-reg--warm h3{color:#6b3b23}
        .bs-reg--warm p{color:#6a5546}

        .bs-grid{max-width:1160px;margin:0 auto;display:grid;gap:18px}
        .bs-grid--45{grid-template-columns:repeat(4,1fr)}
        .bs-grid--916{grid-template-columns:repeat(5,1fr)}
        .bs-cell{position:relative;display:block;padding:0;border:0;cursor:pointer;background:transparent;text-align:left}
        .bs-cell-img{width:100%;height:auto;display:block;transition:opacity 260ms ease,transform 420ms ease}
        .bs-cell:hover .bs-cell-img{opacity:.86;transform:translateY(-3px)}
        .bs-cell-cap{display:block;padding-top:11px;font-size:9.5px;font-weight:500;letter-spacing:.16em;text-transform:uppercase}
        .bs-cell--onDark .bs-cell-cap{color:rgba(240,240,240,.5)}
        .bs-cell--onLight .bs-cell-cap{color:rgba(28,40,65,.75)}
        .bs-play{position:absolute;z-index:2;top:12px;left:12px;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;
          background:rgba(28,40,65,.55);color:#fff;font-size:10px;line-height:1;padding-left:2px;backdrop-filter:blur(3px);transition:background 200ms ease}
        .bs-cell:hover .bs-play{background:var(--bronze)}
        .bs-reels{background:var(--navy);padding:96px 26px}
        .bs-reels .bs-lede{color:rgba(240,240,240,.7)}
        .bs-feed{background:var(--cloud);padding:96px 26px}
        .bs-motion{background:#f3ece1;padding:96px 26px}

        .bs-site-sec{background:var(--limestone);padding:96px 26px}
        .bs-site{max-width:1160px;margin:0 auto}
        .bs-shot-bar{display:flex;align-items:center;gap:14px;background:var(--navy);padding:10px 15px;font-size:10px;font-weight:500;letter-spacing:.14em;text-transform:uppercase}
        .bs-shot-dots{display:flex;gap:6px}
        .bs-shot-dots i{width:8px;height:8px;border-radius:50%;background:rgba(240,240,240,.24)}
        .bs-shot-dots i:first-child{background:var(--bronze)}
        .bs-shot-url{flex:1;color:rgba(240,240,240,.72);letter-spacing:.05em;text-transform:none}
        .bs-shot-live{color:var(--limestone);font-weight:600}
        .bs-site-tabs{display:flex;flex-wrap:wrap;border:1px solid var(--rule);border-top:0;border-bottom:0}
        .bs-site-tabs button{flex:1;min-width:104px;cursor:pointer;background:#d6c8b2;border:0;border-right:1px solid rgba(28,40,65,.1);padding:12px 8px;
          font-family:"Montserrat",sans-serif;font-size:9.5px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#584d40;transition:background 150ms ease,color 150ms ease}
        .bs-site-tabs button:last-child{border-right:0}
        .bs-site-tabs button:hover{background:#cbbca4;color:var(--navy)}
        .bs-site-tabs button.on{background:var(--cloud);color:var(--bronze)}
        .bs-site-window{position:relative;height:640px;overflow:hidden;border:1px solid var(--rule);background:#fff}
        .bs-site-frame{width:148.5%;height:148.5%;transform:scale(.6734);transform-origin:0 0;border:0;display:block;background:#fff}
        .bs-site-foot{display:flex;align-items:center;justify-content:space-between;gap:16px;border:1px solid var(--rule);border-top:0;padding:13px 15px}
        .bs-site-nav{display:flex;align-items:center;gap:12px}
        .bs-site-nav button{width:34px;height:34px;cursor:pointer;line-height:1;background:transparent;border:1px solid var(--rule);color:var(--navy);font-size:19px;transition:all 150ms ease}
        .bs-site-nav button:hover{background:var(--navy);border-color:var(--navy);color:var(--cloud)}
        .bs-site-nav span{font-size:10px;font-weight:500;letter-spacing:.16em;color:#6f6252}
        .bs-visit{display:inline-flex;align-items:center;gap:9px;background:var(--navy);color:var(--cloud);text-decoration:none;padding:12px 20px;font-size:9.5px;
          font-weight:600;letter-spacing:.2em;text-transform:uppercase;transition:background 150ms ease}
        .bs-visit:hover{background:var(--bronze)}
        .bs-site figcaption{font-size:12.5px;font-weight:300;line-height:1.75;color:#5b5344;border-left:2px solid var(--bronze);padding-left:16px;margin-top:20px;max-width:72ch}

        /* ---- Map search demo: a recreation of the live MapSearch component ---- */
        .bs-map-sec{background:var(--navy);padding:96px 26px}
        .bs-map-sec .bs-lede{color:rgba(240,240,240,.72)}
        .bs-map{max-width:1160px;margin:40px auto 0;background:#fff;box-shadow:0 30px 80px rgba(0,0,0,.35)}
        .bs-map-bar{display:flex;flex-wrap:wrap;align-items:center;gap:10px;border-bottom:1px solid rgba(28,40,65,.1);padding:12px 20px}
        .bs-map-input{flex:1;min-width:170px;max-width:300px;border:1px solid rgba(28,40,65,.18);padding:8px 12px;font-size:12.5px;color:rgba(28,40,65,.42);transition:color .3s,border-color .3s}
        .bs-map-input.typed{color:var(--navy);border-color:var(--bronze)}
        .bs-map-group{display:flex;border:1px solid rgba(28,40,65,.15)}
        .bs-map-group b{padding:6px 12px;font-size:10.5px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--navy)}
        .bs-map-group b.on{background:var(--bronze);color:var(--cloud)}
        .bs-map-group.dark b.on{background:var(--navy);color:var(--cloud)}
        .bs-map-sel{border:1px solid rgba(28,40,65,.15);padding:6px 12px;font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:rgba(28,40,65,.55);transition:color .3s,border-color .3s,background .3s}
        .bs-map-sel.set{background:var(--bronze);border-color:var(--bronze);color:var(--cloud)}
        .bs-map-right{margin-left:auto;display:flex;align-items:center;gap:14px}
        .bs-map-count{font-size:11.5px;letter-spacing:.05em;color:rgba(28,40,65,.6);font-variant-numeric:tabular-nums}
        .bs-map-body{display:grid;grid-template-columns:minmax(320px,390px) 1fr;height:470px}
        .bs-map-rail{display:flex;flex-direction:column;gap:10px;overflow:hidden;border-right:1px solid rgba(28,40,65,.1);padding:12px;background:#fff}
        .bs-mcard{display:flex;gap:12px;border:1px solid rgba(28,40,65,.08);background:#fff;padding:10px;opacity:0;transform:translateY(10px);transition:opacity .45s ease,transform .45s ease,border-color .25s,box-shadow .25s}
        .bs-mcard.in{opacity:1;transform:none}
        .bs-mcard.active{border-color:var(--bronze);box-shadow:0 10px 30px rgba(12,27,51,.1)}
        .bs-mcard-shot{position:relative;flex:0 0 108px;aspect-ratio:4/3;background:var(--catalyst);display:block}
        .bs-mcard-badge{position:absolute;left:6px;top:6px;background:var(--bronze);color:var(--cloud);padding:3px 7px;font-size:8px;letter-spacing:.15em;text-transform:uppercase}
        .bs-mcard-body{display:flex;flex-direction:column;min-width:0;flex:1}
        .bs-mcard-price{font-family:"Cinzel",Georgia,serif;font-size:17px;font-weight:500;color:var(--navy);line-height:1.2}
        .bs-mcard-addr{font-size:12px;color:rgba(28,40,65,.8);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
        .bs-mcard-hood{font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(--bronze);margin-bottom:6px}
        .bs-mcard-specs{margin-top:auto;display:flex;gap:10px;font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:rgba(28,40,65,.6)}
        .bs-mcard-specs i{font-style:normal;font-weight:600;color:var(--navy)}
        .bs-mcard-link{margin-top:7px;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--bronze)}
        .bs-map-canvas{position:relative;overflow:hidden;background:#eef1f3}
        .bs-map-layer{position:absolute;inset:0;display:block;transition:opacity .9s ease,transform 1.1s cubic-bezier(0.4,0,0.2,1)}
        .bs-map-layer img{width:100%;height:100%;object-fit:cover;display:block}
        .bs-map-layer.wide{opacity:1;transform:scale(1)}
        .bs-map-layer.wide.out{opacity:0;transform:scale(2.6)}
        .bs-map-layer.zoom{opacity:0;transform:scale(.45);pointer-events:none}
        .bs-map-layer.zoom.in{opacity:1;transform:scale(1)}
        .bs-map-zoomtag{position:absolute;left:12px;top:12px;z-index:3;background:var(--navy);color:var(--cloud);padding:6px 11px;font-size:9.5px;letter-spacing:.16em;text-transform:uppercase;opacity:0;transform:translateY(-6px);transition:opacity .5s ease .35s,transform .5s ease .35s}
        .bs-map-zoomtag.on{opacity:1;transform:none}
        .bs-pin-tip{position:absolute;left:50%;top:calc(100% + 6px);transform:translateX(-50%);white-space:nowrap;background:#fff;color:var(--navy);padding:5px 9px;font-size:10px;font-weight:400;letter-spacing:.02em;box-shadow:0 6px 18px rgba(12,27,51,.22);opacity:0;transition:opacity .25s}
        .bs-pin.big.hot{z-index:4}
        .bs-pin.hot .bs-pin-tip{opacity:1}
        .bs-pin{position:absolute;width:11px;height:11px;margin:-5.5px 0 0 -5.5px;border-radius:50%;background:var(--bronze);border:1.5px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.35);opacity:0;transform:translateY(-14px) scale(.4);transition:opacity .4s ease,transform .5s cubic-bezier(0.34,1.56,0.64,1)}
        .bs-pin.drop{opacity:1;transform:none}
        .bs-pin.dim{opacity:.22}
        .bs-pin.big{width:auto;height:auto;margin:0;border-radius:0;background:none;border:0;box-shadow:none;transform:translate(-50%,-140%) scale(.8)}
        .bs-pin.big.drop{transform:translate(-50%,-140%) scale(1)}
        .bs-pin.big em{display:block;font-style:normal;background:var(--navy);color:var(--cloud);padding:4px 8px;font-size:11px;font-weight:600;letter-spacing:.03em;white-space:nowrap;box-shadow:0 3px 10px rgba(0,0,0,.35);transition:background .25s,transform .25s}
        .bs-pin.big.hot em{background:var(--bronze);transform:scale(1.12)}
        .bs-map-attr{position:absolute;right:6px;bottom:5px;background:rgba(255,255,255,.78);padding:2px 6px;font-size:8.5px;letter-spacing:.02em;color:rgba(28,40,65,.65)}
        .bs-map-cap{max-width:1160px;margin:18px auto 0;font-size:12.5px;font-weight:300;line-height:1.75;color:rgba(240,240,240,.6);border-left:2px solid var(--bronze);padding-left:16px}

        .bs-lang{background:var(--catalyst);color:var(--cloud);padding:100px 26px}
        .bs-lang-inner{max-width:860px;margin:0 auto;text-align:center}
        .bs-lang-head{font-size:clamp(22px,3vw,34px);margin:0 0 44px;color:var(--limestone)}
        .bs-lang-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;border-block:1px solid rgba(240,240,240,.16);padding:34px 0;margin-bottom:36px}
        .bs-lang-label{font-size:9px;font-weight:600;letter-spacing:.28em;text-transform:uppercase;color:var(--bronze);margin:0 0 14px}
        .bs-lang-quote{font-family:"Cinzel",serif;font-size:24px;margin:0;color:var(--cloud)}
        .bs-lang-body{max-width:62ch;margin:0 auto;font-size:15px;font-weight:300;line-height:1.9;color:rgba(240,240,240,.74)}
        .bs-lang-body i{color:var(--limestone);font-style:italic}

        .bs-scope{background:var(--navy);color:var(--cloud);padding:96px 26px}
        .bs-row{max-width:1160px;margin:0 auto;display:grid;grid-template-columns:96px 1fr;gap:26px;padding:34px 0;border-top:1px solid rgba(240,240,240,.14)}
        .bs-row:last-child{border-bottom:1px solid rgba(240,240,240,.14)}
        .bs-row-no{font-family:"Cinzel",serif;font-size:30px;color:var(--bronze);line-height:1}
        .bs-row h3{font-size:22px;margin:0 0 10px;color:var(--limestone)}
        .bs-row-meta{font-size:9.5px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:rgba(240,240,240,.44);margin:0 0 16px}
        .bs-row-body{max-width:76ch;font-size:14.5px;font-weight:300;line-height:1.85;color:rgba(240,240,240,.76);margin:0}

        .bs-signoff{padding:76px 26px 92px;text-align:center}
        .bs-sign-mark{margin-bottom:46px}
        .bs-sign-img{width:210px;max-width:62%;height:auto;display:block;margin:0 auto}
        .bs-sign-grid{max-width:900px;margin:0 auto 40px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px;border-top:1px solid var(--rule);padding-top:26px}
        .bs-sign-label{font-size:9px;font-weight:500;letter-spacing:.24em;text-transform:uppercase;color:#6f6252;margin:0 0 10px}
        .bs-sign-name{font-family:"Cinzel",serif;font-size:20px;margin:0;color:var(--navy)}
        .bs-sign-name.bronze{color:var(--bronze)}
        .bs-sign-back{display:inline-block;font-size:9.5px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--navy);text-decoration:none}
        .bs-sign-back:hover{color:var(--bronze)}

        .bs-modal{position:fixed;inset:0;z-index:90;display:flex;align-items:center;justify-content:center;padding:44px;background:rgba(14,22,38,.96);font-family:"Montserrat",system-ui,sans-serif;animation:bs-fade .22s ease-out}
        @keyframes bs-fade{from{opacity:0}to{opacity:1}}
        .bs-modal-stage{position:relative;width:min(460px,86vw);height:min(82vh,880px);max-height:86vh;background:var(--cloud);display:flex;flex-direction:column;box-shadow:0 30px 90px rgba(0,0,0,.5);animation:bs-pop .28s cubic-bezier(0.34,1.56,0.64,1)}
        @keyframes bs-pop{from{transform:scale(.96);opacity:0}to{transform:scale(1);opacity:1}}
        .bs-modal-bar{flex:0 0 auto;display:flex;align-items:center;gap:12px;padding:11px 14px;border-bottom:1px solid var(--rule);font-size:9.5px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#6f6252}
        .bs-modal-id{color:var(--bronze)}
        .bs-modal-count{margin-left:auto;font-variant-numeric:tabular-nums;color:var(--navy)}
        .bs-modal-close{width:26px;height:26px;background:none;border:0;color:var(--navy);cursor:pointer;font-size:14px;line-height:1;padding:0;display:flex;align-items:center;justify-content:center;transition:color .16s}
        .bs-modal-close:hover{color:var(--bronze)}
        .bs-modal-shot{flex:1 1 auto;min-height:0;background:#0e1626;overflow:hidden;display:flex;align-items:center;justify-content:center}
        .bs-modal-shot img,.bs-modal-shot video{width:100%;height:100%;object-fit:contain;display:block}
        .bs-modal-nav{position:absolute;top:50%;transform:translateY(-50%);width:54px;height:54px;background:var(--cloud);border:1px solid var(--rule);color:var(--navy);font-size:30px;line-height:1;padding:0;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .16s,background .16s,color .16s;z-index:2}
        .bs-modal-nav:hover{transform:translateY(-50%) scale(1.06);background:var(--bronze);color:var(--cloud);border-color:var(--bronze)}
        .bs-modal-nav.prev{left:24px}.bs-modal-nav.next{right:24px}
        .bs-modal-cap{position:absolute;left:40px;right:40px;bottom:24px;margin:0;text-align:center;font-size:9.5px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.62);z-index:1}
        .bs-modal-note{position:absolute;left:40px;right:40px;bottom:44px;margin:0;text-align:center;font-size:12.5px;font-weight:300;line-height:1.6;letter-spacing:0;text-transform:none;color:rgba(255,255,255,.8);z-index:1}

        @media(max-width:1080px){.bs-grid--916{grid-template-columns:repeat(4,1fr)}}
        @media(max-width:940px){
    .bs-map-body{grid-template-columns:1fr;height:auto}
    .bs-map-rail{max-height:250px;overflow-y:auto;border-right:0;border-bottom:1px solid rgba(28,40,65,.1)}
    .bs-map-canvas{height:340px}
          .bs-grid--45{grid-template-columns:repeat(3,1fr)}
          .bs-grid--916{grid-template-columns:repeat(3,1fr)}
          .bs-reg-grid{grid-template-columns:1fr}
          .bs-rail-mid{display:none}
        }
        @media(max-width:620px){
    .bs-map-canvas{height:260px}
    .bs-map-bar{padding:10px 12px}
    .bs-pin.big em{font-size:10px;padding:3px 6px}
          .bs-hero{padding:68px 22px 62px}
          .bs-grid--45{grid-template-columns:repeat(2,1fr)}
          .bs-grid--916{grid-template-columns:repeat(2,1fr)}
          .bs-facts{grid-template-columns:1fr;gap:18px}
          .bs-lang-grid{grid-template-columns:1fr;gap:26px}
          .bs-sign-grid{grid-template-columns:1fr;gap:20px}
          .bs-site-window{height:440px}
          .bs-site-foot{flex-direction:column;align-items:stretch;gap:12px}
          .bs-visit{justify-content:center}
          .bs-site-nav{justify-content:center}
          .bs-shot-url{display:none}
          .bs-row{grid-template-columns:54px 1fr;gap:14px}
          .bs-row-no{font-size:22px}
          .bs-modal{padding:22px}
          .bs-modal-stage{width:calc(100% - 84px);height:min(72vh,640px)}
          .bs-modal-nav{width:34px;height:34px;font-size:22px}
          .bs-modal-nav.prev{left:5px}.bs-modal-nav.next{right:5px}
          .bs-modal-cap{left:12px;right:12px;bottom:8px}
          .bs-modal-note{left:12px;right:12px;bottom:30px;font-size:11.5px}
        }

        @media (prefers-reduced-motion: reduce){
    .bs-pin,.bs-mcard,.bs-map-input,.bs-map-sel,.bs-pin.big em,.bs-map-layer,.bs-map-zoomtag,.bs-pin-tip{transition:none}
    .bs-map-layer.wide.out{transform:none}
    .bs-map-layer.zoom.in{transform:none}
          .bs-modal,.bs-modal-stage{animation:none}
          .bs-cell-img,.bs-play,.bs-modal-close,.bs-modal-nav,.bs-site-tabs button,.bs-site-nav button,.bs-visit{transition:none}
          .bs-cell:hover .bs-cell-img{transform:none}
          .bs-modal-nav:hover{transform:translateY(-50%)}
        }
      `}</style>
    </div>
  );
}

function FontLink() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap"
      />
    </>
  );
}
