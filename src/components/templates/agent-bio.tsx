'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, ShieldCheck, MapPin, Instagram, Linkedin, Award } from 'lucide-react';
import type { TemplateComponentProps } from './registry';

interface AgentData {
  agentName?: string;
  agentPhoto?: string;
  title?: string;
  bio?: string;
  isVerified?: boolean;
  rcNumber?: string;
  niesv?: boolean;
  redan?: boolean;
  estateSurveyor?: boolean;
  areas?: string[];
  whatsappNumber?: string;
  instagram?: string;
  linkedin?: string;
}

/**
 * Agent Bio Page Template
 * Professional Nigerian agent profile with credentials.
 * 
 * Art Direction: Uses shape-outside to wrap text around the agent's headshot.
 */
export default function AgentBioPage({ data }: { data: AgentData }) {
  const {
    agentName = 'Agent Name',
    agentPhoto = '/templates/agent-photo.jpg',
    title = 'Licensed Real Estate Agent',
    bio = 'A dedicated real estate professional with years of experience in the Nigerian property market.',
    isVerified = false,
    rcNumber,
    niesv = false,
    redan = false,
    estateSurveyor = false,
    areas = [],
    whatsappNumber,
    instagram,
    linkedin,
  } = data;

  const firstName = agentName.split(' ')[0];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-900 font-body">
      {/* HERO */}
      <header className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20" />
        
        <div className="relative max-w-6xl mx-auto px-6 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Photo - 2 cols, shape-outside effect simulated */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="lg:col-span-2 flex justify-center"
          >
            <div className="relative">
              <img
                src={agentPhoto}
                alt={`${agentName} - ${title}`}
                className="w-64 h-64 lg:w-80 lg:h-80 object-cover rounded-full border-4 border-emerald-500 shadow-2xl"
              />
              {isVerified && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Verified Agent
                </div>
              )}
            </div>
          </motion.div>

          {/* Info - 3 cols */}
          <div className="lg:col-span-3 text-center lg:text-left">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="font-display text-4xl lg:text-6xl mb-2"
            >
              {agentName}
            </motion.h1>
            <p className="text-emerald-400 text-lg mb-6">{title}</p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {rcNumber && (
                <span className="bg-white/10 border border-white/20 px-4 py-2 text-sm">
                  RC: {rcNumber}
                </span>
              )}
              {niesv && (
                <span className="bg-white/10 border border-white/20 px-4 py-2 text-sm flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" /> NIESV Member
                </span>
              )}
              {redan && (
                <span className="bg-white/10 border border-white/20 px-4 py-2 text-sm flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" /> REDAN Member
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* BIO */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="font-display text-2xl mb-6">About Me</h2>
        <p className="text-lg text-slate-600 leading-relaxed">{bio}</p>
      </section>

      {/* AREAS OF EXPERTISE */}
      {areas.length > 0 && (
        <section className="bg-white py-12">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-display text-2xl mb-6">Areas of Expertise</h2>
            <div className="flex flex-wrap gap-3">
              {areas.map((area, i) => (
                <span key={i} className="flex items-center gap-2 px-4 py-2 bg-slate-100 border border-slate-200">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-emerald-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl text-white mb-4">Work with {firstName}</h2>
          <p className="text-emerald-200 mb-8">Get expert guidance on your next property transaction.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hello ${agentName}, I'd like to inquire about your services`}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-emerald-900 font-bold uppercase tracking-widest hover:bg-emerald-50 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Chat with {firstName}
            </a>
          </div>

          {/* Social Links */}
          <div className="mt-8 flex justify-center gap-4">
            {instagram && (
              <a href={instagram} className="text-white/60 hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
            )}
            {linkedin && (
              <a href={linkedin} className="text-white/60 hover:text-white transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
