"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { RARITY_THEMES, type Rarity } from "./rarity";

type Phase = "idle" | "anticipate" | "flipping" | "revealed";

export default function FlipCard({
  frontContent,
  backContent,
  className = "",
  radiusClass = "rounded-2xl",
  rarity = "rare",
  disabled = false,
  onReveal,
}: {
  /** The revealed / prize face. Shown after the flip completes. */
  frontContent: React.ReactNode;
  /** The mystery / cover face. Shown before the card is tapped. */
  backContent: React.ReactNode;
  className?: string;
  /** Border radius applied to the overlay effects (flash, ring, shine). Keep this in sync with the radius used inside frontContent/backContent so the effects line up. */
  radiusClass?: string;
  rarity?: Rarity;
  disabled?: boolean;
  onReveal?: () => void;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [burstKey, setBurstKey] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const prefersReducedMotion = useReducedMotion();

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const FLIP_MS = 650;
  const ANTICIPATE_MS = 220;

  const handleClick = useCallback(() => {
    if (disabled || phase === "anticipate" || phase === "flipping") return;

    if (isFlipped) {
      setIsFlipped(false);
      setPhase("idle");
      return;
    }

    if (prefersReducedMotion) {
      setIsFlipped(true);
      setPhase("revealed");
      setBurstKey((k) => k + 1);
      onReveal?.();
      return;
    }

    clearTimers();
    setPhase("anticipate");

    timers.current.push(
      setTimeout(() => {
        setPhase("flipping");
        setIsFlipped(true);
      }, ANTICIPATE_MS)
    );

    timers.current.push(
      setTimeout(() => {
        setPhase("revealed");
        setBurstKey((k) => k + 1);
        onReveal?.();
      }, ANTICIPATE_MS + FLIP_MS)
    );
  }, [disabled, phase, isFlipped, onReveal, prefersReducedMotion]);

  const style = RARITY_THEMES[rarity];

  return (
    <div
      className={`relative select-none ${disabled ? "cursor-default" : "cursor-pointer"} ${className}`}
      onClick={handleClick}
      style={{ perspective: 1200 }}
      role="button"
      aria-pressed={isFlipped}
      aria-label={isFlipped ? "Card revealed, tap to hide" : "Tap to reveal card"}
    >
      {/* sizing spacer, matches the prize face's natural footprint */}
      <div className="invisible opacity-0 w-full pointer-events-none" aria-hidden="true">
        {frontContent}
      </div>

      {/* idle "tap me" glow, breathes gently before the first reveal */}
      {phase === "idle" && !isFlipped && (
        <motion.div
          className={`absolute -inset-1 ${radiusClass} pointer-events-none`}
          style={{
            background: `radial-gradient(circle, ${style.glow} 0%, transparent 70%)`,
            filter: "blur(6px)",
          }}
          animate={
            prefersReducedMotion
              ? { opacity: 0.5 }
              : { opacity: [0.35, 0.7, 0.35], scale: [0.98, 1.02, 0.98] }
          }
          transition={{ duration: 2.2, repeat: prefersReducedMotion ? 0 : Infinity, ease: "easeInOut" }}
        />
      )}

      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{
          rotateY: isFlipped ? 180 : 0,
          scale: phase === "anticipate" ? 0.94 : phase === "flipping" ? [1, 1.12, 1] : 1,
          x: phase === "anticipate" ? [0, -4, 4, -3, 3, 0] : 0,
        }}
        transition={{
          rotateY: {
            duration: prefersReducedMotion ? 0.25 : FLIP_MS / 1000,
            ease: prefersReducedMotion ? "easeInOut" : [0.34, 1.56, 0.64, 1],
          },
          scale: { duration: phase === "flipping" ? FLIP_MS / 1000 : ANTICIPATE_MS / 1000, ease: "easeInOut" },
          x: { duration: ANTICIPATE_MS / 1000, ease: "easeInOut" },
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* cover face */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "translateZ(1px)" }}
        >
          {backContent}
        </div>

        {/* prize face */}
        <div
          className={`absolute inset-0 w-full h-full overflow-hidden ${radiusClass}`}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg) translateZ(1px)",
          }}
        >
          {frontContent}

          {/* shine sweep, plays once as the prize settles in */}
          {phase === "revealed" && !prefersReducedMotion && (
            <motion.div
              key={`shine-${burstKey}`}
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.75) 50%, transparent 60%)",
              }}
              initial={{ x: "-120%" }}
              animate={{ x: "120%" }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.05 }}
            />
          )}

          {/* rarity ring, snaps in on reveal */}
          {isFlipped && (
            <motion.div
              className={`absolute inset-0 ${radiusClass} pointer-events-none`}
              style={{ boxShadow: `0 0 0 2px ${style.ring}, 0 0 24px 4px ${style.glow}` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.35, duration: 0.25 }}
            />
          )}
        </div>
      </motion.div>

      {/* mid-flip flash, timed to the moment the card is edge-on to the viewer */}
      <AnimatePresence>
        {phase === "flipping" && !prefersReducedMotion && (
          <motion.div
            className={`absolute inset-0 ${radiusClass} pointer-events-none bg-white`}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0] }}
            transition={{ duration: FLIP_MS / 1000, times: [0.4, 0.5, 0.62], ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      {/* sparkle burst, fires once when the prize lands */}
      <AnimatePresence>
        {phase === "revealed" && !prefersReducedMotion && (
          <div key={`burst-${burstKey}`} className="absolute inset-0 pointer-events-none overflow-visible">
            {Array.from({ length: style.particles }).map((_, i) => {
              const angle = (i / style.particles) * Math.PI * 2;
              const dist = 60 + Math.random() * 40;
              const tx = Math.cos(angle) * dist;
              const ty = Math.sin(angle) * dist;
              return (
                <motion.span
                  key={i}
                  className="absolute left-1/2 top-1/2 rounded-full"
                  style={{ width: 5, height: 5, background: style.sparkle }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ x: tx, y: ty, opacity: 0, scale: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 + Math.random() * 0.1, ease: "easeOut" }}
                />
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
