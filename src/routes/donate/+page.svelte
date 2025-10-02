<script lang="ts">
	import PaymentForm from '$lib/components/PaymentForm.svelte';
	import { setDonationAmount } from '$lib/stores/donation';
</script>

<svelte:head>
	<title>Donate Now - Support SikhAid's Mission Across India</title>
	<meta name="description" content="Support SikhAid's humanitarian work across India. 100% of funds go directly to relief efforts. Multiple payment options available including UPI, cards, and bank transfer." />
</svelte:head>

<main class="pt-32 min-h-screen">
	<!-- Hero Section -->
	<section class="py-16 px-4 bg-navy text-white">
		<div class="max-w-6xl mx-auto text-center">
			<h1 class="text-4xl md:text-6xl font-bold mb-6">Support Our Mission</h1>
			<p class="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-8">
				Your contribution powers our humanitarian work across India. From emergency response to community
				building, every donation creates lasting impact. 100% transparency guaranteed.
			</p>
		</div>
	</section>

	<!-- Payment Form Section -->
	<section id="payment-form" class="py-16 px-4 bg-white">
		<div class="max-w-3xl mx-auto">
			<h2 class="text-3xl md:text-4xl font-bold text-navy mb-12 text-center">Quick Online Payment</h2>
			<div class="bg-gray-50 p-8 rounded-2xl shadow-xl">
				<PaymentForm />
				<!-- Popular Payment Methods -->
				<div class="text-center mt-6">
					<p class="text-sm text-gray-600 mb-3">Secure payments powered by Razorpay:</p>
					<div class="flex justify-center flex-wrap gap-3">
						<span class="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">UPI</span>
						<span class="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">Cards</span>
						<span class="bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full">Net Banking</span>
						<span class="bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full">Wallets</span>
					</div>
					<p class="text-xs text-gray-500 mt-2">UPI ID for direct transfer: 9340475426@okbiaxis</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Donation Options -->
	<section class="py-16 px-4 bg-gray-50">
		<div class="max-w-6xl mx-auto">
			<h2 class="text-3xl md:text-4xl font-bold text-navy mb-12 text-center">Choose Your Impact</h2>

			<!-- Featured Campaign - Punjab Floods 2025 -->
			<div class="bg-white rounded-xl shadow-xl border-2 border-red-500 mb-8">
				<div class="bg-red-500 text-white px-6 py-3 rounded-t-xl">
					<div class="flex items-center justify-center">
						<div class="w-3 h-3 bg-white rounded-full animate-ping mr-3"></div>
						<span class="font-bold text-sm">FEATURED URGENT CAMPAIGN</span>
					</div>
				</div>
				<div class="p-8">
					<div class="flex items-center mb-6">
						<div class="bg-red-500 text-white p-4 rounded-full mr-4">
							<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
							</svg>
						</div>
						<div>
							<h3 class="text-3xl font-bold text-navy">Punjab Floods 2025</h3>
							<p class="text-red-600 font-semibold">2000+ families need immediate assistance</p>
						</div>
					</div>
					<p class="text-gray-700 mb-6 text-lg">
						Dedicated fund for our active Punjab flood relief operations. Every rupee goes directly
						to rescue operations, emergency shelters, and rehabilitation efforts.
					</p>
					<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
						<button
							class="bg-red-50 p-4 rounded-lg text-center border border-red-200 hover:bg-red-100 hover:border-red-300 transition-colors cursor-pointer"
							on:click={() => setDonationAmount(500)}
						>
							<div class="text-xl font-bold text-red-600">₹500</div>
							<div class="text-sm text-red-600">Feeds family 3 days</div>
						</button>
						<button
							class="bg-red-50 p-4 rounded-lg text-center border border-red-200 hover:bg-red-100 hover:border-red-300 transition-colors cursor-pointer"
							on:click={() => setDonationAmount(1500)}
						>
							<div class="text-xl font-bold text-red-600">₹1,500</div>
							<div class="text-sm text-red-600">Emergency shelter kit</div>
						</button>
						<button
							class="bg-red-50 p-4 rounded-lg text-center border border-red-200 hover:bg-red-100 hover:border-red-300 transition-colors cursor-pointer"
							on:click={() => setDonationAmount(3000)}
						>
							<div class="text-xl font-bold text-red-600">₹3,000</div>
							<div class="text-sm text-red-600">Rescue equipment</div>
						</button>
						<button
							class="bg-red-50 p-4 rounded-lg text-center border border-red-200 hover:bg-red-100 hover:border-red-300 transition-colors cursor-pointer"
							on:click={() => setDonationAmount(5000)}
						>
							<div class="text-xl font-bold text-red-600">₹5,000</div>
							<div class="text-sm text-red-600">Family rehabilitation</div>
						</button>
					</div>
				</div>
			</div>

			<!-- Other Donation Options -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
				<!-- General Relief Fund -->
				<div class="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
					<div class="flex items-center mb-6">
						<div class="bg-orange-custom text-white p-3 rounded-full mr-4">
							<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
							</svg>
						</div>
						<h3 class="text-2xl font-bold text-navy">General Relief Fund</h3>
					</div>
					<p class="text-gray-700 mb-6">
						Support our comprehensive humanitarian work across India. This fund allows us to respond
						quickly to emergencies and maintain ongoing community programs.
					</p>
					<div class="grid grid-cols-2 gap-4 mb-6">
						<button
							class="bg-gray-50 p-4 rounded-lg text-center border hover:bg-orange-50 hover:border-orange-300 transition-colors cursor-pointer"
							on:click={() => setDonationAmount(1000)}
						>
							<div class="text-lg font-bold text-orange-custom">₹1,000</div>
							<div class="text-sm text-gray-600">Monthly impact donor</div>
						</button>
						<button
							class="bg-gray-50 p-4 rounded-lg text-center border hover:bg-orange-50 hover:border-orange-300 transition-colors cursor-pointer"
							on:click={() => setDonationAmount(5000)}
						>
							<div class="text-lg font-bold text-orange-custom">₹5,000</div>
							<div class="text-sm text-gray-600">Community supporter</div>
						</button>
					</div>
				</div>

				<!-- Campaign-Specific Fund -->
				<div class="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
					<div class="flex items-center mb-6">
						<div class="bg-navy text-white p-3 rounded-full mr-4">
							<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
								<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
							</svg>
						</div>
						<h3 class="text-2xl font-bold text-navy">Campaign Support</h3>
					</div>
					<p class="text-gray-700 mb-6">
						Support specific campaigns like Langar Aid, No Spot initiative, Blanket Distribution, and other targeted relief efforts across India.
					</p>
					<div class="grid grid-cols-2 gap-4 mb-6">
						<button
							class="bg-gray-50 p-4 rounded-lg text-center border hover:bg-blue-50 hover:border-navy transition-colors cursor-pointer"
							on:click={() => setDonationAmount(2000)}
						>
							<div class="text-lg font-bold text-navy">₹2,000</div>
							<div class="text-sm text-gray-600">Campaign contributor</div>
						</button>
						<button
							class="bg-gray-50 p-4 rounded-lg text-center border hover:bg-blue-50 hover:border-navy transition-colors cursor-pointer"
							on:click={() => setDonationAmount(10000)}
						>
							<div class="text-lg font-bold text-navy">₹10,000</div>
							<div class="text-sm text-gray-600">Major campaign sponsor</div>
						</button>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Alternative Payment Methods -->
	<section class="py-16 px-4 bg-gray-50">
		<div class="max-w-7xl mx-auto">
			<h2 class="text-3xl md:text-4xl font-bold text-navy mb-12 text-center">Alternative Payment Methods</h2>
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
				<!-- Bank Details Card -->
				<div class="bg-white text-navy p-8 rounded-lg shadow-xl">
					<h3 class="text-2xl font-bold mb-6 text-center">Bank Transfer Details</h3>

					<div class="space-y-6">
						<div class="border-b border-gray-200 pb-4">
							<div class="text-sm text-gray-600 mb-1">Account Name</div>
							<div class="font-semibold text-lg">Sikh Aid Charitable Trust</div>
						</div>

						<div class="border-b border-gray-200 pb-4">
							<div class="text-sm text-gray-600 mb-1">Account Number</div>
							<div class="font-mono text-lg font-semibold">92102 00102 68306</div>
						</div>

						<div class="border-b border-gray-200 pb-4">
							<div class="text-sm text-gray-600 mb-1">IFSC Code</div>
							<div class="font-mono text-lg font-semibold">UTIB0003025</div>
						</div>

						<div class="border-b border-gray-200 pb-4">
							<div class="text-sm text-gray-600 mb-1">Bank Name</div>
							<div class="font-semibold text-lg">Axis Bank</div>
						</div>

						<div class="pb-4">
							<div class="text-sm text-gray-600 mb-1">SWIFT Code</div>
							<div class="font-mono text-lg font-semibold">AXISINBB438</div>
						</div>
					</div>
				</div>

				<!-- Instructions Card -->
				<div class="bg-navy text-white p-8 rounded-lg">
					<h3 class="text-2xl font-bold mb-6">How to Donate</h3>

					<div class="space-y-6">
						<div class="flex items-start space-x-4">
							<div class="bg-white text-navy p-2 rounded-full text-sm font-bold min-w-[2rem] text-center flex-shrink-0">1</div>
							<div>
								<h4 class="font-semibold mb-2">Choose Your Amount</h4>
								<p class="text-gray-200">Any amount helps - from ₹100 to ₹10,000 or more</p>
							</div>
						</div>

						<div class="flex items-start space-x-4">
							<div class="bg-white text-navy p-2 rounded-full text-sm font-bold min-w-[2rem] text-center flex-shrink-0">2</div>
							<div>
								<h4 class="font-semibold mb-2">Transfer Funds</h4>
								<p class="text-gray-200">Use the bank details provided or send via UPI</p>
							</div>
						</div>

						<div class="flex items-start space-x-4">
							<div class="bg-white text-navy p-2 rounded-full text-sm font-bold min-w-[2rem] text-center flex-shrink-0">3</div>
							<div>
								<h4 class="font-semibold mb-2">Keep Receipt</h4>
								<p class="text-gray-200">Save your transaction receipt for tax benefits</p>
							</div>
						</div>

						<div class="flex items-start space-x-4">
							<div class="bg-white text-navy p-2 rounded-full text-sm font-bold min-w-[2rem] text-center flex-shrink-0">4</div>
							<div>
								<h4 class="font-semibold mb-2">Get Updates</h4>
								<p class="text-gray-200">We'll share how your donation is making a difference</p>
							</div>
						</div>
					</div>

					<div class="mt-8 p-6 bg-white bg-opacity-20 rounded-lg">
						<p class="text-lg font-semibold mb-2">Tax Deductible</p>
						<p class="text-sm text-gray-200">Donations are eligible for 80G tax benefits under Income Tax Act</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Impact Stories -->
	<section class="py-16 px-4 bg-white">
		<div class="max-w-6xl mx-auto">
			<h2 class="text-3xl md:text-4xl font-bold text-navy mb-12 text-center">Your Impact in Action</h2>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
				<div class="text-center">
					<div class="bg-navy text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
						<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
							<path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
						</svg>
					</div>
					<div class="text-3xl font-bold text-navy mb-2">2,000+</div>
					<div class="text-gray-600">Families Supported</div>
				</div>
				<div class="text-center">
					<div class="bg-navy text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
						<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
							<path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
						</svg>
					</div>
					<div class="text-3xl font-bold text-navy mb-2">50,000+</div>
					<div class="text-gray-600">Meals Distributed</div>
				</div>
				<div class="text-center">
					<div class="bg-navy text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
						<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 2L3 7v11c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V7l-7-5zM8 15c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1z" clip-rule="evenodd"/>
						</svg>
					</div>
					<div class="text-3xl font-bold text-navy mb-2">15</div>
					<div class="text-gray-600">Emergency Shelters</div>
				</div>
			</div>

			<div class="bg-gray-50 p-8 rounded-lg">
				<h3 class="text-2xl font-bold text-navy mb-6 text-center">Recent Impact Stories</h3>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
					<blockquote class="bg-white p-6 rounded-lg shadow-md">
						<p class="text-gray-700 mb-4 italic">
							"Thanks to the emergency food packets from Sikh Aid, my family survived the first week after our house was flooded. We had lost everything, but you gave us hope."
						</p>
						<cite class="text-sm text-gray-600">— Gurpreet Kaur, Flood Victim from Ludhiana</cite>
					</blockquote>

					<blockquote class="bg-white p-6 rounded-lg shadow-md">
						<p class="text-gray-700 mb-4 italic">
							"The mobile medical unit reached our village when no other help was available. They treated my elderly father's diabetes when we had no access to medicines."
						</p>
						<cite class="text-sm text-gray-600">— Harpreet Singh, Village Dhakoli</cite>
					</blockquote>
				</div>
			</div>
		</div>
	</section>

	<!-- Transparency Section -->
	<section class="py-16 px-4 bg-gray-50">
		<div class="max-w-6xl mx-auto">
			<h2 class="text-3xl md:text-4xl font-bold text-navy mb-12 text-center">Complete Transparency</h2>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-12">
				<div class="bg-white p-8 rounded-lg shadow-xl">
					<h3 class="text-2xl font-bold text-navy mb-6">How We Use Your Donations</h3>
					<div class="space-y-4">
						<div class="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
							<span class="font-semibold">Emergency Food & Water</span>
							<span class="text-navy font-bold">40%</span>
						</div>
						<div class="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
							<span class="font-semibold">Shelter & Accommodation</span>
							<span class="text-navy font-bold">25%</span>
						</div>
						<div class="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
							<span class="font-semibold">Medical Aid & Supplies</span>
							<span class="text-navy font-bold">20%</span>
						</div>
						<div class="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
							<span class="font-semibold">Rehabilitation Support</span>
							<span class="text-navy font-bold">10%</span>
						</div>
						<div class="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
							<span class="font-semibold">Operations & Logistics</span>
							<span class="text-navy font-bold">5%</span>
						</div>
					</div>
				</div>

				<div class="bg-white p-8 rounded-lg shadow-xl">
					<h3 class="text-2xl font-bold text-navy mb-6">Why Trust Sikh Aid?</h3>
					<div class="space-y-6">
						<div class="flex items-start space-x-4">
							<div class="bg-navy text-white p-2 rounded-full">
								<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
								</svg>
							</div>
							<div>
								<h4 class="font-semibold text-gray-900 mb-2">100% Direct Relief</h4>
								<p class="text-gray-600">Every penny goes to flood victims - no administrative fees</p>
							</div>
						</div>

						<div class="flex items-start space-x-4">
							<div class="bg-navy text-white p-2 rounded-full">
								<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
									<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
								</svg>
							</div>
							<div>
								<h4 class="font-semibold text-gray-900 mb-2">80G Tax Benefits</h4>
								<p class="text-gray-600">All donations are tax deductible under Income Tax Act</p>
							</div>
						</div>

						<div class="flex items-start space-x-4">
							<div class="bg-navy text-white p-2 rounded-full">
								<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
									<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
									<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
								</svg>
							</div>
							<div>
								<h4 class="font-semibold text-gray-900 mb-2">Regular Updates</h4>
								<p class="text-gray-600">Monthly reports on how your donations are being used</p>
							</div>
						</div>

						<div class="flex items-start space-x-4">
							<div class="bg-navy text-white p-2 rounded-full">
								<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
								</svg>
							</div>
							<div>
								<h4 class="font-semibold text-gray-900 mb-2">Established Trust</h4>
								<p class="text-gray-600">Serving communities since 2020 with verified impact</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Support Section -->
	<section class="py-16 px-4 bg-navy text-white">
		<div class="max-w-4xl mx-auto text-center">
			<h2 class="text-3xl md:text-4xl font-bold mb-6">Need Help with Your Donation?</h2>
			<p class="text-xl text-gray-200 mb-8">
				Our support team is available 24/7 to assist you with the donation process.
			</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
				<a
					href="/contact"
					class="bg-white text-navy font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
				>
					Contact Support Team
				</a>
				<a
					href="tel:+919851341234"
					class="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-navy transition-colors"
				>
					Call +91 98513 41234
				</a>
			</div>
		</div>
	</section>
</main>

<style>
	:global(:root) {
		--navy: #1a237e;
		--navy-dark: #0d1660;
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
</style>