<script lang="ts">
	import { setDonationAmount } from '$lib/stores/donation';
</script>

<!-- Current Campaign Section -->
<section class="py-16 px-4 bg-white">
	<div class="max-w-6xl mx-auto">
		<div class="bg-orange-50 border border-orange-200 rounded-xl p-8 mb-12">
			<div class="text-center mb-8">
				<div class="inline-flex items-center bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
					🚨 ACTIVE CAMPAIGN
				</div>
				<h2 class="text-3xl md:text-4xl font-bold text-orange-800 mb-4">
					Punjab Floods Relief 2025
				</h2>
				<p class="text-xl text-orange-700 max-w-3xl mx-auto leading-relaxed">
					Heavy monsoon rains have devastated Punjab's agricultural communities.
					We're providing immediate relief to thousands of displaced families.
				</p>
			</div>

			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
				<div>
					<h3 class="text-2xl font-bold text-orange-800 mb-6">Campaign Impact</h3>
					<div class="space-y-6">
						<div class="flex items-start space-x-4">
							<div class="bg-orange-600 text-white p-2 rounded-full mt-1">
								<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
									<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
								</svg>
							</div>
							<div>
								<h4 class="font-semibold text-orange-800 mb-2">2,000+ Families Rescued</h4>
								<p class="text-orange-700">Immediate evacuation and emergency shelter provided</p>
							</div>
						</div>

						<div class="flex items-start space-x-4">
							<div class="bg-orange-600 text-white p-2 rounded-full mt-1">
								<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
									<path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
								</svg>
							</div>
							<div>
								<h4 class="font-semibold text-orange-800 mb-2">50,000+ Meals Served</h4>
								<p class="text-orange-700">Community kitchens operating 24/7 across affected areas</p>
							</div>
						</div>

						<div class="flex items-start space-x-4">
							<div class="bg-orange-600 text-white p-2 rounded-full mt-1">
								<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M10 2L3 7v11c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V7l-7-5zM8 15c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1z" clip-rule="evenodd"/>
								</svg>
							</div>
							<div>
								<h4 class="font-semibold text-orange-800 mb-2">15 Relief Camps Active</h4>
								<p class="text-orange-700">Temporary shelters with medical aid and supplies</p>
							</div>
						</div>
					</div>
				</div>

				<div class="bg-white p-8 rounded-lg shadow-xl border-2 border-orange-200">
					<h3 class="text-2xl font-bold text-orange-800 mb-6">Support Punjab Relief</h3>
					<div class="space-y-4">
						<div class="grid grid-cols-2 gap-4">
							<button
								class="bg-orange-50 p-4 rounded-lg text-center hover:bg-orange-100 transition-colors cursor-pointer"
								on:click={() => setDonationAmount(500)}
							>
								<div class="text-lg font-bold text-orange-800">₹500</div>
								<div class="text-sm text-orange-600">Feeds family for 3 days</div>
							</button>
							<button
								class="bg-orange-50 p-4 rounded-lg text-center hover:bg-orange-100 transition-colors cursor-pointer"
								on:click={() => setDonationAmount(1500)}
							>
								<div class="text-lg font-bold text-orange-800">₹1,500</div>
								<div class="text-sm text-orange-600">Emergency shelter kit</div>
							</button>
						</div>
						<p class="text-xs text-orange-600 text-center">
							100% of donations go directly to flood victims
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>