"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useDragControls, useAnimation } from "motion/react";
import { Music, Volume2, VolumeX, GripHorizontal } from "lucide-react";
import { assetPath } from "@/lib/asset-path";

export default function GlobalMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const dragControls = useDragControls();
  const controls = useAnimation();

  useEffect(() => {
    setIsMounted(true);
    controls.start({ x: 0, opacity: 1, transition: { type: "spring", damping: 20, stiffness: 100, delay: 1 } });
  }, [controls]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
      if (!hasInteracted) setHasInteracted(true);
    }
  };

  const handleDragEnd = (e: any, info: any) => {
    const halfWidth = window.innerWidth / 2;
    if (info.point.x > halfWidth) {
      // Snap to right edge (original position because of right-6 class)
      controls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 25 } });
    } else {
      // Snap to left edge: move negative x by window width minus offset
      // Offset: 24px (right-6) + 56px (w-14) = 80px + some padding
      controls.start({ x: -(window.innerWidth - 80), transition: { type: "spring", stiffness: 300, damping: 25 } });
    }
  };

  if (!isMounted) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={assetPath("/musik/song.mp3")}
        loop
        preload="auto"
      />
      
      <motion.div
        drag
        dragControls={dragControls}
        dragMomentum={false}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        className="fixed top-1/2 right-6 z-[9999] flex flex-col items-center gap-2"
        initial={{ y: "-50%", x: 100, opacity: 0 }}
        animate={controls}
      >
        {/* The Drag Handle */}
        <div 
          onPointerDown={(e) => dragControls.start(e)}
          className="cursor-grab active:cursor-grabbing p-1 rounded-full bg-white/50 backdrop-blur-sm border border-black/5 text-[#041020]/40 hover:text-[#041020]/70 hover:bg-white/80 transition-colors shadow-sm"
          title="Geser posisi player"
        >
          <GripHorizontal size={16} />
        </div>

        {/* The Main Button */}
        <button
          onClick={togglePlay}
          className={`relative flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 shadow-xl ${
            isPlaying 
              ? "bg-gradient-to-br from-[#38BBCA] to-[#2654A4] shadow-[0_0_25px_rgba(56,187,202,0.6)]" 
              : "bg-white/90 backdrop-blur-md border-2 border-[#2654A4]/10 hover:border-[#2654A4]/30"
          }`}
          title={isPlaying ? "Matikan Musik" : "Putar Musik"}
        >
          {/* Animated rings when playing */}
          {isPlaying && (
            <>
              <div className="absolute inset-0 rounded-full border border-white/50 animate-ping opacity-75" />
              <div className="absolute -inset-2 rounded-full border border-white/30 animate-pulse" />
            </>
          )}
          
          {/* Unplayed bouncing tooltip logic */}
          {!hasInteracted && !isPlaying && (
            <div className="absolute right-full mr-4 whitespace-nowrap rounded-lg bg-[#2654A4] px-3 py-1.5 text-xs font-bold text-white shadow-lg animate-pulse hidden md:block">
              <span className="absolute -right-1 top-1/2 -translate-y-1/2 border-y-4 border-l-4 border-y-transparent border-l-[#2654A4]" />
              Putar Musik!
            </div>
          )}

          {isPlaying ? (
            <Volume2 className="h-6 w-6 text-white relative z-10" />
          ) : (
            <VolumeX className="h-6 w-6 text-[#2654A4] relative z-10" />
          )}
        </button>
      </motion.div>
    </>
  );
}
