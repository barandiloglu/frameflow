"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { galleryPhotos } from "@/data/gallery";

/* Every fact here is on the page this replaces — nothing new is promised. */
const STUDIO = {
  email: "hello@frameflow.ca",
  address: "99 Yorkville Ave, Unit 200, Toronto",
  hours: "Mon–Fri · 9am–6pm EST",
  reply: "Replies within 1 business day",
};

/* The margins run two strips of real work, sampled across the roster rather
   than taken in a block so no single client fills a column. */
const REEL_LEFT = [0, 8, 16, 24, 32, 40, 48, 56, 64].map((i) => galleryPhotos[i]);
const REEL_RIGHT = [4, 12, 20, 28, 36, 44, 52, 60, 68].map((i) => galleryPhotos[i]);

type Field = "name" | "email" | "message";
type Status = "idle" | "sending" | "failed" | "sent";

/* The sending seam. /api/contact hands the message to Resend; anything short
   of a 2xx throws so the page shows the mailto fallback rather than inventing
   a confirmation — the page this replaced generated a random case number and
   told people they were in the queue. */
async function submitContact(
  values: Record<Field, string>,
  honeypot: string,
): Promise<void> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...values, company: honeypot }),
  });
  if (!res.ok) throw new Error(`SEND_FAILED_${res.status}`);
}

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\|<>*—·";

export default function ContactPage() {
  const [values, setValues] = useState<Record<Field, string>>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  /* Bots fill every field they can see in the markup; people never reach this
     one. A value here tells the route to drop the message. */
  const [honeypot, setHoneypot] = useState("");

  const setField = (field: Field, v: string) => setValues((p) => ({ ...p, [field]: v }));

  const ready =
    values.name.trim().length > 0 &&
    values.email.trim().length > 0 &&
    values.message.trim().length > 0;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready || status === "sending") return;
    setStatus("sending");
    try {
      await submitContact(values, honeypot);
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  };

  return (
    <>
      <Navbar />

      <main className="ct-page">
        <Reel photos={REEL_LEFT} side="left" />
        <Reel photos={REEL_RIGHT} side="right" />

        <div className="ct-stage">
          {status === "sent" ? (
            <Scrambled name={values.name.trim() || "there"} />
          ) : (
            <form onSubmit={onSubmit} className="ct-sentence">
              <p>
                <span className="ct-lead">Hi FrameFlow —</span> I&rsquo;m{" "}
                <Blank
                  field="name"
                  value={values.name}
                  placeholder="your name"
                  onChange={setField}
                />
                .
              </p>
              <p>
                Reach me at{" "}
                <Blank
                  field="email"
                  type="email"
                  value={values.email}
                  placeholder="you@company.com"
                  onChange={setField}
                />
                .
              </p>
              <p>
                Here&rsquo;s the short version:{" "}
                <Blank
                  field="message"
                  multiline
                  value={values.message}
                  placeholder="what you're building, and where we come in"
                  onChange={setField}
                />
              </p>

              {/* Off-screen rather than display:none — the crawlers worth
                  catching skip hidden inputs. Kept out of the tab order and
                  off the accessibility tree so nobody real ever lands on it. */}
              <div className="ct-trap" aria-hidden>
                <label htmlFor="ct-company">Company</label>
                <input
                  id="ct-company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="ct-actions">
                <button type="submit" className="ct-send" disabled={!ready || status === "sending"}>
                  {status === "sending" ? "Sending…" : "Send it"}
                  <span aria-hidden>→</span>
                </button>

                {status === "failed" ? (
                  <p className="ct-fallback" role="status">
                    That didn&rsquo;t get through — send it straight to{" "}
                    <a
                      href={`mailto:${STUDIO.email}?subject=${encodeURIComponent(
                        "New project",
                      )}&body=${encodeURIComponent(values.message)}`}
                    >
                      {STUDIO.email}
                    </a>{" "}
                    and it reaches the same place.
                  </p>
                ) : null}
              </div>
            </form>
          )}
        </div>

        <Reel photos={[...REEL_LEFT, ...REEL_RIGHT]} side="band" />

        <footer className="ct-foot">
          <a href={`mailto:${STUDIO.email}`}>{STUDIO.email}</a>
          <span>{STUDIO.address}</span>
          <span>{STUDIO.hours}</span>
          <span>{STUDIO.reply}</span>
          <Link href="/portfolio" className="ct-foot-link">
            See the work →
          </Link>
        </footer>
      </main>

      <style jsx global>{`
        /* Page-scoped tokens. --color-amber is 2.68:1 on the ivory surface, so
           light theme gets a darker burnt amber; --ct-quiet is the muted ink,
           mixed toward the surface rather than made translucent so it clears
           4.5:1 in both themes. */
        .ct-page {
          --ct-accent: var(--color-amber);
          --ct-quiet: color-mix(in srgb, var(--on-surface) 78%, var(--surface));
          --ct-rule: color-mix(in srgb, var(--on-surface) 55%, var(--surface));
          /* Derived from the margin the 1180px column actually leaves, less a
             56px gutter, so the strips can never crowd the sentence. */
          --ct-reel-w: clamp(110px, calc((100vw - 1180px) / 2 - 56px), 220px);
          --ct-pad: clamp(22px, 6vw, 96px);
          position: relative;
          overflow: hidden;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 40px;
          padding: 112px var(--ct-pad) 34px;
          background: var(--surface);
          color: var(--on-surface);
        }
        [data-theme="light"] .ct-page {
          --ct-accent: #a06210;
        }
        .ct-stage {
          position: relative;
          z-index: 1;
          max-width: 1180px;
          width: 100%;
          margin: 0 auto;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        /* ---- margin reels ------------------------------------------------
           The empty sides carry the studio's own frames, running slowly in
           opposite directions. Masked away before they reach the type, so they
           read as texture at the edge of vision and never compete with it. */
        .ct-reel {
          position: absolute;
          top: 0;
          bottom: 0;
          width: var(--ct-reel-w);
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent,
            #000 16%,
            #000 84%,
            transparent
          );
          mask-image: linear-gradient(to bottom, transparent, #000 16%, #000 84%, transparent);
        }
        /* The fade toward the type is painted in the page's own ground rather
           than composited into the mask — mask-composite is where the two
           gradients stopped intersecting and the strips ran to the top edge. */
        .ct-reel::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(to var(--ct-reel-fade), transparent 26%, var(--surface));
        }
        .ct-reel-left {
          left: 0;
          --ct-reel-fade: right;
        }
        .ct-reel-right {
          right: 0;
          --ct-reel-fade: left;
        }
        .ct-reel-track {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 0 26px;
          will-change: transform;
          animation: ct-reel-run 96s linear infinite;
        }
        .ct-reel-right .ct-reel-track {
          animation-direction: reverse;
        }
        @keyframes ct-reel-run {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(0, -50%, 0);
          }
        }
        .ct-reel-frame {
          aspect-ratio: 4 / 5;
          overflow: hidden;
          /* Not --surface-alt: it is the *opposite* ground, so an unloaded
             frame would flash ivory on the dark page. */
          background: color-mix(in srgb, var(--on-surface) 8%, var(--surface));
        }
        .ct-reel-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: grayscale(0.55) contrast(0.92);
          opacity: 0.34;
        }
        [data-theme="light"] .ct-reel-frame img {
          opacity: 0.32;
          filter: grayscale(0.55) contrast(0.92) brightness(0.94);
        }
        /* Sprocket holes down the outer edge, so the column reads as film
           rather than a stray row of pictures. */
        .ct-reel::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: 9px;
          background-image: repeating-linear-gradient(
            to bottom,
            var(--ct-rule) 0 9px,
            transparent 9px 25px
          );
          opacity: 0.22;
        }
        .ct-reel-left::before {
          left: 7px;
        }
        .ct-reel-right::before {
          right: 7px;
        }

        /* ---- the same film, laid on its side ------------------------------
           Narrow the window and the margins disappear, but the dead band
           between the sentence and the footer appears in their place. The
           strip moves there rather than the page simply losing its design. */
        .ct-band {
          position: relative;
          z-index: 1;
          /* Full bleed: cancel the page padding so the strip touches both
             edges. Stopping it at the text column made it read as a stray row
             of pictures rather than film running past the frame. */
          width: auto;
          margin: 0 calc(-1 * var(--ct-pad));
          height: clamp(52px, 11vh, 112px);
          overflow: hidden;
          pointer-events: none;
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            #000 9%,
            #000 91%,
            transparent
          );
          mask-image: linear-gradient(to right, transparent, #000 9%, #000 91%, transparent);
        }
        .ct-band .ct-reel-track {
          flex-direction: row;
          height: 100%;
          padding: 8px 0;
          animation-name: ct-reel-run-x;
          animation-duration: 72s;
        }
        @keyframes ct-reel-run-x {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .ct-band .ct-reel-frame {
          aspect-ratio: 3 / 2;
          height: 100%;
          flex: 0 0 auto;
        }
        /* Sprocket rows along both long edges. */
        .ct-band::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
              to right,
              var(--ct-rule) 0 9px,
              transparent 9px 25px
            ),
            repeating-linear-gradient(to right, var(--ct-rule) 0 9px, transparent 9px 25px);
          background-size: 100% 6px, 100% 6px;
          background-position: 0 0, 0 100%;
          background-repeat: no-repeat;
          opacity: 0.22;
          z-index: 1;
        }
        /* The margins take over here. */
        @media (min-width: 1520px) {
          .ct-band {
            display: none;
          }
        }
        /* No vertical room to give it either — the sentence comes first. */
        @media (max-height: 700px) {
          .ct-band {
            display: none;
          }
        }

        /* Below this there is no spare margin to give them. */
        @media (max-width: 1519px) {
          .ct-reel {
            display: none;
          }
        }

        /* ---- the sentence ------------------------------------------------ */
        /* Direct children only — the fallback paragraph lives inside
           .ct-actions and must not inherit the sentence's display size. */
        .ct-sentence > p {
          margin: 0 0 0.24em;
          font-family: var(--font-editorial);
          font-weight: 300;
          font-size: clamp(24px, 3.3vw, 50px);
          line-height: 1.36;
          letter-spacing: -0.02em;
          color: var(--on-surface);
        }
        .ct-lead {
          color: var(--ct-accent);
        }

        /* A blank sized by its own content: the mirror pseudo-element sets the
           width and the field is laid over it, so the sentence reflows as it is
           typed instead of the field being a fixed box. */
        .ct-slot {
          display: inline-grid;
          vertical-align: baseline;
          max-width: 100%;
          border-bottom: 1px solid var(--ct-rule);
          transition: border-color 200ms ease;
        }
        .ct-slot:focus-within {
          border-bottom-color: var(--ct-accent);
        }
        .ct-slot::after,
        .ct-slot input,
        .ct-slot textarea {
          grid-area: 1 / 1;
          font: inherit;
          letter-spacing: inherit;
          /* The right pad is the caret's room at the end of a full blank; a
             trailing space in the mirror would instead push the sentence's
             punctuation away from the word. */
          padding: 0 0.14em 0.04em 0.06em;
        }
        /* Only the mirror sizes the column. The field's own intrinsic width
           (a bare <input> is ~20 characters wide) would otherwise win and every
           blank would come out the same size regardless of what is in it. */
        .ct-slot::after {
          content: attr(data-value);
          visibility: hidden;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
          min-width: 3ch;
        }
        .ct-slot input,
        .ct-slot textarea {
          width: 100%;
          min-width: 0;
          border: 0;
          outline: none;
          background: none;
          color: var(--ct-accent);
          resize: none;
          overflow: hidden;
        }
        .ct-slot textarea {
          white-space: pre-wrap;
          overflow-wrap: anywhere;
        }
        .ct-slot input::placeholder,
        .ct-slot textarea::placeholder {
          color: var(--ct-quiet);
        }
        .ct-slot-message {
          display: grid;
          width: 100%;
        }

        /* The honeypot: gone from the layout without being display:none. */
        .ct-trap {
          position: absolute;
          left: -9999px;
          width: 1px;
          height: 1px;
          overflow: hidden;
        }

        .ct-actions {
          margin-top: 36px;
          display: flex;
          align-items: center;
          gap: 22px;
          flex-wrap: wrap;
        }
        .ct-send {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 15px 26px;
          border: 0;
          background: var(--color-amber);
          color: var(--color-graphite);
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 200ms ease, opacity 200ms ease;
        }
        .ct-send:hover:not(:disabled) {
          background: var(--color-ember);
          color: var(--color-ivory);
        }
        .ct-send:disabled {
          opacity: 0.34;
          cursor: not-allowed;
        }
        .ct-fallback {
          margin: 0;
          max-width: 48ch;
          font-family: var(--font-warm);
          font-size: 13px;
          line-height: 1.7;
          color: var(--ct-quiet);
        }
        .ct-fallback a {
          color: var(--ct-accent);
        }

        .ct-foot {
          position: relative;
          z-index: 1;
          max-width: 1180px;
          width: 100%;
          margin: 0 auto;
          padding-top: 22px;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px 26px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--ct-quiet);
        }
        .ct-foot a {
          color: var(--ct-accent);
          text-decoration: none;
        }
        .ct-foot-link {
          margin-left: auto;
        }

        .ct-sent p {
          margin: 0;
          font-family: var(--font-editorial);
          font-weight: 300;
          font-size: clamp(24px, 3.3vw, 50px);
          line-height: 1.36;
          letter-spacing: -0.02em;
          color: var(--ct-accent);
        }

        @media (max-width: 900px) {
          .ct-page {
            padding-top: 88px;
            gap: 24px;
          }
          .ct-foot-link {
            margin-left: 0;
          }
        }
        /* The sentence has to hold the screen the way it does on desktop; at
           3.3vw it bottoms out on the 24px floor and reads as small print.
           The footer is traded down to pay for it — five tracked-out mono
           lines were outweighing the sentence itself. */
        @media (max-width: 700px) {
          .ct-sentence > p {
            font-size: clamp(26px, 7vw, 32px);
            line-height: 1.3;
          }
          .ct-actions {
            margin-top: 26px;
          }
          .ct-foot {
            gap: 6px 18px;
            font-size: 9.5px;
            letter-spacing: 0.13em;
            padding-top: 16px;
          }
          /* Taller here: on a phone the strip is the only ornament left, and
             at 93px it read as a stranded sliver under a large void. */
          .ct-band {
            height: clamp(96px, 17vh, 150px);
          }
        }
        @media (max-width: 560px) {
          /* Clear the theme widget pinned to the bottom-left corner. */
          .ct-page {
            padding-bottom: 72px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          /* .ct-band .ct-reel-track sets animation-name at (0,2,0), so the
             bare class alone would lose the cascade and the band would run on. */
          .ct-reel-track,
          .ct-band .ct-reel-track {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}

/* ------------------------------------------------------------------ */

function Reel({
  photos,
  side,
}: {
  photos: typeof REEL_LEFT;
  side: "left" | "right" | "band";
}) {
  const root = side === "band" ? "ct-band" : `ct-reel ct-reel-${side}`;
  return (
    <div className={root} aria-hidden>
      {/* Doubled so the loop closes on itself at -50%. */}
      <div className="ct-reel-track">
        {[...photos, ...photos].map((p, i) => (
          <div className="ct-reel-frame" key={`${side}-${i}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.thumb} alt="" loading="lazy" decoding="async" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Blank({
  field,
  value,
  placeholder,
  onChange,
  type = "text",
  multiline = false,
}: {
  field: Field;
  value: string;
  placeholder: string;
  onChange: (f: Field, v: string) => void;
  type?: string;
  multiline?: boolean;
}) {
  const label = { name: "Your name", email: "Your email address", message: "Your message" }[field];
  const shared = {
    id: `ct-${field}`,
    value,
    placeholder,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(field, e.target.value),
  };

  return (
    <>
      {/* The sentence reads as prose, so each field still needs a real label
          for anyone not seeing it. */}
      <label htmlFor={`ct-${field}`} className="sr-only">
        {label}
      </label>
      <span
        className={`ct-slot${multiline ? " ct-slot-message" : ""}`}
        data-value={value || placeholder}
      >
        {multiline ? (
          <textarea rows={1} {...shared} />
        ) : (
          <input
            type={type}
            size={1}
            autoComplete={field === "email" ? "email" : "name"}
            {...shared}
          />
        )}
      </span>
    </>
  );
}

/* The confirmation reuses the type already on screen: the sentence decodes
   into the reply rather than a success panel replacing it. */
function Scrambled({ name }: { name: string }) {
  const target = `Thanks, ${name}. It's in — we reply within 1 business day.`;
  /* Read once at mount rather than inside the effect — setting state
     synchronously in an effect body cascades a second render. This component
     only ever mounts after a send, so the initialiser never runs on the
     server. */
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [text, setText] = useState(reduced ? target : "");

  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    const id = setInterval(() => {
      frame += 1;
      const settled = Math.floor(frame / 2);
      setText(
        target
          .split("")
          .map((c, i) =>
            i < settled || c === " "
              ? c
              : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)],
          )
          .join(""),
      );
      if (settled >= target.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [reduced, target]);

  return (
    <div className="ct-sent" role="status">
      <p>{text}</p>
    </div>
  );
}
