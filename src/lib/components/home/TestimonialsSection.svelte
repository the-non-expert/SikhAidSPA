<script lang="ts">
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

<style>
	:global(:root) {
		--navy: #1a237e;
		--orange: #ff6b35;
	}

	.text-navy {
		color: var(--navy);
	}

	.bg-orange-custom {
		background-color: var(--orange);
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.absolute.left-4,
		.absolute.right-4 {
			position: static;
			transform: none;
			margin: 1rem auto;
			display: block;
		}

		.relative {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.absolute.left-4 {
			order: 3;
		}

		.absolute.right-4 {
			order: 4;
		}
	}
</style>