'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Wifi, AirVent, Tv, Car, Zap, ShieldAlert, Sparkles, BedDouble, Bath, Users } from 'lucide-react';
import type { TemplateComponentProps } from './registry';

interface ShortletData {
  title?: string;
  location?: string;
  locationDescription?: string;
  beds?: number;
  baths?: number;
  maxGuests?: number;
  perNight?: string;
  weekly?: string;
  monthly?: string;
  whatsappNumber?: string;
  images?: string[];
}

/**
 * Short-Let Apartment Template
 * Booking page for furnished short-stay apartments.
 * 
 * Art Direction: Gallery-style hero, prominent pricing table, amenity icons.
 */
export default function ShortletApartment({ data }: { data: ShortletData }) {
  const {
    title = 'Luxury Short-Let Apartment',
    location = 'Victoria Island, Lagos',
    locationDescription = 'Prime location in the heart of VI, close to restaurants and entertainment.',
    beds = 2,
    baths = 2,
    maxGuests = 4,
    perNight = '₦80,000',
    weekly = '₦450,000',
    monthly = '₦1,500,000',
    whatsappNumber,
    images = [],
  } = data;

  const heroImage = images[0] || '/templates/shortlet-hero.jpg';

  const amenities = [
    { icon: Wifi, label: 'WiFi' },
    { icon: AirVent, label: 'AC' },
    { icon: Tv, label: 'Netflix' },
    { icon: Car, label: 'Parking' },
    { icon: Zap, label: '24/7 Power' },
    { icon: ShieldAlert, label: 'Security' },
    { icon: Sparkles, label: 'Cleaning' },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-body">
      {/* HERO GALLERY */}
      <header className="relative w-full h-[60vh]">
        <img
          src={heroImage}
          alt={title && location ? `${title} apartment at ${location}` : title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        
        {/* Quick Specs */}
        <div className="absolute bottom-6 left-6 flex gap-3">
          <span className="bg-white/90 text-slate-900 px-3 py-1 text-sm font-medium flex items-center gap-1">
            <BedDouble className="w-4 h-4" /> {beds} Bed
          </span>
          <span className="bg-white/90 text-slate-900 px-3 py-1 text-sm font-medium flex items-center gap-1">
            <Bath className="w-4 h-4" /> {baths} Bath
          </span>
          <span className="bg-white/90 text-slate-900 px-3 py-1 text-sm font-medium flex items-center gap-1">
            <Users className="w-4 h-4" /> Max {maxGuests}
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* LEFT: Info */}
        <div className="lg:col-span-2 space-y-10">
          <div>
            <h1 className="font-display text-3xl lg:text-4xl mb-2">{title}</h1>
            <p className="text-slate-500">{location}</p>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="font-display text-xl mb-4">🏠 Amenities</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {amenities.map(({ icon: Icon, label }, i) => (
                <div key={i} className="flex flex-col items-center p-4 bg-slate-50 border border-slate-100">
                  <Icon className="w-6 h-6 text-emerald-600 mb-2" />
                  <span className="text-sm">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* House Rules */}
          <div>
            <h2 className="font-display text-xl mb-4">📋 House Rules</h2>
            <ul className="space-y-2 text-slate-600">
              <li>• Check-in: 2:00 PM / Check-out: 12:00 PM</li>
              <li>• No smoking</li>
              <li>• No parties or events</li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h2 className="font-display text-xl mb-4">📍 Location</h2>
            <p className="text-slate-600">{locationDescription}</p>
          </div>
        </div>

        {/* RIGHT: Pricing Card */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="sticky top-8 bg-emerald-900 text-white p-8 shadow-xl"
          >
            <h2 className="font-display text-2xl mb-6 text-center">💰 Rates</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center border-b border-emerald-800 pb-3">
                <span className="text-emerald-200">Per Night</span>
                <span className="font-display text-2xl">{perNight}</span>
              </div>
              <div className="flex justify-between items-center border-b border-emerald-800 pb-3">
                <span className="text-emerald-200">Weekly</span>
                <span className="font-display text-2xl">{weekly}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-emerald-200">Monthly</span>
                <span className="font-display text-2xl">{monthly}</span>
              </div>
            </div>
            <a
              href={`https://wa.me/${whatsappNumber}?text=I'd like to book ${title} for [dates]`}
              className="block w-full py-4 bg-white text-emerald-900 font-bold text-center uppercase tracking-widest hover:bg-emerald-50 transition-colors"
            >
              <Phone className="inline w-5 h-5 mr-2" />
              Book on WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
