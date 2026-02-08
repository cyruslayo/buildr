# Premium Template System Specification
# Buildr — Art-Directed Nigerian Real Estate Templates

> **Version**: 2.0 | **Created**: December 8, 2024  
> **Design Philosophy**: Andy Clarke's Art Direction + Aura Methodology  
> **Stack**: Next.js + Tailwind CSS + shadcn/ui + Framer Motion  
> **Target Market**: Nigerian Real Estate 🇳🇬

---

## Design Manifesto

> "Art direction is not merely about making things look pretty. It is distilling precise meaning from content and brand essence, intentionally evoking emotional responses through every design choice."  
> — Andy Clarke, Art Direction for the Web

This document specifies a template system that achieves **Aura-level quality** while being purpose-built for Nigerian real estate. We reject generic templates in favor of **art-directed experiences** that tell compelling property stories and evoke specific emotions in Nigerian homebuyers.

---

## Foundational Philosophy

### What Art Direction Means for Buildr

Art direction is **NOT** about:
- ❌ Making things "look nice"
- ❌ Following current design trends
- ❌ Using pretty colors and fonts
- ❌ Applying generic templates to content

Art direction **IS** about:
- ✅ **Distilling precise meaning** from the property and brand
- ✅ **Intentionally evoking emotional responses** through every design choice
- ✅ **Communicating a specific message** to Nigerian homebuyers
- ✅ **Creating narrative and storytelling** through visual hierarchy
- ✅ **Making designs memorable** by breaking from generic patterns

---

## Emotional Design Framework

### Before Any Visual Decision, Answer:

```
1. What should users FEEL when they land on this page?
2. What STORY are we telling about this property?
3. What ACTION should that emotion drive?
```

### Emotion-to-Design Mapping (Nigerian Context)

| Emotion | Visual Approach | Tailwind Implementation |
|---------|-----------------|------------------------|
| **Trust & Authority** | Symmetric layouts, serif fonts, muted palettes | `grid-cols-12`, `font-serif`, `slate/zinc` |
| **Excitement & Energy** | Asymmetric grids, bold typography, vibrant colors | `grid-cols-5`, `font-bold`, `accent` colors |
| **Calm & Serenity** | Generous whitespace, soft gradients, minimal elements | `py-24 px-8`, `bg-gradient-to-b`, fewer components |
| **Innovation & Edge** | CSS Grid areas, experimental typography, dramatic imagery | Grid areas, `aspect-video`, blend modes |
| **Warmth & Connection** | Rounded shapes, warm colors, authentic Nigerian imagery | `rounded-2xl`, `amber/orange`, lifestyle photos |
| **Luxury & Exclusivity** | Deep colors, gold accents, serif headers, dramatic scale | `bg-gray-950`, `text-amber-400`, `text-6xl` |
| **Urgency & FOMO** | Bold CTAs, countdown timers, limited availability badges | `bg-red-500`, `animate-pulse`, `font-black` |

### Nigerian-Specific Emotional Triggers

| Trigger | Why It Works | Design Application |
|---------|--------------|-----------------|
| **WhatsApp Prominence** | Primary communication channel | Floating button, larger CTA |
| **Naira Display** | Local currency = trust | Hero-level price display |
| **Document Status** | Land security concerns | Prominent C of O badges |
| **Estate Name** | Social proof, aspiration | Bold estate branding |
| **BQ/Generator/Borehole** | Nigerian must-haves | Feature grid prominence |

---

## Core Art Direction Principles

### Principle 1: Emotional Design First

Every template starts with an **Art Direction Brief**:

```markdown
## Art Direction Brief: [Template Name]

**Target Emotion**: [Primary emotional response]
**Story Arc**: [Beginning → Middle → End of page journey]
**Design Decisions**:
- Layout: [Why asymmetric 2:3 grid?]
- Typography: [Why display serif for authority?]
- Color: [Why deep purple for innovation?]
- Imagery: [Why full-bleed with blend modes?]
- Motion: [Why staggered reveal?]
```

### Principle 2: Distinctive Layouts (The Clarke Grid System)

**REJECT** default symmetric layouts. Instead:

- Use **asymmetric ratios** (2:3, 3:5, 5:8 Fibonacci)
- Create **compound grids** with overlapping elements
- Treat **white space as an active design element**
- Break from **boring centered hero sections**

### Principle 3: Typography as Communication

Typography is not decoration—it **communicates mood and hierarchy**:

- **Serif fonts** = Trust, luxury, tradition
- **Sans-serif fonts** = Modern, clean, professional
- **Display fonts** = Bold statements, hero impact
- **Monospace** = Data, technical, documents

### Principle 4: Intentional Color Psychology

| Color | Nigerian Context | Use Case |
|-------|-----------------|----------|
| **Gold (#c9a227)** | Wealth, success, aspiration | Luxury property accents |
| **Green (#059669)** | Growth, land, investment | Land sales, C of O |
| **Blue (#2563eb)** | Trust, professionalism | Agent profiles, agencies |
| **Purple (#7c3aed)** | Innovation, premium | Modern developments |
| **Orange (#f59e0b)** | Energy, urgency, CTA | WhatsApp, action buttons |

### Principle 5: Context-Aware Design

The same property type needs different art direction based on context:

| Context | ₦25M Duplex in Ajah | ₦250M Duplex in Banana Island |
|---------|---------------------|------------------------------|
| **Emotion** | "Starter home, family warmth" | "Arrived, exclusive, prestigious" |
| **Typography** | Sans-serif, friendly | Serif display, elegant |
| **Color** | Warm amber, soft greens | Deep navy, gold accents |
| **Layout** | Approachable, standard grid | Dramatic, asymmetric |
| **Animation** | Subtle, functional | Cinematic, storytelling |

---

## Anti-Patterns to Avoid

### ❌ Design Anti-Patterns

| Anti-Pattern | Why It's Bad | Instead Do |
|--------------|--------------|------------|
| `grid-cols-2` everywhere | Symmetric = boring, forgettable | Asymmetric 2:3 or 3:5 ratios |
| Default shadcn components | Generic, template-like feel | Extend with art direction |
| Generic stock photography | Doesn't feel Nigerian | Use Nigerian context imagery |
| `animate-*` utilities without purpose | Motion for motion's sake | Purposeful storytelling motion |
| Cookie-cutter hero sections | "Looks like every other site" | Distinctive, memorable heroes |
| Ignoring the property story | Features list, not experience | Narrative-driven layouts |
| Treating all pages identically | No personality or context | Art-direct per property type |
| Centered everything | Safe but forgettable | Asymmetry creates tension |

---

## Design Master References

When creating templates, channel these masters:

| Master | Technique | Application |
|--------|-----------|-------------|
| **Brodovitch** | Asymmetry, bold white space, dynamic typography | Luxury property layouts |
| **Feitler** | Scale emphasis, geometric shapes, montage | Estate development pages |
| **Brody** | Blend modes, vertical text, rule-breaking with systems | Modern/innovative properties |
| **Carson** | Layered type, intentional chaos, grid-breaking | Short-let, vibrant listings |

---

## 1. Template Categories & Art Direction

### 1.1 Category: Luxury Property Listings

**Art Direction Mood**: Aspirational, Prestigious, Confident

| Template | Visual Concept | Emotional Goal |
|----------|----------------|----------------|
| **Banana Island Villa** | Full-bleed hero, gold accents, serif typography | "I've arrived" |
| **Ikoyi Penthouse** | Vertical scroll story, dramatic shadows | "Exclusive lifestyle" |
| **Maitama Mansion** | Symmetrical grandeur, marble textures | "Timeless elegance" |

**Design Language:**
```css
/* Luxury Template Variables */
:root {
  --luxury-primary: #1a1a2e;      /* Deep navy */
  --luxury-accent: #c9a227;       /* Gold */
  --luxury-text: #f5f5f5;         /* Off-white */
  --luxury-serif: 'Playfair Display', serif;
  --luxury-sans: 'Montserrat', sans-serif;
  --luxury-spacing: clamp(2rem, 8vw, 6rem);
}
```

**Motion Design:**
- Hero image: Slow Ken Burns effect (scale from 1.0 to 1.05 over 20s)
- Text reveal: Fade up with stagger (0.1s delay per element)
- Scroll parallax: Background moves at 0.5x scroll speed
- WhatsApp button: Subtle pulse every 3s

---

### 1.2 Category: Standard Property Listings

**Art Direction Mood**: Professional, Trustworthy, Clear

| Template | Visual Concept | Emotional Goal |
|----------|----------------|----------------|
| **Lekki Family Home** | Warm tones, lifestyle imagery, friendly | "Your family belongs here" |
| **Modern Duplex** | Clean lines, geometric accents, bold colors | "Contemporary living" |
| **Terrace Life** | Community focus, multiple homes visible | "Join the neighborhood" |

**Design Language:**
```css
/* Standard Template Variables */
:root {
  --standard-primary: #2563eb;    /* Trust blue */
  --standard-secondary: #1e40af;  /* Deeper blue */
  --standard-accent: #f59e0b;     /* Warm amber CTA */
  --standard-bg: #f8fafc;         /* Light gray */
  --standard-text: #1e293b;       /* Dark slate */
  --standard-font: 'Inter', sans-serif;
  --standard-radius: 12px;
}
```

**Motion Design:**
- Cards: Lift on hover (translateY -8px, shadow increase)
- Gallery: Fade between images (0.5s transition)
- Stats counter: Animate numbers on scroll into view
- WhatsApp: Slide in from right after 2s

---

### 1.3 Category: Land Sales

**Art Direction Mood**: Opportunity, Investment, Potential

| Template | Visual Concept | Emotional Goal |
|----------|----------------|----------------|
| **Prime Plot** | Aerial photography, cadastral styling | "Strategic investment" |
| **Estate Land** | Master plan visualization, future vision | "Be among the first" |
| **Commercial Plot** | Business district imagery, data-forward | "Maximize returns" |

**Design Language:**
```css
/* Land Template Variables */
:root {
  --land-primary: #065f46;       /* Earth green */
  --land-secondary: #059669;     /* Teal */
  --land-accent: #d97706;        /* Orange CTA */
  --land-bg: #ecfdf5;            /* Mint white */
  --land-overlay: rgba(6, 95, 70, 0.8);
}
```

**Motion Design:**
- Hero: Subtle grain/texture overlay animation
- Plot dimensions: Draw-in animation (SVG line animation)
- Price counter: Typewriter-style reveal
- Document badges: Flip-in animation on load

---

### 1.4 Category: Agent Profiles

**Art Direction Mood**: Personal, Expert, Approachable

| Template | Visual Concept | Emotional Goal |
|----------|----------------|----------------|
| **The Specialist** | Bold portrait, expertise showcase | "Trust my experience" |
| **The Connector** | Warm, lifestyle shots, testimonials | "I understand your needs" |
| **The Professional** | Clean, corporate, credentials | "Qualified and certified" |

**Design Language:**
```css
/* Agent Template Variables */
:root {
  --agent-primary: #4f46e5;      /* Indigo */
  --agent-secondary: #7c3aed;    /* Purple */
  --agent-accent: #10b981;       /* Green CTA */
  --agent-portrait-size: min(400px, 80vw);
}
```

**Motion Design:**
- Portrait: Subtle zoom on scroll (1.0 to 1.02)
- Credentials: Badge flip-in animation (staggered)
- Testimonials: Carousel with crossfade
- WhatsApp: Persistent floating button with bounce on idle

---

### 1.5 Category: Short-Let Apartments

**Art Direction Mood**: Vibrant, Comfortable, Instant

| Template | Visual Concept | Emotional Goal |
|----------|----------------|----------------|
| **City Escape** | Instagram-worthy, lifestyle shots | "Your Nigerian getaway" |
| **Business Stay** | Clean, functional, amenity-focused | "Work from anywhere" |
| **Luxury Suite** | Hotel-quality, premium feel | "Treat yourself" |

**Design Language:**
```css
/* Short-Let Template Variables */
:root {
  --shortlet-primary: #ec4899;    /* Pink */
  --shortlet-secondary: #8b5cf6;  /* Purple */
  --shortlet-accent: #06b6d4;     /* Cyan CTA */
  --shortlet-gradient: linear-gradient(135deg, #ec4899, #8b5cf6);
}
```

**Motion Design:**
- Gallery: Smooth swipe gestures, momentum-based
- Pricing toggle: Animated switch (daily/weekly/monthly)
- Amenities: Icon pop-in with stagger
- Book now: Gradient shift animation on hover

---

### 1.6 Category: Estate/Off-Plan Developments

**Art Direction Mood**: Visionary, Exclusive, Urgent

| Template | Visual Concept | Emotional Goal |
|----------|----------------|----------------|
| **The Vision** | Architectural renders, progress timeline | "Be part of something big" |
| **Investor Focus** | ROI calculators, payment plans | "Smart money moves" |
| **Community Living** | Lifestyle renders, amenity showcase | "Your future neighborhood" |

**Design Language:**
```css
/* Estate Template Variables */
:root {
  --estate-primary: #0f172a;      /* Dark slate */
  --estate-secondary: #334155;    /* Medium slate */
  --estate-accent: #22c55e;       /* Success green */
  --estate-highlight: #fbbf24;    /* Gold highlight */
}
```

**Motion Design:**
- Renders: Slow crossfade gallery (4s per slide)
- Progress bar: Animate on scroll into view
- Unit selector: Card flip on selection
- Payment plan: Accordion with smooth height transition
- Countdown: If launching soon, animated countdown timer

---

## 2. Motion Design System

### 2.1 Animation Principles (Aura-Level Quality)

| Principle | Implementation |
|-----------|----------------|
| **Purposeful** | Every animation guides attention or provides feedback |
| **Subtle** | Most animations under 300ms, nothing jarring |
| **Performant** | Animate only `transform` and `opacity` |
| **Accessible** | Respect `prefers-reduced-motion` |

### 2.2 Animation Library

```css
/* ========================================
   BUILDR ANIMATION LIBRARY
   ======================================== */

/* ----- ENTRY ANIMATIONS ----- */

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* ----- HOVER ANIMATIONS ----- */

.card-hover {
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
}
.card-hover:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.button-hover {
  transition: transform 0.15s ease-out, background-color 0.15s ease-out;
}
.button-hover:hover {
  transform: scale(1.02);
}
.button-hover:active {
  transform: scale(0.98);
}

/* ----- WHATSAPP BUTTON ----- */

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.whatsapp-float {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.whatsapp-entry {
  animation: slideInRight 0.5s ease-out 2s both;
}

/* ----- SCROLL REVEAL ----- */

.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ----- STAGGER CHILDREN ----- */

.stagger-children > * {
  opacity: 0;
  animation: fadeUp 0.5s ease-out forwards;
}

.stagger-children > *:nth-child(1) { animation-delay: 0.1s; }
.stagger-children > *:nth-child(2) { animation-delay: 0.2s; }
.stagger-children > *:nth-child(3) { animation-delay: 0.3s; }
.stagger-children > *:nth-child(4) { animation-delay: 0.4s; }
.stagger-children > *:nth-child(5) { animation-delay: 0.5s; }

/* ----- LOADING STATES ----- */

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

/* ----- REDUCED MOTION ----- */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 2.3 JavaScript Animation Utilities

```typescript
// lib/animations/scroll-reveal.ts

export function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  document.querySelectorAll('.reveal').forEach((el) => {
    observer.observe(el);
  });
}

// lib/animations/counter.ts

export function animateCounter(element: HTMLElement, target: number, duration: number = 2000) {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (ease-out)
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (target - start) * easeOut);
    
    element.textContent = new Intl.NumberFormat('en-NG').format(current);
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// lib/animations/parallax.ts

export function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    parallaxElements.forEach((el) => {
      const speed = parseFloat(el.getAttribute('data-parallax') || '0.5');
      const yPos = -(scrollY * speed);
      (el as HTMLElement).style.transform = `translateY(${yPos}px)`;
    });
  });
}
```

---

## 3. Typography System

### 3.1 Font Pairings (Per Template Category)

| Category | Heading Font | Body Font | Rationale |
|----------|-------------|-----------|-----------|
| **Luxury** | Playfair Display | Montserrat | Serif elegance + sans readability |
| **Standard** | Inter | Inter | Clean, professional, excellent readability |
| **Land** | DM Sans | DM Sans | Modern, geometric, business-like |
| **Agent** | Plus Jakarta Sans | Plus Jakarta Sans | Friendly, approachable |
| **Short-Let** | Outfit | Outfit | Contemporary, vibrant |
| **Estate** | Space Grotesk | Inter | Futuristic, forward-looking |

### 3.2 Type Scale

```css
/* Base: 16px (1rem) */
:root {
  --text-xs: 0.75rem;     /* 12px - Badges, captions */
  --text-sm: 0.875rem;    /* 14px - Secondary text */
  --text-base: 1rem;      /* 16px - Body text */
  --text-lg: 1.125rem;    /* 18px - Lead text */
  --text-xl: 1.25rem;     /* 20px - Card titles */
  --text-2xl: 1.5rem;     /* 24px - Section headers */
  --text-3xl: 1.875rem;   /* 30px - Page titles */
  --text-4xl: 2.25rem;    /* 36px - Hero subtitle */
  --text-5xl: 3rem;       /* 48px - Hero headline */
  --text-6xl: 3.75rem;    /* 60px - Display text */
  --text-7xl: 4.5rem;     /* 72px - Large display */

  /* Line Heights */
  --leading-tight: 1.1;
  --leading-snug: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;

  /* Letter Spacing */
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
}

/* Responsive Typography */
h1 {
  font-size: clamp(var(--text-3xl), 5vw, var(--text-6xl));
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
}

h2 {
  font-size: clamp(var(--text-2xl), 4vw, var(--text-4xl));
  line-height: var(--leading-snug);
}

p {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
}
```

---

## 4. Color System

### 4.1 Base Palette (Brand-Agnostic)

```css
:root {
  /* Neutrals (Slate) */
  --gray-50: #f8fafc;
  --gray-100: #f1f5f9;
  --gray-200: #e2e8f0;
  --gray-300: #cbd5e1;
  --gray-400: #94a3b8;
  --gray-500: #64748b;
  --gray-600: #475569;
  --gray-700: #334155;
  --gray-800: #1e293b;
  --gray-900: #0f172a;
  --gray-950: #020617;

  /* Semantic Colors */
  --success: #22c55e;
  --warning: #f59e0b;
  --error: #ef4444;
  --info: #3b82f6;

  /* WhatsApp Brand */
  --whatsapp: #25D366;
  --whatsapp-dark: #128C7E;
}
```

### 4.2 Template Color Presets

```typescript
// lib/templates/color-presets.ts

export const COLOR_PRESETS = {
  // Luxury
  luxury_dark: {
    primary: '#1a1a2e',
    secondary: '#16213e',
    accent: '#c9a227',
    text: '#f5f5f5',
    background: '#0f0f1a',
  },
  luxury_cream: {
    primary: '#2c2c2c',
    secondary: '#8b7355',
    accent: '#d4af37',
    text: '#1a1a1a',
    background: '#faf8f5',
  },

  // Professional
  professional_blue: {
    primary: '#2563eb',
    secondary: '#1e40af',
    accent: '#f59e0b',
    text: '#1e293b',
    background: '#ffffff',
  },
  professional_slate: {
    primary: '#334155',
    secondary: '#475569',
    accent: '#3b82f6',
    text: '#0f172a',
    background: '#f8fafc',
  },

  // Modern
  modern_gradient: {
    primary: '#7c3aed',
    secondary: '#2563eb',
    accent: '#06b6d4',
    text: '#f8fafc',
    background: '#0f172a',
  },
  modern_mint: {
    primary: '#059669',
    secondary: '#10b981',
    accent: '#f59e0b',
    text: '#1e293b',
    background: '#ecfdf5',
  },

  // Warm
  warm_terracotta: {
    primary: '#c2410c',
    secondary: '#ea580c',
    accent: '#fbbf24',
    text: '#1c1917',
    background: '#fffbeb',
  },
  warm_burgundy: {
    primary: '#881337',
    secondary: '#be123c',
    accent: '#fda4af',
    text: '#fdf2f8',
    background: '#1c1917',
  },
} as const;
```

---

## 5. The Clarke Grid System

### 5.1 Asymmetric Layout Principles

**REJECT** symmetric `grid-cols-2` everywhere. Use intentional asymmetry:

| Ratio | Use Case | Emotional Effect |
|-------|----------|------------------|
| **2:3** | Split hero, text + image | Dynamic tension, movement |
| **3:5** | Feature sections | Golden ratio harmony |
| **5:8** | Fibonacci layout | Natural, organic feel |
| **1:2:1** | Three-column with emphasis | Focused attention |
| **Overlapping** | Compound grids | Depth, sophistication |

### 5.2 Asymmetric Hero Implementation

```tsx
{/* Luxury Hero: 2:3 Asymmetric Split (Brodovitch technique) */}
<section className="grid grid-cols-5 min-h-screen gap-8">
  {/* Text content - 2/5 (40%) */}
  <div className="col-span-2 flex flex-col justify-center px-12 py-24">
    <motion.span 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-sm uppercase tracking-widest text-muted-foreground"
    >
      Exclusive Listing
    </motion.span>
    
    <motion.h1 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="font-display text-hero font-bold tracking-tight 
                 bg-gradient-to-r from-foreground to-muted-foreground 
                 bg-clip-text text-transparent"
    >
      5 Bedroom Mansion
    </motion.h1>
    
    <motion.p 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="text-xl text-muted-foreground max-w-prose"
    >
      Banana Island, Lagos
    </motion.p>
    
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="flex items-baseline gap-2 mt-8"
    >
      <span className="text-5xl font-bold">₦850,000,000</span>
    </motion.div>
    
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="flex gap-4 mt-8"
    >
      <ArtButton>
        <WhatsAppIcon className="mr-2 h-5 w-5" />
        Chat on WhatsApp
      </ArtButton>
      <Button variant="outline" size="lg">View Gallery</Button>
    </motion.div>
  </div>
  
  {/* Hero image - 3/5 (60%) with blend mode (Brody technique) */}
  <div className="col-span-3 relative overflow-hidden">
    <Image
      src="/property-hero.jpg"
      alt="Luxury mansion exterior"
      fill
      className="object-cover mix-blend-multiply"
      priority
    />
    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background" />
  </div>
</section>
```

### 5.3 Compound Grid with Overlapping Elements

```tsx
{/* Estate Development: Overlapping compound grid (Feitler technique) */}
<section className="grid grid-cols-8 grid-rows-6 gap-4 min-h-[80vh] px-8 py-16">
  {/* Primary image - spans 5 columns, 4 rows */}
  <div className="col-span-5 row-span-4 col-start-1 row-start-1 relative rounded-2xl overflow-hidden">
    <Image
      src="/estate-render.jpg"
      alt="Estate development render"
      fill
      className="object-cover"
    />
  </div>
  
  {/* Overlapping info card - creates depth */}
  <motion.div 
    initial={{ opacity: 0, x: 40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="col-span-4 row-span-3 col-start-4 row-start-3 z-10
               bg-card/95 backdrop-blur-sm rounded-2xl p-8
               shadow-2xl shadow-black/20"
  >
    <Badge className="mb-4">Now Selling</Badge>
    <h2 className="text-3xl font-display font-bold">Paradise Gardens Estate</h2>
    <p className="text-muted-foreground mt-2">Lekki Phase 2, Lagos</p>
    
    <div className="grid grid-cols-3 gap-4 mt-6">
      <div className="text-center">
        <p className="text-2xl font-bold">150</p>
        <p className="text-sm text-muted-foreground">Units</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold">40%</p>
        <p className="text-sm text-muted-foreground">Sold</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-accent">₦85M</p>
        <p className="text-sm text-muted-foreground">From</p>
      </div>
    </div>
    
    <ArtButton className="w-full mt-6">
      Reserve Your Unit
    </ArtButton>
  </motion.div>
  
  {/* Secondary info panel */}
  <div className="col-span-3 row-span-2 col-start-6 row-start-1 
                  bg-muted rounded-2xl p-6">
    <h3 className="font-semibold">Key Features</h3>
    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
      <li className="flex items-center gap-2">
        <CheckIcon className="w-4 h-4 text-success" />
        C of O Available
      </li>
      <li className="flex items-center gap-2">
        <CheckIcon className="w-4 h-4 text-success" />
        Estate Power Supply
      </li>
      <li className="flex items-center gap-2">
        <CheckIcon className="w-4 h-4 text-success" />
        24/7 Security
      </li>
    </ul>
  </div>
</section>
```

### 5.4 White Space as Design Element

```tsx
{/* Luxury Property Description: Generous whitespace (Brodovitch) */}
<section className="py-32 px-8 md:px-12 lg:px-16">
  <div className="max-w-4xl mx-auto">
    <motion.p 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-lg md:text-xl lg:text-2xl leading-relaxed 
                 text-muted-foreground max-w-prose"
    >
      Nestled in the heart of Nigeria's most exclusive enclave, 
      this <span className="text-foreground font-medium">five-bedroom masterpiece</span> 
      offers unparalleled luxury living. The property features 
      <span className="text-foreground font-medium">floor-to-ceiling windows</span>, 
      a private cinema, infinity pool, and breathtaking lagoon views.
    </motion.p>
  </div>
</section>
```

### 5.5 Asymmetric Gallery Grid

```tsx
{/* Property Gallery: Asymmetric bento layout */}
<section className="grid grid-cols-6 gap-4 p-8">
  {/* Large feature image - 4 columns */}
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="col-span-4 row-span-2 relative aspect-[16/10] 
               rounded-2xl overflow-hidden group cursor-pointer"
  >
    <Image src={images[0]} alt="" fill className="object-cover 
           transition-transform duration-700 group-hover:scale-105" />
  </motion.div>
  
  {/* Stacked small images - 2 columns */}
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.1 }}
    className="col-span-2 relative aspect-square rounded-2xl overflow-hidden"
  >
    <Image src={images[1]} alt="" fill className="object-cover" />
  </motion.div>
  
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.2 }}
    className="col-span-2 relative aspect-square rounded-2xl overflow-hidden"
  >
    <Image src={images[2]} alt="" fill className="object-cover" />
  </motion.div>
  
  {/* Bottom row - 3 equal columns */}
  {images.slice(3, 6).map((img, i) => (
    <motion.div 
      key={i}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * (i + 3) }}
      className="col-span-2 relative aspect-[4/3] rounded-xl overflow-hidden"
    >
      <Image src={img} alt="" fill className="object-cover" />
    </motion.div>
  ))}
</section>
```

### 5.6 Shaped Images with Clip-Path

```tsx
{/* Agent Profile: Shaped portrait (Brody technique) */}
<div className="relative aspect-[4/5] overflow-hidden 
                [clip-path:polygon(0_0,100%_5%,100%_95%,0%_100%)]">
  <Image 
    src="/agent-portrait.jpg" 
    alt="Agent name" 
    fill 
    className="object-cover" 
  />
  <div className="absolute inset-0 bg-gradient-to-t 
                  from-background via-transparent to-transparent" />
</div>

{/* Diagonal cut hero image */}
<div className="relative h-screen overflow-hidden
                [clip-path:polygon(0_0,100%_0,100%_85%,0%_100%)]">
  <Image src="/hero.jpg" alt="" fill className="object-cover" />
</div>
```

---

## 6. Art-Directed shadcn/ui Extensions

### 6.1 ArtButton Component

Extend shadcn Button with art direction principles:

```tsx
// components/ui/art-button.tsx
import { Button, ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ArtButton({ className, children, ...props }: ButtonProps) {
  return (
    <Button
      className={cn(
        // Base art-directed styles
        "relative overflow-hidden group",
        "px-8 py-6 text-lg font-medium",
        "bg-gradient-to-r from-accent to-accent/80",
        "transition-all duration-500 ease-out",
        
        // Micro-interaction shadow
        "hover:shadow-[0_20px_40px_-15px_hsl(var(--accent)/0.5)]",
        "hover:translate-y-[-2px]",
        "active:translate-y-[0px]",
        
        // Gradient sweep on hover
        "before:absolute before:inset-0",
        "before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        "before:translate-x-[-200%] before:transition-transform before:duration-700",
        "hover:before:translate-x-[200%]",
        
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
}
```

### 6.2 ArtCard Component

Card with emotional presence:

```tsx
// components/ui/art-card.tsx
import { Card, CardContent, CardProps } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function ArtCard({ className, children, ...props }: CardProps) {
  return (
    <Card
      className={cn(
        // Art-directed base
        "group relative overflow-hidden border-0",
        "bg-gradient-to-b from-card to-muted/50",
        "shadow-xl shadow-black/5",
        
        // Sophisticated hover transition
        "transition-all duration-500 ease-out",
        "hover:shadow-2xl hover:shadow-accent/10",
        "hover:-translate-y-1",
        
        // Subtle accent border on hover
        "before:absolute before:inset-0 before:rounded-lg",
        "before:border-2 before:border-accent/0",
        "before:transition-all before:duration-500",
        "hover:before:border-accent/20",
        
        className
      )}
      {...props}
    >
      {children}
    </Card>
  )
}
```

### 6.3 WhatsApp CTA Variants

**Art-Directed Primary Button:**
```tsx
<ArtButton className="bg-[#25D366] hover:bg-[#128C7E]">
  <WhatsAppIcon className="mr-2 h-5 w-5" />
  Chat on WhatsApp
</ArtButton>
```

**Floating Button with Animation:**
```tsx
import { motion } from 'framer-motion'

<motion.a
  href={whatsappLink}
  initial={{ opacity: 0, x: 100 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 2, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  className="
    fixed bottom-6 right-6
    w-14 h-14 rounded-full
    bg-[#25D366]
    flex items-center justify-center
    shadow-lg
    z-50
  "
>
  <motion.div
    animate={{ scale: [1, 1.05, 1] }}
    transition={{ repeat: Infinity, duration: 2 }}
  >
    <WhatsAppIcon className="w-7 h-7 text-white" />
  </motion.div>
</motion.a>
```

### 6.4 Link Underline Animation

```tsx
{/* Sophisticated link with animated underline */}
<a className="relative inline-block group">
  <span className="relative z-10">View Gallery</span>
  <span className="
    absolute bottom-0 left-0 
    w-0 h-0.5 bg-accent 
    transition-all duration-300 ease-out
    group-hover:w-full
  " />
</a>
```

### 6.5 Gradient Text

```tsx
{/* Art-directed hero headline */}
<h1 className="
  font-display text-hero font-bold tracking-tight 
  bg-gradient-to-r from-foreground to-muted-foreground 
  bg-clip-text text-transparent
">
  5 Bedroom Mansion in Banana Island
</h1>

{/* Price with accent gradient */}
<span className="
  text-5xl font-bold
  bg-gradient-to-r from-accent via-accent/80 to-accent
  bg-clip-text text-transparent
">
  ₦850,000,000
</span>
```

---

### 6.2 Property Stats Bar

```tsx
<div className="
  flex flex-wrap justify-center gap-8
  py-6 px-4
  bg-gray-900/90 backdrop-blur-sm
  text-white
">
  <Stat icon={<NairaIcon />} value="₦85,000,000" label="Price" />
  <Stat icon={<BedIcon />} value="4" label="Bedrooms" />
  <Stat icon={<BathIcon />} value="4" label="Bathrooms" />
  <Stat icon={<AreaIcon />} value="350 sqm" label="Size" />
  <Stat icon={<CarIcon />} value="3" label="Parking" />
</div>
```

### 6.3 Nigerian Feature Badges

```tsx
const FEATURE_ICONS = {
  borehole: { icon: WaterIcon, label: 'Bore Hole' },
  generator_house: { icon: ZapIcon, label: 'Generator House' },
  bq: { icon: HomeIcon, label: 'Boys Quarters' },
  security_post: { icon: ShieldIcon, label: 'Security Post' },
  cctv: { icon: CameraIcon, label: 'CCTV Security' },
  interlocked: { icon: GridIcon, label: 'Interlocked Compound' },
  tarred_road: { icon: RoadIcon, label: 'Tarred Road Access' },
  swimming_pool: { icon: PoolIcon, label: 'Swimming Pool' },
  fitted_kitchen: { icon: ChefIcon, label: 'Fitted Kitchen' },
  pop_ceiling: { icon: LayersIcon, label: 'POP Ceiling' },
  ensuite: { icon: BathIcon, label: 'All Rooms Ensuite' },
  gated_estate: { icon: GateIcon, label: 'Gated Estate' },
};

<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {features.map((feature) => (
    <div
      key={feature}
      className="
        flex items-center gap-3 p-4
        bg-gray-50 rounded-lg
        border border-gray-100
      "
    >
      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
        {FEATURE_ICONS[feature].icon}
      </div>
      <span className="font-medium text-gray-800">
        {FEATURE_ICONS[feature].label}
      </span>
    </div>
  ))}
</div>
```

### 6.4 Land Document Status

```tsx
<div className="p-6 bg-green-50 rounded-xl border border-green-200">
  <h3 className="text-lg font-semibold text-green-900 mb-4">
    Document Status
  </h3>
  <div className="space-y-3">
    <DocumentBadge
      title="Certificate of Occupancy (C of O)"
      status="verified"
      icon={<CheckCircleIcon className="text-green-500" />}
    />
    <DocumentBadge
      title="Governor's Consent"
      status="verified"
      icon={<CheckCircleIcon className="text-green-500" />}
    />
    <DocumentBadge
      title="Survey Plan"
      status="available"
      icon={<FileIcon className="text-blue-500" />}
    />
  </div>
</div>
```

---

## 7. Responsive Behavior

### 7.1 Breakpoints

```css
/* Tailwind-aligned breakpoints */
--sm: 640px;   /* Mobile landscape */
--md: 768px;   /* Tablet portrait */
--lg: 1024px;  /* Tablet landscape / Small desktop */
--xl: 1280px;  /* Desktop */
--2xl: 1536px; /* Large desktop */
```

### 7.2 Mobile-First Patterns

```tsx
// Hero Section
<section className="
  min-h-screen
  flex flex-col          /* Mobile: Stack */
  lg:flex-row            /* Desktop: Side by side */
">
  <div className="
    w-full
    lg:w-1/2              /* Desktop: Half width */
    p-6 lg:p-12 xl:p-16
  ">
    {/* Text content */}
  </div>
  <div className="
    w-full
    lg:w-1/2
    h-64 lg:h-auto        /* Mobile: Fixed height, Desktop: Full */
  ">
    {/* Image */}
  </div>
</section>

// Gallery Grid
<div className="
  grid
  grid-cols-1            /* Mobile: Single column */
  sm:grid-cols-2         /* Tablet: 2 columns */
  lg:grid-cols-3         /* Desktop: 3 columns */
  gap-4 lg:gap-6
">
  {images.map((img) => (
    <GalleryImage key={img.id} src={img.url} />
  ))}
</div>
```

### 7.3 Touch Targets

All interactive elements meet 44x44px minimum:

```css
.touch-target {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 24px;
}

button, a {
  @apply touch-target;
}
```

---

## 8. Template Production Checklist

For each template, verify:

### Design Quality
- [ ] Follows art direction mood for category
- [ ] Typography hierarchy is clear
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Whitespace is intentional and balanced
- [ ] Images have appropriate aspect ratios

### Motion Design
- [ ] Entry animations are implemented
- [ ] Hover states work on all interactive elements
- [ ] Scroll reveal is smooth
- [ ] WhatsApp button animates correctly
- [ ] Reduced motion is respected

### Responsiveness
- [ ] Tested on iPhone SE (375px)
- [ ] Tested on iPhone 14 (390px)
- [ ] Tested on iPad (768px)
- [ ] Tested on Desktop (1280px)
- [ ] Tested on Large Desktop (1920px)

### Nigerian Requirements
- [ ] Price displays in Naira (₦) with thousands separator
- [ ] Size displays in sqm
- [ ] WhatsApp link works correctly
- [ ] All Nigerian property terms used correctly
- [ ] Features use correct Nigerian amenity names

### Performance
- [ ] Images are optimized (WebP, responsive)
- [ ] Animations use transform/opacity only
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s

---

## 9. Template File Structure

```
templates/
├── luxury/
│   ├── banana-island-villa.tsx
│   ├── ikoyi-penthouse.tsx
│   └── maitama-mansion.tsx
├── standard/
│   ├── lekki-family-home.tsx
│   ├── modern-duplex.tsx
│   └── terrace-life.tsx
├── land/
│   ├── prime-plot.tsx
│   ├── estate-land.tsx
│   └── commercial-plot.tsx
├── agent/
│   ├── the-specialist.tsx
│   ├── the-connector.tsx
│   └── the-professional.tsx
├── shortlet/
│   ├── city-escape.tsx
│   ├── business-stay.tsx
│   └── luxury-suite.tsx
├── estate/
│   ├── the-vision.tsx
│   ├── investor-focus.tsx
│   └── community-living.tsx
└── shared/
    ├── components/
    │   ├── WhatsAppButton.tsx
    │   ├── StatsBar.tsx
    │   ├── FeatureGrid.tsx
    │   ├── Gallery.tsx
    │   └── AgentCard.tsx
    ├── animations/
    │   └── index.css
    └── utils/
        ├── formatNaira.ts
        ├── formatArea.ts
        └── whatsappLink.ts
```

---

## 10. Implementation Priority

### Phase 1: Foundation (Week 1-2)
1. Animation library CSS
2. Shared components (WhatsApp, Stats, Features)
3. 3 Luxury templates
4. 2 Standard templates

### Phase 2: Expansion (Week 3-4)
5. 2 Land templates
6. 2 Agent templates
7. 2 Short-let templates
8. 1 Estate template

### Phase 3: Polish (Week 5-6)
9. Remaining templates
10. Performance optimization
11. Cross-browser testing
12. Accessibility audit

---

> **Document Owner**: Creative Director (Andy Clarke Principles)  
> **Contributors**: UI Designer, Motion Designer, Frontend Developer  
> **Status**: Ready for Implementation  
> **Quality Standard**: Aura-Level (World-Class)
