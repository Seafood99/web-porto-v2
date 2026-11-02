<script lang="ts">
	import { onMount } from 'svelte';
	import type { JourneyItem } from '$lib/data';

	let { items, progress = $bindable(0) }: { items: JourneyItem[]; progress?: number } = $props();

	let container: HTMLElement | undefined = $state();
	let track: HTMLElement | undefined = $state();
	let viewport: HTMLElement | undefined = $state();

	let activeIndex = $state(0);
	let isPinned = $state(false);
	let translateX = $state(0);

	function extractYear(date: string): string {
		return date.match(/\d{4}/)?.[0] ?? '';
	}

	function setup() {
		if (!container || !track) return;

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const vw = window.innerWidth;
		const vh = window.innerHeight;
		const trackWidth = track.scrollWidth;

		if (trackWidth > vw) {
			isPinned = true;
			const scrollDist = trackWidth - vw;
			container.style.height = `${vh + scrollDist}px`;
		} else {
			isPinned = false;
			container.style.height = '';
		}
		update();
	}

	function handleViewportScroll() {
		if (!viewport || isPinned) return;
		const maxScroll = viewport.scrollWidth - viewport.clientWidth;
		if (maxScroll <= 0) {
			progress = 1;
			return;
		}
		progress = viewport.scrollLeft / maxScroll;

		const cards = viewport.querySelectorAll<HTMLElement>('.card');
		let active = 0;
		cards.forEach((card, i) => {
			const r = card.getBoundingClientRect();
			if (r.left + r.width * 0.4 < window.innerWidth * 0.5) active = i;
		});
		activeIndex = active;
	}

	function update() {
		if (!container || !track) return;

		if (!isPinned) {
			translateX = 0;
			handleViewportScroll();
			return;
		}

		const rect = container.getBoundingClientRect();
		const scrollable = container.offsetHeight - window.innerHeight;
		if (scrollable <= 0) return;

		const scrolled = Math.max(0, -rect.top);
		progress = Math.min(1, Math.max(0, scrolled / scrollable));

		const maxTranslate = track.scrollWidth - window.innerWidth;
		translateX = progress * maxTranslate;

		const cards = track.querySelectorAll<HTMLElement>('.card');
		let active = 0;
		cards.forEach((card, i) => {
			const r = card.getBoundingClientRect();
			if (r.left + r.width * 0.4 < window.innerWidth * 0.5) active = i;
		});
		activeIndex = active;
	}

	onMount(() => {
		let ticking = false;

		function onScroll() {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(() => {
				update();
				ticking = false;
			});
		}

		function onResize() {
			requestAnimationFrame(setup);
		}

		function onViewportScroll() {
			requestAnimationFrame(handleViewportScroll);
		}

		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onResize, { passive: true });
		if (viewport) {
			viewport.addEventListener('scroll', onViewportScroll, { passive: true });
		}

		// Recalculate size dynamically when the track element size changes
		let resizeObserver: ResizeObserver | undefined;
		if (typeof ResizeObserver !== 'undefined' && track) {
			resizeObserver = new ResizeObserver(() => {
				requestAnimationFrame(setup);
			});
			resizeObserver.observe(track);
		}

		requestAnimationFrame(setup);

		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onResize);
			if (viewport) {
				viewport.removeEventListener('scroll', onViewportScroll);
			}
			if (resizeObserver) {
				resizeObserver.disconnect();
			}
		};
	});
</script>

<section class="h-timeline" bind:this={container} class:pinned={isPinned}>
	<div class="sticky-viewport" bind:this={viewport}>
		<div class="track" bind:this={track} style={`transform: translate3d(${-translateX}px, 0, 0)`}>
			{#each items as item, i (item.title)}
				<article
					class="card"
					class:active={i === activeIndex}
					class:offset-down={i % 2 === 1}
				>
					<div class="card-inner">
						<div class="card-header">
							<span class="year">{extractYear(item.date)}</span>
							<span class="kind" class:work={item.kind === 'work'}>
								{item.kind === 'work' ? 'Work' : 'Edu'}
							</span>
						</div>

						<div class="card-body">
							<h3 class="title">
								{item.title}
								{#if item.active}<span class="badge">Now</span>{/if}
							</h3>
							<span class="org">{item.org}</span>
							<span class="date">{item.date}</span>
							<p class="desc">{item.desc}</p>
						</div>

						<span class="index">{String(i + 1).padStart(2, '0')}</span>
					</div>
				</article>
			{/each}
		</div>

		{#if isPinned}
			<div class="hud">
				<div class="hud-left">
					<span class="hud-current">{String(activeIndex + 1).padStart(2, '0')}</span>
					<span class="hud-sep">/</span>
					<span class="hud-total">{String(items.length).padStart(2, '0')}</span>
				</div>
				<div class="hud-bar">
					<span class="hud-fill" style={`width: ${progress * 100}%`}></span>
				</div>
				<span class="hud-hint">scroll</span>
			</div>
		{/if}
	</div>
</section>

<style>
	.h-timeline {
		position: relative;
		z-index: 1;
	}

	.sticky-viewport {
		display: flex;
		align-items: center;
	}

	.h-timeline.pinned .sticky-viewport {
		position: sticky;
		top: 0;
		height: 100vh;
		overflow: hidden;
		touch-action: pan-y;
	}

	.h-timeline:not(.pinned) .sticky-viewport {
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		-webkit-overflow-scrolling: touch;
		padding: 2rem 0;
	}

	.track {
		display: flex;
		gap: 2.5rem;
		padding: 0 10vw;
		will-change: transform;
		touch-action: pan-y;
	}

	.h-timeline:not(.pinned) .track {
		padding: 0 1.5rem;
		gap: 1rem;
	}

	.card {
		flex-shrink: 0;
		width: 380px;
		transition:
			opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
		touch-action: pan-y;
	}

	.h-timeline.pinned .card {
		opacity: 0.3;
		transform: scale(0.92);
	}

	:global(html.dark) .h-timeline.pinned .card {
		opacity: 0.45;
	}

	.h-timeline.pinned .card.active {
		opacity: 1;
		transform: scale(1);
	}

	.h-timeline:not(.pinned) .card {
		scroll-snap-align: center;
		opacity: 1;
		transform: none;
	}

	.card-inner {
		position: relative;
		background: var(--bg-card);
		border: 1px solid var(--border-light);
		border-radius: 4px;
		padding: 2rem 2rem 2.5rem;
		overflow: hidden;
	}

	.h-timeline.pinned .card.offset-down .card-inner {
		margin-top: 3rem;
	}

	.card-inner::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 3px;
		height: 0;
		background: linear-gradient(to bottom, var(--blue-700), var(--blue-400));
		transition: height 0.5s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.card.active .card-inner::before {
		height: 100%;
	}

	.card-header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		margin-bottom: 1.5rem;
	}

	.year {
		font-family: 'Instrument Serif', Georgia, serif;
		font-size: 3.75rem;
		font-weight: 400;
		font-style: italic;
		line-height: 0.9;
		color: var(--text);
		letter-spacing: -2px;
	}

	.h-timeline.pinned .card:not(.active) .year {
		color: var(--text-muted);
	}

	.kind {
		font-size: 0.62rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.18em;
		color: var(--blue-700);
		padding: 0.3rem 0.6rem;
		border: 1px solid var(--border);
		border-radius: 9999px;
	}
	:global(html.dark) .kind {
		color: var(--blue-400);
	}

	.card-body {
		position: relative;
	}

	.title {
		font-size: 1rem;
		font-weight: 600;
		line-height: 1.4;
		color: var(--text);
		margin: 0 0 0.5rem;
	}

	.badge {
		display: inline-block;
		vertical-align: middle;
		font-size: 0.6rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		background: var(--blue-100);
		color: var(--blue-700);
		border-radius: 3px;
		padding: 0.15rem 0.4rem;
		margin-left: 0.4rem;
	}

	.org {
		display: block;
		font-size: 0.82rem;
		font-weight: 500;
		color: var(--blue-700);
		margin-bottom: 0.2rem;
	}
	:global(html.dark) .org {
		color: var(--blue-400);
	}

	.date {
		display: block;
		font-size: 0.75rem;
		color: var(--text-muted);
		margin-bottom: 0.85rem;
	}

	.desc {
		font-size: 0.88rem;
		line-height: 1.65;
		color: var(--text-muted);
		margin: 0;
	}

	.index {
		position: absolute;
		bottom: 1rem;
		right: 1.25rem;
		font-family: 'Instrument Serif', Georgia, serif;
		font-size: 0.85rem;
		font-style: italic;
		color: var(--text-muted);
		opacity: 0.4;
	}

	.hud {
		position: absolute;
		bottom: 2.5rem;
		left: 10vw;
		right: 10vw;
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.hud-left {
		display: flex;
		align-items: baseline;
		gap: 0.1rem;
		font-family: 'Instrument Serif', Georgia, serif;
		color: var(--text-muted);
		font-size: 0.9rem;
	}

	.hud-current {
		color: var(--text);
		font-size: 1.2rem;
	}

	.hud-sep {
		opacity: 0.35;
	}

	.hud-bar {
		flex: 1;
		height: 1px;
		background: var(--border);
		position: relative;
		overflow: hidden;
	}

	.hud-fill {
		position: absolute;
		inset: 0 auto 0 0;
		background: var(--blue-500);
		transition: width 0.05s linear;
	}

	.hud-hint {
		font-size: 0.6rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: var(--text-muted);
		opacity: 0.5;
	}

	@media (prefers-reduced-motion: reduce) {
		.card {
			opacity: 1 !important;
			transform: none !important;
		}
	}

	@media (max-width: 768px) {
		.card {
			width: 290px;
		}

		.card-inner {
			padding: 1.5rem;
		}

		.year {
			font-size: 2.75rem;
		}

		.h-timeline.pinned .card.offset-down .card-inner {
			margin-top: 0;
		}
	}
</style>
