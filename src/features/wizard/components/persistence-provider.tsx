'use client';

import React from 'react';
import { useWizardStore } from '../store/wizard-store';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useWizardSync } from '../hooks/use-wizard-sync';

interface PersistenceProviderProps {
  children: React.ReactNode;
}

export function PersistenceProvider({ children }: PersistenceProviderProps) {
  const hasHydrated = useWizardStore((state) => state.hasHydrated);
  const storageError = useWizardStore((state) => state.storageError);

  // Initialize background sync
  useWizardSync();

  // Prevent hydration flicker by showing a subtle loading state 
  // until the store has successfully rehydrated from localStorage.
  if (!hasHydrated) {
    return (
      <div className="flex items-center justify-center p-24 min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
          <div className="animate-pulse text-muted-foreground uppercase tracking-widest text-xs font-semibold">
            Restoring your draft...
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {storageError && (
        <div className="fixed top-4 right-4 z-[100] max-w-md animate-in fade-in slide-in-from-top-4 duration-300">
          <Alert variant="destructive" className="bg-destructive text-destructive-foreground shadow-2xl">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Storage Warning</AlertTitle>
            <AlertDescription>{storageError}</AlertDescription>
          </Alert>
        </div>
      )}
      {children}
    </>
  );
}
