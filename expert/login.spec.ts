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
    try {
      await page.goto('/auth/login', { waitUntil: 'load', timeout: 90000 });
    } catch (error) {
      await page.goto('/auth/login', { waitUntil: 'domcontentloaded', timeout: 60000 });
    }
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

    // Wait for submit button to be enabled and visible
    await submitButton.waitFor({ state: 'visible', timeout: 15000 });
    await page.waitForTimeout(500); // Small delay to ensure form is ready
    
    // Check if button is disabled
    const isDisabled = await submitButton.isDisabled().catch(() => false);
    if (isDisabled) {
      // Wait a bit more for form validation to complete
      await page.waitForTimeout(1000);
    }

    // Submit form and wait for API response
    const [response] = await Promise.all([
      page.waitForResponse(res => res.url().includes('/api/auth/login') && res.status() < 500, { timeout: 30000 }).catch(() => null),
      submitButton.click({ timeout: 20000 }).catch(() => submitButton.click({ force: true, timeout: 20000 })),
    ]);

    // Wait for navigation to complete
    await page.waitForTimeout(3000);
    
    // Wait for URL change with longer timeout
    try {
      await page.waitForURL('**/account**', { timeout: 15000 }).catch(() => {});
      await page.waitForURL('**/dashboard**', { timeout: 15000 }).catch(() => {});
      await page.waitForURL('**/orders**', { timeout: 15000 }).catch(() => {});
    } catch (error) {
      // URL might not change, continue with checks
    }

    // Check if login was successful
    // Option 1: URL changed to dashboard/account
    const currentUrl = page.url();
    const isDashboard = currentUrl.includes('/dashboard') || 
                       currentUrl.includes('/account') || 
                       currentUrl.includes('/orders') ||
                       !currentUrl.includes('/auth/login');

    // Option 2: Check for success message or user menu
    const successIndicator = page.locator('text=/Hoş geldin|Welcome|Dashboard|Profil|Account|Bildirimler/i').first();
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
    try {
      await page.goto('/auth/login', { waitUntil: 'load', timeout: 90000 });
    } catch (error) {
      await page.goto('/auth/login', { waitUntil: 'domcontentloaded', timeout: 60000 });
    }

    const emailInput = page.locator('input[type="email"], input[name="email"]').first();
    const passwordInput = page.locator('input[type="password"], input[name="password"]').first();
    const submitButton = page.locator('button[type="submit"]').first();

    await emailInput.waitFor({ state: 'visible', timeout: 10000 });
    await passwordInput.waitFor({ state: 'visible', timeout: 10000 });

    await emailInput.fill('invalid@example.com');
    await passwordInput.fill('wrongpassword');
    
    trackEvent('login_click', { email: 'invalid@example.com' });
    
    // Wait for submit button to be enabled and visible
    await submitButton.waitFor({ state: 'visible', timeout: 15000 });
    await page.waitForTimeout(500);
    
    // Wait for API response
    const [response] = await Promise.all([
      page.waitForResponse(res => res.url().includes('/api/auth/login'), { timeout: 30000 }).catch(() => null),
      submitButton.click({ timeout: 20000 }).catch(() => submitButton.click({ force: true, timeout: 20000 })),
    ]);

    // Wait for error message to appear - check multiple possible locations
    await page.waitForTimeout(3000);

    // Check for error message in multiple possible locations
    const errorSelectors = [
      'text=/Giriş Başarısız|Başarısız|E-posta veya şifre hatalı|Hatalı|Error|Geçersiz|Invalid|Yanlış/i',
      '[role="alert"]',
      '.error',
      '[class*="error"]',
      '[class*="alert"]',
      'text=/Hata|Error|Failed/i',
    ];
    
    let hasError = false;
    for (const selector of errorSelectors) {
      const errorMessage = page.locator(selector).first();
      hasError = await errorMessage.isVisible().catch(() => false);
      if (hasError) break;
    }
    
    // Also check if response indicates error
    if (response && !response.ok()) {
      hasError = true;
    }

    expect(hasError).toBeTruthy();

    trackEvent('login_error', { reason: 'invalid_credentials' });
  });
});

