'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface BigInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  prefix?: string;
}

export function BigInput({ className, prefix, id, ...props }: BigInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus on mount for "Spacious Mode" feel
    inputRef.current?.focus();
  }, []);

  return (
    <div className="relative w-full flex items-center justify-center py-10">
      {prefix && (
        <span className="text-[42px] font-bold text-muted-foreground/50 mr-2 select-none">
          {prefix}
        </span>
      )}
      <input
        ref={inputRef}
        id={id}
        className={cn(
          "w-full bg-transparent text-[32px] md:text-[42px] font-bold text-center",
          "border-b-2 border-primary/20 border-t-0 border-x-0 outline-none",
          "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-500",
          "placeholder:text-muted-foreground/30",
          className
        )}
        aria-label={props.placeholder || 'Property field input'}
        data-testid="big-input"
        {...props}
      />
    </div>
  );
}
