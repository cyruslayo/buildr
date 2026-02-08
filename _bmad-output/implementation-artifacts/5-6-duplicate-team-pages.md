# Story 5.6: Duplicate Team Pages

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a team member,
I want to duplicate existing pages created by teammates,
so that I can reuse successful layouts quickly.

## Acceptance Criteria

1. **Duplicate Action**: Given I am on the dashboard, When I see a listing created by a teammate, Then I see a "Duplicate" button/option.
2. **Copy Creation**: When I click "Duplicate", Then a new draft is created with all the original's data (title, location, price, amenities, description).
3. **Ownership**: The newly created draft is assigned to ME as the owner (`userId`), but remains in the same `teamId`.
4. **Naming Convention**: The new draft's title defaults to "Copy of [Original Title]".
5. **State Reset**: A duplicated listing MUST start as a `DRAFT`, even if the original was `PUBLISHED`. No slug or published status should be copied.
6. **NFR4 Isolation**: I can ONLY duplicate pages belonging to my own team.
7. **Mobile-First**: The "Duplicate" button must adhere to touch ergonomics (`h-12` on mobile).

## Tasks / Subtasks

- [x] **Server Action: Property Duplication**
  - [x] Create `src/features/dashboard/actions/duplicate-property.ts` with `duplicateProperty`.
  - [x] Implement deep copy logic with NFR4 team isolation check.
- [x] **UI Component: Card Actions**
  - [x] Update `src/features/dashboard/components/listing-card.tsx` to include the Duplicate button.
  - [x] Implement loading state and success/error toasts.
- [x] **Verification**
  - [x] [Unit Test] Create `__tests__/features/dashboard/duplicate-property.test.ts` for logic validation.
  - [x] [Playwright] Add E2E test for the full duplication flow.

## Dev Notes

- **Metadata Sync**: Ensure `stylePreset` and `fontPairing` (stored in propertyData) are also copied if they exist in the DB model (check if they were added as fields or live in a JSON blob).
- **Lagos Luxury**: The "Copying..." state should feel snappy.
- **NFR4**: Verify that searching for the original property also checks `teamId` match.

### References

- [Epic 5: Team Management](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/epics.md#L623-L635)
- [NFR4: Multi-tenant Isolation](file:///c:/AI2025/buildr/user_rules/dev-compact.md)

## Dev Agent Record

### Agent Model Used

Antigravity (Gemini 2.0 Pro)

### Debug Log References

### Completion Notes List

- ✅ **Server Action**: Implemented `duplicateProperty` with NFR4 team isolation.
- ✅ **UI**: Integrated "Duplicate" button in `ListingCard` with touch-friendly ergonomics.
- ✅ **Test Coverage**: Created unit and E2E tests for the duplication flow.

### File List

- `src/features/dashboard/actions/duplicate-property.ts` (New)
- `src/features/dashboard/components/listing-card.tsx` (Modified)
- `__tests__/features/dashboard/duplicate-property.test.ts` (New)
- `tests/e2e/property-duplication.spec.ts` (New)
