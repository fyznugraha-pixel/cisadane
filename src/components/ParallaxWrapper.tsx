"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, useSpring } from "framer-motion";

export default function ParallaxWrapper({
  children,
  offset = 150, // Increased default offset for stronger effect
  className = "",
}: {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001
  });

  const y = useTransform(smoothProgress, [0, 1], [-offset, offset]);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div ref={ref} style={{ y: shouldReduceMotion ? 0 : y }} className={className}>
      {children}
    </motion.div>
  );
}
