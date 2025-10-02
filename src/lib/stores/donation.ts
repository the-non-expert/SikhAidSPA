import { writable } from 'svelte/store';

export const selectedAmount = writable<number>(0);

export function setDonationAmount(amount: number) {
	selectedAmount.set(amount);

	// Scroll to payment form section smoothly
	if (typeof window !== 'undefined') {
		const paymentSection = document.getElementById('payment-form');

		if (paymentSection) {
			paymentSection.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		} else {
			// Fallback: scroll to a position that shows the form properly
			window.scrollTo({
				top: 200,
				behavior: 'smooth'
			});
		}
	}
}