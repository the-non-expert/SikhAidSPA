<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<div class="placeholder-page">
	<div class="content">
		<div class="icon">📢</div>
		<h1>Campaign Management</h1>
		<p class="subtitle">Coming Soon</p>
		<p class="description">
			This section will allow you to create, edit, and manage fundraising campaigns for SikhAid's
			charitable initiatives.
		</p>
		<button on:click={() => goto('/admin')} class="back-btn"> ← Back to Dashboard </button>
	</div>
</div>

<style>
	.placeholder-page {
		min-height: calc(100vh - 64px);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
	}

	.content {
		text-align: center;
		max-width: 600px;
		background: white;
		padding: 3rem 2rem;
		border-radius: 16px;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
	}

	.icon {
		font-size: 4rem;
		margin-bottom: 1rem;
	}

	h1 {
		font-size: 2rem;
		font-weight: 700;
		color: var(--navy);
		margin-bottom: 0.5rem;
	}

	.subtitle {
		font-size: 1.25rem;
		color: var(--orange);
		font-weight: 600;
		margin-bottom: 1rem;
	}

	.description {
		font-size: 1rem;
		color: #64748b;
		line-height: 1.6;
		margin-bottom: 2rem;
	}

	.back-btn {
		padding: 0.75rem 2rem;
		font-size: 1rem;
		font-weight: 600;
		background: var(--navy);
		color: white;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.back-btn:hover {
		background: var(--orange);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(255, 166, 23, 0.3);
	}

	@media (max-width: 768px) {
		.content {
			padding: 2rem 1.5rem;
		}

		h1 {
			font-size: 1.5rem;
		}

		.subtitle {
			font-size: 1.1rem;
		}

		.description {
			font-size: 0.95rem;
		}
	}
</style>
