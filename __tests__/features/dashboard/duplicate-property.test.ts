import { duplicateProperty } from '@/features/dashboard/actions/duplicate-property';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth/auth';
import { PropertyStatus } from '@prisma/client';

// Mock auth and prisma
jest.mock('@/lib/auth/auth');
jest.mock('@/lib/db', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
    property: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

describe('duplicateProperty Server Action', () => {
  const userId = 'user-1';
  const teamId = 'team-1';
  const originalProperty = {
    id: 'prop-1',
    title: 'Beach House',
    price: 50000000,
    location: 'Lekki Phase 1',
    amenities: ['Pool', 'Security'],
    description: 'Lovely beach house',
    propertyData: { style: 'modern' },
    status: PropertyStatus.PUBLISHED,
    userId: 'user-2', // Original owner
    teamId: 'team-1', // Same team
    slug: 'beach-house-123',
    publishedAt: new Date(),
    deletedAt: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('successfully duplicates a property within the same team', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { id: userId }
    });

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: userId,
      teamId,
    });

    (prisma.property.findUnique as jest.Mock).mockResolvedValue(originalProperty);

    (prisma.property.create as jest.Mock).mockImplementation(({ data }) => ({
      ...data,
      id: 'new-prop-id',
    }));

    const result = await duplicateProperty(originalProperty.id);

    expect(result.success).toBe(true);
    expect(result.id).toBeDefined();

    expect(prisma.property.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        title: `Copy of ${originalProperty.title}`,
        status: PropertyStatus.DRAFT,
        userId: userId, // Current user
        teamId: teamId,
        slug: null, // Reset slug
        publishedAt: null, // Reset timestamp
      }),
    });
  });

  it('prevents duplication from a different team (NFR4)', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { id: userId }
    });

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: userId,
      teamId: 'team-2', // User is in Team 2
    });

    (prisma.property.findUnique as jest.Mock).mockResolvedValue(originalProperty); // Property is in Team 1

    await expect(duplicateProperty(originalProperty.id)).rejects.toThrow('Access denied');
  });

  it('throws error if property not found', async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { id: userId }
    });

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: userId,
      teamId,
    });

    (prisma.property.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(duplicateProperty('wrong-id')).rejects.toThrow('Property not found');
  });
});
