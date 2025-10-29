import { writable } from 'svelte/store';

export interface CSRSubmission {
	companyName: string;
	contactPerson: string;
	email: string;
	phone: string;
	companySize: string;
	industry: string;
	partnershipInterest: string[];
	budgetRange: string;
	message: string;
	timestamp: string;
}

// Store to hold all CSR partnership submissions
export const csrSubmissions = writable<CSRSubmission[]>([]);

// Function to add a new CSR submission
export function addCSRSubmission(submission: Omit<CSRSubmission, 'timestamp'>) {
	const newSubmission: CSRSubmission = {
		...submission,
		timestamp: new Date().toISOString()
	};

	csrSubmissions.update(submissions => [...submissions, newSubmission]);

	return newSubmission;
}
