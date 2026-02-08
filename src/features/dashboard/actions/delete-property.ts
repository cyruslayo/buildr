"use server";

import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth/auth';
import { revalidatePath } from 'next/cache';

interface SessionUser {
  id: string;
  teamId?: string;
}

/**
 * Soft deletes a property draft.
 * Enforces strict multi-tenant isolation (NFR4).
 */
export async function deletePropertyDraft(propertyId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const user = session.user as SessionUser;
  const userId = user.id;
  const teamId = user.teamId;

  // 1. Fetch property to verify ownership/team and status
  const property = await prisma.property.findUnique({
    where: { id: propertyId },
  });

  if (!property) {
    throw new Error('Property not found');
  }

  // 2. Security Check: Only owners or members of the same team can delete
  const isOwner = property.userId === userId;
  const isTeamMember = teamId && property.teamId === teamId;

  if (!isOwner && !isTeamMember) {
    throw new Error('Forbidden: You do not have permission to delete this property');
  }

  // 3. Status Check: Only DRAFT properties can be soft-deleted via this action
  // Published properties should be UNPUBLISHED first if that's the desired flow,
  // but Story 4.3 specifically mentions "delete draft pages".
  if (property.status !== 'DRAFT') {
    throw new Error('Only draft properties can be deleted. Please unpublish first.');
  }

  // 4. Perform Soft Delete
  await prisma.property.update({
    where: { id: propertyId },
    data: {
      deletedAt: new Date(),
    },
  });

  revalidatePath('/dashboard');
  
  return { success: true };
}
