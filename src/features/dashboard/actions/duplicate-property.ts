'use server';

import { auth } from '@/lib/auth/auth';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { PropertyStatus } from '@prisma/client';

/**
 * Duplicates an existing property listing for the current user.
 * Enforces NFR4 multi-tenant isolation (must be in the same team).
 * Resets status to DRAFT and ownership to the duplicator.
 */
export async function duplicateProperty(propertyId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  try {
    // 1. Fetch original property and verify user's team
    const [original, user] = await Promise.all([
      prisma.property.findUnique({
        where: { id: propertyId, deletedAt: null },
      }),
      prisma.user.findUnique({
        where: { id: session.user.id },
        select: { teamId: true },
      }),
    ]);

    if (!original) {
      throw new Error('Property not found');
    }

    if (!user?.teamId) {
      throw new Error('User does not belong to a team');
    }

    // 2. NFR4 check: Ensure the property belongs to the same team
    if (original.teamId !== user.teamId) {
      throw new Error('Access denied: Multi-tenant isolation violation');
    }

    // 3. Create the duplicate
    const duplicate = await prisma.property.create({
      data: {
        title: original.title ? `Copy of ${original.title}` : 'Copy of Untitled Property',
        price: original.price,
        location: original.location,
        beds: original.beds,
        baths: original.baths,
        sqm: original.sqm,
        amenities: original.amenities,
        description: original.description,
        templateId: original.templateId,
        stylePreset: original.stylePreset,
        fontPairing: original.fontPairing,
        images: original.images,
        status: PropertyStatus.DRAFT,
        userId: session.user.id, // Current user becomes the owner
        teamId: user.teamId,
        // Reset slug and published timestamps
        slug: null,
        publishedAt: null,
      },
    });

    revalidatePath('/dashboard');
    
    return { success: true, id: duplicate.id };

  } catch (error) {
    console.error('Failed to duplicate property:', error);
    throw error instanceof Error ? error : new Error('Internal Server Error');
  }
}
