## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.
## 2025-05-15 - [Root Level Tooltip Context]
**Learning:** Tooltip components from Radix UI require a `TooltipProvider` wrapper to function. Missing this at the root layout level leads to silent failures of tooltips across the application.
**Action:** Always verify that `TooltipProvider` is present in the `RootLayout` when implementing tooltips in a new project or feature.

## 2025-05-15 - [Correct Route Association]
**Learning:** Functional UX requires correct routing. In this project, the property creation flow is hosted at `/wizard`, but legacy components still referenced `/builder`, leading to 404s.
**Action:** When auditing navigation UX, verify that links point to active routes defined in the `src/app` directory.
