# Deployment Guide

## Infrastructure Stack
- **Compute/Hosting:** Vercel (recommended for Next.js)
- **Database:** PostgreSQL (e.g., Neon, Supabase, Railway)
- **Caching/KV:** Upstash Redis (for rate limiting)
- **AI Service:** Google Gemini API
- **Monitoring:** Sentry

## Environment Configuration
Production requirement keys (see `.env.example` for format):

```bash
# Core
DATABASE_URL=...
DIRECT_URL=...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=...

# Services
GOOGLE_GENERATIVE_AI_API_KEY=...
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
PAYSTACK_SECRET_KEY=...

# Sentry (Build time)
SENTRY_ORG=...
SENTRY_PROJECT=...
SENTRY_AUTH_TOKEN=...
```

## Build Process
1.  **Linting:** `next lint` runs during build.
2.  **Type Check:** TypeScript validation runs.
3.  **Sentry Upload:** Source maps uploaded (hidden from client bundle).
4.  **Optimization:** Next.js optimizes images and fonts.

## CI/CD Pipeline
- **Branch Strategy:** Feature branches -> PR -> Main
- **Preview Deployments:** Vercel automatically deploys previews for PRs.
- **Production:** Push to main triggers production build.
