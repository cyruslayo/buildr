# Product Requirements Document (PRD)
# Buildr — AI-Powered Template Builder for Nigerian Real Estate

> **Version**: 3.0  
> **Last Updated**: December 8, 2024  
> **Status**: Updated for Template-Only Approach  
> **Target Market**: Nigeria 🇳🇬  
> **Target Users**: Non-technical real estate professionals

---

## 1. Executive Summary

**Buildr** is an AI-powered landing page builder specifically designed for real estate agencies in Nigeria. Using natural language prompts, Nigerian real estate professionals can create stunning, conversion-optimized landing pages in minutes—without any coding or design expertise.

### Vision Statement

> "Empower every Nigerian real estate agency to create professional, high-converting landing pages through the power of AI—faster and more affordably than ever before."

### Key Value Propositions

| Value | Description |
|-------|-------------|
| **Speed** | Create complete landing pages in under 5 minutes |
| **No Technical Skills Required** | No coding, no design—just fill in the details and choose a template |
| **Nigeria-Specific** | 20+ templates designed for Nigerian real estate, property types, and design patterns |
| **Cost-Effective** | Eliminate designer/developer costs at a fraction of the price |
| **Premium Design** | Aura-level quality templates with Andy Clarke art direction |
| **WhatsApp Integration** | Built-in "Chat on WhatsApp" for Nigerian market preferences |

---

## 2. Problem Statement

### Market Challenge

Nigerian real estate agencies face significant challenges when creating landing pages:

1. **High Costs**: Hiring designers and developers for each listing or campaign (₦150,000–₦500,000 per page)
2. **Time Delays**: Waiting days or weeks for page development
3. **Technical Barriers**: Most agents lack web development skills
4. **Inconsistent Quality**: DIY tools produce amateurish results
5. **No Local Templates**: Existing builders don't understand Nigerian property types (duplexes, flats, land)
6. **WhatsApp Disconnect**: Most builders don't integrate with WhatsApp, Nigeria's primary communication channel

### Current Solutions & Gaps

| Solution | Limitation |
|----------|------------|
| **Freelance Designers** | Expensive (₦100,000–₦300,000), inconsistent quality |
| **Drag-and-Drop Builders** | Steep learning curve, no Nigerian templates |
| **Social Media Only** | Limited professionalism, no lead capture |
| **Property Portals** | Generic listings, no brand differentiation |
| **DIY Coding** | Requires technical expertise most agents lack |

### Our Solution

Buildr uses generative AI to transform a simple natural language description into a fully functional, beautifully designed landing page—specifically optimized for Nigerian real estate use cases, with Naira pricing, local property types, and WhatsApp integration.

---

## 3. Target Users

### Primary Persona: Nigerian Real Estate Agency Marketing Manager

| Attribute | Description |
|-----------|-------------|
| **Name** | Chibuzo Okeke |
| **Role** | Marketing Manager at a mid-size Lagos agency (10-30 agents) |
| **Age** | 28-40 |
| **Location** | Lagos, Nigeria (Lekki/Victoria Island) |
| **Technical Proficiency** | Comfortable with Canva, Instagram, basic tools |
| **Goals** | Create landing pages quickly for new listings and estates |
| **Pain Points** | Budget constraints, time pressure, lack of design resources |
| **Budget** | ₦20,000–₦50,000/month for marketing tools |
| **Success Metric** | WhatsApp inquiries and lead form submissions |

### Secondary Personas

1. **Solo Real Estate Agent (Fatima Bello)**
   - Independent agent based in Abuja
   - Needs personal branding pages and property listings
   - Limited budget (< ₦15,000/month), values simplicity
   - Primary lead channel: WhatsApp

2. **Property Developer Marketing Team (Emeka Okonkwo)**
   - Marketing Manager at Lekki development company
   - Creates pages for off-plan estates and pre-sales
   - Higher volume requirements, enterprise features
   - Budget: ₦100,000+/month

3. **Short-Let/Airbnb Operator (Ngozi Eze)**
   - Manages short-let apartments in Lagos
   - Needs booking inquiry pages
   - WhatsApp and Instagram focused

---

## 4. Product Scope

### In Scope (MVP - Version 1.0)

#### Core Features

| Feature | Description | Priority |
|---------|-------------|----------|
| **Template Gallery** | 20+ professionally designed Nigerian real estate templates | P0 |
| **Form-Based Customization** | Easy dropdowns, text fields, and image uploads | P0 |
| **Live Preview** | Real-time preview of your customized template | P0 |
| **AI Content Enhancement** | AI improves property descriptions and headlines | P1 |
| **One-Click Export** | Export as static HTML or publish directly | P0 |
| **Style Presets** | Pre-designed color and typography combinations | P1 |
| **WhatsApp Integration** | "Chat on WhatsApp" CTA buttons | P0 |
| **Mobile Responsiveness** | All templates optimized for mobile devices | P0 |

#### Nigeria-Specific Features

| Feature | Description | Priority |
|---------|-------------|----------|
| **Property Listing Pages** | Duplexes, flats, terraces, land, estates | P0 |
| **Land Sale Pages** | Plot marketing with C of O, survey info | P0 |
| **Estate/Off-Plan Pages** | Pre-construction development marketing | P0 |
| **Short-Let Pages** | Apartment booking inquiry pages | P1 |
| **Agent Bio Pages** | Professional agent profile pages | P1 |
| **Inspection Booking** | Schedule property viewings | P0 |
| **WhatsApp Lead Capture** | Direct WhatsApp click-to-chat | P0 |
| **Naira Pricing Display** | ₦ currency formatting | P0 |
| **Nigerian Locations** | Lagos, Abuja, PH areas pre-loaded | P0 |

### Nigerian Property Types Supported

| Type | Description |
|------|-------------|
| **Detached Duplex** | Standalone 4-5 bedroom homes |
| **Semi-Detached Duplex** | Shared-wall duplexes |
| **Terrace Duplex** | Row of connected duplexes |
| **Flat (1-3BR)** | Apartment units |
| **Self-Contain** | Single room with bathroom |
| **Bungalow** | Single-story homes |
| **Mansion** | Luxury high-end properties |
| **Plot of Land** | Empty plots for sale |
| **Commercial Property** | Shops, offices, warehouses |
| **Short-Let Apartment** | Furnished rentals |

### Nigerian Amenities/Features

- Bore Hole water
- Generator House
- Boys Quarters (BQ)
- Security Post / Gate House
- Perimeter Fencing
- CCTV Security
- Interlocked Compound
- Tarred Road Access
- Estate Living
- Swimming Pool
- Fitted Kitchen
- POP Ceiling
- Ensuite Rooms

### Out of Scope (Template-Only Approach)

| Feature | Reason |
|---------|--------|
| Code editing or viewing | Non-technical users |
| Custom component generation | Template-only approach |
| Full CMS functionality | Future version |
| E-commerce/payment processing | Future version |
| Team collaboration features | Future version |
| White-label reselling | Future version |
| Multi-language support (Yoruba, Igbo, Hausa) | Future version |
| A/B testing | Future version |

---

## 5. User Stories & Requirements

### Epic 1: Template-Based Page Creation

#### US-1.1: Select and Customize Template
> **As a** Nigerian real estate marketer  
> **I want to** choose from professionally designed templates and fill in my property details  
> **So that** I can create a professional page without technical skills

**Acceptance Criteria:**
- User can browse 20+ template options
- Templates are categorized by property type
- User fills out a simple form (not code)
- Generated page matches Nigerian real estate context
- Page includes WhatsApp CTA by default

#### US-1.2: Nigerian Property Context
> **As a** user  
> **I want to** specify Nigerian property types and locations  
> **So that** the page matches local market expectations

**Acceptance Criteria:**
- Property type dropdown includes Nigerian options
- Location autocomplete for Nigerian areas (Lekki, Ikoyi, Maitama, etc.)
- Pricing displayed in Naira (₦)
- Measurements in square meters (sqm)

### Epic 2: Templates

#### US-2.1: Nigerian Template Categories

| Category | Example Use Cases |
|----------|------------------|
| Property Listings | Duplex, flat, terrace showcase |
| Land Sales | Plot marketing, estate land |
| Estate Marketing | Off-plan developments, new estates |
| Short-Let | Airbnb-style apartment pages |
| Agent Profiles | Bio pages with WhatsApp |
| Company About | Agency overview |

### Epic 3: Lead Capture

#### US-3.1: WhatsApp Integration
> **As a** user  
> **I want to** add WhatsApp click-to-chat buttons  
> **So that** leads can contact me instantly

**Acceptance Criteria:**
- WhatsApp button with pre-filled message
- Phone number configurable
- Floating WhatsApp widget option
- Tracks click conversions

---

## 6. Success Metrics (KPIs)

### Product Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Generation Success Rate** | > 95% | Valid pages per attempt |
| **Time to First Preview** | < 3 seconds | Performance monitoring |
| **Average Generation Time** | < 30 seconds | Full page completion |
| **WhatsApp Clicks** | Track all | Conversion metric |
| **Export Completion Rate** | > 80% | Pages that get exported |

### Business Metrics

| Metric | Target (Year 1) | Notes |
|--------|-----------------|-------|
| **Monthly Active Users** | 2,000+ | Nigerian agencies |
| **Pages Generated/Month** | 10,000+ | Including iterations |
| **Paid Conversion Rate** | 8%+ | Free to paid |
| **NPS Score** | 50+ | User satisfaction |
| **Monthly Recurring Revenue** | ₦5,000,000+ | By end of Year 1 |

---

## 7. Business Model

### Pricing Tiers (Nigerian Market)

| Tier | Price | Features |
|------|-------|----------|
| **Free** | ₦0/month | 3 pages/month, watermark, basic templates |
| **Starter** | ₦5,000/month (~$6) | 15 pages/month, no watermark, all templates |
| **Pro** | ₦15,000/month (~$18) | 50 pages/month, brand kit, priority generation |
| **Agency** | ₦50,000/month (~$60) | Unlimited pages, team seats (5), API access |
| **Enterprise** | Custom | Custom limits, dedicated support, white-label |

### Payment Methods

| Method | Integration |
|--------|-------------|
| **Paystack** | Primary payment gateway |
| **Flutterwave** | Secondary payment gateway |
| **Bank Transfer** | Manual verification |
| **USSD** | For non-card users |

### Revenue Streams

1. **Subscription Revenue** (Primary)
2. **Overage Charges** (Additional page generations)
3. **Premium Templates** (One-time purchases)
4. **Enterprise Contracts** (Annual agreements)

---

## 8. Technical Requirements

### Performance Requirements

| Metric | Requirement |
|--------|-------------|
| Time to First Token | < 500ms |
| Full Page Generation | < 30 seconds |
| Preview Render Time | < 1 second |
| Page Load Speed | < 2 seconds (exported) |
| Uptime | 99.9% |

### Nigeria-Specific Technical Requirements

| Requirement | Solution |
|-------------|----------|
| Low bandwidth optimization | Lazy loading, compressed assets |
| WhatsApp API integration | wa.me links + WhatsApp Business API |
| Paystack integration | Payment processing |
| Nigerian CDN | Cloudflare edge servers in Lagos |
| Mobile-first design | 80%+ Nigerian users on mobile |

### Browser Support

| Browser | Minimum Version |
|---------|-----------------|
| Chrome (Android) | 90+ |
| Safari (iOS) | 14+ |
| Chrome (Desktop) | 90+ |
| Firefox | 88+ |
| Opera Mini | Latest |

---

## 9. Release Timeline

### Phase 1: MVP Launch (Weeks 1-8)

**Goal**: Functional product for Nigerian real estate market

| Week | Milestone |
|------|-----------|
| 1-2 | Foundation (Next.js, AI integration, basic UI) |
| 3-4 | Core Features (Preview, editor, Nigerian templates) |
| 5-6 | Nigeria Features (WhatsApp, Paystack, Naira) |
| 7-8 | Testing & Beta (Lagos agencies) |

### Phase 2: Market Fit (Months 3-6)

- User feedback integration
- Template library expansion (20+ Nigerian templates)
- Abuja and Port Harcourt market expansion
- Property portal integrations

### Phase 3: Scale (Months 6-12)

- Team collaboration
- API for integrations
- CRM webhooks
- Advanced customization
- Ghana/Kenya expansion consideration

---

## 10. Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| AI generates non-Nigerian content | High | Medium | Domain-specific prompts, validation |
| Paystack integration issues | High | Low | Flutterwave fallback |
| Low internet penetration | Medium | High | Mobile-first, low-bandwidth optimization |
| Competitive pressure | Medium | Medium | Nigeria-first focus, WhatsApp integration |
| Currency fluctuation | Medium | High | Monthly pricing reviews |

---

## 11. Appendix

### Competitive Landscape (Nigeria)

| Competitor | Type | Strength | Weakness |
|------------|------|----------|----------|
| **Nigeria Property Centre** | Portal | Established | No custom pages |
| **PropertyPro** | Portal | Good traffic | Generic listings |
| **Jiji** | Classifieds | Popular | Low quality |
| **Canva** | Design | Easy to use | Not landing pages |
| **Wix/Squarespace** | Builders | Powerful | No Nigeria focus |

### Nigerian Real Estate Terminology

| Term | Definition |
|------|------------|
| **C of O** | Certificate of Occupancy (land title) |
| **Governor's Consent** | State approval for land transfer |
| **Survey** | Land survey document |
| **Deed of Assignment** | Property transfer document |
| **BQ** | Boys Quarters (staff accommodation) |
| **Self-Contain** | Single room with private bathroom |
| **Off-Plan** | Property sold before construction |
| **Short-Let** | Short-term furnished rental |

### Key Nigerian Locations

| City | Popular Areas |
|------|---------------|
| **Lagos** | Lekki, Ikoyi, Victoria Island, Ajah, Ikeja, Surulere, Yaba, Magodo |
| **Abuja** | Maitama, Asokoro, Wuse, Gwarimpa, Jabi, Katampe, Life Camp |
| **Port Harcourt** | GRA, Trans Amadi, Rumuola, Eliozu |
| **Ibadan** | Bodija, UI Area, Jericho, Ring Road |

---

> **Document Owner**: Product Team  
> **Stakeholders**: Engineering, Design, Marketing, Sales  
> **Review Cycle**: Bi-weekly during development
