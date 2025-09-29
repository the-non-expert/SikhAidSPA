<!-- How We Respond Section -->
<section class="py-16 px-4 bg-white">
	<div class="max-w-6xl mx-auto">
		<div class="text-center mb-16">
			<h2 class="text-3xl md:text-4xl font-bold text-navy mb-6">How We Respond to Crisis</h2>
			<p class="text-xl text-gray-700 max-w-3xl mx-auto">Our proven 4-stage emergency response process</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
			<div class="text-center group">
				<div class="bg-orange-custom text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
					<span class="text-2xl font-bold">1</span>
				</div>
				<h3 class="text-xl font-bold text-navy mb-3">Alert & Assess</h3>
				<p class="text-gray-600 text-sm mb-4">24/7 monitoring and rapid situation assessment</p>
				<div class="text-orange-custom text-sm font-semibold">≤ 2 hours</div>
			</div>

			<div class="text-center group">
				<div class="bg-navy text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
					<span class="text-2xl font-bold">2</span>
				</div>
				<h3 class="text-xl font-bold text-navy mb-3">Mobilize Teams</h3>
				<p class="text-gray-600 text-sm mb-4">Deploy volunteers and essential supplies</p>
				<div class="text-orange-custom text-sm font-semibold">≤ 8 hours</div>
			</div>

			<div class="text-center group">
				<div class="bg-orange-custom text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
					<span class="text-2xl font-bold">3</span>
				</div>
				<h3 class="text-xl font-bold text-navy mb-3">Immediate Relief</h3>
				<p class="text-gray-600 text-sm mb-4">Food, shelter, medical aid, and rescue operations</p>
				<div class="text-orange-custom text-sm font-semibold">≤ 24 hours</div>
			</div>

			<div class="text-center group">
				<div class="bg-navy text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
					<span class="text-2xl font-bold">4</span>
				</div>
				<h3 class="text-xl font-bold text-navy mb-3">Rehabilitation</h3>
				<p class="text-gray-600 text-sm mb-4">Long-term support and community rebuilding</p>
				<div class="text-orange-custom text-sm font-semibold">Ongoing</div>
			</div>
		</div>

		<!-- Interactive Timeline -->
		<div class="mt-16 bg-gray-50 p-8 rounded-xl">
			<h3 class="text-2xl font-bold text-navy mb-6 text-center">Our Impact Timeline</h3>
			<div class="flex justify-center items-center space-x-8 overflow-x-auto pb-4">
				<div class="text-center min-w-max">
					<div class="text-3xl font-bold text-orange-custom">2020</div>
					<div class="text-sm text-gray-600">Founded</div>
				</div>
				<div class="flex-1 h-1 bg-gray-300 rounded max-w-20"></div>
				<div class="text-center min-w-max">
					<div class="text-3xl font-bold text-navy">2021</div>
					<div class="text-sm text-gray-600">COVID Relief</div>
				</div>
				<div class="flex-1 h-1 bg-gray-300 rounded max-w-20"></div>
				<div class="text-center min-w-max">
					<div class="text-3xl font-bold text-orange-custom">2022</div>
					<div class="text-sm text-gray-600">Flood Response</div>
				</div>
				<div class="flex-1 h-1 bg-gray-300 rounded max-w-20"></div>
				<div class="text-center min-w-max">
					<div class="text-3xl font-bold text-navy">2023</div>
					<div class="text-sm text-gray-600">Multi-State Ops</div>
				</div>
				<div class="flex-1 h-1 bg-gray-300 rounded max-w-20"></div>
				<div class="text-center min-w-max">
					<div class="text-3xl font-bold text-orange-custom">2024</div>
					<div class="text-sm text-gray-600">Tech Integration</div>
				</div>
				<div class="flex-1 h-1 bg-gray-300 rounded max-w-20"></div>
				<div class="text-center min-w-max">
					<div class="text-3xl font-bold text-navy">2025</div>
					<div class="text-sm text-gray-600">Punjab Relief</div>
				</div>
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

	/* Responsive timeline adjustments */
	@media (max-width: 768px) {
		.space-x-8 {
			gap: 1rem;
		}

		.max-w-20 {
			max-width: 3rem;
		}
	}
</style>