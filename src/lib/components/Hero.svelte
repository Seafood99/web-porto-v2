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
			I'm a full stack engineer currently based in Bekasi. I build and ship production web apps
			with
			<span class="inline-tech">
				<span class="tech-icon svelte" aria-hidden="true"></span>
				<span class="tech-text">SvelteKit</span>
			</span>,
			<span class="inline-tech">
				<span class="tech-icon laravel" aria-hidden="true"></span>
				<span class="tech-text">Laravel</span>
			</span>, and
			<span class="inline-tech">
				<span class="tech-icon gcp" aria-hidden="true"></span>
				<span class="tech-text">GCP</span>
			</span>.
		</p>
		<div class="hero-cta" class:show={mounted}>
			<a href="/about" class="btn-primary">My Journey</a>
			<a href="/projects" class="btn-secondary">Selected Work</a>
		</div>
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

	.inline-tech {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		vertical-align: middle;
		padding: 0.15rem 0.45rem;
		border-radius: 6px;
		background: var(--tag-bg);
		border: 1px solid var(--border-light);
		color: var(--text);
		font-weight: 600;
		font-size: 0.95em;
		box-shadow: 0 1px 2px rgba(44, 94, 173, 0.05);
	}

	.tech-icon {
		display: inline-block;
		width: 15px;
		height: 15px;
		background-color: var(--icon-color);
		-webkit-mask-image: var(--icon-url);
		mask-image: var(--icon-url);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-position: center;
		mask-position: center;
		-webkit-mask-size: contain;
		mask-size: contain;
		flex-shrink: 0;
	}

	.tech-icon.svelte {
		--icon-url: url('/assets/tech/svelte.svg');
		--icon-color: #ff3e00;
	}

	.tech-icon.laravel {
		--icon-url: url('/assets/tech/laravel.svg');
		--icon-color: #ff2d20;
	}

	.tech-icon.gcp {
		--icon-url: url('/assets/tech/googlecloud.svg');
		--icon-color: #4285f4;
	}

	.hero-cta {
		display: flex;
		gap: 0.75rem;
		margin-top: 2rem;
		flex-wrap: wrap;
		justify-content: center;
		opacity: 0;
		transform: translateY(6px);
		transition:
			opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.hero-cta.show {
		opacity: 1;
		transform: translateY(0);
		transition-delay: 0.5s;
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		padding: 0.65rem 1.5rem;
		background: var(--blue-700);
		color: #fff;
		border-radius: 9999px;
		font-size: 0.9rem;
		font-weight: 600;
		text-decoration: none;
		transition:
			background 0.2s ease,
			transform 0.2s ease;
	}
	.btn-primary:hover {
		background: var(--blue-500);
		transform: translateY(-2px);
	}

	.btn-secondary {
		display: inline-flex;
		align-items: center;
		padding: 0.65rem 1.5rem;
		background: var(--btn-secondary-bg);
		color: var(--blue-700);
		border: 1px solid var(--border);
		border-radius: 9999px;
		font-size: 0.9rem;
		font-weight: 600;
		text-decoration: none;
		transition:
			background 0.2s ease,
			transform 0.2s ease,
			border-color 0.2s ease;
	}
	.btn-secondary:hover {
		border-color: var(--blue-500);
		transform: translateY(-2px);
	}
	:global(html.dark) .btn-secondary {
		color: var(--blue-400);
	}

	@media (min-width: 768px) {
		.title-row {
			flex-direction: row;
			gap: 0.75rem;
			margin-bottom: 2rem;
		}
	}

	@media (max-width: 480px) {
		.hero-content {
			padding: 5rem 1.25rem 3rem;
		}
	}
</style>
