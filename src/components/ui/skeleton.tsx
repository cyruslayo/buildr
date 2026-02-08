import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  lines?: number;
}

/**
 * Loading skeleton component with pulse animation.
 * Use for content placeholder during data loading.
 * 
 * @example
 * <LoadingSkeleton className="h-4 w-full" />
 * <LoadingSkeleton lines={3} className="h-4 w-full" />
 */
export function LoadingSkeleton({ className, lines = 1 }: SkeletonProps) {
  if (lines === 1) {
    return (
      <div
        data-testid="skeleton"
        className={cn(
          "animate-pulse rounded-md bg-muted",
          className
        )}
      />
    );
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          data-testid="skeleton"
          className={cn(
            "animate-pulse rounded-md bg-muted",
            className
          )}
        />
      ))}
    </div>
  );
}

// Alias for shadcn/ui compatibility
export { LoadingSkeleton as Skeleton };
