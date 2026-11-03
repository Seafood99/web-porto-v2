<script lang="ts">
	import { onMount } from 'svelte';

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});
</script>

<section class="hero-content" id="home">
	<div class="hero-glass">
		<div class="title-row">
			<h1 id="hero-title" class="hero-title">Dawam Amali</h1>
			<span class="identity-pill" class:show={mounted}>Full Stack Developer</span>
		</div>
		<p class="hero-subtitle" class:show={mounted}>
			I'm a full stack engineer currently based in Jogja. I build and ship production web apps
			with SvelteKit, Laravel, and GCP.
		</p>
	</div>
</section>

<style>
	.hero-content {
		position: relative;
		z-index: 1;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 6rem 2rem 4rem;
		max-width: 780px;
		margin: 0 auto;
	}

	/* Glass backing around hero text so it's readable over the shader */
	.hero-glass {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0;
		padding: 3rem 2.5rem;
		background: var(--glass-bg);
		backdrop-filter: blur(16px) saturate(1.5);
		-webkit-backdrop-filter: blur(16px) saturate(1.5);
		border-radius: 20px;
		border: 1px solid var(--border-light);
		box-shadow: var(--shadow-aceternity);
	}

	.title-row {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.hero-title {
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
		font-size: clamp(2.5rem, 6vw, 4.3rem);
		font-weight: 800;
		letter-spacing: -1.5px;
		line-height: 1;
		color: var(--text);
		text-shadow: 0 1px 2px rgba(255, 255, 255, 0.35);
		margin: 0;
		white-space: nowrap;
	}

	:global(html.dark) .hero-title {
		text-shadow: 0 2px 12px rgba(0, 0, 0, 0.7);
	}

	.identity-pill {
		display: inline-block;
		padding: 0.35rem 0.85rem;
		border-radius: 6px;
		background: var(--bg-card);
		color: var(--text-muted);
		font-size: 0.875rem;
		font-weight: 500;
		line-height: 1.25rem;
		border: 1px solid var(--border-light);
		box-shadow: var(--shadow-aceternity);
		white-space: nowrap;
		opacity: 0;
		filter: blur(8px);
		transform: translateY(6px);
		transition:
			opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
			filter 0.5s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.identity-pill.show {
		opacity: 1;
		filter: blur(0);
		transform: translateY(0);
		transition-delay: 0.15s;
	}

	.hero-subtitle {
		font-size: clamp(0.95rem, 1.5vw, 1.1rem);
		line-height: 1.7;
		color: var(--text-muted);
		max-width: 560px;
		margin: 0 auto;
		opacity: 0;
		filter: blur(8px);
		transform: translateY(6px);
		transition:
			opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
			filter 0.5s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.hero-subtitle.show {
		opacity: 1;
		filter: blur(0);
		transform: translateY(0);
		transition-delay: 0.35s;
	}

	@media (min-width: 640px) {
		.title-row {
			flex-direction: row;
			gap: 0.75rem;
			margin-bottom: 2rem;
		}
	}

	@media (max-width: 600px) {
		.hero-content {
			padding: 5rem 1.25rem 3rem;
		}
	}
</style>
