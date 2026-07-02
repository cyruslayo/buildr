## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-05-16 - [Dashboard Sidebar Accessibility & Standardized Tooltips]
**Learning:** When collapsing a sidebar to an icon-only state, ensure interactive elements have explicit `aria-label` attributes reflecting their text content. Standardize tooltips by using the project's Radix-based `Tooltip` component (from '@/components/ui/tooltip') with `delayDuration={0}` and `sideOffset={10}` instead of custom CSS/div implementations to ensure keyboard accessibility and consistent look and feel.
**Action:** Use Radix Tooltips with snappy delays for navigation items in collapsed states and always provide descriptive ARIA labels for icon-only buttons.
