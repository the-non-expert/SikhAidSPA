<script lang="ts">
	import { page } from "$app/stores";

	let isMenuOpen = false;
	let isDropdownOpen = false;
	let closeTimeout;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}

	function openDropdown() {
		clearTimeout(closeTimeout);
		isDropdownOpen = true;
	}

	function closeDropdown() {
		closeTimeout = setTimeout(() => {
			isDropdownOpen = false;
		}, 150);
	}

	// Check if current page matches the link
	function isActivePage(href: string): boolean {
		if (href === "/") {
			return $page.url.pathname === "/";
		}
		return $page.url.pathname.startsWith(href);
	}

	// Check if Get Involved section is active
	function isGetInvolvedActive(): boolean {
		return (
			$page.url.pathname.startsWith("/volunteering") ||
			$page.url.pathname.startsWith("/csr")
		);
	}
</script>

<header
	class="bg-white text-navy px-2 fixed w-full top-0 z-50 shadow-lg border-b border-gray-200"
>
	<nav class="max-w-7xl mx-auto grid grid-cols-3 items-center">
		<!-- Left: Desktop Navigation / Mobile Menu Button -->
		<div class="flex items-center">
			<!-- Desktop Navigation -->
			<ul class="hidden md:flex space-x-6 items-center">
				<li>
					<a
						href="/"
						class="text-navy hover:text-orange-custom font-medium transition-colors {isActivePage(
							'/',
						)
							? 'text-orange-custom'
							: ''}">Home</a
					>
				</li>
				<li>
					<a
						href="/about"
						class="text-navy hover:text-orange-custom font-medium transition-colors {isActivePage(
							'/about',
						)
							? 'text-orange-custom'
							: ''}">About Us</a
					>
				</li>
				<li>
					<a
						href="/campaigns"
						class="text-navy hover:text-orange-custom font-medium transition-colors {isActivePage(
							'/campaigns',
						)
							? 'text-orange-custom'
							: ''}">Campaigns</a
					>
				</li>
				<li>
					<a
						href="/blog"
						class="text-navy hover:text-orange-custom font-medium transition-colors {isActivePage(
							'/blog',
						)
							? 'text-orange-custom'
							: ''}">Blog</a
					>
				</li>
				<li>
					<a
						href="/contact"
						class="text-navy hover:text-orange-custom font-medium transition-colors {isActivePage(
							'/contact',
						)
							? 'text-orange-custom'
							: ''}">Contact</a
					>
				</li>
			</ul>

			<!-- Mobile Menu Button -->
			<button
				class="md:hidden text-navy p-2 hover:bg-gray-100 transition-colors"
				on:click={toggleMenu}
				aria-label="Toggle navigation menu"
			>
				{#if isMenuOpen}
					<svg
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				{:else}
					<svg
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				{/if}
			</button>
		</div>

		<!-- Center: Logo -->
		<div class="flex justify-center">
			<a href="/">
				<img
					src="/sikhaidLogo.png"
					alt="SikhAid Logo"
					class="h-20 sm:h-15 md:h-24 w-auto"
				/></a
			>
		</div>

		<!-- Right: Get Involved Dropdown + Donate Button -->
		<div class="flex justify-end items-center gap-6">
			<!-- Get Involved Dropdown (Desktop Only) -->
			<button>
				<a
					href="/press"
					class="hidden md:block text-navy hover:text-orange-custom font-medium transition-colors {isActivePage(
						'/press',
					)
						? 'text-orange-custom'
						: ''}">Press Coverage</a
				></button
			>
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="hidden md:block relative dropdown-container"
				on:mouseenter={openDropdown}
				on:mouseleave={closeDropdown}
			>
				<button
					class="text-navy hover:text-orange-custom font-medium transition-colors flex items-center gap-1 {isGetInvolvedActive()
						? 'text-orange-custom'
						: ''}"
				>
					Get Involved
					<svg
						class="w-4 h-4 transition-transform {isDropdownOpen
							? 'rotate-180'
							: ''}"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</button>

				<!-- Dropdown Menu -->
				{#if isDropdownOpen}
					<div
						class="absolute top-full right-0 mt-2 w-56 bg-white shadow-xl rounded-lg border border-gray-100 py-2 z-50"
						on:mouseenter={openDropdown}
						on:mouseleave={closeDropdown}
					>
						<a
							href="/volunteering"
							class="block px-4 py-3 text-navy hover:bg-orange-custom hover:text-white font-medium transition-colors {isActivePage(
								'/volunteering',
							)
								? 'bg-orange-custom/10 text-orange-custom'
								: ''}"
							on:click={closeDropdown}
						>
							Volunteering Opportunities
						</a>
						<a
							href="/csr"
							class="block px-4 py-3 text-navy hover:bg-orange-custom hover:text-white font-medium transition-colors {isActivePage(
								'/csr',
							)
								? 'bg-orange-custom/10 text-orange-custom'
								: ''}"
							on:click={closeDropdown}
						>
							CSR Opportunities
						</a>
					</div>
				{/if}
			</div>

			<!-- Donate Button -->
			<a
				href="/donate"
				class="bg-orange-custom hover:bg-orange-dark text-white px-4 py-2 rounded-lg text-sm font-normal transition-colors"
			>
				Donate Now
			</a>
		</div>
	</nav>

	<!-- Mobile Navigation Menu -->
	{#if isMenuOpen}
		<div class="md:hidden shadow-lg">
			<div class="max-w-7xl mx-auto">
				<a
					href="/"
					class="block px-4 py-2 font-medium transition-colors {isActivePage(
						'/',
					)
						? 'text-orange-custom font-bold'
						: 'text-navy hover:text-orange-custom'}"
					on:click={closeMenu}
				>
					Home
				</a>
				<a
					href="/about"
					class="block px-4 py-2 font-medium transition-colors {isActivePage(
						'/about',
					)
						? 'text-orange-custom'
						: 'text-navy hover:text-orange-custom'}"
					on:click={closeMenu}
				>
					About Us
				</a>
				<a
					href="/campaigns"
					class="block px-4 py-2 font-medium transition-colors {isActivePage(
						'/campaigns',
					)
						? 'text-orange-custom'
						: 'text-navy hover:text-orange-custom'}"
					on:click={closeMenu}
				>
					Campaigns
				</a>
				<a
					href="/blog"
					class="block px-4 py-2 font-medium transition-colors {isActivePage(
						'/blog',
					)
						? 'text-orange-custom'
						: 'text-navy hover:text-orange-custom'}"
					on:click={closeMenu}
				>
					Blog
				</a>
				<a
					href="/press"
					class="block px-4 py-2 font-medium transition-colors {isActivePage(
						'/press',
					)
						? 'text-orange-custom'
						: 'text-navy hover:text-orange-custom'}"
					on:click={closeMenu}
				>
					Press Coverage
				</a>
				<a
					href="/volunteering"
					class="block px-4 py-2 font-medium transition-colors {isActivePage(
						'/volunteering',
					)
						? 'text-orange-custom'
						: 'text-navy hover:text-orange-custom'}"
					on:click={closeMenu}
				>
					Volunteering
				</a>
				<a
					href="/csr"
					class="block px-4 py-2 font-medium transition-colors {isActivePage(
						'/csr',
					)
						? 'text-orange-custom'
						: 'text-navy hover:text-orange-custom'}"
					on:click={closeMenu}
				>
					CSR Opportunities
				</a>
				<a
					href="/contact"
					class="block px-4 py-2 font-medium transition-colors {isActivePage(
						'/contact',
					)
						? 'text-orange-custom'
						: 'text-navy hover:text-orange-custom'}"
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
