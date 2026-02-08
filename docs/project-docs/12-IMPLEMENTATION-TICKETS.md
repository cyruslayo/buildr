# Implementation Tickets
# Buildr — Template-Only Development Task Breakdown

> **Version**: 2.0 | **Updated**: December 8, 2024  
> **Approach**: Template-Only (non-technical users)  
> **Methodology**: Test-Driven Development (TDD)  
> **Template Spec**: [16-TEMPLATE-DESIGN-SPEC.md](./16-TEMPLATE-DESIGN-SPEC.md)  
> **Migration**: [15-TEMPLATE-MIGRATION-ANALYSIS.md](./15-TEMPLATE-MIGRATION-ANALYSIS.md)

---

## Overview

This document breaks down the Buildr project into actionable development tickets following TDD principles. Each ticket includes:

- **Test First**: What tests to write before implementation
- **Implementation**: Code to write to pass tests
- **Acceptance Criteria**: Definition of done
- **Dependencies**: Blocking tickets
- **Effort**: Story points (1=XS, 2=S, 3=M, 5=L, 8=XL)

### Ticket ID Format

```
BLDR-[Phase][Category]-[Number]
- Phase: 1-4 (matching roadmap phases)
- Category: SET (Setup), UI (Frontend), API (Backend), LLM (AI), VAL (Validation), TPL (Templates), PAY (Payment), TST (Testing)
```

---

## Phase 1: Foundation (Weeks 1-2)

### Epic: Project Setup & Core Infrastructure

---

#### BLDR-1SET-001: Initialize Next.js 14 Project

**Priority**: P0 | **Effort**: 2 | **Owner**: Frontend Lead

**Test First**:
```bash
# Verification test - project should build and run
pnpm run build  # Should complete without errors
pnpm dev        # Should start on http://localhost:3000
```

**Implementation**:
```bash
pnpm dlx create-next-app@latest buildr --typescript --tailwind --eslint --app --src-dir
```

**Acceptance Criteria**:
- [ ] Next.js 14+ with App Router
- [ ] TypeScript 5.0+ configured
- [ ] Tailwind CSS 3.4+ configured
- [ ] ESLint configured
- [ ] `/src/app` directory structure
- [ ] Git repository initialized

**Dependencies**: None

---

#### BLDR-1SET-002: Install Core Dependencies

**Priority**: P0 | **Effort**: 2 | **Owner**: Frontend Lead

**Test First**:
```typescript
// __tests__/setup/dependencies.test.ts
describe('Core Dependencies', () => {
  it('should have required packages installed', () => {
    const pkg = require('../../package.json');
    expect(pkg.dependencies['@ai-sdk/openai']).toBeDefined();
    expect(pkg.dependencies['zustand']).toBeDefined();
    expect(pkg.dependencies['zod']).toBeDefined();
  });
});
```

**Implementation**:
```bash
pnpm add ai @ai-sdk/openai zustand zod @prisma/client
pnpm add -D prisma @types/node
pnpm dlx shadcn-ui@latest init
```

**Acceptance Criteria**:
- [ ] Vercel AI SDK installed
- [ ] Zustand for state management
- [ ] Zod for validation
- [ ] Prisma ORM installed
- [ ] shadcn/ui initialized

**Dependencies**: BLDR-1SET-001

---

#### BLDR-1SET-003: Configure shadcn/ui Components

**Priority**: P0 | **Effort**: 3 | **Owner**: Frontend Lead

**Test First**:
```typescript
// __tests__/components/ui.test.tsx
import { render } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('UI Components', () => {
  it('renders Button component', () => {
    const { getByRole } = render(<Button>Test</Button>);
    expect(getByRole('button')).toBeInTheDocument();
  });
});
```

**Implementation**:
```bash
pnpm dlx shadcn-ui@latest add button input card dialog tabs select badge tooltip progress textarea
```

**Acceptance Criteria**:
- [ ] All core shadcn components installed
- [ ] Components render without errors
- [ ] Dark mode theme configured
- [ ] Custom color tokens match design system

**Dependencies**: BLDR-1SET-002

---

#### BLDR-1SET-004: Setup Database Schema

**Priority**: P0 | **Effort**: 3 | **Owner**: Backend Lead

**Test First**:
```typescript
// __tests__/db/schema.test.ts
import { PrismaClient } from '@prisma/client';

describe('Database Schema', () => {
  const prisma = new PrismaClient();
  
  afterAll(async () => {
    await prisma.$disconnect();
  });
  
  it('should connect to database', async () => {
    await expect(prisma.$connect()).resolves.not.toThrow();
  });
  
  it('should have User model', async () => {
    const user = await prisma.user.findFirst();
    expect(user).toBeDefined(); // null is valid
  });
});
```

**Implementation**:
```prisma
// prisma/schema.prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  projects  Project[]
  createdAt DateTime @default(now())
}

model Project {
  id        String   @id @default(cuid())
  name      String
  code      String   @db.Text
  pageType  String
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  versions  Version[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Version {
  id        String   @id @default(cuid())
  code      String   @db.Text
  message   String?
  projectId String
  project   Project  @relation(fields: [projectId], references: [id])
  createdAt DateTime @default(now())
}
```

**Acceptance Criteria**:
- [ ] Prisma schema defined
- [ ] Database migrations created
- [ ] Can connect to PostgreSQL
- [ ] User, Project, Version models work

**Dependencies**: BLDR-1SET-001

---

#### BLDR-1SET-005: Setup Environment Configuration

**Priority**: P0 | **Effort**: 1 | **Owner**: Backend Lead

**Test First**:
```typescript
// __tests__/config/env.test.ts
describe('Environment Configuration', () => {
  it('should have required env vars defined', () => {
    expect(process.env.DATABASE_URL).toBeDefined();
    expect(process.env.OPENAI_API_KEY).toBeDefined();
  });
});
```

**Implementation**:
```env
# .env.local
DATABASE_URL="postgresql://..."
OPENAI_API_KEY="sk-..."
UPSTASH_REDIS_REST_URL="..."
UPSTASH_REDIS_REST_TOKEN="..."
NEXTAUTH_SECRET="..."
PAYSTACK_SECRET_KEY="..."
```

**Acceptance Criteria**:
- [ ] `.env.example` created with all variables
- [ ] `.env.local` gitignored
- [ ] Environment validation on startup
- [ ] Type-safe env access via Zod

**Dependencies**: BLDR-1SET-001

---

### Epic: LLM Gateway & Content Enhancement

---

#### BLDR-1LLM-001: Create LLM Gateway Service

**Priority**: P0 | **Effort**: 5 | **Owner**: Backend Lead

**Test First**:
```typescript
// __tests__/lib/llm/gateway.test.ts
import { LLMGateway } from '@/lib/llm/gateway';

describe('LLM Gateway', () => {
  const gateway = LLMGateway.getInstance();
  
  it('should be singleton', () => {
    const instance2 = LLMGateway.getInstance();
    expect(gateway).toBe(instance2);
  });
  
  it('should enhance property description', async () => {
    const result = await gateway.enhanceContent(
      'You are a Nigerian real estate copywriter',
      'Make this property description more compelling: 4 bedroom duplex in Lekki'
    );
    expect(result).toContain('Lekki');
    expect(result.length).toBeGreaterThan(50);
  });
  
  it('should handle streaming', async () => {
    const stream = await gateway.enhanceContent(
      'system prompt',
      'user prompt',
      { stream: true }
    );
    expect(stream.toDataStreamResponse).toBeDefined();
  });
});
```

**Implementation**:
Reference: [02-TECHNICAL-SPEC.md Section 4.1](./02-TECHNICAL-SPEC.md#41-llm-gateway)

**Acceptance Criteria**:
- [x] Singleton pattern implemented
- [x] Google Gemini provider configured
- [x] Streaming support works
- [x] Error handling with retries
- [x] Token usage tracking

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-1SET-002, BLDR-1SET-005

---

#### BLDR-1API-001: Create Render API Route

**Priority**: P0 | **Effort**: 5 | **Owner**: Backend Lead

**Test First**:
```typescript
// __tests__/api/render.test.ts
import { POST } from '@/app/api/render/route';
import { NextRequest } from 'next/server';

describe('POST /api/render', () => {
  it('returns 400 for missing templateId', async () => {
    const req = new NextRequest('http://localhost/api/render', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    
    const res = await POST(req);
    expect(res.status).toBe(400);
  });
  
  it('returns rendered template for valid request', async () => {
    const req = new NextRequest('http://localhost/api/render', {
      method: 'POST',
      body: JSON.stringify({
        templateId: 'tmpl_listing_luxury_ng',
        data: {
          price: 85000000,
          beds: 4,
          baths: 4,
          sqm: 350,
          location: 'Lekki Phase 1, Lagos',
        },
      }),
    });
    
    const res = await POST(req);
    expect(res.status).toBe(200);
    
    const data = await res.json();
    expect(data.previewUrl).toBeDefined();
  });
});
```

**Implementation**:
Reference: [05-API-REFERENCE.md](./05-API-REFERENCE.md)

**Acceptance Criteria**:
- [x] POST /api/render endpoint works
- [x] Validates request body with Zod
- [x] Renders template with injected data (placeholder registry)
- [x] Returns preview URL
- [x] Nigerian formatting (Naira, sqm)

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-1LLM-001

---

#### BLDR-1UI-001: Create Basic Prompt Input Component

**Priority**: P0 | **Effort**: 3 | **Owner**: Frontend Lead

**Test First**:
```typescript
// __tests__/components/prompt-input.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { PromptInput } from '@/components/builder/prompt-input';

describe('PromptInput', () => {
  it('renders textarea', () => {
    render(<PromptInput onSubmit={jest.fn()} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
  
  it('submits on Enter key', async () => {
    const onSubmit = jest.fn();
    render(<PromptInput onSubmit={onSubmit} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Create a hero' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    
    expect(onSubmit).toHaveBeenCalledWith('Create a hero');
  });
  
  it('disables when loading', () => {
    render(<PromptInput onSubmit={jest.fn()} isLoading={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

**Implementation**:
Reference: [03-DESIGN-SYSTEM.md](./03-DESIGN-SYSTEM.md)

**Acceptance Criteria**:
- [x] Textarea with auto-resize
- [x] Submit button with loading state
- [x] Keyboard shortcut (Cmd/Ctrl+Enter)
- [x] Character count display
- [x] Disabled state during generation

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-1SET-003

---

## Phase 2: Template System + Nigeria (Weeks 3-4)

### Epic: Template System Architecture

---

#### BLDR-2TPL-001: Template System Architecture

**Priority**: P0 | **Effort**: 8 | **Owner**: Full Stack Lead

**Test First**:
```typescript
// __tests__/lib/templates/template-system.test.ts
import { getTemplate, renderTemplate } from '@/lib/templates';

describe('Template System', () => {
  it('returns template by ID', async () => {
    const template = await getTemplate('tmpl_listing_luxury_ng');
    expect(template).toBeDefined();
    expect(template.id).toBe('tmpl_listing_luxury_ng');
  });

  it('renders template with data', async () => {
    const html = await renderTemplate('tmpl_listing_luxury_ng', {
      price: 85000000,
      beds: 4,
      baths: 4,
      sqm: 350,
      location: 'Lekki Phase 1, Lagos',
    });
    expect(html).toContain('₦85,000,000');
    expect(html).toContain('350 sqm');
  });
});
```

**Implementation**:
- Create template registry with all template definitions
- Template component architecture using React Server Components
- Data injection system for property details
- Style preset application

**Acceptance Criteria**:
- [x] Template registry with 6+ templates
- [x] `getTemplate(id)` function works
- [x] `renderTemplate(id, data)` returns valid HTML
- [x] Templates use 16-TEMPLATE-DESIGN-SPEC patterns
- [x] Naira formatting works correctly

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-1SET-003


---

#### BLDR-2TPL-002: Create Luxury Property Templates (3)

**Priority**: P0 | **Effort**: 13 | **Owner**: Frontend + Design

**Test First**:
```typescript
// __tests__/templates/luxury.test.tsx
import { render } from '@testing-library/react';
import { BananaIslandVilla } from '@/templates/luxury/banana-island-villa';

describe('Luxury Templates', () => {
  it('renders Banana Island Villa template', () => {
    const { container } = render(
      <BananaIslandVilla 
        price={850000000}
        beds={5}
        baths={6}
        sqm={800}
        features={['swimming_pool', 'bq', 'generator_house']}
      />
    );
    expect(container).toHaveTextContent('₦850,000,000');
    expect(container).toHaveTextContent('800 sqm');
  });

  it('has WhatsApp CTA button', () => {
    const { getByText } = render(<BananaIslandVilla {...mockData} />);
    expect(getByText(/whatsapp/i)).toBeInTheDocument();
  });
});
```

**Implementation**:
- Banana Island Villa template (dark theme, gold accents)
- Ikoyi Penthouse template (vertical scroll story)
- Maitama Mansion template (symmetrical grandeur)

**Acceptance Criteria**:
- [x] 3 luxury templates created
- [x] Andy Clarke art direction applied (asymmetric layouts)
- [x] Framer Motion animations implemented
- [x] WhatsApp CTA on all templates
- [x] Mobile responsive (44px touch targets)

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-2TPL-001


---

#### BLDR-2TPL-003: Create Standard Property Templates (3)

**Priority**: P0 | **Effort**: 8 | **Owner**: Frontend + Design

**Test First**:
```typescript
// __tests__/templates/standard.test.tsx
describe('Standard Templates', () => {
  it('renders Lekki Family Home template', () => {
    const { container } = render(
      <LekkiFamilyHome price={85000000} beds={4} baths={4} sqm={350} />
    );
    expect(container).toHaveTextContent('₦85,000,000');
  });
});
```

**Implementation**:
- Lekki Family Home (warm tones, lifestyle focus)
- Modern Duplex (clean lines, geometric)
- Terrace Life (community focus)

**Acceptance Criteria**:
- [x] 3 standard templates created
- [x] Trust blue color palette
- [x] Card hover animations
- [x] WhatsApp CTA on all templates
- [x] Nigerian features badges

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-2TPL-001


---

### Epic: Wizard UI Components

---

#### BLDR-2WIZ-001: Wizard Step Container

**Priority**: P0 | **Effort**: 5 | **Owner**: Frontend Lead

**Test First**:
```typescript
// __tests__/components/wizard/wizard-container.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { WizardContainer } from '@/components/wizard/wizard-container';

describe('WizardContainer', () => {
  it('renders step indicator', () => {
    render(<WizardContainer currentStep={1} totalSteps={4} />);
    expect(screen.getByText('Step 1 of 4')).toBeInTheDocument();
  });

  it('navigates between steps', async () => {
    const onStepChange = jest.fn();
    render(<WizardContainer currentStep={1} onStepChange={onStepChange} />);
    fireEvent.click(screen.getByText('Next'));
    expect(onStepChange).toHaveBeenCalledWith(2);
  });
});
```

**Implementation**:
- Multi-step wizard container with progress indicator
- Step navigation (next/previous)
- Form state persistence with Zustand
- Validation before step change

**Acceptance Criteria**:
- [x] 4-step wizard (Template → Details → Style → Preview)
- [x] Progress indicator shows current step
- [x] Next/Previous navigation works
- [x] Form state persists between steps
- [x] Validation prevents invalid step changes

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-1SET-003

---

#### BLDR-2WIZ-002: Template Selector Step

**Priority**: P0 | **Effort**: 5 | **Owner**: Frontend

**Test First**:
```typescript
// __tests__/components/wizard/template-selector.test.tsx
describe('TemplateSelector', () => {
  it('displays template grid', () => {
    render(<TemplateSelector templates={mockTemplates} />);
    expect(screen.getAllByRole('button')).toHaveLength(6);
  });

  it('filters by category', () => {
    render(<TemplateSelector templates={mockTemplates} />);
    fireEvent.click(screen.getByText('Luxury'));
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('selects template on click', () => {
    const onSelect = jest.fn();
    render(<TemplateSelector onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Banana Island Villa'));
    expect(onSelect).toHaveBeenCalledWith('tmpl_listing_luxury_ng');
  });
});
```

**Implementation**:
- Template gallery grid with category filters
- Template preview cards with thumbnails
- Selection state management

**Acceptance Criteria**:
- [x] Template grid displays all templates
- [x] Category filter (Luxury, Standard, Land, Agent, Short-Let, Estate)
- [x] Template selection works
- [x] Preview thumbnail shows on hover
- [x] Mobile responsive grid

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-2WIZ-001, BLDR-2TPL-001

---

#### BLDR-2WIZ-003: Property Details Form

**Priority**: P0 | **Effort**: 8 | **Owner**: Frontend

**Test First**:
```typescript
// __tests__/components/wizard/property-form.test.tsx
describe('PropertyDetailsForm', () => {
  it('validates required fields', async () => {
    render(<PropertyDetailsForm />);
    fireEvent.click(screen.getByText('Next'));
    expect(await screen.findByText('Price is required')).toBeInTheDocument();
  });

  it('formats Naira currency', () => {
    render(<PropertyDetailsForm />);
    const priceInput = screen.getByLabelText('Price');
    fireEvent.change(priceInput, { target: { value: '85000000' } });
    expect(priceInput).toHaveValue('₦85,000,000');
  });

  it('shows Nigerian features checkboxes', () => {
    render(<PropertyDetailsForm />);
    expect(screen.getByLabelText('Bore Hole')).toBeInTheDocument();
    expect(screen.getByLabelText('Boys Quarters')).toBeInTheDocument();
    expect(screen.getByLabelText('Generator House')).toBeInTheDocument();
  });
});
```

**Implementation**:
- React Hook Form integration
- Zod schema validation
- Nigerian property fields (price, beds, baths, sqm)
- Nigerian features checkboxes
- Location autocomplete

**Acceptance Criteria**:
- [x] All required fields validated
- [x] Naira currency formatting
- [x] sqm measurement display
- [x] Nigerian features checkboxes
- [x] WhatsApp number field
- [x] Location autocomplete with Nigerian areas

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-2WIZ-001

---

#### BLDR-2WIZ-004: Style Picker Component

**Priority**: P1 | **Effort**: 3 | **Owner**: Frontend

**Test First**:
```typescript
// __tests__/components/wizard/style-picker.test.tsx
describe('StylePicker', () => {
  it('displays style presets', () => {
    render(<StylePicker />);
    expect(screen.getByText('Luxury Dark')).toBeInTheDocument();
    expect(screen.getByText('Professional Blue')).toBeInTheDocument();
  });

  it('applies selected preset', () => {
    const onSelect = jest.fn();
    render(<StylePicker onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Luxury Dark'));
    expect(onSelect).toHaveBeenCalledWith('luxury_dark');
  });
});
```

**Implementation**:
- Style preset cards with color previews
- Color palette from 16-TEMPLATE-DESIGN-SPEC

**Acceptance Criteria**:
- [x] 8 style presets available
- [x] Visual preview of each preset
- [x] Selection state management
- [x] Preset applies to template preview

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-2WIZ-001

---

#### BLDR-2WIZ-005: Preview Frame (iframe)

**Priority**: P0 | **Effort**: 5 | **Owner**: Frontend

**Test First**:
```typescript
// __tests__/components/wizard/preview-frame.test.tsx
describe('PreviewFrame', () => {
  it('renders template in iframe', async () => {
    render(<PreviewFrame templateId="tmpl_listing_luxury_ng" data={mockData} />);
    const iframe = screen.getByTitle('Preview');
    expect(iframe).toBeInTheDocument();
  });

  it('updates when data changes', async () => {
    const { rerender } = render(<PreviewFrame data={{ price: 50000000 }} />);
    rerender(<PreviewFrame data={{ price: 85000000 }} />);
    // Verify iframe content updates
  });
});
```

**Implementation**:
- Iframe-based template preview
- Real-time updates when form data changes
- Mobile/desktop preview toggle
- Full-screen preview option

**Acceptance Criteria**:
- [x] Template renders in iframe
- [x] Real-time data updates
- [x] Mobile/desktop toggle
- [x] Full-screen preview button
- [x] Responsive iframe sizing

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-2TPL-001, BLDR-2WIZ-003

---

### Epic: Nigerian Content Enhancement

#### BLDR-2LLM-001: Implement Nigerian System Prompt

**Priority**: P0 | **Effort**: 3 | **Owner**: Backend Lead

**Test First**:
```typescript
// __tests__/lib/prompts/system-prompt.test.ts
import { NIGERIA_SYSTEM_PROMPT } from '@/lib/prompts/system-prompt';

describe('Nigerian System Prompt', () => {
  it('contains Nigerian identity', () => {
    expect(NIGERIA_SYSTEM_PROMPT).toContain('Nigerian');
    expect(NIGERIA_SYSTEM_PROMPT).toContain('Naira');
    expect(NIGERIA_SYSTEM_PROMPT).toContain('₦');
  });
  
  it('contains ALWAYS DO rules', () => {
    expect(NIGERIA_SYSTEM_PROMPT).toContain('square meters');
    expect(NIGERIA_SYSTEM_PROMPT).toContain('WhatsApp');
  });
  
  it('contains NEVER DO rules', () => {
    expect(NIGERIA_SYSTEM_PROMPT).toContain('USD');
    expect(NIGERIA_SYSTEM_PROMPT).toContain('sqft');
    expect(NIGERIA_SYSTEM_PROMPT).toContain('HOA');
  });
});
```

**Implementation**:
Reference: [10-PROMPT-ENGINEERING.md Section 3](./10-PROMPT-ENGINEERING.md#3-layer-2-system-prompt-engineering)

**Acceptance Criteria**:
- [x] System prompt defined as constant
- [x] Contains Nigerian identity and rules
- [x] Contains DO and DON'T lists
- [x] Exported for use in prompt builder

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-1LLM-001

---

#### BLDR-2LLM-002: Implement Constrained Prompt Builder

**Priority**: P0 | **Effort**: 5 | **Owner**: Backend Lead

**Test First**:
```typescript
// __tests__/lib/prompts/prompt-builder.test.ts
import { buildConstrainedPrompt } from '@/lib/prompts/prompt-builder';

describe('buildConstrainedPrompt', () => {
  const mockWizardData = {
    pageType: 'listing',
    content: {
      propertyType: 'detached_duplex',
      price: 85000000,
      beds: 4,
      baths: 3,
      sqm: 350,
      city: 'Lagos',
      area: 'Lekki Phase 1',
      features: ['Bore Hole', 'Generator House'],
    },
    style: { preset: 'modern' },
    whatsapp: {
      number: '08012345678',
      message: 'Interested in property',
      showFloating: true,
    },
  };
  
  it('returns system, user, and context', () => {
    const prompt = buildConstrainedPrompt(mockWizardData);
    expect(prompt.system).toBeDefined();
    expect(prompt.user).toBeDefined();
    expect(prompt.context).toBeDefined();
  });
  
  it('user prompt contains Naira price', () => {
    const prompt = buildConstrainedPrompt(mockWizardData);
    expect(prompt.user).toContain('₦');
    expect(prompt.user).toContain('85,000,000');
  });
  
  it('user prompt contains WhatsApp config', () => {
    const prompt = buildConstrainedPrompt(mockWizardData);
    expect(prompt.user).toContain('wa.me');
    expect(prompt.user).toContain('2348012345678');
  });
});
```

**Implementation**:
Reference: [02-TECHNICAL-SPEC.md Section 4.2.4](./02-TECHNICAL-SPEC.md#424-constrained-prompt-builder)

**Acceptance Criteria**:
- [x] Builds structured prompt from wizard data
- [x] Formats Naira prices correctly
- [x] Generates WhatsApp link
- [x] Includes all property data
- [x] Returns system, user, context

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-2LLM-001

---

#### BLDR-2VAL-001: Implement Nigerian Output Validator

**Priority**: P0 | **Effort**: 5 | **Owner**: Backend Lead

**Test First**:
```typescript
// __tests__/lib/validation/nigerian-validator.test.ts
import { validateNigerianOutput } from '@/lib/validation/nigerian-validator';

describe('validateNigerianOutput', () => {
  it('passes valid Nigerian content', () => {
    const code = `
      <div>
        <h1>4 Bedroom Duplex</h1>
        <p>₦85,000,000 • 350 sqm</p>
        <a href="https://wa.me/2348012345678">WhatsApp</a>
      </div>
    `;
    const result = validateNigerianOutput(code);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
  
  it('fails code with USD', () => {
    const code = `<p>$2,500,000</p>`;
    const result = validateNigerianOutput(code);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Missing Nigerian Naira (₦) currency');
  });
  
  it('fails code with sqft', () => {
    const code = `<p>2,500 sq ft</p>`;
    const result = validateNigerianOutput(code);
    expect(result.errors).toContain('Using square feet instead of square meters');
  });
  
  it('fails code without WhatsApp', () => {
    const code = `<button>Contact Us</button>`;
    const result = validateNigerianOutput(code);
    expect(result.errors).toContain('Missing WhatsApp integration');
  });
  
  it('provides auto-fixes for USD', () => {
    const code = `<p>$100,000</p>`;
    const result = validateNigerianOutput(code);
    expect(result.autoFixes.length).toBeGreaterThan(0);
  });
});
```

**Implementation**:
Reference: [02-TECHNICAL-SPEC.md Section 4.2.6](./02-TECHNICAL-SPEC.md#426-post-generation-validation-layer-5)

**Acceptance Criteria**:
- [x] Validates Naira presence
- [x] Validates sqm (rejects sqft)
- [x] Validates WhatsApp presence
- [x] Detects American terms
- [x] Returns auto-fix suggestions
- [x] Returns errors and warnings

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-1SET-002

---

#### BLDR-2VAL-002: Implement Auto-Fix Pipeline

**Priority**: P1 | **Effort**: 3 | **Owner**: Backend Lead

**Test First**:
```typescript
// __tests__/lib/validation/auto-fixer.test.ts
import { applyAutoFixes } from '@/lib/validation/nigerian-validator';

describe('applyAutoFixes', () => {
  it('converts USD to Naira', () => {
    const code = `<p>$100,000</p>`;
    const fixes = [{ pattern: /\$[\d,]+/g, replacement: '₦100000' }];
    const result = applyAutoFixes(code, fixes);
    expect(result).toContain('₦');
    expect(result).not.toContain('$');
  });
  
  it('converts sqft to sqm', () => {
    const code = `<p>1000 sqft</p>`;
    const fixes = [{
      pattern: /(\d+)\s*sqft/gi,
      replacement: (m: string) => `${Math.round(parseInt(m) * 0.0929)} sqm`
    }];
    const result = applyAutoFixes(code, fixes);
    expect(result).toContain('sqm');
    expect(result).not.toContain('sqft');
  });
});
```

**Implementation**:
Reference: [10-PROMPT-ENGINEERING.md Section 6](./10-PROMPT-ENGINEERING.md#6-layer-5-post-generation-validation)

**Acceptance Criteria**:
- [x] Applies regex-based fixes
- [x] Handles function replacements
- [x] Returns fixed code
- [x] Logs applied fixes

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-2VAL-001

---

### Epic: Guided Wizard UI

---

#### BLDR-2UI-001: Create PageType Selector Component

**Priority**: P0 | **Effort**: 3 | **Owner**: Frontend Lead

**Test First**:
```typescript
// __tests__/components/wizard/page-type-selector.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { PageTypeSelector } from '@/components/wizard/page-type-selector';

describe('PageTypeSelector', () => {
  it('renders all 7 page types', () => {
    render(<PageTypeSelector onSelect={jest.fn()} />);
    expect(screen.getByText('Property Listing')).toBeInTheDocument();
    expect(screen.getByText('Land Sale')).toBeInTheDocument();
    expect(screen.getByText('Agent Profile')).toBeInTheDocument();
    expect(screen.getByText('Short-Let')).toBeInTheDocument();
    expect(screen.getByText('Estate/Off-Plan')).toBeInTheDocument();
    expect(screen.getByText('Inspection Booking')).toBeInTheDocument();
    expect(screen.getByText('Agency About')).toBeInTheDocument();
  });
  
  it('calls onSelect with page type', () => {
    const onSelect = jest.fn();
    render(<PageTypeSelector onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Property Listing'));
    expect(onSelect).toHaveBeenCalledWith('listing');
  });
});
```

**Implementation**:
Reference: [09-GUIDED-PROMPT-FLOW.md](./09-GUIDED-PROMPT-FLOW.md)

**Acceptance Criteria**:
- [x] Shows all 7 Nigerian page types
- [x] Visual cards with icons
- [x] Selection state highlighted
- [x] Emits selected page type

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-1SET-003

---

#### BLDR-2UI-002: Create Property Type Selector

**Priority**: P0 | **Effort**: 3 | **Owner**: Frontend Lead

**Test First**:
```typescript
// __tests__/components/wizard/property-type-selector.test.tsx
describe('PropertyTypeSelector', () => {
  it('renders Nigerian property types', () => {
    render(<PropertyTypeSelector onSelect={jest.fn()} />);
    expect(screen.getByText('Detached Duplex')).toBeInTheDocument();
    expect(screen.getByText('Self-Contain')).toBeInTheDocument();
    expect(screen.getByText('Terrace Duplex')).toBeInTheDocument();
  });
});
```

**Implementation**:
Use constants from [09-GUIDED-PROMPT-FLOW.md](./09-GUIDED-PROMPT-FLOW.md)

**Acceptance Criteria**:
- [x] All Nigerian property types listed
- [x] Dropdown or card selection
- [x] Type-safe value returned

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-2UI-001

---

#### BLDR-2UI-003: Create Location Selector

**Priority**: P0 | **Effort**: 3 | **Owner**: Frontend Lead

**Test First**:
```typescript
// __tests__/components/wizard/location-selector.test.tsx
describe('LocationSelector', () => {
  it('shows Nigerian cities', () => {
    render(<LocationSelector onSelect={jest.fn()} />);
    expect(screen.getByText('Lagos')).toBeInTheDocument();
    expect(screen.getByText('Abuja')).toBeInTheDocument();
    expect(screen.getByText('Port Harcourt')).toBeInTheDocument();
  });
  
  it('shows areas after city selection', async () => {
    render(<LocationSelector onSelect={jest.fn()} />);
    fireEvent.click(screen.getByText('Lagos'));
    expect(await screen.findByText('Lekki Phase 1')).toBeInTheDocument();
    expect(await screen.findByText('Ikoyi')).toBeInTheDocument();
  });
});
```

**Implementation**:
Use LOCATIONS constant from [09-GUIDED-PROMPT-FLOW.md](./09-GUIDED-PROMPT-FLOW.md)

**Acceptance Criteria**:
- [x] City dropdown with Nigerian cities
- [x] Area dropdown populates based on city
- [x] Returns { city, area } object

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-2UI-001

---

#### BLDR-2UI-004: Create Nigerian Features Checklist

**Priority**: P0 | **Effort**: 3 | **Owner**: Frontend Lead

**Test First**:
```typescript
// __tests__/components/wizard/features-checklist.test.tsx
describe('FeaturesChecklist', () => {
  it('shows Nigerian property features', () => {
    render(<FeaturesChecklist onChange={jest.fn()} />);
    expect(screen.getByText('Bore Hole')).toBeInTheDocument();
    expect(screen.getByText('Generator House')).toBeInTheDocument();
    expect(screen.getByText('Boys Quarters (BQ)')).toBeInTheDocument();
    expect(screen.getByText('Security Post')).toBeInTheDocument();
  });
  
  it('returns selected features', () => {
    const onChange = jest.fn();
    render(<FeaturesChecklist onChange={onChange} />);
    fireEvent.click(screen.getByText('Bore Hole'));
    expect(onChange).toHaveBeenCalledWith(['borehole']);
  });
});
```

**Implementation**:
Use FEATURES constant from [09-GUIDED-PROMPT-FLOW.md](./09-GUIDED-PROMPT-FLOW.md)

**Acceptance Criteria**:
- [x] Checkboxes grouped by category (Utilities, Security, Compound, Interior)
- [x] Icons for each feature
- [x] Returns array of selected feature IDs

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-2UI-001

---

#### BLDR-2UI-005: Create Naira Price Input

**Priority**: P0 | **Effort**: 2 | **Owner**: Frontend Lead

**Test First**:
```typescript
// __tests__/components/wizard/naira-input.test.tsx
describe('NairaInput', () => {
  it('shows ₦ prefix', () => {
    render(<NairaInput value={0} onChange={jest.fn()} />);
    expect(screen.getByText('₦')).toBeInTheDocument();
  });
  
  it('formats number with thousands separator', () => {
    render(<NairaInput value={85000000} onChange={jest.fn()} />);
    expect(screen.getByDisplayValue('85,000,000')).toBeInTheDocument();
  });
  
  it('returns numeric value', () => {
    const onChange = jest.fn();
    render(<NairaInput value={0} onChange={onChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '50000000' } });
    expect(onChange).toHaveBeenCalledWith(50000000);
  });
});
```

**Implementation**:
Reference: [03-DESIGN-SYSTEM.md Currency Formatting](./03-DESIGN-SYSTEM.md)

**Acceptance Criteria**:
- [x] ₦ prefix displayed
- [x] Thousands separator formatting
- [x] Numeric keyboard on mobile
- [x] Returns number (not string)

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-1SET-003

---

#### BLDR-2UI-006: Create WhatsApp Config Input

**Priority**: P0 | **Effort**: 3 | **Owner**: Frontend Lead

**Test First**:
```typescript
// __tests__/components/wizard/whatsapp-config.test.tsx
describe('WhatsAppConfig', () => {
  it('shows +234 prefix', () => {
    render(<WhatsAppConfig onChange={jest.fn()} />);
    expect(screen.getByText('+234')).toBeInTheDocument();
  });
  
  it('validates Nigerian phone number', async () => {
    render(<WhatsAppConfig onChange={jest.fn()} />);
    const input = screen.getByPlaceholderText('08012345678');
    fireEvent.change(input, { target: { value: '123' } });
    expect(await screen.findByText(/invalid/i)).toBeInTheDocument();
  });
  
  it('generates correct wa.me link', () => {
    const onChange = jest.fn();
    render(<WhatsAppConfig onChange={onChange} />);
    fireEvent.change(screen.getByPlaceholderText('08012345678'), { 
      target: { value: '08012345678' } 
    });
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
      number: '08012345678',
    }));
  });
});
```

**Implementation**:
Reference: [09-GUIDED-PROMPT-FLOW.md WhatsApp Section](./09-GUIDED-PROMPT-FLOW.md)

**Acceptance Criteria**:
- [x] +234 country code prefix
- [x] Phone number validation
- [x] Pre-filled message input
- [x] Floating button toggle
- [x] Preview of generated link

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-1SET-003

---

#### BLDR-2UI-007: Create 4-Step Wizard Container

**Priority**: P0 | **Effort**: 5 | **Owner**: Frontend Lead

**Test First**:
```typescript
// __tests__/components/wizard/wizard-container.test.tsx
describe('WizardContainer', () => {
  it('renders step 1 (Page Type) initially', () => {
    render(<WizardContainer onComplete={jest.fn()} />);
    expect(screen.getByText('What type of page?')).toBeInTheDocument();
  });
  
  it('advances to step 2 after page type selection', async () => {
    render(<WizardContainer onComplete={jest.fn()} />);
    fireEvent.click(screen.getByText('Property Listing'));
    fireEvent.click(screen.getByText('Next'));
    expect(await screen.findByText('Property Details')).toBeInTheDocument();
  });
  
  it('shows progress indicator', () => {
    render(<WizardContainer onComplete={jest.fn()} />);
    expect(screen.getByTestId('progress-step-1')).toHaveClass('active');
  });
  
  it('calls onComplete with wizard data', async () => {
    const onComplete = jest.fn();
    render(<WizardContainer onComplete={onComplete} />);
    // Complete all 4 steps...
    fireEvent.click(screen.getByText('Generate'));
    expect(onComplete).toHaveBeenCalledWith(expect.objectContaining({
      pageType: expect.any(String),
      content: expect.any(Object),
      style: expect.any(Object),
      whatsapp: expect.any(Object),
    }));
  });
});
```

**Implementation**:
Reference: [09-GUIDED-PROMPT-FLOW.md Step Design](./09-GUIDED-PROMPT-FLOW.md)

**Acceptance Criteria**:
- [x] 4-step flow: Page Type → Content → Style → WhatsApp
- [x] Progress indicator
- [x] Back/Next navigation
- [x] Form state persisted between steps
- [x] Returns complete WizardData on finish

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-2UI-001 through BLDR-2UI-006

---

## Phase 3: WhatsApp + Templates (Weeks 5-6)

### Epic: WhatsApp Integration

---

#### BLDR-3UI-001: Create WhatsApp Floating Button

**Priority**: P0 | **Effort**: 2 | **Owner**: Frontend Lead

**Test First**:
```typescript
// __tests__/components/whatsapp/floating-button.test.tsx
describe('WhatsAppFloatingButton', () => {
  it('renders with WhatsApp green', () => {
    render(<WhatsAppFloatingButton phone="2348012345678" />);
    const button = screen.getByRole('link');
    expect(button).toHaveStyle({ backgroundColor: '#25D366' });
  });
  
  it('has correct href', () => {
    render(<WhatsAppFloatingButton phone="2348012345678" message="Hello" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://wa.me/2348012345678?text=Hello');
  });
  
  it('is fixed to bottom-right', () => {
    render(<WhatsAppFloatingButton phone="2348012345678" />);
    const button = screen.getByRole('link');
    expect(button).toHaveStyle({ position: 'fixed' });
  });
});
```

**Implementation**:
Reference: [03-DESIGN-SYSTEM.md WhatsApp Button](./03-DESIGN-SYSTEM.md)

**Acceptance Criteria**:
- [x] Fixed position bottom-right
- [x] WhatsApp green (#25D366)
- [x] Proper wa.me link format
- [x] URL-encoded message
- [x] Hover animation

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-1SET-003

---

#### BLDR-3UI-002: Create WhatsApp CTA Button

**Priority**: P0 | **Effort**: 2 | **Owner**: Frontend Lead

**Test First**:
```typescript
// __tests__/components/whatsapp/cta-button.test.tsx
describe('WhatsAppCTAButton', () => {
  it('renders with icon and text', () => {
    render(<WhatsAppCTAButton phone="2348012345678" />);
    expect(screen.getByText('Chat on WhatsApp')).toBeInTheDocument();
    expect(screen.getByTestId('whatsapp-icon')).toBeInTheDocument();
  });
});
```

**Implementation**:
Reference: [03-DESIGN-SYSTEM.md](./03-DESIGN-SYSTEM.md)

**Acceptance Criteria**:
- [x] Button variant matching design system
- [x] WhatsApp icon
- [x] Customizable label

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-1SET-003

---

### Epic: Template Library

---

#### BLDR-3TPL-001: Define Template Data Model

**Priority**: P0 | **Effort**: 3 | **Owner**: Backend Lead

**Test First**:
```typescript
// __tests__/lib/templates/types.test.ts
import { TemplateSchema } from '@/lib/templates/types';

describe('Template Schema', () => {
  it('validates template structure', () => {
    const template = {
      id: 'tmpl_listing_luxury_ng',
      name: 'Luxury Listing',
      category: 'listing',
      code: '<div>Template</div>',
      isPremium: false,
      nigeriaSpecific: true,
    };
    
    expect(() => TemplateSchema.parse(template)).not.toThrow();
  });
  
  it('requires nigeriaSpecific field', () => {
    const template = { id: 'test', name: 'Test' };
    expect(() => TemplateSchema.parse(template)).toThrow();
  });
});
```

**Implementation**:
Reference: [08-TEMPLATE-LIBRARY.md Template Structure](./08-TEMPLATE-LIBRARY.md)

**Acceptance Criteria**:
- [x] Zod schema for Template
- [x] All fields from spec defined
- [x] Type exports for TemplateCategory

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-1SET-002

---

#### BLDR-3TPL-002: Create Template API Routes

**Priority**: P0 | **Effort**: 3 | **Owner**: Backend Lead

**Test First**:
```typescript
// __tests__/api/templates.test.ts
describe('GET /api/templates', () => {
  it('returns list of templates', async () => {
    const res = await fetch('/api/templates');
    const data = await res.json();
    expect(data.templates).toBeInstanceOf(Array);
    expect(data.templates.length).toBeGreaterThan(0);
  });
  
  it('filters by category', async () => {
    const res = await fetch('/api/templates?category=listing');
    const data = await res.json();
    data.templates.forEach(t => {
      expect(t.category).toBe('listing');
    });
  });
});

describe('GET /api/templates/[id]', () => {
  it('returns template with code', async () => {
    const res = await fetch('/api/templates/tmpl_listing_standard_ng');
    const data = await res.json();
    expect(data.code).toBeDefined();
  });
});
```

**Implementation**:
Reference: [05-API-REFERENCE.md Templates](./05-API-REFERENCE.md)

**Acceptance Criteria**:
- [x] GET /api/templates with filters
- [x] GET /api/templates/[id]
- [x] Pagination support

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-3TPL-001

---

#### BLDR-3TPL-003: Create 10 MVP Nigerian Templates

**Priority**: P0 | **Effort**: 8 | **Owner**: Frontend Lead + Designer

**Test First**:
```typescript
// __tests__/templates/mvp-templates.test.ts
import { MVP_TEMPLATES } from '@/lib/templates/mvp';

describe('MVP Templates', () => {
  it('has 10 templates', () => {
    expect(MVP_TEMPLATES).toHaveLength(10);
  });
  
  it('all templates are Nigeria-specific', () => {
    MVP_TEMPLATES.forEach(t => {
      expect(t.nigeriaSpecific).toBe(true);
    });
  });
  
  it('all templates have valid categories', () => {
    const validCategories = ['listing', 'land', 'agent', 'shortlet', 'estate', 'inspection', 'agency'];
    MVP_TEMPLATES.forEach(t => {
      expect(validCategories).toContain(t.category);
    });
  });
  
  it('listing template contains Naira formatting', () => {
    const listing = MVP_TEMPLATES.find(t => t.category === 'listing');
    expect(listing.code).toContain('₦');
  });
  
  it('all templates have WhatsApp integration', () => {
    MVP_TEMPLATES.forEach(t => {
      expect(t.code).toMatch(/wa\.me|WhatsApp/i);
    });
  });
});
```

**Templates to Create** (Reference: [08-TEMPLATE-LIBRARY.md](./08-TEMPLATE-LIBRARY.md)):
1. Standard Property Listing
2. Duplex Showcase
3. Land Sale Page
4. Agent Bio Page
5. Short-Let Apartment
6. Property Inspection Event
7. Off-Plan Estate
8. Team/Agency Page
9. Area Guide
10. Seller Services

**Acceptance Criteria**:
- [x] 10 templates created
- [x] All use Naira (₦)
- [x] All use sqm
- [x] All have WhatsApp buttons
- [x] All pass Nigerian validation
- [x] Responsive design (mobile-first)

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-3TPL-001, BLDR-3UI-001, BLDR-3UI-002

---

### Epic: Export System

---

#### BLDR-3API-001: Create HTML Export Endpoint

**Priority**: P1 | **Effort**: 5 | **Owner**: Backend Lead

**Test First**:
```typescript
// __tests__/api/export.test.ts
describe('POST /api/export', () => {
  it('returns HTML file for generated code', async () => {
    const res = await fetch('/api/export', {
      method: 'POST',
      body: JSON.stringify({
        code: '<div>Test</div>',
        format: 'html',
      }),
    });
    
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.downloadUrl).toBeDefined();
  });
  
  it('returns ZIP for nextjs format', async () => {
    const res = await fetch('/api/export', {
      method: 'POST',
      body: JSON.stringify({ code: '...', format: 'zip' }),
    });
    
    const data = await res.json();
    expect(data.downloadUrl).toContain('.zip');
  });
});
```

**Implementation**:
Reference: [05-API-REFERENCE.md Export](./05-API-REFERENCE.md)

**Acceptance Criteria**:
- [x] Generates standalone HTML
- [x] Inlines Tailwind CSS
- [x] Includes WhatsApp button
- [x] Returns downloadable link

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-1API-001

---

## Phase 4: Payment + Polish (Weeks 7-8)

### Epic: Paystack Integration

---

#### BLDR-4PAY-001: Create Paystack Subscription Endpoint

**Priority**: P0 | **Effort**: 5 | **Owner**: Backend Lead

**Test First**:
```typescript
// __tests__/api/payments/subscribe.test.ts
describe('POST /api/payments/subscribe', () => {
  it('returns Paystack payment URL', async () => {
    const res = await fetch('/api/payments/subscribe', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        plan: 'pro',
      }),
    });
    
    const data = await res.json();
    expect(data.authorization_url).toContain('paystack.com');
  });
  
  it('validates plan selection', async () => {
    const res = await fetch('/api/payments/subscribe', {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        plan: 'invalid',
      }),
    });
    
    expect(res.status).toBe(400);
  });
});
```

**Implementation**:
Reference: [02-TECHNICAL-SPEC.md Nigeria Integrations](./02-TECHNICAL-SPEC.md)

**Acceptance Criteria**:
- [x] Initialize Paystack transaction
- [x] Support ₦ pricing tiers (₦5,000, ₦15,000, ₦50,000)
- [x] Return authorization URL
- [x] Handle webhooks

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-1SET-005

---

#### BLDR-4PAY-002: Create Paystack Webhook Handler

**Priority**: P0 | **Effort**: 3 | **Owner**: Backend Lead

**Test First**:
```typescript
// __tests__/api/payments/webhook.test.ts
describe('POST /api/payments/webhook', () => {
  it('verifies Paystack signature', async () => {
    // Mock invalid signature
    const res = await fetch('/api/payments/webhook', {
      method: 'POST',
      headers: {
        'x-paystack-signature': 'invalid',
      },
      body: JSON.stringify({ event: 'charge.success' }),
    });
    
    expect(res.status).toBe(401);
  });
  
  it('activates subscription on charge.success', async () => {
    // Mock valid webhook
    // ... test subscription activation
  });
});
```

**Acceptance Criteria**:
- [x] Verify webhook signature
- [x] Handle charge.success
- [x] Update user subscription status
- [x] Log transactions

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-4PAY-001

---

### Epic: Rate Limiting & Caching

---

#### BLDR-4API-001: Implement Redis Rate Limiting

**Priority**: P0 | **Effort**: 3 | **Owner**: Backend Lead

**Test First**:
```typescript
// __tests__/lib/rate-limit.test.ts
import { rateLimit } from '@/lib/rate-limit';

describe('Rate Limiter', () => {
  it('allows requests within limit', async () => {
    const limiter = rateLimit({ maxRequests: 5, window: '1m' });
    
    for (let i = 0; i < 5; i++) {
      const result = await limiter.check('user-123');
      expect(result.allowed).toBe(true);
    }
  });
  
  it('blocks requests over limit', async () => {
    const limiter = rateLimit({ maxRequests: 2, window: '1m' });
    
    await limiter.check('user-456');
    await limiter.check('user-456');
    const result = await limiter.check('user-456');
    
    expect(result.allowed).toBe(false);
  });
});
```

**Implementation**:
```bash
pnpm add @upstash/ratelimit @upstash/redis
```

**Acceptance Criteria**:
- [x] Per-user rate limiting
- [x] Tiered limits (Free: 5/hr, Pro: 50/hr)
- [x] Returns rate limit headers
- [x] Redis-based for serverless

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-1SET-005


---

#### BLDR-4API-002: Implement Response Caching

**Priority**: P1 | **Effort**: 3 | **Owner**: Backend Lead

**Test First**:
```typescript
// __tests__/lib/cache.test.ts
describe('Response Cache', () => {
  it('caches identical prompts', async () => {
    const cache = new ResponseCache();
    
    const result1 = await cache.getOrGenerate('prompt-hash', generateFn);
    const result2 = await cache.getOrGenerate('prompt-hash', generateFn);
    
    expect(result1).toEqual(result2);
    expect(generateFn).toHaveBeenCalledTimes(1);
  });
});
```

**Acceptance Criteria**:
- [x] Cache generated responses
- [x] Prompt hash as key
- [x] TTL configurable
- [x] Cache hit/miss metrics

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-1SET-005


---

## Additional Tickets (Gap Analysis Additions)

> These tickets were identified during gap analysis review against the PRD.

### Epic: Authentication & User Management

---

#### BLDR-1AUTH-001: Setup NextAuth.js Authentication

**Priority**: P0 | **Effort**: 5 | **Owner**: Backend Lead

**Test First**:
```typescript
// __tests__/auth/nextauth.test.ts
describe('Authentication', () => {
  it('redirects unauthenticated users to login', async () => {
    const res = await fetch('/dashboard');
    expect(res.redirected).toBe(true);
    expect(res.url).toContain('/login');
  });
  
  it('allows authenticated users to access dashboard', async () => {
    // Mock authenticated session
    const res = await fetch('/dashboard', { headers: { cookie: sessionCookie } });
    expect(res.status).toBe(200);
  });
});
```

**Implementation**:
```bash
pnpm add next-auth @auth/prisma-adapter
```

**Acceptance Criteria**:
- [x] NextAuth.js configured with Prisma adapter
- [x] Email/password credentials provider
- [x] Session stored in database
- [x] Protected routes middleware
- [x] JWT token handling

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-1SET-004

---

#### BLDR-1AUTH-002: Create User Registration Flow

**Priority**: P0 | **Effort**: 3 | **Owner**: Frontend Lead

**Test First**:
```typescript
// __tests__/auth/registration.test.tsx
describe('User Registration', () => {
  it('validates email format', async () => {
    render(<RegisterForm />);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'invalid' } });
    fireEvent.click(screen.getByText('Sign Up'));
    expect(await screen.findByText(/valid email/i)).toBeInTheDocument();
  });
  
  it('creates user on valid submission', async () => {
    // ... test successful registration
  });
});
```

**Acceptance Criteria**:
- [x] Registration form with email, password, name
- [x] Email validation
- [x] Password strength requirements
- [x] Error handling for existing email
- [x] Success redirect to dashboard

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-1AUTH-001

---

### Epic: Project Management

---

#### BLDR-2API-001: Create Project CRUD API

**Priority**: P0 | **Effort**: 5 | **Owner**: Backend Lead

**Test First**:
```typescript
// __tests__/api/projects.test.ts
describe('Project API', () => {
  it('POST /api/projects creates project', async () => {
    const res = await fetch('/api/projects', {
      method: 'POST',
      body: JSON.stringify({ name: 'My Property Page', pageType: 'listing' }),
    });
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.id).toBeDefined();
  });
  
  it('GET /api/projects returns user projects', async () => {
    const res = await fetch('/api/projects');
    const data = await res.json();
    expect(data.projects).toBeInstanceOf(Array);
  });
  
  it('PUT /api/projects/[id] updates project', async () => {
    const res = await fetch('/api/projects/proj_123', {
      method: 'PUT',
      body: JSON.stringify({ code: 'updated code' }),
    });
    expect(res.status).toBe(200);
  });
  
  it('DELETE /api/projects/[id] removes project', async () => {
    const res = await fetch('/api/projects/proj_123', { method: 'DELETE' });
    expect(res.status).toBe(204);
  });
});
```

**Acceptance Criteria**:
- [x] Create, Read, Update, Delete projects
- [x] User scoping (users see only their projects)
- [x] Pagination for list
- [ ] Project versioning support

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-1SET-004, BLDR-1AUTH-001

---

#### BLDR-2UI-009: Create User Dashboard

**Priority**: P0 | **Effort**: 5 | **Owner**: Frontend Lead

**Test First**:
```typescript
// __tests__/components/dashboard.test.tsx
describe('Dashboard', () => {
  it('shows list of user projects', () => {
    render(<Dashboard projects={mockProjects} />);
    expect(screen.getByText('4BR Duplex Lekki')).toBeInTheDocument();
  });
  
  it('shows empty state when no projects', () => {
    render(<Dashboard projects={[]} />);
    expect(screen.getByText(/create your first page/i)).toBeInTheDocument();
  });
  
  it('has create new button', () => {
    render(<Dashboard projects={[]} />);
    expect(screen.getByRole('link', { name: /new page/i })).toHaveAttribute('href', '/builder');
  });
});
```

**Acceptance Criteria**:
- [x] Grid/list view of projects
- [x] Project cards with thumbnail, name, date
- [x] Create new page button
- [x] Delete project action
- [x] Edit project action
- [x] Empty state design

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-2API-001, BLDR-1AUTH-001

---

### Epic: Brand Customization

---

#### BLDR-2UI-011: Create Brand Settings Component

**Priority**: P1 | **Effort**: 3 | **Owner**: Frontend Lead

**Test First**:
```typescript
// __tests__/components/brand-settings.test.tsx
describe('BrandSettings', () => {
  it('allows color selection', () => {
    render(<BrandSettings onChange={jest.fn()} />);
    expect(screen.getByLabelText('Primary Color')).toBeInTheDocument();
    expect(screen.getByLabelText('Secondary Color')).toBeInTheDocument();
  });
  
  it('allows logo upload', () => {
    render(<BrandSettings onChange={jest.fn()} />);
    expect(screen.getByLabelText(/upload logo/i)).toBeInTheDocument();
  });
  
  it('emits brand settings on change', () => {
    const onChange = jest.fn();
    render(<BrandSettings onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Primary Color'), { target: { value: '#1a365d' } });
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
      primaryColor: '#1a365d',
    }));
  });
});
```

**Acceptance Criteria**:
- [x] Color pickers (primary, secondary, accent)
- [x] Font family selector
- [x] Logo upload
- [x] Company name input
- [x] Preview of brand colors
- [x] Save brand settings to user profile (via callback)

**Status**: ✅ COMPLETE (December 2025)

**Dependencies**: BLDR-1SET-003

---

### Epic: UX Polish

---

#### BLDR-2UI-012: Create Error & Loading States

**Priority**: P1 | **Effort**: 3 | **Owner**: Frontend Lead

**Test First**:
```typescript
// __tests__/components/states.test.tsx
describe('UI States', () => {
  it('renders loading skeleton', () => {
    render(<LoadingSkeleton />);
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });
  
  it('renders error state with retry', () => {
    const onRetry = jest.fn();
    render(<ErrorState message="Generation failed" onRetry={onRetry} />);
    expect(screen.getByText('Generation failed')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Try Again'));
    expect(onRetry).toHaveBeenCalled();
  });
  
  it('renders empty state with CTA', () => {
    render(<EmptyState title="No projects" cta="Create First Page" />);
    expect(screen.getByText('No projects')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
  });
});
```

**Acceptance Criteria**:
- [x] Loading skeleton for generation
- [x] Error state with retry button
- [x] Empty state for no projects
- [x] Toast notifications
- [x] Progress indicator for streaming

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-1SET-003

---

#### BLDR-3UI-003: Create Onboarding Flow

**Priority**: P2 | **Effort**: 3 | **Owner**: Frontend Lead

**Test First**:
```typescript
// __tests__/components/onboarding.test.tsx
describe('Onboarding', () => {
  it('shows onboarding for new users', () => {
    render(<Onboarding isFirstTime={true} />);
    expect(screen.getByText(/welcome to buildr/i)).toBeInTheDocument();
  });
  
  it('can skip onboarding', () => {
    const onComplete = jest.fn();
    render(<Onboarding isFirstTime={true} onComplete={onComplete} />);
    fireEvent.click(screen.getByText('Skip'));
    expect(onComplete).toHaveBeenCalled();
  });
  
  it('shows wizard steps', () => {
    render(<Onboarding isFirstTime={true} />);
    expect(screen.getByText('Step 1')).toBeInTheDocument();
  });
});
```

**Acceptance Criteria**:
- [x] 3-step onboarding wizard
- [x] Explains wizard flow
- [x] Shows example generation
- [x] Skip option
- [x] Stores completion in user profile

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-1AUTH-001

---

#### BLDR-1UI-003: Create Marketing Landing Page

**Priority**: P1 | **Effort**: 5 | **Owner**: Frontend Lead

**Test First**:
```typescript
// __tests__/pages/home.test.tsx
describe('Marketing Homepage', () => {
  it('renders hero section', () => {
    render(<HomePage />);
    expect(screen.getByText(/ai-powered/i)).toBeInTheDocument();
  });
  
  it('has CTA buttons', () => {
    render(<HomePage />);
    expect(screen.getByRole('link', { name: /get started/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /see demo/i })).toBeInTheDocument();
  });
  
  it('shows Nigerian focus', () => {
    render(<HomePage />);
    expect(screen.getByText(/nigerian real estate/i)).toBeInTheDocument();
    expect(screen.getByText(/₦/)).toBeInTheDocument();
  });
});
```

**Acceptance Criteria**:
- [x] Hero with value proposition
- [x] Feature highlights
- [x] Nigerian market messaging
- [x] Pricing tiers (₦5K, ₦15K, ₦50K)
- [x] CTA to sign up
- [x] Mobile responsive

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-1SET-003

---

### Epic: Usage & Limits

---

#### BLDR-4API-003: Implement Usage Tracking & Limits

**Priority**: P1 | **Effort**: 5 | **Owner**: Backend Lead

**Test First**:
```typescript
// __tests__/lib/usage.test.ts
describe('Usage Tracking', () => {
  it('tracks page generations per user', async () => {
    await trackGeneration('user_123');
    const usage = await getUsage('user_123');
    expect(usage.generations).toBe(1);
  });
  
  it('blocks when limit reached', async () => {
    // Set user to free tier (3/month)
    for (let i = 0; i < 3; i++) await trackGeneration('user_free');
    
    const canGenerate = await checkLimit('user_free');
    expect(canGenerate).toBe(false);
  });
  
  it('resets monthly', async () => {
    // Test monthly reset logic
  });
});
```

**Acceptance Criteria**:
- [x] Track generations per user
- [x] Tier-based limits (Free: 3, Starter: 15, Pro: 50)
- [x] Monthly reset
- [x] Usage API endpoint
- [ ] Dashboard usage display

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-1SET-004, BLDR-1AUTH-001

---

### Epic: Testing

---

#### BLDR-4TST-001: Mobile Testing Suite

**Priority**: P1 | **Effort**: 3 | **Owner**: QA Engineer

**Test First**:
```typescript
// __tests__/e2e/mobile.spec.ts
import { test, expect, devices } from '@playwright/test';

test.describe('Mobile Experience', () => {
  test.use({ ...devices['iPhone 13'] });
  
  test('wizard is usable on mobile', async ({ page }) => {
    await page.goto('/builder');
    await expect(page.locator('.wizard-container')).toBeVisible();
    await page.tap('text=Property Listing');
    await expect(page.locator('.step-2')).toBeVisible();
  });
  
  test('preview is responsive', async ({ page }) => {
    await page.goto('/builder');
    // Check preview container adapts
  });
  
  test('WhatsApp button is tappable', async ({ page }) => {
    await page.goto('/preview/sample');
    const whatsapp = page.locator('[data-testid="whatsapp-button"]');
    await expect(whatsapp).toBeVisible();
    // Check touch target size >= 44x44
  });
});
```

**Acceptance Criteria**:
- [x] Playwright mobile device testing
- [x] iPhone, Samsung Galaxy viewports
- [x] Touch target sizes verified (44x44 min)
- [x] Wizard usable on mobile
- [x] Preview responsive

**Status**: ✅ COMPLETE (December 2024)

**Dependencies**: BLDR-2UI-007

---

## Summary: Ticket Count by Phase (Updated)

| Phase | Epic | Ticket Count | Total Effort |
|-------|------|--------------|--------------|
| **Phase 1** | Setup | 5 | 11 |
| **Phase 1** | Auth | 2 | 8 |
| **Phase 1** | LLM Gateway | 2 | 10 |
| **Phase 1** | Basic UI | 3 | 11 |
| **Phase 2** | Prompt Engineering | 5 | 21 |
| **Phase 2** | Guided Wizard | 8 | 27 |
| **Phase 2** | Project Management | 2 | 10 |
| **Phase 2** | Editor & UX | 4 | 16 |
| **Phase 2** | Live Preview | 1 | 5 |
| **Phase 3** | WhatsApp | 2 | 4 |
| **Phase 3** | Templates | 3 | 14 |
| **Phase 3** | Export | 1 | 5 |
| **Phase 3** | Onboarding | 1 | 3 |
| **Phase 4** | Payments | 2 | 8 |
| **Phase 4** | Infrastructure | 3 | 11 |
| **Phase 4** | Testing | 1 | 3 |
| **TOTAL** | | **45 tickets** | **167 points** |

---

## TDD Workflow Reminder

For each ticket, developers should follow:

```
1. ❌ Write failing test(s) for the feature
2. ✅ Write minimal code to pass tests
3. 🔄 Refactor while keeping tests green
4. 📝 Update documentation if needed
5. 🔍 Code review with test coverage check
```

---

> **Document Owner**: Technical Project Manager  
> **Created**: December 8, 2024  
> **Updated**: December 8, 2024 (Gap analysis additions)  
> **Sprint Length**: 2 weeks  
> **Team Size Assumption**: 2-3 developers

