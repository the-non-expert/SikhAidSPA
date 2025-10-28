<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import type { Blog } from '$lib/types/blog';
	import {
		getAllBlogs,
		addBlog,
		updateBlog,
		deleteBlog
	} from '$lib/firestore';
	import ImageUploader from '$lib/components/admin/ImageUploader.svelte';
	import RichTextEditor from '$lib/components/admin/RichTextEditor.svelte';
	import SlugInput from '$lib/components/admin/SlugInput.svelte';

	// State
	let blogs = $state<Blog[]>([]);
	let loading = $state(true);
	let error = $state('');
	let success = $state('');

	// Modal state
	let showModal = $state(false);
	let modalMode: 'create' | 'edit' = $state('create');
	let editingBlog: Blog | null = $state(null);

	// Delete confirmation
	let showDeleteConfirm = $state(false);
	let blogToDelete: Blog | null = $state(null);

	// Form data
	let formData = $state({
		title: '',
		slug: '',
		excerpt: '',
		content: '',
		image: '',
		category: '',
		author: '',
		publishStatus: 'draft' as 'draft' | 'published',
		readTime: ''
	});

	// Table controls
	let searchQuery = $state('');
	let statusFilter = $state<'all' | 'draft' | 'published'>('all');
	let sortBy = $state<'createdAt' | 'title' | 'publishStatus'>('createdAt');
	let sortOrder = $state<'asc' | 'desc'>('desc');
	let currentPage = $state(1);
	let itemsPerPage = $state(10);

	// Computed values
	let filteredBlogs = $derived(() => {
		let result = [...blogs];

		// Search filter
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			result = result.filter(
				(blog) =>
					blog.title.toLowerCase().includes(query) ||
					blog.category.toLowerCase().includes(query) ||
					blog.author.toLowerCase().includes(query) ||
					blog.excerpt.toLowerCase().includes(query)
			);
		}

		// Status filter
		if (statusFilter !== 'all') {
			result = result.filter((blog) => blog.publishStatus === statusFilter);
		}

		// Sort
		result.sort((a, b) => {
			let aVal = a[sortBy];
			let bVal = b[sortBy];

			if (typeof aVal === 'string') aVal = aVal.toLowerCase();
			if (typeof bVal === 'string') bVal = bVal.toLowerCase();

			if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
			if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
			return 0;
		});

		return result;
	});

	let paginatedBlogs = $derived(() => {
		const start = (currentPage - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		return filteredBlogs().slice(start, end);
	});

	let totalPages = $derived(Math.ceil(filteredBlogs().length / itemsPerPage));

	let stats = $derived({
		total: blogs.length,
		published: blogs.filter((b) => b.publishStatus === 'published').length,
		drafts: blogs.filter((b) => b.publishStatus === 'draft').length
	});

	// Load blogs
	async function loadBlogs() {
		try {
			loading = true;
			error = '';
			blogs = await getAllBlogs();
		} catch (err: any) {
			error = err.message || 'Failed to load blogs';
			console.error(err);
		} finally {
			loading = false;
		}
	}

	// Open create modal
	function openCreateModal() {
		modalMode = 'create';
		editingBlog = null;
		resetForm();
		showModal = true;
	}

	// Open edit modal
	function openEditModal(blog: Blog) {
		modalMode = 'edit';
		editingBlog = blog;
		formData = {
			title: blog.title,
			slug: blog.slug,
			excerpt: blog.excerpt,
			content: blog.content,
			image: blog.image,
			category: blog.category,
			author: blog.author,
			publishStatus: blog.publishStatus,
			readTime: blog.readTime || ''
		};
		showModal = true;
	}

	// Reset form
	function resetForm() {
		formData = {
			title: '',
			slug: '',
			excerpt: '',
			content: '',
			image: '',
			category: '',
			author: '',
			publishStatus: 'draft',
			readTime: ''
		};
	}

	// Save blog (create or update)
	async function saveBlog(event: SubmitEvent) {
		event.preventDefault();

		try {
			error = '';
			success = '';

			if (modalMode === 'create') {
				await addBlog(formData);
				success = 'Blog created successfully!';
			} else if (editingBlog) {
				await updateBlog(editingBlog.id!, formData);
				success = 'Blog updated successfully!';
			}

			showModal = false;
			await loadBlogs();
			setTimeout(() => (success = ''), 3000);
		} catch (err: any) {
			error = err.message || 'Failed to save blog';
			console.error(err);
		}
	}

	// Delete blog
	async function confirmDelete() {
		if (!blogToDelete) return;

		try {
			error = '';
			success = '';
			await deleteBlog(blogToDelete.id!);
			success = 'Blog deleted successfully!';
			showDeleteConfirm = false;
			blogToDelete = null;
			await loadBlogs();
			setTimeout(() => (success = ''), 3000);
		} catch (err: any) {
			error = err.message || 'Failed to delete blog';
			console.error(err);
		}
	}

	// Export to CSV
	function exportToCSV() {
		const headers = ['Title', 'Slug', 'Category', 'Author', 'Status', 'Created At'];
		const rows = filteredBlogs().map((blog) => [
			blog.title,
			blog.slug,
			blog.category,
			blog.author,
			blog.publishStatus,
			blog.createdAt || ''
		]);

		const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
		const blob = new Blob([csv], { type: 'text/csv' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `blogs-${new Date().toISOString().split('T')[0]}.csv`;
		a.click();
	}

	onMount(() => {
		loadBlogs();
	});
</script>

<div class="min-h-screen bg-gray-100 p-6">
	<div class="max-w-7xl mx-auto">
		<!-- Header -->
		<div class="mb-6 flex items-center justify-between">
			<div>
				<button
					onclick={() => goto('/admin')}
					class="text-gray-600 hover:text-gray-800 mb-2 flex items-center gap-1"
				>
					<Icon icon="mdi:arrow-left" />
					Back to Dashboard
				</button>
				<h1 class="text-3xl font-bold text-gray-900">Blog Management</h1>
			</div>
		</div>

		<!-- Success/Error Messages -->
		{#if success}
			<div class="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
				<Icon icon="mdi:check-circle" class="text-green-500" width="24" />
				<p class="text-green-700">{success}</p>
			</div>
		{/if}

		{#if error}
			<div class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
				<Icon icon="mdi:alert-circle" class="text-red-500" width="24" />
				<p class="text-red-700">{error}</p>
			</div>
		{/if}

		<!-- Statistics Cards -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
			<div class="bg-white p-6 rounded-lg shadow">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm text-gray-600">Total Blogs</p>
						<p class="text-3xl font-bold text-gray-900">{stats.total}</p>
					</div>
					<Icon icon="mdi:post" style="color: var(--navy);" width="48" />
				</div>
			</div>

			<div class="bg-white p-6 rounded-lg shadow">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm text-gray-600">Published</p>
						<p class="text-3xl font-bold text-green-600">{stats.published}</p>
					</div>
					<Icon icon="mdi:check-circle" class="text-green-600" width="48" />
				</div>
			</div>

			<div class="bg-white p-6 rounded-lg shadow">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm text-gray-600">Drafts</p>
						<p class="text-3xl font-bold text-orange-600">{stats.drafts}</p>
					</div>
					<Icon icon="mdi:file-document-edit" class="text-orange-600" width="48" />
				</div>
			</div>
		</div>

		<!-- Action Bar -->
		<div class="bg-white p-4 rounded-lg shadow mb-6">
			<div class="flex flex-wrap gap-4 items-center justify-between">
				<div class="flex gap-2">
					<button
						onclick={openCreateModal}
						style="background-color: var(--navy);"
						class="px-4 py-2 text-white rounded-lg transition-colors flex items-center gap-2"
						onmouseover={(e) => (e.currentTarget.style.backgroundColor = 'var(--navy-dark)')}
						onmouseout={(e) => (e.currentTarget.style.backgroundColor = 'var(--navy)')}
					>
						<Icon icon="mdi:plus" width="20" />
						New Blog
					</button>
					<button
						onclick={loadBlogs}
						class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
					>
						<Icon icon="mdi:refresh" width="20" />
					</button>
					<button
						onclick={exportToCSV}
						class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
					>
						<Icon icon="mdi:download" width="20" />
						Export CSV
					</button>
				</div>

				<div class="flex gap-2 flex-1 max-w-md">
					<input
						type="text"
						bind:value={searchQuery}
						placeholder="Search blogs..."
						class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
					/>
				</div>
			</div>

			<div class="flex gap-4 mt-4 flex-wrap">
				<select
					bind:value={statusFilter}
					class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
				>
					<option value="all">All Status</option>
					<option value="published">Published</option>
					<option value="draft">Drafts</option>
				</select>

				<select
					bind:value={itemsPerPage}
					class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
				>
					<option value={10}>10 per page</option>
					<option value={25}>25 per page</option>
					<option value={50}>50 per page</option>
					<option value={100}>100 per page</option>
				</select>
			</div>
		</div>

		<!-- Table -->
		<div class="bg-white rounded-lg shadow overflow-hidden">
			{#if loading}
				<div class="p-12 text-center">
					<Icon icon="mdi:loading" class="animate-spin mx-auto mb-4" width="48" />
					<p class="text-gray-600">Loading blogs...</p>
				</div>
			{:else if paginatedBlogs().length === 0}
				<div class="p-12 text-center">
					<Icon icon="mdi:post-outline" class="mx-auto mb-4 text-gray-400" width="64" />
					<p class="text-gray-600 mb-4">No blogs found</p>
					<button
						onclick={openCreateModal}
						style="background-color: var(--navy);"
						class="px-4 py-2 text-white rounded-lg transition-colors"
						onmouseover={(e) => (e.currentTarget.style.backgroundColor = 'var(--navy-dark)')}
						onmouseout={(e) => (e.currentTarget.style.backgroundColor = 'var(--navy)')}
					>
						Create Your First Blog
					</button>
				</div>
			{:else}
				<div class="overflow-x-auto">
					<table class="w-full">
						<thead class="bg-gray-50 border-b border-gray-200">
							<tr>
								<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Title
								</th>
								<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Category
								</th>
								<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Author
								</th>
								<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Status
								</th>
								<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Created
								</th>
								<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Actions
								</th>
							</tr>
						</thead>
						<tbody class="bg-white divide-y divide-gray-200">
							{#each paginatedBlogs() as blog (blog.id)}
								<tr class="hover:bg-gray-50">
									<td class="px-6 py-4">
										<div class="flex items-center gap-3">
											{#if blog.image}
												<img
													src={blog.image}
													alt={blog.title}
													class="w-12 h-12 object-cover rounded"
												/>
											{/if}
											<div>
												<p class="font-medium text-gray-900">{blog.title}</p>
												<p class="text-sm text-gray-500">{blog.slug}</p>
											</div>
										</div>
									</td>
									<td class="px-6 py-4 text-sm text-gray-900">{blog.category}</td>
									<td class="px-6 py-4 text-sm text-gray-900">{blog.author}</td>
									<td class="px-6 py-4">
										<span
											class="px-2 py-1 text-xs font-semibold rounded-full {blog.publishStatus ===
											'published'
												? 'bg-green-100 text-green-800'
												: 'bg-yellow-100 text-yellow-800'}"
										>
											{blog.publishStatus}
										</span>
									</td>
									<td class="px-6 py-4 text-sm text-gray-500">
										{blog.createdAt
											? new Date(blog.createdAt).toLocaleDateString()
											: 'N/A'}
									</td>
									<td class="px-6 py-4">
										<div class="flex gap-2">
											<button
												onclick={() => openEditModal(blog)}
												class="text-blue-600 hover:text-blue-800"
												title="Edit"
											>
												<Icon icon="mdi:pencil" width="20" />
											</button>
											<button
												onclick={() => {
													blogToDelete = blog;
													showDeleteConfirm = true;
												}}
												class="text-red-600 hover:text-red-800"
												title="Delete"
											>
												<Icon icon="mdi:delete" width="20" />
											</button>
										</div>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>

				<!-- Pagination -->
				{#if totalPages > 1}
					<div class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
						<p class="text-sm text-gray-600">
							Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(
								currentPage * itemsPerPage,
								filteredBlogs().length
							)} of {filteredBlogs().length} results
						</p>
						<div class="flex gap-2">
							<button
								onclick={() => (currentPage = Math.max(1, currentPage - 1))}
								disabled={currentPage === 1}
								class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								Previous
							</button>
							{#each Array.from({ length: totalPages }, (_, i) => i + 1) as page}
								{#if page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)}
									<button
										onclick={() => (currentPage = page)}
										style={currentPage === page ? 'background-color: var(--navy); color: white;' : ''}
										class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
									>
										{page}
									</button>
								{:else if page === currentPage - 2 || page === currentPage + 2}
									<span class="px-2">...</span>
								{/if}
							{/each}
							<button
								onclick={() => (currentPage = Math.min(totalPages, currentPage + 1))}
								disabled={currentPage === totalPages}
								class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								Next
							</button>
						</div>
					</div>
				{/if}
			{/if}
		</div>
	</div>
</div>

<!-- Create/Edit Modal -->
{#if showModal}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 overflow-y-auto">
		<div class="bg-white rounded-lg shadow-xl max-w-4xl w-full my-8">
			<div class="p-6 border-b border-gray-200 flex items-center justify-between top-0 bg-white rounded-t-lg">
				<h2 class="text-2xl font-bold text-gray-900">
					{modalMode === 'create' ? 'Create New Blog' : 'Edit Blog'}
				</h2>
				<button
					onclick={() => (showModal = false)}
					class="text-gray-500 hover:text-gray-700"
				>
					<Icon icon="mdi:close" width="24" />
				</button>
			</div>

			<form onsubmit={saveBlog} class="p-6 space-y-6">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<!-- Title -->
					<div class="md:col-span-2">
						<label for="title" class="block text-sm font-medium text-gray-700 mb-1">
							Title <span class="text-red-500">*</span>
						</label>
						<input
							type="text"
							id="title"
							bind:value={formData.title}
							required
							class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
						/>
					</div>

					<!-- Slug -->
					<div class="md:col-span-2">
						<SlugInput bind:title={formData.title} bind:slug={formData.slug} />
					</div>

					<!-- Category -->
					<div>
						<label for="category" class="block text-sm font-medium text-gray-700 mb-1">
							Category <span class="text-red-500">*</span>
						</label>
						<input
							type="text"
							id="category"
							bind:value={formData.category}
							required
							placeholder="e.g., Education, Healthcare, Emergency Relief"
							class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
						/>
					</div>

					<!-- Author -->
					<div>
						<label for="author" class="block text-sm font-medium text-gray-700 mb-1">
							Author <span class="text-red-500">*</span>
						</label>
						<input
							type="text"
							id="author"
							bind:value={formData.author}
							required
							class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
						/>
					</div>

					<!-- Read Time -->
					<div>
						<label for="readTime" class="block text-sm font-medium text-gray-700 mb-1">
							Read Time
						</label>
						<input
							type="text"
							id="readTime"
							bind:value={formData.readTime}
							placeholder="e.g., 5 min read"
							class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
						/>
					</div>

					<!-- Publish Status -->
					<div>
						<label for="publishStatus" class="block text-sm font-medium text-gray-700 mb-1">
							Status <span class="text-red-500">*</span>
						</label>
						<select
							id="publishStatus"
							bind:value={formData.publishStatus}
							class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
						>
							<option value="draft">Draft</option>
							<option value="published">Published</option>
						</select>
					</div>

					<!-- Excerpt -->
					<div class="md:col-span-2">
						<label for="excerpt" class="block text-sm font-medium text-gray-700 mb-1">
							Excerpt <span class="text-red-500">*</span>
						</label>
						<textarea
							id="excerpt"
							bind:value={formData.excerpt}
							required
							rows="3"
							placeholder="Short description of the blog post"
							class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
						></textarea>
					</div>

					<!-- Featured Image -->
					<div class="md:col-span-2">
						<ImageUploader bind:imageUrl={formData.image} folder="blogs" label="Featured Image" required={true} />
					</div>

					<!-- Content -->
					<div class="md:col-span-2">
						<RichTextEditor bind:content={formData.content} label="Content" />
					</div>
				</div>

				<!-- Actions -->
				<div class="flex gap-3 justify-end pt-4 border-t border-gray-200">
					<button
						type="button"
						onclick={() => (showModal = false)}
						class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
					>
						Cancel
					</button>
					<button
						type="submit"
						style="background-color: var(--navy);"
						class="px-6 py-2 text-white rounded-lg transition-colors"
						onmouseover={(e) => (e.currentTarget.style.backgroundColor = 'var(--navy-dark)')}
						onmouseout={(e) => (e.currentTarget.style.backgroundColor = 'var(--navy)')}
					>
						{modalMode === 'create' ? 'Create Blog' : 'Update Blog'}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<!-- Delete Confirmation Modal -->
{#if showDeleteConfirm && blogToDelete}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
		<div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
			<div class="flex items-center gap-3 mb-4">
				<Icon icon="mdi:alert-circle" class="text-red-500" width="32" />
				<h2 class="text-xl font-bold text-gray-900">Confirm Delete</h2>
			</div>

			<p class="text-gray-600 mb-6">
				Are you sure you want to delete "<strong>{blogToDelete.title}</strong>"? This action cannot
				be undone.
			</p>

			<div class="flex gap-3 justify-end">
				<button
					onclick={() => {
						showDeleteConfirm = false;
						blogToDelete = null;
					}}
					class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
				>
					Cancel
				</button>
				<button
					onclick={confirmDelete}
					class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
				>
					Delete Blog
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	:global(:root) {
		--navy: #1a237e;
		--navy-dark: #0d1660;
	}
</style>
