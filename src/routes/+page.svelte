<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Summary from '$lib/components/Summary.svelte';
	import DonateNow from '$lib/components/DonateNow.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Punjab Rains Relief Aid 2025 - Sikh Aid Charitable Trust</title>
	<meta name="description" content="Supporting Punjab's farming communities affected by devastating rains and floods. Your donation provides immediate relief to displaced families in urgent need." />
</svelte:head>

<main class="scroll-smooth">
	<Header />
	<Hero />
	<Summary />
	<DonateNow />
	<Footer />
</main>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
