'use client';
// Justification: Uses Framer Motion for hover animations and interactive elements

/**
 * Lekki Family Home Template
 * 
 * Art Direction Brief:
 * - Target Emotion: "Your family belongs here"
 * - Layout: Card-based with warm lifestyle focus
 * - Typography: Inter sans-serif for clean readability
 * - Color: Professional blue (#2563eb) with warm amber accent (#f59e0b)
 * - Motion: Card hover lift animations, smooth transitions
 */

import React from 'react';
import { motion } from 'framer-motion';
import { formatNaira, formatArea, formatWhatsAppLink, FEATURE_LABELS } from '@/lib/templates';
import type { StandardTemplateProps } from './types';
import type { NigerianFeature } from '@/lib/templates/types';

export function LekkiFamilyHome({
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
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            {agentName && (
              <span className="text-sm text-gray-500">{agentName}</span>
            )}
          </div>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#128C7E] 
                       text-white text-sm font-medium rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        {/* Hero Image */}
        <div className="h-[50vh] md:h-[60vh] relative overflow-hidden">
          {images[0] ? (
            <img
              src={images[0]}
              alt={title || 'Property'}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#2563eb] to-[#1e40af]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Hero Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {isVerified && (
                  <span className="px-3 py-1 bg-[#22c55e] text-white text-xs font-medium rounded-full">
                    ✓ Verified
                  </span>
                )}
                {rcNumber && (
                  <span className="px-3 py-1 bg-white/20 text-white text-xs rounded-full">
                    RC: {rcNumber}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                {title || `${beds} Bedroom Family Home`}
              </h1>
              
              <p className="text-lg text-white/90">{location}</p>
              
              <p className="text-4xl md:text-5xl font-bold text-[#f59e0b]">
                {formattedPrice}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-12">
            <div className="text-center">
              <p className="text-3xl font-bold text-[#2563eb]">{beds}</p>
              <p className="text-sm text-gray-500">Bedrooms</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#2563eb]">{baths}</p>
              <p className="text-sm text-gray-500">Bathrooms</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#2563eb]">{formattedArea}</p>
              <p className="text-sm text-gray-500">Area</p>
            </div>
            {parking && (
              <div className="text-center">
                <p className="text-3xl font-bold text-[#2563eb]">{parking}</p>
                <p className="text-sm text-gray-500">Parking</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Description */}
          <div className="lg:col-span-2 space-y-8">
            {description && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <h2 className="text-xl font-bold mb-4">About This Property</h2>
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </motion.div>
            )}

            {/* Features Grid */}
            {features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <h2 className="text-xl font-bold mb-6">Property Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-3 p-3 bg-[#f8fafc] rounded-lg 
                               hover:bg-[#2563eb]/5 transition-colors"
                    >
                      <span className="w-8 h-8 bg-[#2563eb]/10 rounded-full flex items-center justify-center text-[#2563eb]">
                        ✓
                      </span>
                      <span className="text-sm text-gray-700">
                        {FEATURE_LABELS[feature as NigerianFeature] || feature.replace(/_/g, ' ')}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Gallery */}
            {images.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <h2 className="text-xl font-bold mb-6">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.slice(1, 7).map((img, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
                    >
                      <img
                        src={img}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl p-6 shadow-lg border-2 border-[#2563eb]"
              >
                <h2 className="text-2xl font-bold text-[#2563eb] mb-4">
                  {formattedPrice}
                </h2>
                <p className="text-gray-600 mb-6">{location}</p>
                
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 bg-[#25D366] hover:bg-[#128C7E] text-white 
                           text-center font-semibold rounded-lg transition-all duration-300
                           hover:shadow-lg hover:shadow-[#25D366]/30"
                >
                  <span className="inline-flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    </svg>
                    Chat on WhatsApp
                  </span>
                </a>
                
                <button className="w-full mt-3 py-3 border-2 border-[#2563eb] text-[#2563eb] 
                                 font-semibold rounded-lg hover:bg-[#2563eb] hover:text-white 
                                 transition-all duration-300">
                  Schedule Viewing
                </button>
              </motion.div>

              {/* Agent Info */}
              {agentName && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm mt-6"
                >
                  <p className="text-sm text-gray-500">Listed by</p>
                  <p className="font-semibold text-lg">{agentName}</p>
                  {rcNumber && (
                    <p className="text-sm text-gray-500 mt-1">RC: {rcNumber}</p>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Floating WhatsApp (Mobile) */}
      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full 
                   flex items-center justify-center shadow-lg z-50 lg:hidden"
      >
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        </svg>
      </motion.a>
    </div>
  );
}

export default LekkiFamilyHome;
