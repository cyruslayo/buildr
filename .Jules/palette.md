## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-05-16 - [Textarea Character Counters & Overlap Prevention]
**Learning:** When adding an absolute-positioned character counter inside a `Textarea` wrapper to keep the layout compact and polished, the user's typed text can easily overlap and render underneath the counter. To prevent this, extra bottom padding (e.g., `pb-12`) is necessary on the textarea itself.
**Action:** Always apply `pb-12` or sufficient bottom padding to any textarea that contains an absolute-positioned character counter at its bottom edge to avoid text collision, and ensure the counter is linked via `aria-describedby` and `aria-live="polite"` for optimal keyboard and screen-reader accessibility.
