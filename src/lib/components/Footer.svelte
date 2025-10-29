<script lang="ts">
	// Footer component - no admin logic needed here
</script>

<footer
	class="relative text-gray-800 py-16 px-4 border-t border-gray-200 overflow-hidden min-h-[600px] md:min-h-[400px]"
>
	<!-- Background Image -->
	<div
		class="absolute inset-0 bg-cover bg-center bg-no-repeat"
		style="background-image: url('https://i.ibb.co/XxbGRmcs/Group-Image.png'); background-size: cover; background-position: center center;"
	>
		<!-- Overlay for text readability -->
		<div class="absolute inset-0 bg-white/80"></div>
	</div>

	<div class="relative z-10 max-w-6xl mx-auto">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
			<!-- Organization Info -->
			<div class="lg:col-span-2">
				<div class="flex items-center mb-6">
					<a href="/">
						<img
							src="/sikhaidLogo.png"
							alt="SikhAid Logo"
							class="h-20 w-auto mr-4"
						/></a
					>
					<h3 class="text-2xl font-bold text-navy">
						SikhAid Charitable Trust
					</h3>
				</div>
				<p class="text-gray-600 mb-6 leading-relaxed max-w-md">
					Serving India with humanitarian aid and disaster relief
					since 2020. Our mission is to serve humanity with compassion
					and dignity during times of crisis.
				</p>

				<!-- Contact Information -->
				<div class="space-y-3">
					<div class="flex items-center space-x-3">
						<svg
							class="w-5 h-5 text-orange-custom"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
							/>
							<path
								d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
							/>
						</svg>
						<span class="text-gray-700"
							>help@sikhaid.ngo</span
						>
					</div>
					<div class="flex items-center space-x-3">
						<svg
							class="w-5 h-5 text-orange-custom"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
							/>
						</svg>
						<span class="text-gray-700">+91 98513 41234</span>
					</div>
					<div class="flex items-start space-x-3">
						<svg
							class="w-5 h-5 text-orange-custom mt-1"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fill-rule="evenodd"
								d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
								clip-rule="evenodd"
							/>
						</svg>
						<span class="text-gray-700"
							>House no. 222, Mangraj Lane<br />Cuttack Odisha
							753001</span
						>
					</div>
				</div>
			</div>

			<!-- Quick Links Column 1 -->
			<div>
				<h4 class="text-lg font-semibold mb-6 text-navy">
					Quick Links
				</h4>
				<div class="space-y-3">
					<a
						href="/"
						class="block text-gray-600 hover:text-orange-custom transition-colors"
						>Home</a
					>
					<a
						href="/about"
						class="block text-gray-600 hover:text-orange-custom transition-colors"
						>About Us</a
					>
					<a
						href="/campaigns"
						class="block text-gray-600 hover:text-orange-custom transition-colors"
						>Campaigns</a
					>
					<a
						href="/blog"
						class="block text-gray-600 hover:text-orange-custom transition-colors"
						>Blog</a
					>
				</div>
			</div>

			<!-- Quick Links Column 2 / Get Involved -->
			<div>
				<h4 class="text-lg font-semibold mb-6 text-navy">
					Get Involved
				</h4>
				<div class="space-y-3">
					<a
						href="/volunteering"
						class="block text-gray-600 hover:text-orange-custom transition-colors"
						>Volunteering</a
					>
					<a
						href="/csr"
						class="block text-gray-600 hover:text-orange-custom transition-colors"
						>CSR Partnerships</a
					>
					<a
						href="/donate"
						class="block text-gray-600 hover:text-orange-custom transition-colors"
						>Donate Now</a
					>
					<a
						href="/contact"
						class="block text-gray-600 hover:text-orange-custom transition-colors"
						>Contact</a
					>
				</div>
			</div>

			<!-- Legal Links -->
			<div>
				<h4 class="text-lg font-semibold mb-6 text-navy">Legal</h4>
				<div class="space-y-3">
					<a
						href="#"
						class="block text-gray-600 hover:text-orange-custom transition-colors"
						>Privacy Policy</a
					>
					<a
						href="#"
						class="block text-gray-600 hover:text-orange-custom transition-colors"
						>Terms of Service</a
					>
					<a
						href="#"
						class="block text-gray-600 hover:text-orange-custom transition-colors"
						>80G Certificate</a
					>
				</div>
			</div>
		</div>

		<!-- Bottom Bar -->
		<div class="pt-8 border-t border-black">
			<div
				class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
			>
				<div class="text-gray-500 text-sm text-center">
					<p>
						&copy; 2025 SikhAid Charitable Trust. All rights
						reserved. | www.sikhaid.ngo
					</p>
				</div>
				<div class="text-gray-500 text-sm">
				<p>
				Developed by <a
				href="https://ayushportfolio123.netlify.app/"
				target="_blank"
				rel="noopener noreferrer"
				class="text-orange-custom hover:underline">Ayush</a
				>
				from
				<a
				href="https://pixelwebpages.com/"
				target="_blank"
				rel="noopener noreferrer"
				class="text-orange-custom hover:underline"
				>Pixel Webpages</a
				>
				</p>
			</div>
			</div>
		</div>
	</div>
</footer>

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

	.text-orange-custom {
		color: var(--orange);
	}

	.hover\:text-orange-custom:hover {
		color: var(--orange);
	}

	.focus\:ring-navy:focus {
		--tw-ring-color: var(--navy);
	}
</style>
