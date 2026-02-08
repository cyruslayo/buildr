# Source Tree Analysis - Buildr

## Directory Structure

```
buildr/
├── .bmad/               # BMAD Agent workflows and config
├── __tests__/           # Testing (Jest + Playwright)
│   └── e2e/             # Playwright E2E tests
├── docs/                # Project documentation (BMM & Legacy)
├── prisma/              # Database schema and migrations
│   └── schema.prisma    # PostgreSQL Schema (Auth + User + Projects)
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js 16 App Router
│   │   ├── (auth)/      # Auth Group (Login, Register)
│   │   ├── (dashboard)/ # Dashboard Layout Group
│   │   ├── api/         # API Routes (Next.js Types)
│   │   └── page.tsx     # Landing Page
│   ├── components/      # React Components
│   │   ├── ui/          # shadcn/ui primitives
│   │   ├── wizard/      # Project creation wizard
│   │   └── dashboard/   # Dashboard widgets
│   └── lib/             # Utilities and Libraries
│       ├── auth/        # NextAuth configuration
│       ├── db/          # Prisma client instance
│       └── stores/      # Zustand state stores
├── .env.example         # Environment variables template
├── next.config.ts       # Next.js + Sentry config
├── package.json         # Dependencies and Scripts
└── tailwind.config.ts   # Design token config
```

## Critical Folders

### `src/app`
The specific application entry points. Uses Route Groups `(group)` to separate layouts for Marketing, Auth, and Dashboard.

### `src/components/ui`
Contains the design system primitives (shadcn/ui). These are the building blocks for the application.

### `prisma`
Source of truth for the data model. All database changes originate here via `schema.prisma`.

### `__tests__`
Contains both unit tests (Jest) and integration/e2e tests (Playwright).
