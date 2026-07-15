import React from "react";
import { Leaf, Camera, Recycle, BarChart, CheckCircle2 } from "lucide-react";
import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";
import RiverSectionDivider from "../RiverSectionDivider";
import SectionOrnaments from "../SectionOrnaments";
import WaterBubbles from "../WaterBubbles";
import { Dictionary } from "@/i18n/dictionaries";
import { assetPath } from "@/lib/asset-path";
import Image from "next/image";
import ParallaxSection from "../ParallaxSection";

export default function SmartInnovationsSection({ dict }: { dict: Dictionary }) {
  const innovations = dict.smartGreen.items;
  
  const visualAssets = [
    { 
      image: "/smart-green/penanaman_pohon.jpg",
      icon: Leaf,
      iconColor: "text-green-600",
      iconBg: "bg-green-100"
    },
    { 
      image: "/smart-green/cctv_crowd.png",
      icon: Camera,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100"
    },
    { 
      image: "/smart-green/Waste-Management.jpg",
      icon: Recycle,
      iconColor: "text-green-600",
      iconBg: "bg-green-100"
    }
  ];

  return (
    <section className="section-shell relative px-5 pb-36 pt-20 bg-[#2654A4] text-[#FDFBF7]">
      <WaterBubbles theme="dark" hasWaveBottom={true} hasWaveTop={true} />
      <SectionOrnaments dragonScale="strong" shapes="sparkles" lights="right" theme="dark" />
      <div className="section-inner">
        <SectionHeading
          eyebrow={dict.smartGreen.eyebrow}
          title={dict.smartGreen.title}
          align="left"
          theme="dark"
        />

        <div className="mt-14 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-[var(--space-lg)] relative z-20">
          {innovations.map((item: any, index: number) => {
            const asset = visualAssets[index];
            const speed = (index % 2 === 0) ? 0.3 : 0.6;
            return (
              <ParallaxSection key={item.title} speed={speed}>
                <div className="card card-a h-full">
                  <div className="card-a__image-wrap">
                    <img 
                      src={assetPath(asset.image)}
                      alt={item.title}
                      loading="lazy" 
                    />
                  </div>
                  <div className="card-a__body">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${asset.iconBg}`}>
                        <asset.icon className={asset.iconColor} size={20} strokeWidth={2} />
                      </div>
                      <h3 className="card-a__title mb-0">{item.title}</h3>
                    </div>
                    <p className="card-a__desc" dangerouslySetInnerHTML={{ __html: item.description }}></p>
                  
                  {item.subItems && (
                    <div className="mt-4 space-y-3">
                      {item.subItems.map((sub: any, idx: number) => (
                        <div key={idx} className="flex gap-3">
                          <div className="mt-1 flex-shrink-0">
                            {index === 2 ? (
                              <CheckCircle2 size={16} className="text-green-600" />
                            ) : idx === 0 ? (
                              <Image 
                                src={assetPath("/logo/qris.png")} 
                                alt="QRIS" 
                                width={48} 
                                height={20} 
                                className="object-contain h-4 w-auto" 
                              />
                            ) : (
                              <BarChart size={16} className="text-[#FDB715]" />
                            )}
                          </div>
                          <div>
                            <h5 className="text-[12px] font-bold text-[#042C53] mb-0">{sub.title}</h5>
                            <p className="text-[12px] text-[#5F5E5A] leading-relaxed" dangerouslySetInnerHTML={{ __html: sub.desc }}></p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                </div>
              </ParallaxSection>
            );
          })}
        </div>
      </div>
      
      {/* Organic river transition into the light section */}
      <RiverSectionDivider className="text-[#FDFBF7]" theme="light" />
    </section>
  );
}
