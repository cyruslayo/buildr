## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-05-20 - [Real-time Magnitude Confirmation UX]
**Learning:** For large currency inputs (like Nigerian Naira prices), real-time shorthand confirmation (e.g., "1.6 Million") significantly reduces cognitive load and prevent "fat-finger" errors. Rounding to the nearest decimal is more intuitive than truncation for these confirmations.
**Action:** Use `Math.round(x * 10) / 10` for currency shorthands. Prefer CSS-based animations (like Tailwind's `animate-in`) over heavy libraries like `framer-motion` for simple feedback labels to keep the bundle size small and maintenance low.
