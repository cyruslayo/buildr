## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-05-20 - [Standardizing Accessible Tooltips in Collapsed Sidebar Navigation]
**Learning:** Collapsing interactive sidebars into icon-only states renders navigation options and logo headers inaccessible to assistive technology and visually non-obvious to keyboard users without explicit annotations and keyboard-triggerable tooltips. Standardizing on Radix UI tooltips with immediate responsiveness (`delayDuration={0}`) and right-side offsets ensures an optimal user experience.
**Action:** Always provide explicit `aria-label` attributes on collapsed triggers. For non-interactive components acting as triggers (such as custom avatars), supply `tabIndex={0}` and `focus-visible` styles to allow keyboard accessibility.
