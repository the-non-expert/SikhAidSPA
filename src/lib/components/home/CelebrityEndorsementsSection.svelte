<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { getCelebrityCards } from '$lib/firestore';
	import type { FirestoreCelebrityCard } from '$lib/types/content';

	// Celebrity data from Firestore
	let celebrities: Array<{ name: string; profession: string; image: string }> = $state([]);
	let isLoading = $state(true);

	// Fetch celebrities from Firestore
	async function loadCelebrities() {
		try {
			const cards = await getCelebrityCards();
			// Filter only active cards and map to the format expected by the carousel
			celebrities = cards
				.filter((card) => card.isActive)
				.map((card) => ({
					name: card.name,
					profession: card.profession,
					image: card.imageUrl
				}));
		} catch (error) {
			console.error('❌ Error loading celebrity cards:', error);
			// Fallback to empty array if loading fails
			celebrities = [];
		} finally {
			isLoading = false;
		}
	}

	// Derived state
	let totalCelebrities = $derived(celebrities.length);

	// State
	let activeIndex = $state(0);
	let isHovered = $state(false);
	let intervalId: number | null = null;

	// Touch/Swipe state for mobile
	let touchStartX = $state(0);
	let touchEndX = $state(0);
	let isSwiping = $state(false);

	// Calculate how many cards to show based on screen width
	let visibleCards = $state(3); // Default for desktop
	let windowWidth = $state(1200);

	// Update visible cards based on window size
	function updateVisibleCards() {
		if (typeof window !== 'undefined') {
			windowWidth = window.innerWidth;
			if (windowWidth < 640) {
				visibleCards = 1; // Mobile: Show 1 card at a time
			} else if (windowWidth < 1024) {
				visibleCards = 2; // Tablet: 2 cards
			} else {
				visibleCards = 3; // Desktop: 3 cards
			}
		}
	}

	// Calculate position of each card relative to active index
	function getCardPosition(cardIndex: number): number {
		const diff = cardIndex - activeIndex;

		// Handle wrap-around for infinite loop
		if (diff > totalCelebrities / 2) {
			return diff - totalCelebrities;
		} else if (diff < -totalCelebrities / 2) {
			return diff + totalCelebrities;
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
		activeIndex = (activeIndex + 1) % totalCelebrities;
	}

	function prevSlide() {
		activeIndex = activeIndex === 0 ? totalCelebrities - 1 : activeIndex - 1;
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
		}, 3000); // 3 seconds
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

	// Touch/Swipe handlers for mobile
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
	onMount(async () => {
		updateVisibleCards();
		window.addEventListener('resize', updateVisibleCards);
		await loadCelebrities();
		startAutoPlay();
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', updateVisibleCards);
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

<section class="celebrity-section">
	<div class="celebrity-container">
		<!-- Section Header -->
		<div class="section-header">
			<h3 class="text-lg md:text-xl text-orange-custom font-semibold mb-3">Support from</h3>
			<h2 class="section-title">Renowned Personalities</h2>
			<!-- <p class="section-description">
				Watch as renowned personalities share their thoughts and experiences with Hemkunt Foundation.
			</p> -->
		</div>

		<!-- Loading State -->
		{#if isLoading}
			<div class="flex flex-col items-center justify-center py-20">
				<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-custom mb-4"></div>
				<p class="text-gray-600">Loading personalities...</p>
			</div>
		{:else if celebrities.length === 0}
			<!-- Empty State -->
			<div class="flex flex-col items-center justify-center py-20">
				<p class="text-gray-600">No personalities to display at the moment.</p>
			</div>
		{:else}
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
			<!-- Cards Container -->
			<div class="cards-container">
				{#each celebrities as celebrity, index}
					{#if isCardVisible(index)}
						{@const position = getCardPosition(index)}
						{@const isActive = index === activeIndex}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div
							class="celebrity-card"
							class:active={isActive}
							style="
                --position: {position};
                transform: translateX(calc({position} * 110%)) scale({isActive ? 1 : 0.85});
                opacity: {isActive ? 1 : 0.5};
                z-index: {isActive ? 10 : 5 - Math.abs(position)};
              "
							onclick={() => handleCardClick(index)}
						>
							<div class="card-image-wrapper">
								<img src={celebrity.image} alt={celebrity.name} class="card-image" loading="lazy" />
							</div>
							<div class="card-content">
								<h4 class="celebrity-name">{celebrity.name}</h4>
								<p class="celebrity-profession">{celebrity.profession}</p>
							</div>
						</div>
					{/if}
				{/each}
			</div>
		</div>

		<!-- Navigation Controls -->
		<div class="navigation-controls">
			<!-- Previous Button -->
			<button type="button" class="nav-button" onclick={prevSlide} aria-label="Previous celebrity">
				<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
				</svg>
			</button>

			<!-- Dot Indicators -->
			<div class="dot-indicators">
				{#each celebrities as _, index}
					<button
						type="button"
						class="dot"
						class:active={index === activeIndex}
						onclick={() => goToSlide(index)}
						aria-label="Go to celebrity {index + 1}"
					></button>
				{/each}
			</div>

			<!-- Next Button -->
			<button type="button" class="nav-button" onclick={nextSlide} aria-label="Next celebrity">
				<svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		</div>
		{/if}
	</div>
</section>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap');

	/* Section */
	.celebrity-section {
		padding: 32px 16px;
		background: linear-gradient(to bottom, #ffffff 0%, #fafafa 100%);
		overflow: hidden;
	}

	.celebrity-container {
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
		margin-bottom: 32px;
		perspective: 1000px;
		perspective-origin: center center;
	}

	/* Cards Container */
	.cards-container {
		position: relative;
		width: 100%;
		height: 500px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* Celebrity Card */
	.celebrity-card {
		position: absolute;
		width: 320px;
		height: 450px;
		background: white;
		border-radius: 16px;
		overflow: hidden;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
		transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
		cursor: pointer;
		display: flex;
		flex-direction: column;
	}

	.celebrity-card:hover {
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
	}

	.celebrity-card.active {
		cursor: default;
	}

	.card-image-wrapper {
		position: relative;
		width: 100%;
		height: 360px;
		overflow: hidden;
		background: #f5f5f5;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.card-image {
		width: 100%;
		height: 100%;
		object-fit: contain;
		transition: transform 0.3s ease;
	}

	.celebrity-card:hover .card-image {
		transform: scale(1.02);
	}

	.card-content {
		padding: 16px 20px;
		text-align: center;
		background: white;
		flex-shrink: 0;
	}

	.celebrity-name {
		font-size: 20px;
		font-weight: 700;
		color: #1a237e;
		margin: 0 0 6px 0;
		line-height: 1.2;
	}

	.celebrity-profession {
		font-size: 14px;
		font-weight: 600;
		color: #ffa617;
		margin: 0;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	/* Navigation Controls */
	.navigation-controls {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 24px;
		margin-top: 24px;
	}

	.nav-button {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: #ffa617;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 4px 12px rgba(255, 166, 23, 0.3);
	}

	.nav-button:hover {
		background: #e89500;
		transform: scale(1.1);
		box-shadow: 0 6px 16px rgba(255, 166, 23, 0.4);
	}

	.nav-button:active {
		transform: scale(0.95);
	}

	.nav-icon {
		width: 24px;
		height: 24px;
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
		background: #ffa617;
		width: 12px;
		height: 12px;
	}

	/* Responsive Styles */
	@media (max-width: 1024px) {
		.celebrity-section {
			padding: 32px 16px;
		}

		.section-title {
			font-size: 36px;
		}

		.section-header {
			margin-bottom: 20px;
		}

		.cards-container {
			height: 460px;
		}

		.celebrity-card {
			width: 300px;
			height: 420px;
		}

		.card-image-wrapper {
			height: 330px;
		}
	}

	@media (max-width: 640px) {
		.celebrity-section {
			padding: 24px 16px;
		}

		.section-header {
			margin-bottom: 16px;
		}

		.section-title {
			font-size: 28px;
		}

		.cards-container {
			height: 420px;
		}

		.celebrity-card {
			width: 280px;
			height: 390px;
		}

		.card-image-wrapper {
			height: 310px;
		}

		.card-content {
			padding: 12px 16px;
		}

		.celebrity-name {
			font-size: 18px;
			margin: 0 0 4px 0;
		}

		.celebrity-profession {
			font-size: 13px;
		}

		.nav-button {
			width: 40px;
			height: 40px;
		}

		.nav-icon {
			width: 20px;
			height: 20px;
		}

		.dot {
			width: 8px;
			height: 8px;
		}

		.dot.active {
			width: 10px;
			height: 10px;
		}

		.navigation-controls {
			gap: 16px;
		}
	}
</style>
