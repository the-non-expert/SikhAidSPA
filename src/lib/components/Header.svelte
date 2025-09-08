<header class="bg-navy text-white py-6 px-4 fixed w-full top-0 z-50 shadow-lg">
	<nav class="max-w-7xl mx-auto flex justify-between items-center">
		<div class="flex items-center space-x-3">
			<div class="text-2xl font-bold">Sikh Aid</div>
		</div>
		
		<ul class="hidden md:flex space-x-8">
			<li><a href="#hero" class="hover:text-gray-200 transition-colors">Home</a></li>
			<li><a href="#summary" class="hover:text-gray-200 transition-colors">About</a></li>
			<li><a href="#donate" class="hover:text-gray-200 transition-colors">Donate</a></li>
			<li><a href="#contact" class="hover:text-gray-200 transition-colors">Contact</a></li>
		</ul>
		
		<button class="md:hidden text-white">
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
			</svg>
		</button>
	</nav>
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