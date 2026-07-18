import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Reveal from "@/components/Reveal";
import RiverSectionDivider from "@/components/RiverSectionDivider";
import SectionHeading from "@/components/SectionHeading";
import SectionOrnaments from "@/components/SectionOrnaments";
import { getDictionary } from "@/i18n/dictionaries";
import RegisterForm from "@/components/RegisterForm";

export default async function RegisterPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang;
  const dict = getDictionary(lang);

  return (
    <main className="relative min-h-screen bg-[#FDFBF7] selection:bg-[#2654A4]/20 selection:text-[#2654A4]">
      {/* Texture Overlay */}
      <div className="batik-pattern fixed inset-0 z-0 opacity-[0.015] mix-blend-multiply" />

      {/* Navbar with localized content */}
      <Navbar dict={dict.navbar} lang={lang} />

      <div className="relative z-10 pt-20">
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

            <div className="mt-14">
              <RegisterForm dict={dict.register.form} />
            </div>

            <Reveal delay={0.18}>
              <div className="mt-12 relative overflow-hidden rounded-3xl border border-[#2654A4]/10 bg-gradient-to-br from-white to-[#FDFBF7] p-8 shadow-[0_20px_60px_-15px_rgba(38,84,164,0.05)] backdrop-blur-xl">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#FDB715]/10 blur-3xl" />
                <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[#2654A4]/10 blur-3xl" />
                
                <div className="relative flex flex-col items-center text-center sm:flex-row sm:text-left gap-6">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2654A4] to-[#38BBCA] shadow-lg">
                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#2654A4] mb-1">Pendaftaran Resmi Dibuka</h4>
                    <p className="text-[#041020]/70 leading-relaxed font-medium">
                      {dict.register.statusBox}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Organic river transition into the footer/tactlink section */}
          <RiverSectionDivider className="text-[#F9F7F1]" theme="light" />
        </section>

        <Footer dict={dict} />
      </div>
    </main>
  );
}
