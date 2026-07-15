import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import EditorialGallery from "@/components/sections/EditorialGallery";
import Reveal from "@/components/Reveal";
import RiverSectionDivider from "@/components/RiverSectionDivider";
import SectionHeading from "@/components/SectionHeading";
import SectionOrnaments from "@/components/SectionOrnaments";
import ObjectivesSection from "@/components/sections/ObjectivesSection";
import SmartInnovationsSection from "@/components/sections/SmartInnovationsSection";
import SponsorsSection from "@/components/sections/SponsorsSection";
import TiltCard from "@/components/TiltCard";
import FlipCard from "@/components/FlipCard";
import StickyRegisterBar from "@/components/StickyRegisterBar";
import MapWrapper from "@/components/MapWrapper";
import TactlinkSupportSection from "@/components/TactlinkSupportSection";
import WaterBubbles from "@/components/WaterBubbles";
import { getDictionary } from "@/i18n/dictionaries";
import { assetPath } from "@/lib/asset-path";
import { MoveRight } from "lucide-react";
import ParallaxSection from "@/components/ParallaxSection";

const accentMap: Record<"red" | "gold" | "teal" | "orange", string> = {
  red: "from-[#C8281E]/70",
  gold: "from-[#C8A03C]/70",
  teal: "from-[#1D6478]/70",
  orange: "from-[#E8823A]/70",
};


import MediaPartnersSection from "@/components/sections/MediaPartnersSection";
import ImpactSection from "@/components/sections/ImpactSection";
import HistorySection from "@/components/sections/HistorySection";

export default async function Home(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang;
  const dict = getDictionary(lang);

  return (
    <main className="relative bg-[#FDFBF7] text-[#041020] min-h-screen">
      
      <div className="relative z-10">
        <Navbar dict={dict.navbar} lang={lang} />
      <HeroSection dict={dict.site} heroExp={dict.heroExperience} lang={lang} />

      <section
        id="about"
        className="section-shell relative px-5 pb-36 pt-28"
      >
        <WaterBubbles theme="light" hasWaveBottom={true} hasWaveTop={true} />
        <SectionOrnaments dragonScale="strong" shapes="sparkles" lights="right" theme="light" />

        <div className="section-inner grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <ParallaxSection speed={0.1}>
            <div>
              <SectionHeading
                eyebrow={dict.about.eyebrow}
                title={dict.about.title}
              />
            </div>
          </ParallaxSection>

          <ParallaxSection speed={0.2}>
            <Reveal delay={0.16}>
              <div className="border-l border-[#2654A4]/20 pl-8">
                <p className="text-xl leading-10 text-[#041020]/80">
                  {dict.about.description}
                </p>
  
                <div className="mt-8 inline-flex border border-[#2654A4]/20 bg-[#2654A4]/5 px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-[#2654A4]">
                  {dict.site.badge}
                </div>
              </div>
            </Reveal>
          </ParallaxSection>
        </div>

        {/* Organic river transition into the blue section */}
        <RiverSectionDivider className="text-[#2654A4]" />
      </section>

      <HistorySection dict={dict} />

      <section
        id="highlights"
        className="section-shell relative bg-[#FDFBF7] text-[#041020] px-5 pb-36 pt-20"
      >
        <WaterBubbles theme="light" hasWaveBottom={true} hasWaveTop={true} />
        <SectionOrnaments dragonScale="strong" shapes="sparkles" lights="right" theme="light" />

        <div className="section-inner">
          <ParallaxSection speed={0.1}>
            <SectionHeading
              eyebrow={dict.highlights.eyebrow}
              title={dict.highlights.title}
              description={dict.highlights.description}
              theme="light"
            />
          </ParallaxSection>

          <div className="mt-14 stagger-grid pb-8 lg:pb-0">
            {dict.highlights.items.map((item: any, index: number) => (
              <ParallaxSection key={item.title} speed={index % 2 === 0 ? 0.3 : 0.6}>
                <div className="card card-a h-full">
                  <div className="card-a__image-wrap">
                    <img 
                      src={`/festivalcisadane${item.image}`} 
                      alt={`Foto suasana ${item.title} di Festival Cisadane`} 
                      loading="lazy" 
                    />
                  </div>
                  <div className="card-a__body">
                    <h3 className="card-a__title">{item.title}</h3>
                    <p className="card-a__desc">{item.description}</p>
                  </div>
                </div>
              </ParallaxSection>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-3 text-white/50 lg:hidden animate-pulse">
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Geser</span>
            <MoveRight size={16} />
          </div>
        </div>

        {/* Organic river transition into the blue section */}
        <RiverSectionDivider className="text-[#2654A4]" />
      </section>

      <section
        id="lineup"
        className="section-shell relative bg-[#2654A4] text-[#FDFBF7] px-5 pb-36 pt-20"
      >
        <WaterBubbles theme="dark" hasWaveBottom={true} hasWaveTop={true} />
        <SectionOrnaments dragonScale="strong" shapes="sparkles" lights="right" theme="dark" />

        <div className="section-inner">
          <ParallaxSection speed={0.1}>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-center text-center">
              <SectionHeading eyebrow={dict.performers.eyebrow} title={dict.performers.title} align="center" theme="dark" />
            </div>
          </ParallaxSection>

          <div className="mt-14 flex flex-wrap justify-center gap-[var(--space-md)]">
            {dict.performers.talent.map((talentItem: any, index: number) => {
              return (
                <ParallaxSection 
                  key={talentItem.name} 
                  speed={index % 2 === 0 ? 0.3 : 0.6}
                  className={`w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)] min-h-[300px] md:min-h-[360px]`}
                >
                  <FlipCard 
                    className="h-full w-full"
                    frontContent={
                      <div className={`card card-b h-full w-full ${!talentItem.image ? 'card-b--pending' : ''}`}>
                        <div className={`card-b__image-wrap ${!talentItem.image ? 'card-image-skeleton' : ''}`}>
                          {talentItem.image && (
                            <img 
                              src={assetPath(talentItem.image)} 
                              alt={`Foto penampil ${talentItem.name}`} 
                              loading="lazy" 
                            />
                          )}
                        </div>
                        <svg className="ripple-divider" viewBox="0 0 300 16" aria-hidden="true">
                          <path d="M0,8 Q15,0 30,8 T60,8 T90,8 T120,8 T150,8 T180,8 T210,8 T240,8 T270,8 T300,8"
                                fill="none" stroke="#EC3A24" strokeWidth="2"/>
                        </svg>
                        <div className="card-b__body">
                          <p className="card-b__meta">{dict.performers.previewPrefix} {String(index + 1).padStart(2, '0')}</p>
                          <h3 className="card-b__title" style={!talentItem.image ? { color: '#2654A4' } : {}}>
                            {talentItem.name}
                          </h3>
                        </div>
                      </div>
                    }
                    backContent={
                      <div className="card card-b h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#FDFBF7] to-white border-[2px] border-[#2654A4]/10 shadow-sm transition-shadow hover:shadow-md">
                        <div className="w-16 h-16 rounded-full bg-[#FDB715]/20 flex items-center justify-center mb-4">
                          <span className="text-3xl font-black text-[#FDB715]">?</span>
                        </div>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#2654A4] text-center px-4">{dict.performers.tapToReveal}</h3>
                      </div>
                    }
                  />
                </ParallaxSection>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-center gap-3 text-[#041020]/40 sm:hidden animate-pulse">
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Geser</span>
            <MoveRight size={16} />
          </div>
        </div>

        {/* Organic river transition into the light section */}
        <RiverSectionDivider className="text-[#FDFBF7]" theme="light" />
      </section>

      <section
        id="why-visit"
        className="section-shell relative bg-[#FDFBF7] text-[#041020] px-5 pb-36 pt-20"
      >
        <WaterBubbles theme="light" hasWaveBottom={true} hasWaveTop={true} />
        <SectionOrnaments dragonScale="strong" shapes="sparkles" lights="right" theme="light" />

        <div className="section-inner">
          <ParallaxSection speed={0.1}>
            <SectionHeading
              eyebrow={dict.whyVisit.eyebrow}
              title={dict.whyVisit.title}
              description={dict.whyVisit.description}
              theme="light"
            />
          </ParallaxSection>

          <div className="mt-14 flex snap-x snap-mandatory overflow-x-auto pb-8 gap-4 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 hide-scrollbar">
            {dict.whyVisit.reasons.map((item: any, index: number) => (
              <ParallaxSection key={item.title} speed={index % 2 === 0 ? 0.3 : 0.6} className="w-[85vw] shrink-0 snap-center md:w-auto md:shrink h-full">
                <Reveal delay={index * 0.08} y={0} className="h-full">
                  <TiltCard>
                    <div className="section-card flex flex-col h-full hover-rise bg-white border border-[#2654A4]/10 shadow-sm p-7 rounded-2xl transition-all duration-300 hover:shadow-lg">
                      <p className="text-xs font-black uppercase tracking-[0.24em] text-[#EC3A24]">
                        {dict.whyVisit.reasonPrefix} {String(index + 1).padStart(2, "0")}
                      </p>

                      <h3 className="font-display mt-4 text-[26px] md:text-3xl font-black uppercase leading-tight text-[#2654A4]">
                        {item.title}
                      </h3>

                      <p className="mt-5 leading-relaxed text-[#041020]/80">
                        {item.description}
                      </p>
                    </div>
                  </TiltCard>
                </Reveal>
              </ParallaxSection>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-3 text-[#041020]/40 md:hidden animate-pulse">
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Geser</span>
            <MoveRight size={16} />
          </div>
        </div>

        {/* Organic river transition into the blue section */}
        <RiverSectionDivider className="text-[#2654A4]" />
      </section>

      <ImpactSection dict={dict} />

      <ObjectivesSection dict={dict} />

      <SmartInnovationsSection dict={dict} />

      {/* <EditorialGallery dict={dict.gallery} /> */}

      <section
        id="location"
        className="section-shell relative bg-[#FDFBF7] text-[#041020] px-5 pb-36 pt-20"
      >
        <WaterBubbles theme="light" hasWaveBottom={true} hasWaveTop={true} />
        <SectionOrnaments dragonScale="strong" shapes="sparkles" lights="right" theme="light" />

        <div className="section-inner grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="h-full">
            <MapWrapper />
          </Reveal>

          <div>
            <SectionHeading eyebrow={dict.location.eyebrow} title={dict.location.title} theme="light" />

            <div className="mt-10 grid gap-4">
              {dict.location.accessInfo.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.06}>
                  <div className="section-card hover-rise bg-white border border-[#2654A4]/10 p-6">
                    <h3 className="text-lg font-black uppercase text-[#2654A4]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-[#041020]/80">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Organic river transition into the footer/tactlink section */}
        <RiverSectionDivider className="text-[#2654A4]" theme="dark" />
      </section>

      <SponsorsSection />
      <MediaPartnersSection />
      
      <TactlinkSupportSection />
      

      <Footer dict={dict} />
      {/* <StickyRegisterBar dict={dict.stickyBar} lang={lang} /> */}
      </div>
    </main>
  );
}