"use client";

export default function StickyRegisterBar() {
  return (
    <div className="fixed bottom-4 left-1/2 z-[60] w-[calc(100%-1.5rem)] max-w-3xl -translate-x-1/2 border border-[#C8A03C]/30 bg-[#060E16]/88 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl md:bottom-6 md:p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#C8A03C]">
            Festival Cisadane 2026
          </p>
          <p className="mt-1 text-sm text-[#F5F0E8]/70">
            Siap bergabung sebagai pengunjung, UMKM, peserta perahu naga, atau kolaborator?
          </p>
        </div>

        <div className="flex gap-3">
          <a
            href="#highlights"
            className="flex-1 border border-[#1D6478]/55 px-4 py-3 text-center text-xs font-black uppercase tracking-[0.16em] text-[#1D6478] transition hover:bg-[#1D6478] hover:text-[#F5F0E8] md:flex-none"
          >
            Lihat Atraksi
          </a>
          <a
            href="#register"
            className="flex-1 bg-[#C8A03C] px-4 py-3 text-center text-xs font-black uppercase tracking-[0.16em] text-[#060E16] transition hover:bg-[#F5F0E8] md:flex-none"
          >
            Daftar Sekarang
          </a>
        </div>
      </div>
    </div>
  );
}