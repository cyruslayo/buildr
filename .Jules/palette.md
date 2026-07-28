## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-05-16 - [Standardized Accessible Textarea Character Counters]
**Learning:** Textarea character counters are vital to assist users with text limits, preventing truncation issues on high-conversion descriptions. Combining native browser `maxLength` enforcement with accessible markup like `aria-describedby` and `aria-live="polite"` ensures screen readers are aware of limits and updates without disturbing flow. Using progressive warning colors (e.g., amber at 80% and red/destructive at 90%) provides clear visual feedback. Adding sufficient bottom padding (e.g., `pb-12`) to the textarea is necessary to prevent overlapping content.
**Action:** For all limited inputs, use native attributes for limits, couple screen reader attributes exactly, and use absolute positioning with bottom padding to maintain a clean layout without text overlaps.
