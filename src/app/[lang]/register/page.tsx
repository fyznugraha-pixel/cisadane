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
              <div className="mt-8 border border-[#FDB715]/40 bg-[#FDB715]/10 p-6 text-[#041020]/80">
                {dict.register.statusBox}
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
