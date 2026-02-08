"use client";
// Justification: Uses onClick event handler for CTA button interaction

import { Button } from "./button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description?: string;
  cta?: string;
  onCtaClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

/**
 * Empty state component for when no content exists.
 * Displays title, optional description, and optional CTA button.
 * 
 * @example
 * <EmptyState 
 *   title="No projects" 
 *   description="Get started by creating your first page"
 *   cta="Create First Page"
 *   onCtaClick={() => router.push('/builder')}
 * />
 */
export function EmptyState({ 
  title, 
  description, 
  cta, 
  onCtaClick,
  className,
  icon
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 p-8 text-center",
        // Fade-in animation using design system timing
        "animate-in fade-in duration-300",
        className
      )}
    >
      {icon && <div className="mb-2">{icon}</div>}
      <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="text-muted-foreground max-w-md">{description}</p>
      )}
      {cta && (
        <Button onClick={onCtaClick}>
          {cta}
        </Button>
      )}
    </div>
  );
}
