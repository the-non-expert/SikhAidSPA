<!-- Desktop Hero Section -->
<section id="hero" class="min-h-screen lg:flex hidden relative overflow-hidden">
	<!-- Left Side - Photo Gallery -->
	<div class="w-1/2 p-8 flex items-center justify-center">
		<div class="grid grid-cols-1 gap-4 w-full max-w-md">
			<!-- First image -->
			<img src="https://i.ibb.co/Ng9wNgP4/IMG-20250930-WA0069.jpg" alt="Punjab Flood Relief" class="w-full h-60 object-cover rounded-lg shadow-lg" />

			<!-- Second image -->
			<img src="https://i.ibb.co/B20Q7cBV/Hero1.jpg" alt="Relief Operations" class="w-full h-60 object-cover rounded-lg shadow-lg" />

			<!-- Third image -->
			<img src="https://i.ibb.co/Gfyr5TNC/Hero4.jpg" alt="Volunteers" class="w-full h-60 object-cover rounded-lg shadow-lg" />
		</div>
	</div>

	<!-- Right Side - Content -->
	<div class="w-1/2 flex items-center justify-center p-1">
		<div class="max-w-xl">
			<p class="text-gray-600 text-lg italic mb-6 font-light">
				Delivering Urgent Aid. Restoring Lives.
			</p>

			<h1 class="text-5xl font-bold text-navy mb-2 leading-tight">
				Join Us to help
			</h1>

			<h2 class="text-5xl font-bold text-orange-custom mb-8 leading-tight">
				Punjab Rise Again
			</h2>

			<p class="text-gray-700 text-lg mb-8 leading-relaxed">
				The floods in Punjab have destroyed homes and displaced thousands of families. SikhAid is on the ground, providing food, water, shelter, and medical aid. Your support can bring hope and relief to those who have lost everything.
			</p>

			<a href="/donate" class="inline-block bg-orange-custom hover:bg-orange-dark text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors uppercase tracking-wide shadow-lg">
				DONATE NOW
			</a>
		</div>
	</div>
</section>

<!-- Mobile Hero Section -->
<section id="hero-mobile" class="min-h-screen lg:hidden flex items- justify-center relative overflow-hidden">
	<!-- Background image with overlay -->
	<div class="absolute inset-0 bg-cover bg-center bg-no-repeat" style="background-image: url('https://i.ibb.co/B20Q7cBV/Hero1.jpg');">
		<div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/70"></div>
	</div>

	<!-- Content -->
	<div class="relative z-10 px-6 py-20 text-center max-w-lg mx-auto">
		<p class="text-gray-200 text-base italic mb-4 font-light">
			Delivering Urgent Aid. Restoring Lives.
		</p>

		<h1 class="text-3xl font-bold text-white mb-2 leading-tight">
			Join Us to help
		</h1>

		<h2 class="text-3xl font-bold text-orange-custom mb-6 leading-tight">
			Punjab Rise Again
		</h2>

		<p class="text-gray-100 text-xs mb-8 leading-relaxed">
			The floods in Punjab have destroyed homes and displaced thousands of families. SikhAid is on the ground, providing food, water, shelter, and medical aid. Your support can bring hope and relief to those who have lost everything.
		</p>

		<a href="/donate" class="inline-block bg-orange-custom hover:bg-orange-dark text-white px-6 py-3 rounded-lg font-semibold text-base transition-colors uppercase tracking-wide shadow-lg">
			DONATE NOW
		</a>
	</div>
</section>

<style>
	.text-navy {
		color: var(--navy);
	}
	
	.bg-navy {
		background-color: var(--navy);
	}
	
	.hover\:bg-navy-dark:hover {
		background-color: var(--navy-dark);
	}
	
	.border-navy {
		border-color: var(--navy);
	}
</style>