"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number; // Positive moves slower than scroll (parallax), negative moves faster
  className?: string;
  id?: string;
}

export default function ParallaxSection({
  children,
  speed = 1,
  className = "",
  id,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this specific section relative to the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Apply a spring to the scroll progress to give that "pulled" elastic feeling
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001
  });

  // When smoothProgress goes from 0 to 1 (section enters bottom, leaves top)
  // Map it to a Y translation. 
  // We use 200px to give a more pronounced spreading effect
  const y = useTransform(smoothProgress, [0, 1], [200 * speed, -200 * speed]);

  return (
    <section id={id} ref={ref} className={`relative w-full ${className}`}>
      <motion.div style={{ y }} className="w-full h-full">
        {children}
      </motion.div>
    </section>
  );
}
