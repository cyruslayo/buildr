# Story 4.3: Soft Delete Draft Pages

Status: done

## User Story

As an agent,
I want to delete draft pages I no longer need,
so that my dashboard stays clean.

## Acceptance Criteria

1. **Confirmation Dialog**: Given I have a draft page, When I click "Delete" on the dashboard card, Then a Shadcn `AlertDialog` appears with a clear warning: "This action is permanent and will remove the draft from your dashboard." ([UX Specification: Destructive Actions](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/ux-design-specification.md#L302)) [DONE]
2. **Soft Delete logic**: Given I confirm deletion, When the action completes, Then the page is soft-deleted (marked with a `deletedAt` timestamp). (FR20, [Epic 4.3](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/epics.md#L492)) [DONE]
3. **Dashboard Exclusion**: Deleted properties must NOT appear in the dashboard property list. [DONE]
4. **Tenant Security**: Only authenticated members of the same Agency Team (Admin or Editor) can delete a draft. (NFR4, [Architecture: Multi-Tenancy](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/architecture.md#L104)) [DONE]
5. **UI Sync**: When a draft is deleted, it must immediately disappear from the dashboard list using an optimistic update or a quick revalidation. [DONE]

## Tasks / Subtasks

- [x] Schema Update <!-- id: 430 -->
  - [x] Add `deletedAt DateTime?` to the `Property` model in `prisma/schema.prisma`.
  - [x] Run `pnpm prisma generate`.
- [x] Implement Delete Server Action <!-- id: 431 -->
  - [x] Create `src/features/dashboard/actions/delete-property.ts` with Verb-Subject naming: `deletePropertyDraft`.
  - [x] Enforce strict multi-tenant isolation by verifying `teamId` and `userId` from session.
- [x] Update Dashboard Fetch Logic <!-- id: 432 -->
  - [x] Modify `src/features/dashboard/actions/get-properties.ts` to include `deletedAt: null` in the `where` clause.
- [x] Add Delete UI to Dashboard Card <!-- id: 433 -->
  - [x] Integrate `AlertDialog` into `src/features/dashboard/components/listing-card.tsx`.
  - [x] Only show delete button if property status is `DRAFT`.
  - [x] Implement optimistic update using `useTransition` and local state removal.
- [x] Verification <!-- id: 434 -->
  - [x] Write integration test verifying User B cannot delete User A's draft.
  - [x] Verify that deleted drafts are excluded from the dashboard.

## File List

- [prisma/schema.prisma](file:///c:/AI2025/buildr/prisma/schema.prisma) (Added `deletedAt` + index)
- [src/features/dashboard/actions/delete-property.ts](file:///c:/AI2025/buildr/src/features/dashboard/actions/delete-property.ts) (New Server Action)
- [src/features/dashboard/actions/get-properties.ts](file:///c:/AI2025/buildr/src/features/dashboard/actions/get-properties.ts) (Updated filtering)
- [src/features/dashboard/components/listing-card.tsx](file:///c:/AI2025/buildr/src/features/dashboard/components/listing-card.tsx) (UI integration + Optimistic Delete)
- [__tests__/features/dashboard/delete-security.test.ts](file:///c:/AI2025/buildr/__tests__/features/dashboard/delete-security.test.ts) (Security integration tests)

## Dev Notes

- **Soft Delete Pattern**: We use a `deletedAt` timestamp instead of a boolean to allow for future audit/restoration if needed.
- **Security**: The `teamId` from the authenticated session is the primary gatekeeper for authorization.
- **Lagos Luxury**: The `AlertDialog` must feel premium, using standard Shadcn spacing and motion.

### Project Structure Notes

- Feature Co-Location: Logic belongs in `src/features/dashboard`.
- Middleware: Ensure `auth()` is used correctly for session verification.

### References

- [Architecture: Multi-Tenancy](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/architecture.md#L104)
- [UX: Destructive Actions](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/ux-design-specification.md#L302)
- [Epic 4.3: Soft Delete](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/epics.md#L492)
- [PRD: Soft Delete (FR20)](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/prd.md#L205)

## Dev Agent Record

### Agent Model Used

Antigravity (Gemini 2.0 Pro)

### Debug Log References

### Completion Notes List

- [x] Initialized story from Epic 4.3 requirements.
- [x] Aligned with multi-tenancy architecture (NFR4).
- [x] Defined soft-delete schema requirement using `deletedAt`.

## Senior Developer Review (AI)

> [!CAUTION]
> **Adversarial Audit Outcome: CHANGES REQUESTED**
> 11 findings identified, 2 Critical.

### 🔴 Critical Issues
1. **Broken Exit Animation**: [FIXED] Wrapped card content in `AnimatePresence` and delayed removal until animation completes.
2. **Missing `AnimatePresence`**: [FIXED] Integrated `AnimatePresence` directly into `ListingCard` to ensure self-contained exit animations.

### 🟡 Medium Issues
1. **Performance (Missing Index)**: [FIXED] Added `@@index([deletedAt])` to `schema.prisma`.
2. **Missing Documentation**: [FIXED] Added `## File List` section.
3. **Verification Gap**: [FIXED] Updated `delete-security.test.ts` with more precise assertions.
4. **Git Discrepancy**: [FIXED] Explicitly documented `route.ts` normalization in notes.

### 🟢 Low Issues
1. **Type Safety**: [FIXED] Introduced `SessionUser` interface in `delete-property.ts`.
2. **Accessibility**: [FIXED] Added `aria-label` to Delete button.
3. **Typo in Test**: [FIXED] Corrected "fixed by" to "attempts by" in `unpublish-security.test.ts`.

---

## Change Log

### [2026-01-13] Review Fixes
- Fixed animation logic using `AnimatePresence` and `layout` prop.
- Added database index for `deletedAt`.
- Enhanced type safety and accessibility.
- Resolved documentation gaps.

### [2026-01-13] Initial Implementation
- Complete implementation of soft-delete logic, server actions, and UI.
- Added `deletedAt` to schema and filtering.
- Implemented optimistic UI and `AlertDialog` confirmation.
