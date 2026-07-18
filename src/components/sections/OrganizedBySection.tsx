import React from "react";
import Reveal from "../Reveal";
import SectionOrnaments from "../SectionOrnaments";
import WaterBubbles from "../WaterBubbles";
import RiverSectionDivider from "../RiverSectionDivider";
import Image from "next/image";
import { assetPath } from "@/lib/asset-path";

const organizedBy = [
  { name: "Organized By", image: "/partners/organized/organized_1.png" }
];

export default function OrganizedBySection() {
  return (
    <section
      id="organized-by"
      className="section-shell relative bg-[#2654A4] text-[#FDFBF7] px-5 pb-36 pt-20 overflow-hidden"
    >
      <WaterBubbles theme="dark" hasWaveBottom={true} hasWaveTop={true} />
      <SectionOrnaments dragonScale="strong" shapes="sparkles" lights="right" theme="dark" />

      <div className="section-inner relative z-10">
        <Reveal>
          <div className="flex flex-col items-center gap-12">
            <div className="text-center">
              <h2 className="font-display text-3xl md:text-4xl font-black uppercase tracking-tight text-[#FDFBF7] mb-4">
                Organized By
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-[#FDB715] to-[#F7951E] mx-auto rounded-full" />
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {organizedBy.map((org, index) => (
                <div key={index} className="flex items-center justify-center p-6 bg-white rounded-2xl shadow-hard transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-hard-hover">
                  <div className="relative h-20 w-48 md:h-24 md:w-56">
                    <Image src={assetPath(org.image)} alt={org.name} fill className="object-contain" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Since Tactlink Support is also blue, we don't need a divider or we can just omit it so they merge seamlessly. But let's check if we want a divider. We will omit it for seamless blue background. */}
    </section>
  );
}
