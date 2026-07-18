"use client";

import { motion, useReducedMotion } from "motion/react";
import { ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
  y = 28,
  scale = 1,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  scale?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const initialY = shouldReduceMotion ? 0 : y;
  const initialScale = shouldReduceMotion ? 1 : scale;

  return (
    <motion.div
      initial={{ opacity: 0, y: initialY, scale: initialScale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }} // Spring-like ease out
      className={className}
    >
      {children}
    </motion.div>
  );
}