import React from "react";
import Reveal from "../Reveal";
import RiverSectionDivider from "../RiverSectionDivider";
import SectionOrnaments from "../SectionOrnaments";
import WaterBubbles from "../WaterBubbles";
import ParallaxSection from "../ParallaxSection";
import Image from "next/image";
import { assetPath } from "@/lib/asset-path";

const organizedBy = [
  { name: "Organized By", image: "/partners/organized/organized_1.png" }
];

const sponsoredBy = [
  { name: "Sponsor 1", image: "/partners/sponsored/sponsored_1.png" },
  { name: "Sponsor 2", image: "/partners/sponsored/sponsored_2.png" },
  { name: "Sponsor 3", image: "/partners/sponsored/sponsored_3.png" },
];

const officialPartners = [
  { category: "Official Digital Platform Partner", logos: ["/partners/digital/digital_1.png"] },
  { category: "Official Event Technology Partner", logos: ["/partners/tech/tech_1.png"] },
  { category: "Official Waste Management Partner", logos: ["/partners/waste/waste_1.png", "/partners/waste/waste_2.png"] },
  { category: "Official Transportation Partner", logos: ["/partners/transport/transport_1.png"] },
];

const collaboration = Array.from({ length: 20 }).map((_, i) => ({
  name: `Collaboration ${i + 1}`,
  image: `/partners/collaboration/collaboration_${i + 1}.png`
}));

export default function PartnersSection() {
  const marqueeItems = [...collaboration, ...collaboration];

  return (
    <section
      id="partners"
      className="section-shell relative bg-[#2654A4] text-[#FDFBF7] px-5 pb-36 pt-20 overflow-hidden"
    >
      <WaterBubbles theme="dark" hasWaveBottom={true} hasWaveTop={true} />
      <SectionOrnaments dragonScale="strong" shapes="sparkles" lights="right" theme="dark" />

      <div className="section-inner relative z-10 flex flex-col gap-24">
        
        {/* ORGANIZED BY */}
        <Reveal>
          <div className="flex flex-col items-center gap-8">
            <h3 className="text-sm md:text-base font-black uppercase tracking-[0.2em] text-[#FDB715] text-center">
              Organized By
            </h3>
            <div className="flex flex-wrap justify-center gap-8">
              {organizedBy.map((org, index) => (
                <div key={index} className="flex items-center justify-center p-6 bg-white rounded-2xl shadow-hard transition-all duration-300 hover:scale-105">
                  <div className="relative h-20 w-48 md:h-24 md:w-56">
                    <Image src={assetPath(org.image)} alt={org.name} fill className="object-contain" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* SPONSORED BY */}
        <Reveal delay={0.1}>
          <div className="flex flex-col items-center gap-8">
            <h3 className="text-sm md:text-base font-black uppercase tracking-[0.2em] text-[#FDB715] text-center">
              Sponsored By
            </h3>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {sponsoredBy.map((sponsor, index) => (
                <div key={index} className="flex items-center justify-center p-6 bg-white rounded-2xl shadow-hard transition-all duration-300 hover:scale-105">
                  <div className="relative h-16 w-36 md:h-20 md:w-48">
                    <Image src={assetPath(sponsor.image)} alt={sponsor.name} fill className="object-contain" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* OFFICIAL PARTNERS */}
        <Reveal delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {officialPartners.map((partner, index) => (
              <div key={index} className="flex flex-col items-center gap-4">
                <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/80 text-center h-8 flex items-center">
                  {partner.category}
                </h4>
                <div className="flex flex-wrap justify-center gap-4 w-full">
                  {partner.logos.map((logo, i) => (
                    <div key={i} className="flex flex-1 items-center justify-center p-4 bg-white rounded-xl shadow-hard transition-all duration-300 hover:scale-105 min-w-[120px]">
                      <div className="relative h-12 w-28 md:h-14 md:w-32">
                        <Image src={assetPath(logo)} alt={partner.category} fill className="object-contain" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* COLLABORATION WITH */}
        <ParallaxSection speed={-0.15}>
          <Reveal delay={0.3}>
            <div className="flex flex-col items-center gap-8">
              <h3 className="text-sm md:text-base font-black uppercase tracking-[0.2em] text-[#FDB715] text-center">
                Collaboration With
              </h3>
              
              <div className="relative flex overflow-hidden group w-full max-w-[100vw]">
                {/* Left and Right Fade for premium look */}
                <div className="absolute top-0 left-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#2654A4] to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 right-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#2654A4] to-transparent z-10 pointer-events-none" />

                <div 
                  className="flex animate-marquee hover:[animation-play-state:paused] active:[animation-play-state:paused] whitespace-nowrap items-center gap-6 md:gap-8 py-4"
                  style={{ animationDirection: 'normal', animationDuration: '60s' }}
                >
                  {marqueeItems.map((collab, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center min-w-[140px] h-20 px-4 bg-[#FDFBF7] rounded-xl shadow-hard transition-all duration-300 hover:bg-white hover:-translate-y-1 hover:shadow-hard-hover group/logo cursor-default"
                    >
                      <div className="relative h-12 w-28">
                        <Image 
                          src={assetPath(collab.image)} 
                          alt={collab.name}
                          fill
                          className="object-contain transition-transform duration-300 group-hover/logo:scale-105" 
                        />
                      </div>
                    </div>
                  ))}
                </div>
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
