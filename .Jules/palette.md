## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-06-29 - [Dashboard Sidebar Standardized Tooltips]
**Learning:** Standardized tooltips using Radix UI improve accessibility and consistency in collapsed sidebar states. Using `delayDuration={0}` and `sideOffset={10}` provides the best UX for rapid navigation.
**Action:** Always prefer Radix tooltips over custom CSS hover states for interactive icons to ensure screen reader and keyboard compatibility.
