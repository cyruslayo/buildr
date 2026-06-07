## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-05-20 - [Standardized Character Counters]
**Learning:** Textarea character counters should follow a consistent threshold pattern: amber at 80% and destructive at 90% capacity. Absolute positioning of the counter requires corresponding bottom padding (e.g., `pb-12`) on the textarea to prevent text overlap.
**Action:** Apply `aria-live="polite"`, 80%/90% color thresholds, and `pb-12` when adding character counters to multi-line inputs.
