'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export const STEPS = ['title', 'location', 'price', 'amenities', 'description', 'photos', 'style', 'publish'] as const;
export type WizardStep = (typeof STEPS)[number];

export function useWizardNavigation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentStep = (searchParams.get('step') as WizardStep) || 'title';
  const currentIndex = STEPS.indexOf(currentStep);

  const goToStep = (step: WizardStep) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('step', step);
    router.push(`${pathname}?${params.toString()}`);
  };

  const nextStep = () => {
    if (currentIndex < STEPS.length - 1) {
      goToStep(STEPS[currentIndex + 1]);
    }
  };

  const previousStep = () => {
    if (currentIndex > 0) {
      goToStep(STEPS[currentIndex - 1]);
    }
  };

  return {
    currentStep,
    currentIndex,
    nextStep,
    previousStep,
    goToStep,
    isFirstStep: currentIndex === 0,
    isLastStep: currentIndex === STEPS.length - 1,
    steps: STEPS,
  };
}
