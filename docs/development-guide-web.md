# Development Guide - Web

## Prerequisites
- **Node.js**: v18+ (Required for Next.js 16)
- **PostgreSQL**: Local or Cloud instance
- **Provisions**:
  - Google AI API Key (Gemini)
  - Upstash Redis (Caching)
  - Paystack (Payments)

## Installation

```bash
# Install dependencies (use pnpm as per strict rules)
pnpm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with real credentials
```

## Database Setup

```bash
# Push schema to database
pnpm dlx prisma db push

# (Optional) Generate client if not auto-generated
pnpm dlx prisma generate
```

## Running Locally

```bash
# Start development server
pnpm dev
```
Access at `http://localhost:3000`.

## Testing

```bash
# Run Unit Tests (Jest)
pnpm test

# Run E2E Tests (Playwright)
pnpm test:e2e
```

## Common Tasks

### Adding a UI Component
Use shadcn/ui via pnpm dlx:
```bash
pnpm dlx shadcn@latest add [component-name]
```

### Database Migration
Modify `prisma/schema.prisma` then run:
```bash
pnpm dlx prisma db push
```
