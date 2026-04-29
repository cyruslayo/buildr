'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { BigInput } from '../big-input';
import { useWizardStore } from '../../store/wizard-store';
import { formatNumberWithCommas, parseNumericValue, formatCurrencyShorthand } from '@/lib/formatters';

export function PriceStep() {
  const { propertyData, updatePropertyData } = useWizardStore();

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = parseNumericValue(e.target.value);
    // Sanity check: prevent extremely large numbers (> 1 Trillion)
    if (rawValue.length > 12) return; 
    
    const numericValue = rawValue === '' ? 0 : parseInt(rawValue, 10);
    updatePropertyData({ price: numericValue });
  };

  const displayValue = propertyData.price ? formatNumberWithCommas(propertyData.price) : '';
  const shorthandValue = propertyData.price && Number(propertyData.price) >= 1000
    ? formatCurrencyShorthand(Number(propertyData.price))
    : null;

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
        <div className="relative">
          <BigInput
            id="price-input"
            prefix="₦"
            placeholder="e.g. 150,000,000"
            value={displayValue}
            onChange={handlePriceChange}
            inputMode="numeric"
            data-testid="price-input"
          />

          <div className="absolute -bottom-4 left-0 right-0 flex justify-center overflow-hidden h-6" aria-live="polite">
            <AnimatePresence mode="wait">
              {shorthandValue && (
                <motion.p
                  key={shorthandValue}
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  className="text-emerald-600 font-bold text-sm tracking-wide"
                >
                  {shorthandValue}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-muted-foreground/50 uppercase tracking-widest pt-2">
        Competitive pricing targets the right leads.
      </div>
    </div>
  );
}
