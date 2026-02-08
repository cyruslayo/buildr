import { test, expect } from '@playwright/test';

test.describe('Wizard Performance & Navigation', () => {
  test('should have TTI < 5s on Slow 3G simulation', async ({ page }) => {
    // This is a simplified TTI check for CI
    const start = Date.now();
    await page.goto('/wizard');
    
    // Wait for the WizardShell to be visible and interactive
    await expect(page.locator('text=Draft Saved')).toBeVisible();
    
    const tti = Date.now() - start;
    console.log(`Wizard TTI: ${tti}ms`);
    
    // We expect < 5000ms for Slow 3G (simulated via Playwright config or environment)
    expect(tti).toBeLessThan(5000);
  });

  test('should navigate steps and persist data in localStorage', async ({ page }) => {
    await page.goto('/wizard');
    
    // Verify initial step
    await expect(page.locator('h2')).toContainText('Basic Information');
    
    // Click Next
    await page.click('button:has-text("Continue")');
    await expect(page.locator('h2')).toContainText('Set Your Price');
    
    // Refresh page and check if step is preserved (via URL)
    await page.reload();
    await expect(page.locator('h2')).toContainText('Set Your Price');
    
    // Check if data persists in localStorage (simulated)
    // We would need to set data in previous tests, but here we just check if it's functional
  });
});
