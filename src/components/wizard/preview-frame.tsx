/**
 * Preview Frame Component
 * BLDR-2WIZ-005: Iframe-based template preview
 * 
 * "use client" justification: Uses useState for viewport toggle,
 * iframe load events, and fullscreen API
 */
'use client';

import { useState, useCallback } from 'react';
import { Monitor, Smartphone, Maximize2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { PropertyData } from '@/lib/templates';

type ViewportMode = 'mobile' | 'desktop';

export interface PreviewFrameProps {
  /** Template ID to preview */
  templateId: string;
  /** Property data to inject into template */
  data: Partial<PropertyData>;
  /** Style preset ID */
  stylePreset?: string;
}

const viewportWidths: Record<ViewportMode, string> = {
  mobile: '375px',
  desktop: '100%',
};

/**
 * PreviewFrame - Iframe-based template preview with viewport toggle
 * 
 * Features:
 * - Real-time data updates
 * - Mobile/Desktop toggle
 * - Fullscreen button
 * - Loading state
 */
export function PreviewFrame({ templateId, data, stylePreset }: PreviewFrameProps) {
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [isLoading, setIsLoading] = useState(true);

  // Build preview URL with query params
  const previewUrl = `/api/preview?templateId=${encodeURIComponent(templateId)}&data=${encodeURIComponent(JSON.stringify(data))}${stylePreset ? `&style=${encodeURIComponent(stylePreset)}` : ''}`;

  const handleIframeLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleFullscreen = useCallback(() => {
    const container = document.getElementById('preview-container');
    if (container && document.fullscreenEnabled) {
      container.requestFullscreen();
    }
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/50">
        {/* Viewport toggle */}
        <div className="flex items-center gap-1 bg-slate-800 rounded-md p-1">
          <Button
            variant={viewport === 'desktop' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setViewport('desktop')}
            aria-label="Desktop view"
            className="gap-1"
          >
            <Monitor className="h-4 w-4" />
            Desktop
          </Button>
          <Button
            variant={viewport === 'mobile' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setViewport('mobile')}
            aria-label="Mobile view"
            className="gap-1"
          >
            <Smartphone className="h-4 w-4" />
            Mobile
          </Button>
        </div>

        {/* Fullscreen button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleFullscreen}
          aria-label="Fullscreen"
          className="gap-1"
        >
          <Maximize2 className="h-4 w-4" />
          Fullscreen
        </Button>
      </div>

      {/* Preview container */}
      <div 
        id="preview-container"
        data-testid="preview-container"
        data-view={viewport}
        className="flex-1 flex items-start justify-center p-4 bg-slate-950 overflow-auto"
      >
        <div 
          className="relative bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300"
          style={{ 
            width: viewportWidths[viewport],
            maxWidth: '100%',
            height: viewport === 'mobile' ? '667px' : '100%',
            minHeight: '500px',
          }}
        >
          {/* Loading overlay */}
          {isLoading && (
            <div 
              data-testid="preview-loading"
              className="absolute inset-0 flex items-center justify-center bg-slate-900/80 z-10"
            >
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="text-sm text-slate-400">Loading preview...</span>
              </div>
            </div>
          )}

          {/* Iframe */}
          <iframe
            title="Preview"
            src={previewUrl}
            onLoad={handleIframeLoad}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
}
