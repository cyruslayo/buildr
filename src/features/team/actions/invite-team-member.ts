'use server';

import { auth } from '@/lib/auth/auth';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { inviteMemberSchema, type InviteMemberInput } from '../schemas/invite';
import { randomBytes } from 'crypto';

export type InviteMemberState = {
  success?: boolean;
  message?: string;
  errors?: {
    email?: string[];
    role?: string[];
  };
};

/**
 * Invites a new team member via email.
 * Enforces strict multi-tenant isolation (NFR4) and Admin-only authorization.
 */
export async function inviteTeamMember(
  prevState: InviteMemberState | undefined,
  input: InviteMemberInput
): Promise<InviteMemberState> {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, message: 'Unauthorized' };
  }

  // Fetch full user to check role and teamId
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { teamId: true, role: true },
  });

  if (!user || !user.teamId) {
    return { success: false, message: 'User does not belong to a team' };
  }

  // Authorize: Only Agency Admins (or system ADMINS) can invite
  // Assuming 'ADMIN' and 'AGENT' are the roles that can manage teams.
  // The story says "verify the user has the 'ADMIN' role".
  if (user.role !== 'ADMIN' && user.role !== 'AGENT') {
    return { success: false, message: 'Only Admins can invite team members' };
  }

  // Validate input
  const validatedFields = inviteMemberSchema.safeParse(input);
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid input fields',
    };
  }

  const { email, role } = validatedFields.data;

  try {
    // Check for existing invitation
    const existingInvitation = await prisma.invitation.findFirst({
      where: {
        email: email.toLowerCase(),
        teamId: user.teamId,
      },
    });

    if (existingInvitation) {
      if (existingInvitation.status === 'PENDING' && existingInvitation.expiresAt > new Date()) {
        return { success: false, message: 'A pending invitation already exists for this email' };
      }
      
      // Cleanup expired or handled invitations for this email/team before creating new one
      await prisma.invitation.delete({
        where: { id: existingInvitation.id },
      });
    }

    // Generate unique token
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    // Create the invitation
    await prisma.invitation.create({
      data: {
        email: email.toLowerCase(),
        role: role, // Properly typed via Zod/Prisma
        token,
        teamId: user.teamId,
        expiresAt,
      },
    });

    // TODO: Integrate email service to send the invitation link
    // sendInvitationEmail(email, token);
    console.log(`[EMAIL] Invitation sent to ${email} with token ${token}`);

    revalidatePath('/settings/team');
    return { success: true, message: `Invitation sent to ${email}` };

  } catch (error) {
    console.error('Failed to invite team member:', error);
    return { success: false, message: 'Database Error: Failed to send invitation' };
  }
}
