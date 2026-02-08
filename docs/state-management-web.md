# State Management - Web

## Overview
The application uses a hybrid state management approach typical of Next.js App Router applications.

## Server State
- **Mechanism:** React Server Components (RSC).
- **Data Fetching:** Direct database access via `prisma` in Server Components or API Routes.
- **Mutations:** Server Actions (implied by Next.js 16) or standard API Routes (`/api/*`).

## Client State
- **Global Store:** **Zustand**.
- **Local State:** `useState`, `useReducer` for component-level UI state.
- **Form State:** `react-hook-form` used extensively for complex inputs.

## Stores

### Wizard Store (`src/lib/stores/wizard-store.ts`)
Manages the multi-step project creation wizard.
- **Type:** `WizardState`
- **Key State:**
  - `currentStep`: 1 | 2 | 3 | 4
  - `selectedTemplateId`: string
  - `propertyData`: Template configuration
  - `selectedStylePreset`: Styling choice
- **Actions:** `setStep`, `nextStep`, `previousStep`, `setTemplate`, `setPropertyData`, `reset`.

## Contexts
- **SessionProvider**: NextAuth session context.
- **ThemeProvider**: Likely `next-themes` (implied by shadcn).
