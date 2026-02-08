'use client';
// Justification: Uses Framer Motion for animations

/**
 * Terrace Life Template
 * 
 * Art Direction Brief:
 * - Target Emotion: "Join the neighborhood"
 * - Layout: Community-focused with social proof elements
 * - Typography: Inter sans-serif, friendly
 * - Color: Modern mint (#059669) with warm tones
 * - Motion: Card animations, community emphasis
 */

import React from 'react';
import { motion } from 'framer-motion';
import { formatNaira, formatArea, formatWhatsAppLink, FEATURE_LABELS } from '@/lib/templates';
import type { StandardTemplateProps } from './types';
import type { NigerianFeature } from '@/lib/templates/types';

export function TerraceLife({
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
    <div className="min-h-screen bg-[#ecfdf5]">
      {/* Top Bar */}
      <header className="bg-[#059669] text-white py-3 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isVerified && (
              <span className="px-2 py-0.5 bg-white/20 text-xs font-medium rounded">
                ✓ Verified
              </span>
            )}
            <span className="text-sm opacity-90">{location}</span>
          </div>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium hover:underline"
          >
            Contact Agent
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-block px-4 py-1 bg-[#059669]/10 text-[#059669] 
                           text-sm font-medium rounded-full mb-4"
              >
                Community Living
              </motion.span>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-[#1e293b] mb-4"
              >
                {title || `${beds} Bedroom Terrace`}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-600 mb-6"
              >
                {location}
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-bold text-[#059669] mb-8"
              >
                {formattedPrice}
              </motion.p>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-6 mb-8"
              >
                <div className="flex items-center gap-2">
                  <span className="w-10 h-10 bg-[#059669]/10 rounded-full flex items-center 
                                 justify-center text-[#059669] font-bold">{beds}</span>
                  <span className="text-gray-600">Bedrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-10 h-10 bg-[#059669]/10 rounded-full flex items-center 
                                 justify-center text-[#059669] font-bold">{baths}</span>
                  <span className="text-gray-600">Bathrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-10 h-10 bg-[#059669]/10 rounded-full flex items-center 
                                 justify-center text-[#059669] font-bold text-xs">{formattedArea}</span>
                  <span className="text-gray-600">Area</span>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#128C7E] 
                           text-white font-semibold rounded-xl transition-all duration-300
                           hover:shadow-lg hover:shadow-[#25D366]/30"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
                <button className="px-8 py-4 bg-white border-2 border-[#059669] text-[#059669] 
                                 font-semibold rounded-xl hover:bg-[#059669] hover:text-white 
                                 transition-all duration-300">
                  Book Inspection
                </button>
              </motion.div>
            </div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
            >
              {images[0] ? (
                <img
                  src={images[0]}
                  alt={title || 'Terrace property'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#059669] to-[#065f46]" />
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Description & Features */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Description */}
            {description && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-4 text-[#1e293b]">About This Home</h2>
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </motion.div>
            )}

            {/* Features */}
            {features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold mb-4 text-[#1e293b]">What You Get</h2>
                <div className="grid grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm"
                    >
                      <span className="w-6 h-6 bg-[#059669] text-white rounded-full 
                                     flex items-center justify-center text-xs">✓</span>
                      <span className="text-sm text-gray-700">
                        {FEATURE_LABELS[feature as NigerianFeature] || feature.replace(/_/g, ' ')}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery */}
      {images.length > 1 && (
        <section className="py-12 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center text-[#1e293b]">
              More Views
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.slice(1, 5).map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl 
                           transition-shadow cursor-pointer"
                >
                  <img
                    src={img}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trust/Agent Section */}
      <section className="py-12 px-6 bg-[#059669] text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Make This Your Home?</h2>
          <p className="text-white/80 mb-6">
            {agentName ? `Contact ${agentName} to schedule a viewing` : 'Schedule a viewing today'}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            {rcNumber && (
              <span className="px-4 py-2 bg-white/20 rounded-lg text-sm">
                RC: {rcNumber}
              </span>
            )}
            {isVerified && (
              <span className="px-4 py-2 bg-white/20 rounded-lg text-sm">
                ✓ Verified Listing
              </span>
            )}
          </div>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 bg-white text-[#059669] 
                       font-semibold rounded-xl hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}

export default TerraceLife;
