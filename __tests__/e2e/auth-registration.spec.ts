import { test, expect } from '@playwright/test'

test.describe('User Registration with NDPR Consent', () => {
  test.beforeEach(async ({ page }) => {
    // Increase timeout to account for Next.js compilation on cold starts
    test.setTimeout(120000)
    // Wait for page to fully load including any Next.js compilation
    await page.goto('/register', { waitUntil: 'networkidle', timeout: 90000 })
    // Wait for the form to be visible to ensure hydration
    await expect(page.locator('form')).toBeVisible({ timeout: 30000 })
  })

  test('AC1: successful registration with NDPR consent checkbox checked', async ({ page }) => {
    // Generate unique email to avoid conflicts
    const uniqueEmail = `test-${Date.now()}@example.com`

    // Fill registration form
    await page.fill('input[name="name"]', 'Test User')
    await page.fill('input[name="email"]', uniqueEmail)
    await page.fill('input[name="password"]', 'password123')
    
    // Check the NDPR consent checkbox
    await page.check('input[name="ndprConsent"]')
    
    // Wait for submit button to be enabled
    const submitButton = page.locator('button[type="submit"]')
    await expect(submitButton).toBeEnabled({ timeout: 5000 })
    
    // Submit form
    await submitButton.click()
    
    // Wait for success - the form redirects to /login on success
    await expect(page).toHaveURL(/login/, { timeout: 30000 })
  })

  test('AC2: registration blocked without NDPR consent checkbox', async ({ page }) => {
    // Fill registration form but DON'T check consent
    await page.fill('input[name="name"]', 'Test User')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('input[name="password"]', 'password123')
    
    // NOTE: We intentionally do NOT check the ndprConsent checkbox
    
    // Try to submit form - browser validation should prevent submission
    await page.locator('button[type="submit"]').click()
    
    // Form should either:
    // 1. Show browser validation (required checkbox not checked)
    // 2. Show error message from server
    
    // Check that we're still on the registration page (not redirected)
    await expect(page).toHaveURL(/register/)
    
    // Check for error message or that success message is NOT visible
    const successMessage = page.locator('text=Account created')
    await expect(successMessage).not.toBeVisible({ timeout: 2000 })
  })

  test('NDPR consent checkbox is visible and styled', async ({ page }) => {
    // Check that the consent checkbox exists
    const checkbox = page.locator('input[name="ndprConsent"]')
    await expect(checkbox).toBeVisible()
    
    // Check that label with NDPR text exists
    const label = page.locator('label[for="ndprConsent"]')
    await expect(label).toContainText('I agree to be contacted')
    await expect(label).toContainText('NDPR')
    
    // Check privacy policy link exists
    const privacyLink = page.locator('a[href="/privacy"]')
    await expect(privacyLink).toBeVisible()
  })

  test('consent checkbox section has Lagos Luxury depth styling', async ({ page }) => {
    // Target the specific NDPR consent container by its unique class combination
    // The consent wrapper has shadow-sm and other distinctive classes
    const consentContainer = page.locator('.shadow-sm:has(input[name="ndprConsent"])')
    
    // Container should be visible
    await expect(consentContainer).toBeVisible()
    
    // Check for shadow class (Lagos Luxury requires depth, not flat)
    const classes = await consentContainer.getAttribute('class')
    expect(classes).toMatch(/shadow/)
  })
})
