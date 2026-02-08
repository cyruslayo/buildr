# Design System Document
# Buildr — Visual Design & UI Guidelines

> **Version**: 2.0 | **Updated**: December 8, 2024  
> **Status**: Updated for Template-Only Approach  
> **Related**: [16-TEMPLATE-DESIGN-SPEC.md](./16-TEMPLATE-DESIGN-SPEC.md) - Andy Clarke art direction for templates

---

## 1. Design Principles

### Core Values

| Principle | Description |
|-----------|-------------|
| **Professional** | Premium aesthetics that real estate agencies expect |
| **Intuitive** | Simple enough for non-technical users (form-based, not code) |
| **Fast** | Responsive interactions, minimal loading states |
| **Trustworthy** | Clean, polished UI that builds confidence |
| **Art-Directed** | Templates follow Andy Clarke art direction principles |
| **Nigerian Context** | Localized for ₦, sqm, WhatsApp, Nigerian locations |

---

## 2. Color System

### Primary Palette

```css
:root {
  /* Primary - Indigo (Trust & Professionalism) */
  --primary-50: #eef2ff;
  --primary-100: #e0e7ff;
  --primary-500: #6366f1;
  --primary-600: #4f46e5;
  --primary-700: #4338ca;
  
  /* Secondary - Slate (Neutral Foundation) */
  --secondary-50: #f8fafc;
  --secondary-100: #f1f5f9;
  --secondary-800: #1e293b;
  --secondary-900: #0f172a;
  --secondary-950: #020617;
  
  /* Accent - Amber (Energy & Action) */
  --accent-400: #fbbf24;
  --accent-500: #f59e0b;
  --accent-600: #d97706;
}
```

### Semantic Colors

| Purpose | Color | Usage |
|---------|-------|-------|
| Success | `#22c55e` | Validation passed, generation complete |
| Warning | `#f59e0b` | Rate limit warnings, validation issues |
| Error | `#ef4444` | Errors, failed generation |
| Info | `#3b82f6` | Informational messages |

### Dark Mode (Default)

The builder interface uses dark mode by default for:
- Reduced eye strain during extended sessions
- Better template preview contrast
- Modern, premium aesthetic

---

## 3. Typography

### Font Stack

```css
:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

### Type Scale

| Level | Size | Weight | Usage |
|-------|------|--------|-------|
| Display | 48px / 3rem | 700 | Marketing headlines |
| H1 | 36px / 2.25rem | 600 | Page titles |
| H2 | 24px / 1.5rem | 600 | Section headers |
| H3 | 20px / 1.25rem | 600 | Card titles |
| Body | 16px / 1rem | 400 | Default text |
| Small | 14px / 0.875rem | 400 | Captions, labels |
| XSmall | 12px / 0.75rem | 500 | Badges, hints |

---

## 4. Spacing System

Based on 4px increments:

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Inline spacing |
| `space-2` | 8px | Tight gaps |
| `space-3` | 12px | Icon-text gaps |
| `space-4` | 16px | Standard padding |
| `space-6` | 24px | Card padding |
| `space-8` | 32px | Section gaps |
| `space-12` | 48px | Section padding |
| `space-16` | 64px | Major sections |

---

## 5. Component Library (shadcn/ui)

### Core Components

| Component | Usage |
|-----------|-------|
| `Button` | Primary actions, CTAs |
| `Input` | Text fields, prompts |
| `Card` | Content containers |
| `Dialog` | Modals, confirmations |
| `Tabs` | Navigation, view switching |
| `Select` | Dropdowns, filters |
| `Badge` | Status indicators |
| `Tooltip` | Helpful hints |
| `Progress` | Loading, generation |

### Button Variants

```tsx
// Primary - Main actions
<Button>Generate Page</Button>

// Secondary - Less emphasis
<Button variant="secondary">Edit Code</Button>

// Outline - Tertiary actions
<Button variant="outline">Preview</Button>

// Ghost - Minimal actions
<Button variant="ghost">Cancel</Button>

// Destructive - Dangerous actions
<Button variant="destructive">Delete</Button>
```

### Builder UI Panels (Aura)

Reflecting the "Aura" design capabilities:

| Panel | Functionality |
|-------|---------------|
| **Selection Fonts** | Detects used fonts, bulk edit headings/body, pairs fonts. |
| **Selection Colors** | Detects color names (e.g., "blue"), Theme swapping, Text gradients. |
| **Selection Assets** | Manages all images, background layers, and media embeds. |


---

## 6. Layout Patterns

### Builder Interface Layout

```
┌─────────────────────────────────────────────────────┐
│                     HEADER                          │
│  Logo  │  Nav  │  Status           │  User  Export │
├─────────┬───────────────────────────────────────────┤
│         │                                           │
│  SIDE   │              MAIN CONTENT                 │
│  BAR    │  ┌─────────────────────────────────────┐  │
│         │  │      STEP INDICATOR (1 2 3 4)       │  │
│ History │  └─────────────────────────────────────┘  │
│         │  ┌─────────────────┬───────────────────┐  │
│ Templates│  │  WIZARD FORM   │     PREVIEW       │  │
│         │  │                 │                   │  │
│ Settings │  │                 │                   │  │
│         │  │                 │                   │  │
│         │  └─────────────────┴───────────────────┘  │
└─────────┴───────────────────────────────────────────┘
```

### Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 768px | Stacked, tabs for views |
| Tablet | 768-1024px | Collapsible sidebar |
| Desktop | 1024-1440px | Full layout |
| Large | > 1440px | Expanded panels |

### Bento Layouts (Preferred)

For dashboards and feature grids, use the **Bento Box** pattern:

- **Grid Foundation**: 4x4 or 3x3 base grid.
- **Hierarchy**: Largest cell = Most important content (e.g., Property Price).
- **Asymmetry**: Avoid equal-width columns.
   - **Hero**: `col-span-8` (Image) + `col-span-4` (Content).
   - **Features**: Mix `col-span-1` and `col-span-2` for visual interest.

```tsx
// Example Asymmetric Grid (Tailwind)
<div className="grid grid-cols-12 gap-4">
  <div className="col-span-12 md:col-span-8 h-96 bg-gray-100 rounded-xl" /> {/* Hero Image */}
  <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
    <div className="h-48 bg-indigo-50 rounded-xl" /> {/* Title/Price */}
    <div className="h-44 bg-slate-50 rounded-xl" />  {/* Agent Info */}
  </div>
</div>
```

---

## 7. Animation & Motion

### Timing Functions

```css
:root {
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
}
```

### Duration Scale

| Purpose | Duration |
|---------|----------|
| Micro-interactions | 150ms |
| Standard transitions | 200ms |
| Panel reveals | 300ms |
| Page transitions | 400ms |

### Key Animations

```css
/* Fade in for content */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Pulse for loading states */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Spin for spinners */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

### Staggered Entrance System

Instead of generic fades, use this staggered timing for all enters:

| Element | Delay | Duration | Easing |
|---------|-------|----------|--------|
| **Heading** | `0ms` | `600ms` | `ease-out` |
| **Subheading**| `200ms` | `600ms` | `ease-out` |
| **Prim. CTA** | `300ms` | `600ms` | `ease-out` |
| **Sec. CTA** | `400ms` | `600ms` | `ease-out` |

**Utility Classes**:
`animate-in fade-in slide-in-from-bottom-4 duration-600 ease-out`

---

## 8. Iconography

### Icon Library: Lucide React

```tsx
import { 
  Sparkles,     // AI/Generation
  Code2,        // Code view
  Eye,          // Preview
  Download,     // Export
  History,      // Version history
  Palette,      // Brand settings
  Loader2,      // Loading spinner
  Check,        // Success
  AlertCircle,  // Error/Warning
} from 'lucide-react';
```

### Icon Sizes

| Context | Size |
|---------|------|
| Inline with text | 16px |
| Buttons | 18px |
| Cards/headers | 20px |
| Feature highlights | 24px |
| Empty states | 48px |

---

## 9. Real Estate-Specific Design Patterns (Nigeria 🇳🇬)

### Property Card

```
┌──────────────────────────────────┐
│  ┌────────────────────────────┐  │
│  │       Property Image       │  │
│  │        (16:9 ratio)        │  │
│  └────────────────────────────┘  │
│  ₦85,000,000                     │
│  4 bed • 3 bath • 350 sqm        │
│  Lekki Phase 1, Lagos            │
│  [📲 WhatsApp] [View Details]    │
└──────────────────────────────────┘
```

**Nigerian Property Card Fields:**
- **Price**: Display in Naira (₦) with thousands separator
- **Size**: Always in square meters (sqm)
- **Bedrooms/Bathrooms**: Standard format
- **Location**: Area, City format (e.g., "Maitama, Abuja")
- **CTA**: WhatsApp button (primary) + View Details

### Agent Card

```
┌──────────────────────────────────┐
│  ┌──────┐                        │
│  │ Photo │  Chibuzo Okeke        │
│  │ (1:1) │  Principal Partner    │
│  └──────┘  NIESV • REDAN         │
│  10+ years in Lekki/Ikoyi...     │
│  📲 WhatsApp  📞 Call            │
│  [Chat on WhatsApp]              │
└──────────────────────────────────┘
```

**Nigerian Agent Card Fields:**
- **Credentials**: NIESV, REDAN, AREF badges
- **Specialization**: Nigerian areas (e.g., "Lekki/Ikoyi Specialist")
- **Primary CTA**: WhatsApp click-to-chat
- **Secondary**: Phone call

### WhatsApp Button Component

```css
/* WhatsApp CTA Button - Primary Action */
.whatsapp-btn {
  background: #25D366;         /* WhatsApp green */
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
}

.whatsapp-btn:hover {
  background: #128C7E;         /* Darker WhatsApp green */
}

/* Floating WhatsApp Button */
.whatsapp-floating {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #25D366;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 999;
  /* Nigeria Mobile Safe Area */
  bottom: calc(24px + env(safe-area-inset-bottom)); 
  right: 24px;
}

/* Ensure no overlap with Status Bars on mobile browsers */
@media (max-width: 640px) {
  .whatsapp-floating {
    bottom: 80px; /* Clear typical bottom nav bars */
  }
}
```

### Currency & Measurement Formatting

```typescript
// Nigerian Naira formatting
function formatNaira(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
  // Output: ₦85,000,000
}

// Square meters formatting
function formatArea(sqm: number): string {
  return `${sqm.toLocaleString('en-NG')} sqm`;
  // Output: 350 sqm
}

// Plot dimensions
function formatPlotSize(width: number, length: number): string {
  return `${width}m × ${length}m`;
  // Output: 30m × 40m
}
```

### Land Document Status Badge

```
┌─────────────────────────────────────┐
│  Document Type: [C of O ✓]          │
│                                     │
│  ✅ Certificate of Occupancy        │
│  ✅ Governor's Consent              │
│  ✅ Survey Plan                     │
│  ⏳ Deed of Assignment (pending)    │
└─────────────────────────────────────┘
```


---

## 10. Accessibility

### Requirements

| Criterion | Target |
|-----------|--------|
| Color Contrast | WCAG AA (4.5:1 minimum) |
| Keyboard Navigation | Full support |
| Screen Readers | ARIA labels throughout |
| Focus States | Visible focus rings |
| Motion | Respects `prefers-reduced-motion` |

### Focus States

```css
:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}
```

---

## 11. Generated Page Styling

### Default Theme for Generated Pages

```css
/* Suggested styles for AI-generated landing pages */
:root {
  /* Uses user's brand colors or defaults */
  --page-primary: #6366f1;
  --page-secondary: #4f46e5;
  --page-accent: #f59e0b;
  
  /* Typography */
  --page-font: 'Inter', sans-serif;
  
  /* Spacing */
  --section-padding: 4rem 1rem;
}

/* Common patterns */
.hero { background: linear-gradient(135deg, var(--page-primary), var(--page-secondary)); }
.cta-button { background: var(--page-accent); }
.section { padding: var(--section-padding); }
```

---

> **Related**: [PRD](./01-PRD.md) | [Technical Spec](./02-TECHNICAL-SPEC.md)
