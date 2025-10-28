export interface Blog {
	id?: string; // Firestore document ID
	slug: string;
	title: string;
	excerpt: string;
	content: string; // HTML content from rich text editor
	image: string; // Featured image URL
	category: string;
	author: string;
	publishStatus: 'draft' | 'published'; // Admin publish status
	readTime?: string; // e.g., "5 min read"
	createdAt?: string; // ISO timestamp
	updatedAt?: string; // ISO timestamp
	publishedAt?: string; // ISO timestamp - when first published
}
