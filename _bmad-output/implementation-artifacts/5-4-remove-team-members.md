# Story 5.4: Remove Team Members

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As an Agency Admin,
I want to remove team members,
so that former employees no longer have access.

## Acceptance Criteria

1. **Remove Button**: Given I am viewing the team members list, When I click "Remove" on a member, Then a confirmation dialog appears. ([Source: epics.md#L595-L597](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/epics.md#L595-L597))
2. **Confirmation Flow**: Given I confirm removal, When the action completes, Then the member is removed and can no longer access team resources. ([Source: epics.md#L599-L601](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/epics.md#L599-L601))
3. **Admin-Only Authorization**: Only users with "ADMIN" role can remove team members.
4. **Multi-Tenant Isolation (NFR4)**: Removal MUST only affect users within the same `teamId` as the admin. ([Source: architecture.md#L104-L107](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/architecture.md#L104-L107))
5. **Mobile-First Touch Ergonomics**: All interactive elements MUST have minimum height of 48px (`h-12`). ([Source: ux-design-specification.md#L331](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/ux-design-specification.md#L331))
6. **Prevent Self-Removal**: Admins cannot remove themselves from the team.

## Tasks / Subtasks

- [x] **Server Action: removeTeamMember** (AC: 2, 3, 4, 6)
  - [x] Create `src/features/team/actions/remove-member.ts` with `removeTeamMember` server action.
  - [x] Validate admin authorization, same-team membership, and prevent self-removal.
  - [x] Update `User.teamId` to `null` and revalidate paths.
- [x] **UI Component: Remove Button with Confirmation** (AC: 1, 5)
  - [x] Add "Remove" button to each team member card in `TeamMemberListClient`.
  - [x] Implement confirmation dialog using shadcn AlertDialog.
  - [x] Ensure touch-friendly 48px button targets.
- [x] **Verification**
  - [x] [TDD] Create `__tests__/features/team/remove-member.test.ts` to verify authorization, removal, and edge cases.
  - [x] [Playwright] Add E2E test for member removal flow in `tests/e2e/team-management.spec.ts`.

## Dev Notes

- **Feature Co-Location (AR4)**: All new logic must live in `src/features/team`.
- **Access Revocation**: Setting `teamId` to `null` immediately revokes team access on next auth check.
- **Optimistic UI**: Not recommended for destructive actions - wait for server confirmation before updating UI.

### Project Structure Notes

- Server Action: `src/features/team/actions/remove-member.ts` (New)
- Component: Modify `src/features/team/components/team-member-list-client.tsx` to add remove button.

### References

- [Architecture: Middleware-Level Tenant Isolation](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/architecture.md#L104-L107)
- [Architecture: Feature Co-Location](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/architecture.md#L111-L124)
- [shadcn/ui AlertDialog](https://ui.shadcn.com/docs/components/alert-dialog)

## Dev Agent Record

### Agent Model Used

Antigravity (Gemini 2.0 Pro)

### Debug Log References

### Completion Notes List

- ✅ **Server Action**: Implemented `removeTeamMember` with admin auth, NFR4 isolation, and self-removal prevention.
- ✅ **UI Component**: Added AlertDialog-based remove button with `h-12` touch targets.
- ✅ **Security**: Sets `teamId` to `null` and resets role to EDITOR, revoking access immediately.
- ✅ **Test Coverage**: Comprehensive unit tests and E2E test for removal flow.

### File List

- `src/features/team/actions/remove-member.ts` (New)
- `src/features/team/components/team-member-list-client.tsx` (Modified)
- `__tests__/features/team/remove-member.test.ts` (New)
- `tests/e2e/team-management.spec.ts` (Modified)
