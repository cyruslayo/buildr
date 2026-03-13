## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-05-20 - [Real-time Input Validation Shorthand]
**Learning:** For inputs involving large numbers (e.g., Nigerian property prices in Millions/Billions), users often struggle to visually parse the magnitude of zeros. Providing a real-time, human-readable "shorthand" label (e.g., "150 Million Naira") immediately below the input dramatically improves confidence and reduces errors.
**Action:** Implement shorthand formatters for high-magnitude numeric inputs and use smooth entry/exit transitions (like `framer-motion`'s `AnimatePresence`) to provide non-disruptive, "living" feedback.
