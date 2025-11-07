<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import { campaigns, featuredCampaign } from "$lib/data/campaigns.js";
	import CampaignCard from "./CampaignCard.svelte";
	import type { Campaign } from "$lib/types/campaign";

	// Combine featured campaign with regular campaigns
	const allCampaigns: Campaign[] = [featuredCampaign, ...campaigns];
	const totalCampaigns = allCampaigns.length;

	// State
	let activeIndex = $state(0);
	let isHovered = $state(false);
	let intervalId: number | null = null;

	// Touch/Swipe state for mobile
	let touchStartX = $state(0);
	let touchEndX = $state(0);
	let isSwiping = $state(false);

	// Calculate how many cards to show based on screen width
	let visibleCards = $state(5); // Default for desktop
	let windowWidth = $state(1200);

	// Update visible cards based on window size
	function updateVisibleCards() {
		if (typeof window !== "undefined") {
			windowWidth = window.innerWidth;
			if (windowWidth < 640) {
				visibleCards = 3; // Mobile: Show 3 cards for stacking effect (center + hints)
			} else if (windowWidth < 1024) {
				visibleCards = 3; // Tablet: 3 cards
			} else {
				visibleCards = 5; // Desktop: 5 cards
			}
		}
	}

	// Calculate position of each card relative to active index
	function getCardPosition(cardIndex: number): number {
		const diff = cardIndex - activeIndex;

		// Handle wrap-around for infinite loop
		if (diff > totalCampaigns / 2) {
			return diff - totalCampaigns;
		} else if (diff < -totalCampaigns / 2) {
			return diff + totalCampaigns;
		}

		return diff;
	}

	// Check if card should be visible
	function isCardVisible(cardIndex: number): boolean {
		const position = getCardPosition(cardIndex);
		const maxVisible = Math.floor(visibleCards / 2);
		return Math.abs(position) <= maxVisible;
	}

	// Navigation functions
	function nextSlide() {
		activeIndex = (activeIndex + 1) % totalCampaigns;
	}

	function prevSlide() {
		activeIndex = activeIndex === 0 ? totalCampaigns - 1 : activeIndex - 1;
	}

	function goToSlide(index: number) {
		activeIndex = index;
	}

	// Auto-play functionality
	function startAutoPlay() {
		if (intervalId) return;
		intervalId = window.setInterval(() => {
			if (!isHovered && !isSwiping) {
				nextSlide();
			}
		}, 2000); // 2 seconds as requested
	}

	function stopAutoPlay() {
		if (intervalId) {
			clearInterval(intervalId);
			intervalId = null;
		}
	}

	// Mouse events
	function handleMouseEnter() {
		isHovered = true;
	}

	function handleMouseLeave() {
		isHovered = false;
	}

	// Touch/Swipe handlers for mobile (panoramic slider effect)
	function handleTouchStart(e: TouchEvent) {
		touchStartX = e.touches[0].clientX;
		isSwiping = true;
	}

	function handleTouchMove(e: TouchEvent) {
		if (!isSwiping) return;
		touchEndX = e.touches[0].clientX;
	}

	function handleTouchEnd() {
		if (!isSwiping) return;

		const swipeThreshold = 50;
		const difference = touchStartX - touchEndX;

		if (Math.abs(difference) > swipeThreshold) {
			if (difference > 0) {
				nextSlide(); // Swiped left
			} else {
				prevSlide(); // Swiped right
			}
		}

		isSwiping = false;
		touchStartX = 0;
		touchEndX = 0;
	}

	// Click on card to make it active
	function handleCardClick(index: number) {
		if (index !== activeIndex) {
			goToSlide(index);
		}
	}

	// Lifecycle
	onMount(() => {
		updateVisibleCards();
		window.addEventListener("resize", updateVisibleCards);
		startAutoPlay();
	});

	onDestroy(() => {
		if (typeof window !== "undefined") {
			window.removeEventListener("resize", updateVisibleCards);
		}
		stopAutoPlay();
	});

	// Reactive auto-play management
	$effect(() => {
		if (isHovered || isSwiping) {
			stopAutoPlay();
		} else {
			startAutoPlay();
		}

		return () => {
			stopAutoPlay();
		};
	});
</script>

<section class="carousel-section">
	<div class="carousel-container">
		<!-- Section Header -->
		<div class="section-header">
			<h2 class="section-title">Current Campaigns</h2>
		</div>

		<!-- Carousel -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="carousel-wrapper"
			onmouseenter={handleMouseEnter}
			onmouseleave={handleMouseLeave}
			ontouchstart={handleTouchStart}
			ontouchmove={handleTouchMove}
			ontouchend={handleTouchEnd}
		>
			<!-- Cards Container with 3D Perspective -->
			<div class="cards-container">
				{#each allCampaigns as campaign, index}
					{#if isCardVisible(index)}
						<CampaignCard
							{campaign}
							position={getCardPosition(index)}
							isActive={index === activeIndex}
							onClick={() => handleCardClick(index)}
						/>
					{/if}
				{/each}
			</div>
		</div>

		<!-- Navigation Controls -->
		<div class="navigation-controls">
			<!-- Previous Button -->
			<button
				type="button"
				class="nav-button"
				onclick={prevSlide}
				aria-label="Previous campaign"
			>
				<svg
					class="nav-icon"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2.5"
						d="M15 19l-7-7 7-7"
					/>
				</svg>
			</button>

			<!-- Dot Indicators -->
			<div class="dot-indicators">
				{#each allCampaigns as _, index}
					<button
						type="button"
						class="dot"
						class:active={index === activeIndex}
						onclick={() => goToSlide(index)}
						aria-label="Go to campaign {index + 1}"
					></button>
				{/each}
			</div>

			<!-- Next Button -->
			<button
				type="button"
				class="nav-button"
				onclick={nextSlide}
				aria-label="Next campaign"
			>
				<svg
					class="nav-icon"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2.5"
						d="M9 5l7 7-7 7"
					/>
				</svg>
			</button>
		</div>

		<!-- View All Campaigns Button -->
		<div class="view-all-container">
			<a href="/campaigns" class="view-all-button">VIEW ALL CAMPAIGNS</a>
		</div>
	</div>
</section>

<style>
	/* Section */
	.carousel-section {
		padding: 20px 16px;
		background: linear-gradient(to bottom, #fafafa 0%, #ffffff 100%);
		overflow: hidden;
	}

	.carousel-container {
		max-width: 1400px;
		margin: 0 auto;
	}

	/* Header */
	.section-header {
		text-align: center;
		margin-bottom: 24px;
	}

	.section-title {
		font-size: 42px;
		font-weight: 700;
		color: #1a237e;
		margin: 0;
		letter-spacing: -0.5px;
	}

	/* Carousel Wrapper */
	.carousel-wrapper {
		position: relative;
		width: 100%;
		margin-bottom: 4px;
		perspective: 1000px;
		perspective-origin: center center;
	}

	/* Cards Container */
	.cards-container {
		position: relative;
		width: 100%;
		height: 350px;
		transform-style: preserve-3d;
	}

	/* Navigation Controls */
	.navigation-controls {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 24px;
		margin-bottom: 16px;
	}

	.nav-button {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: #ff6b35;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
	}

	.nav-button:hover {
		background: #e55a2b;
		transform: scale(1.1);
		box-shadow: 0 6px 16px rgba(255, 107, 53, 0.4);
	}

	.nav-button:active {
		transform: scale(0.95);
	}

	.nav-icon {
		width: 10px;
		height: 10px;
		color: white;
	}

	/* Dot Indicators */
	.dot-indicators {
		display: flex;
		gap: 8px;
		align-items: center;
	}

	.dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: #d1d5db;
		border: none;
		cursor: pointer;
		transition: all 0.3s ease;
		padding: 0;
	}

	.dot:hover {
		background: #9ca3af;
		transform: scale(1.2);
	}

	.dot.active {
		background: #ff6b35;
		width: 12px;
		height: 12px;
	}

	/* View All Button */
	.view-all-container {
		text-align: center;
	}

	.view-all-button {
		display: inline-block;
		background: #1a237e;
		color: white;
		font-weight: 600;
		font-size: 14px;
		padding: 16px 40px;
		border-radius: 8px;
		text-decoration: none;
		transition: all 0.3s ease;
		letter-spacing: 1px;
	}

	.view-all-button:hover {
		background: #0d1660;
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(26, 35, 126, 0.3);
	}

	/* Responsive Styles */
	@media (max-width: 1024px) {
		.carousel-section {
			padding: 60px 16px;
		}

		.section-title {
			font-size: 36px;
		}

		.cards-container {
			height: 300px;
		}

		.section-header {
			margin-bottom: 48px;
		}
	}

	@media (max-width: 640px) {
		.carousel-section {
			padding: 16px 16px;
		}

		.section-title {
			font-size: 32px;
		}

		.cards-container {
			height: 280px;
		}

		.nav-button {
			width: 40px;
			height: 40px;
		}

		.nav-icon {
			width: 18px;
			height: 18px;
		}

		.dot {
			width: 8px;
			height: 8px;
		}

		.dot.active {
			width: 10px;
			height: 10px;
		}

		.view-all-button {
			padding: 14px 36px;
			font-size: 13px;
		}

		.section-header {
			margin-bottom: 10px;
		}

		.navigation-controls {
			gap: 16px;
			margin-bottom: 12px;
		}
	}

	/* Add Caveat font for subtitle */
	/* @import url("https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap"); */
</style>
