---
trigger: always_on
description: The Design Authority Compact - Visual, Motion, and Aesthetic Standards
globs: "**/*.{tsx,jsx,css}"
---

# The Design Compact

This project adheres to the "Art-Directed" and "Nigeria-First" visual standards.

## 1. Asymmetry is Law (The Anti-Bootstrap)
- **Rule**: Perfect symmetry is the enemy of premium.
- **Requirement**: Hero sections and major Feature grids MUST use asymmetric ratios.
- **Forbidden**: grid-cols-2 (50/50 split) or grid-cols-3 (33/33/33 split) for primary Hero/Landing content.
- **Allowed**: col-span-8 + col-span-4 (2/3), col-span-7 + col-span-5 (Golden Ratioish).

## 2. Lagos Luxury (Trust Density)
- **Rule**: Trust signals must feel "heavy" and valuable.
- **Requirement**: Trust Badges (Verified, RC Number, COfO) MUST use **Depth** (shadows, gradients, borders), or **Metallic** textures.
- **Forbidden**: Flat, monochrome icons for critical trust signals. They look cheap.

## 3. The Living Interface (Motion)
- **Rule**: The UI breathes; it doesn't blink.
- **Requirement**: 
  - All interactive elements (buttons, cards, links) MUST have 	ransition-all duration-300 (or similar).
  - No instant color swaps on hover.
  - Wizard steps MUST animate in/out (Slide or Fade).

## 4. System Integrity
- **Rule**: Art needs a canvas, not a mess.
- **Requirement**: 
  - All colors/spacing MUST utilize the 	ailwind.config.js design tokens.
  - No hardcoded magic values (e.g., margin: 123px).
  - Typography must use fluid sizing (e.g., clamp()) or responsive prefixes (md:text-xl) to ensure Mobile-First integrity.