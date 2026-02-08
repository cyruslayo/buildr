import { test, expect } from '@playwright/test';

test.describe('Wizard Persistence & Sync', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/wizard');
    // Ensure store is hydrated
    await page.waitForSelector('text=Basic Information'); 
  });

  test('should persist data across page refreshes', async ({ page }) => {
    // Note: Actual inputs will be added in Story 2.4. 
    // For now, we verify the store's ability to hold state.
    await page.evaluate(() => {
      const store = (window as any).useWizardStore;
      if (store) {
        store.getState().updatePropertyData({ title: 'Persistent Property' });
      }
    });

    await page.reload();
    await page.waitForSelector('text=Basic Information');

    const title = await page.evaluate(() => {
      const store = (window as any).useWizardStore;
      return store?.getState().propertyData.title;
    });

    expect(title).toBe('Persistent Property');
  });

  test('should sync data across browser tabs', async ({ context, page }) => {
    const page2 = await context.newPage();
    await page2.goto('/wizard');
    await page2.waitForSelector('text=Basic Information');

    // Update in Tab 1
    await page.evaluate(() => {
      (window as any).useWizardStore.getState().updatePropertyData({ location: 'Victoria Island' });
    });

    // Check in Tab 2
    const location = await page2.evaluate(() => {
      return (window as any).useWizardStore.getState().propertyData.location;
    });

    expect(location).toBe('Victoria Island');
  });

  test('should handle QuotaExceededError gracefully', async ({ page }) => {
    // Mock localStorage to throw error
    await page.evaluate(() => {
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = () => {
        throw new Error('QuotaExceededError');
      };
    });

    // Attempt update
    await page.evaluate(() => {
      (window as any).useWizardStore.getState().updatePropertyData({ price: 50000000 });
    });

    // In a real app, we'd check for a Toast. 
    // Here we just ensure the app didn't crash and state is still in memory.
    const price = await page.evaluate(() => {
      return (window as any).useWizardStore.getState().propertyData.price;
    });

    expect(price).toBe(50000000);
  });
});
