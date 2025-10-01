<script lang="ts">
	import type { Campaign } from '$lib/types/campaign';

	interface Props {
		campaign: Campaign;
		position: number;
		isActive: boolean;
		onClick?: () => void;
	}

	let { campaign, position, isActive, onClick }: Props = $props();

	// Calculate transform based on position relative to center
	function getCardStyle(pos: number) {
		// Center card (position 0)
		if (pos === 0) {
			return {
				transform: 'translateX(0) scale(1) translateZ(0)',
				opacity: 1,
				zIndex: 50,
				filter: 'grayscale(0%)'
			};
		}

		// Side cards
		const absPos = Math.abs(pos);
		const direction = pos > 0 ? 1 : -1;

		// TIGHTER SPACING - Reduced from 350px to 180px for closer stacking
		const translateX = direction * (180 * absPos);

		// Scale decreases as we move away from center
		const scale = Math.max(0.75, 1 - absPos * 0.12);

		// Keep full opacity - cards are solid, only grayscale difference
		const opacity = 1;

		// Z-index decreases for cards further away
		const zIndex = Math.max(10, 50 - absPos * 10);

		// GRAYSCALE on inactive cards
		const filter = 'grayscale(100%)';

		return {
			transform: `translateX(${translateX}px) scale(${scale})`,
			opacity,
			zIndex,
			filter
		};
	}

	const cardStyle = $derived(getCardStyle(position));
</script>

<button
	type="button"
	class="campaign-card"
	class:active={isActive}
	style="transform: {cardStyle.transform}; opacity: {cardStyle.opacity}; z-index: {cardStyle.zIndex}; filter: {cardStyle.filter};"
	onclick={onClick}
	aria-label="View {campaign.title}"
>
	<!-- Card Container with 4:3 Aspect Ratio -->
	<div class="card-inner">
		<!-- Background Image -->
		<img src={campaign.image} alt={campaign.title} class="card-image" />

		<!-- Gradient Overlay -->
		<div class="card-overlay"></div>

		<!-- Content -->
		<div class="card-content">
			<!-- Category Badge -->
			<div class="category-badge">
				<span class="category-text">{campaign.category}</span>
			</div>

			<!-- Title -->
			<h3 class="card-title">{campaign.title}</h3>

			<!-- View Campaign Button -->
			<div class="card-button-wrapper">
				<span class="card-button">View Campaign</span>
			</div>
		</div>
	</div>
</button>

<style>
	.campaign-card {
		position: absolute;
		width: 400px;
		height: 300px;
		left: 50%;
		top: 0;
		margin-left: -200px;
		cursor: pointer;
		transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
		transform-origin: center center;
		will-change: transform, opacity, filter;
	}

	.campaign-card:focus {
		outline: 2px solid #ff6b35;
		outline-offset: 4px;
	}

	.card-inner {
		position: relative;
		width: 100%;
		height: 100%;
		border-radius: 24px;
		overflow: hidden;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
		transition: box-shadow 0.3s ease;
	}

	.campaign-card:hover .card-inner {
		box-shadow: 0 25px 70px rgba(0, 0, 0, 0.4);
	}

	.campaign-card.active .card-inner {
		box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
	}

	/* Card Image */
	.card-image {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		transition: transform 0.3s ease;
	}

	.campaign-card:hover .card-image {
		transform: scale(1.05);
	}

	/* Gradient Overlay */
	.card-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0.1) 0%,
			rgba(0, 0, 0, 0.3) 50%,
			rgba(0, 0, 0, 0.7) 100%
		);
		pointer-events: none;
	}

	/* Card Content */
	.card-content {
		position: absolute;
		inset: 0;
		padding: 24px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		z-index: 10;
	}

	/* Category Badge */
	.category-badge {
		background: #ff6b35;
		padding: 8px 20px;
		border-radius: 24px;
		backdrop-filter: blur(8px);
	}

	.category-text {
		font-size: 14px;
		font-weight: 600;
		color: white;
		text-transform: capitalize;
		letter-spacing: 0.5px;
	}

	/* Card Title */
	.card-title {
		font-size: 28px;
		font-weight: 700;
		color: white;
		line-height: 1.2;
		text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
		max-width: 90%;
		margin: 0;
	}

	/* View Campaign Button */
	.card-button-wrapper {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.card-button {
		background: rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(10px);
		color: white;
		font-weight: 600;
		padding: 12px 32px;
		border-radius: 12px;
		transition: all 0.3s ease;
		border: 1px solid rgba(255, 255, 255, 0.3);
	}

	.campaign-card:hover .card-button {
		background: rgba(255, 255, 255, 0.3);
		transform: translateY(-2px);
	}

	.campaign-card.active .card-button {
		background: rgba(255, 255, 255, 0.25);
	}

	/* Responsive Styles */
	@media (max-width: 1024px) {
		.campaign-card {
			width: 350px;
			height: 262.5px;
			margin-left: -175px;
		}

		.card-title {
			font-size: 24px;
		}

		.card-content {
			padding: 20px;
		}
	}

	@media (max-width: 640px) {
		.campaign-card {
			width: 300px;
			height: 225px;
			margin-left: -150px;
		}

		.card-title {
			font-size: 20px;
		}

		.category-text {
			font-size: 12px;
		}

		.card-content {
			padding: 16px;
		}

		.card-button {
			padding: 10px 24px;
			font-size: 14px;
		}
	}
</style>
