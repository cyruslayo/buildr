# Story 1.3: KYC Document Upload for Verification

Status: done

## Story

**As a** registered agent,
**I want** to upload my RC Number (Corporate) or NIN (Individual) document,
**So that** I can apply for "Verified" status and unlock premium features.

## Acceptance Criteria

### AC1: User can upload valid PDF document
**Given** I am logged in and on /settings/verification
**When** I upload a valid PDF document (<5MB)
**Then** The document is stored and my kyc_status becomes "pending"

### AC2: User can upload valid JPG image
**Given** I am logged in and on /settings/verification
**When** I upload a valid JPG image (<5MB)
**Then** Upload succeeds and status becomes "pending"

### AC3: Upload blocked for invalid file types
**Given** I am on the verification settings page
**When** I try to upload an invalid file type (EXE, etc.)
**Then** The upload is blocked and I see an error message

### AC4: Upload blocked for files exceeding 5MB
**Given** I am on the verification settings page
**When** I try to upload a file exceeding 5MB
**Then** The upload is blocked client-side with a friendly error

### AC5: Error message shown for failed upload
**Given** Network failure occurs during upload
**When** I try to upload a valid file
**Then** I see a clear error message explaining the issue

### AC6: Confirmation message shown after successful upload
**Given** I upload a valid document
**Then** I see a confirmation message with "pending review" status

## Tasks / Subtasks

- [x] Task 1: Prisma Schema Updates
  - [x] 1.1 Add kycDocument and kycStatus fields to User model
  - [x] 1.2 Run prisma generate

- [x] Task 2: Settings Verification Page (AC: #1-6)
  - [x] 2.1 Create `/settings/verification` route
  - [x] 2.2 Add `data-testid` attributes: `kyc-upload-section`, `kyc-file-input`, `kyc-status`
  - [x] 2.3 Add `upload-success` and `upload-error` message containers
  - [x] 2.4 Style with Lagos Luxury depth

- [x] Task 3: File Upload Component
  - [x] 3.1 Create KYCUploadForm client component
  - [x] 3.2 Implement file type validation (PDF, JPG, PNG only)
  - [x] 3.3 Implement file size validation (max 5MB)
  - [x] 3.4 Display appropriate error messages

- [x] Task 4: Upload API Endpoint
  - [x] 4.1 Create `/api/kyc/upload` POST route
  - [x] 4.2 Save file reference to database (MVP: filename only)
  - [x] 4.3 Update user kycStatus to "pending"
  - [x] 4.4 Return success/error response

- [x] Task 5: Verify Tests Pass
  - [x] 5.1 Run `pnpm test:e2e -- auth-kyc-upload.spec.ts`
  - [x] 5.2 All 6 tests should pass (GREEN phase)

## Dev Notes

### Required data-testid Attributes
- `kyc-upload-section` - Main upload section container
- `kyc-file-input` - File input element
- `kyc-status` - Status badge/text
- `upload-success` - Success message container
- `upload-error` - Error message container

### File Validation Rules
- Allowed types: PDF, JPG/JPEG, PNG
- Max file size: 5MB (5 * 1024 * 1024 bytes)
- Error messages must match test regex patterns

### Architecture Compliance
- **Feature Co-Location**: KYC code in `src/features/kyc/`
- **Server Components First**: Page is RSC, form is client component
- **Mobile-First**: Form must work at 375px

### Risk Mitigation
- **R-004 (Malicious file upload)**: Server-side file type validation
- Content-Type verification, not just extension

---

## Dev Agent Record

### Agent Model Used
Code Review Agent (Gemini 2.5 Pro)

### Implementation Status
All implementation verified present and functional:
- ✅ Prisma schema has `kycDocument` and `kycStatus` fields on User model
- ✅ Settings verification page at `/settings/verification` with Server Component
- ✅ KYCUploadForm client component with all validations
- ✅ API route at `/api/kyc/upload` with server-side validation
- ✅ E2E tests at `__tests__/e2e/auth-kyc-upload.spec.ts`

### Completion Notes
- 📋 All data-testid attributes present per spec
- 🔒 Server-side file type/size validation (R-004 mitigation)
- 📱 Lagos Luxury styling applied with shadows and gradients
- ⚠️ MVP: File stored as filename reference only (production would use Cloudinary)

### File List
- `prisma/schema.prisma` - kycDocument, kycStatus fields on User
- `src/features/kyc/components/kyc-upload-form.tsx` - Client component (217 lines)
- `src/app/settings/verification/page.tsx` - Server Component page (127 lines)
- `src/app/api/kyc/upload/route.ts` - POST endpoint (87 lines)
- `__tests__/e2e/auth-kyc-upload.spec.ts` - 6 E2E tests

### Change Log

**2026-01-09 - Code Review**
- Verified all implementation files present and matching acceptance criteria
- Updated story file to reflect actual completion status
- All 6 tasks verified complete

