'use client';
// Justification: Required for useState, keyboard event handling, and form interactivity

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Send } from 'lucide-react';

export interface PromptInputProps {
  onSubmit: (value: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  maxLength?: number;
  className?: string;
}

export function PromptInput({
  onSubmit,
  isLoading = false,
  placeholder = 'Describe your property or request content enhancement...',
  maxLength = 2000,
  className,
}: PromptInputProps) {
  const [value, setValue] = React.useState('');
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleSubmit = React.useCallback(() => {
    const trimmedValue = value.trim();
    if (!trimmedValue || isLoading) return;
    
    onSubmit(trimmedValue);
    setValue('');
  }, [value, isLoading, onSubmit]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Submit on Ctrl+Enter or Cmd+Enter
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      if (newValue.length <= maxLength) {
        setValue(newValue);
      }
    },
    [maxLength]
  );

  // Auto-resize textarea
  React.useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [value]);

  const characterCount = value.length;
  const isNearLimit = characterCount > maxLength * 0.8;

  return (
    <div className={cn('relative w-full', className)}>
      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading}
          className={cn(
            'min-h-[80px] resize-none pr-14 pb-8',
            'transition-all duration-300',
            'focus:ring-2 focus:ring-primary/20',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          rows={3}
        />
        
        {/* Submit Button */}
        <Button
          type="button"
          size="icon"
          onClick={handleSubmit}
          disabled={isLoading || !value.trim()}
          className={cn(
            'absolute right-2 top-2',
            'h-9 w-9',
            'transition-all duration-300',
            'hover:scale-105'
          )}
          aria-label="Enhance content"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>

        {/* Character Count */}
        <div
          className={cn(
            'absolute bottom-2 right-2 text-xs',
            'transition-colors duration-200',
            isNearLimit ? 'text-amber-500' : 'text-muted-foreground',
            characterCount >= maxLength && 'text-destructive'
          )}
        >
          {characterCount}/{maxLength}
        </div>
      </div>

      {/* Keyboard Hint */}
      <div className="mt-1 text-xs text-muted-foreground">
        Press <kbd className="px-1 py-0.5 rounded bg-muted text-muted-foreground">Ctrl</kbd> + <kbd className="px-1 py-0.5 rounded bg-muted text-muted-foreground">Enter</kbd> to submit
      </div>
    </div>
  );
}
