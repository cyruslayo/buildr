import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { getTemplateComponent } from '@/components/templates/registry';
import type { PropertyData } from './types';

import { STYLE_PRESETS, StylePresetId, DEFAULT_STYLE_PRESET } from '../../features/wizard/constants/presets';
import { FONT_PAIRINGS, FontPairingId, DEFAULT_FONT_PAIRING } from '../../features/wizard/constants/fonts';

/**
 * Renders a template to a static HTML string.
 * Used for the "Export HTML" feature.
 * 
 * @param templateId - The ID of the template to render
 * @param data - The property data to inject
 * @returns {Promise<string>} The full HTML document
 */
export async function renderTemplateToHtml(templateId: string, data: PropertyData): Promise<string> {
  const Component = getTemplateComponent(templateId);

  if (!Component) {
    throw new Error(`Template not found: ${templateId}`);
  }

  // Get style preset colors with safe fallback
  const presetId = (data.stylePreset as StylePresetId);
  const preset = STYLE_PRESETS[presetId] || STYLE_PRESETS[DEFAULT_STYLE_PRESET];
  const { colors } = preset;

  // Get font pairing with safe fallback
  const fontId = (data.fontPairing as FontPairingId);
  const pairing = FONT_PAIRINGS[fontId] || FONT_PAIRINGS[DEFAULT_FONT_PAIRING];

  // 1. Render the component to static markup
  const componentHtml = renderToStaticMarkup(<Component data={data} />);

  // 2. Wrap it in a standard HTML shell with theme variables
  const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.title || 'Property Listing'}</title>
  
  <style>
    :root {
      --primary: ${colors.primary};
      --secondary: ${colors.secondary};
      --accent: ${colors.accent};
      --background: ${colors.background};
      --foreground: ${colors.foreground};
      --font-display: ${pairing.fonts.display};
      --font-body: ${pairing.fonts.body};
    }
  </style>

  <!-- Google Fonts Dynamic Injection -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="${pairing.googleFonts.url}" rel="stylesheet">
  
  <!-- Tailwind CSS via CDN for standalone export -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: 'var(--primary)',
            secondary: 'var(--secondary)',
            accent: 'var(--accent)',
            background: 'var(--background)',
            foreground: 'var(--foreground)',
          },
          fontFamily: {
            display: 'var(--font-display)',
            body: 'var(--font-body)',
          },
        }
      }
    }
  </script>
</head>
<body class="font-body antialiased bg-background text-foreground">
  ${componentHtml}
</body>
</html>
  `;

  return fullHtml;
}
