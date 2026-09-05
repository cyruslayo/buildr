## 2026-09-05 - [Card Actions Accessibility & External Links]
**Learning:** Repetitive card components (like `ListingCard`) require item-specific identifiers in `aria-label` attributes for screen reader users to distinguish actions across multiple list items. External links opening in a new tab (`target="_blank"`) must explicitly include `rel="noopener noreferrer"` and indicate that they open in a new tab in their `aria-label`.
**Action:** Always populate `aria-label` with item titles and explicit tab warnings on card action links.

## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.
