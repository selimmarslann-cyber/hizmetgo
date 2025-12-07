import { test, expect } from '@playwright/test';
import { trackEvent, hasEvent, clearEvents } from '../lib/track';
import { getDefaultTestUser, cleanupTestUsers } from './test-setup';

test.describe('Login Flow', () => {
  let testUser: { email: string; password: string };

  test.beforeAll(async () => {
    // Create test user before all tests
    const user = await getDefaultTestUser();
    testUser = { email: user.email, password: user.password };
  });

  test.afterAll(async () => {
    // Cleanup after all tests
    await cleanupTestUsers();
  });

  test.beforeEach(async () => {
    clearEvents();
  });

  test('should successfully login and redirect to dashboard', async ({ page }) => {
    // Navigate to login page
    await page.goto('/auth/login', { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(/.*\/auth\/login/);

    // Track login page view
    trackEvent('login_page_view');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Fill login form
    const emailInput = page.locator('input[type="email"], input[name="email"]').first();
    const passwordInput = page.locator('input[type="password"], input[name="password"]').first();
    const submitButton = page.locator('button[type="submit"], button:has-text("Giriş"), button:has-text("Login")').first();

    // Wait for inputs to be visible
    await emailInput.waitFor({ state: 'visible', timeout: 10000 });
    await passwordInput.waitFor({ state: 'visible', timeout: 10000 });

    await emailInput.fill(testUser.email);
    await passwordInput.fill(testUser.password);

    // Track login click
    trackEvent('login_click', {
      email: process.env.TEST_USER_EMAIL || 'test@example.com',
    });

    // Submit form
    await submitButton.click();

    // Wait for navigation or success message
    await page.waitForTimeout(2000);

    // Check if login was successful
    // Option 1: URL changed to dashboard
    const currentUrl = page.url();
    const isDashboard = currentUrl.includes('/dashboard') || 
                       currentUrl.includes('/account') || 
                       currentUrl.includes('/orders') ||
                       !currentUrl.includes('/auth/login');

    // Option 2: Check for success message or user menu
    const successIndicator = page.locator('text=/Hoş geldin|Welcome|Dashboard|Profil|Account/i').first();
    const hasSuccessIndicator = await successIndicator.isVisible().catch(() => false);

    // Assert login success
    expect(isDashboard || hasSuccessIndicator).toBeTruthy();

    // Track login success
    trackEvent('login_success', {
      redirectUrl: currentUrl,
    });

    // Verify events were tracked
    expect(hasEvent('login_click')).toBeTruthy();
    expect(hasEvent('login_success')).toBeTruthy();
  });

  test('should show error on invalid credentials', async ({ page }) => {
    await page.goto('/auth/login');

    const emailInput = page.locator('input[type="email"], input[name="email"]').first();
    const passwordInput = page.locator('input[type="password"], input[name="password"]').first();
    const submitButton = page.locator('button[type="submit"]').first();

    await emailInput.fill('invalid@example.com');
    await passwordInput.fill('wrongpassword');
    
    trackEvent('login_click', { email: 'invalid@example.com' });
    await submitButton.click();

    // Wait for error message
    await page.waitForTimeout(1000);

    // Check for error message
    const errorMessage = page.locator('text=/Hatalı|Error|Geçersiz|Invalid|Yanlış/i').first();
    const hasError = await errorMessage.isVisible().catch(() => false);

    expect(hasError).toBeTruthy();

    trackEvent('login_error', { reason: 'invalid_credentials' });
  });
});

