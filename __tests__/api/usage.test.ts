/**
 * @fileoverview Usage API Tests
 * @description TDD tests for GET /api/usage endpoint
 * Ticket: BLDR-4API-003
 */

// Mock auth 
const mockAuth = jest.fn();
jest.mock('@/lib/auth/auth', () => ({
  auth: () => mockAuth(),
}));

// Mock usage library
const mockGetUsage = jest.fn();
jest.mock('@/lib/usage', () => ({
  getUsage: (...args: unknown[]) => mockGetUsage(...args),
}));

import { GET } from '@/app/api/usage/route';

describe('GET /api/usage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 401 when not authenticated', async () => {
    mockAuth.mockResolvedValue(null);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toContain('Authentication required');
  });

  it('returns usage data for authenticated user', async () => {
    mockAuth.mockResolvedValue({
      user: { id: 'user_123', email: 'test@example.com' },
    });
    mockGetUsage.mockResolvedValue({
      generations: 2,
      limit: 3,
      remaining: 1,
      tier: 'free',
      resetsAt: '2025-01-01T00:00:00Z',
    });

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.generations).toBe(2);
    expect(data.limit).toBe(3);
    expect(data.remaining).toBe(1);
    expect(data.tier).toBe('free');
    expect(data.resetsAt).toBeDefined();
  });

  it('calls getUsage with correct parameters', async () => {
    mockAuth.mockResolvedValue({
      user: { id: 'user_456', email: 'test@example.com' },
    });
    mockGetUsage.mockResolvedValue({
      generations: 0,
      limit: 3,
      remaining: 3,
      tier: 'free',
      resetsAt: '2025-01-01T00:00:00Z',
    });

    await GET();

    expect(mockGetUsage).toHaveBeenCalledWith('user_456', 'free');
  });
});
