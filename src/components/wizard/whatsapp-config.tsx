'use client';
// Justification: Uses useState for form inputs and validation state

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface WhatsAppConfigData {
  number: string;
  message: string;
  showFloating: boolean;
  rcNumber?: string; // CAC Registration Number for Nigerian trust
}

interface WhatsAppConfigProps {
  onChange: (data: WhatsAppConfigData) => void;
  initialData?: Partial<WhatsAppConfigData>;
}

const DEFAULT_MESSAGE = "Hello! I'm interested in this property.";

// Validate Nigerian phone number (starts with 0, 11 digits)
function validateNigerianPhone(phone: string): boolean {
  const cleaned = phone.replace(/\s/g, '');
  // Nigerian numbers: 070, 080, 081, 090, 091, etc followed by 8 digits
  return /^0[789][01]\d{8}$/.test(cleaned);
}

export function WhatsAppConfig({ onChange, initialData }: WhatsAppConfigProps) {
  const [number, setNumber] = useState(initialData?.number || '');
  const [message, setMessage] = useState(initialData?.message || DEFAULT_MESSAGE);
  const [showFloating, setShowFloating] = useState(initialData?.showFloating ?? true);
  const [rcNumber, setRcNumber] = useState(initialData?.rcNumber || '');
  const [touched, setTouched] = useState(false);
  
  const isValid = validateNigerianPhone(number);
  const showError = touched && number.length > 0 && !isValid;

  // Call onChange only when values actually change from user input
  const handleNumberChange = (value: string) => {
    setNumber(value);
    onChange({ number: value, message, showFloating, rcNumber });
  };

  const handleMessageChange = (value: string) => {
    setMessage(value);
    onChange({ number, message: value, showFloating, rcNumber });
  };

  const handleFloatingToggle = () => {
    const newValue = !showFloating;
    setShowFloating(newValue);
    onChange({ number, message, showFloating: newValue, rcNumber });
  };

  const handleRcNumberChange = (value: string) => {
    setRcNumber(value);
    onChange({ number, message, showFloating, rcNumber: value });
  };

  return (
    <div className="space-y-6">
      {/* Phone Number */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          WhatsApp Number
        </label>
        <div className="flex items-center gap-2">
          <span className="px-3 py-3 rounded-lg border-2 border-border bg-muted text-muted-foreground font-medium">
            +234
          </span>
          <input
            type="tel"
            inputMode="numeric"
            value={number}
            onChange={(e) => handleNumberChange(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="08012345678"
            className={cn(
              'flex-1 px-4 py-3 rounded-lg border-2 bg-background',
              'text-foreground font-medium',
              'transition-all duration-300',
              'focus:outline-none focus:ring-2 focus:ring-primary/20',
              showError
                ? 'border-destructive focus:border-destructive'
                : 'border-border hover:border-primary/50 focus:border-primary'
            )}
          />
        </div>
        {showError && (
          <p className="mt-1 text-sm text-destructive">
            Invalid Nigerian phone number
          </p>
        )}
      </div>

      {/* Pre-filled Message */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Pre-filled Message
        </label>
        <textarea
          value={message}
          onChange={(e) => handleMessageChange(e.target.value)}
          placeholder="I'm interested in this property..."
          rows={3}
          className={cn(
            'w-full px-4 py-3 rounded-lg border-2 border-border bg-background',
            'text-foreground',
            'transition-all duration-300',
            'hover:border-primary/50',
            'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20',
            'resize-none'
          )}
        />
      </div>

      {/* Floating Button Toggle */}
      <div className="flex items-center justify-between">
        <label htmlFor="floating-toggle" className="text-sm font-medium text-foreground">
          Show floating WhatsApp button
        </label>
        <button
          id="floating-toggle"
          type="button"
          role="switch"
          aria-checked={showFloating}
          aria-label="Show floating WhatsApp button"
          onClick={handleFloatingToggle}
          className={cn(
            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300',
            showFloating ? 'bg-primary' : 'bg-muted'
          )}
        >
          <span
            className={cn(
              'inline-block h-4 w-4 rounded-full bg-white transition-transform duration-300',
              showFloating ? 'translate-x-6' : 'translate-x-1'
            )}
          />
        </button>
      </div>

      {/* RC Number (Nigerian Trust Signal) */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          RC Number <span className="text-muted-foreground font-normal">(Optional)</span>
        </label>
        <input
          type="text"
          value={rcNumber}
          onChange={(e) => handleRcNumberChange(e.target.value)}
          placeholder="RC 123456"
          className={cn(
            'w-full px-4 py-3 rounded-lg border-2 border-border bg-background',
            'text-foreground font-medium',
            'transition-all duration-300',
            'hover:border-primary/50',
            'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20'
          )}
        />
        <p className="mt-1 text-xs text-muted-foreground">
          CAC registration number builds trust with Nigerian buyers
        </p>
      </div>

      {/* Preview */}
      {number && isValid && (
        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
          <p className="text-sm text-muted-foreground mb-1">WhatsApp Link Preview:</p>
          <a 
            href={`https://wa.me/234${number.replace(/^0/, '')}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-green-600 hover:underline break-all"
          >
            wa.me/234{number.replace(/^0/, '')}
          </a>
        </div>
      )}
    </div>
  );
}
