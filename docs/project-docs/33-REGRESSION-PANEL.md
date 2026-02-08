# The Regression Panel: "The Wrong Container"

**Topic:** Why the Mobile Fix failed and Desktop broke.
**Context:** Images show Mobile Caption (Missing/Gap) and Desktop (Broken Layout).
**Panel:** Andy Clarke, Rachel Andrew.

---

## 1. The Mobile Diagnosis (Rachel Andrew)

"You applied `display: grid` to the **Outer Wrapper** (Line 158), but the Phone and Caption live inside the **Inner Background Div** (Line 159).
Because the Inner Div is `flex flex-col`, it **preserves the Ghost Space** of the transformed phone. Flexbox honors the DOM size, not the transformed size. The Caption is pushed down 400px into the void."

"Furthermore, because the Grid was on the parent, the 'Inner Div' became the *only* grid item, rendering the track definitions useless for the phone/caption."

## 2. The Desktop Diagnosis (Andy Clarke)

"The Desktop layout broke because of CSS specificity and property leakage.
The `EditorialCaption` on Desktop is `absolute`. However, it relies on being relative to the *Visual Container*. By messing with the wrapper's display properties (`grid` vs `block`), we likely collapsed the coordinate system or z-indexing."

In Image 2, the 'Content Layer' seems completely displaced. This is likely because the `grid-cols-luxury-hero` of the *Section* is conflicting with the internal sizing of the changed column.

## 3. The Fix: "Target the Right Node"

We need to apply the **Grid Fix** to the **Inner Background Div** (Line 159), because that is the *direct parent* of the Phone and Caption.

**Corrected Structure:**

```tsx
/* 1. OUTER WRAPPER (Visual Layer) */
<div className="... lg:block"> /* Keep simple */

  /* 2. INNER DIV (The Real Container) */
  <div className="
      relative 
      bg-slate-900 
      
      /* MOBILE GRID FIX */
      grid                         /* Activate Grid */
      grid-cols-1 
      grid-rows-[minmax(350px,45vh)_min-content] /* Rigid Phone Height, Flow Caption */
      justify-items-center
      
      /* DESKTOP RESET */
      lg:flex                      /* Revert to Flex for centering */
      lg:flex-col
      lg:items-center
      lg:justify-center
  ">
      /* 3. PHONE (Row 1) */
      <div className="grid-row-start-1 self-end ...">...</div>

      /* 4. CAPTION (Row 2) */
      <EditorialCaption className="grid-row-start-2 ... lg:absolute" />
  </div>
</div>
```

**Why this works:**
1.  **Mobile:** The **Inner Div** (which has the dark background) becomes the Grid. It forces the Phone into a 350px slot (cutting the ghost space). It forces the Caption into Row 2 (directly below). The background stretches to cover both.
2.  **Desktop:** We reset to `lg:flex`. The Caption becomes `lg:absolute` again, breaking out of the flow to do its "Satellite" thing.
