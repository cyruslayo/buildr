```
---
stepsCompleted: [1, 2, 3, 4, 5]
inputDocuments: []
workflowType: 'research'
lastStep: 1
research_type: 'technical'
research_topic: 'Technical Architecture for High-Performance Mobile-First Wizards in Next.js'
research_goals: 'Identify robust architecture for multi-step Wizards (state management, URL routing) and High-Performance Image Pipeline (Sharp/Cloudinary) for 3G networks.'
user_name: 'Cyrus'
date: '2026-01-01'
web_research_enabled: true
source_verification: true
---

# Research Report: technical

**Date:** 2026-01-01
**Author:** Cyrus
**Research Type:** technical

---

## Research Overview

## Technical Research Scope Confirmation

**Research Topic:** Technical Architecture for High-Performance Mobile-First Wizards in Next.js
**Research Goals:** Identify robust architecture for multi-step Wizards (state management, URL routing) and High-Performance Image Pipeline (Sharp/Cloudinary) for 3G networks.

**Technical Research Scope:**

- Architecture Analysis - design patterns, frameworks, system architecture
- Implementation Approaches - development methodologies, coding patterns
- Technology Stack - languages, frameworks, tools, platforms
- Integration Patterns - APIs, protocols, interoperability
- Performance Considerations - scalability, optimization, patterns

**Research Methodology:**

- Current web data with rigorous source verification
- Multi-source validation for critical technical claims
- Confidence level framework for uncertain information
- Comprehensive technical coverage with architecture-specific insights

**Scope Confirmed:** 2026-01-01

## Technology Stack Analysis

### Programming Languages & Core State
*   **TypeScript:** Essential for "Walled Garden" enforcement. Zod schemas must imply TypeScript interfaces to ensure front-end forms match back-end constraints 1:1.
*   **State Management (Hybrid):** Research confirms a hybrid approach is best for Wizards:
    *   **URL Search Params:** For *Navigation State* (Current Step). Ensures bookmarking and browser history support (Back button works).
    *   **Zustand (with Persistence):** For *Form Data State*. Persists draft content across reloads/crashes without polluting the URL.
*   *Source:* [Frontend Mentor](https://www.frontendmentor.io/articles/building-multi-step-forms-with-nextjs-and-typescript-zustand-react-hook-form-zod-4j1-JbX0E), [Dev.to](https://dev.to/smitterhane/building-a-multi-step-form-with-react-hook-form-zod-and-zustand-1i3n)

### Development Frameworks (Forms & Validation)
*   **React Hook Form (RHF):** The de-facto standard for client-side interactions. Decouples re-renders from input keystrokes (critical for mobile performance).
*   **Zod Resolver:** Bridges RHF with Zod schemas.
*   **Next.js Server Actions:** The robust "Walled Garden" enforcer.
    *   *Best Practice:* Server Actions must perform `z.safeParse()` independently of client validation to ensure data integrity.
    *   *Pattern:* Use `useFormState` (or `useActionState` in React 19) to return server-side Zod errors to the client UI.
*   *Source:* [Next.js Docs](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations), [Robiny Wieruch](https://www.robinwieruch.de/next-forms-server-actions-zod/)

## Integration Patterns Analysis

### API Design Patterns (Auto-Save & Mutations)
*   **Draft Persistence Strategy:** "Debounced Server Actions".
    *   *Mechanism:* Form updates trigger a saved `useDebouncedCallback` (approx. 500ms-1s wait) to a `saveDraft` Server Action.
    *   *Pattern:* API accepts `Partial<Schema>` to allow saving incomplete steps without validation errors blocking the save.
*   **Unique Draft ID:** Drafts must use a `draftId` (UUID) stored in URL or LocalStorage to resume sessions across devices.
*   *Source:* [Supalaunch](https://supalaunch.com/blog/nextjs-server-actions-autosave), [Dev.to](https://dev.to/vvo/debouncing-server-actions-in-nextjs-327c)

### Data Formats & Interoperability
*   **Shared Zod Schemas:** The "Golden Standard" for integration.
    *   *Implementation:* Creating a shared `schema.ts` file that is imported by Client (RHF resolver) and Server (Action validation).
    *   *Error Propagation:* Server Actions return a standardized `ActionState` object: `{ success: boolean, errors?: Record<string, string[]>, data?: any }`.
    *   *Mapping:* Use `useActionState` (React 19/Next 15) to automatically map server-side validation failures back to `form.setError` in RHF.
*   *Source:* [Aurora Scharff](https://aurorascharff.no/posts/nextjs-server-actions-with-react-hook-form), [Oberlehner](https://oberlehner.net/blog/how-to-use-server-actions-with-next-js-app-router-and-react-hook-form/)

### System Interoperability (Storage Strategy)
*   **Hybrid Storage Architecture:**
    1.  **Local Storage (Client):** Immediate "hot" storage for offline safety / zero-latency recovery. 5-10MB limit is sufficient for text wizard data.
    2.  **Database (Server):** "Cold" storage for cross-device continuity. Triggered on Step transitions or Debounced Save.
*   *Security Note:* Sensitive data (PII) should NOT be in Local Storage. For Real Estate templates (addresses/descriptions), this is generally acceptable.
*   *Source:* [RxDB](https://rxdb.info/localstorage-vs-indexeddb-vs-websql.html), [Medium](https://medium.com/@jjulian/localstorage-vs-cookies-vs-sessionstorage-vs-database-difference-comparisons-and-performance-84951430c529)

### Image Integration Pipeline
*   **Direct Upload Pattern:** User -> Cloudinary (Pre-signed URL) -> URL returned to Wizard.
    *   *Why:* Bypasses Next.js server limits (Vercel 4.5MB body limit). Critical for 3G reliable uploads.
    *   *Optimization:* Cloudinary "Incoming Transformation" resizes to 4:3 *on upload*, so the full 5MB file never persists.

## Architectural Patterns and Design

### System Architecture Patterns (Wizard Flow)
*   **Pattern Decision:** *Linear State vs. Finite State Machine (XState)*.
    *   *Analysis:* XState is powerful but introduces high boilerplate/learning curve. For a linear "Step 1 -> Step 2 -> Step 3" wizard, it is overkill.
    *   *Recommended Pattern:* **"Hybrid Component State"**:
        *   `page.tsx` (Server Component) -> Decodes URL Search Params.
        *   `WizardStep.tsx` (Client Component) -> Manages local form state via RHF.
        *   `WizardLayout.tsx` -> Manages progress bar and global Draft Saving.
*   *Source:* [XState Catalogue](https://xstate-catalogue.com/), [Dev.to](https://dev.to/smitterhane/building-a-multi-step-form-with-react-hook-form-zod-and-zustand-1i3n)

### Scalability and Performance Patterns (3G Resilience)
*   **Aggressive Code Splitting:**
    *   *Pattern:* Use `dynamic(() => import('./Step2Component'))` for each wizard step.
    *   *Why:* A user on 3G should only download JS for "Step 1" initially. "Step 2" code should be prefetched in background.
*   **Optimistic UI for "Next" Navigation:**
    *   *Pattern:* When clicking "Next", immediately switch UI tab *before* Server Action confirms draft save. (Store optimistic state in Zustand).
    *   *Trade-off:* If save fails, toast error "Draft not saved" but allow user to keep typing. Prioritize *perceived speed*.
*   *Source:* [Next.js dynamic](https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading), [LogRocket](https://blog.logrocket.com/ux-design-patterns-optimistic-ui/)

### Security Architecture Patterns
*   **Input Sanitization:**
    *   *Pattern:* Zod `transform()` pipeline.
    *   *Implementation:* `z.string().transform((val) => sanitizeHtml(val))` at the schema level. This ensures sanitized data *before* it even hits the database logic.
*   **Server Action Security:**
    *   *Pattern:* `useActionState` + Encrypted Action IDs (Next.js default).
    *   *Constraint:* Never pass raw User IDs in hidden form fields. Derive User ID from `auth()` session inside the Server Action.
*   *Source:* [Arcjet Security](https://arcjet.com/blog/nextjs-security-checklist), [Next.js Security](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

## Implementation Approaches and Technology Adoption

### Development Workflows & Folder Structure
*   **Feature-Based Architecture:**
    *   *Structure:* `src/features/wizard/` containing:
        *   `components/` (Wizard-specific UI)
        *   `actions/` (Server Actions for this feature)
        *   `schemas/` (Zod schemas)
        *   `hooks/` (Custom hooks like `useWizardStore`)
    *   *Benefit:* Co-location of Logic, UI, and Data is critical for maintaining the "Walled Garden" mental model.
*   *Source:* [Bulletproof React](https://github.com/alan2207/bulletproof-react), [Profydev](https://profy.dev/article/react-folder-structure)

### Implementation Roadmap (Optimistic UI)
*   **Pattern:** `useOptimistic` + Server Actions.
*   **Flow:**
    1.  User types "Lekki Phase 1" -> `onChange` updates Local RHF state.
    2.  User clicks "Next" -> `useOptimistic` sets `uiStep` to `Step 2` *immediately*.
    3.  Background: Server Action `saveDraft({ step: 1, data: ... })` fires.
    4.  *Reconciliation:* If Server Action fails, toast error "Draft Save Failed" but keep user on Step 2 (Prioritize Flow).
*   *Source:* [Next.js Docs](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#optimistic-updates)

### Cost Optimization (Cloudinary Strategy)
*   **"One-File" Strategy:**
    *   Upload *High-Res Original* once.
    *   Use `c_auto,g_auto` (Content-Aware Crop) for all display variations.
    *   *Result:* Zero storage cost for thumbnails; only Paying for Bandwidth + Transformation.
*   **Strict Upload Presets:**
    *   Enforce `max_file_size` (e.g., 5MB) and `allowed_formats` (jpg, png, webp) at the *Signed URL Generation* level to prevent abuse.
*   *Source:* [Cloudinary Optimization](https://cloudinary.com/documentation/image_optimization)

### Testing Strategy (Mobile-First 3G)
*   **Mandatory Tooling:**
    *   *Network Link Conditioner (macOS)* or *Chrome DevTools Throttling* (Windows/Linux) set to "Slow 3G".
    *   *Test Gateway:* CI pipeline must run key E2E flows (e.g., "Complete Wizard") with throttled network constraints.
*   *Source:* [BrowserStack Network Simulation](https://www.browserstack.com/guide/simulate-network-conditions-for-testing)

## Technical Research Recommendations

### Final Architecture Decision
1.  **State:** Hybrid (URL Navigation + Zustand Drafts).
2.  **Validation:** Shared Zod Schemas (Client + Server Action).
3.  **Performance:** Route Splitting per Step + Optimistic Navigation.
4.  **Storage:** LocalStorage (Hot) + Database (Cold).
5.  **Images:** Direct-to-Cloudinary (Signed URLs) with `f_auto/q_auto`.

**Proceed to Planning Phase.**

### Image Pipeline Technologies (Aggressive Governance)
*   **Next/Image + Sharp:** The baseline requirement.
    *   *Sharp:* Must be installed in production environment (Linux/Vercel) to enable server-side resizing.
    *   *Performance:* `next/image` provides 25% better LCP on 3G than standard `<img>`.
*   **Cloudinary (Recommended for Scale):**
    *   *Why:* Offers `f_auto` and `q_auto` which outperform standard Sharp optimization for non-standard user uploads.
    *   *3G Advantage:* Global CDN allows faster TTI than a single-region Next.js server processing images on the fly.
*   *Source:* [Cloudinary Dev](https://cloudinary.com/documentation/image_optimization), [UploadCare](https://uploadcare.com/blog/next-js-image-optimization/)

### Technology Adoption Trends
*   **Shift to Server Actions:** Moving away from `/api/pages` endpoints. All form mutations are moving to Server Actions for better type safety and progressive enhancement support.
*   **Hybrid State:** Moving away from "Pure Redux" wizards towards "URL + Local" hybrids to support "Deep Linking" (e.g., emailing a user a link to resume Step 3).

---

<!-- Content will be appended sequentially through research workflow steps -->
