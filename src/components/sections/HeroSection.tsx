"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ArrowRight, CalendarDays, MapPin, Sparkles, Volume2, VolumeX } from "lucide-react";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}
import type { Dictionary } from "@/i18n/dictionaries";
import RiverSectionDivider from "@/components/RiverSectionDivider";

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

  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // Load YouTube API script
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      if (firstScriptTag?.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else {
      initPlayer();
    }

    function initPlayer() {
      playerRef.current = new window.YT.Player("youtube-player", {
        videoId: "PivUmEuNqJA",
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          showinfo: 0,
          rel: 0,
          loop: 1,
          playlist: "PivUmEuNqJA",
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo();
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.playVideo(); // Fallback loop
            }
          },
        },
      });
    }
  }, []);

  const toggleMute = () => {
    if (playerRef.current && playerRef.current.unMute) {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    }
  };

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
    <section className="relative min-h-screen overflow-hidden bg-[#FDFBF7]">
      {/* Real image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('/images/cisadane-hero.jpg')",
        }}
      />

      {/* Official KV atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FDFBF7] via-white/90 to-[#FDFBF7]/80" />
      <div className="absolute inset-0 bg-white/40" />
      <div className="kv-geometric-overlay absolute inset-0" />
      <div className="kv-block-pattern absolute inset-0" />
      <div className="cultural-texture absolute inset-0 opacity-20" />

      {/* Elegant Geometric Accents (Glassmorphism) */}
      <div className="absolute -left-12 top-40 hidden h-40 w-40 rotate-12 rounded-3xl bg-gradient-to-br from-[#FDB715]/30 to-[#FDB715]/5 backdrop-blur-md border border-white/40 shadow-lg md:block" />
      <div className="absolute left-6 top-64 hidden h-24 w-24 -rotate-6 rounded-full bg-gradient-to-tr from-[#38BBCA]/40 to-[#38BBCA]/5 backdrop-blur-md border border-white/40 shadow-md md:block" />
      
      <div className="absolute -right-16 top-32 hidden h-72 w-56 -rotate-6 rounded-[40px] bg-gradient-to-bl from-[#2654A4]/30 to-[#2654A4]/5 backdrop-blur-lg border border-white/30 shadow-xl lg:block" />
      <div className="absolute right-24 top-80 hidden h-28 w-28 rotate-12 rounded-2xl bg-gradient-to-br from-[#F7951E]/40 to-[#EC3A24]/10 backdrop-blur-md border border-white/40 shadow-md lg:block" />

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

      {/* Full-width Partnership Logos */}
      <div className="relative z-20 mx-auto w-full max-w-[1440px] pt-24 md:pt-28">
        <div className="w-full overflow-x-auto px-5 pb-2 md:overflow-x-visible md:px-12 md:pb-0">
          <div className="flex w-max min-w-full items-center justify-start md:w-full md:justify-center">
            <Image
              src="/patnership/all-logo.png"
              alt="Partnership Logos"
              width={1200}
              height={160}
              className="h-10 w-auto max-w-none object-contain md:h-16 md:w-full"
              priority
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto grid flex-1 max-w-7xl items-center gap-12 px-5 pb-40 pt-16 md:pt-20 lg:grid-cols-[0.95fr_0.85fr] lg:pt-16">
        {/* LEFT CONTENT */}
        <div className="max-w-4xl">

          <p className="text-xs font-black uppercase tracking-[0.42em] text-[#041020]/70 md:text-sm">
            {dict.eyebrow}
          </p>

          <h1 className="mt-4 max-w-5xl text-balance text-5xl font-black uppercase leading-[0.88] tracking-[-0.06em] text-[#2654A4] md:text-7xl lg:text-[104px]">
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

          <div className="mt-7 h-[3px] w-full max-w-2xl bg-gradient-to-r from-[#2654A4] via-[#FDB715] to-[#EC3A24]" />

          <p className="mt-7 max-w-3xl text-2xl font-black italic leading-tight text-[#041020] md:text-4xl lg:text-[42px]">
            <span className="text-[#2654A4]">Flowing Heritage,</span>{" "}
            <span className="text-[#EC3A24]">Growing Courage</span>
          </p>

          <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-[#041020]/80 md:text-lg">
            {dict.description}
          </p>

          <div className="mt-12 flex flex-wrap gap-5">
            <a
              href={`/festivalcisadane/${lang}#register`}
              className="group flex items-center gap-3 bg-[#FDB715] px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#041020] shadow-[6px_6px_0_rgba(56,187,202,0.75)] transition hover:-translate-y-0.5 hover:bg-white md:text-sm"
            >
              <span>{dict.cta.primary}</span>
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </a>

            <a
              href={`/festivalcisadane/${lang}#about`}
              className="group flex items-center gap-3 border border-[#2654A4]/30 bg-[#2654A4]/5 px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#2654A4] backdrop-blur-sm transition hover:bg-[#2654A4]/10 md:text-sm"
            >
              <span>{dict.cta.secondary}</span>
            </a>
          </div>

          <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-3 text-[#041020]/80">
              <CalendarDays size={20} className="text-[#FDB715]" />
              <span className="text-sm font-bold tracking-wide">{dict.date}</span>
            </div>
            <div className="flex items-center gap-3 text-[#041020]/80">
              <MapPin size={20} className="text-[#EC3A24]" />
              <span className="text-sm font-bold tracking-wide">{dict.location}</span>
            </div>
          </div>

          <div className="mt-8 grid max-w-xl grid-cols-4 border border-[#2654A4]/15 bg-white/60 shadow-lg backdrop-blur-md">
            {countdown.map((item) => (
              <div
                key={item.label}
                className="border-r border-[#2654A4]/10 px-3 py-3 last:border-r-0 md:px-4 md:py-4"
              >
                <div className="text-2xl font-black text-[#2654A4] md:text-4xl">
                  {item.value === undefined
                    ? "--"
                    : String(item.value).padStart(2, "0")}
                </div>

                <div className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#041020]/50 md:text-xs">
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

          <div className="relative border-4 border-[#2654A4] bg-[#2654A4] p-3 shadow-2xl backdrop-blur-sm">
            <div className="absolute -left-5 -top-5 h-20 w-20 border-l-8 border-t-8 border-[#FDB715]" />
            <div className="absolute -bottom-5 -right-5 h-20 w-20 border-b-8 border-r-8 border-[#38BBCA]" />

            <div className="group relative flex flex-col w-full overflow-hidden rounded-xl bg-white border border-[#2654A4]/10 shadow-inner">
              
              {/* TOP: Full-width KEN Nomination Banner */}
              <div className="relative flex items-center justify-between border-b border-[#2654A4]/10 bg-gradient-to-r from-white to-[#FDFBF7] px-6 py-5">
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 shrink-0">
                    <Image
                      src="/logo/ken.png"
                      alt="Karisma Event Nusantara"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#2654A4]">
                      {dict.badge}
                    </p>
                    <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#041020]/80">
                      {dict.recognition}
                    </p>
                  </div>
                </div>
                {/* Decorative element on the right */}
                <div className="hidden h-8 w-8 shrink-0 rounded-full border-[3px] border-[#38BBCA]/40 lg:block" />
              </div>

              {/* MIDDLE: True 16:9 Video Container without cropping */}
              <div className="group/video relative aspect-video w-full overflow-hidden bg-white">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2654A4] via-[#38BBCA] to-[#FDB715] opacity-10 blur-xl" />
                
                {/* Title Overlay for Aftermovie */}
                <div className="pointer-events-none absolute left-3 top-3 z-20 max-w-[70%] rounded bg-black/40 px-3 py-2 backdrop-blur-sm md:left-4 md:top-4 transition-opacity duration-500">
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#EC3A24] opacity-75"></span>
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#EC3A24]"></span>
                    </span>
                    <span className="text-[8px] font-bold uppercase tracking-wider text-white/80">
                      Flashback 2025
                    </span>
                  </div>
                  <h3 className="mt-0.5 text-[10px] md:text-xs font-semibold leading-tight text-white drop-shadow-md">
                    Kemeriahan Festival Cisadane Tahun Lalu
                  </h3>
                </div>
                
                <div
                  id="youtube-player"
                  className="pointer-events-none absolute inset-0 h-[120%] w-[120%] -translate-x-[10%] -translate-y-[10%] object-cover object-center transition-transform duration-[1200ms] ease-out group-hover/video:scale-[1.03]"
                  style={{
                    animation: "fadeIn 600ms ease-in-out forwards",
                  }}
                />

                {/* Audio Toggle Button */}
                <button
                  onClick={toggleMute}
                  className="absolute bottom-4 right-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-[#2654A4] shadow-sm backdrop-blur-md transition hover:bg-[#FDB715] hover:text-[#041020] md:bottom-6 md:right-6"
                  aria-label="Toggle video sound"
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              </div>

              {/* BOTTOM: Aesthetic Filler Space */}
              <div className="relative flex-1 flex flex-col justify-center overflow-hidden bg-[#2654A4] px-6 py-7 border-t border-[#2654A4]/20 shadow-inner">
                <div className="tangerang-batik-overlay opacity-20" />
                <div className="dragon-scale-overlay opacity-10" />
                
                <div className="relative z-10 flex items-start gap-4">
                  <div className="mt-2 h-1.5 w-6 shrink-0 bg-[#FDB715]" />
                  <div>
                    <h2 className="text-xl font-black uppercase leading-none tracking-tight text-white lg:text-2xl">
                      {heroExp.titleLine1}{" "}
                      <span className="text-[#38BBCA]">{heroExp.titleLine2}</span>
                    </h2>
                    <p className="mt-3 text-xs font-medium leading-relaxed text-white/80">
                      {heroExp.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-8 left-10 border border-white/50 bg-white/90 px-5 py-4 shadow-lg backdrop-blur-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#2654A4]">
              {dict.atmosphere}
            </p>
            <p className="mt-1 text-sm font-bold text-[#041020]/80">
              {dict.atmosphereDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Organic river transition into the cream about section */}
      <RiverSectionDivider className="text-[#FDFBF7]" theme="light" />
    </section>
  );
}