/**
 * Campaign Migration Script
 * Migrates existing campaign data from /src/lib/data/campaigns.js to Firestore
 *
 * Run with: node migrate-campaigns.js
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { campaigns, featuredCampaign } from './src/lib/data/campaigns.js';
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

async function migrateCampaignToFirestore(campaign) {
	try {
		// Transform the campaign data to match our Firestore schema
		const campaignData = {
			slug: campaign.slug,
			title: campaign.title,
			subtitle: campaign.subtitle,
			shortDescription: campaign.shortDescription,
			fullDescription: campaign.fullDescription.trim(),
			image: campaign.image,
			category: campaign.category,
			status: campaign.status,
			publishStatus: 'published', // All existing campaigns are published
			impactStats: campaign.impactStats || [],
			howItWorks: campaign.howItWorks || [],
			gallery: campaign.gallery || [],
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			publishedAt: new Date().toISOString()
		};

		const docRef = await addDoc(collection(db, 'campaigns'), campaignData);
		console.log(`✅ Migrated: "${campaign.title}" (ID: ${docRef.id})`);
		return docRef.id;
	} catch (error) {
		console.error(`❌ Error migrating "${campaign.title}":`, error.message);
		throw error;
	}
}

async function migrateAllCampaigns() {
	console.log('🚀 Starting campaign migration to Firestore...\n');

	// Combine featured campaign with regular campaigns
	const allCampaigns = [featuredCampaign, ...campaigns];
	console.log(`📝 Found ${allCampaigns.length} campaigns to migrate\n`);

	let successCount = 0;
	let errorCount = 0;

	for (const campaign of allCampaigns) {
		try {
			await migrateCampaignToFirestore(campaign);
			successCount++;
		} catch (error) {
			errorCount++;
		}
	}

	console.log('\n📊 Migration Complete!');
	console.log(`✅ Successfully migrated: ${successCount} campaigns`);
	console.log(`❌ Failed: ${errorCount} campaigns`);

	if (successCount === allCampaigns.length) {
		console.log('\n🎉 All campaigns migrated successfully!');
		console.log('👉 Visit /admin/campaigns to view and manage your campaigns');
	}

	process.exit(0);
}

// Run migration
migrateAllCampaigns().catch((error) => {
	console.error('💥 Migration failed:', error);
	process.exit(1);
});
