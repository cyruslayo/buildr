# Story 5.5: Lock Templates (Admin Only)

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As an Agency Admin,
I want to lock premium templates,
so that only Admins can create pages with them.

## Acceptance Criteria

1. **Template Library UI**: Given I am logged in, When I navigate to `/dashboard/templates`, Then I see a grid of all available templates with "Lagos Luxury" aesthetics.
2. **Lock Toggle (Admin)**: Given I am in the template library as Admin, When I toggle "Lock" on a template, Then the template shows a lock icon and becomes Admin-only.
3. **Locked Status (Editor)**: Given an Editor views the template library, When a template is locked, Then it shows a lock icon and "Locked" status.
4. **Access Prevention**: Given an Editor tries to use a locked template (either in the library or wizard), Then they see "This template is locked. Contact your Admin."
5. **Authorization**: Only users with "ADMIN" or "AGENT" role can toggle template locks.
6. **NFR4 Isolation**: Template locks MUST be team-specific. One team locking a template should not affect other teams.
7. **Mobile-First Touch Ergonomics**: All interactive elements (toggles, buttons) MUST have minimum height of 48px (`h-12`).

## Tasks / Subtasks

- [x] **Infrastructure: Database Update**
  - [x] Add `LockedTemplate` model to `prisma/schema.prisma`.
  - [x] Run `pnpm prisma generate`.
- [x] **Server Actions: Template Management**
  - [x] Create `src/features/team/actions/lock-template.ts` with `toggleTemplateLock`.
  - [x] Implement `getLockedTemplates` for the current team.
- [x] **UI Component: Template Library Page**
  - [x] Create `src/app/(dashboard)/dashboard/templates/page.tsx` using `TEMPLATE_REGISTRY`.
  - [x] Implement asymmetric grid layout and Nigerian luxury aesthetics.
  - [x] Add lock toggle for Admins and lock indicators for Editors.
- [x] **Verification**
  - [x] [TDD] Create `__tests__/features/team/lock-template.test.ts` for authorization and NFR4 checks.
  - [x] [Playwright] Add E2E test for template locking and access prevention flow.

## Dev Notes

- **Optimistic UI**: Use `useOptimistic` for the lock toggle to ensure 3G resilience and perceived speed.
- **Lagos Luxury**: Use gradients, subtle shadows, and emerald accents for the "Admin" status.
- **NFR4**: Ensure every lock/unlock operation is scoped to the `teamId` from the session.

### References

- [Epic 5: Team Management](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/epics.md#L605-L620)
- [Design Compact: Asymmetry and Trust Density](file:///c:/AI2025/buildr/user_rules/design-compact.md)

## Dev Agent Record

### Agent Model Used

Antigravity (Gemini 2.0 Pro)

### Debug Log References

### Completion Notes List

- ✅ **Schema**: Added `LockedTemplate` model with unique constraint on `[templateId, teamId]`.
- ✅ **Server Actions**: Implemented `toggleTemplateLock` and `getLockedTemplates`.
- ✅ **UI**: Created Template Library page with Lagos Luxury aesthetics and optimistic locking.
- ✅ **Test Coverage**: Unit tests and E2E test for locking flow.

### File List

- `prisma/schema.prisma` (Modified)
- `src/features/team/actions/lock-template.ts` (New)
- `src/features/team/components/template-library.tsx` (New)
- `src/app/(dashboard)/dashboard/templates/page.tsx` (New)
- `__tests__/features/team/lock-template.test.ts` (New)
- `tests/e2e/template-locking.spec.ts` (New)
