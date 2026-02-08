# Technical Specification Document (Extended)
# Buildr — AI-Powered Template Builder

> **Version**: 3.0 | **Updated**: December 8, 2024  
> **Approach**: Template-Only (non-technical users)

---

## Table of Contents

1. [Technology Stack](#1-technology-stack)
2. [System Architecture](#2-system-architecture)
3. [Project Structure](#3-project-structure)
4. [Core Implementation Details](#4-core-implementation-details)
5. [API Specification](#5-api-specification)
6. [Database Schema](#6-database-schema)
7. [Security & Authentication](#7-security--authentication)
8. [Performance & Caching](#8-performance--caching)
9. [Deployment & Infrastructure](#9-deployment--infrastructure)
10. [Monitoring & Observability](#10-monitoring--observability)

---

## 1. Technology Stack

### Frontend Stack

| Technology | Version | Purpose | Justification |
|------------|---------|---------|---------------|
| **Next.js** | 14.2+ | Framework | Server Components, streaming, built-in optimization |
| **React** | 18.2+ | UI library | Industry standard, concurrent features |
| **TypeScript** | 5.0+ | Type safety | Catch errors at compile-time, better DX |
| **Tailwind CSS** | 3.4+ | Styling | Utility-first, template-friendly |
| **shadcn/ui** | Latest | Component library | Art-directed extensions (see 16-TEMPLATE-DESIGN-SPEC) |
| **Zustand** | 4.5+ | State management | Lightweight, wizard form state |
| **React Hook Form** | 7.0+ | Form handling | Template customization forms |
| **Framer Motion** | 10.0+ | Animation | Aura-level motion design |
| **Zod** | 3.22+ | Validation | Form validation, template schemas |

### Backend Stack

| Technology | Version | Purpose | Justification |
|------------|---------|---------|---------------|
| **Next.js API Routes** | 14.2+ | Server endpoints | Collocated with frontend, edge-ready |
| **Vercel AI SDK** | 3.0+ | LLM integration | Streaming UI, multi-provider support |
| **Upstash Redis** | Latest | Caching | Serverless-compatible, global edge |
| **Prisma** | 5.0+ | ORM | Type-safe queries, migrations |
| **PostgreSQL** | 15+ | Primary DB | Relational data, ACID compliance |
| **Zod** | 3.22+ | Validation | Runtime type checking, schema validation |

### AI/LLM Layer

| Provider | Model | Use Case | Cost per 1M tokens |
|----------|-------|----------|-------------------|
| **OpenAI** | GPT-4o | Primary generation | $5 input / $15 output |
| **OpenAI** | GPT-3.5-turbo | Simple generations | $0.5 input / $1.5 output |
| **Anthropic** | Claude Sonnet 3.5+ | Fallback provider | $3 input / $15 output |
| **OpenAI** | text-embedding-3-small | Semantic caching | $0.02 per 1M tokens |

### Infrastructure & DevOps

| Service | Purpose | Tier |
|---------|---------|------|
| **Vercel** | Hosting, edge functions | Pro |
| **Neon/Supabase** | PostgreSQL hosting | Serverless |
| **Cloudflare R2** | Asset storage | Free tier initially |
| **Upstash** | Redis caching | Pay-as-you-go |
| **GitHub Actions** | CI/CD | Free for public repos |
| **Sentry** | Error tracking | Developer (free) |

### Nigeria-Specific Integrations 🇳🇬

| Service | Purpose | Integration |
|---------|---------|-------------|
| **Paystack** | Payment gateway (primary) | Server-side API |
| **Flutterwave** | Payment gateway (fallback) | Server-side API |
| **WhatsApp Business API** | Lead capture, notifications | Cloud API |
| **Termii** | SMS notifications (optional) | REST API |

        MW[Middleware - Auth/Rate Limit]
    end
    
    subgraph "AI Processing"
        Gateway[LLM Gateway]
        Prompter[Prompt Engine]
        Validator[Code Validator]
        Parser[Response Parser]
    end
    
    subgraph "Data Layer"
        PG[(PostgreSQL)]
        Redis[(Redis Cache)]
        R2[R2 Storage]
    end
    
    subgraph "External Services"
        OpenAI[OpenAI API]
        Anthropic[Anthropic API]
    end
    
    UI --> Store
    Store --> API
    API --> MW
    MW --> RSC
    RSC --> Gateway
    Gateway --> Prompter
    Prompter --> OpenAI
    Prompter --> Anthropic
    OpenAI --> Parser
    Parser --> Validator
    Validator --> Preview
    API --> PG
    API --> Redis
    API --> R2
```

### 2.2 Request Flow Diagram

```mermaid
sequenceDiagram
    participant U as User
    participant C as Client
    participant API as API Route
    participant LLM as LLM Gateway
    participant Cache as Redis
    participant DB as PostgreSQL
    
    U->>C: Enter prompt
    C->>API: POST /api/generate
    API->>Cache: Check cache
    alt Cache hit
        Cache-->>API: Return cached code
        API-->>C: Stream cached response
    else Cache miss
        API->>LLM: Generate with prompt
        LLM->>LLM: Enhance prompt
        LLM->>OpenAI: Stream request
        OpenAI-->>LLM: Stream tokens
        LLM-->>API: Stream response
        API->>Cache: Store result
        API->>DB: Save generation record
        API-->>C: Stream to client
    end
    C->>C: Update preview
    C-->>U: Display result
```

### 2.3 Component Architecture

```
┌────────────────────────────────────────────────────────────┐
│                      Builder Page                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Sidebar    │  │  Main Panel  │  │  Tool Panel  │     │
│  │              │  │              │  │              │     │
│  │ - History    │  │ ┌──────────┐ │  │ - Settings   │     │
│  │ - Templates  │  │ │  Prompt  │ │  │ - Export     │     │
│  │ - Assets     │  │ └──────────┘ │  │ - Share      │     │
│  │              │  │              │  │              │     │
│  │              │  │ ┌──────────┐ │  │              │     │
│  │              │  │ │  Editor  │ │  │              │     │
│  │              │  │ │    ↕      │ │  │              │     │
│  │              │  │ │  Preview │ │  │              │     │
│  │              │  │ └──────────┘ │  │              │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└────────────────────────────────────────────────────────────┘
```

---

## 3. Project Structure

### 3.1 Detailed Directory Structure

```
buildr/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth route group
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── layout.tsx            # Auth layout
│   │
│   ├── (builder)/                # Builder route group (requires auth)
│   │   ├── page.tsx              # Main builder interface
│   │   ├── layout.tsx            # Builder layout with sidebar
│   │   └── loading.tsx           # Suspense loading state
│   │
│   ├── api/                      # API routes
│   │   ├── auth/
│   │   │   └── [...nextauth]/   # NextAuth.js handler
│   │   │       └── route.ts
│   │   ├── generate/
│   │   │   └── route.ts          # Main generation endpoint
│   │   ├── validate/
│   │   │   └── route.ts          # Code validation
│   │   ├── export/
│   │   │   └── route.ts          # Export to HTML/zip
│   │   ├── templates/
│   │   │   ├── route.ts          # List templates
│   │   │   └── [id]/
│   │   │       └── route.ts      # Get specific template
│   │   ├── projects/
│   │   │   ├── route.ts          # CRUD for projects
│   │   │   └── [id]/
│   │   │       ├── route.ts
│   │   │       └── versions/
│   │   │           └── route.ts
│   │   └── usage/
│   │       └── route.ts          # Usage statistics
│   │
│   ├── preview/
│   │   └── [id]/
│   │       └── page.tsx          # Full-page preview (public)
│   │
│   ├── templates/
│   │   └── page.tsx              # Template gallery
│   │
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Marketing landing page
│   └── globals.css               # Global styles
│
├── components/
│   ├── builder/
│   │   ├── builder-interface.tsx    # Main builder component
│   │   ├── prompt-input.tsx         # AI prompt input (content enhancement)
│   │   ├── preview-frame.tsx        # iframe template preview
│   │   ├── template-gallery.tsx     # Template browser
│   │   ├── template-card.tsx        # Template card component
│   │   ├── generation-status.tsx    # Progress indicator
│   │   ├── version-history.tsx      # History sidebar
│   │   ├── export-dialog.tsx        # Export modal
│   │   ├── brand-settings.tsx       # Brand customization
│   │   └── sidebar.tsx              # Builder sidebar
│   │
│   ├── wizard/                      # Wizard UI components
│   │   ├── wizard-container.tsx     # Multi-step container
│   │   ├── step-indicator.tsx       # Step progress
│   │   ├── template-selector.tsx    # Step 1: Select template
│   │   ├── property-form.tsx        # Step 2: Property details
│   │   ├── style-picker.tsx         # Step 3: Style/colors
│   │   └── whatsapp-setup.tsx       # Step 4: WhatsApp config
│   │
│   ├── ui/                          # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── tabs.tsx
│   │   ├── badge.tsx
│   │   ├── progress.tsx
│   │   └── [... more shadcn components]
│   │
│   └── shared/
│       ├── header.tsx               # App header
│       ├── footer.tsx               # App footer
│       ├── loading-spinner.tsx
│       ├── error-boundary.tsx
│       └── toaster.tsx              # Toast notifications
│
├── lib/
│   ├── llm/
│   │   ├── gateway.ts               # Multi-provider LLM gateway
│   │   ├── streaming.ts             # Streaming utilities
│   │   ├── validation.ts            # Code validation
│   │   ├── error-handling.ts        # Error recovery & retry
│   │   └── providers/
│   │       ├── openai.ts
│   │       ├── anthropic.ts
│   │       └── types.ts
│   │
│   ├── prompts/
│   │   ├── system-prompt.ts         # Base system prompt
│   │   ├── real-estate/             # Real estate specific
│   │   │   ├── listing.ts
│   │   │   ├── agent-bio.ts
│   │   │   ├── open-house.ts
│   │   │   ├── neighborhood.ts
│   │   │   └── development.ts
│   │   ├── enhancer.ts              # Prompt enhancement
│   │   ├── schemas.ts               # Zod schemas
│   │   └── examples.ts              # Few-shot examples
│   │
│   ├── db/
│   │   ├── prisma.ts                # Prisma client
│   │   └── migrations/              # Database migrations
│   │
│   ├── cache/
│   │   ├── redis.ts                 # Redis client
│   │   ├── semantic-cache.ts        # Vector-based caching
│   │   └── strategies.ts            # Cache strategies
│   │
│   ├── auth/
│   │   ├── config.ts                # NextAuth config
│   │   ├── session.ts               # Session utilities
│   │   └── permissions.ts           # Permission checks
│   │
│   ├── validation/
│   │   ├── typescript-validator.ts  # TS validation
│   │   ├── accessibility.ts         # A11y checks
│   │   └── component-validator.ts   # Component validation
│   │
│   ├── export/
│   │   ├── html.ts                  # HTML export
│   │   ├── zip.ts                   # Zip creation
│   │   └── nextjs.ts                # Next.js project export
│   │
│   └── utils/
│       ├── code-parser.ts           # Parse JSX/TSX
│       ├── rate-limit.ts            # Rate limiting
│       └── analytics.ts             # Analytics tracking
│
├── hooks/
│   ├── use-page-generation.ts       # Generation hook
│   ├── use-preview.ts               # Preview management
│   ├── use-templates.ts             # Template operations
│   ├── use-export.ts                # Export functionality
│   ├── use-version-history.ts       # Version control
│   ├── use-brand-settings.ts        # Brand settings
│   └── use-debounce.ts              # Debouncing utility
│
├── types/
│   ├── index.ts                     # Main types
│   ├── generation.ts                # Generation types
│   ├── templates.ts                 # Template types
│   ├── api.ts                       # API types
│   └── database.ts                  # Database types
│
├── prisma/
│   ├── schema.prisma                # Database schema
│   ├── seed.ts                      # Seed data
│   └── migrations/                  # SQL migrations
│
├── public/
│   ├── templates/                   # Template assets
│   │   ├── thumbnails/
│   │   └── previews/
│   └── assets/
│       ├── logo.svg
│       └── placeholder.jpg
│
├── tests/
│   ├── unit/
│   │   ├── lib/
│   │   ├── components/
│   │   └── hooks/
│   ├── integration/
│   │   └── api/
│   └── e2e/
│       └── builder.spec.ts
│
├── .github/
│   └── workflows/
│       ├── test.yml                 # CI tests
│       └── deploy.yml               # CD deployment
│
├── next.config.js                   # Next.js config
├── tailwind.config.ts               # Tailwind config
├── tsconfig.json                    # TypeScript config
├── .env.local.example               # Environment template
└── package.json
```

---

## 4. Core Implementation Details

### 4.1 LLM Gateway Implementation

```typescript
// lib/llm/gateway.ts
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { streamText, generateText } from 'ai';
import { z } from 'zod';

export type Provider = 'openai' | 'anthropic';
export type Model = 'gpt-4o' | 'gpt-3.5-turbo' | 'claude-sonnet-3.5';

interface GenerationOptions {
  provider?: Provider;
  model?: Model;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

const providerModels = {
  openai: {
    'gpt-4o': openai('gpt-4o'),
    'gpt-3.5-turbo': openai('gpt-3.5-turbo'),
  },
  anthropic: {
    'claude-sonnet-3.5': anthropic('claude-sonnet-4-20250514'),
  },
};

export class LLMGateway {
  private static instance: LLMGateway;

  static getInstance(): LLMGateway {
    if (!LLMGateway.instance) {
      LLMGateway.instance = new LLMGateway();
    }
    return LLMGateway.instance;
  }

  async generateComponent(
    systemPrompt: string,
    userPrompt: string,
    options: GenerationOptions = {}
  ) {
    const {
      provider = 'openai',
      model = 'gpt-4o',
      temperature = 0.7,
      maxTokens = 4096,
      stream = true,
    } = options;

    const selectedModel = providerModels[provider][model];

    if (stream) {
      return streamText({
        model: selectedModel,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
        temperature,
        maxTokens,
      });
    }

    return generateText({
      model: selectedModel,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
      temperature,
      maxTokens,
    });
  }

  async generateWithFallback(
    systemPrompt: string,
    userPrompt: string,
    options: GenerationOptions = {}
  ) {
    const providers: Array<{ provider: Provider; model: Model }> = [
      { provider: 'openai', model: 'gpt-4o' },
      { provider: 'anthropic', model: 'claude-sonnet-3.5' },
    ];

    for (const config of providers) {
      try {
        return await this.generateComponent(systemPrompt, userPrompt, {
          ...options,
          ...config,
        });
      } catch (error) {
        console.error(`Provider ${config.provider} failed:`, error);
        if (config === providers[providers.length - 1]) {
          throw new Error('All LLM providers failed');
        }
      }
    }
  }

  async generateStructured<T>(
    systemPrompt: string,
    userPrompt: string,
    schema: z.ZodType<T>,
    options: GenerationOptions = {}
  ): Promise<T> {
    const { provider = 'openai', model = 'gpt-4o' } = options;
    const selectedModel = providerModels[provider][model];

    const result = await generateText({
      model: selectedModel,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
      output: 'json',
    });

    return schema.parse(JSON.parse(result.text));
  }
}

export const llmGateway = LLMGateway.getInstance();
```

### 4.2 Prompt Enhancement System (Nigeria-Integrated)

> **Reference**: Full implementation details in [10-PROMPT-ENGINEERING.md](./10-PROMPT-ENGINEERING.md)

The prompt enhancement system implements a **5-Layer Constraint Architecture** specifically designed to prevent LLM hallucination for Nigerian real estate content.

#### 4.2.1 Architecture Overview

```mermaid
graph TB
    A[Wizard UI] --> B[Layer 1: UI Constraints]
    B --> C[Layer 2: System Prompt]
    C --> D[Layer 3: Structured User Prompt]
    D --> E[Layer 4: Context Injection]
    E --> F[LLM Generation]
    F --> G[Layer 5: Post-Generation Validation]
    G --> H{Valid?}
    H -->|Yes| I[Return to Client]
    H -->|No| J[Auto-Fix / Re-generate]
    J --> F
```

#### 4.2.2 Nigerian PageType Definition (Canonical)

```typescript
// lib/types/nigeria.ts - CANONICAL SOURCE OF TRUTH
export type PageType = 
  | 'listing'     // Property listing (duplex, flat, terrace)
  | 'land'        // Land/plot sale
  | 'agent'       // Agent bio/profile
  | 'shortlet'    // Short-let apartment
  | 'estate'      // Off-plan/estate development
  | 'inspection'  // Property inspection booking
  | 'agency';     // Agency about page

export type PropertyType = 
  | 'detached_duplex' 
  | 'semi_detached_duplex' 
  | 'terrace_duplex'
  | 'flat_1br' | 'flat_2br' | 'flat_3br'
  | 'bungalow' 
  | 'self_contain' 
  | 'mansion' 
  | 'penthouse';

export type DocumentType = 
  | 'c_of_o' 
  | 'governors_consent' 
  | 'survey' 
  | 'deed_of_assignment'
  | 'excision' 
  | 'gazette';
```

#### 4.2.3 System Prompt (Nigerian Real Estate Specialist)

```typescript
// lib/prompts/system-prompt.ts
export const NIGERIA_SYSTEM_PROMPT = `
You are a Nigerian real estate landing page specialist. You ONLY generate landing pages for Nigerian properties.

## IDENTITY
- You specialize in Nigerian real estate marketing
- You understand Nigerian property terminology and market
- You always use Naira (₦) for prices
- You always use square meters (sqm) for measurements
- You always include WhatsApp contact buttons

## CRITICAL RULES

### ALWAYS DO:
✅ Use Nigerian Naira (₦) for all prices
✅ Use square meters (sqm) for all measurements
✅ Include WhatsApp click-to-chat buttons
✅ Use Nigerian property types (duplex, flat, terrace, etc.)
✅ Reference Nigerian locations correctly
✅ Include Nigerian property features (bore hole, BQ, generator house)
✅ Generate ONLY the sections specified in the prompt
✅ Use the exact data provided - do not invent details

### NEVER DO:
❌ Use USD ($) or other currencies
❌ Use square feet (sqft) or acres
❌ Use American real estate terms (HOA, MLS, escrow, realtor)
❌ Add sections not listed in the requirements
❌ Invent property features or specifications
❌ Generate generic placeholder content
❌ Omit WhatsApp integration

## OUTPUT FORMAT
- Generate clean React/JSX components
- Use Tailwind CSS for styling
- Use the exact property data provided
- Follow the section order specified
- Include responsive classes (mobile-first)
`.trim();
```

#### 4.2.4 Constrained Prompt Builder

```typescript
// lib/prompts/prompt-builder.ts
import { PageType, WizardData } from '@/types/nigeria';
import { NIGERIA_SYSTEM_PROMPT } from './system-prompt';
import { PAGE_TYPE_PROMPTS } from './page-type-prompts';
import { NIGERIA_PROPERTY_CONTEXT } from './nigeria-context';

export interface PromptPayload {
  system: string;
  user: string;
  context: string;
}

export function buildConstrainedPrompt(wizardData: WizardData): PromptPayload {
  const { pageType, content, style, whatsapp } = wizardData;
  
  return {
    system: NIGERIA_SYSTEM_PROMPT,
    user: buildUserPrompt(wizardData),
    context: NIGERIA_PROPERTY_CONTEXT,
  };
}

function buildUserPrompt(data: WizardData): string {
  const pagePrompt = PAGE_TYPE_PROMPTS[data.pageType];
  
  return `
## TASK
Generate a ${data.pageType.toUpperCase()} landing page for Nigerian real estate.

## STRICT REQUIREMENTS
- Target Market: NIGERIA
- Currency: Nigerian Naira (₦)
- Measurements: Square meters (sqm)
- Contact: WhatsApp integration required

${pagePrompt}

## PROPERTY/CONTENT DATA
${formatContentData(data.pageType, data.content)}

## STYLE SPECIFICATIONS
Visual Style: ${data.style.preset}
${data.style.customColors ? `
Custom Colors:
  Primary: ${data.style.customColors.primary}
  Secondary: ${data.style.customColors.secondary}
  Accent: ${data.style.customColors.accent}
` : ''}

## WHATSAPP CONFIGURATION
- Phone: +234 ${data.whatsapp.number}
- Pre-filled message: "${data.whatsapp.message}"
- Floating button: ${data.whatsapp.showFloating ? 'Yes' : 'No'}
- Link format: https://wa.me/234${data.whatsapp.number.replace(/^0/, '')}?text=${encodeURIComponent(data.whatsapp.message)}

## CONSTRAINTS
- Use ONLY the data provided above
- Generate ONLY the sections listed above
- Do NOT add features not specified
- Do NOT use placeholder text - use actual data
- Do NOT use USD, sqft, or American terms
`.trim();
}

function formatContentData(pageType: PageType, content: any): string {
  switch (pageType) {
    case 'listing':
      return `
Property Type: ${content.propertyType}
Transaction: ${content.priceType} ${content.priceType === 'rent' ? '(per year)' : ''}
Price: ₦${formatNumber(content.price)}
Bedrooms: ${content.beds}
Bathrooms: ${content.baths}
Size: ${content.sqm} sqm
Parking: ${content.parking} spaces
City: ${content.city}
Area: ${content.area}
${content.estate ? `Estate: ${content.estate}` : ''}
Features: ${content.features.join(', ')}
`.trim();
    
    case 'land':
      return `
Plot Size: ${content.plotSize} sqm
${content.dimensions ? `Dimensions: ${content.dimensions.width}m × ${content.dimensions.length}m` : ''}
Total Price: ₦${formatNumber(content.price)}
Price per sqm: ₦${formatNumber(Math.round(content.price / content.plotSize))}
Document Type: ${content.documentType}
City: ${content.city}
Area: ${content.area}
${content.scheme ? `Scheme/Estate: ${content.scheme}` : ''}
Features: ${content.features.join(', ')}
`.trim();
    
    // Additional page types...
    default:
      return JSON.stringify(content, null, 2);
  }
}

function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-NG').format(num);
}
```

#### 4.2.5 Nigerian Entity Extraction

```typescript
// lib/prompts/entity-extractor.ts
// Extracts Nigerian-specific entities from user input

export function extractNigerianEntities(input: string): Record<string, any> {
  const entities: Record<string, any> = {};

  // Extract Nigerian property details
  const bedsMatch = input.match(/(\d+)\s*(?:bed|bedroom|BR)/i);
  if (bedsMatch) entities.beds = parseInt(bedsMatch[1]);

  const bathsMatch = input.match(/(\d+)\s*(?:bath|bathroom)/i);
  if (bathsMatch) entities.baths = parseInt(bathsMatch[1]);

  // NIGERIAN: Extract Naira prices
  const nairaMatch = input.match(/₦\s*([\d,]+(?:\.\d{2})?)\s*(?:M|million|K|thousand)?/i);
  if (nairaMatch) {
    entities.price = nairaMatch[0];
    entities.currency = 'NGN';
  }

  // NIGERIAN: Extract sqm measurements
  const sqmMatch = input.match(/([\d,]+)\s*(?:sqm|square\s*meter)/i);
  if (sqmMatch) {
    entities.sqm = parseInt(sqmMatch[1].replace(/,/g, ''));
    entities.units = 'metric';
  }

  // NIGERIAN: Extract property types
  if (/detached\s*duplex/i.test(input)) entities.propertyType = 'detached_duplex';
  else if (/semi.?detached\s*duplex/i.test(input)) entities.propertyType = 'semi_detached_duplex';
  else if (/terrace\s*duplex/i.test(input)) entities.propertyType = 'terrace_duplex';
  else if (/flat|apartment/i.test(input)) entities.propertyType = 'flat';
  else if (/bungalow/i.test(input)) entities.propertyType = 'bungalow';
  else if (/self.?contain/i.test(input)) entities.propertyType = 'self_contain';
  else if (/mansion/i.test(input)) entities.propertyType = 'mansion';

  // NIGERIAN: Extract document types
  if (/c\s*of\s*o|certificate\s*of\s*occupancy/i.test(input)) entities.documentType = 'c_of_o';
  else if (/governor.?s?\s*consent/i.test(input)) entities.documentType = 'governors_consent';
  else if (/excision/i.test(input)) entities.documentType = 'excision';
  else if (/gazette/i.test(input)) entities.documentType = 'gazette';
  else if (/survey/i.test(input)) entities.documentType = 'survey';

  // NIGERIAN: Extract locations
  const lagosAreas = ['lekki', 'ikoyi', 'victoria island', 'vi', 'ajah', 'ikeja', 'magodo', 'banana island'];
  const abujaAreas = ['maitama', 'asokoro', 'wuse', 'gwarimpa', 'jabi', 'katampe'];
  
  for (const area of lagosAreas) {
    if (new RegExp(area, 'i').test(input)) {
      entities.area = area;
      entities.city = 'Lagos';
      break;
    }
  }
  
  for (const area of abujaAreas) {
    if (new RegExp(area, 'i').test(input)) {
      entities.area = area;
      entities.city = 'Abuja';
      break;
    }
  }

  // NIGERIAN: Extract features
  const nigerianFeatures = [];
  if (/bore\s*hole/i.test(input)) nigerianFeatures.push('Bore Hole');
  if (/bq|boys?\s*quarters?/i.test(input)) nigerianFeatures.push('Boys Quarters (BQ)');
  if (/generator\s*house/i.test(input)) nigerianFeatures.push('Generator House');
  if (/security\s*post/i.test(input)) nigerianFeatures.push('Security Post');
  if (/interlocked/i.test(input)) nigerianFeatures.push('Interlocked Compound');
  if (nigerianFeatures.length > 0) entities.features = nigerianFeatures;

  return entities;
}
```

#### 4.2.6 Post-Generation Validation (Layer 5)

```typescript
// lib/validation/nigerian-validator.ts
// Validates generated code meets Nigerian market requirements

export interface NigerianValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  autoFixes: AutoFix[];
}

interface AutoFix {
  pattern: RegExp;
  replacement: string | ((match: string) => string);
  description: string;
}

export function validateNigerianOutput(code: string): NigerianValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const autoFixes: AutoFix[] = [];

  // CRITICAL: Must have Naira
  if (!hasNaira(code)) {
    errors.push('Missing Nigerian Naira (₦) currency');
    if (hasUSD(code)) {
      autoFixes.push({
        pattern: /\$\s*[\d,]+/g,
        replacement: (match) => `₦${match.replace(/\$\s*/, '').replace(/,/g, '')}`,
        description: 'Convert USD to Naira'
      });
    }
  }

  // CRITICAL: Must have WhatsApp
  if (!hasWhatsApp(code)) {
    errors.push('Missing WhatsApp integration');
  }

  // CRITICAL: Must use sqm
  if (hasSqft(code)) {
    errors.push('Using square feet instead of square meters');
    autoFixes.push({
      pattern: /(\d+)\s*sq\.?\s*ft\.?/gi,
      replacement: (match) => {
        const num = parseInt(match.replace(/[^\d]/g, ''));
        return `${Math.round(num * 0.0929)} sqm`;
      },
      description: 'Convert sqft to sqm'
    });
  }

  // WARNING: American terms
  const americanTerms = detectAmericanTerms(code);
  if (americanTerms.length > 0) {
    warnings.push(`American terms detected: ${americanTerms.join(', ')}`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    autoFixes,
  };
}

function hasNaira(code: string): boolean {
  return /₦|NGN|naira/i.test(code);
}

function hasUSD(code: string): boolean {
  return /\$\d/.test(code);
}

function hasWhatsApp(code: string): boolean {
  return /wa\.me|whatsapp|WhatsApp/i.test(code);
}

function hasSqft(code: string): boolean {
  return /sq\.?\s*ft|square\s*feet/i.test(code);
}

function detectAmericanTerms(code: string): string[] {
  const terms = ['MLS', 'HOA', 'escrow', 'realtor', 'zillow', 'redfin'];
  return terms.filter(term => new RegExp(term, 'i').test(code));
}

export function applyAutoFixes(code: string, fixes: AutoFix[]): string {
  let result = code;
  for (const fix of fixes) {
    result = result.replace(fix.pattern, fix.replacement as any);
  }
  return result;
}
```

#### 4.2.7 Integrated Generation Flow

```typescript
// app/api/generate/route.ts
import { buildConstrainedPrompt } from '@/lib/prompts/prompt-builder';
import { validateNigerianOutput, applyAutoFixes } from '@/lib/validation/nigerian-validator';
import { llmGateway } from '@/lib/llm/gateway';

export async function POST(req: Request) {
  const { wizardData } = await req.json();
  
  // Build constrained prompt using 5-layer architecture
  const prompt = buildConstrainedPrompt(wizardData);
  
  // Generate with LLM
  const stream = await llmGateway.generateComponent(
    prompt.system,
    `${prompt.user}\n\n${prompt.context}`,
    { stream: true }
  );
  
  // For non-streaming, validate before returning
  if (!wizardData.stream) {
    const result = await stream.text;
    
    // Layer 5: Nigerian validation
    const validation = validateNigerianOutput(result);
    
    if (!validation.valid && validation.autoFixes.length > 0) {
      // Apply auto-fixes
      const fixedCode = applyAutoFixes(result, validation.autoFixes);
      const revalidation = validateNigerianOutput(fixedCode);
      
      return Response.json({
        code: fixedCode,
        validation: revalidation,
        autoFixed: true
      });
    }
    
    return Response.json({
      code: result,
      validation
    });
  }
  
  return stream.toDataStreamResponse();
}
```


### 4.3 Code Validation System

```typescript
// lib/validation/component-validator.ts
import * as ts from 'typescript';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  suggestions?: string[];
}

export interface ValidationError {
  type: 'syntax' | 'typescript' | 'runtime' | 'accessibility';
  message: string;
  line?: number;
  column?: number;
  severity: 'error' | 'warning';
}

export interface ValidationWarning extends ValidationError {
  severity: 'warning';
  fix?: string;
}

export async function validateComponent(
  code: string,
  strict = false
): Promise<ValidationResult> {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  // 1. Syntax validation with Babel
  try {
    const ast = parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });

    // Check for required export
    let hasExport = false;
    traverse(ast, {
      ExportDefaultDeclaration() {
        hasExport = true;
      },
      ExportNamedDeclaration() {
        hasExport = true;
      },
    });

    if (!hasExport) {
      errors.push({
        type: 'syntax',
        message: 'Component must have a default or named export',
        severity: 'error',
      });
    }
  } catch (parseError: any) {
    errors.push({
      type: 'syntax',
      message: parseError.message,
      line: parseError.loc?.line,
      column: parseError.loc?.column,
      severity: 'error',
    });
    return { valid: false, errors, warnings };
  }

  // 2. TypeScript validation
  const tsResult = validateTypeScript(code, strict);
  errors.push(...tsResult.errors);

  // 3. Accessibility checks
  const a11yResult = checkAccessibility(code);
  warnings.push(...a11yResult.warnings);

  // 4. React best practices
  const reactResult = checkReactBestPractices(code);
  warnings.push(...reactResult.warnings);

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    suggestions: generateSuggestions(errors, warnings),
  };
}

function validateTypeScript(
  code: string,
  strict: boolean
): { errors: ValidationError[] } {
  const errors: ValidationError[] = [];

  const compilerOptions: ts.CompilerOptions = {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2020,
    jsx: ts.JsxEmit.React,
    strict: strict,
    noImplicitAny: strict,
  };

  const result = ts.transpileModule(code, {
    compilerOptions,
    reportDiagnostics: true,
  });

  if (result.diagnostics) {
    for (const diagnostic of result.diagnostics) {
      if (!diagnostic.file) continue;

      const { line } = diagnostic.file.getLineAndCharacterOfPosition(
        diagnostic.start!
      );

      errors.push({
        type: 'typescript',
        message: ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'),
        line: line + 1,
        severity: 'error',
      });
    }
  }

  return { errors };
}

function checkAccessibility(code: string): { warnings: ValidationWarning[] } {
  const warnings: ValidationWarning[] = [];

  // Check for images without alt text
  if (/<img[^>]*src=["'][^"']*["'][^>]*>/gi.test(code)) {
    const matches = code.match(/<img[^>]*src=["'][^"']*["'][^>]*>/gi);
    matches?.forEach((match) => {
      if (!match.includes('alt=')) {
        warnings.push({
          type: 'accessibility',
          message: 'Image element is missing alt attribute',
          severity: 'warning',
          fix: 'Add alt attribute to describe the image',
        });
      }
    });
  }

  // Check for buttons without labels
  if (/<button[^>]*>[^<]*<\/button>/gi.test(code)) {
    const matches = code.match(/<button[^>]*>[\s]*<(?!.*>)/gi);
    matches?.forEach(() => {
      warnings.push({
        type: 'accessibility',
        message: 'Button element has no text content',
        severity: 'warning',
        fix: 'Add descriptive text or aria-label attribute',
      });
    });
  }

  return { warnings };
}

function checkReactBestPractices(
  code: string
): { warnings: ValidationWarning[] } {
  const warnings: ValidationWarning[] = [];

  // Check for inline functions in JSX (performance)
  if (/onClick=\{.*=>\s*{/.test(code)) {
    warnings.push({
      type: 'runtime',
      message: 'Inline arrow function in onClick may cause unnecessary re-renders',
      severity: 'warning',
      fix: 'Extract to useCallback or define outside JSX',
    });
  }

  // Check for missing key prop in arrays
  if (/\.map\([^)]*\)\s*=>\s*</.test(code) && !/key=/.test(code)) {
    warnings.push({
      type: 'runtime',
      message: 'List items should have a key prop',
      severity: 'warning',
      fix: 'Add unique key prop to each element',
    });
  }

  return { warnings };
}

function generateSuggestions(
  errors: ValidationError[],
  warnings: ValidationWarning[]
): string[] {
  const suggestions: string[] = [];

  if (errors.some((e) => e.type === 'typescript')) {
    suggestions.push('Enable TypeScript strict mode for better type safety');
  }

  if (warnings.some((w) => w.type === 'accessibility')) {
    suggestions.push('Run axe-core for comprehensive accessibility testing');
  }

  return suggestions;
}
```

---

## 5. API Specification (Internal)

*See [05-API-REFERENCE.md](./05-API-REFERENCE.md) for detailed public API documentation.*

### 5.1 Internal API Route Handlers

```typescript
// app/api/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { llmGateway } from '@/lib/llm/gateway';
import { enhancePrompt } from '@/lib/prompts/enhancer';
import { getCachedResponse, setCachedResponse } from '@/lib/cache/redis';
import { validateComponent } from '@/lib/validation/component-validator';
import { prisma } from '@/lib/db/prisma';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { z } from 'zod';

export const runtime = 'edge';
export const maxDuration = 60;

const GenerateRequestSchema = z.object({
  prompt: z.string().min(10).max(2000),
  pageType: z.enum(['listing', 'agent', 'openhouse', 'development', 'neighborhood', 'custom']),
  templateId: z.string().optional(),
  brandSettings: z.object({
    primaryColor: z.string(),
    secondaryColor: z.string(),
    accentColor: z.string(),
    fontFamily: z.string(),
    logoUrl: z.string().optional(),
  }).optional(),
  context: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional(),
  stream: z.boolean().default(true),
});

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(50, '1h'),
  analytics: true,
});

export async function POST(req: NextRequest) {
  try {
    // 1. Authentication
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Rate limiting
    const identifier = session.user.email || req.ip;
    const { success, limit, remaining } = await ratelimit.limit(identifier);

    if (!success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded', limit, remaining },
        { status: 429 }
      );
    }

    // 3. Parse and validate request
    const body = await req.json();
    const validated = GenerateRequestSchema.parse(body);

    // 4. Check cache
    const cacheKey = `gen:${hashPrompt(validated.prompt)}`;
    const cached = await getCachedResponse(cacheKey);

    if (cached) {
      return NextResponse.json({ code: cached, cached: true });
    }

    // 5. Enhance prompt
    const enhancedPrompt = await enhancePrompt(validated.prompt, {
      pageType: validated.pageType,
      brandSettings: validated.brandSettings,
    });

    // 6. Generate with LLM
    const result = await llmGateway.generateWithFallback(
      SYSTEM_PROMPT,
      enhancedPrompt,
      { stream: validated.stream }
    );

    if (validated.stream) {
      // Return streaming response
      return result.toDataStreamResponse();
    } else {
      // Validate generated code
      const validation = await validateComponent(result.text);

      if (!validation.valid) {
        // Attempt auto-fix or return error
        return NextResponse.json(
          { error: 'Generated code failed validation', details: validation.errors },
          { status: 500 }
        );
      }

      // Cache the result
      await setCachedResponse(cacheKey, result.text);

      // Save to database
      await prisma.generation.create({
        data: {
          userId: session.user.id,
          prompt: validated.prompt,
          code: result.text,
          pageType: validated.pageType,
          tokensUsed: result.usage?.totalTokens || 0,
        },
      });

      return NextResponse.json({
        code: result.text,
        tokensUsed: result.usage?.totalTokens,
      });
    }
  } catch (error) {
    console.error('Generation error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function hashPrompt(prompt: string): string {
  // Simple hash for caching (use crypto.subtle in production)
  return Buffer.from(prompt).toString('base64').slice(0, 32);
}

const SYSTEM_PROMPT = `You are an expert landing page designer and React developer specializing in real estate...`;
```

---

## 6. Database Schema

*Full schema with relationships and indexes*

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL") // For migrations
}

// ===== User Management =====

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  avatarUrl     String?
  emailVerified DateTime?
  
  // Subscription
  tier          Tier      @default(FREE)
  stripeCustomerId String?  @unique
  
  // Relationships
  accounts      Account[]
  sessions      Session[]
  projects      Project[]
  generations   Generation[]
  brandSettings BrandSettings?
  usage         UsageRecord[]
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  @@index([email])
  @@index([tier])
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

// ===== Projects & Generations =====

model Project {
  id          String   @id @default(cuid())
  name        String
  description String?  @db.Text
  slug        String?  @unique
  
  // Generation data
  currentCode String   @db.Text
  pageType    PageType
  
  // Metadata
  status      ProjectStatus @default(DRAFT)
  isPublished Boolean       @default(false)
  publishedUrl String?
  visibility  Visibility    @default(PRIVATE)
  
  // Relationships
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId      String
  template    Template? @relation(fields: [templateId], references: [id])
  templateId  String?
  versions    Version[]
  generations Generation[]
  
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  @@index([userId])
  @@index([status])
  @@index([pageType])
  @@index([slug])
}

model Generation {
  id        String   @id @default(cuid())
  prompt    String   @db.Text
  code      String   @db.Text
  pageType  PageType
  
  // LLM Metadata
  provider    String
  model       String
  tokensUsed  Int
  cost        Float?
  duration    Int?  // milliseconds
  
  // Validation
  validationPassed Boolean @default(false)
  errors           Json?
  warnings         Json?
  
  // Relationships
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId     String
  project    Project? @relation(fields: [projectId], references: [id], onDelete: SetNull)
  projectId  String?
  
  createdAt  DateTime @default(now())
  
  @@index([userId, createdAt])
  @@index([projectId])
}

model Version {
  id        String   @id @default(cuid())
  code      String   @db.Text
  prompt    String?  @db.Text
  message   String?  // Version commit message
  
  project   Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
  projectId String
  
  createdAt DateTime @default(now())
  
  @@index([projectId, createdAt(sort: Desc)])
}

// ===== Templates =====

model Template {
  id          String   @id @default(cuid())
  name        String
  description String   @db.Text
  category    TemplateCategory
  code        String   @db.Text
  
  // Assets
  thumbnailUrl String
  previewUrl   String
  
  // Metadata
  isPremium    Boolean @default(false)
  isPublic     Boolean @default(true)
  usageCount   Int     @default(0)
  tags         String[] // Array of tags
  
  // Variables for customization
  variables    Json?
  
  projects    Project[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([category])
  @@index([isPremium])
  @@index([isPublic])
}

// ===== Brand & Settings =====

model BrandSettings {
  id             String  @id @default(cuid())
  primaryColor   String  @default("#6366f1")
  secondaryColor String  @default("#4f46e5")
  accentColor    String  @default("#f59e0b")
  fontFamily     String  @default("Inter")
  logoUrl        String?
  faviconUrl     String?
  
  // Additional branding
  companyName    String?
  tagline        String?
  
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId String @unique
  
  updatedAt DateTime @updatedAt
}

// ===== Usage & Analytics =====

model UsageRecord {
  id          String   @id @default(cuid())
  type        UsageType
  tokensUsed  Int      @default(0)
  provider    String?
  cost        Float?
  
  // Metadata
  metadata    Json?
  
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId String
  
  createdAt DateTime @default(now())
  
  @@index([userId, createdAt])
  @@index([type])
}

// ===== Enums =====

enum Tier {
  FREE
  PRO
  AGENCY
  ENTERPRISE
}

enum PageType {
  LISTING
  AGENT_BIO
  OPEN_HOUSE
  NEIGHBORHOOD
  DEVELOPMENT
  COMPANY
  CUSTOM
}

enum ProjectStatus {
  DRAFT
  GENERATING
  READY
  PUBLISHED
  ARCHIVED
}

enum TemplateCategory {
  LISTING
  AGENT
  OPENHOUSE
  NEIGHBORHOOD
  DEVELOPMENT
  COMPANY
}

enum UsageType {
  GENERATION
  REFINEMENT
  VALIDATION
  EXPORT
}

enum Visibility {
  PRIVATE
  PUBLIC
  UNLISTED
}
```

---

## 7. Security & Authentication

### 7.1 NextAuth.js Configuration

```typescript
// lib/auth/config.ts
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/db/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.tier = user.tier;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.tier = user.tier;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'database',
  },
};
```

### 7.2 Content Security Policy

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // CSP for preview iframe security
  response.headers.set(
    'Content-Security-Policy',
    `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.tailwindcss.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
      font-src 'self' data:;
      frame-src 'self';
      connect-src 'self' https://api.openai.com https://api.anthropic.com;
    `.replace(/\s+/g, ' ').trim()
  );

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

---

## 8. Performance & Caching

### 8.1 Redis Caching Strategy

```typescript
// lib/cache/redis.ts
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export interface CacheOptions {
  ttl?: number; // seconds
  namespace?: string;
}

export async function getCachedResponse(
  key: string,
  options: CacheOptions = {}
): Promise<string | null> {
  const fullKey = options.namespace ? `${options.namespace}:${key}` : key;
  return redis.get(fullKey);
}

export async function setCachedResponse(
  key: string,
  value: string,
  options: CacheOptions = {}
): Promise<void> {
  const fullKey = options.namespace ? `${options.namespace}:${key}` : key;
  const ttl = options.ttl || 86400; // 24 hours default

  await redis.setex(fullKey, ttl, value);
}

export async function invalidateCache(pattern: string): Promise<void> {
  // Note: Upstash doesn't support KEYS, use with caution
  // In production, maintain a separate index of cache keys
  const keys = await redis.keys(pattern);
  if (keys.length > 0) {
    await redis.del(...keys);
  }
}
```

### 8.2 Performance Monitoring

```typescript
// lib/utils/analytics.ts
import { prisma } from '@/lib/db/prisma';

export async function trackPerformance(
  userId: string,
  metric: string,
  value: number,
  metadata?: Record<string, any>
) {
  return prisma.performanceMetric.create({
    data: {
      userId,
      metric,
      value,
      metadata,
    },
  });
}

// Usage in generation
const startTime = Date.now();
// ... generation code
const duration = Date.now() - startTime;
await trackPerformance(userId, 'generation_duration', duration, {
  pageType,
  tokensUsed,
});
```

---

## 9. Deployment & Infrastructure

### 9.1 Vercel Configuration

```json
// vercel.json
{
  "buildCommand": "prisma generate && next build",
  "functions": {
    "app/api/generate/route.ts": {
      "maxDuration": 60,
      "memory": 1024
    },
    "app/api/export/route.ts": {
      "maxDuration": 30,
      "memory": 512
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Credentials", "value": "true" },
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET,POST,PUT,DELETE,OPTIONS" }
      ]
    }
  ],
  "env": {
    "DATABASE_URL": "@database-url",
    "OPENAI_API_KEY": "@openai-api-key",
    "UPSTASH_REDIS_REST_URL": "@upstash-redis-url"
  }
}
```

### 9.2 Environment Variables

```bash
# .env.local.example

# Database
DATABASE_URL="postgresql://user:password@host:5432/dbname"
DIRECT_URL="postgresql://user:password@host:5432/dbname" # For migrations

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# AI Providers
OPENAI_API_KEY="sk-..."
ANTHROPIC_API_KEY="sk-ant-..."

# Caching
UPSTASH_REDIS_REST_URL="https://..."
UPSTASH_REDIS_REST_TOKEN="..."

# Storage
CLOUDFLARE_R2_ACCESS_KEY="..."
CLOUDFLARE_R2_SECRET_KEY="..."
CLOUDFLARE_R2_BUCKET="buildr-assets"

# Email (optional)
EMAIL_SERVER="smtp://username:password@smtp.example.com:587"
EMAIL_FROM="noreply@buildr.app"

# Monitoring
SENTRY_DSN="https://..."
```

---

## 10. Monitoring & Observability

### 10.1 Error Tracking

```typescript
// lib/utils/error-tracking.ts
import * as Sentry from '@sentry/nextjs';

export function initErrorTracking() {
  if (process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV,
      tracesSampleRate: 1.0,
    });
  }
}

export function logError(error: Error, context?: Record<string, any>) {
  console.error(error);
  
  if (process.env.SENTRY_DSN) {
    Sentry.captureException(error, {
      extra: context,
    });
  }
}
```

### 10.2 Performance Metrics

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| API Response Time (p95) | < 3s | > 5s |
| Generation Success Rate | > 95% | < 90% |
| Error Rate | < 1% | > 5% |
| Cache Hit Ratio | > 40% | < 20% |

---

> **Related Documents**:  
> - [PRD](./01-PRD.md)  
> - [API Reference](./05-API-REFERENCE.md)  
> - [Testing Strategy](./06-TESTING-STRATEGY.md)  
> - [Architecture Research](../research/llm-page-builder-architecture.md)
