<script lang="ts">
	import { goto } from '$app/navigation';

	function tryAgain() {
		goto('/#donate');
	}

	function goBackToHome() {
		goto('/');
	}
</script>

<svelte:head>
	<title>Payment Failed - Punjab Floods Relief Aid 2025</title>
	<meta name="description" content="Payment failed. You can try again or use alternative payment methods for Punjab Floods Relief Aid 2025." />
</svelte:head>

<main class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
	<div class="max-w-md mx-auto bg-white rounded-lg shadow-xl p-8 text-center">
		<!-- Error Icon -->
		<div class="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
			<svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
			</svg>
		</div>

		<!-- Error Message -->
		<h1 class="text-2xl font-bold text-gray-900 mb-4">
			Payment Failed
		</h1>
		
		<div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
			<p class="text-red-800 mb-2">
				We couldn't process your payment at this time.
			</p>
			<p class="text-sm text-red-700">
				This might be due to network issues, insufficient funds, or other temporary problems.
			</p>
		</div>

		<!-- Alternative Options -->
		<div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
			<h3 class="font-semibold text-blue-900 mb-3">You can also donate via:</h3>
			<div class="space-y-2 text-sm text-blue-800">
				<div class="flex items-center space-x-2">
					<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
						<path d="M5 13l4 4L19 7"/>
					</svg>
					<span>Direct bank transfer (details below)</span>
				</div>
				<div class="flex items-center space-x-2">
					<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
						<path d="M5 13l4 4L19 7"/>
					</svg>
					<span>UPI transfer to: 9340475426@okbiaxis</span>
				</div>
			</div>
		</div>

		<!-- Bank Details Quick Reference -->
		<div class="bg-gray-50 rounded-lg p-4 mb-6 text-left">
			<h3 class="font-semibold text-gray-900 mb-3">Quick Bank Details:</h3>
			<div class="space-y-1 text-xs text-gray-600">
				<div><strong>Account:</strong> Sikh Aid Charitable Trust</div>
				<div><strong>Account No:</strong> 92102 00102 68306</div>
				<div><strong>IFSC:</strong> UTIB0003025</div>
				<div><strong>Bank:</strong> Axis Bank</div>
			</div>
		</div>

		<!-- Action Buttons -->
		<div class="space-y-3">
			<button
				on:click={tryAgain}
				class="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
			>
				Try Payment Again
			</button>
			
			<button
				on:click={goBackToHome}
				class="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-colors"
			>
				Back to Home
			</button>
		</div>

		<!-- Help Note -->
		<div class="mt-6 pt-6 border-t border-gray-200">
			<p class="text-xs text-gray-500">
				Need help? Contact us at<br>
				<span class="font-semibold">sikhaidcharity@gmail.com</span> or <span class="font-semibold">+91 98513 41234</span>
			</p>
		</div>
	</div>
</main>