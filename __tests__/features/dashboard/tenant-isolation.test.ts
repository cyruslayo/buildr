import { getProperties } from '@/features/dashboard/actions/get-properties';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth/auth';

// Mock auth
jest.mock('@/lib/auth/auth');

describe('getProperties Tenant Isolation', () => {
  const teamA = 'team-a-id';
  const teamB = 'team-b-id';
  const userA = 'user-a-id';

  beforeEach(async () => {
    // Seed properties for two different teams
    await prisma.property.deleteMany();
    await prisma.property.createMany({
      data: [
        { id: 'prop-1', title: 'Team A Property', userId: userA, teamId: teamA },
        { id: 'prop-2', title: 'Team B Property', userId: 'user-b-id', teamId: teamB },
      ],
    });
  });

  it('only returns properties belonging to the authenticated team', async () => {
    // Mock session for Team A
    (auth as jest.Mock).mockResolvedValue({
      user: { id: userA, email: 'test@example.com', teamId: teamA },
    });

    const properties = await getProperties();

    expect(properties).toHaveLength(1);
    expect(properties[0].teamId).toBe(teamA);
    expect(properties[0].title).toBe('Team A Property');
  });

  it('throws unauthorized error if no session exists', async () => {
    (auth as jest.Mock).mockResolvedValue(null);

    await expect(getProperties()).rejects.toThrow('Unauthorized');
  });
});
