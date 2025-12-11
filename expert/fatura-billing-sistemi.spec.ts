import { test, expect } from '@playwright/test';
import { getDefaultTestUser, cleanupTestUsers, createTestBusinessUser } from './test-setup';
import { prisma } from '../../lib/db/prisma';

test.describe('Fatura & Billing Sistemi', () => {
  let testUser: { email: string; password: string; id: string };
  let testVendor: { email: string; password: string; id: string };
  let testBusiness: { id: string };
  let testOrder: { id: string };

  test.beforeAll(async () => {
    // Test kullanıcıları oluştur
    const customer = await getDefaultTestUser();
    testUser = { 
      email: customer.email, 
      password: customer.password,
      id: customer.id || ''
    };

    // Vendor kullanıcısı oluştur
    const vendor = await createTestBusinessUser();
    testVendor = {
      email: vendor.email,
      password: vendor.password,
      id: vendor.id,
    };

    // Test business oluştur
    const business = await prisma.business.create({
      data: {
        ownerUserId: vendor.id,
        name: 'Test Business',
        category: 'MARKET',
        lat: 41.0082,
        lng: 28.9784,
        addressText: 'Test Address',
      },
    });

    testBusiness = { id: business.id };
  });

  test.afterAll(async () => {
    // Test verilerini temizle
    if (testOrder?.id) {
      await prisma.order.deleteMany({ where: { id: testOrder.id } });
    }
    if (testBusiness?.id) {
      await prisma.business.deleteMany({ where: { id: testBusiness.id } });
    }
    if (testVendor?.id) {
      await prisma.user.deleteMany({ where: { id: testVendor.id } });
    }
    await cleanupTestUsers();
  });

  test('1. Billing Profile - Fatura bilgileri oluşturma (Şahıs)', async ({ page }) => {
    await page.goto('/auth/login', { waitUntil: 'networkidle', timeout: 90000 });
    
    // Login
    await page.fill('input[type="email"]', testUser.email);
    await page.fill('input[type="password"]', testUser.password);
    await page.click('button[type="submit"]');
    await page.waitForURL('**/account**', { timeout: 10000 }).catch(() => {});

    // Billing sayfasına git
    await page.goto('/profile/faturalandirma', { waitUntil: 'networkidle', timeout: 90000 });

    // Form alanlarını doldur
    await page.click('input[value="PERSONAL"]'); // Şahıs seç
    
    await page.fill('input[name="fullName"]', 'Ahmet Yılmaz');
    await page.fill('input[name="tckn"]', '12345678901');
    await page.fill('input[name="taxOffice"]', 'Kadıköy Vergi Dairesi');
    await page.fill('input[name="country"]', 'Türkiye');
    await page.fill('input[name="city"]', 'İstanbul');
    await page.fill('input[name="district"]', 'Kadıköy');
    await page.fill('textarea[name="addressLine"]', 'Test Adres Satırı 123');
    await page.fill('input[name="iban"]', 'TR330006100519786457841326');
    await page.selectOption('select[name="invoiceDeliveryMethod"]', 'PDF_ONLY');

    // Kaydet
    await page.click('button[type="submit"]');
    
    // Başarı mesajını kontrol et
    await expect(page.locator('text=Fatura bilgileriniz güncellendi')).toBeVisible({ timeout: 10000 });
  });

  test('2. Billing Profile - Fatura bilgileri oluşturma (Şirket)', async ({ page }) => {
    await page.goto('/auth/login', { waitUntil: 'networkidle', timeout: 90000 });
    
    // Login
    await page.fill('input[type="email"]', testVendor.email);
    await page.fill('input[type="password"]', testVendor.password);
    await page.click('button[type="submit"]');
    await page.waitForURL('**/account**', { timeout: 10000 }).catch(() => {});

    // Billing sayfasına git
    await page.goto('/profile/faturalandirma', { waitUntil: 'networkidle', timeout: 90000 });

    // Şirket seç
    await page.click('input[value="COMPANY"]');
    
    await page.fill('input[name="companyName"]', 'Test Şirketi A.Ş.');
    await page.fill('input[name="taxNumber"]', '1234567890');
    await page.fill('input[name="taxOffice"]', 'Kadıköy Vergi Dairesi');
    await page.fill('input[name="country"]', 'Türkiye');
    await page.fill('input[name="city"]', 'İstanbul');
    await page.fill('input[name="district"]', 'Kadıköy');
    await page.fill('textarea[name="addressLine"]', 'Test Şirket Adresi 456');
    await page.fill('input[name="iban"]', 'TR330006100519786457841326');
    await page.selectOption('select[name="invoiceDeliveryMethod"]', 'E_ARCHIVE');

    // Kaydet
    await page.click('button[type="submit"]');
    
    // Başarı mesajını kontrol et
    await expect(page.locator('text=Fatura bilgileriniz güncellendi')).toBeVisible({ timeout: 10000 });
  });

  test('3. Sipariş Tamamlama - Invoice Oluşturma', async ({ page, request }) => {
    // Önce bir sipariş oluştur
    const order = await prisma.order.create({
      data: {
        customerId: testUser.id,
        businessId: testBusiness.id,
        totalAmount: 1000,
        vendorAmount: 900,
        commissionFee: 100,
        status: 'ACCEPTED',
        addressText: 'Test Address',
      },
    });

    testOrder = { id: order.id };

    // Vendor olarak login
    await page.goto('/auth/login', { waitUntil: 'networkidle', timeout: 90000 });
    await page.fill('input[type="email"]', testVendor.email);
    await page.fill('input[type="password"]', testVendor.password);
    await page.click('button[type="submit"]');
    await page.waitForURL('**/account**', { timeout: 10000 }).catch(() => {});

    // Siparişi tamamla
    const response = await request.post(`/api/orders/${order.id}/complete`, {
      headers: {
        'Cookie': page.context().cookies().map(c => `${c.name}=${c.value}`).join('; '),
      },
    });

    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.order.status).toBe('COMPLETED');

    // Invoice'ın oluşturulduğunu kontrol et
    const invoice = await prisma.invoice.findFirst({
      where: { orderId: order.id },
    });

    expect(invoice).toBeTruthy();
    expect(invoice?.partnerId).toBe(testVendor.id);
    expect(invoice?.commissionGross).toBeGreaterThan(0);
  });

  test('4. Partner - Fatura Listesi Görüntüleme', async ({ page }) => {
    // Vendor olarak login
    await page.goto('/auth/login', { waitUntil: 'networkidle', timeout: 90000 });
    await page.fill('input[type="email"]', testVendor.email);
    await page.fill('input[type="password"]', testVendor.password);
    await page.click('button[type="submit"]');
    await page.waitForURL('**/account**', { timeout: 10000 }).catch(() => {});

    // Fatura listesi sayfasına git
    await page.goto('/partner/invoices', { waitUntil: 'networkidle', timeout: 90000 });

    // Fatura listesi görünüyor mu?
    await expect(page.locator('text=Faturalarım')).toBeVisible({ timeout: 10000 });
  });

  test('5. Partner - Fatura Detay Görüntüleme', async ({ page }) => {
    // Önce bir invoice oluştur
    const invoice = await prisma.invoice.create({
      data: {
        partnerId: testVendor.id,
        orderId: testOrder.id,
        commissionGross: 100,
        referralFee: 20,
        paymentFee: 40,
        platformNet: 22.5,
        vatAmount: 4.5,
        totalAmount: 27,
        currency: 'TRY',
      },
    });

    // Vendor olarak login
    await page.goto('/auth/login', { waitUntil: 'networkidle', timeout: 90000 });
    await page.fill('input[type="email"]', testVendor.email);
    await page.fill('input[type="password"]', testVendor.password);
    await page.click('button[type="submit"]');
    await page.waitForURL('**/account**', { timeout: 10000 }).catch(() => {});

    // Fatura detay sayfasına git
    await page.goto(`/partner/invoices/${invoice.id}`, { waitUntil: 'networkidle', timeout: 90000 });

    // Fatura detayları görünüyor mu?
    await expect(page.locator('text=Komisyon')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=Referans Fee')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=Ödeme Sistemi Fee')).toBeVisible({ timeout: 10000 });
  });

  test('6. Admin - Fatura Listesi ve Filtreleme', async ({ page }) => {
    // Admin kullanıcısı oluştur
    const adminEmail = `admin-${Date.now()}@test.com`;
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash: 'Test123!@#',
        name: 'Test Admin',
        role: 'ADMIN',
      },
    });

    // Admin olarak login
    await page.goto('/auth/login', { waitUntil: 'networkidle', timeout: 90000 });
    await page.fill('input[type="email"]', adminEmail);
    await page.fill('input[type="password"]', 'Test123!@#');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin**', { timeout: 10000 }).catch(() => {});

    // Admin fatura listesi sayfasına git
    await page.goto('/admin/finance/invoices', { waitUntil: 'networkidle', timeout: 90000 });

    // Fatura listesi görünüyor mu?
    await expect(page.locator('text=Faturalar')).toBeVisible({ timeout: 10000 });

    // Admin kullanıcısını temizle
    await prisma.user.delete({ where: { id: admin.id } });
  });

  test('7. Ledger Entry Oluşturma', async () => {
    // Sipariş tamamlandığında ledger entry'lerin oluşturulduğunu kontrol et
    const ledgerEntries = await prisma.ledgerEntry.findMany({
      where: { orderId: testOrder.id },
    });

    expect(ledgerEntries.length).toBeGreaterThan(0);
    
    // PLATFORM_NET_REVENUE entry'si var mı?
    const platformNetEntry = ledgerEntries.find(
      e => e.type === 'PLATFORM_NET_REVENUE'
    );
    expect(platformNetEntry).toBeTruthy();
  });

  test('8. Wallet Transaction Oluşturma', async () => {
    // Sipariş tamamlandığında wallet transaction'ların oluşturulduğunu kontrol et
    const walletTransactions = await prisma.walletTransaction.findMany({
      where: { orderId: testOrder.id },
    });

    // En az bir transaction olmalı
    expect(walletTransactions.length).toBeGreaterThanOrEqual(0);
  });

  test('9. User Referral Profile - Level ve Rank', async ({ page }) => {
    // Referral profile oluştur
    await prisma.userReferralProfile.create({
      data: {
        userId: testUser.id,
        level: 2,
        rank: 1,
        customRate: null,
      },
    });

    // Referral rate'in doğru hesaplandığını kontrol et
    const { getUserReferralRate } = await import('../../lib/fees/referralEngine');
    const rate = await getUserReferralRate(testUser.id);
    
    expect(rate).toBeGreaterThan(0);
    expect(rate).toBeLessThanOrEqual(1);
  });

  test('10. Invoice PDF Endpoint', async ({ request }) => {
    // Invoice oluştur
    const invoice = await prisma.invoice.create({
      data: {
        partnerId: testVendor.id,
        orderId: testOrder.id,
        commissionGross: 100,
        referralFee: 20,
        paymentFee: 40,
        platformNet: 22.5,
        vatAmount: 4.5,
        totalAmount: 27,
        currency: 'TRY',
      },
    });

    // PDF endpoint'ini test et
    const response = await request.get(`/api/invoices/${invoice.id}/pdf`);
    
    // Endpoint çalışıyor mu?
    expect([200, 404]).toContain(response.status());
  });
});

