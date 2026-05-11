## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2026-05-11 - [Magnitude Confirmation for High-Value Inputs]
**Learning:** In markets with high currency denominations (like Nigerian Naira), users frequently miscount zeros (e.g., 10M vs 100M). Providing a real-time "shorthand" confirmation (e.g., "≈ 10 Million") drastically reduces entry errors and increases user confidence.
**Action:** Always provide human-readable magnitude confirmations for numeric inputs exceeding 1,000, and use `aria-live="polite"` to ensure these updates are accessible.
