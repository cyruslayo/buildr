## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-05-16 - [Standardized Character Counters]
**Learning:** Textarea character counters should be standardized across the app with a 2,000-character limit, using `aria-live="polite"` and visual cues: `text-amber-500` at 80% and `text-destructive` at 90% capacity. This ensures consistent feedback and accessibility for long-form inputs.
**Action:** Apply the `absolute bottom-4 right-5` positioning with `pb-12` padding on the parent textarea to ensure the counter is always visible and doesn't obscure user input.
