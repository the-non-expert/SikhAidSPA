<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { getDonations, type Donation } from '$lib/firestore';

	// Data store
	let donations: Donation[] = [];

	// UI state
	let searchQuery = '';
	let isLoading = true;
	let errorMessage = '';

	// Sorting state
	type SortField = 'date' | 'amount' | 'name';
	let sortField: SortField = 'date';
	let sortDirection: 'asc' | 'desc' = 'desc';

	// Pagination state
	let itemsPerPage = 25;
	let currentPage = 1;

	// PAN visibility state (track which PANs are revealed)
	let revealedPANs: Record<string, boolean> = {};

	// Apply search filter
	function applyFilters(donations: Donation[]) {
		let filtered = donations;

		// Search filter
		if (searchQuery) {
			filtered = filtered.filter((donation) =>
				Object.values(donation)
					.join(' ')
					.toLowerCase()
					.includes(searchQuery.toLowerCase())
			);
		}

		return filtered;
	}

	// Sort donations
	function sortDonations(donations: Donation[]) {
		return [...donations].sort((a, b) => {
			let compareA: any;
			let compareB: any;

			if (sortField === 'date') {
				compareA = new Date(a.timestamp).getTime();
				compareB = new Date(b.timestamp).getTime();
			} else if (sortField === 'amount') {
				compareA = a.amount;
				compareB = b.amount;
			} else if (sortField === 'name') {
				compareA = (a.donorName || '').toLowerCase();
				compareB = (b.donorName || '').toLowerCase();
			}

			if (sortDirection === 'asc') {
				return compareA > compareB ? 1 : -1;
			} else {
				return compareA < compareB ? 1 : -1;
			}
		});
	}

	// Paginate donations
	function paginateDonations(donations: Donation[]) {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return donations.slice(startIndex, endIndex);
	}

	// Combined filter + sort + paginate
	$: filteredDonations = applyFilters(donations);
	$: sortedDonations = sortDonations(filteredDonations);
	$: paginatedDonations = paginateDonations(sortedDonations);
	$: totalPages = Math.ceil(filteredDonations.length / itemsPerPage);

	// Reset to page 1 when filters change
	$: {
		searchQuery;
		itemsPerPage;
		currentPage = 1;
	}

	// Statistics
	$: donationStats = {
		total: donations.length,
		totalAmount: donations.reduce((sum, d) => sum + d.amount, 0),
		last30Days: donations.filter((d) => {
			const donationDate = new Date(d.timestamp);
			const thirtyDaysAgo = new Date();
			thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
			return donationDate >= thirtyDaysAgo;
		}).length
	};

	// Load data on mount
	async function loadDonations() {
		isLoading = true;
		errorMessage = '';

		try {
			donations = await getDonations();
		} catch (error) {
			console.error('❌ Error loading donations:', error);
			errorMessage = 'Failed to load donations. Please check your connection and try again.';
		} finally {
			isLoading = false;
		}
	}

	// Format date to Indian format: 14-Oct-2025, 11:30 AM
	function formatDate(isoString: string): string {
		const date = new Date(isoString);
		const day = date.getDate().toString().padStart(2, '0');
		const month = date.toLocaleString('en-IN', { month: 'short' });
		const year = date.getFullYear();
		const time = date.toLocaleString('en-IN', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: true
		});
		return `${day}-${month}-${year}, ${time}`;
	}

	// Format currency
	function formatCurrency(amount: number): string {
		return new Intl.NumberFormat('en-IN', {
			style: 'currency',
			currency: 'INR',
			maximumFractionDigits: 0
		}).format(amount);
	}

	// Mask PAN Card
	function maskPAN(pan: string): string {
		if (!pan || pan.length !== 10) return '****';
		return `${pan.slice(0, 5)}****${pan.slice(-1)}`;
	}

	// Toggle PAN visibility
	function togglePANVisibility(donationId: string) {
		revealedPANs[donationId] = !revealedPANs[donationId];
		revealedPANs = { ...revealedPANs };
	}

	// Export to CSV
	function exportToCSV() {
		if (filteredDonations.length === 0) {
			alert('No data to export');
			return;
		}

		const filename = `sikhaid_donations_${new Date().toISOString().split('T')[0]}.csv`;

		// Get headers
		const headers = ['Date', 'Donor Name', 'Phone', 'PAN Card', 'Amount', 'Payment ID'];
		const csvContent = [
			headers.join(','),
			...filteredDonations.map((donation) => {
				const row = [
					formatDate(donation.timestamp),
					donation.donorName,
					donation.phone,
					donation.panCard || 'N/A',
					donation.amount,
					donation.razorpayPaymentId
				];
				return row.map((value) => `"${String(value || '').replace(/"/g, '""')}"`).join(',');
			})
		].join('\n');

		// Create and download file
		const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
		const link = document.createElement('a');
		const url = URL.createObjectURL(blob);
		link.setAttribute('href', url);
		link.setAttribute('download', filename);
		link.style.visibility = 'hidden';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	// Change sort
	function changeSort(field: SortField) {
		if (sortField === field) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortField = field;
			sortDirection = 'desc';
		}
	}

	onMount(() => {
		// Check authentication
		const adminSession = document.cookie.split('; ').find((row) => row.startsWith('admin_session='));

		if (!adminSession) {
			goto('/admin');
			return;
		}

		loadDonations();
	});
</script>

<svelte:head>
	<title>Donations - Admin Panel - Sikh Aid</title>
</svelte:head>

<main class="min-h-screen bg-gray-50 py-8 px-4">
	<div class="max-w-7xl mx-auto">
		<!-- Header -->
		<div class="mb-8">
			<div class="flex items-center justify-between mb-4">
				<div>
					<h1 class="text-3xl font-bold text-gray-900">Donations</h1>
					<p class="text-gray-600 mt-1">Manage and view all donation records</p>
				</div>
				<button
					on:click={() => goto('/admin')}
					class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors flex items-center gap-2"
				>
					<Icon icon="mdi:arrow-left" />
					Back to Admin
				</button>
			</div>

			<!-- Statistics Cards -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
				<div class="bg-white rounded-lg shadow p-6">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-sm text-gray-600">Total Donations</p>
							<p class="text-2xl font-bold text-navy">{donationStats.total}</p>
						</div>
						<Icon icon="mdi:hand-heart" class="text-4xl text-navy opacity-20" />
					</div>
				</div>

				<div class="bg-white rounded-lg shadow p-6">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-sm text-gray-600">Total Amount</p>
							<p class="text-2xl font-bold text-green-600">
								{formatCurrency(donationStats.totalAmount)}
							</p>
						</div>
						<Icon icon="mdi:currency-inr" class="text-4xl text-green-600 opacity-20" />
					</div>
				</div>

				<div class="bg-white rounded-lg shadow p-6">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-sm text-gray-600">Last 30 Days</p>
							<p class="text-2xl font-bold text-orange-600">{donationStats.last30Days}</p>
						</div>
						<Icon icon="mdi:calendar-month" class="text-4xl text-orange-600 opacity-20" />
					</div>
				</div>
			</div>
		</div>

		<!-- Loading State -->
		{#if isLoading}
			<div class="bg-white rounded-lg shadow p-12 text-center">
				<div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-navy mb-4"></div>
				<p class="text-gray-600">Loading donations...</p>
			</div>
		{:else if errorMessage}
			<!-- Error State -->
			<div class="bg-red-50 border border-red-200 rounded-lg p-6">
				<div class="flex items-center gap-3">
					<Icon icon="mdi:alert-circle" class="text-2xl text-red-600" />
					<div>
						<p class="font-semibold text-red-900">Error</p>
						<p class="text-sm text-red-700">{errorMessage}</p>
					</div>
				</div>
				<button
					on:click={loadDonations}
					class="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
				>
					Retry
				</button>
			</div>
		{:else}
			<!-- Filters and Actions -->
			<div class="bg-white rounded-lg shadow mb-6 p-6">
				<div class="flex flex-col md:flex-row gap-4 items-center justify-between">
					<!-- Search -->
					<div class="flex-1 w-full md:w-auto">
						<div class="relative">
							<Icon
								icon="mdi:magnify"
								class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
							/>
							<input
								type="text"
								bind:value={searchQuery}
								placeholder="Search donations..."
								class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-navy"
							/>
						</div>
					</div>

					<!-- Items per page -->
					<div class="flex items-center gap-2">
						<label for="perPage" class="text-sm text-gray-600 whitespace-nowrap">
							Per page:
						</label>
						<select
							id="perPage"
							bind:value={itemsPerPage}
							class="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-navy focus:border-navy"
						>
							<option value={25}>25</option>
							<option value={50}>50</option>
							<option value={100}>100</option>
						</select>
					</div>

					<!-- Export Button -->
					<button
						on:click={exportToCSV}
						class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
					>
						<Icon icon="mdi:download" />
						Export CSV
					</button>
				</div>

				<!-- Results count -->
				<div class="mt-4 text-sm text-gray-600">
					Showing {filteredDonations.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} - {Math.min(
						currentPage * itemsPerPage,
						filteredDonations.length
					)} of {filteredDonations.length} donation{filteredDonations.length !== 1 ? 's' : ''}
				</div>
			</div>

			<!-- Donations Table -->
			{#if paginatedDonations.length === 0}
				<div class="bg-white rounded-lg shadow p-12 text-center">
					<Icon icon="mdi:hand-heart-outline" class="text-6xl text-gray-300 mx-auto mb-4" />
					<p class="text-xl font-semibold text-gray-900 mb-2">No donations found</p>
					<p class="text-gray-600">
						{searchQuery
							? 'Try adjusting your search query'
							: 'Donations will appear here once they are received'}
					</p>
				</div>
			{:else}
				<div class="bg-white rounded-lg shadow overflow-hidden">
					<div class="overflow-x-auto">
						<table class="min-w-full divide-y divide-gray-200">
							<thead class="bg-gray-50">
								<tr>
									<th
										on:click={() => changeSort('date')}
										class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
									>
										<div class="flex items-center gap-1">
											Date
											{#if sortField === 'date'}
												<Icon
													icon={sortDirection === 'asc'
														? 'mdi:arrow-up'
														: 'mdi:arrow-down'}
												/>
											{/if}
										</div>
									</th>
									<th
										on:click={() => changeSort('name')}
										class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
									>
										<div class="flex items-center gap-1">
											Donor Name
											{#if sortField === 'name'}
												<Icon
													icon={sortDirection === 'asc'
														? 'mdi:arrow-up'
														: 'mdi:arrow-down'}
												/>
											{/if}
										</div>
									</th>
									<th
										class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Phone
									</th>
									<th
										class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										PAN Card
									</th>
									<th
										on:click={() => changeSort('amount')}
										class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
									>
										<div class="flex items-center gap-1">
											Amount
											{#if sortField === 'amount'}
												<Icon
													icon={sortDirection === 'asc'
														? 'mdi:arrow-up'
														: 'mdi:arrow-down'}
												/>
											{/if}
										</div>
									</th>
									<th
										class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Payment ID
									</th>
								</tr>
							</thead>
							<tbody class="bg-white divide-y divide-gray-200">
								{#each paginatedDonations as donation (donation.id)}
									<tr class="hover:bg-gray-50">
										<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{formatDate(donation.timestamp)}
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="text-sm font-medium text-gray-900">
												{donation.donorName}
											</div>
										</td>
										<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{donation.phone || 'N/A'}
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											{#if donation.panCard}
												<div class="flex items-center gap-2">
													<span class="text-sm font-mono text-gray-900">
														{revealedPANs[donation.id || '']
															? donation.panCard
															: maskPAN(donation.panCard)}
													</span>
													<button
														on:click={() => togglePANVisibility(donation.id || '')}
														class="text-gray-500 hover:text-navy"
														title={revealedPANs[donation.id || ''] ? 'Hide PAN' : 'Show PAN'}
													>
														<Icon
															icon={revealedPANs[donation.id || '']
																? 'mdi:eye-off'
																: 'mdi:eye'}
														/>
													</button>
												</div>
											{:else}
												<span class="text-sm text-gray-400">N/A</span>
											{/if}
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<span class="text-sm font-semibold text-green-600">
												{formatCurrency(donation.amount)}
											</span>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<span class="text-xs font-mono text-gray-600">
												{donation.razorpayPaymentId}
											</span>
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>

				<!-- Pagination -->
				{#if totalPages > 1}
					<div class="bg-white rounded-lg shadow mt-6 p-4">
						<div class="flex items-center justify-between">
							<button
								on:click={() => (currentPage = Math.max(1, currentPage - 1))}
								disabled={currentPage === 1}
								class="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center gap-2"
							>
								<Icon icon="mdi:chevron-left" />
								Previous
							</button>

							<div class="flex items-center gap-2">
								<span class="text-sm text-gray-600">
									Page {currentPage} of {totalPages}
								</span>
							</div>

							<button
								on:click={() => (currentPage = Math.min(totalPages, currentPage + 1))}
								disabled={currentPage === totalPages}
								class="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center gap-2"
							>
								Next
								<Icon icon="mdi:chevron-right" />
							</button>
						</div>
					</div>
				{/if}
			{/if}
		{/if}
	</div>
</main>

<style>
	.text-navy {
		color: var(--navy);
	}

	.bg-navy {
		background-color: var(--navy);
	}

	.ring-navy {
		--tw-ring-color: var(--navy);
	}

	.border-navy {
		border-color: var(--navy);
	}

	.focus\:ring-navy:focus {
		--tw-ring-color: var(--navy);
	}

	.focus\:border-navy:focus {
		border-color: var(--navy);
	}

	.hover\:text-navy:hover {
		color: var(--navy);
	}
</style>
