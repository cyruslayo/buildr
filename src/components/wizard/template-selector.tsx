/**
 * Template Selector Component
 * BLDR-2WIZ-002: Template gallery with category filtering
 * 
 * "use client" justification: Uses onClick handlers for selection,
 * state for category filtering, and hover interactions
 */
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check, Sparkles, Home, Building } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import type { TemplateDefinition, TemplateCategory } from '@/lib/templates';

type CategoryFilter = TemplateCategory | 'all';

export interface TemplateSelectorProps {
  /** All available templates */
  templates: TemplateDefinition[];
  /** Callback when a template is selected */
  onSelect: (templateId: string) => void;
  /** Currently selected template ID */
  selectedId: string | null;
}

const categoryIcons: Record<CategoryFilter, React.ReactNode> = {
  all: <Sparkles className="h-4 w-4" />,
  luxury: <Sparkles className="h-4 w-4" />,
  standard: <Home className="h-4 w-4" />,
  land: <Building className="h-4 w-4" />,
  agent: <Building className="h-4 w-4" />,
  shortlet: <Building className="h-4 w-4" />,
  estate: <Building className="h-4 w-4" />,
};

const categoryLabels: Record<CategoryFilter, string> = {
  all: 'All',
  luxury: 'Luxury',
  standard: 'Standard',
  land: 'Land',
  agent: 'Agent',
  shortlet: 'Short-Let',
  estate: 'Estate',
};

/**
 * Internal component to handle template thumbnail with error fallback
 * to preserve the background gradient and icon.
 */
function TemplateThumbnail({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  // Reset error state if src changes
  useEffect(() => {
    setError(false);
  }, [src]);

  if (error) return null;

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      onError={() => setError(true)}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}

/**
 * TemplateSelector - Gallery grid with category filtering
 * 
 * Features:
 * - Asymmetric grid layout (per design rules)
 * - Category filter tabs
 * - Hover effects with preview
 * - Selection ring highlight
 */
export function TemplateSelector({
  templates,
  onSelect,
  selectedId,
}: TemplateSelectorProps) {
  const [category, setCategory] = useState<CategoryFilter>('all');

  // Get unique categories from templates
  const availableCategories = ['all', ...new Set(templates.map(t => t.category))] as CategoryFilter[];

  // Filter templates by selected category
  const filteredTemplates = category === 'all' 
    ? templates 
    : templates.filter(t => t.category === category);

  return (
    <div className="space-y-6">
      {/* Category Filter Tabs */}
      <Tabs value={category} onValueChange={(v) => setCategory(v as CategoryFilter)}>
        <TabsList className="grid w-full grid-cols-3 lg:flex lg:w-auto lg:gap-2">
          {availableCategories.map((cat) => (
            <TabsTrigger
              key={cat}
              value={cat}
              className="gap-2 capitalize"
            >
              {categoryIcons[cat]}
              {categoryLabels[cat]}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Template Grid - Asymmetric per design rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template, index) => {
          const isSelected = template.id === selectedId;
          
          return (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Card
                data-testid={`template-card-${template.id}`}
                data-selected={isSelected}
                className={`
                  relative cursor-pointer transition-all duration-300
                  hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10
                  ${isSelected 
                    ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' 
                    : 'hover:border-primary/50'
                  }
                `}
              >
                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute -top-2 -right-2 z-10 bg-primary rounded-full p-1">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}

                {/* Thumbnail placeholder */}
                <div className="relative h-40 bg-gradient-to-br from-slate-800 to-slate-900 rounded-t-lg overflow-hidden">
                  {template.thumbnail ? (
                    <TemplateThumbnail
                      src={template.thumbnail}
                      alt={template.name}
                    />
                  ) : null}
                  <div className="absolute inset-0 flex items-center justify-center text-slate-600">
                    {categoryIcons[template.category]}
                  </div>
                  {/* Category badge */}
                  <Badge 
                    variant="secondary" 
                    className="absolute top-2 left-2 capitalize"
                  >
                    {template.category}
                  </Badge>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">
                    {template.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <button
                    onClick={() => onSelect(template.id)}
                    className="w-full py-2 px-4 bg-primary/10 hover:bg-primary/20 
                             text-primary font-medium rounded-md transition-colors
                             focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-label={`Select ${template.name} template`}
                  >
                    {isSelected ? 'Selected' : 'Select Template'}
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Empty state */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No templates found in this category.</p>
        </div>
      )}
    </div>
  );
}
