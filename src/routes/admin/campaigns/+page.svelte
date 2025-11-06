<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import {
		getAllCampaigns,
		addCampaign,
		updateCampaign,
		deleteCampaign
	} from '$lib/firestore';
	import type { Campaign, ImpactStat, HowItWorksStep, GalleryImage } from '$lib/types/campaign';
	import RichTextEditor from '$lib/components/admin/RichTextEditor.svelte';
	import SlugInput from '$lib/components/admin/SlugInput.svelte';

	onMount(() => {
		loadCampaigns();
	});

	// Campaign data
	let campaigns = $state<Campaign[]>([]);
	let loading = $state(true);
	let error = $state('');

	// Modal state
	let showModal = $state(false);
	let editingCampaign = $state<Campaign | null>(null);
	let saving = $state(false);

	// Form state
	let formData = $state<Campaign>({
		slug: '',
		title: '',
		subtitle: '',
		shortDescription: '',
		fullDescription: '',
		image: '/sikhaidLogo.png',
		category: '',
		status: 'ongoing',
		publishStatus: 'draft',
		impactStats: [],
		howItWorks: [],
		gallery: []
	});

	// Pagination
	let currentPage = $state(1);
	let itemsPerPage = $state(10);

	// Search & Filter
	let searchQuery = $state('');
	let filterStatus = $state<'all' | 'ongoing' | 'completed' | 'seasonal'>('all');
	let filterPublishStatus = $state<'all' | 'draft' | 'published'>('all');
	let sortBy = $state<'title' | 'createdAt' | 'updatedAt'>('createdAt');
	let sortOrder = $state<'asc' | 'desc'>('desc');

	// Computed values
	let filteredCampaigns = $derived.by(() => {
		let result = campaigns;

		// Search
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			result = result.filter(
				(c) =>
					c.title.toLowerCase().includes(query) ||
					c.subtitle.toLowerCase().includes(query) ||
					c.category.toLowerCase().includes(query)
			);
		}

		// Filter by status
		if (filterStatus !== 'all') {
			result = result.filter((c) => c.status === filterStatus);
		}

		// Filter by publish status
		if (filterPublishStatus !== 'all') {
			result = result.filter((c) => c.publishStatus === filterPublishStatus);
		}

		// Sort (create a new sorted array instead of mutating)
		const sorted = [...result].sort((a, b) => {
			let aVal: string | number = '';
			let bVal: string | number = '';

			if (sortBy === 'title') {
				aVal = a.title.toLowerCase();
				bVal = b.title.toLowerCase();
			} else if (sortBy === 'createdAt') {
				aVal = new Date(a.createdAt || '').getTime();
				bVal = new Date(b.createdAt || '').getTime();
			} else if (sortBy === 'updatedAt') {
				aVal = new Date(a.updatedAt || '').getTime();
				bVal = new Date(b.updatedAt || '').getTime();
			}

			if (sortOrder === 'asc') {
				return aVal > bVal ? 1 : -1;
			} else {
				return aVal < bVal ? 1 : -1;
			}
		});

		return sorted;
	});

	let paginatedCampaigns = $derived.by(() => {
		const start = (currentPage - 1) * itemsPerPage;
		return filteredCampaigns.slice(start, start + itemsPerPage);
	});

	let totalPages = $derived(Math.ceil(filteredCampaigns.length / itemsPerPage));

	let stats = $derived({
		total: campaigns.length,
		published: campaigns.filter((c) => c.publishStatus === 'published').length,
		drafts: campaigns.filter((c) => c.publishStatus === 'draft').length,
		ongoing: campaigns.filter((c) => c.status === 'ongoing').length
	});

	// Load campaigns
	async function loadCampaigns() {
		try {
			loading = true;
			error = '';
			campaigns = await getAllCampaigns();
		} catch (e) {
			error = 'Failed to load campaigns: ' + (e as Error).message;
			console.error('❌ Error loading campaigns:', e);
		} finally {
			loading = false;
		}
	}

	// Open modal
	function openCreateModal() {
		editingCampaign = null;
		formData = {
			slug: '',
			title: '',
			subtitle: '',
			shortDescription: '',
			fullDescription: '',
			image: '/sikhaidLogo.png',
			category: '',
			status: 'ongoing',
			publishStatus: 'draft',
			impactStats: [],
			howItWorks: [],
			gallery: []
		};
		showModal = true;
	}

	function openEditModal(campaign: Campaign) {
		editingCampaign = campaign;
		formData = { ...campaign };
		showModal = true;
	}

	function closeModal() {
		showModal = false;
		editingCampaign = null;
	}

	// Save campaign
	async function saveCampaign(event: SubmitEvent) {
		event.preventDefault();

		try {
			saving = true;
			error = '';

			if (editingCampaign) {
				await updateCampaign(editingCampaign.id!, formData);
			} else {
				await addCampaign(formData);
			}

			await loadCampaigns();
			closeModal();
		} catch (e) {
			error = 'Failed to save campaign: ' + (e as Error).message;
			console.error('Error saving campaign:', e);
		} finally {
			saving = false;
		}
	}

	// Delete campaign
	async function handleDelete(campaign: Campaign) {
		if (!confirm(`Are you sure you want to delete "${campaign.title}"?`)) {
			return;
		}

		try {
			error = '';
			await deleteCampaign(campaign.id!);
			await loadCampaigns();
		} catch (e) {
			error = 'Failed to delete campaign: ' + (e as Error).message;
			console.error('Error deleting campaign:', e);
		}
	}

	// Impact Stats management
	function addImpactStat() {
		formData.impactStats = [...formData.impactStats, { label: '', value: '', icon: '' }];
	}

	function removeImpactStat(index: number) {
		formData.impactStats = formData.impactStats.filter((_, i) => i !== index);
	}

	// How It Works management
	function addHowItWorksStep() {
		const nextStep = formData.howItWorks.length + 1;
		formData.howItWorks = [...formData.howItWorks, { step: nextStep, title: '', description: '' }];
	}

	function removeHowItWorksStep(index: number) {
		formData.howItWorks = formData.howItWorks.filter((_, i) => i !== index);
		// Renumber steps
		formData.howItWorks = formData.howItWorks.map((step, i) => ({ ...step, step: i + 1 }));
	}

	// Gallery management
	function addGalleryImage() {
		formData.gallery = [...formData.gallery, { src: '', alt: '' }];
	}

	function removeGalleryImage(index: number) {
		formData.gallery = formData.gallery.filter((_, i) => i !== index);
	}

	// Export to CSV
	function exportToCSV() {
		const headers = ['ID', 'Title', 'Category', 'Status', 'Publish Status', 'Created At', 'Updated At'];
		const rows = filteredCampaigns.map((c) => [
			c.id || '',
			c.title,
			c.category,
			c.status,
			c.publishStatus,
			c.createdAt || '',
			c.updatedAt || ''
		]);

		const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');
		const blob = new Blob([csvContent], { type: 'text/csv' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `campaigns-${new Date().toISOString()}.csv`;
		a.click();
		URL.revokeObjectURL(url);
	}

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>Campaign Management - SikhAid Admin</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 p-8">
		<div class="max-w-7xl mx-auto">
			<!-- Header -->
			<div class="mb-8">
				<button
					onclick={() => goto('/admin')}
					class="text-gray-600 hover:text-gray-800 mb-4 flex items-center gap-1"
				>
					<Icon icon="mdi:arrow-left" />
					Back to Dashboard
				</button>
				<h1 class="text-3xl font-bold text-gray-900 mb-2">Campaign Management</h1>
				<p class="text-gray-600">Create and manage disaster relief campaigns</p>
			</div>

			<!-- Error Display -->
			{#if error}
				<div class="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
					{error}
				</div>
			{/if}

			<!-- Stats Cards -->
			<div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
				<div class="bg-white p-6 rounded-lg shadow-md">
					<p class="text-gray-600 text-sm font-medium">Total Campaigns</p>
					<p class="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
				</div>
				<div class="bg-white p-6 rounded-lg shadow-md">
					<p class="text-gray-600 text-sm font-medium">Published</p>
					<p class="text-3xl font-bold text-green-600 mt-2">{stats.published}</p>
				</div>
				<div class="bg-white p-6 rounded-lg shadow-md">
					<p class="text-gray-600 text-sm font-medium">Drafts</p>
					<p class="text-3xl font-bold text-yellow-600 mt-2">{stats.drafts}</p>
				</div>
				<div class="bg-white p-6 rounded-lg shadow-md">
					<p class="text-gray-600 text-sm font-medium">Ongoing</p>
					<p class="text-3xl font-bold text-blue-600 mt-2">{stats.ongoing}</p>
				</div>
			</div>

			<!-- Actions Bar -->
			<div class="bg-white p-6 rounded-lg shadow-md mb-6">
				<div class="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
					<!-- Search -->
					<div class="flex-1 max-w-md">
						<input
							type="text"
							bind:value={searchQuery}
							placeholder="Search campaigns..."
							class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
						/>
					</div>

					<!-- Filters & Actions -->
					<div class="flex flex-wrap gap-3">
						<select
							bind:value={filterStatus}
							class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy"
						>
							<option value="all">All Status</option>
							<option value="ongoing">Ongoing</option>
							<option value="completed">Completed</option>
							<option value="seasonal">Seasonal</option>
						</select>

						<select
							bind:value={filterPublishStatus}
							class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy"
						>
							<option value="all">All Publish Status</option>
							<option value="published">Published</option>
							<option value="draft">Draft</option>
						</select>

						<select
							bind:value={sortBy}
							class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy"
						>
							<option value="createdAt">Created Date</option>
							<option value="updatedAt">Updated Date</option>
							<option value="title">Title</option>
						</select>

						<button
							onclick={() => (sortOrder = sortOrder === 'asc' ? 'desc' : 'asc')}
							class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
							title={sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
						>
							{sortOrder === 'asc' ? '↑' : '↓'}
						</button>

						<button
							onclick={exportToCSV}
							class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
						>
							Export CSV
						</button>

						<button
							onclick={openCreateModal}
							style="background-color: var(--navy);"
							class="px-6 py-2 text-white rounded-lg font-semibold"
							onmouseover={(e) => (e.currentTarget.style.backgroundColor = 'var(--navy-dark)')}
							onmouseout={(e) => (e.currentTarget.style.backgroundColor = 'var(--navy)')}
						>
							+ New Campaign
						</button>
					</div>
				</div>
			</div>

			<!-- Campaigns Table -->
			<div class="bg-white rounded-lg shadow-md overflow-hidden">
				{#if loading}
					<div class="p-12 text-center">
						<div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-navy mb-4"></div>
						<p class="text-gray-600">Loading campaigns...</p>
					</div>
				{:else if error}
					<div class="p-12 text-center">
						<p class="text-red-600 font-semibold mb-2">Error loading campaigns</p>
						<p class="text-gray-600 text-sm mb-4">{error}</p>
						<button
							onclick={loadCampaigns}
							style="background-color: var(--navy);"
							class="px-4 py-2 text-white rounded-lg"
							onmouseover={(e) => (e.currentTarget.style.backgroundColor = 'var(--navy-dark)')}
							onmouseout={(e) => (e.currentTarget.style.backgroundColor = 'var(--navy)')}
						>
							Retry
						</button>
					</div>
				{:else if paginatedCampaigns.length === 0}
					<div class="p-12 text-center">
						<p class="text-gray-600">No campaigns found.</p>
					</div>
				{:else}
					<div class="overflow-x-auto">
						<table class="min-w-full divide-y divide-gray-200">
							<thead class="bg-gray-50">
								<tr>
									<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Title
									</th>
									<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Category
									</th>
									<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Status
									</th>
									<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Publish Status
									</th>
									<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Updated
									</th>
									<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Actions
									</th>
								</tr>
							</thead>
							<tbody class="bg-white divide-y divide-gray-200">
								{#each paginatedCampaigns as campaign}
									<tr class="hover:bg-gray-50">
										<td class="px-6 py-4">
											<div class="flex items-center">
												<img
													src={campaign.image}
													alt={campaign.title}
													class="w-12 h-12 rounded object-cover mr-3"
												/>
												<div>
													<div class="text-sm font-medium text-gray-900">{campaign.title}</div>
													<div class="text-sm text-gray-500">{campaign.subtitle}</div>
												</div>
											</div>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<span class="text-sm text-gray-900">{campaign.category}</span>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<span
												class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
												{campaign.status === 'ongoing'
													? 'bg-blue-100 text-blue-800'
													: campaign.status === 'completed'
														? 'bg-green-100 text-green-800'
														: 'bg-purple-100 text-purple-800'}"
											>
												{campaign.status}
											</span>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<span
												class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
												{campaign.publishStatus === 'published'
													? 'bg-green-100 text-green-800'
													: 'bg-yellow-100 text-yellow-800'}"
											>
												{campaign.publishStatus}
											</span>
										</td>
										<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{campaign.updatedAt ? formatDate(campaign.updatedAt) : 'N/A'}
										</td>
										<td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
											<button
												onclick={() => openEditModal(campaign)}
												class="text-indigo-600 hover:text-indigo-900"
											>
												Edit
											</button>
											<button
												onclick={() => handleDelete(campaign)}
												class="text-red-600 hover:text-red-900"
											>
												Delete
											</button>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>

					<!-- Pagination -->
					{#if totalPages > 1}
						<div class="bg-gray-50 px-6 py-4 border-t border-gray-200">
							<div class="flex items-center justify-between">
								<div class="text-sm text-gray-700">
									Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(
										currentPage * itemsPerPage,
										filteredCampaigns.length
									)} of {filteredCampaigns.length} campaigns
								</div>
								<div class="flex gap-2">
									<button
										onclick={() => (currentPage = Math.max(1, currentPage - 1))}
										disabled={currentPage === 1}
										class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
									>
										Previous
									</button>
									<button
										onclick={() => (currentPage = Math.min(totalPages, currentPage + 1))}
										disabled={currentPage === totalPages}
										class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
									>
										Next
									</button>
								</div>
							</div>
						</div>
					{/if}
				{/if}
			</div>

		<!-- Create/Edit Modal -->
		{#if showModal}
			<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
			<div class="bg-white rounded-lg shadow-xl max-w-4xl w-full my-8">
				<form onsubmit={saveCampaign}>
					<!-- Modal Header -->
					<div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
						<h2 class="text-2xl font-bold text-gray-900">
							{editingCampaign ? 'Edit Campaign' : 'Create New Campaign'}
						</h2>
						<button
							type="button"
							onclick={closeModal}
							class="text-gray-400 hover:text-gray-600"
						>
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>

					<!-- Modal Body -->
					<div class="px-6 py-6 max-h-[70vh] overflow-y-auto space-y-6">
						<!-- Basic Information -->
						<div class="space-y-4">
							<h3 class="text-lg font-semibold text-gray-900">Basic Information</h3>

							<div>
								<label class="block text-sm font-medium text-gray-700 mb-2">
									Title <span class="text-red-500">*</span>
								</label>
								<input
									type="text"
									bind:value={formData.title}
									required
									class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
								/>
							</div>

							<SlugInput bind:title={formData.title} bind:slug={formData.slug} />

							<div>
								<label class="block text-sm font-medium text-gray-700 mb-2">
									Subtitle <span class="text-red-500">*</span>
								</label>
								<input
									type="text"
									bind:value={formData.subtitle}
									required
									class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
								/>
							</div>

							<div>
								<label class="block text-sm font-medium text-gray-700 mb-2">
									Short Description <span class="text-red-500">*</span>
								</label>
								<textarea
									bind:value={formData.shortDescription}
									required
									rows="3"
									class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
								></textarea>
							</div>

							<div>
								<label class="block text-sm font-medium text-gray-700 mb-2">
									Category <span class="text-red-500">*</span>
								</label>
								<input
									type="text"
									bind:value={formData.category}
									required
									placeholder="e.g., Flood Relief, Disaster Response"
									class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
								/>
							</div>

							<div class="grid grid-cols-2 gap-4">
								<div>
									<label class="block text-sm font-medium text-gray-700 mb-2">
										Status <span class="text-red-500">*</span>
									</label>
									<select
										bind:value={formData.status}
										required
										class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
									>
										<option value="ongoing">Ongoing</option>
										<option value="completed">Completed</option>
										<option value="seasonal">Seasonal</option>
									</select>
								</div>

								<div>
									<label class="block text-sm font-medium text-gray-700 mb-2">
										Publish Status <span class="text-red-500">*</span>
									</label>
									<select
										bind:value={formData.publishStatus}
										required
										class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent"
									>
										<option value="draft">Draft</option>
										<option value="published">Published</option>
									</select>
								</div>
							</div>

						<!-- Main Campaign Image with Preview -->
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-2">
								Main Campaign Image
							</label>
							<div class="p-3 border border-gray-200 rounded-lg">
								<!-- Content: Preview + Input -->
								<div class="flex gap-3">
									<!-- Image Preview (Left) -->
									<div class="flex-shrink-0">
										{#if formData.image && formData.image.trim()}
											<div class="relative w-20 h-20">
												<img
													src={formData.image}
													alt="Main campaign preview"
													class="w-20 h-20 object-cover rounded border border-gray-300"
													onerror={(e) => {
														e.currentTarget.style.display = 'none';
														e.currentTarget.nextElementSibling.style.display = 'flex';
													}}
												/>
												<div class="w-20 h-20 bg-red-50 rounded border border-red-300 hidden items-center justify-center absolute top-0 left-0">
													<Icon icon="mdi:image-broken" class="text-red-400" width="24" />
												</div>
											</div>
										{:else}
											<div class="w-20 h-20 bg-gray-50 rounded border border-gray-200 flex items-center justify-center">
												<Icon icon="mdi:image-outline" class="text-gray-300" width="24" />
											</div>
										{/if}
									</div>

									<!-- Input (Right) -->
									<div class="flex-1">
										<input
											type="url"
											bind:value={formData.image}
											placeholder="Image URL (leave empty for default SikhAid logo)"
											class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-navy focus:border-transparent"
										/>
										<p class="text-xs text-gray-500 mt-1">
											Default: SikhAid logo will be used if left empty
										</p>
									</div>
								</div>
							</div>
						</div>

						<!-- Full Description -->
						<div class="space-y-4">
							<h3 class="text-lg font-semibold text-gray-900">Full Description</h3>
							<RichTextEditor
								bind:content={formData.fullDescription}
								placeholder="Write the full campaign description..."
							/>
						</div>

						<!-- Impact Stats -->
						<div class="space-y-4">
							<div class="flex items-center justify-between">
								<h3 class="text-lg font-semibold text-gray-900">Impact Statistics</h3>
								<button
									type="button"
									onclick={addImpactStat}
									class="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
								>
									+ Add Stat
								</button>
							</div>

							{#each formData.impactStats as stat, index}
								<div class="p-4 border border-gray-200 rounded-lg space-y-3">
									<div class="flex items-center justify-between">
										<span class="text-sm font-medium text-gray-700">Stat {index + 1}</span>
										<button
											type="button"
											onclick={() => removeImpactStat(index)}
											class="text-red-600 hover:text-red-800 text-sm"
										>
											Remove
										</button>
									</div>
									<div class="grid grid-cols-3 gap-3">
										<input
											type="text"
											bind:value={stat.label}
											placeholder="Label (e.g., People Helped)"
											class="px-3 py-2 border border-gray-300 rounded-lg text-sm"
										/>
										<input
											type="text"
											bind:value={stat.value}
											placeholder="Value (e.g., 50,000+)"
											class="px-3 py-2 border border-gray-300 rounded-lg text-sm"
										/>
										<input
											type="text"
											bind:value={stat.icon}
											placeholder="Icon (emoji or class)"
											class="px-3 py-2 border border-gray-300 rounded-lg text-sm"
										/>
									</div>
								</div>
							{/each}
						</div>

						<!-- How It Works -->
						<div class="space-y-4">
							<div class="flex items-center justify-between">
								<h3 class="text-lg font-semibold text-gray-900">How It Works</h3>
								<button
									type="button"
									onclick={addHowItWorksStep}
									class="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
								>
									+ Add Step
								</button>
							</div>

							{#each formData.howItWorks as step, index}
								<div class="p-4 border border-gray-200 rounded-lg space-y-3">
									<div class="flex items-center justify-between">
										<span class="text-sm font-medium text-gray-700">Step {step.step}</span>
										<button
											type="button"
											onclick={() => removeHowItWorksStep(index)}
											class="text-red-600 hover:text-red-800 text-sm"
										>
											Remove
										</button>
									</div>
									<div class="space-y-2">
										<input
											type="text"
											bind:value={step.title}
											placeholder="Step Title"
											class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
										/>
										<textarea
											bind:value={step.description}
											placeholder="Step Description"
											rows="2"
											class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
										></textarea>
									</div>
								</div>
							{/each}
						</div>

						<!-- Gallery -->
						<div class="space-y-3">
							<div class="flex items-center justify-between">
								<h3 class="text-lg font-semibold text-gray-900">Gallery Images</h3>
								<button
									type="button"
									onclick={addGalleryImage}
									class="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
								>
									+ Add Image
								</button>
							</div>

							{#each formData.gallery as image, index}
								<div class="p-3 border border-gray-200 rounded-lg">
									<!-- Header -->
									<div class="flex items-center justify-between mb-2">
										<span class="text-xs font-medium text-gray-600">Image {index + 1}</span>
										<button
											type="button"
											onclick={() => removeGalleryImage(index)}
											class="text-red-600 hover:text-red-800 text-xs font-medium"
										>
											Remove
										</button>
									</div>

									<!-- Content: Preview + Inputs -->
									<div class="flex gap-3">
										<!-- Image Preview (Left) -->
										<div class="flex-shrink-0">
											{#if image.src && image.src.trim()}
												<div class="relative w-20 h-20">
													<img
														src={image.src}
														alt={image.alt || 'Preview'}
														class="w-20 h-20 object-cover rounded border border-gray-300"
														onerror={(e) => {
															e.currentTarget.style.display = 'none';
															e.currentTarget.nextElementSibling.style.display = 'flex';
														}}
													/>
													<div class="w-20 h-20 bg-red-50 rounded border border-red-300 hidden items-center justify-center absolute top-0 left-0">
														<Icon icon="mdi:image-broken" class="text-red-400" width="24" />
													</div>
												</div>
											{:else}
												<div class="w-20 h-20 bg-gray-50 rounded border border-gray-200 flex items-center justify-center">
													<Icon icon="mdi:image-outline" class="text-gray-300" width="24" />
												</div>
											{/if}
										</div>

										<!-- Inputs (Right) -->
										<div class="flex-1 space-y-2">
											<input
												type="url"
												bind:value={image.src}
												placeholder="Image URL"
												class="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											/>
											<input
												type="text"
												bind:value={image.alt}
												placeholder="Image Description (alt text)"
												class="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
											/>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>

					<!-- Modal Footer -->
					<div class="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
						<button
							type="button"
							onclick={closeModal}
							class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
							disabled={saving}
						>
							Cancel
						</button>
						<button
							type="submit"
							style="background-color: var(--navy);"
							class="px-6 py-2 text-white rounded-lg font-semibold disabled:opacity-50"
							onmouseover={(e) => !saving && (e.currentTarget.style.backgroundColor = 'var(--navy-dark)')}
							onmouseout={(e) => (e.currentTarget.style.backgroundColor = 'var(--navy)')}
							disabled={saving}
						>
							{saving ? 'Saving...' : editingCampaign ? 'Update Campaign' : 'Create Campaign'}
						</button>
					</div>
				</form>
			</div>
		</div>
		{/if}
	</div>
</div>

<style>
	:global(:root) {
		--navy: #1a237e;
		--navy-dark: #0d1660;
	}
</style>
