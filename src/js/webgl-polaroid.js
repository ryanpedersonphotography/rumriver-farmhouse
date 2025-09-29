// Vanilla WebGL Polaroid Effects
class PolaroidWebGL {
  constructor(canvas, imageSrc, lutSrc = null) {
    this.canvas = canvas;
    this.gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    this.imageSrc = imageSrc;
    this.lutSrc = lutSrc;
    this.mouseX = 0.5;
    this.mouseY = 0.3;
    this.time = 0;
    this.animationId = null;
    
    if (!this.gl) {
      throw new Error('WebGL not supported');
    }
    
    this.init();
  }

  async init() {
    // Create shaders
    const vertexShader = this.createShader(this.gl.VERTEX_SHADER, this.vertexShaderSource);
    const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, this.fragmentShaderSource);
    
    // Create program
    this.program = this.createProgram(vertexShader, fragmentShader);
    
    // Get attribute and uniform locations
    this.positionLocation = this.gl.getAttribLocation(this.program, 'a_position');
    this.texCoordLocation = this.gl.getAttribLocation(this.program, 'a_texCoord');
    
    this.imageLocation = this.gl.getUniformLocation(this.program, 'u_image');
    this.lutLocation = this.gl.getUniformLocation(this.program, 'u_lut');
    this.mouseLocation = this.gl.getUniformLocation(this.program, 'u_mouse');
    this.timeLocation = this.gl.getUniformLocation(this.program, 'u_time');
    this.resolutionLocation = this.gl.getUniformLocation(this.program, 'u_resolution');
    this.lutStrengthLocation = this.gl.getUniformLocation(this.program, 'u_lutStrength');
    this.glossLocation = this.gl.getUniformLocation(this.program, 'u_gloss');
    
    // Create buffers
    this.setupBuffers();
    
    // Load textures
    await this.loadTextures();
    
    // Start render loop
    this.render();
  }

  createShader(type, source) {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
      return null;
    }
    
    return shader;
  }

  createProgram(vertexShader, fragmentShader) {
    const program = this.gl.createProgram();
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);
    
    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      console.error('Program link error:', this.gl.getProgramInfoLog(program));
      this.gl.deleteProgram(program);
      return null;
    }
    
    return program;
  }

  setupBuffers() {
    // Create position buffer (quad)
    this.positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ]), this.gl.STATIC_DRAW);

    // Create texture coordinate buffer
    this.texCoordBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texCoordBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
      0, 1,
      1, 1,
      0, 0,
      1, 0,
    ]), this.gl.STATIC_DRAW);
  }

  async loadTextures() {
    try {
      // Load main image
      console.log('Loading main image:', this.imageSrc);
      this.imageTexture = await this.loadTexture(this.imageSrc);
      console.log('Main image loaded successfully');
      
      // Load LUT if provided
      if (this.lutSrc) {
        console.log('Loading LUT:', this.lutSrc);
        this.lutTexture = await this.loadTexture(this.lutSrc);
        console.log('LUT loaded successfully');
      }
    } catch (error) {
      console.error('Failed to load textures:', error);
      // Continue without LUT if it fails to load
      if (!this.imageTexture) {
        throw error; // Image is required
      }
    }
  }

  loadTexture(src) {
    return new Promise((resolve, reject) => {
      const texture = this.gl.createTexture();
      const image = new Image();
      
      image.onload = () => {
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
        resolve(texture);
      };
      
      image.onerror = reject;
      image.crossOrigin = 'anonymous';
      image.src = src;
    });
  }

  setMouse(x, y) {
    this.mouseX = x;
    this.mouseY = y;
  }

  render() {
    this.time += 0.016; // ~60fps
    
    // Set viewport
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    
    // Clear canvas
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    
    // Use program
    this.gl.useProgram(this.program);
    
    // Bind position buffer
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
    this.gl.enableVertexAttribArray(this.positionLocation);
    this.gl.vertexAttribPointer(this.positionLocation, 2, this.gl.FLOAT, false, 0, 0);
    
    // Bind texture coordinate buffer
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texCoordBuffer);
    this.gl.enableVertexAttribArray(this.texCoordLocation);
    this.gl.vertexAttribPointer(this.texCoordLocation, 2, this.gl.FLOAT, false, 0, 0);
    
    // Set uniforms
    this.gl.uniform2f(this.resolutionLocation, this.canvas.width, this.canvas.height);
    this.gl.uniform2f(this.mouseLocation, this.mouseX, this.mouseY);
    this.gl.uniform1f(this.timeLocation, this.time);
    this.gl.uniform1f(this.lutStrengthLocation, 0.0);
    this.gl.uniform1f(this.glossLocation, 0.65);
    
    // Bind main image texture
    if (this.imageTexture) {
      this.gl.activeTexture(this.gl.TEXTURE0);
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.imageTexture);
      this.gl.uniform1i(this.imageLocation, 0);
    }
    
    // Bind LUT texture
    if (this.lutTexture) {
      this.gl.activeTexture(this.gl.TEXTURE1);
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.lutTexture);
      this.gl.uniform1i(this.lutLocation, 1);
    }
    
    // Draw quad
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    
    // Continue animation
    this.animationId = requestAnimationFrame(() => this.render());
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  get vertexShaderSource() {
    return `
      attribute vec2 a_position;
      attribute vec2 a_texCoord;
      varying vec2 v_texCoord;
      
      void main() {
        gl_Position = vec4(a_position, 0, 1);
        v_texCoord = a_texCoord;
      }
    `;
  }

  get fragmentShaderSource() {
    return `
      precision mediump float;
      varying vec2 v_texCoord;
      
      uniform sampler2D u_image;
      uniform sampler2D u_lut;
      uniform vec2 u_mouse;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform float u_lutStrength;
      uniform float u_gloss;
      
      // Simple noise function
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }
      
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }
      
      // Simplified HALD LUT application (16x16 grid)
      vec3 applyLUT(vec3 color, sampler2D lut) {
        const float lutSize = 16.0;
        const float scale = (lutSize - 1.0) / lutSize;
        
        // Clamp and scale input color
        vec3 scaledColor = clamp(color, 0.0, 1.0) * scale;
        
        // Calculate blue slice
        float blue = scaledColor.b * lutSize;
        float blueFloor = floor(blue);
        float blueFract = blue - blueFloor;
        
        // Calculate UV coordinates for both slices
        vec2 rg = scaledColor.rg;
        
        // Lower slice
        float slice0 = blueFloor;
        vec2 slice0UV = vec2(
          (rg.r + mod(slice0, lutSize)) / lutSize,
          (rg.g + floor(slice0 / lutSize)) / lutSize
        );
        
        // Upper slice
        float slice1 = min(blueFloor + 1.0, lutSize - 1.0);
        vec2 slice1UV = vec2(
          (rg.r + mod(slice1, lutSize)) / lutSize,
          (rg.g + floor(slice1 / lutSize)) / lutSize
        );
        
        // Sample and interpolate
        vec3 color0 = texture2D(lut, slice0UV).rgb;
        vec3 color1 = texture2D(lut, slice1UV).rgb;
        
        return mix(color0, color1, blueFract);
      }
      
      void main() {
        vec2 uv = v_texCoord;
        
        // Sample base image
        vec3 color = texture2D(u_image, uv).rgb;
        
        // Apply LUT color grading with safety check
        if (u_lutStrength > 0.0) {
          vec3 graded = applyLUT(color, u_lut);
          // Ensure graded color is valid
          if (graded.r >= 0.0 && graded.g >= 0.0 && graded.b >= 0.0 &&
              graded.r <= 1.0 && graded.g <= 1.0 && graded.b <= 1.0) {
            color = mix(color, graded, u_lutStrength);
          }
        }
        
        // Vignette effect
        float vignette = length(uv - 0.5);
        color *= mix(1.0, 0.85, smoothstep(0.3, 0.8, vignette) * 0.4);
        
        // Film grain
        float grain = noise(uv * 1000.0 + u_time * 50.0) - 0.5;
        color += grain * 0.04;
        
        // Gloss effect
        vec2 lightPos = u_mouse;
        vec2 lightDir = lightPos - uv;
        float lightDist = length(lightDir);
        
        // Specular highlight
        float spec = pow(max(1.0 - lightDist * 2.0, 0.0), 60.0);
        
        // Fresnel edge effect
        float fresnel = pow(1.0 - dot(normalize(vec3(uv - 0.5, 0.5)), vec3(0, 0, 1)), 2.0);
        fresnel *= smoothstep(0.3, 0.7, distance(uv, vec2(0.5)));
        
        // Anisotropic streak
        vec2 streakDir = normalize(vec2(0.9, 0.4));
        float streak = pow(abs(dot(normalize(lightDir), streakDir)), 8.0);
        spec *= mix(1.0, 1.5, streak * 0.3);
        
        // Combine effects
        vec3 gloss = vec3(spec * 0.9 + fresnel * 0.2);
        color = clamp(color + gloss * u_gloss, 0.0, 1.0);
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;
  }
}

// Export for use
window.PolaroidWebGL = PolaroidWebGL;