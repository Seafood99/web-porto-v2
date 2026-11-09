<script lang="ts">
	import { projects, education } from '$lib/data';

	const latestProject = projects[0];
	const [projectName, projectKind] = latestProject.title.split(' — ');
	const study = education[0];
</script>

<section class="hero" id="home" aria-labelledby="hero-title">
	<div class="hero-inner">
		<div class="hero-grid">
			<div class="hero-pitch">
				<h1 id="hero-title" class="hero-title">
					<span class="hero-title__line">Dawam</span>
					<span class="hero-title__line hero-title__line--italic">Amali</span>
				</h1>

				<p class="hero-lede">
					I build and ship production web apps with
					<span class="tech">
						<span class="tech-icon svelte" aria-hidden="true"></span>SvelteKit</span
					>,
					<span class="tech">
						<span class="tech-icon laravel" aria-hidden="true"></span>Laravel</span
					>, and
					<span class="tech"><span class="tech-icon gcp" aria-hidden="true"></span>GCP</span>.
				</p>

				<div class="hero-actions">
					<a class="action-primary" href="/projects">
						View selected work
						<svg
							viewBox="0 0 24 24"
							width="16"
							height="16"
							fill="none"
							stroke="currentColor"
							stroke-width="1.8"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"
						>
							<line x1="5" y1="12" x2="19" y2="12" />
							<polyline points="13 6 19 12 13 18" />
						</svg>
					</a>
					<a class="action-link" href="/about">
						My journey
						<svg
							viewBox="0 0 24 24"
							width="15"
							height="15"
							fill="none"
							stroke="currentColor"
							stroke-width="1.8"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"
						>
							<line x1="5" y1="12" x2="19" y2="12" />
							<polyline points="13 6 19 12 13 18" />
						</svg>
					</a>
				</div>
			</div>

			<aside class="hero-ledger" aria-label="At a glance">
				<dl>
					<div class="ledger-row">
						<dt>Latest project</dt>
						<dd>{projectName}<span>{projectKind}</span></dd>
					</div>
					<div class="ledger-row">
						<dt>Education</dt>
						<dd>{study.school}<span>Informatics · GPA 3.60</span></dd>
					</div>
				</dl>
			</aside>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		z-index: 1;
		width: 100%;
		min-height: 100vh;
		min-height: 100svh;
		display: flex;
		align-items: center;
	}

	.hero-inner {
		width: 100%;
		max-width: 1120px;
		margin: 0 auto;
		padding: 7rem 2rem 8rem;
	}

	/* Edge-less scrim: keeps the shader visible while giving the type a calm field. */
	.hero::before {
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

	.hero-grid {
		width: 100%;
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(190px, 250px);
		gap: 5rem;
		align-items: end;
	}

	.hero-title {
		margin: 0 0 1.75rem;
		font-family: 'Instrument Serif', Georgia, serif;
		font-weight: 400;
		font-size: clamp(3.5rem, 9.5vw, 7.5rem);
		line-height: 0.88;
		letter-spacing: -0.035em;
		color: var(--text);
	}

	.hero-title__line {
		display: block;
	}

	.hero-title__line--italic {
		font-style: italic;
		padding-left: 0.08em;
	}

	.hero-lede {
		margin: 0 0 2.5rem;
		max-width: 46ch;
		font-size: clamp(1rem, 1.4vw, 1.16rem);
		line-height: 1.7;
		color: var(--text-muted);
	}

	.tech {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		color: var(--text);
		font-weight: 600;
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

	.hero-actions {
		display: flex;
		align-items: center;
		gap: 1.75rem;
		flex-wrap: wrap;
	}

	.action-primary {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		min-height: 48px;
		padding: 0.6rem 1.6rem;
		border-radius: 999px;
		background: var(--blue-700);
		color: #fff;
		font-size: 0.92rem;
		font-weight: 600;
		text-decoration: none;
		transition:
			background-color 0.25s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.action-primary svg {
		transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.action-primary:hover {
		background: var(--blue-500);
		transform: translateY(-1px);
	}

	.action-primary:hover svg {
		transform: translateX(3px);
	}

	.action-primary:focus-visible {
		outline: 2px solid var(--blue-500);
		outline-offset: 3px;
	}

	.action-link {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		min-height: 44px;
		padding-bottom: 2px;
		color: var(--text);
		font-size: 0.92rem;
		font-weight: 500;
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.action-link::after {
		content: '';
		position: absolute;
		inset: auto 0 0 0;
		height: 1px;
		background: var(--blue-500);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.action-link svg {
		transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.action-link:hover,
	.action-link:focus-visible {
		color: var(--blue-700);
	}

	.action-link:hover::after,
	.action-link:focus-visible::after {
		transform: scaleX(1);
	}

	.action-link:hover svg {
		transform: translateX(3px);
	}

	.action-primary:active {
		transform: translateY(0) scale(0.99);
	}

	.action-link:active {
		color: var(--blue-700);
	}

	:global(html.dark) .action-link:hover {
		color: var(--blue-400);
	}

	.action-link:focus-visible {
		outline: 2px solid var(--blue-500);
		outline-offset: 4px;
		border-radius: 2px;
	}

	.hero-ledger {
		padding-top: 1.25rem;
		border-top: 1px solid var(--border);
	}

	.hero-ledger dl {
		display: flex;
		flex-direction: column;
		gap: 1.15rem;
		margin: 0;
	}

	.ledger-row {
		display: flex;
		flex-direction: column;
		gap: 0.28rem;
	}

	.ledger-row dt {
		font-size: 0.64rem;
		font-weight: 600;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--text-muted);
	}

	.ledger-row dd {
		margin: 0;
		font-size: 0.92rem;
		font-weight: 500;
		line-height: 1.4;
		color: var(--text);
	}

	.ledger-row dd span {
		display: block;
		margin-top: 0.15rem;
		font-size: 0.8rem;
		font-weight: 400;
		color: var(--text-muted);
	}

	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(16px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		.hero-title,
		.hero-lede,
		.hero-actions,
		.hero-ledger {
			animation: rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
		}

		.hero-title {
			animation-delay: 0.06s;
		}
		.hero-lede {
			animation-delay: 0.14s;
		}
		.hero-actions {
			animation-delay: 0.22s;
		}
		.hero-ledger {
			animation-delay: 0.3s;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.action-primary,
		.action-primary svg,
		.action-link,
		.action-link::after,
		.action-link svg {
			transition: none;
		}
	}

	@media (max-width: 900px) {
		.hero-inner {
			padding: 6.5rem 1.75rem 7.5rem;
		}

		.hero::before {
			inset: 0;
			background: radial-gradient(
				90% 78% at 50% 52%,
				color-mix(in srgb, var(--bg) 90%, transparent) 0%,
				color-mix(in srgb, var(--bg) 84%, transparent) 44%,
				color-mix(in srgb, var(--bg) 64%, transparent) 64%,
				color-mix(in srgb, var(--bg) 30%, transparent) 84%,
				transparent 100%
			);
		}

		.hero-grid {
			grid-template-columns: minmax(0, 1fr);
			gap: 3rem;
			align-items: start;
		}

		.hero-ledger {
			max-width: 340px;
		}
	}

	@media (max-width: 480px) {
		.hero-inner {
			padding: 5.5rem 1.25rem 7rem;
		}

		.hero-title {
			font-size: clamp(3.25rem, 17vw, 4.75rem);
		}

		.hero-actions {
			gap: 1.25rem;
		}
	}
</style>
