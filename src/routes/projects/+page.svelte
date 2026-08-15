<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { projects, type Project } from '$lib/data';
	import WorkCard from '$lib/components/WorkCard.svelte';
	import ProjectModal from '$lib/components/ProjectModal.svelte';

	let selectedProject: Project | null = $state(null);
	let trackEl: HTMLElement | undefined = $state(undefined);

	function openModal(project: Project) {
		selectedProject = project;
	}

	function closeModal() {
		selectedProject = null;
	}

	// Track drag-to-scroll state
	let isDragging = $state(false);
	let dragStartX = $state(0);
	let dragScrollStart = $state(0);

	function handleWheel(e: WheelEvent) {
		if (!trackEl) return;

		// If it's a pure vertical scroll, pass it to the page
		if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && e.deltaX !== 0 === false) {
			e.preventDefault();
			e.stopPropagation();
			// Scroll the page by the same amount the user was trying to scroll
			window.scrollBy({
				top: e.deltaY,
				behavior: 'auto'
			});
		}
	}

	function handlePointerDown(e: PointerEvent) {
		if (!trackEl) return;
		// Only handle primary button (left click) or touch
		if (e.pointerType === 'mouse' && e.button !== 0) return;

		// Don't drag if user clicked on interactive elements (buttons, links)
		const target = e.target as HTMLElement;
		if (target.closest('a, button, input, textarea, select')) return;

		isDragging = true;
		dragStartX = e.clientX;
		dragScrollStart = trackEl.scrollLeft;

		trackEl.style.cursor = 'grabbing';
		trackEl.setPointerCapture(e.pointerId);
		e.preventDefault();
	}

	function handlePointerMove(e: PointerEvent) {
		if (!isDragging || !trackEl) return;
		const dx = e.clientX - dragStartX;
		trackEl.scrollLeft = dragScrollStart - dx;
	}

	function handlePointerUp(e: PointerEvent) {
		if (!trackEl) return;
		isDragging = false;
		trackEl.style.cursor = 'grab';
		try {
			trackEl.releasePointerCapture(e.pointerId);
		} catch {
			// Ignore if not captured
		}
	}

	onMount(() => {
		if (trackEl) {
			trackEl.style.cursor = 'grab';
			// Non-passive wheel listener so we can preventDefault
			trackEl.addEventListener('wheel', handleWheel, { passive: false });
		}
	});

	onDestroy(() => {
		if (trackEl) {
			trackEl.removeEventListener('wheel', handleWheel);
		}
	});
</script>

<div class="page">
	<a href="/about" class="back">&larr; Back to about</a>

	<header class="page-header">
		<span class="page-kicker">Portfolio</span>
		<h1 class="heading">Selected Work</h1>
		<p class="sub">Selected work &mdash; client projects, production systems, and a Bangkit capstone. Hover any card to focus.</p>
	</header>

	<section class="work-track-wrap">
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="work-track"
			class:dragging={isDragging}
			bind:this={trackEl}
			onpointerdown={handlePointerDown}
			onpointermove={handlePointerMove}
			onpointerup={handlePointerUp}
			onpointercancel={handlePointerUp}
		>
			{#each projects as project}
				<WorkCard {project} onOpen={() => openModal(project)} />
			{/each}
		</div>
	</section>

	<footer class="page-footer">
		<h3 class="footer-heading">Seen enough?</h3>
		<a href="/contact" class="footer-link">Let's work together <span class="arrow">&rarr;</span></a>
	</footer>
</div>

{#if selectedProject}
	<ProjectModal project={selectedProject} onClose={closeModal} />
{/if}

<style>
	.page {
		position: relative;
		z-index: 1;
		padding: 7rem 0 5rem;
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

	/* Horizontal track */
	.work-track-wrap {
		position: relative;
		width: 100vw;
		margin-left: calc(50% - 50vw);
		margin-right: calc(50% - 50vw);
	}

	.work-track {
		display: flex;
		gap: 1.5rem;
		padding: 0 2rem 1rem;
		overflow-x: auto;
		overflow-y: hidden;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;
		-ms-overflow-style: none;
		touch-action: pan-y;
		user-select: none;
		-webkit-user-select: none;
	}

	.work-track.dragging {
		scroll-snap-type: none;
	}

	.work-track.dragging :global(.work-card) {
		pointer-events: none;
	}

	.work-track::-webkit-scrollbar {
		display: none;
	}

	/* The NESH collective hover pattern */
	.work-track :global(.work-card) {
		scroll-snap-align: start;
		transition:
			opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
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
			padding: 5rem 0 3rem;
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

	/* Page footer */
	.page-footer {
		max-width: 1200px;
		margin: 0 auto;
		padding: 4rem 2rem 6rem;
		border-top: 1px solid var(--border-light);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		text-align: center;
	}

	.footer-heading {
		font-size: 0.875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--text-muted);
		margin: 0;
	}

	.footer-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-family: 'Instrument Serif', Georgia, serif;
		font-size: clamp(1.5rem, 3vw, 2rem);
		color: var(--blue-700);
		text-decoration: none;
		transition: color 0.3s ease;
	}
	.footer-link:hover {
		color: var(--blue-500);
	}

	.arrow {
		display: inline-block;
		transition: transform 0.3s ease;
	}
	.footer-link:hover .arrow {
		transform: translateX(4px);
	}

	@media (max-width: 600px) {
		.page-footer {
			padding: 3rem 1.25rem 4rem;
		}
	}
</style>
