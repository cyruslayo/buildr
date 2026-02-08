import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
// TODO: Fix renderer.tsx to not use react-dom/server, or move to a server component
// import { renderTemplateToHtml } from '@/lib/templates/renderer';

// Template registry - placeholder until BLDR-2TPL-001
const TEMPLATE_REGISTRY: Record<string, { name: string; category: string }> = {
  'tmpl_listing_luxury_ng': {
    name: 'Luxury Property Listing',
    category: 'luxury',
  },
  'tmpl_listing_standard_ng': {
    name: 'Standard Property Listing',
    category: 'standard',
  },
  'tmpl_land_sale_ng': {
    name: 'Land Sale Page',
    category: 'land',
  },
  'tmpl_agent_bio_ng': {
    name: 'Agent Bio Page',
    category: 'agent',
  },
  'tmpl_shortlet_ng': {
    name: 'Short-Let Apartment',
    category: 'shortlet',
  },
  'tmpl_estate_ng': {
    name: 'Off-Plan Estate',
    category: 'estate',
  },
};

// Nigerian currency formatter
function formatNaira(amount: number): string {
  return `₦${new Intl.NumberFormat('en-NG').format(amount)}`;
}

// Nigerian measurement formatter
function formatSqm(sqm: number): string {
  return `${sqm} sqm`;
}

// Request validation schema
const renderSchema = z.object({
  templateId: z.string().min(1, 'Template ID is required'),
  mode: z.enum(['preview', 'export']).optional().default('preview'),
  data: z.object({
    price: z.number().optional(),
    beds: z.number().optional(),
    baths: z.number().optional(),
    sqm: z.number().optional(),
    location: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    features: z.array(z.string()).optional(),
    whatsappNumber: z.string().optional(),
    isVerified: z.boolean().optional(),
    images: z.array(z.string()).optional(),
  }).passthrough(),
  style: z.object({
    preset: z.string().optional(),
    primaryColor: z.string().optional(),
    secondaryColor: z.string().optional(),
  }).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = renderSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const { templateId, data, style, mode } = parseResult.data;

    // Check if template exists
    const template = TEMPLATE_REGISTRY[templateId];
    if (!template) {
      return NextResponse.json(
        { error: 'Template not found', templateId },
        { status: 404 }
      );
    }

    // Format data for Nigerian market
    const formattedData = {
      ...data,
      price: data.price ? formatNaira(data.price) : undefined,
      sqm: data.sqm ? formatSqm(data.sqm) : undefined,
    };

    if (mode === 'export') {
      // TODO: Re-enable export once renderer is fixed
      return NextResponse.json(
        { error: 'Export temporarily disabled - please use /api/export instead' },
        { status: 501 }
      );
      /* 
      try {
        const html = await renderTemplateToHtml(templateId, formattedData as any);
        return new NextResponse(html, {
          headers: {
            'Content-Type': 'text/html',
            'Content-Disposition': `attachment; filename=\"${templateId}.html\"`,
          },
        });
      } catch (err) {
        return NextResponse.json(
           { error: 'Export failed', message: err instanceof Error ? err.message : String(err) },
           { status: 500 }
        );
      }
      */
    }

    // Generate preview URL
    const previewId = `preview_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const previewUrl = `/preview/${previewId}`;

    return NextResponse.json({
      templateId,
      templateName: template.name,
      category: template.category,
      previewUrl,
      formattedData,
      style: style || { preset: 'default' },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Render API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
