## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-05-16 - [Real-time Magnitude Confirmation]
**Learning:** Real-time feedback for large numeric inputs (e.g., price) significantly reduces cognitive load and errors. Use a human-readable shorthand (Millions, Billions) alongside the raw numeric input.
**Action:** For large financial or measurement inputs, implement a magnitude confirmation display with `aria-live="polite"` and smooth `framer-motion` transitions to confirm the intended scale (e.g., 150M vs 15M).
