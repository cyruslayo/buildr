'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCcw, AlertTriangle } from 'lucide-react';

/**
 * Error boundary for the Dashboard feature.
 * Provides "Lagos Luxury" styled error state with recovery.
 * (Required by Project Context #70)
 */
export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service (Epic 6 related)
    console.error('Dashboard Error:', error);
  }, [error]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <div className="flex flex-col items-center justify-center bg-white p-12 rounded-3xl shadow-premium border border-slate-100">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>
        
        <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
          Wait, something went wrong.
        </h2>
        
        <p className="text-slate-500 max-w-md mx-auto mb-8">
          We encountered a temporary issue while loading your property portfolio. 
          Our team has been notified.
        </p>

        <Button 
          onClick={() => reset()}
          className="h-12 px-8 rounded-full shadow-premium hover:shadow-premium-hover transition-all"
        >
          <RefreshCcw className="mr-2 h-5 w-5" />
          Try Again
        </Button>
      </div>
    </div>
  );
}
