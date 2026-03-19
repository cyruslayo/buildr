'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { BigInput } from '../big-input';
import { useWizardStore } from '../../store/wizard-store';
import { formatNumberWithCommas, parseNumericValue, formatCurrencyShorthand } from '@/lib/formatters';
import { motion, AnimatePresence } from 'framer-motion';

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
          <div className="absolute left-0 right-0 -bottom-2 flex justify-center h-6" aria-live="polite">
            <AnimatePresence mode="popLayout">
              {Number(propertyData.price) >= 1000 ? (
                <motion.span
                  key={propertyData.price}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-primary font-medium text-sm"
                >
                  {formatCurrencyShorthand(Number(propertyData.price))}
                </motion.span>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-muted-foreground/50 uppercase tracking-widest">
        Competitive pricing targets the right leads.
      </div>
    </div>
  );
}
