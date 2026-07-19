import React from "react";
import Reveal from "../Reveal";
import SectionOrnaments from "../SectionOrnaments";
import RiverSectionDivider from "../RiverSectionDivider";
import WaterBubbles from "../WaterBubbles";
import { assetPath } from "@/lib/asset-path";
import Image from "next/image";
import ParallaxSection from "../ParallaxSection";

const mediaPartners = [
  { name: "TNG TV", image: "/media-patner/tng-tv.webp" },
  { name: "KONSER FYP", image: "/media-patner/konser-fyp.webp" },
  { name: "Konser Raya", image: "/media-patner/konser-raya.webp" },
  { name: "GAC MUSIC", image: "/media-patner/gac.webp" },
  { name: "KONSER MUSIK FEST", image: "/media-patner/konser-musikfest.webp" },
  { name: "MEDIA PARTNER EVENT", image: "/media-patner/media-patner-event.webp" },
  { name: "BIANG KONSER", image: "/media-patner/biangkonser.webp" },
  { name: "KONSER DAILY", image: "/media-patner/konserdaily.webp" },
  { name: "KONSER TNG RAYA", image: "/media-patner/konser-tng.webp" },
  { name: "KONSER MY MUSIK", image: "/media-patner/konser-myusik.webp" },
  { name: "DR DIGITAL MEDIA", image: "/media-patner/digital-media.webp" },
  { name: "KONSERAN BESTIE", image: "/media-patner/konseran-bestie.webp" },
  { name: "WARTA TANGERANG", image: "/media-patner/warta.webp" },
  { name: "FOMO EVENT", image: "/media-patner/fomo-event.webp" },
  { name: "SUPPORT KONSER", image: "/media-patner/support-konser.webp" },
  { name: "TANGKAB AMBYAR", image: "/media-patner/tangkab_ambyar.webp" },
  { name: "EVENT TERUS.ID", image: "/media-patner/event-terus.webp" },
  { name: "PARTNER KONSER", image: "/media-patner/patner-konser.webp" },
  { name: "SOUND DIVISION", image: "/media-patner/sound-division.webp" },
  { name: "SOUL OF JAKARTA", image: "/media-patner/soul-of-jkarta.webp" },
  { name: "KISIKISI.CO", image: "/media-patner/kisi-kisi.webp" },
  { name: "PRIOK PRIDE KONSER", image: "/media-patner/priokpride.webp" },
  { name: "JAKARTA MUSIC FEST", image: "/media-patner/jakarta-musicfest.webp" },
  { name: "EventHubID", image: "/media-patner/eventhubid.webp" },
  { name: "Tangsel Partim", image: "/media-patner/tangsel-partim.webp" },
  { name: "WANI KONSERAN BARENG", image: "/media-patner/Wanikonseranbareng.webp" },
  { name: "YRI", image: "/media-patner/Logo YRI.webp" },
];

export default function MediaPartnersSection() {
  const marqueeItems = [...mediaPartners, ...mediaPartners, ...mediaPartners, ...mediaPartners];

  return (
    <section
      id="media-partners"
      className="section-shell relative bg-[#FDFBF7] text-[#041020] px-5 pb-36 pt-20 overflow-hidden"
    >
      <WaterBubbles theme="light" hasWaveBottom={true} hasWaveTop={true} />
      <SectionOrnaments dragonScale="strong" shapes="sparkles" lights="right" theme="light" />

      <div className="section-inner">
        <Reveal scale={0.9}>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-black uppercase tracking-tight text-[#2654A4] mb-4">
              Mitra Media
            </h2>
            <div className="h-1 w-16 bg-gradient-to-r from-[#2654A4] to-[#38BBCA] mx-auto rounded-full" />
          </div>
        </Reveal>

        <ParallaxSection speed={0.15}>
          <Reveal scale={0.9} delay={0.2}>
            <div className="relative flex overflow-hidden group mt-10">
              {/* Left and Right Fade */}
              <div className="absolute top-0 left-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#FDFBF7] to-transparent z-10 pointer-events-none" />
              <div className="absolute top-0 right-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#FDFBF7] to-transparent z-10 pointer-events-none" />

              <div 
                className="flex animate-marquee hover:[animation-play-state:paused] active:[animation-play-state:paused] whitespace-nowrap items-center gap-6 md:gap-10 py-2"
                style={{ animationDuration: '115s' }}
              >
                {marqueeItems.map((partner, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center min-w-[160px] h-20 px-6 bg-[#FDFBF7] rounded-2xl shadow-hard transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-hard-hover group/logo cursor-default"
                  >
                    {partner.image ? (
                      <div className="relative h-12 w-32">
                        <Image 
                          src={assetPath(partner.image)} 
                          alt={partner.name}
                          fill
                          className="object-contain transition-transform duration-300 group-hover/logo:scale-105" 
                        />
                      </div>
                    ) : (
                      <span className="font-display font-bold text-lg md:text-xl text-[#041020]/40 tracking-wider group-hover/logo:text-[#2654A4] transition-colors duration-300 whitespace-nowrap">
                        {partner.name}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </ParallaxSection>
      </div>

      {/* Organic river transition into the Tactlink (Blue) section */}
      <RiverSectionDivider className="text-[#2654A4]" theme="dark" />
    </section>
  );
}
