<script lang="ts">
	let copySuccess = false;
	let copyTimeout: number;

	const csrEmail = 'sikhaidcharity@gmail.com';

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(csrEmail);
			copySuccess = true;

			// Clear any existing timeout
			if (copyTimeout) {
				clearTimeout(copyTimeout);
			}

			// Reset success message after 2 seconds
			copyTimeout = setTimeout(() => {
				copySuccess = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy email:', err);
			// Fallback for older browsers
			const textArea = document.createElement('textarea');
			textArea.value = csrEmail;
			document.body.appendChild(textArea);
			textArea.select();
			document.execCommand('copy');
			document.body.removeChild(textArea);
			copySuccess = true;

			copyTimeout = setTimeout(() => {
				copySuccess = false;
			}, 2000);
		}
	}
</script>

<section class="py-16 px-4 bg-white">
	<div class="max-w-6xl mx-auto">
		<!-- Section Header -->
		<div class="text-center mb-12">
			<h3 class="text-lg md:text-xl text-orange-custom font-semibold mb-3">Support Our Cause</h3>
			<h2 class="text-3xl md:text-4xl font-bold text-navy">How Can You Help?</h2>
		</div>

		<!-- Support Options Grid -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
			<!-- Donation Section -->
			<div class="bg-white p-8 lg:p-10 rounded-xl shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow">
				<div class="text-center">
					<!-- Donation Icon -->
					<div class="flex justify-center mb-6">
						<div class="bg-orange-custom text-white p-4 rounded-full">
							<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
								<path d="M7 10l3 3 7-7" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</div>
					</div>

					<h3 class="text-2xl md:text-3xl font-bold text-navy mb-4">Donation</h3>

					<p class="text-gray-700 leading-relaxed mb-6">
						Join our mission to serve India during times of crisis. Your contribution directly funds emergency relief,
						community aid, and humanitarian support across the nation. All donations to SikhAid Charitable Trust are
						50% tax-exempt under section 80G of Income Tax Act.
					</p>

					<a
						href="/donate"
						class="inline-block bg-orange-custom hover:bg-orange-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors transform hover:scale-105"
					>
						Donate Now
					</a>
				</div>
			</div>

			<!-- CSR Section -->
			<div class="bg-white p-8 lg:p-10 rounded-xl shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow">
				<div class="text-center">
					<!-- CSR Icon -->
					<div class="flex justify-center mb-6">
						<div class="bg-navy text-white p-4 rounded-full">
							<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L11.5 4.5L15.1 8.1L9 14.2L7.8 13L3 17.8L5.2 20L10 15.2L11.2 16.4L17.3 10.3L20.9 13.9L21 9Z"/>
								<path d="M7 12L9 10L11 12M17 12L15 10L13 12" stroke="white" stroke-width="1" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</div>
					</div>

					<h3 class="text-2xl md:text-3xl font-bold text-navy mb-4">CSR Partnership</h3>

					<p class="text-gray-700 leading-relaxed mb-6">
						Partner with SikhAid for meaningful Corporate Social Responsibility initiatives. Together, we can create
						lasting impact through collaborative seva and community development programs that serve humanity with
						compassion and dignity.
					</p>

					<!-- Email with Copy Functionality -->
					<div class="space-y-3">
						<button
							on:click={copyToClipboard}
							class="inline-flex items-center space-x-2 bg-navy hover:bg-navy-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors transform hover:scale-105"
						>
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
								<path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
								<path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
							</svg>
							<span>{csrEmail}</span>
						</button>

						{#if copySuccess}
							<p class="text-sm text-green-600 font-medium">
								✓ Email copied to clipboard!
							</p>
						{:else}
							<p class="text-xs text-gray-500">
								Click to copy email address
							</p>
						{/if}
					</div>
				</div>
			</div>
		</div>

		<!-- Additional Info -->
		<div class="text-center mt-12">
			<p class="text-gray-600 max-w-2xl mx-auto">
				Whether through individual donations or corporate partnerships, every contribution helps us respond faster
				to emergencies and build stronger, more resilient communities across India.
			</p>
		</div>
	</div>
</section>

<style>
	:global(:root) {
		--navy: #1a237e;
		--navy-dark: #0d1660;
		--orange: #ff6b35;
		--orange-dark: #e55a2b;
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

	.text-orange-custom {
		color: var(--orange);
	}

	.bg-orange-custom {
		background-color: var(--orange);
	}

	.hover\:bg-orange-dark:hover {
		background-color: var(--orange-dark);
	}

	/* Enhanced hover effects */
	.transform.hover\:scale-105:hover {
		transform: scale(1.05);
	}

	/* Button focus states for accessibility */
	button:focus,
	a:focus {
		outline: 2px solid var(--orange);
		outline-offset: 2px;
	}

	/* Custom shadow effects */
	.shadow-xl {
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
	}

	.hover\:shadow-2xl:hover {
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
	}

	/* Responsive adjustments */
	@media (max-width: 1024px) {
		.grid-cols-1.lg\:grid-cols-2 {
			gap: 2rem;
		}
	}

	@media (max-width: 640px) {
		.p-8 {
			padding: 1.5rem;
		}

		.px-8 {
			padding-left: 1.5rem;
			padding-right: 1.5rem;
		}
	}
</style>