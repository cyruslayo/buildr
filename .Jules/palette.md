## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-05-20 - [Standardized Sidebar Tooltips]
**Learning:** For collapsed sidebars, standardizing tooltips using the Radix `Tooltip` component with `delayDuration={0}`, `side="right"`, and `sideOffset={10}` provides a snappy, accessible experience that aligns with the Lagos Luxury design system.
**Action:** Use the `Tooltip` component for all icon-only interactive elements in sidebars, ensuring `asChild` is used on the trigger to preserve button/link styles.
