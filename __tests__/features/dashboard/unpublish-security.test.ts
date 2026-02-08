jest.mock('@/lib/auth/auth', () => ({
  auth: jest.fn(),
}));

import { unpublishProperty } from '@/features/dashboard/actions/unpublish-property';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth/auth';

const mockedAuth = auth as jest.Mock;

describe('unpublishProperty Security', () => {
  beforeEach(async () => {
    await prisma.property.deleteMany();
  });

  it('should allow unpublishing a property owned by the same team', async () => {
    mockedAuth.mockResolvedValue({
      user: { id: 'user-1', teamId: 'team-1' },
    });

    const property = await prisma.property.create({
      data: {
        title: 'Team Property',
        price: 1000000,
        status: 'PUBLISHED',
        teamId: 'team-1',
        userId: 'user-1',
        description: 'A team property',
        location: 'Lekki',
      },
    });

    await unpublishProperty(property.id);

    const updated = await prisma.property.findUnique({
      where: { id: property.id },
    });
    expect(updated?.status).toBe('DRAFT');
  });

  it('should block unpublishing attempts by a different team', async () => {
    mockedAuth.mockResolvedValue({
      user: { id: 'user-2', teamId: 'team-2' },
    });

    const property = await prisma.property.create({
      data: {
        title: 'User 1 Property',
        price: 1000000,
        status: 'PUBLISHED',
        teamId: 'team-1',
        userId: 'user-1',
        description: 'Another property',
        location: 'Ikoyi',
      },
    });

    await expect(unpublishProperty(property.id)).rejects.toThrow('Unauthorized');

    const unchanged = await prisma.property.findUnique({
      where: { id: property.id },
    });
    expect(unchanged?.status).toBe('PUBLISHED');
  });
});
