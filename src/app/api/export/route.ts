import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth/auth.config';
import { prisma } from '@/lib/db';
import { getProjectWithData } from '@/lib/templates/generator';
import { renderTemplateToHtml } from '@/lib/templates/renderer';

// Zod schema for export request validation
const exportSchema = z.object({
  code: z.string().min(1, 'Code is required'),
  format: z.enum(['html', 'zip']),
  options: z.object({
    minify: z.boolean().optional(),
    inlineStyles: z.boolean().optional(),
    whatsapp: z.object({
      number: z.string(),
      message: z.string().optional(),
    }).optional(),
  }).optional(),
});

/**
 * Generate standalone HTML with Tailwind CDN
 */
function generateStandaloneHtml(code: string, options?: {
  minify?: boolean;
  whatsapp?: { number: string; message?: string };
}): string {
  const whatsappButton = options?.whatsapp 
    ? `
    <!-- WhatsApp Floating Button -->
    <a href="https://wa.me/${options.whatsapp.number}${options.whatsapp.message ? `?text=${encodeURIComponent(options.whatsapp.message)}` : ''}" 
       target="_blank"
       rel="noopener noreferrer"
       style="position: fixed; bottom: 24px; right: 24px; background-color: #25D366; color: white; padding: 16px; border-radius: 50%; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 9999; text-decoration: none; display: flex; align-items: center; justify-content: center;"
       aria-label="Chat on WhatsApp">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
    `
    : '';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Property Page - Built with Buildr</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    /* Nigerian Real Estate Defaults */
    body {
      font-family: 'Inter', system-ui, sans-serif;
      margin: 0;
      padding: 0;
    }
  </style>
</head>
<body>
  ${code}
  ${whatsappButton}
</body>
</html>`;

  return options?.minify ? html.replace(/\s+/g, ' ').trim() : html;
}

/**
 * Generate a unique export ID
 */
function generateExportId(): string {
  return `exp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * GET /api/export?projectId=xxx
 * Export a project as HTML file download
 */
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const {  searchParams } = new URL(req.url);
    const projectId = searchParams.get('projectId');
    
    if (!projectId) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }
    
    // Fetch project with data
    const project = await getProjectWithData(projectId);
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    // Verify ownership
    if (project.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }
    
    // Generate HTML using the renderer
    // Note: renderer.tsx currently has react-dom/server import issue, 
    // so for now we'll create basic HTML with the property data
    const html = generateStandaloneHtml(
      `<div class="container mx-auto py-8">
        <h1 class="text-4xl font-bold mb-4">${project.propertyData.title}</h1>
        <p class="text-lg text-gray-600 mb-2">${project.propertyData.location}</p>
        <p class="text-2xl font-bold text-green-600 mb-4">₦${project.propertyData.price.toLocaleString()}</p>
        <div class="grid grid-cols-3 gap-4 mb-6">
          <div><strong>Beds:</strong> ${project.propertyData.beds}</div>
          <div><strong>Baths:</strong> ${project.propertyData.baths}</div>
          <div><strong>Size:</strong> ${project.propertyData.sqm} sqm</div>
        </div>
        ${project.propertyData.description ? `<p class="text-gray-700">${project.propertyData.description}</p>` : ''}
      </div>`,
      {
        whatsapp: project.propertyData.whatsappNumber ? {
          number: project.propertyData.whatsappNumber,
          message: project.propertyData.whatsappMessage,
        } : undefined,
      }
    );
    
    // Return as downloadable file
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `attachment; filename="${project.name.replace(/[^a-z0-9]/gi, '-')}.html"`,
      },
    });
  } catch (error) {
    console.error('Export GET Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = exportSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const { code, format, options } = parseResult.data;
    const exportId = generateExportId();

    if (format === 'html') {
      const html = generateStandaloneHtml(code, {
        minify: options?.minify,
        whatsapp: options?.whatsapp,
      });

      // In production, this would upload to storage and return a real URL
      // For now, we return a placeholder URL
      const downloadUrl = `/api/export/download/${exportId}.html`;

      return NextResponse.json({
        success: true,
        exportId,
        format: 'html',
        downloadUrl,
        html, // Include HTML directly for testing/preview
        options: options ? { minify: options.minify } : undefined,
        expiresIn: 3600,
        timestamp: new Date().toISOString(),
      });
    }

    if (format === 'zip') {
      const html = generateStandaloneHtml(code, {
        whatsapp: options?.whatsapp,
      });

      // In production, this would create a ZIP file with:
      // - index.html
      // - styles.css (optional)
      // - assets/ folder
      const downloadUrl = `/api/export/download/${exportId}.zip`;

      return NextResponse.json({
        success: true,
        exportId,
        format: 'zip',
        downloadUrl,
        html,
        files: ['index.html', 'README.md'],
        expiresIn: 3600,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      { error: 'Unsupported format' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Export API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
