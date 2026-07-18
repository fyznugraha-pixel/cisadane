import React from "react";
import { Dictionary } from "@/i18n/dictionaries";
import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";
import RiverSectionDivider from "../RiverSectionDivider";
import WaterBubbles from "../WaterBubbles";
import SectionOrnaments from "../SectionOrnaments";
import TiltCard from "../TiltCard";
import ParallaxSection from "../ParallaxSection";

const CultureIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
    <path d="M12 22C12 22 4 16 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10C20 16 12 22 12 22Z" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14Z" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 10V10.01" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RiverIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
    <path d="M2 12C2 12 5 9 12 9C19 9 22 12 22 12" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 16C2 16 5 13 12 13C19 13 22 16 22 16" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 20C2 20 5 17 12 17C19 17 22 20 22 20" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EconomyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
    <path d="M3 6L5 18H19L21 6H3Z" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 10C10 11.1046 10.8954 12 12 12C13.1046 12 14 11.1046 14 10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EnvironmentIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
    <path d="M12 22V12" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 12C12 12 14 10 16 10C18 10 19 11 19 13C19 15 12 18 12 18" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 12C12 12 10 8 8 8C6 8 5 9 5 11C5 13 12 16 12 16" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function ObjectivesSection({ dict }: { dict: Dictionary }) {
  const icons = [CultureIcon, RiverIcon, EconomyIcon, EnvironmentIcon];

  return (
    <section className="section-shell relative px-5 pb-36 pt-20 bg-[#FDFBF7] text-[#041020]">
      <WaterBubbles theme="light" hasWaveBottom={true} hasWaveTop={true} />
      <SectionOrnaments dragonScale="strong" shapes="sparkles" lights="right" theme="light" />
      <div className="section-inner">
        <ParallaxSection speed={0.1} className="relative z-10">
          <Reveal scale={0.9}>
            <div className="mx-auto max-w-3xl text-center mb-6">
              <SectionHeading
                eyebrow={dict.objectives.eyebrow}
                title={dict.objectives.title}
                align="center"
                theme="light"
              />
            </div>
          </Reveal>
        </ParallaxSection>

        <div className="mt-14 grid gap-[var(--space-lg)] md:grid-cols-2 lg:grid-cols-4 relative z-10 lg:-mb-12">
          {dict.objectives.items.map((item: any, index: number) => {
            const Icon = icons[index % icons.length];
            const colors = ["text-[#FDB715]", "text-[#38BBCA]", "text-[#EC3A24]", "text-[#2654A4]"];
            const bgColors = ["bg-[#FDB715]/10", "bg-[#38BBCA]/10", "bg-[#EC3A24]/10", "bg-[#2654A4]/10"];
            
            // Alternating speeds to create a stretching pull effect
            const speed = (index % 2 === 0) ? 0.3 : 0.6;
            
            return (
              <ParallaxSection key={item.title} speed={speed} className="h-full">
                <div className="card bg-white p-[var(--space-lg)] rounded-[var(--radius-md)] flex flex-col items-center text-center h-full shadow-sm hover:shadow-md transition-shadow">
                  
                  {/* Flat Circle Frame (No Wave) */}
                  <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-full ${bgColors[index % bgColors.length]}`}>
                    <div className={`${colors[index % colors.length]}`}>
                      <Icon />
                    </div>
                  </div>
                  
                  <h3 className="font-[var(--font-heading)] font-medium text-[18px] leading-[1.3] text-[#042C53] mb-[var(--space-xs)]">
                    {item.title}
                  </h3>
                  
                  <p className="font-[var(--font-body)] font-normal text-[14px] leading-[1.6] text-[#5F5E5A] m-0">
                    {item.description}
                  </p>
                </div>
              </ParallaxSection>
            );
          })}
        </div>
      </div>

      {/* Organic river transition into the next section */}
      <RiverSectionDivider className="text-[#2654A4]" />
    </section>
  );
}
