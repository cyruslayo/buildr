# Super Panel Session: The "Show, Don't Tell" Problem

**Topic:** Missing Visual Proof on Landing Page
**Panelists:**
-   **Andy Clarke (Art Director):** "We claim 'Trust', but we show nothing. Where is the product?"
-   **Jen Simmons (Layout Expert):** "We need to show the responsive nature of the templates."
-   **New Expert:** **Brad Frost** (Author of Atomic Design, Design System Consultant).

## The Critique
**Andy Clarke:** "Currently, the Hero text says 'Build Trust', but the visual is just... nothing. Or generic abstract shapes. We need to show the *actual* Lagos templates. A screenshot is dead the moment you take it. I want to see the 'Verified' badge pulse. I want to see the sticky headers."

**Jen Simmons:** "If we use static images, we fail mobile users. They need to see how the template reflows. But loading an `iframe` for every template on the homepage will kill performance."

## The Recommendation: "Live Miniature" Pattern
**Expert:** **Brad Frost**

"Do not use screenshots. Do not use iframes (too heavy). Use **Scaled Component Archipelagos**."

### The Technique
1.  **Direct Import:** Import the actual React Template Components (e.g., `LuxuryListing1`) into the Landing Page.
2.  **CSS Transformation:** Wrap them in a `browser-frame` or `phone-frame` container and force a scale-down.
    ```css
    .preview-container {
      width: 375px; /* Mobile width */
      height: 812px;
      transform: scale(0.5); /* Shrink to 50% */
      transform-origin: top left;
    }
    ```
3.  **Pointer Events:** Disable pointer events (`pointer-events-none`) so users scroll *past* them, or enable them for a "mini-interactive" experience.
4.  **Mock Data:** Pass "Hero Quality" mock data (Best photos, Verified Badge = True) to these components.

### Why This Wins
*   **Maintenance:** If you update the Template code, the Homepage marketing updates automatically. No stale screenshots.
*   **Visual Fidelity:** It renders real fonts and real CSS grids.
*   **Motion:** The entrance animations defined in the templates will play as the user scrolls them into view.

## Integration Plan (The "Hero Carousel")
Replace the current abstract Hero image with a **Auto-Rotating Carousel of Mobile Templates**.
1.  Create a `LivePreviewCard` component.
2.  Modify `src/components/templates/registry.tsx` to export a `MockData` set for previews.
3.  Inject this into `src/app/page.tsx`.

**Verdict:** Proceed with **Live React Component Rendering** using CSS Scaling.
