# ATDD Checklist - Epic 1: Foundation & Authentication

**Generated:** 2026-01-05
**Stories Covered:** 1.2, 1.3, 1.4
**Primary Test Level:** E2E (Playwright)
**Phase:** RED (All tests fail initially)

---

## Story Summary

| Story | Title | Tests Created | Priority |
|-------|-------|---------------|----------|
| 1.2 | User Login & Session Management | 5 E2E | P0-P1 |
| 1.3 | KYC Document Upload | 6 E2E | P0-P1 |
| 1.4 | Verified Badge Display | 5 E2E | P0-P2 |
| - | Password Hashing | 9 Unit | P1 |

**Total New Tests:** 25 scenarios

---

## Test Files Created

### E2E Tests (Playwright)

| File | Scenarios | Status |
|------|-----------|--------|
| `__tests__/e2e/auth-login.spec.ts` | 5 | 🔴 RED |
| `__tests__/e2e/auth-kyc-upload.spec.ts` | 6 | 🔴 RED |
| `__tests__/e2e/auth-verified-badge.spec.ts` | 5 | 🔴 RED |

### Unit Tests (Vitest/Jest)

| File | Scenarios | Status |
|------|-----------|--------|
| `__tests__/unit/password-hashing.test.ts` | 9 | 🔴 RED |

---

## Required data-testid Attributes

### Login Page (`/login`)

| Attribute | Element | Story |
|-----------|---------|-------|
| `email-input` | Email input field | 1.2 |
| `password-input` | Password input field | 1.2 |
| `login-button` | Submit button | 1.2 |
| `login-error` | Error message container | 1.2 |

### Dashboard (`/dashboard`)

| Attribute | Element | Story |
|-----------|---------|-------|
| `dashboard-header` | Main header element | 1.2 |

### Verification Settings (`/settings/verification`)

| Attribute | Element | Story |
|-----------|---------|-------|
| `kyc-upload-section` | Upload section container | 1.3 |
| `kyc-file-input` | File input element | 1.3 |
| `upload-success` | Success message | 1.3 |
| `upload-error` | Error message | 1.3 |
| `kyc-status` | Status badge/text | 1.3 |

### Published Property Page (`/p/{slug}`)

| Attribute | Element | Story |
|-----------|---------|-------|
| `verified-badge` | Verified Agent badge | 1.4 |

---

## Implementation Checklist

### Story 1.2: User Login & Session Management

#### Test: Login with valid credentials redirects to dashboard
- [ ] Create `/login` route (if not exists)
- [ ] Implement login form component with `data-testid` attributes
- [ ] Add email/password validation (Zod schema)
- [ ] Integrate NextAuth credentials provider
- [ ] Add `data-testid="email-input"`, `password-input`, `login-button`
- [ ] Implement redirect to `/dashboard` on success
- [ ] Run test: `pnpm test:e2e -- auth-login.spec.ts`
- [ ] ✅ Test passes (green phase)

#### Test: Login with invalid credentials shows error
- [ ] Add error state to login form
- [ ] Display error message from API
- [ ] Add `data-testid="login-error"`
- [ ] Run test: `pnpm test:e2e -- auth-login.spec.ts`
- [ ] ✅ Test passes

#### Test: Protected routes redirect to login
- [ ] Implement middleware for auth protection
- [ ] `/dashboard` requires authentication
- [ ] Unauthenticated users redirect to `/login`
- [ ] Run test
- [ ] ✅ Test passes

---

### Story 1.3: KYC Document Upload

#### Test: User can upload valid PDF document
- [ ] Create `/settings/verification` page
- [ ] Add file input component
- [ ] Implement file upload to Cloudinary (or backend)
- [ ] Add `data-testid="kyc-upload-section"`, `kyc-file-input`
- [ ] Update user `kyc_status` to "pending" on success
- [ ] Display `data-testid="kyc-status"` with current status
- [ ] Run test: `pnpm test:e2e -- auth-kyc-upload.spec.ts`
- [ ] ✅ Test passes

#### Test: Upload blocked for invalid file types
- [ ] Add client-side file type validation
- [ ] Only allow: PDF, JPG, PNG
- [ ] Display error for invalid types
- [ ] Add `data-testid="upload-error"`
- [ ] Run test
- [ ] ✅ Test passes

#### Test: Upload blocked for files >5MB
- [ ] Add client-side file size validation
- [ ] Block files exceeding 5MB BEFORE upload
- [ ] Show friendly error message
- [ ] Run test
- [ ] ✅ Test passes

---

### Story 1.4: Verified Badge Display

#### Test: Badge appears for verified users (P0 Critical)
- [ ] Add `verified-badge` component
- [ ] Fetch agent `kyc_status` with property data
- [ ] Conditionally render badge ONLY when `kyc_status === 'verified'`
- [ ] Add `data-testid="verified-badge"`
- [ ] Run test: `pnpm test:e2e -- auth-verified-badge.spec.ts`
- [ ] ✅ Test passes

#### Test: Badge NOT shown for pending/unverified/rejected
- [ ] Ensure conditional logic excludes all non-verified states
- [ ] Run tests for each state
- [ ] ✅ All tests pass

#### Test: Badge has Lagos Luxury styling
- [ ] Add shadow/gradient/border per design-compact.md
- [ ] Avoid flat monochrome icons
- [ ] Run test
- [ ] ✅ Test passes

---

## Red-Green-Refactor Workflow

### RED Phase ✅ (Complete)
- ✅ All tests written and failing
- ✅ data-testid requirements documented
- ✅ Mock patterns established

### GREEN Phase (DEV Team)
1. Pick one failing test
2. Implement minimal code to make it pass
3. Run test to verify green
4. Move to next test
5. Repeat until all tests pass

### REFACTOR Phase (DEV Team)
1. All tests passing (green)
2. Improve code quality
3. Extract duplications
4. Optimize performance
5. Ensure tests still pass

---

## Running Tests

```bash
# Run all E2E tests (will fail - RED phase)
pnpm test:e2e

# Run specific test file
pnpm test:e2e -- auth-login.spec.ts

# Run tests in headed mode (see browser)
pnpm test:e2e -- --headed

# Run unit tests
pnpm test

# Run specific unit test
pnpm test -- password-hashing
```

---

## Risk Mitigations Covered

| Risk ID | Description | Test Coverage |
|---------|-------------|---------------|
| R-001 | NDPR consent bypass | ✅ Existing in `auth-registration.spec.ts` |
| R-002 | Session hijacking | ✅ `auth-login.spec.ts` (session tests) |
| R-004 | Malicious file upload | ✅ `auth-kyc-upload.spec.ts` (file validation) |
| R-005 | Fake verified badge | ✅ `auth-verified-badge.spec.ts` (all states) |
| R-009 | Plaintext passwords | ✅ `password-hashing.test.ts` |

---

## Next Steps for DEV Team

1. **Run failing tests**: `pnpm test:e2e` to see all RED tests
2. **Review this checklist** for implementation tasks
3. **Add data-testid attributes** as documented above
4. **Implement one test at a time** (RED → GREEN)
5. **Run tests frequently** to verify progress
6. **Refactor with confidence** (tests provide safety net)
7. **Share progress** in daily standup

---

## Output Files

- Test Design: `_bmad-output/planning-artifacts/test-design-epic-1.md`
- ATDD Checklist: `_bmad-output/planning-artifacts/atdd-checklist-epic-1.md`
- E2E Tests: `__tests__/e2e/auth-*.spec.ts`
- Unit Tests: `__tests__/unit/password-hashing.test.ts`
