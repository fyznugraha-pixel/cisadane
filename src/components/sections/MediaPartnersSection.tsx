import React from "react";
import Reveal from "../Reveal";
import SectionOrnaments from "../SectionOrnaments";
import RiverSectionDivider from "../RiverSectionDivider";

const mediaPartners = [
  "KOMPAS",
  "TRIBUN NEWS",
  "TRANS 7",
  "METRO TV",
  "ANTARA",
  "BANTEN TV",
  "TANGERANG HITS",
  "RADIO KIS FM"
];

export default function MediaPartnersSection() {
  const marqueeItems = [...mediaPartners, ...mediaPartners, ...mediaPartners];

  return (
    <section
      id="media-partners"
      className="section-shell relative bg-[#FDFBF7] text-[#041020] px-5 pb-24 pt-16 overflow-hidden"
    >

      <div className="section-inner">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-black uppercase tracking-tight text-[#2654A4] mb-4">
              Mitra Media
            </h2>
            <div className="h-1 w-16 bg-gradient-to-r from-[#2654A4] to-[#38BBCA] mx-auto rounded-full" />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="relative flex overflow-hidden group mt-10">
            {/* Left and Right Fade */}
            <div className="absolute top-0 left-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#FDFBF7] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#FDFBF7] to-transparent z-10 pointer-events-none" />

            <div className="flex animate-marquee hover:[animation-play-state:paused] active:[animation-play-state:paused] whitespace-nowrap items-center gap-6 md:gap-10 py-2">
              {marqueeItems.map((partner, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center min-w-[160px] h-20 px-6 bg-white border border-[#2654A4]/10 rounded-xl transition-all duration-300 hover:border-[#2654A4]/30 hover:shadow-[0_4px_20px_rgba(38,84,164,0.08)] group/logo cursor-default"
                >
                  <span className="font-display font-bold text-lg md:text-xl text-[#041020]/40 tracking-wider group-hover/logo:text-[#2654A4] transition-colors duration-300">
                    {partner}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Organic river transition into the Tactlink (Blue) section */}
      <RiverSectionDivider className="text-[#2654A4]" theme="dark" />
    </section>
  );
}
