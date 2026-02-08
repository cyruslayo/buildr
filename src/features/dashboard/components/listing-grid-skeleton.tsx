'use client';

/**
 * Justification: Client-side skeleton rendering to match dynamic grid layout.
 */

import React from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Skeleton loader for the property listing grid.
 */
export function ListingGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-10">
      {[1, 2, 3, 4, 5, 6].map((i, index) => (
        <div 
          key={i} 
          className={cn(
            "aspect-[4/3] rounded-[2rem] border border-slate-100 p-4 flex flex-col gap-4 bg-white shadow-premium",
            index === 0 && "lg:col-span-2"
          )}
        >
          <Skeleton className="flex-1 w-full rounded-2xl" />
          <div className="space-y-4 p-2">
            <Skeleton className="h-8 w-3/4 rounded-full" />
            <Skeleton className="h-4 w-1/2 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
