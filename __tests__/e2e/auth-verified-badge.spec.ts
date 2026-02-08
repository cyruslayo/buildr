import { test, expect } from '@playwright/test'

/**
 * Story 1.4: Verified Badge Display
 * 
 * As a verified agent,
 * I want my published pages to show a "Verified" badge,
 * So that potential buyers trust my listings.
 * 
 * ATDD: All tests should FAIL initially (RED phase).
 * Implementation will make them pass (GREEN phase).
 * 
 * RISK: R-005 (Score 6) - Verified badge displayed for unverified users
 * This is a CRITICAL trust signal for Nigeria's low-trust market.
 */
test.describe('Story 1.4: Verified Badge Display', () => {
  test.beforeEach(async ({ page }) => {
    // Increase timeout for cold starts
    test.setTimeout(120000)
  })

  test('AC1: P0 - Badge appears on published page when kyc_status = "verified"', async ({ page }) => {
    // GIVEN: A published property page by a verified agent
    // This requires a test fixture with a verified user's published page
    // For now, we'll use a mock route to simulate the verified state
    
    await page.route('**/api/property/**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 'test-property-1',
          title: '4 Bedroom Duplex in Lekki',
          agent: {
            id: 'agent-1',
            name: 'Chibuzo Okafor',
            kyc_status: 'verified', // VERIFIED agent
          },
        }),
      })
    })

    // WHEN: I view the published property page
    await page.goto('/p/test-property-1', { waitUntil: 'networkidle', timeout: 90000 })

    // THEN: The public page displays a visible "Verified Agent" badge
    const verifiedBadge = page.locator('[data-testid="verified-badge"]')
    await expect(verifiedBadge).toBeVisible({ timeout: 30000 })
    await expect(verifiedBadge).toContainText(/verified/i)
  })

  test('AC2: P0 - Badge NOT shown when kyc_status = "pending"', async ({ page }) => {
    // GIVEN: A published property page by an agent with pending verification
    await page.route('**/api/property/**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 'test-property-2',
          title: '3 Bedroom Flat in Victoria Island',
          agent: {
            id: 'agent-2',
            name: 'Fatima Bello',
            kyc_status: 'pending', // PENDING verification
          },
        }),
      })
    })

    // WHEN: I view the published property page
    await page.goto('/p/test-property-2', { waitUntil: 'networkidle', timeout: 90000 })

    // THEN: No verified badge is displayed
    const verifiedBadge = page.locator('[data-testid="verified-badge"]')
    await expect(verifiedBadge).not.toBeVisible({ timeout: 5000 })
  })

  test('AC3: P0 - Badge NOT shown when kyc_status = "unverified"', async ({ page }) => {
    // GIVEN: A published property page by an unverified agent
    await page.route('**/api/property/**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 'test-property-3',
          title: 'Land in Epe',
          agent: {
            id: 'agent-3',
            name: 'Emeka Nwankwo',
            kyc_status: 'unverified', // NOT verified
          },
        }),
      })
    })

    // WHEN: I view the published property page
    await page.goto('/p/test-property-3', { waitUntil: 'networkidle', timeout: 90000 })

    // THEN: No verified badge is displayed
    const verifiedBadge = page.locator('[data-testid="verified-badge"]')
    await expect(verifiedBadge).not.toBeVisible({ timeout: 5000 })
  })

  test('AC4: P0 - Badge NOT shown when kyc_status = "rejected"', async ({ page }) => {
    // GIVEN: A published property page by an agent whose KYC was rejected
    await page.route('**/api/property/**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 'test-property-4',
          title: 'Commercial Space in Ikeja',
          agent: {
            id: 'agent-4',
            name: 'Test Agent',
            kyc_status: 'rejected', // REJECTED verification
          },
        }),
      })
    })

    // WHEN: I view the published property page
    await page.goto('/p/test-property-4', { waitUntil: 'networkidle', timeout: 90000 })

    // THEN: No verified badge is displayed
    const verifiedBadge = page.locator('[data-testid="verified-badge"]')
    await expect(verifiedBadge).not.toBeVisible({ timeout: 5000 })
  })

  test('Badge has Lagos Luxury depth styling (shadow/gradient)', async ({ page }) => {
    // GIVEN: A verified agent's published property page
    await page.route('**/api/property/**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 'test-property-5',
          title: 'Penthouse in Ikoyi',
          agent: {
            id: 'agent-5',
            name: 'Verified Agent',
            kyc_status: 'verified',
          },
        }),
      })
    })

    // WHEN: I view the published property page
    await page.goto('/p/test-property-5', { waitUntil: 'networkidle', timeout: 90000 })

    // THEN: The verified badge has appropriate styling (not flat)
    const verifiedBadge = page.locator('[data-testid="verified-badge"]')
    await expect(verifiedBadge).toBeVisible()
    
    // Check for Lagos Luxury "depth" styling per design-compact.md
    // Badge should have shadow, gradient, or border (not flat monochrome)
    const classes = await verifiedBadge.getAttribute('class')
    
    // Should have some depth indicator
    const hasDepth = 
      classes?.includes('shadow') || 
      classes?.includes('gradient') || 
      classes?.includes('border') ||
      classes?.includes('ring')
    
    expect(hasDepth).toBeTruthy()
  })
})
