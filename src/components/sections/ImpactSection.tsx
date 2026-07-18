import React from "react";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import RiverSectionDivider from "../RiverSectionDivider";
import SectionOrnaments from "../SectionOrnaments";
import ParallaxSection from "../ParallaxSection";
import WaterBubbles from "../WaterBubbles";
import CountUp from "../CountUp";

export default function ImpactSection({ dict }: { dict: any }) {
  return (
    <section
      id="impact"
      className="section-shell relative bg-[#2654A4] text-[#FDFBF7] px-5 pb-36 pt-20 overflow-hidden"
    >
      <WaterBubbles theme="dark" hasWaveBottom={true} hasWaveTop={true} />
      <SectionOrnaments dragonScale="strong" shapes="sparkles" lights="right" theme="dark" />

      <div className="section-inner">
        <ParallaxSection speed={0.1} className="relative z-10">
          <Reveal scale={0.9}>
            <div className="mx-auto max-w-3xl text-center mb-16">
              <SectionHeading
                eyebrow={dict.impact.eyebrow}
                title={dict.impact.title}
                description={dict.impact.description}
                align="center"
                theme="dark"
              />
            </div>
          </Reveal>
        </ParallaxSection>

        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none z-0 overflow-hidden">
          <svg viewBox="0 0 100 100" fill="none" className="w-[150vw] h-[150vw] md:w-[100vw] md:h-[100vw] text-[#FDB715] animate-spin-slow" style={{ animationDuration: '60s' }}>
            <path d="M50 0C77.6142 0 100 22.3858 100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0ZM50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90C72.0914 90 90 72.0914 90 50C90 27.9086 72.0914 10 50 10ZM50 20C66.5685 20 80 33.4315 80 50C80 66.5685 66.5685 80 50 80C33.4315 80 20 66.5685 20 50C20 33.4315 33.4315 20 50 20ZM50 30C38.9543 30 30 38.9543 30 50C30 61.0457 38.9543 70 50 70C61.0457 70 70 61.0457 70 50C70 38.9543 61.0457 30 50 30Z" fill="currentColor"/>
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-10 md:gap-16 lg:grid-cols-4 pt-12 pb-24 relative z-10">
          {dict.impact.stats.map((stat: any, index: number) => {
            const speed = (index % 2 === 0) ? 0.3 : 0.6;
            return (
              <ParallaxSection key={stat.label} speed={speed}>
                <Reveal delay={index * 0.15}>
                  <div className="relative flex flex-col items-center justify-center text-center transition-transform duration-700 hover:scale-105">
                    <h3 className="font-display text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-[#FDB715] flex items-center justify-center">
                      <CountUp value={stat.value} duration={2.5} />
                      {stat.suffix && <span className="text-3xl md:text-4xl tracking-normal text-[#FDB715] ml-1">{stat.suffix}</span>}
                    </h3>
                    <div className="mt-4 h-1 w-12 bg-[#EC3A24] mx-auto rounded-full" />
                    <p className="mt-4 text-sm md:text-base font-bold uppercase tracking-[0.2em] text-white">
                      {stat.label}
                    </p>
                  </div>
                </Reveal>
              </ParallaxSection>
            );
          })}
        </div>
      </div>

      {/* Organic river transition into the next section */}
      <RiverSectionDivider className="text-[#FDFBF7]" theme="light" />
    </section>
  );
}
