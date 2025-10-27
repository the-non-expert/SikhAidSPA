# SikhAid Quick File Location Map

## "Where do I find...?"

### Components
| What | Where |
|------|-------|
| Navigation header | `src/lib/components/Header.svelte` |
| Footer with admin login | `src/lib/components/Footer.svelte` |
| Payment/donation form | `src/lib/components/PaymentForm.svelte` |
| Campaign carousel | `src/lib/components/CampaignCarousel.svelte` |
| Hero section | `src/lib/components/Hero.svelte` |
| Impact counter section | `src/lib/components/home/ImpactCounterSection.svelte` |
| Admin submission modal | `src/lib/components/admin/SubmissionModal.svelte` |

### Pages
| What | Where |
|------|-------|
| Home page | `src/routes/+page.svelte` |
| About us | `src/routes/about/+page.svelte` |
| All campaigns | `src/routes/campaigns/+page.svelte` |
| Single campaign | `src/routes/campaigns/[slug]/+page.svelte` |
| Blog listing | `src/routes/blog/+page.svelte` |
| Single blog post | `src/routes/blog/[slug]/+page.svelte` |
| Donation page | `src/routes/donate/+page.svelte` |
| Contact page | `src/routes/contact/+page.svelte` |
| Volunteering page | `src/routes/volunteering/+page.svelte` |
| CSR partnerships | `src/routes/csr/+page.svelte` |
| Payment success | `src/routes/payment/success/+page.svelte` |
| Payment failure | `src/routes/payment/failure/+page.svelte` |
| Admin dashboard | `src/routes/admin/+page.svelte` |
| Admin submissions | `src/routes/admin/formsubmissions/+page.svelte` |
| Admin blogs | `src/routes/admin/blogs/+page.svelte` |
| Admin campaigns | `src/routes/admin/campaigns/+page.svelte` |

### State Management
| What | Where |
|------|-------|
| Donation state | `src/lib/stores/donation.ts` |
| Contact form state | `src/lib/stores/contact.ts` |
| Volunteer form state | `src/lib/stores/volunteering.ts` |
| CSR form state | `src/lib/stores/csr.ts` |

### Data & Types
| What | Where |
|------|-------|
| Campaign data | `src/lib/data/campaigns.js` |
| Blog data | `src/lib/data/blogs.js` |
| Campaign types | `src/lib/types/campaign.ts` |

### Backend Integration
| What | Where |
|------|-------|
| Firebase initialization | `src/lib/firebase.ts` |
| Firestore operations | `src/lib/firestore.ts` |
| Razorpay payment logic | `src/lib/razorpay.ts` |
| Main exports | `src/lib/index.ts` |

### Styling
| What | Where |
|------|-------|
| Global styles | `src/app.css` |
| Tailwind config | `tailwind.config.js` |
| PostCSS config | `postcss.config.js` |

### Configuration
| What | Where |
|------|-------|
| SvelteKit config | `svelte.config.js` |
| TypeScript config | `tsconfig.json` |
| Vite config | `vite.config.ts` |
| Package dependencies | `package.json` |
| Environment variables | `.env` (not committed) |

### Static Assets
| What | Where |
|------|-------|
| Images | `src/lib/assets/` |
| Public files | `static/` |

## Common File Patterns

### Creating a New Page
1. Create `src/routes/[page-name]/+page.svelte`
2. Add route to Header navigation if public
3. Import/use components from `src/lib/components/`

### Creating a New Component
1. Create `src/lib/components/[ComponentName].svelte`
2. Export from `src/lib/index.ts` if needed elsewhere
3. Import in pages: `import ComponentName from '$lib/components/ComponentName.svelte'`

### Adding Firestore Collection
1. Define types in new file: `src/lib/types/[name].ts`
2. Create store: `src/lib/stores/[name].ts`
3. Add CRUD functions to `src/lib/firestore.ts`
4. Create form page in `src/routes/[name]/+page.svelte`

### Adding a Campaign
1. Add campaign object to `src/lib/data/campaigns.js`
2. Include slug, title, description, images, impact stats
3. Campaign automatically appears on campaigns page
4. Dynamic route handles individual campaign pages

## File Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Pages | `+page.svelte` | `src/routes/about/+page.svelte` |
| Layouts | `+layout.svelte` | `src/routes/+layout.svelte` |
| Components | `PascalCase.svelte` | `Header.svelte`, `PaymentForm.svelte` |
| Stores | `camelCase.ts` | `donation.ts`, `volunteering.ts` |
| Types | `camelCase.ts` | `campaign.ts` |
| Dynamic routes | `[param]` | `[slug]/+page.svelte` |

## Import Path Aliases

| Alias | Resolves To | Example |
|-------|-------------|---------|
| `$lib` | `src/lib` | `import { store } from '$lib/stores/donation'` |
| `$app` | SvelteKit app modules | `import { page } from '$app/stores'` |
