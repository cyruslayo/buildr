# Story 6.1: PWA Service Worker & App Shell

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a field agent on 3G,
I want the wizard to load instantly from cache,
so that I can start working even with poor connectivity.

## Acceptance Criteria

1. **Service Worker Cache**: Given I have visited Buildr before, When I open the app on slow 3G, Then the App Shell (JS/CSS/fonts) loads from Service Worker cache within 2 seconds.
2. **Offline Mode Indicator**: Given I lose network connection, When I open the app, Then the cached shell still loads and shows a visible "Offline Mode" indicator.
3. **PWA Manifest**: The app must be "installable" (contain a valid `manifest.json` with icons and theme colors).
4. **Resilience**: The Wizard should remain functional for data entry while offline (addressed in Epic 2, but verified here for PWA shell integrity).

## Tasks / Subtasks

- [x] **Infrastructure: PWA Manifest & Icons**
  - [x] Create `public/manifest.json` with required icons (192, 512, 1024).
  - [x] Ensure `manifest.json` is linked in the root layout.
  - [x] Configure theme colors matching "Lagos Luxury" (slate-900/primary).
- [x] **Component: Offline Indicator**
  - [x] Create `src/components/navigation/offline-indicator.tsx`.
  - [x] Implement `window.onLine` listener to toggle visibility.
  - [x] Style with "Aura-level" motion (Framer Motion) for entry/exit.
- [x] **Verification**
  - [x] [Audit] Run Lighthouse PWA audit.
  - [x] [Manual] Simulate "Offline" in Chrome DevTools -> Verify shell loads and indicator appears.

## Dev Notes

- **Library**: Already using `@ducanh2912/next-pwa` in `next.config.ts`.
- **Cache Strategy**: The current config uses `cacheOnFrontEndNav: true`. Ensure it also caches critical assets on initial load.
- **Lagos Luxury**: The Offline indicator should feel premium (e.g., a subtle amber/gold banner or floating badge), not a generic red alert.

### References

- [Epic 6: Polish & Performance](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/epics.md#L641)
- [NFR1: Shell Load](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/prd.md#L215)
- [NFR7: Crash Recovery](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/prd.md#L224)

## Dev Agent Record

### Agent Model Used

Antigravity (Gemini 2.0 Pro)

### Debug Log References

### Completion Notes List

- ✅ **PWA Infrastructure**: Manifest created and linked; Service Worker generation verified via `next build`.
- ✅ **Offline Indicator**: Implemented `OfflineIndicator` with `framer-motion` for smooth network state transitions.
- ✅ **Test Coverage**: Added unit tests in `__tests__/components/offline-indicator.test.tsx` verifying online/offline toggling.
- ✅ **Code Review**: Addressed high, medium, and low issues (import order, unused imports, manifest icon sizes, doc duplication).

### File List

- `public/manifest.json`
- `public/icons/icon.png`
- `src/app/layout.tsx`
- `src/components/navigation/offline-indicator.tsx`
- `__tests__/components/offline-indicator.test.tsx`
