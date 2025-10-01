export interface Campaign {
	slug: string;
	title: string;
	subtitle: string;
	shortDescription: string;
	fullDescription: string;
	image: string;
	category: string;
	status: 'ongoing' | 'completed' | 'seasonal';
	impactStats: ImpactStat[];
	howItWorks: HowItWorksStep[];
	gallery: GalleryImage[];
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
