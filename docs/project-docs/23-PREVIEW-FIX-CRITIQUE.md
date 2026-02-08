# Super Panel Critique: The "Half-Phone" Bug

**Session:** Mobile Layout Debugging
**Artifact Reviewed:** `uploaded_image_1765560694601.png`
**Verdict:** ⚠️ **CLIPPING PERSISTS**

## The Diagnosis (Jen Simmons)
> *"You liberated the parent, but you jailed the child."*

*   **Observation:** The phone is cleanly cut off at the exact top edge of the dark section.
*   **The Culprit:** In `src/app/page.tsx`, the *inner* background container still has `overflow-hidden`:
    ```tsx
    <div className="absolute inset-0 ... overflow-hidden lg:overflow-visible">
    ```
    This `overflow-hidden` is acting as the "Guillotine" for any element trying to escape the box (like the phone with negative margin).

## The Positioning (Andy Clarke)
> *"It feels stuck. The negative margin isn't working because of the clip."*

*   **Observation:** We wanted the phone to "bridge" the gap between the white text and the dark hero background (`mt-[-2rem]`).
*   **Reality:** Because of the clipping, the "bridge" part is invisible, making the phone look like it's sinking into quicksand.

## The Fix Recommendations

### 1. The Jailbreak (CSS)
**Action:** Change the inner div to `overflow-visible` on mobile too.
```diff
- overflow-hidden lg:overflow-visible
+ overflow-visible
```

### 2. The Spacing
**Action:**
*   Increase the negative margin to `mt-[-4rem]` onto mobile to make the overlap more deliberate.
*   Ensure the `Visual Layer` (`z-0`) does not get hidden behind the `Content Layer` (`z-10`) background?
    *   Wait, the white section (`Content Layer`) is transparent, but `main` is `#FDFBF7`.
    *   If `Visual Layer` is `relative` and `Content Layer` is `relative`, they stack.
    *   We want the Phone (in Visual Layer) to appear *on top* of the white background?
    *   If `Content Layer` is `order-1` and `Visual Layer` is `order-2`, Visual comes *after* in DOM.
    *   So Visual naturally stacks *on top* if Z-indices are same.
    *   So simply removing `overflow-hidden` should allow the phone to overlap the white text area.

### 3. Vertical Centering
**Action:** The phone looks a bit low.
*   Remove `flex items-center`. Let it use padding or margin to position.
*   Or keep centering but ensure the container height is sufficient.

## Execution Plan
1.  **Modify `page.tsx`:**
    *   Remove `overflow-hidden` from the inner hero div.
    *   Adjust `mt` to `-4rem`.
    *   Ensure `z-20` on the phone relative wrapper is sufficient.
