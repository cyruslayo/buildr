# Story 2.6: Publish Validation & Live Link Generation

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a real estate agent,
I want to publish my completed listing and get a shareable link,
so that I can immediately share it on WhatsApp.

## Acceptance Criteria

1. **Ready-to-Publish Validation (AC-1)**:
   - Ensure all required fields (Price, Title, Location, Description) are populated in the `wizard-store`.
   - Show a clear summary of entered data before the final "Publish" button.

2. **Asset Sync Validation (AC-2)**:
   - If images are still uploading (local status in store), show message: "Waiting for images to finish uploading..." with a progress bar.
   - Block the "Publish" button until all assets are successfully synced to Cloudinary.

3. **Subdomain Link Generation (AC-3)**:
   - Generate a unique subdomain-style URL based on the agency name and property title (e.g., `agency.buildr.ng/4-bedroom-duplex-lekki`).
   - Store the generated slug in the database and mark the property as `published`.

4. **Copy Link Interaction (AC-4)**:
   - Upon successful publish, display a "Copy Link" button and a WhatsApp sharing button.
   - The link should be copied to the clipboard with a success toast ("Link copied to clipboard!").

5. **Lagos Luxury & Performance (AC-5)**:
   - Use the "Zero-Spinner Policy". Transitions should be graceful with micro-animations.
   - Success state should feel celebratory (subtle scaling or motion).

## Tasks / Subtasks

- [ ] Create `PublishStep` component in `src/features/wizard/components/steps/` (AC: 1, 2)
  - [ ] Implement data summary view
  - [ ] Implement upload progress indicator/blocker
- [ ] Implement `publishListing` Server Action in `src/features/wizard/actions/` (AC: 3)
  - [ ] Generate unique slug
  - [ ] Update property status in DB
  - [ ] Trigger ISR revalidation for the public route
- [ ] Implement "Copy Link" and "WhatsApp Share" logic (AC: 4)
  - [ ] Use `navigator.clipboard` API
  - [ ] Construct WhatsApp share URL (`https://wa.me/?text=...`)
- [ ] Add TDD Unit Tests (AC: 1, 2, 4)
  - [ ] Test validation logic for missing fields
  - [ ] Test link generation formatting
  - [ ] Mock clipboard API for copy test

## Dev Notes

- **Architecture Compliance**: Use `src/features/wizard/store/wizard-store.ts` for current state analysis.
- **Multi-Tenancy**: Ensure the server action validates the user's `teamId` before publishing.
- **Naming**: Server action should be `publishListing` (Verb-Subject).
- **Public URL**: The base URL should be configurable via env variable (e.g., `NEXT_PUBLIC_APP_URL`).

### Project Structure Notes

- Alignment with `src/features/wizard/` co-location pattern.
- Public property pages should eventually live in `src/app/[agency]/[slug]/page.tsx` (not part of this story's UI, but important for URL generation).

### References

- [Source: epics.md#Story 2.6]
- [Source: architecture.md#Implementation Patterns]
- [Source: ux-design-specification.md#Critical Success Moments]

## Dev Agent Record

### Agent Model Used

Antigravity (Gemini 2.0 Flash Thinking)

### Debug Log References

### Completion Notes List

## Senior Developer Review (AI)

**Review Date:** {{date}}
**Review Outcome:** 🔴 Changes Requested

### 🔴 CRITICAL ISSUES
- **False Claim / Fake Implementation**: `PublishStep` uses a `setTimeout` simulation (line 27-37) instead of the implemented `publishListing` server action. This means the listing is NEVER actually published to the database in production.
- **Marked [x] but NOT DONE**: Task "Implement publishListing Server Action" is marked complete in `task.md`, and while the file exists, it's not integrated. The AC-3 is technically failed because the UI doesn't trigger the real logic.

### 🟡 MEDIUM ISSUES
- **Missing Logic**: WhatsApp share button has no `onClick` handler and no logic to construct the `wa.me` URL, violating AC-4.
- **AC Violation (Toasts)**: Link copying logs to `console.log` instead of showing a success toast, violating AC-4. This was noted as a "temporary fix" in dev notes but it's a regression in requirement.
- **Hardcoded Progress**: `Progress` value is hardcoded to `45` (line 128), which is misleading to the user.
- **Slug Logic Gap**: AC-3 requires slugs based on agency name AND property title. Current implementation only uses title.

### 🟢 LOW ISSUES
- **Project Structure**: `PublishStep` is 156 lines, exceeding the 150-line limit defined in `project-context.md`.
- **Typo/Formatting**: `renderStep` switch in `page.tsx` has inconsistent indentation for the closing brace.

### Actions Required
1. Integrate `publishListing` server action into `PublishStep`.
2. Implement real WhatsApp sharing logic.
3. Add a basic toast component or use the project's standard one (if it exists) for feedback.
4. Update slug generation to include agency context.
