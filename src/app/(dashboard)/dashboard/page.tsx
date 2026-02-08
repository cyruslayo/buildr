/**
 * Dashboard Page - Property Listings
 * 
 * Server Component that fetches properties for the authenticated team.
 * Enforces strict tenant isolation and uses feature co-located components.
 */

import React, { Suspense } from 'react';
import { DashboardHeader } from '@/features/dashboard/components/dashboard-header';
import { ListingGrid } from '@/features/dashboard/components/listing-grid';
import { ListingGridSkeleton } from '@/features/dashboard/components/listing-grid-skeleton';
import { getProperties } from '@/features/dashboard/actions/get-properties';

export default async function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <DashboardHeader />
      
      <Suspense fallback={<ListingGridSkeleton />}>
        <PropertiesList />
      </Suspense>
    </div>
  );
}

/**
 * Inner component to handle async data fetch within Suspense boundary.
 */
async function PropertiesList() {
  const properties = await getProperties();
  return <ListingGrid properties={properties} />;
}
