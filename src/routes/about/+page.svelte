<script lang="ts">
</script>

<svelte:head>
	<title>About Us - Sikh Aid Charitable Trust</title>
	<meta
		name="description"
		content="Learn about Sikh Aid Charitable Trust's mission to serve humanity with compassion and dignity during times of crisis. Serving Punjab and beyond since 2020."
	/>
</svelte:head>

<main class="pt-32 min-h-screen">
	<!-- Hero Section -->
	<section
		class="relative py-24 md:py-32 lg:py-40 px-4 text-white overflow-hidden"
	>
		<!-- Background Image -->
		<div
			class="absolute inset-0 bg-cover bg-center bg-no-repeat"
			style="background-image: url('https://i.ibb.co/XxbGRmcs/Group-Image.png');"
		>
			<!-- Overlay for text readability -->
			<div class="absolute inset-0 bg-black/60"></div>
		</div>

		<div class="relative z-10 max-w-6xl mx-auto text-center">
			<h1 class="text-4xl md:text-6xl font-bold drop-shadow-lg">
				SikhAid's Story
			</h1>
		</div>
	</section>

	<!-- Inception Section -->
	<section class="py-16 px-4 bg-white">
		<div class="max-w-6xl mx-auto">
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
				<!-- Left: Inception Title with Brush Stroke -->
				<div class="lg:col-span-1">
					<div class="relative inline-block">
						<!-- Orange brush stroke decoration -->
						<svg
							class="absolute -left-4 -top-2 w-48 h-24 text-orange-custom opacity-30"
							viewBox="0 0 200 100"
							fill="currentColor"
						>
							<path
								d="M10,50 Q50,10 100,40 T190,50 Q150,80 100,60 T10,50 Z"
							/>
						</svg>
						<h2
							class="text-4xl md:text-5xl font-bold text-navy relative z-10"
						>
							Inception
						</h2>
					</div>
				</div>

				<!-- Right: Story Content -->
				<div
					class="lg:col-span-2 space-y-6 text-gray-700 leading-relaxed"
				>
					<p>
						In 2020, when COVID-19 hit India, we couldn't
						stand by and watch. Driven by the Sikh principles of
						unconditional love and selfless service, he founded
						SikhAid Charitable Trust—a non-profit organization
						dedicated to serving humanity in its most vulnerable
						moments.
					</p>

					<p>
						During the lockdown, SikhAid got to work immediately.
						The organization provided free oxygen tanks, pulse
						oximeters, masks, and whatever else was needed to help
						people survive the pandemic. When the devastating second
						wave struck, the team rose to the challenge, delivering
						oxygen to nearly 40,000 people across Odisha. Raunak
						became known as the "oxygen man of Odisha"—a humble
						recognition of the trust's life-saving efforts.
					</p>

					<p>
						Today, SikhAid's work spans five critical areas: <strong
							>Disaster Relief</strong
						>
						during natural calamities like floods and earthquakes;
						<strong>Education</strong>
						support through scholarships and school supplies for
						underprivileged children; <strong>Healthcare</strong>
						assistance including medical treatments and access to
						facilities; <strong>Food and Nutrition</strong> programs
						providing meals and groceries to families in need; and
						<strong>Women Empowerment</strong> through vocational training
						and health support.
					</p>

					<p>
						The organization's work has been recognized with the
						Covid Warrior Award, and Raunak was honored with the
						Best CEO Award for an NGO in 2022. But the real reward
						comes from knowing that SikhAid is making a tangible
						difference in people's lives.
					</p>

					<p
						class="italic text-gray-800 border-l-4 border-orange-custom pl-4"
					>
						"Every bit of support helps us make a bigger impact.
						Remember, your actions matter—whether big or small, we
						all have the power to make a positive change. Let's work
						together to create a better world."
					</p>

					<p class="font-semibold text-navy">
						Raunak Singh<br />
						<span class="text-sm text-gray-600"
							>Founder & CEO, SikhAid Charitable Trust</span
						>
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Photo Collage & Mission/Vision Section -->
	<section class="py-16 px-4 bg-gray-900">
		<div class="max-w-7xl mx-auto">
			<!-- Photo Collage -->
			<div class="photo-collage-container mb-16">
				<div class="photo-grid">
					<!-- Row 1 -->
					<img src="https://i.ibb.co/chXkRPDx/147.png" alt="Langar Aid" class="collage-photo" />
					<img src="https://i.ibb.co/8gRBfkV5/148.png" alt="Food Distribution" class="collage-photo" />
					<img src="https://i.ibb.co/1tXPdK2m/149.png" alt="Meal Preparation" class="collage-photo" />
					<img src="https://i.ibb.co/F42y3Z90/150.png" alt="Community Service" class="collage-photo" />

					<!-- Row 2 -->
					<img src="https://i.ibb.co/Pvb6V68C/153.png" alt="No Spot Initiative" class="collage-photo" />
					<img src="https://i.ibb.co/ZpNYDK8C/154.png" alt="Women Empowerment" class="collage-photo" />
					<img src="https://i.ibb.co/WW2SqyRG/155.png" alt="Hygiene Awareness" class="collage-photo" />
					<img src="https://i.ibb.co/F4PKdh2n/156.png" alt="Community Support" class="collage-photo" />

					<!-- Row 3 -->
					<!-- <img src="https://i.ibb.co/S4ZDMGfh/168.png" alt="COVID Relief" class="collage-photo" />
					<img src="https://i.ibb.co/N2KPNs6J/164.png" alt="Oxygen Support" class="collage-photo" />
					<img src="https://i.ibb.co/q3qjnfNd/165.png" alt="Medical Aid" class="collage-photo" />
					<img src="https://i.ibb.co/LhgSyWJJ/171.png" alt="Education Support" class="collage-photo" /> -->

					<!-- Row 4 -->
					<!-- <img src="https://i.ibb.co/SXd9fQTp/172.png" alt="Medical Camps" class="collage-photo" />
					<img src="https://i.ibb.co/5WCLwQXv/173.png" alt="Emergency Response" class="collage-photo" />
					<img src="https://i.ibb.co/nsTW1dT9/160.png" alt="Blanket Distribution" class="collage-photo" /> -->
				</div>
			</div>

			<!-- Mission & Vision -->
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 text-white">
				<!-- Our Mission -->
				<div>
					<h2 class="text-3xl font-bold mb-6">Our Mission</h2>
					<p class="text-gray-300 leading-relaxed">
						A non-profit organisation fighting inequality, poverty and disease through humanitarian aid, relief in case of disasters, healthcare support, education and access to livelihoods for economically weaker sections of society.
					</p>
				</div>

				<!-- Our Vision -->
				<div>
					<h2 class="text-3xl font-bold mb-6">Our Vision</h2>
					<p class="text-gray-300 leading-relaxed">
						Our vision is a world where welfare is accessible to all, regardless of socio-economic status, ethnicity, or geography. We aspire to create inclusive and sustainable solutions that empower individuals and communities, fostering a brighter and more equitable future for generations to come.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Our Philosophy -->
	<section class="py-16 px-4 bg-gray-50">
		<div class="max-w-6xl mx-auto">
			<div class="text-center mb-12">
				<h2 class="text-3xl md:text-4xl font-bold text-navy mb-4">Our Philosophy</h2>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div class="bg-white p-8 rounded-lg shadow-md card-solid-bg">
					<div class="flex items-center justify-center mb-6">
						<div class="bg-navy text-white p-4 rounded-full">
							<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
							</svg>
						</div>
					</div>
					<h4 class="font-bold text-xl text-navy text-center mb-3">Thousands of Lives Impacted</h4>
					<p class="text-gray-600 text-center">Across Odisha and beyond through diverse initiatives</p>
				</div>

				<div class="bg-white p-8 rounded-lg shadow-md card-solid-bg">
					<div class="flex items-center justify-center mb-6">
						<div class="bg-navy text-white p-4 rounded-full">
							<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
								<path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
							</svg>
						</div>
					</div>
					<h4 class="font-bold text-xl text-navy text-center mb-3">Strong Volunteer Base</h4>
					<p class="text-gray-600 text-center">Dedicated volunteers and kind-hearted donors</p>
				</div>

				<div class="bg-white p-8 rounded-lg shadow-md card-solid-bg">
					<div class="flex items-center justify-center mb-6">
						<div class="bg-navy text-white p-4 rounded-full">
							<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
							</svg>
						</div>
					</div>
					<h4 class="font-bold text-xl text-navy text-center mb-3">Kindness as a Way of Life</h4>
					<p class="text-gray-600 text-center">Creating a society where kindness is not occasional but constant</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Our Work Areas & Approach -->
	<section class="py-16 px-4 bg-white">
		<div class="max-w-7xl mx-auto">
			<!-- Section Header -->
			<div class="text-center mb-16">
				<h2 class="text-3xl md:text-4xl font-bold text-navy mb-4">Our Work Areas</h2>
				<p class="text-gray-600 max-w-3xl mx-auto">
					During times of crisis or celebration, our team stands at the forefront whether it's providing oxygen during the pandemic or distributing food and water during mass festivals like Rath Yatra.
				</p>
			</div>

			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
				<!-- Left Column: Work Areas -->
				<div class="space-y-6">
					<!-- Medical Aid Camps -->
					<div class="flex gap-6 p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300">
						<div class="flex-shrink-0">
							<div class="w-14 h-14 bg-navy rounded-full flex items-center justify-center">
								<svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
								</svg>
							</div>
						</div>
						<div class="flex-1">
							<h3 class="text-xl font-bold text-navy mb-2">Medical Aid Camps</h3>
							<p class="text-gray-600 leading-relaxed">
								Organizing healthcare services and medical camps in underserved areas with free medicines and treatments.
							</p>
						</div>
					</div>

					<!-- Educational Support -->
					<div class="flex gap-6 p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300">
						<div class="flex-shrink-0">
							<div class="w-14 h-14 bg-navy rounded-full flex items-center justify-center">
								<svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
								</svg>
							</div>
						</div>
						<div class="flex-1">
							<h3 class="text-xl font-bold text-navy mb-2">Educational Support</h3>
							<p class="text-gray-600 leading-relaxed">
								Distributing educational materials and offering tuition classes for underprivileged children.
							</p>
						</div>
					</div>

					<!-- Emergency Response -->
					<div class="flex gap-6 p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300">
						<div class="flex-shrink-0">
							<div class="w-14 h-14 bg-navy rounded-full flex items-center justify-center">
								<svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
								</svg>
							</div>
						</div>
						<div class="flex-1">
							<h3 class="text-xl font-bold text-navy mb-2">Emergency Response</h3>
							<p class="text-gray-600 leading-relaxed">
								Providing oxygen during pandemic, food and water during festivals and natural disasters.
							</p>
						</div>
					</div>
				</div>

				<!-- Right Column: Our Approach -->
				<div class="lg:pl-8">
					<div class="bg-gradient-to-br from-orange-custom/10 to-orange-custom/5 rounded-2xl p-8 h-full border-l-4 border-orange-custom">
						<h3 class="text-2xl font-bold text-navy mb-8">Our Approach</h3>

						<div class="space-y-8">
							<!-- Compassionate Service -->
							<div class="relative pl-6">
								<div class="absolute left-0 top-0 w-1 h-full bg-orange-custom/30 rounded"></div>
								<div class="absolute left-0 top-1 w-3 h-3 bg-orange-custom rounded-full -translate-x-1"></div>
								<h4 class="font-bold text-lg text-navy mb-2">Compassionate Service</h4>
								<p class="text-gray-700 leading-relaxed">
									Rooted in the spirit of seva with dignity, education, and healthcare for all
								</p>
							</div>

							<!-- Community Engagement -->
							<div class="relative pl-6">
								<div class="absolute left-0 top-0 w-1 h-full bg-orange-custom/30 rounded"></div>
								<div class="absolute left-0 top-1 w-3 h-3 bg-orange-custom rounded-full -translate-x-1"></div>
								<h4 class="font-bold text-lg text-navy mb-2">Community Engagement</h4>
								<p class="text-gray-700 leading-relaxed">
									Working closely with local communities to understand and address their needs
								</p>
							</div>

							<!-- Sustainable Impact -->
							<div class="relative pl-6">
								<div class="absolute left-0 top-0 w-1 h-full bg-orange-custom/30 rounded"></div>
								<div class="absolute left-0 top-1 w-3 h-3 bg-orange-custom rounded-full -translate-x-1"></div>
								<h4 class="font-bold text-lg text-navy mb-2">Sustainable Impact</h4>
								<p class="text-gray-700 leading-relaxed">
									Creating lasting change that empowers communities to thrive independently
								</p>
							</div>
						</div>
					</div>
				</div>
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

	.text-orange-custom {
		color: var(--orange);
	}

	.border-orange-custom {
		border-color: var(--orange);
	}

	/* Photo Collage Styles */
	.photo-collage-container {
		overflow: hidden;
		padding: 20px;
	}

	.photo-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 12px;
		transform: skewY(-2deg);
		max-width: 1200px;
		margin: 0 auto;
	}

	.collage-photo {
		width: 100%;
		height: 250px;
		object-fit: cover;
		border-radius: 8px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.collage-photo:hover {
		transform: scale(1.05) rotate(1deg);
		box-shadow: 0 8px 12px rgba(0, 0, 0, 0.4);
		z-index: 10;
	}

	/* Responsive Photo Grid */
	@media (max-width: 1024px) {
		.photo-grid {
			grid-template-columns: repeat(3, 1fr);
			gap: 10px;
		}

		.collage-photo {
			height: 200px;
		}
	}

	@media (max-width: 640px) {
		.photo-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 8px;
			transform: skewY(-1deg);
		}

		.collage-photo {
			height: 150px;
		}
	}
</style>
