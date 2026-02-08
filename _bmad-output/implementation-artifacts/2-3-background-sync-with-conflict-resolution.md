# Story 2.3: Background Sync with Conflict Resolution

Status: done

## Story Description

**As an** agent working on spotty 3G,
**I want** my drafts to sync to the server in the background,
**So that** I can access them from any device when connection returns and I have a durable backup on the server.

## Acceptance Criteria

- [x] **AC1: Debounced Background Sync**
  - Given I am entering data in the wizard
  - When I stop typing for 500ms
  - Then a background sync is triggered via the `updatePropertyDraft` Server Action
- [x] **AC2: Sync Status Indicator (UX6)**
  - Given a sync is in progress
  - When I look at the `WizardShell`
  - Then I see a non-blocking cloud icon/text in the "Syncing" state
  - And when finished, it shows "Saved to Cloud" or a checkmark
- [x] **AC3: Offline-to-Online Recovery**
  - Given I made changes while offline
  - When the browser detects a restored connection (`online` event)
  - Then a sync is immediately triggered to reconcile the server with the latest local draft
- [x] **AC4: Basic Conflict Resolution (Last Write Wins)**
  - Given multiple writes are queued or multi-device usage
  - Then the system ensures the server only accepts updates that are "newer" than the current persisted state (using a `lastModified` timestamp in the payload)

## Developer Context

### Architecture & Tech Stack
- **Database:** Prisma (Postgres)
- **Actions:** Next.js Server Actions (`use server`)
- **State:** Zustand (Store) + React Hook (Sync logic)
- **Constraint:** NFR2 (<16ms latency). Sync must NOT block the main thread or input.

### Critical Guardrails
- **Verb-Subject Naming:** Action must be named `updatePropertyDraft`.
- **Multi-Tenant Security:** Use AR3 (middleware-injected `teamId`) to ensure users only sync to their own team's properties.
- **Zero-Spinner Policy:** The sync status should be subtle and non-intrusive.

## Technical Requirements

### 1. Database Schema Evolution
- Define a `Property` model in `prisma/schema.prisma`.
- Fields: `id`, `title?`, `price?`, `location?`, `amenities[]`, `description?`, `status` (DRAFT/PUBLISHED), `userId`, `teamId`, `updatedAt`.
- Relationship: `User` has many `Properties`.

### 2. Server Action: `updatePropertyDraft`
- File: `src/features/wizard/actions/update-property-draft.ts`
- Must validate session and `teamId`.
- Use `upsert` logic to create or update the draft.
- Return the `updatedAt` timestamp to the client for reconciliation.

### 3. Client-Side Sync Hook (`useWizardSync`)
- Create `src/features/wizard/hooks/use-wizard-sync.ts`.
- Use `useEffect` to watch `propertyData` in the Zustand store.
- Implement debounce (500ms) to prevent hammering the server.
- Update `syncStatus` in the store (`idle`, `syncing`, `synced`, `error`).

### 4. UI Integration
- Update `WizardShell` to display the `syncStatus` from the store.
- Use Lucide icons: `Cloud`, `CloudSync`, `CloudCheck`, `CloudAlert`.

## Tasks

- [x] **Task 1: Schema Migration**
  - [x] Add `Property` model to `prisma/schema.prisma`.
  - [x] Run `pnpm prisma migrate dev`.
- [x] **Task 2: Implement Sync State in Store**
  - [x] Add `syncStatus` and `lastSyncedAt` to `WizardState`.
  - [x] Add `setSyncStatus` and `setLastSyncedAt` actions.
- [x] **Task 3: Create Server Action**
  - [x] Implement `updatePropertyDraft` with authentication and multi-tenancy checks.
- [x] **Task 4: Implement Sync Logic**
  - [x] Create `use-wizard-sync.ts` hook.
  - [x] Integrate hook into `WizardShell` via `PersistenceProvider`.
- [x] **Task 5: UI Polish**
  - [x] Add the sync indicator to `WizardShell` with Lagos Luxury styling.
- [x] **Task 6: Verification**
  - [x] E2E Test: Modify data -> Wait 500ms -> Check logic transitions (`wizard-sync-logic.spec.ts`).
  - [x] E2E Test: Offline mode -> Modify -> Go Online -> Check recovery.

---

## Dev Agent Record (AI)
*Created by create-story workflow*
- **Base Epic:** Epic 2 (Property Wizard)
- **Complexity:** Medium
- **Priority:** High
- **Lessons from Story 2.2:** Multi-tab sync is already handled; focus on Client-Server sync.
- **Adversarial Review (Story 2.3):**
    - [x] Fixed High-Severity security leak in `updatePropertyDraft`.
    - [x] Implemented AC4 "Last Write Wins" timestamp-based resolution.
    - [x] Resolved TypeScript interface errors in `WizardState`.
    - [x] Optimized `useWizardSync` hook performance.
