# Story 3.4: Style Preset Selection (Colors)

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As an agent,
I want to select from predefined color schemes,
so that my listing looks professional without design skills.

## Acceptance Criteria

1. **Preset Visibility**: Given I am on the "Style" step of the wizard, When the step loads, Then I see 4 style presets: Executive Navy, Growth Green, Luxury Onyx, Urgency Red. (FR9, [PRD: Design System](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/prd.md#L35))
2. **Real-time Preview**: Given I tap a preset, When I select it, Then the preview updates immediately with the new colors. (UX8)
3. **Walled Garden Enforcement**: Given I am on the Style step, When I look for custom color options, Then no custom color picker is available. (Constraint: Nigeria-First Design Guardrails)

## Tasks / Subtasks

- [x] Define Color Preset Consts <!-- id: 511 -->
  - [x] Create `src/features/wizard/constants/presets.ts` with hex codes for the 4 themes.
- [x] Implement `StyleStep` UI <!-- id: 512 -->
  - [x] Create `src/features/wizard/components/steps/style-step.tsx`.
  - [x] Build the selection grid for the 4 presets.
  - [x] Implement active state styling (Lagos Luxury depth).
- [x] Connect Selection to Store <!-- id: 513 -->
  - [x] Update `useWizardStore` to store the selected preset.
  - [x] Ensure the preview frame reacts to the store change.
- [x] Verify Implementation <!-- id: 514 -->
  - [x] Test switching between presets.
  - [x] Verify CSS variables or classes are correctly applied in the preview.

## Dev Notes

- **Implementation Choice**: Used CSS variables (`--primary`, `--accent`, etc.) injected into the template's HTML shell.
- **Presets**:
  - Executive Navy: Rich blues and subtle gold trust signals.
  - Growth Green: Vibrant forest greens for "New Development" vibes.
  - Luxury Onyx: Dark mode/Metallic textures for ultra-high-end (Black #111111, Gold #D4AF37).
  - Urgency Red: High-contrast accents for "Limited Time" offers.

### Project Structure Notes

- Feature: `src/features/wizard`
- Component: `src/features/wizard/components/steps/style-step.tsx`
- Store: `src/features/wizard/store/wizard-store.ts`
- Constants: `src/features/wizard/constants/presets.ts`

### References

- [PRD: Layout & Aesthetics](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/prd.md#L35)
- [Design Compact: Nigeria-First](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/design-compact.md)

## Dev Agent Record

### Agent Model Used

Antigravity (Gemini 2.0 Pro)

### Debug Log References

### Completion Notes List

- [x] Created `src/features/wizard/constants/presets.ts` with 4 luxury Nigerian themes.
- [x] Implemented `StyleStep` component with Framer Motion animations and preset previews.
- [x] Updated `useWizardStore` to track `stylePreset`.
- [x] Enhanced `renderTemplateToHtml` to inject CSS variables and Tailwind colors for theme support.
- [x] Verified with unit tests in `__tests__/components/wizard/style-step.test.tsx`.
- [x] **Adversarial Code Review Fixes**:
  - [x] Added `use client` justification comment.
  - [x] Implemented **Asymmetric Grid** (7/5 split) per Design Compact.
  - [x] Enhanced **Accessibility** (ARIA roles/labels for palettes).
  - [x] Replaced hardcoded fallback with `DEFAULT_STYLE_PRESET`.
  - [x] Added **Depth & Shadows** to trust signals for Lagos Luxury feel.
  - [x] Improved **Type Safety** for style presets in the store.
  - [x] Switched to robust `data-testid` selectors for tests.

### File List

- `src/features/wizard/constants/presets.ts`
- `src/features/wizard/store/wizard-store.ts`
- `src/features/wizard/components/steps/style-step.tsx`
- `src/lib/templates/types.ts`
- `src/lib/templates/renderer.tsx`
- `src/app/wizard/page.tsx`
- `__tests__/components/wizard/style-step.test.tsx`
