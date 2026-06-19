type SectionOrnamentsProps = {
  dragonScale?: "soft" | "strong";
  batik?: boolean;
  tenun?: boolean;
  dragonTopRight?: boolean;
  dragonBottomLeft?: boolean;
  dragonCenterRight?: boolean;
  shapes?: "petals" | "sparkles" | "squares" | "mixed";
  lights?: "left" | "right" | "center" | "both";
  theme?: "light" | "dark";
};

export function BatikFlower({ className, size = 40, theme = "light" }: { className?: string; size?: number; theme?: "light" | "dark" }) {
  // A petal of size 40x40 has a diagonal of ~56.5px.
  // When rotated to point up/down/left/right, its tips are at 28.28px from its center.
  // We place the centers at 33px from the flower origin to create a ~5px gap in the middle.
  const w = size;
  const half = w / 2;
  const diagonalHalf = w * 0.707;
  const offset = diagonalHalf + (w * 0.12); // ~5px gap for size=40

  return (
    <div className={`absolute flex items-center justify-center ${theme === "dark" ? "opacity-90 mix-blend-screen" : "opacity-80 mix-blend-multiply"} ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Top Yellow (Points UP/DOWN, moved UP) */}
        <div 
          className="absolute rounded-br-full rounded-tl-full bg-[#FDB715] -rotate-45 shadow-sm transition-transform duration-700 hover:scale-110" 
          style={{ width: w, height: w, left: -half, top: -offset - half }} 
        />
        {/* Bottom Yellow (Points UP/DOWN, moved DOWN) */}
        <div 
          className="absolute rounded-br-full rounded-tl-full bg-[#FDB715] -rotate-45 shadow-sm transition-transform duration-700 hover:scale-110" 
          style={{ width: w, height: w, left: -half, top: offset - half }} 
        />
        {/* Left Red (Points LEFT/RIGHT, moved LEFT) */}
        <div 
          className="absolute rounded-br-full rounded-tl-full bg-[#EC3A24] rotate-45 shadow-sm transition-transform duration-700 hover:scale-110" 
          style={{ width: w, height: w, left: -offset - half, top: -half }} 
        />
        {/* Right Red (Points LEFT/RIGHT, moved RIGHT) */}
        <div 
          className="absolute rounded-br-full rounded-tl-full bg-[#EC3A24] rotate-45 shadow-sm transition-transform duration-700 hover:scale-110" 
          style={{ width: w, height: w, left: offset - half, top: -half }} 
        />
      </div>
    </div>
  );
}

export default function SectionOrnaments({
  dragonScale,
  batik = false,
  tenun = false,
  dragonTopRight = false,
  dragonBottomLeft = false,
  dragonCenterRight = false,
  shapes,
  lights,
  theme = "light",
}: SectionOrnamentsProps) {
  const isDark = theme === "dark";

  return (
    <>
      {dragonScale ? (
        <div
          className={`dragon-scale-overlay ${dragonScale} ornament-fade-center ${isDark ? "opacity-20 mix-blend-screen" : ""}`}
        />
      ) : null}

      {batik ? (
        <div className={isDark ? "tangerang-batik-overlay-light ornament-fade-center" : "tangerang-batik-overlay ornament-fade-center"} />
      ) : null}

      {tenun ? (
        <div className={isDark ? "tangerang-tenun-overlay-light ornament-fade-center" : "tangerang-tenun-overlay ornament-fade-center"} />
      ) : null}

      {/* Floating Light Particles for Dark Backgrounds */}
      {isDark ? (
        <div className="lantern-particles absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-60">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      ) : null}

      {dragonTopRight ? (
        <div className="dragon-head-corner dragon-head-top-right" />
      ) : null}

      {dragonBottomLeft ? (
        <div className="dragon-head-corner dragon-head-bottom-left" />
      ) : null}

      {dragonCenterRight ? (
        <div className="dragon-head-corner dragon-head-center-right" />
      ) : null}

      {/* Stage Lights / Pantulan Cahaya */}
      {lights === "left" || lights === "both" ? (
        <div className="stage-light-gold absolute top-[5%] left-[5%] md:left-[15%] h-[500px] w-[120px] -rotate-12 -z-10 opacity-70" />
      ) : null}
      
      {lights === "right" || lights === "both" ? (
        <div className="stage-light-red absolute top-[5%] right-[5%] md:right-[15%] h-[500px] w-[130px] rotate-12 -z-10 opacity-70" />
      ) : null}

      {lights === "center" ? (
        <div className="stage-light-cyan absolute top-[10%] left-[40%] md:left-[45%] h-[600px] w-[140px] rotate-6 -z-10 opacity-70" />
      ) : null}

      {/* Abstract Colorful Shapes */}
      {shapes === "petals" || shapes === "mixed" ? (
        <>
          {/* Main big flower */}
          <BatikFlower className="-z-10 right-[5%] top-[10%] md:right-[15%] rotate-12" size={48} theme={theme} />
          {/* Small secondary flower */}
          <BatikFlower className="-z-10 left-[8%] bottom-[15%] md:left-[12%] -rotate-12 opacity-50" size={32} theme={theme} />
          {/* Tertiary tiny flower */}
          <BatikFlower className="-z-10 left-[45%] top-[25%] -rotate-6 opacity-30" size={24} theme={theme} />
        </>
      ) : null}

      {shapes === "sparkles" || shapes === "mixed" ? (
        <div className={`absolute left-[8%] top-[40%] -z-10 md:left-[10%] ${isDark ? "opacity-80 mix-blend-screen" : "opacity-40 mix-blend-multiply"}`}>
          <svg width="80" height="80" viewBox="0 0 60 60" className={isDark ? "text-[#FDB715]" : "text-[#EC3A24]"}>
            <path
              d="M30 0 C30 20 40 30 60 30 C40 30 30 40 30 60 C30 40 20 30 0 30 C20 30 30 20 30 0 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      ) : null}

      {shapes === "squares" || shapes === "mixed" ? (
        <div className={`absolute bottom-[20%] left-[60%] -z-10 md:left-[75%] ${isDark ? "opacity-60 mix-blend-screen" : "opacity-30 mix-blend-multiply"}`}>
          <div className={`relative h-20 w-20 overflow-hidden rounded-br-[30px] ${isDark ? "bg-[#38BBCA]" : "bg-[#2654A4]"}`}>
            <div className={`${isDark ? "tangerang-tenun-overlay-light" : "tangerang-tenun-overlay"} absolute inset-0 opacity-60 mix-blend-overlay`} />
          </div>
          <div className="absolute -left-6 -top-6 h-12 w-12 rounded-full border-4 border-[#FDB715] opacity-80" />
        </div>
      ) : null}
    </>
  );
}