<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let isAuthenticated = false;
	let adminName = 'Raunak Singh';

	function checkAuthentication() {
		if (!browser) return false;

		const cookies = document.cookie.split(';');
		const adminSession = cookies.find(cookie => 
			cookie.trim().startsWith('admin_session=')
		);

		if (adminSession) {
			const sessionValue = adminSession.split('=')[1];
			if (sessionValue && sessionValue.startsWith('raunak_')) {
				return true;
			}
		}
		return false;
	}

	function handleLogout() {
		// Clear the session cookie
		document.cookie = 'admin_session=; max-age=0; path=/';
		goto('/');
	}

	onMount(() => {
		isAuthenticated = checkAuthentication();
		if (!isAuthenticated && $page.url.pathname !== '/admin') {
			// Redirect child routes to /admin for login
			goto('/admin');
		}
	});
</script>

<svelte:head>
	<title>Admin Panel - SikhAid Charitable Trust</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

{#if isAuthenticated || $page.url.pathname === '/admin'}
	<!-- Main Content - No Header -->
	<slot />
{/if}

<style>
	:global(:root) {
		--navy: #1a237e;
		--navy-dark: #0d1660;
		--orange: #FFA617;
		--orange-dark: #e89500;
	}

	.text-navy {
		color: var(--navy);
	}

	.bg-navy {
		background-color: var(--navy);
	}

	.hover\:bg-navy-dark:hover {
		background-color: var(--navy-dark);
	}

	.text-orange-custom {
		color: var(--orange);
	}

	.hover\:text-orange-custom:hover {
		color: var(--orange);
	}

	.focus\:ring-navy:focus {
		--tw-ring-color: var(--navy);
	}
</style>
