<script lang="ts">
	import { onMount } from 'svelte';
	import { goto, afterNavigate } from '$app/navigation';

	let {
		prevRoute,
		prevLabel,
		kicker = 'Back to',
		threshold = 420
	}: {
		prevRoute: string;
		prevLabel: string;
		kicker?: string;
		threshold?: number;
	} = $props();

	let rootEl: HTMLElement | undefined = $state();
	let armed = $state(false);
	let overscroll = $state(0);
	let locked = $state(false);

	let progress = $derived(Math.min(overscroll / threshold, 1));

	function navigate() {
		if (locked) return;
		locked = true;
		overscroll = threshold;
		goto(prevRoute);
	}

	function checkTop() {
		armed = window.scrollY <= 4;
		if (!armed) overscroll = 0;
	}

	function bump(delta: number) {
		if (locked || !armed) return;
		lastInputAt = performance.now();
		overscroll = Math.min(Math.max(overscroll - delta, 0), threshold);
		if (overscroll >= threshold) navigate();
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
		window.addEventListener('scroll', checkTop, { passive: true });
		window.addEventListener('resize', checkTop, { passive: true });
		window.addEventListener('wheel', onWheel, { passive: true });
		window.addEventListener('touchstart', onTouchStart, { passive: true });
		window.addEventListener('touchmove', onTouchMove, { passive: true });
		window.addEventListener('touchend', onTouchEnd, { passive: true });
		checkTop();
		rafId = requestAnimationFrame(tick);

		return () => {
			cancelAnimationFrame(rafId);
			window.removeEventListener('scroll', checkTop);
			window.removeEventListener('resize', checkTop);
			window.removeEventListener('wheel', onWheel);
			window.removeEventListener('touchstart', onTouchStart);
			window.removeEventListener('touchmove', onTouchMove);
			window.removeEventListener('touchend', onTouchEnd);
		};
	});
</script>

<section 
	class="scroll-back" 
	class:active={overscroll > 0}
	style="--progress: {progress}"
	bind:this={rootEl}
>
	<div class="back-panel" class:armed class:complete={progress >= 1}>
		<span class="ring" aria-hidden="true">
			<svg viewBox="0 0 60 60">
				<circle class="ring-track" cx="30" cy="30" r="26" />
				<circle class="ring-fill" cx="30" cy="30" r="26" />
			</svg>
			<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<line x1="12" y1="19" x2="12" y2="5" />
				<polyline points="5 12 12 5 19 12" />
			</svg>
		</span>

		<span class="text">
			<span class="kicker">{armed ? 'Keep scrolling for' : kicker}</span>
			<span class="label">{prevLabel}</span>
		</span>
	</div>
</section>

<style>
	.scroll-back {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		display: flex;
		justify-content: center;
		pointer-events: none;
		opacity: 0;
		transform: translateY(-20px);
		height: 0;
		overflow: visible;
		transition:
			opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
		padding-top: 2rem;
	}

	.scroll-back.active {
		opacity: 1;
		transform: translateY(0);
		height: auto;
	}

	.back-panel {
		display: flex;
		align-items: center;
		gap: 2rem;
		padding: 1.25rem 2.25rem 1.25rem 1.25rem;
		border-radius: 999px;
		background: var(--bg-card);
		border: 1px solid var(--border-light);
		box-shadow: var(--shadow-aceternity);
		transition:
			border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
			box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
		pointer-events: auto;
	}

	.back-panel.armed {
		border-color: var(--blue-500);
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
	.back-panel.armed .arrow {
		animation: none;
	}

	@keyframes nudge {
		0%,
		100% {
			transform: translateY(2px);
		}
		50% {
			transform: translateY(-3px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.scroll-back,
		.back-panel {
			transition: none;
		}
		.arrow {
			animation: none;
		}
	}

	@media (max-width: 600px) {
		.scroll-back {
			padding-top: 1rem;
		}
		.back-panel {
			gap: 1.25rem;
			padding: 1rem 1.5rem 1rem 1rem;
		}
		.ring {
			width: 48px;
			height: 48px;
		}
	}
</style>
