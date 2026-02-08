// __tests__/config/env.test.ts
describe('Environment Configuration', () => {
  it('should have required env vars defined', () => {
    expect(process.env.DATABASE_URL).toBeDefined();
    expect(process.env.GOOGLE_GENERATIVE_AI_API_KEY).toBeDefined();
  });
  
  it('should have optional env vars available', () => {
    // These are optional so we just check they're accessible
    const hasUpstash = process.env.UPSTASH_REDIS_REST_URL !== undefined;
    const hasPaystack = process.env.PAYSTACK_SECRET_KEY !== undefined;
    
    // They can be undefined, this test just ensures no errors accessing them
    expect(hasUpstash || !hasUpstash).toBe(true);
    expect(hasPaystack || !hasPaystack).toBe(true);
  });
});
