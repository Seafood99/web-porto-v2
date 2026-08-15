<script lang="ts">
	import { socialLinks } from '$lib/data';
</script>

<div class="page">
	<a href="/projects" class="back">&larr; Back to projects</a>
	
	<header class="hero-section">
		<h1 class="heading">Get in Touch</h1>
		<p class="sub">Let's build something impactful. Drop a message or connect via:</p>
	</header>

	<nav class="social-links" role="list">
		{#each socialLinks as link}
			<a class="link-card" href={link.href} aria-label={link.ariaLabel} target="_blank" rel="noopener noreferrer">
				<span class="link-name">{link.name}</span>
			</a>
		{/each}
	</nav>
</div>

<style>
	.page {
		position: relative;
		z-index: 1;
		max-width: 920px;
		margin: 0 auto;
		padding: 8rem 1.5rem 6rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.back {
		font-size: 0.875rem;
		color: var(--text-muted);
		text-decoration: none;
		width: fit-content;
		transition: color 0.2s;
		margin-bottom: 2.5rem;
	}
	.back:hover {
		color: var(--blue-700);
	}

	.hero-section {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1rem;
	}

	.heading {
		font-family: 'Instrument Serif', Georgia, serif;
		font-size: clamp(2.5rem, 6vw, 4rem);
		font-weight: 400;
		letter-spacing: -1.5px;
		line-height: 1.05;
		color: var(--text);
		margin: 0;
	}

	.sub {
		font-size: clamp(1rem, 1.3vw, 1.15rem);
		line-height: 1.7;
		color: var(--text-muted);
		margin: 0;
	}

	.social-links {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		list-style: none;
		padding: 0;
		margin: 2rem 0 0;
	}

	.link-card {
		display: block;
		background: var(--bg-card);
		border: 1px solid var(--border-light);
		border-radius: 12px;
		padding: 1.5rem;
		text-decoration: none;
		color: inherit;
		transition:
			border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
			box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.link-card:hover {
		border-color: var(--blue-500);
		transform: translateY(-4px);
		box-shadow: var(--shadow-aceternity);
	}

	.link-name {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text);
	}
</style>
