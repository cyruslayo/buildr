---
description: Create a new real estate template following the Art Direction spec
---
# Workflow: Create New Template

1.  **Content Strategy (Crucial)**:
    -   Is this visual-heavy (Luxury) or data-heavy (Land)?
    -   Decide the layout *after* knowing the content density.

2.  **Scaffold Structure**:
    -   Create file in components/templates/[category]/[template-name].tsx.
    -   Import TemplateConfig interface.

3.  **Define Variables**:
    -   Implement the TemplateVariable schema (Section 7 of spec).
    -   Ensure all text/images are variable-driven.

4.  **Implement Design**:
    -   **Hero Section**: Apply Clarke Grid (Asymmetric).
    -   **Content**: Use shadcn components extended with Art Direction (custom classes).
    -   **Motion**: Add Framer Motion entry animations.

5.  **Verify**:
    -   Check responsiveness (Mobile First).
    -   Verify "Nigeria Context" (Naira, WhatsApp button presence).
    -   Verify "Trust Signals" (RC Number slot, Badge slot).
