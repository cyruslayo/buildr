## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2026-09-21 - [Public Listing Links & Accessibility in Listing Cards]
**Learning:** Action links on listing cards that open external live pages (`target="_blank"`) must use the actual public route `/p/[slug]` (not `/property/[slug]`), specify `rel="noopener noreferrer"`, and convey target behavior in their `aria-label` (e.g., `View live [Property Title] (opens in new tab)`) so screen reader users get clear context across card grids.
**Action:** Always include item context in `aria-label` for repetitive card action links and verify public route structures against App Router definitions.
