## 2025-05-18 - [Repetitive Card Action ARIA Labels & Route Alignment]
**Learning:** Repetitive list item card action buttons (like Edit, Duplicate, Unpublish) and external live preview links need item identifiers in their `aria-label` (e.g. `aria-label={`View live: ${title} (opens in new tab)}`) to prevent ambiguous screen reader context, and external route links must match public router paths (`/p/[slug]` instead of legacy `/property/[slug]`).
**Action:** Always include item context in action `aria-label`s when rendering lists of cards and verify routing targets against active Next.js app directory structure.

## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.
