'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWizardNavigation } from '../hooks/use-wizard-navigation';
import { useWizardStore } from '../store/wizard-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CloudCheck, CloudUpload, CloudAlert, ChevronLeft, ChevronRight } from 'lucide-react';

interface WizardShellProps {
  children: React.ReactNode;
}

export function WizardShell({ children }: WizardShellProps) {
  const { currentStep, currentIndex, nextStep, previousStep, isFirstStep, isLastStep, steps } = useWizardNavigation();
  const progress = ((currentIndex + 1) / steps.length) * 100;

  const { syncStatus, lastSyncedAt } = useWizardStore();

  return (
    <div className="container max-w-2xl mx-auto p-4 min-h-[100dvh] flex flex-col justify-center">
      <Card className="shadow-2xl border-primary/10 overflow-hidden">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold capitalize tracking-tight">
              {currentStep.replace('-', ' ')}
            </CardTitle>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <AnimatePresence mode="wait">
                {syncStatus === 'syncing' ? (
                  <motion.div
                    key="syncing"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center gap-2"
                  >
                    <CloudUpload className="w-4 h-4 animate-bounce" />
                    <span>Syncing...</span>
                  </motion.div>
                ) : syncStatus === 'error' ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center gap-2 text-destructive"
                  >
                    <CloudAlert className="w-4 h-4" />
                    <span>Sync Error</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="synced"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center gap-2"
                  >
                    <CloudCheck className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] uppercase font-bold tracking-tighter opacity-70">
                      {lastSyncedAt ? `Synced ${new Date(lastSyncedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Draft Saved'}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <Progress value={progress} className="h-2 transition-all duration-500 ease-in-out" />
        </CardHeader>

        <CardContent className="relative min-h-[300px] py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="w-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </CardContent>

        <CardFooter className="flex justify-between border-t bg-muted/30 p-6">
          <Button
            variant="ghost"
            onClick={previousStep}
            disabled={isFirstStep}
            className="gap-2 transition-all duration-300"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>

          <Button
            onClick={nextStep}
            className="gap-2 transition-all duration-300 min-w-[120px]"
          >
            {isLastStep ? 'Review Listing' : 'Continue'}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </CardFooter>
      </Card>
      
      {/* Mobile progress indicator */}
      <div className="mt-8 text-center text-xs text-muted-foreground uppercase tracking-widest font-semibold">
        Step {currentIndex + 1} of {steps.length}
      </div>
    </div>
  );
}
