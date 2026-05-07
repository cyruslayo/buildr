## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-05-16 - [Accessible Names in Collapsed States]
**Learning:** Collapsing a navigation sidebar to an icon-only state removes the visual text labels, which often means screen readers lose the accessible name of the links if they were relying on the internal span.
**Action:** Always provide an explicit `aria-label` on the `Link` or `button` when labels are visually hidden, ensuring the component remains accessible.
