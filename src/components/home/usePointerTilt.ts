"use client";

import { useEffect, type RefObject } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";

type Options = {
  /** Degrees at the edges of the target. */
  max?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
  enabled?: boolean;
};

/* Springy rotateX/rotateY that follow the pointer across `target`. The listeners
   go on the target (the whole hero), not the tilted element, so the tilt reads
   as the monitor turning toward you wherever you are on the section.

   No-op on touch or coarse pointers and under prefers-reduced-motion: the
   listeners are never attached, the springs sit at 0 and the transform is
   identity. All window access lives inside the effect, so this is SSR-safe. */
export function usePointerTilt(
  target: RefObject<HTMLElement | null>,
  { max = 6, stiffness = 140, damping = 18, mass = 0.6, enabled = true }: Options = {},
): { rotateX: MotionValue<number>; rotateY: MotionValue<number> } {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness, damping, mass });
  const rotateY = useSpring(ry, { stiffness, damping, mass });

  useEffect(() => {
    const el = target.current;
    if (!el || !enabled) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let rect = el.getBoundingClientRect();
    const refresh = () => {
      rect = el.getBoundingClientRect();
    };
    const clamp = (v: number) => Math.max(-1, Math.min(1, v));
    const move = (e: PointerEvent) => {
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      ry.set(clamp(nx) * max);
      rx.set(-clamp(ny) * max);
    };
    const reset = () => {
      rx.set(0);
      ry.set(0);
    };

    el.addEventListener("pointerenter", refresh);
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", reset);
    window.addEventListener("resize", refresh);
    window.addEventListener("scroll", refresh, { passive: true });
    return () => {
      el.removeEventListener("pointerenter", refresh);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", reset);
      window.removeEventListener("resize", refresh);
      window.removeEventListener("scroll", refresh);
      reset();
    };
  }, [target, enabled, max, rx, ry]);

  return { rotateX, rotateY };
}
