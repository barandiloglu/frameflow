"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Direction = "up" | "left" | "right";

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  once?: boolean;
}

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 30 },
  left: { x: -30, y: 0 },
  right: { x: 30, y: 0 },
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
  once = true,
}: RevealProps) {
  const offset = offsets[direction];
  return (
    <motion.div
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: 0.08 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
