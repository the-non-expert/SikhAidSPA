<script lang="ts">
	import { onMount } from 'svelte';

	// Selected impact images from campaigns data
	const impactImages = [
		// Large images - overview shots
		{
			src: 'https://i.ibb.co/9kkX22Tz/151.png',
			alt: 'Large-scale community food distribution',
			category: 'Food Security',
			size: 'large',
			campaign: 'Langar Aid'
		},
		{
			src: 'https://i.ibb.co/zWNmNZhN/Blanket-Main.png',
			alt: 'Winter relief blanket distribution',
			category: 'Winter Relief',
			size: 'large',
			campaign: 'Blanket Distribution'
		},
		{
			src: 'https://i.ibb.co/n8bLzJWC/Oxygen-Main.png',
			alt: 'COVID oxygen relief operations',
			category: 'Pandemic Relief',
			size: 'large',
			campaign: 'COVID Oxygen Sewa'
		},

		// Medium images - activity focused
		{
			src: 'https://i.ibb.co/chXkRPDx/147.png',
			alt: 'Volunteers preparing meals in community kitchen',
			category: 'Food Security',
			size: 'medium',
			campaign: 'Langar Aid'
		},
		{
			src: 'https://i.ibb.co/8gRBfkV5/148.png',
			alt: 'Food distribution to homeless individuals',
			category: 'Food Security',
			size: 'medium',
			campaign: 'Langar Aid'
		},
		{
			src: 'https://i.ibb.co/Pvb6V68C/153.png',
			alt: 'Distribution of sanitary pads to women',
			category: 'Women\'s Health',
			size: 'medium',
			campaign: 'No Spot'
		},
		{
			src: 'https://i.ibb.co/ZpNYDK8C/154.png',
			alt: 'Hygiene awareness workshop',
			category: 'Women\'s Health',
			size: 'medium',
			campaign: 'No Spot'
		},
		{
			src: 'https://i.ibb.co/N2KPNs6J/164.png',
			alt: 'Volunteers distributing ration kits',
			category: 'Pandemic Relief',
			size: 'medium',
			campaign: 'COVID Oxygen Sewa'
		},
		{
			src: 'https://i.ibb.co/SXd9fQTp/172.png',
			alt: 'Mobile medical camp in rural area',
			category: 'Healthcare',
			size: 'medium',
			campaign: 'Other Sewa'
		},

		// Small images - detail shots
		{
			src: 'https://i.ibb.co/1tXPdK2m/149.png',
			alt: 'Large-scale meal preparation',
			category: 'Food Security',
			size: 'small',
			campaign: 'Langar Aid'
		},
		{
			src: 'https://i.ibb.co/F42y3Z90/150.png',
			alt: 'Volunteers serving food in rural areas',
			category: 'Food Security',
			size: 'small',
			campaign: 'Langar Aid'
		},
		{
			src: 'https://i.ibb.co/WW2SqyRG/155.png',
			alt: 'Portable toilet installation',
			category: 'Women\'s Health',
			size: 'small',
			campaign: 'No Spot'
		},
		{
			src: 'https://i.ibb.co/F4PKdh2n/156.png',
			alt: 'Women volunteers conducting session',
			category: 'Women\'s Health',
			size: 'small',
			campaign: 'No Spot'
		},
		{
			src: 'https://i.ibb.co/gLVY2YGZ/161.png',
			alt: 'Elderly receiving warm blankets',
			category: 'Winter Relief',
			size: 'small',
			campaign: 'Blanket Distribution'
		},
		{
			src: 'https://i.ibb.co/0j2BzXf5/162.png',
			alt: 'Community distribution event',
			category: 'Winter Relief',
			size: 'small',
			campaign: 'Blanket Distribution'
		},
		{
			src: 'https://i.ibb.co/q3qjnfNd/165.png',
			alt: 'Medical equipment preparation',
			category: 'Pandemic Relief',
			size: 'small',
			campaign: 'COVID Oxygen Sewa'
		},
		{
			src: 'https://i.ibb.co/LhgSyWJJ/171.png',
			alt: 'Students receiving educational supplies',
			category: 'Education',
			size: 'small',
			campaign: 'Other Sewa'
		},
		{
			src: 'https://i.ibb.co/5WCLwQXv/173.png',
			alt: 'Ambulance service for emergency transport',
			category: 'Healthcare',
			size: 'small',
			campaign: 'Other Sewa'
		},
		{
			src: 'https://i.ibb.co/F4YZrjZR/174.png',
			alt: 'Blood donation drive',
			category: 'Healthcare',
			size: 'small',
			campaign: 'Other Sewa'
		}
	];

	let sectionElement: HTMLElement;
	let imagesLoaded = 0;
	let totalImages = impactImages.length;

	function handleImageLoad() {
		imagesLoaded++;
	}

	onMount(() => {
		// Add intersection observer for animation trigger
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('animate-in');
					}
				});
			},
			{ threshold: 0.1 }
		);

		// Observe all image containers
		const imageContainers = sectionElement.querySelectorAll('.image-container');
		imageContainers.forEach(container => observer.observe(container));

		return () => {
			imageContainers.forEach(container => observer.unobserve(container));
		};
	});
</script>

<!-- Our Impact Section -->
<section bind:this={sectionElement} class="py-16 px-4 bg-white">
	<div class="max-w-7xl mx-auto">
		<!-- Section Header -->
		<div class="text-center mb-16">
			<h2 class="text-3xl md:text-4xl font-bold text-navy mb-6">Our Impact</h2>
			<p class="text-xl text-gray-700 max-w-3xl mx-auto">Transforming Lives Across India Through Compassionate Service</p>
		</div>

		<!-- Dynamic Image Grid -->
		<div class="impact-grid">
			{#each impactImages as image, index}
				<div
					class="image-container {image.size} opacity-0 transform translate-y-4"
					style="animation-delay: {index * 100}ms"
				>
					<div class="relative group h-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
						<img
							src={image.src}
							alt={image.alt}
							loading="lazy"
							class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
							on:load={handleImageLoad}
						/>

						<!-- Hover Overlay -->
						<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
							<div class="absolute bottom-0 left-0 right-0 p-4 text-white">
								<div class="text-xs font-semibold text-orange-custom mb-1">{image.campaign}</div>
								<div class="text-sm font-medium">{image.category}</div>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Loading Progress (optional) -->
		<!-- {#if imagesLoaded < totalImages}
			<div class="text-center mt-8">
				<div class="inline-flex items-center space-x-2 text-gray-600">
					<div class="animate-spin w-4 h-4 border-2 border-orange-custom border-t-transparent rounded-full"></div>
					<span class="text-sm">Loading impact gallery... ({imagesLoaded}/{totalImages})</span>
				</div>
			</div>
		{/if} -->
	</div>
</section>

<style>
	:global(:root) {
		--navy: #1a237e;
		--orange: #FFA617;
	}

	.text-navy {
		color: var(--navy);
	}

	.text-orange-custom {
		color: var(--orange);
	}

	/* Dynamic Grid Layout */
	.impact-grid {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(6, 1fr);
		grid-auto-rows: 180px;
	}

	/* Size Classes */
	.large {
		grid-column: span 2;
		grid-row: span 2;
	}

	.medium {
		grid-column: span 2;
		grid-row: span 1;
	}

	.small {
		grid-column: span 1;
		grid-row: span 1;
	}

	/* Animation Classes */
	.animate-in {
		animation: slideInUp 0.6s ease-out forwards;
	}

	@keyframes slideInUp {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Responsive Adjustments */
	@media (max-width: 1024px) {
		.impact-grid {
			grid-template-columns: repeat(4, 1fr);
			grid-auto-rows: 160px;
		}

		.large {
			grid-column: span 2;
			grid-row: span 2;
		}
	}

	@media (max-width: 768px) {
		.impact-grid {
			grid-template-columns: repeat(3, 1fr);
			grid-auto-rows: 140px;
		}

		.large {
			grid-column: span 2;
			grid-row: span 1;
		}

		.medium {
			grid-column: span 2;
			grid-row: span 1;
		}
	}

	@media (max-width: 640px) {
		.impact-grid {
			grid-template-columns: repeat(2, 1fr);
			grid-auto-rows: 120px;
		}

		.large,
		.medium,
		.small {
			grid-column: span 1;
			grid-row: span 1;
		}
	}
</style>