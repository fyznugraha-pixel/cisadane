import React from "react";
import { Bus, Utensils, Star, Building2, GraduationCap, Briefcase, Newspaper, Users } from "lucide-react";
import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";
import RiverSectionDivider from "../RiverSectionDivider";
import { Dictionary } from "@/i18n/dictionaries";

export default function PentahelixSection({ dict }: { dict: Dictionary }) {
  const pillarIcons = [Bus, Utensils, Star];
  const helixIcons = [Building2, GraduationCap, Briefcase, Newspaper, Users];
  const helixColors = [
    "bg-[#2654A4]", // Pemerintah - Blue
    "bg-[#38BBCA]", // Akademisi - Cyan
    "bg-[#FDB715]", // Bisnis - Yellow
    "bg-[#EC3A24]", // Media - Red
    "bg-[#041020]"  // Komunitas - Dark Navy
  ];

  return (
    <section className="section-shell relative px-5 pb-24 pt-20 bg-white">
      <div className="section-inner">
        <SectionHeading
          eyebrow={dict.strategy.eyebrow}
          title={dict.strategy.title}
          description={dict.strategy.description}
          align="center"
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Pendekatan 3A (Pillars) */}
          <div>
            <h3 className="text-2xl font-black text-[#2654A4] mb-8 uppercase tracking-wide">Pendekatan 3A</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {dict.strategy.pillars.map((pillar, index) => {
                const Icon = pillarIcons[index % pillarIcons.length];
                return (
                  <Reveal key={index} delay={index * 0.1}>
                    <div className="flex flex-col items-center text-center bg-[#FDFBF7] p-6 rounded-2xl border-t-8 border-[#2654A4] shadow-sm h-full hover:-translate-y-2 transition-transform duration-300">
                      <div className="w-16 h-16 rounded-full bg-[#E2E8F8] text-[#2654A4] flex items-center justify-center mb-4">
                        <Icon size={28} strokeWidth={1.5} />
                      </div>
                      <h4 className="text-xl font-bold text-[#041020] mb-3">{pillar.title}</h4>
                      <ul className="text-sm text-[#041020]/70 space-y-2">
                        {pillar.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Kolaborasi Pentahelix */}
          <div>
            <h3 className="text-2xl font-black text-[#2654A4] mb-8 uppercase tracking-wide">Pentahelix</h3>
            <div className="space-y-4">
              {dict.strategy.helix.map((helix, index) => {
                const Icon = helixIcons[index % helixIcons.length];
                const bgColor = helixColors[index % helixColors.length];
                return (
                  <Reveal key={index} delay={index * 0.08} y={10}>
                    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#F9F7F1] transition-colors duration-300 border border-transparent hover:border-[#2654A4]/10 group">
                      <div className={`w-12 h-12 rounded-xl shrink-0 flex items-center justify-center text-white ${bgColor} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={22} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-[#041020] mb-1">{helix.name}</h4>
                        <p className="text-sm text-[#041020]/70 leading-relaxed">{helix.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Organic river transition into the blue section */}
      <RiverSectionDivider className="text-[#2654A4]" />
    </section>
  );
}
