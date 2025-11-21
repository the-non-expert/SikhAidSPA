# SikhAid Data Schemas Reference

## Complete TypeScript Interfaces

### Campaign Schema

```typescript
// src/lib/types/campaign.ts

export interface Campaign {
  slug: string;              // URL-friendly identifier (e.g., 'langar-aid')
  title: string;             // Display title
  subtitle: string;          // Short tagline
  shortDescription: string;  // Brief summary for cards/listings
  fullDescription: string;   // Full campaign details
  image: string;             // Main campaign image path
  category: string;          // Campaign category
  status: CampaignStatus;    // Current status
  impactStats: ImpactStat[]; // Statistics array
  howItWorks: HowItWorksStep[]; // Process steps
  gallery: GalleryImage[];   // Image gallery
  featured?: boolean;        // Optional: Show in featured carousel
}

export type CampaignStatus = 'ongoing' | 'completed' | 'seasonal';

export interface ImpactStat {
  label: string;   // Stat label (e.g., 'Meals Served')
  value: string;   // Stat value (e.g., '100,000+')
  icon: string;    // Iconify icon name (e.g., 'mdi:food')
}

export interface HowItWorksStep {
  step: number;       // Step number
  title: string;      // Step title
  description: string; // Step description
}

export interface GalleryImage {
  src: string;  // Image path
  alt: string;  // Alt text for accessibility
}
```

### Contact Submission Schema

```typescript
// src/lib/stores/contact.ts

export interface ContactSubmission {
  name: string;      // Full name
  email: string;     // Email address
  phone: string;     // Phone number (10 digits)
  subject: string;   // Message subject
  message: string;   // Message content
  timestamp: number; // Unix timestamp (milliseconds)
}

// Extended Firestore version
export interface FirestoreContactSubmission extends ContactSubmission {
  id?: string;                    // Firestore document ID
  status: SubmissionStatus;       // Processing status
  firestoreTimestamp?: Timestamp; // Firestore Timestamp object
}

export type SubmissionStatus = 'new' | 'read' | 'resolved';
```

### Volunteer Submission Schema

```typescript
// src/lib/stores/volunteering.ts

export interface VolunteerSubmission {
  fullName: string;       // Volunteer's full name
  email: string;          // Email address
  mobile: string;         // Mobile number (10 digits)
  gender: string;         // Gender (Male/Female/Other)
  address: string;        // Full address
  opportunity: string;    // Selected opportunity
  durationMonths: number; // Duration in months (0-11)
  durationYears: number;  // Duration in years
  startDate: string;      // Preferred start date (YYYY-MM-DD)
  about: string;          // About the volunteer
  timestamp: number;      // Unix timestamp
}

// Extended Firestore version
export interface FirestoreVolunteerSubmission extends VolunteerSubmission {
  id?: string;
  status: SubmissionStatus;
  firestoreTimestamp?: Timestamp;
}
```

### CSR Submission Schema

```typescript
// src/lib/stores/csr.ts

export interface CSRSubmission {
  companyName: string;    // Company name
  contactPerson: string;  // Contact person name
  email: string;          // Company email
  phone: string;          // Company phone
  companySize: string;    // Company size category
  interests: string[];    // Array of interest areas
  message: string;        // Additional message
  timestamp: number;      // Unix timestamp
}

// Extended Firestore version
export interface FirestoreCSRSubmission extends CSRSubmission {
  id?: string;
  status: SubmissionStatus;
  firestoreTimestamp?: Timestamp;
}

// Company size options
export type CompanySize =
  | '1-50'
  | '51-200'
  | '201-500'
  | '501-1000'
  | '1000+';

// Interest areas
export type CSRInterest =
  | 'Education'
  | 'Healthcare'
  | 'Hunger Relief'
  | 'Disaster Relief'
  | 'Community Development'
  | 'Environment';
```

### Blog Post Schema

```typescript
// src/lib/data/blogs.js (JavaScript file, but conceptual types)

export interface BlogPost {
  slug: string;       // URL-friendly identifier
  title: string;      // Post title
  excerpt: string;    // Short excerpt for listings
  content: string;    // Full post content (can be HTML/Markdown)
  author: string;     // Author name
  date: string;       // Publication date (YYYY-MM-DD)
  image: string;      // Featured image path
  category: string;   // Post category
  tags?: string[];    // Optional tags
  readTime?: number;  // Optional: estimated read time in minutes
}
```

### Donation Data Schema

```typescript
// src/lib/razorpay.ts

export interface DonationData {
  amount: number;    // Amount in INR (minimum 10, maximum 500000)
  name: string;      // Donor name (minimum 2 characters)
  phone: string;     // 10-digit mobile number starting with 6-9
  email?: string;    // Optional email address
  panCard?: string;  // Required for donations >= ₹2,000 (10 chars: 5 letters, 4 digits, 1 letter)
}

export interface RazorpayResponse {
  razorpay_payment_id: string;   // Payment ID from Razorpay
  razorpay_order_id?: string;    // Optional order ID
  razorpay_signature?: string;   // Optional signature for verification
}
```

### Donation (Firestore) Schema

```typescript
// src/lib/firestore.ts

export interface Donation {
  id?: string;                    // Firestore document ID
  donorName: string;              // Donor's full name
  phone: string;                  // 10-digit mobile number
  panCard?: string;               // PAN Card (required for amounts >= ₹2,000)
  amount: number;                 // Donation amount in INR
  razorpayPaymentId: string;      // Razorpay payment ID
  razorpayOrderId?: string;       // Optional Razorpay order ID
  timestamp: string;              // ISO 8601 timestamp string
  firestoreTimestamp?: Timestamp; // Firestore Timestamp object
}
```

## Firestore Document Structure

### contact_submissions Collection

```
contact_submissions/{documentId}
  ├── name: string
  ├── email: string
  ├── phone: string
  ├── subject: string
  ├── message: string
  ├── status: 'new' | 'read' | 'resolved'
  ├── timestamp: Firestore Timestamp
  └── firestoreTimestamp: Firestore Timestamp
```

**Example Document:**
```javascript
{
  name: "John Doe",
  email: "john@example.com",
  phone: "9876543210",
  subject: "Partnership Inquiry",
  message: "I would like to discuss...",
  status: "new",
  timestamp: Timestamp(seconds=1704067200, nanoseconds=0)
}
```

### volunteer_submissions Collection

```
volunteer_submissions/{documentId}
  ├── fullName: string
  ├── email: string
  ├── mobile: string
  ├── gender: string
  ├── address: string
  ├── opportunity: string
  ├── durationMonths: number
  ├── durationYears: number
  ├── startDate: string (YYYY-MM-DD)
  ├── about: string
  ├── status: 'new' | 'read' | 'resolved'
  └── timestamp: Firestore Timestamp
```

**Example Document:**
```javascript
{
  fullName: "Jane Smith",
  email: "jane@example.com",
  mobile: "9123456789",
  gender: "Female",
  address: "123 Main St, City, State - 12345",
  opportunity: "Teaching",
  durationMonths: 6,
  durationYears: 0,
  startDate: "2024-02-01",
  about: "I have experience teaching...",
  status: "new",
  timestamp: Timestamp(seconds=1704067200, nanoseconds=0)
}
```

### csr_submissions Collection

```
csr_submissions/{documentId}
  ├── companyName: string
  ├── contactPerson: string
  ├── email: string
  ├── phone: string
  ├── companySize: string
  ├── interests: string[] (array)
  ├── message: string
  ├── status: 'new' | 'read' | 'resolved'
  └── timestamp: Firestore Timestamp
```

**Example Document:**
```javascript
{
  companyName: "Tech Corp Inc.",
  contactPerson: "Alice Johnson",
  email: "alice@techcorp.com",
  phone: "9876543210",
  companySize: "201-500",
  interests: ["Education", "Community Development"],
  message: "We are interested in CSR partnership...",
  status: "new",
  timestamp: Timestamp(seconds=1704067200, nanoseconds=0)
}
```

### donations Collection

```
donations/{documentId}
  ├── donorName: string
  ├── phone: string
  ├── panCard: string (optional, required for amounts >= ₹2,000)
  ├── amount: number
  ├── razorpayPaymentId: string
  ├── razorpayOrderId: string (optional)
  ├── timestamp: string (ISO 8601)
  └── firestoreTimestamp: Firestore Timestamp
```

**Example Document:**
```javascript
{
  donorName: "Amit Sharma",
  phone: "9876543210",
  panCard: "ABCDE1234F",
  amount: 5000,
  razorpayPaymentId: "pay_NjhKJhsd8973hs",
  razorpayOrderId: "order_NjhKJhsd8973hs",
  timestamp: "2024-11-11T10:30:00.000Z",
  firestoreTimestamp: Timestamp(seconds=1731320200, nanoseconds=0)
}
```

**Note:** PAN Card is required for donations of ₹2,000 or more as per Indian tax regulations. Donations below ₹2,000 will not have a panCard field.

### Content Management Schemas

#### Celebrity Card Schema

```typescript
// src/lib/types/content.ts

export interface CelebrityCard {
  id?: string;                    // Firestore document ID
  name: string;                   // Celebrity name (e.g., "Banita Sandhu")
  profession: string;             // What they do (e.g., "Actress")
  imageUrl: string;               // Full image URL
  isActive: boolean;              // Visibility toggle for frontend
  createdAt: string;              // ISO 8601 timestamp string
  updatedAt: string;              // ISO 8601 timestamp string
  firestoreTimestamp?: Timestamp; // Firestore Timestamp object
}

// Extended Firestore version
export interface FirestoreCelebrityCard extends CelebrityCard {
  id: string; // Required for Firestore documents
}
```

#### Testimonial Schema

```typescript
// src/lib/types/content.ts

export interface Testimonial {
  id?: string;                    // Firestore document ID
  name: string;                   // Person's name (e.g., "Rajesh Kumar")
  designation: string;            // Role/Location (e.g., "Beneficiary, Punjab")
  imageUrl: string;               // Full image URL
  text: string;                   // Testimonial content (max 500 characters)
  isActive: boolean;              // Visibility toggle for frontend
  createdAt: string;              // ISO 8601 timestamp string
  updatedAt: string;              // ISO 8601 timestamp string
  firestoreTimestamp?: Timestamp; // Firestore Timestamp object
}

// Extended Firestore version
export interface FirestoreTestimonial extends Testimonial {
  id: string; // Required for Firestore documents
}
```

### celebrity_cards Collection

```
celebrity_cards/{documentId}
  ├── name: string
  ├── profession: string
  ├── imageUrl: string
  ├── isActive: boolean
  ├── createdAt: string (ISO 8601)
  ├── updatedAt: string (ISO 8601)
  └── firestoreTimestamp: Firestore Timestamp
```

**Example Document:**
```javascript
{
  name: "Banita Sandhu",
  profession: "Actress",
  imageUrl: "/personalities/banita-sandhu.jpg",
  isActive: true,
  createdAt: "2025-11-21T10:30:00.000Z",
  updatedAt: "2025-11-21T10:30:00.000Z",
  firestoreTimestamp: Timestamp(seconds=1732185000, nanoseconds=0)
}
```

### testimonials Collection

```
testimonials/{documentId}
  ├── name: string
  ├── designation: string
  ├── imageUrl: string
  ├── text: string (max 500 characters)
  ├── isActive: boolean
  ├── createdAt: string (ISO 8601)
  ├── updatedAt: string (ISO 8601)
  └── firestoreTimestamp: Firestore Timestamp
```

**Example Document:**
```javascript
{
  name: "Rajesh Kumar",
  designation: "Beneficiary, Punjab",
  imageUrl: "https://ui-avatars.com/api/?name=Rajesh+Kumar&size=200",
  text: "SikhAid saved our family during the floods. Their quick response and compassionate care gave us hope when we had lost everything.",
  isActive: true,
  createdAt: "2025-11-21T10:30:00.000Z",
  updatedAt: "2025-11-21T10:30:00.000Z",
  firestoreTimestamp: Timestamp(seconds=1732185000, nanoseconds=0)
}
```

## Validation Rules

### Email Validation
```typescript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email: string): boolean {
  return emailRegex.test(email);
}
```

### Phone Validation (Indian Mobile)
```typescript
const phoneRegex = /^[6-9]\d{9}$/;

function validatePhone(phone: string): boolean {
  return phoneRegex.test(phone);
}
```

### Name Validation
```typescript
function validateName(name: string): boolean {
  return name.trim().length >= 2;
}
```

### Amount Validation
```typescript
const MIN_AMOUNT = 10;
const MAX_AMOUNT = 500000;

function validateAmount(amount: number): boolean {
  return amount >= MIN_AMOUNT && amount <= MAX_AMOUNT;
}
```

### PAN Card Validation
```typescript
// PAN Card format: 5 letters + 4 digits + 1 letter (e.g., ABCDE1234F)
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

function validatePanCard(panCard: string, amount: number): string | null {
  // PAN is required for donations >= ₹2,000
  if (amount >= 2000) {
    if (!panCard || panCard.trim().length === 0) {
      return 'PAN Card is required for donations of ₹2,000 or more';
    }
    if (!panRegex.test(panCard.toUpperCase())) {
      return 'Invalid PAN format (e.g., ABCDE1234F)';
    }
  }
  return null; // Valid
}
```

## Default Values & Constants

### Form Initial States

```typescript
// Contact Form
const defaultContactForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
};

// Volunteer Form
const defaultVolunteerForm = {
  fullName: '',
  email: '',
  mobile: '',
  gender: '',
  address: '',
  opportunity: '',
  durationMonths: 0,
  durationYears: 0,
  startDate: '',
  about: ''
};

// CSR Form
const defaultCSRForm = {
  companyName: '',
  contactPerson: '',
  email: '',
  phone: '',
  companySize: '',
  interests: [],
  message: ''
};
```

### Donation Presets
```typescript
const DONATION_AMOUNTS = [
  500,
  1000,
  2000,
  5000,
  10000
];
```

### Campaign Categories
```typescript
const CAMPAIGN_CATEGORIES = [
  'hunger-relief',
  'education',
  'healthcare',
  'disaster-relief',
  'community-development'
];
```

### Volunteer Opportunities
```typescript
const VOLUNTEER_OPPORTUNITIES = [
  'Teaching',
  'Food Distribution',
  'Healthcare Support',
  'Community Outreach',
  'Event Management',
  'Social Media & Marketing',
  'Fundraising',
  'Administrative Support'
];
```

### CSR Interest Areas
```typescript
const CSR_INTERESTS = [
  'Education',
  'Healthcare',
  'Hunger Relief',
  'Disaster Relief',
  'Community Development',
  'Environment',
  'Women Empowerment',
  'Skill Development'
];
```

## Status Workflow

### Submission Status Transitions

```
new → read → resolved

new:      Initial status when submission is created
read:     Admin has viewed the submission
resolved: Action taken, submission completed
```

**Status Update Function:**
```typescript
async function updateStatus(
  collection: string,
  docId: string,
  newStatus: 'new' | 'read' | 'resolved'
) {
  await updateSubmissionStatus(collection, docId, newStatus);
}
```

## Data Import Patterns

### Importing Types
```svelte
<script lang="ts">
  // Campaign types
  import type { Campaign, ImpactStat } from '$lib/types/campaign';

  // Submission types
  import type { ContactSubmission } from '$lib/stores/contact';
  import type { VolunteerSubmission } from '$lib/stores/volunteering';
  import type { CSRSubmission } from '$lib/stores/csr';

  // Donation types
  import type { DonationData } from '$lib/razorpay';
  import type { Donation } from '$lib/firestore';

  // Firestore types
  import type {
    FirestoreContactSubmission,
    FirestoreVolunteerSubmission,
    FirestoreCSRSubmission
  } from '$lib/firestore';

  // Firebase types
  import type { Timestamp } from 'firebase/firestore';
</script>
```

### Importing Data
```svelte
<script lang="ts">
  // Static data
  import { campaigns } from '$lib/data/campaigns';
  import { blogs } from '$lib/data/blogs';

  // Stores
  import { selectedAmount } from '$lib/stores/donation';
  import { contactSubmissions } from '$lib/stores/contact';

  // Firestore functions
  import {
    addContactToFirestore,
    getContactSubmissions,
    updateSubmissionStatus,
    addDonationToFirestore,
    getDonations
  } from '$lib/firestore';

  // Payment functions
  import { openRazorpayCheckout, validatePanCard } from '$lib/razorpay';
</script>
```

## Example Data Objects

### Campaign Example
```javascript
{
  slug: 'langar-aid',
  title: 'Langar Aid',
  subtitle: 'Free Meals for All',
  shortDescription: 'Serving nutritious meals to those in need across Punjab.',
  fullDescription: 'Our Langar Aid program provides free, nutritious meals...',
  image: '/images/langar-aid.jpg',
  category: 'hunger-relief',
  status: 'ongoing',
  featured: true,
  impactStats: [
    { label: 'Meals Served', value: '100,000+', icon: 'mdi:food' },
    { label: 'Families Helped', value: '25,000+', icon: 'mdi:account-group' }
  ],
  howItWorks: [
    {
      step: 1,
      title: 'Identify Needs',
      description: 'We identify communities in need of food assistance.'
    },
    {
      step: 2,
      title: 'Prepare Meals',
      description: 'Fresh, nutritious meals are prepared daily.'
    }
  ],
  gallery: [
    { src: '/images/langar1.jpg', alt: 'Community meal service' },
    { src: '/images/langar2.jpg', alt: 'Volunteers serving food' }
  ]
}
```

### Contact Submission Example
```javascript
{
  name: 'Rajesh Kumar',
  email: 'rajesh@example.com',
  phone: '9876543210',
  subject: 'Volunteer Inquiry',
  message: 'I would like to volunteer for the langar program.',
  timestamp: 1704067200000,
  status: 'new'
}
```

### Volunteer Submission Example
```javascript
{
  fullName: 'Priya Singh',
  email: 'priya@example.com',
  mobile: '9123456789',
  gender: 'Female',
  address: '456 Park Ave, Ludhiana, Punjab - 141001',
  opportunity: 'Teaching',
  durationMonths: 6,
  durationYears: 1,
  startDate: '2024-03-01',
  about: 'I am a certified teacher with 5 years of experience...',
  timestamp: 1704067200000,
  status: 'new'
}
```

### Donation Example
```javascript
// Donation with PAN Card (amount >= ₹2,000)
{
  donorName: 'Amit Sharma',
  phone: '9876543210',
  panCard: 'ABCDE1234F',
  amount: 5000,
  razorpayPaymentId: 'pay_NjhKJhsd8973hs',
  razorpayOrderId: 'order_NjhKJhsd8973hs',
  timestamp: '2024-11-11T10:30:00.000Z'
}

// Donation without PAN Card (amount < ₹2,000)
{
  donorName: 'Neha Gupta',
  phone: '9123456789',
  amount: 1000,
  razorpayPaymentId: 'pay_MkhsKjh8765ds',
  timestamp: '2024-11-11T11:15:00.000Z'
}
```

## Type Guards & Utility Functions

### Type Checking
```typescript
function isContactSubmission(obj: any): obj is ContactSubmission {
  return (
    typeof obj.name === 'string' &&
    typeof obj.email === 'string' &&
    typeof obj.phone === 'string' &&
    typeof obj.subject === 'string' &&
    typeof obj.message === 'string' &&
    typeof obj.timestamp === 'number'
  );
}

function isCampaign(obj: any): obj is Campaign {
  return (
    typeof obj.slug === 'string' &&
    typeof obj.title === 'string' &&
    Array.isArray(obj.impactStats)
  );
}
```

### Timestamp Conversion
```typescript
import { Timestamp } from 'firebase/firestore';

// Unix timestamp to Firestore Timestamp
function toFirestoreTimestamp(unixMs: number): Timestamp {
  return Timestamp.fromMillis(unixMs);
}

// Firestore Timestamp to Unix timestamp
function toUnixTimestamp(timestamp: Timestamp): number {
  return timestamp.toMillis();
}

// Firestore Timestamp to Date
function toDate(timestamp: Timestamp): Date {
  return timestamp.toDate();
}
```

### Data Formatting
```typescript
// Format phone number
function formatPhone(phone: string): string {
  // 9876543210 → +91 98765 43210
  return `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`;
}

// Format date
function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Format currency
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount);
}
```
