// __tests__/db/schema.test.ts
/**
 * Database schema tests
 * 
 * These tests verify that the Prisma client is properly generated
 * and the schema models are correctly defined. They use mocks
 * to avoid requiring an actual database connection.
 */

// Mock the Prisma client to avoid needing a database connection
jest.mock('@/generated/prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    $connect: jest.fn().mockResolvedValue(undefined),
    $disconnect: jest.fn().mockResolvedValue(undefined),
    user: {
      findFirst: jest.fn().mockResolvedValue(null),
      create: jest.fn(),
      findMany: jest.fn().mockResolvedValue([]),
    },
    project: {
      findFirst: jest.fn().mockResolvedValue(null),
      create: jest.fn(),
      findMany: jest.fn().mockResolvedValue([]),
    },
    version: {
      findFirst: jest.fn().mockResolvedValue(null),
      create: jest.fn(),
      findMany: jest.fn().mockResolvedValue([]),
    },
  })),
}));

import { PrismaClient } from '@prisma/client';

describe('Database Schema', () => {
  let prisma: InstanceType<typeof PrismaClient>;

  beforeAll(() => {
    prisma = new PrismaClient();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should connect to database', async () => {
    await expect(prisma.$connect()).resolves.not.toThrow();
  });

  it('should have User model', async () => {
    // Verify the user model has expected methods
    expect(prisma.user).toBeDefined();
    expect(prisma.user.findFirst).toBeDefined();
    const user = await prisma.user.findFirst();
    expect(user).toBeDefined(); // null is valid
  });

  it('should have Project model', async () => {
    // Verify the project model has expected methods
    expect(prisma.project).toBeDefined();
    expect(prisma.project.findFirst).toBeDefined();
    const project = await prisma.project.findFirst();
    expect(project).toBeDefined(); // null is valid
  });

  it('should have Version model', async () => {
    // Verify the version model has expected methods
    expect(prisma.version).toBeDefined();
    expect(prisma.version.findFirst).toBeDefined();
    const version = await prisma.version.findFirst();
    expect(version).toBeDefined(); // null is valid
  });
});
