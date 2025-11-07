<script lang="ts">
	let hoveredCard: 'mission' | 'vision' | null = $state(null);
</script>

<!-- Mission & Vision Section -->
<section class="py-10 px-4 bg-gray-50">
	<div class="max-w-6xl mx-auto">
		<div class="text-center mb-16">
			<h2 class="text-3xl md:text-4xl font-bold text-navy mb-6">Our Purpose</h2>
			<p class="text-xl text-gray-700 max-w-3xl mx-auto">Guided by compassion and driven by service</p>
		</div>

		<div class="purpose-container">
			<!-- Mission Card -->
			<div
				class="purpose-card mission-card {hoveredCard === 'mission' ? 'expanded' : hoveredCard === 'vision' ? 'shrunk' : ''}"
				onmouseenter={() => hoveredCard = 'mission'}
				onmouseleave={() => hoveredCard = null}
			>
				<!-- Background Image -->
				<div class="card-bg" style="background-image: url('https://i.ibb.co/zWNmNZhN/Blanket-Main.png');"></div>

				<!-- Dark overlay -->
				<div class="card-overlay"></div>

				<!-- Color fill (slides in from left) -->
				<div class="color-fill orange-fill"></div>

				<!-- Content -->
				<div class="card-content">
					<div class="card-header">
						<div class="icon-circle orange-circle">
							<svg class="icon" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
							</svg>
						</div>
						<h3 class="card-title">Our Mission</h3>
					</div>

					<p class="card-description">
						To provide immediate humanitarian aid and disaster relief to communities across India during times of crisis.
						We serve with compassion, dignity, and unwavering commitment to those who need help the most.
					</p>

					<ul class="card-list">
						<li class="list-item">
							<div class="bullet orange-bullet"></div>
							<span>Rapid emergency response within 24 hours</span>
						</li>
						<li class="list-item">
							<div class="bullet orange-bullet"></div>
							<span>Community-centered relief and rehabilitation</span>
						</li>
						<li class="list-item">
							<div class="bullet orange-bullet"></div>
							<span>100% transparent fund utilization</span>
						</li>
					</ul>
				</div>
			</div>

			<!-- Vision Card -->
			<div
				class="purpose-card vision-card {hoveredCard === 'vision' ? 'expanded' : hoveredCard === 'mission' ? 'shrunk' : ''}"
				onmouseenter={() => hoveredCard = 'vision'}
				onmouseleave={() => hoveredCard = null}
			>
				<!-- Background Image -->
				<div class="card-bg" style="background-image: url('https://i.ibb.co/9kkX22Tz/151.png');"></div>

				<!-- Dark overlay -->
				<div class="card-overlay"></div>

				<!-- Color fill (slides in from right) -->
				<div class="color-fill navy-fill"></div>

				<!-- Content -->
				<div class="card-content">
					<div class="card-header">
						<div class="icon-circle navy-circle">
							<svg class="icon" fill="currentColor" viewBox="0 0 20 20">
								<path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
								<path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
							</svg>
						</div>
						<h3 class="card-title">Our Vision</h3>
					</div>

					<p class="card-description">
						A resilient India where no community faces disaster alone. We envision a network of compassionate
						service that reaches every corner of our nation, ensuring rapid relief and sustainable recovery.
					</p>

					<ul class="card-list">
						<li class="list-item">
							<div class="bullet navy-bullet"></div>
							<span>Pan-India disaster preparedness network</span>
						</li>
						<li class="list-item">
							<div class="bullet navy-bullet"></div>
							<span>Empowered communities with resilience training</span>
						</li>
						<li class="list-item">
							<div class="bullet navy-bullet"></div>
							<span>Technology-driven humanitarian response</span>
						</li>
					</ul>
				</div>
			</div>
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

	/* Container */
	.purpose-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		align-items: stretch;
	}

	/* Card Base */
	.purpose-card {
		position: relative;
		padding: 2rem;
		border-radius: 1rem;
		overflow: hidden;
		cursor: pointer;
		transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
		min-height: 500px;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
	}

	/* Background Image */
	.card-bg {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center;
		transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* Dark Overlay */
	.card-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		transition: opacity 0.5s ease;
		z-index: 1;
	}

	/* Color Fill - slides in on hover */
	.color-fill {
		position: absolute;
		inset: 0;
		z-index: 2;
		transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.orange-fill {
		background: linear-gradient(135deg, rgba(255, 107, 53, 0.92) 0%, rgba(255, 140, 80, 0.88) 100%);
		transform: translateX(-100%);
	}

	.navy-fill {
		background: linear-gradient(135deg, rgba(26, 35, 126, 0.92) 0%, rgba(40, 53, 147, 0.88) 100%);
		transform: translateX(100%);
	}

	/* Content */
	.card-content {
		position: relative;
		z-index: 10;
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	/* Card Header */
	.card-header {
		display: flex;
		align-items: center;
		margin-bottom: 1.5rem;
		gap: 1rem;
	}

	/* Icon Circle */
	.icon-circle {
		padding: 0.75rem;
		border-radius: 50%;
		color: white;
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		flex-shrink: 0;
	}

	.orange-circle {
		background-color: var(--orange);
	}

	.navy-circle {
		background-color: var(--navy);
	}

	.icon {
		width: 1.5rem;
		height: 1.5rem;
	}

	/* Card Title */
	.card-title {
		font-size: 1.5rem;
		font-weight: bold;
		color: white;
		margin: 0;
		transition: transform 0.3s ease;
	}

	/* Card Description */
	.card-description {
		color: rgba(255, 255, 255, 0.95);
		line-height: 1.7;
		margin-bottom: 1.5rem;
		font-size: 1rem;
	}

	/* List */
	.card-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.list-item {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		color: rgba(255, 255, 255, 0.9);
		transform: translateX(0);
		opacity: 1;
		transition: all 0.3s ease;
	}

	.bullet {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
		margin-top: 0.5rem;
		flex-shrink: 0;
		transition: all 0.3s ease;
	}

	.orange-bullet {
		background-color: var(--orange);
	}

	.navy-bullet {
		background-color: var(--navy);
	}

	/* Hover States - Expanded Card */
	.purpose-card.expanded {
		transform: scale(1.05);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
		z-index: 10;
	}

	.purpose-card.expanded .card-bg {
		transform: scale(1.1);
	}

	.purpose-card.expanded .card-overlay {
		opacity: 0;
	}

	.purpose-card.expanded .color-fill {
		transform: translateX(0);
	}

	.purpose-card.expanded .icon-circle {
		transform: scale(1.15) rotate(5deg);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	}

	.purpose-card.expanded .card-title {
		transform: translateX(5px);
	}

	.purpose-card.expanded .list-item {
		transform: translateX(5px);
	}

	.purpose-card.expanded .bullet {
		transform: scale(1.3);
	}

	/* Shrunk State (other card) */
	.purpose-card.shrunk {
		transform: scale(0.96);
		opacity: 0.7;
	}

	/* Responsive Design */
	@media (max-width: 1024px) {
		.purpose-container {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.purpose-card {
			min-height: 450px;
		}

		/* On mobile, auto-animate instead of hover */
		.purpose-card.expanded {
			transform: scale(1.02);
		}

		.purpose-card.shrunk {
			transform: scale(1);
			opacity: 1;
		}
	}

	@media (max-width: 640px) {
		.purpose-card {
			padding: 1.5rem;
			min-height: 400px;
		}

		.card-title {
			font-size: 1.25rem;
		}

		.card-description {
			font-size: 0.9rem;
		}

		.list-item {
			font-size: 0.9rem;
		}
	}
</style>
