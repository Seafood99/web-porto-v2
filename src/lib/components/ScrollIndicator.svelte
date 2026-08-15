<script lang="ts">
	import { onMount } from 'svelte';
	import { goto, afterNavigate } from '$app/navigation';

	let {
		nextRoute,
		nextLabel,
		kicker = 'Next',
		threshold = 420,
		unlocked = true
	}: {
		nextRoute: string;
		nextLabel: string;
		/** Label kecil di atas nama halaman berikutnya */
		kicker?: string;
		/** Total delta scroll (px) yang harus diakumulasi di dasar halaman sebelum auto-navigate */
		threshold?: number;
		unlocked?: boolean;
	} = $props();

	let rootEl: HTMLElement | undefined = $state();
	let inView = $state(false);

	/** true kalau viewport sudah mentok di dasar halaman */
	let armed = $state(false);
	/** akumulasi scroll berlebih, 0..threshold */
	let overscroll = $state(0);
	/** guard supaya goto() cuma dipanggil sekali, bukan tiap frame */
	let locked = $state(false);

	let progress = $derived(Math.min(overscroll / threshold, 1));

	function navigate() {
		if (locked) return;
		locked = true;
		overscroll = threshold;
		goto(nextRoute);
	}

	function handleClick(e: MouseEvent) {
		// biarkan ctrl/cmd/middle-click buka tab baru seperti link biasa
		if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
		locked = true;
	}

	function bump(delta: number) {
		if (locked || !armed || !unlocked) return;
		lastInputAt = performance.now();
		overscroll = Math.min(Math.max(overscroll + delta, 0), threshold);
		if (overscroll >= threshold) navigate();
	}

	function checkBottom() {
		const doc = document.documentElement;
		const distance = doc.scrollHeight - (window.scrollY + window.innerHeight);
		armed = distance <= 4;
		if (!armed) overscroll = 0;
	}

	function onWheel(e: WheelEvent) {
		bump(e.deltaY);
	}

	let touchY = 0;
	function onTouchStart(e: TouchEvent) {
		touchY = e.touches[0].clientY;
	}
	function onTouchMove(e: TouchEvent) {
		const y = e.touches[0].clientY;
		bump((touchY - y) * 1.6);
		touchY = y;
	}
	function onTouchEnd() {
		if (!locked) overscroll = 0;
	}

	// Decay: kalau user berhenti scroll, progress balik pelan-pelan ke 0
	let lastInputAt = 0;
	let rafId = 0;
	function tick() {
		rafId = requestAnimationFrame(tick);
		if (locked || overscroll <= 0) return;
		if (performance.now() - lastInputAt < 160) return;
		overscroll = Math.max(0, overscroll - Math.max(6, overscroll * 0.09));
	}

	afterNavigate(() => {
		locked = false;
		overscroll = 0;
		armed = false;
	});

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				inView = entry.isIntersecting;
			},
			{ threshold: 0.25 }
		);
		if (rootEl) observer.observe(rootEl);

		window.addEventListener('scroll', checkBottom, { passive: true });
		window.addEventListener('resize', checkBottom, { passive: true });
		window.addEventListener('wheel', onWheel, { passive: true });
		window.addEventListener('touchstart', onTouchStart, { passive: true });
		window.addEventListener('touchmove', onTouchMove, { passive: true });
		window.addEventListener('touchend', onTouchEnd, { passive: true });
		checkBottom();
		rafId = requestAnimationFrame(tick);

		return () => {
			observer.disconnect();
			cancelAnimationFrame(rafId);
			window.removeEventListener('scroll', checkBottom);
			window.removeEventListener('resize', checkBottom);
			window.removeEventListener('wheel', onWheel);
			window.removeEventListener('touchstart', onTouchStart);
			window.removeEventListener('touchmove', onTouchMove);
			window.removeEventListener('touchend', onTouchEnd);
		};
	});
</script>

<section
	class="scroll-next"
	class:in-view={inView}
	class:locked-state={!unlocked}
	bind:this={rootEl}
>
	<a
		class="next-panel"
		class:armed
		class:complete={progress >= 1}
		href={nextRoute}
		onclick={handleClick}
		style="--progress: {progress}"
	>
		<span class="text">
			<span class="kicker">{armed ? 'Keep scrolling for' : kicker}</span>
			<span class="label">{nextLabel}</span>
		</span>

		<span class="ring" aria-hidden="true">
			<svg viewBox="0 0 60 60">
				<circle class="ring-track" cx="30" cy="30" r="26" />
				<circle class="ring-fill" cx="30" cy="30" r="26" />
			</svg>
			<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<line x1="12" y1="5" x2="12" y2="19" />
				<polyline points="19 12 12 19 5 12" />
			</svg>
		</span>
	</a>
</section>

<style>
	.scroll-next {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 60vh;
		padding: 4rem 1.5rem 6rem;
		opacity: 0;
		transform: translateY(12px);
		transition:
			opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
			height 0.6s cubic-bezier(0.16, 1, 0.3, 1),
			min-height 0.6s cubic-bezier(0.16, 1, 0.3, 1),
			padding 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.scroll-next.locked-state {
		height: 0 !important;
		min-height: 0 !important;
		padding: 0 !important;
		opacity: 0 !important;
		pointer-events: none !important;
		overflow: hidden !important;
	}
	.scroll-next.in-view {
		opacity: 1;
		transform: translateY(0);
	}

	.next-panel {
		display: flex;
		align-items: center;
		gap: 2rem;
		padding: 1.25rem 1.25rem 1.25rem 2.25rem;
		border-radius: 999px;
		background: var(--bg-card);
		border: 1px solid var(--border-light);
		box-shadow: var(--shadow-aceternity);
		text-decoration: none;
		color: inherit;
		transition:
			border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
			box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.next-panel:hover,
	.next-panel.armed {
		border-color: var(--blue-500);
		transform: translateY(-4px);
	}
	.next-panel.complete {
		transform: translateY(-4px) scale(0.98);
	}

	.text {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.2rem;
	}

	.kicker {
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--text-muted);
	}

	.label {
		font-family: 'Instrument Serif', Georgia, serif;
		font-size: clamp(1.75rem, 4vw, 2.25rem);
		font-style: italic;
		line-height: 1.05;
		color: var(--text);
	}

	/* Ring progress */
	.ring {
		position: relative;
		flex-shrink: 0;
		width: 60px;
		height: 60px;
		display: grid;
		place-items: center;
		color: var(--bg-card);
	}

	.ring svg {
		width: 100%;
		height: 100%;
	}

	.ring-track,
	.ring-fill {
		fill: none;
		stroke-width: 3;
	}
	.ring-track {
		stroke: var(--border);
	}
	.ring-fill {
		stroke: var(--blue-500);
		stroke-linecap: round;
		/* keliling lingkaran r=26 -> 2 * PI * 26 */
		stroke-dasharray: 163.363;
		stroke-dashoffset: calc(163.363 * (1 - var(--progress, 0)));
		transform: rotate(-90deg);
		transform-origin: center;
	}

	.arrow {
		position: absolute;
		width: 22px;
		height: 22px;
		color: var(--blue-700);
		animation: nudge 2s ease-in-out infinite;
	}
	.next-panel.armed .arrow {
		animation: none;
	}

	@keyframes nudge {
		0%,
		100% {
			transform: translateY(-2px);
		}
		50% {
			transform: translateY(3px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.scroll-next,
		.next-panel {
			transition: none;
		}
		.arrow {
			animation: none;
		}
	}

	@media (max-width: 600px) {
		.scroll-next {
			min-height: 50vh;
			padding: 3rem 1.25rem 4rem;
		}
		.next-panel {
			gap: 1.25rem;
			padding: 1rem 1rem 1rem 1.5rem;
		}
		.ring {
			width: 48px;
			height: 48px;
		}
	}
</style>
