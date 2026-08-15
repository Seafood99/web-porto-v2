<script lang="ts">
	import type { Project } from '$lib/data';
	import { onMount, onDestroy } from 'svelte';

	let {
		project,
		onOpen = () => {}
	}: {
		project: Project;
		onOpen?: () => void;
	} = $props();

	let imageIndex = $state(0);
	let isHovered = $state(false);
	let timer: ReturnType<typeof setInterval> | null = null;

	let images = $derived(
		project.images.length > 0
			? project.images
			: ['https://placehold.co/800x1000/1a2a47/4bb8fa?text=' + encodeURIComponent(project.title.split('—')[0].trim())]
	);

	function startSlideshow() {
		if (images.length <= 1) return;
		timer = setInterval(() => {
			imageIndex = (imageIndex + 1) % images.length;
		}, 3500);
	}

	function stopSlideshow() {
		if (timer) {
			clearInterval(timer);
			timer = null;
		}
	}

	function handleMouseEnter() {
		isHovered = true;
		startSlideshow();
	}

	function handleMouseLeave() {
		isHovered = false;
		stopSlideshow();
		imageIndex = 0;
	}

	function handleClick(e: MouseEvent) {
		// Don't open modal if clicking the external link
		const target = e.target as HTMLElement;
		if (target.closest('a') || target.closest('[data-external]')) return;
		onOpen();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') onOpen();
	}

	function isExternal(url: string): boolean {
		return url.startsWith('http://') || url.startsWith('https://');
	}

	let linkTarget = $derived(isExternal(project.link) ? '_blank' : undefined);
	let linkRel = $derived(isExternal(project.link) ? 'noopener noreferrer' : undefined);

	let projectName = $derived(project.title.split('—')[0].trim());
	let projectSubtitle = $derived(project.title.includes('—') ? project.title.split('—')[1].trim() : '');

	onDestroy(() => {
		stopSlideshow();
	});
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<article
	class="work-card"
	class:hovered={isHovered}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	onclick={handleClick}
	onkeydown={handleKeydown}
	role="button"
	tabindex="0"
>
	<div class="work-media">
		{#each images as img, i}
			<img
				src={img}
				alt={project.title}
				class:active={i === imageIndex}
				loading="lazy"
			/>
		{/each}
		<div class="work-overlay"></div>
	</div>

	<div class="work-info">
		<div class="work-text">
			<h3 class="work-name">{projectName}</h3>
			{#if projectSubtitle}
				<p class="work-subtitle">{projectSubtitle}</p>
			{:else}
				<div class="work-tags">
					{#each project.tags.slice(0, 3) as tag}
						<span class="work-tag">{tag}</span>
					{/each}
				</div>
			{/if}
		</div>

		<a
			href={project.link}
			class="work-arrow-link"
			data-external
			target={linkTarget}
			rel={linkRel}
			aria-label="Open {projectName}"
		>
			<span class="work-arrow-inner">
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
					<line x1="5" y1="12" x2="19" y2="12" />
					<polyline points="12 5 19 12 12 19" />
				</svg>
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="arrow-second">
					<line x1="5" y1="12" x2="19" y2="12" />
					<polyline points="12 5 19 12 12 19" />
				</svg>
			</span>
		</a>
	</div>

	<span class="work-label">{project.linkLabel}</span>
</article>

<style>
	.work-card {
		position: relative;
		flex: 0 0 auto;
		width: 480px;
		height: 600px;
		border-radius: 18px;
		overflow: hidden;
		cursor: pointer;
		isolation: isolate;
		transition:
			opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.work-card:hover {
		transform: translateY(-6px);
	}

	/* Media */
	.work-media {
		position: absolute;
		inset: 0;
		background: var(--blue-100);
	}

	.work-media img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0;
		transition:
			opacity 0.6s ease,
			transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
		transform: translateZ(0);
		will-change: opacity, transform;
	}

	.work-media img.active {
		opacity: 1;
	}

	.work-card:hover .work-media img.active {
		transform: scale(1.05);
	}

	/* Overlay */
	.work-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to top,
			rgba(10, 15, 30, 0.85) 0%,
			rgba(10, 15, 30, 0.45) 40%,
			rgba(10, 15, 30, 0.15) 70%,
			transparent 100%
		);
		transition: opacity 0.4s ease;
	}

	.work-card:hover .work-overlay {
		opacity: 0.7;
	}

	/* Info */
	.work-info {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 1.5rem;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 1rem;
		z-index: 2;
		color: #fff;
	}

	.work-text {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		min-width: 0;
	}

	.work-name {
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
		font-size: 1.35rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		line-height: 1.15;
		color: #fff;
		margin: 0;
		text-wrap: balance;
	}

	.work-subtitle {
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.75);
		margin: 0;
		line-height: 1.4;
	}

	.work-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		margin-top: 0.15rem;
	}

	.work-tag {
		font-size: 0.68rem;
		font-weight: 500;
		letter-spacing: 0.02em;
		padding: 0.2rem 0.55rem;
		background: rgba(255, 255, 255, 0.12);
		color: rgba(255, 255, 255, 0.9);
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.15);
		backdrop-filter: blur(6px);
	}

	/* Arrow button */
	.work-arrow-link {
		flex: 0 0 auto;
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: var(--text);
		color: var(--bg);
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		overflow: hidden;
		transition:
			background 0.3s ease,
			color 0.3s ease,
			transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.work-arrow-inner {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.work-arrow-inner svg {
		position: absolute;
		transition:
			transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
			opacity 0.4s ease;
	}

	.work-arrow-inner .arrow-second {
		transform: translateX(-100%);
		opacity: 0;
	}

	.work-card:hover .work-arrow-link {
		background: var(--blue-500);
		color: #fff;
		transform: scale(1.05);
	}

	.work-card:hover .work-arrow-inner svg:first-child {
		transform: translateX(100%);
		opacity: 0;
	}

	.work-card:hover .work-arrow-inner .arrow-second {
		transform: translateX(0);
		opacity: 1;
	}

	/* Top-right label (Live Demo / Private / Inquire) */
	.work-label {
		position: absolute;
		top: 1rem;
		right: 1rem;
		padding: 0.3rem 0.75rem;
		font-size: 0.68rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		background: rgba(255, 255, 255, 0.9);
		color: var(--text);
		border-radius: 999px;
		z-index: 2;
		backdrop-filter: blur(8px);
		transition:
			background 0.3s ease,
			color 0.3s ease;
	}

	:global(html.dark) .work-label {
		background: rgba(20, 30, 50, 0.85);
		color: #fff;
	}

	.work-card:hover .work-label {
		background: var(--blue-500);
		color: #fff;
	}

	/* Mobile */
	@media (max-width: 768px) {
		.work-card {
			width: 320px;
			height: 420px;
			border-radius: 14px;
		}

		.work-info {
			padding: 1.15rem;
		}

		.work-name {
			font-size: 1.1rem;
		}

		.work-arrow-link {
			width: 40px;
			height: 40px;
		}
	}

	@media (max-width: 480px) {
		.work-card {
			width: 280px;
			height: 380px;
		}
	}
</style>
