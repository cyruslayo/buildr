## 2025-05-15 - [Button Loading States & asChild Pattern]
**Learning:** When adding loading states (like spinners) to base UI components that use the `asChild` pattern (e.g., Radix UI `Slot`), you must ensure that you don't inject sibling elements into the `Slot`. `Slot` expects a single child and will fail if multiple children are provided.
**Action:** Always check for `asChild` before injecting extra UI elements into a component. If `asChild` is true, either skip the injection or require the child to handle its own loading state.

## 2025-05-16 - [Balanced Accessibility for High-Frequency Counters]
**Learning:** Adding `aria-live="polite"` to a character counter that updates on every keystroke can be disruptive for screen reader users as it announces the count constantly. A better pattern is to use `aria-describedby` for basic association and only enable `aria-live` (or switch it to "polite") when the user is nearing the character limit (e.g., at 90% capacity).
**Action:** Use dynamic `aria-live` values for counters and prioritize native attributes like `maxLength` for enforcing constraints over manual JavaScript logic where possible.
