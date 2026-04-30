## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2026-04-30 - [Accessible Sidebars with Radix Tooltips]
**Learning:** Custom CSS-based tooltips (e.g., group-hover:visible) are often inaccessible to screen readers and keyboard users. Using Radix UI Tooltips with 'asChild' on the trigger ensures the tooltip is correctly associated with the interactive element and supports keyboard focus.
**Action:** Replace custom hover-based labels with standardized Tooltip components, especially for icon-only buttons in collapsed navigation states. Use 'delayDuration={0}' for a snappier feel in navigation contexts.
