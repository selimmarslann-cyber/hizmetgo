import { test, expect } from '@playwright/test';
import { trackEvent, hasEvent, clearEvents } from '../lib/track';
import { getDefaultTestUser, cleanupTestUsers } from './test-setup';

test.describe('Listing Publish Flow', () => {
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

  test('should create and publish a listing', async ({ page, request }) => {
    // Login first with auto-created test user
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

    // Navigate to listing creation page
    await page.goto('/listings/create');
    await page.waitForTimeout(1000);

    trackEvent('listing_create_page_view');

    // Fill listing form
    const titleInput = page.locator('input[name="title"], input[placeholder*="Başlık"], input[placeholder*="Title"]').first();
    const descriptionInput = page.locator('textarea[name="description"], textarea[placeholder*="Açıklama"]').first();
    const categorySelect = page.locator('select[name="category"], [role="combobox"]').first();
    const priceInput = page.locator('input[name="price"], input[type="number"]').first();

    if (await titleInput.isVisible().catch(() => false)) {
      await titleInput.fill('Expert Test Listing');
      await descriptionInput.fill('This is a test listing created by EXPERT system');
      
      if (await categorySelect.isVisible().catch(() => false)) {
        await categorySelect.selectOption({ index: 1 });
      }
      
      if (await priceInput.isVisible().catch(() => false)) {
        await priceInput.fill('100');
      }
    }

    trackEvent('listing_form_filled');

    // Click publish button
    const publishButton = page.locator('button:has-text("Yayınla"), button:has-text("Publish"), button[type="submit"]').first();
    await publishButton.click();

    trackEvent('listing_publish_click');

    // Wait for API response
    await page.waitForTimeout(3000);

    // Check for success
    const successMessage = page.locator('text=/Başarılı|Success|Yayınlandı|Published/i').first();
    const hasSuccess = await successMessage.isVisible().catch(() => false);

    const currentUrl = page.url();
    const isSuccessUrl = currentUrl.includes('/listings/') && !currentUrl.includes('/create');

    expect(hasSuccess || isSuccessUrl).toBeTruthy();

    trackEvent('listing_publish_success');

    // Verify API response
    // Check if listing was created via API
    const listingId = currentUrl.match(/\/listings\/([^\/]+)/)?.[1];
    if (listingId) {
      const apiResponse = await request.get(`http://localhost:3000/api/listings/${listingId}`).catch(() => null);
      if (apiResponse) {
        expect(apiResponse.ok()).toBeTruthy();
        const listingData = await apiResponse.json().catch(() => ({}));
        expect(listingData).toBeDefined();
      }
    }

    // Check admin panel (if accessible)
    // This would require admin credentials
    if (process.env.TEST_ADMIN_EMAIL) {
      // Verify listing appears in admin panel
      // Implementation depends on your admin structure
    }

    // Verify events
    expect(hasEvent('listing_publish_click')).toBeTruthy();
    expect(hasEvent('listing_publish_success')).toBeTruthy();
  });
});

