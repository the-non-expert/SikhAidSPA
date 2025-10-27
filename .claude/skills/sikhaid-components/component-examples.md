# SikhAid Component Examples

## Real Component Breakdowns

### Header.svelte
**Location:** `src/lib/components/Header.svelte`

**Purpose:** Main navigation header with dropdown menus and mobile responsiveness

**Key Features:**
- Responsive mobile menu toggle
- Dropdown for "Get Involved" section
- Active route highlighting
- Smooth scroll to donation section
- Sticky positioning

**Pattern Used:**
```
- State for menu visibility (isMenuOpen, isDropdownOpen)
- $page store for active route detection
- Event handlers for menu interactions
- Conditional rendering for mobile/desktop views
- Tailwind for responsive styling
```

**File Structure:**
```svelte
<script lang="ts">
  import { page } from '$app/stores';
  import { Icon } from '@iconify/svelte';

  let isMenuOpen = false;
  let isDropdownOpen = false;

  $: isActive = (path: string) => $page.url.pathname === path;
</script>

<nav>
  <!-- Logo, navigation links, mobile menu -->
</nav>
```

---

### PaymentForm.svelte
**Location:** `src/lib/components/PaymentForm.svelte`

**Purpose:** Donation form with Razorpay payment integration

**Key Features:**
- Form validation (name, phone, amount)
- Razorpay payment gateway integration
- Loading states during submission
- Success/error feedback
- Predefined amount buttons

**Pattern Used:**
```
- formData object with two-way binding
- Validation functions (validateName, validatePhoneNumber, validateDonationAmount)
- Async payment handling with try-catch
- Store subscription ($selectedAmount)
- Conditional button states (disabled while loading)
```

**File Structure:**
```svelte
<script lang="ts">
  import { selectedAmount } from '$lib/stores/donation';
  import { openRazorpayCheckout } from '$lib/razorpay';

  let formData = { name: '', phone: '', email: '', amount: 0 };
  let isSubmitting = false;
  let errorMessage = '';

  $: formData.amount = $selectedAmount;

  async function handleSubmit() {
    // Validation and payment logic
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <!-- Form fields -->
</form>
```

---

### CampaignCarousel.svelte
**Location:** `src/lib/components/CampaignCarousel.svelte`

**Purpose:** Horizontal carousel showcasing featured campaigns

**Key Features:**
- Featured campaign filter
- Campaign cards with image, title, description
- Click to navigate to campaign details
- Responsive grid/carousel layout

**Pattern Used:**
```
- Import campaigns from data file
- Filter array for featured items
- Event handler for navigation
- Responsive Tailwind grid
- Card component pattern
```

**File Structure:**
```svelte
<script lang="ts">
  import { campaigns } from '$lib/data/campaigns';
  import { goto } from '$app/navigation';
  import type { Campaign } from '$lib/types/campaign';

  $: featuredCampaigns = campaigns.filter(c => c.featured);

  function handleCampaignClick(slug: string) {
    goto(`/campaigns/${slug}`);
  }
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each featuredCampaigns as campaign}
    <div on:click={() => handleCampaignClick(campaign.slug)}>
      <!-- Campaign card content -->
    </div>
  {/each}
</div>
```

---

### Footer.svelte
**Location:** `src/lib/components/Footer.svelte`

**Purpose:** Site footer with quick links and admin login

**Key Features:**
- Social media links
- Quick navigation links
- Admin login modal (popup)
- Cookie-based session management
- Footer sections (About, Quick Links, Contact)

**Pattern Used:**
```
- Modal state management (showLoginModal)
- Form with password validation
- Browser cookie API (document.cookie)
- Conditional modal rendering
- Svelte transitions for modal
```

**File Structure:**
```svelte
<script lang="ts">
  import { goto } from '$app/navigation';
  import { Icon } from '@iconify/svelte';

  let showLoginModal = false;
  let password = '';
  let errorMessage = '';

  function handleLogin() {
    if (password === 'Raunak@123') {
      // Set cookie and redirect
      document.cookie = `admin_session=raunak_${Date.now()}; max-age=3600; path=/`;
      goto('/admin');
    } else {
      errorMessage = 'Invalid password';
    }
  }
</script>

<footer>
  <!-- Footer content -->
</footer>

{#if showLoginModal}
  <div class="modal">
    <!-- Login form -->
  </div>
{/if}
```

---

### Hero.svelte
**Location:** `src/lib/components/Hero.svelte`

**Purpose:** Home page hero section with background image and call-to-action

**Key Features:**
- Full-width background image
- Overlay with gradient
- Prominent heading and description
- CTA button to donate page
- Responsive typography

**Pattern Used:**
```
- Background image with overlay
- Flexbox centering
- Responsive text sizing with Tailwind
- Navigation with goto()
- Custom animations (fade-in, slide-up)
```

**File Structure:**
```svelte
<script lang="ts">
  import { goto } from '$app/navigation';
</script>

<section class="hero-section relative h-screen">
  <div class="absolute inset-0 bg-black bg-opacity-50">
    <div class="container mx-auto h-full flex flex-col justify-center">
      <h1 class="text-5xl md:text-7xl font-bold text-white animate-fade-in">
        Making a Difference
      </h1>
      <button on:click={() => goto('/donate')} class="btn-primary">
        Donate Now
      </button>
    </div>
  </div>
</section>
```

---

### ImpactCounterSection.svelte
**Location:** `src/lib/components/home/ImpactCounterSection.svelte`

**Purpose:** Animated statistics section showing organization impact

**Key Features:**
- Counter animation (counting up effect)
- Grid of impact stats
- Icons for visual appeal
- Responsive layout

**Pattern Used:**
```
- onMount for counter animation
- setTimeout/setInterval for number incrementation
- Iconify for stat icons
- Responsive grid (1 col mobile, 2-4 cols desktop)
```

**File Structure:**
```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import { Icon } from '@iconify/svelte';

  let stats = [
    { icon: 'mdi:account-group', value: 0, target: 50000, label: 'People Helped' },
    { icon: 'mdi:food', value: 0, target: 100000, label: 'Meals Served' },
    // ...
  ];

  onMount(() => {
    stats.forEach(stat => {
      const increment = stat.target / 100;
      const timer = setInterval(() => {
        if (stat.value < stat.target) {
          stat.value += increment;
        } else {
          clearInterval(timer);
        }
      }, 20);
    });
  });
</script>

<section>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    {#each stats as stat}
      <div class="text-center">
        <Icon icon={stat.icon} class="text-5xl text-orange-custom" />
        <div class="text-4xl font-bold">{Math.floor(stat.value)}</div>
        <div class="text-gray-600">{stat.label}</div>
      </div>
    {/each}
  </div>
</section>
```

---

### SubmissionModal.svelte (Admin)
**Location:** `src/lib/components/admin/SubmissionModal.svelte`

**Purpose:** Modal for viewing and managing form submissions in admin panel

**Key Features:**
- Display submission details
- Status update buttons (New → Read → Resolved)
- Close on backdrop click
- Firestore update integration

**Pattern Used:**
```
- Props for submission data
- Event dispatcher for parent communication
- Status update with Firestore
- Modal with backdrop
- Conditional rendering based on submission type
```

**File Structure:**
```svelte
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { FirestoreContactSubmission } from '$lib/firestore';

  export let submission: FirestoreContactSubmission;
  export let isOpen = false;

  const dispatch = createEventDispatcher();

  async function updateStatus(newStatus: string) {
    await updateSubmissionStatus('contact_submissions', submission.id, newStatus);
    dispatch('statusUpdated');
  }

  function closeModal() {
    dispatch('close');
  }
</script>

{#if isOpen}
  <div class="modal-backdrop" on:click={closeModal}>
    <div class="modal-content" on:click|stopPropagation>
      <h2>{submission.name}</h2>
      <p>{submission.message}</p>
      <button on:click={() => updateStatus('read')}>Mark as Read</button>
      <button on:click={closeModal}>Close</button>
    </div>
  </div>
{/if}
```

---

## Component Composition Example

### Home Page (+page.svelte)
**How components are composed together**

```svelte
<script lang="ts">
  import Hero from '$lib/components/Hero.svelte';
  import CampaignCarousel from '$lib/components/CampaignCarousel.svelte';
  import ImpactCounterSection from '$lib/components/home/ImpactCounterSection.svelte';
  import MissionSection from '$lib/components/home/MissionSection.svelte';
</script>

<!-- Page composition -->
<Hero />
<ImpactCounterSection />
<MissionSection />
<CampaignCarousel />

<style>
  /* Page-specific styles */
</style>
```

---

## Common Component Snippets

### Basic Form Input with Validation
```svelte
<script lang="ts">
  let email = '';
  let emailError = '';

  function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailError = 'Invalid email format';
      return false;
    }
    emailError = '';
    return true;
  }
</script>

<div class="form-group">
  <label for="email">Email *</label>
  <input
    id="email"
    type="email"
    bind:value={email}
    on:blur={validateEmail}
    class:error={emailError}
    required
  />
  {#if emailError}
    <span class="text-red-500 text-sm">{emailError}</span>
  {/if}
</div>
```

### Loading Button
```svelte
<script lang="ts">
  let isLoading = false;

  async function handleAction() {
    isLoading = true;
    try {
      await performAction();
    } finally {
      isLoading = false;
    }
  }
</script>

<button
  on:click={handleAction}
  disabled={isLoading}
  class="btn-primary"
  class:opacity-50={isLoading}
>
  {#if isLoading}
    <Icon icon="mdi:loading" class="animate-spin" />
    Loading...
  {:else}
    Submit
  {/if}
</button>
```

### Card with Click Handler
```svelte
<script lang="ts">
  import { goto } from '$app/navigation';

  export let title: string;
  export let slug: string;
  export let image: string;
</script>

<div
  class="card cursor-pointer hover:shadow-xl transition-shadow"
  on:click={() => goto(`/campaigns/${slug}`)}
  on:keydown={(e) => e.key === 'Enter' && goto(`/campaigns/${slug}`)}
  role="button"
  tabindex="0"
>
  <img src={image} alt={title} class="w-full h-48 object-cover rounded-t-lg" />
  <div class="p-4">
    <h3 class="text-xl font-bold">{title}</h3>
  </div>
</div>
```

---

## File Paths Quick Reference

| Component | Path |
|-----------|------|
| Header | `src/lib/components/Header.svelte` |
| Footer | `src/lib/components/Footer.svelte` |
| Hero | `src/lib/components/Hero.svelte` |
| PaymentForm | `src/lib/components/PaymentForm.svelte` |
| CampaignCarousel | `src/lib/components/CampaignCarousel.svelte` |
| ImpactCounterSection | `src/lib/components/home/ImpactCounterSection.svelte` |
| MissionSection | `src/lib/components/home/MissionSection.svelte` |
| SubmissionModal | `src/lib/components/admin/SubmissionModal.svelte` |
