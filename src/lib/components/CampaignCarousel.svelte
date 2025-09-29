<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { campaigns, featuredCampaign } from '$lib/data/campaigns.js';

	// Combine featured campaign with regular campaigns
	const allCampaigns = [featuredCampaign, ...campaigns];

	let currentSlide = 0;
	let intervalId: number;
	let isHovered = false;

	// Auto-slide functionality
	function startAutoSlide() {
		intervalId = setInterval(() => {
			if (!isHovered) {
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

<section class="py-16 px-4 bg-white">
	<div class="max-w-6xl mx-auto">
		<div class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl font-bold text-navy mb-6">Our Campaigns</h2>
			<p class="text-xl text-gray-700 max-w-3xl mx-auto">
				Discover our ongoing humanitarian initiatives making a difference across India
			</p>
		</div>

		<!-- Carousel Container -->
		<div
			class="relative overflow-hidden rounded-xl shadow-2xl"
			on:mouseenter={handleMouseEnter}
			on:mouseleave={handleMouseLeave}
		>
			<!-- Slides Container -->
			<div
				class="flex transition-transform duration-500 ease-in-out"
				style="transform: translateX(-{currentSlide * 100}%)"
			>
				{#each allCampaigns as campaign, index}
					<div class="w-full flex-shrink-0">
						<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12 min-h-[500px]">
							<!-- Campaign Image -->
							<div class="flex items-center justify-center">
								<div class="relative">
									<img
										src={campaign.image}
										alt={campaign.title}
										class="w-64 h-64 object-contain mx-auto"
									/>
									<!-- Status Badge -->
									<div class="absolute top-4 right-4">
										<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white {getStatusColor(campaign.status)}">
											{getStatusText(campaign.status)}
										</span>
									</div>
								</div>
							</div>

							<!-- Campaign Content -->
							<div class="flex flex-col justify-center space-y-6">
								<!-- Category -->
								<div class="inline-flex items-center">
									<span class="bg-orange-custom text-white px-3 py-1 rounded-full text-sm font-semibold">
										{campaign.category}
									</span>
								</div>

								<!-- Title and Subtitle -->
								<div>
									<h3 class="text-3xl md:text-4xl font-bold text-navy mb-3">
										{campaign.title}
									</h3>
									<p class="text-xl text-orange-custom font-semibold mb-4">
										{campaign.subtitle}
									</p>
									<p class="text-gray-700 leading-relaxed">
										{campaign.shortDescription}
									</p>
								</div>

								<!-- Impact Stats -->
								<div class="grid grid-cols-2 gap-4">
									{#each campaign.impactStats.slice(0, 4) as stat}
										<div class="text-center p-4 bg-gray-50 rounded-lg">
											<div class="text-2xl mb-2">{stat.icon}</div>
											<div class="text-lg font-bold text-navy">{stat.value}</div>
											<div class="text-sm text-gray-600">{stat.label}</div>
										</div>
									{/each}
								</div>

								<!-- Call to Action -->
								<div class="flex space-x-4">
									<a
										href="/campaigns/{campaign.slug}"
										class="bg-orange-custom hover:bg-orange-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
									>
										Learn More
									</a>
									<a
										href="/donate"
										class="border-2 border-orange-custom text-orange-custom hover:bg-orange-custom hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors"
									>
										Support This Campaign
									</a>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>

			<!-- Navigation Arrows -->
			<button
				on:click={prevSlide}
				class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-navy p-3 rounded-full shadow-lg transition-all hover:scale-110"
				aria-label="Previous campaign"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
				</svg>
			</button>

			<button
				on:click={nextSlide}
				class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-navy p-3 rounded-full shadow-lg transition-all hover:scale-110"
				aria-label="Next campaign"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
				</svg>
			</button>
		</div>

		<!-- Dots Indicator -->
		<div class="flex justify-center mt-8 space-x-2">
			{#each allCampaigns as _, index}
				<button
					on:click={() => goToSlide(index)}
					class="w-3 h-3 rounded-full transition-colors {index === currentSlide ? 'bg-orange-custom' : 'bg-gray-300 hover:bg-gray-400'}"
					aria-label="Go to campaign {index + 1}"
				></button>
			{/each}
		</div>

		<!-- Campaign Counter -->
		<div class="text-center mt-4">
			<span class="text-sm text-gray-600">
				{currentSlide + 1} of {allCampaigns.length}
			</span>
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