# Architecture - Web Application

## Executive Summary
Buildr is a **Next.js 16 (App Router)** web application designed as a template-based landing page builder for the Nigerian real estate market. It utilizes a **monolithic architecture** where the frontend (React 19) and backend (API Routes + Server Actions) coexist in a single repository.

## Technology Stack
| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Framework** | Next.js | 16.0.8 | Full-stack framework (App Router) |
| **Language** | TypeScript | 5.9.3 | Static typing & type safety |
| **UI Library** | React | 19.2.1 | Component-based UI |
| **Styling** | Tailwind CSS | 4.1.17 | Utility-first styling & Design Tokens |
| **Database** | PostgreSQL | - | Relational data store |
| **ORM** | Prisma | 7.1.0 | Data access & migrations |
| **Auth** | NextAuth.js | 5.0.0-beta | Authentication & Session mgmt |
| **State** | Zustand | 5.0.9 | Client-side complex state (Wizard) |

## Architectural Pattern
**Component-Based Monolith** using **React Server Components (RSC)** default.
- **Server-First Data Fetching:** Data is fetched directly in RSCs via Prisma.
- **Client Interactivity:** 'use client' boundary is pushed down to leaf nodes (buttons, forms, wizard steps).
- **Server Actions:** Used for form mutations to reduce API boilerplate.

## Domain Architecture

### Data Layer
Managed via **Prisma ORM**.
- **User/Auth:** Standard NextAuth adapter schema.
- **Projects:** Core entity storing landing page configuration and HTML.
- **Leads:** Captures inputs from published landing pages.
See [Data Models](./data-models-web.md) for full schema.

### API Layer
RESTful API Routes located in `src/app/api`.
- **Validation:** Zod schemas used for all writes.
- **Security:** Session-based checks via `auth()` helper.
See [API Contracts](./api-contracts-web.md) for endpoints.

### UI Architecture
Built on **shadcn/ui** (Radix Primitives + Tailwind).
- **Design System:** "Art Directed" aesthetic, avoiding Bootstrap/generic looks.
- **Wizard Pattern:** Multi-step specific components in `src/components/wizard`.
- **Dashboard:** Management views in `src/components/dashboard`.
See [UI Component Inventory](./ui-component-inventory-web.md).

## Deployment Architecture
- **Platform:** Vercel (implied by Next.js defaults & analytics).
- **Database:** Neon/Supabase/Railway (Postgres compatible).
- **Caching:** Upstash Redis for rate limiting and data caching.
- **Observability:** Sentry for error tracking.
- **Analytics:** Vercel Analytics + Google AI integration.
