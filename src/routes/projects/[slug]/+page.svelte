<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import ScrollBack from '$lib/components/ScrollBack.svelte';
	import TechStack from '$lib/components/TechStack.svelte';

	let { data }: { data: PageData } = $props();

	let project = $derived(data.project);

	function getShortTitle(title: string): string {
		return title.split('—')[0].trim();
	}

	let projectName = $derived(getShortTitle(project.title));
	let projectRole = $derived(project.title.split('—')[1]?.trim() ?? '');

	let images = $derived(
		project.images.length > 0
			? project.images
			: [
					'https://placehold.co/1200x720/e2eff8/2c5ead?text=' +
						encodeURIComponent(projectName)
				]
	);

	let imageIndex = $state(0);

	// SvelteKit me-reuse komponen ini saat berpindah antar /projects/[slug],
	// jadi galeri harus di-reset setiap slug berganti.
	$effect(() => {
		project.slug;
		imageIndex = 0;
	});

	function nextImage() {
		imageIndex = (imageIndex + 1) % images.length;
	}

	function prevImage() {
		imageIndex = (imageIndex - 1 + images.length) % images.length;
	}

	function goToImage(i: number) {
		imageIndex = i;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowRight') nextImage();
		if (e.key === 'ArrowLeft') prevImage();
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);

		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	});

	let isExternal = $derived(project.link.startsWith('http'));
	let ctaLabel = $derived(
		project.linkLabel === 'Private' ? 'Inquire about this project' : project.linkLabel
	);
</script>

<svelte:head>
	<title>{project.title} — Dawam Amali</title>
	<meta name="description" content={project.desc} />
</svelte:head>

<ScrollBack prevRoute="/projects/" prevLabel="Projects" />

<div class="page">
	<a href="/projects/" class="back">&larr; Back to projects</a>

	<header class="head">
		<span class="kicker">{project.linkLabel}</span>
		<h1 class="heading">{projectName}</h1>
		{#if projectRole}
			<p class="role">{projectRole}</p>
		{/if}
		<p class="sub">{project.desc}</p>
	</header>

	<figure class="gallery">
		{#each images as img, i}
			<img
				src={img}
				alt="{project.title} — screenshot {i + 1}"
				class:active={i === imageIndex}
				draggable="false"
			/>
		{/each}

		{#if images.length > 1}
			<button class="nav-btn prev" onclick={prevImage} aria-label="Previous image">
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<polyline points="15 18 9 12 15 6" />
				</svg>
			</button>
			<button class="nav-btn next" onclick={nextImage} aria-label="Next image">
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<polyline points="9 18 15 12 9 6" />
				</svg>
			</button>

			<div class="dots">
				{#each images as _, i}
					<button
						class="dot"
						class:active={i === imageIndex}
						onclick={() => goToImage(i)}
						aria-label="Go to image {i + 1}"
					></button>
				{/each}
			</div>

			<div class="counter">{imageIndex + 1} / {images.length}</div>
		{/if}
	</figure>

	<div class="body">
		<TechStack tags={project.tags} />

		<p class="case">{project.caseStudy}</p>

		<div class="actions">
			<a
				href={project.link}
				class="cta"
				target={isExternal ? '_blank' : undefined}
				rel={isExternal ? 'noopener noreferrer' : undefined}
			>
				{ctaLabel}
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M7 17l9.2-9.2M17 17V7H7" />
				</svg>
			</a>
			{#if project.secondaryLink}
				<a
					href={project.secondaryLink}
					class="cta secondary"
					target="_blank"
					rel="noopener noreferrer"
				>
					{project.secondaryLinkLabel ?? 'Secondary Link'}
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M7 17l9.2-9.2M17 17V7H7" />
					</svg>
				</a>
			{/if}
		</div>
	</div>

	<nav class="pager" aria-label="Project navigation">
		{#if data.previous}
			<a href="/projects/{data.previous.slug}/" class="pager-link">
				<span class="pager-kicker">&larr; Previous</span>
				<span class="pager-name">{getShortTitle(data.previous.title)}</span>
			</a>
		{:else}
			<span></span>
		{/if}

		{#if data.next}
			<a href="/projects/{data.next.slug}/" class="pager-link align-right">
				<span class="pager-kicker">Next &rarr;</span>
				<span class="pager-name">{getShortTitle(data.next.title)}</span>
			</a>
		{/if}
	</nav>
</div>

<style>
	.page {
		position: relative;
		z-index: 1;
		max-width: 900px;
		margin: 0 auto;
		padding: 8rem 2rem 5rem;
	}

	.back {
		display: block;
		width: fit-content;
		font-size: 0.875rem;
		color: var(--text-muted);
		text-decoration: none;
		transition: color 0.2s;
		margin-bottom: 3rem;
	}
	.back:hover {
		color: var(--blue-700);
	}

	.head {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-bottom: 2.5rem;
		padding: 2rem 2.5rem;
		background: var(--glass-bg);
		backdrop-filter: blur(14px) saturate(1.4);
		-webkit-backdrop-filter: blur(14px) saturate(1.4);
		border-radius: 16px;
		border: 1px solid var(--border-light);
		box-shadow: var(--shadow-aceternity);
	}

	.kicker {
		width: fit-content;
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--blue-700);
		padding: 0.35rem 0.85rem;
		border: 1px solid var(--border);
		border-radius: 999px;
		background: var(--tag-bg);
		box-shadow: 0 1px 3px rgba(44, 94, 173, 0.06);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
	}
	:global(html.dark) .kicker {
		color: var(--blue-400);
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
	}

	.heading {
		font-family: 'Instrument Serif', Georgia, serif;
		font-size: clamp(2.25rem, 5vw, 3.5rem);
		font-weight: 400;
		letter-spacing: -1.5px;
		line-height: 1.05;
		color: var(--text);
		margin: 0;
		text-wrap: balance;
	}

	.role {
		font-size: 0.95rem;
		font-weight: 500;
		color: var(--blue-700);
		margin: 0;
	}
	:global(html.dark) .role {
		color: var(--blue-400);
	}

	.sub {
		font-size: clamp(1rem, 1.2vw, 1.1rem);
		line-height: 1.65;
		color: var(--text-muted);
		margin: 0;
		max-width: 620px;
	}

	/* Gallery */
	.gallery {
		position: relative;
		aspect-ratio: 16 / 10;
		margin: 0 0 2.5rem;
		background: var(--blue-100);
		border: 1px solid var(--border-light);
		border-radius: 16px;
		overflow: hidden;
		isolation: isolate;
		box-shadow: var(--shadow-aceternity);
	}

	.gallery img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0;
		transition: opacity 0.5s ease;
		user-select: none;
	}

	.gallery img.active {
		opacity: 1;
	}

	.nav-btn {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: 3;
		width: 42px;
		height: 42px;
		border-radius: 50%;
		border: none;
		background: rgba(255, 255, 255, 0.92);
		color: var(--text);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition:
			background 0.2s ease,
			transform 0.2s ease;
		backdrop-filter: blur(6px);
	}
	.nav-btn:hover {
		background: #fff;
		transform: translateY(-50%) scale(1.1);
	}
	.nav-btn.prev {
		left: 1rem;
	}
	.nav-btn.next {
		right: 1rem;
	}
	:global(html.dark) .nav-btn {
		background: rgba(30, 41, 59, 0.92);
	}
	:global(html.dark) .nav-btn:hover {
		background: rgba(30, 41, 59, 1);
	}

	.dots {
		position: absolute;
		bottom: 1rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 3;
		display: flex;
		gap: 0.5rem;
		padding: 0.5rem 0.85rem;
		background: rgba(0, 0, 0, 0.35);
		border-radius: 999px;
		backdrop-filter: blur(8px);
	}

	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		border: none;
		background: rgba(255, 255, 255, 0.45);
		cursor: pointer;
		padding: 0;
		position: relative;
		transition:
			background 0.2s ease,
			transform 0.2s ease;
	}
	.dot::before {
		content: '';
		position: absolute;
		inset: -18px;
	}
	.dot:hover {
		background: rgba(255, 255, 255, 0.75);
	}
	.dot.active {
		background: #fff;
		transform: scale(1.3);
	}

	.counter {
		position: absolute;
		top: 1rem;
		left: 1rem;
		z-index: 3;
		padding: 0.25rem 0.7rem;
		font-size: 0.72rem;
		font-weight: 600;
		background: rgba(0, 0, 0, 0.5);
		color: #fff;
		border-radius: 999px;
		backdrop-filter: blur(6px);
	}

	/* Body */
	.body {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.case {
		font-size: 1rem;
		line-height: 1.8;
		color: var(--text-muted);
		margin: 0;
		white-space: pre-line;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--border-light);
	}

	.cta {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.75rem 1.4rem;
		font-size: 0.9rem;
		font-weight: 600;
		border-radius: 999px;
		background: var(--blue-700);
		color: #fff;
		text-decoration: none;
		box-shadow: 0 4px 12px -2px var(--shadow-hover);
		transition:
			background 0.2s ease,
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}
	.cta:hover {
		background: var(--blue-500);
		transform: translateY(-2px);
		box-shadow: 0 8px 20px -4px var(--shadow-hover);
	}
	.cta svg {
		transition: transform 0.2s ease;
	}
	.cta:hover svg {
		transform: translate(2px, -2px);
	}

	.cta.secondary {
		background: transparent;
		color: var(--blue-700);
		border: 1px solid var(--border);
		box-shadow: none;
	}
	.cta.secondary:hover {
		background: var(--tag-bg);
		border-color: var(--blue-500);
	}
	:global(html.dark) .cta.secondary {
		color: var(--blue-400);
	}

	/* Pager */
	.pager {
		display: flex;
		justify-content: space-between;
		gap: 1.5rem;
		margin-top: 4rem;
		padding-top: 2rem;
		border-top: 1px solid var(--border-light);
	}

	.pager-link {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		max-width: 45%;
		padding: 0.9rem 1.4rem;
		border-radius: 14px;
		background: var(--tag-bg);
		border: 1px solid var(--border);
		box-shadow: 0 2px 8px var(--shadow);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		text-decoration: none;
		transition:
			transform 0.2s ease,
			background 0.2s ease,
			border-color 0.2s ease,
			box-shadow 0.2s ease;
	}
	.pager-link:hover {
		transform: translateY(-2px);
		background: var(--bg-card);
		border-color: var(--blue-500);
		box-shadow: 0 6px 16px -2px var(--shadow-hover);
	}
	.pager-link.align-right {
		text-align: right;
		margin-left: auto;
	}

	.pager-kicker {
		font-size: 0.72rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--blue-700);
	}
	:global(html.dark) .pager-kicker {
		color: var(--blue-400);
	}

	.pager-name {
		font-family: 'Instrument Serif', Georgia, serif;
		font-size: 1.35rem;
		font-style: italic;
		line-height: 1.2;
		color: var(--text);
	}

	@media (max-width: 768px) {
		.page {
			padding: 6rem 1.25rem 3.5rem;
		}

		.back {
			margin-bottom: 2rem;
		}

		.head {
			margin-bottom: 2rem;
		}

		.nav-btn {
			width: 36px;
			height: 36px;
		}
		.nav-btn.prev {
			left: 0.5rem;
		}
		.nav-btn.next {
			right: 0.5rem;
		}

		.case {
			font-size: 0.95rem;
		}

		.pager {
			margin-top: 3rem;
		}
		.pager-link {
			max-width: 48%;
		}
		.pager-name {
			font-size: 1.1rem;
		}
	}
</style>
