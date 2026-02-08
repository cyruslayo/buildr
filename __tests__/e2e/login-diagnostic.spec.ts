import { test, expect } from '@playwright/test';

test('Simple Login Diagnostic', async ({ page }) => {
  test.setTimeout(120000);
  
  page.on('console', msg => console.log(`BROWSER: ${msg.text()}`));
  page.on('pageerror', err => console.log(`BROWSER ERROR: ${err.message}`));
  
  await page.goto('/login', { waitUntil: 'networkidle', timeout: 90000 });
  await page.fill('[data-testid="email-input"]', 'test@example.com');
  await page.fill('[data-testid="password-input"]', 'password123');
  
  console.log('Logging in...');
  await page.press('[data-testid="password-input"]', 'Enter');
  
  await expect(page).toHaveURL(/dashboard/, { timeout: 60000 });
  console.log('Login successful');
});
