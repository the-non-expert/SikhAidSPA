<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<link rel="icon" href="/SikhaidFavicon.png" />
	<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
</svelte:head>

<Header />

<slot />

<Footer />
