<script lang="ts">
	let isAdminModalOpen = false;
	let adminPassword = '';
	let adminError = '';
	let isLoading = false;

	function showAdminModal() {
		isAdminModalOpen = true;
		adminPassword = '';
		adminError = '';
	}

	function closeAdminModal() {
		isAdminModalOpen = false;
		adminPassword = '';
		adminError = '';
	}

	async function handleAdminLogin() {
		if (!adminPassword.trim()) {
			adminError = 'Please enter password';
			return;
		}

		isLoading = true;
		adminError = '';

		// Check password
		if (adminPassword === 'Raunak@123') {
			// Set session cookie
			document.cookie = `admin_session=raunak_${Date.now()}; max-age=3600; path=/; samesite=strict`;
			
			// Redirect to admin panel
			window.location.href = '/admin';
		} else {
			adminError = 'Invalid password';
			isLoading = false;
		}
	}

	// Handle enter key
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleAdminLogin();
		}
	}
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
				> |
				 <button
				   on:click={showAdminModal}
						class="text-gray-400 hover:text-orange-custom transition-colors ml-2 text-xs"
						title="Admin Access"
					>
						Admin
					</button>
				</p>
			</div>
			</div>
		</div>
	</div>
</footer>

<!-- Admin Password Modal -->
{#if isAdminModalOpen}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
		<div class="bg-white rounded-xl shadow-2xl w-full max-w-md p-8">
			<!-- Modal Header -->
			<div class="flex items-center justify-between mb-6">
				<h3 class="text-2xl font-bold text-navy flex items-center">
					<svg class="w-6 h-6 mr-2 text-orange-custom" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
					</svg>
					Admin Access
				</h3>
				<button
					on:click={closeAdminModal}
					class="text-gray-400 hover:text-gray-600 transition-colors"
				>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<!-- Password Input -->
			<div class="mb-6">
				<label for="adminPassword" class="block text-sm font-semibold text-gray-700 mb-2">
					Admin Password
				</label>
				<input
					type="password"
					id="adminPassword"
					bind:value={adminPassword}
					on:keydown={handleKeydown}
					placeholder="Enter admin password"
					class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent transition-all"
					autofocus
				/>
			</div>

			<!-- Error Message -->
			{#if adminError}
				<div class="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
					<p class="text-red-700 text-sm">{adminError}</p>
				</div>
			{/if}

			<!-- Action Buttons -->
			<div class="flex gap-3">
				<button
					on:click={closeAdminModal}
					class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
				>
					Cancel
				</button>
				<button
					on:click={handleAdminLogin}
					disabled={isLoading}
					class="flex-1 px-6 py-3 bg-navy hover:bg-navy-dark text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
				>
					{#if isLoading}
						<svg class="w-5 h-5 animate-spin mr-2" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
						</svg>
						Authenticating...
					{:else}
						Access Admin Panel
					{/if}
				</button>
			</div>

			<!-- Info Text -->
			<p class="text-xs text-gray-500 mt-4 text-center">
				Session will expire in 1 hour
			</p>
		</div>
	</div>
{/if}

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
