<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let currentImageIndex = 0;
	let intervalId: number;

	const images = [
		{ src: "https://i.ibb.co/Ng9wNgP4/IMG-20250930-WA0069.jpg", alt: "Punjab Flood Relief" },
		{ src: "https://i.ibb.co/B20Q7cBV/Hero1.jpg", alt: "Relief Operations" },
		{ src: "https://i.ibb.co/Gfyr5TNC/Hero4.jpg", alt: "Volunteers" }
	];

	onMount(() => {
		// Auto-rotate images every 3 seconds
		intervalId = setInterval(() => {
			currentImageIndex = (currentImageIndex + 1) % images.length;
		}, 3000);
	});

	onDestroy(() => {
		if (intervalId) {
			clearInterval(intervalId);
		}
	});
</script>

<!-- Desktop Hero Section -->
<section id="hero" class="min-h-screen lg:flex hidden relative overflow-hidden">
	<!-- Background Carousel Images -->
	{#each images as image, index}
		<div
			class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 {currentImageIndex === index ? 'opacity-100' : 'opacity-0'}"
			style="background-image: url('{image.src}');"
		></div>
	{/each}

	<!-- Dark Overlay for Text Readability -->
	<div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/70"></div>

	<!-- Content Overlay (Centered) -->
	<div class="relative z-10 w-full flex items-center justify-center p-8">
		<div class="max-w-3xl text-center">
			<p class="text-gray-200 text-lg italic mb-6 font-light">
				Delivering Urgent Aid. Restoring Lives.
			</p>

			<h1 class="text-5xl font-bold text-white mb-2 leading-tight">
				Join Us to help
			</h1>

			<h2 class="text-5xl font-bold text-orange-custom mb-8 leading-tight">
				Punjab Rise Again
			</h2>

			<p class="text-gray-100 text-lg mb-8 leading-relaxed">
				The floods in Punjab have destroyed homes and displaced thousands of families. SikhAid is on the ground, providing food, water, shelter, and medical aid. Your support can bring hope and relief to those who have lost everything.
			</p>

			<a href="https://donate.sikhaid.ngo/" class="inline-block bg-orange-custom hover:bg-orange-dark text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors uppercase tracking-wide shadow-lg">
				DONATE NOW
			</a>
		</div>
	</div>
</section>

<!-- Mobile Hero Section -->
<section id="hero-mobile" class="min-h-screen lg:hidden flex items- justify-center relative overflow-hidden">
	<!-- Background image with overlay -->
	<div class="absolute inset-0 bg-cover bg-center bg-no-repeat" style="background-image: url('https://i.ibb.co/B20Q7cBV/Hero1.jpg');">
		<div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/70"></div>
	</div>

	<!-- Content -->
	<div class="relative z-10 px-6 py-20 text-center max-w-lg mx-auto">
		<p class="text-gray-200 text-base italic mb-4 font-light">
			Delivering Urgent Aid. Restoring Lives.
		</p>

		<h1 class="text-3xl font-bold text-white mb-2 leading-tight">
			Join Us to help
		</h1>

		<h2 class="text-3xl font-bold text-orange-custom mb-6 leading-tight">
			Punjab Rise Again
		</h2>

		<p class="text-gray-100 text-xs mb-8 leading-relaxed">
			The floods in Punjab have destroyed homes and displaced thousands of families. SikhAid is on the ground, providing food, water, shelter, and medical aid. Your support can bring hope and relief to those who have lost everything.
		</p>

		<a href="https://donate.sikhaid.ngo/" class="inline-block bg-orange-custom hover:bg-orange-dark text-white px-6 py-3 rounded-lg font-semibold text-base transition-colors uppercase tracking-wide shadow-lg">
			DONATE NOW
		</a>
	</div>
</section>

<style>
	.text-navy {
		color: var(--navy);
	}

	.bg-navy {
		background-color: var(--navy);
	}

	.hover\:bg-navy-dark:hover {
		background-color: var(--navy-dark);
	}

	.border-navy {
		border-color: var(--navy);
	}
</style>
