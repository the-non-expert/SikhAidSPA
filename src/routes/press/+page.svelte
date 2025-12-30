<script lang="ts">
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';
  import { getActivePressItems, type FirestorePressItem } from '$lib/firestore';
  import { categoryColors } from '$lib/types/press';

  // Tab state
  let activeTab = $state<'articles' | 'videos'>('articles');

  // Data
  let pressItems: FirestorePressItem[] = $state([]);
  let loading = $state(true);

  // Derived filtered data
  const articles = $derived(pressItems.filter(item => item.type === 'article'));
  const videos = $derived(pressItems.filter(item => item.type === 'video'));
  const displayedItems = $derived(activeTab === 'articles' ? articles : videos);

  // Video player state (for facade pattern)
  let playingVideoId = $state<string | null>(null);

  /**
   * Format date for display
   * Handles both full dates (2025-10-15) and partial dates (2025-10)
   */
  function formatDate(dateString: string): string {
    const parts = dateString.split('-');

    if (parts.length === 3) {
      // Full date: YYYY-MM-DD
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } else if (parts.length === 2) {
      // Partial date: YYYY-MM
      const [year, month] = parts;
      const date = new Date(`${year}-${month}-01`);
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short'
      });
    }

    return dateString;
  }

  // Get category badge color
  function getCategoryColor(category: string): string {
    return categoryColors[category] || categoryColors['default'];
  }

  // Play video (facade pattern)
  function playVideo(youtubeId: string) {
    playingVideoId = youtubeId;
  }

  // Load data on mount
  onMount(async () => {
    try {
      loading = true;
      pressItems = await getActivePressItems();
    } catch (error) {
      console.error('Error loading press coverage:', error);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Press Coverage - Sikh Aid Charitable Trust</title>
  <meta name="description" content="Media coverage of Sikh Aid Charitable Trust's humanitarian work across India. Read about our impact in disaster relief, community service, and social initiatives." />
  <meta property="og:title" content="Press Coverage - Sikh Aid" />
  <meta property="og:description" content="Discover how Sikh Aid's humanitarian efforts are making headlines across India." />
</svelte:head>

<main class="pt-32 min-h-screen">
<!-- Hero Section with Grid Pattern -->
<section class="hero-section py-16 md:py-20 lg:py-24 px-4 text-white relative overflow-hidden">
  <!-- Grid Pattern Overlay -->
  <div class="grid-pattern"></div>

  <div class="max-w-6xl mx-auto text-center relative z-10">
    <h1 class="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
      Press Coverage
    </h1>

    <!-- Breadcrumb -->
    <nav class="text-sm md:text-base mb-4 animate-fade-in delay-200" aria-label="Breadcrumb">
      <a href="/" class="hover:text-orange-custom transition-colors">Home</a>
      <span class="mx-2">/</span>
      <span class="text-orange-custom">Press Coverage</span>
    </nav>

    <p class="text-base md:text-lg text-gray-200 max-w-3xl mx-auto animate-fade-in delay-400">
      Discover how Sikh Aid Charitable Trust's humanitarian efforts are recognized across national media. From celebrity partnerships to grassroots impact, our work continues to make headlines.
    </p>
  </div>
</section>

<!-- Tabbed Navigation -->
<section class="bg-gray-50 border-b border-gray-200">
  <div class="max-w-6xl mx-auto px-4">
    <div class="flex justify-center gap-0">
      <button
        type="button"
        class="tab-button {activeTab === 'articles' ? 'active' : ''}"
        onclick={() => activeTab = 'articles'}
      >
        Articles ({articles.length})
      </button>
      <button
        type="button"
        class="tab-button {activeTab === 'videos' ? 'active' : ''}"
        onclick={() => activeTab = 'videos'}
      >
        Videos ({videos.length})
      </button>
    </div>
  </div>
</section>

<!-- Content Display -->
<section class="py-12 md:py-16 lg:py-24 bg-gray-50">
  <div class="container mx-auto px-4 md:px-8 lg:px-16">
    {#if loading}
      <div class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-custom mx-auto mb-4"></div>
        <p class="text-gray-600">Loading press coverage...</p>
      </div>
    {:else if displayedItems.length === 0}
      <div class="text-center py-12">
        <p class="text-gray-600 text-lg">No {activeTab} available at the moment.</p>
      </div>
    {:else}
      <!-- Articles Grid (4 columns) -->
      {#if activeTab === 'articles'}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-6 lg:gap-6">
          {#each displayedItems as article, index}
            <article
              class="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl animate-fade-in card-solid-bg"
              style="animation-delay: {index * 100}ms"
            >
              <!-- Article Image -->
              <div class="relative h-48 overflow-hidden bg-gray-200">
                <img
                  src={article.image}
                  alt={article.title}
                  class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  loading="lazy"
                />

                <!-- Category Badge -->
                <div class="absolute top-4 left-4">
                  <span
                    class="px-3 py-1 rounded-full text-xs font-semibold text-white shadow-md {getCategoryColor(article.category)}"
                  >
                    {article.category}
                  </span>
                </div>
              </div>

              <!-- Article Content -->
              <div class="p-6">
                <!-- Title -->
                <h3 class="text-xl font-bold text-navy-custom mb-3 line-clamp-2 min-h-[3.5rem]">
                  {article.title}
                </h3>

                <!-- Description -->
                <p class="text-gray-600 text-sm mb-4 line-clamp-3 min-h-[4rem]">
                  {article.description}
                </p>

                <!-- Meta Info -->
                <div class="flex items-center justify-between mb-4">
                  <time datetime={article.publishedDate} class="text-xs text-gray-500 flex items-center">
                    <Icon icon="mdi:calendar" class="mr-1" />
                    {formatDate(article.publishedDate)}
                  </time>
                </div>

                <!-- Read More Button -->
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-center w-full bg-orange-custom hover:bg-orange-dark text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300"
                  aria-label="Read {article.title} on external site"
                >
                  Read More
                  <Icon icon="mdi:arrow-right" class="ml-2" />
                </a>
              </div>
            </article>
          {/each}
        </div>
      {/if}

      <!-- Videos Grid (2-3 columns responsive) -->
      {#if activeTab === 'videos'}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {#each displayedItems as video, index}
            <article
              class="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl animate-fade-in card-solid-bg"
              style="animation-delay: {index * 100}ms"
            >
              <!-- Video Thumbnail/Player -->
              <div class="relative h-64 overflow-hidden bg-gray-200">
                {#if playingVideoId === video.youtubeId}
                  <!-- YouTube iframe (loaded on demand) -->
                  <iframe
                    src="https://www.youtube.com/embed/{video.youtubeId}?autoplay=1"
                    title={video.title}
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    class="w-full h-full"
                  ></iframe>
                {:else}
                  <!-- YouTube Thumbnail (facade pattern for performance) -->
                  <img
                    src="https://img.youtube.com/vi/{video.youtubeId}/hqdefault.jpg"
                    alt={video.title}
                    class="w-full h-full object-cover"
                    loading="lazy"
                  />

                  <!-- Play Button Overlay -->
                  <button
                    onclick={() => playVideo(video.youtubeId!)}
                    class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50 transition-all group"
                    aria-label="Play {video.title}"
                  >
                    <div class="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Icon icon="mdi:play" class="text-white text-4xl ml-1" />
                    </div>
                  </button>

                  <!-- Category Badge -->
                  <div class="absolute top-4 left-4">
                    <span
                      class="px-3 py-1 rounded-full text-xs font-semibold text-white shadow-md {getCategoryColor(video.category)} flex items-center gap-1"
                    >
                      <Icon icon="mdi:video" class="text-sm" />
                      {video.category}
                    </span>
                  </div>
                {/if}
              </div>

              <!-- Video Content -->
              <div class="p-6">
                <!-- Title -->
                <h3 class="text-xl font-bold text-navy-custom mb-3 line-clamp-2 min-h-[3.5rem]">
                  {video.title}
                </h3>

                <!-- Description -->
                <p class="text-gray-600 text-sm mb-4 line-clamp-3 min-h-[4rem]">
                  {video.description}
                </p>

                <!-- Meta Info -->
                <div class="flex items-center justify-between mb-4">
                  <time datetime={video.publishedDate} class="text-xs text-gray-500 flex items-center">
                    <Icon icon="mdi:calendar" class="mr-1" />
                    {formatDate(video.publishedDate)}
                  </time>
                </div>

                <!-- Watch on YouTube Button -->
                <a
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-center w-full bg-orange-custom hover:bg-orange-dark text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300"
                  aria-label="Watch {video.title} on YouTube"
                >
                  <Icon icon="mdi:youtube" class="mr-2 text-xl" />
                  Watch on YouTube
                </a>
              </div>
            </article>
          {/each}
        </div>
      {/if}
    {/if}

    <!-- Bottom CTA -->
    <div class="text-center mt-16">
      <p class="text-gray-600 mb-6">
        Want to feature our story or collaborate?
      </p>
      <a
        href="/contact"
        class="inline-flex items-center bg-navy hover:bg-navy-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
      >
        <Icon icon="mdi:email" class="mr-2 text-xl" />
        Contact Us
      </a>
    </div>
  </div>
</section>
</main>

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

  .text-navy-custom {
    color: var(--navy);
  }

  .bg-orange-custom {
    background-color: var(--orange);
  }

  .text-orange-custom {
    color: var(--orange);
  }

  .hover\:text-orange-custom:hover {
    color: var(--orange);
  }

  .hover\:bg-orange-dark:hover {
    background-color: var(--orange-dark);
  }

  .bg-orange-dark {
    background-color: var(--orange-dark);
  }

  /* Hero Section with Grid Pattern */
  .hero-section {
    background-color: var(--navy);
    position: relative;
  }

  .grid-pattern {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.4;
    background-image:
      /* Vertical lines */
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 49px,
        rgba(255, 255, 255, 0.1) 49px,
        rgba(255, 255, 255, 0.1) 50px
      ),
      /* Horizontal lines */
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 49px,
        rgba(255, 255, 255, 0.1) 49px,
        rgba(255, 255, 255, 0.1) 50px
      );
    background-size: 50px 50px;
  }

  /* Tabbed Navigation */
  .tab-button {
    padding: 16px 32px;
    font-size: 16px;
    font-weight: 500;
    color: #6b7280;
    background: transparent;
    border: none;
    border-bottom: 3px solid transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
  }

  .tab-button:hover {
    color: var(--navy);
  }

  .tab-button.active {
    color: var(--orange);
    border-bottom-color: var(--orange);
    font-weight: 600;
  }

  /* Responsive tab buttons */
  @media (max-width: 640px) {
    .tab-button {
      padding: 12px 20px;
      font-size: 14px;
    }
  }

  /* Line clamp utilities for text truncation */
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

  /* Ensure consistent card heights */
  article {
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  article:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  article > div:last-child {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  article > div:last-child > a {
    margin-top: auto;
  }

  /* Category badge colors */
  .bg-purple-600 {
    background-color: #9333ea;
  }

  .bg-red-600 {
    background-color: #dc2626;
  }

  .bg-gray-600 {
    background-color: #4b5563;
  }
</style>
