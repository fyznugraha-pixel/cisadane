import React from "react";
import { User, Scroll, Store, Waves } from "lucide-react";
import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";
import RiverSectionDivider from "../RiverSectionDivider";
import { Dictionary } from "@/i18n/dictionaries";

export default function ObjectivesSection({ dict }: { dict: Dictionary }) {
  const icons = [User, Scroll, Store, Waves];

  return (
    <section className="section-shell relative px-5 pb-36 pt-20 bg-[#2654A4] text-[#FDFBF7]">
      <div className="section-inner">
        <SectionHeading
          eyebrow={dict.objectives.eyebrow}
          title={dict.objectives.title}
          align="left"
          theme="dark"
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {dict.objectives.items.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <Reveal key={index} delay={index * 0.1}>
                <div className="bg-[#FDFBF7] p-8 rounded-xl border border-[#2654A4]/10 h-full flex flex-col hover-rise transition-all duration-300 shadow-sm hover:shadow-md">
                  <div className="bg-[#2654A4] w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-sm">
                    <Icon className="text-white" size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#2654A4] mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[#041020]/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Organic river transition into the light section */}
      <RiverSectionDivider className="text-[#FDFBF7]" theme="light" />
    </section>
  );
}
