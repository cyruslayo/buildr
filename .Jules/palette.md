## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-05-16 - [Currency Magnitude Labels]
**Learning:** High-value currency inputs (like Naira) are prone to "zero-counting" errors. Providing a human-readable magnitude label (e.g., "150 Million") beneath the numeric input significantly improves confidence and reduces entry errors. Using a rounding threshold (e.g., 999,950) ensures clean rollovers.
**Action:** Implement dynamic magnitude labels for large numeric inputs in fixed-height containers to prevent layout shifts.
