<script lang="ts">
	import { addVolunteerSubmission } from '$lib/stores/volunteering';
	import { addVolunteerToFirestore } from '$lib/firestore';

	let formData = {
		fullName: '',
		email: '',
		mobile: '',
		gender: '',
		address: '',
		opportunity: '',
		durationMonths: '',
		durationYears: '',
		startDate: '',
		about: ''
	};

	let isSubmitting = false;
	let submitMessage = '';

	async function handleSubmit() {
		isSubmitting = true;
		submitMessage = '';

		try {
			// Add submission to store (will console log automatically)
			addVolunteerSubmission(formData);
			
			// Save to Firestore
			await addVolunteerToFirestore(formData);

			// Reset form
			formData = {
				fullName: '',
				email: '',
				mobile: '',
				gender: '',
				address: '',
				opportunity: '',
				durationMonths: '',
				durationYears: '',
				startDate: '',
				about: ''
			};

			submitMessage = 'Thank you for your interest! Our team will reach out to you soon.';
		} catch (error) {
			submitMessage = 'Sorry, there was an error submitting your application. Please try again.';
			console.error('Volunteer form submission error:', error);
		} finally {
			isSubmitting = false;
		}
	}

	const opportunities = [
		{
			id: 'online-volunteering',
			title: 'Online Volunteering',
			description: 'Support our mission remotely through virtual coordination, administrative tasks, and digital assistance.',
			image: 'https://i.ibb.co/S4ZDMGfh/168.png'
		},
		{
			id: 'blogging',
			title: 'Blogging',
			description: 'Share impactful stories, document our relief efforts, and create compelling content that inspires action.',
			image: 'https://i.ibb.co/chXkRPDx/147.png'
		},
		{
			id: 'social-media',
			title: 'Social Media',
			description: 'Manage our social presence, engage communities, and amplify our message across digital platforms.',
			image: 'https://i.ibb.co/Pvb6V68C/153.png'
		},
		{
			id: 'fundraising',
			title: 'Online Fundraising',
			description: 'Drive donation campaigns, reach out to potential donors, and help us expand our impact through digital fundraising.',
			image: 'https://i.ibb.co/n8bLzJWC/Oxygen-Main.png'
		}
	];
</script>

<svelte:head>
	<title>Volunteer with SikhAid - Make a Difference</title>
	<meta name="description" content="Join SikhAid's volunteer network and make a meaningful impact. Opportunities in online volunteering, blogging, social media, and fundraising." />
</svelte:head>

<main class="pt-32 min-h-screen">
	<!-- Hero Section with Grid Pattern -->
	<section class="hero-section py-16 px-4 text-white relative overflow-hidden">
		<!-- Grid Pattern Overlay -->
		<div class="grid-pattern"></div>

		<div class="max-w-6xl mx-auto text-center relative z-10">
			<h1 class="text-4xl md:text-6xl font-bold mb-6">Why Volunteer with SikhAid?</h1>
			<p class="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed mb-8">
				Join a passionate community dedicated to serving humanity. Your skills, time, and compassion can create lasting change in the lives of those who need it most.
			</p>

			<!-- Breadcrumb -->
			<nav class="text-sm md:text-base">
				<a href="/" class="hover:text-orange-custom transition-colors">Home</a>
				<span class="mx-2">/</span>
				<span class="text-orange-custom">Volunteering Opportunities</span>
			</nav>
		</div>
	</section>

	<!-- Volunteer Opportunities Grid -->
	<section class="py-16 px-4 bg-gray-50">
		<div class="max-w-6xl mx-auto">
			<div class="text-center mb-12">
				<h2 class="text-3xl md:text-4xl font-bold text-navy mb-4">Volunteer Opportunities</h2>
				<p class="text-lg text-gray-600 max-w-2xl mx-auto">
					Choose an area that matches your skills and passion. Every contribution makes a difference.
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
				{#each opportunities as opportunity}
					<div class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
						<!-- Image Section -->
						<div class="h-48 overflow-hidden">
							<img
								src={opportunity.image}
								alt={opportunity.title}
								class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
							/>
						</div>

						<!-- Content Section -->
						<div class="p-6">
							<h3 class="text-2xl font-bold text-navy mb-3">{opportunity.title}</h3>
							<p class="text-gray-600 leading-relaxed mb-6">{opportunity.description}</p>
							<button
								class="bg-orange-custom hover:bg-orange-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors w-full"
								on:click={() => {
									formData.opportunity = opportunity.id;
									document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' });
								}}
							>
								Register Now
							</button>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Registration Form Section -->
	<section id="registration-form" class="py-16 px-4 bg-white">
		<div class="max-w-4xl mx-auto">
			<div class="text-center mb-12">
				<h2 class="text-3xl md:text-4xl font-bold text-navy mb-4">Volunteer Registration</h2>
				<p class="text-lg text-gray-600">
					Fill out the form below and our team will get in touch with you shortly.
				</p>
			</div>

			<form on:submit|preventDefault={handleSubmit} class="bg-gray-50 rounded-xl p-8 md:p-10 shadow-lg">
				<!-- Personal Details Section -->
				<div class="mb-8">
					<h3 class="text-xl font-bold text-navy mb-6 pb-2 border-b-2 border-navy">Personal Details</h3>

					<div class="space-y-6">
						<!-- Full Name -->
						<div>
							<label for="fullName" class="block text-sm font-semibold text-gray-700 mb-2">
								Full Name <span class="text-red-500">*</span>
							</label>
							<input
								type="text"
								id="fullName"
								bind:value={formData.fullName}
								required
								class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent transition-all"
								placeholder="Enter your full name"
							/>
						</div>

						<!-- Email and Mobile -->
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
									placeholder="your.email@example.com"
								/>
							</div>
							<div>
								<label for="mobile" class="block text-sm font-semibold text-gray-700 mb-2">
									Mobile Number <span class="text-red-500">*</span>
								</label>
								<input
									type="tel"
									id="mobile"
									bind:value={formData.mobile}
									required
									minlength="10"
									maxlength="10"
									class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent transition-all"
									placeholder="10-digit mobile number"
								/>
								<p class="text-xs text-gray-500 mt-1">Enter 10-digit mobile number without spaces or dashes</p>
							</div>
						</div>

						<!-- Gender -->
						<div>
							<label class="block text-sm font-semibold text-gray-700 mb-3">
								Gender <span class="text-red-500">*</span>
							</label>
							<div class="flex gap-6">
								<label class="flex items-center cursor-pointer">
									<input
										type="radio"
										bind:group={formData.gender}
										value="male"
										required
										class="w-4 h-4 text-navy focus:ring-navy"
									/>
									<span class="ml-2 text-gray-700">Male</span>
								</label>
								<label class="flex items-center cursor-pointer">
									<input
										type="radio"
										bind:group={formData.gender}
										value="female"
										required
										class="w-4 h-4 text-navy focus:ring-navy"
									/>
									<span class="ml-2 text-gray-700">Female</span>
								</label>
							</div>
						</div>

						<!-- Address -->
						<div>
							<label for="address" class="block text-sm font-semibold text-gray-700 mb-2">
								Address <span class="text-red-500">*</span>
							</label>
							<textarea
								id="address"
								bind:value={formData.address}
								required
								rows="3"
								class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-all"
								placeholder="Enter your complete address"
							></textarea>
						</div>
					</div>
				</div>

				<!-- Volunteering Details Section -->
				<div class="mb-8">
					<h3 class="text-xl font-bold text-navy mb-6 pb-2 border-b-2 border-navy">Volunteering Details</h3>

					<div class="space-y-6">
						<!-- Area of Interest -->
						<div>
							<label for="opportunity" class="block text-sm font-semibold text-gray-700 mb-2">
								Selected Area of Interest <span class="text-red-500">*</span>
							</label>
							<select
								id="opportunity"
								bind:value={formData.opportunity}
								required
								class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent transition-all"
							>
								<option value="">Select an opportunity</option>
								<option value="online-volunteering">Online Volunteering</option>
								<option value="blogging">Blogging</option>
								<option value="social-media">Social Media</option>
								<option value="fundraising">Online Fundraising</option>
							</select>
						</div>

						<!-- Duration -->
						<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label for="durationMonths" class="block text-sm font-semibold text-gray-700 mb-2">
									Duration (Months) <span class="text-red-500">*</span>
								</label>
								<select
									id="durationMonths"
									bind:value={formData.durationMonths}
									required
									class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent transition-all"
								>
									<option value="">Select months</option>
									<option value="1-3">1-3 months</option>
									<option value="3-6">3-6 months</option>
									<option value="6-12">6-12 months</option>
									<option value="12+">12+ months</option>
								</select>
							</div>
							<div>
								<label for="durationYears" class="block text-sm font-semibold text-gray-700 mb-2">
									Experience (Years)
								</label>
								<select
									id="durationYears"
									bind:value={formData.durationYears}
									class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent transition-all"
								>
									<option value="">Select years</option>
									<option value="1">1 year</option>
									<option value="2">2 years</option>
									<option value="3+">3+ years</option>
								</select>
							</div>
						</div>

						<!-- Start Date -->
						<div>
							<label for="startDate" class="block text-sm font-semibold text-gray-700 mb-2">
								Available Start Date <span class="text-red-500">*</span>
							</label>
							<input
								type="date"
								id="startDate"
								bind:value={formData.startDate}
								required
								class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent transition-all"
							/>
						</div>

						<!-- About Yourself -->
						<div>
							<label for="about" class="block text-sm font-semibold text-gray-700 mb-2">
								About Yourself <span class="text-red-500">*</span>
							</label>
							<textarea
								id="about"
								bind:value={formData.about}
								required
								rows="5"
								class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-all"
								placeholder="Tell us about yourself, your skills, and why you want to volunteer with SikhAid..."
							></textarea>
						</div>
					</div>
				</div>

				<!-- Submit Message -->
				{#if submitMessage}
					<div class="mb-6 p-4 rounded-lg {submitMessage.includes('Thank you') ? 'bg-navy/10 text-navy border border-navy' : 'bg-red-50 text-red-700 border border-red-200'}">
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
						{isSubmitting ? 'Submitting...' : 'Submit'}
					</button>
					<p class="text-sm text-gray-500 mt-4">
						* The SikhAid team will reach out to you soon.
					</p>
				</div>
			</form>
		</div>
	</section>

	<!-- Call to Action -->
	<section class="py-16 px-4" style="background: linear-gradient(to right, var(--navy), var(--orange));">
		<div class="max-w-4xl mx-auto text-center text-white">
			<h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to Make an Impact?</h2>
			<p class="text-xl mb-8 text-gray-100">
				Join hundreds of volunteers who are changing lives every day. Your journey of seva starts here.
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
					Contact Us
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
