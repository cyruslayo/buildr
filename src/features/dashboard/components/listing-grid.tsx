'use client';

/**
 * Justification: Handles listing interactivity, Framer Motion animations,
 * and price localization in the browser.
 */

import React from 'react';
import { Property } from '@prisma/client';
import { ListingCard } from './listing-card';
import { ListingGridSkeleton } from './listing-grid-skeleton';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

interface ListingGridProps {
  properties?: Property[];
  isLoading?: boolean;
}

/**
 * Responsive grid for property listings.
 * Handles skeleton states and branded empty states.
 */
export function ListingGrid({ properties = [], isLoading = false }: ListingGridProps) {
  if (isLoading) {
    return <ListingGridSkeleton />;
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
        <div className="w-16 h-16 bg-white rounded-2xl shadow-premium flex items-center justify-center mb-6">
          <Plus className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-2">
          No Listings? Your Empire Starts Here.
        </h3>
        <p className="text-slate-500 max-w-sm mb-8">
          Start creating your first professional property listing. Optimized for Lagos luxury and 3G speed.
        </p>
        <Button asChild className="h-12 px-8 rounded-full shadow-premium hover:shadow-premium-hover transition-all">
          <Link href="/wizard?step=title">
            <Plus className="mr-2 h-5 w-5" />
            Create First Listing
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-10">
      {properties.map((property, index) => (
        <div 
          key={property.id} 
          className={`${index === 0 ? 'lg:col-span-2' : ''} transition-all duration-500`}
        >
          <ListingCard property={property} isFeatured={index === 0} />
        </div>
      ))}
    </div>
  );
}
