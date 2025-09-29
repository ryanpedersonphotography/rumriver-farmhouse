import { Surface } from "gl-react-dom";
import { Shaders, Node, GLSL } from "gl-react";
import React from "react";

const shaders = Shaders.create({
  polaroid: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform sampler2D image;
uniform sampler2D lut;    // Hald CLUT PNG (e.g., 16^2 * 16^2)
uniform float size;       // Hald size (e.g., 16.0 or 8.0)
uniform float lutStrength; // 0..1
uniform float grain;       // 0..1
uniform float vignette;    // 0..1

// Simple grain
float rand(vec2 co){
  return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);
}

// Sample a Hald CLUT (NxN tiles, each NxN)
vec3 applyHaldLUT(vec3 color){
  float n = size;
  float slices = n * n;
  float blueIndex = color.b * (n - 1.0);
  float sliceLow = floor(blueIndex);
  float sliceHigh = min(n - 1.0, ceil(blueIndex));
  float sliceMix = blueIndex - sliceLow;

  // within-tile coordinates for R/G
  vec2 rg = color.rg * (n - 1.0);
  // tile grid coords for the two blue slices
  vec2 tileLow  = vec2(mod(sliceLow,  n), floor(sliceLow  / n));
  vec2 tileHigh = vec2(mod(sliceHigh, n), floor(sliceHigh / n));

  // pixel coords (use +0.5 to sample texel centers, rely on linear filtering for RG)
  vec2 uvLow  = (rg + tileLow  * n + 0.5) / (n * n);
  vec2 uvHigh = (rg + tileHigh * n + 0.5) / (n * n);

  vec3 low  = texture2D(lut, uvLow).rgb;
  vec3 high = texture2D(lut, uvHigh).rgb;
  return mix(low, high, sliceMix);
}

void main(){
  vec3 base = texture2D(image, uv).rgb;

  // LUT grade
  vec3 graded = applyHaldLUT(base);
  vec3 color = mix(base, graded, lutStrength);

  // subtle vignette
  vec2 p = uv - 0.5;
  float v = smoothstep(0.8, 0.2, length(p)) * vignette; // 0 (none) .. 1 (strong)
  color *= mix(1.0, 0.85, v);

  // film grain
  float g = (rand(uv * vec2(1920.0,1080.0)) - 0.5) * grain; // ±grain/2
  color += g;

  gl_FragColor = vec4(color, 1.0);
}
`},
});

export default function PolaroidFX({
  src,
  lutSrc = "/luts/polaroid.png",
  width = 800,
  height = 600,
  strength = 0.85, // LUT strength
  grain = 0.06,    // grain intensity
  vignette = 0.5,  // vignette strength
}) {
  return (
    <Surface width={width} height={height}>
      <Node
        shader={shaders.polaroid}
        uniforms={{
          image: { uri: src },
          lut: { uri: lutSrc },
          size: 16.0,          // set to 8.0 if you use an 8 Hald CLUT
          lutStrength: strength,
          grain,
          vignette,
        }}
      />
    </Surface>
  );
}