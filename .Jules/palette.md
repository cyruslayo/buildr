## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-05-20 - [Real-time Currency Magnitude Confirmation]
**Learning:** In markets with large currency denominations (like Nigeria), users often struggle to visually parse the correct number of zeros in large inputs (e.g., distinguishing 15,000,000 from 150,000,000).
**Action:** Provide a human-readable magnitude confirmation (e.g., "150 million Naira") using `aria-live="polite"` below large currency inputs to reduce entry errors and increase user confidence.
