# Story 5.3: Assign Team Roles (Admin/Editor)

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As an Agency Admin,
I want to assign "Admin" or "Editor" roles to team members,
so that I can control who manages users vs who creates content.

## Acceptance Criteria

1. **Change Role UI**: Given I am viewing the team members list, When I click "Change Role" on a team member, Then I can select between "Admin" and "Editor". ([Source: epics.md#L577-L579](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/epics.md#L577-L579))
2. **Immediate Permission Update**: Given I change a role, When the member refreshes their session, Then their permissions are updated immediately. ([Source: epics.md#L581-L583](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/epics.md#L581-L583))
3. **Admin-Only Authorization**: Only users with "ADMIN" role can change roles of other team members.
4. **Multi-Tenant Isolation (NFR4)**: Role changes MUST only affect users within the same `teamId` as the admin. ([Source: architecture.md#L104-L107](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/architecture.md#L104-L107))
5. **Mobile-First Touch Ergonomics**: All interactive elements MUST have minimum height of 48px (`h-12`). ([Source: ux-design-specification.md#L331](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/ux-design-specification.md#L331))
6. **Optimistic UI (AC6)**: Role change should update immediately in the UI while the server action processes in the background.

## Tasks / Subtasks

- [x] **Server Action: changeTeamMemberRole** (AC: 2, 3, 4)
  - [x] Create `src/features/team/actions/change-role.ts` with `changeTeamMemberRole` server action.
  - [x] Validate admin authorization and same-team membership.
  - [x] Update `User.role` in database and revalidate paths.
- [x] **UI Component: Role Selector** (AC: 1, 5, 6)
  - [x] Add "Change Role" button to each team member card in `TeamMemberList`.
  - [x] Create role selector dropdown (Admin/Editor) with touch-friendly 48px targets.
  - [x] Implement optimistic UI update with rollback on failure.
- [x] **Prevent Self-Demotion** (Edge Case)
  - [x] Prevent admin from demoting themselves to Editor if they're the only Admin.
- [x] **Verification**
  - [x] [TDD] Create `__tests__/features/team/change-role.test.ts` to verify authorization, role update, and edge cases.
  - [x] [Playwright] Add E2E test for role change flow in `tests/e2e/team-management.spec.ts`.

## Dev Notes

- **Feature Co-Location (AR4)**: All new logic must live in `src/features/team`.
- **Optimistic UI Pattern**: Update local state immediately, revert on server error.
- **Session Updates**: Since NextAuth caches session, role changes take effect on next request/refresh.

### Project Structure Notes

- Server Action: `src/features/team/actions/change-role.ts` (New)
- Component: Modify `src/features/team/components/team-member-list.tsx` to add role change UI.

### References

- [Architecture: Middleware-Level Tenant Isolation](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/architecture.md#L104-L107)
- [Architecture: Feature Co-Location](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/architecture.md#L111-L124)
- [Project Context: Optimistic-First Data Flow](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/project-context.md#L48-L54)

## Dev Agent Record

### Agent Model Used

Antigravity (Gemini 2.0 Pro)

### Debug Log References

### Completion Notes List

- ✅ **Server Action**: Implemented `changeTeamMemberRole` with admin auth, NFR4 team isolation, and self-demotion prevention.
- ✅ **UI Component**: Created `TeamMemberListClient` with optimistic role selector using `useOptimistic` hook.
- ✅ **Touch Ergonomics**: Select dropdown items have `h-12` height for mobile-friendly targets.
- ✅ **Server/Client Split**: Refactored `TeamMemberList` as server wrapper passing data to client component.
- ✅ **Test Coverage**: Comprehensive unit tests and E2E test for role change flow.

### File List

- `src/features/team/actions/change-role.ts` (New)
- `src/features/team/components/team-member-list-client.tsx` (New)
- `src/features/team/components/team-member-list.tsx` (Modified - server wrapper)
- `__tests__/features/team/change-role.test.ts` (New)
- `tests/e2e/team-management.spec.ts` (Modified)
