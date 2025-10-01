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
	<nav class="max-w-7xl mx-auto grid grid-cols-3 items-center">
		<!-- Left: Desktop Navigation / Mobile Menu Button -->
		<div class="flex items-center">
			<!-- Desktop Navigation -->
			<ul class="hidden md:flex space-x-6">
				<li><a href="/" class="text-navy hover:text-orange-custom font-medium transition-colors {isActivePage('/') ? 'text-orange-custom' : ''}">Home</a></li>
				<li><a href="/about" class="text-navy hover:text-orange-custom font-medium transition-colors {isActivePage('/about') ? 'text-orange-custom' : ''}">About Us</a></li>
				<li><a href="/campaigns" class="text-navy hover:text-orange-custom font-medium transition-colors {isActivePage('/campaigns') ? 'text-orange-custom' : ''}">Campaigns</a></li>
				<li><a href="/blog" class="text-navy hover:text-orange-custom font-medium transition-colors {isActivePage('/blog') ? 'text-orange-custom' : ''}">Blog</a></li>
				<li><a href="/contact" class="text-navy hover:text-orange-custom font-medium transition-colors {isActivePage('/contact') ? 'text-orange-custom' : ''}">Contact</a></li>
			</ul>

			<!-- Mobile Menu Button -->
			<button
				class="md:hidden text-navy p-2 hover:bg-gray-100 transition-colors"
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
		</div>

		<!-- Center: Logo -->
		<div class="flex justify-center">
			<img src="/sikhaidLogo.png" alt="SikhAid Logo" class="h-15 sm:h-16 md:h-24 w-auto" />
		</div>

		<!-- Right: Donate Button -->
		<div class="flex justify-end">
			<a href="/donate" class="bg-orange-custom hover:bg-orange-dark text-white px-4 py-2 rounded-lg text-sm font-normal transition-colors">
				Donate Now
			</a>
		</div>
	</nav>
	
	<!-- Mobile Navigation Menu -->
	{#if isMenuOpen}
		<div class="md:hidden bg-white border-t border-gray-200 shadow-lg">
			<div class="max-w-7xl mx-auto py-4 px-4 space-y-1">
				<a
					href="/"
					class="block px-4 py-3 font-medium transition-colors {isActivePage('/') ? 'text-orange-custom' : 'text-navy hover:text-orange-custom'}"
					on:click={closeMenu}
				>
					Home
				</a>
				<a
					href="/about"
					class="block px-4 py-3 font-medium transition-colors {isActivePage('/about') ? 'text-orange-custom' : 'text-navy hover:text-orange-custom'}"
					on:click={closeMenu}
				>
					About Us
				</a>
				<a
					href="/campaigns"
					class="block px-4 py-3 font-medium transition-colors {isActivePage('/campaigns') ? 'text-orange-custom' : 'text-navy hover:text-orange-custom'}"
					on:click={closeMenu}
				>
					Campaigns
				</a>
				<a
					href="/blog"
					class="block px-4 py-3 font-medium transition-colors {isActivePage('/blog') ? 'text-orange-custom' : 'text-navy hover:text-orange-custom'}"
					on:click={closeMenu}
				>
					Blog
				</a>
				<a
					href="/contact"
					class="block px-4 py-3 font-medium transition-colors {isActivePage('/contact') ? 'text-orange-custom' : 'text-navy hover:text-orange-custom'}"
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