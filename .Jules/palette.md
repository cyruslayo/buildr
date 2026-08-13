## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-08-13 - [Radix Tooltips & Sidebar Keyboard Accessibility]
**Learning:** Standard tooltips must utilize Radix Tooltip UI components with `delayDuration={0}` for prompt feedback in highly interactive components like collapsed sidebars. When wrapping elements, ensure focus visual rings (`focus-visible:ring-2`) and clear `aria-label` descriptors are explicitly provided on the interactive triggers themselves to maintain strict web accessibility compliance.
**Action:** For collapsed icon-only buttons, map appropriate ARIA labels and focus wrappers, and always use standard Radix triggers for a snappy, cohesive UX.
