'use client'; 
/**
 * JUSTIFICATION: "use client" is required for interactive typography governance, 
 * store-backed preset selection, and high-fidelity Framer Motion animations 
 * central to the Lagos Luxury aesthetic.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Check, CheckCircle2, Type } from 'lucide-react';
import { useWizardStore } from '../../store/wizard-store';
import { STYLE_PRESETS, StylePresetId, DEFAULT_STYLE_PRESET } from '../../constants/presets';
import { FONT_PAIRINGS, FontPairingId, DEFAULT_FONT_PAIRING } from '../../constants/fonts';
import { cn } from '@/lib/utils';

/**
 * StyleStep
 * Allows agents to select from predefined luxury color presets and font pairings.
 * Enforces "Lagos Luxury" standards via Walled Garden approach.
 */
export const StyleStep: React.FC = () => {
  const { propertyData, updatePropertyData } = useWizardStore();
  
  const selectedPresetId = propertyData.stylePreset || DEFAULT_STYLE_PRESET;
  const selectedFontId = propertyData.fontPairing || DEFAULT_FONT_PAIRING;

  const handleSelectPreset = (id: StylePresetId) => {
    updatePropertyData({ stylePreset: id });
  };

  const handleSelectFont = (id: FontPairingId) => {
    updatePropertyData({ fontPairing: id });
  };

  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Style & Aesthetics</h2>
        <p className="text-muted-foreground text-lg">
          Select a professional theme. Our "Lagos Luxury" presets guarantee trust and visual excellence.
        </p>
      </div>

      {/* Color Presets Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-l-4 border-primary pl-4">
          <h3 className="text-xl font-bold text-slate-800">Color Palette</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {Object.values(STYLE_PRESETS).map((preset, index) => {
            const isSelected = selectedPresetId === preset.id;
            const colSpan = (index % 4 === 0 || index % 4 === 3) ? 'md:col-span-7' : 'md:col-span-5';
            
            return (
              <motion.div
                key={preset.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleSelectPreset(preset.id)}
                data-testid={`preset-card-${preset.id}`}
                className={cn(
                  "group relative cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300",
                  "flex flex-col gap-4 min-h-[180px]",
                  colSpan,
                  isSelected 
                    ? "border-primary bg-primary/5 shadow-xl ring-1 ring-primary/20" 
                    : "border-muted bg-white hover:border-primary/30 hover:shadow-lg"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn(
                    "font-bold text-lg transition-colors",
                    isSelected ? "text-primary" : "text-slate-700 group-hover:text-primary/70"
                  )}>
                    {preset.name}
                  </span>
                  {isSelected && (
                    <div className="bg-primary text-white rounded-full p-1 shadow-md">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <div 
                  className="flex gap-1.5 h-12 w-full rounded-xl overflow-hidden border border-slate-200 shadow-inner"
                  role="img"
                  aria-label={`Color palette for ${preset.name}`}
                >
                  <div className="flex-[2]" style={{ backgroundColor: preset.colors.primary }} />
                  <div className="flex-1" style={{ backgroundColor: preset.colors.accent }} />
                  <div className="flex-1" style={{ backgroundColor: preset.colors.background }} />
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {preset.description}
                </p>
                <div className={cn(
                  "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
                  "bg-gradient-to-br from-white/20 to-transparent backdrop-blur-[2px]"
                )} />
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Font Pairings Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-l-4 border-slate-400 pl-4">
          <h3 className="text-xl font-bold text-slate-800">Typography</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {Object.values(FONT_PAIRINGS).map((pairing, index) => {
            const isSelected = selectedFontId === pairing.id;
            // Opposite asymmetric pattern to the colors for visual balance
            const colSpan = (index % 4 === 1 || index % 4 === 2) ? 'md:col-span-7' : 'md:col-span-5';
            
            return (
              <motion.div
                key={pairing.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleSelectFont(pairing.id)}
                data-testid={`font-card-${pairing.id}`}
                className={cn(
                  "group relative cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300",
                  "flex flex-col gap-4 min-h-[160px]",
                  colSpan,
                  isSelected 
                    ? "border-primary bg-primary/5 shadow-xl ring-1 ring-primary/20" 
                    : "border-muted bg-white hover:border-primary/30 hover:shadow-lg"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Type className={cn(
                      "w-5 h-5",
                      isSelected ? "text-primary" : "text-slate-400"
                    )} />
                    <span className={cn(
                      "font-bold text-lg transition-colors",
                      isSelected ? "text-primary" : "text-slate-700 group-hover:text-primary/70"
                    )}>
                      {pairing.name}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="bg-primary text-white rounded-full p-1 shadow-md">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* Font Preview Area */}
                <div className="flex flex-col gap-1 p-3 bg-slate-50 rounded-xl border border-slate-100 shadow-inner">
                  <span 
                    className="text-base font-bold text-slate-900 truncate"
                    style={{ fontFamily: pairing.fonts.display }}
                  >
                    Display Headline Sample
                  </span>
                  <span 
                    className="text-xs text-slate-500 truncate"
                    style={{ fontFamily: pairing.fonts.body }}
                  >
                    Clean body text for property descriptions and details.
                  </span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {pairing.description}
                </p>
                <div className={cn(
                  "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
                  "bg-gradient-to-br from-white/20 to-transparent backdrop-blur-[2px]"
                )} />
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Trust Signal Note */}
      <div className="relative overflow-hidden bg-white border border-slate-200 rounded-2xl p-6 shadow-xl shadow-slate-200/50 flex items-start gap-4">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />
        <div className="bg-emerald-50 rounded-full p-2 shadow-inner">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
        </div>
        <div className="relative z-10 space-y-1">
          <h4 className="font-bold text-slate-900">Lagos Luxury Trust Guarantee</h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            These styles and fonts are scientifically optimized for high-conversion real estate marketing in Nigeria. No custom pickers are available to ensure your brand maintains international professional standards.
          </p>
        </div>
      </div>
    </div>
  );
};
