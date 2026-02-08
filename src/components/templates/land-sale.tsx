'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, FileCheck, FileText, FileBadge, Ruler } from 'lucide-react';
import type { TemplateComponentProps } from './registry';

// Extend PropertyData for Land-specific fields
interface LandData {
  price?: string;
  title?: string;
  location?: string;
  sqm?: number | string;
  pricePerSqm?: string;
  dimensions?: string;
  hasCofO?: boolean;
  hasSurvey?: boolean;
  hasConsent?: boolean;
  advantages?: string[];
  whatsappNumber?: string;
  images?: string[];
}

/**
 * Land Sale Page Template
 * Marketing page for land plots with document status.
 * 
 * Art Direction: Document-first layout where the C-of-O badge is massive.
 */
export default function LandSalePage({ data }: { data: LandData }) {
  const {
    price,
    title,
    location,
    sqm,
    pricePerSqm,
    dimensions,
    hasCofO = false,
    hasSurvey = false,
    hasConsent = false,
    advantages = [],
    whatsappNumber,
    images = [],
  } = data;

  const heroImage = images[0] || '/templates/land-hero.jpg';

  return (
    <div className="min-h-screen bg-amber-50 text-slate-900 font-body">
      {/* HERO */}
      <header className="relative w-full h-[50vh]">
        <img
          src={heroImage}
          alt={title && location ? `Property image of ${title} at ${location}` : title || 'Land for Sale'}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-transparent" />
        
        {/* Price Tag - Overlapping */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="absolute top-1/2 -translate-y-1/2 left-6 lg:left-16 bg-white p-8 shadow-2xl max-w-sm"
        >
          <span className="block text-sm text-amber-700 uppercase tracking-widest mb-2">Asking Price</span>
          <span className="block font-display text-4xl lg:text-5xl text-slate-900">{price || '₦50,000,000'}</span>
          <div className="mt-4 pt-4 border-t border-slate-100 text-sm text-slate-500">
            {pricePerSqm && <span>{pricePerSqm} per sqm</span>}
          </div>
        </motion.div>
      </header>

      {/* PLOT SPECS */}
      <section className="bg-white py-8 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-3 gap-6 text-center">
          <div>
            <Ruler className="w-8 h-8 mx-auto text-amber-600 mb-2" />
            <span className="block text-2xl font-display">{sqm} sqm</span>
            <span className="text-xs uppercase tracking-widest text-slate-400">Total Area</span>
          </div>
          <div>
            <span className="block text-2xl font-display">{dimensions || '50m x 100m'}</span>
            <span className="text-xs uppercase tracking-widest text-slate-400">Dimensions</span>
          </div>
          <div className="flex items-center justify-center">
            <MapPin className="w-6 h-6 text-amber-600 mr-2" />
            <span className="font-medium">{location || 'Lagos, Nigeria'}</span>
          </div>
        </div>
      </section>

      {/* DOCUMENT STATUS - Art Directed Section */}
      <section className="py-16 px-6 lg:px-0">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl text-center mb-12">📄 Documentation Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* C of O - MASSIVE */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`p-8 text-center border-2 ${hasCofO ? 'bg-emerald-50 border-emerald-500' : 'bg-slate-50 border-slate-200'}`}
            >
              <FileCheck className={`w-16 h-16 mx-auto mb-4 ${hasCofO ? 'text-emerald-600' : 'text-slate-300'}`} />
              <h3 className="font-display text-xl mb-2">Certificate of Occupancy</h3>
              <span className={`text-sm font-bold uppercase ${hasCofO ? 'text-emerald-600' : 'text-amber-600'}`}>
                {hasCofO ? '✓ Verified' : '⏳ Pending'}
              </span>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`p-8 text-center border-2 ${hasSurvey ? 'bg-emerald-50 border-emerald-500' : 'bg-slate-50 border-slate-200'}`}
            >
              <FileText className={`w-16 h-16 mx-auto mb-4 ${hasSurvey ? 'text-emerald-600' : 'text-slate-300'}`} />
              <h3 className="font-display text-xl mb-2">Survey Plan</h3>
              <span className={`text-sm font-bold uppercase ${hasSurvey ? 'text-emerald-600' : 'text-amber-600'}`}>
                {hasSurvey ? '✓ Available' : '⏳ Pending'}
              </span>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`p-8 text-center border-2 ${hasConsent ? 'bg-emerald-50 border-emerald-500' : 'bg-slate-50 border-slate-200'}`}
            >
              <FileBadge className={`w-16 h-16 mx-auto mb-4 ${hasConsent ? 'text-emerald-600' : 'text-slate-300'}`} />
              <h3 className="font-display text-xl mb-2">Governor's Consent</h3>
              <span className={`text-sm font-bold uppercase ${hasConsent ? 'text-emerald-600' : 'text-amber-600'}`}>
                {hasConsent ? '✓ Obtained' : '⏳ Pending'}
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LOCATION ADVANTAGES */}
      {advantages.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-display text-2xl mb-6">📍 Location Advantages</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {advantages.map((adv, i) => (
                <li key={i} className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-100">
                  <span className="text-amber-600">✓</span>
                  {adv}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 bg-amber-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl text-white mb-6">Ready to Secure This Plot?</h2>
          <a
            href={`https://wa.me/${whatsappNumber}?text=I'm interested in the ${sqm}sqm land at ${location}`}
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-amber-900 font-bold uppercase tracking-widest hover:bg-amber-50 transition-colors"
          >
            <Phone className="w-5 h-5" />
            Inquire on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
