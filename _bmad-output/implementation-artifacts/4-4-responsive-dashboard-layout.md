# Story 4.4: Responsive Dashboard Layout

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a real estate agent (Chibuzo/Fatima),
I want an adaptive dashboard layout that thrives on both mobile and desktop,
so that I can manage listings anywhere—from a site visit in Epe on 3G to the main office in Ikoyi.

## Acceptance Criteria

1. **Mobile Layout (<768px)**: Given I am on mobile, Then I see a single-column card layout, optimized for touch with 48px interaction targets, and a collapsed navigation (Sheet/Drawer). ([UX Specification: Mobile Strategy](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/ux-design-specification.md#L313))
2. **Desktop Layout (>1024px)**: Given I am on desktop, Then I see a multi-column grid layout (up to 3 columns) with higher information density. ([UX Specification: Desktop Strategy](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/ux-design-specification.md#L319))
3. **Asymmetric Grid**: The main property grid MUST use asymmetric ratios in desktop view (e.g., first card taking 2 columns) to adhere to the "Asymmetry is Law" design rule. ([Design Compact: Rule 1](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/project-context.md#L3))
4. **Touch Ergonomics**: All buttons (Publish, Unpublish, Delete) MUST have a minimum height of 48px on mobile breakpoints to ensure ease of use for field agents. ([UX Specification: Mobile Ergonomics](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/ux-design-specification.md#L331))
5. **Zero CLS / Skeleton Support**: Skeleton loading MUST be used during data fetching to prevent layout shifts (NFR1/UX7). ([UX Specification: Skeleton Loading](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/ux-design-specification.md#L295))

## Tasks / Subtasks

- [x] Responsive Shell Refactor <!-- id: 441 -->
  - [x] Update `src/app/(dashboard)/layout.tsx` to handle responsive sidebar/header.
  - [x] Implement a mobile-only `Sheet` (Drawer) for the sidebar using Shadcn UI.
- [x] Asymmetric Grid Implementation <!-- id: 442 -->
  - [x] Refactor `src/features/dashboard/components/listing-grid.tsx` to strictly follow asymmetric patterns.
  - [x] Ensure the first listing uses `lg:col-span-2` while others use `col-span-1`.
  - [x] Synced `listing-grid-skeleton.tsx` with the asymmetric pattern.
- [x] Touch-Target Optimization <!-- id: 443 -->
  - [x] Audit `src/features/dashboard/components/listing-card.tsx` for mobile interaction targets.
  - [x] Ensure buttons use `h-12` or similar to meet the 48px requirement on small screens.
- [x] Visual Refinement <!-- id: 444 -->
  - [x] Apply `transition-all duration-300` to all layout transitions.
  - [x] Ensure the "Lagos Luxury" aesthetics (shadows, gradients) are preserved in all viewports.
- [x] Verification <!-- id: 445 -->
  - [x] Verified 375px (iPhone SE) layout integrity via code audit and component structure.
  - [x] Verified 1440px (Desktop) asymmetric grid rendering.
  - [x] Pass full lint and build checks.
  - [x] Authored and passed unit tests for layout and grid logic.

### Review Follow-ups (AI)

- [x] [AI-Review][High] Synced inline skeleton in `listing-grid.tsx` with `ListingGridSkeleton.tsx`.
- [x] [AI-Review][High] Added unit tests for responsive behavior and asymmetric grid.
- [x] [AI-Review][Med] Removed unused `User` import from `DashboardSidebar`.
- [x] [AI-Review][Med] Documented `src/app/(dashboard)/dashboard/page.tsx` in File List.
- [x] [AI-Review][Med] Ensured 48px touch target for Cancel buttons in dialogs.
- [x] [AI-Review][Low] Extracted `MobileNav` to a dedicated Client Component.

## Dev Notes

- **Asymmetry**: Adhered to Rule 1. Grid uses `lg:col-span-2` for the primary feature item.
- **Lagos Luxury**: Enhanced sidebar with `bg-slate-950` and `shadow-2xl`. Skeleton loader uses `rounded-[2rem]` and `shadow-premium`.
- **3G Performance**: Responsive navigation uses `Sheet` for lightweight mobile access.

### Project Structure Notes

- Fixed a discrepancy where `src/app/(dashboard)/layout.tsx` was using a fixed sidebar—now fully responsive.

### References

- [UX Specification: Responsive Design](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/ux-design-specification.md#L311)
- [Design Compact: Asymmetry](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/project-context.md#L3)
- [Architecture: Feature Co-Location](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/architecture.md#L111)

## Dev Agent Record

### Agent Model Used

Antigravity (Gemini 2.0 Pro)

### Debug Log References

### Completion Notes List

- Implemented responsive app shell with mobile top nav and drawer sidebar.
- Optimized touch targets to 48px for all listing actions on mobile.
- Enforced asymmetric grid layout for better visual hierarchy on desktop.
- Synced skeleton loaders with the new asymmetric grid logic.

### File List

- [src/app/(dashboard)/layout.tsx](file:///c:/AI2025/buildr/src/app/(dashboard)/layout.tsx)
- [src/app/(dashboard)/_components/mobile-nav.tsx](file:///c:/AI2025/buildr/src/app/(dashboard)/_components/mobile-nav.tsx)
- [src/app/(dashboard)/dashboard/page.tsx](file:///c:/AI2025/buildr/src/app/(dashboard)/dashboard/page.tsx)
- [src/components/navigation/dashboard-sidebar.tsx](file:///c:/AI2025/buildr/src/components/navigation/dashboard-sidebar.tsx)
- [src/features/dashboard/components/listing-grid-skeleton.tsx](file:///c:/AI2025/buildr/src/features/dashboard/components/listing-grid-skeleton.tsx)
- [src/features/dashboard/components/listing-grid.tsx](file:///c:/AI2025/buildr/src/features/dashboard/components/listing-grid.tsx)
- [src/features/dashboard/components/listing-card.tsx](file:///c:/AI2025/buildr/src/features/dashboard/components/listing-card.tsx)
- [__tests__/features/dashboard/listing-grid.test.tsx](file:///c:/AI2025/buildr/__tests__/features/dashboard/listing-grid.test.tsx)
- [__tests__/features/dashboard/mobile-nav.test.tsx](file:///c:/AI2025/buildr/__tests__/features/dashboard/mobile-nav.test.tsx)
