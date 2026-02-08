# Story 4.1: Dashboard Listing Overview

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a real estate agent,
I want to see all my created pages in a dashboard list,
so that I can quickly check what's published and what's in draft.

## Acceptance Criteria

1. **Listing View**: Given I am logged in and navigate to my dashboard, When the page loads, Then I see a list/grid of all my property pages with status badges (Draft, Published). ([Epic 4.1](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/epics.md#L455))
2. **Skeleton Loading**: Given the dashboard is fetching data, When it takes time, Then a skeleton loading state displays for a minimum of 200ms to prevent layout shift. (UX7) ([UX: Skeleton Loading](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/ux-design-specification.md#L295))
3. **Empty State**: Given I have no listings yet, When the dashboard loads, Then I see an empty state: "No Listings? Your Empire Starts Here." with a "Create First Listing" CTA. ([UX: Empty States](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/ux-design-specification.md#L304))
4. **Tenant Isolation**: Given I am logged in, When I view the dashboard, Then I only see listings belonging to my agency team (enforced via Middleware/RLS). (NFR4) ([Architecture: Multi-Tenancy](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/architecture.md#L104))
5. **Responsive Grid**: Given I am on desktop, When I view the dashboard, Then I see a multi-column grid; on mobile (<768px), it collapses to a single column with 48px touch targets. (UX8) ([UX: Responsive Design](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/ux-design-specification.md#L309))

## Tasks / Subtasks

- [x] Setup Dashboard Feature Structure <!-- id: 410 -->
  - [x] Create `src/features/dashboard/components` and `src/features/dashboard/actions`.
- [x] Implement Listing Fetching Logic <!-- id: 411 -->
  - [x] Use Server Components to fetch property listings for the authenticated user's `teamId`.
- [x] Build Responsive Dashboard UI <!-- id: 412 -->
  - [x] Implement `ListingGrid` and `ListingCard` using `shadcn/ui`.
  - [x] Add "Lagos Luxury" status badges for Draft/Published states.
- [x] Add Performance Polish <!-- id: 413 -->
  - [x] Implement `Skeleton` loading states (min 200ms).
  - [x] Build the specified Empty State component.
- [x] Verification <!-- id: 414 -->
  - [x] Write integration test verifying Team Isolation (User A cannot see User B's listings).
  - [x] Manual verify 48px touch targets on mobile view.

### Review Follow-ups (AI) <!-- id: 415 -->
- [x] [AI-Review][High] Enforce 200ms minimum skeleton delay in `getProperties`. (AC2)
- [x] [AI-Review][High] Add `shadow-premium` to `tailwind.config.ts` or replace with existing shadow.
- [x] [AI-Review][Med] Add mandatory justification comments for "use client" in listing components. (Dev Compact #2)
- [x] [AI-Review][Med] Create `src/app/(dashboard)/dashboard/error.tsx`. (Project Context #70)
- [x] [AI-Review][Med] Fix inconsistent `auth()` import in `page.tsx`.
- [x] [AI-Review][Med] Tighten Team Isolation: If `teamId` exists, results should NOT include private `userId` properties.

## Dev Notes

- **Feature Co-Location**: All dashboard logic must stay within `src/features/dashboard`.
- **Server Components**: Use React Server Components for the initial data fetch to leverage Next.js 15 performance.
- **Middleware**: Ensure `teamId` is available in the session/context for the fetch command.

### Project Structure Notes

- Alignment with `src/features/{domain}` pattern defined in architecture.

### References

- [PRD: Property Management](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/prd.md#L42)
- [Architecture: Feature Co-Location](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/architecture.md#L111)
- [UX: Responsive Strategy](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/ux-design-specification.md#L310)

## Dev Agent Record

### Agent Model Used

Antigravity (Gemini 2.0 Pro)

### Debug Log References

### Completion Notes List
- Implemented `getProperties` server action with strict `teamId` isolation.
- Created `ListingGrid`, `ListingCard`, and `DashboardHeader` with Lagos Luxury aesthetics.
- Added `ListingGridSkeleton` for 3G-optimized perceived performance.
- Verified tenant isolation with Jest integration tests.

## Senior Developer Review (AI)

**Status:** Changes Requested
**Date:** 2026-01-13
**Outcome:** 6 findings identified (2 High, 4 Medium).

### Action Items
- [x] **[CRITICAL] Skeleton Timing**: Implemented `sleep(200)` in server action.
- [x] **[HIGH] Ghost Styles**: Added `shadow-premium` to `tailwind.config.ts`.
- [x] **[MEDIUM] Missing Error Boundary**: Created `src/app/(dashboard)/dashboard/error.tsx`.
- [x] **[MEDIUM] `use client` Justification**: Added mandatory comments to all client components.
- [x] **[MEDIUM] Inconsistent Auth**: Fixed import path in `page.tsx`.
- [x] **[MEDIUM] Tenant Isolation**: Tightened `where` clause to strictly prefer `teamId` when present.

### File List
- `src/features/dashboard/actions/get-properties.ts`
- `src/features/dashboard/components/listing-grid.tsx`
- `src/features/dashboard/components/listing-card.tsx`
- `src/features/dashboard/components/dashboard-header.tsx`
- `src/features/dashboard/components/listing-grid-skeleton.tsx`
- `src/app/(dashboard)/dashboard/page.tsx`
- `__tests__/features/dashboard/tenant-isolation.test.ts`
- `src/app/(dashboard)/dashboard/error.tsx` [NEW]
