# Story 2.4: Property Details Entry (Spacious Mode)

Status: done

## Story

**As a** real estate agent,
**I want** to enter high-value fields (Price, Location, Title) with focused, spacious inputs,
**so that** I don't make costly typos on critical data and my listings look professional.

## Acceptance Criteria

1. [x] **AC1: BigInput Component (UX3)**
   - Given I am on the "Price", "Location", or "Title" step
   - When the step loads
   - Then I see a single `BigInput` field (42px font, border-bottom only), centered and focused
2. [x] **AC2: Price Step (Nigerian Market Validation)**
   - Given I am on the "Price" step
   - Then the currency prefix "₦" is displayed and non-editable
   - When I type numbers
   - Then the value auto-formats with thousands separators (e.g., "150,000,000") using `Intl.NumberFormat("en-NG")`
3. [x] **AC3: Optimistic Navigation (AR5)**
   - Given I enter valid data
   - When I click "Continue"
   - Then the transition happens immediately without blocking spinners
4. [x] **AC4: Persistence (AR1)**
   - Given I enter data
   - Then it is immediately saved to `localStorage` via the Zustand store

## Tasks / Subtasks

- [x] **Task 1: Implement `BigInput` Component**
  - [x] Create `src/features/wizard/components/big-input.tsx`
  - [x] Style with 42px font and border-bottom only per [UX3](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/epics.md#L86)
- [x] **Task 2: Implement Formatting Utility**
  - [x] Verify/Extend `src/lib/formatters.ts` for raw-to-formatted currency conversion
- [x] **Task 3: Create Step Components**
  - [x] Create `src/features/wizard/components/steps/title-step.tsx`
  - [x] Create `src/features/wizard/components/steps/location-step.tsx`
  - [x] Create `src/features/wizard/components/steps/price-step.tsx`
- [x] **Task 4: Integrate into Wizard Page**
  - [x] Replace placeholders in `src/app/wizard/page.tsx` with new step components
  - [x] Ensure `useWizardStore` fields (`title`, `location`, `price`) are bound correctly
- [x] **Task 5: Verification**
  - [x] Add unit test for currency formatter
  - [x] Add E2E test for price input formatting (`__tests__/e2e/wizard-inputs.spec.ts`)

## Dev Notes

- **Hybrid State:** Use `useWizardNavigation` for step routing and `useWizardStore` for data persistence.
- **Asymmetry is Law:** Ensure the `BigInput` placement follows [The Design Compact](file:///c:/AI2025/buildr/docs/design-compact.md).
- **Nigeria-First:** Ensure currency is ALWAYS Naira (₦).

### Project Structure Notes

- Alignment with `src/features/wizard/components/steps/` for co-location of step-specific UI.
- Naming convention: Verb-Subject (e.g., `updatePropertyData`).

### References

- [Architecture Decision Document](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/architecture.md)
- [Project Context Rules](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/project-context.md)
- [The Design Compact](file:///c:/AI2025/buildr/docs/design-compact.md)

## Dev Agent Record

### Agent Model Used

Antigravity (Google Deepmind)

### Completion Notes List

- Ultimate context engine analysis completed - comprehensive developer guide created.
- Integrated Lagos Luxury and 3G Performance requirements.
- Implemented `BigInput` and integrated `Title`, `Location`, and `Price` steps.
- Verified auto-formatting and persistence via Playwright E2E (manual) and Jest tests.
- **[ADVERSARIAL REVIEW FIXED]**: Corrected mobile font size overflow (fluid text-size).
- **[ADVERSARIAL REVIEW FIXED]**: Added `aria-label` and `data-testid` for a11y and testing robustness.
- **[ADVERSARIAL REVIEW FIXED]**: Refactored formatters to remove duplication and improved numeric parsing.
- **[ADVERSARIAL REVIEW FIXED]**: Added input sanity checks (max-length) for price field.
- **[ADVERSARIAL REVIEW FIXED]**: Staged all changes in Git (full hygiene compliance).

### File List

- `src/features/wizard/components/big-input.tsx`
- `src/features/wizard/components/steps/title-step.tsx`
- `src/features/wizard/components/steps/location-step.tsx`
- `src/features/wizard/components/steps/price-step.tsx`
- `src/features/wizard/hooks/use-wizard-navigation.ts` (Modified)
- `src/app/wizard/page.tsx` (Modified)
- `src/lib/formatters.ts` (Modified)
- `__tests__/components/big-input.test.tsx` (Modified)
- `__tests__/lib/formatters.test.ts`
- `__tests__/e2e/wizard-inputs.spec.ts`
