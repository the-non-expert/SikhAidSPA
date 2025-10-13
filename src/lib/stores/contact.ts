import { writable } from 'svelte/store';

export interface ContactSubmission {
	name: string;
	email: string;
	phone: string;
	subject: string;
	message: string;
	timestamp: string;
}

// Store to hold all contact form submissions
export const contactSubmissions = writable<ContactSubmission[]>([]);

// Function to add a new contact submission
export function addContactSubmission(submission: Omit<ContactSubmission, 'timestamp'>) {
	const newSubmission: ContactSubmission = {
		...submission,
		timestamp: new Date().toISOString()
	};

	contactSubmissions.update(submissions => [...submissions, newSubmission]);

	// Console log for debugging
	console.log('=== NEW CONTACT FORM SUBMISSION ===');
	console.log(newSubmission);
	console.log('===================================');

	return newSubmission;
}
