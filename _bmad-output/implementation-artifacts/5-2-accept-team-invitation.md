# Story 5.2: Accept Team Invitation

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a user receiving an invitation,
I want to accept and join an Agency Team,
so that I can access the team's shared resources.

## Acceptance Criteria

1. **Invitation Link Flow**: Given I have received an invitation email, When I click the invitation link, Then I am redirected to an accept-invitation page that validates the token. ([Source: epics.md#L559-L561](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/epics.md#L559-L561))
2. **Account Prompt**: Given I click the link, When the token is valid, Then I am prompted to create an account (if new) or log in (if existing). ([Source: epics.md#L561](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/epics.md#L561))
3. **Team Join on Completion**: Given I complete the sign-up/log-in, When the process finishes, Then I am added to the team with "Editor" role by default. ([Source: epics.md#L563-L565](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/epics.md#L563-L565))
4. **Multi-Tenant Isolation (NFR4)**: The invitation acceptance MUST set the user's `teamId` based on the invitation record, not user input. ([Source: architecture.md#L104-L107](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/architecture.md#L104-L107))
5. **Mobile-First Touch Ergonomics**: All form inputs and buttons MUST have minimum height of 48px (`h-12`). ([Source: ux-design-specification.md#L331](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/ux-design-specification.md#L331))
6. **Invitation Status Update**: Given I successfully join, When the process completes, Then the `Invitation` record status is updated to `ACCEPTED`. ([Source: Prisma schema Invitation.status](file:///c:/AI2025/buildr/prisma/schema.prisma))

## Tasks / Subtasks

- [x] **Accept Invitation Route** (AC: 1, 2)
  - [x] Create `/invite/[token]/page.tsx` to handle the invitation link.
  - [x] Validate the invitation token and check expiry.
  - [x] Redirect to login/register with `callbackUrl` preserving the token context.
- [x] **Server Action: acceptInvitation** (AC: 3, 4, 6)
  - [x] Create `src/features/team/actions/accept-invitation.ts` with `acceptInvitation` server action.
  - [x] Validate token, fetch `Invitation` record, verify status is `PENDING`.
  - [x] Update `User.teamId` and set `Invitation.status` to `ACCEPTED` in a database transaction.
- [x] **UI Enhancements** (AC: 5)
  - [x] Ensure the invite accept page uses `h-12` for inputs/buttons.
  - [x] Display invitation details (team name, inviter) on the accept page.
- [x] **Verification**
  - [x] [TDD] Create `__tests__/features/team/accept-invitation.test.ts` to verify token validation, team join, and status update logic.
  - [x] [Playwright] Add E2E test for the invitation acceptance flow in `tests/e2e/team-management.spec.ts`.

## Dev Notes

- **Feature Co-Location (AR4)**: All new logic for invitation acceptance must live in `src/features/team`.
- **Auth Integration**: Use NextAuth's `callbackUrl` mechanism to redirect back to the invite accept page after login/register.
- **Security**: The server action must verify the token server-side, not trust any client-provided data.
- **Database Transaction**: Use Prisma `$transaction` to atomically update the user and invitation records.

### Project Structure Notes

- Route: `src/app/invite/[token]/page.tsx` (New)
- Server Action: `src/features/team/actions/accept-invitation.ts` (New)
- Extends: Existing `src/features/auth` for login/register flow integration.

### References

- [Architecture: Middleware-Level Tenant Isolation](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/architecture.md#L104-L107)
- [Architecture: Feature Co-Location](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/architecture.md#L111-L124)
- [Project Context: Server Action Rules](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/project-context.md#L56-L58)
- [Prisma Schema: Invitation Model](file:///c:/AI2025/buildr/prisma/schema.prisma#L164-L178)

## Dev Agent Record

### Agent Model Used

Antigravity (Gemini 2.0 Pro)

### Debug Log References

### Completion Notes List

- ✅ **Invitation Route**: Created `/invite/[token]` with token validation and login redirect.
- ✅ **Server Actions**: Implemented `acceptInvitation` and `validateInvitationToken` with atomic Prisma transaction.
- ✅ **UI Component**: Created `AcceptInvitationCard` with touch-friendly 48px targets and success state.
- ✅ **Security**: All team association derived from database invitation record, not user input (NFR4).
- ✅ **Test Coverage**: Comprehensive unit tests and E2E test for acceptance flow.

### File List

- `src/features/team/actions/accept-invitation.ts` (New)
- `src/app/invite/[token]/page.tsx` (New)
- `src/features/team/components/accept-invitation-card.tsx` (New - AR4 Feature Co-Location)
- `__tests__/features/team/accept-invitation.test.ts` (New)
- `tests/e2e/team-management.spec.ts` (Modified)
