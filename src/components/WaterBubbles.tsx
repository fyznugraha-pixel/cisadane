"use client";

import { useEffect, useState } from "react";

type Bubble = {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
  colorClass: string;
};

export default function WaterBubbles({ theme = "light" }: { theme?: "light" | "dark" }) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    // Generate 15-20 bubbles per section
    const bubbleCount = Math.floor(Math.random() * 6) + 15;
    const newBubbles: Bubble[] = [];

    // Light theme (cerah): biru air & putih bening
    const lightColors = [
      "bg-[#38BBCA]/15 border border-[#38BBCA]/30",
      "bg-white/40 border border-white/60"
    ];
    
    // Dark theme (biru): putih bening seperti gelembung asli
    const darkColors = [
      "bg-white/10 border border-white/30",
      "bg-white/20 border border-white/40"
    ];
    
    const colors = theme === "light" ? lightColors : darkColors;

    for (let i = 0; i < bubbleCount; i++) {
      newBubbles.push({
        id: i,
        size: Math.floor(Math.random() * 45) + 15, // 15px to 60px
        left: Math.random() * 100,
        duration: Math.random() * 12 + 8, // 8s to 20s
        delay: Math.random() * 8,
        colorClass: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    setBubbles(newBubbles);
  }, [theme]);

  // If no bubbles yet (SSR), render empty
  if (bubbles.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {bubbles.map((b) => (
        <div
          key={b.id}
          className={`absolute rounded-full backdrop-blur-[2px] shadow-sm ${b.colorClass}`}
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
            bottom: -100,
            animation: `bubbleRise ${b.duration}s ease-in ${b.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
