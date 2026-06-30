import Image from "next/image";
import { ExternalLink, Globe2 } from "lucide-react";
import { assetPath } from "@/lib/asset-path";
import RiverSectionDivider from "@/components/RiverSectionDivider";
import WaterBubbles from "@/components/WaterBubbles";

const tactlinkLinks = {
  website: "https://tactlink.com",
  appStore: "https://apps.apple.com/id/app/tactlink/id1469516661",
  playStore: "https://play.google.com/store/apps/details?id=com.tactlink.app",
};

function AppleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-10 w-10 shrink-0"
      fill="currentColor"
    >
      <path d="M16.365 1.43c0 1.14-.466 2.22-1.22 3.04-.79.86-2.08 1.52-3.16 1.43-.14-1.09.4-2.25 1.13-3.04.8-.86 2.2-1.5 3.25-1.43ZM20.74 17.36c-.55 1.25-.82 1.8-1.53 2.9-.99 1.52-2.38 3.41-4.1 3.43-1.53.02-1.93-.99-4.01-.98-2.08.01-2.52 1-4.05.98-1.72-.02-3.03-1.72-4.02-3.24-2.76-4.25-3.05-9.24-1.35-11.9 1.21-1.9 3.13-3.01 4.93-3.01 1.83 0 2.98 1.01 4.5 1.01 1.47 0 2.37-1.01 4.5-1.01 1.61 0 3.32.88 4.52 2.4-3.97 2.18-3.33 7.85.61 9.42Z" />
    </svg>
  );
}

function PlayStoreIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-10 w-10 shrink-0"
    >
      <path
        fill="#34A853"
        d="M3.3 1.7c-.24.25-.38.64-.38 1.14v18.32c0 .5.14.89.38 1.14l.06.06 10.28-10.28v-.16L3.36 1.64l-.06.06Z"
      />
      <path
        fill="#4285F4"
        d="m17.06 15.52-3.42-3.44v-.16l3.42-3.44.08.05 4.05 2.3c1.16.66 1.16 1.74 0 2.4l-4.05 2.3-.08.04Z"
      />
      <path
        fill="#FBBC04"
        d="m17.14 15.47-3.5-3.5L3.3 22.3c.38.4 1 .45 1.7.05l12.14-6.88Z"
      />
      <path
        fill="#EA4335"
        d="M17.14 8.53 5 1.65c-.7-.4-1.32-.35-1.7.05l10.34 10.34 3.5-3.51Z"
      />
    </svg>
  );
}

function AppStoreBadge() {
  return (
    <div className="grid w-full grid-cols-[54px_1fr] items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center">
        <AppleIcon />
      </div>

      <div className="text-left leading-none">
        <p className="text-[12px] font-black uppercase tracking-[0.08em] text-[#070713]/65">
          Download on the
        </p>

        <p className="mt-1 whitespace-nowrap text-[1.45rem] font-black leading-none text-[#070713]">
          App Store
        </p>
      </div>
    </div>
  );
}

function PlayStoreBadge() {
  return (
    <div className="grid w-full grid-cols-[54px_1fr] items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center">
        <PlayStoreIcon />
      </div>

      <div className="text-left leading-none">
        <p className="text-[12px] font-black uppercase tracking-[0.08em] text-[#070713]/65">
          Get it on
        </p>

        <p className="mt-1 whitespace-nowrap text-[1.45rem] font-black leading-none text-[#070713]">
          Google Play
        </p>
      </div>
    </div>
  );
}

export default function TactlinkSupportSection() {
  return (
    <section className="relative px-5 pb-56 pt-20 bg-[#2654A4]">
      <WaterBubbles theme="dark" hasWaveBottom={true} />
      <div className="dragon-scale-overlay strong z-0" />
      <div className="mx-auto max-w-[1140px] relative z-10 text-[#041020]">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/60 backdrop-blur-xl px-8 py-8 shadow-[0_16px_40px_rgba(38,84,164,0.08)] md:px-10 md:py-10 lg:px-12 lg:py-10">
          {/* Subtle liquid reflection */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-white/20 pointer-events-none" />
          
          <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-[#2654A4]/20 bg-[#2654A4]/5 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-[#2654A4]">
                Website Supported By
              </p>

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white p-3 shadow-xl sm:h-24 sm:w-24">
                  <Image
                    src={assetPath("/patnership/tactlink.png")}
                    alt="Tactlink"
                    width={180}
                    height={180}
                    className="h-full w-full object-contain"
                    priority
                  />
                </div>

                <div className="min-w-0">
                  <h2 className="max-w-3xl text-2xl font-black leading-tight text-[#2654A4] md:text-3xl lg:text-4xl">
                    Connect smarter with{" "}
                    <span className="text-[#FDB715]">Tactlink</span>
                  </h2>

                  <p className="mt-2 max-w-xl leading-relaxed text-sm text-[#041020]/75">
                    This official website is supported by Tactlink. Download the
                    app to experience smarter digital networking and digital
                    business cards.
                  </p>
                </div>
              </div>
            </div>

            <a
              href={tactlinkLinks.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-[#2654A4]/20 bg-white/80 px-6 py-4 font-black text-[#2654A4] transition hover:-translate-y-1 hover:bg-[#2654A4] hover:text-white shadow-sm"
            >
              Visit Tactlink
              <ExternalLink size={18} />
            </a>
          </div>

          <div className="relative z-10 mt-6 border-t border-[#2654A4]/10 pt-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={tactlinkLinks.appStore}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download Tactlink on the App Store"
                className="group flex h-[68px] w-full items-center justify-center rounded-2xl bg-white px-6 text-[#070713] shadow-md ring-1 ring-[#2654A4]/10 transition-all hover:-translate-y-1 hover:bg-[#FDB715] hover:ring-[#FDB715]/50 hover:shadow-lg sm:w-[280px]"
              >
                <AppStoreBadge />
              </a>

              <a
                href={tactlinkLinks.playStore}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get Tactlink on Google Play"
                className="group flex h-[68px] w-full items-center justify-center rounded-2xl bg-white px-6 text-[#070713] shadow-md ring-1 ring-[#2654A4]/10 transition-all hover:-translate-y-1 hover:bg-[#FDB715] hover:ring-[#FDB715]/50 hover:shadow-lg sm:w-[280px]"
              >
                <PlayStoreBadge />
              </a>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <p className="text-lg font-black text-[#2654A4]">
                10,000+ Cards Shared
              </p>

              <div className="hidden h-2 w-2 rounded-full bg-[#2654A4]/25 sm:block" />

              <p className="inline-flex items-center gap-2 text-lg font-bold text-[#041020]/60">
                <Globe2 size={22} />
                Available in 8 Countries
              </p>
            </div>
          </div>
        </div>
      </div>

      <RiverSectionDivider className="text-[#F9F7F1]" theme="light" />
    </section>
  );
}