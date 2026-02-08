# Testing Strategy Document
# Buildr — Quality Assurance Plan

> **Version**: 2.0 | **Updated**: December 8, 2024  
> **Approach**: Template-Only (form validation, template rendering)

---

## 1. Testing Philosophy

### Core Principles

| Principle | Description |
|-----------|-------------|
| **Shift Left** | Catch issues early with static analysis and unit tests |
| **Template-Focused** | Test that templates render correctly with various data |
| **Form Validation** | Ensure all wizard steps validate properly |
| **User-Centric** | E2E tests mirror real user workflows |
| **Continuous** | Tests run on every PR and deployment |

---

## 2. Testing Pyramid

```
         ┌─────────────────┐
         │   E2E / Visual  │  10%
         │    (Playwright)  │
         ├─────────────────┤
         │   Integration   │  25%
         │   (API + LLM)   │
         ├─────────────────┤
         │      Unit       │  35%
         │  (Jest + RTL)   │
         ├─────────────────┤
         │ Static Analysis │  30%
         │ (TypeScript/ESLint) │
         └─────────────────┘
```

---

## 3. Test Categories

### 3.1 Static Analysis

**Tools**: TypeScript, ESLint, Prettier

**What We Check**:
- Type errors in all code
- Code style consistency
- Accessibility linting (eslint-plugin-jsx-a11y)
- Import/export correctness

**Configuration**:
```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended"
  ]
}
```

---

### 3.2 Unit Tests

**Tools**: Jest, React Testing Library

**Coverage Targets**:
| Category | Target |
|----------|--------|
| Utility functions | 90% |
| Hooks | 80% |
| UI components | 70% |
| Overall | 75% |

**Examples**:

```typescript
// lib/prompts/__tests__/enhancer.test.ts
describe('Prompt Enhancer', () => {
  it('classifies property listing prompt correctly', () => {
    const input = 'Create a page for my beach house listing';
    const result = classifyPageType(input);
    expect(result).toBe('listing');
  });

  it('adds real estate context to prompts', () => {
    const enhanced = enhancePrompt('Show my 3 bed house');
    expect(enhanced).toContain('property');
    expect(enhanced).toContain('beds');
  });
});
```

```typescript
// components/builder/__tests__/prompt-input.test.tsx
describe('PromptInput', () => {
  it('submits on enter key', async () => {
    const onSubmit = jest.fn();
    render(<PromptInput onSubmit={onSubmit} />);
    
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Create a listing page{enter}');
    
    expect(onSubmit).toHaveBeenCalledWith('Create a listing page');
  });

  it('disables submit when loading', () => {
    render(<PromptInput isLoading={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

---

### 3.3 Integration Tests

**Tools**: Jest, MSW (Mock Service Worker)

**What We Test**:
- API route handlers
- LLM gateway with mocked responses
- Database operations
- Authentication flows

**Example**:

```typescript
// __tests__/api/generate.test.ts
describe('POST /api/generate', () => {
  beforeEach(() => {
    // Mock LLM response
    server.use(
      rest.post('https://api.openai.com/v1/chat/completions', (req, res, ctx) => {
        return res(ctx.json({
          choices: [{ message: { content: SAMPLE_COMPONENT_CODE } }]
        }));
      })
    );
  });

  it('returns valid React component', async () => {
    const response = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt: 'Create hero section', pageType: 'custom' }),
    });
    
    const data = await response.json();
    expect(data.code).toContain('export');
    expect(data.code).toContain('return');
  });

  it('handles LLM failure gracefully', async () => {
    server.use(
      rest.post('https://api.openai.com/*', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    
    const response = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt: 'Test', pageType: 'custom' }),
    });
    
    expect(response.status).toBe(500);
  });
});
```

---

### 3.4 Template Rendering Tests

**Purpose**: Ensure templates render correctly with various property data.

```typescript
// __tests__/templates/template-rendering.test.tsx
import { render, screen } from '@testing-library/react';
import { renderTemplate, getTemplate } from '@/lib/templates';
import { LuxuryPropertyListing } from '@/templates/luxury-property-listing';

describe('Template Rendering', () => {
  it('renders template with Nigerian property data', async () => {
    const { container } = render(
      <LuxuryPropertyListing
        price={85000000}
        beds={4}
        baths={4}
        sqm={350}
        location="Lekki Phase 1, Lagos"
        features={['borehole', 'bq', 'generator_house']}
      />
    );
    
    // Verify Naira formatting
    expect(container).toHaveTextContent('₦85,000,000');
    // Verify sqm not sqft
    expect(container).toHaveTextContent('350 sqm');
    // Verify Nigerian features
    expect(container).toHaveTextContent('Bore Hole');
  });

  it('includes WhatsApp CTA button', () => {
    render(<LuxuryPropertyListing {...mockData} whatsapp="08012345678" />);
    expect(screen.getByRole('link', { name: /whatsapp/i })).toBeInTheDocument();
  });

  it('renders all required sections', () => {
    render(<LuxuryPropertyListing {...mockData} />);
    expect(screen.getByRole('img')).toBeInTheDocument(); // Hero image
    expect(screen.getByText(/bedroom/i)).toBeInTheDocument();
    expect(screen.getByText(/bathroom/i)).toBeInTheDocument();
  });
});
```

### 3.4.1 Form Validation Tests

```typescript
// __tests__/wizard/form-validation.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { PropertyDetailsForm } from '@/components/wizard/property-form';

describe('Form Validation', () => {
  it('validates required fields', async () => {
    render(<PropertyDetailsForm />);
    fireEvent.click(screen.getByText('Next'));
    expect(await screen.findByText('Price is required')).toBeInTheDocument();
  });

  it('formats Naira currency on input', () => {
    render(<PropertyDetailsForm />);
    const priceInput = screen.getByLabelText('Price');
    fireEvent.change(priceInput, { target: { value: '85000000' } });
    expect(priceInput).toHaveValue('₦85,000,000');
  });

  it('validates WhatsApp number format', async () => {
    render(<PropertyDetailsForm />);
    const whatsappInput = screen.getByLabelText('WhatsApp');
    fireEvent.change(whatsappInput, { target: { value: '123' } });
    fireEvent.blur(whatsappInput);
    expect(await screen.findByText(/valid Nigerian phone/i)).toBeInTheDocument();
  });
});
```

---

### 3.5 Nigerian Market Validation Tests 🇳🇬

> **Reference**: Validation logic defined in [10-PROMPT-ENGINEERING.md](./10-PROMPT-ENGINEERING.md)

**Purpose**: Ensure template output meets Nigerian real estate market requirements.

```typescript
// __tests__/validation/nigerian-validator.test.ts
import { validateNigerianOutput } from '@/lib/validation/nigerian-validator';

describe('Nigerian Output Validation', () => {
  // CRITICAL: Currency Tests
  describe('Currency Validation', () => {
    it('validates code with Naira currency', () => {
      const code = `<p className="price">₦85,000,000</p>`;
      const result = validateNigerianOutput(code);
      expect(result.valid).toBe(true);
      expect(result.errors).not.toContain('Missing Nigerian Naira (₦) currency');
    });

    it('rejects code with USD currency', () => {
      const code = `<p className="price">$2,500,000</p>`;
      const result = validateNigerianOutput(code);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Missing Nigerian Naira (₦) currency');
      expect(result.autoFixes.length).toBeGreaterThan(0);
    });

    it('provides auto-fix for USD to Naira', () => {
      const code = `<p>$100,000</p>`;
      const result = validateNigerianOutput(code);
      expect(result.autoFixes.some(f => f.description.includes('USD to Naira'))).toBe(true);
    });
  });

  // CRITICAL: Measurement Tests
  describe('Measurement Validation', () => {
    it('validates code with sqm measurements', () => {
      const code = `<span>350 sqm</span>`;
      const result = validateNigerianOutput(code);
      expect(result.errors).not.toContain('Using square feet instead of square meters');
    });

    it('rejects code with sqft measurements', () => {
      const code = `<span>2,500 sq ft</span>`;
      const result = validateNigerianOutput(code);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Using square feet instead of square meters');
    });

    it('provides auto-fix for sqft to sqm', () => {
      const code = `<span>1,000 sqft</span>`;
      const result = validateNigerianOutput(code);
      const fix = result.autoFixes.find(f => f.description.includes('sqft to sqm'));
      expect(fix).toBeDefined();
    });
  });

  // CRITICAL: WhatsApp Tests
  describe('WhatsApp Integration', () => {
    it('validates code with WhatsApp integration', () => {
      const code = `<a href="https://wa.me/2348012345678">Chat on WhatsApp</a>`;
      const result = validateNigerianOutput(code);
      expect(result.errors).not.toContain('Missing WhatsApp integration');
    });

    it('rejects code without WhatsApp integration', () => {
      const code = `<button>Contact Us</button>`;
      const result = validateNigerianOutput(code);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Missing WhatsApp integration');
    });
  });

  // WARNING: American Terms Detection
  describe('American Terms Detection', () => {
    it('warns about American real estate terms', () => {
      const code = `<p>MLS Listing #12345</p>`;
      const result = validateNigerianOutput(code);
      expect(result.warnings.some(w => w.includes('American terms detected'))).toBe(true);
    });

    it('detects multiple American terms', () => {
      const code = `<p>HOA fees: $500. Ask your realtor about escrow.</p>`;
      const result = validateNigerianOutput(code);
      expect(result.warnings.some(w => 
        w.includes('HOA') && w.includes('realtor') && w.includes('escrow')
      )).toBe(true);
    });

    it('passes clean Nigerian content', () => {
      const code = `
        <div>
          <h1>4 Bedroom Duplex in Lekki</h1>
          <p>₦85,000,000 • 350 sqm</p>
          <p>Features: Bore Hole, Generator House, BQ</p>
          <a href="https://wa.me/2348012345678">WhatsApp Us</a>
        </div>
      `;
      const result = validateNigerianOutput(code);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.warnings).toHaveLength(0);
    });
  });
});
```

---


### 3.6 E2E Tests

**Tools**: Playwright

**User Flows Tested**:
1. Complete generation workflow
2. Iterative refinement
3. Template selection → customization
4. Export to HTML
5. Authentication flow

**Example**:

```typescript
// e2e/generation.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Page Generation', () => {
  test('generates page from prompt', async ({ page }) => {
    await page.goto('/builder');
    
    // Enter prompt
    await page.fill('[data-testid="prompt-input"]', 
      'Create a property listing for a 3 bed house');
    await page.click('[data-testid="generate-button"]');
    
    // Wait for generation
    await expect(page.locator('[data-testid="preview-frame"]'))
      .toBeVisible({ timeout: 30000 });
    
    // Verify code generated
    const code = await page.locator('[data-testid="code-editor"]').textContent();
    expect(code).toContain('export');
  });

  test('refines existing page', async ({ page }) => {
    await page.goto('/builder');
    
    // Generate initial page
    await page.fill('[data-testid="prompt-input"]', 'Create a hero section');
    await page.click('[data-testid="generate-button"]');
    await page.waitForSelector('[data-testid="preview-frame"]');
    
    // Request refinement
    await page.fill('[data-testid="prompt-input"]', 
      'Add a gradient background');
    await page.click('[data-testid="generate-button"]');
    await page.waitForTimeout(3000);
    
    // Verify change
    const code = await page.locator('[data-testid="code-editor"]').textContent();
    expect(code).toMatch(/gradient/i);
  });
});
```

---

### 3.6 Visual Regression Tests

**Tools**: Playwright, Percy (optional)

```typescript
// e2e/visual.spec.ts
test('hero section matches design', async ({ page }) => {
  await page.goto('/preview/sample-hero');
  await page.waitForTimeout(1000); // Wait for hydration
  
  await expect(page).toHaveScreenshot('hero-desktop.png', {
    threshold: 0.1
  });
});

test('mobile layout is correct', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/preview/sample-hero');
  
  await expect(page).toHaveScreenshot('hero-mobile.png');
});
```

---

## 4. CI/CD Pipeline

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Test Suite

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm typecheck

  unit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: pnpm install
      - run: pnpm test -- --coverage

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: pnpm install
      - run: pnpm dlx playwright install
      - run: pnpm test:e2e
```

---

## 5. LLM-Specific Testing Considerations

### Handling Non-Determinism

| Strategy | Implementation |
|----------|----------------|
| Seed prompts | Use fixed prompts for baseline tests |
| Structure validation | Check for required elements, not exact output |
| Mock in unit tests | Mock LLM responses for determinism |
| Smoke tests | Periodic real LLM calls in staging |

### Quality Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Generation success rate | > 95% | Valid code / attempts |
| Validation pass rate | > 90% | Passes without fixes |
| Average refinements | < 3 | User iterations needed |

---

## 6. Test Commands

```bash
# Run all tests
# Run all tests
pnpm test

# Run unit tests with coverage
pnpm test -- --coverage

# Run E2E tests
pnpm test:e2e

# Run specific test file
pnpm test -- prompt-input.test.tsx

# Update visual snapshots
pnpm dlx playwright test --update-snapshots
```

---

> **Related**: [Technical Spec](./02-TECHNICAL-SPEC.md)
