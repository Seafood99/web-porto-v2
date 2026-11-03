<script lang="ts">
	import { onMount } from 'svelte';
	import { projects, type Project } from '$lib/data';
	import WorkCard from '$lib/components/WorkCard.svelte';
	import ProjectModal from '$lib/components/ProjectModal.svelte';
	import ScrollIndicator from '$lib/components/ScrollIndicator.svelte';
	import ScrollBack from '$lib/components/ScrollBack.svelte';

	let selectedProject: Project | null = $state(null);
	let containerEl: HTMLElement | undefined = $state(undefined);
	let trackEl: HTMLElement | undefined = $state(undefined);

	let progress = $state(0);
	let hasUnlocked = $state(false);
	let isPinned = $state(false);
	let translateX = $state(0);

	function openModal(project: Project) {
		selectedProject = project;
	}

	function closeModal() {
		selectedProject = null;
	}

	$effect(() => {
		if (progress >= 0.95) {
			hasUnlocked = true;
		}
	});

	function setup() {
		if (!containerEl || !trackEl) return;

		const vw = window.innerWidth;
		const vh = window.innerHeight;
		const trackWidth = trackEl.scrollWidth;

		if (trackWidth > vw) {
			isPinned = true;
			const scrollDist = trackWidth - vw;
			containerEl.style.height = `${vh + scrollDist}px`;
		} else {
			isPinned = false;
			containerEl.style.height = '';
		}
		update();
	}

	function update() {
		if (!containerEl || !trackEl) return;

		if (!isPinned) {
			translateX = 0;
			return;
		}

		const rect = containerEl.getBoundingClientRect();
		const scrollable = containerEl.offsetHeight - window.innerHeight;
		if (scrollable <= 0) return;

		const scrolled = Math.max(0, -rect.top);
		progress = Math.min(1, Math.max(0, scrolled / scrollable));

		const maxTranslate = trackEl.scrollWidth - window.innerWidth;
		translateX = progress * maxTranslate;
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

		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onResize, { passive: true });

		let resizeObserver: ResizeObserver | undefined;
		if (typeof ResizeObserver !== 'undefined' && trackEl) {
			resizeObserver = new ResizeObserver(() => {
				requestAnimationFrame(setup);
			});
			resizeObserver.observe(trackEl);
		}

		requestAnimationFrame(setup);

		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onResize);
			if (resizeObserver) {
				resizeObserver.disconnect();
			}
		};
	});
</script>

<ScrollBack prevRoute="/about" prevLabel="About" />

<div class="page">
	<a href="/about" class="back">&larr; Back to about</a>

	<header class="page-header">
		<span class="page-kicker">Portfolio</span>
		<h1 class="heading">Selected Work</h1>
		<p class="sub">Selected work &mdash; client projects, production systems, and a Bangkit capstone. Hover any card to focus.</p>
	</header>

	<section class="work-track-wrap" bind:this={containerEl} class:pinned={isPinned}>
		<div class="sticky-viewport">
			<div
				class="work-track"
				bind:this={trackEl}
				style={`transform: translate3d(${-translateX}px, 0, 0)`}
			>
				{#each projects as project}
					<WorkCard {project} onOpen={() => openModal(project)} />
				{/each}
			</div>
		</div>
	</section>

	<ScrollIndicator nextRoute="/contact" nextLabel="Contact" kicker="Next" unlocked={hasUnlocked} />
</div>

{#if selectedProject}
	<ProjectModal project={selectedProject} onClose={closeModal} />
{/if}

<style>
	.page {
		position: relative;
		z-index: 1;
		padding: 7rem 0 0;
		min-height: 100vh;
	}

	.back {
		font-size: 0.875rem;
		color: var(--text-muted);
		text-decoration: none;
		width: fit-content;
		transition: color 0.2s;
		margin-left: 2rem;
		margin-bottom: 2.5rem;
		display: block;
	}
	.back:hover {
		color: var(--blue-700);
	}

	.page-header {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem 3rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		/* Glass backing so header text reads clearly over shader */
		background: var(--glass-bg);
		backdrop-filter: blur(14px) saturate(1.4);
		-webkit-backdrop-filter: blur(14px) saturate(1.4);
		border-radius: 0 0 16px 16px;
		border-bottom: 1px solid var(--border-light);
	}

	.page-kicker {
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--blue-700);
		width: fit-content;
	}
	:global(html.dark) .page-kicker {
		color: var(--blue-400);
	}

	.heading {
		font-family: 'Instrument Serif', Georgia, serif;
		font-size: clamp(2.5rem, 6vw, 4.5rem);
		font-weight: 400;
		letter-spacing: -1.5px;
		color: var(--text);
		margin: 0;
		line-height: 1.05;
	}

	.sub {
		font-size: 1rem;
		color: var(--text-muted);
		line-height: 1.6;
		margin: 0.25rem 0 0;
		max-width: 560px;
	}

	/* Horizontal track wrapper */
	.work-track-wrap {
		position: relative;
		width: 100vw;
		margin-left: calc(50% - 50vw);
		margin-right: calc(50% - 50vw);
	}

	.work-track-wrap.pinned .sticky-viewport {
		position: sticky;
		top: 0;
		height: 100vh;
		overflow: hidden;
		display: flex;
		align-items: center;
		touch-action: pan-y;
	}

	.work-track {
		display: flex;
		gap: 1.5rem;
		padding: 0 2rem 1rem;
		will-change: transform;
		touch-action: pan-y;
	}

	.work-track-wrap:not(.pinned) .work-track {
		overflow-x: auto;
		overflow-y: hidden;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;
		-ms-overflow-style: none;
		user-select: none;
		-webkit-user-select: none;
	}

	/* The NESH collective hover pattern */
	.work-track :global(.work-card) {
		scroll-snap-align: start;
		transition:
			opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
		touch-action: pan-y;
	}

	/* When ANY card is hovered = dim all cards */
	.work-track:hover :global(.work-card) {
		opacity: 0.4;
		transform: scale(0.98);
		filter: saturate(0.7);
	}

	/* Except the hovered one */
	.work-track:hover :global(.work-card:hover) {
		opacity: 1;
		transform: scale(1) translateY(-6px);
		filter: saturate(1);
	}

	@media (max-width: 768px) {
		.page {
			padding: 5rem 0 0;
		}

		.back {
			margin-left: 1.25rem;
			margin-bottom: 1.5rem;
		}

		.page-header {
			padding: 0 1.25rem 2rem;
		}

		.work-track {
			gap: 1rem;
			padding: 0 1.25rem;
		}
	}
</style>
