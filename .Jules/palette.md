## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-05-20 - [Unified Accessible Tooltips in Collapsible Sidebar]
**Learning:** Collapsible sidebars often suffer from poor keyboard focusability and lack of tooltip feedback when collapsed to an icon-only state. Custom hover-based CSS tooltips fail WCAG accessibility standards as they don't respond to keyboard focus.
**Action:** Implement a unified `CollapsibleTooltip` wrapper using Radix `Tooltip` primitives. Apply `tabIndex={0}` and `focus-visible:ring-2` to non-interactive elements (like user profile avatars) to make them fully keyboard focusable and accessible.
