<script lang="ts">
	import { addCelebrityCard, updateCelebrityCard, type FirestoreCelebrityCard } from '$lib/firestore';
	import type { CelebrityCard } from '$lib/types/content';

	interface Props {
		card: FirestoreCelebrityCard | null;
		onClose: () => void;
		onSave: () => void;
	}

	let { card = null, onClose, onSave }: Props = $props();

	// Form state
	let name = $state(card?.name || '');
	let profession = $state(card?.profession || '');
	let imageUrl = $state(card?.imageUrl || '');
	let isActive = $state(card?.isActive ?? true);

	// Validation errors
	let errors = $state<Record<string, string>>({});
	let isSubmitting = $state(false);
	let errorMessage = $state('');

	// Validate form
	function validateForm(): boolean {
		errors = {};

		if (!name.trim() || name.trim().length < 2) {
			errors.name = 'Name must be at least 2 characters';
		}

		if (!profession.trim() || profession.trim().length < 2) {
			errors.profession = 'Profession must be at least 2 characters';
		}

		if (!imageUrl.trim()) {
			errors.imageUrl = 'Image URL is required';
		} else if (!imageUrl.match(/^https?:\/\/.+/)) {
			errors.imageUrl = 'Please enter a valid URL starting with http:// or https://';
		}

		return Object.keys(errors).length === 0;
	}

	// Handle submit
	async function handleSubmit() {
		if (!validateForm()) return;

		isSubmitting = true;
		errorMessage = '';

		try {
			const cardData: Omit<CelebrityCard, 'id' | 'createdAt' | 'updatedAt' | 'firestoreTimestamp'> = {
				name: name.trim(),
				profession: profession.trim(),
				imageUrl: imageUrl.trim(),
				isActive
			};

			if (card?.id) {
				// Update existing
				await updateCelebrityCard(card.id, cardData);
			} else {
				// Add new
				await addCelebrityCard(cardData);
			}

			onSave();
		} catch (error) {
			console.error('❌ Error saving celebrity card:', error);
			errorMessage = 'Failed to save celebrity card. Please try again.';
		} finally {
			isSubmitting = false;
		}
	}

	// Handle backdrop click
	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			onClose();
		}
	}

	// Handle escape key
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			onClose();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- Modal Backdrop -->
<div
	class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
	onclick={handleBackdropClick}
>
	<!-- Modal Container -->
	<div
		class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
		onclick={(e) => e.stopPropagation()}
	>
		<!-- Modal Header -->
		<div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
			<h2 class="text-2xl font-bold text-navy-custom">
				{card ? 'Edit Celebrity Card' : 'Add Celebrity Card'}
			</h2>
			<button
				onclick={onClose}
				class="text-gray-400 hover:text-gray-600 transition-colors"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>

		<!-- Modal Content -->
		<div class="px-6 py-6">
			{#if errorMessage}
				<div class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
					<p class="text-red-700 font-medium">⚠️ {errorMessage}</p>
				</div>
			{/if}

			<form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-6">
				<!-- Name -->
				<div>
					<label for="name" class="block text-sm font-semibold text-gray-700 mb-2">
						Name <span class="text-red-500">*</span>
					</label>
					<input
						id="name"
						type="text"
						bind:value={name}
						placeholder="e.g., Banita Sandhu"
						class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-custom focus:border-transparent transition-all"
						class:border-red-500={errors.name}
						class:border-gray-300={!errors.name}
					/>
					{#if errors.name}
						<p class="text-red-500 text-sm mt-1">{errors.name}</p>
					{/if}
				</div>

				<!-- Profession -->
				<div>
					<label for="profession" class="block text-sm font-semibold text-gray-700 mb-2">
						Profession / What They Do <span class="text-red-500">*</span>
					</label>
					<input
						id="profession"
						type="text"
						bind:value={profession}
						placeholder="e.g., Actress"
						class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-custom focus:border-transparent transition-all"
						class:border-red-500={errors.profession}
						class:border-gray-300={!errors.profession}
					/>
					{#if errors.profession}
						<p class="text-red-500 text-sm mt-1">{errors.profession}</p>
					{/if}
				</div>

				<!-- Image URL -->
				<div>
					<label for="imageUrl" class="block text-sm font-semibold text-gray-700 mb-2">
						Image URL <span class="text-red-500">*</span>
					</label>
					<input
						id="imageUrl"
						type="url"
						bind:value={imageUrl}
						placeholder="https://example.com/image.jpg"
						class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-custom focus:border-transparent transition-all"
						class:border-red-500={errors.imageUrl}
						class:border-gray-300={!errors.imageUrl}
					/>
					{#if errors.imageUrl}
						<p class="text-red-500 text-sm mt-1">{errors.imageUrl}</p>
					{/if}
					{#if imageUrl && !errors.imageUrl}
						<div class="mt-3">
							<p class="text-sm text-gray-600 mb-2">Image Preview:</p>
							<img
								src={imageUrl}
								alt="Preview"
								class="w-32 h-32 object-cover rounded-lg border border-gray-300"
								onerror={() => {
									errors.imageUrl = 'Failed to load image. Please check the URL.';
								}}
							/>
						</div>
					{/if}
				</div>

				<!-- Is Active -->
				<div>
					<label class="flex items-center gap-3 cursor-pointer">
						<input
							type="checkbox"
							bind:checked={isActive}
							class="w-5 h-5 text-orange-custom border-gray-300 rounded focus:ring-orange-custom focus:ring-2"
						/>
						<span class="text-sm font-semibold text-gray-700">
							Display on website (Active)
						</span>
					</label>
					<p class="text-sm text-gray-500 mt-1 ml-8">
						Uncheck to hide this card from the public website
					</p>
				</div>
			</form>
		</div>

		<!-- Modal Footer -->
		<div class="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
			<button
				onclick={onClose}
				type="button"
				class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
				disabled={isSubmitting}
			>
				Cancel
			</button>
			<button
				onclick={handleSubmit}
				type="button"
				class="px-6 py-2 bg-orange-custom hover:bg-orange-dark text-white rounded-lg transition-colors font-medium flex items-center gap-2"
				disabled={isSubmitting}
			>
				{#if isSubmitting}
					<div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
					Saving...
				{:else}
					Save Celebrity Card
				{/if}
			</button>
		</div>
	</div>
</div>
