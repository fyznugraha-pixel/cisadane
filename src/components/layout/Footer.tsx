import { siteConfig } from "@/data/site";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#C8A03C]/15 bg-[#060E16] px-5 py-12">
      <div className="wave-divider absolute left-0 top-0 h-px w-full" />

      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-[180px]">
              <Image
                src="/logo/logo.png"
                alt="Festival Cisadane 2026 Logo"
                fill
                sizes="180px"
                className="object-contain object-left"
              />
            </div>
          </div>

          <p className="mt-4 max-w-xl leading-7 text-[#F5F0E8]/42">
            The official portal for Festival Cisadane 2026. A tribute to the
            river's nightscape, dragon boat heritage, luminous stages, and the
            multicultural spirit of Tangerang.
          </p>
        </div>

        <div className="text-sm text-[#F5F0E8]/42 md:text-right">
          <p className="text-[#C8A03C]">{siteConfig.tagline}</p>
          <p className="mt-2">© 2026 Festival Cisadane. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
