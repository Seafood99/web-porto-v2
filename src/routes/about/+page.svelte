<script lang="ts">
	import { journey } from '$lib/data';
	import DrumScroll from '$lib/components/DrumScroll.svelte';
	import ScrollIndicator from '$lib/components/ScrollIndicator.svelte';
	import ScrollBack from '$lib/components/ScrollBack.svelte';

	// Short, drum-friendly role names, in the same order as `journey`.
	const chapterNames = [
		'Informatics degree',
		'Frontend bootcamp',
		'Cloud cohort',
		'Nutrify landing page',
		'Lab instructor',
		'Fan platform',
		'Event platform',
		'E-commerce build',
		'Dormitory system',
		'Company profile'
	];

	const chapters = journey.map((item, i) => ({
		name: chapterNames[i] ?? item.title,
		kind: item.kind,
		org: item.org,
		date: item.date,
		detail: item.desc,
		active: item.active
	}));
</script>

<ScrollBack prevRoute="/" prevLabel="Home" />

<main class="about">
	<DrumScroll
		items={chapters}
		titleTag="h1"
		eyebrow="Career timeline · 2022 — now"
		titleLines={['How I got here.']}
	/>
</main>

<ScrollIndicator nextRoute="/projects" nextLabel="Projects" kicker="Next" />

<style>
	.about {
		position: relative;
		z-index: 1;
	}

	/* Edge-less scrim, same treatment as the home hero. */
	.about::before {
		content: '';
		position: fixed;
		z-index: -1;
		inset: 0;
		pointer-events: none;
		background: radial-gradient(
			115% 95% at 38% 55%,
			color-mix(in srgb, var(--bg) 88%, transparent) 0%,
			color-mix(in srgb, var(--bg) 82%, transparent) 32%,
			color-mix(in srgb, var(--bg) 62%, transparent) 58%,
			color-mix(in srgb, var(--bg) 28%, transparent) 80%,
			transparent 100%
		);
	}
</style>
