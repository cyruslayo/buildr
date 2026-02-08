# Super Panel Critique: Typography as Structure

**References:**
*   *Achieving Print-Level Art Direction on the Web*
*   *Mastering Principles for Web Composition*

**The Users Question:** "Basically using typography to solve?"
**The Panels Answer:** "Typography *is* the solution, but only if it's treated as **Architecture**, not just content."

## 1. Principle: "The Museum Placard" (Andy Clarke)
> *"In a museum, the object sits in the spotlight. The 'Placard' sits quietly below or beside it, providing context. It is small, but its typography is exquisite."*

**Critique of 'Standard Text':** A simple centered paragraph is lazy. It lacks **Contrast** and **Hierarchy**.
**The 'Print-Level' Fix:** Use **Type Pairing** to create tension.
*   **Label (The Machine):** Monospace, Uppercase, Tracking-Wide. (e.g., `TEMPLATE: LUXURY`)
*   **Narrative (The Human):** Serif Italic, Large, Leading-Tight. (e.g., *"Trust is the ultimate luxury."*)
*   **Axis:** Use a **Vertical Rule** (Line) to physically connect the typography to the phone above it. This satisfies the "Flow" principle from the Mastering Composition doc.

## 2. Principle: Use Negative Space (Jen Simmons)
> *"Don't fill the void. Curate it."*

**Strategy:**
Instead of scattering text (Satellites), place the "Placard" deliberately in the negative space below the phone.
*   **Composition:** The Phone is the "Hero". The Typography is the "Legend".
*   **Alignment:** On Native Mobile, center-align relative to the device. On Desktop, hang it on a grid line.

## 3. The Implementation: `EditorialCaption`
We will replace the messy Satellites with this robust typographic component.

**Visual Spec:**
```tsx
<div className="flex flex-col items-center text-center mt-8 space-y-2">
  {/* The Axis Line */}
  <div className="h-8 w-[1px] bg-emerald-500/50 mb-2"></div>
  
  {/* The Label (Mono) */}
  <span className="font-mono text-emerald-400 text-[10px] tracking-[0.2em] uppercase">
    {DESIGN_SYSTEM.SCENARIO_NAME}
  </span>
  
  {/* The Narrative (Serif Italic) */}
  <h3 className="font-display text-white text-2xl italic">
    {DESIGN_SYSTEM.BENEFIT_COPY}
  </h3>
</div>
```

**Scenario Data:**
1.  **Luxury:** "Verified Badge" -> *"Don't just sell. Certify."*
2.  **Land:** "C-of-O" -> *"Documents visible at a glance."*
3.  **Agent:** "Profile" -> *"Put a name to the deal."*

This uses typography to fix the spatial balance without introducing layout bugs.
