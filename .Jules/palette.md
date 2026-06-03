## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2026-06-03 - [Standardizing Tooltips & Sidebar Accessibility]
**Learning:** Replacing custom CSS-based tooltips with the project's Radix-based `Tooltip` component ensures better accessibility (keyboard support) and consistent visual presentation. When a sidebar collapses to icon-only buttons, providing explicit `aria-label` attributes on the interactive elements is critical for screen reader users, as the hidden text spans are no longer sufficient.
**Action:** Use Radix `Tooltip` for all icon-only interactive elements and ensure `aria-label` matches the tooltip content.
