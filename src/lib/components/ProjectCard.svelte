<script lang="ts">
	import type { Project } from '$lib/data';

	let {
		project,
		variant = 'grid',
		onOpen = () => {}
	}: {
		project: Project;
		variant?: 'hero' | 'grid';
		onOpen?: () => void;
	} = $props();

	let images = $derived(
		project.images.length > 0
			? project.images
			: ['https://placehold.co/600x360/e2eff8/2c5ead?text=' + encodeURIComponent(project.title)]
	);

	let imageIndex = $state(0);
	let isHovered = $state(false);
	let timer: ReturnType<typeof setInterval> | null = null;

	// Spotlight state
	let spotlightX = $state(-1000);
	let spotlightY = $state(-1000);
	let cardEl: HTMLElement | undefined = $state(undefined);

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
		spotlightX = -1000;
		spotlightY = -1000;
		stopSlideshow();
		imageIndex = 0;
	}

	function handleMouseMove(e: MouseEvent) {
		if (!cardEl) return;
		const rect = cardEl.getBoundingClientRect();
		spotlightX = e.clientX - rect.left;
		spotlightY = e.clientY - rect.top;
	}

	function goToImage(index: number) {
		imageIndex = index;
	}

	function handleDotClick(e: MouseEvent, index: number) {
		e.stopPropagation();
		e.preventDefault();
		goToImage(index);
	}

	function handleCtaClick(e: MouseEvent) {
		e.stopPropagation();
		onOpen();
	}

	function handleLinkClick(e: MouseEvent) {
		e.stopPropagation();
		// Let the link navigate
	}

	function isExternal(url: string): boolean {
		return url.startsWith('http://') || url.startsWith('https://');
	}

	// Auto-start slideshow on mount for hero card
	import { onMount, onDestroy } from 'svelte';
	onMount(() => {
		if (variant === 'hero' && images.length > 1) {
			startSlideshow();
		}
	});
	onDestroy(() => {
		stopSlideshow();
	});

	let spotlightStyle = $derived(
		isHovered
			? `background: radial-gradient(600px circle at ${spotlightX}px ${spotlightY}px, var(--accent) 0%, transparent 60%);`
			: 'background: transparent;'
	);

	let linkTarget = $derived(isExternal(project.link) ? '_blank' : undefined);
	let linkRel = $derived(isExternal(project.link) ? 'noopener noreferrer' : undefined);
</script>

{#if variant === 'hero'}
	<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<article
		bind:this={cardEl}
		class="project-card hero"
		class:hovered={isHovered}
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
		onmousemove={handleMouseMove}
		onclick={onOpen}
		role="button"
		tabindex="0"
		onkeydown={(e) => e.key === 'Enter' && onOpen()}
	>
		<div class="card-media hero-media">
			{#each images as img, i}
				<img
					src={img}
					alt={project.title}
					class:active={i === imageIndex}
					loading="lazy"
				/>
			{/each}

			<span class="card-badge">{project.linkLabel}</span>

			{#if images.length > 1}
				<div class="dots">
					{#each images as _, i}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<button
							class="dot"
							class:active={i === imageIndex}
							onclick={(e) => handleDotClick(e, i)}
							aria-label="Go to image {i + 1}"
						></button>
					{/each}
				</div>
			{/if}

			<div class="spotlight" style={spotlightStyle}></div>
		</div>

		<div class="card-body hero-body">
			<div class="card-header">
				<h3 class="card-title">{project.title}</h3>
				<p class="card-desc">{project.desc}</p>
			</div>

			<div class="card-tags">
				{#each project.tags as tag}
					<span class="tag">{tag}</span>
				{/each}
			</div>

			<div class="card-actions">
				<button class="card-cta" onclick={handleCtaClick}>View Case Study</button>
				<a
					href={project.link}
					class="card-link"
					target={linkTarget}
					rel={linkRel}
					onclick={handleLinkClick}
				>
					{project.linkLabel}
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M7 17l9.2-9.2M17 17V7H7" />
					</svg>
				</a>
			</div>
		</div>
	</article>
{:else}
	<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<article
		bind:this={cardEl}
		class="project-card"
		class:hovered={isHovered}
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
		onmousemove={handleMouseMove}
		onclick={onOpen}
		role="button"
		tabindex="0"
		onkeydown={(e) => e.key === 'Enter' && onOpen()}
	>
		<div class="card-media">
			{#each images as img, i}
				<img
					src={img}
					alt={project.title}
					class:active={i === imageIndex}
					loading="lazy"
				/>
			{/each}

			<span class="card-badge">{project.linkLabel}</span>

			{#if images.length > 1}
				<div class="dots">
					{#each images as _, i}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<button
							class="dot"
							class:active={i === imageIndex}
							onclick={(e) => handleDotClick(e, i)}
							aria-label="Go to image {i + 1}"
						></button>
					{/each}
				</div>
			{/if}

			<div class="spotlight" style={spotlightStyle}></div>
		</div>

		<div class="card-body">
			<h3 class="card-title">{project.title}</h3>
			<p class="card-desc">{project.desc}</p>

			<div class="card-tags">
				{#each project.tags as tag}
					<span class="tag">{tag}</span>
				{/each}
			</div>
		</div>
	</article>
{/if}

<style>
	.project-card {
		position: relative;
		display: flex;
		flex-direction: column;
		background: var(--bg-card);
		border: 1px solid var(--border-light);
		border-radius: 14px;
		overflow: hidden;
		cursor: pointer;
		transition:
			transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
			border-color 0.3s ease,
			box-shadow 0.4s ease;
	}

	.project-card:hover {
		transform: translateY(-4px);
		border-color: var(--blue-400);
		box-shadow: 0 20px 40px -12px var(--shadow-hover);
	}

	.project-card.hero {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto auto;
	}

	.project-card.hero:hover {
		transform: translateY(-6px);
		box-shadow: 0 30px 60px -15px var(--shadow-hover);
	}

	/* Media */
	.card-media {
		position: relative;
		aspect-ratio: 16 / 9;
		background: var(--blue-100);
		overflow: hidden;
		isolation: isolate;
	}

	.hero-media {
		aspect-ratio: 16 / 10;
	}

	.card-media img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		opacity: 0;
		transition: opacity 0.5s ease, transform 0.6s ease;
		will-change: opacity;
	}

	.card-media img.active {
		opacity: 1;
	}

	.project-card:hover .card-media img.active {
		transform: scale(1.02);
	}

	/* Badge */
	.card-badge {
		position: absolute;
		top: 0.75rem;
		right: 0.75rem;
		z-index: 3;
		padding: 0.25rem 0.7rem;
		font-size: 0.68rem;
		font-weight: 600;
		letter-spacing: 0.03em;
		text-transform: uppercase;
		background: rgba(255, 255, 255, 0.92);
		color: var(--blue-700);
		border-radius: 999px;
		backdrop-filter: blur(8px);
		pointer-events: none;
	}
	:global(html.dark) .card-badge {
		background: rgba(30, 41, 59, 0.92);
		color: var(--blue-400);
	}

	/* Dots */
	.dots {
		position: absolute;
		bottom: 0.75rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 3;
		display: flex;
		gap: 0.4rem;
	}

	.dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		border: none;
		background: rgba(255, 255, 255, 0.5);
		cursor: pointer;
		transition:
			background 0.2s ease,
			transform 0.2s ease;
		padding: 0;
		backdrop-filter: blur(4px);
	}

	.dot:hover {
		background: rgba(255, 255, 255, 0.8);
	}

	.dot.active {
		background: #fff;
		transform: scale(1.3);
	}

	/* Spotlight */
	.spotlight {
		position: absolute;
		inset: 0;
		z-index: 2;
		pointer-events: none;
		transition: opacity 0.2s ease;
		opacity: 0;
		mix-blend-mode: screen;
	}

	.project-card.hovered .spotlight {
		opacity: 1;
	}

	/* Body */
	.card-body {
		padding: 1.25rem 1.5rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		flex: 1;
	}

	.hero-body {
		padding: 2rem;
	}

	.card-header {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 0.25rem;
	}

	.card-title {
		font-size: 1.15rem;
		font-weight: 650;
		color: var(--text);
		line-height: 1.3;
		margin: 0;
	}

	.hero-body .card-title {
		font-size: 1.5rem;
	}

	.card-desc {
		font-size: 0.9rem;
		line-height: 1.6;
		color: var(--text-muted);
		margin: 0;
	}

	.hero-body .card-desc {
		font-size: 0.95rem;
		line-height: 1.7;
	}

	/* Tags */
	.card-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin-top: auto;
		padding-top: 0.5rem;
	}

	.tag {
		font-size: 0.72rem;
		font-weight: 500;
		padding: 0.25rem 0.65rem;
		border-radius: 999px;
		background: var(--tag-bg);
		color: var(--blue-700);
		border: 1px solid var(--border-light);
	}
	:global(html.dark) .tag {
		color: var(--blue-400);
	}

	/* Actions */
	.card-actions {
		display: flex;
		gap: 0.75rem;
		align-items: center;
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px solid var(--border-light);
	}

	.card-cta {
		padding: 0.6rem 1.1rem;
		font-size: 0.85rem;
		font-weight: 600;
		border-radius: 999px;
		border: none;
		background: var(--blue-700);
		color: #fff;
		cursor: pointer;
		transition:
			background 0.2s ease,
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.card-cta:hover {
		background: var(--blue-500);
		transform: translateY(-1px);
		box-shadow: 0 6px 14px -4px var(--shadow-hover);
	}

	.card-link {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--text-muted);
		text-decoration: none;
		transition: color 0.2s ease;
		margin-left: auto;
	}

	.card-link:hover {
		color: var(--blue-700);
	}

	.card-link svg {
		transition: transform 0.2s ease;
	}

	.card-link:hover svg {
		transform: translate(2px, -2px);
	}

	/* Responsive */
	@media (min-width: 900px) {
		.project-card.hero {
			grid-template-columns: 1.2fr 1fr;
			grid-template-rows: 1fr;
		}

		.hero-media {
			aspect-ratio: auto;
			height: 100%;
			min-height: 380px;
		}

		.hero-body {
			justify-content: space-between;
		}
	}

	@media (max-width: 600px) {
		.card-body {
			padding: 1rem 1.15rem 1.25rem;
		}

		.hero-body {
			padding: 1.5rem;
		}

		.hero-body .card-title {
			font-size: 1.25rem;
		}
	}
</style>
