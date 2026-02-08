/**
 * GET /api/templates
 * BLDR-3TPL-002: Template API Routes
 * 
 * Lists all available templates with optional category filtering and pagination.
 */

import { NextRequest, NextResponse } from 'next/server';
import { TEMPLATE_REGISTRY } from '@/lib/templates/registry';
import { TemplateCategorySchema } from '@/lib/templates/types';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '20', 10);
  
  // Filter by category if provided
  let filteredTemplates = [...TEMPLATE_REGISTRY];
  
  if (category) {
    // Validate category exists in our enum
    const parseResult = TemplateCategorySchema.safeParse(category);
    if (parseResult.success) {
      filteredTemplates = filteredTemplates.filter(t => t.category === category);
    } else {
      // Invalid category - return empty array
      filteredTemplates = [];
    }
  }
  
  // Calculate pagination
  const total = filteredTemplates.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedTemplates = filteredTemplates.slice(startIndex, endIndex);
  
  // Return templates without full code for list view (performance)
  const templatesWithoutCode = paginatedTemplates.map(({ code, ...rest }) => ({
    ...rest,
    hasCode: !!code,
  }));
  
  return NextResponse.json({
    templates: templatesWithoutCode,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  });
}

