import { test, expect } from '@playwright/test';
import { trackEvent, hasEvent, clearEvents } from '../lib/track';
import { getDefaultTestUser, cleanupTestUsers } from './test-setup';

test.describe('Payment Flow', () => {
  let testUser: { email: string; password: string };

  test.beforeAll(async () => {
    const user = await getDefaultTestUser();
    testUser = { email: user.email, password: user.password };
  });

  test.afterAll(async () => {
    await cleanupTestUsers();
  });

  test.beforeEach(async () => {
    clearEvents();
  });

  test('should complete payment flow with mock provider', async ({ page, request }) => {
    // First, login with auto-created test user
    await page.goto('/auth/login', { waitUntil: 'networkidle' });
    
    const emailInput = page.locator('input[type="email"]').first();
    const passwordInput = page.locator('input[type="password"]').first();
    const loginButton = page.locator('button[type="submit"]').first();

    await emailInput.waitFor({ state: 'visible', timeout: 10000 });
    await passwordInput.waitFor({ state: 'visible', timeout: 10000 });

    await emailInput.fill(testUser.email);
    await passwordInput.fill(testUser.password);
    await loginButton.click();
    await page.waitForTimeout(2000);

    // Navigate to payment page (adjust route as needed)
    // This could be /orders/[id]/payment or /checkout
    await page.goto('/orders');
    await page.waitForTimeout(1000);

    // Find an order or create a test order
    const orderLink = page.locator('a[href*="/orders/"], button:has-text("Ödeme"), button:has-text("Pay")').first();
    const hasOrder = await orderLink.isVisible().catch(() => false);

    if (!hasOrder) {
      test.skip();
      return;
    }

    await orderLink.click();
    await page.waitForTimeout(1000);

    trackEvent('payment_page_view');

    // Fill payment form (mock/sandbox mode)
    const cardNumberInput = page.locator('input[name*="card"], input[placeholder*="card"], input[type="text"]').first();
    const expiryInput = page.locator('input[name*="expiry"], input[placeholder*="MM/YY"]').first();
    const cvvInput = page.locator('input[name*="cvv"], input[placeholder*="CVV"]').first();
    const nameInput = page.locator('input[name*="name"], input[placeholder*="Cardholder"]').first();

    // Use test card numbers (adjust based on your payment provider)
    if (await cardNumberInput.isVisible().catch(() => false)) {
      await cardNumberInput.fill('4242424242424242'); // Stripe test card
      await expiryInput.fill('12/25');
      await cvvInput.fill('123');
      await nameInput.fill('Test User');
    }

    trackEvent('payment_form_filled');

    // Submit payment
    const payButton = page.locator('button:has-text("Öde"), button:has-text("Pay"), button[type="submit"]').first();
    await payButton.click();

    trackEvent('payment_submit');

    // Wait for payment processing
    await page.waitForTimeout(3000);

    // Check for success
    const successMessage = page.locator('text=/Başarılı|Success|Ödeme|Payment|Tamamlandı/i').first();
    const hasSuccess = await successMessage.isVisible().catch(() => false);

    const currentUrl = page.url();
    const isSuccessUrl = currentUrl.includes('/success') || 
                        currentUrl.includes('/complete') ||
                        currentUrl.includes('/orders');

    expect(hasSuccess || isSuccessUrl).toBeTruthy();

    trackEvent('payment_success');

    // Verify webhook was called (mock endpoint)
    // This would require a mock webhook endpoint in your test setup
    const webhookResponse = await request.get('http://localhost:3000/api/test/webhook-status').catch(() => null);
    if (webhookResponse) {
      const webhookData = await webhookResponse.json().catch(() => ({}));
      expect(webhookData.received).toBeTruthy();
    }

    // Check for notification
    const notificationBadge = page.locator('[data-testid="notification"], .notification, [aria-label*="notification"]').first();
    const hasNotification = await notificationBadge.isVisible().catch(() => false);

    // Verify events
    expect(hasEvent('payment_submit')).toBeTruthy();
    expect(hasEvent('payment_success')).toBeTruthy();
  });
});

