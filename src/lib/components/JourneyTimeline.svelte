<script lang="ts">
	import { onMount } from 'svelte';
	import type { JourneyItem } from '$lib/data';

	let { items }: { items: JourneyItem[] } = $props();

	let listEl: HTMLElement | undefined = $state();

	/** 0..1 — seberapa jauh garis sudah "digambar" */
	let drawn = $state(0);
	/** index item yang markernya sudah dilewati garis */
	let reached = $state(-1);

	function update() {
		if (!listEl) return;

		const rect = listEl.getBoundingClientRect();
		// Titik acuan: 55% tinggi viewport. Garis tumbuh sampai titik ini.
		const line = window.innerHeight * 0.55;
		const raw = (line - rect.top) / rect.height;
		drawn = Math.min(Math.max(raw, 0), 1);

		const markers = listEl.querySelectorAll<HTMLElement>('.marker');
		let last = -1;
		markers.forEach((m, i) => {
			if (m.getBoundingClientRect().top <= line) last = i;
		});
		reached = last;
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

		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll, { passive: true });
		update();

		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	});
</script>

<ol class="journey" bind:this={listEl} style="--drawn: {drawn}">
	<div class="rail" aria-hidden="true">
		<span class="rail-fill"></span>
	</div>

	{#each items as item, i}
		<li class="entry" class:lit={i <= reached}>
			<span class="marker" class:work={item.kind === 'work'}></span>

			<div class="card">
				<span class="kind">{item.kind === 'work' ? 'Work' : 'Education'}</span>
				<h3 class="title">
					{item.title}
					{#if item.active}<span class="badge">Now</span>{/if}
				</h3>
				<span class="org">{item.org}</span>
				<span class="date">{item.date}</span>
				<p class="desc">{item.desc}</p>
			</div>
		</li>
	{/each}
</ol>

<style>
	.journey {
		position: relative;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	/* Garis: track abu + fill biru yang tingginya ikut --drawn */
	.rail {
		position: absolute;
		left: 1.25rem;
		top: 0.6rem;
		bottom: 0.6rem;
		width: 2px;
		background: var(--border);
		border-radius: 2px;
	}
	.rail-fill {
		position: absolute;
		inset: 0 0 auto 0;
		height: calc(var(--drawn, 0) * 100%);
		background: linear-gradient(to bottom, var(--blue-700), var(--blue-400));
		border-radius: 2px;
	}

	.entry {
		position: relative;
		padding-left: 4rem;
		padding-bottom: 3rem;
	}
	.entry:last-child {
		padding-bottom: 0;
	}

	.marker {
		position: absolute;
		left: 0.8rem;
		top: 0.5rem;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: var(--bg);
		border: 2px solid var(--border);
		transition:
			border-color 0.4s ease,
			background 0.4s ease,
			box-shadow 0.4s ease;
	}
	.entry.lit .marker {
		border-color: var(--blue-500);
		background: var(--blue-500);
		box-shadow: 0 0 0 4px var(--blue-100);
	}

	.card {
		background: var(--bg-card);
		border: 1px solid var(--border-light);
		border-radius: 12px;
		padding: 1.5rem;
		opacity: 0.45;
		transform: translateY(10px);
		transition:
			opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
			border-color 0.3s ease,
			box-shadow 0.3s ease;
	}
	.entry.lit .card {
		opacity: 1;
		transform: translateY(0);
	}
	.card:hover {
		border-color: var(--blue-500);
		box-shadow: var(--shadow-aceternity);
	}

	.kind {
		display: inline-block;
		font-size: 0.65rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: var(--blue-700);
		margin-bottom: 0.6rem;
	}

	.title {
		font-size: 1.05rem;
		font-weight: 600;
		line-height: 1.35;
		color: var(--text);
		margin: 0 0 0.4rem;
	}

	.badge {
		display: inline-block;
		vertical-align: middle;
		font-size: 0.65rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		background: var(--blue-100);
		color: var(--blue-700);
		border-radius: 4px;
		padding: 0.2rem 0.5rem;
		margin-left: 0.5rem;
	}

	.org {
		display: block;
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--blue-700);
	}

	.date {
		display: block;
		font-size: 0.8rem;
		color: var(--text-muted);
		margin: 0.3rem 0 0.85rem;
	}

	.desc {
		font-size: 0.93rem;
		line-height: 1.65;
		color: var(--text-muted);
		margin: 0;
	}

	@media (prefers-reduced-motion: reduce) {
		.card {
			opacity: 1;
			transform: none;
			transition: none;
		}
		.marker {
			transition: none;
		}
	}

	@media (max-width: 600px) {
		.rail {
			left: 0.7rem;
		}
		.entry {
			padding-left: 2.75rem;
			padding-bottom: 2rem;
		}
		.marker {
			left: 0.25rem;
			width: 11px;
			height: 11px;
		}
		.card {
			padding: 1.25rem;
		}
	}
</style>
