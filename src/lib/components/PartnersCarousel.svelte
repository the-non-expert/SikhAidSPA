<script lang="ts">
	// Partner logos data - using correct path with capital P for Partners folder
	const partners = [
		{ name: 'Axis Bank', logo: '/partners/AxisBank.svg' },
		{ name: 'Dominos', logo: '/partners/DominosLogo.svg' },
		{ name: 'Duramix', logo: 'partners/Duramix.png' },
		{ name: 'Hero MotoCorp', logo: '/partners/Hero_MotoCorp.svg' },
		{ name: 'Realme', logo: '/partners/realme_logo.svg' },
		{ name: 'TCS', logo: '/partners/tcs_logo.svg' }
	];

	// Alternative: for testing if paths work, let's add a fallback
	const fallbackLogo = '/sikhaidLogo.png';

	// Duplicate partners array for seamless infinite scroll
	const duplicatedPartners = [...partners, ...partners, ...partners];

	let isHovered = false;

	function handleMouseEnter() {
		isHovered = true;
	}

	function handleMouseLeave() {
		isHovered = false;
	}

	function handleImageError(event) {
		// Fallback to default logo if partner logo fails
		event.target.src = fallbackLogo;
	}
</script>

<section class="py-16 px-4 bg-white border-t border-gray-100">
	<div class="max-w-6xl mx-auto">
		<!-- Section Header -->
		<div class="text-center mb-12">
			<h2 class="text-2xl md:text-3xl text-orange-custom font-semibold mb-4">Our Partners</h2>
			<p class="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
				Proud to collaborate with a diverse range of partners
			</p>
		</div>

		<!-- Partners Carousel -->
		<div class="overflow-hidden">
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="partners-scroll flex items-center space-x-12 md:space-x-16"
				class:paused={isHovered}
				on:mouseenter={handleMouseEnter}
				on:mouseleave={handleMouseLeave}
			>
				{#each duplicatedPartners as partner}
					<div class="flex-shrink-0 partner-logo-container">
						<img
							src={partner.logo}
							alt="{partner.name} Logo"
							class="partner-logo h-12 md:h-16 w-auto object-contain"
							on:error={handleImageError}
							loading="lazy"
						/>
					</div>
				{/each}
			</div>
		</div>

		<!-- Optional supporting text -->
		<div class="text-center mt-8">
			<p class="text-sm text-gray-500">
				Together, we're making a difference across India
			</p>
		</div>
	</div>
</section>

<style>
	:global(:root) {
		--orange: #ff6b35;
	}

	.text-orange-custom {
		color: var(--orange);
	}

	/* Infinite scroll animation */
	.partners-scroll {
		animation: scroll-left 15s linear infinite;
		width: fit-content;
	}

	.partners-scroll.paused {
		animation-play-state: paused;
	}

	@keyframes scroll-left {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-33.333%); /* Move by 1/3 since we have 3 copies */
		}
	}

	/* Partner logo styling */
	.partner-logo-container {
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 120px;
		padding: 1rem;
	}

	.partner-logo {
		transition: all 0.3s ease;
		max-width: 140px;
	}

	.partner-logo:hover {
		filter: grayscale(0%) opacity(1);
		transform: scale(1.05);
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.partners-scroll {
			animation-duration: 25s; /* Slightly faster on mobile */
		}

		.partner-logo-container {
			min-width: 100px;
			padding: 0.75rem;
		}

		.partner-logo {
			max-width: 100px;
		}
	}

	@media (max-width: 480px) {
		.partners-scroll {
			animation-duration: 20s; /* Even faster on very small screens */
		}

		.partner-logo-container {
			min-width: 80px;
			padding: 0.5rem;
		}

		.partner-logo {
			max-width: 80px;
		}
	}

	/* Smooth performance optimizations */
	.partners-scroll {
		will-change: transform;
		backface-visibility: hidden;
		perspective: 1000px;
	}

	/* Ensure smooth edges */
	section {
		position: relative;
	}

	section::before,
	section::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		width: 50px;
		z-index: 10;
		pointer-events: none;
	}

	section::before {
		left: 0;
		background: linear-gradient(to right, white, transparent);
	}

	section::after {
		right: 0;
		background: linear-gradient(to left, white, transparent);
	}

	/* Hide gradient on smaller screens where it might interfere */
	@media (max-width: 640px) {
		section::before,
		section::after {
			width: 20px;
		}
	}
</style>