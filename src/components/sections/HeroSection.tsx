"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { siteConfig } from "@/data/site";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(): TimeLeft {
  const target = new Date(siteConfig.startDate).getTime();
  const now = new Date().getTime();
  const distance = Math.max(target - now, 0);

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
}

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const countdown = [
    { label: "Hari", value: timeLeft?.days },
    { label: "Jam", value: timeLeft?.hours },
    { label: "Menit", value: timeLeft?.minutes },
    { label: "Detik", value: timeLeft?.seconds },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Real festival image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-42"
        style={{
          backgroundImage: "url('/images/cisadane-hero.jpg')",
        }}
      />

      {/* Atmosphere layers */}
      <div className="cisadane-bg absolute inset-0" />
      <div className="hero-image-overlay absolute inset-0" />
      <div className="cultural-texture absolute inset-0 opacity-30" />
      <div className="dragon-scale absolute right-0 top-0 h-full w-1/2" />

      {/* Stage lights */}
      <div className="stage-light-gold absolute left-[18%] top-0 h-[520px] w-[120px] -rotate-12" />
      <div className="stage-light-red absolute right-[16%] top-0 h-[520px] w-[120px] rotate-12" />

      {/* Floating light particles */}
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
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-[#C8281E] px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#F5F0E8] md:text-xs">
              {siteConfig.badge}
            </span>

            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C8A03C] md:text-xs">
              {siteConfig.recognition}
            </span>
          </div>

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.38em] text-[#F5F0E8]/62 md:text-sm">
            {siteConfig.eyebrow}
          </p>

          <h1 className="font-display mt-4 max-w-5xl text-balance text-5xl font-black uppercase leading-[0.9] text-[#F5F0E8] md:text-7xl lg:text-[92px]">
            Festival
            <br />
            <span className="text-[#C8A03C]">Cisadane</span>
          </h1>

          <div className="mt-6 h-px w-full max-w-2xl bg-gradient-to-r from-[#C8281E] via-[#C8A03C] to-transparent" />

          <p className="font-display mt-6 max-w-3xl text-2xl font-bold leading-tight text-[#F5F0E8] md:text-4xl lg:text-[42px]">
            {siteConfig.tagline}
          </p>

          <p className="mt-5 max-w-2xl text-base leading-8 text-[#F5F0E8]/72 md:text-lg">
            {siteConfig.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-3 text-sm text-[#F5F0E8]/70">
            <div className="flex items-center gap-2 border border-[#C8A03C]/25 bg-[#060E16]/45 px-4 py-2">
              <CalendarDays size={16} className="text-[#C8A03C]" />
              {siteConfig.date}
            </div>

            <div className="flex items-center gap-2 border border-[#1D6478]/50 bg-[#060E16]/45 px-4 py-2">
              <MapPin size={16} className="text-[#1D6478]" />
              {siteConfig.location}
            </div>
          </div>

          <div className="mt-8 grid max-w-xl grid-cols-4 border border-[#C8A03C]/25 bg-[#060E16]/48">
            {countdown.map((item) => (
              <div
                key={item.label}
                className="border-r border-[#C8A03C]/15 px-3 py-3 last:border-r-0 md:px-4 md:py-4"
              >
                <div className="font-display text-2xl font-black text-[#C8A03C] md:text-4xl">
                  {item.value === undefined
                    ? "--"
                    : String(item.value).padStart(2, "0")}
                </div>

                <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#F5F0E8]/45 md:text-xs">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#register"
              className="inline-flex items-center gap-3 bg-[#C8A03C] px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-[#060E16] transition hover:bg-[#F5F0E8] md:px-7 md:py-4 md:text-sm"
            >
              {siteConfig.cta.primary}
              <ArrowRight size={18} />
            </a>

            <a
              href="#highlights"
              className="inline-flex items-center gap-3 border border-[#E8823A]/70 px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-[#E8823A] transition hover:bg-[#E8823A] hover:text-[#060E16] md:px-7 md:py-4 md:text-sm"
            >
              {siteConfig.cta.secondary}
            </a>
          </div>
        </div>

        {/* RIGHT FESTIVAL POSTER */}
        <div className="relative hidden lg:block">
          <div className="absolute -left-10 top-10 h-72 w-72 rounded-full bg-[#1D6478]/25 blur-3xl" />
          <div className="absolute -right-8 bottom-8 h-80 w-80 rounded-full bg-[#C8281E]/20 blur-3xl" />

          <div className="relative border border-[#C8A03C]/25 bg-[#060E16]/55 p-4 shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
            <div className="absolute -left-4 -top-4 h-20 w-20 border-l border-t border-[#C8A03C]/70" />
            <div className="absolute -bottom-4 -right-4 h-20 w-20 border-b border-r border-[#C8A03C]/70" />

            <div
              className="relative min-h-[560px] overflow-hidden bg-cover bg-center"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(13,27,42,0.12), rgba(3,7,13,0.95)), url('/images/cisadane-hero.jpg')",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1D6478]/25 via-transparent to-[#C8281E]/20" />
              <div className="dragon-scale absolute inset-0 opacity-80" />

              <div className="absolute left-7 top-7 border border-[#C8A03C]/35 bg-[#060E16]/58 px-4 py-3 backdrop-blur-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.26em] text-[#C8A03C]">
                  Night River
                </p>
                <p className="mt-1 text-sm font-semibold text-[#F5F0E8]/70">
                  Tepian Sungai Cisadane
                </p>
              </div>

              <div className="absolute right-7 top-7 flex h-20 w-20 items-center justify-center border border-[#C8281E]/45 bg-[#C8281E]/18">
                <span className="dragon-mark h-12 w-12" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-[#03070D] via-[#03070D]/78 to-transparent" />

              <div className="absolute bottom-8 left-7 right-7">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#E8823A]">
                  Festival Experience
                </p>

                <h2 className="font-display mt-4 text-5xl font-black uppercase leading-none text-[#F5F0E8]">
                  Dragon Boat
                  <br />
                  River Stage
                </h2>

                <p className="mt-5 max-w-md text-sm leading-7 text-[#F5F0E8]/62">
                  Perahu naga, panggung malam, cahaya air, kuliner rakyat, dan
                  energi multikultural dalam satu festival sungai.
                </p>

                <div className="mt-6 grid grid-cols-3 gap-px bg-[#C8A03C]/25">
                  <div className="bg-[#060E16]/85 p-4">
                    <p className="font-display text-3xl font-black text-[#C8A03C]">
                      5
                    </p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5F0E8]/45">
                      Hari
                    </p>
                  </div>

                  <div className="bg-[#060E16]/85 p-4">
                    <p className="font-display text-3xl font-black text-[#C8A03C]">
                      125
                    </p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5F0E8]/45">
                      KEN
                    </p>
                  </div>

                  <div className="bg-[#060E16]/85 p-4">
                    <p className="font-display text-3xl font-black text-[#C8A03C]">
                      2026
                    </p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5F0E8]/45">
                      Event
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-8 left-10 border border-[#1D6478]/45 bg-[#0F3D4A]/70 px-5 py-4 backdrop-blur-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#C8A03C]">
              Atmosfer
            </p>
            <p className="mt-1 text-sm font-semibold text-[#F5F0E8]/72">
              Malam sungai, cahaya panggung, refleksi air.
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
              <stop offset="0%" stopColor="rgba(29,100,120,0.34)" />
              <stop offset="35%" stopColor="rgba(245,240,232,0.10)" />
              <stop offset="65%" stopColor="rgba(232,130,58,0.12)" />
              <stop offset="100%" stopColor="rgba(29,100,120,0.28)" />
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