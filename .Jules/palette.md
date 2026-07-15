## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2026-07-15 - [Dashboard Sidebar Tooltips & Accessibility]
**Learning:** In a collapsed sidebar state, icon-only buttons MUST have explicit `aria-label` attributes and Radix-based `Tooltip` components with `delayDuration={0}` to ensure immediate feedback and screen reader accessibility. Non-interactive elements like avatars should be made focusable with `tabIndex={0}` and `focus-visible` styles to ensure keyboard users can trigger the tooltip.
**Action:** Apply `Tooltip` and `aria-label` to all icon-only interactive elements and ensure all sections of the navigation are keyboard-navigable.
