/**
 * @fileoverview Usage Tracking Tests
 * @description TDD tests for usage tracking and monthly limits
 * Ticket: BLDR-4API-003
 */

// Create mock instance that will be returned by Redis.fromEnv
const mockRedisInstance = {
  get: jest.fn(),
  set: jest.fn(),
  incr: jest.fn(),
  expireat: jest.fn(),
  del: jest.fn(),
};

// Mock Upstash Redis - use a function that returns the mock instance
jest.mock('@upstash/redis', () => ({
  Redis: {
    fromEnv: () => mockRedisInstance,
  },
}));

import {
  trackGeneration,
  getUsage,
  checkLimit,
  resetUsage,
  USAGE_LIMITS,
  type UsageResult,
} from '@/lib/usage';

describe('Usage Tracking', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock Date for consistent monthly key generation
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-12-15T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('trackGeneration', () => {
    it('tracks page generations per user', async () => {
      mockRedisInstance.incr.mockResolvedValue(1);
      mockRedisInstance.expireat.mockResolvedValue(1);

      await trackGeneration('user_123');

      expect(mockRedisInstance.incr).toHaveBeenCalledWith(
        expect.stringContaining('user_123')
      );
      expect(mockRedisInstance.incr).toHaveBeenCalledWith(
        expect.stringContaining('2024-12')
      );
    });

    it('increments count for each generation', async () => {
      mockRedisInstance.incr
        .mockResolvedValueOnce(1)
        .mockResolvedValueOnce(2)
        .mockResolvedValueOnce(3);
      mockRedisInstance.expireat.mockResolvedValue(1);

      await trackGeneration('user_123');
      await trackGeneration('user_123');
      await trackGeneration('user_123');

      expect(mockRedisInstance.incr).toHaveBeenCalledTimes(3);
    });

    it('sets expiry at end of month', async () => {
      mockRedisInstance.incr.mockResolvedValue(1);
      mockRedisInstance.expireat.mockResolvedValue(1);

      await trackGeneration('user_456');

      expect(mockRedisInstance.expireat).toHaveBeenCalled();
      // Should expire at 2025-01-01 00:00:00 UTC
      const expireCall = mockRedisInstance.expireat.mock.calls[0];
      const expireTimestamp = expireCall[1];
      expect(expireTimestamp).toBeGreaterThan(Date.now() / 1000);
    });
  });

  describe('getUsage', () => {
    it('returns current generation count', async () => {
      mockRedisInstance.get.mockResolvedValue(2);

      const usage = await getUsage('user_123');

      expect(usage.generations).toBe(2);
    });

    it('returns 0 for new users', async () => {
      mockRedisInstance.get.mockResolvedValue(null);

      const usage = await getUsage('new_user');

      expect(usage.generations).toBe(0);
    });

    it('includes limit based on tier', async () => {
      mockRedisInstance.get.mockResolvedValue(1);

      const usage = await getUsage('user_123', 'free');

      expect(usage.limit).toBe(3);
      expect(usage.remaining).toBe(2);
    });

    it('calculates remaining correctly', async () => {
      mockRedisInstance.get.mockResolvedValue(10);

      const usage = await getUsage('user_123', 'starter');

      expect(usage.limit).toBe(15);
      expect(usage.remaining).toBe(5);
    });

    it('includes reset date', async () => {
      mockRedisInstance.get.mockResolvedValue(1);

      const usage = await getUsage('user_123');

      expect(usage.resetsAt).toBeDefined();
      // Should reset at start of next month
      expect(new Date(usage.resetsAt).getMonth()).toBe(0); // January
    });
  });

  describe('checkLimit', () => {
    it('returns true when under limit', async () => {
      mockRedisInstance.get.mockResolvedValue(2); // 2 of 3 used

      const canGenerate = await checkLimit('user_free', 'free');

      expect(canGenerate).toBe(true);
    });

    it('blocks when limit reached', async () => {
      mockRedisInstance.get.mockResolvedValue(3); // 3 of 3 used (free tier)

      const canGenerate = await checkLimit('user_free', 'free');

      expect(canGenerate).toBe(false);
    });

    it('blocks when over limit', async () => {
      mockRedisInstance.get.mockResolvedValue(5); // 5 of 3 used (somehow)

      const canGenerate = await checkLimit('user_free', 'free');

      expect(canGenerate).toBe(false);
    });

    it('allows enterprise tier unlimited usage', async () => {
      mockRedisInstance.get.mockResolvedValue(1000); // 1000 used

      const canGenerate = await checkLimit('user_enterprise', 'enterprise');

      expect(canGenerate).toBe(true);
    });

    it('defaults to free tier if not specified', async () => {
      mockRedisInstance.get.mockResolvedValue(3);

      const canGenerate = await checkLimit('user_unknown');

      expect(canGenerate).toBe(false); // 3/3 = at limit
    });
  });

  describe('resetUsage', () => {
    it('resets user usage to 0', async () => {
      mockRedisInstance.del.mockResolvedValue(1);

      await resetUsage('user_123');

      expect(mockRedisInstance.del).toHaveBeenCalledWith(
        expect.stringContaining('user_123')
      );
    });
  });

  describe('USAGE_LIMITS', () => {
    it('defines Free tier with 3 generations per month', () => {
      expect(USAGE_LIMITS.free).toBe(3);
    });

    it('defines Starter tier with 15 generations per month', () => {
      expect(USAGE_LIMITS.starter).toBe(15);
    });

    it('defines Pro tier with 50 generations per month', () => {
      expect(USAGE_LIMITS.pro).toBe(50);
    });

    it('defines Enterprise tier as unlimited', () => {
      expect(USAGE_LIMITS.enterprise).toBe(Infinity);
    });
  });
});

describe('UsageResult interface', () => {
  it('has correct shape', () => {
    const result: UsageResult = {
      generations: 2,
      limit: 3,
      remaining: 1,
      tier: 'free',
      resetsAt: '2025-01-01T00:00:00Z',
    };

    expect(result.generations).toBe(2);
    expect(result.limit).toBe(3);
    expect(result.remaining).toBe(1);
    expect(result.tier).toBe('free');
    expect(result.resetsAt).toBe('2025-01-01T00:00:00Z');
  });
});
