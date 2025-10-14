<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let isOpen = false;
	export let submission: any = null;
	export let submissionType: 'contact' | 'volunteer' | 'csr';
	export let submissions: any[] = [];
	export let onStatusUpdate: (status: 'new' | 'read' | 'resolved') => void;

	const dispatch = createEventDispatcher();

	let currentIndex = 0;

	// Update current index when submission changes
	$: if (submission && submissions.length > 0) {
		currentIndex = submissions.findIndex((s) => s.id === submission.id);
	}

	$: canGoPrevious = currentIndex > 0;
	$: canGoNext = currentIndex < submissions.length - 1;

	function close() {
		dispatch('close');
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			close();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!isOpen) return;

		if (e.key === 'Escape') {
			close();
		} else if (e.key === 'ArrowLeft' && canGoPrevious) {
			goToPrevious();
		} else if (e.key === 'ArrowRight' && canGoNext) {
			goToNext();
		}
	}

	function goToPrevious() {
		if (canGoPrevious) {
			dispatch('navigate', { submission: submissions[currentIndex - 1] });
		}
	}

	function goToNext() {
		if (canGoNext) {
			dispatch('navigate', { submission: submissions[currentIndex + 1] });
		}
	}

	function handleStatusChange(newStatus: 'new' | 'read' | 'resolved') {
		onStatusUpdate(newStatus);
	}

	// Format date
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

	// Lock body scroll when modal is open
	$: if (typeof window !== 'undefined') {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}

	// Compute badge for current submission
	$: badge = submission ? getStatusBadge(submission.status) : { text: '', color: '' };
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen && submission}
	<div
		class="modal-backdrop"
		on:click={handleBackdropClick}
		role="presentation"
	>
		<div class="modal-container">
			<!-- Header -->
			<div class="modal-header">
				<div class="flex items-center gap-3">
					<h2 class="text-xl font-bold text-gray-900">
						{submissionType === 'contact'
							? 'Contact Submission'
							: submissionType === 'volunteer'
								? 'Volunteer Application'
								: 'CSR Partnership Inquiry'}
					</h2>
					<span class="px-3 py-1 rounded-full text-sm font-medium {badge.color}">
						{badge.text}
					</span>
				</div>
				<button on:click={close} class="close-btn" aria-label="Close modal">
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

			<!-- Content -->
			<div class="modal-content">
				<div class="submission-details">
					<!-- Submission Date -->
					<div class="detail-row">
						<div class="detail-label">Submitted On</div>
						<div class="detail-value">{formatDate(submission.timestamp)}</div>
					</div>

					<!-- Contact Form Fields -->
					{#if submissionType === 'contact'}
						<div class="detail-row">
							<div class="detail-label">Name</div>
							<div class="detail-value">{submission.name}</div>
						</div>
						<div class="detail-row">
							<div class="detail-label">Email</div>
							<div class="detail-value">
								<a href="mailto:{submission.email}" class="text-blue-600 hover:underline">
									{submission.email}
								</a>
							</div>
						</div>
						<div class="detail-row">
							<div class="detail-label">Phone</div>
							<div class="detail-value">
								{submission.phone || 'N/A'}
							</div>
						</div>
						<div class="detail-row">
							<div class="detail-label">Subject</div>
							<div class="detail-value font-medium">{submission.subject}</div>
						</div>
						<div class="detail-row full-width">
							<div class="detail-label">Message</div>
							<div class="detail-value whitespace-pre-wrap">{submission.message}</div>
						</div>
					{/if}

					<!-- Volunteer Form Fields -->
					{#if submissionType === 'volunteer'}
						<div class="detail-row">
							<div class="detail-label">Full Name</div>
							<div class="detail-value">{submission.fullName}</div>
						</div>
						<div class="detail-row">
							<div class="detail-label">Email</div>
							<div class="detail-value">
								<a href="mailto:{submission.email}" class="text-blue-600 hover:underline">
									{submission.email}
								</a>
							</div>
						</div>
						<div class="detail-row">
							<div class="detail-label">Mobile</div>
							<div class="detail-value">{submission.mobile}</div>
						</div>
						<div class="detail-row">
							<div class="detail-label">Gender</div>
							<div class="detail-value capitalize">{submission.gender}</div>
						</div>
						<div class="detail-row full-width">
							<div class="detail-label">Address</div>
							<div class="detail-value">{submission.address}</div>
						</div>
						<div class="detail-row">
							<div class="detail-label">Opportunity</div>
							<div class="detail-value capitalize">{submission.opportunity.replace(/-/g, ' ')}</div>
						</div>
						<div class="detail-row">
							<div class="detail-label">Availability</div>
							<div class="detail-value">{submission.durationMonths} months</div>
						</div>
						<div class="detail-row">
							<div class="detail-label">Experience</div>
							<div class="detail-value">{submission.durationYears || '0'} years</div>
						</div>
						<div class="detail-row">
							<div class="detail-label">Start Date</div>
							<div class="detail-value">{submission.startDate}</div>
						</div>
						<div class="detail-row full-width">
							<div class="detail-label">About</div>
							<div class="detail-value whitespace-pre-wrap">{submission.about}</div>
						</div>
					{/if}

					<!-- CSR Form Fields -->
					{#if submissionType === 'csr'}
						<div class="detail-row">
							<div class="detail-label">Company Name</div>
							<div class="detail-value font-medium">{submission.companyName}</div>
						</div>
						<div class="detail-row">
							<div class="detail-label">Contact Person</div>
							<div class="detail-value">{submission.contactPerson}</div>
						</div>
						<div class="detail-row">
							<div class="detail-label">Email</div>
							<div class="detail-value">
								<a href="mailto:{submission.email}" class="text-blue-600 hover:underline">
									{submission.email}
								</a>
							</div>
						</div>
						<div class="detail-row">
							<div class="detail-label">Phone</div>
							<div class="detail-value">{submission.phone}</div>
						</div>
						<div class="detail-row">
							<div class="detail-label">Company Size</div>
							<div class="detail-value">{submission.companySize}</div>
						</div>
						<div class="detail-row">
							<div class="detail-label">Industry</div>
							<div class="detail-value capitalize">{submission.industry}</div>
						</div>
						<div class="detail-row">
							<div class="detail-label">Budget Range</div>
							<div class="detail-value">{submission.budgetRange}</div>
						</div>
						<div class="detail-row full-width">
							<div class="detail-label">Partnership Interest</div>
							<div class="detail-value">
								<div class="flex flex-wrap gap-2 mt-1">
									{#each submission.partnershipInterest as interest}
										<span class="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm capitalize">
											{interest.replace(/-/g, ' ')}
										</span>
									{/each}
								</div>
							</div>
						</div>
						<div class="detail-row full-width">
							<div class="detail-label">Message</div>
							<div class="detail-value whitespace-pre-wrap">{submission.message}</div>
						</div>
					{/if}
				</div>
			</div>

			<!-- Footer -->
			<div class="modal-footer">
				<!-- Navigation -->
				<div class="flex items-center gap-2">
					<button
						on:click={goToPrevious}
						disabled={!canGoPrevious}
						class="nav-btn"
						aria-label="Previous submission"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 19l-7-7 7-7"
							/>
						</svg>
					</button>
					<span class="text-sm text-gray-600">
						{currentIndex + 1} of {submissions.length}
					</span>
					<button
						on:click={goToNext}
						disabled={!canGoNext}
						class="nav-btn"
						aria-label="Next submission"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</button>
				</div>

				<!-- Quick Actions -->
				<div class="flex items-center gap-2">
					<button
						on:click={() => handleStatusChange('read')}
						disabled={submission.status === 'read'}
						class="action-btn action-btn-read"
					>
						Mark as Read
					</button>
					<button
						on:click={() => handleStatusChange('resolved')}
						disabled={submission.status === 'resolved'}
						class="action-btn action-btn-resolved"
					>
						Mark as Resolved
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: 1rem;
	}

	.modal-container {
		background: white;
		border-radius: 12px;
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
		max-width: 800px;
		width: 100%;
		max-height: 90vh;
		display: flex;
		flex-direction: column;
	}

	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.5rem;
		border-bottom: 1px solid #e5e7eb;
		flex-shrink: 0;
	}

	.close-btn {
		padding: 0.5rem;
		color: #6b7280;
		transition: color 0.2s;
		border-radius: 6px;
	}

	.close-btn:hover {
		color: #111827;
		background-color: #f3f4f6;
	}

	.modal-content {
		flex: 1;
		overflow-y: auto;
		padding: 1.5rem;
	}

	.submission-details {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}

	.detail-row {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.detail-row.full-width {
		grid-column: 1 / -1;
	}

	.detail-label {
		font-size: 0.875rem;
		font-weight: 600;
		color: #6b7280;
		text-transform: uppercase;
		letter-spacing: 0.025em;
	}

	.detail-value {
		font-size: 1rem;
		color: #111827;
		line-height: 1.5;
	}

	.modal-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.5rem;
		border-top: 1px solid #e5e7eb;
		flex-shrink: 0;
		gap: 1rem;
	}

	.nav-btn {
		padding: 0.5rem;
		border: 1px solid #e5e7eb;
		border-radius: 6px;
		background: white;
		color: #374151;
		transition: all 0.2s;
	}

	.nav-btn:hover:not(:disabled) {
		background-color: #f9fafb;
		border-color: #d1d5db;
	}

	.nav-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.action-btn {
		padding: 0.625rem 1.25rem;
		border-radius: 6px;
		font-size: 0.875rem;
		font-weight: 500;
		transition: all 0.2s;
		border: none;
		cursor: pointer;
	}

	.action-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.action-btn-read {
		background-color: #ffa617;
		color: white;
	}

	.action-btn-read:hover:not(:disabled) {
		background-color: #e89500;
	}

	.action-btn-resolved {
		background-color: #10b981;
		color: white;
	}

	.action-btn-resolved:hover:not(:disabled) {
		background-color: #059669;
	}

	/* Mobile: Full-screen modal */
	@media (max-width: 768px) {
		.modal-backdrop {
			padding: 0;
			align-items: flex-end;
		}

		.modal-container {
			max-height: 95vh;
			border-radius: 12px 12px 0 0;
			animation: slideUp 0.3s ease-out;
		}

		.submission-details {
			grid-template-columns: 1fr;
		}

		.modal-footer {
			flex-direction: column;
			align-items: stretch;
		}

		.modal-footer > div {
			justify-content: center;
		}
	}

	@keyframes slideUp {
		from {
			transform: translateY(100%);
		}
		to {
			transform: translateY(0);
		}
	}
</style>
