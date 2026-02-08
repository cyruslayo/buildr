'use client';
// Justification: Uses Framer Motion for animations

/**
 * Maitama Mansion Template
 * 
 * Art Direction Brief:
 * - Target Emotion: "Timeless elegance"
 * - Layout: Symmetrical grandeur (intentional contrast to asymmetric)
 * - Typography: Classic serif with elegant spacing
 * - Color: Deep luxury dark with subtle marble texture feel
 * - Motion: Subtle, dignified animations
 */

import React from 'react';
import { motion } from 'framer-motion';
import { formatNaira, formatArea, formatWhatsAppLink } from '@/lib/templates';
import type { LuxuryTemplateProps } from './types';

export function MaitamaMansion({
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
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      {/* Hero Section - Centered Symmetrical */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-8 py-20">
        {/* Background Pattern (Marble texture feel) */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px),
                              radial-gradient(circle at 80% 50%, #fff 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
          }}
        />

        {/* Content - Centered */}
        <div className="relative z-10 text-center max-w-4xl">
          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="w-32 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto mb-8"
          />

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[#c9a227] text-sm uppercase tracking-[0.3em] font-medium"
          >
            Palatial Residence
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          >
            {title || `${beds} Bedroom Mansion`}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-xl text-gray-400"
          >
            {location}
          </motion.p>

          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="w-32 h-px bg-gradient-to-r from-transparent via-[#c9a227] to-transparent mx-auto my-10"
          />

          {/* Price */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-5xl md:text-6xl font-bold text-[#c9a227]"
          >
            {formattedPrice}
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex justify-center gap-12 md:gap-16"
          >
            <div className="text-center">
              <p className="text-4xl font-serif font-bold">{beds}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-gray-500">Bedrooms</p>
            </div>
            <div className="w-px h-16 bg-gray-800" />
            <div className="text-center">
              <p className="text-4xl font-serif font-bold">{baths}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-gray-500">Bathrooms</p>
            </div>
            <div className="w-px h-16 bg-gray-800" />
            <div className="text-center">
              <p className="text-4xl font-serif font-bold">{formattedArea}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-gray-500">Area</p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-12 flex flex-col sm:flex-row justify-center gap-4"
          >
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 
                         bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold 
                         transition-all duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              </svg>
              Chat on WhatsApp
            </a>
            <button className="px-10 py-4 border border-[#c9a227] text-[#c9a227] font-semibold 
                             hover:bg-[#c9a227] hover:text-black transition-all duration-300">
              Schedule Viewing
            </button>
          </motion.div>

          {/* Trust Badges */}
          {(isVerified || rcNumber) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-10 flex justify-center gap-6"
            >
              {isVerified && (
                <span className="inline-flex items-center gap-2 px-4 py-2 border border-[#c9a227]/30 
                               text-[#c9a227] text-sm">
                  <span>✓</span> Verified Listing
                </span>
              )}
              {rcNumber && (
                <span className="inline-flex items-center gap-2 px-4 py-2 border border-gray-800 
                               text-gray-400 text-sm">
                  RC: {rcNumber}
                </span>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Gallery Section */}
      {images.length > 1 && (
        <section className="py-20 px-8 bg-[#050505]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-center mb-12 text-[#c9a227]">
              Gallery
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.slice(0, 6).map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="aspect-[4/3] overflow-hidden"
                >
                  <img
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Description */}
      {description && (
        <section className="py-24 px-8 border-t border-gray-900">
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xl leading-relaxed text-gray-400"
              style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            >
              {description}
            </motion.p>
          </div>
        </section>
      )}

      {/* Features */}
      {features.length > 0 && (
        <section className="py-20 px-8 bg-[#050505]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-serif text-center mb-12 text-[#c9a227] uppercase tracking-widest">
              Amenities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 text-center border border-gray-900 hover:border-[#c9a227]/30 
                           transition-colors duration-300"
                >
                  <span className="text-sm uppercase tracking-wide text-gray-500">
                    {feature.replace(/_/g, ' ')}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Floating WhatsApp */}
      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full 
                   flex items-center justify-center shadow-2xl z-50"
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

export default MaitamaMansion;
