import { db } from './firebase';
import {
	collection,
	addDoc,
	getDocs,
	query,
	orderBy,
	updateDoc,
	doc,
	getDoc,
	deleteDoc,
	where,
	type Timestamp,
	serverTimestamp
} from 'firebase/firestore';
import type { ContactSubmission } from './stores/contact';
import type { VolunteerSubmission } from './stores/volunteering';
import type { CSRSubmission } from './stores/csr';
import type { Blog } from './types/blog';
import type { Campaign } from './types/campaign';

// Types for Firestore documents (includes id and status)
export interface FirestoreContactSubmission extends ContactSubmission {
	id?: string;
	status: 'new' | 'read' | 'resolved';
	firestoreTimestamp?: Timestamp;
}

export interface FirestoreVolunteerSubmission extends VolunteerSubmission {
	id?: string;
	status: 'new' | 'read' | 'resolved';
	firestoreTimestamp?: Timestamp;
}

export interface FirestoreCSRSubmission extends CSRSubmission {
	id?: string;
	status: 'new' | 'read' | 'resolved';
	firestoreTimestamp?: Timestamp;
}

// Collection names
const COLLECTIONS = {
	CONTACT: 'contact_submissions',
	VOLUNTEER: 'volunteer_submissions',
	CSR: 'csr_submissions',
	BLOGS: 'blogs',
	CAMPAIGNS: 'campaigns'
};

/**
 * Contact Form Functions
 */
export async function addContactToFirestore(
	submission: Omit<ContactSubmission, 'timestamp'>
): Promise<string> {
	if (!db) {
		throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
	}

	try {
		const contactData: Omit<FirestoreContactSubmission, 'id'> = {
			...submission,
			timestamp: new Date().toISOString(),
			status: 'new',
			firestoreTimestamp: serverTimestamp() as any
		};

		const docRef = await addDoc(collection(db, COLLECTIONS.CONTACT), contactData);
		return docRef.id;
	} catch (error) {
		console.error('❌ Error adding contact to Firestore:', error);
		throw error;
	}
}

export async function getContactSubmissions(): Promise<FirestoreContactSubmission[]> {
	if (!db) {
		throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
	}

	try {
		const q = query(
			collection(db, COLLECTIONS.CONTACT),
			orderBy('firestoreTimestamp', 'desc')
		);
		const querySnapshot = await getDocs(q);

		const submissions: FirestoreContactSubmission[] = [];
		querySnapshot.forEach((doc) => {
			submissions.push({
				id: doc.id,
				...doc.data()
			} as FirestoreContactSubmission);
		});

		return submissions;
	} catch (error) {
		console.error('❌ Error fetching contact submissions:', error);
		throw error;
	}
}

/**
 * Volunteer Form Functions
 */
export async function addVolunteerToFirestore(
	submission: Omit<VolunteerSubmission, 'timestamp'>
): Promise<string> {
	if (!db) {
		throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
	}

	try {
		const volunteerData: Omit<FirestoreVolunteerSubmission, 'id'> = {
			...submission,
			timestamp: new Date().toISOString(),
			status: 'new',
			firestoreTimestamp: serverTimestamp() as any
		};

		const docRef = await addDoc(collection(db, COLLECTIONS.VOLUNTEER), volunteerData);
		return docRef.id;
	} catch (error) {
		console.error('❌ Error adding volunteer to Firestore:', error);
		throw error;
	}
}

export async function getVolunteerSubmissions(): Promise<FirestoreVolunteerSubmission[]> {
	if (!db) {
		throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
	}

	try {
		const q = query(
			collection(db, COLLECTIONS.VOLUNTEER),
			orderBy('firestoreTimestamp', 'desc')
		);
		const querySnapshot = await getDocs(q);

		const submissions: FirestoreVolunteerSubmission[] = [];
		querySnapshot.forEach((doc) => {
			submissions.push({
				id: doc.id,
				...doc.data()
			} as FirestoreVolunteerSubmission);
		});

		return submissions;
	} catch (error) {
		console.error('❌ Error fetching volunteer submissions:', error);
		throw error;
	}
}

/**
 * CSR Form Functions
 */
export async function addCSRToFirestore(
	submission: Omit<CSRSubmission, 'timestamp'>
): Promise<string> {
	if (!db) {
		throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
	}

	try {
		const csrData: Omit<FirestoreCSRSubmission, 'id'> = {
			...submission,
			timestamp: new Date().toISOString(),
			status: 'new',
			firestoreTimestamp: serverTimestamp() as any
		};

		const docRef = await addDoc(collection(db, COLLECTIONS.CSR), csrData);
		return docRef.id;
	} catch (error) {
		console.error('❌ Error adding CSR to Firestore:', error);
		throw error;
	}
}

export async function getCSRSubmissions(): Promise<FirestoreCSRSubmission[]> {
	if (!db) {
		throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
	}

	try {
		const q = query(
			collection(db, COLLECTIONS.CSR),
			orderBy('firestoreTimestamp', 'desc')
		);
		const querySnapshot = await getDocs(q);

		const submissions: FirestoreCSRSubmission[] = [];
		querySnapshot.forEach((doc) => {
			submissions.push({
				id: doc.id,
				...doc.data()
			} as FirestoreCSRSubmission);
		});

		return submissions;
	} catch (error) {
		console.error('❌ Error fetching CSR submissions:', error);
		throw error;
	}
}

/**
 * Update submission status (for admin panel)
 */
export async function updateSubmissionStatus(
	collectionName: string,
	documentId: string,
	status: 'new' | 'read' | 'resolved'
): Promise<void> {
	if (!db) {
		throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
	}

	try {
		const docRef = doc(db, collectionName, documentId);
		await updateDoc(docRef, { status });
	} catch (error) {
		console.error('❌ Error updating status:', error);
		throw error;
	}
}

/**
 * Blog Functions
 */

/**
 * Add a new blog post to Firestore
 */
export async function addBlog(blog: Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
	if (!db) {
		throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
	}

	try {
		const now = new Date().toISOString();
		const blogData: Omit<Blog, 'id'> = {
			...blog,
			createdAt: now,
			updatedAt: now,
			publishedAt: blog.publishStatus === 'published' ? now : undefined
		};

		const docRef = await addDoc(collection(db, COLLECTIONS.BLOGS), blogData);
		return docRef.id;
	} catch (error) {
		console.error('❌ Error adding blog to Firestore:', error);
		throw error;
	}
}

/**
 * Get all blog posts (for admin panel)
 */
export async function getAllBlogs(): Promise<Blog[]> {
	if (!db) {
		throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
	}

	try {
		const q = query(collection(db, COLLECTIONS.BLOGS), orderBy('createdAt', 'desc'));
		const querySnapshot = await getDocs(q);

		const blogs: Blog[] = [];
		querySnapshot.forEach((doc) => {
			blogs.push({
				id: doc.id,
				...doc.data()
			} as Blog);
		});

		return blogs;
	} catch (error) {
		console.error('❌ Error fetching blogs:', error);
		throw error;
	}
}

/**
 * Get only published blog posts (for public pages)
 */
export async function getPublishedBlogs(): Promise<Blog[]> {
	if (!db) {
		throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
	}

	try {
		// Fetch all blogs and filter in memory to avoid needing a composite index
		const q = query(
			collection(db, COLLECTIONS.BLOGS),
			where('publishStatus', '==', 'published')
		);
		const querySnapshot = await getDocs(q);

		const blogs: Blog[] = [];
		querySnapshot.forEach((doc) => {
			blogs.push({
				id: doc.id,
				...doc.data()
			} as Blog);
		});

		// Sort by publishedAt in memory
		return blogs.sort((a, b) => {
			const dateA = new Date(a.publishedAt || a.createdAt || '');
			const dateB = new Date(b.publishedAt || b.createdAt || '');
			return dateB.getTime() - dateA.getTime();
		});
	} catch (error) {
		console.error('❌ Error fetching published blogs:', error);
		throw error;
	}
}

/**
 * Get a single blog post by ID
 */
export async function getBlogById(id: string): Promise<Blog | null> {
	if (!db) {
		throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
	}

	try {
		const docRef = doc(db, COLLECTIONS.BLOGS, id);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			return {
				id: docSnap.id,
				...docSnap.data()
			} as Blog;
		} else {
			return null;
		}
	} catch (error) {
		console.error('❌ Error fetching blog:', error);
		throw error;
	}
}

/**
 * Get a single published blog post by slug (for public pages)
 */
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
	if (!db) {
		throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
	}

	try {
		// Query by slug only, then check publishStatus in memory to avoid composite index
		const q = query(
			collection(db, COLLECTIONS.BLOGS),
			where('slug', '==', slug)
		);
		const querySnapshot = await getDocs(q);

		if (querySnapshot.empty) {
			return null;
		}

		// Find the first published blog with this slug
		for (const doc of querySnapshot.docs) {
			const blog = {
				id: doc.id,
				...doc.data()
			} as Blog;

			if (blog.publishStatus === 'published') {
				return blog;
			}
		}

		return null;
	} catch (error) {
		console.error('❌ Error fetching blog by slug:', error);
		throw error;
	}
}

/**
 * Update a blog post
 */
export async function updateBlog(id: string, updates: Partial<Blog>): Promise<void> {
	if (!db) {
		throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
	}

	try {
		const docRef = doc(db, COLLECTIONS.BLOGS, id);

		// Get current blog to check publish status change
		const currentDoc = await getDoc(docRef);
		if (!currentDoc.exists()) {
			throw new Error('Blog not found');
		}

		const currentData = currentDoc.data() as Blog;
		const updateData: any = {
			...updates,
			updatedAt: new Date().toISOString()
		};

		// If changing from draft to published, set publishedAt
		if (currentData.publishStatus === 'draft' && updates.publishStatus === 'published') {
			updateData.publishedAt = new Date().toISOString();
		}

		await updateDoc(docRef, updateData);
	} catch (error) {
		console.error('❌ Error updating blog:', error);
		throw error;
	}
}

/**
 * Delete a blog post
 */
export async function deleteBlog(id: string): Promise<void> {
	if (!db) {
		throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
	}

	try {
		const docRef = doc(db, COLLECTIONS.BLOGS, id);
		await deleteDoc(docRef);
	} catch (error) {
		console.error('❌ Error deleting blog:', error);
		throw error;
	}
}

/**
 * Campaign Functions
 */

/**
 * Add a new campaign to Firestore
 */
export async function addCampaign(
	campaign: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> {
	if (!db) {
		throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
	}

	try {
		const now = new Date().toISOString();
		const campaignData: Omit<Campaign, 'id'> = {
			...campaign,
			createdAt: now,
			updatedAt: now,
			publishedAt: campaign.publishStatus === 'published' ? now : undefined
		};

		const docRef = await addDoc(collection(db, COLLECTIONS.CAMPAIGNS), campaignData);
		return docRef.id;
	} catch (error) {
		console.error('❌ Error adding campaign to Firestore:', error);
		throw error;
	}
}

/**
 * Get all campaigns (for admin panel)
 */
export async function getAllCampaigns(): Promise<Campaign[]> {
	if (!db) {
		throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
	}

	try {
		// Fetch all campaigns without orderBy to avoid needing Firestore index
		const q = query(collection(db, COLLECTIONS.CAMPAIGNS));
		const querySnapshot = await getDocs(q);

		const campaigns: Campaign[] = [];
		querySnapshot.forEach((doc) => {
			campaigns.push({
				id: doc.id,
				...doc.data()
			} as Campaign);
		});

		// Sort by createdAt in JavaScript memory
		return campaigns.sort((a, b) => {
			const dateA = new Date(a.createdAt || '').getTime();
			const dateB = new Date(b.createdAt || '').getTime();
			return dateB - dateA; // desc order (newest first)
		});
	} catch (error) {
		console.error('❌ Error fetching campaigns:', error);
		throw error;
	}
}

/**
 * Get only published campaigns (for public pages)
 */
export async function getPublishedCampaigns(): Promise<Campaign[]> {
	if (!db) {
		throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
	}

	try {
		// Fetch all campaigns and filter in memory to avoid needing a composite index
		const q = query(
			collection(db, COLLECTIONS.CAMPAIGNS),
			where('publishStatus', '==', 'published')
		);
		const querySnapshot = await getDocs(q);

		const campaigns: Campaign[] = [];
		querySnapshot.forEach((doc) => {
			campaigns.push({
				id: doc.id,
				...doc.data()
			} as Campaign);
		});

		// Sort by publishedAt in memory
		return campaigns.sort((a, b) => {
			const dateA = new Date(a.publishedAt || a.createdAt || '');
			const dateB = new Date(b.publishedAt || b.createdAt || '');
			return dateB.getTime() - dateA.getTime();
		});
	} catch (error) {
		console.error('❌ Error fetching published campaigns:', error);
		throw error;
	}
}

/**
 * Get a single campaign by ID
 */
export async function getCampaignById(id: string): Promise<Campaign | null> {
	if (!db) {
		throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
	}

	try {
		const docRef = doc(db, COLLECTIONS.CAMPAIGNS, id);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			return {
				id: docSnap.id,
				...docSnap.data()
			} as Campaign;
		} else {
			return null;
		}
	} catch (error) {
		console.error('❌ Error fetching campaign:', error);
		throw error;
	}
}

/**
 * Get a single published campaign by slug (for public pages)
 */
export async function getCampaignBySlug(slug: string): Promise<Campaign | null> {
	if (!db) {
		throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
	}

	try {
		// Query by slug only, then check publishStatus in memory to avoid composite index
		const q = query(
			collection(db, COLLECTIONS.CAMPAIGNS),
			where('slug', '==', slug)
		);
		const querySnapshot = await getDocs(q);

		if (querySnapshot.empty) {
			return null;
		}

		// Find the first published campaign with this slug
		for (const doc of querySnapshot.docs) {
			const campaign = {
				id: doc.id,
				...doc.data()
			} as Campaign;

			if (campaign.publishStatus === 'published') {
				return campaign;
			}
		}

		return null;
	} catch (error) {
		console.error('❌ Error fetching campaign by slug:', error);
		throw error;
	}
}

/**
 * Update a campaign
 */
export async function updateCampaign(id: string, updates: Partial<Campaign>): Promise<void> {
	if (!db) {
		throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
	}

	try {
		const docRef = doc(db, COLLECTIONS.CAMPAIGNS, id);

		// Get current campaign to check publish status change
		const currentDoc = await getDoc(docRef);
		if (!currentDoc.exists()) {
			throw new Error('Campaign not found');
		}

		const currentData = currentDoc.data() as Campaign;
		const updateData: any = {
			...updates,
			updatedAt: new Date().toISOString()
		};

		// If changing from draft to published, set publishedAt
		if (currentData.publishStatus === 'draft' && updates.publishStatus === 'published') {
			updateData.publishedAt = new Date().toISOString();
		}

		await updateDoc(docRef, updateData);
	} catch (error) {
		console.error('❌ Error updating campaign:', error);
		throw error;
	}
}

/**
 * Delete a campaign
 */
export async function deleteCampaign(id: string): Promise<void> {
	if (!db) {
		throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
	}

	try {
		const docRef = doc(db, COLLECTIONS.CAMPAIGNS, id);
		await deleteDoc(docRef);
	} catch (error) {
		console.error('❌ Error deleting campaign:', error);
		throw error;
	}
}
