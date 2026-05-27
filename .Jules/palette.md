## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-05-16 - [Real-time Magnitude Confirmation]
**Learning:** In markets with high-value currency (like Nigeria), users often struggle with "zero-counting" when entering large numbers (e.g., 150,000,000). Providing a real-time, human-readable confirmation (e.g., "150 million Naira") significantly reduces cognitive load and entry errors.
**Action:** Use `Intl.NumberFormat` with `notation: 'compact'` and `compactDisplay: 'long'` to provide immediate verbal feedback below large numeric inputs. Ensure the feedback is accessible via `aria-live="polite"`.
