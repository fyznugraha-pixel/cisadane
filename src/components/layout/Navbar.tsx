"use client";

import { useEffect, useState } from "react";

const navItems = [
  { label: "Cerita", href: "#about" },
  { label: "Atraksi", href: "#highlights" },
  { label: "Lineup", href: "#lineup" },
  { label: "Registrasi", href: "#register" },
  { label: "Lokasi", href: "#location" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition duration-500 ${
        scrolled
          ? "border-b border-[#C8A03C]/20 bg-[#060E16]/90 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
        <a href="#" className="flex items-center gap-3">
          <span className="dragon-mark h-9 w-9 shadow-[0_0_30px_rgba(200,40,30,0.45)]" />

          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-black uppercase tracking-[0.16em] text-[#F5F0E8]">
              Cisadane
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#C8A03C]">
              River Festival
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#F5F0E8]/70 transition hover:text-[#C8A03C]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="#register"
          className="border border-[#C8A03C]/70 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#C8A03C] transition hover:bg-[#C8A03C] hover:text-[#060E16]"
        >
          Daftar
        </a>
      </nav>
    </header>
  );
}