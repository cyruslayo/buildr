"use client";
// Justification: Uses useState for step navigation and onClick handlers for buttons

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Sparkles, 
  FileText, 
  Eye,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

interface OnboardingProps {
  isFirstTime: boolean;
  onComplete: () => void;
}

interface Step {
  title: string;
  description: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const steps: Step[] = [
  {
    title: "Welcome to Buildr",
    description: "Create stunning property landing pages in minutes",
    icon: <Sparkles className="h-12 w-12 text-primary" />,
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Buildr helps Nigerian real estate professionals create beautiful, 
          conversion-focused landing pages without any coding.
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span> 10+ Nigerian-focused templates
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span> WhatsApp integration built-in
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span> Naira pricing & sqm measurements
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Simple 4-Step Wizard",
    description: "From idea to published page in 4 easy steps",
    icon: <FileText className="h-12 w-12 text-primary" />,
    content: (
      <div className="space-y-4">
        <div className="grid gap-3">
          {[
            { step: 1, label: "Choose Page Type", desc: "Listing, Land, Agent Bio..." },
            { step: 2, label: "Select Template", desc: "Pick from our premium designs" },
            { step: 3, label: "Fill Property Details", desc: "Add photos, price, features" },
            { step: 4, label: "Preview & Export", desc: "Download or share your page" },
          ].map((item) => (
            <div key={item.step} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                {item.step}
              </span>
              <div>
                <p className="font-medium text-sm">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Ready to Build?",
    description: "Let's create your first property page",
    icon: <Eye className="h-12 w-12 text-primary" />,
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          You're all set! Click "Get Started" to launch the wizard and create 
          your first professional property landing page.
        </p>
        <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900">
          <p className="text-sm text-green-700 dark:text-green-300">
            💡 <span className="font-medium">Tip:</span> Start with a "Property Listing" 
            page – it's our most popular template for selling homes in Lekki, Ikoyi, and beyond!
          </p>
        </div>
      </div>
    ),
  },
];

/**
 * Onboarding wizard for new users.
 * Shows 3-step introduction to Buildr with skip option.
 * 
 * @example
 * <Onboarding isFirstTime={!hasCompletedOnboarding} onComplete={markOnboardingComplete} />
 */
export function Onboarding({ isFirstTime, onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isFirstTime) {
    return null;
  }

  const step = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Card className="w-full max-w-lg mx-4 p-6 animate-in fade-in zoom-in-95 duration-300">
        {/* Step indicator */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-medium text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </span>
          <Button variant="ghost" size="sm" onClick={onComplete}>
            Skip
          </Button>
        </div>

        {/* Step indicator text for testing */}
        <span className="sr-only">Step {currentStep + 1}</span>

        {/* Progress dots */}
        <div className="flex gap-2 mb-6">
          {steps.map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-all duration-300",
                index <= currentStep ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">{step.icon}</div>
          <h2 className="text-2xl font-bold mb-2">{step.title}</h2>
          <p className="text-muted-foreground">{step.description}</p>
        </div>

        <div className="mb-8">{step.content}</div>

        {/* Navigation */}
        <div className="flex gap-3">
          {!isFirstStep && (
            <Button variant="outline" onClick={handleBack} className="flex-1">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
          <Button onClick={handleNext} className={cn("flex-1", isFirstStep && "w-full")}>
            {isLastStep ? "Get Started" : "Next"}
            {!isLastStep && <ArrowRight className="h-4 w-4 ml-2" />}
          </Button>
        </div>
      </Card>
    </div>
  );
}
