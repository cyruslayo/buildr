'use client';

import React, { Suspense } from 'react';
import { WizardShell } from '@/features/wizard/components/wizard-shell';
import { useWizardNavigation } from '@/features/wizard/hooks/use-wizard-navigation';
import { PersistenceProvider } from '@/features/wizard/components/persistence-provider';

import { TitleStep } from '@/features/wizard/components/steps/title-step';
import { LocationStep } from '@/features/wizard/components/steps/location-step';
import { PriceStep } from '@/features/wizard/components/steps/price-step';
import { AmenitiesStep } from '@/features/wizard/components/steps/amenities-step';
import { DescriptionStep } from '@/features/wizard/components/steps/description-step';
import { PhotoStep } from '@/features/wizard/components/steps/photo-step';
import { StyleStep } from '@/features/wizard/components/steps/style-step';
import { PublishStep } from '@/features/wizard/components/steps/publish-step';

// Placeholder/Future steps for verification

function WizardContainer() {
  const { currentStep } = useWizardNavigation();

  const renderStep = () => {
    switch (currentStep) {
      case 'title':
        return <TitleStep />;
      case 'location':
        return <LocationStep />;
      case 'price':
        return <PriceStep />;
      case 'amenities':
        return <AmenitiesStep />;
      case 'description':
        return <DescriptionStep />;
      case 'photos':
        return <PhotoStep />;
      case 'style':
        return <StyleStep />;
      case 'publish':
        return <PublishStep />;
      default:
        return <TitleStep />;
      }
  };

  return <WizardShell>{renderStep()}</WizardShell>;
}

export default function WizardPage() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <Suspense fallback={<div className="flex items-center justify-center p-24">Loading Wizard...</div>}>
        <PersistenceProvider>
          <WizardContainer />
        </PersistenceProvider>
      </Suspense>
    </div>
  );
}
