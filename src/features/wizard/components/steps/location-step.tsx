'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { BigInput } from '../big-input';
import { useWizardStore } from '../../store/wizard-store';

export function LocationStep() {
  const { propertyData, updatePropertyData } = useWizardStore();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Where is the property?</h2>
        <p className="text-muted-foreground">Be specific about the estate or neighborhood.</p>
      </div>

      <div className="space-y-4">
        <Label htmlFor="location-input" className="block text-center text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
          Property Location
        </Label>
        <BigInput
          id="location-input"
          placeholder="e.g. Lekki Phase 1, Lagos"
          value={propertyData.location || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePropertyData({ location: e.target.value })}
          data-testid="location-input"
        />
      </div>

      <div className="text-center text-xs text-muted-foreground/50 uppercase tracking-widest">
        Precise location builds trust.
      </div>
    </div>
  );
}
