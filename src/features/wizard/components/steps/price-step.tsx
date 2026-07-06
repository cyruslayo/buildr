'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { BigInput } from '../big-input';
import { useWizardStore } from '../../store/wizard-store';
import { formatNumberWithCommas, parseNumericValue, formatPriceMagnitude } from '@/lib/formatters';

export function PriceStep() {
  const { propertyData, updatePropertyData } = useWizardStore();

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = parseNumericValue(e.target.value);
    // Sanity check: prevent extremely large numbers (> 1 Billion)
    if (rawValue.length > 12) return; 
    
    const numericValue = rawValue === '' ? 0 : parseInt(rawValue, 10);
    updatePropertyData({ price: numericValue });
  };

  const displayValue = propertyData.price ? formatNumberWithCommas(propertyData.price) : '';
  const magnitudeLabel = propertyData.price ? formatPriceMagnitude(propertyData.price) : '';

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Set your price</h2>
        <p className="text-muted-foreground">Always specify in Naira (₦) for Nigerian buyers.</p>
      </div>

      <div className="space-y-4">
        <Label htmlFor="price-input" className="block text-center text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
          Asking Price
        </Label>
        <BigInput
          id="price-input"
          prefix="₦"
          placeholder="e.g. 150,000,000"
          value={displayValue}
          onChange={handlePriceChange}
          inputMode="numeric"
          aria-describedby="price-magnitude"
          data-testid="price-input"
        />

        {/* Magnitude Confirmation Label */}
        <div className="h-8 -mt-4 flex justify-center items-start">
          {magnitudeLabel && (
            <span
              id="price-magnitude"
              className="text-emerald-500 font-bold uppercase tracking-[0.2em] text-[10px] animate-in fade-in zoom-in-95 duration-500"
              aria-live="polite"
            >
              {magnitudeLabel}
            </span>
          )}
        </div>
      </div>

      <div className="text-center text-xs text-muted-foreground/50 uppercase tracking-widest">
        Competitive pricing targets the right leads.
      </div>
    </div>
  );
}
