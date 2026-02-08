/**
 * @fileoverview Response Caching Module
 * @description Redis-based response caching using Upstash for LLM response caching
 * Ticket: BLDR-4API-002
 *
 * Features:
 * - Cache generated LLM responses by prompt hash
 * - Configurable TTL
 * - Cache hit/miss metrics
 * - Redis-based for serverless compatibility
 */

import { Redis } from '@upstash/redis';
import crypto from 'crypto';

/**
 * Cache entry stored in Redis
 */
interface CacheEntry<T> {
  /** Cached value */
  value: T;
  /** Unix timestamp when the entry was created */
  createdAt: number;
}

/**
 * Cache statistics
 */
export interface CacheStats {
  /** Number of cache hits */
  hits: number;
  /** Number of cache misses */
  misses: number;
  /** Cache hit rate (0-1) */
  hitRate: number;
}

/**
 * Cache configuration options
 */
export interface CacheConfig {
  /** Time-to-live in seconds (default: 3600 = 1 hour) */
  ttlSeconds?: number;
  /** Redis key prefix (default: 'buildr:cache') */
  prefix?: string;
}

/**
 * Create a hash from a string for cache key generation
 *
 * @example
 * ```typescript
 * const hash = createHash('Create a 4 bedroom duplex in Lekki');
 * // Returns: 'a1b2c3d4...'
 * ```
 *
 * @param input - String to hash
 * @returns SHA-256 hash of the input
 */
export function createHash(input: string): string {
  return crypto.createHash('sha256').update(input).digest('hex');
}

/**
 * Redis-based response cache for LLM-generated content
 *
 * @example
 * ```typescript
 * const cache = new ResponseCache({ ttlSeconds: 3600 });
 *
 * // Cache LLM response
 * const result = await cache.getOrGenerate(
 *   createHash(prompt),
 *   async () => await generateWithLLM(prompt)
 * );
 *
 * // Get cache stats
 * const stats = cache.getStats();
 * console.log(`Hit rate: ${stats.hitRate * 100}%`);
 * ```
 */
export class ResponseCache {
  private redis: Redis;
  private ttlSeconds: number;
  private prefix: string;
  private hits: number = 0;
  private misses: number = 0;

  /**
   * Create a new ResponseCache instance
   *
   * @param config - Cache configuration options
   */
  constructor(config: CacheConfig = {}) {
    this.redis = Redis.fromEnv();
    this.ttlSeconds = config.ttlSeconds ?? 3600; // Default: 1 hour
    this.prefix = config.prefix ?? 'buildr:cache';
  }

  /**
   * Get the full Redis key for a cache entry
   * @param key - Cache key
   * @returns Full Redis key with prefix
   */
  private getKey(key: string): string {
    return `${this.prefix}:${key}`;
  }

  /**
   * Get a cached value or generate and cache it
   *
   * @template T - Type of the cached value
   * @param key - Cache key (should be a hash of the prompt)
   * @param generateFn - Function to generate the value if not cached
   * @returns Cached or generated value
   */
  async getOrGenerate<T>(
    key: string,
    generateFn: () => Promise<T>
  ): Promise<T> {
    const fullKey = this.getKey(key);

    // Try to get from cache
    const cached = await this.redis.get<string>(fullKey);

    if (cached) {
      // Cache hit
      this.hits++;
      const entry: CacheEntry<T> = JSON.parse(cached);
      return entry.value;
    }

    // Cache miss - generate new value
    this.misses++;
    const value = await generateFn();

    // Store in cache
    const entry: CacheEntry<T> = {
      value,
      createdAt: Date.now(),
    };

    await this.redis.set(fullKey, JSON.stringify(entry), {
      ex: this.ttlSeconds,
    });

    return value;
  }

  /**
   * Invalidate a specific cache key
   *
   * @param key - Cache key to invalidate
   */
  async invalidate(key: string): Promise<void> {
    const fullKey = this.getKey(key);
    await this.redis.del(fullKey);
  }

  /**
   * Get cache statistics
   *
   * @returns Cache hit/miss statistics
   */
  getStats(): CacheStats {
    const total = this.hits + this.misses;
    return {
      hits: this.hits,
      misses: this.misses,
      hitRate: total > 0 ? this.hits / total : 0,
    };
  }

  /**
   * Reset cache statistics
   */
  resetStats(): void {
    this.hits = 0;
    this.misses = 0;
  }
}

/**
 * Create a cache key from LLM generation parameters
 *
 * @example
 * ```typescript
 * const key = createCacheKey({
 *   templateId: 'tmpl_luxury_ng',
 *   data: { price: 85000000, location: 'Lekki Phase 1' },
 * });
 * ```
 *
 * @param params - Generation parameters
 * @returns Cache key hash
 */
export function createCacheKey(params: {
  templateId: string;
  data: Record<string, unknown>;
  stylePreset?: string;
}): string {
  const normalized = JSON.stringify({
    t: params.templateId,
    d: params.data,
    s: params.stylePreset,
  });
  return createHash(normalized);
}
