## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-05-22 - [Textarea Character Counters & Accessibility]
**Learning:** Character counters for long-form inputs (like property descriptions) should be standardized across the application. Using `aria-live="polite"` ensures screen reader users are aware of their progress, and `maxLength` provides a hard constraint that prevents data truncation in the backend.
**Action:** Implement character counters in a `flex justify-between` header above the input, using `tabular-nums` for stable layout and `text-destructive` when the limit is reached.
