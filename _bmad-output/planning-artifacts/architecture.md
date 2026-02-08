```
---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
status: 'complete'
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/ux-design-specification.md'
  - '_bmad-output/planning-artifacts/research/technical-wizard-architecture-research-2026-01-01.md'
  - 'docs/index.md'
workflowType: 'architecture'
project_name: 'buildr'
user_name: 'khayu'
date: '2026-01-01'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
Architecture must support a **Linear Wizard** core with "Walled Garden" governance.
*   **Wizard Core:** Offline-capable multi-step form with `localStorage` persistence and background sync (optimistic UI).
*   **Asset Governance:** Client-side 4:3 aspect ratio enforcement and direct-to-Cloudinary uploads to bypass server limits.
*   **Team Management:** RBAC (Admin/Editor) and shared template libraries demanding strict multi-tenant data isolation.
*   **Output:** Static site generation (ISR) for `agency.buildr.ng` subdomains.

**Non-Functional Requirements:**
*   **3G Performance:** TTI < 5s on Slow 3G. Architecture must support aggressive code-splitting (dynamic imports) and Service Worker caching.
*   **Offline Resilience:** 100% form data recovery after crash/refresh.
*   **Trust & Security:** Strict EXIF stripping and NDPR consent logging.
*   **Accessibility:** WCAG 2.1 AA compliance enforcement via component primitives.

**Scale & Complexity:**
*   **Primary Domain:** Progressive Web App (PWA) / SaaS.
*   **Complexity Level:** **High**. While the domain (forms) is simple, the *environment constraints* (offline, 3G, optimistic sync) require complex state management and service worker orchestration.
*   **Estimated Components:** ~25 Core Components (Wizard Shell, 5 Step Types, Dashboard, Auth, UI Primitives).

### Technical Constraints & Dependencies
*   **Network:** "Slow 3G" is the baseline. 4MB Vercel body limit necessitates direct-to-cloud uploads.
*   **Stack:** Next.js 14 App Router, Server Actions, Tailwind, shadcn/ui.
*   **Browser:** Modern Browsers only (Chrome/Safari/Edge); Opera Mini explicitly unsupported.

### Cross-Cutting Concerns Identified
1.  **Optimistic State Sync:** Decoupling UI state (Zustand) from Server State (Database) for "native app" feel.
2.  **Multi-Tenancy:** Ensuring data isolation between Agency Teams at the middleware/database level.
3.  **Design System Enforcement:** "Walled Garden" constraints (colors/fonts) must be enforced at both Zod Schema (API) and UI Component levels.
4.  **Offline Storage:** Abstraction layer for `localStorage` to handle hydration/rehydration seamlessly.

## Starter Tech Stack Strategy

### Primary Technology Domain
**Brownfield Web Application (PWA)** - Hardening an existing MVP.

### Tech Stack Audit (Current State)
The current repository was found to be using "Bleeding Edge" versions:
*   `next`: 16.0.8 (Canary)
*   `react`: 19.2.1 (RC)
*   `tailwindcss`: 4.1.17 (Alpha)

### Strategic Decision: Downgrade to Stable
**Decision:** We will strictly revert to the current **Stable (LTS)** versions of all core libraries.
**Rationale:** The goal of this phase is "Production Readiness". Experimental versions carry unacceptable risks of bugs, build failures, and library incompatibility (especially `shadcn/ui` and `react-hook-form` ecosystem).

**Target Stable Stack:**
*   **Framework:** Next.js 15 (Stable)
*   **Library:** React 18 (Stable)
*   **Styling:** Tailwind CSS 3.4 (Stable)

### Required Dependency Injections
To meet the PRD requirements (Offline, 3G Performance), we must inject these missing packages:
1.  **`sharp`**: Critical for SSG image optimization.
2.  **`@ducanh2912/next-pwa`**: Essential for Service Worker generation (Offline support).
3.  **`next-cloudinary`**: Required for the direct-to-cloud upload pipeline.
4.  **`tailwindcss-animate`**: Required dependency for `shadcn/ui` components.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
1.  **State Management Strategy:** Hybrid (URL + Local Storage) to solve the "Back Button vs. Offline Data" conflict.
2.  **Image Upload Pipeline:** Direct-to-Cloudinary (Signed URLs) to bypass Vercel 4.5MB limits on 3G connections.
3.  **Multi-Tenancy Model:** Middleware-level enforcement of `teamId` to guarantee data isolation.

### Frontend Architecture: The "Hybrid State" Pattern
*   **Decision:** We split state concerns into two layers using **Zustand** and **URL Search Params**.
*   **URL (Truth for Navigation):** `?step=price`. Determines *which component* renders. Enables deep linking and browser history navigation.
*   **Zustand (Truth for Data):** Stores the *draft content* (e.g., `{ price: 150000000 }`). Persists to `localStorage` for offline resilience.
*   **Rationale:** "Pure URL" state is unsafe for offline/large forms. "Pure Redux" state breaks the back button. Hybrid gives us the best of both.

### Infrastructure: The "Direct" Image Pipeline
*   **Decision:** Client-Side Direct Uploads via Signed URLs.
*   **Flow:**
    1.  Client requests ephemeral sign-key from Server Action.
    2.  Client uploads file directly to Cloudinary (CDNs are faster/closer than Vercel functions).
    3.  Cloudinary returns `public_id` and optimized URL.
    4.  Client saves *only the string URL* to the database.
*   **Rationale:** Bypassing the Node.js server prevents valid uploads from timing out on slow 3G networks.

### Security: Middleware-Level Tenant Isolation
*   **Decision:** enforced `teamId` injection.
*   **Pattern:** We will use a "Prisma Client Extension" or strict Service Layer Pattern where `teamId` is injected from the authenticated session into *every* `where` clause.
*   **Rationale:** Developers are human and forget `where` clauses. Middleware automation prevents accidental data leaks between competitors.

## Implementation Patterns & Consistency Rules

### Structural Pattern: Feature Co-Location (The "Walled Garden" Structure)
To manage the complexity of the Wizard without creating a "Prop Drilling Hell", we will organize code by **Domain Feature**, not by Technical Type.
*   **Pattern:** `src/features/{featureName}/`
*   **Rule:** A feature directory MUST contain everything it needs to function (UI, Actions, State, Utils).
*   **Example Structure:**
    ```text
    src/features/wizard/
    ├── components/         # Wizard-specific UI (Step1.tsx, ProgressBar.tsx)
    ├── actions/           # Server Actions (saveDraft.ts, submitWizard.ts)
    ├── hooks/             # Custom Logic (useWizardNavigation.ts)
    ├── store/             # Zustand Store (wizard.store.ts)
    └── schemas.ts         # Zod definitions specific to this feature
    ```
*   **Rationale:** Prevents "Spaghetti Code" where a single change requires jumping between 5 different top-level folders.

### Process Pattern: Optimistic-First Data Flow
*   **Rule:** **No Blocking Spinners** on "Next" or "Save".
*   **Mandatory Flow:**
    1.  **Interact:** User types or clicks "Next".
    2.  **Optimistic Update:** Update Zustand Store & UI *immediately*.
    3.  **Background Sync:** Trigger Server Action to persist data.
    4.  **Reconcile:** If Server Action fails -> Toast Error + Revert UI State.
*   **Violation:** Using `isLoading` to disable the "Next" button during a save operation.

### Naming Conventions: "Verb-Subject" Protocol
*   **Server Actions:** Must be descriptive commands.
    *   ✅ `updatePropertyDraft`
    *   ✅ `publishListing`
    *   ❌ `handleSave` (Too vague)
*   **Components:** PascalCase. Feature-prefixed if exported.
    *   `WizardShell`, `WizardStepPrice`
*   **Database Models:** PascalCase, Singular.
    *   `User`, `Team`, `Property` (Not `Properties`)

## Architecture Validation Results

### Coherence Validation ✅
*   **Compatibility:** "Hybrid State" (Zustand + URL) perfectly supports the "3G" requirement by allowing offline persistence while maintaining shareable URLs.
*   **Structure:** The `src/features` folder structure directly supports the "Feature Co-Location" pattern, preventing spaghetti code.

### Requirements Coverage Validation ✅
*   **Epic Coverage:**
    *   *Wizard:* Covered by `src/features/wizard`.
    *   *Auth:* Covered by `src/features/auth` + Middleware.
    *   *Teams:* Covered by Middleware Multi-Tenancy decisions.
*   **NFR Coverage:**
    *   *3G Performance:* Covered by "Direct-to-Cloudinary" (No server bottleneck) and "Optimistic UI" (No blocking spinners).
    *   *Offline:* Covered by `localStorage` persistence in `wizard.store.ts`.

### Gap Analysis
*   **Gap:** We haven't defined the specific *database schema* yet (Prisma models), but that is an implementation detail for the "Database Design" task, not high-level architecture.
*   **Gap:** "Analytics" was mentioned in passing but has no specific architecture. Deferred to Post-MVP (Phase 2).

### Architecture Readiness Assessment
**Status:** READY FOR IMPLEMENTATION
**Confidence:** High. The constraints (3G, Offline) are handled by specific, proven patterns (Optimistic UI, Service Workers).

### Implementation Handoff
**First Priority:** Fix the Tech Stack (Downgrade to Next.js 15).

## Architecture Completion Summary

### Workflow Completion
**Status:** COMPLETED ✅
**Date:** 2026-01-01
**Final Concept:** "The 3G-Hardened Walled Garden"

### Final Architecture Deliverables
1.  **Context:** High Complexity PWA for 3G Networks (Offline-First).
2.  **Decisions:** Hybrid State (URL + Zustand), Direct Cloudinary Uploads, Middleware Multi-Tenancy.
3.  **Patterns:** Feature Co-Location, Optimistic-First UI, Verb-Subject Actions.
4.  **Structure:** `src/features/{domain}` isolated modules.

### Implementation Handoff
**For AI Agents:**
*   **Strict Rule:** Do not use `isLoading` spinners for Wizard transitions. Use Optimistic Updates.
*   **Strict Rule:** Do not import between feature folders (e.g., `wizard` -> `dashboard`). Move shared code to `lib` or `components/ui`.
*   **Strict Rule:** All database writes go through Server Actions in `src/features/*/actions`.

### Quality Assurance Checklist
*   ✅ **Coherence:** Architecture supports the "Slow 3G" constraint.
*   ✅ **Requirements:** All PRD items mapped to components.
*   ✅ **Readiness:** Specific patterns defined for "Offline Mode".

**Architecture Status:** READY FOR IMPLEMENTATION
**Next Phase:** Initialize Project & Downgrade Stack.

