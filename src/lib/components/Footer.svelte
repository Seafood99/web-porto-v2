<script lang="ts">
	import { socialLinks } from '$lib/data';
</script>

<footer class="site-footer">
	<div class="site-footer__inner">
		<p class="site-footer__text">Shipped from Bekasi.</p>
		<div class="site-footer__socials">
			{#each socialLinks as link}
				<a
					href={link.href}
					target="_blank"
					rel="noopener noreferrer"
					class="social-link"
					aria-label={link.ariaLabel}
				>
					{#if link.name === 'Instagram'}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<rect x="4" y="4" width="16" height="16" rx="4" />
							<circle cx="12" cy="12" r="4" />
							<line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
						</svg>
					{:else if link.name === 'LinkedIn'}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M8 11v5" />
							<path d="M8 8v.01" />
							<path d="M12 16v-5" />
							<path d="M16 16v-3a2 2 0 1 0 -4 0" />
							<path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z" />
						</svg>
					{:else if link.name === 'GitHub'}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path
								d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"
							/>
						</svg>
					{/if}
				</a>
			{/each}
		</div>
	</div>
</footer>

<style>
	.site-footer {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 5;
		width: 100%;
		padding: 0 2rem;
		display: flex;
		justify-content: center;
		background: linear-gradient(
			to top,
			var(--bg) 0%,
			color-mix(in srgb, var(--bg) 92%, transparent) 55%,
			color-mix(in srgb, var(--bg) 70%, transparent) 85%,
			transparent 100%
		);
		pointer-events: none;
		padding-bottom: 1.5rem;
		padding-top: 2.5rem;
	}

	.site-footer__inner {
		width: 100%;
		max-width: 780px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		pointer-events: auto;
	}

	.site-footer__text {
		font-size: 0.8rem;
		color: var(--text);
		letter-spacing: 0.02em;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
	}

	.site-footer__socials {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.social-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: color-mix(in srgb, var(--bg) 80%, transparent);
		color: var(--text);
		transition:
			color 0.2s ease,
			background 0.2s ease;
		backdrop-filter: blur(4px);
	}
	.social-link:hover {
		color: var(--blue-700);
		background: color-mix(in srgb, var(--bg-card) 95%, transparent);
	}
	.social-link svg {
		width: 16px;
		height: 16px;
	}

	@media (max-width: 600px) {
		.site-footer {
			padding: 0 1.25rem;
			padding-bottom: 1.25rem;
			padding-top: 2rem;
		}
		.site-footer__text {
			font-size: 0.75rem;
		}
		.site-footer__socials {
			gap: 0.85rem;
		}
		.social-link {
			width: 32px;
			height: 32px;
		}
		.social-link svg {
			width: 14px;
			height: 14px;
		}
	}
</style>
