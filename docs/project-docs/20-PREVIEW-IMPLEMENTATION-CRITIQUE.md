# Super Panel Critique: Live Preview Implementation

**Session:** Visual Verification
**Artifact Reviewed:** `uploaded_image_1765559712699.png`
**Verdict:** ⚠️ **BROKEN LAYOUT**

## The Panel's Observations

### 1. The "Guillotine" Effect (Jen Simmons)
> *"You've decapitated the design. The phone is clearly clipped at the top and bottom."*

*   **Issue:** The parent container (`div.absolute.inset-0 ... overflow-hidden`) works for abstract shapes but is fatal for a fixed-size element like the Phone Frame.
*   **Root Cause:** The container height is `min-h-[50vh]` (mobile) or constrained by grid rows. The scaled phone (height ~560px) exceeds the available vertical space of the container.
*   **Severity:** High. It looks buggy, not intentional.

### 2. The Scaling Mismatch (Brad Frost)
> *"It's floating in a void. It doesn't feel like a device sitting on a surface; it feels like a `div` stuck in `z-index` hell."*

*   **Issue:** The scale (`0.6`) reduced the size, but the layout flow didn't collapse around it tightly, leaving awkward empty space above/below while still clipping.
*   **Root Cause:** The `transform: scale()` property affects visual rendering but not layout flow (unless container is adjusted).
*   **Recommendation:** We need to explicitly size the wrapper or use `zoom` (non-standard) or a containment wrapper that matches the scaled dimensions.

### 3. Mobile vs Desktop Context
*   The screenshot appears to be Mobile (vertical stack). The dark container is effectively the "Header" now.
*   The phone is "The Hero Image". It must be fully visible.

## Recommended Expert Fixes

### Fix 1: Unshackle the Height
**Action:** Remove `overflow-hidden` from the specific container hosting the preview, OR significantly increase its `min-height` to accommodate the phone.
**CSS Change:** Change `min-h-[50vh]` to `h-auto min-h-[600px]` (or sufficient pixel height) to ensure the 812px scaled phone fits.

### Fix 2: Anchor the Transform
**Action:** The current `origin-center` pushes the top/bottom out if the container is small.
**CSS Change:** Use `origin-top` and ensuring the parent has enough padding/height.

### Fix 3: Soften the "Cut"
**Action:** If we *must* crop (e.g. at the bottom), fade it out. But preferably, show the whole phone.

### Fix 4: Mobile Specifics
**Action:** On mobile, the scale might need to be even smaller (`0.5`) to fit side-by-side or comfortably within the viewport width without dominating vertically.

## Execution Plan
1.  **Refactor Hero Container:** Switch from `absolute inset-0` to a relative flex container for the visual layer, allowing it to grow with content.
2.  **Adjust Scale:** Mobile scale `0.5`, Desktop `0.65`.
3.  **Remove Clipping:** `overflow-visible` on the immediate parent, or ensure parent `height` > `scaled_phone_height`.
