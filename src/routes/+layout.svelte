<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<link rel="icon" href="/SikhaidFavicon.png" />
	<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
</svelte:head>

<!-- Subtle Paper Texture Background -->
<div class="paper-texture-bg"></div>

<Header />

<slot />

<Footer />
