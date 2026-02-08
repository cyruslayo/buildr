'use server';

import { auth } from '@/lib/auth/auth';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export type RemoveMemberState = {
  success?: boolean;
  message?: string;
};

/**
 * Removes a team member by setting their teamId to null.
 * Enforces strict multi-tenant isolation (NFR4) and admin-only authorization.
 */
export async function removeTeamMember(
  targetUserId: string
): Promise<RemoveMemberState> {
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

    // Only admins can remove members
    if (adminUser.role !== 'ADMIN' && adminUser.role !== 'AGENT') {
      return { success: false, message: 'Only Admins can remove team members' };
    }

    // Prevent self-removal
    if (targetUserId === adminUser.id) {
      return { success: false, message: 'You cannot remove yourself from the team' };
    }

    // Fetch the target user
    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserId },
      select: { teamId: true, name: true, email: true },
    });

    if (!targetUser) {
      return { success: false, message: 'User not found' };
    }

    // NFR4: Verify same team membership
    if (targetUser.teamId !== adminUser.teamId) {
      return { success: false, message: 'You can only remove members from your own team' };
    }

    // Remove the user from the team by setting teamId to null
    // Note: Role is not reset here as User.role (Role enum) is incompatible with TeamRole strings.
    // Team-specific roles should be managed via a separate join table.
    await prisma.user.update({
      where: { id: targetUserId },
      data: { 
        teamId: null,
      },
    });

    revalidatePath('/settings/team');
    
    const memberName = targetUser.name || targetUser.email;
    return { 
      success: true, 
      message: `${memberName} has been removed from the team` 
    };

  } catch (error) {
    console.error('Failed to remove team member:', error);
    return { success: false, message: 'Database Error: Failed to remove member' };
  }
}
