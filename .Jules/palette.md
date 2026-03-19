## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-05-20 - [Real-time Input Feedback & Numeric Magnitude]
**Learning:** For large numeric inputs (like property prices), users often lose track of zeros. Providing a real-time, human-readable shorthand (e.g., "1.5 Million") below the input provides immediate visual confirmation and reduces cognitive load. Using `framer-motion` for transitions makes this feedback feel integrated rather than jarring.
**Action:** Implement shorthand magnitude previews for large numeric fields. Use `aria-live="polite"` to ensure accessibility for screen readers.
