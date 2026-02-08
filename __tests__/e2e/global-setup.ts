/**
 * Playwright Global Setup
 * 
 * Seeds test database with required test users before E2E tests run.
 * This ensures tests have valid credentials to work with.
 */
import { config } from 'dotenv'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

// Load environment variables from .env.local and .env
config({ path: '.env.local' })
config({ path: '.env' })

// Test user credentials - used across E2E tests
export const TEST_USER = {
  email: 'test@example.com',
  password: 'password123',
  name: 'Test User',
}

async function globalSetup() {
  console.log('🔧 Setting up test database...')
  
  // Create pg Pool with connection string from env
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })
  
  // Create Prisma adapter
  const adapter = new PrismaPg(pool)
  
  // Create Prisma Client with adapter
  const prisma = new PrismaClient({ adapter })
  
  // Retry logic for unstable connections
  const maxRetries = 3
  let retryCount = 0
  
  try {
    while (retryCount < maxRetries) {
      try {
        // Hash password for test user
        const hashedPassword = await bcrypt.hash(TEST_USER.password, 10)
        
        // Upsert test user (create if not exists, update if exists)
        await prisma.user.upsert({
          where: { email: TEST_USER.email },
          update: {
            password: hashedPassword,
            name: TEST_USER.name,
          },
          create: {
            email: TEST_USER.email,
            password: hashedPassword,
            name: TEST_USER.name,
            ndprConsentAt: new Date(), // Test user has consented
          },
        })
        
        console.log('✅ Test user created/updated:', TEST_USER.email)
        break // Success, exit loop
      } catch (error) {
        retryCount++
        console.error(`⚠️ Failed to seed test database (Attempt ${retryCount}/${maxRetries}):`, error)
        
        if (retryCount === maxRetries) {
          console.error('❌ Max retries reached. Seeding failed.')
          throw error
        }
        
        // Wait 2 seconds before retrying
        await new Promise(resolve => setTimeout(resolve, 2000))
      }
    }
  } finally {
    await prisma.$disconnect()
    await pool.end()
  }
}

export default globalSetup
