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
	console.log('🔥 [ensureFirebaseInitialized] Called');

	if (!browser) {
		console.log('🔥 [ensureFirebaseInitialized] Not in browser, skipping');
		return;
	}

	// Already initialized successfully
	if (db && app) {
		console.log('🔥 [ensureFirebaseInitialized] Already initialized, returning immediately');
		return;
	}

	// Already initializing - wait for it to complete
	if (initializationPromise) {
		console.log('🔥 [ensureFirebaseInitialized] Initialization in progress, waiting...');
		return initializationPromise;
	}

	// Start new initialization
	console.log('🔥 [ensureFirebaseInitialized] Starting new initialization...');
	initializationPromise = (async () => {
		console.log('🔥 [ensureFirebaseInitialized] Setting firebaseInitializing = true');
		firebaseInitializing.set(true);

		try {
			// Validate config
			console.log('🔥 [ensureFirebaseInitialized] Validating config...');
			console.log('🔥 [ensureFirebaseInitialized] Config check:', {
				hasApiKey: !!firebaseConfig.apiKey,
				hasProjectId: !!firebaseConfig.projectId,
				projectId: firebaseConfig.projectId?.substring(0, 10) + '...'
			});

			if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
				throw new Error('Firebase configuration is incomplete. Check your .env file.');
			}

			// Initialize Firebase services
			console.log('🔥 [ensureFirebaseInitialized] Calling initializeApp()...');
			app = initializeApp(firebaseConfig);
			console.log('🔥 [ensureFirebaseInitialized] initializeApp() complete');

			console.log('🔥 [ensureFirebaseInitialized] Getting Firestore instance...');
			db = getFirestore(app);
			console.log('🔥 [ensureFirebaseInitialized] Firestore instance acquired');

			console.log('🔥 [ensureFirebaseInitialized] Getting Auth instance...');
			auth = getAuth(app);

			console.log('🔥 [ensureFirebaseInitialized] Getting Storage instance...');
			storage = getStorage(app);

			firebaseInitialized.set(true);
			firebaseError.set(null);

			console.log('✅ Firebase initialized successfully');
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Firebase initialization failed';
			console.error('❌ [ensureFirebaseInitialized] Firebase initialization failed:', error);
			console.error('❌ [ensureFirebaseInitialized] Error details:', {
				message: errorMessage,
				name: error instanceof Error ? error.name : 'Unknown',
				stack: error instanceof Error ? error.stack : 'No stack trace'
			});
			firebaseError.set(errorMessage);

			// Reset so retry is possible
			app = undefined;
			db = undefined;
			auth = undefined;
			storage = undefined;

			throw error;
		} finally {
			console.log('🔥 [ensureFirebaseInitialized] FINALLY block');
			firebaseInitializing.set(false);
			initializationPromise = null;
			console.log('🔥 [ensureFirebaseInitialized] Initialization promise cleared');
		}
	})();

	return initializationPromise;
}

// Auto-initialize on module load (but don't throw if it fails)
if (browser) {
	console.log('🔥 [AUTO-INIT] Starting auto-initialization on module load...');
	ensureFirebaseInitialized()
		.then(() => {
			console.log('✅ [AUTO-INIT] Auto-initialization completed successfully');
		})
		.catch((error) => {
			console.error('❌ [AUTO-INIT] Failed to auto-initialize Firebase:', error);
		});
}

// Export Firebase instances
export { app, db, auth, storage };
