export interface Campaign {
	id?: string; // Firestore document ID
	slug: string;
	title: string;
	subtitle: string;
	shortDescription: string;
	fullDescription: string;
	image: string;
	category: string;
	status: 'ongoing' | 'completed' | 'seasonal';
	publishStatus: 'draft' | 'published'; // Admin publish status
	impactStats: ImpactStat[];
	howItWorks: HowItWorksStep[];
	gallery: GalleryImage[];
	createdAt?: string; // ISO timestamp
	updatedAt?: string; // ISO timestamp
	publishedAt?: string; // ISO timestamp - when first published
}

export interface ImpactStat {
	label: string;
	value: string;
	icon: string;
}

export interface HowItWorksStep {
	step: number;
	title: string;
	description: string;
}

export interface GalleryImage {
	src: string;
	alt: string;
}
