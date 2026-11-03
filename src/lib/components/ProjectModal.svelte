<script lang="ts">
	import type { Project } from '$lib/data';
	import TechStack from '$lib/components/TechStack.svelte';
	import { onMount } from 'svelte';

	let {
		project,
		onClose
	}: {
		project: Project;
		onClose: () => void;
	} = $props();

	let images = $derived(
		project.images.length > 0
			? project.images
			: ['https://placehold.co/1200x720/e2eff8/2c5ead?text=' + encodeURIComponent(project.title)]
	);

	let imageIndex = $state(0);
	let isOpen = $state(false);

	function nextImage() {
		imageIndex = (imageIndex + 1) % images.length;
	}

	function prevImage() {
		imageIndex = (imageIndex - 1 + images.length) % images.length;
	}

	function goToImage(i: number) {
		imageIndex = i;
	}

	function handleClose() {
		isOpen = false;
		setTimeout(onClose, 280); // wait for animation
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') handleClose();
		if (e.key === 'ArrowRight') nextImage();
		if (e.key === 'ArrowLeft') prevImage();

		// Focus trap
		if (e.key === 'Tab') {
			const modalEl = document.querySelector<HTMLElement>('.modal');
			if (!modalEl) return;
			const focusable = modalEl.querySelectorAll<HTMLElement>(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			);
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (e.shiftKey) {
				if (document.activeElement === first) {
					e.preventDefault();
					last.focus();
				}
			} else {
				if (document.activeElement === last) {
					e.preventDefault();
					first.focus();
				}
			}
		}
	}

	function handleBackdropClick(e: MouseEvent) {
		if ((e.target as HTMLElement).dataset.backdrop) handleClose();
	}

	onMount(() => {
		// Trigger open animation + focus close button
		requestAnimationFrame(() => {
			isOpen = true;
			requestAnimationFrame(() => {
				const closeBtn = document.querySelector<HTMLButtonElement>('.close-btn');
				closeBtn?.focus();
			});
		});
		window.addEventListener('keydown', handleKeydown);
		document.body.style.overflow = 'hidden';

		let timer: ReturnType<typeof setInterval> | null = null;
		if (images.length > 1) {
			timer = setInterval(nextImage, 4000);
		}

		return () => {
			window.removeEventListener('keydown', handleKeydown);
			document.body.style.overflow = '';
			if (timer) clearInterval(timer);
		};
	});

	let isExternal = $derived(project.link.startsWith('http'));
	let linkTarget = $derived(isExternal ? '_blank' : undefined);
	let linkRel = $derived(isExternal ? 'noopener noreferrer' : undefined);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="modal-backdrop"
	class:open={isOpen}
	onclick={handleBackdropClick}
	data-backdrop="true"
	role="dialog"
	aria-modal="true"
	aria-labelledby="modal-title"
	tabindex="-1"
>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="modal" class:open={isOpen} onclick={(e) => e.stopPropagation()}>
		<button class="close-btn" onclick={handleClose} aria-label="Close modal">
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<line x1="18" y1="6" x2="6" y2="18" />
				<line x1="6" y1="6" x2="18" y2="18" />
			</svg>
		</button>

		<div class="modal-gallery">
			{#each images as img, i}
				<img
					src={img}
					alt={project.title}
					class:active={i === imageIndex}
					draggable="false"
				/>
			{/each}

			{#if images.length > 1}
				<button class="nav-btn prev" onclick={prevImage} aria-label="Previous image">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<polyline points="15 18 9 12 15 6" />
					</svg>
				</button>
				<button class="nav-btn next" onclick={nextImage} aria-label="Next image">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<polyline points="9 18 15 12 9 6" />
					</svg>
				</button>

				<div class="dots">
					{#each images as _, i}
						<button
							class="dot"
							class:active={i === imageIndex}
							onclick={() => goToImage(i)}
							aria-label="Go to image {i + 1}"
						></button>
					{/each}
				</div>

				<div class="counter">{imageIndex + 1} / {images.length}</div>
			{/if}
		</div>

		<div class="modal-content">
			<div class="modal-header">
				<span class="modal-badge">{project.linkLabel}</span>
				<h2 id="modal-title" class="modal-title">{project.title}</h2>
			</div>

			<TechStack tags={project.tags} />

			<p class="modal-case">{project.caseStudy}</p>

			<div class="modal-actions">
				<a
					href={project.link}
					class="modal-cta primary"
					target={linkTarget}
					rel={linkRel}
				>
					{project.linkLabel}
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M7 17l9.2-9.2M17 17V7H7" />
					</svg>
				</a>
				<a href="/projects/{project.slug}/" class="modal-cta secondary">
					Read full case study
				</a>
				<button class="modal-cta secondary" onclick={handleClose}>
					Close
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	.modal-backdrop {
		position: fixed;
		inset: 0;
		z-index: 100;
		background: rgba(15, 23, 42, 0.7);
		backdrop-filter: blur(8px);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.5rem;
		opacity: 0;
		transition: opacity 0.28s ease;
		overflow-y: auto;
	}
	.modal-backdrop.open {
		opacity: 1;
	}

	:global(html.dark) .modal-backdrop {
		background: rgba(0, 0, 0, 0.8);
	}

	.modal {
		position: relative;
		width: 100%;
		max-width: 960px;
		max-height: 90vh;
		background: var(--bg-card);
		border-radius: 18px;
		overflow-y: auto;
		overflow-x: hidden;
		box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.4);
		transform: translateY(12px) scale(0.98);
		opacity: 0;
		transition:
			transform 0.32s cubic-bezier(0.16, 1, 0.3, 1),
			opacity 0.28s ease;
		scrollbar-width: thin;
		scrollbar-color: var(--blue-500) transparent;
	}

	.modal.open {
		transform: translateY(0) scale(1);
		opacity: 1;
	}

	.modal::-webkit-scrollbar {
		width: 8px;
	}
	.modal::-webkit-scrollbar-track {
		background: transparent;
	}
	.modal::-webkit-scrollbar-thumb {
		background: var(--blue-400);
		border-radius: 999px;
	}

	.close-btn {
		position: sticky;
		top: 1rem;
		float: right;
		margin-right: 1rem;
		z-index: 10;
		width: 38px;
		height: 38px;
		border-radius: 50%;
		border: none;
		background: rgba(255, 255, 255, 0.92);
		color: var(--text);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition:
			background 0.2s ease,
			transform 0.2s ease;
		backdrop-filter: blur(8px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	:global(html.dark) .close-btn {
		background: rgba(30, 41, 59, 0.92);
	}

	.close-btn:hover {
		background: var(--blue-700);
		color: #fff;
		transform: rotate(90deg);
	}

	/* Gallery */
	.modal-gallery {
		position: relative;
		aspect-ratio: 16 / 10;
		background: var(--blue-100);
		overflow: hidden;
		isolation: isolate;
	}

	.modal-gallery img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0;
		transition: opacity 0.5s ease;
		user-select: none;
	}

	.modal-gallery img.active {
		opacity: 1;
	}

	.nav-btn {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: 3;
		width: 42px;
		height: 42px;
		border-radius: 50%;
		border: none;
		background: rgba(255, 255, 255, 0.92);
		color: var(--text);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition:
			background 0.2s ease,
			transform 0.2s ease;
		backdrop-filter: blur(6px);
	}

	.nav-btn:hover {
		background: #fff;
		transform: translateY(-50%) scale(1.1);
	}

	:global(html.dark) .nav-btn {
		background: rgba(30, 41, 59, 0.92);
	}
	:global(html.dark) .nav-btn:hover {
		background: rgba(30, 41, 59, 1);
	}

	.nav-btn.prev {
		left: 1rem;
	}
	.nav-btn.next {
		right: 1rem;
	}

	.dots {
		position: absolute;
		bottom: 1rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 3;
		display: flex;
		gap: 0.5rem;
		padding: 0.5rem 0.85rem;
		background: rgba(0, 0, 0, 0.35);
		border-radius: 999px;
		backdrop-filter: blur(8px);
	}

	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		border: none;
		background: rgba(255, 255, 255, 0.45);
		cursor: pointer;
		padding: 0;
		position: relative;
		transition:
			background 0.2s ease,
			transform 0.2s ease;
	}

	.dot::before {
		content: '';
		position: absolute;
		inset: -18px;
	}

	.dot:hover {
		background: rgba(255, 255, 255, 0.75);
	}

	.dot.active {
		background: #fff;
		transform: scale(1.3);
	}

	.counter {
		position: absolute;
		top: 1rem;
		left: 1rem;
		z-index: 3;
		padding: 0.25rem 0.7rem;
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.03em;
		background: rgba(0, 0, 0, 0.5);
		color: #fff;
		border-radius: 999px;
		backdrop-filter: blur(6px);
	}

	/* Content */
	.modal-content {
		padding: 2rem 2.5rem 2.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.modal-header {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.modal-badge {
		width: fit-content;
		padding: 0.35rem 0.85rem;
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		background: var(--tag-bg);
		color: var(--blue-700);
		border: 1px solid var(--border);
		border-radius: 999px;
		box-shadow: 0 1px 3px rgba(44, 94, 173, 0.06);
	}
	
	:global(html.dark) .modal-badge {
		color: var(--blue-400);
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
	}

	.modal-title {
		font-family: 'Instrument Serif', Georgia, serif;
		font-size: clamp(1.5rem, 3vw, 2rem);
		font-weight: 400;
		letter-spacing: -0.5px;
		color: var(--text);
		line-height: 1.2;
		margin: 0;
	}



	.modal-case {
		font-size: 0.95rem;
		line-height: 1.75;
		color: var(--text-muted);
		margin: 0;
		white-space: pre-line;
	}

	.modal-actions {
		display: flex;
		gap: 0.75rem;
		align-items: center;
		flex-wrap: wrap;
		margin-top: 1rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--border-light);
	}

	.modal-cta {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.7rem 1.3rem;
		font-size: 0.875rem;
		font-weight: 600;
		border-radius: 999px;
		cursor: pointer;
		text-decoration: none;
		transition:
			transform 0.2s ease,
			background 0.2s ease,
			box-shadow 0.2s ease;
		border: none;
	}

	.modal-cta.primary {
		background: var(--blue-700);
		color: #fff;
		box-shadow: 0 4px 12px -2px var(--shadow-hover);
	}

	.modal-cta.primary:hover {
		background: var(--blue-500);
		transform: translateY(-1px);
		box-shadow: 0 8px 20px -4px var(--shadow-hover);
	}

	.modal-cta.secondary {
		background: transparent;
		color: var(--text-muted);
		border: 1px solid var(--border-light);
	}

	.modal-cta.secondary:hover {
		background: var(--tag-bg);
		color: var(--text);
	}

	.modal-cta svg {
		transition: transform 0.2s ease;
	}

	.modal-cta.primary:hover svg {
		transform: translate(2px, -2px);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.modal {
			border-radius: 0;
			max-height: 100vh;
		}

		.modal-content {
			padding: 1.5rem 1.25rem;
		}

		.modal-title {
			font-size: 1.35rem;
		}

		.modal-case {
			font-size: 0.9rem;
		}

		.nav-btn {
			width: 36px;
			height: 36px;
		}

		.nav-btn.prev {
			left: 0.5rem;
		}
		.nav-btn.next {
			right: 0.5rem;
		}

		.close-btn {
			top: 0.75rem;
			margin-right: 0.75rem;
		}
	}
</style>
