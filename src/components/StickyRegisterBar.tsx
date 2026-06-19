"use client";

import { X } from "lucide-react";
import { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";

export default function StickyRegisterBar({
  dict,
  lang,
}: {
  dict: Dictionary["stickyBar"];
  lang: string;
}) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside className="fixed bottom-4 left-1/2 z-[70] w-[calc(100%-1.5rem)] max-w-5xl -translate-x-1/2 md:bottom-6">
      <div className="relative overflow-hidden border border-[#C8A03C]/30 bg-[#060E16]/92 shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0">
          <div className="dragon-scale-overlay soft ornament-fade-center" />
          <div className="tangerang-tenun-overlay ornament-fade-center" />
        </div>

        <div className="relative grid gap-4 p-4 md:grid-cols-[1fr_auto_36px] md:items-center md:gap-5 md:p-5">
          <div className="pr-10 md:pr-0">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#C8A03C]">
              {dict.title}
            </p>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#F5F0E8]/70">
              {dict.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:flex md:items-center">
            <a
              href={`/${lang}#highlights`}
              className="border border-[#1D6478]/65 px-4 py-3 text-center text-[11px] font-black uppercase tracking-[0.16em] text-[#78C5D6] transition hover:bg-[#1D6478] hover:text-[#F5F0E8] md:min-w-[150px]"
            >
              {dict.viewHighlights}
            </a>

            <a
              href={`/${lang}#register`}
              className="bg-[#C8A03C] px-4 py-3 text-center text-[11px] font-black uppercase tracking-[0.16em] text-[#060E16] transition hover:bg-[#F5F0E8] md:min-w-[170px]"
            >
              {dict.registerNow}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsVisible(false)}
            aria-label={dict.closeLabel}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center border border-[#F5F0E8]/10 bg-[#060E16]/70 text-[#F5F0E8]/50 transition hover:border-[#C8281E]/60 hover:bg-[#C8281E]/15 hover:text-[#F5F0E8] md:static md:h-9 md:w-9"
          >
            <X size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}