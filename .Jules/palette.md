## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-05-16 - [Magnitude Confirmation UX]
**Learning:** For currency inputs with large numbers (like Nigerian Naira), users often struggle with "zero-counting". Providing a real-time, human-readable shorthand (e.g., "1.5 Million") significantly reduces errors and increases confidence.
**Action:** Implement a `formatCurrencyShorthand` utility and display it with a subtle entry/exit animation (using `AnimatePresence` with `mode="popLayout"`) below large numeric inputs to provide instant feedback without disrupting layout flow.
