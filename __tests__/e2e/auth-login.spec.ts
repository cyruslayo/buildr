import { test, expect } from '@playwright/test'

/**
 * Story 1.2: User Login & Session Management
 * 
 * As a registered agent,
 * I want to log in with my credentials and stay authenticated,
 * So that I can access my dashboard and drafts securely.
 * 
 * ATDD: All tests should FAIL initially (RED phase).
 * Implementation will make them pass (GREEN phase).
 */
test.describe('Story 1.2: User Login & Session Management', () => {
  test.beforeEach(async ({ page }) => {
    // Increase timeout to account for Next.js compilation on cold starts
    test.setTimeout(120000)
  })

  test('AC1: Login with valid credentials redirects to dashboard', async ({ page }) => {
    // GIVEN: I am on the login page with valid credentials
    await page.goto('/login', { waitUntil: 'networkidle', timeout: 90000 })
    await expect(page.locator('form')).toBeVisible({ timeout: 30000 })

    // WHEN: I submit the form with valid credentials
    await page.fill('[data-testid="email-input"]', 'test@example.com')
    await page.fill('[data-testid="password-input"]', 'password123')
    // Use Enter key to submit - more reliable on mobile emulation than click
    await page.press('[data-testid="password-input"]', 'Enter')

    // THEN: I am redirected to my dashboard with an active session
    await expect(page).toHaveURL(/dashboard/, { timeout: 30000 })
    // Wait for dashboard to fully load
    await page.waitForLoadState('networkidle')
    await expect(page.locator('[data-testid="dashboard-header"]')).toBeVisible({ timeout: 30000 })
  })

  test('AC2: Login with invalid credentials shows error message', async ({ page }) => {
    // GIVEN: I am on the login page
    await page.goto('/login', { waitUntil: 'networkidle', timeout: 90000 })
    await expect(page.locator('form')).toBeVisible({ timeout: 30000 })

    // WHEN: I submit the form with invalid credentials
    await page.fill('[data-testid="email-input"]', 'wrong@example.com')
    await page.fill('[data-testid="password-input"]', 'wrongpassword')
    await page.press('[data-testid="password-input"]', 'Enter')

    // THEN: I see an error message
    await expect(page.locator('[data-testid="login-error"]')).toBeVisible({ timeout: 10000 })
    await expect(page.locator('[data-testid="login-error"]')).toContainText(/invalid|incorrect/i)
  })

  test('AC3: Session persists across page refreshes', async ({ page }) => {
    // GIVEN: I am logged in
    await page.goto('/login', { waitUntil: 'networkidle', timeout: 90000 })
    await page.fill('[data-testid="email-input"]', 'test@example.com')
    await page.fill('[data-testid="password-input"]', 'password123')
    await page.press('[data-testid="password-input"]', 'Enter')
    await expect(page).toHaveURL(/dashboard/, { timeout: 30000 })

    // WHEN: I refresh the page
    await page.waitForLoadState('networkidle')
    await page.reload({ waitUntil: 'networkidle' })

    // THEN: I am still on the dashboard (session persisted)
    await expect(page).toHaveURL(/dashboard/, { timeout: 30000 })
    await expect(page.locator('[data-testid="dashboard-header"]')).toBeVisible({ timeout: 30000 })
  })

  test('AC4: Protected routes redirect to login when unauthenticated', async ({ page }) => {
    // GIVEN: I am NOT logged in (fresh browser context)
    // WHEN: I try to access a protected route directly
    await page.goto('/dashboard', { waitUntil: 'networkidle', timeout: 90000 })

    // THEN: I am redirected to the login page
    await expect(page).toHaveURL(/login/, { timeout: 30000 })
  })

  test('AC5: Login works on slow 3G network', async ({ page, context }) => {
    // GIVEN: I am on a slow 3G network
    const cdpSession = await context.newCDPSession(page)
    await cdpSession.send('Network.emulateNetworkConditions', {
      offline: false,
      downloadThroughput: (500 * 1024) / 8, // 500 kbps
      uploadThroughput: (500 * 1024) / 8,
      latency: 400, // 400ms RTT
    })

    // WHEN: I try to log in
    await page.goto('/login', { timeout: 120000 })
    await page.fill('[data-testid="email-input"]', 'test@example.com')
    await page.fill('[data-testid="password-input"]', 'password123')
    await page.click('[data-testid="login-button"]')

    // THEN: Login completes within acceptable time (60s for slow 3G)
    await expect(page).toHaveURL(/dashboard/, { timeout: 60000 })
  })
})
