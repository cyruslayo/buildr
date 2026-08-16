## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2026-03-31 - Overlay Control Focus Visibility
**Learning:** Controls hidden by default inside card or image overlays using `opacity-0 group-hover:opacity-100` remain completely invisible when focused by keyboard users unless `focus-visible:opacity-100` and clear focus rings are explicitly applied.
**Action:** Always combine `group-hover:opacity-100` with `focus-visible:opacity-100` and visible focus ring styling on overlay action buttons to maintain keyboard accessibility (WCAG 2.4.7).
