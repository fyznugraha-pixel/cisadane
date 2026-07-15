"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function FlipCard({
  frontContent,
  backContent,
  className = "",
}: {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  className?: string;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`relative cursor-pointer ${className}`}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ perspective: "1000px" }}
    >
      {/* Invisible dummy content to give the container its natural height based on the front face */}
      <div className="invisible opacity-0 w-full pointer-events-none" aria-hidden="true">
        {frontContent}
      </div>

      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Face (Initial mystery side) */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "translateZ(1px)" }}
        >
          {backContent}
        </div>

        {/* Back Face (The actual lineup info, flipped 180deg) */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg) translateZ(1px)",
          }}
        >
          {frontContent}
        </div>
      </motion.div>
    </div>
  );
}
