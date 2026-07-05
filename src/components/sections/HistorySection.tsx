import React from "react";
import Image from "next/image";
import Reveal from "../Reveal";
import SectionHeading from "../SectionHeading";
import RiverSectionDivider from "../RiverSectionDivider";
import SectionOrnaments from "../SectionOrnaments";
import { MoveRight } from "lucide-react";
import { assetPath } from "@/lib/asset-path";

export default function HistorySection({ dict }: { dict: any }) {
  return (
    <section
      id="history"
      className="section-shell relative bg-[#F9F7F1] text-[#041020] px-5 pb-36 pt-20 overflow-hidden"
    >
      <SectionOrnaments dragonScale="soft" batik shapes="squares" lights="left" theme="light" />

      <div className="section-inner">
        <Reveal>
          <div className="max-w-3xl mb-12">
            <SectionHeading
              eyebrow={dict.history.eyebrow}
              title={dict.history.title}
              description={dict.history.description}
              theme="light"
            />
          </div>
        </Reveal>

        <div className="mt-14 flex snap-x snap-mandatory overflow-x-auto pb-10 gap-6 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0 hide-scrollbar relative z-10">
          {dict.history.items.map((item: any, index: number) => (
            <Reveal key={item.title} delay={index * 0.1} y={20} className="w-[85vw] shrink-0 snap-center md:w-auto md:shrink h-full">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(4,16,32,0.06)] border border-[#2654A4]/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(38,84,164,0.12)]">
                {/* Image Header */}
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-[#2654A4]/20 mix-blend-multiply z-10 group-hover:bg-transparent transition-colors duration-500" />
                  <Image
                    src={assetPath(item.image)}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-20" />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow p-6 pt-2 relative z-30 bg-white">
                  <div className="mb-3 h-1 w-12 bg-gradient-to-r from-[#EC3A24] to-[#FDB715] rounded-full" />
                  <h3 className="font-display text-2xl font-black uppercase leading-tight text-[#2654A4] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#041020]/80">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-3 text-[#2654A4]/60 md:hidden animate-pulse">
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Geser</span>
          <MoveRight size={16} />
        </div>
      </div>

      {/* Organic river transition into the next section */}
      <RiverSectionDivider className="text-[#F9F7F1]" theme="dark" />
    </section>
  );
}
