import { z } from 'zod';

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),
  
  // Google AI SDK
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1),
  
  // Redis (optional for development)
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
  
  // Authentication
  NEXTAUTH_SECRET: z.string().min(1).optional(),
  NEXTAUTH_URL: z.string().url().optional(),
  
  // Payment (Paystack for Nigerian market)
  PAYSTACK_SECRET_KEY: z.string().optional(),
  
  // Node environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

// Validate and parse environment variables
const parseEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    console.error('❌ Invalid environment variables:');
    if (error instanceof z.ZodError) {
      error.issues.forEach((issue) => {
        console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
      });
    }
    throw new Error('Environment validation failed');
  }
};

// Export validated environment variables
export const env = parseEnv();

// Type-safe env access
export type Env = z.infer<typeof envSchema>;
