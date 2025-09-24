<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { getBlogBySlug, getAllBlogs } from '$lib/data/blogs.js';

	let currentPost = null;
	let slug = '';
	let relatedPosts = [];

	onMount(() => {
		slug = $page.params.slug;
		currentPost = getBlogBySlug(slug);

		if (!currentPost) {
			goto('/blog');
		} else {
			// Get 2 related posts (excluding current one)
			relatedPosts = allBlogs
				.filter(post => post.slug !== slug)
				.slice(0, 2);
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

{#if currentPost}
	<svelte:head>
		<title>{currentPost.title} - Sikh Aid Blog</title>
		<meta name="description" content={currentPost.title} />
	</svelte:head>

	<Header />

	<main class="pt-32 min-h-screen">
		<!-- Hero Section -->
		<section class="py-16 px-4 bg-gray-50">
			<div class="max-w-4xl mx-auto">
				<nav class="text-sm text-gray-600 mb-6">
					<a href="/" class="hover:text-navy">Home</a>
					<span class="mx-2">→</span>
					<a href="/blog" class="hover:text-navy">Blog</a>
					<span class="mx-2">→</span>
					<span class="text-gray-900">{currentPost.title}</span>
				</nav>

				<div class="bg-white rounded-lg shadow-xl overflow-hidden">
					<img src={currentPost.image} alt={currentPost.title} class="w-full h-64 md:h-96 object-cover" />

					<div class="p-8">
						<div class="flex items-center gap-4 mb-4 text-sm text-gray-600">
							<span class="bg-navy text-white px-3 py-1 rounded-full text-xs">{currentPost.category}</span>
							<span>{formatDate(currentPost.date)}</span>
							<span>{currentPost.readTime}</span>
							<span>By {currentPost.author}</span>
						</div>

						<h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{currentPost.title}</h1>
					</div>
				</div>
			</div>
		</section>

		<!-- Article Content -->
		<section class="py-16 px-4">
			<div class="max-w-4xl mx-auto">
				<div class="bg-white rounded-lg shadow-lg p-8">
					<article class="prose prose-lg max-w-none">
						{@html currentPost.content}
					</article>

					<!-- Share & CTA -->
					<div class="mt-12 pt-8 border-t border-gray-200">
						<div class="flex flex-col md:flex-row items-center justify-between gap-6">
							<div>
								<h3 class="text-xl font-bold text-gray-900 mb-2">Help Us Continue Our Work</h3>
								<p class="text-gray-600">Your donation can make a real difference in flood victims' lives.</p>
							</div>
							<a
								href="/donate"
								class="bg-navy hover:bg-navy-dark text-white font-semibold px-8 py-4 rounded-lg transition-colors"
							>
								Donate Now
							</a>
						</div>
					</div>
				</div>

				<!-- Related Posts -->
				{#if relatedPosts.length > 0}
					<div class="mt-16">
						<h2 class="text-2xl font-bold text-gray-900 mb-8">More from Our Blog</h2>
						<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
							{#each relatedPosts as post}
								<article class="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
									<img src={post.image} alt={post.title} class="w-full h-48 object-cover" />
									<div class="p-6">
										<span class="text-xs font-semibold text-white bg-orange-custom px-2 py-1 rounded">
											{post.category}
										</span>
										<h3 class="text-lg font-bold text-gray-900 mt-3 mb-2">
											<a href="/blog/{post.slug}" class="hover:text-orange-custom transition-colors">
												{post.title}
											</a>
										</h3>
										<p class="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
										<div class="flex items-center justify-between text-sm text-gray-500">
											<span>{formatDate(post.date)}</span>
											<span>{post.readTime}</span>
										</div>
									</div>
								</article>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</section>
	</main>

	<Footer />
{:else}
	<div class="min-h-screen flex items-center justify-center">
		<div class="text-center">
			<h1 class="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
			<a href="/blog" class="text-navy hover:underline">← Back to Blog</a>
		</div>
	</div>
{/if}

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

	:global(.prose h2) {
		color: var(--navy);
		font-size: 1.5rem;
		font-weight: bold;
		margin-top: 2rem;
		margin-bottom: 1rem;
	}

	:global(.prose h3) {
		color: var(--navy);
		font-size: 1.25rem;
		font-weight: 600;
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
	}

	:global(.prose h4) {
		color: var(--navy);
		font-size: 1.125rem;
		font-weight: 600;
		margin-top: 1.25rem;
		margin-bottom: 0.5rem;
	}

	:global(.prose ul) {
		list-style-type: disc;
		padding-left: 1.5rem;
		margin-bottom: 1rem;
	}

	:global(.prose li) {
		margin-bottom: 0.5rem;
	}

	:global(.prose blockquote) {
		border-left: 4px solid var(--navy);
		padding-left: 1rem;
		margin: 1.5rem 0;
		font-style: italic;
		background-color: #f8fafc;
		padding: 1rem;
		border-radius: 0.375rem;
	}

	:global(.prose p) {
		margin-bottom: 1rem;
		line-height: 1.7;
	}
</style>