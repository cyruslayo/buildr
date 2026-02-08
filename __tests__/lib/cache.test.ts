/**
 * @fileoverview Response Caching Tests
 * @description TDD tests for Redis-based response caching using Upstash
 * Ticket: BLDR-4API-002
 */

import { ResponseCache, createHash } from '@/lib/cache';

// Create mock functions outside the mock factory
const mockGet = jest.fn();
const mockSet = jest.fn();
const mockDel = jest.fn();

// Mock Upstash Redis
jest.mock('@upstash/redis', () => ({
  Redis: {
    fromEnv: jest.fn(() => ({
      get: mockGet,
      set: mockSet,
      del: mockDel,
    })),
  },
}));


describe('ResponseCache', () => {
  let cache: ResponseCache;
  let generateFn: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    cache = new ResponseCache();
    generateFn = jest.fn().mockResolvedValue('generated-content');
  });

  describe('getOrGenerate', () => {
    it('calls generator on cache miss', async () => {
      mockGet.mockResolvedValue(null); // Cache miss
      mockSet.mockResolvedValue('OK');

      const result = await cache.getOrGenerate('prompt-hash', generateFn);

      expect(generateFn).toHaveBeenCalledTimes(1);
      expect(result).toBe('generated-content');
    });

    it('returns cached result on cache hit', async () => {
      mockGet.mockResolvedValue(JSON.stringify({
        value: 'cached-content',
        createdAt: Date.now(),
      }));

      const result = await cache.getOrGenerate('prompt-hash', generateFn);

      expect(generateFn).not.toHaveBeenCalled();
      expect(result).toBe('cached-content');
    });

    it('stores generated result in cache', async () => {
      mockGet.mockResolvedValue(null); // Cache miss
      mockSet.mockResolvedValue('OK');

      await cache.getOrGenerate('prompt-hash', generateFn);

      expect(mockSet).toHaveBeenCalled();
      const setCall = mockSet.mock.calls[0];
      expect(setCall[0]).toContain('prompt-hash');
    });

    it('calls generator only once for identical prompts', async () => {
      const cache = new ResponseCache();
      mockGet
        .mockResolvedValueOnce(null) // First call: cache miss
        .mockResolvedValue(JSON.stringify({
          value: 'cached-content',
          createdAt: Date.now(),
        })); // Subsequent calls: cache hit
      mockSet.mockResolvedValue('OK');

      await cache.getOrGenerate('same-hash', generateFn);
      await cache.getOrGenerate('same-hash', generateFn);

      expect(generateFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('TTL configuration', () => {
    it('accepts custom TTL in seconds', () => {
      const cache = new ResponseCache({ ttlSeconds: 3600 });
      expect(cache).toBeDefined();
    });

    it('sets expiry on cached values', async () => {
      const cache = new ResponseCache({ ttlSeconds: 3600 });
      mockGet.mockResolvedValue(null);
      mockSet.mockResolvedValue('OK');

      await cache.getOrGenerate('test-key', generateFn);

      expect(mockSet).toHaveBeenCalled();
      const setCall = mockSet.mock.calls[0];
      // Verify TTL is passed (ex: EX 3600)
      expect(setCall[2]).toHaveProperty('ex', 3600);
    });
  });

  describe('cache metrics', () => {
    it('tracks cache hits', async () => {
      mockGet.mockResolvedValue(JSON.stringify({
        value: 'cached',
        createdAt: Date.now(),
      }));

      await cache.getOrGenerate('key1', generateFn);
      await cache.getOrGenerate('key2', generateFn);

      const stats = cache.getStats();
      expect(stats.hits).toBe(2);
    });

    it('tracks cache misses', async () => {
      mockGet.mockResolvedValue(null);
      mockSet.mockResolvedValue('OK');

      await cache.getOrGenerate('key1', generateFn);

      const stats = cache.getStats();
      expect(stats.misses).toBe(1);
    });

    it('calculates hit rate', async () => {
      mockGet
        .mockResolvedValueOnce(JSON.stringify({ value: 'cached', createdAt: Date.now() }))
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(JSON.stringify({ value: 'cached', createdAt: Date.now() }));
      mockSet.mockResolvedValue('OK');

      await cache.getOrGenerate('key1', generateFn); // hit
      await cache.getOrGenerate('key2', generateFn); // miss
      await cache.getOrGenerate('key3', generateFn); // hit

      const stats = cache.getStats();
      expect(stats.hitRate).toBeCloseTo(0.67, 1);
    });
  });

  describe('invalidate', () => {
    it('removes specific key from cache', async () => {
      mockDel.mockResolvedValue(1);

      await cache.invalidate('key-to-remove');

      expect(mockDel).toHaveBeenCalledWith(expect.stringContaining('key-to-remove'));
    });
  });
});

describe('createHash', () => {
  it('creates consistent hash for same input', () => {
    const hash1 = createHash('test prompt');
    const hash2 = createHash('test prompt');

    expect(hash1).toBe(hash2);
  });

  it('creates different hashes for different inputs', () => {
    const hash1 = createHash('prompt 1');
    const hash2 = createHash('prompt 2');

    expect(hash1).not.toBe(hash2);
  });

  it('returns a string hash', () => {
    const hash = createHash('test');

    expect(typeof hash).toBe('string');
    expect(hash.length).toBeGreaterThan(0);
  });
});
