---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
inputDocuments:
  - '_bmad-output/planning-artifacts/research/technical-wizard-architecture-research-2026-01-01.md'
  - '_bmad-output/analysis/brainstorming-session-2026-01-01.md'
  - 'docs/project-docs/01-PRD.md'
workflowType: 'prd'
lastStep: 1
---

# Product Requirements Document - Buildr

**Author:** khayu
**Date:** 2026-01-01

## Executive Summary

Buildr is currently a functional MVP landing page builder for the Nigerian real estate market. The focus of this next phase ("Production Readiness") is to evolve the product from a prototype into a robust, high-performance **Mobile-First Application** capable of operating reliably on **3G networks**.

We are shifting from a simple form-based approach to a **Linear Wizard Architecture** (Step-by-Step) with "Walled Garden" governance. This means enforcing strict data validation (Zod) and aggressive asset optimization (Cloudinary) to ensure that non-technical users cannot "break" their pages or create slow-loading experiences.

### What Makes This Special

Most builders assume 4G/Wifi and desktop usage. Buildr assumes **3G and Mobile**.
*   **Optimistic Wizardry:** We use `useOptimistic` to make the UI feel instant, even when the network is lagging.
*   **Aggressive Asset Governance:** We don't just "accept" images; we actively resize, compress, and optimize them *on upload* to strictly enforced Nigerian real estate standards (4:3 aspect ratio).
*   **Walled Garden:** Zero code access. Users fill forms; the system generates perfection.

## Project Classification

**Technical Type:** web_app (PWA-Ready)
**Domain:** real_estate (High Complexity due to Nigerian Market Constraints)
**Complexity:** High (Requires offline-resilience, complex 3G optimization)
**Project Context:** Brownfield - Hardening existing Next.js 14 MVP

## User Journeys

### Journey 1: Chibuzo's 5-Minute "Lekki Luxury" Launch (Happy Path)
Chibuzo, a marketing manager in Lekki, just received photos for a new 4-Bedroom Semi-Detached Duplex. Her boss wants it on the agency's WhatsApp Status *now*. She opens Buildr on her laptop.
1.  **Template Selection:** She filters by "Duplex" and picks the "Lekki Luxury" template.
2.  **No-Code Entry:** Instead of struggling with a drag-and-drop canvas, she simply fills a structured form: "Price: 150M", "Location: Ikate".
3.  **AI Assist:** She types "Spacious, good lighting, clean water" into the description. Buildr's AI expands this to: "Experience premium living in this spacious 4-bedroom masterpiece in Ikate, featuring floor-to-ceiling windows and treated water..."
4.  **Publish:** She hits "Publish". The page is live instantly. She copies the link and posts it to her WhatsApp Status. Total time: 4 minutes.

### Journey 2: Fatima's 3G "Site Visit" (Stress Test - Mobile PWA)
Fatima is at a remote land site in Epe. The network is fluctuating between 2G and 3G. She needs to create a listing *while* she is standing on the plot to capture the "raw" feel.
1.  **Offline Start:** She opens Buildr on her Android phone. It loads instantly (Service Worker cache).
2.  **Optimistic Entry:** She starts typing details. The network drops for 30 seconds. Buildr shows a small "Saving to device..." icon but lets her keep typing. No "Network Error" modal blocks her.
3.  **Visual Feedback:** She snaps a photo of the land. She hits "Next". The UI transitions *immediately* to the Preview step (Optimistic UI), even though the image is still uploading in the background.
4.  **Success:** By the time she hits "Share to WhatsApp", the background sync has finished. Her client receives the link instantly.

### Journey 3: The "Heavy" Uploader (Edge Case - Asset Governance)
Emeka, a developer, tries to upload 10 raw images from his DSLR (8MB each) to showcase his new estate.
1.  **Intervention:** He selects the files. Buildr's client-side logic immediately flags them.
2.  **Governance:** Instead of a generic spinner, he sees: "Optimizing for Nigerian Networks..."
3.  **Transformation:** The system automatically resizes the images to 1600px width and converts them to WebP (reducing them to ~120KB each) *before* the upload completes.
4.  **Result:** The resulting page loads in 1.2 seconds on his client's phone, not 20 seconds. Emeka didn't have to do anything; the system enforced the performance budget.

### Journey Requirements Summary
*   **Offline-First/PWA:** Service Workers are non-negotiable for the Shell architecture (Fatima).
*   **Local Persistence:** `localStorage` must capture form state keystroke-by-keystroke (Fatima).
*   **Background Sync/Optimistic UI:** "Next" buttons must not be blocked by network latency (Fatima).
*   **Client-Side Image Logic:** Logic to intercept headers/size before full upload (Emeka).

## Domain-Specific Requirements

### Nigerian Real Estate Compliance
Buildr operates in a high-risk, low-trust market. Trust signals are not optional features; they are existential requirements for platform credibility.

### Key Domain Concerns
*   **Trust Deficit:** Users are skeptical of online listings due to prevalence of real estate scams.
*   **Data Privacy:** Collection of lead data (phone numbers) falls under NDPR scope.
*   **Currency Risk:** Dollarization of listings is illegal/discouraged for local residential retail.

### Compliance Requirements
*   **NDPR Consent:** All lead capture forms must include a mandatory (unchecked) "I agree to be contacted" checkbox.
*   **Verified Agent Logic (Tier 2 access):**
    *   Users are labeled "Unverified" by default.
    *   To unlock "Pro" templates or remove watermarks, users must upload **RC Number** (Corporate) or **NIN** (Individual).
    *   *System Requirement:* Backend field to store `kyc_status` (pending, verified, rejected).

### Safety & Risk (Anti-Scam)
*   **Keyword Flagging:** The "AI Description" generator must silently flag and warn users against using "trigger" phrases often used in scams (e.g., "Urgently", "Distress Sale", "Allocation Pending") without manual review.
*   **Price Deviation:** Optional warning if a property price is > 50% below market average for that Location/Type (future scope, but architectural slot needed).

### Industry Standards
*   **Currency:** Hard-coded **Naira (₦)** for all Nigerian templates. No USD option for local residential.
*   **Measurement:** Hard-coded **Square Meters (sqm)**. No Sqft.

## Innovation & Novel Patterns

### Detected Innovation Areas
*   **Optimistic Wizardry (Mobile UX):** 
    *   *The Problem:* Standard web wizards feel sluggish on 3G because they validate/save on every step.
    *   *Our Innovation:* We decouple the "UI Step" from the "Server State". The user moves forward instantly (Optimistic UI), while the system syncs in the background. This creates a "Native App feel" on the web.
*   **Governance as a Service (Process):**
    *   *The Problem:* Non-designers break layouts when given freedom (e.g., resizing images to odd aspect ratios).
    *   *Our Innovation:* We treat "Constraints" as a feature. By enforcing strict Aspect Ratio cropping and Typography scales at the *upload* and *input* level, we guarantee a "Lekki Luxury" aesthetic that users cannot accidentally break.
*   **The Walled Garden (Philosophy):**
    *   *The Problem:* Competitors (Wix, Elementor) compete on "Flexibility".
    *   *Our Innovation:* We compete on "Rigidity". By removing the Canvas entirely, we reduce the "Time to Publish" from Hours to Minutes.

### Market Context & Competitive Landscape
*   **Competitors:** Wix, Squarespace, WordPress.
*   **Differentiation:** They optimize for *Expression* (Desktop/Wifi). We optimize for *Outcome* (Mobile/3G).

### Validation Approach
*   **Metric:** "Time to Publish" < 5 minutes on a 3G connection.
*   **Test:** The "Fatima" stress test (Journey 2) is the ultimate validator of this innovation.

### Risk Mitigation
*   **Risk:** Users needing "one small tweak" (e.g., move logo left) will feel frustrated.
*   **Mitigation:** Provide rich "Style Presets" (Themes) rather than geometric controls.

## Web App Specific Requirements

### Project-Type Overview
Buildr is a **Progressive Web App (PWA)** designed to behave like a native mobile application. It prioritizes the "App Shell" architecture to ensure the Wizard loads instantly even on poor connections.

### Technical Architecture Considerations
*   **SPA vs MPA:** Hybrid.
    *   **Wizard:** Client-side SPA feel (via `useOptimistic`) for speed.
    *   **Published Pages:** Static HTML (via Next.js ISR) for maximum SEO and performance.
*   **Browser Support:** **Modern Browsers Only**.
    *   Chrome (Android/Desktop), Safari (iOS/Mac), Firefox, Edge.
    *   *Opera Mini Strategy:* Explicitly **UNSUPPORTED**. Users on Opera Mini will see a "Please use Chrome/Safari" blocking message. We will not degrade the experience to support limited JS engines.

### PWA & Offline Strategy
*   **Service Worker:** Aggressive caching of the "Wizard App Shell" (JS/CSS/Fonts).
*   **Installability:** "Add to Home Screen" prompt triggers after the first successful page publication.

### SEO Strategy (Published Pages)
*   **Structure:** Subdomain-based (`agency.buildr.ng`) for MVP.
*   **Meta Tags:** Automated OpenGraph (OG) image generation using the property's hero image (critical for WhatsApp previews).
*   **Sitemaps:** Auto-generated `sitemap.xml` for each agency subdomain.

## Project Scoping & Phased Development

### MVP Strategy & Philosophy
**MVP Approach:** **Experience MVP ("The 3G Wizard")**. We focus on delivering a superior mobile creation experience that works where others fail (3G networks), while including essential B2B features (Teams) to capture agency clients early.

### MVP Feature Set (Phase 1)
**Core User Journeys Supported:**
*   Chibuzo (Agency Manager) - Needs Team Management
*   Fatima (Mobile Agent) - Needs 3G Resilience
*   Emeka (Developer) - Needs Asset Governance

**Must-Have Capabilities:**
*   **Linear Wizard:** Details -> Photos -> Publish (No Visual Editor).
*   **Platform:** PWA (Chrome/Safari Support).
*   **Governance:** Strict 4:3 Cropping + Zod Validation.
*   **Trust:** NDPR Checkbox + "Verified" Badge logic.
*   **Team Accounts (Added to MVP):**
    *   Invite/Remove Members.
    *   Shared Template Library.
    *   Admin vs Editor roles.
    *   *Rationale:* Essential for onboarding mid-size agencies (our primary paying persona).
*   **Output:** `agency.buildr.ng` subdomain.

### Post-MVP Features

**Phase 2: Growth ("The Pro Layer")**
*   **Custom Domains:** `www.agency.com` (Moved to Phase 2 to focus on core stability first).
*   **Analytics Dashboard:** Detailed visitor stats.
*   **CRM Integrations:** Direct push to HubSpot/Salesforce.

**Phase 3: Expansion**
*   **Opera Mini Support:** Server-Side Rendering fallback.
*   **Price Intelligence:** "Your price is too low" warnings.

### Risk Mitigation Strategy
*   **Technical Risk (Teams):** Adding RBAC (Role-Based Access Control) increases backend complexity significantly.
    *   *Mitigation:* Use rigorous TDD for the Auth/Permission layer before building UI.
*   **Market Risk (Strictness):** Users might miss drag-and-drop.
    *   *Mitigation:* Invest heavily in "Style Presets" so the output looks so good they don't *want* to change it.

## Functional Requirements

### 3G Wizard Core (Offline & Performance)
*   **FR1:** Users can create and edit property drafts entirely offline (Service Worker architecture).
*   **FR2:** System must persist form data to `localStorage` on every keystroke/change to prevent data loss.
*   **FR3:** Users can navigate between wizard steps immediately (Optimistic UI) without waiting for server response.
*   **FR4:** System must background-sync draft data to the server when connection is available.
*   **FR5:** Users can publish a page only when all assets have successfully synced and validated.

### Asset Governance ("Walled Garden")
*   **FR6:** Users can upload images for property listings.
*   **FR7:** System must automatically crop/resize uploaded images to a fixed 4:3 aspect ratio before final storage.
*   **FR8:** System must block uploads exceeding 5MB and provide a user-friendly error message.
*   **FR9:** Users can select color schemes only from a predefined set of "Style Presets" (no color picker).
*   **FR10:** Users can select typography pairs only from a predefined set of "Font Pairings".

### Team Management (Agency Context)
*   **FR11:** Agency Admins can invite team members via email address.
*   **FR12:** Users can accept invitations to join an Agency Team.
*   **FR13:** Agency Admins can assign "Admin" or "Editor" roles to team members.
*   **FR14:** Agency Admins can remove members from the team.
*   **FR15:** Agency Admins can lock specific templates so only Admins can create pages with them.
*   **FR16:** Team Members can duplicate existing pages created by other team members for reuse.

### Property Management & Output
*   **FR17:** Users can view a dashboard list of all their created pages with status (Draft, Published).
*   **FR18:** Users can unpublish a live page.
*   **FR19:** System must generate a unique subdomain URL (`agency.buildr.ng/property-slug`) for published pages.
*   **FR20:** Users can delete drafts (soft delete).

### Compliance & Trust
*   **FR21:** Users (Leads) must explicitly check an "I agree to be contacted" box on lead forms (NDPR).
*   **FR22:** Users can upload RC Number or NIN documents for verification.
*   **FR23:** System must display a "Verified" badge on published pages if the creator's KYC status is "Verified".

## Non-Functional Requirements

### Performance (The "3G Budget")
*   **NFR1 (Shell Load):** The Wizard App Shell must load and become interactive (TTI) within **5 seconds** on a simulated Slow 3G network.
*   **NFR2 (Input Latency):** Form typing must have < 16ms latency (60fps) regardless of background sync operations.
*   **NFR3 (Published Pages):** All generated landing pages must achieve a **Google Lighthouse Performance Score > 90** on Mobile.

### Security & Compliance
*   **NFR4 (Team Isolation):** Strict multi-tenant enforcement. A user in Team A must strictly NEVER be able to read/write drafts belonging to Team B (enforced via Row Level Security or Middleware).
*   **NFR5 (Asset Sanitation):** All public images must be stripped of EXIF metadata (GPS locations) during the optimization process.
*   **NFR6 (Consent Logs):** System must store a timestamped audit log of every "NDPR Consent" checkbox engagement.

### Reliability (Offline First)
*   **NFR7 (Crash Recovery):** If the browser crashes or is force-closed, **100%** of the explicit form data must be restored from `localStorage` upon reopening the wizard.

### Accessibility
*   **NFR8 (Template Output):** All generated templates must pass **WCAG 2.1 AA** standards for Color Contrast and Aria Labels by default. Users cannot "break" this compliance via the Walled Garden.
