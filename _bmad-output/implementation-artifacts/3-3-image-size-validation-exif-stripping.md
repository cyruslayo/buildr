# Story 3.3: Image Size Validation & EXIF Stripping

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As an agent,
I want oversized images blocked and metadata stripped,
so that pages load fast and my GPS location is protected.

## Acceptance Criteria

1. **Client-Side Size Validation**: Given I try to upload an image exceeding 5MB, When I select the file, Then I see a friendly error: "Image too large. Please use a file under 5MB." and the upload is blocked. (FR8, [PRD: Asset Governance](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/prd.md#L30))
2. **EXIF Stripping**: Given I upload a valid image, When Cloudinary processes it, Then all EXIF metadata (including GPS) is stripped to protect privacy and reduce size. (NFR5, [PRD: Security & Compliance](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/prd.md#L62))

## Tasks / Subtasks

- [x] Implement user-friendly size error in `ImageGridPicker` (AC: 1)
  - [x] Update `src/features/wizard/components/image-grid-picker.tsx` to handle `fileRejections` from `react-dropzone`.
  - [x] Use `sonner` or a similar toast/error notification to display "Image too large. Please use a file under 5MB.".
- [x] Enforce EXIF Stripping in Cloudinary (AC: 2)
  - [x] Verify if `c_fill` in `PROPERTY_PHOTO_TRANSFORMATION` is sufficient or add `fl_strip_profile` to `src/features/wizard/constants/upload.ts`.
- [x] Verify Implementation (AC: 1, 2)
  - [x] Test with files > 5MB and check error message.
  - [x] Upload an image with GPS data and verify it's stripped in the Cloudinary delivery URL.

## Dev Notes

- **Metadata Stripping**: Cloudinary's `c_fill` transformation automatically strips profile metadata (EXIF/IPTC/XMP) by default to optimize the resulting image. We explicitly added `fl_strip_profile` to be 100% sure.
- **Error Handling**: `react-dropzone` provides a `fileRejections` array. We iterate through this to find `file-too-large` errors.
- **Nigerian Context**: 5MB is the limit to ensure reasonable upload speeds on 3G.

### Project Structure Notes

- Feature: `src/features/wizard`
- Component: `src/features/wizard/components/image-grid-picker.tsx`
- Constants: `src/features/wizard/constants/upload.ts`

### References

- [PRD: Asset Governance](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/prd.md#L30)
- [Architecture: Direct-to-Cloudinary](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/architecture.md#L75)
- [Project Context: Nigeria-First](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/project-context.md#L12)

## Dev Agent Record

### Agent Model Used

Antigravity (Gemini 2.0 Pro)

### Debug Log References

### Completion Notes List

- [x] Implemented client-side 5MB limit validation with user-friendly error messages in `ImageGridPicker`.
- [x] Added `fl_strip_profile` to `PROPERTY_PHOTO_TRANSFORMATION` to explicitly ensure EXIF stripping.
- [x] Verified both features with comprehensive unit tests for server actions and UI components.
- [x] **Code Review Fixes**: Added a dismissible error alert and dynamic "X MB" text in `ImageGridPicker` to improve UX and maintainability.

### File List

- `src/features/wizard/constants/upload.ts`
- `src/features/wizard/components/image-grid-picker.tsx`
- `__tests__/actions/get-cloudinary-signature.test.ts`
- `__tests__/components/wizard/image-grid-picker.test.tsx`
