<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	// Extract URL parameters
	let paymentId: string = '';
	let amount: string = '';
	let donorName: string = '';

	onMount(() => {
		paymentId = $page.url.searchParams.get('payment_id') || '';
		amount = $page.url.searchParams.get('amount') || '';
		donorName = $page.url.searchParams.get('name') || 'Anonymous Donor';

		// If no payment ID, redirect to donate page
		if (!paymentId) {
			goto('/');
		}
	});

	function goBackToHome() {
		goto('/');
	}

	function donateAgain() {
		goto('/#donate');
	}
</script>

<svelte:head>
	<title>Payment Successful - Punjab Floods Relief Aid 2025</title>
	<meta name="description" content="Thank you for your donation to Punjab Floods Relief Aid 2025. Your contribution will help flood-affected families." />
</svelte:head>

<main class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
	<div class="max-w-md mx-auto bg-white rounded-lg shadow-xl p-8 text-center">
		<!-- Success Icon -->
		<div class="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
			<svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
			</svg>
		</div>

		<!-- Success Message -->
		<h1 class="text-2xl font-bold text-gray-900 mb-4">
			Payment Successful!
		</h1>
		
		<div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
			<p class="text-lg text-green-800 font-semibold mb-2">
				Thank you for your donation.
			</p>
			<p class="text-green-700">
				Your contribution is highly appreciated.
			</p>
		</div>

		<!-- Payment Details -->
		{#if paymentId}
			<div class="bg-gray-50 rounded-lg p-4 mb-6 text-left">
				<h3 class="font-semibold text-gray-900 mb-3">Payment Details:</h3>
				<div class="space-y-2 text-sm">
					<div class="flex justify-between">
						<span class="text-gray-600">Amount:</span>
						<span class="font-semibold">₹{amount}</span>
					</div>
					<div class="flex justify-between">
						<span class="text-gray-600">Donor:</span>
						<span class="font-semibold">{donorName}</span>
					</div>
					<div class="flex justify-between">
						<span class="text-gray-600">Payment ID:</span>
						<span class="font-mono text-xs text-gray-800">{paymentId}</span>
					</div>
				</div>
			</div>
		{/if}

		<!-- Receipt Information -->
		<div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
			<div class="flex items-start space-x-3">
				<svg class="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
					<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
					<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
				</svg>
				<div class="text-left">
					<p class="text-sm font-semibold text-blue-900">Email Receipt Sent</p>
					<p class="text-xs text-blue-700">You will receive a payment receipt via email shortly for tax benefits (80G).</p>
				</div>
			</div>
		</div>

		<!-- Impact Message -->
		<div class="mb-6">
			<p class="text-sm text-gray-600">
				Your donation will provide immediate relief to flood-affected families in Punjab. 
				We'll keep you updated on the impact of your contribution.
			</p>
		</div>

		<!-- Action Buttons -->
		<div class="space-y-3">
			<button
				on:click={donateAgain}
				class="w-full bg-navy hover:bg-navy-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors"
			>
				Donate Again
			</button>
			
			<button
				on:click={goBackToHome}
				class="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-colors"
			>
				Back to Home
			</button>
		</div>

		<!-- Thank You Note -->
		<div class="mt-6 pt-6 border-t border-gray-200">
			<p class="text-xs text-gray-500">
				From all of us at Sikh Aid Charitable Trust,<br>
				<span class="font-semibold">Thank you for your kindness and generosity.</span>
			</p>
		</div>
	</div>
</main>

<style>
	.bg-navy {
		background-color: var(--navy);
	}
	
	.hover\:bg-navy-dark:hover {
		background-color: var(--navy-dark);
	}
</style>