## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-07-19 - [Accessible Collapsed Sidebars and Tooltips]
**Learning:** When collapsing a sidebar navigation to an icon-only state, all interactive and focusable elements must have explicit `aria-label` attributes corresponding to their textual representations. To standardize tooltips across the design system, Radix-based Tooltip components should be used with `delayDuration={0}` for a highly responsive feel, utilizing `side="right"` and `sideOffset={10}` layout settings to ensure perfect alignment.
**Action:** Always wrap icon-only collapsed sidebar links, buttons, and user avatars in standardized Radix-based Tooltip components, and add explicit keyboard focus visual outlines (`focus-visible:ring-2`).
