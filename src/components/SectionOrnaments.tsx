type SectionOrnamentsProps = {
  dragonScale?: "soft" | "strong";
  batik?: boolean;
  tenun?: boolean;
  dragonTopRight?: boolean;
  dragonBottomLeft?: boolean;
  dragonCenterRight?: boolean;
};

export default function SectionOrnaments({
  dragonScale,
  batik = false,
  tenun = false,
  dragonTopRight = false,
  dragonBottomLeft = false,
  dragonCenterRight = false,
}: SectionOrnamentsProps) {
  return (
    <>
      {dragonScale ? (
        <div
          className={`dragon-scale-overlay ${dragonScale} ornament-fade-center`}
        />
      ) : null}

      {batik ? (
        <div className="tangerang-batik-overlay ornament-fade-center" />
      ) : null}

      {tenun ? (
        <div className="tangerang-tenun-overlay ornament-fade-center" />
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
    </>
  );
}