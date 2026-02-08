/**
 * Public Property Page
 * @fileoverview Displays published property with agent verification badge
 * 
 * Route: /p/[slug]
 */

import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import { getTemplateComponent } from '@/components/templates/registry';
import { VerifiedBadge } from '@/components/trust/verified-badge';
import { MapPin, Home, User } from 'lucide-react';
import type { PropertyData } from '@/lib/templates/types';

interface PublicPropertyPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PublicPropertyPage({ params }: PublicPropertyPageProps) {
  const { slug } = await params;

  // 1. Fetch property with agent details (Server-side)
  const property = await prisma.property.findUnique({
    where: { 
      slug,
      status: 'PUBLISHED',
      deletedAt: null,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          kycStatus: true,
        },
      },
    },
  });

  if (!property) {
    notFound();
  }

  // 2. Map DB model to template-friendly PropertyData type
  const propertyData: PropertyData = {
    price: property.price || 0,
    beds: property.beds || 0,
    baths: property.baths || 0,
    sqm: property.sqm || 0,
    location: property.location || 'Lagos, Nigeria',
    title: property.title || 'Luxury Residence',
    description: property.description || '',
    features: (property.amenities as any) || [],
    whatsappNumber: '+2348000000000', // Default fallback
    images: property.images || [],
    agentName: property.user.name || 'Property Agent',
    isVerified: property.user.kycStatus === 'VERIFIED',
    stylePreset: property.stylePreset || undefined,
    fontPairing: property.fontPairing || undefined,
  };

  // 3. Selection of Art-Directed Template
  const TemplateComponent = getTemplateComponent(property.templateId || 'tmpl_listing_luxury_ng');

  if (TemplateComponent) {
    return <TemplateComponent data={propertyData} />;
  }

  // 4. Default Fallback UI (legacy mobile-first layout)
  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-display text-4xl md:text-5xl mb-4">
            {propertyData.title}
          </h1>
          <div className="flex items-center gap-2 text-slate-300">
            <MapPin className="w-5 h-5" />
            <span>{propertyData.location}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Agent Card */}
        <div className="bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Agent Avatar */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {propertyData.agentName?.charAt(0).toUpperCase()}
              </div>
              
              {/* Agent Info */}
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="font-display text-lg text-slate-900">
                    {propertyData.agentName}
                  </h2>
                  <VerifiedBadge kycStatus={property.user.kycStatus} size="sm" />
                </div>
                <p className="text-sm text-slate-500 flex items-center gap-1">
                  <User className="w-4 h-4" />
                  Property Agent
                </p>
              </div>
            </div>

            {/* Contact Button */}
            <a
              href={`https://wa.me/?text=Hello, I'm interested in ${propertyData.title}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Contact Agent
            </a>
          </div>
        </div>

        {/* Property Details */}
        <div className="mt-8 bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6">
          <h3 className="font-display text-xl text-slate-900 mb-4">Property Details</h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <span className="block text-2xl font-bold">{propertyData.beds}</span>
              <span className="text-xs text-slate-500 uppercase">Beds</span>
            </div>
            <div>
              <span className="block text-2xl font-bold">{propertyData.baths}</span>
              <span className="text-xs text-slate-500 uppercase">Baths</span>
            </div>
            <div>
              <span className="block text-2xl font-bold">{propertyData.sqm}</span>
              <span className="text-xs text-slate-500 uppercase">sqm</span>
            </div>
          </div>
          <p className="text-slate-600 leading-relaxed">
            {propertyData.description || 'No description provided.'}
          </p>
        </div>
      </div>
    </main>
  );
}
