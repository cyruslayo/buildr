---
project_name: 'buildr'
user_name: 'khayu'
status: 'complete'
sections_completed: ['technology_stack', 'implementation_rules', 'anti_patterns']
rule_count: 15
optimized_for_llm: true
date: '2026-01-01'
---

# Project Context: Critical Rules for AI Agents

> **Usage:** AI Agents must read this file before implementing any code.
> **Purpose:** Ensures consistency, prevents anti-patterns, and enforces project-specific constraints.

## Technology Stack & Versions

### Core Framework (STRICT VERSIONS)
*   **Next.js:** `^15.0.0` (Stable) - ❌ DO NOT use Canary/16.x
*   **React:** `^18.2.0` (Stable) - ❌ DO NOT use RC/19.x
*   **Tailwind CSS:** `^3.4.0` (Stable) - ❌ DO NOT use v4 Alpha
*   **Language:** TypeScript `^5.0.0` (Strict Mode)

### Critical Dependencies
*   **UI Primitives:** `shadcn/ui` (Radix + Tailwind)
*   **State Management:**
    *   **Global:** `zustand` (Draft Data)
    *   **Server:** `URLSearchParams` (Navigation State)
*   **Forms:** `react-hook-form` + `zod`
*   **Images:** `next-cloudinary` (Direct Uploads), `sharp` (Optimization)
*   **PWA:** `@ducanh2912/next-pwa`

### Environment Constraints
*   **Performance:** "Slow 3G" Optimized (< 5s TTI).
*   **Offline:** Must support full offline form recovery via `localStorage`.
*   **Uploads:** Bypass Vercel Body Limit (4MB) via Client-to-Cloudinary w/ Signed URLs.

## Critical Implementation Rules

### Structural Rules (The "Walled Garden")
*   **Feature Co-Location:** ALL code for a feature (Components, Actions, Store, Hooks) MUST live in `src/features/{featureName}`.
    *   ❌ DO NOT split logic across `src/components`, `src/hooks`, `src/actions`.
    *   ✅ Keep it self-contained.
*   **Cross-Boundary Imports:**
    *   ❌ Features MUST NOT import from other features (e.g., `wizard` cannot import `dashboard`).
    *   ✅ Shared logic must go to `src/lib` or `src/components/ui`.

### Data Flow Rules (Optimistic-First)
*   **No Blocking Spinners:** NEVER block the UI on "Next" or "Save" actions.
*   **Mandatory Protocol:**
    1.  **Interact:** User clicks.
    2.  **Optimistic Update:** Update Zustand/UI instantly.
    3.  **Background Sync:** Fire Server Action.
    4.  **Reconcile:** Revert + Toast on error.

### Server Action Rules (Pattern: Verb-Subject)
*   **Naming:** Actions must be descriptive commands (e.g., `updateDraft`, `publishListing`). ❌ No `handleSave`.
*   **Security:** Every Server Action must explicitly validate `teamId` ownership using `ctx` or middleware.

## Critical Anti-Patterns (Micro-Rules)

### ❌ FORBIDDEN:
1.  **Direct Prisma in Components:** NEVER import prisma in `page.tsx`. Use Server Actions or Data Access Layer.
2.  **`useEffect` for Data:** NEVER fetch data in `useEffect`. Use Server Components or React Query.
3.  **Large Components:** Components > 150 lines must be split.
4.  **Any Type:** TypeScript `any` is strictly prohibited. Use `unknown` or proper types.

### ✅ MANDATORY:
1.  **Mobile First:** All CSS must start with mobile styles. Use `md:` not `max-w-md`.
2.  **Error Boundaries:** Every Feature Page must have an `error.tsx`.
3.  **Loading States:** Every Server Action triggering a route change must use `useTransition`.

## Testing Rules
*   **Unit Tests:** Required for all formatting utils and complex hooks.
*   **E2E Tests:** Required for critical paths (Login, Wizard Completion).
*   **Mocking:** Network requests must be mocked in tests. No real API calls.

## Usage Guidelines

**For AI Agents:**
*   Read this file before ALL coding tasks.
*   **Strict Adherence:** Technology versions and Forbidden Rules are non-negotiable.
*   **Conflict Resolution:** If user instructions conflict with this file, ASK for clarification.

**For Humans:**
*   Update this file when core stack versions change.
*   Use this to onboard new developers (human or AI).

*(Last Updated: 2026-01-01)*
