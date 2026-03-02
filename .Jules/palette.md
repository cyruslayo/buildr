## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-05-15 - [Currency Shorthand Confirmation]
**Learning:** In markets with high-denomination currencies (like Nigerian Naira), users often struggle to count zeros in large numbers (e.g., 150,000,000). Providing an immediate, human-readable shorthand (e.g., "150 Million Naira") directly below the input field significantly reduces data-entry errors and improves confidence.
**Action:** Always include a shorthand confirmation for large numeric inputs, especially for prices and budget fields.
