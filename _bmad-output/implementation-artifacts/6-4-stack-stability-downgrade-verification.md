# Story 6.4: Stack Stability & Downgrade Verification

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer,
I want the codebase on stable library versions,
So that production builds are reliable.

## Acceptance Criteria

1. **Stable Core Dependencies**: `package.json` MUST show:
   - `next`: `^15.0.0` (Stable) - ❌ NO Canary/16.x
   - `react`: `^18.2.0` (Stable) - ❌ NO RC/19.x
   - `tailwindcss`: `^3.4.0` (Stable) - ❌ NO v4 Alpha

2. **Clean Production Build**: When `pnpm build` completes:
   - Exit code MUST be 0
   - Console output MUST contain NO canary warnings
   - Any third-party instrumentation warnings (e.g., Sentry) MUST be documented in the verification report
   - NO "react@19" or "next@16" deprecation notices

3. **Build Verification Report**: A verification report documenting:
   - All core dependency versions
   - Build output analysis (warnings audit)
   - Production readiness confirmation

## Tasks / Subtasks

- [x] **Audit: Verify Current Stack Versions** (AC: 1)
  - [x] Check `package.json` for `next`, `react`, `react-dom`, `tailwindcss` versions
  - [x] Verify no canary/alpha/RC versions present in dependencies
  - [x] Document any version mismatches

- [x] **Build: Run Production Build** (AC: 2)
  - [x] Execute `pnpm build` and capture full output
  - [x] Scan output for experimental/canary warnings
  - [x] Verify exit code is 0

- [x] **Verification: Document Stack Status** (AC: 3)
  - [x] Create verification report with version matrix
  - [x] Confirm all NFR and compliance requirements met
  - [x] Update story status to done

## Dev Notes

### Architecture Compliance

**From Architecture Document (AR6):**
> **Strategic Decision: Downgrade to Stable**
> We will strictly revert to the current **Stable (LTS)** versions of all core libraries.
> **Rationale:** The goal of this phase is "Production Readiness". Experimental versions carry unacceptable risks of bugs, build failures, and library incompatibility (especially `shadcn/ui` and `react-hook-form` ecosystem).

**Target Stable Stack:**
- **Framework:** Next.js 15 (Stable)
- **Library:** React 18 (Stable)
- **Styling:** Tailwind CSS 3.4 (Stable)

### Source Tree Files to Touch

- `package.json` - Version verification (READ ONLY unless downgrade needed)
- `pnpm-lock.yaml` - Lock file consistency check

### Testing Standards

This is a verification story, not an implementation story. The primary artifact is a **verification report** documenting:
1. Current versions of all core dependencies
2. Build output analysis
3. Production readiness confirmation

### Project Structure Notes

- **No code changes expected** - This is a verification/audit story
- **If downgrades are needed**: Use `pnpm add next@15 react@18 react-dom@18 tailwindcss@3.4`

### References

- [Architecture: Stack Strategy](file:///_bmad-output/planning-artifacts/architecture.md#Starter%20Tech%20Stack%20Strategy)
- [Project Context: Tech Stack](file:///_bmad-output/planning-artifacts/project-context.md#Technology%20Stack%20%26%20Versions)
- [Epic 6: Polish & Performance](file:///_bmad-output/planning-artifacts/epics.md#Epic%206)

### Previous Story Intelligence (6.3)

- Story 6.3 focused on WCAG 2.1 AA accessibility compliance
- All focus rings, labels, and alt text were standardized
- No version-related issues encountered
- Build completed successfully with exit code 0

## Dev Agent Record

### File List

- `package.json`: Downgraded mismatching `@next` devDependencies to v15.
- `pnpm-lock.yaml`: Updated lockfile reflecting dependency downgrades.
- `next.config.ts`: Explicitly disabled `clientTraceMetadata` experiment; added explicit export typing.
- `__tests__/stack/version-stability.test.ts`: Automated version verification tests.
- `.gitignore`: Ignore generated Playwright outputs and generated service worker assets to reduce review noise.
- `_bmad-output/implementation-artifacts/build-verification-report-6-4.md`: Build verification report.

### Completion Notes List

- Ultimate context engine analysis completed - comprehensive developer guide created.
- Verified stable stack: Next.js 15.5.9, React 18.3.1, Tailwind 3.4.19.
- Fixed version mismatches in devDependencies (`@next/bundle-analyzer`, `@next/eslint-plugin-next`).
- Successfully completed production build with exit code 0.
- Documented all findings in the Build Verification Report.

## Senior Developer Review (AI)

**Review Date**: 2026-01-17
**Review Outcome**: ✅ Approved with fixes applied

### Action Items
- [x] [MEDIUM] AC2 Partial Violation - Documented Sentry limitation in verification report
- [x] [MEDIUM] Add `pnpm-lock.yaml` to File List
- [x] [MEDIUM] Create automated version verification tests (`version-stability.test.ts`)
- [x] [MEDIUM] Update documentation for version declaration consistency
- [x] [LOW] Fix story section structure (File List under Dev Agent Record)
- [x] [LOW] Add explicit type annotation to `next.config.ts` export

## Change Log

- 2026-01-17: Created story file and initialized. (Status -> ready-for-dev)
- 2026-01-17: Audited package versions, fixed mismatches, ran production build, and created verification report. (Status -> done)
- 2026-01-17: Code Review fixes: Added version stability tests, fixed File List, added export typing. (Status -> done)
- 2026-01-20: Code Review fixes: Removed duplicate `tailwindcss` dependency entry, updated `next.config.ts` to avoid `require`, expanded version tests to validate resolved lockfile versions, and ignored generated artifacts. (Status -> done)
