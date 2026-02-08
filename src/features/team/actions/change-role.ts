'use server';

import { auth } from '@/lib/auth/auth';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { TeamRole } from '@prisma/client';

export type ChangeRoleState = {
  success?: boolean;
  message?: string;
};

/**
 * Changes the role of a team member.
 * Enforces strict multi-tenant isolation (NFR4) and admin-only authorization.
 */
export async function changeTeamMemberRole(
  targetUserId: string,
  newRole: TeamRole
): Promise<ChangeRoleState> {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, message: 'Unauthorized' };
  }

  try {
    // Fetch the admin user to verify authorization and team membership
    const adminUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { teamId: true, role: true, id: true },
    });

    if (!adminUser || !adminUser.teamId) {
      return { success: false, message: 'You do not belong to a team' };
    }

    // Only admins can change roles
    if (adminUser.role !== 'ADMIN' && adminUser.role !== 'AGENT') {
      return { success: false, message: 'Only Admins can change team member roles' };
    }

    // Fetch the target user
    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserId },
      select: { teamId: true, role: true, id: true },
    });

    if (!targetUser) {
      return { success: false, message: 'User not found' };
    }

    // NFR4: Verify same team membership
    if (targetUser.teamId !== adminUser.teamId) {
      return { success: false, message: 'You can only manage members of your own team' };
    }

    // Prevent self-demotion if last admin
    if (targetUser.id === adminUser.id && newRole === 'EDITOR') {
      const adminCount = await prisma.user.count({
        where: {
          teamId: adminUser.teamId,
          role: { in: ['ADMIN', 'AGENT'] },
        },
      });

      if (adminCount <= 1) {
        return { 
          success: false, 
          message: 'You cannot demote yourself. There must be at least one admin on the team.' 
        };
      }
    }

    // Update the user's team role
    // NOTE: TeamRole (ADMIN/EDITOR) is not compatible with User.role (Role enum: USER/ADMIN/AGENT).
    // This action will need a schema change (e.g., a TeamMember join table) to function correctly.
    // For now, this update is disabled to prevent build errors.
    // await prisma.user.update({
    //   where: { id: targetUserId },
    //   data: { role: newRole },
    // });

    console.warn(`changeTeamMemberRole called for ${targetUserId} to ${newRole}, but role update is currently disabled due to schema incompatibility.`);

    revalidatePath('/settings/team');
    return { 
      success: false, 
      message: `Role change to ${newRole} is currently not supported. Schema migration required.` 
    };

  } catch (error) {
    console.error('Failed to change team member role:', error);
    return { success: false, message: 'Database Error: Failed to update role' };
  }
}
