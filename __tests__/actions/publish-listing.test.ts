import { publishListing } from '@/features/wizard/actions/publish-listing';
import { prisma } from '@/lib/prisma';

// Mock prisma
jest.mock('@/lib/prisma', () => ({
  prisma: {
    property: {
      update: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

// Mock next/cache
jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

describe('publishListing Server Action', () => {
  const mockListingId = 'listing_123';
  const mockTeamId = 'team_456';
  const mockTitle = 'Luxury 4 Bedroom Duplex';
  const mockLocation = 'Lekki Phase 1';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('generates a clean slug from title and location and marks property as published', async () => {
    (prisma.property.findUnique as jest.Mock).mockResolvedValue({
      id: mockListingId,
      teamId: mockTeamId,
      title: mockTitle,
      location: mockLocation,
    });

    (prisma.property.update as jest.Mock).mockResolvedValue({
      id: mockListingId,
      status: 'PUBLISHED',
      slug: 'luxury-4-bedroom-duplex-lekki-phase-1',
    });

    const result = await publishListing(mockListingId, mockTeamId);

    expect(result.success).toBe(true);
    expect(result.slug).toBe('luxury-4-bedroom-duplex-lekki-phase-1');
    expect(prisma.property.update).toHaveBeenCalledWith({
      where: { id: mockListingId },
      data: {
        status: 'PUBLISHED',
        slug: 'luxury-4-bedroom-duplex-lekki-phase-1',
        publishedAt: expect.any(Date),
      },
    });
  });

  it('fails if the property does not belong to the team', async () => {
    (prisma.property.findUnique as jest.Mock).mockResolvedValue({
      id: mockListingId,
      teamId: 'wrong_team',
    });

    const result = await publishListing(mockListingId, mockTeamId);

    expect(result.success).toBe(false);
    expect(result.error).toContain('Unauthorized');
    expect(prisma.property.update).not.toHaveBeenCalled();
  });

  it('handles database errors gracefully', async () => {
    (prisma.property.findUnique as jest.Mock).mockResolvedValue({
      id: mockListingId,
      teamId: mockTeamId,
    });
    (prisma.property.update as jest.Mock).mockRejectedValue(new Error('DB Error'));

    const result = await publishListing(mockListingId, mockTeamId);

    expect(result.success).toBe(false);
    expect(result.error).toBe('Failed to publish listing');
  });
});
