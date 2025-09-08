<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { 
		openRazorpayCheckout, 
		validateDonationAmount, 
		validatePhoneNumber, 
		validateName,
		type DonationData,
		type RazorpayResponse 
	} from '$lib/razorpay';

	// Form data
	let amount: number = 0;
	let name: string = '';
	let phone: string = '';
	
	// Form state
	let isProcessing: boolean = false;
	let errors: {[key: string]: string} = {};
	let showRetry: boolean = false;

	// Validation
	function validateForm(): boolean {
		errors = {};
		
		const amountError = validateDonationAmount(amount);
		if (amountError) errors.amount = amountError;
		
		const nameError = validateName(name);
		if (nameError) errors.name = nameError;
		
		const phoneError = validatePhoneNumber(phone);
		if (phoneError) errors.phone = phoneError;
		
		return Object.keys(errors).length === 0;
	}

	// Handle payment
	function handlePayment() {
		if (!validateForm()) return;
		
		isProcessing = true;
		showRetry = false;
		
		const donationData: DonationData = {
			amount,
			name: name.trim(),
			phone: phone.trim()
		};

		openRazorpayCheckout(
			donationData,
			handlePaymentSuccess,
			handlePaymentError
		);
	}

	function handlePaymentSuccess(response: RazorpayResponse) {
		isProcessing = false;
		console.log('Payment successful:', response);
		
		// Redirect to success page with payment ID
		goto(`/payment/success?payment_id=${response.razorpay_payment_id}&amount=${amount}&name=${encodeURIComponent(name)}`);
	}

	function handlePaymentError(error: any) {
		isProcessing = false;
		showRetry = true;
		console.error('Payment error:', error);
		
		// Handle different error types
		if (error.message === 'Payment cancelled by user') {
			errors.payment = 'Payment was cancelled. You can try again.';
		} else {
			errors.payment = 'Payment failed. Please try again or use alternative payment methods.';
		}
	}

	function retryPayment() {
		showRetry = false;
		errors.payment = '';
		handlePayment();
	}

	// Clear errors on input change
	function clearError(field: string) {
		if (errors[field]) {
			const newErrors = { ...errors };
			delete newErrors[field];
			errors = newErrors;
		}
	}
</script>

<div class="max-w-md mx-auto space-y-6">
	<!-- Amount Input -->
	<div>
		<label for="amount" class="block text-sm font-medium text-gray-700 mb-2">
			Donation Amount
		</label>
		<div class="relative">
			<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
				<span class="text-gray-500 text-lg">₹</span>
			</div>
			<input
				id="amount"
				type="number"
				min="10"
				max="500000"
				bind:value={amount}
				on:input={() => clearError('amount')}
				placeholder="10"
				class="block w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-navy text-lg"
				class:border-red-300={errors.amount}
				disabled={isProcessing}
			/>
		</div>
		{#if errors.amount}
			<p class="mt-1 text-sm text-red-600">{errors.amount}</p>
		{/if}
		<p class="mt-1 text-xs text-gray-500">Minimum amount: ₹10</p>
	</div>

	<!-- Name Input -->
	<div>
		<label for="name" class="block text-sm font-medium text-gray-700 mb-2">
			Full Name
		</label>
		<input
			id="name"
			type="text"
			bind:value={name}
			on:input={() => clearError('name')}
			placeholder="Enter your full name"
			class="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-navy"
			class:border-red-300={errors.name}
			disabled={isProcessing}
		/>
		{#if errors.name}
			<p class="mt-1 text-sm text-red-600">{errors.name}</p>
		{/if}
	</div>

	<!-- Phone Input -->
	<div>
		<label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
			Mobile Number
		</label>
		<input
			id="phone"
			type="tel"
			bind:value={phone}
			on:input={() => clearError('phone')}
			placeholder="10-digit mobile number"
			maxlength="10"
			class="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-navy"
			class:border-red-300={errors.phone}
			disabled={isProcessing}
		/>
		{#if errors.phone}
			<p class="mt-1 text-sm text-red-600">{errors.phone}</p>
		{/if}
	</div>

	<!-- Payment Error -->
	{#if errors.payment}
		<div class="bg-red-50 border border-red-200 rounded-lg p-4">
			<p class="text-sm text-red-800">{errors.payment}</p>
		</div>
	{/if}

	<!-- Action Buttons -->
	<div class="space-y-3">
		{#if showRetry}
			<button
				on:click={retryPayment}
				disabled={isProcessing}
				class="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
			>
				{#if isProcessing}
					<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
						<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
					</svg>
					Processing...
				{:else}
					Retry Payment
				{/if}
			</button>
		{/if}
		
		<button
			on:click={handlePayment}
			disabled={isProcessing || showRetry}
			class="w-full bg-navy hover:bg-navy-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
		>
			{#if isProcessing}
				<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
					<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
				</svg>
				Processing...
			{:else}
				Donate Now
			{/if}
		</button>
	</div>

	<!-- Security Note -->
	<div class="text-center">
		<p class="text-xs text-gray-500">
			🔒 Secure payment powered by Razorpay<br>
			Your payment information is encrypted and secure
		</p>
	</div>
</div>

<style>
	.bg-navy {
		background-color: var(--navy);
	}
	
	.hover\:bg-navy-dark:hover {
		background-color: var(--navy-dark);
	}
	
	.focus\:ring-navy:focus {
		ring-color: var(--navy);
	}
	
	.focus\:border-navy:focus {
		border-color: var(--navy);
	}
</style>