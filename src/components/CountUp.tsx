"use client";

import React, { useEffect, useRef } from "react";
import { useInView, useMotionValue, useTransform, motion, animate } from "framer-motion";

export default function CountUp({
  value,
  duration = 2.5,
  className = "",
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const numericString = value.replace(/[^0-9]/g, "");
  const targetNumber = parseInt(numericString, 10) || 0;
  
  const hasDot = value.includes(".");
  const suffix = value.replace(/[0-9.]/g, "");

  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const count = useMotionValue(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, targetNumber, { duration, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, targetNumber, count, duration]);

  const display = useTransform(count, (current) => {
    const rounded = Math.round(current);
    const formatted = hasDot ? rounded.toLocaleString("id-ID") : rounded.toString();
    return `${formatted}${suffix}`;
  });

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
