# Super Panel Expansion: The "Dead Space" Problem

**Issue:** The "Void" around the phone is too empty. It's wasted real estate.
**The Missing Expert:** **Joanna Wiebe** (Founder of *Copyhackers*, The Original Conversion Copywriter).

## Why Joanna Wiebe?
*   **Expertise:** "Button Triggers", "Micro-copy", and utilizing visual anchors to sell benefits.
*   **Philosophy:** "Every pixel must earn its rent. If you have space, use it to overcome an objection."

## Joanna's Critique
> *"You have a beautiful product shot (the phone), but it's silent. You're showing me the 'What' (a template), but you're not pointing out the 'So What?' (why it converts)."*

> *"That empty dark space? That's not 'breathing room'; that's 'awkward silence'. Fill it with **Benefit Satellites**."*

## The Recommendation: "Benefit Satellites"
Instead of a block of text (which nobody reads), use **Floating Annotations** with leaders/lines pointing to specific parts of the phone screen.

### The Strategy
Add 2-3 "Floating Callouts" around the phone in the dark area:
1.  **Left Side (Pointing to Badge):**
    *   *Icon:* `ShieldCheck` (Green)
    *   *Copy:* "Instant Trust Signals"
    *   *Why:* Points to the 'Verified' badge on the screen.
    
2.  **Right Side (Pointing to WhatsApp):**
    *   *Icon:* `MessageCircle` (Emerald)
    *   *Copy:* "1-Click Leads"
    *   *Why:* Points to the WhatsApp button.

3.  **Bottom Center (Under Phone):**
    *   *Text:* "Rotates every 6s..." (Subtle hint)

### Visual Execution (Andy Clarke's Input)
*   **Style:** Thin, elegant lines (hairlines) connecting the text to the phone edge.
*   **Typography:** Small, uppercase, tracking-wide (`text-xs font-mono`). Like technical blueprints.
*   **Motion:** Fade them in *after* the phone rises.

## Action Plan
1.  Start a new "Micro-Copy" Implementation task.
2.  Add a `FloatingAnnotation` component to `page.tsx`.
3.  Position them absolutely around the `LivePreviewFrame`.
