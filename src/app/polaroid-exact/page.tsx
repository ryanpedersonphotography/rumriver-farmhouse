"use client";
import React from "react";
import PolaroidExactGL from "../../components/PolaroidExactGL";

export default function PolaroidExactPage() {
  return (
    <main style={{ 
      minHeight: "100svh", 
      display: "grid", 
      placeItems: "center", 
      gap: 36, 
      padding: 36, 
      background: "#e9eaee",
      gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
      maxWidth: "1200px",
      margin: "0 auto"
    }}>
      {/* Classic mode - authentic thick bottom */}
      <PolaroidExactGL
        photoSrc="/stills/rum-river-farmhouse-01.jpg"
        framePng="/frames/polaroid_frame.png"
        lutSrc="/luts/polaroid.png"
        haldSize={16}
        lutStrength={0.85}
        gloss={0.65}
        specPower={80}
        fresnel={0.25}
        streak={0.4}
        roll={0.32}
        grain={0.06}
        vignette={0.45}
        pxWidth={420}
        mode="classic"
        alt="Farmhouse Exterior - Classic Split"
      />
      
      {/* Option A mode - friendlier for galleries */}
      <PolaroidExactGL
        photoSrc="/stills/rum-river-farmhouse-02.jpg"
        framePng="/frames/polaroid_frame.png"
        lutSrc="/luts/polaroid.png"
        haldSize={16}
        lutStrength={0.85}
        gloss={0.65}
        specPower={80}
        fresnel={0.25}
        streak={0.4}
        roll={0.32}
        grain={0.06}
        vignette={0.45}
        pxWidth={420}
        mode="optionA"
        alt="Living Room - Option A Split"
      />
      
      {/* Kitchen - Classic mode */}
      <PolaroidExactGL
        photoSrc="/stills/rum-river-farmhouse-03.jpg"
        framePng="/frames/polaroid_frame.png"
        lutSrc="/luts/polaroid.png"
        haldSize={16}
        lutStrength={0.85}
        gloss={0.65}
        specPower={80}
        fresnel={0.25}
        streak={0.4}
        roll={0.32}
        grain={0.06}
        vignette={0.45}
        pxWidth={420}
        mode="classic"
        alt="Kitchen - Classic Split"
      />
      
      {/* Bedroom - Option A mode */}
      <PolaroidExactGL
        photoSrc="/stills/rum-river-farmhouse-04.jpg"
        framePng="/frames/polaroid_frame.png"
        lutSrc="/luts/polaroid.png"
        haldSize={16}
        lutStrength={0.85}
        gloss={0.65}
        specPower={80}
        fresnel={0.25}
        streak={0.4}
        roll={0.32}
        grain={0.06}
        vignette={0.45}
        pxWidth={420}
        mode="optionA"
        alt="Master Bedroom - Option A Split"
      />
    </main>
  );
}