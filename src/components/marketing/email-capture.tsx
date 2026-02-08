'use client';
// Justification: Uses useState for form state and fetch for API call

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Loader2, CheckCircle, ArrowRight } from 'lucide-react';

interface EmailCaptureProps {
  source?: string;
  className?: string;
}

export function EmailCapture({ source = 'landing', className }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to subscribe');
      }

      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  if (status === 'success') {
    return (
      <div className={cn('flex items-center gap-2 text-green-500', className)}>
        <CheckCircle className="w-5 h-5" />
        <span className="font-medium">You&apos;re on the list! We&apos;ll be in touch.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn('flex flex-col sm:flex-row gap-3', className)}>
      <div className="flex-1">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={status === 'loading'}
          className={cn(
            'w-full px-4 py-3 rounded-lg border-2 bg-background',
            'text-foreground placeholder:text-muted-foreground',
            'transition-all duration-300',
            'focus:outline-none focus:ring-2 focus:ring-primary/20',
            status === 'error'
              ? 'border-destructive focus:border-destructive'
              : 'border-border hover:border-primary/50 focus:border-primary'
          )}
        />
        {status === 'error' && (
          <p className="mt-1 text-sm text-destructive">{errorMessage}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className={cn(
          'px-6 py-3 rounded-lg font-medium',
          'bg-primary text-primary-foreground',
          'transition-all duration-300',
          'hover:bg-primary/90',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'flex items-center justify-center gap-2'
        )}
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Joining...
          </>
        ) : (
          <>
            Get Early Access
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
