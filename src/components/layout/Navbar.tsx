"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "The Story", href: "#about" },
  { label: "Highlights", href: "#highlights" },
  { label: "Performers", href: "#lineup" },
  { label: "Registration", href: "#register" },
  { label: "Getting Here", href: "#location" },
];

import type { Dictionary } from "@/i18n/dictionaries";

export default function Navbar({
  dict,
  lang,
}: {
  dict: Dictionary["navbar"];
  lang: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition duration-500 ${scrolled || isOpen
          ? "border-b border-[#38BBCA]/20 bg-[#041020]/92 shadow-[0_18px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl"
          : "bg-transparent"
        }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:py-5">
        <a
          href={`/${lang}`}
          onClick={closeMenu}
          className="relative flex items-center gap-3"
        >
          <div className="relative h-12 w-[190px] md:h-14 md:w-[230px]">
            <Image
              src="/logo/logo.png"
              alt="Festival Cisadane 2026"
              fill
              priority
              sizes="230px"
              className="object-contain object-left"
            />
          </div>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {dict.items.map((item) => (
            <a
              key={item.href}
              href={`/${lang}${item.href}`}
              className="group relative text-sm font-bold text-white/72 transition hover:text-[#FDB715]"
            >
              <span>{item.label}</span>
              <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-gradient-to-r from-[#FDB715] via-[#38BBCA] to-[#EC3A24] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="flex items-center text-xs font-bold uppercase tracking-widest text-white/60">
            <a
              href="/en"
              className={`px-2 transition hover:text-white ${lang === "en" ? "text-white" : ""}`}
            >
              EN
            </a>
            <span>|</span>
            <a
              href="/id"
              className={`px-2 transition hover:text-white ${lang === "id" ? "text-white" : ""}`}
            >
              ID
            </a>
          </div>

          <a
            href={`/${lang}#register`}
            className="bg-[#FDB715] px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-[#041020] shadow-[5px_5px_0_rgba(56,187,202,0.75)] transition hover:-translate-y-0.5 hover:bg-white"
          >
            {dict.registerBtn}
          </a>
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-white/60">
            <a
              href="/en"
              className={`px-2 transition hover:text-white ${lang === "en" ? "text-white" : ""}`}
            >
              EN
            </a>
            <span>|</span>
            <a
              href="/id"
              className={`px-2 transition hover:text-white ${lang === "id" ? "text-white" : ""}`}
            >
              ID
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center border border-[#38BBCA]/35 bg-[#041020]/50 text-white transition hover:border-[#FDB715] hover:text-[#FDB715]"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <div
        className={`overflow-hidden border-t border-[#38BBCA]/10 bg-[#041020]/96 backdrop-blur-xl transition-all duration-500 lg:hidden ${isOpen ? "max-h-[440px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="relative px-5 py-5">
          <div className="pointer-events-none absolute inset-0">
            <div className="kv-geometric-overlay opacity-80" />
            <div className="tangerang-tenun-overlay ornament-fade-center" />
          </div>

          <div className="relative grid gap-2">
            {dict.items.map((item) => (
              <a
                key={item.href}
                href={`/${lang}${item.href}`}
                onClick={closeMenu}
                className="flex items-center justify-between border border-white/10 bg-white/[0.03] px-4 py-4 text-sm font-black uppercase tracking-[0.16em] text-white/76 transition hover:border-[#FDB715]/50 hover:bg-[#FDB715] hover:text-[#041020]"
              >
                {item.label}
                <span className="h-2 w-2 bg-[#38BBCA]" />
              </a>
            ))}

            <a
              href={`/${lang}#register`}
              onClick={closeMenu}
              className="mt-2 bg-[#FDB715] px-4 py-4 text-center text-sm font-black uppercase tracking-[0.18em] text-[#041020] shadow-[5px_5px_0_rgba(56,187,202,0.75)] transition hover:bg-white"
            >
              {dict.registerBtn}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}