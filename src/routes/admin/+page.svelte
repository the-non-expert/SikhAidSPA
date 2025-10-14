<script lang="ts">
	import { goto } from '$app/navigation';

	const adminName = 'Raunak';

	function navigateTo(path: string) {
		goto(path);
	}

	function handleLogout() {
		// Clear the session cookie
		document.cookie = 'admin_session=; max-age=0; path=/';
		goto('/');
	}
</script>

<div class="admin-landing">
	<!-- Background with grid -->
	<div class="gradient-bg">
		<div class="grid-overlay"></div>
	</div>

	<!-- Content container -->
	<div class="content-container">
		<!-- Logout Button - Above badge -->
		<button on:click={handleLogout} class="logout-btn">
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
				/>
			</svg>
			Log Out
		</button>

		<!-- Top badge -->
		<div class="badge animate-fade-in">
			<span class="lock-icon">🔒</span>
			Exclusive Access - Admin Panel
		</div>

		<!-- SikhAid Logo -->
		<!-- <div class="logo-container animate-slide-up">
			<img src="/sikhaidLogo.png" alt="SikhAid Logo" class="logo" />
		</div> -->

		<!-- Main heading -->
		<h1 class="main-heading animate-slide-up delay-200">
			Welcome, <span class="highlight">{adminName}</span>
		</h1>

		<!-- Subheading -->
		<h2 class="sub-heading animate-slide-up delay-400">Your Control Room Awaits</h2>

		<!-- Description -->
		<p class="description animate-slide-up delay-600">
			This isn't just another dashboard—this is the engine room of <strong
				>SikhAid Charitable Trust</strong
			>.<br />
			<!-- Track, manage, and empower the journeys of thousands. Only a handful ever get to see this
			side.<br /> -->
			<em>Thank you for keeping us running smoother than a treadmill on max speed.</em>
		</p>

		<!-- Action buttons -->
		<div class="button-grid animate-fade-in delay-800">
			<button on:click={() => navigateTo('/admin/formsubmissions')} class="action-btn">
				Form Submissions
			</button>
			<button on:click={() => navigateTo('/admin/blogs')} class="action-btn"> Blogs </button>
			<button on:click={() => navigateTo('/admin/campaigns')} class="action-btn">
				Campaigns
			</button>
		</div>
	</div>
</div>

<style>
	.admin-landing {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		overflow: hidden;
		padding: 2rem 1rem;
	}

	/* Gradient background */
	.gradient-bg {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 50%, #2a3b8f 100%);
		z-index: 0;
	}

	/* Grid overlay */
	.grid-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
		background-size: 50px 50px;
		opacity: 0.3;
	}

	/* Add subtle pattern overlay */
	.gradient-bg::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-image: radial-gradient(
				circle at 20% 50%,
				rgba(255, 166, 23, 0.1) 0%,
				transparent 50%
			),
			radial-gradient(circle at 80% 80%, rgba(255, 166, 23, 0.08) 0%, transparent 50%);
		opacity: 0.6;
	}

	/* Logout button - Centered above badge */
	.logout-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		background: rgba(30, 30, 50, 0.8);
		backdrop-filter: blur(10px);
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 8px;
		font-size: 0.9rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		margin-bottom: 1rem;
	}

	.logout-btn:hover {
		background: rgba(255, 166, 23, 0.9);
		border-color: var(--orange);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(255, 166, 23, 0.3);
	}

	.content-container {
		position: relative;
		z-index: 1;
		max-width: 900px;
		width: 100%;
		text-align: center;
		color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* Badge */
	.badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1.25rem;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 50px;
		font-size: 0.875rem;
		font-weight: 500;
		margin-bottom: 2rem;
		letter-spacing: 0.5px;
	}

	.lock-icon {
		font-size: 1rem;
	}

	/* Logo */
	.logo-container {
		margin-bottom: 2rem;
		opacity: 0;
		animation-fill-mode: forwards;
	}

	.logo {
		height: 100px;
		width: auto;
	}

	/* Main heading */
	.main-heading {
		font-size: clamp(2.5rem, 6vw, 4rem);
		font-weight: 800;
		line-height: 1.2;
		margin-bottom: 1rem;
		letter-spacing: -0.02em;
	}

	.highlight {
		color: var(--orange);
		text-shadow: 0 0 30px rgba(255, 166, 23, 0.3);
	}

	/* Subheading */
	.sub-heading {
		font-size: clamp(1.5rem, 3vw, 2.25rem);
		font-weight: 600;
		margin-bottom: 1.5rem;
		opacity: 0.95;
	}

	/* Description */
	.description {
		font-size: clamp(1rem, 1.5vw, 1.125rem);
		line-height: 1.7;
		opacity: 0.85;
		margin-bottom: 3rem;
		max-width: 800px;
		margin-left: auto;
		margin-right: auto;
	}

	.description strong {
		color: var(--orange);
		font-weight: 600;
	}

	.description em {
		font-style: italic;
		opacity: 0.9;
	}

	/* Button grid */
	.button-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: center;
		align-items: center;
	}

	/* Action buttons - All same style with orange background */
	.action-btn {
		padding: 1rem 2.5rem;
		font-size: 1rem;
		font-weight: 600;
		border-radius: 50px;
		border: none;
		cursor: pointer;
		transition: all 0.3s ease;
		text-transform: capitalize;
		letter-spacing: 0.5px;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
		min-width: 180px;
		background: var(--orange);
		color: #000000;
	}

	.action-btn:hover {
		background: var(--orange-dark);
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(255, 166, 23, 0.4);
	}

	.action-btn:active {
		transform: translateY(0);
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.admin-landing {
			min-height: 100vh;
			padding: 1.5rem 1rem;
		}

		.logout-btn {
			padding: 0.6rem 1rem;
			font-size: 0.85rem;
		}

		.badge {
			font-size: 0.75rem;
			padding: 0.4rem 1rem;
			margin-bottom: 1.5rem;
		}

		.logo {
			height: 70px;
		}

		.description {
			font-size: 0.95rem;
			margin-bottom: 2rem;
		}

		.button-grid {
			flex-direction: column;
			width: 100%;
		}

		.action-btn {
			width: 100%;
			max-width: 300px;
		}
	}

	/* Animation delays - using existing app.css animations */
	.delay-200 {
		animation-delay: 0.2s;
		opacity: 0;
		animation-fill-mode: forwards;
	}

	.delay-400 {
		animation-delay: 0.4s;
		opacity: 0;
		animation-fill-mode: forwards;
	}

	.delay-600 {
		animation-delay: 0.6s;
		opacity: 0;
		animation-fill-mode: forwards;
	}

	.delay-800 {
		animation-delay: 0.8s;
		opacity: 0;
		animation-fill-mode: forwards;
	}

	.animate-slide-up {
		opacity: 0;
		animation-fill-mode: forwards;
	}
</style>
