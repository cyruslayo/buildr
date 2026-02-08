'use server';

import { auth } from '@/lib/auth/auth';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

/**
 * Unpublishes a property listing by setting its status back to DRAFT.
 * Enforces strict multi-tenant isolation (NFR4).
 * 
 * @param propertyId - The ID of the property to unpublish
 */
export async function unpublishProperty(propertyId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const userId = session.user.id;
  // Type-safe access to teamId (extended via module augmentation or check)
  const teamId = (session.user as { teamId?: string }).teamId;

  // Verify ownership/team access before unpublishing
  const property = await prisma.property.findUnique({
    where: { id: propertyId },
    select: { teamId: true, userId: true },
  });

  if (!property) {
    throw new Error('Property not found');
  }

  // Strict isolation check: Match teamId if user is in a team, else match userId
  const isAuthorized = teamId 
    ? property.teamId === teamId 
    : property.userId === userId;

  if (!isAuthorized) {
    throw new Error('Unauthorized');
  }

  // Perform the unpublish action
  await prisma.property.update({
    where: { id: propertyId },
    data: { status: 'DRAFT' },
  });

  // Revalidate the dashboard and any public paths affected
  revalidatePath('/dashboard');
  // Note: Public route revalidation would happen at /p/[slug], 
  // but status check in RSC/API will handle the 404.
}
