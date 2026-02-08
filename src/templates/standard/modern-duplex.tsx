'use client';
// Justification: Uses Framer Motion for bento grid animations and counter effects

/**
 * Modern Duplex Template
 * 
 * Art Direction Brief:
 * - Target Emotion: "Contemporary living"
 * - Layout: Bento grid with geometric accents
 * - Typography: Inter sans-serif, clean lines
 * - Color: Professional slate (#334155) with blue accent (#2563eb)
 * - Motion: Stats counter animation, card hover effects
 */

import React from 'react';
import { motion } from 'framer-motion';
import { formatNaira, formatArea, formatWhatsAppLink, FEATURE_LABELS } from '@/lib/templates';
import type { StandardTemplateProps } from './types';
import type { NigerianFeature } from '@/lib/templates/types';

export function ModernDuplex({
  price,
  beds,
  baths,
  sqm,
  location,
  title,
  description,
  features = [],
  whatsappNumber = '+2348000000000',
  whatsappMessage,
  images = [],
  agentName,
  rcNumber,
  isVerified,
  parking,
}: StandardTemplateProps) {
  const formattedPrice = formatNaira(price);
  const formattedArea = formatArea(sqm);
  const defaultMessage = whatsappMessage || `I am interested in ${title || 'this property'} in ${location}`;
  const whatsappLink = formatWhatsAppLink(whatsappNumber, defaultMessage);

  return (
    <div className="min-h-screen bg-white text-[#0f172a]">
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {isVerified && (
              <span className="px-2 py-1 bg-[#22c55e] text-white text-xs font-medium rounded">
                Verified
              </span>
            )}
            <span className="text-sm text-gray-500">{location}</span>
          </div>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] 
                       text-white text-sm font-medium rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </header>

      {/* Bento Hero Grid */}
      <section className="pt-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-6 gap-4 min-h-[70vh]">
            {/* Main Image - Spans 4 cols */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="col-span-6 md:col-span-4 row-span-2 relative rounded-2xl overflow-hidden"
            >
              {images[0] ? (
                <img
                  src={images[0]}
                  alt={title || 'Modern Duplex'}
                  className="w-full h-full object-cover min-h-[300px]"
                />
              ) : (
                <div className="w-full h-full min-h-[300px] bg-gradient-to-br from-[#334155] to-[#1e293b]" />
              )}
              
              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2"
                >
                  {title || `${beds} Bedroom Modern Duplex`}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg text-white/80 mb-4"
                >
                  {location}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl font-bold text-[#60a5fa]"
                >
                  {formattedPrice}
                </motion.p>
              </div>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="col-span-3 md:col-span-2 bg-[#f8fafc] rounded-2xl p-6 flex flex-col justify-center"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-4xl font-bold text-[#2563eb]">{beds}</p>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Beds</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-[#2563eb]">{baths}</p>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Baths</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-[#2563eb]">{formattedArea}</p>
                  <p className="text-xs uppercase tracking-wide text-gray-500">Area</p>
                </div>
                {parking && (
                  <div>
                    <p className="text-4xl font-bold text-[#2563eb]">{parking}</p>
                    <p className="text-xs uppercase tracking-wide text-gray-500">Cars</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Secondary Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="col-span-3 md:col-span-2 rounded-2xl overflow-hidden"
            >
              {images[1] ? (
                <img
                  src={images[1]}
                  alt="Interior"
                  className="w-full h-full object-cover min-h-[150px]"
                />
              ) : (
                <div className="w-full h-full min-h-[150px] bg-gradient-to-br from-[#2563eb] to-[#1d4ed8]" />
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        {/* Description */}
        {description && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-1 bg-[#2563eb]"></span>
              About This Property
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
              {description}
            </p>
          </motion.section>
        )}

        {/* Features */}
        {features.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-1 bg-[#2563eb]"></span>
              Features
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 bg-[#f8fafc] rounded-xl text-center hover:bg-[#2563eb]/5 
                           transition-colors cursor-default"
                >
                  <span className="text-sm text-gray-700">
                    {FEATURE_LABELS[feature as NigerianFeature] || feature.replace(/_/g, ' ')}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0f172a] text-white rounded-2xl p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Interested in this property?
              </h2>
              <p className="text-gray-400">
                Schedule a viewing or chat with us on WhatsApp
              </p>
            </div>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#128C7E] 
                         text-white font-semibold rounded-xl transition-all duration-300
                         hover:scale-105"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </motion.section>
      </main>

      {/* Trust Footer */}
      {(agentName || rcNumber) && (
        <footer className="border-t border-gray-100 py-8">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center text-sm text-gray-500">
            {agentName && <span>Listed by {agentName}</span>}
            {rcNumber && <span className="mx-2">•</span>}
            {rcNumber && <span>RC: {rcNumber}</span>}
          </div>
        </footer>
      )}
    </div>
  );
}

export default ModernDuplex;
