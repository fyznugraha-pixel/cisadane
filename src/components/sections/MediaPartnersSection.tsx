import React from "react";
import Reveal from "../Reveal";
import SectionOrnaments from "../SectionOrnaments";
import RiverSectionDivider from "../RiverSectionDivider";
import { assetPath } from "@/lib/asset-path";

const mediaPartners = [
  { name: "TNG TV", image: "/media-patner/tng-tv.png" },
  { name: "KONSER FYP" },
  { name: "Konser Raya" },
  { name: "GAC MUSIC" },
  { name: "KONSER MUSIK FEST" },
  { name: "MEDIA PARTNER EVENT" },
  { name: "BIANG KONSER" },
  { name: "KONSER DAILY" },
  { name: "KONSER TNG RAYA" },
  { name: "KONSER MY MUSIK" },
  { name: "DR DIGITAL MEDIA" },
  { name: "KONSERAN BANTEN" },
  { name: "WARTA TANGERANG" },
  { name: "FOMO EVENT" },
  { name: "SUPPORT KONSER" },
  { name: "TANGKAS AMEBARA" },
  { name: "EVENT TERUS.ID" },
  { name: "PARTNER KONSER" },
  { name: "SOUND DIVISION" },
  { name: "SOUL OF JAKARTA" },
  { name: "KISIKISI.CO" },
  { name: "PRIOK PRIDE KONSER" },
  { name: "JAKARTA MUSIC FEST" },
  { name: "EventHubID" },
  { name: "Tangsel Partim" },
  { name: "WANI KONSERAN BARENG" },
];

export default function MediaPartnersSection() {
  const marqueeItems = [...mediaPartners, ...mediaPartners, ...mediaPartners];

  return (
    <section
      id="media-partners"
      className="section-shell relative bg-[#FDFBF7] text-[#041020] px-5 pb-36 pt-20 overflow-hidden"
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

            <div 
              className="flex animate-marquee hover:[animation-play-state:paused] active:[animation-play-state:paused] whitespace-nowrap items-center gap-6 md:gap-10 py-2"
              style={{ animationDuration: '115s' }}
            >
              {marqueeItems.map((partner, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center min-w-[160px] h-20 px-6 bg-white border border-[#2654A4]/10 rounded-xl transition-all duration-300 hover:border-[#2654A4]/30 hover:shadow-[0_4px_20px_rgba(38,84,164,0.08)] group/logo cursor-default"
                >
                  {partner.image ? (
                    <img 
                      src={assetPath(partner.image)} 
                      alt={partner.name} 
                      className="h-12 w-auto object-contain transition-transform duration-300 group-hover/logo:scale-105" 
                    />
                  ) : (
                    <span className="font-display font-bold text-lg md:text-xl text-[#041020]/40 tracking-wider group-hover/logo:text-[#2654A4] transition-colors duration-300 whitespace-nowrap">
                      {partner.name}
                    </span>
                  )}
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
