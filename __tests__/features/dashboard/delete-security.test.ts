jest.mock('@/lib/auth/auth', () => ({
  auth: jest.fn(),
}));

import { deletePropertyDraft } from '@/features/dashboard/actions/delete-property';
import { getProperties } from '@/features/dashboard/actions/get-properties';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth/auth';

const mockedAuth = auth as jest.Mock;

describe('Story 4.3: Soft Delete Security & Filtering', () => {
  beforeEach(async () => {
    // Clean up properties before each test
    await prisma.property.deleteMany();
    jest.clearAllMocks();
  });

  it('should allow an owner to soft-delete their draft', async () => {
    mockedAuth.mockResolvedValue({
      user: { id: 'user-1', teamId: 'team-1' },
    });

    const property = await prisma.property.create({
      data: {
        title: 'User 1 Draft',
        status: 'DRAFT',
        userId: 'user-1',
        teamId: 'team-1',
        location: 'Victoria Island',
      },
    });

    const result = await deletePropertyDraft(property.id);
    expect(result.success).toBe(true);

    const updated = await prisma.property.findUnique({
      where: { id: property.id },
    });
    expect(updated?.deletedAt).not.toBeNull();
  });

  it('should allow a team member to soft-delete a draft in their team', async () => {
    mockedAuth.mockResolvedValue({
      user: { id: 'user-2', teamId: 'team-1' }, // User 2 is in Team 1
    });

    const property = await prisma.property.create({
      data: {
        title: 'Team Draft',
        status: 'DRAFT',
        userId: 'user-1', // Owned by User 1
        teamId: 'team-1',
        location: 'Ikoyi',
      },
    });

    const result = await deletePropertyDraft(property.id);
    expect(result.success).toBe(true);

    const updated = await prisma.property.findUnique({
      where: { id: property.id },
    });
    expect(updated?.deletedAt).not.toBeNull();
  });

  it('should block users from different teams from deleting a draft', async () => {
    mockedAuth.mockResolvedValue({
      user: { id: 'user-3', teamId: 'team-2' }, // User 3 is in Team 2
    });

    const property = await prisma.property.create({
      data: {
        title: 'Team 1 Draft',
        status: 'DRAFT',
        userId: 'user-1',
        teamId: 'team-1',
        location: 'Lekki Phase 1',
      },
    });

    await expect(deletePropertyDraft(property.id)).rejects.toThrow(/Forbidden/);

    const updated = await prisma.property.findUnique({
      where: { id: property.id },
    });
    expect(updated?.deletedAt).toBeNull();
  });

  it('should exclude soft-deleted properties from getProperties', async () => {
    mockedAuth.mockResolvedValue({
      user: { id: 'user-1', teamId: 'team-1' },
    });

    // Create one active and one soft-deleted property
    await prisma.property.create({
      data: {
        title: 'Active Draft',
        status: 'DRAFT',
        userId: 'user-1',
        teamId: 'team-1',
      },
    });

    await prisma.property.create({
      data: {
        title: 'Deleted Draft',
        status: 'DRAFT',
        userId: 'user-1',
        teamId: 'team-1',
        deletedAt: new Date(),
      },
    });

    const properties = await getProperties();
    expect(properties.length).toBe(1);
    expect(properties[0].title).toBe('Active Draft');
  });

  it('should block deletion of PUBLISHED properties (must unpublish first)', async () => {
    mockedAuth.mockResolvedValue({
      user: { id: 'user-1', teamId: 'team-1' },
    });

    const property = await prisma.property.create({
      data: {
        title: 'Published Listing',
        status: 'PUBLISHED',
        userId: 'user-1',
        teamId: 'team-1',
      },
    });

    await expect(deletePropertyDraft(property.id)).rejects.toThrow(/Only draft properties can be deleted/);

    const updated = await prisma.property.findUnique({
      where: { id: property.id },
    });
    expect(updated?.deletedAt).toBeNull();
  });
});
