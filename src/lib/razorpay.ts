
// Razorpay types for TypeScript
declare global {
	interface Window {
		Razorpay: any;
	}
}

export interface DonationData {
	amount: number; // in INR
	name: string;
	phone: string;
	email?: string;
}

export interface RazorpayResponse {
	razorpay_payment_id: string;
	razorpay_order_id?: string;
	razorpay_signature?: string;
}

// Environment variables
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;
const ORGANIZATION_NAME = import.meta.env.VITE_ORGANIZATION_NAME || 'Sikh Aid Charitable Trust';
const SITE_URL = import.meta.env.VITE_SITE_URL || 'www.sikhaidindia.com';
const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT || 'development';

const isProduction = ENVIRONMENT === 'production';
const isTestMode = RAZORPAY_KEY_ID?.startsWith('rzp_test_') ?? true;

export const razorpayConfig = {
	key: RAZORPAY_KEY_ID || 'rzp_test_placeholder_key_id',
	currency: 'INR',
	name: ORGANIZATION_NAME,
	description: 'Punjab Floods Relief Aid 2025',
	image: '/sikhaidLogo.png',
	theme: {
		color: '#1a237e'
	}
};

// Validate Razorpay setup
export function validateRazorpaySetup(): { isValid: boolean; message: string } {
	if (!RAZORPAY_KEY_ID || RAZORPAY_KEY_ID === 'rzp_test_placeholder_key_id') {
		return {
			isValid: false,
			message: 'Razorpay Key ID not configured. Please update your .env file with actual Razorpay credentials.'
		};
	}

	if (isProduction && isTestMode) {
		return {
			isValid: false,
			message: 'WARNING: Using test keys in production environment. Please use live keys for production.'
		};
	}

	if (typeof window !== 'undefined' && !window.Razorpay) {
		return {
			isValid: false,
			message: 'Razorpay SDK not loaded. Please check your internet connection.'
		};
	}

	return {
		isValid: true,
		message: isTestMode ? 'Test mode active - transactions will not be charged' : 'Live mode active'
	};
}

export function openRazorpayCheckout(
	donationData: DonationData,
	onSuccess: (response: RazorpayResponse) => void,
	onError: (error: any) => void
) {
	const validation = validateRazorpaySetup();
	if (!validation.isValid) {
		onError(new Error(validation.message));
		return;
	}

	const options = {
		...razorpayConfig,
		amount: donationData.amount * 100,
		prefill: {
			name: donationData.name,
			contact: donationData.phone,
			email: donationData.email || ''
		},
		notes: {
			campaign: 'Punjab Floods Relief Aid 2025',
			website: SITE_URL
		},
		handler: (response: RazorpayResponse) => {
			onSuccess(response);
		},
		modal: {
			ondismiss: () => {
				onError(new Error('Payment cancelled by user'));
			}
		}
	};

	try {
		const rzp = new window.Razorpay(options);
		rzp.open();
	} catch (error) {
		onError(error);
	}
}

export function validateDonationAmount(amount: number): string | null {
	if (!amount || amount < 10) {
		return 'Minimum donation amount is ₹10';
	}
	if (amount > 500000) {
		return 'Maximum donation amount is ₹5,00,000';
	}
	return null;
}

export function validatePhoneNumber(phone: string): string | null {
	const phoneRegex = /^[6-9]\d{9}$/;
	if (!phone || !phoneRegex.test(phone)) {
		return 'Please enter a valid 10-digit mobile number';
	}
	return null;
}

export function validateName(name: string): string | null {
	if (!name || name.trim().length < 2) {
		return 'Please enter a valid name';
	}
	return null;
}

