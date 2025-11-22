<script lang="ts">
	import Icon from '@iconify/svelte';
	import { addContactSubmission } from '$lib/stores/contact';
	import { addContactToFirestore } from '$lib/firestore';

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

		try {
			// Add submission to store (will console log automatically)
			addContactSubmission(formData);

			// Save to Firestore
			await addContactToFirestore(formData);

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
			console.error('Contact form submission error:', error);
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
						<div class="bg-white p-6 rounded-lg shadow-md card-solid-bg">
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
						<div class="bg-white p-6 rounded-lg shadow-md card-solid-bg">
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

						<div class="bg-white p-6 rounded-lg shadow-md card-solid-bg">
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
						<div class="bg-white p-6 rounded-lg shadow-md card-solid-bg">
							<h3 class="text-lg font-semibold text-gray-900 mb-4">Follow Our Work</h3>
							<div class="flex space-x-4">
								<a
									href="https://www.instagram.com/sikh_aid?igsh=aWEzbDVmMDV0a3Y1"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Follow SikhAid on Instagram"
									class="bg-navy text-white p-3 rounded-full hover:bg-navy-dark transition-colors"
								>
									<Icon icon="mdi:instagram" class="w-6 h-6" />
								</a>
								<a
									href="https://www.facebook.com/share/17fYSEFjUA/"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Follow SikhAid on Facebook"
									class="bg-navy text-white p-3 rounded-full hover:bg-navy-dark transition-colors"
								>
									<Icon icon="mdi:facebook" class="w-6 h-6" />
								</a>
								<a
									href="https://www.linkedin.com/company/sikh-aid-charitable-trustt/"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Follow SikhAid on LinkedIn"
									class="bg-navy text-white p-3 rounded-full hover:bg-navy-dark transition-colors"
								>
									<Icon icon="mdi:linkedin" class="w-6 h-6" />
								</a>
							</div>
						</div>
					</div>
				</div>

				<!-- Contact Form -->
				<div>
					<h2 class="text-3xl font-bold text-navy mb-8">Send us a Message</h2>

					<form on:submit|preventDefault={handleSubmit} class="bg-white p-8 rounded-lg shadow-xl card-solid-bg">
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
