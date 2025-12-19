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
      <button on:click={() => goto('https://donate.sikhaid.ngo/')} class="btn-primary">
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

### CelebrityEndorsementsSection.svelte
**Location:** `src/lib/components/home/CelebrityEndorsementsSection.svelte`
**Added:** Nov 2024

**Purpose:** Auto-playing carousel showcasing celebrity endorsements and support

**Key Features:**
- Auto-playing 3D carousel (3-second intervals)
- Pause on hover
- Touch/swipe support for mobile
- Navigation arrows and dot indicators
- Responsive (Desktop: 3 cards, Tablet: 2 cards, Mobile: 1 card)
- Handwriting font (Caveat) for "Support from" title
- Images use object-fit: contain to show full images without cropping
- Names and professions displayed below images

**Pattern Used:**
```
- Svelte 5 runes ($state, $effect)
- Auto-play with pause on hover/swipe
- Touch/swipe handlers for mobile
- Conditional card visibility based on position
- 3D transform effects for depth
- Reactive card positioning and scaling
- Google Fonts (Caveat) for handwriting style
```

**File Structure:**
```svelte
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  const celebrities = [
    {
      name: 'Banita Sandhu',
      profession: 'Actress',
      image: '/personalities/banita-sandhu.jpg'
    },
    // ... more celebrities
  ];

  let activeIndex = $state(0);
  let isHovered = $state(false);
  let intervalId: number | null = null;
  let visibleCards = $state(3); // Responsive: 1-3 cards

  function startAutoPlay() {
    intervalId = window.setInterval(() => {
      if (!isHovered && !isSwiping) {
        nextSlide();
      }
    }, 3000);
  }

  function handleTouchStart(e: TouchEvent) {
    touchStartX = e.touches[0].clientX;
    isSwiping = true;
  }

  onMount(() => {
    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    startAutoPlay();
  });

  onDestroy(() => {
    stopAutoPlay();
  });
</script>

<section class="celebrity-section">
  <div class="section-header">
    <h3 class="handwriting-text">Support from</h3>
    <h2 class="section-title">Renowned Personalities</h2>
  </div>

  <div class="carousel-wrapper"
       onmouseenter={handleMouseEnter}
       onmouseleave={handleMouseLeave}
       ontouchstart={handleTouchStart}>
    <div class="cards-container">
      {#each celebrities as celebrity, index}
        {#if isCardVisible(index)}
          <div class="celebrity-card"
               style="transform: translateX(calc({position} * 110%)) scale({isActive ? 1 : 0.85})">
            <div class="card-image-wrapper">
              <img src={celebrity.image} alt={celebrity.name} class="card-image" />
            </div>
            <div class="card-content">
              <h4 class="celebrity-name">{celebrity.name}</h4>
              <p class="celebrity-profession">{celebrity.profession}</p>
            </div>
          </div>
        {/if}
      {/each}
    </div>
  </div>

  <!-- Navigation Controls -->
  <div class="navigation-controls">
    <button onclick={prevSlide}>Previous</button>
    <div class="dot-indicators">
      {#each celebrities as _, index}
        <button class:active={index === activeIndex} onclick={() => goToSlide(index)} />
      {/each}
    </div>
    <button onclick={nextSlide}>Next</button>
  </div>
</section>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap');

  .celebrity-section {
    padding: 32px 16px;
  }

  .handwriting-text {
    font-family: 'Caveat', cursive;
    color: #ffa617; /* Orange */
  }

  .card-image {
    object-fit: contain; /* Show full image without cropping */
  }

  .card-content {
    padding: 16px 20px;
    text-align: center;
  }
</style>
```

**Data Structure:**
```typescript
interface Celebrity {
  name: string;
  profession: string;
  image: string; // Path: /personalities/[name].jpg
}
```

**Celebrity Images Location:**
- Directory: `/static/personalities/`
- Files: `banita-sandhu.jpg`, `harbhajan-singh.jpg`, `rohanpreet-singh.jpg`, `prophc.jpg`, `jaspreet-singh.jpg`

**Key Implementation Details:**
- Auto-play interval: 3000ms (3 seconds)
- Card dimensions: 320x450px (desktop), responsive on mobile
- Image area: 360px height, uses `object-fit: contain`
- Text area: ~90px, separate from image
- Transform: `translateX` for positioning, `scale` for active/inactive states
- Opacity: Active card 1.0, inactive 0.5
- Z-index: Active card higher for proper layering

---

### CelebrityCardModal.svelte (Admin)
**Location:** `src/lib/components/admin/CelebrityCardModal.svelte`
**Added:** Nov 2025

**Purpose:** Modal form for adding/editing celebrity endorsement cards in the admin content management system

**Key Features:**
- Create new or edit existing celebrity cards
- Form validation for all fields
- Image URL validation with live preview
- Toggle visibility (isActive)
- Loading states during submission
- Error handling and user feedback
- Escape key and backdrop click to close

**Pattern Used:**
```
- Svelte 5 runes ($state, $props)
- Props for card data and callbacks
- Form validation with error messages
- Image preview with error handling
- Firestore integration (addCelebrityCard, updateCelebrityCard)
- Modal backdrop pattern
```

**File Structure:**
```svelte
<script lang="ts">
  import { addCelebrityCard, updateCelebrityCard, type FirestoreCelebrityCard } from '$lib/firestore';
  import type { CelebrityCard } from '$lib/types/content';

  interface Props {
    card: FirestoreCelebrityCard | null;
    onClose: () => void;
    onSave: () => void;
  }

  let { card = null, onClose, onSave }: Props = $props();

  // Form state using Svelte 5 $state rune
  let name = $state(card?.name || '');
  let profession = $state(card?.profession || '');
  let imageUrl = $state(card?.imageUrl || '');
  let isActive = $state(card?.isActive ?? true);

  // Validation errors
  let errors = $state<Record<string, string>>({});
  let isSubmitting = $state(false);
  let errorMessage = $state('');

  function validateForm(): boolean {
    errors = {};

    if (!name.trim() || name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!profession.trim() || profession.trim().length < 2) {
      errors.profession = 'Profession must be at least 2 characters';
    }

    if (!imageUrl.trim()) {
      errors.imageUrl = 'Image URL is required';
    } else if (!imageUrl.match(/^https?:\/\/.+/)) {
      errors.imageUrl = 'Please enter a valid URL starting with http:// or https://';
    }

    return Object.keys(errors).length === 0;
  }

  async function handleSubmit() {
    if (!validateForm()) return;

    isSubmitting = true;
    errorMessage = '';

    try {
      const cardData = {
        name: name.trim(),
        profession: profession.trim(),
        imageUrl: imageUrl.trim(),
        isActive
      };

      if (card?.id) {
        await updateCelebrityCard(card.id, cardData);
      } else {
        await addCelebrityCard(cardData);
      }

      onSave();
    } catch (error) {
      console.error('Error saving celebrity card:', error);
      errorMessage = 'Failed to save celebrity card. Please try again.';
    } finally {
      isSubmitting = false;
    }
  }
</script>

<!-- Modal Backdrop -->
<div class="modal-backdrop" onclick={handleBackdropClick}>
  <!-- Modal Container -->
  <div class="modal-content" onclick={(e) => e.stopPropagation()}>
    <!-- Header with close button -->
    <div class="modal-header">
      <h2>{card ? 'Edit Celebrity Card' : 'Add Celebrity Card'}</h2>
    </div>

    <!-- Form Fields -->
    <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <!-- Name Input -->
      <input type="text" bind:value={name} placeholder="e.g., Banita Sandhu" />
      {#if errors.name}<p class="error">{errors.name}</p>{/if}

      <!-- Profession Input -->
      <input type="text" bind:value={profession} placeholder="e.g., Actress" />
      {#if errors.profession}<p class="error">{errors.profession}</p>{/if}

      <!-- Image URL Input with Preview -->
      <input type="url" bind:value={imageUrl} placeholder="https://example.com/image.jpg" />
      {#if errors.imageUrl}<p class="error">{errors.imageUrl}</p>{/if}
      {#if imageUrl && !errors.imageUrl}
        <img src={imageUrl} alt="Preview"
             onerror={() => { errors.imageUrl = 'Failed to load image.'; }} />
      {/if}

      <!-- Is Active Checkbox -->
      <label>
        <input type="checkbox" bind:checked={isActive} />
        Display on website (Active)
      </label>
    </form>

    <!-- Footer with action buttons -->
    <div class="modal-footer">
      <button onclick={onClose} disabled={isSubmitting}>Cancel</button>
      <button onclick={handleSubmit} disabled={isSubmitting}>
        {#if isSubmitting}Saving...{:else}Save Celebrity Card{/if}
      </button>
    </div>
  </div>
</div>
```

**Data Structure:**
```typescript
interface CelebrityCard {
  id?: string;
  name: string;           // e.g., "Banita Sandhu"
  profession: string;     // e.g., "Actress"
  imageUrl: string;       // Full URL
  isActive: boolean;      // Visibility toggle
  createdAt: string;
  updatedAt: string;
}
```

---

### TestimonialModal.svelte (Admin)
**Location:** `src/lib/components/admin/TestimonialModal.svelte`
**Added:** Nov 2025

**Purpose:** Modal form for adding/editing testimonials in the admin content management system

**Key Features:**
- Create new or edit existing testimonials
- Character counter (500 character limit for testimonial text)
- Form validation for all fields
- Image URL validation with live preview
- Toggle visibility (isActive)
- Loading states during submission
- Error handling and user feedback
- Escape key and backdrop click to close

**Pattern Used:**
```
- Svelte 5 runes ($state, $props, $derived)
- Props for testimonial data and callbacks
- Form validation with error messages
- Character counting with $derived
- Image preview with error handling
- Firestore integration (addTestimonial, updateTestimonial)
- Modal backdrop pattern
```

**File Structure:**
```svelte
<script lang="ts">
  import { addTestimonial, updateTestimonial, type FirestoreTestimonial } from '$lib/firestore';
  import type { Testimonial } from '$lib/types/content';

  interface Props {
    testimonial: FirestoreTestimonial | null;
    onClose: () => void;
    onSave: () => void;
  }

  let { testimonial = null, onClose, onSave }: Props = $props();

  // Form state using Svelte 5 $state rune
  let name = $state(testimonial?.name || '');
  let designation = $state(testimonial?.designation || '');
  let imageUrl = $state(testimonial?.imageUrl || '');
  let text = $state(testimonial?.text || '');
  let isActive = $state(testimonial?.isActive ?? true);

  // Character counter using $derived
  let characterCount = $derived(text.length);
  const characterLimit = 500;

  // Validation errors
  let errors = $state<Record<string, string>>({});
  let isSubmitting = $state(false);
  let errorMessage = $state('');

  function validateForm(): boolean {
    errors = {};

    if (!name.trim() || name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!designation.trim() || designation.trim().length < 2) {
      errors.designation = 'Designation must be at least 2 characters';
    }

    if (!imageUrl.trim()) {
      errors.imageUrl = 'Image URL is required';
    } else if (!imageUrl.match(/^https?:\/\/.+/)) {
      errors.imageUrl = 'Please enter a valid URL';
    }

    if (!text.trim() || text.trim().length < 10) {
      errors.text = 'Testimonial must be at least 10 characters';
    }

    if (text.length > characterLimit) {
      errors.text = `Testimonial cannot exceed ${characterLimit} characters`;
    }

    return Object.keys(errors).length === 0;
  }

  async function handleSubmit() {
    if (!validateForm()) return;

    isSubmitting = true;
    errorMessage = '';

    try {
      const testimonialData = {
        name: name.trim(),
        designation: designation.trim(),
        imageUrl: imageUrl.trim(),
        text: text.trim(),
        isActive
      };

      if (testimonial?.id) {
        await updateTestimonial(testimonial.id, testimonialData);
      } else {
        await addTestimonial(testimonialData);
      }

      onSave();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      errorMessage = 'Failed to save testimonial. Please try again.';
    } finally {
      isSubmitting = false;
    }
  }
</script>

<!-- Modal structure similar to CelebrityCardModal -->
<!-- Additional field: Testimonial Text with character counter -->
<textarea bind:value={text} maxlength={characterLimit} />
<p class="character-count">{characterCount}/{characterLimit}</p>
```

**Data Structure:**
```typescript
interface Testimonial {
  id?: string;
  name: string;           // e.g., "Rajesh Kumar"
  designation: string;    // e.g., "Beneficiary, Punjab"
  imageUrl: string;       // Full URL
  text: string;           // Testimonial content (max 500 chars)
  isActive: boolean;      // Visibility toggle
  createdAt: string;
  updatedAt: string;
}
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
  import CelebrityEndorsementsSection from '$lib/components/home/CelebrityEndorsementsSection.svelte';
  import OurImpactSection from '$lib/components/home/OurImpactSection.svelte';
</script>

<!-- Page composition -->
<Hero />
<CampaignCarousel />
<ImpactCounterSection />
<MissionSection />
<CelebrityEndorsementsSection /> <!-- Added Nov 2024 -->
<OurImpactSection />

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
| CelebrityEndorsementsSection | `src/lib/components/home/CelebrityEndorsementsSection.svelte` (Added Nov 2024) |
| SubmissionModal | `src/lib/components/admin/SubmissionModal.svelte` |
