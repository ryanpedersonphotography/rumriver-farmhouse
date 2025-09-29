"use client";
import React, { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { Surface } from "gl-react-dom";
import { Shaders, Node, GLSL } from "gl-react";

type Mode = "classic" | "optionA";

type Props = {
  photoSrc: string;
  framePng?: string;
  lutSrc: string;           // HALD LUT PNG (size 8 or 16)
  haldSize?: 8 | 16;
  lutStrength?: number;     // 0..1
  gloss?: number;           // 0..1
  specPower?: number;       // 20..120
  fresnel?: number;         // 0..1.5
  streak?: number;          // 0..1
  roll?: number;            // 0..0.9
  grain?: number;           // 0..1
  vignette?: number;        // 0..1
  pxWidth?: number;
  mode?: Mode;              // border split
  alt?: string;
};

const shaders = Shaders.create({
  polaroid: {
    frag: GLSL`
precision highp float;
varying vec2 uv;

uniform sampler2D image;
uniform sampler2D lut;
uniform float haldSize;     // 8.0 or 16.0
uniform float lutStrength;  // 0..1
uniform float vignette;     // 0..1
uniform float grain;        // 0..1
uniform float gloss;        // 0..1
uniform float specPower;    // e.g., 60-90
uniform float fresnel;      // 0..1.5
uniform float roll;         // 0..0.9
uniform float streak;       // 0..1
uniform vec2  lightPos;     // 0..1 inside photo window
uniform vec4  inset;        // t r b l (fractions of canvas)
uniform float time;         // seconds

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float a = hash(i), b = hash(i+vec2(1.,0.));
  float c = hash(i+vec2(0.,1.)), d = hash(i+vec2(1.,1.));
  vec2 u = f*f*(3.-2.*f);
  return mix(a,b,u.x) + (c-a)*u.y*(1.-u.x) + (d-b)*u.x*u.y;
}

// HALD LUT
vec3 applyHaldLUT(vec3 col, sampler2D hald, float n){
  if (n <= 1.0) return col;
  float n1 = n - 1.0;
  float blue = col.b * n1;
  float s0 = floor(blue);
  float s1 = min(n1, s0 + 1.0);
  float f = blue - s0;

  vec2 rg = col.rg * n1;
  vec2 tile0 = vec2(mod(s0, n), floor(s0 / n));
  vec2 tile1 = vec2(mod(s1, n), floor(s1 / n));
  vec2 uv0 = (rg + tile0 * n + 0.5) / (n*n);
  vec2 uv1 = (rg + tile1 * n + 0.5) / (n*n);
  return mix(texture2D(hald, uv0).rgb, texture2D(hald, uv1).rgb, f);
}

void main(){
  // Compute inner rect
  vec2 minP = vec2(inset.w, inset.x);
  vec2 maxP = vec2(1.0 - inset.y, 1.0 - inset.z);

  // Mask outside (alpha 0 so the PNG frame shows)
  if (uv.x < minP.x || uv.x > maxP.x || uv.y < minP.y || uv.y > maxP.y){
    gl_FragColor = vec4(0.0);
    return;
  }

  // 0..1 coords inside the photo window
  vec2 iuv = (uv - minP) / (maxP - minP);
  vec3 color = texture2D(image, iuv).rgb;

  // LUT color
  color = mix(color, applyHaldLUT(color, lut, haldSize), lutStrength);

  // Vignette (gentle)
  float r = length((iuv - 0.5) * vec2(1.0, 1.1));
  color *= mix(1.0, 0.82, smoothstep(0.35, 0.85, r) * vignette);

  // Temporal film grain (tiny)
  if (grain > 0.0){
    float g = noise(iuv * vec2(1920.0,1080.0) + time*60.0) - 0.5;
    color = clamp(color + g * (0.06 * grain), 0.0, 1.0);
  }

  // Gloss coat (specular + Fresnel + anisotropic streak)
  vec3 V = vec3(0.0, 0.0, 1.0);
  vec3 L = normalize(vec3(lightPos - iuv, 0.75));

  vec2 p = (iuv - 0.5) * vec2(1.0, 1.2);
  float pr = clamp(length(p), 0.0, 1.0);
  vec3 N = normalize(vec3(p.x * roll, p.y * roll, 1.0 - pr * roll));

  vec3 H = normalize(L + V);
  float spec = pow(max(dot(N, H), 0.0), specPower);

  vec2 T = normalize(vec2(0.92, 0.38)); // diagonal tangent
  float aniso = pow(abs(dot(normalize(vec2(H.x, H.y)), T)), 8.0);
  spec *= mix(1.0, 1.0 + 2.0 * aniso, streak);

  float edge = pow(1.0 - max(dot(N, V), 0.0), 2.2) * fresnel;
  float sparkle = pow(max(noise(iuv * 540.0 + time*1.5), 0.0), 3.0) * 0.15;

  vec3 coat = vec3(spec * 0.95 + edge * 0.18 + sparkle);
  color = clamp(color + coat * gloss, 0.0, 1.0);

  gl_FragColor = vec4(color, 1.0);
}
`,
  },
});

const NEUTRAL_1PX =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";

export default function PolaroidExactGL({
  photoSrc,
  framePng,
  lutSrc,
  haldSize = 16,
  lutStrength = 0.85,
  gloss = 0.65,
  specPower = 80,
  fresnel = 0.25,
  streak = 0.4,
  roll = 0.32,
  grain = 0.06,
  vignette = 0.45,
  pxWidth = 560,
  mode = "classic",
  alt = "",
}: Props) {
  // Exact Polaroid numbers
  const totalW_in = 3.483;
  const totalH_in = 4.233;
  const imgW_in   = 3.108;
  const imgH_in   = 3.024;

  // Horizontal: sides are equal
  const sideEach_in = (totalW_in - imgW_in) / 2;              // 0.1875 in
  const sideFrac = sideEach_in / totalW_in;                   // ~0.0538329

  // Vertical: leftover split between top & bottom
  const vertLeft_in = totalH_in - imgH_in;                    // 1.209 in
  const topFrac_assumed = sideEach_in / totalH_in;            // top == side (~0.0442948)

  // Classic: bottom is the rest (authentic ~5.45x top)
  const bottom_in_classic = vertLeft_in - sideEach_in;        // 1.0215 in
  const topFrac_classic = topFrac_assumed;
  const bottomFrac_classic = bottom_in_classic / totalH_in;   // ~0.2413182
  const bottomRatio_classic =
    bottomFrac_classic / (topFrac_classic + bottomFrac_classic); // ~0.8449

  // Option A: ~2x bottom vs top (friendlier for tight rows)
  const bottomRatio_optionA = 2/3;

  const bottomRatio = mode === "classic" ? bottomRatio_classic : bottomRatio_optionA;
  const vertLeftFrac = vertLeft_in / totalH_in;
  const topPct = (vertLeftFrac * (1 - bottomRatio)) * 100;
  const bottomPct = (vertLeftFrac * bottomRatio) * 100;
  const sidePct = sideFrac * 100;

  const pxHeight = Math.round(pxWidth * (totalH_in / totalW_in));
  const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;

  const [mx, setMx] = useState(0.55);
  const [my, setMy] = useState(0.22);
  const [time, setTime] = useState(0);
  const rafRef = useRef<number | null>(null);
  const orbitRef = useRef(0);
  const mouseDownRef = useRef(false);

  useEffect(() => {
    const loop = () => {
      orbitRef.current += 0.5 / 60;
      setTime((t) => t + 1 / 60);
      if (!mouseDownRef.current) {
        const ox = 0.5 + 0.18 * Math.cos(orbitRef.current);
        const oy = 0.22 + 0.10 * Math.sin(orbitRef.current * 1.3);
        setMx(ox);
        setMy(oy);
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    const down = () => (mouseDownRef.current = true);
    const up = () => (mouseDownRef.current = false);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMx(Math.max(0, Math.min(1, x)));
    setMy(Math.max(0, Math.min(1, y)));
  };

  const cardStyle: CSSProperties = {
    position: "relative",
    width: pxWidth,
    height: pxHeight,
    background: "#f7f7f5", // fallback if no framePng (use a PNG for realism)
    filter: "drop-shadow(0 8px 18px rgba(0,0,0,.28))",
    borderRadius: 0,
  };

  // Insets as fractions of total
  const inset = {
    t: topPct / 100,
    r: sidePct / 100,
    b: bottomPct / 100,
    l: sidePct / 100,
  };

  return (
    <div
      className="polaroid-card"
      style={cardStyle}
      onPointerMove={onMove}
      onPointerLeave={() => { setMx(0.55); setMy(0.22); }}
      aria-label="Polaroid"
    >
      <Surface
        width={Math.round(pxWidth * dpr)}
        height={Math.round(pxHeight * dpr)}
        pixelRatio={dpr}
        webglContextAttributes={{ alpha: true, premultipliedAlpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <Node
          shader={shaders.polaroid}
          uniforms={{
            image: { uri: photoSrc },
            lut: { uri: lutSrc || NEUTRAL_1PX },
            haldSize: lutSrc ? (haldSize as number) : 0.0,
            lutStrength,
            vignette,
            grain,
            gloss,
            specPower,
            fresnel,
            streak,
            roll,
            lightPos: [mx, my],
            inset: [inset.t, inset.r, inset.b, inset.l],
            time,
          }}
        />
      </Surface>

      {framePng && (
        <img
          src={framePng}
          alt=""
          draggable={false}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        />
      )}
    </div>
  );
}