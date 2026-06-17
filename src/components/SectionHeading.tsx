import Reveal from "@/components/Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  const isCenter = align === "center";

  return (
    <div className={isCenter ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Reveal>
        <p className="text-xs font-black uppercase tracking-[0.38em] text-[#C8A03C]">
          {eyebrow}
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className="font-display mt-5 text-5xl font-black uppercase leading-none text-[#F5F0E8] md:text-7xl">
          {title}
        </h2>
      </Reveal>

      <Reveal delay={0.14}>
        <div className={`mt-6 ${isCenter ? "mx-auto" : ""} section-title-line`} />
      </Reveal>

      {description ? (
        <Reveal delay={0.2}>
          <p className="mt-6 text-lg leading-8 text-[#F5F0E8]/68">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}