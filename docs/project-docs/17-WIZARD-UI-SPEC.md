# Wizard UI Specification
# Buildr — Template Customization Wizard

> **Version**: 1.0 | **Created**: December 8, 2024  
> **Purpose**: Detailed specification for the 4-step template customization wizard  
> **Approach**: Template-Only (form-based, no code)  
> **Related**: [09-GUIDED-PROMPT-FLOW.md](./09-GUIDED-PROMPT-FLOW.md), [16-TEMPLATE-DESIGN-SPEC.md](./16-TEMPLATE-DESIGN-SPEC.md)

---

## Table of Contents

1. [Overview](#1-overview)
2. [Wizard Architecture](#2-wizard-architecture)
3. [Step 1: Template Selection](#3-step-1-template-selection)
4. [Step 2: Property Details Form](#4-step-2-property-details-form)
5. [Step 3: Style & Branding](#5-step-3-style--branding)
6. [Step 4: Preview & Publish](#6-step-4-preview--publish)
7. [Form Validation Rules](#7-form-validation-rules)
8. [State Management](#8-state-management)
9. [Component Specifications](#9-component-specifications)
10. [Accessibility Requirements](#10-accessibility-requirements)

---

## 1. Overview

### Purpose

The Template Customization Wizard guides non-technical Nigerian real estate professionals through creating professional landing pages by:

1. **Selecting** from pre-designed templates
2. **Filling** property details via intuitive forms
3. **Choosing** style presets
4. **Previewing** and publishing

### Target Users

- Non-technical real estate agents
- Agency marketing coordinators
- Property developers
- No coding or design experience required

### Design Principles

| Principle | Implementation |
|-----------|----------------|
| **Progressive Disclosure** | Show only relevant fields per step |
| **Nigerian Context** | ₦ currency, sqm, WhatsApp, Nigerian locations |
| **Error Prevention** | Validate inline, prevent submission of invalid data |
| **Mobile-First** | 44px touch targets, thumb-friendly layout |
| **Clear Progress** | Step indicator always visible |

---

## 2. Wizard Architecture

### Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   STEP 1          STEP 2          STEP 3          STEP 4        ACTION     │
│   ─────────       ─────────       ─────────       ─────────     ─────────  │
│  Template    →   Property     →    Style      →   Preview    →   Publish   │
│  Selection       Details           Picker         & Export                  │
│                                                                             │
│   • Browse        • Price (₦)      • Color         • Live         • Save   │
│   • Filter        • Beds/Baths     • Typography    • Mobile       • Export │
│   • Preview       • Location       • Preset        • Desktop      • Share  │
│   • Select        • Features       • Custom        • WhatsApp              │
│                   • WhatsApp                       • Edit                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### State Machine

```typescript
type WizardStep = 'template' | 'details' | 'style' | 'preview';

interface WizardState {
  currentStep: WizardStep;
  completedSteps: WizardStep[];
  canProceed: boolean;
  
  // Step 1
  selectedTemplate: string | null;
  templateCategory: TemplateCategory | null;
  
  // Step 2
  propertyData: PropertyData;
  
  // Step 3
  stylePreset: StylePreset;
  customColors?: CustomColors;
  
  // Step 4
  previewMode: 'desktop' | 'mobile';
  isPublishing: boolean;
}
```

### Navigation Rules

| From | To | Condition |
|------|-----|-----------|
| Step 1 | Step 2 | Template selected |
| Step 2 | Step 3 | All required fields valid |
| Step 3 | Step 4 | Style preset selected |
| Step 4 | Publish | Preview confirmed |
| Any | Previous | Always allowed |

---

## 3. Step 1: Template Selection

### Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Step 1 of 4: Choose Your Template                     [●○○○] Progress     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Categories:  [All] [Luxury] [Standard] [Land] [Agent] [Short-Let]  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │  Preview    │  │  Preview    │  │  Preview    │  │  Preview    │        │
│  │  Thumbnail  │  │  Thumbnail  │  │  Thumbnail  │  │  Thumbnail  │        │
│  │             │  │             │  │             │  │             │        │
│  │ ─────────── │  │ ─────────── │  │ ─────────── │  │ ─────────── │        │
│  │ Banana Isle │  │ Lekki Home  │  │ Modern Plot │  │ Agent Pro   │        │
│  │ Luxury      │  │ Standard    │  │ Land        │  │ Agent       │        │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘        │
│                                                                             │
│                        [ View Full Preview ]                                │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                              [← Back]  [Next: Details →]   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Template Card Component

```typescript
interface TemplateCardProps {
  id: string;
  name: string;
  category: TemplateCategory;
  thumbnailUrl: string;
  isPremium: boolean;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onPreview: (id: string) => void;
}

// Categories
type TemplateCategory = 
  | 'luxury'      // High-end properties (Banana Island, Ikoyi)
  | 'standard'    // Family homes, duplexes
  | 'land'        // Land/plot sales
  | 'agent'       // Agent/agency profiles
  | 'shortlet'    // Short-let apartments
  | 'estate';     // Off-plan developments
```

### Interactions

| Action | Behavior |
|--------|----------|
| Click template card | Select template, show selection ring |
| Double-click | Open full preview modal |
| Click category tab | Filter templates by category |
| Hover card | Show "Preview" button overlay |
| Keyboard Enter | Select focused template |

### Validation

- ✅ At least one template must be selected to proceed
- ✅ Selected template ID stored in state

---

## 4. Step 2: Property Details Form

### Layout (Property Listing)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Step 2 of 4: Property Details                         [●●○○] Progress     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Property Information                                                       │
│  ───────────────────                                                        │
│                                                                             │
│  Property Type *                      Title *                               │
│  ┌─────────────────────────┐          ┌─────────────────────────────────┐  │
│  │ Detached Duplex      ▼  │          │ Luxury family home in Lekki...  │  │
│  └─────────────────────────┘          └─────────────────────────────────┘  │
│                                                                             │
│  Price (₦) *                          Size (sqm) *                          │
│  ┌─────────────────────────┐          ┌─────────────────────────────────┐  │
│  │ ₦ 85,000,000            │          │ 350                             │  │
│  └─────────────────────────┘          └─────────────────────────────────┘  │
│                                                                             │
│  Bedrooms *           Bathrooms *         Parking Spaces                    │
│  ┌─────────┐          ┌─────────┐         ┌─────────────────────────────┐  │
│  │ 4    ▼  │          │ 4    ▼  │         │ 2                           │  │
│  └─────────┘          └─────────┘         └─────────────────────────────┘  │
│                                                                             │
│  Location                                                                   │
│  ────────                                                                   │
│                                                                             │
│  City *                               Area *                                │
│  ┌─────────────────────────┐          ┌─────────────────────────────────┐  │
│  │ Lagos                ▼  │          │ Lekki Phase 1               ▼  │  │
│  └─────────────────────────┘          └─────────────────────────────────┘  │
│                                                                             │
│  Estate Name (optional)               Full Address                          │
│  ┌─────────────────────────┐          ┌─────────────────────────────────┐  │
│  │ Pinnock Beach Estate    │          │ 5A Admiralty Way, Lekki...      │  │
│  └─────────────────────────┘          └─────────────────────────────────┘  │
│                                                                             │
│  Nigerian Features                                                          │
│  ─────────────────                                                          │
│                                                                             │
│  [✓] Bore Hole        [✓] Boys Quarters (BQ)      [ ] Swimming Pool        │
│  [✓] Generator House  [ ] CCTV Security           [ ] Smart Home           │
│  [ ] Gym              [✓] Solar Power             [ ] Tennis Court         │
│                                                                             │
│  Document Status                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ C of O (Certificate of Occupancy)                               ▼  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  WhatsApp Contact *                                                         │
│  ─────────────────                                                          │
│                                                                             │
│  WhatsApp Number *                    Pre-filled Message                    │
│  ┌─────────────────────────┐          ┌─────────────────────────────────┐  │
│  │ 080 123 456 78          │          │ Hi! I'm interested in this...   │  │
│  └─────────────────────────┘          └─────────────────────────────────┘  │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                              [← Back]  [Next: Style →]     │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Form Fields by Template Type

#### Property Listing Fields

```typescript
interface PropertyListingData {
  // Required
  propertyType: PropertyType;  // Dropdown
  title: string;               // Text, 10-100 chars
  price: number;               // Naira input with formatting
  sqm: number;                 // Number, 10-10000
  beds: number;                // Dropdown 1-10
  baths: number;               // Dropdown 1-10
  city: NigerianCity;          // Dropdown with autocomplete
  area: string;                // Dropdown based on city
  whatsappNumber: string;      // Nigerian phone format
  
  // Optional
  parking?: number;
  estateName?: string;
  address?: string;
  features: NigerianFeature[]; // Multiselect checkboxes
  documentStatus?: DocumentStatus;
  whatsappMessage?: string;
  images?: string[];           // Image upload
  description?: string;        // Textarea, AI-enhanceable
}

type PropertyType = 
  | 'detached_duplex' | 'semi_detached_duplex' | 'terrace'
  | 'flat' | 'penthouse' | 'bungalow' | 'mansion';

type NigerianFeature = 
  | 'borehole' | 'bq' | 'generator_house' | 'swimming_pool'
  | 'cctv' | 'smart_home' | 'gym' | 'solar' | 'tennis_court'
  | 'elevator' | 'home_office' | 'staff_quarters';

type DocumentStatus = 
  | 'c_of_o' | 'governors_consent' | 'deed_of_assignment'
  | 'survey_plan' | 'building_approval' | 'freehold';
```

#### Land Plot Fields

```typescript
interface LandPlotData {
  // Required
  plotSize: number;            // sqm
  pricePerSqm: number;         // ₦
  totalPrice: number;          // ₦ (auto-calculated)
  location: string;
  city: NigerianCity;
  whatsappNumber: string;
  
  // Optional
  documentStatus: DocumentStatus;
  landUse?: 'residential' | 'commercial' | 'mixed';
  isFenced?: boolean;
  hasAccess?: boolean;
  description?: string;
}
```

#### Agent Profile Fields

```typescript
interface AgentProfileData {
  // Required
  agentName: string;
  title: string;               // e.g., "Principal Partner"
  yearsExperience: number;
  specialization: string[];    // Areas/property types
  whatsappNumber: string;
  
  // Optional
  email?: string;
  credentials?: string[];      // NIESV, REDAN, etc.
  bio?: string;               // AI-enhanceable
  profileImage?: string;
  coverageAreas?: string[];
  languages?: string[];
}
```

### Dynamic Form Behavior

| Trigger | Action |
|---------|--------|
| City selected | Populate Area dropdown with relevant areas |
| Price entered | Format as ₦X,XXX,XXX with thousand separators |
| sqm entered | Show calculated price per sqm |
| Plot size + price/sqm | Auto-calculate total price |
| "Enhance with AI" clicked | Send to AI for description improvement |

---

## 5. Step 3: Style & Branding

### Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Step 3 of 4: Choose Your Style                        [●●●○] Progress     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Style Presets                                                              │
│  ─────────────                                                              │
│                                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ ████ ████   │  │ ████ ████   │  │ ████ ████   │  │ ████ ████   │        │
│  │ Dark Gold   │  │ Trust Blue  │  │ Modern Min  │  │ Warm Earth  │        │
│  │ [Selected ✓]│  │             │  │             │  │             │        │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘        │
│                                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ ████ ████   │  │ ████ ████   │  │ ████ ████   │  │ ████ ████   │        │
│  │ Vibrant     │  │ Corporate   │  │ Sunset      │  │ Nature      │        │
│  │             │  │             │  │             │  │             │        │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘        │
│                                                                             │
│  [ ] Use custom brand colors                                                │
│                                                                             │
│  ┌─ Custom Colors (if enabled) ─────────────────────────────────────────┐  │
│  │                                                                       │  │
│  │  Primary       Secondary      Accent                                  │  │
│  │  ┌────────┐    ┌────────┐     ┌────────┐                             │  │
│  │  │ #1a365d│    │ #2c5282│     │ #d4af37│                             │  │
│  │  └────────┘    └────────┘     └────────┘                             │  │
│  │                                                                       │  │
│  │  Logo Upload                                                          │  │
│  │  ┌──────────────────────────────────────────────────────────────┐    │  │
│  │  │  [Click to upload or drag and drop]                          │    │  │
│  │  │  PNG, JPG up to 2MB                                          │    │  │
│  │  └──────────────────────────────────────────────────────────────┘    │  │
│  │                                                                       │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                              [← Back]  [Next: Preview →]   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Style Presets

```typescript
interface StylePreset {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
  };
  mood: 'luxury' | 'professional' | 'modern' | 'warm' | 'vibrant';
}

const STYLE_PRESETS: StylePreset[] = [
  {
    id: 'luxury_dark',
    name: 'Luxury Dark',
    colors: {
      primary: '#1a1a2e',
      secondary: '#16213e',
      accent: '#d4af37',
      background: '#0f0f1a',
      text: '#ffffff',
    },
    typography: {
      headingFont: 'Playfair Display',
      bodyFont: 'Inter',
    },
    mood: 'luxury',
  },
  {
    id: 'trust_blue',
    name: 'Trust Blue',
    colors: {
      primary: '#1a365d',
      secondary: '#2c5282',
      accent: '#3182ce',
      background: '#ffffff',
      text: '#1a202c',
    },
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter',
    },
    mood: 'professional',
  },
  // ... 6 more presets
];
```

---

## 6. Step 4: Preview & Publish

### Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Step 4 of 4: Preview & Publish                        [●●●●] Progress     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────┐  ┌─────────────────────────────┐  │
│  │                                     │  │  Preview Controls           │  │
│  │                                     │  │  ─────────────────          │  │
│  │                                     │  │                             │  │
│  │         LIVE PREVIEW                │  │  [🖥️ Desktop] [📱 Mobile]   │  │
│  │         (iframe)                    │  │                             │  │
│  │                                     │  │  [↔️ Full Screen Preview]   │  │
│  │                                     │  │                             │  │
│  │                                     │  ├─────────────────────────────┤  │
│  │                                     │  │  Quick Actions              │  │
│  │                                     │  │  ─────────────              │  │
│  │                                     │  │                             │  │
│  │                                     │  │  [📝 Edit Details]          │  │
│  │                                     │  │  [🎨 Change Style]          │  │
│  │                                     │  │  [📋 Change Template]       │  │
│  │                                     │  │                             │  │
│  │                                     │  ├─────────────────────────────┤  │
│  │                                     │  │  Publish Options            │  │
│  │                                     │  │  ───────────────            │  │
│  │                                     │  │                             │  │
│  │                                     │  │  Page URL:                  │  │
│  │                                     │  │  buildr.ng/p/abc123         │  │
│  │                                     │  │  [📋 Copy]                  │  │
│  │                                     │  │                             │  │
│  │                                     │  │  [    💾 Save Draft    ]    │  │
│  │                                     │  │  [    📤 Publish Now   ]    │  │
│  │                                     │  │  [    📥 Download HTML ]    │  │
│  │                                     │  │                             │  │
│  │                                     │  └─────────────────────────────┘  │
│  └─────────────────────────────────────┘                                    │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                              [← Back]  [Publish →]         │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Preview Modes

| Mode | Viewport | Purpose |
|------|----------|---------|
| Desktop | 1280px | Default view |
| Mobile | 375px | Mobile verification |
| Full Screen | 100% | Immersive preview |

### Publish Actions

```typescript
interface PublishOptions {
  action: 'save_draft' | 'publish' | 'download';
  
  // For publish
  customSlug?: string;        // Custom URL slug
  enableAnalytics?: boolean;  // Track views
  
  // For download
  format: 'html' | 'zip';     // Download format
  includeAssets: boolean;     // Bundle images
}
```

---

## 7. Form Validation Rules

### Validation Schema (Zod)

```typescript
import { z } from 'zod';

// Nigerian phone number regex
const nigerianPhone = z.string().regex(
  /^(\+234|0)[789][01]\d{8}$/,
  'Please enter a valid Nigerian phone number'
);

// Naira price validation
const nairaPrice = z.number()
  .min(100000, 'Minimum price is ₦100,000')
  .max(50000000000, 'Maximum price is ₦50 billion');

// Property listing validation
export const propertyListingSchema = z.object({
  propertyType: z.enum([
    'detached_duplex', 'semi_detached_duplex', 'terrace',
    'flat', 'penthouse', 'bungalow', 'mansion'
  ]),
  title: z.string().min(10).max(100),
  price: nairaPrice,
  sqm: z.number().min(10).max(10000),
  beds: z.number().min(1).max(20),
  baths: z.number().min(1).max(20),
  city: z.string().min(2),
  area: z.string().min(2),
  whatsappNumber: nigerianPhone,
  
  // Optional
  parking: z.number().optional(),
  estateName: z.string().optional(),
  address: z.string().optional(),
  features: z.array(z.string()).optional(),
  documentStatus: z.string().optional(),
  whatsappMessage: z.string().max(500).optional(),
  description: z.string().max(2000).optional(),
});
```

### Inline Validation Behavior

| Field | Validate On | Error Display |
|-------|-------------|---------------|
| Required fields | Blur + Submit | Below field, red text |
| Phone number | Blur | Format hint + error |
| Price | Input (debounced) | Format as user types |
| All fields | Submit attempt | Scroll to first error |

### Error States

```typescript
interface FieldError {
  field: string;
  message: string;
  type: 'required' | 'format' | 'range' | 'custom';
}

// Error messages should be user-friendly
const ERROR_MESSAGES = {
  required: 'This field is required',
  phone_format: 'Please enter a valid Nigerian number (e.g., 08012345678)',
  price_min: 'Minimum price is ₦100,000',
  price_max: 'Maximum price is ₦50 billion',
  beds_range: 'Please select between 1 and 20 bedrooms',
};
```

---

## 8. State Management

### Zustand Store

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WizardStore {
  // Current step
  step: number;
  setStep: (step: number) => void;
  
  // Step 1: Template
  selectedTemplateId: string | null;
  selectTemplate: (id: string) => void;
  
  // Step 2: Property data
  propertyData: Partial<PropertyListingData>;
  updatePropertyData: (data: Partial<PropertyListingData>) => void;
  
  // Step 3: Style
  stylePreset: string;
  customColors: CustomColors | null;
  setStylePreset: (preset: string) => void;
  setCustomColors: (colors: CustomColors) => void;
  
  // Step 4: Preview
  previewMode: 'desktop' | 'mobile';
  setPreviewMode: (mode: 'desktop' | 'mobile') => void;
  
  // Actions
  reset: () => void;
  canProceedToStep: (step: number) => boolean;
}

export const useWizardStore = create<WizardStore>()(
  persist(
    (set, get) => ({
      step: 1,
      selectedTemplateId: null,
      propertyData: {},
      stylePreset: 'trust_blue',
      customColors: null,
      previewMode: 'desktop',
      
      setStep: (step) => set({ step }),
      
      selectTemplate: (id) => set({ selectedTemplateId: id }),
      
      updatePropertyData: (data) => set((state) => ({
        propertyData: { ...state.propertyData, ...data }
      })),
      
      setStylePreset: (preset) => set({ stylePreset: preset }),
      
      setCustomColors: (colors) => set({ customColors: colors }),
      
      setPreviewMode: (mode) => set({ previewMode: mode }),
      
      reset: () => set({
        step: 1,
        selectedTemplateId: null,
        propertyData: {},
        stylePreset: 'trust_blue',
        customColors: null,
      }),
      
      canProceedToStep: (targetStep) => {
        const state = get();
        if (targetStep === 2) return !!state.selectedTemplateId;
        if (targetStep === 3) {
          return !!state.propertyData.price && 
                 !!state.propertyData.whatsappNumber;
        }
        if (targetStep === 4) return !!state.stylePreset;
        return true;
      },
    }),
    {
      name: 'buildr-wizard',
      partialize: (state) => ({
        selectedTemplateId: state.selectedTemplateId,
        propertyData: state.propertyData,
        stylePreset: state.stylePreset,
      }),
    }
  )
);
```

---

## 9. Component Specifications

### WizardContainer

```typescript
interface WizardContainerProps {
  children: React.ReactNode;
}

// Features:
// - Step indicator header
// - Navigation buttons footer
// - Progress persistence
// - Keyboard navigation (Arrow keys)
// - Exit confirmation modal
```

### StepIndicator

```typescript
interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
  completedSteps: number[];
  onStepClick?: (step: number) => void;
}

// Features:
// - Clickable completed steps
// - Current step highlight
// - Mobile: numbers only
// - Desktop: numbers + labels
```

### TemplateCard

```typescript
interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: () => void;
  onPreview: () => void;
}

// Features:
// - Thumbnail image (lazy loaded)
// - Hover preview button
// - Selection ring animation
// - Premium badge (if applicable)
// - Category tag
```

### NairaInput

```typescript
interface NairaInputProps {
  value: number | undefined;
  onChange: (value: number) => void;
  error?: string;
  placeholder?: string;
}

// Features:
// - Auto-format with ₦ symbol
// - Thousand separators (e.g., ₦85,000,000)
// - Numeric keyboard on mobile
// - Clear button
```

### NigerianPhoneInput

```typescript
interface NigerianPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

// Features:
// - Auto-format (080 123 456 78)
// - Nigerian prefix validation
// - WhatsApp icon indicator
// - Copy to clipboard
```

---

## 10. Accessibility Requirements

### WCAG 2.1 AA Compliance

| Requirement | Implementation |
|-------------|----------------|
| **Keyboard Navigation** | Tab through all fields, Enter to proceed |
| **Focus Management** | Auto-focus first field on step change |
| **Error Announcements** | `aria-live` regions for validation errors |
| **Form Labels** | All inputs have associated labels |
| **Color Contrast** | 4.5:1 for text, 3:1 for UI elements |
| **Touch Targets** | Minimum 44x44px on mobile |
| **Screen Reader** | Logical heading structure (h1-h4) |

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Tab | Move to next field |
| Shift+Tab | Move to previous field |
| Enter | Submit current step |
| Escape | Close modal/dropdown |
| Arrow Up/Down | Navigate dropdowns |
| Ctrl+S | Save draft |

### ARIA Attributes

```html
<!-- Step indicator -->
<nav aria-label="Wizard progress">
  <ol role="list">
    <li aria-current="step" aria-label="Step 2 of 4: Property Details">
      ...
    </li>
  </ol>
</nav>

<!-- Form validation -->
<input
  aria-invalid="true"
  aria-describedby="price-error"
/>
<span id="price-error" role="alert">
  Please enter a valid price
</span>
```

---

## Related Documents

- [09-GUIDED-PROMPT-FLOW.md](./09-GUIDED-PROMPT-FLOW.md) - Original wizard design (prompt-based)
- [16-TEMPLATE-DESIGN-SPEC.md](./16-TEMPLATE-DESIGN-SPEC.md) - Template visual specifications
- [08-TEMPLATE-LIBRARY.md](./08-TEMPLATE-LIBRARY.md) - Template catalog and variables
- [12-IMPLEMENTATION-TICKETS.md](./12-IMPLEMENTATION-TICKETS.md) - BLDR-2WIZ tickets

---

> **Document Owner**: Frontend Lead  
> **Last Updated**: December 8, 2024  
> **Status**: Ready for Implementation
