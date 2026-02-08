# Super Panel Session: The "Infinite Gallery"

**Topic:** Displaying Multiple Templates in the Single Hero Phone
**Panelists:**
-   **Sarah Drasner (Motion):** Choreography & Transitions.
-   **Brad Frost (Systems):** Component Interface.
-   **Jen Simmons (Layout):** ensuring the container holds different heights.

## The Challenge
Showing only one template (`LuxuryListing`) implies we *only* do luxury. We need to show range: Land, Agents, Short-lets.

## Expert Proposals

### 1. The "Swipe" Metaphor (Sarah Drasner)
> *"It's a phone. It should feel like an app. We should auto-swipe between templates."*
*   **Mechanism:** Use `framer-motion`'s `AnimatePresence`.
*   **Transition:** Slide horizontally (x-axis) or crossfade?
*   **Verdict:** **Crossfade with slight scale pulse**. Horizontal sliding inside a scaled container can be jittery and distracting in a Hero section. A soft crossfade feels more "Premium/Apple".

### 2. The Data Interface (Brad Frost)
> *"We need a consistent way to feed these monsters."*
*   **Requirement:** Create a `PREVIEW_SCENARIOS` array array in `page.tsx`.
    ```typescript
    const SCENARIOS = [
      { component: LuxuryListing1, data: LUXURY_MOCK },
      { component: LandSale, data: LAND_MOCK },
      { component: AgentBio, data: AGENT_MOCK }
    ]
    ```
*   **Cycle:** Use a `useEffect` timer to rotate the `currentIndex` every 5-8 seconds.

### 3. Context Awareness (Andy Clarke)
> *"If the Agent Bio is green, and the Luxury is gold, the stage lighting should adapt."*
*   **Idea:** The `Spotlight` gradient behind the phone should transition colors based on the active template's brand color.

## Implementation Plan: The "Rotator"

1.  **State:** `activeIndex` in `HomePage`.
2.  **Components:** Import `LuxuryListing1`, `LandSale`, `AgentBio`.
3.  **Mock Data:** Create robust mock data for all 3 scenarios.
4.  **Animation:**
    ```jsx
    <AnimatePresence mode='wait'>
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.5 }}
      >
        <CurrentComponent data={CurrentData} />
      </motion.div>
    </AnimatePresence>
    ```

**Recommendation:** Implement an **Auto-Rotating Carousel (3 slides)**:
1.  **Luxury Listing** (The Anchor)
2.  **Land Sale** (The Volume plays)
3.  **Agent Bio** (The Personal brand)

This covers the 3 main personas: Developers, Land Speculators, and Realtors.
