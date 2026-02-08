/**
 * @fileoverview Rate Limiting Tests
 * @description TDD tests for Redis-based rate limiting using Upstash
 * Ticket: BLDR-4API-001
 */

import { rateLimit, RateLimitResult, RATE_LIMIT_TIERS } from '@/lib/rate-limit';

// Create the mockLimit function outside the mock factory
const mockLimit = jest.fn();

// Mock Upstash Redis
jest.mock('@upstash/redis', () => ({
  Redis: {
    fromEnv: jest.fn(() => ({
      get: jest.fn(),
      set: jest.fn(),
      incr: jest.fn(),
      expire: jest.fn(),
    })),
  },
}));

// Mock Upstash Ratelimit with slidingWindow static method
jest.mock('@upstash/ratelimit', () => {
  const MockRatelimit = function () {
    return { limit: mockLimit };
  };
  MockRatelimit.slidingWindow = jest.fn().mockReturnValue('sliding-window-config');
  return { Ratelimit: MockRatelimit };
});

describe('Rate Limiter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rateLimit factory', () => {
    it('creates a rate limiter instance', () => {
      const limiter = rateLimit({ maxRequests: 5, window: '1m' });
      expect(limiter).toBeDefined();
      expect(typeof limiter.check).toBe('function');
    });

    it('accepts different window formats', () => {
      const limiter1 = rateLimit({ maxRequests: 10, window: '1h' });
      const limiter2 = rateLimit({ maxRequests: 100, window: '1d' });

      expect(limiter1).toBeDefined();
      expect(limiter2).toBeDefined();
    });
  });

  describe('check method', () => {
    it('allows requests within limit', async () => {
      mockLimit.mockResolvedValue({
        success: true,
        remaining: 4,
        reset: Date.now() + 60000,
        limit: 5,
      });

      const limiter = rateLimit({ maxRequests: 5, window: '1m' });
      const result = await limiter.check('user-123');

      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(4);
    });

    it('blocks requests over limit', async () => {
      mockLimit.mockResolvedValue({
        success: false,
        remaining: 0,
        reset: Date.now() + 60000,
        limit: 2,
      });

      const limiter = rateLimit({ maxRequests: 2, window: '1m' });

      const result = await limiter.check('user-456');

      expect(result.allowed).toBe(false);
      expect(result.remaining).toBe(0);
    });

    it('returns reset timestamp', async () => {
      const resetTime = Date.now() + 60000;
      mockLimit.mockResolvedValue({
        success: true,
        remaining: 3,
        reset: resetTime,
        limit: 5,
      });

      const limiter = rateLimit({ maxRequests: 5, window: '1m' });
      const result = await limiter.check('user-789');

      expect(result.reset).toBe(resetTime);
    });

    it('returns limit in result', async () => {
      mockLimit.mockResolvedValue({
        success: true,
        remaining: 4,
        reset: Date.now() + 60000,
        limit: 5,
      });

      const limiter = rateLimit({ maxRequests: 5, window: '1m' });
      const result = await limiter.check('user-abc');

      expect(result.limit).toBe(5);
    });
  });

  describe('RATE_LIMIT_TIERS', () => {
    it('defines Free tier with 5 requests per hour', () => {
      expect(RATE_LIMIT_TIERS.free).toBeDefined();
      expect(RATE_LIMIT_TIERS.free.maxRequests).toBe(5);
      expect(RATE_LIMIT_TIERS.free.window).toBe('1h');
    });

    it('defines Pro tier with 50 requests per hour', () => {
      expect(RATE_LIMIT_TIERS.pro).toBeDefined();
      expect(RATE_LIMIT_TIERS.pro.maxRequests).toBe(50);
      expect(RATE_LIMIT_TIERS.pro.window).toBe('1h');
    });

    it('defines Enterprise tier with 500 requests per hour', () => {
      expect(RATE_LIMIT_TIERS.enterprise).toBeDefined();
      expect(RATE_LIMIT_TIERS.enterprise.maxRequests).toBe(500);
      expect(RATE_LIMIT_TIERS.enterprise.window).toBe('1h');
    });
  });

  describe('getRateLimitHeaders', () => {
    it('formats rate limit headers correctly', async () => {
      mockLimit.mockResolvedValue({
        success: true,
        remaining: 4,
        reset: Date.now() + 60000,
        limit: 5,
      });

      const limiter = rateLimit({ maxRequests: 5, window: '1m' });
      const result = await limiter.check('user-headers');

      expect(result.headers).toBeDefined();
      expect(result.headers['X-RateLimit-Limit']).toBe('5');
      expect(result.headers['X-RateLimit-Remaining']).toBe('4');
      expect(result.headers['X-RateLimit-Reset']).toBeDefined();
    });
  });
});

describe('RateLimitResult interface', () => {
  it('has correct shape', () => {
    const result: RateLimitResult = {
      allowed: true,
      remaining: 4,
      reset: Date.now(),
      limit: 5,
      headers: {
        'X-RateLimit-Limit': '5',
        'X-RateLimit-Remaining': '4',
        'X-RateLimit-Reset': '1234567890',
      },
    };

    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(4);
    expect(result.limit).toBe(5);
  });
});
