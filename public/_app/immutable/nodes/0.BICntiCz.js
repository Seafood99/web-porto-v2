import"../chunks/Bzak7iHL.js";import{Y as oe,_ as Z,E as ie,aS as le,aT as ue,aU as ce,a4 as fe,q as de,aV as ve,aW as me,av as pe,aX as O,aY as ee,C as he,ac as ge,p as V,o as te,j as re,t as be,ae as X,a as H,b as Q,f as $,s as R,c as C,d as M,r as F,g as w,h as N,u as ye,i as _e}from"../chunks/Bh04TfxA.js";import{B as xe,i as ke,b as we}from"../chunks/7aijib7m.js";import{a as ae,b as K,s as qe}from"../chunks/BSkpznqA.js";function Me(n,t,...a){var r=new xe(n);oe(()=>{const s=t()??null;r.ensure(s,s&&(e=>s(e,...a)))},Z)}const Ae=()=>performance.now(),L={tick:n=>requestAnimationFrame(n),now:()=>Ae(),tasks:new Set};function ne(){const n=L.now();L.tasks.forEach(t=>{t.c(n)||(L.tasks.delete(t),t.f())}),L.tasks.size!==0&&L.tick(ne)}function Ee(n){let t;return L.tasks.size===0&&L.tick(ne),{promise:new Promise(a=>{L.tasks.add(t={c:n,f:a})}),abort(){L.tasks.delete(t)}}}function U(n,t){ee(()=>{n.dispatchEvent(new CustomEvent(t))})}function Se(n){if(n==="float")return"cssFloat";if(n==="offset")return"cssOffset";if(n.startsWith("--"))return n;const t=n.split("-");return t.length===1?t[0]:t[0]+t.slice(1).map(a=>a[0].toUpperCase()+a.slice(1)).join("")}function J(n){const t={},a=n.split(";");for(const r of a){const[s,e]=r.split(":");if(!s||e===void 0)break;const A=Se(s.trim());t[A]=e.trim()}return t}const Re=n=>n;function ze(n,t,a,r){var c;var s=(n&ve)!==0,e="both",A,b=t.inert,E=t.style.overflow,o,m;function l(){return ee(()=>A??(A=a()(t,(r==null?void 0:r())??{},{direction:e})))}var f={is_global:s,in(){t.inert=b,o=W(t,l(),m,1,()=>{U(t,"introstart")},()=>{U(t,"introend"),o==null||o.abort(),o=A=void 0,t.style.overflow=E})},out(y){t.inert=!0,m=W(t,l(),o,0,()=>{U(t,"outrostart")},()=>{U(t,"outroend"),y==null||y()})},stop:()=>{o==null||o.abort(),m==null||m.abort()}},q=ie;if(((c=q.nodes).t??(c.t=[])).push(f),le){var x=s;if(!x){for(var u=q.parent;u&&(u.f&Z)!==0;)for(;(u=u.parent)&&(u.f&ue)===0;);x=!u||(u.f&ce)!==0}x&&fe(()=>{de(()=>f.in())})}}function W(n,t,a,r,s,e){var A=r===1;if(me(t)){var b,E=!1;return pe(()=>{if(!E){var y=t({direction:A?"in":"out"});b=W(n,y,a,r,s,e)}}),{abort:()=>{E=!0,b==null||b.abort()},deactivate:()=>b.deactivate(),reset:()=>b.reset(),t:()=>b.t()}}if(a==null||a.deactivate(),!(t!=null&&t.duration)&&!(t!=null&&t.delay))return s(),e(),{abort:O,deactivate:O,reset:O,t:()=>r};const{delay:o=0,css:m,tick:l,easing:f=Re}=t;var q=[];if(A&&a===void 0&&(l&&l(0,1),m)){var x=J(m(0,1));q.push(x,x)}var u=()=>1-r,c=n.animate(q,{duration:o,fill:"forwards"});return c.onfinish=()=>{c.cancel(),s();var y=(a==null?void 0:a.t())??1-r;a==null||a.abort();var I=r-y,k=t.duration*Math.abs(I),D=[];if(k>0){var p=!1;if(m)for(var P=Math.ceil(k/16.666666666666668),j=0;j<=P;j+=1){var T=y+I*f(j/P),h=J(m(T,1-T));D.push(h),p||(p=h.overflow==="hidden")}p&&(n.style.overflow="hidden"),u=()=>{var d=c.currentTime;return y+I*f(d/k)},l&&Ee(()=>{if(c.playState!=="running")return!1;var d=u();return l(d,1-d),!0})}c=n.animate(D,{duration:k,fill:"forwards"}),c.onfinish=()=>{u=()=>r,l==null||l(r,1-r),e()}},{abort:()=>{c&&(c.cancel(),c.effect=null,c.onfinish=O)},deactivate:()=>{e=O},reset:()=>{r===0&&(l==null||l(1,0))},t:()=>u()}}const Ce=!0,$e=Object.freeze(Object.defineProperty({__proto__:null,prerender:Ce},Symbol.toStringTag,{value:"Module"})),z=he({isDark:!1});function Fe(){if(typeof localStorage>"u")return;const n=localStorage.getItem("theme"),t=window.matchMedia("(prefers-color-scheme: dark)").matches;z.isDark=n==="dark"||n===null&&t,document.documentElement.classList.toggle("dark",z.isDark)}function Y(){z.isDark=!z.isDark,document.documentElement.classList.toggle("dark",z.isDark),localStorage.setItem("theme",z.isDark?"dark":"light")}const De=n=>n;function Le(n,{delay:t=0,duration:a=400,easing:r=De}={}){const s=+getComputedStyle(n).opacity;return{delay:t,duration:a,easing:r,css:e=>`opacity: ${e*s}`}}var Ie=$('<div class="mobile-menu-overlay svelte-rfuq4y"><div class="mobile-menu-header svelte-rfuq4y"><button class="hamburger close svelte-rfuq4y" type="button" aria-label="Close menu"><span></span> <span></span></button></div> <div class="mobile-menu-links svelte-rfuq4y"><a href="/about" class="mobile-link svelte-rfuq4y">About</a> <a href="/projects" class="mobile-link svelte-rfuq4y">Projects</a> <a href="/contact" class="mobile-link svelte-rfuq4y">Contact</a> <button class="mode-toggle-mobile svelte-rfuq4y" type="button" aria-label="Toggle dark mode"><svg class="icon-sun svelte-rfuq4y" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path></svg> <svg class="icon-moon svelte-rfuq4y" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg></button></div></div>'),Te=$('<div class="desktop-navbar-wrapper svelte-rfuq4y"><nav id="navbar" class="svelte-rfuq4y"><a href="/" class="menu-logo svelte-rfuq4y" aria-label="Home"><div class="menu-avatar svelte-rfuq4y"><span>M</span> <div class="menu-avatar-shine svelte-rfuq4y"></div></div></a> <div class="menu__inner svelte-rfuq4y" id="primary-menu"><a href="/about" class="nav-link svelte-rfuq4y"><span class="svelte-rfuq4y">About</span></a> <a href="/projects" class="nav-link svelte-rfuq4y"><span class="svelte-rfuq4y">Projects</span></a> <a href="/contact" class="nav-link svelte-rfuq4y"><span class="svelte-rfuq4y">Contact</span></a> <button class="mode-toggle svelte-rfuq4y" type="button" aria-label="Toggle dark mode"><svg class="icon-sun svelte-rfuq4y" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2m0 16v2m-10-10h2m16 0h2m-2.93-7.07l-1.41 1.41M5.64 17.66l-1.41 1.41M17.66 5.64l1.41-1.41M6.34 17.66l-1.41 1.41"></path></svg> <svg class="icon-moon svelte-rfuq4y" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg></button></div></nav></div> <nav class="mobile-navbar svelte-rfuq4y"><div class="mobile-navbar-inner svelte-rfuq4y"><a href="/" class="menu-logo svelte-rfuq4y"><div class="menu-avatar svelte-rfuq4y"><span>M</span></div></a> <button type="button" aria-label="Toggle menu"><span></span> <span></span> <span></span></button></div></nav> <!>',1);const Pe={hash:"svelte-rfuq4y",code:`
	/* Desktop navbar: Aceternity-style */.desktop-navbar-wrapper.svelte-rfuq4y {position:fixed;inset:0 0 auto 0;z-index:50;width:100%;display:none;}
	@media (min-width: 768px) {.desktop-navbar-wrapper.svelte-rfuq4y {display:block;}
	}#navbar.svelte-rfuq4y {display:flex;align-items:center;justify-content:space-between;gap:2px;padding:0.5rem 1.5rem;margin:0 auto;background:var(--glass-bg);backdrop-filter:blur(12px) saturate(1.8);-webkit-backdrop-filter:blur(12px) saturate(1.8);transition:box-shadow 0.6s cubic-bezier(0.22, 1, 0.36, 1),
			border-radius 0.6s cubic-bezier(0.22, 1, 0.36, 1),
			width 0.6s cubic-bezier(0.22, 1, 0.36, 1),
			max-width 0.6s cubic-bezier(0.22, 1, 0.36, 1),
			transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);}

	/* Mobile navbar: simple solid */.mobile-navbar.svelte-rfuq4y {position:fixed;top:0;left:0;z-index:50;width:100%;background:var(--glass-bg);backdrop-filter:blur(12px) saturate(1.8);border-bottom:1px solid var(--border);}
	@media (min-width: 768px) {.mobile-navbar.svelte-rfuq4y {display:none;}
	}.mobile-navbar-inner.svelte-rfuq4y {display:flex;align-items:center;justify-content:space-between;padding:0.75rem 1rem;}.hamburger.svelte-rfuq4y {display:flex;flex-direction:column;justify-content:center;align-items:center;width:40px;height:40px;border-radius:6px;background:transparent;border:none;color:var(--text);cursor:pointer;transition:background 0.2s;position:relative;padding:0;}.hamburger.svelte-rfuq4y:hover {background:var(--hover-bg);}.hamburger.svelte-rfuq4y span {display:block;width:22px;height:2px;background:var(--text);border-radius:2px;transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);position:absolute;left:50%;transform:translateX(-50%);}.hamburger.svelte-rfuq4y span:nth-child(1) {top:13px;}.hamburger.svelte-rfuq4y span:nth-child(2) {top:19px;}.hamburger.svelte-rfuq4y span:nth-child(3) {top:25px;}.hamburger.open.svelte-rfuq4y span:nth-child(1) {top:19px;transform:translateX(-50%) rotate(45deg);}.hamburger.open.svelte-rfuq4y span:nth-child(2) {opacity:0;transform:translateX(-50%) scaleX(0);}.hamburger.open.svelte-rfuq4y span:nth-child(3) {top:19px;transform:translateX(-50%) rotate(-45deg);}

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
		animation: svelte-rfuq4y-linkFadeIn 0.4s ease-out both;animation-delay:0.25s;}.mode-toggle-mobile.svelte-rfuq4y:hover {opacity:0.6;}.mode-toggle-mobile.svelte-rfuq4y svg:where(.svelte-rfuq4y) {width:24px;height:24px;}`};function je(n,t){V(t,!0),ae(n,Pe);let a=N(!1),r=N(!1),s=N(!1),e=N(0),A=ye(()=>`
		box-shadow: ${w(e)>.1?"0 8px 30px var(--shadow)":"none"};
		border-radius: ${w(e)>.1?"4rem":"0rem"};
		width: ${w(e)>.1?"85%":"100%"};
		max-width: ${w(e)>.1?"56rem":"100%"};
		transform: ${w(e)>.1?"translateY(10px)":"none"};
	`),b=N(0),E=N("translateX(-50px) rotate(15deg)");function o(){w(r)&&R(s,!1)}function m(){R(r,window.innerWidth<=768),w(r)||R(s,!1)}te(()=>{const h=()=>{const S=window.scrollY;R(e,Math.min(S/100,1),!0),R(a,S>50)};h(),m(),window.addEventListener("scroll",h,{passive:!0}),window.addEventListener("resize",m);const d=setInterval(()=>{R(b,1),R(E,"translateX(50px) rotate(15deg)"),setTimeout(()=>{R(b,0),R(E,"translateX(-50px) rotate(15deg)")},1500)},4e3);return()=>{window.removeEventListener("scroll",h),window.removeEventListener("resize",m),clearInterval(d)}});var l=Te(),f=re(l),q=C(f),x=C(q),u=C(x),c=M(C(u),2);F(u),F(x);var y=M(x,2),I=M(C(y),6);F(y),F(q),F(f);var k=M(f,2),D=C(k),p=M(C(D),2);let P;F(D),F(k);var j=M(k,2);{var T=h=>{var d=Ie(),S=C(d),g=C(S);F(S);var _=M(S,2),i=C(_),v=M(i,2),B=M(v,2),G=M(B,2);F(_),F(d),X("click",g,()=>R(s,!1)),X("click",i,o),X("click",v,o),X("click",B,o),X("click",G,function(...se){Y==null||Y.apply(this,se)}),ze(3,d,()=>Le,()=>({duration:250})),H(h,d)};ke(j,h=>{w(s)&&h(T)})}be(()=>{K(q,w(A)),K(c,`opacity:${w(b)??""};transform:${w(E)??""};transition:all 1.5s ease-in-out`),P=qe(p,1,"hamburger svelte-rfuq4y",null,P,{open:w(s)})}),X("click",I,function(...h){Y==null||Y.apply(this,h)}),X("click",p,()=>R(s,!w(s))),H(n,l),Q()}ge(["click"]);var Xe=$('<canvas id="shader-bg" class="svelte-6ms6f"></canvas>');const Be={hash:"svelte-6ms6f",code:"canvas.svelte-6ms6f {position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:0;pointer-events:none;display:block;}"};function Ne(n,t){V(t,!0),ae(n,Be);let a;const r={colors:[[.918,.961,.984],[.769,.886,.961],[.294,.722,.98],[.173,.369,.678]],darkColors:[[.118,.145,.165],[.231,.322,.447],[.376,.647,.98],[.231,.514,.965]],colorCount:4,scale:.62,intensity:.06,paramA:.24,warp:.48,detail:1.088,contrast:1,brightness:0,saturation:1,hue:0,vignette:.34,blur:0,grain:.021,seed:1170,rotate:4.0143,offsetX:-.05,offsetY:.14,drift:.204,cursorEffect:3,cursorStrength:.46,cursorRadius:.297,oklab:0,timeScale:-.195};_e(()=>{if(!a)return;const e=a.getContext("webgl",{antialias:!1});if(!e)return;const A=`attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`,b=`#ifdef GL_FRAGMENT_PRECISION_HIGH
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
`,E=(g,_)=>{const i=e.createShader(g);return e.shaderSource(i,_),e.compileShader(i),i},o=e.createProgram();e.attachShader(o,E(e.VERTEX_SHADER,A)),e.attachShader(o,E(e.FRAGMENT_SHADER,b)),e.linkProgram(o),e.useProgram(o);const m=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,m),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW);const l=e.getAttribLocation(o,"a_position");e.enableVertexAttribArray(l),e.vertexAttribPointer(l,2,e.FLOAT,!1,0,0);const f={colors:e.getUniformLocation(o,"u_colors"),scene:e.getUniformLocation(o,"u_scene"),shape:e.getUniformLocation(o,"u_shape"),surface:e.getUniformLocation(o,"u_surface"),finish:e.getUniformLocation(o,"u_finish"),transform:e.getUniformLocation(o,"u_transform"),space:e.getUniformLocation(o,"u_space"),cursor:e.getUniformLocation(o,"u_cursor")};let q=z.isDark;function x(g){const _=g?r.darkColors:r.colors,i=new Float32Array(24);for(let v=0;v<4;v++)i.set(_[v],v*3);for(let v=_.length;v<8;v++)i.set(_[_.length-1],v*3);e.uniform3fv(f.colors,i)}x(z.isDark),e.uniform4f(f.shape,r.scale,r.intensity,r.paramA,r.warp),e.uniform4f(f.surface,r.detail,r.contrast,r.brightness,r.saturation),e.uniform4f(f.finish,r.hue,r.vignette,r.blur,r.grain),e.uniform4f(f.transform,r.seed,r.rotate,r.drift,r.oklab);let u=0,c=0,y=0,I=0,k=0,D=0,p=a.getBoundingClientRect();const P=performance.now(),j=window.matchMedia("(pointer: coarse)").matches;let T=performance.now();const h=()=>{p=a.getBoundingClientRect();const g=Math.min(window.devicePixelRatio||1,2),_=Math.max(1,Math.round(p.width*g)),i=Math.max(1,Math.round(p.height*g)),v=Math.min(1,Math.sqrt(2e6/Math.max(1,_*i))),B=Math.max(1,Math.round(_*v)),G=Math.max(1,Math.round(i*v));(a.width!==B||a.height!==G)&&(a.width=B,a.height=G,e.viewport(0,0,B,G))};window.addEventListener("resize",h),h();let d=0;{const g=i=>{if(p=a.getBoundingClientRect(),!(i.clientX>=p.left&&i.clientX<=p.right)){k=0;return}y=(i.clientX-p.left)/p.width*2-1,I=-((i.clientY-p.top)/p.height*2-1),k=1},_=()=>{k=0};window.addEventListener("pointermove",g,{passive:!0}),window.addEventListener("pointercancel",_)}const S=g=>{z.isDark!==q&&(q=z.isDark,x(z.isDark));const i=1-Math.exp(-12*.016);if(u+=(y-u)*i,c+=(I-c)*i,D+=(k-D)*i,j){const v=g-T;if(document.documentElement.dataset.scrolling==="1"){T=g,d=requestAnimationFrame(S);return}if(v<50){d=requestAnimationFrame(S);return}}T=g,e.uniform4f(f.scene,a.width,a.height,(g-P)/1e3*r.timeScale,r.colorCount),e.uniform4f(f.space,r.offsetX,r.offsetY,u,c),e.uniform4f(f.cursor,D,r.cursorEffect,r.cursorStrength,r.cursorRadius),e.drawArrays(e.TRIANGLES,0,3),d=requestAnimationFrame(S)};return d=requestAnimationFrame(S),()=>{cancelAnimationFrame(d),window.removeEventListener("resize",h)}});var s=Xe();we(s,e=>a=e,()=>a),H(n,s),Q()}var Ye=$("<!> <!> <!>",1);function We(n,t){V(t,!0),te(Fe);var a=Ye(),r=re(a);Ne(r,{});var s=M(r,2);je(s,{});var e=M(s,2);Me(e,()=>t.children),H(n,a),Q()}export{We as component,$e as universal};
