'use server';

import { auth } from '@/lib/auth/auth';
import { prisma } from '@/lib/prisma';
import { PropertyStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

interface SyncPayload {
  propertyId: string | null;
  lastModified: string; // ISO timestamp from the client (AC4)
  propertyData: {
    title?: string;
    price?: number;
    beds?: number;
    baths?: number;
    sqm?: number;
    location?: string;
    amenities?: string[];
    description?: string;
    images?: string[];
    templateId?: string;
    stylePreset?: string;
    fontPairing?: string;
    [key: string]: unknown;
  };
}

/**
 * Server Action to update or create a property draft.
 * Implements strict multi-tenant security verification and conflict resolution.
 */
export async function updatePropertyDraft(payload: SyncPayload) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const userId = session.user.id;
  const { propertyId, propertyData, lastModified } = payload;
  const clientLastModified = new Date(lastModified);

  try {
    // 1. Conflict Resolution & Ownership Check (AC4 & Security)
    if (propertyId) {
      const existing = await prisma.property.findUnique({
        where: { id: propertyId }
      });

      if (existing) {
        // Multi-tenant isolation check before any update (AR3)
        if (existing.userId !== userId) {
          throw new Error('Forbidden: You do not own this property');
        }

        // Conflict Resolution (Last Write Wins / Guarded Update)
        if (existing.updatedAt > clientLastModified) {
          return {
            success: false,
            error: 'CONFLICT',
            serverData: {
              updatedAt: existing.updatedAt.toISOString(),
            },
          };
        }
      }
    }

    // 2. Secure Upsert/Update
    const property = await prisma.property.upsert({
      where: {
        id: propertyId || 'temp-id-for-upsert-failure', // Will trigger 'create' if null/not found
      },
      update: {
        title: propertyData.title,
        price: propertyData.price,
        beds: propertyData.beds as number | undefined,
        baths: propertyData.baths as number | undefined,
        sqm: propertyData.sqm as number | undefined,
        location: propertyData.location,
        amenities: propertyData.amenities,
        description: propertyData.description,
        templateId: propertyData.templateId as string | undefined,
        stylePreset: propertyData.stylePreset as string | undefined,
        fontPairing: propertyData.fontPairing as string | undefined,
        images: propertyData.images as string[] | undefined,
        updatedAt: new Date(), // Always refresh the server timestamp
      },
      create: {
        title: propertyData.title,
        price: propertyData.price,
        beds: propertyData.beds as number | undefined,
        baths: propertyData.baths as number | undefined,
        sqm: propertyData.sqm as number | undefined,
        location: propertyData.location,
        amenities: propertyData.amenities,
        description: propertyData.description,
        templateId: propertyData.templateId as string | undefined,
        stylePreset: propertyData.stylePreset as string | undefined,
        fontPairing: propertyData.fontPairing as string | undefined,
        images: propertyData.images as string[] | undefined,
        userId: userId,
        status: PropertyStatus.DRAFT,
        // teamId would be assigned here if agency context exists
      },
    });

    revalidatePath('/dashboard');
    return {
      success: true,
      propertyId: property.id,
      updatedAt: property.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error('Failed to sync property draft:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
