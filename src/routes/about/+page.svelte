<script lang="ts">
	import { journey } from '$lib/data';
	import HorizontalTimeline from '$lib/components/HorizontalTimeline.svelte';
	import ScrollIndicator from '$lib/components/ScrollIndicator.svelte';
	import ScrollBack from '$lib/components/ScrollBack.svelte';

	let progress = $state(0);
	let hasUnlocked = $state(false);

	$effect(() => {
		if (progress >= 0.95) {
			hasUnlocked = true;
		}
	});
</script>

<ScrollBack prevRoute="/" prevLabel="Home" />

<div class="page">
	<a href="/" class="back">&larr; Back to home</a>

	<header class="intro">
		<span class="kicker">About</span>
		<h1 class="heading">How I got here</h1>
		<p class="lead">
			I'm a full stack engineer based in Jogja. This is the whole path — from the first lecture
			hall to the systems I'm shipping right now.
		</p>
	</header>
</div>

<HorizontalTimeline items={journey} bind:progress />

<ScrollIndicator nextRoute="/projects" nextLabel="Projects" kicker="Next" unlocked={hasUnlocked} />

<style>
	.page {
		position: relative;
		z-index: 1;
		max-width: 820px;
		margin: 0 auto;
		padding: 8rem 1.5rem 2rem;
	}

	.back {
		display: block;
		font-size: 0.875rem;
		color: var(--text-muted);
		text-decoration: none;
		width: fit-content;
		transition: color 0.2s;
		margin-bottom: 3rem;
	}
	.back:hover {
		color: var(--blue-700);
	}

	.intro {
		margin-bottom: 4.5rem;
		max-width: 640px;
		padding: 2.5rem;
		background: var(--glass-bg);
		backdrop-filter: blur(14px) saturate(1.4);
		-webkit-backdrop-filter: blur(14px) saturate(1.4);
		border-radius: 16px;
		border: 1px solid var(--border-light);
		box-shadow: var(--shadow-aceternity);
	}

	.kicker {
		display: block;
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--blue-700);
		margin-bottom: 0.75rem;
	}
	:global(html.dark) .kicker {
		color: var(--blue-400);
	}

	.heading {
		font-family: 'Instrument Serif', Georgia, serif;
		font-size: clamp(2.5rem, 6vw, 4rem);
		font-weight: 400;
		letter-spacing: -1.5px;
		line-height: 1.05;
		color: var(--text);
		margin: 0 0 1.25rem;
	}

	.lead {
		font-size: clamp(1rem, 1.4vw, 1.15rem);
		line-height: 1.75;
		color: var(--text-muted);
		margin: 0;
	}

	@media (max-width: 600px) {
		.page {
			padding: 6rem 1.25rem 1rem;
		}
		.intro {
			margin-bottom: 3rem;
		}
	}
</style>
