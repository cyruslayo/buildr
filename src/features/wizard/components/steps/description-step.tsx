'use client';

import React from 'react';
import { useWizardStore } from '../../store/wizard-store';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export function DescriptionStep() {
  const { propertyData, updatePropertyData } = useWizardStore();
  const [localDescription, setLocalDescription] = React.useState((propertyData.description as string) || '');

  const MAX_LENGTH = 2000;
  const characterCount = localDescription.length;
  const isWarning = characterCount > MAX_LENGTH * 0.8;
  const isDanger = characterCount > MAX_LENGTH * 0.9;

  // Sync from store to local state
  React.useEffect(() => {
    if (propertyData.description !== undefined && propertyData.description !== localDescription) {
      setLocalDescription(propertyData.description as string);
    }
  }, [propertyData.description]);

  // Debounced sync from local state to store
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (localDescription !== propertyData.description) {
        updatePropertyData({ description: localDescription });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localDescription, updatePropertyData, propertyData.description]);

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
            maxLength={MAX_LENGTH}
            className="min-h-[240px] text-lg p-5 pb-12 border-2 border-primary/10 focus:border-primary transition-all duration-300 bg-background/50 rounded-xl resize-none"
            aria-describedby="char-count"
          />
          <div
            id="char-count"
            aria-live="polite"
            className={cn(
              "absolute bottom-4 right-4 text-xs font-medium transition-colors duration-200",
              isDanger ? "text-destructive" : isWarning ? "text-amber-500" : "text-muted-foreground"
            )}
          >
            {characterCount.toLocaleString()} / {MAX_LENGTH.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-muted-foreground/50 uppercase tracking-widest">
        Good copy increases conversion by 40% in Ikoyi/VI.
      </div>
    </div>
  );
}
