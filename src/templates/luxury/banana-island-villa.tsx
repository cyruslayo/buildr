'use client';
// Justification: Uses Framer Motion for entry animations and interactive hover states

/**
 * Banana Island Villa Template
 * 
 * Art Direction Brief:
 * - Target Emotion: "I've arrived"
 * - Layout: 2:3 asymmetric split (Brodovitch technique)
 * - Typography: Playfair Display serif for luxury feel
 * - Color: Deep navy background (#1a1a2e) with gold accents (#c9a227)
 * - Motion: Staggered fade-up entry animations
 */

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { formatNaira, formatArea, formatWhatsAppLink } from '@/lib/templates';
import type { LuxuryTemplateProps, FEATURE_ICONS } from './types';

// Animation variants with proper typing for custom delay parameter
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const },
  }),
};

export function BananaIslandVilla({
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
}: LuxuryTemplateProps) {
  const formattedPrice = formatNaira(price);
  const formattedArea = formatArea(sqm);
  const defaultMessage = whatsappMessage || `I am interested in ${title || 'this property'} in ${location}`;
  const whatsappLink = formatWhatsAppLink(whatsappNumber, defaultMessage);

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-[#f5f5f5]">
      {/* Hero Section - 2:3 Asymmetric Split */}
      <section className="grid grid-cols-1 lg:grid-cols-5 min-h-screen">
        {/* Text Content - 2/5 (40%) */}
        <div className="col-span-1 lg:col-span-2 flex flex-col justify-center px-8 lg:px-12 py-16 lg:py-24">
          <motion.span
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="text-sm uppercase tracking-[0.2em] text-[#c9a227] font-medium"
          >
            Exclusive Listing
          </motion.span>

          <motion.h1
            custom={0.1}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="mt-4 text-4xl lg:text-5xl xl:text-6xl font-serif font-bold tracking-tight leading-tight"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          >
            {title || `${beds} Bedroom Luxury Villa`}
          </motion.h1>

          <motion.p
            custom={0.2}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="mt-4 text-lg text-[#c9a227]"
          >
            {location}
          </motion.p>

          <motion.div
            custom={0.3}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="mt-8"
          >
            <span className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#c9a227] to-[#f5d742] bg-clip-text text-transparent">
              {formattedPrice}
            </span>
          </motion.div>

          {/* Property Stats */}
          <motion.div
            custom={0.4}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="mt-8 flex flex-wrap gap-6"
          >
            <div className="text-center">
              <p className="text-3xl font-bold">{beds}</p>
              <p className="text-sm text-gray-400">Bedrooms</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{baths}</p>
              <p className="text-sm text-gray-400">Bathrooms</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{formattedArea}</p>
              <p className="text-sm text-gray-400">Area</p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            custom={0.5}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#128C7E] 
                         text-white font-semibold rounded-lg transition-all duration-300
                         hover:scale-105 hover:shadow-[0_20px_40px_-15px_rgba(37,211,102,0.5)]"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              </svg>
              Chat on WhatsApp
            </a>
            <button className="px-8 py-4 border border-[#c9a227] text-[#c9a227] font-semibold 
                             rounded-lg transition-all duration-300 hover:bg-[#c9a227] hover:text-[#1a1a2e]">
              View Gallery
            </button>
          </motion.div>

          {/* Trust Badges */}
          {(agentName || rcNumber || isVerified) && (
            <motion.div
              custom={0.6}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="mt-8 flex flex-wrap gap-4"
            >
              {isVerified && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#c9a227]/20 text-[#c9a227] 
                               text-sm rounded-full border border-[#c9a227]/30">
                  ✓ Verified
                </span>
              )}
              {rcNumber && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-800 text-gray-300 
                               text-sm rounded-full">
                  RC: {rcNumber}
                </span>
              )}
            </motion.div>
          )}
        </div>

        {/* Hero Image - 3/5 (60%) */}
        <div className="col-span-1 lg:col-span-3 relative overflow-hidden min-h-[400px] lg:min-h-screen">
          {images[0] ? (
            <img
              src={images[0]}
              alt={title || 'Luxury property'}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#16213e] to-[#0f0f1a]" />
          )}
          {/* Gradient overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e] via-transparent to-transparent lg:via-[#1a1a2e]/20" />
        </div>
      </section>

      {/* Description Section */}
      {description && (
        <section className="py-24 px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-xl lg:text-2xl leading-relaxed text-gray-300"
              style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            >
              {description}
            </motion.p>
          </div>
        </section>
      )}

      {/* Features Grid */}
      {features.length > 0 && (
        <section className="py-16 px-8 lg:px-16 bg-[#16213e]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-serif font-bold mb-8 text-[#c9a227]">
              Property Features
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-[#1a1a2e] rounded-lg border border-[#c9a227]/20 
                           hover:border-[#c9a227]/50 transition-colors duration-300"
                >
                  <span className="text-lg capitalize">
                    {feature.replace(/_/g, ' ')}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Floating WhatsApp Button (Mobile) */}
      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full 
                   flex items-center justify-center shadow-lg z-50 lg:hidden"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          </svg>
        </motion.div>
      </motion.a>
    </div>
  );
}

export default BananaIslandVilla;
