'use client';
/**
 * @fileoverview Global Navigation Bar
 * "use client" - Requires useState for mobile menu toggle
 * 
 * Design: Asymmetric brand-forward navbar with emerald accents
 * Mobile: Hamburger with slide-out drawer
 */

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/#templates', label: 'Templates' },
  { href: '/#pricing', label: 'Pricing' },
];

interface NavbarProps {
  /** Show dashboard link (for authenticated users) */
  showDashboard?: boolean;
}

export function Navbar({ showDashboard = false }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FDFBF7]/80 backdrop-blur-lg border-b border-slate-200/50">
        <nav className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo - Asymmetric weight */}
            <Link 
              href="/" 
              className="font-display text-2xl lg:text-3xl font-bold tracking-tighter text-slate-900 hover:text-emerald-800 transition-colors"
            >
              Buildr<span className="text-emerald-600">.</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium uppercase tracking-widest transition-all duration-300 hover:text-emerald-700',
                    isActive(link.href) 
                      ? 'text-emerald-800' 
                      : 'text-slate-600'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              
              {showDashboard && (
                <Link
                  href="/dashboard"
                  className={cn(
                    'flex items-center gap-2 text-sm font-medium uppercase tracking-widest transition-all duration-300 hover:text-emerald-700',
                    isActive('/dashboard') 
                      ? 'text-emerald-800' 
                      : 'text-slate-600'
                  )}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
              )}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-900 text-[#FDFBF7] text-sm font-bold uppercase tracking-widest hover:bg-emerald-800 transition-all hover:gap-3 shadow-lg shadow-emerald-900/20"
              >
                Start Building
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-900 hover:text-emerald-700 transition-colors"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-[#FDFBF7] shadow-2xl lg:hidden"
            >
              <div className="flex flex-col h-full p-6">
                {/* Close Button */}
                <div className="flex justify-end mb-8">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-slate-600 hover:text-emerald-700 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Mobile Nav Links */}
                <div className="flex-1 space-y-2">
                  {NAV_LINKS.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'block py-4 text-xl font-display border-b border-slate-100 transition-all duration-300',
                          isActive(link.href)
                            ? 'text-emerald-800 border-emerald-200'
                            : 'text-slate-900 hover:text-emerald-700 hover:border-emerald-100'
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                  
                  {showDashboard && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: NAV_LINKS.length * 0.1 }}
                    >
                      <Link
                        href="/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'flex items-center gap-3 py-4 text-xl font-display border-b border-slate-100 transition-all duration-300',
                          isActive('/dashboard')
                            ? 'text-emerald-800 border-emerald-200'
                            : 'text-slate-900 hover:text-emerald-700 hover:border-emerald-100'
                        )}
                      >
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                      </Link>
                    </motion.div>
                  )}
                </div>

                {/* Mobile CTAs */}
                <div className="space-y-3 pt-6 border-t border-slate-200">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full py-3 text-center text-slate-600 border border-slate-200 font-medium hover:border-emerald-300 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-900 text-[#FDFBF7] font-bold uppercase tracking-widest hover:bg-emerald-800 transition-all"
                  >
                    Start Building
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Trust Footer */}
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <p className="text-xs text-slate-400 text-center font-mono uppercase tracking-widest">
                    Made in Lagos 🇳🇬
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-16 lg:h-20" />
    </>
  );
}
