## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-05-16 - [Accessible Sidebar Collapsed State]
**Learning:** When collapsing a sidebar to an icon-only state, ensure interactive elements have explicit `aria-label` attributes reflecting their text content. Standardize tooltips using Radix-based components instead of custom CSS to ensure proper positioning and lifecycle. Non-interactive elements (like user avatars) must have `tabIndex={0}` and focus-visible styles to be keyboard-accessible.
**Action:** Always verify that every icon-only button has an `aria-label` and a corresponding `Tooltip`. Use `delayDuration={0}` for navigation sidebars to keep the interface feeling snappy.
