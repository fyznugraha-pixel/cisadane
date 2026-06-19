export default function RiverSectionDivider({
  flip = false,
  className = "",
  theme = "dark",
}: {
  flip?: boolean;
  className?: string;
  theme?: "light" | "dark";
}) {
  const isLightWave = theme === "light";
  const glowClass = isLightWave
    ? "drop-shadow-[0_0_18px_rgba(253,251,247,0.4)]"
    : "drop-shadow-[0_0_18px_rgba(56,187,202,0.2)]";

  return (
    <div
      className={`river-transition ${className} ${flip ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className={glowClass}>
        {!isLightWave && (
          <defs>
            <linearGradient id="riverReflectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(38,84,164,0.15)" />
              <stop offset="35%" stopColor="rgba(56,187,202,0.15)" />
              <stop offset="65%" stopColor="rgba(253,183,21,0.15)" />
              <stop offset="100%" stopColor="rgba(236,58,36,0.15)" />
            </linearGradient>
          </defs>
        )}

        {!isLightWave && (
          <path
            className="river-fill-reflection"
            d="M0,70 C120,108 240,146 360,140 C480,134 600,82 720,78 C840,74 960,124 1080,136 C1200,148 1320,126 1440,94 L1440,220 L0,220 Z"
          />
        )}

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
  );
}