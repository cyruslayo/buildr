'use server';

import { auth } from '@/lib/auth/auth';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export type AcceptInvitationState = {
  success?: boolean;
  message?: string;
  teamName?: string;
};

/**
 * Accepts a team invitation and joins the user to the team.
 * Enforces strict multi-tenant isolation (NFR4) by reading teamId from the invitation, not user input.
 */
export async function acceptInvitation(
  token: string
): Promise<AcceptInvitationState> {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, message: 'You must be logged in to accept an invitation' };
  }

  try {
    // Fetch the invitation by token
    const invitation = await prisma.invitation.findUnique({
      where: { token },
      include: { team: true },
    });

    if (!invitation) {
      return { success: false, message: 'Invitation not found or invalid' };
    }

    if (invitation.status !== 'PENDING') {
      return { success: false, message: `This invitation has already been ${invitation.status.toLowerCase()}` };
    }

    if (invitation.expiresAt < new Date()) {
      // Update status to EXPIRED
      await prisma.invitation.update({
        where: { id: invitation.id },
        data: { status: 'EXPIRED' },
      });
      return { success: false, message: 'This invitation has expired. Please request a new one.' };
    }

    // Check if user is already in a team
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { teamId: true, email: true },
    });

    if (currentUser?.teamId) {
      return { success: false, message: 'You are already a member of a team. Leave your current team first.' };
    }

    // Verify the email matches (optional security check)
    if (currentUser?.email?.toLowerCase() !== invitation.email.toLowerCase()) {
      return { 
        success: false, 
        message: 'This invitation was sent to a different email address' 
      };
    }

    // Use transaction to atomically update user and invitation
    await prisma.$transaction([
      // Add user to team
      // Note: TeamRole (ADMIN/EDITOR) is for invitation context, not User.role (Role enum).
      // Team-specific roles should be handled via a separate TeamMember relation or lookup.
      prisma.user.update({
        where: { id: session.user.id },
        data: { 
          teamId: invitation.teamId,
          // Role assignment removed - TeamRole is not compatible with User.role (Role enum)
        },
      }),
      // Mark invitation as accepted
      prisma.invitation.update({
        where: { id: invitation.id },
        data: { status: 'ACCEPTED' },
      }),
    ]);

    revalidatePath('/dashboard');
    revalidatePath('/settings/team');
    
    return { 
      success: true, 
      message: `You have successfully joined ${invitation.team.name}!`,
      teamName: invitation.team.name,
    };

  } catch (error) {
    console.error('Failed to accept invitation:', error);
    return { success: false, message: 'Database Error: Failed to accept invitation' };
  }
}

/**
 * Validates an invitation token without accepting it.
 * Used to display invitation details before the user logs in.
 */
export async function validateInvitationToken(
  token: string
): Promise<{
  valid: boolean;
  teamName?: string;
  invitedEmail?: string;
  role?: string;
  message?: string;
}> {
  try {
    const invitation = await prisma.invitation.findUnique({
      where: { token },
      include: { team: true },
    });

    if (!invitation) {
      return { valid: false, message: 'Invitation not found' };
    }

    if (invitation.status !== 'PENDING') {
      return { valid: false, message: `This invitation has already been ${invitation.status.toLowerCase()}` };
    }

    if (invitation.expiresAt < new Date()) {
      return { valid: false, message: 'This invitation has expired' };
    }

    return {
      valid: true,
      teamName: invitation.team.name,
      invitedEmail: invitation.email,
      role: invitation.role,
    };
  } catch (error) {
    console.error('Failed to validate invitation:', error);
    return { valid: false, message: 'Error validating invitation' };
  }
}
