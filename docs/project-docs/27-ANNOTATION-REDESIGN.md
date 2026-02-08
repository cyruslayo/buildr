# Super Panel Critique: Satellites vs. Captions

**Issue:** The "Benefit Satellites" are colliding with the phone. The layout is messy.
**Proposal:** User suggests a "Text Carousel".

## The Panel's Verdict

### 1. Why the "Satellites" Failed (Jen Simmons)
> *"Absolute positioning inside a scaled, transformed container is a math minefield. The 'Satellites' are crashing into the bezel because the coordinate systems (Mobile vs Desktop) are fighting."*

### 2. Critique of "Side Carousel" (User Proposal)
*   **Mobile:** 🛑 **Fail.** There is no "side" on a vertical mobile screen. It would have to go above or below.
*   **Desktop:** ⚠️ **Risk.** Putting text to the side might visually compete with the main "Lagos" watermark or the main H1.

### 3. The Better Recommendation: "The Dynamic Caption Deck" (Joanna Wiebe)
> *"Stop trying to make the text float. Anchor it. Give it a home."*

*   **Concept:** Use the empty dark space *under* the phone.
*   **Mechanism:** A **Synced Text Block** that fades in/out exactly when the phone rotates.
*   **Placement:**
    *   **Mobile:** Centered, directly below the phone (filling the void).
    *   **Desktop:** Aligned near the bottom or adjacent to the phone, grounding it.

## The Design
Instead of messy lines, use a clean, typographic "Caption Card":

```text
[ TEMPLATE: LUXURY LISTING ]
"Trust Signal: Verified Developer Badge visible top-right."
```

⬇️ *Rotates to*

```text
[ TEMPLATE: LAND SALE ]
"Trust Signal: Government Consent & C-of-O clearly marked."
```

## Strategy
1.  **Remove:** Delete the complex `BenefitSatellite` absolute positioning code.
2.  **Add:** A `ScenarioCaption` component inside the hero.
3.  **Place:**
    *   Mobile: `mt-8` below the Live Preview.
    *   Desktop: `absolute bottom-12 left-12`.

This is robust, readable, and solves the "Dead Space" issue without layout bugs.
