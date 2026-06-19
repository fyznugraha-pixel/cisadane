"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, CalendarDays, MapPin, Sparkles } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(startDate: string): TimeLeft {
  const target = new Date(startDate).getTime();
  const now = new Date().getTime();
  const distance = Math.max(target - now, 0);

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
}

export default function HeroSection({
  dict,
  heroExp,
  lang,
}: {
  dict: Dictionary["site"];
  heroExp: Dictionary["heroExperience"];
  lang: string;
}) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setTimeLeft(getTimeLeft(dict.startDate));

    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(dict.startDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [dict.startDate]);

  const countdown = [
    { label: "Hari", value: timeLeft?.days },
    { label: "Jam", value: timeLeft?.hours },
    { label: "Menit", value: timeLeft?.minutes },
    { label: "Detik", value: timeLeft?.seconds },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#07152B]">
      {/* Real image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('/images/cisadane-hero.jpg')",
        }}
      />

      {/* Official KV atmosphere */}
      <div className="cisadane-bg absolute inset-0" />
      <div className="hero-image-overlay absolute inset-0" />
      <div className="kv-geometric-overlay absolute inset-0" />
      <div className="kv-block-pattern absolute inset-0" />
      <div className="cultural-texture absolute inset-0 opacity-20" />

      {/* Big decorative geometric blocks */}
      <div className="absolute -left-16 top-28 hidden h-44 w-44 rotate-12 bg-[#FDB715]/90 md:block" />
      <div className="absolute -left-4 top-44 hidden h-28 w-28 rounded-br-[70px] bg-[#38BBCA]/90 md:block" />
      <div className="absolute right-[-90px] top-28 hidden h-64 w-64 rotate-6 bg-[#2654A4]/70 lg:block" />
      <div className="absolute right-20 top-52 hidden h-24 w-24 rounded-bl-[60px] bg-[#F7951E]/90 lg:block" />
      <div className="absolute right-40 top-80 hidden h-16 w-16 rounded-full bg-[#EC3A24]/90 lg:block" />

      {/* Stage lights */}
      <div className="stage-light-gold absolute left-[20%] top-0 h-[540px] w-[130px] -rotate-12" />
      <div className="stage-light-cyan absolute left-[54%] top-0 h-[540px] w-[130px] rotate-6" />
      <div className="stage-light-red absolute right-[14%] top-0 h-[540px] w-[130px] rotate-12" />

      {/* Floating particles */}
      <div className="lantern-particles">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-5 pb-40 pt-32 md:pt-36 lg:grid-cols-[0.95fr_0.85fr] lg:pt-32">
        {/* LEFT CONTENT */}
        <div className="max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.42em] text-white/68 md:text-sm">
            {dict.eyebrow}
          </p>

          <h1 className="mt-4 max-w-5xl text-balance text-5xl font-black uppercase leading-[0.88] tracking-[-0.06em] text-white md:text-7xl lg:text-[104px]">
            Festival
            <br />
            <span
              className="text-[#FDB715]"
              style={{
                textShadow:
                  "5px 5px 0 #38BBCA, 9px 9px 0 rgba(38,84,164,0.85)",
              }}
            >
              Cisadane
            </span>
          </h1>

          <div className="mt-7 h-[3px] w-full max-w-2xl bg-gradient-to-r from-[#EC3A24] via-[#FDB715] to-[#38BBCA]" />

          <p className="mt-7 max-w-3xl text-2xl font-black italic leading-tight text-white md:text-4xl lg:text-[42px]">
            <span className="text-[#38BBCA]">Flowing Heritage,</span>{" "}
            <span className="text-[#FDB715]">Growing Courage</span>
          </p>

          <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-white/76 md:text-lg">
            {dict.description}
          </p>

          <div className="mt-12 flex flex-wrap gap-5">
            <a
              href={`/${lang}#register`}
              className="group flex items-center gap-3 bg-[#FDB715] px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#041020] shadow-[6px_6px_0_rgba(56,187,202,0.75)] transition hover:-translate-y-0.5 hover:bg-white md:text-sm"
            >
              <span>{dict.cta.primary}</span>
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </a>

            <a
              href={`/${lang}#about`}
              className="group flex items-center gap-3 border border-white/20 bg-white/5 px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-white backdrop-blur-sm transition hover:bg-white/10 md:text-sm"
            >
              <span>{dict.cta.secondary}</span>
            </a>
          </div>

          <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-3 text-white/78">
              <CalendarDays size={20} className="text-[#FDB715]" />
              <span className="text-sm font-bold tracking-wide">{dict.date}</span>
            </div>
            <div className="flex items-center gap-3 text-white/78">
              <MapPin size={20} className="text-[#38BBCA]" />
              <span className="text-sm font-bold tracking-wide">{dict.location}</span>
            </div>
          </div>

          <div className="mt-8 grid max-w-xl grid-cols-4 border border-[#38BBCA]/25 bg-[#041020]/60">
            {countdown.map((item) => (
              <div
                key={item.label}
                className="border-r border-[#38BBCA]/15 px-3 py-3 last:border-r-0 md:px-4 md:py-4"
              >
                <div className="text-2xl font-black text-[#FDB715] md:text-4xl">
                  {item.value === undefined
                    ? "--"
                    : String(item.value).padStart(2, "0")}
                </div>

                <div className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/45 md:text-xs">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT KEY VISUAL CARD */}
        <div className="relative hidden lg:block">
          <div className="absolute -left-10 top-10 h-72 w-72 rounded-full bg-[#38BBCA]/22 blur-3xl" />
          <div className="absolute -right-8 bottom-8 h-80 w-80 rounded-full bg-[#FDB715]/18 blur-3xl" />
          <div className="absolute right-12 top-24 h-56 w-56 rounded-full bg-[#EC3A24]/14 blur-3xl" />

          <div className="relative border border-[#38BBCA]/30 bg-[#041020]/62 p-4 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-sm">
            <div className="absolute -left-4 -top-4 h-20 w-20 border-l-4 border-t-4 border-[#FDB715]" />
            <div className="absolute -bottom-4 -right-4 h-20 w-20 border-b-4 border-r-4 border-[#38BBCA]" />

            <div className="relative min-h-[560px] overflow-hidden bg-[#2654A4]">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-28"
                style={{
                  backgroundImage: "url('/images/cisadane-hero.jpg')",
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-br from-[#2654A4]/95 via-[#0092B7]/58 to-[#041020]/95" />
              <div className="kv-geometric-overlay absolute inset-0 opacity-100" />
              <div className="water-reflection absolute bottom-0 left-0 h-[36%] w-full opacity-60" />

              {/* KV top badges */}
              <div className="absolute left-7 top-7 flex items-center gap-4">
                <span className="kv-symbol h-14 w-14" />

                <div className="border border-white/15 bg-[#041020]/45 px-4 py-3 backdrop-blur-sm">
                  <p className="text-[10px] font-black uppercase tracking-[0.26em] text-[#FDB715]">
                    Visual Identity
                  </p>
                  <p className="mt-1 text-sm font-bold text-white/76">
                    Festival Cisadane 2026
                  </p>
                </div>
              </div>

              <div className="absolute right-7 top-7 flex h-20 w-20 items-center justify-center bg-white">
                <div className="h-12 w-12 bg-[#2654A4]" />
                <div className="absolute h-7 w-7 border-[7px] border-[#FDB715]" />
              </div>

              {/* Decorative blocks */}
              <div className="absolute left-8 top-40 h-24 w-24 rounded-br-[64px] bg-[#38BBCA]" />
              <div className="absolute left-24 top-32 h-20 w-20 bg-[#FDB715]" />
              <div className="absolute right-10 top-40 h-28 w-28 bg-[#0092B7]" />
              <div className="absolute right-16 top-52 h-12 w-12 rounded-full bg-[#EC3A24]" />
              <div className="absolute bottom-44 left-8 h-16 w-16 rounded-tr-[48px] bg-[#F7951E]" />

              <div className="absolute bottom-0 left-0 right-0 h-[52%] bg-gradient-to-t from-[#041020] via-[#041020]/86 to-transparent" />

              <div className="absolute bottom-8 left-7 right-7">
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center bg-[#FDB715]">
                    <Sparkles size={12} className="text-[#041020]" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#FDB715]">
                    {heroExp.badge}
                  </span>
                </div>

                <h2 className="mt-4 text-3xl font-black uppercase leading-[0.95] tracking-tight text-white lg:text-[42px]">
                  {heroExp.titleLine1}
                  <br />
                  <span className="text-[#FDB715]" style={{ textShadow: "0 0 20px rgba(253,183,21,0.4)" }}>
                    {heroExp.titleLine2}
                  </span>
                </h2>

                <p className="mt-5 max-w-md text-sm font-medium leading-7 text-white/68">
                  {heroExp.description}
                </p>

                <div className="mt-6 flex items-center gap-4 border-l-4 border-[#FDB715] bg-[#041020]/88 p-4">
                  <div className="relative h-20 w-20 shrink-0">
                    <Image
                      src="/logo/ken.png"
                      alt="Karisma Event Nusantara"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.08em] text-[#FDB715]">
                      {dict.badge}
                    </p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white/68">
                      {dict.recognition}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-8 left-10 border border-[#38BBCA]/45 bg-[#0092B7]/75 px-5 py-4 backdrop-blur-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#FDB715]">
              {dict.atmosphere}
            </p>
            <p className="mt-1 text-sm font-bold text-white/78">
              {dict.atmosphereDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Organic river transition */}
      <div className="river-transition">
        <svg
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          className="river-glow"
        >
          <defs>
            <linearGradient
              id="riverReflectionGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(38,84,164,0.42)" />
              <stop offset="30%" stopColor="rgba(56,187,202,0.24)" />
              <stop offset="58%" stopColor="rgba(253,183,21,0.18)" />
              <stop offset="78%" stopColor="rgba(247,149,30,0.18)" />
              <stop offset="100%" stopColor="rgba(236,58,36,0.18)" />
            </linearGradient>
          </defs>

          <path
            className="river-fill-reflection"
            d="M0,70 C120,108 240,146 360,140 C480,134 600,82 720,78 C840,74 960,124 1080,136 C1200,148 1320,126 1440,94 L1440,220 L0,220 Z"
          />

          <path
            className="river-fill-main"
            d="M0,94 C120,126 240,154 360,148 C480,142 600,98 720,96 C840,94 960,132 1080,144 C1200,156 1320,140 1440,110 L1440,220 L0,220 Z"
          />

          <path
            className="river-stroke-main"
            d="M0,94 C120,126 240,154 360,148 C480,142 600,98 720,96 C840,94 960,132 1080,144 C1200,156 1320,140 1440,110"
          />

          <path
            className="river-stroke-soft"
            d="M0,76 C120,110 240,138 360,132 C480,126 600,88 720,86 C840,84 960,120 1080,130 C1200,140 1320,126 1440,98"
          />
        </svg>
      </div>
    </section>
  );
}