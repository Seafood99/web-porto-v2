import"../chunks/Bzak7iHL.js";import{Z as se,_ as J,N as oe,ba as ie,bb as le,bc as ce,am as ue,q as fe,bd as de,be as ve,aI as pe,bf as N,bg as ee,L as me,d as he,p as V,o as re,F as te,t as be,a as P,b as Y,c as Q,f as O,s as X,e as D,i as M,r as L,h as B,g as K,m as ye}from"../chunks/C1pVSkUu.js";import{B as ge,i as _e,b as xe}from"../chunks/wEVNnAf9.js";import{a as ae,s as W}from"../chunks/T85uYv_I.js";function ke(n,t,...a){var r=new ge(n);se(()=>{const o=t()??null;r.ensure(o,o&&(e=>o(e,...a)))},J)}const we=()=>performance.now(),F={tick:n=>requestAnimationFrame(n),now:()=>we(),tasks:new Set};function ne(){const n=F.now();F.tasks.forEach(t=>{t.c(n)||(F.tasks.delete(t),t.f())}),F.tasks.size!==0&&F.tick(ne)}function qe(n){let t;return F.tasks.size===0&&F.tick(ne),{promise:new Promise(a=>{F.tasks.add(t={c:n,f:a})}),abort(){F.tasks.delete(t)}}}function G(n,t){ee(()=>{n.dispatchEvent(new CustomEvent(t))})}function Me(n){if(n==="float")return"cssFloat";if(n==="offset")return"cssOffset";if(n.startsWith("--"))return n;const t=n.split("-");return t.length===1?t[0]:t[0]+t.slice(1).map(a=>a[0].toUpperCase()+a.slice(1)).join("")}function Z(n){const t={},a=n.split(";");for(const r of a){const[o,e]=r.split(":");if(!o||e===void 0)break;const g=Me(o.trim());t[g]=e.trim()}return t}const Ae=n=>n;function Ee(n,t,a,r){var c;var o=(n&de)!==0,e="both",g,p=t.inert,E=t.style.overflow,s,h;function i(){return ee(()=>g??(g=a()(t,(r==null?void 0:r())??{},{direction:e})))}var f={is_global:o,in(){t.inert=p,s=$(t,i(),h,1,()=>{G(t,"introstart")},()=>{G(t,"introend"),s==null||s.abort(),s=g=void 0,t.style.overflow=E})},out(b){t.inert=!0,h=$(t,i(),s,0,()=>{G(t,"outrostart")},()=>{G(t,"outroend"),b==null||b()})},stop:()=>{s==null||s.abort(),h==null||h.abort()}},q=oe;if(((c=q.nodes).t??(c.t=[])).push(f),ie){var x=o;if(!x){for(var l=q.parent;l&&(l.f&J)!==0;)for(;(l=l.parent)&&(l.f&le)===0;);x=!l||(l.f&ce)!==0}x&&ue(()=>{fe(()=>f.in())})}}function $(n,t,a,r,o,e){var g=r===1;if(ve(t)){var p,E=!1;return pe(()=>{if(!E){var b=t({direction:g?"in":"out"});p=$(n,b,a,r,o,e)}}),{abort:()=>{E=!0,p==null||p.abort()},deactivate:()=>p.deactivate(),reset:()=>p.reset(),t:()=>p.t()}}if(a==null||a.deactivate(),!(t!=null&&t.duration)&&!(t!=null&&t.delay))return o(),e(),{abort:N,deactivate:N,reset:N,t:()=>r};const{delay:s=0,css:h,tick:i,easing:f=Ae}=t;var q=[];if(g&&a===void 0&&(i&&i(0,1),h)){var x=Z(h(0,1));q.push(x,x)}var l=()=>1-r,c=n.animate(q,{duration:s,fill:"forwards"});return c.onfinish=()=>{c.cancel(),o();var b=(a==null?void 0:a.t())??1-r;a==null||a.abort();var v=r-b,d=t.duration*Math.abs(v),z=[];if(d>0){var m=!1;if(h)for(var I=Math.ceil(d/16.666666666666668),C=0;C<=I;C+=1){var R=b+v*f(C/I),S=Z(h(R,1-R));z.push(S),m||(m=S.overflow==="hidden")}m&&(n.style.overflow="hidden"),l=()=>{var k=c.currentTime;return b+v*f(k/d)},i&&qe(()=>{if(c.playState!=="running")return!1;var k=l();return i(k,1-k),!0})}c=n.animate(z,{duration:d,fill:"forwards"}),c.onfinish=()=>{l=()=>r,i==null||i(r,1-r),e()}},{abort:()=>{c&&(c.cancel(),c.effect=null,c.onfinish=N)},deactivate:()=>{e=N},reset:()=>{r===0&&(i==null||i(1,0))},t:()=>l()}}const ze=!0,Re="always",He=Object.freeze(Object.defineProperty({__proto__:null,prerender:ze,trailingSlash:Re},Symbol.toStringTag,{value:"Module"})),A=me({isDark:!1});function Se(){if(typeof localStorage>"u")return;const n=localStorage.getItem("theme"),t=window.matchMedia("(prefers-color-scheme: dark)").matches;A.isDark=n==="dark"||n===null&&t,document.documentElement.classList.toggle("dark",A.isDark)}function j(){A.isDark=!A.isDark,document.documentElement.classList.toggle("dark",A.isDark),localStorage.setItem("theme",A.isDark?"dark":"light")}const Fe=n=>n;function Ce(n,{delay:t=0,duration:a=400,easing:r=Fe}={}){const o=+getComputedStyle(n).opacity;return{delay:t,duration:a,easing:r,css:e=>`opacity: ${e*o}`}}var De=O('<div class="mobile-menu-overlay svelte-rfuq4y"><div class="mobile-menu-header svelte-rfuq4y"><button class="hamburger close svelte-rfuq4y" type="button" aria-label="Close menu"><span class="svelte-rfuq4y"></span> <span class="svelte-rfuq4y"></span></button></div> <div class="mobile-menu-links svelte-rfuq4y"><a href="/about" class="mobile-link svelte-rfuq4y">About</a> <a href="/projects" class="mobile-link svelte-rfuq4y">Projects</a> <a href="/contact" class="mobile-link svelte-rfuq4y">Contact</a> <button class="mode-toggle-mobile svelte-rfuq4y" type="button" aria-label="Toggle dark mode"><svg class="icon-sun svelte-rfuq4y" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5" class="svelte-rfuq4y"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" class="svelte-rfuq4y"></path></svg> <svg class="icon-moon svelte-rfuq4y" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" class="svelte-rfuq4y"></path></svg></button></div></div>'),Le=O('<div class="desktop-navbar-wrapper svelte-rfuq4y"><nav id="navbar"><a href="/" class="menu-logo svelte-rfuq4y" aria-label="Home"><div class="menu-avatar svelte-rfuq4y"><span class="svelte-rfuq4y">M</span> <div class="menu-avatar-shine svelte-rfuq4y" aria-hidden="true"></div></div></a> <div class="menu__inner svelte-rfuq4y" id="primary-menu"><a href="/about" class="nav-link svelte-rfuq4y"><span class="svelte-rfuq4y">About</span></a> <a href="/projects" class="nav-link svelte-rfuq4y"><span class="svelte-rfuq4y">Projects</span></a> <a href="/contact" class="nav-link svelte-rfuq4y"><span class="svelte-rfuq4y">Contact</span></a> <button class="mode-toggle svelte-rfuq4y" type="button" aria-label="Toggle dark mode"><svg class="icon-sun svelte-rfuq4y" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4" class="svelte-rfuq4y"></circle><path d="M12 2v2m0 16v2m-10-10h2m16 0h2m-2.93-7.07l-1.41 1.41M5.64 17.66l-1.41 1.41M17.66 5.64l1.41-1.41M6.34 17.66l-1.41 1.41" class="svelte-rfuq4y"></path></svg> <svg class="icon-moon svelte-rfuq4y" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" class="svelte-rfuq4y"></path></svg></button></div></nav></div> <nav aria-label="Primary navigation"><div class="mobile-navbar-inner svelte-rfuq4y"><a href="/" class="menu-logo svelte-rfuq4y"><div class="menu-avatar svelte-rfuq4y"><span class="svelte-rfuq4y">M</span> <div class="menu-avatar-shine svelte-rfuq4y" aria-hidden="true"></div></div></a> <button type="button" aria-label="Toggle menu"><span class="svelte-rfuq4y"></span> <span class="svelte-rfuq4y"></span> <span class="svelte-rfuq4y"></span></button></div></nav> <!>',1);const Ie={hash:"svelte-rfuq4y",code:`
	/* Desktop navbar: Aceternity-style */.desktop-navbar-wrapper.svelte-rfuq4y {position:fixed;inset:0 0 auto 0;z-index:50;width:100%;display:none;}
	@media (min-width: 768px) {.desktop-navbar-wrapper.svelte-rfuq4y {display:block;}
	}#navbar.svelte-rfuq4y {display:flex;align-items:center;justify-content:space-between;gap:2px;padding:0.5rem 1.5rem;margin:0 auto;width:100%;max-width:100%;background:transparent;box-shadow:none;border-radius:0;border:1px solid transparent;backdrop-filter:none;-webkit-backdrop-filter:none;transform:none;transition:box-shadow 0.6s cubic-bezier(0.22, 1, 0.36, 1),
			border-radius 0.6s cubic-bezier(0.22, 1, 0.36, 1),
			width 0.6s cubic-bezier(0.22, 1, 0.36, 1),
			max-width 0.6s cubic-bezier(0.22, 1, 0.36, 1),
			transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
			background-color 0.6s cubic-bezier(0.22, 1, 0.36, 1),
			backdrop-filter 0.6s cubic-bezier(0.22, 1, 0.36, 1),
			border-color 0.6s cubic-bezier(0.22, 1, 0.36, 1);}#navbar.scrolled.svelte-rfuq4y {box-shadow:0 8px 30px var(--shadow);border-radius:4rem;width:85%;max-width:56rem;transform:translateY(10px);background:var(--nav-bg-scrolled);backdrop-filter:blur(16px) saturate(1.8);-webkit-backdrop-filter:blur(16px) saturate(1.8);border-color:var(--nav-border);}

	/* Mobile navbar: simple solid */.mobile-navbar.svelte-rfuq4y {position:fixed;top:0;left:0;z-index:50;width:100%;background:transparent;backdrop-filter:none;-webkit-backdrop-filter:none;border-bottom:1px solid transparent;transition:background-color 0.4s ease,
			backdrop-filter 0.4s ease,
			border-color 0.4s ease;}
	@media (min-width: 768px) {.mobile-navbar.svelte-rfuq4y {display:none;}
	}.mobile-navbar.scrolled.svelte-rfuq4y {background:var(--nav-bg-scrolled);backdrop-filter:blur(16px) saturate(1.8);-webkit-backdrop-filter:blur(16px) saturate(1.8);border-bottom:1px solid var(--border);}.mobile-navbar-inner.svelte-rfuq4y {display:flex;align-items:center;justify-content:space-between;padding:0.75rem 1rem;}.hamburger.svelte-rfuq4y {display:flex;flex-direction:column;justify-content:center;align-items:center;width:40px;height:40px;border-radius:6px;background:transparent;border:none;color:var(--text);cursor:pointer;transition:background 0.2s;position:relative;padding:0;}.hamburger.svelte-rfuq4y:hover {background:var(--hover-bg);}.hamburger.svelte-rfuq4y span {display:block;width:22px;height:2px;background:var(--text);border-radius:2px;transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);position:absolute;left:50%;transform:translateX(-50%);}.hamburger.svelte-rfuq4y span:nth-child(1) {top:13px;}.hamburger.svelte-rfuq4y span:nth-child(2) {top:19px;}.hamburger.svelte-rfuq4y span:nth-child(3) {top:25px;}.hamburger.open.svelte-rfuq4y span:nth-child(1) {top:19px;transform:translateX(-50%) rotate(45deg);}.hamburger.open.svelte-rfuq4y span:nth-child(2) {opacity:0;transform:translateX(-50%) scaleX(0);}.hamburger.open.svelte-rfuq4y span:nth-child(3) {top:19px;transform:translateX(-50%) rotate(-45deg);}

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

	/* Logo & avatar */.menu-logo.svelte-rfuq4y {text-decoration:none;}.menu-avatar.svelte-rfuq4y {position:relative;width:40px;height:40px;border-radius:50%;overflow:hidden;background:linear-gradient(135deg, var(--blue-700), var(--blue-400));display:flex;align-items:center;justify-content:center;color:white;font-weight:600;}.menu-avatar-shine.svelte-rfuq4y {position:absolute;inset:0;background:linear-gradient(
			90deg,
			transparent,
			rgba(255, 255, 255, 0.5),
			transparent
		);width:50%;pointer-events:none;opacity:0;transform:translateX(-50px) rotate(15deg);
		animation: svelte-rfuq4y-avatar-shine 4s ease-in-out infinite;}

	@keyframes svelte-rfuq4y-avatar-shine {
		0%, 100% {
			opacity: 0;
			transform: translateX(-50px) rotate(15deg);
		}
		15%, 35% {
			opacity: 1;
		}
		45% {
			opacity: 0;
			transform: translateX(50px) rotate(15deg);
		}
		45.1%, 99.9% {
			opacity: 0;
			transform: translateX(-50px) rotate(15deg);
		}
	}

	/* Nav links */.menu__inner.svelte-rfuq4y {display:flex;align-items:center;gap:4px;margin-left:auto;}.nav-link.svelte-rfuq4y {position:relative;padding:0.5rem 1rem;border-radius:9999px;text-decoration:none;color:var(--text);font-size:0.875rem;font-weight:500;transition:color 0.3s,
			background-color 0.3s;}.nav-link.svelte-rfuq4y span:where(.svelte-rfuq4y) {position:relative;z-index:2;}.nav-link.svelte-rfuq4y::before {content:'';position:absolute;inset:4px;border-radius:9999px;background:rgba(0, 0, 0, 0.1);transform:scaleX(0);transform-origin:left;transition:transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);z-index:1;}html.dark .nav-link.svelte-rfuq4y::before {background:rgba(255, 255, 255, 0.1);}.nav-link.svelte-rfuq4y:hover::before {transform:scaleX(1);}.nav-link.svelte-rfuq4y:hover {color:var(--text);}

	/* Theme toggle */.mode-toggle.svelte-rfuq4y {display:flex;align-items:center;justify-content:center;padding:0.5rem;border-radius:8px;border:none;background:transparent;color:var(--text-muted);cursor:pointer;transition:background-color 0.2s, color 0.2s;}.mode-toggle.svelte-rfuq4y:hover {background:var(--hover-bg);color:var(--text);}.icon-moon.svelte-rfuq4y {display:none;}html.dark .icon-sun.svelte-rfuq4y {display:none;}html.dark .icon-moon.svelte-rfuq4y {display:block;}.mode-toggle-mobile.svelte-rfuq4y {display:flex;align-items:center;justify-content:center;width:48px;height:48px;margin-top:1rem;background:transparent;border:none;color:var(--text-muted);cursor:pointer;transition:opacity 0.2s;
		animation: svelte-rfuq4y-linkFadeIn 0.4s ease-out both;animation-delay:0.25s;}.mode-toggle-mobile.svelte-rfuq4y:hover {opacity:0.6;}.mode-toggle-mobile.svelte-rfuq4y svg:where(.svelte-rfuq4y) {width:24px;height:24px;}`};function Pe(n,t){V(t,!0),ae(n,Ie);let a=K(!1),r=K(!1);function o(){X(r,!1)}re(()=>{const v=()=>{X(a,window.scrollY>20)},d=()=>{window.innerWidth>768&&X(r,!1)};return v(),window.addEventListener("scroll",v,{passive:!0}),window.addEventListener("resize",d),()=>{window.removeEventListener("scroll",v),window.removeEventListener("resize",d)}});var e=Le(),g=te(e),p=D(g);let E;var s=M(D(p),2),h=M(D(s),6);L(s),L(p),L(g);var i=M(g,2);let f;var q=D(i),x=M(D(q),2);let l;L(q),L(i);var c=M(i,2);{var b=v=>{var d=De(),z=D(d),m=D(z);L(z);var I=M(z,2),C=D(I),R=M(C,2),S=M(R,2),k=M(S,2);L(I),L(d),P("click",m,()=>X(r,!1)),P("click",C,o),P("click",R,o),P("click",S,o),P("click",k,function(...T){j==null||j.apply(this,T)}),Ee(3,d,()=>Ce,()=>({duration:250})),Y(v,d)};_e(c,v=>{B(r)&&v(b)})}be(()=>{E=W(p,1,"svelte-rfuq4y",null,E,{scrolled:B(a)}),f=W(i,1,"mobile-navbar svelte-rfuq4y",null,f,{scrolled:B(a)}),l=W(x,1,"hamburger svelte-rfuq4y",null,l,{open:B(r)})}),P("click",h,function(...v){j==null||j.apply(this,v)}),P("click",x,()=>X(r,!B(r))),Y(n,e),Q()}he(["click"]);var Te=O('<canvas id="shader-bg" class="svelte-6ms6f"></canvas>');const je={hash:"svelte-6ms6f",code:"canvas.svelte-6ms6f {position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:0;pointer-events:none;display:block;transition:opacity 0.4s ease;}html.dark canvas.svelte-6ms6f {opacity:0.65;}"};function Ne(n,t){V(t,!0),ae(n,je);let a;const r={colors:[[.918,.961,.984],[.769,.886,.961],[.294,.722,.98],[.173,.369,.678]],darkColors:[[.059,.09,.165],[.098,.153,.259],[.125,.224,.384],[.149,.298,.525]],colorCount:4,scale:.62,intensity:.06,paramA:.24,warp:.48,detail:1.088,contrast:1,brightness:0,saturation:1,hue:0,vignette:.34,blur:0,grain:.021,seed:1170,rotate:4.0143,offsetX:-.05,offsetY:.14,drift:.204,cursorEffect:3,cursorStrength:.46,cursorRadius:.297,oklab:0,timeScale:-.195};ye(()=>{if(!a)return;const e=a.getContext("webgl",{antialias:!1});if(!e)return;const g=`attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`,p=`#ifdef GL_FRAGMENT_PRECISION_HIGH
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
`,E=(_,w)=>{const u=e.createShader(_);return e.shaderSource(u,w),e.compileShader(u),u},s=e.createProgram();e.attachShader(s,E(e.VERTEX_SHADER,g)),e.attachShader(s,E(e.FRAGMENT_SHADER,p)),e.linkProgram(s),e.useProgram(s);const h=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,h),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW);const i=e.getAttribLocation(s,"a_position");e.enableVertexAttribArray(i),e.vertexAttribPointer(i,2,e.FLOAT,!1,0,0);const f={colors:e.getUniformLocation(s,"u_colors"),scene:e.getUniformLocation(s,"u_scene"),shape:e.getUniformLocation(s,"u_shape"),surface:e.getUniformLocation(s,"u_surface"),finish:e.getUniformLocation(s,"u_finish"),transform:e.getUniformLocation(s,"u_transform"),space:e.getUniformLocation(s,"u_space"),cursor:e.getUniformLocation(s,"u_cursor")};let q=A.isDark;function x(_){const w=_?r.darkColors:r.colors,u=new Float32Array(24);for(let y=0;y<4;y++)u.set(w[y],y*3);for(let y=w.length;y<8;y++)u.set(w[w.length-1],y*3);e.uniform3fv(f.colors,u)}x(A.isDark),e.uniform4f(f.shape,r.scale,r.intensity,r.paramA,r.warp),e.uniform4f(f.surface,r.detail,r.contrast,r.brightness,r.saturation),e.uniform4f(f.finish,r.hue,r.vignette,r.blur,r.grain),e.uniform4f(f.transform,r.seed,r.rotate,r.drift,r.oklab);let l=0,c=0,b=0,v=0,d=0,z=0,m=a.getBoundingClientRect();const I=performance.now(),C=window.matchMedia("(pointer: coarse)").matches;let R=performance.now();const S=()=>{m=a.getBoundingClientRect();const _=Math.min(window.devicePixelRatio||1,2),w=Math.max(1,Math.round(m.width*_)),u=Math.max(1,Math.round(m.height*_)),y=Math.min(1,Math.sqrt(2e6/Math.max(1,w*u))),H=Math.max(1,Math.round(w*y)),U=Math.max(1,Math.round(u*y));(a.width!==H||a.height!==U)&&(a.width=H,a.height=U,e.viewport(0,0,H,U))};window.addEventListener("resize",S),S();let k=0;{const _=u=>{if(m=a.getBoundingClientRect(),!(u.clientX>=m.left&&u.clientX<=m.right)){d=0;return}b=(u.clientX-m.left)/m.width*2-1,v=-((u.clientY-m.top)/m.height*2-1),d=1},w=()=>{d=0};window.addEventListener("pointermove",_,{passive:!0}),window.addEventListener("pointercancel",w)}const T=_=>{A.isDark!==q&&(q=A.isDark,x(A.isDark));const u=1-Math.exp(-12*.016);if(l+=(b-l)*u,c+=(v-c)*u,z+=(d-z)*u,C){const y=_-R;if(document.documentElement.dataset.scrolling==="1"){R=_,k=requestAnimationFrame(T);return}if(y<50){k=requestAnimationFrame(T);return}}R=_,e.uniform4f(f.scene,a.width,a.height,(_-I)/1e3*r.timeScale,r.colorCount),e.uniform4f(f.space,r.offsetX,r.offsetY,l,c),e.uniform4f(f.cursor,z,r.cursorEffect,r.cursorStrength,r.cursorRadius),e.drawArrays(e.TRIANGLES,0,3),k=requestAnimationFrame(T)};return k=requestAnimationFrame(T),()=>{cancelAnimationFrame(k),window.removeEventListener("resize",S)}});var o=Te();xe(o,e=>a=e,()=>a),Y(n,o),Q()}var Xe=O("<!> <!> <!>",1);function Ue(n,t){V(t,!0),re(Se);var a=Xe(),r=te(a);Ne(r,{});var o=M(r,2);Pe(o,{});var e=M(o,2);ke(e,()=>t.children),Y(n,a),Q()}export{Ue as component,He as universal};
