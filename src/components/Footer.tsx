"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { slugOf } from "@/components/services/Slates";

/* ------------------------------------------------------------------ */
/*  The tail of the reel.                                              */
/*                                                                     */
/*  A footer in a footer's shape — mark, columns, address, the legal   */
/*  line — set as the last strip of film: a row of sprocket holes      */
/*  above and below, every page and scene carrying its frame number,   */
/*  and the page you are on marked as in the gate. It closes on a      */
/*  WRAP slate, the way every page opens on a REC one.                 */
/* ------------------------------------------------------------------ */

/* Exactly the navbar's pages, numbers and taglines, in the navbar's order. */
const PAGES = [
  { href: "/", label: "Home", no: "00" },
  { href: "/services", label: "Services", no: "01" },
  { href: "/about", label: "About", no: "02" },
  { href: "/portfolio", label: "Portfolio", no: "03" },
  { href: "/gallery", label: "Gallery", no: "04" },
  { href: "/contact", label: "Contact", no: "05" },
];

/* The eight slates, by the names on the slates. */
const SCENES = [
  "Logo Design",
  "Brand Identity",
  "Website Design",
  "Social Media",
  "Video & Photo",
  "Ad Management",
  "Web & Mobile Apps",
  "SEO",
];

/* The ticker loops by sliding exactly one half of its track, which only
   reads as endless if both halves are identical and each is wider than any
   viewport. Ten pairs per half is ~4,100px. */
const TICKER_PAIRS = 10;

/* A slim row of perforations. Static — this is the edge of the footer,
   not a feature. */
const Sprockets = () => (
  <div className="ft-sprockets" aria-hidden>
    {Array.from({ length: 96 }).map((_, i) => (
      <i key={i} />
    ))}
  </div>
);

export function Footer() {
  const { theme } = useTheme();
  const pathname = usePathname();
  const year = new Date().getFullYear();

  const inGate = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <footer className="ft">
      {/* ---------- ticker ---------- */}
      <div className="overflow-hidden py-[18px] border-t border-border-subtle" aria-hidden>
        <div className="flex w-max animate-ticker">
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0">
              {Array.from({ length: TICKER_PAIRS }).map((_, i) => (
                <div key={i} className="flex shrink-0">
                  {["Freeze the Frame", "Feel the Flow"].map((line) => (
                    <span
                      key={line}
                      className="font-display text-[16px] italic font-normal text-on-surface-10 px-9 whitespace-nowrap"
                    >
                      {line}
                      <strong className="text-amber opacity-35 not-italic">&nbsp;&#10022;&nbsp;</strong>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ---------- the strip ---------- */}
      <Sprockets />

      <div className="ft-body">
        <div className="ft-grid">
          {/* mark */}
          <div className="ft-brand">
            <Image
              src={theme === "dark" ? "/logo_white.png" : "/logo_black.png"}
              alt="FrameFlow"
              width={160}
              height={46}
              className="h-[64px] w-auto"
            />
            <p className="ft-kicker font-mono">A FrameFlow production</p>
            <p className="ft-blurb font-warm">
              A Toronto studio that shoots brands — identity, web, content and growth,
              produced under one roof since 2021.
            </p>
            <ul className="ft-social">
              {[
                { key: "ig", label: "Instagram" },
                { key: "fb", label: "Facebook" },
                { key: "in", label: "LinkedIn" },
                { key: "bh", label: "Behance" },
              ].map((s) => (
                <li key={s.key}>
                  <a href="#" aria-label={s.label} className="ft-social-a font-display">
                    {s.key}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* pages */}
          <div>
            <p className="ft-h font-mono">Pages</p>
            <ul className="ft-list">
              {PAGES.map((p) => {
                const lit = inGate(p.href);
                return (
                  <li key={p.href}>
                    <Link
                      href={p.href}
                      className={`ft-link${lit ? " is-lit" : ""}`}
                      aria-current={lit ? "page" : undefined}
                    >
                      <span className="ft-no font-mono">{p.no}</span>
                      <span className="ft-label font-warm">{p.label}</span>
                      {lit ? (
                        <span className="ft-gate font-mono">
                          <span className="ft-gate-dot" />
                          in the gate
                        </span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
              {/* Not a link while the portal is in production — the route is
                  proxied back to the homepage (src/proxy.ts). */}
              <li className="ft-link ft-link-off">
                <span className="ft-no font-mono">&nbsp;&nbsp;</span>
                <span className="ft-label font-warm">Client Login</span>
                <span className="ft-gate font-mono">in production</span>
              </li>
            </ul>
          </div>

          {/* scenes */}
          <div>
            <p className="ft-h font-mono">Scenes</p>
            <ul className="ft-list">
              {SCENES.map((s, i) => (
                <li key={s}>
                  <Link href={`/services#${slugOf(s)}`} className="ft-link">
                    <span className="ft-no font-mono">{String(i + 1).padStart(2, "0")}</span>
                    <span className="ft-label font-warm">{s}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* studio */}
          <div>
            <p className="ft-h font-mono">Studio</p>
            <p className="ft-addr font-warm">
              99 Yorkville Ave, Unit 200
              <br />
              Toronto, ON
            </p>
            <p className="ft-h ft-h-2 font-mono">Contact</p>
            <a href="mailto:hello@frameflow.ca" className="ft-mail font-warm">
              hello@frameflow.ca
            </a>
          </div>
        </div>
      </div>

      <Sprockets />

      {/* ---------- WRAP strip: the site's last slate ---------- */}
      <div className="border-t border-border-subtle bg-surface/50 backdrop-blur-sm px-6 md:px-[52px] py-3 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.28em] text-on-surface-60">
        <span className="flex items-center gap-2 text-amber font-semibold">
          <span className="w-2 h-2 rounded-full bg-amber animate-pulse-dot" />
          Wrap
        </span>
        <span>FF_END</span>
        <span className="hidden sm:inline text-on-surface-30">/</span>
        <span>&copy; {year} FrameFlow Digital</span>
        <span className="ml-auto hidden md:inline">Toronto · 43.65N 79.38W</span>
      </div>

      <style jsx global>{`
        .ft {
          background: var(--surface);
          color: var(--on-surface);
        }

        /* the edges of the strip */
        .ft-sprockets {
          display: flex;
          justify-content: center;
          gap: 14px;
          height: 16px;
          align-items: center;
          overflow: hidden;
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
          background: color-mix(in srgb, var(--on-surface) 4%, var(--surface));
        }
        .ft-sprockets i {
          flex: none;
          display: block;
          width: 12px;
          height: 6px;
          border-radius: 1.5px;
          background: color-mix(in srgb, var(--on-surface) 22%, var(--surface));
        }

        .ft-body {
          padding: clamp(40px, 5vw, 64px) clamp(24px, 4vw, 52px) clamp(36px, 4.5vw, 56px);
        }
        .ft-grid {
          max-width: 1500px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr) minmax(0, 1.15fr) minmax(0, 1fr);
          gap: 40px clamp(24px, 4vw, 64px);
        }

        /* mark */
        .ft-kicker {
          margin: 14px 0 0;
          font-size: 9px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--on-surface-30);
        }
        .ft-blurb {
          margin: 12px 0 0;
          max-width: 300px;
          font-size: 13.5px;
          font-weight: 300;
          line-height: 1.7;
          color: var(--on-surface-60);
        }
        .ft-social {
          margin: 22px 0 0;
          padding: 0;
          list-style: none;
          display: flex;
          gap: 10px;
        }
        .ft-social-a {
          width: 34px;
          height: 34px;
          border: 1px solid var(--border-subtle);
          border-radius: 1px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          color: var(--on-surface-30);
          text-decoration: none;
          transition:
            border-color 200ms ease,
            color 200ms ease;
        }
        .ft-social-a:hover {
          border-color: var(--color-amber);
          color: var(--color-amber);
        }

        /* columns */
        .ft-h {
          margin: 0 0 16px;
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--on-surface-30);
        }
        .ft-h-2 {
          margin-top: 22px;
        }
        .ft-list {
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }
        .ft-link {
          display: inline-flex;
          align-items: baseline;
          gap: 10px;
          text-decoration: none;
          color: var(--on-surface-60);
        }
        .ft-no {
          font-size: 9.5px;
          letter-spacing: 0.18em;
          color: var(--on-surface-30);
          transition: color 220ms ease;
        }
        .ft-label {
          font-size: 14px;
          font-weight: 300;
          line-height: 1.4;
          transition:
            color 220ms ease,
            transform 320ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ft-link:hover .ft-label,
        .ft-link:focus-visible .ft-label {
          color: var(--color-amber);
          transform: translateX(3px);
        }
        .ft-link:hover .ft-no,
        .ft-link:focus-visible .ft-no {
          color: var(--color-amber);
        }
        .ft-link:focus-visible {
          outline: 2px solid var(--color-amber);
          outline-offset: 3px;
        }
        /* the page you are on */
        .ft-link.is-lit .ft-label {
          color: var(--on-surface);
        }
        .ft-link.is-lit .ft-no {
          color: var(--color-amber);
        }
        .ft-gate {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 8.5px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--on-surface-30);
        }
        .ft-link.is-lit .ft-gate {
          color: var(--color-ember);
        }
        .ft-gate-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--color-ember);
          animation: pulse-dot 2s ease-in-out infinite;
        }
        .ft-link-off {
          color: var(--on-surface-30);
          cursor: not-allowed;
          user-select: none;
        }

        .ft-addr {
          margin: 0;
          font-size: 14px;
          font-weight: 300;
          line-height: 1.7;
          color: var(--on-surface-60);
        }
        .ft-mail {
          font-size: 14px;
          font-weight: 300;
          color: var(--color-amber);
          text-decoration: none;
        }
        .ft-mail:hover {
          text-decoration: underline;
          text-underline-offset: 4px;
        }

        @media (max-width: 1023px) {
          .ft-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .ft-brand {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 560px) {
          .ft-grid {
            grid-template-columns: minmax(0, 1fr);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ft-label,
          .ft-no {
            transition: none;
          }
          .ft-gate-dot {
            animation: none;
          }
        }
      `}</style>
    </footer>
  );
}
