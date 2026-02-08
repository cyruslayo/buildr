'use client';

import React from 'react';
import { BigInput } from '../big-input';
import { Label } from '@/components/ui/label';
import { useWizardStore } from '../../store/wizard-store';

export function TitleStep() {
  const { propertyData, updatePropertyData } = useWizardStore();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Give your listing a name</h2>
        <p className="text-muted-foreground">Catchy titles sell faster in Victoria Island and Ikoyi.</p>
      </div>

      <div className="space-y-4">
        <Label htmlFor="title-input" className="block text-center text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
          Property Title
        </Label>
        <BigInput
          id="title-input"
          placeholder="e.g. Luxury 4 Bedroom Semi-Detached Duplex"
          value={propertyData.title || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => updatePropertyData({ title: e.target.value })}
          data-testid="title-input"
        />
      </div>
      
      <div className="text-center text-xs text-muted-foreground/50 uppercase tracking-widest">
        Maximum impact, minimum words.
      </div>
    </div>
  );
}
