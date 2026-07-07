'use client';

import React from 'react';
import { useWizardStore } from '../../store/wizard-store';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const MAX_DESCRIPTION_LENGTH = 2000;

export function DescriptionStep() {
  const { propertyData, updatePropertyData } = useWizardStore();
  const [localDescription, setLocalDescription] = React.useState((propertyData.description as string) || '');

  // Sync local state from store when it changes externally (e.g. hydration or navigation)
  React.useEffect(() => {
    if (propertyData.description !== undefined && propertyData.description !== localDescription) {
      setLocalDescription(propertyData.description as string);
    }
  }, [propertyData.description]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (localDescription !== propertyData.description) {
        updatePropertyData({ description: localDescription });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localDescription, updatePropertyData, propertyData.description]);

  const characterCount = localDescription.length;
  const isNearLimit = characterCount > MAX_DESCRIPTION_LENGTH * 0.8;
  const isVeryNearLimit = characterCount > MAX_DESCRIPTION_LENGTH * 0.9;

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
            onChange={(e) => setLocalDescription(e.target.value)}
            maxLength={MAX_DESCRIPTION_LENGTH}
            aria-describedby="description-counter"
            className="min-h-[200px] text-lg p-5 pb-12 border-2 border-primary/10 focus:border-primary transition-all duration-300 bg-background/50 rounded-xl resize-none"
          />
          <div
            id="description-counter"
            aria-live="polite"
            className={cn(
              "absolute bottom-4 right-5 text-xs font-medium transition-colors duration-200",
              isVeryNearLimit ? "text-destructive" : isNearLimit ? "text-amber-500" : "text-muted-foreground/60"
            )}
          >
            {characterCount.toLocaleString()} / {MAX_DESCRIPTION_LENGTH.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-muted-foreground/50 uppercase tracking-widest">
        Good copy increases conversion by 40% in Ikoyi/VI.
      </div>
    </div>
  );
}
