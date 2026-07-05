import React from "react";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import RiverSectionDivider from "../RiverSectionDivider";
import SectionOrnaments from "../SectionOrnaments";
import WaterBubbles from "../WaterBubbles";

// Using placeholders for now since actual sponsor images aren't available
const sponsors = [
  "SPONSOR 1",
  "SPONSOR 2",
  "SPONSOR 3",
  "SPONSOR 4",
  "SPONSOR 5",
  "SPONSOR 6",
  "SPONSOR 7",
  "SPONSOR 8"
];

export default function SponsorsSection({ dict }: { dict?: any }) {
  // Duplicate for seamless marquee effect
  const marqueeItems = [...sponsors, ...sponsors, ...sponsors];

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

        <Reveal delay={0.2}>
          <div className="relative flex overflow-hidden group">
            {/* Left and Right Fade for premium look */}
            <div className="absolute top-0 left-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#2654A4] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#2654A4] to-transparent z-10 pointer-events-none" />

            <div className="flex animate-marquee hover:[animation-play-state:paused] active:[animation-play-state:paused] whitespace-nowrap items-center gap-8 md:gap-16 py-4">
              {marqueeItems.map((sponsor, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center min-w-[200px] h-24 px-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_30px_rgba(253,183,21,0.15)] group/logo cursor-default"
                >
                  <span className="font-display font-bold text-xl md:text-2xl text-white/50 tracking-wider group-hover/logo:text-white transition-colors duration-300">
                    {sponsor}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Organic river transition into the Light section (Media Partner) */}
      <RiverSectionDivider className="text-[#FDFBF7]" theme="light" />
    </section>
  );
}
