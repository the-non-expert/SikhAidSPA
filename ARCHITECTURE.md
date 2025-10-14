# 🏗️ Architecture Overview - SikhAid Form System

## Current Implementation

```
┌─────────────────────────────────────────────────────────────┐
│                    USER FILLS FORM                          │
│  (Contact / Volunteering / CSR)                             │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│              SVELTEKIT FRONTEND                             │
│  • Validates data                                           │
│  • Shows loading state                                      │
│  • Handles errors                                           │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ├──────────── LOCAL STORE ─────────────►
                  │              (console.log)
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│              FIREBASE FIRESTORE                             │
│  • contact_submissions/                                     │
│  • volunteer_submissions/                                   │
│  • csr_submissions/                                         │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  │ (Admin Access Only)
                  ▼
┌─────────────────────────────────────────────────────────────┐
│              ADMIN DASHBOARD                                │
│  URL: /admin                                                │
│  • Protected with password                                  │
│  • View all submissions                                     │
│  • Update status (new/read/resolved)                        │
│  • Refresh button to reload data                            │
│  • Export to CSV                                            │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow - Form Submission

```
User fills form
       │
       ▼
handleSubmit() function triggered
       │
       ├─► addContactSubmission(formData)      [Local Store]
       │        └─► console.log()
       │
       └─► addContactToFirestore(formData)     [Firebase]
                  │
                  ├─► Creates document with:
                  │   • All form fields
                  │   • timestamp
                  │   • status: 'new'
                  │   • firestoreTimestamp (for sorting)
                  │
                  ├─► Returns document ID
                  │
                  └─► Success! ✅
                           │
                           ▼
                  Form resets
                  Success message shown
```

## Admin Dashboard Flow

```
Admin visits /admin
       │
       ▼
Login page shown
       │
       ▼
Enter username:password
       │
       ├─► Check against VITE_ADMIN_USERS
       │
       ├─► ✅ Valid → Set cookie → Redirect to dashboard
       │
       └─► ❌ Invalid → Show error
              │
              ▼
Dashboard loads
       │
       ├─► Tab: Contact (show contact_submissions)
       ├─► Tab: Volunteers (show volunteer_submissions)  
       └─► Tab: CSR (show csr_submissions)
              │
              ▼
For each tab:
       │
       ├─► getContactSubmissions() from Firestore
       ├─► Display in table (sorted by date, newest first)
       ├─► Show status badges (🆕 new, 👁️ read, ✅ resolved)
       ├─► Allow status updates
       └─► Refresh button → Re-fetch from Firestore
```

## File Structure

```
src/
├── lib/
│   ├── firebase.ts              ← Firebase initialization
│   ├── firestore.ts             ← Firestore CRUD functions
│   └── stores/
│       ├── contact.ts           ← Local store (console.log)
│       ├── volunteering.ts      ← Local store  
│       └── csr.ts               ← Local store
│
├── routes/
│   ├── contact/+page.svelte     ← Contact form (updated ✅)
│   ├── volunteering/+page.svelte ← Volunteer form (updated ✅)
│   ├── csr/+page.svelte         ← CSR form (updated ✅)
│   └── admin/                   ← TO BE CREATED
│       ├── +layout.svelte       ← Auth check
│       ├── +page.svelte         ← Dashboard
│       ├── login/+page.svelte   ← Login form
│       └── logout/+page.server.ts ← Logout handler
│
└── .env                         ← Firebase config (TO BE FILLED)
```

## Security Model

```
PUBLIC ACCESS (No Authentication):
  ✅ Can CREATE submissions in Firestore
  ❌ Cannot READ submissions
  ❌ Cannot UPDATE submissions
  ❌ Cannot DELETE submissions

ADMIN ACCESS (Authenticated):
  ✅ Can READ all submissions
  ✅ Can UPDATE submission status
  ❌ Cannot DELETE submissions (data retention)

HARDCODED AUTH:
  • 3-4 admin users in .env
  • Format: username:password,username2:password2
  • Cookie-based session
  • No Firebase Auth needed (simpler)
```

## Collections Schema

### contact_submissions
| Field             | Type      | Description                    |
|-------------------|-----------|--------------------------------|
| name              | string    | Full name                      |
| email             | string    | Email address                  |
| phone             | string    | Phone number                   |
| subject           | string    | Inquiry subject                |
| message           | string    | Message content                |
| timestamp         | string    | ISO timestamp                  |
| status            | string    | new / read / resolved          |
| firestoreTimestamp| Timestamp | Server timestamp for sorting   |

### volunteer_submissions
| Field             | Type      | Description                    |
|-------------------|-----------|--------------------------------|
| fullName          | string    | Full name                      |
| email             | string    | Email address                  |
| mobile            | string    | Mobile number                  |
| gender            | string    | Gender                         |
| address           | string    | Full address                   |
| opportunity       | string    | Selected opportunity           |
| durationMonths    | string    | Duration in months             |
| durationYears     | string    | Duration in years              |
| startDate         | string    | Available start date           |
| about             | string    | About themselves               |
| timestamp         | string    | ISO timestamp                  |
| status            | string    | new / read / resolved          |
| firestoreTimestamp| Timestamp | Server timestamp               |

### csr_submissions
| Field             | Type      | Description                    |
|-------------------|-----------|--------------------------------|
| companyName       | string    | Company name                   |
| contactPerson     | string    | Contact person name            |
| email             | string    | Email address                  |
| phone             | string    | Phone number                   |
| companySize       | string    | Company size range             |
| industry          | string    | Industry type                  |
| partnershipInterest | string[] | Selected partnership models   |
| budgetRange       | string    | Budget range                   |
| message           | string    | Requirements/message           |
| timestamp         | string    | ISO timestamp                  |
| status            | string    | new / read / resolved          |
| firestoreTimestamp| Timestamp | Server timestamp               |

## What Makes This Great

✅ **Simple**: No complex backend, no APIs to maintain
✅ **Free**: Firebase free tier easily handles 500 submissions/month
✅ **Secure**: Firestore security rules protect the data
✅ **Real-time**: Admin sees data instantly
✅ **Scalable**: Can handle 10x growth without code changes
✅ **Reliable**: Google's infrastructure, 99.9% uptime
✅ **No Lock-in**: All data exportable, can migrate anytime

## Next Phase: Admin Dashboard

Once Firestore is working, I'll build:

1. **Login Page** (`/admin/login`)
   - Simple username:password form
   - Hardcoded credentials from .env
   - Cookie-based session

2. **Dashboard** (`/admin`)
   - Three tabs: Contact | Volunteers | CSR
   - Table view with all submissions
   - Status badges and filters
   - Refresh button
   - Export to CSV button

3. **Layout Protection** (`/admin/+layout.svelte`)
   - Checks for valid session
   - Redirects to login if not authenticated
   - Shows logout button

All styled with Tailwind to match your current design! 🎨
