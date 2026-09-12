"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { heroStills, type HeroStill } from "@/data/heroStills";
import { usePointerTilt } from "./usePointerTilt";

/* The director's monitor on the right of the home hero.

   Timing sits on top of the hero's own reveal (lineReveal / fadeUp in
   page.tsx): the third headline line lands at ~1.32s and the CTAs at ~1.52s,
   so the bezel fades in alongside the paragraph and the screen powers on once
   the copy has settled. The first cut lands one hold after that. */
const BEZEL_DELAY_S = 0.56;
const POWER_ON_MS = 1400;
const HOLD_MS = 2200;
const FPS = 24;

const pad = (n: number) => String(n).padStart(2, "0");
const formatTimecode = (frames: number) => {
  const s = Math.floor(frames / FPS);
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(frames % FPS)}`;
};

const SIZES = "(min-width: 1024px) 40vw, (min-width: 768px) 440px, 100vw";

type Props = {
  stills?: readonly HeroStill[];
  /** The hero section. The pointer tilt listens on it, not on the monitor. */
  heroRef: RefObject<HTMLElement | null>;
};

export function HeroMonitor({ stills = heroStills, heroRef }: Props) {
  const reduced = useReducedMotion() ?? false;
  const [idx, setIdx] = useState(0);
  const [live, setLive] = useState<0 | 1>(0);
  const [poweredOn, setPoweredOn] = useState(false);
  const [inView, setInView] = useState(true);
  // Under reduced motion there is no power-on sequence: the screen is simply on.
  const on = reduced || poweredOn;

  const rootRef = useRef<HTMLDivElement>(null);
  const imgA = useRef<HTMLImageElement>(null);
  const imgB = useRef<HTMLImageElement>(null);
  const tcRef = useRef<HTMLSpanElement>(null);
  const elapsedRef = useRef(0);

  const n = stills.length;
  const next = (idx + 1) % n;
  /* Two mounted slots, double-buffered: the hidden one always holds the next
     still, so a cut is a pure opacity flip with nothing to load or decode. */
  const slotA = stills[live === 0 ? idx : next];
  const slotB = stills[live === 1 ? idx : next];
  const current = stills[idx];
  const playing = on && inView && !reduced && n > 1;

  const { rotateX, rotateY } = usePointerTilt(heroRef, { enabled: !reduced });

  // Power on once the first frame can be drawn — never onto an empty screen.
  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    let timer = 0;
    const held = new Promise<void>((resolve) => {
      timer = window.setTimeout(resolve, POWER_ON_MS);
    });
    const first = imgA.current;
    const ready = first ? first.decode().catch(() => undefined) : Promise.resolve();
    Promise.all([held, ready]).then(() => {
      if (!cancelled) setPoweredOn(true);
    });
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [reduced]);

  // Pause the edit while the hero is scrolled away.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.2,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* The cut. A timeout chain gated on the hidden slot's decode, rather than an
     interval: if an image is slow the monitor holds the frame instead of
     cutting to blank. */
  useEffect(() => {
    if (!playing) return;
    const hidden = live === 0 ? imgB.current : imgA.current;
    let cancelled = false;
    let timer = 0;
    const held = new Promise<void>((resolve) => {
      timer = window.setTimeout(resolve, HOLD_MS);
    });
    const ready = hidden ? hidden.decode().catch(() => undefined) : Promise.resolve();
    Promise.all([held, ready]).then(() => {
      if (cancelled) return;
      setIdx((i) => (i + 1) % n);
      setLive((l) => (l === 0 ? 1 : 0));
    });
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [playing, idx, live, n]);

  // Timecode: 24 fps from power-on, written straight to the DOM so nothing re-renders.
  useEffect(() => {
    const el = tcRef.current;
    if (!playing || !el) return;
    const t0 = performance.now() - elapsedRef.current;
    let raf = 0;
    let last = -1;
    const tick = (now: number) => {
      elapsedRef.current = now - t0;
      const frame = Math.floor((elapsedRef.current / 1000) * FPS);
      if (frame !== last) {
        last = frame;
        el.textContent = formatTimecode(frame);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  return (
    <div ref={rootRef} className="relative">
      <motion.div
        data-hero-monitor
        initial={reduced ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: BEZEL_DELAY_S }}
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
        className="relative will-change-transform"
      >
        {/* Brand constants rather than theme tokens: it stays a graphite monitor in light theme. */}
        <div
          aria-hidden
          className="relative border border-amber/30 bg-graphite text-ivory p-2 rounded-[2px] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.6)]"
        >
          {/* chrome strip */}
          <div
            data-on={on}
            className="hm-chrome flex items-center gap-3 border border-amber/30 bg-graphite px-4 py-2.5 mb-2 font-mono text-[9px] uppercase tracking-[0.22em] text-ivory/60"
          >
            <span className="flex items-center gap-2 text-ember">
              <span className="w-1.5 h-1.5 rounded-full bg-ember animate-pulse-dot" />
              REC
            </span>
            <span className="text-ivory/40">·</span>
            <span className="text-amber">{current.clip}</span>
            <span className="ml-auto truncate">{current.client}</span>
          </div>

          {/* screen */}
          <div
            data-on={on}
            className="hm-screen relative aspect-[3/2] overflow-hidden border border-amber/20 bg-graphite rounded-[1px]"
          >
            <div className="hm-slot absolute inset-0" data-live={live === 0}>
              <Image
                ref={imgA}
                src={slotA.src}
                alt=""
                fill
                loading="eager"
                sizes={SIZES}
                className="object-cover"
              />
            </div>
            <div className="hm-slot absolute inset-0" data-live={live === 1}>
              <Image
                ref={imgB}
                src={slotB.src}
                alt=""
                fill
                loading="eager"
                sizes={SIZES}
                className="object-cover"
              />
            </div>

            {/* viewfinder */}
            <div className="hm-vf pointer-events-none absolute inset-0" />
            <span className="hm-mark pointer-events-none absolute top-3 left-3 z-[3] w-3 h-3 border-t border-l border-ivory/60" />
            <span className="hm-mark pointer-events-none absolute top-3 right-3 z-[3] w-3 h-3 border-t border-r border-ivory/60" />
            <span className="hm-mark pointer-events-none absolute bottom-3 left-3 z-[3] w-3 h-3 border-b border-l border-ivory/60" />
            <span className="hm-mark pointer-events-none absolute bottom-3 right-3 z-[3] w-3 h-3 border-b border-r border-ivory/60" />
            <span className="hm-mark pointer-events-none absolute top-1/2 left-1/2 z-[3] w-10 h-10 -translate-x-1/2 -translate-y-1/2 border border-ivory/25" />
            <span className="hm-mark pointer-events-none absolute top-1/2 left-1/2 z-[3] w-6 h-6 -translate-x-1/2 -translate-y-1/2 border border-amber/70" />

            <div className="hm-flash pointer-events-none absolute inset-0 z-[4] bg-ivory opacity-0" />
          </div>

          {/* readout */}
          <div
            data-on={on}
            className="hm-chrome mt-2 flex items-center gap-3 border border-amber/20 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.22em] text-ivory/50"
          >
            <span>35mm</span>
            <span className="text-ivory/30">·</span>
            <span>f/2</span>
            <span className="text-ivory/30">·</span>
            <span>ISO 800</span>
            <span className="ml-auto text-amber tabular-nums">
              <span className="text-ivory/30 mr-2">TC</span>
              <span ref={tcRef}>{reduced ? "00:00:01:24" : "00:00:00:00"}</span>
            </span>
          </div>
        </div>
      </motion.div>

      <p
        data-on={on}
        className="hm-chrome mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-on-surface-60 truncate"
      >
        <span className="text-amber">Now playing</span> — {current.client}{" "}
        <span className="text-on-surface-30">/ {current.slate}</span>
      </p>
    </div>
  );
}
