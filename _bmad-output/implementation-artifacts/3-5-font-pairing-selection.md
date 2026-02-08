# Story 3.5: Font Pairing Selection

Status: done

## Story

As an agent,
I want to select from predefined typography pairs,
so that my listing has consistent, readable fonts that match my agency's brand.

## Acceptance Criteria

1. **Font Pairing Options**: Given I am on the "Style" step of the wizard, When I view font options, Then I can choose from 4 predefined luxury font pairings (e.g., Classic Luxury, Modern Minimal, Estate Bold, Clean Geometric). ([Epic 3.5](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/epics.md#L433))
2. **Consistent Application**: Given I select a font pairing, When I preview my listing, Then the fonts are applied consistently across all headings (display) and body text (body).
3. **Walled Garden Enforcement**: Given I am on the Style step, When I look for custom font loading or selection, Then only the predefined pairings are available. (Constraint: Nigeria-First Design Guardrails)
4. **Performance (3G)**: Given a selected font pairing, When the listing is rendered, Then the system includes the necessary Google Font preconnect and link tags to ensure fast loading on 3G (under 5s TTI). (NFR1)

## Tasks / Subtasks

- [x] Define Font Pairing Constants <!-- id: 520 -->
  - [x] Create `src/features/wizard/constants/fonts.ts` defining the 4 pairings with Google Font import URLs and Tailwind font-family tokens.
- [x] Implement Font Selection UI in `StyleStep` <!-- id: 521 -->
  - [x] Add a "Typography" section to `src/features/wizard/components/steps/style-step.tsx`.
  - [x] Build a selection group for the 4 font pairings with visual previews of each font.
- [x] Connect Selection to Store <!-- id: 522 -->
  - [x] Update `PropertyData` in `src/lib/templates/types.ts` to include `fontPairing`.
  - [x] Update `useWizardStore` to handle `fontPairing` state updates.
- [x] Update Rendering Pipeline <!-- id: 523 -->
  - [x] Modify `src/lib/templates/renderer.tsx` to dynamically inject the correct Google Font `<link>` and update the Tailwind font configuration based on `fontPairing`.
- [x] Verify Implementation <!-- id: 524 -->
  - [x] Create unit tests in `__tests__/components/wizard/font-selection.test.tsx`.
  - [x] Verify font application in the live preview frame.
- [x] Review Follow-ups (AI) <!-- id: 525 -->
  - [x] [AI-Review][Critical] Fix store reset regression (defaults restored)
  - [x] [AI-Review][Medium] Delete abandoned ghost store file
  - [x] [AI-Review][Medium] Sanitize renderer casts with safe fallbacks
  - [x] [AI-Review][Medium] Strengthen unit tests for exclusivity
  - [x] [AI-Review][Medium] Decouple layout config from renderer shell
  - [x] [AI-Review][Low] Refine UI component justifications
  - [x] [AI-Review][Low] Update story file list with tailwind config

## Dev Notes

- **Proposed Pairings**:
  1. **Classic Luxury**: `Fraunces` (Display) + `Space Grotesk` (Body).
  2. **Modern Minimal**: `Inter` (Display) + `Inter` (Body).
  3. **Estate Bold**: `Montserrat` (Display) + `Roboto` (Body).
  4. **Clean Geometric**: `Outfit` (Display) + `Plus Jakarta Sans` (Body).
- **Implementation Strategy**: Similar to color presets, use CSS variables or Tailwind font-family tokens injected into the template shell.
- **Reference**: [UX Design: Typography as UI](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/ux-design-specification.md#L121)

## Dev Agent Record

### Agent Model Used

Antigravity (Gemini 2.0 Pro)

### Debug Log References

### Completion Notes List

- [Story 3.5] Implemented luxury font pairings with dynamic Google Font injection.
- [AI-Review] Fixed state regression in resetWizard where defaults were lost.
- [AI-Review] Removed duplicate store file in `src/lib/stores/wizard-store.ts`.
- [AI-Review] Strengthened renderer types and decoupled layout configuration.

### File List

- `src/features/wizard/constants/fonts.ts` [NEW]
- `src/features/wizard/components/steps/style-step.tsx` [MODIFY]
- `src/features/wizard/store/wizard-store.ts` [MODIFY]
- `src/lib/templates/types.ts` [MODIFY]
- `src/lib/templates/renderer.tsx` [MODIFY]
- `tailwind.config.ts` [MODIFY]
- `__tests__/components/wizard/font-selection.test.tsx` [NEW]

## Senior Developer Review (AI)

**Outcome**: Approved with fixes
**Total Resolved**: 7/7 items
**Breakdown**: 1 Critical, 4 Medium, 2 Low

### Action Items
- [x] Fix store reset regression
- [x] Delete abandoned ghost store file
- [x] Sanitize renderer casts
- [x] Strengthen unit tests
- [x] Decouple layout config
- [x] Refine UI justifications
- [x] Update documentation
