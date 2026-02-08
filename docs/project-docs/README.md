# Buildr Documentation

> **Template-Based Landing Page Builder for Nigerian Real Estate**  
> **Approach**: Template-Only (non-technical users, form-based customization)

Welcome to the Buildr documentation suite. These documents provide everything your development team needs to build Buildr, a template-based landing page builder specifically designed for Nigerian real estate agencies. Users select templates and fill forms—no coding required.

---

## 📚 Documentation Index

| # | Document | Description |
|---|----------|-------------|
| 1 | [**Product Requirements (PRD)**](./01-PRD.md) | Vision, user stories, features, success metrics |
| 2 | [**Technical Specification**](./02-TECHNICAL-SPEC.md) | Architecture, stack, APIs, database schema |
| 3 | [**Design System**](./03-DESIGN-SYSTEM.md) | Colors, typography, components, **Nigerian patterns** |
| 4 | [**User Personas**](./04-USER-PERSONAS.md) | Nigerian target users, journey maps |
| 5 | [**API Reference**](./05-API-REFERENCE.md) | Endpoints including **/api/render** for templates |
| 6 | [**Testing Strategy**](./06-TESTING-STRATEGY.md) | **Template rendering tests**, form validation |
| 7 | [**Project Roadmap**](./07-ROADMAP.md) | Phased timeline, template development tasks |
| 8 | [**Template Library**](./08-TEMPLATE-LIBRARY.md) | Nigerian real estate templates + variable system |
| 9 | [**Guided Prompt Flow**](./09-GUIDED-PROMPT-FLOW.md) | Original wizard design (prompt-based) |
| 10 | [**Prompt Engineering**](./10-PROMPT-ENGINEERING.md) | AI content enhancement for templates |
| 11 | [**Alignment Checklist**](./11-ALIGNMENT-CHECKLIST.md) | Documentation alignment status |
| 12 | [**Implementation Tickets**](./12-IMPLEMENTATION-TICKETS.md) | **TDD dev tickets** including wizard UI 🎫 |
| 13 | [**Deployment Analysis**](./13-DEPLOYMENT-ANALYSIS.md) | Vercel vs Cloudflare TCO study 💰 |
| 14 | [**Reference Alignment**](./14-REFERENCE-ALIGNMENT.md) | Aura methodology compliance 🎨 |
| 15 | [**Template Migration**](./15-TEMPLATE-MIGRATION-ANALYSIS.md) | Code-First → Template-Only migration ✅ |
| 16 | [**Template Design Spec**](./16-TEMPLATE-DESIGN-SPEC.md) | **Premium templates** — Andy Clarke art direction ✨ |
| 17 | [**Wizard UI Spec**](./17-WIZARD-UI-SPEC.md) | **4-step wizard** — forms, validation, state 🧙 |


## 🎯 Quick Start for Development

### Phase 1 Focus (Weeks 1-2)
1. Read the [PRD](./01-PRD.md) for product vision
2. Review [Technical Spec](./02-TECHNICAL-SPEC.md) for architecture
3. Follow [Roadmap](./07-ROADMAP.md) Phase 1 tasks

### Key Technology Decisions
- **Framework**: Next.js 14+ with App Router
- **Forms**: React Hook Form + Zod validation
- **Animation**: Framer Motion (Aura-level quality)
- **Components**: shadcn/ui + Tailwind CSS (art-directed)
- **Preview**: Iframe-based template preview
- **Database**: PostgreSQL with Prisma
- **Design**: Andy Clarke art direction (see [16-TEMPLATE-DESIGN-SPEC](./16-TEMPLATE-DESIGN-SPEC.md))

---

## 🏠 Target Market: Real Estate

Buildr is designed specifically for:
- Real estate agency marketing teams
- Individual agents needing personal branding
- Property developers marketing new developments
- Brokerages seeking scalable solutions

See [User Personas](./04-USER-PERSONAS.md) for detailed profiles.

---

## 📂 Related Resources

- **Architecture Research**: [`../research/llm-page-builder-architecture.md`](../research/llm-page-builder-architecture.md)

---

## ✅ MVP Success Criteria

| Metric | Target |
|--------|--------|
| Generation success rate | > 95% |
| Time to first preview | < 3 seconds |
| Full generation time | < 30 seconds |
| Beta user satisfaction | > 4/5 |

---

> **Last Updated**: December 8, 2024  
> **Status**: Ready for Development
