import Reveal from "@/components/Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  theme = "light",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
}) {
  const isCenter = align === "center";

  return (
    <div className={isCenter ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Reveal>
        <p className={`text-xs font-black uppercase tracking-[0.38em] ${theme === "dark" ? "text-[#FDB715]" : "text-[#EC3A24]"}`}>
          {eyebrow}
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className={`font-display mt-5 text-5xl font-black uppercase leading-none md:text-7xl ${theme === "dark" ? "text-[#FDFBF7]" : "text-[#2654A4]"}`}>
          {title}
        </h2>
      </Reveal>

      <Reveal delay={0.14}>
        <div className={`mt-6 ${isCenter ? "mx-auto" : ""} h-[3px] w-24 bg-gradient-to-r from-[#2654A4] to-[#38BBCA]`} />
      </Reveal>

      {description ? (
        <Reveal delay={0.2}>
          <p className={`mt-6 text-lg leading-8 ${theme === "dark" ? "text-[#FDFBF7]/80" : "text-[#041020]/80"}`}>
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}