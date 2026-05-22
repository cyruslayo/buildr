## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-05-15 - [Accessible Collapsed Navigation]
**Learning:** When collapsing a sidebar to an icon-only state, tooltips and explicit `aria-label` attributes on the interactive elements are essential. Hidden label spans inside the button/link do not provide an accessible name for screen readers when the parent element is an icon-only control.
**Action:** Always provide standard Radix-based tooltips and `aria-label`s that match the text content for collapsed navigation items.

## 2025-05-15 - [Responsive Button Labels]
**Learning:** In listing cards or grids, buttons that use `md:inline` to show text on larger screens must have a base `hidden` class to ensure the text doesn't wrap or cause layout shifts on mobile devices.
**Action:** Use `className="hidden md:inline"` for responsive text labels in compact components.
