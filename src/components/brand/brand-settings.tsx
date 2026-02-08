/**
 * Brand Settings Component
 * BLDR-2UI-011: Brand customization for landing pages
 *
 * "use client" justification: Uses form inputs, onChange handlers, and state management
 */
'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Upload, Building2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/**
 * Available Google Fonts for brand customization
 */
export const FONT_OPTIONS = [
  { id: 'Inter', name: 'Inter', description: 'Clean and modern' },
  { id: 'Roboto', name: 'Roboto', description: 'Professional and readable' },
  { id: 'Outfit', name: 'Outfit', description: 'Contemporary geometric' },
  { id: 'Poppins', name: 'Poppins', description: 'Friendly and elegant' },
  { id: 'Playfair Display', name: 'Playfair Display', description: 'Luxury serif' },
] as const;

/**
 * Brand settings data structure
 */
export interface BrandSettingsData {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  companyName: string;
  logoUrl: string | null;
}

export interface BrandSettingsProps {
  /** Callback when any brand setting changes */
  onChange: (settings: BrandSettingsData) => void;
  /** Initial values for the brand settings */
  initialValues?: Partial<BrandSettingsData>;
}

const DEFAULT_SETTINGS: BrandSettingsData = {
  primaryColor: '#D4AF37', // Gold - Lagos luxury
  secondaryColor: '#1a1a2e', // Dark navy
  accentColor: '#F5D547', // Light gold
  fontFamily: 'Inter',
  companyName: '',
  logoUrl: null,
};

/**
 * BrandSettings - Customize brand colors, fonts, and identity
 *
 * Features:
 * - Color pickers for primary, secondary, accent colors
 * - Font family selector with Google Fonts
 * - Logo upload input
 * - Company name input
 * - Live brand color preview
 */
export function BrandSettings({ onChange, initialValues }: BrandSettingsProps) {
  const [settings, setSettings] = useState<BrandSettingsData>({
    ...DEFAULT_SETTINGS,
    ...initialValues,
  });

  // Emit changes to parent
  const handleChange = useCallback(
    (field: keyof BrandSettingsData, value: string | null) => {
      const newSettings = { ...settings, [field]: value };
      setSettings(newSettings);
      onChange(newSettings);
    },
    [settings, onChange]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-2 text-slate-400">
        <Palette className="h-5 w-5" />
        <span className="text-sm">Customize your brand identity</span>
      </div>

      {/* Color Pickers Section */}
      <Card className="border-slate-700 bg-slate-900/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-slate-200">Brand Colors</CardTitle>
          <CardDescription>Choose colors that represent your agency</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Primary Color */}
            <div className="space-y-2">
              <Label htmlFor="primary-color" className="text-slate-300">
                Primary Color
              </Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  id="primary-color"
                  value={settings.primaryColor}
                  onChange={(e) => handleChange('primaryColor', e.target.value)}
                  className="h-10 w-14 cursor-pointer rounded border border-slate-600 bg-transparent"
                />
                <Input
                  value={settings.primaryColor}
                  onChange={(e) => handleChange('primaryColor', e.target.value)}
                  className="flex-1 bg-slate-800 border-slate-600 text-slate-200"
                  placeholder="#D4AF37"
                />
              </div>
            </div>

            {/* Secondary Color */}
            <div className="space-y-2">
              <Label htmlFor="secondary-color" className="text-slate-300">
                Secondary Color
              </Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  id="secondary-color"
                  value={settings.secondaryColor}
                  onChange={(e) => handleChange('secondaryColor', e.target.value)}
                  className="h-10 w-14 cursor-pointer rounded border border-slate-600 bg-transparent"
                />
                <Input
                  value={settings.secondaryColor}
                  onChange={(e) => handleChange('secondaryColor', e.target.value)}
                  className="flex-1 bg-slate-800 border-slate-600 text-slate-200"
                  placeholder="#1a1a2e"
                />
              </div>
            </div>

            {/* Accent Color */}
            <div className="space-y-2">
              <Label htmlFor="accent-color" className="text-slate-300">
                Accent Color
              </Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  id="accent-color"
                  value={settings.accentColor}
                  onChange={(e) => handleChange('accentColor', e.target.value)}
                  className="h-10 w-14 cursor-pointer rounded border border-slate-600 bg-transparent"
                />
                <Input
                  value={settings.accentColor}
                  onChange={(e) => handleChange('accentColor', e.target.value)}
                  className="flex-1 bg-slate-800 border-slate-600 text-slate-200"
                  placeholder="#F5D547"
                />
              </div>
            </div>
          </div>

          {/* Brand Preview */}
          <div className="pt-4">
            <Label className="text-slate-300 mb-2 block">Preview</Label>
            <div
              data-testid="brand-preview"
              className="flex gap-2 p-4 rounded-lg border border-slate-600"
              style={{ backgroundColor: settings.secondaryColor }}
            >
              <div
                className="h-12 w-12 rounded-md shadow-lg"
                style={{ backgroundColor: settings.primaryColor }}
              />
              <div
                className="h-12 w-12 rounded-md shadow-lg"
                style={{ backgroundColor: settings.secondaryColor }}
              />
              <div
                className="h-12 w-12 rounded-md shadow-lg"
                style={{ backgroundColor: settings.accentColor }}
              />
              <div className="flex-1 flex items-center justify-center">
                <span
                  className="text-sm font-medium"
                  style={{ color: settings.primaryColor }}
                >
                  {settings.companyName || 'Your Brand'}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Typography Section */}
      <Card className="border-slate-700 bg-slate-900/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-slate-200">Typography</CardTitle>
          <CardDescription>Select your brand font family</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="font-family" className="text-slate-300">
              Font Family
            </Label>
            <Select
              value={settings.fontFamily}
              onValueChange={(value) => handleChange('fontFamily', value)}
            >
              <SelectTrigger
                id="font-family"
                className="bg-slate-800 border-slate-600 text-slate-200"
              >
                <SelectValue placeholder="Select font" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                {FONT_OPTIONS.map((font) => (
                  <SelectItem
                    key={font.id}
                    value={font.id}
                    className="text-slate-200 focus:bg-slate-700"
                  >
                    <div className="flex flex-col">
                      <span style={{ fontFamily: font.id }}>{font.name}</span>
                      <span className="text-xs text-slate-400">{font.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Company Identity Section */}
      <Card className="border-slate-700 bg-slate-900/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-slate-200 flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Company Identity
          </CardTitle>
          <CardDescription>Your agency branding details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="company-name" className="text-slate-300">
              Company Name
            </Label>
            <Input
              id="company-name"
              value={settings.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              placeholder="Lagos Prime Realty"
              className="bg-slate-800 border-slate-600 text-slate-200"
            />
          </div>

          {/* Logo Upload */}
          <div className="space-y-2">
            <Label htmlFor="logo-upload" className="text-slate-300">
              Upload Logo
            </Label>
            <div className="flex items-center gap-4">
              <label
                htmlFor="logo-upload"
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-600 rounded-md cursor-pointer hover:bg-slate-700 transition-colors"
              >
                <Upload className="h-4 w-4 text-slate-400" />
                <span className="text-slate-300 text-sm">Choose file</span>
              </label>
              <input
                type="file"
                id="logo-upload"
                accept="image/*"
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    // For now, create object URL; in production would upload to storage
                    const url = URL.createObjectURL(file);
                    handleChange('logoUrl', url);
                  }
                }}
              />
              {settings.logoUrl && (
                <img
                  src={settings.logoUrl}
                  alt="Logo preview"
                  className="h-10 w-10 object-contain rounded"
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
