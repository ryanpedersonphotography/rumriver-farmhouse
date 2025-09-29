import React, { CSSProperties, useMemo } from "react";

type Mode = "classic" | "optionA";

type Props = {
  photoSrc: string;
  framePng?: string;       // optional transparent PNG overlay with paper texture
  pxWidth?: number;        // rendered width in CSS px, height follows exact aspect
  mode?: Mode;             // "classic" (authentic) or "optionA" (~2× bottom vs top)
  alt?: string;
};

export default function PolaroidExact({
  photoSrc,
  framePng,
  pxWidth = 560,
  mode = "classic",
  alt = "",
}: Props) {
  // EXACT Polaroid 600/SX-70/i-Type dimensions from Polaroid support:
  const totalW_in = 3.483;
  const totalH_in = 4.233;
  const imgW_in   = 3.108;
  const imgH_in   = 3.024;

  // Fractions for borders (percent of total card):
  // Sides:
  const sideEach_in = (totalW_in - imgW_in) / 2; // 0.1875 in
  const sideFrac = sideEach_in / totalW_in;      // ≈ 0.0538329027

  // Vertical:
  const vertLeft_in = totalH_in - imgH_in;       // 1.209 in
  const assumedTop_in = sideEach_in;             // classic assumption: top == side
  const topFrac_classic = assumedTop_in / totalH_in; // ≈ 0.0442948264

  // Authentic classic bottom:
  const bottom_in_classic = vertLeft_in - assumedTop_in; // 1.0215 in
  const bottomFrac_classic = bottom_in_classic / totalH_in; // ≈ 0.2413182140
  const bottomRatio_classic =
    bottomFrac_classic / (topFrac_classic + bottomFrac_classic); // ≈ 0.8449131514

  // Option A: ~2× bottom vs top (friendlier for tight gallery rows)
  const bottomFrac_optionA = topFrac_classic * 2.0; // ≈ 0.0885896528
  const bottomRatio_optionA = 2 / 3;                // exactly 0.6666667

  const sidePct = (sideFrac * 100).toFixed(6);
  const topFrac = topFrac_classic;
  const bottomRatio = mode === "classic" ? bottomRatio_classic : bottomRatio_optionA;

  // Now split the vertical leftover (top + bottom total):
  const vertLeftFrac = (vertLeft_in / totalH_in); // ≈ 0.2856130404
  const topPct = ( (vertLeftFrac * (1 - bottomRatio)) * 100 ).toFixed(6);
  const bottomPct = ( (vertLeftFrac * bottomRatio) * 100 ).toFixed(6);

  // Render size in px
  const pxHeight = Math.round(pxWidth * (totalH_in / totalW_in));

  const cardStyle: CSSProperties = {
    position: "relative",
    width: pxWidth,
    height: pxHeight,
    background: "#f7f7f5", // fallback paper if no framePng
    filter: "drop-shadow(0 8px 18px rgba(0,0,0,.28))",
    borderRadius: 0,
    overflow: "hidden",
  };

  // The image window is inset by left/right = sidePct, top = computed, bottom = computed.
  const windowStyle: CSSProperties = {
    position: "absolute",
    left: `${sidePct}%`,
    right: `${sidePct}%`,
    top: `${topPct}%`,
    bottom: `${bottomPct}%`,
    overflow: "hidden",
    background: "#000",
  };

  return (
    <figure className="polaroid-card" style={cardStyle} aria-label="Polaroid">
      <div className="polaroid-window" style={windowStyle}>
        <img
          src={photoSrc}
          alt={alt}
          draggable={false}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {framePng && (
        <img
          src={framePng}
          alt=""
          draggable={false}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        />
      )}
    </figure>
  );
}