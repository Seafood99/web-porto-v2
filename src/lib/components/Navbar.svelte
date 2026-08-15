<script>
	import { onMount } from 'svelte';
	import { theme, toggleTheme } from '$lib/theme.svelte';
	import { slide, fade } from 'svelte/transition';

	let isScrolled = $state(false);
	let isMobile = $state(false);
	let menuOpen = $state(false);
	let scrollProgress = $state(0);

	// Aceternity-style inline dynamic styles
	let navStyle = $derived(`
		box-shadow: ${scrollProgress > 0.1 ? '0 8px 30px var(--shadow)' : 'none'};
		border-radius: ${scrollProgress > 0.1 ? '4rem' : '0rem'};
		width: ${scrollProgress > 0.1 ? '85%' : '100%'};
		max-width: ${scrollProgress > 0.1 ? '56rem' : '100%'};
		transform: ${scrollProgress > 0.1 ? 'translateY(10px)' : 'none'};
		background: ${scrollProgress > 0.1 ? 'var(--nav-bg-scrolled)' : 'transparent'};
		backdrop-filter: ${scrollProgress > 0.1 ? 'blur(12px) saturate(1.8)' : 'none'};
		-webkit-backdrop-filter: ${scrollProgress > 0.1 ? 'blur(12px) saturate(1.8)' : 'none'};
		border: ${scrollProgress > 0.1 ? '1px solid var(--nav-border)' : '1px solid transparent'};
	`);

	let shimmerOpacity = $state(0);
	let shimmerTransform = $state('translateX(-50px) rotate(15deg)');

	function handleNavClick() {
		if (isMobile) menuOpen = false;
	}

	function handleBackdropClick() {
		if (menuOpen) menuOpen = false;
	}

	function updateMobile() {
		isMobile = window.innerWidth <= 768;
		if (!isMobile) menuOpen = false;
	}

	onMount(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;
			const maxScroll = 100;
			scrollProgress = Math.min(scrollY / maxScroll, 1);
			isScrolled = scrollY > 50;
		};

		handleScroll();
		updateMobile();

		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', updateMobile);

		// Avatar shimmer animation
		const shimmerInterval = setInterval(() => {
			shimmerOpacity = 1;
			shimmerTransform = 'translateX(50px) rotate(15deg)';
			setTimeout(() => {
				shimmerOpacity = 0;
				shimmerTransform = 'translateX(-50px) rotate(15deg)';
			}, 1500);
		}, 4000);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', updateMobile);
			clearInterval(shimmerInterval);
		};
	});
</script>

<!-- Desktop Navbar (Aceternity-style: wrapper div + inner nav) -->
<div class="desktop-navbar-wrapper">
	<nav id="navbar" style={navStyle}>
		<a href="/" class="menu-logo" aria-label="Home">
			<div class="menu-avatar">
				<span>M</span>
				<div
					class="menu-avatar-shine"
					style="opacity:{shimmerOpacity};transform:{shimmerTransform};transition:all 1.5s ease-in-out"
				></div>
			</div>
		</a>

		<div class="menu__inner" id="primary-menu">
			<a href="/about" class="nav-link"><span>About</span></a>
			<a href="/projects" class="nav-link"><span>Projects</span></a>
			<a href="/contact" class="nav-link"><span>Contact</span></a>
			<button
				class="mode-toggle"
				type="button"
				aria-label="Toggle dark mode"
				onclick={toggleTheme}
			>
				<svg
					class="icon-sun"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="12" cy="12" r="4" />
					<path
						d="M12 2v2m0 16v2m-10-10h2m16 0h2m-2.93-7.07l-1.41 1.41M5.64 17.66l-1.41 1.41M17.66 5.64l1.41-1.41M6.34 17.66l-1.41 1.41"
					/>
				</svg>
				<svg
					class="icon-moon"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
				</svg>
			</button>
		</div>
	</nav>
</div>

<!-- Mobile Navbar -->
<nav class="mobile-navbar" class:scrolled={isScrolled}>
	<div class="mobile-navbar-inner">
		<a href="/" class="menu-logo">
			<div class="menu-avatar">
				<span>M</span>
			</div>
		</a>
	<button
		class="hamburger"
		class:open={menuOpen}
		type="button"
		aria-label="Toggle menu"
		onclick={() => (menuOpen = !menuOpen)}
	>
		<span></span>
		<span></span>
		<span></span>
	</button>
	</div>
</nav>

<!-- Mobile menu fullscreen overlay (Aceternity-style) -->
{#if menuOpen}
	<div class="mobile-menu-overlay" transition:fade={{ duration: 250 }}>
		<div class="mobile-menu-header">
			<button
				class="hamburger close"
				type="button"
				aria-label="Close menu"
				onclick={() => (menuOpen = false)}
			>
				<span></span>
				<span></span>
			</button>
		</div>
		<div class="mobile-menu-links">
			<a href="/about" class="mobile-link" onclick={handleNavClick}>About</a>
			<a href="/projects" class="mobile-link" onclick={handleNavClick}>Projects</a>
			<a href="/contact" class="mobile-link" onclick={handleNavClick}>Contact</a>
			<button class="mode-toggle-mobile" type="button" aria-label="Toggle dark mode" onclick={toggleTheme}>
				<svg class="icon-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="12" cy="12" r="5" />
					<path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
				</svg>
				<svg class="icon-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
				</svg>
			</button>
		</div>
	</div>
{/if}

<style>
	/* Desktop navbar: Aceternity-style */
	.desktop-navbar-wrapper {
		position: fixed;
		inset: 0 0 auto 0;
		z-index: 50;
		width: 100%;
		display: none;
	}
	@media (min-width: 768px) {
		.desktop-navbar-wrapper {
			display: block;
		}
	}

	#navbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2px;
		padding: 0.5rem 1.5rem;
		margin: 0 auto;
		transition:
			box-shadow 0.6s cubic-bezier(0.22, 1, 0.36, 1),
			border-radius 0.6s cubic-bezier(0.22, 1, 0.36, 1),
			width 0.6s cubic-bezier(0.22, 1, 0.36, 1),
			max-width 0.6s cubic-bezier(0.22, 1, 0.36, 1),
			transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
			background-color 0.6s cubic-bezier(0.22, 1, 0.36, 1),
			backdrop-filter 0.6s cubic-bezier(0.22, 1, 0.36, 1),
			border-color 0.6s cubic-bezier(0.22, 1, 0.36, 1);
	}

	/* Mobile navbar: simple solid */
	.mobile-navbar {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 50;
		width: 100%;
		background: transparent;
		backdrop-filter: none;
		-webkit-backdrop-filter: none;
		border-bottom: 1px solid transparent;
		transition:
			background-color 0.4s ease,
			backdrop-filter 0.4s ease,
			border-color 0.4s ease;
	}
	@media (min-width: 768px) {
		.mobile-navbar {
			display: none;
		}
	}

	.mobile-navbar.scrolled {
		background: var(--glass-bg);
		backdrop-filter: blur(12px) saturate(1.8);
		-webkit-backdrop-filter: blur(12px) saturate(1.8);
		border-bottom: 1px solid var(--border);
	}
	.mobile-navbar-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem 1rem;
	}

	.hamburger {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 40px;
		height: 40px;
		border-radius: 6px;
		background: transparent;
		border: none;
		color: var(--text);
		cursor: pointer;
		transition: background 0.2s;
		position: relative;
		padding: 0;
	}
	.hamburger:hover {
		background: var(--hover-bg);
	}
	.hamburger :global(span) {
		display: block;
		width: 22px;
		height: 2px;
		background: var(--text);
		border-radius: 2px;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}
	.hamburger :global(span):nth-child(1) {
		top: 13px;
	}
	.hamburger :global(span):nth-child(2) {
		top: 19px;
	}
	.hamburger :global(span):nth-child(3) {
		top: 25px;
	}
	.hamburger.open :global(span):nth-child(1) {
		top: 19px;
		transform: translateX(-50%) rotate(45deg);
	}
	.hamburger.open :global(span):nth-child(2) {
		opacity: 0;
		transform: translateX(-50%) scaleX(0);
	}
	.hamburger.open :global(span):nth-child(3) {
		top: 19px;
		transform: translateX(-50%) rotate(-45deg);
	}

	/* Mobile menu fullscreen overlay (Aceternity-style) */
	.mobile-menu-overlay {
		position: fixed;
		inset: 0;
		z-index: 50;
		display: flex;
		flex-direction: column;
		background: var(--bg);
		animation: overlayFadeIn 0.3s ease-out;
	}
	.mobile-menu-header {
		display: flex;
		justify-content: flex-end;
		padding: 0.75rem 1.5rem;
	}
	.mobile-menu-header .hamburger.close {
		width: 40px;
		height: 40px;
		position: relative;
	}
	.mobile-menu-header .hamburger.close :global(span):nth-child(1) {
		top: 50%;
		transform: translateY(-50%) rotate(45deg);
	}
	.mobile-menu-header .hamburger.close :global(span):nth-child(2) {
		top: 50%;
		transform: translateY(-50%) rotate(-45deg);
	}
	.mobile-menu-links {
		display: flex;
		flex-direction: column;
		flex: 1;
		justify-content: center;
		align-items: center;
		padding: 2rem;
		gap: 0.5rem;
	}
	.mobile-link {
		display: block;
		padding: 1.25rem 0;
		color: var(--text);
		text-decoration: none;
		font-size: 1.5rem;
		font-weight: 500;
		transition: opacity 0.2s;
		animation: linkFadeIn 0.4s ease-out both;
		text-align: center;
	}
	.mobile-link:nth-child(1) { animation-delay: 0.05s; }
	.mobile-link:nth-child(2) { animation-delay: 0.1s; }
	.mobile-link:nth-child(3) { animation-delay: 0.15s; }
	.mobile-link:nth-child(4) { animation-delay: 0.2s; }
	.mobile-link:hover {
		opacity: 0.6;
	}
	@keyframes overlayFadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}
	@keyframes linkFadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
			filter: blur(6px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
			filter: blur(0);
		}
	}

	/* Logo & avatar */
	.menu-logo {
		text-decoration: none;
	}
	.menu-avatar {
		position: relative;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		overflow: hidden;
		background: linear-gradient(135deg, var(--blue), var(--blue-2));
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-weight: 600;
	}
	.menu-avatar-shine {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			90deg,
			transparent,
			rgba(255, 255, 255, 0.5),
			transparent
		);
		width: 50%;
		pointer-events: none;
	}

	/* Nav links */
	.menu__inner {
		display: flex;
		align-items: center;
		gap: 4px;
		margin-left: auto;
	}
	.nav-link {
		position: relative;
		padding: 0.5rem 1rem;
		border-radius: 9999px;
		text-decoration: none;
		color: var(--text-muted);
		font-size: 0.875rem;
		transition:
			color 0.3s,
			background-color 0.3s;
	}
	.nav-link span {
		position: relative;
		z-index: 2;
	}
	.nav-link::before {
		content: '';
		position: absolute;
		inset: 4px;
		border-radius: 9999px;
		background: rgba(0, 0, 0, 0.1);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		z-index: 1;
	}
	:global(html.dark) .nav-link::before {
		background: rgba(255, 255, 255, 0.1);
	}
	.nav-link:hover::before {
		transform: scaleX(1);
	}
	.nav-link:hover {
		color: var(--text);
	}

	/* Theme toggle */
	.mode-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
		border-radius: 8px;
		border: none;
		background: transparent;
		color: var(--text-muted);
		cursor: pointer;
		transition: background-color 0.2s, color 0.2s;
	}
	.mode-toggle:hover {
		background: var(--hover-bg);
		color: var(--text);
	}

	.icon-moon {
		display: none;
	}
	:global(html.dark) .icon-sun {
		display: none;
	}
	:global(html.dark) .icon-moon {
		display: block;
	}

	.mode-toggle-mobile {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		margin-top: 1rem;
		background: transparent;
		border: none;
		color: var(--text-muted);
		cursor: pointer;
		transition: opacity 0.2s;
		animation: linkFadeIn 0.4s ease-out both;
		animation-delay: 0.25s;
	}
	.mode-toggle-mobile:hover {
		opacity: 0.6;
	}
	.mode-toggle-mobile svg {
		width: 24px;
		height: 24px;
	}
</style>
