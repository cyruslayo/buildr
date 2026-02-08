import { test, expect } from '@playwright/test'
import path from 'path'

/**
 * Story 1.3: KYC Document Upload for Verification
 * 
 * As a registered agent,
 * I want to upload my RC Number (Corporate) or NIN (Individual) document,
 * So that I can apply for "Verified" status and unlock premium features.
 * 
 * ATDD: All tests should FAIL initially (RED phase).
 * Implementation will make them pass (GREEN phase).
 */
test.describe('Story 1.3: KYC Document Upload for Verification', () => {
  test.beforeEach(async ({ page }) => {
    // Increase timeout to account for Next.js compilation
    test.setTimeout(120000)
    
    // Login before accessing settings
    await page.goto('/login', { waitUntil: 'networkidle', timeout: 90000 })
    await page.fill('[data-testid="email-input"]', 'test@example.com')
    await page.fill('[data-testid="password-input"]', 'password123')
    await page.press('[data-testid="password-input"]', 'Enter')
    await expect(page).toHaveURL(/dashboard/, { timeout: 30000 })
  })

  test('AC1: User can upload valid PDF document', async ({ page }) => {
    // GIVEN: I am logged in and on my profile/settings page
    await page.goto('/settings/verification', { waitUntil: 'networkidle', timeout: 90000 })
    await expect(page.locator('[data-testid="kyc-upload-section"]')).toBeVisible({ timeout: 30000 })

    // WHEN: I upload a valid PDF document (<5MB)
    const fileInput = page.locator('[data-testid="kyc-file-input"]')
    
    // Create a test PDF file path (would need fixture in tests/fixtures/)
    await fileInput.setInputFiles({
      name: 'valid-rcn.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('%PDF-1.4 test document'),
    })

    // THEN: The document is stored and my kyc_status becomes "pending"
    await expect(page.locator('[data-testid="upload-success"]')).toBeVisible({ timeout: 30000 })
    await expect(page.locator('[data-testid="kyc-status"]')).toHaveText(/pending/i)
  })

  test('AC2: User can upload valid JPG image', async ({ page }) => {
    // GIVEN: I am logged in and on my profile/settings page
    await page.goto('/settings/verification', { waitUntil: 'networkidle', timeout: 90000 })

    // WHEN: I upload a valid JPG image (<5MB)
    const fileInput = page.locator('[data-testid="kyc-file-input"]')
    
    // Create a minimal JPEG buffer (1x1 pixel)
    const jpegBuffer = Buffer.from([
      0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46, 0x00, 0x01,
      0x01, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0xFF, 0xDB, 0x00, 0x43,
      0x00, 0x08, 0xFF, 0xD9
    ])
    
    await fileInput.setInputFiles({
      name: 'valid-nin.jpg',
      mimeType: 'image/jpeg',
      buffer: jpegBuffer,
    })

    // THEN: Upload succeeds and status becomes "pending"
    await expect(page.locator('[data-testid="upload-success"]')).toBeVisible({ timeout: 30000 })
    await expect(page.locator('[data-testid="kyc-status"]')).toHaveText(/pending/i)
  })

  test('AC3: Upload blocked for invalid file types (EXE)', async ({ page }) => {
    // GIVEN: I am on the verification settings page
    await page.goto('/settings/verification', { waitUntil: 'networkidle', timeout: 90000 })

    // WHEN: I try to upload an invalid file type
    const fileInput = page.locator('[data-testid="kyc-file-input"]')
    await fileInput.setInputFiles({
      name: 'malicious.exe',
      mimeType: 'application/x-msdownload',
      buffer: Buffer.from('MZ executable header'),
    })

    // THEN: The upload is blocked and I see an error message
    await expect(page.locator('[data-testid="upload-error"]')).toBeVisible({ timeout: 10000 })
    await expect(page.locator('[data-testid="upload-error"]')).toContainText(/invalid|not allowed|pdf|jpg|png/i)
  })

  test('AC4: Upload blocked for files exceeding 5MB', async ({ page }) => {
    // GIVEN: I am on the verification settings page
    await page.goto('/settings/verification', { waitUntil: 'networkidle', timeout: 90000 })

    // WHEN: I try to upload a file exceeding 5MB
    const fileInput = page.locator('[data-testid="kyc-file-input"]')
    
    // Create a buffer slightly over 5MB (5.5MB)
    const largeBuffer = Buffer.alloc(5.5 * 1024 * 1024, 'a')
    
    await fileInput.setInputFiles({
      name: 'oversized.pdf',
      mimeType: 'application/pdf',
      buffer: largeBuffer,
    })

    // THEN: The upload is blocked client-side with a friendly error
    await expect(page.locator('[data-testid="upload-error"]')).toBeVisible({ timeout: 10000 })
    await expect(page.locator('[data-testid="upload-error"]')).toContainText(/too large|5MB|under 5/i)
  })

  test('AC5: Error message shown for failed upload (network error)', async ({ page, context }) => {
    // GIVEN: I am on the verification settings page but network fails
    await page.goto('/settings/verification', { waitUntil: 'networkidle', timeout: 90000 })
    
    // Simulate network failure for upload endpoint
    await page.route('**/api/kyc/upload**', (route) => {
      route.abort('failed')
    })

    // WHEN: I try to upload a valid file
    const fileInput = page.locator('[data-testid="kyc-file-input"]')
    await fileInput.setInputFiles({
      name: 'valid.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('%PDF-1.4 test'),
    })

    // THEN: I see a clear error message explaining the issue
    await expect(page.locator('[data-testid="upload-error"]')).toBeVisible({ timeout: 10000 })
    await expect(page.locator('[data-testid="upload-error"]')).toContainText(/failed|try again|network/i)
  })

  test('AC6: Confirmation message shown after successful upload', async ({ page }) => {
    // GIVEN: I am on the verification settings page
    await page.goto('/settings/verification', { waitUntil: 'networkidle', timeout: 90000 })

    // WHEN: I upload a valid document
    const fileInput = page.locator('[data-testid="kyc-file-input"]')
    await fileInput.setInputFiles({
      name: 'valid.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('%PDF-1.4 test'),
    })

    // THEN: I see a confirmation message
    await expect(page.locator('[data-testid="upload-success"]')).toBeVisible({ timeout: 30000 })
    await expect(page.locator('[data-testid="upload-success"]')).toContainText(/submitted|pending|review/i)
  })
})
