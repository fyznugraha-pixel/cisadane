import React from "react";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import RiverSectionDivider from "../RiverSectionDivider";
import SectionOrnaments from "../SectionOrnaments";
import WaterBubbles from "../WaterBubbles";

export default function ImpactSection({ dict }: { dict: any }) {
  return (
    <section
      id="impact"
      className="section-shell relative bg-[#2654A4] text-[#FDFBF7] px-5 pb-36 pt-20 overflow-hidden"
    >
      <WaterBubbles theme="dark" hasWaveBottom={true} hasWaveTop={true} />
      <SectionOrnaments dragonScale="strong" shapes="sparkles" lights="right" theme="dark" />

      <div className="section-inner">
        <Reveal>
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

        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {dict.impact.stats.map((stat: any, index: number) => (
            <Reveal key={stat.label} delay={index * 0.1}>
              <div className="group relative flex h-full flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_8px_30px_rgba(253,183,21,0.15)]">
                <div className="mb-4 h-12 w-12 rounded-full bg-gradient-to-br from-[#FDB715] to-[#F7951E] opacity-20 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-30 absolute top-4 left-4" />
                
                <div className="relative z-10">
                  <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-[#FDB715] drop-shadow-sm">
                    {stat.value}
                    {stat.suffix && <span className="text-xl md:text-2xl tracking-normal opacity-80">{stat.suffix}</span>}
                  </h3>
                  <p className="mt-3 text-sm md:text-base font-bold uppercase tracking-wider text-white/80">
                    {stat.label}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Organic river transition into the next section */}
      <RiverSectionDivider className="text-[#FDFBF7]" theme="light" />
    </section>
  );
}
