<script lang="ts">
	import { page } from '$app/stores';

	let isMenuOpen = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}

	// Check if current page matches the link
	function isActivePage(href: string): boolean {
		if (href === '/') {
			return $page.url.pathname === '/';
		}
		return $page.url.pathname.startsWith(href);
	}
</script>

<header class="bg-white text-navy py-4 px-4 fixed w-full top-0 z-50 shadow-lg border-b border-gray-200">
	<nav class="max-w-7xl mx-auto flex justify-between items-center">
		<!-- Logo -->
		<div class="flex items-center">
			<img src="/sikhaidLogo.png" alt="SikhAid Logo" class="h-12 sm:h-14 md:h-16 w-auto" />
		</div>
		
		<!-- Desktop Navigation -->
		<ul class="hidden md:flex space-x-2">
			<li><a href="/" class="px-4 py-2 rounded-lg font-medium transition-all {isActivePage('/') ? 'bg-orange-custom text-white' : 'text-navy hover:bg-gray-100'}">Home</a></li>
			<li><a href="/about" class="px-4 py-2 rounded-lg font-medium transition-all {isActivePage('/about') ? 'bg-orange-custom text-white' : 'text-navy hover:bg-gray-100'}">About</a></li>
			<li><a href="/campaigns" class="px-4 py-2 rounded-lg font-medium transition-all {isActivePage('/campaigns') ? 'bg-orange-custom text-white' : 'text-navy hover:bg-gray-100'}">Campaigns</a></li>
			<li><a href="/blog" class="px-4 py-2 rounded-lg font-medium transition-all {isActivePage('/blog') ? 'bg-orange-custom text-white' : 'text-navy hover:bg-gray-100'}">Blog</a></li>
			<li><a href="/donate" class="px-4 py-2 rounded-lg font-medium transition-all {isActivePage('/donate') ? 'bg-orange-custom text-white' : 'text-navy hover:bg-gray-100'}">Donate</a></li>
			<li><a href="/contact" class="px-4 py-2 rounded-lg font-medium transition-all {isActivePage('/contact') ? 'bg-orange-custom text-white' : 'text-navy hover:bg-gray-100'}">Contact</a></li>
		</ul>
		
		<!-- Mobile Menu Button -->
		<button
			class="md:hidden text-navy p-2 rounded-lg hover:bg-gray-100 transition-colors"
			on:click={toggleMenu}
			aria-label="Toggle navigation menu"
		>
			{#if isMenuOpen}
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
				</svg>
			{:else}
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
				</svg>
			{/if}
		</button>
	</nav>
	
	<!-- Mobile Navigation Menu -->
	{#if isMenuOpen}
		<div class="md:hidden bg-white border-t border-gray-200 shadow-lg">
			<div class="max-w-7xl mx-auto py-4 px-4 space-y-2">
				<a
					href="/"
					class="block px-4 py-3 rounded-lg font-medium transition-all {isActivePage('/') ? 'bg-orange-custom text-white' : 'text-navy hover:bg-gray-100'}"
					on:click={closeMenu}
				>
					Home
				</a>
				<a
					href="/about"
					class="block px-4 py-3 rounded-lg font-medium transition-all {isActivePage('/about') ? 'bg-orange-custom text-white' : 'text-navy hover:bg-gray-100'}"
					on:click={closeMenu}
				>
					About
				</a>
				<a
					href="/campaigns"
					class="block px-4 py-3 rounded-lg font-medium transition-all {isActivePage('/campaigns') ? 'bg-orange-custom text-white' : 'text-navy hover:bg-gray-100'}"
					on:click={closeMenu}
				>
					Campaigns
				</a>
				<a
					href="/blog"
					class="block px-4 py-3 rounded-lg font-medium transition-all {isActivePage('/blog') ? 'bg-orange-custom text-white' : 'text-navy hover:bg-gray-100'}"
					on:click={closeMenu}
				>
					Blog
				</a>
				<a
					href="/donate"
					class="block px-4 py-3 rounded-lg font-medium transition-all {isActivePage('/donate') ? 'bg-orange-custom text-white' : 'text-navy hover:bg-gray-100'}"
					on:click={closeMenu}
				>
					Donate
				</a>
				<a
					href="/contact"
					class="block px-4 py-3 rounded-lg font-medium transition-all {isActivePage('/contact') ? 'bg-orange-custom text-white' : 'text-navy hover:bg-gray-100'}"
					on:click={closeMenu}
				>
					Contact
				</a>
			</div>
		</div>
	{/if}
</header>

<style>
	:global(:root) {
		--navy: #1a237e;
		--navy-dark: #0d1660;
	}
	
	.bg-navy {
		background-color: var(--navy);
	}
	
	header a {
		scroll-behavior: smooth;
	}
</style>