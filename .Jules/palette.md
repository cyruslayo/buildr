## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2026-05-16 - [Real-time Price Magnitude Confirmation]
**Learning:** For high-value currency inputs (like Nigerian Real Estate), users often struggle with "zero-counting" (e.g., distinguishing 10,000,000 from 100,000,000). Providing a real-time, natural language magnitude confirmation (e.g., "100 million Naira") significantly reduces cognitive load and input errors.
**Action:** Use `Intl.NumberFormat` with `notation: 'compact'` and `compactDisplay: 'long'` to provide these confirmations. Always pair with `aria-live="polite"` and `aria-describedby` for accessibility.
