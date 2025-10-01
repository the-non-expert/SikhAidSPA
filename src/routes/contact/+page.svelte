<script lang="ts">
	let formData = {
		name: '',
		email: '',
		phone: '',
		subject: '',
		message: ''
	};

	let isSubmitting = false;
	let submitMessage = '';

	async function handleSubmit() {
		isSubmitting = true;
		submitMessage = '';

		// Simulate form submission (in a real app, this would send to a server)
		try {
			await new Promise(resolve => setTimeout(resolve, 1000));

			// Reset form
			formData = {
				name: '',
				email: '',
				phone: '',
				subject: '',
				message: ''
			};

			submitMessage = 'Thank you for your message! We will get back to you within 24 hours.';
		} catch (error) {
			submitMessage = 'Sorry, there was an error sending your message. Please try again or contact us directly.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<svelte:head>
	<title>Contact Us - Sikh Aid Charitable Trust</title>
	<meta name="description" content="Get in touch with Sikh Aid Charitable Trust. Contact us for inquiries about our relief efforts, volunteering opportunities, or partnership proposals." />
</svelte:head>

<main class="pt-32 min-h-screen">
	<!-- Hero Section -->
	<section class="py-16 px-4 bg-navy text-white">
		<div class="max-w-6xl mx-auto text-center">
			<h1 class="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
			<p class="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
				We're here to help. Reach out to us for any inquiries about our relief efforts or how you can get involved.
			</p>
		</div>
	</section>

	<!-- Contact Information & Form -->
	<section class="py-16 px-4 bg-gray-50">
		<div class="max-w-6xl mx-auto">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
				<!-- Contact Information -->
				<div>
					<h2 class="text-3xl font-bold text-navy mb-8">Get in Touch</h2>

					<div class="space-y-8">
						<!-- Office Address -->
						<div class="bg-white p-6 rounded-lg shadow-md">
							<div class="flex items-start space-x-4">
								<div class="bg-navy text-white p-3 rounded-full">
									<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
									</svg>
								</div>
								<div>
									<h3 class="text-lg font-semibold text-gray-900 mb-2">Office Address</h3>
									<p class="text-gray-600">
										House no. 222, Mangraj Lane<br>
										Cuttack Odisha 753001<br>
										India
									</p>
								</div>
							</div>
						</div>

						<!-- Phone & Email -->
						<div class="bg-white p-6 rounded-lg shadow-md">
							<div class="flex items-start space-x-4">
								<div class="bg-navy text-white p-3 rounded-full">
									<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
										<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
									</svg>
								</div>
								<div>
									<h3 class="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
									<p class="text-gray-600">+91 98513 41234</p>
									<p class="text-sm text-gray-500 mt-1">Available 24/7 for emergencies</p>
								</div>
							</div>
						</div>

						<div class="bg-white p-6 rounded-lg shadow-md">
							<div class="flex items-start space-x-4">
								<div class="bg-navy text-white p-3 rounded-full">
									<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
										<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
										<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
									</svg>
								</div>
								<div>
									<h3 class="text-lg font-semibold text-gray-900 mb-2">Email</h3>
									<p class="text-gray-600">help@sikhaid.ngo</p>
									<p class="text-sm text-gray-500 mt-1">We respond within 24 hours</p>
								</div>
							</div>
						</div>

						<!-- Social Media -->
						<div class="bg-white p-6 rounded-lg shadow-md">
							<h3 class="text-lg font-semibold text-gray-900 mb-4">Follow Our Work</h3>
							<div class="flex space-x-4">
								<a
									href="https://twitter.com/sikhaid"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Follow SikhAid on Twitter"
									class="bg-navy text-white p-2 rounded-full hover:bg-navy-dark transition-colors"
								>
									<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
										<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
									</svg>
								</a>
								<a
									href="https://facebook.com/sikhaid"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Follow SikhAid on Facebook"
									class="bg-navy text-white p-2 rounded-full hover:bg-navy-dark transition-colors"
								>
									<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
										<path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
									</svg>
								</a>
								<a
									href="https://instagram.com/sikhaid"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Follow SikhAid on Instagram"
									class="bg-navy text-white p-2 rounded-full hover:bg-navy-dark transition-colors"
								>
									<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
										<path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
									</svg>
								</a>
							</div>
						</div>
					</div>
				</div>

				<!-- Contact Form -->
				<div>
					<h2 class="text-3xl font-bold text-navy mb-8">Send us a Message</h2>

					<form on:submit|preventDefault={handleSubmit} class="bg-white p-8 rounded-lg shadow-xl">
						<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
							<div>
								<label for="name" class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
								<input
									type="text"
									id="name"
									bind:value={formData.name}
									required
									class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
									placeholder="Your full name"
								/>
							</div>
							<div>
								<label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
								<input
									type="email"
									id="email"
									bind:value={formData.email}
									required
									class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
									placeholder="your.email@example.com"
								/>
							</div>
						</div>

						<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
							<div>
								<label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
								<input
									type="tel"
									id="phone"
									bind:value={formData.phone}
									class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
									placeholder="+91 XXXXX XXXXX"
								/>
							</div>
							<div>
								<label for="subject" class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
								<select
									id="subject"
									bind:value={formData.subject}
									required
									class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
								>
									<option value="">Select a subject</option>
									<option value="general">General Inquiry</option>
									<option value="volunteer">Volunteer Opportunities</option>
									<option value="partnership">Partnership Proposal</option>
									<option value="donation">Donation Support</option>
									<option value="media">Media Inquiry</option>
									<option value="emergency">Emergency Support Needed</option>
								</select>
							</div>
						</div>

						<div class="mb-6">
							<label for="message" class="block text-sm font-medium text-gray-700 mb-2">Message</label>
							<textarea
								id="message"
								bind:value={formData.message}
								required
								rows="6"
								class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent resize-none"
								placeholder="Please describe your inquiry in detail..."
							></textarea>
						</div>

						{#if submitMessage}
							<div class="mb-6 p-4 rounded-lg {submitMessage.includes('Thank you') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}">
								{submitMessage}
							</div>
						{/if}

						<button
							type="submit"
							disabled={isSubmitting}
							class="w-full bg-navy hover:bg-navy-dark text-white font-semibold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isSubmitting ? 'Sending Message...' : 'Send Message'}
						</button>
					</form>
				</div>
			</div>
		</div>
	</section>

	<!-- Emergency Contact -->
	<section class="py-16 px-4 bg-red-600 text-white">
		<div class="max-w-4xl mx-auto text-center">
			<h2 class="text-3xl font-bold mb-6">Emergency Situations</h2>
			<p class="text-xl mb-8">
				If you're facing an emergency situation and need immediate assistance, please call our 24/7 emergency helpline:
			</p>
			<a
				href="tel:+919851341234"
				class="inline-block bg-white text-red-600 font-bold text-2xl px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
			>
				+91 98513 41234
			</a>
			<p class="text-sm mt-4 text-red-100">
				Our emergency response team is available round-the-clock to provide immediate assistance.
			</p>
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

	.focus\:ring-navy:focus {
		--tw-ring-color: var(--navy);
	}
</style>