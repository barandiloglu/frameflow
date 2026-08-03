"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { WMark } from "@/components/contact/WMark";

/* Every fact here is on the page this replaces — nothing new is promised. */
const STUDIO = {
  email: "hello@frameflow.ca",
  address: "99 Yorkville Ave, Unit 200, Toronto",
  hours: "Mon–Fri · 9am–6pm EST",
  reply: "Replies within 1 business day",
};

type Field = "name" | "email" | "message";
type Status = "idle" | "sending" | "unwired" | "sent";

/* The sending seam. There is no API route and no mail handler yet, so this
   throws rather than inventing a confirmation — the page it replaces generated
   a random case number and told people they were in the queue. */
async function submitContact(_values: Record<Field, string>): Promise<void> {
  throw new Error("NOT_WIRED");
}

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\|<>*—·";

export default function ContactPage() {
  const reduced = useReducedMotion();
  const [values, setValues] = useState<Record<Field, string>>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  /* The mark is positioned under whichever blank has focus. Measured in the
     event handlers rather than an effect — focus and typing are the only things
     that move it. */
  const stageRef = useRef<HTMLDivElement | null>(null);
  const slotRefs = useRef<Partial<Record<Field, HTMLElement | null>>>({});
  const focusedRef = useRef<Field | null>(null);
  const [mark, setMark] = useState<{ x: number; y: number; w: number } | null>(null);

  const placeMark = useCallback((field: Field | null) => {
    const stage = stageRef.current;
    const slot = field ? slotRefs.current[field] : null;
    if (!stage || !slot) {
      setMark(null);
      return;
    }
    const s = stage.getBoundingClientRect();
    const r = slot.getBoundingClientRect();
    setMark({ x: r.left - s.left, y: r.bottom - s.top, w: r.width });
  }, []);

  useEffect(() => {
    const onResize = () => placeMark(focusedRef.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [placeMark]);

  const setField = (field: Field, v: string) => {
    setValues((p) => ({ ...p, [field]: v }));
    requestAnimationFrame(() => placeMark(field));
  };

  const handleFocus = (f: Field) => {
    focusedRef.current = f;
    placeMark(f);
  };
  const handleBlur = () => {
    focusedRef.current = null;
    setMark(null);
  };

  const ready =
    values.name.trim().length > 0 &&
    values.email.trim().length > 0 &&
    values.message.trim().length > 0;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready || status === "sending") return;
    setStatus("sending");
    try {
      await submitContact(values);
      setStatus("sent");
    } catch {
      setStatus("unwired");
    }
  };

  const blankProps = {
    onChange: setField,
    onFocus: handleFocus,
    onBlur: handleBlur,
  };

  return (
    <>
      <Navbar />

      <main className="ct-page">
        <div className="ct-stage" ref={stageRef}>
          {status === "sent" ? (
            <Scrambled reduced={Boolean(reduced)} name={values.name.trim() || "there"} />
          ) : (
            <form onSubmit={onSubmit} className="ct-sentence">
              <p>
                <span className="ct-lead">Hi FrameFlow —</span> I&rsquo;m{" "}
                <Blank
                  field="name"
                  value={values.name}
                  placeholder="your name"
                  slotRef={(el) => {
                    slotRefs.current.name = el;
                  }}
                  {...blankProps}
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
                  slotRef={(el) => {
                    slotRefs.current.email = el;
                  }}
                  {...blankProps}
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
                  slotRef={(el) => {
                    slotRefs.current.message = el;
                  }}
                  {...blankProps}
                />
              </p>

              <div className="ct-actions">
                <button type="submit" className="ct-send" disabled={!ready || status === "sending"}>
                  {status === "sending" ? "Sending…" : "Send it"}
                  <span aria-hidden>→</span>
                </button>

                {status === "unwired" ? (
                  <p className="ct-fallback" role="status">
                    This form isn&rsquo;t connected to a mailbox yet — send it straight to{" "}
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

          {mark ? (
            <motion.div
              className="ct-mark"
              aria-hidden
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1, x: mark.x, y: mark.y }}
              transition={{ duration: reduced ? 0 : 0.28, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <WMark drawn reduced={Boolean(reduced)} className="ct-mark-svg" />
            </motion.div>
          ) : null}
        </div>

        <footer className="ct-foot">
          <a href={`mailto:${STUDIO.email}`}>{STUDIO.email}</a>
          <span>{STUDIO.address}</span>
          <span>{STUDIO.hours}</span>
          <span className="ct-reply">{STUDIO.reply}</span>
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
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 40px;
          padding: 112px clamp(22px, 6vw, 96px) 34px;
          background: var(--surface);
          color: var(--on-surface);
        }
        [data-theme="light"] .ct-page {
          --ct-accent: #a06210;
        }
        .ct-stage {
          position: relative;
          max-width: 1180px;
          width: 100%;
          margin: 0 auto;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

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

        /* Fixed size, aspect preserved — the mark is the logo's own w, so it
           is never stretched to the width of the blank. It straddles the rule
           at the blank's left edge, the way it sits under "flow" in the mark. */
        .ct-mark {
          position: absolute;
          color: var(--ct-accent);
          top: 0;
          left: 0;
          width: 40px;
          height: 23px;
          margin-top: -8px;
          pointer-events: none;
          z-index: 2;
        }
        .ct-mark-svg {
          display: block;
          width: 100%;
          height: 100%;
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
            padding-top: 96px;
            gap: 28px;
          }
          .ct-foot-link {
            margin-left: 0;
          }
        }
        @media (max-width: 560px) {
          /* Clear the theme widget pinned to the bottom-left corner. */
          .ct-page {
            padding-bottom: 72px;
          }
          .ct-mark {
            width: 32px;
            height: 18px;
            margin-top: -6px;
          }
        }
      `}</style>
    </>
  );
}

/* ------------------------------------------------------------------ */

function Blank({
  field,
  value,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  slotRef,
  type = "text",
  multiline = false,
}: {
  field: Field;
  value: string;
  placeholder: string;
  onChange: (f: Field, v: string) => void;
  onFocus: (f: Field) => void;
  onBlur: () => void;
  slotRef: (el: HTMLElement | null) => void;
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
    onFocus: () => onFocus(field),
    onBlur,
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
        ref={slotRef}
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
function Scrambled({ reduced, name }: { reduced: boolean; name: string }) {
  const target = `Thanks, ${name}. It's in — we reply within 1 business day.`;
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
