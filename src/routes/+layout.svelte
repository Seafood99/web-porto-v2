<script lang="ts">
	import '../app.css';
	import { initTheme } from '$lib/theme.svelte';
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import ShaderBackground from '$lib/components/ShaderBackground.svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	onMount(initTheme);
</script>

<ShaderBackground />
<Navbar />

{@render children()}
