import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import EditorialGallery from "@/components/sections/EditorialGallery";
import Reveal from "@/components/Reveal";
import RiverSectionDivider from "@/components/RiverSectionDivider";
import SectionHeading from "@/components/SectionHeading";
import SectionOrnaments from "@/components/SectionOrnaments";
import StickyRegisterBar from "@/components/StickyRegisterBar";
import MapWrapper from "@/components/MapWrapper";
import TactlinkSupportSection from "@/components/TactlinkSupportSection";
import { getDictionary } from "@/i18n/dictionaries";

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

        {/* Organic river transition into the blue section */}
        <RiverSectionDivider className="text-[#2654A4]" />
      </section>

      <section
        id="highlights"
        className="section-shell relative bg-[#2654A4] text-[#FDFBF7] px-5 pb-36 pt-20"
      >
        <SectionOrnaments dragonScale="strong" shapes="sparkles" lights="right" theme="dark" />

        <div className="section-inner">
          <SectionHeading
            eyebrow={dict.highlights.eyebrow}
            title={dict.highlights.title}
            description={dict.highlights.description}
            theme="dark"
          />

          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {dict.highlights.items.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <article className="group flex flex-col h-full min-h-[460px] overflow-hidden bg-[#FDFBF7] shadow-lg rounded-2xl border border-[#2654A4]/15 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#FDFBF7]/10">
                  {/* 60% Top Image Area */}
                  <div className="relative h-[260px] w-full shrink-0 overflow-hidden bg-[#041020]">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url('${item.image}')` }}
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
        </div>

        {/* Organic river transition into the cream section */}
        <RiverSectionDivider className="text-[#FDFBF7]" theme="light" />
      </section>

      <section
        id="lineup"
        className="section-shell relative px-5 pb-36 pt-20"
      >
        <SectionOrnaments dragonTopRight dragonBottomLeft shapes="petals" lights="both" />

        <div className="section-inner">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow={dict.performers.eyebrow} title={dict.performers.title} />

            <Reveal delay={0.16}>
              <p className="max-w-xl text-lg leading-8 text-[#041020]/75">
                {dict.performers.description}
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dict.performers.talent.map((name, index) => (
              <Reveal key={name} delay={index * 0.05}>
                <div className="hover-rise relative min-h-[220px] overflow-hidden border border-[#2654A4]/10 bg-white shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#38BBCA]/10 via-transparent to-[#EC3A24]/5" />
                  <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-[#2654A4]/5 to-transparent" />

                  <div className="relative flex h-full min-h-[220px] items-end p-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#EC3A24]">
                        {dict.performers.previewPrefix} {String(index + 1).padStart(2, "0")}
                      </p>

                      <h3 className="mt-3 text-2xl font-extrabold text-[#2654A4]">
                        {name}
                      </h3>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Organic river transition into the blue section */}
        <RiverSectionDivider className="text-[#2654A4]" />
      </section>

      <section
        id="why-visit"
        className="section-shell relative bg-[#2654A4] text-[#FDFBF7] px-5 pb-36 pt-20"
      >
        <SectionOrnaments dragonCenterRight shapes="mixed" lights="center" theme="dark" />

        <div className="section-inner">
          <SectionHeading
            eyebrow={dict.whyVisit.eyebrow}
            title={dict.whyVisit.title}
            description={dict.whyVisit.description}
            theme="dark"
          />

          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {dict.whyVisit.reasons.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08} className="h-full">
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
        </div>

        {/* Organic river transition into the cream section */}
        <RiverSectionDivider className="text-[#FDFBF7]" theme="light" />
      </section>

      {/* <EditorialGallery dict={dict.gallery} /> */}

      <section
        id="register"
        className="section-shell relative px-5 pb-36 pt-20"
      >
        <SectionOrnaments dragonScale="soft" tenun shapes="squares" lights="left" />

        <div className="section-inner">
          <SectionHeading
            eyebrow={dict.register.eyebrow}
            title={dict.register.title}
            description={dict.register.description}
          />

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {dict.register.categories.map((category, index) => (
              <Reveal key={category.id} delay={index * 0.06} className="h-full">
                <button className="hover-rise group flex flex-col h-full w-full overflow-hidden border border-[#2654A4]/15 bg-white shadow-lg rounded-2xl text-left transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                  {/* 60% Top Image Area */}
                  <div className="relative h-[220px] w-full shrink-0 overflow-hidden bg-[#041020]">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url('${category.image}')` }}
                    />
                  </div>

                  {/* 40% Bottom Text Area */}
                  <div className="relative flex flex-1 flex-col p-6 bg-[#FDFBF7]">
                    <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-[#FDB715] to-[#EC3A24]" />
                    
                    <h3 className="font-display text-[22px] font-black uppercase leading-tight text-[#2654A4]">
                      {category.title}
                    </h3>

                    <p className="mt-3 text-sm font-medium leading-relaxed text-[#041020]/80">
                      {category.description}
                    </p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.18}>
            <div className="mt-8 border border-[#FDB715]/40 bg-[#FDB715]/10 p-6 text-[#041020]/80">
              {dict.register.statusBox}
            </div>
          </Reveal>
        </div>

        {/* Organic river transition into the blue section */}
        <RiverSectionDivider className="text-[#2654A4]" />
      </section>

      <section
        id="location"
        className="section-shell relative bg-[#2654A4] text-[#FDFBF7] px-5 pb-36 pt-20"
      >
        <SectionOrnaments tenun dragonBottomLeft shapes="sparkles" lights="right" theme="dark" />

        <div className="section-inner grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="h-full">
            <MapWrapper />
          </Reveal>

          <div>
            <SectionHeading eyebrow={dict.location.eyebrow} title={dict.location.title} theme="dark" />

            <div className="mt-10 grid gap-4">
              {dict.location.accessInfo.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.06}>
                  <div className="section-card hover-rise bg-[#FDFBF7] border border-[#2654A4]/10 p-6">
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
        <RiverSectionDivider className="text-[#F9F7F1]" theme="light" />
      </section>

      <TactlinkSupportSection />
      
      <Footer dict={dict} />
      <StickyRegisterBar dict={dict.stickyBar} lang={lang} />
      </div>
    </main>
  );
}