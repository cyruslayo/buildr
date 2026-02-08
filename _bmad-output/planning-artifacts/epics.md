---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/architecture.md'  
  - '_bmad-output/planning-artifacts/ux-design-specification.md'
  - '_bmad-output/planning-artifacts/project-context.md'
---

# Buildr - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Buildr, decomposing the requirements from the PRD, UX Design, and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

**3G Wizard Core (Offline & Performance)**
- **FR1:** Users can create and edit property drafts entirely offline (Service Worker architecture).
- **FR2:** System must persist form data to `localStorage` on every keystroke/change to prevent data loss.
- **FR3:** Users can navigate between wizard steps immediately (Optimistic UI) without waiting for server response.
- **FR4:** System must background-sync draft data to the server when connection is available.
- **FR5:** Users can publish a page only when all assets have successfully synced and validated.

**Asset Governance ("Walled Garden")**
- **FR6:** Users can upload images for property listings.
- **FR7:** System must automatically crop/resize uploaded images to a fixed 4:3 aspect ratio before final storage.
- **FR8:** System must block uploads exceeding 5MB and provide a user-friendly error message.
- **FR9:** Users can select color schemes only from a predefined set of "Style Presets" (no color picker).
- **FR10:** Users can select typography pairs only from a predefined set of "Font Pairings".

**Team Management (Agency Context)**
- **FR11:** Agency Admins can invite team members via email address.
- **FR12:** Users can accept invitations to join an Agency Team.
- **FR13:** Agency Admins can assign "Admin" or "Editor" roles to team members.
- **FR14:** Agency Admins can remove members from the team.
- **FR15:** Agency Admins can lock specific templates so only Admins can create pages with them.
- **FR16:** Team Members can duplicate existing pages created by other team members for reuse.

**Property Management & Output**
- **FR17:** Users can view a dashboard list of all their created pages with status (Draft, Published).
- **FR18:** Users can unpublish a live page.
- **FR19:** System must generate a unique subdomain URL (`agency.buildr.ng/property-slug`) for published pages.
- **FR20:** Users can delete drafts (soft delete).

**Compliance & Trust**
- **FR21:** Users (Leads) must explicitly check an "I agree to be contacted" box on lead forms (NDPR).
- **FR22:** Users can upload RC Number or NIN documents for verification.
- **FR23:** System must display a "Verified" badge on published pages if the creator's KYC status is "Verified".

### Non-Functional Requirements

**Performance (The "3G Budget")**
- **NFR1 (Shell Load):** The Wizard App Shell must load and become interactive (TTI) within 5 seconds on a simulated Slow 3G network.
- **NFR2 (Input Latency):** Form typing must have <16ms latency (60fps) regardless of background sync operations.
- **NFR3 (Published Pages):** All generated landing pages must achieve a Google Lighthouse Performance Score >90 on Mobile.

**Security & Compliance**
- **NFR4 (Team Isolation):** Strict multi-tenant enforcement. A user in Team A must strictly NEVER be able to read/write drafts belonging to Team B (enforced via Row Level Security or Middleware).
- **NFR5 (Asset Sanitation):** All public images must be stripped of EXIF metadata (GPS locations) during the optimization process.
- **NFR6 (Consent Logs):** System must store a timestamped audit log of every "NDPR Consent" checkbox engagement.

**Reliability (Offline First)**
- **NFR7 (Crash Recovery):** If the browser crashes or is force-closed, 100% of the explicit form data must be restored from `localStorage` upon reopening the wizard.

**Accessibility**
- **NFR8 (Template Output):** All generated templates must pass WCAG 2.1 AA standards for Color Contrast and Aria Labels by default.

### Additional Requirements

**From Architecture Document:**
- **AR1:** Implement Hybrid State Pattern using URL params (navigation truth) + Zustand (data truth)
- **AR2:** Direct-to-Cloudinary uploads via signed URLs to bypass Vercel 4.5MB body limit
- **AR3:** Middleware-level `teamId` injection for multi-tenant data isolation
- **AR4:** Feature Co-Location structure (`src/features/{domain}/`) for domain isolation
- **AR5:** Optimistic-First UI pattern - No blocking spinners on wizard transitions
- **AR6:** Downgrade to stable stack: Next.js 15, React 18, Tailwind 3.4
- **AR7:** Service Worker for PWA App Shell caching
- **AR8:** Strict naming: Verb-Subject for Server Actions (`updatePropertyDraft`, not `handleSave`)

**From UX Document:**
- **UX1:** Hybrid Flow layout (Spacious for high-risk inputs like Price/Location, Dense for low-risk like Amenities)
- **UX2:** Custom `WizardShell` component with dynamic layout mode switching
- **UX3:** `BigInput` component (42px font, border-bottom only) for focused single-field steps
- **UX4:** `AmenitiesPicker` as tap-friendly toggle chips grid
- **UX5:** `ImageGridPicker` with optimistic blob preview and auto-crop to 4:3
- **UX6:** Zero-Spinner Policy - use non-blocking status indicators (cloud sync icon)
- **UX7:** Skeleton loading (min 200ms display) for perceived performance
- **UX8:** Responsive "Field Focus" (mobile) + "Power Preview" (desktop with live iPhone frame)
- **UX9:** Touch targets minimum 48px height
- **UX10:** Keyboard shortcuts: `Cmd+S` (Save), `Cmd+Enter` (Next Step) for desktop

### FR Coverage Map

| FR | Epic | Description |
|----|------|-------------|
| FR1 | Epic 2 | Offline drafts (Service Worker) |
| FR2 | Epic 2 | localStorage persistence |
| FR3 | Epic 2 | Optimistic UI navigation |
| FR4 | Epic 2 | Background sync |
| FR5 | Epic 2 | Publish validation |
| FR6 | Epic 3 | Image upload |
| FR7 | Epic 3 | 4:3 auto-crop |
| FR8 | Epic 3 | 5MB size limit |
| FR9 | Epic 3 | Style presets |
| FR10 | Epic 3 | Font pairings |
| FR11 | Epic 5 | Invite members |
| FR12 | Epic 5 | Accept invitations |
| FR13 | Epic 5 | Assign roles |
| FR14 | Epic 5 | Remove members |
| FR15 | Epic 5 | Lock templates |
| FR16 | Epic 5 | Duplicate pages |
| FR17 | Epic 4 | Dashboard list |
| FR18 | Epic 4 | Unpublish pages |
| FR19 | Epic 4 | Subdomain URLs |
| FR20 | Epic 4 | Soft delete |
| FR21 | Epic 1 | NDPR consent |
| FR22 | Epic 1 | KYC upload |
| FR23 | Epic 1 | Verified badge |

## Epic List

### Epic 1: Foundation & Authentication
Users can register, log in, and manage their accounts with verified status. A new agent can sign up, verify their identity (RC/NIN), and access the platform with trust signals.
**FRs covered:** FR21, FR22, FR23
**NFRs:** NFR4 (Team isolation), NFR6 (Consent logs)
**Additional:** AR3 (Multi-tenant middleware)

### Epic 2: Property Wizard - Create Listings
Users can create property listings through the step-by-step wizard with optimistic performance. Fatima can create a listing on 3G, even offline, without losing data.
**FRs covered:** FR1, FR2, FR3, FR4, FR5
**NFRs:** NFR1 (TTI <5s), NFR2 (Input latency), NFR7 (Crash recovery)
**Additional:** AR1 (Hybrid State), AR5 (Optimistic-First), AR7 (Service Worker), UX1-UX6

### Epic 3: Asset Governance - Image Pipeline
Users can upload images that are automatically optimized for Nigerian 3G networks. Emeka's 8MB DSLR photos are automatically compressed and formatted correctly.
**FRs covered:** FR6, FR7, FR8, FR9, FR10
**NFRs:** NFR3 (Lighthouse >90), NFR5 (EXIF stripping)
**Additional:** AR2 (Cloudinary direct upload), UX5 (ImageGridPicker)

### Epic 4: Dashboard & Property Management
Users can view, manage, publish, and unpublish their listings from a central dashboard. Chibuzo can see all agency listings, check status, and manage the content lifecycle.
**FRs covered:** FR17, FR18, FR19, FR20
**Additional:** UX7 (Skeleton loading), UX8 (Responsive layouts)

### Epic 5: Team Management - Agency Collaboration
Agency Admins can manage their team with roles and shared resources. Chibuzo can invite team members, assign roles, and lock premium templates.
**FRs covered:** FR11, FR12, FR13, FR14, FR15, FR16
**NFRs:** NFR4 (Strict team isolation)
**Additional:** AR3 (Middleware tenant isolation)

### Epic 6: Polish & Performance - 3G Excellence
System achieves production-grade performance and accessibility standards. All users experience <5s TTI on 3G, and WCAG AA compliance.
**FRs covered:** Quality layer across all features
**NFRs:** NFR1 (TTI), NFR3 (Lighthouse), NFR8 (WCAG AA)
**Additional:** AR6 (Stable stack), AR7 (PWA shell)

---

## Epic 1: Foundation & Authentication

Users can register, log in, and manage their accounts with verified status. A new agent can sign up, verify their identity (RC/NIN), and access the platform with trust signals.

### Story 1.1: User Registration with NDPR Consent

**As a** new real estate agent,
**I want** to create an account with my email and agree to contact terms,
**So that** I can start using Buildr while remaining NDPR compliant.

**Acceptance Criteria:**

**Given** I am on the registration page
**When** I enter my email, password, and check the "I agree to be contacted" checkbox
**Then** my account is created and I'm logged in
**And** a timestamped consent record is stored in the database (NFR6)

**Given** I try to register without checking the NDPR consent box
**When** I click "Create Account"
**Then** the form shows an error and prevents submission

---

### Story 1.2: User Login & Session Management

**As a** registered agent,
**I want** to log in with my credentials and stay authenticated,
**So that** I can access my dashboard and drafts securely.

**Acceptance Criteria:**

**Given** I am on the login page with valid credentials
**When** I submit the form
**Then** I am redirected to my dashboard with an active session

**Given** I am logged in and my session expires
**When** I try to access protected routes
**Then** I am redirected to login

---

### Story 1.3: KYC Document Upload for Verification

**As a** registered agent,
**I want** to upload my RC Number (Corporate) or NIN (Individual) document,
**So that** I can apply for "Verified" status and unlock premium features.

**Acceptance Criteria:**

**Given** I am logged in and on my profile/settings page
**When** I upload a valid document image (PDF/JPG/PNG, <5MB)
**Then** the document is stored and my `kyc_status` becomes "pending"
**And** I see a confirmation message

**Given** my document upload fails (wrong format, too large)
**When** I try to upload
**Then** I see a clear error message explaining the issue

---

### Story 1.4: Verified Badge Display

**As a** verified agent,
**I want** my published pages to show a "Verified" badge,
**So that** potential buyers trust my listings.

**Acceptance Criteria:**

**Given** my `kyc_status` is "verified"
**When** I publish a property page
**Then** the public page displays a visible "Verified Agent" badge

**Given** my `kyc_status` is "pending" or "unverified"
**When** I publish a property page
**Then** no verified badge is displayed

---

## Epic 2: Property Wizard - Create Listings

Users can create property listings through the step-by-step wizard with optimistic performance. Fatima can create a listing on 3G, even offline, without losing data.

### Story 2.1: Wizard Shell & Step Navigation

**As a** real estate agent,
**I want** to navigate through wizard steps with instant feedback,
**So that** I can create listings quickly without waiting for network responses.

**Acceptance Criteria:**

**Given** I start a new listing
**When** I click "Next" on any step
**Then** the UI transitions immediately (Optimistic UI) without blocking spinners

**Given** I am on step 3 of the wizard
**When** I click the browser back button
**Then** I return to step 2 with my data preserved (URL-based navigation)

---

### Story 2.2: localStorage Draft Persistence

**As a** field agent on unstable 3G,
**I want** my form data saved automatically on every keystroke,
**So that** I never lose my work if the browser crashes or closes.

**Acceptance Criteria:**

**Given** I am typing in any wizard field
**When** I type a character
**Then** the data is persisted to `localStorage` within 100ms

**Given** I close my browser mid-wizard and reopen the app
**When** I return to the wizard
**Then** all my previously entered data is restored (NFR7: 100% recovery)

---

### Story 2.3: Background Sync with Conflict Resolution

**As an** agent working on spotty 3G,
**I want** my drafts to sync to the server in the background,
**So that** I can access them from any device when connection returns.

**Acceptance Criteria:**

**Given** I am entering data and the network is available
**When** I finish typing (debounced 500ms)
**Then** the data syncs to the server in the background with a non-blocking cloud icon indicator

**Given** the network is offline
**When** I continue editing
**Then** changes queue locally and sync when connection returns

---

### Story 2.4: Property Details Entry (Spacious Mode)

**As an** agent,
**I want** to enter high-value fields (Price, Location, Title) with focused, spacious inputs,
**So that** I don't make costly typos on critical data.

**Acceptance Criteria:**

**Given** I am on the "Price" step
**When** the step loads
**Then** I see a single `BigInput` field (42px font, border-bottom only), centered and focused
**And** the currency prefix "₦" is displayed and non-editable

**Given** I enter a price
**When** I type numbers
**Then** the value auto-formats with thousands separators (e.g., "150,000,000")

---

### Story 2.5: Amenities & Description Entry (Dense Mode)

**As an** agent,
**I want** to quickly select property features and add descriptions,
**So that** I can complete the listing details efficiently.

**Acceptance Criteria:**

**Given** I am on the "Amenities" step
**When** the step loads
**Then** I see a grid of tap-friendly toggle chips (Pool, Gym, BQ, Security, etc.)

**Given** I tap an amenity chip
**When** I release
**Then** the chip toggles selected state immediately (no network wait)

---

### Story 2.6: Publish Validation & Live Link Generation

**As an** agent,
**I want** to publish my completed listing and get a shareable link,
**So that** I can immediately share it on WhatsApp.

**Acceptance Criteria:**

**Given** I have completed all required wizard steps and assets are synced
**When** I click "Publish"
**Then** a unique subdomain URL is generated (`agency.buildr.ng/property-slug`)
**And** a "Copy Link" button appears immediately

**Given** some assets are still uploading
**When** I click "Publish"
**Then** I see a message: "Waiting for images to finish uploading..." with progress

---

## Epic 3: Asset Governance - Image Pipeline

Users can upload images that are automatically optimized for Nigerian 3G networks. Emeka's 8MB DSLR photos are automatically compressed and formatted correctly.

### Story 3.1: Direct-to-Cloudinary Image Upload

**As an** agent,
**I want** to upload property images directly to Cloudinary,
**So that** large files don't timeout on slow 3G connections.

**Acceptance Criteria:**

**Given** I select an image file to upload
**When** I initiate the upload
**Then** the app requests a signed URL from the server and uploads directly to Cloudinary
**And** the upload bypasses the Vercel 4.5MB body limit

**Given** the upload is in progress
**When** I look at the UI
**Then** I see an optimistic blob preview with a progress indicator

---

### Story 3.2: Automatic 4:3 Aspect Ratio Cropping

**As an** agent uploading photos,
**I want** my images automatically cropped to 4:3 aspect ratio,
**So that** all listings look consistent and professional.

**Acceptance Criteria:**

**Given** I upload an image with a non-4:3 aspect ratio
**When** the upload completes
**Then** Cloudinary automatically crops/resizes to 4:3 using "fill" mode

**Given** I see the preview
**When** the image displays
**Then** it matches the 4:3 aspect ratio used on published pages

---

### Story 3.3: Image Size Validation & EXIF Stripping

**As an** agent,
**I want** oversized images blocked and metadata stripped,
**So that** pages load fast and my GPS location is protected.

**Acceptance Criteria:**

**Given** I try to upload an image exceeding 5MB
**When** I select the file
**Then** I see a friendly error: "Image too large. Please use a file under 5MB."
**And** the upload is blocked client-side

**Given** I upload a valid image
**When** Cloudinary processes it
**Then** all EXIF metadata (including GPS) is stripped (NFR5)

---

### Story 3.4: Style Preset Selection (Colors)

**As an** agent,
**I want** to select from predefined color schemes,
**So that** my listing looks professional without design skills.

**Acceptance Criteria:**

**Given** I am on the "Style" step of the wizard
**When** the step loads
**Then** I see 4 style presets: Executive Navy, Growth Green, Luxury Onyx, Urgency Red

**Given** I tap a preset
**When** I select it
**Then** the preview updates immediately with the new colors
**And** no custom color picker is available (Walled Garden)

---

### Story 3.5: Font Pairing Selection

**As an** agent,
**I want** to select from predefined typography pairs,
**So that** my listing has consistent, readable fonts.

**Acceptance Criteria:**

**Given** I am on the "Style" step
**When** I see font options
**Then** I can choose from 3-4 predefined font pairings (Inter, Roboto, etc.)

**Given** I select a font pairing
**When** I preview my listing
**Then** the fonts are applied consistently across headings and body text

---

## Epic 4: Dashboard & Property Management

Users can view, manage, publish, and unpublish their listings from a central dashboard. Chibuzo can see all agency listings, check status, and manage the content lifecycle.

### Story 4.1: Dashboard Listing Overview

**As an** agent,
**I want** to see all my created pages in a dashboard list,
**So that** I can quickly check what's published and what's in draft.

**Acceptance Criteria:**

**Given** I am logged in and navigate to my dashboard
**When** the page loads
**Then** I see a list/grid of all my property pages with status badges (Draft, Published)
**And** skeleton loading displays for min 200ms during data fetch (UX7)

**Given** I have no listings yet
**When** the dashboard loads
**Then** I see an empty state: "No Listings? Your Empire Starts Here." with a CTA

---

### Story 4.2: Unpublish Live Page

**As an** agent,
**I want** to unpublish a live page,
**So that** I can take down a listing that's sold or needs updates.

**Acceptance Criteria:**

**Given** I have a published page
**When** I click "Unpublish" on the dashboard card
**Then** a confirmation dialog appears

**Given** I confirm "Unpublish"
**When** the action completes
**Then** the page status changes to "Draft" and the public URL returns 404

---

### Story 4.3: Soft Delete Draft Pages

**As an** agent,
**I want** to delete draft pages I no longer need,
**So that** my dashboard stays clean.

**Acceptance Criteria:**

**Given** I have a draft page
**When** I click "Delete"
**Then** a confirmation dialog warns me this action is permanent

**Given** I confirm deletion
**When** the action completes
**Then** the page is soft-deleted (marked as deleted, not removed from DB)
**And** it disappears from my dashboard

---

### Story 4.4: Responsive Dashboard Layout

**As an** agent using mobile or desktop,
**I want** the dashboard to adapt to my screen size,
**So that** I can manage listings from any device.

**Acceptance Criteria:**

**Given** I am on mobile (<768px)
**When** I view the dashboard
**Then** I see a single-column card layout optimized for touch (48px targets)

**Given** I am on desktop (>1024px)
**When** I view the dashboard
**Then** I see a multi-column grid layout with more details visible

---

## Epic 5: Team Management - Agency Collaboration

Agency Admins can manage their team with roles and shared resources. Chibuzo can invite team members, assign roles, and lock premium templates.

### Story 5.1: Invite Team Members

**As an** Agency Admin,
**I want** to invite team members via email,
**So that** my colleagues can join and collaborate on listings.

**Acceptance Criteria:**

**Given** I am logged in as an Admin
**When** I navigate to Team Settings and enter a valid email
**Then** an invitation email is sent to that address

**Given** the invitation is sent
**When** I view the team members list
**Then** I see the pending invitation with status "Invited"

---

### Story 5.2: Accept Team Invitation

**As a** user receiving an invitation,
**I want** to accept and join an Agency Team,
**So that** I can access the team's shared resources.

**Acceptance Criteria:**

**Given** I have received an invitation email
**When** I click the invitation link
**Then** I am prompted to create an account (if new) or log in (if existing)

**Given** I complete the sign-up/log-in
**When** the process finishes
**Then** I am added to the team with "Editor" role by default

---

### Story 5.3: Assign Team Roles (Admin/Editor)

**As an** Agency Admin,
**I want** to assign "Admin" or "Editor" roles to team members,
**So that** I can control who manages users vs who creates content.

**Acceptance Criteria:**

**Given** I am viewing the team members list
**When** I click "Change Role" on a team member
**Then** I can select between "Admin" and "Editor"

**Given** I change a role
**When** the member refreshes their session
**Then** their permissions are updated immediately

---

### Story 5.4: Remove Team Members

**As an** Agency Admin,
**I want** to remove team members,
**So that** former employees no longer have access.

**Acceptance Criteria:**

**Given** I am viewing the team members list
**When** I click "Remove" on a member
**Then** a confirmation dialog appears

**Given** I confirm removal
**When** the action completes
**Then** the member is removed and can no longer access team resources

---

### Story 5.5: Lock Templates (Admin Only)

**As an** Agency Admin,
**I want** to lock premium templates,
**So that** only Admins can create pages with them.

**Acceptance Criteria:**

**Given** I am in the template library as Admin
**When** I toggle "Lock" on a template
**Then** the template shows a lock icon and becomes Admin-only

**Given** an Editor tries to use a locked template
**When** they select it
**Then** they see "This template is locked. Contact your Admin."

---

### Story 5.6: Duplicate Team Pages

**As a** team member,
**I want** to duplicate existing pages created by teammates,
**So that** I can reuse successful layouts quickly.

**Acceptance Criteria:**

**Given** I am viewing the team's page list
**When** I click "Duplicate" on a page
**Then** a copy is created in my drafts with my name as creator

**Given** I duplicate a page
**When** I view my drafts
**Then** the new draft has "[Copy]" appended to the title

---

## Epic 6: Polish & Performance - 3G Excellence

System achieves production-grade performance and accessibility standards. All users experience <5s TTI on 3G, and WCAG AA compliance.

### Story 6.1: PWA Service Worker & App Shell

**As a** field agent on 3G,
**I want** the wizard to load instantly from cache,
**So that** I can start working even with poor connectivity.

**Acceptance Criteria:**

**Given** I have visited Buildr before
**When** I open the app on slow 3G
**Then** the App Shell (JS/CSS/fonts) loads from Service Worker cache within 2 seconds

**Given** I lose network connection
**When** I open the app
**Then** the cached shell still loads and shows "Offline Mode" indicator

---

### Story 6.2: Lighthouse Performance Optimization

**As a** potential customer viewing a published listing,
**I want** pages to load fast on my phone,
**So that** I don't abandon before seeing the property.

**Acceptance Criteria:**

**Given** a published property page
**When** tested with Google Lighthouse on Mobile
**Then** the Performance score is >90

**Given** the page contains images
**When** they load
**Then** they use lazy loading and next-gen formats (WebP)

---

### Story 6.3: WCAG 2.1 AA Accessibility Compliance

**As a** user with accessibility needs,
**I want** the app to be fully keyboard navigable and screen-reader friendly,
**So that** I can use Buildr regardless of disability.

**Acceptance Criteria:**

**Given** any interactive element in the app
**When** I navigate with keyboard only
**Then** focus states are clearly visible (ring-offset-2)

**Given** all published template pages
**When** tested for WCAG 2.1 AA
**Then** color contrast ratios meet AA standards
**And** all images have alt text
**And** all form controls have labels

---

### Story 6.4: Stack Stability & Downgrade Verification

**As a** developer,
**I want** the codebase on stable library versions,
**So that** production builds are reliable.

**Acceptance Criteria:**

**Given** the package.json
**When** I review dependencies
**Then** Next.js is v15 (stable), React is v18 (stable), Tailwind is v3.4 (stable)

**Given** the app builds successfully
**When** deployed to production
**Then** no experimental/canary warnings appear in the console

