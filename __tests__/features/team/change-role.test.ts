import { changeTeamMemberRole } from '@/features/team/actions/change-role';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth/auth';
import { TeamRole } from '@prisma/client';

// Mock auth and prisma
jest.mock('@/lib/auth/auth');
jest.mock('@/lib/db', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
      count: jest.fn(),
    },
  },
}));

describe('changeTeamMemberRole Server Action', () => {
  const adminId = 'admin-user-id';
  const targetId = 'target-user-id';
  const teamId = 'team-alpha-id';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('successfully changes role for team member', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { id: adminId }
    });

    (prisma.user.findUnique as jest.Mock)
      .mockResolvedValueOnce({ id: adminId, teamId, role: 'ADMIN' }) // Admin lookup
      .mockResolvedValueOnce({ id: targetId, teamId, role: 'EDITOR' }); // Target lookup

    (prisma.user.update as jest.Mock).mockResolvedValue({ id: targetId, role: 'ADMIN' });

    const result = await changeTeamMemberRole(targetId, TeamRole.ADMIN);

    expect(result.success).toBe(true);
    expect(result.message).toContain('ADMIN');
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: targetId },
      data: { role: 'ADMIN' },
    });
  });

  it('rejects non-admin users', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { id: 'regular-user-id' }
    });

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 'regular-user-id',
      teamId,
      role: 'EDITOR', // Not an admin
    });

    const result = await changeTeamMemberRole(targetId, TeamRole.ADMIN);

    expect(result.success).toBe(false);
    expect(result.message).toContain('Only Admins');
  });

  it('prevents cross-tenant role changes (NFR4)', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { id: adminId }
    });

    (prisma.user.findUnique as jest.Mock)
      .mockResolvedValueOnce({ id: adminId, teamId: 'team-alpha', role: 'ADMIN' })
      .mockResolvedValueOnce({ id: targetId, teamId: 'team-beta', role: 'EDITOR' }); // Different team

    const result = await changeTeamMemberRole(targetId, TeamRole.ADMIN);

    expect(result.success).toBe(false);
    expect(result.message).toContain('own team');
  });

  it('prevents last admin from self-demotion', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { id: adminId }
    });

    (prisma.user.findUnique as jest.Mock)
      .mockResolvedValueOnce({ id: adminId, teamId, role: 'ADMIN' })
      .mockResolvedValueOnce({ id: adminId, teamId, role: 'ADMIN' }); // Self lookup

    (prisma.user.count as jest.Mock).mockResolvedValue(1); // Only one admin

    const result = await changeTeamMemberRole(adminId, TeamRole.EDITOR);

    expect(result.success).toBe(false);
    expect(result.message).toContain('cannot demote yourself');
  });

  it('allows admin demotion when multiple admins exist', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { id: adminId }
    });

    (prisma.user.findUnique as jest.Mock)
      .mockResolvedValueOnce({ id: adminId, teamId, role: 'ADMIN' })
      .mockResolvedValueOnce({ id: adminId, teamId, role: 'ADMIN' });

    (prisma.user.count as jest.Mock).mockResolvedValue(3); // Multiple admins
    (prisma.user.update as jest.Mock).mockResolvedValue({ id: adminId, role: 'EDITOR' });

    const result = await changeTeamMemberRole(adminId, TeamRole.EDITOR);

    expect(result.success).toBe(true);
  });
});
