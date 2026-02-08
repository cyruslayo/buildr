# Test Design: Epic 1 - Foundation & Authentication

**Epic ID:** 1
**Design Level:** Full
**Generated:** 2026-01-05
**Test Architect:** TEA (Test Engineer Agent)

---

## Overview

Epic 1 establishes the authentication foundation and trust signals for Buildr. This is a **high-risk epic** because:
- Authentication vulnerabilities could expose user data and violate NDPR
- Multi-tenancy isolation failures could leak data between competing agencies
- Trust signal defects (Verified Badge) directly impact platform credibility in Nigeria's low-trust market

---

## Risk Assessment Matrix

| Risk ID | Category | Description | Probability | Impact | Score | Mitigation | Owner |
|---------|----------|-------------|-------------|--------|-------|------------|-------|
| R-001 | SEC | NDPR consent bypass - users registered without explicit consent | 2 | 3 | **6** | Server-side validation + E2E tests + ConsentLog audit | QA |
| R-002 | SEC | Auth session hijacking via cookie manipulation | 1 | 3 | 3 | NextAuth secure cookies + middleware validation | Dev |
| R-003 | DATA | ConsentLog missing timestamp or corrupted data | 2 | 2 | 4 | Unit tests for ConsentLog creation + DB constraints | Dev |
| R-004 | SEC | KYC document upload path traversal / malicious file | 2 | 3 | **6** | Cloudinary sanitization + file type validation | Dev |
| R-005 | BUS | Verified badge displayed for unverified users | 2 | 3 | **6** | E2E test for badge logic + conditional rendering | QA |
| R-006 | SEC | Multi-tenant leak - User A sees User B's data | 2 | 3 | **6** | Middleware teamId injection + isolation tests | Dev |
| R-007 | TECH | Auth flow breaks on slow 3G (timeout) | 2 | 2 | 4 | Loading states + error handling + network tests | QA |
| R-008 | OPS | Registration rate limiting bypass (abuse) | 1 | 2 | 2 | Rate limit middleware (existing) | Dev |
| R-009 | DATA | Password stored in plaintext | 1 | 3 | 3 | Unit test for password hashing | Dev |
| R-010 | BUS | User cannot recover from failed registration | 2 | 2 | 4 | Error message clarity + retry logic | QA |

### High-Priority Risks (Score ≥6)

> [!CAUTION]
> **4 Critical Risks Identified:**
> - **R-001 (NDPR bypass)**: Legal compliance violation - mandatory E2E coverage
> - **R-004 (Malicious file upload)**: Security vulnerability - validation required
> - **R-005 (Fake verified badge)**: Trust signal failure - business critical
> - **R-006 (Multi-tenant leak)**: Data breach risk - isolation mandatory

---

## Coverage Matrix

### Story 1.1: User Registration with NDPR Consent

| Requirement | Test Level | Priority | Risk Link | Test Count | Status |
|-------------|------------|----------|-----------|------------|--------|
| Registration form submits with valid data | E2E | P0 | - | 1 | ✅ Exists |
| NDPR consent checkbox prevents submission when unchecked | E2E | P0 | R-001 | 1 | ✅ Exists |
| NDPR checkbox has Lagos Luxury styling | E2E | P2 | - | 1 | ✅ Exists |
| ConsentLog created with timestamp | Unit | P0 | R-003 | 1 | ✅ Exists |
| ConsentLog NOT created when consent false | Unit | P1 | R-003 | 1 | ✅ Exists |
| Password is hashed before storage | Unit | P1 | R-009 | 0 | ❌ Missing |
| Registration fails gracefully on server error | E2E | P2 | R-010 | 0 | ❌ Missing |
| Duplicate email shows clear error | E2E | P1 | - | 0 | ❌ Missing |

**Coverage Status:** 5/8 scenarios covered (62.5%)

---

### Story 1.2: User Login & Session Management

| Requirement | Test Level | Priority | Risk Link | Test Count | Status |
|-------------|------------|----------|-----------|------------|--------|
| Login redirects to dashboard on success | E2E | P0 | - | 0 | ❌ Missing |
| Login shows error for invalid credentials | E2E | P1 | - | 0 | ❌ Missing |
| Session persists across page refreshes | E2E | P1 | R-002 | 0 | ❌ Missing |
| Protected routes redirect to login when unauthenticated | E2E | P0 | R-002 | 0 | ❌ Missing |
| Session expires after timeout duration | E2E | P2 | R-002 | 0 | ❌ Missing |
| Login works on slow 3G network | E2E | P1 | R-007 | 0 | ❌ Missing |

**Coverage Status:** 0/6 scenarios covered (0%)

---

### Story 1.3: KYC Document Upload for Verification

| Requirement | Test Level | Priority | Risk Link | Test Count | Status |
|-------------|------------|----------|-----------|------------|--------|
| User can upload PDF/JPG/PNG document | E2E | P0 | - | 0 | ❌ Missing |
| Upload blocked for invalid file types | Unit + E2E | P0 | R-004 | 0 | ❌ Missing |
| Upload blocked for files >5MB | Unit + E2E | P1 | R-004 | 0 | ❌ Missing |
| kyc_status changes to "pending" after upload | API | P1 | - | 0 | ❌ Missing |
| EXIF metadata stripped from uploaded images | Unit | P2 | NFR5 | 0 | ❌ Missing |
| Error message shown for failed upload | E2E | P2 | R-010 | 0 | ❌ Missing |

**Coverage Status:** 0/6 scenarios covered (0%)

---

### Story 1.4: Verified Badge Display

| Requirement | Test Level | Priority | Risk Link | Test Count | Status |
|-------------|------------|----------|-----------|------------|--------|
| Badge appears on published page when kyc_status="verified" | E2E | P0 | R-005 | 0 | ❌ Missing |
| Badge NOT shown when kyc_status="pending" | E2E | P0 | R-005 | 0 | ❌ Missing |
| Badge NOT shown when kyc_status="unverified" | E2E | P0 | R-005 | 0 | ❌ Missing |
| Badge has correct Lagos Luxury styling | E2E | P2 | - | 0 | ❌ Missing |

**Coverage Status:** 0/4 scenarios covered (0%)

---

## Test Levels Summary

| Test Level | Count | Purpose | Tooling |
|------------|-------|---------|---------|
| **E2E** | 18 scenarios | Critical user journeys, visual validation | Playwright |
| **API** | 2 scenarios | Service contracts, backend validation | Playwright API |
| **Unit** | 6 scenarios | Business logic, edge cases, hashing | Vitest/Jest |

### Test Level Distribution

```
Unit       ████████░░░░░░░░░░░░ 23%
API        ██░░░░░░░░░░░░░░░░░░  8%
E2E        ██████████████████░░ 69%
```

**Rationale:** High E2E ratio is appropriate for Epic 1 because:
1. Authentication flows are user-facing and critical
2. Trust signals (badges) require visual validation
3. NDPR compliance must be verified through actual user interaction

---

## Priority Classification

### P0 (Critical) - Run on Every Commit
- Registration with NDPR consent completes successfully
- Registration blocked without NDPR consent
- ConsentLog created with timestamp
- Login redirects to dashboard
- Protected routes require authentication
- Verified badge shows only for verified users
- KYC file type validation

**Total P0:** 7 scenarios

### P1 (High) - Run on PR to Main
- Duplicate email error handling
- Session persistence
- Password hashing
- KYC file size validation
- Login on slow 3G
- Invalid credentials error

**Total P1:** 6 scenarios

### P2 (Medium) - Run Nightly
- Lagos Luxury badge styling
- EXIF metadata stripping
- Session expiry
- Error message clarity
- Registration error handling

**Total P2:** 5 scenarios

### P3 (Low) - Run On-Demand
- Visual regression tests
- Performance benchmarks

**Total P3:** 2 scenarios (future scope)

---

## Execution Order

### Smoke Tests (<5 min)
1. Registration form renders
2. Login form renders
3. Dashboard protected route redirects

### P0 Tests (<10 min)
1. AC1: Registration with NDPR consent
2. AC2: Registration blocked without consent
3. ConsentLog creation
4. Login success redirect
5. Protected route enforcement
6. Verified badge conditional display (x3)

### P1 Tests (<30 min)
1. Password hashing
2. Duplicate email handling
3. Session persistence
4. KYC file size validation
5. Slow 3G login
6. Invalid credentials error

### P2/P3 Tests (<60 min)
1. Lagos Luxury styling validation
2. EXIF stripping
3. Session timeout
4. Error message usability

---

## Test Data Requirements

### User Accounts (Fixtures)
| Fixture | Description | Usage |
|---------|-------------|-------|
| `unverifiedUser` | Fresh user, no KYC | Default registration test |
| `verifiedUser` | kyc_status="verified" | Badge display tests |
| `pendingUser` | kyc_status="pending" | Badge absence tests |
| `existingUser` | Already registered | Duplicate email tests |

### File Fixtures
| Fixture | Description | Size | Usage |
|---------|-------------|------|-------|
| `valid-rcn.pdf` | Valid RC Number document | 100KB | KYC upload success |
| `valid-nin.jpg` | Valid NIN document | 200KB | KYC upload success |
| `oversized.pdf` | Document exceeding limit | 6MB | Size validation |
| `malicious.exe` | Invalid file type | 50KB | Type validation |

---

## Quality Gate Criteria

### Epic 1 Completion Gates

```markdown
✅ P0 pass rate: 100% (all 7 scenarios)
✅ P1 pass rate: ≥95% (at least 5/6 scenarios)
✅ High-risk mitigations: 100% (R-001, R-004, R-005, R-006 covered)
✅ Coverage: ≥80% for critical paths (auth flow)
```

### Definition of Done

- [ ] All P0 tests written and passing
- [ ] All P1 tests written and passing
- [ ] Risk R-001 (NDPR bypass) has E2E + Unit coverage
- [ ] Risk R-005 (Fake badge) has E2E coverage for all kyc states
- [ ] No high-risk items unmitigated
- [ ] Tests run in CI pipeline

---

## Coverage Gaps Summary

### Existing Coverage (5 tests)
| Test File | Scenarios | Priority |
|-----------|-----------|----------|
| `auth-registration.spec.ts` | 4 E2E | P0-P2 |
| `consent.test.ts` | 2 Unit | P0-P1 |

### Missing Coverage (19 scenarios)

| Story | Missing Tests | Priority |
|-------|---------------|----------|
| 1.1 | Password hashing, duplicate email, error handling | P1-P2 |
| 1.2 | All login/session tests (6) | P0-P2 |
| 1.3 | All KYC upload tests (6) | P0-P2 |
| 1.4 | All verified badge tests (4) | P0-P2 |

> [!WARNING]
> **Critical Gap:** Stories 1.2, 1.3, and 1.4 have **zero test coverage**.
> Recommend prioritizing P0 tests for these stories before moving to Epic 2.

---

## Recommendations

### Immediate Actions (Before Story 1.2 Implementation)

1. **Create login E2E tests** - Story 1.2 is marked as `backlog`, tests should be written first (TDD)
2. **Add password hashing unit test** - Verify bcrypt/argon2 is used
3. **Setup test fixtures** - Create user factories for different kyc states

### Sprint 0 Tasks

1. **Test data seeding** - Prisma seed script for test users
2. **CI configuration** - Ensure P0 tests run on every commit
3. **Playwright config review** - Confirm network throttling for 3G tests

### Integration Recommendations

1. **Security scan** - Run OWASP ZAP on auth endpoints
2. **Rate limit validation** - Verify registration cannot be brute-forced
3. **Multi-tenant isolation test** - Write explicit cross-tenant access tests

---

## Appendix: NFR Coverage

| NFR | Covered By | Status |
|-----|------------|--------|
| NFR4 (Team Isolation) | Multi-tenant access tests (not yet written) | ❌ Gap |
| NFR6 (Consent Logs) | `consent.test.ts` | ✅ Covered |

---

## Output Summary

**Epic**: 1 (Foundation & Authentication)
**Scope**: Full design

**Risk Assessment**:
- Total risks identified: 10
- High-priority risks (≥6): 4
- Categories: SEC (5), DATA (2), BUS (2), TECH (1), OPS (1)

**Coverage Plan**:
- P0 scenarios: 7
- P1 scenarios: 6
- P2/P3 scenarios: 7
- **Total scenarios**: 20

**Test Levels**:
- E2E: 18
- API: 2
- Unit: 6

**Current Coverage**: 5/24 scenarios (21%)

**Quality Gate Criteria**:
- P0 pass rate: 100%
- P1 pass rate: ≥95%
- High-risk mitigations: 100%
- Coverage: ≥80%

**Next Steps**:
1. Review risk assessment with team
2. Prioritize mitigation for high-risk items (R-001, R-004, R-005, R-006)
3. Write P0 tests for Stories 1.2-1.4 before implementation
4. Run `*atdd` workflow to generate failing tests for P0 scenarios
5. Set up test data factories and fixtures
