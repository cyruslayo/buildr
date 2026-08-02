## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2026-08-02 - [Textarea Character Counter Overlap & Accessibility]
**Learning:** When adding an absolutely positioned character counter inside a `Textarea` or input component, the text input can overlap with the counter if the user types all the way to the bottom right. Linking the counter using `aria-describedby` and setting `aria-live="polite"` ensures that assistive technologies announce the counter's state correctly.
**Action:** Always wrap the input in a `relative` container, add a padding-bottom class (e.g., `pb-12`) to the `Textarea` to reserve space for the absolutely positioned counter, and associate them via `aria-describedby` with an `aria-live="polite"` announcer.
