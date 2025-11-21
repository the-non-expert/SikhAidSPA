<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import {
		getCelebrityCards,
		getTestimonials,
		deleteCelebrityCard,
		deleteTestimonial,
		updateCelebrityCard,
		updateTestimonial,
		type FirestoreCelebrityCard,
		type FirestoreTestimonial
	} from '$lib/firestore';
	import CelebrityCardModal from '$lib/components/admin/CelebrityCardModal.svelte';
	import TestimonialModal from '$lib/components/admin/TestimonialModal.svelte';
	import { migrateAllContent } from '$lib/utils/migrateData';

	// Data stores (using $state for reactivity in Svelte 5)
	let celebrityCards: FirestoreCelebrityCard[] = $state([]);
	let testimonials: FirestoreTestimonial[] = $state([]);

	// UI state (using $state for reactivity in Svelte 5)
	let activeTab: 'celebrities' | 'testimonials' = $state('celebrities');
	let searchQuery = $state('');
	let isLoading = $state(true);
	let errorMessage = $state('');
	let successMessage = $state('');

	// Modal state (using $state for reactivity in Svelte 5)
	let celebrityModalOpen = $state(false);
	let testimonialModalOpen = $state(false);
	let editingCelebrity: FirestoreCelebrityCard | null = $state(null);
	let editingTestimonial: FirestoreTestimonial | null = $state(null);

	// Migration state (using $state for reactivity in Svelte 5)
	let isMigrating = $state(false);
	let showMigrationButton = $derived(celebrityCards.length === 0 && testimonials.length === 0 && !isLoading && !errorMessage);

	// Apply search filter
	function filterBySearch<T extends { name: string; [key: string]: any }>(items: T[]): T[] {
		if (!searchQuery) return items;
		return items.filter((item) =>
			Object.values(item).join(' ').toLowerCase().includes(searchQuery.toLowerCase())
		);
	}

	// Derived filtered data
	let filteredCelebrities = $derived(filterBySearch(celebrityCards));
	let filteredTestimonials = $derived(filterBySearch(testimonials));

	// Load all data on mount
	async function loadAllData() {
		console.log('🔵 [DEBUG] loadAllData: START');
		console.log('🔵 [DEBUG] Setting isLoading = true');
		isLoading = true;
		errorMessage = '';
		successMessage = '';

		try {
			console.log('🔵 [DEBUG] Creating timeout promise (10 seconds)');
			// Add timeout to prevent infinite loading
			const timeout = new Promise((_, reject) =>
				setTimeout(() => {
					console.log('⏰ [DEBUG] TIMEOUT TRIGGERED after 10 seconds!');
					reject(new Error('Loading timeout after 10 seconds'));
				}, 10000)
			);

			console.log('🔵 [DEBUG] Calling getCelebrityCards() and getTestimonials()');
			const dataPromise = Promise.all([getCelebrityCards(), getTestimonials()]);

			console.log('🔵 [DEBUG] Waiting for Promise.race (data vs timeout)...');
			const [cards, tests] = await Promise.race([dataPromise, timeout]) as [FirestoreCelebrityCard[], FirestoreTestimonial[]];

			console.log('✅ [DEBUG] Data loaded successfully!');
			console.log('✅ [DEBUG] Celebrity cards:', cards.length);
			console.log('✅ [DEBUG] Testimonials:', tests.length);

			celebrityCards = cards;
			testimonials = tests;
		} catch (error) {
			console.error('❌ [DEBUG] Error in loadAllData:', error);
			console.error('❌ [DEBUG] Error type:', error instanceof Error ? error.constructor.name : typeof error);
			console.error('❌ [DEBUG] Error message:', error instanceof Error ? error.message : String(error));

			const errorMsg = error instanceof Error ? error.message : 'Unknown error';

			if (errorMsg.includes('timeout')) {
				errorMessage = 'Loading timeout. Please check your Firebase configuration and internet connection.';
			} else if (errorMsg.includes('Firebase') || errorMsg.includes('Firestore')) {
				errorMessage = 'Firebase connection error. Please verify your Firebase configuration.';
			} else {
				errorMessage = 'Failed to load data. Please try again or check the browser console for details.';
			}
		} finally {
			console.log('🔵 [DEBUG] loadAllData: FINALLY block - setting isLoading = false');
			isLoading = false;
			console.log('🔵 [DEBUG] loadAllData: COMPLETE');
		}
	}

	// Format date
	function formatDate(isoString: string): string {
		const date = new Date(isoString);
		const day = date.getDate().toString().padStart(2, '0');
		const month = date.toLocaleString('en-IN', { month: 'short' });
		const year = date.getFullYear();
		return `${day}-${month}-${year}`;
	}

	// Celebrity Card Functions
	function openAddCelebrityModal() {
		editingCelebrity = null;
		celebrityModalOpen = true;
	}

	function openEditCelebrityModal(card: FirestoreCelebrityCard) {
		editingCelebrity = card;
		celebrityModalOpen = true;
	}

	async function handleCelebritySave() {
		await loadAllData();
		celebrityModalOpen = false;
		showSuccess('Celebrity card saved successfully!');
	}

	async function handleCelebrityDelete(id: string) {
		if (!confirm('Are you sure you want to delete this celebrity card?')) return;

		try {
			await deleteCelebrityCard(id);
			await loadAllData();
			showSuccess('Celebrity card deleted successfully!');
		} catch (error) {
			console.error('❌ Error deleting celebrity card:', error);
			errorMessage = 'Failed to delete celebrity card. Please try again.';
		}
	}

	async function toggleCelebrityActive(card: FirestoreCelebrityCard) {
		try {
			await updateCelebrityCard(card.id!, { isActive: !card.isActive });
			await loadAllData();
			showSuccess(
				`Celebrity card ${card.isActive ? 'hidden' : 'activated'} successfully!`
			);
		} catch (error) {
			console.error('❌ Error toggling celebrity card:', error);
			errorMessage = 'Failed to update celebrity card. Please try again.';
		}
	}

	// Testimonial Functions
	function openAddTestimonialModal() {
		editingTestimonial = null;
		testimonialModalOpen = true;
	}

	function openEditTestimonialModal(testimonial: FirestoreTestimonial) {
		editingTestimonial = testimonial;
		testimonialModalOpen = true;
	}

	async function handleTestimonialSave() {
		await loadAllData();
		testimonialModalOpen = false;
		showSuccess('Testimonial saved successfully!');
	}

	async function handleTestimonialDelete(id: string) {
		if (!confirm('Are you sure you want to delete this testimonial?')) return;

		try {
			await deleteTestimonial(id);
			await loadAllData();
			showSuccess('Testimonial deleted successfully!');
		} catch (error) {
			console.error('❌ Error deleting testimonial:', error);
			errorMessage = 'Failed to delete testimonial. Please try again.';
		}
	}

	async function toggleTestimonialActive(testimonial: FirestoreTestimonial) {
		try {
			await updateTestimonial(testimonial.id!, { isActive: !testimonial.isActive });
			await loadAllData();
			showSuccess(
				`Testimonial ${testimonial.isActive ? 'hidden' : 'activated'} successfully!`
			);
		} catch (error) {
			console.error('❌ Error toggling testimonial:', error);
			errorMessage = 'Failed to update testimonial. Please try again.';
		}
	}

	// Show success message
	function showSuccess(message: string) {
		successMessage = message;
		setTimeout(() => {
			successMessage = '';
		}, 3000);
	}

	// Handle data migration
	async function handleMigration() {
		if (!confirm('This will migrate 5 celebrity cards and 6 testimonials from the original static data. Continue?')) {
			return;
		}

		isMigrating = true;
		errorMessage = '';
		successMessage = '';

		try {
			const result = await migrateAllContent();
			const totalSuccess = result.celebrities.success + result.testimonials.success;
			const totalFailed = result.celebrities.failed + result.testimonials.failed;

			if (totalFailed === 0) {
				successMessage = `🎉 Migration successful! Added ${totalSuccess} items (${result.celebrities.success} celebrities, ${result.testimonials.success} testimonials).`;
			} else {
				errorMessage = `⚠️ Migration completed with errors. Success: ${totalSuccess}, Failed: ${totalFailed}. Check console for details.`;
			}

			// Reload data to show migrated content
			await loadAllData();
		} catch (error) {
			console.error('❌ Migration failed:', error);
			errorMessage = 'Migration failed. Please check the console for details.';
		} finally {
			isMigrating = false;
		}
	}

	onMount(() => {
		loadAllData();
	});
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
	<!-- Back to Dashboard Button -->
	<div class="mb-6">
		<button
			onclick={() => goto('/admin')}
			class="inline-flex items-center gap-2 px-4 py-2 bg-navy hover:bg-navy-dark text-white rounded-lg transition-colors font-medium"
		>
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 19l-7-7m0 0l7-7m-7 7h18"
				/>
			</svg>
			Back to Dashboard
		</button>
	</div>

	<!-- Success Message -->
	{#if successMessage}
		<div class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
			<p class="text-green-700 font-medium">✓ {successMessage}</p>
		</div>
	{/if}

	<!-- Error Message -->
	{#if errorMessage}
		<div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
			<p class="text-red-700 font-medium mb-3">⚠️ {errorMessage}</p>
			<div class="flex gap-3">
				<button
					onclick={loadAllData}
					class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium text-sm"
				>
					🔄 Retry Loading
				</button>
				<button
					onclick={() => (errorMessage = '')}
					class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors font-medium text-sm"
				>
					Dismiss
				</button>
			</div>
			<details class="mt-3">
				<summary class="cursor-pointer text-sm text-red-600 hover:text-red-800">
					🔧 Troubleshooting Tips
				</summary>
				<div class="mt-2 text-xs text-gray-700 bg-white p-3 rounded border border-red-100">
					<ul class="list-disc list-inside space-y-1">
						<li>Check browser console (F12) for detailed error messages</li>
						<li>Verify Firebase configuration in your .env file</li>
						<li>Ensure Firestore security rules allow read/write access</li>
						<li>Check your internet connection</li>
						<li>Try refreshing the page</li>
					</ul>
				</div>
			</details>
		</div>
	{/if}

	<!-- Loading State -->
	{#if isLoading}
		<div class="flex flex-col items-center justify-center py-20">
			<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-navy mb-4"></div>
			<p class="text-gray-600">Loading content...</p>
		</div>
	{:else}
		<!-- Header -->
		<div class="mb-8">
			<button
				onclick={() => goto('/admin')}
				class="text-gray-600 hover:text-gray-800 mb-4 flex items-center gap-1"
			>
				<Icon icon="mdi:arrow-left" />
				Back to Dashboard
			</button>
			<h1 class="text-3xl font-bold text-navy-custom mb-2">Content Management</h1>
			<p class="text-gray-600">Manage celebrity endorsements and testimonials</p>
		</div>

		<!-- Migration Banner (shown when no data exists) -->
		{#if showMigrationButton}
			<div class="mb-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
				<div class="flex items-start gap-4">
					<div class="flex-shrink-0">
						<svg class="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
						</svg>
					</div>
					<div class="flex-1">
						<h3 class="text-lg font-semibold text-gray-900 mb-2">Quick Start: Migrate Original Data</h3>
						<p class="text-gray-700 mb-4">
							Your collections are empty. Would you like to migrate the original static data?
							This will add <strong>5 celebrity cards</strong> and <strong>6 testimonials</strong> to get you started.
						</p>
						<button
							onclick={handleMigration}
							disabled={isMigrating}
							class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{#if isMigrating}
								<div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
								Migrating...
							{:else}
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
								</svg>
								Migrate Original Data
							{/if}
						</button>
						<p class="text-xs text-gray-500 mt-2">
							Note: You can also manually add items using the "Add New" button below.
						</p>
					</div>
				</div>
			</div>
		{/if}

		<!-- Tabs -->
		<div class="flex gap-4 mb-6 border-b border-gray-200">
			<button
				onclick={() => (activeTab = 'celebrities')}
				class="px-6 py-3 font-semibold transition-colors relative"
				class:text-navy-custom={activeTab === 'celebrities'}
				class:text-gray-500={activeTab !== 'celebrities'}
			>
				Renowned Personalities ({celebrityCards.length})
				{#if activeTab === 'celebrities'}
					<div class="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-custom"></div>
				{/if}
			</button>
			<button
				onclick={() => (activeTab = 'testimonials')}
				class="px-6 py-3 font-semibold transition-colors relative"
				class:text-navy-custom={activeTab === 'testimonials'}
				class:text-gray-500={activeTab !== 'testimonials'}
			>
				Testimonials ({testimonials.length})
				{#if activeTab === 'testimonials'}
					<div class="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-custom"></div>
				{/if}
			</button>
		</div>

		<!-- Action Bar -->
		<div class="bg-white rounded-xl shadow-md p-4 mb-6">
			<div class="flex flex-col sm:flex-row items-center justify-between gap-4">
				<div class="flex items-center gap-3 w-full sm:w-auto">
					<button
						onclick={activeTab === 'celebrities'
							? openAddCelebrityModal
							: openAddTestimonialModal}
						class="px-4 py-2 bg-orange-custom hover:bg-orange-dark text-white rounded-lg transition-colors font-medium flex items-center"
					>
						<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 4v16m8-8H4"
							/>
						</svg>
						Add New
					</button>

					<button
						onclick={loadAllData}
						class="px-4 py-2 bg-navy hover:bg-navy-dark text-white rounded-lg transition-colors font-medium flex items-center"
					>
						<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
							/>
						</svg>
						Refresh
					</button>
				</div>

				<input
					type="search"
					bind:value={searchQuery}
					placeholder="Search..."
					class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-custom focus:border-transparent w-full sm:w-64"
				/>
			</div>
		</div>

		<!-- Celebrity Cards Tab -->
		{#if activeTab === 'celebrities'}
			{#if filteredCelebrities.length === 0}
				<div class="bg-white rounded-xl shadow-md p-12 text-center">
					<div class="mb-6">
						<svg class="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
						</svg>
						<h3 class="text-xl font-semibold text-gray-700 mb-2">No Renowned Personalities Yet</h3>
						{#if searchQuery}
							<p class="text-gray-500 mb-4">No results found for "{searchQuery}". Try a different search term.</p>
							<button
								onclick={() => (searchQuery = '')}
								class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors font-medium"
							>
								Clear Search
							</button>
						{:else}
							<p class="text-gray-500 mb-6">Start building your showcase by adding renowned personalities who support SikhAid.</p>
							<button
								onclick={openAddCelebrityModal}
								class="px-6 py-3 bg-orange-custom hover:bg-orange-dark text-white rounded-lg transition-colors font-medium inline-flex items-center gap-2"
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
								</svg>
								Add Your First Celebrity Card
							</button>
						{/if}
					</div>
				</div>
			{:else}
				<div class="bg-white rounded-xl shadow-md overflow-hidden">
					<div class="overflow-x-auto">
						<table class="min-w-full divide-y divide-gray-200">
							<thead class="bg-gray-50">
								<tr>
									<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
										>Image</th
									>
									<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
										>Name</th
									>
									<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
										>Profession</th
									>
									<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
										>Status</th
									>
									<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
										>Created</th
									>
									<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
										>Actions</th
									>
								</tr>
							</thead>
							<tbody class="bg-white divide-y divide-gray-200">
								{#each filteredCelebrities as card}
									<tr class="hover:bg-gray-50 transition-colors">
										<td class="px-6 py-4 whitespace-nowrap">
											<img
												src={card.imageUrl}
												alt={card.name}
												class="w-12 h-12 rounded-lg object-cover"
											/>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="text-sm font-medium text-gray-900">{card.name}</div>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="text-sm text-gray-600">{card.profession}</div>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<span
												class="px-2 py-1 text-xs font-medium rounded-full"
												class:bg-green-100={card.isActive}
												class:text-green-700={card.isActive}
												class:bg-gray-100={!card.isActive}
												class:text-gray-700={!card.isActive}
											>
												{card.isActive ? 'Active' : 'Hidden'}
											</span>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="text-sm text-gray-600">{formatDate(card.createdAt)}</div>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="flex items-center gap-2">
												<button
													onclick={() => toggleCelebrityActive(card)}
													class="text-sm text-blue-600 hover:text-blue-800 font-medium"
												>
													{card.isActive ? 'Hide' : 'Show'}
												</button>
												<button
													onclick={() => openEditCelebrityModal(card)}
													class="text-sm text-orange-custom hover:text-orange-dark font-medium"
												>
													Edit
												</button>
												<button
													onclick={() => handleCelebrityDelete(card.id!)}
													class="text-sm text-red-600 hover:text-red-800 font-medium"
												>
													Delete
												</button>
											</div>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			{/if}
		{/if}

		<!-- Testimonials Tab -->
		{#if activeTab === 'testimonials'}
			{#if filteredTestimonials.length === 0}
				<div class="bg-white rounded-xl shadow-md p-12 text-center">
					<div class="mb-6">
						<svg class="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
						</svg>
						<h3 class="text-xl font-semibold text-gray-700 mb-2">No Testimonials Yet</h3>
						{#if searchQuery}
							<p class="text-gray-500 mb-4">No results found for "{searchQuery}". Try a different search term.</p>
							<button
								onclick={() => (searchQuery = '')}
								class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors font-medium"
							>
								Clear Search
							</button>
						{:else}
							<p class="text-gray-500 mb-6">Share inspiring stories from people whose lives were touched by SikhAid's work.</p>
							<button
								onclick={openAddTestimonialModal}
								class="px-6 py-3 bg-orange-custom hover:bg-orange-dark text-white rounded-lg transition-colors font-medium inline-flex items-center gap-2"
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
								</svg>
								Add Your First Testimonial
							</button>
						{/if}
					</div>
				</div>
			{:else}
				<div class="bg-white rounded-xl shadow-md overflow-hidden">
					<div class="overflow-x-auto">
						<table class="min-w-full divide-y divide-gray-200">
							<thead class="bg-gray-50">
								<tr>
									<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
										>Image</th
									>
									<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
										>Name</th
									>
									<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
										>Designation</th
									>
									<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
										>Testimonial</th
									>
									<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
										>Status</th
									>
									<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
										>Created</th
									>
									<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
										>Actions</th
									>
								</tr>
							</thead>
							<tbody class="bg-white divide-y divide-gray-200">
								{#each filteredTestimonials as testimonial}
									<tr class="hover:bg-gray-50 transition-colors">
										<td class="px-6 py-4 whitespace-nowrap">
											<img
												src={testimonial.imageUrl}
												alt={testimonial.name}
												class="w-12 h-12 rounded-full object-cover"
											/>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="text-sm font-medium text-gray-900">{testimonial.name}</div>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="text-sm text-gray-600">{testimonial.designation}</div>
										</td>
										<td class="px-6 py-4">
											<div class="text-sm text-gray-600 max-w-md truncate">
												{testimonial.text}
											</div>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<span
												class="px-2 py-1 text-xs font-medium rounded-full"
												class:bg-green-100={testimonial.isActive}
												class:text-green-700={testimonial.isActive}
												class:bg-gray-100={!testimonial.isActive}
												class:text-gray-700={!testimonial.isActive}
											>
												{testimonial.isActive ? 'Active' : 'Hidden'}
											</span>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="text-sm text-gray-600">{formatDate(testimonial.createdAt)}</div>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="flex items-center gap-2">
												<button
													onclick={() => toggleTestimonialActive(testimonial)}
													class="text-sm text-blue-600 hover:text-blue-800 font-medium"
												>
													{testimonial.isActive ? 'Hide' : 'Show'}
												</button>
												<button
													onclick={() => openEditTestimonialModal(testimonial)}
													class="text-sm text-orange-custom hover:text-orange-dark font-medium"
												>
													Edit
												</button>
												<button
													onclick={() => handleTestimonialDelete(testimonial.id!)}
													class="text-sm text-red-600 hover:text-red-800 font-medium"
												>
													Delete
												</button>
											</div>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			{/if}
		{/if}
	{/if}
</div>

<!-- Modals -->
{#if celebrityModalOpen}
	<CelebrityCardModal
		card={editingCelebrity}
		onClose={() => (celebrityModalOpen = false)}
		onSave={handleCelebritySave}
	/>
{/if}

{#if testimonialModalOpen}
	<TestimonialModal
		testimonial={editingTestimonial}
		onClose={() => (testimonialModalOpen = false)}
		onSave={handleTestimonialSave}
	/>
{/if}
