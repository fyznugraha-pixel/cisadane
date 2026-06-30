import type { Dictionary } from "@/i18n/dictionaries";
import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import WaterBubbles from "@/components/WaterBubbles";

function InstagramIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="relative overflow-hidden border-t border-[#2654A4]/15 bg-[#F9F7F1] px-5 pb-8 pt-12 md:pb-10 md:pt-16">
      <WaterBubbles theme="light" />
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          {/* Left Column */}
          <div className="max-w-md">
            <div className="relative h-14 w-[240px] md:h-16 md:w-[280px]">
              <Image
                src={assetPath("/logo/logo.png")}
                alt="Festival Cisadane 2026 Logo"
                fill
                sizes="(max-width: 768px) 240px, 280px"
                className="object-contain object-left"
              />
            </div>

            <p className="mt-6 text-sm leading-relaxed text-[#041020]/70 md:text-base md:leading-relaxed">
              {dict.footer.description}
            </p>

            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://www.instagram.com/cisadanefest/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Festival Cisadane"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-[#2654A4]/20 bg-white text-[#2654A4] shadow-sm transition-all hover:-translate-y-1 hover:bg-[#2654A4] hover:text-white hover:shadow-md"
              >
                <InstagramIcon size={20} />
              </a>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:text-right">
            <h3 className="font-display max-w-[400px] text-3xl font-black uppercase leading-tight text-[#2654A4] lg:max-w-[480px] lg:text-4xl">
              {dict.site.tagline.split("Growing Courage").map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && <span className="text-[#EC3A24]">Growing Courage</span>}
                </span>
              ))}
            </h3>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 flex flex-col items-center justify-center border-t border-[#2654A4]/10 pt-8 text-center text-sm font-medium text-[#041020]/50 md:flex-row md:justify-between md:text-left">
          <p>{dict.footer.copyright}</p>

          <div className="mt-6 md:mt-0">
            <Image
              src={assetPath("/logo/aset4.png")}
              alt="Festival Asset"
              width={140}
              height={45}
              className="object-contain opacity-80 mix-blend-multiply"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
