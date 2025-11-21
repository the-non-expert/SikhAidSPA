import { db, ensureFirebaseInitialized } from './firebaseInit';
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
import type { CelebrityCard, Testimonial, FirestoreCelebrityCard, FirestoreTestimonial } from './types/content';

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

// Donation interface
export interface Donation {
	id?: string;
	donorName: string;
	phone: string;
	panCard?: string;
	amount: number;
	razorpayPaymentId: string;
	razorpayOrderId?: string;
	timestamp: string;
	firestoreTimestamp?: Timestamp;
}

// Collection names
const COLLECTIONS = {
	CONTACT: 'contact_submissions',
	VOLUNTEER: 'volunteer_submissions',
	CSR: 'csr_submissions',
	BLOGS: 'blogs',
	CAMPAIGNS: 'campaigns',
	DONATIONS: 'donations',
	CELEBRITY_CARDS: 'celebrity_cards',
	TESTIMONIALS: 'testimonials'
};

/**
 * Remove undefined fields from an object
 * Firestore does not accept undefined values - only null or omitted fields
 */
function removeUndefinedFields<T extends Record<string, any>>(obj: T): Partial<T> {
	return Object.fromEntries(
		Object.entries(obj).filter(([_, value]) => value !== undefined)
	) as Partial<T>;
}

/**
 * Contact Form Functions
 */
export async function addContactToFirestore(
	submission: Omit<ContactSubmission, 'timestamp'>
): Promise<string> {
	await ensureFirebaseInitialized();

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
	await ensureFirebaseInitialized();

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
	await ensureFirebaseInitialized();

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
	await ensureFirebaseInitialized();

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
	await ensureFirebaseInitialized();

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
	await ensureFirebaseInitialized();

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
	await ensureFirebaseInitialized();

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
	await ensureFirebaseInitialized();

	if (!db) {
		throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
	}

	try {
		const now = new Date().toISOString();
		const blogData: any = {
			...blog,
			createdAt: now,
			updatedAt: now
		};

		// Only add publishedAt if the blog is published (avoid undefined values in Firestore)
		if (blog.publishStatus === 'published') {
			blogData.publishedAt = now;
		}

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
	await ensureFirebaseInitialized();

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
	await ensureFirebaseInitialized();

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
	await ensureFirebaseInitialized();

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
	await ensureFirebaseInitialized();

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
	await ensureFirebaseInitialized();

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
	await ensureFirebaseInitialized();

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
	await ensureFirebaseInitialized();

	if (!db) {
		throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
	}

	try {
		const now = new Date().toISOString();

		// Build campaign data, only including publishedAt if campaign is published
		const campaignData: any = {
			...campaign,
			createdAt: now,
			updatedAt: now
		};

		// Only set publishedAt for published campaigns (omit for drafts, not undefined)
		if (campaign.publishStatus === 'published') {
			campaignData.publishedAt = now;
		}

		// Remove any undefined fields as a safety measure (Firestore doesn't accept undefined)
		const cleanedData = removeUndefinedFields(campaignData);

		const docRef = await addDoc(collection(db, COLLECTIONS.CAMPAIGNS), cleanedData);
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
	await ensureFirebaseInitialized();

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
	await ensureFirebaseInitialized();

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
	await ensureFirebaseInitialized();

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
	await ensureFirebaseInitialized();

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
	await ensureFirebaseInitialized();

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

		// Remove any undefined fields (Firestore doesn't accept undefined values)
		const cleanedData = removeUndefinedFields(updateData);

		await updateDoc(docRef, cleanedData);
	} catch (error) {
		console.error('❌ Error updating campaign:', error);
		throw error;
	}
}

/**
 * Delete a campaign
 */
export async function deleteCampaign(id: string): Promise<void> {
	await ensureFirebaseInitialized();

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

/**
 * Donation Functions
 */

/**
 * Add a donation to Firestore
 */
export async function addDonationToFirestore(
	donation: Omit<Donation, 'id' | 'timestamp' | 'firestoreTimestamp'>
): Promise<string> {
	await ensureFirebaseInitialized();

	if (!db) {
		throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
	}

	try {
		const donationData: Omit<Donation, 'id'> = {
			...donation,
			timestamp: new Date().toISOString(),
			firestoreTimestamp: serverTimestamp() as any
		};

		// Remove undefined fields (Firestore doesn't accept undefined values)
		const cleanedData = removeUndefinedFields(donationData);

		const docRef = await addDoc(collection(db, COLLECTIONS.DONATIONS), cleanedData);
		console.log('✅ Donation saved to Firestore with ID:', docRef.id);
		return docRef.id;
	} catch (error) {
		console.error('❌ Error adding donation to Firestore:', error);
		throw error;
	}
}

/**
 * Get all donations (for admin panel)
 */
export async function getDonations(): Promise<Donation[]> {
	await ensureFirebaseInitialized();

	if (!db) {
		throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
	}

	try {
		const q = query(collection(db, COLLECTIONS.DONATIONS), orderBy('firestoreTimestamp', 'desc'));
		const querySnapshot = await getDocs(q);

		const donations: Donation[] = [];
		querySnapshot.forEach((doc) => {
			donations.push({
				id: doc.id,
				...doc.data()
			} as Donation);
		});

		return donations;
	} catch (error) {
		console.error('❌ Error fetching donations:', error);
		throw error;
	}
}

/**
 * Celebrity Card Functions
 */

/**
 * Add a new celebrity card to Firestore
 */
export async function addCelebrityCard(
	card: Omit<CelebrityCard, 'id' | 'createdAt' | 'updatedAt' | 'firestoreTimestamp'>
): Promise<string> {
	await ensureFirebaseInitialized();

	if (!db) {
		throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
	}

	try {
		const now = new Date().toISOString();
		const cardData = {
			...card,
			createdAt: now,
			updatedAt: now,
			firestoreTimestamp: serverTimestamp() as any
		};

		const docRef = await addDoc(collection(db, COLLECTIONS.CELEBRITY_CARDS), cardData);
		return docRef.id;
	} catch (error) {
		console.error('❌ Error adding celebrity card to Firestore:', error);
		throw error;
	}
}

/**
 * Get all celebrity cards
 */
export async function getCelebrityCards(): Promise<FirestoreCelebrityCard[]> {
	console.log('🟢 [getCelebrityCards] START');
	console.log('🟢 [getCelebrityCards] Ensuring Firebase initialized...');

	try {
		await ensureFirebaseInitialized();
		console.log('🟢 [getCelebrityCards] Firebase initialization complete');
	} catch (error) {
		console.error('❌ [getCelebrityCards] Firebase initialization failed:', error);
		throw error;
	}

	if (!db) {
		console.error('❌ [getCelebrityCards] db is null/undefined after initialization!');
		throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
	}

	console.log('🟢 [getCelebrityCards] db is available, creating query...');

	try {
		const q = query(
			collection(db, COLLECTIONS.CELEBRITY_CARDS),
			orderBy('firestoreTimestamp', 'desc')
		);
		console.log('🟢 [getCelebrityCards] Query created, calling getDocs()...');

		// Add timeout to Firestore operation
		const timeout = new Promise<never>((_, reject) =>
			setTimeout(() => {
				console.error('⏰ [getCelebrityCards] Firestore getDocs() TIMEOUT after 8 seconds!');
				reject(new Error('Firestore query timeout (celebrity_cards)'));
			}, 8000)
		);

		const querySnapshot = await Promise.race([getDocs(q), timeout]);
		console.log('🟢 [getCelebrityCards] getDocs() completed successfully');

		const cards: FirestoreCelebrityCard[] = [];
		querySnapshot.forEach((doc) => {
			cards.push({
				id: doc.id,
				...doc.data()
			} as FirestoreCelebrityCard);
		});

		console.log(`✅ [getCelebrityCards] SUCCESS - Found ${cards.length} cards`);
		return cards;
	} catch (error) {
		console.error('❌ [getCelebrityCards] Error:', error);
		console.error('❌ [getCelebrityCards] Error details:', {
			message: error instanceof Error ? error.message : 'Unknown',
			code: (error as any)?.code,
			name: error instanceof Error ? error.name : 'Unknown'
		});
		throw error;
	}
}

/**
 * Update a celebrity card
 */
export async function updateCelebrityCard(id: string, updates: Partial<CelebrityCard>): Promise<void> {
	await ensureFirebaseInitialized();

	if (!db) {
		throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
	}

	try {
		const docRef = doc(db, COLLECTIONS.CELEBRITY_CARDS, id);
		const updateData = {
			...updates,
			updatedAt: new Date().toISOString()
		};

		await updateDoc(docRef, updateData);
	} catch (error) {
		console.error('❌ Error updating celebrity card:', error);
		throw error;
	}
}

/**
 * Delete a celebrity card
 */
export async function deleteCelebrityCard(id: string): Promise<void> {
	await ensureFirebaseInitialized();

	if (!db) {
		throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
	}

	try {
		const docRef = doc(db, COLLECTIONS.CELEBRITY_CARDS, id);
		await deleteDoc(docRef);
	} catch (error) {
		console.error('❌ Error deleting celebrity card:', error);
		throw error;
	}
}

/**
 * Testimonial Functions
 */

/**
 * Add a new testimonial to Firestore
 */
export async function addTestimonial(
	testimonial: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt' | 'firestoreTimestamp'>
): Promise<string> {
	await ensureFirebaseInitialized();

	if (!db) {
		throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
	}

	try {
		const now = new Date().toISOString();
		const testimonialData = {
			...testimonial,
			createdAt: now,
			updatedAt: now,
			firestoreTimestamp: serverTimestamp() as any
		};

		const docRef = await addDoc(collection(db, COLLECTIONS.TESTIMONIALS), testimonialData);
		return docRef.id;
	} catch (error) {
		console.error('❌ Error adding testimonial to Firestore:', error);
		throw error;
	}
}

/**
 * Get all testimonials
 */
export async function getTestimonials(): Promise<FirestoreTestimonial[]> {
	console.log('🟡 [getTestimonials] START');
	console.log('🟡 [getTestimonials] Ensuring Firebase initialized...');

	try {
		await ensureFirebaseInitialized();
		console.log('🟡 [getTestimonials] Firebase initialization complete');
	} catch (error) {
		console.error('❌ [getTestimonials] Firebase initialization failed:', error);
		throw error;
	}

	if (!db) {
		console.error('❌ [getTestimonials] db is null/undefined after initialization!');
		throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
	}

	console.log('🟡 [getTestimonials] db is available, creating query...');

	try {
		const q = query(
			collection(db, COLLECTIONS.TESTIMONIALS),
			orderBy('firestoreTimestamp', 'desc')
		);
		console.log('🟡 [getTestimonials] Query created, calling getDocs()...');

		// Add timeout to Firestore operation
		const timeout = new Promise<never>((_, reject) =>
			setTimeout(() => {
				console.error('⏰ [getTestimonials] Firestore getDocs() TIMEOUT after 8 seconds!');
				reject(new Error('Firestore query timeout (testimonials)'));
			}, 8000)
		);

		const querySnapshot = await Promise.race([getDocs(q), timeout]);
		console.log('🟡 [getTestimonials] getDocs() completed successfully');

		const testimonials: FirestoreTestimonial[] = [];
		querySnapshot.forEach((doc) => {
			testimonials.push({
				id: doc.id,
				...doc.data()
			} as FirestoreTestimonial);
		});

		console.log(`✅ [getTestimonials] SUCCESS - Found ${testimonials.length} testimonials`);
		return testimonials;
	} catch (error) {
		console.error('❌ [getTestimonials] Error:', error);
		console.error('❌ [getTestimonials] Error details:', {
			message: error instanceof Error ? error.message : 'Unknown',
			code: (error as any)?.code,
			name: error instanceof Error ? error.name : 'Unknown'
		});
		throw error;
	}
}

/**
 * Update a testimonial
 */
export async function updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<void> {
	await ensureFirebaseInitialized();

	if (!db) {
		throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
	}

	try {
		const docRef = doc(db, COLLECTIONS.TESTIMONIALS, id);
		const updateData = {
			...updates,
			updatedAt: new Date().toISOString()
		};

		await updateDoc(docRef, updateData);
	} catch (error) {
		console.error('❌ Error updating testimonial:', error);
		throw error;
	}
}

/**
 * Delete a testimonial
 */
export async function deleteTestimonial(id: string): Promise<void> {
	await ensureFirebaseInitialized();

	if (!db) {
		throw new Error('Firestore is not initialized. Please check your Firebase configuration.');
	}

	try {
		const docRef = doc(db, COLLECTIONS.TESTIMONIALS, id);
		await deleteDoc(docRef);
	} catch (error) {
		console.error('❌ Error deleting testimonial:', error);
		throw error;
	}
}
