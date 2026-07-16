"use client";

import FlipCard from "./FlipCard";
import { GachaCardBack, GachaCardFront } from "./GachaCard";

export default function GachaCardExample() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#08080c] p-8">
      <FlipCard
        rarity="legendary"
        radiusClass="rounded-2xl"
        className="w-64"
        backContent={<GachaCardBack />}
        frontContent={
          <GachaCardFront
            rarity="legendary"
            title="Sang Penunggu Fajar"
            description="Muncul sekali dalam seribu pull. Kabarnya membawa keberuntungan bagi yang menemukannya."
          >
            {/* ganti dengan <img> atau ilustrasi asli kamu */}
            <span className="text-white/30 text-xs">art slot</span>
          </GachaCardFront>
        }
      />
    </div>
  );
}
