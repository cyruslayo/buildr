# Story 6.2: Lighthouse Performance Optimization

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a potential customer viewing a published listing,
I want pages to load fast on my phone,
So that I don't abandon before seeing the property.

## Acceptance Criteria

1. **Lighthouse Score**: Given a published property page, When tested with Google Lighthouse on Mobile, Then the Performance score is >90.
2. **Image Optimization**: Given the page contains images, When they load, Then they use lazy loading and next-gen formats (WebP).
3. **Bundle Size**: The main JavaScript bundle should be small enough to load quickly on 3G.
4. **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1.

## Tasks / Subtasks

- [ ] **Analyze: Baseline Lighthouse Score**
  - [ ] Run Lighthouse on a published page and capture baseline scores.
  - [ ] Identify top 3-5 performance bottlenecks.
- [ ] **Optimize: Image Loading**
  - [ ] Verify `next/image` is used consistently for all hero and gallery images.
  - [ ] Ensure `loading="lazy"` on below-the-fold images.
  - [ ] Confirm WebP format is delivered by Cloudinary.
- [ ] **Optimize: JavaScript & CSS**
  - [ ] Audit bundle size with `@next/bundle-analyzer`.
  - [ ] Implement dynamic imports for heavy components (e.g., image picker, map embeds).
  - [ ] Purge unused CSS if feasible.
- [ ] **Verification**
  - [ ] Run Lighthouse on Slow 3G throttling.
  - [ ] Confirm Performance score > 90.
  - [ ] Document final scores in Completion Notes.

## Dev Notes

- **NFR3**: All generated landing pages must achieve a **Google Lighthouse Performance Score > 90** on Mobile.
- **Image Pipeline**: Cloudinary is already used for image delivery. Ensure `f_auto` (auto-format) and `q_auto` (auto-quality) transformations are applied in URLs.
- **Story 6.1 Learnings**: Service Worker caching is already configured via `@ducanh2912/next-pwa`. This helps with repeat visits. Focus here is on first-load performance.
- **Consider**: Preloading hero image with `<link rel="preload">` in template head.

### References

- [Epic 6: Polish & Performance](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/epics.md#L663)
- [NFR3: Published Pages Performance](file:///c:/AI2025/buildr/_bmad-output/planning-artifacts/prd.md#L217)
- [Cloudinary Optimization Docs](https://cloudinary.com/documentation/image_optimization)
