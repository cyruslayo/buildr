# UI Component Inventory - Web

## Design System
- **Framework:** Radix UI Primitives
- **Styling:** Tailwind CSS
- **Library:** shadcn/ui

## Component Directories

### Core UI (`src/components/ui`)
Reusable primitives, likely installed via shadcn CLI.
1. `badge.tsx`
2. `button.tsx`
3. `card.tsx`
4. `dialog.tsx`
5. `empty-state.tsx` (Custom pattern)
6. `error-state.tsx` (Custom pattern)
7. `input.tsx`
8. `label.tsx`
9. `live-preview-frame.tsx` (Specialized UI)
10. `progress.tsx`
11. `select.tsx`
12. `skeleton.tsx`
13. `tabs.tsx`
14. `textarea.tsx`
15. `tooltip.tsx`

### Feature Components
- **Wizard (`src/components/wizard`)**: Step-based creation flow components.
- **Dashboard (`src/components/dashboard`)**: Project management views.
- **Templates (`src/components/templates`)**: Template implementation components.
- **Marketing (`src/components/marketing`)**: Landing page components (Hero, Features, etc.).
- **Onboarding (`src/components/onboarding`)**: User onboarding flows.
- **Auth (`src/app/api/auth`)**: Auth pages/forms likely here or in `src/components/auth`.

## Key Patterns
- **Server vs Client**: Primitive UI components are predominantly Client Components (`"use client"` directive likely) due to interactivity.
- **Composition**: Heavy reliance on Radix composition pattern (`Dialog`, `DialogTrigger`, `DialogContent`).
