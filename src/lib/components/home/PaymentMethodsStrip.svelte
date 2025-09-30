<script lang="ts">
	// Payment methods data with actual logos
	const paymentMethods = [
		{ name: 'Visa', logo: '/paymentLogo/visa.svg' },
		{ name: 'Mastercard', logo: '/paymentLogo/mastercard.svg' },
		{ name: 'UPI', logo: '/paymentLogo/UPI_logo.svg' },
		{ name: 'RuPay', logo: '/paymentLogo/RuPay.svg' },
		{ name: 'Razorpay', logo: '/paymentLogo/razorpay.svg' }
		// Note: Net Banking doesn't have a logo file, so we'll use a placeholder
	];

	// Net banking placeholder (since no logo available)
	const netBankingPlaceholder = {
		name: 'Net Banking',
		placeholder: true
	};
</script>

<!-- Payment Methods Strip -->
<section class="py-8 px-4 bg-white border-t border-b border-gray-200">
	<div class="max-w-6xl mx-auto">
		<div class="text-center">
			<h3 class="text-lg font-semibold text-navy mb-6">Ways to Donate</h3>
			<div class="flex justify-center items-center space-x-8 flex-wrap gap-4">

				<!-- Payment Method Logos -->
				{#each paymentMethods as method}
					<div class="flex items-center justify-center p-2">
						<img
							src={method.logo}
							alt="{method.name} Logo"
							class="h-8 w-auto object-contain transition-all duration-300"
							loading="lazy"
						/>
					</div>
				{/each}

				<!-- Net Banking Placeholder -->
				<!-- <div class="flex items-center justify-center p-2">
					<div class="w-16 h-8 bg-purple-600 rounded flex items-center justify-center">
						<span class="text-white font-bold text-xs">NET BANKING</span>
					</div>
				</div> -->
			</div>

			<p class="text-sm text-gray-600 mt-4">
				Secure payments powered by Razorpay • 100% safe and encrypted
			</p>
		</div>
	</div>
</section>

<style>
	:global(:root) {
		--navy: #1a237e;
	}

	.text-navy {
		color: var(--navy);
	}

	/* Enhanced hover effects for payment logos */
	img:hover {
		transform: scale(1.1);
	}

	/* Responsive adjustments */
	@media (max-width: 640px) {
		.space-x-8 {
			gap: 1rem;
		}

		img {
			max-height: 24px;
		}

		.w-16 {
			width: 3rem;
		}

		.h-8 {
			height: 1.5rem;
		}
	}

	/* Accessibility improvements */
	img:focus {
		outline: 2px solid var(--navy);
		outline-offset: 2px;
		border-radius: 4px;
	}
</style>