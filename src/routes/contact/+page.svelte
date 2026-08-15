<script lang="ts">
	import { socialLinks } from '$lib/data';
	import ScrollIndicator from '$lib/components/ScrollIndicator.svelte';
	import ScrollBack from '$lib/components/ScrollBack.svelte';

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let emailError = $state('');
	let isSubmitting = $state(false);
	let isSuccess = $state(false);

	// Enforce alphabetical character and space entry only in real-time
	function handleNameInput(e: Event) {
		const target = e.target as HTMLInputElement;
		name = target.value.replace(/[^a-zA-Z\s]/g, '');
	}

	function handleEmailInput(e: Event) {
		const target = e.target as HTMLInputElement;
		email = target.value;
		if (email && !email.toLowerCase().endsWith('@gmail.com')) {
			emailError = 'Only @gmail.com addresses are allowed.';
		} else {
			emailError = '';
		}
	}

	// Helper to sanitize input strings
	function sanitizeInput(str: string): string {
		// Strip HTML tags to prevent XSS
		const noHtml = str.replace(/<[^>]*>/g, '');
		// Strip newlines/carriage returns from single-line fields to prevent header injection
		return noHtml.replace(/[\r\n]/g, '').trim();
	}

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		if (!email.toLowerCase().endsWith('@gmail.com')) {
			emailError = 'Only @gmail.com addresses are allowed.';
			return;
		}

		isSubmitting = true;

		// Security: sanitize name, email, and strip HTML from message
		const cleanName = sanitizeInput(name);
		const cleanEmail = sanitizeInput(email);
		const cleanMessage = message.replace(/<[^>]*>/g, '').trim(); // Preserve linebreaks in message but strip HTML

		const mailtoSubject = encodeURIComponent(`Inquiry from ${cleanName}`);
		const mailtoBody = encodeURIComponent(`Hi Dawam,\n\n${cleanMessage}\n\nBest regards,\n${cleanName}\nEmail: ${cleanEmail}`);

		setTimeout(() => {
			isSubmitting = false;
			isSuccess = true;
			window.location.href = `mailto:muhammadawamali@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
		}, 600);
	}
</script>

<ScrollBack prevRoute="/projects" prevLabel="Projects" />

<div class="page">
	<a href="/projects" class="back">&larr; Back to projects</a>
	
	<div class="contact-grid">
		<div class="contact-info">
			<header class="hero-section">
				<span class="kicker">Contact</span>
				<h1 class="heading">Get in Touch</h1>
				<p class="sub">Let's build something impactful. Drop a message or connect via social links.</p>
			</header>

			<nav class="social-links" role="list">
				{#each socialLinks as link}
					<a class="link-card" href={link.href} aria-label={link.ariaLabel} target="_blank" rel="noopener noreferrer">
						<span class="link-name">{link.name}</span>
						<span class="link-arrow">&rarr;</span>
					</a>
				{/each}
			</nav>
		</div>

		<div class="form-container">
			<form class="contact-form" onsubmit={handleSubmit}>
				<div class="form-group">
					<label for="name" class="form-label">Name</label>
					<input
						type="text"
						id="name"
						bind:value={name}
						oninput={handleNameInput}
						placeholder="Your name (letters only)"
						required
						class="form-input"
					/>
				</div>

				<div class="form-group">
					<label for="email" class="form-label">Email</label>
					<input
						type="email"
						id="email"
						bind:value={email}
						oninput={handleEmailInput}
						placeholder="your.email@gmail.com"
						required
						class="form-input"
						class:error={emailError}
					/>
					{#if emailError}
						<span class="error-msg">{emailError}</span>
					{/if}
				</div>

				<div class="form-group">
					<label for="message" class="form-label">Message</label>
					<textarea
						id="message"
						bind:value={message}
						placeholder="Write your message here..."
						rows="6"
						required
						class="form-input textarea"
					></textarea>
				</div>

				<button type="submit" class="btn-primary" disabled={isSubmitting || !!emailError}>
					{#if isSubmitting}
						Redirecting to mail client...
					{:else if isSuccess}
						Success! Check Mail Client
					{:else}
						Send Message
					{/if}
				</button>
			</form>
		</div>
	</div>

	<ScrollIndicator nextRoute="/" nextLabel="Home" kicker="Back to Start" />
</div>

<style>
	.page {
		position: relative;
		z-index: 1;
		max-width: 1200px;
		margin: 0 auto;
		padding: 8rem 2rem 0;
	}

	.back {
		font-size: 0.875rem;
		color: var(--text-muted);
		text-decoration: none;
		width: fit-content;
		transition: color 0.2s;
		margin-bottom: 3rem;
		display: block;
	}
	.back:hover {
		color: var(--blue-700);
	}

	.contact-grid {
		display: grid;
		grid-template-columns: 1.1fr 1fr;
		gap: 5rem;
		align-items: start;
		margin-bottom: 4rem;
	}

	.contact-info {
		display: flex;
		flex-direction: column;
		gap: 3rem;
	}

	.hero-section {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.75rem;
	}

	.kicker {
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--blue-700);
	}
	:global(html.dark) .kicker {
		color: var(--blue-400);
	}

	.heading {
		font-family: 'Instrument Serif', Georgia, serif;
		font-size: clamp(2.5rem, 5vw, 4.2rem);
		font-weight: 400;
		letter-spacing: -1.5px;
		line-height: 1.05;
		color: var(--text);
		margin: 0;
	}

	.sub {
		font-size: clamp(1rem, 1.2vw, 1.1rem);
		line-height: 1.65;
		color: var(--text-muted);
		margin: 0;
		max-width: 480px;
	}

	.social-links {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.link-card {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: var(--bg-card);
		border: 1px solid var(--border-light);
		border-radius: 12px;
		padding: 1.25rem 1.5rem;
		text-decoration: none;
		color: inherit;
		transition:
			border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
			box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.link-card:hover {
		border-color: var(--blue-500);
		transform: translateY(-2px);
		box-shadow: var(--shadow-aceternity);
	}

	.link-name {
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--text);
	}

	.link-arrow {
		color: var(--blue-700);
		transition: transform 0.3s ease;
	}
	.link-card:hover .link-arrow {
		transform: translateX(4px);
		color: var(--blue-500);
	}

	/* Form */
	.form-container {
		background: var(--bg-card);
		border: 1px solid var(--border-light);
		border-radius: 16px;
		padding: 2.5rem;
		box-shadow: var(--shadow-aceternity);
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.form-label {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--text-muted);
	}

	.form-input {
		font-family: inherit;
		font-size: 0.95rem;
		background: var(--input-bg);
		border: 1px solid var(--input-border);
		border-radius: 8px;
		padding: 0.85rem 1rem;
		color: var(--text);
		transition:
			border-color 0.2s ease,
			box-shadow 0.2s ease;
		width: 100%;
	}
	.form-input::placeholder {
		color: var(--text-muted);
		opacity: 0.45;
	}
	.form-input:focus {
		border-color: var(--blue-700);
		box-shadow: 0 0 0 4px var(--blue-100);
		outline: none;
	}
	:global(html.dark) .form-input:focus {
		box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
	}

	.form-input.error {
		border-color: #ef4444;
	}
	.form-input.error:focus {
		border-color: #ef4444;
		box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.15);
	}
	.error-msg {
		font-size: 0.75rem;
		color: #ef4444;
		margin-top: 0.25rem;
		font-weight: 500;
	}

	.textarea {
		resize: vertical;
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: var(--blue-700);
		color: #ffffff;
		border: none;
		border-radius: 9999px;
		padding: 1rem 2rem;
		font-size: 0.95rem;
		font-weight: 600;
		cursor: pointer;
		transition:
			background 0.3s ease,
			transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
			box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
		box-shadow: 0 4px 12px var(--shadow);
		width: 100%;
		margin-top: 1rem;
	}
	.btn-primary:hover {
		background: var(--blue-500);
		transform: translateY(-2px);
		box-shadow: 0 6px 16px rgba(21, 145, 220, 0.25);
	}
	.btn-primary:active {
		transform: translateY(0);
	}
	.btn-primary:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	@media (max-width: 900px) {
		.contact-grid {
			grid-template-columns: 1fr;
			gap: 4rem;
		}

		.form-container {
			padding: 2rem;
		}
	}

	@media (max-width: 768px) {
		.page {
			padding: 6rem 1.25rem 0;
		}

		.back {
			margin-bottom: 2rem;
		}
	}
</style>
