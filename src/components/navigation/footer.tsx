/**
 * @fileoverview Unified Footer Component
 * Server Component - no client-side interactivity needed
 * 
 * Design: Asymmetric 4-column layout (5/3/2/2 on 12-col grid)
 * Implements "Lagos Luxury" with trust signals and RC number
 */

import Link from 'next/link';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

const QUICK_LINKS = [
  { href: '/#templates', label: 'Templates' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/builder', label: 'Create Page' },
];

const LEGAL_LINKS = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Brand Column - 5 cols */}
          <div className="md:col-span-5">
            <Link 
              href="/" 
              className="inline-block font-display text-3xl font-bold tracking-tighter text-white hover:text-emerald-400 transition-colors mb-6"
            >
              Buildr<span className="text-emerald-500">.</span>
            </Link>
            <p className="text-slate-400 leading-relaxed mb-6 max-w-sm">
              The only landing page builder designed for the specific trust dynamics 
              of the Nigerian Real Estate Market.
            </p>
            
            {/* Trust Signal - RC Number */}
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                <span className="text-xs font-bold text-slate-900">RC</span>
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-widest">Registered Company</div>
                <div className="text-sm font-mono text-amber-400">RC 1948527</div>
              </div>
            </div>
          </div>
          
          {/* Quick Links - 3 cols */}
          <div className="md:col-span-3">
            <h3 className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-slate-300 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal - 2 cols */}
          <div className="md:col-span-2">
            <h3 className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-6">
              Legal
            </h3>
            <ul className="space-y-3">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-slate-300 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact - 2 cols */}
          <div className="md:col-span-2">
            <h3 className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-6">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-emerald-500 shrink-0" />
                <span className="text-sm">Lagos, Nigeria</span>
              </li>
              <li>
                <a 
                  href="https://wa.me/2348000000000"
                  className="flex items-center gap-3 text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm">WhatsApp</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:hello@buildr.ng"
                  className="flex items-center gap-3 text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  <Mail className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm">hello@buildr.ng</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              © {currentYear} Buildr. All rights reserved.
            </p>
            <p className="text-xs text-slate-600 font-mono uppercase tracking-widest">
              Made with 💚 in Lagos, Nigeria 🇳🇬
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
