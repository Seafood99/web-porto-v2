import"./Bzak7iHL.js";import{p as K,o as N,t as W,b as D,c as H,f as J,s as r,e as c,i as T,r as v,h as e,j,g as p,u as O}from"./Dz708x4x.js";import{a as P,s as F}from"./uSfbmfMZ.js";import{a as Q}from"./CmymIQx6.js";import{b as U}from"./G42a_P6t.js";import{p as I}from"./BSBCgXMD.js";import{a as V,g as X}from"./wGU_wu0E.js";var Z=J('<section><div><span class="ring svelte-ya492e" aria-hidden="true"><svg viewBox="0 0 60 60" class="svelte-ya492e"><circle class="ring-track svelte-ya492e" cx="30" cy="30" r="26"></circle><circle class="ring-fill svelte-ya492e" cx="30" cy="30" r="26"></circle></svg> <svg class="arrow svelte-ya492e" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5" class="svelte-ya492e"></line><polyline points="5 12 12 5 19 12" class="svelte-ya492e"></polyline></svg></span> <span class="text svelte-ya492e"><span class="kicker svelte-ya492e"> </span> <span class="label svelte-ya492e"> </span></span></div></section>');const $={hash:"svelte-ya492e",code:`.scroll-back.svelte-ya492e {position:fixed;top:0;left:0;right:0;z-index:100;display:flex;justify-content:center;pointer-events:none;opacity:0;transform:translateY(-20px);height:0;overflow:visible;transition:opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);padding-top:2rem;}.scroll-back.active.svelte-ya492e {opacity:1;transform:translateY(0);height:auto;}.back-panel.svelte-ya492e {display:flex;align-items:center;gap:2rem;padding:1.25rem 2.25rem 1.25rem 1.25rem;border-radius:999px;background:var(--bg-card);border:1px solid var(--border-light);box-shadow:var(--shadow-aceternity);transition:border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
			box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);pointer-events:auto;}.back-panel.armed.svelte-ya492e {border-color:var(--blue-500);}.text.svelte-ya492e {display:flex;flex-direction:column;align-items:flex-start;gap:0.2rem;}.kicker.svelte-ya492e {font-size:0.7rem;font-weight:600;text-transform:uppercase;letter-spacing:0.15em;color:var(--text-muted);}.label.svelte-ya492e {font-family:'Instrument Serif', Georgia, serif;font-size:clamp(1.75rem, 4vw, 2.25rem);font-style:italic;line-height:1.05;color:var(--text);}

	/* Ring progress */.ring.svelte-ya492e {position:relative;flex-shrink:0;width:60px;height:60px;display:grid;place-items:center;color:var(--bg-card);}.ring.svelte-ya492e svg:where(.svelte-ya492e) {width:100%;height:100%;}.ring-track.svelte-ya492e,
	.ring-fill.svelte-ya492e {fill:none;stroke-width:3;}.ring-track.svelte-ya492e {stroke:var(--border);}.ring-fill.svelte-ya492e {stroke:var(--blue-500);stroke-linecap:round;stroke-dasharray:163.363;stroke-dashoffset:calc(163.363 * (1 - var(--progress, 0)));transform:rotate(-90deg);transform-origin:center;}.arrow.svelte-ya492e {position:absolute;width:22px;height:22px;color:var(--blue-700);
		animation: svelte-ya492e-nudge 2s ease-in-out infinite;}.back-panel.armed.svelte-ya492e .arrow:where(.svelte-ya492e) {
		animation: none;}

	@keyframes svelte-ya492e-nudge {
		0%,
		100% {
			transform: translateY(2px);
		}
		50% {
			transform: translateY(-3px);
		}
	}

	@media (prefers-reduced-motion: reduce) {.scroll-back.svelte-ya492e,
		.back-panel.svelte-ya492e {transition:none;}.arrow.svelte-ya492e {
			animation: none;}
	}

	@media (max-width: 600px) {.scroll-back.svelte-ya492e {padding-top:1rem;}.back-panel.svelte-ya492e {gap:1.25rem;padding:1rem 1.5rem 1rem 1rem;}.ring.svelte-ya492e {width:48px;height:48px;}
	}`};function oe(y,o){K(o,!0),P(y,$);let q=I(o,"kicker",3,"Back to"),d=I(o,"threshold",3,420),g=p(void 0),s=p(!1),t=p(0),n=p(!1),w=O(()=>Math.min(e(t)/d(),1));function R(){e(n)||(r(n,!0),r(t,d()),X(o.prevRoute))}function l(){r(s,window.scrollY<=4),e(s)||r(t,0)}function b(a){e(n)||!e(s)||(_=performance.now(),r(t,Math.min(Math.max(e(t)-a,0),d()),!0),e(t)>=d()&&R())}function x(a){b(a.deltaY)}let m=0;function k(a){m=a.touches[0].clientY}function E(a){const S=a.touches[0].clientY;b((m-S)*1.6),m=S}function L(){e(n)||r(t,0)}let _=0,u=0;function z(){u=requestAnimationFrame(z),!(e(n)||e(t)<=0)&&(performance.now()-_<160||r(t,Math.max(0,e(t)-Math.max(6,e(t)*.09)),!0))}V(()=>{r(n,!1),r(t,0),r(s,!1)}),N(()=>(window.addEventListener("scroll",l,{passive:!0}),window.addEventListener("resize",l,{passive:!0}),window.addEventListener("wheel",x,{passive:!0}),window.addEventListener("touchstart",k,{passive:!0}),window.addEventListener("touchmove",E,{passive:!0}),window.addEventListener("touchend",L,{passive:!0}),l(),u=requestAnimationFrame(z),()=>{cancelAnimationFrame(u),window.removeEventListener("scroll",l),window.removeEventListener("resize",l),window.removeEventListener("wheel",x),window.removeEventListener("touchstart",k),window.removeEventListener("touchmove",E),window.removeEventListener("touchend",L)}));var i=Z();let Y;var f=c(i);let M;var A=T(c(f),2),h=c(A),C=c(h,!0);v(h);var B=T(h,2),G=c(B,!0);v(B),v(A),v(f),v(i),U(i,a=>r(g,a),()=>e(g)),W(()=>{Y=F(i,1,"scroll-back svelte-ya492e",null,Y,{active:e(t)>0}),Q(i,`--progress: ${e(w)??""}`),M=F(f,1,"back-panel svelte-ya492e",null,M,{armed:e(s),complete:e(w)>=1}),j(C,e(s)?"Keep scrolling for":q()),j(G,o.prevLabel)}),D(y,i),H()}export{oe as S};
