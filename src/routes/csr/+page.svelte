<script lang="ts">
	import { addCSRSubmission } from '$lib/stores/csr';
	import { addCSRToFirestore } from '$lib/firestore';

	let formData = {
		companyName: '',
		contactPerson: '',
		email: '',
		phone: '',
		companySize: '',
		industry: '',
		partnershipInterest: [] as string[],
		budgetRange: '',
		message: ''
	};

	let isSubmitting = false;
	let submitMessage = '';

	async function handleSubmit() {
		isSubmitting = true;
		submitMessage = '';

		try {
			// Add submission to store (will console log automatically)
			addCSRSubmission(formData);
			
			// Save to Firestore
			await addCSRToFirestore(formData);

			// Reset form
			formData = {
				companyName: '',
				contactPerson: '',
				email: '',
				phone: '',
				companySize: '',
				industry: '',
				partnershipInterest: [],
				budgetRange: '',
				message: ''
			};

			submitMessage = 'Thank you for your interest! Our partnership team will contact you within 48 hours.';
		} catch (error) {
			submitMessage = 'Sorry, there was an error submitting your inquiry. Please try again.';
			console.error('CSR form submission error:', error);
		} finally {
			isSubmitting = false;
		}
	}

	const partnershipModels = [
		{
			id: 'strategic-philanthropy',
			title: 'Strategic Philanthropy',
			description: 'Through funds and in-kind contributions',
			image: '/csr-page-pictures/strategic-philanthropy-through-funds-and-in-kind-contributions.png'
		},
		{
			id: 'cause-marketing',
			title: 'Cause Marketing Initiatives',
			description: 'Co-branded campaigns for social impact',
			image: '/csr-page-pictures/cause-marketing-initiatives.png'
		},
		{
			id: 'events-sponsorship',
			title: 'Events and Sponsorship',
			description: 'Support our community programs',
			image: '/csr-page-pictures/events-and-sponsorship.png'
		},
		{
			id: 'innovations',
			title: 'Innovations and Project Solutions',
			description: 'For children and communities',
			image: '/csr-page-pictures/innovations-and-project-solutions-for-children.png'
		}
	];
</script>

<svelte:head>
	<title>CSR Partnerships - SikhAid Charitable Trust</title>
	<meta name="description" content="Partner with SikhAid for impactful CSR initiatives. Explore employee engagement, cause marketing, financial sponsorship, and more." />
</svelte:head>

<main class="pt-32 min-h-screen">
	<!-- Hero Section with Grid Pattern -->
	<section class="hero-section py-16 px-4 text-white relative overflow-hidden">
		<!-- Grid Pattern Overlay -->
		<div class="grid-pattern"></div>

		<div class="max-w-6xl mx-auto text-center relative z-10">
			<h1 class="text-4xl md:text-6xl font-bold mb-6">Corporate Social Responsibility</h1>
			<p class="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed mb-8">
				Partner with SikhAid to create meaningful social impact. Together, we can transform lives and build stronger communities across India.
			</p>

			<!-- Breadcrumb -->
			<nav class="text-sm md:text-base">
				<a href="/" class="hover:text-orange-custom transition-colors">Home</a>
				<span class="mx-2">/</span>
				<span class="text-orange-custom">CSR Opportunities</span>
			</nav>
		</div>
	</section>


	<!-- Partnership Models -->
	<section class="py-16 px-4 bg-gray-50">
		<div class="max-w-7xl mx-auto">
			<div class="text-center mb-12">
				<h2 class="text-3xl md:text-4xl font-bold text-navy mb-4">Partnership Models</h2>
				<p class="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
					Corporate Social Responsibility (CSR) spends in India are on a steady rise. It shows that more businesses are now integrating CSR into their core operations. A collaboration between corporates and NGOs is mutually beneficial for both; corporates benefit from the domain expertise and groundwork of NGOs, while NGOs get access to a sustainable source of funds and strategic resources. The CSR mandate has laid the foundation for collective action to address social issues on a scale by contributing to the sustainability of these efforts.
				</p>
				<p class="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
					Over the years, SikhAid has established a vast network of relief programs and a robust system to maintain highest standards of financial transparency and accountability in its functioning, making it a credible option for corporates looking to partner with NGOs. If you are looking to collaborate with SikhAid, you can choose one of the four options below.
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
				{#each partnershipModels as model}
					<div class="flex flex-col items-center text-center">
						<!-- Circular Image Container -->
						<div class="relative mb-6 w-48 h-48 rounded-full overflow-hidden border-4 border-green-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
							<img
								src={model.image}
								alt={model.title}
								class="w-full h-full object-cover"
							/>
						</div>

						<!-- Content -->
						<h3 class="text-lg font-bold text-navy mb-2 px-4">{model.title}</h3>
						<p class="text-sm text-gray-600 px-4">{model.description}</p>
					</div>
				{/each}
			</div>

			<!-- Additional Info -->
			<div class="mt-12 bg-white rounded-xl p-8 shadow-md text-center">
				<p class="text-lg text-gray-700 mb-4">
					Want to delve deeper into our CSR activities and find out how you can contribute towards the betterment of your country?
				</p>
				<p class="text-navy font-semibold mb-2">
					Reach out to us at <a href="mailto:help@sikhaid.ngo" class="text-orange-custom hover:underline">help@sikhaid.ngo</a>
				</p>
				<p class="text-navy font-semibold mb-6">
					Contact Us: <a href="tel:+919851341234" class="text-orange-custom hover:underline">+91 98513 41234</a>
				</p>
				<p class="text-sm text-gray-600">
					You can also <a href="/about" class="text-orange-custom hover:underline font-semibold">click here</a> to find out more about our organisation.
				</p>
			</div>
		</div>
	</section>

	<!-- Partnership Inquiry Form -->
	<section class="py-16 px-4 bg-white">
		<div class="max-w-4xl mx-auto">
			<div class="text-center mb-12">
				<h2 class="text-3xl md:text-4xl font-bold text-navy mb-4">Start Your CSR Partnership</h2>
				<p class="text-lg text-gray-600">
					Let's discuss how we can create meaningful impact together. Fill out the form below.
				</p>
			</div>

			<form on:submit|preventDefault={handleSubmit} class="bg-gray-50 rounded-xl p-8 md:p-10 shadow-lg">
				<!-- Company Information -->
				<div class="mb-8">
					<h3 class="text-xl font-bold text-navy mb-6 pb-2 border-b-2 border-navy">Company Information</h3>

					<div class="space-y-6">
						<!-- Company Name -->
						<div>
							<label for="companyName" class="block text-sm font-semibold text-gray-700 mb-2">
								Company Name <span class="text-red-500">*</span>
							</label>
							<input
								type="text"
								id="companyName"
								bind:value={formData.companyName}
								required
								class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent transition-all"
								placeholder="Your company name"
							/>
						</div>

						<!-- Contact Person -->
						<div>
							<label for="contactPerson" class="block text-sm font-semibold text-gray-700 mb-2">
								Contact Person Name <span class="text-red-500">*</span>
							</label>
							<input
								type="text"
								id="contactPerson"
								bind:value={formData.contactPerson}
								required
								class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent transition-all"
								placeholder="Full name of contact person"
							/>
						</div>

						<!-- Email and Phone -->
						<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
									Email <span class="text-red-500">*</span>
								</label>
								<input
									type="email"
									id="email"
									bind:value={formData.email}
									required
									class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent transition-all"
									placeholder="company@example.com"
								/>
							</div>
							<div>
								<label for="phone" class="block text-sm font-semibold text-gray-700 mb-2">
									Phone Number <span class="text-red-500">*</span>
								</label>
								<input
									type="tel"
									id="phone"
									bind:value={formData.phone}
									required
									class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent transition-all"
									placeholder="Contact number"
								/>
							</div>
						</div>

						<!-- Company Size and Industry -->
						<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label for="companySize" class="block text-sm font-semibold text-gray-700 mb-2">
									Company Size <span class="text-red-500">*</span>
								</label>
								<select
									id="companySize"
									bind:value={formData.companySize}
									required
									class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent transition-all"
								>
									<option value="">Select size</option>
									<option value="1-50">1-50 employees</option>
									<option value="51-200">51-200 employees</option>
									<option value="201-500">201-500 employees</option>
									<option value="501-1000">501-1000 employees</option>
									<option value="1000+">1000+ employees</option>
								</select>
							</div>
							<div>
								<label for="industry" class="block text-sm font-semibold text-gray-700 mb-2">
									Industry <span class="text-red-500">*</span>
								</label>
								<select
									id="industry"
									bind:value={formData.industry}
									required
									class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent transition-all"
								>
									<option value="">Select industry</option>
									<option value="technology">Technology</option>
									<option value="finance">Finance & Banking</option>
									<option value="manufacturing">Manufacturing</option>
									<option value="healthcare">Healthcare</option>
									<option value="retail">Retail</option>
									<option value="education">Education</option>
									<option value="consulting">Consulting</option>
									<option value="other">Other</option>
								</select>
							</div>
						</div>
					</div>
				</div>

				<!-- Partnership Details -->
				<div class="mb-8">
					<h3 class="text-xl font-bold text-navy mb-6 pb-2 border-b-2 border-navy">Partnership Details</h3>

					<div class="space-y-6">
						<!-- Partnership Interest -->
						<div>
							<label class="block text-sm font-semibold text-gray-700 mb-3">
								Partnership Interest <span class="text-red-500">*</span> <span class="text-sm font-normal text-gray-500">(Select all that apply)</span>
							</label>
							<div class="space-y-3">
								{#each partnershipModels as model}
									<label class="flex items-start cursor-pointer">
										<input
											type="checkbox"
											bind:group={formData.partnershipInterest}
											value={model.id}
											class="mt-1 w-4 h-4 text-navy focus:ring-navy"
										/>
										<span class="ml-3 text-gray-700">{model.title}</span>
									</label>
								{/each}
							</div>
						</div>

						<!-- Budget Range -->
						<div>
							<label for="budgetRange" class="block text-sm font-semibold text-gray-700 mb-2">
								Approximate Budget Range <span class="text-red-500">*</span>
							</label>
							<select
								id="budgetRange"
								bind:value={formData.budgetRange}
								required
								class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent transition-all"
							>
								<option value="">Select budget range</option>
								<option value="under-1L">Under ₹1 Lakh</option>
								<option value="1L-5L">₹1-5 Lakhs</option>
								<option value="5L-10L">₹5-10 Lakhs</option>
								<option value="10L-25L">₹10-25 Lakhs</option>
								<option value="25L-50L">₹25-50 Lakhs</option>
								<option value="50L+">₹50 Lakhs+</option>
							</select>
						</div>

						<!-- Message -->
						<div>
							<label for="message" class="block text-sm font-semibold text-gray-700 mb-2">
								Message / Requirements <span class="text-red-500">*</span>
							</label>
							<textarea
								id="message"
								bind:value={formData.message}
								required
								rows="5"
								class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent resize-none transition-all"
								placeholder="Tell us about your CSR objectives, timeline, and any specific requirements..."
							></textarea>
						</div>
					</div>
				</div>

				<!-- Submit Message -->
				{#if submitMessage}
					<div class="mb-6 p-4 rounded-lg {submitMessage.includes('Thank you') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}">
						{submitMessage}
					</div>
				{/if}

				<!-- Submit Button -->
				<div class="text-center">
					<button
						type="submit"
						disabled={isSubmitting}
						class="bg-navy hover:bg-navy-dark text-white font-bold py-4 px-12 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-transform"
					>
						{isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
					</button>
					<p class="text-sm text-gray-500 mt-4">
						Our partnership team will contact you within 48 hours.
					</p>
				</div>
			</form>
		</div>
	</section>

	<!-- Call to Action -->
	<section class="py-16 px-4 bg-navy text-white">
		<div class="max-w-4xl mx-auto text-center">
			<h2 class="text-3xl md:text-4xl font-bold mb-6">Let's Create Impact Together</h2>
			<p class="text-xl mb-8 text-gray-100">
				Join leading corporations who trust SikhAid to deliver meaningful social impact aligned with their CSR goals.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="/about"
					class="bg-orange-custom hover:bg-orange-dark text-white font-bold px-8 py-4 rounded-lg transition-colors"
				>
					Learn About Us
				</a>
				<a
					href="/contact"
					class="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-navy transition-colors"
				>
					Contact Our Team
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

	.bg-navy-dark {
		background-color: var(--navy-dark);
	}

	.hover\:bg-navy-dark:hover {
		background-color: var(--navy-dark);
	}

	.bg-orange-custom {
		background-color: var(--orange);
	}

	.bg-orange-dark {
		background-color: var(--orange-dark);
	}

	.hover\:bg-orange-dark:hover {
		background-color: var(--orange-dark);
	}

	.text-orange-custom {
		color: var(--orange);
	}

	.hover\:text-orange-custom:hover {
		color: var(--orange);
	}

	.focus\:ring-navy:focus {
		--tw-ring-color: var(--navy);
	}

	/* Hero Section with Grid Pattern */
	.hero-section {
		background-color: var(--navy);
		position: relative;
	}

	.grid-pattern {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0.4;
		background-image:
			/* Vertical lines */
			repeating-linear-gradient(
				90deg,
				transparent,
				transparent 49px,
				rgba(255, 255, 255, 0.1) 49px,
				rgba(255, 255, 255, 0.1) 50px
			),
			/* Horizontal lines */
			repeating-linear-gradient(
				0deg,
				transparent,
				transparent 49px,
				rgba(255, 255, 255, 0.1) 49px,
				rgba(255, 255, 255, 0.1) 50px
			);
		background-size: 50px 50px;
	}
</style>
