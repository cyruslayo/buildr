## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-05-20 - [Real-time Magnitude Confirmation]
**Learning:** For inputs handling large currency values (e.g., millions/billions in Naira), providing a real-time shorthand confirmation (e.g., "1.5 Million Naira") significantly reduces cognitive load and prevents common "extra zero" errors.
**Action:** Implement animated shorthand previews for large numeric fields to provide immediate, human-readable feedback.
