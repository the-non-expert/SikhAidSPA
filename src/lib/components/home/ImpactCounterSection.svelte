<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';

	let sectionElement: HTMLElement;
	let displayNumber = 0;
	let animationStarted = false;
	let activeTab = 'relief-aid';
	let tabAnimationsStarted: { [key: string]: boolean } = {};

	const targetNumber = 500000;
	const animationDuration = 2500; // 2.5 seconds

	// Tab configuration with stats, background images, and icons
	const tabs = {
		'relief-aid': {
			title: 'Relief Aid',
			backgroundImage: 'https://i.ibb.co/B20Q7cBV/Hero1.jpg',
			stats: [
				{ label: 'People Rescued', value: 250000, displayValue: '250,000+', icon: 'heroicons:lifebuoy' },
				{ label: 'States Covered', value: 19, displayValue: '19+', icon: 'heroicons:map-pin' },
				{ label: 'Disasters Addressed', value: 15, displayValue: '15+', icon: 'heroicons:exclamation-triangle' },
				{ label: 'Compensation Provided', value: 300000, displayValue: '300,000+', icon: 'heroicons:currency-dollar' }
			]
		},
		'healthcare': {
			title: 'Healthcare',
			backgroundImage: 'https://i.ibb.co/SXd9fQTp/172.png',
			stats: [
				{ label: 'Medical Camps', value: 20, displayValue: '20+', icon: 'heroicons:building-office-2' },
				{ label: 'Patients Treated', value: 3500, displayValue: '3,500+', icon: 'heroicons:users' },
				{ label: 'Emergency Transports', value: 150, displayValue: '150+', icon: 'heroicons:truck' },
				{ label: 'Blood Units', value: 2200, displayValue: '2,200+', icon: 'lucide:droplet' }
			]
		},
		'education': {
			title: 'Education',
			backgroundImage: 'https://i.ibb.co/LhgSyWJJ/171.png',
			stats: [
				{ label: 'Students Supported', value: 3500, displayValue: '3,500+', icon: 'heroicons:academic-cap' },
				{ label: 'Schools Assisted', value: 20, displayValue: '20+', icon: 'heroicons:building-library' },
				{ label: 'Scholarships', value: 10, displayValue: '10+', icon: 'heroicons:trophy' },
				{ label: 'Education Kits', value: 275, displayValue: '275+', icon: 'heroicons:book-open' }
			]
		},
		'covid-relief': {
			title: 'Covid Relief',
			backgroundImage: 'https://i.ibb.co/n8bLzJWC/Oxygen-Main.png',
			stats: [
				{ label: 'Ration Kits', value: 50000, displayValue: '50,000+', icon: 'heroicons:cube' },
				{ label: 'Oxygen Cylinders', value: 5000, displayValue: '5,000+', icon: 'lucide:wind' },
				{ label: 'Concentrators', value: 2000, displayValue: '2,000+', icon: 'heroicons:heart' },
				{ label: 'Success Rate', value: 92, displayValue: '92%', icon: 'heroicons:check-circle' }
			]
		}
	};

	// Store animated values for each tab
	let tabDisplayValues: { [key: string]: { [index: number]: number } } = {};

	function animateCounter() {
		if (animationStarted) return;
		animationStarted = true;

		const startTime = Date.now();
		const startNumber = 0;

		function updateNumber() {
			const currentTime = Date.now();
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / animationDuration, 1);

			// Easing function for smooth animation
			const easeOutCubic = 1 - Math.pow(1 - progress, 3);

			displayNumber = Math.floor(startNumber + (targetNumber * easeOutCubic));

			if (progress < 1) {
				requestAnimationFrame(updateNumber);
			} else {
				displayNumber = targetNumber;
			}
		}

		requestAnimationFrame(updateNumber);
	}

	function animateTabCounters(tabKey: string) {
		if (tabAnimationsStarted[tabKey]) return;
		tabAnimationsStarted[tabKey] = true;

		const tab = tabs[tabKey];
		if (!tabDisplayValues[tabKey]) {
			tabDisplayValues[tabKey] = {};
		}

		tab.stats.forEach((stat, index) => {
			const startTime = Date.now() + (index * 200); // Stagger animations
			const startNumber = 0;

			function updateTabNumber() {
				const currentTime = Date.now();
				const elapsed = Math.max(0, currentTime - startTime);
				const progress = Math.min(elapsed / animationDuration, 1);

				if (elapsed > 0) {
					const easeOutCubic = 1 - Math.pow(1 - progress, 3);
					tabDisplayValues[tabKey][index] = Math.floor(startNumber + (stat.value * easeOutCubic));
				}

				if (progress < 1) {
					requestAnimationFrame(updateTabNumber);
				} else {
					tabDisplayValues[tabKey][index] = stat.value;
				}
			}

			requestAnimationFrame(updateTabNumber);
		});
	}

	function formatNumber(num: number): string {
		if (num >= 1000000) {
			return (num / 1000000).toFixed(0) + ',000,000+';
		}
		return num.toLocaleString() + '+';
	}

	function formatTabStat(value: number, originalDisplay: string): string {
		if (originalDisplay.includes('%')) {
			return value + '%';
		}
		if (originalDisplay.includes(',000,000+')) {
			return (value / 1000000).toFixed(1) + ',000,000+';
		}
		if (originalDisplay.includes(',000+')) {
			return (value / 1000).toFixed(0) + ',000+';
		}
		return value.toLocaleString() + '+';
	}

	function setActiveTab(tabKey: string) {
		activeTab = tabKey;
		animateTabCounters(tabKey);
	}

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !animationStarted) {
						animateCounter();
						// Start animation for the first tab
						setTimeout(() => {
							animateTabCounters(activeTab);
						}, 1000);
					}
				});
			},
			{ threshold: 0.5 }
		);

		if (sectionElement) {
			observer.observe(sectionElement);
		}

		return () => {
			if (sectionElement) {
				observer.unobserve(sectionElement);
			}
		};
	});
</script>

<!-- Impact Counter Section -->
<section bind:this={sectionElement} class="py-10 px-4 bg-white">
	<div class="max-w-4xl mx-auto text-center">
		<h2 class="text-lg md:text-xl font-medium text-orange-custom mb-2 italic">
			Our Focus Areas
		</h2>

		<h3 class="text-2xl md:text-3xl font-bold text-navy mb-6">
			Total lives impacted
		</h3>

		<div class="text-5xl md:text-6xl lg:text-7xl font-bold text-navy mb-16">
			{formatNumber(displayNumber)}
		</div>
	</div>

	<!-- Tabbed Statistics Section -->
	<div class="max-w-6xl mx-auto">
		<!-- Tab Navigation - Horizontal Scrollable -->
		<div class="relative mb-8">
			<div class="flex overflow-x-auto scrollbar-hide space-x-4 px-4 pb-2" style="scroll-snap-type: x mandatory;">
				{#each Object.entries(tabs) as [tabKey, tab]}
					<button
						on:click={() => setActiveTab(tabKey)}
						class="tab-button mt-4 flex-shrink-0 px-8 py-4 font-semibold text-sm rounded-xl transition-all duration-300 min-w-[140px] {activeTab === tabKey
							? 'bg-orange-custom text-white shadow-lg transform scale-105'
							: 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md border border-gray-200'}"
						style="scroll-snap-align: center;"
					>
						{tab.title}
					</button>
				{/each}
			</div>
		</div>

		<!-- Tab Content -->
		<div class="relative h-[400px] md:h-[300px] rounded-xl overflow-hidden shadow-xl">
			{#each Object.entries(tabs) as [tabKey, tab]}
				<div
					class="absolute inset-0 transition-opacity duration-500 {activeTab === tabKey ? 'opacity-100' : 'opacity-0'}"
				>
					<!-- Background Image -->
					<div
						class="absolute inset-0 bg-cover bg-center bg-no-repeat"
						style="background-image: url('{tab.backgroundImage}');"
					>
						<!-- Enhanced overlay for better contrast -->
						<div class="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70"></div>
					</div>

					<!-- Statistics Grid -->
					<div class="relative z-10 h-full flex items-center justify-center p-4">
						<div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full max-w-5xl">
							{#each tab.stats as stat, index}
								<div class="text-center bg-white/10 rounded-xl p-4 border border-white/20">
									<div class="flex flex-col items-center space-y-3">
										<!-- Icon -->
										<div class="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full">
											<Icon icon={stat.icon} class="w-6 h-6 text-white" />
										</div>

										<!-- Number -->
										<div class="text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg">
											{#if tabDisplayValues[tabKey] && tabDisplayValues[tabKey][index] !== undefined}
												{formatTabStat(tabDisplayValues[tabKey][index], stat.displayValue)}
											{:else}
												0
											{/if}
										</div>

										<!-- Label -->
										<div class="text-xs md:text-sm text-white/90 font-medium leading-tight">
											{stat.label}
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
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

	.bg-orange-custom {
		background-color: var(--orange);
	}

	/* Hide scrollbar for horizontal scroll */
	.scrollbar-hide {
		-ms-overflow-style: none;  /* Internet Explorer 10+ */
		scrollbar-width: none;  /* Firefox */
	}
	.scrollbar-hide::-webkit-scrollbar {
		display: none;  /* Safari and Chrome */
	}

	/* Smooth tab transitions */
	.transition-opacity {
		transition-property: opacity;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 500ms;
	}

	/* Enhanced button hover effects */
	.tab-button {
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		backdrop-filter: blur(10px);
	}

	.tab-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
	}

	.tab-button:active {
		transform: translateY(0);
	}

	/* Glass morphism effects for stat cards */
	.backdrop-blur-sm {
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
	}

	/* Enhanced drop shadows */
	.drop-shadow-lg {
		filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
	}

	/* Responsive grid adjustments */
	@media (max-width: 768px) {
		.grid-cols-2 {
			gap: 1rem;
		}

		.text-2xl {
			font-size: 1.25rem;
		}

		.w-12.h-12 {
			width: 2.5rem;
			height: 2.5rem;
		}

		.w-6.h-6 {
			width: 1.25rem;
			height: 1.25rem;
		}

		.p-4 {
			padding: 0.75rem;
		}

		.space-y-3 > * + * {
			margin-top: 0.5rem;
		}
	}

	@media (max-width: 640px) {
		.min-w-\[140px\] {
			min-width: 120px;
		}

		.px-8 {
			padding-left: 1rem;
			padding-right: 1rem;
		}

		.py-4 {
			padding-top: 0.75rem;
			padding-bottom: 0.75rem;
		}

		.max-w-5xl {
			max-width: 100%;
		}

		.gap-6 {
			gap: 0.75rem;
		}
	}

	/* Background image optimization */
	.bg-cover {
		background-size: cover;
		background-attachment: fixed;
	}

	@media (max-width: 768px) {
		.bg-cover {
			background-attachment: scroll;
		}
	}

	/* Smooth scroll behavior for horizontal tabs */
	.overflow-x-auto {
		scroll-behavior: smooth;
		-webkit-overflow-scrolling: touch;
	}

	/* Enhanced focus states for accessibility */
	.tab-button:focus {
		outline: 2px solid var(--orange);
		outline-offset: 2px;
	}

	/* Animation delays for staggered stat reveals */
	.grid > div:nth-child(1) { animation-delay: 0.1s; }
	.grid > div:nth-child(2) { animation-delay: 0.2s; }
	.grid > div:nth-child(3) { animation-delay: 0.3s; }
	.grid > div:nth-child(4) { animation-delay: 0.4s; }

	/* Hover effect for stat cards */
	.backdrop-blur-sm:hover {
		background-color: rgba(255, 255, 255, 0.15);
		transform: translateY(-2px);
		transition: all 0.3s ease;
	}
</style>