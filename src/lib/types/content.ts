import type { Timestamp } from 'firebase/firestore';

export interface CelebrityCard {
	id?: string;
	name: string;
	profession: string;
	imageUrl: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
	firestoreTimestamp?: Timestamp;
}

export interface FirestoreCelebrityCard extends CelebrityCard {
	id: string;
}

export interface Testimonial {
	id?: string;
	name: string;
	designation: string;
	imageUrl: string;
	text: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
	firestoreTimestamp?: Timestamp;
}

export interface FirestoreTestimonial extends Testimonial {
	id: string;
}
