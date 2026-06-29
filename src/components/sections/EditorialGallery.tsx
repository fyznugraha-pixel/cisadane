"use client";

import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import type { Dictionary } from "@/i18n/dictionaries";

// A stylized SVG river curve to serve as the background
function RiverFlowSvg() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-10"
      preserveAspectRatio="none"
      viewBox="0 0 1000 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M-100,100 C 200,300 400,-100 600,400 C 800,900 1100,500 1100,500"
        stroke="#FDB715"
        strokeWidth="2"
        strokeLinecap="round"
        className="animate-pulse"
      />
      <path
        d="M-100,300 C 300,500 200,100 700,600 C 1000,1000 1200,700 1200,700"
        stroke="#38BBCA"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M-100,500 C 400,800 100,300 800,900 C 1100,1200 1300,900 1300,900"
        stroke="#EC3A24"
        strokeWidth="1"
        strokeLinecap="round"
        className="animate-pulse"
      />
    </svg>
  );
}

export default function EditorialGallery({ dict }: { dict: Dictionary["gallery"] }) {
  // Desktop & Mobile Layout: Strict 12-column grid (or 1 column on mobile)
  // No masonry, no auto-height, no empty space.
  const getGridClass = (index: number) => {
    switch (index) {
      // Row 1
      case 0: return "col-span-12 md:col-span-6 h-[250px] md:h-[400px]"; // Foto 1
      case 1: return "col-span-6 md:col-span-3 h-[200px] md:h-[400px]"; // Foto 2
      case 2: return "col-span-6 md:col-span-3 h-[200px] md:h-[400px]"; // Foto 3
      // Row 2
      case 3: return "col-span-6 md:col-span-3 h-[200px] md:h-[400px]"; // Foto 4
      case 4: return "col-span-6 md:col-span-3 h-[200px] md:h-[400px]"; // Foto 5
      case 5: return "col-span-12 md:col-span-6 h-[250px] md:h-[400px]"; // Foto 6
      // Row 3
      case 6: return "col-span-12 md:col-span-4 h-[250px] md:h-[350px]"; // Foto 7
      case 7: return "col-span-6 md:col-span-4 h-[200px] md:h-[350px]"; // Foto 8
      case 8: return "col-span-6 md:col-span-4 h-[200px] md:h-[350px]"; // Foto 9
      // Row 4
      case 9: return "col-span-12 md:col-span-12 h-[300px] md:h-[500px]"; // Foto 10
      default: return "col-span-12 h-[300px]";
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#FDFBF7] px-5 py-32">
      {/* Background Textures */}
      <div className="batik-pattern absolute inset-0 opacity-[0.03]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#38BBCA]/5 via-transparent to-transparent" />
      
      <RiverFlowSvg />

      {/* Gold Particles (simulated with radial gradients) */}
      <div className="absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-[#FDB715] opacity-[0.08] blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-[#EC3A24] opacity-[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-16 md:mb-20">
            <SectionHeading
              eyebrow={dict.badge}
              title={dict.title}
              description={dict.description}
            />
          </div>
        </Reveal>

        {/* 
          Strict 12-column grid layout with fixed heights.
          Gap is exactly 16px (gap-4).
        */}
        <div className="grid grid-cols-12 gap-4">
          {dict.photos.map((photo, index) => (
            <div key={photo.src} className={getGridClass(index)}>
              <Reveal delay={index * 0.08} className="h-full w-full">
                <GalleryItem photo={photo} />
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryItem({ photo }: { photo: { src: string; caption: string } }) {
  return (
    <div className="group relative h-full w-full overflow-hidden rounded-[24px] bg-white border border-[#2654A4]/10 shadow-sm transition-shadow hover:shadow-xl">
      <Image
        src={assetPath(photo.src)}
        alt={photo.caption}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      
      {/* Cinematic Overlay */}
      <div 
        className="absolute inset-0 bg-[#041020]/20 transition-opacity duration-700 ease-out group-hover:opacity-10"
      />
      
      {/* Hover Caption */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-t from-[#041020]/90 via-[#041020]/20 to-transparent" />
        <p className="relative font-medium leading-relaxed text-white shadow-sm">
          {photo.caption}
        </p>
      </div>
    </div>
  );
}
