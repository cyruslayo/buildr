'use client';

/**
 * Wizard Container
 * 
 * Wraps the GuidedWizard and handles the generation flow.
 * Uses server actions to create projects and redirect to preview.
 * 
 * "use client" justification: Uses useState for loading state, 
 * calls server action, and handles client-side navigation.
 */

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { GuidedWizard } from './guided-wizard';
import { generateProjectAction } from '@/app/actions/generate';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import type { WizardData } from '@/lib/templates/generator';

interface WizardContainerProps {
  /** Optional callback after successful generation */
  onSuccess?: (projectId: string) => void;
}

export function WizardContainer({ onSuccess }: WizardContainerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<'idle' | 'generating' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleComplete = async (data: WizardData) => {
    setStatus('generating');
    setError(null);

    startTransition(async () => {
      try {
        const result = await generateProjectAction(data);

        if (result.success && result.previewUrl) {
          setStatus('success');
          
          // Call optional callback
          if (onSuccess && result.projectId) {
            onSuccess(result.projectId);
          }

          // Navigate to preview after short delay for feedback
          setTimeout(() => {
            router.push(result.previewUrl!);
          }, 1000);
        } else {
          setStatus('error');
          setError(result.error || 'Failed to generate project');
        }
      } catch (err) {
        setStatus('error');
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      }
    });
  };

  // Show generating overlay
  if (status === 'generating' || status === 'success') {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-card p-8 rounded-2xl shadow-2xl border text-center max-w-md mx-4">
          {status === 'generating' ? (
            <>
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <Loader2 className="absolute inset-0 m-auto w-8 h-8 text-primary animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Generating Your Page</h2>
              <div className="space-y-3 text-left mb-4">
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-muted-foreground">Validating your data...</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                  <span>Selecting best template...</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="w-4 h-4 rounded-full border-2 border-muted" />
                  <span>Saving to dashboard...</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                This usually takes a few seconds
              </p>
            </>
          ) : (
            <>
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 bg-green-500/10 rounded-full animate-ping" />
                <CheckCircle className="relative w-20 h-20 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Page Created!</h2>
              <p className="text-muted-foreground mb-4">
                Your landing page is ready
              </p>
              <p className="text-sm text-primary animate-pulse">
                Redirecting to preview...
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Error Toast */}
      {status === 'error' && error && (
        <div className="fixed top-4 right-4 z-50 bg-destructive text-destructive-foreground px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-top-2">
          <XCircle className="w-5 h-5" />
          <div>
            <p className="font-medium">Generation Failed</p>
            <p className="text-sm opacity-90">{error}</p>
          </div>
          <button 
            onClick={() => setStatus('idle')}
            className="ml-4 text-sm underline hover:no-underline"
          >
            Dismiss
          </button>
        </div>
      )}

      <GuidedWizard onComplete={handleComplete} />
    </div>
  );
}
