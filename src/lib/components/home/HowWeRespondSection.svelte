<script lang="ts">
	import { onMount } from 'svelte';

	let sectionVisible = false;

	onMount(() => {
		const section = document.getElementById('how-we-respond-section');

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						sectionVisible = true;
					}
				});
			},
			{ threshold: 0.2 }
		);

		if (section) {
			observer.observe(section);
		}

		return () => {
			if (section) {
				observer.unobserve(section);
			}
		};
	});
</script>

<!-- How We Respond Section -->
<section id="how-we-respond-section" class="py-16 px-4 bg-gray-50">
	<div class="max-w-6xl mx-auto">
		<div class="text-center mb-16">
			<h2 class="text-3xl md:text-4xl font-bold text-navy mb-6">How We Respond to Crisis</h2>
			<p class="text-xl text-gray-700 max-w-3xl mx-auto">Our proven 4-stage emergency response process</p>
		</div>

		<!-- Connecting Line (Desktop only) -->
		<div class="hidden lg:block relative mb-8">
			<div class="absolute top-8 left-0 right-0 h-1 bg-gray-300 mx-auto" style="width: 85%; left: 7.5%;"></div>
			<div
				class="absolute top-8 left-0 h-1 bg-orange-custom transition-all duration-2000 ease-out"
				style="width: {sectionVisible ? '85%' : '0%'}; left: 7.5%;"
			></div>
		</div>

		<div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
			<!-- Stage 1 -->
			<div
				class="text-center group stage-card {sectionVisible ? 'stage-visible' : ''}"
				style="animation-delay: 0ms;"
			>
				<div class="bg-orange-custom text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-125 group-hover:shadow-xl number-circle">
					<span class="text-2xl font-bold">1</span>
				</div>
				<h3 class="text-xl font-bold text-navy mb-3">Alert & Assess</h3>
				<p class="text-gray-600 text-sm mb-4">24/7 monitoring and rapid situation assessment</p>
				<div class="text-orange-custom text-sm font-semibold">≤ 2 hours</div>
			</div>

			<!-- Stage 2 -->
			<div
				class="text-center group stage-card {sectionVisible ? 'stage-visible' : ''}"
				style="animation-delay: 200ms;"
			>
				<div class="bg-navy text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-125 group-hover:shadow-xl number-circle">
					<span class="text-2xl font-bold">2</span>
				</div>
				<h3 class="text-xl font-bold text-navy mb-3">Mobilize Teams</h3>
				<p class="text-gray-600 text-sm mb-4">Deploy volunteers and essential supplies</p>
				<div class="text-orange-custom text-sm font-semibold">≤ 8 hours</div>
			</div>

			<!-- Stage 3 -->
			<div
				class="text-center group stage-card {sectionVisible ? 'stage-visible' : ''}"
				style="animation-delay: 400ms;"
			>
				<div class="bg-orange-custom text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-125 group-hover:shadow-xl number-circle">
					<span class="text-2xl font-bold">3</span>
				</div>
				<h3 class="text-xl font-bold text-navy mb-3">Immediate Relief</h3>
				<p class="text-gray-600 text-sm mb-4">Food, shelter, medical aid, and rescue operations</p>
				<div class="text-orange-custom text-sm font-semibold">≤ 24 hours</div>
			</div>

			<!-- Stage 4 -->
			<div
				class="text-center group stage-card {sectionVisible ? 'stage-visible' : ''}"
				style="animation-delay: 600ms;"
			>
				<div class="bg-navy text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-125 group-hover:shadow-xl number-circle">
					<span class="text-2xl font-bold">4</span>
				</div>
				<h3 class="text-xl font-bold text-navy mb-3">Rehabilitation</h3>
				<p class="text-gray-600 text-sm mb-4">Long-term support and community rebuilding</p>
				<div class="text-orange-custom text-sm font-semibold">Ongoing</div>
			</div>
		</div>
	</div>
</section>

<style>
	:global(:root) {
		--navy: #1a237e;
		--orange: #ff6b35;
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

	.text-orange-custom {
		color: var(--orange);
	}

	/* Stage Card Animation */
	.stage-card {
		opacity: 0;
		transform: translateY(50px);
		transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.stage-card.stage-visible {
		opacity: 1;
		transform: translateY(0);
	}

	/* Number Circle Pulse Animation */
	.number-circle {
		animation: pulse-subtle 3s ease-in-out infinite;
	}

	@keyframes pulse-subtle {
		0%, 100% {
			box-shadow: 0 0 0 0 rgba(255, 107, 53, 0.4);
		}
		50% {
			box-shadow: 0 0 0 10px rgba(255, 107, 53, 0);
		}
	}

	.bg-navy .number-circle {
		animation: pulse-subtle-navy 3s ease-in-out infinite;
	}

	@keyframes pulse-subtle-navy {
		0%, 100% {
			box-shadow: 0 0 0 0 rgba(26, 35, 126, 0.4);
		}
		50% {
			box-shadow: 0 0 0 10px rgba(26, 35, 126, 0);
		}
	}

	/* Hover effect on entire card */
	.group:hover {
		transform: translateY(-8px);
		transition: transform 0.3s ease;
	}

	/* Duration utility for connecting line */
	.duration-2000 {
		transition-duration: 2000ms;
	}

	/* Mobile-specific adjustments for 2x2 grid */
	@media (max-width: 768px) {
		.w-16.h-16 {
			width: 3rem;
			height: 3rem;
		}

		.text-2xl {
			font-size: 1.25rem;
		}

		.text-xl {
			font-size: 1rem;
		}

		.text-sm {
			font-size: 0.75rem;
		}

		.mb-6 {
			margin-bottom: 1rem;
		}

		.mb-3 {
			margin-bottom: 0.5rem;
		}

		.gap-8 {
			gap: 1rem;
		}

		.px-4 {
			padding-left: 0.5rem;
			padding-right: 0.5rem;
		}

		/* Reduce animation intensity on mobile */
		.stage-card {
			transform: translateY(30px);
		}

		.group:hover {
			transform: translateY(-4px);
		}
	}

	/* Tablet adjustments */
	@media (max-width: 1024px) and (min-width: 769px) {
		/* Adjust connecting line for tablet 2x2 grid */
		.hidden.lg\:block {
			display: none !important;
		}
	}
</style>
