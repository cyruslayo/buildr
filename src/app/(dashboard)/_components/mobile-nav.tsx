'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { DashboardSidebar } from '@/components/navigation/dashboard-sidebar';

interface MobileNavProps {
  userName: string;
  userEmail?: string;
}

/**
 * Mobile navigation component using a Sheet for the sidebar.
 * Extracted for better maintenance and pattern separation.
 */
export function MobileNav({ userName, userEmail }: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button 
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors h-12 w-12 flex items-center justify-center" 
          aria-label="Open Menu"
        >
          <Menu className="w-6 h-6 text-slate-600" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72 bg-slate-950 border-none">
        <DashboardSidebar userName={userName} userEmail={userEmail} isMobile />
      </SheetContent>
    </Sheet>
  );
}
