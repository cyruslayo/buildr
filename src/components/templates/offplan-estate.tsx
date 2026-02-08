'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Zap, Droplets, ShieldCheck, TreePine, Building2, CreditCard } from 'lucide-react';
import type { TemplateComponentProps } from './registry';

interface EstateData {
  estateName?: string;
  tagline?: string;
  location?: string;
  renderImage?: string;
  unitTypes?: Array<{ type: string; startingPrice: string; sqm: number }>;
  deliveryDate?: string;
  developerName?: string;
  rcNumber?: string;
  whatsappNumber?: string;
}

/**
 * Off-Plan Estate Template
 * Pre-construction marketing for new estate developments.
 * 
 * Art Direction: 3D render hero, unit type cards, payment plan grid.
 */
export default function OffPlanEstate({ data }: { data: EstateData }) {
  const {
    estateName = 'Lekki Gardens Estate',
    tagline = 'Where Luxury Meets Affordability',
    location = 'Lekki Phase 2, Lagos',
    renderImage = '/templates/estate-render.jpg',
    unitTypes = [
      { type: '2 Bedroom Flat', startingPrice: '₦35,000,000', sqm: 85 },
      { type: '3 Bedroom Flat', startingPrice: '₦55,000,000', sqm: 120 },
      { type: '4 Bedroom Duplex', startingPrice: '₦85,000,000', sqm: 200 },
    ],
    deliveryDate = 'Q4 2025',
    developerName = 'Premium Developers Ltd',
    rcNumber,
    whatsappNumber,
  } = data;

  const estateAmenities = [
    { icon: Zap, label: '24/7 Power Supply' },
    { icon: Droplets, label: 'Central Bore Hole' },
    { icon: ShieldCheck, label: 'Gated Community' },
    { icon: TreePine, label: 'Green Areas' },
  ];

  const paymentPlans = [
    { name: 'Outright Payment', benefit: '5% discount' },
    { name: '6-Month Plan', benefit: '30% initial deposit' },
    { name: '12-Month Plan', benefit: '20% initial deposit' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white font-body">
      {/* HERO */}
      <header className="relative w-full h-[70vh]">
        <img
          src={renderImage}
          alt={estateName && location ? `${estateName} development project at ${location}` : estateName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
        
        {/* Badge */}
        <div className="absolute top-6 left-6 bg-amber-500 text-slate-900 text-xs font-bold px-4 py-2 uppercase tracking-widest">
          🏗️ Off-Plan Development
        </div>
        
        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <h1 className="font-display text-4xl lg:text-6xl mb-2">{estateName}</h1>
            <p className="text-xl text-amber-400 italic mb-4">{tagline}</p>
            <p className="flex items-center gap-2 text-slate-300">
              <Building2 className="w-5 h-5" /> {location}
            </p>
          </motion.div>
        </div>
      </header>

      {/* UNIT TYPES */}
      <section className="py-16 px-6 lg:px-16 bg-slate-800">
        <h2 className="font-display text-3xl text-center mb-12">Available Unit Types</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {unitTypes.map((unit, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-slate-900 border border-slate-700 p-8 text-center"
            >
              <h3 className="font-display text-xl mb-4">{unit.type}</h3>
              <p className="text-amber-400 text-2xl font-bold mb-2">From {unit.startingPrice}</p>
              <p className="text-slate-400 text-sm">{unit.sqm} sqm</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ESTATE AMENITIES */}
      <section className="py-16 px-6 lg:px-16">
        <h2 className="font-display text-3xl text-center mb-12">Estate Infrastructure</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {estateAmenities.map(({ icon: Icon, label }, i) => (
            <div key={i} className="text-center p-6 border border-slate-700">
              <Icon className="w-10 h-10 mx-auto text-amber-400 mb-3" />
              <span className="text-sm">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PAYMENT PLANS */}
      <section className="py-16 px-6 lg:px-16 bg-slate-800">
        <h2 className="font-display text-3xl text-center mb-12">💳 Payment Plans</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {paymentPlans.map((plan, i) => (
            <div key={i} className="bg-slate-900 border border-slate-700 p-8 text-center">
              <CreditCard className="w-8 h-8 mx-auto text-amber-400 mb-4" />
              <h3 className="font-display text-lg mb-2">{plan.name}</h3>
              <p className="text-slate-400 text-sm">{plan.benefit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DELIVERY & DEVELOPER */}
      <section className="py-12 px-6 lg:px-16 text-center">
        <p className="text-slate-400 mb-2">Expected Completion</p>
        <p className="font-display text-2xl text-amber-400 mb-6">{deliveryDate}</p>
        <p className="text-slate-400 text-sm">Developer: <strong className="text-white">{developerName}</strong></p>
        {rcNumber && <p className="text-slate-500 text-xs mt-1">RC: {rcNumber}</p>}
      </section>

      {/* CTA */}
      <section className="py-16 bg-amber-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl text-slate-900 mb-6">Secure Your Unit Today</h2>
          <a
            href={`https://wa.me/${whatsappNumber}?text=I'm interested in ${estateName}. Please send more information.`}
            className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors"
          >
            <Phone className="w-5 h-5" />
            Register Interest
          </a>
        </div>
      </section>
    </div>
  );
}
