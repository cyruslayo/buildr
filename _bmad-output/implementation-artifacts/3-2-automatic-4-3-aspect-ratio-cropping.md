# Story 3.2: Automatic 4:3 Aspect Ratio Cropping

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As an agent uploading photos,
I want my images automatically cropped to 4:3 aspect ratio,
so that all listings look consistent and professional.

## Acceptance Criteria

1. **Automatic 4:3 Crop**: Given I upload an image with a non-4:3 aspect ratio, When the upload completes, Then Cloudinary automatically crops/resizes to 4:3 using "fill" mode. (FR7, [PRD: Asset Governance](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/prd.md#L188))
2. **Visual Consistency**: Given I see the preview, When the image displays, Then it matches the 4:3 aspect ratio used on published pages. (UX5, [UX: ImageGridPicker](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/ux-design-specification.md#L276-282))

## Tasks / Subtasks

- [x] Update Cloudinary signature to include 4:3 crop (AC: 1)
  - [x] Modify `src/features/wizard/actions/get-cloudinary-signature.ts` to include `transformation: 'c_fill,ar_4:3'` in the signature.
- [x] Enforce 4:3 crop during client-side upload (AC: 1)
  - [x] Update `src/features/wizard/components/steps/photo-step.tsx` to pass the `transformation` parameter in the `FormData`.
- [x] Update UI Aspect Ratio (AC: 2)
  - [x] Update `src/features/wizard/components/image-grid-picker.tsx` to use `aspect-[4/3]` instead of `aspect-square`.
- [x] Verify Implementation (AC: 1, 2)
  - [x] Update `__tests__/actions/get-cloudinary-signature.test.ts` to check for transformation signing.
  - [x] Perform manual upload test with non-4:3 images.
- [x] Follow-up (AI Review)
  - [x] Move hardcoded transformation to shared constants.
  - [x] Fix memory leaks in `PhotoStep` (preview cleanup).
  - [x] Ensure mobile/desktop aspect ratio consistency.

## Dev Notes

- **Cloudinary Transformation**: The transformation string should be `c_fill,ar_4:3`. This ensures that the image fills the 4:3 box, cropping the excess.
- **Tailwind Aspect Ratio**: Ensure `aspect-[4/3]` is used for consistent layout. Standard Tailwind 3.4+ supports this out of the box.
- **Optimistic Updates**: Maintain the optimistic preview pattern established in Story 3.1.
- **Governance**: Shared constants in `src/features/wizard/constants/upload.ts` govern system-wide transformations.

### Project Structure Notes

- Feature: `src/features/wizard`
- Component: `src/features/wizard/components/image-grid-picker.tsx`
- Action: `src/features/wizard/actions/get-cloudinary-signature.ts`
- Constants: `src/features/wizard/constants/upload.ts`

### References

- [Architecture: Asset Governance](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/architecture.md#L27)
- [UX: Auto-Correction](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/ux-design-specification.md#L50)
- [PRD: Aggressive Asset Governance](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/prd.md#L26)

## Senior Developer Review (Adversarial Audit)

### 🔴 Critical Issues
- None found. Core AR logic is sound.

### 🟡 Medium Issues
1. **Accessibility (A11y)**: The `X` (remove) button in `ImageGridPicker.tsx` lacked an `aria-label`. **[FIXED]** Added specific `aria-label` for screen readers.
2. **Verification Gap**: `photo-step.test.tsx` didn't verify that the `transformation` parameter was actually sent to Cloudinary. **[FIXED]** Added new test case checking XHR `FormData`.

### 🟢 Low Issues
1. **Performance / Stale Closures**: `handleUpload` in `PhotoStep.tsx` had a potential stale closure on `propertyData.images`. **[FIXED]** Switched to `useWizardStore.getState()` for latest state.
2. **Visual Consistency**: The `ImageGridPicker` empty state used `aspect-video` instead of `aspect-[4/3]`. **[FIXED]** Aligned empty state aspect ratio.
3. **Implicit Success**: Lacks explicit toast feedback. **[FIXED]** Integrated `sonner` for success/error toasts.

## Dev Agent Record

### Agent Model Used

Antigravity (Gemini 2.0 Pro)

### Debug Log References

### Completion Notes List

- [x] Enforced Cloudinary c_fill,ar_4:3 transformation via signed signatures.
- [x] Passed transformation parameters in client-side XHR upload flow.
- [x] Aligned ImageGridPicker UI with enforced 4:3 aspect ratio across mobile/desktop.
- [x] Fixed memory leaks by revoking object URLs in PhotoStep cleanup.
- [x] Centralized asset governance in shared constants file.

### File List

- `src/features/wizard/constants/upload.ts`
- `src/features/wizard/actions/get-cloudinary-signature.ts`
- `src/features/wizard/components/image-grid-picker.tsx`
- `src/features/wizard/components/steps/photo-step.tsx`
- `__tests__/actions/get-cloudinary-signature.test.ts`
- `__tests__/components/wizard/photo-step.test.tsx`
