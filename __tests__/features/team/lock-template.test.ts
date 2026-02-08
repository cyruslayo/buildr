import { toggleTemplateLock, getLockedTemplates } from '@/features/team/actions/lock-template';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth/auth';

// Mock auth and prisma
jest.mock('@/lib/auth/auth');
jest.mock('@/lib/db', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
    lockedTemplate: {
      upsert: jest.fn(),
      deleteMany: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

describe('toggleTemplateLock Server Action', () => {
  const adminId = 'admin-user-id';
  const teamId = 'team-alpha-id';
  const templateId = 'tmpl_listing_luxury_ng';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('successfully locks a template for admin', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { id: adminId }
    });

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: adminId,
      teamId,
      role: 'ADMIN',
    });

    (prisma.lockedTemplate.upsert as jest.Mock).mockResolvedValue({
      id: 'lock-id',
      templateId,
      teamId,
    });

    const result = await toggleTemplateLock(templateId, true);

    expect(result.success).toBe(true);
    expect(result.message).toContain('locked');
    expect(prisma.lockedTemplate.upsert).toHaveBeenCalledWith({
      where: {
        templateId_teamId: { templateId, teamId },
      },
      update: {},
      create: { templateId, teamId },
    });
  });

  it('successfully unlocks a template for admin', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { id: adminId }
    });

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: adminId,
      teamId,
      role: 'ADMIN',
    });

    (prisma.lockedTemplate.deleteMany as jest.Mock).mockResolvedValue({ count: 1 });

    const result = await toggleTemplateLock(templateId, false);

    expect(result.success).toBe(true);
    expect(result.message).toContain('unlocked');
    expect(prisma.lockedTemplate.deleteMany).toHaveBeenCalledWith({
      where: { templateId, teamId },
    });
  });

  it('prevents non-admin users from locking templates', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { id: 'editor-user-id' }
    });

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 'editor-user-id',
      teamId,
      role: 'EDITOR',
    });

    const result = await toggleTemplateLock(templateId, true);

    expect(result.success).toBe(false);
    expect(result.message).toContain('Only Admins');
  });
});

describe('getLockedTemplates Server Action', () => {
  const userId = 'user-id';
  const teamId = 'team-alpha-id';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns locked template IDs for the current team', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { id: userId }
    });

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: userId,
      teamId,
    });

    (prisma.lockedTemplate.findMany as jest.Mock).mockResolvedValue([
      { templateId: 'tmpl_1' },
      { templateId: 'tmpl_2' },
    ]);

    const result = await getLockedTemplates();

    expect(result).toEqual(['tmpl_1', 'tmpl_2']);
    expect(prisma.lockedTemplate.findMany).toHaveBeenCalledWith({
      where: { teamId },
      select: { templateId: true },
    });
  });

  it('returns empty array if user has no team', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { id: userId }
    });

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: userId,
      teamId: null,
    });

    const result = await getLockedTemplates();

    expect(result).toEqual([]);
  });
});
