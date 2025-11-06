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
	createdAt?: string | null; // ISO timestamp
	updatedAt?: string | null; // ISO timestamp
	publishedAt?: string | null; // ISO timestamp - when first published (null for drafts)
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
