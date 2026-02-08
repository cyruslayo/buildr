'use client';
// Justification: Uses useState for feature selection and onClick handlers

import { useState } from 'react';
import { PROPERTY_FEATURES, type FeatureCategory } from '@/lib/constants/nigeria-constants';
import { cn } from '@/lib/utils';

interface FeaturesChecklistProps {
  onChange: (features: string[]) => void;
  selectedFeatures?: string[];
}

const CATEGORY_LABELS: Record<FeatureCategory, string> = {
  utilities: 'Utilities',
  security: 'Security',
  compound: 'Compound',
  interior: 'Interior',
  recreation: 'Recreation',
  access: 'Access',
  condition: 'Condition',
};

// Group features by category
const groupedFeatures = PROPERTY_FEATURES.reduce((acc, feature) => {
  const category = feature.category as FeatureCategory;
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(feature);
  return acc;
}, {} as Record<FeatureCategory, typeof PROPERTY_FEATURES[number][]>);

export function FeaturesChecklist({ onChange, selectedFeatures = [] }: FeaturesChecklistProps) {
  const handleToggle = (featureId: string) => {
    const newFeatures = selectedFeatures.includes(featureId)
      ? selectedFeatures.filter(id => id !== featureId)
      : [...selectedFeatures, featureId];
    onChange(newFeatures);
  };

  return (
    <div className="space-y-6">
      {Object.entries(groupedFeatures).map(([category, features]) => (
        <div key={category}>
          <h4 className="text-sm font-medium text-muted-foreground mb-3 capitalize">
            {CATEGORY_LABELS[category as FeatureCategory]}
          </h4>
          <div className="flex flex-wrap gap-2">
            {features.map((feature) => {
              const isSelected = selectedFeatures.includes(feature.id);
              return (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => handleToggle(feature.id)}
                  className={cn(
                    'px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all duration-300',
                    'hover:border-primary hover:shadow-sm',
                    'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                    isSelected
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-card text-foreground'
                  )}
                >
                  <span className="flex items-center gap-2">
                    {isSelected && (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {feature.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
