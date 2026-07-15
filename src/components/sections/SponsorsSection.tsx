import React from "react";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import RiverSectionDivider from "../RiverSectionDivider";
import SectionOrnaments from "../SectionOrnaments";
import WaterBubbles from "../WaterBubbles";
import ParallaxSection from "../ParallaxSection";
import Image from "next/image";
import { assetPath } from "@/lib/asset-path";

// Using placeholders for now since actual sponsor images aren't available, except for WAHU
const sponsors = [
  { name: "WAHU", image: "/sponsor/wahu.png" },
  { name: "SPONSOR 2" },
  { name: "SPONSOR 3" },
  { name: "SPONSOR 4" },
  { name: "SPONSOR 5" },
  { name: "SPONSOR 6" },
  { name: "SPONSOR 7" },
  { name: "SPONSOR 8" }
];

export default function SponsorsSection({ dict }: { dict?: any }) {
  // Duplicate an EVEN number of times (e.g. 4) for seamless 50% translation marquee effect
  const marqueeItems = [...sponsors, ...sponsors, ...sponsors, ...sponsors];

  return (
    <section
      id="sponsors"
      className="section-shell relative bg-[#2654A4] text-[#FDFBF7] px-5 pb-36 pt-20 overflow-hidden"
    >
      <WaterBubbles theme="dark" hasWaveBottom={true} hasWaveTop={true} />
      <SectionOrnaments dragonScale="strong" shapes="sparkles" lights="right" theme="dark" />

      <div className="section-inner">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tight text-[#FDFBF7] mb-6">
              Didukung Oleh
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-[#FDB715] to-[#F7951E] mx-auto rounded-full" />
          </div>
        </Reveal>

        <ParallaxSection speed={-0.15}>
          <Reveal delay={0.2}>
            <div className="relative flex overflow-hidden group">
            {/* Left and Right Fade for premium look */}
            <div className="absolute top-0 left-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#2654A4] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#2654A4] to-transparent z-10 pointer-events-none" />

            <div 
              className="flex animate-marquee hover:[animation-play-state:paused] active:[animation-play-state:paused] whitespace-nowrap items-center gap-8 md:gap-16 py-4"
              style={{ animationDirection: 'reverse' }}
            >
              {marqueeItems.map((sponsor, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center min-w-[160px] h-24 px-6 bg-[#FDFBF7] rounded-2xl shadow-hard transition-all duration-300 hover:bg-white hover:-translate-y-1 hover:shadow-hard-hover group/logo cursor-default"
                >
                  {sponsor.image ? (
                    <div className="relative h-12 w-32">
                      <Image 
                        src={assetPath(sponsor.image)} 
                        alt={sponsor.name}
                        fill
                        className="object-contain transition-transform duration-300 group-hover/logo:scale-105" 
                      />
                    </div>
                  ) : (
                    <span className="font-display font-bold text-xl md:text-2xl text-[#041020]/40 tracking-wider group-hover/logo:text-[#2654A4] transition-colors duration-300">
                      {sponsor.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          </Reveal>
        </ParallaxSection>
      </div>

      {/* Organic river transition into the Light section (Media Partner) */}
      <RiverSectionDivider className="text-[#FDFBF7]" theme="light" />
    </section>
  );
}
