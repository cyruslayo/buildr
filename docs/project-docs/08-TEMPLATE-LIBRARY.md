# Real Estate Template Library
# Buildr — Nigerian Property Templates Catalog

> **Version**: 3.0 | **Updated**: December 8, 2024  
> **Status**: Core Product Specification (templates ARE the product)  
> **Target Market**: Nigeria 🇳🇬  
> **Design Spec**: [16-TEMPLATE-DESIGN-SPEC.md](./16-TEMPLATE-DESIGN-SPEC.md) - Andy Clarke art direction

---

## Overview

This document catalogs the template library for Nigerian real estate use cases. Each template is pre-designed with art direction and users customize via forms (not code). See [16-TEMPLATE-DESIGN-SPEC.md](./16-TEMPLATE-DESIGN-SPEC.md) for design specifications, motion design, and component details.

---

## Template Variable System

Each template accepts structured data via the wizard form. All templates implement a common variable interface:

```typescript
interface TemplateVariable {
  key: string;           // e.g., "propertyType"
  type: 'text' | 'number' | 'select' | 'multiselect' | 'image' | 'naira';
  label: string;         // Form field label
  placeholder?: string;
  options?: string[];    // For select types
  required: boolean;
  validation?: ZodSchema;
}

// Common variables across all templates
const CommonVariables: TemplateVariable[] = [
  { key: 'price', type: 'naira', label: 'Price (₦)', required: true },
  { key: 'location', type: 'text', label: 'Location', required: true },
  { key: 'whatsappNumber', type: 'text', label: 'WhatsApp Number', required: true },
  { key: 'agentName', type: 'text', label: 'Agent Name', required: false },
];

// Listing-specific variables
const ListingVariables: TemplateVariable[] = [
  ...CommonVariables,
  { key: 'beds', type: 'number', label: 'Bedrooms', required: true },
  { key: 'baths', type: 'number', label: 'Bathrooms', required: true },
  { key: 'sqm', type: 'number', label: 'Size (sqm)', required: true },
  { 
    key: 'propertyType', 
    type: 'select', 
    label: 'Property Type',
    options: ['Detached Duplex', 'Semi-Detached', 'Terrace', 'Flat', 'Penthouse'],
    required: true 
  },
  {
    key: 'features',
    type: 'multiselect',
    label: 'Features',
    options: ['Bore Hole', 'BQ', 'Generator House', 'Swimming Pool', 'Smart Home', 'CCTV'],
    required: false
  },
];
```

---

## 1. Property Listing Templates

### 1.1 Luxury Property Listing

**ID**: `tmpl_listing_luxury_ng`  
**Category**: Listing  
**Premium**: No

**Description**: High-end property showcase for luxury duplexes and mansions in premium locations (Ikoyi, Banana Island, Maitama).

**Sections**:
- Full-screen hero with property image
- Key stats bar (Price in ₦, Beds, Baths, Sqm)
- Photo gallery (lightbox)
- Property description
- Features & amenities grid (Nigerian-specific)
- Location section (Google Maps embed area)
- Agent card with WhatsApp button
- Inquiry form

**Design Notes**:
- Dark theme option with gold accents
- Serif headings for luxury feel
- Generous whitespace
- WhatsApp floating button

**Nigerian Features**:
- ₦ currency formatting
- Square meters (sqm)
- C of O / Title status display
- Estate name highlight

---

### 1.2 Standard Property Listing

**ID**: `tmpl_listing_standard_ng`  
**Category**: Listing  
**Premium**: No

**Description**: Clean, professional property page for typical residential listings—duplexes, flats, and terraces.

**Sections**:
- Hero with image carousel
- Stats row (₦ price, beds, baths, sqm)
- Property type badge (Duplex, Flat, Terrace)
- Description
- Features list with icons
- Photo grid
- WhatsApp CTA button
- Contact form

**Nigerian Features**:
- Property type selector (Duplex, Flat, Terrace, Bungalow)
- Estate/location badge
- Furnished/Unfurnished toggle
- Inspection booking CTA

---

### 1.3 Flat/Apartment Listing

**ID**: `tmpl_listing_flat_ng`  
**Category**: Listing  
**Premium**: No

**Description**: Optimized for apartment listings—1BR, 2BR, 3BR flats in residential blocks.

**Sections**:
- Hero image with floor badge
- Apartment specs (BR, Bath, Sqm, Floor)
- Building amenities section
- Unit features
- Price display (Sale/Rent toggle)
- WhatsApp inquiry button
- Similar units in building

**Nigerian Features**:
- Service charge display
- Estate/block name
- Generator & water info
- Parking slots

---

### 1.4 Duplex Showcase

**ID**: `tmpl_listing_duplex_ng`  
**Category**: Listing  
**Premium**: No

**Description**: Dedicated template for duplex properties—the most popular housing type in Nigerian real estate.

**Sections**:
- Full-width property hero
- Duplex type badge (Detached, Semi-Detached, Terrace)
- Stats bar (Beds, Baths, Sqm, BQ)
- Per-floor breakdown
- Compound features (Parking, Garden, Gate)
- Interior gallery
- Agent/WhatsApp section

**Nigerian Amenities Highlighted**:
- Boys Quarters (BQ)
- Generator house
- Bore hole
- Security post
- Perimeter fencing
- Interlocked compound

---

## 2. Land Sale Templates

### 2.1 Plot of Land

**ID**: `tmpl_land_plot_ng`  
**Category**: Land  
**Premium**: No

**Description**: Marketing page for individual land plots—the most searched property type in Nigeria.

**Sections**:
- Land hero with aerial/site image
- Plot specs (Size in Sqm, Price per Sqm, Total Price)
- Document status section (C of O, Survey, etc.)
- Location advantages
- Nearby landmarks
- Investment highlights
- WhatsApp inquiry
- Document download buttons

**Document Status Options**:
- C of O (Certificate of Occupancy)
- Governor's Consent
- Survey Plan
- Deed of Assignment
- Excision
- Gazette

**Measurements**:
- Square meters (sqm)
- Hectares for large plots
- Plot dimensions (e.g., 30m x 40m)

---

### 2.2 Estate Land (Multiple Plots)

**ID**: `tmpl_land_estate_ng`  
**Category**: Land  
**Premium**: Yes

**Description**: Marketing for estate land with multiple plots available.

**Sections**:
- Estate hero with masterplan image
- Available plots grid
- Price table by plot size
- Document status
- Estate amenities (Road, Drainage, Power)
- Location map
- Payment plan options
- Bulk inquiry form

---

## 3. Estate/Development Templates

### 3.1 Off-Plan Estate Marketing

**ID**: `tmpl_estate_offplan_ng`  
**Category**: Development  
**Premium**: Yes

**Description**: Pre-construction marketing for new estate developments—very popular in Lagos and Abuja.

**Sections**:
- Dramatic 3D render hero
- Project overview
- Unit types grid (1BR, 2BR, 3BR, Duplex)
- Floor plan gallery
- Estate amenities
- Location & accessibility
- Payment plan calculator
- Registration/EOI form
- Developer profile

**Payment Plan Section**:
- Initial deposit
- Monthly installments
- Outright payment discount
- Mortgage partner info

**Nigerian-Specific**:
- Estate infrastructure (Power, Water, Security, Road)
- Delivery timeline
- Title document info
- Bank/mortgage partners

---

### 3.2 Completed Estate Showcase

**ID**: `tmpl_estate_completed_ng`  
**Category**: Development  
**Premium**: No

**Description**: Marketing for completed and nearly-sold estates with available units.

**Sections**:
- Actual photos hero (not renders)
- Available units
- Estate tour gallery
- Resident testimonials
- Amenities showcase
- Available financing
- Viewing booking

---

### 3.3 Smart City / Mega Development

**ID**: `tmpl_estate_megacity_ng`  
**Category**: Development  
**Premium**: Yes

**Description**: For large-scale developments like Eko Atlantic, Alaro City, Lakowe Lakes.

**Sections**:
- Video hero / aerial view
- Vision & masterplan
- District breakdown
- Investment opportunity
- Partnership information
- News/updates section
- Virtual tour embed

---

## 4. Agent/Team Templates

### 4.1 Agent Bio Page

**ID**: `tmpl_agent_bio_ng`  
**Category**: Agent  
**Premium**: No

**Description**: Professional Nigerian agent profile with credentials and WhatsApp contact.

**Sections**:
- Hero with professional photo
- About / Bio story
- Areas of expertise
- Specializations
- Certifications (NIESV, REDAN, etc.)
- Active listings showcase
- Client testimonials
- WhatsApp prominent CTA
- Social links (Instagram, LinkedIn)

**Nigerian Credentials**:
- NIESV (Nigerian Institution of Estate Surveyors and Valuers)
- REDAN (Real Estate Developers Association of Nigeria)
- AREF (Association of Real Estate Firms)
- Estate Surveyor License

---

### 4.2 Team/Agency Page

**ID**: `tmpl_agent_team_ng`  
**Category**: Agent  
**Premium**: No

**Description**: Showcase entire agency team for established firms.

**Sections**:
- Agency hero
- Our story
- Team member grid
- Coverage areas
- Featured listings
- Client testimonials
- Office locations
- Contact form + WhatsApp

---

## 5. Short-Let/Rental Templates

### 5.1 Short-Let Apartment

**ID**: `tmpl_shortlet_standard_ng`  
**Category**: Short-Let  
**Premium**: No

**Description**: Booking inquiry page for furnished short-stay apartments—very popular in VI, Lekki, Ikeja.

**Sections**:
- Apartment hero gallery
- Quick specs (Beds, Baths, Max guests)
- Pricing table (Per night, Weekly, Monthly rates)
- Amenities grid (WiFi, AC, Kitchen, Netflix, etc.)
- House rules
- Location (neighborhood highlights)
- Availability calendar placeholder
- Booking inquiry form (WhatsApp)
- Host info

**Pricing Options**:
- Per night (₦50,000/night)
- Weekly rate (₦300,000/week)
- Monthly rate (₦1,000,000/month)

---

### 5.2 Luxury Short-Let Villa

**ID**: `tmpl_shortlet_luxury_ng`  
**Category**: Short-Let  
**Premium**: Yes

**Description**: Premium short-let for high-end apartments, penthouses, and villas.

**Sections**:
- Full-screen video/gallery hero
- Suite descriptions
- Concierge services
- Included amenities
- What's nearby
- Booking process
- WhatsApp Butler service

---

### 5.3 Corporate Housing

**ID**: `tmpl_shortlet_corporate_ng`  
**Category**: Short-Let  
**Premium**: No

**Description**: For expat housing and corporate apartment leases.

**Sections**:
- Professional apartment imagery
- Corporate amenities
- Lease terms (3-month, 6-month, 1-year)
- Location to business districts
- Company billing info
- Viewing request

---

## 6. Event Templates

### 6.1 Property Inspection

**ID**: `tmpl_event_inspection_ng`  
**Category**: Event  
**Premium**: No

**Description**: Book property inspections—the Nigerian version of open house.

**Sections**:
- Property preview hero
- Inspection date/time options
- Property highlights
- What to expect
- RSVP form
- Agent contact (WhatsApp)
- Directions/Map

---

### 6.2 Estate Launch Event

**ID**: `tmpl_event_launch_ng`  
**Category**: Event  
**Premium**: Yes

**Description**: Marketing page for estate launch events and developer showcases.

**Sections**:
- Event hero with countdown
- Project preview
- What's happening
- Exclusive launch pricing
- RSVP registration
- Location & directions
- Sponsor logos

---

## 7. Company Templates

### 7.1 About Agency

**ID**: `tmpl_company_about_ng`  
**Category**: Company  
**Premium**: No

**Description**: Company overview for real estate firms and developers.

**Sections**:
- Agency hero
- Our story / history
- Mission & values
- Leadership team
- Awards & recognition
- Coverage areas (Lagos, Abuja, etc.)
- Office locations
- Contact + WhatsApp

---

### 7.2 Seller Services

**ID**: `tmpl_company_sellers_ng`  
**Category**: Company  
**Premium**: No

**Description**: Landing page for seller lead generation.

**Sections**:
- "Sell Your Property" hero
- Why list with us
- Our selling process
- Success stories
- Free valuation form
- Market stats

---

### 7.3 Buyer Services

**ID**: `tmpl_company_buyers_ng`  
**Category**: Company  
**Premium**: No

**Description**: Landing page for buyer lead generation.

**Sections**:
- "Find Your Dream Home" hero
- How we help buyers
- Featured properties
- Search by area
- Buyer inquiry form
- Testimonials

---

## 8. Location Templates

### 8.1 Area Guide

**ID**: `tmpl_location_guide_ng`  
**Category**: Location  
**Premium**: No

**Description**: Neighborhood marketing for specific areas (Lekki Guide, Maitama Guide).

**Sections**:
- Area lifestyle hero
- Why live here
- Local amenities (Schools, Hospitals, Malls)
- Property price ranges
- Featured listings in area
- Transportation access
- Agent expertise in area

**Popular Areas**:
- Lagos: Lekki, Ikoyi, VI, Ajah, Ikeja, Magodo
- Abuja: Maitama, Asokoro, Wuse, Jabi, Gwarimpa
- PH: GRA, Trans Amadi

---

## Template Structure (Technical)

> **Reference**: TemplateCategory aligns with PageType from [10-PROMPT-ENGINEERING.md](./10-PROMPT-ENGINEERING.md)

```typescript
interface Template {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  code: string;           // Full React component code
  thumbnailUrl: string;
  previewUrl: string;
  isPremium: boolean;
  tags: string[];
  variables: TemplateVariable[];
  nigeriaSpecific: boolean;
  // Prompt engineering integration
  systemPromptOverride?: string;  // Optional override for specific template
  requiredSections: string[];     // Sections this template must include
}

// ALIGNED WITH PageType (see 10-PROMPT-ENGINEERING.md)
type TemplateCategory = 
  | 'listing'      // Property listing (duplex, flat, terrace)
  | 'land'         // Land/plot sale
  | 'agent'        // Agent bio/profile
  | 'shortlet'     // Short-let apartment
  | 'estate'       // Off-plan/estate development (was: development)
  | 'inspection'   // Property inspection booking (was: event)
  | 'agency';      // Agency about page (was: company)

// Note: 'location' templates now fall under 'listing' with area-guide tag

interface TemplateVariable {
  key: string;
  label: string;
  type: 'text' | 'number' | 'image' | 'color' | 'currency' | 'phone' | 'naira' | 'sqm';
  defaultValue: string;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}
```


---

## Nigerian Property Features Data

```typescript
const NIGERIA_PROPERTY_FEATURES = [
  // Water & Power
  { id: 'borehole', label: 'Bore Hole', icon: 'droplet' },
  { id: 'generator', label: 'Generator House', icon: 'zap' },
  { id: 'solar', label: 'Solar Panels', icon: 'sun' },
  { id: 'inverter', label: 'Inverter System', icon: 'battery' },
  { id: 'prepaid_meter', label: 'Prepaid Meter', icon: 'gauge' },
  
  // Security
  { id: 'security_post', label: 'Security Post', icon: 'shield' },
  { id: 'cctv', label: 'CCTV Security', icon: 'video' },
  { id: 'perimeter_fence', label: 'Perimeter Fencing', icon: 'fence' },
  { id: 'gated', label: 'Gated Estate', icon: 'gate' },
  { id: 'electric_fence', label: 'Electric Fence', icon: 'zap' },
  
  // Compound
  { id: 'bq', label: 'Boys Quarters (BQ)', icon: 'home' },
  { id: 'parking', label: 'Parking Space', icon: 'car' },
  { id: 'garage', label: 'Garage', icon: 'warehouse' },
  { id: 'interlocked', label: 'Interlocked Compound', icon: 'grid' },
  { id: 'garden', label: 'Garden', icon: 'flower' },
  
  // Interior
  { id: 'fitted_kitchen', label: 'Fitted Kitchen', icon: 'chef-hat' },
  { id: 'pop_ceiling', label: 'POP Ceiling', icon: 'square' },
  { id: 'ensuite', label: 'All Rooms Ensuite', icon: 'bath' },
  { id: 'walk_in_closet', label: 'Walk-in Closet', icon: 'shirt' },
  { id: 'ac', label: 'Air Conditioning', icon: 'wind' },
  
  // Recreation
  { id: 'pool', label: 'Swimming Pool', icon: 'waves' },
  { id: 'gym', label: 'Gym', icon: 'dumbbell' },
  { id: 'rooftop', label: 'Rooftop Terrace', icon: 'sun' },
  
  // Access
  { id: 'tarred_road', label: 'Tarred Road Access', icon: 'road' },
  { id: 'easy_access', label: 'Easy Access', icon: 'map-pin' },
];
```

---

## Implementation Priority

| Phase | Templates |
|-------|-----------|
| **MVP** | Standard Listing, Duplex Showcase, Plot of Land, Agent Bio, Short-Let, Inspection Event, About Agency |
| **Post-MVP** | Luxury Listing, Flat Listing, Estate Land, Off-Plan Estate, Team Page |
| **Premium Phase** | All premium templates (Mega Development, Luxury Short-Let, Estate Launch) |

---

> **Related**: [PRD](./01-PRD.md) | [Design System](./03-DESIGN-SYSTEM.md) | [Guided Prompt Flow](./09-GUIDED-PROMPT-FLOW.md)
