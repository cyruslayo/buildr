'use client';
// Justification: Uses Framer Motion for scroll-based parallax and animations

/**
 * Ikoyi Penthouse Template
 * 
 * Art Direction Brief:
 * - Target Emotion: "Exclusive lifestyle"
 * - Layout: Vertical scroll story with full-height sections
 * - Typography: Playfair Display with elegant spacing
 * - Color: Luxury cream palette with subtle contrasts
 * - Motion: Parallax effects and scroll-triggered reveals
 */

import React from 'react';
import { motion } from 'framer-motion';
import { formatNaira, formatArea, formatWhatsAppLink } from '@/lib/templates';
import type { LuxuryTemplateProps } from './types';

export function IkoyiPenthouse({
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
    <div className="bg-[#faf8f5] text-[#2c2c2c]">
      {/* Hero Section - Full Height */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <div className="absolute inset-0">
          {images[0] ? (
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              src={images[0]}
              alt={title || 'Luxury penthouse'}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-[#8b7355] to-[#2c2c2c]" />
          )}
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-8 max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 bg-[#d4af37] text-black text-sm font-medium 
                       uppercase tracking-widest mb-6"
          >
            Exclusive Penthouse
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-6"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          >
            {title || `${beds} Bedroom Penthouse`}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 mb-8"
          >
            {location}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-5xl md:text-6xl font-bold text-[#d4af37] mb-10"
          >
            {formattedPrice}
          </motion.div>

          <motion.a
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#25D366] hover:bg-[#128C7E] 
                       text-white text-lg font-semibold rounded-full transition-all duration-300
                       hover:scale-105 shadow-2xl"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            </svg>
            Chat on WhatsApp
          </motion.a>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-3 bg-white/70 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            <div>
              <p className="text-5xl font-serif font-bold text-[#2c2c2c]">{beds}</p>
              <p className="mt-2 text-gray-500 uppercase tracking-wide text-sm">Bedrooms</p>
            </div>
            <div>
              <p className="text-5xl font-serif font-bold text-[#2c2c2c]">{baths}</p>
              <p className="mt-2 text-gray-500 uppercase tracking-wide text-sm">Bathrooms</p>
            </div>
            <div>
              <p className="text-5xl font-serif font-bold text-[#2c2c2c]">{formattedArea}</p>
              <p className="mt-2 text-gray-500 uppercase tracking-wide text-sm">Living Space</p>
            </div>
            <div>
              <p className="text-5xl font-serif font-bold text-[#d4af37]">₦</p>
              <p className="mt-2 text-gray-500 uppercase tracking-wide text-sm">Premium Listing</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Description Section */}
      {description && (
        <section className="py-24 px-8 bg-[#faf8f5]">
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl leading-relaxed text-gray-700"
              style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            >
              {description}
            </motion.p>
          </div>
        </section>
      )}

      {/* Features */}
      {features.length > 0 && (
        <section className="py-20 px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-center mb-12">
              Exceptional Features
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-[#faf8f5] rounded-lg text-center hover:shadow-lg 
                           transition-shadow duration-300"
                >
                  <span className="text-lg capitalize text-gray-700">
                    {feature.replace(/_/g, ' ')}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trust Section */}
      {(agentName || rcNumber || isVerified) && (
        <section className="py-16 px-8 bg-[#2c2c2c] text-white">
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8">
            {isVerified && (
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 bg-[#d4af37] rounded-full flex items-center justify-center">✓</span>
                <span>Verified Listing</span>
              </div>
            )}
            {agentName && (
              <div className="text-center">
                <p className="text-gray-400 text-sm">Listed By</p>
                <p className="font-medium">{agentName}</p>
              </div>
            )}
            {rcNumber && (
              <div className="text-center">
                <p className="text-gray-400 text-sm">RC Number</p>
                <p className="font-medium">{rcNumber}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Floating WhatsApp */}
      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full 
                   flex items-center justify-center shadow-2xl z-50"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
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

export default IkoyiPenthouse;
