<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ScrollIndicator from '$lib/components/ScrollIndicator.svelte';
</script>

<div class="home">
	<Hero />
	<Footer />
	<ScrollIndicator nextRoute="/about" nextLabel="About" />
</div>

<style>
	.home {
		position: relative;
		min-height: 100vh;
	}
</style>
