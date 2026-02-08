/**
 * @fileoverview Usage Tracking Module
 * @description Track page generations per user with monthly limits
 * Ticket: BLDR-4API-003
 *
 * Features:
 * - Per-user monthly generation tracking
 * - Tier-based limits (Free: 3, Starter: 15, Pro: 50, Enterprise: unlimited)
 * - Automatic monthly reset via Redis key expiry
 * - Redis-based for serverless compatibility
 */

import { Redis } from '@upstash/redis';

/**
 * Monthly generation limits by subscription tier
 */
export const USAGE_LIMITS = {
  /** Free tier: 3 generations per month */
  free: 3,
  /** Starter tier: 15 generations per month (₦5,000) */
  starter: 15,
  /** Pro tier: 50 generations per month (₦15,000) */
  pro: 50,
  /** Enterprise tier: Unlimited (₦50,000) */
  enterprise: Infinity,
} as const;

export type UsageTier = keyof typeof USAGE_LIMITS;

/**
 * Usage tracking result
 */
export interface UsageResult {
  /** Number of generations used this month */
  generations: number;
  /** Maximum generations allowed for the tier */
  limit: number;
  /** Remaining generations for this month */
  remaining: number;
  /** User's subscription tier */
  tier: UsageTier;
  /** ISO date string when usage resets */
  resetsAt: string;
}

// Lazy Redis client initialization
let redisClient: ReturnType<typeof Redis.fromEnv> | null = null;

function getRedis() {
  if (!redisClient) {
    redisClient = Redis.fromEnv();
  }
  return redisClient;
}

/**
 * Get the Redis key for a user's monthly usage
 */
function getUsageKey(userId: string): string {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  return `buildr:usage:${userId}:${year}-${month}`;
}

/**
 * Get the timestamp for the start of next month (when usage resets)
 */
function getMonthEndTimestamp(): number {
  const now = new Date();
  const nextMonth = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth() + 1,
    1,
    0, 0, 0, 0
  ));
  return Math.floor(nextMonth.getTime() / 1000);
}

/**
 * Get the ISO string for when usage resets
 */
function getResetDate(): string {
  const now = new Date();
  const nextMonth = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth() + 1,
    1,
    0, 0, 0, 0
  ));
  return nextMonth.toISOString();
}

/**
 * Track a page generation for a user
 * 
 * @example
 * ```typescript
 * await trackGeneration('user_123');
 * ```
 * 
 * @param userId - The user's unique identifier
 */
export async function trackGeneration(userId: string): Promise<void> {
  const key = getUsageKey(userId);
  const expireAt = getMonthEndTimestamp();
  
  const redis = getRedis();
  
  // Increment the counter
  await redis.incr(key);
  
  // Set expiry at end of month (only sets if not already set)
  await redis.expireat(key, expireAt);
}

/**
 * Get usage statistics for a user
 * 
 * @example
 * ```typescript
 * const usage = await getUsage('user_123', 'free');
 * console.log(`Used ${usage.generations} of ${usage.limit}`);
 * ```
 * 
 * @param userId - The user's unique identifier
 * @param tier - The user's subscription tier (defaults to 'free')
 * @returns Usage statistics
 */
export async function getUsage(
  userId: string,
  tier: UsageTier = 'free'
): Promise<UsageResult> {
  const redis = getRedis();
  const key = getUsageKey(userId);
  const count = await redis.get<number>(key);
  const generations = count ?? 0;
  const limit = USAGE_LIMITS[tier];
  const remaining = Math.max(0, limit - generations);
  
  return {
    generations,
    limit,
    remaining,
    tier,
    resetsAt: getResetDate(),
  };
}

/**
 * Check if a user can generate another page
 * 
 * @example
 * ```typescript
 * if (await checkLimit('user_123', 'free')) {
 *   // Allow generation
 * } else {
 *   // Show upgrade prompt
 * }
 * ```
 * 
 * @param userId - The user's unique identifier
 * @param tier - The user's subscription tier (defaults to 'free')
 * @returns true if the user can generate, false if at/over limit
 */
export async function checkLimit(
  userId: string,
  tier: UsageTier = 'free'
): Promise<boolean> {
  // Enterprise tier has unlimited usage
  if (tier === 'enterprise') {
    return true;
  }
  
  const redis = getRedis();
  const key = getUsageKey(userId);
  const count = await redis.get<number>(key);
  const generations = count ?? 0;
  const limit = USAGE_LIMITS[tier];
  
  return generations < limit;
}

/**
 * Reset usage for a user (admin function)
 * 
 * @example
 * ```typescript
 * await resetUsage('user_123');
 * ```
 * 
 * @param userId - The user's unique identifier
 */
export async function resetUsage(userId: string): Promise<void> {
  const redis = getRedis();
  const key = getUsageKey(userId);
  await redis.del(key);
}
