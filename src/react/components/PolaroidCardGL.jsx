import React, { useEffect, useMemo, useRef, useState } from "react";
import { Surface } from "gl-react-dom";
import { Shaders, Node, GLSL } from "gl-react";

/**
 * PolaroidCardGL
 * - WebGL grade + gloss confined to the photo window
 * - Overlay your transparent PNG frame on top (hard-corner, thicker bottom)
 */
export default function PolaroidCardGL({
  photo,
  frame,
  lutSrc,
  haldSize = 16,
  lutStrength = 0.8,
  vignette = 0.45,
  grain = 0.06,
  gloss = 0.65,
  specPower = 70,
  fresnel = 0.22,
  roll = 0.28,
  streak = 0.35,
  width = 800,
  height = 600,
  inset = { t: 0.055, r: 0.055, b: 0.22, l: 0.055 },
}) {
  const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
  const [mx, setMx] = useState(0.55);
  const [my, setMy] = useState(0.25);
  const [time, setTime] = useState(0);
  const rafRef = useRef(null);
  const orbitRef = useRef(0);

  // Idle orbit so the gloss never feels static
  useEffect(() => {
    let mouseDown = false;
    const loop = () => {
      orbitRef.current += 0.5 / 60; // rad/sec-ish
      setTime((t) => t + 1 / 60);
      if (!mouseDown) {
        const ox = 0.5 + 0.18 * Math.cos(orbitRef.current);
        const oy = 0.22 + 0.10 * Math.sin(orbitRef.current * 1.3);
        setMx(ox);
        setMy(oy);
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    
    const down = () => (mouseDown = true);
    const up = () => (mouseDown = false);
    
    rafRef.current = requestAnimationFrame(loop);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMx(Math.max(0, Math.min(1, x)));
    setMy(Math.max(0, Math.min(1, y)));
  };

  const shaders = useMemo(
    () =>
      Shaders.create({
        polaroidGloss: {
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
uniform vec2  lightPos;     // 0..1 in photo space
uniform vec4  inset;        // t r b l (fractions of whole canvas)
uniform float time;         // seconds

// Cheap hash & noise
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float a = hash(i), b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
  vec2 u = f*f*(3.0 - 2.0*f);
  return mix(a, b, u.x) + (c - a)*u.y*(1.0 - u.x) + (d - b)*u.x*u.y;
}

// HALD LUT sampling
vec3 applyHaldLUT(vec3 col, sampler2D hald, float n){
  float n1 = n - 1.0;
  float blue = col.b * n1;
  float slice0 = floor(blue);
  float slice1 = min(n1, slice0 + 1.0);
  float f = blue - slice0;

  vec2 rg = col.rg * n1;
  vec2 tile0 = vec2(mod(slice0, n), floor(slice0 / n));
  vec2 tile1 = vec2(mod(slice1, n), floor(slice1 / n));

  vec2 uv0 = (rg + tile0 * n + 0.5) / (n*n);
  vec2 uv1 = (rg + tile1 * n + 0.5) / (n*n);

  return mix(texture2D(hald, uv0).rgb, texture2D(hald, uv1).rgb, f);
}

void main(){
  // Compute inner rect
  vec2 minP = vec2(inset.w, inset.x);
  vec2 maxP = vec2(1.0 - inset.y, 1.0 - inset.z);

  // Mask outside photo window (transparent so the PNG frame shows)
  if (uv.x < minP.x || uv.x > maxP.x || uv.y < minP.y || uv.y > maxP.y){
    gl_FragColor = vec4(0.0);
    return;
  }

  // Normalize to image coords (0..1 inside the window)
  vec2 iuv = (uv - minP) / (maxP - minP);
  vec3 base = texture2D(image, iuv).rgb;

  // Optional LUT grade
  if (haldSize > 1.0 && lutStrength > 0.0) {
    vec3 graded = applyHaldLUT(base, lut, haldSize);
    base = mix(base, graded, lutStrength);
  }

  // Vignette (gentle)
  float r = length((iuv - 0.5) * vec2(1.0, 1.1));
  base *= mix(1.0, 0.82, smoothstep(0.35, 0.85, r) * vignette);

  // Temporal film grain in log-ish space for natural feel
  if (grain > 0.0){
    float g = noise(iuv * vec2(1920.0,1080.0) + time*60.0) - 0.5;
    base = clamp(base + g * (0.06 * grain), 0.0, 1.0);
  }

  // -------- Gloss coat (specular + Fresnel + anisotropic streak) --------
  vec2 L2 = lightPos;                 // 0..1 target in photo space
  vec3 L = normalize(vec3(L2 - iuv, 0.75));
  vec3 V = vec3(0.0, 0.0, 1.0);

  // Curved laminate normal: flattish center, steeper edges
  vec2 p = (iuv - 0.5) * vec2(1.0, 1.2);
  float pr = clamp(length(p), 0.0, 1.0);
  vec3 N = normalize(vec3(p.x * roll, p.y * roll, 1.0 - pr * roll));

  // Blinn-Phong specular
  vec3 H = normalize(L + V);
  float spec = pow(max(dot(N, H), 0.0), specPower);

  // Anisotropic streak (diagonal coat-lines)
  vec2 T = normalize(vec2(0.92, 0.38)); // fixed diagonal tangent
  float aniso = pow(abs(dot(normalize(vec2(H.x, H.y)), T)), 8.0);
  spec *= mix(1.0, 1.0 + 2.0 * aniso, streak);

  // Fresnel edge lift
  float f0 = pow(1.0 - max(dot(N, V), 0.0), 2.2) * fresnel;

  // Subtle micro-surface sparkle
  float sparkle = pow(max(noise(iuv * 540.0 + time*1.5), 0.0), 3.0) * 0.15;

  vec3 coat = vec3(spec * 0.95 + f0 * 0.18 + sparkle);
  vec3 color = clamp(base + coat * gloss, 0.0, 1.0);

  gl_FragColor = vec4(color, 1.0);
}
          `,
        },
      }),
    []
  );

  // Compose the graded+glossed photo under your PNG frame
  return (
    <div
      onPointerMove={onMove}
      style={{
        position: "relative",
        width,
        height,
        filter: "drop-shadow(0 8px 18px rgba(0,0,0,.28))",
      }}
    >
      <Surface
        width={Math.round(width * dpr)}
        height={Math.round(height * dpr)}
        pixelRatio={dpr}
        webglContextAttributes={{ alpha: true, premultipliedAlpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <Node
          shader={shaders.polaroidGloss}
          uniforms={{
            image: { uri: photo },
            lut: { uri: lutSrc || "" },
            haldSize: lutSrc ? haldSize : 0.0,
            lutStrength,
            vignette,
            grain,
            gloss,
            specPower,
            fresnel,
            roll,
            streak,
            lightPos: [mx, my],
            inset: [inset.t, inset.r, inset.b, inset.l],
            time,
          }}
        />
      </Surface>

      {/* PNG frame overlay (transparent center) or CSS fallback */}
      {frame ? (
        <img
          src={frame}
          alt=""
          draggable={false}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
          onError={(e) => {
            // Hide broken frame image
            e.target.style.display = 'none';
          }}
        />
      ) : (
        // CSS-based polaroid frame fallback
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            background: "white",
            borderRadius: "4px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: `${inset.t * 100}%`,
              left: `${inset.l * 100}%`,
              right: `${inset.r * 100}%`,
              bottom: `${inset.b * 100}%`,
              background: "transparent",
              borderRadius: "2px",
            }}
          />
        </div>
      )}
    </div>
  );
}