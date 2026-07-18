"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function VideoPlayerWithMute({ url }: { url: string }) {
  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Extract video ID from URL
  const videoId = url.includes("v=") ? url.split("v=")[1] : "DHFRFqLWupE";

  useEffect(() => {
    // Load YouTube API
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    }

    const initPlayer = () => {
      if (!iframeRef.current) return;
      
      // If player is already initialized, don't re-init
      if (playerRef.current) return;

      playerRef.current = new window.YT.Player(iframeRef.current, {
        events: {
          onReady: (event: any) => {
            event.target.mute();
            event.target.playVideo();
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      // It might already be defined by another component, so we append our logic
      const oldReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (oldReady) oldReady();
        initPlayer();
      };
    }
    
    // Fallback just in case YT API is slow or blocked
    const fallbackTimer = setTimeout(() => {
      if (window.YT && window.YT.Player && !playerRef.current) {
        initPlayer();
      }
    }, 2000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (playerRef.current && typeof playerRef.current.unMute === 'function') {
      if (isMuted) {
        playerRef.current.unMute();
        // Sometimes unmuting requires re-triggering play
        playerRef.current.playVideo();
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full group bg-[#041020]">
      <iframe
        ref={iframeRef}
        width="100%"
        height="100%"
        className="absolute inset-0 w-full h-full scale-[1.05]"
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=${videoId}`}
        title="Sejarah Festival Cisadane"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      
      {/* Overlay to prevent clicking iframe */}
      <div className="absolute inset-0 z-10 cursor-pointer" onClick={toggleMute}></div>
      
      {/* Mute Toggle Button */}
      <button 
        onClick={toggleMute}
        className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-20 flex items-center justify-center w-12 h-12 bg-black/60 hover:bg-black/90 backdrop-blur-md rounded-full border border-white/20 text-white transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
      </button>

      {/* Mute text hint */}
      <div className="absolute bottom-6 right-20 z-20 hidden md:flex items-center pointer-events-none">
        <span className="text-white/80 text-xs font-bold uppercase tracking-widest bg-black/50 px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
          {isMuted ? "Klik untuk Suara" : "Suara Menyala"}
        </span>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}
