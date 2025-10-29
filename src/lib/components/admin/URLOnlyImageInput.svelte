<script lang="ts">
	import { validateImageURL } from '$lib/storage';

	interface Props {
		value?: string;
		onchange: (url: string) => void;
		label?: string;
		placeholder?: string;
		required?: boolean;
	}

	let { value = $bindable(''), onchange, label = 'Image URL', placeholder = 'https://example.com/image.jpg', required = false }: Props = $props();

	let url = $state(value);
	let error = $state('');
	let previewUrl = $state(value);

	// Watch for external value changes
	$effect(() => {
		if (value !== url) {
			url = value;
			previewUrl = value;
		}
	});

	function handleUrlChange() {
		error = '';

		if (!url.trim()) {
			previewUrl = '';
			onchange('');
			return;
		}

		const validationError = validateImageURL(url.trim());
		if (validationError) {
			error = validationError;
			previewUrl = '';
			return;
		}

		previewUrl = url.trim();
		onchange(url.trim());
	}

	function clearImage() {
		url = '';
		previewUrl = '';
		error = '';
		onchange('');
	}
</script>

<div class="space-y-2">
	<label class="block text-sm font-medium text-gray-700">
		{label}
		{#if required}<span class="text-red-500">*</span>{/if}
	</label>

	<div class="space-y-3">
		<!-- URL Input -->
		<div>
			<input
				type="url"
				bind:value={url}
				onblur={handleUrlChange}
				{placeholder}
				{required}
				class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
			/>
			{#if error}
				<p class="text-red-500 text-sm mt-1">{error}</p>
			{/if}
		</div>

		<!-- Image Preview -->
		{#if previewUrl && !error}
			<div class="relative inline-block">
				<img
					src={previewUrl}
					alt="Preview"
					class="max-w-full h-auto max-h-48 rounded-lg border border-gray-200"
					onerror={() => {
						error = 'Failed to load image from this URL';
						previewUrl = '';
					}}
				/>
				<button
					type="button"
					onclick={clearImage}
					class="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
					title="Remove image"
				>
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		{/if}
	</div>
</div>

<style>
	:global(:root) {
		--navy: #1a237e;
	}
</style>
