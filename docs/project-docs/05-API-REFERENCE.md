# API Reference Documentation (Extended)
# Buildr API v1.0

> **Base URL**: `https://api.buildr.app/v1`  
> **Authentication**: Bearer token in `Authorization` header  
> **Content-Type**: `application/json`  
> **Approach**: Template-Only (render endpoints, not code generation)

---

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Core Endpoints](#core-endpoints)
4. [Template Management](#template-management)
5. [Project Management](#project-management)
6. [Error Handling](#error-handling)
7. [Webhooks](#webhooks)
8. [SDKs](#sdks)
9. [Code Examples](#code-examples)

---

## Overview

The Buildr API enables programmatic access to template-based landing page creation, designed specifically for Nigerian real estate applications. Users select templates and provide property data via forms—no code generation or editing.

### Target Market: Nigeria 🇳🇬

| Feature | Support |
|---------|---------|
| **Currency** | Nigerian Naira (₦) - default |
| **Measurements** | Square meters (sqm) |
| **WhatsApp** | Click-to-chat integration built-in |
| **Locations** | Nigerian cities/areas autocomplete |
| **Property Types** | Nigerian types (duplex, flat, terrace, land) |

### API Versioning

The API uses URL-based versioning. The current version is `v1`.

```
https://api.buildr.app/v1/{endpoint}
```

### Base Response Format

All successful API responses follow this structure:

```json
{
  "success": true,
  "data": { /* response data */ },
  "meta": {
    "requestId": "req_abc123xyz",
    "timestamp": "2024-12-08T14:30:00Z"
  }
}
```

### Rate Limits

| Tier | Requests/Hour | Tokens/Day | Concurrent Requests |
|------|---------------|------------|---------------------|
| Free | 5 | 10,000 | 1 |
| Pro | 50 | 100,000 | 3 |
| Agency | 200 | 500,000 | 10 |
| Enterprise | Custom | Custom | Custom |

Rate limit headers are included in every response:

```
X-RateLimit-Limit: 50
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1702048800
```

---

## Authentication

### API Key Generation

1. Log in to your Buildr dashboard
2. Navigate to Settings → API Keys
3. Click "Create New API Key"
4. Store the key securely (it's only shown once)

### Using API Keys

Include your API key in the `Authorization` header:

```bash
curl -H "Authorization: Bearer sk_live_abc123xyz..." \
     https://api.buildr.app/v1/generate
```

### API Key Types

| Type | Prefix | Use Case |
|------|--------|----------|
| **Test** | `sk_test_` | Development and testing |
| **Live** | `sk_live_` | Production use |

---

## Core Endpoints

### 1. Generate Landing Page

**Endpoint**: `POST /generate`

Creates a landing page from a natural language prompt. Supports both streaming and non-streaming responses.

#### Request Body

```typescript
{
  "prompt": string,              // Required. 10-2000 chars
  "pageType": PageType,          // Required
  "templateId"?: string,         // Optional. Start from template
  "brandSettings"?: BrandSettings,
  "context"?: Message[],         // For iterative refinement
  "stream"?: boolean,            // Default: true
  "options"?: GenerationOptions
}
```

#### Types (Nigeria-Aligned)

```typescript
// PageType - CANONICAL (matches 10-PROMPT-ENGINEERING.md)
type PageType = 
  | "listing"      // Property listing (duplex, flat, terrace)
  | "land"         // Land/plot sale with document status
  | "agent"        // Agent bio/profile with NIESV/REDAN
  | "shortlet"     // Short-let apartment booking
  | "estate"       // Off-plan/estate development
  | "inspection"   // Property inspection booking
  | "agency";      // Agency about page

interface BrandSettings {
  primaryColor: string;    // Hex color
  secondaryColor: string;  // Hex color
  accentColor: string;     // Hex color
  fontFamily: string;      // Font name
  logoUrl?: string;        // Logo image URL
  companyName?: string;    // Company name for branding
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface GenerationOptions {
  temperature?: number;    // 0.0-1.0, default: 0.7
  maxTokens?: number;      // Max: 4096
  validation?: "strict" | "normal" | "none"; // Default: "normal"
}

// Nigeria-specific request options
interface NigeriaOptions {
  whatsapp: {
    number: string;        // Nigerian phone (e.g., "08012345678")
    message: string;       // Pre-filled WhatsApp message
    showFloating: boolean; // Show floating WhatsApp button
  };
  currency: "NGN";         // Always Naira for Nigerian market
  units: "metric";         // Always sqm for Nigerian market
}
```

#### Response (Non-Streaming)

```json
{
  "success": true,
  "data": {
    "id": "gen_abc123xyz",
    "code": "import React from 'react';\n\nexport default function PropertyPage() {...}",
    "pageType": "listing",
    "validation": {
      "passed": true,
      "errors": [],
      "warnings": [],
      "nigerianChecks": {
        "hasNaira": true,
        "hasSqm": true,
        "hasWhatsApp": true,
        "noAmericanTerms": true
      }
    },
    "metadata": {
      "tokensUsed": 1234,
      "provider": "openai",
      "model": "gpt-4o",
      "duration": 3421,
      "autoFixed": false
    },
    "createdAt": "2024-12-08T14:30:00Z"
  },
  "meta": {
    "requestId": "req_abc123xyz",
    "timestamp": "2024-12-08T14:30:00Z"
  }
}
```

#### Response (Streaming - Server-Sent Events)

```
event: start
data: {"id":"gen_abc123xyz","timestamp":"2024-12-08T14:30:00Z"}

event: token
data: {"content":"import"}

event: token
data: {"content":" React"}

event: token
data: {"content":" from 'react'"}

...

event: complete
data: {"code":"...full code...","tokensUsed":1234,"duration":3421}
```

#### Example Request (Nigerian Property)

```bash
curl -X POST https://api.buildr.app/v1/generate \
  -H "Authorization: Bearer sk_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Create a luxury property listing for a 4-bedroom detached duplex in Lekki Phase 1, Lagos, priced at ₦85,000,000 with BQ, bore hole, and generator house",
    "pageType": "listing",
    "brandSettings": {
      "primaryColor": "#1a365d",
      "secondaryColor": "#2c5282",
      "accentColor": "#d4af37",
      "fontFamily": "Playfair Display",
      "companyName": "Prime Properties Lagos"
    },
    "nigeriaOptions": {
      "whatsapp": {
        "number": "08012345678",
        "message": "Hi! I'm interested in the 4BR Duplex in Lekki Phase 1",
        "showFloating": true
      },
      "currency": "NGN",
      "units": "metric"
    },
    "stream": false
  }'
```

#### JavaScript Example (Nigerian Agent)

```javascript
const response = await fetch('https://api.buildr.app/v1/generate', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt: 'Create a professional bio page for Chibuzo Okeke, Principal Partner with 10 years experience in Lekki and Ikoyi properties, NIESV certified',
    pageType: 'agent',
    brandSettings: {
      primaryColor: '#1a365d',
      secondaryColor: '#2c5282',
      accentColor: '#d4af37',
      fontFamily: 'Inter',
    },
    nigeriaOptions: {
      whatsapp: {
        number: '08012345678',
        message: 'Hello! I would like to inquire about your services',
        showFloating: true
      }
    }
  }),
});

const data = await response.json();
console.log(data.data.code);
```

#### Streaming Example (JavaScript)

```javascript
const response = await fetch('https://api.buildr.app/v1/generate', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt: 'Create open house registration page',
    pageType: 'openhouse',
    stream: true,
  }),
});

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  
  const chunk = decoder.decode(value);
  const lines = chunk.split('\n');
  
  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const data = JSON.parse(line.slice(6));
      if (data.content) {
        process.stdout.write(data.content);
      }
    }
  }
}
```

---

### 2. Render Template (Template-Only Approach)

**Endpoint**: `POST /render`

Renders a template with user-provided data. This is the primary endpoint for the template-only approach where users fill forms instead of writing prompts.

> [!NOTE]
> This endpoint replaces direct code generation for non-technical users. No LLM is invoked for rendering—templates are pre-designed and data is injected.

#### Request Body

```typescript
{
  "templateId": string,           // Required. e.g., "tmpl_listing_luxury_ng"
  "data": {
    "propertyType": PropertyType, // Required. Nigerian property type
    "price": number,              // Required. Price in Naira
    "beds": number,               // Required. Bedrooms count
    "baths": number,              // Required. Bathrooms count
    "sqm": number,                // Required. Size in square meters
    "city": string,               // Required. e.g., "Lagos"
    "area": string,               // Required. e.g., "Lekki Phase 1"
    "features": string[],         // Optional. Nigerian features
    "images": string[],           // Optional. Image URLs
    "description"?: string,       // Optional. Property description
    "whatsapp": {
      "number": string,           // Required. Nigerian format
      "message"?: string          // Optional. Pre-filled message
    }
  },
  "style": {
    "preset": StylePreset,        // Required. Color/typography preset
    "overrides"?: StyleOverrides  // Optional. Custom colors
  }
}

// Nigerian property types
type PropertyType = 
  | "detached_duplex" | "semi_detached_duplex" | "terrace"
  | "flat" | "penthouse" | "bungalow" | "mansion"
  | "land" | "commercial";

// Style presets (from 16-TEMPLATE-DESIGN-SPEC.md)
type StylePreset = 
  | "luxury_dark" | "trust_blue" | "modern_minimal"
  | "warm_earth" | "vibrant_life" | "corporate_navy"
  | "sunset_glow" | "nature_green";
```

#### Success Response

```json
{
  "success": true,
  "data": {
    "renderId": "rnd_abc123xyz",
    "previewUrl": "https://buildr.ng/preview/abc123",
    "exportUrl": "https://buildr.ng/api/export/abc123",
    "html": "<!DOCTYPE html>...",
    "expiresAt": "2024-12-09T14:30:00Z"
  },
  "meta": {
    "requestId": "req_xyz789",
    "timestamp": "2024-12-08T14:30:00Z",
    "templateVersion": "1.0.0"
  }
}
```

#### Example Request (Nigerian Property)

```bash
curl -X POST https://api.buildr.app/v1/render \
  -H "Authorization: Bearer sk_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "templateId": "tmpl_listing_luxury_ng",
    "data": {
      "propertyType": "detached_duplex",
      "price": 85000000,
      "beds": 4,
      "baths": 4,
      "sqm": 350,
      "city": "Lagos",
      "area": "Lekki Phase 1",
      "features": ["borehole", "bq", "generator_house", "swimming_pool"],
      "whatsapp": {
        "number": "08012345678",
        "message": "Hi! I am interested in the 4BR duplex in Lekki"
      }
    },
    "style": {
      "preset": "luxury_dark"
    }
  }'
```

---

### 3. Refine Generated Page

**Endpoint**: `POST /refine`

Iteratively refines an existing generated page based on user feedback.

#### Request Body

```typescript
{
  "generationId": string,        // ID from previous generation
  "refinementPrompt": string,    // What to change
  "preserveStructure"?: boolean, // Default: true
  "stream"?: boolean
}
```

#### Example

```bash
curl -X POST https://api.buildr.app/v1/refine \
  -H "Authorization: Bearer sk_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "generationId": "gen_abc123xyz",
    "refinementPrompt": "Make the headline larger and add a gradient background",
    "stream": false
  }'
```

---

### 3. Validate Code

**Endpoint**: `POST /validate`

Validates generated or custom code for syntax, TypeScript, and accessibility issues.

#### Request Body

```typescript
{
  "code": string,               // React/TypeScript code
  "strict"?: boolean,           // Enable strict validation (default: false)
  "checks"?: ValidationCheck[]  // Specific checks to run
}

type ValidationCheck = 
  | "syntax" 
  | "typescript" 
  | "accessibility" 
  | "performance" 
  | "security";
```

#### Response

```json
{
  "success": true,
  "data": {
    "valid": true,
    "errors": [],
    "warnings": [
      {
        "type": "accessibility",
        "severity": "warning",
        "message": "Image element is missing alt attribute",
        "line": 24,
        "column": 8,
        "fix": "Add alt=\"Description\" to the img element"
      }
    ],
    "suggestions": [
      "Consider extracting inline event handlers to improve performance"
    ],
    "score": {
      "accessibility": 85,
      "performance": 92,
      "security": 100
    }
  }
}
```

#### Example

```javascript
const code = `
import React from 'react';

export default function Component() {
  return (
    <div>
      <img src="/property.jpg" />
      <h1>Beautiful Home</h1>
    </div>
  );
}
`;

const response = await fetch('https://api.buildr.app/v1/validate', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    code,
    strict: true,
    checks: ['syntax', 'typescript', 'accessibility'],
  }),
});

const validation = await response.json();
console.log(validation.data.warnings);
```

---

### 4. Export Page

**Endpoint**: `POST /export`

Exports template output to various formats for deployment.

#### Request Body

```typescript
{
  "generationId"?: string,      // Export existing generation
  "code"?: string,              // Or provide custom code
  "format": ExportFormat,
  "options"?: ExportOptions
}

type ExportFormat = "html" | "zip" | "nextjs";

interface ExportOptions {
  includeAssets?: boolean;      // Default: true
  optimizeImages?: boolean;     // Default: true  
  minify?: boolean;             // Default: true
  inlineStyles?: boolean;       // For HTML format
}
```

#### Response

```json
{
  "success": true,
  "data": {
    "downloadUrl": "https://cdn.buildr.app/exports/abc123.zip",
    "expiresIn": 3600,
    "fileSize": 45678,
    "format": "zip",
    "files": [
      "index.html",
      "styles.css",
      "script.js",
      "assets/logo.png"
    ]
  }
}
```

#### Example

```javascript
const response = await fetch('https://api.buildr.app/v1/export', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    generationId: 'gen_abc123xyz',
    format: 'zip',
    options: {
      optimizeImages: true,
      minify: true,
    },
  }),
});

const exportData = await response.json();
const { downloadUrl } = exportData.data;

// Download the file
const file = await fetch(downloadUrl);
const blob = await file.blob();
// Save blob to filesystem
```

---

### 5. Get Usage Statistics

**Endpoint**: `GET /usage`

Returns API usage statistics for the current billing period.

#### Query Parameters

| Param | Type | Description |
|-------|------|-------------|
| `period` | string | `current`, `previous`, or date range `YYYY-MM-DD:YYYY-MM-DD` |
| `groupBy` | string | `day`, `week`, `month` |

#### Response

```json
{
  "success": true,
  "data": {
    "period": {
      "start": "2024-12-01T00:00:00Z",
      "end": "2024-12-31T23:59:59Z"
    },
    "usage": {
      "generations": 145,
      "refinements": 67,
      "validations": 234,
      "exports": 89,
      "tokensUsed": 234567,
      "estimatedCost": 12.34
    },
    "limits": {
      "generations": 500,
      "tokens": 500000
    },
    "breakdown": [
      {
        "date": "2024-12-01",
        "generations": 5,
        "tokensUsed": 8432
      },
      {
        "date": "2024-12-02",
        "generations": 8,
        "tokensUsed": 12156
      }
    ]
  }
}
```

---

## Template Management

### 6. List Templates

**Endpoint**: `GET /templates`

Returns available templates for generation starting points.

#### Query Parameters

| Param | Type | Description | Default |
|-------|------|-------------|---------|
| `category` | string | Filter by category | all |
| `premium` | boolean | Include premium templates | true |
| `limit` | number | Max results | 20 |
| `offset` | number | Pagination offset | 0 |
| `search` | string | Search term | - |

#### Response

```json
{
  "success": true,
  "data": {
    "templates": [
      {
        "id": "tmpl_listing_luxury_001",
        "name": "Luxury Property Listing",
        "description": "High-end property showcase with full-width hero and elegant typography",
        "category": "listing",
        "thumbnailUrl": "https://cdn.buildr.app/templates/luxury-listing-thumb.jpg",
        "previewUrl": "https://preview.buildr.app/tmpl_listing_luxury_001",
        "isPremium": false,
        "tags": ["luxury", "modern", "dark-theme"],
        "usageCount": 1247,
        "rating": 4.8,
        "sections": ["hero", "gallery", "features", "contact"]
      }
    ],
    "pagination": {
      "total": 15,
      "limit": 20,
      "offset": 0,
      "hasMore": false
    }
  }
}
```

#### Example

```bash
curl "https://api.buildr.app/v1/templates?category=listing&limit=10" \
  -H "Authorization: Bearer sk_live_abc123..."
```

---

### 7. Get Specific Template

**Endpoint**: `GET /templates/{templateId}`

Returns a specific template with its complete code.

#### Response

```json
{
  "success": true,
  "data": {
    "id": "tmpl_listing_luxury_001",
    "name": "Luxury Property Listing",
    "description": "...",
    "category": "listing",
    "code": "import React from 'react';\n\nexport default function LuxuryListing() {...}",
    "variables": [
      {
        "key": "propertyImage",
        "label": "Main Property Image",
        "type": "image",
        "defaultValue": "https://..."
      },
      {
        "key": "price",
        "label": "Property Price",
        "type": "text",
        "defaultValue": "$2,500,000"
      }
    ],
    "thumbnailUrl": "...",
    "previewUrl": "..."
  }
}
```

---

## Project Management

### 8. Create Project

**Endpoint**: `POST /projects`

Creates a new project to organize generated pages.

#### Request Body

```typescript
{
  "name": string,
  "description"?: string,
  "generationId"?: string,      // Initialize with existing generation
  "templateId"?: string,        // Or start from template
  "visibility"?: "private" | "public" | "unlisted"
}
```

#### Response

```json
{
  "success": true,
  "data": {
    "id": "proj_abc123xyz",
    "name": "Sunset Beach Listing",
    "slug": "sunset-beach-listing",
    "status": "draft",
    "visibility": "private",
    "createdAt": "2024-12-08T14:30:00Z",
    "url": "https://buildr.app/p/sunset-beach-listing"
  }
}
```

---

### 9. Update Project

**Endpoint**: `PATCH /projects/{projectId}`

Updates project metadata or code.

#### Request Body

```typescript
{
  "name"?: string,
  "description"?: string,
  "code"?: string,              // Update the code
  "status"?: "draft" | "ready" | "published" | "archived",
  "visibility"?: "private" | "public" | "unlisted"
}
```

---

### 10. Get Project Versions

**Endpoint**: `GET /projects/{projectId}/versions`

Retrieves version history for a project.

#### Response

```json
{
  "success": true,
  "data": {
    "versions": [
      {
        "id": "ver_abc123",
        "projectId": "proj_abc123xyz",
        "code": "...",
        "message": "Updated hero background",
        "createdAt": "2024-12-08T15:00:00Z"
      },
      {
        "id": "ver_def456",
        "projectId": "proj_abc123xyz",
        "code": "...",
        "message": "Initial generation",
        "createdAt": "2024-12-08T14:30:00Z"
      }
    ],
    "total": 2
  }
}
```

---

## Error Handling

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Try again in 60 seconds.",
    "details": {
      "limit": 50,
      "reset": 1702045800,
      "retryAfter": 60
    },
    "requestId": "req_abc123xyz"
  }
}
```

### Error Codes

| Code | HTTP Status | Description | Action |
|------|-------------|-------------|--------|
| `UNAUTHORIZED` | 401 | Invalid or missing API key | Check API key |
| `FORBIDDEN` | 403 | API key lacks permission | Upgrade tier or check permissions |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests | Wait for rate limit reset |
| `INVALID_REQUEST` | 400 | Request validation failed | Check request body |
| `INVALID_PROMPT` | 400 | Prompt validation failed | Review prompt requirements |
| `GENERATION_FAILED` | 500 | LLM generation error | Retry or contact support |
| `VALIDATION_FAILED` | 422 | Code validation failed | Review validation errors |
| `TEMPLATE_NOT_FOUND` | 404 | Template doesn't exist | Check template ID |
| `PROJECT_NOT_FOUND` | 404 | Project doesn't exist | Check project ID |
| `QUOTA_EXCEEDED` | 403 | Monthly quota reached | Upgrade tier or wait for reset |
| `INTERNAL_ERROR` | 500 | Server error | Retry or contact support |

### Error Example

```javascript
try {
  const response = await fetch('https://api.buildr.app/v1/generate', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ /* ... */ }),
  });

  const data = await response.json();

  if (!data.success) {
    switch (data.error.code) {
      case 'RATE_LIMIT_EXCEEDED':
        const retryAfter = data.error.details.retryAfter;
        console.log(`Rate limited. Retry in ${retryAfter}s`);
        break;
      case 'QUOTA_EXCEEDED':
        console.log('Monthly quota exceeded. Please upgrade.');
        break;
      default:
        console.error('Error:', data.error.message);
    }
  }
} catch (error) {
  console.error('Network error:', error);
}
```

---

## Webhooks

Configure webhooks to receive real-time notifications for async events.

### Webhook Configuration

**Endpoint**: `POST /webhooks`

```json
{
  "url": "https://yourdomain.com/webhooks/buildr",
  "events": ["generation.complete", "generation.failed", "export.ready"],
  "secret": "whsec_abc123xyz"  // For signature verification
}
```

### Webhook Events

| Event | Description | Payload |
|-------|-------------|---------|
| `generation.complete` | Page generation finished successfully | `{ generationId, code, tokensUsed }` |
| `generation.failed` | Generation encountered error | `{ generationId, error }` |
| `export.ready` | Export file is ready for download | `{ exportId, downloadUrl, expiresIn }` |
| `project.published` | Project was published | `{ projectId, publishedUrl }` |

### Webhook Payload

```json
{
  "id": "evt_abc123xyz",
  "event": "generation.complete",
  "timestamp": "2024-12-08T14:30:00Z",
  "data": {
    "generationId": "gen_abc123xyz",
    "code": "...",
    "tokensUsed": 1234,
    "duration": 3421
  },
  "signature": "sha256=..."
}
```

### Verifying Webhook Signatures

```javascript
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(JSON.stringify(payload)).digest('hex');
  return `sha256=${digest}` === signature;
}

// In your webhook handler
app.post('/webhooks/buildr', (req, res) => {
  const signature = req.headers['x-buildr-signature'];
  const isValid = verifyWebhook(req.body, signature, process.env.WEBHOOK_SECRET);
  
  if (!isValid) {
    return res.status(401).send('Invalid signature');
  }
  
  // Process webhook
  const { event, data } = req.body;
  console.log(`Received ${event}:`, data);
  
  res.status(200).send('OK');
});
```

---

## SDKs

### TypeScript/JavaScript SDK

**Installation:**

```bash
pnpm add @buildr/sdk
# or
yarn add @buildr/sdk
```

**Usage:**

```typescript
import { BuildrClient } from '@buildr/sdk';

const client = new BuildrClient({
  apiKey: process.env.BUILDR_API_KEY,
  baseUrl: 'https://api.buildr.app/v1', // optional
});

// Generate a page
const result = await client.generate({
  prompt: 'Create a luxury property listing page',
  pageType: 'listing',
  brandSettings: {
    primaryColor: '#1a365d',
    secondaryColor: '#2c5282',
    accentColor: '#d4af37',
    fontFamily: 'Playfair Display',
  },
});

console.log(result.code);

// Streaming generation
const stream = await client.generateStream({
  prompt: 'Create an agent bio page',
  pageType: 'agent',
});

for await (const chunk of stream) {
  if (chunk.type === 'token') {
    process.stdout.write(chunk.content);
  }
}

// Validate code
const validation = await client.validate(code);
console.log(validation.errors);

// Export page
const exportData = await client.export({
  generationId: result.id,
  format: 'zip',
});

console.log('Download URL:', exportData.downloadUrl);
```

### Python SDK (Community)

```bash
pip install buildr-sdk
```

```python
from buildr import BuildrClient

client = BuildrClient(api_key=os.environ['BUILDR_API_KEY'])

# Generate page
result = client.generate(
    prompt='Create a property listing page',
    page_type='listing',
    brand_settings={
        'primary_color': '#6366f1',
        'secondary_color': '#4f46e5',
    }
)

print(result.code)

# Streaming
for chunk in client.generate_stream(prompt='Create a page'):
    if chunk.type == 'token':
        print(chunk.content, end='')
```

---

## Code Examples

### Complete Example: Generate, Refine, Export

```typescript
import { BuildrClient } from '@buildr/sdk';

const client = new BuildrClient({
  apiKey: process.env.BUILDR_API_KEY,
});

async function createLandingPage() {
  // 1. Generate initial page
  console.log('Generating page...');
  const generation = await client.generate({
    prompt: 'Create a luxury beachfront property listing for $2.5M home',
    pageType: 'listing',
    brandSettings: {
      primaryColor: '#1a365d',
      secondaryColor: '#2c5282',
      accentColor: '#d4af37',
      fontFamily: 'Playfair Display',
    },
  });

  console.log('✓ Generated:', generation.id);

  // 2. Refine the design
  console.log('Refining design...');
  const refined = await client.refine({
    generationId: generation.id,
    refinementPrompt: 'Make the hero image full-screen and add a gradient overlay',
  });

  console.log('✓ Refined');

  // 3. Validate the code
  console.log('Validating...');
  const validation = await client.validate(refined.code);

  if (!validation.valid) {
    console.error('Validation errors:', validation.errors);
    return;
  }

  console.log('✓ Validated');

  // 4. Export to HTML
  console.log('Exporting...');
  const exported = await client.export({
    generationId: refined.id,
    format: 'zip',
    options: {
      optimizeImages: true,
      minify: true,
    },
  });

  console.log('✓ Export ready:', exported.downloadUrl);

  return exported;
}

createLandingPage();
```

### Retry Logic Example

```typescript
async function generateWithRetry(
  client: BuildrClient,
  options: GenerateOptions,
  maxRetries = 3
) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await client.generate(options);
    } catch (error) {
      if (error.code === 'RATE_LIMIT_EXCEEDED') {
        const retryAfter = error.details.retryAfter || Math.pow(2, i) * 1000;
        console.log(`Rate limited. Retrying in ${retryAfter}ms...`);
        await new Promise(resolve => setTimeout(resolve, retryAfter));
      } else if (i === maxRetries - 1) {
        throw error;
      }
    }
  }
}
```

### Batch Processing Example

```typescript
async function batchGenerateListings(properties: Property[]) {
  const client = new BuildrClient({ apiKey: process.env.BUILDR_API_KEY });
  
  const results = await Promise.allSettled(
    properties.map(async (property) => {
      const prompt = `Create a listing page for ${property.address}: ${property.beds} beds, ${property.baths} baths, ${property.sqft} sqft, $${property.price}`;
      
      return client.generate({
        prompt,
        pageType: 'listing',
        brandSettings: COMPANY_BRAND,
      });
    })
  );

  const successful = results.filter(r => r.status === 'fulfilled');
  const failed = results.filter(r => r.status === 'rejected');

  console.log(`Generated ${successful.length}/${properties.length} pages`);
  
  if (failed.length > 0) {
    console.error('Failed:', failed.map(f => f.reason));
  }

  return successful.map(r => r.value);
}
```

---

## Next Steps

- Review the [Technical Specification](./02-TECHNICAL-SPEC.md) for implementation details
- Explore the [Template Library](./08-TEMPLATE-LIBRARY.md) for starter templates
- Check the [Testing Strategy](./06-TESTING-STRATEGY.md) for API testing approaches

---

> **Support**: api-support@buildr.app  
> **Status Page**: https://status.buildr.app  
> **Changelog**: https://buildr.app/changelog
