import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Create stores to track initialization state
export const firebaseInitialized = writable(false);
export const firebaseInitializing = writable(false);
export const firebaseError = writable<string | null>(null);

let app: FirebaseApp | undefined;
let db: Firestore | undefined;
let auth: Auth | undefined;
let storage: FirebaseStorage | undefined;

let initializationPromise: Promise<void> | null = null;

/**
 * Ensures Firebase is initialized before operations
 * Can be called multiple times safely - will reuse existing initialization
 */
export async function ensureFirebaseInitialized(): Promise<void> {
	if (!browser) return;

	// Already initialized successfully
	if (db && app) {
		return;
	}

	// Already initializing - wait for it to complete
	if (initializationPromise) {
		return initializationPromise;
	}

	// Start new initialization
	initializationPromise = (async () => {
		firebaseInitializing.set(true);

		try {
			// Validate config
			if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
				throw new Error('Firebase configuration is incomplete. Check your .env file.');
			}

			// Initialize Firebase services
			app = initializeApp(firebaseConfig);
			db = getFirestore(app);
			auth = getAuth(app);
			storage = getStorage(app);

			firebaseInitialized.set(true);
			firebaseError.set(null);

			console.log('✅ Firebase initialized successfully');
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Firebase initialization failed';
			console.error('❌ Firebase initialization failed:', error);
			firebaseError.set(errorMessage);

			// Reset so retry is possible
			app = undefined;
			db = undefined;
			auth = undefined;
			storage = undefined;

			throw error;
		} finally {
			firebaseInitializing.set(false);
			initializationPromise = null;
		}
	})();

	return initializationPromise;
}

// Auto-initialize on module load (but don't throw if it fails)
if (browser) {
	ensureFirebaseInitialized().catch((error) => {
		console.error('Failed to auto-initialize Firebase:', error);
	});
}

// Export Firebase instances
export { app, db, auth, storage };
