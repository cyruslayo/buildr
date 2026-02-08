---
description: Create a new UI component with art direction
---
# Workflow: Generate Art-Directed Component

1.  **Requirements**:
    -   What is the component?
    -   What is the emotional context?

2.  **Base Layer**:
    -   Start with a shadcn/ui primitive if applicable.

3.  **Art Direction**:
    -   Apply 16-TEMPLATE-DESIGN-SPEC.md styling rules.
    -   **Typography**: Adjust tracking/leading.
    -   **Spacing**: Use clamping/fluid spacing.

4.  **Motion**:
    -   Wrap in <motion.div> if entry animation is needed.
    -   Add hover states (scale, shadow, color shift).

5.  **Code Review**:
    -   Verify accessibility (ARIA).
    -   Verify Tailwind sanity (no distinct arbitrary values, use tokens).
