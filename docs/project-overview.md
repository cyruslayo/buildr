# Project Overview - Buildr

## Purpose
Buildr is a specialized **landing page builder for Nigerian real estate professionals**. It replaces complex drag-and-drop editors with a **template-first wizard** approach, ensuring:
1.  **High Design Quality:** "Art-Directed" templates that look premium.
2.  **Market Specificity:** Naira currency, sqm measurements, WhatsApp integration.
3.  **Trust Signals:** Built-in slots for RC Numbers, Verified Badges, and Office Addresses.

## Architecture Classification
- **Type:** Monolith
- **Pattern:** Full-Stack Web Application (Next.js App Router)
- **Primary Language:** TypeScript

## Key Documentation
- [Architecture](./architecture-web.md): Detailed technical design.
- [Development Guide](./development-guide-web.md): Setup and running instructions.
- [Source Tree](./source-tree-analysis.md): Directory structure explained.
- [API Contracts](./api-contracts-web.md): Backend API reference.
- [Data Models](./data-models-web.md): Database schema reference.

## Repository Structure
Single repository containing the full-stack application.
- `src/app`: Backend routes & Frontend pages
- `src/components`: UI Library
- `prisma`: Database definitions
