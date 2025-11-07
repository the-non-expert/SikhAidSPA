<script lang="ts">
	import { getRecentBlogs } from '$lib/data/blogs.js';

	// Get recent blog posts from data file
	const recentPosts = getRecentBlogs(3);
</script>

<!-- Recent Blog Posts -->
<section class="py-16 px-4 bg-white">
	<div class="max-w-6xl mx-auto">
		<div class="flex items-center justify-between mb-12">
			<h2 class="text-3xl md:text-4xl font-bold text-navy">Latest Updates</h2>
			<a href="/blog" class="text-navy font-semibold hover:underline">View All Posts →</a>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			{#each recentPosts as post}
				<article class="rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden card-solid-bg">
					<div class="p-6">
						<div class="text-xs font-semibold text-white bg-orange-custom px-2 py-1 rounded mb-3 inline-block">
							{post.category}
						</div>

						<h3 class="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
							<a href="/blog/{post.slug}" class="hover:text-navy transition-colors">
								{post.title}
							</a>
						</h3>

						<p class="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

						<div class="flex items-center justify-between">
							<span class="text-xs text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
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
	</div>
</section>

<style>
	:global(:root) {
		--navy: #1a237e;
		--orange: #ff6b35;
	}

	.text-navy {
		color: var(--navy);
	}

	.bg-orange-custom {
		background-color: var(--orange);
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