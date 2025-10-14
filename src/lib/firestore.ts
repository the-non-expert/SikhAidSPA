import { db } from './firebase';
import { 
	collection, 
	addDoc, 
	getDocs, 
	query, 
	orderBy, 
	updateDoc, 
	doc,
	type Timestamp,
	serverTimestamp 
} from 'firebase/firestore';
import type { ContactSubmission } from './stores/contact';
import type { VolunteerSubmission } from './stores/volunteering';
import type { CSRSubmission } from './stores/csr';

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
	CSR: 'csr_submissions'
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
		console.log('✅ Contact submission saved to Firestore with ID:', docRef.id);
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
		console.log('✅ Volunteer submission saved to Firestore with ID:', docRef.id);
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
		console.log('✅ CSR submission saved to Firestore with ID:', docRef.id);
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
		console.log(`✅ Updated ${collectionName}/${documentId} status to: ${status}`);
	} catch (error) {
		console.error('❌ Error updating status:', error);
		throw error;
	}
}
