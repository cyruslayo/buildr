# Template-Only Migration Analysis
# Buildr — Code-First to Template Approach

> **Version**: 1.1 | **Created**: December 8, 2024  
> **Purpose**: Identify all documentation changes required to migrate from code-first builder to template-only approach  
> **Status**: In Progress  
> **Related**: [16-TEMPLATE-DESIGN-SPEC.md](./16-TEMPLATE-DESIGN-SPEC.md) - Premium template specifications with Andy Clarke art direction

---

## Executive Summary

This document analyzes the changes required across all project documentation to migrate Buildr from a **code-first builder** (with Monaco editor and AI-generated code) to a **template-only approach** (where users fill forms and select from pre-designed templates).

### Scope of Change

| Document | Change Level | Primary Changes |
|----------|--------------|-----------------|
| **01-PRD.md** | 🟡 Medium | Remove code editor, reframe AI's role |
| **02-TECHNICAL-SPEC.md** | 🔴 Major | Remove Monaco/Sandpack, simplify architecture |
| **03-DESIGN-SYSTEM.md** | 🟡 Medium | Integrate [16-TEMPLATE-DESIGN-SPEC.md](./16-TEMPLATE-DESIGN-SPEC.md) |
| **04-USER-PERSONAS.md** | 🟢 Minor | Update technical expectations |
| **05-API-REFERENCE.md** | 🟡 Medium | Simplify generation endpoint |
| **06-TESTING-STRATEGY.md** | 🟡 Medium | Remove code validation tests |
| **07-ROADMAP.md** | 🟡 Medium | Adjust timeline and features |
| **08-TEMPLATE-LIBRARY.md** | 🔴 Major | Merge with [16-TEMPLATE-DESIGN-SPEC.md](./16-TEMPLATE-DESIGN-SPEC.md) |
| **09-GUIDED-PROMPT-FLOW.md** | 🟢 Minor | Already template-oriented |
| **10-PROMPT-ENGINEERING.md** | 🟡 Medium | Shift to variable injection |
| **11-ALIGNMENT-CHECKLIST.md** | 🟢 Minor | Update status |
| **12-IMPLEMENTATION-TICKETS.md** | 🔴 Major | Remove code editor tickets |
| **16-TEMPLATE-DESIGN-SPEC.md** | ✅ Complete | Premium template system specification |

---

## 1. PRD Changes (01-PRD.md)

### Items to REMOVE

| Line | Current Text | Reason |
|------|--------------|--------|
| 109 | `Code Editor - View and manually edit generated code - P1` | Users don't see/edit code in template approach |
| 28 | References to "generated code" | Misleading for template users |

### Items to MODIFY

| Section | Current | New Version |
|---------|---------|-------------|
| **Core Features Table** | "AI Page Generation - Generate landing pages from natural language prompts" | "AI-Powered Templates - Generate pages by selecting templates and filling in your property details" |
| **Live Preview** | "Real-time preview of generated pages" | "Real-time preview of your customized template" |
| **One-Click Export** | "Export as static HTML or downloadable zip" | "One-click publish or download your page" |
| **Key Value Propositions** | "No Technical Skills Required" description | Emphasize "No coding, no design—just fill in the details" |

### Items to ADD

| Section | New Content |
|---------|-------------|
| **Core Features** | "Template Gallery - 20+ professionally designed Nigerian real estate templates" |
| **Core Features** | "Form-Based Customization - Easy dropdowns, text fields, and image uploads" |
| **Out of Scope** | "Code editing or viewing" |
| **Out of Scope** | "Custom component generation" |

---

## 2. Technical Spec Changes (02-TECHNICAL-SPEC.md)

### Items to REMOVE from Technology Stack

| Technology | Current Purpose | Action |
|------------|----------------|--------|
| **Monaco Editor** | Code editing | ❌ REMOVE entirely |
| **Sandpack** | Live preview via bundling | ⚠️ REPLACE with iframe preview |
| **react-resizable-panels** | Split views for editor/preview | ❌ REMOVE (no split view needed) |

### Updated Frontend Stack

```
| Technology | Version | Purpose | Justification |
|------------|---------|---------|---------------|
| **Next.js** | 14.2+ | Framework | Server Components, streaming, built-in optimization |
| **React** | 18.2+ | UI library | Industry standard, concurrent features |
| **TypeScript** | 5.0+ | Type safety | Catch errors at compile-time, better DX |
| **Tailwind CSS** | 3.4+ | Styling | Utility-first, consistent styling |
| **shadcn/ui** | Latest | Component library | Consistent UI components |
| **Zustand** | 4.5+ | State management | Lightweight, no boilerplate vs Redux |
| **React Hook Form** | 7.0+ | Form handling | Template form inputs |
| **Zod** | 3.22+ | Validation | Form validation |
```

### Architecture Diagram Changes

**REMOVE:**
```
Editor[Monaco Code Editor]
```

**REPLACE WITH:**
```
Wizard[Form Wizard]
Preview[Template Preview]
```

### Project Structure Changes

**REMOVE these directories/files:**
```
├── components/builder/
│   ├── code-editor.tsx          # DELETE
│   ├── split-view.tsx           # DELETE
```

**ADD these directories/files:**
```
├── components/wizard/
│   ├── wizard-container.tsx     # NEW
│   ├── step-indicator.tsx       # NEW
│   ├── template-selector.tsx    # NEW
│   ├── property-form.tsx        # NEW
│   ├── style-picker.tsx         # NEW
│   ├── whatsapp-setup.tsx       # NEW
│   └── preview-frame.tsx        # NEW (iframe, not Sandpack)
├── templates/
│   ├── listing-luxury.tsx       # NEW - Template components
│   ├── listing-standard.tsx     # NEW
│   ├── land-plot.tsx            # NEW
│   └── [... 17+ more templates]
```

---

## 3. Design System Changes (03-DESIGN-SYSTEM.md)

### Integration with 16-TEMPLATE-DESIGN-SPEC.md

The **[16-TEMPLATE-DESIGN-SPEC.md](./16-TEMPLATE-DESIGN-SPEC.md)** now contains comprehensive design specifications including:

- **Emotional Design Framework** - 7 emotion-to-design mappings
- **Clarke Grid System** - Asymmetric layouts (2:3, 3:5 ratios)
- **Art-Directed shadcn Components** - ArtButton, ArtCard extensions
- **Motion Design System** - Framer Motion animations with Aura-level quality
- **Typography System** - 6 font pairings per template category
- **Color Presets** - 8 preset palettes for different property types

### Layout Pattern Changes

**REMOVE:**
```
┌─────────────────────────────────────────────────────┐
│  SIDE   │              MAIN CONTENT                 │
│  BAR    │  ┌─────────────────┬───────────────────┐  │
│         │  │   CODE EDITOR  │     PREVIEW       │  │
│         │  └─────────────────┴───────────────────┘  │
└─────────┴───────────────────────────────────────────┘
```

**REPLACE WITH:** Wizard layout as specified in [16-TEMPLATE-DESIGN-SPEC.md](./16-TEMPLATE-DESIGN-SPEC.md) Section 5 (Clarke Grid System)

---

## 4. API Reference Changes (05-API-REFERENCE.md)

### Endpoint Changes

**REMOVE:**
```
POST /api/generate - Full AI code generation endpoint
```

**REPLACE WITH:**
```markdown
### POST /api/render

Renders a template with user-provided data.

**Request Body:**
```json
{
  "templateId": "tmpl_listing_luxury_ng",
  "data": {
    "propertyType": "detached_duplex",
    "price": 85000000,
    "beds": 4,
    "baths": 4,
    "sqm": 350,
    "city": "Lagos",
    "area": "Lekki Phase 1",
    "features": ["borehole", "bq", "generator_house"],
    "whatsapp": {
      "number": "08012345678",
      "message": "Hello! I'm interested in this property"
    }
  },
  "style": {
    "preset": "luxury_dark"
  }
}
```

**Response:**
```json
{
  "success": true,
  "previewUrl": "https://buildr.ng/preview/abc123",
  "exportUrl": "https://buildr.ng/api/export/abc123"
}
```
```

---

## 5. Testing Strategy Changes (06-TESTING-STRATEGY.md)

### Tests to REMOVE

| Test Category | Reason |
|---------------|--------|
| Code validation tests | No user-written code |
| Monaco editor tests | Component removed |
| Code parsing tests | No code to parse |
| Sandpack integration tests | Component removed |

### Tests to ADD

| Test Category | Description |
|---------------|-------------|
| Template rendering tests | Each template renders correctly with data |
| Form validation tests | All wizard steps validate properly |
| Template preview tests | Preview iframe loads correctly |
| Export tests | HTML export is valid and complete |

---

## 6. Roadmap Changes (07-ROADMAP.md)

### Phase 1 Updates

**REMOVE:**
- Code editor integration
- Sandpack live preview setup
- Monaco editor configuration

**ADD:**
- Template design sprint (20 templates)
- Wizard UI implementation
- Form validation system
- Preview iframe system

### New Timeline

| Week | Original | New (Template Approach) |
|------|----------|------------------------|
| 1-2 | Foundation + AI integration | Foundation + Template system |
| 3-4 | Core Features (editor, preview) | Wizard UI + Form components |
| 5-6 | Nigeria Features | Template gallery + Nigeria data |
| 7-8 | Testing & Beta | Testing & Beta |

---

## 7. Template Library Elevation (08-TEMPLATE-LIBRARY.md)

### Integration with 16-TEMPLATE-DESIGN-SPEC.md

The **[16-TEMPLATE-DESIGN-SPEC.md](./16-TEMPLATE-DESIGN-SPEC.md)** now serves as the master template specification and should be referenced for:

| Section | What It Contains |
|---------|------------------|
| **Section 1** | 18 template concepts across 6 categories |
| **Section 2** | Motion design system with Framer Motion |
| **Section 3** | Typography system (6 font pairings) |
| **Section 4** | Color system (8 presets) |
| **Section 5** | Clarke Grid System layouts |
| **Section 6** | Art-directed shadcn components |

### 08-TEMPLATE-LIBRARY.md Changes

**BEFORE:** Supporting document for template suggestions

**AFTER:** Reference document pointing to [16-TEMPLATE-DESIGN-SPEC.md](./16-TEMPLATE-DESIGN-SPEC.md) for design specifications

### Action Items

1. ✅ **Template Design Specifications** - Created in [16-TEMPLATE-DESIGN-SPEC.md](./16-TEMPLATE-DESIGN-SPEC.md)
   - Art direction moods per category
   - Animation specifications per template
   - Responsive breakpoint requirements

2. **Template Variable System** (to be added to each template in 08-TEMPLATE-LIBRARY.md)
   ```typescript
   interface TemplateVariable {
     key: string;           // e.g., "propertyType"
     type: 'text' | 'number' | 'select' | 'multiselect' | 'image' | 'naira';
     label: string;         // Form field label
     placeholder?: string;
     options?: string[];    // For select types
     validation?: ZodSchema;
   }
   ```

3. ✅ **Template Production Checklist** - Added to [16-TEMPLATE-DESIGN-SPEC.md](./16-TEMPLATE-DESIGN-SPEC.md) Section 9

---

## 8. Implementation Tickets Changes (12-IMPLEMENTATION-TICKETS.md)

### Tickets to REMOVE

| Ticket ID | Name | Reason |
|-----------|------|--------|
| BLDR-2UI-010 | Monaco Editor Integration | No code editor |
| BLDR-2LLM-003 | Iterative Refinement API | No code iteration |
| BLDR-2UI-007 | Sandpack Live Preview | Replaced with iframe |

### Tickets to MODIFY

| Ticket ID | Original | New Scope |
|-----------|----------|-----------|
| BLDR-1LLM-001 | Basic LLM Integration | Template variable injection |
| BLDR-2VAL-001 | Code Validation | Form validation only |

### Tickets to ADD

| New Ticket ID | Name | Effort |
|---------------|------|--------|
| BLDR-1TPL-001 | Template System Architecture | 8 |
| BLDR-1TPL-002 | Create 5 Listing Templates | 13 |
| BLDR-1TPL-003 | Create 3 Land Templates | 8 |
| BLDR-1TPL-004 | Create 4 Agent/Agency Templates | 8 |
| BLDR-1TPL-005 | Create 3 Short-Let Templates | 5 |
| BLDR-1TPL-006 | Create 3 Estate Templates | 5 |
| BLDR-2WIZ-001 | Wizard Step Container | 5 |
| BLDR-2WIZ-002 | Template Selector Step | 5 |
| BLDR-2WIZ-003 | Property Details Form | 8 |
| BLDR-2WIZ-004 | Style Picker Component | 3 |
| BLDR-2WIZ-005 | Preview Frame (iframe) | 5 |

---

## 9. Prompt Engineering Changes (10-PROMPT-ENGINEERING.md)

### Shift in AI Role

**BEFORE:** Generate entire pages from prompts

**AFTER:** Enhance template content (descriptions, copywriting)

### New AI Use Cases

| Use Case | Description |
|----------|-------------|
| **Property Description Generation** | AI writes compelling listing text from bullet points |
| **Feature Highlight Copywriting** | AI enhances feature descriptions |
| **Headline Generation** | AI suggests attention-grabbing headlines |
| **SEO Meta Description** | AI generates meta tags |

### Simplified Prompt Architecture

```
User Data (structured) → Template (fixed) → AI Enhancement (optional)
                                              ↓
                                    "Make this description more appealing"
```

---

## 10. Summary: Required Actions

### Phase 1: Document Updates (✅ Complete)

```markdown
1. [x] Update 01-PRD.md - Remove code editor, add template focus
2. [x] Update 02-TECHNICAL-SPEC.md - Remove Monaco/Sandpack, add Framer Motion
3. [x] Update 03-DESIGN-SYSTEM.md - Integrate 16-TEMPLATE-DESIGN-SPEC.md
4. [x] Update 05-API-REFERENCE.md - Replace generate with render endpoint
5. [x] Update 06-TESTING-STRATEGY.md - Remove code tests, add template tests
6. [x] Update 07-ROADMAP.md - Adjust timeline for template approach
7. [x] Update 08-TEMPLATE-LIBRARY.md - Reference 16-TEMPLATE-DESIGN-SPEC.md
8. [x] Update 10-PROMPT-ENGINEERING.md - Shift to enhancement role
9. [x] Update 12-IMPLEMENTATION-TICKETS.md - Template tickets
```

### Phase 2: Completed Documents

```markdown
1. [x] 16-TEMPLATE-DESIGN-SPEC.md - Premium template specifications
       - Emotional design framework
       - Clarke Grid System layouts
       - Art-directed shadcn components
       - Motion design system
       - Typography and color systems
2. [x] README.md - Updated for template-only approach
3. [x] 17-WIZARD-UI-SPEC.md - 4-step wizard specification
       - Form flows and layouts
       - Validation rules (Zod schemas)
       - State management (Zustand)
       - Component specifications
       - Accessibility requirements (WCAG 2.1 AA)
```

### Estimated Effort

| Task | Effort (hours) | Status |
|------|----------------|--------|
| Document updates | 8-12 hours | Pending |
| Template design spec | 4-6 hours | ✅ Complete |
| Review and alignment | 2-3 hours | Pending |
| **Total Remaining** | **10-15 hours** | |

---

## 11. Decision: Proceed?

> [!IMPORTANT]
> The template design specification is now complete. Before proceeding with document updates:
> 1. ✅ Template design spec created ([16-TEMPLATE-DESIGN-SPEC.md](./16-TEMPLATE-DESIGN-SPEC.md))
> 2. ✅ Art direction principles defined (Andy Clarke methodology)
> 3. [ ] Confirm template-only approach is the desired direction
> 4. [ ] Approve the document change scope
> 5. [ ] Decide on timeline for remaining updates

---

> **Document Owner**: Technical Architect  
> **Status**: In Progress (Design Spec Complete)  
> **Next Step**: Update remaining project documents per this plan
