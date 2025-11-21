/**
 * Data Migration Utility for SikhAid Content Management
 *
 * This utility helps migrate the original static celebrity and testimonial data
 * to Firestore collections.
 *
 * Usage (from browser console):
 * 1. Go to /admin/content page
 * 2. Open browser console (F12)
 * 3. Run: await window.migrateContent()
 */

import { addCelebrityCard, addTestimonial } from '$lib/firestore';

// Original celebrity data from the static carousel
const ORIGINAL_CELEBRITIES = [
	{
		name: 'Banita Sandhu',
		profession: 'Actress',
		imageUrl: '/personalities/banita-sandhu.jpg',
		isActive: true
	},
	{
		name: 'Harbhajan Singh',
		profession: 'Ex-Cricketer',
		imageUrl: '/personalities/harbhajan-singh.jpg',
		isActive: true
	},
	{
		name: 'Rohanpreet Singh',
		profession: 'Singer',
		imageUrl: '/personalities/rohanpreet-singh.jpg',
		isActive: true
	},
	{
		name: 'ProphC',
		profession: 'Singer',
		imageUrl: '/personalities/prophc.jpg',
		isActive: true
	},
	{
		name: 'Jaspreet Singh',
		profession: 'Comedian',
		imageUrl: '/personalities/jaspreet-singh.jpg',
		isActive: true
	}
];

// Original testimonial data from the static carousel
// Using UI Avatars API for placeholder images based on initials
const ORIGINAL_TESTIMONIALS = [
	{
		name: 'Rajesh Kumar',
		designation: 'Beneficiary, Punjab',
		imageUrl: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&size=200&background=3b82f6&color=fff&bold=true',
		text: 'SikhAid saved our family during the floods. Their quick response and compassionate care gave us hope when we had lost everything.',
		isActive: true
	},
	{
		name: 'Priya Sharma',
		designation: 'Donor, Delhi',
		imageUrl: 'https://ui-avatars.com/api/?name=Priya+Sharma&size=200&background=10b981&color=fff&bold=true',
		text: 'I have been donating to SikhAid for 2 years. Their transparency and direct impact on communities is remarkable.',
		isActive: true
	},
	{
		name: 'Dr. Amit Singh',
		designation: 'Medical Volunteer, Mumbai',
		imageUrl: 'https://ui-avatars.com/api/?name=Amit+Singh&size=200&background=8b5cf6&color=fff&bold=true',
		text: 'As a medical volunteer with SikhAid, I have witnessed their incredible organizational skills and dedication to serving humanity.',
		isActive: true
	},
	{
		name: 'Sunita Devi',
		designation: 'Beneficiary, Odisha',
		imageUrl: 'https://ui-avatars.com/api/?name=Sunita+Devi&size=200&background=f97316&color=fff&bold=true',
		text: 'The mobile medical units reached our remote village when no one else could. SikhAid truly serves with compassion.',
		isActive: true
	},
	{
		name: 'Manpreet Kaur',
		designation: 'Community Leader, Haryana',
		imageUrl: 'https://ui-avatars.com/api/?name=Manpreet+Kaur&size=200&background=14b8a6&color=fff&bold=true',
		text: 'SikhAid helped rebuild our community after the cyclone. Their long-term support made all the difference.',
		isActive: true
	},
	{
		name: 'Ravi Patel',
		designation: 'Corporate Partner, Gujarat',
		imageUrl: 'https://ui-avatars.com/api/?name=Ravi+Patel&size=200&background=ef4444&color=fff&bold=true',
		text: 'Working as a corporate partner with SikhAid has shown me what true humanitarian work looks like. Exceptional organization.',
		isActive: true
	}
];

/**
 * Migrate celebrity cards to Firestore
 */
export async function migrateCelebrityCards(): Promise<{ success: number; failed: number; errors: string[] }> {
	console.log('🚀 Starting celebrity cards migration...');

	let success = 0;
	let failed = 0;
	const errors: string[] = [];

	for (const celebrity of ORIGINAL_CELEBRITIES) {
		try {
			const id = await addCelebrityCard(celebrity);
			console.log(`✅ Added celebrity: ${celebrity.name} (ID: ${id})`);
			success++;
		} catch (error) {
			const errorMsg = `Failed to add ${celebrity.name}: ${error instanceof Error ? error.message : 'Unknown error'}`;
			console.error(`❌ ${errorMsg}`);
			errors.push(errorMsg);
			failed++;
		}
	}

	console.log(`\n📊 Celebrity Cards Migration Complete:`);
	console.log(`   ✅ Success: ${success}`);
	console.log(`   ❌ Failed: ${failed}`);

	return { success, failed, errors };
}

/**
 * Migrate testimonials to Firestore
 */
export async function migrateTestimonials(): Promise<{ success: number; failed: number; errors: string[] }> {
	console.log('🚀 Starting testimonials migration...');

	let success = 0;
	let failed = 0;
	const errors: string[] = [];

	for (const testimonial of ORIGINAL_TESTIMONIALS) {
		try {
			const id = await addTestimonial(testimonial);
			console.log(`✅ Added testimonial: ${testimonial.name} (ID: ${id})`);
			success++;
		} catch (error) {
			const errorMsg = `Failed to add ${testimonial.name}: ${error instanceof Error ? error.message : 'Unknown error'}`;
			console.error(`❌ ${errorMsg}`);
			errors.push(errorMsg);
			failed++;
		}
	}

	console.log(`\n📊 Testimonials Migration Complete:`);
	console.log(`   ✅ Success: ${success}`);
	console.log(`   ❌ Failed: ${failed}`);

	return { success, failed, errors };
}

/**
 * Migrate all content (celebrities + testimonials)
 */
export async function migrateAllContent(): Promise<{
	celebrities: { success: number; failed: number; errors: string[] };
	testimonials: { success: number; failed: number; errors: string[] };
}> {
	console.log('🎯 Starting complete content migration...\n');

	const celebrities = await migrateCelebrityCards();
	console.log('\n---\n');
	const testimonials = await migrateTestimonials();

	console.log('\n🎉 Migration Complete!');
	console.log(`Total Success: ${celebrities.success + testimonials.success}`);
	console.log(`Total Failed: ${celebrities.failed + testimonials.failed}`);

	if (celebrities.errors.length > 0 || testimonials.errors.length > 0) {
		console.log('\n⚠️ Errors encountered:');
		[...celebrities.errors, ...testimonials.errors].forEach(err => console.log(`   - ${err}`));
	}

	return { celebrities, testimonials };
}

// Make migration functions available globally for browser console access
if (typeof window !== 'undefined') {
	(window as any).migrateCelebrityCards = migrateCelebrityCards;
	(window as any).migrateTestimonials = migrateTestimonials;
	(window as any).migrateAllContent = migrateAllContent;
	console.log('✨ Migration utilities loaded! Available functions:');
	console.log('   - window.migrateCelebrityCards()');
	console.log('   - window.migrateTestimonials()');
	console.log('   - window.migrateAllContent()');
}
