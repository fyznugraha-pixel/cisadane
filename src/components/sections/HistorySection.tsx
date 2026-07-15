import React from "react";
import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";
import RiverSectionDivider from "../RiverSectionDivider";
import SectionOrnaments from "../SectionOrnaments";
import WaterBubbles from "../WaterBubbles";
import ParallaxSection from "../ParallaxSection";

export default function HistorySection({ dict }: { dict: any }) {
  return (
    <section
      id="history"
      className="section-shell relative bg-[#2654A4] text-[#FDFBF7] px-5 pb-36 pt-20 overflow-hidden"
    >
      <WaterBubbles theme="dark" hasWaveBottom={true} hasWaveTop={true} />
      <SectionOrnaments dragonScale="strong" shapes="sparkles" lights="right" theme="dark" />

      <div className="section-inner">
        <ParallaxSection speed={0.1}>
          <Reveal>
            <div className="max-w-3xl mb-12">
              <SectionHeading
                eyebrow={dict.history.eyebrow}
                title={dict.history.title}
                description={dict.history.description}
                theme="dark"
              />
            </div>
          </Reveal>
        </ParallaxSection>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-0 relative z-10 w-full">
          {dict.history.items.map((item: any, index: number) => {
            const isLast = index === dict.history.items.length - 1;
            const speed = (index % 2 === 0) ? 0.2 : 0.5;
            
            return (
              <ParallaxSection key={item.title} speed={speed}>
                <Reveal delay={0.2 + index * 0.1}>
                  <div className="relative flex flex-col items-center text-center md:px-4">
                    
                    {/* Horizontal Connector (Desktop) */}
                    {!isLast && (
                      <div className="hidden md:block absolute top-[22px] left-[50%] w-full z-0 px-8">
                        <svg viewBox="0 0 300 20" aria-hidden="true" preserveAspectRatio="none" className="w-full h-[20px]">
                          <path d="M0,10 Q150,-4 300,10" fill="none" stroke="#FDB715"
                                strokeWidth="2" strokeDasharray="1 7" strokeLinecap="round"/>
                        </svg>
                      </div>
                    )}

                    {/* Node Circle */}
                    <span className="node-circle !bg-[#FDFBF7] relative z-10 mx-auto flex-shrink-0"></span>
                    
                    {/* Vertical Connector (Mobile) */}
                    {!isLast && (
                      <div className="md:hidden absolute top-[44px] bottom-[-3rem] left-[50%] w-[2px] -ml-[1px] border-l-2 border-dashed border-[#FDB715] z-0"></div>
                    )}

                    {/* Card Content */}
                    <div className="mt-6 flex flex-col items-center w-full relative z-10 bg-[#2654A4]">
                      <p className="node-label !text-[#FDFBF7] font-bold text-lg mb-4 h-[56px] flex items-center justify-center">{item.title}</p>
                      
                      <div className="w-full">
                        <img 
                          src={`/festivalcisadane${item.image}`} 
                          alt={item.title} 
                          className="w-full aspect-[4/3] object-cover rounded-[16px] shadow-sm mb-4"
                        />
                        <p className="text-[#FDFBF7]/80 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

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
