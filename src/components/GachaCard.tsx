"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { RARITY_THEMES, UNKNOWN_THEME, type Rarity } from "./rarity";
import { assetPath } from "@/lib/asset-path";

function FoilFrame({
  frameGradient,
  glowColor,
  radiusClass,
  spinClassName,
  className = "",
  children,
}: {
  frameGradient: [string, string, string];
  glowColor: string;
  radiusClass: string;
  spinClassName: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative ${radiusClass} p-[2px] overflow-hidden ${className}`}
      style={{ boxShadow: `0 0 24px 2px ${glowColor}` }}
    >
      <div
        className={`absolute inset-[-50%] ${spinClassName}`}
        style={{
          background: `conic-gradient(from 0deg, ${frameGradient[0]}, ${frameGradient[1]}, ${frameGradient[2]}, ${frameGradient[0]})`,
        }}
      />
      {/* panel cream, konsisten dengan tone situs (bukan hitam gacha-game) */}
      <div className={`relative h-full w-full ${radiusClass} overflow-hidden bg-[#FDFBF7]`}>
        {children}
      </div>
    </div>
  );
}

function CornerBrackets({ color }: { color: string }) {
  const positions = [
    "top-2 left-2",
    "top-2 right-2 rotate-90",
    "bottom-2 left-2 -rotate-90",
    "bottom-2 right-2 rotate-180",
  ];
  return (
    <>
      {positions.map((pos) => (
        <svg key={pos} viewBox="0 0 20 20" className={`absolute w-3 h-3 ${pos}`} style={{ color }}>
          <path d="M1 9 V1 H9" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      ))}
    </>
  );
}

/**
 * Mystery / cover face. Logo Cisadane di tengah menggantikan ikon kompas —
 * tetap netral (tidak menyiratkan rarity apa pun di baliknya), tapi sekarang
 * terasa "milik" festival ini, bukan template kartu koleksi generik.
 */
export function GachaCardBack({
  label = "KETUK UNTUK MEMBUKA",
  radiusClass = "rounded-2xl",
  className = "",
}: {
  label?: string;
  radiusClass?: string;
  className?: string;
}) {
  return (
    <FoilFrame
      frameGradient={UNKNOWN_THEME.frameGradient}
      glowColor={UNKNOWN_THEME.glow}
      radiusClass={radiusClass}
      spinClassName="animate-[spin_9s_linear_infinite]"
      className={`aspect-[3/4] w-full ${className}`}
    >
      <div className="relative h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#FDFBF7] to-white">
        {/* watermark garis halus, subtle, tetap di belakang logo */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #2654A4 0px, #2654A4 1px, transparent 1px, transparent 10px)",
          }}
        />

        <div className="relative w-2/5 aspect-square flex items-center justify-center">
          <img
            src={assetPath("/logo/logo.png")}
            alt="Logo Festival Cisadane"
            className="w-full h-full object-contain drop-shadow-sm"
            loading="lazy"
          />
        </div>

        <span className="absolute bottom-5 text-[10px] tracking-[0.25em] text-[#2654A4]/70 font-bold uppercase text-center px-6">
          {label}
        </span>

        <CornerBrackets color="rgba(38,84,164,0.35)" />
      </div>
    </FoilFrame>
  );
}

/**
 * Prize face. Rarity-themed frame (dipetakan ke accentMap Cisadane:
 * biru/teal/oranye/emas), tetap dengan tilt + holo shimmer untuk kesan
 * "reveal spesial", tapi warna & tipografi sekarang selaras dengan situs.
 */
export function GachaCardFront({
  rarity,
  eyebrow,
  title,
  description,
  radiusClass = "rounded-2xl",
  className = "",
  interactiveTilt = true,
  showGems = false,
  children,
}: {
  rarity: Rarity;
  eyebrow?: string;
  title: string;
  description?: string;
  radiusClass?: string;
  className?: string;
  interactiveTilt?: boolean;
  /** default false — indikator gems disembunyikan supaya tidak terasa "item gacha" */
  showGems?: boolean;
  children?: React.ReactNode;
}) {
  const theme = RARITY_THEMES[rarity];
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const tiltEnabled = interactiveTilt && !prefersReducedMotion;

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 150, damping: 15 });
  const rotateY = useSpring(rawRotateY, { stiffness: 150, damping: 15 });
  const [holoPos, setHoloPos] = useState({ x: 50, y: 50 });

  const handleMove = (e: React.MouseEvent) => {
    if (!tiltEnabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rawRotateY.set((px - 0.5) * 14);
    rawRotateX.set((0.5 - py) * 14);
    setHoloPos({ x: px * 100, y: py * 100 });
  };

  const handleLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
    setHoloPos({ x: 50, y: 50 });
  };

  return (
    <div style={{ perspective: 800 }} className={`w-full ${className}`}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-full"
      >
        <FoilFrame
          frameGradient={theme.frameGradient}
          glowColor={theme.glow}
          radiusClass={radiusClass}
          spinClassName="animate-[spin_5s_linear_infinite]"
          className="aspect-[3/4] w-full"
        >
          <div className="relative h-full w-full flex flex-col">
            {tiltEnabled && (
              <div
                className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-30"
                style={{
                  background: `radial-gradient(circle at ${holoPos.x}% ${holoPos.y}%, rgba(38,84,164,0.5), transparent 55%)`,
                }}
              />
            )}

            <div className="px-4 pt-4">
              <span
                className="text-[10px] font-black tracking-[0.25em] uppercase"
                style={{ color: theme.ring }}
              >
                {eyebrow ?? theme.label}
              </span>
              <h3 className="mt-1 text-lg leading-tight font-black uppercase text-[#2654A4] font-display">
                {title}
              </h3>
            </div>

            <div className="flex-1 mx-3 my-3 rounded-lg overflow-hidden bg-[#041020]/5 flex items-center justify-center">
              {children}
            </div>

            <div className="px-4 pb-4">
              {description && (
                <p className="text-xs text-[#041020]/60 mb-2 line-clamp-2">{description}</p>
              )}
              {showGems && (
                <div className="flex gap-1">
                  {Array.from({ length: theme.gems }).map((_, i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rotate-45"
                      style={{ background: theme.ring, boxShadow: `0 0 6px ${theme.glow}` }}
                    />
                  ))}
                </div>
              )}
            </div>

            <CornerBrackets color={theme.ring} />
          </div>
        </FoilFrame>
      </motion.div>
    </div>
  );
}