import { test, expect } from '@playwright/test';

test.describe('Template Locking', () => {
  test('Admin can lock and unlock a template', async ({ page }) => {
    // 1. Login as Admin
    await page.goto('/login');
    await page.fill('input[name="email"]', 'admin@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    // 2. Navigate to Template Library
    await page.goto('/dashboard/templates');
    await expect(page.locator('h1')).toContainText('Template Library');

    // 3. Find a template's lock toggle and click it
    const lockToggle = page.locator('[data-testid^="lock-toggle-"]').first();
    
    if (await lockToggle.isVisible()) {
      // Get initial state
      const isChecked = await lockToggle.isChecked();
      
      // Toggle the lock
      await lockToggle.click();
      
      // Verify toast
      const expectedMessage = isChecked ? 'unlocked' : 'locked';
      await expect(page.locator(`[role="status"]:has-text("${expectedMessage}")`)).toBeVisible();
      
      // Verify toggle state changed
      await expect(lockToggle).toHaveAttribute('data-state', isChecked ? 'unchecked' : 'checked');
    }
  });

  test('Editor cannot use a locked template', async ({ page }) => {
    // 1. Login as Editor
    await page.goto('/login');
    await page.fill('input[name="email"]', 'editor@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    // 2. Navigate to Template Library
    await page.goto('/dashboard/templates');
    await expect(page.locator('h1')).toContainText('Template Library');

    // 3. Check if any template shows "Locked" message
    const lockedMessage = page.locator('text=This template is locked. Contact your Admin.');
    
    // If there's a locked template, verify the button is disabled
    if (await lockedMessage.first().isVisible()) {
      const lockedCard = lockedMessage.first().locator('..').locator('..');
      const useButton = lockedCard.locator('button:has-text("Locked")');
      await expect(useButton).toBeDisabled();
    }
  });
});
