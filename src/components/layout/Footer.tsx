import { siteConfig } from "@/data/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#C8A03C]/15 bg-[#060E16] px-5 py-12">
      <div className="wave-divider absolute left-0 top-0 h-px w-full" />

      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="dragon-mark h-9 w-9" />
            <span className="font-display text-2xl font-black uppercase text-[#F5F0E8]">
              {siteConfig.eventName}
            </span>
          </div>

          <p className="mt-4 max-w-xl leading-7 text-[#F5F0E8]/42">
            Portal pengalaman Festival Cisadane 2026. Visual identity dibangun
            dari malam sungai, perahu naga, cahaya panggung, dan budaya
            multikultural Tangerang.
          </p>
        </div>

        <div className="text-sm text-[#F5F0E8]/42 md:text-right">
          <p className="text-[#C8A03C]">{siteConfig.tagline}</p>
          <p className="mt-2">© 2026 Festival Cisadane.</p>
        </div>
      </div>
    </footer>
  );
}