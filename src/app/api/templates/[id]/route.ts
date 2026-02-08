/**
 * GET /api/templates/[id]
 * BLDR-3TPL-002: Template API Routes
 * 
 * Returns a single template by ID with full code included.
 */

import { NextRequest, NextResponse } from 'next/server';
import { findTemplateById } from '@/lib/templates/registry';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  const { id } = await params;
  
  // Find template by ID
  const template = findTemplateById(id);
  
  if (!template) {
    return NextResponse.json(
      { error: 'Template not found' },
      { status: 404 }
    );
  }
  
  // Return full template with code
  return NextResponse.json(template);
}

