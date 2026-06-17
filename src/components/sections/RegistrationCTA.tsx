import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";

export default function RegistrationCTA() {
  return (
    <section id="register" className="relative overflow-hidden px-5 py-28">
      <div className="absolute inset-0 bg-[#05080d]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c8a03c]/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 border border-[#c8a03c]/25 bg-[#0d1b2a]/60 p-8 md:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.38em] text-[#c8281e]">
              Registrasi Festival
            </p>
            <h2 className="mt-5 font-serif text-5xl font-black uppercase leading-none text-[#f5f0e8] md:text-7xl">
              Datang ke
              <br />
              Tepi Cisadane
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-9 text-[#cfc2aa]">
              Sistem registrasi sedang disiapkan sebagai pintu masuk untuk
              pengunjung, UMKM, komunitas, media, KOL, dan partner festival.
            </p>
          </div>

          <div className="border border-[#f5f0e8]/10 bg-black/25 p-7">
            <p className="text-xs uppercase tracking-[0.3em] text-[#9f927d]">
              Current Status
            </p>

            <h3 className="mt-4 font-serif text-4xl font-black uppercase text-[#c8a03c]">
              Coming Soon
            </h3>

            <button
              disabled
              className="mt-8 flex w-full cursor-not-allowed items-center justify-center gap-3 bg-[#cfc2aa]/15 px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-[#cfc2aa]/55"
            >
              {siteConfig.cta.primary}
              <ArrowRight size={18} />
            </button>

            <p className="mt-5 text-sm leading-7 text-[#9f927d]">
              Saat data resmi sudah final, tombol ini bisa dibuka untuk form
              visitor, tenant UMKM, media/KOL, komunitas, dan sponsor inquiry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}