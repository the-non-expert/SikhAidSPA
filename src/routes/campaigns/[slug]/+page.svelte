<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { getCampaignBySlug, campaigns } from '$lib/data/campaigns.js';

	let currentCampaign = null;
	let slug = '';
	let relatedCampaigns = [];

	onMount(() => {
		slug = $page.params.slug;
		currentCampaign = getCampaignBySlug(slug);

		if (!currentCampaign) {
			goto('/campaigns');
		} else {
			// Get 2 related campaigns (excluding current one)
			relatedCampaigns = campaigns
				.filter(campaign => campaign.slug !== slug)
				.slice(0, 2);
		}
	});

	function getStatusColor(status) {
		switch (status) {
			case 'ongoing':
				return 'bg-green-500';
			case 'seasonal':
				return 'bg-orange-custom';
			case 'completed':
				return 'bg-gray-500';
			default:
				return 'bg-blue-500';
		}
	}
</script>

<svelte:head>
	<title>{currentCampaign?.title || 'Campaign'} - SikhAid Campaigns</title>
	<meta name="description" content={currentCampaign?.shortDescription || 'SikhAid Charitable Trust humanitarian campaign'} />
</svelte:head>

{#if currentCampaign}

	<Header />

	<main class="pt-32 min-h-screen">
		<!-- Hero Section -->
		<section class="py-16 px-4 bg-gray-50">
			<div class="max-w-6xl mx-auto">
				<!-- Breadcrumb -->
				<nav class="text-sm text-gray-600 mb-6">
					<a href="/" class="hover:text-navy">Home</a>
					<span class="mx-2">→</span>
					<a href="/campaigns" class="hover:text-navy">Campaigns</a>
					<span class="mx-2">→</span>
					<span class="text-gray-900">{currentCampaign.title}</span>
				</nav>

				<div class="bg-white rounded-xl shadow-xl overflow-hidden">
					<div class="relative">
						<img
							src={currentCampaign.image}
							alt={currentCampaign.title}
							class="w-full h-64 md:h-96 object-cover"
						/>
						<div class="absolute top-6 left-6">
							<span class="bg-white text-navy px-4 py-2 rounded-full text-sm font-bold shadow-lg">
								{currentCampaign.category}
							</span>
						</div>
						<div class="absolute top-6 right-6">
							<span class="{getStatusColor(currentCampaign.status)} text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
								{currentCampaign.status.toUpperCase()}
							</span>
						</div>
					</div>

					<div class="p-8 md:p-12">
						<h1 class="text-3xl md:text-5xl font-bold text-navy mb-4">{currentCampaign.title}</h1>
						<p class="text-xl text-gray-600 mb-8">{currentCampaign.subtitle}</p>

						<!-- Impact Statistics -->
						<div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
							{#each currentCampaign.impactStats as stat}
								<div class="text-center bg-gray-50 p-6 rounded-lg">
									<div class="text-3xl mb-2">{stat.icon}</div>
									<div class="text-2xl font-bold text-navy mb-1">{stat.value}</div>
									<div class="text-sm text-gray-600">{stat.label}</div>
								</div>
							{/each}
						</div>

						<!-- Action Buttons -->
						<div class="flex flex-col sm:flex-row gap-4 justify-center">
							<a
								href="/donate"
								class="bg-orange-custom hover:bg-orange-dark text-white font-bold px-8 py-4 rounded-lg transition-colors text-center"
							>
								Donate to This Campaign
							</a>
							<a
								href="/contact"
								class="border-2 border-navy text-navy hover:bg-navy hover:text-white font-semibold px-8 py-4 rounded-lg transition-colors text-center"
							>
								Volunteer for This Cause
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Campaign Details -->
		<section class="py-16 px-4">
			<div class="max-w-4xl mx-auto">
				<div class="bg-white rounded-lg shadow-lg p-8 md:p-12">
					<h2 class="text-3xl font-bold text-navy mb-6">About This Campaign</h2>
					<div class="prose prose-lg max-w-none text-gray-700 leading-relaxed">
						{@html currentCampaign.fullDescription.replace(/\n\s+/g, '</p><p class="mb-4">')}
					</div>
				</div>
			</div>
		</section>

		<!-- How It Works -->
		<section class="py-16 px-4 bg-gray-50">
			<div class="max-w-6xl mx-auto">
				<h2 class="text-3xl md:text-4xl font-bold text-navy text-center mb-12">How It Works</h2>

				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{#each currentCampaign.howItWorks as step}
						<div class="bg-white p-6 rounded-lg shadow-md text-center">
							<div class="bg-navy text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
								{step.step}
							</div>
							<h3 class="text-lg font-bold text-navy mb-3">{step.title}</h3>
							<p class="text-gray-600 text-sm leading-relaxed">{step.description}</p>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- Photo Gallery -->
		<section class="py-16 px-4">
			<div class="max-w-6xl mx-auto">
				<h2 class="text-3xl md:text-4xl font-bold text-navy text-center mb-12">Campaign Gallery</h2>

				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each currentCampaign.gallery as photo}
						<div class="bg-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
							<img
								src={photo.src}
								alt={photo.alt}
								class="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
							/>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- Donation CTA -->
		<section class="py-16 px-4" style="background: linear-gradient(to right, var(--navy), var(--orange));">
			<div class="max-w-4xl mx-auto text-center text-white">
				<h2 class="text-3xl md:text-4xl font-bold mb-6">Support {currentCampaign.title}</h2>
				<p class="text-xl mb-8 text-gray-200">
					Your donation directly impacts the lives of those we serve. Every contribution, no matter the size, makes a meaningful difference in someone's life.
				</p>
				<div class="bg-white bg-opacity-10 rounded-lg p-6 mb-8">
					<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
						{#each currentCampaign.impactStats as stat}
							<div class="text-center">
								<div class="text-2xl mb-1">{stat.icon}</div>
								<div class="text-lg font-bold">{stat.value}</div>
								<div class="text-xs text-gray-200">{stat.label}</div>
							</div>
						{/each}
					</div>
				</div>
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<a
						href="/donate"
						class="bg-white text-navy font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
					>
						Donate Now
					</a>
					<a
						href="/contact"
						class="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-navy transition-colors"
					>
						Get Involved
					</a>
				</div>
			</div>
		</section>

		<!-- Related Campaigns -->
		{#if relatedCampaigns.length > 0}
			<section class="py-16 px-4 bg-gray-50">
				<div class="max-w-6xl mx-auto">
					<h2 class="text-3xl font-bold text-navy text-center mb-12">Other Campaigns</h2>

					<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
						{#each relatedCampaigns as campaign}
							<article class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
								<img src={campaign.image} alt={campaign.title} class="w-full h-48 object-cover" />
								<div class="p-6">
									<div class="mb-3">
										<span class="bg-navy text-white text-xs font-bold px-3 py-1 rounded-full">
											{campaign.category}
										</span>
									</div>
									<h3 class="text-xl font-bold text-navy mb-3">
										<a href="/campaigns/{campaign.slug}" class="hover:text-orange-custom transition-colors">
											{campaign.title}
										</a>
									</h3>
									<p class="text-gray-600 text-sm mb-4 line-clamp-2">{campaign.shortDescription}</p>
									<div class="flex gap-2">
										<a
											href="/campaigns/{campaign.slug}"
											class="bg-navy hover:bg-navy-dark text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
										>
											Learn More
										</a>
									</div>
								</div>
							</article>
						{/each}
					</div>
				</div>
			</section>
		{/if}
	</main>

	<Footer />
{:else}
	<div class="min-h-screen flex items-center justify-center">
		<div class="text-center">
			<h1 class="text-2xl font-bold text-gray-900 mb-4">Campaign not found</h1>
			<a href="/campaigns" class="text-navy hover:underline">← Back to Campaigns</a>
		</div>
	</div>
{/if}

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

	.hover\:bg-navy:hover {
		background-color: var(--navy);
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

	.hover\:bg-orange-dark:hover {
		background-color: var(--orange-dark);
	}

	.border-orange-custom {
		border-color: var(--orange);
	}

	.hover\:text-orange-custom:hover {
		color: var(--orange);
	}

	.border-navy {
		border-color: var(--navy);
	}

	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>