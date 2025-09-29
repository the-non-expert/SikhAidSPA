// Campaign data for SikhAid Charitable Trust
export const campaigns = [
	{
		slug: 'langar-aid',
		title: 'Langar Aid',
		subtitle: 'Nourishing Hope, One Meal at a Time',
		shortDescription: 'Our flagship initiative serving fresh, nutritious meals to vulnerable communities across India, twice daily, year-round.',
		fullDescription: `
			SikhAid's flagship initiative, Help in Feeding India with Langar Aid, runs twice daily year-round, serving fresh, nutritious meals to the vulnerable communities, homeless individuals, daily wage workers, and those hit by disasters.

			With the support of 300+ volunteers and local kitchens, meals are distributed across 20+ cities and 2,000+ villages in states like Odisha, Maharashtra, West Bengal, Punjab, and Delhi. In 2023-24 alone, over 100,000 meals were served, continuing the spirit of seva at just ₹60 per meal.

			This initiative embodies the Sikh principle of 'Langar' - community kitchens that serve free meals to all, regardless of background, caste, or creed. Every meal served is a step towards eliminating hunger and fostering unity in our diverse nation.
		`,
		image: 'https://i.ibb.co/9kkX22Tz/151.png',
		category: 'Food Security',
		status: 'ongoing',
		impactStats: [
			{ label: 'Meals Served', value: '100,000+', icon: '🍽️' },
			{ label: 'Great Volunteers', value: '300+', icon: '👥' },
			{ label: 'Rural Hubs', value: '200+', icon: '🏘️' },
			{ label: 'Cities Covered', value: '20+', icon: '🏙️' }
		],
		howItWorks: [
			{
				step: 1,
				title: 'Community Kitchens',
				description: 'Establish local kitchen networks in vulnerable areas with trained volunteers and proper equipment.'
			},
			{
				step: 2,
				title: 'Fresh Meal Preparation',
				description: 'Prepare nutritious, hygienic meals twice daily using quality ingredients and following strict food safety standards.'
			},
			{
				step: 3,
				title: 'Distribution Network',
				description: 'Deploy dedicated teams to distribute meals directly to homeless individuals, daily wage workers, and disaster-affected families.'
			},
			{
				step: 4,
				title: 'Community Impact',
				description: 'Monitor and evaluate impact while expanding reach to new locations based on need assessment.'
			}
		],
		gallery: [
			{ src: '/sikhaidLogo.png', alt: 'Volunteers preparing meals in community kitchen' },
			{ src: '/sikhaidLogo.png', alt: 'Food distribution to homeless individuals' },
			{ src: '/sikhaidLogo.png', alt: 'Large-scale meal preparation' },
			{ src: '/sikhaidLogo.png', alt: 'Volunteers serving food in rural areas' },
			{ src: '/sikhaidLogo.png', alt: 'Community kitchen operations' },
			{ src: '/sikhaidLogo.png', alt: 'Beneficiaries receiving nutritious meals' }
		]
	},
	{
		slug: 'no-spot',
		title: 'No Spot',
		subtitle: 'Championing Dignity and Hygiene for Women',
		shortDescription: 'Women\'s sanitation initiative promoting menstrual health, hygiene awareness, and dignity for underserved women across India.',
		fullDescription: `
			The No Spot women's sanitation initiative by SikhAid champions dignity and hygiene for underserved women across India. With a focus on menstrual health, access to sanitation, and hygiene awareness, this project has impacted communities in both urban slums of Pune and remote villages in Odisha.

			Activities include onsite sanitation drives, portable toilet installations, and monthly distribution of over 6,000 sanitary pads and essential toiletries. Through regular workshops and awareness sessions, SikhAid empowers women with knowledge, resources, and a safe space for addressing menstrual health.

			This initiative fights the stigma around menstruation with quiet strength and steady seva, ensuring that no woman has to compromise her dignity due to lack of access to basic sanitary facilities.
		`,
		image: 'https://i.ibb.co/7dVCJV2p/No-Spot-Main.png',
		category: 'Women\'s Health',
		status: 'ongoing',
		impactStats: [
			{ label: 'Sanitary Pads Distributed', value: '6,000+', icon: '🩸' },
			{ label: 'Women Beneficiaries', value: '2,500+', icon: '👩' },
			{ label: 'Awareness Sessions', value: '150+', icon: '📚' },
			{ label: 'Communities Reached', value: '50+', icon: '🏘️' }
		],
		howItWorks: [
			{
				step: 1,
				title: 'Community Assessment',
				description: 'Identify underserved communities with limited access to menstrual hygiene facilities and products.'
			},
			{
				step: 2,
				title: 'Infrastructure Development',
				description: 'Install portable toilets and sanitation facilities in strategic locations for maximum accessibility.'
			},
			{
				step: 3,
				title: 'Distribution & Education',
				description: 'Distribute sanitary pads, toiletries, and conduct awareness sessions on menstrual health and hygiene.'
			},
			{
				step: 4,
				title: 'Ongoing Support',
				description: 'Provide continuous support through regular visits, maintenance of facilities, and educational workshops.'
			}
		],
		gallery: [
			{ src: '/sikhaidLogo.png', alt: 'Distribution of sanitary pads to women' },
			{ src: '/sikhaidLogo.png', alt: 'Hygiene awareness workshop' },
			{ src: '/sikhaidLogo.png', alt: 'Portable toilet installation' },
			{ src: '/sikhaidLogo.png', alt: 'Women volunteers conducting session' },
			{ src: '/sikhaidLogo.png', alt: 'Community gathering for awareness' },
			{ src: '/sikhaidLogo.png', alt: 'Sanitation drive in urban slums' }
		]
	},
	{
		slug: 'blanket-distribution',
		title: 'Blanket Distribution',
		subtitle: 'Shielding Vulnerable Families from Winter\'s Harsh Embrace',
		shortDescription: 'Winter relief campaign providing high-quality blankets to impoverished families, elderly, and homeless individuals across India.',
		fullDescription: `
			Each winter, SikhAid launches its Blanket Seva campaign to shield the most vulnerable - impoverished families, the elderly, and the homeless - from the biting cold. Through carefully organized distribution drives, high-quality blankets are delivered across urban slums and remote villages.

			This annual campaign ensures no one is left to face harsh nights without protection. These initiatives not only bring warmth but also foster solidarity and compassion, reminding communities that seva never sleeps, even in the coldest months.

			Our teams work tirelessly during winter months, conducting door-to-door distributions in slums, organizing community distribution points, and ensuring that the most vulnerable populations receive adequate winter protection when they need it most.
		`,
		image: 'https://i.ibb.co/zWNmNZhN/Blanket-Main.png',
		category: 'Winter Relief',
		status: 'seasonal',
		impactStats: [
			{ label: 'Blankets Distributed', value: '15,000+', icon: '🧥' },
			{ label: 'Families Benefited', value: '8,000+', icon: '👨‍👩‍👧‍👦' },
			{ label: 'Distribution Centers', value: '75+', icon: '📍' },
			{ label: 'Volunteer Hours', value: '2,400+', icon: '⏰' }
		],
		howItWorks: [
			{
				step: 1,
				title: 'Need Assessment',
				description: 'Survey vulnerable communities to identify families and individuals most in need of winter protection.'
			},
			{
				step: 2,
				title: 'Quality Procurement',
				description: 'Source high-quality, warm blankets that provide adequate protection against harsh winter conditions.'
			},
			{
				step: 3,
				title: 'Strategic Distribution',
				description: 'Organize distribution drives in urban slums, remote villages, and areas with high homeless populations.'
			},
			{
				step: 4,
				title: 'Follow-up Care',
				description: 'Monitor the well-being of beneficiaries and provide additional support where needed during winter months.'
			}
		],
		gallery: [
			{ src: '/sikhaidLogo.png', alt: 'Blanket distribution to homeless individuals' },
			{ src: '/sikhaidLogo.png', alt: 'Elderly receiving warm blankets' },
			{ src: '/sikhaidLogo.png', alt: 'Community distribution event' },
			{ src: '/sikhaidLogo.png', alt: 'Volunteers organizing blankets' },
			{ src: '/sikhaidLogo.png', alt: 'Winter relief in rural villages' },
			{ src: '/sikhaidLogo.png', alt: 'Families receiving winter supplies' }
		]
	},
	{
		slug: 'covid-oxygen-sewa',
		title: 'COVID Oxygen Sewa',
		subtitle: 'Breathing Life into Hope During the Pandemic',
		shortDescription: 'Critical pandemic relief providing oxygen concentrators, cylinders, and essential supplies to home quarantined patients.',
		fullDescription: `
			At the height of the pandemic, SikhAid emerged as a vital lifeline delivering 2,000+ oxygen concentrators and 5,000+ cylinders to home quarantined patients, with a 79% request fulfillment rate. Their support extended beyond oxygen, achieving a 92% success rate in delivering groceries and medicines to families in isolation.

			During the brutal second wave, 50,000+ ration kits were distributed nationwide, proving that even in crisis, seva never stopped. This initiative represented SikhAid's commitment to preserving life and dignity during one of humanity's most challenging periods.

			Our rapid response network mobilized volunteers, medical professionals, and logistics teams to ensure that no family faced the pandemic alone. The initiative showcased the power of community solidarity in times of unprecedented crisis.
		`,
		image: 'https://i.ibb.co/n8bLzJWC/Oxygen-Main.png',
		category: 'Pandemic Relief',
		status: 'completed',
		impactStats: [
			{ label: 'Ration Kits', value: '50,000+', icon: '📦' },
			{ label: 'Oxygen Cylinders', value: '5,000+', icon: '🫁' },
			{ label: 'Success Rate', value: '92%', icon: '✅' },
			{ label: 'Concentrators Provided', value: '2,000+', icon: '🏥' }
		],
		howItWorks: [
			{
				step: 1,
				title: 'Emergency Response',
				description: 'Establish 24/7 helpline to receive and process emergency requests for oxygen and medical supplies.'
			},
			{
				step: 2,
				title: 'Resource Mobilization',
				description: 'Procure and maintain inventory of oxygen concentrators, cylinders, medicines, and essential supplies.'
			},
			{
				step: 3,
				title: 'Rapid Delivery',
				description: 'Deploy trained volunteers for contactless delivery of oxygen equipment and essential supplies to quarantined families.'
			},
			{
				step: 4,
				title: 'Recovery Support',
				description: 'Provide ongoing support including equipment maintenance, refills, and recovery monitoring.'
			}
		],
		gallery: [
			{ src: '/sikhaidLogo.png', alt: 'Oxygen concentrator delivery to patients' },
			{ src: '/sikhaidLogo.png', alt: 'Volunteers distributing ration kits' },
			{ src: '/sikhaidLogo.png', alt: 'Medical equipment preparation' },
			{ src: '/sikhaidLogo.png', alt: 'Contactless delivery during COVID' },
			{ src: '/sikhaidLogo.png', alt: 'Oxygen cylinder distribution' },
			{ src: '/sikhaidLogo.png', alt: 'Emergency response team in action' }
		]
	},
	{
		slug: 'other-sewa',
		title: 'Other Sewa',
		subtitle: 'Diverse Initiatives Touching Lives Across Communities',
		shortDescription: 'Comprehensive humanitarian programs including education aid, medical camps, ambulance services, and blood donation drives.',
		fullDescription: `
			In addition to their core campaigns, SikhAid runs several impactful initiatives that often fly under the radar but touch lives deeply. Their education aid program supports underprivileged students with free school kits, stationery, and scholarships, ensuring children don't drop out due to financial barriers.

			On the healthcare front, SikhAid organizes mobile medical camps, offering basic checkups, treatments, and free medicines in underserved areas. Their ambulance services extend emergency support to communities lacking access to transport.

			SikhAid also manages a nationwide blood donation network, bridging urgent gaps in critical cases. These initiatives reflect a holistic approach to seva - uplifting minds, healing bodies, and saving lives with quiet determination.
		`,
		image: '/sikhaidLogo.png',
		category: 'Community Welfare',
		status: 'ongoing',
		impactStats: [
			{ label: 'Students Supported', value: '3,500+', icon: '🎓' },
			{ label: 'Medical Camps', value: '120+', icon: '🏥' },
			{ label: 'Emergency Transports', value: '850+', icon: '🚑' },
			{ label: 'Blood Units Donated', value: '2,200+', icon: '🩸' }
		],
		howItWorks: [
			{
				step: 1,
				title: 'Community Needs Assessment',
				description: 'Identify diverse community needs through surveys and local partnerships across education, health, and emergency services.'
			},
			{
				step: 2,
				title: 'Program Development',
				description: 'Design targeted interventions including education support, medical camps, and emergency response services.'
			},
			{
				step: 3,
				title: 'Service Delivery',
				description: 'Implement programs through trained volunteers, medical professionals, and community partnerships.'
			},
			{
				step: 4,
				title: 'Impact Monitoring',
				description: 'Track outcomes and continuously improve services based on community feedback and changing needs.'
			}
		],
		gallery: [
			{ src: '/sikhaidLogo.png', alt: 'Students receiving educational supplies' },
			{ src: '/sikhaidLogo.png', alt: 'Mobile medical camp in rural area' },
			{ src: '/sikhaidLogo.png', alt: 'Ambulance service for emergency transport' },
			{ src: '/sikhaidLogo.png', alt: 'Blood donation drive' },
			{ src: '/sikhaidLogo.png', alt: 'Community health checkup' },
			{ src: '/sikhaidLogo.png', alt: 'Educational scholarship distribution' }
		]
	}
];

// Featured campaign for main campaigns page
export const featuredCampaign = {
	slug: 'punjab-floods-2025-response',
	title: 'Punjab Floods 2025: Our Immediate Response Efforts',
	subtitle: 'Swift Emergency Response to Natural Disaster',
	shortDescription: 'When devastating floods hit Punjab in January 2025, SikhAid mobilized within hours to provide emergency relief to affected families.',
	fullDescription: `
		When devastating floods hit Punjab in January 2025, Sikh Aid Charitable Trust mobilized within hours to provide emergency relief to affected families. Our rapid response network enabled us to reach the most vulnerable communities first, focusing on rural farming communities who were cut off from main roads due to flooding.

		Our teams worked around the clock in coordination with local authorities to ensure efficient relief distribution. The dedication of our volunteers provided not only essential supplies but also hope and emotional support during the darkest hours for flood victims.

		As of today, we continue to provide support to 1,500 families still in temporary accommodations. Our focus has shifted to rehabilitation and helping families rebuild their lives and livelihoods, demonstrating our long-term commitment to disaster recovery.
	`,
	image: 'https://i.ibb.co/B20Q7cBV/Hero1.jpg',
	category: 'Emergency Response',
	status: 'ongoing',
	impactStats: [
		{ label: 'Families Rescued', value: '500+', icon: '🛟' },
		{ label: 'Shelter Camps', value: '15', icon: '⛺' },
		{ label: 'Food Packets Distributed', value: '10,000+', icon: '📦' },
		{ label: 'People in Temporary Care', value: '2,000+', icon: '👥' }
	],
	howItWorks: [
		{
			step: 1,
			title: 'Rapid Mobilization',
			description: 'Deploy emergency response teams within hours of disaster alert to assess situation and begin rescue operations.'
		},
		{
			step: 2,
			title: 'Emergency Rescue',
			description: 'Conduct boat and vehicle rescues to evacuate families from flooded areas to safety.'
		},
		{
			step: 3,
			title: 'Relief Distribution',
			description: 'Set up temporary shelters and distribute food, water, medicines, and essential supplies to displaced families.'
		},
		{
			step: 4,
			title: 'Rehabilitation Support',
			description: 'Provide long-term support for rebuilding homes, livelihoods, and community infrastructure.'
		}
	],
	gallery: [
		{ src: '/sikhaidLogo.png', alt: 'Rescue boats evacuating flood victims' },
		{ src: '/sikhaidLogo.png', alt: 'Emergency shelter camp setup' },
		{ src: '/sikhaidLogo.png', alt: 'Food distribution to displaced families' },
		{ src: '/sikhaidLogo.png', alt: 'Medical aid being provided' },
		{ src: '/sikhaidLogo.png', alt: 'Volunteers coordinating relief efforts' },
		{ src: '/sikhaidLogo.png', alt: 'Rehabilitation work in progress' }
	]
};

// Get campaign by slug
export function getCampaignBySlug(slug) {
	if (slug === featuredCampaign.slug) {
		return featuredCampaign;
	}
	return campaigns.find(campaign => campaign.slug === slug);
}

// Get all campaigns including featured
export function getAllCampaigns() {
	return [featuredCampaign, ...campaigns];
}