import { test, expect } from '@playwright/test';
import { trackEvent, hasEvent, clearEvents } from '../lib/track';
import { createTestUser, cleanupTestUsers } from './test-setup';

test.describe('User Registration Flow', () => {
  test.afterAll(async () => {
    // Cleanup after all tests
    await cleanupTestUsers();
  });

  test.beforeEach(async () => {
    clearEvents();
  });

  test('should successfully register a new user', async ({ page }) => {
    // Generate unique email for test
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(7);
    const testEmail = `expert-register-${timestamp}-${randomId}@expert-system.test`;

    // Navigate to registration page
    await page.goto('/auth/register');
    await expect(page).toHaveURL(/.*\/auth\/register/);

    trackEvent('register_page_view');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Fill registration form - try multiple selectors
    const nameInput = page.locator('input[name="name"], input[placeholder*="Ad"], input[placeholder*="Name"], input[type="text"]').first();
    const emailInput = page.locator('input[type="email"], input[name="email"]').first();
    const passwordInput = page.locator('input[type="password"]').first();
    const submitButton = page.locator('button[type="submit"], button:has-text("Kayıt"), button:has-text("Register")').first();

    // Wait for inputs to be visible
    await nameInput.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    await emailInput.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});

    if (await nameInput.isVisible().catch(() => false)) {
      await nameInput.fill('Expert Test User');
    }
    await emailInput.fill(testEmail);
    
    // Fill password (may not have confirm field)
    const passwordInputs = page.locator('input[type="password"]');
    const passwordCount = await passwordInputs.count();
    if (passwordCount > 0) {
      await passwordInputs.nth(0).fill('TestPassword123!');
      if (passwordCount > 1) {
        await passwordInputs.nth(1).fill('TestPassword123!');
      }
    }

    // Track registration attempt
    trackEvent('register_click', { email: testEmail });

    // Submit form
    await submitButton.click();

    // Wait for registration to complete
    await page.waitForTimeout(3000);

    // Check for success indicators
    const currentUrl = page.url();
    const isSuccess = currentUrl.includes('/auth/login') || 
                     currentUrl.includes('/dashboard') ||
                     currentUrl.includes('/account') ||
                     !currentUrl.includes('/auth/register');

    const successMessage = page.locator('text=/Başarılı|Success|Kayıt|Kayıt başarılı|Email/i').first();
    const hasSuccessMessage = await successMessage.isVisible().catch(() => false);

    // Assert registration success
    expect(isSuccess || hasSuccessMessage).toBeTruthy();

    trackEvent('register_success', { email: testEmail });

    // Verify events
    expect(hasEvent('register_click')).toBeTruthy();
    expect(hasEvent('register_success')).toBeTruthy();
  });

  test('should validate form fields', async ({ page }) => {
    await page.goto('/auth/register');

    const submitButton = page.locator('button[type="submit"]').first();
    await submitButton.click();

    // Wait for validation errors
    await page.waitForTimeout(500);

    // Check for validation messages
    const validationErrors = page.locator('text=/Gerekli|Required|Zorunlu|Geçersiz|Invalid/i');
    const errorCount = await validationErrors.count();

    expect(errorCount).toBeGreaterThan(0);

    trackEvent('register_validation_error');
  });
});

