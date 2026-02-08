import { test, expect } from '@playwright/test';

test.describe('Property Wizard Inputs (Story 2.4)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/wizard');
  });

  test('auto-formats price with thousands separators', async ({ page }) => {
    // Navigate to price step (Step 3)
    await page.click('button:has-text("Continue")'); // title -> location
    await page.click('button:has-text("Continue")'); // location -> price

    const priceInput = page.getByTestId('price-input');
    await priceInput.fill('150000000');
    
    // Expect formatting 150,000,000
    await expect(priceInput).toHaveValue('150,000,000');
    
    // Check if Naira symbol is present
    const prefix = page.locator('span:has-text("₦")');
    await expect(prefix).toBeVisible();
  });

  test('persists inputs to localStorage', async ({ page }) => {
    const titleInput = page.getByTestId('title-input');
    await titleInput.fill('Luxury Penthouse');
    await page.click('button:has-text("Continue")');

    const locationInput = page.getByTestId('location-input');
    await locationInput.fill('Ikoyi, Lagos');
    await page.click('button:has-text("Continue")');

    // Reload page
    await page.reload();

    // Check if value is still there (back to title step by default or via URL)
    await expect(titleInput).toHaveValue('Luxury Penthouse');
    
    await page.click('button:has-text("Continue")');
    const locationInputReloaded = page.locator('input[placeholder*="Where"]');
    await expect(locationInputReloaded).toHaveValue('Ikoyi, Lagos');
  });
});
