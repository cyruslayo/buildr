/**
 * Registration Page
 * @fileoverview User registration page with asymmetric split-screen layout
 * 
 * Design: 60/40 split - Brand zone | Form zone
 * Implements "Lagos Luxury" with emerald gradients and trust signals
 */
import Link from 'next/link';
import { ShieldCheck, Zap, CheckCircle } from 'lucide-react';
import RegisterForm from '@/features/auth/components/register-form';

const BENEFITS = [
  'Create unlimited property pages',
  'WhatsApp integration included',
  'Export to HTML anytime',
  'Nigeria-first templates',
];

export default function RegisterPage() {
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
              Start building <span className="text-emerald-400 italic">trust</span> today.
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Join 500+ Nigerian real estate professionals using Buildr to create property pages that convert.
            </p>
            
            {/* Benefits List */}
            <ul className="space-y-4">
              {BENEFITS.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3 text-slate-300">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Social Proof */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 border-2 border-slate-900 flex items-center justify-center text-white text-xs font-bold"
                >
                  {['CA', 'OA', 'TN', 'KE'][i - 1]}
                </div>
              ))}
            </div>
            <div className="text-sm text-slate-400">
              <span className="text-white font-bold">+500</span> agents already building
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
              Create your account
            </h2>
            <p className="text-slate-500">
              Start building stunning property pages today
            </p>
          </div>
          
          {/* Trust Badge */}
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-100 rounded-lg mb-8">
            <Zap className="w-5 h-5 text-amber-600" />
            <span className="text-sm text-amber-700 font-medium">
              Free tier available • No credit card required
            </span>
          </div>
          
          {/* Form */}
          <div className="bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
            <RegisterForm />
          </div>
          
          {/* Already have account */}
          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link href="/login" className="text-emerald-700 font-medium hover:underline">
              Sign in
            </Link>
          </p>
          
          {/* Footer */}
          <p className="mt-8 text-center text-xs text-slate-400 font-mono uppercase tracking-widest">
            Made in Lagos 🇳🇬
          </p>
        </div>
      </div>
    </div>
  );
}
