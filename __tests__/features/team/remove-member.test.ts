import { removeTeamMember } from '@/features/team/actions/remove-member';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth/auth';

// Mock auth and prisma
jest.mock('@/lib/auth/auth');
jest.mock('@/lib/db', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  },
}));

describe('removeTeamMember Server Action', () => {
  const adminId = 'admin-user-id';
  const targetId = 'target-user-id';
  const teamId = 'team-alpha-id';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('successfully removes a team member', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { id: adminId }
    });

    (prisma.user.findUnique as jest.Mock)
      .mockResolvedValueOnce({ id: adminId, teamId, role: 'ADMIN' })
      .mockResolvedValueOnce({ id: targetId, teamId, name: 'John Doe', email: 'john@test.com' });

    (prisma.user.update as jest.Mock).mockResolvedValue({ id: targetId, teamId: null });

    const result = await removeTeamMember(targetId);

    expect(result.success).toBe(true);
    expect(result.message).toContain('John Doe');
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: targetId },
      data: { teamId: null, role: 'EDITOR' },
    });
  });

  it('prevents non-admin users from removing members', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { id: 'regular-user-id' }
    });

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 'regular-user-id',
      teamId,
      role: 'EDITOR',
    });

    const result = await removeTeamMember(targetId);

    expect(result.success).toBe(false);
    expect(result.message).toContain('Only Admins');
  });

  it('prevents self-removal', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { id: adminId }
    });

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: adminId,
      teamId,
      role: 'ADMIN',
    });

    const result = await removeTeamMember(adminId);

    expect(result.success).toBe(false);
    expect(result.message).toContain('cannot remove yourself');
  });

  it('prevents cross-tenant member removal (NFR4)', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { id: adminId }
    });

    (prisma.user.findUnique as jest.Mock)
      .mockResolvedValueOnce({ id: adminId, teamId: 'team-alpha', role: 'ADMIN' })
      .mockResolvedValueOnce({ id: targetId, teamId: 'team-beta', name: 'Jane Doe' });

    const result = await removeTeamMember(targetId);

    expect(result.success).toBe(false);
    expect(result.message).toContain('own team');
  });

  it('returns error if target user not found', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { id: adminId }
    });

    (prisma.user.findUnique as jest.Mock)
      .mockResolvedValueOnce({ id: adminId, teamId, role: 'ADMIN' })
      .mockResolvedValueOnce(null);

    const result = await removeTeamMember('non-existent-id');

    expect(result.success).toBe(false);
    expect(result.message).toContain('not found');
  });
});
