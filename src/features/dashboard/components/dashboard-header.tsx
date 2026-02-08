'use client';

/**
 * Justification: Client-side navigation triggers for property creation.
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

/**
 * Dashboard header with primary "Create New Listing" action.
 */
export function DashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Property Listings
        </h1>
        <p className="text-slate-500 mt-1">
          Manage your agency's property portfolio.
        </p>
      </div>

      <Button asChild className="h-12 px-6 rounded-full shadow-premium hover:shadow-premium-hover transition-all">
        <Link href="/wizard?step=title">
          <Plus className="mr-2 h-5 w-5" />
          Create New Listing
        </Link>
      </Button>
    </div>
  );
}
