## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-05-16 - [Real-time Magnitude Confirmation for Large Numbers]
**Learning:** In markets with high-denomination currencies (like Nigerian Naira), users frequently miscount zeros. Providing a human-readable shorthand (e.g., "150 Million") in real-time serves as a vital "sanity check" and prevents common input errors.
**Action:** Implement shorthand magnitude confirmations for large numeric inputs. Use `aria-live="polite"` for the confirmation text to ensure it's accessible to screen reader users without being disruptive.
