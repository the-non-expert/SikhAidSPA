---
name: sikhaid-payment
description: Use when working with donations, payments, or Razorpay integration in SikhAid project. Covers Razorpay setup, payment validation, donation flow, success/failure handling, and payment configuration.
allowed-tools: Read, Edit, Write
---

# SikhAid Payment Integration

## Razorpay Integration Overview

### Payment Gateway
**Provider:** Razorpay
**Configuration File:** `src/lib/razorpay.ts`
**Payment Component:** `src/lib/components/PaymentForm.svelte`
**Success Page:** `src/routes/payment/success/+page.svelte`
**Failure Page:** `src/routes/payment/failure/+page.svelte`

### Razorpay Script Loading
**Location:** `src/routes/+layout.svelte`

```svelte
<script lang="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    // Load Razorpay checkout script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  });
</script>
```

## Razorpay Configuration

### Environment Variables
**File:** `.env`

```bash
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx  # Razorpay Key ID
VITE_ORGANIZATION_NAME=Sikh Aid Charitable Trust
VITE_SITE_URL=www.sikhaid.ngo
```

### Configuration Object
**File:** `src/lib/razorpay.ts`

```typescript
import { env } from '$env/dynamic/public';

export const razorpayConfig = {
  key: env.VITE_RAZORPAY_KEY_ID,
  currency: 'INR',
  name: env.VITE_ORGANIZATION_NAME || 'Sikh Aid Charitable Trust',
  description: 'Punjab Floods Relief Aid 2025',
  image: '/sikhaidLogo.png',
  theme: {
    color: '#1a237e' // Navy color
  }
};
```

## Donation Data Types

### DonationData Interface
```typescript
export interface DonationData {
  amount: number;  // Amount in INR
  name: string;    // Donor name
  phone: string;   // 10-digit mobile number
  email?: string;  // Optional email
}
```

### RazorpayResponse Interface
```typescript
export interface RazorpayResponse {
  razorpay_payment_id: string;   // Payment ID
  razorpay_order_id?: string;    // Order ID (if order created)
  razorpay_signature?: string;   // Signature for verification
}
```

## Validation Functions

### Amount Validation
**File:** `src/lib/razorpay.ts`

```typescript
const MIN_AMOUNT = 10;       // Minimum ₹10
const MAX_AMOUNT = 500000;   // Maximum ₹5,00,000

export function validateDonationAmount(amount: number): {
  valid: boolean;
  error: string;
} {
  if (!amount || amount <= 0) {
    return {
      valid: false,
      error: 'Please enter a valid amount'
    };
  }

  if (amount < MIN_AMOUNT) {
    return {
      valid: false,
      error: `Minimum donation amount is ₹${MIN_AMOUNT}`
    };
  }

  if (amount > MAX_AMOUNT) {
    return {
      valid: false,
      error: `Maximum donation amount is ₹${MAX_AMOUNT.toLocaleString('en-IN')}`
    };
  }

  return { valid: true, error: '' };
}
```

### Phone Number Validation
```typescript
export function validatePhoneNumber(phone: string): {
  valid: boolean;
  error: string;
} {
  // Indian mobile: 10 digits, starts with 6-9
  const phoneRegex = /^[6-9]\d{9}$/;

  if (!phone || !phone.trim()) {
    return {
      valid: false,
      error: 'Phone number is required'
    };
  }

  if (!phoneRegex.test(phone)) {
    return {
      valid: false,
      error: 'Please enter a valid 10-digit mobile number starting with 6-9'
    };
  }

  return { valid: true, error: '' };
}
```

### Name Validation
```typescript
export function validateName(name: string): {
  valid: boolean;
  error: string;
} {
  if (!name || !name.trim()) {
    return {
      valid: false,
      error: 'Name is required'
    };
  }

  if (name.trim().length < 2) {
    return {
      valid: false,
      error: 'Name must be at least 2 characters'
    };
  }

  return { valid: true, error: '' };
}
```

### Complete Validation Check
```typescript
export function validateRazorpaySetup(): boolean {
  if (!razorpayConfig.key) {
    console.error('❌ Razorpay key not configured');
    return false;
  }

  if (typeof window === 'undefined' || !window.Razorpay) {
    console.error('❌ Razorpay script not loaded');
    return false;
  }

  return true;
}
```

## Payment Flow

### Opening Razorpay Checkout
**File:** `src/lib/razorpay.ts`

```typescript
export function openRazorpayCheckout(
  donationData: DonationData,
  onSuccess: (response: RazorpayResponse) => void,
  onFailure: (error: any) => void
): void {
  // 1. Validate setup
  if (!validateRazorpaySetup()) {
    onFailure(new Error('Razorpay not configured properly'));
    return;
  }

  // 2. Validate donation data
  const amountValidation = validateDonationAmount(donationData.amount);
  if (!amountValidation.valid) {
    onFailure(new Error(amountValidation.error));
    return;
  }

  const phoneValidation = validatePhoneNumber(donationData.phone);
  if (!phoneValidation.valid) {
    onFailure(new Error(phoneValidation.error));
    return;
  }

  const nameValidation = validateName(donationData.name);
  if (!nameValidation.valid) {
    onFailure(new Error(nameValidation.error));
    return;
  }

  // 3. Create Razorpay options
  const options = {
    ...razorpayConfig,
    amount: donationData.amount * 100, // Convert to paise
    prefill: {
      name: donationData.name,
      contact: donationData.phone,
      email: donationData.email || ''
    },
    handler: function (response: RazorpayResponse) {
      // 4. Success callback
      console.log('✅ Payment successful:', response.razorpay_payment_id);
      onSuccess(response);
    },
    modal: {
      ondismiss: function () {
        // 5. User closed modal without completing payment
        console.log('⚠️ Payment cancelled by user');
        onFailure(new Error('Payment cancelled'));
      }
    }
  };

  // 6. Open Razorpay checkout
  try {
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error('❌ Error opening Razorpay:', error);
    onFailure(error);
  }
}
```

## PaymentForm Component

### Complete Payment Form Implementation
**File:** `src/lib/components/PaymentForm.svelte`

```svelte
<script lang="ts">
  import { goto } from '$app/navigation';
  import { selectedAmount } from '$lib/stores/donation';
  import {
    openRazorpayCheckout,
    validateDonationAmount,
    validatePhoneNumber,
    validateName,
    type DonationData,
    type RazorpayResponse
  } from '$lib/razorpay';

  // Form data
  let formData: DonationData = {
    amount: 0,
    name: '',
    phone: '',
    email: ''
  };

  // UI state
  let isSubmitting = false;
  let errors = {
    amount: '',
    name: '',
    phone: ''
  };

  // Reactive: sync with store
  $: formData.amount = $selectedAmount;

  // Validation functions
  function validateAmount() {
    const result = validateDonationAmount(formData.amount);
    errors.amount = result.error;
    return result.valid;
  }

  function validateNameField() {
    const result = validateName(formData.name);
    errors.name = result.error;
    return result.valid;
  }

  function validatePhoneField() {
    const result = validatePhoneNumber(formData.phone);
    errors.phone = result.error;
    return result.valid;
  }

  function validateForm(): boolean {
    const amountValid = validateAmount();
    const nameValid = validateNameField();
    const phoneValid = validatePhoneField();
    return amountValid && nameValid && phoneValid;
  }

  // Submit handler
  function handleDonate() {
    // Validate form
    if (!validateForm()) {
      return;
    }

    // Start processing
    isSubmitting = true;

    // Open Razorpay checkout
    openRazorpayCheckout(
      formData,
      // Success callback
      (response: RazorpayResponse) => {
        console.log('✅ Payment successful:', response);
        // Redirect to success page with payment ID
        goto(`/payment/success?payment_id=${response.razorpay_payment_id}`);
      },
      // Failure callback
      (error: any) => {
        console.error('❌ Payment failed:', error);
        isSubmitting = false;
        // Optionally redirect to failure page
        // goto('/payment/failure');
      }
    );
  }

  // Predefined amounts
  const presetAmounts = [500, 1000, 2000, 5000, 10000];

  function selectAmount(amount: number) {
    selectedAmount.set(amount);
    errors.amount = '';
  }
</script>

<div id="payment-form" class="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
  <h2 class="text-3xl font-bold text-navy-custom mb-6">Make a Donation</h2>

  <!-- Preset amounts -->
  <div class="mb-6">
    <label class="block text-gray-700 font-semibold mb-3">
      Select Amount
    </label>
    <div class="grid grid-cols-3 md:grid-cols-5 gap-3">
      {#each presetAmounts as amount}
        <button
          type="button"
          on:click={() => selectAmount(amount)}
          class="py-3 px-4 border-2 rounded-lg font-semibold transition-all"
          class:border-orange-custom={$selectedAmount === amount}
          class:bg-orange-custom={$selectedAmount === amount}
          class:text-white={$selectedAmount === amount}
          class:border-gray-300={$selectedAmount !== amount}
          class:hover:border-orange-custom={$selectedAmount !== amount}
        >
          ₹{amount.toLocaleString('en-IN')}
        </button>
      {/each}
    </div>
  </div>

  <!-- Custom amount -->
  <div class="mb-6">
    <label for="amount" class="block text-gray-700 font-semibold mb-2">
      Or Enter Custom Amount *
    </label>
    <div class="flex">
      <span class="inline-flex items-center px-4 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-600 font-semibold">
        ₹
      </span>
      <input
        id="amount"
        type="number"
        bind:value={formData.amount}
        on:blur={validateAmount}
        min="10"
        max="500000"
        class="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-orange-custom"
        class:border-red-500={errors.amount}
        placeholder="Enter amount"
      />
    </div>
    {#if errors.amount}
      <p class="text-red-500 text-sm mt-1">{errors.amount}</p>
    {:else}
      <p class="text-sm text-gray-500 mt-1">Minimum ₹10, Maximum ₹5,00,000</p>
    {/if}
  </div>

  <!-- Donor details -->
  <div class="mb-4">
    <label for="name" class="block text-gray-700 font-semibold mb-2">
      Full Name *
    </label>
    <input
      id="name"
      type="text"
      bind:value={formData.name}
      on:blur={validateNameField}
      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-custom"
      class:border-red-500={errors.name}
      placeholder="Enter your name"
    />
    {#if errors.name}
      <p class="text-red-500 text-sm mt-1">{errors.name}</p>
    {/if}
  </div>

  <div class="mb-4">
    <label for="phone" class="block text-gray-700 font-semibold mb-2">
      Mobile Number *
    </label>
    <div class="flex">
      <span class="inline-flex items-center px-4 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-600">
        +91
      </span>
      <input
        id="phone"
        type="tel"
        bind:value={formData.phone}
        on:blur={validatePhoneField}
        maxlength="10"
        class="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-orange-custom"
        class:border-red-500={errors.phone}
        placeholder="9876543210"
      />
    </div>
    {#if errors.phone}
      <p class="text-red-500 text-sm mt-1">{errors.phone}</p>
    {/if}
  </div>

  <div class="mb-6">
    <label for="email" class="block text-gray-700 font-semibold mb-2">
      Email (Optional)
    </label>
    <input
      id="email"
      type="email"
      bind:value={formData.email}
      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-custom"
      placeholder="your@email.com"
    />
  </div>

  <!-- Submit button -->
  <button
    type="button"
    on:click={handleDonate}
    disabled={isSubmitting}
    class="w-full bg-orange-custom hover:bg-orange-dark text-white font-bold text-lg py-4 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
    class:opacity-50={isSubmitting}
    class:cursor-not-allowed={isSubmitting}
  >
    {#if isSubmitting}
      Processing...
    {:else}
      Donate ₹{formData.amount.toLocaleString('en-IN')}
    {/if}
  </button>

  <p class="text-sm text-gray-500 text-center mt-4">
    Your donation is secure and will be processed by Razorpay
  </p>
</div>
```

## Success Page

### Payment Success Handler
**File:** `src/routes/payment/success/+page.svelte`

```svelte
<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { Icon } from '@iconify/svelte';

  // Get payment ID from URL
  $: paymentId = $page.url.searchParams.get('payment_id');

  // Optional: Save payment details to database here
</script>

<svelte:head>
  <title>Payment Successful - Sikh Aid</title>
</svelte:head>

<div class="container mx-auto px-4 py-16">
  <div class="max-w-2xl mx-auto text-center">
    <div class="mb-6 flex justify-center">
      <div class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
        <Icon icon="mdi:check-circle" class="text-6xl text-green-500" />
      </div>
    </div>

    <h1 class="text-4xl font-bold text-navy-custom mb-4">
      Thank You for Your Donation!
    </h1>

    <p class="text-lg text-gray-700 mb-6">
      Your generous contribution will help us make a difference in people's lives.
    </p>

    {#if paymentId}
      <div class="bg-gray-100 rounded-lg p-4 mb-6">
        <p class="text-sm text-gray-600 mb-1">Payment ID</p>
        <p class="text-lg font-mono font-semibold text-navy-custom">
          {paymentId}
        </p>
      </div>
    {/if}

    <p class="text-gray-600 mb-8">
      You will receive a confirmation email shortly with your donation receipt.
    </p>

    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <button
        on:click={() => goto('/')}
        class="bg-orange-custom hover:bg-orange-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors"
      >
        Back to Home
      </button>
      <button
        on:click={() => goto('/campaigns')}
        class="border-2 border-orange-custom text-orange-custom hover:bg-orange-custom hover:text-white font-semibold py-3 px-6 rounded-lg transition-all"
      >
        View Our Campaigns
      </button>
    </div>
  </div>
</div>
```

## Failure Page

### Payment Failure Handler
**File:** `src/routes/payment/failure/+page.svelte`

```svelte
<script lang="ts">
  import { goto } from '$app/navigation';
  import { Icon } from '@iconify/svelte';
</script>

<svelte:head>
  <title>Payment Failed - Sikh Aid</title>
</svelte:head>

<div class="container mx-auto px-4 py-16">
  <div class="max-w-2xl mx-auto text-center">
    <div class="mb-6 flex justify-center">
      <div class="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
        <Icon icon="mdi:close-circle" class="text-6xl text-red-500" />
      </div>
    </div>

    <h1 class="text-4xl font-bold text-navy-custom mb-4">
      Payment Failed
    </h1>

    <p class="text-lg text-gray-700 mb-6">
      Unfortunately, your payment could not be processed.
    </p>

    <div class="bg-gray-100 rounded-lg p-6 mb-8 text-left">
      <p class="font-semibold text-gray-800 mb-2">Possible reasons:</p>
      <ul class="list-disc list-inside text-gray-600 space-y-1">
        <li>Insufficient funds in your account</li>
        <li>Payment gateway timeout</li>
        <li>Incorrect payment details</li>
        <li>Transaction cancelled by user</li>
      </ul>
    </div>

    <p class="text-gray-600 mb-8">
      Please try again or contact us if the problem persists.
    </p>

    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <button
        on:click={() => goto('/donate')}
        class="bg-orange-custom hover:bg-orange-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors"
      >
        Try Again
      </button>
      <button
        on:click={() => goto('/contact')}
        class="border-2 border-gray-400 text-gray-700 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-all"
      >
        Contact Support
      </button>
    </div>
  </div>
</div>
```

## Donation Store Integration

### Donation Amount Store
**File:** `src/lib/stores/donation.ts`

```typescript
import { writable } from 'svelte/store';

export const selectedAmount = writable<number>(0);

export function setDonationAmount(amount: number) {
  selectedAmount.set(amount);

  // Auto-scroll to payment form
  setTimeout(() => {
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
      paymentForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 100);
}
```

### Usage in Campaign Pages
```svelte
<script lang="ts">
  import { setDonationAmount } from '$lib/stores/donation';
  import { goto } from '$app/navigation';

  function handleDonate(amount: number) {
    setDonationAmount(amount);
    goto('/donate');
  }
</script>

<button on:click={() => handleDonate(1000)}>
  Donate ₹1,000
</button>
```

## Testing Payment Integration

### Test Mode Configuration
```typescript
// Use test key for development
const TEST_KEY = 'rzp_test_xxxxxxxxxxxx';

// Use live key for production
const LIVE_KEY = 'rzp_live_xxxxxxxxxxxx';

export const razorpayConfig = {
  key: import.meta.env.VITE_ENVIRONMENT === 'production' ? LIVE_KEY : TEST_KEY,
  // ...rest of config
};
```

### Razorpay Test Card Details
```
Card Number: 4111 1111 1111 1111
CVV: Any 3 digits
Expiry: Any future date
```

## Error Handling Patterns

### Handling Razorpay Errors
```typescript
function handlePayment() {
  openRazorpayCheckout(
    donationData,
    (response) => {
      // Success - redirect to success page
      goto(`/payment/success?payment_id=${response.razorpay_payment_id}`);
    },
    (error) => {
      // Failure - show error message
      if (error.message === 'Payment cancelled') {
        // User closed the modal
        errorMessage = 'Payment was cancelled';
      } else {
        // Other errors
        errorMessage = 'Payment failed. Please try again.';
        console.error('Payment error:', error);
      }

      // Optionally redirect to failure page
      // goto('/payment/failure');
    }
  );
}
```

## Security Best Practices

### Important Security Notes

1. **Key Management**
   - Never commit Razorpay keys to version control
   - Use environment variables for sensitive data
   - Use test keys in development, live keys in production

2. **Amount Validation**
   - Always validate amounts on both client and server
   - Set reasonable min/max limits
   - Convert to paise (multiply by 100) before sending to Razorpay

3. **Payment Verification**
   - Verify payment signature on server-side
   - Don't trust client-side payment confirmations alone
   - Use webhooks for reliable payment status updates

4. **Data Handling**
   - Never store card details
   - Log payment IDs for reference
   - Keep PII (personally identifiable information) secure

## When to Use This Skill
- Implementing donation functionality
- Configuring Razorpay integration
- Creating payment forms
- Handling payment success/failure
- Validating payment data
- Troubleshooting payment issues
- Setting up test/production environments

## Related Skills
- `sikhaid-forms` - Form patterns and validation
- `sikhaid-data` - Stores and data management
- `sikhaid-routing` - Payment success/failure routes
- `sikhaid-components` - PaymentForm component
