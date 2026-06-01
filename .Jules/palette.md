## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-05-15 - [Magnitude Confirmation for Currency]
**Learning:** In markets with high-value currency denominations (like Nigeria), users frequently make "zero-count" errors. Providing a real-time, human-readable magnitude confirmation (e.g., "150 Million Naira") directly below the numeric input significantly increases confidence and reduces entry errors.
**Action:** Use the `formatPriceInWords` utility and `aria-live="polite"` for any large currency inputs in the wizard or dashboards.
