<script lang="ts">
	import { onMount } from 'svelte';
	import { getPublishedCampaigns } from '$lib/firestore';
	import type { Campaign } from '$lib/types/campaign';

	// Tab state
	let activeTab = $state<'current' | 'past'>('current');

	// Campaign data
	let campaigns = $state<Campaign[]>([]);
	let loading = $state(true);

	onMount(async () => {
		try {
			loading = true;
			campaigns = await getPublishedCampaigns();
		} catch (error) {
			console.error('Error loading campaigns:', error);
		} finally {
			loading = false;
		}
	});

	// Filtered campaigns based on active tab
	const currentCampaigns = $derived(
		campaigns.filter((c) => c.status === 'ongoing')
	);
	const pastCampaigns = $derived(
		campaigns.filter((c) => c.status === 'completed' || c.status === 'seasonal')
	);
	const displayedCampaigns = $derived(
		activeTab === 'current' ? currentCampaigns : pastCampaigns
	);
</script>

<svelte:head>
	<title>Our Campaigns - Sikh Aid Charitable Trust</title>
	<meta name="description" content="Discover our ongoing humanitarian campaigns and relief efforts across India. From Langar Aid to emergency response, see how SikhAid is making a difference." />
</svelte:head>

<main class="pt-32 min-h-screen">
	<!-- Hero Section with Grid Pattern -->
	<section class="hero-section py-16 px-4 text-white relative overflow-hidden">
		<!-- Grid Pattern Overlay -->
		<div class="grid-pattern"></div>

		<div class="max-w-6xl mx-auto text-center relative z-10">
			<h1 class="text-4xl md:text-6xl font-bold mb-6">{activeTab === 'current' ? 'Current Campaigns' : 'Past Campaigns'}</h1>

			<!-- Breadcrumb -->
			<nav class="text-sm md:text-base">
				<a href="/" class="hover:text-orange-custom transition-colors">Home</a>
				<span class="mx-2">/</span>
				<span class="text-orange-custom">{activeTab === 'current' ? 'Current Campaign' : 'Past Campaign'}</span>
			</nav>
		</div>
	</section>

	<!-- Tabbed Navigation -->
	<section class="bg-gray-50 border-b border-gray-200">
		<div class="max-w-6xl mx-auto px-4">
			<div class="flex justify-center gap-0">
				<button
					type="button"
					class="tab-button {activeTab === 'current' ? 'active' : ''}"
					onclick={() => activeTab = 'current'}
				>
					Current Campaign
				</button>
				<button
					type="button"
					class="tab-button {activeTab === 'past' ? 'active' : ''}"
					onclick={() => activeTab = 'past'}
				>
					Past Campaign
				</button>
			</div>
		</div>
	</section>

	<!-- Campaigns Display -->
	<section class="py-16 px-4 bg-white">
		<div class="max-w-7xl mx-auto">
			{#if loading}
				<div class="text-center py-12">
					<p class="text-gray-600">Loading campaigns...</p>
				</div>
			{:else if displayedCampaigns.length === 0}
				<div class="text-center py-12">
					<p class="text-gray-600">No {activeTab} campaigns available at the moment.</p>
				</div>
			{:else}
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{#each displayedCampaigns as campaign}
					<article class="campaign-card bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 card-solid-bg">
						<div class="flex flex-col sm:flex-row h-full">
							<!-- Image Section -->
							<div class="sm:w-2/5 relative overflow-hidden">
								<img
									src={campaign.image}
									alt={campaign.title}
									class="w-full h-48 sm:h-full object-cover transition-transform duration-300 hover:scale-105"
								/>
								<div class="absolute top-3 left-3">
									<span class="bg-navy text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-lg inline-flex items-center whitespace-nowrap ">
										{campaign.category}
									</span>
								</div>
							</div>

							<!-- Content Section -->
							<div class="sm:w-3/5 p-5">
								<div class="h-full flex flex-col">
									<!-- Header -->
									<div class="mb-4">
										<div class="flex items-center gap-2 mb-2">
											<h3 class="text-lg font-bold text-navy hover:text-orange-custom transition-colors line-clamp-2">
												{campaign.title}
											</h3>
											<span class="bg-{campaign.status === 'ongoing' ? 'green' : campaign.status === 'seasonal' ? 'orange-custom' : 'gray'}-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow">
												{campaign.status.toUpperCase()}
											</span>
										</div>
										<p class="text-sm text-gray-600 leading-relaxed line-clamp-2">
											{campaign.shortDescription}
										</p>
									</div>

									<!-- Impact Stats -->
									<div class="grid grid-cols-2 gap-3 mb-4">
										{#each campaign.impactStats.slice(0, 2) as stat}
											<div class="bg-gray-50 p-3 rounded-lg text-center border">
												<div class="text-xl mb-1">{stat.icon}</div>
												<div class="text-base font-bold text-navy">{stat.value}</div>
												<div class="text-xs text-gray-600">{stat.label}</div>
											</div>
										{/each}
									</div>

									<!-- Action Buttons -->
									<div class="mt-auto">
										<div class="flex flex-col sm:flex-row gap-2">
											<a
												href="/campaigns/{campaign.slug}"
												class="bg-navy hover:bg-navy-dark text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-all duration-200 text-center shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
											>
												Know More
											</a>
											<a
												href="https://donate.sikhaid.ngo/"
												class="border-2 border-orange-custom text-orange-custom hover:bg-orange-custom hover:text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-all duration-200 text-center shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
											>
												Support Campaign
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</article>
					{/each}
				</div>
			{/if}
		</div>
	</section>

	<!-- Call to Action -->
	<section class="py-16 px-4" style="background: linear-gradient(to right, var(--navy), var(--orange));">
		<div class="max-w-4xl mx-auto text-center text-white">
			<h2 class="text-3xl md:text-4xl font-bold mb-6">Join Our Mission</h2>
			<p class="text-xl mb-8 text-gray-200">
				Every campaign needs dedicated volunteers and generous supporters. Be part of the change you want to see in the world.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="https://donate.sikhaid.ngo/"
					class="bg-white text-navy font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
				>
					Donate to Our Campaigns
				</a>
				<a
					href="/contact"
					class="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-navy transition-colors"
				>
					Volunteer With Us
				</a>
			</div>
		</div>
	</section>
</main>

<style>
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

	.hover\:bg-orange-custom:hover {
		background-color: var(--orange);
	}

	.border-orange-custom {
		border-color: var(--orange);
	}

	.hover\:text-orange-custom:hover {
		color: var(--orange);
	}

	/* Hero Section with Grid Pattern */
	.hero-section {
		background-color: var(--navy);
		position: relative;
	}

	.grid-pattern {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0.4;
		background-image:
			/* Vertical lines */
			repeating-linear-gradient(
				90deg,
				transparent,
				transparent 49px,
				rgba(255, 255, 255, 0.1) 49px,
				rgba(255, 255, 255, 0.1) 50px
			),
			/* Horizontal lines */
			repeating-linear-gradient(
				0deg,
				transparent,
				transparent 49px,
				rgba(255, 255, 255, 0.1) 49px,
				rgba(255, 255, 255, 0.1) 50px
			);
		background-size: 50px 50px;
	}

	/* Tabbed Navigation */
	.tab-button {
		padding: 16px 32px;
		font-size: 16px;
		font-weight: 500;
		color: #6b7280;
		background: transparent;
		border: none;
		border-bottom: 3px solid transparent;
		cursor: pointer;
		transition: all 0.3s ease;
		position: relative;
	}

	.tab-button:hover {
		color: var(--navy);
	}

	.tab-button.active {
		color: var(--orange);
		border-bottom-color: var(--orange);
		font-weight: 600;
	}

	/* Responsive tab buttons */
	@media (max-width: 640px) {
		.tab-button {
			padding: 12px 20px;
			font-size: 14px;
		}
	}

	/* Campaign Cards */
	.campaign-card {
		max-height: 320px;
		min-height: 280px;
	}

	/* Line clamp utilities */
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* Enhanced responsive design for cards */
	@media (max-width: 640px) {
		.campaign-card {
			max-height: none;
			min-height: auto;
		}
	}

	@media (max-width: 1024px) {
		.lg\:w-2\/5 {
			width: 100%;
		}
		.lg\:w-3\/5 {
			width: 100%;
		}
		.lg\:flex-row {
			flex-direction: column;
		}
	}

	/* Professional button hover effects */
	.transform.hover\:-translate-y-0\.5:hover {
		transform: translateY(-2px);
	}

	/* Card elevation system */
	article {
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}

	article:hover {
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
	}

	/* Improved status badge styling */
	.bg-green-500 {
		background-color: #10b981;
	}

	.bg-gray-500 {
		background-color: #6b7280;
	}

	/* Enhanced spacing for mobile */
	@media (max-width: 640px) {
		.p-8 {
			padding: 1.5rem;
		}

		.text-2xl {
			font-size: 1.5rem;
			line-height: 2rem;
		}

		.gap-3 {
			gap: 0.5rem;
		}
	}
</style>