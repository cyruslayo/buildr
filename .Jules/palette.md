## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-05-22 - [Real-time Magnitude Confirmation]
**Learning:** In markets where large currency values are common (e.g., Nigerian Naira), users frequently make "digit-entry errors" (adding or missing a zero). Providing a human-readable text representation (e.g., "150 Million Naira") directly below the numeric input significantly increases user confidence and reduces data entry mistakes.
**Action:** Implement a `formatPriceInWords` utility and use `aria-live="polite"` to announce magnitude changes for large numeric inputs.
