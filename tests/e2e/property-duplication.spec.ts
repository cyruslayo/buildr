import { test, expect } from '@playwright/test';

test.describe('Property Duplication', () => {
  test('Admin can duplicate a listing', async ({ page }) => {
    // 1. Login
    await page.goto('/login');
    await page.fill('input[name="email"]', 'admin@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    // 2. Navigate to Dashboard
    await page.goto('/dashboard');
    await expect(page.locator('h1')).toContainText('Dashboard');

    // 3. Find a listing card and click "Duplicate"
    const firstListing = page.locator('[data-testid^="listing-card-"]').first();
    const listingId = await firstListing.getAttribute('data-testid');
    const propertyId = listingId?.replace('listing-card-', '');
    
    const duplicateButton = page.locator(`[data-testid="duplicate-listing-${propertyId}"]`);
    await duplicateButton.click();

    // 4. Verify toast
    await expect(page.locator('[role="status"]:has-text("Listing Duplicated")')).toBeVisible();

    // 5. Verify a new card appears with "Copy of"
    const newListing = page.locator(`text=Copy of`).first();
    await expect(newListing).toBeVisible();
  });
});
