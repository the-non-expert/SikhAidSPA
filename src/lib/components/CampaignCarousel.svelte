<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { campaigns, featuredCampaign } from '$lib/data/campaigns.js';

	// Combine featured campaign with regular campaigns
	const allCampaigns = [featuredCampaign, ...campaigns];

	let currentSlide = 0;
	let intervalId: number;
	let isHovered = false;
	let carouselElement: HTMLElement;

	// Touch events for mobile swiping
	let touchStartX = 0;
	let touchEndX = 0;
	let isSwiping = false;

	// Auto-slide functionality
	function startAutoSlide() {
		intervalId = setInterval(() => {
			if (!isHovered && !isSwiping) {
				nextSlide();
			}
		}, 5000); // 5 seconds
	}

	function stopAutoSlide() {
		if (intervalId) {
			clearInterval(intervalId);
		}
	}

	function nextSlide() {
		currentSlide = (currentSlide + 1) % allCampaigns.length;
	}

	function prevSlide() {
		currentSlide = currentSlide === 0 ? allCampaigns.length - 1 : currentSlide - 1;
	}

	function goToSlide(index: number) {
		currentSlide = index;
	}

	function handleMouseEnter() {
		isHovered = true;
	}

	function handleMouseLeave() {
		isHovered = false;
	}

	// Touch/Swipe handlers for mobile
	function handleTouchStart(e: TouchEvent) {
		touchStartX = e.changedTouches[0].screenX;
		isSwiping = true;
	}

	function handleTouchEnd(e: TouchEvent) {
		touchEndX = e.changedTouches[0].screenX;
		handleSwipe();
		isSwiping = false;
	}

	function handleSwipe() {
		const swipeThreshold = 50; // Minimum distance for a swipe
		const difference = touchStartX - touchEndX;

		if (Math.abs(difference) > swipeThreshold) {
			if (difference > 0) {
				// Swiped left - go to next slide
				nextSlide();
			} else {
				// Swiped right - go to previous slide
				prevSlide();
			}
		}
	}

	function getStatusColor(status: string) {
		switch (status) {
			case 'ongoing':
				return 'bg-green-500';
			case 'completed':
				return 'bg-blue-500';
			case 'seasonal':
				return 'bg-orange-500';
			default:
				return 'bg-gray-500';
		}
	}

	function getStatusText(status: string) {
		switch (status) {
			case 'ongoing':
				return 'Active';
			case 'completed':
				return 'Completed';
			case 'seasonal':
				return 'Seasonal';
			default:
				return 'Unknown';
		}
	}

	onMount(() => {
		startAutoSlide();
	});

	onDestroy(() => {
		stopAutoSlide();
	});
</script>

<section class="py-5 px-4 bg-white">
	<div class="max-w-6xl mx-auto">
		<div class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl font-bold text-navy mb-6">Our Campaigns</h2>
			<p class="text-xl text-gray-700 max-w-3xl mx-auto">
				Discover our ongoing humanitarian initiatives making a difference across India
			</p>
		</div>

		<!-- Carousel Container -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			bind:this={carouselElement}
			class="relative overflow-hidden rounded-xl shadow-2xl"
			on:mouseenter={handleMouseEnter}
			on:mouseleave={handleMouseLeave}
			on:touchstart={handleTouchStart}
			on:touchend={handleTouchEnd}
		>
			<!-- Slides Container -->
			<div
				class="flex transition-transform duration-500 ease-in-out"
				style="transform: translateX(-{currentSlide * 100}%)"
			>
				{#each allCampaigns as campaign, index}
					<div class="w-full flex-shrink-0">
						<!-- Single Card with Image Background and Overlay Content -->
						<div class="relative h-[500px] overflow-hidden">
							<!-- Background Image -->
							<img
								src={campaign.image}
								alt={campaign.title}
								class="w-full h-full object-cover"
							/>

							<!-- Light Gradient Overlay for Text Readability -->
							<div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>

							<!-- Status Badge -->
							<!-- <div class="absolute top-6 right-6">
								<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white {getStatusColor(campaign.status)} backdrop-blur-sm">
									{getStatusText(campaign.status)}
								</span>
							</div> -->

							<!-- Content Overlay -->
							<div class="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
								<div class="space-y-4 max-w-2xl">
									<!-- Category -->
									<!-- <div class="inline-flex items-center">
										<span class="bg-orange-custom text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
											{campaign.category}
										</span>
									</div> -->

									<!-- Title -->
									<h3 class="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-lg">
										{campaign.title}
									</h3>

									<!-- Call to Action -->
									<div class="flex flex-col sm:flex-row gap-4 pt-2">
										<a
											href="/campaigns/{campaign.slug}"
											class="bg-white/90 hover:bg-white text-navy font-semibold px-6 py-3 rounded-lg transition-all text-center backdrop-blur-sm hover:scale-105"
										>
											Learn More
										</a>
										<a
											href="/donate"
											class="border-2 border-white/80 text-white hover:bg-white hover:text-navy font-semibold px-6 py-3 rounded-lg transition-all text-center backdrop-blur-sm hover:scale-105"
										>
											Support This Campaign
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Navigation: Arrows + Dots + Counter -->
		<div class="flex flex-col items-center mt-8 space-y-4">
			<!-- Arrows and Dots -->
			<div class="flex items-center space-x-6">
				<!-- Previous Arrow -->
				<button
					on:click={prevSlide}
					class="bg-gray-100 hover:bg-gray-200 text-navy p-2 rounded-full transition-colors hover:scale-110"
					aria-label="Previous campaign"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
					</svg>
				</button>

				<!-- Dots Indicator -->
				<div class="flex space-x-2">
					{#each allCampaigns as _, index}
						<button
							on:click={() => goToSlide(index)}
							class="w-3 h-3 rounded-full transition-colors {index === currentSlide ? 'bg-orange-custom' : 'bg-gray-300 hover:bg-gray-400'}"
							aria-label="Go to campaign {index + 1}"
						></button>
					{/each}
				</div>

				<!-- Next Arrow -->
				<button
					on:click={nextSlide}
					class="bg-gray-100 hover:bg-gray-200 text-navy p-2 rounded-full transition-colors hover:scale-110"
					aria-label="Next campaign"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
					</svg>
				</button>
			</div>

			<!-- Campaign Counter -->
			<div class="text-center">
				<span class="text-sm text-gray-600">
					{currentSlide + 1} of {allCampaigns.length}
				</span>
			</div>
		</div>
	</div>
</section>

<style>
	:global(:root) {
		--navy: #1a237e;
		--navy-dark: #0d1660;
		--orange: #ff6b35;
		--orange-dark: #e55a2b;
	}

	.text-navy {
		color: var(--navy);
	}

	.bg-navy {
		background-color: var(--navy);
	}

	.bg-orange-custom {
		background-color: var(--orange);
	}

	.hover\:bg-orange-dark:hover {
		background-color: var(--orange-dark);
	}

	.text-orange-custom {
		color: var(--orange);
	}

	.border-orange-custom {
		border-color: var(--orange);
	}

	/* Smooth transitions */
	.transition-transform {
		transition-property: transform;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 500ms;
	}

	/* Enhanced hover effects */
	button:hover {
		transform: scale(1.05);
	}

	/* Responsive adjustments */
	@media (max-width: 1024px) {
		.grid-cols-1.lg\:grid-cols-2 {
			grid-template-columns: 1fr;
		}

		.min-h-\[500px\] {
			min-height: auto;
		}
	}
</style>