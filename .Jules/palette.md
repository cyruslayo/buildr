## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-05-16 - [Real-time Numeric Confirmation with Shorthand Labels]
**Learning:** For inputs involving large numeric values (e.g., currency), providing a real-time, human-readable shorthand (e.g., "150 Million Naira") significantly reduces cognitive load and errors.
**Action:** Implement shorthand formatters for high-value numeric inputs to provide immediate visual confirmation. Use `framer-motion` for smooth transitions between value changes to make the feedback feel less jarring.
