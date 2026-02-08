/**
 * @fileoverview Redis Rate Limiting Module
 * @description Rate limiting implementation using Upstash Redis for serverless environments
 * Ticket: BLDR-4API-001
 *
 * Features:
 * - Per-user rate limiting
 * - Tiered limits (Free: 5/hr, Pro: 50/hr, Enterprise: 500/hr)
 * - Returns rate limit headers
 * - Redis-based for serverless compatibility
 */

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

/**
 * Rate limit configuration options
 */
export interface RateLimitConfig {
  /** Maximum number of requests allowed within the window */
  maxRequests: number;
  /** Time window for rate limiting (e.g., '1m', '1h', '1d') */
  window: '1m' | '5m' | '10m' | '1h' | '1d';
}

/**
 * Result of a rate limit check
 */
export interface RateLimitResult {
  /** Whether the request is allowed */
  allowed: boolean;
  /** Number of requests remaining in the current window */
  remaining: number;
  /** Unix timestamp when the rate limit will reset */
  reset: number;
  /** Maximum requests allowed */
  limit: number;
  /** Rate limit headers for HTTP responses */
  headers: {
    'X-RateLimit-Limit': string;
    'X-RateLimit-Remaining': string;
    'X-RateLimit-Reset': string;
  };
}

/**
 * Rate limiter interface
 */
export interface RateLimiter {
  /**
   * Check if a request is allowed for the given identifier
   * @param identifier - Unique identifier for the rate limit (e.g., user ID, IP)
   * @returns Rate limit result with allowed status and metadata
   */
  check(identifier: string): Promise<RateLimitResult>;
}

/**
 * Predefined rate limit tiers for Nigerian real estate platform
 */
export const RATE_LIMIT_TIERS = {
  /** Free tier: 5 requests per hour */
  free: { maxRequests: 5, window: '1h' as const },
  /** Pro tier: 50 requests per hour (₦5,000/month) */
  pro: { maxRequests: 50, window: '1h' as const },
  /** Enterprise tier: 500 requests per hour (₦50,000/month) */
  enterprise: { maxRequests: 500, window: '1h' as const },
} as const;

/**
 * Convert window string to milliseconds for Upstash Ratelimit
 */
function windowToMs(window: RateLimitConfig['window']): number {
  const units: Record<string, number> = {
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  const match = window.match(/^(\d+)([mhd])$/);
  if (!match) {
    throw new Error(`Invalid window format: ${window}`);
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  return value * units[unit];
}

/**
 * Create a Redis-backed rate limiter
 *
 * @example
 * ```typescript
 * // Create a rate limiter with custom limits
 * const limiter = rateLimit({ maxRequests: 10, window: '1h' });
 *
 * // Check rate limit for a user
 * const result = await limiter.check('user-123');
 * if (!result.allowed) {
 *   return new Response('Too Many Requests', {
 *     status: 429,
 *     headers: result.headers,
 *   });
 * }
 *
 * // Use predefined tiers
 * const proLimiter = rateLimit(RATE_LIMIT_TIERS.pro);
 * ```
 *
 * @param config - Rate limit configuration
 * @returns Rate limiter instance
 */
export function rateLimit(config: RateLimitConfig): RateLimiter {
  const redis = Redis.fromEnv();
  const windowMs = windowToMs(config.window);

  const limiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(config.maxRequests, `${windowMs} ms`),
    analytics: true,
    prefix: 'buildr:ratelimit',
  });

  return {
    async check(identifier: string): Promise<RateLimitResult> {
      const result = await limiter.limit(identifier);

      return {
        allowed: result.success,
        remaining: result.remaining,
        reset: result.reset,
        limit: result.limit,
        headers: {
          'X-RateLimit-Limit': String(result.limit),
          'X-RateLimit-Remaining': String(result.remaining),
          'X-RateLimit-Reset': String(result.reset),
        },
      };
    },
  };
}

/**
 * Get a rate limiter for a specific subscription tier
 *
 * @example
 * ```typescript
 * const limiter = getTierLimiter('pro');
 * const result = await limiter.check('user-123');
 * ```
 *
 * @param tier - Subscription tier name
 * @returns Rate limiter configured for the tier
 */
export function getTierLimiter(
  tier: keyof typeof RATE_LIMIT_TIERS
): RateLimiter {
  return rateLimit(RATE_LIMIT_TIERS[tier]);
}
