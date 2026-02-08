import { inviteTeamMember } from '@/features/team/actions/invite-team-member';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth/auth';
import { TeamRole } from '@prisma/client';

// Mock auth and prisma
jest.mock('@/lib/auth/auth');
jest.mock('@/lib/db', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
    invitation: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
  },
}));

describe('inviteTeamMember Server Action (Mocked)', () => {
  const adminId = 'admin-user-id';
  const teamId = 'team-alpha-id';
  const colleagueEmail = 'colleague@example.com';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('successfully creates an invitation for an authorized admin', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { id: adminId, email: 'admin@teamalpha.com' }
    });

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: adminId,
      email: 'admin@teamalpha.com',
      role: 'ADMIN',
      teamId: teamId,
    });

    (prisma.invitation.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.invitation.create as jest.Mock).mockResolvedValue({ id: 'inv-1' });

    const result = await inviteTeamMember(undefined, {
      email: colleagueEmail,
      role: TeamRole.EDITOR,
    });

    expect(result.success).toBe(true);
    expect(result.message).toContain(colleagueEmail);
    expect(prisma.invitation.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        email: colleagueEmail.toLowerCase(),
        teamId: teamId,
      })
    }));
  });

  it('prevents cross-tenant leaks (NFR4) - uses inviter teamId from DB', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { id: adminId, email: 'admin@teamalpha.com' }
    });

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: adminId,
      teamId: teamId,
      role: 'ADMIN',
    });

    await inviteTeamMember(undefined, {
      email: 'leak@example.com',
      role: TeamRole.EDITOR,
    });

    expect(prisma.invitation.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        teamId: teamId,
      })
    }));
  });

  it('fails for non-admin roles', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { id: 'regular-user-id', email: 'user@teamalpha.com' }
    });

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 'regular-user-id',
      role: 'USER',
      teamId: teamId,
    });

    const result = await inviteTeamMember(undefined, {
      email: colleagueEmail,
      role: TeamRole.EDITOR,
    });


    expect(result.success).toBe(false);
    expect(result.message).toContain('Only Admins');
  });
});
