'use client';

import React from 'react';
import { useWizardStore } from '../../store/wizard-store';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export function DescriptionStep() {
  const { propertyData, updatePropertyData } = useWizardStore();
  const [localDescription, setLocalDescription] = React.useState((propertyData.description as string) || '');

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (localDescription !== propertyData.description) {
        updatePropertyData({ description: localDescription });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localDescription, updatePropertyData, propertyData.description]);

  const maxLength = 2000;
  const characterCount = localDescription.length;
  const isAmber = characterCount >= maxLength * 0.8;
  const isDestructive = characterCount >= maxLength * 0.9;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Property Description</h2>
        <p className="text-muted-foreground">Tell the full story. Detail the luxury, security, and location advantages.</p>
      </div>

      <div className="space-y-4">
        <Label htmlFor="property-description" className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Describe the property
        </Label>
        <div className="relative">
          <Textarea
            id="property-description"
            placeholder="e.g. Describe this luxury semi-detached duplex in Lekki Phase 1, Ikoyi, or Victoria Island. Mention the premium finishes, proximity to Admiralty Way, and the spacious BQ..."
            value={localDescription}
            onChange={(e) => {
              if (e.target.value.length <= maxLength) {
                setLocalDescription(e.target.value);
              }
            }}
            maxLength={maxLength}
            className="min-h-[200px] text-lg p-5 pb-12 border-2 border-primary/10 focus:border-primary transition-all duration-300 bg-background/50 rounded-xl resize-none"
          />
          <div
            className={`absolute bottom-4 right-4 text-xs font-medium tracking-tight transition-colors duration-200 ${
              isDestructive
                ? 'text-destructive'
                : isAmber
                ? 'text-amber-500'
                : 'text-muted-foreground'
            }`}
            aria-live="polite"
          >
            {characterCount.toLocaleString()} / {maxLength.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-muted-foreground/50 uppercase tracking-widest">
        Good copy increases conversion by 40% in Ikoyi/VI.
      </div>
    </div>
  );
}
