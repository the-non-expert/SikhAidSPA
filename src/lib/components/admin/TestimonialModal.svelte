<script lang="ts">
	import { addTestimonial, updateTestimonial, type FirestoreTestimonial } from '$lib/firestore';
	import type { Testimonial } from '$lib/types/content';

	interface Props {
		testimonial: FirestoreTestimonial | null;
		onClose: () => void;
		onSave: () => void;
	}

	let { testimonial = null, onClose, onSave }: Props = $props();

	// Form state
	let name = $state(testimonial?.name || '');
	let designation = $state(testimonial?.designation || '');
	let imageUrl = $state(testimonial?.imageUrl || '');
	let text = $state(testimonial?.text || '');
	let isActive = $state(testimonial?.isActive ?? true);

	// Validation errors
	let errors = $state<Record<string, string>>({});
	let isSubmitting = $state(false);
	let errorMessage = $state('');

	// Character count
	let characterCount = $derived(text.length);
	const characterLimit = 500;

	// Validate form
	function validateForm(): boolean {
		errors = {};

		if (!name.trim() || name.trim().length < 2) {
			errors.name = 'Name must be at least 2 characters';
		}

		if (!designation.trim() || designation.trim().length < 2) {
			errors.designation = 'Designation must be at least 2 characters';
		}

		if (!imageUrl.trim()) {
			errors.imageUrl = 'Image URL is required';
		} else if (!imageUrl.match(/^https?:\/\/.+/)) {
			errors.imageUrl = 'Please enter a valid URL starting with http:// or https://';
		}

		if (!text.trim() || text.trim().length < 10) {
			errors.text = 'Testimonial must be at least 10 characters';
		} else if (text.length > characterLimit) {
			errors.text = `Testimonial cannot exceed ${characterLimit} characters`;
		}

		return Object.keys(errors).length === 0;
	}

	// Handle submit
	async function handleSubmit() {
		if (!validateForm()) return;

		isSubmitting = true;
		errorMessage = '';

		try {
			const testimonialData: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt' | 'firestoreTimestamp'> = {
				name: name.trim(),
				designation: designation.trim(),
				imageUrl: imageUrl.trim(),
				text: text.trim(),
				isActive
			};

			if (testimonial?.id) {
				// Update existing
				await updateTestimonial(testimonial.id, testimonialData);
			} else {
				// Add new
				await addTestimonial(testimonialData);
			}

			onSave();
		} catch (error) {
			console.error('❌ Error saving testimonial:', error);
			errorMessage = 'Failed to save testimonial. Please try again.';
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
				{testimonial ? 'Edit Testimonial' : 'Add Testimonial'}
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
						placeholder="e.g., Rajesh Kumar"
						class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-custom focus:border-transparent transition-all"
						class:border-red-500={errors.name}
						class:border-gray-300={!errors.name}
					/>
					{#if errors.name}
						<p class="text-red-500 text-sm mt-1">{errors.name}</p>
					{/if}
				</div>

				<!-- Designation -->
				<div>
					<label for="designation" class="block text-sm font-semibold text-gray-700 mb-2">
						Designation / Title <span class="text-red-500">*</span>
					</label>
					<input
						id="designation"
						type="text"
						bind:value={designation}
						placeholder="e.g., Volunteer Coordinator"
						class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-custom focus:border-transparent transition-all"
						class:border-red-500={errors.designation}
						class:border-gray-300={!errors.designation}
					/>
					{#if errors.designation}
						<p class="text-red-500 text-sm mt-1">{errors.designation}</p>
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
								class="w-20 h-20 object-cover rounded-full border border-gray-300"
								onerror={() => {
									errors.imageUrl = 'Failed to load image. Please check the URL.';
								}}
							/>
						</div>
					{/if}
				</div>

				<!-- Testimonial Text -->
				<div>
					<label for="text" class="block text-sm font-semibold text-gray-700 mb-2">
						Testimonial Text <span class="text-red-500">*</span>
					</label>
					<textarea
						id="text"
						bind:value={text}
						placeholder="Share your experience with SikhAid..."
						rows="6"
						class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-custom focus:border-transparent transition-all resize-y"
						class:border-red-500={errors.text}
						class:border-gray-300={!errors.text}
					></textarea>
					<div class="flex justify-between items-center mt-1">
						{#if errors.text}
							<p class="text-red-500 text-sm">{errors.text}</p>
						{:else}
							<p class="text-gray-500 text-sm">Share what you appreciate about SikhAid</p>
						{/if}
						<p
							class="text-sm"
							class:text-gray-500={characterCount <= characterLimit}
							class:text-red-500={characterCount > characterLimit}
						>
							{characterCount} / {characterLimit}
						</p>
					</div>
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
						Uncheck to hide this testimonial from the public website
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
					Save Testimonial
				{/if}
			</button>
		</div>
	</div>
</div>
