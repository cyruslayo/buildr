## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-10-24 - [Keyboard Focus Indicators & Accessible Tooltips in Sidebars]
**Learning:** Collapsed icon-only sidebars must ensure all elements (including decorative logos and profile avatars) are focus-navigable (`tabIndex={0}`) with clear focus-visible rings, have distinct `aria-label` attributes, and utilize accessible Radix Tooltips aligned relative to the trigger.
**Action:** When refactoring sidebars, wrap interactive/focusable icons with `<TooltipProvider delayDuration={0}>` and customize positioning with `side="right"` and `sideOffset={10}` to prevent overlap while maintaining accessibility.
