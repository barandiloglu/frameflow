"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getFrameNumber } from "@/data/clients";
import type { Client } from "@/data/clients";
import { LoadingTransition } from "@/components/portfolio/LoadingTransition";

type Props = { client: Client };

const SOCIAL_POSTS: ReadonlyArray<{ src: string; alt: string; template: string }> = [
  { src: "/portfolio/adrians-wasaga-beach/social/01-now-booking.png",     alt: "Now booking · Summer 2026 social post",         template: "Headline"  },
  { src: "/portfolio/adrians-wasaga-beach/social/04-color-headline.png",  alt: "Color headline social post",                    template: "Headline"  },
  { src: "/portfolio/adrians-wasaga-beach/social/09-aerial-courtyard.png", alt: "Aerial of the courtyard social post",          template: "Aerial"    },
  { src: "/portfolio/adrians-wasaga-beach/social/11-sunset-doors.png",    alt: "Sunset doors social post",                      template: "Postcard"  },
  { src: "/portfolio/adrians-wasaga-beach/social/12-firepit-quote.png",   alt: "Firepit quote social post",                     template: "Quote"     },
  { src: "/portfolio/adrians-wasaga-beach/social/14-daytime-patio.png",   alt: "Daytime patio social post",                     template: "Postcard"  },
  { src: "/portfolio/adrians-wasaga-beach/social/17-card-kitchen.png",    alt: "Card kitchen social post",                      template: "Postcard"  },
  { src: "/portfolio/adrians-wasaga-beach/social/20-polaroid-three.png",  alt: "Three polaroids social post",                   template: "Polaroid"  },
  { src: "/portfolio/adrians-wasaga-beach/social/23-postcard-doors.png",  alt: "Postcard doors social post",                    template: "Postcard"  },
  { src: "/portfolio/adrians-wasaga-beach/social/25-postcard-aerial.png", alt: "Aerial postcard social post",                   template: "Postcard"  },
  { src: "/portfolio/adrians-wasaga-beach/social/27-mask-stay.png",       alt: "Masked Stay social post",                       template: "Mask"      },
  { src: "/portfolio/adrians-wasaga-beach/social/33-quote-yara.png",      alt: "Yara quote social post",                        template: "Quote"     },
];

const TEMPLATES: ReadonlyArray<{ id: string; name: string; cls: string }> = [
  { id: "T.01", name: "Postcard", cls: "tpl-postcard" },
  { id: "T.02", name: "Polaroid", cls: "tpl-polaroid" },
  { id: "T.03", name: "Quote",    cls: "tpl-quote"    },
  { id: "T.04", name: "Headline", cls: "tpl-headline" },
  { id: "T.05", name: "Aerial",   cls: "tpl-aerial"   },
  { id: "T.06", name: "Mask",     cls: "tpl-mask"     },
];

const REVIEWS: ReadonlyArray<{ stars: string; quote: string; by: string; when: string }> = [
  {
    stars: "★★★★★",
    quote:
      "The renovations have made this place the nicest and cleanest around. Modern furnishings and decor and top of the line appliances for a decent rate. Definitely the only place I'd stay in Wasaga.",
    by: "Pam B.",
    when: "Jan 2026",
  },
  {
    stars: "★★★★★",
    quote:
      "A perfect spot for our annual ladies getaway. Lovely grounds with hot tub and close to the beach. Hostess friendly and helpful.",
    by: "Anne D.",
    when: "Sept 2025",
  },
  {
    stars: "★★★★★",
    quote:
      "Adrian's is setting the bar on what beachfront luxury should be. Felt like a home away from home.",
    by: "Rougebella",
    when: "Aug 2025",
  },
  {
    stars: "★★★★★",
    quote:
      "A great place for a family vacation. Clean, modern and in a great location. Owners are friendly and helpful.",
    by: "L. R.",
    when: "May 2025",
  },
];

const SUBPAGES: ReadonlyArray<{ url: string; name: string; meta: string; photoIdx: number }> = [
  { url: "/beach-house",        name: "Beach House",        meta: "Sleeps 10–12 · 4 BR · 75″ TV",       photoIdx: 14 },
  { url: "/standard-cottages",  name: "Standard Cottages",  meta: "#1–#5 · 2 doubles · sleeps 5",       photoIdx: 5  },
  { url: "/one-bedroom",        name: "One Bedroom Suite",  meta: "Queen + sofa · sleeps 3",            photoIdx: 10 },
  { url: "/gallery",            name: "Gallery",            meta: "All 16 plates · campaign archive",   photoIdx: 3  },
];

export function AdriansPage({ client }: Props) {
  const photos = client.photos ?? [];
  const total = photos.length;
  const frameNumber = getFrameNumber(client);

  /* PHOTO LIGHTBOX */
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const isOpen = modalIndex !== null;
  const activePhoto = isOpen ? photos[modalIndex] : null;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalIndex(null);
      else if (e.key === "ArrowLeft") {
        setModalIndex((i) => (i === null ? null : (i - 1 + total) % total));
      } else if (e.key === "ArrowRight") {
        setModalIndex((i) => (i === null ? null : (i + 1) % total));
      }
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, total]);

  const heroPolaroids = [
    { idx: 0,  label: "Plate 01 · Hero",     deliverable: "Photography" },
    { idx: 11, label: "Post 23 · Postcard",  deliverable: "Social"      },
    { idx: 6,  label: "Aerial · Hero",       deliverable: "Website live" },
  ];

  return (
    <>
      <LoadingTransition
        frameNumber={frameNumber}
        clientName={client.name}
        scope={client.services}
        location={client.location}
        year={client.year}
      />

      {/* Google Fonts (React 19 hoists <link> to <head>) */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800;900&family=Quicksand:wght@300;400;500;600;700&family=Caveat:wght@400;500;600;700&display=swap"
      />

      <div className="aw-page">
        {/* TOP RAIL ---------------------------------------------- */}
        <header className="aw-rail">
          <Link href="/portfolio" className="aw-rail-back">← Portfolio</Link>
          <span className="aw-rail-center">ADRIAN&rsquo;S · CASE STUDY</span>
          <span className="aw-rail-meta">
            FrameFlow · Reel <b>{frameNumber}</b> · 2026
          </span>
        </header>

        {/* HERO — three polaroids on tape ----------------------- */}
        <section className="aw-hero">
          <div className="aw-hero-inner">
            <div className="aw-hero-text">
              <p className="aw-hero-crumb">
                <span>Case Study</span>
                <i>·</i>
                <span>Reel {frameNumber}</span>
                <i>·</i>
                <span>{client.location ?? "Wasaga Beach, ON"}</span>
              </p>
              <h1 className="aw-hero-title">
                Three deliverables,<br /><em>one summer.</em>
              </h1>
              <p className="aw-hero-deck">
                A boutique 8-cabin courtyard rental, three blocks from the longest
                freshwater beach in the world. We were brought on for three
                things: <b>photography</b>, a <b>35-post social campaign</b>, and
                a <b>booking-first website</b> at adrianswasagabeach.ca.
              </p>
              <dl className="aw-hero-meta">
                <div><dt>01 · Photography</dt><dd>16 plates · 2 shoots</dd></div>
                <div><dt>02 · Social</dt><dd>35 posts · 6 templates</dd></div>
                <div><dt>03 · Website</dt><dd>12 pages · live Apr 2026</dd></div>
              </dl>
            </div>

            <div className="aw-hero-polaroids" aria-hidden="false">
              {heroPolaroids.map((p, i) => {
                const photo = photos[p.idx];
                if (!photo) return null;
                return (
                  <button
                    type="button"
                    key={p.idx}
                    className={`aw-pola pola-${i + 1}`}
                    onClick={() => setModalIndex(p.idx)}
                    aria-label={`Open photo: ${photo.alt}`}
                  >
                    <span className="tape" aria-hidden />
                    <span className="img">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 880px) 60vw, 320px"
                        style={{ objectFit: "cover" }}
                        priority={i === 0}
                      />
                    </span>
                    <span className="cap">
                      <b>{p.deliverable}</b>
                      <i>{p.label}</i>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* BRIEF — dark band, perforated edges ------------------ */}
        <section className="aw-brief">
          <div className="aw-brief-inner">
            <span className="aw-brief-stamp">The brief</span>
            <h2>
              &ldquo;Make us <em>findable.</em>
              <br />And make it feel like Adrian&rsquo;s.&rdquo;
            </h2>
            <p>
              Two locations &mdash; Beach Area 3 Resort and Beach Area 1 Suites
              &mdash; needed to feel like one welcome. Pretty pictures. Posts
              that booked guests. A site that opened on a phone and didn&rsquo;t
              make the hostess&rsquo;s mum confused.
            </p>
            <p className="aw-brief-by">
              <span /> Dilber, hostess
            </p>
          </div>
        </section>

        {/* DELIVERABLE 01 — PHOTOGRAPHY ------------------------- */}
        <section className="aw-del">
          <div className="aw-del-head">
            <span className="num">01</span>
            <div className="text">
              <p className="label">Deliverable 01 · Photography</p>
              <h3>
                <em>Two shoots.</em> One hundred and ten frames.
                Sixteen kept.
              </h3>
            </div>
            <p className="meta">
              <span><b>2</b> shoots · spring + summer</span>
              <span><b>110</b> frames made</span>
              <span><b>16</b> selects kept</span>
              <span><b>5</b> categories</span>
            </p>
          </div>

          <div className="aw-del-body">
            <div className="aw-approach">
              <p className="lbl">Approach</p>
              <p>
                Daylight only. Two shoots, six months apart &mdash; spring
                sunsets and summer middays. The keystone frame is{" "}
                <b>plate 01</b>: the courtyard at golden hour, firepit lit, the
                sun off-frame. It runs the website hero, social post 12, and
                the postcard set. The other fifteen plates fan out from there.
              </p>
              <ul className="cats">
                <li><b>05</b> sunset</li>
                <li><b>03</b> daytime</li>
                <li><b>04</b> aerial</li>
                <li><b>04</b> interiors</li>
              </ul>
            </div>
            <button
              type="button"
              className="aw-feature"
              onClick={() => setModalIndex(0)}
              aria-label="Open hero plate"
            >
              <span className="tape t1" aria-hidden />
              <span className="tape t2" aria-hidden />
              <span className="img">
                {photos[0] && (
                  <Image
                    src={photos[0].src}
                    alt={photos[0].alt}
                    fill
                    sizes="(max-width: 880px) 90vw, 540px"
                    style={{ objectFit: "cover" }}
                  />
                )}
              </span>
              <span className="badge">Plate 01 · Hero</span>
              <span className="zoom" aria-hidden>↗</span>
            </button>
          </div>

          <div className="aw-sheet">
            <p className="lbl">— The contact sheet · all 16 selects · in shipped order —</p>
            <div className="grid">
              {photos.map((p, i) => (
                <button
                  type="button"
                  key={p.src}
                  onClick={() => setModalIndex(i)}
                  aria-label={`Open photo ${i + 1} of ${total}: ${p.alt}`}
                  className="cell"
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 880px) 24vw, 160px"
                    style={{ objectFit: "cover" }}
                  />
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* DELIVERABLE 02 — SOCIAL CAMPAIGN --------------------- */}
        <section className="aw-social">
          <div className="aw-social-inner">
            <div className="aw-del-head light">
              <span className="num">02</span>
              <div className="text">
                <p className="label">Deliverable 02 · Social Media</p>
                <h3>
                  <em>System</em> before posts.<br />
                  Six templates, thirty-five posts, one summer.
                </h3>
              </div>
              <p className="meta">
                <span><b>6</b> templates</span>
                <span><b>35</b> posts shipped</span>
                <span><b>Q2–Q3</b> 2026</span>
                <span><b>≤30s</b> approval per post</span>
              </p>
            </div>

            <div className="aw-tpl-card">
              <div className="head">
                <span>The template system</span>
                <small>1 brand · 6 layouts</small>
              </div>
              <div className="grid">
                {TEMPLATES.map((t) => (
                  <div key={t.id} className={`tpl ${t.cls}`}>
                    <span className="num">{t.id}</span>
                    <span className="name">{t.name}</span>
                  </div>
                ))}
              </div>
              <p className="note">
                Built up front so the hostess could approve any post in 30
                seconds. The campaign rotates between the six.
              </p>
            </div>

            <p className="aw-social-lbl">— 12 of 35 posts · Q2–Q3 ’26 —</p>
            <div className="aw-social-grid">
              {SOCIAL_POSTS.map((s, i) => (
                <figure key={s.src} className={`p p-${(i % 4) + 1}`}>
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 880px) 33vw, 200px"
                    style={{ objectFit: "cover" }}
                  />
                  <figcaption><b>{s.template}</b></figcaption>
                </figure>
              ))}
            </div>

            <dl className="aw-social-stats">
              <div><dt>35</dt><dd>posts shipped</dd></div>
              <div><dt>6</dt><dd>templates · 1 brand</dd></div>
              <div><dt>30s</dt><dd>approval per post</dd></div>
              <div><dt>Q2–Q3</dt><dd>2026</dd></div>
            </dl>
          </div>
        </section>

        {/* DELIVERABLE 03 — WEBSITE ----------------------------- */}
        <section className="aw-web">
          <div className="aw-del-head">
            <span className="num">03</span>
            <div className="text">
              <p className="label">Deliverable 03 · Website Design</p>
              <h3>
                Twelve pages.<br />
                Live <em>since spring.</em>
              </h3>
            </div>
            <p className="meta">
              <span><b>12</b> pages live</span>
              <span><b>2</b> locations</span>
              <span><b>Apr 2026</b> live</span>
              <span><b>adrianswasagabeach.ca</b></span>
            </p>
          </div>

          {/* Browser-chrome mockup of the home page */}
          <article className="aw-browser">
            <header className="chrome">
              <span className="dots"><span /><span /><span /></span>
              <span className="url">adrianswasagabeach.ca</span>
              <span className="live">Live · ssl</span>
            </header>

            <nav className="site-nav">
              <span className="logo">
                ADRIAN&rsquo;S
                <small>WASAGA BEACH</small>
              </span>
              <span className="menu">
                <span>Home</span>
                <span>About</span>
                <span>Suites ▾</span>
                <span>Resort ▾</span>
                <span>Wasaga Beach</span>
                <span>Gallery</span>
                <span>Contact</span>
              </span>
              <span className="book">Book Your Stay</span>
            </nav>

            <div className="site-hero">
              {photos[0] && (
                <Image
                  src={photos[0].src}
                  alt=""
                  fill
                  sizes="(max-width: 880px) 100vw, 1200px"
                  style={{ objectFit: "cover" }}
                />
              )}
              <div className="text">
                <p className="eyebrow">Now Booking · Summer 2026</p>
                <h2>
                  Two Locations<br />
                  One Heartfelt Welcome.
                </h2>
                <p>
                  Looking for the perfect beach location for a great family
                  getaway? Whether at our Resort at Beach Area 3 or the Suites
                  at Beach Area 1, you&rsquo;ll be steps from the sand at the
                  longest freshwater beach in the world.
                </p>
                <span className="book">Book Your Stay →</span>
              </div>
            </div>

            <div className="site-cards">
              <article className="card">
                <div className="ph">
                  {photos[3] && (
                    <Image
                      src={photos[3].src}
                      alt=""
                      fill
                      sizes="120px"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </div>
                <div className="body">
                  <p className="lbl">Beach Area 3 · Resort</p>
                  <h3>Adrian&rsquo;s Resort.</h3>
                  <p>
                    184–190 Dunkerron Ave · Beach House, Beach Aparts, Large
                    Cottages &amp; Standard Cottages.
                  </p>
                </div>
              </article>
              <article className="card">
                <div className="ph">
                  {photos[11] && (
                    <Image
                      src={photos[11].src}
                      alt=""
                      fill
                      sizes="120px"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </div>
                <div className="body">
                  <p className="lbl">Beach Area 1 · Suites</p>
                  <h3>Adrian&rsquo;s Suites.</h3>
                  <p>
                    148 Mosley St · One- &amp; two-bedroom suites, fully
                    renovated, walk to the sand.
                  </p>
                </div>
              </article>
            </div>

            <footer className="site-foot">
              <dl className="row">
                <div>
                  <dt>Stay</dt>
                  <dd>Suites · Resort · Beach House · Cottages · Gallery</dd>
                </div>
                <div>
                  <dt>Visit</dt>
                  <dd>About · Wasaga Beach · Blog · Contact</dd>
                </div>
                <div>
                  <dt>Locations</dt>
                  <dd>
                    148 Mosley St
                    <br />
                    184–190 Dunkerron Ave
                    <br />
                    Wasaga Beach, ON
                  </dd>
                </div>
                <div>
                  <dt>Reserve</dt>
                  <dd>
                    1-365-777-7700
                    <br />
                    info@adrianswasagabeach.ca
                  </dd>
                </div>
              </dl>
              <div className="credit">
                <span>© 2025 Adrian&rsquo;s Wasaga Beach</span>
                <span>
                  Designed by <b>FrameFlow</b>
                </span>
              </div>
            </footer>
          </article>

          {/* Sub-page mini-mockups + sitemap */}
          <div className="aw-extras">
            <div className="aw-pages">
              <p className="lbl">Sub-pages · 4 of 12</p>
              <div className="grid">
                {SUBPAGES.map((s) => {
                  const photo = photos[s.photoIdx];
                  return (
                    <div key={s.url} className="mini">
                      <div className="mc">
                        <span className="dots"><span /><span /><span /></span>
                        <span className="url">{s.url}</span>
                      </div>
                      <div className="mb">
                        <div className="ph">
                          {photo && (
                            <Image
                              src={photo.src}
                              alt=""
                              fill
                              sizes="(max-width: 880px) 50vw, 220px"
                              style={{ objectFit: "cover" }}
                            />
                          )}
                        </div>
                        <div className="cap">
                          <h5>{s.name}</h5>
                          <p>{s.meta}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <article className="aw-sitemap">
              <p className="lbl">Sitemap · 12 URLs</p>
              <h4>
                Every page <em>shipped.</em>
              </h4>
              <div className="tree">
                <p>
                  <span className="node root">/</span> Home
                </p>
                <ul>
                  <li><span className="node">/about</span> About</li>
                  <li><span className="node">/wasaga-beach</span> Beach guide</li>
                  <li><span className="node">/gallery</span> Gallery</li>
                  <li><span className="node">/blog</span> Blog</li>
                  <li><span className="node">/contact</span> Contact</li>
                  <li>
                    Suites · Beach Area 1
                    <ul>
                      <li><span className="node">/one-bedroom</span></li>
                      <li><span className="node">/two-bedroom</span></li>
                    </ul>
                  </li>
                  <li>
                    Resort · Beach Area 3
                    <ul>
                      <li><span className="node">/beach-house</span></li>
                      <li><span className="node">/beach-aparts</span></li>
                      <li><span className="node">/large-cottages</span></li>
                      <li><span className="node">/standard-cottages</span></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </article>
          </div>

          <a
            className="aw-live-cta"
            href="https://www.adrianswasagabeach.ca/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text">
              Visit the live site →
              <small>
                adrianswasagabeach.ca · designed &amp; built by FrameFlow ·
                footer credit on every page
              </small>
            </span>
            <span className="visit">Open ↗</span>
          </a>
        </section>

        {/* PROOF — reviews + Designed-by-FrameFlow callout ------ */}
        <section className="aw-proof">
          <div className="aw-proof-inner">
            <p className="aw-proof-lbl">— Twelve months later —</p>
            <h2>
              What came <em>back.</em>
            </h2>
            <p className="aw-proof-stars">
              ★ ★ ★ ★ ★ <b>4.9 / 5 · Google · 100+ reviews</b>
            </p>

            <div className="aw-reviews">
              {REVIEWS.map((r) => (
                <article key={r.by} className="review">
                  <p className="stars">{r.stars}<b>5/5 · {r.when}</b></p>
                  <p className="quote">{r.quote}</p>
                  <p className="by">
                    <b>{r.by}</b>
                    <span>Verified · Google</span>
                  </p>
                </article>
              ))}
            </div>

            <div className="aw-credit">
              <p className="lbl">— Footer credit · live on every page —</p>
              <p className="line">
                © 2025 Adrian&rsquo;s Wasaga Beach · <b>Designed by FrameFlow</b>
              </p>
              <p className="small">
                Visible at the bottom of adrianswasagabeach.ca
              </p>
            </div>
          </div>
        </section>

        {/* MARKS — palette + type ------------------------------- */}
        <section className="aw-marks">
          <div>
            <h3>Palette · the locked four</h3>
            <div className="aw-palette">
              <PaletteChip cls="sand"     role="Surface · 60%"  name="Sand"        hex="#ECD798" />
              <PaletteChip cls="seafoam"  role="Tonal · 15%"    name="Seafoam"     hex="#98E5D8" />
              <PaletteChip cls="orange"   role="Accent · 10%"   name="Live Orange" hex="#F9A21B" />
              <PaletteChip cls="gray"     role="Ink · 15%"      name="Dark Gray"   hex="#353747" />
            </div>
          </div>
          <div>
            <h3>Typeset · Montserrat &amp; Quicksand</h3>
            <div className="aw-type">
              <TypeRow label="Display · Montserrat 900" cls="d" text="Steps from the sand." />
              <TypeRow label="Body · Quicksand 500"     cls="b" text="Boutique cabin stays just off the longest freshwater beach in the world." />
              <TypeRow label="Label · Montserrat 700"   cls="l" text="Wasaga Beach · Ontario · MMXXVI" />
            </div>
          </div>
        </section>

        {/* END CTA ---------------------------------------------- */}
        <section className="aw-end">
          <p className="lbl">— Roll the next reel —</p>
          <h3>
            One brief, three <em>deliverables.</em>
          </h3>
          <p>
            Photography, social, website &mdash; same kit, same calendar, one
            year of work documented page by page. We&rsquo;d be glad to roll
            the next one with your brand.
          </p>
          <Link className="aw-cta" href="/contact">
            Begin a project <span className="arr">→</span>
          </Link>
        </section>

        {/* FOOTER ----------------------------------------------- */}
        <footer className="aw-foot">
          <span>
            Designed by <strong>FrameFlow</strong> · Toronto · {client.year ?? "2026"}
          </span>
          <span className="ce">Reel {frameNumber} · ADRIAN&rsquo;S</span>
          <span className="ri">
            <Link href="/portfolio">All Reels →</Link>
          </span>
        </footer>

        {/* PHOTO LIGHTBOX --------------------------------------- */}
        {isOpen && activePhoto && (
          <div
            className="aw-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${activePhoto.slate} — frame ${modalIndex + 1} of ${total}`}
            onClick={() => setModalIndex(null)}
          >
            <button
              type="button"
              className="aw-modal-nav prev"
              aria-label="Previous photo"
              onClick={(e) => {
                e.stopPropagation();
                setModalIndex((i) => (i === null ? null : (i - 1 + total) % total));
              }}
            >
              ←
            </button>

            <div className="aw-modal-stage" onClick={(e) => e.stopPropagation()}>
              <div className="aw-modal-bar top">
                <span className="aw-modal-counter">
                  ★ Frame <b>{String(modalIndex + 1).padStart(2, "0")}</b> / {String(total).padStart(2, "0")}
                </span>
                <span className="aw-modal-brand">ADRIAN&rsquo;S · DAILIES</span>
                <button
                  type="button"
                  className="aw-modal-close"
                  aria-label="Close"
                  onClick={() => setModalIndex(null)}
                >
                  ×
                </button>
              </div>

              <div className="aw-modal-image-wrap">
                <Image
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  fill
                  sizes="(max-width: 880px) 92vw, 880px"
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>

              <div className="aw-modal-bar bot">
                <span className="aw-modal-slate">{activePhoto.slate}</span>
              </div>
            </div>

            <button
              type="button"
              className="aw-modal-nav next"
              aria-label="Next photo"
              onClick={(e) => {
                e.stopPropagation();
                setModalIndex((i) => (i === null ? null : (i + 1) % total));
              }}
            >
              →
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        :global(body:has(.aw-page)) {
          background: #ecd798;
        }
        .aw-page {
          --sand:    #ecd798;
          --sand-d:  #d8c280;
          --sand-l:  #f5e6b8;
          --paper:   #fdf9ec;
          --paper-2: #f7eed8;
          --seafoam: #98e5d8;
          --orange:  #f9a21b;
          --orange-d:#d8830a;
          --gray:    #353747;
          --gray-2:  #4a4d5e;
          --gray-3:  #7a7e90;
          --rule:    rgba(53, 55, 71, 0.18);
          --hand:    #c12c2c;

          --display: "Montserrat", system-ui, sans-serif;
          --body:    "Quicksand", system-ui, sans-serif;
          --hand-f:  "Caveat", cursive;

          background: var(--sand);
          color: var(--gray);
          font-family: var(--body);
          font-weight: 400;
          font-size: 16px;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
          position: relative;
        }
        .aw-page :global(a) { color: inherit; text-decoration: none; }
        .aw-page :global(img) { display: block; max-width: 100%; }

        /* TOP RAIL */
        .aw-rail {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 16px;
          padding: 14px 32px;
          background: var(--gray);
          color: var(--sand-l);
          font-family: var(--display);
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
        }
        .aw-rail-back { color: var(--sand-l); }
        .aw-rail-back:hover { color: var(--orange); }
        .aw-rail-center {
          text-align: center;
          color: var(--seafoam);
          letter-spacing: 0.5em;
          white-space: nowrap;
        }
        .aw-rail-meta {
          text-align: right;
          color: var(--sand-l);
        }
        .aw-rail-meta b { color: var(--orange); }
        @media (max-width: 720px) {
          .aw-rail { grid-template-columns: 1fr; gap: 4px; text-align: center; padding: 12px 16px; }
          .aw-rail-back, .aw-rail-meta { text-align: center; }
        }

        /* HERO */
        .aw-hero {
          padding: 100px 48px 80px;
          position: relative;
        }
        .aw-hero::before {
          content: "";
          position: absolute;
          inset: 24px;
          border: 3px double var(--gray);
          pointer-events: none;
          opacity: 0.18;
        }
        .aw-hero-inner {
          max-width: 1480px;
          margin: 0 auto;
          display: grid;
          /* minmax(0, ...) lets the text column shrink below its
             intrinsic min-content (the title's huge unbreakable words
             like "deliverables" at 100px would otherwise blow out the
             track and starve the polaroid column). */
          grid-template-columns: minmax(0, 1fr) minmax(360px, 0.95fr);
          gap: 72px;
          align-items: center;
        }
        .aw-hero-text {
          position: relative;
          z-index: 2;
          min-width: 0;
          /* allow the title to break long words rather than overflow
             when the column is narrow — looks tidier than horizontal
             scroll on mid-width viewports. */
          word-break: normal;
          overflow-wrap: break-word;
        }
        .aw-hero-crumb {
          display: inline-flex;
          gap: 12px;
          padding: 8px 16px;
          background: var(--paper);
          border: 2px solid var(--gray);
          font-family: var(--display);
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--gray);
          margin-bottom: 32px;
          align-items: center;
        }
        .aw-hero-crumb i { color: var(--orange-d); font-style: normal; }
        .aw-hero-title {
          font-family: var(--display);
          font-weight: 900;
          font-size: clamp(48px, 7vw, 104px);
          line-height: 0.95;
          letter-spacing: -0.025em;
          color: var(--gray);
          margin-bottom: 28px;
        }
        .aw-hero-title em {
          font-style: italic;
          color: var(--orange-d);
        }
        .aw-hero-deck {
          font-family: var(--body);
          font-weight: 500;
          font-size: 18px;
          line-height: 1.65;
          color: var(--gray-2);
          max-width: 56ch;
          margin-bottom: 36px;
        }
        .aw-hero-deck b { color: var(--gray); font-weight: 700; }
        .aw-hero-meta {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border-top: 2px solid var(--gray);
          border-bottom: 2px solid var(--gray);
          max-width: 640px;
        }
        .aw-hero-meta > div {
          padding: 14px 16px;
          border-left: 1px solid var(--rule);
        }
        .aw-hero-meta > div:first-child { border-left: 0; padding-left: 0; }
        .aw-hero-meta dt {
          font-family: var(--display);
          font-weight: 700;
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--orange-d);
          margin-bottom: 4px;
        }
        .aw-hero-meta dd {
          font-family: var(--display);
          font-weight: 800;
          font-size: 14px;
          color: var(--gray);
        }

        /* HERO POLAROIDS */
        .aw-hero-polaroids {
          position: relative;
          aspect-ratio: 4 / 5;
          /* Width must be explicit because all children are
             position:absolute and contribute zero to track sizing —
             without this the grid track collapses on browsers that
             measure intrinsic min-content as zero. */
          width: 100%;
          max-width: 540px;
          margin: 0 auto;
          min-width: 0;
        }
        .aw-pola {
          position: absolute;
          width: 56%;
          background: var(--paper);
          border: 0;
          padding: 12px 12px 18px;
          box-shadow: 8px 12px 24px -8px rgba(0,0,0,0.35);
          cursor: pointer;
          font-family: inherit;
          color: inherit;
          text-align: left;
          transition: transform 0.4s, box-shadow 0.4s;
        }
        .aw-pola:hover {
          transform: translateY(-6px) rotate(0deg) !important;
          box-shadow: 10px 16px 28px -8px rgba(0,0,0,0.45);
          z-index: 5;
        }
        .aw-pola .img {
          position: relative;
          display: block;
          width: 100%;
          padding-bottom: 100%;
          height: 0;
          overflow: hidden;
          background: var(--sand-d);
        }
        .aw-pola .img :global(img) {
          position: absolute !important;
          inset: 0;
        }
        .aw-pola .tape {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%) rotate(-3deg);
          width: 84px;
          height: 22px;
          background: rgba(249, 162, 27, 0.7);
          z-index: 2;
        }
        .aw-pola .cap {
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .aw-pola .cap b {
          font-family: var(--display);
          font-weight: 800;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gray);
        }
        .aw-pola .cap i {
          font-family: var(--hand-f);
          font-style: normal;
          font-size: 16px;
          color: var(--orange-d);
          font-weight: 600;
        }
        .pola-1 { top: 0; left: 6%; transform: rotate(-5deg); z-index: 3; }
        .pola-2 { top: 18%; left: 38%; transform: rotate(3deg); z-index: 4; }
        .pola-3 { top: 46%; left: 12%; transform: rotate(-2deg); z-index: 2; }

        @media (max-width: 980px) {
          .aw-hero { padding: 60px 22px; }
          .aw-hero-inner { grid-template-columns: 1fr; gap: 56px; }
          .aw-hero-polaroids { max-width: 380px; }
        }

        /* BRIEF — dark band, perforated edges */
        .aw-brief {
          background: var(--gray);
          color: var(--sand-l);
          padding: 100px 32px;
          position: relative;
        }
        .aw-brief::before, .aw-brief::after {
          content: "";
          position: absolute;
          left: 0; right: 0;
          height: 14px;
          background-image: radial-gradient(circle, var(--sand) 5px, transparent 5.5px);
          background-size: 22px 14px;
          background-position: center;
          background-repeat: repeat-x;
        }
        .aw-brief::before { top: -1px; }
        .aw-brief::after  { bottom: -1px; }
        .aw-brief-inner {
          max-width: 880px;
          margin: 0 auto;
          text-align: center;
        }
        .aw-brief-stamp {
          display: inline-block;
          padding: 6px 14px;
          background: var(--orange);
          color: var(--gray);
          font-family: var(--display);
          font-weight: 800;
          font-size: 10px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          margin-bottom: 28px;
        }
        .aw-brief h2 {
          font-family: var(--display);
          font-weight: 900;
          font-size: clamp(36px, 5.4vw, 72px);
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: var(--paper);
          margin-bottom: 28px;
        }
        .aw-brief h2 em {
          font-style: italic;
          color: var(--orange);
        }
        .aw-brief p {
          font-family: var(--body);
          font-weight: 500;
          font-size: 17px;
          line-height: 1.7;
          color: rgba(245, 230, 184, 0.85);
          max-width: 60ch;
          margin: 0 auto 1em;
        }
        .aw-brief-by {
          margin-top: 18px;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: var(--display);
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--orange);
        }
        .aw-brief-by span {
          display: inline-block;
          width: 28px;
          height: 1px;
          background: var(--orange);
        }

        /* DELIVERABLE HEAD (shared) */
        .aw-del { padding: 100px 48px 0; }
        .aw-del-head {
          max-width: 1280px;
          margin: 0 auto 56px;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 36px;
          align-items: end;
          padding-bottom: 24px;
          border-bottom: 3px solid var(--gray);
        }
        .aw-del-head .num {
          font-family: var(--display);
          font-weight: 900;
          font-size: clamp(80px, 10vw, 144px);
          color: var(--orange-d);
          letter-spacing: -0.05em;
          line-height: 0.85;
        }
        .aw-del-head .text { padding-bottom: 8px; }
        .aw-del-head .label {
          font-family: var(--display);
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--orange-d);
          margin-bottom: 12px;
        }
        .aw-del-head h3 {
          font-family: var(--display);
          font-weight: 900;
          font-size: clamp(32px, 4.4vw, 56px);
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: var(--gray);
        }
        .aw-del-head h3 em { font-style: italic; color: var(--orange-d); }
        .aw-del-head .meta {
          grid-column: 1 / -1;
          display: flex;
          gap: 32px;
          flex-wrap: wrap;
          font-family: var(--display);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--gray-2);
          padding-top: 12px;
        }
        .aw-del-head .meta b { color: var(--orange-d); }

        /* DELIVERABLE 01 — body */
        .aw-del-body {
          max-width: 1280px;
          margin: 0 auto 60px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }
        .aw-approach {
          background: var(--paper);
          border: 2px solid var(--gray);
          padding: 28px 32px;
          box-shadow: 8px 8px 0 var(--gray);
        }
        .aw-approach .lbl {
          font-family: var(--display);
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--orange-d);
          margin-bottom: 18px;
          padding-bottom: 12px;
          border-bottom: 1px dashed var(--rule);
        }
        .aw-approach p {
          font-family: var(--body);
          font-weight: 500;
          font-size: 16px;
          line-height: 1.7;
          color: var(--gray-2);
          margin-bottom: 22px;
        }
        .aw-approach p b { color: var(--gray); font-weight: 700; }
        .aw-approach .cats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          list-style: none;
          padding: 0;
        }
        .aw-approach .cats li {
          padding: 10px 14px;
          background: var(--sand-l);
          border-left: 4px solid var(--orange);
          font-family: var(--display);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gray);
        }
        .aw-approach .cats li b {
          font-family: var(--display);
          font-weight: 900;
          font-size: 16px;
          color: var(--orange-d);
          margin-right: 8px;
        }

        .aw-feature {
          position: relative;
          aspect-ratio: 4 / 5;
          background: var(--paper);
          border: 0;
          padding: 14px;
          box-shadow: 12px 12px 0 var(--orange);
          cursor: pointer;
          width: 100%;
          font-family: inherit;
          color: inherit;
          transition: transform 0.4s, box-shadow 0.4s;
          transform: rotate(-1.2deg);
        }
        .aw-feature:hover {
          transform: rotate(0deg) translateY(-4px);
          box-shadow: 12px 16px 0 var(--orange);
        }
        .aw-feature .img {
          position: relative;
          display: block;
          width: 100%;
          height: calc(100% - 30px);
          overflow: hidden;
          background: var(--sand-d);
        }
        .aw-feature .img :global(img) {
          transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .aw-feature:hover .img :global(img) { transform: scale(1.04); }
        .aw-feature .tape {
          position: absolute;
          z-index: 2;
        }
        .aw-feature .tape.t1 {
          top: -8px;
          left: 12%;
          width: 110px;
          height: 22px;
          background: rgba(249, 162, 27, 0.7);
          transform: rotate(-3deg);
        }
        .aw-feature .tape.t2 {
          top: -6px;
          right: 10%;
          width: 80px;
          height: 18px;
          background: rgba(152, 229, 216, 0.65);
          transform: rotate(2deg);
        }
        .aw-feature .badge {
          position: absolute;
          bottom: 18px;
          left: 22px;
          padding: 6px 12px;
          background: var(--gray);
          color: var(--orange);
          font-family: var(--display);
          font-weight: 800;
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          z-index: 3;
        }
        .aw-feature .zoom {
          position: absolute;
          bottom: 18px;
          right: 22px;
          width: 28px;
          height: 28px;
          background: var(--orange);
          color: var(--gray);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 800;
          opacity: 0;
          transition: opacity 0.3s;
          z-index: 3;
        }
        .aw-feature:hover .zoom { opacity: 1; }

        @media (max-width: 880px) {
          .aw-del { padding: 60px 22px 0; }
          .aw-del-head { grid-template-columns: 1fr; gap: 18px; }
          .aw-del-body { grid-template-columns: 1fr; gap: 32px; }
        }

        /* CONTACT SHEET */
        .aw-sheet {
          max-width: 1280px;
          margin: 0 auto 80px;
          padding: 24px;
          background: var(--paper);
          border: 2px solid var(--gray);
          box-shadow: 8px 8px 0 var(--gray);
        }
        .aw-sheet .lbl {
          text-align: center;
          font-family: var(--display);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--orange-d);
          margin-bottom: 18px;
        }
        .aw-sheet .grid {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 6px;
        }
        .aw-sheet .cell {
          position: relative;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          background: var(--sand-d);
          cursor: pointer;
          border: 0;
          padding: 0;
          width: 100%;
          font-family: inherit;
        }
        .aw-sheet .cell :global(img) { transition: transform 0.6s; }
        .aw-sheet .cell:hover :global(img) { transform: scale(1.05); }
        .aw-sheet .cell:focus-visible { outline: 2px solid var(--orange); outline-offset: 2px; }
        .aw-sheet .cell .num {
          position: absolute;
          bottom: 4px;
          left: 4px;
          padding: 2px 6px;
          background: rgba(53, 55, 71, 0.78);
          color: var(--paper);
          font-family: var(--display);
          font-weight: 700;
          font-size: 9px;
          letter-spacing: 0.18em;
        }
        @media (max-width: 880px) {
          .aw-sheet .grid { grid-template-columns: repeat(4, 1fr); }
        }
        @media (max-width: 540px) {
          .aw-sheet .grid { grid-template-columns: repeat(3, 1fr); }
        }

        /* DELIVERABLE 02 — SOCIAL */
        .aw-social {
          background: var(--seafoam);
          border-top: 3px solid var(--gray);
          border-bottom: 3px solid var(--gray);
          padding: 100px 48px;
          position: relative;
          margin-top: 60px;
        }
        .aw-social::before, .aw-social::after {
          content: "";
          position: absolute;
          left: 0; right: 0;
          height: 14px;
          background-image: radial-gradient(circle, var(--sand) 5px, transparent 5.5px);
          background-size: 22px 14px;
          background-position: center;
          background-repeat: repeat-x;
        }
        .aw-social::before { top: -1px; }
        .aw-social::after  { bottom: -1px; }
        .aw-social-inner { max-width: 1280px; margin: 0 auto; }
        .aw-social .aw-del-head { padding-bottom: 18px; border-bottom-color: var(--gray); margin-bottom: 40px; }
        .aw-social .aw-del-head .num { color: var(--orange-d); }
        .aw-social .aw-del-head .label { color: var(--orange-d); }

        .aw-tpl-card {
          background: var(--paper);
          border: 2px solid var(--gray);
          box-shadow: 8px 8px 0 var(--gray);
          padding: 24px 28px;
          margin-bottom: 48px;
        }
        .aw-tpl-card .head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding-bottom: 14px;
          border-bottom: 2px solid var(--gray);
          margin-bottom: 20px;
          font-family: var(--display);
          font-weight: 900;
          font-size: 18px;
          color: var(--gray);
        }
        .aw-tpl-card .head small {
          font-family: var(--display);
          font-weight: 700;
          font-size: 9px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--orange-d);
        }
        .aw-tpl-card .grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
        }
        .aw-tpl-card .tpl {
          aspect-ratio: 1 / 1;
          background: var(--sand-l);
          border: 2px solid var(--gray);
          padding: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }
        .aw-tpl-card .tpl .num {
          font-family: var(--display);
          font-weight: 700;
          font-size: 9px;
          letter-spacing: 0.28em;
          color: var(--orange-d);
        }
        .aw-tpl-card .tpl .name {
          font-family: var(--display);
          font-weight: 900;
          font-size: 12px;
          color: var(--gray);
          line-height: 1;
        }
        .aw-tpl-card .tpl-postcard::before {
          content: "";
          position: absolute;
          inset: 6px;
          border: 1px solid var(--gray);
        }
        .aw-tpl-card .tpl-polaroid { background: var(--paper); }
        .aw-tpl-card .tpl-polaroid::after {
          content: "";
          position: absolute;
          top: 8px; left: 8px;
          width: calc(100% - 16px);
          height: 55%;
          background: var(--gray);
          opacity: 0.18;
        }
        .aw-tpl-card .tpl-quote { background: var(--orange); }
        .aw-tpl-card .tpl-quote::before {
          content: "“";
          position: absolute;
          top: -6px; right: 10px;
          font-family: var(--display);
          font-weight: 900;
          font-size: 56px;
          color: var(--gray);
          line-height: 0.5;
        }
        .aw-tpl-card .tpl-headline { background: var(--gray); }
        .aw-tpl-card .tpl-headline .num { color: var(--orange); }
        .aw-tpl-card .tpl-headline .name { color: var(--paper); }
        .aw-tpl-card .tpl-aerial::before {
          content: "";
          position: absolute;
          inset: 8px;
          background-image:
            linear-gradient(to right, var(--gray) 0 1px, transparent 1px 100%),
            linear-gradient(to bottom, var(--gray) 0 1px, transparent 1px 100%);
          background-size: 16px 16px;
          opacity: 0.14;
        }
        .aw-tpl-card .tpl-mask { background: var(--gray); }
        .aw-tpl-card .tpl-mask .name { color: var(--orange); }
        .aw-tpl-card .tpl-mask::after {
          content: "STAY";
          position: absolute;
          bottom: 6px; right: 8px;
          font-family: var(--display);
          font-weight: 900;
          font-size: 28px;
          color: rgba(249, 162, 27, 0.45);
          letter-spacing: -0.04em;
        }
        .aw-tpl-card .note {
          margin-top: 18px;
          padding-top: 14px;
          border-top: 1px dashed var(--rule);
          font-family: var(--body);
          font-weight: 500;
          font-size: 14px;
          line-height: 1.55;
          color: var(--gray-2);
        }
        @media (max-width: 880px) {
          .aw-social { padding: 60px 22px; }
          .aw-tpl-card .grid { grid-template-columns: repeat(3, 1fr); }
        }

        .aw-social-lbl {
          font-family: var(--display);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--gray);
          margin-bottom: 16px;
        }
        .aw-social-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
          margin-bottom: 48px;
        }
        .aw-social-grid .p {
          position: relative;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          background: var(--gray);
          border: 2px solid var(--paper);
          box-shadow: 4px 4px 0 var(--gray);
          margin: 0;
          transition: transform 0.4s;
        }
        .aw-social-grid .p:hover { transform: translateY(-4px); }
        .aw-social-grid .p :global(img) { transition: transform 0.8s; }
        .aw-social-grid .p:hover :global(img) { transform: scale(1.04); }
        .aw-social-grid figcaption {
          position: absolute;
          bottom: 6px; right: 6px;
          padding: 2px 8px;
          background: rgba(253, 249, 236, 0.92);
          font-family: var(--display);
          font-weight: 800;
          font-size: 8px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--gray);
        }
        @media (max-width: 880px) { .aw-social-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 480px) { .aw-social-grid { grid-template-columns: repeat(2, 1fr); } }

        .aw-social-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          background: var(--paper);
          border: 2px solid var(--gray);
          box-shadow: 8px 8px 0 var(--gray);
        }
        .aw-social-stats > div {
          padding: 28px 22px;
          text-align: center;
          border-left: 2px solid var(--gray);
        }
        .aw-social-stats > div:first-child { border-left: 0; }
        .aw-social-stats dt {
          font-family: var(--display);
          font-weight: 900;
          font-size: clamp(28px, 4vw, 48px);
          letter-spacing: -0.025em;
          color: var(--gray);
          line-height: 0.9;
          margin-bottom: 6px;
        }
        .aw-social-stats dd {
          font-family: var(--display);
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--orange-d);
        }
        @media (max-width: 600px) { .aw-social-stats { grid-template-columns: 1fr 1fr; } }

        /* DELIVERABLE 03 — WEBSITE */
        .aw-web {
          padding: 100px 48px 80px;
          max-width: 1480px;
          margin: 0 auto;
        }

        .aw-browser {
          background: var(--paper);
          border: 2px solid var(--gray);
          box-shadow: 0 1px 0 rgba(0,0,0,0.06), 18px 18px 0 var(--gray);
          overflow: hidden;
          margin: 56px auto 0;
        }
        .aw-browser .chrome {
          background: var(--sand-d);
          padding: 12px 18px;
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 18px;
          align-items: center;
          border-bottom: 2px solid var(--gray);
        }
        .aw-browser .chrome .dots { display: flex; gap: 6px; }
        .aw-browser .chrome .dots span {
          width: 12px; height: 12px;
          border-radius: 50%;
          background: var(--gray);
          opacity: 0.4;
        }
        .aw-browser .chrome .dots span:first-child { background: var(--orange); opacity: 1; }
        .aw-browser .chrome .url {
          padding: 7px 14px;
          background: var(--paper);
          border: 1px solid var(--gray);
          font-family: var(--display);
          font-weight: 600;
          font-size: 13px;
          color: var(--gray);
        }
        .aw-browser .chrome .url::before { content: "🔒  "; }
        .aw-browser .chrome .live {
          font-family: var(--display);
          font-weight: 700;
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--orange-d);
        }
        .aw-browser .chrome .live::before { content: "● "; }

        .aw-browser .site-nav {
          padding: 18px 28px;
          background: var(--paper);
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 24px;
          align-items: center;
          border-bottom: 1px solid var(--rule);
        }
        .aw-browser .site-nav .logo {
          font-family: var(--display);
          font-weight: 900;
          font-size: 20px;
          letter-spacing: 0.04em;
          color: var(--gray);
          line-height: 1;
        }
        .aw-browser .site-nav .logo small {
          display: block;
          font-family: var(--display);
          font-weight: 600;
          font-size: 8px;
          letter-spacing: 0.4em;
          color: var(--gray-3);
          margin-top: 3px;
        }
        .aw-browser .site-nav .menu {
          display: flex;
          justify-content: center;
          gap: 22px;
          font-family: var(--display);
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gray);
        }
        .aw-browser .site-nav .book {
          padding: 9px 16px;
          background: var(--orange);
          color: var(--gray);
          font-family: var(--display);
          font-weight: 800;
          font-size: 10px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
        }

        .aw-browser .site-hero {
          position: relative;
          aspect-ratio: 16 / 8.5;
          overflow: hidden;
          background: var(--gray);
        }
        .aw-browser .site-hero::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 30%, rgba(53,55,71,0.85));
        }
        .aw-browser .site-hero .text {
          position: absolute;
          bottom: 28px;
          left: 32px;
          right: 32px;
          z-index: 2;
          color: var(--paper);
        }
        .aw-browser .site-hero .text .eyebrow {
          font-family: var(--display);
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--orange);
          margin-bottom: 10px;
        }
        .aw-browser .site-hero .text h2 {
          font-family: var(--display);
          font-weight: 900;
          font-size: clamp(28px, 4vw, 48px);
          line-height: 1;
          margin-bottom: 12px;
        }
        .aw-browser .site-hero .text p {
          font-family: var(--body);
          font-weight: 500;
          font-size: 14px;
          max-width: 60ch;
          color: rgba(253, 249, 236, 0.92);
          margin-bottom: 16px;
        }
        .aw-browser .site-hero .text .book {
          display: inline-block;
          padding: 10px 22px;
          background: var(--orange);
          color: var(--gray);
          font-family: var(--display);
          font-weight: 800;
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }

        .aw-browser .site-cards {
          padding: 36px 28px;
          background: var(--paper);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          border-top: 1px solid var(--rule);
        }
        .aw-browser .site-cards .card {
          border: 1px solid var(--rule);
          padding: 18px;
          display: grid;
          grid-template-columns: 100px 1fr;
          gap: 14px;
        }
        .aw-browser .site-cards .card .ph {
          position: relative;
          width: 100px;
          height: 80px;
          overflow: hidden;
          background: var(--sand-d);
        }
        .aw-browser .site-cards .card .body .lbl {
          font-family: var(--display);
          font-weight: 700;
          font-size: 8px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--orange-d);
          margin-bottom: 4px;
        }
        .aw-browser .site-cards .card .body h3 {
          font-family: var(--display);
          font-weight: 900;
          font-size: 14px;
          color: var(--gray);
          margin-bottom: 4px;
          line-height: 1;
        }
        .aw-browser .site-cards .card .body p {
          font-family: var(--body);
          font-weight: 500;
          font-size: 11px;
          color: var(--gray-2);
          line-height: 1.4;
        }

        .aw-browser .site-foot {
          padding: 24px 28px;
          background: var(--gray);
          color: var(--sand-l);
        }
        .aw-browser .site-foot .row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          gap: 24px;
          padding-bottom: 18px;
          border-bottom: 1px solid rgba(253, 249, 236, 0.18);
          margin: 0;
        }
        .aw-browser .site-foot .row dt {
          font-family: var(--display);
          font-weight: 700;
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--orange);
          margin-bottom: 6px;
        }
        .aw-browser .site-foot .row dd {
          font-family: var(--body);
          font-weight: 500;
          font-size: 11px;
          color: rgba(253, 249, 236, 0.78);
          line-height: 1.6;
          margin: 0;
        }
        .aw-browser .site-foot .credit {
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          font-family: var(--display);
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(253, 249, 236, 0.6);
        }
        .aw-browser .site-foot .credit b {
          color: var(--orange);
          font-weight: 900;
        }
        @media (max-width: 880px) {
          .aw-web { padding: 60px 22px; }
          .aw-browser .site-nav .menu { display: none; }
          .aw-browser .site-cards { grid-template-columns: 1fr; }
          .aw-browser .site-foot .row { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 540px) {
          .aw-browser .site-cards .card { grid-template-columns: 80px 1fr; }
          .aw-browser .site-cards .card .ph { width: 80px; height: 64px; }
        }

        /* SUB-PAGE MINI MOCKUPS + SITEMAP */
        .aw-extras {
          margin: 56px auto 0;
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 36px;
          align-items: start;
        }
        .aw-pages .lbl, .aw-sitemap .lbl {
          font-family: var(--display);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--orange-d);
          margin-bottom: 14px;
        }
        .aw-pages .grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          gap: 14px;
        }
        .aw-pages .mini {
          background: var(--paper);
          border: 2px solid var(--gray);
          box-shadow: 5px 5px 0 var(--gray);
          overflow: hidden;
          transition: transform 0.4s;
        }
        .aw-pages .mini:hover { transform: translateY(-4px); }
        .aw-pages .mini .mc {
          background: var(--sand-d);
          padding: 6px 8px;
          display: flex;
          align-items: center;
          gap: 6px;
          border-bottom: 1px solid var(--gray);
        }
        .aw-pages .mini .mc .dots { display: flex; gap: 3px; }
        .aw-pages .mini .mc .dots span {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--gray);
          opacity: 0.4;
        }
        .aw-pages .mini .mc .dots span:first-child { background: var(--orange); opacity: 1; }
        .aw-pages .mini .mc .url {
          flex: 1;
          padding: 2px 6px;
          background: var(--paper);
          font-family: var(--display);
          font-weight: 600;
          font-size: 8px;
          color: var(--gray);
          border: 1px solid var(--gray);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .aw-pages .mini .mb {
          aspect-ratio: 4 / 3;
          background: var(--paper);
          display: flex;
          flex-direction: column;
        }
        .aw-pages .mini .ph {
          position: relative;
          flex: 1;
          overflow: hidden;
          background: var(--sand-d);
        }
        .aw-pages .mini .cap { padding: 8px 10px 10px; }
        .aw-pages .mini .cap h5 {
          font-family: var(--display);
          font-weight: 900;
          font-size: 11px;
          color: var(--gray);
          line-height: 1.05;
        }
        .aw-pages .mini .cap p {
          font-family: var(--body);
          font-weight: 500;
          font-size: 9px;
          color: var(--gray-2);
          margin-top: 2px;
          line-height: 1.4;
        }

        .aw-sitemap {
          background: var(--paper);
          border: 2px solid var(--gray);
          box-shadow: 8px 8px 0 var(--orange);
          padding: 24px;
        }
        .aw-sitemap h4 {
          font-family: var(--display);
          font-weight: 900;
          font-size: 22px;
          color: var(--gray);
          margin-bottom: 16px;
        }
        .aw-sitemap h4 em { font-style: italic; color: var(--orange-d); }
        .aw-sitemap .tree {
          font-family: var(--display);
          font-weight: 700;
          font-size: 12px;
          color: var(--gray);
          line-height: 2.2;
        }
        .aw-sitemap .tree .node {
          display: inline-block;
          padding: 3px 8px;
          background: var(--sand-l);
          border: 1px solid var(--gray);
          margin-right: 4px;
        }
        .aw-sitemap .tree .node.root { background: var(--orange); }
        .aw-sitemap .tree ul {
          list-style: none;
          padding-left: 18px;
          line-height: 2.4;
          margin: 0;
        }
        .aw-sitemap .tree ul li::before {
          content: "└ ";
          color: var(--orange-d);
        }
        .aw-sitemap .tree p { margin: 0; }

        @media (max-width: 880px) {
          .aw-extras { grid-template-columns: 1fr; gap: 28px; }
          .aw-pages .grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 480px) {
          .aw-pages .grid { grid-template-columns: 1fr; }
        }

        /* LIVE CTA */
        .aw-live-cta {
          margin: 56px auto 0;
          padding: 30px 36px;
          background: var(--orange);
          border: 2px solid var(--gray);
          box-shadow: 10px 10px 0 var(--gray);
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 24px;
          align-items: center;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .aw-live-cta:hover {
          transform: translateY(-3px);
          box-shadow: 13px 13px 0 var(--gray);
        }
        .aw-live-cta .text {
          font-family: var(--display);
          font-weight: 900;
          font-size: clamp(22px, 3vw, 32px);
          letter-spacing: -0.015em;
          color: var(--gray);
          line-height: 1.1;
        }
        .aw-live-cta .text small {
          display: block;
          font-family: var(--body);
          font-weight: 500;
          font-size: 13px;
          color: rgba(53, 55, 71, 0.78);
          margin-top: 6px;
        }
        .aw-live-cta .visit {
          padding: 14px 22px;
          background: var(--gray);
          color: var(--orange);
          font-family: var(--display);
          font-weight: 800;
          font-size: 11px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }
        @media (max-width: 720px) {
          .aw-live-cta { grid-template-columns: 1fr; padding: 22px; }
        }

        /* PROOF — reviews + FF credit */
        .aw-proof {
          background: var(--gray);
          color: var(--sand-l);
          padding: 100px 48px;
          position: relative;
          margin-top: 80px;
        }
        .aw-proof::before, .aw-proof::after {
          content: "";
          position: absolute;
          left: 0; right: 0;
          height: 14px;
          background-image: radial-gradient(circle, var(--sand) 5px, transparent 5.5px);
          background-size: 22px 14px;
          background-position: center;
          background-repeat: repeat-x;
        }
        .aw-proof::before { top: -1px; }
        .aw-proof::after  { bottom: -1px; }
        .aw-proof-inner { max-width: 1280px; margin: 0 auto; }
        .aw-proof-lbl {
          text-align: center;
          font-family: var(--display);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: var(--orange);
          margin-bottom: 16px;
        }
        .aw-proof h2 {
          font-family: var(--display);
          font-weight: 900;
          font-size: clamp(36px, 5vw, 64px);
          letter-spacing: -0.02em;
          color: var(--paper);
          text-align: center;
          margin-bottom: 16px;
        }
        .aw-proof h2 em { font-style: italic; color: var(--orange); }
        .aw-proof-stars {
          text-align: center;
          font-size: 22px;
          letter-spacing: 0.1em;
          color: var(--orange);
          margin-bottom: 56px;
        }
        .aw-proof-stars b {
          font-family: var(--display);
          font-weight: 900;
          font-size: 13px;
          letter-spacing: 0.18em;
          color: var(--paper);
          margin-left: 12px;
          vertical-align: 4px;
        }
        .aw-reviews {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-bottom: 56px;
        }
        .aw-reviews .review {
          background: var(--paper);
          color: var(--gray);
          padding: 24px 26px;
          box-shadow: 4px 6px 14px -4px rgba(0,0,0,0.5);
          transform: rotate(-0.7deg);
        }
        .aw-reviews .review:nth-child(even) { transform: rotate(0.8deg); }
        .aw-reviews .review .stars {
          color: var(--orange);
          font-size: 16px;
          letter-spacing: 0.06em;
          margin-bottom: 12px;
        }
        .aw-reviews .review .stars b {
          font-family: var(--display);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.18em;
          color: var(--gray);
          margin-left: 10px;
          vertical-align: 2px;
        }
        .aw-reviews .review .quote {
          font-family: var(--body);
          font-weight: 500;
          font-size: 15px;
          line-height: 1.65;
          color: var(--gray);
          margin-bottom: 14px;
        }
        .aw-reviews .review .by {
          display: flex;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px dashed var(--rule);
          font-family: var(--display);
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gray-2);
        }
        .aw-reviews .review .by b { color: var(--gray); }
        @media (max-width: 720px) { .aw-reviews { grid-template-columns: 1fr; } }

        .aw-credit {
          max-width: 760px;
          margin: 0 auto;
          padding: 28px 32px;
          border: 2px dashed var(--orange);
          text-align: center;
        }
        .aw-credit .lbl {
          font-family: var(--display);
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--orange);
          margin-bottom: 14px;
        }
        .aw-credit .line {
          font-family: var(--display);
          font-weight: 700;
          font-size: 17px;
          line-height: 1.4;
          color: var(--paper);
        }
        .aw-credit .line b { font-weight: 900; color: var(--orange); }
        .aw-credit .small {
          font-family: var(--body);
          font-weight: 500;
          font-size: 12px;
          color: rgba(245, 230, 184, 0.7);
          margin-top: 8px;
        }

        /* MARKS — palette + type */
        .aw-marks {
          padding: 100px 48px;
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
        }
        .aw-marks h3 {
          font-family: var(--display);
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--orange-d);
          margin-bottom: 24px;
          padding-bottom: 12px;
          border-bottom: 2px solid var(--gray);
        }
        .aw-palette {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .aw-type { display: flex; flex-direction: column; }
        @media (max-width: 880px) {
          .aw-marks { grid-template-columns: 1fr; gap: 48px; padding: 60px 22px; }
        }

        /* END CTA */
        .aw-end {
          padding: 120px 32px 100px;
          max-width: 920px;
          margin: 0 auto;
          text-align: center;
        }
        .aw-end .lbl {
          font-family: var(--display);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: var(--orange-d);
          margin-bottom: 22px;
        }
        .aw-end h3 {
          font-family: var(--display);
          font-weight: 900;
          font-size: clamp(36px, 5vw, 80px);
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: var(--gray);
          margin-bottom: 22px;
        }
        .aw-end h3 em { font-style: italic; color: var(--orange-d); }
        .aw-end p {
          font-family: var(--body);
          font-weight: 500;
          font-size: 17px;
          color: var(--gray-2);
          max-width: 50ch;
          margin: 0 auto 32px;
        }
        .aw-cta {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 16px 28px;
          background: var(--orange);
          color: var(--gray);
          font-family: var(--display);
          font-weight: 800;
          font-size: 12px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          border: 3px solid var(--gray);
          box-shadow: 6px 6px 0 var(--gray);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .aw-cta:hover {
          transform: translateY(-3px);
          box-shadow: 9px 9px 0 var(--gray);
        }
        .aw-cta .arr { transition: transform 0.2s; }
        .aw-cta:hover .arr { transform: translateX(4px); }

        /* FOOTER */
        .aw-foot {
          padding: 22px 32px;
          background: var(--gray);
          color: var(--sand-l);
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 16px;
          align-items: center;
          font-family: var(--display);
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
        }
        .aw-foot strong { color: var(--orange); font-weight: 900; }
        .aw-foot .ce {
          text-align: center;
          color: var(--orange);
          letter-spacing: 0.5em;
        }
        .aw-foot .ri { text-align: right; }
        .aw-foot .ri :global(a):hover { color: var(--seafoam); }
        @media (max-width: 720px) {
          .aw-foot { grid-template-columns: 1fr; gap: 6px; text-align: center; }
          .aw-foot .ri, .aw-foot .ce { text-align: center; }
        }

        /* PHOTO LIGHTBOX */
        .aw-modal {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px;
          background: rgba(53, 55, 71, 0.94);
          animation: aw-fade 0.22s ease-out;
        }
        @keyframes aw-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .aw-modal-stage {
          position: relative;
          width: min(960px, 92vw);
          height: min(92vh, 1080px);
          max-height: 92vh;
          background: var(--paper);
          display: flex;
          flex-direction: column;
          animation: aw-pop 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes aw-pop {
          from { transform: scale(0.96); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        .aw-modal-bar {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          font-family: var(--display);
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--gray-2);
        }
        .aw-modal-bar.top {
          border-bottom: 2px solid var(--gray);
          justify-content: space-between;
        }
        .aw-modal-bar.bot {
          border-top: 2px solid var(--gray);
          justify-content: center;
          letter-spacing: -0.005em;
          text-transform: none;
          font-weight: 700;
          color: var(--gray);
          font-size: 16px;
        }
        .aw-modal-counter b { color: var(--orange-d); font-weight: 900; }
        .aw-modal-brand {
          letter-spacing: 0.32em;
          color: var(--gray);
        }
        .aw-modal-close {
          width: 32px; height: 32px;
          background: var(--gray);
          color: var(--orange);
          border: 0;
          cursor: pointer;
          font-family: var(--display);
          font-size: 16px;
          font-weight: 700;
          line-height: 1;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .aw-modal-close:hover { background: var(--orange); color: var(--gray); }
        .aw-modal-image-wrap {
          flex: 1 1 auto;
          min-height: 0;
          position: relative;
          background: var(--sand-d);
          overflow: hidden;
        }
        .aw-modal-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 56px; height: 56px;
          border-radius: 50%;
          background: var(--paper);
          color: var(--gray);
          border: 2px solid var(--gray);
          cursor: pointer;
          font-family: var(--display);
          font-size: 20px;
          font-weight: 700;
          line-height: 1;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s, background 0.2s;
        }
        .aw-modal-nav:hover {
          transform: translateY(-50%) scale(1.06);
          background: var(--orange);
        }
        .aw-modal-nav.prev { left: 32px; }
        .aw-modal-nav.next { right: 32px; }

        @media (max-width: 880px) {
          .aw-modal { padding: 16px; }
          .aw-modal-nav { width: 44px; height: 44px; font-size: 16px; }
          .aw-modal-nav.prev { left: 8px; }
          .aw-modal-nav.next { right: 8px; }
          .aw-modal-brand { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .aw-modal,
          .aw-modal-stage { animation: none; }
          .aw-modal-close,
          .aw-modal-nav { transition: none; }
          .aw-feature .img :global(img),
          .aw-sheet .cell :global(img),
          .aw-social-grid .p :global(img) { transition: none; }
        }
      `}</style>
    </>
  );
}

/* ---------------------- subcomponents ---------------------- */

type ChipCls = "sand" | "seafoam" | "orange" | "gray";

function PaletteChip({
  cls,
  role,
  name,
  hex,
}: {
  cls: ChipCls;
  role: string;
  name: string;
  hex: string;
}) {
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
          border: 2px solid #353747;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .pchip.sand    { background: #ecd798; }
        .pchip.seafoam { background: #98e5d8; }
        .pchip.orange  { background: #f9a21b; }
        .pchip.gray    { background: #353747; color: #fdf9ec; }
        .role {
          font-family: "Montserrat", system-ui, sans-serif;
          font-weight: 700;
          font-size: 9px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #353747;
          opacity: 0.7;
        }
        .pchip.gray .role { color: #fdf9ec; opacity: 0.7; }
        .name {
          font-family: "Montserrat", system-ui, sans-serif;
          font-weight: 900;
          font-size: 18px;
          letter-spacing: -0.01em;
          margin: 0;
          color: #353747;
        }
        .pchip.gray .name { color: #fdf9ec; }
        .hex {
          font-family: "Montserrat", system-ui, sans-serif;
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.18em;
          margin: 4px 0 0;
          color: #353747;
        }
        .pchip.gray .hex { color: rgba(253, 249, 236, 0.75); }
      `}</style>
    </div>
  );
}

type TypeCls = "d" | "b" | "l";

function TypeRow({
  label,
  cls,
  text,
}: {
  label: string;
  cls: TypeCls;
  text: string;
}) {
  return (
    <div className="trow">
      <p className="label">{label}</p>
      <p className={`specimen ${cls}`}>{text}</p>
      <style jsx>{`
        .trow {
          padding: 18px 0;
          border-top: 1px dashed rgba(53, 55, 71, 0.18);
        }
        .trow:first-child {
          border-top: 0;
          padding-top: 0;
        }
        .label {
          font-family: "Montserrat", system-ui, sans-serif;
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #d8830a;
          margin: 0 0 6px;
        }
        .specimen { margin: 0; }
        .specimen.d {
          font-family: "Montserrat", system-ui, sans-serif;
          font-weight: 900;
          font-size: clamp(28px, 3.4vw, 44px);
          letter-spacing: -0.02em;
          color: #353747;
          line-height: 1;
        }
        .specimen.b {
          font-family: "Quicksand", system-ui, sans-serif;
          font-weight: 500;
          font-size: 17px;
          line-height: 1.5;
          color: #353747;
        }
        .specimen.l {
          font-family: "Montserrat", system-ui, sans-serif;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #353747;
        }
      `}</style>
    </div>
  );
}
