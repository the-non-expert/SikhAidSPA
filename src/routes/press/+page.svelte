<script lang="ts">
  import Icon from '@iconify/svelte';
  import { pressArticles, categoryColors } from '$lib/data/articles';

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

<!-- Articles Grid Section -->
<section class="py-12 md:py-16 lg:py-24 bg-gray-50">
  <div class="container mx-auto px-4 md:px-8 lg:px-16">
    <!-- Section Header -->
    <!-- <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold text-navy-custom mb-4">
        Media Features
      </h2>
      <p class="text-gray-600 max-w-2xl mx-auto">
        {pressArticles.length} articles featuring our humanitarian initiatives and community impact
      </p>
    </div> -->

    <!-- Articles Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-6 lg:gap-6">
      {#each pressArticles as article, index}
        <article
          class="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl animate-fade-in"
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
                class="px-3 py-1 rounded-full text-xs font-semibold text-white shadow-md {categoryColors[article.category]}"
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
</style>
