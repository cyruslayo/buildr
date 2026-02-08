# Implementation Plan: Buildr Production Completion

> **Status**: Ready for Review  
> **Estimated Effort**: 32h (Phase 1 - MVP) + 40h (Phase 2 - Beta)  
> **Methodology**: TDD (Red-Green-Refactor)

---

## Goal

Complete Buildr for production launch by fixing 4 critical blockers and 10 high-priority items identified in the [production-readiness-audit.md](./analyses/production-readiness-audit.md).

---

## User Review Required

> [!IMPORTANT]
> **Phase 1 is the critical path.** These 4 items must be completed before any user can get value from the product. Recommend starting with 1.1 (Style Picker) as it's the smallest blocker.

> [!WARNING]  
> **Template Consolidation (2.1)** will touch many files. Suggest deferring to Week 2 after core flow works.

---

## Proposed Changes

### Phase 1: Critical Blockers (32h)

---

#### [MODIFY] [guided-wizard.tsx](file:///c:/AI2025/buildr/src/components/wizard/guided-wizard.tsx)

**1.1 Complete Style Picker (4h)**

Replace placeholder on line 159-162:
```diff
- {currentStep === 3 && (
-   <div className="animate-in fade-in slide-in-from-right-4 duration-300">
-     <h3 className="text-lg font-medium mb-4">Choose Your Style</h3>
-     <p className="text-muted-foreground">Style picker coming soon...</p>
-   </div>
- )}
+ {currentStep === 3 && (
+   <div className="animate-in fade-in slide-in-from-right-4 duration-300">
+     <h3 className="text-lg font-medium mb-4">Choose Your Style</h3>
+     <StylePicker
+       onSelect={(presetId) => updateData('stylePreset', presetId)}
+       selectedId={data.stylePreset}
+     />
+   </div>
+ )}
```

Add `stylePreset` to `WizardData` interface.

---

#### [NEW] [generator.ts](file:///c:/AI2025/buildr/src/lib/templates/generator.ts)

**1.2 Generation Pipeline (8h)**

Orchestrates wizard data → template rendering:
- Accepts `WizardData` from wizard
- Selects appropriate template based on `pageType`
- Injects data into template props
- Returns rendered HTML or component reference
- Saves to database as `Project`

---

#### [NEW] [preview/[id]/page.tsx](file:///c:/AI2025/buildr/src/app/preview/[id]/page.tsx)

**1.2 Preview Route**

Server Component that:
- Fetches `Project` by ID from database
- Renders the selected template with project data
- Shows export/edit buttons

---

#### [MODIFY] [schema.prisma](file:///c:/AI2025/buildr/prisma/schema.prisma)

**1.3 Project Model**

```prisma
model Project {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  name        String
  templateId  String
  data        Json     // WizardData stored as JSON
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

#### [NEW] [dashboard/page.tsx](file:///c:/AI2025/buildr/src/app/dashboard/page.tsx)

**1.3 Dashboard (16h)**

- Fetches user's projects from database
- Displays as grid of project cards
- Each card shows: name, template, date, thumbnail
- Actions: View, Edit, Export, Delete

---

#### [NEW] [api/projects/route.ts](file:///c:/AI2025/buildr/src/app/api/projects/route.ts)

**1.3 Projects API**

CRUD endpoints:
- `GET /api/projects` - List user's projects
- `POST /api/projects` - Create new project
- `GET /api/projects/[id]` - Get single project
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

---

#### [MODIFY] [export/route.ts](file:///c:/AI2025/buildr/src/app/api/export/route.ts)

**1.4 Export Enhancement (4h)**

Modify to accept project ID:
- Fetch project data from database
- Render template to static HTML
- Bundle with inline CSS
- Return as downloadable ZIP

---

### Phase 2: High Priority (Week 2)

| Item | File | Change |
|------|------|--------|
| 2.1 Consolidate Templates | `src/lib/templates/` | Move + refactor |
| 2.2 Loading States | `guided-wizard.tsx` | Add progress UI |
| 2.3 Sentry | `next.config.ts` | Add integration |
| 2.4 Fix E2E Tests | `__tests__/e2e/*.spec.ts` | Replace soft assertions |
| 2.5 Email Capture | `page.tsx` | Add form section |
| 2.6 Usage Limits | `generator.ts` | Add limit check |
| 2.7 Thumbnails | `template-selector.tsx` | Add real images |
| 2.8 RC Number | `whatsapp-config.tsx` | Add field |
| 2.9 Analytics | `layout.tsx` | Add Vercel Analytics |
| 2.10 Testimonials | `page.tsx` | Add section |

---

## Verification Plan

### Automated Tests

**Existing tests to verify changes work:**
```bash
# Run all unit tests
pnpm test

# Run wizard component tests specifically
pnpm test -- guided-wizard

# Run E2E tests
pnpm test:e2e
```

**New tests to write:**

| Test File | What It Verifies |
|-----------|------------------|
| `__tests__/components/wizard/style-step.test.tsx` | Style picker renders, selection updates state |
| `__tests__/lib/templates/generator.test.ts` | Wizard data transforms to template props |
| `__tests__/app/dashboard/page.test.tsx` | Dashboard renders projects |
| `__tests__/api/projects.test.ts` | CRUD operations work |
| `__tests__/e2e/wizard-to-export.spec.ts` | Full user journey |

### Manual Verification

**After Phase 1 completion, verify:**

1. **Style Picker works:**
   - Navigate to `/register` → login
   - Start wizard → reach Step 3
   - ✅ Style presets should render (not "coming soon")
   - ✅ Selecting a preset should highlight it
   - ✅ Proceeding to Step 4 should preserve selection

2. **Generation pipeline works:**
   - Complete all 4 wizard steps
   - Click "Generate"
   - ✅ Should see loading indicator
   - ✅ Should redirect to `/preview/[id]`
   - ✅ Preview should show template with your data

3. **Dashboard works:**
   - Navigate to `/dashboard`
   - ✅ Should see list of your generated pages
   - ✅ Each card should show name, template, date
   - ✅ "View" button navigates to preview
   - ✅ "Export" button downloads ZIP

4. **Export works:**
   - Click "Export" on any project
   - ✅ ZIP file downloads
   - ✅ Extract and open `index.html` in browser
   - ✅ Page renders correctly with WhatsApp links

### Build Verification

```bash
# Must pass before completion
pnpm build   # No TypeScript errors
pnpm lint    # No linting errors
```

---

## Success Criteria

- [ ] Wizard Step 3 shows functional style picker
- [ ] User can generate a page and see preview
- [ ] Dashboard lists all user's projects
- [ ] Export downloads working HTML
- [ ] All existing tests pass
- [ ] Build succeeds without errors
- [ ] Works at 375px mobile width
