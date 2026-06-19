import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import Reveal from "@/components/Reveal";
import RiverSectionDivider from "@/components/RiverSectionDivider";
import SectionHeading from "@/components/SectionHeading";
import SectionOrnaments from "@/components/SectionOrnaments";
import StickyRegisterBar from "@/components/StickyRegisterBar";
import {
  accessInfo,
  eventHighlights,
  registrationCategories,
  talentPreview,
  type EventHighlight,
} from "@/data/sections";

const accentMap: Record<EventHighlight["accent"], string> = {
  red: "from-[#C8281E]/70",
  gold: "from-[#C8A03C]/70",
  teal: "from-[#1D6478]/70",
  orange: "from-[#E8823A]/70",
};

const experienceReasons = [
  {
    title: "Iconic River Ritual",
    description:
      "Dragon boats, water reflections, and a floating night stage create a sensory experience unlike any ordinary festival.",
  },
  {
    title: "Multicultural Heart",
    description:
      "Witness the beautiful convergence of Chinese, Betawi, and Sundanese traditions in one warm, vibrant public space.",
  },
  {
    title: "Cinematic Attractions",
    description:
      "From projection mapping to traditional choreography and stage lights, every moment is designed to be unforgettable.",
  },
  {
    title: "A Space for Everyone",
    description:
      "Whether you are a cultural enthusiast, a family, a local artisan, or a collaborator, you have a place here.",
  },
];

export default function Home() {
  return (
    <main className="bg-[#0D1B2A]">
      <Navbar />
      <HeroSection />

      <section
        id="about"
        className="section-shell relative -mt-24 px-5 pb-28 pt-40"
      >
        <div className="absolute inset-0 bg-[#060E16]" />
        <div className="absolute left-0 top-0 h-28 w-full bg-gradient-to-b from-[#060E16]/0 via-[#060E16]/55 to-[#060E16]" />
        <div className="cultural-texture absolute inset-0 opacity-20" />

        <SectionOrnaments dragonScale="soft" batik dragonTopRight />

        <div className="section-inner grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="River Heritage"
              title={`A National Celebration\nof the People`}
            />
          </div>

          <Reveal delay={0.16}>
            <div className="border-l border-[#1D6478]/55 pl-8">
              <p className="text-xl leading-10 text-[#F5F0E8]/78">
                Festival Cisadane is a vibrant celebration of river heritage brought
                to life along the banks of Tangerang City. Its identity flows directly
                from the water, bringing together the adrenaline of dragon boat racing,
                illuminating night stages, authentic folk culinary traditions, and the
                harmonious convergence of Chinese, Betawi, and Sundanese cultures.
              </p>

              <div className="mt-8 inline-flex border border-[#C8A03C]/40 bg-[#C8A03C]/10 px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-[#C8A03C]">
                Karisma Event Nusantara 2026
              </div>
            </div>
          </Reveal>
        </div>

        <div className="soft-river-glow" />
        <RiverSectionDivider />
      </section>

      <section
        id="highlights"
        className="section-shell relative -mt-16 px-5 pb-28 pt-32"
      >
        <div className="absolute inset-0 bg-[#0D1B2A]" />

        <SectionOrnaments dragonScale="strong" tenun />

        <div className="section-inner">
          <SectionHeading
            eyebrow="Attractions & Performances"
            title={`Festival Lights\nUpon the Water`}
            description="Discover the spectacular events that make Festival Cisadane an unforgettable destination for cultural enthusiasts and families alike."
          />

          <div className="mt-14 grid gap-px overflow-hidden border border-[#C8A03C]/20 bg-[#C8A03C]/20 md:grid-cols-2 lg:grid-cols-3">
            {eventHighlights.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <article className="group relative min-h-[420px] overflow-hidden bg-[#060E16]">
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-52 transition duration-700 group-hover:scale-105 group-hover:opacity-72"
                    style={{ backgroundImage: `url('${item.image}')` }}
                  />

                  <div className="image-dark-overlay absolute inset-0" />

                  <div
                    className={`absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t ${
                      accentMap[item.accent]
                    } to-transparent opacity-0 transition duration-700 group-hover:opacity-75`}
                  />

                  <div className="relative z-10 flex h-full min-h-[420px] flex-col justify-end p-7">
                    <h3 className="font-display text-4xl font-black uppercase leading-none text-[#C8A03C]">
                      {item.title}
                    </h3>

                    <p className="mt-5 leading-8 text-[#F5F0E8]/72">
                      {item.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <RiverSectionDivider />
      </section>

      <section
        id="lineup"
        className="section-shell relative -mt-16 px-5 pb-28 pt-32"
      >
        <div className="absolute inset-0 bg-[#060E16]" />
        <div className="dragon-scale absolute inset-0" />

        <SectionOrnaments batik dragonTopRight dragonBottomLeft />

        <div className="section-inner">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="Talent Preview" title={`Upcoming\nPerformances`} />

            <Reveal delay={0.16}>
              <p className="max-w-xl text-lg leading-8 text-[#F5F0E8]/60">
                Prepare for an extraordinary lineup of national and local artists.
                Stay tuned as we reveal the performers who will light up the floating stage this year.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {talentPreview.map((name, index) => (
              <Reveal key={name} delay={index * 0.05}>
                <div className="hover-rise relative min-h-[220px] overflow-hidden border border-[#F5F0E8]/10 bg-[#0D1B2A]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1D6478]/30 via-[#060E16] to-[#C8281E]/20" />
                  <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-[#F5F0E8]/7 to-transparent" />

                  <div className="relative flex h-full min-h-[220px] items-end p-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C8A03C]">
                        Preview {String(index + 1).padStart(2, "0")}
                      </p>

                      <h3 className="mt-3 text-2xl font-extrabold text-[#F5F0E8]">
                        {name}
                      </h3>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <RiverSectionDivider />
      </section>

      <section
        id="why-visit"
        className="section-shell relative -mt-16 px-5 pb-28 pt-32"
      >
        <div className="absolute inset-0 bg-[#0D1B2A]" />
        <div className="cultural-texture absolute inset-0 opacity-20" />

        <SectionOrnaments batik tenun dragonCenterRight />

        <div className="section-inner">
          <SectionHeading
            eyebrow="Why Visit"
            title={`Experience the Magic\nof Cisadane`}
            description="Join thousands of visitors in witnessing a cultural phenomenon where ancient heritage meets spectacular modern celebrations."
          />

          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {experienceReasons.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08}>
                <div className="section-card hover-rise p-7">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-[#C8A03C]">
                    Reason {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="font-display mt-4 text-3xl font-black uppercase leading-none text-[#F5F0E8]">
                    {item.title}
                  </h3>

                  <p className="mt-5 leading-8 text-[#F5F0E8]/68">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <RiverSectionDivider />
      </section>

      <section
        id="register"
        className="section-shell relative -mt-16 px-5 pb-28 pt-32"
      >
        <div className="absolute inset-0 bg-[#132233]" />

        <SectionOrnaments dragonScale="soft" tenun />

        <div className="section-inner">
          <SectionHeading
            eyebrow="Registration Portal"
            title={`Choose Your Path\nto Join`}
            description="Discover how you can be a part of Festival Cisadane 2026. Select your category to begin the registration process."
          />

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {registrationCategories.map((category, index) => (
              <Reveal key={category.id} delay={index * 0.06}>
                <button className="hover-rise group relative min-h-[260px] overflow-hidden border border-[#1D6478]/55 bg-[#0D1B2A] text-left">
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-28 transition duration-700 group-hover:scale-105 group-hover:opacity-45"
                    style={{ backgroundImage: `url('${category.image}')` }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#03070D] via-[#0D1B2A]/76 to-transparent" />

                  <div className="relative flex min-h-[260px] flex-col justify-end p-6">
                    <h3 className="font-display text-3xl font-black uppercase leading-none text-[#C8A03C]">
                      {category.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-[#F5F0E8]/68">
                      {category.description}
                    </p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.18}>
            <div className="mt-8 border border-[#C8A03C]/25 bg-[#060E16]/45 p-6 text-[#F5F0E8]/58">
              Status: Registration is currently closed. Once opened, this portal will guide you through a seamless multi-step process including category selection, personal details, requirements, and confirmation.
            </div>
          </Reveal>
        </div>

        <RiverSectionDivider />
      </section>

      <section
        id="location"
        className="section-shell relative -mt-16 px-5 pb-32 pt-32"
      >
        <div className="absolute inset-0 bg-[#0D1B2A]" />

        <SectionOrnaments tenun dragonBottomLeft />

        <div className="section-inner grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="h-full">
            <div className="flex h-full min-h-[420px] flex-col items-center justify-center border border-[#1D6478]/45 bg-[#060E16] p-8 text-center">
              <div>
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-[#1D6478]">
                    Dark Map Placeholder
                  </p>

                  <h3 className="font-display mt-4 text-4xl font-black uppercase text-[#F5F0E8]">
                    The Banks of the Cisadane River
                  </h3>

                  <p className="mt-4 max-w-md text-[#F5F0E8]/55">
                    The official embedded map will be available once the venue layout and access points are finalised.
                  </p>
                </div>
              </div>
          </Reveal>

          <div>
            <SectionHeading eyebrow="Map & Accessibility" title={`Journey to\nCisadane`} />

            <div className="mt-10 grid gap-4">
              {accessInfo.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.06}>
                  <div className="section-card hover-rise p-5">
                    <h3 className="text-lg font-extrabold text-[#F5F0E8]">
                      {item.title}
                    </h3>

                    <p className="mt-2 leading-7 text-[#F5F0E8]/58">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <StickyRegisterBar />
    </main>
  );
}