<script lang="ts">
	import PaymentForm from '$lib/components/PaymentForm.svelte';
</script>

<section id="donate" class="py-24 px-4 bg-navy text-white">
	<div class="max-w-7xl mx-auto text-center">
		<div class="mb-16">
			<h2 class="text-4xl md:text-5xl font-bold mb-6">Donate Now</h2>
			<p class="text-xl text-gray-200 max-w-2xl mx-auto">
				Your generous contribution will directly help flood victims receive immediate relief and support. 
				100% of donations go directly to relief efforts.
			</p>
		</div>

		<!-- Online Payment Section - Primary -->
		<div class="bg-white text-navy p-8 rounded-2xl shadow-xl mb-12 max-w-3xl mx-auto">
			<h3 class="text-3xl font-bold mb-8 text-center">Quick Online Payment</h3>
			
			<div class="space-y-6">
				<!-- Payment Form -->
				<PaymentForm />
				
				<!-- Popular Payment Methods -->
				<div class="text-center">
					<p class="text-sm text-gray-600 mb-3">Secure payments powered by Razorpay:</p>
					<div class="flex justify-center flex-wrap gap-3">
						<span class="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">UPI</span>
						<span class="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">Cards</span>
						<span class="bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full">Net Banking</span>
						<span class="bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full">Wallets</span>
					</div>
					<p class="text-xs text-gray-500 mt-2">UPI ID for direct transfer: 9340475426@okbiaxis</p>
				</div>
			</div>
		</div>

		<!-- Alternative Payment Methods -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
			<!-- Bank Details Card -->
			<div class="bg-white text-navy p-8 rounded-lg shadow-xl">
				<h3 class="text-2xl font-bold mb-6 text-center">Bank Transfer Details</h3>
				
				<div class="space-y-6">
					<div class="border-b border-gray-200 pb-4">
						<div class="text-sm text-gray-600 mb-1">Account Name</div>
						<div class="font-semibold text-lg">Sikh Aid Charitable Trust</div>
					</div>
					
					<div class="border-b border-gray-200 pb-4">
						<div class="text-sm text-gray-600 mb-1">Account Number</div>
						<div class="font-mono text-lg font-semibold">92102 00102 68306</div>
					</div>
					
					<div class="border-b border-gray-200 pb-4">
						<div class="text-sm text-gray-600 mb-1">IFSC Code</div>
						<div class="font-mono text-lg font-semibold">UTIB0003025</div>
					</div>
					
					<div class="border-b border-gray-200 pb-4">
						<div class="text-sm text-gray-600 mb-1">Bank Name</div>
						<div class="font-semibold text-lg">Axis Bank</div>
					</div>
					
					<div class="pb-4">
						<div class="text-sm text-gray-600 mb-1">SWIFT Code</div>
						<div class="font-mono text-lg font-semibold">AXISINBB438</div>
					</div>
				</div>
			</div>

			<!-- Instructions Card -->
			<div class="bg-white bg-opacity-10 p-8 rounded-lg backdrop-blur">
				<h3 class="text-2xl font-bold mb-6 text-left">How to Donate</h3>
				
				<div class="space-y-6">
					<div class="flex items-start space-x-4">
						<div class="bg-white text-navy p-2 rounded-full text-sm font-bold min-w-[2rem] text-center flex-shrink-0">1</div>
						<div class="text-left">
							<h4 class="font-semibold mb-2">Choose Your Amount</h4>
							<p class="text-gray-200">Any amount helps - from ₹100 to ₹10,000 or more</p>
						</div>
					</div>
					
					<div class="flex items-start space-x-4">
						<div class="bg-white text-navy p-2 rounded-full text-sm font-bold min-w-[2rem] text-center flex-shrink-0">2</div>
						<div class="text-left">
							<h4 class="font-semibold mb-2">Transfer Funds</h4>
							<p class="text-gray-200">Use the bank details provided or send via UPI</p>
						</div>
					</div>
					
					<div class="flex items-start space-x-4">
						<div class="bg-white text-navy p-2 rounded-full text-sm font-bold min-w-[2rem] text-center flex-shrink-0">3</div>
						<div class="text-left">
							<h4 class="font-semibold mb-2">Keep Receipt</h4>
							<p class="text-gray-200">Save your transaction receipt for tax benefits</p>
						</div>
					</div>
					
					<div class="flex items-start space-x-4">
						<div class="bg-white text-navy p-2 rounded-full text-sm font-bold min-w-[2rem] text-center flex-shrink-0">4</div>
						<div class="text-left">
							<h4 class="font-semibold mb-2">Get Updates</h4>
							<p class="text-gray-200">We'll share how your donation is making a difference</p>
						</div>
					</div>
				</div>

				<div class="mt-8 p-6 bg-white bg-opacity-20 rounded-lg text-left">
					<p class="text-lg font-semibold mb-2">Tax Deductible</p>
					<p class="text-sm text-gray-200">Donations are eligible for 80G tax benefits under Income Tax Act</p>
				</div>
			</div>
		</div>

		<div class="mt-12 text-center">
			<p class="text-lg text-gray-200 mb-4">
				Questions about donating? Need help with the process?
			</p>
			<a href="#contact" class="text-white underline hover:no-underline transition-all">
				Contact our support team →
			</a>
		</div>
	</div>
</section>

<style>
	.bg-navy {
		background-color: var(--navy);
	}
	
	.text-navy {
		color: var(--navy);
	}
</style>