import"./Bzak7iHL.js";import{d as G,p as O,o as P,t as V,a as W,b as D,c as J,f as Q,s as n,e as u,g as d,h as e,r as v,i as U,n as X,j as F,u as Z}from"./Dz708x4x.js";import{a as $,s as R}from"./uSfbmfMZ.js";import{s as ee,a as te}from"./CmymIQx6.js";import{b as ne}from"./G42a_P6t.js";import{p as x}from"./BSBCgXMD.js";import{a as se,g as re}from"./BjMcPUm0.js";var oe=Q('<section><a><span class="text svelte-oyptsu"><span class="kicker svelte-oyptsu"> </span> <span class="label svelte-oyptsu"> </span></span> <span class="ring svelte-oyptsu" aria-hidden="true"><svg viewBox="0 0 60 60" class="svelte-oyptsu"><circle class="ring-track svelte-oyptsu" cx="30" cy="30" r="26"></circle><circle class="ring-fill svelte-oyptsu" cx="30" cy="30" r="26"></circle></svg> <svg class="arrow svelte-oyptsu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19" class="svelte-oyptsu"></line><polyline points="19 12 12 19 5 12" class="svelte-oyptsu"></polyline></svg></span></a></section>');const ie={hash:"svelte-oyptsu",code:`.scroll-next.svelte-oyptsu {position:relative;z-index:1;display:flex;align-items:center;justify-content:center;min-height:60vh;padding:4rem 1.5rem 6rem;opacity:0;transform:translateY(12px);transition:opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
			height 0.6s cubic-bezier(0.16, 1, 0.3, 1),
			min-height 0.6s cubic-bezier(0.16, 1, 0.3, 1),
			padding 0.6s cubic-bezier(0.16, 1, 0.3, 1);}.scroll-next.locked-state.svelte-oyptsu {height:0 !important;min-height:0 !important;padding:0 !important;opacity:0 !important;pointer-events:none !important;overflow:hidden !important;}.scroll-next.in-view.svelte-oyptsu {opacity:1;transform:translateY(0);}.next-panel.svelte-oyptsu {display:flex;align-items:center;gap:2rem;padding:1.25rem 1.25rem 1.25rem 2.25rem;border-radius:999px;background:var(--bg-card);border:1px solid var(--border-light);box-shadow:var(--shadow-aceternity);text-decoration:none;color:inherit;transition:border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
			box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);}.next-panel.svelte-oyptsu:hover,
	.next-panel.armed.svelte-oyptsu {border-color:var(--blue-500);transform:translateY(-4px);}.next-panel.complete.svelte-oyptsu {transform:translateY(-4px) scale(0.98);}.text.svelte-oyptsu {display:flex;flex-direction:column;align-items:flex-start;gap:0.2rem;}.kicker.svelte-oyptsu {font-size:0.7rem;font-weight:600;text-transform:uppercase;letter-spacing:0.15em;color:var(--text-muted);}.label.svelte-oyptsu {font-family:'Instrument Serif', Georgia, serif;font-size:clamp(1.75rem, 4vw, 2.25rem);font-style:italic;line-height:1.05;color:var(--text);}

	/* Ring progress */.ring.svelte-oyptsu {position:relative;flex-shrink:0;width:60px;height:60px;display:grid;place-items:center;color:var(--bg-card);}.ring.svelte-oyptsu svg:where(.svelte-oyptsu) {width:100%;height:100%;}.ring-track.svelte-oyptsu,
	.ring-fill.svelte-oyptsu {fill:none;stroke-width:3;}.ring-track.svelte-oyptsu {stroke:var(--border);}.ring-fill.svelte-oyptsu {stroke:var(--blue-500);stroke-linecap:round;
		/* keliling lingkaran r=26 -> 2 * PI * 26 */stroke-dasharray:163.363;stroke-dashoffset:calc(163.363 * (1 - var(--progress, 0)));transform:rotate(-90deg);transform-origin:center;}.arrow.svelte-oyptsu {position:absolute;width:22px;height:22px;color:var(--blue-700);
		animation: svelte-oyptsu-nudge 2s ease-in-out infinite;}.next-panel.armed.svelte-oyptsu .arrow:where(.svelte-oyptsu) {
		animation: none;}

	@keyframes svelte-oyptsu-nudge {
		0%,
		100% {
			transform: translateY(-2px);
		}
		50% {
			transform: translateY(3px);
		}
	}

	@media (prefers-reduced-motion: reduce) {.scroll-next.svelte-oyptsu,
		.next-panel.svelte-oyptsu {transition:none;}.arrow.svelte-oyptsu {
			animation: none;}
	}

	@media (max-width: 600px) {.scroll-next.svelte-oyptsu {min-height:50vh;padding:3rem 1.25rem 4rem;}.next-panel.svelte-oyptsu {gap:1.25rem;padding:1rem 1rem 1rem 1.5rem;}.ring.svelte-oyptsu {width:48px;height:48px;}
	}`};function me(w,r){O(r,!0),$(w,ie);let T=x(r,"kicker",3,"Next"),m=x(r,"threshold",3,420),b=x(r,"unlocked",3,!0),h=d(void 0),k=d(!1),i=d(!1),s=d(0),o=d(!1),E=Z(()=>Math.min(e(s)/m(),1));function q(){e(o)||(n(o,!0),n(s,m()),re(r.nextRoute))}function C(t){t.metaKey||t.ctrlKey||t.shiftKey||t.button!==0||n(o,!0)}function z(t){e(o)||!e(i)||!b()||(M=performance.now(),n(s,Math.min(Math.max(e(s)+t,0),m()),!0),e(s)>=m()&&q())}function c(){const l=document.documentElement.scrollHeight-(window.scrollY+window.innerHeight);n(i,l<=4),e(i)||n(s,0)}function L(t){z(t.deltaY)}let f=0;function _(t){f=t.touches[0].clientY}function Y(t){const l=t.touches[0].clientY;z((f-l)*1.6),f=l}function I(){e(o)||n(s,0)}let M=0,g=0;function A(){g=requestAnimationFrame(A),!(e(o)||e(s)<=0)&&(performance.now()-M<160||n(s,Math.max(0,e(s)-Math.max(6,e(s)*.09)),!0))}se(()=>{n(o,!1),n(s,0),n(i,!1)}),P(()=>{const t=new IntersectionObserver(([l])=>{n(k,l.isIntersecting,!0)},{threshold:.25});return e(h)&&t.observe(e(h)),window.addEventListener("scroll",c,{passive:!0}),window.addEventListener("resize",c,{passive:!0}),window.addEventListener("wheel",L,{passive:!0}),window.addEventListener("touchstart",_,{passive:!0}),window.addEventListener("touchmove",Y,{passive:!0}),window.addEventListener("touchend",I,{passive:!0}),c(),g=requestAnimationFrame(A),()=>{t.disconnect(),cancelAnimationFrame(g),window.removeEventListener("scroll",c),window.removeEventListener("resize",c),window.removeEventListener("wheel",L),window.removeEventListener("touchstart",_),window.removeEventListener("touchmove",Y),window.removeEventListener("touchend",I)}});var p=oe();let K;var a=u(p);let S;var j=u(a),y=u(j),H=u(y,!0);v(y);var B=U(y,2),N=u(B,!0);v(B),v(j),X(2),v(a),v(p),ne(p,t=>n(h,t),()=>e(h)),V(()=>{K=R(p,1,"scroll-next svelte-oyptsu",null,K,{"in-view":e(k),"locked-state":!b()}),S=R(a,1,"next-panel svelte-oyptsu",null,S,{armed:e(i),complete:e(E)>=1}),ee(a,"href",r.nextRoute),te(a,`--progress: ${e(E)??""}`),F(H,e(i)?"Keep scrolling for":T()),F(N,r.nextLabel)}),W("click",a,C),D(w,p),J()}G(["click"]);export{me as S};
