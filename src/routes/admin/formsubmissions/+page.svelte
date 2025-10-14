<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import {
		getContactSubmissions,
		getVolunteerSubmissions,
		getCSRSubmissions,
		updateSubmissionStatus,
		type FirestoreContactSubmission,
		type FirestoreVolunteerSubmission,
		type FirestoreCSRSubmission
	} from '$lib/firestore';
	import SubmissionModal from '$lib/components/admin/SubmissionModal.svelte';

	// Data stores
	let contactSubmissions: FirestoreContactSubmission[] = [];
	let volunteerSubmissions: FirestoreVolunteerSubmission[] = [];
	let csrSubmissions: FirestoreCSRSubmission[] = [];

	// UI state
	let activeTab: 'contact' | 'volunteer' | 'csr' = 'contact';
	let searchQuery = '';
	let isLoading = true;
	let errorMessage = '';
	let statusUpdateErrors: Record<string, string> = {};
	let statusUpdateSuccess: Record<string, boolean> = {};

	// Filter state
	let statusFilter: 'all' | 'new' | 'read' | 'resolved' = 'all';

	// Sorting state
	type SortField = 'date' | 'name' | 'status';
	let sortField: SortField = 'date';
	let sortDirection: 'asc' | 'desc' = 'desc';

	// Pagination state
	let itemsPerPage = 25;
	let currentPage = 1;

	// Modal state
	let modalOpen = false;
	let modalSubmission: any = null;
	let modalType: 'contact' | 'volunteer' | 'csr' = 'contact';

	// Apply filters and search
	function applyFilters(submissions: any[]) {
		let filtered = submissions;

		// Status filter
		if (statusFilter !== 'all') {
			filtered = filtered.filter((sub) => sub.status === statusFilter);
		}

		// Search filter
		if (searchQuery) {
			filtered = filtered.filter((sub) =>
				Object.values(sub)
					.join(' ')
					.toLowerCase()
					.includes(searchQuery.toLowerCase())
			);
		}

		return filtered;
	}

	// Sort submissions
	function sortSubmissions(submissions: any[]) {
		return [...submissions].sort((a, b) => {
			let compareA: any;
			let compareB: any;

			if (sortField === 'date') {
				compareA = new Date(a.timestamp).getTime();
				compareB = new Date(b.timestamp).getTime();
			} else if (sortField === 'name') {
				compareA = (a.name || a.fullName || a.companyName || '').toLowerCase();
				compareB = (b.name || b.fullName || b.companyName || '').toLowerCase();
			} else if (sortField === 'status') {
				compareA = a.status;
				compareB = b.status;
			}

			if (sortDirection === 'asc') {
				return compareA > compareB ? 1 : -1;
			} else {
				return compareA < compareB ? 1 : -1;
			}
		});
	}

	// Paginate submissions
	function paginateSubmissions(submissions: any[]) {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return submissions.slice(startIndex, endIndex);
	}

	// Combined filter + sort + paginate
	$: filteredContacts = applyFilters(contactSubmissions);
	$: sortedContacts = sortSubmissions(filteredContacts);
	$: paginatedContacts = paginateSubmissions(sortedContacts);
	$: totalContactPages = Math.ceil(filteredContacts.length / itemsPerPage);

	$: filteredVolunteers = applyFilters(volunteerSubmissions);
	$: sortedVolunteers = sortSubmissions(filteredVolunteers);
	$: paginatedVolunteers = paginateSubmissions(sortedVolunteers);
	$: totalVolunteerPages = Math.ceil(filteredVolunteers.length / itemsPerPage);

	$: filteredCSR = applyFilters(csrSubmissions);
	$: sortedCSR = sortSubmissions(filteredCSR);
	$: paginatedCSR = paginateSubmissions(sortedCSR);
	$: totalCSRPages = Math.ceil(filteredCSR.length / itemsPerPage);

	// Get current data for active tab
	$: currentData =
		activeTab === 'contact'
			? paginatedContacts
			: activeTab === 'volunteer'
				? paginatedVolunteers
				: paginatedCSR;
	$: currentTotal =
		activeTab === 'contact'
			? filteredContacts.length
			: activeTab === 'volunteer'
				? filteredVolunteers.length
				: filteredCSR.length;
	$: totalPages =
		activeTab === 'contact'
			? totalContactPages
			: activeTab === 'volunteer'
				? totalVolunteerPages
				: totalCSRPages;

	// Reset to page 1 when filters change
	$: {
		statusFilter;
		searchQuery;
		itemsPerPage;
		activeTab;
		currentPage = 1;
	}

	// Statistics
	$: contactStats = {
		total: contactSubmissions.length,
		new: contactSubmissions.filter((s) => s.status === 'new').length
	};

	$: volunteerStats = {
		total: volunteerSubmissions.length,
		new: volunteerSubmissions.filter((s) => s.status === 'new').length
	};

	$: csrStats = {
		total: csrSubmissions.length,
		new: csrSubmissions.filter((s) => s.status === 'new').length
	};

	// Load all data on mount
	async function loadAllData() {
		isLoading = true;
		errorMessage = '';

		try {
			const [contacts, volunteers, csr] = await Promise.all([
				getContactSubmissions(),
				getVolunteerSubmissions(),
				getCSRSubmissions()
			]);

			contactSubmissions = contacts;
			volunteerSubmissions = volunteers;
			csrSubmissions = csr;

			console.log('✅ Loaded all submissions:', {
				contacts: contacts.length,
				volunteers: volunteers.length,
				csr: csr.length
			});
		} catch (error) {
			console.error('❌ Error loading data:', error);
			errorMessage = 'Failed to load data. Please check your connection and try again.';
		} finally {
			isLoading = false;
		}
	}

	// Update submission status
	async function handleStatusUpdate(
		collectionName: string,
		docId: string,
		newStatus: 'new' | 'read' | 'resolved',
		submissionType: 'contact' | 'volunteer' | 'csr'
	) {
		delete statusUpdateErrors[docId];
		delete statusUpdateSuccess[docId];

		try {
			await updateSubmissionStatus(collectionName, docId, newStatus);

			// Update local data
			if (submissionType === 'contact') {
				contactSubmissions = contactSubmissions.map((sub) =>
					sub.id === docId ? { ...sub, status: newStatus } : sub
				);
			} else if (submissionType === 'volunteer') {
				volunteerSubmissions = volunteerSubmissions.map((sub) =>
					sub.id === docId ? { ...sub, status: newStatus } : sub
				);
			} else {
				csrSubmissions = csrSubmissions.map((sub) =>
					sub.id === docId ? { ...sub, status: newStatus } : sub
				);
			}

			// Show success message
			statusUpdateSuccess[docId] = true;
			statusUpdateSuccess = { ...statusUpdateSuccess };

			// Auto-hide success after 3 seconds
			setTimeout(() => {
				delete statusUpdateSuccess[docId];
				statusUpdateSuccess = { ...statusUpdateSuccess };
			}, 3000);
		} catch (error) {
			console.error('❌ Error updating status:', error);
			statusUpdateErrors[docId] = 'Update failed. Try again.';
			statusUpdateErrors = { ...statusUpdateErrors };
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

	// Get status badge
	function getStatusBadge(status: string): { text: string; color: string } {
		switch (status) {
			case 'new':
				return { text: 'New', color: 'bg-blue-100 text-blue-700' };
			case 'read':
				return { text: 'Read', color: 'bg-orange-100 text-orange-700' };
			case 'resolved':
				return { text: 'Resolved', color: 'bg-green-100 text-green-700' };
			default:
				return { text: status, color: 'bg-gray-100 text-gray-700' };
		}
	}

	// Truncate long text
	function truncate(text: string, maxLength: number = 50): string {
		if (!text) return '';
		return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
	}

	// Export to CSV
	function exportToCSV() {
		let data: any[] = [];
		let filename = '';

		if (activeTab === 'contact') {
			data = filteredContacts;
			filename = `sikhaid_contacts_${new Date().toISOString().split('T')[0]}.csv`;
		} else if (activeTab === 'volunteer') {
			data = filteredVolunteers;
			filename = `sikhaid_volunteers_${new Date().toISOString().split('T')[0]}.csv`;
		} else {
			data = filteredCSR;
			filename = `sikhaid_csr_${new Date().toISOString().split('T')[0]}.csv`;
		}

		if (data.length === 0) {
			alert('No data to export');
			return;
		}

		// Get headers from first object
		const headers = Object.keys(data[0]).filter((key) => key !== 'firestoreTimestamp');
		const csvContent = [
			headers.join(','),
			...data.map((row) =>
				headers
					.map((header) => {
						const value = row[header];
						// Handle arrays and objects
						const stringValue =
							Array.isArray(value) || typeof value === 'object'
								? JSON.stringify(value)
								: String(value || '');
						// Escape quotes and wrap in quotes
						return `"${stringValue.replace(/"/g, '""')}"`;
					})
					.join(',')
			)
		].join('\n');

		// Download
		const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.download = filename;
		link.click();
	}

	// Handle column header click for sorting
	function handleSort(field: SortField) {
		if (sortField === field) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortField = field;
			sortDirection = 'desc';
		}
	}

	// Pagination controls
	function goToPage(page: number) {
		currentPage = page;
	}

	function nextPage() {
		if (currentPage < totalPages) {
			currentPage++;
		}
	}

	function prevPage() {
		if (currentPage > 1) {
			currentPage--;
		}
	}

	// Modal functions
	function openModal(submission: any, type: 'contact' | 'volunteer' | 'csr') {
		modalSubmission = submission;
		modalType = type;
		modalOpen = true;
	}

	function closeModal() {
		modalOpen = false;
	}

	function handleModalNavigate(event: CustomEvent) {
		modalSubmission = event.detail.submission;
	}

	async function handleModalStatusUpdate(newStatus: 'new' | 'read' | 'resolved') {
		if (!modalSubmission) return;

		const collectionName =
			modalType === 'contact'
				? 'contact_submissions'
				: modalType === 'volunteer'
					? 'volunteer_submissions'
					: 'csr_submissions';

		await handleStatusUpdate(collectionName, modalSubmission.id, newStatus, modalType);
	}

	onMount(() => {
		loadAllData();
	});
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
	<!-- Back to Dashboard Button -->
	<div class="mb-6">
		<button
			on:click={() => goto('/admin')}
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

	<!-- Error Message -->
	{#if errorMessage}
		<div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
			<p class="text-red-700 font-medium">⚠️ {errorMessage}</p>
			<button
				on:click={loadAllData}
				class="mt-2 text-sm text-red-600 hover:text-red-800 underline"
			>
				Try Again
			</button>
		</div>
	{/if}

	<!-- Loading State -->
	{#if isLoading}
		<div class="flex flex-col items-center justify-center py-20">
			<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-navy mb-4"></div>
			<p class="text-gray-600">Loading submissions...</p>
		</div>
	{:else}
		<!-- Statistics Cards -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
			<!-- Contact Card -->
			<div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm text-gray-600 mb-1">Contact Inquiries</p>
						<p class="text-3xl font-bold text-gray-900">{contactStats.total}</p>
						<p class="text-sm text-blue-600 mt-1">
							{contactStats.new} new submission{contactStats.new !== 1 ? 's' : ''}
						</p>
					</div>
					<div class="text-4xl">📧</div>
				</div>
			</div>

			<!-- Volunteer Card -->
			<div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-custom">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm text-gray-600 mb-1">Volunteer Applications</p>
						<p class="text-3xl font-bold text-gray-900">{volunteerStats.total}</p>
						<p class="text-sm text-orange-custom mt-1">
							{volunteerStats.new} new application{volunteerStats.new !== 1 ? 's' : ''}
						</p>
					</div>
					<div class="text-4xl">👥</div>
				</div>
			</div>

			<!-- CSR Card -->
			<div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm text-gray-600 mb-1">CSR Partnerships</p>
						<p class="text-3xl font-bold text-gray-900">{csrStats.total}</p>
						<p class="text-sm text-green-600 mt-1">
							{csrStats.new} new inquir{csrStats.new !== 1 ? 'ies' : 'y'}
						</p>
					</div>
					<div class="text-4xl">🏢</div>
				</div>
			</div>
		</div>

		<!-- Actions Bar -->
		<div class="bg-white rounded-xl shadow-md p-4 mb-6">
			<div class="flex flex-col lg:flex-row items-center justify-between gap-4">
				<!-- Left side: Refresh + Status Filter -->
				<div class="flex items-center gap-3 w-full lg:w-auto">
					<button
						on:click={loadAllData}
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

					<!-- Status Filter -->
					<select
						bind:value={statusFilter}
						class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent font-medium"
					>
						<option value="all">All Status</option>
						<option value="new">New Only</option>
						<option value="read">Read Only</option>
						<option value="resolved">Resolved Only</option>
					</select>
				</div>

				<!-- Center: Search Bar -->
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Search across all fields..."
					class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent w-full lg:w-auto"
				/>

				<!-- Right side: Export -->
				<button
					on:click={exportToCSV}
					class="px-4 py-2 bg-orange-custom hover:bg-orange-dark text-white rounded-lg transition-colors font-medium flex items-center w-full lg:w-auto justify-center"
				>
					<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						/>
					</svg>
					Export CSV
				</button>
			</div>
		</div>

		<!-- Tabs -->
		<div class="bg-white rounded-t-xl shadow-md">
			<div class="flex border-b border-gray-200">
				<button
					on:click={() => (activeTab = 'contact')}
					class="flex-1 px-6 py-4 text-sm font-medium transition-colors {activeTab === 'contact'
						? 'bg-navy text-white border-b-2 border-navy'
						: 'text-gray-600 hover:text-navy'}"
				>
					📧 Contact ({filteredContacts.length})
				</button>
				<button
					on:click={() => (activeTab = 'volunteer')}
					class="flex-1 px-6 py-4 text-sm font-medium transition-colors {activeTab === 'volunteer'
						? 'bg-navy text-white border-b-2 border-navy'
						: 'text-gray-600 hover:text-navy'}"
				>
					👥 Volunteer ({filteredVolunteers.length})
				</button>
				<button
					on:click={() => (activeTab = 'csr')}
					class="flex-1 px-6 py-4 text-sm font-medium transition-colors {activeTab === 'csr'
						? 'bg-navy text-white border-b-2 border-navy'
						: 'text-gray-600 hover:text-navy'}"
				>
					🏢 CSR ({filteredCSR.length})
				</button>
			</div>
		</div>

		<!-- Tables Container -->
		<div class="bg-white shadow-md overflow-x-auto">
			{#if currentData.length === 0}
				<div class="p-8 text-center text-gray-500">
					<p>No {activeTab} submissions found.</p>
				</div>
			{:else}
				<table class="min-w-full divide-y divide-gray-200">
					<thead class="bg-gray-50">
						<tr>
							<!-- Status Column -->
							<th
								class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
								on:click={() => handleSort('status')}
							>
								<div class="flex items-center gap-1">
									Status
									{#if sortField === 'status'}
										<span class="text-navy">
											{sortDirection === 'asc' ? '↑' : '↓'}
										</span>
									{/if}
								</div>
							</th>

							<!-- Date Column -->
							<th
								class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
								on:click={() => handleSort('date')}
							>
								<div class="flex items-center gap-1">
									Date
									{#if sortField === 'date'}
										<span class="text-navy">
											{sortDirection === 'asc' ? '↑' : '↓'}
										</span>
									{/if}
								</div>
							</th>

							<!-- Name Column -->
							<th
								class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
								on:click={() => handleSort('name')}
							>
								<div class="flex items-center gap-1">
									Name
									{#if sortField === 'name'}
										<span class="text-navy">
											{sortDirection === 'asc' ? '↑' : '↓'}
										</span>
									{/if}
								</div>
							</th>

							<!-- Dynamic columns based on tab -->
							{#if activeTab === 'contact'}
								<th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Contact
								</th>
								<th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Subject
								</th>
								<th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Message
								</th>
							{:else if activeTab === 'volunteer'}
								<th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Contact
								</th>
								<th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Opportunity
								</th>
								<th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Duration
								</th>
							{:else}
								<th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Contact Person
								</th>
								<th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Industry
								</th>
								<th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
									Budget
								</th>
							{/if}

							<th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
								Actions
							</th>
						</tr>
					</thead>
					<tbody class="bg-white divide-y divide-gray-200">
						{#each currentData as submission}
							{@const badge = getStatusBadge(submission.status)}
							<tr
								class="hover:bg-gray-50 cursor-pointer"
								on:click={() => openModal(submission, activeTab)}
							>
								<td class="px-4 py-4">
									<span
										class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {badge.color}"
									>
										{badge.text}
									</span>
								</td>
								<td class="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
									{formatDate(submission.timestamp)}
								</td>
								<td class="px-4 py-4 text-sm font-medium text-gray-900">
									{submission.name || submission.fullName || submission.companyName}
								</td>

								{#if activeTab === 'contact'}
									<td class="px-4 py-4 text-sm text-gray-600">
										<div>{submission.email}</div>
										<div class="text-xs text-gray-500">{submission.phone || 'N/A'}</div>
									</td>
									<td class="px-4 py-4 text-sm text-gray-600">
										{truncate(submission.subject, 30)}
									</td>
									<td class="px-4 py-4 text-sm text-gray-600">
										{truncate(submission.message, 50)}
									</td>
								{:else if activeTab === 'volunteer'}
									<td class="px-4 py-4 text-sm text-gray-600">
										<div>{submission.email}</div>
										<div class="text-xs text-gray-500">{submission.mobile}</div>
									</td>
									<td class="px-4 py-4 text-sm text-gray-600 capitalize">
										{submission.opportunity.replace(/-/g, ' ')}
									</td>
									<td class="px-4 py-4 text-sm text-gray-600">
										{submission.durationMonths} months
									</td>
								{:else}
									<td class="px-4 py-4 text-sm text-gray-600">
										<div class="font-medium">{submission.contactPerson}</div>
										<div class="text-xs">{submission.email}</div>
									</td>
									<td class="px-4 py-4">
										<span
											class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700 capitalize"
										>
											{submission.industry}
										</span>
									</td>
									<td class="px-4 py-4 text-sm text-gray-600">
										{submission.budgetRange}
									</td>
								{/if}

								<td class="px-4 py-4" on:click={(e) => e.stopPropagation()}>
									<select
										value={submission.status}
										on:change={(e) =>
											handleStatusUpdate(
												activeTab === 'contact'
													? 'contact_submissions'
													: activeTab === 'volunteer'
														? 'volunteer_submissions'
														: 'csr_submissions',
												submission.id!,
												e.currentTarget.value as any,
												activeTab
											)}
										class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-navy"
									>
										<option value="new">New</option>
										<option value="read">Read</option>
										<option value="resolved">Resolved</option>
									</select>
									{#if statusUpdateErrors[submission.id || '']}
										<p class="text-xs text-red-600 mt-1">
											{statusUpdateErrors[submission.id || '']}
										</p>
									{/if}
									{#if statusUpdateSuccess[submission.id || '']}
										<p class="text-xs text-green-600 mt-1 flex items-center gap-1">
											<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
												<path
													fill-rule="evenodd"
													d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
													clip-rule="evenodd"
												/>
											</svg>
											Updated!
										</p>
									{/if}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
		</div>

		<!-- Pagination -->
		{#if currentTotal > 0}
			<div class="bg-white rounded-b-xl shadow-md px-4 py-3 border-t border-gray-200">
				<div class="flex flex-col sm:flex-row items-center justify-between gap-4">
					<!-- Results info -->
					<div class="text-sm text-gray-600">
						Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(
							currentPage * itemsPerPage,
							currentTotal
						)} of {currentTotal} results
					</div>

					<!-- Page controls -->
					<div class="flex items-center gap-2">
						<!-- Items per page -->
						<select
							bind:value={itemsPerPage}
							class="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-navy"
						>
							<option value={10}>10 / page</option>
							<option value={25}>25 / page</option>
							<option value={50}>50 / page</option>
							<option value={100}>100 / page</option>
						</select>

						<!-- Previous button -->
						<button
							on:click={prevPage}
							disabled={currentPage === 1}
							class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Previous
						</button>

						<!-- Page numbers -->
						<div class="flex gap-1">
							{#each Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
								let pageNum;
								if (totalPages <= 5) {
									pageNum = i + 1;
								} else if (currentPage <= 3) {
									pageNum = i + 1;
								} else if (currentPage >= totalPages - 2) {
									pageNum = totalPages - 4 + i;
								} else {
									pageNum = currentPage - 2 + i;
								}
								return pageNum;
							}) as pageNum}
								<button
									on:click={() => goToPage(pageNum)}
									class="px-3 py-1 border rounded text-sm {currentPage === pageNum
										? 'bg-navy text-white border-navy'
										: 'border-gray-300 hover:bg-gray-50'}"
								>
									{pageNum}
								</button>
							{/each}
						</div>

						<!-- Next button -->
						<button
							on:click={nextPage}
							disabled={currentPage === totalPages}
							class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Next
						</button>
					</div>
				</div>
			</div>
		{/if}
	{/if}
</div>

<!-- Modal -->
<SubmissionModal
	bind:isOpen={modalOpen}
	submission={modalSubmission}
	submissionType={modalType}
	submissions={activeTab === 'contact'
		? sortedContacts
		: activeTab === 'volunteer'
			? sortedVolunteers
			: sortedCSR}
	onStatusUpdate={handleModalStatusUpdate}
	on:close={closeModal}
	on:navigate={handleModalNavigate}
/>

<style>
	:global(:root) {
		--navy: #1a237e;
		--navy-dark: #0d1660;
		--orange: #ffa617;
		--orange-dark: #e89500;
	}

	.bg-navy {
		background-color: var(--navy);
	}

	.bg-navy-dark {
		background-color: var(--navy-dark);
	}

	.hover\:bg-navy-dark:hover {
		background-color: var(--navy-dark);
	}

	.text-navy {
		color: var(--navy);
	}

	.hover\:text-navy:hover {
		color: var(--navy);
	}

	.border-navy {
		border-color: var(--navy);
	}

	.bg-orange-custom {
		background-color: var(--orange);
	}

	.bg-orange-dark {
		background-color: var(--orange-dark);
	}

	.hover\:bg-orange-dark:hover {
		background-color: var(--orange-dark);
	}

	.text-orange-custom {
		color: var(--orange);
	}

	.focus\:ring-navy:focus {
		--tw-ring-color: var(--navy);
	}
</style>
