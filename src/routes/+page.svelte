<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import CampaignCarousel from '$lib/components/CampaignCarousel.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { getRecentBlogs } from '$lib/data/blogs.js';

	// Get recent blog posts from data file
	const recentPosts = getRecentBlogs(3);

	// Testimonials data
	const testimonials = [
		{
			name: 'Rajesh Kumar',
			initials: 'RK',
			location: 'Punjab',
			text: 'SikhAid saved our family during the floods. Their quick response and compassionate care gave us hope when we had lost everything.',
			color: 'bg-blue-500'
		},
		{
			name: 'Priya Sharma',
			initials: 'PS',
			location: 'Delhi',
			text: 'I have been donating to SikhAid for 2 years. Their transparency and direct impact on communities is remarkable.',
			color: 'bg-green-500'
		},
		{
			name: 'Dr. Amit Singh',
			initials: 'AS',
			location: 'Mumbai',
			text: 'As a medical volunteer with SikhAid, I have witnessed their incredible organizational skills and dedication to serving humanity.',
			color: 'bg-purple-500'
		},
		{
			name: 'Sunita Devi',
			initials: 'SD',
			location: 'Odisha',
			text: 'The mobile medical units reached our remote village when no one else could. SikhAid truly serves with compassion.',
			color: 'bg-orange-500'
		},
		{
			name: 'Manpreet Kaur',
			initials: 'MK',
			location: 'Haryana',
			text: 'SikhAid helped rebuild our community after the cyclone. Their long-term support made all the difference.',
			color: 'bg-teal-500'
		},
		{
			name: 'Ravi Patel',
			initials: 'RP',
			location: 'Gujarat',
			text: 'Working as a corporate partner with SikhAid has shown me what true humanitarian work looks like. Exceptional organization.',
			color: 'bg-red-500'
		}
	];

	let currentTestimonial = 0;

	function nextTestimonial() {
		currentTestimonial = (currentTestimonial + 1) % testimonials.length;
	}

	function prevTestimonial() {
		currentTestimonial = currentTestimonial === 0 ? testimonials.length - 1 : currentTestimonial - 1;
	}
</script>

<svelte:head>
	<title>SikhAid Charitable Trust - Serving India in Times of Crisis</title>
	<meta name="description" content="SikhAid provides immediate humanitarian aid and disaster relief across India. From natural disasters to community emergencies, we serve with compassion and transparency since 2020." />
</svelte:head>

<Header />

<main class="scroll-smooth pt-20">
	<Hero />

	<!-- Campaign Carousel Section -->
	<CampaignCarousel />

	<!-- Mission & Vision Section -->
	<section class="py-16 px-4 bg-gray-50">
		<div class="max-w-6xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-3xl md:text-4xl font-bold text-navy mb-6">Our Purpose</h2>
				<p class="text-xl text-gray-700 max-w-3xl mx-auto">Guided by compassion and driven by service</p>
			</div>

			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
				<!-- Mission -->
				<div class="bg-white p-8 rounded-xl shadow-xl border-l-4 border-orange-custom">
					<div class="flex items-center mb-6">
						<div class="bg-orange-custom text-white p-3 rounded-full mr-4">
							<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
							</svg>
						</div>
						<h3 class="text-2xl font-bold text-navy">Our Mission</h3>
					</div>
					<p class="text-gray-700 leading-relaxed mb-6">
						To provide immediate humanitarian aid and disaster relief to communities across India during times of crisis.
						We serve with compassion, dignity, and unwavering commitment to those who need help the most.
					</p>
					<ul class="space-y-3">
						<li class="flex items-start space-x-3">
							<div class="w-2 h-2 bg-orange-custom rounded-full mt-2 flex-shrink-0"></div>
							<span class="text-gray-600">Rapid emergency response within 24 hours</span>
						</li>
						<li class="flex items-start space-x-3">
							<div class="w-2 h-2 bg-orange-custom rounded-full mt-2 flex-shrink-0"></div>
							<span class="text-gray-600">Community-centered relief and rehabilitation</span>
						</li>
						<li class="flex items-start space-x-3">
							<div class="w-2 h-2 bg-orange-custom rounded-full mt-2 flex-shrink-0"></div>
							<span class="text-gray-600">100% transparent fund utilization</span>
						</li>
					</ul>
				</div>

				<!-- Vision -->
				<div class="bg-white p-8 rounded-xl shadow-xl border-l-4 border-navy">
					<div class="flex items-center mb-6">
						<div class="bg-navy text-white p-3 rounded-full mr-4">
							<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
								<path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
								<path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
							</svg>
						</div>
						<h3 class="text-2xl font-bold text-navy">Our Vision</h3>
					</div>
					<p class="text-gray-700 leading-relaxed mb-6">
						A resilient India where no community faces disaster alone. We envision a network of compassionate
						service that reaches every corner of our nation, ensuring rapid relief and sustainable recovery.
					</p>
					<ul class="space-y-3">
						<li class="flex items-start space-x-3">
							<div class="w-2 h-2 bg-navy rounded-full mt-2 flex-shrink-0"></div>
							<span class="text-gray-600">Pan-India disaster preparedness network</span>
						</li>
						<li class="flex items-start space-x-3">
							<div class="w-2 h-2 bg-navy rounded-full mt-2 flex-shrink-0"></div>
							<span class="text-gray-600">Empowered communities with resilience training</span>
						</li>
						<li class="flex items-start space-x-3">
							<div class="w-2 h-2 bg-navy rounded-full mt-2 flex-shrink-0"></div>
							<span class="text-gray-600">Technology-driven humanitarian response</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>

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

	<!-- Quick Actions Section -->
	<section class="py-16 px-4 bg-gray-50">
		<div class="max-w-6xl mx-auto">
			<h2 class="text-3xl md:text-4xl font-bold text-navy mb-12 text-center">Join Our Mission</h2>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
				<a href="/donate" class="group bg-orange-custom text-white p-8 rounded-lg hover:bg-orange-dark transition-all transform hover:scale-105 shadow-lg">
					<div class="text-center">
						<div class="text-4xl mb-4">💝</div>
						<h3 class="text-xl font-bold mb-2">Donate</h3>
						<p class="text-gray-100 text-sm">Support our relief efforts across India</p>
					</div>
				</a>

				<a href="/about" class="group bg-white text-navy p-8 rounded-lg hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg border">
					<div class="text-center">
						<div class="text-4xl mb-4">🏛️</div>
						<h3 class="text-xl font-bold mb-2">About Us</h3>
						<p class="text-gray-600 text-sm">Learn about our mission and impact</p>
					</div>
				</a>

				<a href="/blog" class="group bg-white text-navy p-8 rounded-lg hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg border">
					<div class="text-center">
						<div class="text-4xl mb-4">📰</div>
						<h3 class="text-xl font-bold mb-2">Latest Updates</h3>
						<p class="text-gray-600 text-sm">Read about our relief efforts and impact</p>
					</div>
				</a>

				<a href="/contact" class="group bg-white text-navy p-8 rounded-lg hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg border">
					<div class="text-center">
						<div class="text-4xl mb-4">📞</div>
						<h3 class="text-xl font-bold mb-2">Get in Touch</h3>
						<p class="text-gray-600 text-sm">Contact us for support or partnership</p>
					</div>
				</a>
			</div>
		</div>
	</section>

	<!-- Current Campaign Section -->
	<section class="py-16 px-4 bg-white">
		<div class="max-w-6xl mx-auto">
			<div class="bg-red-50 border border-red-200 rounded-xl p-8 mb-12">
				<div class="text-center mb-8">
					<div class="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
						🚨 ACTIVE CAMPAIGN
					</div>
					<h2 class="text-3xl md:text-4xl font-bold text-red-800 mb-4">
						Punjab Floods Relief 2025
					</h2>
					<p class="text-xl text-red-700 max-w-3xl mx-auto leading-relaxed">
						Heavy monsoon rains have devastated Punjab's agricultural communities.
						We're providing immediate relief to thousands of displaced families.
					</p>
				</div>

				<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<div>
						<h3 class="text-2xl font-bold text-red-800 mb-6">Campaign Impact</h3>
						<div class="space-y-6">
							<div class="flex items-start space-x-4">
								<div class="bg-red-600 text-white p-2 rounded-full mt-1">
									<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
										<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
									</svg>
								</div>
								<div>
									<h4 class="font-semibold text-red-800 mb-2">2,000+ Families Rescued</h4>
									<p class="text-red-700">Immediate evacuation and emergency shelter provided</p>
								</div>
							</div>

							<div class="flex items-start space-x-4">
								<div class="bg-red-600 text-white p-2 rounded-full mt-1">
									<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
										<path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
									</svg>
								</div>
								<div>
									<h4 class="font-semibold text-red-800 mb-2">50,000+ Meals Served</h4>
									<p class="text-red-700">Community kitchens operating 24/7 across affected areas</p>
								</div>
							</div>

							<div class="flex items-start space-x-4">
								<div class="bg-red-600 text-white p-2 rounded-full mt-1">
									<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M10 2L3 7v11c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V7l-7-5zM8 15c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1z" clip-rule="evenodd"/>
									</svg>
								</div>
								<div>
									<h4 class="font-semibold text-red-800 mb-2">15 Relief Camps Active</h4>
									<p class="text-red-700">Temporary shelters with medical aid and supplies</p>
								</div>
							</div>
						</div>
					</div>

					<div class="bg-white p-8 rounded-lg shadow-xl border-2 border-red-200">
						<h3 class="text-2xl font-bold text-red-800 mb-6">Support Punjab Relief</h3>
						<div class="space-y-4">
							<div class="grid grid-cols-2 gap-4">
								<div class="bg-red-50 p-4 rounded-lg text-center">
									<div class="text-lg font-bold text-red-800">₹500</div>
									<div class="text-sm text-red-600">Feeds family for 3 days</div>
								</div>
								<div class="bg-red-50 p-4 rounded-lg text-center">
									<div class="text-lg font-bold text-red-800">₹1,500</div>
									<div class="text-sm text-red-600">Emergency shelter kit</div>
								</div>
							</div>
							<a
								href="/donate"
								class="block w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-lg text-center transition-colors"
							>
								Donate for Punjab Relief →
							</a>
							<p class="text-xs text-red-600 text-center">
								100% of donations go directly to flood victims
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Testimonials Section -->
	<section class="py-16 px-4 bg-gray-50">
		<div class="max-w-6xl mx-auto">
			<div class="text-center mb-12">
				<h2 class="text-3xl md:text-4xl font-bold text-navy mb-6">What People Say About Us</h2>
				<p class="text-xl text-gray-700 max-w-3xl mx-auto">Hear from the communities we serve and partners who support our mission</p>
			</div>

			<!-- Testimonial Carousel -->
			<div class="relative">
				<div class="bg-white rounded-xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
					<div class="text-center">
						<!-- Profile Circle -->
						<div class="flex justify-center mb-6">
							<div class="{testimonials[currentTestimonial].color} w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl">
								{testimonials[currentTestimonial].initials}
							</div>
						</div>

						<!-- Testimonial Text -->
						<blockquote class="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed italic">
							"{testimonials[currentTestimonial].text}"
						</blockquote>

						<!-- Author Info -->
						<div class="text-center">
							<h4 class="font-bold text-navy text-lg">{testimonials[currentTestimonial].name}</h4>
							<p class="text-gray-600">{testimonials[currentTestimonial].location}</p>
						</div>
					</div>
				</div>

				<!-- Navigation Arrows -->
				<button
					on:click={prevTestimonial}
					class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
					aria-label="Previous testimonial"
				>
					<svg class="w-6 h-6 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
					</svg>
				</button>

				<button
					on:click={nextTestimonial}
					class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
					aria-label="Next testimonial"
				>
					<svg class="w-6 h-6 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
					</svg>
				</button>
			</div>

			<!-- Dots Indicator -->
			<div class="flex justify-center mt-8 space-x-2">
				{#each testimonials as _, index}
					<button
						on:click={() => currentTestimonial = index}
						class="w-3 h-3 rounded-full transition-colors {index === currentTestimonial ? 'bg-orange-custom' : 'bg-gray-300'}"
						aria-label="Go to testimonial {index + 1}"
					></button>
				{/each}
			</div>
		</div>
	</section>

	<!-- Payment Methods Strip -->
	<section class="py-8 px-4 bg-white border-t border-b border-gray-200">
		<div class="max-w-6xl mx-auto">
			<div class="text-center">
				<h3 class="text-lg font-semibold text-navy mb-6">Ways to Donate</h3>
				<div class="flex justify-center items-center space-x-8 flex-wrap gap-4">
					<!-- Visa -->
					<div class="flex items-center space-x-2">
						<div class="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
							<span class="text-white font-bold text-xs">VISA</span>
						</div>
					</div>

					<!-- Mastercard -->
					<div class="flex items-center space-x-2">
						<div class="w-12 h-8 bg-red-500 rounded flex items-center justify-center">
							<span class="text-white font-bold text-xs">MC</span>
						</div>
					</div>

					<!-- UPI -->
					<div class="flex items-center space-x-2">
						<div class="w-12 h-8 bg-orange-500 rounded flex items-center justify-center">
							<span class="text-white font-bold text-xs">UPI</span>
						</div>
					</div>

					<!-- RuPay -->
					<div class="flex items-center space-x-2">
						<div class="w-12 h-8 bg-green-600 rounded flex items-center justify-center">
							<span class="text-white font-bold text-xs">RUPAY</span>
						</div>
					</div>

					<!-- Net Banking -->
					<div class="flex items-center space-x-2">
						<div class="w-12 h-8 bg-purple-600 rounded flex items-center justify-center">
							<span class="text-white font-bold text-xs">NB</span>
						</div>
					</div>

					<!-- Razorpay -->
					<div class="flex items-center space-x-2">
						<div class="w-12 h-8 bg-blue-500 rounded flex items-center justify-center">
							<span class="text-white font-bold text-xs">RZP</span>
						</div>
					</div>
				</div>
				<p class="text-sm text-gray-600 mt-4">Secure payments powered by Razorpay • 100% safe and encrypted</p>
			</div>
		</div>
	</section>

	<!-- Recent Blog Posts -->
	<section class="py-16 px-4 bg-white">
		<div class="max-w-6xl mx-auto">
			<div class="flex items-center justify-between mb-12">
				<h2 class="text-3xl md:text-4xl font-bold text-navy">Latest Updates</h2>
				<a href="/blog" class="text-navy font-semibold hover:underline">View All Posts →</a>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				{#each recentPosts as post}
					<article class="bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
						<div class="p-6">
							<div class="text-xs font-semibold text-white bg-orange-custom px-2 py-1 rounded mb-3 inline-block">
								{post.category}
							</div>

							<h3 class="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
								<a href="/blog/{post.slug}" class="hover:text-navy transition-colors">
									{post.title}
								</a>
							</h3>

							<p class="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

							<div class="flex items-center justify-between">
								<span class="text-xs text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
								<a
									href="/blog/{post.slug}"
									class="text-navy font-semibold text-sm hover:underline"
								>
									Read More →
								</a>
							</div>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<!-- Call to Action -->
	<section class="py-16 px-4 bg-gradient-to-r from-navy to-orange-custom text-white" style="background: linear-gradient(to right, var(--navy), var(--orange));">
		<div class="max-w-4xl mx-auto text-center">
			<h2 class="text-3xl md:text-4xl font-bold mb-6">Join Us in Serving India</h2>
			<p class="text-xl mb-8">
				Your support helps us respond faster to emergencies and build stronger, more resilient communities across India.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="/donate"
					class="bg-white text-navy font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
				>
					Support Our Mission
				</a>
				<a
					href="/contact"
					class="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-navy transition-colors"
				>
					Partner With Us
				</a>
			</div>
			<div class="mt-8 pt-8 border-t border-white border-opacity-30">
				<p class="text-sm mb-2">For Emergency Support:</p>
				<a href="tel:+919851341234" class="text-xl font-bold hover:underline">
					📞 +91 98513 41234
				</a>
				<p class="text-xs mt-2 text-gray-200">Available 24/7 for disaster response coordination</p>
			</div>
		</div>
	</section>
</main>

<Footer />

<style>
	:global(html) {
		scroll-behavior: smooth;
	}

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
</style>
