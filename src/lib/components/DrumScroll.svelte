<script lang="ts">
	import { onMount } from 'svelte';

	interface DrumItem {
		name: string;
		kind?: string;
		org: string;
		date: string;
		detail: string;
		active?: boolean;
	}

	let {
		items,
		eyebrow = 'The path',
		titleTag = 'h2',
		titleLines = ['Every station.', 'One line.'],
		lede = '',
		hold = 2.8
	}: {
		items: DrumItem[];
		eyebrow?: string;
		titleTag?: string;
		titleLines?: string[];
		lede?: string;
		hold?: number;
	} = $props();

	const titleId = 'drum-title';

	let sceneEl: HTMLElement | undefined = $state();
	let stageEl: HTMLElement | undefined = $state();

	let progress = $state(0);
	let reduced = $state(false);

	// Geometry, remeasured on mount/resize.
	let geo = $state({ fs: 64, r: 294, step: 12.7, persp: 735, y: 504 });

	const total = $derived(items.length);
	const drumP = $derived(Math.min(1, progress / 0.82));
	const sel = $derived(
		Math.min(total - 1, Math.max(0, Math.round(drumP * (total - 1))))
	);
	const turn = $derived(drumP * (total - 1) * geo.step);

	// The head leads the drum on load, then hands the screen over as the drum turns.
	const headOpacity = $derived(Math.max(0, Math.min(1, 1 - drumP / 0.16)));
	const headShift = $derived((1 - headOpacity) * -36);

	function itemOpacity(i: number): number {
		const a = Math.abs(turn - i * geo.step);
		return Math.max(0, 1 - a / 92);
	}

	function measure() {
		if (!stageEl) return;
		const w = stageEl.clientWidth;
		const h = stageEl.clientHeight;
		const fs = Math.max(30, Math.min(w * 0.082, h * 0.11, 72));
		const r = fs * 4.6;
		const step = (2 * Math.asin(Math.min(0.92, (fs * 1.12) / (2 * r))) * 180) / Math.PI;
		geo = { fs, r, step, persp: r * 2.5, y: h * 0.56 };
	}

	function update() {
		if (!sceneEl) return;
		const rect = sceneEl.getBoundingClientRect();
		const scrollable = sceneEl.offsetHeight - window.innerHeight;
		if (scrollable <= 0) {
			progress = 0;
			return;
		}
		progress = Math.min(1, Math.max(0, -rect.top / scrollable));
	}

	onMount(() => {
		reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		measure();
		update();

		let ticking = false;
		const onScroll = () => {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(() => {
				update();
				ticking = false;
			});
		};
		const onResize = () => {
			measure();
			update();
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onResize, { passive: true });

		let ro: ResizeObserver | undefined;
		if (typeof ResizeObserver !== 'undefined' && stageEl) {
			ro = new ResizeObserver(() => {
				measure();
				update();
			});
			ro.observe(stageEl);
		}

		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onResize);
			ro?.disconnect();
		};
	});
</script>

{#snippet head()}
	<header
		class="drum-head"
		style={reduced
			? ''
			: `opacity:${headOpacity};transform:translateX(-50%) translateY(${headShift}px)`}
	>
		<p class="kicker">{eyebrow}</p>
		<svelte:element this={titleTag} class="drum-title" id={titleId}>
			{#each titleLines as line, i}
				<span class:italic={i === titleLines.length - 1}>{line}</span>
			{/each}
		</svelte:element>
		{#if lede}
			<p class="drum-lede">{lede}</p>
		{/if}
	</header>
{/snippet}

<section
	class="scene"
	class:is-static={reduced}
	style={`--hold:${hold};--drum-fs:${geo.fs}px;--drum-r:${geo.r}px;--drum-persp:${geo.persp}px;--drum-step:${geo.step}deg;--drum-y:${geo.y}px`}
	aria-labelledby={titleId}
	bind:this={sceneEl}
>
	<div class="scene-stage" bind:this={stageEl}>
		{@render head()}

		{#if reduced}
			<h2 class="sr-only">Chapters</h2>
			<ol class="static-list">
				{#each items as item, i}
					<li class="static-item">
						<span class="static-no">{String(i + 1).padStart(2, '0')}</span>
						<div class="static-copy">
							<h3>{item.name}</h3>
							<p class="static-meta">{item.org} · {item.date}</p>
							<p class="static-detail">{item.detail}</p>
						</div>
					</li>
				{/each}
			</ol>
		{:else}
			<div class="drum-window" aria-hidden="true">
				<span class="drum-glow"></span>
				<span class="drum-rule drum-rule--top"></span>
				<span class="drum-rule drum-rule--bottom"></span>
				<span class="drum-pointer drum-pointer--left"></span>
				<span class="drum-pointer drum-pointer--right"></span>
			</div>

			<div class="drum-view" aria-hidden="true">
				<ol
					class="drum"
					style={`--drum-turn:${turn}deg`}
				>
					{#each items as item, i}
						<li
							class="drum-item"
							style={`--i:${i};--drum-o:${itemOpacity(i)};--drum-lit:${i === sel ? 1 : 0}`}
						>
							<span class="drum-name">{item.name}</span>
						</li>
					{/each}
				</ol>
			</div>

			<div class="drum-readout" aria-hidden="true">
				<p class="drum-count">
					<span class="drum-count-now">{String(sel + 1).padStart(2, '0')}</span>
					<span class="drum-count-of"> / {String(total).padStart(2, '0')}</span>
				</p>
				<div class="drum-context">
					<p class="drum-when">
						<span class="drum-kind">{items[sel]?.kind ?? ''}</span>
						<span class="drum-date">{items[sel]?.date ?? ''}</span>
					</p>
					<p class="drum-org">{items[sel]?.org ?? ''}</p>
					<p class="drum-desc">{items[sel]?.detail ?? ''}</p>
				</div>
			</div>

			<div class="sr-only">
				<h2>Chapters</h2>
				<ol>
					{#each items as item}
						<li>
							<p>{item.name}</p>
							<p>{item.org} · {item.date}</p>
							<p>{item.detail}</p>
						</li>
					{/each}
				</ol>
			</div>
		{/if}
	</div>
</section>

<style>
	.scene {
		--gutter: clamp(16px, 4vw, 56px);
		position: relative;
		z-index: 1;
		height: calc((var(--hold, 2.8) + 1) * 100svh);
	}

	.scene-stage {
		position: sticky;
		top: 0;
		height: 100svh;
		overflow: clip;
	}

	/* ─── Head ───────────────────────────────────────────────────────── */

	.drum-head {
		position: absolute;
		top: 12svh;
		left: 50%;
		transform: translateX(-50%);
		width: min(720px, calc(100% - 2 * var(--gutter)));
		z-index: 3;
		text-align: center;
	}

	.kicker {
		display: inline-block;
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--blue-700);
		margin: 0 0 0.9rem;
	}
	:global(html.dark) .kicker {
		color: var(--blue-400);
	}

	.drum-title {
		font-family: 'Instrument Serif', Georgia, serif;
		font-weight: 400;
		font-size: clamp(1.9rem, 4vw, 3.3rem);
		line-height: 1.02;
		letter-spacing: -0.02em;
		color: var(--text);
		margin: 0;
	}
	.drum-title span {
		display: block;
	}
	.drum-title .italic {
		font-style: italic;
		padding-left: 0.05em;
	}

	.drum-lede {
		margin: 1rem auto 0;
		max-width: 36rem;
		font-size: clamp(0.95rem, 1.2vw, 1.05rem);
		line-height: 1.6;
		color: var(--text-muted);
	}

	/* ─── Drum ───────────────────────────────────────────────────────── */

	.drum-view {
		position: absolute;
		inset: 0;
		perspective: var(--drum-persp, 900px);
		perspective-origin: 50% var(--drum-y, 50%);
		pointer-events: none;
		-webkit-mask-image: linear-gradient(
			to bottom,
			transparent 0%,
			#000 8%,
			#000 92%,
			transparent 100%
		);
		mask-image: linear-gradient(
			to bottom,
			transparent 0%,
			#000 8%,
			#000 92%,
			transparent 100%
		);
	}

	.drum {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: calc(var(--drum-y, 50%) * 2);
		margin: 0;
		padding: 0;
		list-style: none;
		transform-style: preserve-3d;
		transform: translateZ(calc(var(--drum-r, 300px) * -1)) rotateX(var(--drum-turn, 0deg));
		will-change: transform;
	}

	.drum-item {
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		margin-top: -0.54em;
		height: 1.08em;
		line-height: 1.05;
		font-family: 'Instrument Serif', Georgia, serif;
		font-size: var(--drum-fs, 64px);
		letter-spacing: -0.02em;
		white-space: nowrap;
		text-align: center;
		transform: rotateX(calc(var(--i, 0) * var(--drum-step, 13deg) * -1))
			translateZ(var(--drum-r, 300px));
		opacity: var(--drum-o, 0);
		backface-visibility: hidden;
	}

	.drum-name {
		display: inline-block;
		color: color-mix(in srgb, var(--blue-700) calc(var(--drum-lit, 0) * 100%), var(--text));
		transition: color 0.25s ease;
	}

	.drum-window {
		position: absolute;
		left: 0;
		right: 0;
		top: var(--drum-y, 50%);
		height: 0;
		z-index: 1;
		pointer-events: none;
	}

	.drum-glow {
		position: absolute;
		left: 50%;
		top: 0;
		width: min(1100px, 100vw);
		height: calc(var(--drum-fs, 64px) * 3);
		margin-left: calc(min(1100px, 100vw) / -2);
		margin-top: calc(var(--drum-fs, 64px) * -1.5);
		transform: scale(0.85, 0.45);
		background: radial-gradient(
			closest-side,
			color-mix(in srgb, var(--blue-400) 16%, transparent),
			transparent 100%
		);
	}

	.drum-rule {
		position: absolute;
		left: var(--gutter);
		right: var(--gutter);
		height: 1px;
		background: color-mix(in srgb, var(--text) 12%, transparent);
	}

	.drum-rule--top {
		top: calc(var(--drum-fs, 64px) * -0.68);
	}
	.drum-rule--bottom {
		top: calc(var(--drum-fs, 64px) * 0.68);
	}

	.drum-pointer {
		position: absolute;
		top: -7px;
		width: 9px;
		height: 14px;
		background: var(--blue-700);
	}
	.drum-pointer--left {
		left: max(8px, calc(var(--gutter) - 24px));
		clip-path: polygon(0 0, 100% 50%, 0 100%);
	}
	.drum-pointer--right {
		right: max(8px, calc(var(--gutter) - 24px));
		clip-path: polygon(100% 0, 0 50%, 100% 100%);
	}

	.drum-readout {
		position: absolute;
		left: var(--gutter);
		right: var(--gutter);
		bottom: 4svh;
		z-index: 2;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: clamp(1rem, 4vw, 2.5rem);
	}

	.drum-count {
		flex: none;
		margin: 0;
		font-size: clamp(14px, 1.5vw, 20px);
		font-weight: 500;
		line-height: 1;
		color: var(--text-muted);
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}
	.drum-count-now {
		color: var(--blue-700);
		font-weight: 600;
	}
	:global(html.dark) .drum-count-now {
		color: var(--blue-400);
	}

	.drum-context {
		display: grid;
		justify-items: end;
		gap: 0.18rem;
		max-width: min(46rem, 64%);
		text-align: right;
	}

	.drum-when {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		align-items: baseline;
		gap: 0.2rem 0.55rem;
		margin: 0;
		font-size: 0.74rem;
		letter-spacing: 0.03em;
		color: var(--text-muted);
	}
	.drum-kind {
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--blue-700);
	}
	:global(html.dark) .drum-kind {
		color: var(--blue-400);
	}

	.drum-org {
		margin: 0;
		font-size: clamp(0.92rem, 1.15vw, 1.02rem);
		line-height: 1.3;
		color: var(--text);
	}

	.drum-desc {
		margin: 0.1rem 0 0;
		max-width: 58ch;
		font-size: clamp(0.78rem, 0.95vw, 0.88rem);
		line-height: 1.5;
		color: var(--text-muted);
	}

	/* ─── Static (reduced motion) ────────────────────────────────────── */

	.scene.is-static {
		height: auto;
	}
	.scene.is-static .scene-stage {
		position: relative;
		height: auto;
		overflow: visible;
		padding: 7rem 1.5rem 4rem;
	}
	.scene.is-static .drum-head {
		position: static;
		transform: none;
		width: min(720px, 100%);
		margin: 0 auto 3rem;
	}

	.static-list {
		display: grid;
		gap: 1rem;
		max-width: 720px;
		margin: 0 auto;
		padding: 0;
		list-style: none;
	}

	.static-item {
		display: grid;
		grid-template-columns: 2.2rem minmax(0, 1fr);
		column-gap: 0.75rem;
		padding: 1.2rem 1.4rem;
		background: var(--bg-card);
		border: 1px solid var(--border-light);
		border-radius: 14px;
	}

	.static-no {
		grid-row: 1 / span 3;
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--blue-700);
		font-variant-numeric: tabular-nums;
	}
	:global(html.dark) .static-no {
		color: var(--blue-400);
	}

	.static-copy h3 {
		margin: 0;
		font-family: 'Instrument Serif', Georgia, serif;
		font-size: 1.3rem;
		font-weight: 400;
		line-height: 1.2;
		color: var(--text);
	}
	.static-meta {
		margin: 0.2rem 0 0;
		font-size: 0.82rem;
		color: var(--blue-700);
	}
	:global(html.dark) .static-meta {
		color: var(--blue-400);
	}
	.static-detail {
		margin: 0.5rem 0 0;
		font-size: 0.9rem;
		line-height: 1.6;
		color: var(--text-muted);
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	@media (max-width: 767px) {
		.drum-head {
			top: 12svh;
		}
		.drum-title {
			font-size: clamp(1.75rem, 8vw, 2.25rem);
		}
		.drum-lede {
			font-size: 0.92rem;
		}
		.drum-readout {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.45rem;
			bottom: 3svh;
		}
		.drum-context {
			justify-items: start;
			max-width: 100%;
			text-align: left;
		}
		.drum-when {
			justify-content: flex-start;
		}
		.drum-desc {
			display: -webkit-box;
			line-clamp: 2;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}
		.drum-pointer {
			display: none;
		}
	}
</style>
