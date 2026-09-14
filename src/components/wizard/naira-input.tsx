'use client';
// Justification: Uses useState for input value formatting and onChange handlers

import { useId } from 'react';
import { cn } from '@/lib/utils';

interface NairaInputProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  className?: string;
}

function formatWithCommas(num: number): string {
  if (num === 0) return '';
  return num.toLocaleString('en-NG');
}

function parseNumericValue(str: string): number {
  // Remove non-numeric characters except for the string itself
  const cleaned = str.replace(/[^0-9]/g, '');
  if (!cleaned) return 0;
  return parseInt(cleaned, 10);
}

function formatMagnitude(num: number): string {
  if (!num || num < 1000) return '';
  if (num >= 1000000000) {
    const val = num / 1000000000;
    return `${val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)} Billion Naira`;
  }
  if (num >= 1000000) {
    const val = num / 1000000;
    return `${val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)} Million Naira`;
  }
  const val = num / 1000;
  return `${val % 1 === 0 ? val.toFixed(0) : val.toFixed(1)} Thousand Naira`;
}

export function NairaInput({ value, onChange, placeholder = '0', className }: NairaInputProps) {
  const magnitudeId = useId();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = parseNumericValue(e.target.value);
    onChange(numericValue);
  };

  const magnitudeText = formatMagnitude(value);

  return (
    <div className={cn('w-full', className)}>
      <div className="relative flex items-center">
        {/* Naira prefix */}
        <span className="absolute left-3 text-lg font-semibold text-muted-foreground pointer-events-none">
          ₦
        </span>

        <input
          type="text"
          inputMode="numeric"
          value={formatWithCommas(value)}
          onChange={handleChange}
          placeholder={placeholder}
          aria-describedby={magnitudeText ? magnitudeId : undefined}
          className={cn(
            'w-full pl-8 pr-4 py-3 rounded-lg border-2 border-border bg-background',
            'text-lg font-medium text-foreground',
            'transition-all duration-300',
            'hover:border-primary/50',
            'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20',
            'placeholder:text-muted-foreground'
          )}
        />
      </div>
      <div className="h-5 mt-1">
        {magnitudeText && (
          <p
            id={magnitudeId}
            className="text-xs font-medium uppercase tracking-wider text-emerald-600 transition-opacity duration-200"
          >
            {magnitudeText}
          </p>
        )}
      </div>
    </div>
  );
}
