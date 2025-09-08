<script lang="ts">
	let isMenuOpen = false;
	
	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
	
	function closeMenu() {
		isMenuOpen = false;
	}
</script>

<header class="bg-navy text-white py-4 px-4 fixed w-full top-0 z-50 shadow-lg">
	<nav class="max-w-7xl mx-auto flex justify-between items-center">
		<!-- Logo with contrast background -->
		<div class="flex items-center">
			<div class="bg-white p-2 rounded-lg shadow-md">
				<img src="/sikhaidLogo.png" alt="Sikh Aid Logo" class="h-12 sm:h-14 md:h-16 w-auto" />
			</div>
		</div>
		
		<!-- Desktop Navigation -->
		<ul class="hidden md:flex space-x-8">
			<li><a href="#hero" class="hover:text-gray-200 transition-colors font-medium">Home</a></li>
			<li><a href="#summary" class="hover:text-gray-200 transition-colors font-medium">About</a></li>
			<li><a href="#donate" class="hover:text-gray-200 transition-colors font-medium">Donate</a></li>
			<li><a href="#contact" class="hover:text-gray-200 transition-colors font-medium">Contact</a></li>
		</ul>
		
		<!-- Mobile Menu Button -->
		<button 
			class="md:hidden text-white p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors"
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
		<div class="md:hidden bg-navy border-t border-white border-opacity-20">
			<div class="max-w-7xl mx-auto py-4 px-4 space-y-3">
				<a 
					href="#hero" 
					class="block text-white hover:text-gray-200 transition-colors font-medium py-2"
					on:click={closeMenu}
				>
					Home
				</a>
				<a 
					href="#summary" 
					class="block text-white hover:text-gray-200 transition-colors font-medium py-2"
					on:click={closeMenu}
				>
					About
				</a>
				<a 
					href="#donate" 
					class="block text-white hover:text-gray-200 transition-colors font-medium py-2"
					on:click={closeMenu}
				>
					Donate
				</a>
				<a 
					href="#contact" 
					class="block text-white hover:text-gray-200 transition-colors font-medium py-2"
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