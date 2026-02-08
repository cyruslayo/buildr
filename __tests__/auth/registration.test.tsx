/**
 * @fileoverview Tests for User Registration Flow
 * TDD tests for registration API
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';

// Mock Prisma client
jest.mock('@/lib/db', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

// Mock next-auth
jest.mock('next-auth', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    handlers: { GET: jest.fn(), POST: jest.fn() },
    auth: jest.fn(),
    signIn: jest.fn(),
    signOut: jest.fn(),
  })),
}));

jest.mock('@auth/prisma-adapter', () => ({
  PrismaAdapter: jest.fn(() => ({})),
}));

describe('User Registration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  describe('Registration Service', () => {
    it('creates user with valid data', async () => {
      const { prisma } = await import('@/lib/db');
      
      // Mock no existing user
      (prisma.user.findUnique as any).mockResolvedValue(null);
      
      // Mock successful create
      (prisma.user.create as any).mockResolvedValue({
        id: 'new-user-id',
        email: 'new@example.com',
        name: 'New User',
      });
      
      const { registerUser } = await import('@/lib/auth/register');
      
      const result = await registerUser({
        name: 'New User',
        email: 'new@example.com',
        password: 'SecurePass123!',
      });
      
      expect(result.success).toBe(true);
      expect(result.user?.email).toBe('new@example.com');
      expect(prisma.user.create).toHaveBeenCalled();
    });

    it('rejects duplicate email', async () => {
      const { prisma } = await import('@/lib/db');
      
      // Mock existing user
      (prisma.user.findUnique as any).mockResolvedValue({
        id: 'existing-user',
        email: 'existing@example.com',
      });
      
      const { registerUser } = await import('@/lib/auth/register');
      
      const result = await registerUser({
        name: 'Test User',
        email: 'existing@example.com',
        password: 'SecurePass123!',
      });
      
      expect(result.success).toBe(false);
      expect(result.error).toMatch(/already exists/i);
    });

    it('normalizes email to lowercase', async () => {
      const { prisma } = await import('@/lib/db');
      
      // Mock no existing user
      (prisma.user.findUnique as any).mockResolvedValue(null);
      
      // Mock successful create
      (prisma.user.create as any).mockResolvedValue({
        id: 'new-user-id',
        email: 'test@example.com',
        name: 'Test User',
      });
      
      const { registerUser } = await import('@/lib/auth/register');
      
      await registerUser({
        name: 'Test User',
        email: 'TEST@EXAMPLE.COM',
        password: 'SecurePass123!',
      });
      
      // Check that email was normalized
      expect(prisma.user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            email: 'test@example.com',
          }),
        })
      );
    });

    it('hashes password before storing', async () => {
      const { prisma } = await import('@/lib/db');
      
      // Mock no existing user
      (prisma.user.findUnique as any).mockResolvedValue(null);
      
      // Mock successful create
      (prisma.user.create as any).mockResolvedValue({
        id: 'new-user-id',
        email: 'test@example.com',
        name: 'Test User',
      });
      
      const { registerUser } = await import('@/lib/auth/register');
      
      await registerUser({
        name: 'Test User',
        email: 'test@example.com',
        password: 'SecurePass123!',
      });
      
      // Check that password was hashed (bcrypt hash starts with $2)
      expect(prisma.user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            password: expect.stringMatching(/^\$2/),
          }),
        })
      );
    });
  });
});
