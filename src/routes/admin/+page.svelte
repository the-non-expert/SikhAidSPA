<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';

	const adminName = 'Raunak';

	// Auth state
	let isAuthenticated = $state(false);
	let adminPassword = $state('');
	let adminError = $state('');
	let isLoading = $state(false);
	let showPassword = $state(false);

	onMount(() => {
		isAuthenticated = checkAuthentication();
	});

	function checkAuthentication() {
		if (!browser) return false;
		const cookies = document.cookie.split(';');
		const adminSession = cookies.find(c => c.trim().startsWith('admin_session='));
		if (adminSession) {
			const sessionValue = adminSession.split('=')[1];
			return sessionValue && sessionValue.startsWith('raunak_');
		}
		return false;
	}

	async function handleLogin(event: SubmitEvent) {
		event.preventDefault();

		if (!adminPassword.trim()) {
			adminError = 'Please enter password';
			return;
		}

		isLoading = true;
		adminError = '';

		if (adminPassword === 'Raunak@123') {
			document.cookie = `admin_session=raunak_${Date.now()}; max-age=3600; path=/; samesite=strict`;
			isAuthenticated = true;
			adminPassword = '';
		} else {
			adminError = 'Invalid password';
			isLoading = false;
		}
	}

	function navigateTo(path: string) {
		goto(path);
	}

	function handleLogout() {
		document.cookie = 'admin_session=; max-age=0; path=/';
		goto('/');
	}
</script>

{#if isAuthenticated}
<div class="admin-landing">
	<!-- Background with grid -->
	<div class="gradient-bg">
		<div class="grid-overlay"></div>
	</div>

	<!-- Content container -->
	<div class="content-container">
		<!-- Logout Button - Above badge -->
		<button onclick={handleLogout} class="logout-btn">
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
			<button onclick={() => navigateTo('/admin/formsubmissions')} class="action-btn">
				Form Submissions
			</button>
			<button onclick={() => navigateTo('/admin/blogs')} class="action-btn"> Blogs </button>
			<button onclick={() => navigateTo('/admin/campaigns')} class="action-btn">
				Campaigns
			</button>
			<button onclick={() => navigateTo('/admin/donations')} class="action-btn">
				Donations
			</button>
			<button onclick={() => navigateTo('/admin/content')} class="action-btn">
				Content Management
			</button>
		</div>
	</div>
</div>
{:else}
<!-- Login Dialog -->
<div class="login-container">
	<div class="gradient-bg">
		<div class="grid-overlay"></div>
	</div>

	<div class="login-card">
		<!-- Lock Icon with Gradient Circle -->
		<div class="lock-icon-wrapper">
			<Icon icon="mdi:lock" width="32" class="lock-icon-large" />
		</div>

		<h1 class="login-title">Admin Access</h1>
		<p class="login-subtitle">Enter your password to continue</p>

		<form onsubmit={handleLogin} class="login-form">
			<!-- Password Input with Toggle -->
			<div class="password-input-wrapper">
				<input
					type={showPassword ? 'text' : 'password'}
					bind:value={adminPassword}
					placeholder="Enter password"
					class="password-input"
					autofocus
					required
				/>
				<button
					type="button"
					class="password-toggle"
					onclick={() => showPassword = !showPassword}
					aria-label={showPassword ? 'Hide password' : 'Show password'}
				>
					<Icon icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'} width="20" />
				</button>
			</div>

			{#if adminError}
				<div class="error-message">
					<Icon icon="mdi:alert-circle" width="18" />
					{adminError}
				</div>
			{/if}

			<button
				type="submit"
				disabled={isLoading}
				class="submit-btn"
			>
				{#if isLoading}
					<Icon icon="mdi:loading" class="spinner" width="20" />
					Verifying...
				{:else}
					<Icon icon="mdi:shield-check" width="20" />
					Access Admin Panel
				{/if}
			</button>
		</form>

		<div class="session-info">
			<Icon icon="mdi:clock-outline" width="16" />
			<span>Session expires in 1 hour</span>
		</div>
	</div>
</div>
{/if}

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

	/* Login Container - Full Screen */
	.login-container {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		padding: 2rem;
	}

	/* Login Card - Centered Dialog */
	.login-card {
		position: relative;
		z-index: 10;
		background: white;
		border-radius: 24px;
		box-shadow: 0 25px 80px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.1);
		padding: 3.5rem 3rem;
		max-width: 460px;
		width: 100%;
		text-align: center;
		animation: slideUp 0.5s ease-out;
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Lock Icon Wrapper with Gradient */
	.lock-icon-wrapper {
		width: 80px;
		height: 80px;
		margin: 0 auto 1.5rem;
		background: linear-gradient(135deg, var(--navy) 0%, #3949ab 100%);
		border-radius: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 8px 24px rgba(26, 35, 126, 0.3);
		position: relative;
	}

	.lock-icon-wrapper::before {
		content: '';
		position: absolute;
		inset: -2px;
		background: linear-gradient(135deg, var(--orange) 0%, #ffd54f 100%);
		border-radius: 22px;
		z-index: -1;
		opacity: 0;
		transition: opacity 0.3s;
	}

	.login-card:hover .lock-icon-wrapper::before {
		opacity: 0.15;
	}

	.lock-icon-large {
		color: white;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
	}

	.login-title {
		font-size: 2.25rem;
		font-weight: 700;
		color: var(--navy);
		margin-bottom: 0.75rem;
		letter-spacing: -0.5px;
	}

	.login-subtitle {
		font-size: 1rem;
		color: #64748b;
		margin-bottom: 2.5rem;
		font-weight: 400;
	}

	.login-form {
		margin-bottom: 1.5rem;
	}

	/* Password Input Wrapper */
	.password-input-wrapper {
		position: relative;
		margin-bottom: 1rem;
	}

	.password-input {
		width: 100%;
		padding: 1rem 3rem 1rem 1.25rem;
		border: 2px solid #e2e8f0;
		border-radius: 12px;
		font-size: 1rem;
		transition: all 0.3s;
		background: #f8fafc;
	}

	.password-input:focus {
		outline: none;
		border-color: var(--navy);
		background: white;
		box-shadow: 0 0 0 4px rgba(26, 35, 126, 0.08);
	}

	.password-input::placeholder {
		color: #94a3b8;
	}

	/* Password Toggle Button */
	.password-toggle {
		position: absolute;
		right: 12px;
		top: 50%;
		transform: translateY(-50%);
		background: transparent;
		border: none;
		color: #64748b;
		cursor: pointer;
		padding: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		transition: all 0.2s;
	}

	.password-toggle:hover {
		color: var(--navy);
		background: rgba(26, 35, 126, 0.05);
	}

	.password-toggle:active {
		transform: translateY(-50%) scale(0.95);
	}

	.error-message {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.875rem 1.25rem;
		background: linear-gradient(135deg, #fef2f2 0%, #fff5f5 100%);
		border: 1.5px solid #fecaca;
		border-radius: 12px;
		color: #dc2626;
		font-size: 0.875rem;
		font-weight: 500;
		margin-bottom: 1rem;
		animation: shake 0.4s ease-in-out;
	}

	@keyframes shake {
		0%, 100% { transform: translateX(0); }
		25% { transform: translateX(-10px); }
		75% { transform: translateX(10px); }
	}

	.submit-btn {
		width: 100%;
		padding: 1rem 1.5rem;
		background: linear-gradient(135deg, var(--navy) 0%, #3949ab 100%);
		color: white;
		border: none;
		border-radius: 12px;
		font-size: 1.05rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.625rem;
		box-shadow: 0 4px 16px rgba(26, 35, 126, 0.25);
		position: relative;
		overflow: hidden;
	}

	.submit-btn::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
		transition: left 0.5s;
	}

	.submit-btn:hover::before {
		left: 100%;
	}

	.submit-btn:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(26, 35, 126, 0.35);
	}

	.submit-btn:active:not(:disabled) {
		transform: translateY(0);
	}

	.submit-btn:disabled {
		opacity: 0.7;
		cursor: not-allowed;
		transform: none;
	}

	.spinner {
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}

	.session-info {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		font-size: 0.8rem;
		color: #94a3b8;
		margin-top: 1.75rem;
		padding: 0.75rem;
		background: #f8fafc;
		border-radius: 8px;
		font-weight: 500;
	}

	/* Mobile adjustments for login */
	@media (max-width: 640px) {
		.login-card {
			padding: 2.5rem 1.75rem;
			border-radius: 20px;
		}

		.lock-icon-wrapper {
			width: 70px;
			height: 70px;
			border-radius: 18px;
		}

		.lock-icon-large {
			width: 28px;
		}

		.login-title {
			font-size: 1.875rem;
		}

		.login-subtitle {
			font-size: 0.9rem;
		}

		.password-input {
			padding: 0.875rem 3rem 0.875rem 1rem;
			font-size: 0.95rem;
		}

		.submit-btn {
			padding: 0.875rem 1.25rem;
			font-size: 0.975rem;
		}

		.session-info {
			font-size: 0.75rem;
		}
	}
</style>
