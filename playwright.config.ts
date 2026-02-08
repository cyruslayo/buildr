import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for Buildr mobile e2e testing.
 * Configured for mobile-first testing as per BLDR-4TST-001.
 */
export default defineConfig({
  testDir: './__tests__/e2e',
  
  /* Global setup - seeds test database with test users */
  globalSetup: './__tests__/e2e/global-setup.ts',
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Increase timeout for local dev/slow compilations */
  timeout: 60000,
  
  
  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  
  /* Opt out of parallel tests on CI */
  workers: process.env.CI ? 1 : undefined,
  
  /* Reporter to use */
  reporter: 'html',
  
  /* Shared settings for all projects */
  use: {
    baseURL: 'http://localhost:3000',
    
    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',
    
    /* Screenshot on failure */
    screenshot: 'only-on-failure',
  },

  /* Configure projects for mobile devices - all use Chromium for consistency */
  projects: [
    {
      name: 'iPhone 13',
      use: { 
        // Use iPhone 13 viewport but with Chromium (avoids needing WebKit install)
        ...devices['iPhone 13'],
        browserName: 'chromium',
      },
    },
    {
      name: 'Samsung Galaxy',
      use: { ...devices['Galaxy S9+'] },
    },
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'pnpm dev',
    url: process.env.BASE_URL || 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120000,
  },
});
