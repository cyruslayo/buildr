/**
 * @fileoverview Tests for NextAuth.js authentication configuration
 * TDD tests for auth module - focuses on testable parts without ESM issues
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

// Mock next-auth completely to avoid ESM issues
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

describe('Authentication', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  describe('Password Hashing', () => {
    it('should hash passwords with bcrypt', async () => {
      const { hashPassword } = await import('@/lib/auth/password');
      
      const hash = await hashPassword('TestPassword123!');
      
      expect(hash).toBeDefined();
      expect(hash).not.toBe('TestPassword123!');
      expect(hash.startsWith('$2')).toBe(true); // bcrypt hashes start with $2
    });

    it('should verify correct password', async () => {
      const { hashPassword, verifyPassword } = await import('@/lib/auth/password');
      
      const hash = await hashPassword('TestPassword123!');
      const isValid = await verifyPassword('TestPassword123!', hash);
      
      expect(isValid).toBe(true);
    });

    it('should reject incorrect password', async () => {
      const { hashPassword, verifyPassword } = await import('@/lib/auth/password');
      
      const hash = await hashPassword('TestPassword123!');
      const isValid = await verifyPassword('WrongPassword456!', hash);
      
      expect(isValid).toBe(false);
    });
  });

  describe('Protected Routes Configuration', () => {
    it('should define public routes', async () => {
      const { publicRoutes } = await import('@/lib/auth/routes');
      
      expect(publicRoutes).toContain('/');
      expect(publicRoutes).toContain('/login');
      expect(publicRoutes).toContain('/register');
    });

    it('should define protected routes', async () => {
      const { protectedRoutes } = await import('@/lib/auth/routes');
      
      expect(protectedRoutes).toContain('/dashboard');
    });

    it('should define auth routes', async () => {
      const { authRoutes } = await import('@/lib/auth/routes');
      
      expect(authRoutes).toContain('/login');
      expect(authRoutes).toContain('/register');
    });

    it('should export DEFAULT_LOGIN_REDIRECT', async () => {
      const { DEFAULT_LOGIN_REDIRECT } = await import('@/lib/auth/routes');
      
      expect(DEFAULT_LOGIN_REDIRECT).toBe('/dashboard');
    });

    it('should export API_AUTH_PREFIX', async () => {
      const { API_AUTH_PREFIX } = await import('@/lib/auth/routes');
      
      expect(API_AUTH_PREFIX).toBe('/api/auth');
    });
  });

  describe('Credentials Authentication', () => {
    it('should authenticate with valid credentials', async () => {
      const { prisma } = await import('@/lib/db');
      const { hashPassword } = await import('@/lib/auth/password');
      const { authenticateUser } = await import('@/lib/auth/credentials');
      
      const hashedPassword = await hashPassword('ValidPass123!');
      
      // Mock user found with matching password
      (prisma.user.findUnique as any).mockResolvedValue({
        id: 'test-user-id',
        email: 'test@example.com',
        name: 'Test User',
        password: hashedPassword,
      });
      
      const user = await authenticateUser({
        email: 'test@example.com',
        password: 'ValidPass123!',
      });

      expect(user).toBeDefined();
      expect(user?.email).toBe('test@example.com');
      expect(user?.id).toBe('test-user-id');
    });

    it('should reject invalid credentials', async () => {
      const { prisma } = await import('@/lib/db');
      const { hashPassword } = await import('@/lib/auth/password');
      const { authenticateUser } = await import('@/lib/auth/credentials');
      
      const hashedPassword = await hashPassword('CorrectPass123!');
      
      // Mock user found but with different password
      (prisma.user.findUnique as any).mockResolvedValue({
        id: 'test-user-id',
        email: 'test@example.com',
        name: 'Test User',
        password: hashedPassword,
      });
      
      const user = await authenticateUser({
        email: 'test@example.com',
        password: 'wrongpassword',
      });

      expect(user).toBeNull();
    });

    it('should reject non-existent user', async () => {
      const { prisma } = await import('@/lib/db');
      const { authenticateUser } = await import('@/lib/auth/credentials');
      
      // Mock no user found
      (prisma.user.findUnique as any).mockResolvedValue(null);
      
      const user = await authenticateUser({
        email: 'nonexistent@example.com',
        password: 'anypassword',
      });

      expect(user).toBeNull();
    });

    it('should reject user without password', async () => {
      const { prisma } = await import('@/lib/db');
      const { authenticateUser } = await import('@/lib/auth/credentials');
      
      // Mock user found but without password (OAuth user)
      (prisma.user.findUnique as any).mockResolvedValue({
        id: 'oauth-user-id',
        email: 'oauth@example.com',
        name: 'OAuth User',
        password: null,
      });
      
      const user = await authenticateUser({
        email: 'oauth@example.com',
        password: 'anypassword',
      });

      expect(user).toBeNull();
    });
  });
});
