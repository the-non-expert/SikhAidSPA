<script lang="ts">
	/**
	 * ImageUploader Component
	 * Supports both Firebase Storage upload and external URL input
	 */

	import { uploadImage, validateImageFile, validateImageURL } from '$lib/storage';
	import Icon from '@iconify/svelte';

	let {
		imageUrl = $bindable(''),
		folder = 'uploads',
		label = 'Image',
		required = false
	} = $props();

	let activeTab: 'upload' | 'url' = $state('upload');
	let uploading = $state(false);
	let uploadProgress = $state(0);
	let error = $state('');
	let externalUrl = $state('');
	let fileInput: HTMLInputElement;

	/**
	 * Handle file selection and upload
	 */
	async function handleFileSelect(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];

		if (!file) return;

		// Reset error
		error = '';

		// Validate file
		const validationError = validateImageFile(file);
		if (validationError) {
			error = validationError;
			return;
		}

		// Upload to Firebase Storage
		try {
			uploading = true;
			uploadProgress = 0;

			const url = await uploadImage(file, folder, (progress) => {
				uploadProgress = progress;
			});

			imageUrl = url;
			uploading = false;
			uploadProgress = 0;
		} catch (err: any) {
			error = err.message || 'Upload failed';
			uploading = false;
			uploadProgress = 0;
		}
	}

	/**
	 * Handle external URL submission
	 */
	function handleUrlSubmit() {
		error = '';

		const validationError = validateImageURL(externalUrl);
		if (validationError) {
			error = validationError;
			return;
		}

		imageUrl = externalUrl;
	}

	/**
	 * Clear the current image
	 */
	function clearImage() {
		imageUrl = '';
		externalUrl = '';
		if (fileInput) {
			fileInput.value = '';
		}
	}

	/**
	 * Trigger file input click
	 */
	function triggerFileInput() {
		fileInput?.click();
	}
</script>

<div class="image-uploader">
	<label class="block text-sm font-medium text-gray-700 mb-2">
		{label}
		{#if required}
			<span class="text-red-500">*</span>
		{/if}
	</label>

	{#if imageUrl}
		<!-- Image Preview -->
		<div class="mb-4 relative">
			<img src={imageUrl} alt="Preview" class="w-full max-h-64 object-cover rounded-lg border" />
			<button
				type="button"
				onclick={clearImage}
				class="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
				title="Remove image"
			>
				<Icon icon="mdi:close" width="20" />
			</button>
			<p class="text-xs text-gray-500 mt-2 break-all">{imageUrl}</p>
		</div>
	{:else}
		<!-- Tab Navigation -->
		<div class="flex border-b border-gray-300 mb-4">
			<!-- Upload Tab - COMMENTED OUT (Upload functionality disabled) -->
			<!-- <button
				type="button"
				class="px-4 py-2 text-sm font-medium transition-colors {activeTab === 'upload'
					? 'border-b-2 border-navy text-navy'
					: 'text-gray-600 hover:text-gray-800'}"
				onclick={() => (activeTab = 'upload')}
			>
				<Icon icon="mdi:upload" class="inline mr-1" />
				Upload
			</button> -->
			<button
				type="button"
				class="px-4 py-2 text-sm font-medium transition-colors {activeTab === 'url'
					? 'border-b-2 border-navy text-navy'
					: 'text-gray-600 hover:text-gray-800'}"
				onclick={() => (activeTab = 'url')}
			>
				<Icon icon="mdi:link" class="inline mr-1" />
				External URL
			</button>
		</div>

		<!-- Upload Tab - COMMENTED OUT (Upload functionality disabled) -->
		<!-- {#if activeTab === 'upload'}
			<div>
				<input
					type="file"
					bind:this={fileInput}
					onchange={handleFileSelect}
					accept="image/jpeg,image/png,image/gif,image/webp"
					class="hidden"
				/>

				<button
					type="button"
					onclick={triggerFileInput}
					disabled={uploading}
					class="w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-navy hover:bg-gray-50 transition-colors flex flex-col items-center justify-center gap-2 {uploading
						? 'opacity-50 cursor-not-allowed'
						: ''}"
				>
					{#if uploading}
						<Icon icon="mdi:loading" class="animate-spin" width="32" />
						<span class="text-sm text-gray-600">Uploading... {uploadProgress}%</span>
						<div class="w-full max-w-xs bg-gray-200 rounded-full h-2 mt-2">
							<div
								class="bg-navy h-2 rounded-full transition-all"
								style="width: {uploadProgress}%"
							></div>
						</div>
					{:else}
						<Icon icon="mdi:cloud-upload" width="32" class="text-gray-400" />
						<span class="text-sm text-gray-600">Click to upload or drag and drop</span>
						<span class="text-xs text-gray-500">PNG, JPG, GIF, WebP (max 5MB)</span>
					{/if}
				</button>
			</div>
		{/if} -->

		<!-- External URL Tab -->
		{#if activeTab === 'url'}
			<div>
				<div class="flex gap-2">
					<input
						type="url"
						bind:value={externalUrl}
						placeholder="https://example.com/image.jpg"
						class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
					/>
					<button
						type="button"
						onclick={handleUrlSubmit}
						class="px-4 py-2 bg-navy text-white rounded-lg hover:bg-navy-dark transition-colors"
					>
						Add
					</button>
				</div>
				<p class="text-xs text-gray-500 mt-2">Enter the full URL of an image hosted elsewhere</p>
			</div>
		{/if}

		<!-- Error Message -->
		{#if error}
			<div class="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
				<Icon icon="mdi:alert-circle" class="text-red-500 flex-shrink-0 mt-0.5" width="20" />
				<p class="text-sm text-red-700">{error}</p>
			</div>
		{/if}
	{/if}
</div>

<style>
	:global(.image-uploader) {
		--navy: #1a237e;
		--navy-dark: #0d1660;
	}
</style>
