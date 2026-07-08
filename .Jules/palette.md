## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-05-16 - [Standardized Tooltips & Sidebar Accessibility]
**Learning:** Custom CSS-based tooltips in a collapsed sidebar often fail accessibility standards (keyboard focus, screen reader announcements). Standardizing on Radix-based tooltips with `delayDuration={0}` provides a snappy UX while ensuring interactive elements have explicit `aria-label` attributes for screen readers in icon-only states.
**Action:** Use the project's standardized `Tooltip` component for all icon-only interactive elements and ensure `aria-label` is dynamically applied when text labels are hidden.
