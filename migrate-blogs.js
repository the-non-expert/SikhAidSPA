/**
 * Blog Migration Script
 * Migrates existing blog data from /src/lib/data/blogs.js to Firestore
 *
 * Run with: node migrate-blogs.js
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { blogPosts } from './src/lib/data/blogs.js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Firebase configuration from environment variables
const firebaseConfig = {
	apiKey: process.env.VITE_FIREBASE_API_KEY,
	authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migrateBlogToFirestore(blog) {
	try {
		// Transform the blog data to match our Firestore schema
		const blogData = {
			slug: blog.slug,
			title: blog.title,
			excerpt: blog.excerpt,
			content: blog.content,
			image: blog.image,
			category: blog.category,
			author: blog.author,
			publishStatus: 'published', // All existing blogs are published
			readTime: blog.readTime,
			createdAt: new Date(blog.date).toISOString(),
			updatedAt: new Date(blog.date).toISOString(),
			publishedAt: new Date(blog.date).toISOString()
		};

		const docRef = await addDoc(collection(db, 'blogs'), blogData);
		console.log(`✅ Migrated: "${blog.title}" (ID: ${docRef.id})`);
		return docRef.id;
	} catch (error) {
		console.error(`❌ Error migrating "${blog.title}":`, error.message);
		throw error;
	}
}

async function migrateAllBlogs() {
	console.log('🚀 Starting blog migration to Firestore...\n');
	console.log(`📝 Found ${blogPosts.length} blogs to migrate\n`);

	let successCount = 0;
	let errorCount = 0;

	for (const blog of blogPosts) {
		try {
			await migrateBlogToFirestore(blog);
			successCount++;
		} catch (error) {
			errorCount++;
		}
	}

	console.log('\n📊 Migration Complete!');
	console.log(`✅ Successfully migrated: ${successCount} blogs`);
	console.log(`❌ Failed: ${errorCount} blogs`);

	if (successCount === blogPosts.length) {
		console.log('\n🎉 All blogs migrated successfully!');
		console.log('👉 Visit /admin/blogs to view and manage your blogs');
	}

	process.exit(0);
}

// Run migration
migrateAllBlogs().catch((error) => {
	console.error('💥 Migration failed:', error);
	process.exit(1);
});
