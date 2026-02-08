# Story 1.4: Verified Badge Display

Status: done

## Story

**As a** verified agent,
**I want** my published pages to show a "Verified" badge,
**So that** potential buyers trust my listings.

## Acceptance Criteria

### AC1: Badge appears when kyc_status = "verified"
**Given** A published property page by a verified agent
**When** I view the published property page
**Then** The public page displays a visible "Verified Agent" badge

### AC2: Badge NOT shown when kyc_status = "pending"
**Given** A published property page by an agent with pending verification
**When** I view the published property page
**Then** No verified badge is displayed

### AC3: Badge NOT shown when kyc_status = "unverified"
**Given** A published property page by an unverified agent
**When** I view the published property page
**Then** No verified badge is displayed

### AC4: Badge NOT shown when kyc_status = "rejected"
**Given** A published property page by a rejected agent
**When** I view the published property page
**Then** No verified badge is displayed

### AC5: Badge has Lagos Luxury styling
**Given** A verified agent's published property page
**When** I view the verified badge
**Then** The badge has shadow/gradient/border (not flat monochrome)

## Tasks / Subtasks

- [x] Task 1: Create VerifiedBadge Component
  - [x] 1.1 Create component with `data-testid="verified-badge"`
  - [x] 1.2 Apply Lagos Luxury styling (shadow, gradient, border)
  - [x] 1.3 Conditional rendering based on kyc_status

- [x] Task 2: Create Public Property Page
  - [x] 2.1 Create `/p/[slug]` dynamic route
  - [x] 2.2 Fetch property data from API
  - [x] 2.3 Display agent info with verified badge

- [x] Task 3: Create Property API Endpoint
  - [x] 3.1 Create `/api/property/[id]` route
  - [x] 3.2 Return property with agent kyc_status

- [x] Task 4: Verify Tests Pass
  - [x] 4.1 Run `pnpm test:e2e -- auth-verified-badge.spec.ts`
  - [x] 4.2 All 5 tests should pass

## Dev Notes

### Risk Mitigation
- **R-005 (Score 6)**: Verified badge for unverified users is a CRITICAL trust signal
- Badge MUST only render when `kyc_status === 'verified'`

### Lagos Luxury Styling Requirements
Per design-compact.md:
- Badge MUST have depth (shadow, gradient, or border)
- NO flat monochrome icons for trust signals

### Architecture Notes
- VerifiedBadge is a Server Component (no `'use client'`)
- Public property page uses client-side data fetching for dynamic route
- API returns lowercase kyc_status for frontend consistency

---

## Dev Agent Record

### Agent Model Used
Code Review Agent (Gemini 2.5 Pro)

### Implementation Status
All implementation verified present and functional:
- ✅ VerifiedBadge component with conditional rendering
- ✅ R-005 mitigation: only shows when `kyc_status.toLowerCase() === 'verified'`
- ✅ Lagos Luxury styling: gradient, shadow, ring, border (not flat)
- ✅ Public property page at `/p/[slug]`
- ✅ Property API at `/api/property/[id]` returns agent kyc_status
- ✅ E2E tests with mocked API responses

### Completion Notes
- 📋 `data-testid="verified-badge"` present on component
- 🎨 Emerald gradient + shadow + ring effects per Lagos Luxury spec
- 🔒 CRITICAL trust signal protected - only verified agents get badge
- 📱 Three size variants (sm, md, lg) for responsive use
- ⚠️ Note: Public page is `'use client'` for dynamic fetching

### File List
- `src/components/trust/verified-badge.tsx` - Badge component (67 lines)
- `src/app/p/[slug]/page.tsx` - Public property page (137 lines)
- `src/app/api/property/[id]/route.ts` - Property API (52 lines)
- `__tests__/e2e/auth-verified-badge.spec.ts` - 5 E2E tests

### Change Log

**2026-01-09 - Code Review**
- Verified all implementation files present and matching acceptance criteria
- Updated story file to reflect actual completion status
- All 4 tasks verified complete
- Badge correctly handles all KycStatus values (VERIFIED, PENDING, NONE, REJECTED)

