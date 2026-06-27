## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-05-16 - [Accessible Character Counters in Textareas]
**Learning:** Character counters should be semantically linked to their inputs using `aria-describedby` and provide real-time updates via `aria-live="polite"`. When using absolute positioning for the counter inside a relative container, the input needs sufficient padding (e.g., `pb-12`) to prevent text overlap.
**Action:** Implement character counters with `aria-describedby`, `aria-live`, and appropriate bottom padding on the input. Favor native `maxLength` for enforcement.
