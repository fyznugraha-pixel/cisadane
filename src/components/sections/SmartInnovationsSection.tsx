import React from "react";
import { Leaf, Camera, TrendingUp, BarChart, QrCode } from "lucide-react";
import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";
import { Dictionary } from "@/i18n/dictionaries";
import Image from "next/image";

export default function SmartInnovationsSection({ dict }: { dict: Dictionary }) {
  const innovations = dict.smartGreen.items;

  // Since we rely on dictionary order, we map icons/images to indices:
  // 0: Zero Carbon
  // 1: CCTV Counting
  // 2: Real-Time Economic Impact
  
  const visualAssets = [
    {
      icon: Leaf,
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
    },
    {
      icon: Camera,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      image: "https://images.unsplash.com/photo-1517646458010-ea6bd9f4a75f?w=800&q=80",
    },
    {
      icon: TrendingUp,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-100",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    }
  ];

  return (
    <section className="section-shell relative px-5 pb-36 pt-20 bg-white">
      <div className="section-inner">
        <SectionHeading
          eyebrow={dict.smartGreen.eyebrow}
          title={dict.smartGreen.title}
          align="left"
        />

        <div className="mt-14 flex flex-col gap-12">
          {/* Top Row: Zero Carbon & CCTV */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {innovations.slice(0, 2).map((item, index) => {
              const asset = visualAssets[index];
              const Icon = asset.icon;
              return (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="border border-[#2654A4]/15 rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                    <div className="p-6 md:p-8 flex items-center gap-4 border-b border-[#2654A4]/5">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${asset.iconBg}`}>
                        <Icon className={asset.iconColor} size={24} strokeWidth={2} />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-[#041020]">{item.title}</h3>
                    </div>
                    <div className="relative h-48 md:h-64 w-full bg-slate-100">
                      <Image 
                        src={asset.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 md:p-8 flex-1">
                      <p className="text-[#041020]/75 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Bottom Row: Economic Impact */}
          {innovations[2] && (
            <Reveal delay={0.2}>
              <div className="border border-[#2654A4]/15 rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-6 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${visualAssets[2].iconBg}`}>
                        <TrendingUp className={visualAssets[2].iconColor} size={24} strokeWidth={2} />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-[#041020]">{innovations[2].title}</h3>
                    </div>
                    
                    <h4 className="text-lg font-bold text-[#041020] mb-4">
                      {innovations[2].description.split(". ")[0]}
                    </h4>
                    <p className="text-[#041020]/75 leading-relaxed mb-8">
                      {innovations[2].description.split(". ")[1]}
                    </p>

                    <div className="space-y-6">
                      {innovations[2].subItems?.map((sub, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="mt-1">
                            {idx === 0 ? <QrCode size={20} className="text-[#38BBCA]" /> : <BarChart size={20} className="text-[#FDB715]" />}
                          </div>
                          <div>
                            <h5 className="font-bold text-[#041020] mb-1">{sub.title}</h5>
                            <p className="text-sm text-[#041020]/70 leading-relaxed">{sub.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Dashboard Image Side */}
                  <div className="relative h-64 lg:h-auto bg-slate-100 hidden md:block">
                     <Image 
                        src={visualAssets[2].image}
                        alt={innovations[2].title}
                        fill
                        className="object-cover"
                      />
                  </div>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
