# Story 2.5: Amenities & Description Entry (Dense Mode)

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a real estate agent,
I want to select property amenities from a dense list and write a detailed description in a standard text area,
so that I can provide comprehensive property information without the high-visual-weight of Spacious Mode.

## Acceptance Criteria

1. **Amenities Step (AC-1)**:
   - Provide a grid-based selection of common Nigerian property amenities (e.g., Borehole, Swimming Pool, BQ, CCTV, Electricity, 24/7 Security).
   - The UI should be "dense" (multi-column grid) compared to the "Spacious Mode" used in previous steps.
   - Selection state must be persisted in the `wizard-store`.

2. **Description Step (AC-2)**:
   - Provide a standard `textarea` for a detailed property description.
   - Label it clearly (e.g., "Describe the property").
   - Support multiline input and show a placeholder with realistic Nigerian context (e.g., "This stunning duplex in Lekki features...").
   - Persist the value in `propertyData.description`.

3. **Wizard Integration (AC-3)**:
   - Add the two new steps to the `WizardShell` navigation.
   - Ensure the "Next" button in `PriceStep` leads to `AmenitiesStep`.
   - Ensure the "Next" button in `AmenitiesStep` leads to `DescriptionStep`.

4. **Nigeria-First Alignment (AC-4)**:
   - Use Nigerian terminology for amenities (e.g., "BQ", "Borehole").
   - Description placeholder should reference premium Nigerian areas (Ikoyi, Victoria Island) to guide the user.

## Tasks / Subtasks

- [x] Define `AmenitiesStep` component (AC: 1)
  - [x] Implement multi-column checkbox grid for amenities
  - [x] Connect to `useWizardStore`
- [x] Define `DescriptionStep` component (AC: 2)
  - [x] Implement `textarea` with consistent styling
  - [x] Connect to `useWizardStore`
- [x] Update `WizardShell` to include new steps (AC: 3)
  - [x] Add steps to the navigation array
  - [x] Update total step count display
- [x] Add TDD unit tests for new components (AC: 1, 2)
  - [x] Verify amenities selection updates store
  - [x] Verify description input updates store

## Dev Notes

- **Dense Mode vs. Spacious Mode**: Unlike `BigInput`, these components should follow a more standard document-flow layout to accommodate larger lists and bodies of text.
- **Store Updates**: Use `updatePropertyData({ amenities: string[] })` and `updatePropertyData({ description: string })`.
- **Styling**: Utilize `shadcn/ui` components (`Checkbox`, `Textarea`, `Label`) for a premium look with Lagos Luxury aesthetics.

### Project Structure Notes

- New files should be colocated in `src/features/wizard/components/steps/`.
- `amenities-step.tsx`
- `description-step.tsx`

### References

- [Source: docs/project-docs/17-WIZARD-UI-SPEC.md] (Implicit architecture)
- [Source: docs/project-docs/09-GUIDED-PROMPT-FLOW.md] (Navigation logic)

## Dev Agent Record

### Agent Model Used

Antigravity (Gemini 2.0 Flash Thinking)

### Debug Log References

### Completion Notes List
- Successfully implemented both Steps with full TDD coverage.
- Integrated into the App Router wizard page.
- Verified state persistence in Zustand store.

### File List
- `src/features/wizard/components/steps/amenities-step.tsx`
- `src/features/wizard/components/steps/description-step.tsx`
- `src/features/wizard/hooks/use-wizard-navigation.ts`
- `src/app/wizard/page.tsx`
- `__tests__/components/wizard/amenities-step.test.tsx`
- `__tests__/components/wizard/description-step.test.tsx`

## Senior Developer Review (AI)

**Review Date:** 2026-01-12
**Review Outcome:** Changes Requested
**Summary:** Implementation is functional and follows the tech stack, but contains a critical event-bubbling bug in the amenities selection and misses a specific location-based AC requirement.

### Action Items

- [x] **[AI-Review][CRITICAL] Double-Toggle Event Bubbling**: Clicking a checkbox in `AmenitiesStep` triggers `toggleAmenity` twice (once from the parent `div.onClick` and once from `Checkbox.onCheckedChange`).
- [x] **[AI-Review][HIGH] Missing AC Requirement (AC-4)**: Placeholder in `DescriptionStep` must mention "Ikoyi, Victoria Island" as per AC-4, but currently only mentions "Lekki Phase 1".
- [x] **[AI-Review][MEDIUM] Hardcoded Constants**: `NIGERIAN_AMENITIES` should be moved to a shared constants/lib file for reuse in templates.
- [x] **[AI-Review][MEDIUM] Performance (Keystroke Lag)**: `DescriptionStep` updates the global store on every keystroke. For large descriptions, this may cause lag. Recommendation: Use debounced updates or `onBlur`.
- [x] **[AI-Review][LOW] ID Sanitation**: Amenity IDs for checkboxes contain spaces (e.g., `id="Swimming Pool"`). Recommend slugifying IDs for better HTML standards.
- [x] **[AI-Review][LOW] Redundant Cursors**: `cursor-pointer` is applied to both the group wrapper and individual labels; clean up for leaner CSS.

### Review Follow-ups (AI)

- [x] [AI-Review][CRITICAL] Resolve double-toggle bubbling in `src/features/wizard/components/steps/amenities-step.tsx`
- [x] [AI-Review][HIGH] Update `DescriptionStep` placeholder with Ikoyi/VI locations
- [x] [AI-Review][MEDIUM] Move amenities to `src/features/wizard/constants/amenities.ts`
- [x] [AI-Review][MEDIUM] Implement debounced store updates for property description
