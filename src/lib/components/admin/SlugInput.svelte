<script lang="ts">
	/**
	 * SlugInput Component
	 * Auto-generates URL-friendly slugs from titles with manual override capability
	 */

	let { title = $bindable(''), slug = $bindable(''), label = 'Slug' } = $props();

	let manuallyEdited = $state(false);

	/**
	 * Converts a string to a URL-friendly slug
	 */
	function generateSlug(text: string): string {
		return text
			.toLowerCase()
			.trim()
			.replace(/[^\w\s-]/g, '') // Remove special characters
			.replace(/\s+/g, '-') // Replace spaces with hyphens
			.replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
			.replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
	}

	/**
	 * Auto-generate slug when title changes (if not manually edited)
	 */
	$effect(() => {
		if (title && !manuallyEdited) {
			slug = generateSlug(title);
		}
	});

	/**
	 * Mark as manually edited when user types
	 */
	function handleSlugInput() {
		manuallyEdited = true;
	}

	/**
	 * Reset to auto-generation
	 */
	function resetToAuto() {
		manuallyEdited = false;
		slug = generateSlug(title);
	}
</script>

<div class="slug-input-container">
	<label for="slug" class="block text-sm font-medium text-gray-700 mb-1">
		{label}
		{#if manuallyEdited}
			<span class="text-xs text-orange-600 ml-2">(Manually edited)</span>
		{/if}
	</label>

	<div class="flex gap-2">
		<input
			type="text"
			id="slug"
			bind:value={slug}
			oninput={handleSlugInput}
			placeholder="my-blog-post-slug"
			class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
			required
		/>

		{#if manuallyEdited}
			<button
				type="button"
				onclick={resetToAuto}
				class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm whitespace-nowrap"
				title="Reset to auto-generated slug"
			>
				Reset
			</button>
		{/if}
	</div>

	<p class="text-xs text-gray-500 mt-1">
		{#if slug}
			Preview: <code class="bg-gray-100 px-2 py-1 rounded">/blog/{slug}</code>
		{:else}
			Auto-generated from title
		{/if}
	</p>
</div>

<style>
	code {
		font-family: 'Monaco', 'Courier New', monospace;
	}
</style>
