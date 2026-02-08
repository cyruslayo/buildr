'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, CheckCircle } from 'lucide-react';
import { CldImage } from 'next-cloudinary';
import { VerifiedBadge } from '@/components/trust/verified-badge';
import type { TemplateComponentProps } from './registry';

/**
 * Hardboiled Template: Luxury Listing
 * Implements "Compound Grid" and "Intrinsic Layout" principles.
 * 
 * Grid Strategy:
 * - Desktop: 4-column overlay grid (Tailwind 'grid-cols-luxury-hero')
 * - Mobile: Stacked intrinsic layout
 * 
 * Typography:
 * - Headlines: Fraunces (Display)
 * - Data: Space Grotesk (Body)
 */
export default function LuxuryListing1({ data }: TemplateComponentProps) {
  const {
    price,
    title,
    location,
    beds,
    baths,
    sqm,
    description,
    features = [],
    whatsappNumber,
    images = [],
    isVerified
  } = data;

  const heroImage = images[0] || '/templates/luxury-hero.jpg';

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-900 font-body overflow-x-hidden">
      {/* 
        HERO SECTION: THE COMPOUND GRID 
        Uses named lines [hero-start], [content-overlap], etc. defined in tailwind.config.ts
      */}
      <header className="relative w-full grid grid-cols-1 lg:grid-cols-luxury-hero gap-0">
        
        {/* Visual Layer (Underlap) */}
        <div className="col-span-1 lg:col-start-[visual-overlap] lg:col-end-[full-end] h-[60vh] lg:h-[85vh] relative ml-auto w-full lg:w-[110%] z-0">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 bg-slate-200"
          >
            <CldImage 
              src={heroImage} 
              alt={title && location ? `Property image of ${title} at ${location}` : title || 'Property image'} 
              fill
              priority
              crop="fill"
              gravity="auto"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#FDFBF7]" />
          </motion.div>
        </div>

        {/* Content Layer (Overlap) */}
        <div className="col-span-1 lg:col-start-[full-start] lg:col-end-[visual-overlap] lg:row-start-1 z-10 flex flex-col justify-center px-6 lg:pl-20 py-12 lg:py-0">
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6 max-w-2xl"
          >
            {/* Trust Badge - Lagos Luxury Styling */}
            <VerifiedBadge kycStatus={isVerified ? 'verified' : 'none'} size="md" className="mb-4" />

            {/* Editorial Title - Fraunces */}
            <h1 className="font-display text-5xl lg:text-7xl leading-[0.9] text-slate-900">
              {title || 'Luxury Residence'}
            </h1>

            <div className="flex items-center gap-2 text-slate-500 font-mono uppercase tracking-widest text-sm">
              <MapPin className="w-4 h-4" />
              {location || 'Lagos, Nigeria'}
            </div>

            {/* Price Tag - Art Directed Data */}
            <div className="pt-4 border-t border-slate-900/10">
              <span className="block text-sm text-slate-500 uppercase tracking-widest mb-1">Asking Price</span>
              <span className="font-display text-4xl lg:text-5xl text-emerald-800">
                {price}
              </span>
            </div>

            {/* Call to Action */}
            <div className="pt-8">
               <a 
                 href={`https://wa.me/${whatsappNumber}`}
                 className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-900 text-white font-bold uppercase tracking-widest hover:bg-emerald-800 transition-all hover:gap-4"
               >
                 <Phone className="w-5 h-5" />
                 Book Viewing
               </a>
            </div>
          </motion.div>
        </div>
      </header>

      {/* SPECS GRID */}
      {/* SPECS GRID - Asymmetric 7/5 ratio */}
      <section className="px-6 lg:px-20 py-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-8">
          <h2 className="font-display text-3xl">Property Details</h2>
          <p className="text-lg text-slate-600 leading-relaxed max-w-prose">
            {description || 'Experience the pinnacle of luxury living in this architectural masterpiece. Designed for the discerning few, offering unmatched comfort and security.'}
          </p>
          
          <div className="grid grid-cols-3 gap-8 pt-8">
            <div className="space-y-1">
              <span className="block text-4xl font-display">{beds}</span>
              <span className="text-sm uppercase tracking-widest text-slate-500">Bedrooms</span>
            </div>
            <div className="space-y-1">
              <span className="block text-4xl font-display">{baths}</span>
              <span className="text-sm uppercase tracking-widest text-slate-500">Bathrooms</span>
            </div>
            <div className="space-y-1">
              <span className="block text-4xl font-display">{sqm}</span>
              <span className="text-sm uppercase tracking-widest text-slate-500">Square Meters</span>
            </div>
          </div>
        </div>

        {/* Feature List - Staggered */}
        <div className="lg:col-span-5 bg-white p-12 border border-slate-100 shadow-sm">
           <h3 className="font-mono uppercase tracking-widest text-sm text-slate-400 mb-8">Amenities</h3>
           <ul className="space-y-4">
             {features.length > 0 ? features.map((feat, i) => (
               <li key={i} className="flex items-start gap-4">
                 <CheckCircle className="w-5 h-5 text-emerald-600 mt-1 shrink-0" />
                 <span className="text-lg font-medium">{feat}</span>
               </li>
             )) : (
               <li className="text-slate-400 italic">No features listed</li>
             )}
           </ul>
        </div>
      </section>
    </div>
  );
}
