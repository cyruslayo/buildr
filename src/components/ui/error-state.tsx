"use client";
// Justification: Uses onClick event handler for retry button interaction

import { AlertCircle } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

/**
 * Error state component with optional retry functionality.
 * Displays error message with visual indicator.
 * 
 * @example
 * <ErrorState message="Generation failed" onRetry={() => refetch()} />
 */
export function ErrorState({ message, onRetry, className }: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 p-8 text-center",
        className
      )}
    >
      <AlertCircle
        data-testid="error-icon"
        className="h-12 w-12 text-destructive"
      />
      <p className="text-foreground font-medium">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}
