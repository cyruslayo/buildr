# Deep Dive: Element-by-Element Diagnosis

**Issue:** The Mobile Hero shows a massive dark gap between the phone and the caption.
**Panel:** Rachel Andrew (Grid Expert), Andy Clarke (Art Director).

---

## The Screenshot Analysis

![Current Mobile View](file:///C:/Users/khayu/.gemini/antigravity/brain/911ad105-fdaa-4b52-ba9d-201a70583420/uploaded_image_1765584230555.png)

**Observed:**
1.  **Content Layer (White):** Shows correctly at top (`order-1`).
2.  **Phone:** Partially visible, clipped/small.
3.  **Dark Area:** HUGE, takes up most of the screen.
4.  **Caption ("TRUST SIGNAL"):** At the very bottom of the dark area.

---

## Element-by-Element Breakdown

### 1. The Section (Line 156)
```tsx
<section className="... grid grid-cols-1 lg:grid-cols-luxury-hero grid-rows-luxury-hero ...">
```
*   **Mobile:** `grid-cols-1`. Single column, elements stack.
*   **Desktop:** Uses custom named Grid Lines (`grid-cols-luxury-hero`).
*   **Impact:** On mobile, this outer Grid just stacks its 2 children (Visual Layer + Content Layer).

### 2. The Outer Wrapper (Line 160)
```tsx
<div className="order-2 ... h-auto lg:h-auto overflow-visible lg:overflow-hidden block">
```
*   **Mobile:** `order-2` means it renders SECOND (below Content Layer). `h-auto` means its height is determined by its content.
*   **Impact:** Its height is whatever the Inner Wrapper demands.

### 3. The Inner Wrapper (Line 161) - **THE CULPRIT**
```tsx
<div className="relative lg:absolute inset-0 bg-slate-900 
    grid grid-cols-1 grid-rows-[minmax(350px,45vh)_min-content] ...">
```
*   **Problem 1: `inset-0`**
    *   On Mobile, this element is `position: relative`. The `inset-0` property (`top:0; right:0; bottom:0; left:0`) is **ignored** for `relative` positioning in this way. It doesn't stretch the element.
    *   However, it might be interfering with the Grid sizing by forcing an intrinsic size calculation.

*   **Problem 2: `grid-rows-[minmax(350px,45vh)_min-content]`**
    *   **Row 1:** At least 350px, but can grow to 45vh (45% of viewport height). On a 900px mobile viewport, that's **405px**.
    *   **Row 2:** `min-content` - should be the natural height of the caption (~100px).
    *   **Expected Total:** ~505px.

*   **Problem 3: The Scaled Phone (812px) in Row 1**
    *   The phone is `scale(0.85)` which is *visual only*. The DOM still reserves the full **812px** height.
    *   Since Row 1 is `minmax(350px, 45vh)`, it CANNOT contain the 812px phone. The Grid expands Row 1 to fit the content.
    *   **Result:** Row 1 becomes **812px** (or more), NOT 350px.

### 4. The Phone Wrapper (Line 181)
```tsx
<div className="... transform scale-[0.85] ... grid-row-start-1 self-end ...">
```
*   `grid-row-start-1`: Correctly placed in Row 1.
*   `self-end`: Aligns to the *bottom* of Row 1.
*   **Effect:** The phone sits at the bottom of an 812px row, leaving a **~467px gap** above it (the ghost space).

### 5. The Caption (Lines 206-212)
```tsx
<EditorialCaption className="grid-row-start-2 col-start-1 ..."/>
```
*   Correctly in Row 2.
*   **But:** Row 1 is now 812px. So the caption is pushed 812px down from the top of the dark area.

---

## The Verdict (Rachel Andrew)

"The `minmax(350px, 45vh)` is being overridden by the scaled phone's *intrinsic content size* (812px). The Grid cannot constrain the phone because the phone is larger than the maximum (`45vh`). Grid defaults to 'content wins'.

**You need to PHYSICALLY constrain the phone's height in the DOM, not just visually.**"

---

## The Fix: "The Rigid Box"

**Option A: Overflow Clip**
Wrap the phone in a fixed-height container that clips the overflow.
```tsx
<div className="h-[350px] overflow-hidden"> /* The Rigid Box */
    <div className="scale-[0.85] ...">Phone</div>
</div>
```
*   **Pros:** Clean. Grid sees a 350px item.
*   **Cons:** Phone is visually clipped.

**Option B: Negative Margin (Revisited, but calculated)**
Let the phone overflow its row, but use a calculated negative margin on the *container* to pull up the following content.
```tsx
/* Inner Wrapper */
<div className="grid-rows-[350px_min-content] mb-[-462px] ...">
```
*   **Cons:** Magic number. Fragile.

**Option C: Remove the Inner Grid, Use Flex with Fixed Height**
Stop using Grid for the Inner Wrapper. Use Flex with a constrained phone.
```tsx
<div className="flex flex-col h-[500px] ..."> /* Fixed Height */
    <div className="flex-shrink-0 -mb-[400px] scale-...">Phone</div>
    <Caption className="mt-auto" />
</div>
```

**Recommended:** **Option A (Overflow Clip)** or a variant where the phone's *visual* size is used to determine a CSS Custom Property for the container height.
