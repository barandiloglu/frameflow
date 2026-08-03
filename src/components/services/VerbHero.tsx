"use client";

/* Ported from awwwards text-8 (Animated Verbs II).
 *
 * The source's whole script is `Splitting()` — every effect is per-character
 * CSS keyframes fed by custom properties that Splitting.js writes onto each
 * span. Rather than take the dependency for four numbers, the splitter below
 * writes them itself:
 *
 *   --char-index       0-based position
 *   --char-total       characters in the word
 *   --distance-percent 0 at the centre of the word, 1 at either end
 *   --distance-sine    sin(distance-percent * π/2) — the same 0→1 ramp, eased
 *
 * The technique carried over is the mechanism: one shared `animation`
 * shorthand on .vh-char reading --name/--dur/--del/--tf, so each verb only
 * declares its own keyframes and timing. The source's six verbs (yelling,
 * ghosting, sailing, shivering, fading, rocking) are demo copy; these seven are
 * FrameFlow's services, and each one animates to enact itself. */

const VERBS = [
  { word: "drawing", fx: "draw", service: "Logo Design" },
  { word: "building", fx: "build", service: "Brand Identity" },
  { word: "shipping", fx: "ship", service: "Website Design" },
  { word: "posting", fx: "post", service: "Social Media" },
  { word: "shooting", fx: "shoot", service: "Video & Photo" },
  { word: "running", fx: "run", service: "Ad Management" },
  { word: "coding", fx: "code", service: "Web & Mobile Apps" },
] as const;

export function VerbHero() {
  return (
    <div className="vh">
      <p className="vh-lead">
        <span aria-hidden className="vh-rule" />
        We spend our days
      </p>

      <ul className="vh-list">
        {VERBS.map(({ word, fx, service }, row) => (
          <li key={word} className={`vh-line vh-${fx}`} style={{ ["--row" as string]: row }}>
            {/* The split characters are aria-hidden — read one at a time they
                are noise — so the line's whole meaning is carried here: the
                visible verb first, then the service it stands for. */}
            <span className="sr-only">{`${word} — ${service}`}</span>
            <Split word={word} />
            <span aria-hidden className="vh-tag">
              {service}
            </span>
          </li>
        ))}
      </ul>

      <p className="vh-sub">
        Seven scenes, one full reel — every service in the FrameFlow catalog, shot from the
        same script: strategy first, craft always, no templates, no filler.
      </p>

      <style jsx global>{`
        .vh {
          position: relative;
          z-index: 10;
        }
        .vh-lead {
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 0 0 22px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--accent-ink);
        }
        .vh-rule {
          display: block;
          height: 1px;
          width: 40px;
          background: currentColor;
        }

        .vh-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .vh-line {
          display: flex;
          align-items: baseline;
          gap: clamp(12px, 2vw, 34px);
          font-family: var(--font-editorial);
          font-weight: 300;
          font-size: clamp(38px, 6.4vw, 88px);
          line-height: 1.02;
          letter-spacing: -0.035em;
          color: var(--on-surface);
        }
        /* Every second verb sits in amber so the column reads as a rhythm
           rather than a wall of one colour. */
        .vh-line:nth-child(odd) {
          color: var(--accent-ink);
        }
        .vh-tag {
          font-family: var(--font-mono);
          font-size: clamp(8px, 0.72vw, 10px);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--quiet-ink);
          white-space: nowrap;
        }
        @media (max-width: 699px) {
          .vh-tag {
            display: none;
          }
        }

        .vh-word {
          display: inline-block;
          position: relative;
          white-space: nowrap;
        }
        /* The one shared declaration — each verb below only supplies --name,
           --dur, --del and --tf. This is text-8's actual reusable idea. */
        .vh-char {
          display: inline-block;
          position: relative;
          animation: var(--name) var(--dur, 2s) var(--tf, ease) var(--del, 0s) infinite;
        }

        .vh-sub {
          margin: 34px 0 0;
          max-width: 620px;
          font-family: var(--font-warm);
          font-size: 15px;
          font-weight: 300;
          line-height: 1.75;
          color: var(--quiet-ink);
        }

        /* --- drawing: each stroke arrives in reading order, left to right --- */
        .vh-draw .vh-char {
          --name: vh-draw;
          --dur: 3.4s;
          --del: calc(var(--char-index) * 0.09s);
          --tf: cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        @keyframes vh-draw {
          0%,
          8% {
            opacity: 0;
            transform: translateY(0.18em) scaleY(0.7);
          }
          22%,
          88% {
            opacity: 1;
            transform: none;
          }
          100% {
            opacity: 0;
            transform: translateY(-0.06em);
          }
        }

        /* --- building: letters stack up and settle, ends last --- */
        .vh-build .vh-char {
          --name: vh-build;
          --dur: 3.6s;
          --del: calc(var(--distance-percent) * 0.34s);
          --tf: cubic-bezier(0.34, 1.4, 0.64, 1);
        }
        @keyframes vh-build {
          0%,
          6% {
            transform: translateY(0.5em);
            opacity: 0;
          }
          26% {
            transform: translateY(0);
            opacity: 1;
          }
          90% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-0.14em);
            opacity: 0;
          }
        }

        /* --- shipping: the whole word leaves frame and returns --- */
        .vh-ship .vh-char {
          --name: vh-ship;
          --dur: 3.2s;
          --del: calc(var(--char-index) * -0.028s);
          --tf: cubic-bezier(0.7, 0, 0.3, 1);
        }
        @keyframes vh-ship {
          0%,
          50% {
            transform: translateX(0);
            opacity: 1;
          }
          56% {
            transform: translateX(0.6em);
            opacity: 0;
          }
          57% {
            transform: translateX(-0.6em);
            opacity: 0;
          }
          64%,
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        /* --- posting: letters pop up one after another, like a feed filling --- */
        .vh-post .vh-char {
          --name: vh-post;
          --dur: 2.6s;
          --del: calc(var(--char-index) * 0.07s);
          --tf: cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes vh-post {
          0%,
          10% {
            transform: translateY(0.34em) scale(0.86);
            opacity: 0;
          }
          26%,
          80% {
            transform: none;
            opacity: 1;
          }
          100% {
            transform: translateY(0.1em);
            opacity: 0;
          }
        }

        /* --- shooting: a shutter snap, brightest at the centre of the word --- */
        .vh-shoot .vh-char {
          --name: vh-shoot;
          --dur: 3s;
          --del: calc(var(--distance-sine) * 0.12s);
          --tf: ease-out;
        }
        @keyframes vh-shoot {
          0%,
          46% {
            transform: none;
            opacity: 1;
          }
          50% {
            transform: scaleY(0.04);
            opacity: 0.25;
          }
          56% {
            transform: scaleY(1.06);
            opacity: 1;
          }
          62%,
          100% {
            transform: none;
            opacity: 1;
          }
        }

        /* --- running: a continuous lope across the word --- */
        .vh-run .vh-char {
          --name: vh-run;
          --dur: 1.5s;
          --del: calc(var(--char-index) * -0.09s);
          --tf: linear;
        }
        @keyframes vh-run {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          30% {
            transform: translateY(-0.11em) rotate(-2deg);
          }
          60% {
            transform: translateY(0.04em) rotate(1.5deg);
          }
        }

        /* --- coding: characters flicker as if being typed over --- */
        .vh-code .vh-char {
          --name: vh-code;
          --dur: 2.4s;
          --del: calc(var(--char-index) * 0.13s);
          --tf: steps(1, end);
        }
        @keyframes vh-code {
          0%,
          44% {
            opacity: 1;
          }
          48% {
            opacity: 0.18;
          }
          52% {
            opacity: 1;
          }
          56% {
            opacity: 0.18;
          }
          60%,
          100% {
            opacity: 1;
          }
        }

        /* The hero is seven infinite loops at once; without this it is a
           migraine, and it is the one thing the source has no gate for. */
        @media (prefers-reduced-motion: reduce) {
          .vh-char {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}

/* Writes the four custom properties text-8 reads off each character. */
function Split({ word }: { word: string }) {
  const chars = [...word];
  const centre = (chars.length - 1) / 2;

  return (
    <span className="vh-word">
      {chars.map((c, i) => {
        const percent = centre === 0 ? 0 : Math.abs(i - centre) / centre;
        return (
          <span
            key={`${c}-${i}`}
            className="vh-char"
            aria-hidden
            style={
              {
                "--char-index": i,
                "--char-total": chars.length,
                "--distance-percent": percent.toFixed(3),
                "--distance-sine": Math.sin((percent * Math.PI) / 2).toFixed(3),
              } as React.CSSProperties
            }
          >
            {c}
          </span>
        );
      })}
    </span>
  );
}
