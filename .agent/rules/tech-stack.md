---
description: Technical stack constraints and best practices for Buildr
globs: "**/*.{ts,tsx,js,jsx}"
trigger: always_on
---
# Tech Stack Rules

**Framework:** Next.js 14+ (App Router)

**Component Philosophy:**
1.  **Server Components First:** Default to React Server Components (RSC). Only use "use client" when strictly necessary (e.g., onClick, useState).
2.  **UI Library:** shadcn/ui + Radix Primitives. Use these components instead of hand-rolling.
3.  **State Management:** Zustand for global state. React Hook Form + Zod for forms.

**Data Fetching:**
- **Forbidden:** useEffect for data fetching on initial load.
- **Required:** Use Server Components + fetch or Server Actions.

**Iconography:**
- **Canonical:** lucide-react.
- **Forbidden:** react-icons, heroicons.
