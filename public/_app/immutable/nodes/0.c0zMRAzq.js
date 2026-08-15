import"../chunks/Bzak7iHL.js";import{_ as le,a0 as ee,G as ue,aS as ce,aT as fe,aU as de,a6 as ve,q as pe,aV as me,aW as he,av as be,aX as $,aY as re,E as ge,x as ye,p as V,o as te,j as ae,t as _e,z as X,a as U,b as Q,f as H,s as z,c as R,d as q,r as C,g as p,h as Y,u as xe,i as ke}from"../chunks/DKaE5Mtj.js";import{B as we,i as qe,b as Me}from"../chunks/B0LfBOAp.js";import{a as ne,b as K,s as J}from"../chunks/BhtxgYKF.js";function Ae(n,r,...a){var t=new we(n);le(()=>{const o=r()??null;t.ensure(o,o&&(e=>o(e,...a)))},ee)}const Ee=()=>performance.now(),D={tick:n=>requestAnimationFrame(n),now:()=>Ee(),tasks:new Set};function oe(){const n=D.now();D.tasks.forEach(r=>{r.c(n)||(D.tasks.delete(r),r.f())}),D.tasks.size!==0&&D.tick(oe)}function ze(n){let r;return D.tasks.size===0&&D.tick(oe),{promise:new Promise(a=>{D.tasks.add(r={c:n,f:a})}),abort(){D.tasks.delete(r)}}}function O(n,r){re(()=>{n.dispatchEvent(new CustomEvent(r))})}function Se(n){if(n==="float")return"cssFloat";if(n==="offset")return"cssOffset";if(n.startsWith("--"))return n;const r=n.split("-");return r.length===1?r[0]:r[0]+r.slice(1).map(a=>a[0].toUpperCase()+a.slice(1)).join("")}function Z(n){const r={},a=n.split(";");for(const t of a){const[o,e]=t.split(":");if(!o||e===void 0)break;const M=Se(o.trim());r[M]=e.trim()}return r}const Re=n=>n;function Ce(n,r,a,t){var d;var o=(n&me)!==0,e="both",M,g=r.inert,A=r.style.overflow,s,h;function c(){return re(()=>M??(M=a()(r,(t==null?void 0:t())??{},{direction:e})))}var v={is_global:o,in(){r.inert=g,s=W(r,c(),h,1,()=>{O(r,"introstart")},()=>{O(r,"introend"),s==null||s.abort(),s=M=void 0,r.style.overflow=A})},out(y){r.inert=!0,h=W(r,c(),s,0,()=>{O(r,"outrostart")},()=>{O(r,"outroend"),y==null||y()})},stop:()=>{s==null||s.abort(),h==null||h.abort()}},w=ue;if(((d=w.nodes).t??(d.t=[])).push(v),ce){var k=o;if(!k){for(var f=w.parent;f&&(f.f&ee)!==0;)for(;(f=f.parent)&&(f.f&fe)===0;);k=!f||(f.f&de)!==0}k&&ve(()=>{pe(()=>v.in())})}}function W(n,r,a,t,o,e){var M=t===1;if(he(r)){var g,A=!1;return be(()=>{if(!A){var y=r({direction:M?"in":"out"});g=W(n,y,a,t,o,e)}}),{abort:()=>{A=!0,g==null||g.abort()},deactivate:()=>g.deactivate(),reset:()=>g.reset(),t:()=>g.t()}}if(a==null||a.deactivate(),!(r!=null&&r.duration)&&!(r!=null&&r.delay))return o(),e(),{abort:$,deactivate:$,reset:$,t:()=>t};const{delay:s=0,css:h,tick:c,easing:v=Re}=r;var w=[];if(M&&a===void 0&&(c&&c(0,1),h)){var k=Z(h(0,1));w.push(k,k)}var f=()=>1-t,d=n.animate(w,{duration:s,fill:"forwards"});return d.onfinish=()=>{d.cancel(),o();var y=(a==null?void 0:a.t())??1-t;a==null||a.abort();var L=t-y,x=r.duration*Math.abs(L),F=[];if(x>0){var b=!1;if(h)for(var j=Math.ceil(x/16.666666666666668),I=0;I<=j;I+=1){var T=y+L*v(I/j),P=Z(h(T,1-T));F.push(P),b||(b=P.overflow==="hidden")}b&&(n.style.overflow="hidden"),f=()=>{var l=d.currentTime;return y+L*v(l/x)},c&&ze(()=>{if(d.playState!=="running")return!1;var l=f();return c(l,1-l),!0})}d=n.animate(F,{duration:x,fill:"forwards"}),d.onfinish=()=>{f=()=>t,c==null||c(t,1-t),e()}},{abort:()=>{d&&(d.cancel(),d.effect=null,d.onfinish=$)},deactivate:()=>{e=$},reset:()=>{t===0&&(c==null||c(1,0))},t:()=>f()}}const Fe=!0,We=Object.freeze(Object.defineProperty({__proto__:null,prerender:Fe},Symbol.toStringTag,{value:"Module"})),S=ge({isDark:!1});function De(){if(typeof localStorage>"u")return;const n=localStorage.getItem("theme"),r=window.matchMedia("(prefers-color-scheme: dark)").matches;S.isDark=n==="dark"||n===null&&r,document.documentElement.classList.toggle("dark",S.isDark)}function G(){S.isDark=!S.isDark,document.documentElement.classList.toggle("dark",S.isDark),localStorage.setItem("theme",S.isDark?"dark":"light")}const Le=n=>n;function Ie(n,{delay:r=0,duration:a=400,easing:t=Le}={}){const o=+getComputedStyle(n).opacity;return{delay:r,duration:a,easing:t,css:e=>`opacity: ${e*o}`}}var Te=H('<div class="mobile-menu-overlay svelte-rfuq4y"><div class="mobile-menu-header svelte-rfuq4y"><button class="hamburger close svelte-rfuq4y" type="button" aria-label="Close menu"><span></span> <span></span></button></div> <div class="mobile-menu-links svelte-rfuq4y"><a href="/about" class="mobile-link svelte-rfuq4y">About</a> <a href="/projects" class="mobile-link svelte-rfuq4y">Projects</a> <a href="/contact" class="mobile-link svelte-rfuq4y">Contact</a> <button class="mode-toggle-mobile svelte-rfuq4y" type="button" aria-label="Toggle dark mode"><svg class="icon-sun svelte-rfuq4y" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path></svg> <svg class="icon-moon svelte-rfuq4y" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg></button></div></div>'),Pe=H('<div class="desktop-navbar-wrapper svelte-rfuq4y"><nav id="navbar" class="svelte-rfuq4y"><a href="/" class="menu-logo svelte-rfuq4y" aria-label="Home"><div class="menu-avatar svelte-rfuq4y"><span>M</span> <div class="menu-avatar-shine svelte-rfuq4y"></div></div></a> <div class="menu__inner svelte-rfuq4y" id="primary-menu"><a href="/about" class="nav-link svelte-rfuq4y"><span class="svelte-rfuq4y">About</span></a> <a href="/projects" class="nav-link svelte-rfuq4y"><span class="svelte-rfuq4y">Projects</span></a> <a href="/contact" class="nav-link svelte-rfuq4y"><span class="svelte-rfuq4y">Contact</span></a> <button class="mode-toggle svelte-rfuq4y" type="button" aria-label="Toggle dark mode"><svg class="icon-sun svelte-rfuq4y" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2m0 16v2m-10-10h2m16 0h2m-2.93-7.07l-1.41 1.41M5.64 17.66l-1.41 1.41M17.66 5.64l1.41-1.41M6.34 17.66l-1.41 1.41"></path></svg> <svg class="icon-moon svelte-rfuq4y" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg></button></div></nav></div> <nav><div class="mobile-navbar-inner svelte-rfuq4y"><a href="/" class="menu-logo svelte-rfuq4y"><div class="menu-avatar svelte-rfuq4y"><span>M</span></div></a> <button type="button" aria-label="Toggle menu"><span></span> <span></span> <span></span></button></div></nav> <!>',1);const je={hash:"svelte-rfuq4y",code:`
	/* Desktop navbar: Aceternity-style */.desktop-navbar-wrapper.svelte-rfuq4y {position:fixed;inset:0 0 auto 0;z-index:50;width:100%;display:none;}
	@media (min-width: 768px) {.desktop-navbar-wrapper.svelte-rfuq4y {display:block;}
	}#navbar.svelte-rfuq4y {display:flex;align-items:center;justify-content:space-between;gap:2px;padding:0.5rem 1.5rem;margin:0 auto;transition:box-shadow 0.6s cubic-bezier(0.22, 1, 0.36, 1),
			border-radius 0.6s cubic-bezier(0.22, 1, 0.36, 1),
			width 0.6s cubic-bezier(0.22, 1, 0.36, 1),
			max-width 0.6s cubic-bezier(0.22, 1, 0.36, 1),
			transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
			background-color 0.6s cubic-bezier(0.22, 1, 0.36, 1),
			backdrop-filter 0.6s cubic-bezier(0.22, 1, 0.36, 1),
			border-color 0.6s cubic-bezier(0.22, 1, 0.36, 1);}

	/* Mobile navbar: simple solid */.mobile-navbar.svelte-rfuq4y {position:fixed;top:0;left:0;z-index:50;width:100%;background:transparent;backdrop-filter:none;-webkit-backdrop-filter:none;border-bottom:1px solid transparent;transition:background-color 0.4s ease,
			backdrop-filter 0.4s ease,
			border-color 0.4s ease;}
	@media (min-width: 768px) {.mobile-navbar.svelte-rfuq4y {display:none;}
	}.mobile-navbar.scrolled.svelte-rfuq4y {background:var(--glass-bg);backdrop-filter:blur(12px) saturate(1.8);-webkit-backdrop-filter:blur(12px) saturate(1.8);border-bottom:1px solid var(--border);}.mobile-navbar-inner.svelte-rfuq4y {display:flex;align-items:center;justify-content:space-between;padding:0.75rem 1rem;}.hamburger.svelte-rfuq4y {display:flex;flex-direction:column;justify-content:center;align-items:center;width:40px;height:40px;border-radius:6px;background:transparent;border:none;color:var(--text);cursor:pointer;transition:background 0.2s;position:relative;padding:0;}.hamburger.svelte-rfuq4y:hover {background:var(--hover-bg);}.hamburger.svelte-rfuq4y span {display:block;width:22px;height:2px;background:var(--text);border-radius:2px;transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);position:absolute;left:50%;transform:translateX(-50%);}.hamburger.svelte-rfuq4y span:nth-child(1) {top:13px;}.hamburger.svelte-rfuq4y span:nth-child(2) {top:19px;}.hamburger.svelte-rfuq4y span:nth-child(3) {top:25px;}.hamburger.open.svelte-rfuq4y span:nth-child(1) {top:19px;transform:translateX(-50%) rotate(45deg);}.hamburger.open.svelte-rfuq4y span:nth-child(2) {opacity:0;transform:translateX(-50%) scaleX(0);}.hamburger.open.svelte-rfuq4y span:nth-child(3) {top:19px;transform:translateX(-50%) rotate(-45deg);}

	/* Mobile menu fullscreen overlay (Aceternity-style) */.mobile-menu-overlay.svelte-rfuq4y {position:fixed;inset:0;z-index:50;display:flex;flex-direction:column;background:var(--bg);
		animation: svelte-rfuq4y-overlayFadeIn 0.3s ease-out;}.mobile-menu-header.svelte-rfuq4y {display:flex;justify-content:flex-end;padding:0.75rem 1.5rem;}.mobile-menu-header.svelte-rfuq4y .hamburger.close:where(.svelte-rfuq4y) {width:40px;height:40px;position:relative;}.mobile-menu-header.svelte-rfuq4y .hamburger.close:where(.svelte-rfuq4y) span:nth-child(1) {top:50%;transform:translateY(-50%) rotate(45deg);}.mobile-menu-header.svelte-rfuq4y .hamburger.close:where(.svelte-rfuq4y) span:nth-child(2) {top:50%;transform:translateY(-50%) rotate(-45deg);}.mobile-menu-links.svelte-rfuq4y {display:flex;flex-direction:column;flex:1;justify-content:center;align-items:center;padding:2rem;gap:0.5rem;}.mobile-link.svelte-rfuq4y {display:block;padding:1.25rem 0;color:var(--text);text-decoration:none;font-size:1.5rem;font-weight:500;transition:opacity 0.2s;
		animation: svelte-rfuq4y-linkFadeIn 0.4s ease-out both;text-align:center;}.mobile-link.svelte-rfuq4y:nth-child(1) {animation-delay:0.05s;}.mobile-link.svelte-rfuq4y:nth-child(2) {animation-delay:0.1s;}.mobile-link.svelte-rfuq4y:nth-child(3) {animation-delay:0.15s;}.mobile-link.svelte-rfuq4y:nth-child(4) {animation-delay:0.2s;}.mobile-link.svelte-rfuq4y:hover {opacity:0.6;}
	@keyframes svelte-rfuq4y-overlayFadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}
	@keyframes svelte-rfuq4y-linkFadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
			filter: blur(6px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
			filter: blur(0);
		}
	}

	/* Logo & avatar */.menu-logo.svelte-rfuq4y {text-decoration:none;}.menu-avatar.svelte-rfuq4y {position:relative;width:40px;height:40px;border-radius:50%;overflow:hidden;background:linear-gradient(135deg, var(--blue), var(--blue-2));display:flex;align-items:center;justify-content:center;color:white;font-weight:600;}.menu-avatar-shine.svelte-rfuq4y {position:absolute;inset:0;background:linear-gradient(
			90deg,
			transparent,
			rgba(255, 255, 255, 0.5),
			transparent
		);width:50%;pointer-events:none;}

	/* Nav links */.menu__inner.svelte-rfuq4y {display:flex;align-items:center;gap:4px;margin-left:auto;}.nav-link.svelte-rfuq4y {position:relative;padding:0.5rem 1rem;border-radius:9999px;text-decoration:none;color:var(--text-muted);font-size:0.875rem;transition:color 0.3s,
			background-color 0.3s;}.nav-link.svelte-rfuq4y span:where(.svelte-rfuq4y) {position:relative;z-index:2;}.nav-link.svelte-rfuq4y::before {content:'';position:absolute;inset:4px;border-radius:9999px;background:rgba(0, 0, 0, 0.1);transform:scaleX(0);transform-origin:left;transition:transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);z-index:1;}html.dark .nav-link.svelte-rfuq4y::before {background:rgba(255, 255, 255, 0.1);}.nav-link.svelte-rfuq4y:hover::before {transform:scaleX(1);}.nav-link.svelte-rfuq4y:hover {color:var(--text);}

	/* Theme toggle */.mode-toggle.svelte-rfuq4y {display:flex;align-items:center;justify-content:center;padding:0.5rem;border-radius:8px;border:none;background:transparent;color:var(--text-muted);cursor:pointer;transition:background-color 0.2s, color 0.2s;}.mode-toggle.svelte-rfuq4y:hover {background:var(--hover-bg);color:var(--text);}.icon-moon.svelte-rfuq4y {display:none;}html.dark .icon-sun.svelte-rfuq4y {display:none;}html.dark .icon-moon.svelte-rfuq4y {display:block;}.mode-toggle-mobile.svelte-rfuq4y {display:flex;align-items:center;justify-content:center;width:48px;height:48px;margin-top:1rem;background:transparent;border:none;color:var(--text-muted);cursor:pointer;transition:opacity 0.2s;
		animation: svelte-rfuq4y-linkFadeIn 0.4s ease-out both;animation-delay:0.25s;}.mode-toggle-mobile.svelte-rfuq4y:hover {opacity:0.6;}.mode-toggle-mobile.svelte-rfuq4y svg:where(.svelte-rfuq4y) {width:24px;height:24px;}`};function Xe(n,r){V(r,!0),ne(n,je);let a=Y(!1),t=Y(!1),o=Y(!1),e=Y(0),M=xe(()=>`
		box-shadow: ${p(e)>.1?"0 8px 30px var(--shadow)":"none"};
		border-radius: ${p(e)>.1?"4rem":"0rem"};
		width: ${p(e)>.1?"85%":"100%"};
		max-width: ${p(e)>.1?"56rem":"100%"};
		transform: ${p(e)>.1?"translateY(10px)":"none"};
		background: ${p(e)>.1?"var(--nav-bg-scrolled)":"transparent"};
		backdrop-filter: ${p(e)>.1?"blur(12px) saturate(1.8)":"none"};
		-webkit-backdrop-filter: ${p(e)>.1?"blur(12px) saturate(1.8)":"none"};
		border: ${p(e)>.1?"1px solid var(--nav-border)":"1px solid transparent"};
	`),g=Y(0),A=Y("translateX(-50px) rotate(15deg)");function s(){p(t)&&z(o,!1)}function h(){z(t,window.innerWidth<=768),p(t)||z(o,!1)}te(()=>{const l=()=>{const u=window.scrollY;z(e,Math.min(u/100,1),!0),z(a,u>50)};l(),h(),window.addEventListener("scroll",l,{passive:!0}),window.addEventListener("resize",h);const E=setInterval(()=>{z(g,1),z(A,"translateX(50px) rotate(15deg)"),setTimeout(()=>{z(g,0),z(A,"translateX(-50px) rotate(15deg)")},1500)},4e3);return()=>{window.removeEventListener("scroll",l),window.removeEventListener("resize",h),clearInterval(E)}});var c=Pe(),v=ae(c),w=R(v),k=R(w),f=R(k),d=q(R(f),2);C(f),C(k);var y=q(k,2),L=q(R(y),6);C(y),C(w),C(v);var x=q(v,2);let F;var b=R(x),j=q(R(b),2);let I;C(b),C(x);var T=q(x,2);{var P=l=>{var E=Te(),u=R(E),_=R(u);C(u);var i=q(u,2),m=R(i),B=q(m,2),N=q(B,2),se=q(N,2);C(i),C(E),X("click",_,()=>z(o,!1)),X("click",m,s),X("click",B,s),X("click",N,s),X("click",se,function(...ie){G==null||G.apply(this,ie)}),Ce(3,E,()=>Ie,()=>({duration:250})),U(l,E)};qe(T,l=>{p(o)&&l(P)})}_e(()=>{K(w,p(M)),K(d,`opacity:${p(g)??""};transform:${p(A)??""};transition:all 1.5s ease-in-out`),F=J(x,1,"mobile-navbar svelte-rfuq4y",null,F,{scrolled:p(a)}),I=J(j,1,"hamburger svelte-rfuq4y",null,I,{open:p(o)})}),X("click",L,function(...l){G==null||G.apply(this,l)}),X("click",j,()=>z(o,!p(o))),U(n,c),Q()}ye(["click"]);var Be=H('<canvas id="shader-bg" class="svelte-6ms6f"></canvas>');const Ne={hash:"svelte-6ms6f",code:"canvas.svelte-6ms6f {position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:0;pointer-events:none;display:block;}"};function Ye(n,r){V(r,!0),ne(n,Ne);let a;const t={colors:[[.918,.961,.984],[.769,.886,.961],[.294,.722,.98],[.173,.369,.678]],darkColors:[[.118,.145,.165],[.231,.322,.447],[.376,.647,.98],[.231,.514,.965]],colorCount:4,scale:.62,intensity:.06,paramA:.24,warp:.48,detail:1.088,contrast:1,brightness:0,saturation:1,hue:0,vignette:.34,blur:0,grain:.021,seed:1170,rotate:4.0143,offsetX:-.05,offsetY:.14,drift:.204,cursorEffect:3,cursorStrength:.46,cursorRadius:.297,oklab:0,timeScale:-.195};ke(()=>{if(!a)return;const e=a.getContext("webgl",{antialias:!1});if(!e)return;const M=`attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`,g=`#ifdef GL_FRAGMENT_PRECISION_HIGH
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
`,A=(u,_)=>{const i=e.createShader(u);return e.shaderSource(i,_),e.compileShader(i),i},s=e.createProgram();e.attachShader(s,A(e.VERTEX_SHADER,M)),e.attachShader(s,A(e.FRAGMENT_SHADER,g)),e.linkProgram(s),e.useProgram(s);const h=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,h),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW);const c=e.getAttribLocation(s,"a_position");e.enableVertexAttribArray(c),e.vertexAttribPointer(c,2,e.FLOAT,!1,0,0);const v={colors:e.getUniformLocation(s,"u_colors"),scene:e.getUniformLocation(s,"u_scene"),shape:e.getUniformLocation(s,"u_shape"),surface:e.getUniformLocation(s,"u_surface"),finish:e.getUniformLocation(s,"u_finish"),transform:e.getUniformLocation(s,"u_transform"),space:e.getUniformLocation(s,"u_space"),cursor:e.getUniformLocation(s,"u_cursor")};let w=S.isDark;function k(u){const _=u?t.darkColors:t.colors,i=new Float32Array(24);for(let m=0;m<4;m++)i.set(_[m],m*3);for(let m=_.length;m<8;m++)i.set(_[_.length-1],m*3);e.uniform3fv(v.colors,i)}k(S.isDark),e.uniform4f(v.shape,t.scale,t.intensity,t.paramA,t.warp),e.uniform4f(v.surface,t.detail,t.contrast,t.brightness,t.saturation),e.uniform4f(v.finish,t.hue,t.vignette,t.blur,t.grain),e.uniform4f(v.transform,t.seed,t.rotate,t.drift,t.oklab);let f=0,d=0,y=0,L=0,x=0,F=0,b=a.getBoundingClientRect();const j=performance.now(),I=window.matchMedia("(pointer: coarse)").matches;let T=performance.now();const P=()=>{b=a.getBoundingClientRect();const u=Math.min(window.devicePixelRatio||1,2),_=Math.max(1,Math.round(b.width*u)),i=Math.max(1,Math.round(b.height*u)),m=Math.min(1,Math.sqrt(2e6/Math.max(1,_*i))),B=Math.max(1,Math.round(_*m)),N=Math.max(1,Math.round(i*m));(a.width!==B||a.height!==N)&&(a.width=B,a.height=N,e.viewport(0,0,B,N))};window.addEventListener("resize",P),P();let l=0;{const u=i=>{if(b=a.getBoundingClientRect(),!(i.clientX>=b.left&&i.clientX<=b.right)){x=0;return}y=(i.clientX-b.left)/b.width*2-1,L=-((i.clientY-b.top)/b.height*2-1),x=1},_=()=>{x=0};window.addEventListener("pointermove",u,{passive:!0}),window.addEventListener("pointercancel",_)}const E=u=>{S.isDark!==w&&(w=S.isDark,k(S.isDark));const i=1-Math.exp(-12*.016);if(f+=(y-f)*i,d+=(L-d)*i,F+=(x-F)*i,I){const m=u-T;if(document.documentElement.dataset.scrolling==="1"){T=u,l=requestAnimationFrame(E);return}if(m<50){l=requestAnimationFrame(E);return}}T=u,e.uniform4f(v.scene,a.width,a.height,(u-j)/1e3*t.timeScale,t.colorCount),e.uniform4f(v.space,t.offsetX,t.offsetY,f,d),e.uniform4f(v.cursor,F,t.cursorEffect,t.cursorStrength,t.cursorRadius),e.drawArrays(e.TRIANGLES,0,3),l=requestAnimationFrame(E)};return l=requestAnimationFrame(E),()=>{cancelAnimationFrame(l),window.removeEventListener("resize",P)}});var o=Be();Me(o,e=>a=e,()=>a),U(n,o),Q()}var Ge=H("<!> <!> <!>",1);function Ve(n,r){V(r,!0),te(De);var a=Ge(),t=ae(a);Ye(t,{});var o=q(t,2);Xe(o,{});var e=q(o,2);Ae(e,()=>r.children),U(n,a),Q()}export{Ve as component,We as universal};
