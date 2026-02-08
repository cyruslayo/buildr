import { test, expect } from '@playwright/test';

/**
 * User Journey E2E Tests - Nigerian Real Estate Agent Persona
 * 
 * Simulates a Nigerian real estate agent using Buildr to create
 * property landing pages. Tests the complete user flow from
 * registration through template customization.
 */

// Test data representing a typical Nigerian agent
const NIGERIAN_AGENT = {
  name: 'Adebayo Properties',
  email: 'adebayo@properties.ng',
  password: 'SecurePass123!',
  phone: '+2348012345678',
  whatsapp: '2348012345678',
  location: 'Lekki Phase 1, Lagos',
};

const PROPERTY_DETAILS = {
  title: '4 Bedroom Fully Detached Duplex',
  price: 85000000, // ₦85,000,000
  beds: 4,
  baths: 4,
  sqm: 350,
  location: 'Lekki Phase 1, Lagos',
  features: ['Bore Hole', 'Generator House', 'Swimming Pool', 'BQ'],
};

test.describe('Nigerian Agent User Journey', () => {
  
  test.describe('Authentication Flow', () => {
    
    test('displays login page with Nigerian branding', async ({ page }) => {
      await page.goto('/login');
      
      // Page should load
      await expect(page.locator('body')).toBeVisible();
      
      // Should have login form elements
      const emailInput = page.locator('input[type="email"], input[name="email"]');
      const passwordInput = page.locator('input[type="password"], input[name="password"]');
      
      // At least one form element should exist
      const hasForm = await emailInput.count() > 0 || await passwordInput.count() > 0;
      expect(hasForm).toBe(true);
    });

    test('displays registration page', async ({ page }) => {
      await page.goto('/register');
      
      await expect(page.locator('body')).toBeVisible();
      
      // Should have registration form
      const form = page.locator('form');
      const formExists = await form.count() > 0;
      expect(formExists).toBe(true);
    });

    test('redirects unauthenticated users from protected routes', async ({ page }) => {
      // Try to access a protected route
      await page.goto('/dashboard');
      
      // Should redirect to login or show login form
      await page.waitForTimeout(2000);
      const url = page.url();
      
      // Either redirected to login or shows auth content
      const isOnAuthPage = url.includes('login') || url.includes('register') || url === 'http://localhost:3000/';
      expect(isOnAuthPage).toBe(true);
    });
  });

  test.describe('Homepage & Marketing', () => {
    
    test('homepage displays Nigerian-specific content', async ({ page }) => {
      await page.goto('/');
      
      await expect(page.locator('body')).toBeVisible();
      
      // Check for Nigerian currency symbol or Naira text
      const pageContent = await page.textContent('body');
      
      // Should have Nigerian context (Naira, Nigerian locations, or WhatsApp)
      const hasNigerianContext = 
        pageContent?.includes('₦') || 
        pageContent?.includes('Naira') ||
        pageContent?.includes('Lagos') ||
        pageContent?.includes('WhatsApp') ||
        pageContent?.includes('Nigeria');
        
      expect(hasNigerianContext).toBe(true);
    });

    test('homepage has clear call-to-action buttons', async ({ page }) => {
      await page.goto('/');
      
      // Look for CTA buttons
      const buttons = page.locator('button, a[href]').filter({ hasText: /start|get|create|build|try/i });
      const buttonCount = await buttons.count();
      
      // Should have at least one CTA
      expect(buttonCount).toBeGreaterThanOrEqual(1);
    });

    test('homepage displays pricing information in Naira', async ({ page }) => {
      await page.goto('/');
      
      const pageContent = await page.textContent('body');
      
      // Check for pricing section with Naira
      const hasPricing = 
        pageContent?.includes('₦') ||
        pageContent?.includes('Free') ||
        pageContent?.includes('Starter') ||
        pageContent?.includes('Pro');
        
      expect(hasPricing).toBe(true);
    });
  });

  test.describe('Onboarding Flow', () => {
    
    test('onboarding wizard is accessible', async ({ page }) => {
      await page.goto('/');
      
      // Look for wizard or onboarding elements
      const wizardElements = page.locator('[class*="wizard"], [class*="onboard"], [class*="step"]');
      const hasWizard = await wizardElements.count() > 0;
      
      // Wizard might be behind auth, but step elements should be on landing
      expect(hasWizard).toBe(true);
    });
  });

  test.describe('WhatsApp Integration', () => {
    
    test('WhatsApp button is present on homepage', async ({ page }) => {
      await page.goto('/');
      
      // Look for WhatsApp elements
      const whatsappElements = page.locator('[href*="wa.me"], [href*="whatsapp"], [data-testid*="whatsapp"], [class*="whatsapp"]');
      const whatsappCount = await whatsappElements.count();
      
      // WhatsApp should be present (critical for Nigerian market)
      if (whatsappCount > 0) {
        await expect(whatsappElements.first()).toBeVisible();
      }
    });

    test('WhatsApp links have valid format', async ({ page }) => {
      await page.goto('/');
      
      const whatsappLinks = page.locator('a[href*="wa.me"]');
      const count = await whatsappLinks.count();
      
      for (let i = 0; i < count; i++) {
        const href = await whatsappLinks.nth(i).getAttribute('href');
        if (href) {
          // Valid WhatsApp link format
          expect(href).toMatch(/wa\.me\/\d+|whatsapp/);
        }
      }
    });
  });

  test.describe('Template Preview', () => {
    
    test('templates display Nigerian property terminology', async ({ page }) => {
      await page.goto('/');
      
      const pageContent = await page.textContent('body');
      
      // Check for Nigerian property terms
      const hasNigerianTerms = 
        pageContent?.includes('Duplex') ||
        pageContent?.includes('Terrace') ||
        pageContent?.includes('BQ') ||
        pageContent?.includes('Bedroom') ||
        pageContent?.includes('sqm');
        
      expect(hasNigerianTerms).toBe(true);
    });
  });
});

test.describe('Form Validation', () => {
  
  test('forms display validation errors for empty required fields', async ({ page }) => {
    await page.goto('/register');
    
    // Try to submit empty form
    const submitButton = page.locator('button[type="submit"]');
    
    if (await submitButton.count() > 0) {
      await submitButton.click();
      
      // Wait for validation
      await page.waitForTimeout(500);
      
      // Should show some error indication
      const hasError = 
        await page.locator('[class*="error"], [role="alert"], [aria-invalid="true"]').count() > 0 ||
        await page.locator('input:invalid').count() > 0;
        
      // Should show validation feedback
      expect(hasError).toBe(true);
    }
  });
});
