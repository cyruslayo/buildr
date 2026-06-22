## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2024-05-22 - [Standardized Sidebar Tooltips & Accessibility]
**Learning:** When collapsing a navigation sidebar to an icon-only state, tooltips must be standardized (e.g., using Radix UI) for consistency. Icon-only interactive elements MUST have explicit `aria-label` attributes. If using a non-interactive element as a tooltip trigger (like a `div` avatar), ensure it is focusable (`tabIndex={0}`) and has visible focus states for keyboard accessibility.
**Action:** Use the project's Radix-based `Tooltip` component with `delayDuration={0}` for navigation. Always verify keyboard focusability for all tooltip triggers.
