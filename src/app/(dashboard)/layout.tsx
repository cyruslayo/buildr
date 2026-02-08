/**
 * @fileoverview Dashboard Route Group Layout
 * Server Component - wraps all authenticated dashboard routes with sidebar
 */

import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { DashboardSidebar } from '@/components/navigation/dashboard-sidebar';
import { MobileNav } from './_components/mobile-nav';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  if (!session?.user?.id) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Mobile Top Nav - Visible only on mobile */}
      <div className="md:hidden sticky top-0 z-50 bg-[#FDFBF7]/80 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <div className="font-display font-bold text-xl tracking-tight">Buildr.</div>
        <MobileNav 
          userName={session.user.name || 'Agent'} 
          userEmail={session.user.email || undefined}
        />
      </div>

      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden md:block">
        <DashboardSidebar 
          userName={session.user.name || 'Agent'} 
          userEmail={session.user.email || undefined}
        />
      </div>
      
      {/* Main Content Area - offset by sidebar width on desktop */}
      <main className="md:ml-64 transition-all duration-300">
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
