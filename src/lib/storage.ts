import { storage } from './firebase';
import {
	ref,
	uploadBytesResumable,
	getDownloadURL,
	deleteObject,
	type UploadTask
} from 'firebase/storage';

/**
 * Validates an image file
 * @param file - File to validate
 * @returns Error message if invalid, null if valid
 */
export function validateImageFile(file: File): string | null {
	// Check if file is an image
	if (!file.type.startsWith('image/')) {
		return 'Please select an image file (JPEG, PNG, GIF, WebP)';
	}

	// Check file size (max 5MB)
	const maxSize = 5 * 1024 * 1024; // 5MB in bytes
	if (file.size > maxSize) {
		return 'Image size must be less than 5MB';
	}

	// Check file type
	const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
	if (!allowedTypes.includes(file.type)) {
		return 'Allowed formats: JPEG, PNG, GIF, WebP';
	}

	return null;
}

/**
 * Validates an external image URL
 * @param url - URL to validate
 * @returns Error message if invalid, null if valid
 */
export function validateImageURL(url: string): string | null {
	if (!url.trim()) {
		return 'Please enter a URL';
	}

	// Basic URL validation
	try {
		const urlObj = new URL(url);
		if (!['http:', 'https:'].includes(urlObj.protocol)) {
			return 'URL must start with http:// or https://';
		}
	} catch {
		return 'Please enter a valid URL';
	}

	// Check if URL ends with common image extensions
	const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
	const hasImageExtension = imageExtensions.some((ext) => url.toLowerCase().includes(ext));

	if (!hasImageExtension) {
		console.warn('URL may not be an image file');
	}

	return null;
}

/**
 * Generates a unique filename with timestamp
 * @param originalName - Original filename
 * @param folder - Storage folder (e.g., 'blogs', 'campaigns')
 * @returns Unique filename with path
 */
export function generateUniqueFilename(originalName: string, folder: string): string {
	const timestamp = Date.now();
	const randomString = Math.random().toString(36).substring(2, 8);
	const extension = originalName.split('.').pop();
	const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9]/g, '-');

	return `${folder}/${nameWithoutExt}-${timestamp}-${randomString}.${extension}`;
}

/**
 * Uploads an image to Firebase Storage with progress tracking
 * @param file - Image file to upload
 * @param folder - Storage folder (e.g., 'blogs', 'campaigns')
 * @param onProgress - Optional callback for upload progress (0-100)
 * @returns Promise that resolves to the public download URL
 */
export async function uploadImage(
	file: File,
	folder: string,
	onProgress?: (progress: number) => void
): Promise<string> {
	if (!storage) {
		throw new Error('Firebase Storage is not initialized');
	}

	// Validate file
	const validationError = validateImageFile(file);
	if (validationError) {
		throw new Error(validationError);
	}

	// Generate unique filename
	const filename = generateUniqueFilename(file.name, folder);

	// Create storage reference
	const storageRef = ref(storage, filename);

	// Upload file with progress tracking
	const uploadTask: UploadTask = uploadBytesResumable(storageRef, file);

	return new Promise((resolve, reject) => {
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				// Calculate progress percentage
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

				// Call progress callback if provided
				if (onProgress) {
					onProgress(Math.round(progress));
				}
			},
			(error) => {
				// Handle upload errors
				console.error('Upload error:', error);
				reject(new Error(`Upload failed: ${error.message}`));
			},
			async () => {
				// Upload completed successfully, get download URL
				try {
					const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
					resolve(downloadURL);
				} catch (error) {
					reject(new Error('Failed to get download URL'));
				}
			}
		);
	});
}

/**
 * Deletes an image from Firebase Storage
 * @param imageUrl - Full download URL of the image
 * @returns Promise that resolves when deletion is complete
 */
export async function deleteImage(imageUrl: string): Promise<void> {
	if (!storage) {
		throw new Error('Firebase Storage is not initialized');
	}

	try {
		// Extract path from URL
		// Firebase Storage URLs look like: https://firebasestorage.googleapis.com/v0/b/{bucket}/o/{path}?alt=media&token={token}
		const url = new URL(imageUrl);

		// Check if it's a Firebase Storage URL
		if (!url.hostname.includes('firebasestorage.googleapis.com')) {
			console.warn('Not a Firebase Storage URL, skipping deletion');
			return;
		}

		// Extract path from URL
		const pathMatch = url.pathname.match(/\/o\/(.+?)(\?|$)/);
		if (!pathMatch) {
			throw new Error('Invalid Firebase Storage URL');
		}

		const path = decodeURIComponent(pathMatch[1]);

		// Create reference and delete
		const imageRef = ref(storage, path);
		await deleteObject(imageRef);

		console.log('Image deleted successfully:', path);
	} catch (error) {
		console.error('Error deleting image:', error);
		throw new Error('Failed to delete image');
	}
}

/**
 * Uploads multiple images to Firebase Storage
 * @param files - Array of image files to upload
 * @param folder - Storage folder (e.g., 'blogs', 'campaigns')
 * @param onProgress - Optional callback for overall progress
 * @returns Promise that resolves to array of public download URLs
 */
export async function uploadMultipleImages(
	files: File[],
	folder: string,
	onProgress?: (progress: number) => void
): Promise<string[]> {
	const totalFiles = files.length;
	let completedFiles = 0;

	const uploadPromises = files.map(async (file) => {
		const url = await uploadImage(file, folder, (fileProgress) => {
			// Calculate overall progress
			const overallProgress = ((completedFiles + fileProgress / 100) / totalFiles) * 100;
			if (onProgress) {
				onProgress(Math.round(overallProgress));
			}
		});

		completedFiles++;

		// Update overall progress
		if (onProgress) {
			onProgress(Math.round((completedFiles / totalFiles) * 100));
		}

		return url;
	});

	return Promise.all(uploadPromises);
}
