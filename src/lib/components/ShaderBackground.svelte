<script lang="ts">
	import { theme } from '$lib/theme.svelte';
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	interface Uniforms {
		colors: number[][];
		darkColors: number[][];
		colorCount: number;
		scale: number;
		intensity: number;
		paramA: number;
		warp: number;
		detail: number;
		contrast: number;
		brightness: number;
		saturation: number;
		hue: number;
		vignette: number;
		blur: number;
		grain: number;
		seed: number;
		rotate: number;
		offsetX: number;
		offsetY: number;
		drift: number;
		cursorEnabled: boolean;
		cursorEffect: number;
		cursorStrength: number;
		cursorRadius: number;
		oklab: number;
		timeScale: number;
	}

	const UNIFORMS: Uniforms = {
		colors: [
			[0.918, 0.961, 0.984],
			[0.769, 0.886, 0.961],
			[0.294, 0.722, 0.98],
			[0.173, 0.369, 0.678]
		],
		darkColors: [
			[0.059, 0.090, 0.165],
			[0.098, 0.153, 0.259],
			[0.125, 0.224, 0.384],
			[0.149, 0.298, 0.525]
		],
		colorCount: 4,
		scale: 0.62,
		intensity: 0.06,
		paramA: 0.24,
		warp: 0.48,
		detail: 1.088,
		contrast: 1.0,
		brightness: 0.0,
		saturation: 1.0,
		hue: 0.0,
		vignette: 0.34,
		blur: 0.0,
		grain: 0.021,
		seed: 1170.0,
		rotate: 4.0143,
		offsetX: -0.05,
		offsetY: 0.14,
		drift: 0.204,
		cursorEnabled: true,
		cursorEffect: 3.0,
		cursorStrength: 0.46,
		cursorRadius: 0.297,
		oklab: 0.0,
		timeScale: -0.195
	};

	$effect(() => {
		if (!canvas) return;
		const gl = canvas.getContext('webgl', { antialias: false });
		if (!gl) return;

		const VERT = `attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

		const FRAG = `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec3 u_colors[8];
uniform vec4 u_scene;
uniform vec4 u_shape;
uniform vec4 u_surface;
uniform vec4 u_finish;
uniform vec4 u_transform;
uniform vec4 u_space;
uniform vec4 u_cursor;

#define u_resolution u_scene.xy
#define u_time u_scene.z
#define u_colorCount u_scene.w
#define u_scale u_shape.x
#define u_intensity u_shape.y
#define u_paramA u_shape.z
#define u_warp u_shape.w
#define u_detail u_surface.x
#define u_contrast u_surface.y
#define u_brightness u_surface.z
#define u_saturation u_surface.w
#define u_hue u_finish.x
#define u_vignette u_finish.y
#define u_blur u_finish.z
#define u_grain u_finish.w
#ifdef GL_FRAGMENT_PRECISION_HIGH
#define u_seed u_transform.x
#else
#define u_seed mod(u_transform.x, 31.0)
#endif
#define u_rotate u_transform.y
#define u_drift u_transform.z
#define u_oklab u_transform.w
#define u_offset u_space.xy
#define u_mouse u_space.zw
#define u_cursorPresence u_cursor.x
#define u_cursorEffect u_cursor.y
#define u_cursorStrength u_cursor.z
#define u_cursorRadius u_cursor.w

float hash21(vec2 p) {
#ifndef GL_FRAGMENT_PRECISION_HIGH
  p = mod(p, 31.0);
#endif
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float grainHash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
    u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(17.0, 9.2);
    a *= 0.5;
  }
  return v;
}

vec3 palette(float x) {
  float n = max(u_colorCount - 1.0, 1.0);
  float f = clamp(x, 0.0, 1.0) * n;
  vec3 col = u_colors[0];
  for (int i = 0; i < 7; i++) {
    if (float(i) < n)
      col = mix(col, u_colors[i + 1], smoothstep(0.0, 1.0, clamp(f - float(i), 0.0, 1.0)));
  }
  return col;
}

vec3 shade(vec2 uv, vec2 p, float t) {
  float warp = fbm(p * 1.5 + t * 0.15 + u_seed) * u_intensity * 2.0;
  float freq = 3.0 + u_paramA * 20.0;
  float s = 0.5 + 0.5 * sin((p.x * 0.8 + p.y * 0.4 + warp) * freq + t * 0.5);
  return palette(s);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

  if (u_cursorPresence > 0.001) {
    vec2 cursor = (0.5 * u_mouse * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    vec2 cursorDelta = p - cursor;
    if (u_cursorEffect < 0.5) {
      p += cursor * u_cursorPresence * u_cursorStrength * 0.55;
    } else {
      float cursorDistance = length(cursorDelta);
      vec2 cursorDirection = cursorDelta / max(cursorDistance, 0.0001);
      float cursorMask = u_cursorPresence * (1.0 - smoothstep(0.0, u_cursorRadius, cursorDistance));
      if (u_cursorEffect < 1.5) {
        p -= cursorDirection * cursorMask * u_cursorStrength * 0.24;
      } else if (u_cursorEffect < 2.5) {
        float cursorAngle = cursorMask * u_cursorStrength * 2.2;
        float cc = cos(cursorAngle), cs = sin(cursorAngle);
        p = cursor + mat2(cc, -cs, cs, cc) * cursorDelta;
      } else if (u_cursorEffect < 3.5) {
        float ripple = sin(cursorDistance / max(u_cursorRadius, 0.001) * 18.0 - u_time * 5.0);
        p -= cursorDirection * ripple * cursorMask * u_cursorStrength * 0.07;
      }
    }
  }

  uv = p * min(u_resolution.x, u_resolution.y) / u_resolution.xy + 0.5;
  p *= u_scale;
  if (abs(u_rotate) > 0.0001) {
    float cr = cos(u_rotate), sr = sin(u_rotate);
    p = mat2(cr, -sr, sr, cr) * p;
  }
  p += u_offset;
  if (u_drift > 0.0001)
    p += u_drift * vec2(sin(u_time * 0.31), cos(u_time * 0.23));
  if (u_warp > 0.0) {
    p += u_warp * (vec2(fbm(p * u_detail + u_seed), fbm(p * u_detail + vec2(5.2, 1.3))) - 0.5);
  }
  vec3 col = shade(uv, p, u_time);
  if (abs(u_contrast - 1.0) > 0.0001)
    col = (col - 0.5) * u_contrast + 0.5;
  if (abs(u_saturation - 1.0) > 0.0001) {
    float luma = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(vec3(luma), col, u_saturation);
  }
  if (abs(u_hue) > 0.0001) {
    const mat3 toYIQ = mat3(0.299, 0.596, 0.211, 0.587, -0.274, -0.523, 0.114, -0.322, 0.312);
    const mat3 toRGB = mat3(1.0, 1.0, 1.0, 0.956, -0.272, -1.106, 0.621, -0.647, 1.703);
    vec3 yiq = toYIQ * col;
    float ca = cos(u_hue), sa = sin(u_hue);
    yiq = vec3(yiq.x, yiq.y * ca - yiq.z * sa, yiq.y * sa + yiq.z * ca);
    col = toRGB * yiq;
  }
  if (abs(u_brightness) > 0.0001) col += u_brightness;
  if (u_vignette > 0.0001) {
    float vignetteDist = length(uv - 0.5) * 1.41421356;
    col *= 1.0 - u_vignette * smoothstep(0.35, 1.0, vignetteDist);
  }
  if (u_grain > 0.0001)
    col += (grainHash(gl_FragCoord.xy + vec2(u_seed * 17.0, u_seed * 31.0)) - 0.5) * u_grain;
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

		const compile = (type: number, src: string) => {
			const s = gl.createShader(type)!;
			gl.shaderSource(s, src);
			gl.compileShader(s);
			return s;
		};

		const program = gl.createProgram()!;
		gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
		gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
		gl.linkProgram(program);
		gl.useProgram(program);

		const buf = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buf);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
		const loc = gl.getAttribLocation(program, 'a_position');
		gl.enableVertexAttribArray(loc);
		gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

		const uni = {
			colors: gl.getUniformLocation(program, 'u_colors'),
			scene: gl.getUniformLocation(program, 'u_scene'),
			shape: gl.getUniformLocation(program, 'u_shape'),
			surface: gl.getUniformLocation(program, 'u_surface'),
			finish: gl.getUniformLocation(program, 'u_finish'),
			transform: gl.getUniformLocation(program, 'u_transform'),
			space: gl.getUniformLocation(program, 'u_space'),
			cursor: gl.getUniformLocation(program, 'u_cursor')
		};

		// Subscribe to theme changes — update color uniform when dark toggled.
		let lastDark = theme.isDark;
		function applyPalette(dark: boolean) {
			const pal = dark ? UNIFORMS.darkColors : UNIFORMS.colors;
			const flat = new Float32Array(24);
			for (let i = 0; i < 4; i++) flat.set(pal[i], i * 3);
			// Fill remaining slots with last color.
			for (let i = pal.length; i < 8; i++) flat.set(pal[pal.length - 1], i * 3);
			gl!.uniform3fv(uni.colors, flat);
		}
		applyPalette(theme.isDark);

		gl.uniform4f(uni.shape, UNIFORMS.scale, UNIFORMS.intensity, UNIFORMS.paramA, UNIFORMS.warp);
		gl.uniform4f(
			uni.surface,
			UNIFORMS.detail,
			UNIFORMS.contrast,
			UNIFORMS.brightness,
			UNIFORMS.saturation
		);
		gl.uniform4f(uni.finish, UNIFORMS.hue, UNIFORMS.vignette, UNIFORMS.blur, UNIFORMS.grain);
		gl.uniform4f(uni.transform, UNIFORMS.seed, UNIFORMS.rotate, UNIFORMS.drift, UNIFORMS.oklab);

		let mouseX = 0,
			mouseY = 0;
		let targetX = 0,
			targetY = 0;
		let targetPresence = 0,
			cursorPresence = 0;
		let bounds = canvas!.getBoundingClientRect();

		const start = performance.now();
		const isMobile = window.matchMedia('(pointer: coarse)').matches;
		let lastRenderAt = performance.now();

		const resize = () => {
			bounds = canvas!.getBoundingClientRect();
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			const rawW = Math.max(1, Math.round(bounds.width * dpr));
			const rawH = Math.max(1, Math.round(bounds.height * dpr));
			const pixelScale = Math.min(1, Math.sqrt(2000000 / Math.max(1, rawW * rawH)));
			const w = Math.max(1, Math.round(rawW * pixelScale));
			const h = Math.max(1, Math.round(rawH * pixelScale));
			if (canvas!.width !== w || canvas!.height !== h) {
				canvas!.width = w;
				canvas!.height = h;
				gl!.viewport(0, 0, w, h);
			}
		};
		window.addEventListener('resize', resize);
		resize();

		let rafId = 0;

		if (UNIFORMS.cursorEnabled) {
			const onMove = (e: PointerEvent) => {
				bounds = canvas!.getBoundingClientRect();
				const inside = e.clientX >= bounds.left && e.clientX <= bounds.right;
				if (!inside) {
					targetPresence = 0;
					return;
				}
				targetX = ((e.clientX - bounds.left) / bounds.width) * 2 - 1;
				targetY = -(((e.clientY - bounds.top) / bounds.height) * 2 - 1);
				targetPresence = 1;
			};
			const onLeave = () => {
				targetPresence = 0;
			};
			window.addEventListener('pointermove', onMove, { passive: true });
			window.addEventListener('pointercancel', onLeave);
		}

		const render = (now: number) => {
			if (theme.isDark !== lastDark) {
				lastDark = theme.isDark;
				applyPalette(theme.isDark);
			}
			const dt = 0.016;
			const follow = 1 - Math.exp(-12 * dt);
			mouseX += (targetX - mouseX) * follow;
			mouseY += (targetY - mouseY) * follow;
			cursorPresence += (targetPresence - cursorPresence) * follow;

			if (isMobile) {
				const idleMs = now - lastRenderAt;
				if (document.documentElement.dataset.scrolling === '1') {
					lastRenderAt = now;
					rafId = requestAnimationFrame(render);
					return;
				}
				if (idleMs < 50) {
					rafId = requestAnimationFrame(render);
					return;
				}
			}
			lastRenderAt = now;

			gl!.uniform4f(
				uni.scene,
				canvas!.width,
				canvas!.height,
				((now - start) / 1000) * UNIFORMS.timeScale,
				UNIFORMS.colorCount
			);
			gl!.uniform4f(uni.space, UNIFORMS.offsetX, UNIFORMS.offsetY, mouseX, mouseY);
			gl!.uniform4f(
				uni.cursor,
				UNIFORMS.cursorEnabled ? cursorPresence : 0,
				UNIFORMS.cursorEffect,
				UNIFORMS.cursorStrength,
				UNIFORMS.cursorRadius
			);
			gl!.drawArrays(gl!.TRIANGLES, 0, 3);
			rafId = requestAnimationFrame(render);
		};
		rafId = requestAnimationFrame(render);

		return () => {
			cancelAnimationFrame(rafId);
			window.removeEventListener('resize', resize);
		};
	});
</script>

<canvas id="shader-bg" bind:this={canvas}></canvas>

<style>
	canvas {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 0;
		pointer-events: none;
		display: block;
		transition: opacity 0.4s ease;
	}

	:global(html.dark) canvas {
		opacity: 0.65;
	}
</style>
