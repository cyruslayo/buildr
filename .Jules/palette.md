## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-07-27 - [Sidebar Tooltips & Radix TooltipProvider]
**Learning:** Standardizing tooltips in collapsed sidebars using Radix-based components ensures instant response times (`delayDuration={0}`) and full keyboard accessibility. In Next.js, always make sure to wrap the relevant component or scope in `<TooltipProvider>` since it might not be globally present.
**Action:** Wrap the sidebar component with `<TooltipProvider>` and use `<Tooltip>` with `delayDuration={0}` to instantly show labels when navigating with keyboard focus or mouse hover in collapsed states.
