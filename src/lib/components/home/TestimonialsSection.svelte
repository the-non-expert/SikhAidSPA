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

	let touchStartX = 0;
	let touchEndX = 0;

	function handleTouchStart(e: TouchEvent) {
		touchStartX = e.changedTouches[0].clientX;
	}

	function handleTouchEnd(e: TouchEvent) {
		touchEndX = e.changedTouches[0].clientX;
		const diff = touchEndX - touchStartX;

		// basic threshold
		if (Math.abs(diff) > 50) {
			if (diff < 0) {
				nextTestimonial();
			} else {
				prevTestimonial();
			}
		}
	}
</script>

<!-- Testimonials Section -->
<section class="py-10 px-4 bg-gray-50">
	<div class="max-w-6xl mx-auto">
		<div class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl font-bold text-navy mb-6">What People Say About Us</h2>
			<p class="text-xl text-gray-700 max-w-3xl mx-auto">Hear from the communities we serve and partners who support our mission</p>
		</div>

		<div
			class="relative flex items-center justify-center"
			on:touchstart={handleTouchStart}
			on:touchend={handleTouchEnd}
		>

			<!-- LEFT ARROW -->
			<button
				on:click={prevTestimonial}
				class="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors card-solid-bg"
				aria-label="Previous testimonial"
			>
				<svg class="w-6 h-6 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
				</svg>
			</button>

			<!-- CARD -->
			<div class="max-w-4xl w-full bg-white rounded-xl shadow-xl p-8 md:p-12 card-solid-bg">
				<div class="text-center">
					<div class="flex justify-center mb-6">
						<div class="{testimonials[currentTestimonial].color} w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl">
							{testimonials[currentTestimonial].initials}
						</div>
					</div>

					<blockquote class="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed italic">
						"{testimonials[currentTestimonial].text}"
					</blockquote>

					<div class="text-center">
						<h4 class="font-bold text-navy text-lg">{testimonials[currentTestimonial].name}</h4>
						<p class="text-gray-600">{testimonials[currentTestimonial].location}</p>
					</div>
				</div>
			</div>

			<!-- RIGHT ARROW -->
			<button
				on:click={nextTestimonial}
				class="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors card-solid-bg"
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
		/* Pull arrows closer to the card */
		button.absolute {
			width: 40px;
			height: 40px;
			padding: 0.5rem !important;
			top: 50% !important;
			transform: translateY(-50%) !important;
		}

		/* Left arrow */
		button.absolute.left-0 {
			left: -10px !important;
		}

		/* Right arrow */
		button.absolute.right-0 {
			right: -10px !important;
		}

		/* Prevent the wrapper from adding extra padding */
		.relative {
			padding: 0;
		}
	}
</style>