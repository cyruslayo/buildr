'use client';
/**
 * @fileoverview Dashboard Sidebar Navigation
 * "use client" - Requires useState for collapse state and usePathname
 * 
 * Design: Emerald-accented sidebar with asymmetric spacing
 * Implements "Lagos Luxury" with depth and metallic accents
 */

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileStack, 
  Palette, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Plus
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'My Pages', icon: LayoutDashboard },
  { href: '/dashboard/templates', label: 'Templates', icon: FileStack },
  { href: '/dashboard/brand', label: 'Brand Settings', icon: Palette },
  { href: '/dashboard/account', label: 'Account', icon: Settings },
];

interface DashboardSidebarProps {
  /** User's display name */
  userName?: string;
  /** User's email */
  userEmail?: string;
  /** Whether the sidebar is being rendered in a mobile sheet */
  isMobile?: boolean;
}

export function DashboardSidebar({ 
  userName = 'Agent', 
  userEmail,
  isMobile = false 
}: DashboardSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        'h-screen bg-slate-950 text-white flex flex-col transition-all duration-300 z-40 border-r border-white/5 shadow-2xl',
        isMobile ? 'w-full' : (isCollapsed ? 'w-20 fixed' : 'w-64 fixed')
      )}
    >
      {/* Logo Area */}
      <div className="p-6 border-b border-white/5 bg-slate-900/50 backdrop-blur-sm">
        <Link 
          href="/" 
          className="font-display text-2xl font-bold tracking-tighter text-white hover:text-emerald-400 transition-colors"
        >
          {isCollapsed ? 'B.' : 'Buildr.'}
        </Link>
      </div>

      {/* Create New Button */}
      <div className="p-4">
        <Link
          href="/builder"
          className={cn(
            'flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white font-bold uppercase tracking-widest text-sm hover:bg-emerald-500 transition-all rounded-lg shadow-lg shadow-emerald-900/50',
            isCollapsed ? 'px-2' : 'px-4'
          )}
        >
          <Plus className="w-5 h-5" />
          {!isCollapsed && <span>New Page</span>}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group relative',
                active
                  ? 'bg-emerald-600/20 text-emerald-400'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              )}
            >
              {/* Active Indicator Bar */}
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-500 rounded-r-full"
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                />
              )}
              
              <Icon className={cn('w-5 h-5 shrink-0', active && 'text-emerald-400')} />
              
              {!isCollapsed && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-3 py-1.5 bg-slate-800 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className={cn(
        'p-4 border-t border-slate-800',
        isCollapsed ? 'flex justify-center' : ''
      )}>
        <div className={cn(
          'flex items-center gap-3',
          isCollapsed ? 'flex-col' : ''
        )}>
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-bold shadow-lg">
            {userName.charAt(0).toUpperCase()}
          </div>
          
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm text-white truncate">{userName}</div>
              {userEmail && (
                <div className="text-xs text-slate-400 truncate">{userEmail}</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className={cn(
            'flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-all duration-300',
            isCollapsed ? 'justify-center' : ''
          )}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="font-medium text-sm">Sign Out</span>}
        </button>
      </div>

      {/* Collapse Toggle - Hide on mobile */}
      {!isMobile && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      )}
    </aside>
  );
}
