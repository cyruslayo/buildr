# Prompt Engineering System
# Buildr — Nigerian Real Estate Content Enhancement

> **Version**: 2.0 | **Updated**: December 8, 2024  
> **Purpose**: AI enhancement for template content (descriptions, headlines, SEO)
> **Approach**: Template-Only (AI enhances content, does NOT generate code)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Research Findings](#2-research-findings)
3. [Multi-Layer Constraint Architecture](#3-multi-layer-constraint-architecture)
4. [System Prompt Engineering](#4-system-prompt-engineering)
5. [Guided Prompt Construction](#5-guided-prompt-construction)
6. [Domain-Specific Context](#6-domain-specific-context)
7. [Post-Generation Validation](#7-post-generation-validation)
8. [Implementation](#8-implementation)

---

## AI Role in Template Approach

In the template-only approach, AI **does NOT generate code**. Instead, AI enhances template content:

| Use Case | Description | Trigger |
|----------|-------------|---------|
| **Property Description Generation** | AI writes compelling listing text from bullet points | User clicks "Enhance Description" |
| **Feature Highlight Copywriting** | AI enhances feature descriptions with Nigerian context | Optional enhancement |
| **Headline Generation** | AI suggests attention-grabbing headlines | User requests suggestions |
| **SEO Meta Description** | AI generates meta tags for search visibility | Auto-generated on publish |

### Simplified Prompt Architecture

```
User Data (structured) → Template (fixed) → AI Enhancement (optional)
                                              ↓
                                    "Make this description more appealing"
```

---

## 1. Executive Summary

### The Problem

LLMs like GPT-4o and Claude generate generic, US-centric landing pages when given vague prompts. For Nigerian real estate, this manifests as:

- **Wrong currency**: USD instead of Naira (₦)
- **Wrong units**: Square feet instead of square meters
- **Wrong property types**: "Single Family Home" instead of "Detached Duplex"
- **Missing features**: No WhatsApp integration, no Nigerian amenities
- **Wrong terminology**: "HOA fees", "MLS", "escrow" instead of "C of O", "BQ", "bore hole"

### The Solution: Multi-Layer Constraint Architecture

Prevent hallucination through **5 layers of constraint**:

```
┌─────────────────────────────────────────────────────────────────────┐
│  Layer 1: UI Constraints (Wizard)                                   │
│  ├── Fixed page type options (Property, Land, Agent, Short-Let)    │
│  ├── Dropdown selections for property types, locations             │
│  └── Checkbox features (Nigerian amenities only)                   │
├─────────────────────────────────────────────────────────────────────┤
│  Layer 2: System Prompt (Role + Rules)                              │
│  ├── Role: Nigerian real estate landing page specialist            │
│  ├── Explicit DO/DON'T rules                                       │
│  └── Output format constraints                                      │
├─────────────────────────────────────────────────────────────────────┤
│  Layer 3: Structured User Prompt (Wizard → Prompt)                  │
│  ├── Explicit data injection (price, beds, location)               │
│  ├── Required sections list                                        │
│  └── Style specifications                                           │
├─────────────────────────────────────────────────────────────────────┤
│  Layer 4: Context Injection (@references)                           │
│  ├── Template code references                                       │
│  ├── Component snippets                                             │
│  └── Nigerian data constants                                        │
├─────────────────────────────────────────────────────────────────────┤
│  Layer 5: Post-Generation Validation                                │
│  ├── Content validation (Naira, sqm, WhatsApp)                     │
│  ├── Forbidden content detection (USD, sqft, MLS)                  │
│  └── Structure validation (required sections)                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. Research Findings

### Key Insights from Aura Methodology

Based on analysis of Aura's prompting documentation, the following principles drive high-quality LLM output:

#### 2.1 Specificity Over Vagueness

| ❌ Vague Prompt | ✅ Specific Prompt |
|-----------------|-------------------|
| "Create a landing page" | "Create a property listing page for a 4-bedroom detached duplex in Lekki Phase 1, Lagos, priced at ₦85,000,000" |
| "Make it look good" | "Use a modern clean style with navy (#1a365d) as primary color, white backgrounds, and medium shadows" |
| "Add a contact form" | "Add a WhatsApp click-to-chat button (+234 801 234 5678) with pre-filled message 'Hi! I'm interested in the 4BR Duplex in Lekki'" |

#### 2.2 Structured Data Injection

Instead of natural language, inject **structured data**:

```
PROPERTY DATA:
- Type: Detached Duplex
- Bedrooms: 4
- Bathrooms: 4
- Size: 350 sqm
- Price: ₦85,000,000
- Location: Lekki Phase 1, Lagos
- Features: Bore Hole, Generator House, BQ, Security Post
```

#### 2.3 Context References (@)

From Aura's methodology, **referencing existing code** dramatically improves output quality:

- Reference templates with `@tmpl_listing_duplex_ng`
- Reference components with `@component_whatsapp_cta`
- Reference snippets with `@snippet_naira_formatter`

This provides up to **100,000 characters of context** for the LLM.

#### 2.4 Explicit Section Requirements

Define **exact sections** the page must include:

```
REQUIRED SECTIONS (in order):
1. Hero with full-width property image
2. Stats bar (₦ price, beds, baths, sqm)
3. Photo gallery grid
4. Property description
5. Features grid with Nigerian amenities
6. Location section
7. WhatsApp CTA button (prominent)
8. Agent card with contact form
```

#### 2.5 DO NOT Instructions

Explicitly tell the LLM what to **avoid**:

```
DO NOT:
- Use USD ($) - always use ₦
- Use square feet - always use sqm
- Use American real estate terms (HOA, MLS, escrow)
- Generate sections not listed above
- Invent features not provided in the data
```

---

## 3. Multi-Layer Constraint Architecture

### Layer 1: UI Constraints (Wizard)

The guided wizard **pre-constrains** user choices so only valid Nigerian options are available.

#### Page Types (Fixed)

```typescript
const PAGE_TYPES = [
  { id: 'listing', label: 'Property Listing' },
  { id: 'land', label: 'Land Sale' },
  { id: 'agent', label: 'Agent Profile' },
  { id: 'shortlet', label: 'Short-Let Apartment' },
  { id: 'estate', label: 'Estate/Off-Plan' },
  { id: 'inspection', label: 'Inspection Booking' },
  { id: 'agency', label: 'Agency About' },
] as const;
```

#### Property Types (Dropdown - Nigerian Only)

```typescript
const PROPERTY_TYPES = [
  { id: 'detached_duplex', label: 'Detached Duplex' },
  { id: 'semi_detached_duplex', label: 'Semi-Detached Duplex' },
  { id: 'terrace_duplex', label: 'Terrace Duplex' },
  { id: 'flat_1br', label: 'Flat (1 Bedroom)' },
  { id: 'flat_2br', label: 'Flat (2 Bedroom)' },
  { id: 'flat_3br', label: 'Flat (3 Bedroom)' },
  { id: 'bungalow', label: 'Bungalow' },
  { id: 'self_contain', label: 'Self-Contain' },
  { id: 'mansion', label: 'Mansion' },
  { id: 'penthouse', label: 'Penthouse' },
] as const;
```

#### Locations (Dropdown - Nigerian Cities/Areas)

```typescript
const LOCATIONS = {
  Lagos: [
    'Lekki Phase 1', 'Lekki Phase 2', 'Chevron', 'Ikate',
    'Ikoyi', 'Banana Island', 'Victoria Island', 'Ajah',
    'Ikeja GRA', 'Magodo', 'Maryland', 'Surulere',
  ],
  Abuja: [
    'Maitama', 'Asokoro', 'Wuse', 'Wuse 2', 'Garki',
    'Gwarimpa', 'Jabi', 'Katampe', 'Life Camp',
  ],
  'Port Harcourt': [
    'GRA Phase 1', 'GRA Phase 2', 'Trans Amadi',
  ],
} as const;
```

#### Features (Checkbox - Nigerian Amenities Only)

```typescript
const FEATURES = [
  // Utilities
  { id: 'borehole', label: 'Bore Hole' },
  { id: 'generator_house', label: 'Generator House' },
  { id: 'solar', label: 'Solar Panels' },
  { id: 'inverter', label: 'Inverter System' },
  { id: 'prepaid_meter', label: 'Prepaid Meter' },
  
  // Security
  { id: 'security_post', label: 'Security Post' },
  { id: 'cctv', label: 'CCTV Security' },
  { id: 'perimeter_fence', label: 'Perimeter Fencing' },
  { id: 'electric_fence', label: 'Electric Fence' },
  { id: 'gated_estate', label: 'Gated Estate' },
  
  // Compound
  { id: 'bq', label: 'Boys Quarters (BQ)' },
  { id: 'parking', label: 'Parking Space' },
  { id: 'interlocked', label: 'Interlocked Compound' },
  
  // Interior
  { id: 'fitted_kitchen', label: 'Fitted Kitchen' },
  { id: 'pop_ceiling', label: 'POP Ceiling' },
  { id: 'ensuite', label: 'All Rooms Ensuite' },
  
  // Access
  { id: 'tarred_road', label: 'Tarred Road Access' },
  { id: 'newly_built', label: 'Newly Built' },
] as const;
```

### Layer 2: System Prompt (Role + Rules)

The **system prompt** establishes the LLM's role and non-negotiable rules.

```typescript
const SYSTEM_PROMPT = `
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

### Layer 3: Structured User Prompt

Transform wizard data into a **highly structured prompt**.

```typescript
function buildUserPrompt(data: WizardData): string {
  return `
## TASK
Generate a ${data.pageType.toUpperCase()} landing page for Nigerian real estate.

## STRICT REQUIREMENTS
- Target Market: NIGERIA
- Currency: Nigerian Naira (₦)
- Measurements: Square meters (sqm)
- Contact: WhatsApp integration required

## PROPERTY DATA
${formatPropertyData(data)}

## REQUIRED SECTIONS (in exact order)
${formatRequiredSections(data.pageType)}

## STYLE SPECIFICATIONS
${formatStyleSpecs(data.style)}

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
```

### Layer 4: Context Injection

Inject **template code** and **component references** to guide output style.

```typescript
function injectContext(pageType: PageType): string {
  const templateCode = getTemplateCode(pageType);
  const components = getRelevantComponents(pageType);
  const snippets = getNigerianSnippets();
  
  return `
## REFERENCE: Base Template
Use this template structure as a guide:
\`\`\`jsx
${templateCode}
\`\`\`

## REFERENCE: Nigerian Components
${components.map(c => `@${c.id}: ${c.code}`).join('\n\n')}

## REFERENCE: Nigerian Data Formatting
${snippets.nairaFormatter}
${snippets.whatsappLink}
${snippets.propertyFeatures}
`.trim();
}
```

### Layer 5: Post-Generation Validation

Validate enhanced content **before** applying to template.

```typescript
interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  autoFixes: AutoFix[];
}

function validateNigerianOutput(code: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const autoFixes: AutoFix[] = [];
  
  // CRITICAL: Must have Naira
  if (!hasNaira(code)) {
    errors.push('Missing Nigerian Naira (₦) currency');
    if (hasUSD(code)) {
      autoFixes.push({
        pattern: /\$[\d,]+/g,
        replacement: (match) => `₦${convertToNaira(match)}`,
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
      replacement: (match, num) => `${Math.round(num * 0.0929)} sqm`,
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
```

---

## 4. System Prompt Engineering

### 4.1 Role Definition

```typescript
const ROLE_PROMPT = `
You are "Buildr AI", a specialized Nigerian real estate landing page generator.

Your expertise:
- Nigerian property market (Lagos, Abuja, Port Harcourt)
- Nigerian property types (duplexes, flats, terraces, land)
- Nigerian property features (BQ, bore hole, generator house, C of O)
- Nigerian pricing (Naira, yearly rent, payment plans)
- Nigerian communication (WhatsApp-first culture)

You speak the language of Nigerian real estate professionals.
You understand their clients and what converts visitors to leads.
`;
```

### 4.2 Output Format Rules

```typescript
const FORMAT_PROMPT = `
## OUTPUT FORMAT REQUIREMENTS

1. Generate a single React functional component
2. Use Tailwind CSS for all styling
3. Component must be self-contained (no external dependencies except React)
4. Use placeholder images: https://placehold.co/800x600/1a365d/white?text=Property
5. Include proper TypeScript types if applicable

## CODE STRUCTURE
\`\`\`jsx
export default function PropertyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section>...</section>
      
      {/* Stats Bar */}
      <section>...</section>
      
      {/* ... other required sections */}
      
      {/* WhatsApp CTA */}
      <a href="https://wa.me/234..." className="fixed bottom-6 right-6">
        WhatsApp
      </a>
    </div>
  );
}
\`\`\`
`;
```

### 4.3 Page-Type Specific Prompts

```typescript
const PAGE_TYPE_PROMPTS: Record<PageType, string> = {
  listing: `
## PROPERTY LISTING PAGE REQUIREMENTS

Generate a landing page to showcase a single property for sale or rent.

### Purpose
Convert property page visitors into WhatsApp inquiries.

### Required Sections (in order):
1. **Hero** - Full-width property image with overlay text (property type, location)
2. **Stats Bar** - Price (₦), Bedrooms, Bathrooms, Size (sqm), Parking
3. **Gallery** - 6-image grid with lightbox capability
4. **Description** - 2-3 paragraphs about the property
5. **Features** - Grid of Nigerian amenities with icons
6. **Location** - Map placeholder, neighborhood highlights
7. **Agent Card** - Photo, name, phone, WhatsApp button
8. **Inquiry Form** - Name, email, phone, message
9. **Floating WhatsApp** - Fixed bottom-right click-to-chat

### Key Conversions
- WhatsApp button clicks
- Inquiry form submissions
- Phone call taps (mobile)
`,

  land: `
## LAND SALE PAGE REQUIREMENTS

Generate a landing page to market a plot of land.

### Purpose
Convert land buyers into WhatsApp inquiries about documentation and purchase.

### Required Sections (in order):
1. **Hero** - Aerial/site image with plot details overlay
2. **Plot Specs** - Size (sqm), Total Price (₦), Price per sqm
3. **Document Status** - C of O / Governor's Consent / Survey status
4. **Location Advantages** - Nearby landmarks, accessibility
5. **Investment Highlights** - ROI potential, development plans
6. **WhatsApp CTA** - Prominent inquiry button
7. **Contact Form** - Name, phone, inquiry type

### Key Nigerian Elements
- Document type is CRITICAL (affects price and trust)
- Measurements in sqm and plot dimensions (e.g., 30m x 40m)
- Emphasize road access, drainage, proximity to development
`,

  agent: `
## AGENT PROFILE PAGE REQUIREMENTS

Generate a professional bio page for a Nigerian real estate agent.

### Purpose
Build trust and credibility, drive WhatsApp contacts.

### Required Sections (in order):
1. **Hero** - Professional photo, name, title
2. **About** - Bio story, years of experience
3. **Credentials** - NIESV, REDAN, AREF certifications
4. **Specialties** - Property types, price ranges
5. **Service Areas** - Lagos/Abuja neighborhoods
6. **Testimonials** - Client quotes
7. **Active Listings** - 3-4 property cards
8. **WhatsApp Contact** - Prominent click-to-chat

### Nigerian Professional Terms
- "Estate Surveyor" not "Realtor"
- "Principal Partner" not "Broker"
- NIESV, REDAN, AREF certifications
`,

  shortlet: `
## SHORT-LET APARTMENT PAGE REQUIREMENTS

Generate a booking inquiry page for a furnished short-stay apartment.

### Purpose
Convert tourists/business travelers into WhatsApp booking inquiries.

### Required Sections (in order):
1. **Gallery Hero** - Multiple apartment images
2. **Quick Specs** - Bedrooms, bathrooms, max guests
3. **Pricing Table** - Per night (₦), Weekly, Monthly rates
4. **Amenities Grid** - WiFi, AC, Generator, Netflix, Kitchen
5. **House Rules** - Check-in/out times, policies
6. **Location** - Neighborhood, nearby attractions
7. **WhatsApp Booking** - "Book Now via WhatsApp"
8. **Host Info** - Photo, name, response time

### Pricing Format
- ₦50,000/night
- ₦280,000/week
- ₦900,000/month
`,

  estate: `
## ESTATE/OFF-PLAN PAGE REQUIREMENTS

Generate a marketing page for a new development or estate.

### Purpose
Capture pre-sale leads and generate inspection bookings.

### Required Sections (in order):
1. **Hero** - 3D render or aerial view, project name
2. **Overview** - Project vision, total units, timeline
3. **Unit Types** - Grid of available options (1BR, 2BR, Duplex)
4. **Floor Plans** - Gallery of layouts
5. **Estate Amenities** - Power, security, roads, facilities
6. **Location Map** - Area context, accessibility
7. **Payment Plan** - Deposit, installments, outright discount
8. **Registration Form** - Expression of Interest
9. **Developer Info** - Track record, other projects

### Payment Plan Section
- Initial deposit: 30%
- Spread: 6-24 months
- Outright discount: 5-10%
`,

  inspection: `
## INSPECTION BOOKING PAGE REQUIREMENTS

Generate a landing page to book property viewings.

### Purpose
Convert interest into scheduled property inspections.

### Required Sections (in order):
1. **Property Preview** - Hero image, key details
2. **Available Slots** - Date/time options
3. **RSVP Form** - Name, phone, preferred time
4. **Property Highlights** - Why visit
5. **Agent Info** - Who will meet them
6. **WhatsApp Alternative** - "Book via WhatsApp"
7. **Directions** - Map, address, landmarks
`,

  agency: `
## AGENCY ABOUT PAGE REQUIREMENTS

Generate an about page for a real estate company.

### Purpose
Build brand credibility and generate seller/buyer leads.

### Required Sections (in order):
1. **Hero** - Agency name, tagline, office photo
2. **Our Story** - History, mission, values
3. **Team** - Key members with photos
4. **Services** - What we offer (buying, selling, management)
5. **Coverage** - Locations we serve
6. **Stats** - Properties sold, years in business
7. **Testimonials** - Client quotes
8. **Offices** - Location cards with addresses
9. **Contact Form** - General inquiry
10. **WhatsApp** - Company WhatsApp number
`,
};
```

---

## 5. Guided Prompt Construction

### 5.1 Prompt Builder Function

```typescript
export function buildConstrainedPrompt(wizardData: WizardData): PromptPayload {
  const { pageType, content, style, whatsapp } = wizardData;
  
  return {
    system: buildSystemPrompt(),
    user: buildUserPrompt(wizardData),
    context: buildContextPayload(pageType),
  };
}

function buildSystemPrompt(): string {
  return [
    ROLE_PROMPT,
    RULES_PROMPT,
    FORMAT_PROMPT,
  ].join('\n\n');
}

function buildUserPrompt(data: WizardData): string {
  const pagePrompt = PAGE_TYPE_PROMPTS[data.pageType];
  const contentData = formatContentData(data);
  const styleSpecs = formatStyleSpecs(data.style);
  const whatsappConfig = formatWhatsAppConfig(data.whatsapp);
  
  return `
${pagePrompt}

## PROPERTY/CONTENT DATA
${contentData}

## STYLE SPECIFICATIONS
${styleSpecs}

## WHATSAPP CONFIGURATION
${whatsappConfig}

## FINAL INSTRUCTIONS
1. Generate the complete React component
2. Use ONLY the data provided above
3. Follow the section order exactly
4. Include WhatsApp integration
5. Use ₦ for prices, sqm for measurements
6. Do NOT invent additional details
`.trim();
}
```

### 5.2 Content Data Formatting

```typescript
function formatContentData(data: WizardData): string {
  switch (data.pageType) {
    case 'listing':
      return formatListingData(data.content as ListingData);
    case 'land':
      return formatLandData(data.content as LandData);
    case 'agent':
      return formatAgentData(data.content as AgentData);
    case 'shortlet':
      return formatShortletData(data.content as ShortletData);
    default:
      return '';
  }
}

function formatListingData(data: ListingData): string {
  return `
Property Type: ${data.propertyType}
Transaction: ${data.transactionType} (${data.transactionType === 'rent' ? 'per year' : ''})
Price: ₦${formatNumber(data.price)}
Bedrooms: ${data.beds}
Bathrooms: ${data.baths}
Size: ${data.sqm} sqm
Parking: ${data.parking} spaces
City: ${data.city}
Area: ${data.area}
${data.estate ? `Estate: ${data.estate}` : ''}
Features: ${data.features.join(', ')}
${data.description ? `Description: ${data.description}` : ''}
`.trim();
}

function formatLandData(data: LandData): string {
  return `
Plot Size: ${data.plotSize} sqm
${data.dimensions ? `Dimensions: ${data.dimensions.width}m x ${data.dimensions.length}m` : ''}
Total Price: ₦${formatNumber(data.price)}
Price per sqm: ₦${formatNumber(Math.round(data.price / data.plotSize))}
Document Type: ${data.documentType}
City: ${data.city}
Area: ${data.area}
${data.scheme ? `Scheme/Estate: ${data.scheme}` : ''}
Features: ${data.features.join(', ')}
`.trim();
}
```

### 5.3 Style Specification

```typescript
function formatStyleSpecs(style: StyleData): string {
  return `
Visual Style: ${style.preset}
Color Scheme: ${style.colorScheme}
${style.customColors ? `
Custom Colors:
  Primary: ${style.customColors.primary}
  Secondary: ${style.customColors.secondary}
  Accent: ${style.customColors.accent}
` : ''}
Mood: ${style.mood.join(', ')}

Theme: ${style.theme} (light/dark)
Typography: ${style.typography || 'Modern sans-serif (Inter, system-ui)'}
Shadows: ${style.shadows || 'Medium elevation'}
Border Radius: ${style.borderRadius || 'Rounded (8px-16px)'}
`.trim();
}
```

---

## 6. Domain-Specific Context

### 6.1 Nigerian Property Schema

Inject as context for every generation:

```typescript
const NIGERIA_PROPERTY_CONTEXT = `
## Nigerian Real Estate Context

### Currency
- Symbol: ₦ (Nigerian Naira)
- Format: ₦85,000,000 (no decimals for large amounts)
- Rental: Usually quoted per annum (e.g., ₦3,500,000/year)

### Measurements
- Land/Property size: Square meters (sqm)
- Plot dimensions: 30m x 40m format
- Never use: sq ft, acres (American)

### Property Types (Nigerian Terminology)
- Detached Duplex (standalone 2-story)
- Semi-Detached Duplex (shared wall)
- Terrace Duplex (row house)
- Flat (apartment)
- Self-Contain (studio apartment)
- Bungalow (single story)
- Mansion (luxury home)
- Penthouse (top floor apartment)

### Common Amenities
- Bore Hole (private water source)
- Generator House (power backup structure)
- Boys Quarters (BQ) - staff quarters
- Security Post (guard house)
- Interlocked Compound (paved with bricks)
- POP Ceiling (plaster ceiling)
- Perimeter Fencing (boundary walls)

### Land Documents
- C of O (Certificate of Occupancy) - highest status
- Governor's Consent - required for sub-leases
- Excision - government-released land
- Gazette - published in government gazette
- Survey Plan - basic documentation
- Deed of Assignment - transfer document

### Key Locations
Lagos: Lekki, Ikoyi, VI, Ajah, Ikeja GRA, Magodo
Abuja: Maitama, Asokoro, Wuse, Gwarimpa, Jabi
PH: GRA Phase 1, GRA Phase 2, Trans Amadi

### Communication
- WhatsApp is PRIMARY contact method
- Phone numbers: +234 format
- Instagram/Facebook secondary
`;
```

### 6.2 Template References

```typescript
const TEMPLATE_REFERENCES: Record<PageType, string> = {
  listing: `
<!-- Reference: tmpl_listing_duplex_ng -->
<section className="relative h-[70vh]">
  <img src="..." className="w-full h-full object-cover" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/70" />
  <div className="absolute bottom-8 left-8 text-white">
    <span className="bg-primary px-3 py-1 rounded">Detached Duplex</span>
    <h1 className="text-4xl font-bold">₦85,000,000</h1>
    <p>Lekki Phase 1, Lagos</p>
  </div>
</section>

<section className="flex justify-around py-8 bg-gray-100">
  <div><span className="text-3xl font-bold">4</span><span>Beds</span></div>
  <div><span className="text-3xl font-bold">4</span><span>Baths</span></div>
  <div><span className="text-3xl font-bold">350</span><span>sqm</span></div>
</section>

<a 
  href="https://wa.me/2348012345678?text=Hi!%20I'm%20interested..."
  className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full p-4"
>
  <WhatsAppIcon />
</a>
`,
  // ... other templates
};
```

---

## 7. Post-Generation Validation

### 7.1 Validation Pipeline

```typescript
interface ValidationPipeline {
  preChecks: PreCheck[];
  contentValidators: ContentValidator[];
  structureValidators: StructureValidator[];
  autoFixers: AutoFixer[];
}

const VALIDATION_PIPELINE: ValidationPipeline = {
  preChecks: [
    { name: 'hasValidJSX', fn: validateJSXSyntax },
    { name: 'hasExportDefault', fn: hasDefaultExport },
  ],
  
  contentValidators: [
    { 
      name: 'hasCurrency',
      required: true,
      check: (code) => /₦|NGN/.test(code),
      error: 'Missing Nigerian Naira (₦) currency'
    },
    {
      name: 'hasWhatsApp',
      required: true,
      check: (code) => /wa\.me|whatsapp/i.test(code),
      error: 'Missing WhatsApp integration'
    },
    {
      name: 'usesMetric',
      required: true,
      check: (code) => /sqm|square\s*meter/i.test(code) && !/sqft|square\s*feet/i.test(code),
      error: 'Must use square meters (sqm)'
    },
    {
      name: 'noAmericanTerms',
      required: false,
      check: (code) => !/MLS|HOA|escrow|realtor/i.test(code),
      warning: 'Contains American real estate terminology'
    },
  ],
  
  structureValidators: [
    {
      name: 'hasRequiredSections',
      fn: validateRequiredSections,
    }
  ],
  
  autoFixers: [
    {
      name: 'convertUSDtoNaira',
      pattern: /\$\s*[\d,]+/g,
      replacement: (match) => `₦${match.replace(/\$\s*/, '').replace(/,/g, '')}`,
    },
    {
      name: 'convertSqftToSqm',
      pattern: /(\d+)\s*sq\.?\s*ft\.?/gi,
      replacement: (_, num) => `${Math.round(parseInt(num) * 0.0929)} sqm`,
    },
  ],
};
```

### 7.2 Re-generation on Failure

If validation fails, attempt **targeted re-generation**:

```typescript
async function generateWithValidation(prompt: PromptPayload): Promise<GenerationResult> {
  let attempts = 0;
  const maxAttempts = 3;
  
  while (attempts < maxAttempts) {
    const result = await llmGenerate(prompt);
    const validation = validateNigerianOutput(result.code);
    
    if (validation.valid) {
      return { code: result.code, validation };
    }
    
    // Apply auto-fixes
    let fixedCode = result.code;
    for (const fix of validation.autoFixes) {
      fixedCode = fixedCode.replace(fix.pattern, fix.replacement);
    }
    
    // Re-validate after fixes
    const postFixValidation = validateNigerianOutput(fixedCode);
    if (postFixValidation.valid) {
      return { code: fixedCode, validation: postFixValidation };
    }
    
    // Add correction prompt for next attempt
    prompt.user += `\n\n## CORRECTION REQUIRED\n${validation.errors.join('\n')}`;
    attempts++;
  }
  
  throw new Error('Failed to generate valid Nigerian content after 3 attempts');
}
```

---

## 8. Implementation

### 8.1 File Structure

```
lib/
├── prompts/
│   ├── system-prompt.ts       # System prompt constants
│   ├── page-type-prompts.ts   # Per-page-type prompts
│   ├── prompt-builder.ts      # Build user prompts
│   └── context-injector.ts    # Template/component refs
├── validation/
│   ├── validators.ts          # Validation functions
│   ├── auto-fixers.ts         # Auto-fix patterns
│   └── pipeline.ts            # Validation pipeline
├── data/
│   ├── property-types.ts      # Nigerian property types
│   ├── locations.ts           # Nigerian locations
│   ├── features.ts            # Nigerian amenities
│   └── documents.ts           # Land document types
└── templates/
    ├── listing.tsx            # Reference templates
    ├── land.tsx
    ├── agent.tsx
    └── ...
```

### 8.2 Usage Example

```typescript
import { buildConstrainedPrompt } from '@/lib/prompts/prompt-builder';
import { validateNigerianOutput } from '@/lib/validation/validators';
import { generateWithValidation } from '@/lib/generation/generator';

async function generateLandingPage(wizardData: WizardData) {
  // Build constrained prompt from wizard data
  const prompt = buildConstrainedPrompt(wizardData);
  
  // Generate with validation loop
  const result = await generateWithValidation(prompt);
  
  // Return validated code
  return result.code;
}
```

---

## Summary

This prompt engineering system ensures LLM-generated landing pages are **100% Nigerian-market appropriate** through:

1. **UI Constraints**: Users can only select Nigerian property types, locations, and features
2. **System Prompt**: LLM is role-played as Nigerian real estate specialist
3. **Structured Prompts**: Explicit data injection eliminates ambiguity
4. **Context References**: Template code guides output structure
5. **Post-Validation**: Catches and auto-fixes any remaining issues

The result: **Zero hallucination** of American/generic content, and consistent, professional Nigerian real estate landing pages every time.

---

> **Related Documents**:  
> [Guided Prompt Flow](./09-GUIDED-PROMPT-FLOW.md) |  
> [Template Library](./08-TEMPLATE-LIBRARY.md) |  
> [Technical Spec](./02-TECHNICAL-SPEC.md)
