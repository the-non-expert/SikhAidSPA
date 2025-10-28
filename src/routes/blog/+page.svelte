<script lang="ts">
	import { onMount } from 'svelte';
	import { getPublishedBlogs } from '$lib/firestore';
	import type { Blog } from '$lib/types/blog';

	// Get all published blog posts from Firestore
	let blogPosts = $state<Blog[]>([]);
	let loading = $state(true);

	onMount(async () => {
		try {
			blogPosts = await getPublishedBlogs();
		} catch (error) {
			console.error('Error loading blogs:', error);
		} finally {
			loading = false;
		}
	});

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>Blog - SikhAid Charitable Trust</title>
	<meta name="description" content="Read our latest updates on disaster relief efforts across India, impact stories, transparency reports, and insights from SikhAid Charitable Trust." />
</svelte:head>

<main class="pt-32 min-h-screen">
	<!-- Hero Section -->
	<section class="py-16 px-4 bg-navy text-white">
		<div class="max-w-6xl mx-auto text-center">
			<h1 class="text-4xl md:text-6xl font-bold mb-6">Our Stories</h1>
			<p class="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
				Stories of hope, impact, and transformation from across India
			</p>
		</div>
	</section>

	<!-- Featured Post -->
	<section class="py-16 px-4 bg-gray-50">
		<div class="max-w-6xl mx-auto">
			{#if loading}
				<div class="bg-white rounded-lg shadow-xl p-12 text-center">
					<p class="text-gray-600">Loading blog posts...</p>
				</div>
			{:else if blogPosts.length > 0}
				<div class="bg-white rounded-lg shadow-xl overflow-hidden">
					<div class="md:flex">
						<div class="md:w-1/2">
							<img src={blogPosts[0].image} alt={blogPosts[0].title} class="w-full h-64 md:h-full object-cover" />
						</div>
						<div class="md:w-1/2 p-8">
							<div class="uppercase tracking-wide text-sm text-navy font-semibold mb-2">Featured Post</div>
							<h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
								<a href="/blog/{blogPosts[0].slug}" class="hover:text-navy transition-colors">
									{blogPosts[0].title}
								</a>
							</h2>
							<p class="text-gray-600 mb-4 leading-relaxed">{blogPosts[0].excerpt}</p>
							<div class="flex items-center justify-between text-sm text-gray-500 mb-4">
								<span>{blogPosts[0].publishedAt ? formatDate(blogPosts[0].publishedAt) : ''}</span>
								<span>{blogPosts[0].readTime || ''}</span>
							</div>
							<a
								href="/blog/{blogPosts[0].slug}"
								class="inline-block bg-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-navy-dark transition-colors"
							>
								Read More →
							</a>
						</div>
					</div>
				</div>
			{:else}
				<div class="bg-white rounded-lg shadow-xl p-12 text-center">
					<p class="text-gray-600">No blog posts available yet.</p>
				</div>
			{/if}
		</div>
	</section>

	<!-- Blog Posts Grid -->
	<section class="py-16 px-4 bg-white">
		<div class="max-w-6xl mx-auto">
			<h2 class="text-3xl md:text-4xl font-bold text-navy mb-12 text-center">Recent Posts</h2>

			{#if loading}
				<div class="text-center py-12">
					<p class="text-gray-600">Loading recent posts...</p>
				</div>
			{:else if blogPosts.length > 1}
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{#each blogPosts.slice(1) as post}
						<article class="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
							<img src={post.image} alt={post.title} class="w-full h-48 object-cover" />

							<div class="p-6">
								<div class="flex items-center justify-between mb-3">
									<span class="text-xs font-semibold text-white bg-orange-custom px-2 py-1 rounded">
										{post.category}
									</span>
									<span class="text-xs text-gray-500">{post.readTime || ''}</span>
								</div>

								<h3 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
									<a href="/blog/{post.slug}" class="hover:text-navy transition-colors">
										{post.title}
									</a>
								</h3>

								<p class="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

								<div class="flex items-center justify-between">
									<span class="text-xs text-gray-500">{post.publishedAt ? formatDate(post.publishedAt) : ''}</span>
									<a
										href="/blog/{post.slug}"
										class="text-navy font-semibold text-sm hover:underline"
									>
										Read More →
									</a>
								</div>
							</div>
						</article>
					{/each}
				</div>
			{/if}
		</div>
	</section>

	<!-- Newsletter Signup -->
	<section class="py-16 px-4 bg-navy text-white">
		<div class="max-w-4xl mx-auto text-center">
			<h2 class="text-3xl md:text-4xl font-bold mb-6">Stay Updated</h2>
			<p class="text-xl text-gray-200 mb-8">
				Subscribe to our newsletter for the latest updates on our relief efforts and impact stories.
			</p>

			<div class="max-w-md mx-auto">
				<div class="flex flex-col sm:flex-row gap-4">
					<input
						type="email"
						placeholder="Enter your email address"
						class="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-custom"
					/>
					<button class="bg-orange-custom hover:bg-orange-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors">
						Subscribe
					</button>
				</div>
				<p class="text-xs text-gray-300 mt-3">
					We respect your privacy. Unsubscribe at any time.
				</p>
			</div>
		</div>
	</section>
</main>

<style>
	:global(:root) {
		--navy: #1a237e;
		--navy-dark: #0d1660;
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

	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>