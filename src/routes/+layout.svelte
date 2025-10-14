<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/stores';

	// Hide normal header/footer on admin routes
	$: isAdminRoute = $page.url.pathname.startsWith('/admin');
</script>

<svelte:head>
	<link rel="icon" href="/SikhaidFavicon.png" />
	<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
</svelte:head>

<!-- Subtle Paper Texture Background -->

{#if !isAdminRoute}
<div class="paper-texture-bg"></div>
	<Header />
{/if}

<slot />

{#if !isAdminRoute}
	<Footer />
{/if}
