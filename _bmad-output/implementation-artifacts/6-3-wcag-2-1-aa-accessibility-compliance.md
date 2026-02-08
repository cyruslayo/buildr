# Story 6.3: WCAG 2.1 AA Accessibility Compliance

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a user with accessibility needs,
I want the app to be fully keyboard navigable and screen-reader friendly,
so that I can use Buildr regardless of disability.

## Acceptance Criteria

1. **Clearly Visible Focus States**: All interactive elements (buttons, inputs, chips, cards) MUST have a clearly visible focus state using `ring-2 ring-ring ring-offset-2` when navigated via keyboard.
2. **Color Contrast (AA Standard)**: All text elements MUST meet WCAG 2.1 AA contrast ratios (4.5:1 for normal text, 3:1 for large text). Verified for "Executive Navy", "Growth Green", "Luxury Onyx", and "Urgency Red" presets.
3. **Descriptive Alt Text**: All images in templates (Hero, Gallery) MUST have descriptive alt text. Fallback to `"Property image of {{title}} at {{location}}"` if specific alt is missing.
4. **Accessible Form Controls**: All wizard input fields MUST have associated `<label>` elements or robust `aria-labelledby` bindings.
5. **Keyboard Navigable Wizard**: Users MUST be able to complete the entire wizard loop (Title -> Price -> Location -> Amenities -> Photos -> Style -> Publish) using only `Tab`, `Space`, and `Enter`.

## Tasks / Subtasks

- [x] **Infrastructure: Focus Ring Standardization** (AC: 1)
  - [x] Update `src/components/ui/button.tsx` to include `focus-visible:ring-2 focus-visible:ring-offset-2`.
  - [x] Update `src/components/ui/input.tsx` to include `focus-visible:ring-2 focus-visible:ring-offset-2`.
  - [x] Update `src/features/wizard/components/big-input.tsx` to include `focus:ring-2 focus:ring-ring focus:ring-offset-2`.
- [x] **Wizard: Accessible Form Labels** (AC: 4, 5)
  - [x] Review `src/features/wizard/components/steps/*.tsx` and ensure every `Input` or `BigInput` has an associated `<Label>` (use shadcn/ui Label).
  - [x] Link labels to inputs using `htmlFor` and `id`.
  - [x] Verify `AmenitiesPicker` chips are `button` or `input[type="checkbox"]` based for keyboard accessibility.
- [x] **Templates: Alt Text & Contrast Audit** (AC: 2, 3)
  - [x] Update `src/components/templates/*.tsx` to ensure `CldImage` alt text is descriptive.
  - [x] Verify that `accent` colors from `STYLE_PRESETS` are not used for pure text on light backgrounds (since most fail < 4.5:1).
- [x] **Verification: Keyboard Walkthrough**
  - [x] Perform a full wizard run using only keyboard.
  - [x] Run an automated accessibility audit (e.g., Axe-core) on a published page.

## Dev Notes

### Architecture Compliance
- **Radix Primitives**: Continue using `shadcn/ui` based on Radix as they provide the foundation for ARIA compliance.
- **Walled Garden Contrast**: The presets in `src/features/wizard/constants/presets.ts` are mostly safe for primary text, but `accent` colors are for decorative elements/icons only.

### Source Components to Touch
- `src/components/ui/button.tsx`
- `src/components/ui/input.tsx`
- `src/features/wizard/components/big-input.tsx`
- `src/features/wizard/components/steps/*.tsx`
- `src/components/templates/*.tsx`

### Accessibility Standards
- **NFR8**: All generated templates must pass WCAG 2.1 AA by default.
- **Contrast Check**:
  - Gold Accent (`#EAB308`): Only use on dark backgrounds (Executive Navy Primary) or as small icons/borders. NEVER as text on White.
  - Emerald Accent (`#10B981`): Only on dark backgrounds.

### Previous Story Intelligence (6.2)
- Story 6.2 successfully refactored to SSR. Ensure that the server-rendered HTML contains the correct ARIA landmarks (`<main>`, `<nav>`, etc.).

## Dev Agent Record

### Agent Model Used

Antigravity v1 (Dev-Story Workflow)

### Implementation Plan

1.  **Standardize Focus Rings**: Updated `Button`, `Input`, and `BigInput` to use `ring-2` and `ring-offset-2`.
2.  **Accessible Labels**: Refactored `TitleStep`, `PriceStep`, and `LocationStep` to include `<Label>` elements with linked `id`s.
3.  **Template Alt Text**: Standardized descriptive alt text fallback logic across all listing templates.
4.  **ARIA Landmarks**: Wrapped the public property page in a `<main>` tag for accessibility.

### File List

- `src/components/ui/button.tsx` - Added `focus-visible:ring-2 focus-visible:ring-offset-2`
- `src/components/ui/input.tsx` - Added `focus-visible:ring-2 focus-visible:ring-offset-2`
- `src/features/wizard/components/big-input.tsx` - Added `focus-visible:ring-2 focus-visible:ring-offset-2` and `id` prop
- `src/features/wizard/components/steps/title-step.tsx` - Added `<Label>` with `htmlFor`/`id` linking
- `src/features/wizard/components/steps/price-step.tsx` - Added `<Label>` with `htmlFor`/`id` linking
- `src/features/wizard/components/steps/location-step.tsx` - Added `<Label>` with `htmlFor`/`id` linking
- `src/components/templates/luxury-listing-1.tsx` - Descriptive alt text fallback
- `src/components/templates/standard-listing.tsx` - Descriptive alt text fallback
- `src/components/templates/land-sale.tsx` - Descriptive alt text fallback
- `src/components/templates/offplan-estate.tsx` - Descriptive alt text fallback
- `src/components/templates/shortlet-apartment.tsx` - Descriptive alt text fallback
- `src/components/templates/agent-bio.tsx` - Descriptive alt text fallback
- `src/app/p/[slug]/page.tsx` - Added `<main>` ARIA landmark
- `__tests__/accessibility/focus-rings.test.tsx` - Unit tests for focus ring classes

### Completion Notes List

- All interactive focus states are now high-visibility (WCAG AA).
- All wizard form fields are properly labeled for screen readers.
- Property templates dynamically generate descriptive alt text based on property metadata.
- Unit tests verify the presence of required focus ring classes.

## Change Log

- 2026-01-17: Implemented focus standardisation, wizard labels, and descriptive alt text. (Status -> review)
- 2026-01-17: Code Review fixes: Standardized `focus-visible:ring` across all components, added explicit type annotations, updated agent-bio alt text, added File List. (Status -> done)
