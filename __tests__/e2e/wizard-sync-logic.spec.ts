import { test, expect } from '@playwright/test';

/**
 * Story 2.3: Background Sync Logic Verification (Unauthenticated)
 * 
 * Verifies the client-side synchronization lifecycle, including:
 * - Debouncing (500ms)
 * - State transitions (idle -> syncing -> error/synced)
 * - UI feedback (Cloud icons)
 */
test.describe('Story 2.3: Background Sync Logic', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('/wizard', { waitUntil: 'networkidle' });
    await page.waitForSelector('text=Basic Information', { timeout: 30000 });
  });

  test('should trigger sync attempt after 500ms debounce', async ({ page }) => {
    // 1. Initial state should be idle
    const initialSyncStatus = await page.evaluate(() => (window as any).useWizardStore.getState().syncStatus);
    expect(initialSyncStatus).toBe('idle');

    // 2. Trigger an update
    await page.evaluate(() => {
      (window as any).useWizardStore.getState().updatePropertyData({ title: 'Adversarial Test' });
    });

    // 3. Status should remain 'idle' immediately (due to debounce)
    const immediateSyncStatus = await page.evaluate(() => (window as any).useWizardStore.getState().syncStatus);
    expect(immediateSyncStatus).toBe('idle');

    // 4. Wait for debounce (500ms) + small buffer
    await page.waitForTimeout(1500);

    // 5. Status should have transitioned to 'syncing' or 'error' (if unauthenticated)
    const finalSyncStatus = await page.evaluate(() => (window as any).useWizardStore.getState().syncStatus);
    expect(['syncing', 'error', 'synced']).toContain(finalSyncStatus);

    // 6. Verify UI shows the corresponding indicator
    if (finalSyncStatus === 'error') {
      await expect(page.getByText(/Sync Error/i)).toBeVisible();
    }
  });

  test('should show correct UI indicator for syncing state', async ({ page }) => {
    // Trigger and check for "Syncing..." text
    await page.evaluate(() => {
      (window as any).useWizardStore.getState().updatePropertyData({ title: 'Rapid Sync Test' });
    });

    // Wait until it hits the debounce and starts syncing
    await page.waitForTimeout(600);
    
    // We expect "Syncing..." to be visible (or "Sync Error" if it fails fast)
    await expect(page.locator('text=Syncing...').or(page.locator('text=Sync Error'))).toBeVisible();
  });
});
