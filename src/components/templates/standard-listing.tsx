'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, CheckCircle, BedDouble, Bath, Square } from 'lucide-react';
import { CldImage } from 'next-cloudinary';
import { VerifiedBadge } from '@/components/trust/verified-badge';
import type { TemplateComponentProps } from './registry';

/**
 * Standard Property Listing Template
 * Clean, professional property page for residential listings.
 * 
 * Uses slightly less aggressive Art Direction than Luxury,
 * but still follows Hardboiled principles (asymmetry, editorial typography).
 */
export default function StandardListing({ data }: TemplateComponentProps) {
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
  } = data;

  const heroImage = images[0] || '/templates/standard-hero.jpg';

  return (
    <div className="min-h-screen bg-white text-slate-900 font-body">
      {/* HERO */}
      <header className="relative w-full h-[50vh] lg:h-[60vh]">
        <div className="absolute inset-0">
          <CldImage
            src={heroImage}
            alt={title && location ? `Property image of ${title} at ${location}` : title || 'Property image'}
            fill
            priority
            crop="fill"
            gravity="auto"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Badge */}
        <div className="absolute top-6 left-6 bg-emerald-600 text-white text-xs font-bold px-4 py-2 uppercase tracking-widest">
          For Sale
        </div>
        
        {/* Price Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="font-display text-3xl lg:text-5xl text-white">{title || 'Modern Residence'}</h1>
              <VerifiedBadge kycStatus={data.isVerified ? 'verified' : 'none'} size="sm" />
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <MapPin className="w-4 h-4" />
              <span>{location || 'Lagos, Nigeria'}</span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* STATS BAR */}
      <section className="bg-slate-900 text-white py-6">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div>
            <span className="block text-2xl lg:text-3xl font-display text-emerald-400">{price}</span>
            <span className="text-xs uppercase tracking-widest text-slate-400">Price</span>
          </div>
          <div className="flex flex-col items-center">
            <BedDouble className="w-6 h-6 text-emerald-400 mb-1" />
            <span className="text-lg font-bold">{beds}</span>
            <span className="text-xs uppercase tracking-widest text-slate-400">Beds</span>
          </div>
          <div className="flex flex-col items-center">
            <Bath className="w-6 h-6 text-emerald-400 mb-1" />
            <span className="text-lg font-bold">{baths}</span>
            <span className="text-xs uppercase tracking-widest text-slate-400">Baths</span>
          </div>
          <div className="flex flex-col items-center">
            <Square className="w-6 h-6 text-emerald-400 mb-1" />
            <span className="text-lg font-bold">{sqm}</span>
            <span className="text-xs uppercase tracking-widest text-slate-400">sqm</span>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Description - 3 cols */}
        <div className="lg:col-span-3 space-y-6">
          <h2 className="font-display text-2xl">Property Details</h2>
          <p className="text-slate-600 leading-relaxed">
            {description || 'A beautifully designed property in a prime location. This home offers comfortable living with modern amenities and finishes.'}
          </p>
        </div>

        {/* Features - 2 cols */}
        <div className="lg:col-span-2 bg-slate-50 p-8 border border-slate-100">
          <h3 className="font-mono uppercase tracking-widest text-xs text-slate-400 mb-6">Features & Amenities</h3>
          <ul className="space-y-3">
            {features.length > 0 ? features.map((feat, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                <span>{feat}</span>
              </li>
            )) : (
              <>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" /> 24hr Power Supply</li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" /> Bore Hole</li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" /> Fitted Kitchen</li>
              </>
            )}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-900 py-12">
        <div className="max-w-5xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h2 className="font-display text-2xl mb-1">Interested in this property?</h2>
            <p className="text-emerald-200">Get in touch for a viewing or more information.</p>
          </div>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-emerald-900 font-bold uppercase tracking-widest hover:bg-emerald-50 transition-colors"
          >
            <Phone className="w-5 h-5" />
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
