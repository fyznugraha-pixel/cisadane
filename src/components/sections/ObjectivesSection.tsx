import React from "react";
import { User, Scroll, Store, Waves } from "lucide-react";
import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";
import RiverSectionDivider from "../RiverSectionDivider";
import WaterBubbles from "../WaterBubbles";
import SectionOrnaments from "../SectionOrnaments";
import { Dictionary } from "@/i18n/dictionaries";

export default function ObjectivesSection({ dict }: { dict: Dictionary }) {
  const icons = [User, Scroll, Store, Waves];

  return (
    <section className="section-shell relative px-5 pb-36 pt-20 bg-[#FDFBF7] text-[#041020]">
      <WaterBubbles theme="light" hasWaveBottom={true} hasWaveTop={true} />
      <SectionOrnaments dragonScale="strong" shapes="sparkles" lights="right" theme="light" />
      <div className="section-inner">
        <SectionHeading
          eyebrow={dict.objectives.eyebrow}
          title={dict.objectives.title}
          align="center"
          theme="light"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4 relative z-10">
          {dict.objectives.items.map((item: any, index: number) => {
            const Icon = icons[index % icons.length];
            return (
              <Reveal key={item.title} delay={index * 0.1} y={20} className="h-full">
                <div className="group relative flex h-full flex-col items-center text-center overflow-hidden rounded-2xl bg-white p-8 shadow-[0_8px_30px_rgba(4,16,32,0.06)] border border-[#2654A4]/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(38,84,164,0.12)]">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2654A4] to-[#1a3f7a] text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[#2654A4] mb-4">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm leading-relaxed text-[#041020]/80">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Organic river transition into the next section */}
      <RiverSectionDivider className="text-[#2654A4]" />
    </section>
  );
}
