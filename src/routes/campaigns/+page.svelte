<script lang="ts">
	import { campaigns, featuredCampaign } from '$lib/data/campaigns.js';
</script>

<svelte:head>
	<title>Our Campaigns - Sikh Aid Charitable Trust</title>
	<meta name="description" content="Discover our ongoing humanitarian campaigns and relief efforts across India. From Langar Aid to emergency response, see how SikhAid is making a difference." />
</svelte:head>

<main class="pt-32 min-h-screen">
	<!-- Hero Section -->
	<section class="py-16 px-4 bg-navy text-white">
		<div class="max-w-6xl mx-auto text-center">
			<h1 class="text-4xl md:text-6xl font-bold mb-6">Our Campaigns</h1>
			<p class="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
				Discover the diverse humanitarian initiatives that drive our mission to serve India with compassion, dignity, and unwavering commitment to those in need.
			</p>
		</div>
	</section>

	<!-- Featured Campaign -->
	<section class="py-16 px-4 bg-gray-50">
		<div class="max-w-6xl mx-auto">
			<div class="text-center mb-12">
				<h2 class="text-3xl md:text-4xl font-bold text-navy mb-4">Featured Campaign</h2>
				<p class="text-lg text-gray-600 max-w-2xl mx-auto">
					Our current priority response - providing immediate relief and long-term rehabilitation support.
				</p>
			</div>

			<div class="bg-white rounded-xl shadow-xl overflow-hidden max-w-4xl mx-auto">
				<div class="md:flex">
					<div class="md:w-1/2">
						<img
							src={featuredCampaign.image}
							alt={featuredCampaign.title}
							class="w-full h-64 md:h-full object-cover"
						/>
					</div>
					<div class="md:w-1/2 p-8">
						<div class="mb-4">
							<span class="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
								{featuredCampaign.category}
							</span>
							<span class="inline-block bg-orange-custom text-white text-xs font-bold px-3 py-1 rounded-full mb-3 ml-2">
								{featuredCampaign.status.toUpperCase()}
							</span>
						</div>
						<h3 class="text-2xl md:text-3xl font-bold text-navy mb-4">{featuredCampaign.title}</h3>
						<p class="text-gray-600 mb-6 leading-relaxed">{featuredCampaign.shortDescription}</p>

						<div class="grid grid-cols-2 gap-4 mb-6">
							{#each featuredCampaign.impactStats.slice(0, 4) as stat}
								<div class="text-center">
									<div class="text-2xl mb-1">{stat.icon}</div>
									<div class="text-lg font-bold text-navy">{stat.value}</div>
									<div class="text-xs text-gray-500">{stat.label}</div>
								</div>
							{/each}
						</div>

						<div class="flex flex-col sm:flex-row gap-3">
							<a
								href="/campaigns/{featuredCampaign.slug}"
								class="bg-navy hover:bg-navy-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors text-center"
							>
								Learn More
							</a>
							<a
								href="/donate"
								class="bg-orange-custom hover:bg-orange-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors text-center"
							>
								Donate Now
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- All Campaigns Grid -->
	<section class="py-16 px-4 bg-white">
		<div class="max-w-6xl mx-auto">
			<div class="text-center mb-12">
				<h2 class="text-3xl md:text-4xl font-bold text-navy mb-4">Our Core Campaigns</h2>
				<p class="text-lg text-gray-600 max-w-2xl mx-auto">
					Ongoing humanitarian initiatives that form the backbone of our service to communities across India.
				</p>
			</div>

			<div class="space-y-8">
				{#each campaigns as campaign}
					<article class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
						<div class="flex flex-col lg:flex-row">
							<!-- Image Section -->
							<div class="lg:w-2/5 relative overflow-hidden">
								<img
									src={campaign.image}
									alt={campaign.title}
									class="w-full h-64 lg:h-full object-cover transition-transform duration-300 hover:scale-105"
								/>
								<div class="absolute top-4 left-4">
									<span class="bg-navy text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
										{campaign.category}
									</span>
								</div>
								<div class="absolute top-4 right-4">
									<span class="bg-{campaign.status === 'ongoing' ? 'green' : campaign.status === 'seasonal' ? 'orange-custom' : 'gray'}-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
										{campaign.status.toUpperCase()}
									</span>
								</div>
							</div>

							<!-- Content Section -->
							<div class="lg:w-3/5 p-8">
								<div class="h-full flex flex-col">
									<!-- Header -->
									<div class="mb-6">
										<h3 class="text-2xl font-bold text-navy mb-3 hover:text-orange-custom transition-colors">
											{campaign.title}
										</h3>
										<p class="text-gray-600 leading-relaxed line-clamp-3">
											{campaign.shortDescription}
										</p>
									</div>

									<!-- Impact Stats -->
									<div class="grid grid-cols-2 gap-4 mb-8">
										{#each campaign.impactStats.slice(0, 2) as stat}
											<div class="bg-gray-50 p-4 rounded-lg text-center border">
												<div class="text-2xl mb-2">{stat.icon}</div>
												<div class="text-lg font-bold text-navy">{stat.value}</div>
												<div class="text-sm text-gray-600">{stat.label}</div>
											</div>
										{/each}
									</div>

									<!-- Action Buttons -->
									<div class="mt-auto">
										<div class="flex flex-col sm:flex-row gap-3">
											<a
												href="/campaigns/{campaign.slug}"
												class="bg-navy hover:bg-navy-dark text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 text-center shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
											>
												Know More
											</a>
											<a
												href="/donate"
												class="border-2 border-orange-custom text-orange-custom hover:bg-orange-custom hover:text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 text-center shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
											>
												Support This Campaign
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</article>
				{/each}
			</div>
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
					href="/donate"
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

	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* Enhanced responsive design */
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