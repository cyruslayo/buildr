## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-05-22 - [Currency Shorthand for High-Value Markets]
**Learning:** In markets with high nominal values (like the Nigerian Naira where properties often cost hundreds of millions), users can easily lose track of zeros. Providing a real-time shorthand display (e.g., "150 Million Naira") below the numeric input significantly reduces cognitive load and prevents input errors.
**Action:** Always provide a human-readable shorthand for large numeric inputs in localized real estate applications.
