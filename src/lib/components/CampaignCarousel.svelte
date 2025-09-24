<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { getAllCampaigns } from '$lib/data/campaigns.js';

	// Get first 5 campaigns
	const allCampaigns = getAllCampaigns();
	const campaigns = allCampaigns.slice(0, 5);

	// Carousel state
	let currentIndex = 0;
	let autoScrollInterval: NodeJS.Timeout;
	let isHovered = false;
	let carouselContainer: HTMLElement;

	// Auto-scroll functionality
	function startAutoScroll() {
		autoScrollInterval = setInterval(() => {
			if (!isHovered) {
				nextSlide();
			}
		}, 3000);
	}

	function stopAutoScroll() {
		if (autoScrollInterval) {
			clearInterval(autoScrollInterval);
		}
	}

	// Navigation functions
	function nextSlide() {
		currentIndex = (currentIndex + 1) % campaigns.length;
	}

	function prevSlide() {
		currentIndex = currentIndex === 0 ? campaigns.length - 1 : currentIndex - 1;
	}

	function goToSlide(index: number) {
		currentIndex = index;
	}

	// Handle hover events
	function handleMouseEnter() {
		isHovered = true;
	}

	function handleMouseLeave() {
		isHovered = false;
	}

	// Touch/swipe support
	let touchStartX = 0;
	let touchEndX = 0;

	function handleTouchStart(e: TouchEvent) {
		touchStartX = e.changedTouches[0].screenX;
	}

	function handleTouchEnd(e: TouchEvent) {
		touchEndX = e.changedTouches[0].screenX;
		handleSwipe();
	}

	function handleSwipe() {
		const swipeThreshold = 50;
		const diff = touchStartX - touchEndX;

		if (Math.abs(diff) > swipeThreshold) {
			if (diff > 0) {
				nextSlide();
			} else {
				prevSlide();
			}
		}
	}

	// Keyboard navigation
	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowLeft') {
			prevSlide();
		} else if (e.key === 'ArrowRight') {
			nextSlide();
		}
	}

	// Lifecycle
	onMount(() => {
		startAutoScroll();
		// Only add event listener if we're in the browser
		if (typeof window !== 'undefined') {
			window.addEventListener('keydown', handleKeydown);
		}
	});

	onDestroy(() => {
		stopAutoScroll();
		// Only remove event listener if we're in the browser
		if (typeof window !== 'undefined') {
			window.removeEventListener('keydown', handleKeydown);
		}
	});
</script>

<section class="py-16 px-4 bg-white">
	<div class="max-w-6xl mx-auto">
		<!-- Section Header -->
		<div class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl font-bold text-navy mb-4">Current Campaigns</h2>
			<p class="text-lg text-gray-600 max-w-2xl mx-auto">
				Discover our ongoing humanitarian initiatives making a real difference across India
			</p>
		</div>

		<!-- Carousel Container -->
		<div
			class="relative overflow-hidden"
			role="region"
			aria-label="Campaign carousel"
			on:mouseenter={handleMouseEnter}
			on:mouseleave={handleMouseLeave}
			on:touchstart={handleTouchStart}
			on:touchend={handleTouchEnd}
			bind:this={carouselContainer}
		>
			<!-- Carousel Track -->
			<div
				class="carousel-track flex transition-transform duration-300 ease-in-out"
				style="transform: translateX(-{currentIndex * 100}%); width: {campaigns.length * 100}%"
			>
				{#each campaigns as campaign, index}
					<div class="carousel-slide flex-shrink-0 px-3">
						<a
							href="/campaigns/{campaign.slug}"
							class="campaign-card group block relative h-80 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
						>
							<!-- Background Image -->
							<div class="absolute inset-0">
								<img
									src="/sikhaidLogo.png"
									alt={campaign.title}
									class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
								/>
								<!-- Gradient Overlay -->
								<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
							</div>

							<!-- Content -->
							<div class="relative z-10 h-full flex flex-col justify-end p-6 text-white">
								<!-- Category Badge -->
								<div class="mb-3">
									<span class="inline-block bg-orange-custom text-white text-sm font-semibold px-3 py-1 rounded-full">
										{campaign.category}
									</span>
								</div>

								<!-- Title -->
								<h3 class="text-2xl font-bold mb-2 group-hover:text-orange-custom transition-colors">
									{campaign.title}
								</h3>

								<!-- Description -->
								<p class="text-gray-200 text-sm mb-4 line-clamp-2">
									{campaign.shortDescription}
								</p>

								<!-- View Campaign Button -->
								<div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
									<span class="inline-block bg-navy hover:bg-navy-dark text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
										View Campaign
									</span>
								</div>
							</div>
						</a>
					</div>
				{/each}
			</div>

			<!-- Navigation Arrows -->
			<button
				on:click={prevSlide}
				class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-navy p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-20"
				aria-label="Previous campaign"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
				</svg>
			</button>

			<button
				on:click={nextSlide}
				class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-navy p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-20"
				aria-label="Next campaign"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
				</svg>
			</button>
		</div>

		<!-- Dot Indicators -->
		<div class="flex justify-center mt-8 space-x-2">
			{#each campaigns as _, index}
				<button
					on:click={() => goToSlide(index)}
					class="w-3 h-3 rounded-full transition-all duration-200 {index === currentIndex ? 'bg-orange-custom' : 'bg-gray-300 hover:bg-gray-400'}"
					aria-label="Go to slide {index + 1}"
				></button>
			{/each}
		</div>

		<!-- View All Campaigns Button -->
		<div class="text-center mt-8">
			<a
				href="/campaigns"
				class="inline-block bg-navy hover:bg-navy-dark text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
			>
				VIEW ALL CAMPAIGNS
			</a>
		</div>
	</div>
</section>

<style>
	/* CSS Variables */
	:global(:root) {
		--navy: #1a237e;
		--navy-dark: #0d1660;
		--orange: #FFA617;
		--orange-dark: #e89500;
	}

	.text-navy {
		color: var(--navy);
	}

	.bg-navy {
		background-color: var(--navy);
	}

	.hover\:bg-navy-dark:hover {
		background-color: var(--navy-dark);
	}

	.bg-orange-custom {
		background-color: var(--orange);
	}

	.text-orange-custom {
		color: var(--orange);
	}

	.hover\:text-orange-custom:hover {
		color: var(--orange);
	}

	/* Line clamp utility */
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* Mobile responsive adjustments */
	.carousel-slide {
		width: calc(100% / 5); /* Each slide takes 1/5 of total track width */
	}

	/* Mobile: Show 1 slide (centered view) */
	@media (max-width: 767px) {
		.carousel-slide {
			width: calc(100% / 5);
		}
	}

	/* Tablet: Show 2 slides */
	@media (min-width: 768px) and (max-width: 1023px) {
		.carousel-slide {
			width: calc(100% / 5);
		}
	}

	/* Desktop: Show 3 slides */
	@media (min-width: 1024px) {
		.carousel-slide {
			width: calc(100% / 5);
		}
	}

	/* Performance optimizations */
	.campaign-card {
		will-change: transform;
	}

	.carousel-track {
		will-change: transform;
	}

	/* Ensure smooth transitions */
	.campaign-card img {
		will-change: transform;
	}
</style>