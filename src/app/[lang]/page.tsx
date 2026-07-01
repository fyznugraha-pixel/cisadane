import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import EditorialGallery from "@/components/sections/EditorialGallery";
import Reveal from "@/components/Reveal";
import RiverSectionDivider from "@/components/RiverSectionDivider";
import SectionHeading from "@/components/SectionHeading";
import SectionOrnaments from "@/components/SectionOrnaments";
import ObjectivesSection from "@/components/sections/ObjectivesSection";
import PentahelixSection from "@/components/sections/PentahelixSection";
import SmartInnovationsSection from "@/components/sections/SmartInnovationsSection";
import StickyRegisterBar from "@/components/StickyRegisterBar";
import MapWrapper from "@/components/MapWrapper";
import TactlinkSupportSection from "@/components/TactlinkSupportSection";
import WaterBubbles from "@/components/WaterBubbles";
import { getDictionary } from "@/i18n/dictionaries";
import { assetPath } from "@/lib/asset-path";
import { MoveRight } from "lucide-react";

const accentMap: Record<"red" | "gold" | "teal" | "orange", string> = {
  red: "from-[#C8281E]/70",
  gold: "from-[#C8A03C]/70",
  teal: "from-[#1D6478]/70",
  orange: "from-[#E8823A]/70",
};

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
        <SectionOrnaments dragonScale="soft" dragonTopRight shapes="mixed" lights="left" />

        <div className="section-inner grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow={dict.about.eyebrow}
              title={dict.about.title}
            />
          </div>

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
        </div>
      </section>

      <ObjectivesSection dict={dict} />
      <PentahelixSection dict={dict} />

      <section
        id="highlights"
        className="section-shell relative bg-[#2654A4] text-[#FDFBF7] px-5 pb-36 pt-20"
      >
        <WaterBubbles theme="dark" hasWaveBottom={true} hasWaveTop={true} />
        <SectionOrnaments dragonScale="strong" shapes="sparkles" lights="right" theme="dark" />

        <div className="section-inner">
          <SectionHeading
            eyebrow={dict.highlights.eyebrow}
            title={dict.highlights.title}
            description={dict.highlights.description}
            theme="dark"
          />

          <div className="mt-14 flex snap-x snap-mandatory overflow-x-auto pb-8 gap-4 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0 hide-scrollbar">
            {dict.highlights.items.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06} y={0} className="w-[85vw] shrink-0 snap-center lg:w-auto lg:shrink h-full">
                <article className="group flex flex-col h-full min-h-[460px] overflow-hidden bg-[#FDFBF7] shadow-lg rounded-2xl border border-[#2654A4]/15 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#FDFBF7]/10">
                  {/* 60% Top Image Area */}
                  <div className="relative h-[260px] w-full shrink-0 overflow-hidden bg-[#041020]">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url('/festivalcisadane${item.image}')` }}
                    />
                  </div>

                  {/* 40% Bottom Text Area */}
                  <div className="relative flex flex-1 flex-col p-7 bg-[#FDFBF7]">
                    <div
                      className={`absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r ${
                        accentMap[item.accent]
                      } to-[#2654A4]`}
                    />
                    
                    <h3 className="font-display text-[22px] font-black uppercase leading-tight text-[#2654A4]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm font-medium leading-relaxed text-[#041020]/80">
                      {item.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-3 text-white/50 lg:hidden animate-pulse">
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Geser</span>
            <MoveRight size={16} />
          </div>
        </div>

        {/* Organic river transition into the cream section */}
        <RiverSectionDivider className="text-[#FDFBF7]" theme="light" />
      </section>

      <section
        id="lineup"
        className="section-shell relative px-5 pb-36 pt-20"
      >
        <WaterBubbles theme="light" hasWaveBottom={true} hasWaveTop={true} />
        <SectionOrnaments dragonTopRight dragonBottomLeft shapes="petals" lights="both" />

        <div className="section-inner">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-center text-center">
            <SectionHeading eyebrow={dict.performers.eyebrow} title={dict.performers.title} align="center" />
          </div>

          <div className="mt-14 flex snap-x snap-mandatory overflow-x-auto pb-8 gap-4 sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0 hide-scrollbar">
            {dict.performers.talent.map((talentItem: any, index: number) => (
              <Reveal key={talentItem.name} delay={index * 0.05} y={0} className="w-[85vw] shrink-0 snap-center sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]">
                <div className="hover-rise relative h-full min-h-[220px] w-full overflow-hidden border border-[#2654A4]/10 bg-white shadow-sm">
                  {talentItem.image ? (
                    <div 
                      className="absolute inset-0 bg-cover bg-center" 
                      style={{ backgroundImage: `url('${assetPath(talentItem.image)}')` }}
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-[#38BBCA]/10 via-transparent to-[#EC3A24]/5" />
                      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-[#2654A4]/5 to-transparent" />
                    </>
                  )}
                  {talentItem.image && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#041020]/90 via-[#041020]/30 to-transparent" />
                  )}

                  <div className="relative flex h-full min-h-[220px] items-end p-6">
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-[0.22em] ${talentItem.image ? "text-[#FDB715]" : "text-[#EC3A24]"}`}>
                        {dict.performers.previewPrefix} {String(index + 1).padStart(2, "0")}
                      </p>

                      <h3 className={`mt-3 text-2xl font-extrabold ${talentItem.image ? "text-white" : "text-[#2654A4]"}`}>
                        {talentItem.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-3 text-[#041020]/40 sm:hidden animate-pulse">
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Geser</span>
            <MoveRight size={16} />
          </div>
        </div>

        {/* Organic river transition into the blue section */}
        <RiverSectionDivider className="text-[#2654A4]" />
      </section>

      <section
        id="why-visit"
        className="section-shell relative bg-[#2654A4] text-[#FDFBF7] px-5 pb-36 pt-20"
      >
        <WaterBubbles theme="dark" hasWaveBottom={true} hasWaveTop={true} />
        <SectionOrnaments dragonCenterRight shapes="mixed" lights="center" theme="dark" />

        <div className="section-inner">
          <SectionHeading
            eyebrow={dict.whyVisit.eyebrow}
            title={dict.whyVisit.title}
            description={dict.whyVisit.description}
            theme="dark"
          />

          <div className="mt-14 flex snap-x snap-mandatory overflow-x-auto pb-8 gap-4 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 hide-scrollbar">
            {dict.whyVisit.reasons.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08} y={0} className="w-[85vw] shrink-0 snap-center md:w-auto md:shrink h-full">
                <div className="section-card flex flex-col h-full hover-rise bg-[#FDFBF7] border border-[#2654A4]/10 shadow-sm p-7">
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
              </Reveal>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-3 text-white/50 md:hidden animate-pulse">
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Geser</span>
            <MoveRight size={16} />
          </div>
        </div>

        {/* Organic river transition into the next light section */}
        <RiverSectionDivider className="text-[#FDFBF7]" theme="light" />
      </section>

      <SmartInnovationsSection dict={dict} />

      {/* <EditorialGallery dict={dict.gallery} /> */}

      <section
        id="location"
        className="section-shell relative bg-[#FDFBF7] text-[#041020] px-5 pb-36 pt-20"
      >
        <WaterBubbles theme="light" hasWaveBottom={true} hasWaveTop={true} />
        <SectionOrnaments dragonScale="soft" tenun dragonBottomLeft shapes="sparkles" lights="right" theme="light" />

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

      <TactlinkSupportSection />
      

      <Footer dict={dict} />
      {/* <StickyRegisterBar dict={dict.stickyBar} lang={lang} /> */}
      </div>
    </main>
  );
}