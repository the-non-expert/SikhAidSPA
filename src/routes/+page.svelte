<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import CampaignCarousel from '$lib/components/CampaignCarousel.svelte';
	import MissionVisionSection from '$lib/components/home/MissionVisionSection.svelte';
	import HowWeRespondSection from '$lib/components/home/HowWeRespondSection.svelte';
	import PartnersCarousel from '$lib/components/PartnersCarousel.svelte';
	import SupportSection from '$lib/components/SupportSection.svelte';
	import CurrentCampaignSection from '$lib/components/home/CurrentCampaignSection.svelte';
	import TestimonialsSection from '$lib/components/home/TestimonialsSection.svelte';
	import PaymentMethodsStrip from '$lib/components/home/PaymentMethodsStrip.svelte';
	import RecentBlogSection from '$lib/components/home/RecentBlogSection.svelte';
	import CallToActionSection from '$lib/components/home/CallToActionSection.svelte';
</script>

<svelte:head>
	<title>SikhAid Charitable Trust - Serving India in Times of Crisis</title>
	<meta name="description" content="SikhAid provides immediate humanitarian aid and disaster relief across India. From natural disasters to community emergencies, we serve with compassion and transparency since 2020." />
</svelte:head>

<main class="scroll-smooth pt-20">
	<!-- Hero Section -->
	<Hero />

	<!-- Campaign Carousel Section -->
	<CampaignCarousel />

	<!-- Mission & Vision Section -->
	<MissionVisionSection />

	<!-- How We Respond Section -->
	<HowWeRespondSection />

	<!-- Partners Section -->
	<PartnersCarousel />

	<!-- Support Section -->
	<SupportSection />

	<!-- Current Campaign Section -->
	<CurrentCampaignSection />

	<!-- Testimonials Section -->
	<TestimonialsSection />

	<!-- Payment Methods Strip -->
	<PaymentMethodsStrip />

	<!-- Recent Blog Posts -->
	<RecentBlogSection />

	<!-- Call to Action -->
	<CallToActionSection />
</main>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}

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
</style>