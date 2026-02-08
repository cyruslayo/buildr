/**
 * Style Picker Component
 * BLDR-2WIZ-004: Style preset selector
 * 
 * "use client" justification: Uses onClick handlers for preset selection
 */
'use client';

import { motion } from 'framer-motion';
import { Check, Palette } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Style preset definitions with colors
 */
export const STYLE_PRESETS = [
  {
    id: 'luxury_dark',
    name: 'Luxury Dark',
    description: 'Gold accents for luxury properties',
    colors: {
      primary: '#D4AF37', // Gold
      secondary: '#1a1a2e', // Dark navy
      accent: '#F5D547', // Light gold
      background: '#0f0f1a', // Very dark
    },
  },
  {
    id: 'luxury_cream',
    name: 'Luxury Cream',
    description: 'Elegant cream tones for premium estates',
    colors: {
      primary: '#8B7355', // Warm brown
      secondary: '#FFF8DC', // Cornsilk
      accent: '#DAA520', // Goldenrod
      background: '#FFFEF0', // Cream
    },
  },
  {
    id: 'professional_blue',
    name: 'Professional Blue',
    description: 'Trust-building blue for family homes',
    colors: {
      primary: '#4f46e5', // Indigo
      secondary: '#1e293b', // Slate
      accent: '#f59e0b', // Amber
      background: '#0f172a', // Dark slate
    },
  },
  {
    id: 'professional_slate',
    name: 'Professional Slate',
    description: 'Modern neutral palette',
    colors: {
      primary: '#64748b', // Slate
      secondary: '#334155', // Slate dark
      accent: '#22c55e', // Green
      background: '#0f172a', // Dark
    },
  },
  {
    id: 'modern_mint',
    name: 'Modern Mint',
    description: 'Fresh green for eco-friendly properties',
    colors: {
      primary: '#10b981', // Emerald
      secondary: '#1e293b', // Slate
      accent: '#fbbf24', // Amber
      background: '#0f172a', // Dark
    },
  },
  {
    id: 'warm_sunset',
    name: 'Warm Sunset',
    description: 'Warm tones for inviting atmospheres',
    colors: {
      primary: '#f97316', // Orange
      secondary: '#1e1b4b', // Indigo dark
      accent: '#facc15', // Yellow
      background: '#0c0a1d', // Very dark
    },
  },
  {
    id: 'ocean_blue',
    name: 'Ocean Blue',
    description: 'Coastal vibes for waterfront properties',
    colors: {
      primary: '#0ea5e9', // Sky
      secondary: '#0c4a6e', // Sky dark
      accent: '#fbbf24', // Amber
      background: '#0c1929', // Navy dark
    },
  },
  {
    id: 'forest_green',
    name: 'Forest Green',
    description: 'Natural tones for estates with gardens',
    colors: {
      primary: '#22c55e', // Green
      secondary: '#14532d', // Green dark
      accent: '#f59e0b', // Amber
      background: '#0a1f0d', // Dark green
    },
  },
] as const;

export type StylePresetId = typeof STYLE_PRESETS[number]['id'];

export interface StylePickerProps {
  /** Callback when a preset is selected */
  onSelect: (presetId: string) => void;
  /** Currently selected preset ID */
  selectedId: string | null;
}

/**
 * StylePicker - Style preset selector with color previews
 * 
 * Features:
 * - 8 curated style presets
 * - Color swatch previews
 * - Selection state with ring highlight
 */
export function StylePicker({ onSelect, selectedId }: StylePickerProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-slate-400 mb-4">
        <Palette className="h-5 w-5" />
        <span className="text-sm">Select a color theme for your landing page</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STYLE_PRESETS.map((preset, index) => {
          const isSelected = preset.id === selectedId;
          
          return (
            <motion.div
              key={preset.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <button
                data-testid={`preset-${preset.id}`}
                data-selected={isSelected}
                onClick={() => onSelect(preset.id)}
                className={`
                  w-full text-left transition-all duration-300
                  rounded-lg border p-3
                  ${isSelected 
                    ? 'ring-2 ring-primary ring-offset-2 ring-offset-background border-primary' 
                    : 'border-slate-700 hover:border-slate-600'
                  }
                `}
              >
                {/* Color swatches */}
                <div className="flex gap-1 mb-3">
                  <div 
                    data-testid={`color-swatch-${preset.id}-primary`}
                    className="h-8 w-8 rounded-md"
                    style={{ backgroundColor: preset.colors.primary }}
                  />
                  <div 
                    data-testid={`color-swatch-${preset.id}-secondary`}
                    className="h-8 w-8 rounded-md"
                    style={{ backgroundColor: preset.colors.secondary }}
                  />
                  <div 
                    data-testid={`color-swatch-${preset.id}-accent`}
                    className="h-8 w-8 rounded-md"
                    style={{ backgroundColor: preset.colors.accent }}
                  />
                </div>

                {/* Title with check mark */}
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-slate-200">
                    {preset.name}
                  </span>
                  {isSelected && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {preset.description}
                </p>
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
