## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-05-16 - [Accessible Sidebar Tooltips]
**Learning:** When collapsing a navigation sidebar to an icon-only state, tooltips alone are insufficient for accessibility. Interactive elements must also have explicit `aria-label` attributes to ensure screen readers can identify the destination/action, as the visual text labels are often hidden via conditional rendering or CSS.
**Action:** Use Radix UI Tooltip components for visual hints and pair them with `aria-label` on the trigger element (Link/button) when in a collapsed state.
