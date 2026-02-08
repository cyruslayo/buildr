/**
 * Login Page
 * @fileoverview User login page with asymmetric split-screen layout
 * 
 * Design: 60/40 split - Brand zone | Form zone
 * Implements "Lagos Luxury" with emerald gradients and trust signals
 */
import { Suspense } from 'react';
import Link from 'next/link';
import { ShieldCheck, Users, Building } from 'lucide-react';
import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12">
      
      {/* Brand Zone - 7 columns (58%) */}
      <div className="hidden lg:flex lg:col-span-7 relative bg-slate-900 overflow-hidden">
        {/* Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-slate-900/90 to-slate-900" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 lg:p-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="font-display text-3xl font-bold tracking-tighter text-white hover:text-emerald-400 transition-colors"
          >
            Buildr<span className="text-emerald-500">.</span>
          </Link>
          
          {/* Hero Message */}
          <div className="max-w-md">
            <h1 className="font-display text-4xl lg:text-5xl text-white leading-tight mb-6">
              Welcome back to <span className="text-emerald-400 italic">Lagos</span>&apos;s trusted builder.
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Continue crafting premium property pages that convert browsers into buyers.
            </p>
          </div>
          
          {/* Trust Signals */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-slate-300">
              <div className="w-12 h-12 rounded-full bg-emerald-900/50 border border-emerald-700/50 flex items-center justify-center">
                <Users className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <div className="font-bold text-white">500+ Nigerian Agents</div>
                <div className="text-sm text-slate-400">Trust Buildr for their listings</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-slate-300">
              <div className="w-12 h-12 rounded-full bg-emerald-900/50 border border-emerald-700/50 flex items-center justify-center">
                <Building className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <div className="font-bold text-white">₦2.5B+ in Listings</div>
                <div className="text-sm text-slate-400">Created with our templates</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Element */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>
      
      {/* Form Zone - 5 columns (42%) */}
      <div className="col-span-1 lg:col-span-5 flex flex-col justify-center bg-[#FDFBF7] p-6 lg:p-12">
        {/* Mobile Logo */}
        <div className="lg:hidden mb-8">
          <Link 
            href="/" 
            className="font-display text-2xl font-bold tracking-tighter text-slate-900"
          >
            Buildr<span className="text-emerald-600">.</span>
          </Link>
        </div>
        
        <div className="w-full max-w-md mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h2 className="font-display text-3xl text-slate-900 mb-2">
              Sign in
            </h2>
            <p className="text-slate-500">
              Access your dashboard and projects
            </p>
          </div>
          
          {/* Trust Badge */}
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-lg mb-8">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-emerald-700 font-medium">
              Secure login with 256-bit encryption
            </span>
          </div>
          
          {/* Form */}
          <div className="bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
            <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 rounded-lg" />}>
              <LoginForm />
            </Suspense>
          </div>
          
          {/* Footer */}
          <p className="mt-8 text-center text-xs text-slate-400 font-mono uppercase tracking-widest">
            Made in Lagos 🇳🇬
          </p>
        </div>
      </div>
    </div>
  );
}
