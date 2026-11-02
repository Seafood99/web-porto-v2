<script lang="ts">
	import { techRegistry, type TechKey } from '$lib/tech';

	let { tags }: { tags: TechKey[] } = $props();
</script>

<ul class="tech-stack" role="list" aria-label="Tech stack">
	{#each tags as key (key)}
		{@const tech = techRegistry[key]}
		<li class="chip" title={tech.label}>
			{#if tech.icon}
				<span
					class="chip-icon"
					style="--icon: url('{tech.icon}'); --brand-color: {tech.color ?? 'var(--blue-700)'}; --brand-color-dark: {tech.darkColor ?? tech.color ?? 'var(--blue-400)'};"
					aria-hidden="true"
				></span>
			{/if}
			<span class="chip-label">{tech.label}</span>
		</li>
	{/each}
</ul>

<style>
	.tech-stack {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.chip {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		font-size: 0.8rem;
		font-weight: 500;
		line-height: 1;
		padding: 0.4rem 0.75rem;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.85);
		border: 1px solid var(--border);
		color: var(--text);
		box-shadow: 0 1px 3px rgba(44, 94, 173, 0.06);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		transition:
			background 0.2s ease,
			border-color 0.2s ease,
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	:global(html.dark) .chip {
		background: rgba(30, 41, 59, 0.85);
		border: 1px solid rgba(255, 255, 255, 0.12);
		color: var(--text);
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
	}

	.chip:hover {
		background: var(--bg-card);
		border-color: var(--blue-500);
		transform: translateY(-1px);
		box-shadow: 0 3px 8px var(--shadow-hover);
	}

	/*
	 * Ikon dirender sebagai mask, bukan <img>: SVG yang dimuat lewat <img> adalah dokumen
	 * terpisah sehingga `currentColor` di dalamnya jatuh ke hitam.
	 * Dengan mask, bentuk ikon mengambil warna dari `background-color`.
	 */
	.chip-icon {
		flex-shrink: 0;
		width: 15px;
		height: 15px;
		background-color: var(--brand-color, var(--blue-700));
		-webkit-mask-image: var(--icon);
		mask-image: var(--icon);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-position: center;
		mask-position: center;
		-webkit-mask-size: contain;
		mask-size: contain;
	}

	:global(html.dark) .chip-icon {
		background-color: var(--brand-color-dark, var(--brand-color, var(--blue-400)));
	}

	.chip-label {
		letter-spacing: -0.01em;
	}
</style>
