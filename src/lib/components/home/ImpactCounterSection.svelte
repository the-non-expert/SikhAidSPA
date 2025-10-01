<script lang="ts">
	import { onMount } from 'svelte';

	let sectionElement: HTMLElement;
	let displayNumber = 0;
	let animationStarted = false;

	const targetNumber = 8000000;
	const animationDuration = 2500; // 2.5 seconds

	function animateCounter() {
		if (animationStarted) return;
		animationStarted = true;

		const startTime = Date.now();
		const startNumber = 0;

		function updateNumber() {
			const currentTime = Date.now();
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / animationDuration, 1);

			// Easing function for smooth animation
			const easeOutCubic = 1 - Math.pow(1 - progress, 3);

			displayNumber = Math.floor(startNumber + (targetNumber * easeOutCubic));

			if (progress < 1) {
				requestAnimationFrame(updateNumber);
			} else {
				displayNumber = targetNumber;
			}
		}

		requestAnimationFrame(updateNumber);
	}

	function formatNumber(num: number): string {
		if (num >= 1000000) {
			return (num / 1000000).toFixed(0) + ',000,000+';
		}
		return num.toLocaleString() + '+';
	}

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !animationStarted) {
						animateCounter();
					}
				});
			},
			{ threshold: 0.5 }
		);

		if (sectionElement) {
			observer.observe(sectionElement);
		}

		return () => {
			if (sectionElement) {
				observer.unobserve(sectionElement);
			}
		};
	});
</script>

<!-- Impact Counter Section -->
<section bind:this={sectionElement} class="py-16 px-4 bg-white">
	<div class="max-w-4xl mx-auto text-center">
		<h2 class="text-lg md:text-xl font-medium text-orange-custom mb-4 italic">
			Our Focus Areas
		</h2>

		<h3 class="text-2xl md:text-3xl font-bold text-navy mb-6">
			Total lives impacted
		</h3>

		<div class="text-5xl md:text-6xl lg:text-7xl font-bold text-navy">
			{formatNumber(displayNumber)}
		</div>
	</div>
</section>

<style>
	:global(:root) {
		--navy: #1a237e;
		--orange: #FFA617;
	}

	.text-navy {
		color: var(--navy);
	}

	.text-orange-custom {
		color: var(--orange);
	}
</style>