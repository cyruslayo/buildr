## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2026-07-18 - [Accessible Collapsed Sidebar Navigation]
**Learning:** When collapsing standard navigation elements into an icon-only format, replacing custom CSS-absolute tooltips with robust, Radix-based accessible tooltips provides proper keyboard focus, ARIA accessibility, and prevents viewport overflow issues. Non-interactive tooltip triggers (like user avatars) must also have explicit focus ring classes and `tabIndex={0}` to enable keyboard navigation, while avoiding `role="button"` anti-patterns.
**Action:** Always use the Radix `Tooltip` component on collapsed icon menus, specify `side="right" sideOffset={10}`, set `delayDuration={0}`, and ensure active element focus styling is consistently defined with Tailwind `focus-visible:` utilities.
