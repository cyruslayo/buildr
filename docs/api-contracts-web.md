# API Contracts - Web

## Overview
- **Base URL:** `/api`
- **Authentication:** Session-based (NextAuth.js) via `auth()` helper. Returns 401 if valid session is not present.
- **Validation:** Zod schemas for all request bodies. Returns 400 with details on failure.
- **Error Handling:** Standardized error responses (500 for internal errors).

## Common Patterns

### Request Validation
All POST/PUT requests use Zod schemas defined in the route file.
```typescript
const CreateProjectSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  pageType: z.string().min(1, 'Page type is required'),
  code: z.string().optional().default('<html></html>'),
});
```

### Standard Response Format
JSON responses are used exclusively.
- **Success:** Returns resource data or 201 Created.
- **List:** Returns `{ [resource]: [], total, page, limit, totalPages }`.
- **Error:** Returns `{ error: string, details?: any }`.

## Endpoints Catalog

### Projects (`/api/projects`)
- **GET /api/projects**: List user's projects. Paginated.
- **POST /api/projects**: Create new project. Requires `name`, `pageType`.

### Other Domains Detected
- **Auth**: `/api/auth` (NextAuth handlers)
- **Export**: `/api/export` (Project export functionality)
- **Generate**: `/api/generate` (AI generation endpoints)
- **Leads**: `/api/leads` (Lead capture management)
- **Payments**: `/api/payments` (Payment processing)
- **Render**: `/api/render` (Preview rendering)
- **Templates**: `/api/templates` (Template management)
- **Usage**: `/api/usage` (Usage limits/tracking)
