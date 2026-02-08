# Implementation Plan: Buildr Production Completion

<objective>
Execute a comprehensive implementation plan to complete Buildr for production launch, based on the expert panel audit findings. This plan addresses all 4 critical blockers and 10 high-priority items identified in the production readiness audit.

**End Goal**: A fully functional, production-ready template-based landing page builder for Nigerian real estate that completes the user journey from wizard → generation → preview → export/dashboard.

**Methodology**: TDD (Red-Green-Refactor) as required by project standards.
</objective>

<context>
## Audit Summary
- **Overall Readiness Score**: 6.5/10
- **Estimated Effort**: 60-80 hours
- **Critical Blockers**: 4 items
- **High Priority**: 10 items

## Tech Stack
- Next.js 14+ (App Router)
- TypeScript, Tailwind, shadcn/ui
- Zustand for state management
- Prisma + PostgreSQL
- Paystack for payments
- Upstash Redis for caching/rate limiting

## Key Files Reference
- Wizard: `src/components/wizard/guided-wizard.tsx`
- Templates: `src/lib/templates/`, `src/templates/`, `src/components/templates/`
- Types: `src/lib/templates/types.ts`
- Usage: `src/lib/usage.ts`
- Payments: `src/lib/payments/paystack.ts`

## Project Constraints (from .agent/memory/)
- Nigeria-First: Always Naira (₦), sqm, WhatsApp
- TDD Required: Red-Green-Refactor for all features
- Server Components First: "use client" requires justification
- Package Manager: pnpm only
</context>

<implementation_phases>

## Phase 1: Fix Critical Blockers (32h total)

### 1.1 Complete Wizard Step 3 - Style Picker (4h)
**Current State**: Shows "Style picker coming soon..." placeholder
**Target State**: Functional style picker using existing `STYLE_PRESETS` from `style-picker.tsx`

**TDD Approach**:
1. Write test: `__tests__/components/wizard/style-step.test.tsx`
   - Test that style presets render
   - Test selection updates wizard state
   - Test selected style persists to next step
2. Implement: Integrate `StylePicker` component into `guided-wizard.tsx` Step 3
3. Verify: Run `pnpm test` for component tests

**Files to Modify**:
- `src/components/wizard/guided-wizard.tsx` (line 159-162)
- `__tests__/components/wizard/guided-wizard.test.tsx`

---

### 1.2 Connect Generation Pipeline (8h)
**Current State**: `onComplete()` callback exists but does nothing
**Target State**: Wizard data → Template rendering → Preview page

**TDD Approach**:
1. Write test: `__tests__/lib/templates/generation.test.ts`
   - Test wizard data transforms to template props
   - Test template renders with correct data
   - Test generated HTML is valid
2. Implement:
   - Create `src/lib/templates/generator.ts` - orchestrates wizard → template
   - Modify `guided-wizard.tsx` to call generator
   - Create preview route `/preview/[id]`
3. Verify: Integration test for full flow

**Files to Create**:
- `src/lib/templates/generator.ts`
- `src/app/preview/[id]/page.tsx`
- `__tests__/lib/templates/generator.test.ts`

**Files to Modify**:
- `src/components/wizard/guided-wizard.tsx`

---

### 1.3 Build Minimal Dashboard (16h)
**Current State**: No dashboard exists after registration
**Target State**: Users can view, manage, and re-export generated pages

**TDD Approach**:
1. Write tests:
   - `__tests__/app/dashboard/page.test.tsx` - renders user's pages
   - `__tests__/api/projects.test.ts` - CRUD operations
2. Implement:
   - Database: Add `Project` model to Prisma schema
   - API: `/api/projects` CRUD endpoints
   - UI: `/dashboard` page with project list
   - UI: Project cards with preview thumbnails
3. Verify: E2E test for dashboard flow

**Files to Create**:
- `prisma/schema.prisma` (add Project model)
- `src/app/dashboard/page.tsx`
- `src/app/dashboard/layout.tsx`
- `src/components/dashboard/project-card.tsx`
- `src/components/dashboard/project-list.tsx`
- `src/app/api/projects/route.ts`
- `src/app/api/projects/[id]/route.ts`

---

### 1.4 Implement Export Functionality (4h)
**Current State**: Export exists but not connected to wizard flow
**Target State**: Users can download HTML/ZIP of generated page

**TDD Approach**:
1. Write test: `__tests__/api/export.test.ts`
   - Test HTML export includes all assets
   - Test ZIP contains correct files
   - Test WhatsApp links are preserved
2. Implement:
   - Enhance `/api/export` to accept project ID
   - Add download buttons to dashboard and preview
3. Verify: Manual download and open in browser

**Files to Modify**:
- `src/app/api/export/route.ts`
- `src/app/preview/[id]/page.tsx`
- `src/components/dashboard/project-card.tsx`

---

## Phase 2: High Priority Items (40h total)

### 2.1 Consolidate Template Systems (8h)
**Problem**: Three template locations cause confusion
**Solution**: Single source of truth in `src/lib/templates/`

**Tasks**:
1. Move `src/templates/` contents → `src/lib/templates/components/`
2. Deprecate `src/components/templates/` (keep registry reference)
3. Convert `mvp.ts` string templates to React components
4. Update all imports

**Files to Modify/Move**:
- `src/templates/luxury/` → `src/lib/templates/components/luxury/`
- `src/templates/standard/` → `src/lib/templates/components/standard/`
- `src/lib/templates/mvp.ts` (convert to components)
- `src/lib/templates/index.ts` (update exports)

---

### 2.2 Add Loading/Success States (4h)
**Problem**: No feedback during generation
**Solution**: Skeleton loaders, progress indicators, success modal

**Files to Create**:
- `src/components/ui/generation-progress.tsx`
- `src/components/ui/success-modal.tsx`
- `src/components/ui/skeleton-preview.tsx`

**Files to Modify**:
- `src/components/wizard/guided-wizard.tsx`

---

### 2.3 Add Error Monitoring - Sentry (2h)
**Command**: `pnpm add @sentry/nextjs`

**Files to Create**:
- `sentry.client.config.ts`
- `sentry.server.config.ts`
- `sentry.edge.config.ts`
- `src/app/global-error.tsx`

**Files to Modify**:
- `next.config.ts`
- `.env.example` (add SENTRY_DSN)

---

### 2.4 Fix E2E Test Soft Assertions (4h)
**Problem**: `expect(x || true).toBe(true)` defeats testing purpose
**Solution**: Replace with proper conditional assertions

**Files to Modify**:
- `__tests__/e2e/user-journey.spec.ts` (lines 47, 58, 71, 93)
- `__tests__/e2e/mobile.spec.ts` (audit all)
- `__tests__/e2e/accessibility.spec.ts` (audit all)

---

### 2.5 Add Email Capture on Landing Page (2h)
**Solution**: Pre-registration email capture with "Get Early Access"

**Files to Create**:
- `src/components/marketing/email-capture.tsx`
- `src/app/api/waitlist/route.ts`

**Files to Modify**:
- `src/app/page.tsx` (add before pricing section)

---

### 2.6 Enforce Usage Limits (4h)
**Problem**: `src/lib/usage.ts` exists but not integrated
**Solution**: Check limits before generation, show upgrade modal

**Files to Create**:
- `src/components/ui/upgrade-modal.tsx`

**Files to Modify**:
- `src/lib/templates/generator.ts` (add limit check)
- `src/components/wizard/guided-wizard.tsx`

---

### 2.7 Real Template Thumbnails (4h)
**Problem**: Placeholder icons instead of previews
**Solution**: Generate static preview images or use React server rendering

**Approach**: 
- Option A: Static screenshots in `/public/templates/`
- Option B: Dynamic React rendering to image (puppeteer)

**Files to Modify**:
- `src/components/wizard/template-selector.tsx` (line 123-126)
- `src/lib/templates/registry.ts` (add thumbnail paths)

---

### 2.8 Add RC Number Field (2h)
**Problem**: Trust signal not collected from users
**Solution**: Add to wizard Step 4 (WhatsApp step) or as optional field

**Files to Modify**:
- `src/components/wizard/whatsapp-config.tsx`
- `src/components/wizard/guided-wizard.tsx` (WizardData interface)

---

### 2.9 Add Analytics Tracking (4h)
**Command**: `pnpm add @vercel/analytics`

**Files to Create**:
- `src/lib/analytics.ts` (wrapper for events)

**Files to Modify**:
- `src/app/layout.tsx`
- `src/components/wizard/guided-wizard.tsx` (track completion)
- `src/app/page.tsx` (track CTA clicks)

---

### 2.10 Add Social Proof - Testimonials (4h)
**Solution**: Add testimonials section to landing page

**Files to Create**:
- `src/components/marketing/testimonials.tsx`
- `src/lib/data/testimonials.ts` (static data)

**Files to Modify**:
- `src/app/page.tsx` (add between features and pricing)

---

## Phase 3: Medium Priority (Post-Beta) (31h total)

| Item | Effort | Files |
|------|--------|-------|
| Nigerian locations autocomplete | 4h | `location-selector.tsx` |
| Wizard state persistence (Zustand) | 4h | `src/lib/stores/wizard-store.ts` |
| WhatsApp validation relaxation | 1h | `whatsapp-config.tsx` |
| SEO metadata | 2h | `src/app/layout.tsx`, `src/app/metadata.ts` |
| Feature flags system | 8h | `src/lib/feature-flags.ts` |
| Celebration animation | 4h | `src/components/ui/confetti.tsx` |
| Try without signup demo | 8h | New route + session storage |

</implementation_phases>

<execution_order>
## Recommended Execution Sequence

### Week 1: Critical Path (MVP Launch)
```
Day 1-2:
├── 1.1 Complete Style Picker (4h)
└── 1.2 Connect Generation Pipeline (8h)

Day 3-4:
└── 1.3 Build Dashboard - Part 1 (8h)
    ├── Prisma schema
    ├── API endpoints
    └── Basic list UI

Day 5:
├── 1.3 Build Dashboard - Part 2 (8h)
│   └── Polish + project cards
└── 1.4 Export Functionality (4h)
```

### Week 2: Stabilization (Beta Launch)
```
Day 6:
├── 2.3 Sentry Integration (2h)
├── 2.9 Analytics (4h)
└── 2.6 Usage Limits (4h)

Day 7:
├── 2.2 Loading States (4h)
└── 2.4 Fix E2E Tests (4h)

Day 8:
├── 2.1 Template Consolidation (8h)
└── Tests + Bug fixes

Day 9:
├── 2.5 Email Capture (2h)
├── 2.8 RC Number Field (2h)
└── 2.10 Testimonials (4h)

Day 10:
├── 2.7 Template Thumbnails (4h)
└── Final testing + deployment prep
```
</execution_order>

<verification>
## Definition of Done (Per Item)

- [ ] Test written BEFORE implementation (TDD Red)
- [ ] Implementation passes test (TDD Green)
- [ ] Code refactored for clarity (TDD Refactor)
- [ ] No TypeScript errors (`pnpm build`)
- [ ] Linting passes (`pnpm lint`)
- [ ] Related E2E test passes if applicable
- [ ] Verified at 375px mobile width
- [ ] Nigeria-First compliance (₦, sqm, WhatsApp)
- [ ] "use client" justified in comments if used

## Full Verification Commands
```bash
pnpm test              # Unit tests
pnpm build             # Type checking + build
pnpm test:e2e          # E2E tests
pnpm lint              # Linting
```
</verification>

<success_criteria>
## Launch Readiness Checklist

### MVP Launch (End of Week 1)
- [ ] User can complete 4-step wizard with working style picker
- [ ] User can generate a page and see preview
- [ ] User can access dashboard and view generated pages
- [ ] User can download HTML/ZIP export
- [ ] Free tier limit (3 pages) is enforced

### Beta Launch (End of Week 2)
- [ ] Sentry captures errors in production
- [ ] Analytics tracks key events (registration, generation, export)
- [ ] Loading states visible during generation
- [ ] E2E tests pass without soft assertions
- [ ] Testimonials visible on landing page
- [ ] Email capture form works

### Metrics to Validate Success
- Generation success rate > 95%
- Time to first preview < 3 seconds
- Export completion rate > 80%
- No critical Sentry errors in first 24h
</success_criteria>

<output>
This implementation plan should be saved to the project artifacts and used to generate individual TDD tickets for each item.

**Next Steps**:
1. Create `task.md` with checklist based on this plan
2. Generate individual prompts for each Phase 1 item
3. Execute in sequence using /implement-ticket workflow
</output>
