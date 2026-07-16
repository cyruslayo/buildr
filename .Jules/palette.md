## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-05-22 - [Textarea Character Counters & State Sync]
**Learning:** Absolute-positioned character counters in textareas require padding (e.g., `pb-12`) on the textarea itself to prevent text overlap. When syncing local input state with a debounced global store, the sync effect must ONLY depend on the store value; including local state in dependencies causes 'input reversion' during active typing.
**Action:** Use `maxLength` for native enforcement, `aria-live="polite"` for accessibility, and ensure sync effects don't include the local state they are updating.
