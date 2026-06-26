## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2026-06-26 - [Standardized Sidebar Tooltips & Accessibility]
**Learning:** Collapsed sidebars must provide immediate visual feedback (tooltips) and clear semantic identification (aria-labels) for icon-only actions to remain accessible and intuitive. Non-interactive triggers (like an avatar div) require proper focus management (tabIndex, focus-visible) and ARIA roles (role="img").
**Action:** Use standardized Radix tooltips with zero delay for sidebar navigation and ensure all icon-only buttons have descriptive aria-labels.
