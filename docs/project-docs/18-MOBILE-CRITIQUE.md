# Mobile View Critique (The "Super Panel" Review)

**Session:** Mobile Implementation Review
**Panel:** Andy Clarke (Art Direction), Jen Simmons (Layout), Jason Santa Maria (Typography)
**Status:** ⚠️ CRITICAL LAYOUT ISSUES DETECTED

## 1. The Pricing Grid Failure (Jen Simmons)
> *"Stop forcing desktop logic onto mobile screens. It looks broken."*

*   **Observation:** In the Pricing screenshots (Image 2 & 3), distinct grid lines are visible, creating empty columns next to the "Starter" and "Enterprise" cards.
*   **The Issue:** The CSS Grid likely retains a multi-column definition (e.g., `grid-cols-3` or `grid-cols-4`) on mobile, causing the cards to squash into the first column while leaving "ghost columns" visible to the right.
*   **The Fix:** 
    *   **Mobile:** Force `grid-cols-1`.
    *   **Borders:** Hide the internal vertical grid lines on mobile. They are just visual noise without the spatial context.
    *   **Width:** All pricing cards must be `w-full` (100% width) on mobile.

## 2. The "White Void" Hero (Andy Clarke)
> *"Where is the heat? Where is Lagos? It feels like a generic Delaware SaaS."*

*   **Observation:** The Hero section (Image 0) is perfectly legible but emotionally sterile. It's just black text on white. The "Hardboiled" tension is missing.
*   **The Issue:** The asymmetric grid and overlapping images from the desktop view likely stacked linearly/disappeared, leaving no visual anchor.
*   **The Fix:**
    *   **Texture:** Introduce a subtle background pattern or gradient opacity on mobile to break the white monotony.
    *   **Typography:** The "Trust" emphasis is good, but the "BUILDR ENGINE" pill feels too detached.

## 3. Typographic Rhythm (Jason Santa Maria)
*   **Observation:** The Features section (Image 1) has decent rhythm, but the "Naira Native" dark card feels disconnected from the "WhatsApp First" light card.
*   **The Fix:** Ensure consistent padding inside these feature cards. The "Export to HTML" icon feels a bit small compared to the text weight.

## 4. Navigation & Footer
*   **Observation:** The Footer (Image 3) is minimal.
*   **The Fix:** Ensure the "N" logo at the bottom left (floating?) doesn't obscure content. (It seems to be a fixed launcher).

---

# Expert Implementation Recommendations

## Fix 1: Responsive Pricing Grid
**File:** `src/app/page.tsx`
**Action:** Use `grid-cols-1` by default and `lg:grid-cols-12` only on large screens. Hide the decorative grid lines on mobile (`hidden lg:block`).

## Fix 2: Mobile Hero Texture
**File:** `src/app/page.tsx`
**Action:** Add a background layer to the Hero that is visible on mobile. Maybe a faint topographic map or noise texture to give it "grit".

## Fix 3: Card Density
**File:** `src/app/page.tsx`
**Action:** Adjust padding in feature cards for mobile. `p-8` might be too much for narrow screens; reduce to `p-6`.

## Fix 4: Font Scaling
**File:** `src/app/page.tsx` / `tailwind.config.ts`
**Action:** Ensure `text-5xl` scales down to `text-4xl` or `text-3xl` on mobile to prevent wrapping awkwardness.
