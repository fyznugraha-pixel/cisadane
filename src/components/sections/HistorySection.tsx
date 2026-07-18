import React from "react";
import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";
import RiverSectionDivider from "../RiverSectionDivider";
import SectionOrnaments from "../SectionOrnaments";
import WaterBubbles from "../WaterBubbles";
import ParallaxSection from "../ParallaxSection";
import VideoPlayerWithMute from "../VideoPlayerWithMute";

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
            
            {/* YouTube Video Embed with Premium Frame */}
            <div className="max-w-4xl mx-auto w-full mb-16 relative z-20 px-4 md:px-0">
              <div className="relative p-1 md:p-3 rounded-2xl md:rounded-3xl bg-white shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] transition-shadow duration-500 group">
                {/* Inner border */}
                <div className="absolute inset-0 rounded-2xl md:rounded-3xl border border-[#2654A4]/10 z-10 pointer-events-none"></div>
                
                {/* Decorator Dots */}
                <div className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-white border-2 border-[#2654A4]/20 shadow-sm z-20"></div>
                <div className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-white border-2 border-[#2654A4]/20 shadow-sm z-20"></div>
                
                {/* Content Container */}
                <div className="relative rounded-xl md:rounded-2xl overflow-hidden bg-[#041020] aspect-video w-full transform transition-transform duration-500 group-hover:scale-[0.99]">
                  <VideoPlayerWithMute url="https://www.youtube.com/watch?v=DHFRFqLWupE" />
                </div>
              </div>
            </div>
          </Reveal>
        </ParallaxSection>

        <div className="mt-14 flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory md:grid md:grid-cols-4 gap-12 md:gap-0 relative z-10 w-full py-8 -mx-5 px-5 md:mx-0 md:px-0 md:overflow-visible hide-scrollbar">
          {dict.history.items.map((item: any, index: number) => {
            const isLast = index === dict.history.items.length - 1;
            
            return (
              <div key={item.title} className="flex-none snap-center w-[85vw] md:w-auto">
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
                    
                    {/* Horizontal Connector (Mobile - Swipe) */}
                    {!isLast && (
                      <div className="md:hidden absolute top-[22px] left-[50%] w-full z-0 px-8">
                        <svg viewBox="0 0 300 20" aria-hidden="true" preserveAspectRatio="none" className="w-full h-[20px]">
                          <path d="M0,10 Q150,-4 300,10" fill="none" stroke="#FDB715"
                                strokeWidth="2" strokeDasharray="1 7" strokeLinecap="round"/>
                        </svg>
                      </div>
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
              </div>
            );
          })}
        </div>
      </div>

      {/* Organic river transition into the next section */}
      <RiverSectionDivider className="text-[#FDFBF7]" theme="light" />
    </section>
  );
}
