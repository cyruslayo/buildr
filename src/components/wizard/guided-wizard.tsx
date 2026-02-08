'use client';
// Justification: Uses useState for step management and form data collection

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { PageTypeSelector } from './page-type-selector';
import { PropertyTypeSelector } from './property-type-selector';
import { LocationSelector } from './location-selector';
import { FeaturesChecklist } from './features-checklist';
import { NairaInput } from './naira-input';
import { WhatsAppConfig } from './whatsapp-config';
import { StylePicker } from './style-picker';
import type { PageType, PropertyType } from '@/lib/constants/nigeria-constants';

// Wizard data types
interface WizardData {
  pageType: PageType;
  propertyType?: PropertyType;
  location?: { city: string; area: string };
  features: string[];
  price: number;
  stylePreset?: string;
  whatsapp: {
    number: string;
    message: string;
    showFloating: boolean;
  };
}

interface GuidedWizardProps {
  onComplete: (data: WizardData) => void;
}

const STEPS = [
  { id: 1, title: 'Page Type', description: 'What are you creating?' },
  { id: 2, title: 'Details', description: 'Property information' },
  { id: 3, title: 'Style', description: 'Choose your look' },
  { id: 4, title: 'WhatsApp', description: 'Contact setup' },
];

export function GuidedWizard({ onComplete }: GuidedWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<Partial<WizardData>>({
    features: [],
    price: 0,
    whatsapp: { number: '', message: "Hello! I'm interested in this property.", showFloating: true },
  });

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete(data as WizardData);
  };

  const updateData = useCallback(<K extends keyof WizardData>(key: K, value: WizardData[K]) => {
    setData(prev => ({ ...prev, [key]: value }));
  }, []);

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!data.pageType;
      case 2:
        return true; // Optional details
      case 3:
        return true; // Style selection optional
      case 4:
        return true; // WhatsApp optional but recommended
      default:
        return false;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => (
            <div
              key={step.id}
              className="flex items-center"
            >
              <motion.div
                data-testid={`progress-step-${step.id}`}
                initial={false}
                animate={{
                  scale: currentStep === step.id ? 1.1 : 1,
                  backgroundColor: currentStep >= step.id ? 'rgb(16 185 129)' : 'rgb(226 232 240)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-semibold',
                  currentStep >= step.id
                    ? 'text-white'
                    : 'text-slate-400'
                )}
              >
                {step.id}
              </motion.div>
              {index < STEPS.length - 1 && (
                <div className="relative w-16 h-1 mx-2 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: currentStep > step.id ? '100%' : '0%' }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="absolute inset-y-0 left-0 bg-emerald-500 rounded-full"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <h2 className="font-display text-2xl text-slate-900">{STEPS[currentStep - 1].title}</h2>
          <p className="text-slate-500 text-sm">{STEPS[currentStep - 1].description}</p>
        </div>
      </div>

      {/* Step Content with AnimatePresence */}
      <div className="min-h-[400px] mb-8">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <h3 className="text-lg font-medium mb-4">What type of page?</h3>
              <PageTypeSelector
                onSelect={(type) => updateData('pageType', type)}
                selectedType={data.pageType}
              />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="space-y-6"
            >
              <h3 className="text-lg font-medium mb-4">Property Details</h3>
              
              <div>
                <label className="block text-sm font-medium mb-2">Property Type</label>
                <PropertyTypeSelector
                  onSelect={(type) => updateData('propertyType', type)}
                  selectedType={data.propertyType}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <LocationSelector
                  onSelect={(loc) => updateData('location', loc)}
                  selectedCity={data.location?.city}
                  selectedArea={data.location?.area}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Price (₦)</label>
                <NairaInput
                  value={data.price || 0}
                  onChange={(price) => updateData('price', price)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Features</label>
                <FeaturesChecklist
                  selectedFeatures={data.features}
                  onChange={(features) => updateData('features', features)}
                />
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <h3 className="text-lg font-medium mb-4">Choose Your Style</h3>
              <StylePicker
                onSelect={(presetId) => updateData('stylePreset', presetId)}
                selectedId={data.stylePreset || null}
              />
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <h3 className="text-lg font-medium mb-4">WhatsApp Setup</h3>
              <WhatsAppConfig
                initialData={data.whatsapp}
                onChange={(whatsapp) => updateData('whatsapp', whatsapp)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t">
        <button
          type="button"
          onClick={handleBack}
          disabled={currentStep === 1}
          className={cn(
            'px-6 py-3 rounded-lg font-medium transition-all duration-300',
            currentStep === 1
              ? 'opacity-50 cursor-not-allowed text-muted-foreground'
              : 'hover:bg-muted text-foreground'
          )}
        >
          Back
        </button>

        {currentStep < STEPS.length ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={!canProceed()}
            className={cn(
              'px-6 py-3 rounded-lg font-medium transition-all duration-300',
              canProceed()
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            )}
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={handleComplete}
            className="px-8 py-3 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-700 transition-all duration-300"
          >
            Generate
          </button>
        )}
      </div>
    </div>
  );
}
