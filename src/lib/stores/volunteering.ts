import { writable } from 'svelte/store';

export interface VolunteerSubmission {
	fullName: string;
	email: string;
	mobile: string;
	gender: string;
	address: string;
	opportunity: string;
	durationMonths: string;
	durationYears: string;
	startDate: string;
	about: string;
	timestamp: string;
}

// Store to hold all volunteer submissions
export const volunteerSubmissions = writable<VolunteerSubmission[]>([]);

// Function to add a new volunteer submission
export function addVolunteerSubmission(submission: Omit<VolunteerSubmission, 'timestamp'>) {
	const newSubmission: VolunteerSubmission = {
		...submission,
		timestamp: new Date().toISOString()
	};

	volunteerSubmissions.update(submissions => [...submissions, newSubmission]);

	return newSubmission;
}
