<script lang="ts">
	import { addPressItem, updatePressItem, type FirestorePressItem } from '$lib/firestore';
	import type { PressItem } from '$lib/types/press';
	import { mainCategories, isValidYoutubeUrl, getYoutubeThumbnail, extractYoutubeId } from '$lib/types/press';

	interface Props {
		item: FirestorePressItem | null;
		onClose: () => void;
		onSave: () => void;
	}

	let { item = null, onClose, onSave }: Props = $props();

	// Form state
	let type = $state<'article' | 'video'>(item?.type || 'article');
	let title = $state(item?.title || '');
	let description = $state(item?.description || '');
	let publishedDate = $state(item?.publishedDate || '');
	let category = $state(item?.category || '');
	let customCategory = $state('');
	let tags = $state(item?.tags?.join(', ') || '');
	let isActive = $state(item?.isActive ?? true);

	// Article-specific fields
	let link = $state(item?.link || '');
	let image = $state(item?.image || '');

	// Video-specific fields
	let youtubeUrl = $state(item?.youtubeUrl || '');

	// Validation errors
	let errors = $state<Record<string, string>>({});
	let isSubmitting = $state(false);
	let errorMessage = $state('');

	// Derived values
	const showCustomCategory = $derived(category === 'Other');
	const youtubeThumbnail = $derived(() => {
		if (type === 'video' && youtubeUrl) {
			const videoId = extractYoutubeId(youtubeUrl);
			return videoId ? getYoutubeThumbnail(videoId) : null;
		}
		return null;
	});

	// Validate form
	function validateForm(): boolean {
		errors = {};

		// Common validations
		if (!title.trim() || title.trim().length < 5) {
			errors.title = 'Title must be at least 5 characters';
		}

		if (!description.trim() || description.trim().length < 10) {
			errors.description = 'Description must be at least 10 characters';
		}

		if (!publishedDate.trim()) {
			errors.publishedDate = 'Published date is required';
		}

		if (!category) {
			errors.category = 'Please select a category';
		}

		if (category === 'Other' && !customCategory.trim()) {
			errors.customCategory = 'Please specify the category';
		}

		// Article-specific validations
		if (type === 'article') {
			if (!link.trim()) {
				errors.link = 'Article link is required';
			} else if (!link.match(/^https?:\/\/.+/)) {
				errors.link = 'Please enter a valid URL starting with http:// or https://';
			}

			if (!image.trim()) {
				errors.image = 'Image URL is required';
			} else if (!image.match(/^https?:\/\/.+/) && !image.startsWith('/')) {
				errors.image = 'Please enter a valid URL or path';
			}
		}

		// Video-specific validations
		if (type === 'video') {
			if (!youtubeUrl.trim()) {
				errors.youtubeUrl = 'YouTube URL is required';
			} else if (!isValidYoutubeUrl(youtubeUrl)) {
				errors.youtubeUrl = 'Please enter a valid YouTube URL';
			}
		}

		return Object.keys(errors).length === 0;
	}

	// Handle submit
	async function handleSubmit() {
		if (!validateForm()) return;

		isSubmitting = true;
		errorMessage = '';

		try {
			const finalCategory = category === 'Other' ? customCategory.trim() : category;
			const tagsArray = tags.split(',').map(t => t.trim()).filter(t => t.length > 0);

			const pressData: Omit<PressItem, 'id' | 'createdAt' | 'updatedAt' | 'firestoreTimestamp' | 'slug' | 'youtubeId'> = {
				type,
				title: title.trim(),
				description: description.trim(),
				publishedDate: publishedDate.trim(),
				category: finalCategory,
				tags: tagsArray,
				isActive,
				...(type === 'article' && {
					link: link.trim(),
					image: image.trim()
				}),
				...(type === 'video' && {
					youtubeUrl: youtubeUrl.trim()
				})
			};

			if (item?.id) {
				// Update existing
				await updatePressItem(item.id, pressData);
			} else {
				// Add new
				await addPressItem(pressData);
			}

			onSave();
		} catch (error) {
			console.error('❌ Error saving press item:', error);
			errorMessage = error instanceof Error ? error.message : 'Failed to save press item. Please try again.';
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
		class="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
		onclick={(e) => e.stopPropagation()}
	>
		<!-- Modal Header -->
		<div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
			<h2 class="text-2xl font-bold text-navy-custom">
				{item ? 'Edit Press Item' : 'Add Press Item'}
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
				<!-- Type Selector -->
				<div>
					<label class="block text-sm font-semibold text-gray-700 mb-3">
						Type <span class="text-red-500">*</span>
					</label>
					<div class="flex gap-4">
						<label class="flex items-center gap-2 cursor-pointer">
							<input
								type="radio"
								bind:group={type}
								value="article"
								class="w-4 h-4 text-orange-custom focus:ring-orange-custom"
								disabled={!!item}
							/>
							<span class="text-sm font-medium text-gray-700">Article</span>
						</label>
						<label class="flex items-center gap-2 cursor-pointer">
							<input
								type="radio"
								bind:group={type}
								value="video"
								class="w-4 h-4 text-orange-custom focus:ring-orange-custom"
								disabled={!!item}
							/>
							<span class="text-sm font-medium text-gray-700">Video</span>
						</label>
					</div>
					{#if item}
						<p class="text-xs text-gray-500 mt-1">Type cannot be changed after creation</p>
					{/if}
				</div>

				<!-- Title -->
				<div>
					<label for="title" class="block text-sm font-semibold text-gray-700 mb-2">
						Title <span class="text-red-500">*</span>
					</label>
					<input
						id="title"
						type="text"
						bind:value={title}
						placeholder="Enter title..."
						maxlength="200"
						class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-custom focus:border-transparent transition-all"
						class:border-red-500={errors.title}
						class:border-gray-300={!errors.title}
					/>
					{#if errors.title}
						<p class="text-red-500 text-sm mt-1">{errors.title}</p>
					{/if}
					<p class="text-xs text-gray-500 mt-1">{title.length}/200 characters</p>
				</div>

				<!-- Description -->
				<div>
					<label for="description" class="block text-sm font-semibold text-gray-700 mb-2">
						Description <span class="text-red-500">*</span>
					</label>
					<textarea
						id="description"
						bind:value={description}
						placeholder="Enter description..."
						maxlength="500"
						rows="4"
						class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-custom focus:border-transparent transition-all resize-none"
						class:border-red-500={errors.description}
						class:border-gray-300={!errors.description}
					></textarea>
					{#if errors.description}
						<p class="text-red-500 text-sm mt-1">{errors.description}</p>
					{/if}
					<p class="text-xs text-gray-500 mt-1">{description.length}/500 characters</p>
				</div>

				<!-- Published Date -->
				<div>
					<label for="publishedDate" class="block text-sm font-semibold text-gray-700 mb-2">
						Published Date <span class="text-red-500">*</span>
					</label>
					<input
						id="publishedDate"
						type="date"
						bind:value={publishedDate}
						class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-custom focus:border-transparent transition-all"
						class:border-red-500={errors.publishedDate}
						class:border-gray-300={!errors.publishedDate}
					/>
					{#if errors.publishedDate}
						<p class="text-red-500 text-sm mt-1">{errors.publishedDate}</p>
					{/if}
				</div>

				<!-- Category -->
				<div>
					<label for="category" class="block text-sm font-semibold text-gray-700 mb-2">
						Category <span class="text-red-500">*</span>
					</label>
					<select
						id="category"
						bind:value={category}
						class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-custom focus:border-transparent transition-all bg-white"
						class:border-red-500={errors.category}
						class:border-gray-300={!errors.category}
					>
						<option value="">Select a category</option>
						{#each mainCategories as cat}
							<option value={cat}>{cat}</option>
						{/each}
						<option value="Other">Other (specify below)</option>
					</select>
					{#if errors.category}
						<p class="text-red-500 text-sm mt-1">{errors.category}</p>
					{/if}
				</div>

				<!-- Custom Category (shown when Other is selected) -->
				{#if showCustomCategory}
					<div>
						<label for="customCategory" class="block text-sm font-semibold text-gray-700 mb-2">
							Specify Category <span class="text-red-500">*</span>
						</label>
						<input
							id="customCategory"
							type="text"
							bind:value={customCategory}
							placeholder="Enter custom category..."
							class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-custom focus:border-transparent transition-all"
							class:border-red-500={errors.customCategory}
							class:border-gray-300={!errors.customCategory}
						/>
						{#if errors.customCategory}
							<p class="text-red-500 text-sm mt-1">{errors.customCategory}</p>
						{/if}
					</div>
				{/if}

				<!-- Tags -->
				<div>
					<label for="tags" class="block text-sm font-semibold text-gray-700 mb-2">
						Tags <span class="text-gray-500 text-xs">(optional)</span>
					</label>
					<input
						id="tags"
						type="text"
						bind:value={tags}
						placeholder="e.g., harbhajan-singh, punjab-farmers, flood-relief"
						class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-custom focus:border-transparent transition-all"
					/>
					<p class="text-xs text-gray-500 mt-1">Separate tags with commas</p>
				</div>

				<!-- Article-specific fields -->
				{#if type === 'article'}
					<div class="border-t pt-6 mt-6">
						<h3 class="text-lg font-semibold text-gray-700 mb-4">Article Details</h3>

						<!-- Article Link -->
						<div class="mb-4">
							<label for="link" class="block text-sm font-semibold text-gray-700 mb-2">
								Article Link <span class="text-red-500">*</span>
							</label>
							<input
								id="link"
								type="url"
								bind:value={link}
								placeholder="https://example.com/article"
								class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-custom focus:border-transparent transition-all"
								class:border-red-500={errors.link}
								class:border-gray-300={!errors.link}
							/>
							{#if errors.link}
								<p class="text-red-500 text-sm mt-1">{errors.link}</p>
							{/if}
						</div>

						<!-- Image URL -->
						<div>
							<label for="image" class="block text-sm font-semibold text-gray-700 mb-2">
								Image URL <span class="text-red-500">*</span>
							</label>
							<input
								id="image"
								type="text"
								bind:value={image}
								placeholder="https://example.com/image.jpg or /PressImages/article.png"
								class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-custom focus:border-transparent transition-all"
								class:border-red-500={errors.image}
								class:border-gray-300={!errors.image}
							/>
							{#if errors.image}
								<p class="text-red-500 text-sm mt-1">{errors.image}</p>
							{/if}
							{#if image && !errors.image}
								<div class="mt-3">
									<p class="text-sm text-gray-600 mb-2">Image Preview:</p>
									<img
										src={image}
										alt="Preview"
										class="w-48 h-32 object-cover rounded-lg border border-gray-300"
										onerror={() => {
											errors.image = 'Failed to load image. Please check the URL.';
										}}
									/>
								</div>
							{/if}
						</div>
					</div>
				{/if}

				<!-- Video-specific fields -->
				{#if type === 'video'}
					<div class="border-t pt-6 mt-6">
						<h3 class="text-lg font-semibold text-gray-700 mb-4">Video Details</h3>

						<!-- YouTube URL -->
						<div>
							<label for="youtubeUrl" class="block text-sm font-semibold text-gray-700 mb-2">
								YouTube URL <span class="text-red-500">*</span>
							</label>
							<input
								id="youtubeUrl"
								type="url"
								bind:value={youtubeUrl}
								placeholder="https://www.youtube.com/watch?v=..."
								class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-custom focus:border-transparent transition-all"
								class:border-red-500={errors.youtubeUrl}
								class:border-gray-300={!errors.youtubeUrl}
							/>
							{#if errors.youtubeUrl}
								<p class="text-red-500 text-sm mt-1">{errors.youtubeUrl}</p>
							{:else}
								<p class="text-xs text-gray-500 mt-1">
									Supports: youtube.com/watch?v=..., youtu.be/..., youtube.com/embed/..., youtube.com/live/...
								</p>
							{/if}
							{#if youtubeThumbnail()}
								<div class="mt-3">
									<p class="text-sm text-gray-600 mb-2">Video Preview:</p>
									<img
										src={youtubeThumbnail()}
										alt="YouTube thumbnail"
										class="w-64 h-48 object-cover rounded-lg border border-gray-300"
									/>
								</div>
							{/if}
						</div>
					</div>
				{/if}

				<!-- Is Active -->
				<div class="border-t pt-6 mt-6">
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
						Uncheck to hide this item from the public press page
					</p>
				</div>
			</form>
		</div>

		<!-- Modal Footer -->
		<div class="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3 z-10">
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
					Save Press Item
				{/if}
			</button>
		</div>
	</div>
</div>

<style>
	.text-navy-custom {
		color: #1a237e;
	}

	.bg-orange-custom {
		background-color: #FFA617;
	}

	.bg-orange-dark {
		background-color: #e89500;
	}

	.focus\:ring-orange-custom:focus {
		--tw-ring-color: #FFA617;
	}

	.text-orange-custom {
		color: #FFA617;
	}
</style>
