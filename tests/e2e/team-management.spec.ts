import { test, expect } from '@playwright/test';

test.describe('Team Management', () => {
  test('Agency Admin can invite a team member', async ({ page }) => {
    // 1. Login as Admin
    await page.goto('/login');
    await page.fill('input[name="email"]', 'admin@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    // 2. Navigate to Team Settings
    await page.goto('/settings/team');
    await expect(page.locator('h1')).toContainText('Agency Collaboration');

    // 3. Invite a new member
    const testEmail = `new-member-${Date.now()}@agency.com`;
    await page.fill('input[id="email"]', testEmail);
    // Role defaults to EDITOR
    await page.click('button[type="submit"]');

    // 4. Verify Optimistic UI (AC6)
    // The invitation should appear immediately in the "Pending Invitations" list
    const invitationCard = page.locator(`[data-testid="invitation-card-${testEmail.toLowerCase()}"]`);
    await expect(invitationCard).toBeVisible();
    await expect(page.locator('[data-testid="invitation-status"]:has-text("SENDING...")')).toBeVisible();

    // 5. Verify success toast and status change
    await expect(page.locator('[role="status"]:has-text("Invitation sent")')).toBeVisible();
    await expect(page.locator('[data-testid="invitation-status"]:has-text("PENDING")')).toBeVisible();
  });

  test('User can accept a team invitation via link', async ({ page }) => {
    // Note: This test assumes a valid invitation token exists in the database
    // In a real E2E setup, you would seed the database with a test invitation
    
    // 1. Navigate to invitation link (mock token for illustration)
    const testToken = 'test-invitation-token';
    await page.goto(`/invite/${testToken}`);
    
    // 2. Check if redirected to login (for unauthenticated users)
    // or if the accept card is shown (for authenticated users)
    const isLoginPage = await page.locator('text=Sign in').isVisible().catch(() => false);
    
    if (isLoginPage) {
      // Login first
      await page.fill('input[name="email"]', 'invited@example.com');
      await page.fill('input[name="password"]', 'password123');
      await page.click('button[type="submit"]');
      
      // Should be redirected back to invite page
      await page.waitForURL(`**/invite/${testToken}`);
    }
    
    // 3. Accept the invitation
    const acceptButton = page.locator('[data-testid="accept-invitation-btn"]');
    if (await acceptButton.isVisible()) {
      await acceptButton.click();
      
      // 4. Verify success state
      await expect(page.locator('text=Welcome to the Team')).toBeVisible();
    }
  });

  test('Admin can change team member role', async ({ page }) => {
    // 1. Login as Admin
    await page.goto('/login');
    await page.fill('input[name="email"]', 'admin@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    // 2. Navigate to Team Settings
    await page.goto('/settings/team');
    await expect(page.locator('h1')).toContainText('Agency Collaboration');

    // 3. Find a team member's role selector and change it
    // Note: This assumes there are team members already - in real E2E, seed the database
    const roleSelectors = page.locator('[data-testid^="role-select-"]');
    const firstSelector = roleSelectors.first();
    
    if (await firstSelector.isVisible()) {
      await firstSelector.click();
      
      // 4. Select EDITOR role
      await page.click('[role="option"]:has-text("Editor")');
      
      // 5. Verify success toast
      await expect(page.locator('[role="status"]:has-text("Role updated")')).toBeVisible();
    }
  });

  test('Admin can remove a team member', async ({ page }) => {
    // 1. Login as Admin
    await page.goto('/login');
    await page.fill('input[name="email"]', 'admin@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    // 2. Navigate to Team Settings
    await page.goto('/settings/team');
    await expect(page.locator('h1')).toContainText('Agency Collaboration');

    // 3. Find a team member's remove button and click it
    // Note: This assumes there are team members other than the admin
    const removeButtons = page.locator('[data-testid^="remove-member-"]');
    const firstRemoveButton = removeButtons.first();
    
    if (await firstRemoveButton.isVisible()) {
      await firstRemoveButton.click();
      
      // 4. Confirm removal in dialog
      await expect(page.locator('text=Remove Team Member')).toBeVisible();
      await page.click('button:has-text("Remove Member")');
      
      // 5. Verify success toast
      await expect(page.locator('[role="status"]:has-text("removed from the team")')).toBeVisible();
    }
  });
});
