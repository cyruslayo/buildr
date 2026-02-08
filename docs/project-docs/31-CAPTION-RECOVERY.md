# The Fix: Re-integrating the Lost Output

**Issue:** The Editorial Caption disappeared.
**Diagnosis:** **White Text on White Background.**
Because the Caption was left inside the "Ghost DOM" (812px down), it rendered *below* the Hero's dark `bg-slate-900` area (which was constrained to ~350px). It ended up floating invisibly in the white "Features" section.

**Panel Response:**
"Yes! This proves why the **Grid-Flex Standard** is necessary project-wide. 
1.  **Grid** defines the *Zones* (Hero Area).
2.  **Flex** defines the *Flow* (Phone -> Caption).
By rigorously separating these concerns, we ensure the 'Dark Zone' (Grid Container) always expands to contain its children (Caption)."

## The Repair Plan
1.  **Extract the Caption:** Move `EditorialCaption` *out* of the Phone Wrapper.
2.  **Place in Grid Row 2:** Make it a direct child of the Hero Grid Container.
3.  **Result:** The Grid Container will expand to fit Key 1 (Phone) + Key 2 (Caption). The `bg-slate-900` will stretch with it. The Text will be visible.
