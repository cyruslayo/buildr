## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-05-15 - [Real-time Currency Shorthand Preview]
**Learning:** For inputs involving large numbers (like real estate prices), users often struggle to visually verify the magnitude (e.g., distinguishing 10,000,000 from 100,000,000). A real-time shorthand preview (e.g., "10 Million Naira") significantly reduces cognitive load.
**Action:** Implement `formatCurrencyShorthand` with `aria-live="polite"` and smooth transitions (using `AnimatePresence`) for all high-value currency inputs to provide immediate, accessible confirmation.
