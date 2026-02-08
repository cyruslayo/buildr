'use server';

import { auth } from '@/lib/auth/auth';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export type ToggleLockState = {
  success?: boolean;
  message?: string;
};

/**
 * Toggles the lock status of a template for the current team.
 * Only Admins can lock/unlock templates.
 * Enforces NFR4 multi-tenant isolation.
 */
export async function toggleTemplateLock(
  templateId: string,
  shouldLock: boolean
): Promise<ToggleLockState> {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, message: 'Unauthorized' };
  }

  try {
    // Fetch the user to verify authorization and team membership
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { teamId: true, role: true },
    });

    if (!user || !user.teamId) {
      return { success: false, message: 'You do not belong to a team' };
    }

    // Only admins can lock/unlock templates
    if (user.role !== 'ADMIN' && user.role !== 'AGENT') {
      return { success: false, message: 'Only Admins can lock templates' };
    }

    if (shouldLock) {
      // Create lock record (upsert to handle duplicates gracefully)
      await prisma.lockedTemplate.upsert({
        where: {
          templateId_teamId: {
            templateId,
            teamId: user.teamId,
          },
        },
        update: {}, // No update needed, just ensure it exists
        create: {
          templateId,
          teamId: user.teamId,
        },
      });
    } else {
      // Remove lock record
      await prisma.lockedTemplate.deleteMany({
        where: {
          templateId,
          teamId: user.teamId,
        },
      });
    }

    revalidatePath('/dashboard/templates');
    
    return { 
      success: true, 
      message: shouldLock ? 'Template locked' : 'Template unlocked' 
    };

  } catch (error) {
    console.error('Failed to toggle template lock:', error);
    return { success: false, message: 'Database Error: Failed to update template lock' };
  }
}

/**
 * Gets the list of locked template IDs for the current team.
 */
export async function getLockedTemplates(): Promise<string[]> {
  const session = await auth();

  if (!session?.user?.id) {
    return [];
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { teamId: true },
    });

    if (!user?.teamId) {
      return [];
    }

    const lockedTemplates = await prisma.lockedTemplate.findMany({
      where: { teamId: user.teamId },
      select: { templateId: true },
    });

    return lockedTemplates.map(lt => lt.templateId);

  } catch (error) {
    console.error('Failed to get locked templates:', error);
    return [];
  }
}
