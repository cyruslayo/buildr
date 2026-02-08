# Story 4.2: Unpublish Live Page

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a real estate agent,
I want to unpublish a live page,
so that I can take down a listing that's sold or needs updates.

## Acceptance Criteria

1. **Confirmation Dialog**: Given I have a published page, When I click "Unpublish" on the dashboard card, Then a confirmation dialog appears to prevent accidental unpublishing. ([UX Specification: Dialogs](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/ux-design-specification.md#L302))
2. **Status Transition**: Given I confirm "Unpublish", When the action completes, Then the page status changes from `PUBLISHED` to `DRAFT` in the database. ([Epic 4.2](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/epics.md#L486))
3. **Public Access Revoked**: When a page is unpublished, Then any attempt to access the public subdomain URL (`agency.buildr.ng/property-slug`) must return a 404 error. ([Epic 4.2](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/epics.md#L488))
4. **Tenant Security**: Only authenticated members of the same Agency Team (Admin or Editor) can unpublish a page. (NFR4) ([Architecture: Multi-Tenancy](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/architecture.md#L104))

## Tasks / Subtasks

- [x] Implement Unpublish Server Action <!-- id: 420 -->
  - [x] Create `src/features/dashboard/actions/unpublish-property.ts` with Verb-Subject naming.
  - [x] Enforce strict multi-tenant isolation: check `teamId` or `userId` (solo) matches property owner.
- [x] Add Unpublish UI to Dashboard Card <!-- id: 421 -->
  - [x] Integrate `AlertDialog` from `shadcn/ui` for "Lagos Luxury" styled confirmation.
  - [x] Toggle "Unpublish" button visibility based on `PUBLISHED` status.
- [x] Implement Routing Gate <!-- id: 422 -->
  - [x] Update public property renderer or middleware to return 404 for `DRAFT` status pages.
- [x] Verification <!-- id: 423 -->
  - [x] Write integration test verifying User B cannot unpublish User A's listing.
  - [x] Manual verify 404 behavior for recently unpublished slug.

## Dev Notes

- **Action Pattern**: Follow "Verb-Subject" naming protocol: `unpublishProperty`.
- **Security**: Use the session-injected `teamId` from auth middleware to authorize the unpublish command.
- **UX**: Use a center-aligned `AlertDialog` as per UX spec for destructive actions.

### Project Structure Notes

- Feature Co-Location: Logic belongs in `src/features/dashboard`.
- Middleware: Ensure `auth()` is used correctly for session verification.

### References

- [Architecture: Multi-Tenancy](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/architecture.md#L104)
- [UX: Destructive Actions](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/ux-design-specification.md#L302)
- [Epic 4.2: Unpublish Page](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/epics.md#L474)


## Senior Developer Review

### 🔴 Critical Issues
- None found. Functional ACs are met.

### 🟡 Medium Issues
1. **Missing UX Feedback (Toast)**: `ListingCard` catches errors but only checks console. Success relies on implicit UI update. "Lagos Luxury" demands explicit feedback (e.g., "Property unpublished"). **[FIXED]** Installed `sonner` and added success/error toasts.
2. **Architecture / Performance**: Public page using Client-Side Fetch (`page.tsx`) means users see a "Loading..." spinner before getting the 404 for unpublished items. Should be Server Component (RSC) for instant 404. **[DEFERRED]** Large refactor, will be handled in separate tech debt ticket.
3. **Type Safety**: `unpublish-property.ts` uses `(session.user as any).teamId`. Should extend `NextAuth` types properly or use a type guard. **[FIXED]** Added type assertion `(session.user as { teamId?: string })`.
4. **Error Handling**: `ListingCard` swallows specific error messages from the server ("Unauthorized" vs "Not Found"), just logging generic error. **[FIXED]** Toast now displays specific error messages.

### 🟢 Low Issues
1. **Test Hygiene**: `unpublish-security.test.ts` had to use `any` casting for `mockedAuth` to bypass compilation.
2. **Button Styling**: The "Unpublish" trigger is a raw `button`. Should probably be a `ghost` variant `Button` component for consistency. **[FIXED]** Replaced with `<Button variant="ghost">`.

## Dev Agent Record

### Agent Model Used

Antigravity (Gemini 2.0 Pro)

### Debug Log References

### Completion Notes List
- Implemented `unpublishProperty` server action with strict tenant isolation.
- Added "Unpublish" confirmation dialog to `ListingCard`.
- Updated property API to return 404 for `DRAFT` status listings.
- Verified security via integration tests (with mocked auth).

### File List
- `src/features/dashboard/actions/unpublish-property.ts` [NEW]
- `src/features/dashboard/components/listing-card.tsx` [MODIFY]
- `src/app/(public)/[agency]/[slug]/page.tsx` [MODIFY] (or equivalent public route)
- `__tests__/features/dashboard/unpublish-security.test.ts` [NEW]
