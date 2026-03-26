## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-05-16 - [Real-time Currency Magnitude Confirmation]
**Learning:** For markets with high-value denominations (like Nigeria), users often struggle to count zeros in large numeric inputs (e.g., 150,000,000). Providing a real-time human-readable shorthand (e.g., "150 Million Naira") directly below the input significantly reduces cognitive load and prevent input errors.
**Action:** Implement `formatCurrencyShorthand` with `aria-live="polite"` for any "Big Input" currency fields to provide immediate magnitude confirmation. Use `framer-motion` for smooth transitions between magnitudes to make the UI feel responsive and "alive".
