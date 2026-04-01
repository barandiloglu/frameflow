"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = -100,
      my = -100,
      rx = -100,
      ry = -100;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.left = `${mx}px`;
        dotRef.current.style.top = `${my}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top = `${ry}px`;
      }
      requestAnimationFrame(loop);
    };

    document.addEventListener("mousemove", onMouseMove);
    requestAnimationFrame(loop);

    return () => document.removeEventListener("mousemove", onMouseMove);
  }, []);

  // Hide on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      <div ref={dotRef} className="custom-cursor cursor-dot" />
      <div ref={ringRef} className="custom-cursor cursor-ring" />
    </>
  );
}
