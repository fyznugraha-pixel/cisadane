"use client";

import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import Link from "next/link";
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
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${scrolled || isOpen
          ? "border-b border-[#2654A4]/10 bg-white/95 shadow-md backdrop-blur-xl"
          : "bg-transparent"
        }`}
    >
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#2654A4] via-[#38BBCA] via-[#FDB715] to-[#EC3A24]" />

      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-8">
        <Link
          href={`/${lang}`}
          onClick={closeMenu}
          className="relative flex items-center gap-3"
        >
          <div className="relative h-12 w-[190px] md:h-14 md:w-[230px]">
            <Image
              src={assetPath("/logo/logo.png")}
              alt="Festival Cisadane 2026"
              fill
              priority
              sizes="230px"
              className="object-contain object-left"
            />
          </div>
        </Link>

        {/* CENTER NAV LINKS */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-6 xl:gap-10">
          {dict.items.map((item) => (
            <Link
              key={item.href}
              href={`/${lang}${item.href}`}
              className="group relative px-2 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#041020]/80 transition hover:text-[#2654A4] lg:text-[11px]"
            >
              <span>{item.label}</span>
              {item.href === "/" && (
                <span className="absolute bottom-3 left-2 h-1 w-6 bg-[#EC3A24]" />
              )}
              <span className="absolute bottom-3 left-2 h-1 w-0 bg-[#2654A4] transition-all duration-300 group-hover:w-6" />
            </Link>
          ))}
        </div>

        {/* RIGHT ACTIONS */}
        <div className="hidden items-center lg:flex">
          <div className="mr-6 flex items-center text-[10px] font-bold uppercase tracking-widest text-[#041020]/60">
            <Link
              href="/en"
              className={`px-2 transition hover:text-[#2654A4] ${lang === "en" ? "text-[#2654A4]" : ""}`}
            >
              EN
            </Link>
            <span>|</span>
            <Link
              href="/id"
              className={`px-2 transition hover:text-[#2654A4] ${lang === "id" ? "text-[#2654A4]" : ""}`}
            >
              ID
            </Link>
          </div>

          <Link
            href={`/${lang}/register`}
            className="bg-[#FDB715] px-6 py-3.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#041020] shadow-[5px_5px_0_rgba(38,84,164,0.3)] transition hover:-translate-y-0.5 hover:bg-[#2654A4] hover:text-white"
          >
            {dict.registerBtn}
          </Link>
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-[#041020]/60">
            <Link
              href="/en"
              className={`px-2 transition hover:text-[#2654A4] ${lang === "en" ? "text-[#2654A4]" : ""}`}
            >
              EN
            </Link>
            <span>|</span>
            <Link
              href="/id"
              className={`px-2 transition hover:text-[#2654A4] ${lang === "id" ? "text-[#2654A4]" : ""}`}
            >
              ID
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center border border-[#2654A4]/20 bg-white/50 text-[#041020] transition hover:border-[#2654A4] hover:text-[#2654A4]"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <div
        className={`overflow-hidden border-t border-[#2654A4]/10 bg-white/95 backdrop-blur-xl transition-all duration-500 lg:hidden ${isOpen ? "max-h-[440px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="relative px-5 py-5">
          <div className="relative grid gap-2">
            {dict.items.map((item) => (
              <Link
                key={item.href}
                href={`/${lang}${item.href}`}
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between border-b border-[#2654A4]/5 px-4 py-4 text-xs font-black uppercase tracking-[0.2em] text-[#041020]/80 transition hover:bg-[#2654A4]/5 hover:text-[#2654A4]"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href={`/${lang}/register`}
              onClick={closeMenu}
              className="mt-2 bg-[#FDB715] px-4 py-4 text-center text-sm font-black uppercase tracking-[0.18em] text-[#041020] shadow-[5px_5px_0_rgba(56,187,202,0.75)] transition hover:bg-white"
            >
              {dict.registerBtn}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
