## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-05-16 - [Immediate Feedback for Large Numeric Inputs]
**Learning:** In the Nigerian real estate market, where prices often reach hundreds of millions or billions of Naira, providing an immediate human-readable shorthand (e.g., "150 Million Naira") below the numeric input significantly reduces "zero-counting" errors and improves user confidence.
**Action:** For all large numeric currency inputs, implement a live shorthand formatter that updates as the user types, using smooth transitions (like Framer Motion) to make the feedback feel like a first-class part of the interaction.
